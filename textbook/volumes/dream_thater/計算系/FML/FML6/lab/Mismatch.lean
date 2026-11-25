namespace FML6

def step (n : Nat) : Nat := n + 1

theorem addZeroLeft (n : Nat) (h : n = 0) : 0 + n = n := Nat.zero_add n
theorem stepRefl (n : Nat) : step n = step n := rfl

end FML6
