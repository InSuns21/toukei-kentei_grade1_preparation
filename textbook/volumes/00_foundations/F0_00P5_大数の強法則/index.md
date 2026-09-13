# F0-00P5 強大数則への二段階：4次モーメント法とKolmogorov最大不等式

<!-- definition-example-audit: strict -->

強大数則は、仮定を少し強くすると証明がかなり短くなります。この違いを先に見ると、有限分散だけを仮定したときに **なぜ最大不等式が必要になるのか** が見えやすくなります。

この章では次の順で進みます。

```text
有限4次モーメント
  ↓ 4次モーメントで逸脱確率を n^{-2} にする
全ての n を直接 Borel--Cantelli へ
  ↓
強大数則

有限分散
  ↓ Chebyshev だけでは逸脱確率が n^{-1} で総和できない
Kolmogorov最大不等式
  ↓ dyadic な時点ごとに途中の部分和までまとめて制御
強大数則
```

さらに仮定を $E|X_1|<\infty$ まで弱めた一般の独立同分布版は、次章 [P5A](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) で扱います。

---

## 1. 強法則を部分和の問題へ直す

$X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし、有限な平均

$$
\mu:=E[X_1]
$$

を持つとします。中心化した確率変数を

$$
Y_i:=X_i-\mu
$$

と置きます。

<a id="def-f0-00p5-partial-sum"></a>

<!-- formal-statement-start -->
> **定義（部分和）**  
> 実数値確率変数列 $Y_1,Y_2,\ldots$ に対し、$n\ge1$ について

$$
S_n:=\sum_{i=1}^nY_i
$$

> を第 $n$ 部分和と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p5-partial-sum -->
**定義の確認**

ある標本点で $Y_1=2,Y_2=-1,Y_3=4$ という値を取ったなら

$$
S_1=2,
\qquad
S_2=2+(-1)=1,
\qquad
S_3=2+(-1)+4=5.
$$

$S_n$ は「第 $n$ 項」ではなく、最初から第 $n$ 項までを足した量です。
<!-- definition-example-end -->

標本平均は

$$
\overline X_n
:=\frac1n\sum_{i=1}^nX_i
=\mu+\frac{S_n}{n}
$$

なので、強大数則を示すには

$$
\boxed{
\frac{S_n}{n}\to0
\quad\text{a.s.}
}
$$

を示せば十分です。

### 1.1 有限分散なら確率収束まではすぐ出る

さらに

$$
\operatorname{Var}(X_1)=\sigma^2<\infty
$$

とします。独立性から

$$
\operatorname{Var}(S_n)
=\sum_{i=1}^n\operatorname{Var}(Y_i)
=n\sigma^2.
$$

したがって [Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) より、任意の $\varepsilon>0$ に対して

$$
\begin{aligned}
P\left(\left|\frac{S_n}{n}\right|>\varepsilon\right)
&=P(|S_n|>\varepsilon n)\\
&\le
\frac{\operatorname{Var}(S_n)}{\varepsilon^2n^2}\\
&=
\frac{\sigma^2}{\varepsilon^2n}
\to0.
\end{aligned}
$$

よって $S_n/n\to0$ は確率収束します。

ところが概収束を [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) から直接出そうとすると

$$
\sum_{n=1}^{\infty}
P(|S_n|>\varepsilon n)
\le
\frac{\sigma^2}{\varepsilon^2}
\sum_{n=1}^{\infty}\frac1n
$$

の右辺が有限になりません。

**有限分散では、各 $n$ をChebyshevだけで個別に見る方法が一歩足りない**わけです。

---

## 2. 先に簡単な場合：4次モーメントが有限なら直接いける

ここで一度、有限分散より強い

$$
E|X_1|^4<\infty
$$

を仮定します。この仮定なら、逸脱確率を $1/n$ ではなく $1/n^2$ の大きさまで落とせます。

### 2.1 最小例：Rademacher変数

$Y_1,Y_2,\ldots$ を独立同分布とし

$$
P(Y_i=1)=P(Y_i=-1)=\frac12
$$

とします。このとき

$$
E[Y_i]=0,
\qquad
E[Y_i^2]=1,
\qquad
E[Y_i^4]=1.
$$

部分和 $S_n=Y_1+\cdots+Y_n$ の4乗を展開します。

$$
S_n^4
=
\sum_{i,j,k,\ell=1}^n
Y_iY_jY_kY_\ell.
$$

期待値を取ると、ある添字が1回だけ現れる項は、その添字に対応する $E[Y_r]=0$ が因子になるため消えます。残るのは

- 同じ添字が4回現れる項
- 異なる2添字が2回ずつ現れる項

だけです。したがって

$$
\begin{aligned}
E[S_n^4]
&=n+6\binom n2\\
&=3n^2-2n\\
&\le3n^2.
\end{aligned}
$$

ここで [Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) を非負確率変数 $S_n^4$ に適用すると

$$
P(|S_n|>\varepsilon n)
\le
\frac{E[S_n^4]}{\varepsilon^4n^4}
\le
\frac{3}{\varepsilon^4n^2}.
$$

今度は

$$
\sum_{n=1}^{\infty}\frac1{n^2}<\infty
$$

なので、全ての $n$ をそのまま [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) へ入れられます。

<a id="thm-f0-00p5-fourth-moment-slln"></a>

<!-- formal-statement-start -->
> **定理（有限4次モーメントからの強大数則）**  
> $X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし、

$$
E|X_1|^4<\infty
$$

> とします。$\mu=E[X_1]$ とすると

$$
\boxed{
\frac1n\sum_{i=1}^nX_i\to\mu
\quad\text{a.s.}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

中心化した部分和 $S_n$ に対して

$$
E[S_n^4]=O(n^2)
$$

を示します。すると [Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) から

$$
P(|S_n|>\varepsilon n)=O(n^{-2})
$$

となり、この確率は $n$ について総和できます。最後に [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) と可算個の $\varepsilon$ を使って極限0を得ます。

<!-- proof-start -->
### 証明

まず $E|X_1|^4<\infty$ から平均が有限であることを確認します。全ての実数 $x$ について

$$
|x|\le1+|x|^4
$$

なので

$$
E|X_1|
\le1+E|X_1|^4
<\infty.
$$

よって $\mu:=E[X_1]$ は有限です。

$Y_i:=X_i-\mu$、$S_n:=\sum_{i=1}^nY_i$ と置きます。中心化後も4次モーメントが有限であることも確認しておきます。$a,b\ge0$ に対して

$$
(a+b)^4\le8(a^4+b^4)
$$

なので

$$
|Y_1|^4
=|X_1-\mu|^4
\le8(|X_1|^4+|\mu|^4).
$$

したがって

$$
m_4:=E[Y_1^4]<\infty.
$$

また

$$
\sigma^2:=E[Y_1^2]<\infty,
\qquad
E[Y_1]=0.
$$

4乗を展開すると

$$
S_n^4
=
\sum_{i,j,k,\ell=1}^nY_iY_jY_kY_\ell.
$$

独立性から、ある添字がちょうど1回だけ現れる項では、その変数の平均 $E[Y_r]=0$ が因子となり期待値は0です。したがって期待値が残る型は2種類だけです。

同じ添字が4回現れる項の総寄与は

$$
nm_4.
$$

異なる2添字が2回ずつ現れる場合、添字対の選び方は $\binom n2$ 通り、4箇所への配置は

$$
\frac{4!}{2!2!}=6
$$

通りです。独立性から各項の期待値は

$$
E[Y_i^2Y_j^2]
=E[Y_i^2]E[Y_j^2]
=\sigma^4
\qquad(i\ne j)
$$

です。したがって

$$
\begin{aligned}
E[S_n^4]
&=nm_4+6\binom n2\sigma^4\\
&=nm_4+3n(n-1)\sigma^4\\
&\le(m_4+3\sigma^4)n^2.
\end{aligned}
$$

定数

$$
C:=m_4+3\sigma^4
$$

を置きます。固定した $\varepsilon>0$ に対し、[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) より

$$
\begin{aligned}
P(|S_n|>\varepsilon n)
&=P(S_n^4>\varepsilon^4n^4)\\
&\le\frac{E[S_n^4]}{\varepsilon^4n^4}\\
&\le\frac{C}{\varepsilon^4n^2}.
\end{aligned}
$$

よって

$$
\sum_{n=1}^{\infty}P(|S_n|>\varepsilon n)
\le
\frac{C}{\varepsilon^4}
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) により、固定した $\varepsilon>0$ について

$$
|S_n|>\varepsilon n
$$

は概ね有限回しか起こりません。

ここで「各 $\varepsilon$ について確率1」から「極限が0」を出す部分を省略しません。$r=1,2,\ldots$ に対して $\varepsilon=1/r$ とし、

$$
\Omega_r
:=
\left\{
\frac{|S_n|}{n}>\frac1r
\text{ は有限回しか起こらない}
\right\}
$$

と置けば $P(\Omega_r)=1$ です。したがって可算交叉

$$
\Omega_0:=\bigcap_{r=1}^{\infty}\Omega_r
$$

も確率1です。

$\omega\in\Omega_0$ と $\eta>0$ を固定します。$1/r<\eta$ となる $r$ を選べば、ある $N$ が存在して $n\ge N$ なら

$$
\frac{|S_n(\omega)|}{n}\le\frac1r<\eta.
$$

よって

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

です。最後に

$$
\overline X_n
=\mu+\frac{S_n}{n}
$$

より結論を得ます。
<!-- proof-end -->

---

## 3. 4次モーメント法では届かない有限分散分布

4次モーメント法は簡単ですが、仮定が強すぎます。

$k=1,2,\ldots$ に対して

$$
P(X=k)=P(X=-k)=\frac{c}{k^4},
$$

ただし

$$
c:=\left(2\sum_{k=1}^{\infty}\frac1{k^4}\right)^{-1}
$$

とします。全確率は

$$
2c\sum_{k=1}^{\infty}\frac1{k^4}=1
$$

です。

また

$$
E|X|
=2c\sum_{k=1}^{\infty}\frac1{k^3}
<\infty
$$

で分布は0について対称なので $E[X]=0$ です。さらに

$$
E[X^2]
=2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty,
$$

一方

$$
E[X^4]
=2c\sum_{k=1}^{\infty}1
=\infty.
$$

したがって、この分布は有限分散版強大数則の対象ですが、前節の4次モーメント証明は使えません。

ここから先は、各時点を個別に評価する代わりに、**途中の部分和をまとめて制御する**道具を使います。

---

## 4. Kolmogorov最大不等式

<a id="thm-kolmogorov-maximal"></a>

<!-- formal-statement-start -->
> **定理（Kolmogorov最大不等式）**  
> $Y_1,\ldots,Y_n$ を独立な実数値確率変数とし、各 $j$ について

$$
E[Y_j]=0,
\qquad
\operatorname{Var}(Y_j)<\infty
$$

> とします。$S_k:=\sum_{j=1}^kY_j$ と置くと、任意の $\lambda>0$ に対して

$$
\boxed{
P\left(
\max_{1\le k\le n}|S_k|\ge\lambda
\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

[Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) が最後の値 $S_n$ だけを評価するのに対し、[Kolmogorov最大不等式](#thm-kolmogorov-maximal) は

$$
S_1,S_2,\ldots,S_n
$$

の**どこか**で閾値を越える確率をまとめて抑えます。

### 証明の見取り図

「初めて $\lambda$ を越えた時刻」が $k$ である事象を $A_k$ とします。$A_k$ は時刻 $k$ までの変数だけで決まり、それ以後の増分とは独立です。この分離によって二乗展開の交差項が0になります。

<!-- proof-start -->
### 証明

$k=1,\ldots,n$ に対して

$$
A_k
:=
\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,\ |S_k|\ge\lambda\}
$$

と置きます。

$A_k$ は「初めて $\lambda$ 以上になった時刻が $k$」という事象なので互いに排反であり、

$$
\bigcup_{k=1}^nA_k
=
\left\{
\max_{1\le j\le n}|S_j|\ge\lambda
\right\}.
$$

さらに

$$
T_k:=S_n-S_k
=Y_{k+1}+\cdots+Y_n
$$

と置きます。$S_k\boldsymbol{1}_{A_k}$ は $Y_1,\ldots,Y_k$ だけの関数で、$T_k$ は $Y_{k+1},\ldots,Y_n$ だけの関数です。独立性から両者は独立です。

また有限分散から両者は可積分で、

$$
E[T_k]
=\sum_{j=k+1}^nE[Y_j]
=0.
$$

したがって

$$
E[S_kT_k\boldsymbol{1}_{A_k}]
=E[S_k\boldsymbol{1}_{A_k}]E[T_k]
=0.
$$

この等式を使って

$$
\begin{aligned}
E[S_n^2\boldsymbol{1}_{A_k}]
&=E[(S_k+T_k)^2\boldsymbol{1}_{A_k}]\\
&=E[S_k^2\boldsymbol{1}_{A_k}]
 +2E[S_kT_k\boldsymbol{1}_{A_k}]
 +E[T_k^2\boldsymbol{1}_{A_k}]\\
&\ge E[S_k^2\boldsymbol{1}_{A_k}].
\end{aligned}
$$

$A_k$ 上では $|S_k|\ge\lambda$ なので

$$
E[S_k^2\boldsymbol{1}_{A_k}]
\ge
\lambda^2P(A_k).
$$

よって

$$
E[S_n^2\boldsymbol{1}_{A_k}]
\ge
\lambda^2P(A_k).
$$

$A_1,\ldots,A_n$ は互いに排反だから

$$
\begin{aligned}
E[S_n^2]
&\ge
E\left[
S_n^2\boldsymbol{1}_{\cup_{k=1}^nA_k}
\right]\\
&=\sum_{k=1}^nE[S_n^2\boldsymbol{1}_{A_k}]\\
&\ge\lambda^2\sum_{k=1}^nP(A_k)\\
&=\lambda^2
P\left(
\max_{1\le k\le n}|S_k|\ge\lambda
\right).
\end{aligned}
$$

$E[S_n]=0$ なので

$$
E[S_n^2]=\operatorname{Var}(S_n).
$$

両辺を $\lambda^2$ で割れば

$$
P\left(
\max_{1\le k\le n}|S_k|\ge\lambda
\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
$$

を得ます。
<!-- proof-end -->

この定理では同一分布性を使っていません。必要なのは、独立性、平均0、有限分散です。

---

## 5. dyadic subsequence：$1/n$ を $1/2^m$ に変える

<a id="def-f0-00p5-dyadic"></a>

<!-- formal-statement-start -->
> **定義（dyadic subsequence）**  
> 数列 $(a_n)_{n\ge1}$ に対して、添字を

$$
n=2^m
\qquad(m=0,1,2,\ldots)
$$

> に限定して得る

$$
a_1,a_2,a_4,a_8,\ldots
$$

> を、この章では dyadic subsequence と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p5-dyadic -->
**定義の確認**

$a_n=n^2$ なら

$$
a_1=1,
\qquad
a_2=4,
\qquad
a_4=16,
\qquad
a_8=64,
\ldots
$$

が dyadic subsequence です。添字が $2^m$ なので、$1/n$ 型の上界は $1/2^m$ 型に変わり、$m$ について総和できるようになります。
<!-- definition-example-end -->

---

## 6. 有限分散版強大数則

<a id="thm-f0-00p5-finite-variance-slln"></a>

<!-- formal-statement-start -->
> **定理（有限分散版強大数則）**  
> $X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし、

$$
E[X_1]=\mu,
\qquad
\operatorname{Var}(X_1)=\sigma^2<\infty
$$

> とします。このとき

$$
\boxed{
\frac1n\sum_{i=1}^nX_i\to\mu
\quad\text{a.s.}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

全ての $n$ を個別に [Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) で評価すると $1/n$ しか得られません。

そこで $2^m$ 個までの部分和を **一つの最大値** にまとめ、[Kolmogorov最大不等式](#thm-kolmogorov-maximal) を使います。すると

$$
P\left(
\max_{k\le2^m}|S_k|>\varepsilon2^m
\right)
=O(2^{-m})
$$

となり、$m$ について総和できます。

最後に

$$
2^{m-1}<n\le2^m
$$

なら $n$ は直後の dyadic 時点 $2^m$ より高々2倍小さいことを使って、全ての $n$ を覆います。

<!-- proof-start -->
### 証明

$Y_i:=X_i-\mu$、$S_n:=\sum_{i=1}^nY_i$ と置きます。すると

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=\sigma^2.
$$

固定した $\varepsilon>0$ に対し、$m=0,1,2,\ldots$ について

$$
A_m(\varepsilon)
:=
\left\{
\max_{1\le k\le2^m}|S_k|
>\varepsilon2^m
\right\}
$$

と置きます。

[Kolmogorov最大不等式](#thm-kolmogorov-maximal) と独立性による分散の加法性から

$$
\begin{aligned}
P(A_m(\varepsilon))
&\le
\frac{\operatorname{Var}(S_{2^m})}
{\varepsilon^22^{2m}}\\
&=
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

したがって

$$
\sum_{m=0}^{\infty}P(A_m(\varepsilon))
\le
\frac{\sigma^2}{\varepsilon^2}
\sum_{m=0}^{\infty}2^{-m}
<\infty.
$$

[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) により、固定した $\varepsilon>0$ について $A_m(\varepsilon)$ は概ね有限回しか起こりません。すなわち確率1で、十分大きな $m$ では

$$
\max_{1\le k\le2^m}|S_k|
\le\varepsilon2^m.
$$

ここで任意の十分大きい $n$ を取り

$$
2^{m-1}<n\le2^m
$$

となる $m$ を選びます。すると

$$
|S_n|
\le
\max_{1\le k\le2^m}|S_k|
\le
\varepsilon2^m
$$

なので

$$
\frac{|S_n|}{n}
<
\frac{\varepsilon2^m}{2^{m-1}}
=2\varepsilon.
$$

最後に、固定した $\varepsilon$ の議論から極限0へ移ります。$r=1,2,\ldots$ に対して $\varepsilon=1/r$ とし、それぞれの確率1事象の可算交叉を取ります。その確率1事象上で任意の $r$ について十分大きな $n$ なら

$$
\frac{|S_n|}{n}<\frac2r.
$$

任意の $\eta>0$ に対して $2/r<\eta$ となる $r$ を選べるので

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

です。したがって

$$
\overline X_n
=\mu+\frac{S_n}{n}
\to\mu
\quad\text{a.s.}
$$

を得ます。
<!-- proof-end -->

### 6.1 「dyadic の隙間」はどこで埋まったか

この証明では $S_{2^m}$ だけを評価したのではなく

$$
\max_{1\le k\le2^m}|S_k|
$$

を評価しました。したがって $2^{m-1}<n\le2^m$ のどの $n$ を選んでも、同じ最大値で一度に抑えられます。

ここが [Kolmogorov最大不等式](#thm-kolmogorov-maximal) を使う決定的な利点です。

---

## 7. 仮定はどこで働いたか

有限分散版の証明で各仮定には役割があります。

- **有限な共通平均**：$Y_i=X_i-\mu$ と中心化するため。
- **独立性**：$\operatorname{Var}(S_n)$ を各分散の和にし、[Kolmogorov最大不等式](#thm-kolmogorov-maximal) の証明で過去と未来を分離するため。
- **有限分散**：最大逸脱確率を $O(2^{-m})$ に抑えるため。
- **同一分布性**：各 $Y_i$ の分散を共通の $\sigma^2$ とし、$\operatorname{Var}(S_{2^m})=2^m\sigma^2$ と書くため。

### 7.1 独立性を落とすと何が壊れるか

平均0・非退化・有限分散の確率変数 $Z$ を1つ取り

$$
X_1=X_2=\cdots=Z
$$

とします。各 $X_i$ は同一分布ですが完全に依存しています。このとき

$$
\frac1n\sum_{i=1}^nX_i
=Z
$$

であり、一般には0へ収束しません。

証明機構としても

$$
\operatorname{Var}(X_1+\cdots+X_n)
=n^2\operatorname{Var}(Z)
$$

となり、独立な場合の $n\sigma^2$ という増え方を失います。

### 7.2 有限分散は最小仮定ではない

一方、有限分散を落としただけで強大数則が偽になるわけではありません。独立同分布なら

$$
E|X_1|<\infty
$$

まで仮定を弱めても強大数則は成り立ちます。その証明では、極端に大きい観測値を切ってから扱う別の仕組みが必要です。詳細は [P5Aの一般独立同分布強大数則](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) で扱います。

---

## 8. 三つの証明ルートを比較する

| 仮定 | 証明の中心 | なぜその道具で足りるか |
|---|---|---|
| $E|X_1|^4<\infty$ | 4次モーメント + [Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) | 逸脱確率を $O(n^{-2})$ にでき、全 $n$ を直接総和できる |
| $\operatorname{Var}(X_1)<\infty$ | [Kolmogorov最大不等式](#thm-kolmogorov-maximal) + dyadic化 | $O(1/n)$ を $n=2^m$ ごとの $O(2^{-m})$ に変え、途中の部分和もまとめて制御できる |
| $E|X_1|<\infty$ | P5Aの切断法 | 有限分散を仮定できないので、大きい観測値を切って別の収束問題へ変える |

結論はどれも標本平均の概収束です。違うのは、**仮定を強くすると短い証明が使える**という点です。

---

## 演習

### F0-00P5-A01 Rademacher和の4次モーメント

- Level: A
- 目安時間: 12分

$Y_1,Y_2,\ldots$ を独立同分布とし

$$
P(Y_i=1)=P(Y_i=-1)=\frac12
$$

とする。$S_n:=\sum_{i=1}^nY_i$ と置く。

1. $E[Y_i]=0$, $E[Y_i^2]=E[Y_i^4]=1$ を確認せよ。
2. $E[S_n^4]=3n^2-2n$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず

$$
E[Y_i]
=1\cdot\frac12+(-1)\cdot\frac12
=0.
$$

また常に $Y_i^2=Y_i^4=1$ なので

$$
E[Y_i^2]=E[Y_i^4]=1.
$$

次に

$$
S_n^4
=
\sum_{i,j,k,\ell=1}^nY_iY_jY_kY_\ell
$$

と展開します。

ある添字が1回だけ現れる項では、独立性により期待値を因数分解したとき $E[Y_r]=0$ が含まれるので、その項の期待値は0です。

期待値が残る第1の型は、同じ添字が4回現れる

$$
Y_i^4
$$

です。$i$ の選び方が $n$ 通りあり、各期待値は1なので寄与は $n$ です。

第2の型は、異なる2添字 $i,j$ が2回ずつ現れる型です。添字対の選び方は $\binom n2$ 通りで、固定した対の配置は

$$
\frac{4!}{2!2!}=6
$$

通りです。独立性から

$$
E[Y_i^2Y_j^2]
=E[Y_i^2]E[Y_j^2]
=1.
$$

したがって

$$
\begin{aligned}
E[S_n^4]
&=n+6\binom n2\\
&=n+3n(n-1)\\
&=3n^2-2n.
\end{aligned}
$$
<!-- solution-end -->

### F0-00P5-A02 4次モーメント評価から概収束へ

- Level: A
- 目安時間: 12分

確率変数列 $(S_n)$ が、ある定数 $C>0$ に対して

$$
E[S_n^4]\le Cn^2
$$

をすべての $n$ で満たすとする。[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) と [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) を用いて

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

固定した $\varepsilon>0$ に対して

$$
\{|S_n|>\varepsilon n\}
=
\{S_n^4>\varepsilon^4n^4\}.
$$

[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov) より

$$
\begin{aligned}
P(|S_n|>\varepsilon n)
&\le
\frac{E[S_n^4]}{\varepsilon^4n^4}\\
&\le
\frac{C}{\varepsilon^4n^2}.
\end{aligned}
$$

よって

$$
\sum_{n=1}^{\infty}P(|S_n|>\varepsilon n)
\le
\frac{C}{\varepsilon^4}
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) から、固定した $\varepsilon$ について逸脱は概ね有限回です。

極限0まで出すため、$\varepsilon=1/r$（$r\in\mathbb N$）について得られる確率1事象を可算交叉します。その交叉上では任意の $r$ について、十分大きな $n$ で

$$
\frac{|S_n|}{n}\le\frac1r.
$$

任意の $\eta>0$ に対し $1/r<\eta$ となる $r$ を選べるので $S_n/n\to0$ です。
<!-- solution-end -->

### F0-00P5-A03 dyadic化で $1/n$ を総和可能にする

- Level: A
- 目安時間: 10分

$Y_1,Y_2,\ldots$ を独立同分布とし

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=\sigma^2<\infty
$$

とする。$S_n:=\sum_{i=1}^nY_i$ と置く。[Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) を用いて

$$
\sum_{m=0}^{\infty}
P(|S_{2^m}|>\varepsilon2^m)
<\infty
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

独立性から

$$
\operatorname{Var}(S_{2^m})
=\sum_{i=1}^{2^m}\operatorname{Var}(Y_i)
=2^m\sigma^2.
$$

したがって [Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) より

$$
\begin{aligned}
P(|S_{2^m}|>\varepsilon2^m)
&\le
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

よって

$$
\sum_{m=0}^{\infty}
P(|S_{2^m}|>\varepsilon2^m)
\le
\frac{\sigma^2}{\varepsilon^2}
\sum_{m=0}^{\infty}2^{-m}
<\infty.
$$

全 $n$ では $1/n$ で総和できなかったものが、$n=2^m$ に限定すると $2^{-m}$ となるのがポイントです。
<!-- solution-end -->

### F0-00P5-A04 初回越境事象で交差項を消す

- Level: A
- 目安時間: 12分

独立な平均0確率変数 $Y_1,\ldots,Y_n$ に対して

$$
S_k:=\sum_{j=1}^kY_j
$$

とし、$\lambda>0$ を固定する。

$$
A_k
:=
\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,|S_k|\ge\lambda\}
$$

と置く。

1. $A_1,\ldots,A_n$ が互いに排反であることを示せ。
2. $T_k:=S_n-S_k$ とすると $E[S_kT_k\boldsymbol{1}_{A_k}]=0$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

1. $A_k$ は「初めて $\lambda$ 以上になった時刻が $k$」という事象です。$k<\ell$ で $A_k$ と $A_\ell$ が同時に起きたと仮定すると、$A_k$ から

$$
|S_k|\ge\lambda
$$

である一方、$A_\ell$ から $k<\ell$ なので

$$
|S_k|<\lambda
$$

でなければならず矛盾します。よって互いに排反です。

2. $S_k\boldsymbol{1}_{A_k}$ は $Y_1,\ldots,Y_k$ だけで決まり、

$$
T_k=Y_{k+1}+\cdots+Y_n
$$

は $Y_{k+1},\ldots,Y_n$ だけで決まります。独立性から両者は独立です。また

$$
E[T_k]
=\sum_{j=k+1}^nE[Y_j]
=0.
$$

したがって

$$
\begin{aligned}
E[S_kT_k\boldsymbol{1}_{A_k}]
&=E[(S_k\boldsymbol{1}_{A_k})T_k]\\
&=E[S_k\boldsymbol{1}_{A_k}]E[T_k]\\
&=0.
\end{aligned}
$$

この交差項が消えることが [Kolmogorov最大不等式](#thm-kolmogorov-maximal) の核心です。
<!-- solution-end -->

### F0-00P5-B01 Kolmogorov最大不等式を再構成する

- Level: B
- 目安時間: 22分

独立な平均0・有限分散確率変数 $Y_1,\ldots,Y_n$ に対し $S_k:=\sum_{j=1}^kY_j$ とする。任意の $\lambda>0$ に対して [Kolmogorov最大不等式](#thm-kolmogorov-maximal)

$$
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
$$

を証明せよ。

<!-- solution-start -->
#### 詳細解答

初めて閾値を越える事象

$$
A_k
:=
\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,|S_k|\ge\lambda\}
$$

を置きます。$A_k$ は互いに排反で

$$
\bigcup_{k=1}^nA_k
=
\left\{\max_{1\le j\le n}|S_j|\ge\lambda\right\}.
$$

$T_k:=S_n-S_k$ と置くと、A04と同じ独立性・平均0の議論により

$$
E[S_kT_k\boldsymbol{1}_{A_k}]=0.
$$

したがって

$$
\begin{aligned}
E[S_n^2\boldsymbol{1}_{A_k}]
&=E[(S_k+T_k)^2\boldsymbol{1}_{A_k}]\\
&=E[S_k^2\boldsymbol{1}_{A_k}]
+E[T_k^2\boldsymbol{1}_{A_k}]\\
&\ge E[S_k^2\boldsymbol{1}_{A_k}]\\
&\ge\lambda^2P(A_k).
\end{aligned}
$$

最後の不等式では、$A_k$ 上で $|S_k|\ge\lambda$ を使いました。

排反性から

$$
\begin{aligned}
E[S_n^2]
&\ge
\sum_{k=1}^nE[S_n^2\boldsymbol{1}_{A_k}]\\
&\ge
\lambda^2\sum_{k=1}^nP(A_k)\\
&=
\lambda^2P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right).
\end{aligned}
$$

また $E[S_n]=0$ なので

$$
E[S_n^2]=\operatorname{Var}(S_n).
$$

以上より

$$
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
$$

を得ます。
<!-- solution-end -->

### F0-00P5-B02 dyadic の隙間を最大値で埋める

- Level: B
- 目安時間: 20分

$Y_1,Y_2,\ldots$ を独立同分布、平均0、分散 $\sigma^2<\infty$ とし、$S_n:=\sum_{i=1}^nY_i$ とする。

固定した $\varepsilon>0$ について

$$
P\left(
\max_{1\le k\le2^m}|S_k|
>\varepsilon2^m
\right)
\le
\frac{\sigma^2}{\varepsilon^22^m}
$$

を [Kolmogorov最大不等式](#thm-kolmogorov-maximal) から導き、[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) を使って $S_n/n\to0$ a.s. を示せ。

<!-- solution-start -->
#### 詳細解答

独立性から

$$
\operatorname{Var}(S_{2^m})
=2^m\sigma^2.
$$

[Kolmogorov最大不等式](#thm-kolmogorov-maximal) に $n=2^m$、$\lambda=\varepsilon2^m$ を入れると

$$
\begin{aligned}
P\left(
\max_{1\le k\le2^m}|S_k|
>\varepsilon2^m
\right)
&\le
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

右辺は $m$ について総和できるので、[Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) から、固定した $\varepsilon$ について十分大きな $m$ では

$$
\max_{1\le k\le2^m}|S_k|
\le\varepsilon2^m
$$

です。

任意の十分大きい $n$ に対して

$$
2^{m-1}<n\le2^m
$$

となる $m$ を取れば

$$
\frac{|S_n|}{n}
\le
\frac{\max_{k\le2^m}|S_k|}{2^{m-1}}
\le2\varepsilon.
$$

$\varepsilon=1/r$ の確率1事象を可算交叉すれば、任意の正の精度に対して最終的にこの評価が成立するため

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

を得ます。
<!-- solution-end -->

### F0-00P5-B03 有限分散だが4次モーメント無限

- Level: B
- 目安時間: 18分

$k=1,2,\ldots$ に対し

$$
P(X=k)=P(X=-k)=\frac{c}{k^4},
\qquad
c:=\left(2\sum_{k=1}^{\infty}k^{-4}\right)^{-1}
$$

とする。

1. これが確率分布であることを確認せよ。
2. $E[X]=0$, $E[X^2]<\infty$, $E[X^4]=\infty$ を示せ。
3. この分布では4次モーメント法は使えないが、有限分散版強大数則は適用できる理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $c>0$ で、定義から

$$
\sum_{k=1}^{\infty}
\{P(X=k)+P(X=-k)\}
=2c\sum_{k=1}^{\infty}\frac1{k^4}
=1.
$$

よって確率分布です。

2. まず

$$
E|X|
=2c\sum_{k=1}^{\infty}\frac1{k^3}
<\infty
$$

なので平均は有限です。分布は0について対称だから

$$
E[X]=0.
$$

二次モーメントは

$$
E[X^2]
=2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty.
$$

一方、4次モーメントは

$$
E[X^4]
=2c\sum_{k=1}^{\infty}1
=\infty.
$$

3. 4次モーメント法では $E[S_n^4]$ を有限量として評価することが出発点ですが、ここでは $E[X^4]=\infty$ なのでその方法は使えません。

しかし $E[X^2]<\infty$ なので分散は有限です。独立同分布な標本を取れば、[Kolmogorov最大不等式](#thm-kolmogorov-maximal) を用いる有限分散版強大数則の仮定を満たします。
<!-- solution-end -->

### F0-00P5-C01 同一分布でなくても一様分散有界なら平均揺らぎは消える

- Level: C
- 目安時間: 30分

$Y_1,Y_2,\ldots$ を独立な実数値確率変数とし、各 $i$ について

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)\le K
$$

を満たす定数 $K<\infty$ が存在するとする。$S_n:=\sum_{i=1}^nY_i$ と置く。

[Kolmogorov最大不等式](#thm-kolmogorov-maximal) と [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) を使って

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

を示せ。また、証明中で同一分布性を使っていないことを確認せよ。

<!-- solution-start -->
#### 詳細解答

独立性から

$$
\operatorname{Var}(S_n)
=\sum_{i=1}^n\operatorname{Var}(Y_i)
\le Kn.
$$

固定した $\varepsilon>0$ と $m\ge0$ に対し、[Kolmogorov最大不等式](#thm-kolmogorov-maximal) を $n=2^m$、$\lambda=\varepsilon2^m$ で使います。

$$
\begin{aligned}
P\left(
\max_{1\le k\le2^m}|S_k|>\varepsilon2^m
\right)
&\le
\frac{\operatorname{Var}(S_{2^m})}{\varepsilon^22^{2m}}\\
&\le
\frac{K2^m}{\varepsilon^22^{2m}}\\
&=
\frac{K}{\varepsilon^22^m}.
\end{aligned}
$$

右辺は $m$ について総和できます。したがって [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) により、固定した $\varepsilon$ について十分大きな $m$ では

$$
\max_{1\le k\le2^m}|S_k|
\le\varepsilon2^m
$$

です。

$2^{m-1}<n\le2^m$ なら

$$
\frac{|S_n|}{n}
\le
\frac{\max_{k\le2^m}|S_k|}{2^{m-1}}
\le2\varepsilon.
$$

$\varepsilon=1/r$ の確率1事象を可算交叉すれば

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

を得ます。

この証明で使ったのは

- 各 $Y_i$ の平均が0
- 独立性
- 共通の分散上界 $K$

です。同一分布性は使っていません。独立同分布の場合は

$$
K=\operatorname{Var}(Y_1)
$$

を取れるため、この条件が自動的に満たされます。
<!-- solution-end -->

---

## 次に進む

この章では、同じ強大数則でも仮定によって証明の難しさが変わることを確認しました。

- $E|X_1|^4<\infty$ なら、4次モーメントで逸脱確率を $O(n^{-2})$ にして全 $n$ を直接処理できる。
- 有限分散だけでは [Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev) の $O(n^{-1})$ 評価は総和できない。
- [Kolmogorov最大不等式](#thm-kolmogorov-maximal) を使えば、dyadic な時点ごとに途中の部分和までまとめて制御できる。
- 「固定した $\varepsilon$ ごとに確率1」から極限0へ進むには、$\varepsilon=1/r$ の可算交叉を使う。

さらに有限分散を外し、独立同分布かつ $E|X_1|<\infty$ だけで証明する場合は [F0-00P5A 一般独立同分布強大数則](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) へ進みます。
