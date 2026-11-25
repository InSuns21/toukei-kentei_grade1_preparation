import LvtGame
open LvtGame
namespace LvtShrink

-- Stop at the first rejection; require it to be the last move,
-- in range and before the game finishes.
def failureFrom (s : State) : List Nat → Bool
  | [] => false
  | n :: ns =>
    match play s n with
    | some t => failureFrom t ns
    | none => ns.isEmpty && decide (¬ Finished s ∧ n < 9)

def failure (xs : List Nat) : Bool := failureFrom initial xs

def deletions : List Nat → List (List Nat)
  | [] => []
  | a :: as => as :: (deletions as).map (fun ys => a :: ys)

def firstFail (g : List Nat → Bool) : List (List Nat) → Option (List Nat)
  | [] => none
  | xs :: rest => if g xs then some xs else firstFail g rest

theorem firstFail_sound (g : List Nat → Bool) (cs : List (List Nat))
    (ys : List Nat) (h : firstFail g cs = some ys) : g ys = true := by
  induction cs with
  | nil => simp [firstFail] at h
  | cons x xs ih =>
    by_cases hx : g x = true
    · have e : x = ys := by simpa [firstFail, hx] using h
      exact e ▸ hx
    · have hr : firstFail g xs = some ys := by simpa [firstFail, hx] using h
      exact ih hr

def shrinkTrace (g : List Nat → Bool) : Nat → List Nat → List (List Nat)
  | 0, xs => [xs]
  | k + 1, xs =>
    match firstFail g (deletions xs) with
    | none => [xs]
    | some ys => xs :: shrinkTrace g k ys

def shrink (g : List Nat → Bool) (xs : List Nat) : List (List Nat) :=
  if g xs then shrinkTrace g xs.length xs else []

def start : List Nat := [2,0,4,1,2]
def localTrap (xs : List Nat) : Bool := xs.length == 1 || xs.length == 3

def checks : Bool :=
  failure start &&
  shrink failure start == [[2,0,4,1,2],[2,4,1,2],[2,1,2],[2,2]] &&
  shrink failure [7,0,6,7] == [[7,0,6,7],[7,6,7],[7,7]] &&
  deletions [3,1,3] == [[1,3],[3,3],[3,1]] &&
  firstFail failure (deletions [3,3]) == none &&
  failure [4,4] && !(failure [4,9]) && !(failure [4,4,0]) &&
  !(failure []) && !(failure [2]) &&
  shrink localTrap [0,1,2] == [[0,1,2]] && localTrap [0]

#guard checks
#eval shrink failure start
#eval (deletions [2,2]).map failure
#eval shrink localTrap [0,1,2]
#print axioms firstFail_sound

end LvtShrink
