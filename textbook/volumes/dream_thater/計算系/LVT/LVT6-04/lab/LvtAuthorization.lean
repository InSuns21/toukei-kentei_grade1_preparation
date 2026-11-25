namespace LvtAuthorization

inductive Role where
  | viewer | editor
  deriving Repr, DecidableEq

inductive Action where
  | read | write
  deriving Repr, DecidableEq

structure Request where
  role : Role
  action : Action
  blocked : Bool
  deriving Repr, DecidableEq

inductive Rule where
  | readPermit | writePermit | suspendForbid
  deriving Repr, DecidableEq

def permitMatch (r : Request) : Rule → Bool
  | .readPermit => decide (r.action = .read)
  | .writePermit => decide (r.role = .editor) && decide (r.action = .write)
  | .suspendForbid => false

def forbidMatch (r : Request) : Rule → Bool
  | .suspendForbid => r.blocked
  | _ => false

def hasPermit (r : Request) (ps : List Rule) : Bool :=
  ps.any (permitMatch r)

def hasForbid (r : Request) (ps : List Rule) : Bool :=
  ps.any (forbidMatch r)

def authorize (r : Request) (ps : List Rule) : Bool :=
  if hasForbid r ps then false else hasPermit r ps

theorem allowIff (r : Request) (ps : List Rule) :
    authorize r ps = true ↔ hasPermit r ps = true ∧ hasForbid r ps = false := by
  cases hp : hasPermit r ps <;> cases hf : hasForbid r ps <;>
    simp [authorize, hp, hf]

theorem defaultDeny (r : Request) (ps : List Rule)
    (h : hasPermit r ps = false) : authorize r ps = false := by
  cases hf : hasForbid r ps <;> simp [authorize, h, hf]

theorem forbidDominates (r : Request) (ps : List Rule)
    (h : hasForbid r ps = true) : authorize r ps = false := by
  simp [authorize, h]

theorem prependSuspended (r : Request) (ps : List Rule)
    (h : r.blocked = true) : authorize r (.suspendForbid :: ps) = false := by
  apply forbidDominates
  simp [hasForbid, forbidMatch, h]

end LvtAuthorization
