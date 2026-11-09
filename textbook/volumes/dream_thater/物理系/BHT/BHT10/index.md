# BHT10 回転・電荷を含む熱力学の整合

<!-- definition-example-audit: strict -->

[BHT9の面積エントロピー](../BHT9/index.md#def-bht9-area-normalization)は $S_{\rm BH}=A/4$ と定まりました。[BHT5のKerr–Newman第一法則](../BHT5/index.md#prop-bht5-kn-first-law)と[BHT7のSmarr関係](../BHT7/index.md#prop-bht7-smarr-kn)も幾何学的な変数 $A,J,Q$ で成立しています。では、熱力学で使う **$S,J,Q$ を独立な状態座標にして質量を微分したとき**、Hawking温度・地平線角速度・電位差の三つが本当に現れるでしょうか。

今回は一つの質量関数を作り、まず三つの偏微分を独立に検算し、次に有限量のSmarr関係とRN・Kerrの具体値を突き合わせます。そのうえで、電位のゲージ基準、回転する時計、SI単位という「同じ記号で異なる量を比較しやすい」部分を整理します。

4次元、漸近平坦、宇宙項 $\Lambda=0$、磁荷なしのEinstein–Maxwell理論を用います。計量符号は $(-,+,+,+)$、まず $G=c=\hbar=k_B=1$ です。$M>0$ は無限遠の規格化された時間並進に対応する質量、$J$ は軸回転の角運動量、$Q$ は符号付き電荷です。$M,Q,r,a$ は長さ、$J,S,A$ は長さの二乗の次元で扱います。$d$ は**定常解族の状態空間での全微分**です。実際に放射が流れる時間発展や、無条件に成立する熱浴との平衡を意味しません。

## 1. 面積からエントロピー座標へ

### 1.1 独立な座標を取る意味

[BHT5のKerr–Newman地平線データ](../BHT5/index.md#prop-bht5-kn-first-law)で使った外側根と回転長を $r=r_+$、$a=J/M$ と書き、$R=r^2+a^2$ と置きます。外側根は

$$
r_\pm=M\pm\sqrt{M^2-a^2-Q^2},\quad
2Mr=R+Q^2,\quad
A=4\pi R.
$$

非極限では $M^2>a^2+Q^2$ で、$r_+>r_-$、$R>0$、$\kappa>0$ です。面積規格化から $S=S_{\rm BH}=\pi R$ なので、$S$ を固定することは $A$ を固定することと同じです。ここで「独立な状態座標」とは、近傍の解について $dS,dJ,dQ$ を別々に指定でき、ほかの二つを固定する偏微分が意味を持つということです。

<a id="def-bht10-state-coordinates"></a>

<!-- formal-statement-start -->
> **定義（Kerr–Newmanの熱力学的状態座標）**
> 4次元、$\Lambda=0$、漸近平坦な磁荷なしEinstein–Maxwellの**非極限**Kerr–Newman定常解族 $M>0,\ M^2>a^2+Q^2$ で、無限遠の時間・回転軸・電荷規格化を共通に固定する。[面積規格化](../BHT9/index.md#def-bht9-area-normalization)に従い $S=A/4>0$ と置く。$S,J,Q$ を熱力学的状態座標と呼び、その領域を

$$
\mathcal D_{\rm th}=
\{(S,J,Q)\in\mathbb R^3:S>0,\quad
S^2>\pi^2(Q^4+4J^2)\}
$$

> と表す。この領域は極限境界を含まない。ここでの $S$ は自然単位の面積規格化値であり、SIの $\mathrm{J/K}$ 表示とは区別する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht10-state-coordinates -->
**定義の確認**：$M=5,\ a=3,\ Q=0$ のKerr解は $5^2>3^2$、$r_+=9$、$R=9^2+3^2=90$、$S=90\pi$、$J=15$ です。領域の条件を実際に代入すると

$$
S^2-\pi^2(Q^4+4J^2)
=\pi^2(90^2-4\cdot15^2)
=7200\pi^2>0.
$$

従ってこの点は $\mathcal D_{\rm th}$ の内部です。単に $S>0$ という条件だけで非極限性を判定していません。下の質量公式と根の恒等式で、この不等式が外側根の非退化性に対応することも示します。
<!-- definition-example-end -->

### 1.2 一つの質量関数に集約する

別々の地平線式から温度・仕事係数を読み取る方法だと、三者の偏微分が本当に一つの状態関数から出てくるか見通しづらいものです。そこで質量を **$S,J,Q$ の関数**として表し、その偏微分を元の幾何学的データと比較します。

<a id="thm-bht10-mass-conjugates"></a>

<!-- formal-statement-start -->
> **定理（Kerr–Newman質量関数と三つの共役量）**
> 4次元、$\Lambda=0$、漸近平坦な磁荷なしEinstein–Maxwellの非極限Kerr–Newman解族で、$G=c=\hbar=k_B=1$、無限遠の時間・回転・電位の規格化を固定し、$S=A/4$ とする。状態領域 $\mathcal D_{\rm th}$ 上の正質量分枝は滑らかな関数

$$
\boxed{M(S,J,Q)=
\left[\frac{S}{4\pi}+\frac{Q^2}{2}
+\frac{\pi(Q^4+4J^2)}{4S}\right]^{1/2}}
$$

> であり、三つの共役量は次の偏微分で得られる。

$$
\boxed{\begin{aligned}
T_H=\left(\frac{\partial M}{\partial S}\right)_{J,Q}
&=\frac{S^2-\pi^2(Q^4+4J^2)}{8\pi M S^2}
=\frac{r_+-r_-}{4\pi(r_+^2+a^2)},\\
\Omega_H=\left(\frac{\partial M}{\partial J}\right)_{S,Q}
&=\frac{\pi J}{MS}=\frac a{r_+^2+a^2},\\
\Phi_H=\left(\frac{\partial M}{\partial Q}\right)_{S,J}
&=\frac{Q}{2M}\left(1+\frac{\pi Q^2}{S}\right)
=\frac{Qr_+}{r_+^2+a^2}.
\end{aligned}}
$$

> 特に、すべての接方向に対して次の関係が成立する。これは[既習のKerr–Newman第一法則](../BHT5/index.md#prop-bht5-kn-first-law)を熱力学的変数で表したものである。

$$
\boxed{dM=T_H\,dS+\Omega_H\,dJ+\Phi_H\,dQ.}
$$

> $T_H>0$ は上記非極限領域での結論であり、極限境界での通常の三変数微分可能性や熱浴との平衡の存在は主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

[BHT7の質量・面積公式](../BHT7/index.md#prop-bht7-smarr-kn)を $S=\pi R$ に書き換えて正の平方根を取ります。$M^2$ の偏微分を先に計算すれば、連鎖律 $2M\,dM=d(M^2)$ により三つの係数が出ます。最後に $2Mr=R+Q^2$ と $r_+r_-=a^2+Q^2$ を代入して、幾何学側の $\kappa/(2\pi),\Omega_H,\Phi_H$ へ戻します。

<!-- proof-start -->
### 証明

$R=A/(4\pi)=S/\pi$ と置きます。地平線の根の方程式 $2Mr=R+Q^2$ と $r^2=R-a^2=R-J^2/M^2$ を順に用いると

$$
4M^2\left(R-\frac{J^2}{M^2}\right)
=(R+Q^2)^2,
$$

すなわち

$$
4RM^2=(R+Q^2)^2+4J^2.
$$

$R>0$ で割り、$R=S/\pi$ を代入して

$$
M^2=\frac R4+\frac{Q^2}{2}
+\frac{Q^4+4J^2}{4R}
=\frac S{4\pi}+\frac{Q^2}{2}
+\frac{\pi(Q^4+4J^2)}{4S}
$$

を得ます。右辺は $S>0$ で正、正質量分枝の平方根は滑らかです。

逆に $\mathcal D_{\rm th}$ の任意の点からこの $M>0$ を定め、$a=J/M$、$R=S/\pi$、$r=(R+Q^2)/(2M)>0$ と置けば、上の等式を逆に使って $r^2+a^2=R$、$2Mr=r^2+a^2+Q^2$ を得ます。つまり $r$ は地平線根の方程式の根です。$r_-=(a^2+Q^2)/r$ とすれば、これももう一方の根です。$4J^2=(R+Q^2)^2a^2/r^2$ であることから、

$$
\begin{aligned}
R^2-Q^4-4J^2
&=(R+Q^2)\left(R-Q^2-\frac{(R+Q^2)a^2}{r^2}\right)\\
&=\frac{(R+Q^2)R(r^2-a^2-Q^2)}{r^2}\\
&=2MR(r-r_-)
\end{aligned}
$$

となります。二行目には $R=r^2+a^2$、三行目には $R+Q^2=2Mr$ を使いました。左辺は $\mathcal D_{\rm th}$ の不等式から正なので $r>r_-$、すなわち $r=r_+$ は非極限の外側根です。これで状態領域を単なる形式的不等式ではなく実際の解族へ接続しました。

次に $F=M^2$ と置き、偏微分で固定する変数を明記すると

$$
\begin{aligned}
F_S\big|_{J,Q}&=\frac1{4\pi}
-\frac{\pi(Q^4+4J^2)}{4S^2},\\
F_J\big|_{S,Q}&=\frac{2\pi J}{S},\\
F_Q\big|_{S,J}&=Q+\frac{\pi Q^3}{S}.
\end{aligned}
$$

連鎖律 $2M M_x=F_x$ と $M>0$ から、定理の三つの偏微分表示が得られます。

これらを地平線量に戻します。$S=\pi R$、$J=Ma$、$2Mr=R+Q^2$ により

$$
\frac{\pi J}{MS}=\frac aR,\qquad
\frac{Q}{2M}\left(1+\frac{\pi Q^2}{S}\right)
=\frac{Q(R+Q^2)}{2MR}=\frac{Qr}{R}.
$$

温度については、上で求めた $R^2-Q^4-4J^2=2MR(r-r_-)$ を代入して

$$
\begin{aligned}
M_S\big|_{J,Q}
&=\frac{R^2-Q^4-4J^2}{8\pi MR^2}\\
&=\frac{2MR(r-r_-)}{8\pi MR^2}
=\frac{r-r_-}{4\pi R}
=\frac{\kappa}{2\pi}
\end{aligned}
$$

です。最後の等式は[BHT5の非極限表面重力](../BHT5/index.md#prop-bht5-kn-first-law) $\kappa=(r-r_-)/(2R)$ と[BHT8のHawking温度](../BHT8/index.md#prop-bht8-first-law-area)を同じ無限遠時間で照合したものです。電位は[BHT5のゲージを固定した電位差](../BHT5/index.md#def-bht5-kn-potential)と一致します。

$M$ は開集合 $\mathcal D_{\rm th}$ 上の $C^1$ 関数なので $dM=M_SdS+M_JdJ+M_QdQ$ が任意の接方向で成立し、第一法則が従います。
<!-- proof-end -->

この導出は[BHT5の幾何学的第一法則](../BHT5/index.md#prop-bht5-kn-first-law)とは**異なる変数での独立な偏微分検算**です。一方、使った質量公式自体は同じKerr–Newman解の根から出ているので、別の時空一般の第一法則を追加で証明したわけではありません。

## 2. Smarr関係と二つの一変数極限

### 2.1 微分式と有限量の式は違う

第一法則では $S,J,Q$ を独立に微小変化させます。Smarr関係は一つの状態での**有限量の恒等式**です。熱力学的表示では、長さを $\lambda$ 倍したとき $S,J$ は $\lambda^2$ 倍、$Q$ は $\lambda$ 倍、$M$ は $\lambda$ 倍になるため、温度に掛かる係数と電位の係数は同じではありません。

<a id="prop-bht10-smarr-check"></a>

<!-- formal-statement-start -->
> **命題（熱力学的Smarr関係の直接検算）**
> 上の $\mathcal D_{\rm th}$ にある4次元、漸近平坦、$\Lambda=0$ の非極限Kerr–Newman定常解で、$G=c=\hbar=k_B=1$ とし、$T_H,\Omega_H,\Phi_H$ は[質量関数の共役量](#thm-bht10-mass-conjugates)とする。このとき

$$
\boxed{M=2T_HS+2\Omega_HJ+\Phi_HQ}
$$

> が成立する。$J=0$ ではRN、$Q=0$ ではKerrのSmarr関係へ制限される。
<!-- formal-statement-end -->

### 証明の見取り図

[BHT7の重み付きEuler恒等式](../BHT7/index.md#lem-bht7-weighted-euler)からも従いますが、ここでは三つの**明示的な偏微分値を代入**して、特に $Q$ の係数が1であることを検算します。

<!-- proof-start -->
### 証明

$S>0,M>0$ なので分母は非零です。定理の式を各項に代入すると

$$
\begin{aligned}
2T_HS&=\frac{S}{4\pi M}
-\frac{\pi(Q^4+4J^2)}{4MS},\\
2\Omega_HJ&=\frac{2\pi J^2}{MS},\\
\Phi_HQ&=\frac{Q^2}{2M}+\frac{\pi Q^4}{2MS}.
\end{aligned}
$$

和を取ると $J^2$ の係数は $-1+2=1$（$\pi J^2/(MS)$ 単位）、$Q^4$ の係数は $-1/4+1/2=1/4$ となり

$$
\begin{aligned}
2T_HS+2\Omega_HJ+\Phi_HQ
&=\frac1M\left[
\frac S{4\pi}+\frac{Q^2}{2}
+\frac{\pi(Q^4+4J^2)}{4S}\right]\\
&=\frac{M^2}{M}=M.
\end{aligned}
$$

さらに $Q=0$ なら $\Phi_HQ=0$、$J=0$ なら $\Omega_HJ=0$ で、[既出の幾何学的Smarr関係](../BHT7/index.md#prop-bht7-smarr-kn)と一致します。
<!-- proof-end -->

### 2.2 RNとKerrを同じ質量で比べる

RNの $M=5,Q=3,J=0$ は外側根 $r_+=9$、内側根 $r_-=1$ を持ち、[RNの地平線データ](../BHT4/index.md#prop-bht4-rn-data)に代入して

$$
S=81\pi,\quad T_H=\frac{2}{81\pi},\quad
\Omega_H=0,\quad\Phi_H=\frac13.
$$

従って $2T_HS=4$、$\Phi_HQ=1$、合計5です。これに対してKerrの $M=5,a=3,Q=0$ も $r_+=9,\ r_-=1$ ですが $R=90$ なので

$$
S=90\pi,\quad T_H=\frac1{45\pi},\quad
J=15,\quad\Omega_H=\frac1{30}.
$$

こちらは $2T_HS=4$、$2\Omega_HJ=1$、合計5です。値の一致は偶然の一般法則ではなく、この数値選択によるものです。二つの解は**同じ質量でも異なる面積・仕事項**を持っています。

## 3. 電位のゲージと回転する時計

### 3.1 電気的仕事は電位の零点をどう選ぶかに依存するか

電磁ポテンシャル $\mathcal A$ 自体はゲージ変換で変わります。しかし仕事項に現れるのは、同じ地平線生成場 $\chi=\partial_t+\Omega_H\partial_\varphi$ で測った**地平線と無限遠の電位差**です。[BHT5の定義](../BHT5/index.md#def-bht5-kn-potential)では $\mathcal A=(Qr/\Sigma)(dt-a\sin^2\vartheta\,d\varphi)$ とし、無限遠を零にしました。

<a id="prop-bht10-gauge-difference"></a>

<!-- formal-statement-start -->
> **命題（電磁ゲージと地平線電位差）**
> 4次元の非極限Kerr–Newman定常解で、無限遠規格化の地平線生成場 $\chi$ と、地平線まで正則なゲージで評価した電磁ポテンシャル $\mathcal A$ を用いる。両端における $\chi\cdot\mathcal A$ の差を

$$
\Phi_H=(\chi\cdot\mathcal A)|_H-(\chi\cdot\mathcal A)|_\infty
$$

> と定める。$\mathcal A\mapsto\mathcal A+d\lambda$ のゲージ変換で $\chi(\lambda)$ が両端で**同一の定数**なら $\Phi_H$ は変わらない。無限遠で零のゲージでは $\Phi_H=Qr_+/(r_+^2+a^2)$ であり、$Q$ の符号を反転すると電位の符号も反転する。
<!-- formal-statement-end -->

### 証明の見取り図

ポテンシャルの各端点の値は変化しても、**同じ値を差し引けば不変**です。計量や電磁場強度を再計算する必要はありません。

<!-- proof-start -->
### 証明

$\chi^a(\mathcal A_a+\partial_a\lambda)=\chi\cdot\mathcal A+\chi(\lambda)$ です。従って変換後の差は

$$
\Phi_H'=\Phi_H+
\left.\chi(\lambda)\right|_H-
\left.\chi(\lambda)\right|_\infty=\Phi_H
$$

となります。定数性を両端で同じにする仮定が最後の等号で必要です。[地平線電位の直接計算](../BHT5/index.md#def-bht5-kn-potential)では

$$
(\chi\cdot\mathcal A)|_H=\frac{Qr_+}{R},
\qquad(\chi\cdot\mathcal A)|_\infty=0.
$$

$r_+,R$ は $Q^2$ にのみ依存し、$Q\mapsto-Q$ で不変です。一方、分子の $Q$ は反転するので $\Phi_H$ は奇関数です。
<!-- proof-end -->

例えば定数 $C$ について、正則な入射座標 $v$ を用いて $\lambda=Cv$ とすれば、$\chi(v)=1$ であるため $\chi(\lambda)=C$ です。地平線側も無限遠側も $+C$ だけ動きます。どちらか一方だけを移動させて新しい $\Phi_H$ と呼ぶ操作は、比較する基準を変えており、同一の電位差のゲージ変換ではありません。Boyer–Lindquist座標の $t$ は未来地平線で正則な座標ではないため、地平線までのゲージ変換を表すときは $v$ を用います。

### 3.2 回転する座標系ではエネルギーも変わる

無限遠の静止座標を $\varphi'=\varphi-\omega t$（$\omega$ は状態に依らない定数）へ替えると、時間並進場は $\xi'=\xi+\omega\eta$、地平線生成場は $\chi=\xi'+(\Omega_H-\omega)\eta$ です。新しい時間生成場で測るエネルギーを $E'=M-\omega J$ と書けば、$\omega$ を固定して微分するため

$$
dE'=dM-\omega\,dJ
=T_H\,dS+(\Omega_H-\omega)\,dJ+\Phi_H\,dQ.
$$

これは第一法則の破れではなく、**エネルギーと角速度の基準を一緒に変更**した式です。$\omega$ を状態依存にすれば $-J\,d\omega$ がさらに現れ、上式をそのまま使えません。回転座標の選択だけで、無限遠の静止観測者が見る温度や全体としての熱平衡を無条件に保証できるわけでもありません。

## 4. SI単位での共役量と適用限界

幾何単位での $M$ は長さですが、SIで第一法則の左辺は**エネルギー** $E=mc^2$ です。同じ記号 $M$ と $m$ を無造作に混ぜると電位や角速度の係数が壊れます。ここでは $m$ をSI質量、$j$ をSI角運動量、$q$ をCoulomb単位の電荷とします。$\varepsilon_0$ は真空の誘電率です。

<a id="prop-bht10-si-first-law"></a>

<!-- formal-statement-start -->
> **命題（回転・電荷付き第一法則のSI表示）**
> 4次元、漸近平坦、$\Lambda=0$ の非極限Kerr–Newman定常解で、無限遠の時間・非回転軸と電位零点を固定する。地平線半径 $r_+$ と回転長 $a=j/(mc)$ をSIの長さで表し、$R=r_+^2+a^2$ とする。磁荷なし、$m>0$、$r_+>r_-$ とすれば、熱力学的第一法則とSmarr関係は

$$
\boxed{\begin{aligned}
d(mc^2)&=T_H\,dS_{\rm BH}+\Omega_H\,dj+\Phi_H\,dq,\\
mc^2&=2T_HS_{\rm BH}+2\Omega_Hj+\Phi_Hq
\end{aligned}}
$$

> となる。ここで

$$
\boxed{\begin{aligned}
S_{\rm BH}&=\frac{k_Bc^3A}{4G\hbar},&
T_H&=\frac{\hbar c(r_+-r_-)}{4\pi k_BR},\\
\Omega_H&=\frac{ca}{R},&
\Phi_H&=\frac{qr_+}{4\pi\varepsilon_0R}.
\end{aligned}}
$$

> $T_H$ はKelvin、$\Omega_H$ は $\mathrm{s^{-1}}$、$\Phi_H$ はVolt、$S_{\rm BH}$ は $\mathrm{J/K}$ であり、右辺の各積はJoule単位である。
<!-- formal-statement-end -->

### 証明の見取り図

幾何単位の質量・角運動量・電荷をそれぞれ長さ・長さ二乗・長さへ変換します。その上で各仕事項が同じ係数 $c^4/G$ を受けることを確認します。

<!-- proof-start -->
### 証明

幾何単位の量に添字 $\mathrm g$、SI単位の量に添字 $\mathrm{SI}$ を付けます。地平線方程式と角運動量・Coulomb項の係数を比較して

$$
M_{\rm g}=\frac{Gm}{c^2},\quad
J_{\rm g}=\frac{Gj}{c^3},\quad
Q_{\rm g}=\sqrt{\frac{G}{4\pi\varepsilon_0}}\frac q{c^2}
$$

となります。$a=J_{\rm g}/M_{\rm g}=j/(mc)$ で、$r_\pm,R$ は同じ物理長さです。自然単位の $S_{\rm g}=A/4$ と幾何単位温度 $T_{\rm g}=(r_+-r_-)/(4\pi R)$ に対して

$$
S_{\rm BH}=\frac{k_Bc^3}{G\hbar}S_{\rm g},\quad
T_H=\frac{\hbar c}{k_B}T_{\rm g},\quad
\Omega_H=c\,\Omega_{\rm g}.
$$

電位は $\Phi_{\rm g}=Q_{\rm g}r_+/R$ であるため

$$
\Phi_H=\frac{c^2}{\sqrt{4\pi\varepsilon_0G}}\Phi_{\rm g}
=\frac{qr_+}{4\pi\varepsilon_0R}.
$$

従って四つの量の微分の積に共通の換算係数が現れ、

$$
\begin{aligned}
d(mc^2)&=\frac{c^4}{G}\,dM_{\rm g},\\
T_H\,dS_{\rm BH}&=\frac{c^4}{G}T_{\rm g}\,dS_{\rm g},\\
\Omega_H\,dj&=\frac{c^4}{G}\Omega_{\rm g}\,dJ_{\rm g},\\
\Phi_H\,dq&=\frac{c^4}{G}\Phi_{\rm g}\,dQ_{\rm g}.
\end{aligned}
$$

自然単位の[第一法則](#thm-bht10-mass-conjugates)と[Smarr関係](#prop-bht10-smarr-check)の両辺に $c^4/G$ を掛ければSI表示を得ます。$[T_HS_{\rm BH}]=\mathrm{K}\cdot\mathrm{J/K}=\mathrm J$、$[\Omega_Hj]=\mathrm{s^{-1}}\cdot\mathrm{J\,s}=\mathrm J$、$[\Phi_Hq]=\mathrm{J/C}\cdot\mathrm C=\mathrm J$ です。
<!-- proof-end -->

[BHT8のSchwarzschildのSI温度](../BHT8/index.md#prop-bht8-physical-units)と[BHT9の面積エントロピーのSI規格化](../BHT9/index.md#prop-bht9-si-entropy)は、$a=q=0$ と置けば回復します。

### 4.1 どこでこの計算を止めるべきか

- **非極限の開領域**：$S^2>\pi^2(Q^4+4J^2)$ だから $T_H>0$ と偏微分を扱えました。等号の極限境界で非極限の解析をそのまま延長した「第三法則」の結論は出ません。極限到達の問題はBHT11で改めて調べます。
- **アンサンブル**：$M(S,J,Q)$ は状態関数ですが、固定した $T,\Omega,\Phi$ の熱浴に平衡状態が存在するか、あるいはそれが安定かは別問題です。Legendre変換とHessianによる判定はBHT17で扱います。
- **実際の過程**：$dM=T_HdS+\Omega_HdJ+\Phi_HdQ$ は定常解を比較する式です。Hawking放射で面積が減るときにも古典的な可逆熱流入を仮定したわけではなく、[GR36の古典面積定理](../../GR/GR36/index.md#thm-gr36-smooth-area)の仮定をそのまま移すことはできません。

## 5. 演習――共役量を三方向から復元する

### Level A：定義・偏微分・単位の単独検算

<a id="ex-bht10-a01"></a>

#### BHT10-A01 RN状態点の定義域

- Level: A
- 問題: 自然単位の $M=5,Q=3,J=0$ に対し $r_\pm,S$ と $\mathcal D_{\rm th}$ の不等式を計算し、この点が非極限であることを確かめよ。

<!-- solution-start -->
**詳細解答**：[RNの根の式](../BHT4/index.md#prop-bht4-rn-data)より

$$
r_\pm=5\pm\sqrt{25-9}=5\pm4,
\quad r_+=9,\quad r_-=1.
$$

$R=r_+^2=81$、$S=\pi R=81\pi$ で、$Q^4=81$、$J=0$ なので

$$
S^2-\pi^2(Q^4+4J^2)
=\pi^2(81^2-81)=6480\pi^2>0.
$$

$M>0$ も満たし、状態点は定義域の内部です。
<!-- solution-end -->

<a id="ex-bht10-a02"></a>

#### BHT10-A02 Kerrの温度偏微分

- Level: A
- 問題: 自然単位のKerr点 $M=5,a=3,Q=0$ で $S=90\pi,J=15$ とする。$M_S|_{J,Q}$ を定理の式から計算し、地平線の温度と比較せよ。

<!-- solution-start -->
**詳細解答**：[共役量の式](#thm-bht10-mass-conjugates)に $Q=0$ を代入して

$$
\begin{aligned}
M_S|_{J,Q}
&=\frac{(90\pi)^2-4\pi^2(15)^2}
{8\pi(5)(90\pi)^2}\\
&=\frac{7200}{40\cdot8100\pi}
=\frac1{45\pi}.
\end{aligned}
$$

$r_+=9,r_-=1,R=90$ より $(r_+-r_-)/(4\pi R)=8/(360\pi)=1/(45\pi)$ で一致します。
<!-- solution-end -->

<a id="ex-bht10-a03"></a>

#### BHT10-A03 電荷の偏微分と符号

- Level: A
- 問題: $S>0,J$ を固定した質量関数から $\Phi_H$ を求めよ。$Q=0$ と $Q\mapsto-Q$ でどうなるかも述べよ。

<!-- solution-start -->
**詳細解答**：$2M M_Q=(M^2)_Q$ と $M>0$ より

$$
2M M_Q=Q+\frac{\pi Q^3}{S},
\quad
M_Q=\frac Q{2M}\left(1+\frac{\pi Q^2}{S}\right).
$$

$M^2$ は $Q$ の偶関数、正の平方根 $M$ も偶関数です。従って $M_Q$ は奇関数で、$Q=0$ なら零、負電荷なら符号が反転します。
<!-- solution-end -->

<a id="ex-bht10-a04"></a>

#### BHT10-A04 ゲージの定数シフト

- Level: A
- 問題: ある正則な定常ゲージで $(\chi\cdot\mathcal A)|_H=4/7$、$(\chi\cdot\mathcal A)|_\infty=0$ とする。正則な入射座標 $v$ で $\lambda=2v$ とするゲージ変換後の二端点と電位差を計算せよ。ただし $\chi(v)=1$ とする。

<!-- solution-start -->
**詳細解答**：[電位差の命題](#prop-bht10-gauge-difference)より両端で $\chi(\lambda)=2$ が加算されるので

$$
(\chi\cdot\mathcal A')|_H=\frac47+2=\frac{18}7,\qquad
(\chi\cdot\mathcal A')|_\infty=2.
$$

差は $18/7-2=4/7$ と変わりません。地平線値だけを $18/7$ に変えて比較すると、異なる零点を混ぜる誤りになります。
<!-- solution-end -->

<a id="ex-bht10-a05"></a>

#### BHT10-A05 SI仕事項の次元

- Level: A
- 問題: $[\Omega_H]=\mathrm{s^{-1}}$、$[j]=\mathrm{kg\,m^2\,s^{-1}}$、$[\Phi_H]=\mathrm{J/C}$、$[q]=\mathrm C$ として、$\Omega_Hdj$ と $\Phi_Hdq$ の単位を示せ。

<!-- solution-start -->
**詳細解答**：定数単位は微分でも変わりません。従って

$$
[\Omega_Hdj]=\mathrm{s^{-1}}\cdot
\mathrm{kg\,m^2\,s^{-1}}
=\mathrm{kg\,m^2\,s^{-2}}=\mathrm J,
$$

$$
[\Phi_Hdq]=\mathrm{J/C}\cdot\mathrm C=\mathrm J.
$$

左辺 $d(mc^2)$ も $\mathrm J$ です。幾何単位の質量長さ $M_{\rm g}$ をそのままSIのJouleとみなしてはいけません。
<!-- solution-end -->

### Level B：異なる表示を接続する

<a id="ex-bht10-b01"></a>

#### BHT10-B01 RNの第一法則とSmarrの二重検算

- Level: B
- 問題: 自然単位の $M=5,Q=3,J=0$ で $S=81\pi$ とする。$T_H$ と $\Phi_H$ を求め、$2T_HS+\Phi_HQ=M$ を確認せよ。さらに $dM$ の $dS$ と $dQ$ の係数を述べよ。

<!-- solution-start -->
**詳細解答**：$r_+=9,r_-=1,R=81$ なので[温度と電位の表示](#thm-bht10-mass-conjugates)から

$$
T_H=\frac8{4\pi\cdot81}=\frac2{81\pi},
\qquad\Phi_H=\frac{3\cdot9}{81}=\frac13.
$$

有限量の検算は

$$
2T_HS=2\frac2{81\pi}(81\pi)=4,\quad
\Phi_HQ=\frac13\cdot3=1,\quad4+1=5=M.
$$

一方、$J=0$ の部分族では $dJ=0$ なので

$$
dM=\frac2{81\pi}\,dS+\frac13\,dQ.
$$

有限量の係数 $2$ を微分式の $T_H$ や $\Phi_H$ に追加してはいけません。
<!-- solution-end -->

<a id="ex-bht10-b02"></a>

#### BHT10-B02 Kerrの二つの共役量

- Level: B
- 問題: 自然単位で $M=5,a=3,Q=0$ のKerr点を考える。$S,J,T_H,\Omega_H$ を計算し、$2T_HS+2\Omega_HJ=M$ と $dM$ の二係数を確認せよ。

<!-- solution-start -->
**詳細解答**：$r_\pm=5\pm4$ より $r_+=9,r_-=1$、$R=9^2+3^2=90$ です。従って

$$
S=90\pi,\quad J=Ma=15,\quad
T_H=\frac8{4\pi90}=\frac1{45\pi},\quad
\Omega_H=\frac3{90}=\frac1{30}.
$$

和は

$$
2T_HS=2\frac{90\pi}{45\pi}=4,\qquad
2\Omega_HJ=2\frac{15}{30}=1,\qquad4+1=5.
$$

$Q=0$ の部分族で $dQ=0$ なので第一法則は

$$
dM=\frac1{45\pi}\,dS+\frac1{30}\,dJ.
$$

無限遠の角速度の基準を固定していること、$dS$ と $dJ$ を独立に動かすことがこの係数比較の条件です。
<!-- solution-end -->

<a id="ex-bht10-b03"></a>

#### BHT10-B03 混合偏微分の対称性

- Level: B
- 問題: $\mathcal D_{\rm th}$ 上の質量関数について、$S$ を固定し、$\partial_Q\Omega_H|_{S,J}$ と $\partial_J\Phi_H|_{S,Q}$ が一致することを式で確認せよ。なぜこの比較ができるかも述べよ。

<!-- solution-start -->
**詳細解答**：[定理](#thm-bht10-mass-conjugates)より $\Omega_H=\pi J/(MS)$、$\Phi_H=(Q+\pi Q^3/S)/(2M)$ です。$S,J$ を固定して $Q$ 微分し、$M_Q=\Phi_H$ を代入すると

$$
\left(\partial_Q\Omega_H\right)_{S,J}
=-\frac{\pi J}{SM^2}M_Q
=-\frac{\pi J\Phi_H}{SM^2}.
$$

一方、$S,Q$ 固定では分子が $J$ に依存せず、$M_J=\Omega_H$ なので

$$
\begin{aligned}
\left(\partial_J\Phi_H\right)_{S,Q}
&=-\frac{Q+\pi Q^3/S}{2M^2}M_J\\
&=-\frac{\Phi_H\Omega_H}{M}
=-\frac{\pi J\Phi_H}{SM^2}.
\end{aligned}
$$

$S>0$、$M>0$ の開集合上で $M$ は滑らかなので、両者は同じ二階混合偏微分 $M_{JQ}$ として比較できます。二つの共役量を任意の無関係な関数として指定した場合、この整合性は自動ではありません。
<!-- solution-end -->

<a id="ex-bht10-b04"></a>

#### BHT10-B04 回転する時計の変換

- Level: B
- 問題: 非極限定常解族の第一法則を仮定し、状態に依存しない定数 $\omega$ に対して $E'=M-\omega J$、$\Omega'_H=\Omega_H-\omega$ とする。$dE'$ を導け。$\omega=\omega(S,J,Q)$ とした場合に増える項も求めよ。

<!-- solution-start -->
**詳細解答**：一定 $\omega$ のとき積の微分は $d(\omega J)=\omega\,dJ$ です。[第一法則](#thm-bht10-mass-conjugates)を代入すると

$$
dE'=dM-\omega dJ
=T_HdS+(\Omega_H-\omega)dJ+\Phi_HdQ
=T_HdS+\Omega'_HdJ+\Phi_HdQ.
$$

状態依存の場合には積の微分が $d(\omega J)=\omega\,dJ+J\,d\omega$ となり

$$
dE'=T_HdS+\Omega'_HdJ+\Phi_HdQ-J\,d\omega.
$$

従って定数回転枠の式を、変化する $\omega$ へそのまま外挿できません。
<!-- solution-end -->

### Level C：回転・電荷・温度を一つの状態で総合する

<a id="ex-bht10-c01"></a>

#### BHT10-C01 非極限Kerr–Newmanの三項検算

- Level: C
- 問題: 自然単位のKerr–Newman解で $M=5,a=3,Q=\sqrt7$ とする。（1）非極限性、$r_\pm,R,S,J$ を確かめよ。（2）$M(S,J,Q)$ に代入して質量を回復せよ。（3）$T_H,\Omega_H,\Phi_H$ を求め、三項すべてを含むSmarr関係を検算せよ。（4）電荷符号だけを反転した場合に、質量・温度・角速度・電位差・Smarrの各項がどう変わるか述べよ。

<!-- solution-start -->
**詳細解答**：

**（1）状態領域。** $M^2-a^2-Q^2=25-9-7=9>0$ なので非極限で

$$
r_\pm=5\pm3,\quad r_+=8,\ r_-=2,\quad
R=8^2+3^2=73,\quad S=73\pi,\quad J=5\cdot3=15.
$$

さらに

$$
S^2-\pi^2(Q^4+4J^2)
=\pi^2(73^2-49-900)
=4380\pi^2>0
$$

となり、熱力学的状態領域にも入ります。

**（2）質量関数。** [定理](#thm-bht10-mass-conjugates)の正質量分枝に代入すると

$$
\begin{aligned}
M^2&=\frac{73}{4}+\frac72
+\frac{49+4\cdot225}{4\cdot73}\\
&=\frac{73}{4}+\frac{14}{4}+\frac{949}{292}
=\frac{73+14+13}{4}=25.
\end{aligned}
$$

$949=13\cdot73$ なので最後の約分が成立し、$M>0$ から $M=5$ を回復します。

**（3）三つの共役量。** $r_+-r_-=6$、$R=73$ を用いて

$$
T_H=\frac6{4\pi73}=\frac3{146\pi},\quad
\Omega_H=\frac3{73},\quad
\Phi_H=\frac{8\sqrt7}{73}.
$$

Smarr関係の三項をそれぞれ独立に評価すると

$$
\begin{aligned}
2T_HS&=2\frac3{146\pi}(73\pi)=3,\\
2\Omega_HJ&=2\frac3{73}(15)=\frac{90}{73},\\
\Phi_HQ&=\frac{8\sqrt7}{73}\sqrt7=\frac{56}{73}.
\end{aligned}
$$

従って

$$
2T_HS+2\Omega_HJ+\Phi_HQ
=3+\frac{90+56}{73}=3+2=5=M.
$$

偏微分で得た $T_H,\Omega_H,\Phi_H$ が[第一法則](#thm-bht10-mass-conjugates)の三方向の係数でもあります。

**（4）電荷の符号。** $Q\mapsto-\sqrt7$ では $Q^2,Q^4$ が不変なので $r_\pm,R,S,J,M,T_H,\Omega_H$ は同じです。電位差 $\Phi_H=Qr_+/R$ は負になりますが、積 $\Phi_HQ=56/73$ は不変です。$\Phi_HdQ$ の係数としての電位の符号が変わることと、有限量のSmarr項の符号が変わることを混同しません。
<!-- solution-end -->

## 6. 次の講義へ

ここまでの偏微分はすべて $T_H>0$ の**非極限**領域で正当化しました。しかし $M^2\downarrow a^2+Q^2$ とすると $\kappa,T_H\to0$ なのに、地平線面積と $S_{\rm BH}$ は一般に零になりません。次のBHT11「極限ブラックホールと第三法則」では、状態空間の境界、零温度への到達不能性と第三法則の異なる主張を切り分けます。
