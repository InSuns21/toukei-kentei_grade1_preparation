# HPDE1 1+1次元波動方程式の初期値解

[PDE4のd'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)では弦の振動を初期変位と初速度から求めました。一方、[LORG6の因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)は、光速以下の曲線で到達できる事象の集合でした。**解の積分区間と時空の光円錐はどう対応するのでしょうか。**

この章では、一次元波動方程式を1+1次元Minkowski時空上の作用素として読み直し、初期値解を光的座標から再導出・直接検算した後で、**因果的支持の包含**と**初期区間の依存領域**を証明・比較します。一般の曲がった時空へ進む前に、平坦な模型で幾何と解析の接続を紙の上で確かめます。

空間変数を $x\in\mathbb R$、時間を $t\ge0$、波の速さを $c>0$ とします。初期変位を $f\in C^2(\mathbb R)$、初速度を $h\in C^1(\mathbb R)$ と記します。計量を表す $g$ と混同しないため、速度には $h$ を使います。解は二階連続微分可能な古典解とします。

## 1. Lorentz計量と波動作用素

[LORG1で定義したLorentz内積](../../../幾何系/LORG/LORG1/index.md#def-lorg1-lorentz-inner-product)を、空間の目盛を $x/c$ に縮めて表示すると

$$
g_c=-dt^2+c^{-2}dx^2
$$

です。これは $v=(v^t,v^x)$、$w=(w^t,w^x)$ に $g_c(v,w)=-v^tw^t+c^{-2}v^xw^x$ を対応させる対称双線形形式です。基底上での行列は $\operatorname{diag}(-1,c^{-2})$ なので、行列式 $-c^{-2}\ne0$ と負の方向一つ・正の方向一つを直接確認できます。未来向きは $t$ の増加方向とします。

この行列の逆は $\operatorname{diag}(-1,c^2)$ です。定数係数模型ではその成分が二階微分の係数を決めます。曲がった時空での一般的な作用素を導入する前に、平坦な場合を定めましょう。

<a id="def-hpde1-flat-wave-operator"></a>

<!-- formal-statement-start -->
> **定義（1+1次元平坦波動作用素）**  
> $c>0$ とし、$g_c=-dt^2+c^{-2}dx^2$ を持つ平面上の $C^2$ 関数 $u$ に対し、

$$
\Box_{g_c}u=-u_{tt}+c^2u_{xx},\qquad
P_cu=-\Box_{g_c}u=u_{tt}-c^2u_{xx}
$$

> と定める。$P_cu=0$ を斉次波動方程式という。時間の増加する向きを未来向きとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde1-flat-wave-operator -->
### 直接例：進行波を計量・方程式の両側から確認する

**定義の確認**：$u(t,x)=\sin(x-ct)$ は $C^\infty$ です。$u_t=-c\cos(x-ct)$、$u_{tt}=-c^2\sin(x-ct)$、$u_x=\cos(x-ct)$、$u_{xx}=-\sin(x-ct)$ より

$$
P_cu=-c^2\sin(x-ct)+c^2\sin(x-ct)=0.
$$

波形上の点が動く曲線 $\gamma(s)=(s,cs)$ の速度は $(1,c)$ です。計量に入れると

$$
g_c(\dot\gamma,\dot\gamma)=-1+c^{-2}c^2=0
$$

で、時間成分 $1>0$ なので[LORG1の未来錐](../../../幾何系/LORG/LORG1/index.md#def-lorg1-future-cone)の境界を進みます。波形の移動する方向と、計量で定める光的方向が一致しました。
<!-- definition-example-end -->

$P_c=-\Box_{g_c}$ という符号は、後に扱う通常双曲型作用素の規約に合わせています。斉次方程式では全体の符号を反転しても解は同じですが、源を加える場合には重要です。

## 2. 光的座標から公式を導く

波形 $F(x-ct)$ は $x-ct=\text{const}$ に沿って右へ、$G(x+ct)$ は $x+ct=\text{const}$ に沿って左へ進みます。そこで

$$
\xi=x-ct,\qquad \eta=x+ct,\qquad
x=\frac{\xi+\eta}{2},\quad t=\frac{\eta-\xi}{2c}
$$

を座標として使います。$c>0$ なので変換は可逆です。$v(\xi,\eta)=u(t,x)$ と書きます。

<a id="prop-hpde1-null-factorization"></a>

<!-- formal-statement-start -->
> **命題（光的座標での波動作用素の因子分解）**  
> $c>0$、$u\in C^2(\mathbb R^2)$ とし、$v(\xi,\eta)=u((\eta-\xi)/(2c),(\xi+\eta)/2)$ と置く。このとき

$$
P_cu=-4c^2v_{\xi\eta}
$$

> が対応する点で成立する。ゆえに $P_cu=0$ と $v_{\xi\eta}=0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

新座標の連鎖律を二回使うと、時間微分と空間微分に同じ純二階項が現れ、差を取ることで混合微分だけが残ります。

<!-- proof-start -->
### 証明

[RA3の連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule)より

$$
u_t=-cv_\xi+cv_\eta,\qquad u_x=v_\xi+v_\eta.
$$

再び微分します。$v_{\xi\eta}=v_{\eta\xi}$ は $C^2$ の仮定から成立するので、

$$
\begin{aligned}
u_{tt}
&=-c(-cv_{\xi\xi}+cv_{\xi\eta})+c(-cv_{\eta\xi}+cv_{\eta\eta})\\
&=c^2v_{\xi\xi}-2c^2v_{\xi\eta}+c^2v_{\eta\eta},\\
c^2u_{xx}
&=c^2(v_{\xi\xi}+v_{\xi\eta}+v_{\eta\xi}+v_{\eta\eta})\\
&=c^2v_{\xi\xi}+2c^2v_{\xi\eta}+c^2v_{\eta\eta}.
\end{aligned}
$$

引き算すると $u_{tt}-c^2u_{xx}=-4c^2v_{\xi\eta}$ です。係数は $c>0$ より零でないので同値性も従います。
<!-- proof-end -->

$v_{\xi\eta}=0$ なら、$v_\xi$ は $\eta$ に依存しません。$\xi$ で一度積分し、残る $\eta$ だけの項を $G(\eta)$ と書くと $v(\xi,\eta)=F(\xi)+G(\eta)$ です。従って全ての古典解は

$$
u(t,x)=F(x-ct)+G(x+ct)
$$

という右向き波・左向き波の和で表されます。

## 3. 初期変位と初速度の代入検算

$u(0,x)=f(x)$、$u_t(0,x)=h(x)$ を要求すると

$$
F(x)+G(x)=f(x),\qquad -cF'(x)+cG'(x)=h(x).
$$

第一式を微分した $F'+G'=f'$ と組み合わせれば

$$
F'=\frac12f'-\frac{h}{2c},\qquad
G'=\frac12f'+\frac{h}{2c}
$$

です。基準点 $x_*$ を固定して $H(x)=\int_{x_*}^xh(y)\,dy$ とすれば $H'=h$ ですから、

$$
F=\frac12f-\frac{H}{2c}+C_F,\qquad
G=\frac12f+\frac{H}{2c}+C_G.
$$

最初の初期条件より $C_F+C_G=0$。二つの進行波へ戻すと

$$
\boxed{
u(t,x)=\frac{f(x-ct)+f(x+ct)}2+
\frac1{2c}\int_{x-ct}^{x+ct}h(y)\,dy.
}
$$

これは既出の[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)です。公式を結果として引用するだけでなく、光的な二方向に分けてから再導出できました。

ただし候補式が微分方程式と初期値を満たすかを検算しないまま「解」とは言えません。変位からの項を $A$、積分からの項を $B$ と書きます。

$$
A=\frac{f(x-ct)+f(x+ct)}2,\qquad
B=\frac1{2c}\int_{x-ct}^{x+ct}h(y)\,dy.
$$

可変端点積分の微分を逐次実行すると

$$
B_t=\frac12\{h(x+ct)+h(x-ct)\},\qquad
B_x=\frac1{2c}\{h(x+ct)-h(x-ct)\},
$$

$$
B_{tt}=\frac c2\{h'(x+ct)-h'(x-ct)\},\qquad
B_{xx}=\frac1{2c}\{h'(x+ct)-h'(x-ct)\}.
$$

よって $B_{tt}=c^2B_{xx}$。他方、

$$
A_{tt}=\frac{c^2}2\{f''(x-ct)+f''(x+ct)\}=c^2A_{xx}.
$$

従って $P_c(A+B)=0$ です。また

$$
u(0,x)=\frac{f(x)+f(x)}2+\frac1{2c}\int_x^xh(y)\,dy=f(x),
$$

$$
u_t(0,x)=\frac c2\{-f'(x)+f'(x)\}+\frac{h(x)+h(x)}2=h(x).
$$

$f\in C^2$、$h\in C^1$ の仮定が二階微分の連続性を保証します。一意性も、任意の解が $F+G$ に分解でき、初期値によって $F'$ と $G'$ が上の式に決まり、積分定数の和が $0$ に決まることから従います。

## 4. 初期支持と光円錐の一致

時刻 $t>0$、位置 $x$ の値を求めるのに必要な初期情報は、二つの端点での $f$ の値と、$[x-ct,x+ct]$ 上の $h$ の値です。この区間は[PDE4の後方依存区間](../../PDE/PDE4/index.md#def-pde4-domain-dependence)です。

[LORG6のMinkowski因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures)を空間座標 $x/c$ に適用すると、初期点 $(0,y)$ が $(t,x)$ に未来向き因果曲線で到達できる条件は

$$
t\ge0,\qquad |x-y|\le ct
$$

です。$y$ について解けば $x-ct\le y\le x+ct$。**解の積分区間は、過去光円錐と初期時刻の断面に等しい**のです。

初期変位・速度が非零である点の閉包をそれぞれ $\operatorname{supp}f$、$\operatorname{supp}h$ とします。この二つの支持の和集合を $K$ としたとき、波が未来のどこへ達し得るかを記述します。

<a id="prop-hpde1-causal-support"></a>

<!-- formal-statement-start -->
> **命題（初期支持の因果的包含）**  
> $c>0$、$f\in C_c^2(\mathbb R)$、$h\in C_c^1(\mathbb R)$ とし、$K=\operatorname{supp}f\cup\operatorname{supp}h$ とする。上記の古典解 $u$ について、

$$
\operatorname{supp}(u|_{[0,\infty)\times\mathbb R})
\subset J^+_{g_c}(\{0\}\times K)
$$

> が成り立つ。特に $K\subset[a,b]$ なら各時刻 $t\ge0$ の支持は区間 $[a-ct,b+ct]$ に含まれる。
<!-- formal-statement-end -->

### 証明の見取り図

過去光円錐が $K$ に触れなければ、d'Alembert公式の両端点値と積分値はすべて零です。因果的未来が閉集合になることもコンパクト性から確認すれば、非零集合の閉包である支持まで包含できます。

<!-- proof-start -->
### 証明

$K$ はコンパクトです。$(t,x)\notin J^+_{g_c}(\{0\}\times K)$ とすると、どの $y\in K$ に対しても $|x-y|>ct$ です。ゆえに

$$
[x-ct,x+ct]\cap K=\varnothing
$$

であり、$f(x-ct)=f(x+ct)=0$、$\int_{x-ct}^{x+ct}h(y)\,dy=0$ です。[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)に代入すれば $u(t,x)=0$ です。

集合 $J^+_{g_c}(\{0\}\times K)$ が閉じていることを確かめます。その中の点列 $(t_n,x_n)\to(t,x)$ について $y_n\in K$ が存在し、$|x_n-y_n|\le ct_n$ となります。コンパクト性から部分列 $y_{n_j}\to y\in K$ を取れ、極限で $|x-y|\le ct$ を得ます。従って極限点も因果的未来に属し、この集合は閉集合です。既に非零集合がこの閉集合に含まれるので、その閉包である支持も含まれます。

さらに $K\subset[a,b]$ なら $y\in K$ と $|x-y|\le ct$ から $a-ct\le x\le b+ct$ が従います。
<!-- proof-end -->

これは[PDE4の有限伝播速度](../../PDE/PDE4/index.md#cor-pde4-finite-propagation)を因果集合の言葉へ翻訳した命題です。支持が各時間断面で有界でも、時間方向へ無限に延びるなら時空全体でコンパクトとは限らない点に注意してください。

### 具体例：光円錐の内部にも値が残る

$c=1$、$f=0$、$h(x)=(1-x^2)^3$（$|x|<1$）、外では $h=0$ とします。端点で関数値と一階導関数が零なので $h\in C_c^1$ です。$t\ge1$、$x=0$ で積分区間 $[-t,t]$ は支持全体を含み、

$$
\begin{aligned}
u(t,0)&=\frac12\int_{-1}^1(1-3y^2+3y^4-y^6)\,dy\\
&=1-1+\frac35-\frac17=\frac{16}{35}>0.
\end{aligned}
$$

$t>1$ の $(t,0)$ は初期支持の光円錐の**内部**にあります。したがって「速度が $c$ を超えない」と「波が円錐の境界だけにある」は異なる主張です。高次元のHuygens現象ではこの差が重要になります。

## 5. 広がる影響範囲と縮む依存領域

今度は時刻零の**一部分だけ**、閉区間 $S=\{(0,y):a\le y\le b\}$ 上で初期データが分かっている場合を考えます。時刻 $t$、位置 $x$ の値を $S$ 上のデータだけで確定できるには、

$$
[x-ct,x+ct]\subset[a,b]
$$

が必要です。端点を比較して $x-ct\ge a$、$x+ct\le b$、すなわち

$$
t\ge0,\qquad a+ct\le x\le b-ct
$$

を得ます。上へ行くほど狭くなるこの領域は[LORG13の依存領域の定義](../../../幾何系/LORG/LORG13/index.md#def-lorg13-dependence)と[Minkowskiでの依存領域公式](../../../幾何系/LORG/LORG13/index.md#thm-lorg13-domain-formula)に一致します。

これに対して**初期擾乱が到達できる範囲**は $a-ct\le x\le b+ct$ という外向きに広がる帯です。前者は「過去光円錐の断面を全部知っているか」、後者は「初期支持の少なくとも一点から到達できるか」を問うため、不等号の向きが逆になります。

また、有限伝播は支持の上界であって、未来光円錐のすべての点で非零になる主張ではありません。$h=0$ で $f$ がコンパクト台なら $u=(f(x-ct)+f(x+ct))/2$ であり、固定 $x$ で十分時間が経つと二つの進行波は通り過ぎます。一方、上の非負の初速度では内部に積分値が残りました。

---

## 6. 演習：方程式・支持・因果集合を接続する

各問では $P_cu=u_{tt}-c^2u_{xx}$、$t\ge0$、$x\in\mathbb R$、$c>0$ とします。初期変位は $f$、初速度は $h$ です。

