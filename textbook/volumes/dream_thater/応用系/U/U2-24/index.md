# U2-24 グラフ SLAM の数値解：Gauss–Newton と gauge 固定

[U2-23 の Gaussian 因子から得た目的関数](../U2-23/index.md#thm-u2-23-map-objective)は、運動・観測の残差を二乗して足す式です。しかし、残差が姿勢角を通じて非線形になると、前講のように固定行列を一度解くだけでは足りません。また、相対測定ばかりなら原点や向きを同時に変えても測定は変化せず、行列が特異になります。

本講の中心問いは、**どの点で残差を一次近似し、どの未知量を直し、何を固定すれば数値解が意味を持つか**です。まず一次元で全計算を再現し、次に平面姿勢の微分と三つの座標自由度を確認します。既知のデータ対応、固定正定値の観測共分散、評価点近傍で滑らかな角度残差の枝を仮定します。角度の枝をまたぐ操作には局所的な一次近似を無条件には適用しません。

<!-- definition-example-audit: strict -->

## 1. 残差を現在の推定点で直線にする

未知量を一つの列ベクトル $q\in\mathbb R^n$ に並べ、因子 $a$ の残差を $e_a(q)\in\mathbb R^{d_a}$、正定値の重みを $\Omega_a\in\mathbb R^{d_a\times d_a}$ とします。[因子の重み付け](../U2-23/index.md#def-u2-23-gaussian-factor)に従い、最小化する量は

$$
F(q)=\frac12\sum_a e_a(q)^{\mathsf T}\Omega_a e_a(q).
$$

非線形とは、例えば $e(x)=x^2-4$ のように $x$ を動かすと増分が一定ではないことです。現在値 $x=3$ で $x$ を $\delta$ だけ変えると

$$
e(3+\delta)=(3+\delta)^2-4=5+6\delta+\delta^2.
$$

小さな $\delta$ に対し、最後の二次項だけをいったん落として $5+6\delta$ を解きます。この操作を全因子に拡張したものが **Gauss–Newton 線形化**です。

ここで使う **Jacobi 行列**は、[U2-09 で導入した一次近似の行列](../U2-09/index.md#def-u2-09-linearization-points)と同じ考え方です。残差の第 $\ell$ 成分 $e_{a,\ell}$ を未知量の第 $j$ 成分 $q_j$ で偏微分した値が $J_a$ の $(\ell,j)$ 成分です。したがって $J_a$ は $d_a\times n$ 行列で、$J_a\delta$ は各残差の一次変化を表す $d_a$ 次元列ベクトルになります。全因子の残差を縦に並べた $e(q)$ の Jacobi 行列を $J(q)$ と書き、現在点での値 $J=J(q^{(k)})$ は各 $J_a$ を縦に積み重ねた行列です。$D e_a(q)$ は「$q$ を動かして残差 $e_a$ を微分する」記法であり、$D e_a(q)=J_a$ です。

<a id="def-u2-24-linearization"></a>

<!-- formal-statement-start -->
> **定義（Gauss–Newton の局所線形化）**  
> 開集合 $U\subseteq\mathbb R^n$ の点 $q^{(k)}\in U$ の近傍で各残差 $e_a:U\to\mathbb R^{d_a}$ が連続微分可能とする。現在点 $q^{(k)}$ における Jacobi 行列を $J_a=D e_a(q^{(k)})\in\mathbb R^{d_a\times n}$、残差値を $r_a=e_a(q^{(k)})$ と置き、増分 $\delta\in\mathbb R^n$ に対する局所二次モデルを

$$
M_k(\delta)=\frac12\sum_a(r_a+J_a\delta)^{\mathsf T}
\Omega_a(r_a+J_a\delta)
$$

> とする。これを最小化して増分を選び、許容された増分について $q^{(k+1)}=q^{(k)}+\alpha\delta$ と更新する。$\alpha=1$ が全ステップ、$0<\alpha<1$ が縮小ステップである。角度成分を含む場合は局所座標で増分を解釈し、更新後の角度を [wrap 規約](../U2-06/index.md#def-u2-06-angle-wrap)で表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-24-linearization -->
**定義の確認**：一変数 $e(x)=x^2-4$ では $n=d_1=1$、$q^{(0)}=3$、$\Omega_1=1$ です。残差関数は多項式なので全実数上で連続微分可能であり、重み1も正定値です。出力と入力がともに1成分のため、Jacobi 行列は微分係数を唯一の成分とする $1\times1$ 行列です。

$$
r=e(3)=5,\qquad J=D e(3)=e'(3)=6,\qquad
M_0(\delta)=\frac12(5+6\delta)^2.
$$

$\delta=-5/6$ はこの局所モデルの残差を0にしますが、元の残差は

$$
e(3-5/6)=e(13/6)=\frac{169}{36}-4=\frac{25}{36}\ne0.
$$

最初の $x=3$ での真の目的関数は $25/2$、更新後は $625/2592$ です。**局所モデルの予測値と実際の目的関数値は区別**します。
<!-- definition-example-end -->

## 2. 疎な正規方程式を因子ごとに組み立てる

局所モデルの $\delta$ に関する一次項を求めます。各 $\Omega_a$ は対称なので、二次形式を展開すると

$$
2M_k(\delta)=\sum_a\left\{
r_a^{\mathsf T}\Omega_a r_a+
2\delta^{\mathsf T}J_a^{\mathsf T}\Omega_a r_a+
\delta^{\mathsf T}J_a^{\mathsf T}\Omega_a J_a\delta
\right\}.
$$

この展開の中央項が勾配、最後の項が局所モデルの曲率を作ります。

<a id="thm-u2-24-normal-equations"></a>

<!-- formal-statement-start -->
> **定理（重み付き Gauss–Newton 正規方程式）**  
> [局所線形化](#def-u2-24-linearization)の仮定の下で、重み $\Omega_a$ が対称正定値とする。次の $n\times n$ 行列 $H_k$ と $n$ 次元列ベクトル $g_k$ を置く。

$$
H_k=\sum_a J_a^{\mathsf T}\Omega_aJ_a,\qquad
g_k=\sum_a J_a^{\mathsf T}\Omega_ar_a.
$$

> $H_k$ は対称半正定値である。$M_k$ が最小点を持つなら、その全ては

$$
H_k\delta=-g_k
$$

> を満たし、逆にこの方程式の任意の解は $M_k$ の最小点である。積み重ねた Jacobi 行列 $J$ が列フルランクなら $H_k\succ0$ で、増分は一意である。各 $J_a$ の変数ブロック $i,j$ が同じ因子に現れなければ、$H_k$ の対応する非対角ブロックは0である。
<!-- formal-statement-end -->

**証明の見取り図**：因子ごとに $J_a^{\mathsf T}\Omega_aJ_a$ を足します。正規方程式が可解なことと、行列が可逆なことは違います。

<!-- proof-start -->
### 証明

上の展開をまとめれば

$$
M_k(\delta)=M_k(0)+g_k^{\mathsf T}\delta
+\frac12\delta^{\mathsf T}H_k\delta,\quad
\nabla_\delta M_k=g_k+H_k\delta.
$$

ここで $\nabla_\delta$ は、現在点 $q^{(k)}$ を固定したまま増分 $\delta$ の各成分で偏微分する勾配です。[無制約最小点の一階必要条件](../../../計算系/NA/NA12/index.md#prop-na12-first-order-necessary)をこの全空間上の二次関数へ適用すると、最小点では $\nabla_\delta M_k=0$、すなわち正規方程式が成り立ちます。逆に解 $\delta_*$ があれば、$g_k=-H_k\delta_*$ を上の二次式に代入すると交差項が相殺され、任意の $v$ について

$$
M_k(\delta_*+v)-M_k(\delta_*)
=\frac12v^{\mathsf T}H_kv\ge0.
$$

また非零の $v$ に対して

$$
v^{\mathsf T}H_kv
=\sum_a(J_av)^{\mathsf T}\Omega_a(J_av)\ge0
$$

で、等号は全ての $J_av=0$ のときに限ります（$\Omega_a$ の正定値性）。したがって $H_k\succ0$ と $\ker J=\{0\}$ は同値です。最後に、$J_a$ の $i,j$ 列ブロックの少なくとも片方が0なら、その因子の $(i,j)$ 寄与は0です。全因子について足しても0のままです。
<!-- proof-end -->

実際には巨大な密行列 $J$ を作らず、**各因子が関係する変数ブロックだけ**へ $J_a^{\mathsf T}\Omega_aJ_a$ と $J_a^{\mathsf T}\Omega_ar_a$ を加算できます。ただし、疎な $H_k$ を消去すると順序次第で途中に非零要素が増えます。疎であることは計算量の無条件の保証ではなく、解法・変数の消去順も重要です。

**数値実装の原則**：正定値な固定 gauge の問題なら Cholesky 分解などを利用できますが、条件数が悪いと正規方程式では丸め誤差を増幅します。小規模の検算は正規方程式で行い、大規模・不良条件の問題では白色化した Jacobi 行列に対する QR 分解、適切な疎解法や減衰法も検討します。数式上の可逆性と浮動小数点計算の安定性を同一視しません。

## 3. 線形因子なら一度で終わる

前講の4変数 $(x_0,x_1,x_2,m)$、5因子の例をもう一度、**反復アルゴリズムの一回目**として解きます。事前 $x_0=0$、移動測定2本はそれぞれ1、相対目印観測2本はそれぞれ2、誤差は独立で分散1です。[前講の線形因子](../U2-23/index.md#prop-u2-23-linear-structure)により

$$
e(q)=Aq-b,\quad
A=\begin{pmatrix}
1&0&0&0\\-1&1&0&0\\0&-1&1&0\\0&-1&0&1\\0&0&-1&1
\end{pmatrix},\quad
b=\begin{pmatrix}0\\1\\1\\2\\2\end{pmatrix}.
$$

初期点 $q^{(0)}=0$ では $r=-b,J=A$ なので、[正規方程式](#thm-u2-24-normal-equations)の右辺は $-g=A^{\mathsf T}b$ です。各行ベクトルの転置と元の行ベクトルの積を加算して

$$
H=\begin{pmatrix}
2&-1&0&0\\-1&3&-1&-1\\0&-1&2&-1\\0&-1&-1&2
\end{pmatrix},\qquad
-g=\begin{pmatrix}-1\\-2\\-1\\4\end{pmatrix}.
$$

第3・第4行から $2x_2-m=x_1-1$、$2m-x_2=x_1+4$ となり、後者へ前者を代入すると

$$
m=2x_2-x_1+1,\quad 3x_2=3x_1+2,\quad
x_2=x_1+\frac23,\quad m=x_1+\frac73.
$$

第2行へ戻すと $x_1-x_0=1$、第1行は $2x_0-x_1=-1$ だから $x_0=0,x_1=1$ です。従って一回の全ステップで

$$
q^{(1)}=\begin{pmatrix}0\\1\\5/3\\10/3\end{pmatrix},\quad
e(q^{(1)})=\begin{pmatrix}0\\0\\-1/3\\1/3\\-1/3\end{pmatrix},\quad
F(q^{(1)})=\frac16.
$$

初期値で $F(q^{(0)})=(1+1+4+4)/2=5$。線形モデルでは一次近似に捨てた項がないため、同じ正規方程式をもう一度組んでも増分は0です。逆に**非線形因子では毎回の点で $r,J$ を再評価**しなければなりません。

## 4. gauge は解法の失敗でなく、観測模型の対称性

[U2-21 の gauge 変換](../U2-21/index.md#def-u2-21-gauge)は、物理的には同じ軌跡・地図を別の座標基準で書く操作です。相対測定は両者を区別できません。これを行列上で調べるには、測定を変えずに未知量だけを少し動かす方向を考えます。以下の $s$ はその変換を動かす実数パラメータで、$\frac{d}{ds}$ は状態 $q$ を固定し $s$ だけを変化させた導関数です。$J(q)=D e(q)$ は第1節で述べた全残差の Jacobi 行列です。

<a id="def-u2-24-gauge-fixing"></a>

<!-- formal-statement-start -->
> **定義（gauge の零方向と基準固定）**  
> 残差 $e(q)$ を変えない微分可能な座標変換 $T_s$ があり、$T_0(q)=q$ を満たすとする。その点での変化率を **gauge 方向**と呼ぶ。

$$
v=\left.\frac{d}{ds}T_s(q)\right|_{s=0},\qquad J(q)v=0.
$$

> 後者の式は[合成関数の連鎖律](../../../基礎科目/RA/RA3/index.md#prop-ra3-chain-rule)による。基準となる絶対位置・姿勢の座標値を指定し、その自由度を未知量から取り除く操作を **基準姿勢の固定（hard gauge 固定）**とする。有限分散の独立な Gaussian 事前を加える **soft 基準因子**は、未知量を残したまま有限の重みで基準情報を追加する操作であり、hard 固定とは異なる。
<!-- formal-statement-end -->

導関数が零方向になる理由を、省略せず確認します。不変性 $e(T_s(q))=e(q)$ の両辺を $s$ で微分します。左辺は合成関数なので

$$
0=\left.\frac{d}{ds}e(T_s(q))\right|_{s=0}
=D e(T_0(q))\left.\frac{dT_s(q)}{ds}\right|_{s=0}
=J(q)v.
$$

ここで $T_0(q)=q$ を使用しました。変換の導関数を単に「行列の固有ベクトル」と読み替えているのではなく、**残差不変性という元の条件**から $\ker J(q)$ に属することを導いています。

<!-- definition-example-start: def-u2-24-gauge-fixing -->
**定義の確認**：未知 $(x_0,x_1)$ に残差 $x_1-x_0-1$ だけがあるとき、$T_s(x_0,x_1)=(x_0+s,x_1+s)$ です。変化率は $v=(1,1)^{\mathsf T}$、$J=(-1,1)$ で $Jv=-1+1=0$ となり、定義の全条件を直接確認できます。$x_0=0$ を hard 固定すれば $x_1$ だけを解き、有限分散の事前 $\tfrac12 w_0 x_0^2$ を加えれば $x_0$ も未知量ですが重み付きで基準へ引き寄せます。
<!-- definition-example-end -->

<a id="thm-u2-24-gauge-null"></a>

<!-- formal-statement-start -->
> **定理（相対因子の零方向と hard 固定）**  
> 1次元の未知位置 $x_0,\ldots,x_{n-1}$ について、連結な無向グラフの各辺 $(i,j)$ に正の重みを持つ相対位置残差を置く。

$$
e_{ij}(x)=x_j-x_i-d_{ij},\qquad w_{ij}>0.
$$

> これらだけから組み立てた情報行列 $H$ の核は、全位置の共通移動方向だけである。

$$
\ker H=\operatorname{span}\{\boldsymbol1\},\qquad
\boldsymbol1=(1,\ldots,1)^{\mathsf T}.
$$

> 任意の一節点 $x_0$ を数値として hard 固定し、残りの変数について正規方程式を作ると、その縮約情報行列は正定値になる。連結性を落とすと、固定節点とつながらない成分の共通移動方向が残る。
<!-- formal-statement-end -->

**証明の見取り図**：各辺が測るのは差だけです。二次形式が0なら、すべての辺の両端で増分が等しく、連結性がそれを全節点へ伝えます。

<!-- proof-start -->
### 証明

任意の増分 $v=(v_i)$ について、情報行列の二次形式は

$$
v^{\mathsf T}Hv=\sum_{(i,j)}w_{ij}(v_j-v_i)^2,\qquad w_{ij}>0.
$$

$v=\boldsymbol1$ なら各項が0です。逆に合計が0なら各非負項が0で $v_i=v_j$ が全辺で成立します。連結グラフの任意の節点へ辺の列をたどれるから、すべての $v_i$ が同じ値になり、核は指定した一次元です。

hard 固定した節点の増分は $v_0=0$ です。縮約二次形式が0なら元の全辺について同じ議論が成り立ち、全 $v_i=v_0=0$ となります。よって縮約行列は正定値です。非連結なら固定節点と別の連結成分の全 $v_i$ に同じ非零値を置けば、全辺の差は0のままです。
<!-- proof-end -->

**2節点の小行列**：$e=x_1-x_0-1$ とすれば

$$
J=(-1,1),\qquad H=J^{\mathsf T}J=
\begin{pmatrix}1&-1\\-1&1\end{pmatrix},\qquad
H\begin{pmatrix}1\\1\end{pmatrix}=0.
$$

$(x_0,x_1)=(0,2)$ からの右辺は $-J^{\mathsf T}e=(1,-1)^{\mathsf T}$。方程式の解は $(\delta_0,\delta_1)=(t,t-1)$ と無限に存在します。$x_0=0$ を固定すれば $\delta_0=0,\delta_1=-1$、結果は $(0,1)$ です。正規方程式の特異性は「数値計算が壊れた」のではなく、**相対測定だけで絶対原点を推定しようとした**ことに由来します。

soft 基準 $w_0x_0^2/2$（$w_0>0$）なら

$$
H_{\rm soft}=\begin{pmatrix}1+w_0&-1\\-1&1\end{pmatrix},\qquad
v^{\mathsf T}H_{\rm soft}v=w_0v_0^2+(v_1-v_0)^2>0
$$

が任意の非零 $v$ で成立します。**hard 固定と有限重みの事前は別の推定問題**です。後者は本当に独立な基準情報が得られた場合には統計的な意味を持ちますが、単なる座標規約なら不確実性の解釈を分ける必要があります。

## 5. 平面姿勢では回転の自由度も残る

平面姿勢 $g_i=(p_i,\theta_i)$、$p_i\in\mathbb R^2$ に対し、[U2-23 の姿勢因子](../U2-23/index.md#def-u2-23-gaussian-factor)で扱った相対運動残差を

$$
e_{ij}=
\begin{pmatrix}
R(\theta_i)^{\mathsf T}(p_j-p_i)-\bar d_{ij}\\
\operatorname{wrap}(\theta_j-\theta_i-\bar\delta_{ij})
\end{pmatrix}
$$

と置きます。測定 $\bar d_{ij}$ はロボット $i$ の座標で表す二次元変位です。$R(\theta)$ は[平面姿勢の座標変換に用いる回転行列](../U2-06/index.md#def-u2-06-rigid-transform)、$S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ は平面の90度回転行列です。ここで $R'(\theta)$ は角度 $\theta$ に関する導関数 $dR(\theta)/d\theta$ を表し、時刻微分ではありません。[回転行列の基底表示](../U2-06/index.md#def-u2-06-rigid-transform)を成分ごとに微分すると

$$
R'(\theta)=\begin{pmatrix}
-\sin\theta&-\cos\theta\\
\cos\theta&-\sin\theta
\end{pmatrix}
=R(\theta)S=SR(\theta).
$$

$D_{p_i}u$ は他の成分を固定して位置ベクトル $p_i$ の二成分で偏微分した $2\times2$ 行列、$D_{\theta_i}u$ は同じく角度 $\theta_i$ で微分した $2\times1$ 列です。これらを、残差のどの成分がどの未知量で変わるかに応じて並べます。

<a id="prop-u2-24-pose-jacobian"></a>

<!-- formal-statement-start -->
> **命題（平面相対姿勢因子の Jacobi 行列）**  
> 上の残差を考え、角度差の wrap が微分可能な一つの枝の内部にあるとする。列順を $(p_i,\theta_i,p_j,\theta_j)$ とすると、位置ブロックおよび角度列の局所微分は

$$
J_i=\begin{pmatrix}
-R_i^{\mathsf T}&-S R_i^{\mathsf T}(p_j-p_i)\\
0_{1\times2}&-1
\end{pmatrix},\quad
J_j=\begin{pmatrix}
R_i^{\mathsf T}&0_{2\times1}\\
0_{1\times2}&1
\end{pmatrix},\quad R_i=R(\theta_i).
$$

> $J_i,J_j$ はそれぞれ $3\times3$ で、全因子 Jacobi 行列ではそれ以外の姿勢列ブロックが0となる。
<!-- formal-statement-end -->

**証明の見取り図**：位置差をロボット $i$ の座標へ戻した後で微分します。$R_i^{\mathsf T}$ 自体が $\theta_i$ に依存するため、角度列は0ではありません。

<!-- proof-start -->
### 証明

位置残差を $u=R_i^{\mathsf T}(p_j-p_i)-\bar d_{ij}$ と書き、$p_i,p_j$ を一方ずつ動かすと

$$
D_{p_i}u=-R_i^{\mathsf T},\qquad D_{p_j}u=R_i^{\mathsf T}.
$$

$R_i^{\mathsf T}=R(-\theta_i)$ なので

$$
\frac{dR_i^{\mathsf T}}{d\theta_i}
=-S R_i^{\mathsf T},
\qquad D_{\theta_i}u=-S R_i^{\mathsf T}(p_j-p_i),
\qquad D_{\theta_j}u=0.
$$

角度の枝の内部では $\operatorname{wrap}$ の導関数は1で、角度残差 $\theta_j-\theta_i-\bar\delta_{ij}$ の微分は $(-1,1)$ です。両者を3行に積み上げると命題の行列になります。
<!-- proof-end -->

**定義から行列への橋渡しの数値例**：$p_i=(0,0),\theta_i=0$、$p_j=(2,1),\theta_j=\pi/6$、測定 $(\bar d_{ij},\bar\delta_{ij})=((2,1),\pi/6)$ とします。予測と測定が一致し、残差は0です。$R_i=I$ で $-S(2,1)^{\mathsf T}=(1,-2)^{\mathsf T}$ だから

$$
J_i=\begin{pmatrix}-1&0&1\\0&-1&-2\\0&0&-1\end{pmatrix},
\qquad
J_j=\begin{pmatrix}1&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

例えば $\theta_i$ だけ小さく $\varepsilon$ 増やすと、残差の一次変化は $(\varepsilon,-2\varepsilon,-\varepsilon)^{\mathsf T}$ です。**角度を変えたときに位置成分も変わる**ことが分かります。

<a id="prop-u2-24-planar-gauge"></a>

<!-- formal-statement-start -->
> **命題（平面の共通剛体変換による gauge）**  
> 平面姿勢と静止ランドマークの相対観測だけから成る、共通世界座標変換と整合する残差を考える。任意の平行移動 $t\in\mathbb R^2$ と回転角 $\phi\in\mathbb R$ について、全位置と全姿勢角を一斉に次のように取り替える。

$$
p'_i=R(\phi)p_i+t,\quad
m'_j=R(\phi)m_j+t,\quad
\theta'_i=\theta_i+\phi.
$$

> この変換で残差は不変である。角度差の微分可能な局所枝の内部では、全状態 Jacobi 行列は共通の2方向の平行移動と1方向の回転に対応する三つの独立な零方向を持つ。観測不足などによる追加の零方向が存在する可能性は排除しない。
<!-- formal-statement-end -->

**証明の見取り図**：同じ世界座標の平行移動は差で消え、共通回転はロボット座標への逆回転と打ち消し合います。その連続対称性を微分すると Jacobi 行列の核になります。

<!-- proof-start -->
### 証明

共通変換後の相対位置予測は

$$
R(\theta_i+\phi)^{\mathsf T}
\left\{R(\phi)p_j+t-R(\phi)p_i-t\right\}
=R(\theta_i)^{\mathsf T}R(\phi)^{\mathsf T}
R(\phi)(p_j-p_i)=R(\theta_i)^{\mathsf T}(p_j-p_i).
$$

角度差は $(\theta_j+\phi)-(\theta_i+\phi)=\theta_j-\theta_i$ です。ランドマークのロボット相対ベクトルも

$$
R(\theta_i+\phi)^{\mathsf T}
\{R(\phi)m_j+t-(R(\phi)p_i+t)\}
=R(\theta_i)^{\mathsf T}(m_j-p_i)
$$

で不変であり、距離と局所相対方位も同じです。

共通平行移動をそれぞれ $(1,0),(0,1)$ の方向で微分すると、全位置に同じ単位ベクトル、全角度に0を置く二つの増分方向が得られます。$\phi=0$ で共通回転を微分すると、各位置の増分は $Sp_i,Sm_j$、各角度は1です。残差が変換に沿って定数だから連鎖律より $Jv=0$。この回転方向は角度成分が1なので平行移動の二方向と独立です。
<!-- proof-end -->

2次元 SLAM では、ある姿勢 $g_0$ の位置二成分と角度一成分を hard 固定すれば**共通の三自由度**は消せます。ただし、グラフが切れている場合や幾何的に観測できない変数がある場合には、縮約 Jacobi 行列がなお列フルランクとは限りません。平面回転を固定しても、非線形目的関数の局所最小点の存在・大域一意性まで保証するものではありません。

## 6. ステップ幅と停止判定：解くことと改善することは違う

Gauss–Newton の全ステップは必ず目的関数を下げるわけではありません。$e(x)=x^2-4$ に $x=1/2$ から適用すると、$r=-15/4,J=1$、正規方程式は $\delta=15/4$ を与えます。全ステップでは $x=17/4$ となり、

$$
F(1/2)=\frac{225}{32},\qquad
F(17/4)=\frac12\left(\frac{225}{16}\right)^2=\frac{50625}{512}
$$

で大きく悪化します。$\alpha=1/4$ なら $x=23/16$ で、

$$
F(23/16)=\frac12\left(-\frac{495}{256}\right)^2
=\frac{245025}{131072}<\frac{225}{32}.
$$

この節で用いる $g$ が**局所モデルだけ**の勾配ではなく、現在点における元の $F$ の勾配とも一致することを確かめます。重みは $q$ に依存しないため、連鎖律と $\Omega_a^{\mathsf T}=\Omega_a$ により、任意の方向 $v$ について

$$
D F(q)[v]
=\sum_a e_a(q)^{\mathsf T}\Omega_a D e_a(q)v
=\left\{\sum_a D e_a(q)^{\mathsf T}\Omega_a e_a(q)\right\}^{\mathsf T}v.
$$

したがって第2節の $g_k$ は $q=q^{(k)}$ での $\nabla F(q)$ に等しくなります。以下の $\alpha$ は、現在点を固定して方向 $\delta$ へ進む長さを指定する実数です。

<a id="prop-u2-24-descent"></a>

<!-- formal-statement-start -->
> **命題（フルランク Gauss–Newton 方向の局所降下性）**  
> $F$ が連続微分可能で重みが固定正定値、現在点の積み重ね Jacobi 行列が列フルランクとする。$g=\nabla F(q)\ne0$ なら、正規方程式の唯一の解 $\delta=-H^{-1}g$ は

$$
\nabla F(q)^{\mathsf T}\delta=-\delta^{\mathsf T}H\delta<0
$$

> を満たし、十分小さい正のステップ幅 $\alpha$ では $F(q+\alpha\delta)<F(q)$ となる。ただし全ステップ $\alpha=1$ による改善は保証しない。
<!-- formal-statement-end -->

**証明の見取り図**：正規方程式の両辺へ増分を掛けると降下方向だと分かります。そこから微分可能性の定義で小さな正のステップの改善が出ます。

<!-- proof-start -->
### 証明

$H\succ0$ だから $\delta=-H^{-1}g$ が一意に存在し、$g\ne0$ なら $\delta\ne0$ です。$H\delta=-g$ に左から $\delta^{\mathsf T}$ を掛けて $g^{\mathsf T}\delta=-\delta^{\mathsf T}H\delta<0$。微分可能性より

$$
F(q+\alpha\delta)=F(q)+\alpha g^{\mathsf T}\delta+o(\alpha)
\qquad(\alpha\downarrow0).
$$

$o(\alpha)/\alpha\to0$（$\alpha\downarrow0$）だから、$g^{\mathsf T}\delta<0$ に対して十分小さい $\alpha>0$ を選べば、一次項 $\alpha g^{\mathsf T}\delta$ の絶対値は剰余より大きくなり、右辺は $F(q)$ 未満です。これは [NA12 の降下方向命題](../../../計算系/NA/NA12/index.md#prop-na12-descent-direction)の仮定を本章の $F$ と $\delta$ で具体的に確認したことにもなります。
<!-- proof-end -->

実装では、候補点の**本来の非線形残差**を再計算して改善を確かめます。更新後も最大残差だけでなく、$F$ の変化、増分の大きさ、勾配の大きさを合わせて観察します。小さい増分でも強い悪条件や不適切な線形化から停滞することがあります。特異な $H$ を「微小な対角項を足せば gauge を解決した」と解釈するのも危険です。減衰は数値的な手段であり、座標基準の統計的意味を勝手には与えません。

## 7. Python：小行列・反復・零方向を再実行する

乱数を使わず、一次元の単位分散5因子、非線形残差 $x^2-4$、および平面姿勢2節点を用います。有理数で線形例の $H,\delta,F$、無基準の零方向と特異性、非線形の全ステップ失敗・縮小ステップ成功を検算し、平面では解析 Jacobi 行列と数値差分を突き合わせます。平面姿勢の移動はメートル、角度はラジアンとし、角度測定は枝の内部に固定します。標準ライブラリのみで実行します。

# lab-id: U2-24-GN
# lab-title: Gauss–Newton・gauge・姿勢 Jacobi 行列の再計算
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-24/assets/graph_slam_gn.py
# timeout-ms: 30000
# lab-preset: 線形因子の一回解法 | --scenario linear
# lab-preset: gauge 未固定の特異性 | --scenario gauge
# lab-preset: 非線形ステップ幅 | --scenario nonlinear
# lab-preset: 全自己検算 | --self-test

[Python ソースを読む](assets/graph_slam_gn.py)

## 8. 演習：手で正規方程式を解き、誤りを診断する

### Level A：一次近似と零方向

<a id="ex-u2-24-a01"></a>

**A1. 1変数の Gauss–Newton**

- Level: A

$F(x)=(x^2-4)^2/2$、初期値 $x=3$ とする。$r,J,H,g,\delta$ と更新後の真の $F$ を求めよ。

<!-- solution-start -->
**詳細解答**： [局所線形化の定義](#def-u2-24-linearization)で評価点 $x=3$ を固定します。残差とその微分は

$$
r=e(3)=3^2-4=5,\qquad J=e'(3)=2\cdot3=6.
$$

重みは1なので [正規方程式](#thm-u2-24-normal-equations)は

$$
H=J^{\mathsf T}J=36,\qquad g=J^{\mathsf T}r=30,\qquad
36\delta=-30.
$$

従って $\delta=-5/6$、更新後の点は $x^{(1)}=3-5/6=13/6$ です。ここで**元の残差関数を再評価**すると

$$
e(13/6)=\frac{169}{36}-4=\frac{25}{36},\qquad
F(x^{(1)})=\frac12\left(\frac{25}{36}\right)^2
=\frac{625}{2592}.
$$

局所モデルの残差 $5+6\delta$ は0ですが、捨てた二次項が元の目的関数に残っています。
<!-- solution-end -->

<a id="ex-u2-24-a02"></a>

**A2. 2成分の重みを付ける**

- Level: A

未知数 $q$ からの残差を $e(q)=(q-1,2q+1)^{\mathsf T}$、$\Omega=\operatorname{diag}(4,1)$、初期点 $q=0$ とする。$H,g,\delta$ と更新前後の目的関数を求めよ。

<!-- solution-start -->
**詳細解答**： 2成分の残差を1変数 $q$ で微分するため、Jacobi 行列は $2\times1$ です。初期点 $q=0$ で

$$
r=\begin{pmatrix}-1\\1\end{pmatrix},\qquad
J=\begin{pmatrix}1\\2\end{pmatrix},\qquad
\Omega=\begin{pmatrix}4&0\\0&1\end{pmatrix}.
$$

これらを [重み付き正規方程式](#thm-u2-24-normal-equations)へ代入します。

$$
\begin{aligned}
H&=J^{\mathsf T}\Omega J=1^2\cdot4+2^2\cdot1=8,\\
g&=J^{\mathsf T}\Omega r=1\cdot4(-1)+2\cdot1(1)=-2,\\
8\delta&=-g=2,\qquad\delta=\frac14.
\end{aligned}
$$

初期値と更新後の**真の**目的関数は

$$
\begin{aligned}
F(0)&=\frac12\{4(-1)^2+1^2\}=\frac52,\\
e(1/4)&=(-3/4,3/2)^{\mathsf T},\\
F(1/4)&=\frac12\left\{4\frac9{16}+\frac94\right\}=\frac94.
\end{aligned}
$$

二成分の測定誤差は同じ分散でないため、重みを省いた通常の二乗和で比較してはいけません。
<!-- solution-end -->

<a id="ex-u2-24-a03"></a>

**A3. 2節点の零方向**

- Level: A

$e=x_1-x_0-1$、単位重みとする。$J,H$ を求め、$(1,1)^{\mathsf T}$ が零方向であることを行列積で検算せよ。

<!-- solution-start -->
**詳細解答**： 残差 $x_1-x_0-1$ を $(x_0,x_1)$ で偏微分すると

$$
J=\begin{pmatrix}-1&1\end{pmatrix},\qquad
H=J^{\mathsf T}J=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$

実際に行列を掛けると

$$
H\begin{pmatrix}1\\1\end{pmatrix}
=\begin{pmatrix}1-1\\-1+1\end{pmatrix}
=\begin{pmatrix}0\\0\end{pmatrix}.
$$

両位置を同時に1だけ動かしても相対差は不変です。これは [gauge 零方向の定義](#def-u2-24-gauge-fixing)に一致します。さらに $\det H=1\cdot1-(-1)(-1)=0$ なので、$H^{-1}$ は存在しません。
<!-- solution-end -->

<a id="ex-u2-24-a04"></a>

**A4. hard 固定と soft 事前**

- Level: A

A3 の模型で $x_0=0$ を hard 固定するときの未知増分の数と縮約 $H$ を述べよ。また $x_0$ に重み4の独立事前を加えた soft 模型の $H$ と正定値性を確認せよ。

<!-- solution-start -->
**詳細解答**： [hard 固定の定義](#def-u2-24-gauge-fixing)では $x_0=0$ を未知量から外し、増分も $\delta_0=0$ とします。残る変数は $x_1$ の1個で、差因子の Jacobi 行列は $(1)$、縮約情報行列は $H_{\mathrm{red}}=(1)$ です。

soft 模型では $x_0$ を未知量に残したまま $4x_0^2/2$ を追加します。差因子の $J=(-1,1)$ に基準因子の重み4を足すため、

$$
H_{\mathrm{soft}}=
\begin{pmatrix}1&-1\\-1&1\end{pmatrix}
+\begin{pmatrix}4&0\\0&0\end{pmatrix}
=\begin{pmatrix}5&-1\\-1&1\end{pmatrix}.
$$

任意の非零 $v=(v_0,v_1)^{\mathsf T}$ について

$$
v^{\mathsf T}H_{\mathrm{soft}}v
=4v_0^2+(v_1-v_0)^2>0.
$$

両項が0なら $v_0=0$、続いて $v_1=0$ となるからです。従って正定値ですが、hard 固定と推定対象は異なります。
<!-- solution-end -->

<a id="ex-u2-24-a05"></a>

**A5. どのブロックが0か**

- Level: A

残差 $e_1=x_1-x_0-1$、$e_2=m-x_1-2$、未知量 $(x_0,x_1,m)$、単位重みを考える。各 $J_a$ を書き、$H_{x_0m}=0$ を説明せよ。

<!-- solution-start -->
**詳細解答**： 列順を $(x_0,x_1,m)$ と定めると、各残差を微分して

$$
J_1=\begin{pmatrix}-1&1&0\end{pmatrix},\qquad
J_2=\begin{pmatrix}0&-1&1\end{pmatrix}.
$$

$J_1$ は $m$ を使わず、$J_2$ は $x_0$ を使いません。したがってそれぞれの $J_a^{\mathsf T}J_a$ の $(1,3)$ 成分は $(-1)\cdot0=0$ と $0\cdot1=0$ です。外積を加えると

$$
H=J_1^{\mathsf T}J_1+J_2^{\mathsf T}J_2
=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix},
\qquad H_{x_0m}=0.
$$

[因子の局所結合](../U2-23/index.md#prop-u2-23-linear-structure)において、この0は直接の共同因子がないことを示すだけで、事後分布での $x_0$ と $m$ の独立性を意味しません。
<!-- solution-end -->

### Level B：反復・疎構造・座標系

<a id="ex-u2-24-b01"></a>

**B1. 鎖の基準固定を証明する**

- Level: B

$x_0,x_1,x_2$ に単位重みの差因子 $x_1-x_0-d_1$ と $x_2-x_1-d_2$ だけを置く。$H$ と零方向を求め、$x_0$ を hard 固定した縮約行列が正定値であることを式で示せ。

<!-- solution-start -->
**詳細解答**： 変数順を $(x_0,x_1,x_2)$ とすると、2因子の偏微分を縦に並べた行列は

$$
J=\begin{pmatrix}-1&1&0\\0&-1&1\end{pmatrix},\qquad
H=J^{\mathsf T}J
=\begin{pmatrix}1&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

$J(1,1,1)^{\mathsf T}=0$ です。逆に $Jv=0$ なら $v_1-v_0=0$、$v_2-v_1=0$ なので全成分が等しく、核はこの1方向に限られます。

$x_0$ の増分を0に固定し、$(x_1,x_2)$ を残すと

$$
H_{\rm red}=\begin{pmatrix}2&-1\\-1&1\end{pmatrix},\qquad
\begin{pmatrix}a&b\end{pmatrix}H_{\rm red}
\begin{pmatrix}a\\b\end{pmatrix}
=a^2+(b-a)^2.
$$

右辺が0なら $a=0$、さらに $b=0$ です。よって全ての非零ベクトルについて正となり、[連結グラフの hard 固定定理](#thm-u2-24-gauge-null)の主張を直接確かめました。
<!-- solution-end -->

<a id="ex-u2-24-b02"></a>

**B2. 全ステップが失敗する初期値**

- Level: B

$e(x)=x^2-4$、$x^{(0)}=1/2$ とする。Gauss–Newton の全ステップと、同じ方向に $\alpha=1/4$ だけ進む場合の真の目的関数を比較せよ。

<!-- solution-start -->
**詳細解答**： 現在点 $x^{(0)}=1/2$ で、残差 $e(x)=x^2-4$ とその微分を計算します。

$$
r=e(1/2)=-\frac{15}{4},\qquad J=e'(1/2)=1,
\qquad H=J^2=1,\quad g=Jr=-\frac{15}{4}.
$$

[正規方程式](#thm-u2-24-normal-equations)の解は $\delta=-g/H=15/4$ です。全ステップでは $x_{\rm full}=1/2+15/4=17/4$。真の目的関数の値を比べると

$$
\begin{aligned}
F(1/2)&=\frac12\left(-\frac{15}{4}\right)^2=\frac{225}{32},\\
e(17/4)&=\frac{225}{16},\qquad
F(17/4)=\frac12\left(\frac{225}{16}\right)^2=\frac{50625}{512}.
\end{aligned}
$$

一方、同じ方向を $1/4$ だけ進むと $x_{\rm small}=1/2+(1/4)(15/4)=23/16$ です。

$$
e(23/16)=-\frac{495}{256},\qquad
F(23/16)=\frac12\left(\frac{495}{256}\right)^2
=\frac{245025}{131072}<\frac{225}{32}<\frac{50625}{512}.
$$

縮小ステップで改善しても全ステップは悪化します。[局所降下性](#prop-u2-24-descent)は十分小さい歩幅の存在を主張するだけで、$\alpha=1$ を保証しません。
<!-- solution-end -->

<a id="ex-u2-24-b03"></a>

**B3. 角度列の意味を計算する**

- Level: B

相対姿勢因子について $p_i=(0,0)$、$p_j=(2,1)$、$\theta_i=0$、測定変位 $(2,1)$ とする。$\theta_i$ に関する位置残差の2成分微分を求めよ。また角度測定が $\theta_j-\theta_i$ に一致するときの Jacobi 行列全体を示せ。

<!-- solution-start -->
**詳細解答**： [相対姿勢の Jacobi 行列](#prop-u2-24-pose-jacobian)を、どの入力成分で微分するかに沿って求めます。$p_j-p_i=(2,1)^{\mathsf T}$、$R_i^{\mathsf T}=I_2$ なので、$\theta_i$ で動くのは世界からロボット $i$ の座標へ戻す回転です。

$$
\begin{aligned}
D_{\theta_i}u
&=\left.\frac{dR(\theta_i)^{\mathsf T}}{d\theta_i}\right|_{\theta_i=0}(p_j-p_i)\\
&=-S\begin{pmatrix}2\\1\end{pmatrix}
=-\begin{pmatrix}-1\\2\end{pmatrix}
=\begin{pmatrix}1\\-2\end{pmatrix}.
\end{aligned}
$$

位置差の微分は $D_{p_i}u=-I_2$、$D_{p_j}u=I_2$、$D_{\theta_j}u=0$ です。角度残差を微分した行は $(-1,1)$ となります。列順を $(p_{ix},p_{iy},\theta_i,p_{jx},p_{jy},\theta_j)$ とすると

$$
J=\begin{pmatrix}
-1&0&1&1&0&0\\
0&-1&-2&0&1&0\\
0&0&-1&0&0&1
\end{pmatrix}.
$$

測定値が予測と一致して残差が0でも、角度の微小変化に対する感度は消えません。
<!-- solution-end -->

<a id="ex-u2-24-b04"></a>

**B4. 前講の四変数を一回で解く**

- Level: B

第3節の $A,b$ と $q^{(0)}=0$ から Gauss–Newton 正規方程式を組み、$q^{(1)}$、5本の残差、真の最小値を求めよ。一回で停止できる理由を説明せよ。

<!-- solution-start -->
**詳細解答**： 第3節の線形モデル $e(q)=Aq-b$ では、全ての点で $J=A$ が同じです。初期値 $q^{(0)}=0$ で $r=-b$ となるので、[正規方程式](#thm-u2-24-normal-equations)は

$$
H=A^{\mathsf T}A=
\begin{pmatrix}
2&-1&0&0\\
-1&3&-1&-1\\
0&-1&2&-1\\
0&-1&-1&2
\end{pmatrix},\qquad
-g=A^{\mathsf T}b=\begin{pmatrix}-1\\-2\\-1\\4\end{pmatrix}.
$$

第3・第4行から $x_2=x_1+2/3$、$m=x_1+7/3$、第2行から $x_1-x_0=1$、第1行から $2x_0-x_1=-1$ です。従って $x_0=0,x_1=1$ で

$$
q^{(1)}=\begin{pmatrix}0\\1\\5/3\\10/3\end{pmatrix},\qquad
e(q^{(1)})=\begin{pmatrix}0\\0\\-1/3\\1/3\\-1/3\end{pmatrix}.
$$

残差を二乗して足すと $F(q^{(1)})=\frac12(3/9)=1/6$ です。$A$ の4列は独立（第1行から第1列、第2・第3行から位置列、第4行から目印列を順に確定できる）なので、[一意性条件](#thm-u2-24-normal-equations)を満たします。線形残差なら $e(q+\delta)=e(q)+A\delta$ が厳密で、更新後の勾配 $A^{\mathsf T}e(q^{(1)})=0$ です。従って二度目の増分は0です。
<!-- solution-end -->

### Level C：SLAM 全体をつなぐ

<a id="ex-u2-24-c01"></a>

**C1. 基準固定・反復・条件の一体診断**

- Level: C

1次元の三姿勢 $x_0,x_1,x_2$ について、独立な分散 $\sigma_1^2,\sigma_2^2>0$ の相対運動測定 $d_1,d_2$ を持つとする。次をそれぞれ式で示せ。

1. gauge 未固定での正規方程式の核。
2. $x_0=c$ を hard 固定した一意の解。
3. 第二の連結成分 $m_0,m_1$ に差因子 $m_1-m_0-z$ を加えても基準が決まらない理由。

<!-- solution-start -->
**詳細解答**： 重みを $w_i=\sigma_i^{-2}>0$ と置きます。元の3変数の Jacobi 行列と情報行列は

$$
J=\begin{pmatrix}-1&1&0\\0&-1&1\end{pmatrix},\qquad
H=\begin{pmatrix}
w_1&-w_1&0\\
-w_1&w_1+w_2&-w_2\\
0&-w_2&w_2
\end{pmatrix}.
$$

任意の増分 $v$ に対して

$$
v^{\mathsf T}Hv=w_1(v_1-v_0)^2+w_2(v_2-v_1)^2.
$$

両重みが正なので、これが0となるのは $v_0=v_1=v_2$ のとき、かつそのときに限ります。よって核は $(1,1,1)^{\mathsf T}$ の張る一次元です。

次に $x_0=c$ を固定すると

$$
F(x_1,x_2)=\frac12w_1(x_1-c-d_1)^2+
\frac12w_2(x_2-x_1-d_2)^2.
$$

$x_1=c+d_1,\ x_2=c+d_1+d_2$ は両残差を0にするので、$F$ の最小値0を達成します。縮約二次形式は

$$
w_1v_1^2+w_2(v_2-v_1)^2>0
\quad\bigl((v_1,v_2)\ne(0,0)\bigr)
$$

であるため、[hard 固定の正定値性定理](#thm-u2-24-gauge-null)と同じ判定によりこの最小点は一意です。

最後に、第二の島の増分 $(v_{m_0},v_{m_1})=(t,t)$ では差因子の変化は $t-t=0$ です。元の姿勢に関する全因子は $m_0,m_1$ を含まず、逆に新しい因子は元の姿勢を含みません。従って $t\ne0$ を選んでも全残差の一次変化は0で、固定した $x_0$ では第二の島の基準は決まりません。島同士を結ぶ有効な相対因子、または第二の島に別の基準情報が必要です。
<!-- solution-end -->

<a id="ex-u2-24-c02"></a>

**C2. 平面の共通回転と誤った解釈**

- Level: C

未知姿勢 $g_0=((0,0),0)$、$g_1=((2,1),\pi/6)$、既知のロボット座標相対測定 $(\bar d,\bar\delta)=((2,1),\pi/6)$ を置く。ただし $g_0$ の数値は初期値に過ぎず、固定因子はない。任意の $\phi,t$ で両姿勢を一斉変換しても残差が0であることを確かめ、$\phi=0$ の周りでの回転零方向を第5節の Jacobi 行列に代入して検算せよ。最後に「$g_0$ を初期値として0に置いたので gauge は固定された」という主張を評価せよ。

<!-- solution-start -->
**詳細解答**：共通変換後の位置・角度は次の通りです。

$$
p'_i=R(\phi)p_i+t,\qquad \theta'_i=\theta_i+\phi.
$$

ロボット0の座標で予測する相対変位を代入して、途中の回転の打ち消しを確認します。

$$
R(\theta'_0)^{\mathsf T}(p'_1-p'_0)
=R(\phi)^{\mathsf T}R(\phi)
\begin{pmatrix}2\\1\end{pmatrix}
=\begin{pmatrix}2\\1\end{pmatrix}.
$$

角度差も $\theta'_1-\theta'_0=\pi/6$ なので、全残差は0です。

微小回転では $Sp_0=(0,0)$、$Sp_1=(-1,2)$ となり、両角度の増分が1です。列順を $(p_{0x},p_{0y},\theta_0,p_{1x},p_{1y},\theta_1)$ と固定すると、回転方向は

$$
v=(0,0,1,-1,2,1)^{\mathsf T}.
$$

第5節の Jacobi 行列へ代入すると、第一行は $1-1=0$、第二行は $-2+2=0$、第三行は $-1+1=0$ です。これは [平面 gauge 命題](#prop-u2-24-planar-gauge)の具体的な零方向です。

最後に、$g_0$ の値を初期値に設定するだけでは最適化中の更新を禁止しません。原点と方位を固定するには、$g_0$ の位置・角度の増分を未知量から除去するなど、**最適化の変数・拘束として固定**する必要があります。
<!-- solution-end -->

## 9. まとめと次講

Gauss–Newton 法では、現在点の各残差と Jacobi 行列を求め、因子単位の寄与を集めた正規方程式を解いて更新します。線形因子なら一度で最小点に到達しますが、非線形因子では局所モデルと真の目的関数がずれ、ステップ幅を調節する必要があります。相対観測だけの SLAM では座標自由度が情報行列の零方向になり、1次元は共通並進、平面は並進2自由度と回転1自由度が基本です。連結性や幾何配置による追加の退化も別途検査します。

次講 **U2-25「ループ閉合・頑健推定：再訪はいつ役に立つか」** では、遠く離れた姿勢を結ぶ再訪因子が推定をどう修正するか、誤対応した因子がなぜ解を壊すかを扱います。
