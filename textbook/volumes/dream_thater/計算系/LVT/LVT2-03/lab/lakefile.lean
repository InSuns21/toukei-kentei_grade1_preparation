import Lake
open Lake DSL

package lvtEquality

lean_lib LvtEquality

@[default_target, test_driver]
lean_exe lvtEqualityDemo where
  root := `Main
