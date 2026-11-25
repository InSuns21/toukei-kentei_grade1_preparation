import LvtGame
open LvtGame
example : (play initial 2).isSome = false := by
  exact (show true = true from rfl)
