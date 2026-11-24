import Lake
open Lake DSL

package lvtPredicates

lean_lib LvtPredicates

@[default_target, test_driver]
lean_exe lvtPredicatesDemo where
  root := `Main
