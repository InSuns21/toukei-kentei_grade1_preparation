import LvtTransitions
open LvtTransitions
#eval advance 0 .up
#eval advance 4 .up
#eval advance 0 .down
#eval advance 3 .down
#check ReachL.step
#check reachExact
#print axioms good_step
#print axioms goodInductive
#print axioms reachableGood
#print axioms reachTwo
#print axioms reachFour
#print axioms reachExact
#print axioms reachBound
#print axioms avoidOneReach
#print axioms avoidOneNotInductive
