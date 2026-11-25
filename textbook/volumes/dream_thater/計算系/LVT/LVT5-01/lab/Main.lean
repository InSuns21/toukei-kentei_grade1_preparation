import LvtDifferential
def main : IO Unit := do
  if LvtDifferential.checks then IO.println "LVT5-01 OK"
  else throw (IO.userError "Unexpected differential result")
