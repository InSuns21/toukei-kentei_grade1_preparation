import LvtGame
open LvtGame
#eval (play initial 8).isSome
#eval (play initial 9).isNone
#eval decide (Wins (after [2,0,4,1,6]).board .x)
#eval decide (Wins (after [0,3,1,4,8,5]).board .o)

theorem rangeObservation (s : State) (n : Nat) (h : ¬ n < 9) :
    (play s n).isNone = true := by
  simp [reject_range s n h]

#check rangeObservation
#print axioms rangeObservation
