import FmlAudit
namespace FML5TrustDemo

axiom bad : (2 : Nat) = 3
theorem fromBad : (2 : Nat) = 3 := bad
theorem contradiction : False :=
  (by decide : (2 : Nat) ≠ 3) fromBad

theorem hole : (2 : Nat) = 3 := by sorry
theorem inherited : (2 : Nat) = 3 := hole

axiom carrier : Type
theorem carrierRefl (x : carrier) : x = x := rfl

axiom globalClaim : ∀ n : Nat, n + n = n
theorem fromGlobal (n : Nat) : n + n = n := globalClaim n

#print axioms contradiction
#print axioms inherited
#print axioms carrierRefl
#print axioms fromGlobal

end FML5TrustDemo
