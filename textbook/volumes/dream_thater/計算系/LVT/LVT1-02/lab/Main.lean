import LvtEnvironment

#guard LvtEnvironment.bump 0 == 1
#guard LvtEnvironment.bump 2 == 3

def main : IO Unit := do
  IO.println (LvtEnvironment.bump 2)
