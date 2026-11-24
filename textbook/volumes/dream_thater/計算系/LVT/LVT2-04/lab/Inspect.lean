import LvtTactics
open LvtTactics
#check composeProof
#check routeProof

example : ∀ n : Nat, n = n := by
  intro n
  exact Eq.refl n

example (P Q : Prop) (f : P → Q) (hp : P) : Q := by
  apply f
  exact hp

example (P Q : Prop) (hp : P) (hq : Q) : Q ∧ P := by
  constructor
  · exact hq
  · exact hp

example (P Q : Prop) (h : P ∧ Q) : Q := by
  cases h with
  | intro hp hq => exact hq

example (P Q R : Prop) (f : P → Q) (g : Q → R) (hp : P) : R := by
  have hq : Q := f hp
  exact g hq

example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp => exact Or.inr hp
  | inr hq => exact Or.inl hq
