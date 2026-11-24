import LvtInduction
open LvtInduction
example (n : Nat) (ih : steps n = n) :
    steps (Nat.succ n) = Nat.succ n := by
  exact ih
