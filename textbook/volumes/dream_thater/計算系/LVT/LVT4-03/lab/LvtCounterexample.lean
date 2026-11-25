import Std

namespace LvtCounterexample

def counterexample (n : Nat) : Bool := decide (8 < n)

theorem not_all_small : ¬ (∀ n : Nat, n ≤ 8) := by
  intro h
  have h9 := h 9
  omega

theorem next_larger (n : Nat) : n < n + 1 := by omega

theorem shrink_step (initial current next steps : Nat)
    (h : current + steps ≤ initial) (hs : next < current) :
    next + (steps + 1) ≤ initial := by omega

theorem shrink_bound (initial current steps : Nat)
    (h : current + steps ≤ initial) : steps ≤ initial := by omega

end LvtCounterexample
