"""Compare a deliberately defective Python implementation to the Lean oracle."""
from pathlib import Path
import subprocess


def product(n: int) -> bool:
    return n == 0 or n == 2


def main() -> None:
    # Both programs receive the same three natural-number inputs in this order.
    inputs = [0, 1, 2]
    assert product(0) is True
    assert product(1) is False
    print("example tests: passed (0, 1)")
    directory = Path(__file__).resolve().parent
    executable = directory / ".lake" / "build" / "bin" / "lvtIntroOracle"
    result = subprocess.run(
        [str(executable)], check=True, capture_output=True, text=True
    )
    lines = result.stdout.splitlines()
    assert lines == ["true", "false", "false"], lines
    expected = [line == "true" for line in lines]
    mismatches = [n for n, value in zip(inputs, expected) if product(n) != value]
    assert mismatches == [2], mismatches
    print(f"differential mismatches: {mismatches}")


if __name__ == "__main__":
    main()
