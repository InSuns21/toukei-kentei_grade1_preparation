import FmlMetric

-- The claimed multiplication law is false on Laurent series.
example (f g : LaurentSeries ℚ) :
    (f * g).coeff 0 = f.coeff 0 * g.coeff 0 := by
  exact rfl
