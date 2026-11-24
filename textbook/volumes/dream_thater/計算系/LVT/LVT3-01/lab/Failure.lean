import LvtContracts
open LvtContracts
-- A proof for the weak specification cannot be used for the stronger one.
example : Satisfies orderPre orderPost rejectAll := by
  exact weakAllowsReject
