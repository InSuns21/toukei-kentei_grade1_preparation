#!/usr/bin/env python3
"""MFL14: finite-sample Gaussian-kernel experiments on the unit circle.

Independent points are uniform in angle (hence uniform in arc length). The
kernel uses intrinsic *shortest arc* distance, not Euclidean chord distance.
Only the Python standard library is required; every run is seed-reproducible.
"""

from __future__ import annotations

import argparse
import json
import math
import random
import statistics


TWO_PI = 2.0 * math.pi


def arc_distance(a: float, b: float) -> float:
    return abs((a - b + math.pi) % TWO_PI - math.pi)


def kernel(epsilon: float, a: float, b: float) -> float:
    d = arc_distance(a, b)
    return math.exp(-d * d / (4.0 * epsilon)) / math.sqrt(4.0 * math.pi * epsilon)


def circle_reference(epsilon: float, count: int = 4096) -> dict[str, float]:
    """Midpoint quadrature for E[K], E[K cos X], E[(K cos X)^2]."""
    total_t = total_q = total_t2 = 0.0
    for j in range(count):
        theta = TWO_PI * (j + 0.5) / count
        weight = kernel(epsilon, 0.0, theta)
        product = weight * math.cos(theta)
        total_t += product
        total_q += weight
        total_t2 += product * product
    mu_t = total_t / count
    mu_q = total_q / count
    var_one = max(0.0, total_t2 / count - mu_t * mu_t)
    return {"mu_t": mu_t, "mu_q": mu_q, "p_continuum": mu_t / mu_q,
            "var_one": var_one}


def sample_average(points: list[float], epsilon: float, x: float) -> tuple[float, float, float]:
    """Return numerator T_hat, denominator q_hat and normalized P_hat."""
    weights = [kernel(epsilon, x, theta) for theta in points]
    numerator = math.fsum(w * math.cos(theta) for w, theta in zip(weights, points)) / len(points)
    denominator = math.fsum(weights) / len(points)
    if denominator <= 0.0:
        raise ArithmeticError("kernel denominator underflowed; increase epsilon")
    return numerator, denominator, numerator / denominator


def draw_points(rng: random.Random, n: int) -> list[float]:
    return [rng.random() * TWO_PI for _ in range(n)]


def rms(values: list[float]) -> float:
    return math.sqrt(math.fsum(value * value for value in values) / len(values))


def plot(title: str, xlabel: str, ylabel: str, series: list[tuple[str, list[list[float]]]]) -> dict:
    return {"title": title, "x_label": xlabel, "y_label": ylabel,
            "series": [{"name": name, "points": points} for name, points in series]}


def run_variance(n: int, epsilon: float, trials: int, rng: random.Random) -> dict:
    rows = []
    for width in (epsilon / 2.0, epsilon, epsilon * 2.0):
        reference = circle_reference(width)
        estimates = [sample_average(draw_points(rng, n), width, 0.0)[0]
                     for _ in range(trials)]
        empirical = statistics.variance(estimates)
        theoretical = reference["var_one"] / n
        rows.append({"epsilon": width, "n": n, "trials": trials,
                     "effective_n": n * math.sqrt(width),
                     "mean_empirical": statistics.mean(estimates),
                     "mean_theoretical": reference["mu_t"],
                     "variance_empirical": empirical,
                     "variance_theoretical": theoretical,
                     "variance_ratio": empirical / theoretical,
                     "n_sqrt_epsilon_times_variance": n * math.sqrt(width) * empirical})
    return {"mode": "variance", "model": "unit circle, p=uniform, f=cos(theta), x=0",
            "rows": rows,
            "plots": [plot("Kernel標本平均の分散", "ε", "Var(T̂)", [
                ("実測", [[row["epsilon"], row["variance_empirical"]] for row in rows]),
                ("理論", [[row["epsilon"], row["variance_theoretical"]] for row in rows]),
            ])],
            "interpretation": "理論列は正確な二次モーメント式の数値積分。実測列は有限回のMonte Carloで必ずしも一致しない。"}


def run_ratio(n: int, epsilon: float, trials: int, rng: random.Random) -> dict:
    reference = circle_reference(epsilon)
    rows = []
    for count in sorted({max(8, n // 2), n, 2 * n}):
        estimates = [sample_average(draw_points(rng, count), epsilon, 0.0)
                     for _ in range(trials)]
        errors = [estimate[2] - reference["p_continuum"] for estimate in estimates]
        rows.append({"n": count, "epsilon": epsilon,
                     "effective_n": count * math.sqrt(epsilon),
                     "q_mean": statistics.mean(estimate[1] for estimate in estimates),
                     "q_min": min(estimate[1] for estimate in estimates),
                     "q_theoretical": reference["mu_q"],
                     "p_theoretical": reference["p_continuum"],
                     "p_bias_mc": statistics.mean(errors),
                     "p_rmse": rms(errors), "trials": trials})
    return {"mode": "ratio", "rows": rows,
            "plots": [plot("行正規化後の推定誤差", "n", "P̂ と母平均のRMSE", [
                ("Monte Carlo", [[row["n"], row["p_rmse"]] for row in rows]),
            ])],
            "interpretation": "q_minは実測の最小分母で理論的下界ではない。P̂の誤差には分子・分母の相関も効く。"}


def run_loo(n: int, epsilon: float, rng: random.Random) -> dict:
    points = sorted(draw_points(rng, n))
    items = []
    for i, x in enumerate(points):
        off_sum = off_weighted = 0.0
        for j, theta in enumerate(points):
            if i == j:
                continue
            weight = kernel(epsilon, x, theta)
            off_sum += weight
            off_weighted += weight * math.cos(theta)
        diagonal = kernel(epsilon, x, x)
        if off_sum <= 0.0:
            raise ArithmeticError("leave-one-out denominator underflowed")
        total = off_sum + diagonal
        full = (off_weighted + diagonal * math.cos(x)) / total
        loo = off_weighted / off_sum
        identity = diagonal / total * (math.cos(x) - loo)
        items.append({"theta": x, "full": full, "loo": loo,
                      "absolute_difference": abs(full - loo),
                      "self_weight_fraction": diagonal / total,
                      "identity_residual": abs((full - loo) - identity)})
    return {"mode": "loo", "n": n, "epsilon": epsilon,
            "mean_abs_difference": statistics.mean(item["absolute_difference"] for item in items),
            "max_abs_difference": max(item["absolute_difference"] for item in items),
            "max_identity_residual": max(item["identity_residual"] for item in items),
            "items_preview": items[:8],
            "plots": [plot("自己重みの影響", "角度 θ", "絶対差・自己重み割合", [
                ("|P̂−P̂_LOO|", [[item["theta"], item["absolute_difference"]] for item in items]),
                ("自己重み割合", [[item["theta"], item["self_weight_fraction"]] for item in items]),
            ])],
            "interpretation": "自己点を除外すると残りn−1点は評価点Xiを条件として独立。数値的な一致と確率的な証明を区別。"}


def run_bandwidth(n: int, exponent: float, trials: int, rng: random.Random) -> dict:
    rows = []
    for count in (max(40, n // 2), n, 2 * n, 4 * n):
        epsilon = count ** (-exponent)
        reference = circle_reference(epsilon)
        errors = []
        for _ in range(trials):
            estimate = sample_average(draw_points(rng, count), epsilon, 0.0)[2]
            errors.append((estimate - 1.0) / epsilon + 1.0)  # Δ cos(0) = -1.
        rows.append({"n": count, "epsilon": epsilon,
                     "exponent": exponent, "generator_rmse_vs_minus_one": rms(errors),
                     "continuum_generator_bias": (reference["p_continuum"] - 1.0) / epsilon + 1.0,
                     "sufficient_condition_quantity": count * epsilon ** 2.5 / math.log(count),
                     "trials": trials})
    return {"mode": "bandwidth", "dimension": 1, "rows": rows,
            "plots": [plot("核generatorの実測誤差", "n", "RMSE対 Δ cos(0)=-1", [
                ("実測", [[row["n"], row["generator_rmse_vs_minus_one"]] for row in rows]),
                ("連続biasの絶対値", [[row["n"], abs(row["continuum_generator_bias"])] for row in rows]),
            ])],
            "interpretation": "n ε^(5/2)/log n→∞は本文の保守的な十分条件。成立しない場合も発散は断言不可。"}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("variance", "ratio", "loo", "bandwidth"), default="variance")
    parser.add_argument("--n", type=int, default=160)
    parser.add_argument("--epsilon", type=float, default=0.06)
    parser.add_argument("--trials", type=int, default=140)
    parser.add_argument("--exponent", type=float, default=0.25)
    parser.add_argument("--seed", type=int, default=2026)
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("MFL14 self-test passed")
        return
    if not (8 <= args.n <= 1200 and 0.002 <= args.epsilon <= 1.0 and
            20 <= args.trials <= 400 and 0.1 <= args.exponent <= 0.8):
        parser.error("require 8<=n<=1200, .002<=epsilon<=1, 20<=trials<=400, .1<=exponent<=.8")
    rng = random.Random(args.seed)
    if args.mode == "variance":
        result = run_variance(args.n, args.epsilon, args.trials, rng)
    elif args.mode == "ratio":
        result = run_ratio(args.n, args.epsilon, args.trials, rng)
    elif args.mode == "loo":
        result = run_loo(args.n, args.epsilon, rng)
    else:
        if 4 * args.n > 4800:
            parser.error("n is too large for the bandwidth experiment")
        result = run_bandwidth(args.n, args.exponent, args.trials, rng)
    result["seed"] = args.seed
    print(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False))


def self_test() -> None:
    assert arc_distance(0.0, TWO_PI - 0.1) > 0.099999
    assert arc_distance(0.0, TWO_PI - 0.1) < 0.100001
    a = circle_reference(0.04)
    assert abs(a["mu_q"] - 1.0 / TWO_PI) < 1e-8
    assert abs(a["p_continuum"] - math.exp(-0.04)) < 1e-7
    points = [0.0, 0.3, 1.2, 3.0]
    t, q, p = sample_average(points, 0.05, 0.0)
    assert abs(p - t / q) < 1e-12
    assert sample_average(points, 0.05, 0.0)[1] > 0
    loo = run_loo(80, 0.03, random.Random(7))
    assert loo["max_identity_residual"] < 1e-10
    ref = circle_reference(0.06)
    assert ref["var_one"] > 0
    bandwidth = run_bandwidth(50, 0.25, 20, random.Random(7))
    assert len(bandwidth["rows"]) == 4


if __name__ == "__main__":
    main()
