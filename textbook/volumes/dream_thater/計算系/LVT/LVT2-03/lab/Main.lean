import LvtEquality
open LvtEquality
example (n : Nat) : normalize n = n := normalize_eq n
example : normalize 7 = 7 := normalize_eq 7
example : normalize 7 = 7 := preserve (fun n => n = 7) 7 rfl
example (a b c : Nat) (h : a = b) (k : b = c) : c = a :=
  reverseEq (chainEq h k)
example (f : Nat → Nat) (a b : Nat) (h : a = b) : f a = f b :=
  liftEq f h
#guard normalize 7 == 7
def main : IO Unit := IO.println "LVT2-03 OK"
