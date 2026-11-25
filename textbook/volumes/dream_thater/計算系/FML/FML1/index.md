# FML1 Mathlib・有限集合・Fin・順列・有限和の形式化

前提：[LVT第I・II部の共通基盤](../../LVT/LVT2-08/index.md)、[COMB1 有限集合の計数](../../COMB/COMB1/index.md)、[COMB2 順列・組合せ](../../COMB/COMB2/index.md)、[COMB3 禁止配置](../../COMB/COMB3/index.md)。

紙上で「添字を並べ替えても和は同じ」と書くとき、並べ替えが本当に全単射か、各添字に対応する関数値がどこへ移るかは読者が補っています。Lean の数学ライブラリ Mathlib では、その条件まで型と証明で指定できます。今回は小さな有限集合を題材に、集合を列挙し、逆写像を持つ順列を扱い、有限和の添字交換を証明します。一般的な Lean の構文・タクティクは LVT で学習済みとします。

## 1. 数学的な対象を型で区別する

### 1.1 有限集合と全要素の列挙

[有限集合の個数](../../COMB/COMB1/index.md#def-comb1-cardinality)を計算したいとき、例えば列 $(2,5,2)$ をそのまま数えれば3項ですが、異なる値の集合 $\{2,5\}$ は2元です。Lean では有限集合を表す型 `Finset α` と、型 `α` の全要素を列挙できることを表す `Fintype α` を区別します。ここで `α` は要素の型です。`Finset α` は `α` が無限の型でも作れます。`DecidableEq α` は2つの値の等しさを判定する手続きを与える型クラス（型ごとに利用できる操作のまとまり）です。判定手続きがあれば、具体的な列から重複を取り除くことができます。

<a id="def-fml1-finset"></a>

<!-- formal-statement-start -->
### 定義（Leanの有限集合表現）

Mathlib の `Finset α` は、要素が型 `α` に属し、重複する要素を持たない有限な集まりを表す型である。内部では順序を区別しない有限列（多重集合）と、重複がないことの証明を組にしている。`s : Finset α` に対し、`x ∈ s` は所属、`s.card` は個数を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml1-finset -->
**定義の確認**　0を含む自然数の型 `Nat` で `({2, 5, 2} : Finset Nat)` を作ります。2と5は異なるので両方が所属し、2をもう一度挿入しても元は増えません。6はどちらとも等しくないので所属しません。したがって元は2と5だけであり、個数は2です。列の長さ3とは異なります。
<!-- definition-example-end -->

~~~lean
example : ({2, 5, 2} : Finset Nat).card = 2 := by decide
example : 6 ∉ ({2, 5, 2} : Finset Nat) := by decide
~~~

有限集合 `s : Finset Nat` が与えられても、自然数全体を列挙したことにはなりません。反対に型が有限で、その全要素を重複なく列挙できれば、部分集合を指定しなくても全要素について和を取れます。

<a id="def-fml1-fintype"></a>

<!-- formal-statement-start -->
### 定義（Leanの有限型の全列挙）

Mathlib の `Fintype α` は、`elems : Finset α` と、任意の `x : α` が `elems` に所属することの証明を持つ型クラスである（この証明のフィールド名は `complete`）。`[Fintype α]` が利用できるとき、`Finset.univ : Finset α` はこの全要素の有限集合を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml1-fintype -->
**定義の確認**　[LVTのFin型](../../LVT/LVT1-05/index.md#def-lvt1-05-fin-index) `Fin 3` の値は0、1、2です。各値は非負で3未満であり、任意の非負整数で3未満のものはこの3つのどれかです。したがって3値は重複なく全要素を尽くし、`Finset.univ : Finset (Fin 3)` の個数は3です。`Fin 0` には値が存在しないので、その全要素の有限集合は空です。
<!-- definition-example-end -->

~~~lean
example : (Finset.univ : Finset (Fin 3)).card = 3 := by decide
example : (Finset.univ : Finset (Fin 0)).card = 0 := by decide
~~~

`i : Fin n` の `i.val : Nat` は添字の数値、`i.isLt` はその数値が `n` 未満である証明です。数値部分が3である `Fin 3` の元は存在しません。ただし Lean の数値リテラルを直接 `Fin n` として解釈すると剰余により値が変わる場合があります。範囲条件そのものを指定する場合は `⟨2, by decide⟩ : Fin 3` のように値と証明を組にします。

### 1.2 順列を逆写像付きで指定する

[重複のない順序付き選択](../../COMB/COMB2/index.md#def-comb2-ordered-selection)では、すべての元を一度ずつ並べる場合が順列です。添字集合の元をその並べ替え先へ送る写像と考えると、元を漏らさず、別の元を同じ場所に送らないことが必要です。Mathlib の `Equiv` は両方向の写像を指定することで、この条件を表現します。

<a id="def-fml1-perm"></a>

<!-- formal-statement-start -->
### 定義（Leanの順列表現）

型 `α`、`β` の同値写像 `e : α ≃ β`（`Equiv α β`）は、写像 $e:\alpha\to\beta$ と逆写像 $e^{-1}:\beta\to\alpha$ を持ち、すべての $i\in\alpha$ と $j\in\beta$ で

$$
e^{-1}(e(i))=i,\qquad e(e^{-1}(j))=j
$$

を満たす。`e.symm` は逆写像を表す。`Equiv.Perm α` は `Equiv α α` であり、有限型 `α` ではその全要素の順列を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-fml1-perm -->
**定義の確認**　型 `α` を `Fin 3` とし、0と2を入れ替え、1をそのままにする写像 $p$ を考えます。値は $p(0)=2$、$p(1)=1$、$p(2)=0$ です。逆写像も同じ写像であり、$p(p(0))=p(2)=0$、$p(p(1))=1$、$p(p(2))=p(0)=2$ と確認できます。3つの添字を尽くしたので、両方の逆写像条件が成立します。
<!-- definition-example-end -->

~~~lean
def swap02 : Equiv.Perm (Fin 3) := Equiv.swap 0 2
example : swap02 0 = 2 := by decide
example : swap02 1 = 1 := by decide
example : swap02 2 = 0 := by decide
~~~

一方、すべての添字を0へ送る関数は `Fin 3 → Fin 3` ですが、順列ではありません。逆写像があれば、0と1がともに0へ送られることから逆写像の値が0でも1でもなければならず、矛盾します。型が関数であることと、逆写像条件を持つことを区別しましょう。

## 2. 有限和の添字交換

自然数を値に取る関数 $f$ に対し、有限集合の各元について $f$ の値を足す操作を有限和と呼びます。`∑ i ∈ s, f i` は集合 `s` 上の和、`∑ i : α, f i` は `Fintype α` があるときの全要素上の和です。後者は `Finset.univ` 上の和の略記です。空の和は0です。

例えば `Fin 3` で $f(i)=i+1$ とすると、通常の順序では $1+2+3=6$、0と2を入れ替えると $3+2+1=6$ です。自然数の加法は交換法則と結合法則を満たすので、項の位置を入れ替えても和は変わりません。ただし同じ添字を重複して使用して別の添字を落とすと、一般には和が変わります。

<a id="thm-fml1-reindex"></a>

<!-- formal-statement-start -->
### 定理（有限和の双射による添字交換）

$\alpha,\beta$ を有限集合、$e:\alpha\to\beta$ を逆写像を持つ全単射、$f:\beta\to\mathbb N_0$ を関数とする。ここで $\mathbb N_0$ は0を含む自然数の集合である。このとき

$$
\sum_{i\in\alpha} f(e(i))
=\sum_{j\in\beta} f(j).
$$

<!-- formal-statement-end -->

**証明の見取り図**　$\alpha$ の各元の値を一度ずつ列挙します。[順列表現の二つの逆写像条件](#def-fml1-perm)により、$e$ で移した列は $\beta$ の全元をちょうど一度ずつ含みます。左右の和の項はこれにより対応します。

<!-- proof-start -->
### 証明

$\alpha$ の異なる全元を $i_1,\ldots,i_n$ と列挙する。$e(i_k)=e(i_l)$ と仮定して両辺に $e^{-1}$ を適用すると $i_k=i_l$ となるので $k=l$ である。従って列 $e(i_1),\ldots,e(i_n)$ に重複はない。

任意の $j\in\beta$ について $i=e^{-1}(j)$ は $\alpha$ の元である。よってある $k$ で $i=i_k$ となり、

$$
e(i_k)=e(e^{-1}(j))=j
$$

である。従ってこの列は $\beta$ の元を尽くす。

自然数の有限和は列挙順に依存しない。実際、二つの列挙が空ならどちらも0である。空でなければ、一方の先頭の元を他方で探し、その位置から隣接交換を繰り返して先頭へ移す。交換する二項を $a,b$、それより前と後の部分和を $u,v$ とする。自然数の加法では $(u+a)+b=u+(a+b)$ かつ $a+b=b+a$ である（Leanではそれぞれ `Nat.add_assoc u a b`、`Nat.add_comm a b`）。従って

$$
\begin{gathered}
((u+a)+b)+v=(u+(a+b))+v\\
=(u+(b+a))+v=((u+b)+a)+v.
\end{gathered}
$$

各交換で和は変わらない。先頭の項が等しくなった後、残りの短い列挙に同じ帰納法を適用すると残りの和も等しい。これにより長さについての帰納法が閉じる。

以上から、$\beta$ の和を $e(i_1),\ldots,e(i_n)$ の順に計算してよいので、

$$
\sum_{j\in\beta} f(j)
=f(e(i_1))+\cdots+f(e(i_n))
=\sum_{i\in\alpha} f(e(i)).
$$

$n=0$ なら、全射性から $\beta$ も空であり両辺は0である。
<!-- proof-end -->

### 2.1 Leanで仮定を一つずつ渡す

[定理探索](../../LVT/LVT2-08/index.md#def-lvt2-08-search)では、結論の形から使える補題を探しました。今回は固定版 Mathlib の `Finset.sum_bij'` を使います。これは2つの有限集合間で、各元の所属、両方向の逆写像条件、対応する添字における二つの関数値の一致を証明すれば和が等しいとする補題です。ソースの [Finsetの再添字付け補題](https://github.com/leanprover-community/mathlib4/blob/56a005855ea17e0b0958f73ec801ae140b0a1679/Mathlib/Algebra/BigOperators/Group/Finset/Defs.lean) で条件を確認できます。

~~~lean
theorem sum_reindex {α β : Type*} [Fintype α] [Fintype β]
    (e : α ≃ β) (f : β → Nat) :
    (∑ i : α, f (e i)) = ∑ j : β, f j := by
  classical
  refine Finset.sum_bij' (fun i _ => e i) (fun j _ => e.symm j) ?_ ?_ ?_ ?_ ?_
  · intro i hi
    exact Finset.mem_univ _
  · intro j hj
    exact Finset.mem_univ _
  · intro i hi
    exact e.symm_apply_apply i
  · intro j hj
    exact e.apply_symm_apply j
  · intro i hi
    rfl
~~~

二つの添字集合は `Finset.univ` なので、最初の二つの目標はどの元でも所属することで閉じます。次の二つは `Equiv` の逆写像条件です。最後の関数値の一致は、左側の関数を `fun i => f (e i)`、右側の関数を `f` としたのでどちらも `f (e i)` になり、`rfl` で閉じます。`fun i _ => ...` の第2引数は所属の証明であり、この例では写像の値がその証明に依存しないので使っていません。

定理は `Nat` を値域として述べました。より一般の和にもライブラリ補題は使えますが、必要な代数的構造は次講で扱います。

**反例**　$e(i)=0$ を `Fin 3` 上の定数関数とし、$f(i)=i$ とする。左は $0+0+0=0$、右は $0+1+2=3$ です。失われた仮定は全単射性であり、同じ添字を3回数え、1と2を落としています。`e.symm` を持つ型へこの関数をそのまま入れることもできません。

## 3. 順列の固定点と逆写像

[錯置と固定点](../../COMB/COMB3/index.md#def-comb3-derangement)では、順列 $p$ が $i$ を動かさないとき、$i$ は固定点でした。例えば上の0と2を交換する順列では、1だけが固定点です。逆写像を用いて順列を記述するとき、固定点の条件が変わらないことを証明しておくと、順列の向きを逆にしても同じ点を数えられます。

<a id="prop-fml1-fixed-inverse"></a>

<!-- formal-statement-start -->
### 命題（順列と逆写像の固定点一致）

集合 $\alpha$ 上の順列 $p$ と任意の $i\in\alpha$ に対して

$$
p(i)=i\quad\Longleftrightarrow\quad p^{-1}(i)=i.
$$

<!-- formal-statement-end -->

**証明の見取り図**　固定点の等式の両辺に逆向きの写像を適用すると、逆写像の等式が得られます。

<!-- proof-start -->
### 証明

$p(i)=i$ と仮定する。両辺に $p^{-1}$ を適用して

$$
i=p^{-1}(p(i))=p^{-1}(i)
$$

を得るので $p^{-1}(i)=i$ である。逆に $p^{-1}(i)=i$ と仮定して両辺に $p$ を適用すると

$$
i=p(p^{-1}(i))=p(i)
$$

となる。従って両方向の含意が成立する。
<!-- proof-end -->

~~~lean
theorem fixed_iff_inverse {α : Type*} (p : Equiv.Perm α) (i : α) :
    p i = i ↔ p.symm i = i := by
  constructor
  · intro h
    calc
      p.symm i = p.symm (p i) := congrArg (fun j => p.symm j) h.symm
      _ = i := p.symm_apply_apply i
  · intro h
    calc
      p i = p (p.symm i) := congrArg (fun j => p j) h.symm
      _ = i := p.apply_symm_apply i
~~~

Lean の `constructor` は同値を二つの含意に分け、`congrArg` は [関数適用に関する等式の合同性](../../LVT/LVT2-03/index.md#prop-lvt2-03-congr) を用いて、等しいものへ同じ関数を適用して得られる等式を作ります。紙上と Lean の等式の向きを照合してください。命題は有限性を仮定しません。有限型で固定点の個数を求めるときだけ全要素の列挙が必要です。

## 4. 固定した Mathlib 環境で再現する

Mathlib は Lean 上の数学ライブラリであり、有限集合・順列・和の定義と補題が収録されています。[固定されたLeanプロジェクト](../../LVT/LVT1-02/index.md#def-lvt1-02-fixed-environment) の考え方に従い、本講は Lean 4.35.0 と対応する [Mathlib v4.35.0 のコミット](https://github.com/leanprover-community/mathlib4/tree/56a005855ea17e0b0958f73ec801ae140b0a1679) を固定します。`lake-manifest.json` は依存パッケージのコミットも記録します。

リポジトリを取得し、ルートから次を実行します。初回は依存パッケージとキャッシュの取得にネットワーク接続が必要です。

~~~bash
cd "textbook/volumes/dream_thater/計算系/FML/FML1/lab"
lean --version
lake exe cache get
lake build
lake env lean Inspect.lean
lake env lean ExerciseSolutions.lean
~~~

- [FmlFinite.lean](lab/FmlFinite.lean)：二つの主要結果と有限集合・Finの例。
- [Inspect.lean](lab/Inspect.lean)：2元の有限集合、空の添字集合、通常の和と並べ替えた和を表示し、公理依存を出力する。
- [ExerciseSolutions.lean](lab/ExerciseSolutions.lean)：演習の計算・証明を再現する。
- [Failure.lean](lab/Failure.lean)：全単射でない添字変更による誤った等式が拒否されることを確かめる。

`Inspect.lean` の和は両方6になります。これは具体例の計算であり、任意の有限型についての定理は `sum_reindex` の証明で検査します。誤った等式については別に

~~~bash
lake env lean Failure.lean
~~~

を実行し、証明に失敗することを確認します。依存モジュールを読み込めないというエラーとは区別します。[Leanの公理依存](../../LVT/LVT2-08/index.md#def-lvt2-08-axioms)を `#print axioms` で確認し、未証明の仮定 `sorryAx` に依存していないことも調べます。

## 5. 演習と詳細解答

### Level A

### FML1-A01 集合と列

列 $(4,7,4)$ から有限集合を作る。4、7、8の所属と個数を求め、Lean で確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Leanの有限集合表現](#def-fml1-finset)では重複を区別しないので、最初の4と最後の4は同じ元です。7は4と異なるので残ります。8は4でも7でもないので所属しません。よって集合は $\{4,7\}$ であり、個数は2です。

~~~lean
example : 4 ∈ ({4, 7, 4} : Finset Nat) := by decide
example : 7 ∈ ({4, 7, 4} : Finset Nat) := by decide
example : 8 ∉ ({4, 7, 4} : Finset Nat) := by decide
example : ({4, 7, 4} : Finset Nat).card = 2 := by decide
~~~
<!-- solution-end -->

### FML1-A02 添字の境界

`Fin 4` と `Fin 0` の全要素を答えよ。4を数値部分として持つ `Fin 4` の値は作れるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[Fin型](../../LVT/LVT1-05/index.md#def-lvt1-05-fin-index)の条件は数値が非負で上限未満であることです。0、1、2、3は4未満なので `Fin 4` の元です。4は $4<4$ を満たさないため、数値部分4の元はありません。`Fin 0` では非負整数が0未満になることはないので空です。[有限型の全列挙](#def-fml1-fintype)での個数は順に4と0です。

~~~lean
example : (Finset.univ : Finset (Fin 4)).card = 4 := by decide
example (i : Fin 4) : i.val ≠ 4 := by
  have hi := i.isLt
  omega
~~~
<!-- solution-end -->

### FML1-A03 交換と逆写像

`Fin 3` 上で0と1を入れ替え、2を動かさない順列 $q$ を作る。$q^{-1}(0)$、$q^{-1}(1)$、$q^{-1}(2)$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$q(0)=1$、$q(1)=0$、$q(2)=2$ です。[順列表現](#def-fml1-perm)の逆写像条件 $q(q^{-1}(j))=j$ に従い、0に送られる元は1、1に送られる元は0、2に送られる元は2です。従って逆写像の値は順に1、0、2です。

~~~lean
def q : Equiv.Perm (Fin 3) := Equiv.swap 0 1
example : q.symm 0 = 1 := by decide
example : q.symm 1 = 0 := by decide
example : q.symm 2 = 2 := by decide
~~~
<!-- solution-end -->

### FML1-A04 全要素の和と空の和

$f(i)=2i+1$ として `Fin 3` 上の和を求めよ。`Fin 0` 上ではどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[有限型の全列挙](#def-fml1-fintype)で添字は0、1、2です。代入すると $2\cdot0+1=1$、$2\cdot1+1=3$、$2\cdot2+1=5$ なので、和は $1+3+5=9$ です。`Fin 0` の列挙は空であり、足す項がないので0になります。

~~~lean
example : (∑ i : Fin 3, (2 * i.val + 1)) = 9 := by decide
example : (∑ i : Fin 0, (2 * i.val + 1)) = 0 := by decide
~~~
<!-- solution-end -->

### Level B

### FML1-B01 異なる添字型の間の交換

$A=\{0,1\}$、$B=\{a,b\}$ とし、$e(0)=b$、$e(1)=a$、$f(a)=4$、$f(b)=7$ とする。逆写像を示し、左右の和を計算せよ。Lean では任意の有限型の同値写像について対応する等式を証明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$e^{-1}(a)=1$、$e^{-1}(b)=0$ とすると、$e^{-1}(e(0))=e^{-1}(b)=0$、$e^{-1}(e(1))=e^{-1}(a)=1$ です。また $e(e^{-1}(a))=e(1)=a$、$e(e^{-1}(b))=e(0)=b$ です。よって両方向の条件を満たすので [有限和の双射による添字交換](#thm-fml1-reindex) を使えます。左は $f(b)+f(a)=7+4=11$、右は $f(a)+f(b)=4+7=11$ です。

~~~lean
example {α β : Type*} [Fintype α] [Fintype β]
    (e : α ≃ β) (f : β → Nat) :
    (∑ i : α, f (e i)) = ∑ j : β, f j :=
  FmlFinite.sum_reindex e f
~~~

ここでは任意の `e` が逆写像条件を持つことが型から分かり、有限型の全要素を列挙する条件も二つの `Fintype` が与えます。
<!-- solution-end -->

### FML1-B02 重複する値と重複する添字

`Fin 3` 上で $p$ は0と2の交換、$f(0)=f(1)=4$、$f(2)=7$ とする。$f$ 自体は単射でない。$f(p(i))$ の和が元の和と等しいか、理由と計算を示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$f$ の値4は2つの添字から生じますが、和は値の集合ではなく添字ごとに足す操作です。$p$ は [順列表現](#def-fml1-perm)の両方向の条件を満たすので [有限和の双射による添字交換](#thm-fml1-reindex) が適用できます。通常は $4+4+7=15$、交換後は $7+4+4=15$ です。必要なのは添字写像 $p$ の全単射性であり、$f$ の単射性ではありません。
<!-- solution-end -->

### FML1-B03 全単射の仮定

`Fin 3` 上で $g$ を定数関数0とし、$f(i)=i+1$ とする。$f(g(i))$ の和と $f(i)$ の和を求め、添字交換の証明がどこで使えなくなるか述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$g(0)=g(1)=g(2)=0$ なので左は $1+1+1=3$、右は $1+2+3=6$ です。もし $g$ に左逆写像 $h$ があれば、$h(g(0))=0$ と $h(g(1))=1$ から $h(0)=0$ かつ $h(0)=1$ となり矛盾します。また1も2も像に含まれません。[有限和の双射による添字交換](#thm-fml1-reindex)の証明で、像の列が全要素を重複なく尽くす部分が成立しなくなります。

~~~lean
example : (∑ _i : Fin 3, (1 : Nat)) ≠
    ∑ i : Fin 3, (i.val + 1) := by decide
~~~
<!-- solution-end -->

### Level C

### FML1-C01 逆向きの順列と重み付き固定点

有限集合 $\alpha$ の順列 $p$ と重み $w:\alpha\to\mathbb N_0$ を考える。任意の順列 $q$ について $I_q(i)$ を $q(i)=i$ のとき $w(i)$、そうでないとき0と定める。次の二つの和が等しいことを証明せよ。

$$
\sum_{i\in\alpha} I_p(p(i))
=\sum_{i\in\alpha} I_{p^{-1}}(i).
$$

- Level: C

<!-- solution-start -->
#### 詳細解答

まず [有限和の双射による添字交換](#thm-fml1-reindex) を、両方の添字集合を $\alpha$、全単射を $p$、関数を $I_p$ として適用します。$p$ は [順列表現](#def-fml1-perm)の条件を満たし、$\alpha$ は有限なので、

$$
\sum_{i\in\alpha} I_p(p(i))
=\sum_{i\in\alpha} I_p(i)
$$

です。

次に任意の $i$ について [順列と逆写像の固定点一致](#prop-fml1-fixed-inverse) を使います。$p(i)=i$ のとき $p^{-1}(i)=i$ であるため両方の関数値は $w(i)$ です。$p(i)\ne i$ のとき、もし $p^{-1}(i)=i$ なら同命題の逆方向から矛盾するので、両方の関数値は0です。従ってすべての $i$ で $I_p(i)=I_{p^{-1}}(i)$ となります。各項の等式を足すことで

$$
\sum_{i\in\alpha} I_p(i)
=\sum_{i\in\alpha} I_{p^{-1}}(i)
$$

を得て、二つの等式をつなげれば結論です。空集合でも両方の和が0です。

Lean では最初の等式を `sum_reindex`、次の等式を `Finset.sum_congr` で示します。`DecidableEq α` により条件の真偽を判断して関数を定義できます。

~~~lean
def weight {α : Type*} [DecidableEq α]
    (p : Equiv.Perm α) (w : α → Nat) (i : α) : Nat :=
  if p i = i then w i else 0

theorem weighted_inverse {α : Type*} [Fintype α] [DecidableEq α]
    (p : Equiv.Perm α) (w : α → Nat) :
    (∑ i : α, weight p w (p i)) =
      ∑ i : α, weight p.symm w i := by
  calc
    (∑ i : α, weight p w (p i)) = ∑ i : α, weight p w i :=
      FmlFinite.sum_reindex p (weight p w)
    _ = ∑ i : α, weight p.symm w i := by
      apply Finset.sum_congr rfl
      intro i hi
      by_cases h : p i = i
      · have h' := (FmlFinite.fixed_iff_inverse p i).mp h
        simp [weight, h, h']
      · have h' : p.symm i ≠ i :=
          fun hs => h ((FmlFinite.fixed_iff_inverse p i).mpr hs)
        simp [weight, h, h']
~~~
<!-- solution-end -->

## 6. 次講への接続

有限型、全単射、自然数値の有限和を数学の式と Lean の型・証明に対応させました。次講では、値域を環や体に拡張するため、型クラスがどの演算と法則を供給するのかを学びます。

参考：[Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/)、[Theorem Proving in Lean 4](https://leanprover.github.io/theorem_proving_in_lean4/)。
