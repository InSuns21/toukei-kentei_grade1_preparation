import LvtContracts

namespace LvtLimits

theorem observedAgreement {X Y Z : Type} (f g q : X → Y) (h : Y → Z)
    (correct : ∀ x, f x = q x)
    (injective : ∀ a b, h a = h b → a = b) (x : X) :
    h (f x) = h (g x) ↔ g x = q x := by
  constructor
  · intro same
    exact (injective _ _ same).symm.trans (correct x)
  · intro same
    rw [correct x, same]

def success : Option Nat → Bool
  | none => false
  | some _ => true

#guard success (some 1) == success (some 2)
#guard (some 1 : Option Nat) != some 2
#guard success (some 0) != success none
#print axioms observedAgreement

end LvtLimits
