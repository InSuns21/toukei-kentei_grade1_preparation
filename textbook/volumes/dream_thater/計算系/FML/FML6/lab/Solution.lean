namespace FML6

def step (n : Nat) : Nat := n + 1

theorem addZeroLeft (n : Nat) : 0 + n = n := Nat.zero_add n
theorem stepRefl (n : Nat) : step n = step n := rfl

end FML6

#print axioms FML6.addZeroLeft
#print axioms FML6.stepRefl
