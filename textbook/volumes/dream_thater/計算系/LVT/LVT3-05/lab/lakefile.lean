import Lake
open Lake DSL

package lvtTransitions
lean_lib LvtTransitions

@[default_target, test_driver]
lean_exe lvtTransitionsDemo where
  root := `Main
