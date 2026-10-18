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

### HPDE1-A1：初期変位から余弦波へ

- Level: A
- 問題：$f(x)=\cos(kx)$、$h(x)=0$（$k\in\mathbb R$）の古典解を求め、波動方程式と二つの初期条件を直接検算せよ。

<!-- solution-start -->
**詳細解答**

[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)から

$$
u(t,x)=\frac{\cos(k(x-ct))+\cos(k(x+ct))}2
=\cos(kx)\cos(kct).
$$

加法定理で最後の等式を得ました。二階微分すると

$$
u_{tt}=-c^2k^2\cos(kx)\cos(kct),\qquad
u_{xx}=-k^2\cos(kx)\cos(kct)
$$

ですから $P_cu=0$ です。また $u(0,x)=\cos(kx)$、$u_t(0,x)=-ck\cos(kx)\sin0=0$ です。$k=0$ の定数解についても同じ計算が成立します。
<!-- solution-end -->

### HPDE1-A2：初速度が正弦波のとき

- Level: A
- 問題：$f=0$、$h(x)=\sin(kx)$（$k\ne0$）の解を求め、初速度を確かめよ。$h\equiv1$ とした場合の解も求めよ。

<!-- solution-start -->
**詳細解答**

初期速度の積分を端点で評価すると

$$
\begin{aligned}
u(t,x)
&=\frac1{2c}\int_{x-ct}^{x+ct}\sin(ky)\,dy\\
&=\frac{\cos(k(x-ct))-\cos(k(x+ct))}{2ck}\\
&=\frac{\sin(kx)\sin(kct)}{ck}.
\end{aligned}
$$

従って $u(0,x)=0$、$u_t(0,x)=\sin(kx)\cos0=\sin(kx)$ です。$h\equiv1$ なら同じ積分が $2ct$ になるため $u(t,x)=t$ です。$k=0$ と置いた $\sin(kx)$ は恒等的零であり、$h\equiv1$ とは異なるデータです。
<!-- solution-end -->

### HPDE1-A3：後方依存区間を数値で求める

- Level: A
- 問題：$c=2$、$(t,x)=(3,5)$ の後方依存区間を求めよ。初期点 $(0,12)$ は $(3,5)$ に因果的に到達できるか。

<!-- solution-start -->
**詳細解答**

[PDE4の後方依存区間](../../PDE/PDE4/index.md#def-pde4-domain-dependence)により

$$
I_0(3,5)=[5-2\cdot3,5+2\cdot3]=[-1,11].
$$

$(0,12)$ からの空間差は $|5-12|=7$ で、時間差 $3$ の間に光が進める最大距離は $2\cdot3=6$ です。[Minkowskiの因果到達条件](../../../幾何系/LORG/LORG6/index.md#thm-lorg6-minkowski-futures) $|\Delta x|\le c\Delta t$ に反するので、到達できません。
<!-- solution-end -->

### HPDE1-A4：未来向き光的ベクトルと波形

- Level: A
- 問題：$g_c=-dt^2+c^{-2}dx^2$ に対し $v_\pm=(1,\pm c)$ が未来向き光的であることを示せ。また $u(t,x)=F(x-ct)$（$F\in C^2$）が $P_cu=0$ を満たすことを確かめよ。

<!-- solution-start -->
**詳細解答**

$v_\pm$ は時間成分が $1>0$ であり、

$$
g_c(v_\pm,v_\pm)=-1+c^{-2}(\pm c)^2=0
$$

ですから[LORG1の未来錐](../../../幾何系/LORG/LORG1/index.md#def-lorg1-future-cone)の境界にあります。$z=x-ct$ とすると

$$
u_t=-cF'(z),\quad u_{tt}=c^2F''(z),\quad
u_x=F'(z),\quad u_{xx}=F''(z)
$$

なので $P_cu=c^2F''-c^2F''=0$ です。
<!-- solution-end -->

### HPDE1-A5：支持区間の広がり

- Level: A
- 問題：$f\in C_c^2$、$h\in C_c^1$ の支持がともに $[2,3]$ に入るとき、$c=2$、$t=2$ で $u$ が必ず零になる $x$ の範囲を求めよ。

<!-- solution-start -->
**詳細解答**

[初期支持の因果的包含](#prop-hpde1-causal-support)に $a=2$、$b=3$、$ct=4$ を代入します。解の時刻2の支持は

$$
[2-4,3+4]=[-2,7]
$$

に含まれます。従って $x<-2$ または $x>7$ で必ず $u(2,x)=0$ です。ただし、この区間の内側で常に非零とは限りません。
<!-- solution-end -->

### HPDE1-B1：一方向の進行波になる初速度

- Level: B
- 問題：$f(x)=e^{-x^2}$、$h(x)=2cx\,e^{-x^2}$ とする。d'Alembert公式を使って $u(t,x)=e^{-(x-ct)^2}$ を導き、初速度を直接検算せよ。

<!-- solution-start -->
**詳細解答**

$f'(x)=-2xe^{-x^2}$ なので $h=-cf'$ です。[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)の積分項を変形すると

$$
\begin{aligned}
\frac1{2c}\int_{x-ct}^{x+ct}h(y)\,dy
&=-\frac12\int_{x-ct}^{x+ct}f'(y)\,dy\\
&=-\frac12\{f(x+ct)-f(x-ct)\}.
\end{aligned}
$$

変位の平均の項と足せば $u(t,x)=f(x-ct)=e^{-(x-ct)^2}$ です。微分すると

$$
u_t(t,x)=-cf'(x-ct)=2c(x-ct)e^{-(x-ct)^2}
$$

なので $u_t(0,x)=2cx e^{-x^2}=h(x)$ です。ガウス関数はコンパクト台ではないため、[初期支持の因果的包含](#prop-hpde1-causal-support)から有界支持を結論してはいけません。
<!-- solution-end -->

### HPDE1-B2：円錐内部に残る初速度の効果

- Level: B
- 問題：$c=1$、$f=0$、$|x|<1$ で $h(x)=(1-x^2)^3$、外では $h=0$ とする。$u(t,0)$ を $0\le t\le1$ と $t\ge1$ で計算し、「光円錐の境界にしか解はない」という主張を判定せよ。

<!-- solution-start -->
**詳細解答**

$h$ は偶関数です。$0\le t\le1$ のとき $[-t,t]\subset[-1,1]$ なので、

$$
\begin{aligned}
u(t,0)
&=\frac12\int_{-t}^t(1-3y^2+3y^4-y^6)\,dy\\
&=t-t^3+\frac35t^5-\frac17t^7.
\end{aligned}
$$

$t\ge1$ では積分区間が支持全体を含みますから

$$
u(t,0)=1-1+\frac35-\frac17=\frac{16}{35}.
$$

$t=1$ の値は両式で一致します。$t>1$ の $(t,0)$ は初期支持の未来円錐の内部にありますが解は正です。よって境界上でしか値を持たないという主張は偽です。
<!-- solution-end -->

### HPDE1-B3：一部分の初期情報から解が決まる領域

- Level: B
- 問題：二組の初期データ $(f_1,h_1)$、$(f_2,h_2)$ が $[a,b]$（$a<b$）上で一致し、それぞれ $C^2\times C^1$ とする。対応する古典解が $0\le t\le(b-a)/(2c)$、$a+ct\le x\le b-ct$ の範囲で一致することを示せ。

<!-- solution-start -->
**詳細解答**

差 $w=u_1-u_2$ の初期変位・初速度は $[a,b]$ 上で零です。指定された点では

$$
x-ct\ge a,\qquad x+ct\le b
$$

となるため $[x-ct,x+ct]\subset[a,b]$ です。差に[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)を適用すれば、両端の初期変位も区間上の初速度も零なので $w(t,x)=0$ です。さらに $a+ct\le b-ct$ を $t$ について解いて $t\le(b-a)/(2c)$ を得ます。これは[LORG13の依存領域](../../../幾何系/LORG/LORG13/index.md#thm-lorg13-domain-formula)と整合します。
<!-- solution-end -->

### HPDE1-B4：同じ支持でも残響は異なる

- Level: B
- 問題：$\operatorname{supp}f\subset[-R,R]$（$R>0$）、$h=0$ のとき、各固定点 $x$ で十分時間が経てば解が零になることを示せ。次に $f=0$、$h\in C_c^1$、$h\ge0$、$h\not\equiv0$、$\operatorname{supp}h\subset[-R,R]$ ではどうなるか。

<!-- solution-start -->
**詳細解答**

$h=0$ なら[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)は $u(t,x)=\{f(x-ct)+f(x+ct)\}/2$ です。$t>(|x|+R)/c$ と取れば $x-ct<-R$、$x+ct>R$ となり、二項とも零になります。

次に $f=0$ とすると、同じ時刻条件の下で

$$
u(t,x)=\frac1{2c}\int_{-R}^R h(y)\,dy>0
$$

となります。$h$ が連続・非負で非零なら、正である点の近傍にも正の値があるため積分は正です。両者とも有限伝播に従いますが、後者は光円錐の内部に残響を生みます。
<!-- solution-end -->

### HPDE1-C1：平坦時空のCauchyデータと二種類の領域

- Level: C
- 問題：$c=1$ とし、$|x|<1$ で $f(x)=(1-x^2)^3$、$h(x)=(1-x^2)^2$、その他では両者を零とする。(1) d'Alembert公式で解を与え、古典解に必要な滑らかさを確認せよ。(2) 時刻 $t$ における支持の上界を求めよ。(3) $t\ge1$ の $u(t,0)$ と、特に $u(2,7/2)$ を計算せよ。(4) 時刻零の区間 $[-1,1]$ だけの初期情報から値が確定する未来依存領域を求め、(2)の支持上界と比較せよ。

<!-- solution-start -->
**詳細解答**

(1) $f$ は端点で関数値・一階・二階導関数が零なので $C^2$、$h$ は端点で関数値・一階導関数が零なので $C^1$ です。[d'Alembert公式](../../PDE/PDE4/index.md#thm-pde4-dalembert)の仮定を満たし、

$$
u(t,x)=\frac{f(x-t)+f(x+t)}2+\frac12\int_{x-t}^{x+t}h(y)\,dy
$$

が古典解です。二階微分に現れるのは連続な $f''$ と $h'$ までであり、初期条件の検算は第3節の手順で成立します。

(2) $K=\operatorname{supp}f\cup\operatorname{supp}h=[-1,1]$ です。[初期支持の因果的包含](#prop-hpde1-causal-support)により、

$$
\operatorname{supp}u(t,\cdot)\subset[-1-t,1+t]
$$

となります。包含なので区間内の全点で非零という意味ではありません。

(3) $t\ge1$ では $f(-t)=f(t)=0$、積分区間が支持全体を含むので、

$$
\begin{aligned}
u(t,0)
&=\frac12\int_{-1}^1(1-2y^2+y^4)\,dy\\
&=1-\frac23+\frac15=\frac8{15}.
\end{aligned}
$$

一方 $(t,x)=(2,7/2)$ の後方依存区間は $[3/2,11/2]$ で、$[-1,1]$ と交わりません。従って $u(2,7/2)=0$ です。

(4) 区間 $[-1,1]$ 上の初期値だけで $u(t,x)$ が定まるには

$$
[x-t,x+t]\subset[-1,1]
\iff x-t\ge-1,\quad x+t\le1.
$$

よって[LORG13の依存領域](../../../幾何系/LORG/LORG13/index.md#thm-lorg13-domain-formula)の未来側は

$$
D^+(\{0\}\times[-1,1])=\{(t,x):0\le t\le1,\ -1+t\le x\le1-t\}.
$$

(2) は初期擾乱の影響が**外へ広がる上界**、(4) は初期区間だけで値を決められる範囲が**内へ縮む領域**です。前者は初期支持から因果的に到達できるか、後者は過去光円錐の初期断面が全部既知区間に含まれるかという、異なる問いから生じました。
<!-- solution-end -->

---

## 7. 曲がった時空への接続

平坦な模型では光的方向が二本の直線になり、d'Alembert公式の積分区間と過去光円錐の初期断面が一致しました。これにより、古典解の存在・一意性、有限伝播、初期区間の依存領域を実際に計算できました。

曲がったLorentz時空では特性方向は単純な直線でなく、同じ公式をそのまま使うことはできません。幾何学的には[Cauchy超曲面](../../../幾何系/LORG/LORG15/index.md#def-lorg15-cauchy)と[大域双曲性](../../../幾何系/LORG/LORG16/index.md#def-lorg16-global-hyperbolicity)が初期値問題の舞台を支え、解析的にはエネルギー評価と局所解の構成を新たに要します。まず次章では高次元の平坦波動へ進み、ここで見た円錐内部の残響とHuygens現象を比較します。
