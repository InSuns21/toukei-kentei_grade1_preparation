import subprocess

result = subprocess.run(
    ["lake", "env", "lean", "--run", "Export.lean"],
    check=True, capture_output=True, text=True,
)
rows = [line.split(",") for line in result.stdout.splitlines()]
assert len(rows) == 81
seen = set()
counterexamples = []
for raw_n, raw_k, actual, wrong in rows:
    n, k = int(raw_n), int(raw_k)
    assert 0 <= n < 9 and 0 <= k < 9 and (n, k) not in seen
    seen.add((n, k))
    expected = "true" if n == k else "false"
    assert actual == expected
    if wrong != expected:
        counterexamples.append((n, k))
assert len(counterexamples) == 72 and (2, 3) in counterexamples
print("81 comparisons OK; 72 wrongMatches counterexamples")
