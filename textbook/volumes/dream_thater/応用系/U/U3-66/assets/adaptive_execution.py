#!/usr/bin/env python3
"""U3-66: finite-state adaptive execution and deterministic AC grid comparison.

All amounts are synthetic. No data downloads, exchange access, or trading orders.
"""
import argparse
import math


def market_states(signal=0.15):
    return {
        "G": {
            "alpha": signal, "gamma": 0.01, "d": 0.02, "eta": 0.06,
            "transitions": {"G": 0.75, "B": 0.25},
        },
        "B": {
            "alpha": -0.06, "gamma": 0.04, "d": 0.05, "eta": 0.15,
            "transitions": {"G": 0.50, "B": 0.50},
        },
    }


def terminal(q):
    return 0.15 * q + 0.05 * q * q


def stage(q, u, z):
    remaining = q - u
    return (
        z["d"] * u + z["eta"] * u * u
        + z["gamma"] * remaining * remaining
        - z["alpha"] * remaining
    )


def candidate(t, q, zname, u, values, states):
    data = states[zname]
    remaining = q - u
    continuation = sum(
        prob * values[t + 1][(remaining, next_name)]
        for next_name, prob in data["transitions"].items()
    )
    return stage(q, u, data) + continuation


def solve(quantity=2, periods=2, signal=0.15):
    if quantity < 1 or periods < 1:
        raise ValueError("quantity and periods must be positive")
    states = market_states(signal)
    for name, data in states.items():
        if abs(sum(data["transitions"].values()) - 1.0) > 1e-12:
            raise AssertionError("invalid row of probabilities: " + name)
    values = [{} for _ in range(periods + 1)]
    actions = [{} for _ in range(periods)]
    for q in range(quantity + 1):
        for zname in states:
            values[periods][(q, zname)] = terminal(q)
    for t in range(periods - 1, -1, -1):
        for q in range(quantity + 1):
            for zname in states:
                costs = [
                    candidate(t, q, zname, u, values, states)
                    for u in range(q + 1)
                ]
                minimum = min(costs)
                # Ties are resolved in favor of fewer shares sold now.
                best = min(u for u, v in enumerate(costs)
                           if abs(v - minimum) <= 1e-12)
                values[t][(q, zname)] = minimum
                actions[t][(q, zname)] = best
    residual = max(
        abs(
            values[t][(q, zname)]
            - min(candidate(t, q, zname, u, values, states)
                  for u in range(q + 1))
        )
        for t in range(periods)
        for q in range(quantity + 1)
        for zname in states
    )
    return values, actions, residual


def ac_grid_error(steps, quantity=100.0, horizon=2.0,
                  eta=0.01, risk=0.01):
    """Compare discrete AC exact optimizer with continuous sinh optimizer."""
    if steps < 2:
        raise ValueError("steps must be >= 2")
    dt = horizon / steps
    if risk == 0:
        return 0.0
    kappa = math.sqrt(risk / eta)
    theta = math.acosh(1.0 + risk * dt * dt / (2.0 * eta))
    discrete = [
        quantity * math.sinh((steps - i) * theta) / math.sinh(steps * theta)
        for i in range(steps + 1)
    ]
    continuous = [
        quantity * math.sinh(kappa * (horizon - i * dt))
        / math.sinh(kappa * horizon)
        for i in range(steps + 1)
    ]
    return max(abs(a - b) for a, b in zip(discrete, continuous))


def self_test():
    v, a, r = solve()
    expected = {
        (1, 1, "G"): (0.06, 0),
        (1, 1, "B"): (0.20, 1),
        (1, 2, "G"): (0.14, 1),
        (1, 2, "B"): (0.50, 1),
        (0, 1, "G"): (-0.045, 0),
        (0, 1, "B"): (0.20, 1),
        (0, 2, "G"): (-0.03, 0),
        (0, 2, "B"): (0.43, 1),
    }
    for (t, q, z), (value, action) in expected.items():
        assert abs(v[t][(q, z)] - value) < 1e-12, (t, q, z)
        assert a[t][(q, z)] == action, (t, q, z)
    assert r < 1e-12
    assert all(v[t][(0, z)] == 0 for t in range(3) for z in "GB")
    e4, e16, e64 = (ac_grid_error(n) for n in (4, 16, 64))
    assert e64 < e16 < e4, (e4, e16, e64)
    v0, a0, r0 = solve(signal=0.0)
    assert r0 < 1e-12
    assert a0[0][(2, "G")] in (0, 1, 2)
    print("SELF-TEST OK: 8 policy cells, zero-inventory boundary,")
    print("finite-state Bellman residual, and AC grid refinement")
    print("AC maximum errors N=4,16,64: %.9g %.9g %.9g" %
          (e4, e16, e64))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--signal", type=float, default=0.15)
    parser.add_argument("--steps", type=int, default=8)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    if not math.isfinite(args.signal) or not -1 <= args.signal <= 1:
        parser.error("--signal must be finite and in [-1,1]")
    if not 2 <= args.steps <= 1024:
        parser.error("--steps must be in [2,1024]")
    values, actions, residual = solve(signal=args.signal)
    print("Two-state adaptive execution: Q=2 shares, T=2 periods")
    print("G alpha=%.4f; B alpha=-0.06 (yen/share/period)" % args.signal)
    print("Terminal cost H(q)=0.15*q+0.05*q^2 (yen)")
    print("Policy map: t | q | G(action, value) | B(action, value)")
    for t in (1, 0):
        for q in range(3):
            print(
                "%d | %d | %d, %+.6f | %d, %+.6f" %
                (t, q,
                 actions[t][(q, "G")], values[t][(q, "G")],
                 actions[t][(q, "B")], values[t][(q, "B")])
            )
    print("Bellman residual max = %.12g yen" % residual)
    print("AC reduction: Q=100 shares, T=2, eta=0.01, risk=0.01")
    print("Discrete vs continuous exact inventory:")
    for n in sorted(set((4, args.steps, min(1024, 4 * args.steps)))):
        print(" N=%d  max|x_disc-x_cont| = %.9g shares" %
              (n, ac_grid_error(n)))
    print("Residual checks grid equations, not real-world model fit.")


if __name__ == "__main__":
    main()
