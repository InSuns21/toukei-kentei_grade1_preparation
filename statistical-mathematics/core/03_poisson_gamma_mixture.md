# Core 15 ポアソン–ガンマ混合・負の二項分布

- 旧No.: 3
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$\Lambda$ の事前分布を、形状母数 $r>0$、率母数 $\beta>0$ のガンマ分布

$$
f_\Lambda(\lambda)
=\frac{\beta^r}{\Gamma(r)}
\lambda^{r-1}e^{-\beta\lambda},
\qquad \lambda>0
$$

とする。$\Lambda=\lambda$ を与えた下で

$$
X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)
$$

とする。

1. $X$ の周辺確率質量関数を求めよ。
2. 得られた分布を負の二項分布として同定し、その成功確率の母数を答えよ。
3. $E[X]$ を全期待値の公式から求めよ。
4. $\operatorname{Var}(X)$ を全分散の公式から求め、ポアソン分布より過分散になることを確認せよ。

## 詳細解答

### 1. 周辺確率質量関数

条件付き確率質量関数は

$$
P(X=x\mid\Lambda=\lambda)
=e^{-\lambda}\frac{\lambda^x}{x!},
\qquad x=0,1,2,\ldots
$$

である。

$\Lambda$ は観測されないので、周辺確率は $\lambda$ について積分して消去する。

$$
\begin{aligned}
P(X=x)
&=\int_0^\infty
P(X=x\mid\Lambda=\lambda)
f_\Lambda(\lambda)\,d\lambda\\
&=\int_0^\infty
\left(e^{-\lambda}\frac{\lambda^x}{x!}\right)
\left(
\frac{\beta^r}{\Gamma(r)}
\lambda^{r-1}e^{-\beta\lambda}
\right)d\lambda\\
&=\frac{\beta^r}{\Gamma(r)x!}
\int_0^\infty
\lambda^{x+r-1}e^{-(\beta+1)\lambda}\,d\lambda.
\end{aligned}
$$

ここで $t=(\beta+1)\lambda$ と置けば

$$
\lambda=\frac{t}{\beta+1},
\qquad
d\lambda=\frac{dt}{\beta+1}.
$$

従って

$$
\begin{aligned}
\int_0^\infty
\lambda^{x+r-1}e^{-(\beta+1)\lambda}\,d\lambda
&=\frac{1}{(\beta+1)^{x+r}}
\int_0^\infty t^{x+r-1}e^{-t}\,dt\\
&=\frac{\Gamma(x+r)}{(\beta+1)^{x+r}}.
\end{aligned}
$$

よって

$$
\boxed{
P(X=x)
=\frac{\Gamma(x+r)}{\Gamma(r)x!}
\left(\frac{\beta}{\beta+1}\right)^r
\left(\frac1{\beta+1}\right)^x
}.
$$

### 2. 負の二項分布との対応

「$r$ 回の成功が出るまでの失敗回数」を $X$ とする負の二項分布を

$$
P(X=x)
=\frac{\Gamma(x+r)}{\Gamma(r)x!}
p^r(1-p)^x,
\qquad x=0,1,2,\ldots
$$

と書く。

第1問の結果と係数を比較すると

$$
p=\frac{\beta}{\beta+1},
\qquad
1-p=\frac1{\beta+1}.
$$

したがって

$$
\boxed{
X\sim\operatorname{NegativeBinomial}
\left(r,\frac{\beta}{\beta+1}\right)
}
$$

である。負の二項分布には複数の母数化があるので、本問では確率質量関数まで書いて対応を明示するのが安全である。

### 3. 全期待値による平均

条件付きポアソン分布について

$$
E[X\mid\Lambda]=\Lambda.
$$

したがって全期待値の公式

$$
E[X]=E\{E[X\mid\Lambda]\}
$$

より

$$
E[X]=E[\Lambda].
$$

ガンマ$(r,\text{rate }\beta)$ の平均を密度から確認すると

$$
\begin{aligned}
E[\Lambda]
&=\frac{\beta^r}{\Gamma(r)}
\int_0^\infty \lambda^r e^{-\beta\lambda}\,d\lambda\\
&=\frac{\beta^r}{\Gamma(r)}
\frac{\Gamma(r+1)}{\beta^{r+1}}\\
&=\frac r\beta,
\end{aligned}
$$

ここで $\Gamma(r+1)=r\Gamma(r)$ を用いた。従って

$$
\boxed{E[X]=\frac r\beta}.
$$

### 4. 全分散による分散

全分散の公式は

$$
\operatorname{Var}(X)
=E\{\operatorname{Var}(X\mid\Lambda)\}
+\operatorname{Var}\{E[X\mid\Lambda]\}.
$$

ポアソン分布では条件付き平均と条件付き分散がともに $\Lambda$ だから

$$
\operatorname{Var}(X\mid\Lambda)=\Lambda,
\qquad
E[X\mid\Lambda]=\Lambda.
$$

従って

$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda).
$$

ガンマ$(r,\text{rate }\beta)$ では

$$
E[\Lambda]=\frac r\beta,
\qquad
\operatorname{Var}(\Lambda)=\frac r{\beta^2}.
$$

よって

$$
\boxed{
\operatorname{Var}(X)
=\frac r\beta+\frac r{\beta^2}
}.
$$

平均は $r/\beta$ なので

$$
\operatorname{Var}(X)-E[X]
=\frac r{\beta^2}>0.
$$

固定した平均母数を持つポアソン分布なら「分散=平均」だが、ここではポアソン強度 $\Lambda$ 自体が個体間で変動する。その追加変動 $\operatorname{Var}(\Lambda)$ が周辺分散に加わるため、過分散が生じる。

## 本番答案

$$
P(X=x)
=\int_0^\infty
e^{-\lambda}\frac{\lambda^x}{x!}
\frac{\beta^r}{\Gamma(r)}\lambda^{r-1}e^{-\beta\lambda}
\,d\lambda.
$$

ガンマ積分より

$$
P(X=x)
=\frac{\Gamma(x+r)}{\Gamma(r)x!}
\left(\frac{\beta}{\beta+1}\right)^r
\left(\frac1{\beta+1}\right)^x.
$$

従って成功確率 $p=\beta/(\beta+1)$ の負の二項分布である。

また

$$
E[X]=E\{E[X\mid\Lambda]\}=E[\Lambda]=\frac r\beta.
$$

全分散の公式から

$$
\operatorname{Var}(X)
=E[\Lambda]+\operatorname{Var}(\Lambda)
=\frac r\beta+\frac r{\beta^2}.
$$

従って $\operatorname{Var}(X)>E[X]$ であり、ポアソン強度の混合により過分散となる。

## 採点基準

- 周辺確率質量関数（積分設定・ガンマ積分）: 6点
- 負の二項分布との母数対応: 4点
- 全期待値による平均: 4点
- 全分散による分散・過分散の解釈: 6点
