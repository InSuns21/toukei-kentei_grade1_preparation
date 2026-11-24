import Lake
open Lake DSL

package lvtRefinement
lean_lib LvtRefinement

@[default_target, test_driver]
lean_exe lvtRefinementDemo where
  root := `Main
