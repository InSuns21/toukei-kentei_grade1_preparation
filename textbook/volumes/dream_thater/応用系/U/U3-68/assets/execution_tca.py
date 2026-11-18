#!/usr/bin/env python3
"""U3-68: no-look-ahead execution/TCA on independent synthetic P-paths.

Only Python standard library is required. Synthetic paths are not replayed
fills: quoted prices and market volumes are exogenous, and counterfactual
fills require a simplified capacity/impact model.
"""
from __future__ import annotations

import argparse
import math
import random
from dataclasses import dataclass
from statistics import mean, stdev

N = 4
QUANTITY = 12
FORECAST_VOLUMES = (20, 40, 30, 50)  # frozen *before* held-out evaluation
ETA_AC = 0.02                         # yen / contract^2, planning assumption
RISK_AC = 0.01                        # yen / contract^2, planning penalty
SPREAD_HALF = 0.10                    # yen / contract
IMPACT = 0.02                         # yen / contract^2
FEE = 0.02                            # yen / contract
PARTICIPATION_CAP = 0.30
ALPHA = 0.95


def normal_cdf(x: float) -> float:
    return 0.5 * math.erfc(-x / math.sqrt(2.0))


def black_scholes_call(spot: float, strike: float, rate: float,
                       volatility: float, years_left: float) -> float:
    """Q-price of a European call, with zero dividends."""
    if min(spot, strike) <= 0 or volatility <= 0 or years_left < 0:
        raise ValueError("spot, strike and volatility positive; time nonnegative")
    if years_left == 0:
        return max(spot - strike, 0.0)
    std = volatility * math.sqrt(years_left)
    d1 = (math.log(spot / strike) + (rate + 0.5 * volatility**2)
          * years_left) / std
    d2 = d1 - std
    return spot * normal_cdf(d1) - strike * math.exp(-rate * years_left) * normal_cdf(d2)


@dataclass(frozen=True)
class Path:
    mids: tuple[float, ...]     # N+1 option midquotes, t=0,...,N
    volumes: tuple[int, ...]    # N exogenous within-slot volumes


@dataclass(frozen=True)
class Result:
    shortfall: float
    cash: float
    fees: float
    residual: int
    inventory: tuple[int, ...]
    orders: tuple[int, ...]
    fills: tuple[int, ...]
    fill_prices: tuple[float, ...]
    cumulative_shortfall: tuple[float, ...]


def allocate_integer(quantity: int, weights: tuple[float, ...]) -> tuple[int, ...]:
    if quantity < 0 or not weights or any(w < 0 for w in weights) or sum(weights) <= 0:
        raise ValueError("nonnegative quantity and nonnegative nonzero weights required")
    raw = [quantity * w / sum(weights) for w in weights]
    floors = [math.floor(z) for z in raw]
    missing = quantity - sum(floors)
    indices = sorted(range(len(raw)), key=lambda i: (-(raw[i] - floors[i]), i))
    for i in indices[:missing]:
        floors[i] += 1
    return tuple(floors)


def ac_schedule(quantity: int, periods: int = N,
                impact: float = ETA_AC, risk: float = RISK_AC) -> tuple[int, ...]:
    """Discrete Almgren-Chriss-like planning: impact * sum(u^2)
    + risk * sum(x_after^2), with full liquidation by period N.
    All parameters fixed before evaluation paths.
    """
    if quantity < 0 or periods < 1 or impact <= 0 or risk < 0:
        raise ValueError("invalid AC parameters")
    next_cost = [math.inf] * (quantity + 1)
    next_cost[0] = 0.0
    policies: list[list[int]] = []
    for k in range(periods - 1, -1, -1):
        costs = [math.inf] * (quantity + 1)
        choose = [0] * (quantity + 1)
        for x in range(quantity + 1):
            for u in range(x + 1):
                rem = x - u
                value = impact*u*u + (risk*rem*rem if k < periods - 1 else 0.0) + next_cost[rem]
                if value < costs[x] - 1e-12:
                    costs[x], choose[x] = value, u
        policies.append(choose)
        next_cost = costs
    policies.reverse()
    remaining = quantity
    schedule = []
    for choose in policies:
        take = choose[remaining]
        schedule.append(take)
        remaining -= take
    assert remaining == 0
    return tuple(schedule)


def schedules(quantity: int = QUANTITY) -> dict[str, tuple[int, ...] | None]:
    return {
        "TWAP": allocate_integer(quantity, (1.0,) * N),
        "forecast-VWAP": allocate_integer(quantity, FORECAST_VOLUMES),
        "AC": ac_schedule(quantity),
        "adaptive": None,
    }


def generate_paths(count: int, seed: int, stress: bool = False) -> list[Path]:
    """Generate independent, held-out P-scenarios; never train on these paths.

    S evolves under P, quotes V(t,S) computed by Q Black-Scholes valuation.
    Here a period is one trading day; remaining option maturity starts at 1 y.
    """
    if count < 1:
        raise ValueError("positive path count required")
    rng = random.Random(seed)
    mu = -0.40 if stress else 0.08
    sigma_p = 0.50 if stress else 0.20
    dt = 1.0/252.0
    paths = []
    for _ in range(count):
        spot = 100.0
        mids = [black_scholes_call(spot, 100.0, 0.02, 0.20, 1.0)]
        volumes = []
        for k in range(N):
            volume = rng.randint(8, 22) if stress else rng.randint(18, 48)
            volumes.append(volume)
            shock = rng.gauss(0.0, 1.0)
            spot *= math.exp((mu - 0.5*sigma_p**2)*dt
                             + sigma_p*math.sqrt(dt)*shock)
            mids.append(black_scholes_call(spot, 100.0, 0.02, 0.20,
                                           1.0 - (k + 1)*dt))
        paths.append(Path(tuple(mids), tuple(volumes)))
    return paths


def execute(path: Path, name: str, quantity: int = QUANTITY,
            fee: float = FEE) -> Result:
    """Decide order using history mids[:k+1]; observe capacity only *after* order.

    All fills are simulated, never claimed to be actual counterfactual executions.
    """
    if len(path.mids) != N+1 or len(path.volumes) != N:
        raise ValueError("path has wrong number of periods")
    if quantity <= 0 or fee < 0 or any(v < 0 for v in path.volumes):
        raise ValueError("invalid quantity, fee, or volume")
    plans = schedules(quantity)
    if name not in plans:
        raise ValueError("unknown strategy")
    plan = plans[name]
    done = 0
    cash = 0.0
    fees = 0.0
    inv, orders, fills, prices, cumulative = [], [], [], [], []
    for k in range(N):
        remain = quantity - done
        if name == "adaptive":
            if k == N-1:
                order = remain
            else:
                previous_move = 0.0 if k == 0 else path.mids[k] - path.mids[k-1]
                factor = 1.50 if previous_move < 0 else 0.75
                order = min(remain, math.ceil(factor * remain / (N-k)))
        else:
            assert plan is not None
            # Cumulative target is fixed ex ante; backlog can be carried forward.
            order = min(remain, max(0, sum(plan[:k+1]) - done))
        # The engine sees realized volume; the policy had NO access to it.
        capacity = math.floor(PARTICIPATION_CAP * path.volumes[k])
        fill = min(order, capacity)
        fill_price = path.mids[k] - SPREAD_HALF - IMPACT*fill
        done += fill
        cash += fill*fill_price
        fees += fee*fill
        residual = quantity - done
        # Running mark-to-market at the end of period k: *not* a sale.
        running = quantity*path.mids[0] - cash - residual*path.mids[k+1] + fees
        inv.append(residual)
        orders.append(order)
        fills.append(fill)
        prices.append(fill_price)
        cumulative.append(running)
    residual = quantity - done
    loss = quantity*path.mids[0] - cash - residual*path.mids[-1] + fees
    result = Result(loss, cash, fees, residual, tuple(inv), tuple(orders),
                    tuple(fills), tuple(prices), tuple(cumulative))
    assert abs(result.shortfall - result.cumulative_shortfall[-1]) < 1e-8
    assert sum(result.fills) + result.residual == quantity
    assert all(f <= o for f, o in zip(result.fills, result.orders))
    return result


def telescoping_shortfall(path: Path, result: Result) -> float:
    """Sum execution friction and mark-to-market risk over *post-trade* inventory."""
    friction = sum(q*(path.mids[k]-result.fill_prices[k])
                   for k, q in enumerate(result.fills)) + result.fees
    price_move = sum(result.inventory[k] * (path.mids[k] - path.mids[k+1])
                     for k in range(N))
    return friction + price_move


def empirical_var_es(losses: list[float], alpha: float = ALPHA) -> tuple[float, float]:
    """Left empirical quantile and quantile-integral ES, including boundary ties."""
    if not losses or not 0 < alpha < 1:
        raise ValueError("nonempty losses and 0<alpha<1 required")
    ordered = sorted(losses)
    n = len(losses)
    var = ordered[max(0, math.ceil(alpha*n) - 1)]
    integral = 0.0
    for i, value in enumerate(ordered):
        mass = max(0.0, min((i+1)/n, 1.0) - max(i/n, alpha))
        integral += mass*value
    return var, integral/(1.0-alpha)


def mean_ci(values: list[float]) -> tuple[float, float]:
    """Approximate normal 95% CI for mean on independent paths; no exact guarantee."""
    avg = mean(values)
    half = math.inf if len(values) < 2 else 1.96*stdev(values)/math.sqrt(len(values))
    return avg, half


def self_test() -> None:
    q = 12
    for name, sched in schedules(q).items():
        if sched is not None:
            assert sum(sched) == q and min(sched) >= 0, name
    path = Path((10.0, 9.0, 11.0, 10.0, 8.0), (40, 40, 40, 40))
    for name in schedules():
        r = execute(path, name, q)
        assert abs(r.shortfall - telescoping_shortfall(path, r)) < 1e-8
    # Future price shocks and future volume cannot affect orders before observed.
    modified = Path((10.0, 9.0, 11.0, 10.0, 500.0), (40, 40, 40, 999))
    for name in schedules():
        orig = execute(path, name, q)
        other = execute(modified, name, q)
        assert orig.orders[:3] == other.orders[:3]
        assert orig.fills[:3] == other.fills[:3]
    # All liquidity absent: no cash, entire parent remains marked at terminal.
    no_fill = Path((10.0, 9.0, 11.0, 10.0, 8.0), (0, 0, 0, 0))
    r = execute(no_fill, "TWAP", q)
    assert r.cash == r.fees == 0 and r.residual == q
    assert abs(r.shortfall - q*(10-8)) < 1e-8
    # One 4-point empirical distribution: 75% quantile = 2, tail = 4.
    v, es = empirical_var_es([0.0, 1.0, 2.0, 4.0], 0.75)
    assert v == 2.0 and abs(es-4.0) < 1e-9
    # Fee is paid on fills only, so raising it increases loss by fill count.
    low = execute(path, "TWAP", q, fee=0.02)
    high = execute(path, "TWAP", q, fee=0.05)
    assert abs(high.shortfall-low.shortfall-0.03*sum(low.fills)) < 1e-8
    # Q price at zero maturity is exactly the payoff.
    assert black_scholes_call(105, 100, 0.02, 0.2, 0) == 5
    print("self-test: PASS (accounting, causality, capacity, VaR/ES, fees, Q pricing)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--paths", type=int, default=240)
    parser.add_argument("--seed", type=int, default=20261119)
    parser.add_argument("--stress", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    paths = generate_paths(args.paths, args.seed, args.stress)
    policies = tuple(schedules())
    results = {name: [execute(path, name) for path in paths] for name in policies}
    print("Synthetic P held-out evaluation; identical exogenous paths across policies.")
    print("Q: BSM zero-dividend call; S0=K=100, r=2%, sigma_Q=20%, T=1y.")
    print("P: drift={}%, sigma_P={}%; 4 daily periods, parent=12 contracts.".format(
        -40 if args.stress else 8, 50 if args.stress else 20))
    print("All yen; last inventory is MARKED, not actually liquidated.")
    print("policy         mean IS (95% approx CI)     VaR95     ES95    fill%")
    for name, recs in results.items():
        costs = [r.shortfall for r in recs]
        avg, half = mean_ci(costs)
        var, es = empirical_var_es(costs)
        fill_rate = mean([(QUANTITY-r.residual)/QUANTITY for r in recs])
        print(f"{name:<14} {avg:8.3f} +/-{half:7.3f}      {var:7.3f}  {es:7.3f}  {100*fill_rate:5.1f}")
    print("Paired differences relative to TWAP, same held-out P-paths:")
    for name in policies[1:]:
        differences = [a.shortfall-b.shortfall
                       for a, b in zip(results["TWAP"], results[name])]
        avg, half = mean_ci(differences)
        print(f"  TWAP - {name}: {avg:+.3f} +/- {half:.3f} yen (approx 95%)")
    example = paths[0]
    rec = results["adaptive"][0]
    print("First held-out P-path, adaptive; prices quoted at slot starts:")
    print(" slot    mid quote   market volume   order   fill    inventory   cumulative IS")
    for k in range(N):
        print(f" {k+1:>4}   {example.mids[k]:>9.3f}   {example.volumes[k]:>13}   "
              f"{rec.orders[k]:>5}   {rec.fills[k]:>4}   {rec.inventory[k]:>10}   "
              f"{rec.cumulative_shortfall[k]:>13.3f}")
    print(f" Terminal mark: {example.mids[-1]:.3f} yen/contract; residual {rec.residual}.")
    print("The 95% CI assumes independent synthetic paths; it excludes model bias.")
    print("Do not interpret a replay as observed fills or a trading recommendation.")


if __name__ == "__main__":
    main()
