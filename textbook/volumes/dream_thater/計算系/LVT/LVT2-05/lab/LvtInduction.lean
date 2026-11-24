namespace LvtInduction

def steps : Nat → Nat
  | 0 => 0
  | Nat.succ n => Nat.succ (steps n)

theorem steps_id (n : Nat) : steps n = n := by
  induction n with
  | zero => rfl
  | succ n ih =>
    change Nat.succ (steps n) = Nat.succ n
    exact congrArg Nat.succ ih

def joinL {α : Type} : List α → List α → List α
  | [], ys => ys
  | a :: xs, ys => a :: joinL xs ys

def flipL {α : Type} : List α → List α
  | [] => []
  | a :: xs => joinL (flipL xs) [a]

theorem join_nil {α : Type} (xs : List α) : joinL xs [] = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL xs [] = a :: xs
    exact congrArg (fun t => a :: t) ih

theorem join_assoc {α : Type} (xs ys zs : List α) :
    joinL (joinL xs ys) zs = joinL xs (joinL ys zs) := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change a :: joinL (joinL xs ys) zs = a :: joinL xs (joinL ys zs)
    exact congrArg (fun t => a :: t) ih

theorem flip_join {α : Type} (xs ys : List α) :
    flipL (joinL xs ys) = joinL (flipL ys) (flipL xs) := by
  induction xs with
  | nil =>
    change flipL ys = joinL (flipL ys) []
    exact (join_nil (flipL ys)).symm
  | cons a xs ih =>
    change joinL (flipL (joinL xs ys)) [a] =
      joinL (flipL ys) (joinL (flipL xs) [a])
    rw [ih, join_assoc]

theorem flip_twice {α : Type} (xs : List α) :
    flipL (flipL xs) = xs := by
  induction xs with
  | nil => rfl
  | cons a xs ih =>
    change flipL (joinL (flipL xs) [a]) = a :: xs
    rw [flip_join, ih] <;> rfl

end LvtInduction
