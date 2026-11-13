"""U3-24: American put via implicit finite differences and projected SOR (stdlib)."""
from math import exp, sqrt


def cr_r_put(s0, strike, maturity, rate, dividend, sigma, steps):
    dt = maturity / steps
    up = exp(sigma * sqrt(dt))
    down = 1 / up
    prob = (exp((rate - dividend) * dt) - down) / (up - down)
    if not 0 < prob < 1:
        raise ValueError("CRR risk-neutral probability must be in (0,1)")
    disc = exp(-rate * dt)
    values = [max(strike - s0 * up ** j * down ** (steps - j), 0.0)
              for j in range(steps + 1)]
    for n in range(steps - 1, -1, -1):
        for j in range(n + 1):
            hold = disc * (prob * values[j + 1] + (1 - prob) * values[j])
            exercise = max(strike - s0 * up ** j * down ** (n - j), 0.0)
            values[j] = max(exercise, hold)
    return values[0]


def solve_put(m=60, n=100, smax=300.0, strike=100.0,
              maturity=1.0, rate=0.05, dividend=0.02, sigma=0.20,
              omega=1.25, tol=1e-10, max_iter=20000):
    """Return price at S=K, diagnostics, and exercise/continuation nodes."""
    if not (m >= 3 and n >= 1 and smax > strike > 0 and maturity > 0
            and rate >= 0 and dividend >= 0 and sigma > 0 and 0 < omega < 2):
        raise ValueError("Invalid model/grid parameters")
    h, k = smax / m, maturity / n
    a = [0.5 * (sigma ** 2 * i * i - (rate - dividend) * i)
         for i in range(1, m)]
    c = [0.5 * (sigma ** 2 * i * i + (rate - dividend) * i)
         for i in range(1, m)]
    if min(a + c) < 0:
        raise ValueError("Centered spatial coefficients must be nonnegative")
    diagonal = [1 + k * (sigma ** 2 * i * i + rate) for i in range(1, m)]
    lower = [-k * ai for ai in a]
    upper = [-k * ci for ci in c]
    payoff = [max(strike - i * h, 0.0) for i in range(m + 1)]
    values = payoff[:]
    max_violation = 0.0
    max_fixed_error = 0.0
    slowest_iterations = 0
    alpha = 1.0 / max(diagonal)
    for _ in range(n):
        old = values[:]
        # Fixed Dirichlet boundaries: American put at S=0 is K, and at Smax is 0.
        rhs = [old[i] for i in range(1, m)]
        rhs[0] -= lower[0] * strike
        rhs[-1] -= upper[-1] * 0.0
        values = old[:]
        for iteration in range(1, max_iter + 1):
            largest_step = 0.0
            for j in range(m - 1):
                i = j + 1
                raw = (rhs[j] - lower[j] * values[i - 1]
                       - upper[j] * values[i + 1]) / diagonal[j]
                candidate = max(payoff[i], values[i] + omega * (raw - values[i]))
                largest_step = max(largest_step, abs(candidate - values[i]))
                values[i] = candidate
            if largest_step < tol:
                break
        else:
            raise RuntimeError("Projected SOR did not converge")
        slowest_iterations = max(slowest_iterations, iteration)
        fixed_error = 0.0
        for j in range(m - 1):
            i = j + 1
            w = (diagonal[j] * values[i] + lower[j] * values[i - 1]
                 + upper[j] * values[i + 1] - rhs[j])
            slack = values[i] - payoff[i]
            max_violation = max(max_violation, max(0.0, -slack, -w), abs(min(slack, w)))
            t = max(payoff[i], values[i] - alpha * w)
            fixed_error = max(fixed_error, abs(values[i] - t))
        max_fixed_error = max(max_fixed_error, fixed_error / (alpha * (1 + k * rate)))
    x = strike / h
    ix = int(x)
    price = values[ix] + (x - ix) * (values[ix + 1] - values[ix])
    in_money = [i for i in range(1, m) if i * h < strike]
    exercise = [i for i in in_money if values[i] - payoff[i] < 1e-7]
    continuation = [i for i in in_money if values[i] - payoff[i] >= 1e-7]
    boundary_estimate = max((i * h for i in exercise), default=None)
    return dict(price=price, max_lcp_residual=max_violation,
                fixed_point_error_bound=max_fixed_error, max_iterations=slowest_iterations,
                boundary=boundary_estimate, exercise_count=len(exercise),
                continuation_count=len(continuation))


def main():
    print("S0=K=100 JPY; T=1 yr; r=5%, q=2%, sigma=20%; Smax=300 JPY")
    ref = cr_r_put(100, 100, 1, 0.05, 0.02, 0.20, 800)
    print(f"CRR(800) = {ref:.9f} JPY")
    for m, n in [(30, 60), (60, 120), (120, 240)]:
        r = solve_put(m=m, n=n)
        print(f"M={m:3} N={n:3}: price={r['price']:.9f}, "
              f"|FD-CRR|={abs(r['price'] - ref):.6f}, "
              f"LCP={r['max_lcp_residual']:.2e}, "
              f"cert_bound={r['fixed_point_error_bound']:.2e}, "
              f"last_exercise_node={r['boundary']} JPY, "
              f"max_iter={r['max_iterations']}")
    sample = solve_put(m=60, n=120)
    assert sample['max_lcp_residual'] < 1e-6
    assert sample['fixed_point_error_bound'] < 1e-5
    assert sample['price'] >= 0


if __name__ == '__main__':
    main()
