"""U3-64 transient impact: deterministic ex-ante liquidation.

No external packages. Units: shares, hours, JPY, JPY^2.
A symmetric exponential impact kernel and its state recurrence are evaluated
independently. The projected-gradient solution is certified by a conservative
strong-convexity bound (eta must stay positive).
"""
from __future__ import annotations

import argparse
from math import exp, inf, isfinite, log, sqrt


def project_simplex(y: list[float], total: float) -> list[float]:
    """Euclidean projection: q_i=max(0,y_i-theta), sum(q_i)=total."""
    ordered = sorted(y, reverse=True)
    prefix, active, theta = 0.0, 0, 0.0
    for k, value in enumerate(ordered, 1):
        prefix += value
        candidate = (prefix - total) / k
        if value > candidate:
            active, theta = k, candidate
    if not active:
        raise ArithmeticError("empty projection active set")
    theta = (sum(ordered[:active]) - total) / active
    return [max(0.0, v - theta) for v in y]


def calculate(q: list[float], total: float, hours: float, kappa: float,
              eta: float, decay: float, sigma: float, risk: float) -> dict:
    n = len(q)
    dt = hours / n
    d = 0.0
    remaining = total
    pre_inventory = []
    pre_displacement = []
    post_displacement = []
    recurrent_cost = 0.0
    for amount in q:
        pre_inventory.append(remaining)
        pre_displacement.append(d)
        recurrent_cost += amount * (d + 0.5 * kappa * amount
                                    + eta * amount / dt)
        remaining -= amount
        d += kappa * amount
        post_displacement.append(d)
        d *= decay
    kernel = [[decay ** abs(i - j) for j in range(n)] for i in range(n)]
    # When decay=0, 0**0 is 1 and every off-diagonal entry vanishes.
    kq = [sum(kernel[i][j] * q[j] for j in range(n)) for i in range(n)]
    kernel_cost = (0.5 * kappa * sum(qi * ki for qi, ki in zip(q, kq))
                   + eta / dt * sum(qi * qi for qi in q))
    variance = sigma * sigma * dt * sum(x * x for x in pre_inventory)
    r = risk * sigma * sigma * dt
    grad = [0.0] * n
    later_inventory = 0.0
    for i in reversed(range(n)):
        grad[i] = (kappa * kq[i] + 2 * eta / dt * q[i]
                   - 2 * r * later_inventory)
        later_inventory += pre_inventory[i]
    return dict(impact=kernel_cost, recurrence=recurrent_cost,
                variance=variance, objective=kernel_cost + risk * variance,
                grad=grad, remaining=remaining, inventory=pre_inventory,
                before=pre_displacement, after=post_displacement,
                kernel=kernel)


def solve(total: float = 90.0, hours: float = 3.0, periods: int = 3,
          kappa: float = 0.02, eta: float = 0.001, decay: float = 0.5,
          sigma: float = 0.1, risk: float = 0.0,
          tol: float = 1e-9, max_iter: int = 30000) -> dict:
    if type(periods) is not int or periods < 1:
        raise ValueError("periods must be a positive integer")
    values = (total, hours, kappa, eta, decay, sigma, risk, tol)
    if not all(isfinite(v) for v in values):
        raise ValueError("all numerical parameters must be finite")
    if total <= 0 or hours <= 0 or kappa <= 0 or eta <= 0 or tol <= 0:
        raise ValueError("total, hours, kappa, eta, tol must be positive")
    if not (0 <= decay <= 1) or sigma < 0 or risk < 0:
        raise ValueError("decay in [0,1], sigma and risk nonnegative required")
    if type(max_iter) is not int or max_iter < 1:
        raise ValueError("max_iter must be positive")

    dt = hours / periods
    # K is positive semidefinite; its spectral norm is <= N.
    # B_ki=1(i<k); ||B||_2^2 <= ||B||_F^2=N(N-1)/2.
    mu = 2 * eta / dt
    lipschitz = (kappa * periods + 2 * eta / dt
                 + risk * sigma * sigma * dt * periods * (periods - 1))
    if not isfinite(lipschitz) or lipschitz <= 0:
        raise ValueError("nonfinite Hessian bound")
    step = 1 / lipschitz
    q = [total / periods] * periods
    converged = False
    certified_error = inf
    for iteration in range(1, max_iter + 1):
        info = calculate(q, total, hours, kappa, eta, decay, sigma, risk)
        proposal = [v - step * g for v, g in zip(q, info["grad"])]
        nxt = project_simplex(proposal, total)
        jump = sqrt(sum((v - u) ** 2 for v, u in zip(nxt, q)))
        certified_error = jump * lipschitz / mu
        q = nxt
        if certified_error <= tol * max(1.0, total):
            converged = True
            break
    info = calculate(q, total, hours, kappa, eta, decay, sigma, risk)
    consistency = abs(info["impact"] - info["recurrence"])
    if consistency > 1e-9 * max(1.0, abs(info["impact"])):
        raise ArithmeticError("kernel / state recurrence mismatch")
    info.update(q=q, dt=dt, decay=decay, iterations=iteration,
                converged=converged, certified_error=certified_error,
                kernel_state_gap=consistency, mu=mu, lipschitz=lipschitz,
                sum_error=abs(sum(q) - total))
    return info


def main() -> None:
    parser = argparse.ArgumentParser(description="U3-64 transient impact simulator")
    parser.add_argument("--quantity", type=float, default=90.0)
    parser.add_argument("--hours", type=float, default=3.0)
    parser.add_argument("--periods", type=int, default=3)
    parser.add_argument("--kappa", type=float, default=0.02)
    parser.add_argument("--eta", type=float, default=0.001)
    parser.add_argument("--decay", type=float, default=0.5,
                        help="one-step persistence a in [0,1]")
    parser.add_argument("--recovery", type=float, default=None,
                        help="rho per hour; overrides --decay")
    parser.add_argument("--sigma", type=float, default=0.1)
    parser.add_argument("--risk-aversion", type=float, default=0.0)
    parser.add_argument("--max-iter", type=int, default=30000)
    args = parser.parse_args()
    if args.periods < 1:
        parser.error("periods must be positive")
    dt = args.hours / args.periods
    if args.recovery is not None:
        if not isfinite(args.recovery) or args.recovery < 0 or dt <= 0:
            parser.error("recovery must be finite and nonnegative, hours positive")
        args.decay = exp(-args.recovery * dt)
    try:
        info = solve(total=args.quantity, hours=args.hours, periods=args.periods,
                     kappa=args.kappa, eta=args.eta, decay=args.decay,
                     sigma=args.sigma, risk=args.risk_aversion,
                     max_iter=args.max_iter)
    except ValueError as exc:
        parser.error(str(exc))
    decay = info["decay"]
    rho = (-log(decay) / info["dt"] if decay > 0 else inf)
    print("Synthetic ex-ante sell orders; shares / hours / JPY / JPY^2")
    print(f"decay={decay:.6g}; resilience rho={rho:.8g} per hour")
    print("i | sell shares | inventory before | D before JPY/share | D after JPY/share")
    for i, (q, x, d0, d1) in enumerate(
            zip(info["q"], info["inventory"], info["before"], info["after"]), 1):
        print(f"{i} | {q:11.6f} | {x:16.6f} | {d0:18.8f} | {d1:17.8f}")
    for key in ("impact", "recurrence", "variance", "objective", "remaining",
                "sum_error", "kernel_state_gap", "certified_error"):
        print(f"{key}={info[key]:.12g}")
    print(f"iterations={info['iterations']} converged={info['converged']}")
    if args.periods == 2:
        h = 2 * args.eta / info["dt"] + args.kappa * (1 - decay)
        r = args.risk_aversion * args.sigma**2 * info["dt"]
        exact = args.quantity * h / (2 * (h + r))
        print(f"two_period_exact_last={exact:.12g}, "
              f"absolute_error={abs(info['q'][1]-exact):.10g} shares")
    if not info["converged"]:
        raise SystemExit("iteration limit reached; no certified numerical answer")


if __name__ == "__main__":
    main()
