import LvtContracts
open Lean LvtContracts
namespace LvtOracle

def decode (line : String) : Except String (String × Order) := do
  let j ← Json.parse line
  let id ← j.getObjValAs? String "id"
  let s ← j.getObjValAs? Nat "stock"
  let k ← j.getObjValAs? Nat "qty"
  pure (id, ⟨s,k⟩)

def answer (line : String) : Json :=
  match decode line with
  | .error _ => Json.mkObj [("id", Json.null), ("status", toJson "error"),
      ("code", toJson "invalid_request")]
  | .ok (id, o) =>
    match takeStock o with
    | none => Json.mkObj [("id", toJson id), ("status", toJson "rejected")]
    | some rest => Json.mkObj [("id", toJson id), ("status", toJson "ok"),
        ("rest", toJson rest)]

def batchModel (xs : List String) : List Json := xs.map answer

def streamModel : List String → List Json
  | [] => []
  | x :: xs => answer x :: streamModel xs

theorem streamEq (xs : List String) : streamModel xs = batchModel xs := by
  induction xs with
  | nil => rfl
  | cons x xs ih =>
    change answer x :: streamModel xs = answer x :: batchModel xs
    rw [ih]

theorem responseCount (xs : List String) : (streamModel xs).length = xs.length := by
  rw [streamEq]
  simp [batchModel]

def hasStatus (j : Json) (s : String) : Bool :=
  match j.getObjValAs? String "status" with
  | .ok v => v == s
  | .error _ => false

def hasRest (j : Json) (n : Nat) : Bool :=
  match j.getObjValAs? Nat "rest" with
  | .ok v => v == n
  | .error _ => false

def checks : Bool :=
  hasStatus (answer "{\"id\":\"a\",\"stock\":5,\"qty\":2}") "ok" &&
  hasRest (answer "{\"id\":\"a\",\"stock\":5,\"qty\":2}") 3 &&
  hasRest (answer "{\"id\":\"b\",\"stock\":2,\"qty\":2}") 0 &&
  hasStatus (answer "{\"id\":\"c\",\"stock\":1,\"qty\":2}") "rejected" &&
  hasStatus (answer "{\"id\":\"d\",\"stock\":4,\"qty\":0}") "rejected" &&
  hasStatus (answer "{") "error" &&
  hasStatus (answer "{\"id\":\"e\",\"stock\":-1,\"qty\":1}") "error"

#guard checks
#eval (streamModel ["{\"id\":\"a\",\"stock\":5,\"qty\":2}", "{",
  "{\"id\":\"b\",\"stock\":2,\"qty\":2}"]).map Json.compress
#print axioms streamEq
#print axioms responseCount

end LvtOracle
