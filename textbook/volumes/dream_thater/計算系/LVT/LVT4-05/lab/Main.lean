import LvtShrink
def main : IO Unit := do
  if LvtShrink.checks then IO.println "LVT4-05 OK"
  else throw (IO.userError "Unexpected shrinking result")
