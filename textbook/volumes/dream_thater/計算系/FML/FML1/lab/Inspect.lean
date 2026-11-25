import FmlFinite
open scoped BigOperators

#eval ({2, 5, 2} : Finset Nat).card
#eval (Finset.univ : Finset (Fin 0)).card
#eval (∑ i : Fin 3, (i.val + 1))
#eval (∑ i : Fin 3, ((FmlFinite.swap02 i).val + 1))
#check Finset.sum_bij'
#print axioms FmlFinite.sum_reindex
#print axioms FmlFinite.fixed_iff_inverse
