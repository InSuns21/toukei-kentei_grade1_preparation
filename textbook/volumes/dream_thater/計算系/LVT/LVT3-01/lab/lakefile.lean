import Lake
open Lake DSL

package lvtContracts

lean_lib LvtContracts

@[default_target, test_driver]
lean_exe lvtContractsDemo where
  root := `Main
