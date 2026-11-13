# CTM11 Hooke則と等方線形弾性の独立な定数

[CTM10 の等温・非散逸の弾性構成則](../CTM10/index.md#prop-ctm10-isothermal-elastic)から、蓄えた自由エネルギーを変形で微分すると応力が得られる。しかし一般のエネルギー関数は材料ごとに違い、どんな力を加えるとどれほど伸びるかは、まだ数値計算できない。小さな変形に限り、**ひずみに比例する応力**を選ぶのが Hooke 則である。さらに材料の方向を変えても性質が同じなら、一般に多数ある弾性係数を二つへ減らせる。

この講義では、微小変形の範囲を明示し、エネルギーから Hooke 則を導き、伸び・横収縮・せん断という独立の実験から係数を読み取る。物体の形と荷重条件を指定して変位場を解くのは次講で扱う。

## 0. 設定と単位

三次元の応力のない基準配置を開集合 $\Omega_0\subset\mathbb R^3$ とし、変位 $u:\Omega_0\to\mathbb R^3$ は $C^1$ 級とする。変形した位置を $x=X+u(X)$、変形勾配を $F=I_3+\nabla_Xu$ と書く。$X,u,x$ の単位は m、$\nabla_Xu$ と以下のひずみは無次元である。$\|\nabla_Xu\|$ が $1$ より十分小さい範囲で一次の項を残す（どの量を無視するかは式中で示す）。$I_3$ は単位行列、$e_i$ は標準直交基底、$A:B=\sum_{i,j}A_{ij}B_{ij}$、$\operatorname{tr}A=\sum_iA_{ii}$ とする。

[CTM7 の応力対称性](../CTM7/index.md#prop-ctm7-angular-stress)を持つ古典的連続体を対象とする。ここでの $\sigma$ は一次近似での Cauchy 応力（Pa = N/m$^2$）である。弾性エネルギー密度 $W$ と Lamé 係数 $\lambda,\mu$ の単位も Pa である。ほかの材料定数は、それぞれの実験による定義とともに単位を示す。

## 1. 小さな伸縮と回転をどう分けるか

[CTM3 の Green–Lagrange ひずみ](../CTM3/index.md#def-ctm3-green-strain)へ $F=I_3+H$、$H=\nabla_Xu$ を代入すると

$$
\begin{aligned}
E&=\tfrac12(F^TF-I_3)\\
 &=\tfrac12\{(I_3+H^T)(I_3+H)-I_3\}\\
 &=\tfrac12(H+H^T)+\tfrac12H^TH.
\end{aligned}
$$

$H^TH$ は $H$ の二次の量なので、小さい $H$ の一次理論では対称部分だけが残る。これが**微小ひずみ**である。

[CTM3 の微小ひずみの定義](../CTM3/index.md#def-ctm3-infinitesimal-strain)をここでも使う。すなわち $u\in C^1(\Omega_0;\mathbb R^3)$ に対し

$$
\boxed{\varepsilon(u)=\frac12\{\nabla_Xu+(\nabla_Xu)^T\}},
\qquad
\varepsilon_{ij}=\frac12(\partial_{X_j}u_i+\partial_{X_i}u_j)
$$

である。これは無次元の実対称 $3\times3$ 行列で、有限ひずみとの関係は $E=\varepsilon+\tfrac12(\nabla_Xu)^T\nabla_Xu$ である。

### **定義の確認**：引張りと微小回転

$u(X)=(aX_1,bX_2,0)$ とすると $\nabla_Xu=\operatorname{diag}(a,b,0)$、$\varepsilon=\operatorname{diag}(a,b,0)$ となる。対称性と各成分を定義から直接検査できる。一方 $u(X)=\omega(-X_2,X_1,0)$ では

$$
\nabla_Xu=\begin{pmatrix}0&-\omega&0\\ \omega&0&0\\0&0&0\end{pmatrix},
\qquad \varepsilon=0.
$$

反対称な一次の回転は伸びとして数えない。ただしこの後者を**有限角の厳密な回転**と読み替えてはいけない。$F=I_3+\nabla u$ には $\omega^2$ に比例する有限ひずみが残る。正しい有限回転では $F=Q\in SO(3)$ を使い、[有限ひずみの零条件](../CTM3/index.md#prop-ctm3-length-criterion)によって $E=0$ となる。
微小線素 $a$ に対する長さの二乗の差は、上式から

$$
|Fa|^2-|a|^2
=2a^T\varepsilon a+|Ha|^2.
$$

したがって一次の伸縮は $a^T\varepsilon a$ で測れる。[CTM2 の体積 Jacobian](../CTM2/index.md#def-ctm2-deformation-gradient) $J=\det F$ についても、$F=I_3+H$ の三列を行列式の多重線形性で展開すれば

$$
\det(I_3+H)=1+\sum_{i=1}^3H_{ii}
+\sum_{1\le i<j\le3}(H_{ii}H_{jj}-H_{ij}H_{ji})+\det H.
$$

二次以上の項を捨てると $J=1+\operatorname{tr}H+O(\|H\|^2)$ となる。反対称成分の跡は零なので $\operatorname{tr}H=\operatorname{tr}\varepsilon=\operatorname{div}_Xu$。従って体積の相対変化を一次で測る量は $\operatorname{tr}\varepsilon$ である。

## 2. 「方向によらない」材料を数式で定める

材料の向きを取り替えてもエネルギーが変わらないという **材料等方性** は、[CTM10 の定義](../CTM10/index.md#def-ctm10-material-isotropy)で導入した。微小ひずみは線素の伸びを表す対称行列なので、まずその基底表示を確かめる。

正規直交基底を $Q\in SO(3)$ で取り替える。線素の新しい座標とひずみの行列表示をそれぞれ $a'=Q^Ta$、$\varepsilon'=Q^T\varepsilon Q$ とすると

$$
a^T\varepsilon a
=(Q^Ta)^T(Q^T\varepsilon Q)(Q^Ta)
=(a')^T\varepsilon'a'
$$

となり、同じ長さの一次変化を表す。$Q^T$ も $SO(3)$ に属するので、向きを回したひずみの表現は $\varepsilon\mapsto Q\varepsilon Q^T$ と書ける。

**等方性**とは相対的な材料方向を回しても固定した材料のエネルギー関数の値が変わらないという追加条件である。単なる座標の付け替えや時間依存の観測者回転とは区別する。

等温・一様な材料の単位基準体積当たりのエネルギーを、対称行列 $\varepsilon$ の二次関数で近似する。基準状態で応力が零なので定数・一次の項を除き、$W(0)=0$ とする。「同次二次」とは任意の実数 $c$ に対して $W(c\varepsilon)=c^2W(\varepsilon)$ となる二次式の意味である。対称行列 $h$ の方向への**変分**は

$$
\delta W(\varepsilon)[h]
:=\left.\frac{d}{dr}W(\varepsilon+rh)\right|_{r=0}
$$

と書く。ここで $r$ はひずみを試しに変える無次元の実数で、後で使う物理的な時刻とは異なる。応力 $\sigma$ を $\delta W(\varepsilon)[h]=\sigma:h$ により読む理由は、$h_{ij}$ を少し変えたときの単位体積当たりのエネルギー変化を各応力成分と対応させるためである。

<a id="def-ctm11-isotropic-linear-elastic"></a>

<!-- formal-statement-start -->
### 定義（等方線形弾性材料）

実対称 $3\times3$ 行列の空間を $\operatorname{Sym}(3)$ とする。$W:\operatorname{Sym}(3)\to\mathbb R$ が同次二次式であり、すべての $\varepsilon\in\operatorname{Sym}(3)$ と $Q\in SO(3)$ に対して

$$
W(Q\varepsilon Q^T)=W(\varepsilon)
$$

を満たし、すべての対称変分 $h$ について $\delta W(\varepsilon)[h]=\sigma:h$ を満たす対称応力 $\sigma$ で材料の応力を定める模型を、等温の**等方線形弾性材料**とする。微小ひずみ $\varepsilon=\varepsilon(u)$ を使い、応力は $\varepsilon$ に線形に依存する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm11-isotropic-linear-elastic -->
### **定義の確認**：回しても変わらない二次エネルギー

$\mu>0,K>0$ を Pa 単位の定数とし、$\theta=\operatorname{tr}\varepsilon$、$\varepsilon_{\rm dev}=\varepsilon-\theta I_3/3$ と置いて

$$
W(\varepsilon)=\mu\,\varepsilon_{\rm dev}:\varepsilon_{\rm dev}
+\frac K2\theta^2
$$

とする。$\varepsilon_{\rm dev}$ は対称、$\operatorname{tr}\varepsilon_{\rm dev}=0$ で、$Q^TQ=I_3$ から $\operatorname{tr}(Q\varepsilon Q^T)=\theta$、$(Q\varepsilon_{\rm dev}Q^T):(Q\varepsilon_{\rm dev}Q^T)=\varepsilon_{\rm dev}:\varepsilon_{\rm dev}$ となる。従ってエネルギーは等方的であり、$W(c\varepsilon)=c^2W(\varepsilon)$ と $W(0)=0$ も成立する。

対称変分 $h$ に対し $h_{\rm dev}=h-(\operatorname{tr}h)I_3/3$ と置くと、$\operatorname{tr}\varepsilon_{\rm dev}=0$ から $\varepsilon_{\rm dev}:h_{\rm dev}=\varepsilon_{\rm dev}:h$。よって定義した変分を実際に計算すると

$$
\begin{aligned}
\delta W(\varepsilon)[h]
&=2\mu\,\varepsilon_{\rm dev}:h_{\rm dev}
+K\theta\,\operatorname{tr}h\\
&=\bigl(2\mu\varepsilon_{\rm dev}+K\theta I_3\bigr):h.
\end{aligned}
$$

従って $\sigma=2\mu\varepsilon_{\rm dev}+K\theta I_3$ は対称で、$\varepsilon$ に線形に依存し、$\varepsilon=0$ では零となる。また $\mu,K>0$ なので $W\ge0$、等号なら $\varepsilon_{\rm dev}=0$ かつ $\theta=0$、すなわち $\varepsilon=0$ である。この例では定義の二次同次性・材料等方性・応力の変分表示と線形性をそれぞれ直接確認できた。
<!-- definition-example-end -->

なぜ二つの係数で十分なのかを示す。実対称行列は正規直交固有基底 $v_1,v_2,v_3$ を持つので、$\varepsilon v_i=d_iv_i$（$d_i\in\mathbb R$）と書き、基底の符号を一つ調整して $Q=(v_1\ v_2\ v_3)\in SO(3)$ とできる。このとき

$$
\varepsilon=\sum_{i=1}^3d_iv_iv_i^T
=Q\operatorname{diag}(d_1,d_2,d_3)Q^T.
$$

直前の等方性をこの $Q$ に適用すると $W(\varepsilon)=W(\operatorname{diag}(d_1,d_2,d_3))$。さらに主軸の入替えは、必要なら一軸の符号も反転することで $SO(3)$ の共役変換として実現できるため、右辺は $d_1,d_2,d_3$ の**対称な二次式**となる。一般の同次二次式 $\sum_i c_id_i^2+\sum_{i<j}c_{ij}d_id_j$ で $d_1,d_2,d_3$ を入れ替えて係数を比較すれば、すべての $c_i$ が等しく、すべての $c_{ij}$ も等しい。従って $a,b\in\mathbb R$ があって

$$
W=a(d_1^2+d_2^2+d_3^2)
+b(d_1+d_2+d_3)^2
=a\,\varepsilon:\varepsilon+b(\operatorname{tr}\varepsilon)^2.
$$

これは **等方的な同次二次エネルギーに独立の係数が二つしかない理由**である。$a=\mu$, $b=\lambda/2$ と命名する。

<a id="thm-ctm11-hooke"></a>

<!-- formal-statement-start -->
### 定理（等方 Hooke 則のエネルギー表示）

$W:\operatorname{Sym}(3)\to\mathbb R$ を等方的な同次二次エネルギーとし、零ひずみで応力零、$\delta W=\sigma:\delta\varepsilon$ が任意の対称変分 $\delta\varepsilon$ で成立するとする。このとき二定数 $\lambda,\mu$（単位 Pa）が存在して

$$
\boxed{W=\frac{\lambda}{2}(\operatorname{tr}\varepsilon)^2+\mu\,\varepsilon:\varepsilon},
\qquad
\boxed{\sigma=\lambda(\operatorname{tr}\varepsilon)I_3+2\mu\varepsilon}
$$

となる。逆にこの $W$ は材料等方的であり、表示された $\sigma$ を変分から与える。
<!-- formal-statement-end -->

### 証明の見取り図

対称なひずみを対角化し、方向を入れ替えても値が同じ二次式は二種類の和しか持たない。エネルギーの微小変化では、$\operatorname{tr}\varepsilon$ と $\varepsilon:\varepsilon$ の一次変分をそれぞれ計算し、その係数を応力として読む。

<!-- proof-start -->
### 証明

上の対角化・置換の議論で $W=\lambda(\operatorname{tr}\varepsilon)^2/2+\mu\varepsilon:\varepsilon$ が従う。任意の対称行列 $h$ を取り、先の方向変分のパラメータ $r$ を使って $\varepsilon(r)=\varepsilon+rh$ と置けば

$$
\begin{aligned}
\operatorname{tr}(\varepsilon+rh)&=\operatorname{tr}\varepsilon+r\operatorname{tr}h,\\
(\varepsilon+rh):(\varepsilon+rh)
&=\varepsilon:\varepsilon+2r\varepsilon:h+r^2h:h.
\end{aligned}
$$

ゆえに $r=0$ における微分は

$$
\frac d{dr}W(\varepsilon+rh)\bigg|_{r=0}
=\lambda(\operatorname{tr}\varepsilon)(\operatorname{tr}h)+2\mu\,\varepsilon:h.
$$

$I_3:h=\operatorname{tr}h$ を代入すると、右辺は $\{\lambda(\operatorname{tr}\varepsilon)I_3+2\mu\varepsilon\}:h$。任意の対称 $h$ に対する係数を比較して応力表示を得る。逆向きは $\operatorname{tr}(Q\varepsilon Q^T)=\operatorname{tr}\varepsilon$ と、直交行列が Frobenius 内積を保つことから従う。$\square$
<!-- proof-end -->

変位経路 $u(X,t)$ を取り、空間微分 $\nabla_Xu(X,t)$ が時刻 $t$ に関しても $C^1$ 級であると仮定する。上付きの点は物質点 $X$ を固定した時刻 $t$ による微分を表し、$\dot\varepsilon=\partial_t\varepsilon(X,t)$、$\dot W=\partial_t W(\varepsilon(X,t))$ とする。先の $d/dr$ はひずみの方向変分であり、この $d/dt$ と変数を混同しない。連鎖律により

$$
\dot W=\delta W(\varepsilon)[\dot\varepsilon]
=\sigma:\dot\varepsilon.
$$

この等温・準静的な体積当たりの可逆仕事は[CTM10 の非散逸条件](../CTM10/index.md#prop-ctm10-isothermal-elastic)の**一次近似版**に当たる。有限ひずみの $P=\partial\Psi/\partial F$ と厳密に同じ式だと主張するものではなく、$\nabla u$ の高次項を捨てた近似である。

## 3. 体積変形と形の変化を分ける

ひずみの跡 $\theta=\operatorname{tr}\varepsilon$ は相対体積変化の一次成分、$\varepsilon_{\rm dev}=\varepsilon-\theta I_3/3$ は跡のない形状変化を表す。両者は内積に関して直交する。なぜなら

$$
I_3:\varepsilon_{\rm dev}=\operatorname{tr}\varepsilon_{\rm dev}
=\theta-\frac\theta3\operatorname{tr}I_3=0
$$

だからである。$\varepsilon=\varepsilon_{\rm dev}+(\theta/3)I_3$ を展開すると

$$
\varepsilon:\varepsilon
=\varepsilon_{\rm dev}:\varepsilon_{\rm dev}
+\frac{\theta^2}{9}(I_3:I_3)
=\varepsilon_{\rm dev}:\varepsilon_{\rm dev}+\frac{\theta^2}{3}.
$$

<a id="def-ctm11-bulk-modulus"></a>

<!-- formal-statement-start -->
### 定義（体積弾性率と偏差ひずみ）

等方 Hooke 則の係数 $\lambda,\mu$ に対し、**体積弾性率**を $K:=\lambda+2\mu/3$、**偏差ひずみ**を $\varepsilon_{\rm dev}:=\varepsilon-(\operatorname{tr}\varepsilon)I_3/3$ と定める。前者の単位は Pa、後者は無次元である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm11-bulk-modulus -->
### **定義の確認**：体積伸びと純せん断

$\varepsilon=\alpha I_3$（$\alpha$ は小さい無次元定数）なら $\theta=3\alpha$、$\varepsilon_{\rm dev}=0$。Hooke 則は $\sigma=(3\lambda+2\mu)\alpha I_3=K\theta I_3$、エネルギーは $W=K\theta^2/2$ となる。逆に $\varepsilon_{12}=\varepsilon_{21}=\gamma/2$ だけが非零なら $\theta=0$、$\varepsilon_{\rm dev}=\varepsilon$、$W=\mu\gamma^2/2$、$\sigma_{12}=\mu\gamma$。ここで $\gamma=2\varepsilon_{12}$ は工学せん断ひずみと呼ぶ無次元量であり、$\sigma_{12}=\mu\gamma$ の比例係数が $\mu$ である。それぞれ係数 $K$ と $\mu$ の役割を直接確認した。
<!-- definition-example-end -->

<a id="prop-ctm11-split"></a>

<!-- formal-statement-start -->
### 命題（エネルギーの直交分解と正定値条件）

三次元実対称ひずみ $\varepsilon$ と実定数 $\lambda,\mu$ に対し、$K=\lambda+2\mu/3$ と置けば

$$
W=\mu\,\varepsilon_{\rm dev}:\varepsilon_{\rm dev}+\frac K2(\operatorname{tr}\varepsilon)^2,
\qquad
\sigma=2\mu\varepsilon_{\rm dev}+K(\operatorname{tr}\varepsilon)I_3.
$$

$W(\varepsilon)>0$ がすべての $\varepsilon\ne0$ で成立することと

$$
\boxed{\mu>0,\qquad K>0}
\quad\Longleftrightarrow\quad
\boxed{\mu>0,\qquad3\lambda+2\mu>0}
$$

は同値である。
<!-- formal-statement-end -->

### 証明の見取り図

六次元の対称行列空間を「跡なしの五次元」と「単位行列方向の一次元」に分ける。二つの空間で独立にひずみを選べるため、エネルギーがどちらの方向でも正となる条件を比較すればよい。

<!-- proof-start -->
### 証明

先ほどの直交分解を[Hooke 則のエネルギー](#thm-ctm11-hooke)に代入すると

$$
\begin{aligned}
W&=\frac\lambda2\theta^2+\mu\left(\varepsilon_{\rm dev}:\varepsilon_{\rm dev}+\frac{\theta^2}{3}\right)\\
&=\mu\,\varepsilon_{\rm dev}:\varepsilon_{\rm dev}+
\frac12\left(\lambda+\frac{2\mu}{3}\right)\theta^2.
\end{aligned}
$$

応力にも $\varepsilon=\varepsilon_{\rm dev}+\theta I_3/3$ を代入して第二式を得る。$\mu,K>0$ なら両項は非負で、和が零なら $\varepsilon_{\rm dev}=0$ かつ $\theta=0$、ゆえに $\varepsilon=0$ である。

逆にすべての非零ひずみで $W>0$ とする。$\varepsilon=\operatorname{diag}(a,-a,0)$、$a\ne0$ を取ると $\theta=0$、$W=2\mu a^2>0$ から $\mu>0$。$\varepsilon=aI_3$、$a\ne0$ では $\varepsilon_{\rm dev}=0$、$W=9Ka^2/2>0$ から $K>0$。最後の条件は $K=(3\lambda+2\mu)/3$ を使い換えられる。$\square$
<!-- proof-end -->

正定値性は $\lambda>0$ を要求しない。例えば $\lambda=-\mu/2$、$\mu>0$ は $K=\mu/6>0$ なので許される。一方 $\mu=0$ なら純せん断を蓄えられず、$K=0$ なら一様体積変形を蓄えられない。**エネルギーの正定値性**と、特定方向への波の伝播などで使われる弱い条件を混同しない。

## 4. 一軸引張りから縦の硬さと横収縮を測る

実験で棒を $e_1$ 方向に引くとき、側面は自由なので側方の**応力**を零にする。一方、側方の**ひずみ**は零とは限らない。この違いを二つの実験的な弾性定数として読み取る。

<a id="def-ctm11-young-poisson"></a>

<!-- formal-statement-start -->
### 定義（Young率と Poisson比）

正定値な等方 Hooke 則において、一軸応力状態 $\sigma=\operatorname{diag}(s,0,0)$（$s\ne0$、単位 Pa）で得られるひずみ成分に対して

$$
E_Y:=\frac{s}{\varepsilon_{11}},\qquad
\nu:=-\frac{\varepsilon_{22}}{\varepsilon_{11}}
$$

をそれぞれ **Young率**（Pa）と **Poisson比**（無次元）と定める。等方性により $\varepsilon_{22}=\varepsilon_{33}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ctm11-young-poisson -->
### **定義の確認**：側面が自由な棒

例えば $\lambda=\mu=p>0$（Pa）、$s>0$ とする。[Hooke 則](#thm-ctm11-hooke)で非対角成分は $\sigma_{ij}=2p\varepsilon_{ij}$（$i\ne j$）だから、一軸応力 $\sigma=\operatorname{diag}(s,0,0)$ では非対角ひずみが零となる。また $\sigma_{22}-\sigma_{33}=2p(\varepsilon_{22}-\varepsilon_{33})=0$ なので、縦ひずみを $l=\varepsilon_{11}$、共通の横ひずみを $q=\varepsilon_{22}=\varepsilon_{33}$ と書ける。跡が $l+2q$ であることを用いると、側面自由条件と軸方向の荷重は

$$
\begin{aligned}
0=\sigma_{22}&=p(l+2q)+2pq=p(l+4q),\\
s=\sigma_{11}&=p(l+2q)+2pl=p(3l+2q).
\end{aligned}
$$

第一式から $q=-l/4$、第二式へ代入して $s=(5p/2)l$。従って $l=2s/(5p)$、$q=-s/(10p)$ となり、**定義そのもの**から

$$
E_Y=\frac{s}{l}=\frac{5p}{2},\qquad
\nu=-\frac{q}{l}=\frac14
$$

を得る。対角外の応力も零、側面応力も零と確認でき、後出の逆変換公式を前提にせず定義を判定できた。
<!-- definition-example-end -->

<a id="thm-ctm11-elastic-constants"></a>

<!-- formal-statement-start -->
### 定理（Lamé 係数・Young率・Poisson比の関係）

$\mu>0$、$3\lambda+2\mu>0$ の三次元等方 Hooke 則では、一軸応力 $\sigma=\operatorname{diag}(s,0,0)$ に対して

$$
\varepsilon_{11}=\frac{\lambda+\mu}{\mu(3\lambda+2\mu)}s,
\qquad
\varepsilon_{22}=\varepsilon_{33}
=-\frac{\lambda}{2\mu(3\lambda+2\mu)}s.
$$

従って

$$
\boxed{E_Y=\frac{\mu(3\lambda+2\mu)}{\lambda+\mu}
=\frac{9K\mu}{3K+\mu}},
\qquad
\boxed{\nu=\frac{\lambda}{2(\lambda+\mu)}
=\frac{3K-2\mu}{2(3K+\mu)}}.
$$

逆に $E_Y>0$、$-1<\nu<1/2$ の範囲では

$$
\boxed{\mu=\frac{E_Y}{2(1+\nu)}},\quad
\boxed{\lambda=\frac{E_Y\nu}{(1+\nu)(1-2\nu)}},\quad
\boxed{K=\frac{E_Y}{3(1-2\nu)}}.
$$

この範囲で二組の定数は互いに一意に変換できる。
<!-- formal-statement-end -->

### 証明の見取り図

Hooke 則の跡を取り、まず $\theta$ を応力の跡から求める。すると応力からひずみを復元できる。一軸応力を代入して、縦ひずみと横ひずみの比を読む。最後に $\nu$ の式から $\lambda/\mu$ を解く。

<!-- proof-start -->
### 証明

[等方 Hooke 則](#thm-ctm11-hooke)の跡を取る。$\operatorname{tr}I_3=3$、$\operatorname{tr}\varepsilon=\theta$ だから

$$
\operatorname{tr}\sigma=3\lambda\theta+2\mu\theta
=(3\lambda+2\mu)\theta.
$$

仮定で分母が正なので $\theta=\operatorname{tr}\sigma/(3\lambda+2\mu)$。元の式を $2\mu\varepsilon=\sigma-\lambda\theta I_3$ と解き直すと

$$
\boxed{\varepsilon=
\frac{\sigma}{2\mu}-
\frac{\lambda\,\operatorname{tr}\sigma}{2\mu(3\lambda+2\mu)}I_3}.
$$

$\sigma=\operatorname{diag}(s,0,0)$ では $\operatorname{tr}\sigma=s$。従って

$$
\begin{aligned}
\varepsilon_{11}
&=\frac{s}{2\mu}-\frac{\lambda s}{2\mu(3\lambda+2\mu)}
=\frac{(2\lambda+2\mu)s}{2\mu(3\lambda+2\mu)}
=\frac{\lambda+\mu}{\mu(3\lambda+2\mu)}s,\\
\varepsilon_{22}&=\varepsilon_{33}
=-\frac{\lambda s}{2\mu(3\lambda+2\mu)}.
\end{aligned}
$$

$\lambda+\mu>\mu/3>0$ なので $\varepsilon_{11}\ne0$。定義を代入すると

$$
E_Y=\frac{s}{\varepsilon_{11}}=
\frac{\mu(3\lambda+2\mu)}{\lambda+\mu},
\qquad
\nu=-\frac{\varepsilon_{22}}{\varepsilon_{11}}=
\frac{\lambda}{2(\lambda+\mu)}.
$$

$3\lambda+2\mu=3K$、$\lambda+\mu=K+\mu/3$ を代入すれば $K,\mu$ 表示となる。逆変換では $2\nu(\lambda+\mu)=\lambda$ より

$$
(1-2\nu)\lambda=2\nu\mu,\qquad
\lambda=\frac{2\nu}{1-2\nu}\mu.
$$

これを $E_Y=2\mu(1+\nu)$（上の $E_Y$ 式へ代入して得られる）に戻せば $\mu=E_Y/[2(1+\nu)]$、さらに $\lambda,K$ が従う。正定値条件 $\mu>0,K>0$ は $E_Y>0$ と $-1<\nu<1/2$ に対応し、各分母はこの開区間で正。$\square$
<!-- proof-end -->

$\nu<0$ の材料は一軸引張りで横にも伸びる（負の Poisson 比）。これは線形弾性の正定値性に反しない。$\nu\to1/2$ で $K=E_Y/[3(1-2\nu)]$ が大きくなるのは、有限の圧力で体積変化が起きにくいことを表す。**$\nu=1/2$ を上の可逆変換に代入してはならない**。

### 具体例：単純せん断と一軸引張りを比べる

$u=(\gamma X_2,0,0)$（$|\gamma|\ll1$）なら

$$
\varepsilon=\begin{pmatrix}0&\gamma/2&0\\\gamma/2&0&0\\0&0&0\end{pmatrix},
\quad
\sigma=\begin{pmatrix}0&\mu\gamma&0\\\mu\gamma&0&0\\0&0&0\end{pmatrix},
\quad W=\frac12\mu\gamma^2.
$$

従ってせん断測定からは $\mu=\sigma_{12}/\gamma$ を読むことができる。一軸応力測定からは $E_Y=s/\varepsilon_{11}$、$\nu=-\varepsilon_{22}/\varepsilon_{11}$ を読むことができる。三つの測定値は独立ではなく、[定数間の関係](#thm-ctm11-elastic-constants)で結ばれる。

## 5. 線形近似が破れるとき

$u(X)=(aX_1,0,0)$ で有限の $a$ を考えると $\varepsilon_{11}=a$、しかし[有限ひずみ](../CTM3/index.md#def-ctm3-green-strain)は $E_{11}=a+a^2/2$。二次項が無視できないとき、Hooke 則に有限変形の仕事共役をそのまま代入することはできない。また、微小ひずみは有限の剛体回転に対して厳密な客観量ではない。有限変形のエネルギーと応力の関係は CTM14 で扱う。

前提となる正定値条件を満たさない模型では、ある非零ひずみに対し $W\le0$ が起きる。例えば $\mu<0$ は純せん断、$K<0$ は一様体積伸縮で負のエネルギーを生む。「式の形が Hooke 則」というだけで安定な弾性材料にはならない。

## 演習

以下、特記しない限り三次元の等温等方 Hooke 則、対称微小ひずみ、$\mu>0$、$K=\lambda+2\mu/3>0$ とする。すべての応力・材料係数・エネルギー密度は Pa、ひずみは無次元である。各問の与えた場は滑らかで、一次近似が使えるほど小さい変位勾配を仮定する。

### Level A

### A1. 回転と伸縮の分離

$u(X)=(aX_1-\omega X_2,\omega X_1+bX_2,0)$（$|a|,|b|,|\omega|\ll1$）の微小ひずみと跡を求め、$\omega$ が寄与しないことを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[微小ひずみ](../CTM3/index.md#def-ctm3-infinitesimal-strain)の出発行列は

$$
H=\nabla_Xu=\begin{pmatrix}a&-\omega&0\\\omega&b&0\\0&0&0\end{pmatrix}.
$$

$H^T$ では $-\omega$ と $\omega$ が入れ替わるので

$$
\varepsilon=(H+H^T)/2=\operatorname{diag}(a,b,0),
\qquad\operatorname{tr}\varepsilon=a+b.
$$

$\omega$ の項は対称化で相殺される。有限ひずみなら $H^TH/2$ に $\omega^2$ が残るため、これは一次近似の結果である。
<!-- solution-end -->

### A2. Hooke 応力を成分で求める

$\lambda=p,\mu=2p$（$p>0$ Pa）とし、$\varepsilon=\operatorname{diag}(a,-a/2,0)$（$|a|\ll1$）に対する $\sigma$ と $W$ を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$\theta=a-a/2=a/2$、$\varepsilon:\varepsilon=a^2+a^2/4=5a^2/4$。よって[Hooke 則](#thm-ctm11-hooke)から

$$
\sigma=p(a/2)I_3+4p\operatorname{diag}(a,-a/2,0)
=\operatorname{diag}(9pa/2,-3pa/2,pa/2).
$$

エネルギーは

$$
W=\frac p2(a/2)^2+2p(5a^2/4)
=\frac{pa^2}{8}+\frac{20pa^2}{8}
=\frac{21}{8}pa^2.
$$

$\mu>0$、$3\lambda+2\mu=7p>0$ なので $a\ne0$ では正である。
<!-- solution-end -->

### A3. 純せん断の蓄積

$u(X)=(\gamma X_2,0,0)$、$|\gamma|\ll1$ に対して $\sigma_{12}$、$W$ を求め、$\gamma\mapsto-\gamma$ としたときの変化を説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[微小ひずみの定義](../CTM3/index.md#def-ctm3-infinitesimal-strain)を使う。$H_{12}=\gamma$ 以外の $H$ 成分は零なので、対称化により $\varepsilon_{12}=\varepsilon_{21}=\gamma/2$、対角成分はすべて零となる。従って

$$
\theta=\operatorname{tr}\varepsilon=0,\qquad
\varepsilon:\varepsilon
=\varepsilon_{12}^2+\varepsilon_{21}^2
=2\left(\frac{\gamma}{2}\right)^2
=\frac{\gamma^2}{2}.
$$

[Hooke 則](#thm-ctm11-hooke)では $\lambda\theta I_3$ が消えるので

$$
\sigma_{12}=2\mu\varepsilon_{12}=\mu\gamma,\qquad
W=\mu\,\varepsilon:\varepsilon=\frac{\mu\gamma^2}{2}.
$$

$\gamma$ の符号を反転させると応力の符号だけが変わり、エネルギーは二乗で不変である。
<!-- solution-end -->

### A4. 体積弾性率の判定

$\lambda=-p/2,\mu=p$（$p>0$ Pa）の材料で $K$ と $\varepsilon=aI_3$（$a\ne0$ が十分小さい）のエネルギーを計算し、$\lambda<0$ でも正定値となるか確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[体積弾性率](#def-ctm11-bulk-modulus)から $K=-p/2+2p/3=p/6>0$。$\theta=3a$、偏差ひずみは零なので

$$
W=\frac K2(3a)^2=\frac{p}{12}\,9a^2=\frac{3p}{4}a^2>0.
$$

$\mu=p>0$ も成立するので、[正定値条件](#prop-ctm11-split)からすべての非零対称ひずみで正となる。$\lambda$ 単独の符号では安定性を判断できない。
<!-- solution-end -->

### Level B

### B1. 一軸「応力」と一軸「ひずみ」は違う

$E_Y>0$、$-1<\nu<1/2$ の材料に $\sigma=\operatorname{diag}(s,0,0)$（$s\ne0$ Pa）を加える。ひずみを求め、横ひずみを零と仮定することが一般に誤りであることを示せ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[Young率と Poisson比の定義](#def-ctm11-young-poisson)から $E_Y=s/\varepsilon_{11}$、$\nu=-\varepsilon_{22}/\varepsilon_{11}$ であり、[弾性定数の関係](#thm-ctm11-elastic-constants)によって側面二方向のひずみは等しい。従って

$$
\varepsilon=\operatorname{diag}\left(\frac{s}{E_Y},-\frac{\nu s}{E_Y},-\frac{\nu s}{E_Y}\right).
$$

この対角行列の跡は $(1-2\nu)s/E_Y$。$K=E_Y/[3(1-2\nu)]$ より $\operatorname{tr}\sigma=3K\theta=s$ で整合する。$\nu\ne0$ なら横ひずみは非零で、仮に $\varepsilon_{22}=\varepsilon_{33}=0$ とすると Hooke 則の側面応力は $\sigma_{22}=\lambda\varepsilon_{11}$ となり、一般に零にならない。自由側面を持つ実験は一軸応力である。
<!-- solution-end -->

### B2. 測定値から Lamé 係数を求める

棒の一軸引張り実験で $E_Y=120$ GPa、$\nu=1/4$ を測定した。$\mu,\lambda,K$ を求め、正定値性を検算せよ（$1$ GPa $=10^9$ Pa）。

- Level: B

<!-- solution-start -->
#### 詳細解答

[弾性定数の換算定理](#thm-ctm11-elastic-constants)の分母は $1+\nu=5/4$、$1-2\nu=1/2$ で正。よって

$$
\mu=\frac{120}{2(5/4)}=48\ {\rm GPa},\qquad
\lambda=\frac{120(1/4)}{(5/4)(1/2)}=48\ {\rm GPa}.
$$

$K=\lambda+2\mu/3=48+32=80$ GPa。$\mu=48>0$、$3\lambda+2\mu=144+96=240>0$ GPa なのでエネルギーは正定値。確認として $E_Y=9K\mu/(3K+\mu)=9\cdot80\cdot48/(240+48)=120$ GPa が元の測定値へ戻る。
<!-- solution-end -->

### B3. エネルギー正定値性を反例で検査する

$\lambda=-p,\mu=p$（$p>0$ Pa）について $\varepsilon=aI_3$、$\varepsilon=\operatorname{diag}(a,-a,0)$（$a\ne0$）のエネルギーをそれぞれ求め、どの仮定が壊れるか説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$K=-p+2p/3=-p/3<0$。体積ひずみでは $\theta=3a$、偏差零なので

$$
W_{\rm vol}=\frac K2(3a)^2=-\frac{3p}{2}a^2<0.
$$

純せん断型の跡なしひずみでは $\theta=0$、$\varepsilon:\varepsilon=2a^2$ なので

$$
W_{\rm shear}=\mu(2a^2)=2pa^2>0.
$$

$\mu>0$ によりせん断は正だが、[正定値定理](#prop-ctm11-split)の $K>0$ が失われる。体積方向に負エネルギーを持ち、二次エネルギーの安定性を保証できない。せん断の一例だけで許容性を判定することはできない。
<!-- solution-end -->

### B4. ひずみの分解から応力を再構成する

$\varepsilon=\operatorname{diag}(2a,a,-a)$、$\mu=p>0$、$K=2p$（$|a|\ll1$）とする。偏差ひずみ、$\sigma$、$W$ を計算し、$\sigma:\varepsilon=2W$ を確認せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$\theta=2a+a-a=2a$ なので

$$
\varepsilon_{\rm dev}=\operatorname{diag}(4a/3,a/3,-5a/3),
\quad
\varepsilon_{\rm dev}:\varepsilon_{\rm dev}
=(16+1+25)a^2/9=\frac{14}{3}a^2.
$$

[分解命題](#prop-ctm11-split)により

$$
\sigma=2p\varepsilon_{\rm dev}+2p(2a)I_3
=\operatorname{diag}(20pa/3,14pa/3,2pa/3).
$$

同じ[エネルギー分解](#prop-ctm11-split)から

$$
W=p\frac{14a^2}{3}+\frac{2p}{2}(2a)^2
=\left(\frac{14}{3}+4\right)pa^2
=\frac{26}{3}pa^2.
$$

応力との内積は

$$
\sigma:\varepsilon=(20pa/3)(2a)+(14pa/3)a+(2pa/3)(-a)
=\frac{52}{3}pa^2=2W.
$$

二次同次エネルギーを一次微分した応力だから、この等式は一般の $\varepsilon$ でも成立する。
<!-- solution-end -->

### Level C

### C1. 実験値・二つの負荷・エネルギーの整合性

微小変形する等方弾性体で、単位は Pa とする。試験片を $e_1$ 方向へ引いて一軸応力 $\sigma=\operatorname{diag}(s,0,0)$（$s>0$）を加えたところ、縦ひずみは $4h$、横ひずみは $-h$（$0<h\ll1$）だった。さらに同じ材料の単純せん断試験では工学せん断ひずみ $\gamma=2h$、せん断応力 $\tau=s/4$ が測定されたとする。材料の係数はひずみの大きさによらず一定とする。

1. 最初の試験から $E_Y$ と $\nu$ を求め、$\lambda,\mu,K$ を $s,h$ で表せ。
2. その係数から第二試験の予測せん断応力を求め、与えられた値と整合するか判定せよ。
3. 最初の試験に蓄えたエネルギー密度を $\tfrac12\sigma:\varepsilon$ と $W=\mu\varepsilon_{\rm dev}:\varepsilon_{\rm dev}+K\theta^2/2$ の二通りで計算して照合せよ。
4. 仮に側面を拘束して横ひずみを零にした場合、同じ縦ひずみ $4h$ に対する側面応力が零でないことを示せ。

- Level: C

<!-- solution-start -->
#### 詳細解答

一軸応力の定義から $E_Y=s/(4h)$、$\nu=-(-h)/(4h)=1/4$。[弾性定数変換](#thm-ctm11-elastic-constants)へ代入する。$1+\nu=5/4$、$1-2\nu=1/2$ なので

$$
\mu=\frac{s/(4h)}{2(5/4)}=\frac{s}{10h},
\quad
\lambda=\frac{(s/(4h))(1/4)}{(5/4)(1/2)}
=\frac{s}{10h},
\quad
K=\lambda+\frac{2\mu}{3}=\frac{s}{6h}.
$$

$s,h>0$ から $\mu,K>0$。一軸試験において $\theta=4h-h-h=2h$、$\varepsilon=\operatorname{diag}(4h,-h,-h)$ を Hooke 則に代入すると

$$
\sigma_{11}=\lambda(2h)+2\mu(4h)=s/5+4s/5=s,
\quad
\sigma_{22}=\sigma_{33}=\lambda(2h)-2\mu h=s/5-s/5=0
$$

となり、側面零応力も確認できる。

第二試験は純せん断なので [せん断の応力式](#def-ctm11-bulk-modulus)を使い $\tau_{\rm pred}=\mu\gamma=(s/(10h))2h=s/5$。実測値は $\tau=s/4$ なので **一致しない**。実験誤差がないという設定では、この二つの実験を同一の線形等方モデルの定数で同時に説明することはできない。$h$ が消えるのは $\mu$ の単位が Pa であることと整合する。

エネルギーを二通りで計算する。直接には

$$
\frac12\sigma:\varepsilon=\frac12\,s(4h)=2sh.
$$

一方 $\theta=2h$、$\varepsilon_{\rm dev}=\operatorname{diag}(10h/3,-5h/3,-5h/3)$ なので

$$
\varepsilon_{\rm dev}:\varepsilon_{\rm dev}
=(100+25+25)h^2/9=\frac{50}{3}h^2.
$$

[エネルギー分解](#prop-ctm11-split)へ代入すると

$$
W=\frac{s}{10h}\frac{50h^2}{3}
+\frac12\frac{s}{6h}(2h)^2
=\frac{5}{3}sh+\frac13sh=2sh.
$$

最後に一軸「ひずみ」 $\varepsilon=\operatorname{diag}(4h,0,0)$ を与えると、跡は $4h$。同じ係数による側面応力は

$$
\sigma_{22}=\sigma_{33}=\lambda(4h)+2\mu(0)
=\frac{s}{10h}\,4h=\frac{2s}{5}\ne0.
$$

自由側面なら側方に $-h$ の収縮が生じて側面応力が相殺されるが、側方を拘束すると反力が必要になる。これが応力条件と変位条件の違いである。
<!-- solution-end -->

## 次への接続

この講義では、応力とひずみを結ぶ材料の法則を定めた。次の CTM12 では[運動量収支](../CTM7/index.md#thm-ctm7-material-momentum)へ $\sigma(\varepsilon(u))$ を代入し、物体の形・境界荷重・固定条件から変位 $u$ を解く。境界で何を指定したかによって、同じ材料でも答えは変わる。
