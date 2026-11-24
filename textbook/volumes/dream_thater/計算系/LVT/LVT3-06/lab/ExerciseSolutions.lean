import LvtGame
open LvtGame
theorem a01 : (boardList initial).length = 9 := nine_cells initial
theorem a02 : play initial 9 = none := reject_range initial 9 (by decide)
theorem a03 : Wins (after [2,0,4,1,6]).board .x := by decide
theorem a04 : play (after [0]) 0 = none :=
  reject_occupied (after [0]) 0 (by decide)
theorem b01 (s : State) (i j : Fin 9) (h : j ≠ i) :
    (moved s i).board j = s.board j := write_else s.board i j (mark s.turn) h
theorem b02 : attempt (after [2,0,4,1,6]) 8 = after [2,0,4,1,6] :=
  rejected_unchanged _ _ (reject_finished _ _ (Or.inl a03))
theorem b03 : Full (after [0,1,2,4,3,5,7,6,8]).board ∧
    ¬ Wins (after [0,1,2,4,3,5,7,6,8]).board .x ∧
    ¬ Wins (after [0,1,2,4,3,5,7,6,8]).board .o := by decide
theorem c01 {s : State} (h : Reachable s) :
    ¬ (Wins s.board .x ∧ Wins s.board .o) ∧ (boardList s).length = 9 :=
  ⟨reachable_no_dual h, nine_cells s⟩
#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
