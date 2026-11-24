import Lake
open Lake DSL

package lvtTermination

lean_lib LvtTermination

@[default_target, test_driver]
lean_exe lvtTerminationDemo where
  root := `Main
