namespace LvtAntiDiagonal

def winningLines : List (Nat × Nat × Nat) :=
  [(0, 1, 2), (3, 4, 5), (6, 7, 8),
   (0, 3, 6), (1, 4, 7), (2, 5, 8),
   (0, 4, 8), (2, 4, 6)]

def mutantLines : List (Nat × Nat × Nat) :=
  winningLines.filter (fun line => line != (2, 4, 6))

def wins (lines : List (Nat × Nat × Nat)) (marks : List Nat) : Bool :=
  lines.any fun (i, j, k) =>
    marks.contains i && marks.contains j && marks.contains k

theorem antiDiagonalWitness :
    wins winningLines [2, 4, 6] = true ∧
    wins mutantLines [2, 4, 6] = false := by
  decide

end LvtAntiDiagonal
