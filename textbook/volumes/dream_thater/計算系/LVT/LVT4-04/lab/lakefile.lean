import Lake
open Lake DSL

package lvtInputs
lean_lib LvtGame where
  srcDir := "../../LVT3-06/lab"
lean_lib LvtInputs
@[default_target, test_driver]
lean_exe lvtInputsDemo where
  root := `Main
