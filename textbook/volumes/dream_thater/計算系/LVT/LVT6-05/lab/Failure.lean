import LvtTenant
open LvtTenant
example : decideAccess ⟨.admin,.read,false,true,true⟩ = true := by
  rfl
