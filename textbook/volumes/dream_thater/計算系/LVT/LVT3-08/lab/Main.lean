import LvtHoare
open LvtHoare
#guard sumLoop #[] == 0
#guard sumLoop #[2, 0, 5] == 7
#guard seededLoop 4 #[2, 0, 5] == 11
#guard badLoop #[2] == 3
#guard badLoop #[2] != (#[2] : Array Nat).sum
def main : IO Unit := IO.println "LVT3-08 OK"
