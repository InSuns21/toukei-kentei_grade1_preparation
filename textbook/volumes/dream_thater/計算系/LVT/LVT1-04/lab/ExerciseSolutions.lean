import LvtRecursion
open LvtRecursion

#guard ([3, 0, 2] : List Nat) == 3 :: (0 :: (2 :: []))
#guard sumList [3, 0, 2] == 5
#guard sumList [9, 8] == 17
#guard byTwos 8 == 0
#guard byTwos 5 == 1

def countTrue : List Bool → Nat
  | [] => 0
  | b :: bs => (if b then 1 else 0) + countTrue bs

#guard countTrue [true, false, true] == 2
#guard countTrue [] == 0

theorem count_false (bs : List Bool) :
    countTrue (false :: bs) = countTrue bs := by
  change 0 + countTrue bs = countTrue bs
  exact Nat.zero_add (countTrue bs)

def byThrees (n : Nat) : Nat :=
  if n < 3 then n else byThrees (n - 3)
termination_by n
decreasing_by omega

#guard byThrees 10 == 1
#guard byThrees 2 == 2

def firstPositive : List Nat → Option Nat
  | [] => none
  | x :: xs => if x > 0 then some x else firstPositive xs

#guard firstPositive [0, 0, 4, 6] == some 4
#guard firstPositive [0, 0] == none
#guard firstPositive [] == none
#guard firstPositive [4, 6] == some 4
