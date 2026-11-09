#!/usr/bin/env python3
"""MFL43: small, reproducible point-cloud symmetry benchmark (stdlib only).

This is a finite four-labelled-point teaching model, not a molecular benchmark.
No network access, GPU, NumPy, or external datasets are needed.
"""

import argparse
import math
import random
import time


def sub(a, b):
    return tuple(x - y for x, y in zip(a, b))


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0])


def matvec(a, x):
    return tuple(dot(row, x) for row in a)


def rotate_and_translate(points, matrix, shift):
    return [tuple(x + t for x, t in zip(matvec(matrix, p), shift)) for p in points]


def rotation_z_y():
    """Fixed proper rotation used only for held-out equivariance diagnostics."""
    a, b = 0.71, -0.43
    c, s = math.cos(a), math.sin(a)
    d, e = math.cos(b), math.sin(b)
    return ((c * d, -s, c * e),
            (s * d, c, s * e),
            (-e, 0.0, d))


def haar_rotation(rng):
    """Uniform SO(3) rotation via a unit quaternion."""
    u, v, w = rng.random(), rng.random(), rng.random()
    x = math.sqrt(1 - u) * math.sin(2 * math.pi * v)
    y = math.sqrt(1 - u) * math.cos(2 * math.pi * v)
    z = math.sqrt(u) * math.sin(2 * math.pi * w)
    q = math.sqrt(u) * math.cos(2 * math.pi * w)
    return ((1 - 2 * (y * y + z * z), 2 * (x * y - z * q), 2 * (x * z + y * q)),
            (2 * (x * y + z * q), 1 - 2 * (x * x + z * z), 2 * (y * z - x * q)),
            (2 * (x * z - y * q), 2 * (y * z + x * q), 1 - 2 * (x * x + y * y)))


def geometric_features(points):
    """s = 1/6 sum_{a<b}|pa-pb|^2; v = det(p1-p0,p2-p0,p3-p0).

    s also equals sum_i sum_{j != i} |pi-pj|^2/12, a single
    distance-message-passing layer followed by sum pooling.
    """
    s = sum(dot(sub(points[i], points[j]), sub(points[i], points[j]))
            for i in range(4) for j in range(i + 1, 4)) / 6.0
    e1, e2, e3 = (sub(points[i], points[0]) for i in (1, 2, 3))
    return s, dot(e1, cross(e2, e3))


def data(seed, n_train, n_test, label_noise, coordinate_noise, task):
    """Draw independent latent tetrahedra, then independently pose and perturb."""
    rng = random.Random(seed)
    records = []
    for _ in range(n_train + n_test):
        r = rng.uniform(0.7, 1.3)
        hand = -1 if rng.random() < 0.5 else 1
        base = [(0.0, 0.0, 0.0), (r, 0.0, 0.0),
                (0.0, 1.0, 0.0), (0.0, 0.0, hand * r)]
        shift = tuple(rng.uniform(-0.4, 0.4) for _ in range(3))
        points = rotate_and_translate(base, haar_rotation(rng), shift)
        if coordinate_noise:
            points = [tuple(x + rng.gauss(0, coordinate_noise) for x in p)
                      for p in points]
        latent_s, latent_v = r * r + 0.5, hand * r * r
        target = (1.0 + 0.8 * latent_s) if task == "even" else (0.8 * latent_v)
        records.append((points, target + rng.gauss(0, label_noise)))
    rng.shuffle(records)  # independent of the labels' values
    return records[:n_train], records[n_train:]


FEATURE_NAMES = {
    "distance-GNN": ("bias", "s"),
    "SO3-readout": ("bias", "s", "v"),
    "parity-odd": ("v",),
    "mixed-readout": ("bias", "s", "v", "q"),
}


def features(points, names):
    s, v = geometric_features(points)
    q = sub(points[1], points[0])[0]  # world-axis feature; deliberately not invariant
    values = {"bias": 1.0, "s": s, "v": v, "q": q}
    return [values[name] for name in names]


def solve_linear(a, b):
    """Partial-pivoting Gauss elimination; used only for 1-4 feature readouts."""
    n = len(b)
    a = [list(row) + [target] for row, target in zip(a, b)]
    for k in range(n):
        pivot = max(range(k, n), key=lambda i: abs(a[i][k]))
        if abs(a[pivot][k]) < 1e-14:
            raise ArithmeticError("singular normal equation")
        a[k], a[pivot] = a[pivot], a[k]
        for i in range(k + 1, n):
            multiplier = a[i][k] / a[k][k]
            for j in range(k, n + 1):
                a[i][j] -= multiplier * a[k][j]
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (a[i][n] - sum(a[i][j] * x[j] for j in range(i + 1, n))) / a[i][i]
    return x


def fit_readout(training, names, ridge):
    p = len(names)
    gram = [[0.0] * p for _ in range(p)]
    rhs = [0.0] * p
    for cloud, label in training:
        x = features(cloud, names)
        for i in range(p):
            rhs[i] += x[i] * label / len(training)
            for j in range(p):
                gram[i][j] += x[i] * x[j] / len(training)
    for i, name in enumerate(names):
        if name != "bias":
            gram[i][i] += ridge
    return solve_linear(gram, rhs)


def fit_mlp(training, seed, ridge, epochs, width=12, rate=0.025):
    """One-hidden-layer coordinate MLP trained by full-batch gradient descent."""
    rng = random.Random(seed + 100003)
    d = 12
    w = [[rng.uniform(-0.20, 0.20) for _ in range(d)] for _ in range(width)]
    b = [0.0] * width
    v = [rng.uniform(-0.20, 0.20) for _ in range(width)]
    bias = 0.0
    for _ in range(epochs):
        gw = [[0.0] * d for _ in range(width)]
        gb = [0.0] * width
        gv = [0.0] * width
        go = 0.0
        for cloud, label in training:
            x = [value for point in cloud for value in point]
            h = [math.tanh(dot(w[j], x) + b[j]) for j in range(width)]
            error = bias + dot(v, h) - label
            go += error
            for j in range(width):
                gv[j] += error * h[j]
                dz = error * v[j] * (1 - h[j] * h[j])
                gb[j] += dz
                for k in range(d):
                    gw[j][k] += dz * x[k]
        inv = 1.0 / len(training)
        bias -= rate * go * inv
        for j in range(width):
            v[j] -= rate * (gv[j] * inv + ridge * v[j])
            b[j] -= rate * gb[j] * inv
            for k in range(d):
                w[j][k] -= rate * (gw[j][k] * inv + ridge * w[j][k])
    return (w, b, v, bias)


def predict(model, fitted, cloud):
    if model == "coordinate-MLP":
        w, b, v, bias = fitted
        x = [value for point in cloud for value in point]
        return bias + sum(v[j] * math.tanh(dot(w[j], x) + b[j])
                          for j in range(len(v)))
    return dot(fitted, features(cloud, FEATURE_NAMES[model]))


def assess(model, fitted, samples, task):
    proper = rotation_z_y()
    mirror = ((-1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
    sign = 1.0 if task == "even" else -1.0
    mse = rotation_residual = mirror_residual = 0.0
    for cloud, target in samples:
        original = predict(model, fitted, cloud)
        transformed = rotate_and_translate(cloud, proper, (0.3, -0.2, 0.4))
        reflected = rotate_and_translate(cloud, mirror, (0.3, -0.2, 0.4))
        mse += (original - target)**2
        rotation_residual += (predict(model, fitted, transformed) - original)**2
        mirror_residual += (predict(model, fitted, reflected) - sign * original)**2
    n = len(samples)
    return (mse / n, math.sqrt(rotation_residual / n),
            math.sqrt(mirror_residual / n))


def experiment(task, seed, n_train, n_test, label_noise, coordinate_noise, ridge, epochs):
    training, testing = data(seed, n_train, n_test, label_noise, coordinate_noise, task)
    models = ["coordinate-MLP", "mixed-readout", "distance-GNN", "SO3-readout"]
    if task == "odd":
        models.append("parity-odd")
    rows = []
    for model in models:
        start = time.perf_counter()
        if model == "coordinate-MLP":
            fitted = fit_mlp(training, seed, ridge, epochs)
            parameters = 12 * 12 + 12 + 12 + 1
        else:
            names = FEATURE_NAMES[model]
            fitted = fit_readout(training, names, ridge)
            parameters = len(names)
        train_ms = 1000 * (time.perf_counter() - start)
        mse, proper, mirror = assess(model, fitted, testing, task)
        rows.append((model, parameters, mse, proper, mirror, train_ms))
    return rows


def self_test():
    rng = random.Random(5)
    base = [(0.0, 0.0, 0.0), (1.0, 0.0, 0.0),
            (0.0, 1.0, 0.0), (0.0, 0.0, 1.0)]
    s, v = geometric_features(base)
    assert abs(s - 1.5) < 1e-13 and abs(v - 1.0) < 1e-13
    rotated = rotate_and_translate(base, haar_rotation(rng), (2, -1, 0.5))
    reflected = rotate_and_translate(base, ((-1, 0, 0), (0, 1, 0), (0, 0, 1)), (2, -1, 0.5))
    assert abs(geometric_features(rotated)[0] - s) < 1e-12
    assert abs(geometric_features(rotated)[1] - v) < 1e-12
    assert abs(geometric_features(reflected)[0] - s) < 1e-12
    assert abs(geometric_features(reflected)[1] + v) < 1e-12
    # Exact mirror-pair lower bound: ((z-a)^2+(z+a)^2)/2 = z^2+a^2.
    for z in (-1.5, 0.0, 2.1):
        assert abs(((z - 0.8)**2 + (z + 0.8)**2) / 2 - (z*z + 0.64)) < 1e-12
    for task in ("even", "odd"):
        args = (7, 48, 96, 0.0, 0.0, 1e-8, 80)
        first = experiment(task, *args)
        second = experiment(task, *args)
        for row, rerun in zip(first, second):
            assert row[:5] == rerun[:5]
            assert all(math.isfinite(x) for x in row[2:])
        named = {row[0]: row for row in first}
        if task == "even":
            assert named["distance-GNN"][2] < 1e-10
            assert named["distance-GNN"][3] < 1e-11
            assert named["distance-GNN"][4] < 1e-11
        else:
            assert named["parity-odd"][2] < 1e-10
            assert named["parity-odd"][4] < 1e-11
            assert named["distance-GNN"][2] > 0.10
    print("PASS: exact O(3)/SO(3) laws, parity lower bound, split/seed reproducibility")
    print("PASS: both noiseless tasks and proper/reflection transformation diagnostics")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--task", choices=("even", "odd", "both"), default="both")
    parser.add_argument("--seeds", default="7,17,29")
    parser.add_argument("--train", type=int, default=48)
    parser.add_argument("--test", type=int, default=96)
    parser.add_argument("--label-noise", type=float, default=0.08)
    parser.add_argument("--coordinate-noise", type=float, default=0.02)
    parser.add_argument("--ridge", type=float, default=0.001)
    parser.add_argument("--epochs", type=int, default=250)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    try:
        seeds = [int(item) for item in args.seeds.split(",")]
    except ValueError:
        parser.error("seeds must be comma-separated integers")
    if not seeds or len(set(seeds)) != len(seeds):
        parser.error("provide at least one distinct seed")
    if args.train < 8 or args.test < 2:
        parser.error("train must be >=8 and test >=2")
    if not all(math.isfinite(x) and x >= 0 for x in
               (args.label_noise, args.coordinate_noise, args.ridge)):
        parser.error("noise and ridge must be finite nonnegative numbers")
    if args.epochs < 1 or args.epochs > 10000:
        parser.error("epochs must lie in [1, 10000]")
    print(f"train={args.train} test={args.test} seeds={seeds} "
          f"label_noise={args.label_noise} coordinate_noise={args.coordinate_noise} "
          f"ridge={args.ridge} epochs={args.epochs}")
    tasks = ("even", "odd") if args.task == "both" else (args.task,)
    for task in tasks:
        print(f"\nTASK {task}: test MSE | proper-motion RMSE | mirror-law RMSE | train ms")
        combined = {}
        for seed in seeds:
            for model, parameters, mse, proper, mirror, ms in experiment(
                    task, seed, args.train, args.test, args.label_noise,
                    args.coordinate_noise, args.ridge, args.epochs):
                print(f"seed={seed:3d} {model:15s} p={parameters:3d} "
                      f"MSE={mse:.6f} SO3={proper:.3e} mirror={mirror:.3e} "
                      f"fit_ms={ms:.2f}")
                combined.setdefault(model, []).append((mse, proper, mirror))
        print("seed-means (MSE, proper RMSE, mirror-law RMSE):")
        for model, values in combined.items():
            means = [sum(row[j] for row in values) / len(values) for j in range(3)]
            print(f"  {model:15s} " + " ".join(f"{v:.6f}" for v in means))


if __name__ == "__main__":
    main()
