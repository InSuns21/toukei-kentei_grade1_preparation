"""U2-06: deterministic planar pose and coordinate-frame verification.

Coordinates: metres; headings: radians, counter-clockwise positive.
A pose (x, y, theta) is T_AB: convert point coordinates from B to A.
No random input and no non-standard packages are needed.
"""
from __future__ import annotations

import argparse
import math

Pose = tuple[float, float, float]
Point = tuple[float, float]
EPS = 1e-10


def wrap(angle: float) -> float:
    """The unique representative in [-pi, pi), up to floating error."""
    return (angle + math.pi) % (2.0 * math.pi) - math.pi


def rotate(theta: float, p: Point) -> Point:
    c, s = math.cos(theta), math.sin(theta)
    return (c * p[0] - s * p[1], s * p[0] + c * p[1])


def transform(g_ab: Pose, p_b: Point) -> Point:
    x, y, theta = g_ab
    u, v = rotate(theta, p_b)
    return (x + u, y + v)


def inverse(g_ab: Pose) -> Pose:
    x, y, theta = g_ab
    u, v = rotate(-theta, (-x, -y))
    return (u, v, wrap(-theta))


def compose(g_ab: Pose, g_bc: Pose) -> Pose:
    x, y, a = g_ab
    u, v = rotate(a, (g_bc[0], g_bc[1]))
    return (x + u, y + v, wrap(a + g_bc[2]))


def relative(g_wa: Pose, g_wb: Pose) -> Pose:
    return compose(inverse(g_wa), g_wb)


def near(a: float, b: float) -> bool:
    return math.isclose(a, b, rel_tol=0, abs_tol=EPS)


def same_point(p: Point, q: Point) -> bool:
    return near(p[0], q[0]) and near(p[1], q[1])


def same_pose(a: Pose, b: Pose) -> bool:
    return same_point((a[0], a[1]), (b[0], b[1])) and near(
        wrap(a[2] - b[2]), 0.0)


def self_test() -> None:
    a = (2.0, 1.0, math.pi / 2.0)
    q = (3.0, 1.0)
    assert same_point(transform(a, q), (1.0, 4.0))
    assert same_point(transform(inverse(a), transform(a, q)), q)
    assert same_pose(compose(a, inverse(a)), (0.0, 0.0, 0.0))
    b = (2.0, 4.0, math.pi)
    ab = relative(a, b)
    assert same_pose(ab, (3.0, 0.0, math.pi / 2.0))
    assert same_pose(compose(a, ab), b)
    # Common change of world origin and axes leaves relative pose unchanged.
    s = (5.0, 1.0, math.pi / 2.0)
    assert same_pose(relative(a, b), relative(relative(s, a), relative(s, b)))
    wa = (1.0, 2.0, math.pi / 2.0)
    ab = (3.0, 0.0, math.pi / 2.0)
    bc = (1.0, 2.0, -math.pi / 2.0)
    ac = compose(ab, bc)
    wc = compose(wa, ac)
    assert same_pose(ac, (1.0, 1.0, 0.0))
    assert same_pose(wc, (0.0, 3.0, math.pi / 2.0))
    q_c = (2.0, -1.0)
    assert same_point(transform(wc, q_c), (1.0, 5.0))
    assert same_point(transform(wa, transform(ac, q_c)), (1.0, 5.0))
    assert near(math.degrees(wrap(math.radians(-358.0))), 2.0)
    assert near(wrap(-2.0 * math.pi), 0.0)
    assert near(wrap(math.pi), -math.pi)
    print("U2-06: 13 deterministic geometry/angle assertions passed")


def main() -> None:
    parser = argparse.ArgumentParser(description="U2-06 planar frames")
    parser.add_argument("--scenario", choices=("frames", "composition", "angles"),
                        default="frames")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    if args.self_test:
        self_test()
        return
    print("Units: metres and radians; CCW positive; T_AB maps B -> A")
    if args.scenario == "frames":
        a = (2.0, 1.0, math.pi / 2.0)
        b = (2.0, 4.0, math.pi)
        q = (3.0, 1.0)
        print(f"T_WA={a}, point_A={q}, point_W={transform(a, q)}")
        print(f"back_to_A={transform(inverse(a), transform(a, q))}")
        print(f"T_AB(relative)={relative(a, b)}")
        print(f"T_WB(recovered)={compose(a, relative(a, b))}")
    elif args.scenario == "composition":
        wa = (1.0, 2.0, math.pi / 2.0)
        ab = (3.0, 0.0, math.pi / 2.0)
        bc = (1.0, 2.0, -math.pi / 2.0)
        ac = compose(ab, bc)
        wc = compose(wa, ac)
        print(f"T_AC={ac}, T_WC={wc}")
        print(f"q_W={transform(wc, (2.0, -1.0))}")
        print(f"q_W(via A)={transform(wa, transform(ac, (2.0, -1.0)))}")
    else:
        predicted = math.radians(179.0)
        measured = math.radians(-179.0)
        print(f"raw residual degrees={math.degrees(measured - predicted):.8f}")
        print(f"wrapped residual degrees={math.degrees(wrap(measured - predicted)):.8f}")
        print(f"wrap(pi)={wrap(math.pi):.8f}; wrap(-2pi)={wrap(-2 * math.pi):.8f}")


if __name__ == "__main__":
    main()
