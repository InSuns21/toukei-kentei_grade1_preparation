# HOLO4 対称性と境界CFT

<!-- definition-example-audit: strict -->

[HOLO1のAdS等長変換](../HOLO1/index.md#prop-holo1-linear-isometry)は埋め込み空間の直交変換から生まれました。[HOLO2の共形境界](../HOLO2/index.md#def-holo2-boundary-class)には計量の一つの代表ではなく共形類だけが指定されます。この二つは偶然一致するのでしょうか。それとも同じ変換を、バルクと境界から別々に見ているのでしょうか。

本講ではPoincaré座標の**実際の座標変換**を使い、バルク等長変換の境界への制限が共形変換となることを検算します。そのうえで既習の[スカラー一次場](../../QFT/QFT48/index.md#def-qft48-scalar-primary)、[共形Ward恒等式](../../QFT/QFT49/index.md#thm-qft49-conformal-current)と[演算子積展開（OPE）](../../QFT/QFT54/index.md#def-qft54-ope)を結びます。対称性が決める相関関数の**形**と、AdS/CFTという力学的同一性の主張とは分けます。

整数 $d\ge3$、曲率半径 $L>0$ とします。Lorentz境界座標を $x^\mu=(t,y^1,\ldots,y^{d-1})$、$\eta_{\mu\nu}=\operatorname{diag}(-1,+1,\ldots,+1)$、$x^2=\eta_{\mu\nu}x^\mu x^\nu$ と書き、繰り返し添字を縮約します。実際のWard相関関数はEuclid空間 $\mathbb R^d$ の相異なる挿入点に限定し、その節だけ内積を正定値にします。背景は純粋AdSで、$L$ を変えず、重力の逆反作用は扱いません。

## 1. 等長変換が境界で「共形」になる意味

### 1.1 計量の代表を固定しない

[HOLO2のPoincaré計量](../HOLO2/index.md#prop-holo2-poincare-metric)は、$z>0$ のパッチで

$$
g=\frac{L^2}{z^2}(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu)
$$

です。$z/L$ の二乗を掛けると、境界 $z=0$ 上の計量代表は $h=\eta_{\mu\nu}dx^\mu dx^\nu$ になります。別の定義関数で延長すれば $h$ 自体は変わるものの、[境界計量の共形類](../HOLO2/index.md#def-holo2-boundary-class)は同じです。

従ってバルクで $F^*g=g$ を満たす変換が境界まで適切に延びる場合、境界で $h$ を厳密に固定する必要はありません。正の関数倍まで保てば十分です。ここで境界への制限は大域的に存在するとは限らず、以下では**変換とその逆が滑らかな開領域**を選びます。

<a id="def-holo4-induced-boundary-action"></a>

<!-- formal-statement-start -->
> **定義（境界へ誘導される共形作用）**
>
> $d\ge3$、$L>0$、$g=L^2z^{-2}(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu)$ のPoincaréパッチの開部分領域を考える。$F$ はその領域上の滑らかな等長微分同相（像との一対一対応）で、$z=0$ の境界へ $F(0,x)=(0,f(x))$ と滑らかに延びるとする。さらに $f$ が境界上の開領域で滑らかな逆写像をもち、正の関数 $\Omega_f(x)$ について

$$
f^*h=\Omega_f(x)^2h
$$

> を満たすとき、$f$ をそのバルク等長変換から**境界へ誘導される共形作用**と呼ぶ。ここで $h=\eta_{\mu\nu}dx^\mu dx^\nu$ とし、等号は境界接ベクトル上の双線形形式の等号である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-holo4-induced-boundary-action -->
**定義の確認（拡大縮小）**：$\lambda>0$ として $F_\lambda(z,x)=(\lambda z,\lambda x)$ を取ります。逆写像は $F_{1/\lambda}$ で、$z>0$ を保ちます。計量へ代入すれば

$$
F_\lambda^*g=\frac{L^2}{(\lambda z)^2}
\left(\lambda^2dz^2+\lambda^2\eta_{\mu\nu}dx^\mu dx^\nu\right)=g.
$$

境界写像は $f_\lambda(x)=\lambda x$、Jacobianは $\lambda I$、従って $f_\lambda^*h=\lambda^2h$、$\Omega_f=\lambda>0$。等長性、延長、逆写像、境界の共形性という定義の全条件を満たしました。固定した $z=\epsilon$ 面は $z=\lambda\epsilon$ へ移るので、固定cutoffを保つ変換だとは主張していません。
<!-- definition-example-end -->

### 1.2 \(SO(2,d)\) と二種類の境界

[HOLO1の埋め込み](../HOLO1/index.md#def-holo1-ads-quadric)に用いた平坦空間は負符号二つ、正符号 $d$ 個の二次形式を持ちます。その二次形式を保つ行列群の単位元連結成分は $SO_0(2,d)$ です。対応するLie代数 $\mathfrak{so}(2,d)$ の次元は

$$
\frac{(d+2)(d+1)}{2}
=d+\frac{d(d-1)}2+1+d.
$$

右辺の四項は順に並進、Lorentz回転、拡大縮小、特殊共形変換の生成子数になります。**この一致が意味するのは局所的な対称Lie代数の対応**です。時間周期を解いた[普遍被覆AdS](../HOLO1/index.md#def-holo1-universal-cover)の大域等長群を、被覆の問題を無視してそのまま $SO(2,d)$ と同定してはいけません。

また上の $SO(2,d)$ は**時間一方向のLorentz境界**の大域共形対称性の局所代数を記述するものです。Euclid $d$ 次元空間を共形コンパクト化した場合の連結共形群の対応は $SO_0(1,d+1)$（精確な群作用では適切な中心による商に注意）で、$SO(2,d)$ ではありません。以下では共形変換の数式を両符号で検算しますが、両者の実Lie群を同一視しません。

## 2. Poincaré座標で四種類の変換を作る

並進、Lorentz変換、拡大縮小に加えて、境界座標に非線形に作用する**特殊共形変換**を作ります。まず $x$ に現れる二次式がなぜ動径 $z$ も含まなければならないかを、計量の等長性から確かめます。

$a^\mu\in\mathbb R^d$、$\lambda>0$、$\Lambda^T\eta\Lambda=\eta$ を満たすLorentz行列に対し、三種類の変換は

$$
\begin{aligned}
P_a:(z,x)&\longmapsto(z,x+a),\\
M_\Lambda:(z,x)&\longmapsto(z,\Lambda x),\\
D_\lambda:(z,x)&\longmapsto(\lambda z,\lambda x).
\end{aligned}
$$

最初は微分が変わらず、二番目は $\eta_{\mu\nu}dx^\mu dx^\nu$ を保ち、三番目は分子・分母が同じ $\lambda^2$ 倍になるので、いずれも等長です。

<a id="prop-holo4-special-conformal-isometry"></a>

<!-- formal-statement-start -->
> **命題（特殊共形変換のバルク等長延長）**
>
> $d\ge3$、$L>0$ とし、$g=L^2z^{-2}(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu)$ とする。一定の境界ベクトル $b^\mu$ に対し、$s=z^2+x^2$、$b\cdot x=\eta_{\mu\nu}b^\mu x^\nu$ と置き

$$
D_b(z,x)=1-2b\cdot x+b^2(z^2+x^2)
$$

> とする。$z>0$ かつ $D_b(z,x)>0$ の開領域上で

$$
K_b:(z,x)\longmapsto
\left(\frac{z}{D_b},
\frac{x^\mu-b^\mu(z^2+x^2)}{D_b}\right)
$$

> はその像への局所等長微分同相である。$z\downarrow0$ で $D_b(0,x)>0$ の境界点では

$$
f_b(x)^\mu=\frac{x^\mu-b^\mu x^2}{1-2b\cdot x+b^2x^2},
\qquad
\Omega_{f_b}(x)=\frac1{1-2b\cdot x+b^2x^2}.
$$

> これが境界の特殊共形変換である。分母が零になる点を含めて単一Poincaré座標で大域定義されるとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

計量の分子 $dz^2+\eta_{\mu\nu}dx^\mu dx^\nu$ を一つの二次形式として扱います。その反転は距離を $1/s^2$ 倍しますが、$z$ も $1/s$ 倍されるのでバルク計量は不変です。反転・並進・反転を合成すると特殊共形変換になります。

<!-- proof-start -->
### 証明

$(d+1)$ 次元変数を $q=(z,x)$、二次形式を $\gamma(dq,dq)=dz^2+\eta_{\mu\nu}dx^\mu dx^\nu$ と書きます。$s=\gamma(q,q)$ が零でない開領域の反転を $J(q)=q/s$ とします。成分微分は

$$
dJ_q(v)=\frac1s\left(v-\frac{2q\,\gamma(q,v)}s\right).
$$

括弧内を $H_qv$ と書くと、$\gamma(q,q)=s$ を使って

$$
\begin{aligned}
\gamma(H_qv,H_qw)
&=\gamma(v,w)
-\frac{4\gamma(q,v)\gamma(q,w)}s
+\frac{4\gamma(q,v)\gamma(q,w)\gamma(q,q)}{s^2}\\
&=\gamma(v,w).
\end{aligned}
$$

よって $J^*\gamma=s^{-2}\gamma$。反転後の動径は $z'=z/s$ なので、$z'>0$ を保つ $s>0$ の領域では

$$
J^*g=\frac{L^2}{(z/s)^2}\frac{\gamma}{s^2}=g.
$$

いま $B=(0,b)$ とし、$J$、$q\mapsto q-B$、$J$ を順に合成します。第一反転の結果を $u=q/s$ とすると、二度目の反転の分母は

$$
\gamma(u-B,u-B)=\frac1s-\frac{2b\cdot x}s+b^2
=\frac{D_b(z,x)}s.
$$

したがって合成写像は

$$
\frac{u-B}{\gamma(u-B,u-B)}
=\frac{q-sB}{D_b(z,x)}.
$$

これが命題の式です。途中で $s=0$ となる点はこの**反転による表示**では扱えません。しかし得られた有理式は $D_b>0$ の全開領域で滑らかで、その領域の $s\ne0$ の稠密な部分で等長性が成り立ちます。計量引き戻しの成分は連続なので、$s=0$ でも同じ恒等式へ延長できます。逆写像は同様の式で $b\mapsto-b$ とした $K_{-b}$（適切な逆像領域に制限）です。

境界では $z=0$ とおき、共形因子を確かめます。バルクの $z$ 方向係数の変換を境界で比較すると、$z'/z\to1/D_b(0,x)$ です。等長性から、境界接方向について

$$
\frac{L^2}{z'^2}(df_b)^*h
=\frac{L^2}{z^2}h
$$

の境界先頭項が一致します。よって $(df_b)^*h=D_b(0,x)^{-2}h$。分母が正の領域なので $\Omega_{f_b}=D_b(0,x)^{-1}>0$ です。$\square$
<!-- proof-end -->

**定義への直接例。** Euclid計量へ置き換えた $d=3$ で $x=(r,0,0)$、$b=(\beta,0,0)$、$z>0$ とすれば

$$
D_b=(1-\beta r)^2+\beta^2z^2>0
$$

（$\beta\ne0$）。$z\to0$ の境界では $r\ne1/\beta$ の範囲で $x'=r/(1-\beta r)$、共形倍率は $(1-\beta r)^{-2}$ です。例えば $r=0$ の近傍では逆変換があり、変換・逆写像・計量倍率を確かめられます。**この例はEuclidでの局所的な例**で、Lorentz全域の正則性や時間向きは保証しません。

### 2.1 無限小の特殊共形変換を検算する

前の式で $b$ を小さくすると、$D_b^{-1}=1+2b\cdot x+O(|b|^2)$ だから

$$
\begin{aligned}
\delta_bx^\mu&=2(b\cdot x)x^\mu-b^\mu(x^2+z^2),\\
\delta_bz&=2(b\cdot x)z.
\end{aligned}
$$

境界 $z=0$ のベクトル場を $\xi_b^\mu(x)=2(b\cdot x)x^\mu-b^\mu x^2$ と置けば、偏微分は

$$
\partial_\nu\xi_b^\mu
=2b_\nu x^\mu+2(b\cdot x)\delta^\mu_\nu-2b^\mu x_\nu.
$$

添字を $\eta$ で下げ、$\mu,\nu$ を対称化すると最初と最後の項が打ち消され、

$$
\partial_\mu\xi_{b,\nu}+\partial_\nu\xi_{b,\mu}
=4(b\cdot x)\eta_{\mu\nu},\qquad
\partial_\mu\xi_b^\mu=2d(b\cdot x).
$$

従って $\sigma=(\partial_\mu\xi_b^\mu)/d=2b\cdot x$ は、[QFT49の共形Killing条件](../../QFT/QFT49/index.md#def-qft49-conformal-killing)のLorentz符号版と一致します。Euclidでは $\eta$ を $\delta$ に替えれば同じ計算が成り立ちます。

| 変換 | バルクの $z$ | 境界の $x$ | 境界計量の局所倍率 $\Omega$ |
| --- | --- | --- | --- |
| 並進 | $z$ | $x+a$ | $1$ |
| Lorentz回転 | $z$ | $\Lambda x$ | $1$ |
| 拡大縮小 | $\lambda z$ | $\lambda x$ | $\lambda$ |
| 特殊共形 | $z/D_b$ | $(x-bx^2)/D_b(0,x)$ | $D_b(0,x)^{-1}$ |

この表は変換が正則な局所領域での比較です。**有限cutoff面を固定する対称性の表ではありません**。一般の曲がった境界・AdS以外の背景に同じ数式が必ずあるとも限りません。

## 3. 境界CFTのWard恒等式を読み直す

ここからは $d\ge3$ の**Euclid CFTの共形不変な真空**を仮定し、すべての挿入点 $x_i$ は互いに異なるものとします。スカラー一次場 $\mathcal O_i$ の次元は $\Delta_i$。その[変換則](../../QFT/QFT48/index.md#def-qft48-scalar-primary)を知れば、相関関数の微分方程式が得られます。

微小共形変換 $f_\varepsilon(x)=x+\varepsilon\xi(x)+O(\varepsilon^2)$ が計量を $\Omega_\varepsilon(x)^2$ 倍し、$\Omega_\varepsilon=1+\varepsilon\sigma(x)+O(\varepsilon^2)$ とする場合、一次場相関関数は

$$
G_n(f_\varepsilon(x_1),\ldots,f_\varepsilon(x_n))
=\prod_i\Omega_\varepsilon(x_i)^{-\Delta_i}G_n(x_1,\ldots,x_n).
$$

左辺は連鎖律で $G_n+\varepsilon\sum_i\xi(x_i)\cdot\nabla_iG_n$、右辺は $G_n-\varepsilon\sum_i\Delta_i\sigma(x_i)G_n$ です。

<a id="prop-holo4-primary-ward-operators"></a>

<!-- formal-statement-start -->
> **命題（バルクに対応する境界の大域Ward演算子）**
>
> $d\ge3$ のEuclid CFTにおける共形不変な真空で、実スケーリング次元 $\Delta_i$ のスカラー一次場の相異なる点の相関関数 $G_n$ を滑らかな関数とする。並進、回転、拡大縮小、特殊共形変換がこの状態を保ち、接触項のない挿入点領域で変換則が成立するとする。このとき、任意の一定ベクトル $a,b$ と任意の反対称行列 $\omega_{\mu\nu}$ に対して、以下が成り立つ。

$$
\begin{aligned}
&\sum_i a\cdot\nabla_iG_n=0,\\
&\sum_i(\omega x_i)\cdot\nabla_iG_n=0,\\
&\sum_i(x_i\cdot\nabla_i+\Delta_i)G_n=0,\\
&\sum_i\left[
(2(b\cdot x_i)x_i-b|x_i|^2)\cdot\nabla_i
+2\Delta_i(b\cdot x_i)\right]G_n=0.
\end{aligned}
$$

> 最後の式は特殊共形Ward恒等式である。ここでEuclid内積 $|\cdot|^2$ を用い、$\nabla_i$ は第 $i$ 挿入点に関する勾配である。
<!-- formal-statement-end -->

### 証明の見取り図

先ほどの無限小変換で、局所倍率は順に $\sigma=0,0,1,2b\cdot x$ です。場の変換則を一回微分するだけで、それぞれの演算子が現れます。

<!-- proof-start -->
### 証明

任意の上記変換について、相関関数の変換則を $\varepsilon=0$ で微分します。左辺の導関数は

$$
\left.\frac{d}{d\varepsilon}G_n(f_\varepsilon x_1,\ldots,f_\varepsilon x_n)\right|_0
=\sum_i\xi(x_i)\cdot\nabla_iG_n.
$$

右辺は $\Omega_\varepsilon^{-\Delta_i}=1-\varepsilon\Delta_i\sigma_i+O(\varepsilon^2)$ を各点で掛けるため

$$
\left.\frac{d}{d\varepsilon}\left(\prod_i\Omega_\varepsilon(x_i)^{-\Delta_i}G_n\right)\right|_0
=-\sum_i\Delta_i\sigma(x_i)G_n.
$$

よって $\sum_i(\xi_i\cdot\nabla_i+\Delta_i\sigma_i)G_n=0$。並進では $\xi=a$ と $\sigma=0$、回転では $\xi=\omega x$ と $\sigma=0$。拡大縮小 $\lambda=e^\varepsilon$ は $\xi=x,\sigma=1$。特殊共形は前節の式をEuclidの内積で読み替え、$\xi=2(b\cdot x)x-b|x|^2$、$\sigma=2b\cdot x$ と代入すれば四式を得ます。$\square$
<!-- proof-end -->

これは既習の[共形保存流とWard恒等式](../../QFT/QFT49/index.md#thm-qft49-conformal-current)の**相異なる点での大域的な帰結**です。応力テンソルを挿入する局所Ward恒等式では[接触項](../../QFT/QFT49/index.md#def-qft49-contact-term)が現れます。ここで接触分布を勝手に零としたのではなく、挿入点が衝突しない領域に限定しました。

### 3.1 二点と三点はどこまで決まるか

[二点関数の選択則](../../QFT/QFT48/index.md#thm-qft48-primary-two-point)によれば、異なる次元のスカラー一次場の二点関数は零、同次元 $\Delta$ なら

$$
G_2(x,y)=\frac{C_{12}}{|x-y|^{2\Delta}}
\quad (x\ne y).
$$

この形を特殊共形Ward演算子へ実際に代入してみます。$r=x-y$ とすると

$$
\nabla_xG_2=-\frac{2\Delta r}{|r|^2}G_2,\qquad
\nabla_yG_2=\frac{2\Delta r}{|r|^2}G_2.
$$

特殊共形ベクトル場の差の内積を展開すると

$$
\bigl(\xi_b(x)-\xi_b(y)\bigr)\cdot(x-y)
=(b\cdot x+b\cdot y)|x-y|^2.
$$

従って微分項は $-2\Delta(b\cdot x+b\cdot y)G_2$、局所倍率項は $+2\Delta(b\cdot x+b\cdot y)G_2$ で相殺します。

[三点関数定理](../../QFT/QFT48/index.md#thm-qft48-primary-three-point)では、$r_{ij}=|x_i-x_j|>0$ とおき

$$
G_3=\frac{C_{123}}{
r_{12}^{\Delta_1+\Delta_2-\Delta_3}
r_{23}^{\Delta_2+\Delta_3-\Delta_1}
r_{31}^{\Delta_3+\Delta_1-\Delta_2}}
$$

となります。例えば $(\Delta_1,\Delta_2,\Delta_3)=(1,1,2)$ なら指数は $(0,2,2)$ です。拡大縮小すると分母は $\lambda^4$ 倍になり、三点の次元の和 $1+1+2=4$ と一致します。**係数 $C_{12}$ や $C_{123}$ は対称性だけからは決まりません**。その具体値は場の規格化・相互作用・状態など力学的な入力に依ります。

## 4. OPEから演算子の「種類」へ

二点・三点の距離依存が同じでも、どの局所演算子が存在し、積がどう分解されるかは異なり得ます。相関関数内で二点を近付け、他の挿入からは十分離して展開する操作が[OPE](../../QFT/QFT54/index.md#def-qft54-ope)です。ここで一般の高次元OPEの収束を証明するのではなく、**既習の具体的な二次元自由CFTのOPEを照合し**、対称性と係数の役割を分けます。

[QFT54の自由電流のOPE](../../QFT/QFT54/index.md#prop-qft54-current-ope)で、正則座標 $w$、小さい非零の複素数 $s$ を取り、自由電流 $a$ の正則ウェイトを1、応力テンソル $t=\tfrac12:\!a^2\!:$ のウェイトを2とします。ほかの挿入から孤立した領域の相関関数内で

$$
a(w+s)a(w)=\frac1{s^2}+2t(w)+s\,\partial t(w)+O(s^2).
$$

先頭の $s^{-2}$ は二つのウェイト1の和を打ち消す恒等演算子（ウェイト0）の係数です。次の $2t$ はウェイト2なので $s^{2-1-1}=s^0$、微分場 $\partial t$ はウェイト3なので $s^1$。**べきの整合は対称性の検算**ですが、例えば係数 $2$ の値は自由場の正規化とWick計算という模型の入力を使います。これは二次元の**正則部分**についての計算であり、一般の $d$ 次元CFTに同じ一変数のOPEを書けるわけではありません。

高次元のスカラー一次場 $\mathcal O_1,\mathcal O_2$ からスカラー一次場 $\mathcal O_p$ が現れるなら、距離のべきの先頭次数は、対称性とOPEが有効という仮定の下で、概略

$$
\mathcal O_1(x)\mathcal O_2(0)
\ \supset\
C_{12p}|x|^{\Delta_p-\Delta_1-\Delta_2}\mathcal O_p(0)
$$

の形に制約されます。回転の添字構造や子孫演算子の導関数項はこの式では省略しており、係数・演算子の存在・収束範囲はこれだけで決まりません。四点以降には[交差比](../../QFT/QFT48/index.md#def-qft48-cross-ratios)という非自明な共形不変量が残るため、任意の四点関数を対称性だけで一つの数に固定できません。

**バルクとの対応をどこまで言えるか。** 幾何側の等長群と境界側の共形群が局所的に一致することは、AdS/CFTの必要な整合条件を与えます。[HOLO3の重い測地線近似](../HOLO3/index.md#prop-holo3-cutoff-lengths)が距離冪を説明できるのもこの整合性の一例です。しかし、同じ対称Lie代数を持つことから、任意のCFTに局所的なEinstein重力の双対が存在するとは導けません。**演算子スペクトル・OPE係数・状態と境界条件・量子補正**の一致は、さらに力学的な証拠や構成を必要とします。

## 5. 演習

<a id="ex-holo4-a1"></a>
### A1. 拡大縮小はなぜ等長か

- Level: A
- 問題: $g=L^2z^{-2}(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu)$、$L>0$、$\lambda=3$ に対し $(z,x)\mapsto(3z,3x)$ がバルク等長であることを計算で示し、境界計量 $h$ の倍率と $z=\epsilon$ の像を求めよ。

<!-- solution-start -->
**詳細解答。** $dz'=3dz$、$dx'^\mu=3dx^\mu$、$z'=3z$ を代入すると

$$
g'=\frac{L^2}{9z^2}(9dz^2+9\eta_{\mu\nu}dx^\mu dx^\nu)=g.
$$

境界では $h'=9h$、共形倍率は正の平方根で $\Omega=3$。$z=\epsilon$ は $z'=3\epsilon$ に写るので固定cutoffの対称性ではありません。
<!-- solution-end -->

<a id="ex-holo4-a2"></a>
### A2. 反転の領域と符号

- Level: A
- 問題: Euclid上半空間で $s=z^2+|x|^2$、$J(z,x)=(z,x)/s$ とする。$z>0$ なら $J$ が定義され動径は正であることを示し、$J(J(q))=q$ を確かめよ。

<!-- solution-start -->
**詳細解答。** $z>0$ なら $s=z^2+|x|^2>0$ なので分母は零でなく、$z'=z/s>0$。変換後の二乗長さは $s'=|(z,x)/s|^2=s/s^2=1/s$。従って二度反転すると $J(J(q))=(q/s)/(1/s)=q$ で、逆写像も上半空間上で滑らかです。Lorentzでは $s=z^2+x^2$ が零になり得るため、同じ大域性は主張できません。
<!-- solution-end -->

<a id="ex-holo4-a3"></a>
### A3. 生成子の数を数える

- Level: A
- 問題: $d=4$ のLorentz境界における並進、Lorentz回転、拡大縮小、特殊共形生成子の数と総数を計算せよ。これを $\dim\mathfrak{so}(2,4)$ と比較せよ。

<!-- solution-start -->
**詳細解答。** 並進は4、反対称添字対 $\mu<\nu$ は $4\cdot3/2=6$、拡大縮小は1、特殊共形は4。総数は $4+6+1+4=15$ です。他方 $SO(2,4)$ が保つ二次形式の基礎空間は6次元で、反対称生成行列の独立成分は $6\cdot5/2=15$。これはLie代数の次元の一致であり、普遍被覆の群としての同一性まで示していません。
<!-- solution-end -->

<a id="ex-holo4-a4"></a>
### A4. 三点関数の冪

- Level: A
- 問題: $d=3$ のEuclid CFTでスカラー一次場の次元が $(\Delta_1,\Delta_2,\Delta_3)=(2,3,4)$ である。相異なる点の三点関数の各距離 $r_{12},r_{23},r_{31}$ の分母指数を求め、拡大縮小と整合するか確認せよ。

<!-- solution-start -->
**詳細解答。** [QFT48の三点関数定理](../../QFT/QFT48/index.md#thm-qft48-primary-three-point)へ代入すると $a=2+3-4=1$、$b=3+4-2=5$、$c=4+2-3=3$。従って

$$
G_3=\frac{C_{123}}{r_{12}r_{23}^5r_{31}^3}.
$$

全距離を $\lambda$ 倍すると $\lambda^{-(1+5+3)}=\lambda^{-9}$ 倍であり、$\sum_i\Delta_i=9$ と一致します。$C_{123}=0$ も排除されません。
<!-- solution-end -->

<a id="ex-holo4-a5"></a>
### A5. OPEの先頭次数

- Level: A
- 問題: 正則ウェイト1の自由電流二個のOPEで、恒等演算子（ウェイト0）、応力テンソル（ウェイト2）、その微分（ウェイト3）の係数の $s$ の冪を次元だけで予測せよ。

<!-- solution-start -->
**詳細解答。** 挿入する項のウェイトを $h_p$ とすると、二つの電流の和は2なので係数の冪は $h_p-2$。順に $0-2=-2$、$2-2=0$、$3-2=1$ です。[自由電流OPE](../../QFT/QFT54/index.md#prop-qft54-current-ope)の $s^{-2}$、$2t$、$s\partial t$ の冪と一致します。係数2の数値まではウェイトだけから決まりません。
<!-- solution-end -->

<a id="ex-holo4-b1"></a>
### B1. 特殊共形変換の一次変分

- Level: B
- 問題: $D_b=1-2b\cdot x+b^2(z^2+x^2)$ と $K_b$ の式から、$b$ の一次までの $\delta x^\mu,\delta z$ を計算し、$z=0$ で $\partial_\mu\xi^\mu=2d(b\cdot x)$ を示せ。

<!-- solution-start -->
**詳細解答。** $b$ の一次を残すと $D_b^{-1}=1+2b\cdot x+O(b^2)$ です。分子を掛ければ

$$
x'^\mu=x^\mu+2(b\cdot x)x^\mu-b^\mu(z^2+x^2)+O(b^2),
\quad
z'=z+2z(b\cdot x)+O(b^2).
$$

境界の $\xi^\mu=2(b\cdot x)x^\mu-b^\mu x^2$ に対し

$$
\partial_\mu[2(b\cdot x)x^\mu]=2(b\cdot x)+2d(b\cdot x),
\qquad
\partial_\mu[b^\mu x^2]=2b\cdot x.
$$

差を取って $\partial_\mu\xi^\mu=2d(b\cdot x)$ です。従って $\sigma=d^{-1}\partial_\mu\xi^\mu=2b\cdot x$ で、前節の境界共形倍率の一次項に一致します。
<!-- solution-end -->

<a id="ex-holo4-b2"></a>
### B2. 二点関数の特殊共形Ward検算

- Level: B
- 問題: Euclid $d=3$ で $G_2=C|x-y|^{-2\Delta}$（$x\ne y$、$C\ne0$、$\Delta>0$）が特殊共形Ward演算子で消えることを $y=0$ と一般の $x$ に対して直接検算せよ。

<!-- solution-start -->
**詳細解答。** $r=x-y$ と置き、$y=0$ であっても $y$ に関する微分を先に取ります。

$$
\nabla_xG_2=-2\Delta\frac{r}{|r|^2}G_2,\qquad
\nabla_yG_2=+2\Delta\frac{r}{|r|^2}G_2.
$$

$y=0$ では $\xi_b(y)=0$、$\sigma(y)=0$、$r=x$。$\xi_b(x)\cdot x=2(b\cdot x)|x|^2-(b\cdot x)|x|^2=(b\cdot x)|x|^2$ なので

$$
\xi_b(x)\cdot\nabla_xG_2
=-2\Delta(b\cdot x)G_2.
$$

局所倍率項 $\Delta\sigma(x)G_2=2\Delta(b\cdot x)G_2$ と相殺し、求めるWard方程式が成り立ちます。$y$ の微分を $y=0$ だからと省略してよいのではなく、$\xi_b(0)=0$ で項が消えることが理由です。
<!-- solution-end -->

<a id="ex-holo4-b3"></a>
### B3. 同じ境界冪でも辞書にならない

- Level: B
- 問題: $d=3$ のEuclid CFTに二つのスカラー一次場 $\mathcal O_A,\mathcal O_B$ があり、両方の次元は $\Delta=5$ とする。いずれも二点関数が非零だが規格化定数は $C_A,C_B$ と異なる。共形対称性が保証すること、保証しないことをそれぞれ式で示せ。またバルクに同じ次元の粒子が必ず存在すると結論できるか述べよ。

<!-- solution-start -->
**詳細解答。** [QFT48の二点関数定理](../../QFT/QFT48/index.md#thm-qft48-primary-two-point)から、相異なる点では

$$
\langle\mathcal O_A(x)\mathcal O_A(y)\rangle=C_A|x-y|^{-10},
\qquad
\langle\mathcal O_B(x)\mathcal O_B(y)\rangle=C_B|x-y|^{-10}.
$$

指数10は次元5から必ず従いますが、$C_A=C_B$ は従いません。さらに別の演算子との三点係数、OPEの存在するチャネル、粒子対応、バルクの局所性・相互作用まで対称性は与えません。AdSのバルク対称性との一致は**必要な運動学的一致**であり、双対性や粒子スペクトルを十分条件として導くものではありません。
<!-- solution-end -->

<a id="ex-holo4-b4"></a>
### B4. 二点・三点・四点で異なる自由度

- Level: B
- 問題: $d=3$ の共形不変なEuclid真空を仮定する。二点で次元の異なるスカラー一次場、三点で $(1,1,2)$ の次元をもつ場、四点で同次元の場四個の場合について、対称性だけから決まることと残る情報を区別せよ。

<!-- solution-start -->
**詳細解答。** 二点の次元が異なるなら[選択則](../../QFT/QFT48/index.md#thm-qft48-primary-two-point)から相異なる点の相関は零です。三点では[三点定理](../../QFT/QFT48/index.md#thm-qft48-primary-three-point)から

$$
G_3(x_1,x_2,x_3)=C_{123}/(r_{23}^2r_{31}^2),
$$

となり、係数は残ります。四点では[共形交差比](../../QFT/QFT48/index.md#def-qft48-cross-ratios)に依存する関数が残るため、対称性だけで一般の相関を定数倍の単一冪として確定できません。OPEを用いてその関数を制約するには、どの演算子・係数が存在するかという別のデータが要ります。
<!-- solution-end -->

<a id="ex-holo4-c1"></a>
### C1. 幾何から境界Ward・OPEまでの整合性監査

- Level: C
- 問題: 整数 $d=3$、$L>0$ とする。純粋Euclid AdSの計量 $g_E=L^2z^{-2}(dz^2+|dx|^2)$ と、共形不変な真空における次元 $\Delta=2$ のスカラー一次場の非零二点関数を考える。以下を順に自力で導け。
  1. $F_\lambda(z,x)=(\lambda z,\lambda x)$ が等長で、境界の共形倍率は $\lambda$ となること。
  2. 特殊共形変換の一次変分と境界の $\sigma_b=2b\cdot x$。
  3. 二点関数 $G_2=C|x-y|^{-4}$ の拡大縮小・特殊共形Ward方程式。
  4. 仮に二つのウェイト1の正則電流OPEを別途与えたとして、その $s^{-2}$ と $s^0$ 項の**べき**だけが示す内容。以上からAdS/CFTの存在が証明されたと主張できない理由も説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $dz'=\lambda dz$、$dx'=\lambda dx$ を計量へ代入すると

$$
F_\lambda^*g_E=\frac{L^2}{\lambda^2z^2}(\lambda^2dz^2+\lambda^2|dx|^2)=g_E.
$$

境界 $h_E=|dx|^2$ は $f_\lambda^*h_E=\lambda^2h_E$、$\Omega_\lambda=\lambda>0$ です。

(2) $D_b=1-2b\cdot x+|b|^2(z^2+|x|^2)$ とし、一次で $D_b^{-1}=1+2b\cdot x+O(b^2)$ を代入すると

$$
\delta_bx=2(b\cdot x)x-b(z^2+|x|^2),\qquad
\delta_bz=2z(b\cdot x).
$$

$z=0$ で $\xi_b=2(b\cdot x)x-b|x|^2$、$\partial\cdot\xi_b=2d(b\cdot x)=6(b\cdot x)$。従って $\sigma_b=(\partial\cdot\xi_b)/3=2b\cdot x$ です。

(3) 拡大縮小Ward演算子は $(x\cdot\nabla_x+y\cdot\nabla_y+4)$ です。$r=x-y$ に対し

$$
(x\cdot\nabla_x+y\cdot\nabla_y)G_2
=r\cdot\nabla_r(C|r|^{-4})
=-4G_2.
$$

よって$+4G_2$と相殺します。特殊共形Wardでは

$$
\nabla_xG_2=-4r|r|^{-2}G_2,\quad
\nabla_yG_2=+4r|r|^{-2}G_2.
$$

前節で導いた $(\xi_b(x)-\xi_b(y))\cdot r=(b\cdot x+b\cdot y)|r|^2$ を代入すると、微分項は $-4(b\cdot x+b\cdot y)G_2$。倍率項は各点で $\Delta\sigma=2\cdot2(b\cdot x)=4(b\cdot x)$、二点の和で $+4(b\cdot x+b\cdot y)G_2$ となり、零です。

(4) **ここは別の二次元正則CFTの例**です。ウェイト1同士の積で、恒等演算子のウェイト0なら係数は $s^{0-2}=s^{-2}$、ウェイト2の応力テンソルなら $s^{2-2}=s^0$。しかし係数の数値、ほかの一次場や子孫の有無、OPEの収束範囲をウェイトだけから決められません。前半のEuclid AdS$_4$ の境界CFT$_3$ と、この正則CFT$_2$ の例は**同じ模型の計算ではありません**。さらに各対称性が一致しても、具体的な演算子スペクトル、相関の係数、力学、量子重力の存在を構成したわけではないので、AdS/CFT双対性の証明ではありません。
<!-- solution-end -->

## この講義で確認したこと

- 純粋AdSの局所等長変換はPoincaré境界の共形変換へ制限できる。Lorentz境界の局所対称Lie代数は $\mathfrak{so}(2,d)$、Euclid境界では $\mathfrak{so}(1,d+1)$ と区別する。
- 特殊共形変換の分母には $x^2$ だけでなく $z^2$ が入り、反転による局所等長性と共形倍率を計算で確かめられる。
- 一次場の変換則を微分するとWard恒等式になる。二点・三点の座標依存は強く制限されるが、全係数と四点関数の不変関数まで固定しない。
- OPEのウェイト・次元は距離冪の整合性を与えるが、演算子内容と係数には理論固有の入力が必要である。
- **対称性の一致は双対性の必要な整合条件であって、双対性自体の証明ではない。** 次のHOLO5では実際に制御された双対性の原型へ進む。
