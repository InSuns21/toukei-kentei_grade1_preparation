import Plausible

#eval Plausible.Testable.check
  (∀ n : Nat, n < n + 1)
  { randomSeed := some 42, numInst := 100 }
