import LvtTenant
open LvtTenant
def main : IO Unit := do
  let mut permits := 0
  for role in [Role.viewer, .editor, .admin] do
    for act in [Action.read, .update, .delete] do
      for t in [false,true] do
        for o in [false,true] do
          for b in [false,true] do
            let r : Request := ⟨role,act,t,o,b⟩
            if decideAccess r then permits := permits + 1
  unless permits == 11 do
    throw (IO.userError "wrong permit count")
  unless decideInput none == false do
    throw (IO.userError "invalid input accepted")
  IO.println "72 abstract requests, 11 permits"
