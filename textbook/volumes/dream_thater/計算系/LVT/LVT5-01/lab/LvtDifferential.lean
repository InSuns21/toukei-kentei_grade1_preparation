import LvtContracts
open LvtContracts
namespace LvtDifferential

def consume : Nat → Nat → Option Nat
  | 0, s => some s
  | _ + 1, 0 => none
  | k + 1, s + 1 => consume k s

def candidate (o : Order) : Option Nat :=
  if o.qty = 0 then none else consume o.qty o.stock

def strict (o : Order) : Option Nat :=
  if 0 < o.qty ∧ o.qty < o.stock then some (o.stock - o.qty) else none

def wrongRest (o : Order) : Option Nat :=
  if 0 < o.qty ∧ o.qty ≤ o.stock then some o.stock else none

theorem agreeSound {Y : Type} (a b q : Y)
    (hRef : a = q) (hAgree : a = b) : b = q :=
  hAgree.symm.trans hRef

theorem disagreeNotBoth {Y : Type} (a b q : Y)
    (h : a ≠ b) : a ≠ q ∨ b ≠ q := by
  classical
  by_cases ha : a = q
  · exact Or.inr (fun hb => h (ha.trans hb.symm))
  · exact Or.inl ha

def inputs : List Order :=
  (List.range 4).flatMap (fun s => (List.range 4).map (fun k => ⟨s,k⟩))

def mismatches (g : Order → Option Nat) : Nat :=
  (inputs.filter (fun o => takeStock o != g o)).length

def acceptMismatches (g : Order → Option Nat) : Nat :=
  (inputs.filter (fun o => (takeStock o).isSome != (g o).isSome)).length

def checks : Bool :=
  inputs.length == 16 && mismatches candidate == 0 &&
  mismatches strict == 3 && mismatches wrongRest == 6 &&
  acceptMismatches wrongRest == 0

#guard checks
#eval [mismatches candidate, mismatches strict, mismatches wrongRest, acceptMismatches wrongRest]
#print axioms agreeSound
#print axioms disagreeNotBoth

end LvtDifferential
