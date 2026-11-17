# U2-11 sigma-point フィルタ：微分に頼らない非線形近似

[EKF の局所線形化](../U2-09/index.md#def-u2-09-linearization-points)は、予測平均に引いた接線を用いて状態の分散を伝えます。しかし、[前講の二乗観測の例](../U2-10/index.md#prop-u2-10-nonlinear-failure)で見たように、接線の傾きが0でも観測値が変動することがあります。実際、平均0の状態を二乗すれば、観測の平均は0ではなく正になります。

**欲しいもの**は、微分係数だけでなく、入力の分布の広がりを非線形な関数に通した後の平均・分散です。ここでは少数の代表点（sigma point）を置き、その出力からモーメントを近似します。とりわけ入力が Gaussian のときの unscented 変換と、それを予測・観測更新へ組み込む unscented Kalman フィルタ（UKF）を扱います。**関数の出力分布そのものを厳密に Gaussian にする方法ではない**ことにも注意します。

<!-- definition-example-audit: strict -->

## 1. 入力の「中心だけ」を非線形写像に通しても足りない

時刻を一旦固定し、状態を $X\in\mathbb R^n$、その予測平均を $m=E[X]$、分散共分散行列を $P=\operatorname{Cov}(X)$ とします。まずは $X$ が $N(m,P)$ に従い、$P\succ0$ である場合を対象とします。非線形写像 $h:\mathbb R^n\to\mathbb R^k$ に対し、知りたいのは $Y=h(X)$ の $E[Y]$ と $\operatorname{Cov}(Y)$ です。

例えば $X\sim N(0,1)$、$h(x)=x^2$ とします。$h(E[X])=0$ ですが、$E[h(X)]=E[X^2]=1$。しかも [EKF の線形化](../U2-09/index.md#def-u2-09-linearization-points)は $h'(0)=0$ なので、関数が作る観測変動を0と見積もります。これは計算ミスではなく、接線一本では曲率を見られないことに由来します。

この節で用いる「モーメント」とは、平均 $E[X]$、分散共分散行列 $\operatorname{Cov}(X)$ のように確率変数の分布を数値・行列で要約した量です。有限次元の[線形 Gaussian 予測](../U2-04/index.md#prop-u2-04-covariance)で扱ったモーメントを、非線形写像の前後でも比較します。

## 2. 中心と両側の点で平均・共分散を再現する

まず $P$ の「各方向の広がり」を具体的な点の組で表します。$P=LL^T$ を満たす可逆な下三角行列 $L\in\mathbb R^{n\times n}$ を選びます（正定値行列の Cholesky 分解）。列を $L_{:i}$ と書きます。正定値性は各点が定義できるための条件であり、状態の次元 $n$ と出力の次元 $k$ は区別します。

ここでは sigma-point の一般的な調整パラメータをいきなり増やさず、**Gaussian 入力用の明示的な一組**を固定します。中心の重みを平均と分散で区別することが重要です。

<a id="def-u2-11-sigma-points"></a>

<!-- formal-statement-start -->
> **定義（対称 sigma-point と二種類の重み）**  
> $n\ge1$、$m\in\mathbb R^n$、$P=LL^T\succ0$ とする。$2n+1$ 個の代表点 $x^{(i)}\in\mathbb R^n$ と、平均用の重み $w_i^{(m)}$、分散用の重み $w_i^{(c)}$ を次のように定める。

$$
x^{(0)}=m,\qquad
x^{(i)}=m+\sqrt n\,L_{:i},\qquad
x^{(n+i)}=m-\sqrt n\,L_{:i}\quad(1\le i\le n).
$$

$$
w_0^{(m)}=0,\qquad w_0^{(c)}=2,\qquad
w_i^{(m)}=w_i^{(c)}=\frac1{2n}\quad(1\le i\le2n).
$$

> この指定は標準的な UKF パラメータ $\alpha=1,\ \kappa=0,\ \beta=2$ の場合に対応する。$\beta=2$ は Gaussian 分布の四次モーメントを使った分散補正である。中心点は平均へ直接加わらないが、非線形変換後の分散へは寄与する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-11-sigma-points -->
**定義の確認**：$n=1$、$m=2$、$P=4$ なら $L=(2)$ なので三点は $2,4,0$。平均用重みは $0,1/2,1/2$、分散用は $2,1/2,1/2$ です。

$$
\sum_{i=0}^{2}w_i^{(m)}x^{(i)}
=0\cdot2+\frac12(4)+\frac12(0)=2.
$$

$$
\sum_{i=0}^{2}w_i^{(c)}(x^{(i)}-2)^2
=2\cdot0^2+\frac12(2)^2+\frac12(-2)^2=4.
$$

両側の点で平均と分散を再現でき、中央の点の分散寄与がこの段階では0であることを確認できました。$P=4>0$ なので $L$ を取る条件も満たします。
<!-- definition-example-end -->

<a id="prop-u2-11-input-moments"></a>

<!-- formal-statement-start -->
> **命題（対称 sigma-point の入力モーメント再現）**  
> [対称 sigma-point の定義](#def-u2-11-sigma-points)の仮定のもとで、平均用重みの和は1であり、次の二つの等式が成立する。

$$
\sum_{i=0}^{2n}w_i^{(m)}x^{(i)}=m,\qquad
\sum_{i=0}^{2n}w_i^{(c)}(x^{(i)}-m)(x^{(i)}-m)^T=P.
$$

> したがって分布全体を点の有限集合に置き換える前に、少なくとも入力の平均と分散共分散行列は正確に表せる。
<!-- formal-statement-end -->

**証明の見取り図**：各列方向に $+\sqrt n L_{:i}$ と $-\sqrt n L_{:i}$ を対で置きます。平均では打ち消し合い、分散では同じ外積が二つ加わります。

<!-- proof-start -->
### 証明

平均用重みの和は $0+2n/(2n)=1$ です。$i$ 番と $n+i$ 番の点の和は $2m$ だから

$$
\sum_{j=0}^{2n}w_j^{(m)}x^{(j)}
=\sum_{i=1}^{n}\frac{(m+\sqrt nL_{:i})+(m-\sqrt nL_{:i})}{2n}
=\sum_{i=1}^{n}\frac mn=m.
$$

中心点の偏差は0です。外積については符号が消えるので

$$
\begin{aligned}
\sum_{j=0}^{2n}w_j^{(c)}(x^{(j)}-m)(x^{(j)}-m)^T
&=\sum_{i=1}^{n}\frac{nL_{:i}L_{:i}^T+nL_{:i}L_{:i}^T}{2n}\\
&=\sum_{i=1}^{n}L_{:i}L_{:i}^T
=LL^T=P.
\end{aligned}
$$

最終等号は行列積を列ごとの外積の和に展開したものです。
<!-- proof-end -->

例えば二次元で $m=(1,-1)^T$、$P=\left(\begin{smallmatrix}4&1\\1&1\end{smallmatrix}\right)$ は、先頭成分4と行列式3が正なので正定値です。その Cholesky 因子は

$$
L=\begin{pmatrix}2&0\\1/2&\sqrt3/2\end{pmatrix},\qquad LL^T=P.
$$

各列に $\sqrt2$ を掛けて $m$ の両側へ足すので、五点を作れます。列ベクトルを単に座標軸方向へ置き換えると $P_{12}=1$ の相関を捨ててしまいます。

## 3. 点を写した後のモーメント：unscented 変換

点の配置だけでは推定器ではありません。各代表点を **同じ非線形写像**へ通し、写された出力と元の点を組にして平均・分散・交差分散を作ります。交差分散は更新時に「観測が状態のどの方向と結び付くか」を測る $n\times k$ 行列です。

<a id="def-u2-11-unscented-transform"></a>

<!-- formal-statement-start -->
> **定義（unscented 変換と状態・出力の交差分散）**  
> [対称 sigma-point](#def-u2-11-sigma-points)を作り、各 $i=0,\ldots,2n$ について $y^{(i)}=h(x^{(i)})\in\mathbb R^k$ を計算する。出力の近似平均 $\widehat y$、近似分散共分散行列 $V$、状態と出力の近似交差分散行列 $C$ を

$$
\widehat y=\sum_{i=0}^{2n}w_i^{(m)}y^{(i)},\qquad
V=\sum_{i=0}^{2n}w_i^{(c)}(y^{(i)}-\widehat y)(y^{(i)}-\widehat y)^T,
$$

$$
C=\sum_{i=0}^{2n}w_i^{(c)}(x^{(i)}-m)(y^{(i)}-\widehat y)^T
$$

> と定める。これは有限個の関数評価による **モーメントの近似**であって、非線形写像の真の出力分布が Gaussian であるという主張ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-11-unscented-transform -->
**定義の確認**：$n=k=1$、$m=0$、$P=1$、$h(x)=x^2$ なら、三点 $0,1,-1$ の出力は $0,1,1$。したがって

$$
\widehat y=\frac12(1)+\frac12(1)=1,\qquad
V=2(0-1)^2+\frac12(1-1)^2+\frac12(1-1)^2=2.
$$

$$
C=2\cdot0(0-1)+\frac12(1)(1-1)+\frac12(-1)(1-1)=0.
$$

$V=2$ は中心点の **分散用重み2**を捨てると得られません。値が非負となること、$C$ の形が $1\times1$ であることも確認できます。
<!-- definition-example-end -->

<a id="prop-u2-11-affine-exact"></a>

<!-- formal-statement-start -->
> **命題（アフィン写像ではモーメントが厳密）**  
> $X$ が平均 $m$ と正定値の分散共分散行列 $P$ を持ち、$h(x)=Ax+b$、$A\in\mathbb R^{k\times n}$、$b\in\mathbb R^k$ とする。[unscented 変換](#def-u2-11-unscented-transform)による $\widehat y,V,C$ は、分布の形によらず真の値と一致する。

$$
\widehat y=Am+b,\qquad V=APA^T,\qquad C=PA^T.
$$
<!-- formal-statement-end -->

**証明の見取り図**：点の偏差を $d_i=x^{(i)}-m$ とすると、線形写像の出力偏差は $Ad_i$。入力のモーメント再現を代入すれば結論が出ます。

<!-- proof-start -->
### 証明

[入力モーメントの命題](#prop-u2-11-input-moments)により平均重みの和が1なので

$$
\widehat y=\sum_iw_i^{(m)}(Ax^{(i)}+b)
=A\sum_iw_i^{(m)}x^{(i)}+b\sum_iw_i^{(m)}
=Am+b.
$$

そこで $y^{(i)}-\widehat y=A(x^{(i)}-m)=Ad_i$ と書き、

$$
V=\sum_iw_i^{(c)}Ad_id_i^TA^T
=A\left(\sum_iw_i^{(c)}d_id_i^T\right)A^T=APA^T
$$

および

$$
C=\sum_iw_i^{(c)}d_id_i^TA^T=PA^T
$$

を得ます。一つの $n\times k$ 行列 $C$ と、$k\times k$ 行列 $V$ の次元も整合します。
<!-- proof-end -->

例えば上の二次元例で $h(x_1,x_2)=x_1+2x_2$ とすれば $A=(1,2)$、$b=0$ で、

$$
\widehat y=1+2(-1)=-1,\quad
V=(1,2)\begin{pmatrix}4&1\\1&1\end{pmatrix}\begin{pmatrix}1\\2\end{pmatrix}=12,\quad
C=\begin{pmatrix}6\\3\end{pmatrix}.
$$

関数が線形なら、sigma-point 法に「微分を使わない」ことによる精度の損失はありません。

## 4. 二乗観測では成功するが、万能ではない

$X\sim N(m,p)$（$p>0$）とし、観測関数を $h(x)=x^2$ とします。$X=m+\sqrt p\,Z$、$Z\sim N(0,1)$ と表せます。標準正規の奇数次モーメントは0、偶数次は $E[Z^2]=1,\ E[Z^4]=3$ です。

<a id="prop-u2-11-quadratic-moments"></a>

<!-- formal-statement-start -->
> **命題（Gaussian の二乗観測での厳密な一次・二次モーメント）**  
> $X\sim N(m,p)$、$p>0$、$Y=X^2$ とする。このとき真の平均・分散・状態との共分散は

$$
E[Y]=m^2+p,\qquad
\operatorname{Var}(Y)=4m^2p+2p^2,\qquad
\operatorname{Cov}(X,Y)=2mp.
$$

> [本講の sigma-point](#def-u2-11-sigma-points)と[unscented 変換](#def-u2-11-unscented-transform)は、この三つの値をすべて厳密に再現する。ここでの「厳密」は **モーメントに関してだけ**であり、$X^2$ の分布を Gaussian とする意味ではない。
<!-- formal-statement-end -->

**証明の見取り図**：真の値は $X=m+\sqrt p Z$ を展開します。点による近似では、$m,m\pm\sqrt p$ の三つの出力を並べ、中心の分散補正2が $2p^2$ を再現することを確認します。

<!-- proof-start -->
### 証明

まず $X^2=m^2+2m\sqrt p Z+pZ^2$ より

$$
E[X^2]=m^2+p,\qquad
X^2-E[X^2]=2m\sqrt p Z+p(Z^2-1).
$$

二乗して期待値を取ると、$E[Z(Z^2-1)]=E[Z^3]-E[Z]=0$。したがって

$$
\begin{aligned}
\operatorname{Var}(X^2)
&=4m^2pE[Z^2]+4mp^{3/2}E[Z(Z^2-1)]+p^2E[(Z^2-1)^2]\\
&=4m^2p+p^2(3-2+1)=4m^2p+2p^2.
\end{aligned}
$$

また

$$
\operatorname{Cov}(X,X^2)
=E[\sqrt p Z\{2m\sqrt p Z+p(Z^2-1)\}]=2mp.
$$

$E[Z^4]=3$ は標準正規密度 $\phi'(z)=-z\phi(z)$ を使った部分積分で $E[Z^4]=3E[Z^2]=3$ と導けます（境界項 $z^3\phi(z)$ は無限遠で0）。これで真の値が確定しました。

次に三点を $m,m+\sqrt p,m-\sqrt p$ とします。写像後の値は $m^2,m^2+2m\sqrt p+p,m^2-2m\sqrt p+p$ です。平均重み $0,1/2,1/2$ から $\widehat y=m^2+p$。中心の出力偏差は $-p$、両側は $\pm2m\sqrt p$ なので

$$
V=2(-p)^2+\frac12(2m\sqrt p)^2+\frac12(-2m\sqrt p)^2
=2p^2+4m^2p.
$$

交差分散では中心の入力偏差が0となり、

$$
C=\frac12\sqrt p(2m\sqrt p)+\frac12(-\sqrt p)(-2m\sqrt p)=2mp.
$$

真の三つのモーメントと一致します。
<!-- proof-end -->

ところが $X\sim N(0,1)$、$h(x)=x^4$ なら三点の出力は $0,1,1$ で、$\widehat y=1$、$V=2$ にすぎません。真のモーメントは $E[X^4]=3$、$E[X^8]=105$ から

$$
E[Y]=3,\qquad\operatorname{Var}(Y)=105-3^2=96.
$$

標準正規の偶数次モーメントの漸化式 $E[Z^{2r}]=(2r-1)E[Z^{2r-2}]$（同じ部分積分を反復）を使うと $E[Z^8]=7\cdot5\cdot3\cdot1=105$ です。関数評価回数が有限である以上、**一般の高次非線形性まで自動的に正確になるわけではありません**。

## 5. 状態の予測・観測更新をつなぐ UKF

[Kalman 更新](../U2-05/index.md#def-u2-05-update)は、状態と観測の予測モーメントおよび交差分散から利得を作ります。UKF ではその各モーメントを、必要な時点で作り直した sigma point から近似します。

時刻 $t-1$ の状態を近似的に $N(m_{t-1}^+,P_{t-1}^+)$ と表すことにし、運動モデルを

$$
X_t=f(X_{t-1},u_t)+W_t
$$

とします。$u_t$ は既知入力、$W_t$ は入力状態と独立な平均0の加法雑音で、$\operatorname{Cov}(W_t)=Q_t\succeq0$ とします。$f$ は sigma point のすべてで定義され、二次モーメントが存在すると仮定します。ここでは $P_{t-1}^+\succ0$ とし、雑音が状態・入力へ非加法的に入る模型は扱いません。

<a id="def-u2-11-ukf-prediction"></a>

<!-- formal-statement-start -->
> **定義（加法雑音型 UKF の予測）**  
> $X_t=f(X_{t-1},u_t)+W_t$、$E[W_t]=0$、$\operatorname{Cov}(W_t)=Q_t\succeq0$、$W_t$ と $X_{t-1}$ が独立とする。事前の $N(m_{t-1}^+,P_{t-1}^+)$、$P_{t-1}^+\succ0$ の sigma point $x_{t-1}^{(i)}$ を作り、$a_t^{(i)}=f(x_{t-1}^{(i)},u_t)$ と置く。UKF の予測平均・予測共分散を

$$
m_t^-=\sum_iw_i^{(m)}a_t^{(i)},\qquad
P_t^-=\sum_iw_i^{(c)}(a_t^{(i)}-m_t^-)(a_t^{(i)}-m_t^-)^T+Q_t
$$

> で定める。観測段階で再び sigma point を作る場合には $P_t^-\succ0$ を仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-11-ukf-prediction -->
**定義の確認**：1次元で $X_{t-1}\sim N(0,1)$、$f(x,u)=x^2$（ここでは入力に依存しない）、独立雑音の分散 $Q_t=1/4$ とします。三点は $0,1,-1$、写った点は $0,1,1$。よって

$$
m_t^-=1,\qquad P_t^-=2+\frac14=\frac94>0.
$$

平均0の雑音の平均は加えず、独立雑音の分散だけを加えることが重要です。[前講の EKF の誤差例](../U2-10/index.md#prop-u2-10-nonlinear-failure)と比較できます。
<!-- definition-example-end -->

観測モデルは $Z_t=h(X_t)+V_t$、$V_t$ は平均0、分散 $R_t\succ0$ の加法雑音で、$X_t$ とは独立とします。観測前の $m_t^-,P_t^-$ から **新しく** sigma point $\xi_t^{(i)}$ を作ることが予測段階との違いです。$h$ がそれらの点で定義されていることも要します。実測値を $z_t$ とします。

<a id="def-u2-11-ukf-update"></a>

<!-- formal-statement-start -->
> **定義（加法雑音型 UKF の観測更新）**  
> 上の独立加法雑音の観測モデルのもと、観測前に $\xi_t^{(i)}$ と $\eta_t^{(i)}=h(\xi_t^{(i)})$ を作る。[unscented 変換](#def-u2-11-unscented-transform)により、予測観測平均 $\widehat z_t$、分散共分散行列 $S_t$、状態と観測の交差分散 $C_t$ を

$$
\widehat z_t=\sum_iw_i^{(m)}\eta_t^{(i)},\qquad
S_t=\sum_iw_i^{(c)}(\eta_t^{(i)}-\widehat z_t)(\eta_t^{(i)}-\widehat z_t)^T+R_t,
$$

$$
C_t=\sum_iw_i^{(c)}(\xi_t^{(i)}-m_t^-)(\eta_t^{(i)}-\widehat z_t)^T
$$

> と置く。$S_t\succ0$ のもとで利得 $K_t=C_tS_t^{-1}$ とし、観測残差 $\nu_t=z_t-\widehat z_t$ を使って

$$
m_t^+=m_t^-+K_t\nu_t,\qquad
P_t^+=P_t^--K_tS_tK_t^T
$$

> と更新する。ここでは直線上の観測値を想定し、方位角には後述の局所角度処理が別途必要である。これらは Gaussian 近似を再投入する更新式であり、一般の非線形模型で厳密な事後分布とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u2-11-ukf-update -->
**定義の確認**：直前の予測が $X_t\sim N(1,1/4)$、観測 $Z_t=X_t^2+V_t$、$R_t=1/4$、実測 $z_t=2$ とします。三点 $1,3/2,1/2$ を二乗すると $1,9/4,1/4$。二乗観測の[モーメント命題](#prop-u2-11-quadratic-moments)へ $m=1,p=1/4$ を代入すると

$$
\widehat z_t=\frac54,\qquad
S_t=4\left(\frac14\right)+2\left(\frac14\right)^2+\frac14=\frac{11}{8}>0,
\qquad C_t=2\cdot1\cdot\frac14=\frac12.
$$

したがって $K_t=(1/2)/(11/8)=4/11$、$\nu_t=2-5/4=3/4$、更新結果は

$$
m_t^+=1+\frac4{11}\frac34=\frac{14}{11},\qquad
P_t^+=\frac14-\frac{(1/2)^2}{11/8}=\frac14-\frac2{11}=\frac3{44}>0.
$$

実測値を見た後で sigma point や $S_t$ を作り直していないこと、$R_t$ を $S_t$ に一度だけ足したこと、分散が非負であることを確認できます。
<!-- definition-example-end -->

<a id="prop-u2-11-ukf-covariance"></a>

<!-- formal-statement-start -->
> **命題（この重みでの UKF 更新共分散は半正定値）**  
> [本講の非負の分散用重み](#def-u2-11-sigma-points)を用い、観測前に $P_t^-\succ0$ の sigma point を作り、$R_t\succ0$ の加法観測雑音を足すとする。[UKF 更新](#def-u2-11-ukf-update)の $S_t$ は正定値で、$P_t^+=P_t^--C_tS_t^{-1}C_t^T$ は半正定値である。
<!-- formal-statement-end -->

**証明の見取り図**：状態偏差と観測偏差を縦に積んだベクトルの外積は半正定値です。分散用重みがすべて非負なので、その和に観測雑音の正定値ブロックを加えた行列も半正定値です。観測ブロックを消去すると更新共分散が現れます。

<!-- proof-start -->
### 証明

$d_i=\xi_t^{(i)}-m_t^-\in\mathbb R^n$、$e_i=\eta_t^{(i)}-\widehat z_t\in\mathbb R^k$ と置きます。[入力モーメント再現](#prop-u2-11-input-moments)から $\sum_iw_i^{(c)}d_id_i^T=P_t^-$ です。重み $w_0^{(c)}=2$、残り $1/(2n)$ は非負であり、

$$
M=\sum_iw_i^{(c)}
\begin{pmatrix}d_i\\e_i\end{pmatrix}
\begin{pmatrix}d_i^T&e_i^T\end{pmatrix}
+\begin{pmatrix}0&0\\0&R_t\end{pmatrix}
=\begin{pmatrix}P_t^-&C_t\\C_t^T&S_t\end{pmatrix}\succeq0.
$$

任意の $v\ne0$ について

$$
v^TS_tv=\sum_iw_i^{(c)}(v^Te_i)^2+v^TR_tv>0
$$

ですから $S_t$ は正定値で可逆です。任意の $u\in\mathbb R^n$ に対し、$v=-S_t^{-1}C_t^Tu$ を選ぶと、

$$
0\le \begin{pmatrix}u\\v\end{pmatrix}^TM\begin{pmatrix}u\\v\end{pmatrix}
=u^TP_t^-u+2u^TC_tv+v^TS_tv
=u^T(P_t^--C_tS_t^{-1}C_t^T)u.
$$

従って $P_t^+\succeq0$ です。これは**与えられた点と重みから作った近似行列の性質**であって、真の状態誤差がその共分散で較正される証明ではありません。
<!-- proof-end -->

[線形 Gaussian の Kalman 更新](../U2-05/index.md#def-u2-05-update)では事後モーメントが厳密ですが、非線形では $m_t^+,P_t^+$ はモーメントを合わせた Gaussian 近似の値です。観測・過程雑音を拡張状態に入れる非加法型の別実装では、別の点配置と重みが必要です。

## 6. EKF・UKF・厳密な計算の違い

さきほどの $m^-=1,p=1/4,R=1/4,z=2,h(x)=x^2$ を EKF でも計算します。予測点の $h(1)=1$、導関数 $h'(1)=2$ より、

$$
S_{\rm EKF}=2^2\frac14+\frac14=\frac54,\quad
K_{\rm EKF}=\frac{(1/4)2}{5/4}=\frac25,\quad
m_{\rm EKF}^+=1+\frac25(2-1)=\frac75.
$$

$$
P_{\rm EKF}^+=\frac14-\frac{(1/2)^2}{5/4}=\frac1{20}.
$$

UKF は予測観測平均 $5/4$、予測観測分散 $11/8$ を使い、$m^+=14/11$、$P^+=3/44$。この例で**観測を受け取る前の平均と分散**については UKF が厳密な値を再現します。ただし、**観測後の事後モーメントが厳密**とまでは言えません。$X^2$ への条件付けは一般に非 Gaussian の事後を作るからです。

特に $m^-=0$、$p=1$、$h(x)=x^2$ では、観測が $|X|$ を教えても $X$ の符号は区別できません。[二乗観測の二峰事後](../U2-09/index.md#prop-u2-09-nonlinear-posterior)と整合するように、UKF の $C=2mp=0$、したがって $K=0$ です。**予測観測の平均・分散を直しても、単一 Gaussian の更新で二峰性は表せません。** この点は後の多峰的な位置推定で再び問題になります。

角度が出力に入る場合、[方位の局所角度残差](../U2-10/index.md#def-u2-10-angular-innovation-diagnostic)をそのまま Euclid 空間の生差と混ぜてはいけません。例えば $179^\circ$ と $-179^\circ$ の算術平均は $0^\circ$ ですが、向きとしての中心は $180^\circ$ 付近です。予測姿勢とすべての sigma point が同じ連続した局所角度枝に入るなら、その枝に展開して平均と差を計算し、最後に角度を wrap できます。枝をまたいで分布が大きく広がる場合や複数の山を持つ場合は、この Euclid 型 UKF の仮定を満たしません。

方法ごとの保証を区別しましょう。[EKF](../U2-09/index.md#def-u2-09-ekf-update)は微分可能性と局所線形化が要り、二乗観測の平均補正を落とします。**本講の UKF** は各 sigma point で関数を評価でき、正定値共分散と独立な加法雑音を仮定し、アフィン写像で厳密、一次元 Gaussian の二乗写像で指定モーメントが厳密です。非線形な Bayes の**厳密事後**は一般には、元の事前密度と尤度を積分・正規化して求める別の対象です。関数評価が成功しても、モデルの誤り・外れ値・相関・分布の多峰性は消えません。

## 7. Python で手計算・非線形近似を検算する

同じ代表点・重みで $x^2$ の成功例と $x^4$ の失敗例を並べ、EKF/UKF の一回の観測更新、相関を持つ線形写像、固定乱数 Monte Carlo の真の観測モーメントを比較します。乱数は種20261117に固定し、有限標本の誤差を厳密な恒等式と混同しません。Python 標準ライブラリだけで再現できます。

~~~python-file-lab
# lab-id: U2-11-SIGMA
# lab-title: sigma-point のモーメント近似と UKF
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-11/assets/sigma_point_filter.py
# timeout-ms: 30000
# lab-preset: 二乗観測の厳密モーメント | --scenario quadratic
# lab-preset: 四乗観測の近似誤差 | --scenario quartic
# lab-preset: EKF と UKF の更新比較 | --scenario update
# lab-preset: 相関のあるアフィン写像 | --scenario affine
# lab-preset: Monte Carlo で確かめる | --scenario samples
# lab-preset: 全自己検査 | --self-test
~~~

## 8. 演習・詳細解答

### Level A：点・重み・モーメントを手で作る

<a id="ex-u2-11-a01"></a>

**A1. 平均が負の sigma point**

- Level: A

一次元 Gaussian 近似の入力平均 $m=-1$、分散 $p=9$ とする。本講の三点と二種類の重みをすべて書き、点から平均と分散を再計算せよ。

<!-- solution-start -->
**詳細解答**：[三点の定義](#def-u2-11-sigma-points)へ $n=1$、$\sqrt p=3$ を代入すると $x^{(0)}=-1$、$x^{(1)}=2$、$x^{(2)}=-4$ です。平均用重みは $(0,1/2,1/2)$、分散用は $(2,1/2,1/2)$。平均は

$$
0(-1)+\frac12(2)+\frac12(-4)=-1.
$$

中心からの偏差は $0,3,-3$ ですから

$$
2\cdot0^2+\frac12(3)^2+\frac12(-3)^2=9.
$$

元の分散9を再現します。$\sqrt p$ の代わりに $p$ を点の偏差に使うのは単位も違う誤りです。
<!-- solution-end -->

<a id="ex-u2-11-a02"></a>

**A2. 二乗写像の中心点の役割**

- Level: A

$X\sim N(0,4)$、$Y=X^2$ とする。三点の出力、近似平均と近似分散を求めよ。分散用中心重みを誤って0としたらどうなるか。

<!-- solution-start -->
**詳細解答**：[三点の定義](#def-u2-11-sigma-points)より入力点は $0,2,-2$、出力は $0,4,4$。従って平均は $0\cdot0+(4+4)/2=4$ です。[出力の分散式](#def-u2-11-unscented-transform)から

$$
V=2(0-4)^2+\frac12(4-4)^2+\frac12(4-4)^2=32.
$$

[二乗観測の命題](#prop-u2-11-quadratic-moments)でも $m=0,p=4$ だから $2p^2=32$ です。中心重みを0と誤ると両側の出力偏差がどちらも0なので $V=0$ となります。平均用と分散用の重みを混同してはいけません。
<!-- solution-end -->

<a id="ex-u2-11-a03"></a>

**A3. 一次元のアフィン写像**

- Level: A

$E[X]=2$、$\operatorname{Var}(X)=3$、$h(x)=-2x+5$ とする。本講の sigma point で $\widehat y,V,C$ を求め、行列の一般式とも照合せよ。

<!-- solution-start -->
**詳細解答**：入力点は $2,2+\sqrt3,2-\sqrt3$、出力は $1,1-2\sqrt3,1+2\sqrt3$ です。出力平均は $(1-2\sqrt3+1+2\sqrt3)/2=1$。偏差は $0,-2\sqrt3,2\sqrt3$ なので

$$
V=\frac12(2\sqrt3)^2+\frac12(2\sqrt3)^2=12.
$$

交差分散は

$$
C=\frac12(\sqrt3)(-2\sqrt3)+\frac12(-\sqrt3)(2\sqrt3)=-6.
$$

[アフィン写像の命題](#prop-u2-11-affine-exact)へ $A=-2,P=3,b=5$ を代入しても $\widehat y=-2\cdot2+5=1$、$V=(-2)^2\cdot3=12$、$C=3(-2)=-6$ です。
<!-- solution-end -->

<a id="ex-u2-11-a04"></a>

**A4. 単純な二次元入力**

- Level: A

$n=2$、$m=(0,0)^T$、$P=\operatorname{diag}(1,4)$ とする。下三角 $L$ を選んで全五点と各重みを記せ。点の偏差から $P_{12}=0$ を確認せよ。

<!-- solution-start -->
**詳細解答**：$L=\operatorname{diag}(1,2)$、$\sqrt n=\sqrt2$ なので点は

$$
(0,0)^T,\quad(\sqrt2,0)^T,\quad(0,2\sqrt2)^T,\quad
(-\sqrt2,0)^T,\quad(0,-2\sqrt2)^T.
$$

平均重みは中心0、それ以外は各 $1/4$。分散重みは中心2、それ以外は各 $1/4$ です。各点で二成分の少なくとも一方が0なので、交差項は

$$
P_{12}=\sum_iw_i^{(c)}x_1^{(i)}x_2^{(i)}=0.
$$

対角成分は $P_{11}=2(1/4)(\sqrt2)^2=1$、$P_{22}=2(1/4)(2\sqrt2)^2=4$ で、元の行列が戻ります。
<!-- solution-end -->

<a id="ex-u2-11-a05"></a>

**A5. 加法雑音を足す位置**

- Level: A

$X\sim N(0,1)$、$f(x)=x^2$、$W$ は $X$ と独立で平均0、分散 $1/2$ とする。$X'=f(X)+W$ の UKF 予測平均・分散を求めよ。雑音分散を出力点それぞれへ加えて二乗する計算が正しいかも答えよ。

<!-- solution-start -->
**詳細解答**：三点を写せば $0,1,1$ であり、[予測の定義](#def-u2-11-ukf-prediction)から関数出力の平均は1、分散は2です。$W$ は独立・平均0なので交差共分散が0で、

$$
E[X']=1+0=1,\qquad P'=2+\frac12=\frac52.
$$

雑音分散 $1/2$ は確率変数の値ではなく二次モーメントです。各出力点に $1/2$ を足してから二乗する操作は、加法雑音の平均0と独立性を表さず、誤りです。
<!-- solution-end -->

### Level B：近似精度・相関・更新条件

<a id="ex-u2-11-b01"></a>

**B1. 任意の平均で二乗センサーを通す**

- Level: B

$X\sim N(2,1/4)$、$Y=X^2$ とする。三点から $\widehat y,V,C$ を算出し、真のモーメントに一致することを別計算で確認せよ。

<!-- solution-start -->
**詳細解答**：[三点](#def-u2-11-sigma-points)は $2,5/2,3/2$、出力は $4,25/4,9/4$ です。平均は

$$
\widehat y=\frac12\left(\frac{25}4+\frac94\right)=\frac{17}{4}.
$$

出力偏差は中心 $4-17/4=-1/4$、両側 $25/4-17/4=2$、$9/4-17/4=-2$。よって

$$
V=2\left(\frac14\right)^2+\frac12(2)^2+\frac12(-2)^2
=\frac18+4=\frac{33}{8}.
$$

入力偏差は $0,1/2,-1/2$ なので

$$
C=\frac12\left(\frac12\right)(2)+\frac12\left(-\frac12\right)(-2)=1.
$$

[真の二乗モーメント命題](#prop-u2-11-quadratic-moments)に $m=2,p=1/4$ を代入すると $m^2+p=17/4$、$4m^2p+2p^2=4+1/8=33/8$、$2mp=1$ とすべて一致します。
<!-- solution-end -->

<a id="ex-u2-11-b02"></a>

**B2. 高次写像をチェックする**

- Level: B

$X\sim N(0,1)$、$Y=X^4$ とする。sigma-point の予測平均・分散を求め、Gaussian の真の値と比較して、差が生じる理由を説明せよ。

<!-- solution-start -->
**詳細解答**：点は $0,1,-1$、写像後も $0,1,1$ なので $\widehat y=1,V=2$ です。真の値は $E[X^4]=3$。標準正規密度の微分を使った[偶数次モーメントの導出](#prop-u2-11-quadratic-moments)と同じ部分積分で $E[X^8]=7\cdot5\cdot3\cdot1=105$ なので

$$
\operatorname{Var}(Y)=E[X^8]-E[X^4]^2=105-9=96.
$$

平均は2、分散は94だけ低く近似されます。非線形の高次項を有限個の関数評価で積分近似するための打ち切り誤差であり、入力の二次モーメント再現だけでは高次出力の精度を保証できません。
<!-- solution-end -->

<a id="ex-u2-11-b03"></a>

**B3. 相関がある二次元状態から観測へ**

- Level: B

$X\in\mathbb R^2$ の予測平均は $(1,-1)^T$、分散共分散行列は $P=\left(\begin{smallmatrix}4&1\\1&1\end{smallmatrix}\right)$。観測関数 $h(x)=x_1+2x_2$、独立観測雑音分散 $R=1$ とする。$P$ の正定値性、予測観測平均、分散 $S$、交差分散 $C$、Kalman 利得 $K$ を求めよ。

<!-- solution-start -->
**詳細解答**：$P_{11}=4>0$、$\det P=4-1=3>0$ だから $P\succ0$。[アフィン写像の命題](#prop-u2-11-affine-exact)に $A=(1,2)$ を代入し、まず

$$
PA^T=\begin{pmatrix}4&1\\1&1\end{pmatrix}
\begin{pmatrix}1\\2\end{pmatrix}
=\begin{pmatrix}6\\3\end{pmatrix},
\qquad APA^T=(1,2)\begin{pmatrix}6\\3\end{pmatrix}=12.
$$

ゆえに

$$
\widehat z=1+2(-1)=-1,\qquad S=12+1=13,\qquad
C=\begin{pmatrix}6\\3\end{pmatrix},\qquad
K=CS^{-1}=\begin{pmatrix}6/13\\3/13\end{pmatrix}.
$$

$C,K$ は $2\times1$、$S$ は $1\times1$ です。雑音分散は観測方向にのみ加算し、状態・観測の交差分散へは加えません。
<!-- solution-end -->

<a id="ex-u2-11-b04"></a>

**B4. 観測後の不確実性の意味**

- Level: B

$X\sim N(0,1)$、$Z=X^2+V$、$V\sim N(0,1/4)$ は独立とする。UKF の予測観測平均 $\widehat z$、$S$、$C$、更新利得と更新平均・分散を任意の実測 $z$ について求めよ。観測で $|X|$ を知れても更新が0となる理由を述べよ。

<!-- solution-start -->
**詳細解答**：[二乗観測の命題](#prop-u2-11-quadratic-moments)へ $m=0,p=1$ を入れれば $\widehat z=1$、関数出力の分散2、$C=2mp=0$。したがって

$$
S=2+\frac14=\frac94>0,\qquad K=\frac{C}{S}=0.
$$

[更新の定義](#def-u2-11-ukf-update)から任意の実測 $z$ に対して

$$
m^+=0+0(z-1)=0,\qquad P^+=1-0^2S=1.
$$

観測 $x^2$ は $x$ と $-x$ を区別せず、$\operatorname{Cov}(X,X^2)=0$ です。単一 Gaussian の線形交差分散から利得を作る更新は、分散の情報（$|X|$ の大きさ）を二峰分布として保持できません。[非線形事後の反例](../U2-09/index.md#prop-u2-09-nonlinear-posterior)と矛盾しない結果です。
<!-- solution-end -->

### Level C：予測・観測更新と適用限界を統合する

<a id="ex-u2-11-c01"></a>

**C1. 同じ二乗センサーを UKF と EKF で比較する**

- Level: C

一次元状態の観測直前分布を $N(1,1/4)$、観測モデルを $Z=X^2+V$、$V\sim N(0,1/4)$ 独立、実測を $z=2$ とする。入力状態の分散は厳密で、観測雑音は加法的とする。

1. 本講の三点と写像後の三点を求めよ。
2. UKF の $\widehat z,S,C,K,\nu,m^+,P^+$ を計算せよ。
3. EKF を予測点 $1$ で一回だけ線形化した場合の $S,K,m^+,P^+$ と比較せよ。
4. 二つの更新のどちらが厳密な Bayes 事後を与えると主張できるか説明せよ。

<!-- solution-start -->
**詳細解答**：

**(1)** [三点](#def-u2-11-sigma-points)は $x^{(0)}=1,x^{(1)}=3/2,x^{(2)}=1/2$、出力は $1,9/4,1/4$ です。$P=1/4>0$ なので構成できます。

**(2)** 出力平均は $(9/4+1/4)/2=5/4$。中心偏差 $-1/4$、両側偏差 $+1,-1$ だから

$$
V_h=2\left(-\frac14\right)^2+\frac12(1)^2+\frac12(-1)^2
=\frac18+1=\frac98.
$$

入力偏差 $0,1/2,-1/2$ から

$$
C=\frac12\left(\frac12\right)(1)+\frac12\left(-\frac12\right)(-1)=\frac12.
$$

独立観測雑音を加えると

$$
S=\frac98+\frac14=\frac{11}{8},\quad
K=\frac{1/2}{11/8}=\frac4{11},\quad
\nu=2-\frac54=\frac34.
$$

従って $m^+=1+(4/11)(3/4)=14/11$、

$$
P^+=\frac14-\frac{(1/2)^2}{11/8}
=\frac14-\frac2{11}=\frac3{44}.
$$

**(3)** [EKF 更新](../U2-09/index.md#def-u2-09-ekf-update)の導関数は $H=2x|_{x=1}=2$。予測観測は1ですから

$$
S_{\rm EKF}=H^2P+R=4\cdot\frac14+\frac14=\frac54,\quad
K_{\rm EKF}=\frac{PH}{S_{\rm EKF}}=\frac{1/2}{5/4}=\frac25.
$$

残差は $2-1=1$、従って $m_{\rm EKF}^+=1+2/5=7/5$、$P_{\rm EKF}^+=1/4-(1/2)^2/(5/4)=1/20$ です。

**(4)** [二乗観測の真のモーメント](#prop-u2-11-quadratic-moments)では UKF の観測前の $\widehat z,S,C$ はこの設定で厳密です。しかし事後密度は $p(x\mid z)\propto p(x)\exp[-(z-x^2)^2/(2R)]$ となり、一般には正規分布の指数部である二次式ではありません。したがって UKF も EKF も、**一回の更新が厳密な Bayes 事後を与える**とは主張できません。
<!-- solution-end -->

<a id="ex-u2-11-c02"></a>

**C2. 予測の雑音と、観測が見失う方向**

- Level: C

一次元状態 $X_0\sim N(0,1)$ を $X_1=X_0^2+W$ により一歩進める。$W\sim N(0,1/4)$ は $X_0$ と独立。次に $Z=X_1+V$、$V\sim N(0,1/4)$ は $(X_0,W)$ と独立とし、実測 $z=2$ を得たとする。本講の加法雑音 UKF で、予測 $m_1^-,P_1^-$、観測の $\widehat z,S,C$、更新後の $m_1^+,P_1^+$ を求めよ。また、同じ $X_0$ に対する観測 $Z'=X_0^2+V$ の場合には $K=0$ となることを比較し、UKF がどちらの厳密事後も保証しない理由を説明せよ。

<!-- solution-start -->
**詳細解答**：

**予測**：$X_0$ の三点 $0,1,-1$ を $f(x)=x^2$ に通すと $0,1,1$。関数出力平均1、分散2なので、独立な $W$ の分散を加えて

$$
m_1^-=1,\qquad P_1^-=2+\frac14=\frac94>0.
$$

**観測**：$h(x)=x$ はアフィン写像であり、[アフィン正確性](#prop-u2-11-affine-exact)から $\widehat z=1$、関数による観測分散は $9/4$、交差分散は $C=9/4$。独立な $V$ を加えて

$$
S=\frac94+\frac14=\frac52,\qquad
K=\frac{9/4}{5/2}=\frac9{10},\qquad
\nu=2-1=1.
$$

[UKF 更新](#def-u2-11-ukf-update)より

$$
m_1^+=1+\frac9{10}=\frac{19}{10},\qquad
P_1^+=\frac94-\frac{(9/4)^2}{5/2}
=\frac94-\frac{81}{40}=\frac9{40}.
$$

**比較**：$Z'=X_0^2+V$ では更新対象が $X_0$ であり、$\operatorname{Cov}(X_0,X_0^2)=0$ なので $K=0$。一方 $Z=X_1+V$ は $X_1$ そのものと相関があり、$K\ne0$ です。予測後の $X_1=X_0^2+W$ は厳密には Gaussian でないため、線形観測であっても $X_1\mid Z$ が Gaussian と限りません。前者では非線形観測が、後者では非線形予測が非 Gaussian 性を生みます。どちらも第一・第二モーメントを用いた近似更新であることは変わりません。
<!-- solution-end -->

## 9. 次の講義への接続

sigma point は、接線の傾きではなく、**分布の広がりを反映した複数点の関数値**を使って観測の平均・分散を作ります。アフィン写像と一次元 Gaussian の二乗写像では本講の指定したモーメントが厳密ですが、四乗写像では大きな誤差を生じ、多峰事後も単一 Gaussian では保持できません。

次の U2-12 では、逐次更新だけでなく複数時刻の軌跡をまとめて推定する問題へ進みます。**どの観測をいつ使っているか**を明確にしながら、フィルタリングと平滑化を区別します。
