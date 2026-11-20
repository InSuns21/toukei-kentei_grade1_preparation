# SYZ1-15 正則円板と壁越えの発生条件

<!-- definition-example-audit: strict -->

## 1. モノドロミーだけでは円板の情報は分からない

[前講の節点モノドロミー](../SYZ1-14/index.md#thm-syz1-14-picard-lefschetz)は、特異値を一周したとき閉曲線が整数行列でどう変わるかを測った。これに対して、鏡像の補正に関係するのは、**滑らかなLagrangeトーラスを境界とする正則円板**の振る舞いである。前者は束の位相的輸送、後者は複素構造・シンプレクティック面積・境界条件を同時に使う問題であり、一方から他方の個数は決まらない。

まず円板の「相対類」「面積」「境界ホロノミー」「Maslov指数」を分けて定義する。その後、次の二つの模型を計算する。

1. $\mathbb C^2$ の積トーラスではMaslov指数0の**形式的な差の類**を作れても、それを正則円板が代表するとは限らない。
2. $\mathbb C^2\setminus\{xy=1\}$ の具体的なLagrangeトーラス族では、Maslov指数0の正則円板が存在する基底の壁を、複素関数の最大値原理で**正確に求められる**。

第2の模型は反標準因子を除いた局所的なlog Calabi–Yau型の模型であり、コンパクトなCalabi–Yau多様体すべてに同じ壁があるという主張ではない。

## 2. 円板の類・面積・ホロノミー

$(X,\omega,J)$ をKähler曲面、$L\subset X$ を滑らかなコンパクトLagrangeトーラスとする。[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)では、実次元が全空間の半分で、接空間へのシンプレクティック形式の制限が零であることを要求する。ここで $J$ は複素構造、$\omega$ は閉じた正の $(1,1)$ 形式で、$\omega|_L=0$ である。[滑らかなLagrangeファイバーの意味](../SYZ1-07/index.md#def-syz1-07-regular-fibration)に沿って、今は**一つの**ファイバー $L$ を固定する。

閉単位円板を $\overline{\mathbb D}=\{|\zeta|\leq1\}$ と書く。$u:\overline{\mathbb D}\to X$ が境界を $L$ に送り、内部で複素正則なとき、$u$ は $L$ を境界とする **$J$ 正則円板**である。全空間への写像として連続で、必要な微分を行えるほど境界まで滑らかと仮定する。$\partial\mathbb D$ の向きは $\zeta=e^{i\theta}$ の $\theta$ 増加方向である。

<a id="def-syz1-15-relative-disk"></a>

<!-- formal-statement-start -->
> **定義（正則円板・相対類・面積）**  
> 上の条件を満たす写像 $u$ の相対ホモロジー類を $\beta=[u]\in H_2(X,L;\mathbb Z)$、その境界の類を $\partial\beta\in H_1(L;\mathbb Z)$ とする。面積を
>
$$
A_\omega(\beta)=\int_{\mathbb D}u^*\omega
$$
>
> で定める。$u$ が非定数で正則なら $A_\omega(\beta)>0$ である。相対類 $\beta$ が存在することと、その類を正則円板が代表することは別の条件である。
<!-- formal-statement-end -->

<a id="prop-syz1-15-energy-boundary"></a>

<!-- formal-statement-start -->
> **命題（面積と境界の加法性）**  
> $\omega$ が閉形式で $\omega|_L=0$ なら、$A_\omega$ は相対ホモロジー類にのみ依存する。相対類 $\beta,\gamma$ について
>
$$
A_\omega(\beta+\gamma)=A_\omega(\beta)+A_\omega(\gamma),
\qquad
\partial(\beta+\gamma)=\partial\beta+\partial\gamma.
$$
<!-- formal-statement-end -->

### 証明の見取り図

同じ相対類の二つの代表の差は、全空間内の3鎖の境界と $L$ 上の2鎖の和になる。閉形式のStokesの定理と $\omega|_L=0$ が、両者からの積分を消す。境界作用素は鎖の和について線形である。

<!-- proof-start -->
### 証明

相対2サイクル $c,c'$ が同じ類を表すとする。同じ相対類を表すという条件から $c-c'=\partial C+\ell$ と書ける。ここで $C$ は $X$ の3鎖、$\ell$ は $L$ に含まれる2鎖である。従って[Stokesの定理](../../VC/VC5/index.md#thm-vc5-stokes)から

$$
\int_c\omega-\int_{c'}\omega
=\int_{\partial C}\omega+\int_\ell\omega
=\int_Cd\omega+\int_\ell\omega=0.
$$

さらに $\int_{\beta+\gamma}\omega=\int_\beta\omega+\int_\gamma\omega$ は鎖の線形性で、$\partial(\beta+\gamma)=\partial\beta+\partial\gamma$ は相対ホモロジーの境界準同型の線形性で従う。非定数正則円板の面積正値性は、局所正則座標で $u^*\omega$ が $|du|^2$ に比例する非負の面積密度で、非定数ならある開集合で正となることから従う。
<!-- proof-end -->

次に $L$ 上の平坦な階数1ユニタリ局所系を考える。平坦性により閉曲線に沿った平行移動はそのホモロジー類のみで決まり、単位複素数を返す群準同型

$$
\rho:H_1(L;\mathbb Z)\longrightarrow U(1)
$$

となる。[双対トーラスのホロノミー文字](../SYZ1-10/index.md#prop-syz1-10-holonomy-dual)で用いたのと同じ対象である。

<a id="def-syz1-15-disk-weight"></a>

<!-- formal-statement-start -->
> **定義（境界ホロノミーと円板の重み）**  
> 相対類 $\beta$ の境界ホロノミーを $\operatorname{Hol}_\rho(\partial\beta)=\rho(\partial\beta)$ とする。面積の指数を区別するため、形式変数 $T$ を用いて
>
$$
z_\beta=T^{A_\omega(\beta)}\rho(\partial\beta)
$$
>
> と書く。あるいは正の実数 $\hbar$ と単位を固定した数値模型では $T^A=e^{-A/\hbar}$ と評価する。$z_\beta$ は円板の**重み**であって、円板の**計数値**ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-15-relative-disk -->
### 直接例：積トーラスの座標円板

$\mathbb C^2$ に

$$
\omega_0=\frac{i}{2}(dx\wedge d\bar x+dy\wedge d\bar y),
\qquad
L_{R,S}=\{|x|=R,\ |y|=S\},\quad R,S>0
$$

を置く。$L_{R,S}$ の接空間は二つの角度方向で張られ、各 $dx\wedge d\bar x$、$dy\wedge d\bar y$ はこの2次元接空間上で零になるのでLagrangeである。座標円板

$$
u_x(\zeta)=(R\zeta,S),
\qquad
u_y(\zeta)=(R,S\zeta)
$$

はどちらも正則で境界を $L_{R,S}$ に送る。境界類を $a=[(Re^{i\theta},S)]$、$b=[(R,Se^{i\theta})]$ とすると

$$
\partial[u_x]=a,\quad\partial[u_y]=b,
\qquad
A([u_x])=\pi R^2,\quad A([u_y])=\pi S^2.
$$

面積は $\omega_0=dx_{\mathrm{Re}}\wedge dx_{\mathrm{Im}}+dy_{\mathrm{Re}}\wedge dy_{\mathrm{Im}}$ を各円板へ引き戻すと半径 $R$ または $S$ の平面円板の通常の面積になる。

**定義の確認**：二つの写像は円板上で正則、境界はLagrangeトーラス上にあり、相対境界類と正のシンプレクティック面積を直接算出した。
<!-- definition-example-end -->

<!-- definition-example-start: def-syz1-15-disk-weight -->

$\rho(a)=h_a$、$\rho(b)=h_b$ とすると重みは $T^{\pi R^2}h_a$、$T^{\pi S^2}h_b$ である。

**定義の確認**：$\rho$ は $H_1(L_{R,S};\mathbb Z)$ の二つの生成元 $a,b$ に単位複素数を対応させる文字である。面積の指数と境界ホロノミーの積として二つの円板重みを計算し、円板の存在と符号付き計数を区別した。
<!-- definition-example-end -->

## 3. Maslov指数は「円板の数」ではない

円板境界上では $L$ の接平面が一周する。$\mathbb C^2$ では各接平面の実基底 $v_1,v_2$ の複素行列式を規格化した位相 $\det_{\mathbb C}(v_1,v_2)/|\det_{\mathbb C}(v_1,v_2)|$ を取り、その**二乗**の一周の巻き数を考える。基底の向きを反転しても二乗は変わらない。一般のKähler曲面では $u^*TX$ を円板上で複素自明化して同じ操作を行う。

<a id="def-syz1-15-maslov"></a>

<!-- formal-statement-start -->
> **定義（円板のMaslov指数）**  
> $u:(\mathbb D,\partial\mathbb D)\to(X,L)$ に対し、$u^*TX$ の複素自明化を一つ選び、境界のLagrange接平面の実基底 $v_1(\theta),v_2(\theta)$ の位相の二乗
>
$$
m(\theta)=
\left(
\frac{\det_{\mathbb C}(v_1(\theta),v_2(\theta))}
{|\det_{\mathbb C}(v_1(\theta),v_2(\theta))|}
\right)^2\in U(1)
$$
>
> の巻き数を $\mu([u])\in\mathbb Z$ とする。円板上に延びる自明化の変更は境界上で零巻き数を持つので、定義は自明化に依存しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-15-maslov -->
### 直接例：積トーラスでは各座標円板が指数2

先ほどの $L_{R,S}$ で、$x=Re^{i\theta_1}$、$y=Se^{i\theta_2}$ と角度座標を取る。境界の接平面は $\theta_1,\theta_2$ をそれぞれ動かした実接ベクトルで張られ、その複素行列式を標準自明化の中で計算すると

$$
v_1=\partial_{\theta_1}(x,y)=(ix,0),\qquad v_2=\partial_{\theta_2}(x,y)=(0,iy),
\qquad
\det_{\mathbb C}(v_1,v_2)=-xy.
$$

$u_x$ の境界では $x=Re^{i\theta}$、$y=S$ だから行列式の位相は $-e^{i\theta}$。その二乗は $e^{2i\theta}$ で二回巻く。$u_y$ でも同様に $e^{2i\theta}$ となる。したがって

$$
\mu([u_x])=\mu([u_y])=2.
$$

二乗位相の巻き数は境界ループの連結で和となるため、$\mu(m[u_x]+n[u_y])=2(m+n)$。これは一般の整数 $m,n$ についての**位相的計算**であり、負の係数を持つ類まで正則円板で代表されるという意味ではない。

**定義の確認**：境界に沿う実接基底を複素自明化の中で評価し、行列式の位相の二乗が二回巻くことから、円板のMaslov指数を定義どおりに確定した。
<!-- definition-example-end -->

<a id="prop-syz1-15-formal-class-not-disk"></a>

<!-- formal-statement-start -->
> **命題（指数0・面積0は存在条件ではない）**  
> 積トーラス $L_{R,S}\subset\mathbb C^2$ に対して $\beta=[u_x]-[u_y]$ は
>
$$
\mu(\beta)=0,\qquad
A_\omega(\beta)=\pi(R^2-S^2),\qquad
\partial\beta=a-b
$$
>
> を満たす。しかし $\beta$ を代表する正則円板は存在しない。特に $R=S$ で面積が0となっても、正則円板の壁が現れたことにはならない。
<!-- formal-statement-end -->

### 証明の見取り図

正則写像の第二座標 $y(\zeta)$ は円板全体で正則で、境界上では零にならない。[偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)により、その境界巻き数は内部の零点の個数なので負にはならない。一方、$\partial\beta=a-b$ は第二座標の巻き数が $-1$ である。ここに矛盾がある。

<!-- proof-start -->
### 証明

$\mu$ と $A$ は前節の座標円板の値を相対類の差へ適用して求まる。仮に正則円板 $u=(x(\zeta),y(\zeta))$ が $\beta$ を代表するとする。境界では $|y(\zeta)|=S>0$ なので[偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)により

$$
\operatorname{wind}(y|_{\partial\mathbb D},0)
=\sum_{\zeta\in\mathbb D:\,y(\zeta)=0}
\operatorname{ord}_\zeta(y)\ \geq\ 0.
$$

ところが境界類 $a-b$ の第二座標への射影は巻き数 $-1$。従って矛盾する。$R=S$ のときは別途、非定数正則円板の正の面積と $A(\beta)=0$ からも不可能性が従う。面積等式という必要な数値条件だけでは正則写像は構成できない。
<!-- proof-end -->

## 4. 正則円板が本当に現れる局所模型

ここからは具体的に壁を検出する。$X=\mathbb C^2\setminus D$、$D=\{xy=1\}$ とし、標準の $\omega_0$ と複素構造を使う。$D$ を除いたのは、関数 $xy-1$ と対数型体積形式

$$
\Omega=\frac{dx\wedge dy}{xy-1}
$$

を $X$ 上で零でない正則2形式として扱うためである。$\Omega$ のノルムは標準平坦計量に対して一定ではなく、**この模型をコンパクトCalabi–YauのRicci平坦SLag束と同一視しない**。

$w=xy$、$\lambda=(|x|^2-|y|^2)/2$ と置き、$\gamma_r=\{w\in\mathbb C:|w-1|=r\}$、$r>0$ とする。$\gamma_r$ は常に $w=1$ を避ける。円周作用を

$$
(x,y)\longmapsto(e^{is}x,e^{-is}y),\qquad s\in\mathbb R/2\pi\mathbb Z
$$

とする。ここで $s$ は作用の角度で、円板境界の $\theta$ とは独立である。生成ベクトル場は $V=(ix,-iy)$ である。[Hamiltonベクトル場の符号規約](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)を $\iota_{X_H}\omega_0=dH$ とすると、この作用のHamilton関数は **$H=-\lambda$** である（$\iota_V\omega_0=-d\lambda$）。$w=xy$ はこの作用で不変である。

<a id="def-syz1-15-local-fibration"></a>

<!-- formal-statement-start -->
> **定義（対数型円板模型のトーラス）**  
> $r>0$、$\lambda\in\mathbb R$ に対し
>
$$
L_{r,\lambda}
=\left\{(x,y)\in\mathbb C^2:
|xy-1|=r,\quad
\frac{|x|^2-|y|^2}{2}=\lambda\right\}
$$
>
> とする。$(r,\lambda)\ne(1,0)$ のときこれを正則なファイバーとして扱い、$(1,0)$ は特異値として除く。基底は
>
$$
B_0=\{(r,\lambda):r>0\}\setminus\{(1,0)\}.
$$
<!-- formal-statement-end -->

<a id="prop-syz1-15-local-lagrangian"></a>

<!-- formal-statement-start -->
> **命題（局所模型は滑らかなLagrangeトーラス束を与える）**  
> 任意の $(r,\lambda)\in B_0$ に対して、$L_{r,\lambda}$ はコンパクトで滑らかな2次元トーラスである。Lagrange条件は

$$
\omega_0|_{L_{r,\lambda}}=0
$$

> である。さらに、$\Omega$ を接ベクトルの適切な向き付き基底で評価した位相は一定である。
<!-- formal-statement-end -->

### 証明の見取り図

$w$ を $\gamma_r$ 上で一周させ、各 $w$ に対して $|x|^2-|y|^2=2\lambda$ を解く。$w\ne0$ なら $xy=w$ の解の位相は一つの円周である。$w=0$ にも $\lambda\ne0$ なら同じ円周が滑らかに残る。二つの保存量に対応するHamiltonベクトル場のシンプレクティック積が零なので、ファイバーはLagrangeである。

<!-- proof-start -->
### 証明

$w\ne0$ とし $a=|x|^2$、$b=|y|^2$ とすると $a-b=2\lambda$、$ab=|w|^2$ である。従って

$$
a=\lambda+\sqrt{\lambda^2+|w|^2}>0,
\qquad
b=-\lambda+\sqrt{\lambda^2+|w|^2}>0.
$$

$w\ne0$ の点では $x$ の偏角を自由に動かせる。$y=w/x$ だから、この自由度が円周になる。$w=0$ の点を含む場合も、$\lambda>0$ なら $y=0$ で $|x|^2=2\lambda$、$\lambda<0$ なら $x=0$ で $|y|^2=-2\lambda$ となり、円周が残る。

$\gamma_r$ が $w=0$ を通るのは $r=1$ のときだけである。その場合も $\lambda\ne0$ なら原点を避けられる。したがって、正則基底 $B_0$ 上では

$$
w:L_{r,\lambda}\longrightarrow\gamma_r
$$

は滑らかな円周束である。

この円周束の自明性を明示的な断面で示す。$\lambda>0$ の場合、$x$ を正の実数として選び、

$$
x=\sqrt{\lambda+\sqrt{\lambda^2+|w|^2}},
\qquad y=\frac{w}{x}
$$

と置く。$\lambda<0$ の場合は $y$ を正の実数として選び、

$$
y=\sqrt{-\lambda+\sqrt{\lambda^2+|w|^2}},
\qquad x=\frac{w}{y}
$$

とする。どちらも $w=0$ で滑らかである。$\lambda=0$ の正則ファイバーでは $r\ne1$ なので $w\ne0$ であり、$x=\sqrt{|w|}>0$、$y=w/x$ が使える。

以上の選択は $w\in\gamma_r$ に関する大域的な滑らかな断面である。この断面へ自由な円周作用を施すと、

$$
L_{r,\lambda}\cong\gamma_r\times S^1\cong T^2
$$

という積表示が得られる。$\gamma_r$ はコンパクトで、上の半径公式から $|x|,|y|$ も有界なので、ファイバーはコンパクトである。

次に、定義の条件 $\omega_0|_{L_{r,\lambda}}=0$ を座標から確かめる。$x=x_1+ix_2$、$y=y_1+iy_2$ と書くと $\omega_0=dx_1\wedge dx_2+dy_1\wedge dy_2$ である。任意の実接ベクトル $Z$ について、$V=(ix,-iy)$ の実成分を代入すると

$$
\begin{aligned}
\omega_0(V,Z)
&=-x_2 Z(x_2)-x_1 Z(x_1)+y_2 Z(y_2)+y_1 Z(y_1)\\
&=-\frac12 Z(|x|^2-|y|^2)=-d\lambda(Z).
\end{aligned}
$$

$V$ は $dw(V)=0$ かつ $d\lambda(V)=0$ を満たすファイバー接ベクトルである。もう一つの接ベクトル $W$ を $dw(W)=i(w-1)$ となるように取る。$r>0$ より $dw(W)\ne0$ なので、$V$ と $W$ は一次独立である。

$W$ も $\lambda$ の準位集合に接するから、$\omega_0(V,W)=-d\lambda(W)=0$。接空間は実2次元でこの二つに張られる。また2形式の交代性から $\omega_0(V,V)=\omega_0(W,W)=0$ も成り立つ。以上が[先に確認したLagrange条件](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)の直接検算である。

この計算で得た $\iota_V\omega_0=-d\lambda$ という符号は、前述のHamilton関数 $H=-\lambda$ と一致する。

位相を直接確認する。円周方向のベクトルを $V=(ix,-iy)$、$w$ の周回方向の接ベクトルを $W$ として $dw(W)=i(w-1)$ と取れる。$V$ と $W$ は正則ファイバー上で一次独立であり、

$$
\det_{\mathbb C}(V,W)
=i(xW_y+yW_x)=i\,dw(W)=-(w-1).
$$

したがって

$$
\Omega(V,W)=\frac{\det_{\mathbb C}(V,W)}{w-1}=-1.
$$

これはどの点でも実負であり、$\Omega$ の位相は $\pi$ に一定である。$\Omega$ のノルムの定数性はこの計算には用いていない。
<!-- proof-end -->

<!-- definition-example-start: def-syz1-15-local-fibration -->
### 直接例：$r=1,\lambda=1/2$ の滑らかなトーラス

$w=0$ となる点では $y=0$、$|x|=1$ である。例えば $(x,y)=(e^{i\theta},0)$ は

$$
|xy-1|=1,\qquad \frac{|x|^2-|y|^2}{2}=\frac12
$$

を満たす。$V=(ix,0)$ と、$dw(W)=-i$ を満たす $W=(0,-i/x)$ は互いに一次独立で、行列式は1である。従って $w=0$ を通っても正則な2次元接空間が残る。**定義の確認**：この点では $r>0$、$(r,\lambda)\in B_0$、指定の二つの準位条件、非特異な円周軌道が成立する。さらに $\omega_0(V,W)=0$ と $\Omega(V,W)=-1$ を直接計算でき、Lagrange条件と位相一定を確認できる。
<!-- definition-example-end -->

## 5. 壁の全体を最大値原理から求める

候補の円板 $u=(x(\zeta),y(\zeta))$ を調べる際、$f(\zeta)=x(\zeta)y(\zeta)-1$ が決定的な補助関数となる。$u$ が $X$ に値を取るので $f$ は円板上で**零にならない**。境界では $|f|=r$ が一定である。正則関数の絶対値に対する最大値原理を $f$ と $1/f$ の両方に使えば、$f$ は定数である。

<a id="thm-syz1-15-wall-location"></a>

<!-- formal-statement-start -->
> **定理（Maslov指数0の正則円板が現れる壁の位置）**  
> 上の $X$ と $L_{r,\lambda}$ を考える。非定数正則円板 $u:(\mathbb D,\partial\mathbb D)\to(X,L_{r,\lambda})$ が存在するための必要十分条件は
>
$$
r=1,\qquad \lambda\ne0
$$
>
> である。このとき全ての非定数正則円板は $xy=0$ 上にあり、Maslov指数は0である。$\lambda>0$ では基本円板
>
$$
u_+(\zeta)=(\sqrt{2\lambda}\,\zeta,0)
$$
>
> が、$\lambda<0$ では基本円板
>
$$
u_-(\zeta)=(0,\sqrt{-2\lambda}\,\zeta)
$$
>
> が存在する。よって正則な基底 $B_0$ 内の円板の存在壁は $\{r=1,\lambda>0\}$ と $\{r=1,\lambda<0\}$ の二本の半直線である。
<!-- formal-statement-end -->

### 証明の見取り図

$f=xy-1$ は円板上で零を持たない。このため $f$ と $1/f$ の双方へ[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を適用できる。

$w=xy$ が零でない定数なら、境界での絶対値が一定の $x,1/x,y,1/y$ へ同じ[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を適用し、円板が定数になる。非定数円板なら $xy\equiv0$、その境界が $w=0$ を通るには $r=1$ が必要である。

<!-- proof-start -->
### 証明

$f=xy-1$ は正則かつ非零で、境界上で $|f|=r$。[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)により $|f|\leq r$。一方 $1/f$ も正則で、境界の絶対値は $1/r$ だから $|1/f|\leq1/r$。従って円板上で $|f|=r$ である。絶対値が一定の正則関数は定数なので $f\equiv c-1$、すなわち $xy\equiv c$。

$c\ne0$ なら $x,y$ は円板上で零にならない。境界の二条件から、$a=|x|^2,b=|y|^2$ は

$$
a-b=2\lambda,\quad ab=|c|^2,
\qquad
a=\lambda+\sqrt{\lambda^2+|c|^2},
\quad
b=-\lambda+\sqrt{\lambda^2+|c|^2}
$$

と定まり、両方正の定数である。$x,1/x$ の[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)から $|x|$ は円板全体で一定、従って $x$ は定数。同様に $y$ も定数となる。

非定数の場合は $xy\equiv0$ しかない。正則関数の積が恒等的に零だから、[恒等定理](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)により $x\equiv0$ または $y\equiv0$ である。

境界では $w=0$ なので $r=|0-1|=1$ を得る。正則基底では $\lambda\ne0$ である。

$\lambda>0$ なら $y\equiv0$、境界で $|x|^2=2\lambda$。一方 $\lambda<0$ なら $x\equiv0$、境界で $|y|^2=-2\lambda$ となる。

表示した $u_\pm$ は正則で、円板全体で $xy-1=-1\ne0$、境界は指定トーラスに載る。従って必要条件は十分条件でもある。

最後にMaslov指数を計算する。$u_+$ の境界 $x=\sqrt{2\lambda}e^{i\theta}$ では $L$ の向き付き接基底を

$$
V=(ix,0),\qquad W=(0,-i/x)
$$

と取れる。$\det_{\mathbb C}(V,W)=1$ は境界全体で一定である。$u_-$ でも $V=(0,-iy)$、$W=(-i/y,0)$ を使うと行列式は1。両者とも定義に現れる二乗位相が一定なので $\mu=0$。一般の非定数円板は片方の座標軸に含まれ、境界で同じ形の接基底を取れるため $\mu=0$ である。
<!-- proof-end -->

ここで**壁は面積が0になる場所ではない**。基本円板の面積を計算すると

$$
A_\omega([u_+])=2\pi\lambda>0\quad(\lambda>0),
\qquad
A_\omega([u_-])=-2\pi\lambda>0\quad(\lambda<0).
$$

壁の両側 $r<1$、$r>1$ では、この模型の正則ファイバーを境界とする非定数正則円板は存在しない。$r$ を1へ動かすと $w=0$ を含む円板が現れるという**正則写像の存在の変化**が、ここでの壁である。

<a id="prop-syz1-15-wall-weights"></a>

<!-- formal-statement-start -->
> **命題（壁の円板の面積と境界ホロノミー）**  
> $h\in U(1)$ を $V=(ix,-iy)$ の正向き円周軌道のホロノミーとする。$\lambda>0$ の $u_+$、$\lambda<0$ の $u_-$ について
>
$$
\begin{aligned}
\partial[u_+]&=[V],&
z_{[u_+]}&=T^{2\pi\lambda}h,\\
\partial[u_-]&=-[V],&
z_{[u_-]}&=T^{-2\pi\lambda}h^{-1}.
\end{aligned}
$$
>
> $k$ 重被覆 $u_\pm(\zeta^k)$ は同じ壁でMaslov指数0、面積はそれぞれ $k$ 倍、境界ホロノミーは $h^{\pm k}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

座標軸に載る円板の半径の二乗は $2|\lambda|$ である。$x$ 軸上では境界の正向き回転が $V$ と一致し、$y$ 軸上では反対向きである。面積と境界は被覆次数について加法的に変わる。

<!-- proof-start -->
### 証明

$\omega_0$ を $u_+$ に引き戻すと、半径 $\sqrt{2\lambda}$ の平面円板の面積 $2\pi\lambda$ を得る。$u_-$ でも半径 $\sqrt{-2\lambda}$ から $-2\pi\lambda$ を得る。$x$ 軸上で $\theta$ を増やす接ベクトルは $(ix,0)=V$ だから境界類は $[V]$。$y$ 軸上では $(0,iy)=-V$ なので境界類は $-[V]$。定義に代入して表示した重みを得る。$\zeta^k$ に置き換えると円板を次数 $k$ で覆い、積分と巻き数がそれぞれ $k$ 倍となる。Maslov指数は元が0なので $k\cdot0=0$ である。
<!-- proof-end -->

### 比較例：指数2の座標円板と指数0の壁円板

積トーラスの $u_x$ は接基底の行列式が $-RS e^{i\theta}$ となりMaslov指数2だった。ここでの $u_+$ は $x$ が一周しても第二の接ベクトル $W=(0,-i/x)$ が逆回転するため、行列式が1のままでMaslov指数0となる。**同じ「一つの座標が円板を埋める」写像でも、境界のLagrangeトーラス族が違えばMaslov指数が変わる**。同じ正則写像の座標表示から指数を推定するのではなく、境界の接平面を計算する必要がある。

## 6. 壁・円板計数・補正を区別する

先ほどの模型では、正則円板の存在を個々のファイバーで確かめた。別のトーラス束でも同じ問いを立てるには、円板を持つファイバーの基底上の**位置の集合**を一つの対象として捉えると便利である。場所を定義しておけば、その集合がどのような形になるか、個数や補正係数を別途計算すべきかを区別できる。

<a id="def-syz1-15-disk-wall"></a>

<!-- formal-statement-start -->
> **定義（Maslov指数0の円板の存在壁）**  
> 滑らかなLagrangeトーラス束 $\pi:X\to B_0$ と複素構造 $J$ が与えられたとき、
>
$$
\mathcal W_0
=\{b\in B_0:\text{$L_b$ を境界とする非定数の $J$ 正則円板で $\mu=0$ のものが存在する}\}
$$
>
> を**Maslov指数0の円板の存在壁**と呼ぶ。本章の具体模型では
>
$$
\mathcal W_0=\{(1,\lambda):\lambda\ne0\}.
$$
>
> 一般には $\mathcal W_0$ が滑らかな余次元1部分多様体になるとは仮定せず、個々の模型または適切な正則性・コンパクト性の仮定の下で検討する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-15-disk-wall -->
### 直接例：壁を二本の半直線として読む

基底 $B_0$ の点 $(r,\lambda)=(1,\tfrac12)$ は壁に含まれる。実際に

$$
u_+(\zeta)=(\zeta,0),\qquad A([u_+])=\pi,\qquad \mu([u_+])=0
$$

が成り立ち、この円板は非定数である。

一方、$(r,\lambda)=(\tfrac12,\tfrac12)$ では非定数正則円板が存在しない。存在すれば必要条件 $r=1$ に反するからである。$(1,0)$ は特異ファイバーの値で、そもそも正則基底 $B_0$ に属さない。

**定義の確認**：最初の点は正則円板の存在とMaslov指数0を満たし、二番目の点は円板の存在条件を満たさない。第三の点は定義域外である。従って存在壁は特異値を除いた二本の半直線として理解できる。
<!-- definition-example-end -->

円板の**存在**からその円板の**符号付き個数**は得られない。計数には通常、円板のモジュライ空間のコンパクト化、正則性・仮想的摂動、向き、境界での崩壊（bubbling）、不変性などを扱う必要がある。本章で証明したのは指定した模型における存在壁・面積・境界・Maslov指数であり、一般の開Gromov–Witten不変量の構成ではない。

また、Maslov指数0の円板の存在壁が鏡像の局所座標の変換に**関係する**という幾何的動機と、具体的な補正係数がいくつになるかという主張は別である。第16講では補正係数・向き・整合条件を明示した**仮定付きの座標模型**で貼り合わせを検算する。Maslov指数2の円板の適切な計数から作るsuperpotentialも、指数0の壁そのものとは区別する。

## 7. 演習：形式的な類から実在する壁へ

### Level A：四つの不変量を分離する

<a id="ex-syz1-15-a01"></a>
#### SYZ1-15-A01 積トーラスの二つの円板
- Level: A

$L_{2,3}\subset\mathbb C^2$ の二つの座標円板について、境界類、面積、Maslov指数と、$\rho(a)=e^{i\alpha}$、$\rho(b)=e^{i\beta}$ のときの重みを求めよ。

<!-- solution-start -->
### 詳細解答

$x$ 円板 $u_x=(2\zeta,3)$ は境界で $a$ を一周し、面積は半径2の円板だから $\pi\cdot2^2=4\pi$。$y$ 円板 $u_y=(2,3\zeta)$ は $b$ を一周し、面積は $\pi\cdot3^2=9\pi$。両者とも角度接基底の複素行列式が境界で一周するので、その位相の二乗は二周し $\mu=2$。従って

$$
(\partial[u_x],A,\mu,z)=(a,4\pi,2,T^{4\pi}e^{i\alpha}),
$$

$$
(\partial[u_y],A,\mu,z)=(b,9\pi,2,T^{9\pi}e^{i\beta}).
$$

境界ホロノミーと面積の指数は別の因子である。
<!-- solution-end -->

<a id="ex-syz1-15-a02"></a>
#### SYZ1-15-A02 零点のない座標と最大値原理
- Level: A

$u:\overline{\mathbb D}\to\mathbb C^*$ が正則、$|u|=R>0$ が境界上で成り立つとき $u$ は定数であることを証明せよ。

<!-- solution-start -->
### 詳細解答

$u$ は円板上で零にならないから $1/u$ も正則である。最大値原理で $|u|\leq R$、また $|1/u|\leq1/R$ を得る。後者は $|u|\geq R$ と同値なので円板全体で $|u|=R$。[開写像定理](../../../解析系/CA/CA3/index.md#thm-ca3-open-mapping)によれば非定数正則関数の像は開集合だが、値域が円周に含まれる写像の像は開にならない。従って $u$ は定数である。
<!-- solution-end -->

<a id="ex-syz1-15-a03"></a>
#### SYZ1-15-A03 特異点を壁から取り除く
- Level: A

$L_{r,\lambda}$ が $xy=0$ と交わるための条件と、$(r,\lambda)=(1,0)$ を正則ファイバーに含めない理由を求めよ。

<!-- solution-start -->
### 詳細解答

$xy=0$ なら $|xy-1|=1$ なので $r=1$ が必要である。$r=1,\lambda>0$ なら $y=0,|x|^2=2\lambda$、$r=1,\lambda<0$ なら $x=0,|y|^2=-2\lambda$ で円周が得られる。$r=1,\lambda=0$ のとき $x=y=0$ が含まれる。原点では $d(xy)=y\,dx+x\,dy=0$ かつ $d\lambda=0$ で、二つの保存量の微分の階数が落ちる。従って原点を含むファイバーは正則な $T^2$ ではなく、壁 $\mathcal W_0$ に含めない。
<!-- solution-end -->

<a id="ex-syz1-15-a04"></a>
#### SYZ1-15-A04 正の半直線の円板
- Level: A

$(r,\lambda)=(1,2)$ に対して基本正則円板、面積、境界の円周向きと重みを求めよ。$h=\rho([V])$ とする。

<!-- solution-start -->
### 詳細解答

$\sqrt{2\lambda}=2$ より $u_+(\zeta)=(2\zeta,0)$。境界では $|xy-1|=1$、$(|x|^2-|y|^2)/2=4/2=2$。$xy-1=-1\ne0$ なので円板全体は $X$ に入る。面積は半径2の円板の $4\pi$。境界の接ベクトルは $(ix,0)=V$ で、ホロノミーは $h$。重みは $T^{4\pi}h$。$V$ の向きが正である点を指定しないと $h$ と $h^{-1}$ を取り違える。
<!-- solution-end -->

<a id="ex-syz1-15-a05"></a>
#### SYZ1-15-A05 負の半直線のMaslov指数
- Level: A

$(r,\lambda)=(1,-\tfrac12)$ の基本円板を求め、$V=(0,-iy)$ と $W=(-i/y,0)$ の行列式からMaslov指数を計算せよ。

<!-- solution-start -->
### 詳細解答

$\sqrt{-2\lambda}=1$ なので $u_-(\zeta)=(0,\zeta)$。境界では $y=e^{i\theta}$。二つの接ベクトルの行列式は

$$
\det_{\mathbb C}
\begin{pmatrix}
0 & -i/y\\
-iy & 0
\end{pmatrix}
=-(-i/y)(-iy)=1.
$$

位相の二乗は常に1で巻き数0、従って $\mu=0$。面積は $\pi$。境界を正向きに回すベクトルは $(0,iy)=-V$ だから重みは $T^\pi h^{-1}$ となる。
<!-- solution-end -->

### Level B：存在と非存在を証明する

<a id="ex-syz1-15-b01"></a>
#### SYZ1-15-B01 壁の必要性を自分で再構成する
- Level: B

$u:(\mathbb D,\partial\mathbb D)\to(X,L_{r,\lambda})$ を非定数正則円板とする。$f=xy-1$、$w=xy$ を使い、$r=1$ を導け。特に $w\equiv c\ne0$ を排除する中間計算を示せ。

<!-- solution-start -->
### 詳細解答

$u$ は $xy=1$ を避けるため $f$ と $1/f$ は正則で、境界で $|f|=r$、$|1/f|=1/r$。最大値原理をそれぞれに使って $|f|\leq r$、$|f|\geq r$ となるから $f$ は定数。従って $w\equiv c$。$c\ne0$ なら $x,y$ は円板上で零を持たない。境界上の $|x|^2=a,|y|^2=b$ は $a-b=2\lambda,ab=|c|^2$ を満たし、

$$
a=\lambda+\sqrt{\lambda^2+|c|^2},
\qquad
b=-\lambda+\sqrt{\lambda^2+|c|^2}
$$

の正の定数に定まる。$x,1/x$ と $y,1/y$ に[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を使えば両座標が定数となり、非定数性に反する。よって $c=0$。境界では $r=|w-1|=|-1|=1$。さらに正則な基底では $(1,0)$ を除くので $\lambda\ne0$ である。
<!-- solution-end -->

<a id="ex-syz1-15-b02"></a>
#### SYZ1-15-B02 形式的な指数0の偽の壁
- Level: B

$L_{R,R}$ の相対類 $\beta=[u_x]-[u_y]$ について $A=0$、$\mu=0$ を確認し、それでも正則円板が存在しない理由を、第二座標の巻き数と非定数円板の面積正値性という独立の二方法で示せ。

<!-- solution-start -->
### 詳細解答

面積積分の線形性とMaslov巻き数の和から $A(\beta)=\pi R^2-\pi R^2=0$、$\mu(\beta)=2-2=0$ である。また境界類は $a-b$。第一の方法では、任意の正則円板の第二座標 $y$ は境界上で $|y|=R>0$。[偏角原理](../../../解析系/CA/CA4/index.md#thm-ca4-argument-principle)から境界の巻き数は内部の零点の位数の和で非負だが、$a-b$ は第二座標に巻き数 $-1$ を与えるので矛盾する。

第二の方法では非定数 $J$ 正則円板の面積は正でなければならないのに、同じ相対類の面積は0である。定数円板なら境界類は0で $a-b\ne0$ に反する。従ってどちらの方法でも代表円板は存在せず、面積の一致から壁を推定する推論は誤りである。
<!-- solution-end -->

<a id="ex-syz1-15-b03"></a>
#### SYZ1-15-B03 円板をk回覆う写像と計数の区別
- Level: B

$\lambda=\tfrac32,r=1$ とし、$u_k(\zeta)=(\sqrt3\,\zeta^k,0)$（整数 $k\geq1$）について、面積・境界類・Maslov指数・重みを求めよ。また「円板が各 $k$ について存在するので計数値はすべて1」と結論できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

$\zeta\mapsto\zeta^k$ の次数が $k$ で、半径 $\sqrt3$ の円板を $k$ 回覆うため

$$
A([u_k])=k\pi(\sqrt3)^2=3\pi k.
$$

境界は円周軌道を正向きに $k$ 回進むので $\partial[u_k]=k[V]$、ホロノミーは $h^k$、重みは $T^{3\pi k}h^k$ である。接基底の行列式は境界上で1のままなので $\mu([u_k])=0$。

ただし写像 $u_k$ の存在は、安定円板のモジュライ空間の向き・自己同型・同じ円板を繰り返し覆う写像の寄与・正則性を処理した符号付き計数とは別である。例えば $u_k$ は $k>1$ のとき $\zeta\mapsto e^{2\pi i/k}\zeta$ で写像が変わらず、再パラメータ化の対称性がある。これらを扱わず計数を1と宣言することはできない。
<!-- solution-end -->

<a id="ex-syz1-15-b04"></a>
#### SYZ1-15-B04 二つの半直線と特異点
- Level: B

$r=1$ 上の $\lambda=\pm a$（$a>0$）で基本円板の境界向き・面積・Maslov指数を比べよ。さらに $\lambda$ を連続に正から負へ動かしても同じ滑らかなトーラス束の円板がそのまま移行した、と主張できない理由を説明せよ。

<!-- solution-start -->
### 詳細解答

$\lambda=a$ では $u_+=(\sqrt{2a}\,\zeta,0)$ で、面積 $2\pi a$、境界類 $[V]$、Maslov指数0。$\lambda=-a$ では $u_-=(0,\sqrt{2a}\,\zeta)$ で、面積も $2\pi a$、境界類は $-[V]$、Maslov指数0である。重みはそれぞれ $T^{2\pi a}h$ と $T^{2\pi a}h^{-1}$。

しかし間の $\lambda=0$ において $(r,\lambda)=(1,0)$ となり、原点で $dw=d\lambda=0$、正則ファイバーの仮定が破れる。従って二つの半直線の円板を一つの滑らかなファイバー族の同一相対類として連続輸送できるとは言えない。面積の数値が一致することは、境界類やファイバーの正則性を保証しない。
<!-- solution-end -->

### Level C：正則円板の存在壁の完全計算

<a id="ex-syz1-15-c01"></a>
#### SYZ1-15-C01 最大値原理・Lagrange性・Maslov指数を統合する
- Level: C

$X=\mathbb C^2\setminus\{xy=1\}$、$\omega_0$ は標準Kähler形式とし、

$$
L_{r,\lambda}=\{ |xy-1|=r,\ (|x|^2-|y|^2)/2=\lambda\}
$$

を考える。$r>0$、$(r,\lambda)\ne(1,0)$ とする。

1. $w=xy$ を使い、$L_{r,\lambda}$ の円周方向の半径と $T^2$ 構造を求めよ。
2. Hamilton円周作用を用いてLagrange性を示し、$\Omega=dx\wedge dy/(xy-1)$ の位相を検算せよ。
3. 非定数正則円板が存在する必要十分条件を[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)から証明せよ。
4. 壁の基本円板の面積・Maslov指数・ホロノミーの向きを求めよ。
5. この計算から任意のコンパクトCalabi–Yauの円板計数が得られない理由を、使った仮定を指定して述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 円周束。** $w=c\ne0$ 上で $a=|x|^2,b=|y|^2$ と置けば $ab=|c|^2,a-b=2\lambda$ なので

$$
a=\lambda+\sqrt{\lambda^2+|c|^2},
\qquad
b=-\lambda+\sqrt{\lambda^2+|c|^2}.
$$

$x$ の偏角が円周座標で、$y=c/x$ が定まる。$c=0$ を通るのは $r=1$ の場合のみで、そのとき $\lambda>0$ なら $y=0,|x|=\sqrt{2\lambda}$、$\lambda<0$ なら $x=0,|y|=\sqrt{-2\lambda}$ で円周が残る。正則な基底では円周束は滑らかである。自明化を具体化すると、$\lambda>0$ では $x=\sqrt a>0,y=c/x$、$\lambda<0$ では $y=\sqrt b>0,x=c/y$ を大域断面に取れる。$\lambda=0$ なら $r\ne1$ で $c\ne0$ だから $x=\sqrt{|c|}>0,y=c/x$ を取れる。断面を円周作用で一周させて $\gamma_r\times S^1\cong L_{r,\lambda}$ を得るので $T^2$ である。

**(2) Lagrange性と位相。** 円周作用の生成ベクトル場を $V=(ix,-iy)$ とする。このとき $dw(V)=0$ である。[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)の符号規約では、Hamilton関数は $-\lambda$ となる。

実座標 $x=x_1+ix_2$、$y=y_1+iy_2$ を使い、$\omega_0=dx_1\wedge dx_2+dy_1\wedge dy_2$ に $V$ を代入すると、任意の実接ベクトル $Z$ について

$
\begin{aligned}
\omega_0(V,Z)
&=-x_1Z(x_1)-x_2Z(x_2)+y_1Z(y_1)+y_2Z(y_2)\\
&=-d\lambda(Z)
\end{aligned}
$

を得る。したがって $\iota_V\omega_0=-d\lambda$ である。周回方向の接ベクトル $W$ は $dw(W)=i(w-1)$ と取れ、$d\lambda(W)=0$ だから $\omega_0(V,W)=0$。また $dw(W)\ne0=dw(V)$ なので二つは一次独立である。

実2次元の接平面はこの二つに張られ、2形式の交代性から[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)を満たす。さらにこの $W$ を使うと

$$
(dx\wedge dy)(V,W)
=i(xW_y+yW_x)
=i\,dw(W)=-(w-1).
$$

従って $\Omega(V,W)=-1$ で位相は $\pi$ に一定。

**(3) 壁の必要十分性。** $f=xy-1$ は円板上で零を持たず、境界で $|f|=r$ である。$f$ と $1/f$ に[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を適用すると円板全体で $|f|=r$、ゆえに $f$ は定数となり $xy=c$。

$c\ne0$ では (1) で求めた $a,b$ は境界上で正の定数である。$x,1/x,y,1/y$ にも[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)を適用すれば両座標は定数となる。非定数円板では $c=0$ が必要である。

$c=0$ なら境界の第一条件より $r=1$。正則ファイバーの条件から $\lambda\ne0$ を得る。逆に $\lambda>0$ の $u_+$ と $\lambda<0$ の $u_-$ は複素正則で $xy=0$ を満たし、境界は指定トーラスに載る。よってこの条件は必要十分である。

**(4) 面積と指数。** 円板半径 $\sqrt{2|\lambda|}$ より面積は $2\pi|\lambda|$。$u_+$ の境界基底 $V=(ix,0),W=(0,-i/x)$ と、$u_-$ の $V=(0,-iy),W=(-i/y,0)$ はいずれも複素行列式1を持つのでMaslov指数は0。$\rho([V])=h$ とすれば前者の境界は $[V]$、後者は $-[V]$ だから

$$
z_+=T^{2\pi\lambda}h\quad(\lambda>0),
\qquad
z_-=T^{-2\pi\lambda}h^{-1}\quad(\lambda<0).
$$

**(5) 適用範囲。** 証明では特別な全域正則関数 $xy-1$ が零を持たず、境界でその絶対値が一定であること、標準複素構造、特定のHamilton円周作用、座標軸の明示的円板を使った。一般のCalabi–Yau上のSLag束にはこの正則関数や座標軸の模型が存在するとは限らず、存在・Maslov指数・面積の計算を移せない。また符号付き計数を構成するためのコンパクト性・向き・摂動・不変性も証明していない。従って結論は指定局所模型の存在壁に限られる。
<!-- solution-end -->

## 8. 次講への問い

この章で確定したのは、壁の**場所**とそこでの円板の**類・面積・境界・Maslov指数**である。正則円板が存在するだけでは、補正付き鏡像の座標変換係数までは決定できない。

次のSYZ1-16では、指数0の円板の寄与について**係数と成立範囲を明示した局所仮定**を置き、semi-flat座標の貼り合わせがどう変わるか、複数の壁を横切ると何を検算すべきかを扱う。指数2の円板を数えるsuperpotentialについても、指数0の存在壁との役割の違いを保つ。

参考：Denis Aurouxによる[2007年の反標準因子補空間に関する論文](https://arxiv.org/abs/0706.3207)および[2009年の壁越えの概説](https://arxiv.org/abs/0902.1595)。本章の数式は上記の局所構成を対象として独立に検算した。
