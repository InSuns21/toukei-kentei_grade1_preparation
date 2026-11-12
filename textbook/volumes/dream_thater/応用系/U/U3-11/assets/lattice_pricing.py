"""CRR and recombining trinomial pricing; only Python's standard library.

Python >= 3.10. T is years, r and sigma are annualized. Values are yen.
"""
from __future__ import annotations

from math import exp, sqrt
from time import perf_counter


def parameters(n: int, T: float, r: float, sigma: float, model: str):
    if not isinstance(n, int) or isinstance(n, bool) or n < 1:
        raise ValueError("n must be a positive integer")
    if not (T > 0 and sigma > 0):
        raise ValueError("T and sigma must be positive")
    h = T / n
    R = exp(r * h)
    if model == "crr":
        u, d = exp(sigma * sqrt(h)), exp(-sigma * sqrt(h))
        q = (R - d) / (u - d)
        if not (0 < q < 1):
            raise ValueError("CRR requires d < R < u; increase n")
        return u, d, R, (1 - q, q)
    if model == "tri":
        u, d = exp(sigma * sqrt(3 * h)), exp(-sigma * sqrt(3 * h))
        p0 = 2 / 3
        pu = (R - p0 - d / 3) / (u - d)
        pd = 1 / 3 - pu
        if not (0 < pd and 0 < pu):
            raise ValueError("trinomial probabilities must be positive; increase n")
        return u, d, R, (pd, p0, pu)
    raise ValueError("model must be 'crr' or 'tri'")


def price(n: int, s0: float = 100.0, T: float = 1.0,
          r: float = 0.0, sigma: float = 0.2,
          model: str = "crr", payoff: str = "square", K: float = 100.0) -> float:
    if not s0 > 0 or K < 0:
        raise ValueError("s0 must be positive and K nonnegative")
    u, d, R, probs = parameters(n, T, r, sigma, model)
    if payoff == "square":
        f = lambda s: s * s / s0
    elif payoff == "call":
        f = lambda s: max(s - K, 0.0)
    else:
        raise ValueError("payoff must be 'square' or 'call'")
    if model == "crr":
        pd, pu = probs
        values = [f(s0 * u**k * d**(n-k)) for k in range(n + 1)]
        for t in range(n - 1, -1, -1):
            values = [(pd * values[k] + pu * values[k+1]) / R
                      for k in range(t + 1)]
    else:
        pd, p0, pu = probs
        values = [f(s0 * u**j) for j in range(-n, n + 1)]
        for t in range(n - 1, -1, -1):
            values = [(pd * values[k] + p0 * values[k+1]
                       + pu * values[k+2]) / R for k in range(2*t + 1)]
    return values[0]


def square_closed_form(n: int, s0: float, T: float,
                       r: float, sigma: float, model: str) -> float:
    u, d, R, probabilities = parameters(n, T, r, sigma, model)
    if model == "crr":
        pd, pu = probabilities
        moment = pd * d*d + pu * u*u
    else:
        pd, p0, pu = probabilities
        moment = pd * d*d + p0 + pu * u*u
    return s0 * (moment / R)**n


def benchmark(s0: float, T: float, r: float, sigma: float) -> float:
    return s0 * exp((r + sigma*sigma) * T)


def main():
    s0, T, r, sigma = 100.0, 1.0, 0.0, 0.2
    exact = benchmark(s0, T, r, sigma)
    print("square payoff S_T^2/S_0; S0=100 yen, T=1 year, r=0, sigma=0.2/year^0.5")
    print(f"analytic limiting benchmark={exact:.10f} yen")
    print("N model price(yen) abs_error(yen) nodes time_ms")
    for n in (1, 2, 4, 8, 16, 32, 64):
        for model in ("crr", "tri"):
            start = perf_counter()
            value = price(n, s0, T, r, sigma, model)
            ms = (perf_counter()-start)*1000
            check = square_closed_form(n, s0, T, r, sigma, model)
            assert abs(value - check) < 1e-8
            nodes = (n+1)*(n+2)//2 if model == "crr" else (n+1)**2
            print(f"{n:2d} {model:3s} {value:13.9f} {abs(value-exact):14.9f} {nodes:5d} {ms:8.3f}")


if __name__ == "__main__":
    main()
