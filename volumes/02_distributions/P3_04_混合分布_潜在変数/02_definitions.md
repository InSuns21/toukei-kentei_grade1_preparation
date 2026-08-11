# 定義

## 潜在指標と有限混合

$Z\in\{1,\ldots,m\}$ を成分指標とし、$P(Z=j)=\pi_j$、$\pi_j\geq0$、$\sum_{j=1}^m\pi_j=1$ とする。$Z=j$ のとき $X$ の確率質量関数または確率密度を $g_j$ と書く。観測される $X$ の分布は
$$
g(x)=\sum_{j=1}^m\pi_j g_j(x).
$$
離散型なら $g_j(x)=P(X=x\mid Z=j)$、連続型なら $g_j$ は条件付き密度である。成分指標 $Z$ は観測されないので潜在指標と呼ぶ。

## 責務

$g(x)>0$ のとき、観測 $X=x$ が成分 $j$ から来た確率
$$
\tau_j(x)=P(Z=j\mid X=x)=\frac{\pi_jg_j(x)}{\sum_{\ell=1}^m\pi_\ell g_\ell(x)}
$$
を責務（観測後の成分確率）と呼ぶ。周辺質量または密度が0の範囲では公式が $0/0$ となるが、その範囲の責務は確率計算に影響しない。

## Poisson--Gamma階層モデル

$Z$ を省略して、$X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda)$、$\Lambda\sim\operatorname{Gamma}(\alpha,\beta)$ とする。ここではGammaのshape-rate表示
$$
f_\Lambda(\lambda)=\frac{\beta^\alpha}{\Gamma(\alpha)}\lambda^{\alpha-1}e^{-\beta\lambda},\; \lambda>0,
\quad \alpha,\beta>0
$$
を使う。Poissonの確率質量関数は（$k\in\mathbb N_0$、$\lambda>0$）
$$
P(X=k\mid\Lambda=\lambda)=e^{-\lambda}\frac{\lambda^k}{k!},\; k\in\mathbb N_0,
\quad \lambda>0.
$$

複数標本を使うときは、$\Lambda_1,\ldots,\Lambda_n$ が独立同分布で、各 $X_i$ は対応する $\Lambda_i$ を条件に独立とする。したがって $X_i$ も独立同分布である。予測値 $Y$ に過去の観測と同じ $\Lambda$ を使う場合は共有潜在率、独立な新しい $\Lambda_{\mathrm{new}}$ を使う場合は新規潜在率と呼び、問題文で区別する。本章のD01とドリルでは、同じ個体・期間の再観測として $X_1$ と $Y$ が共有潜在率 $\Lambda_1$ を持つ設定を使う。

## 識別可能性

成分の順番を入れ替えても同じ混合分布になる。したがって正規混合などでは、推定した成分1・2の名前自体に意味を持たせず、平均の大小などの制約を置く。これをラベル交換の注意という。
