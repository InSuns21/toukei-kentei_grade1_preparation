import LvtPbt
open LvtPbt

theorem a01 : rangeCheck badRange 8 = true ∧
    rangeCheck badRange 9 = false ∧ rangeCheck badRange 10 = true := by decide

theorem a02 : samples 2 4 = [2, 7, 12, 1] := by decide

theorem a03 : allPass (rangeCheck badRange) [] = true ∧
    failures (rangeCheck badRange) [] = [] := by decide

theorem a04 : failures (rangeCheck badRange) [9, 8, 9] = [9, 9] := by decide

theorem b01 : allPass (rangeCheck badRange) (samples 1 6) = true ∧
    rangeCheck badRange 9 = false := by decide

theorem b02 : (15 : Nat)^2 = 225 ∧ (16 : Nat)^2 = 256 := by decide

theorem b03 (xs : List Nat) :
    allPass (rangeCheck correctRange) xs = true := by
  apply (allPass_spec _ _).mpr
  intro n _
  exact correct_property n

theorem c01 : failures (rangeCheck badRange) (samples 0 16) = [9] ∧
    allPass (rangeCheck correctRange) (samples 0 16) = true ∧
    (15 : Nat)^3 = 3375 ∧ (16 : Nat)^3 = 4096 := by decide

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms c01
