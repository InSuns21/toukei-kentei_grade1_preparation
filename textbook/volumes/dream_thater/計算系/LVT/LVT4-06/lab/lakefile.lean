import Lake
open Lake DSL

package lvtStrength
lean_lib LvtGame where
  srcDir := "../../LVT3-06/lab"
lean_lib LvtStrength
@[default_target, test_driver]
lean_exe lvtStrengthDemo where
  root := `Main
