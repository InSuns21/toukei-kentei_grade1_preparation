import LvtStateful
open LvtStateful

def parseOp : String → Option Op
  | "add" => some .add
  | "remove" => some .remove
  | "reset" => some .reset
  | "stop" => some .stop
  | _ => none

def bit (b : Bool) : String := if b then "1" else "0"

def main (args : List String) : IO UInt32 := do
  match args.mapM parseOp with
  | none =>
    IO.eprintln "unknown operation"
    return 2
  | some ops =>
    for (b,s) in trace step (0,false) ops do
      IO.println (bit b ++ "," ++ toString s.1 ++ "," ++ bit s.2)
    return 0
