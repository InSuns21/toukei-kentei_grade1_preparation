# AFR12 無限素点の GL_2(R) 表現

前講では保型関数を実回転で移動すると古典形式の重さが現れ、正則性は一つの右微分が零になることに翻訳できました。しかし、一つの重さの関数だけでは一般の実行列の右作用に閉じません。どの重さが一緒に現れ、どこでその列が止まるのでしょうか。本講では実側だけを取り出し、円周上の関数と円板上の正則関数という二つの具体的な模型で答えます。

## 1. 実群の作用と重さ

$G=GL_2(\mathbb R)$、$G^+$ を行列式が正の部分群、$G_0=SL_2(\mathbb R)$ とします。$K=O(2)$、$K_0=SO(2)$ とし、[右回転に用いる部分群](../AFR1/index.md#def-afr1-rotation) の規約を使います。

$$
k_\theta=\begin{pmatrix}\cos\theta&\sin\theta\\-\sin\theta&\cos\theta\end{pmatrix},
\qquad r=\operatorname{diag}(1,-1).
$$

[線形表現](../../LREP/LREP1/index.md#def-lrep1-linear-representation) とは群の積を可逆な複素線形写像の合成に移す作用です。以下、滑らかな表現では完備な局所凸複素位相ベクトル空間（例えば滑らかな関数の空間）上の連続な表現を考え、各ベクトルの軌道写像 $g\mapsto\pi(g)v$ が無限回微分可能で、その微分が同じ空間に属するものとします。Hilbert 空間の表現を扱う場合、微分は滑らかなベクトルに制限します。例えば関数への右作用は $\pi(g)F(h)=F(hg)$ で、$\pi(g)\pi(g')F(h)=F(hgg')$ です。滑らかな関数の空間では行列の微小な変化も微分できます。

前講の [アデール上の保型形式](../AFR11/index.md#def-afr11-automorphic-form) では右回転の像が有限次元でした。回転で一定の複素指数倍になる成分を重さで記録し、さらに微分で重さの間を移ります。ここで $K$ は全直交行列、$K_0$ はそのうち行列式1の回転行列です。$K=K_0\cup rK_0$ で、$rk_\theta r=k_{-\theta}$ です。

<a id="def-afr12-k-type"></a>

<!-- formal-statement-start -->
> **定義（実回転の重さと K 有限ベクトル）**
> $G=GL_2(\mathbb R)$ の滑らかな表現 $\pi$ の空間を $V$ とし、$K=O(2)$ とする。回転 $k_\theta$ に対する整数 $m$ の重さの空間は
$$
V_m=\{v\in V:\pi(k_\theta)v=e^{im\theta}v\quad(\theta\in\mathbb R)\}.
$$
> $K$ による軌道の線形包が有限次元であるベクトルを $K$ 有限とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr12-k-type -->
**定義の確認**

円周の行ベクトル $v_\theta=(\cos\theta,\sin\theta)$ に対する右掛け算で、円周上の滑らかな複素関数を引き戻します。全群の表現の例とするには、これらの関数を非零行ベクトル上へ $F(\rho v_\theta)=f(\theta)$（$\rho>0$）と延長します。$\pi(g)F(v)=F(vg)$ はこの同次次数0の空間を保ちます。

加法公式を使うと

$$
v_\theta k_\alpha
=(\cos\theta\cos\alpha-\sin\theta\sin\alpha,
\cos\theta\sin\alpha+\sin\theta\cos\alpha)
=v_{\theta+\alpha}.
$$

従って $e_m(\theta)=e^{im\theta}$ に対して

$$
(\pi(k_\alpha)e_m)(\theta)
=e^{im(\theta+\alpha)}=e^{im\alpha}e_m(\theta).
$$

これは定義の重さ $m$ の条件そのものです。

反射 $r$ は角度を $-\theta$ に替えるため $e_{-m}$ に移ります。

従って $K$ 軌道の線形包は $e_m,e_{-m}$ が張る高々2次元空間です。
<!-- definition-example-end -->

有限次元の回転不変空間では、[コンパクト群の平均による不変内積](../../LREP/LREP2/index.md#thm-lrep2-compact-averaging) を連続な $SO(2)$ 表現に適用し、任意の正定値 Hermite 内積を $d\theta/(2\pi)$ で平均します。

回転の微分を一時的に $Q=\left.\frac{d}{d\theta}\pi(k_\theta)\right|_{\theta=0}$ と書きます。不変内積の等式 $\langle\pi(k_\theta)v,\pi(k_\theta)u\rangle=\langle v,u\rangle$ を $\theta=0$ で微分すると

$$
\langle Qv,u\rangle+\langle v,Qu\rangle=0.
$$

従って $Q^*=-Q$（反 Hermitian）であり、$-iQ$ は Hermitian です。その直交固有基底を取ると、各固有ベクトル $Qv=i\lambda v$（$\lambda$ は実数）について群の積法則から $\frac{d}{d\theta}\pi(k_\theta)v=i\lambda\pi(k_\theta)v$ です。初期値 $v$ から $\pi(k_\theta)v=e^{i\lambda\theta}v$。周期 $2\pi$ より $e^{2\pi i\lambda}=1$ なので $\lambda=m\in\mathbb Z$ です。

従って $K$ 有限ベクトルは重さのベクトルの有限和です。逆に重さ $m$ のベクトル $v$ は回転で定数倍、反射を含む元 $rk_\theta$ では $\pi(r)v$ の定数倍になるので $K$ 有限です。有限和も $K$ 有限であり、異なる回転微分の固有値の空間の和は直和なので、$K$ 有限部分は重さの空間の代数的直和です。

$k_\pi=-I$ なので中心の符号は $(-1)^m$ で読み取れます。

## 2. 微分による重さの移動

前講と同じ方向行列を用います。

$$
H=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\quad
S=\begin{pmatrix}0&1\\1&0\end{pmatrix},\quad
T=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

[一般線形群の Lie 環の括弧](../../LIE/LIE1/index.md#thm-lie1-gln-bracket) に従い、単位元での接方向は実 $2\times2$ 行列 $X$ です。行列指数 $\exp(tX)$ は単位元を通り、初速度 $X$ の曲線です。$X$ と $v$ を固定し、実パラメータ $t$ だけを動かして

$$
D_Xv=\left.\frac{d}{dt}\pi(\exp(tX))v\right|_{t=0}
$$

と定め、方向 $X$ について複素線形に延長します。$k_\theta=\exp(\theta T)$ なので $D_T$ は第1節の $Q$ と同じ回転微分です。$I$ は単位行列で、$D_I$ は正のスカラー行列 $\exp(t)I$ に沿う微分です。

行列の交換子は $[X,Y]=XY-YX$、作用素の交換子は $[D_X,D_Y]=D_XD_Y-D_YD_X$ です。

[前講の右微分の計算](../AFR11/index.md#thm-afr11-classical-lift) と同じ混合微分により $[D_X,D_Y]=D_{[X,Y]}$ です。

以下 $P_\pm=D_H\pm iD_S$ とします。

群全体の作用は一般に有限個の重さの和を保ちませんが、微分作用は重さを有限個だけ移すことが分かります。

ここで $\mathfrak g$ は実行列の Lie 代数を複素化したものです。

Lie 代数の作用と $K$ の作用を持ち、それらが $\pi(k)D_X\pi(k)^{-1}=D_{kXk^{-1}}$ を満たし、$K$ の微分が Lie 代数の作用に一致する空間を $(\mathfrak g,K)$ 加群といいます。

各ベクトルは $K$ 有限とします。

<a id="thm-afr12-ladder"></a>

<!-- formal-statement-start -->
> **定理（昇降作用と交換関係）**
> $GL_2(\mathbb R)$ の滑らかな表現における第2節の微分作用素 $P_\pm$ を考える。重さ $m$ のベクトル $v$ に対して $P_\pm v\in V_{m\pm2}$ であり、
$$
[D_T,P_\pm]=\pm2iP_\pm,\qquad [P_+,P_-]=-4iD_T.
$$
> 従って $K$ 有限部分は微分と $K$ の作用を備えた $(\mathfrak g,K)$ 加群になる。
<!-- formal-statement-end -->

### 証明の見取り図

回転方向との交換子を計算して、微分後の回転固有値を求めます。

<!-- proof-start -->
### 証明

直接掛け算すると $TH=-S,\ HT=S,\ TS=H,\ ST=-H,\ HS=T,\ SH=-T$ です。従って
$$
[T,H]=-2S,\quad [T,S]=2H,\quad[H,S]=2T.
$$
これを微分に移すと
$$
[D_T,P_\pm]=-2D_S\pm2iD_H=\pm2iP_\pm.
$$
また $[P_+,P_-]=-2i[D_H,D_S]=-4iD_T$ です。

$X=H\pm iS$ と置くと $[T,X]=\pm2iX$ です。$T$ は $k_\theta$ と可換なので、積の微分により

$$
\frac{d}{d\theta}(k_\theta Xk_\theta^{-1})
=k_\theta(TX-XT)k_\theta^{-1}
=\pm2i k_\theta Xk_\theta^{-1}.
$$

初期値は $X$ です。従って共役は $e^{\pm2i\theta}(H\pm iS)$ になります。群の積法則と $k\exp(tX)k^{-1}=\exp(tkXk^{-1})$ を用い、$t=0$ で微分すると $\pi(k)D_X\pi(k)^{-1}=D_{kXk^{-1}}$ です。これを用いて
$$
\pi(k_\theta)P_\pm v
=e^{\pm2i\theta}P_\pm\pi(k_\theta)v
=e^{i(m\pm2)\theta}P_\pm v.
$$
$D_T$ は重さを保ち、中心方向 $D_I$ も回転と可換です。任意の行列 $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ は $\frac{a-d}{2}H+\frac{b+c}{2}S+\frac{b-c}{2}T+\frac{a+d}{2}I$ と書けるので、有限個の重さの和は微分後も有限個です。反射は重さの符号を反転させます。共役関係と微分の一致は元の群作用から従い、加群の条件を満たします。
<!-- proof-end -->

## 3. 円周上の主系列

非零行ベクトル $v$ を $v=\rho v_\theta$（$\rho>0$）と書きます。長さの変化と角度の変化を分離できれば、群が円周をどう動かすかを一変数で記述できます。複素数 $d$ と $\epsilon\in\{0,1\}$ を固定し、正の $\rho$ の複素冪は $\exp(d\log\rho)$ とします。

<a id="def-afr12-principal"></a>

<!-- formal-statement-start -->
> **定義（主系列の円周模型）**
> 複素数 $d$、偶奇 $\epsilon\in\{0,1\}$ に対し、滑らかな関数 $F:\mathbb R^2\setminus\{0\}\to\mathbb C$ で
$$
F(tv)=|t|^d\operatorname{sgn}(t)^\epsilon F(v)
\quad(t\in\mathbb R^\times)
$$
> を満たす空間を $I(d,\epsilon)$ とする。$G_0=SL_2(\mathbb R)$ の作用は
$$
(\pi(g)F)(v)=F(vg)
$$
> である。円周に制限した関数 $f(\theta)=F(v_\theta)$ は $f(\theta+\pi)=(-1)^\epsilon f(\theta)$ を満たす。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr12-principal -->
**定義の確認**

例えば $d=-1$、$\epsilon=0$ のとき $F(v)=\|v\|^{-1}$ は滑らかで、$\|tv\|=|t|\|v\|$ から条件を満たします。

$g$ は可逆なので $vg\ne0$ であり、$F(tvg)$ に同じ条件を適用すれば作用後も空間に属します。

作用の積は $F(vgg')$ となり、単位行列の作用は恒等です。

円周では $f=1$ になります。
<!-- definition-example-end -->

この模型は三角行列群での変換則を課した群上の関数に置き換えられます。このように部分群上の指標から群全体の表現を作る方法を誘導表現と呼びます。

$e=(1,0)$ とし、$\Phi(g)=F(eg)$ と置くと、下三角行列 $b=\begin{pmatrix}a&0\\c&a^{-1}\end{pmatrix}$ に対して $\Phi(bg)=|a|^d\operatorname{sgn}(a)^\epsilon\Phi(g)$ です。

逆に $eg=eg'$ なら $e(g'g^{-1})=e$ であり、行列式1から $g'g^{-1}$ は第一行 $(1,0)$ の下三角行列です。この場合 $a=1$ なので $\Phi(g')=\Phi(g)$。従って $F(eg)=\Phi(g)$ が代表元によらず定まります。$t\ne0$ について $\operatorname{diag}(t,t^{-1})g$ の第一行は $teg$ となるため、$F$ の同次性と偶奇条件も復元されます。

非零第一行 $(x,y)$ に対し第二行を $(-y,x)/(x^2+y^2)$ と選べば行列式1の行列が滑らかに選べるため、復元した関数も滑らかです。

下三角群は上三角群と共役です。

ここでは行ベクトルに合わせ下三角側を選びました。

円周の滑らかな関数全体は一般に無限個の Fourier 成分を持ちます。回転の有限性を課すと前節の固有基底により有限和だけが残ります。

<a id="thm-afr12-principal-ladder"></a>

<!-- formal-statement-start -->
> **定理（円周模型の昇降係数）**
> $I(d,\epsilon)$ の $K_0$ 有限部分は $m\equiv\epsilon\pmod 2$ を満たす $e_m(\theta)=e^{im\theta}$ の有限線形結合からなる。その作用は
$$
D_T e_m=im e_m,\quad P_+e_m=(d-m)e_{m+2},\quad P_-e_m=(d+m)e_{m-2}.
$$
> 二次作用素 $\Omega=D_H^2+D_S^2-D_T^2$ はこの部分で $d(d+2)$ 倍に等しい。
<!-- formal-statement-end -->

### 証明の見取り図

単位ベクトルが行列で変形したときの長さと角度の一次変化を計算し、同次性の指数と重さを代入します。

<!-- proof-start -->
### 証明

角度方向の単位接ベクトルを $w_\theta=(-\sin\theta,\cos\theta)$ とします。$v_\theta\exp(tX)=v_\theta+t v_\theta X+O(t^2)$ と展開し、同時に $\rho_X(t)v_{\varphi_X(t)}$ と書きます。$\theta,X$ は固定し、$\rho_X(0)=1,\ \varphi_X(0)=\theta$ です。ここでプライムは $t$ に関する導関数を表し、積と連鎖律から

$$
v_\theta X=\rho_X'(0)v_\theta+\varphi_X'(0)w_\theta.
$$

$v_\theta,w_\theta$ は実平面の正規直交基底なので、それぞれとの内積が長さと角度の微分を与えます。同次性から作用後の関数は $\rho_X(t)^d f(\varphi_X(t))$。従って

$$
(D_X f)(\theta)
=d(v_\theta X\cdot v_\theta)f(\theta)
+(v_\theta X\cdot w_\theta)\frac{df}{d\theta}(\theta).
$$

以下の $\partial_\theta$ はこの円周変数 $\theta$ だけを微分する作用素で、$t$ による群方向の微分 $D_X$ とは異なります。

$X=H$ では $v_\theta H=(\cos\theta,-\sin\theta)$ なので、二つの内積は $\cos^2\theta-\sin^2\theta=\cos2\theta$ と $-2\sin\theta\cos\theta=-\sin2\theta$ です。$X=S$ では $v_\theta S=(\sin\theta,\cos\theta)$ なので、順に $2\sin\theta\cos\theta=\sin2\theta$ と $\cos^2\theta-\sin^2\theta=\cos2\theta$ です。従って円周上の作用は
$$
D_H=d\cos2\theta-\sin2\theta\,\partial_\theta,\qquad
D_S=d\sin2\theta+\cos2\theta\,\partial_\theta.
$$
これに $\partial_\theta e_m=im e_m$ を代入します。
$$
P_+e_m=e^{2i\theta}(d+i\partial_\theta)e_m
=(d-m)e_{m+2},
$$
$$
P_-e_m=e^{-2i\theta}(d-i\partial_\theta)e_m
=(d+m)e_{m-2}.
$$
回転方向の式は角度の平行移動から従います。回転固有関数は $\theta$ に関する微分方程式 $f'=imf$ を満たします。$\frac{d}{d\theta}(e^{-im\theta}f(\theta))=0$ から $e_m$ の定数倍です。偶奇条件は $e^{im\pi}=(-1)^\epsilon$、すなわち $m\equiv\epsilon\pmod2$ となります。[実回転の重さと K 有限ベクトル](#def-afr12-k-type) の後の有限次元分解により有限和で尽くされ、逆に有限和は回転有限です。

[昇降作用と交換関係](#thm-afr12-ladder) より、作用素の積は右側を先に適用する合成として

$$
P_+P_-=D_H^2+D_S^2-i[D_H,D_S]
=D_H^2+D_S^2-2iD_T.
$$

従って

$$
\Omega=P_+P_-+2iD_T-D_T^2.
$$
従って $e_m$ への係数は
$$
(d+m)(d-m+2)-2m+m^2=d^2+2d.
$$
この値は重さによらず、主張を得ます。
<!-- proof-end -->

例えば $d=-1+2i$、$\epsilon=0$ なら $e_0$ を上へ移す係数も下へ移す係数も $-1+2i$ です。

どの偶数重さでも係数は零になりません。

実一般線形群では $g\mapsto |\det g|^\nu$（$\nu\in\mathbb C$）という乗法指標を掛けて中心の作用を変えられます。

具体的には $F(vg)$ に $|\det g|^\nu$ を掛ければ積の法則が保たれ、$zI$ の作用は $|z|^{d+2\nu}\operatorname{sgn}(z)^\epsilon$ です。

反射は重さの符号を替えます。

行列式指標に加えて $\operatorname{sgn}(\det g)$ の冪を掛けることもできます。

## 4. ユニタリ性と既約性

[ユニタリ表現](../../LREP/LREP2/index.md#def-lrep2-invariant-inner-product) の条件を Hilbert 空間へ延長し、内積を保存する可逆線形作用を考えます。既約とは非零の真の閉不変部分空間が存在しないことです。円周上で標準の内積を使えるのはどの指数でしょうか。$g\in G_0$ を固定し、$v_\theta g$ の角度を $\varphi(\theta)$、長さを $\rho(\theta)>0$ とします。今度はプライムが $\theta$ に関する微分を表します。角度は局所的に実数値で選び、円周上の写像は $v\mapsto vg/\|vg\|$ として大域的に定まります。逆写像は $g^{-1}$ で同じ操作をするものです。行列式1なら
$$
\det\begin{pmatrix}v_\theta g\\w_\theta g\end{pmatrix}=1.
$$
一方、$v_\theta g=\rho v_\varphi$ を微分すると第2行は $\rho'v_\varphi+\rho\varphi'w_\varphi$ です。従って $\det(v_\varphi,w_\varphi)=1$ から

$$
1=\rho^2\varphi',\qquad
\varphi'=\rho^{-2}>0.
$$

円周上の可逆な向き保存写像なので $\theta$ が一周すると $\varphi$ も一周します。$d\varphi=\rho^{-2}d\theta$ はこの微分を使う置換積分の記法です。作用後の絶対値の二乗は $\rho^{2\Re d}|f(\varphi)|^2$ なので、$\Re d=-1$ なら
$$
\int_0^{2\pi}|\pi(g)f(\theta)|^2d\theta
=\int_0^{2\pi}|f(\varphi)|^2d\varphi.
$$
逆変換も同じ式を満たします。$L^2$ 関数についても角度写像は滑らかな可逆写像で零集合を零集合へ移し、同じ置換積分が成り立つので、ほとんど至る所の同値類上に等長作用が定まります。偶奇部分の閉性は平行移動が等長であることから従います。

ここで三角多項式が $L^2$ で稠密であることも確認します。有限測度の円周では $L^2$ 関数は有界な単関数で二乗平均近似でき、各可測集合は Lebesgue 測度の正則性から有限個の区間の和で測度の差を任意に小さくできます。従って区分定数関数が稠密です。その実部・虚部それぞれに [Fourier有限和の二乗平均収束](../../../解析系/FOU/FOU2/index.md#thm-fou2-mean-square-convergence) を適用すれば三角多項式で近似できます。近似多項式 $q$ を $\frac12(q(\theta)+(-1)^\epsilon q(\theta+\pi))$ で射影すれば、ノルム誤差を増やさず偶奇条件を保てます。多項式では $g$ が単位元へ近づくと円周上で一様に元の関数へ戻り、等長性と稠密性で全体でもノルム収束します。

逆に標準の円周内積をすべての $g$ について保存するなら、置換後の重み $\rho^{2(\Re d+1)}$ は至る所1でなければなりません。例えば $g=\operatorname{diag}(2,1/2)$ では $\rho(0)=2$。$\Re d\ne-1$ なら角度0の近傍で重みは1より一様に大きいか小さく、そこ（および反対側）に台を持つ非零の滑らかな偶奇関数でノルム保存が破れます。従ってこの内積に関しては $\Re d=-1$ が必要十分です。

[既約表現](../../LREP/LREP1/index.md#def-lrep1-irreducible) の不変部分空間の考え方を微分加群へ移します。加群が既約であるとは、微分と回転（全 $G$ の $(\mathfrak g,K)$ 加群なら反射も）で不変な部分空間が零と全体しかないことです。Hilbert 空間の場合と違い、ここでは部分空間の閉性を要求しません。

$d=-1+it$、$t\in\mathbb R\setminus\{0\}$ なら [円周模型の昇降係数](#thm-afr12-principal-ladder) は全て非零です。

非零有限和に含まれる重さの成分は回転微分 $D_T$ の多項式で取り出せます。

実際、含まれる重さの集合を $M$ とすると重さ $m$ の射影は
$$
\prod_{j\in M,\ j\ne m}\frac{D_T-ij}{im-ij}.
$$
この成分から上下へ昇降を繰り返せば全ての同じ偶奇の重さに到達します。

従ってこの加群は既約です。

$t=0$ のとき偶数重さでは係数は消えませんが、奇数重さでは $P_-e_1=0$ と $P_+e_{-1}=0$ です。正負の重さの張る空間がそれぞれ $G_0$ の微分と回転で不変になり、昇降だけでは境界を越えられません。全 $K$ の反射は二つを交換するので、これは $G_0$ 側の加群についての可約性であり、全 $GL_2(\mathbb R)$ の可約性とは区別します。

正規化した主系列のパラメータを $s=d+1$ と置けば、ユニタリ軸は $s=it$ であり、二次作用素の値は $s^2-1$ です。

## 5. 昇降が止まる正則離散系列

今度は整数 $k\ge2$ とし、$d=-k$、$\epsilon\equiv k\pmod2$ とします。重さ $k$ では下降係数 $d+k=0$ です。[円周模型の昇降係数](#thm-afr12-principal-ladder) により $P_-e_k=0$ で、$P_+$ は常に次の重さへ移します。従って $e_k,e_{k+2},\ldots$ の有限線形結合は $G_0$ の微分と $SO(2)$ で不変になります。この加群を実際にユニタリ表現として実現しましょう。

行ベクトル $(x,y)$ に $z=x+iy$ を対応させます。任意の実行列 $g\in G_0$ の作用は複素数 $A,B$ を使って $z'=Az+B\bar z$ と一意に書けます。実線形写像の $1,i$ での値を $u,v$ とすると $A+B=u,\ i(A-B)=v$ なので $A=(u-iv)/2,\ B=(u+iv)/2$ です。実行列式が $|A|^2-|B|^2$ になることを次に確認します。実際、$A=a+ib,\ B=c+ie$ と置くと
$$
\Re z'=(a+c)x+(-b+e)y,\qquad
\Im z'=(b+e)x+(a-c)y.
$$
行列式は $(a+c)(a-c)-(-b+e)(b+e)=a^2+b^2-c^2-e^2$ です。$z\ne0$ のとき $w=z/\bar z$ は単位円上にあり、$z=\rho e^{i\theta}$ なら $w=e^{2i\theta}$ です。従って $e_{k+2n}(\theta)=e^{ik\theta}w^n$。これを円板の正則関数へ拡張し、重み付き二乗積分で内積を作ります。[正則関数の定義](../../../解析系/CA/CA1/index.md#def-ca1-holomorphic) を使います。「離散系列」と呼べる理由は、次の構成の後で群上の二乗可積分な表現への埋め込みとして証明します。

<a id="def-afr12-disk"></a>

<!-- formal-statement-start -->
> **定義（正則離散系列の円板模型）**
> 整数 $k\ge2$ に対し、単位円板 $\mathbb D=\{w:|w|<1\}$ 上の正則関数 $p$ で
$$
\|p\|_k^2=\frac{k-1}{\pi}\int_{\mathbb D}|p(w)|^2(1-|w|^2)^{k-2}\,dA(w)<\infty
$$
> を満たす関数空間を $\mathcal H_k$ とする。$g\in SL_2(\mathbb R)$ による行ベクトルの変換を $z'=Az+B\bar z$ と表すとき、
$$
(U_k(g)p)(w)=(\bar A+\bar B w)^{-k}
p\left(\frac{Aw+B}{\bar B w+\bar A}\right)
$$
> と作用を定める。ここで $dA$ は平面 Lebesgue 面積測度である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr12-disk -->
**定義の確認**

$p=1$ は円板上で正則です。定義の二乗可積分性を確かめるには $w=re^{i\alpha}$、$dA(w)=r\,dr\,d\alpha$ と置きます。ここでの $r$ は半径であって第1節の反射行列ではありません。角度積分は $2\pi$、$u=1-r^2$ の置換（$du=-2r\,dr$）により
$$
2(k-1)\int_0^1 r(1-r^2)^{k-2}dr=1
$$
です。回転では $A=e^{i\theta},B=0$ なので $U_k(k_\theta)1=e^{ik\theta}$。一般の $g$ に対して $|A|>|B|$ なので分母は閉円板上で零にならず、$U_k(g)1$ は有界な正則関数です。従って同じ積分が有限になります。
<!-- definition-example-end -->

この模型が群自身の二乗可積分関数の空間に入ることまで示します。群の元で関数の引数を左から移す作用を考えます。局所コンパクト Hausdorff 群とは、各点がコンパクトな近傍を持つ Hausdorff 位相群です。[左 Haar 測度](../../LREP/LREP2/index.md#def-lrep2-haar-probability) の一般存在定理を使います。ここではコンパクト群と違い全体積1は要求せず、コンパクト集合上で有限な非零の正則 Borel 測度で、左移動について不変なものを用います。$L^2(G,\mu)$ は二乗可積分な関数をほとんど至る所の一致で同一視した空間です。

<a id="def-afr12-group-left-regular"></a>

<!-- formal-statement-start -->
> **定義（群の左正則表現）**
> 局所コンパクト Hausdorff 群 $G$ と左 Haar 測度 $\mu$ をとる。$L^2(G,\mu)$ 上の作用 $L$ を
>
$$
(L(h)C)(g)=C(h^{-1}g)
$$
>
> で定める。この作用を群の左正則表現とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr12-group-left-regular -->
**定義の確認**

加法群 $\mathbb R$ では Lebesgue 測度を使います。例えば $C=\mathbf 1_{[0,1]}$ とすると $L(a)C=\mathbf 1_{[a,a+1]}$ です。どちらの二乗ノルムも区間の長さ $1$ に等しくなります。

一般の群でも左 Haar 測度の不変性により零集合は左移動で零集合へ移るため、作用はほとんど至る所で一致する関数を同一視した空間上で定まります。変数を $u=h^{-1}g$ と置けば

$$
\int_G |C(h^{-1}g)|^2\,d\mu(g)
=\int_G |C(u)|^2\,d\mu(u).
$$

さらに

$$
(L(h)L(j)C)(g)=C(j^{-1}h^{-1}g)=C((hj)^{-1}g).
$$

単位元の作用は恒等写像で、逆作用は $L(h^{-1})$ です。従って内積を保存する群作用になっています。
<!-- definition-example-end -->

こうした[群の左正則表現](#def-afr12-group-left-regular) の閉不変部分空間として現れる既約ユニタリ表現が離散系列です。

<a id="thm-afr12-discrete"></a>

<!-- formal-statement-start -->
> **定理（円板模型のユニタリ性と離散系列）**
> 整数 $k\ge2$ の $\mathcal H_k$ は $G_0$ の既約ユニタリ表現である。
> 回転有限部分は多項式であり、重さは $k,k+2,\ldots$ である。
> 対応 $w^n\mapsto e_{k+2n}$ は $I(-k,k\bmod2)$ の微分と回転の作用を保つ。
> さらに $\mathcal H_k$ は群の左正則表現 $L^2(G_0)$ の閉不変部分空間として実現できる。
<!-- formal-statement-end -->

### 証明の見取り図

分数変換の微分と面積の変化を計算すると内積が保存されます。単項式が直交基底になるので、昇降で既約性を確かめられます。最後に定数関数への射影を行列係数として積分すると、円板ノルムそのものが現れます。

<!-- proof-start -->
### 証明

[正則離散系列の円板模型](#def-afr12-disk) の分数変換を $M_g(w)=(Aw+B)/J_g(w)$、$J_g(w)=\bar B w+\bar A$ と置きます。$|A|^2-|B|^2=1$ なので分母は閉円板上で非零です。交差項が相殺されるため

$$
|J_g(w)|^2-|Aw+B|^2
=(|A|^2-|B|^2)(1-|w|^2)=1-|w|^2.
$$

プライムを複素変数 $w$ に関する導関数として、商の微分の分子は $A J_g(w)-\bar B(Aw+B)=1$ です。従って
$$
1-|M_g(w)|^2=\frac{1-|w|^2}{|\bar B w+\bar A|^2},\qquad
M_g'(w)=(\bar B w+\bar A)^{-2}.
$$
従って $M_g$ は円板を保ち、逆行列の変換が逆写像になります。行ベクトルの作用順序から $M_{gh}=M_h\circ M_g$ です。分母についても $\bar z'=J_g(w)\bar z$ を二度適用すれば、単位円上で $J_{gh}(w)=J_h(M_g(w))J_g(w)$ です。両式は分母を払うと多項式の恒等式になるので円板内でも成立します。よって

$$
\begin{aligned}
(U_k(g)U_k(h)p)(w)
&=J_g(w)^{-k}J_h(M_g(w))^{-k}p(M_h(M_g(w)))\\
&=J_{gh}(w)^{-k}p(M_{gh}(w)).
\end{aligned}
$$

単位元では $A=1,B=0$、従って恒等作用であり、逆作用は $U_k(g^{-1})$ です。

面積の変換には実二次元の Jacobian を使います。正則写像の実微分は [Cauchy–Riemann 必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary) により複素数 $M_g'(w)=a+ib$ を掛ける行列 $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$ です。従ってその行列式は $a^2+b^2=|M_g'(w)|^2=|J_g(w)|^{-4}>0$ です。よって $\zeta=M_g(w)$ と置くと
$$
(1-|\zeta|^2)^{k-2}dA(\zeta)
=(1-|w|^2)^{k-2}|\bar B w+\bar A|^{-2k}dA(w).
$$
これは作用後のノルムに現れる因子そのものなので、ノルムが保存されます。

[正則関数の Taylor 展開](../../../解析系/CA/CA3/index.md#thm-ca3-taylor) により $p(w)=\sum_{n\ge0}c_nw^n$ は半径 $r<1$ の円周で一様収束します。角度積分で異なる次数の積が消えるため、半径について非負項の和を積分すると
$$
\|p\|_k^2=\sum_{n\ge0}|c_n|^2 b_n,\qquad
b_n=(k-1)\int_0^1 u^n(1-u)^{k-2}du.
$$
$b_0=1$ です。$u^{n+1}(1-u)^{k-1}$ は両端で零なので、その微分を積分すると
$$
0=(n+1)(b_n-b_{n+1})-(k-1)b_{n+1}
$$
です。

従って $b_{n+1}/b_n=(n+1)/(n+k)$ です。

従って $b_n=n!(k-1)!/(n+k-1)!$ となります。

逆にこの重み付き二乗和が有限なら Cauchy–Schwarz により $\sum |c_n|r^n$ は $r<1$ で有限です（$b_n^{-1}=(n+1)\cdots(n+k-1)/(k-1)!$ であり、$\sum b_n^{-1}r^{2n}$ が収束するため）。

これで完備性と多項式の稠密性が従います。

回転は $w^n$ に $e^{i(k+2n)\theta}$ を掛けます。

[実回転の重さと K 有限ベクトル](#def-afr12-k-type) の有限次元分解を $K_0$ に適用すると、回転有限なら有限個の固有成分しか持ちません。Taylor 係数の一意性から重さ $k+2n$ の固有空間は $w^n$ の張る一次元空間です。逆に多項式は有限個の重さの和です。

多項式 $p$ に対し、非零 $z$ 上で $F(z)=\bar z^{-k}p(z/\bar z)$ と置きます。$F(tz)=t^{-k}F(z)=|t|^{-k}\operatorname{sgn}(t)^kF(z)$（実数 $t\ne0$）なので [主系列の円周模型](#def-afr12-principal) の条件を満たします。単位円上では $F(z)=e^{ik\theta}p(e^{2i\theta})$ です。$\bar z'=J_g(w)\bar z$ と $z'/\bar z'=M_g(w)$ を代入すると、$F(z')=\bar z^{-k}J_g(w)^{-k}p(M_g(w))$ となり、円板の作用式と円周上で一致します。

多項式について微分すると [円周模型の昇降係数](#thm-afr12-principal-ladder) より
$$
P_+w^n=-2(k+n)w^{n+1},\qquad P_-w^n=2n w^{n-1}.
$$
$n=0$ の下降だけが零です。非零閉不変部分空間から非零の $p=\sum c_nw^n$ を取り、$c_j\ne0$ となる $j$ を選びます。回転についての Fourier 射影は

$$
\frac1{2\pi}\int_0^{2\pi}e^{-i(k+2j)\theta}U_k(k_\theta)p\,d\theta
=c_jw^j.
$$

多項式で角度積分を計算し、ノルム稠密性とユニタリ性で一般の $p$ へ延長した式です。回転作用のノルム連続性も、多項式上の明示式と等長性・稠密性から従います。積分は有限和のノルム極限なので閉不変部分空間内に留まります。多項式の軌道はノルムで微分可能です。実際、単位円上まで分母が零にならない近傍では差商と微分の収束が一様で、重み付き面積が有限なのでノルムでも収束します。昇降で全ての単項式が入り、稠密性から閉部分空間は全体です。回転の強連続性だけでなく一般の群作用の強連続性も、同じ一様評価を多項式に適用し、ユニタリ性と稠密性で全体へ延長できます。

最後に $C_p(g)=(U_k(g^{-1})p)(0)$ と置きます。定数項の取り出しは直交展開により連続な線形汎関数です。[群の左正則表現](#def-afr12-group-left-regular) の左移動について、$(h^{-1}g)^{-1}=g^{-1}h$ なので

$$
(L(h)C_p)(g)
=(U_k(g^{-1})U_k(h)p)(0)=C_{U_k(h)p}(g).
$$

積分を評価するため、円板の点 $\zeta=M_{g^{-1}}(0)$ と回転を座標に取ります。

ここで $A,B$ は $g^{-1}$ に対応する係数とします。

$M_{g^{-1}}(0)=B/\bar A$ なので $1-|\zeta|^2=|A|^{-2}$ です。

原点を固定する元の集合（安定化群）は $B=0$、$|A|=1$ の行列、すなわち $K_0$ です。

円板の測度を $(1-|w|^2)^{-2}dA(w)$ とします。$\zeta=M_g(w)$ と置いて、先ほど導いた分母の恒等式と面積の変換式を代入すると、

$$
\begin{aligned}
(1-|\zeta|^2)^{-2}dA(\zeta)
&=(1-|w|^2)^{-2}|\bar B w+\bar A|^4\\
&\quad\cdot|\bar B w+\bar A|^{-4}dA(w)\\
&=(1-|w|^2)^{-2}dA(w).
\end{aligned}
$$

従って円板測度は群作用で不変です。

$G_0$ の左 Haar 測度はこの測度と [正規化左Haar測度](../../LREP/LREP2/index.md#def-lrep2-haar-probability) である安定化群の回転測度 $d\theta/(2\pi)$ の積で構成できます。

実際、円板への写像に対する連続な代表元を $A=(1-|\zeta|^2)^{-1/2}$、$B=A\zeta$ で選べます。

この係数を持つ行列の逆を $s(\zeta)$ とすれば $M_{s(\zeta)^{-1}}(0)=\zeta$ です。

写像 $g\mapsto M_{g^{-1}}$ は群の積を保つので、同じ $\zeta$ を与える行列は $s(\zeta)k$（$k\in K_0$）と一意に書けます。

左移動 $h$ は円板座標を $M_{h^{-1}}(\zeta)$ に変えます。

新しい代表元との差は右側の回転となるので、回転座標は固定した $\zeta$ ごとに回転するだけです。

円板測度と回転測度はそれぞれ保存され、積測度は左不変です。

係数の絶対値は $|C_p(g)|^2=|\bar A|^{-2k}|p(\zeta)|^2=(1-|\zeta|^2)^k|p(\zeta)|^2$ で、回転座標には依存しません。従って、この Haar 測度の規格化で
$$
\int_{G_0}|C_p(g)|^2dg
=\int_{\mathbb D}|p(\zeta)|^2(1-|\zeta|^2)^{k-2}dA(\zeta)
=\frac{\pi}{k-1}\|p\|_k^2.
$$
定数倍して等長埋め込みを得ます。完備性から像は閉じ、左移動との整合性により不変です。
<!-- proof-end -->

$k=1$ では定数関数さえ上の面積積分が発散するので、この離散系列の構成には $k\ge2$ が必要です。

全 $GL_2(\mathbb R)$ への拡張では正のスカラー作用を例えば自明とし、負の行列式の反射を加えます。

反射は $k_\theta$ を $k_{-\theta}$ に共役するので、正の重さだけの空間は全群の不変空間ではありません。

$\mathcal H_k$ と、$G_0$ の作用を $g\mapsto rgr$ でひねったコピーを直和し、$r$ を二成分の交換として作用させます。

$r^2=I$、共役の関係が成り立つので全群の表現が得られます。

$G^+=\mathbb R_{>0}G_0$ の分解は一意であり、正のスカラーに任意のユニタリ指標を指定できます。

二つのコピーの重さは互いに素な集合で、非零閉不変空間は回転射影と昇降で一方の全体を含み、反射で他方も含むので既約です。

中心の正の方向を除いた商は $G_0$ と反射側の二成分からなります。例えば二成分のうち第一成分の定数関数を取り出す行列係数は、$G_0$ 上では上で計算した $C_p$、反射側ではもう一方の成分に対する同じ型の係数になります（逆元を取ると反射が成分を交換します）。両成分の二乗積分が有限なので、この全群表現にも中心の正の方向を除いて二乗可積分な非零行列係数があります。

## 6. 古典形式との接続

[古典形式の持ち上げ](../AFR11/index.md#thm-afr11-classical-lift) の証明と [二次作用素の計算](../AFR11/index.md#ex-afr11-b3) では、非零のレベル1正則形式（偶数 $k\ge2$）の持ち上げ $\phi_f$ が
$$
D_T\phi_f=ik\phi_f,\quad P_-\phi_f=0,\quad
\Omega\phi_f=k(k-2)\phi_f
$$
を満たしました。これは [円板模型のユニタリ性と離散系列](#thm-afr12-discrete) の最低重さのベクトルと同じ微分条件です。具体的には $v_n=P_+^n\phi_f$ と置きます。[昇降作用と交換関係](#thm-afr12-ladder) より $P_-P_+=P_+P_-+4iD_T$ なので
$$
P_-v_n=-4n(k+n-1)v_{n-1}\quad(n\ge1).
$$
実際 $n=1$ では $P_-\phi_f=0$ から $4i(ik)\phi_f=-4k\phi_f$。

$n$ から $n+1$ へは係数に $-4(k+2n)$ が加わり、$-4n(k+n-1)-4(k+2n)=-4(n+1)(k+n)$ になります。

$k\ge2$ かつ $\phi_f\ne0$ ならこの係数が非零なので帰納的に全ての $v_n$ が非零です。

$v_n$ の重さは $k+2n$ で互いに異なります。

[円板模型のユニタリ性と離散系列](#thm-afr12-discrete) で $P_+w^n=-2(k+n)w^{n+1}$ なので

$$
P_+^n1=(-2)^n k(k+1)\cdots(k+n-1)w^n
$$

です（$n=0$ の空積は1）。これを $v_n$ に送る線形写像は $P_+,P_-,D_T$ と回転の作用を保ちます。ここで復元したのは $SL_2(\mathbb R)$ の微分と回転の加群であって Hilbert 空間としての同型までは主張しません。前講の持ち上げではさらに中心指標が自明なので $D_I\phi_f=0$ であり、$D_I$ は $P_+$ と可換なので全 $v_n$ に対しても零です。全 $K$ へ広げるには反射による負の重さの列も含めます。

一方、最低重さがない主系列では一般に重さは両方向へ続きます。ここでは具体的な主系列と正則離散系列を構成しました。実群の全既約表現の分類、補系列、極限離散系列、保型表現全体の Hilbert 空間分解はこの計算だけからは従いません。

## 7. 演習と詳細解答

<a id="ex-afr12-a1"></a>

### A1. 中心と反射

$e_3(\theta)=e^{3i\theta}$ を回転と反射で移し、$-I$ の作用と $K$ 軌道の線形包の次元を求めよ。

- Level: A
- ID: AFR12-A1

<!-- solution-start -->
**詳細解答**

[実回転の重さと K 有限ベクトル](#def-afr12-k-type) により回転は $e^{3i\alpha}e_3$、反射は $e_{-3}$ に移します。

$-I=k_\pi$ の係数は $e^{3i\pi}=-1$。

異なる重さの二関数は独立で、軌道は両者を含み、その張る空間に留まるので次元2です。
<!-- solution-end -->

<a id="ex-afr12-a2"></a>

### A2. 昇降の具体値

$I(-1+i,0)$ における $P_+e_2$ と $P_-e_2$、$\Omega e_2$ を求めよ。

- Level: A
- ID: AFR12-A2

<!-- solution-start -->
**詳細解答**

[円周模型の昇降係数](#thm-afr12-principal-ladder) に $d=-1+i,m=2$ を代入すると $P_+e_2=(-3+i)e_4$、$P_-e_2=(1+i)e_0$。また $d(d+2)=(-1+i)(1+i)=-2$ なので $\Omega e_2=-2e_2$ です。
<!-- solution-end -->

<a id="ex-afr12-a3"></a>

### A3. 円周の角度変化

$g=\operatorname{diag}(2,1/2)$ に対し $\theta=0$ で長さ $\rho$ と角度の微分 $\varphi'$ を求め、$d=-1$ のノルム保存に現れる因子を確かめよ。

- Level: A
- ID: AFR12-A3

<!-- solution-start -->
**詳細解答**

$v_0g=(2,0)$、$w_0g=(0,1/2)$ なので $\rho(0)=2$、$\varphi(0)=0$ です。第4節の積・連鎖律の式

$$
w_0g=\rho'(0)v_0+\rho(0)\varphi'(0)w_0
$$

で、$w_0$ 方向の係数を比較すると $2\varphi'(0)=1/2$、従って $\varphi'(0)=1/4$ です。従って $\rho^{-2}=1/4=\varphi'$ となり、第4節の置換の因子が一致します。
<!-- solution-end -->

<a id="ex-afr12-a4"></a>

### A4. 最低重さと円板ノルム

$k=4$ の円板模型で $P_-1,P_+1,P_-w,\|w\|_4^2$ を求めよ。

- Level: A
- ID: AFR12-A4

<!-- solution-start -->
**詳細解答**

[円板模型のユニタリ性と離散系列](#thm-afr12-discrete) の係数式に $k=4$ を代入します。$n=0,1$ を順に代入して

$$
P_-1=0,\qquad P_+1=-2(4+0)w=-8w,\qquad P_-w=2.
$$

ノルムの二乗は $b_0=1$ と $b_1/b_0=(0+1)/(0+4)$ より $1/4$ です。
<!-- solution-end -->

<a id="ex-afr12-b1"></a>

### B1. 既約性の破れる指数

第3節の $GL_2(\mathbb R)$ への拡張で行列式指標を掛けない $I(-2,0)$ の回転有限部分で正の重さ $2,4,6,\ldots$ の張る空間が微分と回転で不変であり、全 $K$ の作用では不変でないことを示せ。

- Level: B
- ID: AFR12-B1

<!-- solution-start -->
**詳細解答**

[円周模型の昇降係数](#thm-afr12-principal-ladder) より $P_-e_2=(-2+2)e_0=0$。

$m\ge4$ の偶数なら下降先も2以上です。

上昇先は常に2以上で、$D_T$ は重さを保ちます。

$D_I$ は同次性から $-2$ 倍です。

従って全微分作用と回転で不変です。

しかし反射は $e_2$ を $e_{-2}$ に移すので全 $K$ では不変ではありません。
<!-- solution-end -->

<a id="ex-afr12-b2"></a>

### B2. 内積と昇降作用

$k\ge2$ とする。円板模型で多項式の組について $P_+$ と $-P_-$ が内積に関して随伴関係を満たすことを単項式のノルムから確かめよ。

- Level: B
- ID: AFR12-B2

<!-- solution-start -->
**詳細解答**

内積を第1変数線形とします。[円板模型のユニタリ性と離散系列](#thm-afr12-discrete) より異なる単項式は直交するので、$w^n,w^{n+1}$ の組だけを確認すればよいです。
$$
\langle P_+w^n,w^{n+1}\rangle=-2(k+n)b_{n+1}.
$$
一方 $\langle w^n,-P_-w^{n+1}\rangle=-2(n+1)b_n$。比 $b_{n+1}/b_n=(n+1)/(k+n)$ を代入すれば両者は等しくなります。$n=0$ の下降は零で、負次数は現れません。線形性により任意の多項式の組で一致します。
<!-- solution-end -->

<a id="ex-afr12-b3"></a>

### B3. 円板の面積と係数の可積分性

$k\ge2$ とし $p=1$ を取る。円板の不変測度 $(1-|w|^2)^{-2}dA(w)$ に関して $|(U_k(g^{-1})1)(0)|^2$ の積分を評価せよ。同じ係数公式を $k=1$ に適用すると積分はどうなるか。

- Level: B
- ID: AFR12-B3

<!-- solution-start -->
**詳細解答**

[円板模型のユニタリ性と離散系列](#thm-afr12-discrete) の座標で $w=M_{g^{-1}}(0)$ とすると係数の絶対値の二乗は $|A|^{-2k}=(1-|w|^2)^k$ です。積分は
$$
2\pi\int_0^1 r(1-r^2)^{k-2}dr
=\pi\int_0^1 u^{k-2}du=\frac{\pi}{k-1}.
$$
ここで $u=1-r^2$ です。$k=1$ では $\pi\int_0^1u^{-1}du$ となり発散します。
<!-- solution-end -->

<a id="ex-afr12-c1"></a>

### C1. 最低重さから表現を復元する

非零ベクトル $v$ が $D_Tv=6iv,\ P_-v=0$ を満たす $GL_2(\mathbb R)$ の滑らかな表現を考える。$v_n=P_+^nv$（$n\ge0$）とする。

(1) $v_1,v_2$ の重さと $P_-v_1,P_-v_2$ を求めよ。

(2) 全 $v_n$ が非零かつ独立であることを示せ。

(3) $SL_2(\mathbb R)$ の微分と回転について円板模型との対応を与え、中心方向の作用についてこの情報だけで何が決まるか説明せよ。

- Level: C
- ID: AFR12-C1

<!-- solution-start -->
**詳細解答**

(1) $k_\theta=\exp(\theta T)$ なので $\frac{d}{d\theta}\pi(k_\theta)v=\pi(k_\theta)D_Tv=6i\pi(k_\theta)v$。初期値 $v$ より $\pi(k_\theta)v=e^{6i\theta}v$、すなわち重さ6です。[昇降作用と交換関係](#thm-afr12-ladder) により $v_1,v_2$ の重さは8,10です。$P_-P_+=P_+P_-+4iD_T$ なので
$$
P_-v_1=4i(6i)v=-24v,\qquad
P_-v_2=P_+(-24v)+4i(8i)v_1=-56v_1.
$$
(2) 帰納法で $P_-v_n=-4n(n+5)v_{n-1}$ を得ます。次の係数は $-4n(n+5)-4(6+2n)=-4(n+1)(n+6)$ です。$n\ge1$ で全係数は非零なので $v_n=0$ なら $v_{n-1}=0$ となり、最終的に $v=0$ に矛盾します。異なる $D_T$ の固有値を持つため独立です。

(3) [円板模型のユニタリ性と離散系列](#thm-afr12-discrete) で $k=6$ とすると $P_+^n1=(-2)^n(6\cdot7\cdots(n+5))w^n$。

このベクトルを $v_n$ に移す線形同型は $P_+$、上の下降係数により $P_-$、重さにより $D_T$ を保ちます。

回転作用も微分方程式の解 $e^{i(6+2n)\theta}$ なので一致します。

[円周模型の昇降係数](#thm-afr12-principal-ladder) の証明中の作用素恒等式は一般の微分表現でも成立します。従って

$$
\Omega v=(P_+P_-+2iD_T-D_T^2)v
=(0-12+36)v=24v.
$$

正のスカラー方向 $D_I$ はこれらの方向と可換ですが、$D_Iv$ が $v$ の倍数であることさえ仮定されていません。例えば第5節の全群への拡張に $|\det g|^\nu$ を掛ければ $G_0$ の作用は変わらず、$D_I$ には $2\nu$ が加わります。従って中心方向の作用は決まりません。一方 $-I=k_\pi$ の作用は重さ6から $+1$ と決まります。

全 $K$ には反射 $\pi(r)v$ が作る負の重さの列も必要です。ただし一般の表現では中心方向による移動でさらにベクトルが生じ得るため、この情報だけで全群の表現を決定することはできません。
<!-- solution-end -->

## 8. 次講への接続

実素点では回転による重さと微分が中心的でした。次講の p 進群では実方向の微分の代わりにコンパクト開部分群による不変ベクトルを調べます。局所表現を具体的な関数空間で作り、群の作用からその構造を読むという考え方は共通です。

参考文献：Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press, 1997（実局所表現）；Anthony W. Knapp, *Representation Theory of Semisimple Groups*, Princeton University Press, 1986（主系列・離散系列）。
