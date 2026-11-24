import Lean

namespace LvtSorting

-- Standalone copy of the predicate introduced in LVT2-06.
inductive SortedL : List Nat → Prop where
  | nil : SortedL []
  | single (a : Nat) : SortedL [a]
  | cons {a b : Nat} {xs : List Nat} :
      a ≤ b → SortedL (b :: xs) → SortedL (a :: b :: xs)

def occ (k : Nat) : List Nat → Nat
  | [] => 0
  | a :: xs => (if a = k then 1 else 0) + occ k xs

def insertL (x : Nat) : List Nat → List Nat
  | [] => [x]
  | a :: xs => if x ≤ a then x :: a :: xs else a :: insertL x xs

def sortL : List Nat → List Nat
  | [] => []
  | a :: xs => insertL a (sortL xs)

def SortSpec (xs ys : List Nat) : Prop :=
  SortedL ys ∧ ∀ k : Nat, occ k ys = occ k xs

theorem insertSorted (x : Nat) {xs : List Nat} (h : SortedL xs) :
    SortedL (insertL x xs) := by
  induction h with
  | nil => exact SortedL.single x
  | single a =>
    by_cases ha : x ≤ a
    · simpa [insertL, ha] using (SortedL.cons ha (SortedL.single a))
    · have hax : a ≤ x := by omega
      simpa [insertL, ha] using (SortedL.cons hax (SortedL.single x))
  | @cons a b xs hab hs ih =>
    by_cases ha : x ≤ a
    · simpa only [insertL, if_pos ha] using (SortedL.cons ha (SortedL.cons hab hs))
    · by_cases hb : x ≤ b
      · have hax : a ≤ x := by omega
        simpa [insertL, ha, hb] using (SortedL.cons hax (SortedL.cons hb hs))
      · have ih' : SortedL (b :: insertL x xs) := by
          simpa [insertL, hb] using ih
        simpa [insertL, ha, hb] using (SortedL.cons hab ih')

theorem insertCount (x k : Nat) (xs : List Nat) :
    occ k (insertL x xs) = (if x = k then 1 else 0) + occ k xs := by
  induction xs with
  | nil => simp [insertL, occ]
  | cons a xs ih =>
    by_cases h : x ≤ a
    · simp [insertL, h, occ]
    · simp only [insertL, if_neg h, occ, ih]
      omega

theorem sortSorted (xs : List Nat) : SortedL (sortL xs) := by
  induction xs with
  | nil => exact SortedL.nil
  | cons a xs ih => exact insertSorted a ih

theorem sortCount (k : Nat) (xs : List Nat) :
    occ k (sortL xs) = occ k xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih => simp only [sortL, insertCount, occ, ih]

theorem sortCorrect (xs : List Nat) : SortSpec xs (sortL xs) :=
  ⟨sortSorted xs, fun k => sortCount k xs⟩

def eraseAll (_ : List Nat) : List Nat := []
def keepInput (xs : List Nat) : List Nat := xs

end LvtSorting
