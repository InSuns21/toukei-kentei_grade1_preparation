"""U2-21: finite SLAM joint posterior, exact Fraction arithmetic (stdlib only)."""
from argparse import ArgumentParser
from fractions import Fraction as F

PAIRS = ((0, 0), (0, 1), (1, 0), (1, 1))
MATCH = F(9, 10)
MISS = F(1, 10)


def posterior(pose_zero=F(1, 2), observations=1):
    """Conditionally independent sensor trials at the SAME (X, M)."""
    prior = {(x, m): ((pose_zero if x == 0 else 1 - pose_zero) * F(1, 2))
             for x, m in PAIRS}
    weights = {(x, m): p * ((MATCH if x == m else MISS) ** observations)
               for (x, m), p in prior.items()}
    evidence = sum(weights.values(), F(0))
    assert evidence > 0
    post = {key: weight / evidence for key, weight in weights.items()}
    assert sum(post.values(), F(0)) == 1
    return evidence, post


def statistics(post):
    px1 = sum((p for (x, m), p in post.items() if x == 1), F(0))
    pm1 = sum((p for (x, m), p in post.items() if m == 1), F(0))
    joint11 = post[(1, 1)]
    covariance = joint11 - px1 * pm1
    agreement = post[(0, 0)] + post[(1, 1)]
    prediction = agreement * MATCH + (1 - agreement) * MISS
    return px1, pm1, covariance, agreement, prediction


def self_test():
    evidence, p = posterior()
    assert evidence == F(1, 2)
    assert tuple(p[pair] for pair in PAIRS) == (F(9, 20), F(1, 20), F(1, 20), F(9, 20))
    assert statistics(p) == (F(1, 2), F(1, 2), F(1, 5), F(9, 10), F(41, 50))
    evidence, p = posterior(F(3, 4))
    assert evidence == F(1, 2)
    assert tuple(p[pair] for pair in PAIRS) == (F(27, 40), F(3, 40), F(1, 40), F(9, 40))
    assert statistics(p)[2] == F(3, 20)
    evidence, p = posterior(observations=2)
    assert evidence == F(41, 100)
    assert tuple(p[pair] for pair in PAIRS) == (F(81, 164), F(1, 164), F(1, 164), F(81, 164))
    assert statistics(p)[2] == F(10, 41)
    assert statistics(p)[4] == F(73, 82)
    assert (4 - 1) == ((4 - 2) - (1 - 2))
    h = ((1, -1), (-1, 1))
    assert tuple(sum(row[i] for i in range(2)) for row in h) == (0, 0)
    assert 2 * 1 - (-1) * (-1) == 1


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=("symmetric", "asymmetric", "two", "frame"), default="symmetric")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        print("all exact checks passed")
        return
    if args.scenario == "frame":
        print("observed distance: original", 4 - 1, "shifted", (4 - 2) - (1 - 2))
        print("H (unanchored): ((1,-1),(-1,1)); H*(1,1)=0")
        print("H (anchored): ((2,-1),(-1,1)); determinant=1")
        return
    e, p = posterior(F(3, 4) if args.scenario == "asymmetric" else F(1, 2),
                     2 if args.scenario == "two" else 1)
    print("evidence =", e)
    for pair in PAIRS:
        print("P(X={},M={}|z) = {}".format(*pair, p[pair]))
    print("P(X=1), P(M=1), Cov, P(match), P(next=1) =", statistics(p))


if __name__ == "__main__":
    main()
