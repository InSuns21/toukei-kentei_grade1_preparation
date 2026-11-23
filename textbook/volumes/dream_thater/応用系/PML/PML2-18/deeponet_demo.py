"""PML2-18: exact two-/three-sensor branch/trunk Poisson examples.

Only the Python standard library is required.
"""
from fractions import Fraction as F


def source(a: F, b: F, c: F, t: F) -> F:
    return a + b * t + c * t * (1 - t)


def trunk(y: F) -> tuple[F, F, F]:
    # Solutions to -u'' = 1, t, t(1-t), with zero Dirichlet boundaries.
    return (y * (1 - y) / 2,
            (y - y**3) / 6,
            (y - 2 * y**3 + y**4) / 12)


def exact(a: F, b: F, c: F, y: F) -> F:
    q0, q1, q2 = trunk(y)
    return a * q0 + b * q1 + c * q2


def branch2(v0: F, v1: F, y: F) -> F:
    q0, q1, _ = trunk(y)
    return v0 * q0 + (v1 - v0) * q1


def branch3(v0: F, vh: F, v1: F, y: F) -> F:
    a = v0
    b = v1 - v0
    c = 4 * (vh - (v0 + v1) / 2)
    return exact(a, b, c, y)


def main() -> None:
    y = F(1, 2)
    examples = [
        ("1 + 2t", F(1), F(2), F(0)),
        ("t(1-t)", F(0), F(0), F(1)),
    ]
    print("input | exact | 2 sensors | 3 sensors")
    for name, a, b, c in examples:
        v0 = source(a, b, c, F(0))
        vh = source(a, b, c, F(1, 2))
        v1 = source(a, b, c, F(1))
        truth = exact(a, b, c, y)
        two = branch2(v0, v1, y)
        three = branch3(v0, vh, v1, y)
        assert three == truth
        print(f"{name} | {truth} | {two} | {three}")
    assert exact(F(1), F(2), F(0), y) == F(1, 4)
    assert branch2(F(0), F(0), y) == F(0)
    assert exact(F(0), F(0), F(1), y) == F(5, 192)
    assert branch3(F(0), F(1, 4), F(0), y) == F(5, 192)
    print("all exact-arithmetic checks passed")


if __name__ == "__main__":
    main()
