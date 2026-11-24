import LvtTypes
open LvtTypes

#guard owner Cell.empty == (none : Option Player)
#guard owner (Cell.occupied Player.x) == some Player.x
#guard playExcept .x .empty == Except.ok (Cell.occupied Player.x)
#guard playExcept .x (.occupied .o) == Except.error (PlayError.occupied Player.o)
#guard playExcept .o (.occupied .x) == Except.error (PlayError.occupied Player.x)

def main : IO Unit := do
  IO.println "LVT1-03 OK"
