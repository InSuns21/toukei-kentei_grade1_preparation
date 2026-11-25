"""Finite audit of detection sets. No random estimation."""
from fractions import Fraction

D = (0, 1, 2, 3)
weights = dict(zip(D, map(Fraction, ("0.49", "0.49", "0.01", "0.01"))))
assert sum(weights.values()) == 1

def requirement(k):
    return 2 - k if 0 < k <= 2 else None

def product(k):
    if k == 1:
        return 2
    if k == 2:
        return None
    return requirement(k)

def success(value):
    return value is not None

def detection(reference, implementation, observe):
    return [k for k in D if observe(reference(k)) != observe(implementation(k))]

def mass(points, distribution):
    return sum((distribution[k] for k in points), Fraction(0))

bits = detection(requirement, product, success)
full = detection(requirement, product, lambda x: x)
assert bits == [2] and full == [1, 2]
p_bits, p_full = mass(bits, weights), mass(full, weights)
assert p_bits == Fraction(1, 100) and p_full == Fraction(1, 2)
print(f"success-only: E={bits}, mass={p_bits}, miss100={float((1-p_bits)**100):.6f}")
print(f"full: E={full}, mass={p_full}, miss100={float((1-p_full)**100):.6e}")

def shared_bug(k):
    return None if k == 2 else requirement(k)

assert detection(shared_bug, shared_bug, lambda x: x) == []
assert detection(requirement, shared_bug, lambda x: x) == [2]
contaminated = lambda k: product(k)
assert detection(contaminated, product, lambda x: x) == []
excluded = dict(zip(D, map(Fraction, ("0.4", "0.5", "0", "0.1"))))
assert sum(excluded.values()) == 1
assert mass(bits, excluded) == 0 and (1-mass(bits, excluded))**100 == 1
assert mass(full, excluded) == Fraction(1, 2)
print("shared bug / contaminated oracle / excluded boundary: checked")
