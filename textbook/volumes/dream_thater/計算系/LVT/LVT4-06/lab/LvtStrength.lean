import LvtGame
open LvtGame
namespace LvtStrength

def rotateInput (n : Nat) : Nat := if n < 9 then 8 - n else n

theorem rotateInput_twice (n : Nat) : rotateInput (rotateInput n) = n := by
  by_cases h : n < 9
  · have h' : 8 - n < 9 := by omega
    simp [rotateInput, h, h'] <;> omega
  · simp [rotateInput, h]

def rotateIndex (i : Fin 9) : Fin 9 := ⟨8 - i.val, by omega⟩

def rotateState (s : State) : State :=
  ⟨fun i => s.board (rotateIndex i), s.turn⟩

def sameState (s t : State) : Bool :=
  decide (boardList s = boardList t) && decide (s.turn = t.turn)

def rotateCheck (s : State) (n : Nat) : Bool :=
  match play s n, play (rotateState s) (rotateInput n) with
  | none, none => true
  | some t, some u => sameState (rotateState t) u
  | _, _ => false

def accept (s : State) (n : Nat) : Bool := (play s n).isSome

def skipOccupied (s : State) (n : Nat) : Bool :=
  decide (¬ Finished s ∧ n < 9)

def skipFinished (s : State) (n : Nat) : Bool :=
  if h : n < 9 then decide (s.board ⟨n, h⟩ = .empty) else false

def wrapRange (s : State) (n : Nat) : Bool :=
  if Finished s then false
  else decide (s.board ⟨n % 9, Nat.mod_lt _ (by decide)⟩ = .empty)

def route (s : State) (n : Nat) : Nat :=
  if Finished s then 0
  else if h : n < 9 then
    if s.board ⟨n, h⟩ = .empty then 3 else 2
  else 1

def suite : List (State × Nat) :=
  [(initial, 0), (after [0], 0), (initial, 9), (after [0,3,1,4,2], 8)]

def mutants : List (State → Nat → Bool) :=
  [skipOccupied, skipFinished, wrapRange]

def matrix (ts : List (State × Nat)) : List (List Bool) :=
  ts.map (fun (s,n) => (accept s n) :: mutants.map (fun m => m s n))

def kills (ts : List (State × Nat)) : Nat :=
  (mutants.filter (fun m => ts.any (fun (s,n) => m s n != accept s n))).length

def covered (ts : List (State × Nat)) : Nat :=
  ([0,1,2,3].filter (fun k => ts.any (fun (s,n) => route s n == k))).length

def checks : Bool :=
  matrix suite == [[true,true,true,true],[false,true,false,false],
    [false,false,false,true],[false,false,true,false]] &&
  kills suite == 3 && covered suite == 4 &&
  kills (suite.take 2) == 1 && covered (suite.take 2) == 2 &&
  suite.all (fun (s,n) => rotateCheck s n) &&
  rotateCheck (after [0,4]) 2 && rotateCheck (after [1,4]) 7 &&
  rotateInput 9 == 9 && rotateInput 3 == 5

#guard checks
#eval matrix suite
#eval kills suite
#eval covered suite
#print axioms rotateInput_twice

end LvtStrength
