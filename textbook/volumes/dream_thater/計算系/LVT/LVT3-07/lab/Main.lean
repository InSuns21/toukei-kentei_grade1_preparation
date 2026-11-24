import LvtRefinement
open LvtRefinement
#guard decode (runC initial [.put, .put, .take]) == Count.one
#guard runC initial [.put, .put, .take] == (⟨false, true⟩ : Slots)
#guard obsC initial [.put, .put, .put, .take, .take, .take] ==
  [true, true, false, true, true, false]
#guard (badImpl ⟨true, true⟩ .put).isSome
#guard !(spec .full .put).isSome
def main : IO Unit := IO.println "LVT3-07 OK"
