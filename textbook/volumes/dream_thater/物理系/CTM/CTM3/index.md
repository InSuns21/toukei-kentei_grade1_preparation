# CTM3 有限ひずみと剛体回転をどう区別するか

[CTM2 の変形勾配](../CTM2/index.md#def-ctm2-deformation-gradient)は、微小線素を $dX$ から $dx=F\,dX$ へ送る。ところが、ゴム板を伸ばした場合と、板を形を変えずに回した場合のどちらも、一般には $F\ne I_3$ になる。行列の成分の変化だけを「伸び」と呼ぶと、剛体回転まで変形と数えてしまう。

欲しいのは、**長さや角度の変化だけを測り、回転を除外する量**である。まず $F^TF$ から有限ひずみを作り、次に極分解で回転と伸縮を分ける。最後に、変位の一次微分だけを使う線形近似がどこまで通用するかを計算で確かめよう。

以下、$\Omega_0\subset\mathbb R^3$ を基準配置の開集合、$0\in I$ を開時間区間とし、[CTM1 の運動写像](../CTM1/index.md#def-ctm1-motion-configuration)の四条件を満たす $\chi:\Omega_0\times I\to\mathbb R^3$ を考える。

$X$ と現在位置 $x=\chi(X,t)$ の単位は m、時刻 $t$ の単位は s。[変形勾配](../CTM2/index.md#def-ctm2-deformation-gradient) $F=D_X\chi$ と体積倍率 $J=\det F>0$ は無次元である。

これから導入する行列と長さ倍率も無次元とする。$I_3$ は $3\times3$ 単位行列、上付き $T$ は標準直交基底での転置を表す。

## 1. 距離の変化から有限ひずみを作る

[CTM2 の線素変換](../CTM2/index.md#prop-ctm2-line-volume)によれば、物質点 $X$ の近くで方向 $a\ne0$ の線素は一次近似で $Fa$ へ写る。その長さの二乗を計算すると

$$
\|Fa\|^2=(Fa)^T(Fa)=a^TF^TFa
$$

となる。そこで、基準側の $a$ だけを使って変形後の長さを測る対称行列 $C=F^TF$ を考える。もとの長さの二乗は $a^TI_3a$ だから、その差の半分を $E$ として取り出せば、回転では消えるひずみを得られそうだ。

<a id="def-ctm3-green-strain"></a>

<!-- formal-statement-start -->
### 定義（右 Cauchy–Green テンソルと Green–Lagrange ひずみ）

$C^1$ 級の運動写像 $\chi:\Omega_0\times I\to\mathbb R^3$ が $J=\det D_X\chi>0$ を満たすとする。$(X,t)$ で $F=D_X\chi$ と置き、**右 Cauchy–Green テンソル** $C$ と **Green–Lagrange ひずみ** $E$ を

$$
C:=F^TF,\qquad E:=\frac12(C-I_3)
$$

で定義する。いずれも基準配置側のベクトルに作用する実対称 $3\times3$ 行列である。
<!-- formal-statement-end -->

$C$ は任意の非零 $a$ に対し $a^TCa=\|Fa\|^2>0$ を満たす。最後の不等号では $J>0$ から $F$ が可逆で $Fa\ne0$ であることを使った。したがって $C$ は**正定値**であり、$E$ は対称だが正定値とは限らない。

<!-- definition-example-start: def-ctm3-green-strain -->
### **定義の確認**：回転を含む一様伸長

$\lambda_1,\lambda_2,\lambda_3>0$ とし、$Q$ を [RBD1 の向きを保つ回転行列](../../../物理系/RBD/RBD1/index.md#def-rbd1-proper-rotation)、すなわち $Q^TQ=I_3$、$\det Q=1$ を満たす行列とする。$F=Q\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3)$ と置けば、$\det F=\lambda_1\lambda_2\lambda_3>0$ である。固定時刻のアフィン写像 $X\mapsto FX+c$ の Jacobian は $F$ なので、この行列は変形勾配として実現できる。標準直交基底で列の内積をとると

$$
\begin{aligned}
C&=F^TF
=\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3)\,Q^TQ\,
\operatorname{diag}(\lambda_1,\lambda_2,\lambda_3)\\
&=\operatorname{diag}(\lambda_1^2,\lambda_2^2,\lambda_3^2),\\
E&=\operatorname{diag}\left(
\frac{\lambda_1^2-1}{2},
\frac{\lambda_2^2-1}{2},
\frac{\lambda_3^2-1}{2}\right).
\end{aligned}
$$

$\lambda_1=2,\lambda_2=1/2,\lambda_3=1$ なら $E=\operatorname{diag}(3/2,-3/8,0)$。一方、$\lambda_1=\lambda_2=\lambda_3=1$ なら、$Q$ が単位行列でなくても $C=I_3$、$E=0$ となる。対称性は積の転置から、$C$ の正定値性は $\sum_i\lambda_i^2a_i^2>0$ からも直接確かめられる。
<!-- definition-example-end -->

$E$ は「各座標の長さの変化」を単独で並べたものではない。非対角成分は二方向のなす角の変化にも関係する。実際、二方向 $a,b$ の内積差は

$$
(Fa)\cdot(Fb)-a\cdot b
=a^T(F^TF-I_3)b=2a^TEb
$$

である。こうして長さと角度を**同じ行列**で測れる。

<a id="prop-ctm3-length-criterion"></a>

<!-- formal-statement-start -->
### 命題（有限ひずみの長さ判定と零ひずみ条件）

$F\in\mathbb R^{3\times3}$ が $\det F>0$ を満たし、$C=F^TF$、$E=(C-I_3)/2$ とする。すべての $a,b\in\mathbb R^3$ について

$$
\|Fa\|^2-\|a\|^2=2a^TEa,\qquad
(Fa)\cdot(Fb)-a\cdot b=2a^TEb
$$

が成立する。また、次の三条件は同値である。

1. $E=0$。
2. $\|Fa\|=\|a\|$ がすべての $a\in\mathbb R^3$ に成り立つ。
3. $F^TF=I_3$ かつ $\det F=1$、すなわち $F$ が向きを保つ直交行列である。
<!-- formal-statement-end -->

### 証明の見取り図

前半は $C$ の定義を線素に代入する。逆向きの含意で重要なのは、**すべての方向**で長さが等しいと、二方向の交差項も決まることである。これは $a+b$ の二乗を展開して示せる。

<!-- proof-start -->
### 証明

$2E=F^TF-I_3$ を用いて

$$
\|Fa\|^2-\|a\|^2
=a^TF^TFa-a^TI_3a
=2a^TEa.
$$

同様に $(Fa)\cdot(Fb)-a\cdot b=a^T(F^TF-I_3)b$ である。

$E=0$ なら $F^TF=I_3$ なので、上式から全方向の長さが保存される。逆に全方向の長さが保存されるとし、$A=F^TF-I_3$ と置く。$A=A^T$ で、すべての $a$ について $a^TAa=0$。$a=e_i$ で $A_{ii}=0$。$a=e_i+e_j$（$i\ne j$）で

$$
0=(e_i+e_j)^TA(e_i+e_j)
=A_{ii}+2A_{ij}+A_{jj}=2A_{ij}
$$

だから、非対角成分もゼロ。よって $A=0$ で $E=0$。

最後に $F^TF=I_3$ なら $(\det F)^2=1$。仮定 $\det F>0$ により $\det F=1$。逆に第三条件から $E=0$ は定義より直ちに従う。
<!-- proof-end -->

ここでの零ひずみ判定は**各点での微分 $F(X,t)$** に関するものだ。一点で $E=0$ と分かっても、離れた点でも $E=0$ とは言えない。例えば小さな領域での $x_1=X_1+\alpha X_1^2$ は、$X_1=0$ で $F=I_3$ だが $X_1\ne0$ では第一方向が伸縮する（$1+2\alpha X_1>0$ の領域に制限する）。一点の判定と物体全体の剛体性は区別する。

## 2. 回転と伸縮を極分解で分ける

次は、回転の影響を $E$ が消すだけでなく、もとの $F$ そのものから回転と伸縮を**取り出す**。対称正定値行列 $C$ には正の固有値と直交する固有方向があり、各固有値の正の平方根をとることで「方向ごとの伸縮だけを行う」行列を作れる。[LA6 の正定値平方根を与える定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)と[極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)が、この構成を一般の行列に対して保証する。

<a id="def-ctm3-stretch-principal"></a>

<!-- formal-statement-start -->
### 定義（右伸長テンソルと主伸長）

$\det F>0$ を満たす実 $3\times3$ 行列 $F$ に対し、$C=F^TF$ の一意な対称正定値平方根を **右伸長テンソル** $U$ と呼ぶ。

$$
U:=C^{1/2},\qquad U^T=U,\qquad U^2=C.
$$

$C$ の固有値を $\mu_i>0$ としたとき、その正の平方根 $\lambda_i=\sqrt{\mu_i}>0$ を **主伸長**、対応する単位固有ベクトルの方向を **主方向**という（重複固有値では方向の選択は一意でない）。
<!-- formal-statement-end -->

「平方根」とは行列の各成分の平方根をとることではない。実直交行列 $V$ の列に $C$ の正規直交固有ベクトルを並べると

$$
C=V\operatorname{diag}(\mu_1,\mu_2,\mu_3)V^T,\qquad
U=V\operatorname{diag}(\sqrt{\mu_1},\sqrt{\mu_2},\sqrt{\mu_3})V^T.
$$

この形なら $U^2=C$ を $V^TV=I_3$ から検算できる。固有値が正なのは $a^TCa=\|Fa\|^2>0$ による。

<!-- definition-example-start: def-ctm3-stretch-principal -->
### **定義の確認**：三方向の主伸長

$F=\operatorname{diag}(2,1/2,1)$ のとき

$$
C=\operatorname{diag}(4,1/4,1),\quad
U=\operatorname{diag}(2,1/2,1),\quad
U^2=C.
$$

$U$ は対称であり、任意の非零 $a$ について $a^TUa=2a_1^2+\frac12a_2^2+a_3^2>0$。各標準基底 $e_i$ は $Ce_i=\mu_ie_i$ を満たす単位固有ベクトルなので、主伸長は $2,1/2,1$、主方向は各座標軸である。$E$ の同じ方向の固有値は $3/2,-3/8,0$ であり、主伸長そのものとは数値が違う。
<!-- definition-example-end -->

<a id="thm-ctm3-polar"></a>

<!-- formal-statement-start -->
### 定理（向きを保つ有限変形の極分解）

$F\in\mathbb R^{3\times3}$、$\det F>0$ とする。右伸長テンソル $U=(F^TF)^{1/2}$ に対し、ただ一つの向きを保つ直交行列 $R$ が存在して

$$
F=RU,\qquad R^TR=I_3,\qquad \det R=1
$$

と書ける。このとき

$$
R=FU^{-1},\qquad C=U^2,\qquad E=\frac12(U^2-I_3).
$$

主方向 $v_i$ が $Cv_i=\lambda_i^2v_i$ を満たすなら、$\|Fv_i\|=\lambda_i$、$Ev_i=(\lambda_i^2-1)v_i/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

[LA6 の極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)を実行列 $F$ に適用すると、正の平方根 $U$ と直交部分が得られる。$J>0$ により直交部分は鏡映でなく回転になる。ここでは物質線素への作用と、向き・主伸長の式まで確かめる。

<!-- proof-start -->
### 証明

まず $F$ は $J>0$ により可逆。任意の非零 $a$ で $a^TF^TFa=\|Fa\|^2>0$ だから、$C=F^TF$ は実対称正定値である。[LA6 の平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)を $C$ に適用し、実直交固有基底で正の固有値の平方根を選ぶと、実対称正定値で可逆な $U=C^{1/2}$ が一意に得られる。

$R:=FU^{-1}$ と置くと、$U^T=U$ と $U^2=C$ から

$$
\begin{aligned}
R^TR&=(U^{-1})^TF^TFU^{-1}\\
&=U^{-1}CU^{-1}
=U^{-1}U^2U^{-1}=I_3.
\end{aligned}
$$

したがって $(\det R)^2=1$。さらに $\det R=\det F/\det U>0$（$U$ の固有値は全て正）なので $\det R=1$。定義により $RU=F$。

もし $F=\widetilde R\widetilde U$、$\widetilde R^T\widetilde R=I_3$、$\widetilde U$ が対称正定値なら

$$
F^TF=\widetilde U^T\widetilde R^T\widetilde R\widetilde U
=\widetilde U^2.
$$

正定値平方根の一意性より $\widetilde U=U$、次いで $\widetilde R=FU^{-1}=R$。従って分解は一意である。

最後に $Cv_i=\lambda_i^2v_i$、$\|v_i\|=1$ なら

$$
\|Fv_i\|^2=v_i^TCv_i=\lambda_i^2,\qquad
Ev_i=\frac12(C-I_3)v_i
=\frac{\lambda_i^2-1}{2}v_i.
$$

$\lambda_i>0$ を使って平方根をとれば長さ倍率は $\lambda_i$ となる。
<!-- proof-end -->

$R$ は回転、$U$ は主方向に沿った純粋な伸縮を担う。**先に $U$ で伸縮し、その後 $R$ で回転する**のが $F=RU$ の読み方である。積の順序は一般に交換できない。

**例：回転だけの運動。** $Q(\theta)$ を $e_3$ 軸まわりの回転とし、

$$
Q(\theta)=\begin{pmatrix}
\cos\theta&-\sin\theta&0\\
\sin\theta&\cos\theta&0\\
0&0&1
\end{pmatrix}.
$$

$\chi(X,t)=Q(\theta(t))X+c(t)$ として $\theta(0)=0$、$c(0)=0$、$\theta,c$ が $C^1$ 級なら運動の四条件を満たす。$F=Q$、$F^TF=I_3$、$J=1$ だから $U=I_3$、$R=Q$、$E=0$。並進 $c$ は $X$ で微分すると消える。[RBD1 の剛体配置](../../../物理系/RBD/RBD1/index.md#def-rbd1-configuration)と同じ幾何であり、剛体の**応力がゼロ**だと主張しているわけではない。

## 3. 観測者が丸ごと回してもひずみは変わらない

同じ変形後の物体を、さらに向きを保つ直交行列 $Q$ で回転し、並進 $b$ を加えて観測したとする。各時刻で $Q^TQ=I_3$、$\det Q=1$ とし、$Q,b$ は $X$ に依存しない。新しい配置 $x^\ast=Qx+b$ を $X$ で微分すると $F^\ast=QF$ である。

<a id="prop-ctm3-superposed-rotation"></a>

<!-- formal-statement-start -->
### 命題（剛体回転を重ねたときの有限ひずみの不変性）

$F\in\mathbb R^{3\times3}$ が $\det F>0$ を満たし、$Q^TQ=I_3$、$\det Q=1$ とする。$C=F^TF$、$E=(C-I_3)/2$、$U=C^{1/2}$ とし、$F^\ast=QF$ についても同じ定義で $C^\ast,E^\ast,U^\ast$ を置くと、

$$
C^\ast=(F^\ast)^TF^\ast=C,\qquad
E^\ast=E,\qquad U^\ast=U.
$$

また、[LA6 の極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)を $F$ に適用して $F=RU$ と表すと、$F^\ast=(QR)U$ も同条件を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$Q$ の効果は $F^TF$ で左右に並ぶ $Q^TQ$ が単位行列になることによって消える。$\det Q=1$ は、重ねた動きが鏡映でないことを保証する。

<!-- proof-start -->
### 証明

転置の順序を逆にすることを明示して計算すると

$$
(F^\ast)^TF^\ast=(QF)^T(QF)
=F^TQ^TQF=F^TF=C.
$$

従って $E^\ast=(C^\ast-I_3)/2=E$。正定値平方根は一意だから $U^\ast=(C^\ast)^{1/2}=U$。さらに

$$
(QR)^T(QR)=R^TQ^TQR=I_3,\qquad
\det(QR)=\det Q\,\det R=1,
$$

かつ $(QR)U=QF=F^\ast$。よって[本章の極分解の一意性](#thm-ctm3-polar)から回転部分は $QR$ である。
<!-- proof-end -->

この意味で $C,E,U$ は**重ねた剛体回転の影響を受けない**。これは次講で扱う「時間依存する観測系」の議論の入口であり、ここでは固定時刻の配置を比較している。

## 4. 微小ひずみが近似になる条件

実務では、変位 $u(X,t)=\chi(X,t)-X$ の空間的な変化を使って、線形のひずみを計算することが多い。ここでも時刻 $t$ は固定し、[CTM1 の変位](../CTM1/index.md#def-ctm1-material-displacement-velocity)の写像 $X\mapsto u(X,t)$ を基準座標 $X$ で微分する。その Jacobian 行列を $H=D_Xu$ と書くと、$D_XX=I_3$ だから $F=I_3+H$ である。時間微分ではなく、物質座標による空間微分を扱っている。非線形の $E$ と比べて何を捨てるのかを計算してみよう。

<a id="def-ctm3-infinitesimal-strain"></a>

<!-- formal-statement-start -->
### 定義（微小ひずみ）

$u:\Omega_0\to\mathbb R^3$ が $C^1$ 級であるとき、$H=D_Xu$ の対称部分

$$
\varepsilon:=\operatorname{sym}H
:=\frac12(H+H^T)
$$

を **微小ひずみ**と呼ぶ。これは $H$ に関して一次の量であり、有限ひずみ $E$ と一般には一致しない。
<!-- formal-statement-end -->

この定義は、$H$ と $H^T$ の半和を作るだけなので $\varepsilon^T=\varepsilon$ が成立する。

<!-- definition-example-start: def-ctm3-infinitesimal-strain -->
### **定義の確認**：単純せん断

$u(X)=(kX_2,0,0)$（$k$ は無次元）なら

$$
H=\begin{pmatrix}0&k&0\\0&0&0\\0&0&0\end{pmatrix},\quad
\varepsilon=\frac12(H+H^T)
=\begin{pmatrix}0&k/2&0\\k/2&0&0\\0&0&0\end{pmatrix}.
$$

一方、$F=I_3+H$、$J=1$ なので運動として向きと局所可逆性を保つが、有限ひずみは

$$
E=\frac12(F^TF-I_3)
=\begin{pmatrix}0&k/2&0\\k/2&k^2/2&0\\0&0&0\end{pmatrix}.
$$

$e_2$ 方向の長さの二乗は $1+k^2$ であり、$E_{22}=k^2/2$ はその差の半分。$\varepsilon_{22}=0$ は二次の伸びを捨てていることを示す。
<!-- definition-example-end -->

<a id="prop-ctm3-linearization"></a>

<!-- formal-statement-start -->
### 命題（有限ひずみの厳密な展開と線形化誤差）

$u$ が $C^1$ 級、$F=I_3+D_Xu$、$\det F>0$ とする。$H=D_Xu$、$\varepsilon=(H+H^T)/2$、$E=(F^TF-I_3)/2$ と置くと

$$
E=\varepsilon+\frac12H^TH.
$$

[Euclidノルムから誘導される作用素ノルム](../../../基礎科目/LA/LA6/index.md#def-la6-operator-norm) $\|\cdot\|_{\mathrm{op}}$ について

$$
\|E-\varepsilon\|_{\mathrm{op}}
\le\frac12\|H\|_{\mathrm{op}}^2.
$$

従って $\|H\|_{\mathrm{op}}\ll1$ の範囲では $\varepsilon$ は $E$ の一次近似になる。
<!-- formal-statement-end -->

### 証明の見取り図

$F=I_3+H$ を $F^TF$ に代入し、一次項と二次項を分ける。**変位 $u$ の値が小さいことだけ**では、Jacobian 行列 $H=D_Xu$ の小ささは保証されない。

<!-- proof-start -->
### 証明

積を順番に展開すると

$$
\begin{aligned}
F^TF&=(I_3+H)^T(I_3+H)\\
&=(I_3+H^T)(I_3+H)\\
&=I_3+H+H^T+H^TH.
\end{aligned}
$$

両辺から $I_3$ を引いて $2$ で割れば $E=(H+H^T)/2+H^TH/2$。任意の $\|a\|=1$ に対して

$$
\|H^THa\|
\le\|H^T\|_{\mathrm{op}}\|Ha\|
\le\|H\|_{\mathrm{op}}^2.
$$

実行列では $\|H^T\|_{\mathrm{op}}=\|H\|_{\mathrm{op}}$ なので、上限を単位ベクトル全体で取れば所望の評価が出る。とくに $H=\delta K$（$K$ 固定、$\delta\to0$）なら誤差は $O(\delta^2)$ である。
<!-- proof-end -->

**反例：90度回転で微小ひずみを使うと誤る。** $e_3$ 軸まわりの四分の一回転を

$$
Q=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}
$$

とする。$F=Q$ は $Q^TQ=I_3$、$\det Q=1$ を満たすので、[長さ判定命題](#prop-ctm3-length-criterion)から厳密な有限ひずみは $E=0$。しかし $H=Q-I_3$ から

$$
\varepsilon=\frac12(Q+Q^T)-I_3
=\operatorname{diag}(-1,-1,0)\ne0.
$$

線形化で落とした $H^TH/2=\operatorname{diag}(1,1,0)$ がちょうど打ち消す。失われた条件は $\|H\|\ll1$ である。回転の角度が小さい場合は $\cos\theta-1=O(\theta^2)$ なので誤差が二次に収まるが、有限角度を微小ひずみで判定してはいけない。

## 5. せん断を「回転＋主伸長」として計算する

ここまでの道具を同じ非対角行列で試そう。$k\in\mathbb R$ とし

$$
F=\begin{pmatrix}1&k&0\\0&1&0\\0&0&1\end{pmatrix},
\qquad
C=\begin{pmatrix}1&k&0\\k&1+k^2&0\\0&0&1\end{pmatrix}.
$$

標準直交基底 $e_1,e_2,e_3$ で見ると、$C$ は $e_1,e_2$ の張る平面と $e_3$ 方向をそれぞれ保つ。したがって上左の $2\times2$ ブロック $C_2$ と第3軸の成分 $1$ に分けて固有値と平方根を調べられる。$\det C_2=1$、$\operatorname{tr}C_2=k^2+2$ である。正定値行列の平方根を実際に作るため

$$
U_2=\frac1{\sqrt{k^2+4}}
\begin{pmatrix}2&k\\k&k^2+2\end{pmatrix}
$$

を試す。分子の行列を二乗すると

$$
\begin{pmatrix}2&k\\k&k^2+2\end{pmatrix}^{\!2}
=(k^2+4)\begin{pmatrix}1&k\\k&k^2+1\end{pmatrix}
$$

となるので $U_2^2=C_2$。$U_2$ が正定値であることも、任意の非零 $z=(z_1,z_2)^T$ について二次形式を平方完成して確認できる。

$$
z^TU_2z=\frac{1}{\sqrt{k^2+4}}
\left[2\left(z_1+\frac{k}{2}z_2\right)^2
+\left(2+\frac{k^2}{2}\right)z_2^2\right]>0.
$$

$U_2$ は対称だから、[LA6 の正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)の一意性より $U=\operatorname{diag}(U_2,1)$ が $C$ の右伸長テンソルとなる。なお $\det U_2=[2(k^2+2)-k^2]/(k^2+4)=1$ である。

[本章の極分解定理](#thm-ctm3-polar)に従い $R=FU^{-1}$ を求める。$2\times2$ ブロックでは

$$
\begin{aligned}
U_2^{-1}
&=\frac1{\sqrt{k^2+4}}
\begin{pmatrix}k^2+2&-k\\-k&2\end{pmatrix},\\
\begin{pmatrix}1&k\\0&1\end{pmatrix}U_2^{-1}
&=\frac1{\sqrt{k^2+4}}
\begin{pmatrix}2&k\\-k&2\end{pmatrix}.
\end{aligned}
$$

よって三次元の回転部分は

$$
R=\begin{pmatrix}
2/\sqrt{k^2+4}&k/\sqrt{k^2+4}&0\\
-k/\sqrt{k^2+4}&2/\sqrt{k^2+4}&0\\
0&0&1
\end{pmatrix}.
$$

その上左ブロックは $R_2^TR_2=I_2$、$\det R_2=(4+k^2)/(4+k^2)=1$ を満たし、$R_2U_2=\begin{pmatrix}1&k\\0&1\end{pmatrix}$ も検算できる。

特に $k=2$ のとき

$$
U_2=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&3\end{pmatrix},
\qquad
R_2=\frac1{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix}.
$$

$C_2=\begin{pmatrix}1&2\\2&5\end{pmatrix}$ の特性方程式は

$$
\det(C_2-\mu I_2)=(1-\mu)(5-\mu)-4
=\mu^2-6\mu+1=0.
$$

固有値とその正の平方根（主伸長）、さらに $E=(C-I_3)/2$ の対応する固有値は順に

$$
\begin{aligned}
\mu_\pm&=3\pm2\sqrt2=(\sqrt2\pm1)^2,\\
\lambda_\pm&=\sqrt{\mu_\pm}=\sqrt2\pm1,\\
\frac{\mu_\pm-1}{2}&=1\pm\sqrt2.
\end{aligned}
$$

第3軸ではそれぞれ $1,1,0$ である。せん断は体積を保存する（$J=1$）が、二つの主方向で伸びと縮みが起こる。

## 6. 演習

各問では、行列の値だけでなく、**どの量が長さを測り、どの量が回転を表すか**を区別しよう。全解答は各問の下にある。

## Level A

### A1. 四分の一回転と零ひずみ

$F=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ に対し、$J,C,E,U,R$ を求め、$e_1,e_2$ の長さが保存されることを直接確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

列の内積と行列式を計算すると $F^TF=I_3$、$J=1>0$ である。[Green–Lagrange ひずみの定義](#def-ctm3-green-strain)と[極分解定理](#thm-ctm3-polar)を適用すると

$$
C=I_3,\qquad E=\frac12(C-I_3)=0,\qquad
U=C^{1/2}=I_3,\qquad R=FU^{-1}=F.
$$

第1列と第2列はそれぞれ $Fe_1=e_2$、$Fe_2=-e_1$ なので、$\|Fe_1\|=\|Fe_2\|=1$ である。各方向の長さが保存されるのは回転のためであり、伸長ではない。
<!-- solution-end -->

### A2. 純伸長の主値

$F=\operatorname{diag}(3,1/2,2)$ とする。$C,E,U,J$ および主伸長を求め、$U$ が対称正定値であることを示せ。

- Level: A

<!-- solution-start -->
#### 詳細解答

列ごとの内積から

$$
C=F^TF=\operatorname{diag}(9,1/4,4),\quad
E=\operatorname{diag}(4,-3/8,3/2).
$$

$U=\operatorname{diag}(3,1/2,2)$ は対称で、$a\ne0$ なら $a^TUa=3a_1^2+(1/2)a_2^2+2a_3^2>0$。$U^2=C$ なので定義を満たし、主伸長は $3,1/2,2$。$J=3\cdot(1/2)\cdot2=3>0$ で、極分解の回転部分は $R=I_3$ である。
<!-- solution-end -->

### A3. 単純せん断の見落とされる伸び

$F=\begin{pmatrix}1&k&0\\0&1&0\\0&0&1\end{pmatrix}$ について、$C,E$ と微小ひずみ $\varepsilon$ を求め、$e_2$ 線素の二乗長さの変化をそれぞれの行列から説明せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$H=F-I_3$ の非零成分は $H_{12}=k$。転置との積を取って

$$
C=\begin{pmatrix}1&k&0\\k&1+k^2&0\\0&0&1\end{pmatrix},\qquad
E=\begin{pmatrix}0&k/2&0\\k/2&k^2/2&0\\0&0&0\end{pmatrix}.
$$

[微小ひずみの定義](#def-ctm3-infinitesimal-strain)から

$$
\varepsilon=\begin{pmatrix}0&k/2&0\\k/2&0&0\\0&0&0\end{pmatrix}.
$$

$Fe_2=(k,1,0)$ なので $\|Fe_2\|^2-\|e_2\|^2=k^2$。[長さ判定](#prop-ctm3-length-criterion)の右辺は $2e_2^TEe_2=2(k^2/2)=k^2$。$\varepsilon$ だけでは二次項を検出しない。
<!-- solution-end -->

### A4. 変位勾配の一次・二次項

$u(X)=(aX_1,bX_2,0)$、$a,b>-1$ とする。$H,\varepsilon,E$ を求め、$E-\varepsilon=H^TH/2$ を各成分で確かめよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$H=\operatorname{diag}(a,b,0)$ なので $\varepsilon=H$。$F=I_3+H=\operatorname{diag}(1+a,1+b,1)$ で、$J=(1+a)(1+b)>0$。従って

$$
E=\frac12\operatorname{diag}((1+a)^2-1,(1+b)^2-1,0)
=\operatorname{diag}(a+a^2/2,b+b^2/2,0).
$$

一方 $H^TH/2=\operatorname{diag}(a^2/2,b^2/2,0)$。成分ごとの差がこの行列に一致し、[線形化命題](#prop-ctm3-linearization)を直接検算できた。
<!-- solution-end -->

## Level B

### B1. 伸びた物体を回転したらひずみはどうなるか

$D=\operatorname{diag}(2,1/2,1)$、$Q=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ とする。$F_1=D$ と $F_2=QD$ の $C,E,U,R,J$ をそれぞれ求め、何が変わり何が不変か述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$F_1=D$ は対称正定値なので

$$
C_1=D^2=\operatorname{diag}(4,1/4,1),\quad
E_1=\operatorname{diag}(3/2,-3/8,0),\quad U_1=D,\ R_1=I_3.
$$

$F_2=QD$ について $Q^TQ=I_3$ だから $C_2=DQ^TQD=D^2=C_1$。従って[剛体回転を重ねたときの有限ひずみの不変性](#prop-ctm3-superposed-rotation)から $E_2=E_1$、$U_2=U_1$。残る $R_2=F_2U_2^{-1}=Q$。両者とも $J=\det Q\det D=1$。有限ひずみと体積は不変だが、現在側の回転 $R$ は変わる。
<!-- solution-end -->

### B2. せん断の極分解を自分で再構成する

$F=\begin{pmatrix}1&2&0\\0&1&0\\0&0&1\end{pmatrix}$ とする。$C$、対称正定値平方根 $U$、$R$ を求め、$U^2=C$、$R^TR=I_3$、$RU=F$ を独立に確かめよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

上左ブロックは $C_2=\begin{pmatrix}1&2\\2&5\end{pmatrix}$。候補

$$
U_2=\frac1{\sqrt2}\begin{pmatrix}1&1\\1&3\end{pmatrix}
$$

を二乗すると

$$
U_2^2=\frac12\begin{pmatrix}2&4\\4&10\end{pmatrix}
=\begin{pmatrix}1&2\\2&5\end{pmatrix}=C_2.
$$

$U_2$ が対称であることは表示から分かる。非零の $z=(z_1,z_2)^T$ に対して

$$
z^TU_2z=\frac1{\sqrt2}\left[(z_1+z_2)^2+2z_2^2\right]>0
$$

なので正定値である。[LA6 の正定値平方根定理](../../../基礎科目/LA/LA6/index.md#thm-la6-psd-square-root)の一意性から $U=\operatorname{diag}(U_2,1)$ となる。さらに

$$
R_2=\frac1{\sqrt2}\begin{pmatrix}1&1\\-1&1\end{pmatrix},
\quad R_2^TR_2=\frac12\begin{pmatrix}2&0\\0&2\end{pmatrix}=I_2.
$$

積は

$$
R_2U_2=\frac12
\begin{pmatrix}1&1\\-1&1\end{pmatrix}
\begin{pmatrix}1&1\\1&3\end{pmatrix}
=\begin{pmatrix}1&2\\0&1\end{pmatrix}.
$$

第3軸は不変なので三次元でも $R^TR=I_3$、$RU=F$、$\det R=1$ である。
<!-- solution-end -->

### B3. 鏡映を零ひずみの回転と誤認しない

$F_-=\operatorname{diag}(-1,1,1)$ と $F_+=\operatorname{diag}(-1,-1,1)$ について $C,E,J$ を求めよ。なぜ一方は運動写像の局所勾配として許されず、他方は許されるかを示し、零ひずみの判定の仮定を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

どちらも $F_\pm^TF_\pm=I_3$ なので $C_\pm=I_3$、$E_\pm=0$。しかし

$$
J_-=-1<0,\qquad J_+=(-1)(-1)(1)=1>0.
$$

$F_-$ は長さを保つが向きを反転する鏡映で、[CTM1 の運動条件](../CTM1/index.md#def-ctm1-motion-configuration)の $J>0$ に反する。$F_+$ は $e_3$ 軸まわりの180度回転であり $F_+^TF_+=I_3$、$\det F_+=1$ を満たす。$E=0$ だけでは任意の行列を回転と断定できず、[零ひずみ条件](#prop-ctm3-length-criterion)では $\det F>0$ が不可欠である。
<!-- solution-end -->

### B4. 小さいひずみと小さい変位勾配は別か

$H_\delta=\delta\begin{pmatrix}0&-1&0\\1&0&0\\0&0&0\end{pmatrix}$、$F_\delta=I_3+H_\delta$（$\delta\in\mathbb R$）とする。$J,E,\varepsilon$ を求め、$E-\varepsilon$ が二次であることを示せ。また、有限回転 $Q(\theta)$ にこの線形化を無条件で適用できない理由を述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

$H_\delta^T=-H_\delta$ なので $\varepsilon=(H_\delta+H_\delta^T)/2=0$。上左ブロックの $F_\delta$ は $\begin{pmatrix}1&-\delta\\\delta&1\end{pmatrix}$ で

$$
J=\det F_\delta=1+\delta^2>0,\qquad
F_\delta^TF_\delta=\operatorname{diag}(1+\delta^2,1+\delta^2,1).
$$

したがって $E=\operatorname{diag}(\delta^2/2,\delta^2/2,0)$。さらに $H_\delta^TH_\delta=\operatorname{diag}(\delta^2,\delta^2,0)$ なので[厳密展開](#prop-ctm3-linearization)と一致する。$F_\delta$ 自体は純回転ではなく、二次の伸長を含む。

一方、$Q(\theta)-I_3$ のノルムは一般に小さくない。例えば $\theta=\pi/2$ では $Q^TQ=I_3$ による真の $E=0$ を、$\varepsilon=\operatorname{diag}(-1,-1,0)$ と誤判定する。線形化に必要なのは $D_Xu$ の小ささであり、「$F$ は何かの回転に近い」という条件ではない。
<!-- solution-end -->

## Level C

### C1. 体積保存の伸縮に時間依存回転を重ねる

$\Omega_0=\mathbb R^3$、$I=(-1\,\mathrm{s},1\,\mathrm{s})$、$\tau=t/(1\,\mathrm{s})$ とし、$\theta(t)=\pi\tau/2$、$c(t)=\tau(1\,\mathrm{m})e_1$ とする。$Q(\theta)$ は本章の $e_3$ 軸回転とし、

$$
\chi(X,t)=c(t)+Q(\theta(t))
\operatorname{diag}\left(1+\tau,\frac1{1+\tau},1\right)X
$$

を考える。

1. $t=0$ の条件、正則性、単射性、$J>0$ を確かめよ。
2. 一般の $t$ で $F,C,E,U,R$ と主伸長を求めよ。
3. $\tau=1/2$ で有限ひずみの主値と $J$ を計算せよ。
4. 同時刻の微小ひずみ $\varepsilon=\operatorname{sym}(F-I_3)$ を求め、有限ひずみと比較せよ。
5. 任意の固定時刻に回転 $Q(\varphi)$ をさらに重ねた場合、何が変化し何が変化しないか、式で説明せよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

**(1) 運動条件。** $\tau=0$ では $c(0)=0$、$\theta(0)=0$、伸縮の対角行列は $I_3$ なので $\chi(X,0)=X$。区間内で $1+\tau>0$、$\theta,c$ も滑らかである。$D=\operatorname{diag}(1+\tau,(1+\tau)^{-1},1)$ と置けば、任意の $x$ について

$$
X=D^{-1}Q(\theta)^T(x-c(t))
$$

が唯一の逆像だから単射である。$F=QD$、$\det Q=1$、$\det D=1$ より $J=1>0$。これで四条件が確かめられた。

**(2) 極分解と有限ひずみ。** $Q^TQ=I_3$ から

$$
\begin{aligned}
C&=D^TQ^TQD
=\operatorname{diag}((1+\tau)^2,(1+\tau)^{-2},1),\\
E&=\frac12\operatorname{diag}((1+\tau)^2-1,(1+\tau)^{-2}-1,0).
\end{aligned}
$$

$D$ は対称正定値かつ $D^2=C$ なので、[LA6 の極分解](../../../基礎科目/LA/LA6/index.md#thm-la6-polar)の可逆時の一意性より $U=D$、$R=Q(\theta)$。主伸長は $1+\tau,(1+\tau)^{-1},1$（数値の大きさ順とは限らない）。

**(3) 特定時刻。** $\tau=1/2$ で $D=\operatorname{diag}(3/2,2/3,1)$。従って

$$
C=\operatorname{diag}(9/4,4/9,1),\quad
E=\operatorname{diag}(5/8,-5/18,0),\quad J=1.
$$

固有方向は各基準座標軸である。伸びと縮みの積が $1$ でも有限ひずみはゼロではない。

**(4) 微小ひずみとの比較。** この時刻は $\theta=\pi/4$ なので $q=\cos\theta=\sin\theta=1/\sqrt2$ と書くと

$$
F=\begin{pmatrix}
3q/2&-2q/3&0\\
3q/2&2q/3&0\\
0&0&1
\end{pmatrix}.
$$

$H=F-I_3$ を転置と平均すると

$$
\varepsilon=\frac12(H+H^T)
=\begin{pmatrix}
3q/2-1&5q/12&0\\
5q/12&2q/3-1&0\\
0&0&0
\end{pmatrix}.
$$

厳密な $E$ は対角行列だが $\varepsilon$ には非対角成分 $5q/12$ が残る。これは大きな回転・伸縮を $H$ の一次だけで表したためで、[線形化誤差](#prop-ctm3-linearization)の条件 $\|H\|\ll1$ を確認できない設定である。

**(5) 追加回転。** $x^\ast=Q(\varphi)x$ なら $F^\ast=Q(\varphi)F$、$R^\ast=Q(\varphi)Q(\theta)$。一方

$$
C^\ast=F^TQ(\varphi)^TQ(\varphi)F=C,
\qquad E^\ast=E,\quad U^\ast=U,\quad J^\ast=J.
$$

[重ねた回転の不変性](#prop-ctm3-superposed-rotation)により、回転は変わっても主伸長と有限ひずみは変わらない。
<!-- solution-end -->

---

**次講への接続。** 今回は固定時刻の形の変化を扱った。CTM4 では運動の時間微分から速度勾配を作り、回転している観測系でひずみ速度がどう変わるかを調べる。有限ひずみ $E$ と速度に関する量を混同しないことが出発点となる。
