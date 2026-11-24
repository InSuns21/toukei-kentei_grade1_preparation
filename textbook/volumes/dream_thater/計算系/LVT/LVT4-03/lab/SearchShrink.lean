import Plausible

set_option trace.plausible.shrink.candidates true in
example (n : Nat) : n ≤ 8 := by
  plausible (config := { randomSeed := some 42, numInst := 100, maxSize := 100 })
