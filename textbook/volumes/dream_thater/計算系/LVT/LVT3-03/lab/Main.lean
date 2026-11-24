import LvtListCorrectness
open LvtListCorrectness
#guard mapL (fun n : Nat => n + 1) [] == []
#guard mapL (fun n : Nat => n + 1) [2,2,0] == [3,3,1]
#guard mapL (fun n : Nat => n == 0) [0,2,0] == [true,false,true]
#guard mapRevAcc (fun n : Nat => n + 1) [1,2] [9] == [3,2,9]
#guard mapRevAcc (fun n : Nat => n + 1) [] [9] == [9]
#guard bad [0] != mapL (fun n : Nat => n + 1) [0]
def main : IO Unit := IO.println "LVT3-03 OK"
