# AQFT7 quasifree状態と二点形式

[AQFT6の局所Weyl C*net](../AQFT6/index.md#def-aqft6-local-weyl-net)では、実シンプレクティック空間 $(\mathcal V,\sigma)$ の各元 $F$ に有界なユニタリ $W(F)$ を対応させました。積は
$$
W(F)W(G)=e^{-i\sigma(F,G)/2}W(F+G),\qquad W(F)^*=W(-F)
$$
です。しかしこれだけでは、[AQFT3で区別した状態と真空](../AQFT3/index.md#def-aqft3-vacuum)のうち、どの状態を選ぶべきか決まりません。実際、AQFT6の離散表示は規則的ですらありません。

この講では「各 $W(F)$ の期待値をGaussian型の式で指定できるか」を出発点にします。単に指数関数が正であるだけでは不十分です。**非可換なWeyl元の線形結合 $A$ について $\omega(A^*A)\ge0$ が必要**であり、その制約に古典的な交代形式 $\sigma$ が現れます。二点形式から不確定性条件を導き、逆にその条件から状態・規則的GNS表現を構成します。次講でMinkowski真空を選ぶための一般的な準備です。

## 1. 入力と実共分散

舞台は四次元Minkowski時空、計量 $(-,+,+,+)$、質量 $m\ge0$ の実Klein–Gordon場です。[AQFT5のシンプレクティック形式](../AQFT5/index.md#def-aqft5-causal-symplectic)を使い、
$$
\mathcal V=C_c^\infty(M,\mathbb R)/PC_c^\infty(M,\mathbb R),\qquad
P=-\Box_g+m^2,\qquad
\sigma([f],[g])=-\int_M f(Eg)\,d^4x
$$
と固定します。ここで $E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$、$\sigma$ は実双線形・交代・非退化です。$W(F)$ は[AQFT6で構成した具体的なユニタリ](../AQFT6/index.md#prop-aqft6-twisted-translation) $L(F)$ を表す略記とし、$\mathfrak A_{\mathrm W}=C^*(\{W(F)\})\subset B(\ell^2(\mathcal V))$ の**ノルム**を用います。

[状態](../../OA/OA5/index.md#def-oa5-state)は、$\omega(1)=1$ かつ任意の $A$ に対し $\omega(A^*A)\ge0$ を満たす線形汎関数です。実対称双線形形式 $\mu(F,G)$ は、対角値 $\mu(F,F)\ge0$ のとき非負といいます。$\mu$ は場の揺らぎの対称部分を記録し、$\sigma$ は既に固定された交換関係を記録します。

一つの方向 $F$ だけ見れば $t\mapsto e^{-t^2\mu(F,F)/2}$ はGaussianの特性関数に見えます。しかし $F$ と $G$ のWeyl元は一般に可換でないため、一方向ごとの検査だけでは状態になりません。

<a id="def-aqft7-covariance"></a>

<!-- formal-statement-start -->
> **定義（実共分散と不確定性条件）**  
> 実交代双線形空間 $(\mathcal V,\sigma)$ 上の実対称双線形形式 $\mu$ が、任意の $F,G\in\mathcal V$ について
$$
\mu(F,F)\ge0,\qquad
|\sigma(F,G)|^2\le4\mu(F,F)\mu(G,G)
$$
> を満たすとき、$\mu$ を本講で用いる許容共分散という。この二条件を合わせて不確定性条件と呼ぶ。
<!-- formal-statement-end -->

二番目は二つの**異なる方向の組**をすべて検査する条件です。$\sigma$ が非退化なので、もし $\mu(F,F)=0$ ならすべての $G$ について $\sigma(F,G)=0$、従って $F=0$ です。すなわち今回の $\mathcal V$ では、許容共分散は実際には正定値です。ただし無限次元でも、$\mu$ と $\sigma$ を有限次元の一つの行列式だけで判定したわけではありません。

<!-- definition-example-start: def-aqft7-covariance -->
### 直接例：位置・運動量の二方向

**定義の確認**。$V_0=\mathbb R^2$ の $F=(q,p)$、$G=(q',p')$ に
$$
\sigma_0(F,G)=qp'-pq',\qquad
\mu_{a,b}(F,G)=aqq'+bpp'\quad(a,b>0)
$$
を定めます。この対称形式が正定値なのは $a,b>0$ によります。$\sigma_0$ は行列 $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ で表されますが、これだけで不確定性条件を検査済みとはしません。

$F=(q,p)$、$G=(q',p')$ とすると
$$
|\sigma_0(F,G)|^2=(qp'-pq')^2
\le\left(\frac{q^2}{b}+\frac{p^2}{a}\right)
\left(bp'^2+aq'^2\right)
=\frac{\mu_{a,b}(F,F)}{ab}\mu_{a,b}(G,G).
$$
ここで中央は二次元のCauchy–Schwarz不等式で、最後の等号は $q^2/b+p^2/a=(aq^2+bp^2)/(ab)$ です。よって $ab\ge1/4$ なら全ての組が条件を満たします。逆に $F=(1,0),G=(0,1)$ を入れると $1\le4ab$ が必要です。したがって**必要十分条件は $ab\ge1/4$**。$a=b=1/2$ は境界上の例、$a=b=1/4$ は対角値が正でも失敗する反例です。
<!-- definition-example-end -->

## 2. 複素二点形式と正値性の同値

対称な実数値 $\mu$ に交換関係の虚部を付け、実空間の二元から複素数を作ります。添字の順序が物理的に重要です。

<a id="def-aqft7-two-point-form"></a>

<!-- formal-statement-start -->
> **定義（CCRと整合する二点形式）**  
> 実対称双線形形式 $\mu$ と実交代双線形形式 $\sigma$ に対し、$F,G\in\mathcal V$ に
$$
\Lambda(F,G)=\mu(F,G)+\frac{i}{2}\sigma(F,G)
$$
> を対応させる。これを二点形式という。$\Lambda(G,F)=\overline{\Lambda(F,G)}$ であり、差 $\Lambda(F,G)-\Lambda(G,F)=i\sigma(F,G)$ はCCRの反対称部である。正値性は、任意の有限個の $F_j$ と複素数 $z_j$ について
$$
\sum_{j,k=1}^n\overline{z_j}z_k\,\Lambda(F_j,F_k)\ge0
$$
> が成立することを意味する。
<!-- formal-statement-end -->

$\mu$ が実対称で $\sigma$ が実交代だから、複素共役で引数が入れ替わります。複素係数 $z_j$ の検査を落として実係数だけで済ませると、$\sigma$ の情報が消えます。

<!-- definition-example-start: def-aqft7-two-point-form -->
### 直接例：境界共分散のHermitian行列

先ほどの $\mu_{a,b}$ を基底 $e_q=(1,0),e_p=(0,1)$ で表示します。$\mu(e_q,e_p)=0$、$\sigma(e_q,e_p)=1$ なので
$$
[\Lambda]_{(e_q,e_p)}
=\begin{pmatrix}a&i/2\\-i/2&b\end{pmatrix}.
$$
任意の $z=(z_1,z_2)^T$ に $z^*[\Lambda]z$ を計算します。$a=b=1/2$ の場合、行列の固有値は $0,1$（跡 $1$、行列式 $0$）なので半正定値です。$a=b=1/4$ の場合は固有値 $-1/4,3/4$ で、負方向が実際に存在します。これは**単なる $\mu$ の正値性と $\Lambda$ の複素正値性が異なる**ことを示しています。
<!-- definition-example-end -->

<a id="prop-aqft7-uncertainty-equivalence"></a>

<!-- formal-statement-start -->
> **命題（不確定性条件と二点形式の同値）**  
> 実交代双線形形式 $\sigma$ と実対称双線形形式 $\mu$ について、次は同値である。
>
> 1. $\mu(F,F)\ge0$ かつ $|\sigma(F,G)|^2\le4\mu(F,F)\mu(G,G)$ がすべての実 $F,G$ に成立する。
> 2. $\Lambda=\mu+i\sigma/2$ は上記の意味で複素正値である。
>
> とくに許容共分散は、各有限個の試験元に対して正のHermitian Gram行列を与える。
<!-- formal-statement-end -->

### 証明の見取り図

複素係数を $z_j=a_j+ib_j$ と分けて実ベクトルを二つ作ります。逆方向は二元のGram行列の行列式を検査します。

<!-- proof-start -->
### 証明

(1) $\Rightarrow$ (2)。有限和 $X=\sum a_jF_j$、$Y=\sum b_jF_j$ と置きます。$\Lambda$ を複素線形に拡張して、第一引数を複素共役線形にすると
$$
\begin{aligned}
\sum_{j,k}\overline{z_j}z_k\Lambda(F_j,F_k)
&=\Lambda(X+iY,X+iY)\\
&=\mu(X,X)+\mu(Y,Y)-\sigma(X,Y).
\end{aligned}
$$
中間式では $\mu(X,Y)=\mu(Y,X)$ が打ち消され、$\sigma(Y,X)=-\sigma(X,Y)$ が残ります。不確定性条件と算術幾何平均不等式より
$$
|\sigma(X,Y)|
\le2\sqrt{\mu(X,X)\mu(Y,Y)}
\le\mu(X,X)+\mu(Y,Y).
$$
よって右辺は非負です。

(2) $\Rightarrow$ (1)。$n=1$ の検査から $\mu(F,F)=\Lambda(F,F)\ge0$。$F,G$ の二元について複素正値なHermitian行列
$$
\begin{pmatrix}
\mu(F,F)&\mu(F,G)+i\sigma(F,G)/2\\
\mu(F,G)-i\sigma(F,G)/2&\mu(G,G)
\end{pmatrix}
$$
の行列式は非負だから
$$
\mu(F,F)\mu(G,G)-\mu(F,G)^2-\frac{\sigma(F,G)^2}{4}\ge0.
$$
$\mu(F,G)^2\ge0$ を右辺へ移して捨てれば要求した不確定性条件が得られます。ここでは、二元の複素Gram行列が正であることから行列式の非負性を使いました。逆向きには、全ての複素係数を扱うため $X,Y$ の置き方が必要でした。
<!-- proof-end -->

より強い見かけの式
$$
\mu(F,F)\mu(G,G)-\mu(F,G)^2\ge\frac{\sigma(F,G)^2}{4}
$$
も全組について従います。これは上記命題の (2) から直接得られる不確定性関係です。「$\sigma=0$ なら状態になる」という逆向きの推論は誤りです。$\sigma=0$ でも $\mu$ の非負性が必要です。

## 3. Gaussian型特性汎関数から状態を構成する

各 $F$ に割り当てる候補値を
$$
\chi_\mu(F)=\exp\left(-\frac12\mu(F,F)\right)
$$
とします。指数は実数で $0<\chi_\mu(F)\le1$ ですが、各値がこの範囲にあるだけで線形汎関数の正値性は保証されません。**積に入るWeyl位相**を組み込む必要があります。

<a id="thm-aqft7-quasifree-state"></a>

<!-- formal-statement-start -->
> **定理（許容共分散からのGaussian Weyl状態）**  
> $(\mathcal V,\sigma)$ を実交代双線形空間とし、$W(F)$ を[AQFT6の離散twisted translation表示](../AQFT6/index.md#prop-aqft6-twisted-translation)によるユニタリとする。$\mu$ が許容共分散なら、具体的な単位的C*環 $\mathfrak A_{\mathrm W}=C^*(\{W(F):F\in\mathcal V\})$ 上に**ただ一つの状態** $\omega_\mu$ が存在して
$$
\omega_\mu(W(F))=\exp\left(-\frac12\mu(F,F)\right)
\qquad(F\in\mathcal V)
$$
> を満たす。逆に、実対称双線形 $\mu$ に対するこの形の状態が存在すれば $\mu$ は許容共分散である。
<!-- formal-statement-end -->

この定理の核心には二段あります。まずWeyl元の**有限線形結合**で正値性を証明し、次に有限結合から具体的なC*ノルム閉包へ延長します。後者は群代数の普遍性を言うだけでは済みません。

### 証明の見取り図

$A=\sum_jc_jW(F_j)$ に対する $\omega(A^*A)$ は、二点形式 $\Lambda$ のGram行列の成分ごとの指数から得られます。指数の正値性はテンソル冪のGram行列で確認します。最後に、Weyl関係を満たす任意のユニタリ表示の作用素ノルムが、AQFT6の離散正則表示のノルム以下であることを有限集合の平均で示します。

<!-- proof-start -->
### 証明

**1. 有限線形結合の正値性。** AQFT6の $W(F)\delta_0=\delta_F$ より、異なる $F$ の $W(F)$ は有限線形独立です。したがって
$$
\omega_0\left(\sum_jc_jW(F_j)\right)
:=\sum_jc_j\chi_\mu(F_j)
$$
は代数的線形包 $\mathfrak A_0=\operatorname{span}\{W(F)\}$ 上でwell-definedです。Weyl積により $\mathfrak A_0$ は単位的 *-代数です。

$A=\sum_jc_jW(F_j)$ とおき、[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)を $W(-F_j)W(F_k)$ に適用すると
$$
\begin{aligned}
\omega_0(A^*A)
&=\sum_{j,k}\overline{c_j}c_k\,
  e^{i\sigma(F_j,F_k)/2}
  e^{-\mu(F_k-F_j,F_k-F_j)/2}\\
&=\sum_{j,k}\overline{d_j}d_k\,
  \exp\left(\mu(F_j,F_k)+\frac{i}{2}\sigma(F_j,F_k)\right),\\
d_j&:=c_je^{-\mu(F_j,F_j)/2}.
\end{aligned}
$$
二行目は $\mu(F_k-F_j,F_k-F_j)=\mu(F_j,F_j)+\mu(F_k,F_k)-2\mu(F_j,F_k)$ から従います。[直前の同値命題](#prop-aqft7-uncertainty-equivalence)により行列 $H_{jk}=\Lambda(F_j,F_k)$ は半正定値です。半正定値な有限行列はGram表示 $H_{jk}=\langle v_j,v_k\rangle$ を持ちます。成分ごとの $n$ 乗 $H_{jk}^n$ は、$v_j^{\otimes n}$ のGram行列なので半正定値です（$n=0$ は全成分が $1$ の行列）。従って
$$
\sum_{j,k}\overline{d_j}d_k e^{H_{jk}}
=\lim_{N\to\infty}\sum_{n=0}^N\frac1{n!}
 \sum_{j,k}\overline{d_j}d_kH_{jk}^n
\ge0.
$$
有限個の成分なので指数級数の極限と有限和の交換は正当です。ゆえに $\omega_0(A^*A)\ge0$、また $\omega_0(1)=\chi_\mu(0)=1$。

**2. C*ノルムへの延長。** 先の正値形式から[OA5のGNS構成](../../OA/OA5/index.md#thm-oa5-gns)と同じ商・完備化手順を代数的 *-代数 $\mathfrak A_0$ に適用します。左乗算 $U(F)[A]=[W(F)A]$ について、$\omega_0((W(F)A)^*W(F)A)=\omega_0(A^*A)$ なので、零ノルムの類を零ノルムの類へ写し、商上でwell-definedな等長写像となります。逆写像は $U(-F)$ だからユニタリへ延長され、Weyl関係も保ちます。$\|U(F)\|=1$ から各有限和 $U(A)=\sum_Fa_FU(F)$ も有界です。得られる巡回ベクトルを $\Omega$ とすると $\omega_0(A)=\langle\Omega,U(A)\Omega\rangle$ です。

ここで **$\|U(A)\|\le\|A\|_{B(\ell^2(\mathcal V))}$** を示します。$A$ に現れる有限個の $F$ が生成する加法部分群 $H$ は有限生成・ねじれなしの可換群だから $H\cong\mathbb Z^r$ です。整数基底を選び、その立方体
$$
S_N=\left\{\sum_{\nu=1}^r n_\nu h_\nu:|n_\nu|\le N\right\}
$$
を考えます。$F\in H$ を固定すると、境界部分だけが移動して
$$
\frac{|(S_N+F)\triangle S_N|}{|S_N|}\longrightarrow0
$$
です（各座標で両端から固定個数の点だけが外れ、体積は $(2N+1)^r$）。

任意のユニタリWeyl表示 $U$ とそのHilbert空間のベクトル $\xi$ に対して、補助写像を
$$
J_N\xi=|S_N|^{-1/2}\sum_{h\in S_N}\delta_h\otimes U(h)^*\xi
$$
と定めます。基底の直交性とユニタリ性から $\|J_N\xi\|=\|\xi\|$。$F\in H$ に対し、共通の座標 $F+h\in(S_N+F)\cap S_N$ では
$$
\begin{aligned}
(W(F)\otimes I)(\delta_h\otimes U(h)^*\xi)
&=e^{-i\sigma(F,h)/2}\delta_{F+h}\otimes U(h)^*\xi,\\
U(F+h)^*U(F)\xi
&=e^{-i\sigma(F,h)/2}U(h)^*\xi.
\end{aligned}
$$
二行目は $U(F)U(h)=e^{-i\sigma(F,h)/2}U(F+h)$ の随伴を取って得ます。ずれるのは対称差の座標だけなので
$$
\|(W(F)\otimes I)J_N\xi-J_NU(F)\xi\|
\le\sqrt{\frac{|(S_N+F)\triangle S_N|}{|S_N|}}\|\xi\|\to0.
$$
$A=\sum_{F\in K}a_FW(F)$ の有限集合 $K\subset H$ に対して三角不等式を使えば
$$
\|U(A)\xi\|
=\lim_N\|J_NU(A)\xi\|
\le\|A\|_{B(\ell^2(\mathcal V))}\|\xi\|.
$$
ここで $(W(A)\otimes I)$ と書かず $A\otimes I$ を用い、$\|A\otimes I\|=\|A\|$ を使いました。従って
$$
|\omega_0(A)|\le\|U(A)\|\le\|A\|,\qquad A\in\mathfrak A_0.
$$
よって $\omega_0$ は$\mathfrak A_{\mathrm W}$ への唯一の連続線形延長 $\omega_\mu$ を持ちます。もし $A_n\to A$ なら $A_n^*A_n\to A^*A$ なので正値性が極限で保存され、規格化も保存されます。[OA5の状態の定義](../../OA/OA5/index.md#def-oa5-state)を満たし、線形包がノルム稠密なので一意です。

**3. 必要性。** 逆にこの形の状態が存在するとします。任意の実 $F_j$ と複素 $z_j$ に対して $B_t=\sum_j z_j(W(tF_j)-1)$ を作ります。$\omega(B_t^*B_t)\ge0$（$t\ne0$）です。Weyl積を代入すると
$$
\begin{aligned}
&t^{-2}\omega\big((W(tF_j)-1)^*(W(tF_k)-1)\big)\\
&\quad=t^{-2}\left[
e^{it^2\sigma(F_j,F_k)/2}
e^{-t^2\mu(F_k-F_j,F_k-F_j)/2}
-e^{-t^2\mu(F_j,F_j)/2}
-e^{-t^2\mu(F_k,F_k)/2}+1\right].
\end{aligned}
$$
指数関数を $e^{t^2c}=1+t^2c+o(t^2)$ と展開すると、右辺は $\mu(F_j,F_k)+i\sigma(F_j,F_k)/2$ へ収束します。したがって $t\to0$ で
$$
0\le\lim_{t\to0}\frac{\omega(B_t^*B_t)}{t^2}
=\sum_{j,k}\overline{z_j}z_k\Lambda(F_j,F_k).
$$
[同値命題](#prop-aqft7-uncertainty-equivalence)より $\mu$ は許容共分散です。
<!-- proof-end -->

**何が保証されたか。** 任意の許容共分散から、特性値を持つ状態が抽象的に存在するだけでなく、AQFT6で実際に作った局所Weyl netを含むC*環上に存在することを示しました。証明は有限個の元で閉じるため、$\mathcal V$ が無限次元でも有限次元近似の極限を無条件に仮定していません。

## 4. quasifree状態とGNSの規則性

ここで構成した状態には、一次平均が零で二点の共分散が高次のWeyl期待値も決める、という意味で「準自由」という名前を付けます。本講では、線形な位相因子を掛けた非中心化Gaussian状態とは区別して**中心化**に限定します。

<a id="def-aqft7-quasifree"></a>

<!-- formal-statement-start -->
> **定義（中心化quasifree状態）**  
> $(\mathcal V,\sigma)$ のWeyl C*環上の状態 $\omega$ が中心化quasifree状態であるとは、ある許容共分散 $\mu$ があり、全ての $F\in\mathcal V$ に対して
$$
\omega(W(F))=\exp\left(-\frac12\mu(F,F)\right)
$$
> が成立することをいう。この状態の二点形式を $\Lambda=\mu+i\sigma/2$ とする。
<!-- formal-statement-end -->

[定理](#thm-aqft7-quasifree-state)はこの定義が空虚でないことを保証しました。さらに $\omega(W(F_1)\cdots W(F_n))$ はWeyl積を順に使えば、位相と $\chi_\mu(\sum_jF_j)$ の積となるので、**全ての有限Weyl積の期待値が $\mu$ と $\sigma$ で決まります**。

<!-- definition-example-start: def-aqft7-quasifree -->
### 直接例：二元積の期待値

$V_0=\mathbb R^2$、$\sigma_0((q,p),(q',p'))=qp'-pq'$、$\mu(F,G)=(qq'+pp')/2$ とします。前節の $ab=1/4$ の検査によりこれは許容されます。
$$
\omega(W(q,p))=e^{-(q^2+p^2)/4}.
$$
$F=(1,0),G=(0,1)$ を入れると
$$
\begin{aligned}
\omega(W(F)W(G))
&=e^{-i/2}\omega(W(F+G))
=e^{-i/2}e^{-1/2},\\
\omega(W(G)W(F))
&=e^{i/2}e^{-1/2}.
\end{aligned}
$$
この値は交換関係の順序を区別します。$\omega(1)=1$ と正値性は[構成定理](#thm-aqft7-quasifree-state)から保証され、複素二点形式の正値性は直接例のGram行列からも確認できます。
<!-- definition-example-end -->

<a id="prop-aqft7-regular-gns"></a>

<!-- formal-statement-start -->
> **命題（quasifree状態のGNS表現は規則的）**  
> 許容共分散 $\mu$ による $\omega_\mu$ のGNS表現 $(\pi_\mu,\mathcal H_\mu,\Omega_\mu)$ は、任意の $F\in\mathcal V$ に対して
$$
t\longmapsto\pi_\mu(W(tF))
$$
> が強連続である。従って[AQFT6の規則的表現の定義](../AQFT6/index.md#def-aqft6-regular-representation)を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

まず巡回ベクトルを一つのWeyl元で動かしたベクトルに対して、強連続性をノルムの二乗として計算します。次に線形包の稠密性で全空間へ拡張します。

<!-- proof-start -->
### 証明

$\xi_G=\pi_\mu(W(G))\Omega_\mu$ とします。$\|\xi_G\|=1$ であり、Weyl関係を二回用いると
$$
W(-G)W(tF)W(G)=e^{-it\sigma(F,G)}W(tF).
$$
したがって
$$
\begin{aligned}
\|(\pi_\mu(W(tF))-I)\xi_G\|^2
&=2-2\operatorname{Re}\langle\xi_G,\pi_\mu(W(tF))\xi_G\rangle\\
&=2-2\operatorname{Re}\left[
e^{-it\sigma(F,G)}e^{-t^2\mu(F,F)/2}\right]\to0.
\end{aligned}
$$
有限線形結合 $\xi=\sum_{j=1}^nc_j\xi_{G_j}$ については
$$
\|(\pi_\mu(W(tF))-I)\xi\|
\le\sum_{j=1}^n|c_j|
 \|(\pi_\mu(W(tF))-I)\xi_{G_j}\|\to0.
$$
Weyl元の線形包がC*環に稠密で、$\Omega_\mu$ がGNS巡回ベクトルなので、このような $\xi$ は $\mathcal H_\mu$ に稠密です。任意の $\eta$ と近似 $\xi$ に対し、ユニタリ性より
$$
\|(\pi_\mu(W(tF))-I)\eta\|
\le2\|\eta-\xi\|+
\|(\pi_\mu(W(tF))-I)\xi\|.
$$
先に $t\to0$、次に $\|\eta-\xi\|\to0$ とすれば強連続性が従います。任意の $t_0$ への連続性は一パラメータ群の法則で従います。
<!-- proof-end -->

**場演算子と二点形式の意味。** [QM7のStone定理](../../QM/QM7/index.md#thm-qm7-stone)を強連続な一パラメータ群へ適用すると、各実 $F$ に自己共役生成子 $\Phi_\mu(F)$ があり
$$
\pi_\mu(W(tF))=e^{it\Phi_\mu(F)}
$$
となります。さらに $\langle\Omega_\mu,e^{it\Phi_\mu(F)}\Omega_\mu\rangle=e^{-t^2\mu(F,F)/2}$ は中心化Gaussian特性関数です。生成子のスペクトル測度の二次モーメントが $\mu(F,F)<\infty$ なので、$\Omega_\mu$ は各 $\Phi_\mu(F)$ の定義域にあり、$\|\Phi_\mu(F)\Omega_\mu\|^2=\mu(F,F)$ です。

二元の期待値もWeyl積から求まります。$F,G\in\mathcal V$ について
$$
\begin{aligned}
\omega_\mu(W(tF)W(sG))
&=e^{-its\sigma(F,G)/2}
e^{-\{t^2\mu(F,F)+2ts\mu(F,G)+s^2\mu(G,G)\}/2},\\
-\left.\frac{\partial^2}{\partial t\,\partial s}
\omega_\mu(W(tF)W(sG))\right|_{t=s=0}
&=\mu(F,G)+\frac i2\sigma(F,G)=\Lambda(F,G).
\end{aligned}
$$
前段で $\Omega_\mu$ が両生成子の定義域にあると分かったため、これは
$$
\langle\Phi_\mu(F)\Omega_\mu,\Phi_\mu(G)\Omega_\mu\rangle
=\Lambda(F,G)
$$
という**ベクトルの内積**として厳密に意味を持ちます。一般の非有界積 $\Phi_\mu(F)\Phi_\mu(G)$ を全Hilbert空間で定義したとの主張ではありません。$\Lambda(F,G)-\Lambda(G,F)=i\sigma(F,G)$ はCCRの符号と一致します。

## 5. 何を保証せず、次に何を選ぶか

quasifree状態は**正値な状態**かつ**規則的な表現**を与えます。しかしそれだけでは[AQFT3の平行移動スペクトル条件](../AQFT3/index.md#def-aqft3-spectrum)、Poincaré不変性、真空の一意性は出ません。例えば二次元模型の $a=b=1/2$ と $a=b=1$ はどちらも許容されますが、異なる期待値を与えます。

また、共分散の不確定性条件は場の短距離特異性を制御するHadamard条件ではありません。後者は曲がった時空での局所的な正則性・特異性の要求であり、この講の結論には含まれません。

次講AQFT8では、Minkowskiの**正周波数分解とFock真空**から特定の $\mu$ を計算し、その二点形式が本講の $\Lambda$ と一致することを調べます。

## 6. 演習と詳細解答

### Level A：定義と二元計算

<a id="ex-aqft7-a01"></a>
#### AQFT7-A01 不確定性の境界
- Level: A

$V_0=\mathbb R^2$、$\sigma_0((q,p),(q',p'))=qp'-pq'$、$\mu(F,G)=\frac12(qq'+pp')$ とする。(i) $\mu(F,F)\ge0$、(ii) 全組についての不確定性条件、(iii) $F=e_q,G=e_p$ の等号成立を確認せよ。

<!-- solution-start -->
**詳細解答**。(i) $\mu(F,F)=(q^2+p^2)/2\ge0$。(ii) 二次元の恒等式
$$
(q^2+p^2)(q'^2+p'^2)-(qq'+pp')^2=(qp'-pq')^2
$$
より
$$
\sigma_0(F,G)^2\le(q^2+p^2)(q'^2+p'^2)
=4\mu(F,F)\mu(G,G).
$$
(iii) $e_q=(1,0),e_p=(0,1)$ では左辺 $1$、右辺 $4(1/2)(1/2)=1$。従って等号です。
<!-- solution-end -->

<a id="ex-aqft7-a02"></a>
#### AQFT7-A02 非許容の共分散
- Level: A

同じ $\sigma_0$ に対して $\mu(F,G)=\frac14(qq'+pp')$ とする。$\mu$ は正定値なのに許容共分散でないことを示し、二点形式の行列で再検算せよ。

<!-- solution-start -->
**詳細解答**。$F\ne0$ なら $\mu(F,F)=(q^2+p^2)/4>0$。しかし $e_q,e_p$ に対し $|\sigma_0(e_q,e_p)|^2=1$ に対して $4\mu(e_q,e_q)\mu(e_p,e_p)=4/16=1/4$ なので不確定性条件は破れます。二点行列は
$$
[\Lambda]=\begin{pmatrix}1/4&i/2\\-i/2&1/4\end{pmatrix}
$$
で、行列式 $1/16-1/4=-3/16<0$。固有値も $3/4,-1/4$ なので複素正値ではありません。実対角値の正値性だけでは足りません。
<!-- solution-end -->

<a id="ex-aqft7-a03"></a>
#### AQFT7-A03 Weylの二元積
- Level: A

許容共分散 $\mu$ の状態に対して $F,G$ を固定する。$\omega_\mu(W(F)W(G))$ と逆順の値を求め、$\sigma(F,G)=0$ の場合を説明せよ。

<!-- solution-start -->
**詳細解答**。[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)から
$$
\begin{aligned}
\omega_\mu(W(F)W(G))
&=e^{-i\sigma(F,G)/2}e^{-\mu(F+G,F+G)/2},\\
\omega_\mu(W(G)W(F))
&=e^{i\sigma(F,G)/2}e^{-\mu(F+G,F+G)/2}.
\end{aligned}
$$
二行目では $\sigma(G,F)=-\sigma(F,G)$ を使いました。$\sigma(F,G)=0$ なら両者の位相は $1$ で期待値は等しく、[交換子の公式](../AQFT6/index.md#prop-aqft6-weyl-commutator)からWeyl元自体も可換です。期待値の一致だけから一般に元の可換性を逆推論しないことが重要です。
<!-- solution-end -->

<a id="ex-aqft7-a04"></a>
#### AQFT7-A04 二点形式の虚部
- Level: A

$\Lambda=\mu+i\sigma/2$ のとき $\Lambda(G,F)=\overline{\Lambda(F,G)}$、$\Lambda(F,G)-\Lambda(G,F)=i\sigma(F,G)$、$\Lambda(F,F)=\mu(F,F)$ を順に証明せよ。

<!-- solution-start -->
**詳細解答**。$\mu(G,F)=\mu(F,G)$、$\sigma(G,F)=-\sigma(F,G)$ だから
$$
\Lambda(G,F)=\mu(F,G)-\frac i2\sigma(F,G)
=\overline{\Lambda(F,G)}.
$$
差を取ると $(i/2+i/2)\sigma(F,G)=i\sigma(F,G)$ です。交代性から $\sigma(F,F)=0$ なので $\Lambda(F,F)=\mu(F,F)$。後者だけの非負性では複素係数に関する正値性を保証しません。
<!-- solution-end -->

### Level B：正値性と構成の機構

<a id="ex-aqft7-b01"></a>
#### AQFT7-B01 二元行列からの強い不等式
- Level: B

$\Lambda$ が複素正値なら、任意の $F,G$ について
$$
\mu(F,F)\mu(G,G)-\mu(F,G)^2\ge\sigma(F,G)^2/4
$$
を導け。$\mu(F,F)>0$ の場合に $G$ を $G-\lambda F$ へ変える方法でも、許容共分散の不確定性条件からこの式が従うことを示せ。

<!-- solution-start -->
**詳細解答**。$\Lambda$ の二元Gram行列の行列式を展開すると
$$
\det\begin{pmatrix}\mu(F,F)&\mu(F,G)+i\sigma(F,G)/2\\
\mu(F,G)-i\sigma(F,G)/2&\mu(G,G)\end{pmatrix}
=\mu(F,F)\mu(G,G)-\mu(F,G)^2-\sigma(F,G)^2/4.
$$
半正定値行列の行列式は非負なので第一の主張が従います。後半は $\lambda=\mu(F,G)/\mu(F,F)$ と取ると、交代性で $\sigma(F,G-\lambda F)=\sigma(F,G)$ かつ
$$
\mu(G-\lambda F,G-\lambda F)
=\mu(G,G)-\frac{\mu(F,G)^2}{\mu(F,F)}.
$$
不確定性条件を $(F,G-\lambda F)$ に適用して両辺へ $\mu(F,F)$ を掛ければ要求の式です。$\mu(F,F)=0$ の場合は不確定性条件から $\sigma(F,G)=0$、$\mu$ の半正定値性に対する二次式 $\mu(F+tG,F+tG)\ge0$ より $\mu(F,G)=0$ なので式は零以上です。
<!-- solution-end -->

<a id="ex-aqft7-b02"></a>
#### AQFT7-B02 正値核の二元検査と指数
- Level: B

任意の二元 $F,G$ に対し、$\omega_\mu((cW(F)+dW(G))^*(cW(F)+dW(G)))$ の係数行列を求めよ。その正値性を $\Lambda$ の正値性から説明せよ。

<!-- solution-start -->
**詳細解答**。$K_{jk}=\omega_\mu(W(-F_j)W(F_k))$、$(F_1,F_2)=(F,G)$ と置くと
$$
K=\begin{pmatrix}
1 & e^{i\sigma(F,G)/2}e^{-\mu(G-F,G-F)/2}\\
e^{-i\sigma(F,G)/2}e^{-\mu(G-F,G-F)/2}&1
\end{pmatrix}.
$$
Weyl積と $\mu$ の対称性を使いました。$z=(c,d)^T$ とすると求める期待値は $z^*Kz$。これは $\Lambda(F_j,F_k)$ の成分ごとの指数行列を対角因子 $e^{-\mu(F_j,F_j)/2}$ で挟んだものです。[状態構成定理のGram証明](#thm-aqft7-quasifree-state)に従い、指数級数の各次数はテンソル冪のGram行列だから半正定値です。従って $z^*Kz\ge0$ です。二元の場合には直接 $\det K=1-e^{-\mu(G-F,G-F)}\ge0$ とも検算できます。ただし二元だけの検査を全有限線形結合の正値性の証明と取り違えません。
<!-- solution-end -->

<a id="ex-aqft7-b03"></a>
#### AQFT7-B03 規則性をベクトルから示す
- Level: B

$\xi_G=\pi_\mu(W(G))\Omega_\mu$ とする。$t\mapsto\pi_\mu(W(tF))$ の強連続性を、まず $\xi_G$、次に有限線形結合、最後に任意の $\eta\in\mathcal H_\mu$ の順に示せ。

<!-- solution-start -->
**詳細解答**。$W(-G)W(tF)W(G)=e^{-it\sigma(F,G)}W(tF)$ なので
$$
\|(\pi_\mu(W(tF))-I)\xi_G\|^2
=2-2e^{-t^2\mu(F,F)/2}\cos(t\sigma(F,G))\to0.
$$
$\xi=\sum_jc_j\xi_{G_j}$ では差のノルムを三角不等式で各項の差の和に抑え、有限和ゆえ零へ収束します。[GNSの巡回性](../../OA/OA5/index.md#thm-oa5-gns)からこれらの有限線形結合は稠密です。任意の $\eta$ に $\|\eta-\xi\|<\varepsilon$ となる $\xi$ を選ぶと、ユニタリ性により
$$
\|(\pi_\mu(W(tF))-I)\eta\|
\le2\varepsilon+\|(\pi_\mu(W(tF))-I)\xi\|.
$$
先に $t\to0$、次に $\varepsilon\to0$ として強連続性が証明されます。
<!-- solution-end -->

<a id="ex-aqft7-b04"></a>
#### AQFT7-B04 状態をC*閉包へ延ばす理由
- Level: B

$\omega_0$ が有限Weyl線形結合上で正であるとき、なぜ直ちにAQFT6の作用素ノルムに関して連続と言えないのか。$H\cong\mathbb Z$、$S_N=\{-N,\dots,N\}$、固定 $k\in\mathbb Z$ の場合に、平均を用いたノルム支配証明で必要な比を具体的に計算せよ。

<!-- solution-start -->
**詳細解答**。*代数での $\omega_0(A^*A)\ge0$ は、別に与えられた作用素ノルムでの $|\omega_0(A)|\le C\|A\|$ をそれだけでは主張していません。代数的GNSの $U$ と具体的離散表示 $W$ のノルム比較が必要です。$N>|k|$ のとき $S_N$ と $S_N+k$ は各側の長さ $|k|$ だけずれるので
$$
|(S_N+k)\triangle S_N|=2|k|,\qquad
\frac{|(S_N+k)\triangle S_N|}{|S_N|}
=\frac{2|k|}{2N+1}\to0.
$$
主証明の $J_N$ ではこの比の平方根が $(W(k)\otimes I)J_N-J_NU(k)$ のノルム誤差を抑えます。有限個のラベルについて和を取り極限を通すことで、$\|U(A)\|\le\|A\|$ が得られ、正値な $\omega_0$ をC*閉包へ延ばせます。
<!-- solution-end -->

### Level C：定義から真空候補の入口まで

<a id="ex-aqft7-c01"></a>
#### AQFT7-C01 正値性・二点形式・規則性を一続きに
- Level: C

$V_0=\mathbb R^2$ と標準 $\sigma_0$ を取り、$a,b>0$ について
$$
\mu_{a,b}((q,p),(q',p'))=aqq'+bpp'.
$$
(i) quasifree状態が存在する必要十分条件を求め、(ii) $\Lambda$ の行列と二点の反対称部を計算し、(iii) $\omega(W(te_q))$ と $\omega(W(te_p))$ を求め、対応するGNS表現が規則的である理由を述べよ。最後に、得られた状態が正エネルギー真空であると直ちに言えない理由を答えよ。

<!-- solution-start -->
**詳細解答**。(i) $\mu$ の対角値は $aq^2+bp^2\ge0$ です。$e_q,e_p$ に不確定性条件を適用すると $1\le4ab$ が必要です。逆に
$$
|\sigma_0(F,G)|^2=(qp'-pq')^2
\le(q^2/b+p^2/a)(bp'^2+aq'^2)
=\frac{\mu(F,F)\mu(G,G)}{ab}
$$
なので $ab\ge1/4$ なら全組の条件が成立します。[Gaussian Weyl状態の構成定理](#thm-aqft7-quasifree-state)を適用でき、必要性も同定理で保証されます。

(ii) 標準基底で
$$
[\Lambda]=\begin{pmatrix}a&i/2\\-i/2&b\end{pmatrix},\quad
\det[\Lambda]=ab-\frac14\ge0,\quad
\Lambda(e_q,e_p)-\Lambda(e_p,e_q)=i.
$$
これは $i\sigma_0(e_q,e_p)=i$ と一致します。半正定値性は $a>0$ と行列式の非負性でも確認できます。

(iii) 対角値は $\mu(te_q,te_q)=at^2$ と $\mu(te_p,te_p)=bt^2$ なので
$$
\omega(W(te_q))=e^{-at^2/2},\qquad
\omega(W(te_p))=e^{-bt^2/2}.
$$
いずれも $t\to0$ で $1$ に収束します。これだけでは全ベクトルに対する強連続性は言えませんが、[規則性命題](#prop-aqft7-regular-gns)の証明通り $W(G)\Omega$ に関するノルム計算を行い、有限線形結合・稠密性・ユニタリ性でGNS空間全体へ延長できます。

最後に、ここで指定したのは有限次元シンプレクティック空間上の共分散です。時空並進を実装するユニタリ群とその同時スペクトルを与えていません。従って[AQFT3の正エネルギー真空条件](../AQFT3/index.md#def-aqft3-vacuum)を証明したことにはならず、状態の正値性と真空条件を混同してはいけません。
<!-- solution-end -->

## 7. 到達点と次講

許容共分散 $\mu$ の不確定性条件は複素二点形式 $\Lambda=\mu+i\sigma/2$ の正値性と同値でした。この条件からGaussian型Weyl特性汎関数を構成し、任意の有限線形結合の正値性、具体的C*ノルムへの延長、GNS表現の規則性まで示しました。

**次講AQFT8「Minkowski真空とFock二点関数」**では、自由場の正周波数解から特定の $\mu$ を選び、その不変性とスペクトル条件を追加で検討します。
