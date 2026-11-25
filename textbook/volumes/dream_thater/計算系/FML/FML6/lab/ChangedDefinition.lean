namespace FML6

def step (n : Nat) : Nat := n + 2

theorem addZeroLeft (n : Nat) : 0 + n = n := Nat.zero_add n
theorem stepRefl (n : Nat) : step n = step n := rfl

end FML6
