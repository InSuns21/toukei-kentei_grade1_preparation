import LvtEquality
open LvtEquality
example (a b : Nat) : a = b := rfl
example (a b : Nat) (h : a = b) : b = a := h
