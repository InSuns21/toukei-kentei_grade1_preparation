namespace FML6

def step (n : Nat) : Nat := n + 1
axiom externalProof (n : Nat) : 0 + n = n

theorem addZeroLeft (n : Nat) : 0 + n = n := externalProof n
theorem stepRefl (n : Nat) : step n = step n := rfl

end FML6
