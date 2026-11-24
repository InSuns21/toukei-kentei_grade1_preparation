import LvtTransitions
open LvtTransitions
namespace Exercises
theorem a01 : Reachable 0 := ReachL.base
theorem a02 : advance 4 .up = none ∧ advance 0 .down = none := ⟨rfl, rfl⟩
theorem a03 : Reachable 2 := ReachL.step reachFour ⟨.down, rfl⟩
theorem a04 : ¬ Reachable 3 := by
  intro h
  have hg : Good 3 := reachableGood h
  have hn : ¬ (3 = 0 ∨ 3 = 2 ∨ 3 = 4) := by decide
  exact hn hg
theorem b01 : ReachL Step 1 3 := ReachL.step ReachL.base ⟨.up, rfl⟩
def AvoidThree (s : Nat) : Prop := s ≠ 3
theorem b02Reach {s : Nat} (h : Reachable s) : AvoidThree s := by
  have hg : s = 0 ∨ s = 2 ∨ s = 4 := reachableGood h
  rcases hg with rfl | rfl | rfl <;> simp [AvoidThree]
theorem b02NotInductive : ¬ IsInductive Step 0 AvoidThree := by
  intro h
  have bad : AvoidThree 3 := h.2 5 3 (by simp [AvoidThree]) ⟨.down, rfl⟩
  exact bad rfl
def Mutant (s t : Nat) : Prop := Step s t ∨ (s = 4 ∧ t = 6)
theorem b03 : ReachL Mutant 0 6 := by
  have h2 : ReachL Mutant 0 2 := ReachL.step ReachL.base (Or.inl ⟨.up, rfl⟩)
  have h4 : ReachL Mutant 0 4 := ReachL.step h2 (Or.inl ⟨.up, rfl⟩)
  exact ReachL.step h4 (Or.inr ⟨rfl, rfl⟩)
theorem c01 (s : Nat) (h : Reachable s) : ReachL Step s 0 := by
  have hg : s = 0 ∨ s = 2 ∨ s = 4 := reachableGood h
  rcases hg with rfl | rfl | rfl
  · exact ReachL.base
  · exact ReachL.step ReachL.base ⟨.down, rfl⟩
  · have h2 : ReachL Step 4 2 := ReachL.step ReachL.base ⟨.down, rfl⟩
    exact ReachL.step h2 ⟨.down, rfl⟩
#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02Reach
#print axioms b02NotInductive
#print axioms b03
#print axioms c01
end Exercises
