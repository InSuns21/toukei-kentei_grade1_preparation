import LvtDependent
open LvtDependent
#check readL
#check PositiveL
#check SizedL
#check prependL
#check reserve_in
#check reserve_out
#eval readL [5, 8] ⟨1, by decide⟩
#eval (nextPositive 4).val
#eval (prependL 7 (⟨[8, 9], by decide⟩ : SizedL 2)).val
#eval (reserveL (⟨2, by decide⟩ : UsedL 3)).map (fun s => s.val)
#eval (reserveL (⟨3, by decide⟩ : UsedL 3)).map (fun s => s.val)
