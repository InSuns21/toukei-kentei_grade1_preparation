import LvtWorkflow
open LvtWorkflow

#guard run initial [.submit,.approve,.publish] == ⟨.published,true⟩
#guard run initial [.submit,.publish] == ⟨.submitted,false⟩
#guard run initial [.submit,.approve,.sendBack,.submit,.publish] == ⟨.submitted,false⟩
#eval trace initial [.submit,.publish,.approve,.publish]
#check initialSafe
#print axioms preserve
#print axioms runPreserve
#print axioms initialSafe
#print axioms publishSource
#print axioms rejectedUnchanged
