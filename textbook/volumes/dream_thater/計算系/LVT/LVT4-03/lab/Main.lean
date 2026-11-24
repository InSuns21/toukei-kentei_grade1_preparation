import LvtCounterexample
open LvtCounterexample

def main : IO Unit := do
  if counterexample 12 && counterexample 10 && counterexample 9 && !counterexample 8 then
    IO.println "LVT4-03 OK"
  else
    throw (IO.userError "Unexpected boundary result")
