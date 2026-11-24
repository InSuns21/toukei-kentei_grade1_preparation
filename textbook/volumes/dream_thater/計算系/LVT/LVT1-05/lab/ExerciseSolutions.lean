import LvtIndexing
open LvtIndexing

#guard ([8, 0, 5, 2] : List Nat).length == 4
#guard ([] : List Nat).length == 0
#guard readList [9, 0] 1 == some 0
#guard readList [9, 0] 2 == none
#guard (⟨0, by decide⟩ : Fin 4).val == 0
example (i : Fin 0) : False := by
  have h := i.isLt
  omega
#guard (gridIndex ⟨2, by decide⟩ ⟨1, by decide⟩).val == 7
#guard (gridIndex ⟨0, by decide⟩ ⟨2, by decide⟩).val == 2
#guard checkedArray #[6, 0] 1 == some 0
#guard checkedArray #[6, 0] 2 == none
#guard checkedArray #[6, 0] 0 == some 6

def readListFin (xs : List α) (i : Fin xs.length) : α :=
  xs.get i
#guard readListFin [5, 8] ⟨1, by decide⟩ == 8

def middleOnly (i : Fin 3) : Bool :=
  i.val == 1
#guard middleOnly ⟨0, by decide⟩ == false
#guard middleOnly ⟨1, by decide⟩ == true
#guard middleOnly ⟨2, by decide⟩ == false

def checkedGrid (r c : Nat) : Option (Fin 9) :=
  if hr : r < 3 then
    if hc : c < 3 then
      some (gridIndex ⟨r, hr⟩ ⟨c, hc⟩)
    else none
  else none

#guard (checkedGrid 2 2).map Fin.val == some 8
#guard (checkedGrid 0 3).map Fin.val == none
#guard (checkedGrid 3 0).map Fin.val == none
