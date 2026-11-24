import Lake
open Lake DSL

package lvtBoundary

lean_lib LvtBoundary

@[default_target, test_driver]
lean_exe lvtBoundaryDemo where
  root := `Main
