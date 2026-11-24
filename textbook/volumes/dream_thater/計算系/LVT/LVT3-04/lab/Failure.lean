import LvtSorting
open LvtSorting
-- A proof of order alone does not establish element preservation.
example : SortSpec [3] (eraseAll [3]) := by
  exact SortedL.nil
