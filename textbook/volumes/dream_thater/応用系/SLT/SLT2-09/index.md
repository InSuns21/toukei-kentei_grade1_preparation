# SLT2-09 固定kernelの勾配力学

[前章のニューラルネット線形化](../SLT2-08/index.md#def-slt2-08-linearization)では、初期点のJacobian $J_0$ を使って訓練点予測を一次近似した。[接線Gram行列](../SLT2-08/index.md#def-slt2-08-ntk) $K_0=J_0J_0^{\mathsf T}$ は正半定値だが、元のニューラルネットを更新すると一般に $J$ も $K$ も変わる。そこで今回は、**初期の接線特徴を本当に固定した模型では、学習をどこまで厳密に解けるか**を調べる。

[RKHSの核勾配流](../SLT2-07/index.md#thm-slt2-07-kernel-flow-spectrum)のスペクトル解は既習である。ただし今回はニューラルネットの**初期出力が零とは限らない**こと、パラメータ変位が何になるか、連続時間と有限学習率の差を同じ行列で確認する。最後に、元の非線形網の核が動く場合と比較する。

到達目標は次の五つである。

1. 初期点で固定した接線模型の損失とパラメータ勾配を導出できる。
2. 正半定値の $K_0$ に対し、初期出力を残した予測・パラメータの勾配流を固有モードごとに解ける。
3. 零固有値の残差、補間可能性、到達する最小ノルム変位を区別できる。
4. 離散勾配降下の学習率条件、振動・発散・停止時刻を有限次元で判定できる。
5. 核が時間変化する場合の誤差を条件付きで抑え、固定核模型を無条件に実網へ適用しない。

## 1. 何を固定した模型なのか

訓練入力 $x_1,\ldots,x_n$（$n\ge1$、重複可）、応答 $y\in\mathbb R^n$ を固定する。微分可能なニューラルネットの訓練点出力を $F(\theta)\in\mathbb R^n$、初期パラメータを $\theta_0\in\mathbb R^p$ とすると、[Jacobianの定義と行列の作り方](../SLT2-08/index.md#thm-slt2-08-parameter-jacobian)から

$$
f_0=F(\theta_0)\in\mathbb R^n,\qquad
J_0=DF(\theta_0)\in\mathbb R^{n\times p},\qquad
K_0=J_0J_0^{\mathsf T}\in\mathbb R^{n\times n}
$$

を得る。$K_0$ が正半定値なのは任意の $c\in\mathbb R^n$ について $c^{\mathsf T}K_0c=\|J_0^{\mathsf T}c\|_2^2\ge0$ だからである。パラメータを $\theta_0+v$ と動かしたとき、実網の $F(\theta_0+v)$ ではなく、**初期点の微分を使い続ける** $f_0+J_0v$ を学習させる。

ここで損失の規格化は $1/n$ を付けない $\frac12\|\cdot\|_2^2$ に固定する。$1/(2n)$ を採用した場合、以下の時間 $t$ と学習率 $\eta$ はそれぞれ $1/n$ の係数を含むように読み替える必要がある。

以下の $t$ は学習時間で、$\dot v(t)=dv(t)/dt$ は**時間による全微分**を表す。一方、Jacobian $J_0$ は訓練入力を固定して**パラメータで微分**した行列である。

この行列を掛けると、パラメータ空間の変位 $v\in\mathbb R^p$ が訓練点空間の出力変化 $J_0v\in\mathbb R^n$ に写る。接線Gram行列 $K_0$ は訓練点空間の残差に作用する。この二種類の微分と作用する空間を区別しておく。

<a id="def-slt2-09-fixed-tangent-flow"></a>

<!-- formal-statement-start -->
> **定義（固定接線模型の勾配流）**
> $n,p\ge1$、固定した $f_0,y\in\mathbb R^n$ と $J_0\in\mathbb R^{n\times p}$ に対し、パラメータ変位 $v\in\mathbb R^p$ の**固定接線予測**、損失、接線Gram行列を次で定める。

$$
g(v)=f_0+J_0v,\qquad
L_{\mathrm{lin}}(v)=\frac12\|g(v)-y\|_2^2,\qquad
K_0=J_0J_0^{\mathsf T}.
$$

> 初期値 $v(0)=0$ からの**固定接線勾配流**は、$t\ge0$ において

$$
\dot v(t)=-J_0^{\mathsf T}(g(v(t))-y),\qquad v(0)=0
$$

> を満たす微分可能な曲線である。訓練点予測を $g(t)=g(v(t))$、残差を $e(t)=g(t)-y$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-09-fixed-tangent-flow -->
**定義の確認**。$n=2,p=1$、$J_0=(1,1)^{\mathsf T}$、$f_0=(0,0)^{\mathsf T}$、$y=(1,-1)^{\mathsf T}$ とする。$g(v)=(v,v)^{\mathsf T}$ で、$K_0=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ は $c^{\mathsf T}K_0c=(c_1+c_2)^2\ge0$ を満たす。損失を変位で微分すると

$$
L_{\mathrm{lin}}(v)=\frac12\{(v-1)^2+(v+1)^2\}=v^2+1,
\qquad \frac{dL_{\mathrm{lin}}}{dv}=2v.
$$

よって $v(t)=0$ は $\dot v=-2v$ と $v(0)=0$ を満たす。$y$ は $J_0$ の列空間に入らず、二つの異なる教師を一つの変位だけで一致させることはできない。これは定義の予測、損失、微分方程式、初期条件をそれぞれ確認した例である。
<!-- definition-example-end -->

実際、変位を $v+sh$（$h\in\mathbb R^p$、$s\in\mathbb R$）とすると

$$
\begin{aligned}
L_{\mathrm{lin}}(v+sh)
&=\frac12\|g(v)-y+sJ_0h\|_2^2\\
&=L_{\mathrm{lin}}(v)+s(g(v)-y)^{\mathsf T}J_0h
+\frac{s^2}{2}\|J_0h\|_2^2.
\end{aligned}
$$

$s=0$ で微分すると $D L_{\mathrm{lin}}(v)[h]=(J_0^{\mathsf T}(g(v)-y))^{\mathsf T}h$ だから、定義中の右辺は確かにこの損失の負のEuclid勾配である。$J_0$ に時間依存がないことが、次節で予測方程式を閉じる鍵になる。

## 2. 連続時間の解と、学べない方向

まず $e_0=f_0-y$ とする。$K_0$ は実対称正半定値なので、直交規格化した固有ベクトル $u_1,\ldots,u_n$ と固有値 $\lambda_j\ge0$ を取れる。重複固有値の基底の取り方が変わっても、同じ固有値に対応する射影の和は変わらない。

学習では、各固有方向の残差 $a_j=u_j^{\mathsf T}e_0$ をどの速度で消せるかが問題になる。$\lambda_j>0$ なら減衰するが、$\lambda_j=0$ の方向には $K_0$ が作用しない。零固有空間への直交射影を $P_0$、正固有空間への直交射影を $P_+=I-P_0$ と書く。

<a id="thm-slt2-09-continuous-spectrum"></a>

<!-- formal-statement-start -->
> **定理（固定接線勾配流のスペクトル解と到達点）**
> $n,p\ge1$、$J_0\in\mathbb R^{n\times p}$、$f_0,y\in\mathbb R^n$ とし、定義した初期値零の固定接線勾配流を考える。$K_0=J_0J_0^{\mathsf T}$ の正の固有値・直交規格化固有ベクトルを $(\lambda_j,u_j)$（$j=1,\ldots,r$、$r=\operatorname{rank}K_0$）とし、$e_0=f_0-y$ と置く。解は一意であり、各 $t\ge0$ で

$$
\begin{aligned}
e(t)&=P_0e_0+\sum_{j=1}^r e^{-\lambda_jt}(u_j^{\mathsf T}e_0)u_j,\\
g(t)&=y+e(t),\\
v(t)&=-J_0^{\mathsf T}\sum_{j=1}^r
\frac{1-e^{-\lambda_jt}}{\lambda_j}(u_j^{\mathsf T}e_0)u_j.
\end{aligned}
$$

> 従って残差と変位はともに有限の極限を持ち、

$$
e(\infty)=P_0e_0,\qquad
g(\infty)=P_+y+P_0f_0,\qquad
L_{\mathrm{lin}}(v(\infty))=\frac12\|P_0e_0\|_2^2.
$$

> 全訓練点を補間できるのは $P_0e_0=0$ のとき、かつそのときに限る。極限の $v(\infty)$ は $J_0v=-P_+e_0$ を満たす変位のうちEuclidノルム最小のものである。$r=0$ なら和を零と読む。
<!-- formal-statement-end -->

### 証明の見取り図

パラメータ方程式へ固定した $J_0$ を掛けると、残差について $\dot e=-K_0e$ が得られる。各固有方向では一次方程式になる。変位を元に戻すとき、零固有方向は $J_0^{\mathsf T}$ に消される。最後に $\operatorname{im}J_0^{\mathsf T}$ と $\ker J_0$ の直交性で最小ノルム性を判定する。

<!-- proof-start -->
### 証明

$g(t)=f_0+J_0v(t)$ で $J_0$ は一定だから、微分と定義の方程式から

$$
\dot e(t)=\dot g(t)=J_0\dot v(t)
=-J_0J_0^{\mathsf T}e(t)=-K_0e(t),\qquad e(0)=e_0.
$$

各 $u_j$ に射影し $a_j(t)=u_j^{\mathsf T}e(t)$ とすると $\dot a_j=-\lambda_ja_j$。積分因子で

$$
\frac{d}{dt}\left(e^{\lambda_jt}a_j(t)\right)=0,
\quad a_j(t)=e^{-\lambda_jt}(u_j^{\mathsf T}e_0).
$$

零固有値の場合は $a_j(t)=a_j(0)$ のままである。直交基底で足し戻して $e(t)$ を得る。変位の式は $\dot v=-J_0^{\mathsf T}e$ を $0$ から $t$ まで積分したもので、零固有ベクトル $u$ には

$$
\|J_0^{\mathsf T}u\|_2^2=u^{\mathsf T}K_0u=0
$$

だから $J_0^{\mathsf T}u=0$ が成り立つ。従って零方向を省き、$\int_0^t e^{-\lambda_js}\,ds=(1-e^{-\lambda_jt})/\lambda_j$ を代入すると表示した $v(t)$ になる。この式を微分すれば元のパラメータ方程式を満たし、初期値も零である。

二つの解 $v,w$ の差 $z=v-w$ について、$\dot z=-J_0^{\mathsf T}J_0z$、$z(0)=0$ であり

$$
\frac{d}{dt}\frac12\|z(t)\|_2^2
=-\|J_0z(t)\|_2^2\le0.
$$

初期値が零、左辺のノルムが非負なので $z(t)=0$。存在と一意性を確認した。

有限個の正固有値では $e^{-\lambda_jt}\to0$。よって $e(\infty)=P_0e_0$ と $g(\infty)=y+P_0(f_0-y)=P_+y+P_0f_0$ となる。損失は $\|e\|_2^2/2$ なので極限の式も従う。また $J_0J_0^{\mathsf T}u_j=K_0u_j=\lambda_ju_j$ を変位の式へ代入すると、

$$
\begin{aligned}
J_0v(t)
&=-\sum_{j=1}^r(1-e^{-\lambda_jt})(u_j^{\mathsf T}e_0)u_j\\
&=-P_+e_0+\sum_{j=1}^r e^{-\lambda_jt}(u_j^{\mathsf T}e_0)u_j.
\end{aligned}
$$

従って極限では $J_0v=-P_+e_0$ を満たす。さらに $u^{\mathsf T}K_0u=\|J_0^{\mathsf T}u\|_2^2$ から $\ker K_0=\ker J_0^{\mathsf T}$ であり、両辺の直交補を取ると $\operatorname{im}K_0=\operatorname{im}J_0$ となる。よって $P_+e_0$ は $J_0$ の像に入り、この変位は最小二乗で到達できる残差を与える。

$v(\infty)$ は式から $J_0^{\mathsf T}$ の像に入る。任意の別の解 $w$ との違い $h=w-v(\infty)$ は $J_0h=0$ だから、

$$
v(\infty)^{\mathsf T}h
=-\sum_{j=1}^r\frac{u_j^{\mathsf T}e_0}{\lambda_j}
u_j^{\mathsf T}J_0h=0.
$$

従って $\|w\|_2^2=\|v(\infty)\|_2^2+\|h\|_2^2$。等号は $h=0$ のときに限り、極限の変位が一意の最小ノルム解である。$\square$
<!-- proof-end -->

### 例：初期出力と零固有方向を忘れない

$$
J_0=\begin{pmatrix}2&0\\0&0\end{pmatrix},\qquad
K_0=\begin{pmatrix}4&0\\0&0\end{pmatrix},\qquad
f_0=\begin{pmatrix}2\\3\end{pmatrix},\quad
y=\begin{pmatrix}6\\1\end{pmatrix}.
$$

$e_0=(-4,2)^{\mathsf T}$ で、第1成分だけが固有値4の方向にある。したがって

$$
g(t)=\begin{pmatrix}6-4e^{-4t}\\3\end{pmatrix},\quad
v(t)=\begin{pmatrix}2(1-e^{-4t})\\0\end{pmatrix},\quad
L_{\mathrm{lin}}(v(t))=8e^{-8t}+2.
$$

$t=0$ で $g(0)=f_0$、$v(0)=0$。また $J_0v(t)=(4(1-e^{-4t}),0)^{\mathsf T}$ だから $g(t)=f_0+J_0v(t)$ と一致する。極限でも2番目の予測は教師1ではなく**初期出力3**に残り、損失は2である。$K_0$ の零方向にある教師と初期出力の差は、いくら長く学習しても消えない。

この到達点は零初期値の[RKHS核勾配流の予測式](../SLT2-07/index.md#thm-slt2-07-kernel-flow-spectrum)と、$f_0\ne0$ の分だけ異なる。具体的には $P_0f_0$ が残る。**訓練残差の消失**と**標本外汎化**も別の問題であり、この有限標本ODEは標本外リスクを直接保証しない。

## 3. 有限の学習率では何が変わるか

実際の更新は連続時間ではなく、有限の歩幅 $\eta>0$ を取ることが多い。そこで同じ固定接線模型の損失を、整数ステップ $k=0,1,\ldots$ で最急降下させる。連続時間の指数因子 $e^{-t\lambda}$ の代わりに $1-\eta\lambda$ が各ステップで掛かるため、学習率が大きいと減衰ではなく振動・発散が起こる。

<a id="thm-slt2-09-discrete-stability"></a>

<!-- formal-statement-start -->
> **定理（固定接線模型の離散勾配降下と安定学習率）**
> $n,p\ge1$、$J_0\in\mathbb R^{n\times p}$、$f_0,y\in\mathbb R^n$、$K_0=J_0J_0^{\mathsf T}$ とする。$v_0=0$、$\eta>0$ から

$$
v_{k+1}=v_k-\eta J_0^{\mathsf T}(f_0+J_0v_k-y)
$$

> と更新し、$e_k=f_0+J_0v_k-y$ とする。$K_0$ の固有値を $\lambda_j\ge0$、直交規格化固有ベクトルを $u_j$ とし、$a_j=u_j^{\mathsf T}e_0$ と置けば、任意の整数 $k\ge0$ について

$$
e_k=\sum_{j=1}^n(1-\eta\lambda_j)^k a_ju_j,
\qquad
L_{\mathrm{lin}}(v_k)=\frac12\sum_{j=1}^n(1-\eta\lambda_j)^{2k}a_j^2.
$$

> $K_0\ne0$ の最大固有値を $\lambda_{\max}>0$ とする。$0<\eta<2/\lambda_{\max}$ なら任意の初期残差で $e_k\to P_0e_0$、$v_k\to v(\infty)$（連続勾配流と同じ最小ノルム変位）となる。
>
> 境界 $\eta=2/\lambda_{\max}$ では最大固有方向に非零残差があれば符号を交互に変え収束しない。$\eta>2/\lambda_{\max}$ ではその方向に非零残差があれば残差ノルムが発散する。
>
> $K_0=0$ のときは任意の $\eta>0$ で $v_k=0$、$e_k=e_0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

出力に $J_0$ を掛けると、残差は毎回 $(I-\eta K_0)$ 倍になる。対称行列の固有基底では各成分が等比数列になり、$|1-\eta\lambda|<1$ が正固有方向の収束条件となる。パラメータ側の更新を等比級数として足せば、連続時間と同じ極限になる。

<!-- proof-start -->
### 証明

$e_{k+1}=f_0+J_0v_{k+1}-y$ に更新式を代入すると

$$
e_{k+1}=e_k-\eta J_0J_0^{\mathsf T}e_k=(I-\eta K_0)e_k.
$$

$K_0u_j=\lambda_ju_j$ で $u_j$ は直交規格化されているため、$e_0=\sum_j a_ju_j$ に順に作用させると

$$
e_k=(I-\eta K_0)^ke_0
=\sum_j(1-\eta\lambda_j)^ka_ju_j.
$$

直交性により $\|e_k\|_2^2=\sum_j(1-\eta\lambda_j)^{2k}a_j^2$。正固有値に対し $|1-\eta\lambda_j|<1$ は $0<\eta\lambda_j<2$ と同値なので、$\eta<2/\lambda_{\max}$ なら正固有方向はすべて零へ、零固有方向はそのまま残る。

同じ更新を $k$ 回足し戻すと $v_k=-\eta J_0^{\mathsf T}\sum_{h=0}^{k-1}e_h$。正固有方向の幾何級数について

$$
\eta\sum_{h=0}^{k-1}(1-\eta\lambda_j)^h
=\frac{1-(1-\eta\lambda_j)^k}{\lambda_j}
\quad (\lambda_j>0).
$$

零固有方向は $J_0^{\mathsf T}u_j=0$ のため変位へ寄与せず、

$$
v_k=-J_0^{\mathsf T}\sum_{\lambda_j>0}
\frac{1-(1-\eta\lambda_j)^k}{\lambda_j}a_ju_j.
$$

安定条件の下で $k\to\infty$ とすれば[連続時間の到達点](#thm-slt2-09-continuous-spectrum)と同じ式を得る。境界 $\eta\lambda_{\max}=2$ では最大固有方向の倍率は $-1$。これを超えると倍率の絶対値は1より大きくなるので、その方向の初期成分が非零なら振動しながら発散する。

$K_0=0$ なら任意の $c\in\mathbb R^n$ に対し $\|J_0^{\mathsf T}c\|_2^2=c^{\mathsf T}K_0c=0$。従って $J_0=0$ であり、更新は常に零となる。$\square$
<!-- proof-end -->

**一歩で損失はどれだけ変わるか。** 上の式から、各固有方向の損失差は

$$
\begin{aligned}
L_{\mathrm{lin}}(v_{k+1})-L_{\mathrm{lin}}(v_k)
&=\frac12\sum_j\bigl\{(1-\eta\lambda_j)^2-1\bigr\}
(u_j^{\mathsf T}e_k)^2\\
&=-\frac12\sum_j\eta\lambda_j(2-\eta\lambda_j)
(u_j^{\mathsf T}e_k)^2.
\end{aligned}
$$

従って $0<\eta\le2/\lambda_{\max}$ なら損失は毎回非増加だが、境界の最大固有モードは減らない。**損失が一歩ごとに増えないこと**と**$e_k$ が極限を持つこと**を区別する。途中で振動しない十分条件はより強い $\eta\le1/\lambda_{\max}$ であり、この範囲では各正固有方向の倍率が $[0,1)$ に入る。これは負の倍率でも絶対値が1未満なら収束することと矛盾しない。

### 例：同じGram行列でも振動する

$K_0=\operatorname{diag}(1,4)$、$e_0=(1,1)^{\mathsf T}$ とする。連続時間では $e(t)=(e^{-t},e^{-4t})^{\mathsf T}$ と滑らかに減衰するが、離散では

$$
e_k=((1-\eta)^k,(1-4\eta)^k)^{\mathsf T}.
$$

$\eta=1/4$ なら第2成分は一歩で零になり、第1成分は $(3/4)^k$。$\eta=2/5$ なら第2成分は $(-3/5)^k$ で符号を交互に変えつつ減る。$\eta=1/2$ なら第2成分は $(-1)^k$ で減らない。$\eta=3/5$ なら $(-7/5)^k$ で絶対値が増える。正半定値の核を持つという事実だけでは、任意の学習率の安定性を意味しない。

### 連続時間と離散時間は同じ曲線ではない

$t=k\eta$ と対応させても、正固有方向のフィルタは $e^{-t\lambda}$ と $(1-\eta\lambda)^k$ で異なる。例えば $\eta\lambda=1/2$、$k=2$ なら離散の倍率は $1/4$、同じ時刻 $t=2\eta$ の連続倍率は $e^{-1}$ である。$\eta\to0$、$k\eta\to t$ とする極限では、

$$
(1-\eta\lambda)^k
=\exp\bigl(k\log(1-\eta\lambda)\bigr)\longrightarrow e^{-t\lambda}
$$

となる。ただし $\eta\lambda<1$ の範囲で $\log(1-\eta\lambda)/\eta\to-\lambda$ を使った。**有限学習率の一致を意味するのではなく、刻みを縮めた極限**である。

## 4. 核が少し動く場合の比較

ここまでは $K_0$ を時間に依らず固定した。元のニューラルネットでは、[有限幅での接線Gram行列の変動](../SLT2-08/index.md#thm-slt2-08-drift-update)が示すように、$K$ はパラメータ更新に伴って動く。固定核との比較を数式にするには、何をどの区間でどれだけ抑えるかを仮定する必要がある。

以下の $\|A\|_{\mathrm{op}}$ は、[2-作用素ノルムの定義](../../../基礎科目/F0/F0-00F2/index.md#def-f0-00f2-operator-norm)に従う。

$$
\|A\|_{\mathrm{op}}=\sup_{\|z\|_2=1}\|Az\|_2.
$$

実対称 $K_0$ の**行列指数** $e^{-tK_0}$ は、直交規格化固有ベクトル $u_j$ に $e^{-t\lambda_j}$ を掛ける線形写像として定まる。従って $K_0$ が正半定値で $t\ge0$ なら、各倍率が $[0,1]$ に入るので

$$
e^{-tK_0}u_j=e^{-t\lambda_j}u_j,\qquad
\|e^{-tK_0}\|_{\mathrm{op}}=\max_{1\le j\le n}e^{-t\lambda_j}\le1
$$

と判定できる。

<a id="thm-slt2-09-kernel-drift-bound"></a>

<!-- formal-statement-start -->
> **定理（時間変化する正半定値核と固定核の誤差）**
> $T>0$、$e_0\in\mathbb R^n$ とし、$K:[0,T]\to\mathbb R^{n\times n}$ は連続な実対称正半定値行列値関数、$K_0=K(0)$ とする。初期値が等しい二つの方程式

$$
\dot e(t)=-K(t)e(t),\quad e(0)=e_0,
\qquad
\dot e_{\mathrm{fix}}(t)=-K_0e_{\mathrm{fix}}(t),\quad e_{\mathrm{fix}}(0)=e_0
$$

> の解に対し、全ての $0\le t\le T$ で

$$
\|e(t)-e_{\mathrm{fix}}(t)\|_2
\le\|e_0\|_2\int_0^t\|K(s)-K_0\|_{\mathrm{op}}\,ds.
$$

> 特に $\sup_{s\in[0,T]}\|K(s)-K_0\|_{\mathrm{op}}\le\varepsilon$ なら誤差は $\varepsilon t\|e_0\|_2$ 以下。これは**有限の区間**の評価であり、$T\to\infty$ で固定核近似が有効だとは結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

正半定値性から実際の残差のノルムは増えない。両方程式の差に対して固定核の行列指数で積分すると、差は核変動を時間積分したものになる。

<!-- proof-start -->
### 証明

$K(t)$ は連続なので線形常微分方程式の解が存在し一意である。正半定値性から、

$$
\frac{d}{dt}\frac12\|e(t)\|_2^2
=-e(t)^{\mathsf T}K(t)e(t)\le0
$$

であり、$\|e(t)\|_2\le\|e_0\|_2$。差を $d(t)=e(t)-e_{\mathrm{fix}}(t)$ と置くと、

$$
\dot d(t)=-K_0d(t)-(K(t)-K_0)e(t),\qquad d(0)=0.
$$

定数行列 $K_0$ に対し、$e^{tK_0}d(t)$ を微分すると

$$
\frac{d}{dt}\bigl(e^{tK_0}d(t)\bigr)
=-e^{tK_0}(K(t)-K_0)e(t).
$$

$0$ から $t$ まで積分し左から $e^{-tK_0}$ を掛けると、

$$
d(t)=-\int_0^te^{-(t-s)K_0}(K(s)-K_0)e(s)\,ds.
$$

$K_0$ は正半定値だから、固有値は非負であり、$t-s\ge0$ で $\|e^{-(t-s)K_0}\|_{\mathrm{op}}\le1$。作用素ノルムと積分の三角不等式、先ほどの $\|e(s)\|_2\le\|e_0\|_2$ を使って表示の界を得る。$\square$
<!-- proof-end -->

**何が保証されたのか。** 例えば $K(t)=\operatorname{diag}(1+t,0)$（$0\le t\le1$）なら正半定値で、$K_0=\operatorname{diag}(1,0)$。$e_0=(1,1)^{\mathsf T}$ から

$$
e(t)=\begin{pmatrix}e^{-t-t^2/2}\\1\end{pmatrix},
\qquad
e_{\mathrm{fix}}(t)=\begin{pmatrix}e^{-t}\\1\end{pmatrix}.
$$

実際に $\|K(s)-K_0\|_{\mathrm{op}}=s$ だから、定理の上界は $\|e_0\|_2 t^2/2$ となる。初期核が同じでも時間とともに差が生じること、また短時間の差が小さくても長時間を論じるには別の条件が要ることが分かる。なおこの例は時間変化する行列模型であり、特定のニューラルネットの幅極限の定理を意味しない。

## 5. 固定核で説明できること・できないこと

- 固定した有限次元 $J_0$ なら、初期出力を含めた予測、パラメータ変位、零固有方向の残差を厳密に計算できる。
- 離散学習率が $2/\lambda_{\max}$ 未満であることは、正固有方向の収束に必要な一様条件である。有限の学習率で指数解と完全一致するわけではない。
- 初期核が正定値でも、実網の学習中に同じ核が続くとは限らない。時間変化する核との誤差には、対象区間の核変動の上界が要る。
- 訓練点での補間、標本外予測の精度、幅を無限大にする極限は別の命題である。後続の無限幅NTKでは初期化・幅・時間区間の条件を明示して扱う。

## 演習

### SLT2-09-A01 一固有方向の初期値付き勾配流
- Level: A
- 目安時間: 10分

$n=p=1$、$J_0=(3)$、$f_0=(2)$、$y=(5)$ とする。$K_0$、$e_0$、$e(t)$、$g(t)$、$v(t)$ を計算し、$t=0$ の条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

$K_0=3^2=9$、$e_0=2-5=-3$。残差は $\dot e=-9e$ だから[連続時間のスペクトル解](#thm-slt2-09-continuous-spectrum)に $\lambda=9$、$a=-3$ を代入し、

$$
e(t)=-3e^{-9t},\qquad g(t)=5-3e^{-9t}.
$$

また $\dot v=-3e(t)=9e^{-9t}$、$v(0)=0$ なので、

$$
v(t)=\int_0^t9e^{-9s}\,ds=1-e^{-9t}.
$$

$f_0+J_0v(t)=2+3(1-e^{-9t})=g(t)$。$t=0$ で $g(0)=2$、$v(0)=0$ と一致する。
<!-- solution-end -->

### SLT2-09-A02 零固有方向の到達不能な教師
- Level: A
- 目安時間: 12分

$J_0=\begin{pmatrix}1\\1\end{pmatrix}$、$f_0=(0,0)^{\mathsf T}$、$y=(2,0)^{\mathsf T}$ とする。$K_0$ の固有値を求め、$g(\infty)$ と極限損失を計算せよ。

<!-- solution-start -->
#### 詳細解答

$K_0=\begin{pmatrix}1&1\\1&1\end{pmatrix}$。直交規格化固有ベクトル $u_+=(1,1)^{\mathsf T}/\sqrt2$ と $u_0=(1,-1)^{\mathsf T}/\sqrt2$ に対し、固有値はそれぞれ2と0。$e_0=(-2,0)^{\mathsf T}$ を零方向へ射影すると

$$
P_0e_0=(u_0^{\mathsf T}e_0)u_0
=-\sqrt2\frac1{\sqrt2}\begin{pmatrix}1\\-1\end{pmatrix}
=\begin{pmatrix}-1\\1\end{pmatrix}.
$$

よって $g(\infty)=y+P_0e_0=(1,1)^{\mathsf T}$、損失は $\frac12((-1)^2+1^2)=1$。$J_0$ の像は等しい2成分のみなので、教師 $(2,0)$ を完全には再現できない。
<!-- solution-end -->

### SLT2-09-A03 学習率と損失の一歩変化
- Level: A
- 目安時間: 10分

$K_0=\operatorname{diag}(2,5)$、$e_0=(1,-2)^{\mathsf T}$、$\eta=1/5$ とする。$e_1$ と $L_0,L_1$ を求め、安定学習率条件を確認せよ。

<!-- solution-start -->
#### 詳細解答

$I-\eta K_0=\operatorname{diag}(1-2/5,1-5/5)=\operatorname{diag}(3/5,0)$ だから

$$
e_1=\begin{pmatrix}3/5\\0\end{pmatrix},\quad
L_0=\frac12(1+4)=\frac52,\quad
L_1=\frac12\left(\frac35\right)^2=\frac9{50}.
$$

$\lambda_{\max}=5$ で収束条件は $0<\eta<2/5$。$1/5$ はその範囲内にあり、固有方向の倍率は $3/5$ と0で振動せずに減衰する。
<!-- solution-end -->

### SLT2-09-A04 損失の規格化と時間の因子
- Level: A
- 目安時間: 10分

$n=4$ の固定接線模型で $L(v)=\|f_0+J_0v-y\|_2^2/(2n)$ を使う。勾配流の予測残差方程式と、元の $1/2$ 規格化の時間 $t$ と等しい減衰になる新しい時間 $s$ の関係を求めよ。

<!-- solution-start -->
#### 詳細解答

$L$ の方向微分は $n^{-1}(J_0^{\mathsf T}e)^{\mathsf T}h$。よって $\dot v(s)=-J_0^{\mathsf T}e(s)/n$、$\dot e(s)=-K_0e(s)/n$ となる。各固有方向の倍率は $e^{-s\lambda/n}$ であり、元の規格化の $e^{-t\lambda}$ と等しいには $s/n=t$、すなわち $s=nt=4t$ と置く。損失の係数を変えて時間だけ据え置くと減衰速度は4分の1になる。
<!-- solution-end -->

### SLT2-09-A05 初期出力を零と置いてはいけない
- Level: A
- 目安時間: 12分

$K_0=\operatorname{diag}(0,2)$、$f_0=(4,1)^{\mathsf T}$、$y=(1,3)^{\mathsf T}$ とする。$g(t)$ と $g(\infty)$ を求め、誤って $g(0)=0$ とした場合の予測との違いを説明せよ。

<!-- solution-start -->
#### 詳細解答

$e_0=f_0-y=(3,-2)^{\mathsf T}$。零固有方向の残差3は変化せず、正固有方向の $-2$ だけが $e^{-2t}$ 倍になるので

$$
e(t)=\begin{pmatrix}3\\-2e^{-2t}\end{pmatrix},\quad
g(t)=\begin{pmatrix}4\\3-2e^{-2t}\end{pmatrix},\quad
g(\infty)=\begin{pmatrix}4\\3\end{pmatrix}.
$$

もし $g(0)=0$ に変えると初期残差は $-y=(-1,-3)^{\mathsf T}$ となり、予測は $(0,3-3e^{-2t})^{\mathsf T}$。これは初期予測 $f_0$ を捨てた**別の模型**である。
<!-- solution-end -->

### SLT2-09-B01 零空間と最小ノルム変位
- Level: B
- 目安時間: 18分

$J_0=\begin{pmatrix}1&1\\0&0\end{pmatrix}$、$f_0=(0,0)^{\mathsf T}$、$y=(2,3)^{\mathsf T}$ とする。連続時間の $v(t)$、$g(t)$、極限損失を求め、極限変位が制約 $J_0v=(2,0)^{\mathsf T}$ の最小ノルム解であることを直接証明せよ。

<!-- solution-start -->
#### 詳細解答

$K_0=J_0J_0^{\mathsf T}=\operatorname{diag}(2,0)$、$e_0=(-2,-3)^{\mathsf T}$。[スペクトル解](#thm-slt2-09-continuous-spectrum)から

$$
e(t)=\begin{pmatrix}-2e^{-2t}\\-3\end{pmatrix},\quad
g(t)=\begin{pmatrix}2(1-e^{-2t})\\0\end{pmatrix}.
$$

$\dot v=-J_0^{\mathsf T}e=(2e^{-2t},2e^{-2t})^{\mathsf T}$ を積分すると

$$
v(t)=\begin{pmatrix}1-e^{-2t}\\1-e^{-2t}\end{pmatrix}
\longrightarrow\begin{pmatrix}1\\1\end{pmatrix}.
$$

最終残差は $(0,-3)$ で損失は $9/2$。制約 $v_1+v_2=2$ の下で $v_2=2-v_1$ と書くと

$$
v_1^2+v_2^2=v_1^2+(2-v_1)^2
=2(v_1-1)^2+2\ge2.
$$

等号は $v_1=v_2=1$ のときだけ。極限変位が最小ノルムである。
<!-- solution-end -->

### SLT2-09-B02 安定でも符号は反転する
- Level: B
- 目安時間: 18分

$K_0=\operatorname{diag}(1,4)$、$e_0=(2,1)^{\mathsf T}$ とする。$\eta=2/5$ における $e_1,e_2$ と $L_0,L_1,L_2$ を計算し、各モードの符号と損失の変化を説明せよ。さらに $\eta=1/2$ なら何が起こるか。

<!-- solution-start -->
#### 詳細解答

$I-\eta K_0=\operatorname{diag}(3/5,-3/5)$。従って

$$
e_1=\begin{pmatrix}6/5\\-3/5\end{pmatrix},\quad
e_2=\begin{pmatrix}18/25\\9/25\end{pmatrix}.
$$

直交成分の二乗和から、

$$
L_0=\frac12(4+1)=\frac52,\quad
L_1=\frac12\left(\frac{36}{25}+\frac9{25}\right)=\frac9{10},\quad
L_2=\frac12\left(\frac{324}{625}+\frac{81}{625}\right)=\frac{81}{250}.
$$

第2成分だけ $(-3/5)^k$ によって符号が反転しつつ絶対値は減る。$\eta=2/5<2/4$ なので損失は減り予測は収束する。$\eta=1/2$ では第2固有方向の倍率は $-1$、初期成分が1なので $e_{k,2}=(-1)^k$ のまま収束せず、損失も少なくとも $1/2$ 残る。
<!-- solution-end -->

### SLT2-09-B03 動く核での有限時間誤差
- Level: B
- 目安時間: 18分

$0\le t\le1$ で $K(t)=\operatorname{diag}(1+t,2)$、$K_0=\operatorname{diag}(1,2)$、$e_0=(1,-1)^{\mathsf T}$ とする。動く核と固定核の残差を計算し、[核変動界](#thm-slt2-09-kernel-drift-bound)の上界を具体化せよ。

<!-- solution-start -->
#### 詳細解答

第1成分は $\dot e_1=de_1/dt=-(1+t)e_1$ だから、積分因子 $e^{t+t^2/2}$ を掛けると

$$
\frac{d}{dt}\bigl(e^{t+t^2/2}e_1(t)\bigr)
=e^{t+t^2/2}\bigl((1+t)e_1(t)+\dot e_1(t)\bigr)=0.
$$

$e_1(0)=1$ より $e_1(t)=e^{-t-t^2/2}$。第2成分は $\dot e_2=-2e_2$、$e_2(0)=-1$ なので $e_2(t)=-e^{-2t}$。固定核なら

$$
e(t)=\begin{pmatrix}e^{-t-t^2/2}\\-e^{-2t}\end{pmatrix},\qquad
e_{\mathrm{fix}}(t)=\begin{pmatrix}e^{-t}\\-e^{-2t}\end{pmatrix}.
$$

差のノルムは $e^{-t}(1-e^{-t^2/2})$。ここで $\|K(s)-K_0\|_{\mathrm{op}}=s$、$\|e_0\|_2=\sqrt2$ なので、定理は

$$
\|e(t)-e_{\mathrm{fix}}(t)\|_2\le\sqrt2\int_0^t s\,ds
=\frac{\sqrt2}{2}t^2.
$$

$1-e^{-u}\le u$（$u\ge0$）より実差は $e^{-t}t^2/2\le t^2/2$、確かに上界以下である。時間依存の誤差評価を固定の無限時間保証へ延長してはいけない。
<!-- solution-end -->

### SLT2-09-B04 離散時間から連続時間へ
- Level: B
- 目安時間: 20分

$\lambda>0$ の単一固有方向で、$0<\eta\lambda<1$ とする。$k\eta=t$ を一定に近づけながら $\eta\to0$ としたとき $(1-\eta\lambda)^k\to e^{-t\lambda}$ を示せ。なぜ $\eta$ を固定して $k\to\infty$ とする議論とは異なるか。

<!-- solution-start -->
#### 詳細解答

$z=\eta\lambda\in(0,1)$ と置き、$\log(1-z)$ を $0$ で微分すると $\lim_{z\to0}\log(1-z)/z=-1$。従って

$$
k\log(1-\eta\lambda)
=(k\eta)\lambda\frac{\log(1-\eta\lambda)}{\eta\lambda}
\longrightarrow -t\lambda.
$$

指数関数は連続なので $(1-\eta\lambda)^k\to e^{-t\lambda}$。これは $\eta$ を縮めながらステップ数を増やす有限時刻極限である。一方、$\eta$ 固定で $k\to\infty$ とすると $k\eta\to\infty$ であり、$0<\eta\lambda<2$ なら倍率は0へ収束するが、$\eta\lambda=2$ なら $(-1)^k$ で収束しない。極限を取り違えると学習率の安定性を見落とす。
<!-- solution-end -->

### SLT2-09-C01 三つの訓練点で全てをつなぐ
- Level: C
- 目安時間: 35分

$n=3,p=2$ で

$$
J_0=\begin{pmatrix}1&0\\0&2\\0&0\end{pmatrix},\qquad
f_0=\begin{pmatrix}1\\0\\3\end{pmatrix},\qquad
y=\begin{pmatrix}3\\4\\0\end{pmatrix}.
$$

1. $K_0$、$e_0$ と三つの固有値を求め、補間可能か判定せよ。
2. 連続時間の $e(t),g(t),v(t)$ と極限損失を計算し、$v(t)$ の式を直接微分して確認せよ。
3. 離散勾配降下が任意の初期残差で正固有方向を収束させる $\eta$ の範囲を求めよ。$\eta=1/4$ の $e_1,L_1$ と $\eta=1/2$ での第2成分の挙動を計算せよ。
4. $0\le t\le1$ の間だけ $K(t)=\operatorname{diag}(1+t,4,0)$ に変えた場合の残差と、固定核に対する定理の誤差上界を求めよ。固定核解と完全には一致しない理由を述べよ。

<!-- solution-start -->
#### 詳細解答

**1.** $K_0=J_0J_0^{\mathsf T}=\operatorname{diag}(1,4,0)$、$e_0=f_0-y=(-2,-4,3)^{\mathsf T}$。固有値は1、4、0。第3成分は $K_0$ の核方向にあり $e_{0,3}=3\ne0$ なので、[補間条件](#thm-slt2-09-continuous-spectrum) $P_0e_0=0$ を満たさず、全点の補間はできない。

**2.** 正固有方向はそれぞれ指数減衰し、第3成分は一定だから、

$$
e(t)=\begin{pmatrix}-2e^{-t}\\-4e^{-4t}\\3\end{pmatrix},\qquad
g(t)=\begin{pmatrix}3-2e^{-t}\\4-4e^{-4t}\\3\end{pmatrix}.
$$

$\dot v=-J_0^{\mathsf T}e$ の右辺は $(2e^{-t},8e^{-4t})^{\mathsf T}$。初期変位零から積分すると

$$
v(t)=\begin{pmatrix}2(1-e^{-t})\\2(1-e^{-4t})\end{pmatrix}.
$$

微分すると $\dot v=(2e^{-t},8e^{-4t})^{\mathsf T}=-J_0^{\mathsf T}e(t)$ で、$v(0)=0$、$f_0+J_0v(t)=g(t)$ も確認できる。極限残差は $(0,0,3)^{\mathsf T}$ だから $L_\infty=\frac12\cdot9=9/2$。

**3.** $\lambda_{\max}=4$ なので $0<\eta<1/2$ が一様な収束範囲。$\eta=1/4$ では倍率が $3/4,0,1$ なので

$$
e_1=\begin{pmatrix}-3/2\\0\\3\end{pmatrix},\qquad
L_1=\frac12\left(\frac94+9\right)=\frac{45}{8}.
$$

$\eta=1/2$ では第2成分の倍率は $1-\eta\cdot4=-1$ であり $e_{k,2}=-4(-1)^k$。零へ収束しない。第3成分はどの $\eta$ でも3のままである。

**4.** 動く核の方程式では第1成分だけ係数が $1+t$ になり、積分 $\int_0^t(1+s)\,ds=t+t^2/2$ によって

$$
e_{\mathrm{move}}(t)=\begin{pmatrix}-2e^{-t-t^2/2}\\-4e^{-4t}\\3\end{pmatrix},\qquad
e_{\mathrm{fix}}(t)=\begin{pmatrix}-2e^{-t}\\-4e^{-4t}\\3\end{pmatrix}.
$$

この例では $\|K(s)-K_0\|_{\mathrm{op}}=s$ で、初期残差のノルムは $\sqrt{4+16+9}=\sqrt{29}$。従って[核変動界](#thm-slt2-09-kernel-drift-bound)から

$$
\|e_{\mathrm{move}}(t)-e_{\mathrm{fix}}(t)\|_2
\le\sqrt{29}\,t^2/2
$$

を得る。実差は $2e^{-t}(1-e^{-t^2/2})\le t^2$ であり、その範囲に入る。核が時間依存すると第1成分の減衰積分が変わるため、初期核が等しいだけで同じ解にはならない。
<!-- solution-end -->

## 章末チェック

- 固定核の勾配流で残差の零固有方向が保存されることを、予測の式だけでなく勾配方程式から説明できるか。
- $f_0\ne0$ のとき $g(\infty)$ が $P_+y+P_0f_0$ となる理由を説明できるか。
- 正の各固有値に対し $|1-\eta\lambda|<1$ の条件と、核が動く場合に必要な追加仮定を区別できるか。
