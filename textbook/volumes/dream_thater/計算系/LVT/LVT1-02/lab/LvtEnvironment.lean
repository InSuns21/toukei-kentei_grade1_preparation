namespace LvtEnvironment

def bump (n : Nat) : Nat := n + 1

theorem bump_zero : bump 0 = 1 := rfl

end LvtEnvironment
