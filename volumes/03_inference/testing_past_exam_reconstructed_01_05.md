# 検定分野 過去問型再構成演習 1位〜5位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、仮説検定分野の演習価値ランキング1位〜5位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・数値・設問順・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 公開解説は出題構造の確認にのみ用い、数式・結論は独立に再計算している。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値の評価基準

順位は元難度ではなく、次の観点を重視した。

1. 統計検定1級で繰り返し使う検定理論の中核を含むか。
2. 1題で複数の重要技法を横断できるか。
3. 正規・多項・分割表・線形モデルなど他の問題へ転用しやすいか。
4. Neyman–Pearson、UMP/UMPU、LRT、Wilks型漸近、Pearson型検定という主要ルートを押さえられるか。
5. 単なる計算ではなく「なぜその棄却域になるか」まで練習できるか。
6. 既に上位問題で学べる論点との重複が少ないか。

## 全8題の演習価値ランキング

| 順位 | 参照年・問 | 元難度 | 主題 | 演習価値の理由 |
|---:|---|:---:|---|---|
| 1 | 2013 問5 | S | 多項分布・LRT・適合度 | 多項MLE、尤度比、Pearson統計量、自由度、漸近同値まで一気に接続できる |
| 2 | 2015 問2 | A | 棄却域・UMP検定 | P値、検出力、標本サイズ、Neyman–Pearson、単調尤度比、UMPの中心問題 |
| 3 | 2012 問4 | A | 母平均のUMPU検定 | 両側検定でUMPが壊れる理由と、UMPUで救う構造を学べる |
| 4 | 2014 問4 | S | F検定・測定法比較 | 線形モデル、推定量分散、F検定、非心度、検出力を設計比較へ結びつける |
| 5 | 2015 問4 | B | 尤度比検定 | 制約付きMLE、対称性仮説、自由度、分割表LRTを体系的に練習できる |
| 6 | 2013 問4 | A | 順序統計量による検定 | 独自統計量の帰無分布から棄却域を設計する力を鍛えられるが適用範囲はやや狭い |
| 7 | 2014 問5 | B | 適合度検定・尤度比検定 | 重要だが1位の2013問5と論点重複が大きいため追加演習価値は下がる |
| 8 | 2019 問4 | C | Cauchy分布・最強力検定 | Neyman–Pearsonの良問だがCauchy固有の形の処理が強く、転用性では上位に劣る |

---

# 1位: 2013 問5型 多項分布のLRTとPearson適合度検定を漸近的につなぐ

- 安定ID: `RECON-TEST-R01-2013-Q5`
- 参照: 2013年 問5
- 確度: `third_party_topic_index`
- 確認元: Academaid「2013年統計検定1級＜数理統計問5＞」
- 元主題: 多項分布の尤度比検定と適合度検定
- Level: C
- 目安時間: 30分
- 計算量: 中〜多
- 主な使用技術: 多項分布、制約付きMLE、LRT、Pearson統計量、Taylor展開、確率的オーダー、自由度

## 問題

$X=(X_1,\ldots,X_m)$ が

$$
X\sim\operatorname{Multinomial}
\left(n;p_1,\ldots,p_m\right),
\qquad
p_j>0,
\qquad
\sum_{j=1}^m p_j=1
$$

に従うとする。観測値を $x_1,\ldots,x_m$ とし、$\sum_jx_j=n$ とする。

帰無仮説

$$
H_0:p_j=p_{j0}\quad(j=1,\ldots,m)
$$

を考える。ただし $p_{j0}>0$、$\sum_jp_{j0}=1$ とする。

1. 制約 $\sum_jp_j=1$ の下で、対立モデルにおける最尤推定量 $\widehat p_j$ を求めよ。
2. 尤度比

$$
\Lambda
=
\frac{\sup_{H_0}L(p)}{\sup L(p)}
$$

を求め、$G^2=-2\log\Lambda$ を観測度数と期待度数 $E_j=np_{j0}$ を用いて表せ。
3. Pearsonの適合度統計量

$$
X_P^2
=
\sum_{j=1}^m\frac{(X_j-E_j)^2}{E_j}
$$

を定義する。$H_0$ の下で

$$
G^2-X_P^2=o_p(1)
$$

となることを、$D_j=X_j-E_j$ とおいてTaylor展開により示せ。
4. $H_0$ の下で $G^2$ および $X_P^2$ が漸近的に自由度 $m-1$ の $\chi^2$ 分布に従う理由を説明せよ。
5. $m=2$ とし、$X_1=X$、$p_{10}=p_0$ とする。このとき $X_P^2$ が通常の二項比率の正規近似検定統計量の二乗に一致することを示せ。

## 解答

### 1. 多項分布の最尤推定量

尤度は

$$
L(p_1,\ldots,p_m)
=
\frac{n!}{x_1!\cdots x_m!}
\prod_{j=1}^m p_j^{x_j}.
$$

定数項を除いた対数尤度は

$$
\ell(p)
=
\sum_{j=1}^m x_j\log p_j.
$$

制約 $\sum_jp_j=1$ に対してLagrange乗数 $\lambda$ を用いる。

$$
\mathcal L
=
\sum_{j=1}^m x_j\log p_j
-\lambda\left(\sum_{j=1}^mp_j-1\right).
$$

各 $p_j$ で微分すると

$$
\frac{x_j}{p_j}-\lambda=0
$$

より

$$
p_j=\frac{x_j}{\lambda}.
$$

制約に代入して

$$
1
=
\sum_{j=1}^m\frac{x_j}{\lambda}
=
\frac{n}{\lambda}
$$

なので $\lambda=n$。

したがって

$$
\boxed{
\widehat p_j=\frac{X_j}{n}
}.
$$

### 2. 尤度比統計量

帰無仮説の下では $p_j=p_{j0}$、対立モデルでは $\widehat p_j=x_j/n$ なので

$$
\Lambda
=
\prod_{j=1}^m
\left(
\frac{p_{j0}}{x_j/n}
\right)^{x_j}.
$$

よって

$$
\begin{aligned}
G^2
&=-2\log\Lambda\\
&=2\sum_{j=1}^m
x_j\log\frac{x_j/n}{p_{j0}}\\
&=2\sum_{j=1}^m
x_j\log\frac{x_j}{np_{j0}}.
\end{aligned}
$$

期待度数 $E_j=np_{j0}$ を使えば

$$
\boxed{
G^2
=2\sum_{j=1}^m
X_j\log\frac{X_j}{E_j}
}.
$$

$X_j=0$ の項は極限により $0\log0=0$ と解釈する。

### 3. $G^2$ とPearson統計量の漸近同値

$D_j=X_j-E_j$ とおけば

$$
X_j=E_j+D_j,
\qquad
\sum_{j=1}^mD_j=0.
$$

また

$$
\frac{X_j}{E_j}
=1+\frac{D_j}{E_j}.
$$

したがって

$$
G^2
=2\sum_{j=1}^m
(E_j+D_j)
\log\left(1+\frac{D_j}{E_j}\right).
$$

$H_0$ の下で $E_j=O(n)$、$D_j=O_p(\sqrt n)$ なので

$$
\frac{D_j}{E_j}=O_p(n^{-1/2}).
$$

Taylor展開

$$
\log(1+u)
=u-\frac{u^2}{2}+\frac{u^3}{3}+O(u^4)
$$

を用いると、各項は

$$
\begin{aligned}
2(E_j+D_j)
\log\left(1+\frac{D_j}{E_j}\right)
&=
2(E_j+D_j)
\left[
\frac{D_j}{E_j}
-\frac{D_j^2}{2E_j^2}
+O_p(n^{-3/2})
\right]\\
&=
2D_j+
\frac{D_j^2}{E_j}
+O_p(n^{-1/2}).
\end{aligned}
$$

$m$ は固定とする。和を取れば

$$
G^2
=
2\sum_jD_j
+
\sum_j\frac{D_j^2}{E_j}
+O_p(n^{-1/2}).
$$

ところが $\sum_jD_j=0$ なので

$$
G^2
=
X_P^2+O_p(n^{-1/2}).
$$

よって

$$
\boxed{
G^2-X_P^2=o_p(1)
}.
$$

ここは非常に重要である。LRTとPearson検定は有限標本では異なる統計量だが、大標本では同じ二次形式へ近づく。

### 4. 自由度が $m-1$ になる理由

多項度数は $m$ 個あるが

$$
\sum_{j=1}^mX_j=n
$$

という1本の線形制約を必ず満たす。

したがって独立に変動できる方向は $m-1$ 次元しかない。

帰無仮説の下で多項ベクトルを中心化・標準化すると、この $m-1$ 次元部分空間上で漸近正規分布となり、その二次形式が $\chi^2_{m-1}$ に収束する。

ゆえに

$$
\boxed{
G^2\xrightarrow{d}\chi^2_{m-1}
},
\qquad
\boxed{
X_P^2\xrightarrow{d}\chi^2_{m-1}
}.
$$

別の見方では、飽和多項モデルの自由母数は $m-1$ 個、帰無仮説では自由母数は $0$ 個なので、尤度比検定の自由度差は $m-1$ である。

### 5. 二項検定との一致

$m=2$ とし

$$
X_1=X,
\qquad
X_2=n-X,
$$

$$
E_1=np_0,
\qquad
E_2=n(1-p_0)
$$

とする。

Pearson統計量は

$$
\begin{aligned}
X_P^2
&=
\frac{(X-np_0)^2}{np_0}
+
\frac{\{(n-X)-n(1-p_0)\}^2}{n(1-p_0)}\\
&=
(X-np_0)^2
\left[
\frac1{np_0}
+
\frac1{n(1-p_0)}
\right]\\
&=
\frac{(X-np_0)^2}{np_0(1-p_0)}.
\end{aligned}
$$

一方、二項比率の正規近似統計量は

$$
Z
=
\frac{X-np_0}{\sqrt{np_0(1-p_0)}}.
$$

したがって

$$
\boxed{X_P^2=Z^2}.
$$

つまり二項の両側 $z$ 検定は、大標本では自由度1のPearson適合度検定と同じものとして見られる。

## 本番答案の芯

$$
\widehat p_j=\frac{X_j}{n},
\qquad
G^2=2\sum_jX_j\log\frac{X_j}{np_{j0}},
$$

$$
X_P^2=\sum_j\frac{(X_j-np_{j0})^2}{np_{j0}}.
$$

$D_j=X_j-np_{j0}=O_p(\sqrt n)$ とすれば

$$
\log\left(1+\frac{D_j}{np_{j0}}\right)
=
\frac{D_j}{np_{j0}}
-
\frac{D_j^2}{2n^2p_{j0}^2}
+O_p(n^{-3/2}).
$$

$\sum_jD_j=0$ より

$$
G^2=X_P^2+o_p(1),
$$

したがって両者とも

$$
\chi^2_{m-1}
$$

へ収束する。

## 典型的な落とし穴

- 多項分布の母数を $m$ 個すべて自由と数えてしまう。実際は $\sum p_j=1$ により自由度は $m-1$。
- $D_j=X_j-E_j$ を $O_p(1)$ と誤認する。正しくは $O_p(\sqrt n)$。
- Taylor展開の一次項が残ると思ってしまう。$\sum_jD_j=0$ で消える。
- $G^2$ とPearson統計量を有限標本でも同一と考える。漸近的に同値であって、通常は数値が異なる。

---

# 2位: 2015 問2型 Neyman–PearsonからUMP検定・検出力・標本サイズまで通す

- 安定ID: `RECON-TEST-R02-2015-Q2`
- 参照: 2015年 問2
- 確度: `third_party_topic_index`
- 確認元: Academaid「2015年統計検定1級＜統計数理2＞」
- 元主題: 棄却域と一様最強力検定
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: P値、検出力、標本サイズ、Neyman–Pearson補題、単調尤度比、UMP

## 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim N(\mu,1)
$$

に従うとする。次の片側検定を考える。

$$
H_0:\mu\le0,
\qquad
H_1:\mu>0.
$$

有意水準を $\alpha$ とし、$z_\alpha$ を標準正規分布の上側 $\alpha$ 点、すなわち

$$
P(Z>z_\alpha)=\alpha
$$

を満たす値とする。

1. $H_0:\mu=0$ の下で観測標本平均が $\bar x$ だったときの片側P値を求めよ。
2. 有意水準 $\alpha$ の棄却域を求めよ。
3. 真の平均が $\mu>0$ のときの検出力関数 $\pi(\mu)$ を求めよ。
4. $\mu=\delta>0$ のとき検出力を少なくとも $1-\beta$ にしたい。必要な標本サイズ $n$ の条件を求めよ。
5. 固定した $\mu_1>0$ に対してNeyman–Pearson補題を用い、(2)の検定が最強力であることを示せ。さらに棄却域が $\mu_1$ に依存しないことからUMPであることを示せ。

## 解答

### 1. P値

$H_0$ の境界 $\mu=0$ では

$$
\bar X\sim N\left(0,\frac1n\right),
$$

したがって

$$
\sqrt n\,\bar X\sim N(0,1).
$$

大きい $\bar X$ ほど $H_1$ 寄りなので

$$
\boxed{
p
= P_0(\bar X\ge\bar x)
=1-\Phi(\sqrt n\,\bar x)
}.
$$

複合帰無仮説 $\mu\le0$ でも、$P_\mu(\bar X\ge\bar x)$ は $\mu$ とともに増えるため、最悪ケースは境界 $\mu=0$ である。

### 2. 棄却域

有意水準 $\alpha$ とするため

$$
P_0\left(
\sqrt n\,\bar X>z_\alpha
\right)=\alpha.
$$

よって

$$
\boxed{
\bar X>\frac{z_\alpha}{\sqrt n}
}
$$

のとき棄却する。

### 3. 検出力関数

真の平均が $\mu$ のとき

$$
\bar X\sim N\left(\mu,\frac1n\right).
$$

したがって

$$
\begin{aligned}
\pi(\mu)
&=P_\mu\left(
\bar X>\frac{z_\alpha}{\sqrt n}
\right)\\
&=P_\mu\left(
\sqrt n(\bar X-\mu)>
z_\alpha-\sqrt n\mu
\right)\\
&=1-\Phi\left(z_\alpha-\sqrt n\mu\right).
\end{aligned}
$$

よって

$$
\boxed{
\pi(\mu)=1-\Phi(z_\alpha-\sqrt n\mu)
}.
$$

$\mu=0$ では $\pi(0)=\alpha$、$\mu$ が大きいほど検出力も大きくなる。

### 4. 必要標本サイズ

$\mu=\delta$ で

$$
\pi(\delta)\ge1-\beta
$$

を要求する。

$$
1-\Phi(z_\alpha-\sqrt n\delta)
\ge1-\beta
$$

より

$$
\Phi(z_\alpha-\sqrt n\delta)
\le\beta.
$$

標準正規分布の上側 $\beta$ 点を $z_\beta$ とすると

$$
\Phi(-z_\beta)=\beta.
$$

したがって

$$
z_\alpha-\sqrt n\delta\le-z_\beta.
$$

よって

$$
\sqrt n\delta\ge z_\alpha+z_\beta
$$

なので

$$
\boxed{
n\ge
\left(
\frac{z_\alpha+z_\beta}{\delta}
\right)^2
}.
$$

実際には右辺以上の最小整数を採用する。

### 5. Neyman–Pearson補題とUMP

固定した対立仮説 $\mu=\mu_1>0$ を考える。

同時密度は

$$
f_\mu(x)
=(2\pi)^{-n/2}
\exp\left[
-\frac12\sum_{i=1}^n(x_i-\mu)^2
\right].
$$

尤度比は

$$
\begin{aligned}
\frac{f_{\mu_1}(x)}{f_0(x)}
&=
\exp\left[
\mu_1\sum_{i=1}^nx_i
-\frac{n\mu_1^2}{2}
\right]\\
&=
\exp\left[
 n\mu_1\bar x-
\frac{n\mu_1^2}{2}
\right].
\end{aligned}
$$

$\mu_1>0$ なので、これは $\bar x$ の単調増加関数である。

Neyman–Pearson補題より、固定した $\mu_1>0$ に対する最強力検定は

$$
\bar X>c
$$

の形になる。

サイズを $\alpha$ にするには $H_0$ の境界 $\mu=0$ で

$$
P_0(\bar X>c)=\alpha
$$

とすればよく、

$$
c=\frac{z_\alpha}{\sqrt n}.
$$

重要なのは、この $c$ が $\mu_1$ に依存しないことである。

したがって同じ棄却域が全ての $\mu_1>0$ に対して最強力となる。

$$
\boxed{
\bar X>\frac{z_\alpha}{\sqrt n}
\text{ は }H_0:\mu\le0\text{ vs }H_1:\mu>0
\text{ のUMP検定}
}.
$$

## 本番答案の芯

$$
R
=\left\{\bar X>\frac{z_\alpha}{\sqrt n}\right\},
$$

$$
\pi(\mu)
=1-\Phi(z_\alpha-\sqrt n\mu).
$$

固定 $\mu_1>0$ に対し

$$
\frac{f_{\mu_1}(x)}{f_0(x)}
=
\exp\left(\mu_1\sum X_i-\frac{n\mu_1^2}{2}\right)
$$

は $\bar X$ の単調増加関数。Neyman–Pearsonより上側棄却が最強力であり、その臨界値は $\mu_1$ に依存しないのでUMP。

## 典型的な落とし穴

- 複合帰無 $\mu\le0$ なのに全ての $\mu$ でサイズ計算をしようとして詰まる。上側検定では境界 $\mu=0$ が最悪ケース。
- 検出力と第2種過誤確率を混同する。検出力は $1-\beta$。
- NP補題は本来「単純 vs 単純」。固定した $\mu_1$ ごとに適用し、同じ棄却域になることを確認してUMPへ進む。

---

# 3位: 2012 問4型 分散既知正規母平均の両側UMPU検定

- 安定ID: `RECON-TEST-R03-2012-Q4`
- 参照: 2012年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2012年統計検定1級＜数理統計問4＞」
- 元主題: 分散既知の母平均一様最強力不偏検定
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 両側z検定、検出力、不偏検定、指数型分布族、完全十分統計量、UMPU

## 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim N(\mu,\sigma^2)
$$

に従い、$\sigma^2$ は既知とする。

次の両側検定を考える。

$$
H_0:\mu=0,
\qquad
H_1:\mu\ne0.
$$

1. 有意水準 $\alpha$ の通常の両側 $z$ 検定の棄却域を求めよ。
2. この検定の検出力関数を求め、$\mu\ne0$ で検出力が $\alpha$ より大きいことを示せ。
3. なぜこの問題では通常「UMP検定」を期待できないのか説明せよ。
4. $T=\sum_{i=1}^nX_i$ とする。正規分布族が1母数指数型分布族であることを確認し、$T$ が検定問題の中心統計量になることを示せ。
5. 次の事実を用いてよい。

> 1母数指数型分布族における両側検定では、サイズ条件と不偏性条件を満たす $T$ に基づく検定はUMPUとなる。

通常の両側 $z$ 検定がこれらの条件を満たすことを示し、UMPUであることを説明せよ。

## 解答

### 1. 両側 $z$ 検定

$H_0:\mu=0$ の下で

$$
Z
=\frac{\sqrt n\,\bar X}{\sigma}
\sim N(0,1).
$$

標準正規分布の上側 $\alpha/2$ 点を $z_{\alpha/2}$ とすれば

$$
P_0(|Z|>z_{\alpha/2})=\alpha.
$$

したがって棄却域は

$$
\boxed{
\left|
\frac{\sqrt n\,\bar X}{\sigma}
\right|>z_{\alpha/2}
}.
$$

同値に

$$
\boxed{
\bar X<-
\frac{\sigma z_{\alpha/2}}{\sqrt n}
\quad\text{or}\quad
\bar X>
\frac{\sigma z_{\alpha/2}}{\sqrt n}
}.
$$

### 2. 検出力と不偏性

真の平均を $\mu$ とする。

$$
Z
=\frac{\sqrt n\,\bar X}{\sigma}
\sim N\left(
\delta,1
\right),
\qquad
\delta=\frac{\sqrt n\mu}{\sigma}.
$$

$c=z_{\alpha/2}$ とおくと

$$
\begin{aligned}
\pi(\mu)
&=P_\mu(Z>c)+P_\mu(Z<-c)\\
&=1-\Phi(c-\delta)+\Phi(-c-\delta).
\end{aligned}
$$

したがって

$$
\boxed{
\pi(\mu)
=1-\Phi(c-\delta)+\Phi(-c-\delta)
}.
$$

$\delta=0$ では

$$
\pi(0)=2\{1-\Phi(c)\}=\alpha.
$$

また $\pi(\mu)$ は $\mu$ の偶関数である。

$\delta>0$ で微分すると

$$
\frac{d\pi}{d\delta}
=
\phi(c-\delta)-\phi(c+\delta).
$$

$\delta>0$ では $|c-\delta|<c+\delta$ であり、標準正規密度は $|x|$ とともに減少するので

$$
\phi(c-\delta)>\phi(c+\delta).
$$

よって

$$
\frac{d\pi}{d\delta}>0
\qquad(\delta>0).
$$

対称性から $\delta<0$ 側でも $|\delta|$ が増えるほど検出力は増加する。

したがって

$$
\boxed{
\pi(\mu)\ge\alpha
}
$$

であり、$\mu\ne0$ なら厳密に $\pi(\mu)>\alpha$。

これは検定が不偏であることを意味する。

### 3. なぜ両側ではUMPが壊れるのか

$\mu>0$ の対立だけを考えれば、右側の大きな $\bar X$ を棄却域に入れるほど強い。

一方 $\mu<0$ の対立だけを考えれば、左側の小さな $\bar X$ を棄却域に入れるほど強い。

同じサイズ $\alpha$ を右裾へ多く配れば $\mu>0$ に有利だが $\mu<0$ に不利となる。逆も同じである。

したがって全ての $\mu\ne0$ に対して同時に最強となる検定は一般には存在しない。

そこで比較対象を「不偏検定」に限定したUMPUを考える。

### 4. 指数型分布族としての表示

同時密度は

$$
\begin{aligned}
f_\mu(x)
&=(2\pi\sigma^2)^{-n/2}
\exp\left[
-\frac1{2\sigma^2}
\sum_{i=1}^n(x_i-\mu)^2
\right]\\
&=h(x)
\exp\left[
\frac{\mu}{\sigma^2}\sum_{i=1}^nx_i
-
\frac{n\mu^2}{2\sigma^2}
\right].
\end{aligned}
$$

したがって自然統計量は

$$
\boxed{T=\sum_{i=1}^nX_i}.
$$

これは正規1母数指数型分布族の十分統計量であり、$\bar X=T/n$ と同値なので、通常の両側 $z$ 検定も $T$ のみに基づく。

### 5. UMPU条件

棄却関数を

$$
\varphi(T)
=
\mathbf 1
\left\{
|T|>a
\right\}
$$

とする。

$a$ はサイズ条件

$$
E_0[\varphi(T)]=\alpha
$$

を満たすように選ぶ。

$T\sim N(0,n\sigma^2)$ より

$$
a=\sigma\sqrt n\,z_{\alpha/2}.
$$

次に不偏性に対応するモーメント条件を確認する。

帰無仮説の下で $T$ の密度は0を中心に対称であり、$\varphi(T)$ は偶関数である。

したがって

$$
T\varphi(T)
$$

は奇関数となるので

$$
E_0[T\varphi(T)]=0.
$$

一方 $E_0[T]=0$ だから

$$
E_0[T\varphi(T)]
=
\alpha E_0[T].
$$

よってサイズ条件と不偏性条件の両方を満たす。

1母数指数型分布族のUMPU定理から

$$
\boxed{
\left|
\frac{\sqrt n\,\bar X}{\sigma}
\right|>z_{\alpha/2}
}
$$

は $H_0:\mu=0$ vs $H_1:\mu\ne0$ に対するUMPU検定である。

## 本番答案の芯

両側検定では正方向と負方向で最強棄却域が衝突するため、通常UMPは存在しない。

一方

$$
T=\sum X_i
$$

は正規1母数指数型分布族の自然統計量で、

$$
\varphi(T)=\mathbf1\{|T|>a\}
$$

とすると $H_0$ 下の対称性より

$$
E_0[T\varphi(T)]=0=\alpha E_0[T].
$$

さらに $E_0[\varphi]=\alpha$ となるよう

$$
a=\sigma\sqrt n\,z_{\alpha/2}
$$

を選べば、指数型分布族のUMPU定理より通常の両側 $z$ 検定がUMPU。

## 典型的な落とし穴

- 「両側z検定はUMP」と書いてしまう。一般にはUMPではなくUMPU。
- 不偏推定量の「不偏」と検定の「不偏」を混同する。検定の不偏性は対立仮説下の検出力がサイズ以上になること。
- UMPUを単なる左右対称性だけで結論する。指数型分布族の構造とサイズ・モーメント条件を結びつける。

---

# 4位: 2014 問4型 線形モデルで測定法の精度とF検定の検出力を比較する

- 安定ID: `RECON-TEST-R04-2014-Q4`
- 参照: 2014年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2014年統計検定1級＜統計数理4＞」
- 元主題: F検定と測定法の比較検討
- Level: C
- 目安時間: 30分
- 計算量: 多
- 主な使用技術: 線形モデル、計画行列、最小二乗、推定分散、一般線形仮説、F分布、非心F分布、検出力

## 問題

5個の標準物の未知量を

$$
\beta=(\beta_1,\ldots,\beta_5)^\top
$$

とする。誤差は独立に $N(0,\sigma^2)$ に従うとする。

同じ10回の測定回数を使う2つの測定法を考える。

### 測定法A

各標準物を単独で2回ずつ測る。したがって計画行列 $X_A$ は、各標準基底ベクトル $e_i^\top$ を2回ずつ行として持つ。

### 測定法B

5個から2個を選ぶ全ての組合せ $\{i,j\}$ を1回ずつ測り、その観測平均は $\beta_i+\beta_j$ とする。したがって $X_B$ の各行は $e_i^\top+e_j^\top$ であり、全 $\binom52=10$ 行からなる。

関心は

$$
H_0:\beta_1=\beta_2
$$

すなわち

$$
c^\top\beta=0,
\qquad
c=(1,-1,0,0,0)^\top
$$

の検定である。

1. $X_A^\top X_A$ と $X_B^\top X_B$ を求めよ。
2. 最小二乗推定量 $\widehat\beta$ に対し、$c^\top\widehat\beta$ の分散を両測定法で求めよ。
3. 両測定法で残差自由度が5であることを確認し、$H_0$ に対するF統計量を一般形で書け。
4. 対立仮説 $c^\top\beta=d\ne0$ の下でF統計量が非心F分布に従うとき、その非心度を両測定法で求めよ。
5. 推定精度と検出力の観点から、どちらの測定法が優れているか述べよ。

## 解答

### 1. $X^\top X$

測定法Aでは各標準物を2回ずつ単独測定するので

$$
\boxed{
X_A^\top X_A=2I_5
}.
$$

測定法Bでは、各 $\beta_i$ は他の4標準物とのペアに現れるので対角成分は4。

また $i\ne j$ に対し、$\beta_i$ と $\beta_j$ が同じ観測に同時に現れるのはペア $\{i,j\}$ の1回だけなので非対角成分は1。

よって

$$
X_B^\top X_B
=
\begin{pmatrix}
4&1&1&1&1\\
1&4&1&1&1\\
1&1&4&1&1\\
1&1&1&4&1\\
1&1&1&1&4
\end{pmatrix}.
$$

全1行列を $J_5$ とすれば

$$
\boxed{
X_B^\top X_B=3I_5+J_5
}.
$$

### 2. コントラスト推定量の分散

通常の正規線形モデルでは

$$
\operatorname{Var}(\widehat\beta)
=
\sigma^2(X^\top X)^{-1}.
$$

したがって

$$
\operatorname{Var}(c^\top\widehat\beta)
=
\sigma^2c^\top(X^\top X)^{-1}c.
$$

#### 測定法A

$$
(X_A^\top X_A)^{-1}
=\frac12I_5.
$$

$c^\top c=2$ なので

$$
\begin{aligned}
\operatorname{Var}_A(c^\top\widehat\beta)
&=\sigma^2c^\top\frac12I_5c\\
&=\frac{\sigma^2}{2}\cdot2\\
&=\sigma^2.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}_A(c^\top\widehat\beta)=\sigma^2
}.
$$

#### 測定法B

行列公式

$$
(aI+bJ)^{-1}
=
\frac1aI-
\frac{b}{a(a+mb)}J
$$

を $a=3,b=1,m=5$ に適用すると

$$
(3I_5+J_5)^{-1}
=
\frac13I_5-rac1{24}J_5.
$$

$c$ はコントラストなので

$$
\mathbf1^\top c=0,
\qquad
J_5c=0.
$$

したがって

$$
\begin{aligned}
c^\top(X_B^\top X_B)^{-1}c
&=c^\top\left(\frac13I_5-\frac1{24}J_5\right)c\\
&=\frac13c^\top c\\
&=\frac23.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}_B(c^\top\widehat\beta)
=\frac23\sigma^2
}.
$$

同じ10回測定なら、測定法Bの方が $\beta_1-\beta_2$ を小さい分散で推定できる。

### 3. F統計量

両測定法とも観測数は $n=10$、未知パラメータ数は $p=5$。

各計画行列は階数5なので残差自由度は

$$
\boxed{\nu=n-p=5}.
$$

残差平均平方を

$$
s^2=\frac{\operatorname{SSE}}5
$$

とする。

一般線形仮説 $H_0:c^\top\beta=0$ に対するF統計量は

$$
\boxed{
F
=
\frac{(c^\top\widehat\beta)^2}
{s^2c^\top(X^\top X)^{-1}c}
}.
$$

$H_0$ の下で

$$
\boxed{F\sim F_{1,5}}.
$$

したがって測定法Aでは

$$
F_A
=
\frac{(c^\top\widehat\beta_A)^2}{s_A^2},
$$

測定法Bでは

$$
F_B
=
\frac{(c^\top\widehat\beta_B)^2}{(2/3)s_B^2}.
$$

### 4. 非心度

対立仮説

$$
c^\top\beta=d
$$

の下では

$$
F\sim F_{1,5}(\lambda),
$$

非心度は

$$
\lambda
=
\frac{d^2}
{\sigma^2c^\top(X^\top X)^{-1}c}.
$$

測定法Aでは分母係数が1なので

$$
\boxed{
\lambda_A=\frac{d^2}{\sigma^2}
}.
$$

測定法Bでは係数が $2/3$ なので

$$
\boxed{
\lambda_B
=\frac{d^2}{(2/3)\sigma^2}
=\frac{3d^2}{2\sigma^2}
}.
$$

したがって

$$
\boxed{
\lambda_B=\frac32\lambda_A
}.
$$

### 5. 測定法比較

推定分散は

$$
\operatorname{Var}_A(c^\top\widehat\beta)=\sigma^2,
$$

$$
\operatorname{Var}_B(c^\top\widehat\beta)=\frac23\sigma^2.
$$

よって測定法Bの相対効率を逆分散比で表すと

$$
\frac{\operatorname{Var}_A}{\operatorname{Var}_B}
=\frac32.
$$

さらに対立仮説下の非心度も

$$
\lambda_B=\frac32\lambda_A
$$

となる。

非心度が大きいほど固定した有意水準における上側F検定の検出力は高くなる。

したがって

$$
\boxed{
\text{測定法Bの方が、対象コントラストの推定精度・検出力の双方で有利}
}.
$$

## 本番答案の芯

$$
X_A^\top X_A=2I,
\qquad
X_B^\top X_B=3I+J.
$$

$c^\top\mathbf1=0$ より $Jc=0$ なので

$$
c^\top(X_A^\top X_A)^{-1}c=1,
$$

$$
c^\top(X_B^\top X_B)^{-1}c=\frac23.
$$

ゆえに

$$
\operatorname{Var}_B(c^\top\widehat\beta)
=\frac23
\operatorname{Var}_A(c^\top\widehat\beta).
$$

さらに

$$
\lambda
=\frac{(c^\top\beta)^2}
{\sigma^2c^\top(X^\top X)^{-1}c}
$$

より

$$
\lambda_B=\frac32\lambda_A.
$$

したがってBの方が高精度かつ高検出力。

## 典型的な落とし穴

- $X^\top X$ の非対角成分を0とする。ペア測定では異なる母数が同一観測に現れるため1になる。
- 推定分散を $\sigma^2(X^\top X)$ としてしまう。正しくは逆行列。
- F分布だけ見て測定法比較をする。対立仮説下では非心F分布の非心度が検出力比較の鍵。

---

# 5位: 2015 問4型 正方分割表の対称性を尤度比検定する

- 安定ID: `RECON-TEST-R05-2015-Q4`
- 参照: 2015年 問4
- 確度: `third_party_topic_index`
- 確認元: Academaid「2015年統計検定1級＜統計数理4＞」
- 元主題: 対称性のある尤度比検定
- Level: C
- 目安時間: 25分
- 計算量: 中〜多
- 主な使用技術: 多項分布、制約付きMLE、分割表、LRT、自由度、条件付き二項分布

## 問題

$I\times I$ の正方分割表を考える。全度数を $N$、セル度数を $X_{ij}$ とし

$$
(X_{11},X_{12},\ldots,X_{II})
\sim
\operatorname{Multinomial}
\left(N;\{p_{ij}\}_{i,j=1}^I\right)
$$

とする。

対称性仮説

$$
H_0:p_{ij}=p_{ji}
\qquad(i\ne j)
$$

を検定したい。

1. 制約のないモデルにおける $p_{ij}$ のMLEを求めよ。
2. $H_0$ の下でのMLEを求めよ。
3. 尤度比統計量 $G^2=-2\log\Lambda$ を求めよ。
4. 漸近カイ二乗分布の自由度を求めよ。
5. 各 $i<j$ について $M_{ij}=X_{ij}+X_{ji}$ で条件付けると、$H_0$ の下で

$$
X_{ij}\mid M_{ij}
\sim\operatorname{Binomial}(M_{ij},1/2)
$$

となることを示し、この見方と対称性検定の関係を説明せよ。

## 解答

### 1. 制約なしMLE

多項分布の通常のMLEより

$$
\boxed{
\widehat p_{ij}=\frac{X_{ij}}{N}
}.
$$

### 2. 対称性制約下のMLE

対角セル $p_{ii}$ には追加制約がないので

$$
\boxed{
\widetilde p_{ii}=\frac{X_{ii}}N
}.
$$

$i<j$ の非対角ペアでは

$$
p_{ij}=p_{ji}=q_{ij}
$$

とおく。

そのペアが対数尤度へ寄与する部分は

$$
X_{ij}\log q_{ij}
+
X_{ji}\log q_{ij}
=
(X_{ij}+X_{ji})\log q_{ij}.
$$

対称性の下ではペア合計確率は $2q_{ij}$ であり、観測ペア合計は $X_{ij}+X_{ji}$。

したがって

$$
2\widetilde q_{ij}
=\frac{X_{ij}+X_{ji}}N
$$

なので

$$
\boxed{
\widetilde p_{ij}
=\widetilde p_{ji}
=
\frac{X_{ij}+X_{ji}}{2N}
\qquad(i<j)
}.
$$

### 3. 尤度比統計量

多項係数は分子分母で消える。

対角セルでは制約付きMLEと制約なしMLEが同じなので寄与は0。

非対角セルについて

$$
G^2
=2\sum_{i\ne j}
X_{ij}
\log
\frac{X_{ij}/N}
{(X_{ij}+X_{ji})/(2N)}.
$$

したがって

$$
\boxed{
G^2
=2\sum_{i\ne j}
X_{ij}
\log
\frac{2X_{ij}}{X_{ij}+X_{ji}}
}.
$$

ペアごとにまとめれば

$$
\boxed{
G^2
=2\sum_{i<j}
\left[
X_{ij}\log\frac{2X_{ij}}{X_{ij}+X_{ji}}
+
X_{ji}\log\frac{2X_{ji}}{X_{ij}+X_{ji}}
\right]
}.
$$

### 4. 自由度

制約なしの $I\times I$ 多項モデルでは

$$
I^2-1
$$

個の自由母数がある。

対称性仮説は各非対角ペア $i<j$ に対して

$$
p_{ij}=p_{ji}
$$

という独立な制約を1本ずつ課す。

その本数は

$$
\binom I2
=\frac{I(I-1)}2.
$$

よってWilks型の漸近結果により

$$
\boxed{
G^2
\xrightarrow{d}
\chi^2_{I(I-1)/2}
}.
$$

### 5. 条件付き二項分布として見る

固定した $i<j$ を考える。

多項分布の性質より、

$$
M_{ij}=X_{ij}+X_{ji}=m
$$

と条件付けたとき

$$
X_{ij}\mid M_{ij}=m
\sim
\operatorname{Binomial}
\left(
 m,
\frac{p_{ij}}{p_{ij}+p_{ji}}
\right).
$$

$H_0$ では $p_{ij}=p_{ji}$ だから

$$
\frac{p_{ij}}{p_{ij}+p_{ji}}
=\frac12.
$$

したがって

$$
\boxed{
X_{ij}\mid M_{ij}
\sim\operatorname{Binomial}(M_{ij},1/2)
}.
$$

つまり対称性仮説は、各非対角ペア内で「上三角側と下三角側に半々で入る」という仮説と解釈できる。

大標本LRTは、これらのペアごとの不均衡をまとめて測っている。

小標本では、各ペアを条件付き二項分布として正確に扱う発想も重要である。

## 本番答案の芯

$$
\widehat p_{ij}=\frac{X_{ij}}N,
$$

$$
\widetilde p_{ii}=\frac{X_{ii}}N,
\qquad
\widetilde p_{ij}=\widetilde p_{ji}
=\frac{X_{ij}+X_{ji}}{2N}.
$$

したがって

$$
G^2
=2\sum_{i<j}
\left[
X_{ij}\log\frac{2X_{ij}}{X_{ij}+X_{ji}}
+
X_{ji}\log\frac{2X_{ji}}{X_{ij}+X_{ji}}
\right].
$$

制約本数は非対角ペア数

$$
\binom I2
$$

だから

$$
G^2\xrightarrow{d}\chi^2_{I(I-1)/2}.
$$

## 典型的な落とし穴

- $H_0$ 下MLEを $X_{ij}/N$ のままにする。対称制約により $ij$ と $ji$ をプールする必要がある。
- 自由度を $I^2-1$ とする。LRTの自由度は「対立モデルと帰無モデルの自由母数差」。
- 対角セルまで対称性制約の自由度に数える。$p_{ii}=p_{ii}$ は恒等式であり制約ではない。

---

# 6位以下の位置づけ

## 6位: 2013 問4 順序統計量による独自検定

標準的な検定名に頼らず、与えられた統計量の帰無分布を導出して臨界値を作る訓練として非常に良い。一方、上位5題に比べるとモデル横断の再利用性はやや低い。

## 7位: 2014 問5 適合度検定・尤度比検定

重要論点だが、1位の2013問5で多項分布MLE、LRT、Pearson適合度、漸近カイ二乗までまとめて練習できる。したがって追加1題としての限界価値は下がる。

## 8位: 2019 問4 Cauchy分布・最強力検定

Neyman–Pearson補題を非正規分布へ適用する良問。ただしCauchy密度の尤度比の形を読む作業が中心になりやすく、検定理論の総合演習としては上位より狭い。

---

# 5題を通した横断整理

| 論点 | 1位 | 2位 | 3位 | 4位 | 5位 |
|---|:---:|:---:|:---:|:---:|:---:|
| Neyman–Pearson |  | ◎ |  |  |  |
| UMP |  | ◎ |  |  |  |
| UMPU |  |  | ◎ |  |  |
| LRT | ◎ |  |  |  | ◎ |
| Pearson $\chi^2$ | ◎ |  |  |  |  |
| Wilks型自由度 | ◎ |  |  |  | ◎ |
| F検定 |  |  |  | ◎ |  |
| 非心分布・検出力 |  | ○ | ○ | ◎ |  |
| 制約付きMLE | ◎ |  |  |  | ◎ |
| 線形モデル |  |  |  | ◎ |  |
| 漸近展開 | ◎ |  |  |  |  |

## 推奨周回順

初回はランキング順よりも

$$
\boxed{2\to3\to1\to5\to4}
$$

の順が理解しやすい。

- 2位で「最強力・UMP」の片側検定を固める。
- 3位で「両側ではUMPが壊れる → UMPU」を理解する。
- 1位でLRTとPearson検定の漸近理論へ進む。
- 5位で制約付きMLEを含む分割表LRTへ一般化する。
- 4位で線形モデル・F検定・非心度・実験設計比較まで広げる。

実戦直前の再演習価値としては、1位と2位を最優先し、3位を理論確認用、4位・5位を総合問題用として回す。

# 参照

- Academaid「統計検定1級 過去問解答解説目次」
- Academaid「2013年統計検定1級＜数理統計問5＞」
- Academaid「2015年統計検定1級＜統計数理2＞」
- Academaid「2012年統計検定1級＜数理統計問4＞」
- Academaid「2014年統計検定1級＜統計数理4＞」
- Academaid「2015年統計検定1級＜統計数理4＞」

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは公開されたテーマ・解説をもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
