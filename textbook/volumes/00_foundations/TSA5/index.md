# TSA5 Encore IV 時系列解析 V：時間平均・依存減衰・従属極限定理

<!-- definition-example-audit: strict -->

TSA1--TSA4 では、定常過程を二次構造・予測・周波数領域・線形フィルタの側から調べました。しかし、観測された一本の時系列から母平均や自己共分散を推定するときには、もう一つ別の問題があります。

$$
\text{「同じ分布を保つ」}
\quad\Longrightarrow\quad
\text{「時間平均が母平均へ近づく」}
\ ? 
$$

答えは **一般には否** です。定常性は「時間をずらしても法則が変わらない」ことしか言いません。一本の経路に、時間をいくら進めても消えないランダム成分が残っていると、標本平均はその成分を記憶し続けます。

本章では、

$$
\boxed{
\text{定常性}
\;\longrightarrow\;
\text{時間平均を安定させる条件}
\;\longrightarrow\;
\text{大数則}
}
$$

という流れと、

$$
\boxed{
\text{遠距離依存の減衰}
\;+\;
\text{モーメント条件}
\;\longrightarrow\;
\text{従属下の中心極限定理}
}
$$

という流れを分けて整理します。特に、**大数則に十分な依存条件と中心極限定理に必要な依存条件は同じではない**ことを明確にします。

---

## 1. 定常過程を「経路をずらす力学系」として見る

狭義定常過程 $(X_t)_{t\in\mathbb Z}$ を考えます。標準経路空間を

$$
\Omega=\mathbb R^{\mathbb Z}
$$

とし、座標写像を

$$
X_t(\omega)=\omega_t
$$

とします。

時間を一つ進める写像

$$
T:\Omega\to\Omega,
\qquad
(T\omega)_t=\omega_{t+1}
$$

を考えると、

$$
X_t=X_0\circ T^t
$$

です。

<a id="def-tsa5-measure-preserving-shift"></a>

<!-- formal-statement-start -->
> **定義（測度保存シフト）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の可測な可逆写像 $T:\Omega\to\Omega$ が
>
$$
P(T^{-1}A)=P(A)
\qquad
(A\in\mathcal F)
$$
>
> を満たすとき、$T$ は確率測度を保つ写像です。時系列の標準経路空間上で
>
$$
(T\omega)_t=\omega_{t+1}
$$
>
> と定めたものを測度保存シフトと呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-measure-preserving-shift -->
**定義の確認**  
$(Z_t)$ を独立同分布列とします。例えば

$$
A=\{Z_{-1}\le a,\ Z_0\le b,\ Z_2\le c\}
$$

なら

$$
T^{-1}A
=
\{Z_0\le a,\ Z_1\le b,\ Z_3\le c\}.
$$

独立同分布性により両者の確率は同じです。有限個の座標だけで定まる円柱事象でこの等式が成立し、円柱事象が経路空間の $\sigma$-加法族を生成するので、全ての可測事象へ拡張されます。
<!-- definition-example-end -->

<a id="prop-tsa5-stationarity-shift"></a>

<!-- formal-statement-start -->
> **命題（狭義定常性と標準経路空間の測度保存シフト）**  
> 実数値過程 $(X_t)_{t\in\mathbb Z}$ の経路法則を $P_X$ とします。$(X_t)$ が狭義定常であることと、標準経路空間上のシフト $T$ が
>
$$
P_X(T^{-1}A)=P_X(A)
$$
>
> を全ての可測集合 $A$ について満たすことは同値です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず狭義定常性を仮定します。有限個の時点 $t_1,\dots,t_m$ と Borel 集合 $B\subset\mathbb R^m$ から作る円柱事象

$$
C=
\{
\omega:
(\omega_{t_1},\dots,\omega_{t_m})\in B
\}
$$

に対し、

$$
T^{-1}C
=
\{
\omega:
(\omega_{t_1+1},\dots,\omega_{t_m+1})\in B
\}.
$$

狭義定常性より

$$
P_X(T^{-1}C)=P_X(C).
$$

円柱事象は積 $\sigma$-加法族を生成する $\pi$-系なので、$\pi$--$\lambda$ 論法により等式は全可測事象へ拡張されます。

逆に $P_X$ がシフト不変なら、任意の $h\in\mathbb Z$ について

$$
(X_{t_1+h},\dots,X_{t_m+h})
$$

の分布は

$$
(X_{t_1},\dots,X_{t_m})
$$

の分布と一致します。従って狭義定常です。$\square$
<!-- proof-end -->

TSA1 では定常性を有限個の時点の同時分布が時間移動で変わらない性質として見ました。本章では同じ事実を「経路法則を保つシフト」として読み替えます。この読み替えによって、時間平均を作用素の Cesàro 平均として扱えるようになります。

---

## 2. 時間を進めても残るランダム性を排除する

<a id="def-tsa5-invariant-sigma-field"></a>

<!-- formal-statement-start -->
> **定義（不変σ-加法族）**  
> 測度保存シフト $T$ に対し、
>
$$
\mathcal I
:=
\left\{
A\in\mathcal F:
P(A\triangle T^{-1}A)=0
\right\}
$$
>
> を不変σ-加法族と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-invariant-sigma-field -->
**定義の確認**  
ランダム定数過程 $X_t=Y$ では、任意の Borel 集合 $C$ に対して

$$
A=\{X_0\in C\}=\{Y\in C\}
$$

は

$$
T^{-1}A=A
$$

を満たします。従って $A\in\mathcal I$ です。
<!-- definition-example-end -->

<a id="def-tsa5-ergodicity"></a>

<!-- formal-statement-start -->
> **定義（エルゴード性）**  
> 狭義定常過程がエルゴード的であるとは、その不変σ-加法族 $\mathcal I$ の全ての事象が
>
$$
A\in\mathcal I
\quad\Longrightarrow\quad
P(A)\in\{0,1\}
$$
>
> を満たすことです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-ergodicity -->
**定義の確認**  
ランダム定数過程：  
非退化な確率変数 $Y$ を一つ取り、

$$
X_t=Y
\qquad(t\in\mathbb Z)
$$

とします。この過程は明らかに狭義定常です。

一方、$0<P(Y\le c)<1$ となる $c$ を取れば

$$
A=\{X_0\le c\}=\{Y\le c\}
$$

について、全ての時刻で $X_t=Y$ なので

$$
T^{-1}A=A.
$$

従って $A\in\mathcal I$ ですが、$P(A)$ は 0 でも 1 でもありません。この過程はエルゴード的ではありません。

さらに標本平均は

$$
\bar X_n
=
\frac1n\sum_{t=1}^nX_t
=
Y
$$

のままです。母平均 $E[Y]$ へ近づくとは限りません。**定常性だけでは標本平均の一致性は出ない**ことが、最小の例で見えます。
<!-- definition-example-end -->

エルゴード性は「各時点の分布」を変える条件ではありません。時間をどれだけ進めても観測から消えない共通ランダム成分を禁止する条件です。

---

## 3. $L^2$ における作用素平均

$T$ が測度保存なら、

$$
Uf:=f\circ T
$$

は $L^2(P)$ 上のユニタリ作用素です。実際、

$$
\|Uf\|_2^2
=
\int |f\circ T|^2\,dP
=
\int |f|^2\,dP
=
\|f\|_2^2.
$$

時間平均は

$$
A_nf
:=
\frac1n
\sum_{k=0}^{n-1}U^kf
$$

と書けます。

<a id="thm-tsa5-mean-ergodic"></a>

<!-- formal-statement-start -->
> **定理（von Neumann の平均エルゴード定理）**  
> $(\Omega,\mathcal F,P)$ 上の可逆写像 $T$ を取り、$T$ と $T^{-1}$ が可測で
>
$$
P(T^{-1}A)=P(A)
\qquad(A\in\mathcal F)
$$
>
> を満たすとし、
>
$$
Uf=f\circ T
$$
>
> で定まる $L^2(P)$ 上のユニタリ作用素を考えます。
>
$$
\operatorname{Fix}(U)
:=
\{g\in L^2(P):Ug=g\}
$$
>
> とし、$P_{\operatorname{Fix}(U)}$ をこの閉部分空間への直交射影とします。このとき任意の $f\in L^2(P)$ について
>
$$
\boxed{
A_nf
=
\frac1n\sum_{k=0}^{n-1}U^kf
\xrightarrow{L^2}
P_{\operatorname{Fix}(U)}f
}.
$$
>
> さらに
>
$$
\operatorname{Fix}(U)=L^2(\mathcal I)
$$
>
> なので、
>
$$
\boxed{
A_nf
\xrightarrow{L^2}
E[f\mid\mathcal I]
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固定点上では平均を取っても何も変わりません。逆に

$$
f=(I-U)g
$$

という「差分型」の関数では和が望遠鏡和になり、

$$
A_nf=\frac{g-U^ng}{n}\to0.
$$

従って $L^2$ を

$$
\operatorname{Fix}(U)
\oplus
\overline{\operatorname{Ran}(I-U)}
$$

へ分解できれば終わります。

<!-- proof-start -->
### 証明

まず

$$
\operatorname{Ran}(I-U)^\perp
=
\operatorname{Fix}(U)
$$

を示します。

$h\in\operatorname{Ran}(I-U)^\perp$ なら任意の $g\in L^2$ に対し

$$
0
=
\langle h,(I-U)g\rangle
=
\langle h,g\rangle-\langle U^*h,g\rangle.
$$

従って

$$
h=U^*h.
$$

$U$ はユニタリなので $U^*=U^{-1}$ です。よって

$$
Uh=h,
$$

すなわち $h\in\operatorname{Fix}(U)$ です。逆向きは、$Uh=h$ なら

$$
\langle h,(I-U)g\rangle
=
\langle h,g\rangle-\langle U^*h,g\rangle
=
0
$$

なので直ちに従います。

従って [直交分解定理](../F0_02C1A_Hilbert射影定理_直交分解/index.md#thm-f0-02c1a-orthogonal-decomposition) より

$$
L^2(P)
=
\operatorname{Fix}(U)
\oplus
\overline{\operatorname{Ran}(I-U)}.
$$

次に固定点 $f\in\operatorname{Fix}(U)$ なら

$$
A_nf=f.
$$

一方、

$$
f=(I-U)g
$$

なら

$$
\begin{aligned}
A_nf
&=
\frac1n\sum_{k=0}^{n-1}U^k(I-U)g\\
&=
\frac1n
\sum_{k=0}^{n-1}
(U^kg-U^{k+1}g)\\
&=
\frac{g-U^ng}{n}.
\end{aligned}
$$

$U$ は等長なので

$$
\|A_nf\|_2
\le
\frac{\|g\|_2+\|U^ng\|_2}{n}
=
\frac{2\|g\|_2}{n}
\to0.
$$

さらに各 $A_n$ は

$$
\|A_n\|
\le
\frac1n\sum_{k=0}^{n-1}\|U^k\|
=1
$$

を満たします。従って $\operatorname{Ran}(I-U)$ 上の収束は、その閉包
$\overline{\operatorname{Ran}(I-U)}$ へ一様有界性を用いて延長できます。

以上から任意の

$$
f=f_0+f_1,
\qquad
f_0\in\operatorname{Fix}(U),
\quad
f_1\in\overline{\operatorname{Ran}(I-U)}
$$

に対し

$$
A_nf
\to
f_0
=
P_{\operatorname{Fix}(U)}f
$$

が $L^2$ で成立します。

最後に固定点と不変σ-加法族 を同定します。$\mathcal I$-可測な $g$ は $g\circ T=g$ a.s. を満たすので $L^2(\mathcal I)\subset\operatorname{Fix}(U)$ です。

逆に $Ug=g$ a.s. なら、任意の有理数 $q$ に対する集合

$$
\{g\le q\}
$$

はシフトで不変です。従って $g$ は $\mathcal I$-可測な版を持ちます。よって

$$
\operatorname{Fix}(U)=L^2(\mathcal I).
$$

条件付き期待値は $L^2(\mathcal I)$ への直交射影なので

$$
P_{\operatorname{Fix}(U)}f
=
E[f\mid\mathcal I].
$$

これで証明されました。$\square$
<!-- proof-end -->

### 3.1 エルゴード的なら極限は定数になる

エルゴード性の下では $\mathcal I$-可測な可積分関数は a.s. 定数です。従って

$$
E[f\mid\mathcal I]=E[f]
$$

です。

特に $f=X_0$ と置けば、

$$
\frac1n\sum_{t=0}^{n-1}X_t
\xrightarrow{L^2}
E[X_0]
$$

を得ます。

ここで重要なのは、この作用素平均の定理が **$L^2$ 収束**を与えることです。経路ごとの a.s. 収束は次節の結果が担当します。

---

## 4. 経路ごとの時間平均

<a id="thm-tsa5-birkhoff"></a>

<!-- formal-statement-start -->
> **定理（Birkhoff のエルゴード定理）**  
> $(\Omega,\mathcal F,P)$ 上の写像 $T$ が可測で
>
$$
P(T^{-1}A)=P(A)
\qquad(A\in\mathcal F)
$$
>
> を満たすとします。$f\in L^1(P)$ に対し、
>
$$
A_nf
=
\frac1n\sum_{k=0}^{n-1}f\circ T^k
$$
>
> は
>
$$
\boxed{
A_nf
\to
E[f\mid\mathcal I]
\qquad\text{a.s.}
}
$$
>
> を満たします。特に $T$ がエルゴード的なら
>
$$
\boxed{
A_nf
\to
E[f]
\qquad\text{a.s.}
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**本章では以下を意図的な技術的入力として扱います。**

一般 $L^1$ 版の完全証明は、最大エルゴード不等式、可積分関数の近似、極大関数を用いた a.s. 収束の議論を必要とします。これは本章の「時系列推測に必要なエルゴード性と依存極限定理」という射程を大きく越えて、一般エルゴード理論の証明技法そのものへ入ります。

そのため本章では Birkhoff の一般 $L^1$ 版を **明示的な技術的入力**として使います。一方、二乗可積分の場合の時間平均については、直前の [von Neumann の平均エルゴード定理](#thm-tsa5-mean-ergodic)を完全証明しており、

$$
A_nf\to E[f\mid\mathcal I]
\qquad\text{in }L^2
$$

がどの機構から出るかは章内で閉じています。
<!-- proof-end -->

<a id="cor-tsa5-ergodic-lln"></a>

<!-- formal-statement-start -->
> **系（定常エルゴード過程の大数則）**  
> $(X_t)_{t\in\mathbb Z}$ を狭義定常かつエルゴード的とし、
>
$$
E|X_0|<\infty
$$
>
> とします。このとき
>
$$
\boxed{
\bar X_n
:=
\frac1n\sum_{t=1}^nX_t
\to
E[X_0]
\qquad\text{a.s.}
}.
$$
>
> さらに $E[X_0^2]<\infty$ なら、同じ収束は $L^2$ でも成立します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

標準経路空間で

$$
X_t=X_0\circ T^t
$$

です。$f=X_0$ として [Birkhoff のエルゴード定理](#thm-tsa5-birkhoff)を適用すると

$$
\frac1n\sum_{t=1}^nX_t
\to
E[X_0]
\qquad\text{a.s.}
$$

を得ます。

$X_0\in L^2$ なら [von Neumann の平均エルゴード定理](#thm-tsa5-mean-ergodic)も適用できるため $L^2$ 収束も従います。$\square$
<!-- proof-end -->

---

## 5. 遠く離れた時点の依存が消える条件

エルゴード性は時間平均には十分強い条件ですが、「遠く離れた観測がどの程度独立に近づくか」という速度情報を持ちません。中心極限定理では、その依存の減衰を定量化する条件が必要になります。

<a id="def-tsa5-mixing"></a>

<!-- formal-statement-start -->
> **定義（混合性）**  
> 測度保存シフト $T$ が混合的であるとは、任意の $A,B\in\mathcal F$ に対し
>
$$
\boxed{
P(A\cap T^{-n}B)
\to
P(A)P(B)
}
$$
>
> が成立することです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-mixing -->
**定義の確認**  
独立同分布列：  
$(Z_t)$ が独立同分布なら、有限個の過去座標だけに依存する円柱事象 $A$ と、有限個の座標だけに依存する円柱事象 $B$ は、$n$ が十分大きいと $A$ と $T^{-n}B$ が互いに素な座標集合へ依存します。従って

$$
P(A\cap T^{-n}B)
=
P(A)P(B).
$$

一般の可測事象は円柱事象で確率的に近似できるため、独立同分布シフトは混合的です。
<!-- definition-example-end -->

<a id="prop-tsa5-mixing-ergodic"></a>

<!-- formal-statement-start -->
> **命題（混合性はエルゴード性を含意する）**  
> 狭義定常過程の標準シフトが混合的なら、その過程はエルゴード的です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A\in\mathcal I$ とします。不変性より

$$
P(A\triangle T^{-n}A)=0
$$

なので

$$
P(A\cap T^{-n}A)=P(A).
$$

一方、混合性から

$$
P(A\cap T^{-n}A)
\to
P(A)^2.
$$

従って

$$
P(A)=P(A)^2.
$$

よって

$$
P(A)\in\{0,1\}.
$$

従ってエルゴード的です。$\square$
<!-- proof-end -->

### 5.1 過去と未来の依存を数値化する

時系列では、過去と未来の依存を数値で測る方が便利です。整数 $a\le b$ に対し

$$
\mathcal F_a^b
:=
\sigma(X_t:a\le t\le b)
$$

と書き、

$$
\mathcal F_{-\infty}^0
=
\sigma(X_t:t\le0),
\qquad
\mathcal F_n^\infty
=
\sigma(X_t:t\ge n)
$$

とします。

<a id="def-tsa5-alpha-mixing"></a>

<!-- formal-statement-start -->
> **定義（α-混合係数）**  
> 狭義定常過程 $(X_t)$ に対して
>
$$
\boxed{
\alpha(n)
:=
\sup_{
A\in\mathcal F_{-\infty}^0,\,
B\in\mathcal F_n^\infty
}
\left|
P(A\cap B)-P(A)P(B)
\right|
}
$$
>
> と定義します。
>
$$
\alpha(n)\to0
$$
>
> のとき、この過程を α-混合的と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-alpha-mixing -->
**定義の確認**  
独立同分布列では、$\mathcal F_{-\infty}^0$ と $\mathcal F_1^\infty$ が独立なので

$$
\alpha(n)=0
\qquad(n\ge1).
$$

つまり独立列は、依存が「漸近的に小さくなる」どころか一時点離れた段階で完全に消える極端な α-混合過程です。
<!-- definition-example-end -->

$\alpha(n)$ は $n$ に関して単調非増加です。未来をより遠くへ送ると、上限を取る未来側の $\sigma$-加法族が小さくなるからです。

<a id="prop-tsa5-alpha-implies-mixing"></a>

<!-- formal-statement-start -->
> **命題（α-混合は混合性を含意する）**  
> 標準経路空間上の狭義定常過程が
>
$$
\alpha(n)\to0
$$
>
> を満たすなら、その標準シフトは混合的です。従ってその過程はエルゴード的です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A,B$ が有限個の座標だけで決まる円柱事象だとします。ある $r,s\ge0$ が存在して

$$
A\in\mathcal F_{-r}^{r},
\qquad
B\in\mathcal F_{-s}^{s}
$$

と書けます。

$T^{-n}B$ は時点 $n-s,\dots,n+s$ の座標で決まります。従って $n>r+s$ なら、定常性により

$$
\left|
P(A\cap T^{-n}B)-P(A)P(B)
\right|
\le
\alpha(n-r-s).
$$

右辺は $n\to\infty$ で 0 へ収束します。

次に一般の $A,B\in\mathcal F$ を取ります。円柱事象の代数は経路空間の $\sigma$-加法族を生成し、確率測度が有限なので、任意の $\varepsilon>0$ に対して円柱事象 $A_\varepsilon,B_\varepsilon$ を

$$
P(A\triangle A_\varepsilon)<\varepsilon,
\qquad
P(B\triangle B_\varepsilon)<\varepsilon
$$

となるように取れます。測度保存性から

$$
P(T^{-n}B\triangle T^{-n}B_\varepsilon)
=
P(B\triangle B_\varepsilon)
<
\varepsilon.
$$

従って同時確率と積をそれぞれ比較すれば

$$
\begin{aligned}
&
\left|
P(A\cap T^{-n}B)-P(A)P(B)
\right|
\\
&\le
\left|
P(A_\varepsilon\cap T^{-n}B_\varepsilon)
-
P(A_\varepsilon)P(B_\varepsilon)
\right|
+
4\varepsilon.
\end{aligned}
$$

$n\to\infty$ を送ると第一項は 0 なので上極限は $4\varepsilon$ 以下です。最後に $\varepsilon\downarrow0$ とすれば混合性が従います。

混合性からエルゴード性は [直前の命題](#prop-tsa5-mixing-ergodic)によります。$\square$
<!-- proof-end -->

### 5.2 m-依存は最も分かりやすい短距離依存

<a id="def-tsa5-m-dependence"></a>

<!-- formal-statement-start -->
> **定義（m-依存性）**  
> 整数 $m\ge0$ に対し、過程 $(X_t)$ が m-依存であるとは、任意の整数 $k$ について
>
$$
\sigma(X_t:t\le k)
$$
>
> と
>
$$
\sigma(X_t:t\ge k+m+1)
$$
>
> が独立であることです。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-m-dependence -->
**定義の確認**  
独立雑音から作った MA(q)：  
$(Z_t)$ を独立同分布列とし、

$$
X_t
=
\sum_{j=0}^{q}\theta_jZ_{t-j}
$$

とします。

$X_t$ for $t\le k$ は $Z_s$ for $s\le k$ だけで決まり、$X_t$ for $t\ge k+q+1$ は $Z_s$ for $s\ge k+1$ だけで決まります。二つの雑音集合は独立なので、$(X_t)$ は $q$ 依存です。

ここで TSA4 の「弱ホワイトノイズ」だけでは不十分です。無相関は $\sigma$-加法族の独立を意味しないため、m-依存性を結論するには駆動雑音の独立性を仮定しています。
<!-- definition-example-end -->

<a id="prop-tsa5-m-dependent-alpha"></a>

<!-- formal-statement-start -->
> **命題（m-依存過程の α-混合）**  
> 狭義定常な m-依存過程では
>
$$
\boxed{
\alpha(n)=0
\qquad(n\ge m+1)
}.
$$
>
> 従って m-依存過程は α-混合的であり、エルゴード的です。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$n\ge m+1$ なら、m-依存性の定義により

$$
\mathcal F_{-\infty}^{0}
$$

と

$$
\mathcal F_n^\infty
$$

は独立です。従って任意の

$$
A\in\mathcal F_{-\infty}^{0},
\qquad
B\in\mathcal F_n^\infty
$$

について

$$
P(A\cap B)=P(A)P(B).
$$

上限を取って

$$
\alpha(n)=0.
$$

後半は [α-混合は混合性を含意する命題](#prop-tsa5-alpha-implies-mixing)と [混合性はエルゴード性を含意する命題](#prop-tsa5-mixing-ergodic)から従います。$\square$
<!-- proof-end -->

---

## 6. 標本自己共分散はいつ一致するか

母平均を $\mu=E[X_0]$ とし、固定ラグ $h\ge0$ に対して

$$
\widehat\gamma_n(h)
=
\frac1{n-h}
\sum_{t=1}^{n-h}
(X_t-\bar X_n)(X_{t+h}-\bar X_n)
$$

を考えます。

<a id="thm-tsa5-sample-autocovariance"></a>

<!-- formal-statement-start -->
> **定理（固定ラグ標本自己共分散の一致性）**  
> $(X_t)$ を狭義定常かつエルゴード的とし、
>
$$
E[X_0^2]<\infty
$$
>
> とします。任意の固定された整数 $h\ge0$ に対して
>
$$
\boxed{
\widehat\gamma_n(h)
\to
\gamma(h)
\qquad\text{a.s.}
}
$$
>
> が成立します。
<!-- formal-statement-end -->

### なぜ二次モーメントで十分か

積 $X_0X_h$ へ Birkhoff の定理を使いたいので、その可積分性を確認する必要があります。Cauchy--Schwarz の不等式と定常性から

$$
E|X_0X_h|
\le
(E[X_0^2]E[X_h^2])^{1/2}
=
E[X_0^2]
<
\infty.
$$

ここが二次モーメント仮定を使う場所です。

<!-- proof-start -->
### 証明

まず [定常エルゴード過程の大数則](#cor-tsa5-ergodic-lln)により

$$
\bar X_n\to\mu
\qquad\text{a.s.}
$$

です。

次に標準シフト上の可積分関数

$
g(\omega)=X_0(\omega)X_h(\omega)
$

へ [Birkhoff のエルゴード定理](#thm-tsa5-birkhoff)を適用します。すると

$$
\frac1{n-h}
\sum_{t=1}^{n-h}
X_tX_{t+h}
\to
E[X_0X_h]
\qquad\text{a.s.}
$$

を得ます。

同様に、$h$ は固定なので

$$
\frac1{n-h}\sum_{t=1}^{n-h}X_t
\to\mu,
$$

$$
\frac1{n-h}\sum_{t=1}^{n-h}X_{t+h}
\to\mu
$$

が a.s. に成立します。

標本自己共分散を展開すると

$$
\begin{aligned}
\widehat\gamma_n(h)
&=
\frac1{n-h}\sum_{t=1}^{n-h}X_tX_{t+h}\\
&\quad
-\bar X_n
\frac1{n-h}\sum_{t=1}^{n-h}X_t\\
&\quad
-\bar X_n
\frac1{n-h}\sum_{t=1}^{n-h}X_{t+h}
+\bar X_n^2.
\end{aligned}
$$

各項の極限を代入して

$$
\widehat\gamma_n(h)
\to
E[X_0X_h]-\mu^2
=
\gamma(h).
$$

$\square$
<!-- proof-end -->

この定理は **固定した $h$** に対する一致性です。$h=h_n\to\infty$ として多数のラグを同時に扱う場合や、スペクトル密度推定のようにラグ窓を広げる場合には、一様な誤差評価や、依存の減衰に関する追加仮定が必要です。

---

## 7. 標本平均の分散に残る系列相関

独立標本では、標本平均の分散は

$$
\frac{\gamma(0)}{n}
$$

です。従属系列では、異時点共分散も部分和分散へ蓄積します。

<a id="def-tsa5-long-run-variance"></a>

<!-- formal-statement-start -->
> **定義（長期分散）**  
> 二次定常過程 $(X_t)$ の自己共分散関数を $\gamma$ とし、
>
$$
\sum_{h\in\mathbb Z}|\gamma(h)|<\infty
$$
>
> とします。このとき
>
$$
\boxed{
\sigma_{\mathrm{LR}}^2
:=
\sum_{h\in\mathbb Z}\gamma(h)
=
\gamma(0)+2\sum_{h=1}^{\infty}\gamma(h)
}
$$
>
> を長期分散と呼びます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsa5-long-run-variance -->
**定義の確認**  
AR(1)：  
TSA4 の安定 AR(1)

$$
X_t=\phi X_{t-1}+Z_t,
\qquad
|\phi|<1
$$

では

$$
\gamma(h)
=
\frac{\sigma_Z^2}{1-\phi^2}
\phi^{|h|}.
$$

従って

$$
\begin{aligned}
\sigma_{\mathrm{LR}}^2
&=
\frac{\sigma_Z^2}{1-\phi^2}
\left(
1+2\sum_{h=1}^{\infty}\phi^h
\right)\\
&=
\frac{\sigma_Z^2}{1-\phi^2}
\frac{1+\phi}{1-\phi}\\
&=
\boxed{
\frac{\sigma_Z^2}{(1-\phi)^2}
}.
\end{aligned}
$$

$\phi>0$ なら正の系列相関により長期分散は大きくなり、$\phi<0$ なら交互符号の相関により小さくなります。
<!-- definition-example-end -->

<a id="prop-tsa5-long-run-variance"></a>

<!-- formal-statement-start -->
> **命題（部分和分散と長期分散）**  
> 平均0の二次定常過程が
>
$$
\sum_{h\in\mathbb Z}|\gamma(h)|<\infty
$$
>
> を満たすとします。部分和
>
$$
S_n=\sum_{t=1}^nX_t
$$
>
> に対して
>
$$
\boxed{
\frac1n\operatorname{Var}(S_n)
\to
\sigma_{\mathrm{LR}}^2
}.
$$
>
> さらに TSA3 の規約でスペクトル密度 $f$ が
>
$$
f(\lambda)
=
\frac1{2\pi}
\sum_{h\in\mathbb Z}
\gamma(h)e^{-ih\lambda}
$$
>
> と表されるとき、
>
$$
\boxed{
\sigma_{\mathrm{LR}}^2
=
2\pi f(0)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

定常性から

$$
\begin{aligned}
\operatorname{Var}(S_n)
&=
\sum_{s=1}^n\sum_{t=1}^n
\gamma(t-s)\\
&=
n\gamma(0)
+
2\sum_{h=1}^{n-1}(n-h)\gamma(h).
\end{aligned}
$$

従って

$$
\frac1n\operatorname{Var}(S_n)
=
\gamma(0)
+
2\sum_{h=1}^{n-1}
\left(1-\frac hn\right)\gamma(h).
$$

各固定 $h$ について係数は 1 へ収束し、

$$
\left|
\left(1-\frac hn\right)\gamma(h)
\right|
\le
|\gamma(h)|.
$$

自己共分散が絶対可算和可能なので、級数版の優収束により

$$
\frac1n\operatorname{Var}(S_n)
\to
\gamma(0)+2\sum_{h=1}^{\infty}\gamma(h)
=
\sigma_{\mathrm{LR}}^2.
$$

また $\lambda=0$ をスペクトル密度の Fourier 級数へ代入すると

$$
f(0)
=
\frac1{2\pi}
\sum_{h\in\mathbb Z}\gamma(h),
$$

従って

$$
\sigma_{\mathrm{LR}}^2=2\pi f(0).
$$

$\square$
<!-- proof-end -->

**低周波が推測誤差を支配する**という事実がここに現れます。標本平均は長い時間スケールの量なので、その漸近分散はスペクトル密度の 0 周波数値で決まります。

---

## 8. 因果線形過程の標準化部分和

一般の従属中心極限定理をいきなり黒箱として置く前に、TSA4 から直接使える重要なクラスでは証明を閉じます。

$(Z_t)$ を独立同分布で

$$
E[Z_0]=0,
\qquad
E[Z_0^2]=\sigma_Z^2<\infty
$$

とし、

$$
X_t
=
\sum_{j=0}^{\infty}\psi_jZ_{t-j},
\qquad
\sum_{j=0}^{\infty}|\psi_j|<\infty
$$

とします。

絶対可算和可能性と $E|Z_0|<\infty$ から

$$
E\left[
\sum_{j=0}^{\infty}
|\psi_jZ_{t-j}|
\right]
=
E|Z_0|
\sum_{j=0}^{\infty}|\psi_j|
<
\infty.
$$

従って級数は a.s. 絶対収束する版を持ち、$(X_t)$ は 独立同分布雑音列の現在・過去の可測関数として実現できます。このため狭義定常であり、独立同分布シフトのエルゴード性を因子として受け継ぎます。

<a id="thm-tsa5-linear-process-clt"></a>

<!-- formal-statement-start -->
> **定理（絶対可算和可能な因果線形過程の中心極限定理）**  
> $(Z_t)_{t\in\mathbb Z}$ を独立同分布で
>
$$
E[Z_0]=0,
\qquad
\operatorname{Var}(Z_0)=\sigma_Z^2<\infty
$$
>
> とします。
>
$$
X_t
=
\sum_{j=0}^{\infty}\psi_jZ_{t-j},
\qquad
\sum_{j=0}^{\infty}|\psi_j|<\infty
$$
>
> とし、
>
$$
\Psi
:=
\sum_{j=0}^{\infty}\psi_j
$$
>
> と置きます。このとき
>
$$
\boxed{
\frac1{\sqrt n}
\sum_{t=1}^nX_t
\Rightarrow
N(0,\sigma_Z^2\Psi^2)
}.
$$
>
> 右辺の分散が 0 の場合は 0 への退化分布を意味します。
<!-- formal-statement-end -->

### 証明の見取り図

1. まず有限移動平均
   $$
   X_t^{(q)}
   =
   \sum_{j=0}^{q}\psi_jZ_{t-j}
   $$
   へ切ります。
2. 有限移動平均の部分和は、端点の有限個の項を除けば
   $$
   \Psi_q\sum Z_t
   $$
   です。
3. 独立同分布中心極限定理を適用します。
4. 無限尾部は
   $$
   \sum_{j>q}|\psi_j|
   $$
   で一様に抑え、最後に $q\to\infty$ とします。

<!-- proof-start -->
### 証明

$$
\Psi_q:=\sum_{j=0}^{q}\psi_j
$$

と置き、

$$
X_t^{(q)}
=
\sum_{j=0}^{q}\psi_jZ_{t-j}
$$

とします。

固定した $q$ に対し、

$$
\sum_{t=1}^nX_t^{(q)}
$$

の内部に現れる $Z_s$ のうち端点から $q$ 以上離れたものの係数は全て $\Psi_q$ です。従って

$$
\sum_{t=1}^nX_t^{(q)}
=
\Psi_q\sum_{t=1}^nZ_t
+
R_{n,q},
$$

と書け、$R_{n,q}$ は左右端点に由来する高々 $2q$ 個程度の独立雑音の有限線形結合です。$q$ を固定すれば、その係数は $n$ に依存せず有界なので

$$
E[R_{n,q}^2]
\le
C_q
$$

となる定数 $C_q<\infty$ が存在します。従って

$$
\frac{R_{n,q}}{\sqrt n}
\xrightarrow{L^2}
0.
$$

[独立同分布有限分散中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)より

$$
\frac1{\sqrt n}\sum_{t=1}^nZ_t
\Rightarrow
N(0,\sigma_Z^2).
$$

よって固定 $q$ について

$$
\frac1{\sqrt n}
\sum_{t=1}^nX_t^{(q)}
\Rightarrow
N(0,\sigma_Z^2\Psi_q^2).
$$

次に無限尾部を制御します。

$$
D_t^{(q)}
:=
X_t-X_t^{(q)}
=
\sum_{j>q}\psi_jZ_{t-j}.
$$

$$
c_t
=
\frac1{\sqrt n}\mathbf 1_{\{1,\dots,n\}}(t),
\qquad
b_j
=
\psi_j\mathbf 1_{\{j>q\}}
$$

と置くと、

$$
\frac1{\sqrt n}\sum_{t=1}^nD_t^{(q)}
$$

は独立雑音 $(Z_s)$ の線形結合で、その係数列を $a=(a_s)$ と書けば

$$
a_s
=
\sum_j b_j c_{s+j}
$$

です。従って $\ell^2$ の三角不等式から

$$
\|a\|_2
\le
\sum_j|b_j|\,
\|c_{\cdot-j}\|_2
=
\|b\|_1\|c\|_2
$$

と直接得られます。ここで

$$
\|c\|_2=1.
$$

独立性と中心化により異なる $Z_s$ の交差項は消えるので、

$$
E\left|
\frac1{\sqrt n}\sum_{t=1}^nD_t^{(q)}
\right|^2
\le
\sigma_Z^2
\left(
\sum_{j>q}|\psi_j|
\right)^2.
$$

右辺は $n$ に依存せず、$q\to\infty$ で 0 です。

最後に特性関数で近似を閉じます。任意の $u\in\mathbb R$ に対し

$$
|e^{ix}-e^{iy}|
\le
|x-y|
$$

なので Cauchy--Schwarz と上の二乗平均評価から

$$
\begin{aligned}
&
\left|
E\exp\left(
iu\frac1{\sqrt n}\sum_{t=1}^nX_t
\right)
-
E\exp\left(
iu\frac1{\sqrt n}\sum_{t=1}^nX_t^{(q)}
\right)
\right|
\\
&\le
|u|\sigma_Z
\sum_{j>q}|\psi_j|.
\end{aligned}
$$

まず $n\to\infty$ とすると、固定 $q$ について [独立同分布有限分散中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から得た上の収束により、第二の特性関数は

$$
\exp\left(
-\frac12u^2\sigma_Z^2\Psi_q^2
\right)
$$

へ収束します。

さらに $q\to\infty$ で

$$
\Psi_q\to\Psi,
\qquad
\sum_{j>q}|\psi_j|\to0
$$

なので、極限特性関数は

$$
\exp\left(
-\frac12u^2\sigma_Z^2\Psi^2
\right).
$$

[Lévy連続性定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity)により

$$
\frac1{\sqrt n}\sum_{t=1}^nX_t
\Rightarrow
N(0,\sigma_Z^2\Psi^2).
$$

$\square$
<!-- proof-end -->

### 8.1 長期分散との一致

線形過程では

$$
\gamma(h)
=
\sigma_Z^2
\sum_{j\ge0}\psi_j\psi_{j+|h|}
$$

と書けます。絶対可算和可能性により二重和の順序交換が許され、

$$
\sum_{h\in\mathbb Z}\gamma(h)
=
\sigma_Z^2
\left(
\sum_{j\ge0}\psi_j
\right)^2
=
\sigma_Z^2\Psi^2.
$$

従って中心極限定理に現れる分散は、直前に定義した長期分散そのものです。

### 8.2 因果 ARMA への適用

TSA4 の [ARMA の因果性](../TSA4/index.md#thm-tsa4-arma-causality)では、AR 多項式の零点が閉単位円板の外にあるとき

$$
X_t
=
\sum_{j=0}^{\infty}\psi_jZ_{t-j},
\qquad
\sum_j|\psi_j|<\infty
$$

を得ました。

TSA4 では $(Z_t)$ を弱ホワイトノイズとしていましたが、ここでさらに各 $Z_t$ が互いに独立で同じ分布に従うと仮定すれば本定理を適用できます。

伝達関数は

$$
\Psi(z)=\frac{\theta(z)}{\phi(z)}
$$

なので

$$
\Psi(1)=\frac{\theta(1)}{\phi(1)}.
$$

従って

$$
\boxed{
\sqrt n\,\bar X_n
\Rightarrow
N\left(
0,
\sigma_Z^2
\left(
\frac{\theta(1)}{\phi(1)}
\right)^2
\right)
}
$$

です。

一方 TSA4 の [ARMA のスペクトル密度](../TSA4/index.md#thm-tsa4-arma-frequency-density)から

$$
2\pi f_X(0)
=
\sigma_Z^2
\left(
\frac{\theta(1)}{\phi(1)}
\right)^2.
$$

時間領域の部分和、フィルタ係数の総和、0 周波数でのスペクトル密度値が同じ長期分散を表しています。

---

## 9. 一般の短距離依存下での正規極限

線形過程ではフィルタ構造を直接使って中心極限定理を証明できました。しかし非線形時系列では、線形係数 $(\psi_j)$ がありません。そこで依存の強さそのものを α-混合係数で制御します。

<a id="thm-tsa5-alpha-mixing-clt"></a>

<!-- formal-statement-start -->
> **定理（α-混合過程の中心極限定理）**  
> 以下は、時系列解析でよく用いられる代表的な十分条件です。  
> $(X_t)_{t\in\mathbb Z}$ を実数値・狭義定常・平均0の α-混合過程とします。ある $\delta>0$ が存在して
>
$$
E|X_0|^{2+\delta}<\infty
$$
>
> および
>
$$
\boxed{
\sum_{n=1}^{\infty}
\alpha(n)^{\delta/(2+\delta)}
<
\infty
}
$$
>
> を満たすとします。このとき自己共分散級数は絶対収束し、
>
$$
\sigma_{\mathrm{LR}}^2
=
\sum_{h\in\mathbb Z}\gamma(h)
$$
>
> が有限に定まります。
>
> さらに
>
$$
\sigma_{\mathrm{LR}}^2>0
$$
>
> なら
>
$$
\boxed{
\frac1{\sqrt n\,\sigma_{\mathrm{LR}}}
\sum_{t=1}^nX_t
\Rightarrow
N(0,1)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**本章では以下を意図的な技術的入力として扱います。**

この一般形の完全証明には、α-混合に対する共分散不等式、長いブロックと短い隙間へ分割するブロック分割法（blocking argument）、離れたブロックを独立化して比較する誤差評価、高次モーメントを制御する近似を組み合わせる必要があります。

本章ではその全技術を一般形で展開せず、**仮定と適用範囲を明示した標準的な十分条件**として使います。

ただし、従属中心極限定理の核心が完全な黒箱にならないよう、直前の [絶対可算和可能な因果線形過程の中心極限定理](#thm-tsa5-linear-process-clt)では、独立同分布中心極限定理への有限打切りと一様な尾部評価を用いて完全証明しました。

また、ここでは次の評価も技術的入力として用います。

$$
|\gamma(h)|
\le
C
\|X_0\|_{2+\delta}^2
\alpha(h)^{\delta/(2+\delta)}.
$$

この評価と仮定した級数収束から、自己共分散の絶対可算和可能性が従います。
<!-- proof-end -->

#### 9.1 「エルゴード的なら中心極限定理」ではない

エルゴード性は Birkhoff の定理によって大数則を与えます。しかしそれだけで

$$
\sqrt n(\bar X_n-\mu)
$$

が正規極限を持つとは限りません。

中心極限定理には、

- 依存が十分速く減衰すること、
- ある程度の高次モーメントがあること、
- 長期分散が有限かつ非退化であること、

などの追加条件が必要です。

### 9.2 弱ホワイトノイズでも中心極限定理は保証されない

TSA1 の弱ホワイトノイズは「異時点共分散が 0」という二次構造の条件です。独立性やエルゴード性は要求しません。

独立な標準正規列 $(\varepsilon_t)$ と、それら全体から独立な確率変数 $Y$ を取り、

$$
P(Y=1)=P(Y=2)=\frac12
$$

とします。そして

$$
X_t=Y\varepsilon_t
$$

と置きます。

このとき

$$
E[X_t]=0,
$$

$$
E[X_t^2]
=
E[Y^2]
=
\frac52,
$$

また $s\neq t$ では

$$
E[X_sX_t]
=
E[Y^2]E[\varepsilon_s\varepsilon_t]
=
0.
$$

従って $(X_t)$ は弱ホワイトノイズです。

しかし任意の $n$ で

$$
\frac1{\sqrt n}\sum_{t=1}^nX_t
=
Y
\left(
\frac1{\sqrt n}
\sum_{t=1}^n\varepsilon_t
\right).
$$

括弧内は正確に $N(0,1)$ なので、その分布は全ての $n$ で

$$
\frac12N(0,1)
+
\frac12N(0,4)
$$

という正規分布の混合です。

これは単一の

$$
N\left(0,\frac52\right)
$$

ではありません。例えば第四モーメントは

$$
\frac12\cdot3
+
\frac12\cdot3\cdot16
=
\frac{51}{2},
$$

一方 $N(0,5/2)$ の第四モーメントは

$$
3\left(\frac52\right)^2
=
\frac{75}{4}
$$

で一致しません。

**無相関であることだけでは従属中心極限定理の仮定にならない**ことが、この例ではっきり分かります。

---

# 演習

## TSA5-A01 定常だが非エルゴードな過程

- Level: A
- 目安時間: 15分

$Y$ を

$$
P(Y=0)=P(Y=2)=\frac12
$$

とする確率変数とし、

$$
X_t=Y
\qquad(t\in\mathbb Z)
$$

とする。

1. $(X_t)$ が狭義定常であることを示せ。
2. 事象 $A=\{X_0=0\}$ がシフト不変であることを示せ。
3. $(X_t)$ がエルゴード的でないことを示せ。
4. $\bar X_n$ を求め、$E[X_0]$ へ a.s. 収束しないことを確認せよ。

<!-- solution-start -->
### 詳細解答

1. 任意の $t_1,\dots,t_m$ と $h$ に対して

   $$
   (X_{t_1+h},\dots,X_{t_m+h})
   =
   (Y,\dots,Y)
   =
   (X_{t_1},\dots,X_{t_m})
   $$

   が標本ごとに成立します。従って任意の有限個の時点の同時分布は時間移動で不変であり、狭義定常です。

2. $X_t=Y$ は全時点で同じなので

   $$
   T^{-1}A
   =
   \{X_1=0\}
   =
   \{Y=0\}
   =
   A.
   $$

3. $A$ は不変事象ですが

   $$
   P(A)=\frac12
   $$

   です。0 でも 1 でもないため、エルゴード性の定義に反します。

4.

   $$
   \bar X_n
   =
   \frac1n\sum_{t=1}^nY
   =
   Y.
   $$

   一方

   $$
   E[X_0]=E[Y]=1.
   $$

   $Y$ は 0 または 2 なので

   $$
   P\left(
   \lim_{n\to\infty}\bar X_n=1
   \right)
   =
   0.
   $$

   定常性だけでは時間平均が母平均へ近づかない具体例です。
<!-- solution-end -->

## TSA5-A02 平均エルゴード定理の望遠鏡和

- Level: A
- 目安時間: 18分

$T$ を測度保存シフト、$Uf=f\circ T$ とする。$g\in L^2$ に対し

$$
f=(I-U)g
$$

と置く。

1. $A_nf$ を望遠鏡和で計算せよ。
2. $\|A_nf\|_2$ を評価し、0 へ収束することを示せ。
3. この計算が $\overline{\operatorname{Ran}(I-U)}$ 全体へ延長できる理由を説明せよ。
4. エルゴード的な場合、$X_0\in L^2$ の時間平均の $L^2$ 極限を答えよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   \begin{aligned}
   A_nf
   &=
   \frac1n\sum_{k=0}^{n-1}U^k(I-U)g\\
   &=
   \frac1n
   \sum_{k=0}^{n-1}
   (U^kg-U^{k+1}g)\\
   &=
   \boxed{
   \frac{g-U^ng}{n}
   }.
   \end{aligned}
   $$

2. $U$ はユニタリなので $\|U^ng\|_2=\|g\|_2$ です。従って

   $$
   \|A_nf\|_2
   \le
   \frac{\|g\|_2+\|U^ng\|_2}{n}
   =
   \frac{2\|g\|_2}{n}
   \to0.
   $$

3. 各 $A_n$ は

   $$
   \|A_n\|
   \le1
   $$

   を満たします。$f_m\in\operatorname{Ran}(I-U)$ が $f_m\to f$ in $L^2$ を満たすとき、

   $$
   \|A_nf\|_2
   \le
   \|A_n(f-f_m)\|_2+\|A_nf_m\|_2
   \le
   \|f-f_m\|_2+\|A_nf_m\|_2.
   $$

   先に $n\to\infty$、次に $m\to\infty$ とすれば 0 です。従って閉包全体へ延長できます。

4. エルゴード性の下では固定点空間は定数関数だけなので、

   $$
   \boxed{
   \frac1n\sum_{t=0}^{n-1}X_t
   \xrightarrow{L^2}
   E[X_0]
   }.
   $$
<!-- solution-end -->

## TSA5-A03 独立同分布雑音から作る MA(2) の混合性

- Level: A
- 目安時間: 18分

$(Z_t)$ を独立同分布列とし、

$$
X_t
=
Z_t+aZ_{t-1}+bZ_{t-2}
$$

とする。

1. $(X_t)$ が 2 依存であることを示せ。
2. $\alpha(n)$ を $n\ge3$ について求めよ。
3. $(X_t)$ がエルゴード的であることを示せ。
4. 駆動列が「弱ホワイトノイズ」であることしか分からない場合、同じ結論を出してよいか説明せよ。

<!-- solution-start -->
### 詳細解答

1. $t\le k$ に対する $X_t$ は $Z_s$ with $s\le k$ だけから作られます。

   一方、$t\ge k+3$ に対する $X_t$ は

   $$
   Z_t,Z_{t-1},Z_{t-2}
   $$

   を使うので、最小添字は $k+1$ です。従って未来側は $Z_s$ with $s\ge k+1$ だけから作られます。

   二つの雑音族は独立なので

   $$
   \sigma(X_t:t\le k)
   \perp
   \sigma(X_t:t\ge k+3).
   $$

   よって 2 依存です。

2. 2 依存過程では過去と 3 時点以上先の未来が独立なので

   $$
   \boxed{
   \alpha(n)=0
   \qquad(n\ge3)
   }.
   $$

3. $\alpha(n)\to0$ なので α-混合的です。[α-混合は混合性を含意する命題](#prop-tsa5-alpha-implies-mixing)と [混合性はエルゴード性を含意する命題](#prop-tsa5-mixing-ergodic)からエルゴード的です。

4. いいえ。弱ホワイトノイズは異時点で無相関であることしか保証しません。m-依存性の証明では、互いに素な雑音集合が生成する $\sigma$-加法族の **独立性**を使いました。無相関だけではこの段階を正当化できません。
<!-- solution-end -->

## TSA5-A04 固定ラグ標本自己共分散の一致性

- Level: A
- 目安時間: 20分

$(X_t)$ を狭義定常・エルゴード的とし、

$$
E[X_0^2]<\infty
$$

とする。固定 $h\ge0$ に対し、

$$
\widetilde\gamma_n(h)
=
\frac1{n-h}
\sum_{t=1}^{n-h}
(X_t-\mu)(X_{t+h}-\mu),
\qquad
\mu=E[X_0]
$$

と置く。

1. $(X_t-\mu)(X_{t+h}-\mu)$ が可積分であることを示せ。
2. Birkhoff の定理を使って $\widetilde\gamma_n(h)\to\gamma(h)$ a.s. を示せ。
3. $\mu$ を $\bar X_n$ に置き換えた通常の標本自己共分散でも同じ極限になる理由を説明せよ。

<!-- solution-start -->
### 詳細解答

1. Cauchy--Schwarz の不等式と定常性から

   $$
   \begin{aligned}
   E\left|
   (X_0-\mu)(X_h-\mu)
   \right|
   &\le
   \left(
   E[(X_0-\mu)^2]
   E[(X_h-\mu)^2]
   \right)^{1/2}\\
   &=
   \gamma(0)
   <
   \infty.
   \end{aligned}
   $$

2. 標準シフト上の関数

   $$
   g(\omega)
   =
   (X_0(\omega)-\mu)(X_h(\omega)-\mu)
   $$

   は可積分です。Birkhoff の定理とエルゴード性から

   $$
   \frac1{n-h}
   \sum_{t=1}^{n-h}
   g\circ T^t
   \to
   E[g]
   =
   \gamma(h)
   $$

   a.s. です。左辺は $\widetilde\gamma_n(h)$ なので結論が従います。

3. [定常エルゴード過程の大数則](#cor-tsa5-ergodic-lln)から

   $$
   \bar X_n\to\mu
   \qquad\text{a.s.}
   $$

   です。標本自己共分散を展開すると、$\widetilde\gamma_n(h)$ との差は $\bar X_n-\mu$ と固定ラグの標本平均から作られる項だけです。それらは全て 0 へ収束するため、通常の標本自己共分散も

   $$
   \widehat\gamma_n(h)\to\gamma(h)
   $$

   a.s. です。
<!-- solution-end -->

## TSA5-B01 AR(1) の長期分散を三通りで読む

- Level: B
- 目安時間: 30分

$$
X_t=\phi X_{t-1}+Z_t,
\qquad
|\phi|<1
$$

とし、$(Z_t)$ は独立同分布、平均0、分散 $\sigma_Z^2$ とする。

1. 自己共分散の和から $\sigma_{\mathrm{LR}}^2$ を求めよ。
2. 因果フィルタ係数 $\psi_j=\phi^j$ の総和から同じ値を求めよ。
3. TSA4 のスペクトル密度から $2\pi f_X(0)$ を求め、1, 2 と一致することを示せ。
4. $\phi=0.8$ と $\phi=-0.8$ では、同じ $\gamma(0)$ に対しどちらの標本平均の漸近分散が大きいか説明せよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   \gamma(h)
   =
   \frac{\sigma_Z^2}{1-\phi^2}\phi^{|h|}
   $$

   なので

   $$
   \begin{aligned}
   \sigma_{\mathrm{LR}}^2
   &=
   \frac{\sigma_Z^2}{1-\phi^2}
   \left(
   1+2\sum_{h=1}^{\infty}\phi^h
   \right)\\
   &=
   \frac{\sigma_Z^2}{1-\phi^2}
   \left(
   1+\frac{2\phi}{1-\phi}
   \right)\\
   &=
   \boxed{
   \frac{\sigma_Z^2}{(1-\phi)^2}
   }.
   \end{aligned}
   $$

2. 因果係数の総和は

   $$
   \Psi
   =
   \sum_{j=0}^{\infty}\phi^j
   =
   \frac1{1-\phi}.
   $$

   線形過程の長期分散は

   $$
   \sigma_Z^2\Psi^2
   =
   \boxed{
   \frac{\sigma_Z^2}{(1-\phi)^2}
   }.
   $$

3. TSA4 より

   $$
   f_X(\lambda)
   =
   \frac{\sigma_Z^2}{2\pi}
   \frac1{1+\phi^2-2\phi\cos\lambda}.
   $$

   $\lambda=0$ では

   $$
   f_X(0)
   =
   \frac{\sigma_Z^2}{2\pi(1-\phi)^2}.
   $$

   従って

   $$
   2\pi f_X(0)
   =
   \boxed{
   \frac{\sigma_Z^2}{(1-\phi)^2}
   }.
   $$

4. 同じ $\gamma(0)$ に固定して比較すると

   $$
   \frac{\sigma_{\mathrm{LR}}^2}{\gamma(0)}
   =
   \frac{1+\phi}{1-\phi}.
   $$

   $\phi=0.8$ では比は $9$、$\phi=-0.8$ では $1/9$ です。正の系列相関は標本平均の有効情報量を減らし、負の系列相関は平均の揺らぎを相殺します。
<!-- solution-end -->

## TSA5-B02 有限移動平均の中心極限定理を端点補正項から導く

- Level: B
- 目安時間: 30分

$(Z_t)$ を独立同分布、平均0、分散 $\sigma_Z^2$ とし、

$$
X_t=Z_t+\theta Z_{t-1}
$$

とする。

1. $\sum_{t=1}^nX_t$ を $(1+\theta)\sum_{t=1}^nZ_t$ と端点補正項の和に分解せよ。
2. 端点補正項を $\sqrt n$ で割ると $L^2$ で 0 へ収束することを示せ。
3. [独立同分布有限分散中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から
   $$
   \frac1{\sqrt n}\sum_{t=1}^nX_t
   $$
   の極限分布を求めよ。
4. 長期分散を自己共分散から計算し、極限分散と一致することを確認せよ。

<!-- solution-start -->
### 詳細解答

1.

   $$
   \begin{aligned}
   \sum_{t=1}^nX_t
   &=
   \sum_{t=1}^nZ_t
   +
   \theta\sum_{t=1}^nZ_{t-1}\\
   &=
   \sum_{t=1}^nZ_t
   +
   \theta
   \left(
   Z_0+\sum_{t=1}^{n-1}Z_t
   \right).
   \end{aligned}
   $$

   これを $(1+\theta)\sum_{t=1}^nZ_t$ と比較すると

   $$
   \boxed{
   \sum_{t=1}^nX_t
   =
   (1+\theta)\sum_{t=1}^nZ_t
   +
   \theta(Z_0-Z_n)
   }.
   $$

2. 独立性から

   $$
   E[(Z_0-Z_n)^2]
   =
   2\sigma_Z^2.
   $$

   従って

   $$
   E\left[
   \left|
   \frac{\theta(Z_0-Z_n)}{\sqrt n}
   \right|^2
   \right]
   =
   \frac{2\theta^2\sigma_Z^2}{n}
   \to0.
   $$

3. [独立同分布有限分散中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)より

   $$
   \frac1{\sqrt n}\sum_{t=1}^nZ_t
   \Rightarrow
   N(0,\sigma_Z^2).
   $$

   端点補正項は $L^2$ で 0 へ収束し、その特性関数への影響も 0 になるので

   $$
   \boxed{
   \frac1{\sqrt n}\sum_{t=1}^nX_t
   \Rightarrow
   N(0,\sigma_Z^2(1+\theta)^2)
   }.
   $$

4. MA(1) の自己共分散は

   $$
   \gamma(0)
   =
   \sigma_Z^2(1+\theta^2),
   $$

   $$
   \gamma(1)=\gamma(-1)=\theta\sigma_Z^2,
   $$

   それ以外は 0 です。従って

   $$
   \begin{aligned}
   \sigma_{\mathrm{LR}}^2
   &=
   \gamma(0)+2\gamma(1)\\
   &=
   \sigma_Z^2(1+\theta^2+2\theta)\\
   &=
   \boxed{
   \sigma_Z^2(1+\theta)^2
   }.
   \end{aligned}
   $$

   中心極限定理の極限分散と一致します。
<!-- solution-end -->

## TSA5-B03 弱ホワイトノイズでも中心極限定理が壊れる

- Level: B
- 目安時間: 28分

$(\varepsilon_t)$ を独立同分布な標準正規列とし、それらから独立な $Y$ が

$$
P(Y=1)=P(Y=2)=\frac12
$$

を満たすとする。

$$
X_t=Y\varepsilon_t
$$

と置く。

1. $(X_t)$ が狭義定常であることを示せ。
2. $(X_t)$ が平均0、異時点共分散0の弱ホワイトノイズであることを示せ。
3. $n^{-1/2}\sum_{t=1}^nX_t$ の分布を求めよ。
4. その分布が $N(0,E[Y^2])$ へ収束しないことを第四モーメントで確認せよ。
5. この例から「弱ホワイトノイズ」「独立雑音」「α-混合」を区別して説明せよ。

<!-- solution-start -->
### 詳細解答

1. 条件付きで $Y=y$ と固定すると $(X_t)$ は独立同分布な $N(0,y^2)$ 列です。$Y$ を混合した後も任意の有限個の時点の同時分布は時間添字の平行移動で変わらないので、狭義定常です。

2.

   $$
   E[X_t]
   =
   E[Y]E[\varepsilon_t]
   =
   0.
   $$

   また

   $$
   E[X_t^2]
   =
   E[Y^2]E[\varepsilon_t^2]
   =
   \frac{1^2+2^2}{2}
   =
   \frac52.
   $$

   $s\neq t$ なら

   $$
   E[X_sX_t]
   =
   E[Y^2]E[\varepsilon_s\varepsilon_t]
   =
   0.
   $$

   従って分散 $5/2$ の弱ホワイトノイズです。

3.

   $$
   \frac1{\sqrt n}\sum_{t=1}^nX_t
   =
   Y
   \frac1{\sqrt n}\sum_{t=1}^n\varepsilon_t.
   $$

   正規分布の和より括弧内は全ての $n$ で $N(0,1)$ です。従って分布は

   $$
   \boxed{
   \frac12N(0,1)+\frac12N(0,4)
   }
   $$

   で、$n$ に依存しません。

4. この混合分布の第四モーメントは

   $$
   \frac12\cdot3(1)^2
   +
   \frac12\cdot3(4)^2
   =
   \frac{51}{2}.
   $$

   一方、同じ分散 $5/2$ を持つ正規分布の第四モーメントは

   $$
   3\left(\frac52\right)^2
   =
   \frac{75}{4}.
   $$

   両者は異なるので、混合分布は $N(0,5/2)$ ではありません。従って通常の単一正規極限は成立しません。

5. 弱ホワイトノイズは **二次共分散が消えるだけ**です。この例では全時点が共通尺度 $Y$ を共有しています。

   独立雑音なら異なる時点の $\sigma$-加法族自体が独立です。α-混合なら完全独立でなくても、時間間隔を広げるとその依存の上限が 0 へ減衰します。

   この例の共通尺度 $Y$ はどれだけ時間を離しても消えないため、弱ホワイトノイズであることから独立性や α-混合性を推論してはいけません。
<!-- solution-end -->

## TSA5-C01 因果 ARMA の大数則・中心極限定理・ゼロ周波数を統合する

- Level: C
- 目安時間: 45分

実係数の因果 ARMA$(p,q)$

$$
\phi(B)X_t=\theta(B)Z_t
$$

を考える。$\phi(z)\neq0$ for $|z|\le1$ とし、$(Z_t)$ は独立同分布、平均0、分散 $\sigma_Z^2\in(0,\infty)$ とする。

1. TSA4 の因果性定理から
   $$
   X_t=\sum_{j\ge0}\psi_jZ_{t-j},
   \qquad
   \sum_{j\ge0}|\psi_j|<\infty
   $$
   を得る理由を説明せよ。
2. この因果表示から $(X_t)$ が狭義定常かつエルゴード的になる理由を説明せよ。
3. 標本平均の a.s. 極限を求めよ。
4. $\sqrt n\,\bar X_n$ の極限分布を求めよ。
5. 極限分散を $\theta(1),\phi(1)$ で表し、さらに $2\pi f_X(0)$ と一致することを示せ。
6. 駆動列に「弱ホワイトノイズ」しか仮定しない場合、どの段階が正当化できなくなるか説明せよ。

<!-- solution-start -->
### 詳細解答

1. [TSA4 の ARMA の因果性](../TSA4/index.md#thm-tsa4-arma-causality)より、AR 多項式が閉単位円板に零点を持たなければ

   $$
   \frac{\theta(z)}{\phi(z)}
   =
   \sum_{j=0}^{\infty}\psi_jz^j
   $$

   の係数は絶対可算和可能です。従って

   $$
   \boxed{
   X_t
   =
   \sum_{j=0}^{\infty}\psi_jZ_{t-j}
   }
   $$

   が $L^2$ で成立します。

2. $E|Z_0|<\infty$ と $\sum_j|\psi_j|<\infty$ から

   $$
   \sum_j|\psi_jZ_{t-j}|<\infty
   \qquad\text{a.s.}
   $$

   となる版を取れます。従って $X_t$ は 独立同分布列の現在・過去の可測関数です。

   独立同分布経路シフトは混合的、従ってエルゴード的です。因果写像は時間シフトと可換なので、$X$ の不変事象を 独立同分布経路空間へ引き戻すと 独立同分布シフトの不変事象になります。その確率は 0 または 1 です。

   よって $(X_t)$ は狭義定常かつエルゴード的です。

3. $E[X_t]=0$ なので [定常エルゴード過程の大数則](#cor-tsa5-ergodic-lln)から

   $$
   \boxed{
   \bar X_n\to0
   \qquad\text{a.s.}
   }.
   $$

4. [絶対可算和可能な因果線形過程の中心極限定理](#thm-tsa5-linear-process-clt)から

   $$
   \sqrt n\,\bar X_n
   \Rightarrow
   N(0,\sigma_Z^2\Psi^2),
   $$

   ただし

   $$
   \Psi=\sum_{j\ge0}\psi_j.
   $$

5. べき級数を $z=1$ で評価できるので

   $$
   \Psi
   =
   \frac{\theta(1)}{\phi(1)}.
   $$

   従って

   $$
   \boxed{
   \sqrt n\,\bar X_n
   \Rightarrow
   N\left(
   0,
   \sigma_Z^2
   \left(
   \frac{\theta(1)}{\phi(1)}
   \right)^2
   \right)
   }.
   $$

   TSA4 のスペクトル密度は

   $$
   f_X(\lambda)
   =
   \frac{\sigma_Z^2}{2\pi}
   \frac{
   |\theta(e^{-i\lambda})|^2
   }{
   |\phi(e^{-i\lambda})|^2
   }.
   $$

   $\lambda=0$ では $e^{-i\lambda}=1$ なので、実係数の場合

   $$
   \boxed{
   2\pi f_X(0)
   =
   \sigma_Z^2
   \left(
   \frac{\theta(1)}{\phi(1)}
   \right)^2
   }.
   $$

   これは中心極限定理の極限分散と一致します。

6. TSA4 の因果表示そのものは弱ホワイトノイズでも二次平均の意味で構成できます。しかし、

   - 独立同分布シフトの混合性・エルゴード性を引き継ぐ議論、
   - 独立同分布中心極限定理を有限打切りへ適用する議論、

   は使えません。

   従って弱ホワイトノイズという二次構造だけから、a.s. 大数則や上の中心極限定理を結論してはいけません。TSA5-B03 がその失敗を具体的に示しています。
<!-- solution-end -->

---

## 10. 本章のまとめ

本章で最も重要なのは、定常性・エルゴード性・混合性・中心極限定理の条件を一つに潰さないことです。

$$
\boxed{
\alpha\text{-混合}
\Longrightarrow
\text{混合的}
\Longrightarrow
\text{エルゴード的}
}
$$

ですが、逆向きは一般には成立しません。

また、

$$
\boxed{
\text{定常エルゴード}
+
L^1
\Longrightarrow
\bar X_n\to E[X_0]
\quad\text{a.s.}
}
$$

は Birkhoff の定理から従う一方、

$$
\boxed{
\sqrt n(\bar X_n-\mu)
\Rightarrow
N(0,\sigma_{\mathrm{LR}}^2)
}
$$

には追加の短距離依存条件が必要です。

短距離依存では長期分散

$$
\boxed{
\sigma_{\mathrm{LR}}^2
=
\sum_{h\in\mathbb Z}\gamma(h)
=
2\pi f(0)
}
$$

が標本平均の漸近分散を支配します。

因果 ARMA を 独立同分布雑音で駆動した場合には

$$
\boxed{
\sigma_{\mathrm{LR}}^2
=
\sigma_Z^2
\left(
\frac{\theta(1)}{\phi(1)}
\right)^2
}
$$

となり、

- 時間領域：自己共分散の総和、
- フィルタ領域：係数の総和の二乗、
- 周波数領域：0 周波数でのスペクトル密度値、

が同じ量として一致します。

## 次に進む

TSA6 では、観測できない状態を持つ線形 Gaussian 状態空間モデルへ進みます。予測誤差をイノベーションとして逐次更新し、Kalman フィルタ、誤差共分散の Riccati 再帰、予測・平滑化、ARMA の状態空間表現までを接続します。
