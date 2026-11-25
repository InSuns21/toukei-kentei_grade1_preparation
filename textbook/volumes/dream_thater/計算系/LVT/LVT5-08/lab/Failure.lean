import LvtContracts

example : (some 1 : Option Nat) = some 2 := by
  exact (show true = true from rfl)
