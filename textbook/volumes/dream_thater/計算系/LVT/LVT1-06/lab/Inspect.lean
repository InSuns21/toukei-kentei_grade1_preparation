import LvtBoundary
open LvtBoundary

#eval reply (runRequest emptyBoard "2")
#eval reply (runRequest emptyBoard "9")
#eval reply (runRequest emptyBoard "abc")
#eval reply (runRequest (writeMark emptyBoard 2) "2")
#eval match wrongDecode "2" with
  | .ok i => reply (.ok (writeMark emptyBoard i))
  | .error e => reply (.error e)
