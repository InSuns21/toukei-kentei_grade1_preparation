import Lean
namespace LvtTermination

def run : Nat → Nat → Nat → Option Nat
  | 0, _, _ => none
  | _ + 1, 0, a => some a
  | k + 1, n + 1, a => run k n (a + 1)

def PartialCorrect (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  ∀ k n a r, exec k n a = some r → r = a + n

def Terminates (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  ∀ n a, ∃ k r, exec k n a = some r

def TotalCorrect (exec : Nat → Nat → Nat → Option Nat) : Prop :=
  PartialCorrect exec ∧ Terminates exec

theorem runPartial : PartialCorrect run := by
  intro k
  induction k with
  | zero =>
    intro n a r h
    simp [run] at h
  | succ k ih =>
    intro n a r h
    cases n with
    | zero =>
      simpa [run] using h.symm
    | succ n =>
      have h' : run k n (a + 1) = some r := h
      have hr := ih n (a + 1) r h'
      omega

theorem enough (n a : Nat) : run (n + 1) n a = some (a + n) := by
  induction n generalizing a with
  | zero => simp [run]
  | succ n ih =>
    change run (n + 1) n (a + 1) = some (a + (n + 1))
    rw [ih]
    congr 1 <;> omega

theorem short (k n a : Nat) (h : k ≤ n) : run k n a = none := by
  induction k generalizing n a with
  | zero => rfl
  | succ k ih =>
    cases n with
    | zero => omega
    | succ n =>
      change run k n (a + 1) = none
      exact ih n (a + 1) (by omega)

theorem runTerminates : Terminates run := by
  intro n a
  exact ⟨n + 1, a + n, enough n a⟩

theorem runTotal : TotalCorrect run := ⟨runPartial, runTerminates⟩

def never (_ _ _ : Nat) : Option Nat := none

theorem neverPartial : PartialCorrect never := by
  intro k n a r h
  simp [never] at h

theorem neverNotTerminates : ¬ Terminates never := by
  intro h
  obtain ⟨k, r, hr⟩ := h 0 0
  simp [never] at hr

def drain : Nat → Nat → Nat
  | 0, a => a
  | n + 1, a => drain n (a + 1)

theorem drainCorrect (n a : Nat) : drain n a = a + n := by
  induction n generalizing a with
  | zero => simp [drain]
  | succ n ih =>
    change drain n (a + 1) = a + (n + 1)
    rw [ih]
    omega

theorem runAgrees (k n a r : Nat) (h : run k n a = some r) :
    r = drain n a := by
  rw [drainCorrect]
  exact runPartial k n a r h

end LvtTermination
