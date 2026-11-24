import LvtTypes
open LvtTypes

#guard other Player.x == Player.o
#guard owner Cell.empty == (none : Option Player)
#guard owner (Cell.occupied Player.o) == some Player.o
#guard play Player.x (Cell.occupied Player.o) == Result.blocked Player.o
#guard sameOutcome (playExcept Player.o Cell.empty) (Except.ok (Cell.occupied Player.o))

def isEmpty (c : Cell) : Bool :=
  match c with
  | .empty => true
  | .occupied _ => false

#guard isEmpty .empty == true
#guard isEmpty (.occupied .x) == false

def forgetError (r : Except PlayError Cell) : Option Cell :=
  match r with
  | .ok c => some c
  | .error _ => none

#guard forgetError (playExcept .x .empty) == some (Cell.occupied Player.x)
#guard forgetError (playExcept .x (.occupied .o)) == (none : Option Cell)

theorem owner_after_play (p : Player) :
    owner (.occupied p) = some p := rfl

def badPlay (p : Player) (_c : Cell) : Except PlayError Cell :=
  .ok (.occupied p)

#guard sameOutcome (badPlay .x (.occupied .o)) (Except.ok (Cell.occupied Player.x))
#guard sameOutcome (playExcept .x (.occupied .o)) (Except.error (PlayError.occupied Player.o))
