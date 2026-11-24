import LvtEquality
open LvtEquality
#check Eq.refl
#check Eq.subst
#check Eq.symm
#check Eq.trans
#check congrArg
#check Nat.zero_add
#check Nat.add_zero
#check normalize_eq
#check preserve
#eval normalize 7
example (n : Nat) : n + 0 = n := rfl
example (n : Nat) : 0 + n = n := Nat.zero_add n
example (f : Nat → Nat) (a b : Nat) (h : a = b) : f b = f a := by
  rw [← h]
example (f : Nat → Nat) (a b : Nat) (h : a = b) : f a = f b := by
  rw [h]
example (n : Nat) : (0 + n) + 0 = n := by
  simp only [Nat.zero_add, Nat.add_zero]
