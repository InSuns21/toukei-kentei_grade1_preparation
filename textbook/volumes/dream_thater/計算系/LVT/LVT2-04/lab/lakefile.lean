import Lake
open Lake DSL

package lvtTactics

lean_lib LvtTactics

@[default_target, test_driver]
lean_exe lvtTacticsDemo where
  root := `Main
