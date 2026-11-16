"""U3-57: finite-scenario ES hedge optimization, standard library only."""
from argparse import ArgumentParser
from fractions import Fraction as F

BASE = (F(0), F(8), F(16), F(24))  # ten-thousand JPY, one-day loss
HEDGE = (F(0), F(0), F(4), F(-12))  # loss for one hedge unit
PROB = (F(1, 4),) * 4               # real-world probability P


def tail_es(losses, probabilities=PROB, alpha=F(1, 2)):
    """Exact discrete quantile-integral ES and one admissible tail weight vector."""
    if not F(0) < alpha < F(1):
        raise ValueError("alpha must lie in (0,1)")
    if len(losses) != len(probabilities) or not losses:
        raise ValueError("scenario sizes must agree and be nonempty")
    if any(p <= 0 for p in probabilities) or sum(probabilities) != 1:
        raise ValueError("probabilities must be positive and sum to one")
    remaining = 1 - alpha
    weights = [F(0)] * len(losses)
    for idx in sorted(range(len(losses)), key=lambda i: losses[i], reverse=True):
        take = min(probabilities[idx], remaining)
        weights[idx] = take / (1 - alpha)
        remaining -= take
        if remaining == 0:
            break
    return sum(w * v for w, v in zip(weights, losses)), tuple(weights)


def scenario_losses(x):
    return tuple(b + h * x for b, h in zip(BASE, HEDGE))


def objective(x, alpha=F(1, 2), cost=F(1)):
    if x < 0:
        raise ValueError("hedge quantity must be nonnegative")
    return tail_es(scenario_losses(x), alpha=alpha)[0] + cost * x


def candidates(cap):
    """Endpoints and all in-range intersections of affine scenario losses."""
    if cap < 0:
        raise ValueError("cap must be nonnegative")
    pts = {F(0), cap}
    for i in range(len(BASE)):
        for j in range(i + 1, len(BASE)):
            denom = HEDGE[i] - HEDGE[j]
            if denom:
                x = (BASE[j] - BASE[i]) / denom
                if 0 <= x <= cap:
                    pts.add(x)
    return sorted(pts)


def optimize(alpha=F(1, 2), cost=F(1), cap=F(2)):
    """Global optimum on [0,cap] by the finite piecewise-affine breakpoints."""
    if not F(0) < alpha < F(1) or cost < 0:
        raise ValueError("invalid alpha or transaction cost")
    grid = candidates(cap)
    return min(((objective(x, alpha, cost), x) for x in grid), key=lambda z: (z[0], z[1]))


def main():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--alpha", default="0.50", help="ES confidence level")
    parser.add_argument("--cost", default="1", help="cost per unit in ten-thousand JPY")
    parser.add_argument("--cap", default="2", help="maximum hedge units")
    args = parser.parse_args()
    alpha, cost, cap = F(args.alpha), F(args.cost), F(args.cap)
    best, x = optimize(alpha, cost, cap)
    losses = scenario_losses(x)
    es, q = tail_es(losses, alpha=alpha)
    print(f"alpha={float(alpha):.3f}, cost={float(cost):.3f}, cap={float(cap):.3f}")
    print("candidate quantities:", ", ".join(str(v) for v in candidates(cap)))
    print(f"optimal x={x} ({float(x):.6f} units)")
    print("losses (10,000 JPY):", ", ".join(str(z) for z in losses))
    print("tail weights:", ", ".join(str(z) for z in q))
    print(f"ES={float(es):.6f}, cost={float(cost*x):.6f}, total={float(best):.6f} (10,000 JPY)")
    print("baseline ES=", float(tail_es(BASE, alpha=alpha)[0]))


if __name__ == "__main__":
    main()
