namespace FML6

def step (n : Nat) : Nat := n + 1

theorem addZeroLeft (n : Nat) : 0 + n = n := by sorry
theorem stepRefl (n : Nat) : step n = step n := by sorry

end FML6
