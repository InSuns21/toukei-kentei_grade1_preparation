import LvtDecision
open LvtDecision
#guard decisionBool (2 = 2) yesExample
#guard !(decisionBool False noExample)
#guard sameNumber 2 2
#guard !(sameNumber 2 3)
#guard wrongMatches 2 3

def main : IO Unit := IO.println "LVT2-01 OK"
