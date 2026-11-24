import Lean

namespace LvtRecursion

def firstOrZero (xs : List Nat) : Nat :=
  match xs with
  | [] => 0
  | x :: _ => x

def sumList : List Nat → Nat
  | [] => 0
  | x :: xs => x + sumList xs

theorem sum_nil : sumList [] = 0 := rfl

theorem sum_cons (x : Nat) (xs : List Nat) :
    sumList (x :: xs) = x + sumList xs := rfl

def byTwos (n : Nat) : Nat :=
  if n < 2 then n else byTwos (n - 2)
termination_by n
decreasing_by omega

def down : Nat → Nat
  | 0 => 0
  | Nat.succ n => down n

end LvtRecursion
