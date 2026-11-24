import Lean

namespace LvtBoundary

abbrev Board := Fin 9 → Bool

def emptyBoard : Board := fun _ => false

def writeMark (b : Board) (i : Fin 9) : Board :=
  fun j => if j.val = i.val then true else b j

def place (b : Board) (i : Fin 9) : Option Board :=
  if b i then none else some (writeMark b i)

theorem place_occupied (b : Board) (i : Fin 9) (h : b i = true) :
    place b i = none := by
  simp [place, h]

theorem place_empty (b : Board) (i : Fin 9) (h : b i = false) :
    place b i = some (writeMark b i) := by
  simp [place, h]

theorem write_here (b : Board) (i : Fin 9) :
    writeMark b i i = true := by
  simp [writeMark]

theorem write_elsewhere (b : Board) (i j : Fin 9) (h : j.val ≠ i.val) :
    writeMark b i j = b j := by
  simp [writeMark, h]

inductive RequestError where
  | malformed
  | outOfRange
  | occupied
  deriving Repr, BEq

def decode (raw : String) : Except RequestError (Fin 9) :=
  match raw.toNat? with
  | none => .error .malformed
  | some n =>
    if h : n < 9 then .ok ⟨n, h⟩ else .error .outOfRange

def runRequest (b : Board) (raw : String) : Except RequestError Board :=
  match decode raw with
  | .error e => .error e
  | .ok i =>
    match place b i with
    | none => .error .occupied
    | some next => .ok next

theorem rejected_before_place (b : Board) (raw : String) (e : RequestError)
    (h : decode raw = .error e) :
    runRequest b raw = .error e := by
  simp [runRequest, h]

def boardText (b : Board) : String :=
  String.intercalate "" (([0, 1, 2, 3, 4, 5, 6, 7, 8] : List (Fin 9)).map
    (fun i => if b i then "1" else "0"))

def reply (res : Except RequestError Board) : String :=
  match res with
  | .error .malformed => "error malformed"
  | .error .outOfRange => "error outOfRange"
  | .error .occupied => "error occupied"
  | .ok next => "ok " ++ boardText next

-- Deliberate defect: interprets positive inputs as one-based.
def wrongDecode (raw : String) : Except RequestError (Fin 9) :=
  match raw.toNat? with
  | none => .error .malformed
  | some 0 => .error .outOfRange
  | some (Nat.succ n) =>
    if h : n < 9 then .ok ⟨n, h⟩ else .error .outOfRange

end LvtBoundary
