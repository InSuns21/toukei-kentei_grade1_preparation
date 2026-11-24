import LvtContracts
open LvtContracts
#check Satisfies
#check takeCorrect
#eval takeStock ⟨5, 2⟩
#eval takeStock ⟨2, 2⟩
#eval takeStock ⟨1, 2⟩
#eval takeStock ⟨5, 0⟩
#eval rejectAll ⟨5, 2⟩
#print axioms takeCorrect
#print axioms rejectZero
#print axioms weakAllowsReject
#print axioms rejectNotCorrect
#print axioms impossible
#print axioms uniqueOnValid
