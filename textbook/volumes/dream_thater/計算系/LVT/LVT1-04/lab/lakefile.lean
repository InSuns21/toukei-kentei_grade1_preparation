import Lake
open Lake DSL

package lvtRecursion

lean_lib LvtRecursion

@[default_target, test_driver]
lean_exe lvtRecursionDemo where
  root := `Main
