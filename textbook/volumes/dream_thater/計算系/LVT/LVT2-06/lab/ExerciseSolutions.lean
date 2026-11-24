import LvtPredicates
open LvtPredicates

-- A01
example (r : Nat → Nat → Prop) (s : Nat) : ReachL r s s :=
  ReachL.base

-- A02
example : ReachL EdgeL 0 2 :=
  ReachL.step (ReachL.step ReachL.base EdgeL.e01) EdgeL.e12

-- A03
example : SortedL [2,2,4] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 4))

-- A04
example (a b : Nat) (h : SortedL [a,b]) : a ≤ b :=
  (sorted_pair h).1

-- B01
example {r : Nat → Nat → Prop} {a b c : Nat}
    (hab : ReachL r a b) (hbc : ReachL r b c) : ReachL r a c :=
  reach_invariant (ReachL r a) hab
    (fun _ _ hx e => ReachL.step hx e) hbc

-- B02
example (a b : Nat) (xs : List Nat)
    (h : SortedL (a :: b :: xs)) : SortedL xs :=
  sorted_tail (sorted_tail h)

-- B03
example : ¬ SortedL [4,1] := by
  intro h
  have bad : 4 ≤ 1 := (sorted_pair h).1
  have hn : ¬ (4 ≤ 1) := by decide
  exact hn bad

-- C01
example : ¬ ReachL EdgeL 1 0 := by
  intro h
  let P : Nat → Prop := fun n => n = 1 ∨ n = 2
  have init : P 1 := Or.inl rfl
  have preserve : ∀ x y, P x → EdgeL x y → P y := by
    intro x y hx e
    cases e with
    | e01 => exact Or.inl rfl
    | e12 => exact Or.inr rfl
  have h0 : P 0 := reach_invariant P init preserve h
  have hn : ¬ (0 = 1 ∨ 0 = 2) := by decide
  exact hn h0
