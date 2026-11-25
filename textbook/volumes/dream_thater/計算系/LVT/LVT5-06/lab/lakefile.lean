import Lake
open Lake DSL

package lvtStateful
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
@[default_target]
lean_lib LvtStateful
@[default_target]
lean_exe lvtStatefulOracle where
  root := `Main
@[test_driver]
lean_exe lvtStatefulTest where
  root := `Test
