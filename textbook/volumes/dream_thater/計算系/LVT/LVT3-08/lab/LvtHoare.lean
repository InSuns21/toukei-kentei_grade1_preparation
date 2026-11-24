import Std.WP
import Std.Tactic.Do

open Std.WP Lean.Order
set_option experimental.vcgen true

namespace LvtHoare

def Holds {S T : Type} (f : S → T) (P : S → Prop) (Q : T → Prop) : Prop :=
  ∀ s, P s → Q (f s)

def wpF {S T : Type} (f : S → T) (Q : T → Prop) (s : S) : Prop :=
  Q (f s)

theorem wp_sufficient {S T : Type} (f : S → T) (Q : T → Prop) :
    Holds f (wpF f Q) Q := by
  intro s h
  exact h

theorem wp_weakest {S T : Type} (f : S → T) (P : S → Prop) (Q : T → Prop)
    (h : Holds f P Q) : ∀ s, P s → wpF f Q s := by
  intro s hs
  exact h s hs

theorem wp_seq {S T U : Type} (f : S → T) (g : T → U)
    (Q : U → Prop) (s : S) :
    wpF (fun x => g (f x)) Q s ↔ wpF f (wpF g Q) s := Iff.rfl

theorem wp_branch {S T : Type} (b : S → Bool) (f g : S → T)
    (Q : T → Prop) (s : S) :
    wpF (fun x => if b x then f x else g x) Q s ↔
      (if b s then wpF f Q s else wpF g Q s) := by
  cases h : b s <;> simp [wpF, h]

-- The proof pattern follows the finite-array example in the Lean vcgen tutorial.
def sumLoop (xs : Array Nat) : Nat := Id.run do
  let mut acc := 0
  for x in xs do
    acc := acc + x
  return acc

theorem sumLoop_correct (xs : Array Nat) : sumLoop xs = xs.sum := by
  generalize h : sumLoop xs = r
  apply Id.of_run_eq_wp h
  vcgen invariants
  · fun pref _ acc => pref.sum = acc
  with finish

def seededLoop (k : Nat) (xs : Array Nat) : Nat := Id.run do
  let mut acc := k
  for x in xs do
    acc := acc + x
  return acc

theorem seededLoop_correct (k : Nat) (xs : Array Nat) :
    seededLoop k xs = k + xs.sum := by
  generalize h : seededLoop k xs = r
  apply Id.of_run_eq_wp h
  vcgen invariants
  · fun pref _ acc => acc = k + pref.sum
  with finish

def badLoop (xs : Array Nat) : Nat := Id.run do
  let mut acc := 0
  for x in xs do
    acc := acc + x + 1
  return acc

theorem bad_counterexample : badLoop #[2] ≠ (#[2] : Array Nat).sum := by decide

end LvtHoare
