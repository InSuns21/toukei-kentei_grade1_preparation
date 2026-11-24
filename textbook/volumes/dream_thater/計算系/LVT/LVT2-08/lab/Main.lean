import LvtAutomation
open LvtAutomation
#guard decide ((2 : Nat) ≤ 5)
#guard decide ((3 : Nat) ≤ 3)
#guard !(decide ((4 : Nat) ≤ 3))
#guard !(decide ((1 : Nat) ≤ 0))
#guard alwaysAccept 3 2
#guard !(decide ((3 : Nat) ≤ 2))
example : (2 : Nat) ≤ 5 := withinChain 2 4 5 (by decide) (by decide)
example : (2 : Nat) + 1 ≤ 3 := nextWithin 2 3 (by decide)
example : ¬ ((3 : Nat) + 1 ≤ 3) := noRoom 3
def main : IO Unit := IO.println "LVT2-08 OK"
