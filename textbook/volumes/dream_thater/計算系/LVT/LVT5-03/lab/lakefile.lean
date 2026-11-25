import Lake
open Lake DSL

package lvtSerialization
lean_lib LvtContracts where
  srcDir := "../../LVT3-01/lab"
@[default_target]
lean_lib LvtSerialization
@[test_driver]
lean_exe lvtSerializationTest where
  root := `Test
