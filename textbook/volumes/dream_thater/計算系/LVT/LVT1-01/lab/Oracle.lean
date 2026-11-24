import LvtIntro

#guard LvtIntro.reference 0 == true
#guard LvtIntro.reference 1 == false
#guard LvtIntro.reference 2 == false
#guard LvtIntro.reference 5 == false

def main : IO Unit := do
  IO.println (LvtIntro.reference 0)
  IO.println (LvtIntro.reference 1)
  IO.println (LvtIntro.reference 2)
