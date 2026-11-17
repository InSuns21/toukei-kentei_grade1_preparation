"""U3-65: synthetic passive fills, market orders, and finite-horizon DP.

All prices are measured against a fixed arrival midprice (JPY/share).
The inventory penalty is a modeled risk proxy, NOT a realized price P&L.
No external packages: identical source works with CPython and Pyodide.
"""
from __future__ import annotations

import argparse
import math
import random
import statistics


def poisson_mass(n: int, rate: float) -> float:
    """P(N=n), N ~ Poisson(rate), for the small bounded inputs used here."""
    p = math.exp(-rate)
    for k in range(1, n + 1):
        p *= rate / k
    return p


def fill_distribution(size: int, ahead: int, rate: float,
                      cancellation: float) -> list[float]:
    """P(F=f), f=0..size. Cancel at most one unit AHEAD before arrivals."""
    if size == 0:
        return [1.0]
    weights = [0.0] * (size + 1)
    for flag, weight in ((0, 1.0 - cancellation), (1, cancellation)):
        a = max(0, ahead - flag)
        p0 = math.exp(-rate)
        masses = [p0]
        for n in range(1, a + size):
            masses.append(masses[-1] * rate / n)
        weights[0] += weight * sum(masses[:a + 1])
        for f in range(1, size):
            weights[f] += weight * masses[a + f]
        weights[size] += weight * max(0.0, 1.0 - sum(masses[:a + size]))
    if abs(sum(weights) - 1.0) > 1e-10 or min(weights) < -1e-12:
        raise ArithmeticError("invalid fill probability vector")
    return weights


def validate(p: argparse.Namespace) -> None:
    if not (1 <= p.quantity <= 10 and 1 <= p.periods <= 10
            and 0 <= p.queue <= 10 and 1 <= p.paths <= 100000):
        raise ValueError("quantity, periods, paths must be 1..10, 1..10, 1..100000; queue 0..10")
    xs = (p.rate, p.cancellation, p.maker_credit, p.market_cost,
          p.impact, p.inventory_penalty, p.terminal_cost, p.terminal_impact)
    if not all(math.isfinite(x) for x in xs):
        raise ValueError("parameters must be finite")
    if p.rate < 0 or not 0 <= p.cancellation <= 1 or any(x < 0 for x in xs[2:]):
        raise ValueError("rate and cost parameters >=0; cancellation in [0,1]")


def solve(p: argparse.Namespace):
    """Backward induction with one decision (market m, posted limit l) per slot."""
    qmax = p.quantity
    continuation = [p.terminal_cost * q + p.terminal_impact * q * q
                    for q in range(qmax + 1)]
    policy = [{} for _ in range(p.periods)]
    values = [None] * (p.periods + 1)
    values[p.periods] = continuation[:]
    for t in reversed(range(p.periods)):
        now = []
        for q in range(qmax + 1):
            best = math.inf
            best_action = None
            for market in range(q + 1):
                for limit in range(q - market + 1):
                    pmf = fill_distribution(limit, p.queue, p.rate, p.cancellation)
                    expected = p.market_cost * market + p.impact * market**2
                    for fill, probability in enumerate(pmf):
                        after = q - market - fill
                        expected += probability * (
                            -p.maker_credit * fill
                            + p.inventory_penalty * after**2
                            + continuation[after])
                    if expected < best - 1e-12:
                        best = expected
                        best_action = (market, limit)
            now.append(best)
            policy[t][q] = best_action
        continuation = now
        values[t] = now[:]
    return values, policy


def poisson_draw(rate: float, rng: random.Random) -> int:
    """Knuth sampler: rate<=10 by design (small synthetic model)."""
    threshold = math.exp(-rate)
    product = 1.0
    n = 0
    while True:
        product *= rng.random()
        if product <= threshold:
            return n
        n += 1


def simulate(p: argparse.Namespace, policy) -> dict:
    rng = random.Random(p.seed)
    costs = []
    total_market = total_limit = total_unfilled = 0
    for _ in range(p.paths):
        q = p.quantity
        cost = 0.0
        for t in range(p.periods):
            market, limit = policy[t][q]
            a = max(0, p.queue - int(rng.random() < p.cancellation))
            n = poisson_draw(p.rate, rng)
            filled = min(limit, max(0, n - a))
            q -= market + filled
            cost += (p.market_cost * market + p.impact * market**2
                     - p.maker_credit * filled + p.inventory_penalty * q**2)
            total_market += market
            total_limit += filled
        total_unfilled += q
        cost += p.terminal_cost * q + p.terminal_impact * q**2
        costs.append(cost)
    mean = statistics.mean(costs)
    se = statistics.stdev(costs) / math.sqrt(p.paths) if p.paths > 1 else float("nan")
    return dict(mean=mean, se=se, market=total_market / p.paths,
                limit=total_limit / p.paths, terminal=total_unfilled / p.paths)


def self_test():
    """Analytic 1-share oracle and distribution normalization."""
    from argparse import Namespace
    def params(**kw):
        defaults = dict(quantity=1, periods=1, queue=0, rate=1.0,
                        cancellation=0.0, maker_credit=0.1,
                        market_cost=0.12, impact=0.0,
                        inventory_penalty=0.05, terminal_cost=0.4,
                        terminal_impact=0.0, paths=500, seed=65)
        defaults.update(kw)
        return Namespace(**defaults)
    for a in (0, 1, 3):
        for c in (0.0, 0.5, 1.0):
            for l in (0, 1, 2, 4):
                dist = fill_distribution(l, a, 1.0, c)
                assert len(dist) == l + 1
                assert abs(sum(dist) - 1.0) < 1e-12
    p0 = 1 - math.exp(-1)
    p1 = 1 - 2 / math.e
    assert abs(fill_distribution(1, 0, 1, 0)[1] - p0) < 1e-12
    assert abs(fill_distribution(1, 1, 1, 0)[1] - p1) < 1e-12
    assert abs(fill_distribution(1, 1, 1, 1)[1] - p0) < 1e-12
    v0, pol0 = solve(params(queue=0))
    assert pol0[0][1] == (0, 1)
    assert abs(v0[0][1] - (0.45 * (1 - p0) - 0.1 * p0)) < 1e-12
    v1, pol1 = solve(params(queue=1))
    assert pol1[0][1] == (1, 0)
    assert abs(v1[0][1] - 0.12) < 1e-12
    p = params(queue=0, rate=0)
    _, pol = solve(p)
    assert pol[0][1] == (1, 0)
    return "self_test=PASS (probability mass, queue, cancellation, exact DP)"


def main():
    parser = argparse.ArgumentParser(description="U3-65 stochastic market/limit execution")
    parser.add_argument("--quantity", type=int, default=3)
    parser.add_argument("--periods", type=int, default=3)
    parser.add_argument("--queue", type=int, default=1, help="shares ahead of our passive order")
    parser.add_argument("--rate", type=float, default=1.0, help="opposing Poisson shares / slot")
    parser.add_argument("--cancellation", type=float, default=0.25)
    parser.add_argument("--maker-credit", type=float, default=0.1,
                        help="midprice-relative benefit JPY/share for passive fill")
    parser.add_argument("--market-cost", type=float, default=0.12,
                        help="midprice-relative taker cost JPY/share")
    parser.add_argument("--impact", type=float, default=0.01,
                        help="quadratic immediate market fee JPY/share^2")
    parser.add_argument("--inventory-penalty", type=float, default=0.03,
                        help="per-slot inventory risk proxy JPY/share^2")
    parser.add_argument("--terminal-cost", type=float, default=0.4,
                        help="forced end-market fee JPY/share")
    parser.add_argument("--terminal-impact", type=float, default=0.02,
                        help="forced end-market quadratic fee JPY/share^2")
    parser.add_argument("--paths", type=int, default=20000)
    parser.add_argument("--seed", type=int, default=65)
    parser.add_argument("--self-test", action="store_true")
    p = parser.parse_args()
    if p.self_test:
        print(self_test())
        return
    try:
        validate(p)
    except ValueError as ex:
        parser.error(str(ex))
    if p.rate > 10:
        parser.error("Poisson rate must be <=10 (small-model sampler)")
    values, policy = solve(p)
    result = simulate(p, policy)
    value = values[0][p.quantity]
    print("Synthetic sell execution; integer shares; JPY midprice-relative cost")
    print(f"Q={p.quantity} slots={p.periods} queue={p.queue} rate={p.rate} cancel={p.cancellation}")
    print("t | shares remaining q | optimal market m | passive posted l | DP cost JPY")
    for t in range(p.periods):
        for q in range(1, p.quantity + 1):
            m, l = policy[t][q]
            print(f"{t} | {q} | {m} | {l} | {values[t][q]:.7f}")
    print(f"initial exact DP J_0(Q)={value:.8f} JPY")
    print(f"MC policy mean={result['mean']:.8f} JPY, standard error={result['se']:.8f} JPY")
    print(f"absolute DP-MC difference={abs(result['mean']-value):.8f} JPY")
    print(f"average market shares={result['market']:.5f}, "
          f"passive filled={result['limit']:.5f}, "
          f"forced terminal={result['terminal']:.5f}")
    print(f"conservation sum={result['market']+result['limit']+result['terminal']:.8f} shares")
    if p.paths >= 30 and abs(result["mean"] - value) > 5 * result["se"] + 1e-10:
        raise ArithmeticError("MC-vs-DP discrepancy above five standard errors")
    print("MC-vs-DP check: PASS (five-SE criterion; statistical check, not a proof)")


if __name__ == "__main__":
    main()
