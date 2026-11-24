import LvtSorting
open LvtSorting
#eval sortL []
#eval sortL [3,1,3,0]
#eval occ 3 (sortL [3,1,3,0])
#eval occ 3 (eraseAll [3,1,3,0])
#check sortCorrect
#print axioms insertSorted
#print axioms insertCount
#print axioms sortSorted
#print axioms sortCount
#print axioms sortCorrect
