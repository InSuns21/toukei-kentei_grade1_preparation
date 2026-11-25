"""Independent finite-domain differential check; no Lean logic copied."""
import subprocess

def expected(s, k):
    if k == 0:
        return "-"
    for remaining in range(s + 1):
        if remaining + k == s:
            return str(remaining)
    return "-"

def main():
    result = subprocess.run(["lake", "env", "lean", "--run", "Export.lean"],
                            check=True, capture_output=True, text=True)
    seen = set()
    strict_bad = rest_bad = coarse_bad = 0
    for line in result.stdout.splitlines():
        s, k, ref, candidate, strict, rest = line.split(",")
        s, k = int(s), int(k)
        assert 0 <= s <= 3 and 0 <= k <= 3 and (s, k) not in seen
        seen.add((s, k))
        assert ref == candidate == expected(s, k), (s, k, ref, candidate)
        strict_bad += ref != strict
        rest_bad += ref != rest
        coarse_bad += (ref == "-") != (rest == "-")
    assert seen == {(s, k) for s in range(4) for k in range(4)}
    assert (strict_bad, rest_bad, coarse_bad) == (3, 6, 0)
    print(f"16 independent matches; strict={strict_bad}, rest={rest_bad}, coarse={coarse_bad}")

if __name__ == "__main__":
    main()
