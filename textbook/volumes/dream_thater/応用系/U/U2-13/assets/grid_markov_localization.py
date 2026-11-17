"""U2-13 finite grid Markov localization. No randomness; units are 1 m per cell."""
import argparse
from math import isclose


N = 5
MOTION = (
    (0.75, 0.25, 0.0, 0.0, 0.0),
    (0.25, 0.5, 0.25, 0.0, 0.0),
    (0.0, 0.25, 0.5, 0.25, 0.0),
    (0.0, 0.0, 0.25, 0.5, 0.25),
    (0.0, 0.0, 0.0, 0.25, 0.75),
)
SYMMETRIC_SENSOR = (0.2, 0.8, 0.2, 0.8, 0.2)
ASYMMETRIC_SENSOR = (0.2, 0.8, 0.2, 0.2, 0.2)


def predict(belief, transition=MOTION):
    """Rows depart, columns arrive. The belief is interpreted as a column."""
    n = len(belief)
    if len(transition) != n or any(len(row) != n for row in transition):
        raise ValueError("dimension mismatch")
    return tuple(sum(belief[i] * transition[i][j] for i in range(n))
                 for j in range(n))


def update(prior, likelihood):
    if len(prior) != len(likelihood):
        raise ValueError("dimension mismatch")
    weights = tuple(prior[i] * likelihood[i] for i in range(len(prior)))
    evidence = sum(weights)
    if evidence <= 0:
        raise ValueError("zero evidence: posterior is undefined")
    return tuple(w / evidence for w in weights), evidence


def moments(belief):
    mean = sum((i + 1) * p for i, p in enumerate(belief))
    var = sum(((i + 1) - mean) ** 2 * p for i, p in enumerate(belief))
    return mean, var


def local_modes(belief):
    """Strict local peaks with comparisons only to existing neighbors."""
    return tuple(i + 1 for i, p in enumerate(belief)
                 if (i == 0 or p > belief[i - 1])
                 and (i == len(belief) - 1 or p > belief[i + 1]))


def close_vec(actual, expected, tol=1e-12):
    return len(actual) == len(expected) and all(
        isclose(a, b, abs_tol=tol, rel_tol=tol)
        for a, b in zip(actual, expected)
    )


def self_test():
    assert all(close_vec((sum(row),), (1.0,)) for row in MOTION)
    assert all(isclose(sum(row[j] for row in MOTION), 1) for j in range(N))
    start = (0.2,) * N
    assert close_vec(predict(start), start)
    posterior, evidence = update(predict(start), SYMMETRIC_SENSOR)
    assert isclose(evidence, 11 / 25)
    assert close_vec(posterior, (1/11, 4/11, 1/11, 4/11, 1/11))
    assert local_modes(posterior) == (2, 4)
    mu, variance = moments(posterior)
    assert isclose(mu, 3) and isclose(variance, 16 / 11)
    second_prediction = predict(posterior)
    assert close_vec(second_prediction, (7/44, 10/44, 10/44, 10/44, 7/44))
    second, evidence2 = update(second_prediction, SYMMETRIC_SENSOR)
    assert isclose(evidence2, 26/55)
    assert close_vec(second, (7/104, 40/104, 10/104, 40/104, 7/104))
    asym, _ = update(start, ASYMMETRIC_SENSOR)
    assert close_vec(asym, (1/8, 4/8, 1/8, 1/8, 1/8))
    assert local_modes(asym) == (2,)
    try:
        update((1.0, 0.0), (0.0, 1.0))
    except ValueError as exc:
        assert "zero evidence" in str(exc)
    else:
        raise AssertionError("zero evidence must fail")
    print("self-test: all deterministic consistency checks passed")


def show(label, belief, evidence=None):
    print(label)
    if evidence is not None:
        print(f"observation evidence: {evidence:.12f}")
    print("cell(m)  probability     histogram (scaled to max)")
    scale = max(belief)
    for i, p in enumerate(belief):
        print(f"{i+1:>5}    {p:11.7f}     {'#' * round(32*p/scale)}")
    mean, var = moments(belief)
    print(f"mean={mean:.8f} m  variance={var:.8f} m^2  "
          f"strict local modes={local_modes(belief)}")
    print()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("symmetric", "asymmetric", "no-motion"),
                        default="symmetric")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    prior = (0.2,) * N
    if args.scenario == "no-motion":
        transition = tuple(tuple(float(i == j) for j in range(N))
                           for i in range(N))
        predicted = predict(prior, transition)
        sensor = SYMMETRIC_SENSOR
    else:
        predicted = predict(prior)
        sensor = SYMMETRIC_SENSOR if args.scenario == "symmetric" else ASYMMETRIC_SENSOR
    show("initial prediction", predicted)
    posterior, evidence = update(predicted, sensor)
    show("first posterior", posterior, evidence)
    if args.scenario == "symmetric":
        predicted2 = predict(posterior)
        show("second prediction", predicted2)
        posterior2, evidence2 = update(predicted2, sensor)
        show("second posterior", posterior2, evidence2)


if __name__ == "__main__":
    main()
