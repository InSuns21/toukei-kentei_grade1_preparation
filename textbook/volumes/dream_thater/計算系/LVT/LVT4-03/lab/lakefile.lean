import Lake
open Lake DSL

package lvtPlausible
require plausible from git
  "https://github.com/leanprover-community/plausible.git" @ "dfa4f38190d07c37e315953e08b90fe2d95b3c24"

lean_lib LvtCounterexample

@[default_target, test_driver]
lean_exe lvtPlausibleDemo where
  root := `Main
