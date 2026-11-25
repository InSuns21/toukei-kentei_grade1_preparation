import Lake
open Lake DSL
package lvtTenant
@[default_target]
lean_lib LvtTenant
@[default_target]
lean_exe lvtTenantOracle where
  root := `Main
@[test_driver]
lean_exe lvtTenantTest where
  root := `Test
