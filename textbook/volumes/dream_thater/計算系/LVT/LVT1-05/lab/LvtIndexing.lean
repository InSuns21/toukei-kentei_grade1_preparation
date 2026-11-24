import Lean

namespace LvtIndexing

def readList : List α → Nat → Option α
  | [], _ => none
  | x :: _, 0 => some x
  | _ :: xs, Nat.succ i => readList xs i

def last3 : Fin 3 := ⟨2, by decide⟩

def readArray (a : Array α) (i : Fin a.size) : α :=
  a[i.val]'(i.isLt)

def checkedArray (a : Array α) (i : Nat) : Option α :=
  if h : i < a.size then
    some (readArray a ⟨i, h⟩)
  else none

theorem checked_in (a : Array α) (i : Nat) (h : i < a.size) :
    checkedArray a i = some (readArray a ⟨i, h⟩) := by
  simp [checkedArray, h]

theorem checked_out (a : Array α) (i : Nat) (h : ¬ i < a.size) :
    checkedArray a i = none := by
  simp [checkedArray, h]

def row3 : Fin 3 → Nat :=
  fun i => if i.val = 0 then 4 else if i.val = 1 then 7 else 0

def gridIndex (r c : Fin 3) : Fin 9 :=
  ⟨3 * r.val + c.val, by
    have hr := r.isLt
    have hc := c.isLt
    omega⟩

end LvtIndexing
