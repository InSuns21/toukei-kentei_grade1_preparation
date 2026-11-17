"""U3-61: self-contained deterministic market-impact and inventory-risk lab.

Prices are in JPY/share, quantities in shares, times in hours.
Only the two-block, fixed-schedule, complete-fill SELL model is implemented.
Shock inputs are exogenous realized increments; no future-price scheduling.
"""
from __future__ import annotations

import argparse
from math import isfinite, sqrt


def simulate(
    quantity: float = 100.0,
    first: float = 40.0,
    gamma: float = 0.002,
    eta: float = 0.01,
    sigma: float = 0.1,
    shock1: float = 0.0,
    shock2: float = 0.0,
    initial: float = 100.0,
):
    """Two intervals of one hour each, with fixed quantities and independent-noise risk formula."""
    values = (quantity, first, gamma, eta, sigma, shock1, shock2, initial)
    if not all(isfinite(v) for v in values):
        raise ValueError("all inputs must be finite")
    if quantity <= 0 or first < 0 or first > quantity:
        raise ValueError("require 0 <= first <= quantity, quantity > 0")
    if gamma < 0 or eta < 0 or sigma < 0 or initial <= 0:
        raise ValueError("gamma, eta, sigma must be nonnegative; initial must be positive")

    fills = (first, quantity - first)
    shocks = (shock1, shock2)
    dt = (1.0, 1.0)
    pre_inventory = quantity
    cumulative = 0.0
    unaffected = initial
    total_proceeds = 0.0
    rows = []
    for i, (q, eps, interval) in enumerate(zip(fills, shocks, dt), start=1):
        unaffected += eps
        pre_mid = unaffected - gamma * cumulative
        post_mid = pre_mid - gamma * q
        average_fill = pre_mid - gamma * q / 2 - eta * q / interval if q else None
        proceeds = q * average_fill if q else 0.0
        total_proceeds += proceeds
        rows.append({
            "interval": i,
            "pre_inventory": pre_inventory,
            "quantity": q,
            "unaffected": unaffected,
            "pre_mid": pre_mid,
            "post_mid": post_mid,
            "average_fill": average_fill,
            "proceeds": proceeds,
            "post_inventory": pre_inventory - q,
        })
        cumulative += q
        pre_inventory -= q

    permanent = gamma * quantity**2 / 2
    temporary = eta * sum(q**2 / interval for q, interval in zip(fills, dt))
    unaffected_component = -sum(q * (r["unaffected"] - initial)
                                for q, r in zip(fills, rows))
    expected = permanent + temporary
    actual = initial * quantity - total_proceeds
    variance = sigma**2 * (quantity**2 * dt[0] + fills[1]**2 * dt[1])
    if not isclose(actual, permanent + temporary + unaffected_component):
        raise AssertionError("cash flow and impact identity disagree")
    if not isclose(pre_inventory, 0.0):
        raise AssertionError("all parent shares must be liquidated")
    return {
        "rows": rows,
        "quantity": quantity,
        "proceeds": total_proceeds,
        "actual_cost": actual,
        "expected_cost": expected,
        "permanent_cost": permanent,
        "temporary_cost": temporary,
        "unaffected_component": unaffected_component,
        "variance": variance,
        "std": sqrt(variance),
        "remaining": pre_inventory,
    }


def isclose(x: float, y: float) -> bool:
    return abs(x - y) <= 1e-9 * max(1.0, abs(x), abs(y))


def main() -> None:
    parser = argparse.ArgumentParser(description="U3-61 synthetic two-block SELL impact model")
    parser.add_argument("--quantity", type=float, default=100.0)
    parser.add_argument("--first", type=float, default=40.0)
    parser.add_argument("--gamma", type=float, default=0.002)
    parser.add_argument("--eta", type=float, default=0.01)
    parser.add_argument("--sigma", type=float, default=0.1)
    parser.add_argument("--shock1", type=float, default=0.0)
    parser.add_argument("--shock2", type=float, default=0.0)
    args = parser.parse_args()
    result = simulate(**vars(args))
    print("SYNTHETIC SELL model: shares, JPY/share, hours, JPY, JPY^2")
    print("index | start inventory | sold | unaffected | observed pre mid | observed post mid | average fill | proceeds")
    for r in result["rows"]:
        p = "no fill" if r["average_fill"] is None else f'{r["average_fill"]:.4f}'
        print(f'{r["interval"]:>5} | {r["pre_inventory"]:>15.2f} | '
              f'{r["quantity"]:>5.2f} | {r["unaffected"]:>10.4f} | '
              f'{r["pre_mid"]:>16.4f} | {r["post_mid"]:>17.4f} | '
              f'{p:>12} | {r["proceeds"]:.4f}')
    for k in ("proceeds", "actual_cost", "expected_cost", "permanent_cost",
              "temporary_cost", "unaffected_component", "variance", "std", "remaining"):
        print(f"{k}: {result[k]:.6f}")


if __name__ == "__main__":
    main()
