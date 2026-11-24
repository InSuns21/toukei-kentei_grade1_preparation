namespace LvtGame

inductive Player where
  | x | o
  deriving Repr, DecidableEq

inductive Cell where
  | empty | x | o
  deriving Repr, DecidableEq

def mark : Player → Cell
  | .x => .x
  | .o => .o

def other : Player → Player
  | .x => .o
  | .o => .x

abbrev Board := Fin 9 → Cell

structure State where
  board : Board
  turn : Player

def initial : State := ⟨fun _ => .empty, .x⟩

def Line (b : Board) (p : Player) (i j k : Fin 9) : Prop :=
  b i = mark p ∧ b j = mark p ∧ b k = mark p

instance (b : Board) (p : Player) (i j k : Fin 9) : Decidable (Line b p i j k) := by
  unfold Line
  infer_instance

def Wins (b : Board) (p : Player) : Prop :=
  Line b p 0 1 2 ∨ Line b p 3 4 5 ∨ Line b p 6 7 8 ∨
  Line b p 0 3 6 ∨ Line b p 1 4 7 ∨ Line b p 2 5 8 ∨
  Line b p 0 4 8 ∨ Line b p 2 4 6

instance (b : Board) (p : Player) : Decidable (Wins b p) := by
  unfold Wins
  infer_instance

def Full (b : Board) : Prop :=
  b 0 ≠ .empty ∧ b 1 ≠ .empty ∧ b 2 ≠ .empty ∧
  b 3 ≠ .empty ∧ b 4 ≠ .empty ∧ b 5 ≠ .empty ∧
  b 6 ≠ .empty ∧ b 7 ≠ .empty ∧ b 8 ≠ .empty

instance (b : Board) : Decidable (Full b) := by
  unfold Full
  infer_instance

def Finished (s : State) : Prop := Wins s.board .x ∨ Wins s.board .o ∨ Full s.board

instance (s : State) : Decidable (Finished s) := by
  unfold Finished
  infer_instance

def write (b : Board) (i : Fin 9) (c : Cell) : Board :=
  fun j => if j = i then c else b j

def moved (s : State) (i : Fin 9) : State :=
  ⟨write s.board i (mark s.turn), other s.turn⟩

def play (s : State) (n : Nat) : Option State :=
  if Finished s then none
  else if hn : n < 9 then
    if s.board ⟨n, hn⟩ = .empty then some (moved s ⟨n, hn⟩) else none
  else none

theorem write_here (b : Board) (i : Fin 9) (c : Cell) : write b i c i = c := by
  simp [write]

theorem write_else (b : Board) (i j : Fin 9) (c : Cell) (h : j ≠ i) :
    write b i c j = b j := by
  simp [write, h]

theorem reject_finished (s : State) (n : Nat) (hf : Finished s) : play s n = none := by
  simp [play, hf]

theorem reject_range (s : State) (n : Nat) (hn : ¬ n < 9) : play s n = none := by
  by_cases hf : Finished s <;> simp [play, hf, hn]

theorem reject_occupied (s : State) (i : Fin 9) (he : s.board i ≠ .empty) :
    play s i.val = none := by
  by_cases hf : Finished s
  · exact reject_finished s i.val hf
  · have hi : i.val < 9 := i.isLt
    have hh : s.board (⟨i.val, hi⟩ : Fin 9) ≠ .empty := he
    simp [play, hf, hi, hh]

theorem success_spec (s t : State) (n : Nat) (h : play s n = some t) :
    ∃ i : Fin 9, i.val = n ∧ ¬ Finished s ∧ s.board i = .empty ∧ t = moved s i := by
  by_cases hf : Finished s
  · simp [play, hf] at h
  · by_cases hn : n < 9
    · by_cases he : s.board (⟨n, hn⟩ : Fin 9) = .empty
      · have ht : moved s ⟨n, hn⟩ = t := by simpa [play, hf, hn, he] using h
        exact ⟨⟨n, hn⟩, rfl, hf, he, ht.symm⟩
      · simp [play, hf, hn, he] at h
    · simp [play, hf, hn] at h

theorem legal_success (s : State) (i : Fin 9) (hf : ¬ Finished s)
    (he : s.board i = .empty) : play s i.val = some (moved s i) := by
  have hi : i.val < 9 := i.isLt
  have hh : s.board (⟨i.val, hi⟩ : Fin 9) = .empty := he
  simp [play, hf, hi, hh]

theorem old_opponent_cell (b : Board) (p : Player) (i j : Fin 9)
    (h : write b i (mark p) j = mark (other p)) : b j = mark (other p) := by
  by_cases hij : j = i
  · subst j
    cases p <;> simp [write, mark, other] at h
  · simpa [write, hij] using h

theorem old_opponent_line (b : Board) (p : Player) (i a d e : Fin 9)
    (h : Line (write b i (mark p)) (other p) a d e) : Line b (other p) a d e :=
  ⟨old_opponent_cell b p i a h.1, old_opponent_cell b p i d h.2.1,
    old_opponent_cell b p i e h.2.2⟩

theorem old_opponent_win (b : Board) (p : Player) (i : Fin 9)
    (h : Wins (write b i (mark p)) (other p)) : Wins b (other p) := by
  unfold Wins at h ⊢
  rcases h with h | h | h | h | h | h | h | h
  · exact Or.inl (old_opponent_line b p i 0 1 2 h)
  · exact Or.inr (Or.inl (old_opponent_line b p i 3 4 5 h))
  · exact Or.inr (Or.inr (Or.inl (old_opponent_line b p i 6 7 8 h)))
  · exact Or.inr (Or.inr (Or.inr (Or.inl (old_opponent_line b p i 0 3 6 h))))
  · exact Or.inr (Or.inr (Or.inr (Or.inr (Or.inl (old_opponent_line b p i 1 4 7 h)))))
  · exact Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (Or.inl (old_opponent_line b p i 2 5 8 h))))))
  · exact Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (Or.inl (old_opponent_line b p i 0 4 8 h)))))))
  · exact Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (Or.inr (old_opponent_line b p i 2 4 6 h)))))))

theorem success_no_dual (s t : State) (n : Nat) (h : play s n = some t) :
    ¬ (Wins t.board .x ∧ Wins t.board .o) := by
  obtain ⟨i, _, hf, _, rfl⟩ := success_spec s t n h
  intro hw
  have ho : Wins (write s.board i (mark s.turn)) (other s.turn) := by
    cases hp : s.turn with
    | x => simpa [moved, hp, other] using hw.2
    | o => simpa [moved, hp, other] using hw.1
  have old := old_opponent_win s.board s.turn i ho
  apply hf
  cases hp : s.turn with
  | x => exact Or.inr (Or.inl (by simpa [hp, other] using old))
  | o => exact Or.inl (by simpa [hp, other] using old)

inductive Reachable : State → Prop where
  | base : Reachable initial
  | step {s t : State} (h : Reachable s) (n : Nat) :
      play s n = some t → Reachable t

theorem reachable_no_dual {s : State} (h : Reachable s) :
    ¬ (Wins s.board .x ∧ Wins s.board .o) := by
  cases h with
  | base => simp [initial, Wins, Line, mark]
  | step _ n e => exact success_no_dual _ _ n e

def boardList (s : State) : List Cell := List.ofFn s.board

theorem nine_cells (s : State) : (boardList s).length = 9 := by
  simp [boardList]

-- Rejected input leaves the original state at the caller.
def attempt (s : State) (n : Nat) : State := (play s n).getD s

theorem rejected_unchanged (s : State) (n : Nat) (h : play s n = none) :
    attempt s n = s := by
  simp [attempt, h]

def after (moves : List Nat) : State := moves.foldl attempt initial

end LvtGame
