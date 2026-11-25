import LvtAudit

open LvtAudit
#check nine
#guard initialBoard.length == 9
#guard (write [] 0) == .ok []
#guard (write [none] 0) == .ok [some true]
#eval initialBoard.length
#eval ([] : List (Option Bool)).length
#print axioms nine
