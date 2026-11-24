import Lean

namespace LvtDependent

def firstL (n : Nat) : Fin (n + 1) :=
  ⟨0, Nat.zero_lt_succ n⟩

def readL (xs : List Nat) (i : Fin xs.length) : Nat := xs.get i

def PositiveL := {n : Nat // 0 < n}

def nextPositive (n : Nat) : PositiveL :=
  ⟨n + 1, Nat.zero_lt_succ n⟩

def SizedL (n : Nat) := {xs : List Nat // xs.length = n}

def prependL {n : Nat} (a : Nat) (xs : SizedL n) : SizedL (n + 1) :=
  ⟨a :: xs.val, congrArg Nat.succ xs.property⟩

theorem prepend_value {n : Nat} (a : Nat) (xs : SizedL n) :
    (prependL a xs).val = a :: xs.val := rfl

def UsedL (cap : Nat) := {n : Nat // n ≤ cap}

def checkedUsed (cap n : Nat) : Option (UsedL cap) :=
  if h : n ≤ cap then some ⟨n, h⟩ else none

def reserveL {cap : Nat} (s : UsedL cap) : Option (UsedL cap) :=
  checkedUsed cap (s.val + 1)

theorem reserve_in {cap : Nat} (s : UsedL cap) (h : s.val + 1 ≤ cap) :
    reserveL s = some ⟨s.val + 1, h⟩ := by
  simp [reserveL, checkedUsed, h]

theorem reserve_out {cap : Nat} (s : UsedL cap) (h : ¬ (s.val + 1 ≤ cap)) :
    reserveL s = none := by
  simp [reserveL, checkedUsed, h]

def resetL {cap : Nat} (_ : UsedL cap) : UsedL cap :=
  ⟨0, Nat.zero_le cap⟩

end LvtDependent
