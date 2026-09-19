# Standard 補充1 ゼロ切断ポアソン分布・観測尤度・母数推定

- 100大問外補充
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎（数値方程式は記号式までで完答）
- 過去問接続: 統計応用理工学 2016 問4「ポアソン最尤推定・ゼロ切断分布」のテーマ索引

## 問題

潜在変数 $Y$ は母数 $\lambda>0$ のポアソン分布に従い、

$$
P_\lambda(Y=y)
=
e^{-\lambda}\frac{\lambda^y}{y!},
\qquad
y=0,1,2,\ldots
$$

とする。ただし観測機構の都合により $Y=0$ の個体は標本に現れず、$Y\ge1$ である個体だけが観測される。

観測変数 $X$ を

$$
X\overset{d}=Y\mid(Y\ge1)
$$

で定める。$X_1,\ldots,X_n$ はこのゼロ切断ポアソン分布からの独立同分布標本とする。

1. $X$ の確率質量関数を求めよ。
2. $E_\lambda[X]$ を求め、$\overline X$ をそのまま $\lambda$ の推定量とすると上方にずれる理由を示せ。またモーメント法による推定方程式を書け。
3. 観測値を $x_1,\ldots,x_n$ として尤度・対数尤度・スコアを求め、$\lambda$ の最尤推定量が満たす方程式を導け。
4. $\overline x>1$ のとき、その推定方程式が正の解をただ1つ持つことを示せ。$\overline x=1$ の場合も説明せよ。
5. 「ゼロ切断」と「0で打切り」の違いを、観測情報と尤度の作り方の観点から説明せよ。

## 詳細解答

### 1. ゼロ切断後の確率質量関数

$X$ は $Y\ge1$ という条件の下での $Y$ なので、$x=1,2,\ldots$ に対し

$$
P_\lambda(X=x)
=
P_\lambda(Y=x\mid Y\ge1).
$$

条件付き確率の定義から

$$
P_\lambda(X=x)
=
\frac{P_\lambda(Y=x)}
{P_\lambda(Y\ge1)}.
$$

まず

$$
P_\lambda(Y\ge1)
=
1-P_\lambda(Y=0)
=
1-e^{-\lambda}.
$$

したがって

$$
\begin{aligned}
P_\lambda(X=x)
&=
\frac{
e^{-\lambda}\lambda^x/x!
}{
1-e^{-\lambda}
}\\
&=
\frac{\lambda^x}
{x!(e^\lambda-1)},
\qquad
x=1,2,\ldots
\end{aligned}
$$

である。よって

$$
\boxed{
P_\lambda(X=x)
=
\frac{e^{-\lambda}\lambda^x}
{x!(1-e^{-\lambda})},
\qquad x=1,2,\ldots
}.
$$

分母の $1-e^{-\lambda}$ は、0を観測対象から除いた後に確率の総和を1へ戻す正規化因子である。

### 2. 平均・標本平均のずれ・モーメント法

$Y=0$ のとき $Y$ 自身も0なので

$$
Y\boldsymbol 1_{\{Y\ge1\}}=Y.
$$

したがって

$$
\begin{aligned}
E_\lambda[X]
&=
E_\lambda[Y\mid Y\ge1]\\
&=
\frac{
E_\lambda[
Y\boldsymbol 1_{\{Y\ge1\}}
]
}{
P_\lambda(Y\ge1)
}\\
&=
\frac{E_\lambda[Y]}
{1-e^{-\lambda}}.
\end{aligned}
$$

ポアソン分布の平均は $E[Y]=\lambda$ だから

$$
\boxed{
E_\lambda[X]
=
\frac{\lambda}{1-e^{-\lambda}}
}.
$$

$0<1-e^{-\lambda}<1$ なので

$$
\frac{\lambda}{1-e^{-\lambda}}>\lambda.
$$

従って

$$
E_\lambda[\overline X]
=
\frac{\lambda}{1-e^{-\lambda}}
>\lambda.
$$

つまり、切断を無視して通常のポアソン分布と同じように

$$
\widehat\lambda=\overline X
$$

と置くと、$\overline X$ は $\lambda$ そのものではなく、ゼロ切断後の条件付き平均を推定しているため上方にずれる。

モーメント法では標本平均と理論平均を一致させるので、

$$
\overline X
=
\frac{\lambda}{1-e^{-\lambda}}
$$

を満たす $\lambda$ を推定値とする。従ってモーメント推定量 $\widehat\lambda_{\mathrm{MM}}$ は

$$
\boxed{
\overline X
=
\frac{\widehat\lambda_{\mathrm{MM}}}
{1-e^{-\widehat\lambda_{\mathrm{MM}}}}
}
$$

を満たす解である。

### 3. 観測尤度と最尤推定方程式

観測値 $x_1,\ldots,x_n$ はすべて1以上である。第 $i$ 観測の確率質量関数は

$$
P_\lambda(X_i=x_i)
=
\frac{\lambda^{x_i}}
{x_i!(e^\lambda-1)}.
$$

独立性より尤度は

$$
\begin{aligned}
L(\lambda)
&=
\prod_{i=1}^n
\frac{\lambda^{x_i}}
{x_i!(e^\lambda-1)}\\
&=
\frac{
\lambda^{\sum_{i=1}^n x_i}
}{
(e^\lambda-1)^n
\prod_{i=1}^n x_i!
}.
\end{aligned}
$$

従って対数尤度は

$$
\begin{aligned}
\ell(\lambda)
&=
\log L(\lambda)\\
&=
\left(\sum_{i=1}^n x_i\right)\log\lambda
-n\log(e^\lambda-1)
-\sum_{i=1}^n\log(x_i!).
\end{aligned}
$$

最後の項は $\lambda$ を含まない。

$\lambda$ で微分すると

$$
\frac{d}{d\lambda}
\left[
\left(\sum_i x_i\right)\log\lambda
\right]
=
\frac{\sum_i x_i}{\lambda},
$$

また

$$
\frac{d}{d\lambda}
\log(e^\lambda-1)
=
\frac{e^\lambda}{e^\lambda-1}.
$$

従ってスコアは

$$
\begin{aligned}
\ell'(\lambda)
&=
\frac{\sum_i x_i}{\lambda}
-
n\frac{e^\lambda}{e^\lambda-1}\\
&=
n\left[
\frac{\overline x}{\lambda}
-
\frac{1}{1-e^{-\lambda}}
\right].
\end{aligned}
$$

停留条件 $\ell'(\lambda)=0$ は

$$
\frac{\overline x}{\lambda}
=
\frac{1}{1-e^{-\lambda}}
$$

すなわち

$$
\boxed{
\overline x
=
\frac{\lambda}{1-e^{-\lambda}}
}.
$$

従って最尤推定量 $\widehat\lambda_{\mathrm{ML}}$ は

$$
\boxed{
\overline X
=
\frac{\widehat\lambda_{\mathrm{ML}}}
{1-e^{-\widehat\lambda_{\mathrm{ML}}}}
}
$$

を満たす解である。

これは第2問のモーメント推定方程式と同じである。従って正の解が存在するとき、

$$
\boxed{
\widehat\lambda_{\mathrm{ML}}
=
\widehat\lambda_{\mathrm{MM}}
}.
$$

通常のポアソン標本では $\widehat\lambda=\overline X$ と陽に解けるが、ゼロ切断後は正規化因子が $\lambda$ に依存するため、推定方程式は一般に閉じた初等式では解けない。

数値計算を行う場合は

$$
h(\lambda)
=
\frac{\lambda}{1-e^{-\lambda}}
-
\overline x
$$

とおき、二分法や Newton 法で $h(\lambda)=0$ を解けばよい。本問では数値解の計算は要求しない。

### 4. 正の解の存在と一意性

$$
g(\lambda)
=
\frac{\lambda}{1-e^{-\lambda}},
\qquad
\lambda>0
$$

とおく。

まず $\lambda\downarrow0$ の極限を調べる。分子・分母はいずれも0へ近づくので、分母の一次近似

$$
1-e^{-\lambda}\sim\lambda
$$

から

$$
\lim_{\lambda\downarrow0}g(\lambda)=1.
$$

また $\lambda\to\infty$ では $e^{-\lambda}\to0$ だから

$$
g(\lambda)\sim\lambda\to\infty.
$$

次に単調性を確認する。商の微分より

$$
\begin{aligned}
g'(\lambda)
&=
\frac{
(1-e^{-\lambda})
-
\lambda e^{-\lambda}
}{
(1-e^{-\lambda})^2
}\\
&=
\frac{
1-(1+\lambda)e^{-\lambda}
}{
(1-e^{-\lambda})^2
}.
\end{aligned}
$$

$\lambda>0$ では指数関数の基本不等式

$$
e^\lambda>1+\lambda
$$

が成り立つ。両辺に $e^{-\lambda}>0$ を掛ければ

$$
1>(1+\lambda)e^{-\lambda}.
$$

従って

$$
g'(\lambda)>0.
$$

よって $g$ は $(0,\infty)$ 上で狭義単調増加し、

$$
g((0,\infty))=(1,\infty)
$$

である。

したがって $\overline x>1$ なら

$g(\lambda)=\overline x$

を満たす正の $\lambda$ はただ1つ存在する。

さらに第3問のスコアは

$\ell'(\lambda)=\dfrac{n}{\lambda}\{\overline x-g(\lambda)\}$

と書ける。$g$ は狭義単調増加なので、一意な解を $\widehat\lambda$ とすると

$0<\lambda<\widehat\lambda\Longrightarrow\ell'(\lambda)>0,$

$\lambda>\widehat\lambda\Longrightarrow\ell'(\lambda)<0.$

従って対数尤度は $\widehat\lambda$ まで増加し、その後減少する。よってこの一意な停留点が最尤推定量である。

$\boxed{\overline x>1\Longrightarrow\widehat\lambda_{\mathrm{ML}}\text{ は一意な正の解}}.$

一方、$X_i\ge1$ なので $\overline x=1$ が起こるのは

$$
x_1=\cdots=x_n=1
$$

の場合だけである。このとき $g(\lambda)>1$ はすべての $\lambda>0$ で成り立つため、正の内部解は存在しない。

ただし

$$
\lim_{\lambda\downarrow0}g(\lambda)=1
$$

なので、尤度は $\lambda\downarrow0$ で上限へ近づく。母数空間を $\lambda>0$ とするなら有限の正の最尤推定量は存在せず、閉包として $\lambda=0$ を許せば境界解

$$
\widehat\lambda=0
$$

とみなせる。

### 5. 切断と打切りの違い

ゼロ切断では、$Y=0$ の個体は標本そのものに入らない。観測者は「0だった個体が何個存在したか」という情報も持たない。

従って各観測は

$$
Y\mid(Y\ge1)
$$

という条件付き分布から来たものとして扱う必要があり、確率質量関数には

$$
P(Y\ge1)=1-e^{-\lambda}
$$

による正規化が入る。

一方、打切りでは個体は標本に残り、「ある境界を越えた」「ある値以下である」といった部分情報が観測される。従って尤度には、完全観測なら確率質量関数や確率密度関数、打切り観測なら累積確率や上側確率といった寄与を組み合わせる。

要点は

$$
\boxed{
\text{切断: 観測対象から消える}
\qquad
\text{打切り: 標本には残り、情報だけが不完全}
}
$$

である。

## 本番答案

ゼロ切断後の確率質量関数は

$$
P_\lambda(X=x)
=
\frac{P_\lambda(Y=x)}
{P_\lambda(Y\ge1)}
=
\frac{e^{-\lambda}\lambda^x}
{x!(1-e^{-\lambda})},
\qquad x=1,2,\ldots
$$

である。

また

$$
E[X]
=
E[Y\mid Y\ge1]
=
\frac{E[Y]}{P(Y\ge1)}
=
\frac{\lambda}{1-e^{-\lambda}}.
$$

従ってモーメント法では

$$
\overline X
=
\frac{\lambda}{1-e^{-\lambda}}
$$

を解く。

独立標本の尤度は

$$
L(\lambda)
=
\frac{
\lambda^{\sum_i x_i}
}{
(e^\lambda-1)^n\prod_i x_i!
},
$$

よって

$$
\ell'(\lambda)
=
\frac{\sum_i x_i}{\lambda}
-
n\frac{e^\lambda}{e^\lambda-1}.
$$

したがって最尤推定方程式も

$$
\boxed{
\overline x
=
\frac{\lambda}{1-e^{-\lambda}}
}
$$

であり、モーメント法と一致する。

$$
g(\lambda)=\frac{\lambda}{1-e^{-\lambda}}
$$

とおけば

$$
g'(\lambda)
=
\frac{1-(1+\lambda)e^{-\lambda}}
{(1-e^{-\lambda})^2}>0
$$

で、$g(0+)=1$, $g(\infty)=\infty$ だから、$\overline x>1$ では正の解は一意である。$\overline x=1$ では正の内部解はなく、$\lambda\downarrow0$ が境界である。

ゼロ切断では0の個体自体が標本に現れないため条件付き分布で正規化する。打切りでは個体は標本に残り、不完全な観測情報を尤度へ組み込む。

## 採点基準

- 条件付き確率からゼロ切断後の確率質量関数を導く: 4点
- 条件付き平均・標本平均の上方ずれ・モーメント推定方程式: 4点
- 完全な尤度・対数尤度・スコアから最尤推定方程式を導く: 5点
- $g(\lambda)$ の極限と単調性から解の存在・一意性、境界例を説明する: 4点
- 切断と打切りの観測機構・尤度の違いを説明する: 3点
