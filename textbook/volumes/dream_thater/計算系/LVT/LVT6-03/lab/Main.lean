import LvtWorkflow
open LvtWorkflow

def parseAction : String → Option Action
  | "submit" => some .submit
  | "approve" => some .approve
  | "publish" => some .publish
  | "return" => some .sendBack
  | _ => none

def phaseName : Phase → String
  | .draft => "draft"
  | .submitted => "submitted"
  | .approved => "approved"
  | .published => "published"

def bit (b : Bool) : String := if b then "1" else "0"

def main (args : List String) : IO UInt32 := do
  match args.mapM parseAction with
  | none =>
    IO.eprintln "unknown action"
    return 2
  | some actions =>
    for (ok,s) in trace initial actions do
      IO.println (bit ok ++ "," ++ phaseName s.phase ++ "," ++ bit s.reviewed)
    return 0
