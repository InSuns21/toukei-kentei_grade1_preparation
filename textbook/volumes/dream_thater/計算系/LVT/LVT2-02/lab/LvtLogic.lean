namespace LvtLogic

theorem distribute (p q r : Prop) : p ∧ (q ∨ r) → (p ∧ q) ∨ (p ∧ r) :=
  fun h => Or.elim h.right
    (fun hq => Or.inl (And.intro h.left hq))
    (fun hr => Or.inr (And.intro h.left hr))

theorem collect (P Q : Nat → Prop) :
    (∃ n, P n ∧ Q n) → ∃ n, P n :=
  fun h => Exists.elim h (fun n hn => Exists.intro n hn.left)

end LvtLogic
