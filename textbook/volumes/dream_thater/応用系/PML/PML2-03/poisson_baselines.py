"""PML2-03: 1D Dirichlet Poisson FD/FEM baselines, pure Python 3.

Solve -u'' = f on (0,1), u(0)=u(1)=0.
Cases: f=2 (exact u=x(1-x)); f=12*x*x (exact u=x-x**4).
FEM uses analytically integrated P1 hat-function loads, not nodal quadrature.
"""

from math import isclose, sqrt


def linear_solve(matrix, vector):
    """Gaussian elimination with partial pivoting; small teaching matrices only."""
    m = len(vector)
    a = [list(map(float, row)) + [float(vector[i])]
         for i, row in enumerate(matrix)]
    for k in range(m):
        pivot = max(range(k, m), key=lambda i: abs(a[i][k]))
        if abs(a[pivot][k]) < 1e-13:
            raise ValueError("Singular or badly conditioned teaching matrix")
        a[k], a[pivot] = a[pivot], a[k]
        for i in range(k + 1, m):
            scale = a[i][k] / a[k][k]
            a[i][k] = 0.0
            for j in range(k + 1, m + 1):
                a[i][j] -= scale * a[k][j]
    x = [0.0] * m
    for i in range(m - 1, -1, -1):
        x[i] = (a[i][m] - sum(a[i][j] * x[j]
                             for j in range(i + 1, m))) / a[i][i]
    return [0.0] + x + [0.0]


def make_matrix(n, scale):
    """Tridiagonal (2,-1,-1) times scale; n-1 interior nodes."""
    return [[scale * (2 if i == j else -1 if abs(i - j) == 1 else 0)
             for j in range(n - 1)] for i in range(n - 1)]


def rhs_function(case, x):
    if case == "constant":
        return 2.0
    if case == "quartic":
        return 12.0 * x * x
    raise ValueError(case)


def exact_solution(case, x):
    if case == "constant":
        return x * (1 - x)
    if case == "quartic":
        return x - x ** 4
    raise ValueError(case)


def finite_difference(n, case):
    h = 1.0 / n
    matrix = make_matrix(n, 1.0 / (h * h))
    values = [rhs_function(case, j * h) for j in range(1, n)]
    return linear_solve(matrix, values)


def finite_element_load(n, case):
    """Exact integrals of f*phi_i on each element [a,a+h]."""
    h = 1.0 / n
    values = [0.0] * (n - 1)
    for j in range(n):
        a = j * h
        if case == "constant":
            left, right = h, h
        elif case == "quartic":
            # 12*h*integral_0^1 (a+h*t)^2*(1-t) dt, and with t.
            left = 6 * h * a*a + 4*h*h*a + h**3
            right = 6 * h * a*a + 8*h*h*a + 3*h**3
        else:
            raise ValueError(case)
        if j > 0:         # local left node j is an interior node
            values[j - 1] += left
        if j < n - 1:     # local right node j+1 is an interior node
            values[j] += right
    return values


def finite_element(n, case):
    h = 1.0 / n
    return linear_solve(make_matrix(n, 1.0 / h),
                        finite_element_load(n, case))


def max_nodal_error(n, case, values):
    return max(abs(values[j] - exact_solution(case, j / n))
               for j in range(n + 1))


def main():
    print("n  case      max|FD-exact|    max|FEM-exact|   FD(center)  FEM(center)")
    for n in (4, 8, 16):
        h = 1.0 / n
        for case in ("constant", "quartic"):
            fd = finite_difference(n, case)
            fem = finite_element(n, case)
            fd_error = max_nodal_error(n, case, fd)
            fem_error = max_nodal_error(n, case, fem)
            assert fem_error < 1e-10, (n, case, fem_error)
            if case == "constant":
                assert fd_error < 1e-10, (n, fd_error)
            else:
                # Derived exact finite-difference error U_j-z_j=h^2*x_j*(1-x_j).
                for j in range(n + 1):
                    x = j * h
                    expected = exact_solution(case, x) - h*h*x*(1-x)
                    assert isclose(fd[j], expected, rel_tol=0, abs_tol=1e-10)
            print(f"{n:<2} {case:<9} {fd_error:>14.8g} "
                  f"{fem_error:>16.8g}   {fd[n//2]:>10.7f} {fem[n//2]:>11.7f}")

        # For f=2, Galerkin function is exactly the nodal interpolant.
        # Integrals over each element: int |e'|^2 = h^3/3,
        # int |e|^2 = h^5/30. Sum over n=1/h elements.
        h1_seminorm_error = h / sqrt(3)
        l2_error = h*h / sqrt(30)
        print(f"   f=2, function errors: |e|_H1={h1_seminorm_error:.9g}, "
              f"||e||_L2={l2_error:.9g}")
    # Check the hand-solvable n=2 quartic example.
    assert isclose(finite_difference(2, "quartic")[1], 3/8, abs_tol=1e-12)
    assert isclose(finite_element(2, "quartic")[1], 7/16, abs_tol=1e-12)


if __name__ == "__main__":
    main()
