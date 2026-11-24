import LvtRefinement
open LvtRefinement
-- The mutated implementation accepts a put when both slots are occupied.
example : (badImpl ⟨true, true⟩ .put).map decode = spec .full .put := by
  exact (rfl : (badImpl ⟨true, true⟩ .put).map decode = some Count.full)
