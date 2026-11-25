import FmlAlgebra

universe u v
namespace FmlExercises
theorem a01 : (2 + 3 : ℤ) * 4 = 20 := by norm_num
theorem a02 : (3 : ZMod 2) = 1 := by decide
theorem a03 : ((3 : ℕ) : ℚ) = 3 := by norm_num
theorem a04 : (2 : ZMod 4) * 2 = 0 ∧ (2 : ZMod 4) ≠ 0 := by decide

theorem a05 (R : Type u) (S : Type v)
    [Ring R] [Ring S] (f : R →+* S) (a b : R) :
    f (a + b) = f a + f b := map_add f a b

theorem b01 (K : Type*) [Field K] (x : K) (h : (2 : K) ≠ 0)
    (hx : 2 * x = 2 * 1) : x = 1 :=
  FmlAlgebra.cancel_nonzero K 2 x 1 h hx

theorem b02 {R S : Type*} [Ring R] [Ring S] (f : R →+* S) (x : R) :
    f (x * x + 1) = f x * f x + 1 := by
  rw [map_add, map_mul, map_one]

theorem b03 (a b : ℚ) (x : ℚ) :
    (a * b) • x = a • (b • x) :=
  FmlAlgebra.scalar_assoc ℚ ℚ a b x

theorem b04 (x y : ℂ) :
    (2 : ℝ) • (x + y) = (2 : ℝ) • x + (2 : ℝ) • y :=
  FmlAlgebra.restrict_add ℝ ℂ 2 x y

theorem c01 (R : Type*) [CommRing R] (h : (2 : R) = 0) (x : R) :
    (x + 1)^2 = x^2 + 1 := by
  simpa using FmlAlgebra.char_two_square R h x 1

theorem c02 : ((1 : ℚ) + 1)^2 ≠ (1 : ℚ)^2 + 1 := by norm_num

#print axioms a01
#print axioms a02
#print axioms a03
#print axioms a04
#print axioms a05
#print axioms b01
#print axioms b02
#print axioms b03
#print axioms b04
#print axioms c01
#print axioms c02
end FmlExercises
