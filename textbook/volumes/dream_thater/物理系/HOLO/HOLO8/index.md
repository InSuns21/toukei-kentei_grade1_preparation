# HOLO8 スカラー漸近とBF境界

[HOLO7の境界付き第一変分](../HOLO7/index.md#prop-holo7-boundary-variation)では、有限の動径cutoffでスカラー場の値を固定すると、内部方程式と境界応答が分かれることを確認しました。しかしcutoffを共形境界 $z=0$ へ近づけると、場の値そのものは一般に零または発散し、どの係数を固定すべきか分からなくなります。さらに質量二乗が負でも、AdSの中では必ずしも不安定とは限りません。

本講では**境界近くの二つの漸近解**を場の方程式から導き、質量と境界次元の候補を結び、Breitenlohner–Freedman（BF）下限と境界条件の選択を区別します。すべてのAdS/CFTを証明するのではなく、固定AdS背景上の自由スカラーについて確かめられる範囲を明示します。

整数 $d\ge2$、AdS半径 $L>0$、$\hbar=1$ を固定します。Euclid Poincaré計量と実スカラーの方程式は [HOLO7](../HOLO7/index.md#prop-holo7-boundary-variation) と同じく

$$
ds_E^2=\frac{L^2}{z^2}(dz^2+d x_1^2+\cdots+d x_d^2),\qquad
(-\nabla_E^2+m^2)\phi=0,\qquad z>0.
$$

境界座標 $x$ は局所的には $\mathbb R^d$、積分の赤外調整が必要な場合は平坦な周期箱とします。$m^2$ は実数であり、負でも構いません。安定性と正規化可能性を論じる節では、時間方向を一つ持つLorentz Poincaré計量に切り替えることをその場で明記します。

## 1. 境界へ近づくと二つの冪が現れる

[HOLO7のスカラー方程式](../HOLO7/index.md#prop-holo7-boundary-variation)を上の計量で成分表示します。$g^{zz}=z^2/L^2$、$\sqrt{g}=L^{d+1}z^{-d-1}$ だから

$$
\nabla_E^2\phi=\frac1{L^2}\left[z^2\partial_z^2\phi-(d-1)z\partial_z\phi+z^2\Delta_x\phi\right].
$$

ここで $\Delta_x=\sum_i\partial_i^2$ は境界方向の通常のLaplace作用素です。波数 $k$ の実Fourier成分 $\phi(z,x)=f_k(z)e^{ik\cdot x}$ を一つ取り出すと、$\Delta_xe^{ik\cdot x}=-|k|^2e^{ik\cdot x}$ により

<a id="ref-holo8-radial-equation"></a>

$$
z^2 f_k''-(d-1)zf_k'-(|k|^2z^2+m^2L^2)f_k=0. 
$$

ここでプライムは $z$ 微分です。まず $k=0$ なら冪 $f=z^\alpha$ を代入して厳密な解を探せます。$f'=\alpha z^{\alpha-1}$、$f''=\alpha(\alpha-1)z^{\alpha-2}$ なので、左辺は

$$
\{\alpha(\alpha-1)-(d-1)\alpha-m^2L^2\}z^\alpha
=\{\alpha(\alpha-d)-m^2L^2\}z^\alpha.
$$

非零解が存在する条件は $\alpha(\alpha-d)=m^2L^2$ です。$k\ne0$ のときも $|k|^2z^2$ は $z\downarrow0$ で高次なので、この二次式が**先頭冪の候補**を決めます。ただし後続項・対数項は波数と指数差に依存します。一般の解を常に二つの純粋な冪の和と断言しません。

まず、先頭冪の指数が何を表すかを明示します。

<a id="def-holo8-indicial-exponents"></a>

<!-- formal-statement-start -->
> **定義（スカラーの境界漸近指数）**  
> $d\ge2$、$L>0$、$m^2\in\mathbb R$ に対して、方程式 $\alpha(\alpha-d)=m^2L^2$ の根を境界漸近指数とする。$d^2/4+m^2L^2\ge0$ のとき

$$
\nu=\sqrt{\frac{d^2}{4}+m^2L^2},\qquad
\Delta_-=\frac d2-\nu,\qquad \Delta_+=\frac d2+\nu
$$

> と置く。$\nu>0$ では $\Delta_-<\Delta_+$ の順に遅いモード・速いモードの指数と呼ぶ。$\nu=0$ は重根であり、二つの独立な純粋冪があることを意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo8-indicial-exponents -->
**定義の確認**：$d=3$、$m^2L^2=-2$ を選ぶと $d^2/4+m^2L^2=9/4-2=1/4$、$\nu=1/2$ です。よって $\Delta_-=1$、$\Delta_+=2$。実際、二つの指数について $\Delta(\Delta-3)$ を計算すると $1(1-3)=2(2-3)=-2$ です。両方とも同じ質量の方程式に対応し、速い・遅いは $z\downarrow0$ で $z^2/z\to0$ となる大小関係で判定できます。
<!-- definition-example-end -->

<a id="prop-holo8-mass-dimension"></a>

<!-- formal-statement-start -->
> **命題（質量と漸近指数の関係）**  
> $d\ge2$、$L>0$、実数 $m^2$、$k=0$ の方程式 [径方向方程式](#ref-holo8-radial-equation) を考える。$\nu>0$ が実数なら、二つの一次独立な解は $z^{\Delta_-}$ と $z^{\Delta_+}$ であり、その指数は

$$
m^2L^2=\Delta_\pm(\Delta_\pm-d),\qquad
\Delta_-+\Delta_+=d
$$

> を満たす。$\nu=0$ のときの解は $z^{d/2}$ と $z^{d/2}\log(z/\ell)$ である（$\ell>0$ は対数を無次元化する参照長）。
<!-- formal-statement-end -->

### 証明の見取り図

零波数に限ると [径方向方程式](#ref-holo8-radial-equation) はEuler型方程式です。$s=\log(z/\ell)$ と置き、$f=z^{d/2}u(s)$ に変えると、根が異なる場合と一致する場合を一つの定係数方程式で処理できます。

<!-- proof-start -->
### 証明

$D=z\,d/dz=d/ds$ と書き、$z^2f''=D(D-1)f$、$zf'=Df$ を使います。$k=0$ の [径方向方程式](#ref-holo8-radial-equation) は

$$
(D^2-dD-m^2L^2)f=0.
$$

$f=z^{d/2}u(s)$ に対し $Df=z^{d/2}(u'+du/2)$、$D^2f=z^{d/2}(u''+du'+d^2u/4)$ です。これらを代入すると $u'$ 項が相殺され、

$$
u''-\left(\frac{d^2}{4}+m^2L^2\right)u
=u''-\nu^2u=0
$$

となります。$\nu>0$ なら $u=Ae^{-\nu s}+Be^{\nu s}$、したがって $f=\widetilde A z^{d/2-\nu}+\widetilde Bz^{d/2+\nu}$（定数に $\ell$ の冪を吸収）。$\nu=0$ なら $u''=0$ なので $u=A+Bs$、すなわち $f=z^{d/2}(A+B\log(z/\ell))$ です。どちらも直接 [径方向方程式](#ref-holo8-radial-equation) に代入すれば成立し、異なる冪または冪・対数は一次独立です。$\square$
<!-- proof-end -->

**境界次元との接続**：[HOLO4の境界拡大縮小](../HOLO4/index.md#def-holo4-induced-boundary-action)と[QFT48のスカラー一次場](../../QFT/QFT48/index.md#def-qft48-scalar-primary)を念頭に、バルクの座標を $(z,x)\mapsto(\lambda z,\lambda x)$ と拡大すると計量は変わりません。境界源が次元 $d-\Delta$ の量として変換するという**双対性の辞書を仮定**した場合、境界近くの源に掛かる冪は $z^{d-\Delta}$ です。標準的選択では遅い指数が $d-\Delta_+=\Delta_-$ なので、演算子次元の候補が $\Delta_+$ となります。これは境界対称性と整合する関係であって、一般のCFTに演算子の存在を保証する定理ではありません。

## 2. BF下限はなぜ負の質量二乗を許すか

平坦空間の自由場では負の質量二乗に不安定性を連想します。しかしAdSには動径方向の幾何学的な勾配コストがあります。その量を**平方完成**で計算して、境界を無視した「$m^2<0$ なら即不安定」という推論を避けます。

<a id="def-holo8-bf-range"></a>

<!-- formal-statement-start -->
> **定義（BF下限）**  
> $d\ge2$、$L>0$ の $\mathrm{AdS}_{d+1}$ 上の自由実スカラーについて

$$
m_{\mathrm{BF}}^2L^2=-\frac{d^2}{4}
$$

> をBreitenlohner–Freedman（BF）下限と呼ぶ。$m^2L^2\ge-d^2/4$ をBF下限以上という。これは境界条件を問わず全ての背景・相互作用が安定であるとの無条件の主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo8-bf-range -->
**定義の確認**：$d=3$ の場合は $m_{\mathrm{BF}}^2L^2=-9/4$ です。前節の $m^2L^2=-2$ は $-2>-9/4$ なのでBF下限以上です。一方 $m^2L^2=-3$ なら $-3<-9/4$ で下限未満となり、指数判別式 $9/4-3=-3/4$ は負です。質量の符号だけでは両者を区別できません。
<!-- definition-example-end -->

<a id="prop-holo8-hardy-bf"></a>

<!-- formal-statement-start -->
> **命題（動径平方完成とBF下限の鋭さ）**  
> $d\ge2$、$L>0$、$m^2\in\mathbb R$ とする。$f\in C_c^\infty(0,\infty)$ を実数値の動径試験関数とし、

$$
Q_m[f]=L^{d-1}\int_0^\infty
\left(z^{1-d}|f'|^2+m^2L^2z^{-d-1}f^2\right)dz
$$

> とする。このとき $m^2L^2\ge-d^2/4$ なら $Q_m[f]\ge0$ である。また $m^2L^2<-d^2/4$ なら、$Q_m[f]<0$ となる滑らかなコンパクト台の $f$ が存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$f=z^{d/2}u$ として、一次微分を展開します。交差項を端点で消すと、残る係数がちょうど $m^2L^2+d^2/4$ です。負のときには $\log z$ 上で広くほぼ一定の試験関数を取り、勾配コストより負の体積項を大きくできます。

<!-- proof-start -->
### 証明

$f=z^{d/2}u(z)$ と書くと $f'=z^{d/2-1}(du/2+zu')$ なので

$$
z^{1-d}(f')^2
=z^{-1}\left(\frac{d^2}{4}u^2+dzuu'+z^2(u')^2\right).
$$

$u$ はコンパクト台なので $\int_0^\infty duu'\,dz=(d/2)[u^2]_0^\infty=0$。したがって

<a id="ref-holo8-square"></a>

$$
\frac{Q_m[f]}{L^{d-1}}
=\int_0^\infty z(u')^2dz+
\left(m^2L^2+\frac{d^2}{4}\right)
\int_0^\infty\frac{u^2}{z}dz. 
$$

BF下限以上では二項とも非負です。逆向きを証明するため $c=m^2L^2+d^2/4<0$ とし、零でない実数値 $\psi\in C_c^\infty(\mathbb R)$ を選びます。$s=\log(z/\ell)$、$u_R(z)=\psi(s/R)$（$R>0$）とすれば $du_R/dz=\psi'(s/R)/(Rz)$。$dz/z=ds$ を用いると

$$
\int_0^\infty z(u_R')^2dz
=\frac1R\int_{\mathbb R}|\psi'(v)|^2dv,\qquad
\int_0^\infty\frac{u_R^2}{z}dz
=R\int_{\mathbb R}|\psi(v)|^2dv.
$$

ゆえに [平方完成式](#ref-holo8-square) は $a/R+cRb$（$a\ge0,b>0$）となり、十分大きい $R$ で負です。$f_R=z^{d/2}u_R$ は各有限の $R$ で $z>0$ にコンパクト台を持つ滑らかな関数です。$\square$
<!-- proof-end -->

この命題は**自由場の二次形式に対する正確な判定**です。Lorentz時間発展の自己共役な境界条件、エネルギーの境界項、一般の初期値問題の存在は別に検査が必要です。とくに有限区間 $[\epsilon,Z]$ の幅を固定したまま負の試験関数が必ず存在する、と証明したわけではありません。$\nu^2<0$ の場合は $\nu=i\sigma$（$\sigma>0$）として零波数解が $z^{d/2}\cos(\sigma\log(z/\ell))$ と $z^{d/2}\sin(\sigma\log(z/\ell))$ になり、単調な二冪という境界辞書も壊れます。

## 3. 二つのモードはどちらも正規化できるか

BF下限以上でも、二つの解を境界で同じように許せるとは限りません。ここでいう**正規化可能性**は作用の通常の $L^2$ 積分ではなく、Lorentz場の固定時刻のKlein–Gordon（KG）内積について調べます。

時間座標 $t$ を持つLorentz Poincaré計量を

$$
ds_L^2=\frac{L^2}{z^2}(-dt^2+dz^2+d\boldsymbol x^2)
$$

とします。$\boldsymbol x$ は $d-1$ 個の空間座標です。$t=\mathrm{const}$ の面の体積密度は $\sqrt h=L^d z^{-d}$、未来向き単位法線は $n^t=z/L$。よってKG内積に現れる密度は $\sqrt h\,n^t=L^{d-1}z^{1-d}$ です。

正周波数 $\omega>0$ の一つの分離モードを $\phi=e^{-i\omega t}f(z)v(\boldsymbol x)$ とし、$v$ の空間ノルムを有限に取ります。KG内積の径方向部分は正の定数 $2\omega L^{d-1}$ を除き $\int z^{1-d}|f|^2dz$ となります。なぜこの重みが必要なのかは、計量から求めた $\sqrt h\,n^t$ にあり、Euclid体積密度 $z^{-d-1}$ と取り違えません。

<a id="def-holo8-kg-normalizable"></a>

<!-- formal-statement-start -->
> **定義（境界近くのKG正規化可能性）**  
> $d\ge2$ のLorentz Poincaré AdSで、正周波数の分離モードの径方向関数 $f$ が $z=0$ 近傍で

$$
\int_0^{z_0}z^{1-d}|f(z)|^2dz<\infty
$$

> を満たすとき、そのモードを**境界近くでKG正規化可能**という（任意の十分小さい有限 $z_0>0$）。これは赤外端 $z\to\infty$ における正規化も、すべての許される境界条件も主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo8-kg-normalizable -->
**定義の確認**：$d=3$、$m^2L^2=-2$ の二つの零波数冪 $f_-=z$、$f_+=z^2$ では、重みを掛けるとそれぞれ $z^{-2}z^2=1$ と $z^{-2}z^4=z^2$。従って

$$
\int_0^{z_0}1\,dz=z_0,\qquad
\int_0^{z_0}z^2dz=\frac{z_0^3}{3}
$$

がともに有限です。ここでは零波数の冪を**紫外側の局所的な候補**として使っています。これをそのまま全空間で有限ノルムの正周波数解だと主張してはいません。
<!-- definition-example-end -->

<a id="prop-holo8-normalizability-window"></a>

<!-- formal-statement-start -->
> **命題（二モードの境界KG可積分条件）**  
> $d\ge2$、$L>0$、$m^2L^2\ge-d^2/4$、$\nu\ge0$ とする。境界近くで先頭が $f_\pm(z)\sim c_\pm z^{d/2\pm\nu}$（$c_\pm\ne0$）のモードについて、速い側は常に境界KG正規化可能である。$\nu>0$ の遅い側は、**その場合に限り**正規化可能である：

$$
0<\nu<1
\quad\Longleftrightarrow\quad
-\frac{d^2}{4}<m^2L^2<-\frac{d^2}{4}+1.
$$

> $\nu=0$ の重根では $z^{d/2}$ と $z^{d/2}\log(z/\ell)$ の両方が境界KG正規化可能であるが、異なる次元の二冪ではない。
<!-- formal-statement-end -->

### 証明の見取り図

定義の重みを先頭冪の二乗に掛けます。$z\downarrow0$ の冪積分は指数が $-1$ より大きい場合に限り有限です。端点 $\nu=1$ は対数発散を直接確認します。

<!-- proof-start -->
### 証明

$z^{1-d}|f_\pm|^2\sim |c_\pm|^2z^{1-d+d\pm2\nu}=|c_\pm|^2z^{1\pm2\nu}$ です。$p\in\mathbb R$ について $p\ne-1$ なら $\int_\delta^{z_0}z^p dz=(z_0^{p+1}-\delta^{p+1})/(p+1)$。$\delta\downarrow0$ で有限になるのは $p>-1$ に限ります。速い方は $p=1+2\nu\ge1$ で常に有限。遅い方は $p=1-2\nu>-1$、つまり $\nu<1$ が必要十分です。$\nu=1$ では $\int_\delta^{z_0}z^{-1}dz=\log(z_0/\delta)\to\infty$。$\nu^2=d^2/4+m^2L^2$ を用い、$\nu>0$ と $\nu<1$ を二乗して質量範囲を得ます。$\nu=0$ では $z^{1-d}|z^{d/2}(A+B\log(z/\ell))|^2=z|A+B\log(z/\ell)|^2$ で、$s=-\log(z/\ell)$ に変えると積分は上限無限での $e^{-2s}$ と二次多項式の積となり収束します。$\square$
<!-- proof-end -->

KG可積分性は**境界条件を選ぶための必要な入力**ですが、これ一つでは量子論として許容されることの十分条件になりません。時間発展で内積やエネルギーが保存するには、境界からの流束を消すような条件と、適切な作用・反項が必要です。

## 4. 境界でどの係数を固定するか

$0<\nu<1$ の零波数モード（あるいは二つの独立な先頭係数が定義できる非共鳴の状況）で

$$
f(z)=A z^{\Delta_-}+B z^{\Delta_+}
$$

と書きます。$k\ne0$ なら一般に $z^{\Delta_-+2}$ などの後続項もあります。特に指数差が整数になる共鳴では対数補正が現れることがあり、ここでは**零波数に対する厳密な式**を用いて境界流束を検算します。

内積の保存を考えるには二解 $f_1,f_2$ の反対称な流束（Wronskian）を調べます。これは [HOLO7の境界変分の法線流束](../HOLO7/index.md#prop-holo7-boundary-variation)を二解に反対称化したもので、係数 $L^{d-1}z^{1-d}$ が掛かります。符号は端面の向きに依存しますが、**流束が零である条件**は向きに依存しません。

<a id="prop-holo8-boundary-flux"></a>

<!-- formal-statement-start -->
> **命題（二漸近係数の反対称流束）**  
> $d\ge2$、$0<\nu<1$、$L>0$ とし、零波数の実解 $f_j=A_jz^{\Delta_-}+B_jz^{\Delta_+}$（$j=1,2$）を取る。$z$ を一定にした面の径方向反対称流束密度は

$$
\mathcal F_z(f_1,f_2)
=L^{d-1}z^{1-d}(f_1f_2'-f_2f_1')
=2\nu L^{d-1}(A_1B_2-A_2B_1)
$$

> であり、$z$ に依存しない。特に全ての許された解の組で $A=0$、または $B=0$、あるいは共通の実数 $\kappa$ に対し $B=\kappa A$ を課すなら流束は零である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ指数同士の項は反対称化で消えます。交差項では $\Delta_+-\Delta_-=2\nu$ が残り、冪指数は $\Delta_-+\Delta_+-d=0$ になります。

<!-- proof-start -->
### 証明

$f_j'=\Delta_-A_jz^{\Delta_--1}+\Delta_+B_jz^{\Delta_+-1}$ を代入し、$A_1A_2$ と $B_1B_2$ の項はそれぞれ同じ積の差で零です。$A_1B_2$ 項の係数は $\Delta_+-\Delta_-=2\nu$、$A_2B_1$ 項ではその負です。残った $z$ の冪は $z^{1-d+\Delta_-+\Delta_+-1}=z^0$。よって表示式を得ます。$A=0$、$B=0$、$B=\kappa A$ なら二つの係数ベクトルはそれぞれ同じ一次元部分空間に属し、行列式 $A_1B_2-A_2B_1=0$ です。$\square$
<!-- proof-end -->

これを境界条件の選択へ結び付けます。二つのモードがKG可積分なときに限って両者を境界の動的な候補にできますが、実際には**何を固定するか**を指定しなくてはなりません。

<a id="def-holo8-quantization-choices"></a>

<!-- formal-statement-start -->
> **定義（本講での標準・代替境界選択）**  
> $d\ge2$、$0<\nu<1$、$L>0$ の自由スカラーで、上記の二係数 $A,B$ が定義でき、適切な有限化された作用と流束を消す境界条件が与えられるとする。$A$ を指定する選択を**標準量子化に対応する境界選択**、$B$ を指定する選択を**代替量子化に対応する境界選択**と呼ぶ。AdS/CFTの辞書を仮定したとき、対応する境界スカラー演算子の候補次元は、それぞれ $\Delta_+$ と $\Delta_-$ である。ここでの命名だけから一般の双対CFTの存在を主張しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo8-quantization-choices -->
**定義の確認**：$d=3$、$m^2L^2=-2$ は $\nu=1/2$ なので窓 $0<\nu<1$ に入ります。$f=Az+Bz^2$ とおき、標準側なら $A=J$ を固定して $\delta A=0$、代替側なら $B=\widetilde J$ を固定して $\delta B=0$。いずれも二つの同種の許容変分の反対称流束が [流束命題](#prop-holo8-boundary-flux) により零です。辞書上の候補次元は順に $2$、$1$。ただし反項を含む変分原理と赤外条件を省いて、$J$ と有限cutoffの値を同じものにしてはいません。
<!-- definition-example-end -->

| BF下限との位置 | 指数と局所KG判定 | 境界選択について言えること |
| --- | --- | --- |
| $m^2L^2<-d^2/4$ | $\nu$ は虚数、実二冪が消える | 標準的な安定境界辞書の範囲外 |
| $m^2L^2=-d^2/4$ | 重根・対数、局所KG可積分 | 特別な対数境界条件が必要。二つの異なる $\Delta$ の選択ではない |
| $-d^2/4<m^2L^2<-d^2/4+1$ | $0<\nu<1$、二モードとも局所KG可積分 | 適切な境界条件の下で標準・代替の二つの候補 |
| $m^2L^2\ge-d^2/4+1$ | $\nu\ge1$、遅いモードは局所KG非可積分 | 遅い係数は外部源として固定できても、通常の代替動的モードにはできない |

**BF端点の注意**：$\nu=0$ なら $f=z^{d/2}(A+B\log(z/\ell))$ です。二解の反対称流束は $L^{d-1}(A_1B_2-A_2B_1)$ となりますが、参照長を $\ell\mapsto c\ell$ に変えると $A\mapsto A+B\log c$ となるため、$A$ の意味はスケール選択に依存します。「同じ次元の標準と代替が二つある」と表に書き込むのではなく、対数反項と境界条件を別途定める必要があります。これは次講以降の繰り込みを先取りして無条件に扱わないための区別です。

## 5. 二次の後続項と共鳴の落とし穴

境界方向に変化する場に対しては、先頭指数だけでは場の全てを表せません。方程式 [径方向方程式](#ref-holo8-radial-equation) で $k\ne0$ とし、$f=z^\Delta(1+az^2+\cdots)$ を代入します。先頭項は $\Delta(\Delta-d)=m^2L^2$ により消えます。$z^{\Delta+2}$ の係数を合わせると

$$
a\{(\Delta+2)(\Delta+2-d)-m^2L^2\}-|k|^2=0.
$$

括弧を因数分解すると $2(2\Delta+2-d)$ です。従って $2\Delta+2-d\ne0$ なら

$$
a=\frac{|k|^2}{2(2\Delta+2-d)}.
$$

遅い根 $\Delta=\Delta_-=d/2-\nu$ では分母は $4(1-\nu)$ です。**$\nu=1$ で消える**ので、その場合は単純な $z^{\Delta_-+2}$ 補正の仮定が破れ、共鳴対数を許す必要があります。この失敗は単なる書式上の例外ではなく、低次の係数を逐次求める再帰の分母が零になることです。特に境界方向の波数が零なら分子も零になり、この対数強制は消えることに注意してください。

## 6. 演習と詳細解答

<a id="ex-holo8-a1"></a>
### A1. 質量から二指数を求める

- Level: A
- 問題: $d=4$、$m^2L^2=-3$ とする。BF下限、$\nu$、$\Delta_\pm$ を求め、両根を $\Delta(\Delta-d)$ に代入して検算せよ。

<!-- solution-start -->
**詳細解答。** BF下限は $-d^2/4=-4$ なので $-3>-4$。$\nu=\sqrt{4-3}=1$、$\Delta_-=2-1=1$、$\Delta_+=2+1=3$ です。代入すると $1(1-4)=-3$、$3(3-4)=-3$ で二つとも指定質量を返します。$\nu=1$ はBF下限より上ですが、代替量子化の開いた窓には入りません。
<!-- solution-end -->

<a id="ex-holo8-a2"></a>
### A2. 重根で対数が必要な理由

- Level: A
- 問題: $d=2$、$m^2L^2=-1$、$k=0$ とする。$f=z(A+B\log(z/\ell))$ が [径方向方程式](#ref-holo8-radial-equation) を満たすことを導関数から直接確かめよ。

<!-- solution-start -->
**詳細解答。** $f'=A+B\log(z/\ell)+B$、$f''=B/z$。式 [径方向方程式](#ref-holo8-radial-equation) は $z^2f''-zf'+f=0$ です。左辺は $Bz-z(A+B\log(z/\ell)+B)+z(A+B\log(z/\ell))=0$。対数を取らずに $Az+Bz$ と置くと二項は同じ解なので一次独立ではありません。
<!-- solution-end -->

<a id="ex-holo8-a3"></a>
### A3. KG重みと可積分性

- Level: A
- 問題: $d=4$、$\nu=3/4$ の二つの先頭冪について、KG積分の被積分関数の $z$ の指数と収束性を答えよ。

<!-- solution-start -->
**詳細解答。** $\Delta_-=2-3/4=5/4$、$\Delta_+=11/4$。KG重みは $z^{1-d}=z^{-3}$ なので、遅い側は $z^{-3+2(5/4)}=z^{-1/2}$、速い側は $z^{-3+2(11/4)}=z^{5/2}$。$\int_0^{z_0}z^{-1/2}dz=2\sqrt{z_0}$、$\int_0^{z_0}z^{5/2}dz=(2/7)z_0^{7/2}$ ともに有限です。
<!-- solution-end -->

<a id="ex-holo8-a4"></a>
### A4. 二係数の流束

- Level: A
- 問題: $d=3$、$\nu=1/2$、$L=1$、$(A_1,B_1)=(1,2)$、$(A_2,B_2)=(3,4)$ とする。$\mathcal F_z$ を計算し、$B=2A$ を両解に課した場合との違いを説明せよ。

<!-- solution-start -->
**詳細解答。** [流束式](#prop-holo8-boundary-flux)に各係数を代入すると $\mathcal F_z=2(1/2)(1\cdot4-3\cdot2)=-2$。異なる傾きの係数組なので流束は零ではありません。両解が $B=2A$ を満たせば $A_1B_2-A_2B_1=2A_1A_2-2A_2A_1=0$ となり、任意の二解の流束が消えます。
<!-- solution-end -->

<a id="ex-holo8-a5"></a>
### A5. 境界次元候補を確認する

- Level: A
- 問題: $d=3$、$m^2L^2=0$ における二つの零波数冪と、標準辞書での演算子次元候補を求めよ。遅い冪のKG可積分性も判定せよ。

<!-- solution-start -->
**詳細解答。** $\nu=\sqrt{9/4}=3/2$、$\Delta_-=0$、$\Delta_+=3$。零波数解は $A+Bz^3$。標準辞書の候補は $\Delta_+=3$ です。遅い側のKG被積分関数は $z^{1-3+0}=z^{-2}$ であり、$\int_\delta^{z_0}z^{-2}dz=\delta^{-1}-z_0^{-1}$ は発散します。したがって定数モードを境界の動的自由度として無条件には採用できません。
<!-- solution-end -->

<a id="ex-holo8-b1"></a>
### B1. BF下限の平方完成を再導出する

- Level: B
- 問題: $d\ge2$、$u\in C_c^\infty(0,\infty)$、$f=z^{d/2}u$ とする。積分 $\int z^{1-d}(f')^2dz$ を展開し、Hardy型下限を証明せよ。コンパクト台を外すときに必要になる端点条件も述べよ。

<!-- solution-start -->
**詳細解答。** $f'=z^{d/2-1}(du/2+zu')$ だから $z^{1-d}(f')^2=z^{-1}(d^2u^2/4+dzuu'+z^2(u')^2)$。積分すると交差項は $d\int uu'dz=(d/2)[u^2]_0^\infty=0$（コンパクト台）。従って

$$
\int_0^\infty z^{1-d}(f')^2dz
=\frac{d^2}{4}\int_0^\infty z^{-d-1}f^2dz
+\int_0^\infty z(u')^2dz
\ge\frac{d^2}{4}\int_0^\infty z^{-d-1}f^2dz.
$$

非コンパクト台に拡張するときは、各積分の収束と端点の $u^2$ の境界差が零になること、またはその項を正しく保持する境界条件が必要です。境界の寄与を勝手に消して一般の作用の正値性としません。
<!-- solution-end -->

<a id="ex-holo8-b2"></a>
### B2. 境界窓の端点

- Level: B
- 問題: $d=4$ で $m^2L^2=-4,-15/4,-3$ の三つの場合を比較し、$\nu$、零波数解の形、遅いモードのKG可積分性、代替量子化の通常の窓に入るかをそれぞれ判定せよ。

<!-- solution-start -->
**詳細解答。** $d^2/4=4$。$m^2L^2=-4$ では $\nu=0$ で $f=z^2(A+B\log(z/\ell))$。KG重みは $z^{-3}$、被積分は $z(A+B\log(z/\ell))^2$ で有限ですが、二つの異なる次元がないため通常の $0<\nu<1$ の代替窓とは別扱いです。$-15/4$ なら $\nu=\sqrt{4-15/4}=1/2$、$f=Az^{3/2}+Bz^{5/2}$、遅い側の被積分は $z^{-3+3}=1$ で有限、窓に入ります。$-3$ なら $\nu=1$、$k=0$ で $f=Az+Bz^3$、遅い側の被積分は $z^{-3+2}=z^{-1}$ なので対数発散し、窓の上端には含みません。
<!-- solution-end -->

<a id="ex-holo8-b3"></a>
### B3. 波数が共鳴を強制する

- Level: B
- 問題: $d=4$、$m^2L^2=-3$、$|k|>0$ で遅い根 $\Delta_-=1$ を使う。$f(z)=z(1+az^2+\cdots)$ という試行がなぜ矛盾するかを式 [径方向方程式](#ref-holo8-radial-equation) から示せ。$k=0$ の場合も比較せよ。

<!-- solution-start -->
**詳細解答。** $d=4$、$m^2L^2=-3$ の [径方向方程式](#ref-holo8-radial-equation) は $z^2f''-3zf'-(|k|^2z^2-3)f=0$。$f=z+az^3+\cdots$ を代入すると $z$ の係数は $0-3+3=0$、$z^3$ の係数は $6a-9a+3a-|k|^2=-|k|^2$。$|k|>0$ では $a$ をどう選んでも消せず、冪級数だけの仮定が破れます。$z^3\log z$ のような項は $z^3$ の係数を作れるため、対数補正を検討する必要があります。$k=0$ なら障害 $-|k|^2$ は零で、$z$ と $z^3$ は厳密解です。
<!-- solution-end -->

<a id="ex-holo8-b4"></a>
### B4. 対数モードの流束とスケール

- Level: B
- 問題: BF端点 $\nu=0$ の二解 $f_j=z^{d/2}(A_j+B_j\log(z/\ell))$ について、反対称流束を微分から求めよ。$\ell'=c\ell$ としたとき同じ関数を表す新係数 $A_j',B_j'$ を計算し、流束が変わらないことを示せ。

<!-- solution-start -->
**詳細解答。** $s=\log(z/\ell)$ とすると $f_j'=z^{d/2-1}\{(d/2)(A_j+B_js)+B_j\}$。差 $f_1f_2'-f_2f_1'$ の $(d/2)$ 項は相殺され、$z^{d-1}\{(A_1+B_1s)B_2-(A_2+B_2s)B_1\}=z^{d-1}(A_1B_2-A_2B_1)$ が残ります。$L^{d-1}z^{1-d}$ を掛けると $L^{d-1}(A_1B_2-A_2B_1)$。$\ell'=c\ell$ なら $\log(z/\ell)=\log(z/\ell')+\log c$ だから $A_j'=A_j+B_j\log c$、$B_j'=B_j$。従って $A_1'B_2'-A_2'B_1'=(A_1+B_1\log c)B_2-(A_2+B_2\log c)B_1=A_1B_2-A_2B_1$。流束は不変でも個々の定数項はスケール依存です。
<!-- solution-end -->

<a id="ex-holo8-c1"></a>
### C1. 質量、次元、境界条件を統合判定する

- Level: C
- 問題: $d=3$、$L>0$、$m^2L^2=-2$ の自由スカラーを考え、$k=0$ の紫外側の解を使う。次の各段階を実行せよ。
  1. BF下限、$\nu$、$\Delta_\pm$、二つの独立解を求め、両モードの局所KG正規化可能性を直接積分で確かめる。
  2. $f(z)=Az+Bz^2$ とし、$z=\epsilon$ 面での [HOLO7の法線運動量密度](../HOLO7/index.md#def-holo7-cutoff-flux) を求める。$A$ を固定したことと $f(\epsilon)$ を固定したことが同じでない理由を説明する。
  3. 任意の二解の反対称流束を計算し、$B=\kappa A$（実 $\kappa$）が流束を消すことを検算する。
  4. 標準選択と代替選択の境界演算子次元候補を求め、BF端点 $m^2L^2=-9/4$ へ同じ二冪の説明をそのまま流用できない理由を述べる。

<!-- solution-start -->
**詳細解答。**

**1.** $-d^2/4=-9/4<-2$ なので下限以上であり、$\nu=\sqrt{9/4-2}=1/2$、$\Delta_-=1$、$\Delta_+=2$。零波数Euler方程式の一般解は $f=Az+Bz^2$。KG重みは $z^{1-d}=z^{-2}$ だから $f_-=z$ には $\int_0^{z_0}z^{-2}z^2dz=z_0$、$f_+=z^2$ には $\int_0^{z_0}z^{-2}z^4dz=z_0^3/3$ が対応し、両者とも有限です。

**2.** $\partial_zf=A+2Bz$ です。紫外面の外向き法線は [HOLO7の法線密度](../HOLO7/index.md#def-holo7-cutoff-flux) で負なので

$$
\pi_\epsilon=-L^{d-1}\epsilon^{1-d}f'(\epsilon)
=-L^2\epsilon^{-2}(A+2B\epsilon).
$$

一方 $f(\epsilon)=A\epsilon+B\epsilon^2$ なので、$A$ を固定しても $\epsilon>0$ では $B$ により場の値が変わり、$f(\epsilon)$ を固定すれば $A$ と $B$ は連動します。無限遠の係数と有限cutoffのDirichlet値を同一視できません。

**3.** $f_j=A_jz+B_jz^2$、$f_j'=A_j+2B_jz$ として

$$
f_1f_2'-f_2f_1'
=z^2(A_1B_2-A_2B_1).
$$

$L^2z^{-2}$ を掛けると $\mathcal F_z=L^2(A_1B_2-A_2B_1)$。$B_j=\kappa A_j$ を代入すれば $\mathcal F_z=L^2\kappa(A_1A_2-A_2A_1)=0$。固定した一つの境界条件の中で流束が消えることを示しましたが、すべての $\kappa$ が正のエネルギーを保証することまでは示していません。

**4.** 遅い指数は $\Delta_-=1$、速い指数は $\Delta_+=2$ なので、[境界選択の定義](#def-holo8-quantization-choices)により標準では次元 $2$、代替では次元 $1$ が候補です。BF端点へ移すと $\nu=0$、二根が $3/2$ で一致し、第二解は $z^{3/2}\log(z/\ell)$。二つの異なる冪と二つの異なる次元という根拠が失われ、対数のスケール依存と追加の境界条件を調べ直す必要があります。
<!-- solution-end -->

## 7. まとめと次講へ

- 境界に向かう零波数自由スカラーの冪は $\Delta(\Delta-d)=m^2L^2$ で決まる。境界方向の変化は後続の冪や対数を生む。
- BF下限 $m^2L^2=-d^2/4$ は、動径の二次形式の平方完成に現れる鋭い閾値である。負の質量二乗全体を排除しない。
- $0<\nu<1$ では二つの境界モードが局所KG可積分で、適切な流束・エネルギー・境界作用の条件の下で標準・代替の選択が可能になる。$\nu=0$ は対数を伴う別の端点問題である。
- 有限cutoffの法線応答と、renormalizedなCFT演算子の1点関数はまだ等置していない。

**次講HOLO9「GKPWと2点関数」**では、選んだ境界係数と赤外条件からbulk-to-boundary解を構成し、繰り込み済みon-shell作用の変分から2点関数を求めます。