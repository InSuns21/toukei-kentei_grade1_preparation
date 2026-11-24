import LvtPbt
open LvtPbt

#eval samples 0 6
#eval samples 1 6
#eval failures (rangeCheck badRange) (samples 0 6)
#eval failures (rangeCheck badRange) (samples 1 6)
#eval allPass (rangeCheck correctRange) (samples 0 6)
#eval allPass (rangeCheck badRange) (samples 1 6)
#check allPass_spec
#check correct_property
#print axioms allPass_spec
#print axioms correct_property
#print axioms bad_at_nine
