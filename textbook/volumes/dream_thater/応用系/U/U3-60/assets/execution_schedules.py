"""U3-60: causal synthetic TWAP / forecast-VWAP / POV comparison.

A share is indivisible. Planned TWAP and forecast VWAP allocations use
deterministic largest-remainder rounding. POV rounds *down* per interval;
its continuous-budget identity is exact when rho * market volume is integral.
Prices and fees are Decimal; volume and fills are synthetic, with no impact.
"""
from __future__ import annotations

import argparse
from decimal import Decimal, ROUND_FLOOR


FORECAST = (100, 200, 300, 200)
BASE_VOLUMES = (80, 240, 160, 320)
MARKET_PRICES = tuple(map(Decimal, ("100", "100.2", "100.1", "100.4")))
FILL_PRICES = tuple(map(Decimal, ("100.1", "100.3", "100.2", "100.5")))
ARRIVAL = Decimal("100")
TERMINAL = Decimal("100.6")
FEE_PER_SHARE = Decimal("0.02")
MAX_PARTICIPATION = Decimal("0.20")


def _validate(quantity, volume, forecast, participation):
    if type(quantity) is not int or quantity <= 0:
        raise ValueError("parent quantity must be a positive integer")
    if len(volume) != 4 or len(forecast) != 4:
        raise ValueError("the synthetic session has exactly four intervals")
    if any(type(v) is not int or v < 0 for v in volume):
        raise ValueError("observed market volume must be nonnegative integers")
    if any(type(v) is not int or v < 0 for v in forecast) or sum(forecast) == 0:
        raise ValueError("forecast volume must be nonnegative with positive total")
    if not participation.is_finite() or participation < 0 or participation > 1:
        raise ValueError("participation must be a finite number between 0 and 1")


def allocate_integer(quantity, weights):
    """Nonnegative integer allocation; ties broken by earlier interval."""
    if not weights or any(w < 0 for w in weights) or sum(weights) <= 0:
        raise ValueError("weights must be nonnegative and nonzero")
    total = sum(weights)
    whole = [(quantity * w) // total for w in weights]
    missing = quantity - sum(whole)
    rank = sorted(range(len(weights)),
                  key=lambda i: (-(quantity * weights[i] % total), i))
    for i in rank[:missing]:
        whole[i] += 1
    assert sum(whole) == quantity
    return tuple(whole)


def fixed_fill(target, capacity):
    """No reallocation or carry: fills are independent min(target, capacity)."""
    return tuple(min(d, c) for d, c in zip(target, capacity))


def causal_pov(quantity, volume, participation, capacity=None):
    """Aggregated online outcome for per-trade observe-then-act policy.

    In this synthetic immediate-fill model, each interval observes trades
    incrementally and reacts to *already observed* market volume. At the
    interval end the aggregate is the sum of such fills. Whole shares use
    floor(rho * v_i); rounding can cause extra residual shares.
    """
    remaining = quantity
    fills = []
    for market_volume in volume:
        quota = int((participation * market_volume).to_integral_value(
            rounding=ROUND_FLOOR))
        cap = capacity[len(fills)] if capacity is not None else quota
        bought = min(remaining, quota, cap)
        fills.append(bought)
        remaining -= bought
    return tuple(fills)


def cost_breakdown(quantity, fills):
    filled = sum(fills)
    residual = quantity - filled
    if residual < 0:
        raise ValueError("a schedule filled beyond the parent")
    executed_notional = sum((Decimal(x) * p
                             for x, p in zip(fills, FILL_PRICES)), Decimal(0))
    execution_gap = sum((Decimal(x) * (p - ARRIVAL)
                         for x, p in zip(fills, FILL_PRICES)), Decimal(0))
    opportunity = Decimal(residual) * (TERMINAL - ARRIVAL)
    fee = Decimal(filled) * FEE_PER_SHARE
    shortfall = execution_gap + opportunity + fee
    cash = -executed_notional - fee
    assert shortfall == executed_notional + Decimal(residual) * TERMINAL \
        - Decimal(quantity) * ARRIVAL + fee
    assert shortfall == -Decimal(quantity) * ARRIVAL - \
        (cash - Decimal(residual) * TERMINAL)
    return {
        "filled": filled, "remaining": residual, "execution_gap": execution_gap,
        "opportunity": opportunity, "fee": fee, "shortfall": shortfall,
        "cash": cash, "inventory": filled, "notional": executed_notional,
        "average_price": executed_notional / Decimal(filled) if filled else None,
    }


def compare(quantity=120, last_volume=320, participation=Decimal("0.15")):
    participation = Decimal(participation)
    volume = BASE_VOLUMES[:-1] + (last_volume,)
    _validate(quantity, volume, FORECAST, participation)
    cap = tuple(int((MAX_PARTICIPATION * v).to_integral_value(
        rounding=ROUND_FLOOR)) for v in volume)

    twap_target = allocate_integer(quantity, (1, 1, 1, 1))
    vwap_target = allocate_integer(quantity, FORECAST)
    twap = fixed_fill(twap_target, cap)
    vwap = fixed_fill(vwap_target, cap)
    # Capacity binds inside the sequential POV inventory update when needed.
    # The uncapped POV identity is not asserted when this cap binds.
    pov = causal_pov(quantity, volume, participation, cap)
    market_vwap = (sum((Decimal(v) * p for v, p in zip(
        volume, MARKET_PRICES)), Decimal(0)) / Decimal(sum(volume))
                   if sum(volume) else None)
    results = {}
    for name, target, fills in (
        ("TWAP", twap_target, twap),
        ("forecast_VWAP", vwap_target, vwap),
        ("POV", None, pov),
    ):
        results[name] = {
            "target": target, "fills": fills,
            "cumulative": tuple(sum(fills[:i+1]) for i in range(4)),
            **cost_breakdown(quantity, fills),
        }
    return {"quantity": quantity, "forecast": FORECAST, "volume": volume,
            "capacity": cap, "participation": participation,
            "market_vwap": market_vwap, "methods": results}


def main():
    parser = argparse.ArgumentParser(description="U3-60 execution comparison")
    parser.add_argument("--quantity", type=int, default=120)
    parser.add_argument("--last-volume", type=int, default=320)
    parser.add_argument("--participation", default="0.15")
    args = parser.parse_args()
    sample = compare(args.quantity, args.last_volume,
                     Decimal(args.participation))
    print("SYNTHETIC buy; intervals 1..4; shares; prices in JPY/share")
    print("forecast_market_volume", sample["forecast"])
    print("realized_market_volume", sample["volume"])
    print("synthetic_fill_cap", sample["capacity"])
    print("realized_market_VWAP", sample["market_vwap"])
    for name, row in sample["methods"].items():
        print(f"{name}: target={row['target']} fills={row['fills']}"
              f" cumulative={row['cumulative']}")
        print(f"  filled={row['filled']} remaining={row['remaining']}"
              f" execution_gap={row['execution_gap']}"
              f" opportunity={row['opportunity']} fee={row['fee']}"
              f" IS={row['shortfall']}")
        print(f"  cash={row['cash']} inventory={row['inventory']}"
              f" average_price={row['average_price']}")
    print("CHECK: IS = execution_gap + opportunity + fee")


if __name__ == "__main__":
    main()
