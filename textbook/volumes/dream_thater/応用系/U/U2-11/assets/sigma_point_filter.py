"""U2-11: deterministic sigma-point moment and UKF diagnostics.

Standard library only. Inputs and outputs are dimensionless unless stated.
Monte Carlo samples are independently drawn with a fixed local seed.
"""
import argparse
import math
import random

SEED = 20261117


def sigma_scalar(m, p):
    if p <= 0:
        raise ValueError("positive state variance required")
    r = math.sqrt(p)
    return ((m, m + r, m - r), (0.0, 0.5, 0.5), (2.0, 0.5, 0.5))


def transform_scalar(m, p, h):
    points, wm, wc = sigma_scalar(m, p)
    values = [h(x) for x in points]
    mean = sum(w * y for w, y in zip(wm, values))
    variance = sum(w * (y - mean) ** 2 for w, y in zip(wc, values))
    cross = sum(w * (x - m) * (y - mean)
                for w, x, y in zip(wc, points, values))
    return mean, variance, cross


def exact_quadratic(m, p):
    return m * m + p, 4.0 * m * m * p + 2.0 * p * p, 2.0 * m * p


def ukf_update(m=1.0, p=0.25, r=0.25, z=2.0):
    if r <= 0:
        raise ValueError("positive observation variance required")
    mean, var, cross = transform_scalar(m, p, lambda x: x * x)
    s = var + r
    gain = cross / s
    return mean, s, cross, gain, m + gain * (z - mean), p - gain * cross


def ekf_update(m=1.0, p=0.25, r=0.25, z=2.0):
    if p <= 0 or r <= 0:
        raise ValueError("positive variances required")
    h = m * m
    jacobian = 2.0 * m
    s = jacobian * jacobian * p + r
    gain = p * jacobian / s
    return h, s, gain, m + gain * (z - h), p - gain * jacobian * p


def affine_2d():
    # m=(1,-1), P=[[4,1],[1,1]], A=(1,2), R=1.
    # L=[[2,0],[1/2,sqrt(3)/2]]; points are +/- sqrt(2) L[:,i].
    m = (1.0, -1.0)
    columns = ((2.0, 0.5), (0.0, math.sqrt(3.0) / 2.0))
    shifts = [(0.0, 0.0)]
    for c in columns:
        shifts.append(tuple(math.sqrt(2.0) * v for v in c))
    for c in columns:
        shifts.append(tuple(-math.sqrt(2.0) * v for v in c))
    wm = [0.0] + [0.25] * 4
    wc = [2.0] + [0.25] * 4
    xs = [(m[0] + d[0], m[1] + d[1]) for d in shifts]
    ys = [x[0] + 2.0 * x[1] for x in xs]
    mean = sum(w * y for w, y in zip(wm, ys))
    variance = sum(w * (y - mean) ** 2 for w, y in zip(wc, ys))
    cross = tuple(sum(w * (x[j] - m[j]) * (y - mean)
                      for w, x, y in zip(wc, xs, ys))
                  for j in range(2))
    return mean, variance, cross


def sample_quadratic(draws=30000):
    if draws < 1:
        raise ValueError("draws must be positive")
    rng = random.Random(SEED)
    values = [rng.gauss(1.0, 0.5) ** 2 for _ in range(draws)]
    mean = sum(values) / draws
    var = sum((v - mean) ** 2 for v in values) / draws
    return mean, var


def close(actual, expected, tolerance=1e-11):
    if abs(actual - expected) > tolerance:
        raise AssertionError(f"expected {expected}, got {actual}")


def self_test():
    close(transform_scalar(0.0, 1.0, lambda x: x*x)[0], 1.0)
    close(transform_scalar(0.0, 1.0, lambda x: x*x)[1], 2.0)
    close(transform_scalar(0.0, 1.0, lambda x: x*x)[2], 0.0)
    for m, p in ((0.0, 1.0), (1.0, 0.25), (2.0, 0.25), (-3.0, 4.0)):
        for actual, exact in zip(transform_scalar(m, p, lambda x: x*x),
                                 exact_quadratic(m, p)):
            close(actual, exact)
    quartic = transform_scalar(0.0, 1.0, lambda x: x**4)
    close(quartic[0], 1.0)
    close(quartic[1], 2.0)
    affine = affine_2d()
    close(affine[0], -1.0)
    close(affine[1], 12.0)
    for a, b in zip(affine[2], (6.0, 3.0)):
        close(a, b)
    actual = ukf_update()
    for a, b in zip(actual, (1.25, 11/8, 0.5, 4/11, 14/11, 3/44)):
        close(a, b)
    expected_ekf = (1.0, 1.25, 0.4, 1.4, 0.05)
    for a, b in zip(ekf_update(), expected_ekf):
        close(a, b)
    try:
        sigma_scalar(0, 0)
    except ValueError:
        pass
    else:
        raise AssertionError("singular state variance was accepted")
    mean, variance = sample_quadratic()
    assert abs(mean - 1.25) < 0.06, mean
    assert abs(variance - 1.125) < 0.13, variance
    return "PASS: sigma moments, quadratic exactness, quartic failure, 2D affine, EKF/UKF, Monte Carlo"


def scenario(name):
    if name == "quadratic":
        print("X ~ N(2, 0.25), h(x)=x^2")
        print("sigma transform:", transform_scalar(2.0, .25, lambda x: x*x))
        print("exact moments:", exact_quadratic(2.0, .25))
    elif name == "quartic":
        print("X ~ N(0,1), h(x)=x^4")
        print("sigma-point mean, variance:", transform_scalar(0.0, 1.0, lambda x: x**4)[:2])
        print("exact Gaussian mean, variance:", 3.0, 96.0)
    elif name == "update":
        print("UKF (zbar,S,C,K,m+,P+):", ukf_update())
        print("EKF (zbar,S,K,m+,P+):", ekf_update())
    elif name == "affine":
        print("m=(1,-1), P=[[4,1],[1,1]], h(x)=x1+2*x2")
        print("sigma-point mean, variance, cross covariance:", affine_2d())
    elif name == "samples":
        print("seed:", SEED, "independent draws:", 30000)
        print("sample mean, variance:", sample_quadratic())
        print("exact predictive mean, variance:", 1.25, 1.125)
    else:
        raise ValueError("unknown scenario")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario", choices=("quadratic", "quartic", "update", "affine", "samples"))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test or args.scenario is None:
        print(self_test())
    if args.scenario is not None:
        scenario(args.scenario)
