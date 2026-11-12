"""Exact two-method check for the discrete fixed-strike maximum Lookback call.

Run: python3 assets/lookback_tree_check.py
Only Python's standard library is required. All quantities are in yen.
"""
from fractions import Fraction
from itertools import product

S0 = Fraction(100)
U = Fraction(5, 4)
D = Fraction(4, 5)
R = Fraction(21, 20)
Q = (R - D) / (U - D)
K = Fraction(110)

assert U * D == 1
assert D < R < U


def enumerate_price(n: int, strike: Fraction = K) -> Fraction:
    """Directly enumerate all 2**n paths and compute their running maxima."""
    if n < 0:
        raise ValueError("n must be nonnegative")
    total = Fraction(0)
    for path in product(("U", "D"), repeat=n):
        stock = S0
        highest = stock
        probability = Fraction(1)
        for step in path:
            if step == "U":
                stock *= U
                probability *= Q
            else:
                stock *= D
                probability *= 1 - Q
            highest = max(highest, stock)
        total += probability * max(highest - strike, Fraction(0))
    return total / R**n


def compressed_tree(n: int, strike: Fraction = K):
    """Reachability followed by backward pricing on integer states (Z,H).

    States are generated forward; the values are then evaluated backward.
    Returns the time-0 value, the exact per-layer state counts and the
    dictionary of all value maps (for the conditional-value test).
    """
    if n < 0:
        raise ValueError("n must be nonnegative")
    layers = [{(0, 0)}]
    for _ in range(n):
        next_layer = set()
        for z, h in layers[-1]:
            next_layer.add((z + 1, max(h, z + 1)))
            next_layer.add((z - 1, h))
        layers.append(next_layer)

    values = [{} for _ in range(n + 1)]
    for z, h in layers[n]:
        values[n][z, h] = max(S0 * U**h - strike, Fraction(0))
    for t in range(n - 1, -1, -1):
        for z, h in layers[t]:
            up = (z + 1, max(h, z + 1))
            down = (z - 1, h)
            values[t][z, h] = (
                Q * values[t + 1][up] + (1 - Q) * values[t + 1][down]
            ) / R
    return values[0][0, 0], [len(states) for states in layers], values


def main():
    print(f"model: S0={S0}, u={U}, d={D}, R={R}, q={Q}, K={K}")
    for n in (2, 3, 4, 5):
        direct = enumerate_price(n)
        compact, counts, _ = compressed_tree(n)
        assert direct == compact, (n, direct, compact)
        print(
            f"N={n}: enumerate={direct}, compressed={compact}, "
            f"decimal={float(compact):.8f}, paths={2**n}, "
            f"states/layer={counts}, states-total={sum(counts)}"
        )
    _, _, values = compressed_tree(3)
    ud = values[2][(0, 1)]
    du = values[2][(0, 0)]
    assert (ud, du) == (Fraction(100, 7), Fraction(500, 63))
    print(f"N=3 conditional UD={ud}, DU={du}, difference={ud-du}")
    assert enumerate_price(2) == Fraction(582500, 35721)
    assert enumerate_price(3) == Fraction(155912500, 6751269)
    print("ALL EXACT CHECKS PASS")


if __name__ == "__main__":
    main()
