import LvtTermination
open LvtTermination
namespace Exercises

theorem a01 : run 2 2 4 = none := rfl
theorem a02 : run 3 2 4 = some 6 := rfl
theorem a03 : run 1 0 9 = some 9 := rfl
theorem a04 : run 0 0 9 = none := rfl
theorem b01 (k n a r : Nat) (h : run k n a = some r) :
    r = a + n := runPartial k n a r h

theorem b02 (n a : Nat) : run n n a = none :=
  short n n a (Nat.le_refl n)

def wrong (_ _ _ : Nat) : Option Nat := some 0

theorem b03Term : Terminates wrong := by
  intro n a
  exact ⟨0, 0, rfl⟩

theorem b03Wrong : ¬ PartialCorrect wrong := by
  intro h
  have bad := h 0 1 2 0 rfl
  omega

theorem c01 (k n a r : Nat) (h : run k n a = some r) :
    n < k ∧ r = drain n a := by
  constructor
  · by_cases hk : k ≤ n
    · have hs := short k n a hk
      simp [hs] at h
    · omega
  · exact runAgrees k n a r h

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03Term
#print axioms b03Wrong
#print axioms c01
end Exercises
