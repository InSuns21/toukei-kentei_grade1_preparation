import LvtGame
open LvtGame
#guard (play initial 9).isNone
#guard (play (after [0]) 0).isNone
#guard decide (Wins (after [2,0,4,1,6]).board .x)
#guard (play (after [2,0,4,1,6]) 8).isNone
#guard !(decide (Wins (after [2,0,4,1,6]).board .o))
#guard decide (Full (after [0,1,2,4,3,5,7,6,8]).board)
#guard !(decide (Wins (after [0,1,2,4,3,5,7,6,8]).board .x))
#guard !(decide (Wins (after [0,1,2,4,3,5,7,6,8]).board .o))
def main : IO Unit := IO.println "LVT3-06 OK"
