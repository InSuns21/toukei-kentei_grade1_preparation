namespace LvtDecision

theorem selfImp (p : Prop) : p → p := fun h => h
theorem fixedEquality : 1 + 1 = 2 := rfl
def yesExample : Decidable (2 = 2) := .isTrue rfl
def noExample : Decidable False := .isFalse (fun h => h)
def decisionBool (p : Prop) (d : Decidable p) : Bool :=
  match d with
  | .isTrue _ => true
  | .isFalse _ => false

theorem sound (p : Prop) (d : Decidable p)
    (h : decisionBool p d = true) : p := by
  cases d with
  | isTrue hp => exact hp
  | isFalse hn =>
    have bad : false = true := h
    cases bad

theorem complete (p : Prop) (d : Decidable p)
    (hp : p) : decisionBool p d = true := by
  cases d with
  | isTrue h => rfl
  | isFalse hn => exact False.elim (hn hp)

theorem standardSound (p : Prop) [Decidable p]
    (h : decide p = true) : p := of_decide_eq_true h

theorem standardComplete (p : Prop) [Decidable p]
    (h : p) : decide p = true := decide_eq_true h

def sameNumber (n k : Nat) : Bool := decide (n = k)
def wrongMatches (_n _k : Nat) : Bool := true

theorem matchesSound (n k : Nat) (h : sameNumber n k = true) :
    n = k := of_decide_eq_true h

theorem matchesComplete (n k : Nat) (h : n = k) :
    sameNumber n k = true := decide_eq_true h

end LvtDecision
