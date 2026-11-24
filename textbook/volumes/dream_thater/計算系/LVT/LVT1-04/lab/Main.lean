import LvtRecursion
open LvtRecursion

#guard sumList [] == 0
#guard sumList [4] == 4
#guard sumList [2, 4, 1] == 7
#guard byTwos 0 == 0
#guard byTwos 1 == 1
#guard byTwos 2 == 0
#guard byTwos 6 == 0
#guard byTwos 7 == 1
#guard down 0 == 0
#guard down 3 == 0

def main : IO Unit := do
  IO.println "LVT1-04 OK"
