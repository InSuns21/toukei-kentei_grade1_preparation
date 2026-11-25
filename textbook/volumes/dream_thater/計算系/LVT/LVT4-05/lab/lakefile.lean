import Lake
open Lake DSL

package lvtShrink
lean_lib LvtGame where
  srcDir := "../../LVT3-06/lab"
lean_lib LvtShrink
@[default_target, test_driver]
lean_exe lvtShrinkDemo where
  root := `Main
