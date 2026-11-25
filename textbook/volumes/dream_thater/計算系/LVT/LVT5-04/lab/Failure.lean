import LvtPythonDrt
open LvtContracts

example : takeStock ⟨1, 1⟩ = none := by
  exact (show takeStock ⟨1, 1⟩ = some 0 from rfl)
