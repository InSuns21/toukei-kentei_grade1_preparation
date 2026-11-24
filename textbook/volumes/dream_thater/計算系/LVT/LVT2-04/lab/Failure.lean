import LvtTactics
open LvtTactics
example (P Q : Prop) (h : P ∧ Q) : P := by
  exact h
