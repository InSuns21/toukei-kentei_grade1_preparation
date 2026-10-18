# ML1-06 Lasso・疎性・近接写像

<!-- definition-example-audit: strict -->

## 1. 係数を小さくするだけでなく、0にしたい

[前講のRidge回帰](../ML1-05/index.md#def-ml1-05-ridge)は係数の二乗和を罰し、階数欠損でも一意な解を与えた。一方、たくさんの特徴量を入れたとき「使わない特徴量の係数を**厳密に0**にする」ことには別の価値がある。係数が0なら、その特徴量を線形予測の和から取り除ける。ただし0になったことは、その特徴量と目的変数に因果関係がないことや、真の係数が0であることの証明ではない。

二乗罰則は原点で滑らかだが、絶対値には原点で角がある。この角が0を最適解として許す範囲を作る。すでに学んだ[劣勾配・劣微分](../../OPT/OPT3/index.md#def-opt3-subgradient)は微分できない点でも最適性を判定できる道具であり、[近接作用素](../../OPT/OPT8/index.md#def-opt8-proximal-mapping)はその判定を反復計算に移す。本章ではこれらを**学習標本の二乗損失**へ代入し、正規化係数を保ったまま疎性の仕組みを求める。

まず $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ は観測後に固定した値とする。$X$ の第 $j$ 列を $x_j$ と書く。切片は当面含めず、最後に切片を罰しない場合を考える。確率模型や正規誤差は最適化の議論には必要ない。

## 2. Lasso目的と絶対値の角

係数 $\beta=(\beta_1,\ldots,\beta_p)^{\mathsf T}$ の絶対値和 $\|\beta\|_1=\sum_{j=1}^p|\beta_j|$ を、二乗残差と足し合わせる。これは二乗和 $\|\beta\|_2^2$ と違い、各成分が原点へ到達したあと0に留まれる罰則である。

<a id="def-ml1-06-lasso"></a>

<!-- formal-statement-start -->
> **定義（Lasso回帰）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$、$\lambda\ge0$ に対し
>
$$
J_\lambda(\beta)
=\frac1{2n}\|X\beta-y\|_2^2+\lambda\sum_{j=1}^{p}|\beta_j|,
\qquad \beta\in\mathbb R^p
$$
>
> を最小化する方法を **Lasso** という。$\lambda$ は正則化係数、$\|\beta\|_1$ は $\ell^1$ ノルムである。最小点の集合を $\mathcal M_\lambda$ と書く。係数に0成分が多いことを **疎性** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ml1-06-lasso -->
**定義の確認**。$n=p=2$、$X=\sqrt2 I_2$、$y=\sqrt2(3,1/2)^{\mathsf T}$、$\lambda=1$ とする。行列を掛けると $X\beta-y=\sqrt2(\beta_1-3,\beta_2-1/2)^{\mathsf T}$ だから、$1/(2n)=1/4$ を忘れずに代入して

$$
J_1(\beta)=\frac12\{(\beta_1-3)^2+(\beta_2-1/2)^2\}+|\beta_1|+|\beta_2|.
$$

$\beta=(2,0)^{\mathsf T}$ では二乗損失は $(1+1/4)/2=5/8$、絶対値罰則は $2$、合計 $J_1(2,0)=21/8$ である。$\beta=0$ では $J_1(0)=(9+1/4)/2=37/8$。これで定義の二項と「0成分」の意味は直接確認できたが、$(2,0)$ の大域最小性はまだ示していない。
<!-- definition-example-end -->

**$\lambda$ と $n$ の位置に注意**。本章では二乗損失を $1/(2n)$ 倍し、絶対値罰則は $\lambda\|\beta\|_1$ とする。文献によって残差平方和に $1/2$ を使うため、同じ記号 $\lambda$ でも閾値が $n$ 倍異なり得る。以降の式はすべて上の正規化で導く。

## 3. 微分不能点を含む最適性条件

滑らかな二乗損失の勾配は[最小二乗の正規方程式の導出](../ML1-04/index.md#thm-ml1-04-normal-equations)により $X^{\mathsf T}(X\beta-y)/n$ である。絶対値については $\beta_j>0$ なら劣微分が $\{1\}$、$\beta_j<0$ なら $\{-1\}$、$\beta_j=0$ なら $[-1,1]$ になる。原点の区間は[劣微分の直接例](../../OPT/OPT3/index.md#def-opt3-subgradient)において「すべての実数方向を下から支える」という定義を確認した結果である。

<a id="thm-ml1-06-kkt"></a>

<!-- formal-statement-start -->
> **定理（Lassoの座標別最適性条件）**  
> 上のLasso目的で $\lambda\ge0$ とする。$\widehat\beta\in\mathbb R^p$ が大域最小点である必要十分条件は、残差 $r=y-X\widehat\beta$ を用いて、各 $j=1,\ldots,p$ に対し次を満たすことである。
>
> - $\widehat\beta_j>0$ なら $x_j^{\mathsf T}r/n=\lambda$。
> - $\widehat\beta_j<0$ なら $x_j^{\mathsf T}r/n=-\lambda$。
> - $\widehat\beta_j=0$ なら $|x_j^{\mathsf T}r/n|\le\lambda$。
>
> 特に $\beta=0$ が最適点である必要十分条件は
>
$$
\lambda\ge\max_{1\le j\le p}\left|\frac{x_j^{\mathsf T}y}{n}\right|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

二乗損失は微分可能な凸関数、絶対値和は有限値凸関数なので、[劣微分和則](../../OPT/OPT3/index.md#thm-opt3-sum-rule)を適用できる。[Fermat条件](../../OPT/OPT3/index.md#thm-opt3-fermat)で「0が劣微分に入る」ことを最小性と結び付け、成分ごとに原点の区間条件を調べる。

<!-- proof-start -->
### 証明

$f(\beta)=\|X\beta-y\|_2^2/(2n)$、$g(\beta)=\lambda\|\beta\|_1$ とする。両方とも有限値凸関数なので和則が適用でき、$f$ は微分可能だから

$$
\partial J_\lambda(\beta)
=\left\{\frac1nX^{\mathsf T}(X\beta-y)\right\}
 +\lambda\partial\|\beta\|_1.
$$

劣勾配の定義から各座標の絶対値和が分離することを確認すると、

$$
u\in\partial\|\beta\|_1
\iff
u_j\in
\begin{cases}
\{1\},&\beta_j>0,\\
[-1,1],&\beta_j=0,\\
\{-1\},&\beta_j<0
\end{cases}
\quad(j=1,\ldots,p).
$$

実際、右辺の各 $u_j$ に対して $|t_j|\ge|\beta_j|+u_j(t_j-\beta_j)$ を足すと劣勾配不等式を得る。逆に全体の劣勾配不等式で $\beta$ の第 $j$ 座標だけを $t_j$ に変えれば、各一変数条件が必要になる。

Fermat条件で $0\in\partial J_\lambda(\widehat\beta)$ は最小性と同値であり、したがって

$$
\frac1nX^{\mathsf T}(y-X\widehat\beta)=\lambda u,
\qquad
u_j\in\partial|\widehat\beta_j|
$$

である。$u_j$ の三場合を代入すると定理の条件を得る。$\widehat\beta=0$ と置くと $r=y$ で全座標が零成分の場合となるので、最後の最大値条件も必要十分である。$\lambda=0$ の場合にも $x_j^{\mathsf T}r=0$ という正規方程式として成立する。$\square$
<!-- proof-end -->

**どのように判定するか**。ある係数を0と仮定したら、その列と残差の内積を $n$ で割って計算し、その絶対値が $\lambda$ 以下か確かめる。ただしこの不等式だけを一座標で確認しても、他の座標の条件が満たされなければ最適解ではない。等号で0となることもあり、等号だけから非零と判定してはいけない。

## 4. 一変数からソフト閾値処理を導く

まず $a>0$、$z\in\mathbb R$、$\lambda\ge0$ に対する一変数目的 $a(b-z)^2/2+\lambda|b|$ を解く。$a$ は二次曲線の曲がり具合であり、$\lambda/a$ が0に落ちる区間の幅を決める。[ソフト閾値処理の定義](../../OPT/OPT8/index.md#def-opt8-soft-threshold)を $S_t(z)=\operatorname{sign}(z)\max(|z|-t,0)$ と書く（$z=0$ では値を0とする）。

<a id="thm-ml1-06-scalar"></a>

<!-- formal-statement-start -->
> **定理（一変数Lassoのソフト閾値解）**  
> $a>0$、$z\in\mathbb R$、$\lambda\ge0$ とすると
>
$$
\operatorname*{arg\,min}_{b\in\mathbb R}
\left\{\frac a2(b-z)^2+\lambda|b|\right\}
=\left\{S_{\lambda/a}(z)\right\}.
$$
>
> 特に最小点は $|z|\le\lambda/a$ でちょうど0となる。
<!-- formal-statement-end -->

### 証明の見取り図

[近接作用素の最適性条件](../../OPT/OPT8/index.md#thm-opt8-proximal-optimality)で二次項と絶対値の釣り合いを表せる。ここではLassoの閾値を明示するため、$b>0$、$b<0$、$b=0$ をそれぞれ直接計算する。

<!-- proof-start -->
### 証明

目的は $a>0$ により狭義凸かつ強圧的で、最小点は存在し唯一である。劣微分のFermat条件は

$$
0\in a(b-z)+\lambda\partial|b|
\iff a(z-b)\in\lambda\partial|b|.
$$

$b>0$ の場合、右辺の劣微分は $\{1\}$ だから $b=z-\lambda/a$、これが正になる条件は $z>\lambda/a$ である。

$b<0$ の場合は $\partial|b|=\{-1\}$ だから $b=z+\lambda/a$、負になる条件は $z<-\lambda/a$ である。

$b=0$ の場合は $\partial|0|=[-1,1]$ なので $az\in[-\lambda,\lambda]$、すなわち $|z|\le\lambda/a$ である。三場合はすべての $z$ を覆い、境界で同じ値0を与えるため

$$
b=
\begin{cases}
z-\lambda/a,&z>\lambda/a,\\
0,&|z|\le\lambda/a,\\
z+\lambda/a,&z<-\lambda/a
\end{cases}
=S_{\lambda/a}(z).
$$

狭義凸性から他の解はない。$\square$
<!-- proof-end -->

**具体例**。$a=2$、$z=3$、$\lambda=2$ なら閾値は1、解は $b=2$ となる。$\lambda=6$ なら閾値3に達するので解は0。対して同じ二次損失にRidge型の罰則 $\lambda b^2/2$ を加えると微分方程式 $a(b-z)+\lambda b=0$ から $b=az/(a+\lambda)$ となり、有限の $\lambda$ では $z\ne0$ を厳密な0にはしない。

## 5. 直交デザインのLassoをすべての座標で解く

線形予測の各列が直交するとは、$i\ne j$ で $x_i^{\mathsf T}x_j=0$ ということである。各列の長さは同じでなくてよい。$d_j=\|x_j\|_2^2/n$、$c_j=x_j^{\mathsf T}y/n$ と定めると、直交性はGram行列 $X^{\mathsf T}X/n=\operatorname{diag}(d_1,\ldots,d_p)$ を意味する。この基底表示への橋渡しは残差平方を直接展開して得る。

$$
\frac1{2n}\|X\beta-y\|^2
=\frac{\|y\|^2}{2n}
-\sum_jc_j\beta_j+\frac12\sum_jd_j\beta_j^2.
$$

$d_j>0$ の座標は $z_j=c_j/d_j$ と置いて平方完成できる。$d_j=0$ なら $x_j=0$、したがって $c_j=0$ であり、その係数は予測を全く変えない。

<a id="thm-ml1-06-orthogonal"></a>

<!-- formal-statement-start -->
> **定理（直交デザインのLasso解）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$ の列は互いに直交し、$y\in\mathbb R^n$、$\lambda>0$ とする。$d_j=\|x_j\|^2/n$、$c_j=x_j^{\mathsf T}y/n$ とする。このときLassoの解は唯一で、各座標は
>
$$
\widehat\beta_j=
\begin{cases}
\dfrac{\operatorname{sign}(c_j)(|c_j|-\lambda)_+}{d_j},&d_j>0,\\
0,&d_j=0,
\end{cases}
\qquad
(t)_+=\max(t,0).
$$
>
> $d_j>0$ の座標は $|c_j|\le\lambda$ のときちょうど0である。
<!-- formal-statement-end -->

### 証明の見取り図

直交性で二乗損失の交差項が消え、全体の最小化が独立した一変数問題へ分解する。$d_j>0$ は前節の定理を使い、$d_j=0$ は罰則だけが残るので別に処理する。

<!-- proof-start -->
### 証明

前掲の展開式に $\lambda\sum_j|\beta_j|$ を加える。$d_j>0$ では

$$
\frac{d_j}{2}\beta_j^2-c_j\beta_j+\lambda|\beta_j|
=\frac{d_j}{2}(\beta_j-c_j/d_j)^2+\lambda|\beta_j|
-\frac{c_j^2}{2d_j}.
$$

最後の項は $\beta_j$ に依存しないため、[一変数ソフト閾値解](#thm-ml1-06-scalar)へ $a=d_j$、$z=c_j/d_j$ を代入できる。ゆえに $\widehat\beta_j=S_{\lambda/d_j}(c_j/d_j)$ であり、表示の式と一致する。

$d_j=0$ なら $\|x_j\|=0$ より $x_j=0$、$c_j=0$。目的関数でその成分に依存するのは $\lambda|\beta_j|$ だけであり、$\lambda>0$ だから唯一の最小値は $\beta_j=0$ で達成される。各座標の解が唯一で独立しているため、全体の解も唯一である。$\square$
<!-- proof-end -->

**正規化列の例**。$X^{\mathsf T}X/n=I_p$ なら $d_j=1$ で、$c_j=x_j^{\mathsf T}y/n$ から

$$
\widehat\beta_j=S_\lambda(c_j)
$$

となる。第2節の例は $c=(3,1/2)^{\mathsf T}$、$\lambda=1$ だから $(2,0)$ が一意の解だと分かった。Ridgeなら同じ正規化と $\lambda$ で $c_j/(1+\lambda)$ となり $(3/2,1/4)$ である。Lassoは小さい相関を消し、Ridgeは全てを滑らかに縮める。

非直交デザインではGram行列の交差項 $\beta_i\beta_j x_i^{\mathsf T}x_j/n$ が残るため、**各 $c_j$ を一度だけ独立に閾値処理しても一般にはLasso解にならない**。代わりに第3節の残差相関条件で全座標を同時に検証する。

## 6. 解は存在するが、必ずしも一意ではない

Ridgeは $\lambda>0$ なら全方向で二次の曲率を与えた。しかしLassoの絶対値は0から離れると線形なので、同じ予測を与える異なる係数を区別できない場合がある。

<a id="thm-ml1-06-existence"></a>

<!-- formal-statement-start -->
> **定理（Lasso解の存在・一意性の十分条件）**  
> $n,p\ge1$、$X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ とする。$\lambda>0$ ならLassoの大域最小点は少なくとも一つ存在する。さらに $X$ の列が一次独立なら最小点は唯一である。一般には列が一次従属すると最小点が複数存在し得るが、任意の二つの最小点 $\beta,\gamma$ について適合値は $X\beta=X\gamma$ と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

存在は $\lambda\|\beta\|_1$ が係数を無限遠へ逃がさないこと、一意性はフルランクの二乗損失が狭義凸であることから示す。適合値の一意性は、二つの異なる適合値の中点で二乗誤差が厳密に減ることから証明する。

<!-- proof-start -->
### 証明

$\lambda>0$ なら $J_\lambda(\beta)\ge\lambda\|\beta\|_1\ge\lambda\|\beta\|_2$ であり、$\|\beta\|_2\to\infty$ で目的値も無限大へ向かう。連続関数なので、十分大きな閉球内で最小値を取り、その点は全空間でも最小点である。

$X$ の列が一次独立なら任意の $\beta\ne\gamma$ に対し $X\beta\ne X\gamma$。$0<t<1$ と置き、$u=X\beta-y$、$v=X\gamma-y$ とすると

$$
\|tu+(1-t)v\|^2
=t\|u\|^2+(1-t)\|v\|^2-t(1-t)\|u-v\|^2
$$

である。最後の項が正なので二乗損失は狭義凸。絶対値和は凸だから和も狭義凸となり、二つの異なる最小点はあり得ない。

列が従属する一般の場合でも、もし最小点 $\beta,\gamma$ の適合値が異なれば、上式の厳密な二乗損失減少と罰則の凸性によって、中点 $(\beta+\gamma)/2$ の目的値が共通最小値より小さくなる。これは矛盾するので適合値は等しい。$\square$
<!-- proof-end -->

**非一意性の反例**。$n=1$、$X=(1\ \ 1)$、$y=2$、$\lambda=1/2$ では

$$
J_{1/2}(\beta_1,\beta_2)
=\frac12(\beta_1+\beta_2-2)^2+\frac12(|\beta_1|+|\beta_2|).
$$

$s=\beta_1+\beta_2$ と置くと三角不等式で $|\beta_1|+|\beta_2|\ge|s|$ なので

$$
J_{1/2}(\beta_1,\beta_2)\ge\frac12(s-2)^2+\frac12|s|.
$$

[一変数ソフト閾値解](#thm-ml1-06-scalar)に $a=1,z=2,\lambda=1/2$ を入れると $s=3/2$ が唯一の最小和である。$\beta_1,\beta_2\ge0$ かつ $\beta_1+\beta_2=3/2$ なら三角不等式が等号となり、すべて同じ最小値を達成する。例えば $(3/2,0)$ と $(0,3/2)$ は異なるLasso解だが適合値は共に $3/2$。失われた仮定は列の一次独立性であり、前証明の狭義凸性を保証する $X(\beta-\gamma)\ne0$ が壊れる。

## 7. 切片と近接勾配法：実際に反復して求める

切片 $\alpha$ を罰しない線形予測 $\alpha\mathbf 1+Z\theta$ では、$\theta$ のみに $\lambda\|\theta\|_1$ を課す。$\alpha$ に関する微分は

$$
\frac{\partial J}{\partial\alpha}
=\frac1n\mathbf1^{\mathsf T}(\alpha\mathbf1+Z\theta-y)=0
$$

なので $\widehat\alpha=\bar y-\bar z^{\mathsf T}\widehat\theta$。これを残差へ代入すれば $Z_c=Z-\mathbf1\bar z^{\mathsf T}$、$y_c=y-\bar y\mathbf1$ に対するLassoが得られる。これは前講の[切片を罰しないRidge](../ML1-05/index.md#thm-ml1-05-unique)と同じ中心化の考えだが、**傾き側の罰則は絶対値**である。標準化（列のスケール変更）は $d_j,c_j$ と罰則の相対的な効果を変えるため、学習用データだけで決めた尺度を後の検証データにも適用する。

非直交デザインの近似解には[近接勾配法](../../OPT/OPT8/index.md#def-opt8-proximal-gradient)を使える。$f(\beta)=\|X\beta-y\|^2/(2n)$ と $g(\beta)=\lambda\|\beta\|_1$ に分けると、$\nabla f(\beta)=X^{\mathsf T}(X\beta-y)/n$。$X\ne0$ なら勾配は $L=\|X^{\mathsf T}X/n\|_2>0$ に対して $L$-Lipschitzである。[近接作用素の絶対値公式](../../OPT/OPT8/index.md#thm-opt8-l1-prox)から、一段の更新は次になる。

<a id="prop-ml1-06-ista"></a>

<!-- formal-statement-start -->
> **命題（Lassoに対するISTA更新）**  
> $X\in\mathbb R^{n\times p}$ は零行列でなく、$y\in\mathbb R^n$、$\lambda\ge0$、$n,p\ge1$ とする。$L=\|X^{\mathsf T}X/n\|_2$、$0<t\le1/L$ とすれば、Lasso目的 $J_\lambda=f+g$ に対する近接勾配法は
>
$$
\beta^{(k+1)}
=S_{t\lambda}\left(
\beta^{(k)}+\frac t n X^{\mathsf T}(y-X\beta^{(k)})
\right)
$$
>
> である。$S_{t\lambda}$ は各座標へ施す。[近接勾配法の収束評価](../../OPT/OPT8/index.md#thm-opt8-proximal-gradient-rate)は、Lassoの最小点 $\beta^\ast$ と歩幅 $t=1/L$ に対して $J_\lambda(\beta^{(k)})-J_\lambda(\beta^\ast)\le L\|\beta^{(0)}-\beta^\ast\|^2/(2k)$（$k\ge1$）を与える。
<!-- formal-statement-end -->

### 証明の見取り図

二乗損失の勾配ステップと、$\ell^1$ の近接作用素であるsoft-thresholdingを合成する。収束評価はOPT8の定理に適用するだけだが、その適用条件を確認する。

<!-- proof-start -->
### 証明

$f$ の勾配差は $X^{\mathsf T}X(\beta-\gamma)/n$ で、作用素ノルムの定義から $\|\nabla f(\beta)-\nabla f(\gamma)\|\le L\|\beta-\gamma\|$。$f$ は有限値凸、$g=\lambda\|\cdot\|_1$ は閉真凸である。近接勾配法の一段は

$$
\operatorname{prox}_{tg}\bigl(\beta^{(k)}-t\nabla f(\beta^{(k)})\bigr).
$$

[絶対値罰則の近接公式](../../OPT/OPT8/index.md#thm-opt8-l1-prox)へ $tg=t\lambda\|\cdot\|_1$ を代入すると $S_{t\lambda}$ になる。勾配の式を入れれば表示の更新を得る。[Lassoの存在定理](#thm-ml1-06-existence)で $\lambda>0$ の最小点は存在する。$\lambda=0$ でも[最小二乗解の存在](../ML1-04/index.md#thm-ml1-04-existence-fitted-values)により最小点がある。以上でOPT8の凸性・滑らかさ・最小点存在条件を満たし、$t=1/L$ の評価を適用できる。$\square$
<!-- proof-end -->

**一段の計算**。$X=\sqrt2 I_2$、$y=\sqrt2(2,1/2)^{\mathsf T}$、$n=2$ なら $L=1$。$\beta^{(0)}=0$、$\lambda=3/4$、$t=1$ では勾配ステップが $(2,1/2)$ となり、閾値 $3/4$ によって $\beta^{(1)}=(5/4,0)$。列が直交するこの例では一段で最小点へ達するが、一般には複数回の更新が必要になる。$X=0$ なら $L=0$ で上の歩幅指定は使わず、$\lambda>0$ の場合は直接 $\beta=0$ と解けばよい。

## 8. 計算ラボ：小さい相関が0になる境界

次のPythonラボでは正規直交デザイン $X^{\mathsf T}X/n=\operatorname{diag}(d_1,d_2,d_3)$（$d_j>0$）を仮定し、$z_j=c_j/d_j$ を使ってLassoとRidgeの係数・目的値を同時に計算する。乱数は用いず、係数を変更すれば再実行した値も変わる。損失のうち $\beta$ に依存しない定数は除き、$\frac12\sum_jd_j(\beta_j-z_j)^2$ を用いる。

~~~python-lab
# lab-id: ml1-06-sparse-path
# lab-title: 直交デザインにおけるLassoとRidge
# lab-mode: exercise
# timeout-ms: 10000
z = [2.0, 0.5, -1.2]
d = [1.0, 4.0, 0.5]
lam = 0.75
assert lam >= 0 and all(a > 0 for a in d)
corr = [a * v for a, v in zip(d, z)]

# ヒント: corr = d*z に対して各座標で閾値 lam を適用する。
lasso = [___ for c, a in zip(corr, d)]
ridge = [c / (a + lam) for c, a in zip(corr, d)]
loss = lambda b: sum(a * (v - t)**2 / 2 for a, v, t in zip(d, b, z))
j_lasso = loss(lasso) + lam * sum(abs(v) for v in lasso)
j_ridge = loss(ridge) + lam * sum(v*v for v in ridge) / 2
print("correlation:", corr)
print("lasso:", lasso, "objective:", round(j_lasso, 6))
print("ridge:", ridge, "objective:", round(j_ridge, 6))
~~~

~~~python-solution
z = [2.0, 0.5, -1.2]
d = [1.0, 4.0, 0.5]
lam = 0.75
assert lam >= 0 and all(a > 0 for a in d)
corr = [a * v for a, v in zip(d, z)]
lasso = [((c - lam)/a if c > lam
          else (c + lam)/a if c < -lam
          else 0.0) for c, a in zip(corr, d)]
ridge = [c / (a + lam) for c, a in zip(corr, d)]
loss = lambda b: sum(a * (v - t)**2 / 2 for a, v, t in zip(d, b, z))
j_lasso = loss(lasso) + lam * sum(abs(v) for v in lasso)
j_ridge = loss(ridge) + lam * sum(v*v for v in ridge) / 2
print("correlation:", corr)
print("lasso:", lasso, "objective:", round(j_lasso, 6))
print("ridge:", ridge, "objective:", round(j_ridge, 6))
~~~

~~~python-test
# 変更した z, d, lam の値でも最適性を直接点検する。
assert len(z) == len(d) == len(lasso) == len(ridge)
for c, a, b, r in zip(corr, d, lasso, ridge):
    assert abs((a + lam)*r - c) < 1e-10
    grad_correlation = c - a*b
    if b > 1e-10:
        assert abs(grad_correlation - lam) < 1e-10
    elif b < -1e-10:
        assert abs(grad_correlation + lam) < 1e-10
    else:
        assert abs(grad_correlation) <= lam + 1e-10
assert j_lasso >= 0 and j_ridge >= 0
~~~

初期値なら $c=(2,2,-0.6)$ でLassoは $(1.25,0.3125,0)$、Ridgeは $(8/7,8/19,-0.48)$ となる。$\lambda$ を0.5、1、2.5と変え、どの成分が消滅するかを、計算した $c_j$ と $\lambda$ の比較で予測してから実行しよう。両モデルの目的関数は異なるため、**Lassoの目的値とRidgeの目的値を直接比較してどちらが予測精度に優れるか判定してはいけない**。標本外評価とモデル選択は後の講義で扱う。

## 演習

### ML1-06-A01 絶対値の劣微分を確認する
- Level: A
- 目安時間: 10分

$f(b)=|b|$ に対し、$b=2,-3,0$ それぞれの劣微分を求め、特に原点では[劣勾配の定義](../../OPT/OPT3/index.md#def-opt3-subgradient)に戻って不等式を確認せよ。

<!-- solution-start -->
#### 詳細解答

正の位置では局所微分係数が1、負の位置では $-1$ であり、凸関数の支持傾きはそれぞれ唯一だから $\partial f(2)=\{1\}$、$\partial f(-3)=\{-1\}$。原点で $u$ が劣勾配であるには全ての $t\in\mathbb R$ で $|t|\ge ut$ が必要。$t>0$ では $1\ge u$、$t<0$ では $-1\le u$。逆に $-1\le u\le1$ なら $t>0$、$t<0$、$t=0$ のどれでも成り立つ。したがって

$$
\partial f(0)=[-1,1].
$$

<!-- solution-end -->

### ML1-06-A02 一変数の閾値
- Level: A
- 目安時間: 10分

$a=2,z=3,\lambda=2$ で $a(b-z)^2/2+\lambda|b|$ の最小点と目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

[一変数の公式](#thm-ml1-06-scalar)へ $a=2$、$z=3$、$\lambda=2$ を入れると閾値は $\lambda/a=1$。$z>1$ なので $\widehat b=3-1=2$。目的値は

$$
\frac22(2-3)^2+2|2|=1+4=5.
$$

$b=0$ の目的値は $1\cdot9=9$ であり、0へ切り捨てる境界にはまだ達していない。
<!-- solution-end -->

### ML1-06-A03 正規直交列の三係数
- Level: A
- 目安時間: 10分

$X^{\mathsf T}X/n=I_3$、$X^{\mathsf T}y/n=(1,0.2,-2)^{\mathsf T}$、$\lambda=0.5$ のLasso解を計算せよ。

<!-- solution-start -->
#### 詳細解答

各列の $d_j=1$、相関 $c=(1,0.2,-2)^{\mathsf T}$ なので[直交デザインの定理](#thm-ml1-06-orthogonal)を適用できる。第一座標は $1-0.5=0.5$、第二座標は $|0.2|\le0.5$ だから0、第三座標は $-2+0.5=-1.5$。よって

$$
\widehat\beta=(0.5,0,-1.5)^{\mathsf T}.
$$

<!-- solution-end -->

### ML1-06-A04 ゼロ係数の境界を判定する
- Level: A
- 目安時間: 10分

設計行列の各列と応答の相関が $X^{\mathsf T}y/n=(0.4,-0.8)^{\mathsf T}$ のとき、$\lambda=0.8$ で $\beta=0$ はLassoの最小点か。$\lambda=0.7$ ではどうか。

<!-- solution-start -->
#### 詳細解答

[ゼロ解の必要十分条件](#thm-ml1-06-kkt)は $\lambda\ge\max(|0.4|,|-0.8|)=0.8$。したがって $\lambda=0.8$ は等号を含み最小点である。$\lambda=0.7$ では第二座標で $|-0.8|>0.7$ となるので、零ベクトルは最小点ではない。他の係数の値を解かなくてもこの否定はできる。
<!-- solution-end -->

### ML1-06-A05 LassoとRidgeの比較
- Level: A
- 目安時間: 10分

$X^{\mathsf T}X/n=I_2$、$c=(0.4,2)^{\mathsf T}$、$\lambda=1$ のとき、LassoとRidgeの係数をそれぞれ求めよ。

<!-- solution-start -->
#### 詳細解答

Lassoは $S_1$ を座標ごとに使うので $0.4$ は0に、$2$ は $2-1=1$ になる。Ridgeは[正規方程式](../ML1-05/index.md#thm-ml1-05-unique)に $X^{\mathsf T}X=nI$ を入れると $(I+\lambda I)\widehat\beta=c$ となるため $c/2=(0.2,1)^{\mathsf T}$。したがって

$$
\widehat\beta_{\rm Lasso}=(0,1)^{\mathsf T},
\qquad
\widehat\beta_{\rm Ridge}=(0.2,1)^{\mathsf T}.
$$

Lassoのみ第一成分をちょうど0にする。
<!-- solution-end -->

### ML1-06-B01 列の長さが異なる直交設計
- Level: B
- 目安時間: 15分

$X^{\mathsf T}X/n=\operatorname{diag}(1,4)$、$c=(1.5,-0.5)^{\mathsf T}$、$\lambda=0.5$ のLasso解を求め、最適性条件を各座標で確かめよ。

<!-- solution-start -->
#### 詳細解答

列が直交し $d_1=1,d_2=4$ はともに正なので、[直交デザインの定理](#thm-ml1-06-orthogonal)から

$$
\widehat\beta_1=\frac{1.5-0.5}{1}=1,
\qquad
\widehat\beta_2=0\quad(|-0.5|\le0.5).
$$

残差相関は $X^{\mathsf T}(y-X\widehat\beta)/n=c-\operatorname{diag}(1,4)\widehat\beta=(0.5,-0.5)^{\mathsf T}$。第一成分は正係数なので $0.5=\lambda$、第二成分は零係数なので $|-0.5|\le\lambda$。よって[座標別最適性条件](#thm-ml1-06-kkt)の全成分を満たす。$d_2=4$ を閾値そのものに掛けて $|c_2|\le2$ としてはならない。
<!-- solution-end -->

### ML1-06-B02 重複列で解全体を求める
- Level: B
- 目安時間: 20分

$X=(1\ \ 1)$、$y=2$、$n=1$、$\lambda=1/2$ とする。Lassoの全最小解を記述し、適合値は一意であることを示せ。

<!-- solution-start -->
#### 詳細解答

$s=\beta_1+\beta_2$ と置くと、三角不等式から

$$
J_{1/2}(\beta)\ge\frac12(s-2)^2+\frac12|s|.
$$

右辺は[一変数定理](#thm-ml1-06-scalar)で $a=1,z=2,\lambda=1/2$ に対応し、唯一の最小和は $s=3/2$ である。この正の和に対して三角不等式が等号となる条件は $\beta_1,\beta_2\ge0$。したがって

$$
\mathcal M_{1/2}
=\{(t,3/2-t)^{\mathsf T}:0\le t\le3/2\}.
$$

任意の最小解の適合値は $X\beta=\beta_1+\beta_2=3/2$ で同じ。一方、係数 $(3/2,0)$ と $(0,3/2)$ は異なるので最小係数は一意ではない。
<!-- solution-end -->

### ML1-06-B03 切片を罰しない
- Level: B
- 目安時間: 20分

$n=2$、特徴量 $Z=(-1,1)^{\mathsf T}$、応答 $y=(-1,3)^{\mathsf T}$ とする。$\alpha+\theta z_i$ の二乗損失を $1/(2n)$ で正規化し、罰則は $\lambda|\theta|$ のみとする。$\lambda=0.5$ で切片と傾き、訓練損失、全目的値を求めよ。

<!-- solution-start -->
#### 詳細解答

特徴の平均は $\bar z=(-1+1)/2=0$、応答平均は $\bar y=(-1+3)/2=1$。非罰則切片の停留式から $\widehat\alpha=1-0\widehat\theta=1$。中心化応答は $y_c=(-2,2)^{\mathsf T}$ で、傾きに関する直交量は

$$
d=\frac{(-1)^2+1^2}{2}=1,
\qquad
c=\frac{(-1)(-2)+1\cdot2}{2}=2.
$$

[一変数公式](#thm-ml1-06-scalar)から $\widehat\theta=S_{0.5}(2)=1.5$。適合値は $(-0.5,2.5)^{\mathsf T}$、残差 $y-\widehat y=(-0.5,0.5)^{\mathsf T}$ だから、二乗損失は

$$
\frac1{2n}\|y-\widehat y\|^2
=\frac14(0.25+0.25)=\frac18.
$$

罰則は $0.5|\widehat\theta|=3/4$ なので、目的値は $1/8+3/4=7/8$。切片を罰していないことが最初の平均の式に現れる。
<!-- solution-end -->

### ML1-06-B04 非直交デザインの最適性判定
- Level: B
- 目安時間: 20分

$n=2$、$X=\begin{pmatrix}1&1\\0&1\end{pmatrix}$、$y=(2,0)^{\mathsf T}$、$\lambda=1/4$ とする。$\widehat\beta=(3/2,0)^{\mathsf T}$ が唯一のLasso解であることを、座標別条件と階数から示せ。また目的値を計算せよ。

<!-- solution-start -->
#### 詳細解答

適合値は $X\widehat\beta=(3/2,0)^{\mathsf T}$、残差は $r=(1/2,0)^{\mathsf T}$。したがって

$$
\frac1nX^{\mathsf T}r
=\frac12
\begin{pmatrix}1&0\\1&1\end{pmatrix}
\begin{pmatrix}1/2\\0\end{pmatrix}
=\begin{pmatrix}1/4\\1/4\end{pmatrix}.
$$

第一座標は $\widehat\beta_1>0$ なので残差相関は $\lambda$ と一致する。第二座標は0なので残差相関の絶対値が $\lambda$ 以下である。よって[最適性条件](#thm-ml1-06-kkt)から大域最小点である。$\det X=1\ne0$ より列は一次独立だから[一意性定理](#thm-ml1-06-existence)によって唯一の解である。

二乗損失は $(1/2)^2/(2n)=1/16$、罰則は $(1/4)(3/2)=3/8$ なので目的値は $7/16$ である。零座標の不等式が等号でも、他の最小解が存在するとは限らない。
<!-- solution-end -->

### ML1-06-C01 正則化経路、厳密な零、反復解
- Level: C
- 目安時間: 30分

$n=p=2$、$X=\sqrt2 I_2$、$y=\sqrt2(2,1/2)^{\mathsf T}$、$\lambda\ge0$ とする。

1. Lasso解を $\lambda$ の全範囲で求め、非零係数の数が変わる境界を示せ。
2. $\lambda=3/4$ でLassoの最適係数・二乗損失・罰則・全目的値を計算し、座標別最適性条件も確認せよ。
3. 同じ $\lambda$ に対するRidge解を計算して比較せよ。
4. LassoのISTAを初期値0、歩幅 $t=1$ で一段実行し、なぜこの例ではその結果が最適解と一致するか説明せよ。

<!-- solution-start -->
#### 詳細解答

（1）$X^{\mathsf T}X/n=I_2$、$c=X^{\mathsf T}y/n=(2,1/2)^{\mathsf T}$ であり、$d_1=d_2=1$。したがって[直交デザインの定理](#thm-ml1-06-orthogonal)で

$$
\widehat\beta(\lambda)
=\bigl((2-\lambda)_+,(1/2-\lambda)_+\bigr)^{\mathsf T}.
$$

$0\le\lambda<1/2$ では2成分が非零、$1/2\le\lambda<2$ では第一成分のみ、$\lambda\ge2$ では両方0となる。$\lambda=0$ でもこの行列はフルランクなので解は唯一である。

（2）$\lambda=3/4$ なら $\widehat\beta=(5/4,0)^{\mathsf T}$。二乗損失は

$$
\frac1{2n}\|X\widehat\beta-y\|^2
=\frac12\left[\left(\frac54-2\right)^2+
\left(0-\frac12\right)^2\right]
=\frac12\left(\frac9{16}+\frac14\right)=\frac{13}{32}.
$$

罰則は $(3/4)(5/4)=15/16=30/32$、したがって $J_{3/4}(\widehat\beta)=43/32$。残差相関は

$$
\frac1nX^{\mathsf T}(y-X\widehat\beta)
=c-\widehat\beta
=(3/4,1/2)^{\mathsf T}.
$$

第一座標は正係数に対応して相関が $3/4=\lambda$、第二座標は0で相関の絶対値が $1/2\le3/4$。よって[最適性条件](#thm-ml1-06-kkt)を両成分で満たす。

（3）[Ridgeの正規方程式](../ML1-05/index.md#thm-ml1-05-unique)はこの正規化なら $(I_2+\lambda I_2)\widehat\beta_{\rm Ridge}=c$。従って

$$
\widehat\beta_{\rm Ridge}
=\frac1{1+3/4}(2,1/2)^{\mathsf T}
=(8/7,2/7)^{\mathsf T}.
$$

Ridgeの第二成分は0でない。なお目的関数が異なるので、係数だけでは標本外予測の良否を判定できない。

（4）この設計では $\nabla f(\beta)=\beta-c$、$L=1$。$t=1$ なら任意の初期値で勾配ステップは

$$
\beta-t\nabla f(\beta)=\beta-(\beta-c)=c
$$

となる。[ISTA更新](#prop-ml1-06-ista)の次の近接処理は $S_{3/4}(c)=(5/4,0)^{\mathsf T}$。よって0から一段で（2）の最小点へ到達する。これはGram行列が単位行列だからであり、列が相関する一般の場合の一段収束を意味しない。
<!-- solution-end -->

## 9. 得られた見取り図と次章への接続

Lassoは絶対値の角を使い、相関が閾値以下の係数を厳密に0にする。劣微分で「なぜ0が最適なのか」を確認し、直交デザインで「どの係数が0になるか」を明示できた。非直交デザインでは全座標の残差相関を調べ、近接勾配法で反復的に解く。存在と一意性を混同しないこと、罰則による疎性を真の変数選択の保証と取り違えないことが重要である。

次のML1-07では、係数への罰則とは別の道筋として、クラスごとの確率分布から分類規則を組み立てる。
