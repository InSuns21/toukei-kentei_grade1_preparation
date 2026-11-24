import LvtPredicates
open LvtPredicates
example : ReachL EdgeL 0 3 := by
  exact (ReachL.base : ReachL EdgeL 0 0)
