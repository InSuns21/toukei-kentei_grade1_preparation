import LvtAuthorization
open LvtAuthorization

def main : IO Unit := do
  unless authorize ⟨.editor,.write,false⟩ [.writePermit,.suspendForbid] do
    throw (IO.userError "expected allow")
  if authorize ⟨.editor,.write,true⟩ [.writePermit,.suspendForbid] then
    throw (IO.userError "forbid must dominate")
  if authorize ⟨.viewer,.read,false⟩ [] then
    throw (IO.userError "default deny")
  IO.println "LVT6-04 OK"
