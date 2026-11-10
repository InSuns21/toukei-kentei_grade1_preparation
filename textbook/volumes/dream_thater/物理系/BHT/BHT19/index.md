# BHT19 Wald公式とEinstein重力

[前講の境界変分恒等式](../BHT18/index.md#thm-bht18-boundary)は、Killing対称性を持つ解について、空間切片の外側と内側の境界項を等しくします。しかし、その内側の境界項がなぜ「温度×エントロピー変化」になるのでしょうか。

ここでは、非極限の**分岐Killing地平線**を持つ定常ブラックホールを考えます。地平線生成場が零になる2次元面を選ぶと、[Noether電荷](../BHT18/index.md#def-bht18-noether)のうち生成場自身に比例する項が消え、その一次微分だけが残ります。そこから第一法則を導き、Einstein重力の面積則を別の経路で再現します。

時空は向き付き4次元Lorentz多様体、計量符号は $(-,+,+,+)$、$c=\hbar=k_B=1$ とし、$G$ は残します。まず4次元真空Einstein重力、漸近平坦・非極限・定常・軸対称の解と、境界で十分減衰する線形化真空解への変分を扱います。軸対称性のない静的な場合は $\Omega_H=J=0$ と読めます。高階曲率模型への一般化は条件を明示した上で公式だけここで導入し、具体模型の適用は次講で扱います。

## 1. 分岐面で何が簡単になるか

[Killing地平線の表面重力](../BHT2/index.md#thm-bht2-zeroth-law)は、地平線の生成場をどの時間並進に規格化するかに依存します。漸近的な時間並進を $t^a$、周期 $2\pi$ の軸対称生成場を $\varphi^a$ とし、背景解の角速度 $\Omega_H$ を用いて

$$
\chi^a=t^a+\Omega_H\varphi^a
$$

を選びます。**以下の変分では $t^a,\varphi^a,\Omega_H$ の背景値、従って $\chi^a$ 自体を固定**します。この約束をしないと、$\delta H_\chi$ に $\delta\chi$ 由来の別項が入ります。

非極限の地平線を過去・未来の二つのKilling地平線へ延長できる場合、それらは滑らかな空間的2次元面で交わります。この交わりを使うと、生成場が零になっても微分が残ることを一つの面で検査できます。

<a id="def-bht19-bifurcation-surface"></a>

<!-- formal-statement-start -->
> **定義（分岐Killing地平線の分岐面）**\
> 滑らかなKilling場 $\chi$ が生成する二つの滑らかな零超曲面 $H^+$ と $H^-$ が、横断的に交わる空間的2次元面 $B=H^+\cap H^-$ を持ち、$\chi|_B=0$ であるとき、$H^+\cup H^-$ を分岐Killing地平線、$B$ をその**分岐面**とする。極限地平線が常にこのような面を持つとは仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht19-bifurcation-surface -->
**定義の確認**：平坦時空 $ds^2=-dT^2+dX^2+dY^2+dZ^2$ のboost場 $\chi=\alpha(X\partial_T+T\partial_X)$ で $\alpha>0$ とする。$H^\pm=\{T=\pm X\}$ の定義関数を $F_+=T-X$、$F_-=T+X$ と書くと、どちらも

$$
g^{ab}(\partial_aF_\pm)(\partial_bF_\pm)=-1+1=0
$$

を満たすので零超曲面です。boost場がKilling場であることも、$\chi_T=-\alpha X$、$\chi_X=\alpha T$ から $\partial_T\chi_X+\partial_X\chi_T=\alpha-\alpha=0$（他の対称微分成分も零）で確かめられます。さらに

$$
\chi(F_+)=\alpha(X-T),\qquad
\chi(F_-)=\alpha(X+T),\qquad
g(\chi,\chi)=\alpha^2(T^2-X^2)
$$

なので、$\chi$ は対応する各 $H^\pm$ に接し、その上で零ベクトルまたは零方向のベクトルになります。二面の交わりは $B=\{T=X=0\}$ で、法線 $dF_+$ と $dF_-$ は独立、誘導計量 $dY^2+dZ^2$ は正定値です。最後に $\chi|_B=0$ だから、定義の各条件を確認できました。
<!-- definition-example-end -->

面 $B$ 上の二つの独立な単位法線を、未来向き時間的 $u^a$ と外向き空間的 $n^a$ とし、$u\cdot u=-1$、$n\cdot n=1$、$u\cdot n=0$ とします。反対称な**双法線**を

$$
\hat\epsilon_{ab}=n_a u_b-u_a n_b,
\qquad
\hat\epsilon_{ab}\hat\epsilon^{ab}=-2
$$

で定めます。$B$ の誘導計量を $q_{ab}=g_{ab}+u_au_b-n_an_b$、面積要素を $dA=\sqrt{\det q_{ij}}\,d^2x$ とし、面の向きを $\hat\epsilon_{ab}$ と時空体積形式に整合させます。双法線の全体符号を逆にすると、Noether電荷の向きも同時に変わるため、片方だけ変えてはいけません。

$B$ に接するベクトル $v^a$ に沿っては $\chi|_B=0$ を微分して $v^a\nabla_a\chi^b=0$ です。またKilling方程式 $\nabla_a\chi_b+\nabla_b\chi_a=0$ により、接方向の添字がもう一方にあっても零になります。従って $\nabla_a\chi_b|_B$ は法線2次元平面だけに成分を持つ反対称形式であり、その平面上の反対称2形式は $n_au_b-u_an_b$ のスカラー倍に限られます。生成場と向きを規格化し、非極限の場合のこの係数を正の表面重力 $\kappa$ として読みます。

<a id="def-bht19-bifurcation-data"></a>

<!-- formal-statement-start -->
> **定義（分岐面のKillingデータ）**\
> 向き付き4次元Lorentz時空の非極限・分岐Killing地平線を生成するKilling場 $\chi^a$ と、滑らかな空間的分岐面 $B$ を取る。$\chi|_B=0$、$\kappa>0$ とし、前記の向きで正規化した双法線 $\hat\epsilon_{ab}$ によって

$$
\left.\nabla_a\chi_b\right|_B
=\kappa\hat\epsilon_{ab}
$$

> と表す。これを分岐面のKillingデータと呼ぶ。表面重力 $\kappa$ は背景の $t^a$ の規格化と $\chi^a$ の選択に対する値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht19-bifurcation-data -->
**定義の確認**（平坦時空のboost）：$ds^2=-dT^2+dX^2+dY^2+dZ^2$ で、$B=\{T=X=0\}$ の有限な $Y,Z$ 面片を考えます。$\chi=\kappa(X\partial_T+T\partial_X)$、$u=\partial_T$、$n=\partial_X$ とすると、まず $\chi|_B=0$ です。計量で法線を下げると $u_T=-1$、$n_X=1$ なので

$$
\hat\epsilon_{TX}=n_Tu_X-u_Tn_X=1,
\qquad \hat\epsilon_{XT}=-1.
$$

一方、$\chi_T=-\kappa X$、$\chi_X=\kappa T$ で、平坦座標では接続係数が零です。従って

$$
\nabla_T\chi_X=\partial_T(\kappa T)=\kappa,
\qquad
\nabla_X\chi_T=\partial_X(-\kappa X)=-\kappa.
$$

他の成分は零なので $\nabla_a\chi_b=\kappa\hat\epsilon_{ab}$。また $\hat\epsilon^{TX}=-1$、$\hat\epsilon^{XT}=1$ から

$$
\hat\epsilon_{ab}\hat\epsilon^{ab}
=1(-1)+(-1)(1)=-2
$$

です。これはRindler地平線の局所模型であり、平坦時空に有限質量のブラックホールがあるという例ではありません。
<!-- definition-example-end -->

分岐面では $\chi=0$ ですが、$\nabla\chi$ は一般に零ではありません。だから[Einstein重力のKomar型電荷](../BHT18/index.md#prop-bht18-einstein-q)は、分岐面でも面積に比例する非零の積分を持ちます。

## 2. Noether電荷は面積をどう測るか

Einstein–Hilbertの作用密度を表す4形式は $\mathbf L_{\rm EH}=R\boldsymbol\epsilon/(16\pi G)$ です。[BHT18の電荷公式](../BHT18/index.md#prop-bht18-einstein-q)を分岐面に制限すると

$$
(\mathbf Q_\chi)_{ab}
=-\frac{1}{16\pi G}\epsilon_{abcd}\nabla^c\chi^d
$$

です。向き付き面への制限を $\left.\mathbf Q_\chi\right|_B$ と書きます。時空体積形式と双法線の向きを合わせると、2次元法線面の縮約は

$$
\left.\epsilon_{abcd}\hat\epsilon^{cd}\right|_B
=-2(\boldsymbol\epsilon_B)_{ab},
$$

ここで $\boldsymbol\epsilon_B$ は $B$ の正の面積2形式です。この $-2$ が $1/(16\pi G)$ を $1/(8\pi G)$ に変える係数です。

<a id="prop-bht19-einstein-charge"></a>

<!-- formal-statement-start -->
> **命題（Einstein重力の分岐面電荷）**\
> 上記の向き・規格化の4次元Einstein–Hilbert作用と、非極限の分岐Killing地平線のコンパクトな断面 $B$ に対し、

$$
\left.\mathbf Q_\chi\right|_B
=\frac{\kappa}{8\pi G}\boldsymbol\epsilon_B,
\qquad
\int_B\mathbf Q_\chi=\frac{\kappa A_B}{8\pi G}.
$$

> ここで $A_B=\int_BdA$ である。右辺は一つの背景解での電荷の値であり、異なる解の間で $\kappa$ を独立変分した式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

分岐面の $\nabla\chi=\kappa\hat\epsilon$ を電荷へ代入します。係数は双法線の正規化 $-2$ と曲面の向きから直接決まります。

<!-- proof-start -->
### 証明

$\nabla^c\chi^d=\kappa\hat\epsilon^{cd}$ を電荷式に代入すると

$$
\begin{aligned}
\left.(\mathbf Q_\chi)_{ab}\right|_B
&=-\frac{\kappa}{16\pi G}
 \left.\epsilon_{abcd}\hat\epsilon^{cd}\right|_B\\
&=-\frac{\kappa}{16\pi G}
  [-2(\boldsymbol\epsilon_B)_{ab}]\\
&=\frac{\kappa}{8\pi G}(\boldsymbol\epsilon_B)_{ab}.
\end{aligned}
$$

$B$ の面積積分で $\int_B\boldsymbol\epsilon_B=A_B$ ですから第二式を得ます。係数は $1/16$ に法線面の二つの反対称成分からの $2$ が掛かるので、$1/8$ になります。
<!-- proof-end -->

**数値で確かめる**：Schwarzschildの $r_+=2GM$、$A=16\pi G^2M^2$、$\kappa=1/(4GM)$ を代入すると

$$
\int_B\mathbf Q_{\partial_t}
=\frac{1}{8\pi G}\frac{1}{4GM}
  (16\pi G^2M^2)=\frac M2.
$$

これは**電荷積分そのものが質量 $M$ になる**という意味ではありません。質量のHamiltonian変分は $\delta\mathbf Q-\iota_\chi\boldsymbol\theta$ の組で測られます。特に、解ごとの $M/2$ をそのまま $M$ に等置しないことが重要です。

## 3. 固定した生成場で変分すると何が残るか

前節の一解上の等式を $\delta(\kappa A)/(8\pi G)$ と微分すると、見かけ上 $A\delta\kappa$ が出ます。しかし第一法則は

$$
\int_B\delta\mathbf Q_\chi
=\frac{\kappa}{8\pi G}\,\delta A_B
$$

という**背景 $\kappa$ を係数に持つ式**です。$\delta$ の作用の対象を確定する必要があります。

変分では、背景の分岐面 $B$ とベクトル場 $\chi$ を固定した滑らかな同一視を採用します。近傍解は線形化場の方程式と境界条件を満たし、変分後の計量で元の $\chi$ が必ずしもKilling場であるとは仮定しません。従って変分後の場について「$\chi$ の表面重力」を再計算してから微分する操作とは異なります。

<a id="lem-bht19-fixed-generator"></a>

<!-- formal-statement-start -->
> **補題（固定生成場の分岐面変分）**\
> 前命題のEinstein重力の背景 $g$ と固定された分岐面 $B$、場に依存せず $\chi|_B=0$ のベクトル場 $\chi$ を考える。$\nabla_a\chi_b=\kappa\hat\epsilon_{ab}$ を満たす背景で、$B$ の位置と $\chi^a$ を固定して滑らかな計量摂動 $h_{ab}=\delta g_{ab}$ を取る。このとき

$$
\left.\delta\mathbf Q_\chi\right|_B
=\frac{\kappa}{8\pi G}\,\delta\boldsymbol\epsilon_B,
\qquad
\int_B\delta\mathbf Q_\chi
=\frac{\kappa}{8\pi G}\delta A_B.
$$

> $\kappa$ は背景の値である。$\delta\mathbf Q_\chi$ の評価に際して $\delta\chi^a=0$ とし、変分後の解自身のKilling生成場の変化を含めない。
<!-- formal-statement-end -->

### 証明の見取り図

分岐面では $\chi=0$ なので、混合添字の $\nabla_a\chi^b=\partial_a\chi^b+\Gamma^b{}_{ac}\chi^c$ の変分は零になります。計量の変化は電荷形式の体積形式と添字の上げ下げにだけ入り、それらの法線方向の変化が相殺して接方向の面積変化を残します。

<!-- proof-start -->
### 証明

$B$ で固定された $\chi$ は恒等的に零なので

$$
\left.\delta(\nabla_a\chi^b)\right|_B
=\left.\delta\Gamma^b{}_{ac}\chi^c+\nabla_a(\delta\chi^b)\right|_B=0.
$$

$p,q=0,1$ を法線方向、$i,j=2,3$ を接方向とし、背景の点で計量を二つのブロックに直交分解します。$K_p{}^q:=\nabla_p\chi^q$ は、ベクトル場の成分 $\chi^q$ を法線方向 $x^p$ に沿って共変微分した線形写像の成分です。前節の平坦boostでは、分岐面上で接続係数が零なので

$$
K_T{}^X=\partial_T(\kappa T)=\kappa,\qquad
K_X{}^T=\partial_X(\kappa X)=\kappa
$$

で、他の法線成分は零でした。一般の分岐面でも、$\nabla\chi=\kappa\hat\epsilon$ と法線直交フレームの選択から同じ形になり、行列は

$$
K_p{}^q=\kappa
\begin{pmatrix}0&1\\1&0\end{pmatrix}
$$

です。$Q_{ij}$ は $\epsilon_{ijpq}g^{pr}K_r{}^q$ に比例します。背景の法線計量を $\eta_{pq}=\mathrm{diag}(-1,1)$、その一次摂動を $s_{pq}$ と書くと

$$
\delta g^{pq}=-\eta^{pr}s_{rs}\eta^{sq},
\qquad
\delta\sqrt{|\det g_\perp|}
=\frac12\sqrt{|\det g_\perp|}\,\eta^{pq}s_{pq}.
$$

法線方向だけの変化を具体的に調べるため、$s_{00}=a,s_{11}=b$ と置けば、電荷の法線因子の一次変分は

$$
\begin{aligned}
&\sqrt{|\det g_\perp|}
\bigl(g^{00}K_0{}^1-g^{11}K_1{}^0\bigr)\\
&\quad=
\left[1+\frac{b-a}{2}\right]
\kappa(-2-a+b)+O(s^2)
=-2\kappa+O(s^2).
\end{aligned}
$$

$s_{01}$ も一次では対角の逆計量へ寄与せず、法線体積と逆計量の収縮に残りません。法線・接方向の混合摂動は背景のブロック対角性のもとで $Q_{ij}$ に一次では現れません。従って法線計量の変分は相殺し、$Q_{ij}$ の一次変分は接方向の面積2形式の変分に一致します：

$$
\delta(\mathbf Q_\chi|_B)
=\frac{\kappa}{8\pi G}\,\delta\boldsymbol\epsilon_B,
\quad
\delta\boldsymbol\epsilon_B
=\frac12 q^{ij}h_{ij}\boldsymbol\epsilon_B.
$$

最後の式を固定した $B$ 上で積分すれば主張が従います。計量変分の向きはあくまで背景における $\chi$ の固定を意味し、解ごとに新たな分岐面を同一視する任意の操作が同じ微分を与えるとは述べていません。
<!-- proof-end -->

**誤差の発生源**：Schwarzschild解の各点で $\int_B Q_\chi=M/2$ と評価して、その関数を $M$ で微分すれば $\delta M/2$ です。しかしこの解族比較では分岐面の位置・生成場の規格化・解間の同一視まで変わり、上の「固定した $B,\chi$ 上の $\delta Q_\chi$」と同じ変分ではありません。$\delta\kappa$ 項が見えないのは積の微分を捨てたからではなく、**変分の定義が異なる**ためです。

## 4. 無限遠から地平線へ――第一法則

空間切片 $\Sigma$ の内側境界を $B$、外側を大きな球面 $S_\infty$ とし、$\partial\Sigma=S_\infty-B$ の向きを採用します。[BHT18の表面恒等式](../BHT18/index.md#thm-bht18-boundary)で、背景が $\mathcal L_\chi g=0$、摂動が線形化方程式を満たすため、

$$
0=\int_{S_\infty}(\delta\mathbf Q_\chi-\iota_\chi\boldsymbol\theta)
-\int_B(\delta\mathbf Q_\chi-\iota_\chi\boldsymbol\theta).
$$

$B$ で $\chi=0$ だから $\iota_\chi\boldsymbol\theta=0$（ポテンシャルはそこで正則とする）。無限遠で適切な減衰と可積分性を課せば、[表面Hamiltonian変分](../BHT18/index.md#def-bht18-surface)は質量・角運動量の変分を与えます。軸対称生成場のHamiltonianは、通常の向きで $H_\varphi=-J$ です。

<a id="thm-bht19-first-law"></a>

<!-- formal-statement-start -->
> **定理（Noether電荷からの定常真空Einstein第一法則）**\
> 向き付き4次元の漸近平坦・定常・軸対称な真空Einstein解が、コンパクトな分岐面 $B$ を持つ正則な非極限Killing地平線を持つとする。
>
> 漸近時間並進 $t^a$ は無限遠で単位規格化する。軸対称場 $\varphi^a$ は周期 $2\pi$ とし、背景の地平線生成場を $\chi=t+\Omega_H\varphi$ とする。
>
> 摂動は線形化真空方程式を満たし、無限遠のHamiltonian変分は有限で、$\delta H_t=\delta M$、$\delta H_\varphi=-\delta J$ と同定できるものとする。変分では $B,\chi,\Omega_H$ の背景値を固定し、境界積分と変分を交換できると仮定する。このとき

$$
\delta M-\Omega_H\delta J
=\frac{\kappa}{8\pi G}\delta A_B.
$$

> これは二つの近傍定常解の間の一次関係であり、動的地平線の任意の時間発展に対する面積増大定理ではない。
<!-- formal-statement-end -->

### 証明の見取り図

外側では固定した $\chi=t+\Omega_H\varphi$ のHamiltonian変分が $\delta M-\Omega_H\delta J$ になり、内側では分岐面で $\chi$ が零になってNoether電荷の変分だけが残ります。両者は境界変分恒等式で等しくなります。

<!-- proof-start -->
### 証明

背景の $\chi$ はKilling場なので $\mathcal L_\chi g=0$。線形化解に対し、[境界変分恒等式](../BHT18/index.md#thm-bht18-boundary)のシンプレクティック流の右辺は零であり、

$$
\int_{S_\infty}\mathbf k_\chi
=\int_B\mathbf k_\chi,
\qquad
\mathbf k_\chi=\delta\mathbf Q_\chi-\iota_\chi\boldsymbol\theta.
$$

無限遠では $\chi$ を変分中固定したのでHamiltonian変分の線形性から

$$
\begin{aligned}
\int_{S_\infty}\mathbf k_\chi
&=\delta H_t+\Omega_H\delta H_\varphi\\
&=\delta M-\Omega_H\delta J.
\end{aligned}
$$

この式に $\delta\Omega_H\,J$ は現れません。$\delta\chi=0$ としたからです。内側では $\chi|_B=0$ により $\iota_\chi\boldsymbol\theta|_B=0$。さらに[固定生成場の分岐面変分](#lem-bht19-fixed-generator)の補題から

$$
\int_B\mathbf k_\chi
=\int_B\delta\mathbf Q_\chi
=\frac{\kappa}{8\pi G}\delta A_B.
$$

両境界の式を等置すれば主張が得られます。摂動が線形化解でない場合や境界に流束が残る場合には、最初の等式自体をこのまま使えません。
<!-- proof-end -->

**無限遠の量の正規化**：たとえば漸近直交座標の静的摂動で $h_{ij}=\delta g_{ij}=O(r^{-1})$ のとき、ADM質量変分は

$$
\delta M=\frac{1}{16\pi G}\lim_{r\to\infty}
\int_{S_r}(\partial_jh_{ij}-\partial_i h_{jj})n^i\,dA
$$

です。この式は無限遠で適切な漸近条件を課した[Hamiltonian境界変分](../BHT18/index.md#def-bht18-surface)と一致する規格化です。電荷 $Q_t$ の面積分だけをADM質量と呼んでいるわけではありません。

### Schwarzschildで独立に検算

$J=0$、$A=16\pi G^2M^2$、$\kappa=1/(4GM)$ により

$$
\frac{\kappa}{8\pi G}\frac{dA}{dM}
=\frac{1}{4GM}\frac{1}{8\pi G}(32\pi G^2M)
=1.
$$

よって $\delta M=\kappa\delta A/(8\pi G)$ です。これは[解族の直接微分による第一法則](../BHT5/index.md#thm-bht5-kerr-first-law)の $J=0$ 極限と整合しますが、導出方法は異なります。前者では解の具体式を既知とせず、境界恒等式とNoether電荷を使いました。

## 5. 曲率微分からエントロピーを読む

一般の微分同相不変作用では、電荷には $\nabla\chi$ に比例する項と $\chi$ 自身に比例する項があります。分岐面で後者は零になるため、曲率に対する作用密度の微分がエントロピーの係数を決めます。

以下では $\mathbf L=L(g_{ab},R_{abcd})\boldsymbol\epsilon$ という、Riemannテンソルの共変微分を**含まない**局所作用密度をまず考えます。$R_{abcd}$ を、添字の対称性を保った独立な曲率変数として、$g_{ab}$ を固定して微分したテンソルを

$$
E^{abcd}_R=\frac{\partial L}{\partial R_{abcd}}
$$

と記します。ここで $L$ は密度 $\sqrt{-g}L$ ではなくスカラーです。面積則に現れる $G$ は $L$ の係数に含まれます。曲率の微分を含む理論ではこの偏微分をそのまま使えず、共変微分に関するEuler–Lagrange型の補正が必要です。

<a id="def-bht19-wald-entropy"></a>

<!-- formal-statement-start -->
> **定義（Waldエントロピー）**\
> 4次元の微分同相不変な局所重力作用 $\mathbf L=L(g,R_{abcd})\boldsymbol\epsilon$ を考え、非極限の正則な定常分岐Killing地平線のコンパクトな分岐面 $B$ を取る。双法線は $\hat\epsilon_{ab}\hat\epsilon^{ab}=-2$ とし、計量固定の曲率微分を $E_R^{abcd}=\partial L/\partial R_{abcd}$ とする。**Waldエントロピー**を

$$
S_W=-2\pi\int_B
E_R^{abcd}\hat\epsilon_{ab}\hat\epsilon_{cd}\,dA
$$

> と定める。この式は自然単位の無次元エントロピーであり、一般の非定常切片や量子補正に無条件で適用する定義ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bht19-wald-entropy -->
**定義の確認**（Einstein–Hilbert）：$L=R/(16\pi G)$ では $R=g^{ac}g^{bd}R_{abcd}$ と曲率の反対称性から

$$
E_R^{abcd}=\frac{1}{32\pi G}
(g^{ac}g^{bd}-g^{ad}g^{bc}).
$$

双法線の反対称性と正規化から第一項は $\hat\epsilon_{ab}\hat\epsilon^{ab}=-2$、第二項は $\hat\epsilon_{ab}\hat\epsilon^{ba}=+2$ です。差は $-4$ なので被積分関数は $-1/(8\pi G)$、よって

$$
S_W=-2\pi\int_B\left(-\frac{1}{8\pi G}\right)dA
=\frac{A_B}{4G}.
$$

この計算は曲率の添字順序と、双法線の $-2$ の両方を検査しています。
<!-- definition-example-end -->

<a id="thm-bht19-wald-charge"></a>

<!-- formal-statement-start -->
> **定理（分岐面のNoether電荷とWald公式）**\
> 微分同相不変で曲率の共変微分を含まない $\mathbf L=L(g,R_{abcd})\boldsymbol\epsilon$ の正則な定常解が、コンパクトな分岐面 $B$ を持つ非極限Killing地平線を持つとする。$\chi|_B=0$、$\nabla_a\chi_b=\kappa\hat\epsilon_{ab}$ とし、Noether電荷の曖昧さを正則・共変な代表で固定する。このとき

$$
\int_B\mathbf Q_\chi=\frac{\kappa}{2\pi}S_W.
$$

> 漸近Hamiltonianが有限かつ可積分で、変分は固定した $\chi,B$ と許容境界条件を保つとする。対応する第一法則の地平線側は $\kappa\delta S_W/(2\pi)$ となる。物質やゲージ場による仕事項がある理論では、無限遠と境界の電荷の同定を別途行う。
<!-- formal-statement-end -->

### 証明の見取り図

変分後に部分積分して作るNoether電荷では、$\nabla\chi$ の係数が曲率微分 $E_R^{abcd}$ です。分岐面では $\chi$ 自身を含む項が消え、$\nabla\chi=\kappa\hat\epsilon$ が残ります。その電荷を $\kappa$ で規格化したものがエントロピーです。

<!-- proof-start -->
### 証明

まず、計量変分 $h_{ab}=\delta g_{ab}$ について

$$
\delta\Gamma^a{}_{bc}
=\frac12g^{ad}(\nabla_bh_{cd}+\nabla_ch_{bd}-\nabla_dh_{bc}),
\qquad
\delta R^a{}_{bcd}=2\nabla_{[c}\delta\Gamma^a{}_{d]b}.
$$

$\delta R_{abcd}$ はこの第二式に $g_{ae}$ を掛けた項と、添字を下げる計量自身の変分からなります。後者は微分を含まないため場の方程式項へ入り、前者は $E_R^{abcd}\delta R_{abcd}$ の中で部分積分します。Riemannの反対称性を使うと、この微分を含む部分は

$$
2E_R^{abcd}\nabla_c(\delta\Gamma_{adb})
=2\nabla_c(E_R^{abcd}\delta\Gamma_{adb})
-2(\nabla_cE_R^{abcd})\delta\Gamma_{adb}.
$$

右辺第二項も $\delta\Gamma\sim\nabla h$ なのでさらに部分積分します。その境界項をまとめると、シンプレクティックポテンシャルのベクトル密度を、体積形式の縮約を除いて

$$
\theta^a(g;h)
=2E_R^{abcd}\nabla_dh_{bc}
-2(\nabla_dE_R^{abcd})h_{bc}
$$

と選べます。Einstein–Hilbertでは $\nabla E_R=0$ なので、[前講のポテンシャル](../BHT18/index.md#prop-bht18-einstein-q)の $\theta^a=(\nabla_bh^{ab}-\nabla^ah)/(16\pi G)$ を再現します。

次に $h_{bc}=\mathcal L_\chi g_{bc}=\nabla_b\chi_c+\nabla_c\chi_b$ を入れます。二階微分は $\nabla_d\nabla_b\chi_c$ となり、反対称部分を曲率交換子で $\chi$ に比例する項へ移します。残る全発散から、[Noether流](../BHT18/index.md#def-bht18-noether)の電荷の双対テンソルを

$$
Q^{ab}_\chi
=-2E_R^{abcd}\nabla_c\chi_d
+4\chi_d\nabla_cE_R^{abcd}
$$

と選べます。$Q^{ab}_\chi=-Q^{ba}_\chi$ であり、実際の2形式は $(\mathbf Q_\chi)_{ij}=\tfrac12\epsilon_{ijab}Q^{ab}_\chi$ です。場の方程式に比例する残りは、背景がon shellのときに消えます。これは電荷の正則・共変な一つの代表であり、境界での曖昧さを固定したという定理の条件がここで働きます。

分岐面では $\chi=0$ により第二項が消えます。$\tfrac12\epsilon_{ijab}$ の法線縮約を双法線で表すと、$B$ で生き残る電荷は

$$
\left.\mathbf Q_\chi\right|_B
=-\left.
E_R^{abcd}\hat\epsilon_{ab}
\nabla_c\chi_d\,dA\right|_B
$$

と書けます（右辺は面積形式を掛けた $B$ 上の2形式を表します）。分岐面での $\nabla_c\chi_d=\kappa\hat\epsilon_{cd}$ を入れると

$$
\begin{aligned}
\int_B\mathbf Q_\chi
&=-\kappa\int_BE_R^{abcd}
\hat\epsilon_{ab}\hat\epsilon_{cd}\,dA\\
&=\frac{\kappa}{2\pi}S_W.
\end{aligned}
$$

第一法則の変分では、[固定生成場の変分](#lem-bht19-fixed-generator)と同じ考え方で、$B$ 上の $\nabla_a\chi^b$ は固定され、$\chi$ に比例する項は残りません。曲率微分を含む被積分量と面積形式の変分を合わせた結果が

$$
\int_B\delta\mathbf Q_\chi
=\frac{\kappa}{2\pi}\delta S_W
$$

です。背景の $\kappa$ の微分を取り出した式ではありません。これを[境界変分恒等式](../BHT18/index.md#thm-bht18-boundary)の内側へ代入すれば、外側Hamiltonianとの第一法則が従います。
<!-- proof-end -->

**適用できる範囲**：高階曲率での電荷と正則な分岐面の関係は成立しますが、動的地平線の任意の切片に同じ積分を代入しても一般化第二法則が得られるとは限りません。極限地平線で $\kappa=0$ と直接割ることもできません。これらの限界を次講で精査します。

### 面積則をもう一度、規格化から検算する

上の定義例では $E_R$ の縮約から $S_W=A/(4G)$ を得ました。別の道筋では、[Einstein重力の分岐面電荷](#prop-bht19-einstein-charge)の命題から $\int_BQ_\chi=\kappa A/(8\pi G)$ であり、$\kappa>0$ なので

$$
\frac{2\pi}{\kappa}\int_BQ_\chi
=\frac{2\pi}{\kappa}\frac{\kappa A}{8\pi G}
=\frac{A}{4G}.
$$

二つの計算が一致します。量子論で[Hawking温度のKilling規格化](../BHT8/index.md#prop-bht8-normalization)を同定すると、$T_H=\kappa/(2\pi)$ ですから $\delta M=T_H\delta S_W+\Omega_H\delta J$ と読めます。ただしここでのNoether電荷計算そのものは古典的作用の計算であり、放射の量子論を再証明したわけではありません。

## 6. 演習――生成場を固定して計算する

### Level A：向き、係数、基本変分

<a id="ex-bht19-a01"></a>

#### BHT19-A01 boostの双法線

- Level: A
- 問題: $ds^2=-dT^2+dX^2+dY^2+dZ^2$、$B=\{T=X=0\}$、$\chi=\alpha(X\partial_T+T\partial_X)$（$\alpha>0$）とする。$u=\partial_T,n=\partial_X$ に対して $\chi|_B$、$\nabla_T\chi_X$、$\nabla_X\chi_T$、$\hat\epsilon_{ab}\hat\epsilon^{ab}$ を求め、$\kappa$ を決めよ。

<!-- solution-start -->
**詳細解答**：$B$ では $T=X=0$ より $\chi=0$。$\chi_T=g_{TT}\chi^T=-\alpha X$、$\chi_X=\alpha T$ なので

$$
\nabla_T\chi_X=\partial_T(\alpha T)=\alpha,\qquad
\nabla_X\chi_T=\partial_X(-\alpha X)=-\alpha.
$$

$u_T=-1,n_X=1$ だから $\hat\epsilon_{TX}=n_Tu_X-u_Tn_X=1$、$\hat\epsilon_{XT}=-1$。計量で添字を上げると $\hat\epsilon^{TX}=-1$、$\hat\epsilon^{XT}=1$。従って $\hat\epsilon_{ab}\hat\epsilon^{ab}=-1-1=-2$ です。$\nabla_a\chi_b=\alpha\hat\epsilon_{ab}$ なので $\kappa=\alpha$。$\alpha$ を変えれば生成場の規格化も変わります。
<!-- solution-end -->

<a id="ex-bht19-a02"></a>

#### BHT19-A02 曲率偏微分の係数

- Level: A
- 問題: $L=R/(16\pi G)$、$R=g^{ac}g^{bd}R_{abcd}$ とする。$g$ を固定し、$R_{abcd}$ の反対称性を利用して $\partial L/\partial R_{abcd}$ を求めよ。

<!-- solution-start -->
**詳細解答**：$R_{abcd}=-R_{abdc}$ より、収縮 $g^{ac}g^{bd}\delta R_{abcd}$ は $c,d$ に反対称な部分にのみ依存します。その射影は

$$
g^{ac}g^{bd}\delta R_{abcd}
=\frac12(g^{ac}g^{bd}-g^{ad}g^{bc})\delta R_{abcd}.
$$

従って $E_R^{abcd}=(g^{ac}g^{bd}-g^{ad}g^{bc})/(32\pi G)$ です。Riemannの他の対称性とも整合するので、これは曲率変数の許容変分に対する係数を表します。
<!-- solution-end -->

<a id="ex-bht19-a03"></a>

#### BHT19-A03 二つの双法線縮約

- Level: A
- 問題: $\hat\epsilon_{ab}=-\hat\epsilon_{ba}$、$\hat\epsilon_{ab}\hat\epsilon^{ab}=-2$ とする。$g^{ac}g^{bd}\hat\epsilon_{ab}\hat\epsilon_{cd}$ および $g^{ad}g^{bc}\hat\epsilon_{ab}\hat\epsilon_{cd}$ を求めよ。

<!-- solution-start -->
**詳細解答**：第一式は添字を二つ上げるだけなので

$$
g^{ac}g^{bd}\hat\epsilon_{ab}\hat\epsilon_{cd}
=\hat\epsilon^{cd}\hat\epsilon_{cd}=-2.
$$

第二式は $c,d$ の上げ方を交換するため、$\hat\epsilon^{dc}=-\hat\epsilon^{cd}$ より

$$
g^{ad}g^{bc}\hat\epsilon_{ab}\hat\epsilon_{cd}
=\hat\epsilon^{dc}\hat\epsilon_{cd}=+2.
$$

差は $-4$ で、Wald公式のEinstein係数を決定します。
<!-- solution-end -->

<a id="ex-bht19-a04"></a>

#### BHT19-A04 境界向きと第一法則

- Level: A
- 問題: $\partial\Sigma=S_\infty-B$ とし、$\int_{\partial\Sigma}k_\chi=0$、$\chi|_B=0$、$\int_{S_\infty}k_\chi=\delta M-\Omega_H\delta J$、$\int_B\delta Q_\chi=\kappa\delta A/(8\pi G)$ とする。内側項の符号を含め第一法則を導け。

<!-- solution-start -->
**詳細解答**：Stokesの境界向きから

$$
0=\int_{\partial\Sigma}k_\chi
=\int_{S_\infty}k_\chi-\int_Bk_\chi.
$$

$\chi|_B=0$ なので $k_\chi|_B=\delta Q_\chi$。与えられた両境界の値を代入して

$$
0=\delta M-\Omega_H\delta J-\frac{\kappa}{8\pi G}\delta A.
$$

最後の項を右辺へ移せば $\delta M=\kappa\delta A/(8\pi G)+\Omega_H\delta J$。内側面を外側と同じ符号で足すと誤った結果になります。
<!-- solution-end -->

<a id="ex-bht19-a05"></a>

#### BHT19-A05 Schwarzschildの数値係数

- Level: A
- 問題: $r_+=2GM$、$A=4\pi r_+^2$、$\kappa=1/(2r_+)$ とする。$\int_BQ_\chi$ と $\kappa(dA/dM)/(8\pi G)$ を計算し、両者が何を測るか区別せよ。

<!-- solution-start -->
**詳細解答**：$A=16\pi G^2M^2$、$\kappa=1/(4GM)$ なので

$$
\int_BQ_\chi=\frac{\kappa A}{8\pi G}
=\frac{16\pi G^2M^2}{32\pi G^2M}=\frac M2.
$$

一方、$dA/dM=32\pi G^2M$ より

$$
\frac{\kappa}{8\pi G}\frac{dA}{dM}
=\frac{1}{4GM}\frac{32\pi G^2M}{8\pi G}=1.
$$

前者は一背景のNoether電荷積分、後者は固定生成場の境界変分による第一法則の係数で、$\delta(M/2)$ と $\int_B\delta Q_\chi$ を同一視しません。
<!-- solution-end -->

### Level B：変分の条件とWald公式の再構成

<a id="ex-bht19-b01"></a>

#### BHT19-B01 なぜ $\delta\kappa$ が出ないか

- Level: B
- 問題: 分岐面 $B$ 上で固定した $\chi^a$ が零とし、$\delta\chi^a=0$ とする。$\delta(\nabla_a\chi^b)|_B=0$ を示せ。これが「解族上の $\delta(\kappa A)$」との違いになる理由を説明せよ。

<!-- solution-start -->
**詳細解答**：接続の定義から $\nabla_a\chi^b=\partial_a\chi^b+\Gamma^b{}_{ac}\chi^c$。固定した座標上で $\delta\chi=0$ なので

$$
\delta(\nabla_a\chi^b)
=\delta(\partial_a\chi^b)+\delta\Gamma^b{}_{ac}\chi^c
+\Gamma^b{}_{ac}\delta\chi^c
=\delta\Gamma^b{}_{ac}\chi^c.
$$

$B$ で $\chi^c=0$ より零です。$\kappa$ は背景で $\nabla\chi=\kappa\hat\epsilon$ を満たす数であり、変分後の $\chi$ がその新計量のKilling生成場である必要はありません。従って背景式 $\int_BQ_\chi=\kappa A/(8\pi G)$ を、解ごとの $\kappa$ と $A$ の普通の積として微分するのは、この固定生成場の変分と違います。[補題](#lem-bht19-fixed-generator)では残る計量変分が $\delta A$ を与えます。
<!-- solution-end -->

<a id="ex-bht19-b02"></a>

#### BHT19-B02 法線計量の変化が消える計算

- Level: B
- 問題: 法線2次元計量が背景 $\eta=\mathrm{diag}(-1,1)$ から $g_{00}=-1+a$、$g_{11}=1+b$、$g_{01}=0$ に変わり、固定boost行列の $K_0{}^1=K_1{}^0=\kappa$ が一定とする。一次まで $\sqrt{|\det g|}(g^{00}K_0{}^1-g^{11}K_1{}^0)$ を求め、面積変分だけが残る意味を説明せよ。

<!-- solution-start -->
**詳細解答**：小さい $a,b$ に対し

$$
g^{00}=\frac1{-1+a}=-1-a+O(a^2),\qquad
g^{11}=\frac1{1+b}=1-b+O(b^2).
$$

さらに $\det g=(-1+a)(1+b)=-1-b+a+O(ab)$ だから

$$
\sqrt{|\det g|}=1+\frac{b-a}{2}+O(a^2+ab+b^2).
$$

従って

$$
\begin{aligned}
\sqrt{|\det g|}\kappa(g^{00}-g^{11})
&=\kappa\left[1+\frac{b-a}{2}\right](-2-a+b)+O(2)\\
&=\kappa[-2-a+b-b+a]+O(2)\\
&=-2\kappa+O(2).
\end{aligned}
$$

法線面由来の一次変分が消えるので、4次元体積形式から分岐面へ電荷を制限した際に変化するのは、接方向の面積要素です。ここで $O(2)$ は摂動の二次以上を表します。
<!-- solution-end -->

<a id="ex-bht19-b03"></a>

#### BHT19-B03 $f(R)$ 模型を公式だけで検算する

- Level: B
- 問題: $L=f(R)/(16\pi G)$、$f$ は微分可能で、分岐面 $B$ 上の $R$ は定数 $R_0$ とする。$E_R^{abcd}$ と $S_W$ を計算し、$f(R)=R+\alpha R^2$ での結果を示せ。これは一般の非定常第二法則を証明するか。

<!-- solution-start -->
**詳細解答**：連鎖律で $\partial L/\partial R_{abcd}=f'(R)(\partial R/\partial R_{abcd})/(16\pi G)$。A02の縮約を使うと

$$
E_R^{abcd}=\frac{f'(R)}{32\pi G}
(g^{ac}g^{bd}-g^{ad}g^{bc}).
$$

A03の双法線縮約は $-4$ だから

$$
S_W=-2\pi\int_B\left(-\frac{f'(R)}{8\pi G}\right)dA
=\frac1{4G}\int_B f'(R)\,dA.
$$

$R=R_0$ が $B$ 上一定なら $S_W=f'(R_0)A/(4G)$。$f(R)=R+\alpha R^2$ では $f'(R_0)=1+2\alpha R_0$ より $S_W=(1+2\alpha R_0)A/(4G)$ です。**存在する定常解**という仮定を外して任意の $R_0$ のブラックホールがあると結論したわけではなく、非定常でのエントロピー増大も従いません。これは次講の適用例への準備です。
<!-- solution-end -->

<a id="ex-bht19-b04"></a>

#### BHT19-B04 生成場を変えてしまった場合

- Level: B
- 問題: 定常軸対称背景の $\chi=t+\Omega_H\varphi$ で、$\Omega_H$ を解族に沿って変化させる操作 $\delta(\Omega_H J)$ と、$\Omega_H$ を背景値に固定した表面Hamiltonian変分 $\delta H_\chi$ の差を示せ。第一法則の証明でどちらを使うべきか、理由を述べよ。

<!-- solution-start -->
**詳細解答**：積の微分を普通に行えば

$$
\delta(\Omega_HJ)=\Omega_H\delta J+J\delta\Omega_H.
$$

一方、背景値の $\Omega_H$ を固定して $\delta\chi=0$ とした[表面変分](../BHT18/index.md#def-bht18-surface)は線形性から

$$
\delta H_\chi=\delta H_t+\Omega_H\delta H_\varphi
=\delta M-\Omega_H\delta J.
$$

ここに $-J\delta\Omega_H$ はありません。前者は変化する係数を含む関数の全微分、後者は**一つに固定した生成場**に対応する1形式の評価だからです。[境界変分恒等式](../BHT18/index.md#thm-bht18-boundary)の証明は $\delta\chi=0$ を仮定しており、第一法則では後者を用います。
<!-- solution-end -->

### Level C：二つの導出の照合

<a id="ex-bht19-c01"></a>

#### BHT19-C01 Noether側と熱力学側の独立照合

- Level: C
- 問題: 4次元真空Schwarzschildを考え、$A=16\pi G^2M^2$、$\kappa=1/(4GM)$ とする。次をすべて再構成せよ。
  1. Einstein–Hilbert作用から $E_R^{abcd}$ と $S_W$ を求める。
  2. 分岐面の $\int_BQ_\chi$ を求め、$(2\pi/\kappa)\int_BQ_\chi$ が $S_W$ と一致することを確認する。
  3. $\delta H_t=\delta M$ と固定生成場の内側変分を等置して第一法則を導き、$dS_W/dM$ と $T_H=\kappa/(2\pi)$ の積が1であることを示す。
  4. 一解上の $\int_BQ_\chi=M/2$ の通常の解族微分と、固定 $B,\chi$ の $\int_B\delta Q_\chi$ が異なる理由を説明する。

<!-- solution-start -->
**詳細解答**：

1. $R=g^{ac}g^{bd}R_{abcd}$ に反対称射影を施して

$$
E_R^{abcd}=\frac{g^{ac}g^{bd}-g^{ad}g^{bc}}{32\pi G}.
$$

双法線の二つの収縮は $-2,+2$ なので

$$
S_W=-2\pi\int_B\frac{-4}{32\pi G}\,dA
=\frac{A}{4G}=4\pi GM^2.
$$

2. [分岐面電荷](#prop-bht19-einstein-charge)に代入すると

$$
\int_BQ_\chi=\frac{\kappa A}{8\pi G}
=\frac{M}{2},\qquad
\frac{2\pi}{\kappa}\int_BQ_\chi
=\frac{2\pi}{\kappa}\frac{\kappa A}{8\pi G}
=\frac{A}{4G}=S_W.
$$

3. [$\delta Q$ の補題](#lem-bht19-fixed-generator)と[境界恒等式](../BHT18/index.md#thm-bht18-boundary)から $\delta M=\kappa\delta A/(8\pi G)$ です。実際、

$$
\frac{dA}{dM}=32\pi G^2M,\quad
\frac{\kappa}{8\pi G}\frac{dA}{dM}
=\frac{1}{4GM}\frac{32\pi G^2M}{8\pi G}=1.
$$

$S_W=4\pi GM^2$ と $T_H=1/(8\pi GM)$ からも

$$
\frac{dS_W}{dM}=8\pi GM,\qquad
T_H\frac{dS_W}{dM}
=\frac{1}{8\pi GM}(8\pi GM)=1
$$

となり、古典的Noether計算とHawking温度の熱力学的同定が一致します。

4. $M/2$ はそれぞれの解自身の分岐面・生成場で評価した積分値です。その解族を通常微分した $\delta M/2$ は、背景の $B$ と $\chi$ を固定し、変分後の $\chi$ がKilling場であることを要求しないIyer–Waldの $\int_B\delta Q_\chi=\kappa\delta A/(8\pi G)=\delta M$ とは変分対象が異なります。$\delta\kappa$ を勝手に付加・削除しないことが検算の要点です。
<!-- solution-end -->

## 7. 何が分かったか

- 定常・非極限の分岐面では生成場自身は零でも $\nabla\chi$ は非零で、Noether電荷は面積を測ります。
- [共変位相空間の境界変分恒等式](../BHT18/index.md#thm-bht18-boundary)を背景の生成場を固定して適用すると $\delta M-\Omega_H\delta J=\kappa\delta A/(8\pi G)$ が導かれます。解族ごとの電荷の通常微分と混同しません。
- 曲率依存の作用密度の微分と双法線の縮約からWald公式が得られ、Einstein–Hilbertでは二つの独立した係数計算が $S_W=A/(4G)$ を与えます。
- この導出は定常分岐地平線と境界条件に依存します。高階曲率・極限・動的地平線・量子補正へ、そのまま無条件に広げることはできません。

次講 **BHT20「高階曲率とWald公式の適用限界」** では $f(R)$ 等の模型で具体的な補正を検算し、Noether電荷の曖昧さと非定常地平線の限界を区別します。
