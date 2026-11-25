import LvtStateful
open LvtStateful

def main : IO Unit := do
  unless trace step (0,false) [.add,.stop,.remove,.reset] ==
      [(true,(1,false)),(true,(1,true)),(false,(1,true)),(false,(1,true))] do
    throw (IO.userError "stop regression")
  IO.println "LVT5-06 OK"
