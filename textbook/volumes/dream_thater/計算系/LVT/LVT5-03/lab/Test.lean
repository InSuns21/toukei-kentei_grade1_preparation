import LvtSerialization

def main : IO Unit := do
  if LvtSerialization.checks then IO.println "LVT5-03 OK"
  else throw (IO.userError "unexpected serialization result")
