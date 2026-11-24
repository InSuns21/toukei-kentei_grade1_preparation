import Lake
open Lake DSL

package lvtDecision

lean_lib LvtDecision

@[default_target, test_driver]
lean_exe lvtDecisionDemo where
  root := `Main
