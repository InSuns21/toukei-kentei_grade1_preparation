import LvtTypes
open LvtTypes

#guard owner Cell.empty == (none : Option Player)
#guard owner (Cell.occupied Player.x) == some Player.x
#guard sameOutcome (playExcept .x .empty) (Except.ok (Cell.occupied Player.x))
#guard sameOutcome (playExcept .x (.occupied .o)) (Except.error (PlayError.occupied Player.o))
#guard sameOutcome (playExcept .o (.occupied .x)) (Except.error (PlayError.occupied Player.x))

#guard sameOutcome (Except.ok Cell.empty) (Except.ok Cell.empty)
#guard !(sameOutcome (Except.ok Cell.empty) (Except.error (PlayError.occupied Player.x)))
#guard !(sameOutcome (Except.error (PlayError.occupied Player.x)) (Except.ok Cell.empty))
#guard !(sameOutcome (Except.error (PlayError.occupied Player.x)) (Except.error (PlayError.occupied Player.o)))
#guard !(sameOutcome (Except.ok Cell.empty) (Except.ok (Cell.occupied Player.x)))

def main : IO Unit := do
  IO.println "LVT1-03 OK"
