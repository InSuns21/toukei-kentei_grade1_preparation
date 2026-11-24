import LvtTactics
open LvtTactics
example : True → True := composeProof True True True (fun h => h) (fun h => h)
example : True ∧ True :=
  routeProof True False True True (fun h => h) (fun h => False.elim h)
    (fun h => h) (Or.inl True.intro)
def main : IO Unit := IO.println "LVT2-04 OK"
