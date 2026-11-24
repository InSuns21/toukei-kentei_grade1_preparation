namespace LvtEquality

theorem reverseEq {α : Type} {a b : α} (h : a = b) : b = a := by
  cases h
  rfl

theorem chainEq {α : Type} {a b c : α}
    (h : a = b) (k : b = c) : a = c := by
  cases h
  exact k

theorem liftEq {α β : Type} (f : α → β) {a b : α}
    (h : a = b) : f a = f b := by
  cases h
  rfl

def normalize (n : Nat) : Nat := (0 + n) + 0

theorem normalize_eq (n : Nat) : normalize n = n := by
  simp only [normalize, Nat.zero_add, Nat.add_zero]

theorem preserve (P : Nat → Prop) (n : Nat) (hp : P n) :
    P (normalize n) :=
  Eq.subst (Eq.symm (normalize_eq n)) hp

end LvtEquality
