import Lake
open Lake DSL

package lvtHoare
lean_lib LvtHoare

@[default_target, test_driver]
lean_exe lvtHoareDemo where
  root := `Main
