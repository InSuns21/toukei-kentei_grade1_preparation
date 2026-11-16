# MIR2-06 量子接続と量子微分方程式

<!-- definition-example-audit: strict -->

## 1. 曲線を数える「積」を、変化を追う「方程式」にする

前講では、滑らかなquintic三次元多様体 $X$ の[因子方向の種数0ポテンシャル](../MIR2-05/index.md#def-mir2-05-potential)を三回微分すると、[A側Yukawa結合](../MIR2-05/index.md#prop-mir2-05-yukawa-series)が現れ、それが[大きい量子積とのペアリング](../MIR2-05/index.md#prop-mir2-05-pairing)に一致すると分かった。そこでは、曲線次数 $d$ を数える形式変数 $Q$ と、挿入する因子の係数 $t$ を区別した。

積は各 $t$ で計算できる。しかし、$t$ を変えたときに積がどう変わるかは、積表だけからは読みづらい。そこでコホモロジー類を成分とする未知関数 $s(t)$ を考え、**量子積による掛け算が、その関数の微分を決める**方程式を作る。これが量子微分方程式であり、その方程式をまとめた道具が量子接続である。

最小例は[射影直線の小量子積](../../GW/GW1-17/index.md#thm-gw1-17-p1-ring)である。$h$ を点類、$q$ を曲線次数を表すNovikov変数とすると、基底 $(1,h)$ 上では

$$
h*1=h,\qquad h*h=q\,1.
$$

未知関数を $s=a(q)\,1+b(q)\,h$ と置くと、$h$ を掛ける写像は

$$
h*s=qb\,1+a\,h
$$

である。したがって、微分を $D=q\,d/dq$ として $\hbar Ds=h*s$ と課せば、二つの連立方程式が得られる。ここで $\hbar$ は**逆元を持つ補助パラメータ**であり、B側の族の座標 $z$ とは別物である。後でこの連立系を手で解く。

## 2. 量子接続の定義：積作用素を微分へ組み込む

まず、複数の方向へ動かすときの一般形を定める。$V$ を有限次元の偶数次数コホモロジーの有理ベクトル空間とし、基底 $\phi_0,\ldots,\phi_{r-1}$ を固定する。$u^0,\ldots,u^{r-1}$ はその基底方向を表す形式変数、$Q$ は曲線次数用の形式変数とし、$R=\mathbb Q[[Q,u^0,\ldots,u^{r-1}]]$ を係数環とする。$V_R=V\otimes_{\mathbb Q}R$ はその上の自由加群である。

各点 $u$ で交換的な積 $*_u$ が $V_R$ に与えられているとする。各基底類を掛ける作用素 $C_i(u)$ は、入力 $v$ に対して $\phi_i*_u v$ を返す $R$-線形写像である。固定基底へ展開すれば行列になるが、**行列は定義そのものではなく、掛け算の結果を基底へ戻した表示**である。

例えば射影直線の基底を列 $(1,h)$ と並べると、上の積表から $C_h(1)=h$ と $C_h(h)=q\,1$ なので、入力列 $(a,b)^{\mathsf T}$ に対し

$$
C_h\begin{pmatrix}a\\b\end{pmatrix}
=\begin{pmatrix}qb\\a\end{pmatrix},
\qquad
[C_h]_{(1,h)}=\begin{pmatrix}0&q\\1&0\end{pmatrix}.
$$

この行列を作るには、**各列が基底ベクトルの像の座標**であることを先に確かめればよい。

<a id="def-mir2-06-quantum-connection"></a>

<!-- formal-statement-start -->
> **定義（Dubrovin型量子接続）**  
> $V_R$ と各積作用素 $C_i(u):v\mapsto\phi_i*_u v$ を上記のように定め、$\hbar$ を可逆な形式パラメータとする。自由加群 $V_R[\hbar,\hbar^{-1}]$ の各座標方向に対する量子接続を

$$
\nabla_i^{(\hbar)}s
:=\partial_{u^i}s-\hbar^{-1}C_i(u)s,
\qquad 0\le i<r
$$

> で定義する。$\partial_{u^i}$ は固定基底での係数だけを微分し、$Q,\hbar$ を固定する。接続が**平坦**であるとは、任意の $i,j$ について作用素の交換子 $[\nabla_i^{(\hbar)},\nabla_j^{(\hbar)}]$ が零になることをいう。
<!-- formal-statement-end -->

普通の偏微分 $\partial_{u^i}$ は積の変化を反映しない。そこから $\hbar^{-1}C_i$ を引くことで「変化と掛け算の釣合い」を測れる。接続は一般に $R$-線形ではなく、$f\in R$ に対して Leibniz 則

$$
\nabla_i^{(\hbar)}(fs)
=(\partial_{u^i}f)s+f\nabla_i^{(\hbar)}s
$$

を満たす。この一階の微分則が、単なる行列との違いである。

<!-- definition-example-start: def-mir2-06-quantum-connection -->
**定義の確認**。二つの基底を持つ $V$ と積作用素 $C_h$ の例で、$s=a\,1+b\,h$ を取る。固定基底における $\partial_t s=a'1+b'h$ と $C_hs=qb\,1+a\,h$ を別々に計算すると

$$
\nabla_t^{(\hbar)}s
=\left(a'-\frac q\hbar b\right)1
+\left(b'-\frac1\hbar a\right)h.
$$

ここで $q$ を固定した $t$ 微分なら上式に $q=q_0e^t$ を代入する（$q_0$ は固定した形式変数）。接続のLeibniz則を直接確かめるには $fs=(fa)1+(fb)h$ とし、$(fa)'=f'a+fa'$、$(fb)'=f'b+fb'$ を代入すればよい。一次元の $t$ 方向だけなら、異なる二方向の交換子が存在しないので平坦性は自動的に成り立つ。
<!-- definition-example-end -->

<a id="def-mir2-06-qde"></a>

<!-- formal-statement-start -->
> **定義（量子微分方程式と水平切断）**  
> 上の量子接続について、$V_R[\hbar,\hbar^{-1}]$ の元 $s$ が各方向で $\nabla_i^{(\hbar)}s=0$ を満たすとき、$s$ を水平切断と呼ぶ。その満たす連立系

$$
\hbar\,\partial_{u^i}s=C_i(u)s
\qquad(0\le i<r)
$$

> を量子微分方程式と呼ぶ。$Q$ の対数方向だけを用いる場合は、$D=Q\partial_Q$ を使い、対応する因子方向の式 $\hbar Ds=C_H(Q)s$ を考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir2-06-qde -->
**定義の確認**。上の $(1,h)$ の例では、$\hbar Ds=h*s$ は

$$
\hbar Da=qb,\qquad \hbar Db=a
$$

であり、両式を満たせば $\nabla_D^{(\hbar)}s=Ds-\hbar^{-1}C_hs=0$ である。逆に水平切断の二成分を比較すれば同じ式になる。$D$ は $q$ の冪 $q^d$ に $d$ を掛ける微分なので、$q$ を数値として固定した通常微分と区別する。
<!-- definition-example-end -->

## 3. いつ平坦になるか：二種類の条件を分ける

多変数の接続が平坦なら、$u^i$ と $u^j$ の順に微分しても結果は同じになる。接続の場合、単に $\partial_i\partial_j=\partial_j\partial_i$ と書くだけでは足りず、積作用素自身が $u$ とともに変化する項を計算しなければならない。

<a id="prop-mir2-06-curvature"></a>

<!-- formal-statement-start -->
> **命題（量子接続の曲率公式）**  
> $V_R$ 上の作用素 $C_i(u)$ を、固定基底で係数が $R$ に属する行列とし、$\nabla_i^{(\hbar)}=\partial_{u^i}-\hbar^{-1}C_i$ とする。このとき、任意の切断 $s$ に対し

$$
[\nabla_i^{(\hbar)},\nabla_j^{(\hbar)}]s
=-\hbar^{-1}(\partial_iC_j-\partial_jC_i)s
+\hbar^{-2}[C_i,C_j]s.
$$

> よって $\partial_iC_j=\partial_jC_i$ と $[C_i,C_j]=0$ がともに成り立てば平坦である。逆に $\hbar$ を独立な形式パラメータとする場合、全 $\hbar$ で平坦なら両条件が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

二回の共変微分を両方の順序で展開し、Leibniz則から $\partial_i(C_js)=(\partial_i C_j)s+C_j\partial_i s$ を取り出す。通常の二階偏微分と一次微分の交差項が消え、残った二項の符号を確認する。

<!-- proof-start -->
### 証明

$\partial_i=\partial_{u^i}$ と略す。最初に $\nabla_j s=\partial_js-\hbar^{-1}C_js$ を $\nabla_i$ へ代入する。

$$
\begin{aligned}
\nabla_i\nabla_js
={}&\partial_i(\partial_js-\hbar^{-1}C_js)
-\hbar^{-1}C_i(\partial_js-\hbar^{-1}C_js)\\
={}&\partial_i\partial_js
-\hbar^{-1}(\partial_iC_j)s
-\hbar^{-1}C_j\partial_is
-\hbar^{-1}C_i\partial_js
+\hbar^{-2}C_iC_js.
\end{aligned}
$$

$i$ と $j$ を交換した式は

$$
\begin{aligned}
\nabla_j\nabla_is
={}&\partial_j\partial_is
-\hbar^{-1}(\partial_jC_i)s
-\hbar^{-1}C_i\partial_js\\
&-\hbar^{-1}C_j\partial_is
+\hbar^{-2}C_jC_is.
\end{aligned}
$$

$R$ の形式偏微分は可換だから $\partial_i\partial_js-\partial_j\partial_is=0$。一次の切断の微分を含む二組も相殺する。差を取ると、主張の二項だけが残る。二つの条件が成り立てば交換子は零になる。

逆向きでは $\hbar^{-1}$ と $\hbar^{-2}$ は独立なLaurent単項式である。恒等的に零となるLaurent多項式の各係数は零なので、両条件が必要となる。
<!-- proof-end -->

次に、係数が本当にGWのポテンシャルから来る場合を調べる。固定した非退化なPoincaréペアリングを $\eta(\phi_a,\phi_b)=\eta_{ab}$、その逆行列を $\eta^{ab}$ と書く。**一つのスカラー関数を三回微分した値**から積を復元できれば、四回微分の順序交換が係数対称性を保証する。

<a id="thm-mir2-06-flatness"></a>

<!-- formal-statement-start -->
> **定理（ポテンシャルと結合律からの平坦性）**  
> $V$ を有限次元の偶数コホモロジー空間、$\eta$ を非退化な一定の対称ペアリングとし、形式級数 $\mathcal F(u,Q)$ の三階偏微分によって積の係数を

$$
C_{i\ell}^{\,k}(u)
=\sum_{m=0}^{r-1}\eta^{km}
\partial_i\partial_\ell\partial_m\mathcal F(u,Q)
$$

> と定める。これにより $\phi_i*_u\phi_\ell=\sum_k C_{i\ell}^{\,k}\phi_k$ とする。積 $*_u$ が全 $u$ で結合的・交換的であれば、上のDubrovin型量子接続は平坦である。種数0・偶数挿入の大きい量子積では、適用可能なGW公理を仮定すると、[WDVVによる結合律](../../GW/GW1-16/index.md#thm-gw1-16-associativity)がこの仮定を与える。
<!-- formal-statement-end -->

### 証明の見取り図

平坦性の二条件の由来は異なる。行列同士が可換なのは「同じ積をどの順序で掛けてもよい」ためであり、行列係数の交差微分が一致するのは「一つのポテンシャルの四階偏微分が対称」であるためである。**WDVVの結合律だけから、任意に与えた $u$ 依存行列の平坦性を主張しない**ことが重要である。

<!-- proof-start -->
### 証明

まず任意の $v\in V_R$ に対して、積の交換性と結合律より

$$
C_iC_jv
=\phi_i*_u(\phi_j*_uv)
=(\phi_i*_u\phi_j)*_uv
=\phi_j*_u(\phi_i*_uv)
=C_jC_iv
$$

だから $[C_i,C_j]=0$。

次に、基底 $\phi_\ell$ の係数を固定して $\partial_iC_j$ の $(k,\ell)$ 成分を計算する。$\eta^{km}$ は一定なので

$$
\begin{aligned}
(\partial_iC_j)^k{}_\ell
&=\partial_i\left(\sum_m\eta^{km}
\partial_j\partial_\ell\partial_m\mathcal F\right)\\
&=\sum_m\eta^{km}
\partial_i\partial_j\partial_\ell\partial_m\mathcal F\\
&=\sum_m\eta^{km}
\partial_j\partial_i\partial_\ell\partial_m\mathcal F
=(\partial_jC_i)^k{}_\ell.
\end{aligned}
$$

形式冪級数では偏微分の順序交換は各単項式について直接成立する。従って全成分で $\partial_iC_j=\partial_jC_i$。最後に[曲率公式](#prop-mir2-06-curvature)へ二条件を代入して交換子が零になる。

GW理論では、三点相関とその追加挿入を集めた種数0ポテンシャルが三階微分として積の係数を与え、四点の分裂公式がWDVV、ひいては結合律を与える。ただし非凸quinticで必要な仮想基本類・分裂公理は、[既習の仮想版の扱い](../MIR2-03/index.md#thm-mir2-03-divisor)と同じく外部数学的入力であり、この線形代数の証明だけで構成したわけではない。
<!-- proof-end -->

**反例：結合律だけでは足りない。** 基底 $(e_0,e_1)$ の可換結合代数で、$e_0$ を単位元、$e_1*e_1=u^0e_0$ とし、$C_0(u)=\begin{pmatrix}1&0\\0&1\end{pmatrix}$、$C_1(u)=\begin{pmatrix}0&u^0\\1&0\end{pmatrix}$ と置く。この積は各 $u$ で可換・結合的であり、$C_0C_1=C_1C_0$ だが、$\partial_{u^0}C_1=\begin{pmatrix}0&1\\0&0\end{pmatrix}$、$\partial_{u^1}C_0=0$ なので接続は平坦でない。これはあくまで交換する行列族の反例であり、一定単位元とPoincaréペアリングを伴うGWポテンシャルから得られる積の反例ではない。失われた仮定は**三階微分から係数を作る性質**である。

## 4. 射影直線の量子微分方程式を係数から解く

前述の[射影直線の量子環](../../GW/GW1-17/index.md#thm-gw1-17-p1-ring)に戻る。曲線変数を $q$ とし、$D=q\,d/dq$、$\hbar$ は可逆とする。因子公理により、因子方向 $t h$ の積の $q$ 依存は $q e^t$ に置き換わるので、$q$ の対数方向の微分 $D$ は、$q$ を固定した $\partial_t$ と、**$q e^t$ にのみ依存する関数に限り**対応する。

<a id="prop-mir2-06-p1-qde"></a>

<!-- formal-statement-start -->
> **命題（射影直線の量子微分方程式）**  
> $\mathbb P^1$ の基底 $(1,h)$、小量子積 $h*h=q\,1$、$D=q\,d/dq$ に対し、$s=a(q)\,1+b(q)\,h$ が $\hbar Ds=h*s$ を満たすことと、次の連立系は同値である。

$$
\hbar Da=qb,\qquad \hbar Db=a.
$$

> 従って $b$ は次の二階スカラー方程式を満たす。

$$
(\hbar D)^2b=qb.
$$

> $b(0)=1$ とした $q$-進形式冪級数解は一意であり、

$$
b(q)=\sum_{d\ge0}\frac{q^d}{\hbar^{2d}(d!)^2},
\qquad a(q)=\hbar Db(q)
$$

> で与えられる。ここで係数は $\mathbb Q[\hbar,\hbar^{-1}][[q]]$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

積の行列で成分系を作り、第二式から $a=\hbar Db$ を取り出して第一式へ代入する。冪級数を $b=\sum b_dq^d$ と書けば、$D(q^d)=dq^d$ なので、二階方程式は $(\hbar d)^2b_d=b_{d-1}$ という漸化式に変わる。

<!-- proof-start -->
### 証明

積表を用いて右辺を展開すると、$h*s=h*(a1+bh)=ah+bq\,1$ である。一方、左辺は $\hbar Ds=\hbar(Da)1+\hbar(Db)h$ なので、基底 $(1,h)$ の一次独立性から連立系を得る。

第二式を使って $a=\hbar Db$。これを第一式へ代入すると

$$
\hbar Da=\hbar D(\hbar Db)=\hbar^2D^2b=qb
$$

となる。$\hbar$ は $q$ に依存しないから $D\hbar=0$ である。逆に $b$ が二階式を満たし $a=\hbar Db$ と定めれば、二本の元の式を満たす。

$b=\sum_{d\ge0}b_dq^d$ と置き、$Dq^d=dq^d$ を二回使うと

$$
\hbar^2D^2b
=\sum_{d\ge0}\hbar^2d^2b_dq^d,\qquad
qb=\sum_{d\ge1}b_{d-1}q^d.
$$

定数項では $0=0$ で $b_0$ は自由、$d\ge1$ では $b_d=b_{d-1}/(\hbar^2d^2)$。$b_0=1$ を選んで帰納すると

$$
b_d=\frac1{\hbar^{2d}(1\cdot2\cdots d)^2}
=\frac1{\hbar^{2d}(d!)^2}.
$$

各係数を独立に決めるので解析的収束は不要であり、初期定数項を指定した形式解の一意性も従う。
<!-- proof-end -->

実際の初項は

$$
b=1+\frac{q}{\hbar^2}+\frac{q^2}{4\hbar^4}
+\frac{q^3}{36\hbar^6}+\cdots,\qquad
a=\frac q\hbar+\frac{q^2}{2\hbar^3}
+\frac{q^3}{12\hbar^5}+\cdots.
$$

$h$ を掛けると $h*s=qb\,1+a\,h$ なので、両成分の係数を代入して直接検算できる。**一般の水平切断すべてが $q$ の通常の冪級数になるわけではない**。もう一つの局所解には対数項が現れる。ここでは $b(0)=1$ の正則な形式解を構成した。

## 5. 射影平面：三階の方程式が現れる理由

[射影平面の量子積表](../../GW/GW1-17/index.md#thm-gw1-17-p2-products)によれば、基底 $(1,H,H^2)$ において

$$
H*1=H,\quad H*H=H^2,\quad H*H^2=q\,1.
$$

列ベクトルの各列がこの三つの像を表すので、$C_H$ は

$$
C_H=\begin{pmatrix}0&0&q\\1&0&0\\0&1&0\end{pmatrix}.
$$

<a id="prop-mir2-06-p2-qde"></a>

<!-- formal-statement-start -->
> **命題（射影平面の三階量子微分方程式）**  
> $\mathbb P^2$ の小量子積を上記のとおりとし、$s=a\,1+bH+cH^2$ が $\hbar Ds=H*s$ を満たすなら、

$$
\hbar Da=qc,\qquad
\hbar Db=a,\qquad
\hbar Dc=b.
$$

> 特に $c$ は $(\hbar D)^3c=qc$ を満たす。$c(0)=1$ の形式冪級数解は

$$
c(q)=\sum_{d\ge0}\frac{q^d}{\hbar^{3d}(d!)^3},
\quad b=\hbar Dc,\quad a=(\hbar D)^2c
$$

> であり、$q$-進形式級数として一意である。
<!-- formal-statement-end -->

### 証明の見取り図

射影直線と同じ計算を三段に延ばす。積表から $H*s=qc\,1+aH+bH^2$、最後の二式から $a=(\hbar D)^2c$ を求め、残った第一式が三階方程式になる。

<!-- proof-start -->
### 証明

$H*s=aH+bH^2+cq\,1$ と $\hbar Ds=\hbar(Da)1+\hbar(Db)H+\hbar(Dc)H^2$ の係数比較で連立系が成立する。第三式から $b=\hbar Dc$、第二式に代入して $a=\hbar D(\hbar Dc)=(\hbar D)^2c$。第一式より $(\hbar D)^3c=qc$。

$c=\sum_{d\ge0}c_dq^d$ を代入すると、左辺の $q^d$ 係数は $\hbar^3d^3c_d$、右辺の $d\ge1$ 係数は $c_{d-1}$ である。$c_0=1$ として

$$
c_d=\frac{c_{d-1}}{\hbar^3d^3}
=\frac1{\hbar^{3d}(d!)^3}.
$$

この係数が全次数で一意であること、$b,a$ が元の連立系を満たすことも同じ代入で確認できる。
<!-- proof-end -->

射影直線では基底が二つ、射影平面では三つで、生成元を一つずつ掛けることで成分が循環する。そのため二階、三階という次数の違いが生じた。これは**積表の情報を微分方程式へ移した**結果であり、すべての標的で自動的に同じ階数になるという主張ではない。

## 6. quinticの因子方向：何が得られ、何がまだ得られないか

滑らかなquintic $X\subset\mathbb P^4$ のambient偶数コホモロジーを

$$
V_{\mathrm{amb}}=\operatorname{span}_{\mathbb Q}\{1,H,H^2,H^3\}
$$

とする。[因子方向の大きい量子積](../MIR2-04/index.md#prop-mir2-04-big-divisor)を $x=Qe^t$ と書けば

$$
H*_{tH,Q}H=A(x)H^2,\quad
H*_{tH,Q}H^2=H^3,\quad
H*_{tH,Q}H^3=0,
\qquad
A(x)=\frac15Y_A^X(t,Q).
$$

ここで $A(x)=1+\sum_{d\ge1}d^3N_d^Xx^d/5$ は[三点関数の式](../MIR2-05/index.md#prop-mir2-05-yukawa-series)から得たものである。これは $x$ の定数項が1なので可逆である。

<a id="prop-mir2-06-quintic-system"></a>

<!-- formal-statement-start -->
> **命題（quinticのambient量子微分系）**  
> $X$ を滑らかなquintic三次元多様体とし、$\hbar$ を可逆とする。$s(t,Q)=a_0\,1+a_1H+a_2H^2+a_3H^3$ が因子方向の量子微分方程式

$$
\hbar\partial_t s=H*_{tH,Q}s
$$

> を満たすことと、以下の四本の成分方程式は同値である。

$$
\hbar a_0'=0,\qquad
\hbar a_1'=a_0,\qquad
\hbar a_2'=A(Qe^t)a_1,\qquad
\hbar a_3'=a_2.
$$

> この $t$ 方向一本の接続は常に平坦である。ただし、この事実だけではB側のPicard–Fuchs作用素との一致もquinticのミラー定理も従わない。
<!-- formal-statement-end -->

### 証明の見取り図

[ambient積表](../MIR2-04/index.md#prop-mir2-04-product-table)から各基底ベクトルに $H$ を掛け、入力列の四成分を順番に読み取る。最後に一次元接続には $dt\wedge dt$ に対応する曲率が存在しないことを確認する。

<!-- proof-start -->
### 証明

各基底の像は $H*1=H$、$H*H=A(x)H^2$、$H*H^2=H^3$、$H*H^3=0$ である。従って

$$
H*_{tH,Q}s
=0\cdot1+a_0H+A(x)a_1H^2+a_2H^3.
$$

左辺 $\hbar\partial_t s=\sum_{i=0}^3\hbar a_i'H^i$ と四成分を比較すると表示した連立系を得る。逆に連立系が成立すれば各基底成分が等しいのでベクトル方程式が成立する。

$t$ 方向一つだけなら、曲率の添字は $(t,t)$ しかなく $[\nabla_t,\nabla_t]=0$ は任意の作用素について成立する。これは第3節の**複数方向**の平坦性とは異なる。従って一次元に制限して平坦だったというだけで、quinticに対する一般の仮想GW公理やB側との対応を証明したことにはならない。
<!-- proof-end -->

**定数項の具体例**。$Q=0$ とすると $A(0)=1$ である。初期値 $a_0(0)=1$、$a_1(0)=a_2(0)=a_3(0)=0$ なら、順に積分して

$$
a_0=1,\quad a_1=\frac t\hbar,\quad
a_2=\frac{t^2}{2\hbar^2},\quad
a_3=\frac{t^3}{6\hbar^3}.
$$

四式へ実際に代入すれば、$\hbar a_1'=1$、$\hbar a_2'=t/\hbar$、$\hbar a_3'=t^2/(2\hbar^2)$ となる。古典極限の例を解いたのであり、正次数のquintic曲線数を求めたのではない。

**比較の境界**。B側では[Picard–Fuchs作用素](../MIR1-10/index.md#thm-mir1-10-picard-fuchs)と[ミラー写像](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)を既に構成した。しかし今の量子微分系は**A側のGW積を係数**としているだけで、A側の水平切断とB側の周期を同一視するための $I/J$ 関数、規格化、ミラー定理をまだ使っていない。これらは後続講で導入する。二つの方程式がともに四階の記述を持つことだけを根拠に同一だとは言えない。

## 7. 演習と詳細解答

以下では $\hbar$ を可逆な補助パラメータ、$D=q\,d/dq$ とする。既習の積表を使うときは、古典カップ積と量子積、曲線変数 $q$ と因子座標 $t$ を区別する。

### Level A：行列・微分・係数の確認

<a id="ex-mir2-06-a01"></a>
#### MIR2-06-A01 基底像から行列を作る
- Level: A

$V=\mathbb Q[[q]]\{1,h\}$、$h*1=h$、$h*h=q\,1$ とする。$C_h$ を基底 $(1,h)$ の行列で表し、$C_h(2\,1+3h)$ を求めよ。

<!-- solution-start -->
**詳細解答**。第1列は $h*1=h=0\,1+1h$、第2列は $h*h=q\,1+0h$ の座標なので、

$$
C_h=\begin{pmatrix}0&q\\1&0\end{pmatrix}.
$$

入力の座標列は $(2,3)^{\mathsf T}$ だから、積を掛けると $(3q,2)^{\mathsf T}$。従って $C_h(2\,1+3h)=3q\,1+2h$ である。列を「出力の基底係数」として読むので転置しない。
<!-- solution-end -->

<a id="ex-mir2-06-a02"></a>
#### MIR2-06-A02 Leibniz則の確認
- Level: A

$\nabla=\partial_t-\hbar^{-1}C(t)$ を定義し、$s(t)$ をベクトル値形式級数、$f(t)$ をスカラー形式級数とする。$\nabla(fs)=f's+f\nabla s$ を証明せよ。

<!-- solution-start -->
**詳細解答**。積作用素 $C$ はスカラー係数に線形だから $C(fs)=fCs$。係数の通常の積の微分により $\partial_t(fs)=f's+fs'$。従って

$$
\nabla(fs)=f's+fs'-\hbar^{-1}fCs
=f's+f(s'-\hbar^{-1}Cs)
=f's+f\nabla s.
$$

$\nabla$ は $f$ を微分するため、一般には $R$-線形でない。
<!-- solution-end -->

<a id="ex-mir2-06-a03"></a>
#### MIR2-06-A03 対数微分を二回行う
- Level: A

$D=q\,d/dq$ について $D(q^d)$、$D^2(q^d)$ を求めよ。また $b=1+c_1q+c_2q^2$ の $(\hbar D)^2b$ を求めよ。

<!-- solution-start -->
**詳細解答**。$d\ge0$ に対し通常の微分で $(q^d)'=dq^{d-1}$、従って $D(q^d)=dq^d$。さらに $D(dq^d)=d^2q^d$。与えられた $b$ には定数項の寄与がないので、

$$
(\hbar D)^2b
=\hbar^2\bigl(c_1q+4c_2q^2\bigr).
$$

係数 $4$ は二階の微分で現れる $2^2$ に由来し、通常の二階微分の $2$ とは異なる。
<!-- solution-end -->

<a id="ex-mir2-06-a04"></a>
#### MIR2-06-A04 射影直線の形式解の初項
- Level: A

$(\hbar D)^2b=qb$、$b(0)=1$ の $q^0,q^1,q^2$ 係数を比較して $b_1,b_2$ を求めよ。

<!-- solution-start -->
**詳細解答**。$b=\sum_{d\ge0}b_dq^d$ と置くと $d\ge1$ で $\hbar^2d^2b_d=b_{d-1}$。$d=1$ に代入して $\hbar^2b_1=b_0=1$ より $b_1=\hbar^{-2}$。$d=2$ なら $4\hbar^2b_2=b_1=\hbar^{-2}$ より $b_2=(4\hbar^4)^{-1}$。従って $b=1+q/\hbar^2+q^2/(4\hbar^4)+O(q^3)$ である。
<!-- solution-end -->

<a id="ex-mir2-06-a05"></a>
#### MIR2-06-A05 小量子積の古典極限
- Level: A

$\mathbb P^1$ の $C_h(q)$ と $\mathbb P^2$ の $C_H(q)$ を $q=0$ に特殊化せよ。どの古典的な積に対応するかを示せ。

<!-- solution-start -->
**詳細解答**。[射影空間の積表](../../GW/GW1-17/index.md#thm-gw1-17-p2-products)によれば、$\mathbb P^1$ は $C_h(0)=\begin{pmatrix}0&0\\1&0\end{pmatrix}$ となり、$h\smile1=h$、$h\smile h=0$ に対応する。$\mathbb P^2$ は

$$
C_H(0)=\begin{pmatrix}0&0&0\\1&0&0\\0&1&0\end{pmatrix}
$$

であり、$H\smile1=H$、$H\smile H=H^2$、$H\smile H^2=0$ に対応する。$q=0$ は形式冪級数の定数項を取る操作なので、この特殊化は常に定義される。
<!-- solution-end -->

### Level B：平坦性と消去の論証

<a id="ex-mir2-06-b01"></a>
#### MIR2-06-B01 曲率の二つの項を直接導く
- Level: B

$\nabla_i=\partial_i-\hbar^{-1}C_i$、$\nabla_j=\partial_j-\hbar^{-1}C_j$ について、切断 $s$ への作用を両順序で展開し、平坦性に必要な二条件を導け。

<!-- solution-start -->
**詳細解答**。[曲率の命題](#prop-mir2-06-curvature)を検算する。まず積の微分則で $\partial_i(C_js)=(\partial_iC_j)s+C_j\partial_i s$。従って

$$
\nabla_i\nabla_js=\partial_i\partial_js
-\hbar^{-1}(\partial_iC_j)s
-\hbar^{-1}C_j\partial_i s
-\hbar^{-1}C_i\partial_j s
+\hbar^{-2}C_iC_js.
$$

添字を交換した式との差で、通常の混合二階微分と切断の一次微分は消える。残りは

$$
[\nabla_i,\nabla_j]s
=-\hbar^{-1}(\partial_iC_j-\partial_jC_i)s
+\hbar^{-2}(C_iC_j-C_jC_i)s.
$$

$\hbar$ が独立の可逆形式変数なら、二つの冪の係数を別々に零とする必要がある。従って $\partial_iC_j=\partial_jC_i$ と $[C_i,C_j]=0$ である。
<!-- solution-end -->

<a id="ex-mir2-06-b02"></a>
#### MIR2-06-B02 射影平面の三階式を再構成する
- Level: B

$\mathbb P^2$ の積 $H*1=H$、$H*H=H^2$、$H*H^2=q\,1$ を与える。$s=a+bH+cH^2$ から三つの成分式、$c$ のスカラー式、および $c_2$ を求めよ。ただし $c_0=1$ とする。

<!-- solution-start -->
**詳細解答**。$H*s=qc\,1+aH+bH^2$ を固定基底の成分で比較して $\hbar Da=qc$、$\hbar Db=a$、$\hbar Dc=b$。第三式から $b=\hbar Dc$、第二式から $a=(\hbar D)^2c$、第一式より $(\hbar D)^3c=qc$ を得る。

$c=\sum c_dq^d$ として $d\ge1$ の係数を取れば $\hbar^3d^3c_d=c_{d-1}$。$d=1$ で $c_1=\hbar^{-3}$、$d=2$ で $8\hbar^3c_2=\hbar^{-3}$ だから $c_2=(8\hbar^6)^{-1}$ である。したがって $c=1+q/\hbar^3+q^2/(8\hbar^6)+O(q^3)$。
<!-- solution-end -->

<a id="ex-mir2-06-b03"></a>
#### MIR2-06-B03 三階微分による平坦性を証明する
- Level: B

非退化で一定の $\eta$ と形式ポテンシャル $F$ により $C_{i\ell}^{\,k}=\sum_m\eta^{km}\partial_i\partial_\ell\partial_mF$ と定め、積が可換結合的と仮定する。第3節の曲率の二条件をそれぞれ別の理由から証明せよ。

<!-- solution-start -->
**詳細解答**。まず任意の $v$ について $C_iC_jv=\phi_i*(\phi_j*v)=(\phi_i*\phi_j)*v=\phi_j*(\phi_i*v)=C_jC_iv$ なので $[C_i,C_j]=0$。次に $(k,\ell)$ 成分で微分すると

$$
\partial_i(C_j)^k{}_\ell
=\sum_m\eta^{km}\partial_i\partial_j\partial_\ell\partial_mF
=\sum_m\eta^{km}\partial_j\partial_i\partial_\ell\partial_mF
=\partial_j(C_i)^k{}_\ell.
$$

一定の $\eta$ なので逆行列は微分されず、形式微分の可換性により真ん中の等号が成り立つ。これで係数の対称性と行列の可換性の両方を検証した。[曲率公式](#prop-mir2-06-curvature)に代入すると平坦である。
<!-- solution-end -->

<a id="ex-mir2-06-b04"></a>
#### MIR2-06-B04 quinticの古典水平切断
- Level: B

quinticの $Q=0$ の量子微分系で $a_0(0)=0,a_1(0)=1,a_2(0)=a_3(0)=0$ とする。四成分を順次解き、元の式へ代入して確認せよ。

<!-- solution-start -->
**詳細解答**。[quinticの成分系](#prop-mir2-06-quintic-system)で $Q=0$ とすれば $A(0)=1$。第一式 $\hbar a_0'=0$ と初期値から $a_0=0$、第二式 $\hbar a_1'=a_0=0$ から $a_1=1$。第三式 $\hbar a_2'=a_1=1$ から $a_2=t/\hbar$、第四式 $\hbar a_3'=a_2=t/\hbar$ から $a_3=t^2/(2\hbar^2)$ である。従って

$$
s(t)=H+\frac t\hbar H^2+\frac{t^2}{2\hbar^2}H^3.
$$

左辺は $\hbar\partial_ts=H^2+(t/\hbar)H^3$。一方、$Q=0$ での積は古典カップ積だから、$H\smile s=H^2+(t/\hbar)H^3$。両辺が一致し、初期値も満たされている。
<!-- solution-end -->

### Level C：導出・平坦性・ミラー比較の総合

<a id="ex-mir2-06-c01"></a>
#### MIR2-06-C01 量子積から微分系へ、どこまで証明したか
- Level: C

次のすべてを示せ。

1. $\mathbb P^1$ の積 $h*h=q\,1$ と $\mathbb P^2$ の積 $H*H^2=q\,1$ から、それぞれの積作用素行列を基底像を使って構成せよ。
2. $\hbar Ds=C_Hs$ から二階・三階のスカラー方程式を導き、初期定数項1の解を $q^2$ まで計算せよ。
3. 一般の多変数の量子接続が平坦であるため、交換する積作用素以外に何を確認すべきかを、曲率の式と四階微分から示せ。
4. quinticの $H*H=A(Qe^t)H^2$ から因子方向の四成分系を示し、その系だけからB側周期との一致を断定できない理由を述べよ。

<!-- solution-start -->
**詳細解答**。

**1. 行列の列**。$\mathbb P^1$ の基底を $(1,h)$ とすると、$C_h(1)=h$ と $C_h(h)=q\,1$ から

$$
C_h^{\mathbb P^1}=
\begin{pmatrix}0&q\\1&0\end{pmatrix}.
$$

$\mathbb P^2$ の基底 $(1,H,H^2)$ では $C_H(1)=H$、$C_H(H)=H^2$、$C_H(H^2)=q\,1$ から

$$
C_H^{\mathbb P^2}=
\begin{pmatrix}0&0&q\\1&0&0\\0&1&0\end{pmatrix}.
$$

**2. 成分消去と係数**。$\mathbb P^1$ で $s=a\,1+b\,h$ とすると $\hbar Da=qb$、$\hbar Db=a$、従って $(\hbar D)^2b=qb$。$b_0=1$ として $\hbar^2d^2b_d=b_{d-1}$ から $b_1=\hbar^{-2}$、$b_2=(4\hbar^4)^{-1}$ であり、

$$
b=1+\frac q{\hbar^2}+\frac{q^2}{4\hbar^4}+O(q^3).
$$

$\mathbb P^2$ で $s=a+bH+cH^2$ とすると $\hbar Da=qc$、$\hbar Db=a$、$\hbar Dc=b$。後二式から $a=(\hbar D)^2c$、第一式へ代入して $(\hbar D)^3c=qc$。$c_0=1$ のとき $\hbar^3d^3c_d=c_{d-1}$ から $c_1=\hbar^{-3}$、$c_2=(8\hbar^6)^{-1}$ だから

$$
c=1+\frac q{\hbar^3}+\frac{q^2}{8\hbar^6}+O(q^3).
$$

**3. 平坦性の根拠**。[曲率公式](#prop-mir2-06-curvature)は

$$
[\nabla_i,\nabla_j]
=-\hbar^{-1}(\partial_iC_j-\partial_jC_i)
+\hbar^{-2}[C_i,C_j]
$$

である。可換・結合的な積から $C_iC_j=C_jC_i$ が従う一方、$C_{j\ell}^{\,k}=\eta^{km}\partial_j\partial_\ell\partial_mF$ の添字 $m$ を和で取れば、$\partial_iC_{j\ell}^{\,k}=\eta^{km}\partial_i\partial_j\partial_\ell\partial_mF$ と計算できる。偏微分の順序交換と $\eta$ が一定なことから $\partial_iC_j=\partial_jC_i$ も成立する。片方だけでは曲率のもう一方の項が残る。

**4. quinticの系と論理的境界**。[ambient積表](../MIR2-04/index.md#prop-mir2-04-product-table)で $H*1=H$、$H*H=A(x)H^2$、$H*H^2=H^3$、$H*H^3=0$、$x=Qe^t$ とする。$s=\sum_{i=0}^3a_iH^i$ に掛けると $H*s=a_0H+A(x)a_1H^2+a_2H^3$。従って

$$
\hbar a_0'=0,\quad
\hbar a_1'=a_0,\quad
\hbar a_2'=A(x)a_1,\quad
\hbar a_3'=a_2.
$$

ここで $A(x)$ に含まれる $N_d^X$ はA側の仮想GW数であり、B側の周期は別の族に属する。[B側のPicard–Fuchs方程式](../MIR1-10/index.md#thm-mir1-10-picard-fuchs)が既知でも、水平切断の規格化と対応、$I/J$ の関係、ミラー定理の外部入力はまだ得ていない。一次元の平坦性や「両方四階」という形式的な類似から一致を推論することはできない。
<!-- solution-end -->

## 8. 次講で何を比較するか

今回の結論は、量子積がそのまま行列係数 $C_i$ になり、Dubrovin型接続の水平切断が線形微分方程式を満たすことである。多変数での平坦性には、**積作用素の可換性（結合律）**と**係数の交差微分対称性（ポテンシャル）**の二つが必要だった。

射影直線と射影平面では積表から二階・三階の方程式と正則形式解を構成した。quinticの因子方向では四成分の系まで導いたが、B側の周期との同一視はまだ行っていない。次の MIR2-07 では[B側Yukawa結合](../MIR1-16/index.md#def-mir1-16-b-yukawa)の座標変換と規格化を詳しく調べ、比較する際の変数・正規化のずれを解消する。

---

**参考文献**：D. Cox / S. Katz, *Mirror Symmetry and Algebraic Geometry*, 第10–11章；K. Hori et al., *Mirror Symmetry*（Clay Mathematics Monographs）, 量子微分方程式に関する節。引用したGWの一般的平坦性では、種数0の一次不変量とWDVVを数学的入力とする。
