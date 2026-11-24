namespace LvtPredicates

inductive ReachL (r : Nat → Nat → Prop) (s : Nat) : Nat → Prop where
  | base : ReachL r s s
  | step {x y : Nat} : ReachL r s x → r x y → ReachL r s y

theorem reach_invariant {r : Nat → Nat → Prop} {s t : Nat}
    (P : Nat → Prop) (init : P s)
    (preserve : ∀ x y, P x → r x y → P y)
    (h : ReachL r s t) : P t := by
  induction h with
  | base => exact init
  | @step x y hx e ih => exact preserve x y ih e

theorem reach_trans {r : Nat → Nat → Prop} {a b c : Nat}
    (hab : ReachL r a b) (hbc : ReachL r b c) : ReachL r a c :=
  reach_invariant (ReachL r a) hab
    (fun _ _ hx e => ReachL.step hx e) hbc

inductive EdgeL : Nat → Nat → Prop where
  | e01 : EdgeL 0 1
  | e12 : EdgeL 1 2

def SmallL (n : Nat) : Prop := n = 0 ∨ n = 1 ∨ n = 2

theorem small_step (x y : Nat) (_ : SmallL x) (e : EdgeL x y) :
    SmallL y := by
  cases e with
  | e01 => exact Or.inr (Or.inl rfl)
  | e12 => exact Or.inr (Or.inr rfl)

theorem reach_small {t : Nat} (h : ReachL EdgeL 0 t) : SmallL t :=
  reach_invariant SmallL (Or.inl rfl) small_step h

theorem not_reach_three : ¬ ReachL EdgeL 0 3 := by
  intro h
  have h3 : SmallL 3 := reach_small h
  have hn : ¬ (3 = 0 ∨ 3 = 1 ∨ 3 = 2) := by decide
  exact hn h3

inductive SortedL : List Nat → Prop where
  | nil : SortedL []
  | single (a : Nat) : SortedL [a]
  | cons {a b : Nat} {xs : List Nat} :
      a ≤ b → SortedL (b :: xs) → SortedL (a :: b :: xs)

theorem sorted_pair {a b : Nat} {xs : List Nat}
    (h : SortedL (a :: b :: xs)) : a ≤ b ∧ SortedL (b :: xs) := by
  cases h with
  | cons hle hs => exact ⟨hle, hs⟩

theorem sorted_tail {a : Nat} {xs : List Nat}
    (h : SortedL (a :: xs)) : SortedL xs := by
  cases h with
  | single => exact SortedL.nil
  | cons _ hs => exact hs

end LvtPredicates
