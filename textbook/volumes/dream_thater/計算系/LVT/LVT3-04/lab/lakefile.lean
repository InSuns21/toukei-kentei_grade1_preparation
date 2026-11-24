import Lake
open Lake DSL

package lvtSorting

lean_lib LvtSorting

@[default_target, test_driver]
lean_exe lvtSortingDemo where
  root := `Main
