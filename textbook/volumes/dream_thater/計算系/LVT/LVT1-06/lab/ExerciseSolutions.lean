import LvtBoundary
open LvtBoundary

#guard !(emptyBoard 4)
#guard (writeMark emptyBoard 4) 4
#guard !((writeMark emptyBoard 4) 3)
#guard reply (runRequest (writeMark emptyBoard 4) "4") == "error occupied"
#guard reply (runRequest (writeMark emptyBoard 4) "8") == "ok 000010001"
#guard reply (runRequest emptyBoard "0") == "ok 100000000"
#guard reply (runRequest emptyBoard "8") == "ok 000000001"
#guard reply (runRequest emptyBoard "9") == "error outOfRange"
#guard reply (runRequest emptyBoard "x") == "error malformed"
#guard boardText (writeMark (writeMark (writeMark emptyBoard 0) 4) 8) == "100010001"
#guard reply (.ok (writeMark (writeMark (writeMark emptyBoard 0) 4) 8)) == "ok 100010001"
#guard (match runRequest emptyBoard "2" with
  | .error e => reply (.error e)
  | .ok b => reply (runRequest b "5")) == "ok 001001000"
#guard reply (runRequest (writeMark (writeMark emptyBoard 2) 5) "2") == "error occupied"
#guard reply (runRequest (fun _ => true) "9") == "error outOfRange"
#guard reply (runRequest (fun _ => true) "abc") == "error malformed"
#guard String.intercalate "" (([8, 7, 6, 5, 4, 3, 2, 1, 0] : List (Fin 9)).map
  (fun i => if (writeMark emptyBoard 2) i then "1" else "0")) == "000000100"
#guard (match wrongDecode "0" with
  | .error .outOfRange => true
  | _ => false)
#guard (match wrongDecode "2" with
  | .ok i => boardText (writeMark emptyBoard i)
  | .error _ => "") == "010000000"
#guard (match wrongDecode "9" with
  | .ok i => boardText (writeMark emptyBoard i)
  | .error _ => "") == "000000001"
