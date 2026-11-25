"""Real Lean JSON Lines oracle vs an independently written Python implementation."""
import argparse
import json
from pathlib import Path
import subprocess
import sys

from hypothesis import find, settings, strategies as st

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE / "../../LVT5-03/lab"))
from audit import MAX_INT, normalize  # reuse the strict response profile

ORACLE = (HERE / "../../LVT5-02/lab/.lake/build/bin/lvtOracle").resolve()
SEARCH = settings(max_examples=80, deadline=None, derandomize=True, database=None)


def encode(obj):
    return json.dumps(obj, ensure_ascii=False, allow_nan=False).encode("utf-8")


def call_oracle(raw):
    if b"\n" in raw:
        raise ValueError("expected one physical input line")
    result = subprocess.run([str(ORACLE), "--batch"], input=raw + b"\n",
                            capture_output=True, timeout=10, check=True)
    if result.stderr:
        raise RuntimeError(f"unexpected stderr: {result.stderr!r}")
    rows = result.stdout.split(b"\n")
    if len(rows) != 2 or rows[-1] != b"" or not rows[0]:
        raise RuntimeError(f"expected exactly one terminated response: {result.stdout!r}")
    normalize(rows[0])  # malformed response raises, never counts as mutant found
    return rows[0]


def request(id, stock, qty):
    return {"id": id, "stock": stock, "qty": qty}


def python_answer(order, *, mutant=False):
    # The caller supplies an input in the generated business domain.
    id, stock, qty = order["id"], order["stock"], order["qty"]
    if (type(id) is not str or type(stock) is not int or type(qty) is not int
            or not 0 <= stock <= MAX_INT or not 0 <= qty <= MAX_INT):
        raise ValueError("outside business domain")
    rest = stock - qty
    insufficient = rest <= 0 if mutant else rest < 0
    if qty == 0 or insufficient:
        return {"id": id, "status": "rejected"}
    return {"id": id, "status": "ok", "rest": rest}


@st.composite
def orders(draw):
    id = draw(st.text(alphabet='ab日😀\n"', max_size=8))
    mode = draw(st.sampled_from(["equal", "general", "zero", "over"]))
    if mode == "over":
        stock = draw(st.integers(0, MAX_INT - 1))
        qty = stock + 1
    else:
        stock = draw(st.integers(0, MAX_INT))
        qty = (stock if mode == "equal" else 0 if mode == "zero"
               else draw(st.integers(0, MAX_INT)))
    return request(id, stock, qty)


def observations(order, *, mutant=False):
    lean = call_oracle(encode(order))
    python = encode(python_answer(order, mutant=mutant))
    normalize(python)
    return lean, python


def mismatch(order):
    lean, python = observations(order, mutant=True)
    return normalize(lean) != normalize(python)


def discover(path):
    order = find(orders(), mismatch, settings=SEARCH)
    lean, python = observations(order, mutant=True)
    if normalize(lean) == normalize(python):
        raise AssertionError("counterexample did not reproduce")
    record = {"input": order, "lean": json.loads(lean), "mutant": json.loads(python)}
    path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n",
                    encoding="utf-8")
    return record


def replay(path):
    record = json.loads(path.read_text(encoding="utf-8"))
    lean, python = observations(record["input"], mutant=True)
    if (normalize(lean) != normalize(encode(record["lean"]))
            or normalize(python) != normalize(encode(record["mutant"]))
            or normalize(lean) == normalize(python)):
        raise AssertionError("record no longer reproduces the same discrepancy")
    return record


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("action", choices=["discover", "replay"])
    parser.add_argument("path", type=Path)
    args = parser.parse_args()
    record = discover(args.path) if args.action == "discover" else replay(args.path)
    print(json.dumps(record, ensure_ascii=False, indent=2))
