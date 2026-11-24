import LvtGame
open LvtGame

theorem a01 : (play initial 8).isSome = true ∧
    (play initial 9).isSome = false := by decide

theorem a02 : (play (after [0]) 0).isNone = true ∧
    (play (after [0]) 1).isNone = false := by decide

theorem a03 : Wins (after [0,3,1,4,8,5]).board .o ∧
    ¬ Wins (after [0,3,1,4,8,5]).board .x := by decide

theorem a04 : (play (after [2,0,4,1,6]) 8).isSome = false := by decide

def correctRange (n : Nat) : Bool := decide (n < 9)
def badRange (n : Nat) : Bool := decide (n ≤ 9)

theorem b01 : correctRange 0 = badRange 0 ∧
    correctRange 8 = badRange 8 ∧
    correctRange 9 ≠ badRange 9 ∧
    correctRange 10 = badRange 10 := by decide

theorem b02 (s : State) : (play s 12).isNone = true := by
  simp [reject_range s 12 (by decide)]

theorem b03 : (play initial 9).isSome = false := by decide

theorem c01 : Full (after [0,1,2,4,3,5,7,6,8]).board ∧
    ¬ Wins (after [0,1,2,4,3,5,7,6,8]).board .x ∧
    ¬ Wins (after [0,1,2,4,3,5,7,6,8]).board .o ∧
    (play (after [0,1,2,4,3,5,7,6,8]) 0).isNone = true := by decide

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
