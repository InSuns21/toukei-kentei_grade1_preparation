# MIR1-16 B側Yukawa結合と周期の統合

<!-- definition-example-audit: strict -->

## 1. 周期の四階方程式から、なぜ三次の微分量を作るのか

前講の[ミラー座標](../MIR1-15/index.md#def-mir1-15-mirror-coordinate)は、正則周期と対数周期から $q=ze^{h(z)}$ を与えた。しかし $q(z)$ の係数だけでは、三次元の複素幾何の「三つの変形方向を結び付ける量」は見えない。そこで、正則3形式を変形方向に三回微分し、元の正則3形式と交叉形式で組にする。

[quinticのPicard–Fuchs方程式](../MIR1-10/index.md#thm-mir1-10-quintic-pf)と[周期のGauss–Manin微分](../MIR1-08/index.md#prop-mir1-08-period-connection)は既知である。一パラメータの群不変な第3コホモロジー（階数4）を扱い、元のquinticの第3コホモロジー全体（階数204）と混同しない。

以下では、滑らかなファイバーを持つ単連結なパラメータ領域を考える。用いる範囲は

$
V\subset\left\{z\in\mathbb C:0<|z|<\frac1{3125}\right\}
$

である。[再規格化した留数周期](../MIR1-10/index.md#thm-mir1-10-quintic-pf)が満たす方程式に合わせて、正則3形式のコホモロジー類を $\Omega_z$ と書く。具体的には、$z=(5\psi)^{-5}$ の局所分枝で元の留数3形式に $\psi$ を掛けたものを使う。

$\psi^5\ne1$ なのでファイバーは滑らかである。また $\nabla_z$ は[Gauss–Manin接続](../../DEF/DEF1-12/index.md#def-def1-12-gauss-manin)の $\partial/\partial z$ 方向を表す。

重さ3の[Hodgeフィルトレーション](../../HOD/HOD1-15/index.md#def-hod1-15-filtration)を $F^3\subset F^2\subset F^1\subset F^0$ とする。正則3形式は $F^3$ にあり、[Griffiths横断性](../../DEF/DEF1-13/index.md#thm-def1-13-griffiths)を一回ずつ使うと

$$
\Omega\in F^3,\qquad
\nabla_z\Omega\in F^2,\qquad
\nabla_z^2\Omega\in F^1,\qquad
\nabla_z^3\Omega\in F^0.
$$

次数3の交叉形式 $Q(\alpha,\beta)$ は、向きを固定して $\int\alpha\wedge\beta$ から得られる交代双線形形式で、Gauss–Manin平行移動に対して一定である。重さ3では $Q(F^p,F^{4-p})=0$。従って

$$
Q(\Omega,\nabla_z\Omega)=0,\qquad
Q(\Omega,\nabla_z^2\Omega)=0.
$$

最初の二回は消え、**三回微分したところで初めて非零になり得る**。これがここで扱う三次結合の理由である。$Q$ の全体倍率は別の規格化データであり、Picard–Fuchs方程式だけでは決まらない。

## 2. Hodge側の三次結合を定義し、直接例で確かめる

一次・二次の変形を交叉形式で測ると消える一方、三次は残る可能性がある。この最初の非自明な量を、各ファイバーの3形式と三階のGauss–Manin微分を組にして定義する。まず必要な直交性と非退化性を仮定として固定し、その意味を小さな線形代数の模型で確かめる。

<a id="def-mir1-16-yukawa-cubic"></a>

<!-- formal-statement-start -->
> **定義（B側のHodge三次結合）**
>
> $V$ 上の滑らかな一パラメータCalabi–Yau三次元族の第3コホモロジーの平坦束と、平行で交代的な非退化双線形形式 $Q$ を考える。$F^3$ の零でない正則局所切断 $\Omega$ を取り、$Q(F^3,F^1)=0$、Griffiths横断性を仮定する。$z$ 座標での **B側Yukawa三次結合**を

$$
C_{zzz}(z)=Q\bigl(\Omega_z,\nabla_z^3\Omega_z\bigr)
$$

> と定義する。この式は、選んだ局所座標、$\Omega$ の規格化、$Q$ の向きと倍率に依存する。添字 $zzz$ は同じ変形方向を三回挿入したことを示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-16-yukawa-cubic -->

**定義の確認**（交叉形式の条件を先に確かめる）。 $\mathbb C^4$ の一定基底を $e_0,\dots,e_3$ とし、$Q(e_0,e_3)=1$、$Q(e_1,e_2)=-1$ とし、残る独立な基底対の値は零、逆順は符号反転とする。行列は二つの可逆な $2\times2$ 交代ブロックからなるため非退化である。平坦接続を通常の微分 $d/dz$ とし、

$$
v(z)=e_0+ze_1+\frac{z^2}{2}e_2+\frac{z^3}{6}e_3
$$

と置く。$F^3=\langle v\rangle$、$F^2=\langle v,v'\rangle$、$F^1=\langle v,v',v''\rangle$ と置けば、微分で次の段へ入るので横断性を満たす。実際

$$
Q(v,v')=\frac{z^2}{2}-z^2+\frac{z^2}{2}=0,\quad
Q(v,v'')=z-z=0,
$$

$$
Q(v,v''')=Q(v,e_3)=1,\qquad Q(v',v'')=-1.
$$

従って $Q(F^3,F^1)=0$ であり、$C_{zzz}=1$ と直接求まる。これは**フィルトレーションと交叉形式の代数的模型**であって、この四次元空間が自動的に実際のCalabi–Yauの偏極Hodge構造になると主張していない。

<!-- definition-example-end -->

微分の階数とフィルトレーションの対応を使うのが本質であり、単に「三回微分した値」と定義しているわけではない。次に、この三次の幾何量が四階微分方程式からどれだけ決まるかを検証する。

## 3. Picard–Fuchs方程式が決める $z$ 依存性

まず一般の四階作用素で計算する。$D=d/dz$ とし、$D\Omega=\nabla_z\Omega$ と略記する。周期の全てが同じ微分方程式を満たすので、対象の階数4の平坦束では周期の非退化な組合せから

$$
D^4\Omega+a_3(z)D^3\Omega+a_2(z)D^2\Omega
+a_1(z)D\Omega+a_0(z)\Omega=0
$$

が成り立つ（サイクルとの全ての組が零ならコホモロジー類は零）。以下では $D$ はこの平坦束上の接続微分であり、$Q$ は平行である。

<a id="prop-mir1-16-yukawa-ode"></a>

<!-- formal-statement-start -->
> **命題（四階周期方程式と三次結合の微分方程式）**
>
> 複素曲線の連結開集合 $V$ 上で、平行な交代形式 $Q$、切断 $\Omega$、$D=\nabla_{\partial_z}$ を取る。$Q(\Omega,D\Omega)=Q(\Omega,D^2\Omega)=0$ とし、$\Omega$ が上記のモニックな四階方程式を満たすなら、$C_{zzz}=Q(\Omega,D^3\Omega)$ は

$$
\boxed{2\frac{dC_{zzz}}{dz}=-a_3(z)C_{zzz}}
$$

> を満たす。$C_{zzz}$ が恒等的に零の場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

直前の消滅等式を微分すると $Q(D\Omega,D^2\Omega)=-C_{zzz}$ が出る。さらに微分して $Q(D\Omega,D^3\Omega)$ を $C'_{zzz}$ で表し、四階方程式を使う。

<!-- proof-start -->
### 証明

$Q$ が平行なので積の微分が使える。まず $Q(\Omega,D^2\Omega)=0$ を微分すると

$$
0=Q(D\Omega,D^2\Omega)+Q(\Omega,D^3\Omega),
$$

よって $Q(D\Omega,D^2\Omega)=-C_{zzz}$。再び微分すると

$$
-C'_{zzz}=Q(D^2\Omega,D^2\Omega)+Q(D\Omega,D^3\Omega).
$$

交代性から第一項は零なので、$Q(D\Omega,D^3\Omega)=-C'_{zzz}$ である。一方、

$$
C'_{zzz}
=Q(D\Omega,D^3\Omega)+Q(\Omega,D^4\Omega).
$$

四階方程式へ $Q(\Omega,\ \cdot\ )$ を作用させると、低階項は仮定と $Q(\Omega,\Omega)=0$ により消え、

$$
Q(\Omega,D^4\Omega)=-a_3Q(\Omega,D^3\Omega)=-a_3C_{zzz}.
$$

両式を合わせ $C'_{zzz}=-C'_{zzz}-a_3C_{zzz}$、従って $2C'_{zzz}=-a_3C_{zzz}$。$\square$
<!-- proof-end -->

quinticでは[先行章の作用素](../MIR1-10/index.md#thm-mir1-10-quintic-pf)を使う。積とEuler作用素の展開は

$$
\mathcal L=(1-3125z)\theta^4-6250z\theta^3
-4375z\theta^2-1250z\theta-120z,\quad \theta=zD,
$$

$$
\theta^4=z^4D^4+6z^3D^3+7z^2D^2+zD,\qquad
\theta^3=z^3D^3+3z^2D^2+zD.
$$

$D^4$ の係数は $z^4(1-3125z)$、$D^3$ の係数は $6z^3(1-3125z)-6250z^4$ である。$V$ は $z=0,1/3125$ を含まないから最高係数で割れる。従って

$$
a_3(z)=\frac{6z^3(1-3125z)-6250z^4}
{z^4(1-3125z)}
=\frac6z-\frac{6250}{1-3125z}.
$$

<a id="thm-mir1-16-rational-yukawa"></a>

<!-- formal-statement-start -->
> **定理（quinticの三次結合の有理形）**
>
> $V\subset\{0<|z|<1/3125\}$ を連結で単連結な開集合とする。$V$ 上のDwork型quinticの群不変周期束について、$z=(5\psi)^{-5}$、$\Omega_z=\psi\,\operatorname{Res}(\Omega/F_\psi)$ として得られる正則3形式と平行交代形式 $Q$ を用いる。周期が

$$
\left[\theta^4-5z\prod_{j=1}^4(5\theta+j)\right]\omega=0
$$

> を満たすなら、ある $z$ に依存しない定数 $\kappa\in\mathbb C$ が存在し、

$$
\boxed{C_{zzz}(z)=\frac{\kappa}{z^3(1-3125z)}}
$$

> となる。$\kappa$ は周期微分方程式だけからは求まらない。幾何学的規格化に対応する追加条件 $\lim_{z\to0}z^3 C_{zzz}(z)=5$ を採用するときのみ $\kappa=5$ となる。極限は穿孔円板での解析接続による意味である。
<!-- formal-statement-end -->

### 証明の見取り図

[四階方程式からの関係](#prop-mir1-16-yukawa-ode)へ求めた $a_3$ を代入し、一次方程式を積分する。最後に定数は別途決まることを区別する。

<!-- proof-start -->
### 証明

$2C'=-a_3C$ へ上で計算した係数 $a_3$ を代入する。零解も許すため、$C$ で割らずに積分因子として扱う。

$$
C'+\left(\frac3z-\frac{3125}{1-3125z}\right)C=0.
$$

係数は $d\log(z^3(1-3125z))/dz$ に等しい。積の微分を計算すると

$$
\frac{d}{dz}\!\left[z^3(1-3125z)C(z)\right]
=z^3(1-3125z)\!\left[
C'+\left(\frac3z-\frac{3125}{1-3125z}\right)C
\right]=0.
$$

$V$ は連結なので角括弧の外の積は一定の $\kappa$ となり、主張の有理形が得られる。特に $z^3C=\kappa/(1-3125z)$ が原点へ延長され、与えた極限条件を入れると $\kappa=5$ である。$\square$
<!-- proof-end -->

**係数5はどこから来るか。** この定理だけで得たのは有理関数の**形**である。ここから先では $Q$ の向きと倍率、および周期の幾何学的同定を整合させて $\kappa=5$ を採用する。これはquinticの古典三重交叉数が5となる比較に適した**外部の規格化入力**であり、局所Picard–Fuchs方程式から導出した数字ではない。$Q$ を $cQ$ とすれば $\kappa$ も $c$ 倍になる。この追加条件をA模型との同値の証明と取り違えない。

## 4. 座標・正則3形式・周期の規格化は別々

三次結合の添字は単なる飾りではない。座標を $w$ に変えると三つの微分方向からJacobianが三回現れる。ただし連鎖律には二階微分・三階微分の項もあり、それらが**なぜ消えるか**を確認しなければならない。

<a id="prop-mir1-16-cubic-coordinate"></a>

<!-- formal-statement-start -->
> **命題（三次結合の座標変換と形式の再規格化）**
>
> 第2節の条件のもと、$z=z(w)$ を局所双正則な座標変換、$g(z)$ を零を持たない正則関数とする。$\widetilde\Omega=g\Omega$ と置けば、

$$
\boxed{C_{www}=\left(\frac{dz}{dw}\right)^3 C_{zzz}},
\qquad
\boxed{C^{\,\widetilde\Omega}_{zzz}=g(z)^2C^{\,\Omega}_{zzz}}.
$$

> 第一式では同じ $\Omega,Q$ を、第二式では同じ $z,Q$ を用いる。
<!-- formal-statement-end -->

### 証明の見取り図

まず $D_w=(dz/dw)D_z$ を三回適用し、低階微分を含む項を列挙する。次に $D_z^3(g\Omega)$ を積の微分で展開する。

<!-- proof-start -->
### 証明

$z'=dz/dw$ と書く。鎖律と積の微分により

$$
D_w\Omega=z'D_z\Omega,\quad
D_w^2\Omega=(z')^2D_z^2\Omega+z''D_z\Omega,
$$

$$
D_w^3\Omega=(z')^3D_z^3\Omega+3z'z''D_z^2\Omega+z'''D_z\Omega.
$$

この最後の式の左に $\Omega$ と $Q$ を組み合わせる。第1節で確かめた $Q(\Omega,D_z^2\Omega)=Q(\Omega,D_z\Omega)=0$ により二つの低階項が消え、第一式を得る。

一方、接続のLeibniz則を三回適用すると

$$
D_z^3(g\Omega)
=gD_z^3\Omega+3g'D_z^2\Omega+3g''D_z\Omega+g'''\Omega.
$$

$Q(g\Omega,\ \cdot\ )$ を作用させると、やはり低階三項が消え、$g^2Q(\Omega,D_z^3\Omega)$ だけが残る。$\square$
<!-- proof-end -->

**定数倍率と変数依存倍率の確認例。** $g=2$ なら $C$ は4倍であり、$g(z)=1+z$（$|z|<1/2$）なら $C$ は $(1+z)^2$ 倍になる。後者を「定数だけ変わる」と言うのは誤りである。ただし周期も同じ $g$ 倍になるので、次の規格化された比ではこの変化が相殺される。

[正則周期](../MIR1-11/index.md#thm-mir1-11-regular-period)を $\omega_0(z)=1+120z+113400z^2+\cdots$ とする。十分小さい円板で $\omega_0\ne0$、また[ミラー写像の局所双正則性](../MIR1-15/index.md#thm-mir1-15-local-biholomorphism)から $q=ze^{h(z)}$ の逆写像がある。$u=\operatorname{Log}q=2\pi it$ とすると、[前講の微分変換](../MIR1-15/index.md#prop-mir1-15-coordinate-derivatives)から

$$
\frac{du}{dz}=\frac{1+zh'(z)}z,\quad
\frac{dz}{du}=\frac{z}{1+zh'(z)},\quad
\frac{dz}{dt}=\frac{2\pi iz}{1+zh'(z)}.
$$

$z\ne0$、$1+zh'\ne0$ の局所領域に限って分母を取っている。

<a id="def-mir1-16-normalized-yukawa"></a>

<!-- formal-statement-start -->
> **定義（周期規格化したB側Yukawa結合）**
>
> 第3節の三次結合と追加の規格化 $\kappa=5$ を採用する。$\omega_0(z)$ を選んだ $\Omega_z$ の非零な周期として $\omega_0(0)=1$ に規格化し、$q=ze^{h(z)}$ とする。$u=\operatorname{Log}q=2\pi it$ を定める局所領域で、**周期規格化したB側Yukawa結合**を

$$
\boxed{
K_B(q)=\frac{C_{zzz}(z)}{\omega_0(z)^2}
\left(\frac{dz}{du}\right)^3
=\frac{1}{(2\pi i)^3}\frac{C_{zzz}(z)}{\omega_0(z)^2}
\left(\frac{dz}{dt}\right)^3
}
$$

> とする。ただし $z=Z(q)$ によって右辺を $q$ の関数として読む。$\omega_0\ne0$、$dz/du\ne0$ を仮定する。ここで「規格化」とは $Q$ の倍率を定める追加条件、形式を周期で割る操作、座標 $u$ を選ぶ操作を区別して指定することである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mir1-16-normalized-yukawa -->

**定義の確認。** $C_{zzz}=5/z^3$、$\omega_0=1$、$q=z$、従って $u=\operatorname{Log}z$ とする局所模型では $dz/du=z$ だから $K_B=5z^{-3}\cdot z^3=5$。一方 $t=u/(2\pi i)$ を使い $dz/dt=2\pi iz$ とすれば、$(2\pi i)^{-3}$ を添えた定義式で同じ5となる。周期を $g(z)\omega_0$、三次結合を $g(z)^2C$ に同時に替えれば商 $C/\omega_0^2$ は不変である。これで**三つの因子と非零条件**を直接確認した。

<!-- definition-example-end -->

$Q$ 自体を $cQ$ と替えると $K_B$ は $c$ 倍され、周期で割るだけでは補正できない。また $t\mapsto t+c$ とすると $q\mapsto e^{2\pi ic}q$ なので、$q=z+O(z^2)$ の固定条件を維持するには $e^{2\pi ic}=1$ が必要である。[整数周期格子](../MIR1-14/index.md#def-mir1-14-integral-period-lattice)の同定まではこの規格化計算では完了しない。

## 5. quinticで有理式を代入し、級数を検算する

<a id="thm-mir1-16-normalized-series"></a>

<!-- formal-statement-start -->
> **定理（B側の正規化式と初期係数）**
>
> 第4節の $\kappa=5$、$\omega_0(0)=1$、$h=A_1/\omega_0$、$q=ze^h$ の規約を採用する。$|z|$ を十分小さく、$z\ne0$、$\omega_0(z)\ne0$、$1+zh'(z)\ne0$ とする。このとき

$$
\boxed{K_B(q(z))=
\frac{5}{(1-3125z)\,\omega_0(z)^2\,(1+zh'(z))^3}}
$$

> であり、原点へ正則に延長される。Taylor級数は

$$
\boxed{K_B(q)=5+2875q+4876875q^2+O(q^3)}
$$

> である。これは**B側の規格化された局所級数**の計算であり、A側GW不変量や曲線本数との一致はこの定理の結論に含まれない。
<!-- formal-statement-end -->

### 証明の見取り図

$C_{zzz}$ と $dz/du$ を定義へ代入し、$z^3$ を相殺する。次に各因子を二次まで展開し、最後だけ $z=Z(q)$ を代入する。

<!-- proof-start -->
### 証明

[有理形](#thm-mir1-16-rational-yukawa)で $\kappa=5$、[連鎖律](../MIR1-15/index.md#prop-mir1-15-coordinate-derivatives)で $dz/du=z/(1+zh')$ を使うと

$$
K_B(q(z))
=\frac{5}{z^3(1-3125z)}\,\frac1{\omega_0^2}
\left(\frac{z}{1+zh'}\right)^3,
$$

となり、$z^3$ が打ち消される。分母の三因子は原点でいずれも1であり、正則延長が成立する。

[前講の周期商の係数](../MIR1-15/index.md#prop-mir1-15-forward-series)から

$$
\omega_0=1+120z+113400z^2+O(z^3),\quad
h=770z+717825z^2+O(z^3),
$$

$$
1+zh'=1+770z+1435650z^2+O(z^3).
$$

二項展開 $(1+x)^{-2}=1-2x+3x^2+O(x^3)$ と $(1+x)^{-3}=1-3x+6x^2+O(x^3)$ をそれぞれ代入する。

$$
\begin{aligned}
(1-3125z)^{-1}
 &=1+3125z+9765625z^2+O(z^3),\\
\omega_0^{-2}
 &=1-240z+(3\cdot120^2-2\cdot113400)z^2+O(z^3)\\
 &=1-240z-183600z^2+O(z^3),\\
(1+zh')^{-3}
 &=1-2310z+(6\cdot770^2-3\cdot1435650)z^2+O(z^3)\\
 &=1-2310z-749550z^2+O(z^3).
\end{aligned}
$$

最初の二因子の積は $1+2885z+8832025z^2+O(z^3)$ である。最後の因子を掛けると

$$
\begin{aligned}
K_B(q(z))/5
 &=1+(2885-2310)z\\
 &\quad +(8832025-2885\cdot2310-749550)z^2+O(z^3)\\
 &=1+575z+1418125z^2+O(z^3).
\end{aligned}
$$

よって $K_B(q(z))=5+2875z+7090625z^2+O(z^3)$ である。[逆ミラー級数](../MIR1-15/index.md#thm-mir1-15-inverse-coefficients)の $z=q-770q^2+O(q^3)$ を代入し、

$$
\begin{aligned}
K_B(q)
 &=5+2875(q-770q^2)+7090625q^2+O(q^3)\\
 &=5+2875q+(7090625-2213750)q^2+O(q^3)\\
 &=5+2875q+4876875q^2+O(q^3).
\end{aligned}
$$

求める結論である。$\square$
<!-- proof-end -->

**混同を避ける。** 上式の $2875$ は、いまはB側のTaylor係数である。これを「2875本の直線」と呼ぶためには、A側の仮想基本類・三点関数、ミラー定理、複数被覆の扱いなど別の理論が必要となる。これらはMIR2で扱う。$q$ 自体は解析的局所座標だが、A側で形式変数として使う場合の意味もこの段階では同一と断定しない。

## 6. 演習：消える項と残る規格化を自分で証明する

### Level A：局所計算と規約

<a id="ex-mir1-16-a01"></a>
#### MIR1-16-A01 フィルトレーションと消滅
- Level: A

重さ3の交叉形式 $Q$ について $Q(F^p,F^{4-p})=0$、$\Omega\in F^3$、$\nabla\Omega\in F^2$、$\nabla^2\Omega\in F^1$ とする。$Q(\Omega,\nabla\Omega)$ と $Q(\Omega,\nabla^2\Omega)$ を求め、三回目の微分について同じ議論だけでは何が言えないか答えよ。

<!-- solution-start -->
**詳細解答。** $F^2\subset F^1$ なので $\nabla\Omega\in F^1$、$\nabla^2\Omega\in F^1$。$Q(F^3,F^1)=0$ より両方零となる。三回目はGriffiths横断性から $\nabla^3\Omega\in F^0$ しか従わず、$Q(F^3,F^0)=0$ は仮定されていない。従って $C=Q(\Omega,\nabla^3\Omega)$ は零とも非零ともまだ断定できない。
<!-- solution-end -->

<a id="ex-mir1-16-a02"></a>
#### MIR1-16-A02 Euler作用素の最高二係数
- Level: A

$\theta=zD$、$D=d/dz$ について $\theta^3,\theta^4$ の $D^4,D^3$ の係数を求め、$\mathcal L=(1-3125z)\theta^4-6250z\theta^3+\cdots$ のモニックな四階形での $a_3(z)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 積の微分を順次用いると $\theta^2=z^2D^2+zD$、$\theta^3=z^3D^3+3z^2D^2+zD$、$\theta^4=z^4D^4+6z^3D^3+7z^2D^2+zD$。従って最高係数 $z^4(1-3125z)$ と三階係数 $6z^3(1-3125z)-6250z^4$ の比は $6/z-6250/(1-3125z)$ となる。$z\ne0,1/3125$ の条件で除算できる。
<!-- solution-end -->

<a id="ex-mir1-16-a03"></a>
#### MIR1-16-A03 形式の倍率
- Level: A

$C^\Omega_{zzz}=Q(\Omega,D^3\Omega)$、$Q(\Omega,D^j\Omega)=0$（$j=0,1,2$）とする。$g(z)=1+2z$ として $\widetilde\Omega=g\Omega$ に替えた場合の $C^{\widetilde\Omega}_{zzz}$ を導け。

<!-- solution-start -->
**詳細解答。** $D^3(g\Omega)=gD^3\Omega+3g'D^2\Omega+3g''D\Omega+g'''\Omega$。$g'=2$、$g''=g'''=0$ である。$Q(g\Omega,\cdot)$ を取ると $D^2\Omega$ の項は消え、$C^{\widetilde\Omega}=g^2C^\Omega=(1+2z)^2C^\Omega$。零を持たない領域（例えば $|z|<1/4$）で新形式も零でない。
<!-- solution-end -->

<a id="ex-mir1-16-a04"></a>
#### MIR1-16-A04 $2\pi i$ の三乗
- Level: A

$u=2\pi it$、$z=z(u)$ とする。$C_{zzz}/\omega_0^2=5/z^3$、$z=e^u$ の例で、$K=(C/\omega_0^2)(dz/du)^3$ と $(2\pi i)^{-3}(C/\omega_0^2)(dz/dt)^3$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $dz/du=z$ だから第一式は $5z^{-3}z^3=5$。連鎖律で $dz/dt=(dz/du)(du/dt)=2\pi iz$。第二式は $(2\pi i)^{-3}5z^{-3}(2\pi iz)^3=5$。$(2\pi i)^{-3}$ を忘れると第二式は $5(2\pi i)^3$ となり、同じ規格化ではない。
<!-- solution-end -->

<a id="ex-mir1-16-a05"></a>
#### MIR1-16-A05 $z$ 級数の一次
- Level: A

$\omega_0=1+120z+O(z^2)$、$h=770z+O(z^2)$ とする。$5[(1-3125z)\omega_0^2(1+zh')^3]^{-1}$ の一次までを求めよ。

<!-- solution-start -->
**詳細解答。** 三因子の逆数は順に $1+3125z+O(z^2)$、$1-240z+O(z^2)$、$1-2310z+O(z^2)$。その積の一次係数は $3125-240-2310=575$ だから結果は $5+5\cdot575z+O(z^2)=5+2875z+O(z^2)$。
<!-- solution-end -->

### Level B：証明をつなぐ

<a id="ex-mir1-16-b01"></a>
#### MIR1-16-B01 交代性から一次方程式を再構成
- Level: B

平行な交代形式 $Q$ と切断 $v$ が $Q(v,Dv)=Q(v,D^2v)=0$ および $D^4v+a_3D^3v+a_2D^2v+a_1Dv+a_0v=0$ を満たす。$S=Q(v,D^3v)$ として、$S'$ の方程式を証明せよ。$S$ が零でも論証が有効な形にせよ。

<!-- solution-start -->
**詳細解答。** $Q(v,D^2v)=0$ の微分から $Q(Dv,D^2v)=-S$。さらに微分し、$Q(D^2v,D^2v)=0$ を使うと $Q(Dv,D^3v)=-S'$。他方 $S'=Q(Dv,D^3v)+Q(v,D^4v)$ である。四階方程式と $Q(v,v)=Q(v,Dv)=Q(v,D^2v)=0$ より $Q(v,D^4v)=-a_3S$。従って $S'=-S'-a_3S$、すなわち $2S'=-a_3S$。どこでも $S$ による除算をしていないので零解も含む。
<!-- solution-end -->

<a id="ex-mir1-16-b02"></a>
#### MIR1-16-B02 変数変換の低階項が消える理由
- Level: B

$z=z(w)$ とし、$Q(\Omega,D_z\Omega)=Q(\Omega,D_z^2\Omega)=0$ とする。$D_w^3\Omega$ を $D_z$ で展開し、$C_{www}=(dz/dw)^3C_{zzz}$ を示せ。また $z(w)=w^2$ を用いるならどの領域を除く必要があるか。

<!-- solution-start -->
**詳細解答。** $D_w=z'D_z$ から二回目は $(z')^2D_z^2+z''D_z$、三回目は $(z')^3D_z^3+3z'z''D_z^2+z'''D_z$ となる。$Q(\Omega,\cdot)$ により低階の二項が消えて三乗だけ残る。$z=w^2$ なら $dz/dw=2w$ であり、$w=0$ では局所可逆性が失われる。従って $w\ne0$ の十分小さい単連結領域で適用し、$C_{www}=(2w)^3C_{zzz}$ とする。
<!-- solution-end -->

<a id="ex-mir1-16-b03"></a>
#### MIR1-16-B03 三つの二次展開を再合成
- Level: B

$\omega_0=1+120z+113400z^2+O(z^3)$、$h=770z+717825z^2+O(z^3)$ とし、$K_B(q(z))=5/[(1-3125z)\omega_0^2(1+zh')^3]$ を二次まで求めよ。続いて $z=q-770q^2+O(q^3)$ を入れ、$q^2$ 係数を求めよ。

<!-- solution-start -->
**詳細解答。** $\omega_0^{-2}=1-240z-183600z^2+O(z^3)$、$(1+zh')^{-3}=1-2310z-749550z^2+O(z^3)$、$(1-3125z)^{-1}=1+3125z+9765625z^2+O(z^3)$。最初の二因子ではなく判別式因子と周期因子を先に掛けると $1+2885z+8832025z^2$ である。最後を掛ければ二次係数 $8832025-2885\cdot2310-749550=1418125$、一次係数 $575$。従って $K_B=5+2875z+7090625z^2+O(z^3)$。代入後の二次係数は $7090625-2875\cdot770=4876875$ である。
<!-- solution-end -->

<a id="ex-mir1-16-b04"></a>
#### MIR1-16-B04 方程式が決めない情報
- Level: B

同じ $\mathcal L$ を満たす二つの周期束の交叉形式を $Q$ と $\widetilde Q=7Q$ とする。$C,\widetilde C$ と、周期規格化後の $K,\widetilde K$ の関係を述べ、「$\omega_0$ で割れば規格化の自由度が全て消える」が誤りであることを示せ。

<!-- solution-start -->
**詳細解答。** 双線形性から $\widetilde C=Q\text{ の }7\text{ 倍}=7C$。$Q$ だけを変更したので各周期 $\omega_0$、$q$、$dz/du$ は変わらない。よって $\widetilde K=7K$。他方、$\Omega\mapsto g\Omega$ なら周期と三次結合がそれぞれ $g$ と $g^2$ 倍になり、$C/\omega_0^2$ は変わらない。従って形式の倍率と交叉形式の倍率は別であり、$\kappa=5$ は後者を含めた追加の規格化条件である。
<!-- solution-end -->

### Level C：B側だけで何が証明できたか

<a id="ex-mir1-16-c01"></a>
#### MIR1-16-C01 四階方程式からミラー座標の二次係数まで
- Level: C

$V\subset\{0<|z|<1/3125\}$ の群不変周期系で $\mathcal L=\theta^4-5z\prod_{j=1}^4(5\theta+j)$、$\theta=zD$ とする。平行な交代形式 $Q$、$\Omega\in F^3$ を取り、$Q(\Omega,D\Omega)=Q(\Omega,D^2\Omega)=0$ とする。また $\omega_0=1+120z+113400z^2+O(z^3)$、$h=770z+717825z^2+O(z^3)$、$q=ze^h$ とする。

1. $C=Q(\Omega,D^3\Omega)$ の微分方程式と一般解を導け。
2. $\lim_{z\to0}z^3C=5$ と規格化し、$u=\operatorname{Log}q$、$K_B=C\omega_0^{-2}(dz/du)^3$ を二次まで求めよ。
3. $z=q-770q^2+O(q^3)$ を使って $K_B(q)$ を求め、なお未証明のA側の主張を一つ挙げよ。

<!-- solution-start -->
**詳細解答。**

**（1）** $\mathcal L$ をEuler形式で展開すると $D^4$ と $D^3$ の係数は $z^4(1-3125z)$ と $6z^3(1-3125z)-6250z^4$ だから、モニックな方程式で $a_3=6/z-6250/(1-3125z)$。交代形式の平行性と二つの消滅式から

$$
Q(D\Omega,D^2\Omega)=-C,\qquad
Q(D\Omega,D^3\Omega)=-C'.
$$

さらに四階方程式から $Q(\Omega,D^4\Omega)=-a_3C$ なので、$C'=-C'-a_3C$。ゆえに

$$
\frac{d}{dz}\left[z^3(1-3125z)C(z)\right]=0,\quad
C(z)=\frac{\kappa}{z^3(1-3125z)}.
$$

**（2）** 極限条件から $\kappa=5$。$u=\operatorname{Log}z+h$ なので $du/dz=(1+zh')/z$。零にならない局所領域では $dz/du=z/(1+zh')$ である。したがって

$$
K_B(q(z))=\frac5{(1-3125z)\omega_0^2(1+zh')^3}.
$$

各逆因子の二次係数を個別に出すと

$$
\begin{aligned}
(1-3125z)^{-1}&=1+3125z+9765625z^2+\cdots,\\
\omega_0^{-2}&=1-240z-183600z^2+\cdots,\\
(1+zh')^{-3}&=1-2310z-749550z^2+\cdots.
\end{aligned}
$$

積の一次は $3125-240-2310=575$、二次は $8832025-2885\cdot2310-749550=1418125$。よって $K_B(q(z))=5+2875z+7090625z^2+O(z^3)$。

**（3）** $z^2=q^2+O(q^3)$ と $z=q-770q^2+O(q^3)$ を代入し、

$$
K_B(q)=5+2875q+(7090625-2875\cdot770)q^2+O(q^3)
=5+2875q+4876875q^2+O(q^3).
$$

これはB側の周期計算から得た関数である。例えば「一次係数2875が実際の直線の本数を与える」ことはまだ証明していない。そのためにはA側GW理論とミラー定理による照合が必要である。
<!-- solution-end -->

## 7. MIR1の終点とMIR2への橋

MIR1では、Dwork族の滑らかさ、留数形式と周期、Picard–Fuchs作用素、Frobenius解、モノドロミー、ミラー座標を経て、**周期規格化されたB側三次結合**に到達した。局所計算の結論は

$$
q=z+770z^2+1014275z^3+\cdots,\qquad
K_B(q)=5+2875q+4876875q^2+\cdots
$$

である。ただし $\kappa=5$ は交叉形式等の幾何学的規格化を含む追加条件である。$Q$ の尺度、積分周期基底の同定、A側での曲線計数との一致は、微分方程式と局所Frobenius級数だけでは証明できない。

次の **MIR2-01「複素化KählerパラメータとA側の幾何」**からは、A側の曲線類と係数変数を定義し直す。後のミラー定理で比較するまでは、B側の $q$ とA側のNovikov変数、B側のTaylor係数と幾何学的曲線本数を無条件に同一視しない。

**参考文献**：[Cox–Katz, *Mirror Symmetry and Algebraic Geometry*](https://doi.org/10.1090/surv/068)、[Horiほか, *Mirror Symmetry*](https://www.claymath.org/resource/mirror-symmetry/)、[Candelasほか（1991）](https://www.staff.science.uu.nl/~beuke106/HypergeometricFunctions/COGP.pdf)。本講の微分方程式・座標変換・低次係数は本文内で導出した。
