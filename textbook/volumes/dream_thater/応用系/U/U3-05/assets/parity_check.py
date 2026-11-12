"""Exact rational checks for U3-05 (Python >=3.10, standard library only)."""
from fractions import Fraction as F


def price(payoffs: list[int], weights: list[F], growth: F, periods: int) -> F:
    assert len(payoffs) == len(weights)
    assert sum(weights) == F(1)
    return sum((w * h for w, h in zip(weights, payoffs)), F(0)) / growth**periods


def main() -> None:
    s0, r = F(100), F(21, 20)
    # Non-dividend one-period example, K=100.
    stock1 = [120, 90]
    weights1 = [F(1, 2), F(1, 2)]
    c1 = price([max(s - 100, 0) for s in stock1], weights1, r, 1)
    p1 = price([max(100 - s, 0) for s in stock1], weights1, r, 1)
    assert c1 == F(200, 21) and p1 == F(100, 21)
    assert c1 - p1 == s0 - F(100) / r

    # Non-dividend two-period example, K=100 and K=110.
    stock2 = [144, 108, 108, 81]
    weights2 = [F(1, 4)] * 4
    for strike, expected_c, expected_p in (
        (100, F(6000, 441), F(1900, 441)),
        (110, F(3400, 441), F(3300, 441)),
    ):
        c = price([max(s - strike, 0) for s in stock2], weights2, r, 2)
        p = price([max(strike - s, 0) for s in stock2], weights2, r, 2)
        assert (c, p) == (expected_c, expected_p)
        assert c - p == s0 - F(strike) / r**2
        assert all(
            max(s - strike, 0) - max(strike - s, 0) == s - strike
            for s in stock2
        )

    # Known cash dividend 5 at t=1, ex-dividend stock price 120 or 90.
    dividend = F(5)
    q_div = (r * s0 - dividend - F(90)) / F(120 - 90)
    assert q_div == F(1, 3) and q_div != F(1, 2)
    weights_div = [q_div, F(1) - q_div]
    assert price([s + dividend for s in stock1], weights_div, r, 1) == s0
    c_div = price([20, 0], weights_div, r, 1)
    p_div = price([0, 10], weights_div, r, 1)
    assert c_div == p_div == F(400, 63)
    assert c_div - p_div == s0 - dividend / r - F(100) / r

    # Dividend dates 1 and 2, strike 100; check forward/parity algebra.
    d1, d2 = F(3), F(2)
    fair_delivery = r**2 * s0 - d1 * r - d2
    assert fair_delivery == F(1051, 10)
    diff = s0 - d1 / r - d2 / r**2 - F(100) / r**2
    assert diff == F(2040, 441)
    assert diff == (fair_delivery - 100) / r**2
    print("1-period no dividend:", c1, p1, c1 - p1)
    print("2-period K=100:", F(6000, 441), F(1900, 441))
    print("2-period K=110:", F(3400, 441), F(3300, 441))
    print("dividend q / call / put:", q_div, c_div, p_div)
    print("two dividends: fair delivery / parity:", fair_delivery, diff)
    print("ALL EXACT CHECKS PASSED")


if __name__ == "__main__":
    main()
