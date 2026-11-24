import LvtPredicates
open LvtPredicates
example : ReachL EdgeL 0 2 :=
  ReachL.step (ReachL.step ReachL.base EdgeL.e01) EdgeL.e12
example : ¬ ReachL EdgeL 0 3 := not_reach_three
example : SortedL [1,2,3] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 3))
example : ¬ SortedL [4,1] := by
  intro h
  have hn : ¬ (4 ≤ 1) := by decide
  exact hn (sorted_pair h).1
def main : IO Unit := IO.println "LVT2-06 OK"
