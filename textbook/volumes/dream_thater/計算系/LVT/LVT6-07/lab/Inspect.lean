import LvtCapstone
open LvtCapstone
#guard (step .draft .publish).2 == false
#guard (step .reviewed .publish).1 == State.published
#guard (step .published .reset).1 == State.draft
#check publishAccepted
#check publishTarget
#check rejectKeeps
#print axioms publishAccepted
#print axioms publishTarget
#print axioms rejectKeeps
