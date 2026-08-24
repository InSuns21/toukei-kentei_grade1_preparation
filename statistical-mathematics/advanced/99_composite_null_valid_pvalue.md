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
2. そのP値が帰無仮説の全ての $\theta$ で有意水準を制御する理由を説明せよ。
3. $X\sim N(\theta,1)$, $H_0:\theta\le0$, $H_1:\theta>0$, $T=X$ のP値を求めよ。
4. 帰無母数をデータ依存のplug-in推定値で置き換えることが一般に危険な理由を述べよ。

## 詳細解答

基本形は

$$
\boxed{
p(x)=\sup_{\theta\in\Theta_0}
P_\theta\{T(X)\ge T(x)\}
}.
$$

任意の真の帰無母数 $\theta_0\in\Theta_0$ に対して

$$
p(x)\ge p_{\theta_0}(x)
=P_{\theta_0}\{T(X)\ge T(x)\}.
$$

連続分布なら $p_{\theta_0}(X)$ は一様、離散ならsuper-uniformなので

$$
P_{\theta_0}\{p(X)\le\alpha\}\le\alpha.
$$

正規例では、固定 $x$ に対して $P_\theta(X\ge x)=1-\Phi(x-\theta)$ は $\theta$ とともに増加する。帰無集合 $\theta\le0$ で最大は境界 $\theta=0$。従って

$$
\boxed{p(x)=1-\Phi(x)}.
$$

plug-inは通常

$$
P_{\hat\theta_0}\{T\ge T(x)\}
\le\sup_{\theta\in\Theta_0}P_\theta\{T\ge T(x)\}
$$

であり、最悪ケースを保証しないためP値を過小評価しうる。特殊なピボット構造など別の正当化が必要。

## 本番答案

複合帰無では

$$
p(x)=\sup_{\theta\in\Theta_0}P_\theta(T\ge T(x)).
$$

真の任意の帰無母数でのtail確率以上を取るのでsuper-uniform性が保たれる。$N(\theta,1)$, $\theta\le0$ ではsupは境界0で $p=1-\Phi(x)$。plug-inはsup保証を失う。

## 採点基準

- supremum P値: 6点
- 妥当性の証明: 6点
- 正規例: 5点
- plug-inの危険: 3点
