import LvtTenant
open LvtTenant
#guard decideAccess ⟨.admin,.read,false,true,true⟩ == false
#guard decideAccess ⟨.editor,.update,true,true,true⟩ == true
#guard decideAccess ⟨.editor,.update,true,false,true⟩ == false
#guard decideInput none == false
#eval trace true ⟨.editor,.update,true,true,true⟩
#eval trace true ⟨.editor,.update,true,false,true⟩
#print axioms soundness
#print axioms completeness
#print axioms traceSafe
#print axioms invalidDenied
