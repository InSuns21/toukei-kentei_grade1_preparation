namespace LvtIntegration

def permit (b t w o : Bool) : Bool := b && t && (!w || o)

def Required (b t w o : Bool) : Prop :=
  b = true ∧ t = true ∧ (w = false ∨ o = true)

theorem permitIff (b t w o : Bool) :
    permit b t w o = true ↔ Required b t w o := by
  cases b <;> cases t <;> cases w <;> cases o <;> simp [permit, Required]

end LvtIntegration
