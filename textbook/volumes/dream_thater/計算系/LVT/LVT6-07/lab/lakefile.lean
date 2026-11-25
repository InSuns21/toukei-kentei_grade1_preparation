import Lake
open Lake DSL
package lvtCapstone
@[default_target]
lean_lib LvtCapstone
@[default_target]
lean_exe lvtCapstoneOracle where
  root := `Main
