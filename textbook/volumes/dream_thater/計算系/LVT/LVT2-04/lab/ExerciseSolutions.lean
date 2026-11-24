import LvtTactics
open LvtTactics

-- LVT2-04-A01
intro n により n : Nat が局所仮定となり、目標は n = n。反射律 Eq.refl n の型が一致するので exact で閉じる。

-- LVT2-04-A02
apply f は Q を作るための引数 P を新しい目標にする。hp : P があるので exact hp で閉じる。

-- LVT2-04-A03
constructor は And.intro に対応し、先に Q、次に P を要求する。hq で Q を閉じ、hp で P を閉じる。And.intro hq hp と同じ結論になる。

-- LVT2-04-A04
連言の構成子 And.intro の引数 hp : P と hq : Q を取り出す。唯一の枝で目標は Q のままなので hq を渡す。

-- LVT2-04-A05
f hp : Q を得て hq と名付ける。g の入力型は Q なので g hq : R。元の目標 R を exact で閉じる。

-- LVT2-04-B01
左の枝では hp : P を得るので右側の構成子 Or.inr hp : Q ∨ P を選ぶ。右の枝では hq : Q を得るので左側の構成子 Or.inl hq : Q ∨ P を選ぶ。両枝を閉じて元の選言に対する証明になる。

-- LVT2-04-B02
[Leanの等式の対称律と推移律](../LVT2-03/index.md#prop-lvt2-03-chain) により Eq.symm k : b = c を hbc とする。目標 a = c に Eq.trans h を適用すると中間点は b に固定され、残りは b = c。hbc がその証明である。

-- LVT2-04-B03
h の型は P ∧ Q であって P ではない。[Leanの連言の導入・除去規則](../LVT2-02/index.md#def-lvt2-02-and) の射影 And.left h : P を作って exact に渡す。例えば P=True、Q=False のとき P と P ∧ Q の真理値は異なるため、一般に二つを同じ型とは扱えない。

-- LVT2-04-C01
intro h で h : P ∨ Q を得る。have hr : R の副目標では、左枝 hp : P に f hp : R、右枝 hq : Q に g hq : R を与える。元の目標 R ∧ S に戻ると hr : R が利用できる。constructor は R と S を要求し、前者を hr、後者を k hr : S で閉じる。証明項では h を Or.elim に渡すと同じ hr が得られ、And.intro hr (k hr) が最終結果になる。
