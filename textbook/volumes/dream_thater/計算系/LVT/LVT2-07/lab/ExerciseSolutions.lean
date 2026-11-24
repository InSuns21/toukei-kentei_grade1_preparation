import LvtDependent
open LvtDependent

-- A01
example : readL [5, 8] ⟨1, by decide⟩ = 8 := rfl
-- A02
example : PositiveL := ⟨4, by decide⟩
example : ¬ (0 < (0 : Nat)) := by decide
-- A03
example : SizedL 0 := ⟨[], rfl⟩
-- A04
example (s : UsedL 5) : s.val ≤ 5 := s.property
-- B01
example (a b : Nat) (xs : SizedL 2) :
    SizedL 4 := prependL a (prependL b xs)
-- B02
example : reserveL (⟨2, by decide⟩ : UsedL 3) =
    some ⟨3, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨3, by decide⟩ : UsedL 3) = none :=
  reserve_out _ (by decide)
-- B03
example : (resetL (⟨2, by decide⟩ : UsedL 3)).val ≠ 3 := by decide
-- C01
example : reserveL (⟨0, by decide⟩ : UsedL 2) =
    some ⟨1, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨1, by decide⟩ : UsedL 2) =
    some ⟨2, by decide⟩ := reserve_in _ (by decide)
example : reserveL (⟨2, by decide⟩ : UsedL 2) = none :=
  reserve_out _ (by decide)
example (s : UsedL 2) : s.val ≤ 2 := s.property
