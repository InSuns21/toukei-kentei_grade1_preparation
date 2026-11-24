import LvtCounterexample
open LvtCounterexample

theorem exA01 : ¬ (∀ n : Nat, n + 1 = n) := by
  intro h
  have h0 := h 0
  omega

theorem exA02 : counterexample 13 = true ∧ counterexample 11 = true ∧
    counterexample 9 = true ∧ counterexample 8 = false ∧ 11 < 13 ∧ 9 < 11 := by decide

theorem exA03 : (decide (3 ≤ 8) : Bool) = true ∧
    (decide (8 ≤ 8) : Bool) = true ∧ (decide (12 ≤ 8) : Bool) = false := by decide

theorem exA04 (n k : Nat) (h : n + k ≤ 7) : k ≤ 7 :=
  shrink_bound 7 n k h

theorem exB01 : (∀ n : Nat, n ≤ 8 → decide (n ≤ 8) = true) ∧
    ¬ (∀ n : Nat, n ≤ 8) := by
  constructor
  · intro n h
    simp [h]
  · exact not_all_small

theorem exB02 : counterexample 14 = true ∧ counterexample 10 = true ∧
    counterexample 8 = false ∧ counterexample 5 = false ∧ counterexample 9 = true ∧
    (∀ n : Nat, n < 9 → n ≤ 8) := by
  constructor
  · decide
  · constructor
    · decide
    · constructor
      · decide
      · constructor
        · decide
        · constructor
          · decide
          · intro n h
            omega

theorem exB03 (n k : Nat) (h : 8 < n) (hs : n + k ≤ 12) : k ≤ 3 := by omega

theorem exC01 : (¬ (∀ n : Nat, n ≤ 8)) ∧
    (∀ n : Nat, n < 9 ↔ n ≤ 8) := by
  constructor
  · exact not_all_small
  · intro n
    omega

#print axioms exA01
#print axioms exA02
#print axioms exA03
#print axioms exA04
#print axioms exB01
#print axioms exB02
#print axioms exB03
#print axioms exC01
