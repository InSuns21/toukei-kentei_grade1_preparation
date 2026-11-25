import LvtContracts

def lossy : Option Nat → Nat
  | none => 0
  | some r => r

-- Equal codes do not imply equal semantic values.
example : (none : Option Nat) = some 0 := by
  exact (rfl : lossy none = lossy (some 0))
