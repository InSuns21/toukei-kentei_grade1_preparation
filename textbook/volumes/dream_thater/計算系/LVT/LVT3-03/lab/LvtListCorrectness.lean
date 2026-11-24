import Lean

namespace LvtListCorrectness

def mapL {α β : Type} (f : α → β) : List α → List β
  | [] => []
  | x :: xs => f x :: mapL f xs

def mapRevAcc {α β : Type} (f : α → β) :
    List α → List β → List β
  | [], acc => acc
  | x :: xs, acc => mapRevAcc f xs (f x :: acc)

def bad (xs : List Nat) : List Nat := xs

theorem mapSpec {α β : Type} (f : α → β) (xs : List α) :
    mapL f xs = xs.map f := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change f x :: mapL f xs = f x :: xs.map f
    exact congrArg (fun t => f x :: t) ih

theorem mapLength {α β : Type} (f : α → β) (xs : List α) :
    (mapL f xs).length = xs.length := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change (mapL f xs).length + 1 = xs.length + 1
    exact congrArg (fun n => n + 1) ih

theorem mapJoin {α β : Type} (f : α → β) (xs ys : List α) :
    mapL f (xs ++ ys) = mapL f xs ++ mapL f ys := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change f x :: mapL f (xs ++ ys) = f x :: (mapL f xs ++ mapL f ys)
    exact congrArg (fun t => f x :: t) ih

theorem mapCompose {α β γ : Type} (f : α → β) (g : β → γ)
    (xs : List α) : mapL g (mapL f xs) = mapL (fun x => g (f x)) xs := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change g (f x) :: mapL g (mapL f xs) =
      g (f x) :: mapL (fun x => g (f x)) xs
    exact congrArg (fun t => g (f x) :: t) ih

theorem mapReverse {α β : Type} (f : α → β) (xs : List α) :
    mapL f xs.reverse = (mapL f xs).reverse := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    simp only [List.reverse_cons, mapJoin, mapL, ih]

theorem accCorrect {α β : Type} (f : α → β) (xs : List α)
    (acc : List β) : mapRevAcc f xs acc = (mapL f xs).reverse ++ acc := by
  induction xs generalizing acc with
  | nil => rfl
  | cons x xs ih =>
    change mapRevAcc f xs (f x :: acc) = (mapL f (x :: xs)).reverse ++ acc
    rw [ih]
    simp [mapL, List.reverse_cons, List.append_assoc]

end LvtListCorrectness
