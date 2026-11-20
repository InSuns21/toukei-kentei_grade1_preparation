"""U2-25: exact one-dimensional loop closures and robust estimation.

World coordinate in metres; x0=0 fixed (hard gauge).
Odometry: independent unit-variance Gaussian increments.
A loop candidate: independent unit-variance measurement if association is valid.
No randomness or third-party dependencies. A toy model, not a full SLAM system.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F

ODOM = (F(1), F(1), F(-1))
HUBER_THRESHOLD = F(1, 2)


def coordinates(steps):
    """Build x0,...,xm from increments with x0=0."""
    result = [steps[0] - steps[0]] if steps else [F(0)]
    for step in steps:
        result.append(result[-1] + step)
    return result


def cost_quadratic(steps, odom, z, w=F(1)):
    residual = sum(steps) - z
    return (sum((d - u) ** 2 for d, u in zip(steps, odom))
            + w * residual ** 2) / 2


def quadratic_map(odom, z, w=F(1)):
    """The unique minimizer of sum((d-u)^2)/2+w*(sum(d)-z)^2/2."""
    if w <= 0:
        raise ValueError("independent loop variance must be positive")
    m = len(odom)
    correction = w * (sum(odom) - z) / (1 + m * w)
    steps = tuple(u - correction for u in odom)
    return steps, cost_quadratic(steps, odom, z, w)


def huber(r, k=HUBER_THRESHOLD):
    if k <= 0:
        raise ValueError("Huber threshold must be positive")
    return r * r / 2 if abs(r) <= k else k * abs(r) - k * k / 2


def psi(r, k=HUBER_THRESHOLD):
    if abs(r) <= k:
        return r
    return k if r > 0 else -k


def irls_weight(r, k=HUBER_THRESHOLD):
    return F(1) if abs(r) <= k else k / abs(r)


def robust_map(odom, z, k=HUBER_THRESHOLD, copies=1):
    """Exact convex Huber optimum for copies of the same loop hypothesis."""
    if k <= 0 or copies < 1:
        raise ValueError("invalid Huber threshold or loop count")
    m = len(odom)
    a = sum(odom) - z
    trial = a / (1 + m * copies)
    if abs(trial) <= k:
        r = trial
    else:
        r = a - m * copies * (k if a > 0 else -k)
    steps = tuple(u - copies * psi(r, k) for u in odom)
    actual_r = sum(steps) - z
    assert actual_r == r
    objective = (sum((d - u) ** 2 for d, u in zip(steps, odom)) / 2
                 + copies * huber(r, k))
    return steps, r, objective


def gate_nis(z, odom=ODOM, loop_variance=F(1)):
    """Prior-predictive innovation of a candidate, before loop optimization."""
    prior_variance = len(odom)  # independent unit-variance odometry
    return (z - sum(odom)) ** 2 / (prior_variance + loop_variance)


def irls(odom, z, k=HUBER_THRESHOLD, iterations=32):
    """For display: weighted LS loop; record every actual Huber cost."""
    steps = tuple(float(x) for x in odom)
    trace = []
    for t in range(iterations):
        residual = sum(steps) - float(z)
        weight = 1.0 if abs(residual) <= float(k) else float(k) / abs(residual)
        correction = weight * (float(sum(odom)) - float(z)) / (
            1 + len(odom) * weight
        )
        steps = tuple(float(u) - correction for u in odom)
        next_residual = sum(steps) - float(z)
        cost = sum((d - float(u)) ** 2 for d, u in zip(steps, odom)) / 2
        cost += float(huber(F(str(next_residual)), k))
        trace.append((t + 1, weight, next_residual, cost))
        if abs(next_residual - residual) < 1e-12:
            break
    return steps, trace


def check_normal_covariance():
    """Verify (I+11^T)(I-11^T/4)=I with exact rational arithmetic."""
    m = 3
    h = [[F(int(i == j) + 1) for j in range(m)] for i in range(m)]
    c = [[F(int(i == j)) - F(1, 4)
          for j in range(m)] for i in range(m)]
    product = [[sum(h[i][k] * c[k][j] for k in range(m))
                for j in range(m)] for i in range(m)]
    assert product == [[F(int(i == j)) for j in range(m)]
                       for i in range(m)]
    endpoint_variance = sum(sum(row) for row in c)
    assert endpoint_variance == F(3, 4)
    return endpoint_variance


def correct():
    steps, objective = quadratic_map(ODOM, F(0))
    print("correct loop: z=0, odometry=", ODOD_TEXT)
    print("steps =", steps, "positions =", coordinates(steps))
    print("residuals =", tuple(d-u for d, u in zip(steps, ODOM)),
          "loop residual =", sum(steps))
    print("quadratic objective =", objective)
    print("NIS =", gate_nis(F(0)))
    print("endpoint posterior variance =", check_normal_covariance())
    hsteps, residual, hcost = robust_map(ODOM, F(0))
    print("Huber steps =", hsteps, "Huber residual =", residual,
          "Huber objective =", hcost)
    assert steps == (F(3, 4), F(3, 4), -F(5, 4))
    assert coordinates(steps) == [F(0), F(3, 4), F(3, 2), F(1, 4)]
    assert objective == F(1, 8)
    assert hsteps == steps and residual == F(1, 4)


def false():
    steps, objective = quadratic_map(ODOM, F(-3))
    print("false loop: z=-3")
    print("quadratic steps =", steps, "positions =", coordinates(steps))
    print("quadratic objective =", objective, "pre-fit NIS =", gate_nis(F(-3)))
    hsteps, r, hcost = robust_map(ODOM, F(-3))
    print("Huber steps =", hsteps, "positions =", coordinates(hsteps))
    print("Huber residual =", r, "weight =", irls_weight(r),
          "Huber objective =", hcost)
    _, trace = irls(ODOM, F(-3))
    print("IRLS steps (iteration, weight, residual, true cost):")
    for row in trace[:5]:
        print("  ", row)
    if len(trace) > 5:
        print("  ... last =", trace[-1])
    assert steps == (F(0), F(0), F(-2)) and objective == F(2)
    assert hsteps == (F(1, 2), F(1, 2), -F(3, 2))
    assert r == F(5, 2) and hcost == F(3, 2)
    assert abs(trace[-1][2] - 2.5) < 1e-8
    assert abs(trace[-1][1] - 0.2) < 1e-8


def double():
    steps, r, objective = robust_map(ODOM, F(-3), copies=2)
    print("two false loops: steps =", steps, "positions =", coordinates(steps))
    print("each loop residual =", r, "Huber objective =", objective)
    assert steps == (F(0), F(0), F(-2))
    assert r == F(1) and objective == F(9, 4)


ODOD_TEXT = "(1, 1, -1)"


def self_test():
    assert gate_nis(F(0)) == F(1, 4)
    assert gate_nis(F(-3)) == F(4)
    assert huber(F(1, 4)) == F(1, 32)
    assert huber(F(2)) == F(7, 8)
    assert irls_weight(F(2)) == F(1, 4)
    assert check_normal_covariance() == F(3, 4)
    # Exact first IRLS step: weight 1/8, correction 4/11, residual 32/11.
    first, _ = quadratic_map(ODOM, F(-3), F(1, 8))
    assert sum(first) - F(-3) == F(32, 11)
    correct()
    false()
    double()
    print("all U2-25 numerical checks passed")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("correct", "false", "double"),
                        default="correct")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
    else:
        {"correct": correct, "false": false, "double": double}[args.scenario]()


if __name__ == "__main__":
    main()
