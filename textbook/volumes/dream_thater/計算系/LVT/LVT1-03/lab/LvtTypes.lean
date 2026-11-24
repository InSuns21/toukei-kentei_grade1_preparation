namespace LvtTypes

inductive Player where
  | x
  | o
  deriving Repr, BEq

inductive Cell where
  | empty
  | occupied (p : Player)
  deriving Repr, BEq

inductive Result where
  | played (cell : Cell)
  | blocked (byPlayer : Player)
  deriving Repr, BEq

inductive PlayError where
  | occupied (p : Player)
  deriving Repr, BEq

def other (p : Player) : Player :=
  match p with
  | .x => .o
  | .o => .x

def owner (c : Cell) : Option Player :=
  match c with
  | .empty => none
  | .occupied p => some p

def play (p : Player) (c : Cell) : Result :=
  match c with
  | .empty => .played (.occupied p)
  | .occupied q => .blocked q

def playExcept (p : Player) (c : Cell) : Except PlayError Cell :=
  match play p c with
  | .played d => .ok d
  | .blocked q => .error (.occupied q)

def sameOutcome (a b : Except PlayError Cell) : Bool :=
  match a, b with
  | .ok c, .ok d => c == d
  | .error e, .error f => e == f
  | _, _ => false

theorem other_twice (p : Player) : other (other p) = p := by
  cases p <;> rfl

theorem play_empty (p : Player) :
    playExcept p .empty = .ok (.occupied p) := rfl

theorem play_occupied (p q : Player) :
    playExcept p (.occupied q) = .error (.occupied q) := rfl

end LvtTypes
