import LvtPbt
open LvtPbt

def require (ok : Bool) (message : String) : IO Unit := do
  if !ok then
    throw (IO.userError message)

def randomInputs (count : Nat) : IO (List Nat) := do
  let mut xs : List Nat := []
  for _ in List.range count do
    let n ← IO.rand 0 15
    xs := n :: xs
  return xs.reverse

def main (args : List String) : IO Unit := do
  let good := rangeCheck correctRange
  let bad := rangeCheck badRange
  require (allPass good (samples 0 6)) "correct property"
  require (allPass bad (samples 1 6)) "expected missed counterexample"
  require (failures bad (samples 0 6) == [9]) "expected counterexample"
  require (failures bad (samples 0 16) == [9]) "complete cycle"
  if args.contains "--fail" then
    require (allPass bad (samples 0 6)) "counterexample: position 9"
  if args.contains "--random" then
    let xs ← randomInputs 20
    IO.println s!"inputs: {repr xs}"
    IO.println s!"counterexamples: {repr (failures bad xs)}"
    require (allPass good xs) "correct property on random inputs"
  IO.println "LVT4-02 OK"
