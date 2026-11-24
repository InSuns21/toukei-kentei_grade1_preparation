import LvtTermination
open LvtTermination
-- Partial correctness is not a termination proof.
example : Terminates never := by
  exact neverPartial
