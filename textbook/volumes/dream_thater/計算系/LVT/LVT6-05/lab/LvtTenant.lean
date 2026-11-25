namespace LvtTenant

inductive Role where
  | viewer | editor | admin
  deriving Repr, DecidableEq
inductive Action where
  | read | update | delete
  deriving Repr, DecidableEq

structure Request where
  role : Role
  action : Action
  sameTenant : Bool
  isOwner : Bool
  authenticated : Bool
  deriving Repr, DecidableEq

def Permitted (r : Request) : Prop :=
  r.authenticated = true ∧ r.sameTenant = true ∧
    (r.role = .admin ∨ r.action = .read ∨
      (r.role = .editor ∧ r.action = .update ∧ r.isOwner = true))

def decideAccess (r : Request) : Bool :=
  if !r.authenticated then false
  else if !r.sameTenant then false
  else match r.role, r.action with
  | .admin, _ => true
  | _, .read => true
  | .editor, .update => r.isOwner
  | _, _ => false

theorem allowIff (r : Request) : decideAccess r = true ↔ Permitted r := by
  rcases r with ⟨role, act, tenant, owner, auth⟩
  cases role <;> cases act <;> cases tenant <;> cases owner <;> cases auth <;>
    simp [decideAccess, Permitted]

theorem soundness (r : Request) (h : decideAccess r = true) : Permitted r :=
  (allowIff r).mp h

theorem completeness (r : Request) (h : Permitted r) : decideAccess r = true :=
  (allowIff r).mpr h

def decideInput (r : Option Request) : Bool :=
  match r with
  | none => false
  | some req => decideAccess req

theorem invalidDenied : decideInput none = false := rfl

inductive Phase where
  | raw | normalized | authenticated | checked | effect
  deriving Repr, DecidableEq

def trace (valid : Bool) (r : Request) : List Phase :=
  if !valid then [.raw]
  else if !r.authenticated then [.raw, .normalized]
  else if !decideAccess r then [.raw, .normalized, .authenticated]
  else [.raw, .normalized, .authenticated, .checked, .effect]

theorem traceSafe (valid : Bool) (r : Request)
    (h : Phase.effect ∈ trace valid r) :
    valid = true ∧ r.authenticated = true ∧ decideAccess r = true ∧
      trace valid r = [.raw, .normalized, .authenticated, .checked, .effect] ∧
      Permitted r := by
  cases valid <;> cases ha : r.authenticated <;> cases hd : decideAccess r <;>
    simp [trace, ha, hd] at h ⊢
  exact soundness r hd

end LvtTenant
