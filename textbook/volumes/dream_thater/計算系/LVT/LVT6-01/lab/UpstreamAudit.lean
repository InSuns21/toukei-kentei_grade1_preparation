import TicTacToe.Proofs

open TicTacToe
namespace LvtUpstreamAudit

inductive Reach : GameState → Prop where
  | base : Reach initialState
  | step {s t : GameState} {pos : Nat} :
      Reach s → applyMove s pos = .ok t → Reach t

theorem reachableNine {s : GameState} (h : Reach s) : s.board.length = 9 := by
  induction h with
  | base => exact initial_board_length
  | step hs hm ih => exact (applyMove_preserves_board_length _ _ _ hm).trans ih

def shortState : GameState :=
  {board := [], turn := .X, status := .ongoing}

#guard match applyMove shortState 0 with
  | .ok s => s.board.length == 0 && s.status == .draw && s.turn == .X
  | .error _ => false

#guard match applyMove {board := [none], turn := .O, status := .ongoing} 0 with
  | .ok s => s.board == [some .O] && s.status == .draw && s.turn == .O
  | .error _ => false

#guard match applyMove {initialState with status := .draw} 9 with
  | .error e => e == "game_over"
  | .ok _ => false

def inconsistent : GameState :=
  {board := [some .X, some .X, some .X, none, none, none, none, none, none],
   turn := .O, status := .ongoing}

#guard match applyMove inconsistent 3 with
  | .ok s => s.status == .ongoing && s.turn == .X && cellAt s.board 3 == some .O
  | .error _ => false

#print axioms reachableNine

end LvtUpstreamAudit
