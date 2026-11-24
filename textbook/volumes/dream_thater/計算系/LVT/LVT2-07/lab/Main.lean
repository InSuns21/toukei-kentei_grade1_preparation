import LvtDependent
open LvtDependent
#guard readL [5, 8] ⟨1, by decide⟩ == 8
#guard (nextPositive 4).val == 5
#guard (prependL 7 (⟨[8, 9], by decide⟩ : SizedL 2)).val == [7, 8, 9]
#guard (reserveL (⟨2, by decide⟩ : UsedL 3)).map (fun s => s.val) == some 3
#guard (reserveL (⟨3, by decide⟩ : UsedL 3)).map (fun s => s.val) == none
def main : IO Unit := IO.println "LVT2-07 OK"
