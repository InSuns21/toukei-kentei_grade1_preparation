import FmlPolynomial
open FmlPolynomial
#print axioms eval_generators
#print axioms finite_field_same_values
#print axioms finite_field_distinct
#print axioms Program.map_eval
#print axioms shared_size
#print axioms shared_output
#print axioms shared_polynomial
#print axioms shared_numeric
#eval shared.size
#eval shared.eval (fun i : Fin 2 => if i = 0 then (2 : ℤ) else 3)
