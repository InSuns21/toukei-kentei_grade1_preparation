import LvtWorkflow
open LvtWorkflow

def main : IO Unit := do
  unless trace initial [.submit,.publish,.approve,.publish] ==
      [(true,⟨.submitted,false⟩),(false,⟨.submitted,false⟩),
       (true,⟨.approved,true⟩),(true,⟨.published,true⟩)] do
    throw (IO.userError "workflow regression")
  unless run initial [.submit,.approve,.sendBack,.submit,.publish] == ⟨.submitted,false⟩ do
    throw (IO.userError "return regression")
  IO.println "LVT6-03 OK"
