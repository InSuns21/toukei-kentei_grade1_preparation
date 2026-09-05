<!-- definition-example-audit: strict -->

# I2-02 区間推定

I2-01 では、推定量の漸近分布と標準誤差を求めました。本章では、その不確実性を**区間として報告する方法**を扱います。

本章の基本原理は

$$
\boxed{
\text{確率が分かる量を作る}
\longrightarrow
\text{母数について不等式を解く}
\longrightarrow
\text{区間を数値化する}
\longrightarrow
\text{意味を読む}
}
$$

です。

抽象的な式だけで終わらせず、主要な区間ごとに実際の数値を入れます。

関連する正本:

- [S1-01 標本分布と t・カイ二乗・F 分布](../S1_01_標本分布とカイ二乗_t_f分布/index.md)
- [I2-01 漸近推測・デルタ法](../I2_01_漸近推測_Delta法/index.md)

## この章で解けるようになる問題

- 95%信頼区間の95%を被覆確率で説明する。
- 信頼区間を標本から作られるランダム区間として扱う。
- ピボット量から信頼区間を構成する。
- 正規母平均について、母分散既知なら正規分位点、未知ならt分位点を使う。
- 正規母分散について、カイ二乗分位点を反転して区間を作る。
- 片側区間で $z_{0.95}$ と両側区間で $z_{0.975}$ を使い分ける。
- 漸近正規な推定量からワルド型信頼区間を作る。
- 二項比率のワルド型区間が境界付近で壊れる様子を数値で確認する。
- 単調変換した母数の区間で端点の順序を正しく変える。
- $U(0,\theta)$ のような非正則モデルでも有限標本ピボットから区間を作る。

---

## 0. まず95%信頼区間を2本作る

### 0.1 母標準偏差が既知：製品重量

母標準偏差が

$$
\sigma=5\ \mathrm{g}
$$

と分かっている製品重量を25個測り

$$
n=25,
\qquad
\bar x=102
$$

を得たとします。標準誤差は

$$
\frac5{\sqrt{25}}=1.
$$

95%信頼区間は

$$
102\pm1.96\times1
$$

なので

$$
\boxed{[100.04,103.96]}.
$$

### 0.2 母標準偏差が未知：小標本

正規母集団から

$$
n=16,
\qquad
\bar x=52,
\qquad
S=4
$$

を得たとします。標準誤差は

$$
\frac4{\sqrt{16}}=1.
$$

ただし母標準偏差を同じ標本から推定しているため、有限標本では自由度15のt分布を使います。

$$
t_{15,0.975}\approx2.131
$$

より

$$
\boxed{52\pm2.131=[49.869,54.131]}.
$$

この2例だけでも、区間の形は

$$
\boxed{
\text{推定値}
\pm
\text{分位点}
\times
\text{標準誤差}
}
$$

であることが見えます。

---

## 1. 95%は「観測後の母数の確率」ではない

<a id="def-i2-02-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（信頼区間）**  
> 母数 $\theta$ に対し、標本 $X$ から計算される統計量 $L(X),U(X)$ を用いたランダム区間 $[L(X),U(X)]$ を考える。所定の被覆水準を満たすよう構成されたこのランダム区間を $\theta$ の信頼区間という。
<!-- formal-statement-end -->

<a id="def-i2-02-coverage-probability"></a>

<!-- formal-statement-start -->
> **定義（被覆確率）**  
> ランダム区間 $[L(X),U(X)]$ が真の母数 $\theta$ を含む確率
>
> $$
> C(\theta)
> =P_\theta\{L(X)\le\theta\le U(X)\}
> $$
>
> を被覆確率という。
<!-- formal-statement-end -->

<a id="def-i2-02-confidence-coefficient"></a>

<!-- formal-statement-start -->
> **定義（信頼係数）**  
> 区間推定法について
>
> $$
> \inf_{\theta\in\Theta}C(\theta)\ge1-\alpha
> $$
>
> が成り立つとき、$1-\alpha$ をその区間が保証する信頼係数と呼ぶ。
<!-- formal-statement-end -->

### 1.1 最初の区間で読む

観測後に

$$
[100.04,103.96]
$$

という数値が出た時点で、この区間自体は固定されています。頻度論では母平均 $\mu$ も固定値です。

したがって

> 「この固定区間に真の $\mu$ が95%の確率で入る」

とは読みません。

正しい意味は、**同じ方法で標本を取り直して区間を何度も作ると、作られた区間の95%が固定された真の母平均を覆う**、です。

<!-- definition-example-start: def-i2-02-confidence-interval, def-i2-02-coverage-probability, def-i2-02-confidence-coefficient -->
**定義の確認**  
最初の例では、標本を取り直せば $\bar X$ が変わり、区間も例えば $[98.8,102.7]$ や $[101.2,105.1]$ のように動きます。そのランダムな区間構成法が真の $\mu$ を95%の割合で覆う、という性質が95%信頼区間の意味です。
<!-- definition-example-end -->

---

## 2. ピボット量：未知母数を含むのに分布は既知

<a id="def-i2-02-pivotal-quantity"></a>

<!-- formal-statement-start -->
> **定義（ピボット量）**  
> 標本 $X$ と母数 $\theta$ の関数 $Q(X,\theta)$ で、その標本分布が未知母数に依存しないものをピボット量という。
<!-- formal-statement-end -->

製品重量の既知分散例では

$$
Q(X,\mu)
=\frac{\bar X-\mu}{5/\sqrt{25}}
=\bar X-\mu
$$

で、真の $\mu$ が何であっても

$$
Q(X,\mu)\sim N(0,1).
$$

従って

$$
P(-1.96\le \bar X-\mu\le1.96)=0.95.
$$

これを $\mu$ について解くと

$$
\bar X-1.96\le\mu\le\bar X+1.96.
$$

$\bar x=102$ を代入して

$$
[100.04,103.96]
$$

が出ます。

<!-- definition-example-start: def-i2-02-pivotal-quantity -->
**定義の確認**  
未知なのは $\mu$ ですが、$\bar X-\mu$ の分布はこの例では標準正規分布に固定されています。だから「確率95%の不等式」を先に書き、あとから $\mu$ の範囲へ反転できます。
<!-- definition-example-end -->

---

## 3. 正規母平均：母分散既知

一般に

$$
X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2),
\qquad \sigma^2\text{既知}
$$

なら

$$
\frac{\sqrt n(\bar X-\mu)}\sigma\sim N(0,1).
$$

従って

$$
\boxed{
\mu\in
\left[
\bar X-z_{1-\alpha/2}\frac\sigma{\sqrt n},
\quad
\bar X+z_{1-\alpha/2}\frac\sigma{\sqrt n}
\right]
}.
$$

### 3.1 区間幅から標本サイズを逆算する

製品重量で $\sigma=5$、95%信頼区間の半幅を1 g以下にしたいとします。

$$
1.96\frac5{\sqrt n}\le1
$$

より

$$
n\ge(1.96\times5)^2=96.04.
$$

従って

$$
\boxed{n\ge97}.
$$

半幅をさらに0.5 gへ半分にすると

$$
n\ge\left(\frac{1.96\times5}{0.5}\right)^2
=384.16
$$

なので385個必要です。

> **区間幅を半分にすると標本数は約4倍**、という $1/\sqrt n$ の効き方が数値で確認できます。

---

## 4. 正規母平均：母分散未知ならt分布

<a id="def-i2-02-exact-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（厳密信頼区間）**  
> 有限の標本サイズについて、許される母数値で被覆確率が指定水準以上になることが理論的に保証される信頼区間を、本章では厳密信頼区間という。
<!-- formal-statement-end -->

<a id="thm-i2-02-t-confidence-interval"></a>

<!-- formal-statement-start -->
> **定理（正規母平均のt信頼区間）**  
> $X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とし、$\sigma^2$ は未知とする。不偏標本分散を $S^2$ とすると
>
> $$
> \frac{\sqrt n(\bar X-\mu)}S\sim t_{n-1}
> $$
>
> であり、$\mu$ の両側 $100(1-\alpha)\%$ 信頼区間は
>
> $$
> \boxed{
> \left[
> \bar X-t_{n-1,1-\alpha/2}\frac S{\sqrt n},
> \quad
> \bar X+t_{n-1,1-\alpha/2}\frac S{\sqrt n}
> \right]
> }
> $$
>
> である。
<!-- formal-statement-end -->

### 4.1 Z区間とt区間を同じ数字で比較する

0節の

$$
n=16,
\quad
\bar x=52,
\quad
S=4
$$

では、もし誤って標準正規分布の1.96を使うと

$$
52\pm1.96=[50.04,53.96].
$$

正しいt区間は

$$
52\pm2.131=[49.869,54.131].
$$

母分散を推定した不確実性の分だけt区間の方が広くなります。

<!-- definition-example-start: def-i2-02-exact-confidence-interval -->
**定義の確認**  
このt区間は「$n=16$ が十分大きいからだいたい95%」なのではありません。正規性の仮定の下で $T\sim t_{15}$ が有限標本で厳密に成り立つため、被覆確率が正確に95%です。
<!-- definition-example-end -->

---

## 5. 正規母分散：カイ二乗分布を反転する

正規母集団では

$$
Q=\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}.
$$

<a id="thm-i2-02-variance-confidence-interval"></a>

<!-- formal-statement-start -->
> **定理（正規母分散のカイ二乗信頼区間）**  
> 母分散 $\sigma^2$ の両側 $100(1-\alpha)\%$ 信頼区間は
>
> $$
> \boxed{
> \left[
> \frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}},
> \quad
> \frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}}
> \right]
> }
> $$
>
> である。
<!-- formal-statement-end -->

### 5.1 数字で端点反転を見る

$$
n=16,
\qquad
S^2=12
$$

とします。自由度15で

$$
\chi^2_{15,0.025}\approx6.262,
\qquad
\chi^2_{15,0.975}\approx27.488.
$$

分子は

$$
(n-1)S^2=15\times12=180.
$$

従って95%信頼区間は

$$
\begin{aligned}
\sigma^2
&\in
\left[
\frac{180}{27.488},
\frac{180}{6.262}
\right]\\
&\approx
\boxed{[6.55,28.74]}.
\end{aligned}
$$

大きいカイ二乗分位点27.488が**下端**に来ることに注意してください。これは

$$
\frac{a}{\sigma^2}\le b
$$

を $\sigma^2$ について解くと逆数で不等号の端点が入れ替わるためです。

母標準偏差なら平方根を取って

$$
\boxed{\sigma\in[2.56,5.36]}.
$$

---

## 6. 片側信頼区間

<a id="def-i2-02-one-sided-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（片側信頼区間）**  
> 母数の下限だけを与える $[L(X),\infty)$、または上限だけを与える $(-\infty,U(X)]$ の形の信頼区間を片側信頼区間という。
<!-- formal-statement-end -->

製品重量の例

$$
\bar x=102,
\qquad
\sigma/\sqrt n=1
$$

で95%の**上側**信頼限界を作ると

$$
\mu\le102+z_{0.95}\times1
=102+1.645
=103.645.
$$

従って

$$
\boxed{(-\infty,103.645]}.
$$

95%の下側信頼区間は

$$
\boxed{[100.355,\infty)}.
$$

両側95%では左右2.5%ずつなので1.96、片側95%では片側に5%全部を置くので1.645を使います。

<!-- definition-example-start: def-i2-02-one-sided-confidence-interval -->
**定義の確認**  
「上限だけ保証できればよい」問題で両側区間の1.96を使う必要はありません。片側に誤差確率5%を全て置けるため、有限端点は102±1.645になります。
<!-- definition-example-end -->

---

## 7. 漸近正規性から作るワルド型信頼区間

有限標本で厳密なピボット量がない場合、I2-01の漸近正規性を使います。

<a id="def-i2-02-asymptotic-confidence-interval"></a>

<!-- formal-statement-start -->
> **定義（漸近信頼区間）**  
> 標本サイズ $n\to\infty$ のとき被覆確率が目標水準 $1-\alpha$ へ収束する区間を漸近信頼区間という。有限標本で被覆確率が正確に $1-\alpha$ であることは要求しない。
<!-- formal-statement-end -->

<a id="prop-i2-02-wald-confidence-interval"></a>

<!-- formal-statement-start -->
> **命題（漸近正規推定量のワルド型信頼区間）**  
> 推定量 $\hat\theta$ が
>
> $$
> \frac{\hat\theta-\theta}{\widehat{\operatorname{se}}(\hat\theta)}
> \xrightarrow{d}N(0,1)
> $$
>
> を満たすとする。このとき
>
> $$
> \boxed{
> \hat\theta
> \pm z_{1-\alpha/2}
> \widehat{\operatorname{se}}(\hat\theta)
> }
> $$
>
> は両側 $100(1-\alpha)\%$ 漸近信頼区間である。
<!-- formal-statement-end -->

### 7.1 二項比率：うまくいく例

100人中60人が成功したとします。

$$
\hat p=0.6,
\qquad
n=100.
$$

推定標準誤差は

$$
\sqrt{\frac{0.6\cdot0.4}{100}}
\approx0.0490.
$$

95%ワルド型区間は

$$
0.6\pm1.96\times0.0490
\approx
\boxed{[0.504,0.696]}.
$$

このように標本比率が境界から離れ、標本数もそこそこ大きい場合には見た目も自然です。

### 7.2 二項比率：境界付近で壊れる例

今度は20人中2人だけ成功したとします。

$$
\hat p=0.1,
\qquad
n=20.
$$

推定標準誤差は

$$
\sqrt{\frac{0.1\cdot0.9}{20}}
\approx0.0671.
$$

95%ワルド型区間は

$$
0.1\pm1.96\times0.0671
\approx
\boxed{[-0.031,0.231]}.
$$

しかし確率 $p$ は0未満になれません。

> **これが「式に代入できた」と「良い95%区間である」が別問題である具体例です。**

境界付近、小標本、$\hat p=0$ や1ではワルド型区間の有限標本性能が悪くなります。

<!-- definition-example-start: def-i2-02-asymptotic-confidence-interval -->
**定義の確認**  
ワルド型区間は有限標本で厳密な95%区間ではありません。20人中2人の例で負の下端が出ることは、正規近似をそのまま使う限界を目で確認できる例です。
<!-- definition-example-end -->

---

## 8. 単調変換した母数の区間

<a id="prop-i2-02-monotone-transform"></a>

<!-- formal-statement-start -->
> **命題（単調変換による信頼区間の移送）**  
> $\theta$ の信頼区間が $[L,U]$ で、$\eta=g(\theta)$ とする。$g$ が単調増加なら $[g(L),g(U)]$、単調減少なら $[g(U),g(L)]$ が対応する区間となり、元の区間と同じ被覆事象を持つ。
<!-- formal-statement-end -->

### 8.1 故障率から平均寿命へ

故障率 $\lambda$ の95%信頼区間が

$$
\lambda\in[0.08,0.12]\quad(1/\mathrm{hour})
$$

だったとします。指数分布の平均寿命は

$$
m=\frac1\lambda.
$$

これは単調**減少**なので端点を逆にして

$$
\begin{aligned}
m
&\in
\left[
\frac1{0.12},
\frac1{0.08}
\right]\\
&=\boxed{[8.33,12.5]\ \mathrm{hours}}.
\end{aligned}
$$

「0.08を左端だからそのまま左端へ入れる」とすると順序を誤ります。

---

## 9. 指数分布の率母数：有限標本で厳密な区間

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Exp}(\lambda)$ を率母数表示で考えます。

$$
S=\sum_{i=1}^nX_i
$$

なら

$$
2\lambda S\sim\chi^2_{2n}.
$$

従って

$$
\boxed{
\lambda\in
\left[
\frac{\chi^2_{2n,\alpha/2}}{2S},
\quad
\frac{\chi^2_{2n,1-\alpha/2}}{2S}
\right]
}
$$

は有限標本で厳密です。

### 9.1 数字を入れて区間を作る

$n=10$、合計観測時間が

$$
S=40\ \mathrm{hours}
$$

だったとします。自由度20について

$$
\chi^2_{20,0.025}\approx9.591,
\qquad
\chi^2_{20,0.975}\approx34.170.
$$

したがって

$$
\lambda
\in
\left[
\frac{9.591}{80},
\frac{34.170}{80}
\right]
\approx
\boxed{[0.120,0.427]}.
$$

平均寿命 $1/\lambda$ の区間へ変換すると

$$
\boxed{[2.34,8.34]\ \mathrm{hours}}
$$

です。

---

## 10. 非正則モデルでもピボット量は使える：一様分布

$$
X_i\overset{\mathrm{iid}}{\sim}U(0,\theta),
\qquad
M=X_{(n)}
$$

とします。

$$
P_\theta(M\le m)
=\left(\frac m\theta\right)^n
$$

なので

$$
R=\frac M\theta
$$

は

$$
P(R\le r)=r^n
$$

に従い、$\theta$ に依存しません。

<a id="prop-i2-02-uniform-exact-ci"></a>

<!-- formal-statement-start -->
> **命題（一様分布最大値による厳密信頼区間）**  
> $0<a<b\le1$ が $b^n-a^n=1-\alpha$ を満たすなら
>
> $$
> \boxed{
> \left[
> \frac Mb,
> \quad
> \frac Ma
> \right]
> }
> $$
>
> は $\theta$ の被覆確率 $1-\alpha$ の厳密信頼区間である。
<!-- formal-statement-end -->

### 10.1 最大値8.0から95%区間を作る

$n=5$、観測最大値が

$$
M=8.0
$$

だったとします。$b=1$ として片側に5%を置くと

$$
1-a^5=0.95
$$

だから

$$
a=0.05^{1/5}\approx0.5493.
$$

従って

$$
\theta
\in
\left[
8.0,
\frac{8.0}{0.5493}
\right]
\approx
\boxed{[8.0,14.56]}.
$$

下端が観測最大値8.0なのは当然です。$U(0,\theta)$ では母数 $\theta$ が標本最大値より小さいことはありえません。

> **重要**  
> $U(0,\theta)$ は支持が母数に依存する非正則モデルです。それでも有限標本ピボット $M/\theta$ があるため厳密区間を作れます。「正則な最尤理論が使えない」ことと「区間推定できない」ことは別です。

---

## 11. よくある誤り

1. 観測後の固定区間に母数が95%の確率で入る、と読む。
2. 母分散未知の小標本で $z_{0.975}$ をそのまま使う。
3. 母分散区間でカイ二乗分位点の順序を反転しない。
4. 両側95%で $z_{0.95}$ を使う。
5. 片側95%で $z_{0.975}$ を使う。
6. ワルド型区間を有限標本で厳密な95%区間と呼ぶ。
7. 単調減少変換で端点を入れ替えない。

---

## 12. まとめ

区間推定を解くときは

$$
\boxed{
\text{分布が既知の量}
\to
\text{確率不等式}
\to
\text{母数について反転}
\to
\text{数値代入}
}
$$

の順に進めます。

正規母集団では

| 対象 | ピボット量 |
|---|---|
| $\mu$、$\sigma^2$既知 | $\sqrt n(\bar X-\mu)/\sigma\sim N(0,1)$ |
| $\mu$、$\sigma^2$未知 | $\sqrt n(\bar X-\mu)/S\sim t_{n-1}$ |
| $\sigma^2$ | $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$ |

を軸にします。

厳密ピボットがない場合は漸近正規性からワルド型区間を作れますが、**有限標本で本当に名目被覆率を保つかは別問題**です。

---

# 演習

## Level A

### I2-02-A01 95%信頼区間の意味

ある方法で95%信頼区間 $[2.1,3.4]$ を得た。「真の母数がこの固定区間に入る確率は95%」が頻度論で不適切な理由と、正しい意味を述べよ。

<!-- solution-start -->
#### 解答

頻度論では母数は固定、標本から作る区間がランダムである。95%は

$$
P_\theta\{L(X)\le\theta\le U(X)\}=0.95
$$

という反復標本抽出での被覆率を表す。
<!-- solution-end -->

### I2-02-A02 母分散既知の正規平均

$X_i\sim N(\mu,16)$、$n=64$、$\bar X=10$ とする。$z_{0.975}=1.96$ として95%信頼区間を求めよ。

<!-- solution-start -->
#### 解答

標準誤差は $4/8=0.5$。従って

$$
\boxed{10\pm1.96\times0.5=[9.02,10.98]}.
$$
<!-- solution-end -->

### I2-02-A03 母分散未知の正規平均

$n=16,\bar X=50,S=8$、$t_{15,0.975}=2.131$ とする。95%信頼区間を求めよ。

<!-- solution-start -->
#### 解答

標準誤差は $8/4=2$ なので

$$
\boxed{50\pm2.131\times2=[45.738,54.262]}.
$$
<!-- solution-end -->

### I2-02-A04 片側区間

$\bar x=102,\sigma=5,n=25$ について95%上側信頼限界を求めよ。$z_{0.95}=1.645$ とする。

<!-- solution-start -->
#### 解答

$$
\boxed{\mu\le102+1.645=103.645}.
$$
<!-- solution-end -->

## Level B

### I2-02-B01 母分散の95%信頼区間

$n=16,S^2=12$、$\chi^2_{15,0.025}=6.262$、$\chi^2_{15,0.975}=27.488$ とする。

1. $\sigma^2$ の95%信頼区間を求めよ。
2. $\sigma$ の95%信頼区間を求めよ。
3. 大きいカイ二乗分位点が下端に来る理由を述べよ。

<!-- solution-start -->
#### 解答

$$
\sigma^2\in
\left[\frac{180}{27.488},\frac{180}{6.262}\right]
\approx\boxed{[6.55,28.74]}.
$$

$$
\sigma\in\boxed{[2.56,5.36]}.
$$

$1/\sigma^2$ を含む不等式を $\sigma^2$ について解くと逆数によって端点が反転するため。
<!-- solution-end -->

### I2-02-B02 区間幅から標本サイズ

$\sigma=5$ の既知分散正規平均について、95%信頼区間の半幅を1以下にしたい。必要な最小標本サイズを求めよ。

<!-- solution-start -->
#### 解答

$$
n\ge(1.96\times5)^2=96.04
$$

より $\boxed{n=97}$。
<!-- solution-end -->

### I2-02-B03 二項比率ワルド区間の破綻

20人中2人成功した。二項比率の95%ワルド型区間を求め、その問題点を述べよ。

<!-- solution-start -->
#### 解答

$$
\hat p=0.1,
\qquad
\widehat{\operatorname{se}}\approx0.0671.
$$

$$
0.1\pm1.96(0.0671)
\approx\boxed{[-0.031,0.231]}.
$$

確率なのに負の下端が出ており、境界付近・小標本で正規近似をそのまま使う問題が見える。
<!-- solution-end -->

### I2-02-B04 単調減少変換

故障率の95%信頼区間が $[0.08,0.12]$ である。平均寿命 $m=1/\lambda$ の区間を求めよ。

<!-- solution-start -->
#### 解答

$$
m\in
\left[1/0.12,1/0.08\right]
=\boxed{[8.33,12.5]}.
$$
<!-- solution-end -->

## Level C

### I2-02-C01 ピボット量から正規平均区間を導く

既知分散正規平均について

$$
Z=\frac{\sqrt n(\bar X-\mu)}\sigma\sim N(0,1)
$$

から両側 $1-\alpha$ 信頼区間を導け。

<!-- solution-start -->
#### 解答

$$
P(-z_{1-\alpha/2}\le Z\le z_{1-\alpha/2})=1-\alpha
$$

を $\mu$ について解いて

$$
\boxed{
\bar X-z_{1-\alpha/2}\frac\sigma{\sqrt n}
\le\mu\le
\bar X+z_{1-\alpha/2}\frac\sigma{\sqrt n}
}.
$$
<!-- solution-end -->

### I2-02-C02 指数分布の厳密区間

$X_i\sim\operatorname{Exp}(\lambda)$、$n=10$、$S=\sum X_i=40$ とする。$\chi^2_{20,0.025}=9.591$、$\chi^2_{20,0.975}=34.170$ として $\lambda$ の95%信頼区間を求めよ。

<!-- solution-start -->
#### 解答

$$
\lambda\in
\left[\frac{9.591}{80},\frac{34.170}{80}\right]
\approx\boxed{[0.120,0.427]}.
$$
<!-- solution-end -->

### I2-02-C03 一様分布の非正則区間

$X_i\sim U(0,\theta)$、$n=5$、標本最大値 $M=8$ とする。$M/\theta$ の分布から95%区間 $[M,M/a]$ を作るための $a$ と区間を求めよ。

<!-- solution-start -->
#### 解答

$$
1-a^5=0.95
\quad\Longrightarrow\quad
a=0.05^{1/5}\approx0.5493.
$$

$$
\boxed{\theta\in[8,14.56]}.
$$
<!-- solution-end -->

### I2-02-C04 厳密区間と漸近区間を区別する

次のうち有限標本で厳密な区間と、一般に漸近区間であるものを分類せよ。

1. 正規母平均・母分散既知のZ区間
2. 正規母平均・母分散未知のt区間
3. 正規母分散のカイ二乗区間
4. 二項比率の通常のワルド型区間

<!-- solution-start -->
#### 解答

1〜3は仮定の下で有限標本で厳密。4は一般に漸近区間。
<!-- solution-end -->

## Level D

### I2-02-D01 区間変換とデルタ法を比較する

$\theta>0$ の厳密95%信頼区間が $[L,U]$ で、$\eta=1/\theta$ とする。

1. 厳密区間を単調変換して $\eta$ の区間を求めよ。
2. デルタ法で $\eta$ の近似区間を作る考え方を述べよ。
3. なぜ両者は有限標本で一般に一致しないか説明せよ。

<!-- solution-start -->
#### 解答

単調減少なので

$$
\boxed{[1/U,1/L]}.
$$

デルタ法は $g(\theta)=1/\theta$ を推定値周辺で一次近似し、

$$
g(\hat\theta)\pm
z_{0.975}|g'(\hat\theta)|\widehat{\operatorname{se}}(\hat\theta)
$$

を使う。前者は元の被覆事象をそのまま写すが、後者は局所線形近似なので有限標本で一致する必要はない。
<!-- solution-end -->

---

## 30分ドリル

### I2-02-DRILL01 区間を選び、数値化し、意味まで書く

次を解け。

1. $\sigma=5,n=25,\bar x=102$ の正規平均95%区間。
2. $n=16,\bar x=52,S=4$ の正規平均95%t区間。
3. $n=16,S^2=12$ の母分散95%区間。ただし $\chi^2_{15,0.025}=6.262,\chi^2_{15,0.975}=27.488$。
4. 20人中2人成功の二項比率ワルド型95%区間と、その問題点。
5. 故障率区間 $[0.08,0.12]$ を平均寿命区間へ変換せよ。
6. $U(0,\theta)$、$n=5,M=8$ で95%区間を作れ。

<!-- solution-start -->
#### 解答

1. $\boxed{[100.04,103.96]}$。
2. $\boxed{[49.869,54.131]}$。
3. $\boxed{[6.55,28.74]}$。
4. $\boxed{[-0.031,0.231]}$。負の下端が出ており境界付近でワルド型近似が不自然。
5. $\boxed{[8.33,12.5]}$。
6. $a=0.05^{1/5}\approx0.5493$ より $\boxed{[8,14.56]}$。
<!-- solution-end -->
