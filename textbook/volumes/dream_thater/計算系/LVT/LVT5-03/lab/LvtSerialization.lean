import LvtContracts

namespace LvtSerialization

def encode : Option Nat → Bool × Nat
  | none => (false, 0)
  | some r => (true, r)

def decode (p : Bool × Nat) : Option Nat :=
  if p.1 then some p.2 else none

theorem roundtrip (x : Option Nat) : decode (encode x) = x := by
  cases x <;> rfl

theorem agreement (x z : Option Nat) : encode x = encode z ↔ x = z := by
  constructor
  · intro h
    have hd := congrArg decode h
    rw [roundtrip x, roundtrip z] at hd
    exact hd
  · intro h
    exact congrArg encode h

def lossy : Option Nat → Nat
  | none => 0
  | some r => r

def checks : Bool :=
  (encode none != encode (some 0)) &&
  (lossy none == lossy (some 0)) &&
  (decode (encode (some 3)) == some 3)

#guard checks
#eval [encode none, encode (some 0), encode (some 3)]
#eval [lossy none, lossy (some 0)]
#print axioms roundtrip
#print axioms agreement

end LvtSerialization
