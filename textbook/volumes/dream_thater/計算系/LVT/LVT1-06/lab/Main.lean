import LvtBoundary
open LvtBoundary

#guard reply (runRequest emptyBoard "0") == "ok 100000000"
#guard reply (runRequest emptyBoard "2") == "ok 001000000"
#guard reply (runRequest emptyBoard "8") == "ok 000000001"
#guard reply (runRequest emptyBoard "9") == "error outOfRange"
#guard reply (runRequest emptyBoard "abc") == "error malformed"
#guard reply (runRequest (writeMark emptyBoard 2) "2") == "error occupied"
#guard (writeMark emptyBoard 2) 2
#guard !(emptyBoard 2)
#guard !( (writeMark emptyBoard 2) 1 )
#guard (match wrongDecode "2" with
  | .error _ => ""
  | .ok i => boardText (writeMark emptyBoard i)) == "010000000"

def main : IO Unit := IO.println "LVT1-06 OK"
