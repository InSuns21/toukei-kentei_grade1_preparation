"""U2-09: EKF at the prediction point; standard library only.

Units: position m, angle rad, v m/s, omega rad/s, dt s.
No random samples: all scenarios have deterministic analytic expectations.
"""
import argparse
import math

DT = 1.0
U = (1.0, 0.0)
OLD = (-1.0, 0.0, 0.0)
P0 = [[0.04, 0.0, 0.0], [0.0, 0.04, 0.0], [0.0, 0.0, 0.01]]
M = [[0.01, 0.0], [0.0, 0.0025]]
R = [[0.01, 0.0], [0.0, 0.0025]]
LANDMARK = (3.0, 4.0)


def matmul(a, b):
    assert len(a[0]) == len(b)
    return [[sum(x * b[k][j] for k, x in enumerate(row))
             for j in range(len(b[0]))] for row in a]


def transpose(a):
    return [list(row) for row in zip(*a)]


def add(a, b):
    assert len(a) == len(b) and len(a[0]) == len(b[0])
    return [[x + y for x, y in zip(row, row_b)]
            for row, row_b in zip(a, b)]


def sub(a, b):
    return [[x - y for x, y in zip(row, row_b)]
            for row, row_b in zip(a, b)]


def diag(values):
    return [[v if i == j else 0.0 for j in range(len(values))]
            for i, v in enumerate(values)]


def eye(n):
    return diag([1.0] * n)


def inverse2(a):
    assert len(a) == 2 and len(a[0]) == 2
    determinant = a[0][0] * a[1][1] - a[0][1] * a[1][0]
    if determinant <= 0:
        raise ValueError("innovation covariance is not positive definite")
    return [[a[1][1] / determinant, -a[0][1] / determinant],
            [-a[1][0] / determinant, a[0][0] / determinant]]


def apply(a, v):
    return [sum(x * y for x, y in zip(row, v)) for row in a]


def wrap(a):
    return (a + math.pi) % (2.0 * math.pi) - math.pi


def motion(g, u=U, dt=DT, noise=(0.0, 0.0)):
    x, y, theta = g
    v, omega = u
    dv, dw = noise
    return (x + (v + dv) * dt * math.cos(theta),
            y + (v + dv) * dt * math.sin(theta),
            theta + (omega + dw) * dt)


def motion_jacobians(g, u=U, dt=DT):
    theta = g[2]
    v = u[0]
    f = [[1.0, 0.0, -v * dt * math.sin(theta)],
         [0.0, 1.0, v * dt * math.cos(theta)],
         [0.0, 0.0, 1.0]]
    g_noise = [[dt * math.cos(theta), 0.0],
               [dt * math.sin(theta), 0.0],
               [0.0, dt]]
    return f, g_noise


def observation(g, landmark=LANDMARK):
    dx = landmark[0] - g[0]
    dy = landmark[1] - g[1]
    q = dx * dx + dy * dy
    if q == 0:
        raise ValueError("bearing undefined at coincident landmark")
    return (math.sqrt(q), wrap(math.atan2(dy, dx) - g[2]))


def observation_jacobian(g, landmark=LANDMARK):
    dx = landmark[0] - g[0]
    dy = landmark[1] - g[1]
    q = dx * dx + dy * dy
    if q == 0:
        raise ValueError("Jacobian undefined at coincident landmark")
    r = math.sqrt(q)
    return [[-dx / r, -dy / r, 0.0],
            [dy / q, -dx / q, -1.0]]


def centered(f, x, eps=1e-6, angular_index=None):
    columns = []
    for i in range(len(x)):
        left, right = list(x), list(x)
        left[i] -= eps
        right[i] += eps
        yl, yr = f(tuple(left)), f(tuple(right))
        diffs = [((wrap(b - a) if k == angular_index else b - a)
                  / (2.0 * eps)) for k, (a, b) in enumerate(zip(yl, yr))]
        columns.append(diffs)
    return transpose(columns)


def maxdiff(a, b):
    return max(abs(x - y) for row_a, row_b in zip(a, b)
               for x, y in zip(row_a, row_b))


def ekf_cycle():
    predicted = motion(OLD)
    f, g_noise = motion_jacobians(OLD)
    pminus = add(matmul(matmul(f, P0), transpose(f)),
                 matmul(matmul(g_noise, M), transpose(g_noise)))
    h = observation_jacobian(predicted)
    s = add(matmul(matmul(h, pminus), transpose(h)), R)
    k = matmul(matmul(pminus, transpose(h)), inverse2(s))
    ideal = observation(predicted)
    measured = (ideal[0] + 0.2, wrap(ideal[1] + 0.1))
    residual = (measured[0] - ideal[0], wrap(measured[1] - ideal[1]))
    dx = apply(k, residual)
    posterior = (predicted[0] + dx[0], predicted[1] + dx[1],
                 wrap(predicted[2] + dx[2]))
    kh = matmul(k, h)
    a = sub(eye(3), kh)
    joseph = add(matmul(matmul(a, pminus), transpose(a)),
                 matmul(matmul(k, R), transpose(k)))
    reduction = sub(pminus, matmul(matmul(k, s), transpose(k)))
    return predicted, f, g_noise, pminus, h, s, k, residual, posterior, joseph, reduction


def close(x, y, tol=1e-8):
    if abs(x - y) > tol:
        raise AssertionError(f"{x} != {y}")


def self_test():
    f, g = motion_jacobians(OLD)
    assert maxdiff(f, centered(lambda state: motion(state), OLD)) < 1e-7
    assert maxdiff(g, centered(lambda error: motion(OLD, noise=error),
                               (0.0, 0.0))) < 1e-7
    predicted = motion(OLD)
    assert maxdiff(observation_jacobian(predicted),
                   centered(observation, predicted, angular_index=1)) < 1e-7
    try:
        observation_jacobian((3.0, 4.0, 0.0))
        raise AssertionError("q=0 should fail")
    except ValueError:
        pass
    values = ekf_cycle()
    _, _, _, p, _, s, k, nu, post, joseph, reduction = values
    close(p[1][2], 0.01)
    close(s[0][0], 0.06)
    close(s[0][1], 0.008)
    close(s[1][1], 0.0194)
    close(s[0][0] * s[1][1] - s[0][1] ** 2, 0.0011)
    close(post[0], -0.052)
    close(post[1], -0.176)
    close(post[2], -0.0772)
    close(joseph[0][0], 0.02714545454545)
    assert maxdiff(joseph, reduction) < 1e-12
    assert maxdiff(joseph, transpose(joseph)) < 1e-12
    assert maxdiff(matmul(s, inverse2(s)), eye(2)) < 1e-12
    assert nu[0] > 0 and nu[1] > 0 and k[0][0] < 0
    close(wrap(math.radians(-179) - math.radians(179)),
          math.radians(2))
    return "PASS: numerical Jacobians, angle, q=0, gain, Joseph, posterior"


def print_matrix(title, value):
    print(title)
    for row in value:
        print("  " + " ".join(f"{x:+.9f}" for x in row))


def scenario(name):
    if name == "motion":
        predicted, f, g, p, *_ = ekf_cycle()
        print("previous:", OLD, "predicted:", predicted)
        print_matrix("F (previous estimate):", f)
        print_matrix("G (velocity noise):", g)
        print_matrix("Pminus:", p)
        print("max F difference:", maxdiff(
            f, centered(lambda x: motion(x), OLD)))
    elif name == "observation":
        predicted = motion(OLD)
        h = observation_jacobian(predicted)
        print("prediction point:", predicted, "landmark:", LANDMARK)
        print("h(predicted):", observation(predicted))
        print_matrix("H (prediction point):", h)
        print("max H difference:", maxdiff(
            h, centered(observation, predicted, angular_index=1)))
    elif name == "update":
        _, _, _, p, h, s, k, nu, post, jp, rd = ekf_cycle()
        print_matrix("Pminus:", p)
        print_matrix("H:", h)
        print_matrix("S:", s)
        print_matrix("K:", k)
        print("innovation:", nu, "estimate:", post)
        print_matrix("Pplus Joseph:", jp)
        print("Joseph versus subtraction:", maxdiff(jp, rd))
    elif name == "nonlinear":
        variance = 0.5
        mode = math.sqrt(1.0 - variance / 2.0)
        print("h(x)=x^2, prior N(0,1), z=1, noise variance=0.5")
        print("exact posterior modes:", (-mode, mode))
        print("EKF at 0: H=0, gain=0, posterior mean=0, variance=1")
    else:
        raise ValueError("unknown scenario")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--scenario",
                        choices=("motion", "observation", "update", "nonlinear"))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test or args.scenario is None:
        print(self_test())
    if args.scenario is not None:
        scenario(args.scenario)
