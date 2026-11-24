import LvtIndexing
open LvtIndexing
#eval ([4, 7, 0] : List Nat)[1]?
#eval (#[4, 7, 0] : Array Nat)[3]?
#eval checkedArray #[4, 7, 0] 2
#eval (gridIndex ⟨1, by decide⟩ ⟨2, by decide⟩).val
