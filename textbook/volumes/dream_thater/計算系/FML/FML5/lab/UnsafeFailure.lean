import FmlAudit

unsafe def unsafeZero : Nat := 0
#eval unsafeZero

theorem badUnsafe : unsafeZero = 0 := rfl
