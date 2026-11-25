import Lake
open Lake DSL

package lvtTypeScriptDrt
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
@[default_target]
lean_lib LvtTypeScriptDrt
@[test_driver]
lean_exe lvtTypeScriptDrtTest where
  root := `Test
