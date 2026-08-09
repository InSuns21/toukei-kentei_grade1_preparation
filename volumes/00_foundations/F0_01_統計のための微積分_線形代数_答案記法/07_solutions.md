# 詳細解答集

## F0-A01 解答

$x=0$ だけが問題となる端点です。$a\neq-1$ のとき、$0<\varepsilon<1$ として

$$
\int_\varepsilon^1x^a\,dx
=\frac{1-\varepsilon^{a+1}}{a+1}.
$$

$a>-1$ なら $\varepsilon^{a+1}\to0$ なので、積分値は $1/(a+1)$ です。$a<-1$ なら $\varepsilon^{a+1}\to\infty$ となり発散します。$a=-1$ なら

$$
\int_\varepsilon^1\frac{1}{x}\,dx=-\log\varepsilon\to\infty.
$$

したがって、有限となる必要十分条件は $a>-1$ で、その値は $1/(a+1)$ です。

### 本番答案・検算・採点基準

$a=-1$ を分け、$\varepsilon\downarrow0$ の極限を示す上記計算が本番答案です。$a=0$ で積分値1となることを検算に使えます。原始関数2点、$a=-1$ の場合分け2点、必要十分条件4点、積分値2点とします。

## F0-A02 解答

$\boldsymbol{A}$ は対称なので、成分ごとの微分から

$$
\nabla(\boldsymbol{x}^{\mathsf T}\boldsymbol{A}\boldsymbol{x})
=(\boldsymbol{A}+\boldsymbol{A}^{\mathsf T})\boldsymbol{x}
=2\boldsymbol{A}\boldsymbol{x}.
$$

また $\nabla(\boldsymbol{b}^{\mathsf T}\boldsymbol{x})=\boldsymbol{b}$ です。よって

$$
\nabla g(\boldsymbol{x})=2\boldsymbol{A}\boldsymbol{x}-2\boldsymbol{b},
\qquad
\nabla^2g(\boldsymbol{x})=2\boldsymbol{A}.
$$

### 本番答案・検算・採点基準

対称性から $\boldsymbol{A}+\boldsymbol{A}^{\mathsf T}=2\boldsymbol{A}$ とする上記二式が本番答案です。$p=1$ なら通常の二次関数の微分に一致します。二次形式の勾配4点、線形項2点、Hessian4点とします。

## F0-A03 解答

特性多項式は

$$
\det(\boldsymbol{A}-\lambda\boldsymbol{I}_2)
=(3-\lambda)^2-1
=(\lambda-2)(\lambda-4)
$$

です。固有値は $2,4$ で、いずれも正です。$\boldsymbol{A}$ は実対称行列なので、F0-THM-03より正定値です。

### 本番答案・検算・採点基準

特性多項式の因数分解と「実対称かつ全固有値が正」を残します。固有値の和6と積8がtraceとdeterminantに一致します。特性多項式4点、固有値3点、定理の仮定と結論3点とします。

## F0-A04 解答

$\boldsymbol{u}^{\mathsf T}\boldsymbol{u}>0$ なので $\boldsymbol{P}$ は定義できます。まず

$$
\boldsymbol{P}^{\mathsf T}
=\frac{(\boldsymbol{u}\boldsymbol{u}^{\mathsf T})^{\mathsf T}}
{\boldsymbol{u}^{\mathsf T}\boldsymbol{u}}
=\boldsymbol{P}.
$$

次に

$$
\boldsymbol{P}^2
=\frac{\boldsymbol{u}\boldsymbol{u}^{\mathsf T}
\boldsymbol{u}\boldsymbol{u}^{\mathsf T}}
(\boldsymbol{u}^{\mathsf T}\boldsymbol{u})^2
=\frac{\boldsymbol{u}\boldsymbol{u}^{\mathsf T}}
{\boldsymbol{u}^{\mathsf T}\boldsymbol{u}}
=\boldsymbol{P}.
$$

よって直交射影行列です。任意の $\boldsymbol{x}$ について $\boldsymbol{P}\boldsymbol{x}$ は $\boldsymbol{u}$ の定数倍であり、$\boldsymbol{P}\boldsymbol{u}=\boldsymbol{u}$ です。したがって像は $\operatorname{span}(\boldsymbol{u})$ で、rankは1です。

### 本番答案・検算・採点基準

$\boldsymbol{u}^{\mathsf T}\boldsymbol{u}>0$、対称性、冪等性、像の同定を順に書く上記証明が本番答案です。$\boldsymbol{P}\boldsymbol{u}=\boldsymbol{u}$ がrank 0ではないことの検算です。定義可能性2点、対称性2点、冪等性3点、rank3点とします。

## F0-B01 解答

$t=\theta x$ と変換すると、$x=t/\theta$、$dx=dt/\theta$ なので

$$
\int_0^\infty x^2e^{-\theta x}\,dx
=\frac{1}{\theta^3}\int_0^\infty t^2e^{-t}\,dt.
$$

部分積分により

$$
\begin{aligned}
\int_0^\infty t^2e^{-t}\,dt
&=[-t^2e^{-t}]_0^\infty+2\int_0^\infty te^{-t}\,dt\\
&=2\left([-te^{-t}]_0^\infty+\int_0^\infty e^{-t}\,dt\right)\\
&=2.
\end{aligned}
$$

したがって

$$
\int_0^\infty x^2e^{-\theta x}\,dx=\frac{2}{\theta^3}
$$

を得ます。したがって $c(\theta)=\theta^3/2$ です。同じ部分積分の手順で

$$
\int_0^\infty x^3e^{-\theta x}\,dx=\frac{6}{\theta^4}
$$

なので、

$$
E_\theta[X]
=\frac{\theta^3}{2}\frac{6}{\theta^4}
=\frac{3}{\theta}.
$$

### 本番答案・検算・採点基準

$t=\theta x$ により二つの積分を標準形へ移す式と最終値を残します。平均が $\theta$ に反比例することは率パラメータの尺度と整合します。正規化積分4点、$c(\theta)$2点、期待値積分2点、結論2点とします。

## F0-B02 解答

逆変換は

$$
x=\frac{u+v}{2},
\qquad
y=\frac{u-v}{2}
$$

です。Jacobianの絶対値は

$$
\left|
\det
\begin{pmatrix}
1/2&1/2\\
1/2&-1/2
\end{pmatrix}
\right|=\frac12.
$$

$0<x<1$ と $0<y<1$ を逆変換へ代入すると

$$
0<u+v<2,
\qquad
0<u-v<2.
$$

これは

$$
0<u<2,
\qquad
\max(-u,u-2)<v<\min(u,2-u)
$$

と同値です。元の同時密度は単位正方形上で1なので、

$$
f_{U,V}(u,v)=\frac12
$$

が上記領域で成り立ち、それ以外では0です。

### 本番答案・検算・採点基準

逆変換、Jacobian $1/2$、二つの不等式または等価な菱形領域、密度の順に書きます。変換後領域の面積は2なので、定数密度 $1/2$ の積分は1です。逆変換2点、Jacobian3点、領域3点、密度と検算2点とします。

## F0-B03 解答

期待値の線形性から

$$
E[\boldsymbol{Y}]
=\boldsymbol{A}E[\boldsymbol{X}]+\boldsymbol{b}
=\boldsymbol{A}\boldsymbol{\mu}+\boldsymbol{b}.
$$

また $\boldsymbol{Y}-E[\boldsymbol{Y}]=\boldsymbol{A}(\boldsymbol{X}-\boldsymbol{\mu})$ なので、

$$
\begin{aligned}
\operatorname{Cov}(\boldsymbol{Y})
&=E\left[(\boldsymbol{Y}-E[\boldsymbol{Y}])
(\boldsymbol{Y}-E[\boldsymbol{Y}])^{\mathsf T}\right]\\
&=\boldsymbol{A}
E\left[(\boldsymbol{X}-\boldsymbol{\mu})
(\boldsymbol{X}-\boldsymbol{\mu})^{\mathsf T}\right]
\boldsymbol{A}^{\mathsf T}\\
&=\boldsymbol{A}\boldsymbol{\Sigma}\boldsymbol{A}^{\mathsf T}.
\end{aligned}
$$

定数ベクトル $\boldsymbol{b}$ は共分散に影響しません。

### 本番答案・検算・採点基準

中心化式 $\boldsymbol{Y}-E[\boldsymbol{Y}]=\boldsymbol{A}(\boldsymbol{X}-\boldsymbol{\mu})$ を残すことが核心です。$\boldsymbol{A}=\boldsymbol{I}$ なら元の平均・共分散へ戻ります。平均3点、中心化2点、共分散の展開4点、定数項への言及1点とします。

## F0-B04 解答

反例として $h(x)=x^2$ と $a=0$ を取ります。$h'(0)=0$ ですが、$h(0)=0$ は最大値ではなく最小値です。したがって主張は偽です。

狭義局所最大点と結論するには、たとえば次を確認します。

1. $h$ が $a$ の近傍で二階連続微分可能で $h''(a)<0$ であること、または導関数が $a$ の前後で正から負へ符号変化すること。
2. $a$ が定義域・パラメータ空間の内部にあり、微分条件を適用できること。

これらは局所的な判定です。大域的最大点と結論するには、定義域全体での凹性を示すか、全ての他の停留点・境界・無限遠での値と比較する必要があります。別の内部点に、より大きな局所最大値が存在する可能性があるからです。

### 本番答案・検算・採点基準

$h(x)=x^2$、$a=0$ が反例です。$h'(0)=0$ ですが0は局所最小点です。停留点であることに加え、近傍での二階連続微分可能性と $h''(a)<0$、または導関数の正から負への符号変化を確認すれば狭義局所最大を示せます。大域最大には定義域全体での凹性または全候補点との比較が別途必要です。

反例の提示4点、局所最大の追加条件4点、局所判定と大域判定の区別2点とします。$h'(a)=0$ だけでは最大性を示せないという結論を明記して検算します。

## F0-C01 解答

### 方針と時間配分

- (1) 5分
- (2) 6分
- (3) 6分
- (4) 4分
- 見直し 3分

$M>0$ の場合を先に扱います。観測値が全て $[0,\theta]$ に入ることから、尤度は

$$
L(\theta)
=\theta^{-n}\boldsymbol{1}_{[M,\infty)}(\theta),
\qquad M=\max_i x_i
$$

です。$\theta\geq M$ では $\theta^{-n}$ は狭義単調減少なので、

$$
\widehat{\theta}_{\mathrm{MLE}}=M.
$$

$0<m<\theta$ に対し、独立性から

$$
\begin{aligned}
P_\theta(M\leq m)
&=P_\theta(X_1\leq m,\ldots,X_n\leq m)\\
&=\prod_{i=1}^nP_\theta(X_i\leq m)\\
&=\left(\frac{m}{\theta}\right)^n.
\end{aligned}
$$

したがって

$$
F_M(m)=
\begin{cases}
0,&m\leq0,\\
(m/\theta)^n,&0<m<\theta,\\
1,&m\geq\theta,
\end{cases}
$$

であり、密度は

$$
f_M(m)=\frac{nm^{n-1}}{\theta^n}
\boldsymbol{1}_{(0,\theta)}(m)
$$

です。よって

$$
E_\theta[M]
=\int_0^\theta m\frac{nm^{n-1}}{\theta^n}\,dm
=\frac{n}{n+1}\theta.
$$

したがって

$$
\widetilde{\theta}=\frac{n+1}{n}M
$$

は不偏推定量です。$E[M]\neq\theta$ なのでMLEは不偏ではありません。台が $\theta$ に依存し、尤度が $\theta=M$ で最大になる境界問題なので、通常のスコア方程式だけでは導けません。

例外として $x_1=\cdots=x_n=0$ なら $M=0$ です。このとき $L(\theta)=\theta^{-n}$ $(\theta>0)$ であり、$\theta\downarrow0$ とすると尤度は上限なく増加します。0はパラメータ空間に含まれないためMLEは存在しません。この標本が生じる確率は0なので、$\widehat\theta=M$ はほとんど確実に定義されますが、全ての観測値に対して定義されるわけではありません。

### 本番答案

$M>0$ なら尤度を $L(\theta)=\theta^{-n}\boldsymbol{1}_{[M,\infty)}(\theta)$ と書き、単調減少性から $\widehat\theta=M$ とする。独立性より $P(M\leq m)=(m/\theta)^n$ $(0<m<\theta)$、従って $f_M(m)=nm^{n-1}/\theta^n$。積分から $E[M]=n\theta/(n+1)$ なので $(n+1)M/n$ が不偏である。MLEは下方バイアスをもち、台が母数依存の境界最大化であるためスコア方程式による導出はできない。全標本0ではMLEは存在しない。

### 中間判断と25分時点の処理

3分時点で尤度の指示関数が書けなければ他問への移動候補です。12分時点で(2)の分布関数まで得られていれば継続します。25分時点では新しい計算を始めず、既に得たCDF、期待値、例外標本の結論を答案化して提出形へ整えます。

### 採点基準

(1) 尤度3点、単調性とMLE3点、$M=0$ の例外2点。(2) 独立性によるCDF4点、区分表示2点、密度2点。(3) 期待値4点、不偏化2点。(4) バイアスと母数依存台の説明各2点。

## F0-C02 解答

### 時間配分

(1) 6分、(2) 5分、(3) 5分、(4) 4分、見直し2分。

特性多項式は

$$
(4-\lambda)^2-4=(\lambda-6)(\lambda-2)
$$

です。固有値6に対して $\boldsymbol{q}_1=2^{-1/2}(1,1)^{\mathsf T}$、固有値2に対して $\boldsymbol{q}_2=2^{-1/2}(1,-1)^{\mathsf T}$ を取れます。

単位ベクトルを $\boldsymbol{a}=c_1\boldsymbol{q}_1+c_2\boldsymbol{q}_2$ と書けば $c_1^2+c_2^2=1$ であり、

$$
\boldsymbol{a}^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{a}
=6c_1^2+2c_2^2
=2+4c_1^2\leq6.
$$

等号は $c_1^2=1$、すなわち $\boldsymbol{a}=\pm\boldsymbol{q}_1$ のとき成立します。中心化された確率ベクトルを $\boldsymbol{X}$ とすれば

$$
\operatorname{Var}(\boldsymbol{a}^{\mathsf T}\boldsymbol{X})
=\boldsymbol{a}^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{a}
$$

なので、この方向が分散最大の線形結合、すなわち第一主成分方向です。

正定値性は、固有値 $6,2$ がともに正であることから確認できます。別法では、$\boldsymbol{a}=(a_1,a_2)^{\mathsf T}\neq\boldsymbol{0}$ に対して

$$
\begin{aligned}
\boldsymbol{a}^{\mathsf T}\boldsymbol{\Sigma}\boldsymbol{a}
&=4a_1^2+4a_1a_2+4a_2^2\\
&=2(a_1+a_2)^2+2a_1^2+2a_2^2\\
&>0
\end{aligned}
$$

と二次形式を平方和へ直して確認できます。最後の不等号は、$a_1,a_2$ が同時には0でないことによります。

### 本番答案

固有値は6,2、対応する単位固有ベクトルは $2^{-1/2}(1,1)^{\mathsf T}$、$2^{-1/2}(1,-1)^{\mathsf T}$。固有基底で $\boldsymbol a=c_1\boldsymbol q_1+c_2\boldsymbol q_2$ とすれば、単位条件下で分散は $6c_1^2+2c_2^2\leq6$。従って第一主成分方向は $\pm\boldsymbol q_1$。両固有値が正なので正定値である。別法では二次形式を $2(a_1+a_2)^2+2a_1^2+2a_2^2$ と表せば、非零ベクトルで正となる。

### 中間判断と25分時点の処理

3分時点で特性多項式を立て、10分時点で固有値と固有ベクトルまで得ることを目標にします。固有値計算で止まる場合は固有ベクトルを仮置きせず、行列式を再計算します。25分時点では新しい別解を始めず、固有値法による正定値性と最大分散の結論を明記して答案を閉じます。

### 採点基準

(1) 固有値4点、正規化した固有ベクトル4点。(2) 固有基底表示4点、最大値と方向4点。(3) 線形結合の分散式4点、主成分の説明2点。(4) 固有値法3点、二次形式の平方和3点。

## F0-C03 解答

### 時間配分

(1) 4分、(2) 6分、(3) 8分、(4) 4分、見直し3分。

計画行列は

$$
\boldsymbol{X}=
\begin{pmatrix}
1&-1\\
1&0\\
1&1
\end{pmatrix}.
$$

二列は定数倍関係にないのでrankは2です。また

$$
\boldsymbol{X}^{\mathsf T}\boldsymbol{X}
=\begin{pmatrix}3&0\\0&2\end{pmatrix},
\qquad
\boldsymbol{X}^{\mathsf T}\boldsymbol{y}
=\begin{pmatrix}y_1+y_2+y_3\\-y_1+y_3\end{pmatrix}.
$$

したがって

$$
\widehat\beta_0=\frac{y_1+y_2+y_3}{3},
\qquad
\widehat\beta_1=\frac{y_3-y_1}{2}.
$$

$ (\boldsymbol{X}^{\mathsf T}\boldsymbol{X})^{-1}=\operatorname{diag}(1/3,1/2)$ です。$x_1=-1,x_2=0,x_3=1$ と書くと、hat matrixの $(i,j)$ 成分は

$$
H_{ij}=
\begin{pmatrix}1&x_i\end{pmatrix}
\begin{pmatrix}1/3&0\\0&1/2\end{pmatrix}
\begin{pmatrix}1\\x_j\end{pmatrix}
=\frac13+\frac{x_ix_j}{2}.
$$

各 $x_i,x_j$ を代入すると、hat matrixは

$$
\boldsymbol{H}
=\begin{pmatrix}
5/6&1/3&-1/6\\
1/3&1/3&1/3\\
-1/6&1/3&5/6
\end{pmatrix}.
$$

$\boldsymbol{I}_3-\boldsymbol{H}$ を成分ごとに引くと

$$
\boldsymbol{I}_3-\boldsymbol{H}
=\frac16
\begin{pmatrix}
1&-2&1\\
-2&4&-2\\
1&-2&1
\end{pmatrix}.
$$

$d=y_1-2y_2+y_3$ とおくと、この行列の各行と $\boldsymbol y$ の積から残差は

$$
\widehat{\boldsymbol{\varepsilon}}
=(\boldsymbol{I}_3-\boldsymbol{H})\boldsymbol{y}
=\frac{d}{6}
\begin{pmatrix}1\\-2\\1\end{pmatrix}.
$$

定数列との内積は $d(1-2+1)/6=0$、説明変数列との内積は $d(-1+1)/6=0$ です。よって $\boldsymbol{X}^{\mathsf T}\widehat{\boldsymbol{\varepsilon}}=\boldsymbol{0}$ を確認できました。

### 本番答案

$\boldsymbol X$ を上記の通り置くと $\boldsymbol X^{\mathsf T}\boldsymbol X=\operatorname{diag}(3,2)$。正規方程式から $\widehat\beta_0=(y_1+y_2+y_3)/3$、$\widehat\beta_1=(y_3-y_1)/2$。$\boldsymbol H=\boldsymbol X(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}\boldsymbol X^{\mathsf T}$ を計算すると上記行列を得る。残差は $d(1,-2,1)^{\mathsf T}/6$ であり、$\boldsymbol X$ の二列との内積はいずれも0である。

### 25分時点の判断

(2)まで正しければ、(3)を行列積の形のまま残して(4)の正規方程式による直交性を先に述べても部分点を確保できます。

### 採点基準

(1) 計画行列3点、rankの根拠2点。(2) 正規方程式3点、両推定値4点。(3) 逆行列2点、成分式4点、hat matrix4点。(4) 残差式4点、二つの直交確認4点。

## F0-C04 解答

### 時間配分

(1) 4分、(2) 7分、(3) 7分、(4) 6分、見直し3分。

逆変換は $x=uv$、$y=u(1-v)$ です。元の台 $x,y>0$ と一対一に対応する範囲は

$$
u>0,
\qquad 0<v<1
$$

です。逆変換のJacobian行列と行列式は

$$
\frac{\partial(x,y)}{\partial(u,v)}
=
\begin{pmatrix}
v&u\\
1-v&-u
\end{pmatrix},
\qquad
\det\frac{\partial(x,y)}{\partial(u,v)}
=-uv-u(1-v)=-u.
$$

$u>0$ なので絶対値は $u$ です。従って

$$
f_{U,V}(u,v)
=\lambda\mu u
\exp\{-u[\lambda v+\mu(1-v)]\}
$$

がこの範囲で成り立ちます。

$a(v)=\lambda v+\mu(1-v)>0$ とおきます。$\int_0^\infty ue^{-au}\,du=a^{-2}$ より、

$$
f_V(v)
=\frac{\lambda\mu}
{[\lambda v+\mu(1-v)]^2}
\boldsymbol{1}_{(0,1)}(v).
$$

これは密度として正規化されています。$\lambda=\mu$ なら $f_V(v)=1$ なので積分は1です。$\lambda\neq\mu$ なら

$$
\begin{aligned}
\int_0^1f_V(v)\,dv
&=\lambda\mu\int_0^1
\frac{dv}{[\mu+(\lambda-\mu)v]^2}\\
&=\frac{\lambda\mu}{\lambda-\mu}
\left[-\frac{1}{\mu+(\lambda-\mu)v}\right]_0^1\\
&=1.
\end{aligned}
$$

$\lambda=\mu$ なら同時密度は $\lambda^2ue^{-\lambda u}$ となり、$u$ と $v$ の関数の積に分かれるので独立です。

逆に独立と仮定します。正の領域内で同時密度の対数を取ると

$$
\log f_{U,V}(u,v)
=\log(\lambda\mu)+\log u-u[\mu+(\lambda-\mu)v].
$$

独立なら右辺は $u$ だけの関数と $v$ だけの関数の和であり、混合偏微分は0でなければなりません。しかし

$$
\frac{\partial^2}{\partial v\partial u}
\log f_{U,V}(u,v)=-(\lambda-\mu).
$$

したがって $\lambda=\mu$ が必要です。以上より必要十分条件は $\lambda=\mu$ です。

### 本番答案

$x=uv,y=u(1-v)$、領域は $u>0,0<v<1$、Jacobian絶対値は $u$。従って $f_{U,V}=\lambda\mu u\exp\{-u[\lambda v+\mu(1-v)]\}$。$u$ で積分して $f_V(v)=\lambda\mu/[\lambda v+\mu(1-v)]^2$。$\lambda=\mu$ なら因数分解により独立。逆に独立なら $\log f_{U,V}$ の混合偏微分が0である必要があり、これは $-(\lambda-\mu)$ なので $\lambda=\mu$。

### 中間判断と25分時点の処理

3分時点で逆変換と領域、12分時点で同時密度、19分時点で周辺密度までを目標にします。(4)の必要性が出ない場合も十分性を先に答案化します。25分時点では混合偏微分の式と既得の結論を整理し、新しい別証明は始めません。

### 採点基準

(1) 逆変換2点、領域3点。(2) Jacobian4点、同時密度4点。(3) 積分式3点、周辺密度4点、正規化2点。(4) 十分性3点、必要性の混合偏微分5点。

## F0-D01 解答

### 方針と時間配分

(1) 4分、(2) 10分、(3) 6分、(4) 8分、見直し4分を目安とします。平方変換は一対一でないため、二つの逆像の寄与を足すことが核心です。

$y>0$ に対する逆像は $x=\sqrt y$ と $x=-\sqrt y$ の二つです。各枝で

$$
\left|\frac{dx}{dy}\right|=\frac{1}{2\sqrt y}.
$$

標準正規密度を $\phi$ とすると、

$$
\begin{aligned}
f_Y(y)
&=\frac{\phi(\sqrt y)}{2\sqrt y}
+\frac{\phi(-\sqrt y)}{2\sqrt y}\\
&=\frac{1}{\sqrt{2\pi y}}e^{-y/2},
\qquad y>0.
\end{aligned}
$$

対称性と変換 $y=x^2$ により

$$
\int_0^\infty f_Y(y)\,dy
=2\int_0^\infty\phi(x)\,dx=1.
$$

また

$$
E[Y]=2\int_0^\infty x^2\phi(x)\,dx.
$$

$\phi'(x)=-x\phi(x)$ を使って部分積分すると

$$
\begin{aligned}
2\int_0^\infty x^2\phi(x)\,dx
&=-2\int_0^\infty x\phi'(x)\,dx\\
&=-2[x\phi(x)]_0^\infty+2\int_0^\infty\phi(x)\,dx\\
&=1.
\end{aligned}
$$

これは $E[X^2]=\operatorname{Var}(X)+(E[X])^2=1$ と一致します。

### 採点基準

(1) 二つの逆像4点。(2) 各枝のJacobian4点、密度の加算4点、台2点。(3) 正規化の変換6点。(4) 期待値の立式4点、部分積分6点、一致の確認2点。二つの逆像を列挙し、各枝の寄与を足すことが核心です。一方の枝しか使わない場合、密度の積分は $1/2$ となります。

### 本番答案

$y>0$ の逆像は $\pm\sqrt y$ で、各枝のJacobian絶対値は $1/(2\sqrt y)$。従って

$$
f_Y(y)=\frac{\phi(\sqrt y)+\phi(-\sqrt y)}{2\sqrt y}
=\frac{e^{-y/2}}{\sqrt{2\pi y}}\boldsymbol{1}_{(0,\infty)}(y).
$$

$y=x^2$ と戻せば全積分は $2\int_0^\infty\phi(x)\,dx=1$。また $\phi'=-x\phi$ による部分積分から $E[Y]=2\int_0^\infty x^2\phi(x)\,dx=1=E[X^2]$。

### 25分時点の打ち切り判断

25分で密度と正規化まで完成していれば、期待値は $E[Y]=E[X^2]=1$ と先に結論し、部分積分は残り時間に応じて補います。二つの逆像をまだ列挙できていない場合は本番の第一選択にせず、他問へ移ります。この問題は非単射変換の発展学習用であり、通常はLevel Cを優先します。
