import LvtContracts
open LvtContracts
#guard takeStock ⟨5, 2⟩ == some 3
#guard takeStock ⟨2, 2⟩ == some 0
#guard takeStock ⟨1, 2⟩ == none
#guard takeStock ⟨5, 0⟩ == none
#guard takeStock ⟨0, 1⟩ == none
#guard rejectAll ⟨5, 2⟩ == none
example : Satisfies orderPre orderPost takeStock := takeCorrect
def main : IO Unit := IO.println "LVT3-01 OK"
