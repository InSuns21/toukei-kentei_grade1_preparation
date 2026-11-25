import LvtAudit

example : ([] : List (Option Bool)).length = 9 := by
  exact (show (0 : Nat) = 0 from rfl)
