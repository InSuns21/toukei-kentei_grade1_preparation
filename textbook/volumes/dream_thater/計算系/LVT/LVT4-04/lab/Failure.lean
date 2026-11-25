import LvtGame
open LvtGame
example : (play initial 9).isSome = true := by
  exact (show (play initial 9).isSome = false from rfl)
