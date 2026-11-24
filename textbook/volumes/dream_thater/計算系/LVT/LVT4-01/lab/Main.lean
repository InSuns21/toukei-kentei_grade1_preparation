import LvtGame
open LvtGame

#guard (play initial 8).isSome
#guard (play initial 9).isNone
#guard decide (Wins (after [2,0,4,1,6]).board .x)
#guard !(decide (Wins (after [2,0,4,1,6]).board .o))

def check (name : String) (actual expected : Bool) : IO Unit := do
  if actual != expected then
    throw (IO.userError name)

def main (args : List String) : IO Unit := do
  check "first position" (play initial 0).isSome true
  check "last position" (play initial 8).isSome true
  check "out of range" (play initial 9).isNone true
  check "occupied" (play (after [0]) 0).isNone true
  check "anti diagonal X" (decide (Wins (after [2,0,4,1,6]).board .x)) true
  check "anti diagonal O" (decide (Wins (after [2,0,4,1,6]).board .o)) false
  check "middle row O" (decide (Wins (after [0,3,1,4,8,5]).board .o)) true
  check "middle row X" (decide (Wins (after [0,3,1,4,8,5]).board .x)) false
  check "finished" (play (after [2,0,4,1,6]) 8).isNone true
  let draw := after [0,1,2,4,3,5,7,6,8]
  check "draw full" (decide (Full draw.board)) true
  check "draw X" (decide (Wins draw.board .x)) false
  check "draw O" (decide (Wins draw.board .o)) false
  check "draw rejects" (play draw 0).isNone true
  if args.contains "--fail" then
    check "intentional wrong expectation for position 9" (play initial 9).isSome true
  IO.println "LVT4-01 OK"
