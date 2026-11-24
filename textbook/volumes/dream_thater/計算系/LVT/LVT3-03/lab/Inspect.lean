import LvtListCorrectness
open LvtListCorrectness
#check mapSpec
#check accCorrect
#eval mapL (fun n : Nat => n + 1) []
#eval mapL (fun n : Nat => n + 1) [2,2,0]
#eval mapL (fun n : Nat => n + 1) ([1,2] : List Nat).reverse
#eval mapRevAcc (fun n : Nat => n + 1) [1,2] [9]
#print axioms mapSpec
#print axioms mapLength
#print axioms mapJoin
#print axioms mapCompose
#print axioms mapReverse
#print axioms accCorrect
