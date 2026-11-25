namespace LvtCapstone

inductive State where
  | draft | reviewed | published
  deriving DecidableEq, Repr

inductive Action where
  | review | publish | reset
  deriving DecidableEq, Repr

def step (s : State) (a : Action) : State × Bool :=
  match s, a with
  | _, .reset => (.draft, true)
  | .draft, .review => (.reviewed, true)
  | .reviewed, .publish => (.published, true)
  | _, _ => (s, false)

theorem publishAccepted (s : State) :
    (step s .publish).2 = true ↔ s = .reviewed := by
  cases s <;> simp [step]

theorem publishTarget (s : State) (h : s = .reviewed) :
    (step s .publish).1 = .published := by
  subst s
  rfl

theorem rejectKeeps (s : State) (a : Action) :
    (step s a).2 = false → (step s a).1 = s := by
  cases s <;> cases a <;> simp [step]

end LvtCapstone
