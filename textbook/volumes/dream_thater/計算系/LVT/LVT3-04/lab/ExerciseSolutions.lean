import LvtSorting
open LvtSorting
namespace Exercises
theorem a01 : SortedL [1,1,3] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 3))
theorem a02 : occ 2 [2,1,2] = 2 ∧ occ 4 [2,1,2] = 0 := by decide
theorem a03 : insertL 2 [1,2,4] = [1,2,2,4] := rfl
theorem a04Order : SortedL (eraseAll [3]) := SortedL.nil
theorem a04Loss : occ 3 (eraseAll [3]) ≠ occ 3 [3] := by decide
theorem b01Count (k : Nat) : occ k (keepInput [2,1]) = occ k [2,1] := rfl
theorem b01Order : ¬ SortedL (keepInput [2,1]) := by
  intro h
  change SortedL [2,1] at h
  cases h with
  | cons hle _ => omega
theorem b02 (x : Nat) (xs : List Nat) :
    (insertL x xs).length = xs.length + 1 := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    by_cases h : x ≤ a
    · simp [insertL, h]
    · simp [insertL, h, ih]
theorem b03 (x y k : Nat) (xs : List Nat) :
    occ k (insertL x (insertL y xs)) = occ k (insertL y (insertL x xs)) := by
  simp only [insertCount]
  omega
theorem sortFixed {xs : List Nat} (h : SortedL xs) : sortL xs = xs := by
  induction h with
  | nil => rfl
  | single a => rfl
  | @cons a b xs hab hs ih =>
    change insertL a (sortL (b :: xs)) = a :: b :: xs
    rw [ih]
    simp [insertL, hab]
theorem c01 (xs : List Nat) : sortL (sortL xs) = sortL xs :=
  sortFixed (sortSorted xs)
#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04Order
#print axioms a04Loss
#print axioms b01Count
#print axioms b01Order
#print axioms b02
#print axioms b03
#print axioms sortFixed
#print axioms c01
end Exercises
