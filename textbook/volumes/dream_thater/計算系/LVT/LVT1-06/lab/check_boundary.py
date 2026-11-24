"""Independent reference for the ASCII decimal examples, compared with Lean CLI."""
import subprocess

def expected(raw):
    if not raw or not raw.isascii() or not raw.isdecimal():
        return "error malformed"
    i = int(raw)
    if not 0 <= i < 9:
        return "error outOfRange"
    cells = ["0"] * 9
    cells[i] = "1"
    return "ok " + "".join(cells)

for raw in [str(i) for i in range(10)] + ["abc", "x", ""]:
    actual = subprocess.check_output(
        ["lake", "env", "lean", "--run", "Boundary.lean", raw],
        text=True,
    ).rstrip("\n")
    assert actual == expected(raw), (raw, actual, expected(raw))
assert expected("2") == "ok 001000000"
assert expected("1") == "ok 010000000"
print("LVT1-06 boundary comparison OK")
