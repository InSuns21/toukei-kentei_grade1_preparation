namespace LvtIntro

def reference : Nat → Bool
  | 0 => true
  | _ + 1 => false

theorem reference_correct (n : Nat) :
    reference n = true ↔ n = 0 := by
  cases n <;> simp [reference]

end LvtIntro
