import LvtIntegration
open LvtIntegration

def bit (x : Bool) : String := if x then "1" else "0"
def main : IO Unit := do
  for b in [false, true] do
    for t in [false, true] do
      for w in [false, true] do
        for o in [false, true] do
          IO.println (bit b ++ bit t ++ bit w ++ bit o ++ " " ++ bit (permit b t w o))
