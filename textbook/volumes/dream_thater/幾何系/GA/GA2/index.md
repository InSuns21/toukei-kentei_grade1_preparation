# GA2 多様体Sobolev空間・貼り合わせ・コンパクト性

[GA1のGreenの第一公式](../GA1/index.md#thm-ga1-green-first)は、滑らかな関数について微分を試験関数へ移しました。しかし、近似解の極限が二階どころか一階微分可能でないとき、その等式をどう読めばよいでしょうか。[GPDE3のSobolev空間](../../../解析系/GPDE/GPDE3/index.md#def-gpde3-sobolev-space)はEuclid空間上でこの問題を解決しました。曲がった多様体には、全体を覆う一枚の座標が一般にはありません。

本章では、局所座標ごとに弱微分を測り、[1の分割](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)で重ね合わせることで多様体上の関数空間を作ります。座標の取り替えがノルムを壊さないことを計算し、有限枚の座標上でEuclidの埋め込み・コンパクト性を使ったあと、連結性から平均零のPoincaré不等式を導きます。最後に境界と非コンパクト性で何が変わるかを確かめます。

## 1. 局所座標の微分を一つのノルムにまとめる

以下、まず $(M,g)$ を**滑らかな、連結な、コンパクトで境界のない $d$ 次元Riemann多様体**（$d\ge1$）とします。実数値関数を扱います。[GEO1の座標近傍](../../GEO/GEO1/index.md#def-geo1-chart)は $\kappa_i:U_i\to\Omega_i\subset\mathbb R^d$ という微分同相写像で、その逆像によって座標関数 $u_i=u\circ\kappa_i^{-1}$ を得ます。

$M$ がコンパクトであることと、[GEO4で証明した滑らかな1の分割の存在](../../GEO/GEO4/index.md#thm-geo4-partition-of-unity)を組み合わせ、有限個の座標近傍 $U_1,\ldots,U_N$ と滑らかな非負関数 $\chi_i$ を選べます。ここで

$$
\operatorname{supp}\chi_i\Subset U_i,\qquad
\sum_{i=1}^N\chi_i=1
\quad\text{on }M
$$

とします。$\Subset$ は閉包が右側の内部に含まれるコンパクト集合であることを表します。座標像での切断関数を

$$
w_i=(\chi_i u)\circ\kappa_i^{-1}
$$

と置き、$\Omega_i$ の外では $0$ に延長します。台が $\Omega_i$ の内部に収まるため、延長後に人工的な境界ジャンプは生じません。

局所的に $L^p$ の弱微分が存在するかは、座標関数が[GPDE3のSobolev空間の定義](../../../解析系/GPDE/GPDE3/index.md#def-gpde3-sobolev-space)の弱微分条件を満たすかどうかで判定できます。別々の座標で計算しても矛盾しないことは第2節で証明します。

<a id="def-ga2-sobolev"></a>
<!-- formal-statement-start -->
> **定義（多様体上のSobolev空間）**  
> 上記の $(M,g)$、整数 $k\ge0$ と $1\le p<\infty$ に対し、可測関数のほとんど至る所での同値類 $u$ が、上記の有限切断座標について各 $w_i$ を $W^{k,p}(\mathbb R^d)$ の元として持つとき、$u\in W^{k,p}(M)$ とする。ノルムは

$$
\|u\|_{W^{k,p}(M);\chi,\kappa}
=\left(\sum_{i=1}^N
\sum_{|\alpha|\le k}\|D^\alpha w_i\|_{L^p(\mathbb R^d)}^p\right)^{1/p}
$$

> と定める。$H^k(M)=W^{k,2}(M)$ と書く。異なる有限切断座標によるノルムが同値であることを次節で確かめる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ga2-sobolev -->
**定義の確認**。標準円 $S^1=\mathbb R/(2\pi\mathbb Z)$ 上の $u(\theta)=|\sin\theta|$ を考えます。各座標で $u$ はLipschitz連続です。弱微分の候補は $\cos\theta\,\operatorname{sgn}(\sin\theta)$（零点での値は任意）です。この候補が正しいことを積分で確かめます。円を $\theta=0,\pi$ で分け、各開弧上で滑らかな試験関数 $\varphi$ に対し部分積分すると

$$
\int_{S^1}u\,\partial_\theta\varphi\,d\theta
=-\int_{S^1}
\cos\theta\,\operatorname{sgn}(\sin\theta)\,\varphi\,d\theta
$$

が成立します。弧を貼り合わせた際の境界項は、$u(0)=u(\pi)=0$ により消えます。この恒等式で弱微分が確認され、$u$ とその弱微分は共に有界です。[滑らかな乗数の弱微分積の法則](../../../解析系/GPDE/GPDE3/index.md#prop-gpde3-smooth-multiplier)を各 $\chi_i$ に適用すると、切断座標の関数とその弱微分が $L^2$ に入り、$u\in H^1(S^1)$ です。一方、$\theta=0,\pi$ では古典微分は存在しません。古典微分が存在しない関数まで扱えることが分かります。
<!-- definition-example-end -->

式の右辺には計量が直接見えません。しかしコンパクトな座標の上では、計量はEuclidの長さと体積を上下から比較できるので、計量を使った自然なノルムと同値になります。

## 2. 座標を取り替えても同じ関数空間になる

座標の取り替え $\Phi=\kappa_i\circ\lambda_j^{-1}$ が定義される重なりを考えます。$x=\Phi(y)$、$v(y)=u_i(\Phi(y))$ とおくと、滑らかな $u_i$ に対する連鎖律は

$$
\partial_{y^a}v(y)
=\sum_{b=1}^d
(\partial_{x^b}u_i)(\Phi(y))\,\partial_{y^a}\Phi^b(y).
$$

つまり新座標の弱微分を評価するには、**古い弱微分と座標変換のJacobi行列の両方**を評価します。座標変換が滑らかでも、その導関数に一様上界がなければ大域的比較はできません。そこで切断関数の台を座標重なりの中のコンパクト集合へ閉じ込めます。

<a id="thm-ga2-chart-equivalence"></a>
<!-- formal-statement-start -->
> **定理（切断座標ノルムの同値性）**  
> $M$ を第1節の多様体、$k\ge0$、$1\le p<\infty$ とする。台が各座標近傍の内部にコンパクトに含まれる二組の有限な滑らかな1の分割と座標系 $(\chi_i,\kappa_i)$、$(\eta_j,\lambda_j)$ で定めたノルムについて、$u\in W^{k,p}(M)$ に対し正数 $c,C$ が存在して

$$
c\|u\|_{W^{k,p}(M);\chi,\kappa}
\le\|u\|_{W^{k,p}(M);\eta,\lambda}
\le C\|u\|_{W^{k,p}(M);\chi,\kappa}
$$

> が成立する。したがって空間そのものは切断座標の選択によらない。
<!-- formal-statement-end -->

### 証明の見取り図

$\eta_j u=\sum_i\eta_j\chi_i u$ と分けます。一つ一つの項を、台がコンパクトな座標の重なりで座標変換し、座標変換の連鎖律で微分を展開し、切断関数の積を微分してからJacobianを含めて変数を取り替え、元のノルムで評価します。定数が有限個しかないことが重要です。

<!-- proof-start -->
### 証明

まず $k=1$ とし、$\eta_j\chi_i$ が零でない重なりの部分を取ります。$\operatorname{supp}(\eta_j\chi_i)$ は $U_i\cap V_j$ の内部にコンパクトに含まれます。ここで $V_j$ は $\lambda_j$ の定義域です。座標変換 $\Phi=\kappa_i\circ\lambda_j^{-1}$ と逆変換の一階導関数はこの台上で有界、$|\det D\Phi|$ は正の上下界を持ちます。

$(\eta_j\chi_i u)\circ\lambda_j^{-1}$ は

$$
(\eta_j\circ\lambda_j^{-1})\,
\bigl[(\chi_i u)\circ\kappa_i^{-1}\bigr]\circ\Phi
$$

です。前記の連鎖律と積の法則をそれぞれの成分に用い、$x=\Phi(y)$ で変数変換すると

$$
\|(\eta_j\chi_i u)\circ\lambda_j^{-1}\|_{W^{1,p}}
\le C_{ij}\|(\chi_i u)\circ\kappa_i^{-1}\|_{W^{1,p}}
$$

を得ます。導関数の上界・Jacobianの下界・切断関数の導関数の上界はすべて $C_{ij}$ に含めています。座標の境界近くでは各関数が零なので、零延長による余分な弱微分はありません。

$k=2$ の場合も中間計算を確かめます。上の一階の式を $y^c$ でさらに微分すると、元の関数の二階微分から生じる項と、座標変換の二階微分から生じる項に分かれます。

$$
\begin{aligned}
\partial_{y^c}\partial_{y^a}(f\circ\Phi)
={}&\sum_{b,e=1}^d
(\partial_{x^e}\partial_{x^b}f)(\Phi(y))\,
\partial_{y^c}\Phi^e\,\partial_{y^a}\Phi^b\\
&+\sum_{b=1}^d
(\partial_{x^b}f)(\Phi(y))\,
\partial_{y^c}\partial_{y^a}\Phi^b.
\end{aligned}
$$

両項の係数は座標重なりのコンパクトな台上で有界です。$k\ge2$ ではこの操作を繰り返すことで、次数 $|\alpha|\le k$ の導関数は

$$
D_y^\alpha(f\circ\Phi)
=\sum_{1\le|\beta|\le|\alpha|}
A_{\alpha\beta}(y)\,(D_x^\beta f)(\Phi(y))
$$

という形になります（$\alpha=0$ は関数自身）。係数 $A_{\alpha\beta}$ は $\Phi$ の $k$ 階以下の導関数の有限和・積です。コンパクトな台上で一様有界なので同じ評価を得ます。弱微分の場合は、[局所平滑化定理](../../../解析系/GPDE/GPDE3/index.md#thm-gpde3-local-mollification)で各切断座標を滑らかな関数に近似して評価を渡します。$p<\infty$ を用いるのはこのノルム収束の段階です。

次に $\eta_j u=\sum_i\eta_j\chi_i u$ を使い、三角不等式で各 $j$ のノルムを上から評価します。$i,j$ は有限個なので

$$
\|u\|_{W^{k,p};\eta,\lambda}
\le C\|u\|_{W^{k,p};\chi,\kappa}.
$$

二組を交換して全く同じ評価を作れば逆向きも成立します。
<!-- proof-end -->

この証明は「座標変換は滑らかだからよい」という一言では成立しません。**有限個のコンパクト台があるから、導関数とJacobianの比較定数を一斉に選べる**のです。

### 計量と体積が入る場所

[GEO12で計算したRiemann体積密度](../../GEO/GEO12/index.md#prop-geo12-volume-coordinate)を座標へ代入すると、

$$
dV_g=\rho(x)\,dx,\qquad
\rho(x)=\sqrt{\det(g_{ab}(x))}>0.
$$

コンパクトな切断座標上では、$0<m\le\rho(x)\le M_0$ が成立し、

$$
m\int|w|^pdx
\le \int|w|^p\,dV_g
\le M_0\int|w|^pdx
$$

です。勾配を座標で判定する理由も確認します。座標基底 $(\partial_{x^1},\ldots,\partial_{x^d})$ に関する計量の行列を $G=(g_{ab})$ とすると、$G$ は各点で対称正定値です。[計量勾配の座標公式](../../GEO/GEO12/index.md#prop-geo12-gradient-coordinate)は $g(\nabla_gw,\partial_{x^a})=\partial_aw$ を基底ごとに解いたものであり、

$$
\nabla_gw=\sum_{a,b}g^{ab}(\partial_bw)\partial_{x^a},
\qquad
|\nabla_gw|_g^2=(\partial w)^TG^{-1}(\partial w)
$$

となります。ここで $G^{-1}=(g^{ab})$ です。$G^{-1}$ の最小・最大固有値は正で、コンパクトな切断台上でそれぞれ正の下界と有限な上界を持つため、

$$
c_0|\partial w|^2
\le \sum_{a,b}g^{ab}\partial_aw\partial_bw
\le C_0|\partial w|^2
$$

となります。体積密度の比較と合わせて、局所の計量による $H^1$ ノルムとEuclidの $H^1$ ノルムを双方向に比較できます。

<a id="prop-ga2-intrinsic-h1"></a>
<!-- formal-statement-start -->
> **命題（共変微分によるSobolevノルム）**  
> 第1節の $M$ で、滑らかな関数 $u$ に対し

$$
\|u\|_{H^1_g}^2
=\int_M\bigl(|u|^2+|\nabla_gu|_g^2\bigr)\,dV_g
$$

> とおく。この量は第1節の切断座標による $H^1$ ノルムの二乗と互いに正の定数倍で挟まれる。したがって $H^1_g$ のノルムは $H^1(M)$ に一意に延長される。
<!-- formal-statement-end -->

### 証明の見取り図

$\nabla_gu$ の座標成分を $g^{ab}\partial_bu$ と書き、計量の正定値性と切断関数の積の法則を双方向に使います。

<!-- proof-start -->
### 証明

上の体積・計量の比較により、座標の台上では $\int(|w|^2+|\partial w|^2)dx$ と $\int(|w|^2+|\nabla_gw|^2)dV_g$ が同値です。$w=\chi_i u$ として

$$
\nabla_g(\chi_iu)=\chi_i\nabla_gu+u\nabla_g\chi_i
$$

より、$\|\chi_i u\|_{H^1_g}\le C_i\|u\|_{H^1_g}$ を得ます。逆に $\sum_i\chi_i=1$ から $u=\sum_i\chi_i u$、$\nabla_gu=\sum_i\nabla_g(\chi_i u)$ ですから、[Cauchy--Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)により

$$
\|u\|_{H^1_g}
\le\sum_i\|\chi_i u\|_{H^1_g}
\le C\|u\|_{H^1(M);\chi,\kappa}.
$$

前向きの評価と合わせれば結論です。滑らかな関数の密度は次節で確認します。
<!-- proof-end -->

**具体例：角度によって伸縮する円**。$S^1$ に滑らかな正の周期関数 $a(\theta)$ を取り、計量 $g=a(\theta)^2d\theta^2$ を入れます。ここでは正数 $m,M_0$ があり $0<m\le a\le M_0$ とします。

座標基底 $\partial_\theta$ による計量行列は $G=(a^2)$ です。成分 $g(\partial_\theta,\partial_\theta)=a^2>0$ より正定値で、その逆行列は $(a^{-2})$ となります。

まず体積密度には[既習の局所座標表示](../../GEO/GEO12/index.md#prop-geo12-volume-coordinate)を使います。また、勾配には[既習の計量勾配の表示](../../GEO/GEO12/index.md#prop-geo12-gradient-coordinate)を用います。行列 $G$ とその逆行列をそれぞれ代入すると、

$$
dV_g=\sqrt{\det G}\,d\theta=a\,d\theta,\qquad
\nabla_gu=a^{-2}u'\partial_\theta,\qquad
|\nabla_gu|_g^2=a^{-2}(u')^2
$$

です。最後の等号では $g(\partial_\theta,\partial_\theta)=a^2$ を使いました。したがって

$$
\|u\|_{H^1_g}^2
=\int_0^{2\pi}\left(a\,u^2+\frac{(u')^2}{a}\right)d\theta.
$$

$a$ と $a^{-1}$ に上記の上下界があるため、各非負項の係数を比較すると

$$
\min(m,M_0^{-1})\|u\|_{H^1_{\rm flat}}^2
\le\|u\|_{H^1_g}^2
\le\max(M_0,m^{-1})\|u\|_{H^1_{\rm flat}}^2
$$

です。計量の正定値性、体積密度、勾配ノルムの各条件を別々に確認したので、「同じ円」でも数値は変わる一方、$H^1$ への所属は変わらないと分かります。

$k=1$ では関数の共変微分は通常の微分 $du$ であり、上の計量勾配の座標計算で十分です。一方、第1節の一般の $W^{k,p}(M)$ は座標弱微分で定義しており、二階以上の共変微分や接続係数を定義の前提にはしません。それらを使う別の内在的表示には接続の定義と高階微分の比較が必要ですが、本節の $H^1$ ノルム同値の証明には不要です。

## 3. 極限を取っても弱微分を失わない

局所のノルムを作っても、完備でなければ近似解を極限まで追えません。局所での収束を重なりで矛盾なく貼り合わせる必要があります。

<a id="thm-ga2-complete-density"></a>
<!-- formal-statement-start -->
> **定理（多様体Sobolev空間の完備性と滑らかな関数の密度）**  
> 第1節の $M$ で、整数 $k\ge0$、$1\le p<\infty$ とする。$W^{k,p}(M)$ はBanach空間で、$C^\infty(M)$ はその中で稠密である。とくに $H^k(M)$ はHilbert空間である。
<!-- formal-statement-end -->

### 証明の見取り図

各切断座標の $W^{k,p}$ 完備性で極限を得ます。重なりでは元の関数の極限だから一致します。密度は台が座標内に収まる切断関数を平滑化して貼り合わせます。

<!-- proof-start -->
### 証明

$u_n$ を $W^{k,p}(M)$ のCauchy列とします。各 $i$ で $w_{i,n}=(\chi_iu_n)\circ\kappa_i^{-1}$ は $W^{k,p}(\mathbb R^d)$ のCauchy列です。[Euclidの完備性](../../../解析系/GPDE/GPDE3/index.md#thm-gpde3-wkp-complete)により $w_{i,n}\to w_i$ が $W^{k,p}$ で成立します。

局所座標の小さい開集合 $O\Subset U_i$ を選びます。1の分割の等式から $u_n=\sum_j\chi_j u_n$ です。

右辺の各切断部分は、前節の座標変換で得た零階の評価を使うと $L^p(O,dV_g)$ で収束します。従ってその有限和も同じ空間で収束し、極限を $u$ と定めます。異なる $O$ の重なりでも元の列は同じなので、[距離空間の極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)によりこの定義は一致します。

さらに $\chi_i u_n\to\chi_i u$ が $L^p$ で成立します。一方、切断座標では $\chi_i u_n\to w_i\circ\kappa_i$ です。二つの極限が一致するため $\chi_i u=w_i\circ\kappa_i$ がほとんど至る所で成立します。すべての $i$ についてこの等式が成立するので、定義したノルムで $u_n\to u$ です。

密度の証明では各 $w_i$ の台が $\Omega_i$ の内部にコンパクトに含まれることを使います。[局所平滑化](../../../解析系/GPDE/GPDE3/index.md#thm-gpde3-local-mollification)を用い、平滑化半径を台から座標像の境界までの距離より小さく選びます。

すると $w_i$ を $\Omega_i$ 内にコンパクト台を持つ滑らかな関数 $w_{i,\varepsilon}$ で $W^{k,p}$ 近似できます。各近似関数を座標から多様体へ戻して零延長し、その有限和を $u_\varepsilon$ と置きます。この関数は滑らかです。

もとの関数は $u=\sum_i\chi_i u$ です。第2節のノルム比較を各差分に用いると

$$
\|u_\varepsilon-u\|_{W^{k,p}(M)}
\le C\sum_i\|w_{i,\varepsilon}-w_i\|_{W^{k,p}(\mathbb R^d)}
\longrightarrow0.
$$

$p=2$ の場合、有限個の $W^{k,2}$ 内積を足したものがこのノルムの二乗を与え、完備性と合わせてHilbert空間になります。
<!-- proof-end -->

## 4. Sobolev埋め込みとRellichのコンパクト性を多様体へ移す

局所座標上では切断した関数 $w_i$ の台がコンパクトです。座標近傍を細分し、座標像を有界なEuclid球 $B_i$ に選びます。このとき切断の台は次を満たします。

$$
\operatorname{supp}w_i\Subset B_i.
$$

そこで[局所平滑化](../../../解析系/GPDE/GPDE3/index.md#thm-gpde3-local-mollification)を用いると、$w_i$ は $C_c^\infty(B_i)$ の関数で $H^1$ 近似できます。[GPDE5の $H_0^1$ の定義](../../../解析系/GPDE/GPDE5/index.md#def-gpde5-w01p)によって $w_i\in H^1_0(B_i)$ です。零延長でも球の境界にジャンプを作りません。これで既習のEuclid定理の適用条件が揃います。

<a id="thm-ga2-embedding"></a>
<!-- formal-statement-start -->
> **定理（コンパクト多様体上のSobolev埋め込み）**  
> 第1節の $M$ に対し、$d\ge3$ なら $2\le q\le 2d/(d-2)$、$d=2$ なら任意の有限 $q\ge2$ について定数 $C_q$ があり、

$$
\|u\|_{L^q(M,dV_g)}
\le C_q\|u\|_{H^1(M)}
\qquad(u\in H^1(M))
$$

> が成り立つ。$d=1$ では $\|u\|_{L^\infty(M)}\le C\|u\|_{H^1(M)}$ が成り立つ。指数の端点でのコンパクト埋め込みは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\chi_i u$ を座標へ移し、[有界Lipschitz領域のSobolev埋め込み](../../../解析系/GPDE/GPDE5/index.md#cor-gpde5-lipschitz-embedding)を球 $B_i$ で適用します。そのあと有限和の三角不等式と体積密度の比較で戻します。

<!-- proof-start -->
### 証明

$u=\sum_i\chi_i u$ とし、$w_i$ を第1節の切断座標とします。各 $B_i$ は有界滑らかでLipschitz領域です。$d\ge3$ では、[有界Lipschitz領域のSobolev埋め込み](../../../解析系/GPDE/GPDE5/index.md#cor-gpde5-lipschitz-embedding)に $p=2$ を代入すると指数 $2d/(d-2)$ の評価を得ます。球は有限測度なので、$2\le q\le2d/(d-2)$ への評価は[Hölderの不等式](../../../解析系/F0/F0-00D2D/index.md#thm-f0-00d2d-01)で従います。

$d=2$ では任意の有限指数 $q>2$ を固定します。次の指数を選びます。

$$
p=\frac{2q}{q+2},\qquad
1<p<2,\qquad
p^*=\frac{2p}{2-p}=q.
$$

有限測度の球 $B_i$ では[Hölderの不等式](../../../解析系/F0/F0-00D2D/index.md#thm-f0-00d2d-01)によって

$$
\|w\|_{W^{1,p}(B_i)}
\le C_{i,p}\|w\|_{H^1(B_i)}
$$

となります。これに[有界Lipschitz領域のSobolev埋め込み](../../../解析系/GPDE/GPDE5/index.md#cor-gpde5-lipschitz-embedding)を指数 $p$ で適用すると、目的の $L^q$ 評価が従います。$q=2$ は最初から $H^1$ ノルムの $L^2$ 項で評価できます。

従って、いずれの次元でも

$$
\|w_i\|_{L^q(B_i)}
\le C_i\|w_i\|_{H^1(B_i)}
$$

となります。座標上の体積密度 $\rho_i$ には正の上下界があるので、$\|\chi_i u\|_{L^q(M)}\le C'_i\|w_i\|_{L^q(B_i)}$ です。よって

$$
\|u\|_{L^q(M)}
\le\sum_i\|\chi_i u\|_{L^q(M)}
\le\sum_iC'_iC_i\|w_i\|_{H^1(B_i)}
\le C_q\|u\|_{H^1(M)}.
$$

$d=1$ では、区間の[絶対連続代表元](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-w11-ac)に対し、任意の $x,y$ で $|w(x)-w(y)|\le\int|w'|$ です。$y$ を $|w(y)|\le |B|^{-1/2}\|w\|_{L^2}$ を満たす点として選べば

$$
|w(x)|\le |B|^{-1/2}\|w\|_{L^2(B)}
+|B|^{1/2}\|w'\|_{L^2(B)}.
$$

有限個の区間でこの評価を使えば $L^\infty(M)$ の結論です。
<!-- proof-end -->

<a id="thm-ga2-rellich"></a>
<!-- formal-statement-start -->
> **定理（コンパクト多様体上のRellichの定理）**  
> 第1節の $M$ で、$H^1(M)$ の任意の有界列 $(u_n)$ は、$L^2(M,dV_g)$ で強収束する部分列を持つ。すなわち埋め込み $H^1(M)\hookrightarrow L^2(M)$ はコンパクトである。
<!-- formal-statement-end -->

### 証明の見取り図

各座標の $w_{i,n}$ に対し、[EuclidのRellich定理](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)で $L^2$ 強収束部分列を取ります。**有限回だけ**部分列を取り直せば、全座標で同時に収束します。

<!-- proof-start -->
### 証明

定義のノルムから、各 $i$ の $w_{i,n}$ は $H_0^1(B_i)$ で有界です。$B_i$ は有界開集合なので、[GPDE5で証明した有界領域でのコンパクト埋め込み](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)を適用すると、$w_{1,n}$ から $L^2(B_1)$ 強収束部分列を選べます。その部分列に対し $i=2$ を適用し、これを $i=N$ まで繰り返して共通部分列 $n_\ell$ を得ます。

元の関数の差には、各座標に戻した切断部分の和を用い、

$$
\begin{aligned}
\|u_{n_\ell}-u_{n_m}\|_{L^2(M)}
&\le\sum_{i=1}^N
\|\chi_i(u_{n_\ell}-u_{n_m})\|_{L^2(M)}\\
&\le C\sum_{i=1}^N
\|w_{i,n_\ell}-w_{i,n_m}\|_{L^2(B_i)}
\longrightarrow0
\end{aligned}
$$

を得ます。$L^2(M)$ は完備なので $u_{n_\ell}$ は強収束します。各 $i$ の収束だけでなく、有限和を通した全体の収束が確認できました。
<!-- proof-end -->

この定理はGA3で、勾配の評価しかない近似解から $L^2$ 強収束を取り出す場面に使います。

## 5. 平均零Poincaré不等式は連結性とコンパクト性から生まれる

境界のない多様体では、定数関数の勾配は0です。したがって任意の $u$ に $\|u\|_{L^2}\le C\|\nabla_gu\|_{L^2}$ を課すことはできません。取り除くべきは**定数方向**です。体積 $\operatorname{Vol}_g(M)>0$ で平均 $\bar u:=\operatorname{Vol}_g(M)^{-1}\int_Mu\,dV_g$ を考えます。

<a id="thm-ga2-poincare"></a>
<!-- formal-statement-start -->
> **定理（平均零Poincaré不等式）**  
> $(M,g)$ を連結・コンパクト・境界なしの滑らかなRiemann多様体とする。このとき定数 $C_P>0$ が存在して、すべての $u\in H^1(M)$ に対し

$$
\|u-\bar u\|_{L^2(M)}
\le C_P\|\nabla_gu\|_{L^2(M)}
$$

> が成り立つ。ここで $\bar u$ は体積平均である。
<!-- formal-statement-end -->

### 証明の見取り図

定数が存在しないと仮定し、平均零・$L^2$ ノルム1・勾配が0へ近づく列を作ります。[本章のRellich定理](#thm-ga2-rellich)で強収束極限を得ると、弱微分が0なので連結な多様体上で定数です。しかし極限は平均零かつノルム1であり矛盾します。

<!-- proof-start -->
### 証明

不等式が偽なら、各自然数 $n$ について平均零の $v_n\in H^1(M)$ が存在し、

$$
\|v_n\|_{L^2}=1,\qquad
\|\nabla_gv_n\|_{L^2}<\frac1n
$$

とできます。実際、元の反例 $u_n$ から平均 $\bar u_n$ を引き、$\|u_n-\bar u_n\|_{L^2}$ で割ればよく、分母は不等式に反するため0ではありません。

$\|v_n\|_{H^1_g}^2=1+\|\nabla_gv_n\|_{L^2}^2$ は有界です。[本章の $H^1$ から $L^2$ へのコンパクト埋め込み](#thm-ga2-rellich)によって部分列（同じ添字で書く）が $v_n\to v$ in $L^2(M)$ で収束します。したがって

$$
\int_Mv\,dV_g=0,\qquad\|v\|_{L^2(M)}=1
$$

です。最初の等式はCauchy--Schwarzにより $|\int(v_n-v)|\le\operatorname{Vol}_g(M)^{1/2}\|v_n-v\|_{L^2}\to0$ だからです。

任意の座標近傍の内部に台を持つ滑らかな試験関数 $\varphi$ に対して、弱微分の定義に従って試験関数を積分に代入します。$v_n\to v$ in $L^2$、$\partial_av_n\to0$ in $L^2$（計量比較による）なので

$$
\int v\,\partial_a\varphi\,dx
=\lim_n\int v_n\,\partial_a\varphi\,dx
=-\lim_n\int(\partial_av_n)\varphi\,dx=0.
$$

よって $v$ の座標弱微分は0です。開球上で平滑化すれば近似関数の古典微分も0となるため、$v$ は各連結な座標球上でほとんど至る所定数です。重なる球では定数が一致し、$M$ が連結であることから全体で同じ定数となります。平均零なのでその定数は0、しかし $\|v\|_{L^2}=1$ に矛盾します。
<!-- proof-end -->

<a id="prop-ga2-gradient-norm"></a>
<!-- formal-statement-start -->
> **命題（平均零空間での勾配ノルム）**  
> 上記の $M$ の閉部分空間

$$
H^1_\perp(M)=\left\{u\in H^1(M):\int_Mu\,dV_g=0\right\}
$$

> では $\|\nabla_gu\|_{L^2}$ はノルムとなり、通常の $H^1$ ノルムと同値である。
<!-- formal-statement-end -->

体積が有限なので、$|\int_Mu\,dV_g|\le\operatorname{Vol}_g(M)^{1/2}\|u\|_{L^2}$ です。ゆえに平均零条件は $H^1$ 上の連続線形汎関数の核を定め、上の部分空間は閉じています。

<!-- proof-start -->
### 証明

[本章で証明した平均零関数の勾配評価](#thm-ga2-poincare)から

$$
\|u\|_{H^1_g}^2
=\|u\|_{L^2}^2+\|\nabla_gu\|_{L^2}^2
\le(1+C_P^2)\|\nabla_gu\|_{L^2}^2.
$$

逆向きの $\|\nabla_gu\|_{L^2}\le\|u\|_{H^1_g}$ は定義から従います。勾配が0なら $u$ の $L^2$ ノルムも0となるため、勾配の量は平均零空間で正定値です。
<!-- proof-end -->

## 6. 境界と非コンパクト性では何が変わるか

ここまでは境界がありませんでした。境界付きのコンパクトな滑らかな多様体には、内部座標のほかに、境界を半空間 $x^d\ge0$ の一部へ写す**境界座標**が必要です。境界の近くで $H^1$ の元へ境界値を割り当てるには、古典的な点値ではなく[トレース](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-trace-lipschitz)を使います。

**境界付きの場合の $H^1(M)$ の意味**もここで確定します。有限枚の内部座標（球）と境界座標（半球 $B_i^+=B_i\cap\{x^d>0\}$）を取り、その被覆に従属する滑らかな1の分割 $\chi_i$ を選びます。内部では第1節と同じ球上の切断関数、境界では $(\chi_i u)\circ\kappa_i^{-1}\in H^1(B_i^+)$ を要求し、これらの $H^1$ ノルムの二乗和で $H^1(M)$ を定義します。半球の**平らな境界面をまたぐ零延長はしません**。そのような延長は一般にジャンプを作るからです。一方、切断関数の台は半球の曲面側の人工的な境界から離して選びます。

第2節と同じ連鎖律・積の法則およびコンパクト台上でのJacobian比較を、境界を境界へ写す滑らかな座標変換に適用すれば、この定義は座標選択によらず、$\int_M(|u|^2+|\nabla_gu|_g^2)\,dV_g$ によるノルムとも同値になります。この準備の下で初めて、$H^1$ 関数の境界値を問えます。

<a id="prop-ga2-boundary-trace"></a>
<!-- formal-statement-start -->
> **命題（滑らかな境界を持つ多様体のトレース）**  
> $(M,g)$ をコンパクトな滑らかなRiemann多様体で、境界 $\partial M$ も滑らかとする。このとき滑らかな関数の境界への制限は、有界線形写像

$$
\operatorname{Tr}:H^1(M)\longrightarrow L^2(\partial M,dS_g)
$$

> に一意に延長される。トレースが0という条件と平均が0という条件は別である。
<!-- formal-statement-end -->

### 証明の見取り図

境界座標の平坦化で半球を得て、[EuclidのLipschitz領域のトレース定理](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-trace-lipschitz)を各半球へ適用します。境界面の面積密度を比較し、有限枚の1の分割で貼り合わせます。

<!-- proof-start -->
### 証明

境界近傍を有限枚の滑らかな半球型座標で覆い、切断関数 $\chi_i$ を選びます。滑らかな $u$ に対し $w_i=(\chi_i u)\circ\kappa_i^{-1}\in H^1(B_i^+)$ です。各 $B_i^+$ は有界Lipschitz領域なので、[Euclidのトレース定理](../../../解析系/GPDE/GPDE4/index.md#thm-gpde4-trace-lipschitz)を適用できます。

$$
\|\operatorname{Tr}w_i\|_{L^2(\partial B_i^+)}
\le C_i\|w_i\|_{H^1(B_i^+)}.
$$

$M$ の真の境界に対応するのは $\partial B_i^+$ の平らな面 $F_i=\{x^d=0\}\cap B_i$ です。したがって左辺を $F_i$ に制限しても同じ上界が成り立ちます。境界面積要素 $dS_g$ は $F_i$ 上で滑らかな正の密度 $\sigma_i(x')\,dx'$ を持ち、切断台上で $\sigma_i\le C_i'$ です。よって

$$
\|\chi_i u|_{\partial M}\|_{L^2(\partial M)}^2
\le C_i'\|\operatorname{Tr}w_i\|_{L^2(F_i)}^2
\le C_i'C_i^2\|w_i\|_{H^1(B_i^+)}^2.
$$

境界上でも $u=\sum_i\chi_i u$ が成り立ち、内部座標の切断関数は境界で0です。有限和の三角不等式と上で定義した $H^1(M)$ ノルムを使えば、

$$
\|u|_{\partial M}\|_{L^2(\partial M)}
\le C\|u\|_{H^1(M)}
$$

を得ます。

最後に定義域の稠密性を示します。境界座標の関数 $w_i\in H^1(B_i^+)$ を[有界Lipschitz領域の拡張定理](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-extension-lipschitz)により全空間の $H^1$ 関数へ延長します。その延長を[局所平滑化](../../../解析系/GPDE/GPDE3/index.md#thm-gpde3-local-mollification)で近似します。

近似関数には曲面側の人工境界から離れる滑らかな切断関数を掛け、半球へ制限して多様体へ戻します。内部座標には第3節の平滑化を使います。有限個の近似を足すことで、境界まで滑らかな関数が $H^1(M)$ に稠密と分かります。

したがって上の有界線形な境界制限は、稠密な滑らかな関数の空間から $H^1(M)$ 全体へ一意に連続延長されます。
<!-- proof-end -->

例えば区間 $M=[0,1]$ で $u(x)=x$ は、$\operatorname{Tr}u=(0,1)$ ですが、平均を引いた $x-\frac12$ は平均0でもトレースは $(-\frac12,\frac12)$ です。境界のない場合の[平均零Poincaré不等式](#thm-ga2-poincare)を、零トレースの定理と混同できません。

**非コンパクト性による破綻**も具体的です。$\mathbb R$ 上で非零の $\varphi\in C_c^\infty((0,1))$ を固定し、$u_n(x)=\varphi(x-n)$ とすると

$$
\|u_n\|_{H^1(\mathbb R)}=\|\varphi\|_{H^1(\mathbb R)},\qquad
\|u_n-u_m\|_{L^2}^2=2\|\varphi\|_{L^2}^2
\quad(|n-m|\ge2).
$$

ゆえに有界な $H^1$ 列なのに強収束部分列がありません。失った仮定は「台を有限枚の固定された座標領域へ閉じ込めるコンパクト性」です。

Poincaré型評価も無条件ではありません。平均が0の非零 $\varphi\in C_c^\infty(\mathbb R)$ を選び、

$$
v_R(x)=R^{-1/2}\varphi(x/R)
$$

とすると、$x=Ry$ の変数変換から

$$
\int_{\mathbb R}v_R\,dx=0,\quad
\|v_R\|_{L^2}=\|\varphi\|_{L^2},\quad
\|v_R'\|_{L^2}=R^{-1}\|\varphi'\|_{L^2}.
$$

$R\to\infty$ で勾配だけが0へ行きます。$\mathbb R$ では体積が無限なので「体積平均 $\bar u$」は一般に定義できませんが、**積分が0の関数に制限しても**一様な勾配評価は失敗することが分かります。

## 7. 演習

### Level A

<a id="ex-ga2-a01"></a>
#### GA2-A01 円の $H^1$ ノルム
- Level: A

標準計量の $S^1$ で $u(\theta)=\sin(2\theta)$ とする。$\|u\|_{L^2}^2$、$\|\nabla_gu\|_{L^2}^2$、$\|u\|_{H^1_g}^2$ を求めよ。

<!-- solution-start -->
**詳細解答**。体積要素は $d\theta$、$\nabla_gu=2\cos(2\theta)\partial_\theta$ です。$\sin^2(2\theta)=(1-\cos4\theta)/2$、$\cos^2(2\theta)=(1+\cos4\theta)/2$ から

$$
\int_0^{2\pi}\sin^2(2\theta)d\theta=\pi,\qquad
\int_0^{2\pi}4\cos^2(2\theta)d\theta=4\pi.
$$

従って[第2節の計量からのノルム表示](#prop-ga2-intrinsic-h1)に代入して $\|u\|_{H^1_g}^2=5\pi$ です。
<!-- solution-end -->

<a id="ex-ga2-a02"></a>
#### GA2-A02 伸縮計量での比較
- Level: A

円で $g=a(\theta)^2d\theta^2$、$2\le a(\theta)\le3$ とする。$H^1_g$ ノルムの二乗を通常の円のノルムの二乗と比較する明示的な定数を求めよ。

<!-- solution-start -->
**詳細解答**。第2節の座標計算を使うと

$$
\|u\|_{H^1_g}^2=\int_0^{2\pi}
\left(a u^2+a^{-1}(u')^2\right)d\theta.
$$

$2\le a\le3$ なら $1/3\le a^{-1}\le1/2$ なので、$u^2$ と $(u')^2$ の係数をそれぞれ比較して

$$
\frac13\int_0^{2\pi}(u^2+(u')^2)d\theta
\le\|u\|_{H^1_g}^2
\le3\int_0^{2\pi}(u^2+(u')^2)d\theta.
$$

一方の係数だけを見ると下界や上界を取り違えるので、両方を確認します。
<!-- solution-end -->

<a id="ex-ga2-a03"></a>
#### GA2-A03 平坦トーラスの勾配
- Level: A

$T^2=(\mathbb R/2\pi\mathbb Z)^2$ の平坦計量で $u(x,y)=\sin x\cos y$ とする。$H^1$ ノルムの二乗を求めよ。

<!-- solution-start -->
**詳細解答**。$\partial_xu=\cos x\cos y$、$\partial_yu=-\sin x\sin y$ です。各変数の $\sin^2,\cos^2$ の積分が $\pi$ なので

$$
\|u\|_{L^2}^2=\pi^2,\quad
\|\partial_xu\|_{L^2}^2=\pi^2,\quad
\|\partial_yu\|_{L^2}^2=\pi^2.
$$

従って $\|u\|_{H^1_g}^2=3\pi^2$ です。
<!-- solution-end -->

<a id="ex-ga2-a04"></a>
#### GA2-A04 平均零とトレース
- Level: A

区間 $[0,1]$ の $u(x)=x-\frac12$ について、$\int_0^1u\,dx$ と両端のトレースを求め、どの境界条件が成立するか述べよ。

<!-- solution-start -->
**詳細解答**。積分は $[x^2/2-x/2]_0^1=0$ です。$u$ は滑らかなので[トレース定理](#prop-ga2-boundary-trace)の作用は端点での値に一致し、$\operatorname{Tr}u=(-1/2,1/2)$ です。平均零条件は成立しますが、零トレースのDirichlet条件は成立しません。
<!-- solution-end -->

### Level B

<a id="ex-ga2-b01"></a>
#### GA2-B01 貼り合わせた局所評価
- Level: B

コンパクトで境界のない $M$ の切断座標が3枚あるとする。各 $w_i$ が $\|w_i\|_{L^4}\le K_i\|w_i\|_{H^1}$ を満たし、体積密度による座標への戻しが $L^4$ で係数 $D_i$ 以下とする。$\|u\|_{L^4(M)}$ の評価を導け。

<!-- solution-start -->
**詳細解答**。$\chi_1+\chi_2+\chi_3=1$ から $u=\sum_{i=1}^3\chi_i u$ です。三角不等式、座標変換時の体積密度比較、仮定の局所埋め込みをこの順で用いて

$$
\begin{aligned}
\|u\|_{L^4(M)}
&\le\sum_{i=1}^3\|\chi_i u\|_{L^4(M)}\\
&\le\sum_{i=1}^3D_i\|w_i\|_{L^4}\\
&\le\sum_{i=1}^3D_iK_i\|w_i\|_{H^1}.
\end{aligned}
$$

Cauchy--Schwarzにより最後は $\bigl(\sum_{i=1}^3(D_iK_i)^2\bigr)^{1/2}\bigl(\sum_{i=1}^3\|w_i\|_{H^1}^2\bigr)^{1/2}$ 以下です。[多様体Sobolev空間の定義](#def-ga2-sobolev)から目的の大域的 $H^1$ ノルム評価になります。
<!-- solution-end -->

<a id="ex-ga2-b02"></a>
#### GA2-B02 非コンパクトでの集中ではなく平行移動
- Level: B

$\varphi\in C_c^\infty((0,1))$ を非零とし、$u_n(x)=\varphi(x-3n)$ とする。$\mathbb R$ 上で $H^1$ 有界だが $L^2$ 強収束部分列がないことを示し、どの証明段階が失敗するかを指摘せよ。

<!-- solution-start -->
**詳細解答**。$y=x-3n$ で置換して

$$
\|u_n\|_{L^2}^2=\int|\varphi(y)|^2dy,\quad
\|u_n'\|_{L^2}^2=\int|\varphi'(y)|^2dy
$$

です。$n\ne m$ なら台 $(3n,3n+1)$ と $(3m,3m+1)$ は交わりません。従って交差積分は0となり、

$$
\|u_n-u_m\|_{L^2}^2
=\|u_n\|_{L^2}^2+\|u_m\|_{L^2}^2
=2\|\varphi\|_{L^2}^2>0.
$$

Cauchy部分列すらないため強収束部分列はありません。[Rellichの証明](#thm-ga2-rellich)の「有限枚の固定された有界座標上で同時に部分列を取る」操作が、台が無限遠へ逃げるため成立しません。
<!-- solution-end -->

<a id="ex-ga2-b03"></a>
#### GA2-B03 平均零Poincaréから変分問題の安定性へ
- Level: B

連結コンパクト境界なしの $M$ で平均零の $u\in H^1(M)$ が、ある $f\in L^2(M)$ に対し $\int_Mg(\nabla_gu,\nabla_gv)\,dV_g=\int_Mfv\,dV_g$ をすべての平均零 $v\in H^1(M)$ について満たすとする。$u$ の $H^1$ ノルムを $\|f\|_{L^2}$ で評価せよ。

<!-- solution-start -->
**詳細解答**。$u$ 自身が平均零なので試験関数 $v=u$ を選べます。[平均零Poincaré不等式](#thm-ga2-poincare)とCauchy--Schwarzを使い、

$$
\begin{aligned}
\|\nabla_gu\|_{L^2}^2
&=\int_Mfu\,dV_g\\
&\le\|f\|_{L^2}\|u\|_{L^2}
\le C_P\|f\|_{L^2}\|\nabla_gu\|_{L^2}.
\end{aligned}
$$

勾配が0なら平均零から $u=0$ で結論です。そうでなければ勾配ノルムで割って $\|\nabla_gu\|_{L^2}\le C_P\|f\|_{L^2}$。さらに[平均零空間でのノルム同値性](#prop-ga2-gradient-norm)により

$$
\|u\|_{H^1_g}
\le(1+C_P^2)^{1/2}C_P\|f\|_{L^2}.
$$

ここでは $f$ の平均零を仮定する必要はありません。試験空間が平均零なので定数成分は式に寄与しないためです。
<!-- solution-end -->

### Level C

<a id="ex-ga2-c01"></a>
#### GA2-C01 多様体上のコンパクト性と定数方向の分離
- Level: C

連結コンパクト境界なしの $M$ で $\int_Mu_n\,dV_g=0$ かつ $\|\nabla_gu_n\|_{L^2}\le K$ を満たす列を考える。

1. $(u_n)$ が $H^1(M)$ で有界であることを示せ。
2. $H^1(M)$ で弱収束し、$L^2(M)$ で強収束する同一部分列を取り、その極限も平均零と示せ。
3. 連結性を除いて二つの連結成分をもつ $M$ では、同じ勾配評価だけで1が成り立たない例を示せ。

<!-- solution-start -->
**詳細解答**。

**1.** [平均零Poincaré不等式](#thm-ga2-poincare)で $\|u_n\|_{L^2}\le C_PK$。したがって

$$
\|u_n\|_{H^1_g}^2
=\|u_n\|_{L^2}^2+\|\nabla_gu_n\|_{L^2}^2
\le(1+C_P^2)K^2.
$$

**2.** $H^1(M)$ は[完備なHilbert空間](#thm-ga2-complete-density)です。[GPDE5の弱収束部分列の結果](../../../解析系/GPDE/GPDE5/index.md#thm-gpde5-hilbert-weak-subsequence)を有界列に適用すると、部分列 $u_{n_j}$ と $u\in H^1(M)$ を取り、

$$
u_{n_j}\rightharpoonup u
\quad\text{in }H^1(M)
$$

とできます。この部分列に[本章のコンパクト埋め込み](#thm-ga2-rellich)を適用すると、さらに部分列と $v\in L^2(M)$ が存在して

$$
u_{n_{j_\ell}}\to v
\quad\text{in }L^2(M)
$$

となります。連続な埋め込み $H^1(M)\to L^2(M)$ により同じ部分列は $L^2$ で $u$ に弱収束します。一方、強収束は弱収束も含むため、[距離空間の極限の一意性](../../../基礎科目/F0/F0-00B/index.md#prop-f0-00b-01)を用いて $v=u$ と分かります。最後に

$$
\left|\int_M(u_{n_{j_\ell}}-u)\,dV_g\right|
\le\operatorname{Vol}_g(M)^{1/2}
\|u_{n_{j_\ell}}-u\|_{L^2}\longrightarrow0
$$

なので $\int_Mu\,dV_g=0$ です。

**3.** 連結成分 $M_1,M_2$ の体積を $V_1,V_2>0$ とします。$u_n=n$ on $M_1$、$u_n=-nV_1/V_2$ on $M_2$ と置けば、各成分で定数なので滑らか、$\int_Mu_n=nV_1-nV_1=0$、$\nabla_gu_n=0$ です。しかし

$$
\|u_n\|_{L^2}^2
=n^2V_1+n^2V_1^2/V_2\longrightarrow\infty.
$$

連結性がなければ勾配0の核が「全体で一つの定数」でなく「成分ごとの定数」になるため、平均零という1条件では核を消せません。
<!-- solution-end -->

## 8. 次に何ができるか

[Greenの第一公式](../GA1/index.md#thm-ga1-green-first)は滑らかな関数の恒等式でした。本章では $H^1(M)$ を構成して滑らかな関数の密度とノルム同値を証明したので、積分に現れる両辺が $H^1$ ノルムで連続な場合には、滑らかな関数の恒等式を近似によって弱形式へ拡張できます。さらに平均零部分空間では勾配だけでノルムを制御でき、[Rellichの定理](#thm-ga2-rellich)によって有界な近似列の $L^2$ 強収束を得られます。この二つが次章のPoisson方程式における解の構成を支えます。
