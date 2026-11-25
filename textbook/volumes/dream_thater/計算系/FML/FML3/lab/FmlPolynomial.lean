import Mathlib

namespace FmlPolynomial

open MvPolynomial

theorem eval_generators {σ R S : Type*} [CommSemiring R] [CommSemiring S]
    (f : R →+* S) (a : σ → S) (i : σ) (c : R) :
    eval₂Hom f a (X i + C c) = a i + f c := by
  rw [map_add, eval₂Hom_X', eval₂Hom_C]

theorem finite_field_same_values (a : Unit → ZMod 2) :
    eval a ((X () : MvPolynomial Unit (ZMod 2)) ^ 2) = eval a (X ()) := by
  simp only [map_pow, eval_X]
  letI : Fact (Nat.Prime 2) := ⟨by decide⟩
  exact ZMod.pow_card (a ())

theorem finite_field_distinct :
    (X () : MvPolynomial Unit (ZMod 2)) ^ 2 ≠ X () := by
  intro h
  have hne : Finsupp.single () (1 : ℕ) ≠ Finsupp.single () 2 := by
    intro he
    have hv := congrArg (fun s : Unit →₀ ℕ => s ()) he
    simp at hv
  have hc := congrArg (fun p : MvPolynomial Unit (ZMod 2) =>
    p.coeff (Finsupp.single () 2)) h
  simp [coeff_X_pow, coeff_X, hne] at hc

-- Register 0 is the newest value; old register i becomes i.succ.
inductive Program : Nat → Type
  | halt {n : Nat} (i : Fin n) : Program n
  | add {n : Nat} (i j : Fin n) (tail : Program (n+1)) : Program n
  | mul {n : Nat} (i j : Fin n) (tail : Program (n+1)) : Program n

def Program.size : {n : Nat} → Program n → Nat
  | _, .halt _ => 0
  | _, .add _ _ p => 1 + p.size
  | _, .mul _ _ p => 1 + p.size

def Program.eval {R : Type*} [Semiring R] : {n : Nat} → Program n → (Fin n → R) → R
  | _, .halt i, v => v i
  | _, .add i j p, v => p.eval (Fin.cases (v i + v j) v)
  | _, .mul i j p, v => p.eval (Fin.cases (v i * v j) v)

theorem Program.map_eval {R S : Type*} [Semiring R] [Semiring S]
    (f : R →+* S) {n : Nat} (p : Program n) :
    ∀ v : Fin n → R, f (p.eval v) = p.eval (fun i => f (v i)) := by
  induction p with
  | halt i => intro v; rfl
  | add i j p ih =>
    intro v
    simp only [Program.eval, ih]
    apply congrArg (Program.eval p)
    funext k
    refine Fin.cases ?_ (fun l => ?_) k
    · simp [map_add]
    · simp
  | mul i j p ih =>
    intro v
    simp only [Program.eval, ih]
    apply congrArg (Program.eval p)
    funext k
    refine Fin.cases ?_ (fun l => ?_) k
    · simp [map_mul]
    · simp

-- Start with x,y; compute u=x+y, then u*u, then u*u+u.
def shared : Program 2 :=
  .add 0 1 (.mul 0 0 (.add 0 1 (.halt 0)))

theorem shared_size : shared.size = 3 := rfl

theorem shared_output {R : Type*} [Semiring R] (v : Fin 2 → R) :
    shared.eval v = (v 0 + v 1) * (v 0 + v 1) + (v 0 + v 1) := rfl

theorem shared_polynomial :
    shared.eval (fun i : Fin 2 => (X i : MvPolynomial (Fin 2) ℚ)) =
    X 0 ^ 2 + 2 * X 0 * X 1 + X 1 ^ 2 + X 0 + X 1 := by
  rw [shared_output]
  ring

theorem shared_numeric :
    shared.eval (fun i : Fin 2 => if i = 0 then (2 : ℤ) else 3) = 30 := by
  rw [shared_output]
  decide

end FmlPolynomial
