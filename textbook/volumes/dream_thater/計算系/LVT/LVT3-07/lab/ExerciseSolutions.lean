import LvtRefinement
open LvtRefinement
namespace LvtRefinementExercises
theorem a01 : decode ⟨true, false⟩ = decode ⟨false, true⟩ ∧
    (⟨true, false⟩ : Slots) ≠ ⟨false, true⟩ := by decide
theorem a02 : spec .full .put = none ∧ impl ⟨true, true⟩ .put = none := by decide
theorem a03 : impl ⟨false, true⟩ .put = some ⟨true, true⟩ ∧
    spec .one .put = some Count.full := by decide
theorem a04 : advanceC ⟨false, false⟩ .take = ⟨false, false⟩ ∧
    (impl ⟨false, false⟩ .take).isSome = false := by decide
theorem b01 (c : Slots) : decode c = .one →
    (impl c .take).map decode = some Count.empty := by
  intro h
  rw [step_comm, h]
theorem b02 : runC initial [.put, .put, .take, .put] = ⟨true, true⟩ ∧
    obsC initial [.put, .put, .take, .put] = [true, true, true, true] := by decide
theorem b03 : (badImpl ⟨true, true⟩ .put).getD ⟨true, true⟩ =
    advanceC ⟨true, true⟩ .put ∧
    (badImpl ⟨true, true⟩ .put).isSome ≠ (spec .full .put).isSome := by decide
theorem c01 (xs : List Op) :
    decode (runC initial xs) = runA .empty xs ∧
    obsC initial xs = obsA .empty xs := by
  constructor
  · simpa only [initial_comm] using run_comm initial xs
  · simpa only [initial_comm] using obs_comm initial xs
#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
end LvtRefinementExercises
