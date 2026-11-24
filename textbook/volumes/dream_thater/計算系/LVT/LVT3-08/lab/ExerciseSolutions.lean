import LvtHoare
open LvtHoare

theorem a01 : Holds (fun n : Nat => n + 2) (fun n => n ≥ 3) (fun r => r ≥ 5) := by
  intro n h
  change 3 ≤ n at h
  change 5 ≤ n + 2
  omega

theorem a02 (n : Nat) :
    wpF (fun x : Nat => x + 2) (fun r => r ≥ 5) n ↔ n ≥ 3 := by
  change (5 ≤ n + 2) ↔ 3 ≤ n
  omega

theorem a03 (n : Nat) :
    wpF (fun x : Nat => 2 * (x + 1)) (fun r => r ≥ 8) n ↔ n ≥ 3 := by
  change (8 ≤ 2 * (n + 1)) ↔ 3 ≤ n
  omega

theorem a04 : sumLoop #[2, 0, 5] = 7 := by decide

theorem b01 :
    Holds (fun n : Nat => n + 2) (fun n => n ≥ 4) (fun r => r ≥ 5) ∧
    (3 : Nat) ≥ 3 ∧ ¬ (3 : Nat) ≥ 4 := by
  constructor
  · intro n h
    change 4 ≤ n at h
    change 5 ≤ n + 2
    omega
  · decide

theorem b02 (n : Nat) :
    wpF (fun x : Nat => if x ≥ 3 then x + 1 else x + 2) (fun r => r ≥ 4) n ↔
    n ≥ 2 := by
  change (4 ≤ (if n ≥ 3 then n + 1 else n + 2)) ↔ n ≥ 2
  by_cases h : n ≥ 3
  · rw [if_pos h]
    omega
  · rw [if_neg h]
    omega

theorem b03 : badLoop #[2] = 3 ∧ badLoop #[2] ≠ (#[2] : Array Nat).sum := by
  decide

theorem c01 (k : Nat) (xs : Array Nat) : seededLoop k xs = k + xs.sum :=
  seededLoop_correct k xs

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
