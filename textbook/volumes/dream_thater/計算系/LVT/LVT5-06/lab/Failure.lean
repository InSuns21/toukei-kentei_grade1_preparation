import LvtContracts

example : (0 : Nat) = 1 := by
  exact (show (0 : Nat) = 0 from rfl)
