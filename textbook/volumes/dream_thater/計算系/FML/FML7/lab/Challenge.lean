namespace FML7

inductive Circuit where
  | input
  | double (p : Circuit)

def gates : Circuit → Nat
  | .input => 0
  | .double p => gates p + 1

def eval : Circuit → Nat → Nat
  | .input, x => x
  | .double p, x => let v := eval p x; v + v

def build : Nat → Circuit
  | 0 => .input
  | n+1 => .double (build n)

theorem value (p : Circuit) (x : Nat) : eval p x = 2 ^ gates p * x := by sorry
theorem sizeBuild (n : Nat) : gates (build n) = n := by sorry
theorem family (n x : Nat) : gates (build n) = n ∧ eval (build n) x = 2 ^ n * x := by sorry

end FML7
