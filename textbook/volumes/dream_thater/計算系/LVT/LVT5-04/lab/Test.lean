import LvtPythonDrt
open LvtContracts

def main : IO Unit := do
  unless takeStock ⟨1, 1⟩ == some 0 && !decide (mutantAccept 1 1) do
    throw (IO.userError "boundary test failed")
  IO.println "LVT5-04 OK"
