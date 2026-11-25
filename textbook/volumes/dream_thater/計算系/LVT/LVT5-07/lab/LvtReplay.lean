import LvtContracts

namespace LvtReplay

theorem fixedReplay {X Y : Type} (f g : X → Y) (x x' : X)
    (h : f x ≠ g x) (same : x' = x) : f x' ≠ g x' := by
  rw [same]
  exact h

#guard ((0 : Nat) + 1) != (2 * 0 : Nat)
#guard ((1 : Nat) + 1) == (2 * 1 : Nat)
#print axioms fixedReplay

end LvtReplay
