import FmlMetric

-- The false claim contradicts the verified coefficient of t * t⁻¹.
example :
    ((HahnSeries.single (1 : ℤ) (1 : ℚ) : LaurentSeries ℚ) *
      HahnSeries.single (-1 : ℤ) (1 : ℚ)).coeff 0 = 0 :=
  FML4.pole_cancellation (K := ℚ)
