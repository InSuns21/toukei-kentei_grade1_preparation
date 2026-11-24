import LvtLogic
open LvtLogic
#check And.intro
#check Or.elim
#check Exists.intro
#check Exists.elim
#check distribute
#check collect
#check (show ∀ n : Nat, n = n from fun n => rfl)
#check (show ∃ n : Nat, n = 3 from Exists.intro 3 rfl)
