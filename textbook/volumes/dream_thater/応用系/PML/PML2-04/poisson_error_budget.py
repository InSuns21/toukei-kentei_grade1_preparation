"""PML2-04: Poisson difference error budget, standard library only.

u(x) = x - x**4, -u''(x) = 12*x**2, u(0)=u(1)=0.
A_h z = b + delta; choose approximate z_tilde with residual
rho = (b + delta) - A_h z_tilde (constant at interior nodes).
"""
import argparse


def truth(x):
    return x - x**4


def force(x):
    return 12.0 * x*x


def solve_tridiagonal(n, rhs):
    """Solve (-z[j-1]+2z[j]-z[j+1])/h**2 = rhs[j-1]."""
    h = 1.0 / n
    # Thomas elimination on the scaled tri-diagonal system, no numpy.
    diagonal = [2.0] * (n - 1)
    load = [h*h * value for value in rhs]
    for j in range(1, n - 1):
        multiplier = -1.0 / diagonal[j - 1]
        diagonal[j] += multiplier
        load[j] -= multiplier * load[j - 1]
    result = [0.0] * (n + 1)
    for j in range(n - 1, 0, -1):
        result[j] = (load[j - 1] + result[j + 1]) / diagonal[j - 1]
    return result


def residual(n, values, rhs):
    h2 = (1.0 / n)**2
    return [
        rhs[j - 1] - (2.0*values[j]-values[j-1]-values[j+1])/h2
        for j in range(1, n)
    ]


def experiment(n, delta, rho):
    if n < 2:
        raise ValueError("n must be >= 2")
    h = 1.0 / n
    rhs = [force(j*h) for j in range(1, n)]
    z = solve_tridiagonal(n, rhs)
    changed = [value + delta for value in rhs]
    zhat = solve_tridiagonal(n, changed)
    # A_h(z_tilde) = changed - rho; deliberately keep a residual.
    ztilde = solve_tridiagonal(n, [value - rho for value in changed])
    ztruth = [truth(j*h) for j in range(n+1)]
    grid = max(abs(a-b) for a,b in zip(ztruth,ztilde))
    discretization = max(abs(a-b) for a,b in zip(ztruth,z))
    data_error = max(abs(a-b) for a,b in zip(z,zhat))
    solve_error = max(abs(a-b) for a,b in zip(zhat,ztilde))
    measured_residual = residual(n, ztilde, changed)
    expected = [(h*h-delta/2+rho/2)*j*h*(1-j*h) for j in range(n+1)]
    assert max(abs((a-b)-e) for a,b,e in zip(ztruth,ztilde,expected)) < 1e-10
    assert max(abs(v-rho) for v in measured_residual) < 1e-10
    assert abs(discretization - h*h/4) < 1e-10 if n % 2 == 0 else True
    bound = h*h/4 + (abs(delta)+abs(rho))/8
    assert grid <= bound + 1e-10
    assert discretization <= h*h/4 + 1e-10
    assert data_error <= abs(delta)/8 + 1e-10
    assert solve_error <= abs(rho)/8 + 1e-10
    return grid, discretization, data_error, solve_error, bound


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--delta", type=float, default=0.0,
                        help="constant forcing perturbation (default: 0)")
    parser.add_argument("--rho", type=float, default=0.0,
                        help="constant solver residual (default: 0)")
    args = parser.parse_args()
    print("n      h      total(grid)  discretization  data      solver    bound")
    for n in (4, 8, 16):
        total, discr, data, solver, bound = experiment(n, args.delta, args.rho)
        print(f"{n:<3} {1/n:8.5f} {total:12.8f} {discr:14.8f} "
              f"{data:9.6f} {solver:9.6f} {bound:10.7f}")
    for n in (4, 8, 16):
        # Adding delta=2*h*h exactly cancels the truncation error at nodes.
        total, *_ = experiment(n, 2.0/n**2, 0.0)
        assert total < 1e-10
    print("self-check: analytic error identity, residual, and cancellation OK")


if __name__ == "__main__":
    main()
