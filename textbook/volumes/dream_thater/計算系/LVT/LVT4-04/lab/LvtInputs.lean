import LvtGame
open LvtGame
namespace LvtInputs

def replayFrom (s : State) : List Nat → Option State
  | [] => some s
  | n :: ns => match play s n with
    | none => none
    | some u => replayFrom u ns

theorem replay_reachable (moves : List Nat) (s t : State)
    (hs : Reachable s) (h : replayFrom s moves = some t) : Reachable t := by
  induction moves generalizing s with
  | nil =>
    have e : s = t := by simpa [replayFrom] using h
    exact e ▸ hs
  | cons n ns ih =>
    cases e : play s n with
    | none => simp [replayFrom, e] at h
    | some u =>
      have hu : Reachable u := Reachable.step hs n e
      have hr : replayFrom u ns = some t := by simpa [replayFrom, e] using h
      exact ih u hu hr

inductive Kind where
  | legal | occupied | outOfRange | finished
  deriving Repr, DecidableEq, BEq

def classify (s : State) (n : Nat) : Kind :=
  if Finished s then .finished
  else if hn : n < 9 then
    if s.board ⟨n, hn⟩ = .empty then .legal else .occupied
  else .outOfRange

theorem classify_legal_iff (s : State) (n : Nat) :
    classify s n = .legal ↔ (play s n).isSome = true := by
  by_cases hf : Finished s
  · simp [classify, play, hf]
  · by_cases hn : n < 9
    · by_cases he : s.board (⟨n, hn⟩ : Fin 9) = .empty
      · simp [classify, play, hf, hn, he]
      · simp [classify, play, hf, hn, he]
    · simp [classify, play, hf, hn]

theorem filtered_iff {α : Type} (d : List α) (a : α → Bool) (p : α → Prop) :
    (∀ x ∈ d.filter a, p x) ↔ (∀ x ∈ d, a x = true → p x) := by
  constructor
  · intro h x hx ha
    exact h x (List.mem_filter.mpr ⟨hx, ha⟩)
  · intro h x hx
    obtain ⟨hd, ha⟩ := List.mem_filter.mp hx
    exact h x hd ha

def legalMoves (s : State) : List Nat :=
  (List.range 9).filter (fun n => classify s n == .legal)

def histories : List (List Nat) := [[], [0], [2,0,4,1,6]]
def states (hs : List (List Nat)) : List State := hs.filterMap (replayFrom initial)
def candidates (hs : List (List Nat)) (bound : Nat) : List (State × Nat) :=
  (states hs).flatMap fun s => (List.range bound).map fun n => (s,n)
def cases30 : List (State × Nat) := candidates histories 10
def legalCases (xs : List (State × Nat)) : List (State × Nat) :=
  xs.filter fun (s,n) => classify s n == .legal
def countKind (xs : List (State × Nat)) (k : Kind) : Nat :=
  (xs.filter fun (s,n) => classify s n == k).length
def counts (xs : List (State × Nat)) : List Nat :=
  [Kind.legal, .occupied, .outOfRange, .finished].map (countKind xs)
def mismatch (accept : State → Nat → Bool) (xs : List (State × Nat)) : Nat :=
  (xs.filter fun (s,n) => accept s n != (play s n).isSome).length
def rangeOnly (_ : State) (n : Nat) : Bool := decide (n < 9)
def unfinishedOnly (s : State) (_ : Nat) : Bool := decide (¬ Finished s)

-- One representative of each disjoint input class (exercise C01).
def fourCases : List (State × Nat) :=
  [(initial, 0), (after [0], 0), (initial, 9), (after [2,0,4,1,6], 8)]

def checks : Bool :=
  (states histories).length == 3 &&
  counts cases30 == [17,1,2,10] &&
  cases30.length == 30 &&
  (legalCases cases30).length == 17 &&
  mismatch rangeOnly (legalCases cases30) == 0 &&
  mismatch rangeOnly cases30 == 10 &&
  mismatch unfinishedOnly (legalCases cases30) == 0 &&
  mismatch unfinishedOnly cases30 == 3 &&
  !(replayFrom initial [1,1]).isSome &&
  !(replayFrom initial [0,3,1,4,2,5]).isSome &&
  legalMoves (after [4]) == [0,1,2,3,5,6,7,8] &&
  counts (candidates [[],[4]] 12) == [17,1,6,0] &&
  counts fourCases == [1,1,1,1] &&
  mismatch unfinishedOnly fourCases == 2

#guard checks
#guard classify (after [2,0,4,1,6]) 10 == .finished
#guard ([0,1,2].filter (fun n : Nat => decide (n ≥ 3))).isEmpty
#guard ([0,9].filter (fun n : Nat => decide (n < 9))) == [0]
#guard (states (histories ++ [[0,0]])).length == 3

#eval counts cases30
#eval [cases30.length, (legalCases cases30).length,
  mismatch rangeOnly (legalCases cases30), mismatch rangeOnly cases30]
#eval histories.length - (states histories).length
#print axioms replay_reachable
#print axioms classify_legal_iff
#print axioms filtered_iff

end LvtInputs
