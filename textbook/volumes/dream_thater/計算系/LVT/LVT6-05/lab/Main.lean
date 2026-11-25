import LvtTenant
open LvtTenant
def parseRole : String → Option Role
  | "viewer" => some .viewer
  | "editor" => some .editor
  | "admin" => some .admin
  | _ => none
def parseAction : String → Option Action
  | "read" => some .read
  | "update" => some .update
  | "delete" => some .delete
  | _ => none
def bit : String → Option Bool
  | "0" => some false
  | "1" => some true
  | _ => none
def parse : List String → Option Request
  | [r,a,t,o,b] => do
    let role ← parseRole r
    let act ← parseAction a
    let tenant ← bit t
    let owner ← bit o
    let auth ← bit b
    return ⟨role, act, tenant, owner, auth⟩
  | _ => none
def main (args : List String) : IO UInt32 := do
  IO.println (if decideInput (parse args) then "1" else "0")
  return 0
