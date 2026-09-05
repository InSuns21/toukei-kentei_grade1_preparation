# F0-00A3A：選択公理とZornの補題の同値性

A2では選択公理を導入し、A3では [Zornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) を極大延長の道具として使いました。この補講では

$$
\boxed{\mathrm{AC}\iff\mathrm{Zorn}}
$$

を方向ごとの構成まで証明します。

ただし、集合論で「完全証明」と言うとZFの公理から順序数・超限再帰まで全部作ることになり、講義が一冊増えます。ここでは **ZFだけで証明できる標準的な床** として

- 順序数とその基本演算
- Replacement を含むZFの通常の集合形成
- 超限再帰定理

を使います。選択公理そのものを途中で密輸入することはしません。

証明の流れは

```text
Zorn
  ↓ partial choice function を極大化
AC

AC
  ↓ Hartogs + transfinite recursion
well-ordering theorem
  ↓ greedy maximal chain
Zorn
```

です。

---

## 1. Zornから選択公理へ

非空集合族

$$
\{A_i\}_{i\in I}
$$

を任意に取ります。目標は

$$
f(i)\in A_i
\qquad(\forall i\in I)
$$

を満たす選択関数を作ることです。

### 1.1 部分的な選択関数を全部集める

$J\subset I$ とし、$J$ 上だけ選択できている写像

$$
f:J\to\bigcup_{i\in I}A_i,
\qquad f(i)\in A_i
$$

を考えます。

そのような組 $(J,f)$ 全体を $P$ とし、

$$
(J,f)\preceq(K,g)
$$

を

$$
J\subset K,
\qquad g|_J=f
$$

で定めます。空関数 $(\varnothing,\varnothing)$ があるので $P$ は非空です。

### 1.2 chainの上界は「関数の合併」

$\mathcal C\subset P$ をchainとします。

$$
J_*:=\bigcup_{(J,f)\in\mathcal C}J,
\qquad
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置きます。

$\mathcal C$ はchainなので、同じ $i$ を含む二つの部分選択関数は一方が他方を延長しており、共通定義域で値が一致します。従って $f_*$ はwell-definedな関数です。

さらに $i\in J_*$ なら、ある $(J,f)\in\mathcal C$ で $i\in J$ なので

$$
f_*(i)=f(i)\in A_i.
$$

よって $(J_*,f_*)\in P$ であり、$\mathcal C$ の上界です。

### 1.3 極大部分選択関数は全域である

[Zornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) により、$P$ は極大元 $(J^*,f^*)$ を持ちます。

もし $J^*\ne I$ なら、ある

$$
i_0\in I\setminus J^*
$$

があります。$A_{i_0}\ne\varnothing$ なので、一つの元

$$
a_0\in A_{i_0}
$$

を取れます。ここは「一つの非空集合から一つ取る」だけなので選択公理は不要です。

$$
\widetilde J=J^*\cup\{i_0\}
$$

とし

$$
\widetilde f(i)=
\begin{cases}
f^*(i),&i\in J^*,\\
a_0,&i=i_0
\end{cases}
$$

と置けば

$$
(J^*,f^*)\prec(\widetilde J,\widetilde f),
$$

となり極大性に反します。従って $J^*=I$ であり、$f^*$ は全集合族の選択関数です。

以上で

$$
\boxed{\mathrm{Zorn}\Rightarrow\mathrm{AC}}
$$

が示されました。

---

## 2. ACからZornへ進むためのHartogs補題

ACからZornへは、まず任意の集合を整列させます。その停止保証に使うのがHartogs補題です。

<a id="lem-f0-00a3a-hartogs"></a>

<!-- formal-statement-start -->
> **補題（Hartogs）**  
> 任意の集合 $X$ に対して、$X$ へ単射できない順序数 $\alpha$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X$ の部分集合上の整列関係をすべて考えます。整列関係は $X\times X$ の部分集合として表せるので、それら全体は集合になります。

各整列集合には一意な順序型、すなわち順序数が対応します。Replacement により、それらの順序型全体

$$
\mathcal O
$$

も集合です。

そこで

$$
\alpha:=\sup\{\beta+1:\beta\in\mathcal O\}
$$

と置きます。すると

$$
\beta<\alpha
\qquad(\forall\beta\in\mathcal O).
$$

もし単射

$$
j:\alpha\to X
$$

が存在すれば、像 $j[\alpha]\subset X$ に $\alpha$ の順序を移して、$X$ の部分集合上に順序型 $\alpha$ の整列を作れます。従って $\alpha\in\mathcal O$ です。

しかし定義から $\alpha$ は $\mathcal O$ の全ての元より真に大きいので矛盾です。よって $X$ へ単射できない順序数が存在します。$\square$
<!-- proof-end -->

Hartogs補題はZFだけで証明でき、選択公理を使いません。

---

## 3. ACから整列可能定理へ

集合 $X$ を任意に取ります。

ACを、$X$ の非空部分集合すべてからなる族

$$
\mathcal P(X)\setminus\{\varnothing\}
$$

へ適用します。すると選択関数

$$
c(A)\in A
\qquad(A\ne\varnothing)
$$

が存在します。

Hartogs補題により、$X$ へ単射できない順序数 $\alpha$ を一つ取ります。超限再帰により、まだ選ばれていない元がある限り

$$
x_\beta
:=
c\left(
X\setminus\{x_\xi:\xi<\beta\}
\right)
$$

と定めます。

もし全ての $\beta<\alpha$ で右辺が定義できるなら

$$
\beta\mapsto x_\beta
$$

は $\alpha$ から $X$ への単射になります。これはHartogs補題に反します。

従って、ある $\beta_0<\alpha$ で

$$
X\setminus\{x_\xi:\xi<\beta_0\}
=\varnothing
$$

となり

$$
X=\{x_\xi:\xi<\beta_0\}
$$

です。

そこで

$$
x_\xi\prec x_\eta
\quad\Longleftrightarrow\quad
\xi<\eta
$$

と順序を移せば、$X$ は整列されます。従って

$$
\boxed{\mathrm{AC}\Rightarrow\text{well-ordering theorem}}
$$

です。

---

## 4. 整列から極大chainを作る

半順序集合 $(P,\le)$ を考えます。前節により $P$ を整列できるので

$$
P=\{p_\alpha:\alpha<\kappa\}
$$

と整列順に並べます。

超限再帰でchain $C$ を作ります。段階 $\alpha$ で、$p_\alpha$ がそれまで採用した全ての元と比較可能なら採用し、そうでなければ飛ばします。

各段階でchain性を保つので、最終的な採用集合 $C$ はchainです。

さらに $C$ は極大chainです。実際、$q=p_\alpha\notin C$ なら、$q$ を判定した段階で既に採用済みのある $c\in C$ と比較不能だったから除外されています。その $c$ は最後まで $C$ に残るので、$q$ を後から加えてもchainにはできません。

従って $C$ は包含関係で極大です。

---

## 5. 極大chainの上界は極大元になる

ここで $(P,\le)$ の全てのchainが $P$ 内に上界を持つと仮定します。前節の極大chain $C$ に上界 $u\in P$ を取ります。

全ての $c\in C$ について $c\le u$ なので $C\cup\{u\}$ もchainです。$C$ の極大性から

$$
u\in C.
$$

$u$ が $P$ の極大元でないと仮定すると、ある $v\in P$ が

$$
u<v
$$

を満たします。

$u$ は $C$ の上界なので全ての $c\in C$ について

$$
c\le u<v.
$$

従って $C\cup\{v\}$ もchainです。極大性から $v\in C$ ですが、$u$ は $C$ の上界なので $v\le u$ となり、$u<v$ に矛盾します。

従って $u$ は極大元です。これで

$$
\boxed{\mathrm{AC}\Rightarrow\mathrm{Zorn}}
$$

が示されました。

---

## 6. 同値性をまとめる

<a id="thm-f0-00a3a-ac-zorn-equivalence"></a>

<!-- formal-statement-start -->
> **定理（選択公理とZornの補題の同値性）**  
> ZFの上で、選択公理とZornの補題は同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前半で [Zornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) から部分選択関数を極大化して選択公理を導きました。

後半では、選択公理からHartogs補題と超限再帰を使って整列可能定理を導き、その整列順にgreedyに極大chainを構成し、chainの上界が極大元になることを示しました。

従って

$$
\boxed{
\mathrm{AC}
\iff
\mathrm{Zorn}
}.
$$

$\square$
<!-- proof-end -->

### 6.1 依存関係を正確に読む

この証明でAC以外に使った

- Hartogs補題
- 超限再帰定理

はZFで証明可能な標準定理です。従って「ACを使ってZornを証明する途中で、実はZornを使っていた」という循環にはなっていません。

---

## 7. 演習A

### A01 chain of partial choices

非空集合族 $\{A_i\}_{i\in I}$ を考える。$J\subset I$ 上の部分選択関数 $(J,f)$ を延長関係で順序付ける。chain $\mathcal C$ に対して、グラフの合併

$$
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

が関数になる理由を示せ。

<!-- solution-start -->
#### 詳細解答

$\mathcal C$ はchainなので、任意の $(J_1,f_1),(J_2,f_2)\in\mathcal C$ は比較可能です。例えば

$$
(J_1,f_1)\preceq(J_2,f_2)
$$

なら $J_1\subset J_2$ かつ $f_2|_{J_1}=f_1$ です。従って $i\in J_1\cap J_2$ なら

$$
f_1(i)=f_2(i).
$$

つまりchain内の部分関数は共通定義域で値が一致します。そのためグラフを全部合併しても、同じ入力 $i$ に二つの異なる出力が割り当てられることはありません。よって $f_*$ は関数です。

#### 本番答案

chain内の任意の二つの部分選択関数は延長関係で比較可能であり、共通定義域では値が一致する。従ってグラフの合併は一価であり、関数になる。

#### 採点基準（20点）

- chainなので任意の二要素が比較可能：6点
- 延長関係から共通定義域で値が一致：8点
- よって合併が一価な関数：6点
<!-- solution-end -->

### A02 greedy maximal chain

整列された半順序集合 $(P,\le)$ で、整列順に元を見て「それまで採用した全ての元と比較可能なら採用する」という手続きを行う。最終的な採用集合 $C$ が極大chainになる理由を示せ。

<!-- solution-start -->
#### 詳細解答

採用時には既存の全要素との比較可能性を確認するので、各段階で採用集合はchainです。従って最終集合 $C$ もchainです。

次に $q\in P\setminus C$ を取ります。$q$ が処理された段階で不採用になったので、その時点ですでに採用されていたある $c\in C$ と $q$ は比較不能でした。採用済みの $c$ は後で削除されないため、最終的にも $c\in C$ です。

従って $C\cup\{q\}$ はchainではありません。任意の $q\notin C$ を追加できないので、$C$ は極大chainです。

#### 本番答案

手続きは採用集合のchain性を保つ。不採用元 $q$ には、判定時点ですでに採用済みで $q$ と比較不能な元 $c$ が存在し、その $c$ は最終集合にも残る。よって $q$ を後から追加できないため、最終chainは極大である。

#### 採点基準（20点）

- 各段階でchain性が保たれる：6点
- 不採用元に比較不能な採用済み元が存在：8点
- 後から追加不能なので極大：6点
<!-- solution-end -->

---

## 8. 演習B

### B01 ZornからAC

非空集合族 $\{A_i\}_{i\in I}$ が与えられたとする。部分選択関数の半順序集合を自分で定義し、[Zornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) から全域選択関数を構成せよ。chainの上界と、極大部分選択関数が全域でなければならない理由を明示すること。

<!-- solution-start -->
#### 詳細解答

$P$ を、$J\subset I$ と写像

$$
f:J\to\bigcup_{i\in I}A_i,
\qquad f(i)\in A_i
$$

からなる組 $(J,f)$ 全体とします。順序を

$$
(J,f)\preceq(K,g)
\iff
J\subset K,
\quad g|_J=f
$$

で定めます。

chain $\mathcal C\subset P$ に対し

$$
J_*:=\bigcup_{(J,f)\in\mathcal C}J,
\qquad
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置きます。chain内では部分関数が互いに延長関係にあるため、$f_*$ はwell-definedな関数で $(J_*,f_*)\in P$ です。従って全chainが上界を持ちます。

[Zornの補題](../F0_00A3_半順序_Zorn_極大延長/index.md#thm-zorn) から極大元 $(J^*,f^*)$ を得ます。もし $J^*\ne I$ なら $i_0\in I\setminus J^*$ を一つ取り、$A_{i_0}\ne\varnothing$ から $a_0\in A_{i_0}$ を一つ取ります。$f^*$ に $f(i_0)=a_0$ を追加すれば真に延長でき、極大性に反します。

従って $J^*=I$ であり、$f^*$ は選択関数です。

#### 本番答案

部分選択関数 $(J,f)$ を延長関係で半順序付ける。chainの上界は定義域と関数グラフの合併で与えられるため、Zornを適用して極大部分選択関数 $(J^*,f^*)$ を得る。$J^*\ne I$ なら未選択の $i_0$ と $a_0\in A_{i_0}$ を一つ取り $f^*$ を真に延長でき、極大性に矛盾。よって $J^*=I$ で、$f^*$ は全域選択関数。

#### 採点基準（20点）

- 部分選択関数の半順序集合を正しく定義：5点
- chainの上界を合併で構成：6点
- Zornを適用して極大元を取得：3点
- 未選択添字があれば延長できる矛盾：6点
<!-- solution-end -->

### B02 Hartogsが停止を保証する理由

集合 $X$ に対し、ACで非空部分集合を選ぶ関数 $c$ を得たとする。$X$ へ単射できないHartogs順序数 $\alpha$ を取り、未選択集合から超限的に

$$
x_\beta
=
c\left(X\setminus\{x_\xi:\xi<\beta\}\right)
$$

と選ぶ。なぜ $\alpha$ の全段階を使い切る前に $X$ を尽くすか示せ。

<!-- solution-start -->
#### 詳細解答

反対に、全ての $\beta<\alpha$ で未選択集合が非空だったと仮定します。このとき $x_\beta$ は毎段階、それ以前に選ばれていない元から選ばれるため

$$
\beta\ne\eta
\quad\Longrightarrow\quad
x_\beta\ne x_\eta.
$$

従って

$$
j:\alpha\to X,
\qquad j(\beta)=x_\beta
$$

は単射です。しかし $\alpha$ はHartogs補題により $X$ へ単射できないように選んだ順序数なので矛盾です。

従って、ある $\beta_0<\alpha$ で未選択集合が空になり

$$
X=\{x_\xi:\xi<\beta_0\}
$$

となります。

#### 本番答案

全 $\beta<\alpha$ で選択が続くと、各段階で未選択元を取るため $\beta\mapsto x_\beta$ は $\alpha\to X$ の単射になる。これはHartogs順序数 $\alpha$ の定義に反する。従って途中の段階で未選択集合が空になる。

#### 採点基準（20点）

- 各段階で新しい元が選ばれることを確認：6点
- $\beta\mapsto x_\beta$ が単射になると指摘：6点
- Hartogs補題との矛盾：5点
- 途中で $X$ を尽くす結論：3点
<!-- solution-end -->

### B03 整列可能定理からZornを導く

任意の集合が整列可能であると仮定する。半順序集合 $(P,\le)$ の全chainが上界を持つとき、整列順にgreedyな極大chainを作る方法を使って、$P$ に極大元が存在することを一続きに証明せよ。

<!-- solution-start -->
#### 詳細解答

整列可能性により

$$
P=\{p_\alpha:\alpha<\kappa\}
$$

と整列します。整列順に $p_\alpha$ を調べ、それまで採用した全要素と比較可能なときだけ採用します。得られる集合 $C$ はchainです。

$q=p_\alpha\notin C$ なら、不採用時点で既採用のある $c\in C$ と比較不能でした。この $c$ は最後まで残るので $q$ は最終 $C$ に追加できません。従って $C$ は極大chainです。

仮定より $C$ は上界 $u\in P$ を持ちます。$C\cup\{u\}$ はchainなので極大性から $u\in C$ です。

もし $u$ が極大元でなければ $u<v$ となる $v\in P$ が存在します。全ての $c\in C$ について $c\le u<v$ なので $C\cup\{v\}$ もchainとなり、$C$ の極大性に反します。

従って $u$ は $P$ の極大元です。これはZornの結論です。

#### 本番答案

$P$ を整列し、整列順に「既採用元すべてと比較可能なら採用」して極大chain $C$ を作る。仮定より $C$ は上界 $u$ を持つ。$C\cup\{u\}$ もchainなので $u\in C$。もし $u<v$ なら $C\cup\{v\}$ もchainとなって $C$ の極大性に反する。よって $u$ は極大元である。

#### 採点基準（20点）

- 整列順greedyでchainを構成：5点
- 構成したchainの極大性：5点
- chainの上界 $u$ を取得し $u\in C$ を示す：4点
- $u<v$ を仮定してchainを延長する矛盾：6点
<!-- solution-end -->

---

## 9. この章で確認したこと

A2で保留していた同値性を、

- Zorn → partial choice function の極大化 → AC
- AC → Hartogs + 超限再帰 → 整列
- 整列 → greedy maximal chain → Zorn

までつなぎました。

演習ではA2/B3を通じて、各方向の構成を自力で再現できるようにしています。
