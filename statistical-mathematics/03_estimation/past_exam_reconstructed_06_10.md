# 推定分野 過去問型再構成演習 6位〜10位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧をもとに、推定分野の演習価値ランキング6位〜10位を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・設問順・数値・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | 元難度 | 再構成Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|:---:|---:|---|
| 6 | 2018 問1 | $\chi^2$ 分布と母標準偏差 | A | C | 25分 | 標本分散、$\chi^2$ ピボット、厳密信頼区間 |
| 7 | 2015 問1 | モーメントと推定量比較 | B | C | 25分 | モーメント法、LLN、Delta法、漸近分散比較 |
| 8 | 2013 問3 | 二項分布の推定量・被覆確率 | B | C | 標本比率、Wald区間、正規近似、正確な被覆確率 |
| 9 | 2014 問3 | $t$ 分布と信頼区間 | B | C | Student化、$t$ ピボット、平均の厳密区間 |
| 10 | 2021 問3 | Poisson母数のMLE・信頼区間 | B | C | MLE、Fisher情報量、Wald区間、正確Poisson区間 |

---

## 6位: 2018 問1型 $\chi^2$ 分布から母分散・母標準偏差の厳密信頼区間を作る

- 安定ID: `RECON-EST-R06-2018-Q1`
- 参照: 2018年 問1
- 確度: `third_party_topic_index`
- 元主題: $\chi^2$ 分布と母標準偏差、推定・区間
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 不偏標本分散、最尤推定、Cochranの定理、$\chi^2$ ピボット、信頼区間
- 変更点: 母分散と母標準偏差の区間を両方導出し、MLEとの違いも確認する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim N(\mu,\sigma^2),
\qquad \mu\in\mathbb R,\ \sigma^2>0
$$

に従うとする。$\mu,\sigma^2$ はともに未知とし、

$$
\overline X=\frac1n\sum_{i=1}^nX_i,
\qquad
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2
$$

と定める。

1. $E[S^2]$ を答えよ。また $\sigma^2$ のMLEを $S^2$ を用いて表せ。
2. 統計量

$$
Q=\frac{(n-1)S^2}{\sigma^2}
$$

の分布を答えよ。
3. $0<\alpha<1$ とし、$\chi^2_{\nu,p}$ を自由度 $\nu$ の $\chi^2$ 分布の下側 $p$ 分位点とする。$\sigma^2$ の信頼係数 $1-\alpha$ の両側信頼区間を導け。
4. $\sigma$ の信頼係数 $1-\alpha$ の両側信頼区間を求めよ。
5. $n=16$、観測された標本標準偏差が $s=4$ であった。$\chi^2_{15,0.025}=6.262$、$\chi^2_{15,0.975}=27.488$ として、$\sigma^2$ と $\sigma$ の95%信頼区間を数値で求めよ。

### 解答

#### 1. 不偏標本分散とMLE

正規分布に限らず、独立同分布標本について

$$
E[S^2]=\sigma^2.
$$

したがって

$$
\boxed{S^2\text{ は }\sigma^2\text{ の不偏推定量}}
$$

である。

一方、正規モデルの尤度を $\mu$ について最大化すると $\widehat\mu=\overline X$。これを代入したとき、$\sigma^2$ のMLEは

$$
\widehat{\sigma^2}_{\mathrm{ML}}
=\frac1n\sum_{i=1}^n(X_i-\overline X)^2.
$$

したがって

$$
\boxed{
\widehat{\sigma^2}_{\mathrm{ML}}
=\frac{n-1}{n}S^2
}.
$$

よって $S^2$ とMLEは同じではない。

#### 2. $\chi^2$ ピボット

正規標本ではCochranの定理により

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}
}.
$$

ここで自由度が $n$ ではなく $n-1$ なのは、$\mu$ を $\overline X$ で推定したため1自由度を消費しているからである。

#### 3. $\sigma^2$ の信頼区間

自由度 $n-1$ の $\chi^2$ 分布について

$$
P\left(
\chi^2_{n-1,\alpha/2}
\le
\frac{(n-1)S^2}{\sigma^2}
\le
\chi^2_{n-1,1-\alpha/2}
\right)
=1-\alpha.
$$

すべて正なので逆数を取ると不等号の向きが反転する。

$$
P\left(
\frac1{\chi^2_{n-1,1-\alpha/2}}
\le
\frac{\sigma^2}{(n-1)S^2}
\le
\frac1{\chi^2_{n-1,\alpha/2}}
\right)
=1-\alpha.
$$

したがって

$$
\boxed{
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
\le
\sigma^2
\le
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
}.
$$

#### 4. $\sigma$ の信頼区間

$\sigma>0$ なので、前問の両端の正の平方根を取ればよい。

$$
\boxed{
\sqrt{
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}
}
\le
\sigma
\le
\sqrt{
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
}
}.
$$

#### 5. 数値計算

$n=16$、$s=4$ なので

$$
(n-1)s^2
=15\times16
=240.
$$

母分散について

$$
\frac{240}{27.488}
\le\sigma^2\le
\frac{240}{6.262}.
$$

よって

$$
\boxed{
8.73\lesssim\sigma^2\lesssim38.33
}.
$$

平方根を取ると

$$
\boxed{
2.95\lesssim\sigma\lesssim6.19
}.
$$

### 本番答案

正規標本では

$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$

したがって

$$
P\left(
\chi^2_{n-1,\alpha/2}
\le
\frac{(n-1)S^2}{\sigma^2}
\le
\chi^2_{n-1,1-\alpha/2}
\right)=1-\alpha
$$

を $\sigma^2$ について解いて

$$
\boxed{
\left[
\frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}},
\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
\right]
}
$$

を得る。$\sigma$ の区間は両端の平方根を取る。

### 25分経過時の打ち切り判断

最優先は $Q=(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ を書くこと。逆数を取る際の不等号反転さえ間違えなければ大部分を回収できる。

### 採点基準（20点目安）

- $S^2$ とMLEの区別: 3点
- $\chi^2$ ピボット: 5点
- $\sigma^2$ の区間導出: 6点
- $\sigma$ の区間: 2点
- 数値計算: 4点

### 持ち帰るパターン

- 平均未知の正規標本では自由度は $n-1$。
- 母分散の厳密区間は $\chi^2$ ピボットから作る。
- 分散の区間を標準偏差へ変換するときは平方根を取るだけ。
- 不偏標本分散 $S^2$ と分散MLE $(n-1)S^2/n$ を混同しない。

---

## 7位: 2015 問1型 1次・2次モーメントから作った推定量を漸近分散で比較する

- 安定ID: `RECON-EST-R07-2015-Q1`
- 参照: 2015年 問1
- 確度: `third_party_topic_index`
- 元主題: モーメントと推定量、推定量比較
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: モーメント法、指数分布、最尤推定、弱大数の法則、中心極限定理、Delta法、漸近効率
- 変更点: 同じ母数を1次モーメントと2次モーメントから推定し、情報の使い方による漸近分散差を比較する問題にした。

### 問題

$X_1,\ldots,X_n$ は独立に平均母数 $\theta>0$ の指数分布

$$
f(x\mid\theta)=\frac1\theta e^{-x/\theta},
\qquad x\ge0
$$

に従うとする。

1. 一般の正整数 $k$ について

$$
E[X^k]=k!\theta^k
$$

を示せ。特に $E[X]$、$E[X^2]$、$E[X^4]$ を求めよ。
2. 1次モーメントと2次モーメントから、それぞれ

$$
\widehat\theta_1=\overline X,
\qquad
\widehat\theta_2=\sqrt{\frac1{2n}\sum_{i=1}^nX_i^2}
$$

を得ることを確認せよ。
3. $\widehat\theta_1$ が不偏かつ一致であり、

$$
\sqrt n(\widehat\theta_1-\theta)
$$

の極限分布を求めよ。
4. $\widehat\theta_2$ が一致推定量であることを示し、Delta法を用いて

$$
\sqrt n(\widehat\theta_2-\theta)
$$

の極限分布を求めよ。
5. 2つの推定量の漸近分散を比較せよ。また $\theta$ のMLEを求め、どちらと一致するか答えよ。

### 解答

#### 1. 指数分布のモーメント

$$
\begin{aligned}
E[X^k]
&=\int_0^\infty x^k\frac1\theta e^{-x/\theta}\,dx.
\end{aligned}
$$

$u=x/\theta$ とおくと $x=\theta u$、$dx=\theta du$ なので

$$
\begin{aligned}
E[X^k]
&=\int_0^\infty
(\theta u)^k\frac1\theta e^{-u}\theta\,du\\
&=\theta^k\int_0^\infty u^ke^{-u}\,du\\
&=\theta^k\Gamma(k+1)\\
&=k!\theta^k.
\end{aligned}
$$

したがって

$$
\boxed{E[X]=\theta},
$$

$$
\boxed{E[X^2]=2\theta^2},
$$

$$
\boxed{E[X^4]=24\theta^4}.
$$

また

$$
\operatorname{Var}(X)
=E[X^2]-E[X]^2
=\theta^2.
$$

#### 2. モーメント法推定量

1次標本モーメントを母1次モーメントに合わせると

$$
\overline X=\theta
$$

より

$$
\boxed{\widehat\theta_1=\overline X}.
$$

2次標本モーメントを母2次モーメントに合わせると

$$
\frac1n\sum_{i=1}^nX_i^2
=2\theta^2.
$$

$\theta>0$ なので

$$
\boxed{
\widehat\theta_2
=\sqrt{
\frac1{2n}\sum_{i=1}^nX_i^2
}
}.
$$

#### 3. $\widehat\theta_1$ の性質

$$
E[\widehat\theta_1]
=E[\overline X]
=\theta
$$

なので不偏。

また

$$
\operatorname{Var}(\widehat\theta_1)
=\frac{\theta^2}{n}\to0
$$

なので、例えばChebyshevの不等式から

$$
\widehat\theta_1\xrightarrow{p}\theta.
$$

中心極限定理より

$$
\boxed{
\sqrt n(\widehat\theta_1-\theta)
\xrightarrow{d}
N(0,\theta^2)
}.
$$

#### 4. $\widehat\theta_2$ の一致性と漸近分布

$$
Y_i=X_i^2
$$

とおく。

$$
E[Y_i]=2\theta^2.
$$

弱大数の法則より

$$
\overline Y
=\frac1n\sum X_i^2
\xrightarrow{p}2\theta^2.
$$

関数

$$
g(y)=\sqrt{\frac y2}
$$

は $y>0$ で連続なので、連続写像定理より

$$
\widehat\theta_2
=g(\overline Y)
\xrightarrow{p}
\theta.
$$

したがって $\widehat\theta_2$ も一致推定量である。

次に

$$
\begin{aligned}
\operatorname{Var}(Y_i)
&=E[X_i^4]-E[X_i^2]^2\\
&=24\theta^4-(2\theta^2)^2\\
&=20\theta^4.
\end{aligned}
$$

中心極限定理より

$$
\sqrt n(\overline Y-2\theta^2)
\xrightarrow{d}
N(0,20\theta^4).
$$

また

$$
g'(y)=\frac1{2\sqrt{2y}}.
$$

したがって

$$
g'(2\theta^2)
=\frac1{4\theta}.
$$

Delta法より

$$
\sqrt n(\widehat\theta_2-\theta)
\xrightarrow{d}
N\left(
0,
\left(\frac1{4\theta}\right)^2
20\theta^4
\right).
$$

よって

$$
\boxed{
\sqrt n(\widehat\theta_2-\theta)
\xrightarrow{d}
N\left(0,\frac54\theta^2\right)
}.
$$

#### 5. 漸近分散比較とMLE

$\widehat\theta_1$ の漸近分散は

$$
\frac{\theta^2}{n}.
$$

$\widehat\theta_2$ の漸近分散は

$$
\frac{5\theta^2}{4n}.
$$

したがって

$$
\boxed{
\operatorname{Avar}(\widehat\theta_1)
<
\operatorname{Avar}(\widehat\theta_2)
}.
$$

$\widehat\theta_2$ に対する $\widehat\theta_1$ の漸近相対効率を

$$
\frac{\operatorname{Avar}(\widehat\theta_1)}
{\operatorname{Avar}(\widehat\theta_2)}
$$

と定義すれば

$$
\boxed{\frac45}.
$$

尤度は

$$
L(\theta)
=\theta^{-n}
\exp\left(-\frac1\theta\sum X_i\right).
$$

対数尤度を微分すると

$$
\frac{d\ell}{d\theta}
=-\frac n\theta+
\frac{\sum X_i}{\theta^2}.
$$

これを $0$ とすると

$$
\boxed{
\widehat\theta_{\mathrm{ML}}=\overline X=\widehat\theta_1
}.
$$

すなわちこの場合、1次モーメント法推定量はMLEとも一致し、2次モーメントだけを使う推定量より漸近分散が小さい。

### 本番答案

指数分布では $E[X^k]=k!\theta^k$。したがって

$$
\widehat\theta_1=\overline X,
\qquad
\widehat\theta_2=\sqrt{\overline{X^2}/2}.
$$

CLTより

$$
\sqrt n(\widehat\theta_1-\theta)
\xrightarrow{d}N(0,\theta^2).
$$

一方 $Y=X^2$ とおくと

$$
E[Y]=2\theta^2,
\qquad
V[Y]=20\theta^4.
$$

$g(y)=\sqrt{y/2}$ にDelta法を用いて

$$
\sqrt n(\widehat\theta_2-\theta)
\xrightarrow{d}
N\left(0,\frac54\theta^2\right).
$$

よって $\widehat\theta_1$ の方が漸近分散が小さく、実際に $\widehat\theta_1$ はMLEでもある。

### 25分経過時の打ち切り判断

$E[X^2]$ と $E[X^4]$ が出れば後半はDelta法の型。$g'(2\theta^2)=1/(4\theta)$ を正しく計算できれば十分に得点できる。

### 採点基準（20点目安）

- モーメント計算: 4点
- 2種類の推定量: 3点
- $\widehat\theta_1$ の性質: 4点
- $\widehat\theta_2$ のDelta法: 6点
- 効率比較・MLE: 3点

### 持ち帰るパターン

- モーメント法は「どのモーメントを使うか」で精度が変わる。
- 高次モーメントを使えば情報が増えるとは限らない。
- $h(\overline Y)$ 型推定量はLLN＋Delta法で処理する。
- MLEとモーメント法が一致する典型例も多い。

---

## 8位: 2013 問3型 二項比率のWald区間と実際の被覆確率を比較する

- 安定ID: `RECON-EST-R08-2013-Q3`
- 参照: 2013年 問3
- 確度: `third_party_topic_index`
- 元主題: 二項分布、推定量、被覆確率
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 二項分布、標本比率、中心極限定理、Wald区間、被覆確率、離散分布の正確計算
- 変更点: 「95%信頼区間」の意味を実際の被覆確率関数で確認する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\operatorname{Bernoulli}(p),
\qquad 0<p<1
$$

に従うとする。

$$
S=\sum_{i=1}^nX_i,
\qquad
\widehat p=\frac Sn
$$

とおく。

1. $E[\widehat p]$ と $\operatorname{Var}(\widehat p)$ を求めよ。
2. 中心極限定理を用いて $\widehat p$ の漸近分布を求めよ。
3. 標準正規分布の上側 $\alpha/2$ 点を $z_{1-\alpha/2}$ とする。プラグイン標準誤差を用いたWald型信頼区間

$$
I_W(S)=
\left[
\widehat p-z_{1-\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}n},
\widehat p+z_{1-\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}n}
\right]
$$

を導け。
4. 真の母数を $p$ としたときの、この区間の正確な被覆確率を有限和で表せ。
5. $n=20$、$p=0.1$、$z_{0.975}=1.96$ とする。区間を $[0,1]$ に切り詰めるものとする。このとき $I_W(S)$ が $p=0.1$ を含むのは $S=1,2,3,4,5,6$ の場合であるとしてよい。正確な被覆確率を求め、名目95%と比較せよ。

### 解答

#### 1. 標本比率の平均と分散

$S\sim\operatorname{Bin}(n,p)$ なので

$$
E[S]=np,
\qquad
V[S]=np(1-p).
$$

したがって

$$
\boxed{E[\widehat p]=p}
$$

であり、$\widehat p$ は不偏推定量。

また

$$
\boxed{
V[\widehat p]
=\frac{p(1-p)}n
}.
$$

#### 2. 漸近分布

Bernoulli変数の平均が $\widehat p$ なので、中心極限定理より

$$
\boxed{
\sqrt n(\widehat p-p)
\xrightarrow{d}
N(0,p(1-p))
}.
$$

同値に

$$
\frac{\widehat p-p}
{\sqrt{p(1-p)/n}}
\xrightarrow{d}N(0,1).
$$

#### 3. Wald型区間

大標本で

$$
P\left(
-z_{1-\alpha/2}
\le
\frac{\widehat p-p}{\sqrt{p(1-p)/n}}
\le
z_{1-\alpha/2}
\right)
\approx1-\alpha.
$$

未知の $p$ を標準誤差内で $\widehat p$ に置き換えると

$$
P\left(
|\widehat p-p|
\le
z_{1-\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}n}
\right)
\approx1-\alpha.
$$

したがって

$$
\boxed{
I_W(S)=
\left[
\widehat p-z_{1-\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}n},
\widehat p+z_{1-\alpha/2}
\sqrt{\frac{\widehat p(1-\widehat p)}n}
\right]
}.
$$

ただしこれは厳密区間ではなく、正規近似に基づく近似区間である。

#### 4. 正確な被覆確率

被覆確率は

$$
C_n(p)=P_p\{p\in I_W(S)\}.
$$

$S$ は $0,1,\ldots,n$ の離散値を取るので

$$
\boxed{
C_n(p)
=
\sum_{s=0}^n
\mathbf1\{p\in I_W(s)\}
{n\choose s}p^s(1-p)^{n-s}
}.
$$

重要なのは

$$
C_n(p)=1-\alpha
$$

が有限標本で常に成り立つわけではないこと。

二項分布は離散的であり、さらにWald区間は正規近似とプラグイン標準誤差を使っているため、実際の被覆確率は $p$ に依存して上下する。

#### 5. $n=20,p=0.1$ の正確な被覆確率

仮定より $p=0.1$ を含むのは $S=1,\ldots,6$ のとき。

したがって

$$
\begin{aligned}
C_{20}(0.1)
&=\sum_{s=1}^{6}
{20\choose s}(0.1)^s(0.9)^{20-s}\\
&\approx0.8760.
\end{aligned}
$$

よって

$$
\boxed{C_{20}(0.1)\approx87.6\%}.
$$

名目95%に対して実際はかなり低い。

$$
\boxed{
87.6\%<95\%
}.
$$

これは $p$ が0に近いとき、$np$ が小さく正規近似が悪くなりやすいこと、さらに $S=0$ ではWald区間の推定標準誤差が0になってしまうことと関係している。

### 本番答案

$$
\widehat p=S/n,
\qquad
E[\widehat p]=p,
\qquad
V[\widehat p]=p(1-p)/n.
$$

CLTより

$$
\frac{\widehat p-p}{\sqrt{p(1-p)/n}}
\xrightarrow{d}N(0,1).
$$

$p$ を $\widehat p$ に置き換えてWald区間を得る。

有限標本での正確な被覆確率は

$$
C_n(p)
=\sum_{s=0}^n
\mathbf1\{p\in I_W(s)\}
{n\choose s}p^s(1-p)^{n-s}.
$$

したがって「95%区間」は各 $p$ で正確に95%覆うという意味ではなく、Wald区間では特に端点近くで被覆不足が起こりうる。

### 25分経過時の打ち切り判断

式

$$
C_n(p)=\sum_s\mathbf1\{p\in I(s)\}P_p(S=s)
$$

を書ければ被覆確率の本質は取れている。数値和は最後に回す。

### 採点基準（20点目安）

- 標本比率の平均・分散: 3点
- CLT: 4点
- Wald区間: 4点
- 被覆確率の有限和: 5点
- 数値評価と解釈: 4点

### 持ち帰るパターン

- 信頼係数は「観測後の母数の確率」ではない。
- 被覆確率は、標本を繰り返したとき区間が真値を含む確率。
- 離散分布では被覆確率が母数に対してギザギザに変化する。
- Wald区間は $p$ が0や1に近いと被覆不足を起こしやすい。

---

## 9位: 2014 問3型 $t$ 分布を使って平均の厳密信頼区間を作る

- 安定ID: `RECON-EST-R09-2014-Q3`
- 参照: 2014年 問3
- 確度: `third_party_topic_index`
- 元主題: $t$ 分布、信頼区間
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: 正規標本、標本平均、不偏標本分散、独立性、Studentの $t$ 分布、厳密信頼区間
- 変更点: 分散既知の $z$ 区間との違いも比較する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim N(\mu,\sigma^2)
$$

に従い、$\mu,\sigma^2$ はともに未知とする。

$$
\overline X=\frac1n\sum X_i,
\qquad
S^2=\frac1{n-1}\sum(X_i-\overline X)^2
$$

とする。

1. $\overline X$ の分布と $(n-1)S^2/\sigma^2$ の分布を答えよ。また正規標本では両者が独立であることを用いてよい。
2. 統計量

$$
T=\frac{\overline X-\mu}{S/\sqrt n}
$$

が自由度 $n-1$ の $t$ 分布に従うことを示せ。
3. $\mu$ の信頼係数 $1-\alpha$ の両側信頼区間を導け。
4. $n=10$、$\overline x=12.4$、$s=2.1$、$t_{9,0.975}=2.262$ として95%信頼区間を求めよ。
5. もし $\sigma=2.1$ が既知だったなら $z_{0.975}=1.96$ を用いる区間はどうなるか。幅を比較し、その理由を説明せよ。

### 解答

#### 1. 標本平均と標本分散

正規標本より

$$
\boxed{
\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right)
}.
$$

したがって

$$
Z=\frac{\overline X-\mu}{\sigma/\sqrt n}
\sim N(0,1).
$$

また

$$
\boxed{
U=\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}
}.
$$

正規標本では $\overline X$ と $S^2$ は独立なので、$Z$ と $U$ も独立である。

#### 2. Student化

$t$ 分布の定義より、

$$
Z\sim N(0,1),
\qquad
U\sim\chi^2_\nu,
\qquad
Z\perp U
$$

なら

$$
\frac{Z}{\sqrt{U/\nu}}\sim t_\nu.
$$

ここで $\nu=n-1$ とすると

$$
\begin{aligned}
\frac{Z}{\sqrt{U/(n-1)}}
&=
\frac{(\overline X-\mu)/(\sigma/\sqrt n)}
{\sqrt{[(n-1)S^2/\sigma^2]/(n-1)}}\\
&=
\frac{(\overline X-\mu)/(\sigma/\sqrt n)}{S/\sigma}\\
&=
\frac{\overline X-\mu}{S/\sqrt n}.
\end{aligned}
$$

したがって

$$
\boxed{
T=\frac{\overline X-\mu}{S/\sqrt n}
\sim t_{n-1}
}.
$$

#### 3. $\mu$ の厳密信頼区間

$t_{\nu,p}$ を自由度 $\nu$ の $t$ 分布の下側 $p$ 分位点とする。

対称性より

$$
P\left(
-t_{n-1,1-\alpha/2}
\le T\le
 t_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

$T$ を代入して $\mu$ について解くと

$$
\boxed{
\overline X
-t_{n-1,1-\alpha/2}\frac S{\sqrt n}
\le\mu\le
\overline X
+t_{n-1,1-\alpha/2}\frac S{\sqrt n}
}.
$$

これは正規母集団を仮定した有限標本での厳密区間である。

#### 4. 数値計算

誤差幅は

$$
2.262\frac{2.1}{\sqrt{10}}
\approx1.502.
$$

したがって

$$
12.4-1.502
\le\mu\le
12.4+1.502.
$$

よって

$$
\boxed{
10.90\lesssim\mu\lesssim13.90
}.
$$

#### 5. 分散既知の場合との比較

$\sigma=2.1$ が既知なら

$$
\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1)
$$

を使うので95%区間は

$$
\overline X\pm1.96\frac\sigma{\sqrt n}.
$$

誤差幅は

$$
1.96\frac{2.1}{\sqrt{10}}
\approx1.302.
$$

したがって

$$
\boxed{
11.10\lesssim\mu\lesssim13.70
}.
$$

$t$ 区間の方が広い。

$$
2.262>1.96
$$

となるのは、未知の $\sigma$ を $S$ で推定した追加的不確実性を $t$ 分布の厚い裾で反映するためである。

### 本番答案

正規標本では

$$
Z=\frac{\overline X-\mu}{\sigma/\sqrt n}\sim N(0,1),
$$

$$
U=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$

かつ $Z\perp U$。よって

$$
\frac{Z}{\sqrt{U/(n-1)}}
=
\frac{\overline X-\mu}{S/\sqrt n}
\sim t_{n-1}.
$$

したがって

$$
\boxed{
\mu\in
\left[
\overline X-t_{n-1,1-\alpha/2}\frac S{\sqrt n},
\overline X+t_{n-1,1-\alpha/2}\frac S{\sqrt n}
\right]
}.
$$

### 25分経過時の打ち切り判断

$t$ 分布の定義

$$
Z/\sqrt{U/\nu}
$$

まで書ければ誘導はほぼ完成。数値計算よりも、$Z$ と $U$ の独立性を明示する方が重要。

### 採点基準（20点目安）

- $\overline X$ と $S^2$ の分布: 4点
- $t$ 分布の導出: 6点
- 信頼区間: 5点
- 数値計算: 3点
- $z$ 区間との比較: 2点

### 持ち帰るパターン

- 分散未知の正規平均は $t$ 分布。
- $t$ 分布は「標準正規÷独立な $\chi^2$ の平方根」で作る。
- 自由度は標本分散と同じ $n-1$。
- 分散既知なら $z$、未知なら $t$。

---

## 10位: 2021 問3型 Poisson母数のMLEからWald区間と正確区間へ進む

- 安定ID: `RECON-EST-R10-2021-Q3`
- 参照: 2021年 問3
- 確度: `third_party_topic_index`
- 元主題: Poisson母数、MLE、信頼区間
- Level: C
- 目安時間: 25分
- 計算量: 中
- 主な使用技術: Poisson再生性、MLE、Fisher情報量、漸近正規性、Wald区間、Poissonの正確信頼区間
- 変更点: 大標本近似区間と離散分布に基づく正確区間を並べて比較する構成にした。

### 問題

$X_1,\ldots,X_n$ は独立に

$$
X_i\sim\operatorname{Poisson}(\lambda),
\qquad \lambda>0
$$

に従うとする。

$$
S=\sum_{i=1}^nX_i
$$

とおく。

1. $S$ の分布を求め、$\lambda$ のMLE $\widehat\lambda$ を求めよ。
2. $E[\widehat\lambda]$ と $V[\widehat\lambda]$ を求めよ。
3. 標本全体のFisher情報量 $I_n(\lambda)$ を求め、MLEの分散と比較せよ。
4. MLEの漸近正規性から、$\lambda$ の信頼係数 $1-\alpha$ のWald型信頼区間を求めよ。
5. Poisson平均 $\mu$ の正確な両側信頼区間として、観測度数 $s>0$ に対し

$$
\left[
\frac12\chi^2_{2s,\alpha/2},
\frac12\chi^2_{2(s+1),1-\alpha/2}
\right]
$$

を用いてよい。これを使って $\lambda$ の正確区間を表せ。$s=0$ のときの下限は0とする。
6. $n=20$、$s=30$ とする。Wald型95%信頼区間を $z_{0.975}=1.96$ で数値計算せよ。

### 解答

#### 1. $S$ の分布とMLE

Poisson分布は独立和に対して再生性を持つので

$$
\boxed{
S\sim\operatorname{Poisson}(n\lambda)
}.
$$

尤度は

$$
\begin{aligned}
L(\lambda)
&=\prod_{i=1}^n
\frac{e^{-\lambda}\lambda^{x_i}}{x_i!}\\
&=\frac{e^{-n\lambda}\lambda^S}{\prod x_i!}.
\end{aligned}
$$

対数尤度は定数項を除いて

$$
\ell(\lambda)
=-n\lambda+S\log\lambda.
$$

微分すると

$$
\ell'(\lambda)
=-n+\frac S\lambda.
$$

したがって

$$
\boxed{
\widehat\lambda
=\frac Sn
=\overline X
}.
$$

#### 2. 平均と分散

$E[S]=n\lambda$、$V[S]=n\lambda$ なので

$$
\boxed{
E[\widehat\lambda]=\lambda
}.
$$

よってMLEは不偏。

また

$$
\boxed{
V[\widehat\lambda]
=\frac\lambda n
}.
$$

#### 3. Fisher情報量

1標本の対数尤度は

$$
\ell_i(\lambda)
=-\lambda+X_i\log\lambda-\log(X_i!).
$$

2階微分は

$$
\ell_i''(\lambda)
=-\frac{X_i}{\lambda^2}.
$$

したがって

$$
\begin{aligned}
I_1(\lambda)
&=-E[\ell_i''(\lambda)]\\
&=\frac{E[X_i]}{\lambda^2}\\
&=\frac1\lambda.
\end{aligned}
$$

よって

$$
\boxed{
I_n(\lambda)=\frac n\lambda
}.
$$

したがって

$$
\boxed{
I_n(\lambda)^{-1}
=\frac\lambda n
=V[\widehat\lambda]
}.
$$

このモデルではMLEは有限標本ですでに不偏で、Cramér–Rao下限を達成している。

#### 4. Wald型信頼区間

MLEの漸近分布は

$$
\sqrt n(\widehat\lambda-\lambda)
\xrightarrow{d}N(0,\lambda).
$$

したがって

$$
\widehat\lambda
\approx
N\left(\lambda,\frac\lambda n\right).
$$

未知の $\lambda$ を標準誤差内で $\widehat\lambda$ に置き換えると

$$
\operatorname{SE}(\widehat\lambda)
\approx
\sqrt{\frac{\widehat\lambda}{n}}.
$$

よってWald区間は

$$
\boxed{
\widehat\lambda
\pm
z_{1-\alpha/2}
\sqrt{\frac{\widehat\lambda}{n}}
}.
$$

Poisson母数は非負なので、実務上は負の下限が出た場合に0へ切り上げることもある。ただしその操作をしてもWald区間が厳密区間になるわけではない。

#### 5. 正確Poisson区間

$S\sim\operatorname{Poisson}(n\lambda)$ なので

$$
\mu=n\lambda
$$

とおく。

与えられた正確区間より

$$
P\left(
\frac12\chi^2_{2S,\alpha/2}
\le n\lambda\le
\frac12\chi^2_{2(S+1),1-\alpha/2}
\right)
\ge1-\alpha
$$

という被覆を持つ区間を得る。

$n$ で割れば

$$
\boxed{
\lambda\in
\left[
\frac{\chi^2_{2s,\alpha/2}}{2n},
\frac{\chi^2_{2(s+1),1-\alpha/2}}{2n}
\right]
\qquad(s>0)
}.
$$

$s=0$ では

$$
\boxed{
\lambda_L=0,
\qquad
\lambda_U=\frac{\chi^2_{2,1-\alpha/2}}{2n}
}.
$$

離散分布なので、通常は被覆確率が名目値を少し上回る保守的な区間になる。

#### 6. Wald型95%区間の数値計算

$n=20$、$s=30$ なので

$$
\widehat\lambda
=\frac{30}{20}
=1.5.
$$

推定標準誤差は

$$
\sqrt{\frac{1.5}{20}}
=\sqrt{0.075}
\approx0.2739.
$$

したがって誤差幅は

$$
1.96\times0.2739
\approx0.537.
$$

よって

$$
\boxed{
0.963\lesssim\lambda\lesssim2.037
}.
$$

### 本番答案

Poisson再生性より

$$
S\sim\operatorname{Poisson}(n\lambda).
$$

尤度を最大化すると

$$
\widehat\lambda=S/n=\overline X.
$$

また

$$
E[\widehat\lambda]=\lambda,
\qquad
V[\widehat\lambda]=\lambda/n.
$$

Fisher情報量は

$$
I_n(\lambda)=n/\lambda
$$

なので $I_n^{-1}=\lambda/n$ とMLEの分散に一致する。

Wald区間は

$$
\boxed{
\widehat\lambda
\pm z_{1-\alpha/2}
\sqrt{\widehat\lambda/n}
}.
$$

正確区間は $S\sim\operatorname{Poisson}(n\lambda)$ に対するPoisson平均の区間を $n$ で割って

$$
\boxed{
\left[
\frac{\chi^2_{2s,\alpha/2}}{2n},
\frac{\chi^2_{2(s+1),1-\alpha/2}}{2n}
\right]
}.
$$

### 25分経過時の打ち切り判断

MLE、$I_n(\lambda)=n/\lambda$、Wald区間までを優先。正確区間は「$S\sim\operatorname{Poisson}(n\lambda)$ として平均の区間を $n$ で割る」と書ければ部分点を取れる。

### 採点基準（20点目安）

- Poisson再生性・MLE: 4点
- 不偏性・分散: 3点
- Fisher情報量: 4点
- Wald区間: 4点
- 正確区間: 3点
- 数値計算: 2点

### 持ち帰るパターン

- Poisson標本では十分な集約量は $S=\sum X_i$。
- MLEは $\overline X$、分散は $\lambda/n$。
- Wald区間は大標本近似、正確Poisson区間は離散分布そのものから作る。
- 小さいカウントではWald区間より正確区間を優先して考える。

---

## 6位〜10位を横断して覚えること

この5題はすべて「推定量を出す」だけでは終わらず、標本分布または漸近分布を使って推定精度・区間推定まで接続する。

| 論点 | ピボット・極限分布 | 主な用途 |
|---|---|---|
| 正規母分散 | $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ | $\sigma^2,\sigma$ の厳密区間 |
| モーメント推定 | CLT + Delta法 | 複数推定量の漸近分散比較 |
| 二項比率 | $\sqrt n(\widehat p-p)\Rightarrow N(0,p(1-p))$ | Wald区間・被覆確率 |
| 正規母平均・分散未知 | $(\overline X-\mu)/(S/\sqrt n)\sim t_{n-1}$ | $\mu$ の厳密区間 |
| Poisson母数 | $\sqrt n(\widehat\lambda-\lambda)\Rightarrow N(0,\lambda)$ | Wald区間・正確区間との比較 |

本番では「何を推定するか」を見たら、まず **母数を消した分布を持つピボットが存在するか** を探す。存在すれば有限標本の厳密区間へ、存在しなければCLT・Delta法・MLEの漸近正規性へ進む、という整理が有効である。

## 参照方針

実際の受験演習では問題文の確認は統計検定公式問題集を優先する。本ファイルは提示された年度・問番号・主題一覧をもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
