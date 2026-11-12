#!/usr/bin/env python3
"""Exact binomial barrier option: enumeration versus augmented-state recursion.

All cash flows are yen paid at maturity. R=21/20 is a *per-step* gross
risk-free factor, and B=120 is touched inclusively at observed dates.
No stochastic path is specified between binomial dates.
"""
from fractions import Fraction as F
from functools import lru_cache
from itertools import product

S0 = F(100)
U = F(6, 5)
D = F(4, 5)
R = F(21, 20)
K = F(90)
B = F(120)
Q = (R - D) / (U - D)
assert 0 < D < R < U and Q == F(5, 8)


def valid_observations(n: int, observations: tuple[int, ...]) -> frozenset[int]:
    if n < 1 or not observations or any(t < 0 or t > n for t in observations):
        raise ValueError("Use n >= 1 and nonempty observation dates in 0..n")
    return frozenset(observations)


def terminal_payoff(stock: F, hit: bool, kind: str) -> F:
    plain = max(F(0), stock - K)
    if kind == "vanilla":
        return plain
    if kind == "in":
        return plain if hit else F(0)
    if kind == "out":
        return F(0) if hit else plain
    raise ValueError("kind must be vanilla, in, or out")


def enumerate_price(n: int, observations: tuple[int, ...], kind: str) -> F:
    """Independent ordered-path enumeration, O(n*2**n) time."""
    obs = valid_observations(n, observations)
    total = F(0)
    for moves in product("UD", repeat=n):
        stock = S0
        hit = 0 in obs and stock >= B
        prob = F(1)
        for t, move in enumerate(moves, start=1):
            if move == "U":
                stock *= U
                prob *= Q
            else:
                stock *= D
                prob *= (1 - Q)
            if t in obs and stock >= B:
                hit = True
        total += prob * terminal_payoff(stock, hit, kind)
    return total / R**n


def backward_values(n: int, observations: tuple[int, ...], kind: str):
    """Return V(t,s,hit), initial hit; caching collapses identical states."""
    obs = valid_observations(n, observations)
    initial_hit = 0 in obs and S0 >= B

    @lru_cache(maxsize=None)
    def value(t: int, stock: F, hit: bool) -> F:
        if t == n:
            return terminal_payoff(stock, hit, kind)
        upper_stock, lower_stock = stock * U, stock * D
        upper_hit = hit or (t + 1 in obs and upper_stock >= B)
        lower_hit = hit or (t + 1 in obs and lower_stock >= B)
        upper = value(t + 1, upper_stock, upper_hit)
        lower = value(t + 1, lower_stock, lower_hit)
        return (Q * upper + (1 - Q) * lower) / R

    return value, initial_hit


def backward_price(n: int, observations: tuple[int, ...], kind: str) -> F:
    value, hit0 = backward_values(n, observations, kind)
    return value(0, S0, hit0)


def state_for(moves: str, observations: tuple[int, ...]) -> tuple[F, bool]:
    stock = S0
    hit = 0 in observations and stock >= B
    for t, move in enumerate(moves, start=1):
        if move not in "UD":
            raise ValueError("Only U/D moves are allowed")
        stock *= U if move == "U" else D
        hit = hit or (t in observations and stock >= B)
    return stock, hit


def main() -> None:
    cases = (
        (2, (0, 1, 2), {"in": F(1000, 49), "out": F(125, 98),
                         "vanilla": F(2125, 98)}),
        (2, (0, 2), {"in": F(1875, 98), "out": F(125, 49),
                     "vanilla": F(2125, 98)}),
    )
    for n, monitor, expected in cases:
        for kind, exact in expected.items():
            listed = enumerate_price(n, monitor, kind)
            dynamic = backward_price(n, monitor, kind)
            assert listed == dynamic == exact, (n, monitor, kind, listed, dynamic)
            print(f"N={n} monitor={monitor} {kind}: {exact} yen = {float(exact):.9f}")
    value, _ = backward_values(3, (0, 1, 2, 3), "out")
    ud, du = state_for("UD", (0, 1, 2, 3)), state_for("DU", (0, 1, 2, 3))
    assert ud == (F(96), True) and du == (F(96), False)
    assert value(2, *ud) == 0 and value(2, *du) == 15
    for kind in ("vanilla", "in", "out"):
        assert enumerate_price(3, (0, 1, 2, 3), kind) == backward_price(
            3, (0, 1, 2, 3), kind)
    print("N=3, stock=96: UD hit=1, OUT=0; DU hit=0, OUT=15 yen")
    print("All independent exact-arithmetic checks passed.")


if __name__ == "__main__":
    main()
