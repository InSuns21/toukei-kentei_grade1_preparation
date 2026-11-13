"""U3-22: explicit Black--Scholes finite differences (JPY and years)."""
from __future__ import annotations

import math


def bs_call(s: float, k: float, r: float, q: float, sigma: float, tau: float) -> float:
    if tau == 0:
        return max(s - k, 0.0)
    if s == 0:
        return 0.0
    d1 = (math.log(s / k) + (r - q + sigma * sigma / 2) * tau) / (sigma * math.sqrt(tau))
    d2 = d1 - sigma * math.sqrt(tau)
    phi = lambda x: (1 + math.erf(x / math.sqrt(2))) / 2
    return s * math.exp(-q * tau) * phi(d1) - k * math.exp(-r * tau) * phi(d2)


def solve(m: int, n: int, *, smax: float = 300.0, k: float = 100.0,
          r: float = 0.05, q: float = 0.02, sigma: float = 0.2,
          maturity: float = 1.0, perturb: bool = False):
    if m < 3 or n < 1 or not (smax > k > 0 and sigma > 0 and r >= 0 and q >= 0 and maturity > 0):
        raise ValueError("Invalid grid or parameters")
    h, dt = smax / m, maturity / n
    v = [max(i * h - k, 0.0) for i in range(m + 1)]
    if perturb:
        # Alternating perturbation with zero on both Dirichlet boundaries.
        v = [0.0] + [(-1.0) ** i for i in range(1, m)] + [0.0]
    for step in range(n):
        next_tau = (step + 1) * dt
        w = v[:]
        w[0] = 0.0
        w[m] = (0.0 if perturb else smax * math.exp(-q * next_tau) - k * math.exp(-r * next_tau))
        for i in range(1, m):
            alpha = 0.5 * dt * (sigma * sigma * i * i - (r - q) * i)
            beta = 1 - dt * (sigma * sigma * i * i + r)
            gamma = 0.5 * dt * (sigma * sigma * i * i + (r - q) * i)
            w[i] = alpha * v[i - 1] + beta * v[i] + gamma * v[i + 1]
        v = w
    return v


def main():
    print("U3-22: European call; S0=K=100 JPY, T=1y, r=.05/y, q=.02/y, sigma=.20/sqrt(y), Smax=300 JPY")
    target = bs_call(100, 100, .05, .02, .2, 1.)
    print(f"Black-Scholes reference: {target:.9f} JPY")
    print("M  N  h(JPY) dt(y)     FD(100)     abs.err(JPY)  min(v)       max(v)")
    for m in (30, 60, 120):
        limit = 1 / (.2 ** 2 * (m - 1) ** 2 + .05)
        n = math.ceil(1 / (.8 * limit))
        values = solve(m, n)
        i = m // 3
        value = values[i]
        print(f"{m:3} {n:4} {300/m:7.2f} {1/n:9.6f} {value:12.8f} {abs(value-target):13.8f} {min(values):10.5g} {max(values):12.5g}")
        assert min(values) >= -1e-10
        assert max(values) <= 300.0 + 1e-10
    print("Smax boundary test: fixed h=5 JPY, N=250 (same dt)")
    for cap in (120.0, 130.0, 160.0, 300.0):
        m_cap = int(cap / 5)
        v_cap = solve(m_cap, 250, smax=cap)
        print(f"  Smax={cap:.0f}: C(100)={v_cap[20]:.9f} JPY")
    m = 60
    n = 24
    original = solve(m, n)
    noise = solve(m, n, perturb=True)
    print(f"UNSTABLE: M={m}, N={n}, dt={1/n:.6f}, positivity limit={1/(.04*(m-1)**2 + .05):.6f}")
    print(f"  call range=[{min(original):.6g}, {max(original):.6g}] JPY, alternating error amplification (infty norm)={max(abs(x) for x in noise):.6g}")
    assert max(abs(x) for x in noise) > 1e5
    assert min(original) < -1e-6 or max(original) > 300
    print("PASS: stable grid nonnegative, unstable high-frequency mode amplified")


if __name__ == "__main__":
    main()
