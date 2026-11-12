"""Exact finite-binomial Bermudan option experiment (Python >= 3.10).

No third-party packages. S0, K and dividends are in yen; R is the gross
return for ONE step, not an annualized rate. q is a pricing probability.
The exhaustive oracle enumerates only nodewise, non-anticipative policies.
"""
from fractions import Fraction as F
from itertools import product


def payoff(s: F, strike: F, option: str) -> F:
    if option == "put":
        return max(strike - s, F(0))
    if option == "call":
        return max(s - strike, F(0))
    raise ValueError("option must be put or call")


def price(s0: F, u: F, d: F, r: F, k: F, n: int,
          allowed: frozenset[int], option: str = "put") -> F:
    """Independent backward induction (recombining tree)."""
    if not (s0 > 0 and k >= 0 and 0 < d < r < u
            and n >= 1 and n in allowed
            and all(isinstance(t, int) and 0 <= t <= n for t in allowed)):
        raise ValueError("invalid parameters or exercise schedule")
    q = (r - d) / (u - d)
    values = [payoff(s0 * u**j * d**(n-j), k, option)
              for j in range(n+1)]
    for t in range(n-1, -1, -1):
        next_values = []
        for j in range(t+1):
            c = (q * values[j+1] + (1-q) * values[j]) / r
            s = s0 * u**j * d**(t-j)
            h = payoff(s, k, option)
            next_values.append(max(h, c) if t in allowed else c)
        values = next_values
    return values[0]


def exhaustive(s0: F, u: F, d: F, r: F, k: F, n: int,
               allowed: frozenset[int], option: str = "put") -> F:
    """Brute-force all admissible stop/continue policies by observed history.

    Intended for n<=3. Decisions depend on history available at t, never on
    the remainder of the path. This implementation does not use backward
    induction and is therefore a separate small-instance oracle.
    """
    if not (1 <= n <= 3 and n in allowed):
        raise ValueError("exhaustive oracle requires 1<=N<=3 and N allowed")
    q = (r-d)/(u-d)
    paths = list(product((0, 1), repeat=n))
    decisions = [(t, prefix) for t in sorted(allowed) if t < n
                 for prefix in product((0, 1), repeat=t)]
    best = None
    for choices in product((False, True), repeat=len(decisions)):
        policy = dict(zip(decisions, choices))
        expected = F(0)
        for path in paths:
            tau = next(t for t in range(n+1)
                       if t == n or
                       (t in allowed and policy[(t, path[:t])]))
            stock = s0
            for x in path[:tau]:
                stock *= u if x == 1 else d
            payment = payoff(stock, k, option)
            probability = q**sum(path) * (1-q)**(n-sum(path))
            expected += probability * payment / r**tau
        if best is None or expected > best:
            best = expected
    return best


def dividend_one_step(s0: F, r: F, dividend: F, up_ex: F,
                      down_ex: F, k: F) -> tuple[F, F, F]:
    """Return (pricing probability, European call, American call)."""
    if not (0 < down_ex < up_ex and dividend >= 0 and
            down_ex+dividend < r*s0 < up_ex+dividend):
        raise ValueError("the two total-return states must straddle RS0")
    q = (r*s0 - (down_ex+dividend))/(up_ex-down_ex)
    european = (q*payoff(up_ex, k, "call") +
                (1-q)*payoff(down_ex, k, "call"))/r
    american = max(payoff(s0, k, "call"), european)
    return q, european, american


def main() -> None:
    s0, u, d, r, k, n = F(100), F(6, 5), F(4, 5), F(21, 20), F(100), 2
    for allowed, target in (
        (frozenset({2}), F(925, 147)),
        (frozenset({1, 2}), F(1175, 147)),
        (frozenset({0, 1, 2}), F(1175, 147)),
    ):
        via_tree = price(s0, u, d, r, k, n, allowed)
        via_policies = exhaustive(s0, u, d, r, k, n, allowed)
        assert via_tree == via_policies == target
        print(f"put allowed={sorted(allowed)}, tree={via_tree}, brute={via_policies}")
    call = price(s0, u, d, r, k, n, frozenset({0, 1, 2}), "call")
    call_eu = exhaustive(s0, u, d, r, k, n, frozenset({2}), "call")
    assert call == call_eu == F(6875, 441)
    print(f"non-dividend call: American=European={call}")
    q, european, american = dividend_one_step(
        F(100), F(21, 20), F(15), F(105), F(65), F(90))
    assert (q, european, american) == (F(5, 8), F(125, 14), F(10))
    print(f"dividend call: q={q}, European={european}, American={american}")
    assert price(F(100), u, d, r, F(140), 1, frozenset({1})) == F(100, 3)
    assert price(F(100), u, d, r, F(140), 1, frozenset({0, 1})) == F(40)
    print("All exact-arithmetic cross-checks passed.")


if __name__ == "__main__":
    main()
