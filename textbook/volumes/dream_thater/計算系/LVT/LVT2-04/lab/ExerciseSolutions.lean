import LvtTactics
open LvtTactics

-- LVT2-04-A01
example : ∀ n : Nat, n = n := by
  intro n
  exact Eq.refl n

-- LVT2-04-A02
example (P Q : Prop) (f : P → Q) (hp : P) : Q := by
  apply f
  exact hp

-- LVT2-04-A03
example (P Q : Prop) (hp : P) (hq : Q) : Q ∧ P := by
  constructor
  · exact hq
  · exact hp

-- LVT2-04-A04
example (P Q : Prop) (h : P ∧ Q) : Q := by
  cases h with
  | intro hp hq => exact hq

-- LVT2-04-A05
example (P Q R : Prop) (f : P → Q) (g : Q → R) (hp : P) : R := by
  have hq : Q := f hp
  exact g hq

-- LVT2-04-B01
example (P Q : Prop) (h : P ∨ Q) : Q ∨ P := by
  cases h with
  | inl hp => exact Or.inr hp
  | inr hq => exact Or.inl hq

-- LVT2-04-B02
example (a b c : Nat) (h : a = b) (k : c = b) : a = c := by
  have hbc : b = c := Eq.symm k
  apply Eq.trans h
  exact hbc

-- LVT2-04-B03
example (P Q : Prop) (h : P ∧ Q) : P := by
  exact And.left h

-- LVT2-04-C01
example (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) : (P ∨ Q) → (R ∧ S) := by
  intro h
  have hr : R := by
    cases h with
    | inl hp => exact f hp
    | inr hq => exact g hq
  constructor
  · exact hr
  · exact k hr
example (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) : (P ∨ Q) → (R ∧ S) :=
  fun h => let hr := Or.elim h f g; And.intro hr (k hr)
