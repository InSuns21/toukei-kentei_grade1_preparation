# Core 07 MLEの漸近正規性・Wald/LR/Score検定

- 安定ID: `RIKOU-CORE-07`
- 80大問 No.: 74
- 演習価値: S
- 難度: S
- 目安時間: 30分

## 問題

$X_1,\dots,X_n$ は独立に Bernoulli$(p)$ に従う。$0<p_0<1$ とし、$H_0:p=p_0$ を両側検定する。

1. MLE $\hat p$ と1標本当たりの Fisher 情報量 $I_1(p)$ を求めよ。
2. MLEの漸近正規性から Wald 統計量を構成せよ。
3. Score 統計量と尤度比統計量を構成し、$H_0$ の下での漸近分布を、使う定理の条件とともに述べよ。
4. $n=100$, $\sum X_i=50$, $p_0=0.4$ のとき3統計量を計算せよ。対数を含む尤度比統計量は正しい厳密式までで満点とし、小数化は任意とする。
5. なぜ有限標本では3統計量が一致せず、漸近的には一致するのか説明せよ。

## 詳細解答

### 1. MLEと情報量

$$
\ell(p)=S\log p+(n-S)\log(1-p),\qquad S=\sum X_i.
$$

内部ではスコア方程式から $\hat p=S/n$。Fisher情報は

$$
U_1(p)=\frac{X-p}{p(1-p)},
$$

$$
I_1(p)=E[U_1(p)^2]=\frac1{p(1-p)}.
$$

### 2. Wald：CLTとSlutskyの条件

$H_0$ の下では $X_i$ はi.i.d. Bernoulli$(p_0)$、

$$
Var(X_i)=p_0(1-p_0)\in(0,\infty).
$$

よって **Lindeberg–Lévyの中心極限定理**から

$$
\frac{\sqrt n(\hat p-p_0)}{\sqrt{p_0(1-p_0)}}\Rightarrow N(0,1).
$$

またLLNで $\hat p\to_p p_0$。$p_0$ は $(0,1)$ の内部点なので $p_0(1-p_0)>0$、従って **Slutskyの定理**で分母をplug-inでき、

$$
\boxed{W=\frac{n(\hat p-p_0)^2}{\hat p(1-\hat p)}\Rightarrow\chi^2_1}.
$$

### 3. ScoreとLR

Score統計量は

$$
\boxed{S_c=\frac{(S-np_0)^2}{np_0(1-p_0)}}.
$$

これは上のCLTで標準化した量の二乗なので $S_c\Rightarrow\chi^2_1$。

LRについては **Wilksの定理**を使う。必要条件は、真値が母数空間内部、モデルが識別可能かつ十分滑らか、情報量が有限正であること。本問は

- $0<p_0<1$ で内部点。
- Bernoulliの支持 $\{0,1\}$ は $p$ に依存しない。
- 対数尤度は真値近傍で滑らか。
- $I_1(p_0)=1/[p_0(1-p_0)]\in(0,\infty)$。

なのでWilksの条件を満たし、1個の制約 $p=p_0$ だから

$$
\boxed{G^2=2\{\ell(\hat p)-\ell(p_0)\}\Rightarrow\chi^2_1}.
$$

### 4. 数値

$\hat p=0.5$。

$$
W=\frac{100(0.1)^2}{0.5\cdot0.5}=4,
$$

$$
S_c=\frac{(50-40)^2}{100\cdot0.4\cdot0.6}=\frac{25}{6}.
$$

$$
\begin{aligned}
G^2
&=2\left[50\log\frac{0.5}{0.4}+50\log\frac{0.5}{0.6}\right]\\
&=100\log\frac{25}{24}.
\end{aligned}
$$

### 5. 漸近的一致

有限標本ではWaldは $\hat p$、Scoreは $p_0$ で曲率を評価し、LRは尤度差を見るため一致しない。

$H_0$ 下でCLTから $\hat p-p_0=O_p(n^{-1/2})$。スコア方程式を $p_0$ 周りでTaylor展開すると

$$
\hat p-p_0
=\frac{U(p_0)}{I_n(p_0)}+o_p(n^{-1/2}).
$$

また対数尤度の2次展開から

$$
2\{\ell(\hat p)-\ell(p_0)\}
=I_n(p_0)(\hat p-p_0)^2+o_p(1).
$$

Scoreも同じ二次形式、Waldは $I_n(\hat p)/I_n(p_0)\to_p1$ なので、三者の差は $o_p(1)$。

## 本番答案

$\hat p=S/n$, $I_1(p)=1/[p(1-p)]$。$H_0$ ではi.i.d.有限正分散なので **CLT**、LLNと $0<p_0<1$ から **Slutsky**を使え、

$$
W\Rightarrow\chi^2_1,
\qquad
S_c\Rightarrow\chi^2_1.
$$

Bernoulliは内部点 $p_0$ で正則、共通支持、有限正情報量を持つので **Wilksの定理**から

$$
G^2=2\{\ell(\hat p)-\ell(p_0)\}\Rightarrow\chi^2_1.
$$

数値は

$$
W=4,\qquad S_c=25/6,\qquad G^2=100\log(25/24).
$$

局所2次展開により三者の差は $o_p(1)$。

## 採点基準

- (1) MLE・情報量: 4点
- (2) Wald（CLT・Slutsky条件）: 4点
- (3) Score・LR・Wilks条件: 6点
- (4) 正しい厳密式: 4点
- (5) 局所2次近似: 2点

25分経過時は「CLT/Slutskyの条件」「Wilksの内部点・正則性」を一行ずつ残す。
