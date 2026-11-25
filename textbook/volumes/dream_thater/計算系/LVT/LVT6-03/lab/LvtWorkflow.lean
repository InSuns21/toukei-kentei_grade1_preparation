namespace LvtWorkflow

inductive Phase where
  | draft | submitted | approved | published
  deriving Repr, DecidableEq

inductive Action where
  | submit | approve | publish | sendBack
  deriving Repr, DecidableEq

structure State where
  phase : Phase
  reviewed : Bool
  deriving Repr, DecidableEq

def initial : State := ⟨.draft, false⟩

def reviewedPhase : Phase → Bool
  | .approved | .published => true
  | .draft | .submitted => false

def consistent (s : State) : Prop :=
  s.reviewed = reviewedPhase s.phase

def step (s : State) (a : Action) : Bool × State :=
  match s.phase, a with
  | .draft, .submit => (true, ⟨.submitted, false⟩)
  | .submitted, .approve => (true, ⟨.approved, true⟩)
  | .submitted, .sendBack => (true, ⟨.draft, false⟩)
  | .approved, .publish => (true, ⟨.published, s.reviewed⟩)
  | .approved, .sendBack => (true, ⟨.draft, false⟩)
  | _, _ => (false, s)

theorem preserve (s : State) (a : Action) (h : consistent s) :
    consistent (step s a).2 := by
  cases s with
  | mk p b =>
    cases p <;> cases a <;> simp_all [step, consistent, reviewedPhase]

def run (s : State) : List Action → State
  | [] => s
  | a :: rest => run (step s a).2 rest

theorem runPreserve (s : State) (as : List Action) (h : consistent s) :
    consistent (run s as) := by
  induction as generalizing s with
  | nil => exact h
  | cons a rest ih =>
    exact ih (step s a).2 (preserve s a h)

theorem initialSafe (as : List Action) : consistent (run initial as) :=
  runPreserve initial as rfl

theorem publishSource (s : State) :
    (step s .publish).1 = true ↔ s.phase = .approved := by
  cases s with
  | mk p b => cases p <;> simp [step]

theorem rejectedUnchanged (s : State) (a : Action)
    (h : (step s a).1 = false) : (step s a).2 = s := by
  cases s with
  | mk p b => cases p <;> cases a <;> simp_all [step]

def trace (s : State) : List Action → List (Bool × State)
  | [] => []
  | a :: rest => step s a :: trace (step s a).2 rest

end LvtWorkflow
