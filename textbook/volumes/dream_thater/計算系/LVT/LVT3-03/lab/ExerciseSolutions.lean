import LvtListCorrectness
open LvtListCorrectness
namespace Exercises

theorem a01 : mapL (fun n : Nat => n + 1) [] = [] := rfl

theorem a02 : mapL (fun n : Nat => n + 1) [2,2,0] = [3,3,1] := rfl

theorem a03 : mapL (fun n : Nat => n == 0) [0,2,0] = [true,false,true] := rfl

theorem a04Length (xs : List Nat) : (bad xs).length = xs.length := rfl
theorem a04Wrong : bad [0] ≠ mapL (fun n : Nat => n + 1) [0] := by decide

theorem b01 {α β : Type} (f : α → β) (xs ys zs : List α) :
    mapL f ((xs ++ ys) ++ zs) = (mapL f xs ++ mapL f ys) ++ mapL f zs := by
  rw [mapJoin, mapJoin]

theorem b02 {α β γ : Type} (f : α → β) (g : β → γ) (xs : List α) :
    mapL g (mapL f xs.reverse) = (mapL (fun x => g (f x)) xs).reverse := by
  rw [mapCompose, mapReverse]

theorem b03 : mapRevAcc (fun n : Nat => n + 1) [1,2] [9] = [3,2,9] := rfl

def fastMap {α β : Type} (f : α → β) (xs : List α) :=
  (mapRevAcc f xs []).reverse
theorem c01 {α β : Type} (f : α → β) (xs : List α) :
    fastMap f xs = xs.map f := by
  unfold fastMap
  rw [accCorrect]
  simp [mapSpec]

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04Length
#print axioms a04Wrong
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
end Exercises
