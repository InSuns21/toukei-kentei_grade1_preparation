import LvtIndexing
open LvtIndexing

#guard readList ([] : List Nat) 0 == none
#guard readList [4, 7, 0] 1 == some 7
#guard readList [4, 7, 0] 2 == some 0
#guard readList [4, 7, 0] 3 == none
#guard checkedArray (#[] : Array Nat) 0 == none
#guard checkedArray #[4, 7, 0] 0 == some 4
#guard checkedArray #[4, 7, 0] 2 == some 0
#guard checkedArray #[4, 7, 0] 3 == none
#guard checkedArray #[4, 7, 0] 99 == none
#guard last3.val == 2
#guard (3 : Fin 3).val == 0
#guard row3 ⟨0, by decide⟩ == 4
#guard row3 ⟨1, by decide⟩ == 7
#guard row3 ⟨2, by decide⟩ == 0
#guard (gridIndex ⟨0, by decide⟩ ⟨0, by decide⟩).val == 0
#guard (gridIndex ⟨0, by decide⟩ ⟨1, by decide⟩).val == 1
#guard (gridIndex ⟨0, by decide⟩ ⟨2, by decide⟩).val == 2
#guard (gridIndex ⟨1, by decide⟩ ⟨0, by decide⟩).val == 3
#guard (gridIndex ⟨1, by decide⟩ ⟨1, by decide⟩).val == 4
#guard (gridIndex ⟨1, by decide⟩ ⟨2, by decide⟩).val == 5
#guard (gridIndex ⟨2, by decide⟩ ⟨0, by decide⟩).val == 6
#guard (gridIndex ⟨2, by decide⟩ ⟨1, by decide⟩).val == 7
#guard (gridIndex ⟨2, by decide⟩ ⟨2, by decide⟩).val == 8

def main : IO Unit := do
  IO.println "LVT1-05 OK"
