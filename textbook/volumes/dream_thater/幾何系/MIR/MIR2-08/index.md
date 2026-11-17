# MIR2-08 特殊幾何とprepotential

<!-- definition-example-audit: strict -->

## 1. Yukawa結合を積分すると、周期まで取り戻せるか

[前講の規格化B側Yukawa結合](../MIR2-07/index.md#prop-mir2-07-regularity)は、ミラー族の座標 $q_B$ に関する正則関数

$$
K_B(q_B)=5+2875q_B+4876875q_B^2+O(q_B^3)
$$

だった。しかし、三次結合が同じでも、その三階原始関数は一意にはならない。さらに、単なる三回積分で得た関数が、なぜ**四本の周期**と関係するのだろうか。

[A側の種数0ポテンシャル](../MIR2-05/index.md#def-mir2-05-potential)も三階微分から三点関数を作る。ここではB側の周期が満たす交代形式の直交条件から、局所的な**prepotential（前ポテンシャル）**の存在と微分公式を導く。次に、三階微分から何が決まり、何が決まらないかを級数で確かめる。A/B同一視は最後まで別の数学的入力として扱う。

[ミラー写像](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)に従い、$z=0$ を除いた十分小さい単連結領域で対数の分枝を選ぶ。

$$
u:=u_B=\operatorname{Log}q_B,\qquad q_B=ze^{h(z)},\qquad
t_B=\frac{u}{2\pi i}.
$$

$\omega_0(z)\ne0$、$dq_B/dz\ne0$ の領域に制限する。$u$ と $t_B$ は別の微分座標であり、$\partial_{t_B}=2\pi i\,\partial_u$ である。以下は**局所的な複素周期座標**で行う。整数周期格子やその基底変換が確定したという主張ではない。[積分周期格子と接続行列](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)は別の条件を持つ。

## 2. 交代形式から「周期の微分が対称になる」理由

重さ3のHodge構造の[HodgeフィルトレーションとGauss–Manin接続](../MIR1-08/index.md#prop-mir1-08-period-connection)を考える。正則3形式の線が動く一パラメータ族で、形式自体の非零な複素倍率も動かすと、局所的には二次元の**周期錐**が得られる。倍率方向を加えるのは、正則3形式を定数倍するとすべての周期が同じ倍率で変わるためである。

四つの周期を、ある複素シンプレクティック基底について

$$
\Pi=(X^0,X^1,F_0,F_1),\qquad
X^I=\int_{A_I}\Omega,\quad F_I=\int_{B_I}\Omega
\quad(I=0,1)
$$

と記す。$F_I$ は**周期成分**であり、Hodgeフィルトレーションの $F^2$ とは別記号である。交叉の符号はこの講では

$$
\mathsf Q(v,w)=\sum_{I=0}^1
\left(F_I(v)X^I(w)-X^I(v)F_I(w)\right)
$$

と固定する（$\mathsf Q$ の全体倍率・符号は[前講の三次結合](../MIR2-07/index.md#prop-mir2-07-period-gauge)と比較する際に別途合わせる）。この基底は[整数シンプレクティック基底の対条件](../MIR1-14/index.md#def-mir1-14-integral-symplectic-basis)を複素線形に拡張して用いたものである。$\mathsf Q$ は**複素双線形**であってHermitian内積ではない。[交代双線形形式](../../SYM/SYM1/index.md#def-sym1-alternating-form)の条件と、非退化性は区別する。列ベクトル $v=(X,F)^{\mathsf T}$、$w=(Y,G)^{\mathsf T}$（各成分 $X,F,Y,G\in\mathbb C^2$）を上の順に並べると、双線形性から

$$
\mathsf Q(v,w)=v^{\mathsf T}Jw,\qquad
J=\begin{pmatrix}0&-I_2\\I_2&0\end{pmatrix}.
$$

$J^{\mathsf T}=-J$ なので交代的である。また $J^{-1}=-J$ なので、すべての $w$ に対して $\mathsf Q(v,w)=0$ なら $J^{\mathsf T}v=0$、従って $v=0$ となり非退化である。これは[双線形形式の行列判定](../../../基礎科目/LA/LA3E/index.md#prop-la3e-bilinear-nondegenerate-matrix)の複素ベクトル空間への同じ計算の適用である。

[Griffiths横断性](../MIR1-08/index.md#prop-mir1-08-period-connection)では、倍率方向と複素構造方向の一次変化はともにHodgeフィルトレーション $F^2$ にある。[B側Hodge三次結合の先行例](../MIR1-16/index.md#def-mir1-16-yukawa-cubic)でも確認した重さ3の偏極の直交性 $\mathsf Q(F^2,F^2)=0$ により、周期錐上の任意の接ベクトル $V,W$ について

$$
\mathsf Q(d\Pi(V),d\Pi(W))=0
$$

となる。この直交性は特殊幾何の**入力**である。交代形式だから同じベクトル自身との対が零になるだけでなく、異なる二方向についても零となることが必要だ。

<a id="def-mir2-08-special-period-chart"></a>

<!-- formal-statement-start -->
> **定義（特殊幾何の局所周期座標）**  
> 複素二次元の小さな領域 $U$ 上の正則写像 $\Pi:U\to\mathbb C^4$ を成分 $(X^0,X^1,F_0,F_1)$ で表す。上記の非退化交代形式 $\mathsf Q$ について、すべての接ベクトル $V,W$ に対して次を仮定する。

$$
\mathsf Q(d\Pi(V),d\Pi(W))=0.
$$

> さらに $(X^0,X^1)$ が $U$ の正則局所座標となるとき、これを局所特殊周期座標とする。$\Pi$ が倍率 $\lambda$ に対して $\Pi\mapsto\lambda\Pi$ と変わる場合を同次な周期錐とする。
<!-- formal-statement-end -->

局所座標性を確認した後なら、$\partial_I:=\partial/\partial X^I$（$I=0,1$）と書ける。接ベクトルの微分は

$$
d\Pi(V)=(dX^0(V),dX^1(V),dF_0(V),dF_1(V))
$$

という四成分の列である。特に $dX^I(\partial_J)=\delta^I_J$ を上の交代形式へ代入すれば

$$
\mathsf Q(\partial_0\Pi,\partial_1\Pi)
=\partial_0F_1-\partial_1F_0.
$$

接空間は $\partial_0,\partial_1$ の二方向で張られるため、交代双線形性から、この一組の値が零であることはすべての $V,W$ に対する直交性と同値である。これは**座標性と直交性を別々に確認した後**に使える判定法である。

<!-- definition-example-start: def-mir2-08-special-period-chart -->

**定義の確認**（線形周期錐）。 $X^0=x$、$X^1=y$、$F_0=x$、$F_1=y$ と置く。$(x,y)$ は座標そのもので、$\Pi$ は両変数を $\lambda$ 倍すると $\lambda$ 倍になる。$dF_0=dx$、$dF_1=dy$ なので、任意の $V,W$ について

$$
\mathsf Q(d\Pi(V),d\Pi(W))
=dx(V)dx(W)-dx(V)dx(W)
+dy(V)dy(W)-dy(V)dy(W)=0.
$$

条件をすべて満たす。対応するprepotentialは後に導く $\mathscr F=(x^2+y^2)/2$ である。**対称性が条件を生む理由**も、この二つの微分が互いに打ち消す計算から見える。

<!-- definition-example-end -->

もし $(X^0,X^1)$ が局所座標にならなければ、$F_I$ をその二変数の関数として微分する操作ができない。この非退化条件は後の存在定理で外せない。

## 3. 局所prepotentialはなぜ存在するか

いま $(X^0,X^1)$ を座標として使い、周期成分 $F_I=F_I(X^0,X^1)$ を見る。一次形式

$$
\alpha:=F_0\,dX^0+F_1\,dX^1
$$

が閉じていれば、その局所原始関数を作れる。閉性は、交代形式の二方向の直交性を**混合偏微分の対称性**に翻訳したものである。

<a id="thm-mir2-08-local-prepotential"></a>

<!-- formal-statement-start -->
> **定理（局所prepotentialの存在）**  
> $U$ を複素二次元の十分小さい単連結座標領域とし、$\Pi=(X^0,X^1,F_0,F_1)$ を前節の局所特殊周期座標とする。このとき正則関数 $\mathscr F(X^0,X^1)$ が存在して

$$
F_0=\frac{\partial\mathscr F}{\partial X^0},
\qquad F_1=\frac{\partial\mathscr F}{\partial X^1}
$$

> を満たす。$\mathscr F$ は加法定数を除き一意である。さらに同次な周期錐で $F_I(\lambda X)=\lambda F_I(X)$ かつ $\mathsf Q(\Pi,d\Pi)=0$ が成り立つ場合は、加法定数を選んで

$$
\mathscr F(X)=\frac12\left(X^0F_0+X^1F_1\right),
\qquad \mathscr F(\lambda X)=\lambda^2\mathscr F(X)
$$

> とできる。後者を次数2の同次prepotentialという。
<!-- formal-statement-end -->

### 証明の見取り図

交代形式の二方向の消滅を展開して $\partial_0F_1=\partial_1F_0$ を得る。これは原始関数の存在条件である。同次の場合は錐の半径方向も使い、原始関数を $\sum X^IF_I/2$ と具体的に構成できる。

<!-- proof-start -->
### 証明

$X^0,X^1$ が局所座標であるから、前節で導入した $\partial_I=\partial/\partial X^I$ を使って $V=\partial_0$、$W=\partial_1$ を選べる。$\mathsf Q$ の定義を成分で展開すると

$$
\begin{aligned}
0&=\mathsf Q(\partial_0\Pi,\partial_1\Pi)\\
&=\sum_{I=0}^1
\bigl((\partial_0F_I)(\partial_1X^I)
-(\partial_0X^I)(\partial_1F_I)\bigr)\\
&=\partial_0F_1-\partial_1F_0.
\end{aligned}
$$

ゆえに

$$
d\alpha=dF_0\wedge dX^0+dF_1\wedge dX^1
=(\partial_0F_1-\partial_1F_0)\,dX^0\wedge dX^1=0.
$$

ここで符号を確認すると、$dF_0\wedge dX^0=-\partial_1F_0\,dX^0\wedge dX^1$、$dF_1\wedge dX^1=\partial_0F_1\,dX^0\wedge dX^1$ である。小さい単連結な座標領域では、正則な閉一次形式に局所原始関数があり、$d\mathscr F=\alpha$ となる。従って二つの偏微分公式を得る。同じ微分を持つ二関数の差は定数だから一意性も従う。

同次の場合、Eulerの微分公式を成分ごとに用いると $\sum_J X^J\partial_JF_I=F_I$ である。混合偏微分の対称性から

$$
\sum_I X^I\partial_JF_I
=\sum_I X^I\partial_IF_J=F_J.
$$

そこで $\mathscr F_*=\frac12\sum_I X^IF_I$ を直接微分すると

$$
\partial_J\mathscr F_*
=\frac12\left(F_J+\sum_I X^I\partial_JF_I\right)
=F_J.
$$

$\mathscr F_*$ は原始関数で、$\mathscr F_*(\lambda X)=\frac12\sum(\lambda X^I)(\lambda F_I)=\lambda^2\mathscr F_*(X)$ を満たす。これは加法定数を同次性に合わせて選んだものである。
<!-- proof-end -->

**混合偏微分の失敗例。** $F_0=X^1$、$F_1=0$ なら $\partial_1F_0=1$、$\partial_0F_1=0$ である。原始関数が存在すると仮定すれば $\partial_1\partial_0\mathscr F=1$ と $\partial_0\partial_1\mathscr F=0$ が同時に必要となり矛盾する。したがって座標の存在だけではprepotentialは作れず、交代形式の直交性が不可欠である。

## 4. 同次prepotentialから四本の周期を作り直す

$X^0\ne0$ の局所領域で比

$$
s:=\frac{X^1}{X^0},\qquad
\mathscr F(X^0,X^1)=(X^0)^2 f(s)
$$

を考える。$s$ は**周期比としての特殊座標**である。以下、$f'(s)=df/ds$、$f'''(s)=d^3f/ds^3$ とし、周期列のプライムも成分ごとに $s$ で微分する意味で使う。これらは $X^0,X^1$ の片方を固定する偏微分 $\partial_I$ と区別する。後で $s=u_B$ を選ぶが、その同一視には周期基底の選択が必要で、任意のFrobenius解の並べ方から自動的には従わない。

<a id="prop-mir2-08-period-reconstruction"></a>

<!-- formal-statement-start -->
> **命題（同次prepotentialと周期成分）**  
> $X^0\ne0$ で $\mathscr F(X)=(X^0)^2f(X^1/X^0)$ とし、$F_I=\partial_I\mathscr F$ とする。このとき

$$
F_1=X^0f'(s),\qquad
F_0=X^0\bigl(2f(s)-sf'(s)\bigr).
$$

> $X^0=1$ に規格化した周期列 $\widehat\Pi=(1,s,2f-sf',f')$ について、前節で固定した交代形式は

$$
\mathsf Q\bigl(\widehat\Pi,\partial_s^3\widehat\Pi\bigr)=f'''(s)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$X^1$ を固定したとき $\partial_0s=-s/X^0$、$X^0$ を固定したとき $\partial_1s=1/X^0$ である。三階微分では $2f-sf'$ の項と $f'$ の項を合わせると四階微分が相殺され、三階だけが残る。

<!-- proof-start -->
### 証明

連鎖律により

$$
\partial_1\mathscr F
=(X^0)^2 f'(s)\frac{1}{X^0}
=X^0f'(s),
$$

$$
\partial_0\mathscr F
=2X^0f(s)+(X^0)^2f'(s)\left(-\frac{s}{X^0}\right)
=X^0(2f-sf').
$$

$X^0=1$ として $G=2f-sf'$ とおく。直接三回微分すると

$$
G'=f'-sf'',\qquad
G''=-sf''',\qquad
G'''=-f'''-sf''''.
$$

また $(f')'''=f''''$。$\widehat\Pi$ の初めの二成分は $1,s$ だから、それらの三階微分は0。従って交代形式の定義から

$$
\begin{aligned}
\mathsf Q(\widehat\Pi,\widehat\Pi''')
&=-(G'''+s(f')''')\\
&=-(-f'''-sf''''+sf'''')=f'''.
\end{aligned}
$$

$q_B$ への代入やA側の曲線計数は用いていない。
<!-- proof-end -->

**古典三次交叉数5の直接例。** $f(s)=5s^3/6$ とすると

$$
f'=\frac52s^2,\quad
F_0=2f-sf'=-\frac56s^3,\quad
F_1=\frac52s^2.
$$

このとき $\widehat\Pi=(1,s,-5s^3/6,5s^2/2)$ で、第三微分は $(0,0,-5,0)$。従って

$$
\mathsf Q(\widehat\Pi,\widehat\Pi''')=-(1\cdot(-5)+s\cdot0)=5.
$$

前講の[quinticの規格化B側結合](../MIR2-07/index.md#prop-mir2-07-regularity)で定数項を5に固定したことと一致する。ただしこの一致には、$\mathsf Q$ の符号・倍率も前講と整合させているという**追加の規格化**が含まれる。局所Picard–Fuchs方程式だけで「積分シンプレクティック基底の古典値5」まで決まるわけではない。

## 5. 鏡像座標で三回積分する：定数項・級数・不定性

ここから特殊座標として $s=u_B$ を採り、$X^1/X^0=u_B$ が成り立つような局所複素周期基底を**選べた場合**を扱う。[MIR1-14の接続行列](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)を求めずに整数基底まで同時に指定したとはみなさない。偏極を前講の $\kappa=5$ と整合させたとき、上の命題と[周期規格化の不変性](../MIR2-07/index.md#prop-mir2-07-period-gauge)から、規格化三次結合は

$$
f'''(u)=K_B(q_B),\qquad q_B=e^u
$$

と記せる。この等式は選んだ複素基底・符号・スケールに**条件付き**の表示である。別の基底や $t_B=u/(2\pi i)$ に移るときはJacobianの三乗を使う。

関数 $K_B(q)=5+\sum_{d\ge1}k_dq^d$ が原点近傍で正則なら、同じ収束円板内で

$$
\sum_{d\ge1}\frac{k_d}{d^3}q^d
$$

も収束する。$d^{-3}$ は係数を大きくしないからである。$q=e^u$ だから $dq/du=q\ne0$ であり、連鎖律 $d\varphi(q(u))/du=q\,d\varphi/dq$ が使える。ここでは $X^0,X^1$ の偏微分ではなく $u$ による一変数微分を $D:=d/du=q\,d/dq$ と略記する。すると $D^3(q^d)=d^3q^d$ で、古典項は $(d/du)^3(5u^3/6)=5$ となる。

<a id="def-mir2-08-flat-prepotential"></a>

<!-- formal-statement-start -->
> **定義（平坦座標での局所prepotential）**  
> $u$ を切断した穿孔円板上の対数座標、$q=e^u$ とする。原点近傍で正則な三次結合を次の形とする。

$$
K(q)=\kappa+\sum_{d\ge1}k_dq^d.
$$

> 次の三階微分方程式を満たす局所正則関数 $f$ を、平坦座標 $u$ におけるprepotentialと呼ぶ。

$$
f'''(u)=K(e^u).
$$

> 周期の同次prepotentialと対応させる場合は、さらに第4節の特殊座標・交代形式の規格化を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-08-flat-prepotential -->

**定義の確認**。 $K(q)=5+6q+16q^2$ なら

$$
f(u)=\frac56u^3+6e^u+2e^{2u}
$$

と置ける。逐次微分すると $f'''(u)=5+6e^u+2\cdot2^3e^{2u}=5+6q+16q^2$。$q^2$ の係数16をそのまま原始関数に置かず、$2^3=8$ で割ったことが本質である。

<!-- definition-example-end -->

<a id="prop-mir2-08-cubic-integration"></a>

<!-- formal-statement-start -->
> **命題（三次結合からprepotentialを復元する公式）**  
> $K(q)=\kappa+\sum_{d\ge1}k_dq^d$ が $|q|<r$ で正則、$0<|q|<r$ の単連結な対数分枝で $u=\operatorname{Log}q$ とする。すべての局所解 $f'''(u)=K(e^u)$ は

$$
f(u)=\frac{\kappa}{6}u^3+
\sum_{d\ge1}\frac{k_d}{d^3}e^{du}
+a+bu+\frac c2u^2
$$

> と表せる。ただし $a,b,c\in\mathbb C$ は定数である。従って三階微分はprepotentialを二次以下の多項式まで決める。
<!-- formal-statement-end -->

### 証明の見取り図

各 $e^{du}$ を一回微分するたびに $d$ が掛かるため、三回の逆操作では $d^3$ で割る。二つの原始関数の差は三階微分が0なので二次多項式である。

<!-- proof-start -->
### 証明

$|q|<r$ の任意の閉円板 $|q|\le r'<r$ では元の冪級数が絶対一様収束する。$d^{-3}$ を掛けた級数も絶対一様収束する。また三回微分した級数は元の $K(q)-\kappa$ となり、この各階の微分級数も任意の小さい閉円板上で収束するので項別微分できる。

$u$ で微分すると $d(e^{du})/du=d\,e^{du}$ だから

$$
\frac{d^3}{du^3}\left(\frac{k_d}{d^3}e^{du}\right)
=\frac{k_d}{d^3}d^3e^{du}=k_de^{du}.
$$

また $(\kappa u^3/6)'''=\kappa$ なので、提示した式は三階微分方程式を満たす。$f,g$ がともに解なら $h=f-g$ は $h'''=0$。$h''$ は定数 $c$、$h'=cu+b$、$h=c u^2/2+bu+a$ と積分できる。単連結領域だから同じ定数を領域全体で使える。
<!-- proof-end -->

**quinticの最初の二係数。** [前講の二次展開](../MIR2-07/index.md#thm-mir2-07-first-coefficient)とそこでの二次係数の計算により、

$$
f_B(u)=\frac56u^3+2875e^u+\frac{4876875}{8}e^{2u}
+O(e^{3u})+a+bu+\frac c2u^2.
$$

三階微分すれば $5+2875q_B+4876875q_B^2+O(q_B^3)$ が戻る。係数 $4876875/8$ は**B側三次結合を積分した係数**であり、別の入力なしに実際の曲線本数と呼べない。[A側のGW係数との比較規約](../MIR2-07/index.md#def-mir2-07-comparison-convention)を採り、さらに一致を仮定した場合には、$N_2^X$ と同じ数になる。

## 6. 二次多項式は四本の周期をどう変えるか

三階微分が同じでも、四本の周期が完全に同じとは限らない。$f$ に二次以下の多項式を足すと、$F_0,F_1$ に**一次式**が足される。この自由度のどの部分が周期基底の変更に対応するかを直接計算する。

<a id="prop-mir2-08-quadratic-period-shift"></a>

<!-- formal-statement-start -->
> **命題（二次不定性とシンプレクティックな周期のずれ）**  
> 同次prepotential $\mathscr F=(X^0)^2f(X^1/X^0)$ において、$f$ を

$$
\widetilde f(s)=f(s)+a+bs+\frac c2s^2
$$

> に取り替える。ただし $a,b,c\in\mathbb C$ とする。このとき $(X^0,X^1)$ を固定したまま周期成分は

$$
\begin{pmatrix}\widetilde F_0\\ \widetilde F_1\end{pmatrix}
=
\begin{pmatrix}F_0\\F_1\end{pmatrix}
+
\begin{pmatrix}2a&b\\b&c\end{pmatrix}
\begin{pmatrix}X^0\\X^1\end{pmatrix}
$$

> と変わり、この対称行列による変換は交代形式 $\mathsf Q$ を保存する。特に $\widetilde f'''=f'''$ である。係数が一般の複素数なら、この変換が整数周期格子も保存するとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

一方の周期を固定し、もう一方の周期に対称行列倍を足すと交代形式の交差項が相殺される。三階微分は二次式を消す。

<!-- proof-start -->
### 証明

二次多項式を同次化すると

$$
\widetilde{\mathscr F}-\mathscr F
=a(X^0)^2+bX^0X^1+\frac c2(X^1)^2.
$$

$X^0$ と $X^1$ でそれぞれ偏微分すると、追加分は $2aX^0+bX^1$ と $bX^0+cX^1$ になる。従って主張の行列式を得る。

$A=\begin{pmatrix}2a&b\\b&c\end{pmatrix}=A^{\mathsf T}$ とし、列ベクトルを $X,F$ と書く。周期の変換 $(X,F)\mapsto(X,F+AX)$ の前後で任意の二組 $(X,F)$、$(Y,G)$ に対し

$$
\begin{aligned}
\widetilde{\mathsf Q}
&=(F+AX)^{\mathsf T}Y-X^{\mathsf T}(G+AY)\\
&=F^{\mathsf T}Y-X^{\mathsf T}G+
X^{\mathsf T}(A^{\mathsf T}-A)Y\\
&=\mathsf Q.
\end{aligned}
$$

最後は対称性 $A^{\mathsf T}=A$ を用いた。$a+bs+cs^2/2$ の三階微分は0なので $\widetilde f'''=f'''$。整数周期格子を保存する条件には行列の整数性などが別途必要で、複素数 $a,b,c$ の任意選択では保証されない。
<!-- proof-end -->

**座標の定数シフトとは区別する。** [前講の対数座標シフト](../MIR2-07/index.md#prop-mir2-07-coordinate-shift)で $u'=u+\log2$ とすれば $q'_B=2q_B$ となり、同じ関数でも $K_B$ の一次係数は $2875/2$ へ変わる。一方、今の二次多項式の追加では $u,q_B$ を一切変えず、$K_B$ の係数も変えない。したがって「prepotentialの二次不定性」と「平坦座標の選択」は同じ自由度ではない。

## 7. A側の古典項と比較してよい範囲

[A側の因子方向の種数0ポテンシャル](../MIR2-05/index.md#prop-mir2-05-potential-expansion)は

$$
\mathcal F_0^X(\tau,Q)=\frac56\tau^3+
\sum_{d\ge1}N_d^XQ^de^{d\tau}
$$

で、$Q$ を固定して $\tau$ で三回微分すると $5+\sum d^3N_d^XQ^de^{d\tau}$ となる。一方、B側は $u$ の三回微分で $K_B$ を得た。両側の**古典三次項の係数5**と、B側の $q_B$ 展開の形がそろっただけでは、仮想GW不変量との等号は証明されない。

両方を同じ形式変数 $x$ に置き、A側では $x=Qe^\tau$、B側では $x=q_B$ として**比較する**とき、B側のprepotentialから読み取れる $d=1,2$ の係数は

$$
\frac{k_1}{1^3}=2875,\qquad
\frac{k_2}{2^3}=\frac{4876875}{8}
$$

である。これらが $N_1^X,N_2^X$ に一致するのは、[A/B三次結合の同一視を追加で仮定したとき](../MIR2-07/index.md#prop-mir2-07-conditional-coefficients)に限る。後続の $I/J$ 関数とquinticミラー定理が、その同一視を支える深い数学的入力となる。

また、$t_B=u/(2\pi i)$ の座標で微分するなら

$$
\frac{d^3f}{dt_B^3}=(2\pi i)^3K_B(q_B).
$$

古典項 $5u^3/6$ は $t_B$ 表示で $5(2\pi i)^3t_B^3/6$ になる。$t_B$ 表示でも古典項を単純に $5t_B^3/6$ と書くには、prepotential・偏極の規格化を**同時に**変更しなければならない。この係数を見落とすと、古典項だけでなくすべての級数係数を取り違える。

## 8. 演習と詳細解答

以下では第2〜6節の交代形式 $\mathsf Q$ と、指定しない限り $q=e^u$ を用いる。問題で周期の基底を指定した場合に限り、その基底と偏極を固定して計算する。

### Level A：基本式と規格化

<a id="ex-mir2-08-a01"></a>
#### MIR2-08-A01 交代形式の局所条件
- Level: A

$X^0=x,\ X^1=y,\ F_0=2x+y,\ F_1=x+3y$ とする。$(X^0,X^1)$ が局所座標であること、$\mathsf Q(\partial_x\Pi,\partial_y\Pi)=0$ を確認し、対応する $\mathscr F$ を一つ求めよ。

<!-- solution-start -->
**詳細解答**。座標写像 $(x,y)\mapsto(X^0,X^1)=(x,y)$ の微分行列（Jacobian）は

$$
\frac{\partial(X^0,X^1)}{\partial(x,y)}
=\begin{pmatrix}1&0\\0&1\end{pmatrix},\qquad \det=1.
$$

実際に逆写像も $(X^0,X^1)\mapsto(x,y)=(X^0,X^1)$ と書けるので、局所座標性が確認できる。$\partial_x\Pi=(1,0,2,1)$、$\partial_y\Pi=(0,1,1,3)$ なので

$$
\mathsf Q(\partial_x\Pi,\partial_y\Pi)=2\cdot0+1\cdot1-1\cdot1-0\cdot3=0.
$$

原始関数の候補 $\mathscr F=x^2+xy+\frac32y^2$ を微分すると $\partial_x\mathscr F=2x+y=F_0$、$\partial_y\mathscr F=x+3y=F_1$ となる。両方の偏微分条件を満たし、これは次数2同次である。
<!-- solution-end -->

<a id="ex-mir2-08-a02"></a>
#### MIR2-08-A02 同次関数の二つの微分
- Level: A

$f(s)=\frac56s^3$ とし、$\mathscr F=(X^0)^2f(X^1/X^0)$ を $X^0\ne0$ 上で考える。$\partial_0\mathscr F,\partial_1\mathscr F$ と $\mathscr F=\frac12(X^0F_0+X^1F_1)$ を検算せよ。

<!-- solution-start -->
**詳細解答**。$s=X^1/X^0$、$\partial_0s=-s/X^0$、$\partial_1s=1/X^0$ を用いて

$$
F_0=X^0(2f-sf')=X^0\left(\frac53s^3-\frac52s^3\right)
=-\frac56X^0s^3,
$$

$$
F_1=X^0f'=\frac52X^0s^2.
$$

従って $\frac12(X^0F_0+X^1F_1)=\frac12(X^0)^2(-5s^3/6+5s^3/2)=(X^0)^2(5s^3/6)=\mathscr F$ となる。
<!-- solution-end -->

<a id="ex-mir2-08-a03"></a>
#### MIR2-08-A03 三階結合の直接確認
- Level: A

$\widehat\Pi=(1,s,-5s^3/6,5s^2/2)$ とする。交代形式 $\mathsf Q(\widehat\Pi,\widehat\Pi''')$ を周期成分から計算せよ。

<!-- solution-start -->
**詳細解答**。$\widehat\Pi'=(0,1,-5s^2/2,5s)$、$\widehat\Pi''=(0,0,-5s,5)$、$\widehat\Pi'''=(0,0,-5,0)$。定義より $\mathsf Q(\widehat\Pi,\widehat\Pi''')=F_0\cdot0+F_1\cdot0-X^0\cdot(-5)-X^1\cdot0=5$。$\widehat\Pi'''$ の第3成分が負で、交代形式の定義にも負号があるため結果は正の5となる。
<!-- solution-end -->

<a id="ex-mir2-08-a04"></a>
#### MIR2-08-A04 指数項を三回積分する
- Level: A

$K(q)=5+6q+16q^2$ と $q=e^u$ が与えられた。$f'''(u)=K(e^u)$ を満たす $f$ を一つ構成し、各項を三回微分して確かめよ。

<!-- solution-start -->
**詳細解答**。$d^3(e^{du})/du^3=d^3e^{du}$ だから、次数1は $6/1^3=6$、次数2は $16/2^3=2$。$f=5u^3/6+6e^u+2e^{2u}$ と取ると、$f'''=5+6e^u+2\cdot8e^{2u}=5+6q+16q^2$ となる。
<!-- solution-end -->

<a id="ex-mir2-08-a05"></a>
#### MIR2-08-A05 二次項がYukawaを変えない理由
- Level: A

$f(s)=s^3$ と $\widetilde f(s)=s^3+2+3s+4s^2$ を考えよ。両者の三階微分と、$X^0=1,X^1=s$ のときの $\Delta F_0,\Delta F_1$ を求めよ。

<!-- solution-start -->
**詳細解答**。$f'''=\widetilde f'''=6$。差の二次式は $a=2,b=3,c=8$ と書ける。[周期のずれの公式](#prop-mir2-08-quadratic-period-shift)へ入れると $\Delta F_0=2a+bs=4+3s$、$\Delta F_1=b+cs=3+8s$。直接、$\Delta f'=3+8s$、$\Delta(2f-sf')=2(2+3s+4s^2)-s(3+8s)=4+3s$ と計算しても一致する。
<!-- solution-end -->

### Level B：存在条件・周期と係数を接続する

<a id="ex-mir2-08-b01"></a>
#### MIR2-08-B01 非閉一次形式の反例
- Level: B

$F_0(X^0,X^1)=X^1$、$F_1(X^0,X^1)=0$ に対し、$d(F_0dX^0+F_1dX^1)$ を求めよ。なぜ局所prepotentialが存在しないか、混合偏微分を使って説明せよ。

<!-- solution-start -->
**詳細解答**。$\alpha=X^1dX^0$ だから $d\alpha=dX^1\wedge dX^0=-dX^0\wedge dX^1\ne0$。仮に $F_I=\partial_I\mathscr F$ なら $\partial_1\partial_0\mathscr F=\partial_1F_0=1$、$\partial_0\partial_1\mathscr F=\partial_0F_1=0$ となる。正則関数の混合偏微分は等しいから矛盾。失われている仮定は異なる二方向についての直交性である。実際、$\partial_0\Pi=(1,0,0,0)$、$\partial_1\Pi=(0,1,1,0)$ だから $\mathsf Q(\partial_0\Pi,\partial_1\Pi)=-1\ne0$ となる。同じベクトルとの対 $\mathsf Q(d\Pi(V),d\Pi(V))=0$ だけでは原始関数の閉性を保証できない。
<!-- solution-end -->

<a id="ex-mir2-08-b02"></a>
#### MIR2-08-B02 交代形式を保つ行列の条件
- Level: B

任意の $2\times2$ 複素行列 $A$ について $(X,F)\mapsto(X,F+AX)$ を考える。すべての周期ベクトル対で $\mathsf Q$ が保存される必要十分条件が $A=A^{\mathsf T}$ であることを示し、反対称な $A=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ で破れる例を一つ作れ。

<!-- solution-start -->
**詳細解答**。二つのベクトル $(X,F),(Y,G)$ に対する新旧の差は

$$
(F+AX)^{\mathsf T}Y-X^{\mathsf T}(G+AY)
-(F^{\mathsf T}Y-X^{\mathsf T}G)
=X^{\mathsf T}(A^{\mathsf T}-A)Y.
$$

すべての $X,Y$ で零となる必要十分条件は $A^{\mathsf T}-A=0$。反対称例で $X=(1,0)^{\mathsf T},Y=(0,1)^{\mathsf T}$ とすると $A^{\mathsf T}-A=\begin{pmatrix}0&-2\\2&0\end{pmatrix}$ より差は $-2$、従って保存しない。
<!-- solution-end -->

<a id="ex-mir2-08-b03"></a>
#### MIR2-08-B03 quinticの二次係数を再構成
- Level: B

$K_B(q)=5+2875q+4876875q^2+O(q^3)$ とする。$f'''=K_B(e^u)$ の古典三次項と最初の二つの指数項を求め、三回微分して元の係数に戻ることを検証せよ。また得た二次係数を曲線本数と断定できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。$u^3$ の係数は $5/6$。$e^{du}$ は三階微分で $d^3$ 倍になるので、次数1の係数は2875、次数2の係数は $4876875/8$。従って $f=5u^3/6+2875e^u+(4876875/8)e^{2u}+O(e^{3u})$ が求める一つの原始関数である。三階微分すると $5+2875e^u+(4876875/8)\cdot8e^{2u}=5+2875q+4876875q^2$。ここで計算したのはB側の微分方程式の原始関数であり、[A/B一致の条件付き係数命題](../MIR2-07/index.md#prop-mir2-07-conditional-coefficients)の仮定はまだ証明していない。またA側GW数が得られたとしても、それは仮想不変量であり、曲線像の本数とは別である。
<!-- solution-end -->

<a id="ex-mir2-08-b04"></a>
#### MIR2-08-B04 対数座標のシフトと二次不定性の区別
- Level: B

$f(u)=5u^3/6+6e^u+2e^{2u}$ とする。(i) $f$ に $u^2$ を加える場合、(ii) $u'=u+\log2$ と座標を替えて $g(u')=f(u'-\log2)$ と書く場合の三階微分を比較せよ。

<!-- solution-start -->
**詳細解答**。(i) $(u^2)'''=0$ なので $(f+u^2)'''=5+6e^u+16e^{2u}$、変数 $q=e^u$ の係数は不変。(ii) $e^u=e^{u'-\log2}=e^{u'}/2$、$e^{2u}=e^{2u'}/4$ であり、

$$
g(u')=\frac56(u'-\log2)^3+3e^{u'}+\frac12e^{2u'}.
$$

三階微分すると $g'''(u')=5+3e^{u'}+4e^{2u'}$。$q'=e^{u'}=2q$ で展開するため係数は半分・四分の一になった。座標シフトは二次多項式の追加とは異なる。
<!-- solution-end -->

### Level C：特殊幾何とA/Bの論理境界を統合する

<a id="ex-mir2-08-c01"></a>
#### MIR2-08-C01 周期錐からprepotential、そしてquinticの係数まで
- Level: C

複素二次元の同次周期錐 $\Pi=(X^0,X^1,F_0,F_1)$ が、$\mathsf Q(d\Pi(V),d\Pi(W))=0$、$(X^0,X^1)$ の局所座標性、$X^0\ne0$ を満たすとする。

1. 混合偏微分の等式と局所prepotentialの存在を証明せよ。
2. $s=X^1/X^0$、$\mathscr F=(X^0)^2f(s)$ としたとき $F_0,F_1$ を求め、規格化周期の三次結合が $f'''$ となることを証明せよ。
3. 追加で $s=u_B=\operatorname{Log}q_B$、偏極の規格化が $K_B=5+2875q_B+4876875q_B^2+O(q_B^3)$ に一致すると仮定する。$f$ の一般形を二次の不定性まで求めよ。
4. この計算だけでA側の $N_1^X,N_2^X$ が決まるかを述べ、追加に必要な主張を明記せよ。

<!-- solution-start -->
**詳細解答**。

**(1) 閉性と存在。** $V=\partial_0,W=\partial_1$ とすると

$$
0=\mathsf Q(\partial_0\Pi,\partial_1\Pi)
=\partial_0F_1-\partial_1F_0.
$$

従って $\alpha=F_0dX^0+F_1dX^1$ の外微分は $d\alpha=(\partial_0F_1-\partial_1F_0)dX^0\wedge dX^1=0$。小さい単連結領域で原始関数 $\mathscr F$ が存在し $d\mathscr F=\alpha$。同次条件では $\mathscr F=\frac12\sum X^IF_I$ と選べる。これは混合偏微分の対称性とEuler式から $\partial_J\mathscr F=F_J$ と検証できる。

**(2) 周期の再構成。** $\partial_0s=-s/X^0$、$\partial_1s=1/X^0$ を使い

$$
F_0=X^0(2f-sf'),\qquad F_1=X^0f'.
$$

$X^0=1$ とすると $\widehat\Pi=(1,s,2f-sf',f')$。$(2f-sf')'''=-f'''-sf''''$、$(f')'''=f''''$ なので

$$
\mathsf Q(\widehat\Pi,\widehat\Pi''')
=-\{(-f'''-sf'''')+sf''''\}=f'''.
$$

**(3) 三回積分。** $d^3e^{du}/du^3=d^3e^{du}$ だから

$$
f(u_B)=\frac56u_B^3+2875q_B+\frac{4876875}{8}q_B^2
+O(q_B^3)+a+bu_B+\frac c2u_B^2.
$$

三回微分すると多項式不定性は消え、$q_B^2$ に $2^3=8$ が掛かって4876875に戻る。周期の追加分は $\Delta F_0=2aX^0+bX^1$、$\Delta F_1=bX^0+cX^1$ で、対称行列なので交代形式を保存する。

**(4) 論理の境界。** 今得たのはB側の周期とprepotentialの局所的な関係だけである。A側の[三点関数](../MIR2-05/index.md#prop-mir2-05-yukawa-series)と比較するには、$x=Qe^\tau$ を $q_B$ と同一視する形式代入に加え、$\iota(C^X_{HHH})=K_B$ という別の数学的等式が必要である。それを**仮定した場合に限り** $N_1^X=2875,N_2^X=4876875/8$ と言える。ミラー定理の証明や整数型曲線数の列挙を、この局所積分から導いたわけではない。
<!-- solution-end -->

## 9. 次講へ

特殊幾何により、偏極を持つ周期の錐から局所prepotentialを得る。規格化三次結合が分かれば、そのprepotentialは**二次以下の多項式を除いて**決まる。古典項 $5u^3/6$ と $d^{-3}$ の現れ方も、三回微分の逆操作で理解できた。

それでも、B側の級数がA側のGW不変量を数えるという核心は残る。次の MIR2-09 では、評価写像と子孫類を含むA側の $J$ 関数を構成し、さらに後の $I$ 関数・ミラー定理と接続する。

---

**参考文献**：[D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)；[K. Hori et al., *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)；[Candelas et al., *A Pair of Calabi–Yau Manifolds as an Exactly Soluble Superconformal Theory*](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。本講は局所特殊幾何の存在・微分計算を示し、積分周期基底の一意同定とA/Bミラー定理の証明は主張しない。
