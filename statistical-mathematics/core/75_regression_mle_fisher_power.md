# Core 12 回帰係数の最尤推定量・フィッシャー情報量・検定・検出力

- 旧No.: 75
- 演習価値: S
- 難度: A
- 目安時間: 30分
- 手計算監査: 表・修正済（累積分布関数の数値評価不要）

## 問題

単回帰

$$
Y_i=\beta_0+\beta_1x_i+\varepsilon_i,
\qquad
\varepsilon_i\sim N(0,4)
$$

を考える。誤差は独立同分布、$x_i$ は固定で

$$
\sum_{i=1}^n x_i=0,
\qquad
\sum_{i=1}^n x_i^2=20
$$

とする。1観測の確率密度関数は

$$
f(y_i;\beta_0,\beta_1)
=\frac1{\sqrt{8\pi}}
\exp\left[-\frac{(y_i-\beta_0-\beta_1x_i)^2}{8}\right].
$$

1. $\beta_1$ の最尤推定量を求めよ。
2. $\beta_1$ に関するフィッシャー情報量と $\widehat\beta_1$ の分散を求めよ。
3. $H_0:\beta_1=0$ の両側5%検定統計量を構成せよ。
4. 真値 $\beta_1=1$ のときの検出力を $\Phi$ を用いて表せ。$z_{0.975}=1.96$ としてよい。数値化は不要。

## 詳細解答

### 1. $\beta_1$ の最尤推定量

独立性より同時尤度は

$$
L(\beta_0,\beta_1)
=\prod_{i=1}^n
\frac1{\sqrt{8\pi}}
\exp\left[-\frac{(y_i-\beta_0-\beta_1x_i)^2}{8}\right].
$$

したがって対数尤度は

$$
\ell(\beta_0,\beta_1)
=-\frac n2\log(8\pi)
-\frac18\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i)^2.
$$

第1項は $\beta_0,\beta_1$ を含まないので、尤度最大化は残差平方和

$$
Q(\beta_0,\beta_1)
=\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i)^2
$$

の最小化と同値である。

$\beta_0$ で偏微分すると

$$
\frac{\partial Q}{\partial\beta_0}
=-2\sum_{i=1}^n(y_i-\beta_0-\beta_1x_i).
$$

これを0と置き、$\sum x_i=0$ を使うと

$$
\sum y_i-n\beta_0=0,
$$

したがって

$$
\widehat\beta_0=\overline y.
$$

次に $\beta_1$ で偏微分すると

$$
\frac{\partial Q}{\partial\beta_1}
=-2\sum_{i=1}^n x_i(y_i-\beta_0-\beta_1x_i).
$$

0と置いて展開すると

$$
\sum x_i y_i
-\beta_0\sum x_i
-\beta_1\sum x_i^2=0.
$$

ここでも $\sum x_i=0$ を使えるので

$$
\widehat\beta_1
=\frac{\sum x_i y_i}{\sum x_i^2}
=\boxed{\frac1{20}\sum_{i=1}^n x_i y_i}.
$$

正規モデルの対数尤度は $\beta_0,\beta_1$ に関して下に凸な残差平方和の負号付きなので、この停留点が最大点である。

### 2. フィッシャー情報量と分散

対数尤度を直接 $\beta_1$ で微分すると

$$
\frac{\partial\ell}{\partial\beta_1}
=\frac14\sum_{i=1}^n x_i(y_i-\beta_0-\beta_1x_i).
$$

さらに

$$
\frac{\partial^2\ell}{\partial\beta_1^2}
=-\frac14\sum_{i=1}^n x_i^2.
$$

右辺は観測値に依存しないので

$$
I_{\beta_1\beta_1}
=-E\left[\frac{\partial^2\ell}{\partial\beta_1^2}\right]
=\frac14\sum x_i^2
=\boxed{5}.
$$

また交差2階微分は

$$
\frac{\partial^2\ell}{\partial\beta_0\partial\beta_1}
=-\frac14\sum x_i=0,
$$

なので、この中心化された設計では切片と傾きの情報量の交差項は0である。

次に $\widehat\beta_1$ の分散を、情報量の逆数を暗記で置かずに線形結合から確認する。モデル式を代入すると

$$
\begin{aligned}
\widehat\beta_1
&=\frac{\sum x_i(\beta_0+\beta_1x_i+\varepsilon_i)}{\sum x_i^2}\\
&=\frac{\beta_0\sum x_i+\beta_1\sum x_i^2+\sum x_i\varepsilon_i}{\sum x_i^2}\\
&=\beta_1+\frac{\sum x_i\varepsilon_i}{20}.
\end{aligned}
$$

誤差は独立で各分散が4だから

$$
\operatorname{Var}\left(\sum x_i\varepsilon_i\right)
=\sum x_i^2\operatorname{Var}(\varepsilon_i)
=4\sum x_i^2
=80.
$$

したがって

$$
\operatorname{Var}(\widehat\beta_1)
=\frac{80}{20^2}
=\boxed{\frac15}.
$$

これは $I_{\beta_1\beta_1}^{-1}=1/5$ と一致する。

### 3. $H_0:\beta_1=0$ の検定

上の表示より

$$
\widehat\beta_1
=\beta_1+\frac1{20}\sum x_i\varepsilon_i.
$$

正規変数の線形結合は正規分布に従うので、有限標本で正確に

$$
\widehat\beta_1\sim N\left(\beta_1,\frac15\right).
$$

したがって $H_0$ の下では

$$
Z
=\frac{\widehat\beta_1-0}{\sqrt{1/5}}
=\sqrt5\,\widehat\beta_1
\sim N(0,1).
$$

両側5%検定では標準正規分布の両端に2.5%ずつ置くので

$$
\boxed{|Z|>1.96}
$$

で棄却する。

### 4. 真値 $\beta_1=1$ のときの検出力

真値が1なら

$$
\widehat\beta_1\sim N\left(1,\frac15\right).
$$

検定に使う $Z=\sqrt5\widehat\beta_1$ の分布は

$$
Z\sim N(\sqrt5,1).
$$

検出力は棄却域に入る確率だから

$$
\pi(1)
=P(Z<-1.96)+P(Z>1.96).
$$

$Z\sim N(\sqrt5,1)$ を標準化すると

$$
P(Z<-1.96)
=\Phi(-1.96-\sqrt5),
$$

$$
P(Z>1.96)
=1-\Phi(1.96-\sqrt5).
$$

よって

$$
\boxed{
\pi(1)
=\Phi(-1.96-\sqrt5)
+1-\Phi(1.96-\sqrt5)
}.
$$

累積分布関数値を数値化する必要はない。

## 本番答案

対数尤度は

$$
\ell(\beta_0,\beta_1)
=-\frac n2\log(8\pi)
-\frac18\sum(y_i-\beta_0-\beta_1x_i)^2.
$$

残差平方和を $\beta_0,\beta_1$ で偏微分して0と置くと、$\sum x_i=0$ より

$$
\widehat\beta_0=\overline y,
\qquad
\widehat\beta_1
=\frac{\sum x_i y_i}{\sum x_i^2}
=\frac1{20}\sum x_i y_i.
$$

また

$$
-\frac{\partial^2\ell}{\partial\beta_1^2}
=\frac14\sum x_i^2=5,
$$

よりフィッシャー情報量は5。さらに

$$
\widehat\beta_1
=\beta_1+\frac1{20}\sum x_i\varepsilon_i
$$

なので

$$
\operatorname{Var}(\widehat\beta_1)=\frac15,
\qquad
\widehat\beta_1\sim N\left(\beta_1,\frac15\right).
$$

従って $H_0$ では

$$
Z=\sqrt5\widehat\beta_1\sim N(0,1)
$$

であり、$|Z|>1.96$ で棄却する。

$\beta_1=1$ なら $Z\sim N(\sqrt5,1)$ だから検出力は

$$
\Phi(-1.96-\sqrt5)
+1-\Phi(1.96-\sqrt5).
$$

## 採点基準

- 最尤推定量（尤度・偏微分・中心化条件の使用）: 5点
- フィッシャー情報量と分散（2階微分・線形結合による確認）: 5点
- 検定統計量と帰無分布: 5点
- 検出力（対立下の分布から両側確率を構成）: 5点
