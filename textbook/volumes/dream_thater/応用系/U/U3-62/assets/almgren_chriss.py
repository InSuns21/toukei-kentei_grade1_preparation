"""U3-62: fixed-schedule Almgren--Chriss liquidation (stdlib only).

Quantity: shares; time: hours; mean cost: JPY; variance: JPY^2.
Future price shocks are never used in schedule construction.
"""
from __future__ import annotations

import argparse
from math import asinh, exp, expm1, isfinite, sinh, sqrt


def validate(quantity, periods, hours, eta, gamma, sigma, risk_aversion):
    if type(periods) is not int or periods < 1:
        raise ValueError("periods must be a positive integer")
    if not all(isfinite(v) for v in (quantity, hours, eta, gamma, sigma, risk_aversion)):
        raise ValueError("all inputs must be finite")
    if quantity <= 0 or hours <= 0 or eta <= 0:
        raise ValueError("quantity, hours and eta must be positive")
    if gamma < 0 or sigma < 0 or risk_aversion < 0:
        raise ValueError("gamma, sigma, risk_aversion must be nonnegative")
    dt = hours / periods
    r = (risk_aversion * sigma**2 / eta) * dt**2
    if not isfinite(r):
        raise ValueError("risk coefficient overflow")
    return dt, r


def solve_tridiagonal(quantity, periods, r):
    """Thomas elimination on the positive-definite interior matrix."""
    if periods == 1:
        return [quantity, 0.0]
    count = periods - 1
    diag = []
    rhs = []
    for k in range(count):
        d = 2.0 + r
        b = quantity if k == 0 else 0.0
        if k:
            d -= 1.0 / diag[-1]      # elimination of lower -1
            b += rhs[-1] / diag[-1]
        diag.append(d)
        rhs.append(b)
    interior = [0.0] * count
    for k in range(count - 1, -1, -1):
        after = interior[k + 1] if k < count - 1 else 0.0
        interior[k] = (rhs[k] + after) / diag[k]  # upper -1
    return [quantity, *interior, 0.0]


def solve_analytic(quantity, periods, r):
    """Exact sinh ratio, stabilized for large theta and small r."""
    if r == 0:
        return [quantity * (1 - i / periods) for i in range(periods)] + [0.0]
    theta = 2 * asinh(sqrt(r) / 2)
    if theta == 0:
        return [quantity * (1 - i / periods) for i in range(periods)] + [0.0]
    result = [quantity]
    for i in range(1, periods):
        if periods * theta < 20:
            ratio = sinh((periods - i) * theta) / sinh(periods * theta)
        else:
            ratio = (exp(-i * theta) * expm1(-2 * (periods - i) * theta)
                     / expm1(-2 * periods * theta))
        result.append(quantity * ratio)
    return result + [0.0]


def evaluate(path, dt, eta, gamma, sigma, risk_aversion):
    fills = [a - b for a, b in zip(path, path[1:])]
    mean = gamma * path[0]**2 / 2 + eta / dt * sum(q*q for q in fills)
    variance = sigma**2 * dt * sum(pre*pre for pre in path[:-1])
    return {"fills": fills, "mean": mean, "variance": variance,
            "objective": mean + risk_aversion * variance, "remaining": path[-1]}


def cash_ledger(path, shocks, dt, eta, gamma, initial=100.0):
    """Compute realized C from average fills and independent inventory identity."""
    if len(shocks) != len(path) - 1:
        raise ValueError("one price increment per interval is required")
    if not all(isfinite(v) for v in [*shocks, initial]):
        raise ValueError("all price inputs must be finite")
    quantity, unaffected, sold, cash = path[0], initial, 0.0, 0.0
    for pre, post, shock in zip(path, path[1:], shocks):
        q = pre - post
        unaffected += shock
        before_mid = unaffected - gamma * sold
        average_fill = before_mid - gamma*q/2 - eta*q/dt
        cash += q*average_fill
        sold += q
    observed = quantity * initial - cash
    theoretical = (gamma*quantity**2/2
                   + eta/dt * sum((a-b)**2 for a, b in zip(path, path[1:]))
                   - sum(pre*shock for pre, shock in zip(path[:-1], shocks)))
    return observed, theoretical


def optimize(quantity=100.0, periods=4, hours=2.0,
             eta=0.01, gamma=0.002, sigma=0.1, risk_aversion=1.0):
    dt, r = validate(quantity, periods, hours, eta, gamma, sigma, risk_aversion)
    path = solve_tridiagonal(quantity, periods, r)
    exact = solve_analytic(quantity, periods, r)
    if not all(a >= b - 1e-10*quantity and b >= -1e-10*quantity
               for a, b in zip(path, path[1:])):
        raise AssertionError("liquidation path violates sell-only requirement")
    residual = max((abs(-path[i-1]+(2+r)*path[i]-path[i+1])
                    for i in range(1, periods)), default=0.0)
    difference = max(abs(a-b) for a, b in zip(path, exact))
    equal = [quantity * (1-i/periods) for i in range(periods)] + [0.0]
    return {"dt": dt, "r": r, "path": path, "analytic": exact,
            "max_residual": residual, "max_difference": difference,
            "optimal": evaluate(path, dt, eta, gamma, sigma, risk_aversion),
            "twap": evaluate(equal, dt, eta, gamma, sigma, risk_aversion)}


def main():
    parser = argparse.ArgumentParser(description="U3-62 Almgren--Chriss ex-ante liquidation")
    parser.add_argument("--quantity", type=float, default=100.0)
    parser.add_argument("--periods", type=int, default=4)
    parser.add_argument("--hours", type=float, default=2.0)
    parser.add_argument("--eta", type=float, default=0.01)
    parser.add_argument("--gamma", type=float, default=0.002)
    parser.add_argument("--sigma", type=float, default=0.1)
    parser.add_argument("--risk-aversion", type=float, default=1.0)
    args = parser.parse_args()
    r = optimize(**vars(args))
    print("Synthetic sell-only model: shares, hours, JPY, JPY^2")
    print("interval | pre inventory | sold | post inventory | analytic post")
    for i, q in enumerate(r["optimal"]["fills"], 1):
        print(f"{i:>8} | {r['path'][i-1]:>13.6f} | {q:>10.6f} | "
              f"{r['path'][i]:>14.6f} | {r['analytic'][i]:>13.6f}")
    for kind in ("optimal", "twap"):
        d = r[kind]
        print(f"{kind}: E[C]={d['mean']:.6f} JPY, Var(C)={d['variance']:.6f} JPY^2, "
              f"J={d['objective']:.6f} JPY, remaining={d['remaining']:.6f} shares")
    print(f"max analytic difference: {r['max_difference']:.3e} shares")
    print(f"max stationarity residual: {r['max_residual']:.3e} shares")
    print("Frontier (risk aversion in 1/JPY):")
    for lam in (0, 0.25, 1, 4):
        t = optimize(args.quantity, args.periods, args.hours,
                     args.eta, args.gamma, args.sigma, lam)["optimal"]
        print(f"lambda={lam:.2f}: E[C]={t['mean']:.6f}, Var(C)={t['variance']:.6f}")


if __name__ == "__main__":
    main()
