import LvtPredicates
open LvtPredicates
#check ReachL.base
#check ReachL.step
#check reach_invariant
#check reach_trans
#check not_reach_three
#check SortedL.cons
#check sorted_pair
#check sorted_tail
example : ReachL EdgeL 0 2 :=
  ReachL.step (ReachL.step ReachL.base EdgeL.e01) EdgeL.e12
example : SortedL [1,2,3] :=
  SortedL.cons (by decide) (SortedL.cons (by decide) (SortedL.single 3))
