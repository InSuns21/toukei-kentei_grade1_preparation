import Lake
open Lake DSL

package lvtOracle
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
lean_lib LvtOracle
@[default_target]
lean_exe lvtOracle where
  root := `Main
@[test_driver]
lean_exe lvtOracleTest where
  root := `Test
