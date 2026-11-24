import Lake
open Lake DSL

package lvtLogic

lean_lib LvtLogic

@[default_target, test_driver]
lean_exe lvtLogicDemo where
  root := `Main
