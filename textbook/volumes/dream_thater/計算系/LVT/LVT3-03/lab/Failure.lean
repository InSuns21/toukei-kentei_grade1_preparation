import LvtListCorrectness
open LvtListCorrectness
-- A length equality cannot prove a list equality.
example (xs : List Nat) : bad xs = mapL (fun n : Nat => n + 1) xs := by
  exact mapLength (fun n : Nat => n + 1) xs
