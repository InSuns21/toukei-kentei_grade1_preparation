"""PML2-17: resolution transfer examples with identical Fourier weights.

Usage: python resolution_demo.py
No external dependencies.
"""
import cmath
import math


def fno_layer(values, cube=False):
    """Scalar M=1: R[+1]=R[-1]=1 and R[0]=W=b=0."""
    n = len(values)
    if n < 4 or n % 2:
        raise ValueError("N must be an even integer >= 4")
    c_plus = sum(values[j] * cmath.exp(-2j * math.pi * j / n)
                 for j in range(n)) / n
    c_minus = sum(values[j] * cmath.exp(2j * math.pi * j / n)
                  for j in range(n)) / n
    out = [(c_plus * cmath.exp(2j * math.pi * j / n)
            + c_minus * cmath.exp(-2j * math.pi * j / n)).real
           for j in range(n)]
    return [v ** 3 for v in out] if cube else out


def main():
    print("N  single_layer_error  two_layer_error")
    for n in (4, 8, 16):
        grid = [j / n for j in range(n)]
        high = [math.cos(14 * math.pi * x) for x in grid]
        # Continuous FNO output of the high-frequency input is zero.
        err_single = max(abs(y) for y in fno_layer(high))
        low = [math.cos(2 * math.pi * x) for x in grid]
        # Continuous two-layer output is 3/4*cos(2*pi*x).
        two = fno_layer(fno_layer(low, cube=True))
        err_two = max(abs(y - 0.75 * math.cos(2 * math.pi * x))
                      for x, y in zip(grid, two))
        print(f"{n:2d}  {err_single:.10f}          {err_two:.10f}")
        expected_single = 0.0 if n == 16 else 1.0
        expected_two = 0.25 if n == 4 else 0.0
        assert abs(err_single - expected_single) < 1e-10
        assert abs(err_two - expected_two) < 1e-10


if __name__ == "__main__":
    main()
