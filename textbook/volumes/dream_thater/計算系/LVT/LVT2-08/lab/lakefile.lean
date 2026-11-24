import Lake
open Lake DSL

package lvtAutomation

lean_lib LvtAutomation

@[default_target, test_driver]
lean_exe lvtAutomationDemo where
  root := `Main
