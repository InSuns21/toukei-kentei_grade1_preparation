# CELE5 Poincaré・摂動・非可積分性

<!-- definition-example-audit: strict -->

> **既習の道具**：[CELE1 のKepler作用](../CELE1/index.md#prop-cele1-kepler-actions)、[CELE4 の回転系Hamiltonian](../CELE4/index.md#prop-cele4-rotating-equations)、[INT1 の第一積分](../../../幾何系/INT/INT1/index.md#def-int1-first-integral)、[INT4 の共鳴](../../../幾何系/INT/INT4/index.md#def-int4-resonance)、[INT7 のPoincaré第一帰還写像](../../../幾何系/INT/INT7/index.md#def-int7-return)を使います。

## 1. 保存量を一つ知っても「解けた」とは限らない

[円制限三体問題のJacobi積分](../CELE4/index.md#prop-cele4-jacobi-integral)は、一つの軌道を三次元エネルギー面に閉じ込めます。しかし二自由度のHamilton系を作用角変数で解くには、一般点で独立な二つの可換第一積分が必要です（[Liouville可積分性の定義](../../../幾何系/INT/INT1/index.md#def-int1-liouville-integrability)）。「第二の積分をまだ見つけていない」と「特定の関数クラスには第二の積分が存在しない」は、全く違う主張です。

二体問題を少し乱した場合、いつ第二の積分を作れなくなるのでしょうか。答えに迫る道具が、角度に現れる**共鳴**と、摂動パラメータに関して**解析的**であることを仮定した第一積分の係数比較です。この章ではまず証明を完全に追える二自由度模型でPoincaré型の非可積分性定理を証明し、その後に天体力学の実際の摂動項へ戻ります。

## 2. 連続運動を断面上の点列へ変える

四次元の位相空間で正則エネルギー面は三次元です。流れに横断する二次元面を置き、軌道が次に戻ってきた点を記録すれば、帰還写像の反復として運動を観察できます。ここで使う写像の厳密な定義と面積保存性は、[INT7 のPoincaré第一帰還写像](../../../幾何系/INT/INT7/index.md#def-int7-return)と[帰還写像の面積保存命題](../../../幾何系/INT/INT7/index.md#prop-int7-return-area)にあります。以下ではその定理を天体力学の言葉で読みます。

作用角変数 $(I_1,I_2,\theta_1,\theta_2)$ の開領域で

$$
H_0(I)=\frac12(I_1^2+I_2^2),\qquad I_1,I_2>0
$$

とします。Hamilton方程式を一つずつ書くと

$$
\dot I_1=\dot I_2=0,\qquad
\dot\theta_1=I_1,\quad \dot\theta_2=I_2.
$$

まず $\theta_2=0\pmod{2\pi}$ を取ると、$\dot\theta_2=I_2>0$ なので横断し、次の帰還時刻は $T=2\pi/I_2$ です。正則なエネルギー $E>0$ を固定すれば、$I_2=\sqrt{2E-I_1^2}>0$ によって断面は $(I_1,\theta_1)$ の二次元となります。$I_2$ を従属変数とした表示での帰還写像は

$$
P_0(I_1,I_2,\theta_1)
=\left(I_1,I_2,\theta_1+2\pi\frac{I_1}{I_2}\pmod{2\pi}\right).
$$

エネルギー $E$ を固定した断面の独立座標 $(I_1,\theta_1)$ で書き直せば、定義域 $0<I_1<\sqrt{2E}$ に対し

$$
P_{0,E}(I_1,\theta_1)
=\left(I_1,\theta_1+\frac{2\pi I_1}{\sqrt{2E-I_1^2}}\pmod{2\pi}\right).
$$

**具体例**。$I_1=3/2,I_2=1$ なら $E=13/8$ のエネルギー面上にあり、角度の増分は $3\pi$、すなわち $\pi$ です。断面上で二回帰還すると元の角度へ戻ります。比 $I_1/I_2$ が無理数なら、このような有限回帰還は起こりません。この違いは軌道を断面に描けば見えますが、摂動後の「新たな第一積分が存在しない」ことの証明ではありません。

## 3. 円制限三体問題の摂動関数を取り出す

[CELE4 の回転系Hamiltonian](../CELE4/index.md#prop-cele4-rotating-equations)を質量比 $\mu$ の関数として書きます。$q=(x,y)$、$p=(p_x,p_y)$、$e_1=(1,0)$、$r=|q|$、$r'=|q-e_1|$ とし、衝突点 $q=0,e_1$ を避けた領域を考えます。主天体の位置は $-\mu e_1,(1-\mu)e_1$ です。

質量比が零に近いとき、回転しているKepler系からの差だけを取り出したいので、次の摂動関数を導入します。

<a id="def-cele5-disturbing-function"></a>

<!-- formal-statement-start -->
> **定義（円制限三体問題の一次摂動関数）**  
> $q\ne0,e_1$ の平面点と正準運動量 $p$ に対し、回転系のHamiltonian $K_\mu$ の $\mu=0$ における一次係数
>
$$
R(q)=\frac1{|q|}+\frac{x}{|q|^3}-\frac1{|q-e_1|}
$$
>
> を、この章で用いる一次摂動関数とする。摂動を $K_\mu=K_0+\mu R+O(\mu^2)$ というHamiltonianの符号で定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele5-disturbing-function -->

**定義の確認**。$q=(0,2)$ では $r=2,r'=\sqrt5,x=0$ ですから $R(0,2)=1/2-1/\sqrt5$。二つの衝突点と異なるため、この位置では微分も有限です。一方 $q=e_1$ で最後の項は発散するので、衝突点を含む領域で一様な摂動展開を主張することはできません。

<!-- definition-example-end -->

<a id="prop-cele5-restricted-expansion"></a>

<!-- formal-statement-start -->
> **命題（円制限三体問題の小質量比展開）**  
> $q=0,e_1$ を含まないコンパクト集合 $Q$ 上で、$|\mu|$ が十分小さいとき、回転系Hamiltonianは $Q$ 上で一様に
>
$$
K_\mu(q,p)=K_0(q,p)+\mu R(q)+O(\mu^2),
\qquad
K_0=\frac{|p|^2}{2}-xp_y+yp_x-\frac1{|q|}
$$
>
> と展開できる。$p$ は任意であり、剰余の係数は $Q$ 上で一様に有界である。
<!-- formal-statement-end -->

### 証明の見取り図

主天体の**位置も質量比で動く**ことに注意します。第二主天体の引力だけを足すと、第一主天体の位置変化と質量変化を落としてしまいます。

<!-- proof-start -->
### 証明

$U_\mu=(1-\mu)|q+\mu e_1|^{-1}+\mu|q-(1-\mu)e_1|^{-1}$ とおきます。第一項の $\mu$ 微分を $\mu=0$ で評価すると、積の微分法則と

$$
\left.\frac{d}{d\mu}|q+\mu e_1|^{-1}\right|_{\mu=0}
=-\frac{q\cdot e_1}{|q|^3}=-\frac{x}{r^3}
$$

から

$$
\left.\frac{d}{d\mu}
\frac{1-\mu}{|q+\mu e_1|}\right|_{\mu=0}
=-\frac1r-\frac{x}{r^3}.
$$

第二項は係数 $\mu$ があるので、$\mu=0$ における微分は $1/r'$ です。従って

$$
U_\mu=\frac1r+\mu\left(-\frac1r-\frac{x}{r^3}+\frac1{r'}\right)+O(\mu^2).
$$

回転の運動項 $|p|^2/2-xp_y+yp_x$ は $\mu$ に依存しません。$K_\mu=\text{運動項}-U_\mu$ に代入すれば表示式を得ます。$Q$ と二衝突点の距離には正の下限があるので、十分小さい $\mu$ に対する二階微分は $Q$ 上一様有界です。Taylorの剰余評価が一様に適用できます。
<!-- proof-end -->

この $R$ を軌道の作用角変数でFourier展開すると、角度依存項のうち共鳴する項が何かを調べられます。ただし係数がどの共鳴上でも非零だと、**何も計算せずに**仮定してはいけません。

## 4. 共鳴と「第一積分を作る方程式」

[INT4 の近可積分Hamilton系](../../../幾何系/INT/INT4/index.md#def-int4-near-integrable)を、二自由度で解析的な場合に特化します。$D\subset\mathbb R^2$ を開集合、$\theta\in\mathbb T^2$ とし、

$$
H_\varepsilon(I,\theta)=K(I)+\varepsilon V(I,\theta),
\qquad \omega(I)=\nabla K(I)
$$

とします。$K,V$ は実解析的で、角度について $2\pi$ 周期的とします。時間非依存の第一積分は[INT1 の保存条件](../../../幾何系/INT/INT1/index.md#prop-int1-conservation-criterion)により $\{F_\varepsilon,H_\varepsilon\}=0$ を満たします。

$\varepsilon$ の近傍で共同実解析的な第一積分を仮定して

$$
F_\varepsilon=F_0+\varepsilon F_1+\varepsilon^2F_2+\cdots
$$

と書きます。正準括弧は $\{F,H\}=\sum_j(F_{\theta_j}H_{I_j}-F_{I_j}H_{\theta_j})$ です。$\varepsilon^0,\varepsilon^1$ の係数を照合すると

$$
\omega\cdot\partial_\theta F_0=0,\qquad
\omega\cdot\partial_\theta F_1
=\partial_I F_0\cdot\partial_\theta V-\partial_\theta F_0\cdot\partial_I V.
$$

各 $I$ で $k\cdot\omega(I)\ne0$ が全ての非零 $k\in\mathbb Z^2$ に対し成り立てば、第一式のFourier係数は

$$
i(k\cdot\omega(I))F_{0,k}(I)=0
$$

です。非共鳴作用が稠密な領域では、連続性から $F_0=f(I)$ が全領域で成り立ちます。この後の式は

$$
\omega\cdot\partial_\theta F_1=\partial_I f\cdot\partial_\theta V.
$$

角度Fourier係数を $V_k(I),F_{1,k}(I)$ と書けば、非零 $k$ ごとに

$$
(k\cdot\omega)F_{1,k}=(k\cdot\nabla f)V_k.
$$

分母が零となる共鳴作用で、この式に有限な $F_{1,k}$ が存在する必要があります。

<a id="prop-cele5-resonance-obstruction"></a>

<!-- formal-statement-start -->
> **命題（共鳴における一次障害）**  
> $K,V,F_\varepsilon$ を上記の実解析的関数とし、$F_\varepsilon$ は $H_\varepsilon$ の時間非依存第一積分であるとする。$F_0=f(I)$ なら、任意の $k\in\mathbb Z^2\setminus\{0\}$ と $I_*\in D$ に対して
>
$$
k\cdot\omega(I_*)=0,\quad V_k(I_*)\ne0
\quad\Longrightarrow\quad
k\cdot\nabla f(I_*)=0
$$
>
> が必要である。
<!-- formal-statement-end -->

### 証明の見取り図

共鳴のときFourier係数を $k\cdot\omega$ で割る操作はできません。割り算する前の方程式で、右辺が必ず零になるという**解が存在するための必要条件**を課します。

<!-- proof-start -->
### 証明

$\{F_\varepsilon,H_\varepsilon\}=0$ の一次係数から得た式

$$
(k\cdot\omega(I))F_{1,k}(I)
=(k\cdot\nabla f(I))V_k(I)
$$

を $I=I_*$ で評価します。左辺は共鳴条件により零です。$V_k(I_*)\ne0$ なので右辺をその値で割れば $k\cdot\nabla f(I_*)=0$ となります。$F_1$ の解析性により係数は $I_*$ で有限で、共鳴点を除外することはできません。
<!-- proof-end -->

**直接計算**。$K=(I_1^2+I_2^2)/2$、$V=\cos(\theta_1-\theta_2)$、$k=(1,-1)$ とすると、共鳴は $I_1=I_2$ です。$V_k=1/2$ だから、そこでは $f_{I_1}-f_{I_2}=0$ が必要です。一つの共鳴だけでは、全領域で $f$ が $K$ の関数になるとはまだ言えません。

## 5. Poincaré型の非可積分性定理を証明する

共鳴が稠密で、その各共鳴を実際に摂動が励起するなら、解が存在するための必要条件を全方向に広げられます。この二つを一つの集合として整理します。

<a id="def-cele5-poincare-set"></a>

<!-- formal-statement-start -->
> **定義（Poincaré共鳴集合）**  
> 二自由度の実解析的近可積分Hamiltonian $K(I)+\varepsilon V(I,\theta)$ に対し
>
$$
\mathcal P=\left\{I\in D:\ 
\text{ある }k\in\mathbb Z^2\setminus\{0\}
\text{ で }k\cdot\nabla K(I)=0,\ V_k(I)\ne0\right\}
$$
>
> をPoincaré共鳴集合とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cele5-poincare-set -->

**定義の確認**。$K=(I_1^2+I_2^2)/2$、$V=\cos(\theta_1-\theta_2)$ のとき、非零Fourier係数は $k=\pm(1,-1)$ のみです。よって $\mathcal P=\{I_1=I_2\}\cap D$ であり、二次元開領域には稠密ではありません。逆に後節の無限Fourierモード模型では、全有理傾斜の共鳴を含みます。

<!-- definition-example-end -->

<a id="thm-cele5-poincare-nonintegrability"></a>

<!-- formal-statement-start -->
> **定理（Poincaré型の解析的非可積分性）**  
> $D\subset\mathbb R^2$ を連結開集合とし、$K:D\to\mathbb R$ と $V:D\times\mathbb T^2\to\mathbb R$ は実解析的、$V$ は角度について $2\pi$ 周期的とする。$D$ 上で $\det D^2K\ne0$ かつ $\nabla K\ne0$ とし、Poincaré共鳴集合 $\mathcal P$ が $D$ で稠密だと仮定する。$H_\varepsilon=K+\varepsilon V$ とすると、$\varepsilon=0$ を含む近傍で $(I,\theta,\varepsilon)$ に共同実解析的な第一積分 $F_\varepsilon$ は、十分小さい $\varepsilon$ で局所的に $H_\varepsilon$ と関数的に従属である。すなわち
>
$$
d_{I,\theta}F_\varepsilon\wedge d_{I,\theta}H_\varepsilon=0
$$
>
> が局所的に成立する。この関数クラスにはHamiltonianと独立な第二の第一積分が存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

非退化Hessianから非共鳴作用が稠密であることを示し、第一積分の零次係数を作用だけの関数にします。次に[共鳴の一次障害](#prop-cele5-resonance-obstruction)と $\mathcal P$ の稠密性を使い、零次係数が $K$ にしか依存できないことを示します。さらに同じ操作を高次係数へ繰り返すと、独立性を示す微分二形式の全Taylor係数が零になります。

<!-- proof-start -->
### 証明

**(1) 零次係数が作用にしか依存しないこと。** $D^2K$ は可逆なので、[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により $\omega=\nabla K$ は局所微分同相です。したがって作用の任意の開近傍の周波数像も開集合になります。

非共鳴周波数が稠密であることを直接確認します。周波数空間の任意の開円盤には、次を同時に満たす点があります。

$$
\omega_2\ne0,\qquad \frac{\omega_1}{\omega_2}\notin\mathbb Q.
$$

非零整数組 $k=(k_1,k_2)$ が $k_1\omega_1+k_2\omega_2=0$ を満たすと仮定します。$k_1=0$ なら $k_2\ne0$ であるため $k_2\omega_2=0$ は $\omega_2\ne0$ に矛盾します。$k_1\ne0$ なら $\omega_1/\omega_2=-k_2/k_1$ が有理数となり、やはり矛盾します。局所微分同相であることから、そのような非共鳴周波数の逆像は任意の作用近傍にあります。各非零Fourierモードに対し

$$
(k\cdot\omega)F_{0,k}=0
$$

なので、非共鳴点では $F_{0,k}=0$。$F_{0,k}$ の連続性により $D$ 全体で零です。ゆえに $F_0=f_0(I)$ です。

**(2) 零次係数は局所的に $K$ の関数。** $I_*\in\mathcal P$ を取り、その定義で選ばれる $k\ne0$ を固定します。一次障害から $k\cdot\nabla f_0(I_*)=0$。一方 $k\cdot\nabla K(I_*)=0$ です。二次元で $\nabla K(I_*)\ne0$ だから、$k$ に直交するベクトル空間は一次元であり、$\nabla f_0(I_*)$ と $\nabla K(I_*)$ は平行です。従って

$$
df_0\wedge dK=0\quad\text{on }\mathcal P.
$$

両辺は連続なので、稠密性から $D$ 全体でも成立します。任意の $I_0$ で $dK\ne0$ だから局所座標 $(u,v)=(K(I),v(I))$ を取れます。$df_0\wedge dK=0$ は $\partial_v f_0=0$ を意味し、局所的に $f_0=\phi_0(K)$ となります。実解析的な $f_0,K$ と局所座標から $\phi_0$ も実解析的です。

**(3) 全次数へ繰り返すこと。** 今固定した局所領域で、$\phi_0(H_\varepsilon)$ は $H_\varepsilon$ の第一積分です。差

$$
G_\varepsilon^{(1)}=F_\varepsilon-\phi_0(H_\varepsilon)
$$

も第一積分であり、$\varepsilon=0$ で零なので $G_\varepsilon^{(1)}=\varepsilon\widetilde F_\varepsilon^{(1)}$ と解析的に書けます。恒等式

$$
0=\{G_\varepsilon^{(1)},H_\varepsilon\}
=\varepsilon\{\widetilde F_\varepsilon^{(1)},H_\varepsilon\}
$$

が全ての $\varepsilon$ で成り立つので、$\widetilde F_\varepsilon^{(1)}$ 自身が第一積分です。(1)(2) をこれに適用すると、その零次係数は $\phi_1(K)$。そこで $\widetilde F_\varepsilon^{(1)}-\phi_1(H_\varepsilon)$ を再び $\varepsilon$ で割れます。帰納法により任意の整数 $N\ge0$ に対して

$$
F_\varepsilon=\sum_{j=0}^N\varepsilon^j\phi_j(H_\varepsilon)
+\varepsilon^{N+1}R_{N,\varepsilon}
$$

という局所表示を得ます。ここで $R_{N,\varepsilon}$ は位相変数と $\varepsilon$ に解析的です。両辺を位相変数について微分し $dH_\varepsilon$ と外積を取ると、$\phi_j(H_\varepsilon)$ の微分は $dH_\varepsilon$ の倍数なので消え、

$$
dF_\varepsilon\wedge dH_\varepsilon
=\varepsilon^{N+1}dR_{N,\varepsilon}\wedge dH_\varepsilon.
$$

任意の $N$ で成り立つため、左辺の $\varepsilon$ に関する全Taylor係数は零です。左辺は $\varepsilon$ に解析的なので恒等的に零となります。$dH_\varepsilon\ne0$ は $\varepsilon=0$ で $dK\ne0$ から十分小さい $\varepsilon$ でも成立し、局所的な関数従属性が従います。
<!-- proof-end -->

この定理が否定するのは、**摂動パラメータ $\varepsilon=0$ まで解析的に延長できる独立第一積分**です。任意の連続第一積分、$\varepsilon=0$ で特異な積分、ある固定値の $\varepsilon$ でだけ定義される積分を、この証明だけで排除したわけではありません。定理を「全ての三体問題に第二積分は絶対に存在しない」と読み替えてはいけません。

## 6. 条件を全て検証できる二自由度模型

$D=(1,2)^2$、$|k|_1=|k_1|+|k_2|$ として、次の解析的Hamiltonianを考えます。

$$
H_\varepsilon=\frac12(I_1^2+I_2^2)
+\varepsilon\sum_{k\in\mathbb Z^2\setminus\{0\}}
e^{-2|k|_1}\cos(k\cdot\theta).
$$

和は $k$ と $-k$ をともに含みますが、各非零 $k$ のFourier係数は正の $e^{-2|k|_1}$ です。この級数は角度の虚部が $|\operatorname{Im}\theta_j|<2$ の範囲でも絶対収束し、実解析的です。作用領域で $\nabla K=(I_1,I_2)\ne0$、$D^2K$ は単位行列です。

$k=(q,-p)$、$p,q$ は正整数とすると共鳴条件は

$$
qI_1-pI_2=0
\quad\Longleftrightarrow\quad
\frac{I_2}{I_1}=\frac qp.
$$

有理数は稠密なので、$D$ 内の任意の小円盤はこうした共鳴直線と交わります。しかも対応するFourier係数は零でないため、$\mathcal P$ は稠密です。[Poincaré型の解析的非可積分性](#thm-cele5-poincare-nonintegrability)の全仮定が満たされ、共同解析的な独立第一積分はありません。

**比較のための反例**。同じ $K$ でも $V=\cos(\theta_1-\theta_2)$ だけなら $J=I_1+I_2$ は保存されます。実際、

$$
\dot J=-\partial_{\theta_1}H_\varepsilon
-\partial_{\theta_2}H_\varepsilon
=\varepsilon\sin(\theta_1-\theta_2)-\varepsilon\sin(\theta_1-\theta_2)=0.
$$

$J$ と $H_\varepsilon$ の微分は一般点で独立です。失われた仮定は**稠密な共鳴集合**であり、一つの共鳴モードの解が存在するための必要条件だけでは非可積分性は導けません。

## 7. Kepler極限にそのまま適用してはいけない理由

[束縛Kepler系の作用公式](../CELE1/index.md#prop-cele1-kepler-actions)では、正の角運動量を持つ非円楕円軌道で動径作用 $I_r$ と角運動量 $G$ を用いると、$L=I_r+G$ によってKeplerのエネルギーは $-1/(2L^2)$ です。局所的なDelaunay作用 $(L,G)$ を選び、共役角を用いると、回転座標系では角運動量 $G$ に角速度 $1$ を掛けた分を引きます。

<a id="prop-cele5-kepler-degeneracy"></a>

<!-- formal-statement-start -->
> **命題（回転Kepler極限のHessian退化）**  
> 単位重力係数の平面Kepler系の正の角運動量を持つ非円楕円軌道の作用領域 $L>G>0$ では、角速度 $1$ の共回転座標での非摂動Hamiltonianは
>
$$
K_0(L,G)=-\frac1{2L^2}-G
$$
>
> であり、その作用Hessianの行列式は恒等的に零である。従って本章の[Poincaré型の解析的非可積分性](#thm-cele5-poincare-nonintegrability)の非退化Hessian仮定は満たされない。
<!-- formal-statement-end -->

### 証明の見取り図

Keplerエネルギーは二つの作用に独立には依存せず、その和 $L$ だけに依存します。回転座標への変換は角運動量に線形な項を引くため、Hessianの退化を解消しません。

<!-- proof-start -->
### 証明

[束縛Kepler軌道の作用と振動数](../CELE1/index.md#prop-cele1-kepler-actions)より $I_r=L-G$ で、Keplerエネルギーは $E=-1/(2L^2)$ です。回転座標では、[回転系Hamiltonian](../CELE4/index.md#prop-cele4-rotating-equations)に含まれる角運動量の項が $-G$ なので $K_0=E-G$ です。偏微分を順に取ると

$$
\partial_L K_0=L^{-3},\qquad
\partial_G K_0=-1,
$$

$$
D^2K_0=
\begin{pmatrix}
-3L^{-4}&0\\
0&0
\end{pmatrix},
\qquad \det D^2K_0=0.
$$

従って必要な非退化性が成立せず、この定理を直接適用できません。
<!-- proof-end -->

それでも一次障害の計算は有用です。$k=(p,q)$ に対し、回転Kepler極限での共鳴は $pL^{-3}-q=0$ となります。まず天体の摂動関数 $R$ を楕円軌道に代入し、対応するFourier係数を求め、**その係数が零でないこと、解析性の領域、退化したKepler系に使える別の定理の仮定**を確かめる必要があります。

ここで示したのは「非可積分性の標準的な障害機構」と「実際の円制限三体問題へ適用する際の未解決条件」の境界です。[Jacobi積分](../CELE4/index.md#prop-cele4-jacobi-integral)しか見つからないこと、断面図が複雑であること、それだけから厳密な不存在定理を結論しない点が重要です。

## 8. 演習と詳細解答

### Level A

<a id="ex-cele5-a01"></a>
**A1. 摂動関数の値。** $q=(0,2)$ で一次摂動関数 $R$ を求め、二つの距離が零でないことも確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $|q|=2$、$|q-e_1|=\sqrt{(-1)^2+2^2}=\sqrt5$、$x=0$ です。[一次摂動関数](#def-cele5-disturbing-function)に代入すると

$$
R(0,2)=\frac12+\frac0{2^3}-\frac1{\sqrt5}
=\frac12-\frac1{\sqrt5}.
$$

両距離は正であるため非衝突領域です。
<!-- solution-end -->

<a id="ex-cele5-a02"></a>
**A2. 断面の二周期点。** $H_0=(I_1^2+I_2^2)/2$ で $I_1/I_2=5/2$ とする。$\theta_2=0$ 断面の帰還ごとの $\theta_1$ 増分と最小周期を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** [帰還写像の定義](../../../幾何系/INT/INT7/index.md#def-int7-return)に従い、一回の帰還は $\theta_2$ が $2\pi$ 増える時間 $T=2\pi/I_2$ で起こります。この間の第一角の増分は

$$
\Delta\theta_1=I_1T=2\pi\frac{I_1}{I_2}
=5\pi\equiv\pi\pmod{2\pi}.
$$

一回では戻らず、二回での角度増分は $10\pi\equiv0\pmod{2\pi}$ なので、最小周期は二回です。
<!-- solution-end -->

<a id="ex-cele5-a03"></a>
**A3. 一次障害の符号。** $K=(I_1^2+I_2^2)/2$、$V=\cos(\theta_1-\theta_2)$、$f(I)=I_1$ とする。$I_1=I_2$ 上で共鳴条件と解が存在するための必要条件を検査せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $k=(1,-1)$ で $\omega=(I_1,I_2)$ とすれば、共鳴条件は

$$
k\cdot\omega=I_1-I_2=0
$$

です。他方、$V_k=1/2$、$\nabla f=(1,0)$ なので

$$
(k\cdot\nabla f)V_k
=(1,-1)\cdot(1,0)\,\frac12
=\frac12\ne0.
$$

これは[一次障害](#prop-cele5-resonance-obstruction)の必要条件に反するため、$F_0=I_1$ をパラメータに共同解析的な第一積分として延長することはできません。
<!-- solution-end -->

<a id="ex-cele5-a04"></a>
**A4. 有限モードでは何が残るか。** $H_\varepsilon=\tfrac12(I_1^2+I_2^2)+\varepsilon\cos(\theta_1-\theta_2)$ について $I_1+I_2$ の保存をHamilton方程式から証明せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** Hamilton方程式 $\dot I_j=-\partial_{\theta_j}H_\varepsilon$ を各角度について計算すると

$$
\dot I_1=\varepsilon\sin(\theta_1-\theta_2),
\qquad
\dot I_2=-\varepsilon\sin(\theta_1-\theta_2).
$$

よって

$$
\frac{d}{dt}(I_1+I_2)
=\dot I_1+\dot I_2=0.
$$

従って $I_1+I_2$ は保存量であり、共鳴が一つあるだけで非可積分性は結論できません。
<!-- solution-end -->

<a id="ex-cele5-a05"></a>
**A5. Kepler作用の退化。** $K_0=-1/(2L^2)-G$、$L>G>0$ の振動数ベクトルとHessianを求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 各作用で偏微分すると、振動数は

$$
\omega=\nabla K_0
=\left(\partial_L(-L^{-2}/2),\partial_G(-G)\right)
=(L^{-3},-1).
$$

さらに

$$
\partial_{LL}K_0=-3L^{-4},\qquad
\partial_{LG}K_0=\partial_{GG}K_0=0,
$$

$$
D^2K_0=
\begin{pmatrix}-3L^{-4}&0\\0&0\end{pmatrix},
\qquad \det D^2K_0=0.
$$

これで[回転Kepler極限](#prop-cele5-kepler-degeneracy)のHessian退化を確認できました。
<!-- solution-end -->

### Level B

<a id="ex-cele5-b01"></a>
**B1. 共鳴の解が存在するための必要条件を導く。** $H_\varepsilon=K+\varepsilon V$、$F_\varepsilon=f(I)+\varepsilon F_1+O(\varepsilon^2)$ とする。Poisson括弧の一次係数から $(k\cdot\omega)F_{1,k}=(k\cdot\nabla f)V_k$ を導け。

- Level: B

<!-- solution-start -->
**詳細解答。** 正準括弧を使うと

$$
0=\{F_\varepsilon,H_\varepsilon\}
=\{f,K\}+\varepsilon(\{f,V\}+\{F_1,K\})+O(\varepsilon^2).
$$

$f,K$ はともに作用だけの関数なので $\{f,K\}=0$。一次項で $\{f,V\}=-\nabla f\cdot\partial_\theta V$、$\{F_1,K\}=\omega\cdot\partial_\theta F_1$ だから

$$
\omega\cdot\partial_\theta F_1
=\nabla f\cdot\partial_\theta V.
$$

Fourier指数 $e^{ik\cdot\theta}$ の微分は $ik e^{ik\cdot\theta}$。係数を比較して $i(k\cdot\omega)F_{1,k}=i(k\cdot\nabla f)V_k$、両辺の $i$ を消して求める式を得ます。
<!-- solution-end -->

<a id="ex-cele5-b02"></a>
**B2. 共鳴稠密性を確かめる。** $D=(1,2)^2$、$K=(I_1^2+I_2^2)/2$ とし、全非零整数ベクトルのFourier係数が非零であるとする。任意の $I_*\in D$ の任意の近傍に共鳴作用があると説明せよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $I_*=(a,b)\in D$ として、正の有理数の列 $q_n/p_n\to b/a$ を取ります。共鳴直線上の作用を

$$
I^{(n)}=\left(a,\frac{q_n}{p_n}a\right)
\longrightarrow(a,b)=I_*
$$

と選べば、$D$ は開集合なので十分大きい $n$ で $I^{(n)}\in D$ です。$k_n=(q_n,-p_n)$ とおくと

$$
k_n\cdot\omega(I^{(n)})
=q_na-p_n\frac{q_n}{p_n}a=0.
$$

仮定より $V_{k_n}(I^{(n)})\ne0$ なので $I^{(n)}\in\mathcal P$。従って $I_*$ のどの近傍も $\mathcal P$ と交わります。
<!-- solution-end -->

<a id="ex-cele5-b03"></a>
**B3. 微分の平行性から従属性へ。** $I_1,I_2>0$ の領域で $K=(I_1^2+I_2^2)/2$、$f\in C^1$ が $I_2 f_{I_1}-I_1 f_{I_2}=0$ を満たすとする。局所的に $f=\phi(K)$ と書けることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** $I_1=r\cos\alpha,I_2=r\sin\alpha$ と置くと $r>0$ で局所座標が取れます。連鎖律から

$$
\partial_\alpha f
=-I_2 f_{I_1}+I_1 f_{I_2}=0.
$$

よって各小座標領域で $f$ は $r$ のみの関数 $\psi(r)$ です。$K=r^2/2$ かつ $r>0$ なので、$r=\sqrt{2K}$ と解けます。従って $\phi(u)=\psi(\sqrt{2u})$ と置けば $f=\phi(K)$ です。
<!-- solution-end -->

<a id="ex-cele5-b04"></a>
**B4. 円制限三体問題に必要な追加検証。** 回転Kepler極限で $(L,G)=(1,1/2)$ とする。$k=(1,1)$ の共鳴を検査し、なぜこの事実だけで非可積分性定理を適用できないか、二つの別々の理由を挙げよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $L=1$ での振動数は $\omega=(L^{-3},-1)=(1,-1)$。従って

$$
k\cdot\omega=(1,1)\cdot(1,-1)=0.
$$

ただし、第一に

$$
D^2K_0=\operatorname{diag}(-3,0),\qquad \det D^2K_0=0
$$

なので、[Poincaré型の解析的非可積分性](#thm-cele5-poincare-nonintegrability)のHessian非退化仮定が失われます。第二に実際の[摂動関数](#def-cele5-disturbing-function)の $k=(1,1)$ Fourier係数がこの軌道で非零かどうかも未計算です。共鳴条件は一次障害式の左辺が零であることを示すだけで、右辺が非零だとはまだ言えません。
<!-- solution-end -->

### Level C

<a id="ex-cele5-c01"></a>
**C1. 摂動から非可積分性、天体力学への境界。** $D=(1,2)^2$ とし

$$
H_\varepsilon=\frac12(I_1^2+I_2^2)
+\varepsilon\sum_{k\in\mathbb Z^2\setminus\{0\}}e^{-2|k|_1}\cos(k\cdot\theta)
$$

を考える。次を示せ。

1. 零摂動時の $\theta_2=0$ への帰還写像を求める。
2. 一次障害式を導く。
3. Poincaré型定理の仮定をこの系で検査し、どの第一積分を否定できるか明記する。
4. 同じ証明を円制限三体問題に機械的に移せない理由を説明する。

- Level: C

<!-- solution-start -->
**詳細解答。** **（1）** $\varepsilon=0$ では $\dot I=0$、$\dot\theta=(I_1,I_2)$。$I_2>1$ なので $\theta_2=0$ 断面は横断的です。帰還時間 $2\pi/I_2$ に $\theta_1$ が $2\pi I_1/I_2$ 増えるので

$$
P_0(I_1,I_2,\theta_1)
=(I_1,I_2,\theta_1+2\pi I_1/I_2\pmod{2\pi}).
$$

**（2）** 第一積分を $F_\varepsilon=f(I)+\varepsilon F_1+\cdots$ と仮定すると、Poisson括弧の一次係数は

$$
\omega\cdot\partial_\theta F_1
=\nabla f\cdot\partial_\theta V.
$$

$k$ のFourier係数比較により $(k\cdot\omega)F_{1,k}=(k\cdot\nabla f)V_k$。共鳴点では $V_k\ne0$ なら $k\cdot\nabla f=0$ が必要です。

**（3）** $D$ は連結開集合で、$K,V$ は実解析的です。$K$ のHessianは単位行列であり、振動数ベクトルは $D$ 上で零になりません。

$$
\omega=(I_1,I_2)\ne0,\qquad D^2K=\begin{pmatrix}1&0\\0&1\end{pmatrix}.
$$

摂動の係数は全ての非零整数ベクトル $k$ で正です。$k=(q,-p)$ とおくと、共鳴する作用は次の直線上にあります。

$$
V_k=e^{-2|k|_1}>0,\qquad \frac{I_2}{I_1}=\frac qp.
$$

有理数の稠密性により、$\mathcal P$ は $D$ に稠密です。[Poincaré型の解析的非可積分性](#thm-cele5-poincare-nonintegrability)の全仮定を満たすので、$\varepsilon=0$ を含む近傍で共同実解析的な、Hamiltonianに関数的に独立な第二第一積分は存在しません。ただし $C^\infty$ の全ての積分を否定したわけではありません。

**（4）** 円制限三体の零質量比極限では $K_0(L,G)=-1/(2L^2)-G$ なのでHessian行列式は零です。また[実際の一次摂動関数](#def-cele5-disturbing-function)の共鳴Fourier係数の非零性も個別に調べる必要があります。従って（1）〜（3）の模型の結論を円制限三体問題の完全な非可積分性証明と同一視できません。
<!-- solution-end -->

## 9. 次章への問い

第一積分が存在するかという問いと、軌道が実際にどこを行き来するかという問いは異なります。共鳴の障害条件は前者を解析的に制約します。後者では、不安定な周期軌道の安定・不安定集合が再び交差するとき何が起こるのか、という位相幾何が主役です。CELE6ではホモクリニック構造とHamiltonian chaosへ進みます。
