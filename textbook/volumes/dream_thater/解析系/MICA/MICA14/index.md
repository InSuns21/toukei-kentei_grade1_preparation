# MICA14 対角制限とHadamard subtraction

<!-- definition-example-audit: strict -->

[MICA13のHadamard波面集合条件](../MICA13/index.md#def-mica13-wfsc)を満たす二点分布は、局所的には[MICA12のHadamard parametrix](../MICA12/index.md#def-mica12-local-parametrix)に滑らかな関数を加えた形で表せます。では、量子場の「同じ点での二乗」を二点分布の $x=y$ への代入で求められるでしょうか。

答えは、そのままでは一般に求められません。二点分布は関数ではなく分布であり、しかもその波面方向は**対角線の余法束と衝突**します。一方、幾何学的に共通する特異部分を先に引けば、残りは滑らかになり、対角線へ制限できます。これが **Hadamard subtraction（Hadamard特異部分の減算）** と点分離の基本的な考え方です。

ここでいう状態の**期待値**は、[MICA11の正値状態と二点分布](../MICA11/index.md#def-mica11-two-point-conditions)が与える数です。[古典確率の期待値](../../F0/F0-00P2A/index.md#def-f0-00p2a-expectation)と同様に「状態に応じて量を評価する」役割を持ちますが、一般の量子状態を一つの古典確率変数の分布と同一視するわけではありません。

ここでは次の順に進みます。

1. 生の二点分布に対角引き戻し定理を使えない理由を、余接方向と平坦模型の両方で確認する。
2. 二状態の二点分布の差が滑らかになる理由を確認し、その対角値を構成する。
3. Wick平方の**期待値**を点分離で定義し、状態間の差を求める。
4. 長さスケールと有限な局所項を変えた場合を検算し、次章の応力テンソルへ接続する。

## 1. 生の二点分布は対角線で何が起きるか

舞台は時間向き付き、境界のない滑らかな4次元大域双曲Lorentz時空 $(M,g)$ です。計量の符号は $(-,+,+,+)$ とし、[MICA11で導入した実Klein–Gordon場](../MICA11/index.md#def-mica11-smeared-algebra)の作用素

$$
P=-\Box_g+m^2+\xi R,\qquad m\ge0,\quad\xi\in\mathbb R
$$

を固定します。[MICA11の二点分布の条件](../MICA11/index.md#def-mica11-two-point-conditions)を満たすHadamard状態 $\omega$ の二点分布を $\omega_2\in\mathcal D'(M\times M)$ と書きます。生の記号 $\omega_2(x,y)$ は、各点で通常の数値を持つという意味ではありません。

対角埋め込み $\Delta:M\to M\times M$ は $\Delta(x)=(x,x)$ です。接写像が $d\Delta_x(h)=(h,h)$ なので、余接ベクトル $(\alpha,\beta)$ が対角接方向をすべて消す条件は

$$
(\alpha,\beta)(h,h)=\alpha(h)+\beta(h)=0
\quad(\forall h\in T_xM),
$$

すなわち $\beta=-\alpha$ です。これは[MICA7の対角余法束](../MICA7/index.md#prop-mica7-diagonal-product)で計算したものです。

<a id="prop-mica14-diagonal-obstruction"></a>

<!-- formal-statement-start -->
> **命題（Hadamard二点分布の生の対角引き戻しの障害）**  
> 上記の $(M,g,P)$ に対し、二点分布 $\omega_2$ が[Hadamard波面集合条件](../MICA13/index.md#def-mica13-wfsc) $WF(\omega_2)=\mathcal C^+$ を満たすとする。対角埋め込みの非零余法束は

$$
N_\Delta=\{(x,k;x,-k):x\in M,\ k\in T_x^*M\setminus0\}
$$

> であり、

$$
WF(\omega_2)\cap N_\Delta
=\{(x,k;x,-k):k^\sharp\text{ は未来向き光的}\}
\ne\varnothing.
$$

> よって[MICA7の非特性的引き戻し定理](../MICA7/index.md#thm-mica7-pullback)の十分条件は満たされず、**この定理から** $\Delta^*\omega_2$ を定義することはできない。この不適用だけで、任意の特別な方法による制限の不可能性まで結論してはいけない。
<!-- formal-statement-end -->

### 証明の見取り図

余法束は二つの余接ベクトルがちょうど逆向きの組です。Hadamard条件では、同じ点を通る任意の未来向き零方向 $k$ に対して $(x,k;x,-k)$ が波面に入ります。二つの集合の共通部分を実際に書き下せば、引き戻し定理の仮定が破れたことが分かります。

<!-- proof-start -->
### 証明

先の接写像の計算から $(\alpha,\beta)\in N_\Delta$ の必要十分条件は $\alpha+\beta=0$ です。零でない組を取るため $\alpha=k\ne0$ とすれば、第一の表示を得ます。

[二点の未来向き零測地線関係](../MICA13/index.md#def-mica13-null-pair)では $x=y$ も許され、その点を通る零測地線の余接方向 $k$ を平行移動して同じ点へ戻せば $q=k$ です。従って

$$
(x,k;x,-k)\in \mathcal C^+
\quad\Longleftrightarrow\quad
k^\sharp\text{ は未来向き光的}.
$$

Hadamard条件 $WF(\omega_2)=\mathcal C^+$ を代入すると共通部分が命題の集合に一致します。Lorentz計量の各点には非零の未来向き光的ベクトルが存在するので、これは空ではありません。

[引き戻し定理](../MICA7/index.md#thm-mica7-pullback)の仮定 $WF(u)\cap N_f=\varnothing$ に $u=\omega_2$、$f=\Delta$ を入れると、左辺は今求めた非空集合です。ゆえに定理を適用できません。**十分条件の逆は主張していない**ので、結論は定理の不適用に限られます。
<!-- proof-end -->

### 直接計算：質量零Minkowski真空は空間的な点分離で発散する

抽象的な波面集合の判定とは独立に、明示的な発散も見ておきましょう。質量零Minkowski真空について、[MICA12の正周波数模型](../MICA12/index.md#prop-mica12-massless-boundary)は

$$
\omega_{2,0}(x,y)
=\frac{1}{4\pi^2\{|\boldsymbol x-\boldsymbol y|^2
-(t_x-t_y-i0)^2\}}.
$$

等時刻 $t_x=t_y$、空間距離 $r=|\boldsymbol x-\boldsymbol y|>0$ の場合だけなら、分布の特異支持の外で通常の関数値

$$
\omega_{2,0}(x,y)=\frac1{4\pi^2r^2}
\longrightarrow+\infty
\qquad(r\downarrow0)
$$

を計算できます。これは単に「対角で大きな値を取る」のではなく、**生の点ごとの対角値として有限な極限が存在しない**模型です。対角の直前で適切な減算をせずに値を代入してはいけません。波面の衝突は一般の曲がった時空での判定、$1/r^2$ は一つの具体的な失敗例です。

## 2. 特異部分を引いたあとの対角引き戻し

局所Hadamard形では、測地的凸正規近傍 $C\subset M$ の $C\times C$ 上で、幾何学と作用素 $P$ によって定まる全次数の局所Hadamard式 $H_{\ell,\infty}$ を使います。$\ell>0$ は長さスケールです。$H_{\ell,\infty}$ は**状態ではなく、二点分布に共通する特異部分の局所処方**です。

生の $\omega_2$ と $H_{\ell,\infty}$ はともに一般には対角で評価できません。したがって、それぞれを別々に「対角評価してから引く」手続きは避け、**二変数の分布として先に引き算**します。滑らかになった差を対角で評価する、という順序が重要です。

<a id="def-mica14-subtracted-remainder"></a>

<!-- formal-statement-start -->
> **定義（Hadamard subtraction後の対角余り）**  
> 4次元の測地的凸正規近傍 $C$、上記の $P$、局所Hadamard形を持つ $\omega_2|_{C\times C}$、[MICA12の全次数のHadamard式](../MICA12/index.md#def-mica12-local-parametrix) $H_{\ell,\infty}$ を同じ領域・同じ $P$・同じ尺度 $\ell$ で選ぶ。差が滑らかであることを確認したうえで

$$
F_{\omega,\ell}:=\omega_2|_{C\times C}-H_{\ell,\infty}
\in C^\infty(C\times C),
\qquad
Q_{\omega,\ell}:=\Delta^*F_{\omega,\ell}\in C^\infty(C)
$$

> と定める。関数として $Q_{\omega,\ell}(x)=F_{\omega,\ell}(x,x)$ である。有限次切断 $H_{\ell,N}$ で $H_{\ell,\infty}$ を置き換えたとき、余りが $C^\infty$ であるとは無条件には言えない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica14-subtracted-remainder -->
### 定義の確認：質量零平坦時空

**定義の確認**。質量零Minkowski真空では $U=1$、[MICA12の対数係数](../MICA12/index.md#prop-mica12-flat-mass)はすべて $v_n=0$ です。同じ $i0$ 規約で $H_{\ell,\infty}=1/(8\pi^2\sigma_+)=\omega_{2,0}$ なので、まず分布として差を取れば

$$
F_{0,\ell}=0\in C^\infty(C\times C),\qquad
Q_{0,\ell}(x)=0.
$$

ここでは差の滑らかさと対角値の両方を直接確認しました。一方、各項を別々に対角へ代入すれば前節の $1/r^2$ 発散に戻ってしまいます。
<!-- definition-example-end -->

<a id="prop-mica14-smooth-restriction"></a>

<!-- formal-statement-start -->
> **命題（滑らかな差の対角制限）**  
> 同じ4次元大域双曲時空、同じ実Klein–Gordon作用素 $P$ と因果伝播子 $E$ に対し、二つのHadamard二点分布 $\omega_{2,1},\omega_{2,2}$ が同じ交換子条件

$$
\omega_{2,j}-\omega_{2,j}^T=-iE\qquad(j=1,2)
$$

> を満たすとする。このとき $D=\omega_{2,1}-\omega_{2,2}$ は $M\times M$ 上滑らかであり、

$$
\Delta^*D\in C^\infty(M),\qquad
(\Delta^*D)(x)=D(x,x)
$$

> が一意に定まる。結果は局所座標系や点分離に用いた滑らかな曲線の取り方によらない。
<!-- formal-statement-end -->

### 証明の見取り図

二つのHadamard二点分布では交換子の反対称部分と未来向きの波面が共通しています。[MICA13の滑らかな差の命題](../MICA13/index.md#prop-mica13-smooth-difference)を適用すれば $WF(D)$ は空です。滑らかな関数に対する対角引き戻しは普通の合成で、$D(x,x)$ が定義できます。

<!-- proof-start -->
### 証明

両者は同じ $P,E$ と交換子条件を持ち、Hadamard性から $WF(\omega_{2,j})=\mathcal C^+$ です。従って[Hadamard二点分布の差の滑らかさ](../MICA13/index.md#prop-mica13-smooth-difference)のすべての仮定を満たし、

$$
D=\omega_{2,1}-\omega_{2,2}\in C^\infty(M\times M).
$$

滑らかな関数の波面集合は空なので $WF(D)\cap N_\Delta=\varnothing$ です。[引き戻し定理](../MICA7/index.md#thm-mica7-pullback)が適用でき、滑らかな関数に対しては写像との合成に一致します。すなわち $\Delta^*D=D\circ\Delta$ です。任意の局所座標で $D(x,x)$ と書いても、その値はスカラー関数の合成なので座標に依存しません。

また $x$ に近づく任意の滑らかな点の組 $(x_s,y_s)\to(x,x)$ に対して、$D$ の連続性より $D(x_s,y_s)\to D(x,x)$ です。微分も同様に滑らかな関数の通常の合成で決まります。
<!-- proof-end -->

この命題は**二つのHadamard状態の差**についての全時空上の主張です。一つの状態に対する $H_{\ell,\infty}$ は各凸正規近傍でしか構成していません。異なる近傍の処方をつないで大域的な局所観測量にするには、重なりでの整合性・局所共変性という追加の選択が必要です。局所的に差が滑らかなだけで、すべての処方が自動的に同じ数値を与えるわけではありません。

## 3. 点分離からWick平方の期待値へ

古典場なら $\phi(x)^2$ は同じ点の積です。しかし量子場は作用素値分布なので、量子場の二点分布を直接対角に置くことはできません。ここではまず**選んだHadamard減算規約でのWick平方の状態期待値**を定めます。全状態空間に作用するWick多項式の作用素値分布の構成そのものや保存則は、この定義だけからは従いません。

<a id="def-mica14-wick-square"></a>

<!-- formal-statement-start -->
> **定義（点分離によるWick平方期待値）**  
> 上記の4次元実自由Klein–Gordon場のHadamard状態 $\omega$ と、凸正規近傍 $C$ 上で選んだ共通Hadamard減算規約 $H_{\ell,\infty}$ に対し、局所的なWick平方期待値を

$$
\omega\bigl(:\!\phi^2\!:\!_{H_\ell}(x)\bigr)
:=\left[\omega_2-H_{\ell,\infty}\right](x)
:=F_{\omega,\ell}(x,x),\qquad x\in C
$$

> と定める。角括弧 $[F](x)$ は、二つの変数に関する滑らかな関数 $F$ の対角値を表す。さらに局所幾何に依存する滑らかな実関数 $c(x)$ を加える有限な規約変更も、区別して記述する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mica14-wick-square -->
### 定義の確認：滑らかな状態変更の前後

**定義の確認**。質量零Minkowski時空で $\omega_{2,0}$ を真空の二点分布とし、$\lambda\ge0$ を固定します。$v(x)=1$ は $P=-\Box$ の実滑らかな解です。[MICA11の状態変更](../MICA11/index.md#prop-mica11-smooth-shift)から $\omega_{2,\lambda}=\omega_{2,0}+\lambda\,v\otimes v$ は同じ交換子を持つHadamard二点分布になります。同じ $H_{\ell,\infty}=\omega_{2,0}$ を引くと

$$
F_{\lambda,\ell}(x,y)
=\omega_{2,\lambda}(x,y)-H_{\ell,\infty}(x,y)
=\lambda,
\qquad
\omega_\lambda(:\!\phi^2\!:\!_{H_\ell}(x))=\lambda.
$$

正規化 $F_{0,\ell}=0$ と比べて $\lambda$ の分だけ変わります。ここで $\lambda$ は滑らかな状態依存成分であり、発散する $1/r^2$ 項を消すための係数ではありません。
<!-- definition-example-end -->

<a id="prop-mica14-state-difference"></a>

<!-- formal-statement-start -->
> **命題（Wick平方の状態間差）**  
> 同じ $(M,g,P,E)$ に対する二つのHadamard状態 $\omega,\omega'$ を取り、同じ凸正規近傍 $C$・同じ全次数の $H_{\ell,\infty}$・同じ有限局所項 $c(x)$ を用いる。このとき

$$
\omega(:\!\phi^2\!:\!_{H_\ell}(x))
-\omega'(:\!\phi^2\!:\!_{H_\ell}(x))
=\bigl(\omega_2-\omega_2'\bigr)(x,x).
$$

> 右辺は**滑らかな差の対角値**であり、生の二点分布の値の差として別々に定義するものではない。同じ規約を両状態に使う限り、この状態間差は共通Hadamard減算式・長さスケール・共通有限局所項の選び方によらない。
<!-- formal-statement-end -->

### 証明の見取り図

両状態は同じ交換子を持つので、差 $D=\omega_2-\omega_2'$ は滑らかです。したがって、引き算を行う**順序**を守って二つの滑らかな余りの差を取ると、共通の $H_{\ell,\infty}$ が消えます。どちらにも同じ $c(x)$ を加えれば、それも差では消えます。

<!-- proof-start -->
### 証明

[滑らかな差の対角制限](#prop-mica14-smooth-restriction)により $D:=\omega_2-\omega_2'\in C^\infty(M\times M)$ です。同じ $H_{\ell,\infty}$ が定義された $C\times C$ では

$$
\begin{aligned}
F_{\omega,\ell}-F_{\omega',\ell}
&=(\omega_2-H_{\ell,\infty})
-(\omega_2'-H_{\ell,\infty})\\
&=\omega_2-\omega_2'=D.
\end{aligned}
$$

左辺も右辺も滑らかなので対角埋め込みを適用でき、

$$
\Delta^*F_{\omega,\ell}-\Delta^*F_{\omega',\ell}
=\Delta^*D
$$

を得ます。定義により左辺がWick平方期待値の差、右辺が $D(x,x)$ です。共通に選んだ $c(x)$ を加える場合は $(Q_\omega+c)-(Q_{\omega'}+c)=Q_\omega-Q_{\omega'}$。尺度や処方の変更も、**両状態に同一の滑らかな変化**を与える限り打ち消されます。
<!-- proof-end -->

[二点分布のHermite性](../MICA11/index.md#def-mica11-two-point-conditions) $\omega_2(x,y)=\overline{\omega_2(y,x)}$ と、同じ交換子条件による $D=D^T$ を合わせると

$$
D(x,y)=D(y,x)=\overline{D(x,y)}.
$$

つまり $D$ は実値の対称な滑らかな関数です。特に状態間差 $D(x,x)$ は実数です。個々の減算後の期待値も実数として扱うには、$H_{\ell,\infty}(x,y)=\overline{H_{\ell,\infty}(y,x)}$ となるHermite対称な処方（実対称な係数と交換に整合する $i0$ 境界値）を選びます。分布のHermite対称性を無視して任意の複素の滑らかな減算項を加えるのは、実場の観測量の規約として不適切です。

## 4. 尺度を変えると値はどう変わるか

Hadamard形の対数に現れる $\ell$ は、状態の変更とは別の選択です。[長さスケールの変更](../MICA12/index.md#prop-mica12-scale-shift)を使えば、その違いを**局所的な数値**として計算できます。

<a id="prop-mica14-scale-shift"></a>

<!-- formal-statement-start -->
> **命題（尺度変更とWick平方の局所項）**  
> 4次元の上記の自由スカラー場において、同じHadamard二点分布、同じ全次数の滑らかな $V_\infty$、同じ局所処方のもとで $\ell'=e^s\ell$（$s\in\mathbb R$）とする。すると

$$
\begin{aligned}
\omega(:\!\phi^2\!:\!_{H_{\ell'}}(x))
-\omega(:\!\phi^2\!:\!_{H_\ell}(x))
&=\frac{s}{4\pi^2}[V_\infty](x)\\
&=\frac{s}{8\pi^2}
\left[m^2+\left(\xi-\frac16\right)R(x)\right].
\end{aligned}
$$

> 右辺は状態によらない局所幾何項であり、同じ尺度変更を二つの状態に施したときのWick平方**期待値差**は不変である。
<!-- formal-statement-end -->

### 証明の見取り図

対数の分母 $\ell^2$ を $e^{2s}\ell^2$ に変えると、対数全体が $-2s$ だけ変わります。Hadamard式の符号は負、減算後の余りの符号は正です。最後に[MICA12の輸送係数の対角値](../MICA12/index.md#thm-mica12-transport)を使います。

<!-- proof-start -->
### 証明

[MICA12の全次数の局所Hadamard式](../MICA12/index.md#def-mica12-local-parametrix)から、同じ $U,V_\infty$ を固定すれば

$$
\begin{aligned}
H_{\ell',\infty}-H_{\ell,\infty}
&=\frac{V_\infty}{8\pi^2}
\left(\log\frac{\sigma_+}{e^{2s}\ell^2}
-\log\frac{\sigma_+}{\ell^2}\right)\\
&=-\frac{2s}{8\pi^2}V_\infty
=-\frac{s}{4\pi^2}V_\infty.
\end{aligned}
$$

二つの式の差は滑らかです。$\omega_2$ を固定して引くと

$$
F_{\omega,\ell'}-F_{\omega,\ell}
=-(H_{\ell',\infty}-H_{\ell,\infty})
=\frac{s}{4\pi^2}V_\infty.
$$

対角を取ると第一の等式です。さらに $V_\infty$ の先頭係数は $v_0$ で、全次数の漸近構成では $[V_\infty]=[v_0]$ です。[輸送係数の計算](../MICA12/index.md#thm-mica12-transport)より

$$
[v_0]=\frac12[P_xU]
=\frac12\left[m^2+
\left(\xi-\frac16\right)R\right].
$$

これを代入すれば第二の等式になります。右辺は $\omega$ に依存しないので、同じ式を $\omega'$ にも適用して差を取れば互いに消えます。
<!-- proof-end -->

ここで区別したい自由度は三種類です。

| 選択・変化 | Wick平方期待値に起きること | 二状態の差 |
| --- | --- | --- |
| 状態 $\omega\to\omega'$ | 滑らかな $D(x,x)$ だけ変化 | 変化そのものを測る |
| 共通の長さ尺度 $\ell\to e^s\ell$ | $s[m^2+(\xi-1/6)R]/(8\pi^2)$ を加算 | 不変 |
| 共通の滑らかな有限局所項 $c(x)$ | $c(x)$ を加算 | 不変 |

任意の滑らかな $c(x)$ を加えれば数値としては有限ですが、それだけで**局所共変なWick平方**とは言えません。背景の計量と場の作用素だけから同じ規則で構成できること、適切なスケーリング・滑らかな背景依存性などの公理を課します。4次元の実Klein–Gordon場で、工学次元2・局所共変性・通常のスケーリング条件等を課す標準的な分類では、許される有限なWick平方の変更は定数 $c_1,c_2$ による

$$
c_1m^2+c_2R(x)
$$

の形になります（[Hollands–Waldの局所Wick多項式の分類](https://arxiv.org/abs/gr-qc/0103074)）。**これらの公理を置かずに、この二項がすべてだとは主張しません。** 特に基準状態や尺度の選択だけで絶対的なWick平方の値が一意に決まるわけではありません。

## 5. 微分のあとに対角を取る場合

Wick平方には微分がありませんが、応力テンソルには両変数の微分が現れます。ここでも分布 $\omega_2$ と $H_{\ell,\infty}$ の個々を先に対角で評価することはできません。まず滑らかな差を構成し、**必要な微分を二変数で行い、そのあと対角へ制限**します。

<a id="prop-mica14-differential-restriction"></a>

<!-- formal-statement-start -->
> **命題（滑らかな余りへの微分と対角制限）**  
> $C\times C$ 上で $F_{\omega,\ell}\in C^\infty(C\times C)$ とし、$\mathscr D_{xy}$ を $x,y$ に関する有限階の線形微分作用素で、係数が $C\times C$ 上滑らかであるものとする。このとき

$$
\Delta^*(\mathscr D_{xy}F_{\omega,\ell})\in C^\infty(C)
$$

> が通常の関数として一意に定義される。ただし、この事実だけでは得られたテンソルの保存性・局所共変性・有限くりこみ項の一意性は従わない。
<!-- formal-statement-end -->

### 証明の見取り図

微分作用素の係数も余りも滑らかなので、有限階の微分で滑らかさは失われません。続いて対角写像との合成を取れます。保存則のような微分恒等式は、これとは別に作用素の形と局所補正を検査する必要があります。

<!-- proof-start -->
### 証明

局所座標で $\mathscr D_{xy}=\sum_{|\alpha|+|\beta|\le r}a_{\alpha\beta}(x,y)\partial_x^\alpha\partial_y^\beta$ と書けます。仮定により各 $a_{\alpha\beta}$ と $F_{\omega,\ell}$ は滑らかなので、各項 $a_{\alpha\beta}\partial_x^\alpha\partial_y^\beta F_{\omega,\ell}$ は滑らかです。有限和も滑らかで、波面集合は空です。[滑らかな分布の引き戻し](../MICA7/index.md#thm-mica7-pullback)を $\Delta$ に適用して結論を得ます。

一方、$C^\infty$ 性は $\nabla^a T_{ab}=0$ のようなテンソル恒等式を含意しません。例えば任意の滑らかな関数 $f$ に対して $T_{ab}=f g_{ab}$ は滑らかですが、$\nabla^aT_{ab}=\nabla_b f$ は一般に零でありません。
<!-- proof-end -->

応力テンソルの点分離では $\mathscr D_{xy}$ の具体形に平行移動や曲率項が入り、Hadamard式が厳密な双解ではないことに由来する局所補正も検査します。**有限な対角極限が存在すること**と**保存則を満たすこと**は別の問題です。これが次のMICA15の主題です。

## 6. 演習――発散と滑らかな差を取り違えない

<a id="ex-mica14-a01"></a>
### 演習 MICA14-A1：対角余法束を導出する

- Level: A
- 目安時間: 16分

滑らかな4次元多様体 $M$ と $\Delta(x)=(x,x)$ を考える。$d\Delta_x$ とその転置を計算し、$N_\Delta$ の非零要素の形を導け。

<!-- solution-start -->
#### 詳細解答

$h\in T_xM$ を任意に取り、局所座標で $c(0)=x$、$c'(0)=h$ となる滑らかな曲線 $c(s)$ を選びます。$\Delta\circ c(s)=(c(s),c(s))$ を $s=0$ で微分すれば $d\Delta_x(h)=(h,h)$ です。双対では

$$
({}^{\mathsf T}d\Delta_x)(\alpha,\beta)(h)
=(\alpha,\beta)(h,h)=\alpha(h)+\beta(h).
$$

任意の $h$ で零となる必要十分条件は $\alpha+\beta=0$、つまり $\beta=-\alpha$ です。非零の余法束は $(x,k;x,-k)$（$k\ne0$）で、両成分の符号を同じにしないことが要点です。
<!-- solution-end -->

<a id="ex-mica14-a02"></a>
### 演習 MICA14-A2：光的な方向と交差するか

- Level: A
- 目安時間: 17分

Minkowski時空の標準座標 $(t,x^1,x^2,x^3)$ で、計量の成分行列を $g_{ab}=\operatorname{diag}(-1,1,1,1)$ とし、**共変ベクトルの成分**を $k_a=(-a,a,0,0)$、$a>0$ とする。$k^\sharp$ の時間向きを求め、$(x,k;x,-k)$ がHadamard波面関係 $\mathcal C^+$ と $N_\Delta$ の両方に属することを示せ。この事実から**何だけ**が結論できるか述べよ。

<!-- solution-start -->
#### 詳細解答

標準座標で $g^{ab}g_{bc}=\delta^a{}_c$ を使って逆計量を求めます。共変成分 $k_b$ から計量双対の反変成分と光的条件を計算すると

$$
\begin{aligned}
g^{ab}&=\operatorname{diag}(-1,1,1,1),\\
(k^\sharp)^a&=g^{ab}k_b=(a,a,0,0),\\
g^{-1}(k,k)&=g^{ab}k_ak_b=-a^2+a^2=0.
\end{aligned}
$$

よって $k^\sharp$ は光的で、時間成分 $a>0$ なので未来向きです。[二点波面関係](../MICA13/index.md#def-mica13-null-pair)の $x=y$ の条件を満たし $(x,k;x,-k)\in\mathcal C^+$ です。

[対角余法束の計算](#prop-mica14-diagonal-obstruction)から同じ点は $N_\Delta$ にも属します。交差が非空なので[引き戻し定理](../MICA7/index.md#thm-mica7-pullback)の**十分条件が失敗する**と言えます。しかし、特別な制限も含めた全面的不可能性はこれだけでは結論できません。
<!-- solution-end -->

<a id="ex-mica14-a03"></a>
### 演習 MICA14-A3：平坦真空の点分離発散

- Level: A
- 目安時間: 15分

質量零Minkowski真空 $\omega_{2,0}=1/[4\pi^2\{r^2-(\tau-i0)^2\}]$ について、$\tau=0$、$r>0$ の値を求め、$r\downarrow0$ の挙動を述べよ。Hadamard subtraction後の同じ真空の余りも求めよ。

<!-- solution-start -->
#### 詳細解答

$\tau=0$、$r>0$ は光円錐の外なので境界値は通常の関数です。従って $\omega_{2,0}=1/(4\pi^2r^2)$ で、$r\downarrow0$ に正の無限大へ発散します。一方、同じ正周波数規約の[質量零Hadamard式](../MICA12/index.md#prop-mica12-massless-boundary)は $H_{\ell,\infty}=\omega_{2,0}$ なので、二変数分布として先に引けば

$$
F_{0,\ell}=\omega_{2,0}-H_{\ell,\infty}=0,
\qquad [F_{0,\ell}]=0.
$$

「各項の無限大どうしを引いた」のではなく、等しい分布の差を取ったことが本質です。
<!-- solution-end -->

<a id="ex-mica14-a04"></a>
### 演習 MICA14-A4：有限次切断の落とし穴

- Level: A
- 目安時間: 18分

質量 $m>0$ の平坦模型で[MICA12の係数](../MICA12/index.md#prop-mica12-flat-mass)を使う。$H_{\ell,0}$ の次に現れる対数項の係数 $v_1$ を求め、なぜ一項切断だけで滑らかな余りが保証されないか説明せよ。

<!-- solution-start -->
#### 詳細解答

平坦模型では $v_0=m^2/2$、$Pv_0=m^2v_0=m^4/2$ です。[MICA12の輸送再帰](../MICA12/index.md#thm-mica12-transport)で定数解を取ると $4v_1=Pv_0$ なので $v_1=m^4/8\ne0$。$H_{\ell,0}$ にない次の項は

$$
\frac{v_1}{8\pi^2}\sigma\log(\sigma_+/\ell^2).
$$

光円錐の滑らかな部分では $\sigma$ は横断方向の座標です。$s\log|s|$ は $s=0$ で連続に延長できますが導関数 $\log|s|+1$ が発散します。したがって、この未収録項を無視して $C^\infty$ の余りを主張できません。
<!-- solution-end -->

<a id="ex-mica14-a05"></a>
### 演習 MICA14-A5：対角値と微分の順番

- Level: A
- 目安時間: 17分

$F(x,y)=x^2y+3xy^2$（$x,y\in\mathbb R$）とする。$(\partial_x\partial_yF)(x,x)$ と $\frac{d^2}{dx^2}F(x,x)$ を求め、両者が一般には一致しないことを確かめよ。

<!-- solution-start -->
#### 詳細解答

まず二変数で微分すると $\partial_yF=x^2+6xy$、さらに $\partial_x\partial_yF=2x+6y$ なので対角値は $8x$ です。一方、先に対角へ制限すると $F(x,x)=4x^3$、一変数の二階微分は $24x$ です。違いは対角写像 $x\mapsto(x,x)$ の連鎖律によります。まず $\frac{d}{dx}F(x,x)=(\partial_xF+\partial_yF)(x,x)$、もう一度微分すると

$$
\frac{d^2}{dx^2}F(x,x)
=(\partial_x^2F+2\partial_x\partial_yF+\partial_y^2F)(x,x).
$$

ここで $\partial_x^2F=2y$、$\partial_y^2F=6x$、$\partial_x\partial_yF=2x+6y$ だから、対角上では $2x+16x+6x=24x$ となります。応力テンソルの点分離では、指定された**双微分作用素を先に**使わなければなりません。
<!-- solution-end -->

<a id="ex-mica14-b01"></a>
### 演習 MICA14-B1：二状態の差を対角に引き戻す

- Level: B
- 目安時間: 28分

同じ $(M,g,P,E)$ の二つのHadamard二点分布 $\omega_{2,1},\omega_{2,2}$ は $WF(\omega_{2,j})=\mathcal C^+$、$\omega_{2,j}-\omega_{2,j}^T=-iE$ を満たす。$D=\omega_{2,1}-\omega_{2,2}$ について、転置対称性・波面集合の空性・対角制限の存在を順に証明せよ。

<!-- solution-start -->
#### 詳細解答

交換子の式を引くと

$$
D-D^T=(\omega_{2,1}-\omega_{2,1}^T)
-(\omega_{2,2}-\omega_{2,2}^T)=0,
$$

よって $D=D^T$。[波面集合の和の包含](../MICA3/index.md#prop-mica3-sum)から $WF(D)\subset\mathcal C^+$ です。一方、[転置の波面方向の交換](../MICA13/index.md#prop-mica13-transpose)を $D=D^T$ へ適用すれば $WF(D)\subset\mathcal C^-$ も成立します。未来と過去は非零光的方向では交わらないので

$$
WF(D)\subset\mathcal C^+\cap\mathcal C^-=\varnothing.
$$

[空な波面集合と滑らかさ](../MICA3/index.md#thm-mica3-projection)から $D\in C^\infty(M\times M)$。従って $WF(D)\cap N_\Delta=\varnothing$ となり、[引き戻し定理](../MICA7/index.md#thm-mica7-pullback)から $\Delta^*D=D(x,x)$ が存在します。
<!-- solution-end -->

<a id="ex-mica14-b02"></a>
### 演習 MICA14-B2：状態の変更と実数値

- Level: B
- 目安時間: 28分

$P=-\Box$ のMinkowski時空で $\omega_{2,\lambda}=\omega_{2,0}+\lambda\,1\otimes1$、$\lambda>0$ とする。共通parametrix $H=\omega_{2,0}$ を用いて両者のWick平方期待値差を求めよ。また一般にHermite性と同じ交換子条件を満たす二状態の差 $D$ が実値対称になることを示せ。

<!-- solution-start -->
#### 詳細解答

$P1=0$ で $1\otimes1$ は滑らかなので、[MICA11の状態変更](../MICA11/index.md#prop-mica11-smooth-shift)を適用できます。先に分布として引くと

$$
F_{\lambda,\ell}=\omega_{2,\lambda}-H=\lambda,\qquad
F_{0,\ell}=\omega_{2,0}-H=0,
$$

従って期待値差は $\lambda-0=\lambda$ です。一般には、交換子条件から $D^T=D$。両二点分布がHermiteなら $D(x,y)=\overline{D(y,x)}$ という分布の等式が成り立ちます。$D$ は[滑らかな差の命題](#prop-mica14-smooth-restriction)で滑らかなので点ごとに評価でき、$D(x,y)=D(y,x)=\overline{D(x,y)}$ です。従って実値対称で、対角値も実数です。
<!-- solution-end -->

<a id="ex-mica14-b03"></a>
### 演習 MICA14-B3：尺度変化と共形結合

- Level: B
- 目安時間: 29分

4次元の $P=-\Box_g+m^2+\xi R$ について $\ell'=e^s\ell$ とする。Wick平方期待値の変化を $[v_0]$ から求めよ。(i) $R=0,m>0$ と (ii) $m=0,\xi=1/6$ を比較し、この尺度計算からWick平方の絶対値が一意だと言えるか答えよ。

<!-- solution-start -->
#### 詳細解答

対数の変化は $-2s$ で、[尺度変更命題](#prop-mica14-scale-shift)を適用すると期待値は $s[v_0]/(4\pi^2)$ 変わります。[輸送係数の対角式](../MICA12/index.md#thm-mica12-transport)より

$$
[v_0]=\frac12[m^2+(\xi-1/6)R]
$$

なので変化は $s[m^2+(\xi-1/6)R]/(8\pi^2)$ です。(i) は $sm^2/(8\pi^2)$、(ii) は零です。ただし(ii)でも、局所共変な有限項 $c_2R$ を追加する余地は残ります。尺度変化が零であることと、くりこみ規約全体が一意であることは別です。
<!-- solution-end -->

<a id="ex-mica14-b04"></a>
### 演習 MICA14-B4：任意の有限項と局所共変性

- Level: B
- 目安時間: 30分

ある凸正規近傍上で $Q_{\omega,\ell}(x)$ が定義されているとする。新たな規約 $Q'_{\omega,\ell}=Q_{\omega,\ell}+c(x)$ を取り、$c$ は滑らかで状態非依存とする。二状態の期待値差を求め、$c(x)$ を任意に選んでも局所共変なWick平方が得られる、とは言えない理由を説明せよ。4次元で標準的なスケーリング条件等を加えた場合の候補を挙げよ。

<!-- solution-start -->
#### 詳細解答

二状態 $\omega,\omega'$ に同じ $c$ を用いれば

$$
Q'_{\omega,\ell}-Q'_{\omega',\ell}
=(Q_{\omega,\ell}+c)-(Q_{\omega',\ell}+c)
=Q_{\omega,\ell}-Q_{\omega',\ell}.
$$

従って期待値差は変わりません。しかし任意の座標関数 $c(x)$ を勝手に選ぶと、座標変換や別の背景への同型写像のもとで同じ構成となる保証がなく、局所共変性に反します。4次元で局所共変性・適切な工学次元とスケーリング等の公理を課すと、実Klein–Gordon場のWick平方に許される有限項は $c_1m^2+c_2R$ 型です。これらの公理なしに候補を二つに限定してはいけません。
<!-- solution-end -->

<a id="ex-mica14-c01"></a>
### 演習 MICA14-C1：点分離の全手続きを再構成する

- Level: C
- 目安時間: 48分

4次元Minkowski時空で $P=-\Box$、真空の二点分布は

$$
W_0(x,y)=\frac{1}{4\pi^2\{r^2-(\tau-i0)^2\}}
=\frac{1}{8\pi^2\sigma_+(x,y)}
$$

である。$\lambda>0$、$v(x)=1$ に対し $W_\lambda=W_0+\lambda v(x)v(y)$ を考える。同じ正周波数規約の全次数Hadamard式 $H_{\ell,\infty}=W_0$ を用い、以下を示せ。

1. $x=y$ での $WF(W_0)\cap N_\Delta$ を特定し、生の $W_0$ の対角引き戻し定理が使えないことを示せ。
2. 等時刻の点分離で生の値の発散を求め、特異な分布を対角評価することとの違いを説明せよ。
3. $W_\lambda$ の双解性・同じ交換子条件・Hadamard性を確認し、$[W_\lambda-H_{\ell,\infty}]$ を求めよ。
4. 二状態のWick平方期待値差を求め、$\ell'=e^s\ell$ に変えても差が不変であることを示せ。
5. 有限な点分離の存在だけから応力テンソルの保存則が従わない理由を一つの数式で示せ。

<!-- solution-start -->
#### 詳細解答

**1.** [対角余法束](#prop-mica14-diagonal-obstruction)は $N_\Delta=\{(x,k;x,-k):k\ne0\}$。[MICA13の平坦真空の波面集合](../MICA13/index.md#prop-mica13-flat-wavefront)は $WF(W_0)=\mathcal C^+$ です。従って交差は未来向き光的な $k$ を持つ全ての $(x,k;x,-k)$ で非空であり、[引き戻し定理](../MICA7/index.md#thm-mica7-pullback)の十分条件は成立しません。

**2.** $\tau=0,r>0$ では通常関数 $W_0=1/(4\pi^2r^2)$。$r\downarrow0$ で $r^{-2}$ の発散です。これは点分離された通常の値の極限であって、定義できていない $\Delta^*W_0$ という分布をすでに計算したわけではありません。

**3.** $P1=-\Box1=0$ なので

$$
P_x(W_\lambda-W_0)=P_y(W_\lambda-W_0)=0.
$$

また $(v\otimes v)^T=v\otimes v$ であり、$W_\lambda-W_\lambda^T=W_0-W_0^T=-iE$ です。$\lambda\ge0$ に対する状態の正値性は[MICA11の滑らかな双解による変更](../MICA11/index.md#prop-mica11-smooth-shift)で保証されます。滑らかな項を加えても波面集合は変わらないので $WF(W_\lambda)=WF(W_0)=\mathcal C^+$。共通特異部分を分布として先に引けば

$$
W_\lambda-H_{\ell,\infty}
=W_0+\lambda-W_0=\lambda\in C^\infty(M\times M),
\qquad[W_\lambda-H_{\ell,\infty}]=\lambda.
$$

**4.** $W_0-H_{\ell,\infty}=0$ なので期待値差は $\lambda$。質量零平坦模型では $[v_0]=0$ で、[尺度変更の命題](#prop-mica14-scale-shift)から個々の値の尺度変化も零です。一般の背景でも、尺度を両状態で同じように変えれば共通の局所項を差し引くので差 $\Delta^*(W_\lambda-W_0)=\lambda$ は不変です。

**5.** 対角に取った結果が滑らかであることは保存則を意味しません。例えば $T_{ab}=f(x)g_{ab}$ は滑らかでも、計量両立性 $\nabla^ag_{ab}=0$ から

$$
\nabla^aT_{ab}=(\nabla^af)g_{ab}+f\nabla^ag_{ab}
=\nabla_bf
$$

で、非定数 $f$ なら一般に零ではありません。応力テンソルでは双微分演算子の形と局所補正を別途検証します。
<!-- solution-end -->

## 7. 次章への接続

ここで確立したのは、**生の二点分布ではなく、その共通Hadamard特異部分を引いた滑らかな差に対して対角極限を取る**という順序です。同じ場の二状態のWick平方期待値差は正準的ですが、個々の値は尺度・有限な局所幾何項の規約に依存します。

次のMICA15では、応力テンソルの双微分作用素、曲がった時空での二点間の平行移動、保存則を保証する局所補正、有限くりこみ自由度を扱います。Hadamard subtractionによる**制限**と、相互作用場で衝突対角へ分布を**延長**する問題も区別して進みます。

## 参考文献

- M. J. Radzikowski, [“Micro-Local Approach to the Hadamard Condition in Quantum Field Theory on Curved Space-Time”](https://doi.org/10.1007/BF02100096), *Communications in Mathematical Physics* **179** (1996), 529–553（波面集合と局所Hadamard形）。
- R. M. Wald, [*Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*](https://press.uchicago.edu/ucp/books/book/chicago/Q/bo3684008.html), 1994（点分離と応力テンソルの物理的背景）。
- R. Brunetti, K. Fredenhagen, M. Köhler, [“The Microlocal Spectrum Condition and Wick Polynomials of Free Fields on Curved Spacetimes”](https://arxiv.org/abs/gr-qc/9510056), *Communications in Mathematical Physics* **180** (1996), 633–652（Wick多項式とmicrolocal条件）。
- S. Hollands, R. M. Wald, [“Local Wick Polynomials and Time Ordered Products of Quantum Fields in Curved Spacetime”](https://arxiv.org/abs/gr-qc/0103074), *Communications in Mathematical Physics* **223** (2001), 289–326（局所共変性と有限くりこみ自由度）。
