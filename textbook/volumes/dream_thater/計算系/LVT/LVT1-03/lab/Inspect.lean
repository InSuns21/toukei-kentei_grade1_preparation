import LvtTypes
open LvtTypes

#check Player.x
#check Cell.occupied
#check Cell.occupied Player.x
#check play Player.x
#eval owner Cell.empty
#eval owner (Cell.occupied Player.x)
#eval playExcept .x (.occupied .o)
#check other_twice
#check play_empty
#check play_occupied
