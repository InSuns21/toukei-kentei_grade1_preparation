import LvtTransitions
open LvtTransitions
-- The up transition at capacity returns none, not some 6.
example : Step 4 6 := by
  have rejected : advance 4 .up = none := rfl
  exact ⟨.up, rejected⟩
