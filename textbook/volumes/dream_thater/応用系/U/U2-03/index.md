# U2-03 線形 Gaussian 位置推定：事前と尤度の積

[前講の密度版 Bayes フィルタ](../U2-02/index.md#thm-u2-02-density-filter)では、移動後の位置について予測密度を作り、観測尤度を掛けて正規化しました。しかし位置が連続値になると、毎回密度全体の積分を数値計算するのは大変です。予測密度とセンサー誤差がともに Gaussian（正規分布）で、センサーが位置の線形関数を読む場合、**事後分布も Gaussian** になります。その平均と分散共分散行列を、積の平方完成で求めます。

ここで扱うのは**一時刻の観測更新**です。移動による次時刻の予測は次講で、逐次的な Kalman 更新の別表示はその次に扱います。位置の単位は m、分散の単位は m² とし、観測も距離型である例では同じ単位を用います。

## 1. 連続位置の「幅」を持った予測

有限状態では各位置の確率を表にしていました。連続位置では、たとえば「平均2 m、標準偏差2 m」なら、位置が平均付近に集中していても一点にいる確率は0です。その広がりを表すのが Gaussian 密度です。

$\mathbb R^d$ の位置列ベクトル $X=(X_1,\ldots,X_d)^T$ の平均を $\mu\in\mathbb R^d$、分散共分散行列を $\Sigma\in\mathbb R^{d\times d}$ とします。その $(i,j)$ 成分は $\Sigma_{ij}=\mathbb E[(X_i-\mu_i)(X_j-\mu_j)]$ です。この行列で位置の不確実性を調べられる理由は、任意の方向係数 $v=(v_1,\ldots,v_d)^T$ に対し

$$
\operatorname{Var}(v^TX)
=\mathbb E\left[\left(\sum_{i=1}^d v_i(X_i-\mu_i)\right)^2\right]
=\sum_{i,j=1}^d v_i\Sigma_{ij}v_j
=v^T\Sigma v
$$

となるためです。「対称正定値」とは $\Sigma^T=\Sigma$ かつ任意の非零 $v$ に対し $v^T\Sigma v>0$ であることです。これは、どの非零方向の位置にも正の分散が残るという条件です。この条件なら逆行列が存在し、行列式は正です。以下の密度とその平均・共分散の成立には [INV15 の多変量正規分布の構成](../../../解析系/INV/INV15/index.md#def-inv15-gaussian-density)を用います。

<a id="def-u2-03-gaussian-belief"></a>

<!-- formal-statement-start -->
> **定義（正定値 Gaussian 位置 belief）**  
> $d\ge1$、$\mu\in\mathbb R^d$、$\Sigma\in\mathbb R^{d\times d}$ を実対称正定値とする。位置を表す確率ベクトル $X\in\mathbb R^d$ が、全空間 $\mathbb R^d$ 上で

$$
f_X(x)=\frac{\exp[-(x-\mu)^T\Sigma^{-1}(x-\mu)/2]}
{(2\pi)^{d/2}\sqrt{\det\Sigma}}
\qquad(x\in\mathbb R^d)
$$

> という確率密度を持つとき、$X\sim N(\mu,\Sigma)$ と書き、$\mu$ を平均位置、$\Sigma$ を分散共分散行列とする。この節の Gaussian belief は正定値の $\Sigma$ を持つものに限る。
<!-- formal-statement-end -->

密度の非負性・全空間での積分1、平均と共分散の一致は[多変量正規密度の構成](../../../解析系/INV/INV15/index.md#def-inv15-gaussian-density)から従います。平方完成で扱えるのはこの逆行列があるためです。

<!-- definition-example-start: def-u2-03-gaussian-belief -->
**定義の確認**：廊下の位置 $X\sim N(2,4)$ とすると、$\mu=2$、$\Sigma=(4)$ は $1\times1$ の対称行列で、非零の実数 $v$ に対して $4v^2>0$ です。密度は

$$
f_X(x)=\frac{1}{2\sqrt{2\pi}}\exp\left[-\frac{(x-2)^2}{8}\right]
$$

となります。積分1であり、平均は2 m、分散は4 m²、標準偏差は2 mです。平均だけを保存すると、この広がりを失います。
<!-- definition-example-end -->

次に「センサーが何を読むか」を加えます。観測を1回行う直前の状態を $X\in\mathbb R^n$、観測値を $Z\in\mathbb R^m$ とします。$H\in\mathbb R^{m\times n}$ は位置から測定値へ変換する既知行列です。$x=(x_1,\ldots,x_n)^T$ を位置の候補とすると、第 $j$ センサーの理想的な読みは行列の第 $j$ 行と位置列ベクトルの積

$$
(Hx)_j=\sum_{k=1}^n H_{jk}x_k\qquad(j=1,\ldots,m)
$$

です。ここで $H_{jk}$ は第 $j$ センサーの読みへの第 $k$ 座標の係数です。例えば二次元位置の和を一つのセンサーで読むなら、$H=(1,1)$ は $1\times2$ 行列であり、$Hx=x_1+x_2$ となります。$E$ は観測雑音で、**$X$ と独立**と仮定します。実測は理想値 $HX$ に $E$ を加えた値です。雑音の平均は0、共分散は $R$ とします。

<a id="def-u2-03-linear-observation"></a>

<!-- formal-statement-start -->
> **定義（線形 Gaussian 位置観測模型）**  
> 整数 $n,m\ge1$、既知行列 $H\in\mathbb R^{m\times n}$、平均 $a\in\mathbb R^n$、実対称正定値行列 $P^-\in\mathbb R^{n\times n}$ と $R\in\mathbb R^{m\times m}$ を固定する。現在の位置 $X$ と雑音 $E$ が独立で

$$
X\sim N(a,P^-),\qquad E\sim N(0,R),\qquad Z=HX+E
$$

> を満たすとする。$X$ の分布を観測前の **予測 belief**、$Z\mid X=x\sim N(Hx,R)$ の条件付き密度を **観測模型** とする。実際の観測値 $z\in\mathbb R^m$ を固定したとき、この密度を $x$ の関数として見たものが **尤度** である。上付き $-$ は観測前を意味し、負号や前時刻を意味しない。
<!-- formal-statement-end -->

$X$ と $E$ の独立性は[INV15 の線形 Gaussian 模型](../../../解析系/INV/INV15/index.md#def-inv15-linear-model)と同じ仮定です。雑音の条件付き密度は、位置 $x$ を固定すると $E=z-Hx$ と平行移動して得ます。観測値の全範囲で積分1ですが、固定した $z$ に対する尤度を $x$ について積分して1になるとは限りません。

<!-- definition-example-start: def-u2-03-linear-observation -->
**定義の確認**：$n=m=1$、予測 $X\sim N(2,4)$、独立な雑音 $E\sim N(0,1)$、$H=(1)$ とします。両共分散は正定値で、$H$ は $1\times1$ なので $HX$ は観測の1成分です。$Z=X+E$ と生成順序を指定したので $Z\mid X=x\sim N(x,1)$ です。その密度

$$
f_{Z\mid X=x}(z)=\frac{1}{\sqrt{2\pi}}\exp[-(z-x)^2/2]
$$

は各固定 $x$ で $z\in\mathbb R$ 上の積分が1です。センサーが5 mを読んだときの尤度は、$z=5$ を固定して $x$ を動かした同じ式です。
<!-- definition-example-end -->

## 2. まず1次元で平方完成する

予測が $N(a,p)$、雑音が $N(0,r)$、読み取りが $Z=hX+E$ という模型を考え、$p,r>0$、$h\in\mathbb R$ を固定します。観測値 $z$ を得たとき、[密度版 Bayes 更新](../U2-02/index.md#thm-u2-02-density-filter)の分子は「予測密度 × 尤度」です。密度の正規化係数は $x$ に依存しないため、指数の二次式

$$
Q_z(x)=\frac{(x-a)^2}{p}+\frac{(z-hx)^2}{r}
$$

を調べます。展開すると

$$
Q_z(x)=\left(\frac1p+\frac{h^2}{r}\right)x^2
-2\left(\frac ap+\frac{hz}{r}\right)x
+\frac{a^2}{p}+\frac{z^2}{r}.
$$

$\lambda=1/p+h^2/r>0$、$\eta=a/p+hz/r$ と置きます。$\lambda$ は分散の逆数である**精度**、$\eta$ は平均に精度を掛けた項を足した**情報量**です。$\lambda(x-\eta/\lambda)^2$ を展開すると $\lambda x^2-2\eta x+\eta^2/\lambda$ なので、

$$
Q_z(x)=\lambda\left(x-\frac{\eta}{\lambda}\right)^2
+\frac{a^2}{p}+\frac{z^2}{r}-\frac{\eta^2}{\lambda}.
$$

最後の3項は $x$ に依存しません。従って事後は平均 $\eta/\lambda$、分散 $1/\lambda$ の Gaussian 密度です。**精度（分散の逆数）が加算される**のが、最初に見える規則です。これは有限候補の belief を掛け算したときと同じ Bayes 更新を、密度の指数で行ったものです。

**手計算例**：$a=2$、$p=4$、$h=1$、$r=1$、観測 $z=5$ とします。

$$
\lambda=\frac14+1=\frac54,\qquad
\eta=\frac24+5=\frac{11}{2}.
$$

従って事後分散は $1/\lambda=4/5$、事後平均は $\eta/\lambda=(11/2)(4/5)=22/5$ m です。事前平均2 mと実測5 mの間に移り、分散は4 m²から $4/5$ m²へ小さくなりました。

## 3. 複数の位置・複数の観測でも成り立つか

位置 $x\in\mathbb R^n$ の候補と観測値 $z\in\mathbb R^m$ を考えます。行列の積の次元は $H^TR^{-1}H$ が $n\times n$、$H^TR^{-1}z$ が $n\times1$ です。二次形式

$$
Q_z(x)=(x-a)^T(P^-)^{-1}(x-a)
+(z-Hx)^TR^{-1}(z-Hx)
$$

の第1項は予測から外れるほど大きく、第2項は観測とのずれをセンサー誤差で重み付けした量です。ここでも[INV15 の一般 Gaussian 更新定理](../../../解析系/INV/INV15/index.md#thm-inv15-gaussian-posterior)と同じ計算ができますが、今の「位置と測距」という意味で導き直します。

<a id="prop-u2-03-robot-posterior"></a>

<!-- formal-statement-start -->
> **命題（線形 Gaussian 位置観測の事後更新）**  
> $n,m\ge1$、$X\sim N(a,P^-)$、$E\sim N(0,R)$ が独立で、$a\in\mathbb R^n$、$P^-\in\mathbb R^{n\times n}$ と $R\in\mathbb R^{m\times m}$ が実対称正定値、$H\in\mathbb R^{m\times n}$、$Z=HX+E$ とする。任意の固定観測値 $z\in\mathbb R^m$ に対し、$X\mid Z=z$ の条件付き密度の版は $N(a^+,P^+)$ であり、

$$
\Lambda=(P^-)^{-1}+H^TR^{-1}H,\qquad
\eta=(P^-)^{-1}a+H^TR^{-1}z,
$$

$$
\boxed{P^+=\Lambda^{-1},\qquad a^+=P^+\eta}
$$

> となる。$\Lambda$ は実対称正定値で、$H$ が階数不足でも結論は成り立つ。上付き $+$ はこの観測を取り込んだ後を表す。
<!-- formal-statement-end -->

**証明の見取り図**：事前と尤度の指数にある二次形式を展開すると、$x$ の2次係数が $\Lambda$、1次係数が $\eta$ になります。正定値な事前の逆行列があるので、センサーが一方向しか読めなくても $\Lambda$ は可逆です。平方完成した中心が事後平均、二次係数の逆行列が事後共分散になります。

<!-- proof-start -->
### 証明

[Gaussian 密度の定義](#def-u2-03-gaussian-belief)を事前に、[独立雑音の観測模型](#def-u2-03-linear-observation)を尤度に適用すると、$x$ と $z$ の同時密度は

$$
f_{X,Z}(x,z)=
\frac{\exp[-Q_z(x)/2]}{(2\pi)^{(n+m)/2}\sqrt{\det P^-}\sqrt{\det R}}.
$$

これは $Z=HX+E$ と独立性から、固定した $x$ で雑音密度を $z-Hx$ に代入して得られます。$R$ が正定値なので尤度はすべての $x,z$ に対して厳密に正で、固定した $z$ で一様に有界です。従って $0<f_Z(z)=\int f_{X,Z}(x,z)\,dx<\infty$ となり、[密度版 Bayes 更新](../U2-02/index.md#thm-u2-02-density-filter)で割れます。

$P^-,R$ は対称正定値なので、それらの逆行列も対称正定値です。任意の非零 $v\in\mathbb R^n$ に対し

$$
v^T\Lambda v
=v^T(P^-)^{-1}v+(Hv)^TR^{-1}(Hv)>0
$$

です。第1項は正、第2項は非負なので、$\Lambda$ は対称正定値で逆行列が存在します。

二次形式の全項を展開すると

$$
\begin{aligned}
Q_z(x)
&=x^T(P^-)^{-1}x-2x^T(P^-)^{-1}a+a^T(P^-)^{-1}a\\
&\quad+x^TH^TR^{-1}Hx-2x^TH^TR^{-1}z+z^TR^{-1}z\\
&=x^T\Lambda x-2x^T\eta+c_z,
\end{aligned}
$$

ここで $c_z=a^T(P^-)^{-1}a+z^TR^{-1}z$ は $x$ に依存しません。$a^+=\Lambda^{-1}\eta$ と置けば $\Lambda a^+=\eta$ なので、

$$
\begin{aligned}
(x-a^+)^T\Lambda(x-a^+)
&=x^T\Lambda x-2x^T\Lambda a^++(a^+)^T\Lambda a^+\\
&=x^T\Lambda x-2x^T\eta+(a^+)^T\Lambda a^+.
\end{aligned}
$$

これを代入して

$$
Q_z(x)=(x-a^+)^T\Lambda(x-a^+)
+c_z-(a^+)^T\Lambda a^+.
$$

最後の2項は $x$ によらないため、事後密度は $\exp[-(x-a^+)^T\Lambda(x-a^+)/2]$ に比例します。$\Lambda$ が正定値なので $P^+=\Lambda^{-1}$ は正定値です。[Gaussian 密度の正規化](../../../解析系/INV/INV15/index.md#def-inv15-gaussian-density)を用いると比例定数は $(2\pi)^{-n/2}(\det P^+)^{-1/2}$ であり、事後は $N(a^+,P^+)$ です。$\square$
<!-- proof-end -->

**何ができるようになったか**：位置の候補を格子へ離散化せず、$a^+$ と $P^+$ の有限個の数で観測後の不確実性を保持できます。ただし「分布が Gaussian」という主張は、**線形観測・独立 Gaussian 雑音・正定値の予測共分散**を仮定した結果です。

## 4. 二次元のセンサーは一つの和だけを読んでもよい

二次元のロボット位置 $X=(X_1,X_2)^T$ m を、予測平均 $a=(0,0)^T$ m、予測共分散 $P^-=\operatorname{diag}(4,1)$ m² で表します。センサーは両座標の和だけを測ります。1節の行列表示を使って

$$
H=\begin{pmatrix}1&1\end{pmatrix},\qquad
HX=\begin{pmatrix}1&1\end{pmatrix}\begin{pmatrix}X_1\\X_2\end{pmatrix}=X_1+X_2
$$

と書けます。観測雑音の分散は $R=(1)$ m²、実測は $z=3$ m です。$P^-$ は対称で、非零ベクトル $v=(v_1,v_2)^T$ に対して $v^TP^-v=4v_1^2+v_2^2>0$ です。$R=(1)$ も正定値です。$H$ は $1\times2$ で階数1ですが、[位置事後の命題](#prop-u2-03-robot-posterior)の条件を満たします。

各積を順番に計算します。

$$
(P^-)^{-1}=\begin{pmatrix}1/4&0\\0&1\end{pmatrix},
\quad
H^TR^{-1}H=\begin{pmatrix}1&1\\1&1\end{pmatrix}.
$$

$$
\Lambda=\begin{pmatrix}5/4&1\\1&2\end{pmatrix},
\qquad
\det\Lambda=(5/4)\cdot2-1=\frac32>0.
$$

$2\times2$ の逆行列の公式で対角要素を交換し、非対角要素の符号を変えると

$$
P^+=\frac{2}{3}\begin{pmatrix}2&-1\\-1&5/4\end{pmatrix}
=\begin{pmatrix}4/3&-2/3\\-2/3&5/6\end{pmatrix}\ {\rm m}^2.
$$

$\eta=(P^-)^{-1}a+H^TR^{-1}z=(3,3)^T$ より、

$$
a^+=P^+\eta
=\begin{pmatrix}(4/3)3-(2/3)3\\-(2/3)3+(5/6)3\end{pmatrix}
=\begin{pmatrix}2\\1/2\end{pmatrix}\ {\rm m}.
$$

測定値は3 mですが、更新後の平均による予測読み取りは $Ha^+=5/2$ m です。**測定値を無条件に満たすこと**が更新の目的ではありません。もとの位置への信頼とセンサーの信頼を両方使います。また事後の非対角共分散 $-2/3$ m² は、$X_1$ が大きければ $X_2$ が小さい方が「和が3」という情報と整合することを示します。

## 5. 観測はどの向きの不確実性を縮めるか

実対称行列 $M$ に対し、$M\succ0$ はすべての非零 $v$ で $v^TMv>0$（正定値）、$M\succeq0$ はすべての $v$ で $v^TMv\ge0$（半正定値）という記法です。実対称行列 $A,B$ に対し、$A-B\succeq0$ のとき $A\succeq B$ と表します。これは対角成分だけを比較するより強い、**任意方向の分散の比較**です。

<a id="prop-u2-03-covariance-contraction"></a>

<!-- formal-statement-start -->
> **命題（Gaussian 位置観測による共分散の縮小）**  
> 整数 $n,m\ge1$、実対称正定値な $P^-\in\mathbb R^{n\times n}$、$R\in\mathbb R^{m\times m}$、任意の $H\in\mathbb R^{m\times n}$ に対し、

$$
P^+=\bigl((P^-)^{-1}+H^TR^{-1}H\bigr)^{-1}
$$

> とすると、$P^-\succeq P^+\succ0$ が成り立つ。$H=0$ なら $P^+=P^-$ である。「縮小」は正定値模型の内部での分散比較であり、模型が誤っている場合の真の誤差が必ず縮むという主張ではない。
<!-- formal-statement-end -->

**証明の見取り図**：観測の項 $H^TR^{-1}H$ は非負の二次形式です。事前の精度行列に非負の項を足してから逆行列をとると、各方向の共分散は増えません。未観測方向には縮小のない場合があります。

<!-- proof-start -->
### 証明

$A=(P^-)^{-1}$ は対称正定値、$B=H^TR^{-1}H$ は対称半正定値です。[INV15 の正定値 Gaussian 密度の構成](../../../解析系/INV/INV15/index.md#def-inv15-gaussian-density)でも用いた実対称行列の直交対角化を $A$ に適用すると、直交行列 $U$ と正の固有値 $\alpha_1,\ldots,\alpha_n$ により

$$
A=U\operatorname{diag}(\alpha_1,\ldots,\alpha_n)U^T,\qquad U^TU=I
$$

と書けます。そこで $A^{1/2}=U\operatorname{diag}(\sqrt{\alpha_1},\ldots,\sqrt{\alpha_n})U^T$、$A^{-1/2}=U\operatorname{diag}(1/\sqrt{\alpha_1},\ldots,1/\sqrt{\alpha_n})U^T$ と定めます。これらは対称で、積が $A^{1/2}A^{-1/2}=I$ になります。$C=A^{-1/2}BA^{-1/2}$ と置くと、任意の $v$ に対し $v^TCv=(A^{-1/2}v)^TB(A^{-1/2}v)\ge0$ です。

$$
A+B=A^{1/2}(I+C)A^{1/2}
$$

なので、両辺の逆行列を順序を逆に掛けると

$$
P^+=A^{-1/2}(I+C)^{-1}A^{-1/2}.
$$

$C$ の固有値はすべて0以上であるため、$(I+C)^{-1}$ の固有値は $1/(1+\lambda_j)$ で、0より大きく1以下です。従って $I-(I+C)^{-1}$ は半正定値です。$A^{-1}=P^-$ を使うと

$$
P^--P^+
=A^{-1/2}\bigl(I-(I+C)^{-1}\bigr)A^{-1/2}
\succeq0.
$$

また $(I+C)^{-1}$ は正定値なので $P^+\succ0$ です。$H=0$ では $B=C=0$ で等号が成り立ちます。$\square$
<!-- proof-end -->

二次元例でも

$$
P^--P^+
=\begin{pmatrix}8/3&2/3\\2/3&1/6\end{pmatrix}
=\frac16\begin{pmatrix}4\\1\end{pmatrix}\begin{pmatrix}4&1\end{pmatrix}
$$

なので任意の $v$ について $v^T(P^--P^+)v=(4v_1+v_2)^2/6\ge0$ です。$(v_1,v_2)=(1,-4)$ 方向では等号になります。**一つの線形観測では全方向の分散が必ず厳密に下がるわけではありません。**

## 6. 証拠密度と、正定値仮定が壊れる場合

実測 $z$ の周辺確率密度は、$Z=HX+E$ が独立な Gaussian ベクトルの線形和であることから Gaussian になります。具体的には[INV15 の観測側公式](../../../解析系/INV/INV15/index.md#prop-inv15-observation-form)で、$A$ に $H$、$\mu_0$ に $a$、$\Gamma_0$ に $P^-$、$\Gamma_\varepsilon$ に $R$ を代入します。平均と共分散は

$$
\mathbb E[Z]=Ha,\qquad S=HP^-H^T+R.
$$

任意の非零 $w\in\mathbb R^m$ で $w^TSw=(H^Tw)^TP^-(H^Tw)+w^TRw>0$ なので $S$ は正定値です。従って

$$
f_Z(z)=\frac{\exp[-(z-Ha)^TS^{-1}(z-Ha)/2]}
{(2\pi)^{m/2}\sqrt{\det S}}>0
$$

です。これは**観測値の周辺密度**で、単一点の確率 $P(Z=z)$ ではありません。1次元の手計算例は $Ha=2$、$S=4+1=5$、$z=5$ なので $f_Z(5)=e^{-9/10}/\sqrt{10\pi}$ です。この密度が正で有限だから Bayes の比を作れます。

重要な境界例は三つあります。

- **事前共分散が退化する**：$X=(X_1,2)^T$、$X_1\sim N(0,1)$ とすると共分散は $\operatorname{diag}(1,0)$ です。位置の第2成分は確定しているので2次元 Lebesgue 密度はなく、$(P^-)^{-1}$ もありません。観測に正の雑音があっても第2成分は確定値2のままです。逆行列の公式へ0を代入してはいけません。
- **センサー雑音が退化する**：1次元で $R=(0)$、$Z=X$ なら観測が位置を厳密に決めますが、$R^{-1}$ と通常の観測密度は存在しません。これは正の雑音分散 $r\to0$ の**極限**を考えることとは区別します。
- **センサーが位置を読まない**：$H=0$ でも、$R\succ0$ なら模型は正則です。尤度は $x$ に依存せず、$\Lambda=(P^-)^{-1}$ だから事後は予測 belief と完全に一致します。

なお $H$ の階数不足は**それ自体は破綻ではありません**。事前が正定値なら $\Lambda$ の正定値性が残ることを、3節で証明しました。センサーが部分情報しか持たないことと、模型そのものの密度が退化することは別です。

## 7. 再実行できる数値検算

次の Python 実験では整数比を分数で計算し、逆行列の丸めに頼らずに1次元・2次元の平均と共分散を照合します。座標は m、共分散は m²、センサー雑音は指定された独立 Gaussian、時間発展はなく**一回の観測**だけです。確率分布からの乱数標本は使わず、実測は固定値です。

~~~python-file-lab
# lab-id: U2-03-LINEAR-GAUSSIAN
# lab-title: 線形 Gaussian 位置観測の事後分布
# lab-file: textbook/volumes/dream_thater/応用系/U/U2-03/assets/gaussian_update.py
# timeout-ms: 30000
# lab-preset: 1次元の距離センサー | --scenario scalar
# lab-preset: 2次元の和を観測 | --scenario plane
# lab-preset: 位置を読まないセンサー | --scenario blind
~~~

1次元の基準値は $a^+=22/5,\ P^+=4/5$、2次元の基準値は $a^+=(2,1/2)^T$、$P^+_{11}=4/3,\ P^+_{12}=-2/3,\ P^+_{22}=5/6$ です。章ディレクトリから

~~~bash
python assets/gaussian_update.py --scenario plane
python -m unittest discover -s assets/tests -v
~~~

で再現できます。数値だけを示す一覧より、共分散の負の非対角成分がどう生まれるかを4節の行列計算と照らして読むことが重要なので、ここでは図を付けません。

## 8. 演習と詳細解答

### Level A：密度の条件と基本更新

<a id="ex-u2-03-a01"></a>

**A1. 正定値な二次元予測と1本のセンサー**  
- Level: A

二次元位置 $X\sim N((1,2)^T,\operatorname{diag}(2,1))$、独立なセンサー雑音 $E\sim N(0,3)$、観測 $Z=(1,0)X+E$ を考える。[線形位置観測模型](#def-u2-03-linear-observation)の行列の次元、正定値性、$Z\mid X=x$ の平均と分散を確認せよ。

<!-- solution-start -->
**詳細解答**：状態は2成分、観測は1成分なので $n=2,m=1$、$H=(1,0)$ は $1\times2$ です。$\operatorname{diag}(2,1)$ は対称で、非零 $v$ に対し $2v_1^2+v_2^2>0$、$R=(3)$ は非零 $w$ に対し $3w^2>0$ です。独立性は問題で仮定されています。$HX=x_1$ なので、位置を $X=x$ に固定すると $Z=x_1+E$、従って $Z\mid X=x\sim N(x_1,3)$ です。各 $x$ で $z$ について正規化された密度を持ちます。
<!-- solution-end -->

<a id="ex-u2-03-a02"></a>

**A2. 1次元位置の平方完成**  
- Level: A

観測前 $X\sim N(2,4)$、独立雑音 $E\sim N(0,1)$、$Z=X+E$、実測 $z=5$ とする。事前密度と尤度の指数の和を展開し、事後平均と分散を求めよ。

<!-- solution-start -->
**詳細解答**：[Gaussian belief](#def-u2-03-gaussian-belief)と[観測模型](#def-u2-03-linear-observation)から二次式は

$$
Q_5(x)=\frac{(x-2)^2}{4}+(5-x)^2
=\frac54x^2-11x+26.
$$

平方完成では中心を $11/(2\cdot5/4)=22/5$ と定めます。定数項も照合すると

$$
Q_5(x)=\frac54\left(x-\frac{22}{5}\right)^2
+26-\frac54\left(\frac{22}{5}\right)^2
=\frac54\left(x-\frac{22}{5}\right)^2+\frac95.
$$
[事後更新命題](#prop-u2-03-robot-posterior)と同じ平方完成により、平均は $22/5$、分散は $1/(5/4)=4/5$ です。予測分散4より小さく、事後の密度は全実数上で積分1です。
<!-- solution-end -->

<a id="ex-u2-03-a03"></a>

**A3. 何も読まないセンサー**  
- Level: A

1次元位置 $X\sim N(-1,2)$ と独立雑音 $E\sim N(0,1)$ に対し、$Z=0X+E$ を考える。どの実測 $z\in\mathbb R$ に対しても更新値が変わらないことを示せ。

<!-- solution-start -->
**詳細解答**：$H=0$、$P^-=2$、$R=1$ は[更新命題](#prop-u2-03-robot-posterior)の条件を満たします。精度は $\Lambda=1/2+0=1/2$、情報ベクトルは $\eta=(-1)/2+0=-1/2$。従って $P^+=2$、$a^+=2(-1/2)=-1$ です。尤度 $f(z\mid x)=e^{-z^2/2}/\sqrt{2\pi}$ は $x$ に依存せず、正の証拠密度で割ると予測密度だけが残ることとも一致します。
<!-- solution-end -->

<a id="ex-u2-03-a04"></a>

**A4. 一座標だけの更新**  
- Level: A

予測 $X\sim N((0,0)^T,\operatorname{diag}(2,3))$、独立雑音 $E\sim N(0,2)$、$H=(1,0)$、実測 $z=4$ とする。精度行列 $\Lambda$ と情報ベクトル $\eta$ から事後平均・共分散を求めよ。

<!-- solution-start -->
**詳細解答**：$(P^-)^{-1}=\operatorname{diag}(1/2,1/3)$、$H^TR^{-1}H=\operatorname{diag}(1/2,0)$ なので

$$
\Lambda=\operatorname{diag}(1,1/3),\qquad
\eta=H^T(1/2)\cdot4=(2,0)^T.
$$

[事後更新公式](#prop-u2-03-robot-posterior)により $P^+=\operatorname{diag}(1,3)$、$a^+=P^+\eta=(2,0)^T$ です。第2座標は事前に独立で、センサーに入らないため、平均0・分散3のままです。
<!-- solution-end -->

<a id="ex-u2-03-a05"></a>

**A5. 証拠は確率か密度か**  
- Level: A

$X\sim N(2,4)$、独立な $E\sim N(0,1)$、$Z=X+E$ とする。観測値 $z=5$ における証拠密度を求め、$P(Z=5)$ と区別せよ。

<!-- solution-start -->
**詳細解答**：[観測側の Gaussian 公式](../../../解析系/INV/INV15/index.md#prop-inv15-observation-form)に $H=1,a=2,P^-=4,R=1$ を代入すると、$Z\sim N(2,5)$ です。従って

$$
f_Z(5)=\frac1{\sqrt{2\pi\cdot5}}
\exp\left[-\frac{(5-2)^2}{2\cdot5}\right]
=\frac{e^{-9/10}}{\sqrt{10\pi}}>0.
$$

連続分布なので単一点の確率 $P(Z=5)=0$ ですが、上の密度値は正です。[密度版 Bayes 更新](../U2-02/index.md#thm-u2-02-density-filter)で割るのはこの密度値です。
<!-- solution-end -->

### Level B：観測方向・仮定・逐次更新

<a id="ex-u2-03-b01"></a>

**B1. 二次元で和だけを観測する**  
- Level: B

二次元位置の予測 $X\sim N((0,0)^T,\operatorname{diag}(4,1))$、独立雑音 $E\sim N(0,1)$、観測 $Z=X_1+X_2+E$ で実測が3とする。事後共分散の非対角要素が負であることを、精度行列の逆行列から導き、理由を説明せよ。

<!-- solution-start -->
**詳細解答**：$H=(1,1)$、$R=1$ なので

$$
\Lambda=\operatorname{diag}(1/4,1)+\begin{pmatrix}1&1\\1&1\end{pmatrix}
=\begin{pmatrix}5/4&1\\1&2\end{pmatrix}.
$$

行列式は $(5/4)2-1=3/2$。[更新公式](#prop-u2-03-robot-posterior)から

$$
P^+=\frac{1}{3/2}\begin{pmatrix}2&-1\\-1&5/4\end{pmatrix}
=\begin{pmatrix}4/3&-2/3\\-2/3&5/6\end{pmatrix}.
$$

$P^+_{12}=-2/3<0$ です。センサーが $X_1+X_2$ を読んだため、一方の候補値を上げたときに他方を下げる組合せが観測と整合し、負の条件付き共分散が生まれます。最初の2座標は独立ですが、観測後に独立とは限りません。
<!-- solution-end -->

<a id="ex-u2-03-b02"></a>

**B2. センサー精度と極限**  
- Level: B

1次元で事前分散 $p=3$、$Z=2X+E$、独立雑音の分散 $r>0$ とする。事後分散 $p^+(r)$ を求め、$r=4$ の値と $r\to\infty$, $r\downarrow0$ の極限を示し、$r=0$ を公式へ直接代入してよいか述べよ。

<!-- solution-start -->
**詳細解答**：[1次元平方完成](#prop-u2-03-robot-posterior)の精度は $\lambda=1/3+2^2/r=1/3+4/r$ です。よって

$$
p^+(r)=\lambda^{-1}
=\frac{1}{(r+12)/(3r)}=\frac{3r}{r+12}.
$$

$r=4$ で $p^+=12/16=3/4$、$r\to\infty$ では分子分母を $r$ で割ると3、$r\downarrow0$ では0です。ただし $r=0$ では正定値仮定が壊れ $r^{-1}$ が存在せず、今回の Gaussian **密度**の式へ直接代入できません。極限の収束と、退化模型に同じ公式を適用できることは別です。
<!-- solution-end -->

<a id="ex-u2-03-b03"></a>

**B3. 動かずに二つの独立な測定を読む**  
- Level: B

同じ1次元位置 $X\sim N(0,4)$ に対し、$Z_1=X+E_1,\ Z_2=X+E_2$ を測る。$E_1\sim N(0,1),E_2\sim N(0,4)$ とし、**$X,E_1,E_2$ の3変数は相互に独立**とする（単に各2変数が独立という仮定より強い）。実測 $z_1=2,z_2=-1$ を順に取り込んだ事後平均と分散を求め、尤度を同時に掛けても同じ結果になることを示せ。移動による予測は入れない。

<!-- solution-start -->
**詳細解答**：最初の[Gaussian 更新](#prop-u2-03-robot-posterior)は精度 $\lambda_1=1/4+1=5/4$、情報量 $\eta_1=0+2=2$。従って事後分散 $p_1=4/5$、平均 $a_1=(4/5)2=8/5$ です。

相互独立性から $X=x$ を固定した後も $E_1,E_2$ の条件付き分布は独立なままです。従って $f(z_1,z_2\mid x)=f(z_1\mid x)f(z_2\mid x)$ です。この根拠の下で2回目の尤度を掛けると、精度と情報量は

$$
\lambda_2=\frac1{p_1}+\frac1{4}=\frac54+\frac14=\frac32,
\quad
\eta_2=\frac{a_1}{p_1}+\frac{z_2}{4}=2-\frac14=\frac74.
$$

従って $p_2=2/3$、$a_2=(2/3)(7/4)=7/6$ です。同時更新では独立性により $f(z_1,z_2\mid x)=f(z_1\mid x)f(z_2\mid x)$ なので、二次式の $x^2$ 係数は $1/4+1+1/4=3/2$、線形項の係数は $0+2-1/4=7/4$ です。同じ平方完成を得ます。独立でない測定値を無条件に二重に数えてよいわけではありません。
<!-- solution-end -->

<a id="ex-u2-03-b04"></a>

**B4. 退化した事前と階数不足を見分ける**  
- Level: B

(i) $X=(X_1,2)^T$、$X_1\sim N(0,1)$、独立雑音 $E\sim N(0,1)$、$Z=X_2+E$ とする。(ii) $X\sim N((0,0)^T,I_2)$、同じ雑音、$Z=X_2+E$ とする。それぞれで公式を使えるか、$X_2$ の観測後の性質を説明せよ。

<!-- solution-start -->
**詳細解答**：(i) 事前共分散は $\operatorname{diag}(1,0)$ です。非零 $v=(0,1)^T$ について $v^TP^-v=0$ なので正定値ではなく、逆行列もありません。[更新公式](#prop-u2-03-robot-posterior)を適用することはできません。しかも $X_2=2$ が確定しているので、観測 $Z=2+E$ を得ても $X_2$ の条件付き分布は確定値2のままです。

(ii) $P^-=I_2$ は正定値、$R=1$ も正定値、$H=(0,1)$ は階数1でも[命題](#prop-u2-03-robot-posterior)の仮定を満たします。精度 $\Lambda=I_2+H^TH=\operatorname{diag}(1,2)$、$P^+=\operatorname{diag}(1,1/2)$ です。観測値を $z$ とすると $\eta=(0,z)^T$、$a^+=(0,z/2)^T$。第2成分は確定せず、平均 $z/2$、分散 $1/2$ です。階数不足と事前の退化を混同してはいけません。
<!-- solution-end -->

### Level C：二次元位置の統合推定と誤実装の診断

<a id="ex-u2-03-c01"></a>

**C1. 1本の観測で二次元の belief はどう変わるか**  
- Level: C

二次元位置 $X=(X_1,X_2)^T$ m の予測を $N((1,0)^T,\operatorname{diag}(1,4))$、独立な測定雑音を $E\sim N(0,1)$ m とする。センサーは $Z=X_1+X_2+E$ を読み、実測は $z=0$ m だった。以下を求めよ。

1. 共分散と雑音、観測行列について[線形位置観測模型](#def-u2-03-linear-observation)の仮定を確認せよ。
2. $\Lambda,\eta,\det\Lambda$ を計算し、平方完成の中心として事後平均と分散共分散行列を求めよ。
3. 観測値の証拠密度 $f_Z(0)$ を求め、実測が0だから事後平均の和も0でなければならない、という主張を検討せよ。
4. 事後の $X_1+X_2$ の分散を求め、非対角共分散を無視して各分散を足した場合との違いを説明せよ。
5. $H$ が階数1でも公式が成立する理由と、この観測で全方向の分散が厳密に縮小するかを判定せよ。

<!-- solution-start -->
**詳細解答**：

**(1)** $n=2,m=1$、$H=(1,1)$ は $1\times2$ です。$P^-=\operatorname{diag}(1,4)$ は対称で $v\ne0$ に対して $v_1^2+4v_2^2>0$、$R=(1)$ も正定値です。$E$ と $X$ の独立性は問題で明示されており、[線形模型](#def-u2-03-linear-observation)の条件を満たします。

**(2)** 予測の精度は $\operatorname{diag}(1,1/4)$、観測の寄与は $H^TR^{-1}H=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ です。[更新命題](#prop-u2-03-robot-posterior)を使うと

$$
\Lambda=\begin{pmatrix}2&1\\1&5/4\end{pmatrix},
\quad
\eta=\begin{pmatrix}1&0\\0&1/4\end{pmatrix}\begin{pmatrix}1\\0\end{pmatrix}
+\begin{pmatrix}1\\1\end{pmatrix}0
=\begin{pmatrix}1\\0\end{pmatrix}.
$$

行列式は $2(5/4)-1=3/2>0$ です。二次式の $-2x^T\eta$ を打ち消す中心 $a^+=\Lambda^{-1}\eta$ と、逆精度行列 $P^+$ は

$$
P^+=\frac{2}{3}\begin{pmatrix}5/4&-1\\-1&2\end{pmatrix}
=\begin{pmatrix}5/6&-2/3\\-2/3&4/3\end{pmatrix},
\quad
a^+=\begin{pmatrix}5/6\\-2/3\end{pmatrix}.
$$

実際に $\Lambda a^+=\bigl(2(5/6)-2/3,\ 5/6-(5/4)(2/3)\bigr)^T=(1,0)^T=\eta$ で、平方完成の中心が正しいことを確認できます。

**(3)** [観測側の公式](../../../解析系/INV/INV15/index.md#prop-inv15-observation-form)に $Ha=1$、$HP^-H^T=1+4=5$、$R=1$ を代入して $Z\sim N(1,6)$ です。従って

$$
f_Z(0)=\frac1{\sqrt{12\pi}}\exp\left[-\frac{(0-1)^2}{12}\right]
=\frac{e^{-1/12}}{\sqrt{12\pi}}>0.
$$

事後平均の和は $5/6-2/3=1/6$ m で、実測0と異なります。センサーには分散1の誤差があり、予測位置にも制約があるため、観測値に必ず一致させる推定ではありません。

**(4)** 事後和の分散は定義から $\operatorname{Var}(X_1+X_2\mid Z=0)=P^+_{11}+2P^+_{12}+P^+_{22}$ です。よって

$$
\frac56+2\left(-\frac23\right)+\frac43
=\frac56.
$$

非対角共分散を無視すると $5/6+4/3=13/6$ と誤ります。観測で二座標が負に相関したことを無視するためです。予測和の分散は $1+4=5$ なので、観測後は $5/6$ に縮小しています。

**(5)** [精度行列の正定値性の証明](#prop-u2-03-robot-posterior)で $v^T(P^-)^{-1}v>0$ が保証され、観測項 $(Hv)^TR^{-1}(Hv)$ は非負なので $\Lambda$ は正定値です。よって $H$ が階数1でも可逆です。[共分散縮小命題](#prop-u2-03-covariance-contraction)は半正定値の差だけを保証します。ここでは直接差を引くと

$$
P^--P^+
=\begin{pmatrix}1/6&2/3\\2/3&8/3\end{pmatrix}
=\frac16\begin{pmatrix}1\\4\end{pmatrix}\begin{pmatrix}1&4\end{pmatrix}
$$

です。この差は階数1であり、非零ベクトル $v=(4,-1)^T$ について

$$
v^T(P^--P^+)v=\frac16(v_1+4v_2)^2
=\frac16(4-4)^2=0
$$

となります。したがってこの方向では事前・事後の分散が等しく、全方向の厳密な縮小ではありません。

<!-- solution-end -->

## 9. 振り返りと次の問い

Bayes 更新の「予測密度 × 観測尤度」は、線形 Gaussian 模型では平方完成によって**平均と共分散の更新**になります。事前の正定値性が逆行列を保証し、観測が階数不足でも計算できます。一方、観測が正確すぎて雑音が退化した模型や、確定成分のある事前には、そのまま逆行列の式を使えません。

次の **U2-04** では、観測を受ける前にロボットが移動したとき、運動の不確実性が位置の平均と共分散へどのように伝わるかを導きます。
