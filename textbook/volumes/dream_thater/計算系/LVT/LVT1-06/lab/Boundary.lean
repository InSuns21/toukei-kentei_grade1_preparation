import LvtBoundary
open LvtBoundary

def main (args : List String) : IO Unit :=
  match args with
  | [raw] => IO.println (reply (runRequest emptyBoard raw))
  | _ => IO.println "error expected one argument"
