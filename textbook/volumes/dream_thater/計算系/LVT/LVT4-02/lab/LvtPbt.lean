namespace LvtPbt

def correctRange (n : Nat) : Bool := decide (n < 9)
def badRange (n : Nat) : Bool := decide (n ≤ 9)

def rangeCheck (f : Nat → Bool) (n : Nat) : Bool :=
  f n == decide (n ≤ 8)

def samples (seed count : Nat) : List Nat :=
  (List.range count).map (fun i => (seed + 5 * i) % 16)

def failures (check : Nat → Bool) (xs : List Nat) : List Nat :=
  xs.filter (fun n => !(check n))

def allPass (check : Nat → Bool) : List Nat → Bool
  | [] => true
  | x :: xs => check x && allPass check xs

theorem allPass_spec (check : Nat → Bool) (xs : List Nat) :
    allPass check xs = true ↔ ∀ n ∈ xs, check n = true := by
  induction xs with
  | nil => simp [allPass]
  | cons x xs ih =>
    constructor
    · intro h n hn
      have hp : check x = true ∧ allPass check xs = true := by
        simpa [allPass, Bool.and_eq_true] using h
      rcases List.mem_cons.mp hn with he | ht
      · subst n
        exact hp.1
      · exact ih.mp hp.2 n ht
    · intro h
      have hx : check x = true := h x (by simp)
      have ht : allPass check xs = true :=
        ih.mpr (fun n hn => h n (List.mem_cons.mpr (Or.inr hn)))
      simp [allPass, hx, ht]

theorem correct_property (n : Nat) : rangeCheck correctRange n = true := by
  by_cases h : n ≤ 8
  · have h' : n < 9 := by omega
    simp [rangeCheck, correctRange, h, h']
  · have h' : ¬ n < 9 := by omega
    simp [rangeCheck, correctRange, h, h']

theorem bad_at_nine : rangeCheck badRange 9 = false := by decide

end LvtPbt
