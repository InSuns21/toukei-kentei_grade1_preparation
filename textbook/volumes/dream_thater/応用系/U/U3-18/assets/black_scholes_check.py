"""Deterministic numerical cross-check of U3-18 (Python >= 3.10, stdlib)."""
from __future__ import annotations

import math


def _check(s: float, k: float, r: float, sigma: float, tau: float) -> None:
    if not all(math.isfinite(x) for x in (s, k, r, sigma, tau)):
        raise ValueError("all inputs must be finite")
    if min(s, k, sigma, tau) <= 0:
        raise ValueError("s, k, sigma and tau must be positive")


def phi(z: float) -> float:
    return math.exp(-0.5 * z * z) / math.sqrt(2.0 * math.pi)


def Phi(z: float) -> float:
    return 0.5 * math.erfc(-z / math.sqrt(2.0))


def indicators(s: float, k: float, r: float, sigma: float, tau: float) -> tuple[float, float]:
    _check(s, k, r, sigma, tau)
    a = sigma * math.sqrt(tau)
    d2 = (math.log(s / k) + (r - 0.5 * sigma ** 2) * tau) / a
    return d2 + a, d2


def closed_form(s: float, k: float, r: float, sigma: float, tau: float) -> tuple[float, float]:
    d1, d2 = indicators(s, k, r, sigma, tau)
    call = s * Phi(d1) - k * math.exp(-r * tau) * Phi(d2)
    put = k * math.exp(-r * tau) * Phi(-d2) - s * Phi(-d1)
    return call, put


def simpson(f, left: float, right: float, n: int = 4096) -> float:
    if n < 2 or n % 2:
        raise ValueError("Simpson n must be an even integer >= 2")
    if not left < right:
        raise ValueError("integration interval must have positive length")
    h = (right - left) / n
    total = f(left) + f(right)
    for j in range(1, n):
        total += (4 if j % 2 else 2) * f(left + j * h)
    return total * h / 3


def integral_prices(s: float, k: float, r: float, sigma: float, tau: float,
                    n: int = 4096) -> tuple[float, float]:
    """Independent z-integrals; split exactly at the strike (not the tilted pdf)."""
    _, d2 = indicators(s, k, r, sigma, tau)
    b = -d2
    m = (r - 0.5 * sigma * sigma) * tau
    a = sigma * math.sqrt(tau)

    def call_integrand(z: float) -> float:
        return (s * math.exp(m + a * z) - k) * phi(z)

    def put_integrand(z: float) -> float:
        return (k - s * math.exp(m + a * z)) * phi(z)

    # 10 Gaussian standard deviations beyond the strike. Demonstration range:
    # this truncation is negligible for the displayed one-year parameters.
    call = simpson(call_integrand, b, max(10.0, b + 10.0), n)
    put = simpson(put_integrand, min(-10.0, b - 10.0), b, n)
    return math.exp(-r * tau) * call, math.exp(-r * tau) * put


def crr_prices(s: float, k: float, r: float, sigma: float, tau: float,
               steps: int) -> tuple[float, float]:
    _check(s, k, r, sigma, tau)
    if not isinstance(steps, int) or steps < 1:
        raise ValueError("steps must be a positive integer")
    h = tau / steps
    u = math.exp(sigma * math.sqrt(h))
    d = 1.0 / u
    R = math.exp(r * h)
    if not d < R < u:
        raise ValueError("CRR requires d < R < u; increase steps")
    q = (R - d) / (u - d)
    if not 0.0 < q < 1.0:
        raise ValueError("invalid risk-neutral probability")
    calls = [max(s * u ** j * d ** (steps - j) - k, 0.0)
             for j in range(steps + 1)]
    puts = [max(k - s * u ** j * d ** (steps - j), 0.0)
            for j in range(steps + 1)]
    for layer in range(steps, 0, -1):
        for j in range(layer):
            calls[j] = ((1.0 - q) * calls[j] + q * calls[j + 1]) / R
            puts[j] = ((1.0 - q) * puts[j] + q * puts[j + 1]) / R
    return calls[0], puts[0]


def main() -> None:
    s = k = 100.0
    r, sigma, tau = 0.03, 0.20, 1.0
    d1, d2 = indicators(s, k, r, sigma, tau)
    call, put = closed_form(s, k, r, sigma, tau)
    int_call, int_put = integral_prices(s, k, r, sigma, tau)
    print("U3-18: s=K=100, r=0.03, sigma=0.20, tau=1")
    print(f"d1={d1:.8f} d2={d2:.8f}")
    print(f"closed: call={call:.9f} put={put:.9f}")
    print(f"integral: call={int_call:.9f} put={int_put:.9f}")
    print(f"parity residual={call-put-s+k*math.exp(-r*tau):+.3e}")
    for n in (25, 100, 400):
        tree_call, tree_put = crr_prices(s, k, r, sigma, tau, n)
        print(f"CRR N={n:3d}: call={tree_call:.9f} error={tree_call-call:+.9f}"
              f" put={tree_put:.9f}")
    assert abs(call - int_call) < 1e-6
    assert abs(put - int_put) < 1e-6
    assert abs(call - put - s + k * math.exp(-r * tau)) < 1e-9


if __name__ == "__main__":
    main()
