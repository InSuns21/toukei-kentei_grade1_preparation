import LvtLogic
open LvtLogic

-- LVT2-02-A01
example (p q r : Prop) (f : p → q) (g : q → r) : p → r :=
  fun hp => g (f hp)

-- LVT2-02-A02
example (p q : Prop) : p ∧ q → q ∧ p :=
  fun h => And.intro h.right h.left

-- LVT2-02-A03
example (p q : Prop) : p ∨ q → q ∨ p :=
  fun h => Or.elim h (fun hp => Or.inr hp) (fun hq => Or.inl hq)

-- LVT2-02-A04
example (P : Nat → Prop) (h : ∀ n : Nat, P n) : P 5 := h 5

-- LVT2-02-A05
example : ∃ n : Nat, n + 1 = 4 := Exists.intro 3 rfl

-- LVT2-02-B01
example (P Q : Nat → Prop) (h : ∀ n, P n ∧ Q n) :
    (∀ n, P n) ∧ (∀ n, Q n) :=
  And.intro (fun n => (h n).left) (fun n => (h n).right)

-- LVT2-02-B02
example (P : Nat → Prop) (h : ∀ n, ¬ P n) : ¬ (∃ n, P n) :=
  fun e => Exists.elim e (fun n hn => h n hn)

-- LVT2-02-B03
example : ∀ x : Bool, ∃ y : Bool, y = x :=
  fun x => Exists.intro x rfl

example : ¬ (∃ y : Bool, ∀ x : Bool, y = x) :=
  fun e => Exists.elim e (fun y h => by
    cases y with
    | false =>
      have bad : false = true := h true
      cases bad
    | true =>
      have bad : true = false := h false
      cases bad)

-- LVT2-02-C01
example (Valid Owner Admin Allow : Nat → Prop)
    (fo : ∀ n, Valid n ∧ Owner n → Allow n)
    (fa : ∀ n, Valid n ∧ Admin n → Allow n) :
    ∀ n, Valid n ∧ (Owner n ∨ Admin n) → Allow n :=
  fun n h => Or.elim h.right
    (fun ho => fo n (And.intro h.left ho))
    (fun ha => fa n (And.intro h.left ha))

example : ∀ _n : Nat, False ∧ True → False := fun _ h => h.left
example : ∀ _n : Nat, False ∧ False → False := fun _ h => h.left
example : ¬ (∀ _n : Nat, True ∨ False → False) :=
  fun h => h 0 (Or.inl True.intro)
