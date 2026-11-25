import LvtContracts

namespace LvtStateful

def trace {S A B : Type} (f : S → A → B × S) (s : S) :
    List A → List (B × S)
  | [] => []
  | a :: as => f s a :: trace f (f s a).2 as

def finish {S A B : Type} (f : S → A → B × S) (s : S) :
    List A → S
  | [] => s
  | a :: as => finish f (f s a).2 as

theorem traceAppend {S A B : Type} (f : S → A → B × S)
    (s : S) (u v : List A) :
    trace f s (u ++ v) = trace f s u ++ trace f (finish f s u) v := by
  induction u generalizing s with
  | nil => rfl
  | cons a as ih =>
    simp only [List.cons_append, trace, finish, ih]

theorem traceLength {S A B : Type} (f : S → A → B × S)
    (s : S) (u : List A) : (trace f s u).length = u.length := by
  induction u generalizing s with
  | nil => rfl
  | cons a as ih => simp [trace, ih]

inductive Op where
  | add | remove | reset | stop
  deriving Repr, DecidableEq

abbrev State := Nat × Bool
def step (s : State) (a : Op) : Bool × State :=
  if s.2 then (false, s) else
    match a with
    | .add => if s.1 < 2 then (true, (s.1+1, false)) else (false, s)
    | .remove => if 0 < s.1 then (true, (s.1-1, false)) else (false, s)
    | .reset => (true, (0, false))
    | .stop => (true, (s.1, true))

#guard trace step (0,false) [.add,.add,.add] ==
  [(true,(1,false)),(true,(2,false)),(false,(2,false))]
#guard trace step (0,false) [.remove,.reset,.stop,.add] ==
  [(false,(0,false)),(true,(0,false)),(true,(0,true)),(false,(0,true))]
#print axioms traceAppend
#print axioms traceLength

end LvtStateful
