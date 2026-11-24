import LvtInduction
open LvtInduction
#guard steps 3 == 3
#guard joinL [1,2] [3] == [1,2,3]
#guard flipL [1,2,3] == [3,2,1]
#guard flipL (flipL [1,2,3]) == [1,2,3]
example : flipL (flipL [1,2,3]) = [1,2,3] := flip_twice _
def main : IO Unit := IO.println "LVT2-05 OK"
