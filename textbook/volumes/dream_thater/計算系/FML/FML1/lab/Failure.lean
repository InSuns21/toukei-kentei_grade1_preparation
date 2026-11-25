import FmlFinite
open scoped BigOperators

-- The constant map is not a permutation.
example : (∑ _i : Fin 3, (0 : Nat)) = ∑ i : Fin 3, i.val := by
  decide
