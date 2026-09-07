# MT2 標準測度論：符号付き測度・Hahn–Jordan 分解・全変動

この章では、正の測度だけでは表せない「差」を測度として扱うための最小コアを構成します。

主役は実数値の符号付き測度

$$
\nu:\mathcal F\to\mathbb R
$$

です。この章ではこれを **有限符号付き測度** と呼びます。まず Hahn 分解を **Radon–Nikodym 定理に頼らず** 証明し、そこから Jordan 分解と全変動を導きます。

```text
正の測度・Lebesgue積分（MTI）
          ↓
有限符号付き測度
          ↓
値域の有界性
          ↓
Hahn分解
          ↓
Jordan分解  ν = ν⁺ - ν⁻
          ↓
全変動      |ν| = ν⁺ + ν⁻
          ↓
符号付き測度に関する積分・評価
          ↓
Radon–Nikodym / Lebesgue分解（MT3）
```

重要なのは、Hahn–Jordan 分解を後続の Radon–Nikodym 定理から逆輸入しないことです。依存の向きをこの章だけで閉じます。

---

## 1. 有限符号付き測度

測度空間 $(X,\mathcal F)$ を固定します。

<a id="def-mt2-signed-measure"></a>
<!-- formal-statement-start -->
### 定義（有限符号付き測度）

写像

$$
\nu:\mathcal F\to\mathbb R
$$

が有限符号付き測度であるとは、

1. $\nu(\varnothing)=0$、
2. 互いに素な可測集合列 $(E_n)$ に対して
   $$
   \boxed{\nu\left(\bigsqcup_{n=1}^{\infty}E_n\right)
   =\sum_{n=1}^{\infty}\nu(E_n)}
   $$
   が成り立つこと

をいう。
<!-- formal-statement-end -->

右辺は実数へ収束します。正の測度と違って単調性は一般にはありません。例えば $\nu=\mu_1-\mu_2$ なら、$A\subset B$ でも $\nu(A)\le\nu(B)$ とは限りません。

<a id="def-mt2-positive-negative-set"></a>
<!-- formal-statement-start -->
### 定義（正集合・負集合・零集合）

$P\in\mathcal F$ が $\nu$ の **正集合**であるとは、任意の可測集合 $A\subset P$ に対して

$$
\nu(A)\ge0
$$

となることをいう。

$N\in\mathcal F$ が **負集合**であるとは、任意の可測集合 $A\subset N$ に対して

$$
\nu(A)\le0
$$

となることをいう。

$Z$ が **$\nu$-零集合**であるとは、任意の可測集合 $A\subset Z$ に対して

$$
\nu(A)=0
$$

となることをいう。
<!-- formal-statement-end -->

「$\nu(Z)=0$」だけでは $Z$ が $\nu$-零集合とは限りません。正負の相殺が起こり得るからです。この区別は Hahn 分解の一意性で効きます。

---

## 2. 符号付き測度の連続性

Hahn 分解の極限操作で必要になるので、正の測度の定理を名前だけ借りず、有限符号付き測度について直接確認します。

<a id="thm-mt2-continuity-below"></a>
<!-- formal-statement-start -->
### 補題（下からの連続性）

$E_1\subset E_2\subset\cdots$、$E=\bigcup_nE_n$ とする。このとき

$$
\boxed{\nu(E_n)\to\nu(E)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
D_1=E_1,
\qquad
D_n=E_n\setminus E_{n-1}\quad(n\ge2)
$$

と置くと、$(D_n)$ は互いに素で

$$
E_n=\bigsqcup_{k=1}^{n}D_k,
\qquad
E=\bigsqcup_{k=1}^{\infty}D_k.
$$

可算加法性より

$$
\nu(E)=\sum_{k=1}^{\infty}\nu(D_k),
$$

一方、有限加法性より

$$
\nu(E_n)=\sum_{k=1}^{n}\nu(D_k).
$$

右辺は同じ収束級数の部分和なので $\nu(E_n)\to\nu(E)$。$\square$
<!-- proof-end -->

<a id="thm-mt2-continuity-above"></a>
<!-- formal-statement-start -->
### 補題（上からの連続性）

$E_1\supset E_2\supset\cdots$、$E=\bigcap_nE_n$ とする。このとき

$$
\boxed{\nu(E_n)\to\nu(E)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$E_1\setminus E_n\uparrow E_1\setminus E$ です。[下からの連続性](#thm-mt2-continuity-below)より

$$
\nu(E_1\setminus E_n)\to\nu(E_1\setminus E).
$$

互いに素な分解

$$
E_1=E_n\sqcup(E_1\setminus E_n)
$$

から

$$
\nu(E_n)=\nu(E_1)-\nu(E_1\setminus E_n).
$$

全て実数値なので通常の差を取ることができ、極限を通せば

$$
\nu(E_n)\to\nu(E_1)-\nu(E_1\setminus E)=\nu(E).
$$

$\square$
<!-- proof-end -->

正の測度の上からの連続性で必要だった「最初の集合の測度が有限」という条件がここに現れないのは、最初から $\nu(E_1)\in\mathbb R$ を仮定しているためです。

---

## 3. 有限符号付き測度の値域は自動的に有界

Hahn 分解では

$$
m=\inf_{A\in\mathcal F}\nu(A)
$$

を使います。各 $\nu(A)$ が有限でも、集合 $A$ を動かしたとき $m=-\infty$ でないことは別途示す必要があります。

<a id="thm-mt2-range-bounded"></a>
<!-- formal-statement-start -->
### 補題（値域の有界性）

有限符号付き測度 $\nu$ に対して

$$
\boxed{
-\infty<\inf_{A\in\mathcal F}\nu(A)
\le
\sup_{A\in\mathcal F}\nu(A)<\infty.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず下に有界でないと仮定して矛盾を導きます。

可測集合 $E$ に対し

$$
m(E):=\inf\{\nu(A):A\in\mathcal F,\ A\subset E\}
$$

と書きます。仮定は $m(X)=-\infty$ です。

$E$ が $m(E)=-\infty$ を満たすとします。$\nu(E)$ は有限なので、可測 $A\subset E$ を

$$
\nu(A)<\min\{-2,\nu(E)-2\}
$$

となるように取れます。すると

$$
\nu(A)<-2,
\qquad
\nu(E\setminus A)=\nu(E)-\nu(A)>2.
$$

さらに $A$ と $E\setminus A$ の両方で $m$ が有限なら、任意の $C\subset E$ を

$$
C=(C\cap A)\sqcup(C\cap(E\setminus A))
$$

と分けることで

$$
\nu(C)\ge m(A)+m(E\setminus A)>-\infty,
$$

となり $m(E)=-\infty$ に反します。したがって $A$ と $E\setminus A$ の少なくとも一方では $m=-\infty$ のままです。

そこで $E_0=X$ から出発し、各段階で $m(E_n)=-\infty$ を保つ側を $E_{n+1}$ とし、捨てた側を $B_{n+1}$ とします。上の構成により

$$
|\nu(B_n)|>2
$$

であり、$(B_n)$ は互いに素です。

可算加法性から

$$
\nu\left(\bigsqcup_{n=1}^{\infty}B_n\right)
=
\sum_{n=1}^{\infty}\nu(B_n)
$$

ですが、左辺は実数です。従って右辺の級数は収束し、特に

$$
\nu(B_n)\to0
$$

でなければなりません。これは $|\nu(B_n)|>2$ に矛盾します。

よって

$$
\inf_A\nu(A)>-\infty.
$$

上側については

$$
\nu(A)=\nu(X)-\nu(X\setminus A)
$$

なので、右辺の第2項が一様に下から抑えられることから

$$
\sup_A\nu(A)<\infty
$$

も従います。$\square$
<!-- proof-end -->

この補題があるため、Hahn 分解の証明で「ほぼ最小値を取る集合」を可算個選ぶ操作が正当化されます。

---

## 4. Hahn 分解

<a id="thm-mt2-hahn"></a>
<!-- formal-statement-start -->
### 定理（Hahn 分解）

有限符号付き測度 $\nu$ に対して、互いに素な可測集合 $P,N$ が存在し、

$$
\boxed{X=P\sqcup N}
$$

かつ $P$ は $\nu$ の正集合、$N$ は $\nu$ の負集合となる。
<!-- formal-statement-end -->

### 証明の見取り図

値の小さい集合を一つだけ選んでも、その集合が負集合であるとは限りません。そこで

$$
m=\inf_A\nu(A)
$$

へ高速に近づく集合 $E_k$ を並べ、尾部和ならぬ「尾部合併」

$$
F_n=\bigcup_{k\ge n}E_k
$$

を作ります。$F_n$ の測度も $m$ に近いことを示してから

$$
N=\bigcap_nF_n
$$

とすれば $\nu(N)=m$ となります。最小値を実際に達成した集合 $N$ は負集合で、その補集合は正集合であることを最小性から示せます。

<!-- proof-start -->
### 証明

[値域の有界性](#thm-mt2-range-bounded)より

$$
m:=\inf_{A\in\mathcal F}\nu(A)>-\infty.
$$

各 $k\ge1$ について可測集合 $E_k$ を

$$
m\le\nu(E_k)<m+2^{-k}
$$

となるように選びます。

$n\le r$ に対して

$$
U_{n,r}=\bigcup_{k=n}^{r}E_k
$$

と置きます。任意の可測集合 $A,B$ について

$$
\nu(A\cup B)
=
\nu(A)+\nu(B)-\nu(A\cap B)
$$

であり、$\nu(A\cap B)\ge m$ です。従って帰納的に

$$
\nu(U_{n,r})
<
m+\sum_{k=n}^{r}2^{-k}.
$$

$r\to\infty$ として

$$
F_n:=\bigcup_{k=n}^{\infty}E_k
$$

と置くと、$U_{n,r}\uparrow F_n$ です。[下からの連続性](#thm-mt2-continuity-below)より

$$
m\le\nu(F_n)
\le
m+\sum_{k=n}^{\infty}2^{-k}
=
m+2^{1-n}.
$$

しかも

$$
F_1\supset F_2\supset\cdots.
$$

そこで

$$
N:=\bigcap_{n=1}^{\infty}F_n
$$

と置きます。[上からの連続性](#thm-mt2-continuity-above)と上の挟み撃ちから

$$
\nu(N)=\lim_{n\to\infty}\nu(F_n)=m.
$$

次に $N$ が負集合であることを示します。もし可測 $A\subset N$ で $\nu(A)>0$ となるものがあれば

$$
\nu(N\setminus A)
=
\nu(N)-\nu(A)
=
m-\nu(A)<m,
$$

となり $m$ の定義に矛盾します。従って全ての可測 $A\subset N$ で $\nu(A)\le0$、すなわち $N$ は負集合です。

最後に

$$
P=X\setminus N
$$

と置きます。もし可測 $B\subset P$ で $\nu(B)<0$ となるものがあれば、$N$ と $B$ は互いに素なので

$$
\nu(N\cup B)=\nu(N)+\nu(B)=m+\nu(B)<m,
$$

となり再び $m$ の定義に矛盾します。従って $P$ は正集合です。

以上より $X=P\sqcup N$ は Hahn 分解です。$\square$
<!-- proof-end -->

### Hahn 分解は集合としては一意でない

零集合を正側から負側へ移しても Hahn 分解の条件は壊れません。しかし非一意性は零部分に限られます。

<a id="thm-mt2-hahn-unique-null"></a>
<!-- formal-statement-start -->
### 命題（Hahn 分解の本質的一意性）

$(P,N)$ と $(P',N')$ がともに Hahn 分解なら、

$$
P\triangle P'
$$

は $\nu$-零集合である。従って $N\triangle N'$ も $\nu$-零集合である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$P\cap N'$ は $P$ の部分集合なので正集合であり、同時に $N'$ の部分集合なので負集合です。従って任意の可測 $A\subset P\cap N'$ について

$$
0\le\nu(A)\le0,
$$

すなわち $\nu(A)=0$。よって $P\cap N'$ は $\nu$-零集合です。同様に $P'\cap N$ も $\nu$-零集合です。

$$
P\triangle P'=(P\cap N')\cup(P'\cap N).
$$

任意の可測 $A\subset P\triangle P'$ は

$$
A=(A\cap P\cap N')\sqcup(A\cap P'\cap N)
$$

と分かれ、各項の $\nu$-値は0です。従って $P\triangle P'$ 自体が $\nu$-零集合です。$N\triangle N'=P\triangle P'$ も同様です。$\square$
<!-- proof-end -->

---

## 5. Jordan 分解

Hahn 分解 $(P,N)$ を一つ固定します。

<a id="def-mt2-jordan-parts"></a>
<!-- formal-statement-start -->
### 定義（Jordan 正負部分）

可測集合 $E$ に対して

$$
\boxed{
\nu^+(E):=\nu(E\cap P),
\qquad
\nu^-(E):=-\nu(E\cap N)}
$$

と定める。
<!-- formal-statement-end -->

$P$ は正集合、$N$ は負集合なので $\nu^+,\nu^-$ は非負値です。可算加法性は $\nu$ の可算加法性から直ちに従うため、どちらも有限な正の測度です。また

$$
\nu(E)
=\nu(E\cap P)+\nu(E\cap N)
=\nu^+(E)-\nu^-(E).
$$

<a id="thm-mt2-jordan"></a>
<!-- formal-statement-start -->
### 定理（Jordan 分解）

有限符号付き測度 $\nu$ に対して、互いに特異な有限正測度 $\nu^+,\nu^-$ が一意に存在して

$$
\boxed{\nu=\nu^+-\nu^-}
$$

となる。

さらに任意の $E\in\mathcal F$ について

$$
\boxed{
\nu^+(E)=\sup\{\nu(A):A\in\mathcal F,\ A\subset E\},}
$$

$$
\boxed{
\nu^-(E)=-\inf\{\nu(A):A\in\mathcal F,\ A\subset E\}.}
$$
<!-- formal-statement-end -->

ここで $\nu^+\perp\nu^-$ は、ある可測分割 $X=P\sqcup N$ が存在して

$$
\nu^+(N)=0,
\qquad
\nu^-(P)=0
$$

となることを意味します。

<!-- proof-start -->
### 証明

Hahn 分解から作った $\nu^+,\nu^-$ が正測度で、$\nu=\nu^+-\nu^-$、かつ互いに特異であることは上で確認しました。

次に上限表示を示します。$A\subset E$ なら

$$
\nu(A)
=
\nu(A\cap P)+\nu(A\cap N)
\le
\nu(A\cap P)
\le
\nu(E\cap P)
=
\nu^+(E).
$$

従って

$$
\sup_{A\subset E}\nu(A)\le\nu^+(E).
$$

一方 $A=E\cap P$ を選べば

$$
\nu(A)=\nu(E\cap P)=\nu^+(E),
$$

なので等号です。同様に $E\cap N$ を使えば

$$
\nu^-(E)=-\inf_{A\subset E}\nu(A)
$$

を得ます。従って Hahn 分解から作った正負部分は $\nu$ だけから決まり、Hahn 分解の選び方には依存しません。

最後に「互いに特異な差表示」の一意性を確認します。有限正測度 $\alpha,\beta$ が

$$
\nu=\alpha-\beta,
\qquad
\alpha\perp\beta
$$

を満たすとします。特異性より可測分割 $X=S\sqcup T$ を

$$
\alpha(T)=0,
\qquad
\beta(S)=0
$$

となるように取れます。任意の可測 $A\subset S$ では

$$
\nu(A)=\alpha(A)-\beta(A)=\alpha(A)\ge0,
$$

任意の可測 $A\subset T$ では

$$
\nu(A)=\alpha(A)-\beta(A)=-\beta(A)\le0.
$$

従って $(S,T)$ 自身が Hahn 分解です。上限表示、または Hahn 分解からの定義を使えば

$$
\nu^+(E)=\nu(E\cap S)=\alpha(E\cap S)=\alpha(E),
$$

$$
\nu^-(E)=-\nu(E\cap T)=\beta(E\cap T)=\beta(E).
$$

よって任意の互いに特異な表現は同じ $\nu^+,\nu^-$ に一致し、Jordan 分解は一意です。$\square$
<!-- proof-end -->

### Jordan 分解は「差としての表現」の最小形

<a id="thm-mt2-jordan-minimal"></a>
<!-- formal-statement-start -->
### 命題（Jordan 分解の最小性）

有限正測度 $\alpha,\beta$ が

$$
\nu=\alpha-\beta
$$

を満たすなら、任意の $E\in\mathcal F$ で

$$
\boxed{\nu^+(E)\le\alpha(E),
\qquad
\nu^-(E)\le\beta(E).}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の $A\subset E$ について

$$
\nu(A)=\alpha(A)-\beta(A)\le\alpha(A)\le\alpha(E).
$$

$A$ に関して上限を取ると Jordan 分解の上限表示より

$$
\nu^+(E)\le\alpha(E).
$$

同様に

$$
-\nu(A)=\beta(A)-\alpha(A)\le\beta(E)
$$

の上限を取れば $\nu^-(E)\le\beta(E)$ です。$\square$
<!-- proof-end -->

つまり、任意の表現 $\nu=\alpha-\beta$ には正負両方に共通の「余分な質量」が入り得ますが、Jordan 分解はそれを完全に取り除いた表現です。

---

## 6. 全変動測度

<a id="def-mt2-total-variation"></a>
<!-- formal-statement-start -->
### 定義（全変動測度）

有限符号付き測度 $\nu$ の全変動測度を

$$
\boxed{|\nu|:=\nu^++\nu^-}
$$

で定める。
<!-- formal-statement-end -->

$|\nu|$ は有限正測度です。また

$$
|\nu(E)|
=|\nu^+(E)-\nu^-(E)|
\le
\nu^+(E)+\nu^-(E)
=|\nu|(E).
$$

<a id="thm-mt2-tv-partition"></a>
<!-- formal-statement-start -->
### 定理（全変動の有限分割表示）

任意の $E\in\mathcal F$ について

$$
\boxed{
|\nu|(E)
=
sup_{E=\bigsqcup_{j=1}^{m}E_j}
\sum_{j=1}^{m}|\nu(E_j)|,}
$$

ただし上限は $E$ の有限可測分割全体について取る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意の有限可測分割 $E=\bigsqcup_jE_j$ について

$$
|\nu(E_j)|
\le|\nu|(E_j).
$$

従って

$$
\sum_j|\nu(E_j)|
\le
\sum_j|\nu|(E_j)
=|\nu|(E).
$$

よって左辺の上限は $|\nu|(E)$ 以下です。

逆向きには Hahn 分解 $X=P\sqcup N$ を使い、

$$
E=(E\cap P)\sqcup(E\cap N)
$$

という二分割を取ります。すると

$$
|\nu(E\cap P)|+|\nu(E\cap N)|
=
\nu^+(E)+\nu^-(E)
=|\nu|(E).
$$

従って上限は $|\nu|(E)$ 以上でもあり、等号が成立します。$\square$
<!-- proof-end -->

<a id="def-mt2-tv-norm"></a>
<!-- formal-statement-start -->
### 定義（全変動ノルム）

有限符号付き測度 $\nu$ に対して

$$
\boxed{\|\nu\|_{\mathrm{TV}}:=|\nu|(X)}
$$

と定める。
<!-- formal-statement-end -->

確率論で確率測度 $P,Q$ の「全変動距離」を

$$
\sup_{A\in\mathcal F}|P(A)-Q(A)|
$$

と定義する流儀では、$\nu=P-Q$ に対して

$$
\sup_A|\nu(A)|
=\frac12|\nu|(X)
$$

となります。したがって「全変動」という語には係数 $1/2$ の流儀差があります。

<!-- proof-start -->
### 証明（確率測度の場合の $1/2$ の確認）

$\nu=P-Q$ なら

$$
\nu(X)=P(X)-Q(X)=0.
$$

従って

$$
\nu^+(X)-\nu^-(X)=0
$$

なので

$$
\nu^+(X)=\nu^-(X)=\frac12|\nu|(X).
$$

Jordan の上限表示から

$$
\sup_A\nu(A)=\nu^+(X)=\frac12|\nu|(X),
$$

同様に

$$
\sup_A(-\nu(A))=\nu^-(X)=\frac12|\nu|(X).
$$

よって

$$
\sup_A|P(A)-Q(A)|=\frac12|P-Q|(X).
$$

$\square$
<!-- proof-end -->

---

## 7. 符号付き測度に関する積分

Jordan 分解ができれば、符号付き測度に関する積分は正の測度に関する Lebesgue 積分へ還元できます。

<a id="def-mt2-signed-integral"></a>
<!-- formal-statement-start -->
### 定義（$\nu$-可積分と符号付き積分）

可測関数 $f:X\to\mathbb R$ が

$$
\boxed{\int_X|f|\,d|\nu|<\infty}
$$

を満たすとき $f$ は $\nu$-可積分であるという。このとき

$$
\boxed{
\int_Xf\,d\nu
:=
\int_Xf\,d\nu^+
-
\int_Xf\,d\nu^-}
$$

と定める。
<!-- formal-statement-end -->

$\nu^+,\nu^-\le|\nu|$ なので、$f\in L^1(|\nu|)$ なら両方の積分は有限であり、右辺に $\infty-\infty$ は現れません。

<a id="thm-mt2-integral-bound"></a>
<!-- formal-statement-start -->
### 定理（全変動による積分評価）

$f\in L^1(|\nu|)$ なら

$$
\boxed{
\left|\int_Xf\,d\nu\right|
\le
\int_X|f|\,d|\nu|.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

三角不等式と正の測度に関する積分の単調性から

$$
\begin{aligned}
\left|\int f\,d\nu\right|
&=
\left|\int f\,d\nu^+-\int f\,d\nu^-\right|\\
&\le
\left|\int f\,d\nu^+\right|
+
\left|\int f\,d\nu^-\right|\\
&\le
\int|f|\,d\nu^+
+
\int|f|\,d\nu^-\\
&=
\int|f|\,d|\nu|.
\end{aligned}
$$

$\square$
<!-- proof-end -->

<a id="thm-mt2-tv-dual"></a>
<!-- formal-statement-start -->
### 定理（全変動の双対表示）

任意の $E\in\mathcal F$ について

$$
\boxed{
|\nu|(E)
=
sup\left\{
\left|\int_E f\,d\nu\right|:
 f\text{ measurable},\ |f|\le1
\right\}.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$|f|\le1$ なら[積分評価](#thm-mt2-integral-bound)より

$$
\left|\int_Ef\,d\nu\right|
\le
\int_E|f|\,d|\nu|
\le|\nu|(E).
$$

従って上限は $|\nu|(E)$ 以下です。

Hahn 分解 $X=P\sqcup N$ に対して

$$
h=1_P-1_N
$$

と置きます。$|h|=1$ で、$E\cap P$ では $h=1$、$E\cap N$ では $h=-1$ なので

$$
\int_Eh\,d\nu
=
\nu(E\cap P)-\nu(E\cap N)
=
\nu^+(E)+\nu^-(E)
=|\nu|(E).
$$

従って上限は実際に $|\nu|(E)$ に達します。$\square$
<!-- proof-end -->

---

## 8. 密度を既に知っている場合：Jordan 分解は点ごとの正負部分になる

後続の Radon–Nikodym 定理では「符号付き測度が密度を持つ」方向を一般に証明します。ここでは逆に、密度が最初から与えられている場合だけを直接確認します。これは RN 定理を使っていません。

<a id="thm-mt2-density-jordan"></a>
<!-- formal-statement-start -->
### 命題（$L^1$ 密度から作る符号付き測度）

$\mu$ を正の測度、$g\in L^1(\mu)$ とし

$$
\nu(E)=\int_Eg\,d\mu
$$

と定める。このとき

$$
\boxed{
\nu^+(E)=\int_Eg^+\,d\mu,
\qquad
\nu^-(E)=\int_Eg^-\,d\mu,
\qquad
|\nu|(E)=\int_E|g|\,d\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
P=\{g\ge0\},
\qquad
N=\{g<0\}
$$

とします。$A\subset P$ なら $g1_A\ge0$ なので

$$
\nu(A)=\int_Ag\,d\mu\ge0.
$$

同様に $A\subset N$ なら $\nu(A)\le0$。従って $(P,N)$ は Hahn 分解です。

Jordan 分解の定義から

$$
\nu^+(E)
=
\nu(E\cap P)
=
\int_Eg^+\,d\mu,
$$

$$
\nu^-(E)
=
-\nu(E\cap N)
=
\int_Eg^-\,d\mu.
$$

従って

$$
|\nu|(E)
=
\nu^+(E)+\nu^-(E)
=
\int_E(g^++g^-)\,d\mu
=
\int_E|g|\,d\mu.
$$

$\square$
<!-- proof-end -->

### 例：総質量0でも全変動は0ではない

$X=[0,1]$、Lebesgue 測度 $\lambda$ とし

$$
g(x)=2x-1,
\qquad
\nu(E)=\int_E(2x-1)\,dx
$$

とします。

$$
\nu([0,1])=\int_0^1(2x-1)dx=0
$$

ですが、

$$
P=[1/2,1],
\qquad
N=[0,1/2)
$$

が Hahn 分解で、

$$
|\nu|([0,1])
=
\int_0^1|2x-1|dx
=\frac12.
$$

「全体で0」は「どこにも符号付き質量がない」ことを意味しません。正負が相殺しているだけかもしれません。

---

## 9. 絶対連続性への橋

<a id="def-mt2-absolute-continuity"></a>
<!-- formal-statement-start -->
### 定義（符号付き測度の絶対連続性）

$\mu$ を正の測度とする。有限符号付き測度 $\nu$ が $\mu$ に絶対連続であることを

$$
\boxed{
\nu\ll\mu
\quad\Longleftrightarrow\quad
\mu(E)=0\Rightarrow\nu(E)=0}
$$

で定める。
<!-- formal-statement-end -->

<a id="thm-mt2-ac-variation"></a>
<!-- formal-statement-start -->
### 命題（絶対連続性と Jordan 部分・全変動）

$$
\boxed{
\nu\ll\mu
\Longleftrightarrow
\nu^+\ll\mu\ \text{かつ}\ \nu^-\ll\mu
\Longleftrightarrow
|\nu|\ll\mu.}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\nu^+,\nu^-\ll\mu$ なら差 $\nu=\nu^+-\nu^-$ も $\mu$-零集合上で0なので $\nu\ll\mu$ です。また $|\nu|=\nu^++\nu^-$ なので、$\nu^+,\nu^-\ll\mu$ なら $|\nu|\ll\mu$ です。

逆に $\nu\ll\mu$ とします。$\mu(E)=0$ なら任意の可測 $A\subset E$ でも $\mu(A)=0$ なので $\nu(A)=0$。Jordan の上限・下限表示より

$$
\nu^+(E)=\sup_{A\subset E}\nu(A)=0,
\qquad
\nu^-(E)=-\inf_{A\subset E}\nu(A)=0.
$$

従って $\nu^+,\nu^-\ll\mu$ です。

最後に $|\nu|\ll\mu$ なら $0\le\nu^\pm\le|\nu|$ なので $\nu^\pm\ll\mu$。以上で全て同値です。$\square$
<!-- proof-end -->

この命題により、MT3 で $\nu\ll\mu$ の密度を作る際には、正測度 $\nu^+,\nu^-$ へ分けて考える道が開きます。

---

## 10. 典型例と誤解しやすい点

### 例1：有限集合上の符号付き測度

$$
X=\{1,2,3,4\},
\qquad
(\nu(\{1\}),\nu(\{2\}),\nu(\{3\}),\nu(\{4\}))
=(3,-1,0,-4)
$$

とします。

$$
P=\{1,3\},
\qquad
N=\{2,4\}
$$

は Hahn 分解で、

$$
\nu^+(X)=3,
\qquad
\nu^-(X)=5,
\qquad
|\nu|(X)=8,
\qquad
\nu(X)=-2.
$$

### 例2：任意の差表示が Jordan 分解とは限らない

$\mu$ を有限正測度とし

$$
\nu=2\mu-\mu
$$

と書けば確かに $\nu=\mu$ です。しかし Jordan 分解は

$$
\nu^+=\mu,
\qquad
\nu^-=0
$$

です。$2\mu$ と $\mu$ には共通の $\mu$ が余分に入っています。Jordan 分解の最小性がこの相殺を除きます。

### 例3：$\nu(E)=0$ と $E$ が $\nu$-零集合は違う

上の $g(x)=2x-1$ の例では

$$
\nu([0,1])=0
$$

ですが $[0,1]$ は $\nu$-零集合ではありません。例えば

$$
\nu([1/2,1])=\frac14>0.
$$

集合全体の値が0でも、その部分集合では正負の相殺が崩れます。

---

## 11. 演習

### Level A

<a id="ex-mt2-a01"></a>
#### MT2-A01 離散 Jordan 分解
- Level: A

$X=\{a,b,c\}$ で

$$
\nu(\{a\})=2,
\qquad
\nu(\{b\})=-5,
\qquad
\nu(\{c\})=1
$$

とする。Hahn 分解を一つ与え、$\nu^+(X),\nu^-(X),|\nu|(X)$ を求めてください。

<!-- solution-start -->
**解答**：例えば

$$
P=\{a,c\},
\qquad
N=\{b\}
$$

です。従って

$$
\nu^+(X)=2+1=3,
\qquad
\nu^-(X)=5,
\qquad
|\nu|(X)=3+5=8.
$$

また $\nu(X)=3-5=-2$ で、$|\nu(X)|=2$ と $|\nu|(X)=8$ は別物です。
<!-- solution-end -->

<a id="ex-mt2-a02"></a>
#### MT2-A02 零値集合と零集合を区別する
- Level: A

$[0,1]$ 上で $\nu(E)=\int_E(2x-1)dx$ とする。$\nu([0,1])=0$ を確認し、$[0,1]$ が $\nu$-零集合ではないことを示してください。

<!-- solution-start -->
**解答**：

$$
\nu([0,1])=[x^2-x]_0^1=0.
$$

しかし

$$
\nu([1/2,1])
=
[x^2-x]_{1/2}^{1}
=\frac14>0.
$$

したがって $[0,1]$ 自身の値は0でも、その部分集合の全てで値が0になるわけではなく、$\nu$-零集合ではありません。
<!-- solution-end -->

### Level B

<a id="ex-mt2-b01"></a>
#### MT2-B01 Hahn 分解の違いは零部分だけ
- Level: B

二つの Hahn 分解 $(P,N)$、$(P',N')$ に対して $P\cap N'$ が $\nu$-零集合となる理由を、定義の量化まで書いて示してください。

<!-- solution-start -->
**解答**：任意の可測 $A\subset P\cap N'$ を取ります。$A\subset P$ で $P$ は正集合なので $\nu(A)\ge0$。同時に $A\subset N'$ で $N'$ は負集合なので $\nu(A)\le0$。従って $\nu(A)=0$ です。

これは **任意の** 可測 $A\subset P\cap N'$ について成り立つので、単に $\nu(P\cap N')=0$ というだけでなく、定義通り $P\cap N'$ は $\nu$-零集合です。
<!-- solution-end -->

<a id="ex-mt2-b02"></a>
#### MT2-B02 全変動の分割表示
- Level: B

有限可測分割 $E=\bigsqcup_{j=1}^mE_j$ に対して

$$
\sum_{j=1}^m|\nu(E_j)|\le|\nu|(E)
$$

を示し、どの分割で等号に達するか答えてください。

<!-- solution-start -->
**解答**：各 $j$ について

$$
|\nu(E_j)|\le|\nu|(E_j)
$$

なので、可算加法性の有限版から

$$
\sum_j|\nu(E_j)|
\le
\sum_j|\nu|(E_j)
=|\nu|(E).
$$

Hahn 分解 $X=P\sqcup N$ に対する

$$
E=(E\cap P)\sqcup(E\cap N)
$$

を取れば

$$
|\nu(E\cap P)|+|\nu(E\cap N)|
=
\nu^+(E)+\nu^-(E)
=|\nu|(E),
$$

となり等号に達します。
<!-- solution-end -->

<a id="ex-mt2-b03"></a>
#### MT2-B03 Jordan 分解の最小性
- Level: B

$\nu=\alpha-\beta$、$\alpha,\beta$ は有限正測度とする。$\nu^+\le\alpha$ を Jordan の上限表示から示してください。

<!-- solution-start -->
**解答**：任意の $A\subset E$ に対して

$$
\nu(A)=\alpha(A)-\beta(A)\le\alpha(A)\le\alpha(E).
$$

従って

$$
\nu^+(E)
=
\sup_{A\subset E}\nu(A)
\le\alpha(E).
$$

任意の $E$ で成り立つので測度として $\nu^+\le\alpha$ です。
<!-- solution-end -->

### Level C

<a id="ex-mt2-c01"></a>
#### MT2-C01 Hahn 分解の証明を再構成する
- Level: C

本文を閉じ、次の四段階だけを手掛かりに Hahn 分解の証明を再構成してください。

1. $m=\inf_A\nu(A)$ を有限にする。
2. $\nu(E_k)<m+2^{-k}$ を選ぶ。
3. $F_n=\bigcup_{k\ge n}E_k$ とし $\nu(F_n)\to m$ を示す。
4. $N=\bigcap_nF_n$ が負集合、$P=X\setminus N$ が正集合であることを最小性から示す。

<!-- solution-start -->
**解答**：まず[値域の有界性](#thm-mt2-range-bounded)から $m> -\infty$。$E_k$ を $m\le\nu(E_k)<m+2^{-k}$ と取ります。

有限合併 $U_{n,r}=\bigcup_{k=n}^rE_k$ について

$$
\nu(A\cup B)=\nu(A)+\nu(B)-\nu(A\cap B),
\qquad
\nu(A\cap B)\ge m
$$

を帰納的に使えば

$$
\nu(U_{n,r})<m+\sum_{k=n}^{r}2^{-k}.
$$

下からの連続性で $r\to\infty$ とすると

$$
m\le\nu(F_n)\le m+2^{1-n}.
$$

よって $F_n\downarrow N$ と上からの連続性から $\nu(N)=m$。

もし $A\subset N$ で $\nu(A)>0$ なら $\nu(N\setminus A)=m-\nu(A)<m$ となり矛盾するため $N$ は負集合。もし $B\subset X\setminus N$ で $\nu(B)<0$ なら $\nu(N\cup B)=m+\nu(B)<m$ となり矛盾するため $P=X\setminus N$ は正集合です。
<!-- solution-end -->

<a id="ex-mt2-c02"></a>
#### MT2-C02 密度付き符号付き測度の全変動
- Level: C

$g\in L^1(\mu)$、$\nu(E)=\int_Eg\,d\mu$ とする。全変動の双対表示を使わずに

$$
|\nu|(E)=\int_E|g|\,d\mu
$$

を示してください。

<!-- solution-start -->
**解答**：

$$
P=\{g\ge0\},
\qquad
N=\{g<0\}
$$

は Hahn 分解です。したがって Jordan 分解から

$$
\nu^+(E)=\nu(E\cap P)=\int_Eg^+\,d\mu,
$$

$$
\nu^-(E)=-\nu(E\cap N)=\int_Eg^-\,d\mu.
$$

従って

$$
|\nu|(E)
=
\nu^+(E)+\nu^-(E)
=
\int_E(g^++g^-)\,d\mu
=
\int_E|g|\,d\mu.
$$
<!-- solution-end -->

---

## 12. この章で閉じた依存

この章では次を後続理論なしで閉じました。

- 有限符号付き測度の下から・上からの連続性
- 値域の有界性
- Hahn 分解の存在と本質的一意性
- Jordan 分解の存在・一意性・最小性
- 全変動測度と有限分割表示
- 符号付き積分と全変動による評価
- 密度が既知の場合の正負部分・全変動
- 絶対連続性と $\nu^+,\nu^-,|\nu|$ の同値な零集合条件

Radon–Nikodym 定理は一度も使っていません。次の段階では、この章の Jordan 分解を使って符号付き測度の問題を正測度へ還元し、Radon–Nikodym と Lebesgue 分解を構成できます。