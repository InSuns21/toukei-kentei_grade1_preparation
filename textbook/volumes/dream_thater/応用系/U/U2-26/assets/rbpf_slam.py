"""U2-26: exact finite conditional-map SLAM, a pedagogical RBPF example.

Finite poses A/B are stationary; a single binary landmark is unknown.
Observation Z_t=1 has probabilities by (pose, landmark value):
    A: g(1|m=0)=3/10, g(1|m=1)=9/10
    B: g(1|m=0)=4/5,  g(1|m=1)=1/5
Conditional observations at distinct times are independent given pose and landmark.
All calculations use fractions.Fraction, without randomness or dependencies.
The enumeration is exact; it is not a benchmark of continuous FastSLAM.
"""
from __future__ import annotations

import argparse
from fractions import Fraction as F

POSES = ("A", "B")
G1 = {
    "A": {0: F(3, 10), 1: F(9, 10)},
    "B": {0: F(4, 5), 1: F(1, 5)},
}
POSE_PRIOR = {"A": F(1, 2), "B": F(1, 2)}
MAP_PRIOR = {p: F(1, 2) for p in POSES}


def step(pose_weights, conditional_map):
    """Bootstrap weight step for a stationary pose, followed by the map update.

    The predictive likelihood uses the OLD conditional map.  The post-update
    map is kept separately for each pose.  Input dictionaries are not mutated.
    """
    likelihood = {
        p: G1[p][1] * conditional_map[p]
        + G1[p][0] * (1 - conditional_map[p])
        for p in POSES
    }
    unnormalized = {p: pose_weights[p] * likelihood[p] for p in POSES}
    evidence = sum(unnormalized.values(), F(0))
    if evidence <= 0:
        raise ValueError("all branches have zero observation evidence")
    weights_new = {p: unnormalized[p] / evidence for p in POSES}
    maps_new = {}
    for p in POSES:
        if likelihood[p] == 0:
            maps_new[p] = None  # zero-weight branch: no conditional posterior
        else:
            maps_new[p] = (
                G1[p][1] * conditional_map[p] / likelihood[p]
            )
    return weights_new, maps_new, likelihood, evidence


def exact_joint(n_observations):
    """Enumerate all 4 joint states with n independent observations Z=1."""
    if n_observations < 0:
        raise ValueError("n_observations must be non-negative")
    unnormalized = {
        (p, m): POSE_PRIOR[p] * F(1, 2) * G1[p][m] ** n_observations
        for p in POSES for m in (0, 1)
    }
    evidence = sum(unnormalized.values(), F(0))
    return ({k: v / evidence for k, v in unnormalized.items()}, evidence)


def marginal_map(weights, maps):
    return sum((weights[p] * maps[p] for p in POSES), F(0))


def check_all():
    weights1, maps1, likelihood1, evidence1 = step(POSE_PRIOR, MAP_PRIOR)
    assert likelihood1 == {"A": F(3, 5), "B": F(1, 2)}
    assert evidence1 == F(11, 20)
    assert weights1 == {"A": F(6, 11), "B": F(5, 11)}
    assert maps1 == {"A": F(3, 4), "B": F(1, 5)}
    assert marginal_map(weights1, maps1) == F(1, 2)

    weights2, maps2, likelihood2, evidence2 = step(weights1, maps1)
    assert likelihood2 == {"A": F(3, 4), "B": F(17, 25)}
    assert evidence2 == F(79, 110)
    assert weights2 == {"A": F(45, 79), "B": F(34, 79)}
    assert maps2 == {"A": F(9, 10), "B": F(1, 17)}
    assert marginal_map(weights2, maps2) == F(85, 158)

    joint, two_observation_evidence = exact_joint(2)
    assert two_observation_evidence == F(79, 200)
    assert joint == {
        ("A", 0): F(9, 158),
        ("A", 1): F(81, 158),
        ("B", 0): F(64, 158),
        ("B", 1): F(4, 158),
    }
    for p in POSES:
        assert sum(joint[(p, m)] for m in (0, 1)) == weights2[p]
        assert joint[(p, 1)] / weights2[p] == maps2[p]
    assert evidence1 * evidence2 == two_observation_evidence

    collapsed = {p: marginal_map(weights1, maps1) for p in POSES}
    wrong_weights, _, _, _ = step(weights1, collapsed)
    assert wrong_weights == {"A": F(36, 61), "B": F(25, 61)}
    assert wrong_weights != weights2

    conditional_variance = (
        weights1["A"] * maps1["A"] * (1 - maps1["A"])
        + weights1["B"] * maps1["B"] * (1 - maps1["B"])
    )
    variance_of_means = sum(
        (weights1[p] * (maps1[p] - F(1, 2)) ** 2 for p in POSES),
        F(0),
    )
    assert conditional_variance == F(7, 40)
    assert variance_of_means == F(3, 40)
    assert conditional_variance + variance_of_means == F(1, 4)

    return weights1, maps1, weights2, maps2, wrong_weights


def report(scenario):
    w1, q1, w2, q2, wrong = check_all()
    if scenario == "first":
        print("first observation: likelihood A=3/5, B=1/2")
        print("first weights:", w1, "conditional P(M=1):", q1)
        print("marginal P(M=1):", marginal_map(w1, q1))
    elif scenario == "two":
        print("second likelihood A=3/4, B=17/25")
        print("second weights:", w2, "conditional P(M=1):", q2)
        print("marginal P(M=1):", marginal_map(w2, q2))
        print("enumerated joint, evidence:", exact_joint(2))
    elif scenario == "collapse":
        print("correct second weights:", w2)
        print("WRONG if the conditional maps are replaced by marginal map:", wrong)
    else:
        raise ValueError("unknown scenario")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("first", "two", "collapse"),
                        default="first")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        check_all()
        print("PASS: normalization, conditional maps, enumeration,")
        print("      marginalization, evidence and variance decomposition")
    else:
        report(args.scenario)


if __name__ == "__main__":
    main()
