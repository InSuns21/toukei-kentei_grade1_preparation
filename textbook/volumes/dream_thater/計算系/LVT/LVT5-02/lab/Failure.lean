import LvtContracts
open LvtContracts
example : takeStock ⟨2,2⟩ = none := by
  exact (rfl : none = (none : Option Nat))
