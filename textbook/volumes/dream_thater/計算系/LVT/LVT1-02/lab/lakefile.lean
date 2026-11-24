import Lake
open Lake DSL

package lvtEnvironment

lean_lib LvtEnvironment

@[default_target, test_driver]
lean_exe lvtEnvironmentDemo where
  root := `Main
