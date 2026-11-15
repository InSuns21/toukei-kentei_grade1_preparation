"""U3-47: independent quadrature and Monte Carlo checks for normal/t VaR and ES.

Only Python 3 standard library is required. Units: 10,000 JPY.
"""
import argparse
import math
import random
from statistics import NormalDist


def t_pdf(x, nu):
    log_c = (math.lgamma((nu + 1) / 2) - math.lgamma(nu / 2)
             - 0.5 * math.log(nu * math.pi))
    return math.exp(log_c - ((nu + 1) / 2) * math.log1p(x * x / nu))


def simpson(f, a, b, n=2000):
    assert n > 0 and n % 2 == 0
    h = (b - a) / n
    total = f(a) + f(b)
    for i in range(1, n):
        total += (4 if i % 2 else 2) * f(a + i * h)
    return total * h / 3


def t_cdf(x, nu):
    # Symmetry gives F(-x) = 1-F(x); integrate only over a finite interval.
    s = 1 if x >= 0 else -1
    return 0.5 + s * simpson(lambda u: t_pdf(u, nu), 0, abs(x), 2000)


def t_quantile(alpha, nu):
    lo, hi = -2.0, 2.0
    while t_cdf(lo, nu) > alpha:
        lo *= 2
    while t_cdf(hi, nu) < alpha:
        hi *= 2
    for _ in range(47):
        mid = (lo + hi) / 2
        if t_cdf(mid, nu) < alpha:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


def tail_first_moment(pdf, q):
    # u=q+v/(1-v): infinite integration domain maps onto [0,1].
    # For nu>1 the endpoint integrand tends to zero.
    def integrand(v):
        if v == 1.0:
            return 0.0
        u = q + v / (1-v)
        return u * pdf(u) / ((1-v) ** 2)
    return simpson(integrand, 0.0, 1.0, 20000)


def empirical_var_es(sample, alpha):
    values = sorted(sample)
    n = len(values)
    q_index = max(0, math.ceil(n * alpha) - 1)
    var = values[q_index]
    # Exact equal-weight empirical quantile integral, including fractions.
    tail = n * (1 - alpha)
    k = int(tail)
    fraction = tail - k
    total = sum(values[-k:]) if k else 0.0
    if fraction:
        total += fraction * values[-k-1]
    return var, total / tail


def run(alpha, samples, nu=5, mean=2.0, std=10.0):
    assert 0.5 < alpha < 1 and nu > 2 and samples >= 1000
    beta = 1-alpha
    z = NormalDist().inv_cdf(alpha)
    phi = lambda x: math.exp(-x*x/2) / math.sqrt(2*math.pi)
    tq = t_quantile(alpha, nu)
    scale = std * math.sqrt((nu-2)/nu)

    normal_closed = (mean+std*z, mean+std*phi(z)/beta)
    t_closed = (mean+scale*tq,
                mean+scale*(nu+tq*tq)*t_pdf(tq, nu)/((nu-1)*beta))
    normal_integral = mean+std*tail_first_moment(phi, z)/beta
    t_integral = mean+scale*tail_first_moment(
        lambda x: t_pdf(x, nu), tq)/beta

    rng = random.Random(47)
    normal_sample = [mean+std*rng.gauss(0, 1) for _ in range(samples)]
    t_sample = [mean+scale*(rng.gauss(0, 1) /
                math.sqrt(rng.gammavariate(nu/2, 2)/nu))
                for _ in range(samples)]

    print("units: 10,000 JPY; P model, same mean/variance")
    print(f"alpha={alpha}, nu={nu}, mean={mean}, std={std}, "
          f"t_scale={scale:.6f}, n={samples}, seed=47")
    print("model | closed VaR | closed ES | quadrature ES | empirical VaR | empirical ES")
    for name, closed, quad, sample in (
        ("normal", normal_closed, normal_integral, normal_sample),
        ("t", t_closed, t_integral, t_sample),
    ):
        empirical = empirical_var_es(sample, alpha)
        print(f"{name:6} | {closed[0]:10.5f} | {closed[1]:9.5f} | "
              f"{quad:13.5f} | {empirical[0]:13.5f} | {empirical[1]:12.5f}")
        if not math.isclose(closed[1], quad, rel_tol=1e-5, abs_tol=1e-4):
            raise AssertionError(f"quadrature mismatch for {name}: {quad}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--alpha", type=float, default=0.99)
    parser.add_argument("--samples", type=int, default=20000)
    args = parser.parse_args()
    run(args.alpha, args.samples)
