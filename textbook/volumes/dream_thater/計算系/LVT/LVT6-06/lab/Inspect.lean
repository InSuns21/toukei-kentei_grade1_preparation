import LvtIntegration
open LvtIntegration
#guard permit true false false false == false
#guard permit true true true false == false
#guard permit true true true true == true
#print axioms permitIff
