import Lake
open Lake DSL

package lvtInduction

lean_lib LvtInduction

@[default_target, test_driver]
lean_exe lvtInductionDemo where
  root := `Main
