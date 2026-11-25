import LvtContracts
open LvtContracts

abbrev normalAccept (s q : Nat) : Prop := 0 < q ∧ q ≤ s
abbrev mutantAccept (s q : Nat) : Prop := 0 < q ∧ q < s

theorem boundaryMutant (s q : Nat) :
    (¬ (normalAccept s q ↔ mutantAccept s q)) ↔
      (0 < q ∧ q = s) := by
  unfold normalAccept mutantAccept
  omega

#guard (takeStock ⟨1, 1⟩ == some 0)
#eval takeStock ⟨1, 1⟩
#eval decide (mutantAccept 1 1)
#print axioms boundaryMutant
