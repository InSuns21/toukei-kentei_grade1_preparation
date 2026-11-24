import LvtAutomation
open LvtAutomation
#check Nat.le_trans
#check Nat.le_refl
example (n : Nat) : n ≤ n := by exact?
#check withinChain
#check nextWithin
#check noRoom
#check externalNotSound
#eval alwaysAccept 3 2
#eval decide ((3 : Nat) ≤ 2)
#print axioms withinChain
#print axioms nextWithin
#print axioms noRoom
#print axioms externalNotSound
