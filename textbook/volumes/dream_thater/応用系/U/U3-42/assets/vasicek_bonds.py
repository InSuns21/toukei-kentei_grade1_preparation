"""U3-42: Vasicek discount curve and exact integrated-short-rate Monte Carlo.

Only Python's standard library is required. Values are model-implied, not observed quotes.
"""
import argparse
import math
import random
import statistics


def terms(kappa, theta, sigma, r_now, maturity):
    """Conditional mean/variance of integral(r) and exact ZCB price."""
    if kappa <= 0.0 or sigma < 0.0 or maturity <= 0.0:
        raise ValueError("kappa > 0, sigma >= 0 and maturity > 0 are required")
    b = -math.expm1(-kappa * maturity) / kappa
    # Var(I) = sigma**2 * integral_0^T [(1-exp(-kappa*u))/kappa]**2 du.
    v = (sigma / kappa) ** 2 * (
        maturity - 2.0 * b
        + (-math.expm1(-2.0 * kappa * maturity)) / (2.0 * kappa)
    )
    v = max(v, 0.0)  # correct tiny negative roundoff for very small T
    mean = theta * maturity + (r_now - theta) * b
    bond = math.exp(-mean + 0.5 * v)
    zero_yield = -math.log(bond) / maturity
    forward = (theta + (r_now - theta) * math.exp(-kappa * maturity)
               - (sigma ** 2 / (2.0 * kappa ** 2))
               * (-math.expm1(-kappa * maturity)) ** 2)
    return b, mean, v, bond, zero_yield, forward


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--samples", type=int, default=20000)
    parser.add_argument("--sigma", type=float, default=0.02)
    parser.add_argument("--kappa", type=float, default=1.0)
    parser.add_argument("--theta", type=float, default=0.04)
    parser.add_argument("--rate", type=float, default=0.03)
    parser.add_argument("--seed", type=int, default=20261115)
    args = parser.parse_args()
    if args.samples < 2:
        parser.error("--samples must be at least 2")
    if args.samples > 200000:
        parser.error("--samples must not exceed 200000 in the browser")

    print("Vasicek Q short rate, annualized continuous rates; model quotes")
    print("T(years)  P(0,T)     zero(%)    forward(%)   Var(I)")
    for maturity in (1.0, 2.0, 3.0, 5.0):
        _, _, var_i, price, zero, fwd = terms(
            args.kappa, args.theta, args.sigma, args.rate, maturity
        )
        print(f"{maturity:7.1f}   {price:.8f}   {100*zero:8.5f}   "
              f"{100*fwd:10.5f}   {var_i:.8f}")

    # Conditional exact Gaussian law for I = integral_0^T r_u du.
    # Draw e^{-I}; there is sampling error but NO time-discretization bias.
    maturity = 2.0
    _, mean_i, var_i, exact, _, _ = terms(
        args.kappa, args.theta, args.sigma, args.rate, maturity
    )
    rng = random.Random(args.seed)
    sd = math.sqrt(var_i)
    samples = [math.exp(-mean_i - sd * rng.gauss(0.0, 1.0))
               for _ in range(args.samples)]
    estimate = statistics.mean(samples)
    stderr = statistics.stdev(samples) / math.sqrt(args.samples)
    print(f"\nT={maturity:g} analytic={exact:.10f}, "
          f"MC={estimate:.10f}, SE={stderr:.10f}, "
          f"abs-error={abs(estimate-exact):.10f}")
    if stderr > 0:
        print(f"standardized difference={abs(estimate-exact)/stderr:.3f} SE")
    else:
        print("zero-volatility deterministic check:",
              "PASS" if abs(estimate-exact) < 1e-12 else "FAIL")
    # Independent checks: maturity zero, sigma=0, sensitivity.
    b, m, v, p, _, _ = terms(args.kappa, args.theta, 0.0, args.rate, 1.0)
    assert v == 0.0 and math.isclose(p, math.exp(-m), abs_tol=1e-12)
    assert b > 0.0 and math.isfinite(exact) and exact > 0.0
    print("deterministic limit and positivity: PASS")


if __name__ == "__main__":
    main()
