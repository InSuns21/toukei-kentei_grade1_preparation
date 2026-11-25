import Lake
open Lake DSL

package lvtDifferential
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
lean_lib LvtDifferential
@[default_target, test_driver]
lean_exe lvtDifferentialDemo where
  root := `Main
