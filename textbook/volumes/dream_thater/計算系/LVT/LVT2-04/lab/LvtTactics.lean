namespace LvtTactics

theorem composeProof (P Q R : Prop) (f : P → Q) (g : Q → R) : P → R := by
  intro hp
  apply g
  apply f
  exact hp

theorem routeProof (P Q R S : Prop) (f : P → R) (g : Q → R)
    (k : R → S) (h : P ∨ Q) : R ∧ S := by
  have hr : R := by
    cases h with
    | inl hp => exact f hp
    | inr hq => exact g hq
  constructor
  · exact hr
  · exact k hr

end LvtTactics
