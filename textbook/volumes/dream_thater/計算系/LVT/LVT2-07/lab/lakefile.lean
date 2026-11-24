import Lake
open Lake DSL

package lvtDependent

lean_lib LvtDependent

@[default_target, test_driver]
lean_exe lvtDependentDemo where
  root := `Main
