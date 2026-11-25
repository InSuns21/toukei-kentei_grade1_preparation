import LvtAuthorization
open LvtAuthorization

def parseRole : String → Option Role
  | "viewer" => some .viewer
  | "editor" => some .editor
  | _ => none

def parseAction : String → Option Action
  | "read" => some .read
  | "write" => some .write
  | _ => none

def parseBlocked : String → Option Bool
  | "0" => some false
  | "1" => some true
  | _ => none

def parseRule : String → Option Rule
  | "R" => some .readPermit
  | "W" => some .writePermit
  | "S" => some .suspendForbid
  | _ => none

def parseArgs : List String → Option (Request × List Rule)
  | role :: action :: blocked :: ps => do
    let ro ← parseRole role
    let ac ← parseAction action
    let bl ← parseBlocked blocked
    let rules ← ps.mapM parseRule
    return (⟨ro,ac,bl⟩,rules)
  | _ => none

def main (args : List String) : IO UInt32 := do
  match parseArgs args with
  | none =>
    IO.eprintln "invalid authorization input"
    return 2
  | some (r,ps) =>
    IO.println (if authorize r ps then "1" else "0")
    return 0
