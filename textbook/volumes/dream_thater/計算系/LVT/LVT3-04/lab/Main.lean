import LvtSorting
open LvtSorting
#guard sortL [] == []
#guard sortL [7] == [7]
#guard sortL [3,1,3,0] == [0,1,3,3]
#guard sortL [3,2,1] == [1,2,3]
#guard sortL [1,2,2] == [1,2,2]
#guard occ 3 (eraseAll [3,3]) != occ 3 [3,3]
#guard occ 3 (keepInput [3,1]) == occ 3 [3,1]
def main : IO Unit := IO.println "LVT3-04 OK"
