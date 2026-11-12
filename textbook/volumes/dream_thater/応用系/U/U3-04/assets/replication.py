"""Finite-tree self-financing replication (Python 3.10+, standard library only).

All monetary figures are yen. No floating point random simulation is involved.
Tuple histories have length up to N: time and memory cost O(N * 2**N).
"""
from itertools import product
from math import isclose


def stock_at(s0, u, d, history):
    """Stock price after the given tuple of U/D observations."""
    return s0 * u ** history.count("U") * d ** history.count("D")


def replicate(s0, u, d, R, N, payoff):
    """Return (values, holdings, max_rebalance_error, max_payoff_error).

    values[history]: value just after rebalancing at a node, terminal H at N.
    holdings[history]: (shares, bank_units, bank_yen) for t < N.
    payoff(history, terminal_stock): amount due in yen at maturity.
    """
    if N < 1 or s0 <= 0 or not (0 < d < R < u):
        raise ValueError("Require N>=1, s0>0 and 0<d<R<u.")
    q = (R - d) / (u - d)
    values = {}
    holdings = {}
    for h in product(("U", "D"), repeat=N):
        values[h] = float(payoff(h, stock_at(s0, u, d, h)))

    for t in range(N - 1, -1, -1):
        for h in product(("U", "D"), repeat=t):
            up, down = values[h + ("U",)], values[h + ("D",)]
            s = stock_at(s0, u, d, h)
            value = (q * up + (1 - q) * down) / R
            delta = (up - down) / (s * (u - d))
            bank_yen = value - delta * s
            bank_units = bank_yen / R ** t
            values[h] = value
            holdings[h] = (delta, bank_units, bank_yen)

    max_rebalance = 0.0
    max_payoff = 0.0
    for t in range(N):
        for h in product(("U", "D"), repeat=t):
            delta, bank_units, _ = holdings[h]
            for step in ("U", "D"):
                child = h + (step,)
                s_next = stock_at(s0, u, d, child)
                b_next = R ** (t + 1)
                grown = delta * s_next + bank_units * b_next
                max_payoff = max(max_payoff, abs(grown - values[child]))
                if t + 1 < N:
                    new_delta, new_bank_units, _ = holdings[child]
                    flow = (new_delta - delta) * s_next + (
                        new_bank_units - bank_units
                    ) * b_next
                    max_rebalance = max(max_rebalance, abs(flow))
    return values, holdings, max_rebalance, max_payoff


def check_trinomial_unattainable():
    """Try to match upper/middle payouts; return lower payout discrepancy."""
    delta = (1.0 - 0.0) / (120.0 - 100.0)
    bank_yen = 0.0 - delta * 100.0
    return 80.0 * delta + bank_yen - 1.0


def main():
    s0, u, d, R, N = 100.0, 1.2, 0.9, 1.05, 2
    values, holdings, rebalance, terminal = replicate(
        s0, u, d, R, N, lambda h, s: max(s - 100.0, 0.0)
    )
    print(f"initial price (yen): {values[()]:.12f}")
    print("node | shares | bank-yen | bank-units")
    for h in ((), ("U",), ("D",)):
        delta, bank_units, bank_yen = holdings[h]
        print(f"{''.join(h) or 'root':4s} | {delta: .9f} | "
              f"{bank_yen: .9f} | {bank_units: .9f}")
    print(f"max rebalance funding residual (yen): {rebalance:.3e}")
    print(f"max terminal replication residual (yen): {terminal:.3e}")
    assert isclose(values[()], 2000.0 / 147.0, abs_tol=1e-10)
    assert rebalance < 1e-10 and terminal < 1e-10
    assert isclose(check_trinomial_unattainable(), -2.0)


if __name__ == "__main__":
    main()
