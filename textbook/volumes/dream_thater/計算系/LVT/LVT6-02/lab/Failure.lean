import LvtAntiDiagonal

open LvtAntiDiagonal

-- Deliberately wrong: the anti-diagonal is no longer a winning line.
example : wins mutantLines [2, 4, 6] = true := by
  exact (show false = false from rfl)
