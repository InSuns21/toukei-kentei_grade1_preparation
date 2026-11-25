import LvtStrength
def main : IO Unit := do
  if LvtStrength.checks then IO.println "LVT4-06 OK"
  else throw (IO.userError "Unexpected strength result")
