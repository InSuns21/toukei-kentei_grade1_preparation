import LvtOracle
open Lean LvtOracle

def emit (out : IO.FS.Stream) (j : Json) : IO Unit := do
  out.putStrLn j.compress
  out.flush

partial def collect (input : IO.FS.Stream) (rev : List String) : IO (List String) := do
  let line ← input.getLine
  if line.isEmpty then return rev.reverse
  else collect input (line :: rev)

partial def serve (input out : IO.FS.Stream) : IO Unit := do
  let line ← input.getLine
  if line.isEmpty then return ()
  emit out (answer line)
  serve input out

def main (args : List String) : IO UInt32 := do
  let input ← IO.getStdin
  let out ← IO.getStdout
  match args with
  | ["--batch"] =>
    let lines ← collect input []
    for j in batchModel lines do
      emit out j
    return 0
  | ["--stream"] =>
    serve input out
    return 0
  | _ =>
    let err ← IO.getStderr
    err.putStrLn "usage: lvtOracle --batch | --stream"
    return 2
