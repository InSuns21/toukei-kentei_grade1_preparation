import Lake
open Lake DSL

package lvtGame
lean_lib LvtGame

@[default_target, test_driver]
lean_exe lvtGameDemo where
  root := `Main
