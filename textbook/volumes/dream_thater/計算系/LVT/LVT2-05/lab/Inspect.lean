import LvtInduction
open LvtInduction
#eval steps 3
#eval joinL [1,2] [3]
#eval flipL [1,2,3]
#eval flipL (flipL [1,2,3])
#check steps_id
#check join_nil
#check join_assoc
#check flip_join
#check flip_twice
example (P : Nat → Prop) (z : P 0)
    (s : ∀ n, P n → P (Nat.succ n)) (n : Nat) : P n :=
  Nat.rec z s n
example {α : Type} (P : List α → Prop) (z : P [])
    (s : ∀ a xs, P xs → P (a :: xs)) (xs : List α) : P xs := by
  induction xs with
  | nil => exact z
  | cons a xs ih => exact s a xs ih
