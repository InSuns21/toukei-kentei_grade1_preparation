"""U2-28: reproducible planar translation/landmark estimation comparison.

Single generative model: fixed heading zero; p0=(0,0) known, unknown
landmarks with N(0,25 I) priors, odometry N(0,0.04 I), landmark
relative-vector observations N(0,0.09 I). All random seeds are fixed.
MCL freezes the *estimated* map after the first observation. It is a
misspecified approximation, not an exact unknown-map SLAM posterior.
Standard library only except optional --plot (matplotlib).
"""
import argparse
import math
import random
import time

SEED = 20261121
Q = 0.04
R = 0.09
V = 25.0
TRUTH = [(0., 0.), (1., 0.), (1., 1.), (0., 1.), (0., 0.)]
LANDMARKS = [(2., 0.), (0., 2.)]


def transpose(a):
    return [list(v) for v in zip(*a)]


def product(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(len(b)))
             for j in range(len(b[0]))] for i in range(len(a))]


def identity(n):
    return [[float(i == j) for j in range(n)] for i in range(n)]


def add(a, b):
    return [[x + y for x, y in zip(ar, br)] for ar, br in zip(a, b)]


def minus(a, b):
    return [[x - y for x, y in zip(ar, br)] for ar, br in zip(a, b)]


def inverse2(a):
    det = a[0][0] * a[1][1] - a[0][1] * a[1][0]
    if det <= 0:
        raise ValueError("innovation covariance not positive definite")
    return [[a[1][1] / det, -a[0][1] / det],
            [-a[1][0] / det, a[0][0] / det]]


def mv(a, x):
    return [sum(c * v for c, v in zip(row, x)) for row in a]


def draw_data(seed=SEED, failure="normal"):
    rng = random.Random(seed)
    controls = []
    for t in range(1, len(TRUTH)):
        controls.append(tuple(TRUTH[t][k] - TRUTH[t-1][k] +
                              rng.gauss(0., math.sqrt(Q)) for k in range(2)))
    readings = []
    for p in TRUTH:
        readings.append([tuple(m[k] - p[k] +
                               rng.gauss(0., math.sqrt(R)) for k in range(2))
                         for m in LANDMARKS])
    if failure == "swap":
        readings[2][0], readings[2][1] = readings[2][1], readings[2][0]
    if failure == "outlier":
        z = readings[3][0]
        readings[3][0] = (z[0] + 3., z[1] - 3.)
    return controls, readings


def ekf_slam(controls, readings):
    # p_t,m_0,m_1 in R^6. This is the exact linear-Gaussian Kalman case
    # of EKF-SLAM because the heading is calibrated and fixed at zero.
    x = [0.] * 6
    p = [[0.] * 6 for _ in range(6)]
    for k in range(2, 6):
        p[k][k] = V
    poses = []
    variances = []
    for t in range(5):
        if t:
            x[0] += controls[t-1][0]
            x[1] += controls[t-1][1]
            p[0][0] += Q
            p[1][1] += Q
        for j in range(2):
            h = [[0.] * 6 for _ in range(2)]
            for k in range(2):
                h[k][k] = -1.
                h[k][2 + 2*j + k] = 1.
            r = [[R, 0.], [0., R]]
            pht = product(p, transpose(h))
            s = add(product(h, pht), r)
            gain = product(pht, inverse2(s))
            innovation = [readings[t][j][k] - v
                          for k, v in enumerate(mv(h, x))]
            correction = mv(gain, innovation)
            x = [a + b for a, b in zip(x, correction)]
            ikh = minus(identity(6), product(gain, h))
            # Joseph form retains symmetry/nonnegative covariance numerically.
            p = add(product(product(ikh, p), transpose(ikh)),
                    product(product(gain, r), transpose(gain)))
        poses.append((x[0], x[1]))
        variances.append((p[0][0], p[1][1]))
    return poses, variances, [tuple(x[2+2*j:4+2*j]) for j in range(2)]


def solve(a, b):
    n = len(b)
    aug = [list(row) + [rhs] for row, rhs in zip(a, b)]
    for k in range(n):
        pivot = max(range(k, n), key=lambda i: abs(aug[i][k]))
        if abs(aug[pivot][k]) < 1e-12:
            raise ValueError("singular gauge or missing positive prior")
        aug[k], aug[pivot] = aug[pivot], aug[k]
        scale = aug[k][k]
        aug[k] = [v / scale for v in aug[k]]
        for i in range(n):
            if i == k:
                continue
            factor = aug[i][k]
            aug[i] = [v - factor*w for v, w in zip(aug[i], aug[k])]
    return [row[-1] for row in aug]


def graph_slam(controls, readings):
    # A coordinate has 6 unknowns: p1,...,p4,m0,m1.
    # p0 is *exactly* anchored at zero (not a finite soft constraint).
    normal = [[0.] * 6 for _ in range(6)]
    rhs = [[0.] * 6 for _ in range(2)]

    def factor(row, measurements, variance):
        weight = 1. / variance
        for i in range(6):
            for j in range(6):
                normal[i][j] += weight * row[i] * row[j]
            for k in range(2):
                rhs[k][i] += weight * row[i] * measurements[k]

    for t, u in enumerate(controls, start=1):
        row = [0.] * 6
        row[t-1] = 1.
        if t > 1:
            row[t-2] = -1.
        factor(row, u, Q)
    for t in range(5):
        for j in range(2):
            row = [0.] * 6
            row[4+j] = 1.
            if t > 0:
                row[t-1] = -1.
            factor(row, readings[t][j], R)
    for j in range(2):
        row = [0.] * 6
        row[4+j] = 1.
        factor(row, (0., 0.), V)
    xs = [solve(normal, rhs[k]) for k in range(2)]
    for k in range(2):
        assert max(abs(v-w) for v, w in zip(mv(normal, xs[k]), rhs[k])) < 1e-7
    poses = [(0., 0.)] + [(xs[0][i], xs[1][i]) for i in range(4)]
    maps = [(xs[0][4+j], xs[1][4+j]) for j in range(2)]
    # Marginal variance of p4 from inverse information matrix.
    e4 = [0., 0., 0., 1., 0., 0.]
    p4variance = solve(normal, e4)[3]
    return poses, maps, p4variance


def systematic(particles, weights, rng):
    n = len(particles)
    u0 = rng.random() / n
    ancestors = []
    i = 0
    total = weights[0]
    for j in range(n):
        u = u0 + j / n
        while u > total and i < n-1:
            i += 1
            total += weights[i]
        ancestors.append(particles[i])
    return ancestors


def mcl_with_bootstrap_map(controls, readings, count=2000, seed=SEED+17):
    if count < 10:
        raise ValueError("at least 10 particles required")
    # t0 observations train an estimated map; truth LANDMARKS is never read.
    shrink = V / (V + R)
    frozen = [tuple(shrink * z for z in row) for row in readings[0]]
    particles = [(0., 0.)] * count
    rng = random.Random(seed)
    poses = [(0., 0.)]
    ess = []
    for t, u in enumerate(controls, start=1):
        proposed = [(p[0] + u[0] + rng.gauss(0., math.sqrt(Q)),
                     p[1] + u[1] + rng.gauss(0., math.sqrt(Q)))
                    for p in particles]
        logw = []
        for p in proposed:
            s = 0.
            for j in range(2):
                for k in range(2):
                    residual = readings[t][j][k] - (frozen[j][k] - p[k])
                    s -= residual * residual / (2. * R)
            logw.append(s)
        maximum = max(logw)
        weights = [math.exp(s-maximum) for s in logw]
        z = sum(weights)
        weights = [w/z for w in weights]
        ess.append(1. / sum(w*w for w in weights))
        particles = systematic(proposed, weights, rng)
        poses.append((sum(p[0] for p in particles)/count,
                      sum(p[1] for p in particles)/count))
    return poses, frozen, ess


def rmse(poses):
    if len(poses) != len(TRUTH):
        raise ValueError("different evaluation timestamps")
    return math.sqrt(sum(math.dist(p, q)**2
                         for p, q in zip(poses[1:], TRUTH[1:])) / 4.)


def check():
    for failure in ("normal", "swap", "outlier"):
        u, z = draw_data(failure=failure)
        assert (u, z) == draw_data(failure=failure)
        filtered, cov, lm = ekf_slam(u, z)
        batch, gm, var = graph_slam(u, z)
        # Filtering at last time and batch smoothing have the same last
        # marginal mean because this is one linear Gaussian posterior.
        assert math.dist(filtered[-1], batch[-1]) < 1e-7
        assert all(math.dist(a, b) < 1e-7 for a, b in zip(lm, gm))
        assert abs(cov[-1][0]-var) < 1e-7
        assert var > 0 and all(v > 0 for v in cov[-1])
        local, frozen, ess = mcl_with_bootstrap_map(u, z, 250)
        assert len(local) == 5 and len(frozen) == 2
        assert len(ess) == 4 and all(1 <= s <= 250 + 1e-7 for s in ess)
        assert all(math.isfinite(v) for pose in local for v in pose)
    print("U2-28 self-test: PASS (3 scenarios; exact endpoint agreement)")


def run(args):
    u, z = draw_data(failure=args.failure)
    start = time.perf_counter()
    filtered, cov, lm = ekf_slam(u, z)
    ekf_ms = (time.perf_counter()-start)*1000
    start = time.perf_counter()
    mcl, frozen, ess = mcl_with_bootstrap_map(u, z, args.particles)
    mcl_ms = (time.perf_counter()-start)*1000
    start = time.perf_counter()
    batch, gm, var = graph_slam(u, z)
    graph_ms = (time.perf_counter()-start)*1000
    assert math.dist(filtered[-1], batch[-1]) < 1e-7
    print(f"seed={SEED} failure={args.failure} particles={args.particles}")
    print("p0 is fixed, heading=0 rad, units=m, Q=0.04 m^2, R=0.09 m^2")
    print("t | truth      | EKF-SLAM    | frozen-map MCL | graph batch")
    for t in range(5):
        fmt = lambda p: f"({p[0]:6.3f},{p[1]:6.3f})"
        print(f"{t} | {fmt(TRUTH[t])} | {fmt(filtered[t])} | {fmt(mcl[t])} | {fmt(batch[t])}")
    print(f"RMSE (t=1..4) EKF={rmse(filtered):.6f} MCL={rmse(mcl):.6f} graph={rmse(batch):.6f} m")
    print(f"p4 variance EKF={cov[-1][0]:.8f}, graph={var:.8f} m^2")
    print(f"map EKF={lm}, graph={gm}, frozen MCL={frozen}")
    print(f"MCL ESS before resampling={['%.1f' % v for v in ess]}")
    print(f"wall time (one run; not a benchmark): EKF={ekf_ms:.2f}ms MCL={mcl_ms:.2f}ms graph={graph_ms:.2f}ms")
    print("Caution: graph is smoothed; MCL fixes an uncertain bootstrap map and is not full SLAM.")
    if args.plot:
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots()
        for name, pp, marker, ls in (
            ("truth", TRUTH, "o", "-"),
            ("EKF filtered", filtered, "x", "--"),
            ("graph smoothed", batch, "+", "-."),
            ("frozen-map MCL", mcl, "s", ":"),
        ):
            ax.plot([p[0] for p in pp], [p[1] for p in pp],
                    marker=marker, linestyle=ls, label=name)
        ax.scatter([p[0] for p in LANDMARKS], [p[1] for p in LANDMARKS],
                   marker="*", s=90, label="landmark truth (evaluation only)")
        ax.set_xlabel("world x (m)")
        ax.set_ylabel("world y (m)")
        ax.set_aspect("equal", adjustable="datalim")
        ax.legend(fontsize="small")
        ax.set_title("U2-28 trajectory comparison")
        plt.show()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--failure", choices=["normal", "swap", "outlier"], default="normal")
    parser.add_argument("--particles", type=int, default=2000)
    parser.add_argument("--plot", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        check()
    else:
        run(args)


if __name__ == "__main__":
    main()
