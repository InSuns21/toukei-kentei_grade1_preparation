import LvtGame
open LvtGame
#eval boardList (after [2,0,4,1,6])
#eval decide (Wins (after [2,0,4,1,6]).board .x)
#eval (play (after [2,0,4,1,6]) 8).isNone
#eval boardList (after [0,1,2,4,3,5,7,6,8])
#check Reachable.step
#print axioms write_here
#print axioms write_else
#print axioms reject_finished
#print axioms reject_range
#print axioms reject_occupied
#print axioms success_spec
#print axioms legal_success
#print axioms old_opponent_cell
#print axioms old_opponent_line
#print axioms old_opponent_win
#print axioms success_no_dual
#print axioms reachable_no_dual
#print axioms nine_cells
#print axioms rejected_unchanged
