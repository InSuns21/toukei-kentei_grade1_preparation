import LvtInduction
open LvtInduction

-- A01
example : steps 2 = 2 := by rfl

-- A02
example (n : Nat) (h : steps n = n) : steps (Nat.succ n) = Nat.succ n := by
  change Nat.succ (steps n) = Nat.succ n
  exact congrArg Nat.succ h

-- A03
example (P : Nat → Prop) (z : P 0)
    (s : ∀ n, P n → P (Nat.succ n)) (n : Nat) : P n := by
  induction n with
  | zero => exact z
  | succ n ih => exact s n ih

-- A04
example {α : Type} (ys : List α) : joinL [] ys = ys := by rfl

-- B01
example {α : Type} (xs : List α) : joinL xs [] = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL xs [] = a :: xs
    exact congrArg (fun t => a :: t) ih

-- B02
example {α : Type} (a : α) : flipL [a] = [a] := by rfl
example {α : Type} (a : α) : flipL [a,a] = [a,a] := by rfl

-- B03
example {α : Type} (xs : List α) (a : α) :
    flipL (joinL xs [a]) = a :: flipL xs := by
  rw [flip_join] <;> rfl

-- C01
example {α : Type} (xs : List α) : flipL (flipL xs) = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change flipL (joinL (flipL xs) [a]) = a :: xs
    rw [flip_join, ih] <;> rfl
