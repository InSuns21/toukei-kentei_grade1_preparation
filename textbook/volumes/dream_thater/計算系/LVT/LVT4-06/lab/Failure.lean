import LvtGame
example : (if (9 : Nat) < 9 then 8 - 9 else 9) = 0 := by
  exact (show (9 : Nat) = 9 from rfl)
