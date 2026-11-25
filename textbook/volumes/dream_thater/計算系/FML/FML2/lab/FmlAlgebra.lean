import Mathlib

universe u v
namespace FmlAlgebra

theorem add_mul_distrib (R : Type u) [Ring R] (a b c : R) :
    (a + b) * c = a * c + b * c := by
  exact add_mul a b c

theorem cancel_nonzero (K : Type u) [Field K] (a b c : K)
    (ha : a ≠ 0) (h : a * b = a * c) : b = c := by
  have h' := congrArg (fun x : K => a⁻¹ * x) h
  simpa [← mul_assoc, inv_mul_cancel₀ ha] using h'

theorem map_square_add (R : Type u) (S : Type v)
    [Ring R] [Ring S] (f : R →+* S) (x y : R) :
    f ((x + y) * (x + y)) = (f x + f y) * (f x + f y) := by
  rw [map_mul, map_add]

theorem scalar_assoc (K : Type u) (L : Type v)
    [Field K] [Field L] [Algebra K L] (a b : K) (x : L) :
    (a * b) • x = a • (b • x) := by
  simp only [Algebra.smul_def, map_mul, mul_assoc]

example : (2 : ZMod 2) = 0 := by decide
example : (1 : ZMod 2) ≠ 0 := by decide
example : (2 : ℚ) ≠ 0 := by norm_num
example : CharP (ZMod 2) 2 := inferInstance

theorem char_two_square (R : Type u) [CommRing R] (h : (2 : R) = 0)
    (x y : R) : (x + y)^2 = x^2 + y^2 := by
  calc
    (x + y)^2 = x^2 + y^2 + (2 : R) * (x * y) := by ring
    _ = x^2 + y^2 := by rw [h, zero_mul, add_zero]

theorem restrict_add (K : Type u) (L : Type v)
    [Field K] [Field L] [Algebra K L] (a : K) (x y : L) :
    a • (x + y) = a • x + a • y := by
  simp only [Algebra.smul_def, mul_add]

end FmlAlgebra
