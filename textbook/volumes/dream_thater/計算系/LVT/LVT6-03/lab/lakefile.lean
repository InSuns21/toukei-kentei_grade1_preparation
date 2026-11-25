import Lake
open Lake DSL
package lvtWorkflow
@[default_target]
lean_lib LvtWorkflow
@[default_target]
lean_exe lvtWorkflowOracle where
  root := `Main
@[test_driver]
lean_exe lvtWorkflowTest where
  root := `Test
