import LvtHoare
open LvtHoare
#eval sumLoop #[]
#eval sumLoop #[2, 0, 5]
#eval seededLoop 4 #[2, 0, 5]
#eval badLoop #[2]
#print axioms wp_sufficient
#print axioms wp_weakest
#print axioms wp_seq
#print axioms wp_branch
#print axioms sumLoop_correct
#print axioms seededLoop_correct
#print axioms bad_counterexample
