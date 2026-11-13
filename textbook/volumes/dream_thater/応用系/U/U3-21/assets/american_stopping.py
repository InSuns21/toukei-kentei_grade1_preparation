"""U3-21: American put/call in a CRR tree (yen; time in years)."""
from __future__ import annotations

import math


def crr_option(n: int, *, call: bool, american: bool,
               s0: float = 100.0, strike: float = 100.0,
               r: float = 0.05, q: float = 0.0,
               sigma: float = 0.20, maturity: float = 1.0):
    """Backward induction; exercise is allowed at times 0, dt, ..., T."""
    if n < 1 or sigma <= 0.0 or maturity <= 0.0:
        raise ValueError("Require n>=1, sigma>0 and maturity>0")
    dt = maturity / n
    up = math.exp(sigma * math.sqrt(dt))
    down = 1.0 / up
    p = (math.exp((r - q) * dt) - down) / (up - down)
    if not 0.0 < p < 1.0:
        raise ValueError("CRR no-arbitrage probability outside (0,1)")
    discount = math.exp(-r * dt)

    def payoff(stock: float) -> float:
        return max(stock - strike, 0.0) if call else max(strike - stock, 0.0)

    values = [payoff(s0 * up ** j * down ** (n - j))
              for j in range(n + 1)]
    first_step = []
    midpoint_boundary = None
    for i in range(n - 1, -1, -1):
        continuation = [
            discount * ((1.0 - p) * values[j] + p * values[j + 1])
            for j in range(i + 1)
        ]
        stocks = [s0 * up ** j * down ** (i - j) for j in range(i + 1)]
        exercise = [payoff(s) for s in stocks]
        if i == 1:
            first_step = [
                (stocks[j], exercise[j], continuation[j],
                 exercise[j] > continuation[j] + 1e-11)
                for j in range(i + 1)
            ]
        if i == n // 2:
            exercised = [
                stocks[j] for j in range(i + 1)
                if exercise[j] > 1e-11
                and exercise[j] > continuation[j] + 1e-11
            ]
            midpoint_boundary = max(exercised) if exercised else None
        values = [
            max(exercise[j], continuation[j]) if american else continuation[j]
            for j in range(i + 1)
        ]
    return values[0], first_step, midpoint_boundary


def main() -> None:
    s0, strike, r, q, sigma, maturity = 100.0, 100.0, 0.05, 0.0, 0.2, 1.0
    print("CRR: s0=K=100 yen, T=1 year, r=0.05, q=0, sigma=0.20")
    print("N | American put | European put | American call | European call | mid-boundary")
    for n in (2, 25, 100, 400):
        a_put, first_step, boundary = crr_option(n, call=False, american=True)
        e_put, _, _ = crr_option(n, call=False, american=False)
        a_call, _, _ = crr_option(n, call=True, american=True)
        e_call, _, _ = crr_option(n, call=True, american=False)
        assert a_put + 1e-10 >= e_put >= max(strike - s0, 0.0) - 1e-10
        assert abs(a_call - e_call) < 1e-9
        desc = "-" if boundary is None else f"{boundary:.6f}"
        print(f"{n:3d} | {a_put:12.6f} | {e_put:12.6f} | "
              f"{a_call:13.6f} | {e_call:13.6f} | {desc}")
        if n == 2:
            for stock, exercise, continuation, early in first_step:
                print(f"  t=0.5: stock={stock:.6f}, exercise={exercise:.6f}, "
                      f"continue={continuation:.6f}, strict-exercise={early}")
            assert first_step[0][3] and not first_step[1][3]
            assert abs(a_put - 5.737654377069708) < 1e-9
        if n == 100:
            assert abs(a_put - 6.082354409142444) < 1e-9


if __name__ == "__main__":
    main()
