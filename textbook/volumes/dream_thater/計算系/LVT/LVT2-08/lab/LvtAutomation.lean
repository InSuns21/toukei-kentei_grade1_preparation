import Lean

namespace LvtAutomation

theorem withinChain (used reserved cap : Nat)
    (h₁ : used ≤ reserved) (h₂ : reserved ≤ cap) :
    used ≤ cap := Nat.le_trans h₁ h₂

theorem nextWithin (used cap : Nat) (h : used < cap) :
    used + 1 ≤ cap := by
  omega

theorem noRoom (cap : Nat) : ¬ (cap + 1 ≤ cap) := by
  omega

def alwaysAccept (_used _cap : Nat) : Bool := true

theorem externalNotSound :
    ¬ (∀ used cap : Nat, alwaysAccept used cap = true → used ≤ cap) := by
  intro h
  have bad : 3 ≤ 2 := h 3 2 rfl
  exact (by decide : ¬ ((3 : Nat) ≤ 2)) bad

end LvtAutomation
