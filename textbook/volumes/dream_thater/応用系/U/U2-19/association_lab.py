"""U2-19: finite landmark association and false confidence checks.

Python 3 standard library only. Fixed deterministic observations, no RNG.
Coordinates in metres, angles in radians, no wrap discontinuity in this example.
"""
from math import atan2, cos, exp, log, pi, sin, sqrt


def wrap(angle: float) -> float:
    """Return a representative of an angle in [-pi, pi)."""
    return (angle + pi) % (2.0 * pi) - pi


def predicted_observation(landmark: tuple[float, float]) -> tuple[float, float]:
    # Robot pose g=(0, 0, 0) and sensor origin coincides with robot origin.
    dx, dy = landmark
    if dx == 0.0 and dy == 0.0:
        raise ValueError("bearing undefined when landmark equals sensor origin")
    return sqrt(dx * dx + dy * dy), wrap(atan2(dy, dx))


def nis(z: tuple[float, float], mu: tuple[float, float],
        variance_range: float, variance_bearing: float) -> float:
    if variance_range <= 0.0 or variance_bearing <= 0.0:
        raise ValueError("innovation covariance must be positive definite")
    dr = z[0] - mu[0]
    dbeta = wrap(z[1] - mu[1])
    return dr * dr / variance_range + dbeta * dbeta / variance_bearing


def gaussian_density_2d(d2: float, var_range: float, var_bearing: float) -> float:
    # Covariance diagonal: determinant = var_range*var_bearing.
    return exp(-0.5 * d2) / (2.0 * pi * sqrt(var_range * var_bearing))


def posterior_association(scores: list[float]) -> list[float]:
    evidence = sum(scores)
    if evidence <= 0.0:
        raise ValueError("observation evidence must be positive")
    return [score / evidence for score in scores]


def main() -> None:
    z = (2.1, 0.1)
    landmarks = [
        (2.0, 0.0),
        (2.0 * cos(0.2), 2.0 * sin(0.2)),
        (2.0 * cos(0.6), 2.0 * sin(0.6)),
    ]
    var_r, var_b = 0.04, 0.01
    mu = [predicted_observation(m) for m in landmarks]
    distances = [nis(z, h, var_r, var_b) for h in mu]
    gate = [j + 1 for j, d2 in enumerate(distances) if d2 <= 4.0]
    assert all(abs(h[0] - 2.0) < 1e-12 for h in mu)
    assert all(abs(actual - desired) < 1e-10
               for actual, desired in zip(distances, [1.25, 1.25, 25.25]))
    assert gate == [1, 2]

    # Bayesian hypotheses are 1, 2, and clutter (0); third landmark is
    # a separate gate demonstration, not a positive-prior Bayes hypothesis.
    lik1 = gaussian_density_2d(distances[0], var_r, var_b)
    lik2 = gaussian_density_2d(distances[1], var_r, var_b)
    clutter_density = 1.0 / ((3.0 - 1.0) * (1.0 - (-1.0)))
    posterior = posterior_association(
        [0.4 * lik1, 0.4 * lik2, 0.2 * clutter_density]
    )
    assert abs(lik1 - 4.259475109761325) < 1e-11
    assert abs(lik2 - lik1) < 1e-11
    assert abs(posterior[0] - 0.49276950949360615) < 1e-11
    assert abs(posterior[1] - 0.49276950949360615) < 1e-11
    assert abs(posterior[2] - 0.014460981012787805) < 1e-11
    assert abs(sum(posterior) - 1.0) < 1e-12

    false_rejection = exp(-4.0 / 2.0)
    assert abs(false_rejection - 0.1353352832366127) < 1e-12
    threshold_95 = -2.0 * log(0.05)
    assert abs(threshold_95 - 5.991464547107982) < 1e-12

    # True model: x=0, association to b_2=2, noise=0, so z=2.
    # Hard-assignment uses the wrong b_1=0.
    prior_mean, prior_var, noise_var = 0.0, 1.0, 1.0
    gain = prior_var / (prior_var + noise_var)
    z_position, wrong_offset, right_offset = 2.0, 0.0, 2.0
    hard_mean = prior_mean + gain * (z_position - prior_mean - wrong_offset)
    right_mean = prior_mean + gain * (z_position - prior_mean - right_offset)
    hard_var = prior_var * noise_var / (prior_var + noise_var)
    assert (hard_mean, right_mean, hard_var) == (1.0, 0.0, 0.5)

    # Two equally likely *conditional* state posteriors: N(0,.5), N(1,.5).
    gamma = [0.5, 0.5]
    conditional_means = [0.0, 1.0]
    conditional_vars = [0.5, 0.5]
    mixture_mean = sum(w * mean for w, mean in zip(gamma, conditional_means))
    mixture_var = sum(
        w * (var + (mean - mixture_mean) ** 2)
        for w, var, mean in zip(gamma, conditional_vars, conditional_means)
    )
    assert mixture_mean == 0.5
    assert mixture_var == 0.75

    print("NIS:", [round(value, 2) for value in distances])
    print("gated:", gate)
    print("posterior:", "[" + ", ".join(f"{value:.6f}" for value in posterior) + "]")
    print(f"false_rejection_at_4: {false_rejection:.6f}")
    print(f"hard_update_mean: {hard_mean:.6f}")
    print(f"mixture_variance: {mixture_var:.6f}")


if __name__ == "__main__":
    main()
