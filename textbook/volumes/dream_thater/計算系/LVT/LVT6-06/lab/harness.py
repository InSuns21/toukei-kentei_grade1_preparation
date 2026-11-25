"""Run the independent checks and retain evidence even on failure."""
import argparse
import hashlib
import itertools
import json
import platform
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DOMAIN = ["".join(x) for x in itertools.product("01", repeat=4)]
EXAMPLES = {"1000": 0, "0100": 0, "1100": 1, "1110": 0, "1111": 1}
MUTANT_DIFF = ["1000", "1001", "1011"]


def product(bits, mutate=False):
    b, t, w, o = (x == "1" for x in bits)
    if not b:
        return 0
    if not mutate and not t:
        return 0
    if not w:
        return 1
    return int(o)


def run(args, evidence):
    rec = {"command": args}
    evidence["commands"].append(rec)
    try:
        p = subprocess.run(args, cwd=ROOT, capture_output=True, text=True, timeout=180)
        rec.update(exit=p.returncode, stdout=p.stdout, stderr=p.stderr)
        return p.stdout if p.returncode == 0 else None
    except (OSError, subprocess.TimeoutExpired, UnicodeError) as e:
        rec["error"] = str(e)
        return None


def parse_table(text):
    if text is None:
        raise ValueError("no observation")
    table = {}
    for line in text.splitlines():
        fields = line.split()
        if len(fields) != 2:
            raise ValueError("invalid row")
        key, value = fields
        if key not in DOMAIN or key in table or value not in ("0", "1"):
            raise ValueError("invalid or duplicate key/value")
        table[key] = int(value)
    if set(table) != set(DOMAIN):
        raise ValueError("missing input")
    return table


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mutate", action="store_true")
    parser.add_argument("--replay", choices=DOMAIN)
    args = parser.parse_args()
    evidence = {
        "python": platform.python_version(), "platform": platform.platform(),
        "mutate": args.mutate, "replay": args.replay, "commands": [],
        "sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest()
                   for p in sorted(ROOT.iterdir()) if p.is_file()
                   and p.suffix in (".lean", ".py", ".json")
                   and p.name != "evidence.json"},
    }
    gates = dict.fromkeys(("proof", "examples", "differential", "mutation"), "unavailable")
    evidence["gates"] = gates
    code = 1
    try:
        evidence["lean"] = run(["lean", "--version"], evidence)
        evidence["commit"] = run(["git", "rev-parse", "HEAD"], evidence)
        # Check the theorem separately from running the executable.
        proof = run(["lean", "LvtIntegration.lean"], evidence)
        last = evidence["commands"][-1]
        gates["proof"] = ("pass" if proof is not None else
                          "fail" if last.get("exit") not in (None, 0) else "unavailable")
        if run(["lake", "build"], evidence) is None:
            return code
        oracle = ROOT / ".lake" / "build" / "bin" / "lvtIntegrationOracle"
        evidence["oracle_sha256"] = hashlib.sha256(oracle.read_bytes()).hexdigest()
        table = parse_table(run([str(oracle)], evidence))
        evidence["oracle"] = table
        evidence["allowed"] = sum(table.values())
        evidence["rejected"] = len(table) - evidence["allowed"]
        actual = {x: product(x, args.mutate or args.replay is not None) for x in DOMAIN}
        evidence["product"] = actual
        evidence["example_failures"] = [x for x, v in EXAMPLES.items()
                                        if table[x] != v or actual[x] != v]
        gates["examples"] = "fail" if evidence["example_failures"] else "pass"
        diffs = [{"input": x, "reference": table[x], "product": actual[x]}
                 for x in DOMAIN if table[x] != actual[x]]
        evidence["differences"] = diffs
        gates["differential"] = "fail" if diffs else "pass"
        evidence["mutation_detected"] = [x for x in DOMAIN if table[x] != product(x, True)]
        gates["mutation"] = "pass" if evidence["mutation_detected"] == MUTANT_DIFF else "fail"
        if args.replay is not None:
            x = args.replay
            evidence["replayed"] = {"input": x, "reference": table[x], "product": actual[x]}
            print(json.dumps(evidence["replayed"]))
            return int(table[x] != actual[x])
        code = int(any(v != "pass" for v in gates.values()))
        return code
    except (ValueError, OSError) as e:
        evidence["error"] = str(e)
        return code
    finally:
        (ROOT / "evidence.json").write_text(json.dumps(evidence, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(gates, sort_keys=True))


if __name__ == "__main__":
    raise SystemExit(main())
