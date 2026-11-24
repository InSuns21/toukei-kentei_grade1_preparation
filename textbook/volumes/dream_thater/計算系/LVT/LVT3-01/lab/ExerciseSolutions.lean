import LvtContracts
open LvtContracts
namespace LvtContractExercises
theorem a01 : takeStock ⟨5, 2⟩ = some 3 ∧
    takeStock ⟨2, 2⟩ = some 0 := by decide
theorem a02 : takeStock ⟨1, 2⟩ = none := by decide
theorem a03 (stock : Nat) : takeStock ⟨stock, 0⟩ = none :=
  rejectZero stock
theorem a04 : ¬ orderPost ⟨5, 2⟩ (some 4) := by
  intro h
  change (2 : Nat) ≤ 5 ∧ 4 + 2 = 5 at h
  have he := h.2
  omega
theorem b01 : Satisfies orderPre weakPost rejectAll ∧
    ¬ Satisfies orderPre orderPost rejectAll :=
  ⟨weakAllowsReject, rejectNotCorrect⟩
theorem b02 (f : Order → Option Nat) :
    ¬ Satisfies orderPre mustSucceed f := impossible f
theorem b03 (f : Order → Option Nat) :
    Satisfies (fun _ => False) orderPost f := by
  intro o hp
  exact False.elim hp
theorem b04 : ¬ Satisfies (fun _ => True) orderPost takeStock := by
  intro h
  have bad := h ⟨5, 0⟩ True.intro
  rw [rejectZero 5] at bad
  change (5 : Nat) < 0 at bad
  omega
theorem c01 (f : Order → Option Nat)
    (hf : Satisfies orderPre orderPost f)
    (o : Order) (hp : orderPre o) : f o = takeStock o :=
  uniqueOnValid f takeStock hf takeCorrect o hp
end LvtContractExercises
#print axioms LvtContractExercises.a01
#print axioms LvtContractExercises.a02
#print axioms LvtContractExercises.a03
#print axioms LvtContractExercises.a04
#print axioms LvtContractExercises.b01
#print axioms LvtContractExercises.b02
#print axioms LvtContractExercises.b03
#print axioms LvtContractExercises.b04
#print axioms LvtContractExercises.c01
