"""U2-12: fixed-interval Gaussian batch least squares and Kalman smoothing.

Scalar three-time model, all quantities dimensionless:
X0 ~ N(0,1), Xt = X(t-1) + Wt, Wt ~ N(0,1),
Zt = Xt + Vt, Vt ~ N(0,1) whenever a sensor reading exists.
The initial state, all Wt and all Vt are mutually independent.
No randomness is used: the results are deterministic algebraic checks.
"""
import argparse


def batch_system(observations):
    """Build the three-by-three information matrix and right-hand side."""
    if len(observations) != 3:
        raise ValueError("expected observations at times 0, 1, 2")
    a = [[2.0, -1.0, 0.0],
         [-1.0, 2.0, -1.0],
         [0.0, -1.0, 1.0]]
    d = [0.0, 0.0, 0.0]
    # Prior precision 1 is already in A[0][0].
    # The two motion precision terms are also already in A.
    for t, observed in enumerate(observations):
        if observed is not None:
            a[t][t] += 1.0  # Observation variance R=1.
            d[t] += float(observed)
    return a, d


def solve_tridiagonal(a, d):
    """Eliminate adjacent unknowns, without a general dense matrix inverse."""
    n = len(d)
    diag = [a[i][i] for i in range(n)]
    upper = [a[i][i + 1] for i in range(n - 1)]
    lower = [a[i + 1][i] for i in range(n - 1)]
    rhs = [float(v) for v in d]
    for i in range(1, n):
        if diag[i - 1] <= 0:
            raise ValueError("nonpositive elimination pivot")
        factor = lower[i - 1] / diag[i - 1]
        diag[i] -= factor * upper[i - 1]
        rhs[i] -= factor * rhs[i - 1]
    if diag[-1] <= 0:
        raise ValueError("nonpositive elimination pivot")
    result = [0.0] * n
    result[-1] = rhs[-1] / diag[-1]
    for i in range(n - 2, -1, -1):
        result[i] = (rhs[i] - upper[i] * result[i + 1]) / diag[i]
    return result


def inverse_diagonal(a):
    """Compute only the diagonal of the posterior covariance A^{-1}."""
    n = len(a)
    diagonal = []
    for j in range(n):
        unit = [1.0 if i == j else 0.0 for i in range(n)]
        column = solve_tridiagonal(a, unit)
        diagonal.append(column[j])
    return diagonal


def kalman_filter(observations):
    """Prior, predictions and filtered moments at each time."""
    if len(observations) != 3:
        raise ValueError("expected three time slots")
    m_plus, p_plus, m_minus, p_minus = [], [], [], []
    for t, z in enumerate(observations):
        if t == 0:
            prior_m, prior_p = 0.0, 1.0
        else:
            prior_m = m_plus[t - 1]  # F=1 and b=0.
            prior_p = p_plus[t - 1] + 1.0  # Q=1.
        m_minus.append(prior_m)
        p_minus.append(prior_p)
        if z is None:
            posterior_m, posterior_p = prior_m, prior_p
        else:
            gain = prior_p / (prior_p + 1.0)  # H=1, R=1.
            posterior_m = prior_m + gain * (z - prior_m)
            posterior_p = (1.0 - gain) * prior_p
        m_plus.append(posterior_m)
        p_plus.append(posterior_p)
    return m_plus, p_plus, m_minus, p_minus


def smooth(filtered):
    """Rauch-Tung-Striebel backward recursion, scalar F=1."""
    m_plus, p_plus, m_minus, p_minus = filtered
    ms, ps = m_plus[:], p_plus[:]
    gains = [0.0] * (len(ms) - 1)
    for t in range(len(ms) - 2, -1, -1):
        g = p_plus[t] / p_minus[t + 1]
        gains[t] = g
        ms[t] = m_plus[t] + g * (ms[t + 1] - m_minus[t + 1])
        ps[t] = p_plus[t] + g * g * (ps[t + 1] - p_minus[t + 1])
    return ms, ps, gains


def run_case(observations):
    a, d = batch_system(observations)
    batch = solve_tridiagonal(a, d)
    cov_diag = inverse_diagonal(a)
    filtered = kalman_filter(observations)
    ms, ps, gains = smooth(filtered)
    return a, d, batch, cov_diag, filtered, ms, ps, gains


def close(actual, expected, tolerance=1e-10):
    if abs(actual - expected) > tolerance:
        raise AssertionError("expected %r, got %r" % (expected, actual))


def assert_case(observations, expected_mean, expected_variance):
    a, d, batch, covariance, filtered, ms, ps, _ = run_case(observations)
    for i in range(3):
        close(batch[i], expected_mean[i])
        close(ms[i], expected_mean[i])
        close(ps[i], expected_variance[i])
        close(covariance[i], expected_variance[i])
        close(sum(a[i][j] * batch[j] for j in range(3)), d[i])
    # Terminal filtering and smoothing condition on the same observations.
    close(filtered[0][-1], ms[-1])
    close(filtered[1][-1], ps[-1])


def self_test():
    assert_case([None, 1.0, 2.0],
                [0.5, 1.0, 1.5],
                [5 / 8, 1 / 2, 5 / 8])
    assert_case([None, None, 3.0],
                [3 / 4, 3 / 2, 9 / 4],
                [3 / 4, 1.0, 3 / 4])
    assert_case([None, None, None],
                [0.0, 0.0, 0.0],
                [1.0, 2.0, 3.0])
    # A without initial anchoring, and without observations, has null vector (1,1,1).
    unanchored = [[1., -1., 0.], [-1., 2., -1.], [0., -1., 1.]]
    for row in unanchored:
        close(sum(row), 0.0)
    # The input guards reject a malformed time axis.
    try:
        batch_system([1.0])
    except ValueError:
        pass
    else:
        raise AssertionError("incorrect time axis was accepted")
    return "PASS: batch equations, inverse diagonal, Kalman, RTS, missing data, null direction"


def scenario(name):
    if name == "gauge":
        print("Only movement terms; prior and observations removed:")
        print("A = [[1,-1,0],[-1,2,-1],[0,-1,1]]")
        print("A @ (1,1,1) = (0,0,0): no unique absolute position.")
        return
    observations = [None, 1.0, 2.0] if name == "two" else [None, None, 3.0]
    a, d, batch, covariance, filtered, ms, ps, gains = run_case(observations)
    print("time slots: 0,1,2; observations:", observations)
    print("Q=R=P0=1, F=H=1, all noise sources independent")
    print("information matrix A:", a)
    print("information vector d:", d)
    print("batch MAP/mean:", batch)
    print("batch marginal variances:", covariance)
    print("forward filter means:", filtered[0])
    print("forward filter variances:", filtered[1])
    print("backward gains:", gains)
    print("smoothed means:", ms)
    print("smoothed variances:", ps)
    print("max absolute discrepancy (means):",
          max(abs(batch[i] - ms[i]) for i in range(3)))
    print("max absolute discrepancy (variances):",
          max(abs(covariance[i] - ps[i]) for i in range(3)))


def main():
    parser = argparse.ArgumentParser(description="U2-12 Gaussian batch/smoother")
    parser.add_argument("--scenario", choices=("two", "missing", "gauge"),
                        default="two")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        print(self_test())
    else:
        scenario(args.scenario)


if __name__ == "__main__":
    main()
