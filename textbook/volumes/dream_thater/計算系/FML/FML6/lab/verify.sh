#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
logdir="$(mktemp -d)"
echo "Logs: $logdir"
lean --version | tee "$logdir/version.log"
grep -F 'version 4.35.0' "$logdir/version.log"
lake --version | tee "$logdir/lake-version.log"
# Each variant starts with no generated artifacts, in a separate temporary directory.
for variant in Solution Mismatch ChangedDefinition ForbiddenAxiom; do
  work="$(mktemp -d)"
  cp lean-toolchain lakefile.toml lake-manifest.json Challenge.lean Solution.lean Mismatch.lean ChangedDefinition.lean ForbiddenAxiom.lean comparator.json "$work/"
  (
    cd "$work"
    python3 - "$variant" <<'PY'
import json, sys
from pathlib import Path
p = Path("comparator.json")
c = json.loads(p.read_text())
c["solution_module"] = sys.argv[1]
p.write_text(json.dumps(c))
PY
    test ! -e .lake
    # Trusted fixture compilation is separate from the fresh Comparator run.
    if [ "$variant" != Solution ]; then
      lake build "$variant" > "$logdir/$variant-build.log" 2>&1
      rm -rf .lake
    fi
    status=0
    if [ "$variant" = Solution ]; then
      lake comparator --paranoid > "$logdir/$variant.log" 2>&1 || status=$?
    else
      lake comparator > "$logdir/$variant.log" 2>&1 || status=$?
    fi
    cat "$logdir/$variant.log"
    if [ "$variant" = Solution ]; then
      test "$status" -eq 0
      grep -F 'nanoda kernel accepts the solution' "$logdir/$variant.log"
      grep -F 'Your solution is okay!' "$logdir/$variant.log"
    else
      test "$status" -eq 1
      case "$variant" in
        Mismatch) grep -F "Challenge and solution theorem statement do not match: 'FML6.addZeroLeft'" "$logdir/$variant.log" ;;
        ChangedDefinition) grep -F "Const does not match between challenge and target 'FML6.step'" "$logdir/$variant.log" ;;
        ForbiddenAxiom) grep -F "Illegal axiom detected: 'FML6.externalProof'" "$logdir/$variant.log" ;;
      esac
      ! grep -F 'Your solution is okay!' "$logdir/$variant.log"
    fi
  )
  rm -rf "$work"
done
echo "FML6 fixtures passed"
