import LvtDifferential
open LvtContracts LvtDifferential
def render (x : Option Nat) : String :=
  match x with
  | none => "-"
  | some n => toString n

def main : IO Unit := do
  for o in inputs do
    IO.println s!"{o.stock},{o.qty},{render (takeStock o)},{render (candidate o)},{render (strict o)},{render (wrongRest o)}"
