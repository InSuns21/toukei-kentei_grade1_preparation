import LvtGame
open LvtGame
example : play initial 9 = some (moved initial 0) := by
  have rejected : play initial 9 = none := rfl
  exact rejected
