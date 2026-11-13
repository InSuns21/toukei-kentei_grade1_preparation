"""Risk-neutral density: analytic oracle, Gaussian quadrature and seeded sampling.

Units: price in yen, time in years; no dividends; B_0=1.
Requires Python >=3.10; no third-party dependencies.
"""
from dataclasses import dataclass
import math
import random

@dataclass(frozen=True)
class Model:
    s0: float = 100.0
    mu: float = 0.08
    r: float = 0.03
    sigma: float = 0.20
    maturity: float = 1.0
    strike: float = 100.0

    def __post_init__(self):
        if self.s0 <= 0 or self.strike <= 0 or self.sigma <= 0 or self.maturity <= 0:
            raise ValueError("s0, strike, sigma and maturity must be positive")

    @property
    def theta(self):
        return (self.mu - self.r) / self.sigma

    def observables(self, normal_z):
        """Draw W_T^P=sqrt(T)*z; return Z_T and discounted P/Q-weighted payoffs."""
        w = math.sqrt(self.maturity) * normal_z
        stock = self.s0 * math.exp(
            (self.mu - 0.5 * self.sigma**2) * self.maturity + self.sigma * w
        )
        density = math.exp(-self.theta * w - 0.5 * self.theta**2 * self.maturity)
        discount = math.exp(-self.r * self.maturity)
        return (density, discount * stock, density * discount * stock,
                density * discount * stock**2 / self.strike)

    def theory(self):
        t = self.maturity
        return {
            "density": 1.0,
            "p_discounted_stock": self.s0 * math.exp((self.mu - self.r) * t),
            "q_discounted_stock": self.s0,
            "q_discounted_quadratic": (self.s0**2 / self.strike)
                                      * math.exp((self.r + self.sigma**2) * t),
        }

    def standard_deviations(self):
        """Exact SD of individual importance-weighted observables under P."""
        t = self.maturity
        e = self.theory()
        return {
            "density": math.sqrt(math.expm1(self.theta**2 * t)),
            "p_discounted_stock": e["p_discounted_stock"]
                                  * math.sqrt(math.expm1(self.sigma**2 * t)),
            "q_discounted_stock": e["q_discounted_stock"]
                                  * math.sqrt(math.expm1((self.sigma-self.theta)**2*t)),
            "q_discounted_quadratic": e["q_discounted_quadratic"]
                                  * math.sqrt(math.expm1((2*self.sigma-self.theta)**2*t)),
        }


KEYS = ("density", "p_discounted_stock", "q_discounted_stock",
        "q_discounted_quadratic")


def integrate_normal(model, points=16000, lower=-9.0, upper=9.0):
    """Midpoint integration against N(0,1), not Monte Carlo.

    Finite cutoff causes tail bias; step size causes quadrature error.
    """
    if points < 1 or not lower < upper:
        raise ValueError("invalid integration grid")
    step = (upper - lower) / points
    sums = [0.0] * len(KEYS)
    for j in range(points):
        z = lower + (j+0.5)*step
        weight = math.exp(-0.5*z*z) / math.sqrt(2*math.pi)
        values = model.observables(z)
        for k, value in enumerate(values):
            sums[k] += weight * value
    return dict(zip(KEYS, (s*step for s in sums)))


def sample_normal(model, count=50000, seed=20261113):
    """Monte Carlo under P, using Z_T for change-of-measure weights."""
    if count < 1:
        raise ValueError("count must be positive")
    rng = random.Random(seed)
    sums = [0.0] * len(KEYS)
    for _ in range(count):
        values = model.observables(rng.gauss(0.0, 1.0))
        for k, value in enumerate(values):
            sums[k] += value
    return dict(zip(KEYS, (s/count for s in sums)))


def report(model=Model(), count=50000, seed=20261113):
    theory = model.theory()
    quadrature = integrate_normal(model)
    estimate = sample_normal(model, count=count, seed=seed)
    sds = model.standard_deviations()
    lines = [
        f"theta={model.theta:.6f}, T={model.maturity:.2f} years, seed={seed}, n={count}",
        "Quantity                    Theory        Quadrature    MC mean       MC z-score",
    ]
    for key in KEYS:
        se = sds[key]/math.sqrt(count)
        score = (estimate[key] - theory[key])/se if se > 0 else 0.0
        lines.append(f"{key:<27} {theory[key]:>12.6f} {quadrature[key]:>12.6f}"
                     f" {estimate[key]:>12.6f} {score:>10.3f}")
    return "\n".join(lines)


if __name__ == "__main__":
    print(report())
