# F0-00P5 強大数則への二段階：4次モーメント法とKolmogorov最大不等式

<!-- definition-example-audit: strict -->

強大数則は、仮定を少し強くすると証明が急に短くなります。この差を先に見ると、有限分散版で **なぜKolmogorov最大不等式が必要になるか** が見えやすくなります。

この章では次の二段階を扱います。

```text
E|X_1|^4 < ∞
  ↓ 4次モーメントを直接評価
Σ P(|S_n| > εn) < ∞
  ↓ Borel--Cantelli
S_n/n → 0 a.s.

E[X_1^2] < ∞
  ↓ Chebyshevだけでは Σ 1/n が発散
Kolmogorov最大不等式
  ↓ dyadic時点 + 区間最大増分
S_n/n → 0 a.s.
```

さらに仮定を $E|X_1|<\infty$ まで弱めた一般の独立同分布版は、次章 [P5A](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) で切断法を使って証明します。

---

## 1. 強法則で本当に示すこと

$X_1,X_2,\ldots$ を独立同分布とし、$\mu=E[X_1]$ が有限とします。中心化して

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

たとえば $Y_1=2,Y_2=-1,Y_3=4$ という実現値なら

$$
S_1=2,\qquad S_2=2+(-1)=1,\qquad S_3=2+(-1)+4=5.
$$

$S_n$ は「第 $n$ 項」ではなく、**最初から第 $n$ 項までを全部足した量**です。
<!-- definition-example-end -->

標本平均は

$$
\overline X_n
=\frac1n\sum_{i=1}^nX_i
=\mu+\frac{S_n}{n}
$$

なので、強大数則は

$$
\boxed{\frac{S_n}{n}\to0\quad\text{a.s.}}
$$

を示す問題に帰着します。

### 1.1 確率収束と概収束の差

有限分散 $\sigma^2=\operatorname{Var}(X_1)<\infty$ を仮定すれば、[Chebyshevの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-chebyshev)から

$$
P\left(\left|\frac{S_n}{n}\right|>\varepsilon\right)
\le
\frac{\sigma^2}{n\varepsilon^2}
\to0.
$$

したがって $S_n/n\to0$ は確率収束します。

しかし概収束まで言うには、固定した $\varepsilon>0$ について

$$
\left\{\left|\frac{S_n}{n}\right|>\varepsilon\right\}
$$

が**無限回起こる確率が0**であることを示したいところです。ところが

$$
\sum_{n=1}^{\infty}
\frac{\sigma^2}{n\varepsilon^2}
=\infty
$$

なので、このChebyshev評価をそのまま [Borel--Cantelli第1補題](../F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md#thm-f0-00p4-borel-cantelli-1) へ入れることはできません。

ここが有限分散版の最初の壁です。

---

## 2. 先に簡単な場合：4次モーメントが有限なら全 $n$ を直接処理できる

有限分散より強く

$$
E|X_1|^4<\infty
$$

まで仮定すると、Chebyshevより一段強い4次モーメント評価が使えます。

### 2.1 最小例：Rademacher変数

$P(Y_i=1)=P(Y_i=-1)=1/2$ とします。このとき

$$
E[Y_i]=0,\qquad E[Y_i^2]=1,\qquad E[Y_i^4]=1.
$$

$S_n=Y_1+\cdots+Y_n$ の4乗を展開して期待値を取ると、独立性と $E[Y_i]=0$ により「添字が1回だけ現れる項」は消えます。残るのは

- 同じ添字が4回現れる項：$n$ 個
- 異なる2添字が2回ずつ現れる項：$6\binom n2$ 個

です。したがって

$$
E[S_n^4]
=n+6\binom n2
=3n^2-2n
\le3n^2.
$$

[Markovの不等式](../F0_00P2A_期待値_LOTUS/index.md#thm-f0-00p2a-markov)を $S_n^4$ に使えば

$$
P(|S_n|>\varepsilon n)
\le
\frac{E[S_n^4]}{\varepsilon^4n^4}
\le
\frac{3}{\varepsilon^4n^2}.
$$

右辺は $n$ について総和可能です。つまりこの場合は、dyadic列へ逃げなくても **全ての $n$ をそのままBorel--Cantelliへ入れられます**。

<a id="thm-f0-00p5-fourth-moment-slln"></a>

<!-- formal-statement-start -->
> **定理（有限4次モーメントからの強大数則）**  
> $X_1,X_2,\ldots$ を独立同分布な実数値確率変数とし、

$$
E|X_1|^4<\infty
$$

> とします。$\mu=E[X_1]$ とすれば

$$
\boxed{
\frac1n\sum_{i=1}^nX_i\to\mu
\quad\text{a.s.}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

### 証明の見取り図

$Y_i=X_i-\mu$ と中心化します。4次モーメント有限性から

$$
E[S_n^4]=O(n^2)
$$

を作れれば、Markovの不等式により逸脱確率は $O(n^{-2})$ です。これは可算和可能なのでBorel--Cantelliが直接使えます。

<!-- proof-start -->
### 証明

$Y_i=X_i-\mu$、$S_n=\sum_{i=1}^nY_i$ と置きます。$E[Y_i]=0$ であり、

$$
\sigma^2:=E[Y_1^2]<\infty,
\qquad
m_4:=E[Y_1^4]<\infty
$$

です。

まず

$$
S_n^4
=\sum_{i,j,k,\ell=1}^nY_iY_jY_kY_\ell
$$

を考えます。独立性により期待値は添字ごとに因数分解できます。4個の添字のうち、ある添字がちょうど1回だけ現れる項には $E[Y_r]=0$ が因子として現れるため、期待値は0です。

したがって期待値が残り得る型は次の2つだけです。

1. 同じ添字が4回現れる：$n$ 個、各項の期待値は $m_4$。
2. 異なる2添字が2回ずつ現れる：添字対の選び方は $\binom n2$、並べ方は $4!/(2!2!)=6$、各項の期待値は $\sigma^4$。

よって

$$
\begin{aligned}
E[S_n^4]
&=nm_4+6\binom n2\sigma^4\\
&=nm_4+3n(n-1)\sigma^4\\
&\le (m_4+3\sigma^4)n^2.
\end{aligned}
$$

$C:=m_4+3\sigma^4$ と置きます。任意の $\varepsilon>0$ について、Markovの不等式を非負確率変数 $S_n^4$ に適用すると

$$
\begin{aligned}
P(|S_n|>\varepsilon n)
&=P(S_n^4>\varepsilon^4n^4)\\
&\le\frac{E[S_n^4]}{\varepsilon^4n^4}\\
&\le\frac{C}{\varepsilon^4n^2}.
\end{aligned}
$$

したがって

$$
\sum_{n=1}^{\infty}P(|S_n|>\varepsilon n)
\le
\frac{C}{\varepsilon^4}
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

Borel--Cantelli第1補題より、固定した $\varepsilon>0$ について

$$
|S_n|>\varepsilon n
$$

は概ね有限回しか起こりません。

最後に「各 $\varepsilon$ で確率1」から「極限0」を得る点を明示します。$r=1,2,\ldots$ に対して $\varepsilon=1/r$ とし、それぞれの確率1事象を $\Omega_r$ とします。可算交叉

$$
\Omega_0:=\bigcap_{r=1}^{\infty}\Omega_r
$$

も確率1です。$\omega\in\Omega_0$ と任意の $\eta>0$ を固定し、$1/r<\eta$ となる $r$ を選べば、十分大きな $n$ で

$$
\frac{|S_n(\omega)|}{n}\le\frac1r<\eta.
$$

よって $S_n/n\to0$ a.s. です。したがって

$$
\frac1n\sum_{i=1}^nX_i
=\mu+\frac{S_n}{n}
\to\mu
\quad\text{a.s.}
$$

を得ます。
<!-- proof-end -->

---

## 3. なぜ有限4次モーメント版だけでは足りないか

4次モーメント法は短い一方、仮定が強すぎます。

$k=1,2,\ldots$ に対して

$$
P(X=k)=P(X=-k)=\frac{c}{k^4},
$$

ただし

$$
c:=\left(2\sum_{k=1}^{\infty}\frac1{k^4}\right)^{-1}
$$

とします。確率は対称なので $E[X]=0$ です。また

$$
E[X^2]
=2c\sum_{k=1}^{\infty}\frac{k^2}{k^4}
=2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty,
$$

一方

$$
E[X^4]
=2c\sum_{k=1}^{\infty}\frac{k^4}{k^4}
=2c\sum_{k=1}^{\infty}1
=\infty.
$$

したがって、この分布は有限分散版強大数則の対象ですが、前節の4次モーメント証明は使えません。

ここで必要になるのが、途中の部分和をまとめて制御するKolmogorov最大不等式です。

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

> とします。$S_k=\sum_{j=1}^kY_j$ と置くと、任意の $\lambda>0$ に対して

$$
\boxed{
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

Chebyshevの不等式は最後の時点 $S_n$ だけを見ます。Kolmogorov最大不等式は

$$
S_1,S_2,\ldots,S_n
$$

のどこかで閾値を越える確率を、最後の分散1個でまとめて抑えます。

### 証明の見取り図

核心は「初めて $\lambda$ を越えた時刻」で事象を排反分割することです。その時刻までで決まる量と、その後の独立な増分を分離すると交差項が消えます。

<!-- proof-start -->
### 証明

$k=1,\ldots,n$ に対し

$$
A_k
:=
\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,\ |S_k|\ge\lambda\}
$$

と置きます。

$A_k$ は「初めて閾値を越える時刻が $k$」という事象なので互いに排反で、

$$
\bigcup_{k=1}^nA_k
=
\left\{\max_{1\le j\le n}|S_j|\ge\lambda\right\}.
$$

$A_k$ と $S_k$ は $Y_1,\ldots,Y_k$ だけで決まります。一方

$$
T_k:=S_n-S_k=Y_{k+1}+\cdots+Y_n
$$

は $Y_{k+1},\ldots,Y_n$ だけで決まり、独立性から $(S_k\boldsymbol{1}_{A_k})$ と $T_k$ は独立です。また

$$
E[T_k]
=\sum_{j=k+1}^nE[Y_j]
=0.
$$

したがって交差項は

$$
E[S_kT_k\boldsymbol{1}_{A_k}]
=E[S_k\boldsymbol{1}_{A_k}]E[T_k]
=0.
$$

よって

$$
\begin{aligned}
E[S_n^2\boldsymbol{1}_{A_k}]
&=E[(S_k+T_k)^2\boldsymbol{1}_{A_k}]\\
&=E[S_k^2\boldsymbol{1}_{A_k}]
 +2E[S_kT_k\boldsymbol{1}_{A_k}]
 +E[T_k^2\boldsymbol{1}_{A_k}]\\
&\ge E[S_k^2\boldsymbol{1}_{A_k}]\\
&\ge\lambda^2P(A_k).
\end{aligned}
$$

$A_k$ は互いに排反なので

$$
\begin{aligned}
E[S_n^2]
&\ge E\left[S_n^2\boldsymbol{1}_{\cup_{k=1}^nA_k}\right]\\
&=\sum_{k=1}^nE[S_n^2\boldsymbol{1}_{A_k}]\\
&\ge\lambda^2\sum_{k=1}^nP(A_k)\\
&=\lambda^2
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right).
\end{aligned}
$$

さらに $E[S_n]=0$ なので

$$
E[S_n^2]=\operatorname{Var}(S_n).
$$

両辺を $\lambda^2$ で割れば結論です。
<!-- proof-end -->

この定理自体には同一分布性は不要です。使ったのは、各増分の独立性・平均0・有限分散です。

---

## 5. dyadic時点と区間最大増分

<a id="def-f0-00p5-dyadic"></a>

<!-- formal-statement-start -->
> **定義（dyadic subsequence）**  
> 数列 $(a_n)_{n\ge1}$ に対して

$$
a_{2^0},a_{2^1},a_{2^2},\ldots
$$

> のように添字を $n=2^m$ に限定して得る部分列を、この章では dyadic subsequence と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00p5-dyadic -->
**定義の確認**

$(a_n)=(1,2,3,4,5,6,7,8,\ldots)$ なら、dyadic subsequence は

$$
a_1,a_2,a_4,a_8,\ldots
=1,2,4,8,\ldots
$$

です。添字が指数関数的に増えるため、$1/n$ 型の評価が $1/2^m$ 型になり、可算和可能になることが重要です。
<!-- definition-example-end -->

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

Chebyshevを全 $n$ に使うと $\sum 1/n$ が発散します。そこで

1. $n=2^m$ の時点だけなら $\sum2^{-m}<\infty$ なので収束を示せる。
2. $2^m<n\le2^{m+1}$ の途中で部分和が大きく動かないことをKolmogorov最大不等式で示す。
3. dyadic時点と区間内の揺れを足して全 $n$ を覆う。

という順に進みます。

<!-- proof-start -->
### 証明

$Y_i=X_i-\mu$、$S_n=\sum_{i=1}^nY_i$ と置きます。すると

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=\sigma^2.
$$

#### Step 1：dyadic時点 $n=2^m$

固定した $\varepsilon>0$ に対し、Chebyshevの不等式から

$$
\begin{aligned}
P(|S_{2^m}|>\varepsilon2^m)
&\le
\frac{\operatorname{Var}(S_{2^m})}{\varepsilon^22^{2m}}\\
&=
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

したがって

$$
\sum_{m=0}^{\infty}P(|S_{2^m}|>\varepsilon2^m)
<\infty.
$$

Borel--Cantelli第1補題より、固定した $\varepsilon$ について

$$
|S_{2^m}|>\varepsilon2^m
$$

は概ね有限回しか起こりません。$\varepsilon=1/r$（$r\in\mathbb N$）について可算交叉を取れば

$$
\boxed{
\frac{S_{2^m}}{2^m}\to0
\quad\text{a.s.}
}
$$

です。

#### Step 2：dyadic区間内の最大増分

各 $m$ に対し

$$
M_m
:=
\max_{1\le j\le2^m}
|S_{2^m+j}-S_{2^m}|
$$

と置きます。

区間

$$
Y_{2^m+1},\ldots,Y_{2^{m+1}}
$$

は独立・平均0・有限分散なので、Kolmogorov最大不等式をこのブロックへ適用できます。閾値を $\varepsilon2^m$ とすると

$$
\begin{aligned}
P(M_m>\varepsilon2^m)
&\le
\frac{\operatorname{Var}(Y_{2^m+1}+\cdots+Y_{2^{m+1}})}{\varepsilon^22^{2m}}\\
&=
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

よって

$$
\sum_{m=0}^{\infty}P(M_m>\varepsilon2^m)<\infty.
$$

再びBorel--Cantelli第1補題と $\varepsilon=1/r$ の可算交叉から

$$
\boxed{
\frac{M_m}{2^m}\to0
\quad\text{a.s.}
}
$$

を得ます。

#### Step 3：全ての $n$ へ戻す

$2^m<n\le2^{m+1}$ とします。このとき

$$
S_n=S_{2^m}+(S_n-S_{2^m})
$$

なので

$$
\begin{aligned}
\frac{|S_n|}{n}
&\le
\frac{|S_{2^m}|}{n}
+
\frac{|S_n-S_{2^m}|}{n}\\
&\le
\frac{|S_{2^m}|}{2^m}
+
\frac{M_m}{2^m}.
\end{aligned}
$$

右辺の第1項はStep 1で0へ、第2項はStep 2で0へ概収束します。したがって

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

です。最後に

$$
\frac1n\sum_{i=1}^nX_i
=\mu+\frac{S_n}{n}
$$

より結論を得ます。
<!-- proof-end -->

---

## 6. 仮定がどこで働いたか

有限分散版の証明では、それぞれの仮定に役割があります。

- **同じ平均 $\mu$**：$Y_i=X_i-\mu$ と同じ中心へそろえるため。
- **独立性**：分散を足し算でき、Kolmogorov最大不等式の交差項を0にするため。
- **有限分散**：dyadic時点と区間最大増分の確率を $O(2^{-m})$ に抑えるため。
- **同一分布性**：各ブロックの分散を「項数 $\times\sigma^2$」と簡単に書くため。

特に独立性は単なる証明上の飾りではありません。たとえば $Z$ を平均0・非退化な有限分散確率変数とし

$$
X_1=X_2=\cdots=Z
$$

とすると、各 $X_i$ は同一分布ですが完全に依存しており、

$$
\frac1n\sum_{i=1}^nX_i=Z
$$

のままです。一般には0へ収束しません。

一方、有限分散そのものは独立同分布強大数則の最小仮定ではありません。$E|X_1|<\infty$ だけで成り立つ一般形は [P5A](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) で扱います。

---

## 7. 三つの証明ルートを比較する

| 仮定 | 主な道具 | 逸脱確率の作り方 | この教材での位置 |
|---|---|---|---|
| $E|X_1|^4<\infty$ | 4次モーメント + Markov + BC | $P(|S_n|>\varepsilon n)=O(n^{-2})$ | この章のウォームアップ |
| $\operatorname{Var}(X_1)<\infty$ | Kolmogorov最大不等式 + dyadic + BC | dyadic/blockごとに $O(2^{-m})$ | この章の主定理 |
| $E|X_1|<\infty$ | truncation + Kolmogorov収束定理 + Kronecker | 大きい値を切って級数収束へ変換 | P5A |

「仮定が強いほど定理が強い」のではありません。**結論は同じでも、仮定が強いと証明が短くなる**という例です。

---

## 演習

### F0-00P5-A01 Rademacher和の4次モーメント

- Level: A
- 目安時間: 12分

$Y_1,Y_2,\ldots$ を独立同分布とし、$P(Y_i=1)=P(Y_i=-1)=1/2$ とする。$S_n=\sum_{i=1}^nY_i$ と置く。

1. $E[Y_i]=0$, $E[Y_i^2]=E[Y_i^4]=1$ を確認せよ。
2. $E[S_n^4]=3n^2-2n$ を示せ。

<!-- solution-start -->
#### 詳細解答

まず対称性から

$$
E[Y_i]=1\cdot\frac12+(-1)\cdot\frac12=0.
$$

また $Y_i^2=Y_i^4=1$ が常に成り立つので

$$
E[Y_i^2]=E[Y_i^4]=1.
$$

次に

$$
S_n^4
=\sum_{i,j,k,\ell=1}^nY_iY_jY_kY_\ell
$$

と展開します。独立性により、ある添字が1回だけ現れる項ではその添字の期待値 $E[Y_r]=0$ が因子になるため、期待値は0です。

残るのは2種類です。

同じ添字が4回現れる項は

$$
Y_i^4
$$

で、$i$ の選び方が $n$ 通りあり、各期待値は1です。寄与は $n$。

異なる2添字 $i\ne j$ が2回ずつ現れる項では、固定した unordered pair $\{i,j\}$ に対して並べ方が

$$
\frac{4!}{2!2!}=6
$$

通りあります。各項の期待値は独立性から

$$
E[Y_i^2Y_j^2]
=E[Y_i^2]E[Y_j^2]
=1.
$$

したがって寄与は

$$
6\binom n2=3n(n-1).
$$

以上より

$$
E[S_n^4]
=n+3n(n-1)
=3n^2-2n.
$$
<!-- solution-end -->

### F0-00P5-A02 $O(n^2)$ の4次モーメント評価から概収束へ

- Level: A
- 目安時間: 10分

確率変数列 $(S_n)$ が、ある定数 $C>0$ に対して

$$
E[S_n^4]\le Cn^2
$$

をすべての $n$ で満たすとする。$S_n/n\to0$ a.s. を示せ。

<!-- solution-start -->
#### 詳細解答

固定した $\varepsilon>0$ に対して

$$
\{|S_n|>\varepsilon n\}
=\{S_n^4>\varepsilon^4n^4\}
$$

です。Markovの不等式より

$$
P(|S_n|>\varepsilon n)
\le
\frac{E[S_n^4]}{\varepsilon^4n^4}
\le
\frac{C}{\varepsilon^4n^2}.
$$

したがって

$$
\sum_{n=1}^{\infty}P(|S_n|>\varepsilon n)
\le
\frac{C}{\varepsilon^4}
\sum_{n=1}^{\infty}\frac1{n^2}
<\infty.
$$

Borel--Cantelli第1補題により、固定した $\varepsilon$ について $|S_n|>\varepsilon n$ はa.s.有限回しか起こりません。

ここで「任意の実数 $\varepsilon>0$」を非可算個そのまま交叉する必要はありません。$r\in\mathbb N$ に対して $\varepsilon=1/r$ だけを考えます。それぞれの確率1事象を $\Omega_r$ とすると

$$
P\left(\bigcap_{r=1}^{\infty}\Omega_r\right)=1.
$$

この交叉上では任意の $r$ について、十分大きな $n$ で

$$
\frac{|S_n|}{n}\le\frac1r.
$$

任意の $\eta>0$ に対して $1/r<\eta$ となる $r$ を取れるので、$S_n/n\to0$ です。
<!-- solution-end -->

### F0-00P5-A03 dyadic時点ではChebyshevだけで足りる

- Level: A
- 目安時間: 10分

$Y_1,Y_2,\ldots$ を独立同分布、$E[Y_i]=0$, $\operatorname{Var}(Y_i)=\sigma^2<\infty$ とし、$S_n=\sum_{i=1}^nY_i$ とする。Chebyshevの不等式とBorel--Cantelli第1補題を使って

$$
\frac{S_{2^m}}{2^m}\to0
\quad\text{a.s.}
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

独立性と有限分散から

$$
\operatorname{Var}(S_{2^m})
=\sum_{i=1}^{2^m}\operatorname{Var}(Y_i)
=2^m\sigma^2.
$$

固定した $\varepsilon>0$ に対してChebyshevの不等式を適用すると

$$
\begin{aligned}
P\left(\left|\frac{S_{2^m}}{2^m}\right|>\varepsilon\right)
&=P(|S_{2^m}|>\varepsilon2^m)\\
&\le
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

したがって

$$
\sum_{m=0}^{\infty}
P(|S_{2^m}|>\varepsilon2^m)
\le
\frac{\sigma^2}{\varepsilon^2}
\sum_{m=0}^{\infty}2^{-m}
<\infty.
$$

Borel--Cantelli第1補題から、固定した $\varepsilon$ について逸脱は有限回です。さらに $\varepsilon=1/r$、$r\in\mathbb N$ に対する確率1事象の可算交叉を取れば

$$
S_{2^m}/2^m\to0
$$

a.s. を得ます。
<!-- solution-end -->

### F0-00P5-A04 初回越境事象と交差項

- Level: A
- 目安時間: 12分

独立な平均0確率変数 $Y_1,\ldots,Y_n$ に対し $S_k=\sum_{j=1}^kY_j$ とする。$\lambda>0$ を固定し

$$
A_k=\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,|S_k|\ge\lambda\}
$$

と置く。

1. $A_1,\ldots,A_n$ が互いに排反であることを示せ。
2. $T_k=S_n-S_k$ とすると $E[S_kT_k\boldsymbol{1}_{A_k}]=0$ であることを示せ。

<!-- solution-start -->
#### 詳細解答

1. $A_k$ は「初めて $\lambda$ 以上になった時刻が $k$」という事象です。もし $k<\ell$ で $A_k$ と $A_\ell$ が同時に起これば、$A_k$ から $|S_k|\ge\lambda$、一方 $A_\ell$ から $k<\ell$ なので $|S_k|<\lambda$ が必要になり矛盾します。よって互いに排反です。

2. $S_k\boldsymbol{1}_{A_k}$ は $Y_1,\ldots,Y_k$ の関数です。一方

$$
T_k=Y_{k+1}+\cdots+Y_n
$$

は $Y_{k+1},\ldots,Y_n$ の関数です。元の確率変数が独立なので、この2つも独立です。

また

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

この「初回越境時点までの情報」と「その後の独立な増分」の分離が、Kolmogorov最大不等式の核心です。
<!-- solution-end -->

### F0-00P5-B01 Kolmogorov最大不等式を再構成する

- Level: B
- 目安時間: 20分

独立な平均0・有限分散確率変数 $Y_1,\ldots,Y_n$ に対し $S_k=\sum_{j=1}^kY_j$ とする。任意の $\lambda>0$ に対し

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
=\{|S_1|<\lambda,\ldots,|S_{k-1}|<\lambda,|S_k|\ge\lambda\}
$$

を導入します。$A_k$ は互いに排反で

$$
\bigcup_{k=1}^nA_k
=\left\{\max_{1\le j\le n}|S_j|\ge\lambda\right\}.
$$

$T_k=S_n-S_k$ と置くと、$S_k\boldsymbol{1}_{A_k}$ と $T_k$ は独立で、$E[T_k]=0$ です。したがって

$$
E[S_kT_k\boldsymbol{1}_{A_k}]=0.
$$

この等式を二乗展開へ入れると

$$
\begin{aligned}
E[S_n^2\boldsymbol{1}_{A_k}]
&=E[(S_k+T_k)^2\boldsymbol{1}_{A_k}]\\
&=E[S_k^2\boldsymbol{1}_{A_k}]
 +E[T_k^2\boldsymbol{1}_{A_k}]\\
&\ge E[S_k^2\boldsymbol{1}_{A_k}].
\end{aligned}
$$

$A_k$ 上では $|S_k|\ge\lambda$ なので

$$
S_k^2\boldsymbol{1}_{A_k}
\ge
\lambda^2\boldsymbol{1}_{A_k}.
$$

期待値を取れば

$$
E[S_n^2\boldsymbol{1}_{A_k}]
\ge
\lambda^2P(A_k).
$$

排反性を使って足し合わせると

$$
\begin{aligned}
E[S_n^2]
&\ge
\sum_{k=1}^nE[S_n^2\boldsymbol{1}_{A_k}]\\
&\ge
\lambda^2\sum_{k=1}^nP(A_k)\\
&=
\lambda^2
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right).
\end{aligned}
$$

$E[S_n]=0$ なので $E[S_n^2]=\operatorname{Var}(S_n)$ です。よって

$$
P\left(\max_{1\le k\le n}|S_k|\ge\lambda\right)
\le
\frac{\operatorname{Var}(S_n)}{\lambda^2}.
$$
<!-- solution-end -->

### F0-00P5-B02 dyadic区間の隙間を最大不等式で埋める

- Level: B
- 目安時間: 20分

$Y_1,Y_2,\ldots$ を独立同分布、$E[Y_i]=0$, $\operatorname{Var}(Y_i)=\sigma^2<\infty$ とし、$S_n=\sum_{i=1}^nY_i$ とする。さらに

$$
\frac{S_{2^m}}{2^m}\to0
\quad\text{a.s.}
$$

が分かっているとする。

$$
M_m:=\max_{1\le j\le2^m}|S_{2^m+j}-S_{2^m}|
$$

と置き、$M_m/2^m\to0$ a.s. を示して、そこから $S_n/n\to0$ a.s. を導け。

<!-- solution-start -->
#### 詳細解答

まず

$$
S_{2^m+j}-S_{2^m}
=Y_{2^m+1}+\cdots+Y_{2^m+j}
$$

です。したがって $M_m$ は、独立なブロック

$$
Y_{2^m+1},\ldots,Y_{2^{m+1}}
$$

の部分和最大値です。

Kolmogorov最大不等式をこのブロックへ適用すると、固定した $\varepsilon>0$ に対して

$$
\begin{aligned}
P(M_m>\varepsilon2^m)
&\le
\frac{\operatorname{Var}(Y_{2^m+1}+\cdots+Y_{2^{m+1}})}{\varepsilon^22^{2m}}\\
&=
\frac{2^m\sigma^2}{\varepsilon^22^{2m}}\\
&=
\frac{\sigma^2}{\varepsilon^22^m}.
\end{aligned}
$$

よって

$$
\sum_{m=0}^{\infty}P(M_m>\varepsilon2^m)<\infty.
$$

Borel--Cantelli第1補題と $\varepsilon=1/r$ の可算交叉から

$$
\frac{M_m}{2^m}\to0
\quad\text{a.s.}
$$

です。

次に任意の $n$ に対し $2^m<n\le2^{m+1}$ となる $m$ を取ります。すると

$$
\begin{aligned}
\frac{|S_n|}{n}
&\le
\frac{|S_{2^m}|}{n}
+
\frac{|S_n-S_{2^m}|}{n}\\
&\le
\frac{|S_{2^m}|}{2^m}
+
\frac{M_m}{2^m}.
\end{aligned}
$$

右辺の第1項は仮定により0へ、第2項は今示した結果により0へ概収束します。したがって $S_n/n\to0$ a.s. です。
<!-- solution-end -->

### F0-00P5-B03 有限分散だが4次モーメント無限の分布

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
3. この分布の独立同分布標本に対して、4次モーメント法は使えないが有限分散版強大数則は使える理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

1. $c>0$ であり、定義から

$$
\sum_{k=1}^{\infty}\{P(X=k)+P(X=-k)\}
=2c\sum_{k=1}^{\infty}\frac1{k^4}
=1.
$$

したがって全確率は1です。

2. 分布は0について対称です。また

$$
E|X|
=2c\sum_{k=1}^{\infty}\frac{k}{k^4}
=2c\sum_{k=1}^{\infty}\frac1{k^3}
<\infty
$$

なので平均は絶対収束し、対称性から $E[X]=0$ です。

二次モーメントは

$$
E[X^2]
=2c\sum_{k=1}^{\infty}\frac{k^2}{k^4}
=2c\sum_{k=1}^{\infty}\frac1{k^2}
<\infty.
$$

一方4次モーメントは

$$
E[X^4]
=2c\sum_{k=1}^{\infty}\frac{k^4}{k^4}
=2c\sum_{k=1}^{\infty}1
=\infty.
$$

3. 4次モーメント法では $E[S_n^4]$ を有限量として評価する必要があります。しかし $E[X^4]=\infty$ なので、その出発点が成立しません。

一方、この分布は $E[X^2]<\infty$ なので分散有限です。独立同分布標本ならKolmogorov最大不等式を使う有限分散版強大数則の仮定を満たし、標本平均は $E[X]=0$ へa.s.収束します。

この例は「4次モーメント法が失敗する」ことと「強大数則そのものが失敗する」ことが別であると示しています。
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

を満たす定数 $K<\infty$ が存在するとする。$S_n=\sum_{i=1}^nY_i$ と置く。

Kolmogorov最大不等式、Chebyshevの不等式、Borel--Cantelli第1補題を使って

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

を示せ。同一分布性をどこでも使っていないことも確認せよ。

<!-- solution-start -->
#### 詳細解答

同一分布性は仮定されていませんが、分散が一様に $K$ 以下なので、任意の $n$ に対し独立性から

$$
\operatorname{Var}(S_n)
=\sum_{i=1}^n\operatorname{Var}(Y_i)
\le Kn.
$$

#### Step 1：dyadic時点

固定した $\varepsilon>0$ に対し

$$
\begin{aligned}
P(|S_{2^m}|>\varepsilon2^m)
&\le
\frac{\operatorname{Var}(S_{2^m})}{\varepsilon^22^{2m}}\\
&\le
\frac{K2^m}{\varepsilon^22^{2m}}\\
&=
\frac{K}{\varepsilon^22^m}.
\end{aligned}
$$

したがって確率の和は $m$ について有限です。Borel--Cantelli第1補題と $\varepsilon=1/r$ の可算交叉から

$$
\frac{S_{2^m}}{2^m}\to0
\quad\text{a.s.}
$$

を得ます。

#### Step 2：dyadic区間内の最大増分

$$
M_m
:=
\max_{1\le j\le2^m}
|S_{2^m+j}-S_{2^m}|
$$

とします。ブロック $Y_{2^m+1},\ldots,Y_{2^{m+1}}$ にKolmogorov最大不等式を適用します。ブロック全体の分散は

$$
\sum_{i=2^m+1}^{2^{m+1}}\operatorname{Var}(Y_i)
\le K2^m.
$$

よって

$$
P(M_m>\varepsilon2^m)
\le
\frac{K2^m}{\varepsilon^22^{2m}}
=
\frac{K}{\varepsilon^22^m}.
$$

これも $m$ について総和可能なので

$$
\frac{M_m}{2^m}\to0
\quad\text{a.s.}
$$

です。

#### Step 3：全 $n$ を覆う

$2^m<n\le2^{m+1}$ なら

$$
\frac{|S_n|}{n}
\le
\frac{|S_{2^m}|}{2^m}
+
\frac{M_m}{2^m}.
$$

両項はa.s.0へ行くので

$$
\frac{S_n}{n}\to0
\quad\text{a.s.}
$$

です。

この証明で必要だったのは

- 各 $Y_i$ の平均が0であること
- 独立性
- 分散の一様上界 $K$

だけです。同一分布性は使っていません。有限分散版iid強大数則では、同一分布性によってこの一様上界を $K=\sigma^2$ と自動的に得ています。
<!-- solution-end -->

---

## 次に進む

この章では

- 強い仮定 $E|X_1|^4<\infty$ なら、4次モーメントから全 $n$ を直接Borel--Cantelliへ入れられること
- 有限分散だけではChebyshevの $1/n$ が総和不能なので、dyadic化とKolmogorov最大不等式が必要になること
- 固定した $\varepsilon$ ごとの議論から極限0へ移るには、$\varepsilon=1/r$ の可算交叉を明示すればよいこと

を確認しました。

有限分散をさらに外し、独立同分布かつ $E|X_1|<\infty$ だけで強大数則を証明するなら [F0-00P5A 一般独立同分布強大数則](../F0_00P5A_truncation_Kronecker_一般SLLN/index.md#ref-general-slln-proof) へ進みます。
