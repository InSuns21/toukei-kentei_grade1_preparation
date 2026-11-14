#!/usr/bin/env python3
"""U3-37: cross-method BSM call benchmark and Monte Carlo Greeks.

Only Python 3 standard library is required.
Every method uses the *same* q-dividend BSM market. No fabricated timings.
The confidence standard errors DO NOT include discretization / finite-difference bias.
"""
import math
import random
import statistics
import time

S0 = 100.0        # JPY
K = 100.0         # JPY
R = 0.05          # continuously compounded annual interest rate
Q = 0.02          # continuously compounded annual dividend yield
SIGMA = 0.20      # annualized volatility
T = 1.0           # years
DISC = math.exp(-R * T)
SEED = 20261114


def normal_cdf(x):
    return 0.5 * math.erfc(-x / math.sqrt(2.0))


def normal_pdf(x):
    return math.exp(-x * x / 2.0) / math.sqrt(2.0 * math.pi)


def analytic():
    d1 = (math.log(S0 / K) + (R - Q + 0.5 * SIGMA**2) * T) / (
        SIGMA * math.sqrt(T)
    )
    d2 = d1 - SIGMA * math.sqrt(T)
    call = S0 * math.exp(-Q * T) * normal_cdf(d1) - K * DISC * normal_cdf(d2)
    delta = math.exp(-Q * T) * normal_cdf(d1)
    vega = S0 * math.exp(-Q * T) * normal_pdf(d1) * math.sqrt(T)
    dig_delta = DISC * normal_pdf(d2) / (S0 * SIGMA * math.sqrt(T))
    return call, delta, vega, dig_delta


def crr(steps):
    dt = T / steps
    up = math.exp(SIGMA * math.sqrt(dt))
    down = 1.0 / up
    growth = math.exp((R - Q) * dt)
    p = (growth - down) / (up - down)
    if not 0.0 < p < 1.0:
        raise ValueError("CRR parameters violate no-arbitrage for this step size")
    vals = [max(S0 * up**j * down**(steps-j) - K, 0.0)
            for j in range(steps + 1)]
    d = math.exp(-R * dt)
    for k in range(steps, 0, -1):
        vals = [d * ((1.0 - p) * vals[j] + p * vals[j+1])
                for j in range(k)]
    return vals[0], (steps * (steps + 1) // 2)


def pde_explicit_logspace(space_steps, time_steps):
    # tau = T-t; x=log(S). Terminal condition at tau=0.
    # d_tau V = .5 sigma^2 V_xx + (r-q-.5sigma^2)V_x - rV
    # x is centered at log(S0), so the queried value is exactly grid-aligned.
    if space_steps % 2 != 0:
        raise ValueError("space_steps must be even")
    half_width = 6.0 * SIGMA * math.sqrt(T) + abs(R - Q - SIGMA**2 / 2) * T + 0.2
    dx = 2.0 * half_width / space_steps
    dt = T / time_steps
    diffusion = 0.5 * SIGMA**2
    advection = R - Q - 0.5 * SIGMA**2
    a = dt * (diffusion / dx**2 - advection / (2.0 * dx))
    b = 1.0 - dt * (2.0 * diffusion / dx**2 + R)
    c = dt * (diffusion / dx**2 + advection / (2.0 * dx))
    if min(a, b, c) < 0:
        raise ValueError("Choose a stable positive explicit PDE grid")

    xs = [math.log(S0) - half_width + j * dx
          for j in range(space_steps + 1)]
    values = [max(math.exp(x) - K, 0.0) for x in xs]
    high_stock = math.exp(xs[-1])
    for step in range(1, time_steps + 1):
        tau = step * dt
        # Deep in/out-of-the-money truncation boundary for European call.
        right = high_stock * math.exp(-Q * tau) - K * math.exp(-R * tau)
        nxt = [0.0] * (space_steps + 1)
        nxt[-1] = max(right, 0.0)
        for j in range(1, space_steps):
            nxt[j] = a * values[j-1] + b * values[j] + c * values[j+1]
        values = nxt
    return values[space_steps // 2], (space_steps - 1) * time_steps


def mean_and_se(vals):
    n = len(vals)
    if n < 2:
        raise ValueError("Need n>=2")
    mean = statistics.fmean(vals)
    variance = sum((v - mean)**2 for v in vals) / (n - 1)
    return mean, math.sqrt(variance / n), variance


def terminal(s, sigma, z):
    return s * math.exp((R-Q-0.5 * sigma * sigma) * T
                        + sigma * math.sqrt(T) * z)


def discounted_call(s, sigma, z):
    return DISC * max(terminal(s, sigma, z) - K, 0.0)


def plain_mc(n):
    rng = random.Random(SEED + 1)
    values = [discounted_call(S0, SIGMA, rng.gauss(0.0, 1.0))
              for _ in range(n)]
    price, se, _ = mean_and_se(values)
    return price, se, n  # n normal increments and payoff evaluations


def em_coupled_level(level, n, base_steps=4):
    rng = random.Random(SEED + 100 + level)
    fine_steps = base_steps * (2 ** level)
    dt = T / fine_steps
    sqrtdt = math.sqrt(dt)
    vals = []
    for _ in range(n):
        fine = S0
        coarse = S0
        paired_dw = 0.0
        for j in range(fine_steps):
            dw = sqrtdt * rng.gauss(0.0, 1.0)
            fine *= 1.0 + (R-Q)*dt + SIGMA*dw
            if level > 0:
                paired_dw += dw
                if j % 2 == 1:
                    coarse *= 1.0 + (R-Q)*(2.0*dt) + SIGMA*paired_dw
                    paired_dw = 0.0
        payoff_f = DISC * max(fine - K, 0.0)
        if level == 0:
            vals.append(payoff_f)
        else:
            payoff_c = DISC * max(coarse - K, 0.0)
            vals.append(payoff_f - payoff_c)
    mean, se, var = mean_and_se(vals)
    work = n * fine_steps * (1 if level == 0 else 1.5)
    return mean, var/n, int(work), se


def mlmc():
    # Fixed allocation illustrates MLMC; it is not an optimized allocation.
    ns = [14000, 8000, 4500, 2500, 1200]
    levels = [em_coupled_level(level, n) for level, n in enumerate(ns)]
    price = sum(v[0] for v in levels)
    se = math.sqrt(sum(v[1] for v in levels))
    work = sum(v[2] for v in levels)
    return price, se, work, levels


def all_greeks(n=30000, ds=0.5, dv=0.005):
    rng = random.Random(SEED + 2)
    vals = {k: [] for k in ["fd_delta", "pw_delta", "lr_delta",
                             "fd_vega", "pw_vega", "lr_vega", "lr_digital_delta"]}
    for _ in range(n):
        z = rng.gauss(0.0, 1.0)
        st = terminal(S0, SIGMA, z)
        payoff = DISC * max(st - K, 0.0)
        in_money = float(st > K)
        vals["fd_delta"].append(
            (discounted_call(S0 + ds, SIGMA, z)
             - discounted_call(S0 - ds, SIGMA, z)) / (2.0*ds))
        vals["pw_delta"].append(DISC * in_money * st/S0)
        vals["lr_delta"].append(payoff * z/(S0*SIGMA*math.sqrt(T)))
        vals["fd_vega"].append(
            (discounted_call(S0, SIGMA + dv, z)
             - discounted_call(S0, SIGMA - dv, z)) / (2.0*dv))
        vals["pw_vega"].append(
            DISC * in_money * st * (math.sqrt(T)*z - SIGMA*T))
        score_v = (z*z - 1.0)/SIGMA - math.sqrt(T)*z
        vals["lr_vega"].append(payoff * score_v)
        vals["lr_digital_delta"].append(
            DISC * in_money * z/(S0*SIGMA*math.sqrt(T)))
    return {name: mean_and_se(v)[:2] for name, v in vals.items()}


def timed(f, *args):
    start = time.perf_counter()
    result = f(*args)
    return result, time.perf_counter() - start


def main():
    price_true, delta_true, vega_true, digital_true = analytic()
    assert abs(price_true - 9.227005508) < 1e-8
    assert abs(delta_true - 0.586851146) < 1e-8
    assert abs(vega_true - 37.901158) < 1e-5
    print("BSM: S=K=100 JPY, r=.05, q=.02, sigma=.20, T=1 yr")
    print("Analytic: price=%.9f Delta=%.9f Vega=%.6f" %
          (price_true, delta_true, vega_true))
    print("METHOD                PRICE          ERROR       SE         WORK       SEC")
    print("Analytic          %12.6f %12.6f       N/A           -         -" %
          (price_true, 0.0))

    for n in [100, 200]:
        (value, work), sec = timed(crr, n)
        print("%-17s %12.6f %12.6f       N/A %10d %9.4f" %
              ("CRR-"+str(n), value, value-price_true, work, sec))
    for m, nt in [(120, 1500), (240, 3000)]:
        (value, work), sec = timed(pde_explicit_logspace, m, nt)
        print("%-17s %12.6f %12.6f       N/A %10d %9.4f" %
              ("PDE-"+str(m), value, value-price_true, work, sec))
    for n in [16384, 65536]:
        (value, se, work), sec = timed(plain_mc, n)
        print("%-17s %12.6f %12.6f %9.5f %10d %9.4f" %
              ("ExactMC-"+str(n), value, value-price_true, se, work, sec))
    (value, se, work, levels), sec = timed(mlmc)
    print("%-17s %12.6f %12.6f %9.5f %10d %9.4f" %
          ("Euler-MLMC", value, value-price_true, se, work, sec))
    for l, (v, var_over_n, w, stder) in enumerate(levels):
        print("  Level %d: mean=%+.6f, SE=%.6f, updates=%d" %
              (l, v, stder, w))
    print("Note: MLMC estimates the finest Euler EXPECTATION, not exact GBM;")
    print("      SE excludes Euler bias. Work counts primitive state updates.")
    print("      PDE work counts interior grid updates, CRR counts node updates.")

    (estimates, sec) = timed(all_greeks)
    refs = {"delta":delta_true, "vega":vega_true,
            "digital_delta":digital_true}
    print("\nGREEK                ESTIMATE        ERROR        SE")
    for name, (value, se) in estimates.items():
        target = refs["digital_delta" if "digital" in name
                      else "vega" if "vega" in name else "delta"]
        print("%-20s %12.6f %12.6f %10.6f" %
              (name, value, value-target, se))
    print("Greek sample: 30000 independent Z; shared Z within each bump pair;")
    print("Greek seconds=%.4f; FD bumps: ds=.5 JPY, d_sigma=.005" % sec)
    print("Normal intervals apply to estimator expectations; finite bumps may be biased.")


if __name__ == "__main__":
    main()
