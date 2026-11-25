import FmlPolynomial
open MvPolynomial
example : (X () : MvPolynomial Unit (ZMod 2)) ^ 2 = X () := by
  have h := FmlPolynomial.finite_field_distinct
  exact False.elim (h rfl)
