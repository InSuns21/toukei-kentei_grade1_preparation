#!/usr/bin/env python3
"""Exact arithmetic Asian call checks by independent enumeration and recursion.

All prices are in yen. Each period uses R=21/20, and observations include t=0.
No external libraries or stochastic simulation are needed.
"""
from fractions import Fraction as F
from functools import lru_cache
from itertools import product

S0 = F(100)
U = F(6, 5)
D = F(4, 5)
R = F(21, 20)
K = F(100)
Q = (R - D) / (U - D)
assert Q == F(5, 8) and D < R < U


def enumerate_price(n: int) -> F:
    """Sum over 2**n ordered paths; no recombination or dynamic programming."""
    total = F(0)
    for moves in product("UD", repeat=n):
        stock = S0
        cumulative = S0
        probability = F(1)
        for move in moves:
            if move == "U":
                stock *= U
                probability *= Q
            else:
                stock *= D
                probability *= 1 - Q
            cumulative += stock
        payoff = max(F(0), cumulative / (n + 1) - K)
        total += probability * payoff
    return total / R**n


def backward_values(n: int):
    """Conditional recursion on (time, stock, cumulative stock)."""
    @lru_cache(maxsize=None)
    def value(t: int, stock: F, cumulative: F) -> F:
        if t == n:
            return max(F(0), cumulative / (n + 1) - K)
        upper_stock = stock * U
        lower_stock = stock * D
        upper = value(t + 1, upper_stock, cumulative + upper_stock)
        lower = value(t + 1, lower_stock, cumulative + lower_stock)
        return (Q * upper + (1 - Q) * lower) / R

    return value


def state_for(moves: str) -> tuple[F, F]:
    stock = S0
    cumulative = S0
    for move in moves:
        stock *= U if move == "U" else D
        cumulative += stock
    return stock, cumulative


def main() -> None:
    expected = {2: F(11500, 1323), 3: F(29375, 2744)}
    for n, benchmark in expected.items():
        enumeration = enumerate_price(n)
        dynamic = backward_values(n)(0, S0, S0)
        assert enumeration == dynamic == benchmark, (n, enumeration, dynamic)
        print(f"N={n}: enumeration={enumeration}, backward={dynamic}, "
              f"decimal={float(dynamic):.9f}")

    n3 = backward_values(3)
    ud_stock, ud_sum = state_for("UD")
    du_stock, du_sum = state_for("DU")
    assert ud_stock == du_stock == 96
    assert (ud_sum, du_sum) == (316, 276)
    assert n3(2, ud_stock, ud_sum) == F(65, 14)
    assert n3(2, du_stock, du_sum) == 0
    assert n3(2, *state_for("UU")) == F(192, 7)
    assert n3(1, *state_for("U")) == F(3525, 196)
    print("N=3, S2=96: UD=65/14, DU=0 (same stock, different values)")
    print("All exact-arithmetic checks passed.")


if __name__ == "__main__":
    main()
