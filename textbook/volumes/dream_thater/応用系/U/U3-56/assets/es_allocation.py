"""U3-56: synthetic finite-state ES allocation, in 10k JPY.

Computes ES, the common optimal tail weights, standalone ES and allocation.
Use --plot to render a labelled bar chart; stdlib-only mode is the default.
"""
from __future__ import annotations

import argparse
from math import isclose

PROBABILITIES = (0.25, 0.25, 0.25, 0.25)
UNIT_LOSSES = ((-4.0, 2.0), (0.0, 5.0), (8.0, 1.0), (12.0, 4.0))
HOLDINGS = (2.0, 1.0)


def finite_es(losses, probabilities, alpha):
    """Return ES, optimal tail weights and left-quantile VaR."""
    if not 0.0 < alpha < 1.0:
        raise ValueError("0 < alpha < 1 is required")
    if len(losses) != len(probabilities) or not losses:
        raise ValueError("same nonempty number of losses and probabilities")
    if any(p <= 0.0 for p in probabilities):
        raise ValueError("scenario probabilities must be positive")
    if not isclose(sum(probabilities), 1.0, abs_tol=1e-12):
        raise ValueError("probabilities must sum to one")
    beta = 1.0 - alpha
    remaining = beta
    selected = [0.0] * len(losses)
    order = sorted(range(len(losses)), key=lambda i: losses[i], reverse=True)
    for i in order:
        mass = min(probabilities[i], remaining)
        selected[i] = mass / beta
        remaining = max(0.0, remaining - mass)
        if remaining <= 1e-12:
            break
    assert remaining <= 1e-12
    assert isclose(sum(selected), 1.0, abs_tol=1e-12)
    es = sum(a * x for a, x in zip(selected, losses))
    ascending = sorted(range(len(losses)), key=lambda i: losses[i])
    mass_below = 0.0
    var = None
    for i in ascending:
        mass_below += probabilities[i]
        if mass_below + 1e-12 >= alpha:
            var = losses[i]
            break
    assert var is not None
    return es, tuple(selected), var


def compute(alpha=0.50):
    losses = tuple(
        sum(w * x for w, x in zip(HOLDINGS, row)) for row in UNIT_LOSSES
    )
    es, tail, var = finite_es(losses, PROBABILITIES, alpha)
    marginal = tuple(
        sum(tail[s] * UNIT_LOSSES[s][i] for s in range(len(losses)))
        for i in range(len(HOLDINGS))
    )
    component = tuple(w * m for w, m in zip(HOLDINGS, marginal))
    standalone = tuple(
        finite_es(
            [w * row[i] for row in UNIT_LOSSES],
            PROBABILITIES, alpha,
        )[0]
        for i, w in enumerate(HOLDINGS)
    )
    assert isclose(sum(component), es, rel_tol=1e-12, abs_tol=1e-12)
    return losses, es, tail, var, marginal, component, standalone


def draw(component, es, alpha):
    import matplotlib.pyplot as plt

    fig, ax = plt.subplots(figsize=(7.0, 3.3))
    labels = ("A", "B")
    bars = ax.barh(labels, component, color=("tab:blue", "tab:orange"))
    for bar, pattern, value in zip(bars, ("//", "xx"), component):
        bar.set_hatch(pattern)
        ax.annotate(f"{value:.3f}", (value, bar.get_y() + bar.get_height() / 2),
                    xytext=(6 if value >= 0 else -6, 0),
                    textcoords="offset points",
                    ha="left" if value >= 0 else "right", va="center")
    ax.axvline(0, color="black", linewidth=0.8)
    ax.set_xlabel("ES contribution (10k JPY)")
    ax.set_title(f"ES alpha={alpha:.2f}, contributions total={es:.3f}")
    ax.set_xlim(min(0, *component) - 2, max(0, *component) + 6)
    fig.tight_layout()
    plt.show()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--alpha", type=float, default=0.50)
    parser.add_argument("--plot", action="store_true")
    args = parser.parse_args()
    losses, es, tail, var, marginal, component, standalone = compute(args.alpha)
    print("unit: 10k JPY; all scenarios synthetic, 1 trading day, under P")
    print("scenario    P       loss       normalized tail q")
    for i, (p, loss, q) in enumerate(zip(PROBABILITIES, losses, tail), start=1):
        print(f"{i:>5d}   {p:7.3f}   {loss:9.3f}   {q:10.6f}")
    print(f"VaR={var:.6f}; ES={es:.6f}; alpha={args.alpha:.2f}")
    for name, m, c, single in zip(("A", "B"), marginal, component, standalone):
        print(f"{name}: marginal={m:.6f}; component={c:.6f}; standalone ES={single:.6f}")
    print(f"sum components={sum(component):.6f}; sum standalone={sum(standalone):.6f}")
    print(f"reconciliation error={sum(component)-es:.12f}")
    if args.plot:
        draw(component, es, args.alpha)


if __name__ == "__main__":
    main()
