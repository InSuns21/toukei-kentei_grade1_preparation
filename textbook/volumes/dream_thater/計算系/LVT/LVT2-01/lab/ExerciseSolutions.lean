import LvtDecision
open LvtDecision

#check true
#check False
#check (3 = 3)
#check True.intro
example : 1 + 2 = 3 := rfl
example (p : Prop) : p → p := fun h => h
#guard !(decisionBool False noExample)

example (p : Prop) (d : Decidable p)
    (h : decisionBool p d = false) : ¬ p := by
  intro hp
  cases d with
  | isTrue hTrue =>
    have bad : true = false := h
    cases bad
  | isFalse hn => exact hn hp

example (p : Prop) (d : Decidable p)
    (hn : ¬ p) : decisionBool p d = false := by
  cases d with
  | isTrue hp => exact False.elim (hn hp)
  | isFalse h => rfl

def reject (_n _k : Nat) : Bool := false
example (n k : Nat) (h : reject n k = true) : n = k := by
  have bad : false = true := h
  cases bad
#guard !(reject 0 0)

def valid (n : Nat) : Bool := decide (n < 9)
def shortValid (n : Nat) : Bool := decide (n < 8)
example (n : Nat) (h : valid n = true) : n < 9 := of_decide_eq_true h
example (n : Nat) (h : n < 9) : valid n = true := decide_eq_true h
example (n : Nat) (h : shortValid n = true) : n < 9 :=
  Nat.lt_trans (of_decide_eq_true h : n < 8) (by decide)
#guard valid 0 && shortValid 0
#guard valid 7 && shortValid 7
#guard valid 8 && !(shortValid 8)
#guard !(valid 9) && !(shortValid 9)
