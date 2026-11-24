import Lake
open Lake DSL

package lvtIntro

lean_lib LvtIntro

@[default_target, test_driver]
lean_exe lvtIntroOracle where
  root := `Oracle
