import LvtDecision
open LvtDecision
#check Bool
#check true
#check (2 = 2)
#check (show 2 = 2 from rfl)
#check True.intro
#eval decide ((2 : Nat) = 2)
#eval decide ((2 : Nat) = 3)
#eval decisionBool (2 = 2) yesExample
#eval decisionBool False noExample
