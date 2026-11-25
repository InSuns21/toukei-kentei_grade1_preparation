import LvtContracts

example : ((1, 2) : Nat × Nat) = (2, 1) := by
  exact (show ((1, 2) : Nat × Nat) = (1, 2) from rfl)
