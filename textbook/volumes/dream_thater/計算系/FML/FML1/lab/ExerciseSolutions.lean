import FmlFinite
open scoped BigOperators
namespace FmlFinite.Exercises

theorem a01_mem4 : 4 ∈ ({4, 7, 4} : Finset Nat) := by decide
theorem a01_mem7 : 7 ∈ ({4, 7, 4} : Finset Nat) := by decide
theorem a01_not8 : 8 ∉ ({4, 7, 4} : Finset Nat) := by decide
theorem a01_card : ({4, 7, 4} : Finset Nat).card = 2 := by decide
theorem a02_card : (Finset.univ : Finset (Fin 4)).card = 4 := by decide
theorem a02_bound (i : Fin 4) : i.val ≠ 4 := by omega
theorem a02_empty : (Finset.univ : Finset (Fin 0)).card = 0 := by decide

def q : Equiv.Perm (Fin 3) := Equiv.swap 0 1
theorem a03_0 : q.symm 0 = 1 := by decide
theorem a03_1 : q.symm 1 = 0 := by decide
theorem a03_2 : q.symm 2 = 2 := by decide
theorem a04_sum : (∑ i : Fin 3, (2 * i.val + 1)) = 9 := by decide
theorem a04_empty : (∑ i : Fin 0, (2 * i.val + 1)) = 0 := by decide

theorem b01 {α β : Type*} [Fintype α] [Fintype β]
    (e : α ≃ β) (f : β → Nat) :
    (∑ i : α, f (e i)) = ∑ j : β, f j :=
  FmlFinite.sum_reindex e f

def repeated (i : Fin 3) : Nat := if i = 2 then 7 else 4
theorem b02_sum : (∑ i : Fin 3, repeated i) = 15 := by decide
theorem b02_reindex : (∑ i : Fin 3, repeated (FmlFinite.swap02 i)) = 15 := by
  rw [FmlFinite.sum_reindex FmlFinite.swap02 repeated]
  exact b02_sum

theorem b03 : (∑ _i : Fin 3, (1 : Nat)) ≠
    ∑ i : Fin 3, (i.val + 1) := by decide

def weight {α : Type*} [DecidableEq α]
    (p : Equiv.Perm α) (w : α → Nat) (i : α) : Nat :=
  if p i = i then w i else 0

theorem weighted_inverse {α : Type*} [Fintype α] [DecidableEq α]
    (p : Equiv.Perm α) (w : α → Nat) :
    (∑ i : α, weight p w (p i)) =
      ∑ i : α, weight p.symm w i := by
  calc
    (∑ i : α, weight p w (p i)) = ∑ i : α, weight p w i :=
      FmlFinite.sum_reindex p (weight p w)
    _ = ∑ i : α, weight p.symm w i := by
      apply Finset.sum_congr rfl
      intro i hi
      by_cases h : p i = i
      · have h' := (FmlFinite.fixed_iff_inverse p i).mp h
        simp [weight, h, h']
      · have h' : p.symm i ≠ i :=
          fun hs => h ((FmlFinite.fixed_iff_inverse p i).mpr hs)
        simp [weight, h, h']

#print axioms a01_mem4
#print axioms a01_mem7
#print axioms a01_not8
#print axioms a01_card
#print axioms a02_card
#print axioms a02_bound
#print axioms a02_empty
#print axioms a03_0
#print axioms a03_1
#print axioms a03_2
#print axioms a04_sum
#print axioms a04_empty
#print axioms b01
#print axioms b02_sum
#print axioms b02_reindex
#print axioms b03
#print axioms weighted_inverse

end FmlFinite.Exercises
