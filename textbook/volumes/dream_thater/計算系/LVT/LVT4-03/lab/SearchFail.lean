import Plausible

example (n : Nat) : n + 1 = n := by
  plausible (config := { randomSeed := some 42, numInst := 100 })
