import Lake
open Lake DSL
package lvtIntegration
@[default_target]
lean_lib LvtIntegration
@[default_target]
lean_exe lvtIntegrationOracle where
  root := `Main
