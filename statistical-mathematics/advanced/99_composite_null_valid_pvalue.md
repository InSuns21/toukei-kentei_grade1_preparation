# Advanced 19 複合帰無・妥当なP値

- 旧No.: 99
- 層: Advanced
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

帰無仮説が複合仮説

$$
H_0:\theta\in\Theta_0
$$

で、統計量 $T$ は大きいほど対立仮説寄りとする。

1. 妥当なP値の基本形を与えよ。
2. そのP値が帰無仮説の全ての $\theta$ で有意水準を制御する理由を、連続・離散の場合を区別して説明せよ。
3. $X\sim N(\theta,1)$, $H_0:\theta\le0$, $H_1:\theta>0$, $T=X$ のP値を求めよ。
4. 帰無母数をデータ依存のplug-in推定値で置き換えることが一般に危険な理由を述べよ。

## 詳細解答

### 1. 複合帰無に対するworst-case P値

固定した帰無母数 $\theta$ に対する上側tail P値を

$$
p_\theta(x)=P_\theta\{T(X')\ge T(x)\}
$$

とする。複合帰無では、帰無集合内のどの母数が真でも妥当である必要があるので

$$
\boxed{
p(x)=\sup_{\theta\in\Theta_0}p_\theta(x)
=\sup_{\theta\in\Theta_0}
P_\theta\{T(X')\ge T(x)\}
}.
$$

### 2. 妥当性：確率積分変換とsuper-uniform性

任意の真の帰無母数 $\theta_0\in\Theta_0$ を固定する。定義から

$$
p(x)\ge p_{\theta_0}(x).
$$

まず $T$ の $\theta_0$ 下の分布が連続とする。CDFを $F_{\theta_0}$ とすると

$$
p_{\theta_0}(X)
=1-F_{\theta_0}\{T(X)\}
$$

である。ここで **確率積分変換**を使う。必要条件は $F_{\theta_0}$ が連続であること。この条件の下で

$$
F_{\theta_0}\{T(X)\}\sim U(0,1),
$$

従って

$$
p_{\theta_0}(X)\sim U(0,1).
$$

よって

$$
\begin{aligned}
P_{\theta_0}\{p(X)\le\alpha\}
&\le P_{\theta_0}\{p_{\theta_0}(X)\le\alpha\}\\
&=\alpha.
\end{aligned}
$$

離散分布では確率積分変換による厳密な一様性は一般に成立しないが、tail確率として定めた通常のP値は **super-uniform**、すなわち

$$
P_{\theta_0}\{p_{\theta_0}(X)\le\alpha\}\le\alpha
$$

を満たす。したがって同じ大小関係から

$$
\boxed{P_{\theta_0}\{p(X)\le\alpha\}\le\alpha}
$$

である。これは任意の $\theta_0\in\Theta_0$ について成り立つので、複合帰無全体でサイズを制御する。

### 3. 正規例

固定した観測値 $x$ に対して

$$
P_\theta(X\ge x)
=1-\Phi(x-\theta).
$$

$\Phi$ は単調増加なので、このtail確率は $\theta$ とともに増加する。帰無集合 $\theta\le0$ で最大となるのは境界 $\theta=0$。従って

$$
\boxed{p(x)=1-\Phi(x)}.
$$

この例では $X$ の分布が連続なので、$H_0$ の境界 $\theta=0$ でこのP値は厳密に $U(0,1)$ となる。

### 4. plug-inが危険な理由

データから帰無集合内の値 $\widehat\theta_0$ を選んで

$$
p_{plug}(x)=P_{\widehat\theta_0}\{T\ge T(x)\}
$$

とすると一般に

$$
p_{plug}(x)
\le
\sup_{\theta\in\Theta_0}P_\theta\{T\ge T(x)\}
=p(x).
$$

つまり最悪ケース保証を失い、P値を過小評価してサイズが $\alpha$ を超える可能性がある。plug-inが妥当になるには、ピボット性、条件付き推論、プロファイル尤度の漸近理論など別の正当化が必要であり、「帰無側のMLEを代入した」というだけでは足りない。

## 本番答案

$$
p(x)=\sup_{\theta\in\Theta_0}P_\theta(T\ge T(x)).
$$

真の任意の $\theta_0\in\Theta_0$ について $p(x)\ge p_{\theta_0}(x)$。$T$ の帰無分布が連続なら **確率積分変換**から $p_{\theta_0}(X)\sim U(0,1)$、離散ならsuper-uniform。したがって

$$
P_{\theta_0}\{p(X)\le\alpha\}\le\alpha.
$$

$N(\theta,1)$, $\theta\le0$ ではtail確率が $\theta$ とともに増えるのでsupは境界0、

$$
p(x)=1-\Phi(x).
$$

plug-inはsupによる最悪ケース保証を失うため一般には危険。

## 採点基準

- supremum P値: 6点
- 確率積分変換・連続条件・離散super-uniform: 6点
- 正規例: 5点
- plug-inの危険: 3点
