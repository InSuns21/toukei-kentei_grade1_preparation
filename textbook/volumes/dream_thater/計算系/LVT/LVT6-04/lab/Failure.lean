import LvtAuthorization
open LvtAuthorization

example : authorize ⟨.editor,.write,true⟩ [.writePermit,.suspendForbid] = true :=
  Eq.refl false
