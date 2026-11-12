"""Finite-binomial American option: deterministic numerical experiment.

Python >= 3.10, no third-party dependencies. Amounts are in the units of S0/K;
R is the gross return per time step; q is a pricing probability, not a forecast.
"""
from dataclasses import dataclass
from math import isfinite


@dataclass(frozen=True)
class Model:
    s0: float
    u: float
    d: float
    r: float
    strike: float
    steps: int
    option: str = "put"

    def __post_init__(self):
        numbers = (self.s0, self.u, self.d, self.r, self.strike)
        if not all(isfinite(x) for x in numbers):
            raise ValueError("all numeric parameters must be finite")
        if not (self.s0 > 0 and 0 < self.d < self.r < self.u):
            raise ValueError("require S0>0 and 0<d<R<u")
        if self.strike < 0 or not isinstance(self.steps, int) or self.steps < 0:
            raise ValueError("require K>=0 and integer N>=0")
        if self.option not in ("put", "call"):
            raise ValueError("option must be put or call")

    @property
    def q(self) -> float:
        return (self.r - self.d) / (self.u - self.d)

    def price_at(self, t: int, up: int) -> float:
        return self.s0 * self.u ** up * self.d ** (t - up)

    def payoff(self, t: int, up: int) -> float:
        s = self.price_at(t, up)
        return max(self.strike - s, 0.0) if self.option == "put" else max(s - self.strike, 0.0)


def american(model: Model):
    """Return values[t][k], continuation[t][k], exercise[t][k].

    k means number of upward moves among the first t moves. A tie is exercised.
    """
    n = model.steps
    values = [[] for _ in range(n + 1)]
    continuation = [[] for _ in range(n + 1)]
    exercise = [[] for _ in range(n + 1)]
    values[n] = [model.payoff(n, k) for k in range(n + 1)]
    continuation[n] = [None] * (n + 1)
    exercise[n] = [True] * (n + 1)
    q = model.q
    for t in range(n - 1, -1, -1):
        for k in range(t + 1):
            c = ((1 - q) * values[t + 1][k] + q * values[t + 1][k + 1]) / model.r
            h = model.payoff(t, k)
            continuation[t].append(c)
            exercise[t].append(h >= c)
            values[t].append(max(h, c))
    return values, continuation, exercise


def european(model: Model) -> float:
    values = [model.payoff(model.steps, k) for k in range(model.steps + 1)]
    q = model.q
    for t in range(model.steps - 1, -1, -1):
        values = [((1 - q) * values[k] + q * values[k + 1]) / model.r for k in range(t + 1)]
    return values[0]


def enumerate_stopping_values(model: Model):
    """Independently enumerate all admissible nodewise stop/continue policies.

    Exponential growth: intended only for N<=3 as a test oracle.
    Each choice to continue pairs a child-U policy with a child-D policy;
    decisions are made only after reaching the corresponding child.
    """
    if model.steps > 3:
        raise ValueError("exhaustive oracle restricted to N<=3")

    def choices(t: int, k: int):
        stop_here = model.payoff(t, k)
        if t == model.steps:
            return [stop_here]
        down = choices(t + 1, k)
        up = choices(t + 1, k + 1)
        return [stop_here] + [((1 - model.q) * vd + model.q * vu) / model.r
                              for vd in down for vu in up]

    return choices(0, 0)


def main():
    model = Model(100.0, 1.2, 0.8, 1.05, 100.0, 2, "put")
    values, continuation, exercise = american(model)
    print("S0=100, u=1.2, d=0.8, R=1.05, K=100, N=2, put (no dividends)")
    print(f"q={model.q:.8f}, American={values[0][0]:.8f}, European={european(model):.8f}")
    for t in range(model.steps):
        for k in range(t + 1):
            action = "exercise" if exercise[t][k] else "continue"
            print(f"t={t}, up={k}: S={model.price_at(t, k):.2f}, "
                  f"H={model.payoff(t, k):.8f}, C={continuation[t][k]:.8f}, "
                  f"Y={values[t][k]:.8f}, action={action}")


if __name__ == "__main__":
    main()
