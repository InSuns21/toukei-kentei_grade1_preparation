import Lake
open Lake DSL

package lvtIndexing

lean_lib LvtIndexing

@[default_target, test_driver]
lean_exe lvtIndexingDemo where
  root := `Main
