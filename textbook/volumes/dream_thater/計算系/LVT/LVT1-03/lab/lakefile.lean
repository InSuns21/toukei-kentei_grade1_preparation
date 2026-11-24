import Lake
open Lake DSL

package lvtTypes

lean_lib LvtTypes

@[default_target, test_driver]
lean_exe lvtTypesDemo where
  root := `Main
