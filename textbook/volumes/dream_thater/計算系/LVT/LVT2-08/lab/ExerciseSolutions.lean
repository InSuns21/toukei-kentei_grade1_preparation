import LvtAutomation
open LvtAutomation
namespace LvtAutomationExercises
theorem exA01 (a b c : Nat) (h₁ : a ≤ b) (h₂ : b ≤ c) :
    a ≤ c := Nat.le_trans h₁ h₂

theorem exA02search (n : Nat) : n ≤ n := by exact?
#check Nat.le_refl
theorem exA02 (n : Nat) : n ≤ n := Nat.le_refl n

theorem exA03a : (5 : Nat) ≤ 7 := by decide
theorem exA03b : ¬ ((8 : Nat) ≤ 7) := by decide

theorem exA04a (n : Nat) : n + 0 = n := by simp
theorem exA04b (n : Nat) : n ≤ n + 1 := by omega

theorem exB01 (used cap : Nat) (h : used + 2 ≤ cap) :
    used + 1 ≤ cap := by
  have h₁ : used + 1 ≤ used + 2 := by omega
  exact Nat.le_trans h₁ h
theorem exB01a : (2 : Nat) + 1 ≤ 3 := by decide
theorem exB01b : ¬ ((2 : Nat) + 2 ≤ 3) := by decide

theorem exB02 : ¬ (∀ a b c : Nat, a ≤ b → a ≤ c) := by
  intro h
  have bad : 2 ≤ 1 := h 2 2 1 (by decide)
  exact (by decide : ¬ ((2 : Nat) ≤ 1)) bad

-- B03 is exercised by TrustDemo.lean, not imported here.

def goodCheck (n cap : Nat) : Bool := decide (n ≤ cap)
theorem exB04a : alwaysAccept 3 2 = true := rfl
theorem exB04b : goodCheck 3 2 = false := by decide
theorem exB04 (n cap : Nat) (h : goodCheck n cap = true) :
    n ≤ cap := by
  change decide (n ≤ cap) = true at h
  exact of_decide_eq_true h

def checkRoom (used cap : Nat) : Bool := decide (used < cap)

theorem exC01a (used cap : Nat) (h : checkRoom used cap = true) :
    used + 1 ≤ cap := by
  change decide (used < cap) = true at h
  exact nextWithin used cap (of_decide_eq_true h)

theorem exC01b (used cap : Nat) (h₀ : used ≤ cap)
    (h : checkRoom used cap = false) : used = cap := by
  change decide (used < cap) = false at h
  have hn : ¬ (used < cap) := of_decide_eq_false h
  omega

theorem exC01c : alwaysAccept 2 2 = true := rfl
theorem exC01d : ¬ ((2 : Nat) + 1 ≤ 2) := by decide
theorem exC01e : checkRoom 3 2 = false := by decide
theorem exC01f : (3 : Nat) ≠ 2 := by decide

#print axioms exA01
#print axioms exA02search
#print axioms exA02
#print axioms exA03a
#print axioms exA03b
#print axioms exA04a
#print axioms exA04b
#print axioms exB01
#print axioms exB01a
#print axioms exB01b
#print axioms exB02
#print axioms exB04a
#print axioms exB04b
#print axioms exB04
#print axioms exC01a
#print axioms exC01b
#print axioms exC01c
#print axioms exC01d
#print axioms exC01e
#print axioms exC01f
end LvtAutomationExercises
