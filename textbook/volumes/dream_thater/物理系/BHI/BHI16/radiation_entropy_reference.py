#!/usr/bin/env python3
"""BHI I: reproducible finite-state entropies, Page-capacity proxy, and AMPS bound.

Independent Hawking Bell pairs and the Page *capacity proxy* are incompatible
models in late steps; do not interpret the minimum curve as a solved evaporation
dynamics. Natural logarithms measure entropies in nat; no random samples used.
"""
from __future__ import annotations

import argparse
import itertools
import math

LN2 = math.log(2.0)


def binary_entropy(p: float) -> float:
    """Von Neumann entropy of diag(1-p,p), including p=0,1."""
    if not 0.0 <= p <= 1.0:
        raise ValueError("p must lie in [0,1]")
    return -sum(x * math.log(x) for x in (1 - p, p) if x > 0)


def radiation_eigenvalues(k: int, p: float) -> list[float]:
    """Eigenvalues of k independent reduced Hawking pairs in the bit basis."""
    if not 0 <= k <= 12:
        raise ValueError("k must be an integer in [0,12]")
    binary_entropy(p)  # validates p
    return [
        math.prod((1.0 - p) if bit == 0 else p for bit in bits)
        for bits in itertools.product((0, 1), repeat=k)
    ]


def fine_entropy(eigenvalues: list[float]) -> float:
    return -sum(x * math.log(x) for x in eigenvalues if x > 0.0)


def rows(total_steps: int, p: float):
    """Each row compares separate assumptions; all entropy columns use nat."""
    if not 1 <= total_steps <= 12:
        raise ValueError("total_steps must be in [1,12]")
    for k in range(total_steps + 1):
        lam = radiation_eigenvalues(k, p)
        s_hawking = fine_entropy(lam)
        s_analytic = k * binary_entropy(p)
        s_capacity = (total_steps - k) * LN2
        page_proxy = min(s_analytic, s_capacity)
        yield (k, sum(lam), s_hawking, s_analytic, s_capacity, page_proxy)


def check() -> None:
    for p in (0.0, 0.125, 0.5, 0.75, 1.0):
        for k in range(7):
            lam = radiation_eigenvalues(k, p)
            assert len(lam) == 2**k
            assert all(x >= 0 for x in lam)
            assert math.isclose(sum(lam), 1.0, abs_tol=1e-12)
            assert math.isclose(fine_entropy(lam), k * binary_entropy(p), abs_tol=1e-12)
    # BHI16-C01: all four emissions obey the entropy-smallness assumptions,
    # while a pure remainder with dimension eight cannot purify that much.
    error_in = error_pair = 0.1 * LN2
    lower = 4 * (LN2 - error_in - error_pair)
    upper = math.log(8)
    assert math.isclose(lower / LN2, 3.2, abs_tol=1e-12)
    assert lower > upper
    # BHI13 recovery threshold (sufficient, not an efficient decoding circuit):
    a, eps, eta, d = 8, 0.25, 0.5, 64
    assert d >= a / (eps * math.sqrt(eta))
    print("PASS: trace, pair entropy, capacity, AMPS and recovery threshold")


def plot(entries: list[tuple], output: str) -> None:
    try:
        import matplotlib.pyplot as plt
    except ImportError as exc:
        raise SystemExit("Install matplotlib to use --plot") from exc
    ks = [e[0] for e in entries]
    fig, ax = plt.subplots(figsize=(7.3, 4.3))
    ax.plot(ks, [e[2] for e in entries], "o-", label="Independent pairs: S(R_k)")
    ax.plot(ks, [e[4] for e in entries], "s--", label="Pure RB: ln dim(B)")
    ax.plot(ks, [e[5] for e in entries], "d:", label="Page capacity proxy")
    ax.set(xlabel="Emission step k", ylabel="Entropy (nat)")
    ax.legend()
    fig.tight_layout()
    fig.savefig(output, dpi=140)
    plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--steps", type=int, default=6)
    parser.add_argument("--p", type=float, default=0.5)
    parser.add_argument("--plot", metavar="PNG_PATH", help="create a numerical comparison chart")
    parser.add_argument("--check", action="store_true", help="recompute deterministic invariants")
    args = parser.parse_args()
    if args.check:
        check()
    entries = list(rows(args.steps, args.p))
    print("k,trace,S_hawking,S_analytic,ln_dim_B,Page_capacity_proxy")
    for r in entries:
        print(",".join((str(r[0]), *(f"{x:.10f}" for x in r[1:]))))
    print("Page_capacity_proxy is a dimension-bound comparison, NOT a QES solution.")
    if args.plot:
        plot(entries, args.plot)
        print(f"wrote {args.plot}")


if __name__ == "__main__":
    main()
