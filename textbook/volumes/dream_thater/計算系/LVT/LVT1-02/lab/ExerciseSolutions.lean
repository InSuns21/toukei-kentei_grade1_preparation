import LvtEnvironment

#check LvtEnvironment.bump 7
#eval LvtEnvironment.bump 7
#guard LvtEnvironment.bump 7 == 8
#check LvtEnvironment.bump 5
#eval LvtEnvironment.bump 5
#guard LvtEnvironment.bump 5 == 6

def addTwo (n : Nat) : Nat := n + 2
theorem addTwo_zero : addTwo 0 = 2 := rfl
#check addTwo 4
#eval addTwo 4
#guard addTwo 4 == 6
