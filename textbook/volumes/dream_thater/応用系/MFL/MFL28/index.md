# MFL28 円周Fourier・SO(2)の低次表現

<!-- definition-example-audit: strict -->

## 1. 四分の一回転から任意の角度へ

[MFL24 の四頂点の回転表現](../MFL24/index.md#thm-mfl24-c4-decomposition)では、90度ごとに回す操作を実行列で表せた。[MFL27 の型付き核](../MFL27/index.md#thm-mfl27-typed-correlation)では、群の作用に合わせて特徴を変換する必要性も分かった。しかし画像・円周上の信号は15度でも17度でも回転できる。有限個の向きラベルを増やすだけでは、**すべての角度で成り立つ等変性**を説明できない。

円周を角度 $\theta$（$0\le\theta<2\pi$、端点は同一視）で表し、角度 $\alpha$ の回転を $\theta\mapsto\theta+\alpha$ とする。実数値信号 $f$ を回したものは、移動先 $\theta$ に元の $\theta-\alpha$ の値を置くから、$(U_\alpha f)(\theta)=f(\theta-\alpha)$ となる。角度を1周変えても同じ作用でなければならない。

この章では円周の有限Fourier和と積分、2次元の実行列だけで、回転に追従する特徴と核を構成する。[MFL18 の円周格子Fourier基底](../MFL18/index.md#def-mfl18-fourier)は離散版、[ML2-16 の周期相互相関](../../ML/ML2-16/index.md#thm-ml2-16-equivariant-convolution)は平行移動版である。ここでは連続角度の回転を扱い、一般の連続群表現分類や無限Fourier級数の収束定理は使わない。

## 2. 回転で値の型が変わる――SO(2)の実表現

平面の長さと向きを保つ原点中心の回転全体を $SO(2)$ と書く。角度を2πの整数倍だけ変えた操作は同一なので、群の元は角度の同値類 $[\alpha]\in\mathbb R/(2\pi\mathbb Z)$ である。角度の同値類全体は、円周 $S^1=\mathbb R/(2\pi\mathbb Z)$ とも書く。

回転を表す行列を

$$
R(\beta)=\begin{pmatrix}\cos\beta&-\sin\beta\\\sin\beta&\cos\beta\end{pmatrix}
$$

と置くと、加法公式から $R(\beta)R(\gamma)=R(\beta+\gamma)$、また $R(\beta)^{-1}=R(-\beta)$ である。[MFL24 の実行列表現](../MFL24/index.md#def-mfl24-representation)と同様、回転の合成に対応する可逆行列を特徴に作用させる。整数 $m\ge1$ ごとに、角度 $\alpha$ を $m\alpha$ だけ回す二成分の特徴を考える。$m$ を**周波数**または**回転の重み**という。$m=0$ は回しても値の変わらない実数の特徴とする。

<a id="def-mfl28-so2-types"></a>

<!-- formal-statement-start -->
> **定義（SO(2)と周波数型の実表現）**
> $SO(2)=\{R(\alpha):\alpha\in\mathbb R\}$ に群積として行列積を入れる。整数 $m\ge1$ に対し、実ベクトル空間とその回転作用を

$$
V_m=\mathbb R^2,\qquad \rho_m(R(\alpha))=R(m\alpha)
$$

> とする。$m=0$ に対しては $V_0=\mathbb R$、$\rho_0(R(\alpha))=1$ とする。$\rho_m$ を**周波数 $m$ の実表現**、$V_m$ の元を**周波数 $m$ 型の特徴**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl28-so2-types -->
**定義の確認**。$m=1$ の特徴 $(1,0)$ は $\alpha=\pi/2$ で $(0,1)$ へ移る。$m=2$ の同じ数値の特徴は $\rho_2(R(\pi/2))(1,0)=(-1,0)$ へ移る。$m=0$ の値 $5$ は変わらない。すべての $m\in\mathbb Z_{\ge0}$ について $R(m(\alpha+2\pi))=R(m\alpha)$ なので、一周の同一視と矛盾しない。
<!-- definition-example-end -->

<a id="prop-mfl28-representation"></a>

<!-- formal-statement-start -->
> **命題（周波数型の群準同型と整数条件）**
> 整数 $m\ge0$ に対し、上の $\rho_m$ は $SO(2)$ から $GL(V_m)$ への群準同型である。反対に $\lambda\in\mathbb R$ で $[\alpha]\mapsto R(\lambda\alpha)$ を $SO(2)$ 上で一価に定められるのは $\lambda\in\mathbb Z$ のときに限る（$\lambda=0$ の場合は2次元の自明表現として読む）。
<!-- formal-statement-end -->

**証明の見取り図**。回転の合成は角度の和である。一方、角度0と角度 $2\pi$ が同じ群元を表すことが非整数周波数を排除する。

<!-- proof-start -->
### 証明

$m\ge1$ では加法公式を行列積に適用すると

$$
\rho_m(R(\alpha)R(\beta))=R(m(\alpha+\beta))
=R(m\alpha)R(m\beta)=\rho_m(R(\alpha))\rho_m(R(\beta)).
$$

$m=0$ は恒等写像 $1\cdot1=1$ から従う。$R(\alpha)=R(\alpha+2\pi)$ に対し $R(\lambda\alpha)$ が同じ値になる必要十分条件は $R(2\pi\lambda)=I$、すなわち $\cos(2\pi\lambda)=1$, $\sin(2\pi\lambda)=0$ であり、これは $\lambda\in\mathbb Z$ と同値である。$\square$
<!-- proof-end -->

例えば「半周波数」$\lambda=1/2$ は、同じ回転を0と $2\pi$ で記述すると $I$ と $-I$ を返す。これは通常の $SO(2)$ 表現にはならない。

## 3. 円周Fourier係数はどのように回るか

回転を受ける量として、信号の中の $\cos m\theta$ 成分と $\sin m\theta$ 成分を並べてみよう。ここでは実三角多項式

$$
f(\theta)=a_0+\sum_{m=1}^{M}\{a_m\cos(m\theta)+b_m\sin(m\theta)\}
$$

を扱う（$M$ は非負整数）。この信号は連続かつ2π周期なので、積分は通常のRiemann積分でよい。角度の平均と、各周波数の二成分係数を取り出す。

<a id="def-mfl28-fourier-moments"></a>

<!-- formal-statement-start -->
> **定義（円周の実Fourier特徴）**
> 2π周期の連続実数値関数 $f$ に対し、$m\ge1$ では $q_m(\theta)=(\cos m\theta,\sin m\theta)^\mathsf T$ と置き、次を $m$ 次Fourier特徴と定める。$m=0$ は円周平均とする。

$$
F_0(f)=\frac{1}{2\pi}\int_0^{2\pi}f(\theta)\,d\theta,\qquad
F_m(f)=\frac{1}{\pi}\int_0^{2\pi}f(\theta)q_m(\theta)\,d\theta\in V_m.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl28-fourier-moments -->
**定義の確認**。$f(\theta)=1+2\cos\theta-3\sin\theta+4\cos2\theta$ とする。正の整数 $j,k$ に対し、$\boldsymbol{1}_{j=k}$ は $j=k$ なら1、それ以外なら0とする。積和公式を使うと

$$
\frac1\pi\int_0^{2\pi}\cos(j\theta)\cos(k\theta)\,d\theta=\boldsymbol{1}_{j=k},\quad
\frac1\pi\int_0^{2\pi}\sin(j\theta)\sin(k\theta)\,d\theta=\boldsymbol{1}_{j=k},
$$

かつ正弦・余弦の混合積分は0である（積和公式で0以外の整数周波数の積分へ帰着する）。ゆえに $F_0(f)=1$, $F_1(f)=(2,-3)^\mathsf T$, $F_2(f)=(4,0)^\mathsf T$。二成分は座標を恣意的に置いたのではなく、積分によって信号から一意に抽出したものである。
<!-- definition-example-end -->

<a id="thm-mfl28-fourier-equivariance"></a>

<!-- formal-statement-start -->
> **定理（Fourier特徴の回転等変性と有限再構成）**
> 2π周期の連続実関数 $f$、$\alpha\in\mathbb R$、$m\ge1$ に対し $(U_\alpha f)(\theta)=f(\theta-\alpha)$ とする。このとき

$$
F_0(U_\alpha f)=F_0(f),\qquad
F_m(U_\alpha f)=R(m\alpha)F_m(f).
$$

> また $f$ が次数 $M$ 以下の実三角多項式なら、$F_m(f)=(a_m,b_m)^\mathsf T$ であり

$$
f(\theta)=F_0(f)+\sum_{m=1}^{M}F_m(f)^\mathsf Tq_m(\theta).
$$
<!-- formal-statement-end -->

**証明の見取り図**。回転後の積分で $t=\theta-\alpha$ と置く。$q_m(t+\alpha)=R(m\alpha)q_m(t)$ だから、係数ベクトルも同じ行列で回る。再構成は異なる周波数が積分で打ち消し合うことから従う。

<!-- proof-start -->
### 証明

$g(\theta)=f(\theta-\alpha)$ と置く。積分区間を $[-\alpha,2\pi-\alpha]$ へ移しても、被積分関数の2π周期性により $[0,2\pi]$ へ戻せる。したがって

$$
\begin{aligned}
F_m(g)&=\frac1\pi\int_0^{2\pi} f(\theta-\alpha)q_m(\theta)\,d\theta\\
&=\frac1\pi\int_{-\alpha}^{2\pi-\alpha}f(t)q_m(t+\alpha)\,dt\\
&=R(m\alpha)\frac1\pi\int_0^{2\pi}f(t)q_m(t)\,dt
=R(m\alpha)F_m(f).
\end{aligned}
$$

平均も同じ置換で不変である。積和公式 $2\cos A\cos B=\cos(A-B)+\cos(A+B)$、$2\sin A\sin B=\cos(A-B)-\cos(A+B)$、$2\sin A\cos B=\sin(A+B)+\sin(A-B)$ を使う。整数 $k\ne0$ について $\int_0^{2\pi}\cos(kt)\,dt=\int_0^{2\pi}\sin(kt)\,dt=0$ なので、$F_m(f)=(a_m,b_m)^\mathsf T$、$F_0(f)=a_0$ となる。これを元の有限和へ代入して再構成式を得る。$\square$
<!-- proof-end -->

先の例を $\alpha=\pi/2$ だけ回すと、$R(\pi/2)(2,-3)^\mathsf T=(3,2)^\mathsf T$、$R(\pi)(4,0)^\mathsf T=(-4,0)^\mathsf T$ となる。**次数1の特徴は90度、次数2の特徴は180度回る。** 入力全体を回したときに出力の「型」を区別しないと、正しい変換を誤判定する。

## 4. 回転に追従する角度核

今度は、円周の各位置 $\theta$ から数を受け取り、**一つの周波数 $m$ 型のベクトル**へ足し合わせる層を作る。核 $k(\theta)$ 自体が位置の回転に合わせて回れば、出力も同じ型で変換するはずだ。[MFL24 の絡作用素](../MFL24/index.md#def-mfl24-intertwiner)を、関数からベクトルへの写像として具体化する。

<a id="def-mfl28-steerable-kernel"></a>

<!-- formal-statement-start -->
> **定義（円周のsteerable核）**
> 整数 $m\ge0$ と $V_m,\rho_m$ を上の定義とする。連続写像 $k:S^1\to V_m$ がすべての $\theta,\alpha\in\mathbb R$ について

$$
k(\theta+\alpha)=\rho_m(R(\alpha))k(\theta)
$$

> を満たすとき、$k$ を**周波数 $m$ 型のsteerable核**と呼ぶ。ここで $S^1$ の角度は2πを法として読む。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl28-steerable-kernel -->
**定義の確認**。$m=2$、$v=(1,0)^\mathsf T$ として $k(\theta)=R(2\theta)v=(\cos2\theta,\sin2\theta)^\mathsf T$ を取る。これは連続で、$k(\theta+2\pi)=k(\theta)$ より $S^1$ 上で一価に定まる。$k(0)=(1,0)^\mathsf T$、$k(\pi/4)=(0,1)^\mathsf T$、$k(\pi/2)=(-1,0)^\mathsf T$。[回転行列の合成則](#prop-mfl28-representation)により $k(\theta+\alpha)=R(2\alpha)R(2\theta)v$ なので任意の角度で定義の等式が成立する。逆に $k(\theta)=(\cos\theta,\sin\theta)^\mathsf T$ は $\alpha=\pi/2$ で $k(\pi/2)=(0,1)^\mathsf T\ne R(\pi)k(0)$ となり、周波数2型の核ではない。
<!-- definition-example-end -->

<a id="thm-mfl28-kernel-classification"></a>

<!-- formal-statement-start -->
> **定理（円周steerable核の分類と等変な積分層）**
> 整数 $m\ge1$ と連続核 $k:S^1\to\mathbb R^2$ に対し、$k$ が周波数 $m$ 型のsteerable核であることと、ある一定ベクトル $v\in\mathbb R^2$ によって

$$
k(\theta)=R(m\theta)v
$$

> と書けることは同値である。$m=0$ の実数核の場合は定数核に限る。いずれの場合も、連続実関数 $f$ から特徴への線形写像

$$
T_k f=\frac1{2\pi}\int_0^{2\pi}k(\theta)f(\theta)\,d\theta
$$

> は $T_k(U_\alpha f)=\rho_m(R(\alpha))T_kf$ をすべての $\alpha$ で満たす。さらに連続核 $k$ のこの積分写像がすべての連続実関数 $f$ に対して等変なら、$k$ 自身が上のsteerable条件を満たす。
<!-- formal-statement-end -->

**証明の見取り図**。核を $\theta=0$ から回して作ると一意に決まる。等変性は入力をずらした積分の変数を戻すだけで証明できる。逆向きは「どんな入力で試しても等式が成り立つ」なら核の違いを積分で隠せない、という事実を使う。

<!-- proof-start -->
### 証明

steerable条件で $\theta=0,\alpha=\theta$ と置けば $k(\theta)=\rho_m(R(\theta))k(0)$ である。逆に $k(\theta)=R(m\theta)v$ なら回転行列の合成則から条件が成り立つ。$m=0$ では $k(\theta+\alpha)=k(\theta)$ を $\theta=0$ に適用すれば定数である。

入力を回転した積分で $t=\theta-\alpha$ とすると

$$
\begin{aligned}
T_k(U_\alpha f)
&=\frac1{2\pi}\int_0^{2\pi}k(\theta)f(\theta-\alpha)\,d\theta\\
&=\frac1{2\pi}\int_0^{2\pi}k(t+\alpha)f(t)\,dt\\
&=\rho_m(R(\alpha))\frac1{2\pi}\int_0^{2\pi}k(t)f(t)\,dt.
\end{aligned}
$$

逆を示す。固定した $\alpha$ に対して $d(t)=k(t+\alpha)-\rho_m(R(\alpha))k(t)$ と置く。等変性が任意の $f$ に成立すれば、上と同じ変数変換により $\int_0^{2\pi}d(t)f(t)\,dt=0$ である。$d$ の各成分 $d_j$ は連続かつ周期的だから、$f(t)=d_j(t)$ を代入して $\int d_j(t)^2\,dt=0$。非負の連続関数の積分が0なので $d_j(t)=0$ がすべての $t$ に成り立つ。全成分について同じことを行い、核のsteerable条件を得る。$\square$
<!-- proof-end -->

$m\ge1$ で $v=(a,b)^\mathsf T$ を取ると、行列を掛けた核の成分は $a\cos m\theta-b\sin m\theta$ と $b\cos m\theta+a\sin m\theta$ である。したがって $F_m(f)=(c,d)^\mathsf T$ なら

$$
T_kf=\frac12\begin{pmatrix}a&-b\\b&a\end{pmatrix}
\begin{pmatrix}c\\d\end{pmatrix}.
$$

積分の係数が $1/(2\pi)$、[実Fourier特徴](#def-mfl28-fourier-moments)の係数が $1/\pi$ なので $1/2$ が現れる。これは円周の周波数 $m$ 成分以外を見ない線形層である。例えば $m=1$、$v=(2,-1)^\mathsf T$、$f=2\cos\theta+3\sin\theta$ なら $T_kf=(7/2,2)^\mathsf T$。

出力を単純な「二つのスカラー」とみなして成分ごとに任意の非線形関数を掛けても、一般には回転等変性は保たれない。実際、$m=1$、$v=(1,0)^\mathsf T$、$f(\theta)=2\cos\theta$ とすれば、上の行列式から $T_kf=(1,0)^\mathsf T$ となる。

成分ごとの非線形写像を $\sigma(x_1,x_2)=(\max(0,x_1),\max(0,x_2))$ と置く。[核の等変性](#thm-mfl28-kernel-classification)より、入力を180度回したときの出力は

$$
T_k(U_\pi f)=R(\pi)T_kf=(-1,0)^\mathsf T
$$

となる。そこで非線形写像を前後に作用させる順番を比較すると

$$
\sigma(T_k(U_\pi f))=(0,0)^\mathsf T,
\qquad R(\pi)\sigma(T_kf)=(-1,0)^\mathsf T.
$$

左右が異なり、成分ごとの $\sigma$ は周波数1型の回転と交換しない。

## 5. 円周上の畳み込みと周波数フィルタ

出力が全角度 $\theta$ にある場合は、入力と出力の差角 $\delta$ だけを見る**畳み込み型**の層が自然である。積分は正規化測度 $d\delta/(2\pi)$ を使う。[ML2-16 の周期相互相関](../../ML/ML2-16/index.md#def-ml2-16-periodic-correlation)は入力の位置を $i+r$ に動かす規約だが、以下では $\theta-\delta$ に動かす。両者は核を反転すれば対応し、符号を無言で同一視しない。

<a id="def-mfl28-circle-correlation"></a>

<!-- formal-statement-start -->
> **定義（円周畳み込み）**
> 連続2π周期実関数 $\kappa,f$ に対し、円周畳み込み $C_\kappa f$ を

$$
(C_\kappa f)(\theta)=\frac1{2\pi}\int_0^{2\pi}\kappa(\delta)f(\theta-\delta)\,d\delta
$$

> と定める。これは出力がスカラー場である層であり、一点のベクトル特徴へ写す前節の $T_k$ とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl28-circle-correlation -->
**定義の確認**。$\kappa(\delta)=2\cos2\delta$、$f(\theta)=3+\cos\theta-2\sin2\theta$ とする。$\sin2(\theta-\delta)=\sin2\theta\cos2\delta-\cos2\theta\sin2\delta$ を積分へ代入すると、$\cos2\delta$ と直交する定数・一次周波数・$\sin2\delta$ の項は消え、$\frac1{2\pi}\int 2\cos^22\delta\,d\delta=1$ より $C_\kappa f=-2\sin2\theta$。2次周波数だけが残った。
<!-- definition-example-end -->

積分変数を $r=-\delta$ と置き、周期性で区間を戻すと

$$
(C_\kappa f)(\theta)=\frac1{2\pi}\int_0^{2\pi}\kappa(-r)f(\theta+r)\,dr.
$$

したがって離散の相互相関と同じ「入力位置に足す」表示では、核を $\kappa(-r)$ に反転させる。後の周波数行列の $s_m$ の符号も、元の $\theta-\delta$ 規約に従う。

<a id="thm-mfl28-correlation-modes"></a>

<!-- formal-statement-start -->
> **定理（円周畳み込みの等変性と周波数作用）**
> 連続2π周期実関数 $\kappa,f$ と任意の角度 $\alpha$ に対して $C_\kappa U_\alpha=U_\alpha C_\kappa$ が成り立つ。$f$ が有限三角多項式なら、$m\ge1$ 次のFourier特徴に対する作用は

$$
F_m(C_\kappa f)=\begin{pmatrix}c_m&-s_m\\s_m&c_m\end{pmatrix}F_m(f),
\quad c_m=\frac1{2\pi}\int_0^{2\pi}\kappa(\delta)\cos m\delta\,d\delta,
\quad s_m=\frac1{2\pi}\int_0^{2\pi}\kappa(\delta)\sin m\delta\,d\delta.
$$

> 定数成分は $F_0(C_\kappa f)=c_0F_0(f)$、$c_0=(2\pi)^{-1}\int_0^{2\pi}\kappa$ である。特に $\kappa(\delta)=2\cos\ell\delta$（整数 $\ell\ge1$）なら、$C_\kappa$ は有限三角多項式の $\ell$ 次成分への射影である。
<!-- formal-statement-end -->

**証明の見取り図**。差角は入力と出力を同じ角度だけ動かしても変わらない。周波数ごとの行列は、$f(\theta-\delta)$ の正弦・余弦を加法公式で展開して積分すると出る。

<!-- proof-start -->
### 証明

回転の交換は定義へ代入して

$$
\begin{aligned}
(C_\kappa U_\alpha f)(\theta)
&=\frac1{2\pi}\int_0^{2\pi}\kappa(\delta)f(\theta-\delta-\alpha)\,d\delta\\
&=(C_\kappa f)(\theta-\alpha)=(U_\alpha C_\kappa f)(\theta).
\end{aligned}
$$

$f_m(\theta)=a\cos m\theta+b\sin m\theta$ について、加法公式で

$$
f_m(\theta-\delta)=
(a\cos m\delta-b\sin m\delta)\cos m\theta
+(a\sin m\delta+b\cos m\delta)\sin m\theta.
$$

この両係数を $\kappa(\delta)$ とともに積分すると行列式が得られる。線形性により異なる周波数は混ざらず、定数項は平均 $c_0$ 倍となる。$\kappa=2\cos\ell\delta$ では前節の積和積分により $c_m=\boldsymbol{1}_{m=\ell}$、$s_m=0$、$c_0=0$。よって $\ell$ 次成分だけが残り、$C_\kappa^2=C_\kappa$ も従う。$\square$
<!-- proof-end -->

注意したいのは、$\kappa$ が偶関数でなくても $C_\kappa$ は回転等変であることだ。例えば $\kappa=2\sin2\delta$ は2次係数に行列 $R(\pi/2)$ を掛ける。偶対称性は核の追加条件であって、円周の回転等変性の必要条件ではない。

## 6. 平面の方向付き核と原点の制約

円周は半径が固定された方向の集合だが、平面上の画像・点群では位置 $x=(x_1,x_2)$ の**距離**も変わる。原点以外の点を $x=r(\cos\varphi,\sin\varphi)$（$r>0$）と表し、回転によって $r$ はそのまま、$\varphi$ は $\alpha$ 増えることに注目する。ここではスカラー入力から原点の周波数型特徴への核の形だけを扱う。

<a id="thm-mfl28-planar-kernel"></a>

<!-- formal-statement-start -->
> **定理（平面の周波数型核と原点の条件）**
> 整数 $m\ge1$ と連続関数 $K:\mathbb R^2\setminus\{0\}\to\mathbb R^2$ に対し、すべての $x\ne0$ と角度 $\alpha$ で $K(R(\alpha)x)=R(m\alpha)K(x)$ が成り立つための必要十分条件は、ある連続関数 $v:(0,\infty)\to\mathbb R^2$ に対して

$$
K(r\cos\varphi,r\sin\varphi)=R(m\varphi)v(r)\qquad(r>0)
$$

> と書けることである。$K$ が原点まで連続に延長できるための必要十分条件は $v(r)\to0$（$r\downarrow0$）であり、そのとき $K(0)=0$ に限る。$m=0$ のスカラー出力なら、回転不変核は $K(x)=v(\|x\|)$ の形で、原点へ連続延長する条件は $v(r)$ が有限極限を持つことである。
<!-- formal-statement-end -->

**証明の見取り図**。各円を半径 $r$ の基準点 $(r,0)$ から回転させるだけで核の値は決まる。原点はどの回転でも位置が変わらないので、そこで非自明な回転型ベクトルを持てない。

<!-- proof-start -->
### 証明

$v(r)=K(r,0)$ と定める。$x=R(\varphi)(r,0)$ だから、等変条件を $x=(r,0)$ に適用すると $K(x)=R(m\varphi)v(r)$ が必要である。逆にこの式から

$$
K(R(\alpha)x)=R(m(\varphi+\alpha))v(r)
=R(m\alpha)K(x)
$$

を得る。$m$ が整数なので極角の代表を $2\pi$ ずらしても核の値は変わらない。$r\downarrow0$ で $\|K(x)\|=\|v(r)\|$ は $\varphi$ に依存しない。したがって $v(r)\to0$ なら $K(0)=0$ と置いて連続にできる。逆に連続延長があり等変なら $K(0)=R(m\alpha)K(0)$ が全角度に成り立つ。$\alpha=\pi/m$ で $R(m\alpha)=-I$ だから $K(0)=0$、よって $v(r)=K(r,0)\to0$。$m=0$ は $R(0)=1$ として同じ極座標の議論で従う。$\square$
<!-- proof-end -->

**具体的な判定**。$m=1$ に対する $K(x_1,x_2)=(x_1,x_2)^\mathsf T$ は $r(\cos\varphi,\sin\varphi)^\mathsf T=R(\varphi)(r,0)^\mathsf T$ なので全条件を満たす。$m=2$ の $K(x_1,x_2)=(x_1^2-x_2^2,2x_1x_2)^\mathsf T$ は $r^2(\cos2\varphi,\sin2\varphi)^\mathsf T$ となり、原点へ連続である。これに対し $m=1$ と宣言して $K(x)=(x_1^2,x_2^2)^\mathsf T$ を使うと、$x=(1,0)$、$\alpha=\pi/2$ で左辺 $(0,1)^\mathsf T$、右辺 $(0,1)^\mathsf T$ は偶然一致するが、$\alpha=\pi$ では左辺 $(1,0)^\mathsf T$、右辺 $(-1,0)^\mathsf T$ となり失敗する。失った仮定は核の回転変換則である。

ここまでの分類は **SO(2) のスカラー入力から一つの回転中心に置く出力**に対するものである。任意の入出力のテンソル型・全平面への畳み込みの分類は、各点の作用と空間の測度まで指定してから行う。円周上の差角畳み込みと平面上の方向核を混同しない。

## 7. 数値実験――厳密な回転則と標本化誤差を分ける

[Pythonラボ](so2_fourier_lab.py)は有限三角多項式を真の信号として持ち、等間隔 $N$ 点の台形和で $T_kf$ を近似する。角度 $\alpha$ を自由に変えて、正しい $m$ 型核と $m+1$ 型の項を混ぜた誤核を比較する。$N$ が十分大きければ積の全非零周波数が標本化により折り返されず、ここでの台形和は厳密積分に等しい（実計算では浮動小数誤差を除く）。小さい $N$ の誤差を理論の等変性違反とは呼ばない。

~~~bash
python textbook/volumes/dream_thater/応用系/MFL/MFL28/so2_fourier_lab.py --self-test
python textbook/volumes/dream_thater/応用系/MFL/MFL28/so2_fourier_lab.py --mode 2 --angle 37 --samples 64 --kernel valid
python textbook/volumes/dream_thater/応用系/MFL/MFL28/so2_fourier_lab.py --mode 2 --angle 37 --samples 64 --kernel invalid
python textbook/volumes/dream_thater/応用系/MFL/MFL28/so2_fourier_lab.py --mode 4 --angle 20 --samples 8 --kernel valid
~~~

~~~python-file-lab
# lab-id: MFL28-SO2-FOURIER
# lab-title: 円周Fourierと回転追従核
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL28/so2_fourier_lab.py
# timeout-ms: 60000
# lab-preset: 二次型・正しい核 | --mode 2 --angle 37 --samples 64 --kernel valid
# lab-preset: 二次型・周波数の混入 | --mode 2 --angle 37 --samples 64 --kernel invalid
# lab-preset: 四次型・少数標本 | --mode 4 --angle 20 --samples 8 --kernel valid
~~~

回転残差は $\|T_k(U_\alpha f)-R(m\alpha)T_kf\|_2$ であり、出力の大きさと併記する。$m=0$ では行列の代わりに1を使う。正しい核で残差が丸め誤差に近くても、全ての標本数・任意の信号の積分精度が保証されたわけではない。誤核に特定の入力周波数が存在しなければ、誤っていてもその信号では残差が0になり得るため、ラボでは対象周波数を含む信号を固定する。

## 8. 演習――回転の型と核を検算する

<a id="ex-mfl28-a01"></a>

### MFL28-A01 一周の条件と二つの回転型

- Level: A
- 問題: (1) $m=1,2$ の $\rho_m(R(\pi/2))(1,0)^\mathsf T$ を計算せよ。(2) $\lambda=1/2$ とした $R(\lambda\alpha)$ が、同じ $SO(2)$ の元を表す $\alpha=0,2\pi$ に対して異なる行列を返すことを示せ。(3) $m=0$ の実数型では何が変わらないか述べよ。

<a id="ex-mfl28-a02"></a>

### MFL28-A02 二成分のFourier係数を取り出す

- Level: A
- 問題: $f(\theta)=1+2\cos\theta-3\sin\theta+4\cos2\theta$ について、[実Fourier特徴](#def-mfl28-fourier-moments)から $F_0,F_1,F_2$ を求めよ。$\alpha=\pi/2$ だけ回した信号の特徴を $R(m\alpha)$ で計算し、$f(\theta-\pi/2)$ を展開した値と一致することを確かめよ。

<a id="ex-mfl28-a03"></a>

### MFL28-A03 回転追従核の出力

- Level: A
- 問題: $m=1$、$k(\theta)=R(\theta)(2,-1)^\mathsf T$ とする。$k(0),k(\pi/2)$ を求め、steerable条件を確認せよ。$f(\theta)=2\cos\theta+3\sin\theta$ に対する $T_kf$ を定義の積分から求めよ。

<a id="ex-mfl28-a04"></a>

### MFL28-A04 二次周波数だけを残す

- Level: A
- 問題: $\kappa(\delta)=2\cos2\delta$、$f(\theta)=3+\cos\theta-2\sin2\theta$ に対する $C_\kappa f$ を求めよ。$\alpha=\pi/4$ のとき $C_\kappa(U_\alpha f)=U_\alpha(C_\kappa f)$ を両辺の式で検算せよ。

<a id="ex-mfl28-b01"></a>

### MFL28-B01 有限Fourier和で回転の型を証明する

- Level: B
- 問題: $f(\theta)=a_0+\sum_{j=1}^M(a_j\cos j\theta+b_j\sin j\theta)$ とする。任意の $m\ge1$ に対して $F_m(U_\alpha f)=R(m\alpha)F_m(f)$ を、積和公式と変数変換から示せ。さらに $m>M$ なら両辺0であることも確認せよ。

<a id="ex-mfl28-b02"></a>

### MFL28-B02 全入力への等変性から核を回収する

- Level: B
- 問題: 連続2π周期核 $k:S^1\to\mathbb R^2$ と整数 $m\ge1$ について、$T_k(U_\alpha f)=R(m\alpha)T_kf$ が任意の連続実関数 $f$ と角度 $\alpha$ に対して成立するとする。$k(\theta)=R(m\theta)v$ であることを、積分が0となる連続関数の二乗を利用して証明せよ。任意の $f$ という仮定を、定数関数 $f=1$ のみへ弱めると結論が壊れる反例も挙げよ。

<a id="ex-mfl28-b03"></a>

### MFL28-B03 原点で消える核と失敗する核

- Level: B
- 問題: $K_1(x_1,x_2)=(x_1,x_2)^\mathsf T$ と $K_2(x_1,x_2)=(x_1^2-x_2^2,2x_1x_2)^\mathsf T$ がそれぞれ周波数1、2型であることを極座標から証明せよ。原点での値を決定せよ。さらに $B(x_1,x_2)=(x_1^2,x_2^2)^\mathsf T$ が周波数1型でないことを $x=(1,0)$ と180度回転で確かめよ。

<a id="ex-mfl28-b04"></a>

### MFL28-B04 奇数核も回転等変である

- Level: B
- 問題: $\kappa(\delta)=1+2\cos\delta+2\sin2\delta$、$f(\theta)=1+2\cos\theta+3\sin\theta+4\cos2\theta+5\sin2\theta$ とする。$C_\kappa f$ を求めよ。$\sin2\delta$ は偶関数でないのに回転等変性が保たれる理由を、[円周畳み込みの定理](#thm-mfl28-correlation-modes)の仮定と計算から説明せよ。

<a id="ex-mfl28-c01"></a>

### MFL28-C01 正しい二次核と周波数を混ぜた核

- Level: C
- 問題: $f(\theta)=1+2\cos\theta-\sin\theta+3\cos2\theta+2\sin2\theta$ とし、$k_2(\theta)=R(2\theta)(2,1)^\mathsf T$、$h(\theta)=R(\theta)(1,0)^\mathsf T$、$k_{\mathrm{bad}}=k_2+h$ とする。出力の目標型は周波数2とする。
  1. $T_{k_2}f$ と $T_hf$ を[積分写像](#thm-mfl28-kernel-classification)から計算せよ。
  2. $\alpha=\pi/3$ とし、$T_{k_2}(U_\alpha f)$ を二次回転行列で書いて成分を求めよ。
  3. $k_{\mathrm{bad}}$ の等変残差 $\|T_{k_{\mathrm{bad}}}(U_\alpha f)-R(2\alpha)T_{k_{\mathrm{bad}}}f\|_2$ を厳密に求め、どの仮定を破ったため0でなくなるかを述べよ。
  4. $N=16$ 個の等間隔点 $\theta_j=2\pi j/N$ の平均和で上の積分を置き換えたとき、今回の信号と核に限って積分値が一致する理由を、積の最大周波数から説明せよ。

## 9. 演習の詳細解答

### Level A

<!-- solution-start -->
**MFL28-A01 解答**。$R(\pi/2)(1,0)^\mathsf T=(0,1)^\mathsf T$、$R(\pi)(1,0)^\mathsf T=(-1,0)^\mathsf T$。$R(\lambda\cdot0)=I$ だが $R(\lambda\cdot2\pi)=R(\pi)=-I$ なので半周波数の値は群元から一意に定まらない。周波数0の実数型は $\rho_0(R(\alpha))=1$、すなわちすべての角度で値が保存される。

**MFL28-A02 解答**。積和公式より異なる正整数周波数の正弦・余弦は積分で直交し、同じ周波数の平方は積分が $\pi$ である。したがって $F_0=1,F_1=(2,-3)^\mathsf T,F_2=(4,0)^\mathsf T$。回転後は

$$
R(\pi/2)F_1=\begin{pmatrix}0&-1\\1&0\end{pmatrix}\begin{pmatrix}2\\-3\end{pmatrix}=\begin{pmatrix}3\\2\end{pmatrix},\qquad
R(\pi)F_2=\begin{pmatrix}-4\\0\end{pmatrix}.
$$

直接展開すると $\cos(\theta-\pi/2)=\sin\theta$、$\sin(\theta-\pi/2)=-\cos\theta$、$\cos(2\theta-\pi)=-\cos2\theta$ なので $f(\theta-\pi/2)=1+3\cos\theta+2\sin\theta-4\cos2\theta$ となり一致する。

**MFL28-A03 解答**。$k(0)=(2,-1)^\mathsf T$、$k(\pi/2)=R(\pi/2)(2,-1)^\mathsf T=(1,2)^\mathsf T$。任意の $\theta,\alpha$ について $k(\theta+\alpha)=R(\alpha)R(\theta)(2,-1)^\mathsf T=R(\alpha)k(\theta)$。積分核の成分は $k=(2\cos\theta+\sin\theta,2\sin\theta-\cos\theta)^\mathsf T$ であるから

$$
\begin{aligned}
T_kf&=\frac1{2\pi}\int_0^{2\pi}
\begin{pmatrix}(2\cos\theta+\sin\theta)(2\cos\theta+3\sin\theta)\\
(2\sin\theta-\cos\theta)(2\cos\theta+3\sin\theta)\end{pmatrix}d\theta\\
&=\frac12\begin{pmatrix}4+3\\-2+6\end{pmatrix}
=\begin{pmatrix}7/2\\2\end{pmatrix}.
\end{aligned}
$$

ここで混合積分は0、$\int\cos^2\theta=\int\sin^2\theta=\pi$ を使用した。

**MFL28-A04 解答**。[射影公式](#thm-mfl28-correlation-modes)に $\ell=2$ を入れると $f$ の二次成分 $-2\sin2\theta$ だけが残る。$U_{\pi/4}f(\theta)=3+\cos(\theta-\pi/4)-2\sin(2\theta-\pi/2)=3+\cos(\theta-\pi/4)+2\cos2\theta$ なので、その射影は $2\cos2\theta$。他方 $U_{\pi/4}C_\kappa f=-2\sin(2\theta-\pi/2)=2\cos2\theta$ で等しい。
<!-- solution-end -->

### Level B

<!-- solution-start -->
**MFL28-B01 解答**。整数 $m\ge1$ の $F_m$ で $t=\theta-\alpha$ と置き、積分区間を周期性で戻すと

$$
F_m(U_\alpha f)=\frac1\pi\int_0^{2\pi}f(t)q_m(t+\alpha)\,dt
=R(m\alpha)\frac1\pi\int_0^{2\pi}f(t)q_m(t)\,dt.
$$

最後の式が $R(m\alpha)F_m(f)$。$2\cos jt\cos mt=\cos(j-m)t+\cos(j+m)t$ と展開する。同じく $2\sin jt\sin mt=\cos(j-m)t-\cos(j+m)t$、$2\sin jt\cos mt=\sin(j+m)t+\sin(j-m)t$ である。$1\le j\le M$ と $m>M$ では $j-m\ne0$、$j+m\ne0$ だから全積分が0となる。定数項との積も $m\ge1$ なら0である。よって $F_m(f)=0$、回転後も0。

**MFL28-B02 解答**。等変性を仮定し、$t=\theta-\alpha$ と置いた等式を差し引くと

$$
\int_0^{2\pi}\{k(t+\alpha)-R(m\alpha)k(t)\}f(t)\,dt=0
$$

がすべての連続 $f$ について成立する。差の第 $j$ 成分を $d_j(t)$ とすれば、これ自体を $f=d_j$ と選べるので $\int d_j^2=0$。連続性から $d_j\equiv0$。よって $k(t+\alpha)=R(m\alpha)k(t)$、特に $t=0$ で $k(\theta)=R(m\theta)k(0)$。

定数入力だけなら $k(\theta)=(\cos2m\theta,\sin2m\theta)^\mathsf T$ が反例となる。この核の積分は0で $T_k1=0$、したがってすべての $\alpha$ に対し $T_k(U_\alpha1)=0=R(m\alpha)T_k1$ だが、$k(\pi/m)=k(0)$ と $R(\pi)k(0)=-k(0)$ は異なる。全入力を要求することが必要である。

**MFL28-B03 解答**。$x_1=r\cos\varphi,x_2=r\sin\varphi$ なら $K_1=r(\cos\varphi,\sin\varphi)^\mathsf T=R(\varphi)(r,0)^\mathsf T$ で、$K_2=r^2(\cos2\varphi,\sin2\varphi)^\mathsf T=R(2\varphi)(r^2,0)^\mathsf T$ である。どちらも $r\downarrow0$ で基準ベクトルが0へ行くから、[平面核の定理](#thm-mfl28-planar-kernel)の条件を満たして原点の値は $(0,0)^\mathsf T$。$B(R(\pi)(1,0))=B(-1,0)=(1,0)^\mathsf T$ に対し $R(\pi)B(1,0)=(-1,0)^\mathsf T$。核の周波数1型の変換則が壊れている。

**MFL28-B04 解答**。核の平均は $c_0=1$。直交性から $c_1=1,s_1=0$、$c_2=0,s_2=1$、その他の $m\ge3$ で $c_m=s_m=0$。したがって一次係数 $(2,3)^\mathsf T$ は保存され、二次係数 $(4,5)^\mathsf T$ は

$$
\begin{pmatrix}0&-1\\1&0\end{pmatrix}\begin{pmatrix}4\\5\end{pmatrix}
=\begin{pmatrix}-5\\4\end{pmatrix}
$$

へ移る。結論は $C_\kappa f(\theta)=1+2\cos\theta+3\sin\theta-5\cos2\theta+4\sin2\theta$。[回転等変性](#thm-mfl28-correlation-modes)の仮定は核が連続・周期的であることだけで、$\kappa(-\delta)=\kappa(\delta)$ は要求しない。差角 $\delta$ が同時回転で不変であるためである。
<!-- solution-end -->

### Level C

<!-- solution-start -->
**MFL28-C01 解答**。(1) [Fourier係数の定義](#def-mfl28-fourier-moments)より $F_2(f)=(3,2)^\mathsf T$, $F_1(f)=(2,-1)^\mathsf T$。$T_k$ の $1/2$ の係数を含めて

$$
T_{k_2}f=\frac12\begin{pmatrix}2&-1\\1&2\end{pmatrix}
\begin{pmatrix}3\\2\end{pmatrix}=\begin{pmatrix}2\\7/2\end{pmatrix},\qquad
T_hf=\frac12 I\begin{pmatrix}2\\-1\end{pmatrix}
=\begin{pmatrix}1\\-1/2\end{pmatrix}.
$$

(2) [核の等変性](#thm-mfl28-kernel-classification)より正しい二次核では $R(2\alpha)$ を掛ける。$\alpha=\pi/3$ では $2\alpha=2\pi/3$ だから

$$
T_{k_2}(U_{\pi/3}f)=
\begin{pmatrix}-1/2&-\sqrt3/2\\\sqrt3/2&-1/2\end{pmatrix}
\begin{pmatrix}2\\7/2\end{pmatrix}
=\begin{pmatrix}-1-7\sqrt3/4\\\sqrt3-7/4\end{pmatrix}.
$$

(3) $h$ は一次核なので $T_h(U_\alpha f)=R(\alpha)T_hf$。$k_2$ 由来の項は両側で打ち消し合い、残差ベクトルは

$$
\{R(\pi/3)-R(2\pi/3)\}\begin{pmatrix}1\\-1/2\end{pmatrix}.
$$

二つの回転行列の差の二乗ノルムは、任意の $z$ に対し $\|(R(a)-R(b))z\|_2^2=\{2-2\cos(a-b)\}\|z\|_2^2$ である。これは内積の展開と $R(a)^\mathsf TR(b)=R(b-a)$ から従う。今回 $a-b=-\pi/3$、$\|z\|_2^2=1+1/4=5/4$ なので残差は $\sqrt{(2-1)(5/4)}=\sqrt5/2$。$h(\theta+\alpha)=R(\alpha)h(\theta)$ は成立するが、目標の $R(2\alpha)$ には従わない。

(4) 核と信号はそれぞれ周波数0,1,2までの有限和であり、積の周波数は高々4である。等間隔点では

$$
\frac1N\sum_{j=0}^{N-1}e^{i\ell2\pi j/N}=0
\quad(0<|\ell|<N)
$$

（有限等比和）だから、$N=16$ では周波数1〜4の積分平均と標本平均が同じ0になり、定数項も同じ値となる。回転した $f$ も次数2の三角多項式のままであるから、(1)〜(3)の積分は標本平均で正確に再現される（浮動小数計算では丸め誤差を除く）。$N$ が小さい場合や一般の非帯域制限信号ではこの議論をそのまま使えない。
<!-- solution-end -->

## 10. 次の講義へ

周波数の違う二成分は、同じ回転でも違う速さで追従する。平面の方向付き核も、その型を決めると角度依存が強く制約される。次の MFL29 では連続角度から離れ、**点の番号をどのように付け替えても変わらない／追従する**集合・点群の層を構成する。
