import LvtTactics
open LvtTactics
#check composeProof
#check routeProof

intro n により n : Nat が局所仮定となり、目標は n = n。反射律 Eq.refl n の型が一致するので exact で閉じる。

apply f は Q を作るための引数 P を新しい目標にする。hp : P があるので exact hp で閉じる。

constructor は And.intro に対応し、先に Q、次に P を要求する。hq で Q を閉じ、hp で P を閉じる。And.intro hq hp と同じ結論になる。

連言の構成子 And.intro の引数 hp : P と hq : Q を取り出す。唯一の枝で目標は Q のままなので hq を渡す。

f hp : Q を得て hq と名付ける。g の入力型は Q なので g hq : R。元の目標 R を exact で閉じる。

左の枝では hp : P を得るので右側の構成子 Or.inr hp : Q ∨ P を選ぶ。右の枝では hq : Q を得るので左側の構成子 Or.inl hq : Q ∨ P を選ぶ。両枝を閉じて元の選言に対する証明になる。
