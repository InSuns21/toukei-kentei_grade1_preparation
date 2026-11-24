import Lake
open Lake DSL

package lvtListCorrectness

lean_lib LvtListCorrectness

@[default_target, test_driver]
lean_exe lvtListCorrectnessDemo where
  root := `Main
