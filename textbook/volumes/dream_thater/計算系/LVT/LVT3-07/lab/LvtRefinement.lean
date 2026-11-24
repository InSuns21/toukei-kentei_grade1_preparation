namespace LvtRefinement
inductive Count where
  | empty | one | full
  deriving Repr, DecidableEq

inductive Op where
  | put | take
  deriving Repr, DecidableEq

structure Slots where
  left : Bool
  right : Bool
  deriving Repr, DecidableEq

def decode : Slots → Count
  | ⟨false, false⟩ => .empty
  | ⟨true, true⟩ => .full
  | ⟨true, false⟩ => .one
  | ⟨false, true⟩ => .one

def spec : Count → Op → Option Count
  | .empty, .put => some .one
  | .one, .put => some .full
  | .full, .put => none
  | .empty, .take => none
  | .one, .take => some .empty
  | .full, .take => some .one

def impl : Slots → Op → Option Slots
  | ⟨false, r⟩, .put => some ⟨true, r⟩
  | ⟨true, false⟩, .put => some ⟨true, true⟩
  | ⟨true, true⟩, .put => none
  | ⟨true, r⟩, .take => some ⟨false, r⟩
  | ⟨false, true⟩, .take => some ⟨false, false⟩
  | ⟨false, false⟩, .take => none

def initial : Slots := ⟨false, false⟩

theorem initial_comm : decode initial = Count.empty := rfl

theorem step_comm (c : Slots) (a : Op) :
    (impl c a).map decode = spec (decode c) a := by
  cases c with
  | mk l r => cases l <;> cases r <;> cases a <;> rfl

def advanceA (s : Count) (a : Op) : Count :=
  (spec s a).getD s

def advanceC (c : Slots) (a : Op) : Slots :=
  (impl c a).getD c

theorem advance_comm (c : Slots) (a : Op) :
    decode (advanceC c a) = advanceA (decode c) a := by
  cases c with
  | mk l r => cases l <;> cases r <;> cases a <;> rfl

theorem accepted_comm (c : Slots) (a : Op) :
    (impl c a).isSome = (spec (decode c) a).isSome := by
  cases c with
  | mk l r => cases l <;> cases r <;> cases a <;> rfl

def runA (s : Count) : List Op → Count
  | [] => s
  | a :: xs => runA (advanceA s a) xs

def runC (c : Slots) : List Op → Slots
  | [] => c
  | a :: xs => runC (advanceC c a) xs

def obsA (s : Count) : List Op → List Bool
  | [] => []
  | a :: xs => (spec s a).isSome :: obsA (advanceA s a) xs

def obsC (c : Slots) : List Op → List Bool
  | [] => []
  | a :: xs => (impl c a).isSome :: obsC (advanceC c a) xs

theorem run_comm (c : Slots) (xs : List Op) :
    decode (runC c xs) = runA (decode c) xs := by
  induction xs generalizing c with
  | nil => rfl
  | cons a xs ih =>
    change decode (runC (advanceC c a) xs) =
      runA (advanceA (decode c) a) xs
    rw [ih, advance_comm]

theorem obs_comm (c : Slots) (xs : List Op) :
    obsC c xs = obsA (decode c) xs := by
  induction xs generalizing c with
  | nil => rfl
  | cons a xs ih =>
    change (impl c a).isSome :: obsC (advanceC c a) xs =
      (spec (decode c) a).isSome :: obsA (advanceA (decode c) a) xs
    rw [accepted_comm, ih, advance_comm]

def badImpl (c : Slots) (a : Op) : Option Slots :=
  match c, a with
  | ⟨true, true⟩, .put => some ⟨true, true⟩
  | _, _ => impl c a

theorem bad_counterexample :
    (badImpl ⟨true, true⟩ .put).map decode ≠ spec .full .put := by decide

end LvtRefinement
