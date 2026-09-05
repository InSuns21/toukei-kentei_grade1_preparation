# F0-00A3A：選択公理とZornの補題の同値性

A2では選択公理、A3ではZornの補題を「同値な道具」として使いました。この補講では、監査上残っていた

$$
\boxed{\mathrm{AC}\iff\mathrm{Zorn}}
$$

を方向ごとの構成まで証明します。

ただし、集合論で「完全証明」と言うとZFの公理から順序数・超限再帰まで全部作ることになり、講義が一冊増えます。ここでは **ZFだけで証明できる標準的な床** として次を使います。

- 順序数とその基本演算
- Replacement を含むZFの通常の集合形成
- 超限再帰定理

選択公理そのものを密輸入することはしません。

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

## 1. 方向その1：Zornから選択公理へ

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

で定めます。

空関数 $(\varnothing,\varnothing)$ があるので $P$ は非空です。

### 1.2 chainの上界は「関数の合併」

$\mathcal C\subset P$ をchainとします。

$$
J_*:=\bigcup_{(J,f)\in\mathcal C}J,
\qquad
f_*:=\bigcup_{(J,f)\in\mathcal C}f
$$

と置きます。

$\mathcal C$ はchainなので、同じ $i$ を含む二つの部分選択関数は一方が他方を延長しており、値が衝突しません。従って $f_*$ は関数です。

さらに $i\in J_*$ なら、ある $(J,f)\in\mathcal C$ で $i\in J$ なので

$$
f_*(i)=f(i)\in A_i.
$$

従って $(J_*,f_*)\in P$ で、$\mathcal C$ の上界です。

### 1.3 Zornで極大化する

Zornの補題により $P$ は極大元 $(J^*,f^*)$ を持ちます。

もし $J^*\ne I$ なら、ある

$$
i_0\in I\setminus J^*
$$

があります。$A_{i_0}\ne\varnothing$ なので、ある一つの

$$
a_0\in A_{i_0}
$$

を取れます。ここは「一つの非空集合から一つ取る」だけなので選択公理は不要です。

$$
\widetilde J=J^*\cup\{i_0\},
$$

$$
\widetilde f(i)=
\begin{cases}
f^*(i),&i\in J^*,\\
a_0,&i=i_0
\end{cases}
$$

とすれば

$$
(J^*,f^*)\prec(\widetilde J,\widetilde f),
$$

となり極大性に反します。

従って

$$
J^*=I.
$$

よって $f^*$ は全集合族の選択関数です。

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

が存在すれば、像 $j[\alpha]\subset X$ に $\alpha$ の順序を移して、$X$ の部分集合上に順序型 $\alpha$ の整列を作れます。従って

$$
\alpha\in\mathcal O.
$$

しかし定義から $\alpha$ は $\mathcal O$ の全ての元より真に大きく、特に $\alpha<\alpha$ を要求することになって矛盾です。

よって $X$ へ単射できない順序数が存在します。$\square$
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

Hartogs補題により、$X$ へ単射できない順序数 $\alpha$ を一つ取ります。

超限再帰により、まだ選ばれていない元がある限り

$$
x_\beta
:=
c\left(
X\setminus\{x_\xi:\xi<\beta\}
\right)
$$

と定めます。

もし全ての $\beta<\alpha$ で右辺が定義できるなら、

$$
\beta\mapsto x_\beta
$$

は $\alpha$ から $X$ への単射になります。これはHartogs補題に反します。

従って、ある $\beta_0<\alpha$ で

$$
X\setminus\{x_\xi:\xi<\beta_0\}
=\varnothing
$$

となります。

つまり

$$
X=\{x_\xi:\xi<\beta_0\}.
$$

そこで

$$
x_\xi\prec x_\eta
\quad\Longleftrightarrow\quad
\xi<\eta
$$

と順序を移せば、$X$ は整列されます。

従って

$$
\boxed{\mathrm{AC}\Rightarrow\text{well-ordering theorem}}
$$

です。

---

## 4. 整列から極大chainを作る

半順序集合 $(P,\le)$ を考え、全てのchainが上界を持つと仮定します。

前節により $P$ を整列できるので

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

仮定より $C$ は上界 $u\in P$ を持ちます。

全ての $c\in C$ について

$$
c\le u
$$

なので

$$
C\cup\{u\}
$$

もchainです。$C$ の極大性から

$$
u\in C.
$$

ここで $u$ が $P$ の極大元でないと仮定すると

$$
u<v
$$

となる $v\in P$ が存在します。

$u$ は $C$ の上界なので全ての $c\in C$ について

$$
c\le u<v.
$$

従って $C\cup\{v\}$ もchainです。極大性から $v\in C$ ですが、$u$ は $C$ の上界なので

$$
v\le u,
$$

となり $u<v$ に矛盾します。

従って $u$ は極大元です。

以上により

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

前半でZornの補題から部分選択関数を極大化して選択公理を導きました。

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

はZFで証明可能な標準定理です。

従って

> ACを使ってZornを証明する途中で、実はZornを使っていた

という循環にはなっていません。

---

## 7. 演習A

### A01 chain of partial choices

部分選択関数を延長関係で順序付ける。chainの合併が関数になる理由を説明せよ。

<!-- solution-start -->
chain内の二つの部分選択関数は比較可能なので、一方が他方を延長している。共通の定義域では値が一致するため、グラフの合併は一価であり関数になる。
<!-- solution-end -->

### A02 greedy maximal chain

整列された半順序集合で「それまでの採用元すべてと比較可能なら採用する」という手続きが最終的に極大chainを与える理由を説明せよ。

<!-- solution-start -->
不採用になった元は、その判定時点ですでに採用済みの元と比較不能だった。その元は最終chainにも残るので、不採用元を後から追加することはできない。従って最終chainは極大。
<!-- solution-end -->

---

## 8. 演習B

### B01 ZornからAC

非空集合族 $\{A_i\}_{i\in I}$ に対し、部分選択関数の半順序集合を定義し、Zornの補題だけから全域選択関数を構成せよ。

<!-- solution-start -->
$(J,f)$ を $J\subset I$ 上の部分選択関数とし、延長関係で順序付ける。chainの上界は合併。Zornで極大 $(J^*,f^*)$ を得る。$J^*\ne I$ なら未選択の $i_0$ と一つの $a_0\in A_{i_0}$ で真に延長できるため矛盾。よって $J^*=I$。
<!-- solution-end -->

### B02 Hartogsが停止を保証する理由

ACで得た選択関数 $c$ を使い、未選択集合から超限的に元を取り続ける。なぜHartogs順序数より前に必ず $X$ を尽くすか説明せよ。

<!-- solution-start -->
Hartogs補題で $X$ へ単射できない順序数 $\alpha$ を取る。$\alpha$ の全段階で選択が続けば、各段階で新しい元を選ぶので $\beta\mapsto x_\beta$ が $\alpha\to X$ の単射になり矛盾。従って途中で未選択集合が空になる。
<!-- solution-end -->

---

## 9. 監査チェック

A2で「完全な証明は集合論の一講義」として保留していた同値性を、

- Zorn → partial choice function の極大化 → AC
- AC → Hartogs + 超限再帰 → 整列
- 整列 → greedy maximal chain → Zorn

まで閉じました。

ZFの標準定理として使った床も明示しているので、「同値です」で地下数学へ落とす形にはしていません。
