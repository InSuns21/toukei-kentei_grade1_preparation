namespace LvtAudit

inductive Reach {S : Type} (initial : S) (move : S → Nat → Except String S) : S → Prop where
  | base : Reach initial move initial
  | step {s t : S} {n : Nat} :
      Reach initial move s → move s n = .ok t → Reach initial move t

theorem reachableMeasure {S : Type} {initial : S}
    {move : S → Nat → Except String S} (measure : S → Nat)
    (hbase : measure initial = 9)
    (preserve : ∀ s n t, move s n = .ok t → measure t = measure s)
    {s : S} (h : Reach initial move s) : measure s = 9 := by
  induction h with
  | base => exact hbase
  | step hs hm ih => exact (preserve _ _ _ hm).trans ih

def initialBoard : List (Option Bool) := List.replicate 9 none
def write (b : List (Option Bool)) (n : Nat) : Except String (List (Option Bool)) :=
  .ok (b.set n (some true))

theorem writeLength (b : List (Option Bool)) (n : Nat)
    (t : List (Option Bool)) (h : write b n = .ok t) : t.length = b.length := by
  unfold write at h
  cases h
  simp

theorem nine {b : List (Option Bool)} (h : Reach initialBoard write b) :
    b.length = 9 :=
  reachableMeasure List.length (by rfl) writeLength h

end LvtAudit
