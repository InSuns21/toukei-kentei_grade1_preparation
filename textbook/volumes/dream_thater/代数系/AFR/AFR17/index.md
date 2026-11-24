# AFR17 GL_2の保型表現と古典形式

AFR11 では古典形式をアデール上の一つの関数に移し、AFR16 では局所の表現から大域的な空間とL因子を組み立てました。両者を接続するには、一つの関数からどのように表現を生成し、その表現から元の古典形式を取り出すのかを理解する必要があります。ここでは基礎体を有理数体、中心指標を自明、古典側をレベル1・偶数重さ $k\ge2$ に固定します。正則性の逆方向、固有形式から生成した空間が分解できない理由、局所成分への対応を順に調べます。

## 1. 古典形式を取り出す条件

[アデール上の一般線形群](../AFR11/index.md#def-afr11-adelic-gl2) を $G$、有限部分を $G_f$、$K_f=\prod_p GL_2(\mathbb Z_p)$、実側の直交群を $K_\infty=O(2)$ とします。回転と上半平面の座標行列は [実行列の座標表示](../AFR1/index.md#thm-afr1-coordinates) の規約で

$$
k_\theta=\begin{pmatrix}\cos\theta&\sin\theta\\-\sin\theta&\cos\theta\end{pmatrix},
\qquad s(z)=\begin{pmatrix}\sqrt y&x/\sqrt y\\0&1/\sqrt y\end{pmatrix}
$$

です。ここで $z=x+iy$、$y>0$ です。実行列は有限成分を単位元として $G$ に入れます。右作用は $R(h)\phi(g)=\phi(gh)$ とし、右微分は $D_X\phi(g)=\left.\frac{d}{dt}\phi(g\exp(tX))\right|_{t=0}$ とします。

[昇降作用と交換関係](../AFR12/index.md#thm-afr12-ladder) に従い

$$
H=\begin{pmatrix}1&0\\0&-1\end{pmatrix},\qquad S=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad P_-=D_H-iD_S
$$

とします。右回転で重さ $k$ の変換則を持っても、それだけでは古典側の関数は正則とは限りません。正則性を保証するのがこの微分作用素の消滅です。

<a id="thm-afr17-reconstruction"></a>

<!-- formal-statement-start -->
> **定理（最低重さ条件による古典カスプ形式の復元）**
> 偶数 $k\ge2$ とする。中心指標が自明な [大域カスプ形式](../AFR11/index.md#def-afr11-cuspidal) $\phi$ が右 $K_f$ 不変で、全ての実回転に対して

$$
R(k_\theta)\phi=e^{ik\theta}\phi,\qquad P_-\phi=0
$$

> を満たすとする。このとき

$$
f(z)=y^{-k/2}\phi((s(z),1))
$$

> は重さ $k$ のレベル1正則カスプ形式である。この対応は [レベル1正則モジュラー形式のアデール化](../AFR11/index.md#thm-afr11-classical-lift) の逆写像である。
<!-- formal-statement-end -->

### 証明の見取り図

右回転と中心の条件から実側の全ての値を上半平面の関数で表します。下げる作用素を実座標で計算すると Cauchy–Riemann 方程式が現れます。さらに緩増大条件で負の Fourier 指数を排除し、カスプ条件で定数項を消します。

<!-- proof-start -->
### 証明

まず $F(h)=\phi((h,1))$（$\det h>0$）とします。中心指標が自明なので正の実スカラー行列による移動は値を変えません。[実行列の座標表示](../AFR1/index.md#thm-afr1-coordinates) で $h=t s(z) k_\theta$、$t>0$ と分解すれば、右回転の条件より

$$
F(h)=y^{k/2}e^{ik\theta}f(z).
$$

$h\cdot i=z$、$j(h,i)=t y^{-1/2}e^{-i\theta}$、$\det h=t^2$ なのでこの式は

$$
F(h)=(\det h)^{k/2}j(h,i)^{-k}f(h\cdot i)
$$

と書けます。ここで $j(h,z)=cz+d$（$c,d$ は $h$ の下段）です。この導出ではまだ $f$ の正則性を仮定していません。

整数行列 $\gamma\in SL_2(\mathbb Z)$ は有限成分が全て整数可逆行列なので、左有理行列不変性と右 $K_f$ 不変性より $F(\gamma h)=F(h)$ です。[変換因子の積法則](../AFR1/index.md#prop-afr1-factor) を $h=s(z)$ に適用すると

$$
y^{k/2} j(\gamma,z)^{-k}f(\gamma\cdot z)=y^{k/2}f(z).
$$

従って $f(\gamma\cdot z)=j(\gamma,z)^k f(z)$ です。特に $\gamma=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ により $f(z+1)=f(z)$ です。

次に $P_-$ を計算します。$f$ は実変数 $x,y$ について滑らかです。$\exp(tH)$ は対角成分が $e^t,e^{-t}$ なので

$$
F(s(z)\exp(tH))=y^{k/2}e^{kt}f(x+i ye^{2t}).
$$

$t=0$ で微分して

$$
D_HF(s(z))=y^{k/2}(kf+2yf_y).
$$

一方 $\exp(tS)=I+tS+O(t^2)$ だから $\exp(tS)\cdot i=i+2t+O(t^2)$、$j(\exp(tS),i)=1+it+O(t^2)$ です。行列式は1です。$s(z)$ の作用が $w\mapsto x+yw$ であることから

$$
F(s(z)\exp(tS))
=y^{k/2}(1+it+O(t^2))^{-k}f(z+2yt+O(t^2)).
$$

滑らかな関数の実変数の連鎖律により

$$
D_SF(s(z))=y^{k/2}(-ikf+2yf_x).
$$

従って $P_-=D_H-iD_S$ の二つの $kf$ の項は打ち消し合い、

$$
P_-F(s(z))=2y^{k/2+1}(f_y-if_x)
=-4iy^{k/2+1}\partial_{\bar z}f.
$$

ここで $\partial_{\bar z}f=(f_x+if_y)/2$ です。$y>0$ なので $P_-\phi=0$ は $\partial_{\bar z}f=0$ を含意します。$f$ は滑らかなので、[Wirtinger判定](../../../解析系/CA/CA1/index.md#prop-ca1-wirtinger-criterion) により正則です。

周期1により $q=e^{2\pi iz}$ を座標として $0<|q|<1$ 上の正則関数 $\widetilde f(q)$ が定まります。局所的に対数で逆写像を取り、枝の違いは整数平行移動なので値は一致します。[アデール上の保型形式](../AFR11/index.md#def-afr11-automorphic-form) の緩増大条件 $|\phi(g)|\le C H(g)^M$ を、$0\le x\le1,\ y\ge1$ の $s(z)$ に適用します。$s(z)^{-1}=\begin{pmatrix}1/\sqrt y&-x/\sqrt y\\0&\sqrt y\end{pmatrix}$ なので高さは $\sqrt y$ です。よって

$$
|f(x+iy)|\le C y^{(M-k)/2}.
$$

任意の整数 $m\ge1$ に対して [Laurent展開](../../../解析系/CA/CA4/index.md#thm-ca4-laurent) を適用し、半径 $r=e^{-2\pi y}$ の円周上で係数を評価すると

$$
|a_{-m}|\le r^m\max_{|q|=r}|\widetilde f(q)|
\le C e^{-2\pi my}y^{(M-k)/2}.
$$

左辺は $y$ に依存しません。$y\to\infty$ で右辺は0になるため $a_{-m}=0$ です。従って $\widetilde f$ は原点へ正則に延長します。

[レベル1の定数項の実積分への還元](../AFR11/index.md#prop-afr11-constant-term-reduction) を $g=(s(z),1)$ に適用すると

$$
0=C_\phi(g)=y^{k/2}\int_0^1 f(z+u)\,du=y^{k/2}a_0.
$$

固定した $y$ では正則な $q$ 展開は円周上で一様絶対収束するので最後の項別積分が可能です。従って $a_0=0$。レベル1では全ての有理カスプが $\infty$ と同値です。実際、既約分数 $a/c$ は $ad-bc=1$ を満たす整数 $b,d$ を選べば行列 $\gamma$ の $\gamma\cdot\infty$ として得られます。よって $f$ はカスプ形式です。

最後に [レベル1のアデール分解](../AFR11/index.md#thm-afr11-level-one-decomposition) により右 $K_f$ 不変かつ左有理行列不変な関数は実側の制限から一意に定まります。実側の式は [アデール化](../AFR11/index.md#thm-afr11-classical-lift) と同じなので $\phi=\phi_f$ です。逆方向の条件も同定理の証明で確認済みです。
<!-- proof-end -->

例えば $\phi_\Delta$ は重さ12のモジュラー判別式の持ち上げです。$s(2i)$ での値は $2^6\Delta(2i)$ なので復元には $2^{-6}$ を掛けます。単に $\phi((s(z),1))$ を古典形式とすると余分な $y^{k/2}$ が残ります。

## 2. 固有値から古典形式の直線を決める

前節で古典形式への復元ができました。しかし同じ重さのカスプ形式は複数存在し得ます。その中のどの直線を選ぶかを有限素点の作用で指定します。重さ $k$ のレベル1カスプ形式空間を $S_k$、古典 Hecke 作用素を $T_p$ とします。

<a id="prop-afr17-eigenline"></a>

<!-- formal-statement-start -->
> **命題（素数Hecke固有値による直線の決定）**
> 偶数 $k\ge2$ と各素数の複素数 $\lambda_p$ を固定する。$f\in S_k$ が全ての素数 $p$ で $T_pf=\lambda_pf$ を満たす空間は高々1次元である。非零元の第一 Fourier 係数は零でなく、それを1に規格化した元は一意である。
<!-- formal-statement-end -->

### 証明の見取り図

素数Hecke作用を Fourier 係数で書けば、第1係数から順に全係数が決まります。固有値が同じ二つの形式は第一係数をそろえれば全ての係数が一致します。

<!-- proof-start -->
### 証明

$f(z)=\sum_{n\ge1}a_n q^n$ とします。[合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) をレベル1で用いると、$m\ge1$ に対して

$$
a_{pm}=\lambda_p a_m-p^{k-1}a_{m/p}
$$

です。ただし $p\nmid m$ なら $a_{m/p}=0$ とします。$n>1$ の素因数 $p$ を選んで $m=n/p$ とすれば、右辺の添字は $m<n$ と（整数なら）$m/p<n$ です。従って整数 $n$ に関する帰納法で、全ての係数が $a_1$ によって決まります。

特に $a_1=0$ なら順に全係数が0になり、$q$ 展開が表す関数も零です。二つの非零元 $f,g$ の第1係数を $a_1,b_1$ とすると $b_1 f-a_1 g$ は同じ固有方程式を満たし、第1係数が0です。従って $b_1 f=a_1 g$ であり、直線の主張が従います。
<!-- proof-end -->

例として $a_1=1$、$k=12$、$\lambda_2=-24$、$\lambda_3=252$ なら

$$
a_2=-24,\quad a_4=(-24)^2-2^{11}=-1472,\quad a_6=252(-24)=-6048.
$$

$a_6$ の計算では $m=2,p=3$ なので第2項は0です。固有値を並べるだけでなく、古典関数の全 Fourier 係数を再構成できるのがこの命題の意味です。なお任意の数列 $(\lambda_p)_p$ が実際の固有形式を与えるという存在主張ではありません。

## 3. 一つのカスプ形式が生成する表現

実側では [実回転の重さと K 有限ベクトル](../AFR12/index.md#def-afr12-k-type) に従い、$K_\infty$ 軌道の線形包が有限次元となるベクトルを使います。任意の実行列の右移動はこの有限性を保存するとは限りません。そこで実側は $K_\infty$ の右作用と全ての右微分 $D_X$、有限側は $G_f$ の右作用を用います。これらを備えた空間をここでは加群と呼びます。[昇降作用と交換関係](../AFR12/index.md#thm-afr12-ladder) の実側の加群構造と有限側の作用は互いに可換です。

$\mathcal A_0$ を自明な中心指標を持つ [大域カスプ形式](../AFR11/index.md#def-afr11-cuspidal) の空間とします。非零元 $\phi$ から、上の作用を有限回合成した全ての像の有限線形結合を取ります。これが $\phi$ を含む最小の作用不変部分空間、すなわち $\phi$ が生成する加群 $V_\phi$ です。作用不変部分空間が零と全体の二つしかない非零加群が既約です。

有限側の右移動がカスプ条件を保存する理由は

$$
C_{R(h)\phi}(g)=\int_{\mathbb Q\backslash\mathbb A}\phi(n(u)gh)\,du=C_\phi(gh)
$$

です。実微分でも積分と微分を交換できます。$u$ の積分領域はコンパクトな商であり、$t$ を0の近傍の閉区間に制限すれば滑らかな被積分関数の $t$ 微分は一様に有界だからです。従って $C_{D_X\phi}=D_XC_\phi=0$ です。解析的条件を含む加群全体の構造には次の外部入力を使います。

### 外部入力：カスプスペクトルの離散分解

固定されたユニタリ中心指標を持つ $GL_2(\mathbb A)$ のカスプ形式の空間は、実側の Lie 代数と最大コンパクト群、有限側の滑らかな群作用に関して既約許容加群の代数的直和になります。許容性とは、有限側のコンパクト開部分群による固定条件と実側の一つの $K_\infty$ 型を固定した部分の重複度が有限であることです。

ここで使うのは自明中心指標の場合です。カスプ Hilbert 空間の離散分解とその有限ベクトル部分の比較を含む大域解析の結果であり、本講では証明しません。出典は Getz–Hahn, *An Introduction to Automorphic Representations* (2024), Automorphic Forms および Discrete Spectrum の章（[出版社](https://link.springer.com/book/10.1007/978-3-031-41153-3)）、また固定中心指標の加群としての定式化は [Grobner–Žunar の論文](https://pmc.ncbi.nlm.nih.gov/articles/PMC11599404/) のカスプ部分の分解を参照してください。

代数的直和であるため、一つの元は有限個の成分を持ち、各成分への射影は全ての加群作用と可換です。たとえば $\mathbb C^2=\mathbb C(1,0)\oplus\mathbb C(0,1)$ に対角行列が作用するとき、各座標を取り出しても固有方程式は保たれます。次の証明では、この小模型と同じ射影操作を使います。

<a id="thm-afr17-cyclic-irreducibility"></a>

<!-- formal-statement-start -->
> **定理（固有形式の生成加群の既約性）**
> 偶数 $k\ge2$ とする。零でないレベル1正則カスプ形式 $f$ が全ての素数Hecke作用素の同時固有元なら、そのアデール化 $\phi_f$ の生成加群 $V_{\phi_f}$ は既約である（前節のカスプスペクトルの離散分解を用いる）。
<!-- formal-statement-end -->

### 証明の見取り図

離散分解の各成分へ持ち上げた関数を射影します。射影は実側の最低重さ条件と有限側の固有値を保存します。古典形式への復元と固有直線の一意性によって、非零成分はただ一つに限られます。

<!-- proof-start -->
### 証明

$f$ を $a_1=1$ に規格化し、$T_pf=a_pf$ と書きます。[素数Hecke固有値による直線の決定](#prop-afr17-eigenline) の係数式で $m=1$ と置けば固有値が $a_p$ であることが分かります。

[アデール化](../AFR11/index.md#thm-afr11-classical-lift) より $\phi_f\in\mathcal A_0$ は右 $K_f$ 固定、重さ $k$、$P_-\phi_f=0$ です。[古典Hecke作用と球Hecke作用の正規化](../AFR16/index.md#thm-afr16-hecke-normalization) により有限素点の球Hecke元 $T=1_{K_p\operatorname{diag}(p,1)K_p}$ の固有値は $\tau_p=p^{1-k/2}a_p$ です（$K_p$ の測度を1に規格化します）。

外部入力によって $\mathcal A_0=\bigoplus_j V_j$ と既約加群に分解し、射影を $E_j$ とします。$\phi_j=E_j\phi_f$ と置くと

$$
R(u)\phi_j=\phi_j\quad(u\in K_f),\qquad
R(k_\theta)\phi_j=e^{ik\theta}\phi_j,\qquad P_-\phi_j=0.
$$

例えば最後の式は $P_-E_j\phi_f=E_jP_-\phi_f=0$ です。[球Hecke作用](../AFR14/index.md#prop-afr14-action) は固定ベクトル上では有限個の右移動の和なので射影と可換です。従って $R(T)\phi_j=\tau_p\phi_j$ も成立します。

[最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) により $\phi_j=\phi_{f_j}$ と書けます。右Hecke作用の正規化を $f_j$ に適用すると

$$
p^{1-k/2}\phi_{T_pf_j}
=R(T)\phi_j=\tau_p\phi_{f_j}.
$$

アデール化は単射で $p^{1-k/2}\ne0$ です。従って $T_pf_j=a_pf_j$ です。[素数Hecke固有値による直線の決定](#prop-afr17-eigenline) から $f_j=c_j f$、ゆえに $\phi_j=c_j\phi_f$ です。

$\phi_f\ne0$ なので少なくとも一つの $\phi_j$ は非零です。その $j$ では $c_j\ne0$ であり、$\phi_f=c_j^{-1}\phi_j\in V_j$ です。直和の交わりは零なので他の全ての成分は0です。

生成加群は非零かつ $V_j$ の不変部分空間です。$V_j$ が既約であるため $V_{\phi_f}=V_j$ となります。
<!-- proof-end -->

この証明は大域的な重複度1定理を仮定していません。レベル1・正則・固定重さという条件のもとで Fourier 係数を再構成することがポイントです。大域分解そのものは外部入力です。

<a id="def-afr17-cuspidal-representation"></a>

<!-- formal-statement-start -->
> **定義（カスプ保型表現）**
> 自明な中心指標を持つ $GL_2(\mathbb A)$ の大域カスプ形式空間 $\mathcal A_0$ の非零既約部分加群、またはそれと同型な加群をカスプ保型表現という。加群の作用は実 Lie 代数、$K_\infty$ および有限アデール群 $G_f$ の作用とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr17-cuspidal-representation -->
**定義の確認**

[同時固有形式と乗法的Fourier係数](../../MF/MF5/index.md#thm-mf5-eigenforms) で扱った正規化固有カスプ形式 $\Delta$（重さ12、レベル1）のアデール化は第1係数が1なので非零です。[アデール化](../AFR11/index.md#thm-afr11-classical-lift) は自明な中心指標と大域カスプ条件を保証します。その生成加群は作用不変な部分空間であり、[固有形式の生成加群の既約性](#thm-afr17-cyclic-irreducibility) により非零の真の不変部分空間を持ちません。従って定義の全条件を満たします。
<!-- definition-example-end -->

一つの関数と、それが生成する表現は異なります。たとえば右微分で重さ14の非零元が $\phi_\Delta$ から生じます。右回転の固有値が異なるため、それは $\phi_\Delta$ のスカラー倍ではありません。

## 4. 一つの表現から局所成分と古典形式を読む

<a id="ref-afr17-flath"></a>

### 外部入力：Flath のテンソル積定理

Flath のテンソル積定理は、アデール群の既約許容加群を実側の既約許容加群と有限側の既約滑らかな許容表現の制限テンソル積に分解します。ここで有限側の許容性は [p進表現の許容性](../AFR13/index.md#def-afr13-admissible) の意味です。本講で必要なのは有理数体上の $GL_2$ の場合で、全ての有限素点を同一視したり、無限積を完成 Hilbert テンソル積とみなしたりはしません。

出典は Getz–Hahn, *An Introduction to Automorphic Representations* (2024), Tensor Product Theorem および Automorphic Forms の章（[出版社](https://link.springer.com/book/10.1007/978-3-031-41153-3)）です。Flath の定理自体は外部入力とし、以下では実際に得られるベクトル、重さ、固有値を計算します。

<a id="thm-afr17-local-data"></a>

<!-- formal-statement-start -->
> **定理（レベル1固有形式の局所データ）**
> $f=\sum_{n\ge1}a_nq^n$ を偶数重さ $k\ge2$ の正規化レベル1同時Hecke固有カスプ形式とし、$\pi_f=V_{\phi_f}$ とする。[Flath のテンソル積定理](#ref-afr17-flath) を用いると

$$
\pi_f\simeq\pi_\infty\otimes\bigotimes_p'\pi_p
$$

> であり、各有限素点の $K_p$ 固定空間は1次元である。実側では重さ $k$ で $P_-$ に消される直線が存在し、$\phi_f$ はその直線と全有限球固定直線のテンソル積に対応する。各有限素点の標準局所L因子は

$$
L_p(s,\pi_p)=\frac{1}{1-a_pp^{-(k-1)/2}p^{-s}+p^{-2s}}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

全有限素点における固定性を各局所成分の固定性へ移します。実側では昇降作用で最低重さの列を決めます。最後に古典Hecke固有値を局所の球Hecke固有値へ換算します。

<!-- proof-start -->
### 証明

[固有形式の生成加群の既約性](#thm-afr17-cyclic-irreducibility) と外部のカスプ分解から $\pi_f$ は既約許容加群です。従って [Flath のテンソル積定理](#ref-afr17-flath) を適用できます。[制限テンソル積](../AFR16/index.md#def-afr16-restricted-tensor) の意味で、$\phi_f$ に対応する元はある有限集合 $S$ 内だけ基準ベクトルを変えた純テンソルの有限和として表せます。$S$ は基準ベクトルが $K_p$ 固定とは限らない有限個の例外素点も含むように取ります。

任意の $p\in S$ について $K_p$ で平均します。局所ベクトルは滑らかなので開部分群で固定され、コンパクトな $K_p$ 内の剰余類は有限個です。従って平均は有限和であり、作用後は $K_p$ 固定空間に入ります。もとの $\phi_f$ は $K_p$ 固定なので平均しても変化しません。もし $\pi_p^{K_p}=0$ なら平均は零になり矛盾します。$p\notin S$ の基準元は既に非零の固定ベクトルです。

従って全ての $p$ で $\pi_p^{K_p}\ne0$ です。[既約許容表現の球固定直線](../AFR14/index.md#prop-afr14-spherical-line) を適用すると各空間は1次元です。各 $p$ で非零元 $e_p$ を取れば全有限平均後の元は

$$
v_\infty\otimes\bigotimes_p e_p,\qquad v_\infty\ne0
$$

の形になります。有限個の変更は各直線内のスカラーだけなので、それを実側へ吸収できます。

実側の $v_\infty$ は重さ $k$ で $P_-v_\infty=0$ です。$P_+=D_H+iD_S$、$T=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とします。[昇降作用と交換関係](../AFR12/index.md#thm-afr12-ladder) で $v_n=P_+^n v_\infty$ と置けば

$$
D_Tv_n=i(k+2n)v_n,\qquad
P_-v_n=-4n(k+n-1)v_{n-1}\quad(n\ge1).
$$

実際 $P_-P_+=P_+P_-+4iD_T$ なので $n=1$ では係数 $-4k$、$n$ から $n+1$ へは $-4(k+2n)$ を加えて $-4(n+1)(k+n)$ になります。$k\ge2$ で係数は非零だから帰納的に全ての $v_n$ は非零です。重さが異なるので独立です。

反射 $r=\operatorname{diag}(1,-1)$ による共役を計算すると

$$
rHr^{-1}=H,\qquad rSr^{-1}=-S,\qquad rTr^{-1}=-T.
$$

従って $r v_n$ は重さ $-k-2n$ を持ち、$P_+$ と $P_-$ が入れ替わった列を作ります。

正と負の二つの列の線形包は $P_\pm,D_T,D_I$（中心方向は0）、回転と反射で不変です。これらが実 Lie 代数と $K_\infty$ の作用を生成します。$\pi_\infty$ は既約なので、この非零の線形包は $\pi_\infty$ 全体です。

重さ $k$ の元は $v_0$ のスカラー倍に限られるため、その直線が一意です。正の列は [円板模型のユニタリ性と離散系列](../AFR12/index.md#thm-afr12-discrete) に対応する最低重さ加群です。

各有限素点の固有値は [古典Hecke作用と球Hecke作用の正規化](../AFR16/index.md#thm-afr16-hecke-normalization) より $\tau_p=p^{1-k/2}a_p$、中心の球Hecke元の固有値は1です。[Hecke固有値からのEuler因子復元](../AFR14/index.md#thm-afr14-euler-recovery) に代入すると Satake パラメータ $\alpha_p,\beta_p$ の和と積は

$$
\alpha_p+\beta_p=p^{-1/2}\tau_p=p^{-(k-1)/2}a_p,\qquad
\alpha_p\beta_p=1.
$$

従って [GL_2の不分岐局所L因子](../AFR14/index.md#def-afr14-local-l-factor) の分母を展開すると主張の式が得られます。
<!-- proof-end -->

[古典Euler積との一致](../AFR16/index.md#thm-afr16-classical-euler-match) により有限L関数は古典変数 $t=s+(k-1)/2$ の $L(f,t)$ と $\operatorname{Re}s>3/2$ で一致します。これは絶対収束域での主張です。例えば $\Delta$ では $p=2$ の固有値は $2^{1-12/2}(-24)=-3/4$、和は $-24/2^{11/2}$、積は1です。

逆に、自明中心指標のカスプ保型表現が全有限素点で球固定直線と実側の正の最低重さ $k$ の直線を持つとします（ここでは偶数 $k\ge2$）。その純テンソルをカスプ形式空間へ埋め込めば [最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) を適用できます。有限側の各球Hecke作用は1次元の固定空間を保つのでスカラー作用となり、[古典Hecke作用と球Hecke作用の正規化](../AFR16/index.md#thm-afr16-hecke-normalization) により復元された古典形式は全素数の同時固有元です。[素数Hecke固有値による直線の決定](#prop-afr17-eigenline) で第1係数は非零なのでそれを1にできます。埋め込みの取り方を変えても局所Hecke固有値と重さは変わらず、同じ正規化形式に戻ります。

一般レベルでは $K_p$ をより小さなレベル部分群に替えます。[局所レベルの積](../AFR16/index.md#prop-afr16-level-product) は局所の新ベクトルの固定条件を大域レベルにまとめます。しかし小さな部分群の固定空間は必ずしも1次元ではありません。古典的な旧形式の混入、中心指標の非自明性、全レベルの新形式対応や強重複度1の証明は、レベル1のこの議論とは区別します。

## 5. 演習と詳細解答

<a id="ex-afr17-a1"></a>

### A1. 古典関数の値の復元

重さ8の持ち上げ $\phi$ が $\phi((s(4i),1))=256c$ を満たす。古典関数 $f(4i)$ と、$\phi((s(4i)k_{\pi/8},1))$ を求めよ。

- Level: A
- ID: AFR17-A1

<!-- solution-start -->
**詳細解答**

[最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) で $y=4,k=8$ とすると $f(4i)=4^{-4}256c=c$ です。右回転の変換係数は $e^{8i\pi/8}=-1$ なので、回転後の値は $-256c$ です。復元の高さ因子と回転因子は別々に作用します。
<!-- solution-end -->

<a id="ex-afr17-a2"></a>

### A2. 第一係数の規格化

重さ12のレベル1カスプ形式 $g$ が全素数でHecke固有元であり、第1係数が3、固有値が $\lambda_2=-24$、$\lambda_3=252$ であるとする。$g$ の第2、第3、第6係数を求め、正規化した場合の第6係数を求めよ。

- Level: A
- ID: AFR17-A2

<!-- solution-start -->
**詳細解答**

[合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) を $m=1$ で使えば $b_2=\lambda_2 b_1=-72$、$b_3=\lambda_3 b_1=756$ です。$p=3,m=2$ では $3\nmid2$ なので第2項はなく

$$
b_6=\lambda_3 b_2=252(-72)=-18144.
$$

第1係数を1にするには $g/3$ を取るため、その第6係数は $-6048$ です。
<!-- solution-end -->

<a id="ex-afr17-a3"></a>

### A3. 下げる微分の判定

$F(s(z))=y^{k/2}f(z)$ を右回転で重さ $k$ に、正の実スカラーについて不変となるように延長する。$f(z)=\bar z$ と $f(z)=z^2$ について $P_-F(s(z))$ を求めよ（左整数行列不変性は仮定しない）。

- Level: A
- ID: AFR17-A3

<!-- solution-start -->
**詳細解答**

[最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) の微分計算は実側の中心・回転による延長式だけを使います。従って $P_-F=-4iy^{k/2+1}\partial_{\bar z}f$ です。

$\bar z=x-iy$ なら $f_x=1,f_y=-i$ で $\partial_{\bar z}f=(1+i(-i))/2=1$。よって $P_-F=-4iy^{k/2+1}$ です。

$z^2$ なら $f_x=2z,f_y=2iz$ で $\partial_{\bar z}f=(2z+i(2iz))/2=0$。従って $P_-F=0$ です。微分条件は正則性の判定であって、整数行列による変換則まで保証するものではありません。
<!-- solution-end -->

<a id="ex-afr17-a4"></a>

### A4. 球Hecke固有値の換算

重さ12で $a_3=252$ とする。有限素点3の球Hecke固有値と正規化された局所L因子を求めよ。

- Level: A
- ID: AFR17-A4

<!-- solution-start -->
**詳細解答**

[古典Hecke作用と球Hecke作用の正規化](../AFR16/index.md#thm-afr16-hecke-normalization) に $p=3,k=12$ を代入すると

$$
\tau_3=3^{-5}252=28/27.
$$

[レベル1固有形式の局所データ](#thm-afr17-local-data) により $\alpha_3+\beta_3=3^{-1/2}\tau_3=252/3^{11/2}$、積は1です。従って局所因子は

$$
L_3(s)=\left(1-\frac{252}{3^{11/2}}3^{-s}+3^{-2s}\right)^{-1}.
$$
<!-- solution-end -->

<a id="ex-afr17-b1"></a>

### B1. 緩増大条件と負の指数

周期1の正則関数 $f$ が $0\le x\le1,y\ge1$ で $|f(x+iy)|\le C y^5$ を満たすとする。[Laurent展開](../../../解析系/CA/CA4/index.md#thm-ca4-laurent) を用いて、係数を円周積分で評価し、負の指数 $q^{-2}$ の係数が零であることを示せ。カスプ条件はこの情報だけで従うか。

- Level: B
- ID: AFR17-B1

<!-- solution-start -->
**詳細解答**

周期性により $f$ は $q=e^{2\pi iz}$ の穿孔円板上の正則関数 $\widetilde f$ を与えます。[Laurent展開](../../../解析系/CA/CA4/index.md#thm-ca4-laurent) を適用すると、係数は次の積分で与えられます。

$$
a_{-2}=\frac{1}{2\pi i}\oint_{|q|=r}\widetilde f(q)q\,dq.
$$

$r=e^{-2\pi y}$ とすると円周長は $2\pi r$ なので

$$
|a_{-2}|\le (2\pi)^{-1}(2\pi r)Cy^5 r
=C y^5e^{-4\pi y}\to0.
$$

従って $a_{-2}=0$ です。[最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) の負の指数の排除と同じ仕組みです。定数項には $r^0=1$ しか現れず、この議論では消滅しません。例えば $f=1$ は増大条件を満たすが定数項は1です。カスプ条件には別途定数項の消滅が必要です。
<!-- solution-end -->

<a id="ex-afr17-b2"></a>

### B2. 固有直線と射影

二つのレベル1の重さ $k$ のカスプ形式 $f,g$ が全素数で同じ Hecke 固有値を持ち、第1係数がそれぞれ2と5であるとする。$5f-2g$ の全係数が零になることを帰納的に示せ。さらに $\phi_f$ の既約直和分解の成分が $\phi_g$ の非零倍だったなら、$\phi_f$ はその成分の加群に入ることを示せ。

- Level: B
- ID: AFR17-B2

<!-- solution-start -->
**詳細解答**

$h=5f-2g$ は線形性により同じ固有方程式を満たし、第1係数は $5\cdot2-2\cdot5=0$ です。$h$ の係数を $c_n$ とすれば [合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) により

$$
c_n=\lambda_p c_{n/p}-p^{k-1}c_{n/p^2}\qquad(p\mid n,\ n>1).
$$

非整数の添字は0です。右辺の整数添字は全て $n$ より小さいので、$c_1=0$ から帰納的に $c_n=0$ になります。従って $g=(5/2)f$ です。

射影 $E_j\phi_f=c\phi_g$（$c\ne0$）が直和成分 $V_j$ にあるなら、線形なアデール化より $E_j\phi_f=(5c/2)\phi_f$ です。非零スカラーで割れば $\phi_f\in V_j$ です。[固有形式の生成加群の既約性](#thm-afr17-cyclic-irreducibility) で非零成分が一つに限定された理由です。
<!-- solution-end -->

<a id="ex-afr17-b3"></a>

### B3. 実側の重さの列

重さ12の非零最低重さベクトル $v_0$ に対して $v_1=P_+v_0,v_2=P_+v_1$ と置く。$P_-v_1,P_-v_2$ と $v_2$ の重さを求め、$v_2\ne0$ を示せ。

- Level: B
- ID: AFR17-B3

<!-- solution-start -->
**詳細解答**

[昇降作用と交換関係](../AFR12/index.md#thm-afr12-ladder) より $P_-P_+=P_+P_-+4iD_T$ です。$P_-v_0=0$、$D_Tv_0=12iv_0$ なので

$$
P_-v_1=4i(12i)v_0=-48v_0.
$$

右辺が非零なので $v_1\ne0$、重さは14です。さらに

$$
P_-v_2=P_+(-48v_0)+4i(14i)v_1=-104v_1.
$$

これも非零なので $v_2\ne0$ です。重さは $14+2=16$。係数は [レベル1固有形式の局所データ](#thm-afr17-local-data) で導いた $-4n(k+n-1)$ に $n=2,k=12$ を代入した $-104$ と一致します。
<!-- solution-end -->

<a id="ex-afr17-c1"></a>

### C1. 局所成分から古典係数と実側の条件を復元する

自明中心指標のレベル1カスプ保型表現に重さ12の最低重さ直線があり、全有限素点で球固定直線を持つとする。素点2、3の球Hecke固有値がそれぞれ $-3/4,28/27$ である。埋め込みから得る正規化古典形式の $a_2,a_3,a_4,a_6,a_9$ を求め、素点2の古典変数での局所因子を書け。さらに重さ14のベクトルを同じ方法で正則形式へ戻せない理由を示せ。

- Level: C
- ID: AFR17-C1

<!-- solution-start -->
**詳細解答**

実側の最低重さベクトルと有限球固定ベクトルの純テンソルをカスプ形式へ埋め込みます。[最低重さ条件による古典カスプ形式の復元](#thm-afr17-reconstruction) により重さ12の古典カスプ形式が得られ、[古典Hecke作用と球Hecke作用の正規化](../AFR16/index.md#thm-afr16-hecke-normalization) により全素数の同時固有元です。[素数Hecke固有値による直線の決定](#prop-afr17-eigenline) で第1係数は零でないので1へ規格化できます。

正規化の逆は $a_p=p^{k/2-1}\tau_p$ です。$k/2-1=5$ なので

$$
a_2=32(-3/4)=-24,\qquad a_3=243(28/27)=252.
$$

[合同部分群上の素数作用素の係数](../../MF/MF5/index.md#prop-mf5-level-q) を $m=p$ に適用して $a_{p^2}=a_p^2-p^{11}$、$p=3,m=2$ では $a_6=a_3a_2$ です。従って

$$
a_4=576-2048=-1472,\qquad a_6=-6048,
$$

$$
a_9=63504-177147=-113643.
$$

[レベル1固有形式の局所データ](#thm-afr17-local-data) で $t=s+11/2$ と置くと $a_2 2^{-11/2}2^{-s}=a_2 2^{-t}$、$2^{-2s}=2^{11}2^{-2t}$ なので、素点2の因子は

$$
(1+24\cdot2^{-t}+2048\cdot2^{-2t})^{-1}.
$$

一方、重さ14の元 $v_1=P_+v_0$ は [昇降作用と交換関係](../AFR12/index.md#thm-afr12-ladder) により $P_-v_1=4i(12i)v_0=-48v_0\ne0$ です。従って重さ14という回転の条件は満たしますが、復元定理で必要な正則性の条件を失っています。もし高さ因子を取り除いた関数が正則なら、復元定理の証明の微分式と回転・中心による延長から $P_-v_1=0$ となるはずで矛盾します。有限素点の固有値が同じでも、実側のベクトルの選択が古典関数の正則性を左右します。
<!-- solution-end -->

## 6. 次講への接続

一つの古典的固有形式を大域カスプ表現として生成し、実側の最低重さと有限側の球固定直線から元の形式を戻しました。局所成分の積と古典L関数の関係も確認しました。次の AFR18 では二つの保型形式を組み合わせる Rankin–Selberg 積分を扱い、各素点に現れる積L因子を調べます。
