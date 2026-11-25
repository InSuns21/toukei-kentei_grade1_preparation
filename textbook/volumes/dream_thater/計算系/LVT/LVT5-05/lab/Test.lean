import LvtTypeScriptDrt

def main : IO Unit := do
  unless ((1, 2) : Nat × Nat) != (2, 1) do
    throw (IO.userError "swap test failed")
  IO.println "LVT5-05 OK"
