import LvtEquality
open LvtEquality

-- LVT2-03-A01
example : (fun n : Nat => n + 2) 3 = 5 := rfl

-- LVT2-03-A02
example (n : Nat) : n + 0 = n := rfl
example (n : Nat) : 0 + n = n := Nat.zero_add n

-- LVT2-03-A03
example (a b : Nat) (h : a = b) : b = a := Eq.symm h

-- LVT2-03-A04
example (P : Nat → Prop) (a b : Nat) (h : a = b) (hb : P b) :
    P a := Eq.subst (Eq.symm h) hb

-- LVT2-03-A05
example (P : Nat → Prop) (a b : Nat) (h : a = b) (hp : P a) :
    P b := by
  rw [h] at hp
  exact hp

-- LVT2-03-B01
example (f : Nat → Nat) (a b c : Nat) (h : a = b) (k : c = b) :
    f a = f c := congrArg f (Eq.trans h (Eq.symm k))

-- LVT2-03-B02
example (n : Nat) : 0 + ((0 + n) + 0) = n := by
  simp only [Nat.zero_add, Nat.add_zero]

-- LVT2-03-B03
example : (fun _ : Nat => 0) 1 = (fun _ : Nat => 0) 2 := rfl
example : ¬ ((1 : Nat) = 2) := by
  intro h
  have h0 : (0 : Nat) = 1 := Nat.succ.inj h
  cases h0

-- LVT2-03-C01
example (f : Nat → Nat) (n : Nat) :
    f (normalize (normalize n)) = f n :=
  congrArg f (Eq.trans (normalize_eq (normalize n)) (normalize_eq n))
example (P : Nat → Prop) (n : Nat) (hp : P (normalize (normalize n))) :
    P n := Eq.subst (Eq.trans (normalize_eq (normalize n)) (normalize_eq n)) hp
example : (1 : Nat) = 1 := rfl
example : ¬ ((fun _ : Nat => 0) 1 = 1) := by
  intro h
  cases h
