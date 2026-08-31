# Core 35 移動平均過程 MA(1)・自己共分散・可逆性

- 安定ID: `RIKOU-CORE-35`
- 80大問 No.: 24
- 演習価値: A
- 難度: B
- 目安時間: 25分

## 前提・記号

移動平均過程・自己共分散・可逆性の一般事項は [E2-03 自己回帰過程・移動平均過程・ARIMA過程](../../textbook/volumes/05_engineering/E2_03_ar_ma_arima時系列/index.md) を前提とする。

本問では textbook と同じ **プラス符号の規約**

$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}
$$

を用いる。

## 問題

$$
X_t=\varepsilon_t+0.5\varepsilon_{t-1},
\qquad \varepsilon_t\overset{\mathrm{iid}}\sim(0,4)
$$

とする。

1. $\gamma(0),\gamma(1),\gamma(h)$ $(|h|\ge2)$ を求めよ。
2. 自己相関関数を求めよ。
3. 一般の MA(1) $X_t=\varepsilon_t+\theta\varepsilon_{t-1}$ について、「可逆」とは何を意味するかを説明し、可逆条件を導け。
4. $\theta=2$, イノベーション分散1のMA(1)が本問と同じ自己共分散を持つことを確認し、可逆性が識別に必要な理由を説明せよ。

## 詳細解答

### 1. 自己共分散

$$
X_t=\varepsilon_t+0.5\varepsilon_{t-1}
$$

なので、白色雑音の異時点無相関性を使うと

$$
\begin{aligned}
\gamma(0)
&=\operatorname{Var}(X_t)\\
&=\operatorname{Var}(\varepsilon_t)
+0.5^2\operatorname{Var}(\varepsilon_{t-1})\\
&=4(1+0.5^2)\\
&=\boxed{5}.
\end{aligned}
$$

次に

$$
X_{t-1}=\varepsilon_{t-1}+0.5\varepsilon_{t-2}.
$$

$X_t$ と $X_{t-1}$ が共有するイノベーションは $\varepsilon_{t-1}$ だけだから

$$
\begin{aligned}
\gamma(1)
&=\operatorname{Cov}(X_t,X_{t-1})\\
&=0.5\operatorname{Var}(\varepsilon_{t-1})\\
&=\boxed{2}.
\end{aligned}
$$

$|h|\ge2$ では $X_t$ と $X_{t-h}$ に共通するイノベーションがないので

$$
\boxed{\gamma(h)=0\qquad(|h|\ge2)}.
$$

### 2. 自己相関関数

$$
\rho(h)=\frac{\gamma(h)}{\gamma(0)}
$$

だから

$$
\boxed{\rho(1)=\frac25=0.4},
\qquad
\boxed{\rho(h)=0\quad(|h|\ge2)}.
$$

### 3. 可逆性の意味と条件を導く

一般の MA(1)

$$
X_t=\varepsilon_t+\theta\varepsilon_{t-1}
$$

を考える。

可逆とは、観測系列 $X_t,X_{t-1},\ldots$ から現在のイノベーション $\varepsilon_t$ を一意に、かつ収束する無限線形結合として復元できることをいう。

モデル式を $\varepsilon_t$ について解くと

$$
\varepsilon_t=X_t-\theta\varepsilon_{t-1}.
$$

再帰的に代入すると

$$
\varepsilon_t
=X_t-\theta X_{t-1}+\theta^2X_{t-2}
-\theta^3X_{t-3}+\cdots,
$$

すなわち

$$
\boxed{
\varepsilon_t
=\sum_{j=0}^{\infty}(-\theta)^jX_{t-j}
}.
$$

古い観測の係数 $(-\theta)^j$ が0へ減衰する条件は

$$
\boxed{|\theta|<1}.
$$

後退作用素 $B$ を使えば

$$
X_t=(1+\theta B)\varepsilon_t,
$$

$$
\varepsilon_t
=(1+\theta B)^{-1}X_t
=(1-\theta B+\theta^2B^2-\cdots)X_t
$$

であり、移動平均多項式 $1+\theta z$ の根 $z=-1/\theta$ が単位円外にある条件と同値である。

### 4. なぜ可逆性が識別に必要か

一般の MA(1) では

$$
\gamma(0)=\sigma_\varepsilon^2(1+\theta^2),
\qquad
\gamma(1)=\theta\sigma_\varepsilon^2.
$$

本問は

$$
(\theta,\sigma_\varepsilon^2)=(0.5,4)
$$

なので

$$
\gamma(0)=5,
\qquad
\gamma(1)=2.
$$

一方

$$
(\theta',\sigma'^2)=(2,1)
$$

としても

$$
\gamma'(0)=5,
\qquad
\gamma'(1)=2.
$$

したがって両モデルは同じ自己共分散関数を持つ。

一般に

$$
(\theta,\sigma^2)
\quad\text{と}\quad
\left(\frac1\theta,\theta^2\sigma^2\right)
$$

は $\theta\ne0$ のとき同じ $\gamma(0),\gamma(1)$ を与える。そこで $|\theta|<1$ という可逆性を課し、同じ2次構造を与える複数の表現から一意な代表を選ぶ。

本問では

$$
|0.5|<1,
\qquad
|2|>1
$$

なので、可逆表現は

$$
\boxed{\theta=0.5,\quad \sigma_\varepsilon^2=4}
$$

である。

## 本番答案

$$
\gamma(0)=5,
\quad
\gamma(1)=2,
\quad
\gamma(h)=0\ (|h|\ge2),
$$

したがって $\rho(1)=0.4$、以後0。

一般の MA(1) では

$$
\varepsilon_t=X_t-\theta\varepsilon_{t-1}
=X_t-\theta X_{t-1}+\theta^2X_{t-2}-\cdots.
$$

過去の係数が減衰してこの表現が収束するための条件は

$$
\boxed{|\theta|<1}.
$$

$(\theta',\sigma'^2)=(2,1)$ でも $\gamma(0)=5,\gamma(1)=2$ となるため、可逆条件は同じ2次構造を持つ複数表現から一意なものを選ぶ識別条件である。

## 採点基準

- 自己共分散を共有イノベーションから導出: 6点
- 自己相関関数: 3点
- 再帰展開から可逆条件 $|\theta|<1$ を導出: 6点
- 非一意性と識別の説明: 5点

25分経過時は「共有するイノベーション」と「$\varepsilon_t$ の再帰展開」を必ず残す。