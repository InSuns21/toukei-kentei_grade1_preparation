import Lake
open Lake DSL

package lvtUnit
lean_lib LvtGame where
  srcDir := "../../LVT3-06/lab"

@[default_target, test_driver]
lean_exe lvtUnitDemo where
  root := `Main
