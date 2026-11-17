"""U3-63: ex-ante capped Almgren--Chriss liquidation, standard library only.

All quantities and participation caps are fixed before execution; realized future
volume and price shocks are not inputs. Units: shares, hours, JPY, JPY^2.
"""
from __future__ import annotations

import argparse
from math import isfinite, sqrt


def check_inputs(quantity, hours, eta, caps, sigma, gamma, risk_aversion):
    n = len(eta)
    if n < 1 or len(caps) != n:
        raise ValueError("eta and caps must have the same nonzero length")
    values = [quantity, hours, sigma, gamma, risk_aversion, *eta, *caps]
    if not all(isfinite(v) for v in values):
        raise ValueError("all quantities must be finite")
    if quantity <= 0 or hours <= 0 or any(v <= 0 for v in eta):
        raise ValueError("quantity, hours and every eta must be positive")
    if sigma < 0 or gamma < 0 or risk_aversion < 0 or any(c < 0 for c in caps):
        raise ValueError("sigma, gamma, risk aversion and caps must be nonnegative")
    if sum(caps) < quantity - 1e-12 * max(1.0, quantity):
        raise ValueError("infeasible: total ex-ante capacity is below parent order")


def project_capped_simplex(y, caps, quantity):
    """Euclidean projection onto 0<=q_i<=caps_i and sum(q_i)=quantity.

    KKT gives q_i = clip(y_i - tau, 0, caps_i). Bisection determines tau.
    """
    if sum(caps) < quantity - 1e-12 * max(1.0, quantity):
        raise ValueError("infeasible capped simplex")
    if abs(sum(caps) - quantity) <= 1e-14 * max(1.0, quantity):
        return list(caps)
    lo = min(z - c for z, c in zip(y, caps)) - 1.0
    hi = max(y) + 1.0
    for _ in range(100):
        mid = (lo + hi) / 2
        total = sum(min(c, max(0.0, z - mid)) for z, c in zip(y, caps))
        if total > quantity:
            lo = mid
        else:
            hi = mid
    tau = (lo + hi) / 2
    return [min(c, max(0.0, z - tau)) for z, c in zip(y, caps)]


def evaluate(fills, quantity, hours, eta, gamma, sigma, risk_aversion):
    """Cost, variance, gradient, and pre-/post-trade inventory."""
    n = len(fills)
    dt = hours / n
    pre = []
    post = []
    remaining = quantity
    for q in fills:
        pre.append(remaining)
        remaining -= q
        post.append(remaining)
    mean = gamma * quantity * quantity / 2
    mean += sum(e * q * q / dt for e, q in zip(eta, fills))
    variance = sigma * sigma * dt * sum(x * x for x in pre)
    risk = risk_aversion * sigma * sigma * dt
    # q_i affects x_(k-1) precisely for k>i; suffix sum builds this derivative.
    grad = [0.0] * n
    later_inventory = 0.0
    for i in range(n - 1, -1, -1):
        grad[i] = 2 * eta[i] * fills[i] / dt - 2 * risk * later_inventory
        later_inventory += pre[i]
    return dict(pre=pre, post=post, mean=mean, variance=variance,
                objective=mean + risk_aversion * variance, gradient=grad,
                terminal=remaining)


def solve(quantity=100.0, hours=2.0, eta=None, caps=None, sigma=0.1,
          gamma=0.002, risk_aversion=1.0, tol=1e-9, max_iter=30000):
    eta = list(eta if eta is not None else [0.01] * 4)
    caps = list(caps if caps is not None else [quantity] * len(eta))
    check_inputs(quantity, hours, eta, caps, sigma, gamma, risk_aversion)
    if not isfinite(tol) or tol <= 0 or type(max_iter) is not int or max_iter < 1:
        raise ValueError("tol and max_iter must be positive")
    n, dt = len(eta), hours / len(eta)
    mu = 2.0 * min(eta) / dt
    # Bound ||B||_2^2 <= ||B||_F^2 = N(N-1)/2 for x_(k-1)=Q-sum_(i<k) q_i.
    lipschitz = 2.0 * max(eta) / dt + risk_aversion * sigma**2 * dt * n * (n - 1)
    if not isfinite(lipschitz) or not isfinite(mu) or mu <= 0:
        raise ValueError("Hessian bound is not finite")
    alpha = 1.0 / lipschitz
    fills = project_capped_simplex([quantity / n] * n, caps, quantity)
    converged = False
    step_norm = float("inf")
    for iteration in range(1, max_iter + 1):
        info = evaluate(fills, quantity, hours, eta, gamma, sigma, risk_aversion)
        proposed = [q - alpha * g for q, g in zip(fills, info["gradient"])]
        next_fills = project_capped_simplex(proposed, caps, quantity)
        step_norm = sqrt(sum((a - b)**2 for a, b in zip(next_fills, fills)))
        fills = next_fills
        # Projected gradient is a contraction: a-posteriori 2-norm error
        # bounded by step_norm * L/mu.
        if step_norm * (lipschitz / mu) <= tol * max(1.0, quantity):
            converged = True
            break
    info = evaluate(fills, quantity, hours, eta, gamma, sigma, risk_aversion)
    info.update(fills=fills, caps=caps, eta=eta, dt=dt, mu=mu, L=lipschitz,
                iterations=iteration, converged=converged,
                error_bound_shares=step_norm * lipschitz / mu,
                capacity_residual=abs(sum(fills) - quantity),
                upper_violation=max((q - cap for q, cap in zip(fills, caps)), default=0.0))
    return info


def parse_csv(value, label):
    try:
        result = [float(v.strip()) for v in value.split(",")]
    except ValueError as exc:
        raise ValueError(f"invalid {label} list") from exc
    if not result or not all(isfinite(v) for v in result):
        raise ValueError(f"{label} must be nonempty and finite")
    return result


def main():
    p = argparse.ArgumentParser(description="U3-63 fixed ex-ante capped liquidation")
    p.add_argument("--quantity", type=float, default=100.0)
    p.add_argument("--hours", type=float, default=2.0)
    p.add_argument("--periods", type=int, default=4)
    p.add_argument("--eta", type=float, default=0.01)
    p.add_argument("--eta-profile", type=str, default=None)
    p.add_argument("--caps", type=str, default=None, help="ex-ante share caps, CSV")
    p.add_argument("--forecast-volume", type=str, default=None, help="forecast shares, CSV")
    p.add_argument("--participation", type=float, default=0.25)
    p.add_argument("--first-cap", type=float, default=None)
    p.add_argument("--sigma", type=float, default=0.1)
    p.add_argument("--gamma", type=float, default=0.002)
    p.add_argument("--risk-aversion", type=float, default=1.0)
    p.add_argument("--max-iter", type=int, default=30000)
    args = p.parse_args()
    if args.periods < 1:
        p.error("periods must be positive")
    if args.caps is not None and args.forecast_volume is not None:
        p.error("select either caps or forecast-volume, not both")
    if not isfinite(args.participation) or not 0 <= args.participation <= 1:
        p.error("participation must be between 0 and 1")
    eta = parse_csv(args.eta_profile, "eta") if args.eta_profile else [args.eta] * args.periods
    if args.caps is not None:
        caps = parse_csv(args.caps, "caps")
    elif args.forecast_volume is not None:
        volume = parse_csv(args.forecast_volume, "forecast volume")
        caps = [args.participation * v for v in volume]
    else:
        caps = [args.quantity] * args.periods
    if args.first_cap is not None:
        caps[0] = min(caps[0], args.first_cap)
    if len(eta) != args.periods or len(caps) != args.periods:
        p.error("eta-profile / caps / forecast-volume must match periods")
    try:
        result = solve(args.quantity, args.hours, eta, caps, args.sigma, args.gamma,
                       args.risk_aversion, max_iter=args.max_iter)
    except ValueError as exc:
        p.error(str(exc))
    print("Synthetic precommitted execution (shares / hours / JPY / JPY^2)")
    print("i | cap shares | sell shares | pre inventory | post inventory")
    for i, (cap, q, pre, post) in enumerate(zip(result["caps"], result["fills"],
                                                 result["pre"], result["post"]), 1):
        print(f"{i:>1} | {cap:>10.5f} | {q:>11.5f} | {pre:>13.5f} | {post:>14.5f}")
    for name in ("mean", "variance", "objective", "terminal", "capacity_residual",
                 "upper_violation", "error_bound_shares"):
        print(f"{name}: {result[name]:.12g}")
    print(f"iterations: {result['iterations']}; converged: {result['converged']}")
    if not result["converged"]:
        raise SystemExit("iteration limit reached: numerical solution not certified")


if __name__ == "__main__":
    main()
