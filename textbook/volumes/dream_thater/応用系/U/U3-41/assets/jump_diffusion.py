#!/usr/bin/env python3
"""U3-41: exact terminal Merton jump diffusion, Poisson mixture and MC.
Only Python standard library is required. All prices are in yen.
This is a mathematical reproducibility experiment, not market calibration.
"""
import argparse
import math
import random

S0 = 100.0
STRIKE = 100.0
T = 1.0
RATE = 0.03
DIVIDEND = 0.01
SIGMA = 0.20
LOG_JUMP_MEAN = -0.08
LOG_JUMP_SD = 0.18


def normal_cdf(x):
    return 0.5 * math.erfc(-x / math.sqrt(2.0))


def poisson_probabilities(mean, last):
    """Probabilities P(N=n), n=0..last; no random sampling."""
    p = math.exp(-mean)
    probabilities = [p]
    for n in range(1, last + 1):
        p *= mean / n
        probabilities.append(p)
    return probabilities


def jump_mean():
    return math.exp(LOG_JUMP_MEAN + 0.5 * LOG_JUMP_SD ** 2)


def exact_call(intensity, last=60):
    """Conditional lognormal formula, including a certified nonnegative tail bound."""
    kappa = jump_mean() - 1.0
    poisson = poisson_probabilities(intensity * T, last)
    price = 0.0
    for n, weight in enumerate(poisson):
        m = (math.log(S0) +
             (RATE - DIVIDEND - intensity * kappa - 0.5 * SIGMA ** 2) * T +
             n * LOG_JUMP_MEAN)
        v = SIGMA ** 2 * T + n * LOG_JUMP_SD ** 2
        sd = math.sqrt(v)
        d2 = (m - math.log(STRIKE)) / sd
        d1 = d2 + sd
        conditional = (math.exp(m + v / 2.0) * normal_cdf(d1)
                       - STRIKE * normal_cdf(d2))
        price += weight * max(0.0, conditional)
    # Uniform bound on omitted discounted call payments by discounted S_T.
    tilted_mean = intensity * T * jump_mean()
    # Avoid 1 - CDF cancellation: the truncated CDF rounds to 1.0
    # for small intensities although its mathematically positive tail remains.
    first_tail = math.exp(-tilted_mean)
    for n in range(1, last + 2):
        first_tail *= tilted_mean / n
    # Successive Poisson tail terms shrink by at most
    # tilted_mean/(last+2) < 1. Bound their sum geometrically.
    ratio = tilted_mean / (last + 2)
    if ratio >= 1.0:
        raise ValueError("increase 'last' to bound the Poisson tail")
    remaining_upper = first_tail / (1.0 - ratio)
    bound = S0 * math.exp(-DIVIDEND * T) * remaining_upper
    return math.exp(-RATE * T) * price, bound


def poisson_sample(rng, mean):
    # Knuth's inversion: exact count for mean <= 10 (the CLI restricts it).
    threshold = math.exp(-mean)
    product = 1.0
    count = 0
    while True:
        product *= rng.random()
        if product <= threshold:
            return count
        count += 1


def terminal_stock(rng, intensity):
    count = poisson_sample(rng, intensity * T)
    jump_log = count * LOG_JUMP_MEAN
    if count:
        # Sum of n independent N(mu,sd^2) variables has this exact law.
        jump_log += math.sqrt(count) * LOG_JUMP_SD * rng.gauss(0.0, 1.0)
    kappa = jump_mean() - 1.0
    brownian = SIGMA * math.sqrt(T) * rng.gauss(0.0, 1.0)
    log_stock = (math.log(S0) +
                 (RATE - DIVIDEND - intensity * kappa - 0.5 * SIGMA ** 2) * T +
                 brownian + jump_log)
    return math.exp(log_stock), count


class Moments:
    def __init__(self):
        self.n = 0
        self.mean = 0.0
        self.m2 = 0.0

    def add(self, value):
        self.n += 1
        increment = value - self.mean
        self.mean += increment / self.n
        self.m2 += increment * (value - self.mean)

    def se(self):
        return math.sqrt(self.m2 / (self.n - 1) / self.n)


def run(samples, seed, intensity):
    rng = random.Random(seed)
    calls = Moments()
    discounted_stocks = Moments()
    no_jumps = 0
    for _ in range(samples):
        terminal, count = terminal_stock(rng, intensity)
        calls.add(math.exp(-RATE * T) * max(terminal - STRIKE, 0.0))
        discounted_stocks.add(math.exp(-RATE * T) * terminal)
        no_jumps += (count == 0)

    analytic, truncation = exact_call(intensity)
    martingale_target = S0 * math.exp(-DIVIDEND * T)
    diff = calls.mean - analytic
    se = calls.se()
    print(f"parameters: S0={S0}, K={STRIKE}, T={T}, r={RATE}, q={DIVIDEND}, "
          f"sigma={SIGMA}, lambda={intensity}")
    print(f"log jump: mu_J={LOG_JUMP_MEAN}, delta_J={LOG_JUMP_SD}, "
          f"E[Y]={jump_mean():.9f}")
    print(f"seed={seed}, independent paths={samples}")
    print(f"Poisson-mixture call n=0..60: {analytic:.9f} yen")
    print(f"certified positive omitted tail <= {truncation:.3e} yen")
    print(f"MC call mean:               {calls.mean:.9f} yen")
    print(f"MC standard error:          {se:.9f} yen")
    print(f"MC minus analytic:          {diff:+.9f} yen ({diff / se:+.3f} SE)")
    print(f"discounted stock MC mean:  {discounted_stocks.mean:.9f} yen")
    print(f"discounted stock target:   {martingale_target:.9f} yen")
    print(f"stock mean standard error: {discounted_stocks.se():.9f} yen")
    print(f"no jump frequency:         {no_jumps / samples:.6f}")
    print(f"no jump probability:       {math.exp(-intensity * T):.6f}")
    if intensity == 0.0:
        print("lambda=0: this is the dividend Black-Scholes limit.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--samples", type=int, default=20000)
    parser.add_argument("--seed", type=int, default=20261115)
    parser.add_argument("--intensity", type=float, default=0.4)
    args = parser.parse_args()
    if not (2 <= args.samples <= 200000):
        parser.error("--samples must be in [2, 200000]")
    if not (0.0 <= args.intensity <= 10.0):
        parser.error("--intensity must be in [0, 10] per year")
    run(args.samples, args.seed, args.intensity)
