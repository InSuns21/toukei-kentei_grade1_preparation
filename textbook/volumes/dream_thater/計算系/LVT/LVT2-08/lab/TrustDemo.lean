import LvtAutomation
-- Deliberately invalid assumptions, isolated from the normal library and tests.
namespace LvtUntrustedDemo
axiom claimedFits : (3 : Nat) ≤ 2

theorem bogusViaAxiom : False :=
  (by decide : ¬ ((3 : Nat) ≤ 2)) claimedFits

theorem bogusViaSorry : (3 : Nat) ≤ 2 := by
  sorry

theorem inheritedHole : False :=
  (by decide : ¬ ((3 : Nat) ≤ 2)) bogusViaSorry

#print axioms bogusViaAxiom
#print axioms inheritedHole
end LvtUntrustedDemo
