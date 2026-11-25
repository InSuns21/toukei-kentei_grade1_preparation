import LvtInputs
def main : IO Unit := do
  if LvtInputs.checks then IO.println "LVT4-04 OK"
  else throw (IO.userError "Unexpected input classification or mismatch counts")
