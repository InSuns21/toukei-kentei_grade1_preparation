"""Check two physical response rows with the canonical strict normalizer."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent / "../../LVT5-03/lab"))
from audit import normalize

rows = sys.stdin.buffer.read().split(b"\n")
if len(rows) != 3 or rows[-1] != b"" or not all(rows[:2]):
    raise ValueError("expected two terminated response rows")
print("equal" if normalize(rows[0]) == normalize(rows[1]) else "different")
