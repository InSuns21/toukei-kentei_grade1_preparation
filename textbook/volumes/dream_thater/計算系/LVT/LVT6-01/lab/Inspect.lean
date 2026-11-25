import LvtAudit

open LvtAudit
#check nine
#guard initialBoard.length == 9
#guard match write [] 0 with
  | .ok b => b.isEmpty
  | .error _ => false
#guard match write [none] 0 with
  | .ok b => b == [some true]
  | .error _ => false
#eval initialBoard.length
#eval ([] : List (Option Bool)).length
#print axioms nine
