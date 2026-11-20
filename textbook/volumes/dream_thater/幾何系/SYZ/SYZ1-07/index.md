# SYZ1-07 局所トーラス・ファイブレーションと作用・角変数

<!-- definition-example-audit: strict -->

## 1. 変形できることと、空間をトーラスで覆うことは違う

[McLeanの局所無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)によって、コンパクトで境界のない特殊Lagrange（SLag）部分多様体 $L$ の**近くのSLag埋め込み像の集合**は、局所的に $b_1(L)$ 次元の滑らかな多様体になる。$L=T^n$ なら $b_1(T^n)=n$ である。

しかし、別々の変形先が交差しないことも、その変形先が周囲のCalabi–Yau多様体を埋め尽くすことも、この定理は保証しない。「変形空間が $n$ 次元」と「実 $2n$ 次元の空間を $n$ 次元トーラスでファイブレーションする」は論理的に別の命題である。

今回の中心問いは、**既に滑らかなトーラス束が与えられているなら、周期を使ってどこまで標準的な座標を作れるか**、である。SLagの仮定をいったん忘れても成り立つシンプレクティック幾何の計算を行い、最後にMcLeanの変形理論と結び付ける。

## 2. 追加仮定：正則部分上のSLagトーラス束

$X$ は実次元 $2n$（複素次元 $n\ge1$）のKähler多様体で、閉じたシンプレクティック形式 $\omega$、規格化した正則体積形式 $\Omega$ を持つとする。$B$ は実 $n$ 次元の基底候補である。ここでは滑らかな部分を $B_0\subset B$ と書き、$X_0=\pi^{-1}(B_0)$ のみに話を限定する。もし $\pi$ に特異値があれば、それを除いた部分を考える、という意味である。

**局所自明**とは、各 $b_0\in B_0$ の周りに開集合 $U$ があり、$\pi^{-1}(U)$ を $U\times T^n$ と滑らかに同一視でき、$\pi$ が第1成分への射影になることである。局所積表示を持つことは、全空間が大域的に $B_0\times T^n$ という積であることを意味しない。

<a id="def-syz1-07-regular-fibration"></a>

<!-- formal-statement-start -->
> **定義（滑らかなSLagトーラス・ファイブレーション）**  
> $(X,J,g,\omega,\Omega)$ を上記のKähler・正則体積構造を持つ複素 $n$ 次元多様体とする。実 $n$ 次元多様体 $B_0$ と滑らかな局所自明束

$$
\pi:X_0\longrightarrow B_0
$$

> が与えられ、各ファイバー $L_b=\pi^{-1}(b)$ は非空・連結・コンパクト・境界なしの実 $n$ 次元トーラスであるとする。各 $L_b$ が指定した向きと（局所的に一定の）位相 $\theta$ に対して

$$
\omega|_{L_b}=0,\qquad
\operatorname{Im}(e^{-i\theta}\Omega)|_{L_b}=0,
\qquad
\operatorname{Re}(e^{-i\theta}\Omega)|_{L_b}
=\operatorname{vol}_{L_b}
$$

> を満たすとき、この束を滑らかなSLagトーラス・ファイブレーションと呼ぶ。この**束の存在は追加仮定**であり、McLeanの定理の結論ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-07-regular-fibration -->
### 直接例：平坦複素トーラスで定義の全条件を確認する

**定義の確認**

$X=(\mathbb C/(\mathbb Z+i\mathbb Z))^n$ とし、$z^j=x^j+iy^j$、$\omega=\sum_j dx^j\wedge dy^j$、$\Omega=dz^1\wedge\cdots\wedge dz^n$ を取る。$B_0=(\mathbb R/\mathbb Z)^n$ として

$$
\pi([x+iy])=[y],\qquad L_{[y]}=\{[x+iy]:[x]\in T^n\}
$$

と置く。$\pi$ は実座標で $y$ への射影なので微分の階数は $n$、局所自明であり、ファイバーは連結・コンパクト・境界なしの $T^n$ である。ファイバー上では $dy^j=0$ だから $\omega|_{L_y}=0$。[Lagrange部分多様体の判定](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)に必要な実次元も $n$ である。さらに $dz^j|_{L_y}=dx^j$ より

$$
\Omega|_{L_y}=dx^1\wedge\cdots\wedge dx^n
=\operatorname{vol}_{L_y}>0
$$

となり、標準向きで位相 $\theta=0$ のSLagである。**全空間で積束である**特別な例だが、定義に必要なのは局所積表示だけである。
<!-- definition-example-end -->

以後、第3〜6節ではより弱い仮定だけを使う。すなわち、$(M^{2n},\omega)$ がシンプレクティック多様体で、$\pi:M\to B_0$ は連結なコンパクトLagrangeトーラス $T^n$ をファイバーとする滑らかな局所自明束とする。SLagはLagrangeなので、上の定義からこの設定に移れる。

## 3. 基底の関数から、ファイバー内を動く流れを作る

基底の小さな座標近傍 $U$ に座標 $b=(b^1,\ldots,b^n)$ を取る。$H_i=b^i\circ\pi$ は $M$ 上の関数である。Hamiltonベクトル場の**符号規約**を

$$
\iota_{X_H}\omega=-dH
$$

と固定する。$H_i$ はファイバーに沿って一定だから、$W\in T_xL_b$ には $dH_i(W)=0$。従って $\omega(X_{H_i},W)=0$。ファイバーはLagrangeであり、そのシンプレクティック直交補は自分自身だから、$X_{H_i}$ はファイバー接方向である。

また、各点の $dH_i=\pi^*db^i$ は独立である。$\omega$ の非退化性から $X_{H_1},\ldots,X_{H_n}$ も独立で、$n$ 次元の $T_xL_b$ の基底になる。

二つの $X_{H_i}$ は可換である。実際、$dH_i(X_{H_j})=0$ と $d\omega=0$ を用い、閉形式についての[Cartan公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)から

$$
\mathcal L_{X_{H_i}}\omega
=d(\iota_{X_{H_i}}\omega)
=-d^2H_i=0
$$

である。したがって $X_{H_i}$ の流れ $\varphi_s$ は $\omega$ を保つ。$X_{H_i}$ はファイバーに接するので、$H_j\circ\varphi_s=H_j$ も成り立つ。

ここで、$z\in L_b$ と $\varphi_s(z)$ における任意の接ベクトル $w$ に対して、流れが $\omega$ を保つこととHamilton場の定義を順に用いると

$$
\begin{aligned}
\omega_{\varphi_s(z)}(d\varphi_s(X_{H_j}(z)),w)
&=\omega_z(X_{H_j}(z),d\varphi_s^{-1}(w))\\
&=-dH_j|_z(d\varphi_s^{-1}(w))\\
&=-dH_j|_{\varphi_s(z)}(w).
\end{aligned}
$$

最後は $H_j\circ\varphi_s=H_j$ を微分した等式である。$\omega$ の非退化性から、$d\varphi_s(X_{H_j}(z))=X_{H_j}(\varphi_s(z))$ である。つまり $X_{H_i}$ の流れは $X_{H_j}$ を保つので、それぞれの流れは可換である。

各流れはコンパクトな $L_b$ の上で全時間存在するため、組み合わせて $\mathbb R^n$ の作用が得られる。

<a id="prop-syz1-07-flow-torus"></a>

<!-- formal-statement-start -->
> **命題（Hamilton流によるトーラスの表示）**  
> 上記の滑らかなLagrangeトーラス束と基底座標 $b^1,\ldots,b^n$ を取る。$X_i=X_{b^i\circ\pi}$ の可換な時間 $t_i$ 流を合成した作用を $\Phi_t$ とする。各 $b\in U$ について、その周期集合

$$
\Gamma_b=\{t\in\mathbb R^n:\Phi_t(x)=x\}
$$

> は $x\in L_b$ の選択に依存せず、階数 $n$ の格子である。$t\mapsto\Phi_t(x)$ は商を通じて滑らかな同一視

$$
\mathbb R^n/\Gamma_b\ \cong\ L_b
$$

> を与える。
<!-- formal-statement-end -->

### 証明の見取り図

流れの速度ベクトルが各点でファイバー接空間を張るので、軌道は開集合である。コンパクト・連結なファイバー内に開いた軌道が一つしかないことから推移性が従う。時間 $t$ が同じ点へ戻る集合は、局所微分同相の核であり、トーラスを与える全格子になる。

<!-- proof-start -->
### 証明

任意の $x\in L_b$ に対し $F_x:\mathbb R^n\to L_b$ を $F_x(t)=\Phi_t(x)$ とする。原点での微分は

$$
dF_x|_0(e_i)=X_i(x)
$$

であり、これは $T_xL_b$ の基底だから同型である。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から各軌道は開集合である。軌道分解は $L_b$ を互いに交わらない開集合に分ける。$L_b$ が連結なので軌道は一つ、従って $F_x$ は全射である。

周期集合 $\Gamma_b=F_x^{-1}(x)$ は加法群である。可換な作用の推移性から、ファイバー上の任意の点は $y=\Phi_s(x)$ と表せる。

$$
\Phi_t(y)=y\quad\Longleftrightarrow\quad
\Phi_t(x)=x
$$

が成り立つので、周期集合は点 $x$ に依存しない。微分 $dF_x|_0$ は同型だから、原点の十分小さい近傍に0以外の周期はない。従って $\Gamma_b$ は離散部分群である。

商 $\mathbb R^n/\Gamma_b$ は、写像 $F_x$ によって $L_b$ と微分同相である。特に商はコンパクトである。

ここで離散部分群の格子表示を使う。離散部分群が張る実部分空間の次元を $r$ とすると、整数基底を選んで $\Gamma_b\cong\mathbb Z^r$ と書ける。$r<n$ なら商には非コンパクトな $\mathbb R^{n-r}$ 方向が残るため矛盾する。従って $r=n$ であり、$\Gamma_b$ は全格子である。
<!-- proof-end -->

## 4. 周期格子を余接空間へ移し、作用座標を得る

ここまでの $\Gamma_b$ は**選んだ基底座標 $b^i$ による時間ベクトルの格子**である。これを基底の余接空間へ写すと、座標に依存しない周期の情報が見える。

<a id="def-syz1-07-period-cotangent"></a>

<!-- formal-statement-start -->
> **定義（周期余接格子）**  
> 第3節の設定で、$b\in U$ の各時間周期 $t=(t_1,\ldots,t_n)\in\Gamma_b$ に対して

$$
\beta_t=\sum_{i=1}^n t_i\,db^i\big|_b
$$

> を対応させる。その像を $\Lambda_b\subset T_b^*B_0$ とし、周期余接格子と呼ぶ。$\Lambda_b$ は階数 $n$ の整数格子（$\mathbb Z$ 加群）であり、単なる実ベクトル空間 $T_b^*B_0$ とは区別する。
<!-- formal-statement-end -->

この定義は座標の取り方にも依らない。実際、$\xi\in T_b^*B_0$ に対し $df_b=\xi$ となる基底関数 $f$ を選び、$X_{f\circ\pi}$ のファイバー上の時間1流が恒等となる $\xi$ 全体を取れば、同じ $\Lambda_b$ が得られる。$df_b$ の値が同じ二つの $f$ はファイバー上で同じHamilton場を定める。基底座標で $\xi=\sum_i t_i\,db^i$ と展開すれば $X_{f\circ\pi}=\sum_i t_iX_i$ なので、上の時間周期の式と一致する。

<!-- definition-example-start: def-syz1-07-period-cotangent -->
### 直接例：角度の速さが変わる円筒

**定義の確認**

$M=(0,\infty)\times(\mathbb R/\mathbb Z)$ に座標 $(b,\vartheta)$ を取り、

$$
\omega=b\,db\wedge d\vartheta,\qquad
\pi(b,\vartheta)=b
$$

とする。$b>0$ なので $\omega$ は非退化、また2次元では $d\omega=0$。各ファイバーは閉じた円周で、1次元だから $\omega$ の制限は0、ゆえにLagrangeである。Hamilton方程式は

$$
\iota_{X_b}\omega=-db,\qquad
X_b=\frac1b\partial_\vartheta
$$

となる。$\vartheta$ は周期1だから、時間周期は $b\mathbb Z$ である。したがって

$$
\Gamma_b=b\mathbb Z,\qquad
\Lambda_b=\mathbb Z\,(b\,db).
$$

各 $b$ に格子の生成元があり、ゼロでない。**格子の生成元が $db$ とは限らない**ことを、時間周期と余接1形式の両方で確認した。
<!-- definition-example-end -->

局所自明化されたトーラス束で各ファイバーの整数一次ホモロジー群から閉路基底を固定する。これらの閉路に対応する原始周期ベクトルを、基底点に滑らかに依存するように選びたい。

基準点 $b_0$ における $a$ 番目の周期を $t^{(a)}(b_0)$ とする。局所切断 $s(b)$ を使い、各ファイバー内の座標で次の方程式を考える。

$$
\Phi_t(s(b))=s(b).
$$

時間変数 $t$ に関する左辺の微分は、$X_1,\ldots,X_n$ を列とする可逆行列である。従って[陰関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-implicit-function)により、$b_0$ の十分小さい近傍に滑らかな解 $t=t^{(a)}(b)$ が存在する。

局所自明化で閉路の整数基底を固定し、さらに近傍を縮めると、各 $t^{(a)}(b)$ はそれぞれの原始閉路を表す。以後、$a=1,\ldots,n$ とする。

この周期から $U$ 上の1形式

$$
\beta_a=\sum_i t_i^{(a)}(b)\,db^i
$$

を作る。次の閉性が核心である。

<a id="lem-syz1-07-period-closed"></a>

<!-- formal-statement-start -->
> **補題（周期1形式の閉性）**  
> 第3節の滑らかなLagrangeトーラス束で、局所的に滑らかに選んだ各周期ベクトル $t^{(a)}(b)$ の周期1形式 $\beta_a$ は閉じている。

$$
d\beta_a=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

周期に合わせた垂直ベクトル場を流して**ちょうど時間1で全ファイバー上の恒等写像**にする。その流れが $\omega$ を変化させる量は $-d\beta_a$ であり、恒等写像なら変化は0でなければならない。

<!-- proof-start -->
### 証明

$Y_a=\sum_i(t_i^{(a)}\circ\pi)X_i$ を $\pi^{-1}(U)$ 上で定める。係数は基底の関数なので流れの間は一定であり、各点での時間1の流れは $\Phi_{t^{(a)}(b)}$、すなわち恒等写像である。符号規約と $H_i=b^i\circ\pi$ より

$$
\iota_{Y_a}\omega
=-\sum_i(t_i^{(a)}\circ\pi)\,dH_i
=-\pi^*\beta_a.
$$

$d\omega=0$ と[Cartan公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)から

$$
\mathcal L_{Y_a}\omega
=d(\iota_{Y_a}\omega)=-\pi^*(d\beta_a).
$$

$Y_a$ は垂直なのでその流れ $\varphi_s$ は $\pi\circ\varphi_s=\pi$ を満たす。従って $\varphi_s^*\pi^*(d\beta_a)=\pi^*(d\beta_a)$ であり、

$$
\varphi_1^*\omega-\omega
=\int_0^1\varphi_s^*(\mathcal L_{Y_a}\omega)\,ds
=-\pi^*(d\beta_a).
$$

左辺は $\varphi_1=\mathrm{id}$ により0。$\pi$ は劣没なので、任意の $b$ の接ベクトルは $M$ の接ベクトルから持ち上げられる。よって $\pi^*$ は基底の2形式に対して単射であり、$d\beta_a=0$ を得る。
<!-- proof-end -->

小さく取り直した $U$ を星形・単連結にし、閉1形式の局所ポテンシャルを取る。[閉形式の局所ポテンシャル](../SYZ1-02/index.md#prop-syz1-02-radial-potential)と同じ放射積分の手法によって

$$
dI_a=\beta_a
$$

と書ける（$I_a$ は加法定数を除いて定まる）。$n\times n$ 行列 $(t_i^{(a)})$ は格子基底だから可逆であり、$dI_1,\ldots,dI_n$ は独立である。従って $I=(I_1,\ldots,I_n)$ 自身が基底の局所座標になる。このように周期格子の基底を微分に持つ局所座標が、次の定義の対象である。

<a id="def-syz1-07-action-chart"></a>

<!-- formal-statement-start -->
> **定義（周期格子から定まる作用座標）**  
> 滑らかなLagrangeトーラス束の連結な局所基底 $U$ において、周期余接格子 $\Lambda_b$ の滑らかな整数基底 $\beta_1,\ldots,\beta_n$ を選ぶ。実数値関数 $I_1,\ldots,I_n$ が

$$
dI_a=\beta_a,\qquad a=1,\ldots,n
$$

> を満たすとき、$I=(I_1,\ldots,I_n)$ をこの格子基底に関する作用座標と呼ぶ。加法定数の選択と $GL(n,\mathbb Z)$ による整数基底変更は許すが、任意の実線形座標変換を同じ周期格子の座標変更とはみなさない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-07-action-chart -->
### 直接例：変速円周の作用座標を再判定する

**定義の確認**

第4節の円筒では $\Lambda_b=\mathbb Z(b\,db)$。$I=b^2/2$ は $dI=b\,db$ であり、$dI/db=b>0$ なので局所座標である。$I'=2I$ も通常の実座標にはなるが、$dI'=2b\,db$ は同じ格子の原始生成元ではない。$\mathbb Z(2b\,db)$ は元の周期格子の指数2の部分格子なので、**整数周期に基づく作用座標**の条件を満たさない。
<!-- definition-example-end -->

<a id="prop-syz1-07-action-coordinates"></a>

<!-- formal-statement-start -->
> **命題（周期からの作用座標の構成）**  
> 第3節の局所自明なLagrangeトーラス束で、周期格子の滑らかな整数基底を $U$ 上で固定する。十分小さい単連結座標近傍 $U$ において、局所座標 $I_1,\ldots,I_n$ が存在し、その微分が選んだ周期1形式に一致する。基底を別の整数基底へ変更した場合、同じ連結近傍上の作用座標は

$$
I'=AI+c,\qquad A\in GL(n,\mathbb Z),\quad c\in\mathbb R^n
$$

> で結ばれる。
<!-- formal-statement-end -->

### 証明の見取り図

閉性から局所ポテンシャルを作り、周期ベクトルの独立性から微分の階数を確かめる。整数基底変更では周期1形式が $A$ 倍されるので、積分した座標は定数を除いて $A$ 倍される。

<!-- proof-start -->
### 証明

[周期1形式の閉性](#lem-syz1-07-period-closed)から星形 $U$ 上に $I_a$ があり $dI_a=\beta_a$。$dI_a=\sum_i t_i^{(a)}db^i$ なので、Jacobian行列は周期ベクトルを行にもつ行列であり、格子の基底であることから行列式は非零である。逆関数定理によって $I$ は局所座標である。別の整数基底を $\beta'_a=\sum_jA_{aj}\beta_j$ とすれば

$$
d(I'_a-\sum_j A_{aj}I_j)=0.
$$

$U$ は連結だから括弧内は定数 $c_a$ となる。整数格子の基底変更とその逆が整数係数なので $A\in GL(n,\mathbb Z)$ である。
<!-- proof-end -->

ここで得たのはまず**シンプレクティック周期からの一種類の局所整数アフィン座標**である。SLagの体積形式側から来る別の周期・二つのアフィン構造の比較は次講 SYZ1-08 で扱う。

## 5. 角変数を作り、シンプレクティック形式を標準化する

$dI_a=\sum_i t_i^{(a)}db^i$ なので、Hamiltonベクトル場の線形性から

$$
X_{I_a\circ\pi}=\sum_i t_i^{(a)}X_i=Y_a
$$

となる。各 $Y_a$ の時間1流は恒等写像である。全ての $Y_a$ を組み合わせると、各ファイバーに自由かつ推移的な $(\mathbb R/\mathbb Z)^n$ の作用ができる。

基底の小さな $U$ 上で滑らかな切断 $s:U\to M$ を一つ選び、

$$
F(I,\vartheta)
=\varphi^{Y_1}_{\vartheta_1}\circ\cdots\circ
\varphi^{Y_n}_{\vartheta_n}(s(I))
$$

と置く。各 $\vartheta_a$ は周期1であり（$2\pi$ 周期ではない）、次の意味で角変数になる。

<a id="def-syz1-07-angle-chart"></a>

<!-- formal-statement-start -->
> **定義（周期1の角変数）**  
> 上の作用座標 $I_a$ と、そのHamilton場 $Y_a=X_{I_a\circ\pi}$ に対し、各ファイバー上の円周値座標 $\vartheta=(\vartheta_1,\ldots,\vartheta_n)\in(\mathbb R/\mathbb Z)^n$ が

$$
\vartheta(\varphi_t^{Y_a}(x))
=\vartheta(x)+t e_a\pmod{\mathbb Z^n}
$$

> を満たすとき、$\vartheta_a$ を周期1の角変数と呼ぶ。ここで $e_a$ は第 $a$ 標準基底である。角変数は切断の選択に依存して基底の関数だけ平行移動し得る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-07-angle-chart -->
### 直接例：円筒で流れの方向を確認する

**定義の確認**

$M=(0,\infty)\times(\mathbb R/\mathbb Z)$、$\omega=b\,db\wedge d\vartheta$ とし、作用座標 $I=b^2/2$ を取る。$Y=X_I=bX_b=\partial_\vartheta$ なので $\varphi_t^Y(b,\vartheta)=(b,\vartheta+t)$ である。よって $\vartheta(\varphi_t^Y(x))=\vartheta(x)+t$、周期1の角変数の定義を満たす。$2\pi\vartheta$ をそのまま周期1の角変数と取り違えると時間1で $2\pi$ 増えるため定義を満たさない。
<!-- definition-example-end -->

この $F$ が $U\times T^n$ と $\pi^{-1}(U)$ の局所積表示を与える。

角方向のベクトルは $F_*\partial_{\vartheta_a}=Y_a$。Hamilton符号を使うと

$$
\iota_{\partial_{\vartheta_a}}F^*\omega=-dI_a.
$$

したがって $F^*\omega-\sum_a dI_a\wedge d\vartheta_a$ は角方向の縮約が0であり、Hamilton流が $\omega$ を保つことから角方向へ変化しない。よってこれは基底の2形式 $\kappa$ の引き戻しである。$\vartheta=0$ は切断 $s$ だから $\kappa=s^*\omega$ である。

$$
F^*\omega=\sum_a dI_a\wedge d\vartheta_a+\kappa,
\qquad \kappa=s^*\omega,\quad d\kappa=0.
$$

切断が最初からLagrangeなら $\kappa=0$ だが、任意の切断にこの性質を仮定してはならない。

<a id="thm-syz1-07-action-angle"></a>

<!-- formal-statement-start -->
> **定理（滑らかなLagrangeトーラス束の局所作用・角座標）**  
> $(M^{2n},\omega)$ をシンプレクティック多様体、$\pi:M\to B_0$ を連結・コンパクトなLagrangeトーラス $T^n$ をファイバーとする滑らかな局所自明束とする。任意の $b_0\in B_0$ の十分小さい近傍 $U$ で、基底の局所座標 $I_1,\ldots,I_n$ と周期1の角変数 $\psi_1,\ldots,\psi_n$ が存在し、

$$
\pi(I,\psi)=I,\qquad
\omega=\sum_{a=1}^n dI_a\wedge d\psi_a
$$

> が成立する。$I_a$ は周期余接格子の整数基底の局所ポテンシャルであり、ファイバー方向の時間1流は $\psi_a$ を1増やす。これは**局所的**結論であり、大域積束や大域作用座標は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

第4節で得た作用座標を使うと、すでに $\omega=\sum dI_a\wedge d\vartheta_a+\kappa$ まで分かる。閉じた基底2形式 $\kappa$ を局所的に $d\lambda$ と書き、角変数を基底の関数だけずらせば余分な項を消せる。この操作により局所的なLagrange切断も手に入る。

<!-- proof-start -->
### 証明

第4節の[作用座標構成](#prop-syz1-07-action-coordinates)を適用する。$U$ を作用座標で星形に取り直し、上記の積表示 $F$ を選ぶ。角方向の縮約と流れのシンプレクティック性から

$$
F^*\omega=\sum_a dI_a\wedge d\vartheta_a+\kappa
$$

を得た。$d\omega=0$ と $d^2=0$ より $d\kappa=0$。星形領域では閉2形式に原始1形式が存在するので $\kappa=d\lambda$ と書ける。必要なら $\kappa=\frac12\sum_{ij}\kappa_{ij}(I)dI_i\wedge dI_j$ に対し、中心を0にした放射積分

$$
\lambda=\sum_i\left(\int_0^1 t\sum_j I_j\kappa_{ji}(tI)\,dt\right)dI_i
$$

を選べる。$d\kappa=0$ の係数等式を用いて微分すると $d\lambda=\kappa$ になる。$\lambda=\sum_a\lambda_a(I)dI_a$ と書き、角を

$$
\psi_a=\vartheta_a-\lambda_a(I)\quad(\bmod\ \mathbb Z)
$$

へ変更する。$I$ が固定の各ファイバー上では、これは円周の平行移動であり角座標を保つ。ここで

$$
\begin{aligned}
\sum_a dI_a\wedge d\psi_a
&=\sum_a dI_a\wedge d\vartheta_a
-\sum_a dI_a\wedge d\lambda_a\\
&=\sum_a dI_a\wedge d\vartheta_a
+d\left(\sum_a\lambda_a\,dI_a\right)\\
&=\sum_a dI_a\wedge d\vartheta_a+d\lambda\\
&=F^*\omega.
\end{aligned}
$$

従って $\omega$ は所望の標準形である。$\psi=0$ を取る新しい切断上では $d\psi_a=0$ だから $\omega$ の引き戻しが0になり、確かにLagrange切断である。
<!-- proof-end -->

### 直接例：2次元基底の余分な2形式を角度のずれで消す

$U\subset\mathbb R^2$、$\vartheta\in T^2$、定数 $c$ に対し

$$
\omega=dI_1\wedge d\vartheta_1
+dI_2\wedge d\vartheta_2
+c\,dI_1\wedge dI_2
$$

とする。$\vartheta=0$ の切断では $s^*\omega=c\,dI_1\wedge dI_2$ であり、$c\ne0$ ならLagrangeでない。$\lambda=cI_1\,dI_2$ と置けば $d\lambda=c\,dI_1\wedge dI_2$。角座標

$$
\psi_1=\vartheta_1,\qquad
\psi_2=\vartheta_2-cI_1
$$

を使うと

$$
dI_2\wedge d\psi_2
=dI_2\wedge d\vartheta_2+c\,dI_1\wedge dI_2
$$

となる。$c$ の符号を間違えて $\psi_2=\vartheta_2+cI_1$ とすると余分な項は2倍になるのではなく、打ち消せず逆符号になってしまう。**切断の変更は証明の一部**である。

## 6. McLean変形空間との関係と、大域へ飛べない理由

ここで第2節のSLagトーラス束の仮定に戻る。$v\in T_bB_0$ を基底の変位とし、ファイバー $L_b$ に沿う持ち上げベクトル場 $V$ を $d\pi(V)=v$ となるように取る。垂直成分を変えても、ファイバー内では $\omega$ が0なので、1形式

$$
\alpha_v=-\bigl(\iota_V\omega\bigr)|_{L_b}
$$

は不変である。[McLean理論Iの線形化](../SYZ1-05/index.md#thm-syz1-05-linearization)から、各 $L_b$ が同じ局所位相のSLagであるなら

$$
d\alpha_v=0,\qquad d^*\alpha_v=0.
$$

よって $\alpha_v$ は調和1形式であり、そのコホモロジー類がファイバーの変形方向を表す。

$a$ 番目の整数閉路 $\gamma_a(b)$ を周期流の向きで取ると、第4節の $\beta_a$ と

$$
\beta_a(v)
=\int_{\gamma_a(b)}\omega(V,\dot\gamma_a)\,dt
=-\int_{\gamma_a(b)}\alpha_v
$$

という関係がある。積分の $t$ は周期1で閉路を一周するパラメータである。**McLeanの1形式には先頭にマイナスがあるため、作用微分とその周期の符号は逆になる**。この式が次講の周期積分へ渡す橋になる。

<a id="prop-syz1-07-moduli-map"></a>

<!-- formal-statement-start -->
> **命題（SLagトーラス束から局所変形空間への写像）**  
> 第2節の滑らかなSLagトーラス束のファイバー $L_b$ と、その近傍のMcLean局所変形空間 $\mathcal M_b$ を考える。ファイバーを埋め込み像として送る写像 $b'\mapsto [L_{b'}]$ は $b$ の十分小さい近傍から $\mathcal M_b$ への局所微分同相である。しかし、これだけでは $X$ 全体を覆う大域ファイブレーションが存在するとは結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

基底方向 $v$ の変分が与える調和1形式 $\alpha_v$ を用いる。$v\ne0$ なら $\alpha_v$ は零になれない。次元は基底も $b_1(T^n)$ も $n$ なので、微分は同型である。有限次元逆関数定理で局所微分同相を得る。

<!-- proof-start -->
### 証明

$d\pi:T_xM\to T_bB_0$ は全射で、核は $T_xL_b$ である。$v\ne0$ ならその持ち上げ $V$ は垂直ではない。もし $\alpha_v=0$ なら $\omega(V,W)=0$ が全ての $W\in T_xL_b$ に対し成り立つ。ファイバーがLagrangeだから $T_xL_b$ のシンプレクティック直交補は $T_xL_b$ 自身であり、$V$ は垂直となって矛盾する。よって $\alpha_v$ は零でない。

[McLeanの局所無障害性定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)は変形空間の接空間を調和1形式 $\mathcal H^1(L_b)$ と同一視する。$b_1(T^n)=n$ だから、線形写像 $v\mapsto\alpha_v$ は $n$ 次元空間間の単射、従って同型である。基底の近傍を局所変形空間の座標で見ると、その微分は可逆なので[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)から局所微分同相を得る。これは**既に与えられた束のファイバーが変形空間の局所座標になる**ことの証明であって、束を構成する証明ではない。
<!-- proof-end -->

滑らかな部分 $B_0$ を一周したとき周期格子の基底が $GL(n,\mathbb Z)$ で入れ替わる場合、作用座標は一枚の地図では足りない。特異ファイバーではそもそも局所自明束・全格子の仮定が壊れ得る。今回の定理からは**大域的な作用・角座標、特異点を越えた貼り合わせ、鏡像の複素構造**は出ない。

## 7. 演習：周期から角度の標準形まで手計算する

### Level A：定義と符号を一点ずつ確認

<a id="ex-syz1-07-a01"></a>

#### SYZ1-07-A01 ファイバーの次元とLagrange条件

- Level: A

$M=T^4$ の局所座標 $(x^1,x^2,y^1,y^2)$、$\omega=dx^1\wedge dy^1+dx^2\wedge dy^2$、$\pi(x,y)=y$ とする。$\pi$ の階数、ファイバーの次元、$\omega$ の制限を計算し、滑らかなLagrangeトーラス束であることを示せ。

<!-- solution-start -->
### 詳細解答

$d\pi(\partial_{y^i})=\partial_{y^i}$、$d\pi(\partial_{x^i})=0$ だから $d\pi$ の階数は2で核は $\operatorname{span}(\partial_{x^1},\partial_{x^2})$。ファイバーは座標 $x^1,x^2$ の $T^2$ で連結・コンパクト・境界なし。ファイバーの接方向では $dy^i=0$ だから $\omega|_{L_y}=0$。実次元は $2=\frac12\dim M$ なので[Lagrangeの定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)を満たす。$\pi$ は局所的に $y$ への射影である。
<!-- solution-end -->

<a id="ex-syz1-07-a02"></a>

#### SYZ1-07-A02 Hamilton場のマイナス符号

- Level: A

$\omega=db\wedge d\vartheta$、$\vartheta\in\mathbb R/\mathbb Z$ とする。$\iota_{X_b}\omega=-db$ から $X_b$ を求め、時間1流が恒等になることを確かめよ。

<!-- solution-start -->
### 詳細解答

$X_b=A\partial_b+C\partial_\vartheta$ と置くと

$$
\iota_{X_b}(db\wedge d\vartheta)=A\,d\vartheta-C\,db.
$$

これが $-db$ に等しいので $A=0$、$C=1$。従って $X_b=\partial_\vartheta$ であり、その流れは $(b,\vartheta)\mapsto(b,\vartheta+t)$。$t=1$ で $\vartheta$ は $\bmod\ \mathbb Z$ により元へ戻る。
<!-- solution-end -->

<a id="ex-syz1-07-a03"></a>

#### SYZ1-07-A03 変速する円周の周期

- Level: A

第4節の $\omega=b\,db\wedge d\vartheta$（$b>0$）に対し、$\Gamma_b$、$\beta$、作用座標 $I$ をそれぞれ計算せよ。

<!-- solution-start -->
### 詳細解答

$\iota_{C\partial_\vartheta}\omega=-Cb\,db$ なので $X_b=b^{-1}\partial_\vartheta$。時間 $t$ の角度変化は $t/b$、ゆえに戻る条件は $t/b\in\mathbb Z$ で $\Gamma_b=b\mathbb Z$。正の生成元 $t(b)=b$ に対して $\beta=b\,db$。$d(b^2/2)=b\,db$ だから

$$
I=\frac{b^2}{2}+C
$$

が作用座標である。$b>0$ なので $dI\ne0$、局所座標条件も満たす。
<!-- solution-end -->

<a id="ex-syz1-07-a04"></a>

#### SYZ1-07-A04 周期1形式の閉性の符号

- Level: A

ある周期ベクトルから垂直場 $Y$ ができ、時間1流が恒等で $\iota_Y\omega=-\pi^*\beta$、$d\omega=0$ とする。$\mathcal L_Y\omega$ を計算し、$\pi$ が劣没のとき $d\beta=0$ を導け。

<!-- solution-start -->
### 詳細解答

[Cartan公式](../../GEO/GEO7/index.md#thm-geo7-cartan-formula)より

$$
\mathcal L_Y\omega
=d\iota_Y\omega+\iota_Yd\omega
=-d\pi^*\beta=-\pi^*d\beta.
$$

$Y$ は垂直だから流れは $\pi$ を保ち、時間1まで積分すると $\varphi_1^*\omega-\omega=-\pi^*d\beta$。左辺は時間1流が恒等のため0。$d\pi$ が全射だから任意の基底接ベクトル対を持ち上げて評価でき、$\pi^*d\beta=0$ から $d\beta=0$。
<!-- solution-end -->

<a id="ex-syz1-07-a05"></a>

#### SYZ1-07-A05 角度のずれと2形式の符号

- Level: A

$\omega=dI_1\wedge d\vartheta_1+dI_2\wedge d\vartheta_2+3dI_1\wedge dI_2$ を標準形にする角変数 $\psi_1,\psi_2$ を一組求め、直接微分して確かめよ。

<!-- solution-start -->
### 詳細解答

$\lambda=3I_1dI_2$ とすると $d\lambda=3dI_1\wedge dI_2$。従って $\psi_1=\vartheta_1$、$\psi_2=\vartheta_2-3I_1$ と取る。微分すると

$$
dI_2\wedge d\psi_2
=dI_2\wedge(d\vartheta_2-3dI_1)
=dI_2\wedge d\vartheta_2+3dI_1\wedge dI_2.
$$

第1成分を加えると元の $\omega$ に一致する。$\psi_2$ は各ファイバー上で $\vartheta_2$ の平行移動だから周期1を保つ。
<!-- solution-end -->

### Level B：複数の条件を接続する

<a id="ex-syz1-07-b01"></a>

#### SYZ1-07-B01 平坦SLagトーラスの全符号を検算

- Level: B

第2節の $X=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$、$\pi(x+iy)=y$ を使う。基底 $b^j=y^j$ に対応するHamilton場、周期ベクトル、作用座標、周期1の角変数を求め、$\omega=\sum_jdI_j\wedge d\psi_j$ を確かめよ。

<!-- solution-start -->
### 詳細解答

$\omega=\sum_jdx^j\wedge dy^j$ だから $\iota_{\partial_{x^j}}\omega=dy^j$。符号規約より $X_{y^j}=-\partial_{x^j}$。$x^j$ は周期1なので各流れの原始周期は1、周期基底は標準単位ベクトルで $\beta_j=dy^j$。従って $I_j=y^j$ を基底の局所実座標として取れる。流れの正方向は $x^j$ の負方向だから $\psi_j=-x^j$（周期1）と置く。

$$
\sum_jdI_j\wedge d\psi_j
=\sum_jdy^j\wedge(-dx^j)
=\sum_jdx^j\wedge dy^j=\omega.
$$

各ファイバーは第2節で示した位相0のSLagである。一方 $I_j=y^j$ は円周値の $y^j$ の**局所持ち上げ**としてしか実数値にできない。従って全基底上の単一の実作用座標の存在を主張していない。
<!-- solution-end -->

<a id="ex-syz1-07-b02"></a>

#### SYZ1-07-B02 時間周期の基底変更

- Level: B

$n=2$ で周期余接格子の基底が $\beta_1=dI_1$、$\beta_2=dI_2$ であるとする。新基底を $\beta'_1=\beta_1+\beta_2$、$\beta'_2=\beta_2$ としたときの作用座標の変換行列を求めよ。また旧角座標 $\psi$ に対する新角座標 $\psi'$ を定数ずれなしで構成し、シンプレクティック形式の等式を確認せよ。

<!-- solution-start -->
### 詳細解答

$$
A=\begin{pmatrix}1&1\\0&1\end{pmatrix},
\qquad
\begin{pmatrix}I'_1\\I'_2\end{pmatrix}
=A\begin{pmatrix}I_1\\I_2\end{pmatrix}.
$$

作用と角度の組が $\sum dI\wedge d\psi$ を保つには $\psi'=A^{-T}\psi$ とすればよい。

$$
A^{-T}=\begin{pmatrix}1&0\\-1&1\end{pmatrix},
\qquad
\psi'_1=\psi_1,\quad\psi'_2=\psi_2-\psi_1.
$$

実際、

$$
\begin{aligned}
dI'_1\wedge d\psi'_1+dI'_2\wedge d\psi'_2
&=(dI_1+dI_2)\wedge d\psi_1\\
&\quad+dI_2\wedge(d\psi_2-d\psi_1)\\
&=dI_1\wedge d\psi_1+dI_2\wedge d\psi_2.
\end{aligned}
$$

$A^{-T}$ も整数行列で行列式1なので、角変数の商 $T^2$ 上の変換として正しい。
<!-- solution-end -->

<a id="ex-syz1-07-b03"></a>

#### SYZ1-07-B03 非Lagrange切断からLagrange切断へ

- Level: B

$\omega=\sum_{j=1}^2 dI_j\wedge d\vartheta_j+c\,dI_1\wedge dI_2$ とする。切断 $\vartheta=0$ の引き戻しを求め、$\vartheta_1=0$、$\vartheta_2=cI_1$ という新しい切断の引き戻しが0であることを確認せよ。

<!-- solution-start -->
### 詳細解答

最初の切断では $d\vartheta_j=0$ だから $s_0^*\omega=c\,dI_1\wedge dI_2$。新しい切断 $s_1$ では $d\vartheta_1=0$、$d\vartheta_2=c\,dI_1$ なので

$$
s_1^*\omega
=dI_2\wedge(c\,dI_1)+c\,dI_1\wedge dI_2
=0.
$$

切断の実次元は2で全空間の半分、かつ制限2形式が0なのでLagrangeである。この切断は第5節の $\psi_2=\vartheta_2-cI_1$ の零切断に一致する。
<!-- solution-end -->

<a id="ex-syz1-07-b04"></a>

#### SYZ1-07-B04 McLean変形の周期と作用微分

- Level: B

$\omega=db\wedge d\psi$ の円周束で、基底方向の変位 $v=\partial_b$、持ち上げ $V=\partial_b$ とし、周期1の閉路 $\gamma(t)=(b,t)$ を考える。$\alpha_v=-\iota_V\omega$ と $\beta(v)$ を計算し、両者の周期の符号を照合せよ。

<!-- solution-start -->
### 詳細解答

$\iota_{\partial_b}(db\wedge d\psi)=d\psi$ なので $\alpha_v=-d\psi$。従って

$$
\int_\gamma\alpha_v
=-\int_0^1 d\psi(\partial_t\gamma)\,dt=-1.
$$

Hamilton場 $X_b=\partial_\psi$ は時間1周期を持つので $\beta=db$、$\beta(v)=1$。一方、

$$
\int_0^1\omega(V,\partial_t\gamma)\,dt
=\int_0^1\omega(\partial_b,\partial_\psi)\,dt=1.
$$

従って $\beta(v)=-\int_\gamma\alpha_v$ を満たす。$\alpha_v$ はこの円周上で定数係数の調和1形式であるから、McLeanの接方向としても整合する。
<!-- solution-end -->

### Level C：周期・標準形・存在仮定を一つの模型で判定

<a id="ex-syz1-07-c01"></a>

#### SYZ1-07-C01 変速トーラス束の完全構成

- Level: C

$U=(0,\infty)\times\mathbb R$、$M=U\times T^2$ とし、座標を $(b_1,b_2,\vartheta_1,\vartheta_2)$、定数 $c\in\mathbb R$ とする。

$$
\omega=b_1\,db_1\wedge d\vartheta_1
+db_2\wedge d\vartheta_2+c\,db_1\wedge db_2,
\qquad \pi(b,\vartheta)=b.
$$

1. $\omega$ がシンプレクティックで、ファイバーがLagrange $T^2$ であることを示せ。
2. $H_i=b_i$ のHamilton場と各原始時間周期、周期1形式 $\beta_i$、作用座標 $I_i$ を求めよ。
3. $\omega=\sum_jdI_j\wedge d\psi_j$ となる周期1の角変数 $\psi_j$ を求めて検算せよ。
4. この模型の計算だけで、Calabi–Yau上に大域SLagトーラス束が存在すると証明したことになるか。足りない仮定を示せ。

<!-- solution-start -->
### 詳細解答

**(1) 閉性と非退化性。** $d(b_1db_1\wedge d\vartheta_1)=db_1\wedge db_1\wedge d\vartheta_1=0$ であり、残る項も閉じているので $d\omega=0$。4次元の2形式の二乗を計算すると、基底2形式の項は他項と同じ $db_i$ を重ねるため寄与せず、

$$
\frac12\omega\wedge\omega
=b_1\,db_1\wedge d\vartheta_1\wedge
db_2\wedge d\vartheta_2\ne0
$$

である。$b_1>0$ だから非退化。ファイバーは $\vartheta$ の $T^2$ で連結・コンパクト・境界なし、かつその上では $db_1=db_2=0$。従って $\omega|_{L_b}=0$ で、実次元2だからLagrangeである。

**(2) 流れと格子。** $\iota_{\partial_{\vartheta_1}}\omega=-b_1db_1$、$\iota_{\partial_{\vartheta_2}}\omega=-db_2$ なので

$$
X_{b_1}=b_1^{-1}\partial_{\vartheta_1},
\qquad X_{b_2}=\partial_{\vartheta_2}.
$$

$\vartheta_j$ はそれぞれ周期1ゆえ、独立な原始時間周期は $t^{(1)}=(b_1,0)$ と $t^{(2)}=(0,1)$。従って

$$
\beta_1=b_1\,db_1,\quad \beta_2=db_2,\qquad
I_1=\frac{b_1^2}{2},\quad I_2=b_2
$$

である。$dI_1\wedge dI_2=b_1db_1\wedge db_2\ne0$ なので作用座標は有効である。

**(3) 角の補正。** まず $\vartheta$ を角として用いると

$$
\omega=dI_1\wedge d\vartheta_1+
dI_2\wedge d\vartheta_2+c\,db_1\wedge db_2.
$$

$\lambda=c b_1\,db_2=c\sqrt{2I_1}\,dI_2$ は $d\lambda=c\,db_1\wedge db_2$ を満たす。従って

$$
\psi_1=\vartheta_1,\qquad
\psi_2=\vartheta_2-cb_1
$$

とすれば

$$
\begin{aligned}
dI_1\wedge d\psi_1+dI_2\wedge d\psi_2
&=b_1db_1\wedge d\vartheta_1\\
&\quad+db_2\wedge(d\vartheta_2-c\,db_1)\\
&=\omega.
\end{aligned}
$$

これらは角の平行移動なので周期1を保つ。

**(4) 主張の停止線。** この模型は与えられた滑らかなLagrangeトーラス束の座標計算である。複素構造 $J$、Kähler計量 $g$、正則体積形式 $\Omega$ とその規格化、各ファイバーの位相・較正条件を指定していないため、SLagであるとは検証できない。さらにCalabi–Yau全体を覆う束の**存在**は、与えた積束を局所標準化した結果からは導けない。[McLeanの局所定理](../SYZ1-06/index.md#thm-syz1-06-mclean-unobstructed)を援用しても、大域的な互いに交わらないファイバーの構成という欠けた段階は埋まらない。
<!-- solution-end -->

## 8. 得られた範囲と次の問い

今回は滑らかなLagrangeトーラス束を**仮定した後**に、Hamilton流、周期格子の閉1形式、作用座標、周期1の角変数、局所的な標準形を順に証明した。SLagトーラス束なら、その基底はMcLeanの局所moduliと局所微分同相であることも分かった。

周期格子の基底変更は $GL(n,\mathbb Z)$ に従う。しかしSLagにはシンプレクティック形式だけでなく正則体積形式もある。**同じ基底にもう一つのアフィン構造が現れるのはなぜか**。これが第8講「基底の二種類の整数アフィン構造」の問いである。
