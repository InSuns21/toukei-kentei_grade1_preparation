# EMAG7 電磁誘導と Maxwell 方程式

EMAG1--EMAG4 では静止した電荷と電場を、EMAG5 では定常電流と磁場を、EMAG6 では場が荷電粒子へ及ぼす Lorentz 力を調べました。しかし静的な法則だけでは、磁場を時間とともに変えたときに電流が生じる実験や、充電中のコンデンサー周囲の磁場を説明できません。

本章の中心問いは、**時間的に変化する電場と磁場が、互いにどのように結び付くか**です。真空中の SI 単位系で、電場 $E$（V/m）、磁場 $B$（T）、電荷密度 $\rho$（C/m³）、伝導電流密度 $J$（A/m²）を使います。$\varepsilon_0$、$\mu_0$ は真空の誘電率と透磁率です。場は必要な偏微分が連続な領域で考え、理想化した境界や導線は必要な箇所で断ります。

静磁場を時間依存させるだけでよいのか。それとも法則の形自体を拡張すべきか。この違いを、面を貫く磁場の量・誘導起電力・変位電流から確かめます。

---

## 1. 面を貫く磁場を符号付きで数える

EMAG5 では $\nabla\cdot B=0$ を学びました。「どれほどの磁場が面を貫くか」を数えるには、面積だけでなく面の**向き**が必要です。面 $S$ に単位法線 $n$ を与え、磁場の法線方向の成分を面全体で積分します。

<a id="def-emag7-magnetic-flux"></a>

<!-- formal-statement-start -->
> **定義（磁束）**  
> 向き付けられた区分的に滑らかな面 $S$ と、そこで連続な磁場 $B(t,x)$ に対して、時刻 $t$ の磁束を
>
$$
\boxed{\Phi_B(S,t)=\int_S B(t,x)\cdot n(x)\,dS}
$$
>
> と定める。SI 単位はウェーバ（Wb）であり、$1\ \mathrm{Wb}=1\ \mathrm{T\,m^2}$ である。面の向きを反転すると磁束の符号も反転する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-emag7-magnetic-flux -->
### 例：傾けた円板の磁束

**定義の確認**

面積 $\pi a^2$ の平面円板に一定の磁場 $B=B_0e_z$ が貫き、法線が $e_z$ となす角を $\theta$ とします。円板上で $B\cdot n=B_0\cos\theta$ は一定なので、

$$
\Phi_B
=\int_S B_0\cos\theta\,dS
=B_0\pi a^2\cos\theta.
$$

$\theta=0$ なら正の最大値、$\theta=\pi/2$ なら 0、$\theta=\pi$ なら負の最大絶対値を取ります。磁束は「場の強さ×面積」を機械的に掛けたものではなく、**向き付きの流束**です。
<!-- definition-example-end -->

境界曲線 $C=\partial S$ の正の進行向きは、法線 $n$ から見て反時計回りです（右手系の約束）。後の循環と磁束は必ずこの組で符号を合わせます。

## 2. 磁束が変わると電場が循環する

静電場では EMAG3 の $E=-\nabla\phi$ から閉曲線に沿う積分は 0 でした。ところが、**固定された導線の輪の中を貫く磁束を変化させると、輪に沿って電荷を動かす電場が現れる**ことが実験で分かります。この非保存的な電場を静電ポテンシャルだけで説明することはできません。

まず、動かない閉曲線 $C$ に沿って、単位電荷あたりの電気力の仕事を測る量を導入します。

<a id="def-emag7-emf"></a>

<!-- formal-statement-start -->
> **定義（静止回路の誘導起電力）**  
> 空間に固定された向き付き閉曲線 $C$ 上の電場 $E(t,x)$ に対し、
>
$$
\boxed{\mathcal E_C(t)=\oint_C E(t,x)\cdot d\ell}
$$
>
> を電場による起電力と呼ぶ。SI 単位はボルト（V）である。$C$ の向きを反転すれば符号が反転する。ここでは動く導体の磁気力による起電力を含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-emag7-emf -->
### 例：円周に沿う接線電場

**定義の確認**

半径 $a$ の円周を $+z$ から見て反時計回りに巡り、電場が周上で $E=E_\varphi e_\varphi$（$E_\varphi$ 一定）とします。弧長要素は $d\ell=a e_\varphi d\varphi$ なので、

$$
\mathcal E_C
=\int_0^{2\pi}E_\varphi a\,d\varphi
=2\pi a E_\varphi.
$$

電場が周方向と逆なら $E_\varphi<0$ で、起電力は負になります。これは閉回路に沿う電場の仕事を、符号も含めて数えています。
<!-- definition-example-end -->

磁束と起電力を結ぶのは実験的な物理法則です。時間とともに変わる磁束が、循環する電場を作ることを表します。

<a id="principle-emag7-faraday"></a>

<!-- formal-statement-start -->
> **原理（固定回路に対する Faraday の電磁誘導則）**  
> 真空中で時間に依存する十分滑らかな電磁場 $E,B$ を考える。空間に固定された任意の向き付き曲面 $S$ とその境界 $C=\partial S$ に、上記の右手系の向きを与えるとき、
>
$$
\boxed{
\oint_C E(t,x)\cdot d\ell
=-\frac{d}{dt}\int_S B(t,x)\cdot n\,dS
}
$$
>
> が成り立つ。すなわち $\mathcal E_C=-d\Phi_B/dt$ である。
<!-- formal-statement-end -->

これは微分積分学から証明する式ではなく、自然界についての**経験則**です。右辺の負号は後述する Lenz の法則に対応します。一方、積分形と微分形が同値になることは数学的な定理です。

### 2.1 円板に一様な時間変化磁場を通す

静止した半径 $a$ の円形回路を $xy$ 平面に置き、$n=e_z$ を正とします。理想化して

$$
B(t,x)=B_0(t)e_z
$$

が円板全体で一様とします。磁束は $\Phi_B=\pi a^2 B_0(t)$ なので

$$
\mathcal E_C=-\pi a^2\dot B_0(t).
$$

回転対称性から周上の電場が接線方向に一定なら、

$$
2\pi a E_\varphi(a,t)=-\pi a^2\dot B_0(t),
\qquad
\boxed{E_\varphi(a,t)=-\frac a2\dot B_0(t)}.
$$

$\dot B_0>0$、すなわち**紙面手前向きの磁場が強くなる**なら、$E_\varphi<0$ で、電場の循環は上から見て時計回りになります。

![法線を紙面手前へ取った円形回路で、紙面手前向きの磁場が強まると誘導電場が時計回りとなる](assets/induction-loop.svg)

図では輪の右端における誘導電場が下向きです。「磁場が紙面の手前向き」だけでは誘導の向きは決まらず、**時間的に増加しているか減少しているか**が必要です。

### 2.2 Lenz の法則の意味と適用範囲

誘導電流が流れる抵抗性の閉じた導線では、電流の磁場は**磁束の変化を打ち消す向き**を向きます。これを Lenz の法則と呼びます。

上の例で磁束が $+z$ 方向に増えるなら、誘導電流は $-z$ 方向の磁場を作る時計回りです。減るなら逆向きです。これは「外部磁場そのものに必ず反対向き」という意味ではありません。回路が開いていれば誘導電場があっても持続的な周回電流は流れず、電流の大きさ・位相は回路の抵抗や自己誘導などに依存します。

### 2.3 局所式へ変える

$S$ は固定し、$E,B$ の正則性から時間微分を面積分の中へ入れられるとします。[VC5 の Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)を電場へ適用すると、

$$
\oint_{\partial S}E\cdot d\ell
=\int_S(\nabla\times E)\cdot n\,dS.
$$

したがって Faraday の法則は

$$
\int_S(\nabla\times E)\cdot n\,dS
=-\int_S\partial_t B\cdot n\,dS,
$$

つまり

$$
\int_S(\nabla\times E+\partial_tB)\cdot n\,dS=0.
$$

任意の十分小さい向き付き面で成り立ち、被積分関数が連続なら、各点でその法線成分は 0 です。独立な三方向の法線を選ぶと、

$$
\boxed{\nabla\times E=-\partial_tB}
$$

を得ます。逆向きには、微分形を面で積分して [Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)を使えば積分形が戻ります。数学的な一般証明は [VC9 の積分形と微分形の対応](../VC9/index.md#thm-vc9-maxwell-differential)にあります。

特に $\partial_t B\ne0$ なら、$\nabla\times E\ne0$ です。静電場の $E=-\nabla\phi$ だけでは $\nabla\times E=0$ となってしまい、誘導を記述できません。

---

## 3. 導線自体が動くとき：磁気力が電荷を押す

「磁束が変化する」という表現は、磁場が時間に依存するときだけでなく、**回路の位置や面積が変わる場合**にも登場します。ただし、ここまでの $\oint_C E\cdot d\ell$ は固定回路についての式であり、動く回路に機械的に使ってはいけません。

例えば $xy$ 平面上の矩形回路で、長さ $\ell$ の右辺の導体棒が速度 $v e_x$（$v>0$）で右へ滑り、固定した一様磁場 $B=B_0e_z$（$B_0>0$）があるとします。回路面積が $A(t)=\ell x(t)$ なら

$$
\frac{d\Phi_B}{dt}=B_0\ell v.
$$

棒中の正電荷が導体と同じ速度で動くとき、その単位電荷あたりの磁気力は

$$
v e_x\times B_0e_z=-vB_0e_y.
$$

したがって棒の上向き（反時計回り）を正とした寄与は

$$
\int_{\mathrm{rod}}(v\times B)\cdot d\ell=-B_0\ell v,
$$

つまり増える $+z$ 磁束に抗する**時計回り**の起電力です。棒以外の部分を静止とし、準静的近似の下で起電力の合計は

$$
\mathcal E_{\mathrm{moving}}
=\oint_{C(t)}(E+u\times B)\cdot d\ell
=-\frac{d\Phi_B(S(t),t)}{dt}
=-B_0\ell v.
$$

ここで $u$ は各導線部分の速度です。一般の動く滑らかな回路に拡張するには、回路に沿う電磁力と**動く面の磁束の時間変化**を結ぶ輸送公式、および $\nabla\cdot B=0$ が必要です。この運動による起電力と、静止回路の時間変化磁場による起電力は、同じ総磁束変化の公式にまとめられますが、力の内訳は異なります。

導体の抵抗が $R>0$、自己誘導や接触抵抗を無視するとき、誘導電流の大きさは $I=B_0\ell v/R$ です。棒の電流は $-e_y$ 方向なので、その磁気力は

$$
F_{\mathrm{rod}}=-I\ell B_0e_x.
$$

棒を等速で引く外力の仕事率は

$$
P_{\mathrm{ext}}=I\ell B_0v
=\frac{(B_0\ell v)^2}{R}=I^2R.
$$

機械的に供給した仕事が抵抗で熱へ変わり、変化に抗する向きがエネルギー収支にも現れます。

---

## 4. 充電中のコンデンサーで定常 Ampère 則が破綻する

磁静場で習った Ampère の法則は

$$
\oint_C B\cdot d\ell=\mu_0\int_SJ\cdot n\,dS
$$

でした。定常電流なら、同じ境界 $C$ を持つ異なる曲面 $S$ で右辺が一致します。しかしコンデンサーを充電していると、導線を切る面には電流が流れ、二枚の極板の間を張る面には伝導電流が流れません。

同じ境界の左辺が**一方では $\mu_0 I$、他方では 0**になるのは矛盾です。必要なのは、極板間で変化する**電場**を考慮することです。

### 4.1 変位電流という補正

電場の時間変化に $\varepsilon_0$ を掛けた量は、電流密度と同じ単位を持ちます。これを新しい「荷電粒子の流れ」と誤解しないため、定義を区別します。

<a id="def-emag7-displacement-current"></a>

<!-- formal-statement-start -->
> **定義（変位電流密度と変位電流）**  
> 真空中で時間微分可能な電場 $E(t,x)$ に対し、
>
$$
\boxed{J_D:=\varepsilon_0\partial_tE}
$$
>
> を **変位電流密度**と呼ぶ。固定した向き付き面 $S$ を貫く変位電流は
>
$$
\boxed{I_D(S,t):=\int_SJ_D\cdot n\,dS
=\varepsilon_0\frac{d}{dt}\int_SE\cdot n\,dS}
$$
>
> とする。単位はそれぞれ A/m²、A である。$I_D$ は真空中の電荷の実際の通過量を意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-emag7-displacement-current -->
### 例：一様に充電される平行板

**定義の確認**

面積 $A$ の大きな平行板コンデンサーで、縁の効果を無視し、極板間の電場を

$$
E(t)=\frac{Q(t)}{\varepsilon_0 A}e_z
$$

と近似します。極板と平行な向き付き面を $n=e_z$ と取れば、

$$
J_D=\varepsilon_0\frac{\dot Q}{\varepsilon_0 A}e_z
=\frac{\dot Q}{A}e_z,
$$

$$
I_D=\int_S\frac{\dot Q}{A}\,dS=\dot Q.
$$

導線から極板へ流入する伝導電流 $I=\dot Q$ と、極板間の変位電流が一致します。極板間には導電粒子が移動しなくても、電場の時間変化が必要な項を担うわけです。
<!-- definition-example-end -->

この補正を含めた Ampère の法則が、時間変化する場にも適用される物理法則になります。

<a id="principle-emag7-ampere-maxwell"></a>

<!-- formal-statement-start -->
> **原理（Ampère--Maxwell の法則）**  
> 真空中の十分滑らかな電磁場について、任意の空間に固定された向き付き曲面 $S$ と境界 $C=\partial S$ に対し、
>
$$
\boxed{
\oint_C B\cdot d\ell
=\mu_0\int_SJ\cdot n\,dS
+\mu_0\varepsilon_0\frac{d}{dt}\int_SE\cdot n\,dS
}
$$
>
> が成り立つ。$J$ は電荷の実際の移動に伴う伝導電流密度であり、最後の項が変位電流による寄与である。
<!-- formal-statement-end -->

固定面と [Kelvin--Stokes の定理](../VC5/index.md#thm-vc5-stokes)を使えば、Faraday の法則と同じ手順で

$$
\boxed{\nabla\times B=\mu_0J+\mu_0\varepsilon_0\partial_tE}
$$

を得ます。定常場 $\partial_tE=0$ なら元の Ampère 則へ戻ります。

### 4.2 二つの曲面を同じ境界に張る

充電導線を取り巻く閉曲線 $C$ を固定し、曲面 $S_1$ は導線を横切り、$S_2$ は同じ $C$ を境界として極板間へ膨らませます。

$S_1$ では伝導電流が $I$ 流れます（電場の時間変化を無視できる部分を選ぶ近似）。$S_2$ では伝導電流は 0 ですが、極板間の例から $I_D=\dot Q=I$ です。したがって

$$
\int_{S_1}(J+J_D)\cdot n\,dS=I,
\qquad
\int_{S_2}(J+J_D)\cdot n\,dS=I.
$$

両者が同じ循環 $\oint_CB\cdot d\ell=\mu_0 I$ を与えます。この具体例では、導線側の変位電流を無視し、極板間の電場を一様とする準静的近似を用いました。

**一般の曲面で一致する理由も式で確かめます。** 全電流密度を

$$
J_{\mathrm{tot}}=J+\varepsilon_0\partial_tE
$$

と置きます。電荷保存 $\partial_t\rho+\nabla\cdot J=0$ と電場の Gauss 則 $\nabla\cdot E=\rho/\varepsilon_0$ を満たす滑らかな場なら、

$$
\begin{aligned}
\nabla\cdot J_{\mathrm{tot}}
&=\nabla\cdot J+\varepsilon_0\nabla\cdot(\partial_tE)\\
&=\nabla\cdot J+\varepsilon_0\partial_t(\nabla\cdot E)\\
&=\nabla\cdot J+\partial_t\rho=0.
\end{aligned}
$$

同じ境界を持つ $S_1,S_2$ が一つの体積 $V$ の境界を $S_1\cup(-S_2)$ として作る場合、[VC4 の Gauss--Ostrogradsky の発散定理](../VC4/index.md#thm-vc4-gauss-divergence)から

$$
\int_{S_1}J_{\mathrm{tot}}\cdot n_1\,dS
-\int_{S_2}J_{\mathrm{tot}}\cdot n_2\,dS
=\int_V\nabla\cdot J_{\mathrm{tot}}\,dV=0.
$$

つまり二つの面を通る**伝導電流と変位電流の和**は等しいのです。曲面が複雑な場合も、それらの差を閉曲面として扱える領域では同じ議論が使えます。

---

## 5. 変位電流の係数が電荷保存に合う理由

EMAG5 の連続の式は

$$
\partial_t\rho+\nabla\cdot J=0
$$

でした。もし時間依存のまま $\nabla\times B=\mu_0J$ を使うと、回転の発散が 0 なので $\nabla\cdot J=0$ を強制し、局所電荷密度が変化できなくなります。

一方、Gauss の法則は $\nabla\cdot E=\rho/\varepsilon_0$ です。Ampère--Maxwell の微分形に発散を作用させると、

$$
\begin{aligned}
0
&=\nabla\cdot(\nabla\times B)\\
&=\mu_0\nabla\cdot J
+\mu_0\varepsilon_0\partial_t(\nabla\cdot E)\\
&=\mu_0\nabla\cdot J
+\mu_0\varepsilon_0\partial_t(\rho/\varepsilon_0)\\
&=\mu_0(\nabla\cdot J+\partial_t\rho).
\end{aligned}
$$

従って連続の式と整合します。この計算の数学的責務は [VC9 の Maxwell 方程式から電荷保存](../VC9/index.md#thm-vc9-charge-conservation)にあります。

重要な区別があります。**電荷保存から変位電流の形を動機づけることはできますが、それだけで Maxwell 方程式のすべてを物理的に証明したことにはなりません。** たとえば、発散が 0 のベクトル場を追加しても連続の式とは矛盾しません。補正項を含む法則の採否には実験と物理モデルが必要です。

---

## 6. 四つの Maxwell 方程式を一つの体系で読む

ここまでの物理法則を並べると、真空中の Maxwell 方程式になります。電場に対する Gauss の法則と磁束に対する Gauss の法則は EMAG2・EMAG5 の内容を引き継ぎ、時間変化する二つの法則が新たに加わります。

| 法則 | 微分形 | 積分形（動かない面・領域） |
|---|---|---|
| 電場の Gauss | $\nabla\cdot E=\rho/\varepsilon_0$ | $\displaystyle\int_{\partial V}E\cdot n\,dS=Q_V/\varepsilon_0$ |
| 磁束の Gauss | $\nabla\cdot B=0$ | $\displaystyle\int_{\partial V}B\cdot n\,dS=0$ |
| Faraday | $\nabla\times E=-\partial_tB$ | $\displaystyle\oint_{\partial S}E\cdot d\ell=-d\Phi_B(S,t)/dt$ |
| Ampère--Maxwell | $\nabla\times B=\mu_0J+\mu_0\varepsilon_0\partial_tE$ | $\displaystyle\oint_{\partial S}B\cdot d\ell=\mu_0I_S+\mu_0\varepsilon_0\,d\Phi_E(S,t)/dt$ |

ここで $Q_V=\int_V\rho\,dV$、$I_S=\int_SJ\cdot n\,dS$、$\Phi_E=\int_SE\cdot n\,dS$ です。積分形の閉曲面は外向き法線、境界曲線は面の法線に対応する右手系の向きを採用します。

- **発散の二式**は、電荷が電場の源になることと磁束に局所的な湧き出しがないことを表します。
- **回転の二式**は、時間変化する $B$ が渦状の $E$ を、伝導電流と時間変化する $E$ が渦状の $B$ を作ることを表します。

これらは単に四つの独立な公式ではありません。電荷保存との両立、固定回路における誘導、静的極限が相互に結び付いた体系です。[VC9 の対応定理](../VC9/index.md#thm-vc9-maxwell-differential)では、発散定理と Stokes の定理で積分形・微分形を相互に導いています。

### 6.1 誘導電場があるときポテンシャルをどう書くか

EMAG6 はポテンシャル $\phi,A$ を使って

$$
B=\nabla\times A,
\qquad E=-\nabla\phi-\partial_tA
$$

と書きました。Faraday の法則が、この電場の形を自然に要求することを確認します。

各点の周囲の十分小さな球内を考えます。EMAG5 で使ったベクトルポテンシャル表示をこの球内でも使い、$B=\nabla\times A$ と表せるとします。すると

$$
\begin{aligned}
\nabla\times(E+\partial_tA)
&=\nabla\times E+\partial_t(\nabla\times A)\\
&=-\partial_tB+\partial_tB\\
&=0.
\end{aligned}
$$

ここで $F:=E+\partial_tA$ と置き、回転が 0 の場から局所的なポテンシャルを実際に構成します。球の中心を $x_0$、$u=x-x_0$ として、

$$
g(x)=\int_0^1F(x_0+su)\cdot u\,ds
$$

と定めます。球は凸なので、積分路 $x_0+su$ は $0\le s\le1$ で常に球内にあります。$\nabla\times F=0$ から $\partial_iF_j=\partial_jF_i$ です。よって積分内を $x_i$ で偏微分すると、

$$
\begin{aligned}
\partial_i g(x)
&=\int_0^1\left[F_i(x_0+su)+s\sum_j u_j\partial_iF_j(x_0+su)\right]ds\\
&=\int_0^1\left[F_i(x_0+su)+s\sum_j u_j\partial_jF_i(x_0+su)\right]ds\\
&=\int_0^1\frac{d}{ds}\left[sF_i(x_0+su)\right]ds\\
&=F_i(x).
\end{aligned}
$$

したがって $F=\nabla g$ です。$\phi:=-g$ とすれば、この球内で

$$
E+\partial_tA=-\nabla\phi
$$

と書けます。すなわち

$$
\boxed{E=-\nabla\phi-\partial_tA}.
$$

これにより、EMAG6 で仮定した時間依存ポテンシャルの表現と Faraday の法則がつながりました。この構成は球内での議論です。穴のある領域全体に拡張できるとは限りません。**回転が 0 でも閉曲線に沿う循環が 0 とは限らない**ため、大域的な $\phi$ の存在は別途確認が必要です。

### 6.2 ゲージ変換は観測される場を変えない

十分滑らかなスカラー関数 $\chi(t,x)$ に対し、

$$
A'=A+\nabla\chi,\qquad
\phi'=\phi-\partial_t\chi
$$

と置きます。このとき

$$
\nabla\times A'
=\nabla\times A+\nabla\times\nabla\chi=B
$$

であり、

$$
\begin{aligned}
-\nabla\phi'-\partial_tA'
&=-\nabla(\phi-\partial_t\chi)-\partial_t(A+\nabla\chi)\\
&=-\nabla\phi-\partial_tA
+\nabla\partial_t\chi-\partial_t\nabla\chi\\
&=E.
\end{aligned}
$$

同じ電磁場を異なるポテンシャルで表せます。これは EMAG6 の荷電粒子ラグランジアンに全時間微分が付け加わることとも整合します。$\phi$ と $A$ は便利な記述ですが、**その個々の成分はゲージに依存**します。

次の EMAG8 では電荷も電流も存在しない空間（$\rho=0,J=0$）を考えます。それでも $\partial_tE$ と $\partial_tB$ を介して電場と磁場が連動するため、波が伝播します。

---

# 演習

## Level A

### A1. 磁束の符号と面の向き

半径 $a$ の円板上に一様な磁場 $B=B_0e_z$（$B_0>0$）がある。法線を $e_z$ としたときと $-e_z$ としたときの磁束を求め、単位も示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$B\cdot e_z=B_0$ で一定だから

$$
\Phi_B=\int_S B_0\,dS=B_0\pi a^2.
$$

法線を逆にすると $B\cdot(-e_z)=-B_0$ なので

$$
\Phi_B'=-B_0\pi a^2.
$$

単位は $B_0$ が T、$\pi a^2$ が m² だから両方とも Wb です。面の向きを変えると値の**符号**だけが変わります。
<!-- solution-end -->

### A2. 一様に増える磁場の誘導起電力

固定された半径 $a$ の円形回路に、$B(t)=\beta t e_z$（$\beta>0$）が一様にかかる。$e_z$ を法線とする反時計回りを正として、起電力と誘導電場の接線成分を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

磁束は

$$
\Phi_B(t)=\int_SB(t)\cdot e_z\,dS=\beta t\pi a^2.
$$

時間微分すると $d\Phi_B/dt=\beta\pi a^2$ なので、

$$
\mathcal E=-\beta\pi a^2.
$$

回転対称な電場を $E_\varphi(a)e_\varphi$ と置けば、

$$
2\pi aE_\varphi(a)=-\beta\pi a^2,
\qquad
\boxed{E_\varphi(a)=-\beta a/2}.
$$

負号は時計回りを意味します。
<!-- solution-end -->

### A3. 平行板の変位電流

面積 $A$ の平行板間の電場が $E(t)=kt e_z$（$k>0$）で一様とする。法線 $e_z$ の極板と平行な面を貫く変位電流密度と変位電流を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

電場を時間微分すると $\partial_tE=ke_z$ です。したがって

$$
J_D=\varepsilon_0\partial_tE=\varepsilon_0ke_z.
$$

$J_D\cdot n=\varepsilon_0 k$ は面内で一定なので

$$
I_D=\int_SJ_D\cdot n\,dS
=\varepsilon_0 kA.
$$

単位はそれぞれ A/m²、A です。電流密度があっても極板間で伝導電荷が流れたことにはなりません。
<!-- solution-end -->

### A4. ゲージ変換の直接確認

$A=0$、$\phi=0$ の領域で、$\chi(t,x,y,z)=\alpha tx$（$\alpha$ は定数）とする。$A'=A+\nabla\chi$、$\phi'=\phi-\partial_t\chi$ を求め、$E'$ と $B'$ が 0 のままであることを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

空間微分と時間微分は

$$
\nabla\chi=(\alpha t,0,0),
\qquad
\partial_t\chi=\alpha x.
$$

よって $A'=(\alpha t,0,0)$、$\phi'=-\alpha x$ です。

$$
\nabla\times A'=0,
$$

$$
-\nabla\phi'=(\alpha,0,0),
\qquad
-\partial_tA'=(-\alpha,0,0).
$$

二つの電場への寄与が打ち消し合い、

$$
E'=-\nabla\phi'-\partial_tA'=0,\qquad B'=\nabla\times A'=0.
$$

ポテンシャルは非零でも場は零です。
<!-- solution-end -->

## Level B

### B1. 動く導体棒とエネルギー収支

長さ $\ell$ の棒を $xy$ 平面上で $v e_x$（$v>0$）の速度で右へ動かす。$B=B_0e_z$（$B_0>0$）で、棒とレールが作る長方形回路の全抵抗は $R>0$、自己誘導と摩擦は無視する。誘導起電力の符号、電流の向きと大きさ、棒を一定速度に保つ外力の仕事率を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$+z$ 法線と反時計回りの周回方向を選びます。面積 $A=\ell x$ は $dA/dt=\ell v$ で増加するので

$$
\frac{d\Phi_B}{dt}=B_0\ell v,\quad
\mathcal E=-B_0\ell v.
$$

負号から電流は時計回りです。その大きさは Ohm の法則より

$$
I=\frac{|\mathcal E|}{R}=\frac{B_0\ell v}{R}.
$$

棒の右辺上では電流は $-e_y$ 方向です。磁気力は

$$
F_{\mathrm{mag}}=(-I\ell e_y)\times(B_0e_z)
=-I\ell B_0e_x.
$$

等速を保つ外力は $+I\ell B_0e_x$ で、仕事率は

$$
P_{\mathrm{ext}}
=I\ell B_0v
=\frac{B_0^2\ell^2v^2}{R}
=I^2R.
$$

電気的な抵抗損失と機械的供給が一致します。
<!-- solution-end -->

### B2. 充電コンデンサーと曲面の取り替え

面積 $A$ の平行板コンデンサーを一定電流 $I>0$ で充電し、極板間の電場は $E=Q(t)e_z/(\varepsilon_0A)$、$\dot Q=I$ と近似する。同じ境界 $C$ に張る二つの面のうち、一つは導線を横切り、他方は極板間を通る。それぞれの面で、伝導電流と変位電流の寄与を明示して Ampère--Maxwell 則の一致を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

導線を切る面 $S_1$ では、極板付近以外の変位電流を無視できる準静的近似を用い、

$$
\int_{S_1}J\cdot n\,dS=I,\quad
\int_{S_1}J_D\cdot n\,dS\simeq0.
$$

極板間を通る面 $S_2$ では電荷の伝導がなく

$$
\int_{S_2}J\cdot n\,dS=0.
$$

しかし

$$
\partial_tE
=\frac{\dot Q}{\varepsilon_0A}e_z
=\frac{I}{\varepsilon_0A}e_z.
$$

したがって

$$
\int_{S_2}J_D\cdot n\,dS
=\varepsilon_0\frac{I}{\varepsilon_0A}A=I.
$$

両面で総電流が $I$ なので、いずれも

$$
\oint_CB\cdot d\ell=\mu_0I
$$

となります。面の向きは境界 $C$ と右手系で揃えます。ここでの極板内一様電場・導線側変位電流無視は近似であり、一般には $J+J_D$ の流束全体が面によらないことを使います。
<!-- solution-end -->

### B3. 局所電荷保存を再構成する

十分滑らかな場が $\nabla\times B=\mu_0J+\mu_0\varepsilon_0\partial_tE$ と $\nabla\cdot E=\rho/\varepsilon_0$ を満たす。そこから連続の式を導き、変位電流項を落とすと何が強制されるか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

回転の発散はゼロなので、

$$
\begin{aligned}
0
&=\nabla\cdot(\nabla\times B)\\
&=\mu_0\nabla\cdot J
+\mu_0\varepsilon_0\partial_t(\nabla\cdot E)\\
&=\mu_0\nabla\cdot J
+\mu_0\varepsilon_0\partial_t(\rho/\varepsilon_0)\\
&=\mu_0(\nabla\cdot J+\partial_t\rho).
\end{aligned}
$$

$\mu_0\ne0$ なので $\partial_t\rho+\nabla\cdot J=0$ です。変位電流を落として同じ操作をすると $\nabla\cdot J=0$ しか得られません。電荷保存と併用すれば $\partial_t\rho=0$ を強制し、充電過程などの局所的な電荷の増減を記述できなくなります。
<!-- solution-end -->

### B4. 時間変化磁場と静電位の限界

ある開集合の点 $x_0$ で $\partial_t B(t_0,x_0)\ne0$ とする。近傍で $E=-\nabla\phi$ とだけ置いて Faraday の法則を満たすことができるか。必要な恒等式を使って説明し、$E=-\nabla\phi-\partial_tA$ ならどの項がこの問題を解決するか答えよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

二階偏微分が連続な $\phi$ には

$$
\nabla\times(-\nabla\phi)=0
$$

が成り立ちます。しかし Faraday の法則は $x_0$ で

$$
\nabla\times E(t_0,x_0)=-\partial_tB(t_0,x_0)\ne0
$$

を要求します。矛盾するので、局所的にも静電位だけでは表現できません。

$B=\nabla\times A$ と置けば

$$
\nabla\times(-\nabla\phi-\partial_tA)
=-\partial_t(\nabla\times A)
=-\partial_tB.
$$

追加項 $-\partial_tA$ の回転が、時間変化磁場に必要な非零の回転を与えます。
<!-- solution-end -->

## Level C

### C1. 理想ソレノイドの外側にも誘導電場はあるか

半径 $a>0$ の無限に長い理想ソレノイドを $z$ 軸に沿って置く。$xy$ 平面の磁場が

$$
B(t,r)=
\begin{cases}
B_0(t)e_z,&0\le r<a,\\
0,&r>a
\end{cases}
$$

で与えられるとする（$r=a$ の不連続面は理想化）。磁場と誘導電場は軸対称で、誘導電場を $E=E_\varphi(r,t)e_\varphi$ と仮定する。

1. 固定した半径 $r$ の円周に対して、$r<a$ と $r>a$ の $E_\varphi$ を求めよ。
2. $\dot B_0\ne0$ の時刻に、$r>a$ で $\partial_tB=0$ でも $E$ が消えない理由を、循環と局所的な回転の違いから説明せよ。
3. 外部領域 $r>a$ の全体で $E=-\nabla\phi$ と書ける単一値の滑らかな $\phi$ が存在しないことを示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

$+z$ を法線とし、境界を反時計回りに取ります。回転対称性より線積分は

$$
\oint_{|x|=r}E\cdot d\ell
=\int_0^{2\pi}E_\varphi(r,t)r\,d\varphi
=2\pi rE_\varphi(r,t).
$$

$r<a$ の円板を通る磁束は $\pi r^2B_0(t)$ なので、

$$
2\pi rE_\varphi=-\pi r^2\dot B_0,
\qquad
\boxed{E_\varphi=-\frac r2\dot B_0}\quad(r<a).
$$

$r>a$ の円板を内側 $0\le s<a$ と外側 $a<s<r$ に分けると、外側の磁場は $0$ です。面素が $s\,ds\,d\varphi$ であることから

$$
\begin{aligned}
\Phi_B
&=\int_0^{2\pi}\left(
\int_0^a B_0(t)s\,ds+\int_a^r 0\cdot s\,ds
\right)d\varphi\\
&=2\pi B_0(t)\left[\frac{s^2}{2}\right]_0^a
=\pi a^2B_0(t).
\end{aligned}
$$

円板自体の半径は $r$ でも、磁束に寄与する部分の半径は $a$ である点が重要です。したがって、

$$
2\pi rE_\varphi=-\pi a^2\dot B_0,
\qquad
\boxed{E_\varphi=-\frac{a^2}{2r}\dot B_0}\quad(r>a).
$$

外側では各点で $\partial_t B=0$ なので Faraday の微分形から $\nabla\times E=0$ です。実際、円筒座標の $z$ 成分は

$$
(\nabla\times E)_z
=\frac1r\frac{\partial}{\partial r}(rE_\varphi)
=\frac1r\frac{\partial}{\partial r}
\left(-\frac{a^2}2\dot B_0\right)=0
$$

です。一方、外部領域を一周する円周の循環は

$$
\oint E\cdot d\ell=-\pi a^2\dot B_0\ne0.
$$

これは矛盾しません。**円周を境界とする円板全体は外部領域 $r>a$ に含まれず**、内部の磁場が時間変化する部分を横切ります。外側の回転がゼロであっても、この円周の循環を外部領域内の面に対する Stokes の定理でゼロとはできません。

もし外部領域全体で単一値の $\phi$ があり $E=-\nabla\phi$ と書ければ、任意の閉曲線上で

$$
\oint E\cdot d\ell
=-\oint\nabla\phi\cdot d\ell=0
$$

となるはずです。実際の循環は非零なので存在しません。この領域には軸に沿う穴があるため、円周を張る円板を外部領域内に収められません。**局所的な回転ゼロ**と**大域的なポテンシャルの存在**は、穴のある領域では別の主張です。
<!-- solution-end -->
