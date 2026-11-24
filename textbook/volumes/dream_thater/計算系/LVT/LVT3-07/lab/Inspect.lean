import LvtRefinement
open LvtRefinement
#eval runC initial [.put, .put, .take]
#eval decode (runC initial [.put, .put, .take])
#eval obsC initial [.put, .put, .put, .take, .take, .take]
#eval obsA .empty [.put, .put, .put, .take, .take, .take]
#eval (badImpl ⟨true, true⟩ .put).isSome
#eval (spec .full .put).isSome
#print axioms initial_comm
#print axioms step_comm
#print axioms advance_comm
#print axioms accepted_comm
#print axioms run_comm
#print axioms obs_comm
#print axioms bad_counterexample
