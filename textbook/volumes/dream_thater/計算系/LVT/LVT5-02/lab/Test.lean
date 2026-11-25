import LvtOracle
def main : IO Unit := do
  if LvtOracle.checks then IO.println "LVT5-02 OK"
  else throw (IO.userError "unexpected oracle result")
