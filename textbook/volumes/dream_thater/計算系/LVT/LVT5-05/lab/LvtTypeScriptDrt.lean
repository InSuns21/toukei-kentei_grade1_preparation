import LvtContracts

theorem swapDetection {α : Type} (u v : α) :
    ((u, v) ≠ (v, u)) ↔ u ≠ v := by
  constructor
  · intro h he
    subst v
    exact h rfl
  · intro h he
    exact h (congrArg Prod.fst he)

#guard ((1, 2) : Nat × Nat) != (2, 1)
#guard ((1, 1) : Nat × Nat) == (1, 1)
#print axioms swapDetection
