import Lake
open Lake DSL

package lvtPythonDrt
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
@[default_target]
lean_lib LvtPythonDrt
@[test_driver]
lean_exe lvtPythonDrtTest where
  root := `Test
