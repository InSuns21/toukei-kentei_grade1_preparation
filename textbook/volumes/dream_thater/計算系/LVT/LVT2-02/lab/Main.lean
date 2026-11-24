import LvtLogic
open LvtLogic
example : (True ∧ True) ∨ (True ∧ False) :=
  distribute True True False (And.intro True.intro (Or.inl True.intro))
example : ∃ n : Nat, n = 3 :=
  collect (fun n => n = 3) (fun n => n + 1 = 4) (Exists.intro 3 (And.intro rfl rfl))
def main : IO Unit := IO.println "LVT2-02 OK"
