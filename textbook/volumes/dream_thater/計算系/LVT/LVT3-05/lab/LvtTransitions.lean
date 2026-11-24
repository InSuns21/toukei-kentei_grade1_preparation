namespace LvtTransitions

-- The natural-number reachability rules and induction principle from LVT2-06,
-- reproduced verbatim for the self-contained single-file browser experiment.
inductive ReachL (r : Nat → Nat → Prop) (s : Nat) : Nat → Prop where
  | base : ReachL r s s
  | step {x y : Nat} : ReachL r s x → r x y → ReachL r s y

theorem reach_invariant {r : Nat → Nat → Prop} {s t : Nat}
    (P : Nat → Prop) (init : P s)
    (preserve : ∀ x y, P x → r x y → P y)
    (h : ReachL r s t) : P t := by
  induction h with
  | base => exact init
  | @step x y hx e ih => exact preserve x y ih e

inductive Action where
  | up
  | down
  deriving Repr, DecidableEq

def advance (s : Nat) (a : Action) : Option Nat :=
  match a with
  | .up => if s + 2 ≤ 4 then some (s + 2) else none
  | .down => if 2 ≤ s then some (s - 2) else none

def Step (s t : Nat) : Prop :=
  ∃ a : Action, advance s a = some t

def Reachable (s : Nat) : Prop := ReachL Step 0 s

def IsInductive (r : Nat → Nat → Prop) (initial : Nat)
    (P : Nat → Prop) : Prop :=
  P initial ∧ ∀ s t, P s → r s t → P t

def Good (s : Nat) : Prop := s = 0 ∨ s = 2 ∨ s = 4

theorem good_step (s t : Nat) (hs : Good s) (e : Step s t) : Good t := by
  change ∃ a : Action, advance s a = some t at e
  change s = 0 ∨ s = 2 ∨ s = 4 at hs
  rcases e with ⟨a, ha⟩
  rcases hs with rfl | rfl | rfl <;> cases a <;>
    simp [advance] at ha <;> subst t <;> simp [Good]

theorem goodInductive : IsInductive Step 0 Good :=
  ⟨Or.inl rfl, good_step⟩

theorem reachableGood {s : Nat} (h : Reachable s) : Good s :=
  reach_invariant Good goodInductive.1 goodInductive.2 h

theorem reachTwo : Reachable 2 :=
  ReachL.step ReachL.base ⟨.up, rfl⟩

theorem reachFour : Reachable 4 :=
  ReachL.step reachTwo ⟨.up, rfl⟩

theorem reachExact (s : Nat) : Reachable s ↔ Good s := by
  constructor
  · exact reachableGood
  · intro h
    change s = 0 ∨ s = 2 ∨ s = 4 at h
    rcases h with rfl | rfl | rfl
    · exact ReachL.base
    · exact reachTwo
    · exact reachFour

theorem reachBound {s : Nat} (h : Reachable s) : s ≤ 4 := by
  have hg : s = 0 ∨ s = 2 ∨ s = 4 := reachableGood h
  rcases hg with rfl | rfl | rfl <;> decide

def AvoidOne (s : Nat) : Prop := s ≠ 1

theorem avoidOneReach {s : Nat} (h : Reachable s) : AvoidOne s := by
  have hg : s = 0 ∨ s = 2 ∨ s = 4 := reachableGood h
  rcases hg with rfl | rfl | rfl <;> simp [AvoidOne]

theorem avoidOneNotInductive : ¬ IsInductive Step 0 AvoidOne := by
  intro h
  have bad : AvoidOne 1 := h.2 3 1 (by simp [AvoidOne]) ⟨.down, rfl⟩
  exact bad rfl

end LvtTransitions
