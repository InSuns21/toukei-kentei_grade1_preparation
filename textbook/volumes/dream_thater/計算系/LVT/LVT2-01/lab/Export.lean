import LvtDecision
open LvtDecision

def main : IO Unit := do
  for n in List.range 9 do
    for k in List.range 9 do
      IO.println s!"{n},{k},{sameNumber n k},{wrongMatches n k}"
