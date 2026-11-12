# CTM4 速度勾配と客観性は何を測るか

[CTM3 の有限ひずみ](../CTM3/index.md#def-ctm3-green-strain)は「現在の線素が基準状態からどれほど伸びたか」を測る。一方、流れている水や時々刻々と伸びるゴムでは、**いまこの瞬間に**線素が伸びる速さ、回る速さ、体積が増える速さを知りたい。さらに、観測者が回転しただけで、物体が「変形した」と誤判定してはならない。

本章では、[CTM1 の空間表示の速度場](../CTM1/index.md#def-ctm1-spatial-velocity)、[CTM2 の変形勾配](../CTM2/index.md#def-ctm2-deformation-gradient)をつなぎ、物質点に沿う時間変化率と、隣り合う点の速度差を求める。そこから対称・反対称部分、体積変化率を導き、観測座標系の回転を比較する。

以下、基準領域 $\Omega_0\subset\mathbb R^3$ は非空開集合で、$0$ を含む開区間 $I$ を時間領域とする。[CTM1 の運動条件](../CTM1/index.md#def-ctm1-motion-configuration)を満たす運動写像 $\chi$ は、ここでは物質座標と時間について $C^2$ 級と仮定する。

基準時刻では $\chi(X,0)=X$ とする。時刻 $t$ を固定した写像 $\chi_t$ は単射であり、[変形勾配と体積 Jacobian](../CTM2/index.md#def-ctm2-deformation-gradient)は

$$
F=D_X\chi,\qquad J=\det F>0
$$

を満たす。従って逆写像を使って現在配置 $\Omega_t=\chi_t(\Omega_0)$ 上の空間速度 $v(x,t)$ を定められる。

位置の単位は m、時間は s、速度は m/s、近接点の速度差の変化率は s$^{-1}$、$F,J$ は無次元である。$D_X$ は基準座標による微分、$\nabla_x$ は現在座標による微分、$\dot{\ }$ は**同じ物質ラベル $X$ に沿った時間微分**を示す。

## 1. 「同じ場所」と「同じ材料」の変化率は違う

温度の代わりに、染料濃度などを表す $C^1$ 級のスカラー場 $q(x,t)$ を考えよう。場所 $x$ を固定した $\partial_t q$ は、その場所の読み取り値の変化である。染料を付けた**同じ物質点**に付いて動くなら、観測する量は $q(\chi(X,t),t)$ になる。

一変数の時間微分に[多変数の連鎖律](../../../基礎科目/RA/RA6/index.md#thm-ra6-chain-rule)を適用すると、$x=\chi(X,t)$ において

$$
\frac{d}{dt}q(\chi(X,t),t)
=\partial_tq(x,t)+\sum_{i=1}^3
\frac{\partial q}{\partial x_i}(x,t)\,
\partial_t\chi_i(X,t).
$$

[空間表示の速度場](../CTM1/index.md#def-ctm1-spatial-velocity)により $\partial_t\chi(X,t)=v(x,t)$ なので、右辺の二項目は $v\cdot\nabla_xq$ である。ここで得た「同じ物質点で見た変化率」を、空間表示だけで計算する演算としてまとめる。

[VC9 で定義した物質微分](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)を、ここでは運動写像 $\chi$ の追跡と結び付けて使う。VC9 の速度場 $u$ を本章の $v$ と読み替えれば、$x=\chi(X,t)$ で

$$
D_tq(x,t)=\partial_tq(x,t)+v(x,t)\cdot\nabla_xq(x,t)
=\frac{d}{dt}q(\chi(X,t),t).
$$

左辺は空間座標による式、右辺は固定した物質ラベルによる式であり、先ほどの連鎖律が両者の一致を証明した。ベクトル場への作用は成分ごとに計算する。

### 例：場所では変わるが、粒子では変わらない標識

定数 $\gamma$ の単位を s$^{-1}$ として、$\Omega_0=\mathbb R^3$ 上で

$$
\chi(X,t)=(X_1+\gamma tX_2,X_2,X_3)
$$

とする。$\chi(X,0)=X$、$F$ は上三角で $J=1>0$、逆写像は $X=(x_1-\gamma tx_2,x_2,x_3)$ なので、運動条件を満たす。$\partial_t\chi=(\gamma X_2,0,0)$、従って $v(x,t)=(\gamma x_2,0,0)$ である。

標識 $q(x,t)=x_1-\gamma tx_2$（単位 m）について、$\partial_tq=-\gamma x_2$、$\nabla_xq=(1,-\gamma t,0)$。したがって

$$
D_tq=-\gamma x_2+
(\gamma x_2,0,0)\cdot(1,-\gamma t,0)=0.
$$

実際 $q(\chi(X,t),t)=X_1$ は固定した物質ラベルであり、微分すると $0$ になる。空間一点の変化 $\partial_tq$ を物質微分と取り違えないことが重要だ。
ベクトル場 $q=v$ に適用した $D_tv$ は物質点の加速度であり、移流項を含む。ただし力の釣合や質量保存は後の講義で導く。

## 2. 隣り合う点の速度差を測る

現在位置 $x$ と $x+h$ の間の速度差は、$v$ の空間微分を使って

$$
v(x+h,t)-v(x,t)=(\nabla_xv)(x,t)\,h+o(\|h\|)
$$

と書ける。この一次係数行列の第 $j$ 列は、$x_j$ 方向へ距離だけずらしたときの速度差を表す。$h$ は現在配置側のベクトルなので、$X$ による微分 $D_Xv$ と混同しない。

<a id="def-ctm4-velocity-gradient"></a>

<!-- formal-statement-start -->
### 定義（速度勾配）

上記の運動写像から定まる $C^1$ 級の空間速度 $v$ に対し、点 $(x,t)$ での**速度勾配** $L$ を

$$
L(x,t):=\nabla_xv(x,t)
=\left(\frac{\partial v_i}{\partial x_j}(x,t)\right)_{i,j=1}^3
$$

で定義する。これは現在配置の線素を速度差へ送る線形写像であり、単位は s$^{-1}$ である。
<!-- formal-statement-end -->

定義の行列は現在側での変化率を表す。では、前講の $F(X,t)$ を時間微分した $\dot F$ からどう求めるのか。連鎖律の**入力**となる関数を $X\mapsto v(\chi(X,t),t)$ と明示して、$X$ で微分する。

<a id="prop-ctm4-velocity-deformation"></a>

<!-- formal-statement-start -->
### 命題（速度勾配と変形勾配の時間変化）

上記の $C^2$ 級の運動写像について、$x=\chi(X,t)$、$F=D_X\chi(X,t)$、$J=\det F>0$ とすると

$$
\dot F(X,t)=L(x,t)F(X,t),
\qquad
L(x,t)=\dot F(X,t)F(X,t)^{-1}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$F$ は $X$ に関する微分、速度 $v$ は $x$ に関する関数である。まず $v(\chi(X,t),t)=\partial_t\chi(X,t)$ を同じ $X$ で微分し、右辺の微分順序を $C^2$ 正則性によって交換する。最後に $J>0$ を使って $F^{-1}$ を掛ける。

<!-- proof-start -->
### 証明

[CTM1 の速度の構成](../CTM1/index.md#prop-ctm1-spatial-reconstruction)から、各成分について

$$
v_i(\chi(X,t),t)=\frac{\partial\chi_i}{\partial t}(X,t).
$$

$t$ を固定して $X_j$ で微分すると

$$
\sum_{k=1}^3
\frac{\partial v_i}{\partial x_k}(\chi(X,t),t)
\frac{\partial\chi_k}{\partial X_j}(X,t)
=\frac{\partial^2\chi_i}{\partial X_j\partial t}(X,t).
$$

右辺は $\chi\in C^2$ より偏微分の順序を交換して $\partial_t(\partial_{X_j}\chi_i)=\dot F_{ij}$。左辺は行列積 $(LF)_{ij}$ に等しい。よって $\dot F=LF$。さらに [変形勾配の定義と $J>0$](../CTM2/index.md#def-ctm2-deformation-gradient)から $F$ は可逆なので、右から $F^{-1}$ を掛けると $L=\dot F F^{-1}$ を得る。
<!-- proof-end -->

<!-- definition-example-start: def-ctm4-velocity-gradient -->
### **定義の確認**：伸長の速度勾配

単位 s$^{-1}$ の定数 $\alpha,\beta,\delta$ を使って

$$
\chi(X,t)=(e^{\alpha t}X_1,e^{\beta t}X_2,e^{\delta t}X_3)
$$

とする。$\chi(X,0)=X$、$F=\operatorname{diag}(e^{\alpha t},e^{\beta t},e^{\delta t})$ は全時刻で可逆で $J=e^{(\alpha+\beta+\delta)t}>0$ である。

速度場を直接求めると $v(x,t)=(\alpha x_1,\beta x_2,\delta x_3)$。従って、定義より

$$
L=\operatorname{diag}(\alpha,\beta,\delta).
$$

一方 $\dot F=\operatorname{diag}(\alpha e^{\alpha t},\beta e^{\beta t},\delta e^{\delta t})$ なので、上の[命題](#prop-ctm4-velocity-deformation)から計算した $\dot FF^{-1}$ もこの $L$ に一致する。特に $L_{11}=\alpha$ は、現在の $x_1$ 方向の長さの**単位時間当たり相対変化率**である。
<!-- definition-example-end -->

## 3. 瞬間の伸びと回転を分離する

同じ短い線素の両端を時間とともに追おう。基準側の固定ベクトル $A$ から作った現在の線素を $a(t)=F(X,t)A$ とする。前節の[命題](#prop-ctm4-velocity-deformation)を適用すると

$$
\dot a=\dot FA=LFA=La.
$$

長さの二乗は $a^Ta$ だから

$$
\frac12\frac{d}{dt}(a^Ta)=a^T\dot a=a^TLa.
$$

ここで $L$ の対称部分は長さを変え、反対称部分は長さの二乗の変化に寄与しない。任意の実行列 $L$ は $L=(L+L^T)/2+(L-L^T)/2$ と一意に分解できる。

<a id="def-ctm4-rate-of-deformation-spin"></a>

<!-- formal-statement-start -->
### 定義（変形速度テンソルとスピンテンソル）

点 $(x,t)$ における速度勾配 $L=\nabla_xv$ の**変形速度テンソル** $D$ と**スピンテンソル** $W$ を

$$
D:=\frac12(L+L^T),\qquad
W:=\frac12(L-L^T)
$$

で定める。$D^T=D$、$W^T=-W$、$L=D+W$ である。どちらも現在側の座標に作用し、単位は s$^{-1}$ である。
<!-- formal-statement-end -->

<a id="prop-ctm4-line-rate"></a>

<!-- formal-statement-start -->
### 命題（線素の長さと内積の瞬間変化率）

上記の $C^2$ 級運動について、固定した基準線素 $A,B\in\mathbb R^3$ の現在側の像を $a(t)=F(X,t)A$、$b(t)=F(X,t)B$ とする。同じ物質点 $X$ で

$$
\frac12\frac{d}{dt}\|a\|^2=a^TDa,
\qquad
\frac{d}{dt}(a^Tb)=2a^TDb
$$

が成立する。したがって全方向の長さがその瞬間に変わらないことと $D=0$ は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

線素それぞれに $\dot a=La$、$\dot b=Lb$ を使う。反対称行列 $W$ について $a^TWa=0$ となる理由と、「全方向の長さ率がゼロ」から対称行列全体がゼロとなる理由を確認する。

<!-- proof-start -->
### 証明

[速度勾配の命題](#prop-ctm4-velocity-deformation)により

$$
\dot a=La,\qquad\dot b=Lb.
$$

従って $\tfrac12 d\|a\|^2/dt=a^TLa$。実数 $a^TWa$ を転置すると

$$
a^TWa=(a^TWa)^T=a^TW^Ta=-a^TWa
$$

となるためゼロであり、$a^TLa=a^TDa$。内積では積の微分から

$$
\frac{d}{dt}(a^Tb)
=(La)^Tb+a^T(Lb)
=a^T(L^T+L)b=2a^TDb
$$

を得る。

$D=0$ なら任意の $a$ に対して $a^TDa=0$。逆に全方向でこれがゼロなら、$F$ が可逆なので $a=FA$ は任意の $\mathbb R^3$ のベクトルを動ける。$a=e_i$ を代入して $D_{ii}=0$、$a=e_i+e_j$ を代入して

$$
0=(e_i+e_j)^TD(e_i+e_j)
=D_{ii}+2D_{ij}+D_{jj}=2D_{ij}
$$

となる。よって $D=0$。
<!-- proof-end -->

<!-- definition-example-start: def-ctm4-rate-of-deformation-spin -->
### **定義の確認**：単純せん断には伸びとスピンが同時にある

第1節のせん断運動から $v(x,t)=(\gamma x_2,0,0)$ だった。速度差 $v(x+h)-v(x)=(\gamma h_2,0,0)$ を $h$ の各成分で展開すると、その係数行列が

$$
L=\begin{pmatrix}0&\gamma&0\\0&0&0\\0&0&0\end{pmatrix}
$$

となる。対称・反対称部分をそれぞれ転置と足し引きして

$$
D=\begin{pmatrix}0&\gamma/2&0\\\gamma/2&0&0\\0&0&0\end{pmatrix},
\qquad
W=\begin{pmatrix}0&\gamma/2&0\\-\gamma/2&0&0\\0&0&0\end{pmatrix}.
$$

$D^T=D$、$W^T=-W$、$D+W=L$ を直接確認できる。$t=0$、$A=e_1+e_2$ の線素なら $a=A$ なので、[長さ率の命題](#prop-ctm4-line-rate)により

$$
\left.\frac12\frac{d}{dt}\|a\|^2\right|_{t=0}
=(1,1,0)D(1,1,0)^T=\gamma.
$$

実際 $a(t)=(1+\gamma t,1,0)$ で、$\|a(t)\|^2=(1+\gamma t)^2+1$ の微分の半分は $t=0$ で $\gamma$ になる。$W\ne0$ でも、それだけを「物体全体の剛体回転速度」と呼んではいけない。
<!-- definition-example-end -->

## 4. 微小体積の変化率は速度の発散で決まる

[CTM2 の体積 Jacobian](../CTM2/index.md#def-ctm2-deformation-gradient)は、各物質点近傍の微小体積倍率 $J=\det F$ を表す。これを時間微分したい。行列式の微分には、行列式の各列についての多重線形性を使う。

<a id="prop-ctm4-volume-rate"></a>

<!-- formal-statement-start -->
### 命題（体積 Jacobian の時間発展）

$\chi$ が前述の $C^2$ 級運動で、$J=\det F>0$ とすると、各 $(X,t)$ において

$$
\dot J=J\,\operatorname{tr}(L)
=J\,\nabla_x\cdot v
=J\,\operatorname{tr}(D).
$$

従って $J$ の瞬間の相対変化率は $\dot J/J=\nabla_x\cdot v$ である。
<!-- formal-statement-end -->

### 証明の見取り図

まず任意の可逆行列 $F$ と微小変化 $H$ に対して $\det(F+hH)=\det F\det(I_3+hF^{-1}H)$ と分解する。後者の一次項は対角成分の和である。これを $H=\dot F$ に適用し、[速度勾配の関係](#prop-ctm4-velocity-deformation)で $\dot FF^{-1}=L$ に置き換える。

<!-- proof-start -->
### 証明

ここでは物質ラベル $X$ を固定して $F(t)=F(X,t)$ と略す。$h\in\mathbb R$ は時間の増分であり、第2節の位置増分ベクトル $h$ とは別である。$F$ は可逆であり、$\chi$ は $C^2$ 級なので $F(t+h)=F(t)+h\dot F(t)+o(h)$ が成分ごとに成立する。$A=F^{-1}\dot F$ と置くと

$$
\det F(t+h)=\det F(t)\det\{I_3+hA+o(h)\}.
$$

行列式を列で多重線形展開した一次の項は、第 $i$ 列だけを $e_i$ から $Ae_i$ に置き換えた行列式の総和である。この行列式は $A_{ii}$ だから、

$$
\det(I_3+hA+o(h))
=1+h(A_{11}+A_{22}+A_{33})+o(h).
$$

二列以上の置換を含む項は $O(h^2)$ となり、$o(h)$ の項も一次係数に影響しない。差を $h$ で割って極限を取ると

$$
\dot J=J\,\operatorname{tr}(F^{-1}\dot F).
$$

トレースが巡回できることは、成分を入れ替えて次のように確かめられる。

$$
\operatorname{tr}(AB)=\sum_{ij}A_{ij}B_{ji}
=\sum_{ij}B_{ji}A_{ij}=\operatorname{tr}(BA).
$$

したがって

$$
\operatorname{tr}(F^{-1}\dot F)
=\operatorname{tr}(\dot FF^{-1})
=\operatorname{tr}L.
$$

最後に [速度勾配の定義](#def-ctm4-velocity-gradient)より $\operatorname{tr}L=\sum_i\partial_{x_i}v_i=\nabla_x\cdot v$。反対称行列では対角成分がゼロなので $\operatorname{tr}W=0$、$L=D+W$ より $\operatorname{tr}L=\operatorname{tr}D$。
<!-- proof-end -->

**検算：一様伸長。** 第2節の対角伸長では、$J=e^{(\alpha+\beta+\delta)t}$ を直接微分すると

$$
\dot J=(\alpha+\beta+\delta)e^{(\alpha+\beta+\delta)t},
\qquad \operatorname{tr}L=\alpha+\beta+\delta.
$$

確かに $\dot J=J\operatorname{tr}L$ である。$J>0$ だから $\dot J=0$ と $\operatorname{div}v=0$ は各物質軌道上で同値である。**局所体積保存は $D=0$ を意味しない**。単純せん断では $J=1$、$\operatorname{tr}D=0$ だが $D\ne0$ だった。密度や質量については次講で扱う。

## 5. 観測者を回転させると何が変わるか

[CTM3 での重ね合わせ回転](../CTM3/index.md#prop-ctm3-superposed-rotation)は、$F$ に左から回転行列を掛けても有限ひずみが変わらないことを教えてくれた。時間依存の観測枠では**座標系そのものの回転速度**が余計に現れる。何を物体の変形と呼んでよいか判定するには、その影響を計算する必要がある。

ここでは、旧座標 $x$ と新座標 $x^*$ の関係を

$$
x^*=c(t)+Q(t)x,\qquad
Q(t)^TQ(t)=I_3,\quad\det Q(t)=1
$$

と**明示的に固定する**。$c(t)$ は m 単位の時間依存並進、$Q(t)$ は時間依存の向きを保つ直交行列で、ともに $C^2$ 級とする。これは新座標で同じ運動を $\chi^*(X,t)=c(t)+Q(t)\chi(X,t)$ と表示する規約である。行列の回転方向を逆に取れば付加項の符号も変わるため、規約を省いて式だけ暗記しない。

ここで $SO(3)=\{Q\in\mathbb R^{3\times3}:Q^TQ=I_3,\ \det Q=1\}$ は、[CTM3 の向きを保つ直交行列](../CTM3/index.md#prop-ctm3-length-criterion)の集合である。

現在側のベクトル $a$ は $a^*=Qa$ と表示される。二階の空間テンソルを現在側ベクトルへの線形作用 $a\mapsto Ta$ と見れば、同じ作用の出力も $(Ta)^*=QTa$ と表示される。一方、新座標での線形作用を $T^*$ と書くと $(Ta)^*=T^*a^*=T^*Qa$ である。任意の $a$ について両者を等置し、$Q^{-1}=Q^T$ を使えば

$
T^*Qa=QTa\quad(\forall a\in\mathbb R^3)
\quad\Longrightarrow\quad T^*=QTQ^T
$

を得る。この対応を満たす量を客観的と判定する。単なる成分の数値的不変性ではなく、**観測座標の回転に合わせて成分が変わる**ことが要点である。

<a id="def-ctm4-objectivity"></a>

<!-- formal-statement-start -->
### 定義（観測者の剛体運動と客観性）

時間依存の観測系変換 $x^*=c(t)+Q(t)x$（$Q\in SO(3)$）に対して、運動から定めた空間ベクトル量 $a$ が $a^*=Qa$ を満たすとき、その量は**客観的**であるという。空間二階テンソル量 $T$ の客観性は

$$
T^*(x^*,t)=Q(t)T(x,t)Q(t)^T
$$

をすべての許された $c,Q$ について満たすことと定める。スカラー量の客観性は $s^*(x^*,t)=s(x,t)$ である。
<!-- formal-statement-end -->

$x^*=c+Qx$ という式で * 印を付けた成分は、同一の物質運動を新しい座標で書いた値である。

<a id="prop-ctm4-observer-transform"></a>

<!-- formal-statement-start -->
### 命題（観測者の回転による速度勾配の変換）

上述の $C^2$ 級の運動と観測系変換について、$x^*=c+Qx$ における速度・変形勾配・速度勾配の関係は

$$
v^*=\dot c+\dot Qx+Qv,\qquad F^*=QF,
$$

$$
L^*=QLQ^T+\Omega,\qquad
\Omega:=\dot QQ^T,\quad \Omega^T=-\Omega.
$$

従って、[変形速度テンソル](#def-ctm4-rate-of-deformation-spin)とスピンは

$$
D^*=QDQ^T,\qquad W^*=QWQ^T+\Omega.
$$

$D$ は客観的であり、$L$ と $W$ は時間依存の観測枠の回転に対して一般に客観的でない。
<!-- formal-statement-end -->

### 証明の見取り図

$\chi^*=c+Q\chi$ を固定した $X$ で時間微分して新速度を得る。次に $x=Q^T(x^*-c)$ の偏微分を使い、$v^*$ を**新しい座標 $x^*$ で微分**する。$\Omega$ が反対称であることを $QQ^T=I_3$ の時間微分から導けば、対称部分には $\Omega$ が消える。

<!-- proof-start -->
### 証明

固定した物質ラベル $X$ について $\chi^*(X,t)=c(t)+Q(t)\chi(X,t)$ を微分すると

$$
\partial_t\chi^*=\dot c+\dot Q\chi+Q\partial_t\chi.
$$

$x=\chi(X,t)$、$v(x,t)=\partial_t\chi(X,t)$ を代入すると $v^*(x^*,t)=\dot c+\dot Qx+Qv(x,t)$ になる。同じ時刻で $X$ により微分すれば $F^*=D_X\chi^*=QF$。

ここで時刻を固定して $x^*$ を動かすと、$x=Q^T(x^*-c)$ より $\partial x_k/\partial x_j^*=Q_{jk}$。成分表示で

$$
\frac{\partial v_i^*}{\partial x_j^*}
=\sum_k\dot Q_{ik}(Q^T)_{kj}
+\sum_{k,\ell}Q_{ik}
\frac{\partial v_k}{\partial x_\ell}(x,t)
(Q^T)_{\ell j}.
$$

ゆえに $L^*=\dot QQ^T+QLQ^T$。

$Q Q^T=I_3$ を時間微分すると $\dot QQ^T+Q\dot Q^T=0$ となるので、$\Omega^T=Q\dot Q^T=-\Omega$。$D^*=(L^*+L^{*T})/2$ に代入し、反対称な $\Omega$ が打ち消し合うことから $D^*=QDQ^T$。一方、

$$
W^*=\frac12(L^*-L^{*T})
=\frac12 Q(L-L^T)Q^T+\Omega
=QWQ^T+\Omega.
$$

これで変換則が示された。
<!-- proof-end -->

<!-- definition-example-start: def-ctm4-objectivity -->
### **定義の確認**：材料が静止していても回転座標で $W^*\ne0$

$\chi(X,t)=X$、$c=0$ とする。旧座標では $v=0$、$L=D=W=0$。$e_3$ 軸まわりの角度 $\theta(t)=\omega t$、$\omega$ は s$^{-1}$ の定数として

$$
Q(t)=\begin{pmatrix}
\cos\theta&-\sin\theta&0\\
\sin\theta&\cos\theta&0\\
0&0&1
\end{pmatrix},
\qquad
K=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}
$$

とする。各時刻で $Q^TQ=I_3$、$\det Q=1$、$\dot Q=\omega KQ$ なので $\Omega=\dot QQ^T=\omega K$。新座標では $v^*(x^*,t)=\omega Kx^*$、$L^*=\omega K$。従って

$$
D^*=0=QDQ^T,\qquad
W^*=\omega K\ne QWQ^T=0
\quad(\omega\ne0).
$$

この例では客観的な変換則 $D^*=QDQ^T$ を直接確認でき、$W$ については客観性の必要条件に反する具体例を得た。任意の許された観測系で $D$ が客観的なことは直前の[命題](#prop-ctm4-observer-transform)で証明済みである。同じ静止材料について $D$ は客観的だが、$W$ はそうでない。物体が実際に回ったのではなく、観測系だけが回ったために $W^*$ が出た。失われているのは「観測枠の角速度がゼロ」という条件であり、$W$ を単独で客観的な変形指標にできない仕組みが分かる。
<!-- definition-example-end -->

[CTM3 の有限ひずみ](../CTM3/index.md#prop-ctm3-superposed-rotation)は $F^*=QF$ から $C^*=F^{*T}F^*=C$、$E^*=E$ となる（$C,E$ は基準側テンソルなので新しい現在座標への回転を受けない）。また $\det Q=1$ より $J^*=J$。さらに

$$
\operatorname{tr}D^*=\operatorname{tr}(QDQ^T)
=\operatorname{tr}(DQ^TQ)=\operatorname{tr}D
$$

なので、[体積変化率の公式](#prop-ctm4-volume-rate)も観測者によらず同じ意味を持つ。

**注意：零の $D$ と零の $W$ は別物。** [線素の長さと内積の瞬間変化率](#prop-ctm4-line-rate)から $D=0$ は瞬間的な長さ保存を表すが、$W=0$ は観測系を回せば一般に壊れる。固定した一つの観測系での $W$ は局所速度場の反対称部分を示す有用な量だが、それ単独で客観的な材料応答を定義する根拠にはならない。構成則の客観性は後の講義で改めて調べる。

## 6. 演習

全問で運動の正則性・可逆性、微分する座標、次元、参照結果の仮定を確かめる。$t=0$ は基準時刻、$e_1,e_2,e_3$ は標準直交基底、$\operatorname{sym}A=(A+A^T)/2$、$\operatorname{skew}A=(A-A^T)/2$ とする。定数 $a,b,k,\omega$ は断りがなければ s$^{-1}$ である。

## Level A

### A1. 伸びる座標で一定の標識

$\chi(X,t)=(e^{at}X_1,X_2,X_3)$、$q(x,t)=e^{-2at}x_1^2$ とする（$a$ は s$^{-1}$）。$v,\partial_tq,\nabla_xq,D_tq$ を求め、$q(\chi(X,t),t)$ からも検算せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\chi$ は $C^2$ 級で $\chi(X,0)=X$、$F=\operatorname{diag}(e^{at},1,1)$ の行列式は $e^{at}>0$、逆写像は $(e^{-at}x_1,x_2,x_3)$ なので運動条件を満たす。$v(x,t)=(ax_1,0,0)$。

$$
\partial_tq=-2ae^{-2at}x_1^2,\qquad
\nabla_xq=(2e^{-2at}x_1,0,0).
$$

[物質微分の定義](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)より

$$
D_tq=-2ae^{-2at}x_1^2
+(ax_1,0,0)\cdot(2e^{-2at}x_1,0,0)=0.
$$

一方 $q(\chi(X,t),t)=e^{-2at}(e^{at}X_1)^2=X_1^2$ であり、固定 $X$ での時間微分も $0$ である。$q$ の単位を m$^2$ とすれば時間微分の単位も m$^2$/s で一致する。場の偏時間微分が一般に非零でも標識は同じ物質点に沿って保存される。
<!-- solution-end -->

### A2. 体積を保存する三軸伸縮

$\chi(X,t)=(e^{at}X_1,e^{-2at}X_2,e^{at}X_3)$ とする。$F,L,D,W,J$、$\dot J$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$t=0$ で $\chi=X$、指数関数は正で写像は全空間の全単射である。

$$
F=\operatorname{diag}(e^{at},e^{-2at},e^{at}),\quad
F^{-1}=\operatorname{diag}(e^{-at},e^{2at},e^{-at}).
$$

$\dot F=\operatorname{diag}(ae^{at},-2ae^{-2at},ae^{at})$ に [速度勾配と変形勾配の時間変化](#prop-ctm4-velocity-deformation)を適用すると

$$
L=\dot FF^{-1}=\operatorname{diag}(a,-2a,a).
$$

対角なので $D=L$、$W=0$。また $J=\det F=e^{at}e^{-2at}e^{at}=1$、$\dot J=0$。独立に $\operatorname{tr}L=a-2a+a=0$ なので [体積変化率](#prop-ctm4-volume-rate)の右辺 $J\operatorname{tr}L$ も $0$ となる。$a\ne0$ なら $D\ne0$ で、体積保存と形状不変は異なる。
<!-- solution-end -->

### A3. せん断流の対称・反対称部分

$v(x,t)=(kx_2,0,0)$ を生む運動 $\chi(X,t)=(X_1+ktX_2,X_2,X_3)$ について、$L,D,W$ と $\operatorname{div}v$ を求めよ。$D^T=D$、$W^T=-W$ を各成分で確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$v_1$ の $x_2$ 微分だけが $k$ だから

$$
L=\begin{pmatrix}0&k&0\\0&0&0\\0&0&0\end{pmatrix},
\quad L^T=\begin{pmatrix}0&0&0\\k&0&0\\0&0&0\end{pmatrix}.
$$

[定義](#def-ctm4-rate-of-deformation-spin)から

$$
D=\begin{pmatrix}0&k/2&0\\k/2&0&0\\0&0&0\end{pmatrix},\quad
W=\begin{pmatrix}0&k/2&0\\-k/2&0&0\\0&0&0\end{pmatrix}.
$$

$D_{12}=D_{21}=k/2$、$W_{12}=-W_{21}=k/2$、他の対応成分はいずれも $0$ なので転置の条件を満たす。$\operatorname{div}v=\partial_{x_1}v_1+\partial_{x_2}v_2+\partial_{x_3}v_3=0$。$k\ne0$ なら $D,W$ ともに非零である。
<!-- solution-end -->

### A4. 時間依存の剛体回転

$Q(t)$ を第5節の $e_3$ 軸回転行列（$\theta(t)=\omega t$）とし、$\chi(X,t)=Q(t)X$ とする。$F,J,L,D,W$ を求め、[CTM3 の有限ひずみ](../CTM3/index.md#def-ctm3-green-strain) $E$ も求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$Q(0)=I_3$、$Q^TQ=I_3$、$\det Q=1$ なので $\chi$ は許された $C^2$ 運動である。$F=Q$、$F^{-1}=Q^T$、$J=1$。$K=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$ とすると $\dot Q=\omega KQ$ より

$$
L=\dot FF^{-1}=\dot QQ^T=\omega K,\quad
D=\tfrac12(\omega K+\omega K^T)=0,\quad W=\omega K.
$$

一方 $C=F^TF=Q^TQ=I_3$ だから $E=(C-I_3)/2=0$。$D=0$ と $E=0$ はこの剛体運動では整合するが、$W$ は回転速度を含む。$\dot J=0$、$\operatorname{tr}L=0$ も一致する。
<!-- solution-end -->

## Level B

### B1. 体積率の公式を別の運動で検算する

$a,b,k$ を定数とし、$\chi(X,t)=(e^{at}X_1+ktX_2,e^{bt}X_2,X_3)$ とする。$F^{-1}$ と $\dot FF^{-1}$ を計算し、$\dot J=J\operatorname{tr}L$ を両辺から独立に確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$F$ は上三角で、対角成分は $e^{at},e^{bt},1>0$。$t=0$ は恒等写像、逆行列が全時刻で存在する。

$$
F=\begin{pmatrix}e^{at}&kt&0\\0&e^{bt}&0\\0&0&1\end{pmatrix},
\quad
F^{-1}=\begin{pmatrix}e^{-at}&-kt e^{-(a+b)t}&0\\0&e^{-bt}&0\\0&0&1\end{pmatrix}.
$$

$FF^{-1}=I_3$ を掛けて検算する。$\dot F=\begin{pmatrix}ae^{at}&k&0\\0&be^{bt}&0\\0&0&0\end{pmatrix}$ なので、[速度勾配と変形勾配の時間変化](#prop-ctm4-velocity-deformation)に代入すると

$$
L=\dot FF^{-1}
=\begin{pmatrix}a&k(1-at)e^{-bt}&0\\0&b&0\\0&0&0\end{pmatrix}.
$$

上段右成分は $(ae^{at})(-kt e^{-(a+b)t})+ke^{-bt}=k(1-at)e^{-bt}$ と求まる。従って $\operatorname{tr}L=a+b$。

行列式を直接計算すれば $J=e^{(a+b)t}$ だから $\dot J=(a+b)e^{(a+b)t}$。[体積率命題](#prop-ctm4-volume-rate)からの右辺も $J\operatorname{tr}L=e^{(a+b)t}(a+b)$ となり一致する。
<!-- solution-end -->

### B2. 一瞬だけ一致する二つの観測座標

旧座標で $L=\operatorname{diag}(a,b,0)$ とする。新座標 $x^*=Q(t)x$ を $Q(t)$ は第5節の $e_3$ 軸回転、$\theta(t)=\omega t$ として導入する。$t=0$ で $L^*,D^*,W^*$ を求め、どれが客観的か判定せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$t=0$ で $Q=I_3$ だが $\dot Q=\omega K$ であり、**同じ向きの座標軸でも回転速度はゼロとは限らない**。旧行列は対称なので $D=L$、$W=0$。[観測者変換の命題](#prop-ctm4-observer-transform)に $Q(0)=I_3$、$\Omega(0)=\omega K$ を代入すると

$$
L^*(0)=\begin{pmatrix}a&-\omega&0\\\omega&b&0\\0&0&0\end{pmatrix},
$$

$$
D^*(0)=\operatorname{diag}(a,b,0)=QDQ^T,\quad
W^*(0)=\omega K=QWQ^T+\Omega.
$$

$\omega\ne0$ の場合 $L^*\ne QLQ^T$、$W^*\ne QWQ^T$ である。よって $D$ は客観的で $L,W$ は一般には客観的でない。$\operatorname{tr}L^*=a+b$ は旧座標と同じで、[体積変化率](#prop-ctm4-volume-rate)は不変である。
<!-- solution-end -->

### B3. 斜めの線素の長さ率を二通りに求める

$\chi(X,t)=(X_1+ktX_2,X_2,X_3)$ に対して $X$ に固定した $A=e_1+e_2$ を取る。$a(t)=FA$ の長さの二乗を直接微分し、$a^TDa$ に一致することを任意の $t$ で確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$F=\begin{pmatrix}1&kt&0\\0&1&0\\0&0&1\end{pmatrix}$ から $a(t)=(1+kt,1,0)$。従って

$$
\|a(t)\|^2=(1+kt)^2+1,\qquad
\frac12\frac{d}{dt}\|a(t)\|^2=k(1+kt).
$$

[変形速度テンソルとスピンテンソル](#def-ctm4-rate-of-deformation-spin)より $D=\begin{pmatrix}0&k/2&0\\k/2&0&0\\0&0&0\end{pmatrix}$。中間積を計算すると

$$
Da(t)=\begin{pmatrix}k/2\\(k/2)(1+kt)\\0\end{pmatrix},
$$

$$
a(t)^TDa(t)=(1+kt)(k/2)+(k/2)(1+kt)=k(1+kt).
$$

よって [線素の長さと内積の瞬間変化率](#prop-ctm4-line-rate)と一致する。両辺の単位は m$^2$/s と解釈できる（$A$ が長さをもつとき）。$k$ の符号により伸長率の符号も変わる。
<!-- solution-end -->

### B4. $D=0$ と $\operatorname{div}v=0$ の逆関係を吟味する

第2節の対角伸長 $\chi(X,t)=(e^{at}X_1,e^{-at}X_2,X_3)$（$a\ne0$）と剛体回転 $\chi(X,t)=Q(t)X$ を比較する。両者の $D,\operatorname{div}v,J$ を求め、「体積保存なら線素の長さ保存」という主張に反例を与えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

対角伸長では [速度勾配と変形勾配の時間変化](#prop-ctm4-velocity-deformation)から

$$
L=D=\operatorname{diag}(a,-a,0),\quad
\operatorname{div}v=\operatorname{tr}L=a-a=0,\quad J=e^{at}e^{-at}=1.
$$

しかし $D\ne0$。たとえば現在側の $a_1=e_1$ に対して $a_1^TDa_1=a$ なので [長さ率の命題](#prop-ctm4-line-rate)より $a\ne0$ では瞬間的に長さが変化する。剛体回転では $L=\dot QQ^T$ は反対称、$D=0$、$\operatorname{div}v=0$、$J=1$ であり、すべての方向の長さが保存される。反例で欠けている仮定は $\operatorname{tr}D=0$ だけでなく $D=0$ という強い条件である。体積は三方向の伸縮が打ち消し合えば保存される。
<!-- solution-end -->

## Level C

### C1. 伸縮・せん断・回転を組み合わせた運動と共回転観測系

$a,k,\omega$ を s$^{-1}$ の定数（$a\ne0$、$k\ne0$）、$u$ を m/s の定数とする。$Q(t)$ は $e_3$ 軸の角度 $\omega t$ の回転、$c(t)=ut e_1$ とし、

$$
A(t)=\begin{pmatrix}
e^{at}&kt&0\\
0&e^{-at}&0\\
0&0&1
\end{pmatrix},\qquad
\chi(X,t)=c(t)+Q(t)A(t)X
$$

を $\Omega_0=\mathbb R^3$、$I=\mathbb R$ で考える。

1. $\chi$ が基準時刻、単射性、$J>0$、正則性の運動条件を満たすことを確認せよ。
2. $B(t)=\dot A A^{-1}$ と $L$ を求め、$D,W$ を $Q,B,K$ を使って表せ。
3. $J$、$\dot J$、$\operatorname{tr}D$ を求め、$D\ne0$ でも体積保存が成立することを示せ。
4. 観測系 $y=Q(t)^T(x-c(t))$ で $L_y,D_y,W_y$ を求め、$D_y=Q^TDQ$ と $W_y\ne Q^TWQ$ が一般に成立することを検証せよ。
5. 標識 $q(x,t)=e^{at}[Q(t)^T(x-c(t))]_2$ について、物質微分 $D_tq$ を求めよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**1. 運動条件。** $A(0)=I_3$、$Q(0)=I_3$、$c(0)=0$ より $\chi(X,0)=X$。各成分は $(X,t)$ に関して $C^\infty$ 級である。$F=QA$ とすると

$$
J=\det Q\,\det A=1\cdot e^{at}e^{-at}=1>0.
$$

$A$ は正の対角要素を持つ上三角で可逆、$Q$ も直交行列なので、$X=A^{-1}Q^T(x-c)$ という逆写像が存在し全時刻で単射である。

**2. 局所の速度勾配。** $A$ と逆行列を計算すると

$$
\dot A=\begin{pmatrix}
ae^{at}&k&0\\0&-ae^{-at}&0\\0&0&0
\end{pmatrix},
\quad
A^{-1}=\begin{pmatrix}
e^{-at}&-kt&0\\0&e^{at}&0\\0&0&1
\end{pmatrix}.
$$

したがって

$$
B=\dot AA^{-1}
=\begin{pmatrix}
a&k(1-at)e^{at}&0\\0&-a&0\\0&0&0
\end{pmatrix}.
$$

$b(t):=k(1-at)e^{at}$ と略す。$F=QA$ を固定した物質点で微分すると $\dot F=\dot QA+Q\dot A$。[速度勾配の命題](#prop-ctm4-velocity-deformation)に代入して

$$
L=\dot FF^{-1}
=\dot QQ^T+Q(\dot AA^{-1})Q^T
=\omega K+QBQ^T.
$$

$K^T=-K$ なので、[対称・反対称分解](#def-ctm4-rate-of-deformation-spin)から

$$
D=Q\begin{pmatrix}
a&b/2&0\\b/2&-a&0\\0&0&0
\end{pmatrix}Q^T,
$$

$$
W=\omega K+Q\begin{pmatrix}
0&b/2&0\\-b/2&0&0\\0&0&0
\end{pmatrix}Q^T.
$$

**3. 体積。** 第1問で $J=1$ なので $\dot J=0$。また $\operatorname{tr}D=\operatorname{tr}(\operatorname{sym}B)=a-a=0$ だから [体積率公式](#prop-ctm4-volume-rate)の右辺も $J\operatorname{tr}D=0$。$a\ne0$ なので $\operatorname{sym}B\ne0$、従って $D\ne0$。体積保存下でも伸縮とせん断がある。

**4. 共回転座標。** $y=Q^T(x-c)$ は $x^*=c^*+Px$ の形で、$P=Q^T$、$c^*=-Q^Tc$ と置いた観測者変換である。運動は $y(X,t)=A(t)X$ になり、速度勾配は直接 $L_y=\dot AA^{-1}=B$ となる。

[観測者の回転による速度勾配の変換](#prop-ctm4-observer-transform)からも

$$
L_y=Q^TLQ+\dot Q^TQ.
$$

$\dot Q=\omega KQ$ と $KQ=QK$（同じ軸の回転）より $\dot Q^TQ=-\omega K$、$Q^TLQ=\omega K+B$ なので $L_y=B$。ここから

$$
D_y=\operatorname{sym}B=Q^TDQ,\qquad
W_y=\operatorname{skew}B=Q^TWQ-\omega K.
$$

$\omega\ne0$ なら $W_y\ne Q^TWQ$。$D$ は客観的、$W$ は座標枠の回転速度だけ値がずれる。

**5. 物質標識。** $x=\chi(X,t)$ を代入すると

$$
Q^T(x-c)=Q^TQA X=AX,
\qquad [AX]_2=e^{-at}X_2.
$$

従って $q(\chi(X,t),t)=e^{at}e^{-at}X_2=X_2$。[物質微分の定義](../../../幾何系/VC/VC9/index.md#def-vc9-material-derivative)は同じ物質点での全時間微分なので、$D_tq=0$。この議論は $\chi$ が可逆で、$q$ が同じ空間軌道上で定義されていることを使う。
<!-- solution-end -->

---

今回得た三つの計算式は、物質点に沿う変化率 $D_t$、線素の瞬間変形を測る $D$、局所体積の相対変化率 $\operatorname{div}v$ である。観測者が回っても $D$ の表す変形は変わらず、$W$ には観測者のスピンが混入する。次の CTM5 では、物質領域が動くときの積分を時間微分し、**質量保存**を局所方程式へ移す。
