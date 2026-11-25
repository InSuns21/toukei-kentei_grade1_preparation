import LvtAntiDiagonal

open LvtAntiDiagonal

#guard winningLines.length == 8
#guard mutantLines.length == 7
#guard wins winningLines [0, 1, 2]
#guard wins mutantLines [0, 1, 2]
#guard !wins winningLines [2, 4]
#guard !wins mutantLines [2, 4]
#eval wins winningLines [2, 4, 6]
#eval wins mutantLines [2, 4, 6]
#check antiDiagonalWitness
#print axioms antiDiagonalWitness
