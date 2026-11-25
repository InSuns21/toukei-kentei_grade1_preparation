import LvtCapstone
open LvtCapstone

def stateCode : State → String
  | .draft => "D"
  | .reviewed => "R"
  | .published => "P"

def actionCode : Action → String
  | .review => "r"
  | .publish => "p"
  | .reset => "z"

def main : IO Unit := do
  for s in [State.draft, State.reviewed, State.published] do
    for a in [Action.review, Action.publish, Action.reset] do
      let (next, accepted) := step s a
      IO.println (stateCode s ++ " " ++ actionCode a ++ " " ++ stateCode next ++ " " ++ (if accepted then "1" else "0"))
