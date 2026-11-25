import Mathlib

open scoped BigOperators

namespace FmlFinite

def swap02 : Equiv.Perm (Fin 3) := Equiv.swap 0 2

theorem sum_reindex {α β : Type*} [Fintype α] [Fintype β]
    (e : α ≃ β) (f : β → Nat) :
    (∑ i : α, f (e i)) = ∑ j : β, f j := by
  classical
  refine Finset.sum_bij' (fun i _ => e i) (fun j _ => e.symm j) ?_ ?_ ?_ ?_ ?_
  · intro i hi
    exact Finset.mem_univ _
  · intro j hj
    exact Finset.mem_univ _
  · intro i hi
    exact e.symm_apply_apply i
  · intro j hj
    exact e.apply_symm_apply j
  · intro i hi
    rfl

theorem fixed_iff_inverse {α : Type*} (p : Equiv.Perm α) (i : α) :
    p i = i ↔ p.symm i = i := by
  constructor
  · intro h
    calc
      p.symm i = p.symm (p i) := congrArg (fun j => p.symm j) h.symm
      _ = i := p.symm_apply_apply i
  · intro h
    calc
      p i = p (p.symm i) := congrArg (fun j => p j) h.symm
      _ = i := p.apply_symm_apply i

example : ({2, 5, 2} : Finset Nat).card = 2 := by decide
example : 6 ∉ ({2, 5, 2} : Finset Nat) := by decide
example : (Finset.univ : Finset (Fin 3)).card = 3 := by decide
example : (Finset.univ : Finset (Fin 0)).card = 0 := by decide
example : swap02 0 = 2 := by decide
example : swap02 1 = 1 := by decide
example : swap02 2 = 0 := by decide

end FmlFinite
