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

theorem value (p : Circuit) (x : Nat) : eval p x = 2 ^ gates p * x := by
  induction p with
  | input => simp [eval, gates]
  | double p ih =>
    calc
      eval (.double p) x = eval p x + eval p x := rfl
      _ = 2 ^ gates p * x + 2 ^ gates p * x := by rw [ih]
      _ = 2 ^ gates p * (x + x) := (Nat.mul_add _ _ _).symm
      _ = 2 ^ gates p * (2 * x) := by rw [Nat.two_mul]
      _ = 2 ^ gates (.double p) * x := by
        rw [gates, Nat.pow_succ, Nat.mul_assoc]

theorem sizeBuild (n : Nat) : gates (build n) = n := by
  induction n with
  | zero => rfl
  | succ n ih => simp [build, gates, ih]

theorem family (n x : Nat) (h : n = 0) : gates (build n) = n ∧ eval (build n) x = 2 ^ n * x := by
  constructor
  · exact sizeBuild n
  · rw [value, sizeBuild]

end FML7
