import LvtTermination
open LvtTermination
#guard run 3 3 7 == none
#guard run 4 3 7 == some 10
#guard run 1 0 7 == some 7
#guard run 0 0 7 == none
#guard drain 3 7 == 10
example : TotalCorrect run := runTotal
def main : IO Unit := IO.println "LVT3-02 OK"
