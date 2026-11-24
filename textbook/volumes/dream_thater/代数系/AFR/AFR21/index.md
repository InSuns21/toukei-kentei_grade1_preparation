# AFR21 周期積分・seesaw identity

<!-- definition-example-audit: strict -->

前講の[大域theta持ち上げ](../AFR20/index.md#def-afr20-global-theta-lift)では、一方の群の変数を積分し、他方の群上に関数を作りました。今回はその関数をさらに部分群に制限して積分します。二重積分を一つの核に戻すと、持ち上げの向きを逆にした計算と比較できます。核が非零でも、指定する指標によって積分が消えることも確認します。

## 1. 部分群に沿って関数を測る

数体は $\mathbb Q$、アデール環は $\mathbb A$ とします。代数群 $H$ が $G$ の部分群なら、左商 $[H]=H(\mathbb Q)\backslash H(\mathbb A)$ から $[G]$ への写像は $h$ の剰余類を同じ元の $G$ における剰余類へ送ります。代表元を $\gamma h$ に替えても $\gamma\in H(\mathbb Q)\subset G(\mathbb Q)$ なので写像は定まります。$F(h)$ は $[H]$ の元をこの写像で $[G]$ に送った先での値とします。$[H]$ には右不変な商測度 $dh$ が選ばれているとします。右不変とは任意の $k\in H(\mathbb A)$ による右移動 $h\mapsto hk$ が測度を保つことです。

$[G]$ 上の関数 $F$ の値を一点で測る代わりに、$[H]$ 上の関数 $f$ を重みとして平均します。複素共役を付けるのは入力の変換成分を選ぶためです。

<a id="def-afr21-period"></a>

<!-- formal-statement-start -->
> **定義（周期積分）**
> $\mathbb Q$ 上の代数群 $H\subset G$ とアデール環 $\mathbb A$ を取る。$[H]=H(\mathbb Q)\backslash H(\mathbb A)$ とし、右不変な商測度 $dh$ を取る。$[G]$ も同様に定める。$F:[G]\to\mathbb C$ と $f:[H]\to\mathbb C$ を可測とし、$F$ の $[H]$ への引き戻しも可測で、その重み付き積 $F(h)\overline{f(h)}$ が絶対可積分であるとする。周期積分を

$$
P_H(F;f)=\int_{[H]}F(h)\overline{f(h)}\,dh
$$

> とする。
<!-- formal-statement-end -->
<!-- definition-example-start: def-afr21-period -->
**定義の確認**

有限群の模型として $H=G=\{1,-1\}$、有理部分群の役割を果たす部分群は $\{1\}$、商測度は各点に質量 $1/2$ とします。右移動は二点の置換なので測度は不変です。$F(h)=2+3h$、$f(h)=h$ と取ると積は可測で有限和です。

$$
P_H(F;f)=\tfrac12(5\cdot1+(-1)(-1))=3.
$$

$f=1$ なら $(5-1)/2=2$ です。同じ関数から異なる成分を抽出しました。

実際の商でも同じ計算ができます。$H=G=O(1)$ とし、[大域theta持ち上げの定義例](../AFR20/index.md#def-afr20-global-theta-lift) と同じ確率商測度を取ります。$\chi(h)=h_\infty h_2$ は斜めの有理符号で不変なので商の関数です。実素点だけ符号を反転する右移動は $\chi=1$ と $\chi=-1$ の集合を交換し、両者の測度は $1/2$ です。$F=2+3\chi$ と $f=\chi$ は有界可測なので積分は存在し、上と同じ二値の平均で3になります。
<!-- definition-example-end -->

実際のアデール商は有限集合とは限りません。右不変性は測度の性質であり、積分の有限性を自動的には保証しません。

## 2. 二つの双対対を入れ子にする

[双対対](../AFR20/index.md#def-afr20-dual-pair)は共通のシンプレクティック空間（非退化交代形式を持つ有限次元空間）で互いに中心化群となる二群でした。中心化群は、交代形式を保つ可逆線形写像のうち、指定した群の全元と交換するもの全体です。ここでは有理数上の空間にも同じ条件を用います。一つの双対対だけでは、持ち上げた関数をどの部分群へ制限すれば逆向きの持ち上げと比較できるかが決まりません。そこで二組の双対対を用意します。

<a id="def-afr21-seesaw"></a>

<!-- formal-statement-start -->
> **定義（seesaw配置）**
> 共通のシンプレクティック空間に二組の双対対 $(G,H)$ と $(G',H')$ があり、包含関係が

$$
G'\subset G,\qquad H\subset H'
$$

> となる配置を seesaw配置とする。
<!-- formal-statement-end -->
<!-- definition-example-start: def-afr21-seesaw -->
**定義の確認**

$\mathbb Q$ 上の二次元空間 $V=\mathbb Q^2$ に標準内積を置き、$U=\mathbb Q^2$ に標準交代形式を置きます。$V,U$ の標準基底をそれぞれ $e_1,e_2$ と $f_1,f_2$ とします。テンソル積基底 $e_i\otimes f_j$ により、$W=V\otimes U$ の元は $e_1\otimes w_1+e_2\otimes w_2$ と一意に書けます。ここで $w_i\in U$ とし、元を $(w_1,w_2)$ と表します。$J(w,z)=\det[w\ z]$ を $U$ の標準交代形式とすると、$e_i^Te_j=\delta_{ij}$（$i=j$ なら1、その他は0）なので、$W$ の交代形式は $\Omega(w,z)=J(w_1,z_1)+J(w_2,z_2)$ です（[直交型テンソル交代形式](../AFR20/index.md#def-afr20-orthogonal-tensor) の有理数版）。実数に係数を拡張しても以下の計算はそのまま成立します。

- $G=SL_2\times SL_2$ は各平面に独立に作用し、$H=\{1,-1\}^2$ は各平面で符号を変えます。
- $G'$ は $SL_2$ の対角埋め込み、$H'=O(2)$ は二つの平面を内積を保つ係数で混ぜます。

この基底で各平面上の作用を $2\times2$ ブロックとして表します。$SL_2$ は行列式1の2次行列の群です。各平面の作用 $S$ について

$$
J(Sw,Sz)=\det(S[w\ z])=\det(S)J(w,z)
$$

なので、保存条件は $\det S=1$ と同値です（$J(f_1,f_2)=1$ で必要性も確認できます）。符号反転も行列式1です。$O(2)$ の作用は行列 $A$ により $(Aw)_i=\sum_{j=1}^2 A_{ij}w_j$ と表され、$A^TA=I$（$T$ は転置、$I$ は単位行列）を満たします。従って $\sum_i A_{ij}A_{ik}=\delta_{jk}$ です。実際、

$$
\begin{aligned}
\Omega(Aw,Az)&=\sum_{i,j,k}A_{ij}A_{ik}J(w_j,z_k)\\
&=\sum_{j,k}\delta_{jk}J(w_j,z_k)\\
&=\sum_jJ(w_j,z_j).
\end{aligned}
$$

この和の形式は、片方の平面だけに任意のベクトルを入れて試せば、各平面の非退化性から非退化です。

[双対対の定義](../AFR20/index.md#def-afr20-dual-pair) に従い、交代形式保存群の内部で中心化群を求めます。任意の作用 $M$ の $2\times2$ ブロックを $M_{ij}$ とします。独立符号の一つ $D=\operatorname{diag}(-I,I)$ と交換する条件は

$$
DM=\begin{pmatrix}-M_{11}&-M_{12}\\M_{21}&M_{22}\end{pmatrix}
=\begin{pmatrix}-M_{11}&M_{12}\\-M_{21}&M_{22}\end{pmatrix}=MD.
$$

従って $M_{12}=M_{21}=0$ です。交代形式保存から各対角ブロックの行列式は1です。逆にこの条件を満たせば独立符号と交換し、交代形式も保ちます。

逆に $G$ と交換する作用も $D\in G$ によりブロック対角です。各ブロック $B=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ は $SL_2$ の全元と交換します。[双対対の定義例](../AFR20/index.md#def-afr20-dual-pair) と同じく $L=\operatorname{diag}(2,1/2)$、$N=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ を選ぶと

$$
BL=LB\ \Longrightarrow\ b/2=2b,\quad 2c=c/2,
$$

$$
BN=NB\quad(b=c=0)\ \Longrightarrow\ a=d.
$$

従って $B=aI$。交代形式保存から $a^2=1$ です。逆に各符号行列は $G$ と交換します。これで $(G,H)$ の双対性が確定しました。

$(G',H')$ の中心化群の関係も確認します。$G'$ と交換する作用の各 $2\times2$ ブロックは上と同じ対角行列・せん断行列との交換によりスカラー行列です。上の $L,N$ の比較にはブロックの可逆性は不要なので、各 $M_{ij}=A_{ij}I$ です。先ほどの $\Omega(Aw,Az)$ の展開で $w$ の第 $j$ 成分を $f_1$、$z$ の第 $k$ 成分を $f_2$ とし、他を0にします。

$$
\Omega(Aw,Az)=(A^TA)_{jk},\qquad \Omega(w,z)=\delta_{jk}.
$$

従って保存条件は $A^TA=I$ と同値です。この条件から可逆性も従い、逆にこのような係数行列は対角の $SL_2$ 作用と交換します。

逆に $H'$ と交換する作用は独立符号との交換でブロック対角です。二平面を交換する行列 $R=\begin{pmatrix}0&I\\I&0\end{pmatrix}$ との交換から

$$
\operatorname{diag}(B,C)R
=\begin{pmatrix}0&B\\C&0\end{pmatrix}
=R\operatorname{diag}(B,C)
=\begin{pmatrix}0&C\\B&0\end{pmatrix}
$$

となり $B=C$ です。共通ブロックは行列式1です。逆に同じブロックで作用すれば係数 $A_{ij}$ による混合と交換します。従って $(G',H')$ も双対対です。

$G'$ は同じ行列を二箇所に入れた部分群、$H$ は $O(2)$ の対角符号行列の部分群なので、二つの包含を満たします。
<!-- definition-example-end -->

この配置で積分するのは小さい側の二群 $G'$ と $H$ です。両方は交換します。前者から後者へ向かう持ち上げは大きい群 $H'$ 上に、逆向きは $G$ 上に値を取り、その後に小さい群へ制限されます。大きい群 $G$ と $H'$ が互いに交換するとは仮定しません。

## 3. 一つの核から二方向の積分へ

共通の Weil 表現と有理点の持ち上げが選ばれ、[大域theta核](../AFR20/index.md#def-afr20-global-theta-kernel)が二つの双対対で定まるとします。共通部分 $[G']\times[H]$ への制限が一致することを仮定します。ここで $[G']$ と $[H]$ は各群の有理点による左商です。被覆が必要な場合には両側の作用群と有理点の持ち上げを整合させる必要があります。共通の表現と総和汎関数を同じ元に適用するとこの一致が得られます。

二つの核をそれぞれ $K^{(1)}_\varphi$（$[G]\times[H]$ 上）と $K^{(2)}_\varphi$（$[G']\times[H']$ 上）と書き、共通部分の値を $K_\varphi(g',h)$ とします。添字 $\varphi$ は共通の試験関数、$f$ は $[H]$ 上、$u$ は $[G']$ 上の関数です。[大域theta持ち上げ](../AFR20/index.md#def-afr20-global-theta-lift) と同じ共役の規約で二方向の積分を定めます。

$$
T_{H\to G}f(g)=
\int_{[H]}K^{(1)}_\varphi(g,h)\overline{f(h)}\,dh,
$$

$$
T_{G'\to H'}u(h')=
\int_{[G']} K^{(2)}_\varphi(g',h')\overline{u(g')}\,dg'.
$$

矢印は積分で消す群から値を取る群への向きです。$g$ または $h'$ を固定して積分し、次にそれぞれ $g'\in[G']$、$h\in[H]$ に制限します。前者の周期積分を $[G']$ に沿って計算すると、核に $\overline f$ と $\overline u$ を掛けた積分が現れます。

<a id="thm-afr21-seesaw-identity"></a>

<!-- formal-statement-start -->
> **定理（seesaw identity）**
> [seesaw配置](#def-afr21-seesaw) に整合する二つの核を選び、共通部分上で一致するとする。二つの商測度は $\sigma$ 有限とし、$f,u$ と核は可測とする。両方向の持ち上げを上の共役付き積分で定め、各制限先でほとんど至る所絶対収束するとする（例外の零測度集合では値を0と置く）。以下の $d(g',h)$ は積測度 $dg'\,dh$ を表す。さらに

$$
\int_{[G']\times[H]}
|K_\varphi(g',h)\, f(h)\,u(g')|\,d(g',h)<\infty
$$

> とする。両側で同じ $dg',dh$ を用いるとき、

$$
P_{G'}(T_{H\to G}f;u)
=P_H(T_{G'\to H'}u;f).
$$
<!-- formal-statement-end -->
### 証明の見取り図

二つの周期積分の定義を展開します。複素共役を付ける相手はそれぞれ入力関数なので、二重積分の被積分関数が一致します。絶対可積分性により積分順序を交換できます。

<!-- proof-start -->
### 証明

[周期積分](#def-afr21-period) と [大域theta持ち上げ](../AFR20/index.md#def-afr20-global-theta-lift) を左辺に代入すると

$$
\begin{aligned}
P_{G'}(T_{H\to G}f;u)
&=\int_{[G']}\left(\int_{[H]}
 K_\varphi(g',h)\overline{f(h)}\,dh\right)
 \overline{u(g')}\,dg'\\
&=\int_{[G']}\int_{[H]}
 K_\varphi(g',h)\overline{f(h)u(g')}\,dh\,dg'.
\end{aligned}
$$

内側の積分の三角不等式と [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) により

$$
\int_{[G']}|T_{H\to G}f(g')\overline{u(g')}|\,dg'
\le \int_{[G']\times[H]}|K_\varphi f u|\,d(g',h)
<\infty
$$

なので、外側の積分も絶対収束します。複素関数の実部と虚部はともに絶対可積分なので [Fubiniの定理](../../../解析系/F0/F0-00D2C/index.md#thm-f0-00d2c-02) をそれぞれに適用します。

$$
\begin{aligned}
&\int_{[H]}\int_{[G']}
 K_\varphi(g',h)\overline{u(g')}\,
 \overline{f(h)}\,dg'\,dh\\
&=\int_{[H]}T_{G'\to H'}u(h)\overline{f(h)}\,dh\\
&=P_H(T_{G'\to H'}u;f).
\end{aligned}
$$

最後の積分も同じ絶対値の二重積分で抑えられます。両辺は $f,u$ のそれぞれについて共役線形です。通常の内積で随伴を表す場合には逆向きの核に複素共役が必要であり、この式と混同しないようにします。
<!-- proof-end -->

### 有限行列で両辺を計算する

$[G'],[H]$ を二点の確率空間とした模型で、行が $g'$、列が $h$ の核を

$$
K=\begin{pmatrix}2&i\\1&3\end{pmatrix}
$$

とし、$f=(1,i)$、$u=(1,-1)$ とします。どの積分も有限和です。各点の質量は $1/2$ です。行を固定して列を平均する左方向と、列を固定して行を平均する右方向は、列ベクトルとして

$$
\tfrac12 K\overline f
=\tfrac12\begin{pmatrix}2+i(-i)\\1+3(-i)\end{pmatrix}
=\tfrac12\begin{pmatrix}3\\1-3i\end{pmatrix},
$$

$$
\tfrac12 K^T\overline u
=\tfrac12\begin{pmatrix}2-1\\i-3\end{pmatrix}.
$$

ここで $K^T$ は転置であって共役転置ではありません。

$$
P_{G'}=\frac{3-(1-3i)}4=\frac{2+3i}4,
$$

$$
P_H=\frac{1-i(i-3)}4=\frac{2+3i}4.
$$

非実数の入力でも一致することで共役の位置を検査できます。これは核の積分機構を切り出した模型であり、任意の行列が Weil 表現の核から生じるという主張ではありません。

### 積分の交換が壊れる場合

正整数を数え上げ測度で測る二つの空間で、$K(m,n)=1$ を $n=m$ のとき、$-1$ を $n=m+1$ のとき、その他は0とします。$f=u=1$ とすると各行の和は0、各列の和は $n=1$ のとき1、その他は0です。二つの反復和はそれぞれ0と1になり、絶対値の二重和は各行2なので無限大です。内側の積分が存在するだけでは交換できません。

## 4. 指標を変えると周期が消える

周期積分は部分群上の右移動にどう応答するでしょうか。例えばトーラス上の関数が右移動で一定の複素数倍になるなら、その倍率が重み関数の倍率と一致しない限り平均は0になります。

<a id="thm-afr21-period-selection"></a>

<!-- formal-statement-start -->
> **定理（周期積分の指標選択則）**
> [周期積分](#def-afr21-period) の仮定の下で、$D\subset H(\mathbb A)$ を部分群とする。単位円 $\mathbb T=\{z\in\mathbb C:|z|=1\}$ に値を取る二つの準同型 $\alpha,\beta:D\to\mathbb T$ に対し、任意の $k\in D$ でほとんど至る所

$$
F(hk)=\alpha(k)F(h),\qquad
f(hk)=\beta(k)f(h)
$$

> とする。$\alpha\ne\beta$ なら $P_H(F;f)=0$ である。
<!-- formal-statement-end -->
### 証明の見取り図

右不変測度で積分変数を右へ移動し、周期積分自身に非自明な定数が掛かることを使います。

<!-- proof-start -->
### 証明

$\alpha\ne\beta$ なので、ある $k\in D$ に対して $\alpha(k)\ne\beta(k)$ です。右不変測度で $h$ を $hk$ に置き換えると

$$
\begin{aligned}
P_H(F;f)
&=\int_{[H]}F(hk)\overline{f(hk)}\,dh\\
&=\alpha(k)\overline{\beta(k)}P_H(F;f).
\end{aligned}
$$

$|\beta(k)|=1$ なので $\overline{\beta(k)}=1/\beta(k)$ です。従って $1-\alpha(k)\overline{\beta(k)}\ne0$。この数で割れば $P_H(F;f)=0$ になります。
<!-- proof-end -->

一致は非消滅の必要条件にすぎません。たとえば $H=\{1,-1\}^2$ で $D$ を第一因子とし、$F(h)=h_2$、$f=1$ とすれば両者は $D$ で不変ですが、第二因子の平均が0になります。

### Hecke指標による重みの変更

乗法群 $H=G=\mathbb G_m$ では $[H]=\mathbb Q^\times\backslash\mathbb A^\times$ です。[有理数体のイデール類群の標準代表元](../AFR8/index.md#thm-afr8-idele-normal-form) により $(t,v)\in\mathbb R_{>0}\times\prod_p\mathbb Z_p^\times$ で表せます。測度を $dt/t$ と各単数群の確率 Haar 測度の積とします。前者は $t\mapsto at$ で不変、後者は単数の積による移動で不変です。

[有限位数Hecke指標](../AFR10/index.md#def-afr10-hecke-character) の具体例として $v_5\bmod5$ が $1,4$ なら1、$2,3$ なら $-1$ となる $\chi(v)$ を取ります。標準代表元の単数成分 $v=(v_p)_p$ のうち $v_5$ だけに依存します。[有限位数Hecke指標の定義例](../AFR10/index.md#def-afr10-hecke-character) と同じく、還元写像は乗法を保ち、$\{1,4\}$ は非零剰余類群の指数2の部分群なので、この符号は連続な準同型です。標準代表元同士の積は再び標準代表元であり、有理数倍で代表元は変わりません。従って商のHecke指標になります。他の素点の単数上で自明という意味であり、イデールの非単数成分上まで自明とは限りません。$F(t,v)=\mathbf1_{[1,e]}(t)(2+3\chi(v))$ とし、$f=\chi$ または $1$ を選びます。$dt/t$ は $t>0$ 上で密度 $1/t$ を持つ測度です。$v$ を固定した $t$ の積分では、原始関数 $\log t$ により $\int_1^e dt/t=\log e-\log1=1$。また $|F(t,v)|\le5\mathbf1_{[1,e]}(t)$ なので絶対可積分です。

法5の各非零剰余類の測度は、単数による移動で互いに移るため $1/4$ です。従って $\int\chi(v)dv=(1-1-1+1)/4=0$、$\int|\chi(v)|^2dv=1$ です。結果は

$$
P_H(F;1)=2,\qquad P_H(F;\chi)=3.
$$

ここでは可測なコンパクト台（$t$ 方向）の関数を使った計算であり、滑らかな保型形式やその特殊 $L$ 値についての定理を主張していません。

## 5. 次の内積公式へ

二つの持ち上げの周期を等しくする部分は積分交換で証明できました。しかし一般の theta 核について必要な大域分裂、商測度の整合、非コンパクト商での収束や正則化、周期の特殊 $L$ 値との関係には別の理論が要ります。次講では持ち上げの二乗ノルムを調べる内積公式へ進みます。

参考：Stephen S. Kudla, [Notes on the local theta correspondence](https://www.math.toronto.edu/~skudla/castle.pdf)（双対対と Weil 表現の背景）。

## 6. 演習


<a id="ex-afr21-a1"></a>

### A1. 周期積分の規格化

二点群 $\{1,-1\}$ に確率測度を置き、$F(h)=4+2ih$、$f(h)=ih$ の周期積分を求めよ。

- Level: A
- ID: AFR21-A1

<!-- solution-start -->
**詳細解答**

[周期積分](#def-afr21-period) に代入します。$\overline{ih}=-ih$ なので積は $-4ih+2h^2=-4ih+2$。$h$ の平均は0、$h^2$ の平均は1であり、周期積分は2です。
<!-- solution-end -->

<a id="ex-afr21-a2"></a>

### A2. 部分群の包含

第2節の模型で $S=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ とし、$g'=(S,S)$ と $h=\operatorname{diag}(-I,I)$ が交換することを示せ。

- Level: A
- ID: AFR21-A2

<!-- solution-start -->
**詳細解答**

$\det S=1$ なので $g'\in G'$ です。二つの積はどちらも $\operatorname{diag}(-S,S)$ です。$h$ は独立符号を許す $H$ に属します。従って小さい二群の元はこの場合に交換します。
<!-- solution-end -->

<a id="ex-afr21-a3"></a>

### A3. 複素核の積分

二点の確率空間で $K=\begin{pmatrix}1&2i\\0&3\end{pmatrix}$、$f=(1,i)$、$u=(1,1)$ として左方向の持ち上げとその周期を求めよ。

- Level: A
- ID: AFR21-A3

<!-- solution-start -->
**詳細解答**

入力の共役は $(1,-i)$ です。持ち上げは $((1+2i(-i))/2,3(-i)/2)=(3/2,-3i/2)$ です。$u$ は一定1なので周期は $(3-3i)/4$ です。
<!-- solution-end -->

<a id="ex-afr21-a4"></a>

### A4. 指標不一致

$H=\{1,-1\}$、$F(h)=5h$、$f=1$、確率測度で周期が消えることを指標によって説明せよ。

- Level: A
- ID: AFR21-A4

<!-- solution-start -->
**詳細解答**

$k=-1$ の右移動では $F(hk)=-F(h)$、$f(hk)=f(h)$ です。[周期積分の指標選択則](#thm-afr21-period-selection) の倍率は $-1,1$ と異なるので周期は0です。直接和でも $(5-5)/2=0$ です。
<!-- solution-end -->

<a id="ex-afr21-b1"></a>

### B1. 逆方向からの再計算

A3と同じ核・入力で右方向の持ち上げとその周期を求め、左方向と一致することを確かめよ。

- Level: B
- ID: AFR21-B1

<!-- solution-start -->
**詳細解答**

行を平均して列ごとの値を求めます。$\overline u=(1,1)$ なので右方向の持ち上げは $(1/2,(2i+3)/2)$ です。これに $\overline f=(1,-i)$ を掛けて平均すると

$$
\tfrac14(1+(2i+3)(-i))=\tfrac14(3-3i).
$$

A3の結果に一致します。これは [seesaw identity](#thm-afr21-seesaw-identity) の有限和での検算です。
<!-- solution-end -->

<a id="ex-afr21-b2"></a>

### B2. 絶対可積分性を確保する

二つの商の測度空間で $|K(g,h)|\le a(g)b(h)$、$a,b\ge0$ とし、全ての関数は可測とする。$\int a|u|=2$、$\int b|f|=3$ とする。重み付き核の絶対積分の上界を求めよ。さらに各点で $a,b$ が有限なら反復積分の存在を示せ。測度は $\sigma$ 有限とする。

- Level: B
- ID: AFR21-B2

<!-- solution-start -->
**詳細解答**

非負関数 $a(g)|u(g)|b(h)|f(h)|$ に [Tonelliの定理](../../../解析系/F0/F0-00D2C/index.md#thm-tonelli) を用いると積分は $2\cdot3=6$ です。比較により核の絶対積分は6以下です。固定した $g$ について $\int |K(g,h)f(h)|dh\le3a(g)$、固定した $h$ では $\int |K(g,h)u(g)|dg\le2b(h)$ なので両持ち上げも絶対収束します。従って整合する seesaw 核なら [seesaw identity](#thm-afr21-seesaw-identity) が使えます。
<!-- solution-end -->

<a id="ex-afr21-b3"></a>

### B3. Hecke指標と局所平均

第4節のイデール商上で $F(t,v)=\mathbf1_{[1,e^2]}(t)(1-2\chi(v))$ とする。同じ測度で $f=1,\chi$ の二つの周期を計算せよ。

- Level: B
- ID: AFR21-B3

<!-- solution-start -->
**詳細解答**

$\int_1^{e^2}dt/t=2$ です。四つの剰余類を平均すると $\int\chi=0$、$\int\chi^2=1$。よって $P_H(F;1)=2(1-2\cdot0)=2$、$P_H(F;\chi)=2(0-2\cdot1)=-4$ です。$|F|\le3\mathbf1_{[1,e^2]}$ なので絶対可積分です。
<!-- solution-end -->

<a id="ex-afr21-b4"></a>

### B4. 交換失敗の検査

第3節の数え上げ模型で $m\le M,n\le N$ に制限した二重和を計算し、$N=M$ と $N=M+1$ の極限を比較せよ。

- Level: B
- ID: AFR21-B4

<!-- solution-start -->
**詳細解答**

正の項は $m=n$ なので $\min(M,N)$ 個です。負の項は $m+1=n$ なので $\min(M,N-1)$ 個です（$M,N\ge1$）。差は $N=M$ で1、$N=M+1$ で0となります。$M\to\infty$ でも異なり、長方形の取り方によらない極限はありません。絶対和は $N=M$ で $2M-1$ に発散します。
<!-- solution-end -->

<a id="ex-afr21-c1"></a>

### C1. 二方向で指標を同時に選ぶ

$g,h\in\{1,-1\}$ に独立な確率測度を置き、$K(g,h)=1+2g+3h+4gh$ とする。$f(h)=h$、$u(g)=g$ を用いて両方向の持ち上げ・周期を求めよ。さらに $f,u$ をそれぞれ自明指標か符号指標にした四通りの周期を求めよ。

- Level: C
- ID: AFR21-C1

<!-- solution-start -->
**詳細解答**

$E_h$ は $g$ を固定して $h$ の二点を平均する演算、$E_g$ は $h$ を固定して $g$ の二点を平均する演算です。[大域theta持ち上げ](../AFR20/index.md#def-afr20-global-theta-lift) の有限和模型で、符号指標は実数なので共役を取っても変わりません。まず $h$ の平均は0、二乗平均は1なので

$$
T_{H\to G}f(g)=E_h[(1+2g)h+3+4g]=3+4g.
$$

これに $g$ を掛けて平均すると $3E_g[g]+4E_g[g^2]=4$ です。逆方向では

$$
T_{G'\to H'}u(h)=E_g[(1+3h)g+2+4h]=2+4h.
$$

周期は $2E_h[h]+4E_h[h^2]=4$。すべて有限和なので [seesaw identity](#thm-afr21-seesaw-identity) の絶対可積分性を満たします。自明指標を $1$ とすると、$f=1$ の持ち上げは $1+2g$ です。これに $u=1,g$ を掛けて平均すれば順に1,2。$f=h$ の持ち上げは $3+4g$ なので $u=1,g$ に対して3,4。従って周期の表は

| $f$ | $u=1$ | $u=g$ |
| --- | ---: | ---: |
| $1$ | 1 | 2 |
| $h$ | 3 | 4 |

異なる指標を選んでも核の該当成分があれば非零です。核全体が一つの指標で変換するという仮定を置かずに選択則を適用してはいけません。
<!-- solution-end -->
