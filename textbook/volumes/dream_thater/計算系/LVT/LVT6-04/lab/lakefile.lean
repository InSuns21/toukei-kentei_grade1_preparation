import Lake
open Lake DSL
package lvtAuthorization
@[default_target]
lean_lib LvtAuthorization
@[default_target]
lean_exe lvtAuthorizationOracle where
  root := `Main
@[test_driver]
lean_exe lvtAuthorizationTest where
  root := `Test
