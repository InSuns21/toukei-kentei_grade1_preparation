import Mathlib

open Filter WithZero
open scoped Topology

namespace FML4

theorem convergence_cauchy {X : Type*} [MetricSpace X]
    {u : Nat → X} {a : X}
    (h : Tendsto u atTop (𝓝 a)) : CauchySeq u := by
  rw [Metric.cauchySeq_iff]
  intro ε hε
  obtain ⟨N, hN⟩ :=
    Metric.tendsto_atTop.mp h (ε / 2) (by linarith)
  refine ⟨N, ?_⟩
  intro m hm n hn
  have h1 := hN m hm
  have h2 := hN n hn
  calc
    dist (u m) (u n) ≤ dist (u m) a + dist a (u n) :=
      dist_triangle _ _ _
    _ < ε := by
      rw [dist_comm a (u n)]
      linarith

theorem complete_limit {X : Type*} [MetricSpace X]
    [CompleteSpace X] {u : Nat → X}
    (h : CauchySeq u) : ∃ a, Tendsto u atTop (𝓝 a) :=
  cauchySeq_tendsto_of_complete h

theorem coeff_agreement {K : Type*} [Field K]
    (f g : LaurentSeries K) (D : ℤ) :
    Valued.v (f - g) ≤ exp (-D : ℤ) ↔
      ∀ i : ℤ, i < D → f.coeff i = g.coeff i := by
  rw [LaurentSeries.valuation_le_iff_coeff_lt_eq_zero K]
  constructor
  · intro h i hi
    exact sub_eq_zero.mp (by simpa only [HahnSeries.coeff_sub] using h i hi)
  · intro h i hi
    rw [HahnSeries.coeff_sub, h i hi, sub_self]

theorem laurent_complete {K : Type*} [Field K] :
    CompleteSpace (LaurentSeries K) := inferInstance

theorem laurent_limit {K : Type*} [Field K]
    {u : Nat → LaurentSeries K} (h : CauchySeq u) :
    ∃ a, Tendsto u atTop (𝓝 a) :=
  cauchySeq_tendsto_of_complete h

theorem constant_coeff_mul {K : Type*} [Field K] (f g : PowerSeries K) :
    PowerSeries.constantCoeff (f * g) =
      PowerSeries.constantCoeff f * PowerSeries.constantCoeff g :=
  map_mul PowerSeries.constantCoeff f g

theorem pole_cancellation {K : Type*} [Field K] :
    ((HahnSeries.single (1 : ℤ) (1 : K) : LaurentSeries K) *
      HahnSeries.single (-1 : ℤ) (1 : K)).coeff 0 = 1 := by
  rw [HahnSeries.single_mul_single]
  norm_num

theorem laurent_constant_not_mul {K : Type*} [Field K] :
    ¬ (∀ f g : LaurentSeries K, (f * g).coeff 0 = f.coeff 0 * g.coeff 0) := by
  intro h
  have heq := h (HahnSeries.single (1 : ℤ) (1 : K))
    (HahnSeries.single (-1 : ℤ) (1 : K))
  rw [pole_cancellation] at heq
  have hp : (0 : ℤ) ≠ 1 := by decide
  have hn : (0 : ℤ) ≠ -1 := by decide
  rw [HahnSeries.coeff_single_of_ne hp, HahnSeries.coeff_single_of_ne hn, zero_mul] at heq
  exact one_ne_zero heq

end FML4
