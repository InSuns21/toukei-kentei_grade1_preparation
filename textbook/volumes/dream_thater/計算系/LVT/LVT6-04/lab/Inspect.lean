import LvtAuthorization
open LvtAuthorization

#guard authorize ⟨.editor,.write,true⟩ [.writePermit,.suspendForbid] == false
#guard authorize ⟨.editor,.write,false⟩ [.writePermit,.suspendForbid] == true
#guard authorize ⟨.viewer,.read,false⟩ [] == false
#guard authorize ⟨.viewer,.read,false⟩ [.suspendForbid,.readPermit,.readPermit] == true
#eval authorize ⟨.editor,.write,true⟩ [.readPermit,.writePermit,.suspendForbid]
#check allowIff
#print axioms allowIff
#print axioms defaultDeny
#print axioms forbidDominates
#print axioms prependSuspended
