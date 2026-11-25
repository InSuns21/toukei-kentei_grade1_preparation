import LvtWorkflow
open LvtWorkflow

example : (step initial .publish).1 = true := Eq.refl false
