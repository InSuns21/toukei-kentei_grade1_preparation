import Mathlib.Algebra.Field.Basic

namespace FML5

theorem reflNat (n : Nat) : n = n := rfl
theorem propEq (P Q : Prop) (h : P ↔ Q) : P = Q := propext h
noncomputable def pick (α : Type) (h : Nonempty α) : α :=
  Classical.choice h
theorem quotientEq :
    Quot.mk (fun _ _ : Nat => True) 0 =
      Quot.mk (fun _ _ : Nat => True) 1 := Quot.sound trivial

theorem assumedZero (n : Nat) (h : n = 0) : n = 0 := h

theorem fieldVacuous {K : Type*} [Field K]
    (h : (0 : K) = 1) (x y : K) : x = y :=
  (zero_ne_one h).elim

theorem fieldNonzero {K : Type*} [Field K] : ∃ x : K, x ≠ 0 :=
  ⟨1, one_ne_zero⟩

theorem emptyAll (P : Prop) (e : Empty) : P := Empty.elim e
theorem emptyNotNonempty : ¬ Nonempty Empty := by
  intro h
  exact h.elim (fun e => Empty.elim e)

theorem natVacuous (n : Nat) (h : n + 1 = 0) : (2 : Nat) = 3 :=
  (Nat.succ_ne_zero n h).elim

theorem notNatAll : ¬ (∀ _ : Nat, (7 : Nat) = 8) := by
  intro h
  exact (by decide : (7 : Nat) ≠ 8) (h 0)

theorem conditional (n : Nat) (h : n = 0) : n + n = n := by
  subst n
  rfl

theorem vacuous (n : Nat) (h : n + 1 = 0) : n + n = n :=
  (Nat.succ_ne_zero n h).elim

theorem notGlobal : ¬ (∀ n : Nat, n + n = n) := by
  intro h
  have bad : (2 : Nat) = 1 := h 1
  exact (by decide : (2 : Nat) ≠ 1) bad

end FML5
