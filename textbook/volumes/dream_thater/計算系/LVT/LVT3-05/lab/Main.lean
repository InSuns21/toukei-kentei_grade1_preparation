import LvtTransitions
open LvtTransitions
#guard advance 0 .up == some 2
#guard advance 2 .up == some 4
#guard advance 4 .up == none
#guard advance 0 .down == none
#guard advance 2 .down == some 0
#guard advance 4 .down == some 2
#guard advance 3 .down == some 1
def main : IO Unit := IO.println "LVT3-05 OK"
