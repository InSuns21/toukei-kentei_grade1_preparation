# DEF1-04 一次変形・同値・自己同型

<!-- definition-example-audit: strict -->

## 1. 変形を動かす方向と、座標の付け替えを分ける

前章の[Maurer–Cartan方程式](../DEF1-03/index.md#thm-def1-03-maurer-cartan)は、Beltrami微分を $\phi(t)=t\alpha+t^2\beta+\cdots$ と展開すると、一次では $\bar\partial_T\alpha=0$、二次では $\bar\partial_T\beta+\tfrac12[\alpha,\alpha]=0$ を要求した。また、[ゲージ変更の一次係数](../DEF1-03/index.md#prop-def1-03-gauge-linear)は $\alpha'=\alpha-\bar\partial_Tv$ だった。

ここで二つの問題を分離したい。

1. **変形の方向**：一次方程式を満たす $\alpha$ のうち、滑らかな座標の付け替えだけで消えるものはどれか。
2. **座標の自由度**：座標を動かすベクトル場 $v$ のうち、一次係数を全く変えないものはどれか。

前者は一次変形の分類、後者は無限小自己同型の問題である。見かけの自由度を取り除く前後の空間を区別しないと、二種類の「次元」を混同してしまう。

$X$ は複素次元 $n\ge1$ の複素多様体とする。$T_X=T^{1,0}X$ は正則接束、$\mathcal A^{0,q}(X,T_X)$ はその滑らかな接束値 $(0,q)$ 形式の空間、$\bar\partial_T$ は[正則ベクトル束版Dolbeault複体](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)の微分である。特に局所正則座標では

$$
\begin{aligned}
v&=\sum_i v^i(z,\bar z)\partial_{z^i},\\
\bar\partial_Tv&=\sum_{i,j}\partial_{\bar z^j}v^i
\,d\bar z^j\otimes\partial_{z^i},\\
(\bar\partial_T\alpha)^i_{\bar j\bar k}
&=\partial_{\bar z^j}\alpha^i_{\bar k}
-\partial_{\bar z^k}\alpha^i_{\bar j}
\quad (j<k).
\end{aligned}
$$

微分が二回続くと零になるため、完全形式は必ず閉形式である。そこで閉形式の空間と完全形式の空間を

$$
\begin{aligned}
Z_T^{0,1}(X)&=\ker\bigl(
\bar\partial_T:\mathcal A^{0,1}(X,T_X)
\to\mathcal A^{0,2}(X,T_X)\bigr),\\
B_T^{0,1}(X)&=\operatorname{im}\bigl(
\bar\partial_T:\mathcal A^{0,0}(X,T_X)
\to\mathcal A^{0,1}(X,T_X)\bigr)
\end{aligned}
$$

と書く。$B_T^{0,1}(X)\subset Z_T^{0,1}(X)$ である。既習の[一次複素構造変形の分類](../../CYG/CYG1-12/index.md#thm-cyg1-12-first-order-classification)は

$$
Z_T^{0,1}(X)/B_T^{0,1}(X)
=H_{\bar\partial}^{0,1}(X,T_X)
\simeq H^1(X,T_X)
$$

と述べている。右端は正則接束の層コホモロジーであり、**一次の形式的方向**を数える。非線形な二次以上の可解性まで保証する式ではない。

## 2. 同じ一次変形を作る座標の自由度

なぜ閉形式を完全形式で割るのかを、作用する側から読み直そう。前章の[Beltramiのゲージ同値](../DEF1-03/index.md#def-def1-03-gauge)で、恒等写像から始まる滑らかな座標変更を

$$
F_t(z)^i=z^i+t\,v^i(z,\bar z)+O(t^2)
$$

と書く。ここで $t$ は一次係数の計算では実パラメータとしてよく、$v$ は座標変更を生成する実ベクトル場の $(1,0)$ 成分である。実ベクトル場は $v+\bar v$ となる。$F_t$ の実Jacobianは $t=0$ で恒等行列だから、十分小さい $t$ と座標近傍で微分同相になる。一次の形式的議論では $t^2$ 以上を捨てる。

前章の計算の符号を引き継ぎ、$F_t$ で引き戻す側のBeltrami係数を $\alpha'$ とすると

$$
\alpha'=\alpha-\bar\partial_Tv.
$$

従って、座標変更をどれほど行っても、閉形式 $\alpha$ の属する商類は変わらない。一方、異なる二つのベクトル場 $v,w$ で $\bar\partial_Tv=\bar\partial_Tw$ となることもある。差 $v-w$ は何者だろうか。

**無限小安定化子**という言葉は、今の一次係数 $\alpha$ を変えない座標変更の生成元全体を意味する。座標を全く動かさない生成元だけでなく、座標自体は動かしても複素構造の一次係数は変えない生成元が含まれる。

<a id="def-def1-04-gauge-stabilizer"></a>

<!-- formal-statement-start -->
> **定義（一次ゲージ作用と無限小安定化子）**
>
> 複素多様体 $X$ の閉形式 $\alpha\in Z_T^{0,1}(X)$ と滑らかな接束切断 $v\in\mathcal A^{0,0}(X,T_X)$ に対し、一次ゲージ作用を

$$
v\cdot\alpha=\alpha-\bar\partial_Tv
$$

> と定める。$\alpha$ を変えない生成元、すなわち $v\cdot\alpha=\alpha$ を満たす $v$ の空間を一次ゲージ作用の無限小安定化子と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-04-gauge-stabilizer -->
**定義の確認**。$X=\mathbb C$ の座標 $z=x+iy$ 上で $v=\bar z\,\partial_z$ とすると

$$
\bar\partial_Tv
=\partial_{\bar z}\bar z\,d\bar z\otimes\partial_z
=d\bar z\otimes\partial_z.
$$

$\alpha=d\bar z\otimes\partial_z$ は複素次元1ゆえ閉形式であり、$v\cdot\alpha=0$ となる。これは非零の局所係数が座標変更で消える例である。

一方 $w=z\,\partial_z$ は $\partial_{\bar z}z=0$ より $\bar\partial_Tw=0$。$w$ 自体は非零でも $w\cdot\alpha=\alpha$ となる。後者が安定化子の例である。二つを同一視してはいけない。
<!-- definition-example-end -->

## 3. 完全列が $H^0$ と $H^1$ の役割を同時に示す

線形写像を並べた列が**完全**であるとは、隣接する写像について「前の写像の像＝次の写像の核」が各位置で成立することをいう。この用語の意味を固定してから、座標の自由度を一つの式にまとめる。

$H^0(X,T_X)$ は正則接束 $T_X$ の大域正則切断の空間である。$H^0$ は層コホモロジーの零次で、切断の集合そのものを意味する。[正則な複素接束の切断](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)は各正則座標で係数が正則となるものだった。従って上の $\bar\partial_T$ の成分式を使えば、$\bar\partial_Tv=0$ と各 $v^i$ の正則性は同値である。

<a id="prop-def1-04-gauge-exact"></a>

<!-- formal-statement-start -->
> **命題（一次ゲージ作用の完全列）**
>
> 任意の複素多様体 $X$ について、$q(\alpha)=[\alpha]$ を閉形式から一次変形の同値類への商写像とする。このとき次の複素ベクトル空間の列は完全である。

$$
0\longrightarrow H^0(X,T_X)
\xrightarrow{\ \iota\ }\mathcal A^{0,0}(X,T_X)
\xrightarrow{\ \bar\partial_T\ }Z_T^{0,1}(X)
\xrightarrow{\ q\ }H^1(X,T_X)
\longrightarrow0.
$$

> ここで $\iota$ は正則切断を滑らかな切断とみなす包含であり、最後の同型には[正則ベクトル束版Dolbeaultの定理](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)を用いる。従ってゲージ作用の無限小安定化子は $H^0(X,T_X)$ であり、一次変形の商空間は $H^1(X,T_X)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

左側の核は正則性の判定、中央の像は完全形式、右側の商は一次変形の分類に対応する。各箇所で像と核を別々に調べる。

<!-- proof-start -->
### 証明

まず $\iota$ は単なる包含なので単射であり、その前の零空間の像も $\ker\iota=\{0\}$ である。

次に $v=\sum_i v^i\partial_{z^i}$ と書く。$\bar\partial_Tv=0$ なら、全ての局所正則座標で

$$
\partial_{\bar z^j}v^i=0
\qquad(1\le i,j\le n).
$$

滑らかな係数 $v^i$ のCauchy–Riemann方程式が成立するので各 $v^i$ は正則である。正則接枠間の変換則は既に[複素接枠と成分列の変換則](../../CM/CM1-05/index.md#thm-cm1-05-frame-change)で与えられており、各座標での正則性は一枚に貼り合わさる。よって $v$ は大域正則切断である。逆に大域正則切断なら各係数の反正則偏微分が零だから

$$
\ker\bar\partial_T=H^0(X,T_X)=\operatorname{im}\iota.
$$

$\bar\partial_T^2=0$ は[Dolbeault複体の定義](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-complex)から従い、$\bar\partial_Tv$ は必ず $Z_T^{0,1}(X)$ に入る。商写像 $q$ の核は

$$
\begin{aligned}
q(\alpha)=0
&\quad\Longleftrightarrow\quad[\alpha]=[0]\\
&\quad\Longleftrightarrow\quad
\alpha=\bar\partial_Tv\text{ となる大域滑らかな }v\text{ が存在}\\
&\quad\Longleftrightarrow\quad
\alpha\in\operatorname{im}\bar\partial_T.
\end{aligned}
$$

これは[一次変形の分類](../../CYG/CYG1-12/index.md#thm-cyg1-12-first-order-classification)の同値関係そのものである。任意の $H^1$ の元は定義から閉形式の類 $[\alpha]$ と表せるので $q$ は全射である。従って各箇所で像と核が一致し、列は完全である。最後に[ゲージ作用の定義](#def-def1-04-gauge-stabilizer)で $v\cdot\alpha=\alpha$ と $\bar\partial_Tv=0$ が同値であるため、安定化子の同定も従う。$\square$
<!-- proof-end -->

ここで大切なのは $H^0$ と $H^1$ の**意味の差**である。$H^1$ は互いに異なる一次変形の方向、$H^0$ は同じ方向を保つ無限小の座標自由度を表す。$H^0$ の次元を $H^1$ から機械的に引くわけではない。$H^1$ はすでに $\bar\partial_Tv$ という座標変更の像で割った空間だからである。

## 4. $H^0(X,T_X)$ はなぜ無限小正則自己同型なのか

正則自己同型とは、$X$ から自身への正則な微分同相で、逆写像も正則なものをいう。恒等写像から始まる自己同型を微小に動かしたときの最初の速度を考えれば、それは各座標で正則係数を持つベクトル場になる。逆に正則ベクトル場は、少なくとも点の近くで一次の正則座標変更を与える。

<a id="thm-def1-04-infinitesimal-aut"></a>

<!-- formal-statement-start -->
> **定理（無限小正則自己同型と零次コホモロジー）**
>
> $X$ を複素多様体とする。恒等写像を起点として局所正則座標で $F_t(z)=z+t\,v(z)+O(t^2)$ と書ける正則な自己同型の一次速度 $v$ は大域正則接束切断である。逆に任意の $v\in H^0(X,T_X)$ は、各点の近傍で正則な一次座標変換を与える。そのような無限小正則自己同型の複素ベクトル空間は

$$
H^0(X,T_X)=\ker\bigl(
\bar\partial_T:\mathcal A^{0,0}(X,T_X)
\to\mathcal A^{0,1}(X,T_X)\bigr)
$$

> であり、一次ゲージ作用の安定化子と一致する。ここで「一次」は局所的・形式的な意味であり、非コンパクト $X$ 上の全ベクトル場がすべての複素時間にわたる大域自己同型を生成するとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

正則写像をパラメータで微分して得る速度は $\bar\partial_T$ で閉じる。一方、正則速度 $v$ を用いた $z+tv(z)$ は微分が単位行列に近いので、局所逆写像を持つ。

<!-- proof-start -->
### 証明

各座標近傍で $F_t^i(z)$ が $z$ について正則なら、$\partial_{\bar z^j}F_t^i=0$ である。$t=0$ で微分し、$F_0^i(z)=z^i$ と置くと

$$
0=\left.\frac{d}{dt}\right|_{t=0}
\partial_{\bar z^j}F_t^i
=\partial_{\bar z^j}v^i.
$$

ここで微分の交換は $F_t$ が $t,z$ に関して必要な $C^1$ 正則性を持つことから従う。従って $v$ は正則であり、[完全列の命題](#prop-def1-04-gauge-exact)より $v\in H^0(X,T_X)$。

逆向きは $v$ が大域正則切断だとする。点 $p$ の正則座標 $z$ で $v=\sum_i v^i(z)\partial_{z^i}$ と書き、

$$
G_t(z)=z+t\,v(z)
$$

と置く。各成分は $z$ に正則であり、正則Jacobian行列は

$$
D_zG_t=I+tD_zv.
$$

$t=0$ で行列式は1だから、$p$ の十分小さい近傍と十分小さい $t$ では可逆である。[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により局所逆が存在し、複素線形の微分が可逆な正則写像の逆は[正則逆写像の命題](../../CM/CM1-02/index.md#prop-cm1-02-biholomorphic-inverse)により正則になる。座標の重なりでは $v$ の接束としての変換則が成り立つので、一次速度は座標に依存しない。これは一次の局所的な構成であって、$G_t$ をそのまま二次以上の大域自己同型だとは主張していない。

最後に [一次ゲージ作用](#def-def1-04-gauge-stabilizer)の $v\cdot\alpha=\alpha-\bar\partial_Tv$ へ代入すれば、$v$ が一次係数を保つことと $\bar\partial_Tv=0$ は同値である。$\square$
<!-- proof-end -->

### 具体例：楕円曲線の並進と射影直線の正則ベクトル場

楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上では正則接束が $\partial_z$ で自明化される。大域正則ベクトル場は $f(z)\partial_z$ と書ける。係数 $f$ は格子周期を持つ大域正則関数であり、コンパクト性と[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)から定数である。従って

$$
H^0(E,T_E)=\mathbb C\partial_z.
$$

実際に $v=c\partial_z$ の動きは $F_t([z])=[z+tc]$ であり、格子同値を保ち、逆写像は $F_{-t}$。$c\ne0$ なら点は動くが、複素構造の一次係数は不変である。

射影直線 $X=\mathbb{CP}^1$ では $z$ と $w=1/z$ の重なりで

$$
\partial_z=-w^2\partial_w,\qquad
z\partial_z=-w\partial_w,\qquad
z^2\partial_z=-\partial_w.
$$

右辺は $w=0$ まで正則に延長するため、三つとも大域正則ベクトル場である。[射影直線の接束と正則切断](../../CM/CM2-08/index.md#thm-cm2-08-projective-tangent)から、これらは全ての大域正則ベクトル場の基底となり、$\dim_{\mathbb C}H^0(X,T_X)=3$ である。$H^0$ が大きいことだけから、$H^1$ の変形方向が多いと推測してはいけない。

非コンパクトな $X=\mathbb C$ では $v=z^2\partial_z$ も正則だが、その積分曲線は初期値 $z_0$ に対して

$$
\frac{dz(t)}{dt}=z(t)^2,\qquad
\frac1{z(t)}=\frac1{z_0}-t,\qquad
z(t)=\frac{z_0}{1-tz_0}.
$$

$z_0\ne0$ とすると $t=1/z_0$ で発散する。**無限小自己同型**と、全時間で定義された**大域的な自己同型族**は異なる。

## 5. 楕円曲線で閉形式、完全形式、安定化子を区別する

同じ楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ に戻ろう。$z=x+iy$ の $x,y$ はそれぞれ周期1を持ち、$dz,d\bar z,\partial_z$ は商へ降りる。複素次元1なので全ての接束値 $(0,1)$ 形式は閉である。しかし、それらが全て完全とは限らない。

定数 $c\in\mathbb C$ に対し

$$
\alpha_c=c\,d\bar z\otimes\partial_z
$$

を考える。もし $\alpha_c=\bar\partial_T(f\partial_z)$ なら、滑らかな格子周期関数 $f$ が $\partial_{\bar z}f=c$ を満たす。$Q=[0,1]\times[0,1]$ で両辺を積分すると、$\partial_{\bar z}=(\partial_x+i\partial_y)/2$ より

$$
\begin{aligned}
c&=\int_Q c\,dx\,dy
=\frac12\int_0^1\bigl(f(1,y)-f(0,y)\bigr)\,dy\\
&\quad+\frac{i}{2}\int_0^1
\bigl(f(x,1)-f(x,0)\bigr)\,dx=0.
\end{aligned}
$$

格子周期性が境界項を消した。従って $c\ne0$ の $\alpha_c$ は閉だが完全ではなく、**非零の一次変形類**を表す。[トーラスの定数係数一次変形](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)を $n=1$ に適用すれば、これらの類だけで $H^1(E,T_E)\simeq\mathbb C$ 全体を張る。

一方 $f(x,y)=\sin(2\pi x)$ は周期関数なので、大域的な滑らかな接束切断 $v=f\partial_z$ を与え、

$$
\bar\partial_Tv
=\frac12(2\pi\cos(2\pi x))\,d\bar z\otimes\partial_z
=\pi\cos(2\pi x)\,d\bar z\otimes\partial_z.
$$

この非零形式は完全であり、その一次変形類は零である。同じ複素多様体上に、消せない方向 $\alpha_1$ と、座標を替えれば消える方向 $\bar\partial_Tv$ が具体的に共存している。

## 6. Kodaira–Spencer写像と、一次だけで決まらないこと

[Kodaira–Spencer写像](../DEF1-01/index.md#def-def1-01-kodaira-spencer)は、実際の固有正則沈め込み $\pi:\mathcal X\to B$ と中心ファイバー $X$ から

$$
\operatorname{KS}_{\pi,b_0}:T_{b_0}^{1,0}B\longrightarrow H^1(X,T_X)
$$

を作った。これは族が持つ一次方向を、上で分類した商空間へ送る写像である。

実際の局所正則持ち上げの差 $\kappa_{ij}$ を、滑らかな $u_i$ で $u_j-u_i=\kappa_{ij}$ と書けば、[Čech–Dolbeault対応](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)によって $\bar\partial_Tu_i$ が大域閉形式 $\alpha$ に貼り合う。局所的な原始量を $u_i'=u_i+v|_{U_i}$ と一斉に取り替えると

$$
\bar\partial_Tu_i'=\alpha+\bar\partial_Tv.
$$

これは同じ $H^1$ の類である。前節までの一次ゲージ作用が **マイナス符号**だったのは引き戻す座標変更の向きを $\alpha'=\alpha-\bar\partial_Tv$ と取ったためであり、$u_i$ の変更を $+v$ とするČech側の記法とは矛盾しない。どちらも完全形式の分だけ代表を替えている。

ここで区別すべきことが三つある。

1. $\operatorname{KS}_{\pi,b_0}(\xi)=0$ は、その方向の**一次変化が自明**というだけで、族全体が自明とは限らない。例えば[基底変更の命題](../DEF1-01/index.md#prop-def1-01-base-change)で $\tau(s)=i+s^2$ とすれば $d\tau/ds|_{s=0}=0$ でも、$s\ne0$ のファイバーの複素構造は一般に変わる。
2. $H^1(X,T_X)$ の任意の類は、一次形式的変形を与える。しかし実際の族へ二次以上に延長できるかは、[次数別Maurer–Cartan方程式](../DEF1-03/index.md#prop-def1-03-order-equations)の次の条件を解く問題である。これは次章で調べる。
3. $H^0(X,T_X)$ は恒等写像付近の無限小自己同型を表すが、離散的な正則自己同型の作用を全て数えるものではない。

最後の点を楕円曲線で確かめよう。$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ の $r([z])=[iz]$ は格子を保つ正則自己同型であり、$r^4=\operatorname{id}$。一方、一次形式の引き戻しは $r^*d\bar z=-i\,d\bar z$ と $r^*\partial_z=i^{-1}\partial_z=-i\,\partial_z$ の積だから

$$
r^*(d\bar z\otimes\partial_z)
=(-i)^2\,d\bar z\otimes\partial_z
=-d\bar z\otimes\partial_z.
$$

つまり有限自己同型が非零の $H^1(E,T_E)$ の方向を符号反転させる。**一次変形類の空間 $H^1$**、そこへの**有限正則自己同型の作用**、**実際の局所モジュライ**は、同じものではない。

## 7. 演習――一次の商、核、座標自由度を計算する

<a id="ex-def1-04-a01"></a>
#### DEF1-04-A01 複素平面で一次の座標変更を作る
- Level: A

$X=\mathbb C$ とし、$\alpha=\bar z\,d\bar z\otimes\partial_z$ を考える。$\alpha$ が一次閉条件を満たすことを確かめ、$\alpha$ を零へ移す滑らかな一次ゲージ生成元 $v$ を一つ構成せよ。

<!-- solution-start -->
**詳細解答。** 複素次元1では接束値 $(0,2)$ 形式が存在しないので $\bar\partial_T\alpha=0$。よって $\alpha$ は[一次閉条件](../DEF1-02/index.md#prop-def1-02-linear-integrability)を満たす。

ゲージで消すための条件は[一次ゲージの定義](#def-def1-04-gauge-stabilizer)から $\bar\partial_Tv=\alpha$ である。$v=f\partial_z$ と置けば $\partial_{\bar z}f=\bar z$ を解けばよい。$\partial_{\bar z}(\bar z^2)=2\bar z$ なので

$$
v=\frac12\bar z^2\partial_z,\qquad
\bar\partial_Tv=\bar z\,d\bar z\otimes\partial_z=\alpha.
$$

従って $v\cdot\alpha=\alpha-\bar\partial_Tv=0$。係数が零でないことと、商類が零でないことは異なる。
<!-- solution-end -->

<a id="ex-def1-04-a02"></a>
#### DEF1-04-A02 変形を保つ生成元を判定する
- Level: A

$X=\mathbb C$ の二つの滑らかな接束切断 $v=z^2\partial_z$、$w=\bar z\,\partial_z$ について $\bar\partial_Tv,\bar\partial_Tw$ を計算せよ。任意の閉形式 $\alpha$ に対し、どちらが一次ゲージ作用の無限小安定化子に入るか判定せよ。

<!-- solution-start -->
**詳細解答。** [接束値Dolbeault微分](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)を座標成分へ作用させると

$$
\begin{aligned}
\bar\partial_Tv
&=\partial_{\bar z}(z^2)\,d\bar z\otimes\partial_z=0,\\
\bar\partial_Tw
&=\partial_{\bar z}\bar z\,d\bar z\otimes\partial_z
=d\bar z\otimes\partial_z.
\end{aligned}
$$

従って $v\cdot\alpha=\alpha$、$w\cdot\alpha=\alpha-d\bar z\otimes\partial_z\ne\alpha$。[安定化子の定義](#def-def1-04-gauge-stabilizer)により $v$ だけが入る。$v$ が非零でも、その動きは複素構造を一次では変えない。
<!-- solution-end -->

<a id="ex-def1-04-a03"></a>
#### DEF1-04-A03 閉条件に失敗する候補と完全な候補
- Level: A

$X=\mathbb C^2$ 上で

$$
\alpha=\bar z^1\,d\bar z^2\otimes\partial_{z^1},\qquad
\beta=\bar z^1\,d\bar z^1\otimes\partial_{z^2}
$$

とする。各形式の $\bar\partial_T$ を成分で求め、一次変形の候補になるか判定せよ。候補になるものについて、完全かどうかも調べよ。

<!-- solution-start -->
**詳細解答。** $(0,2)$ 成分の[微分公式](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-dolbeault)では、$(\bar1,\bar2)$ 成分は第一の反正則偏微分から第二の偏微分を引いたものになる。$\alpha^1_{\bar2}=\bar z^1$ だけが非零なので

$$
(\bar\partial_T\alpha)^1_{\bar1\bar2}
=\partial_{\bar z^1}(\bar z^1)
-\partial_{\bar z^2}(0)=1.
$$

従って $\bar\partial_T\alpha=d\bar z^1\wedge d\bar z^2\otimes\partial_{z^1}\ne0$ であり、$\alpha$ は一次変形の候補ではない。

$\beta$ では $\beta^2_{\bar1}=\bar z^1$ だけが非零であり、

$$
(\bar\partial_T\beta)^2_{\bar1\bar2}
=\partial_{\bar z^1}(0)-\partial_{\bar z^2}(\bar z^1)=0.
$$

よって $\beta$ は閉形式である。さらに

$$
u=\frac12(\bar z^1)^2\partial_{z^2},
\qquad
\bar\partial_Tu
=\bar z^1\,d\bar z^1\otimes\partial_{z^2}=\beta
$$

だから完全であり、$\beta$ の類は零。閉でない形式はそもそも商 $Z_T^{0,1}/B_T^{0,1}$ の元にならない。
<!-- solution-end -->

<a id="ex-def1-04-a04"></a>
#### DEF1-04-A04 楕円曲線の定数係数は消せるか
- Level: A

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上で $\alpha_c=c\,d\bar z\otimes\partial_z$（$c\in\mathbb C$）とする。$\alpha_c$ が閉形式であることと、$\alpha_c$ が完全形式であるための必要十分条件を、周期積分で説明せよ。

<!-- solution-start -->
**詳細解答。** 複素次元1なので $\bar\partial_T\alpha_c=0$。完全なら大域的な滑らかな格子周期関数 $f$ が存在し $\partial_{\bar z}f=c$ を満たす。$Q=[0,1]^2$ で

$$
\begin{aligned}
c&=\int_Q\partial_{\bar z}f\,dx\,dy
=\frac12\int_0^1(f(1,y)-f(0,y))\,dy\\
&\quad+\frac i2\int_0^1(f(x,1)-f(x,0))\,dx=0
\end{aligned}
$$

となる。したがって必要条件は $c=0$。逆に $c=0$ なら $\alpha_c=0=\bar\partial_T0$ だから完全である。結論は

$$
\alpha_c\in B_T^{0,1}(E)
\quad\Longleftrightarrow\quad c=0.
$$
<!-- solution-end -->

<a id="ex-def1-04-b01"></a>
#### DEF1-04-B01 楕円曲線で変形方向と座標方向を分離する
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$z=x+iy$ で

$$
\alpha=\bigl(2+\pi\cos(2\pi x)\bigr)
\,d\bar z\otimes\partial_z
$$

を考える。$\alpha$ の閉性を示し、具体的な大域ゲージ生成元で定数係数の代表へ移し、その同値類が零でないことを証明せよ。

<!-- solution-start -->
**詳細解答。** 複素次元1なので $\bar\partial_T\alpha=0$。$\sin(2\pi x)$ は $x,y$ について格子周期を持つ滑らかな関数だから

$$
v=\sin(2\pi x)\partial_z
$$

は $E$ 上の大域滑らかな接束切断である。$\partial_{\bar z}=(\partial_x+i\partial_y)/2$ と $f_y=0$ を使い

$$
\bar\partial_Tv
=\frac12(2\pi\cos(2\pi x))
\,d\bar z\otimes\partial_z
=\pi\cos(2\pi x)\,d\bar z\otimes\partial_z.
$$

従って[ゲージ作用](#def-def1-04-gauge-stabilizer)で

$$
v\cdot\alpha
=\alpha-\bar\partial_Tv
=2\,d\bar z\otimes\partial_z.
$$

もしこの代表が完全なら、$\partial_{\bar z}f=2$ の周期解が存在する。しかし $Q=[0,1]^2$ で積分した左辺は周期境界により0、右辺は2となり矛盾する。[完全列の命題](#prop-def1-04-gauge-exact)により $[\alpha]=[2\,d\bar z\otimes\partial_z]\ne0$ である。
<!-- solution-end -->

<a id="ex-def1-04-b02"></a>
#### DEF1-04-B02 局所原始量からČech類を構成する
- Level: B

$X$ を複素多様体、$\{U_i\}$ を各交叉が必要な計算に十分小さい正則座標開被覆とする。$\alpha\in Z_T^{0,1}(X)$ について各 $U_i$ 上の滑らかな接束切断 $u_i$ が $\bar\partial_Tu_i=\alpha|_{U_i}$ を満たすと仮定する。次を示せ。

1. $\kappa_{ij}=u_j-u_i$ は正則接束値Čech一次コサイクルである。
2. $\kappa_{ij}=h_j-h_i$ となる正則接束切断 $h_i$ が存在すれば、$\alpha$ は大域的に完全である。
3. $\alpha=\bar\partial_Tv$ となる大域的な滑らかな $v$ が存在すれば、$\kappa$ はČechコボーダリーである。

<!-- solution-start -->
**詳細解答。**

**(1)** $U_i\cap U_j$ 上では

$$
\bar\partial_T\kappa_{ij}
=\bar\partial_Tu_j-\bar\partial_Tu_i
=\alpha-\alpha=0.
$$

[大域正則接束切断の判定](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)を局所的に適用すると $\kappa_{ij}$ は正則である。三重交叉では

$$
\kappa_{ij}+\kappa_{jk}
=(u_j-u_i)+(u_k-u_j)
=u_k-u_i=\kappa_{ik},
$$

なのでČech閉条件も満たす。

**(2)** $\kappa_{ij}=h_j-h_i$ と仮定し、$v_i=u_i-h_i$ と置く。すると

$$
v_j-v_i=(u_j-u_i)-(h_j-h_i)=0.
$$

よって $v_i$ は大域的な滑らかな $v$ に貼り合う。$h_i$ は正則だから $\bar\partial_Th_i=0$ であり、

$$
\bar\partial_Tv|_{U_i}
=\bar\partial_T(u_i-h_i)=\alpha|_{U_i}.
$$

従って $\alpha=\bar\partial_Tv$ が全域で成立する。

**(3)** 逆に $\alpha=\bar\partial_Tv$ が大域的に成り立てば、$h_i=u_i-v|_{U_i}$ は正則である。さらに

$$
h_j-h_i=(u_j-v)-(u_i-v)=u_j-u_i=\kappa_{ij}
$$

だから $\kappa$ はコボーダリー。[Kodaira–SpencerのČech–Dolbeault対応](../DEF1-01/index.md#thm-def1-01-cech-dolbeault)と一致する。
<!-- solution-end -->

<a id="ex-def1-04-b03"></a>
#### DEF1-04-B03 射影直線の無限小自己同型を全て求める
- Level: B

$X=\mathbb{CP}^1$、標準チャート $U_0$ の座標を $z$、無限遠を含むチャート $U_\infty$ の座標を $w=1/z$ とする。$U_0$ 上の正則ベクトル場 $f(z)\partial_z$ が $X$ 全体の正則ベクトル場へ延長する条件を求め、$H^0(X,T_X)$ の基底と次元を示せ。

<!-- solution-start -->
**詳細解答。** [複素接枠と成分列の変換則](../../CM/CM1-05/index.md#thm-cm1-05-frame-change)で $dw/dz=-z^{-2}=-w^2$ だから

$$
f(z)\partial_z
=-w^2f(1/w)\partial_w.
$$

$U_0\simeq\mathbb C$ で $f$ は整関数であり、無限遠での延長条件は $w^2f(1/w)$ が $w=0$ で正則なことである。これはある定数 $M$ について大きい $|z|$ で $|f(z)|\le M|z|^2$ が成り立つことを意味する。[Cauchyの導関数評価](../../../解析系/CA/CA3/index.md#thm-ca3-cauchy-estimate)を半径 $R\to\infty$ に適用すると、$k\ge3$ に対して

$$
|f^{(k)}(0)|\le
\frac{k!}{R^k}\max_{|z|=R}|f(z)|
\le k!M R^{2-k}\longrightarrow0.
$$

従って三次以上のTaylor係数は零で、

$$
f(z)=a+bz+cz^2.
$$

逆にこの形なら $-w^2f(1/w)=-(aw^2+bw+c)$ は $w=0$ で正則なので延長する。よって

$$
H^0(\mathbb{CP}^1,T_{\mathbb{CP}^1})
=\operatorname{span}_{\mathbb C}
\{\partial_z,z\partial_z,z^2\partial_z\},
\qquad\dim_{\mathbb C}H^0=3.
$$

これらは[無限小自己同型の定理](#thm-def1-04-infinitesimal-aut)により一次ゲージ作用の安定化子である。
<!-- solution-end -->

<a id="ex-def1-04-b04"></a>
#### DEF1-04-B04 一次類が零でも族が自明とは限らない
- Level: B

上半平面内の $\tau$ に対する楕円曲線族 $E_\tau=\mathbb C/(\mathbb Z+\tau\mathbb Z)$ を考える。基準点を $\tau=i$ とし、複素パラメータ $s$ によって $\tau(s)=i+s^2$ と基底変更する。

1. $s=0$ でのKodaira–Spencer写像が零である理由を示せ。
2. この事実から「族が近傍で正則に自明」と結論できない理由を述べよ。
3. $H^1(E_i,T_{E_i})$ の次元と、零写像の意味を区別せよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $\tau'(s)=2s$ だから $\tau'(0)=0$。[Kodaira–Spencer写像の基底変更](../DEF1-01/index.md#prop-def1-01-base-change)で、合成族の一次写像はもとの写像と基底変更の微分の合成であり、

$$
\operatorname{KS}_{s=0}\!\left(\partial_s\right)
=\operatorname{KS}_{\tau=i}\!\left(
\tau'(0)\partial_\tau\right)
=\operatorname{KS}_{\tau=i}(0)=0.
$$

**(2)** 一点で一次写像が零でも、近傍の他点では零とは限らない。小さい $s_0\ne0$ を固定し、$\tau_0=i+s_0^2$ とする。基準ファイバーを $z=x+\tau_0y$（$x,y$ は周期1）で表すと、$\tau=\tau_0+u$ のファイバーにおける正則座標は

$$
w=z+uy,\qquad y=\frac{z-\bar z}{\tau_0-\bar\tau_0}.
$$

$w$ を消すBeltrami係数は、$\partial_{\bar z}w=-u/(\tau_0-\bar\tau_0)$ と $\partial_zw=1+u/(\tau_0-\bar\tau_0)$ から

$$
\mu(u)=\frac{u}{\tau_0-\bar\tau_0+u},\qquad
\left.\frac{d\mu}{du}\right|_{u=0}
=\frac1{\tau_0-\bar\tau_0}\ne0.
$$

この定数係数の一次類は、単位基本領域での周期積分により非零である。さらに $\tau'(s_0)=2s_0\ne0$ なので、[基底変更の命題](../DEF1-01/index.md#prop-def1-01-base-change)を適用すると $s_0$ での一次類は非零となる。もし $s=0$ の近傍で族が正則に自明なら、その近傍の全ての $s_0$ でKodaira–Spencer写像が零になるはずであり、矛盾する。従って $s=0$ での零写像から局所自明性は結論できない。

**(3)** [複素トーラスの定数係数一次変形](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)から $\dim_{\mathbb C}H^1(E_i,T_{E_i})=1$。一次変形類を分類する $H^1$ は一次元であるが、今回の基底方向 $\partial_s$ の写像先はその中の零ベクトルである。標的空間の次元1と与えられた族の写像の階数0は矛盾しない。
<!-- solution-end -->

<a id="ex-def1-04-c01"></a>
#### DEF1-04-C01 変形・ゲージ・自己同型を一つの楕円曲線で統合する
- Level: C

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$、$z=x+iy$ とし、$c\in\mathbb C$、$a\in\mathbb C$ に対して

$$
\alpha=\bigl(c+\pi\cos(2\pi x)\bigr)
\,d\bar z\otimes\partial_z,\qquad
v=\sin(2\pi x)\partial_z,\qquad
h=a\partial_z
$$

を考える。また $r:E\to E$ を $r([z])=[iz]$ とする。

1. $\alpha$ が一次可積分条件を満たすことを示し、$v$ によるゲージ変更後の代表を求めよ。
2. $[\alpha]=0$ となる $c$ の必要十分条件を周期積分で求めよ。
3. $h$ が任意の $\alpha$ の一次ゲージ安定化子に入ることを示し、$H^0(E,T_E)$ と $H^1(E,T_E)$ の双方の次元を求めよ。
4. $r$ が正則自己同型であることを確認し、$H^1(E,T_E)$ 上の作用を求めよ。これらの計算だけで、実際の局所モジュライが滑らかだと言えるか。

<!-- solution-start -->
**詳細解答。**

**(1)** 複素次元1なので接束値 $(0,2)$ 形式は零であり、$\bar\partial_T\alpha=0$ である。$v$ は滑らかで格子周期だから大域切断である。成分で微分すると

$$
\begin{aligned}
\bar\partial_Tv
&=\frac12(\partial_x+i\partial_y)\sin(2\pi x)
\,d\bar z\otimes\partial_z\\
&=\pi\cos(2\pi x)\,d\bar z\otimes\partial_z.
\end{aligned}
$$

[ゲージ作用の定義](#def-def1-04-gauge-stabilizer)に代入して

$$
v\cdot\alpha
=\alpha-\bar\partial_Tv
=c\,d\bar z\otimes\partial_z
$$

と得る。

**(2)** $c=0$ なら $\alpha=\bar\partial_Tv$ で完全である。逆に $[\alpha]=0$ なら、上の代表 $c\,d\bar z\otimes\partial_z$ も完全だから、大域周期関数 $f$ が $\partial_{\bar z}f=c$ を満たす。単位正方形での積分は

$$
\begin{aligned}
\int_Q\partial_{\bar z}f\,dx\,dy
&=\frac12\int_0^1(f(1,y)-f(0,y))\,dy\\
&\quad+\frac i2\int_0^1(f(x,1)-f(x,0))\,dx=0,
\end{aligned}
$$

一方 $\int_Qc\,dx\,dy=c$。従って $c=0$ が必要である。

**(3)** $h=a\partial_z$ は正則係数が定数なので $\bar\partial_Th=0$、従って $h\cdot\alpha=\alpha$。$E$ 上の任意の大域正則接束切断は $f(z)\partial_z$ と書け、$f$ はコンパクトな $E$ 上の正則関数なので[最大値原理](../../../解析系/CA/CA3/index.md#thm-ca3-maximum-modulus)から定数である。よって

$$
H^0(E,T_E)=\mathbb C\partial_z,
\qquad \dim_{\mathbb C}H^0(E,T_E)=1.
$$

他方、[複素トーラスの定数係数一次変形](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)から $H^1(E,T_E)$ は $[d\bar z\otimes\partial_z]$ で張られる一次元空間である。$H^0$ の1は安定化子の次元、$H^1$ の1は商に残る一次変形方向の次元であり、別々の意味を持つ。

**(4)** $i(\mathbb Z+i\mathbb Z)=\mathbb Z+i\mathbb Z$ なので $r$ は商上でwell-definedであり、逆は $[z]\mapsto[-iz]$ である。どちらも複素線形写像から降りるので正則。共変の $d\bar z$ は $-i$ 倍、反変の $\partial_z$ も微分 $i$ の逆で $i^{-1}=-i$ 倍になる。従って

$$
r^*(d\bar z\otimes\partial_z)
=(-i)(-i)d\bar z\otimes\partial_z
=-d\bar z\otimes\partial_z.
$$

よって $r^*[\alpha]=-[\alpha]$ である。これは有限自己同型が変形方向の商に非自明に作用することを示すが、**二次以上への可解性・解析的収束・局所完全性**は何も検査していない。従ってこれだけで滑らかな局所モジュライの存在を結論することはできない。
<!-- solution-end -->

## 8. 次は二次以上の障害へ

一次では $\bar\partial_T$ の閉形式を完全形式で割り、残った方向が $H^1(X,T_X)$、そのゲージ作用の核が $H^0(X,T_X)$ だった。この線形分類がわかっても、$[\alpha,\alpha]$ という二次項を $\bar\partial_T\beta$ で消せるかは別の問題である。次章ではこの右辺がどのコホモロジー類を定め、消えることと実際の変形族へ延長できることがどう違うかを調べる。
