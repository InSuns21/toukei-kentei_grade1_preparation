import Lake
open Lake DSL

package lvtPbt
lean_lib LvtPbt

@[default_target, test_driver]
lean_exe lvtPbtDemo where
  root := `Main
