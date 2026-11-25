"""Independent finite transition and seeded trace checks."""
import argparse
import hashlib
import itertools
import json
import platform
import random
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DOMAIN = set(itertools.product("DRP", "rpz"))
EXAMPLES = {("D", "p"): ("D", 0), ("D", "r"): ("R", 1),
            ("R", "p"): ("P", 1), ("P", "p"): ("P", 0),
            ("P", "z"): ("D", 1)}
SEED = 4317

def product(s, a, mutate=False):
    accepted = {("D", "r"): "R", ("R", "p"): "P",
                ("D", "z"): "D", ("R", "z"): "D", ("P", "z"): "D"}
    if mutate:
        accepted["D", "p"] = "P"
    return (accepted[s, a], 1) if (s, a) in accepted else (s, 0)

def parse_table(output):
    table = {}
    for line in output.splitlines():
        fields = line.split()
        if len(fields) != 4:
            raise ValueError("invalid row")
        s, a, n, b = fields
        key = (s, a)
        if key not in DOMAIN or key in table or n not in ("D", "R", "P") or b not in ("0", "1"):
            raise ValueError("invalid row or duplicate")
        table[key] = (n, int(b))
    if set(table) != DOMAIN:
        raise ValueError("missing transition")
    return table

def trace(step, word):
    s = "D"
    observed = []
    for a in word:
        s, b = step(s, a)
        observed.append((s, b))
    return observed

def properties(word, mutate):
    s = "D"
    for a in word:
        n, b = product(s, a, mutate)
        if (not b and n != s) or (a == "p" and b and (s != "R" or n != "P")):
            return False
        s = n
    return True

def shrink(word, fails):
    if not fails(word):
        raise ValueError("not a counterexample")
    while True:
        for i in range(len(word)):
            smaller = word[:i] + word[i+1:]
            if fails(smaller):
                word = smaller
                break
        else:
            return word

def run(args, evidence):
    record = {"command": args}
    evidence["commands"].append(record)
    try:
        p = subprocess.run(args, cwd=ROOT, capture_output=True, text=True, timeout=180)
        record.update(exit=p.returncode, stdout=p.stdout, stderr=p.stderr)
        if p.returncode:
            raise ValueError("command failed: " + args[0])
        return p.stdout
    except (OSError, subprocess.TimeoutExpired, UnicodeError) as exc:
        record["error"] = str(exc)
        raise ValueError("command unavailable") from exc

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mutate", action="store_true")
    parser.add_argument("--replay")
    args = parser.parse_args()
    if args.replay is not None and any(a not in "rpz" for a in args.replay):
        parser.error("replay uses only r, p, z")
    gates = dict.fromkeys(("proof", "examples", "differential", "property", "mutation"), "unavailable")
    evidence = {"gates": gates, "seed": SEED, "mutate": args.mutate,
                "python": platform.python_version(), "platform": platform.platform(),
                "commands": [], "sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest()
                for p in sorted(ROOT.iterdir()) if p.is_file() and
                (p.suffix in (".lean", ".py") or p.name in ("lean-toolchain", "lake-manifest.json"))}}
    try:
        evidence["lean"] = run(["lean", "--version"], evidence)
        evidence["commit"] = run(["git", "rev-parse", "HEAD"], evidence)
        try:
            run(["lean", "LvtCapstone.lean"], evidence)
        except ValueError:
            if evidence["commands"][-1].get("exit") not in (None, 0):
                gates["proof"] = "fail"
            raise
        gates["proof"] = "pass"
        run(["lake", "build"], evidence)
        oracle = ROOT / ".lake" / "build" / "bin" / "lvtCapstoneOracle"
        evidence["oracle_sha256"] = hashlib.sha256(oracle.read_bytes()).hexdigest()
        table = parse_table(run([str(oracle)], evidence))
        ref = lambda s, a: table[s, a]
        actual = lambda s, a: product(s, a, args.mutate)
        evidence["allowed"] = sum(b for _, b in table.values())
        evidence["rejected"] = len(table) - evidence["allowed"]
        evidence["table"] = [[s, a, *table[s, a]] for s, a in sorted(DOMAIN)]
        evidence["example_failures"] = [list(k) for k, v in EXAMPLES.items()
                                        if table[k] != v or actual(*k) != v]
        gates["examples"] = "fail" if evidence["example_failures"] else "pass"
        evidence["transition_diffs"] = [[s, a, list(ref(s, a)), list(actual(s, a))]
                                         for s, a in sorted(DOMAIN) if ref(s, a) != actual(s, a)]
        rng = random.Random(SEED)
        words = ["", "rzp", "p", "pz", "rppz"] + [
            "".join(rng.choice("rpz") for _ in range(rng.randrange(13))) for _ in range(200)]
        if args.replay is not None:
            words.append(args.replay)
        evidence["words"] = words
        evidence["trace_diffs"] = [w for w in words if trace(ref, w) != trace(actual, w)]
        gates["differential"] = "fail" if evidence["transition_diffs"] or evidence["trace_diffs"] else "pass"
        evidence["property_failures"] = [w for w in words if not properties(w, args.mutate)]
        gates["property"] = "fail" if evidence["property_failures"] else "pass"
        mutant = lambda s, a: product(s, a, True)
        fails = lambda w: trace(ref, w) != trace(mutant, w)
        if fails("rzp"):
            evidence["shrunk"] = shrink("rzp", fails)
            gates["mutation"] = "pass" if evidence["shrunk"] == "p" and not fails("") else "fail"
        else:
            gates["mutation"] = "fail"
        if args.replay is not None:
            evidence["replayed"] = {"word": args.replay, "reference": trace(ref, args.replay),
                                    "product": trace(actual, args.replay)}
            print(json.dumps(evidence["replayed"]))
        return int(any(v != "pass" for v in gates.values()))
    except (ValueError, OSError) as exc:
        evidence["error"] = str(exc)
        return 1
    finally:
        (ROOT / "evidence.json").write_text(json.dumps(evidence, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(gates, sort_keys=True))

if __name__ == "__main__":
    raise SystemExit(main())
