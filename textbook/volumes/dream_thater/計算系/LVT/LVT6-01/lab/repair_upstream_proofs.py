"""Repair only proof scripts/check syntax in the pinned upstream checkout."""
from pathlib import Path
import sys

path = Path(sys.argv[1]) / "lean_spec/TicTacToe/Proofs.lean"
source = path.read_text(encoding="utf-8")

def replace_once(old, new):
    global source
    assert source.count(old) == 1, old
    source = source.replace(old, new)

replace_once("""  unfold applyMove
  simp [hdone]""", """  have hb : (s.status != .ongoing) = true := by
    cases hs : s.status with
    | ongoing => exact False.elim (hdone hs)
    | won p => rfl
    | draw => rfl
  simp [applyMove, hb]""")
replace_once("""  unfold applyMove
  simp [hongoing, hge]""", """  have hb : (s.status != .ongoing) = false := by
    rw [hongoing]
    rfl
  simp [applyMove, hb, hge]""")
replace_once("""      · cases h
      · split at h""", """      · cases h
      · dsimp only at h
        split at h""")
# The nested bullets retain the same indentation as 'split at h'.
replace_once('#guard playMoves [0, 0] == .error "cell_occupied"', """#guard match playMoves [0, 0] with
  | .error e => e == "cell_occupied"
  | .ok _ => false""")
replace_once('#guard playMoves [0, 3, 1, 4, 2, 5] == .error "game_over"', """#guard match playMoves [0, 3, 1, 4, 2, 5] with
  | .error e => e == "game_over"
  | .ok _ => false""")
path.write_text(source, encoding="utf-8")
