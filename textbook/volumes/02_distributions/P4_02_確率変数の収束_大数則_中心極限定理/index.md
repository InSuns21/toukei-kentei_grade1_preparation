# P4-02 確率変数の収束・大数則・中心極限定理

本章は [統計教材 共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md) に従います。標本平均が「母平均へ近づく」ことと、「誤差を標準化すると正規分布へ近づく」ことを分けて理解し、近似確率・推定量の漸近評価へ接続します。

## この章で解けるようになる問題

- 確率収束・概収束・分布収束を定義から判定する。
- 大数の法則を使って標本平均や標本比率の一致性を示す。
- 中心極限定理で標本平均・標本和を標準化し、近似確率を計算する。
- 二項分布の正規近似で連続補正を正しく入れる。
- 二項分布からポアソン分布への極限を確率質量関数から導出する。
- Slutsky型の定理と一次Taylor展開を使い、簡単な推定量の漸近分布を求める。

## 公式出題範囲との対応

| 範囲 | 主な問題 |
|---|---|
| 確率変数の収束 | P4T-A01, B01, C04 |
| 大数の法則 | P4T-A02, B02, C01, C02, D01 |
| 中心極限定理 | P4T-A03, B03, C01, C02, C03, D01 |
| 正規近似・連続補正 | P4T-B04, C01, C03 |
| ポアソン近似 | P4T-A04, C05, P4T-DRILL-01 |

## 前提知識チェック

1. F0-00: 極限、Taylor展開、ランダウ記号を確認する。
2. P2-02: 期待値・分散・独立な和の分散を使う。
3. P3-01: ベルヌーイ・二項・ポアソン分布の平均・分散と確率質量関数を使う。
4. P3-02: 正規分布と標準化を使う。
5. P1-02: 独立性と積事象の確率を使う。

合格基準はLevel B 85%以上、Level C 70%以上、30分ドリル70点以上です。

---

# 1. 学習の見取り図

標本平均
$$
\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
には、二つの異なる「大標本での安定性」があります。

第一は
$$
\overline X_n\xrightarrow{p}\mu
$$
という大数の法則です。これは「$n$を大きくすると標本平均そのものが母平均へ近づく」ことを述べます。

第二は
$$
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}
\xrightarrow{d}N(0,1)
$$
という中心極限定理です。これは「残る誤差を$\sqrt n$倍して見ると、分布の形が標準正規分布へ近づく」ことを述べます。

したがって役割は異なります。

- 大数の法則：推定量が真値へ近づくことを保証する。
- 中心極限定理：どの程度ずれるかを確率で近似する。

「平均へ近づく」と「正規分布へ近づく」を同じ意味にしないことが本章の中心です。

---

# 2. 収束概念

## 2.1 確率収束

$X_n$が$X$へ確率収束するとは、任意の$\varepsilon>0$について
$$
P(|X_n-X|>\varepsilon)\to0
\qquad(n\to\infty)
$$
となることです。記号で
$$
X_n\xrightarrow{p}X
$$
と書きます。

量化記号まで書けば
$$
\forall\varepsilon>0,\ \forall\delta>0,
\ \exists N\ \text{s.t.}\ n\geq N
\Rightarrow P(|X_n-X|>\varepsilon)<\delta
$$
です。

「ある$\varepsilon$で確率が小さい」だけでは足りません。**全ての正の誤差幅**について確率が0へ行く必要があります。

## 2.2 概収束

$X_n$が$X$へ概収束するとは
$$
P\left(\left\{\omega:\lim_{n\to\infty}X_n(\omega)=X(\omega)\right\}\right)=1
$$
となることです。記号で
$$
X_n\xrightarrow{a.s.}X
$$
と書きます。

確率収束が「各$n$で外れる確率」を見るのに対し、概収束は「一つの標本点$\omega$を固定して列全体を見る」点が違います。

## 2.3 分布収束

$F_n$を$X_n$の累積分布関数、$F$を$X$の累積分布関数とします。$F$の全ての連続点$x$で
$$
F_n(x)\to F(x)
$$
となるとき
$$
X_n\xrightarrow{d}X
$$
と書きます。

分布収束は個々の標本点で$X_n$と$X$が近いことを要求しません。分布の形だけが近づけばよいので、三つの中では最も弱い収束です。

## 2.4 三つの含意

一般に
$$
X_n\xrightarrow{a.s.}X
\Longrightarrow
X_n\xrightarrow{p}X
\Longrightarrow
X_n\xrightarrow{d}X.
$$
逆向きは一般には成り立ちません。

### 確率収束なら確率Cauchy

C04で反例を処理するため、次の必要条件を確認します。$X_n\xrightarrow{p}X$なら任意の$\varepsilon>0$について
$$
P(|X_n-X_m|>\varepsilon)\to0
\qquad(n,m\to\infty)
$$
です。

実際、三角不等式から
$$
\{|X_n-X_m|>\varepsilon\}
\subset
\{|X_n-X|>\varepsilon/2\}
\cup
\{|X_m-X|>\varepsilon/2\}
$$
なので
$$
\begin{aligned}
P(|X_n-X_m|>\varepsilon)
&\leq P(|X_n-X|>\varepsilon/2)\\
&\quad+P(|X_m-X|>\varepsilon/2)\to0.
\end{aligned}
$$
従って、この条件に反する列は**どの確率変数へも**確率収束しません。

---

# 3. 大数の法則

## 3.1 有限分散の場合をチェビシェフの不等式から導く

$X_1,X_2,\ldots$を独立同分布とし
$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2<\infty
$$
とします。独立性から
$$
E[\overline X_n]=\mu,
$$
$$
\operatorname{Var}(\overline X_n)
=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)
=\frac{\sigma^2}{n}.
$$
チェビシェフの不等式
$$
P(|Y-EY|>\varepsilon)
\leq\frac{\operatorname{Var}(Y)}{\varepsilon^2}
$$
へ$Y=\overline X_n$を代入すると
$$
P(|\overline X_n-\mu|>\varepsilon)
\leq\frac{\sigma^2}{n\varepsilon^2}\to0.
$$
従って
$$
\boxed{\overline X_n\xrightarrow{p}\mu}.
$$

この導出では「独立だから標本平均の分散が$\sigma^2/n$になる」箇所が得点源です。

## 3.2 より一般の大数の法則

独立同分布で
$$
E|X_1|<\infty
$$
なら、さらに強く
$$
\overline X_n\xrightarrow{a.s.}\mu
$$
が成り立ちます。これを強大数の法則といいます。概収束は確率収束を含意するので、同じ仮定から確率収束も従います。

有限分散の場合の弱大数則は、上のチェビシェフの不等式から直接導けます。

---

# 4. 中心極限定理

$X_1,X_2,\ldots$が独立同分布で
$$
E[X_i]=\mu,
\qquad
0<\sigma^2=\operatorname{Var}(X_i)<\infty
$$
とします。このとき
$$
\boxed{
\frac{\sqrt n(\overline X_n-\mu)}{\sigma}
\xrightarrow{d}N(0,1)
}.
$$

同値に、和$S_n=\sum_iX_i$なら
$$
\frac{S_n-n\mu}{\sigma\sqrt n}
\xrightarrow{d}N(0,1).
$$

従って大標本では
$$
\overline X_n\approx N\left(\mu,\frac{\sigma^2}{n}\right),
$$
$$
S_n\approx N(n\mu,n\sigma^2)
$$
と近似します。

中心極限定理を適用するときは、次の三点を確認します。

1. 独立同分布か。
2. 平均と正の有限分散が存在するか。
3. 中心化と尺度$\sigma\sqrt n$または$\sigma/\sqrt n$を正しく置いたか。

---

# 5. Slutsky型の定理と連続写像

$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$とします。このとき
$$
(X_n,Y_n)\xrightarrow{d}(X,c).
$$
極限点$(x,c)$で連続な関数$g$を作用させれば
$$
g(X_n,Y_n)\xrightarrow{d}g(X,c)
$$
です。

たとえば$Y_n\xrightarrow{p}\sigma>0$なら
$$
\frac{X_n}{Y_n}\xrightarrow{d}\frac X\sigma
$$
とできます。標準誤差の未知母数を一致推定量で置き換えるときの根拠になります。

---

# 6. 二項分布の正規近似と連続補正

$B\sim\operatorname{Bin}(n,p)$なら
$$
E[B]=np,
\qquad
\operatorname{Var}(B)=np(1-p).
$$
$n$が大きく、$p$が0や1へ極端に近くないとき、中心極限定理から
$$
B\approx N\{np,np(1-p)\}
$$
と近似できます。

ただし$B$は整数値、正規分布は連続分布です。たとえば
$$
P(B\leq k)
$$
は整数$k$までを含むので、正規近似では境界を$k+1/2$へ移して
$$
P(B\leq k)
\approx
\Phi\left(
\frac{k+1/2-np}{\sqrt{np(1-p)}}
\right)
$$
とします。これが連続補正です。

同様に
$$
P(B\geq k)
\approx
1-\Phi\left(
\frac{k-1/2-np}{\sqrt{np(1-p)}}
\right).
$$

---

# 7. 二項分布のポアソン極限

$B_n\sim\operatorname{Bin}(n,p_n)$で
$$
p_n\to0,
\qquad
np_n\to\lambda\in(0,\infty)
$$
とします。固定した$k\in\mathbb N_0$について
$$
P(B_n=k)
=\binom nkp_n^k(1-p_n)^{n-k}
$$
を考えます。

特に$p_n=\lambda/n$なら
$$
\begin{aligned}
P(B_n=k)
&=\binom nk\left(\frac\lambda n\right)^k
\left(1-\frac\lambda n\right)^{n-k}\\
&=\frac{\lambda^k}{k!}
\underbrace{\prod_{j=0}^{k-1}\left(1-\frac jn\right)}_{\to1}
\underbrace{\left(1-\frac\lambda n\right)^n}_{\to e^{-\lambda}}
\underbrace{\left(1-\frac\lambda n\right)^{-k}}_{\to1}.
\end{aligned}
$$
したがって
$$
P(B_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!},
$$
これはポアソン分布$\operatorname{Poisson}(\lambda)$の確率質量関数です。

一般の$p_n$でも同じ極限が成り立ち、
$$
B_n\xrightarrow{d}\operatorname{Poisson}(\lambda)
$$
となります。

---

# 8. 一次Taylor展開とデルタ法

推定量$\widehat\theta_n$について
$$
\sqrt n(\widehat\theta_n-\theta)
\xrightarrow{d}N(0,V)
$$
とし、$g$が$\theta$の近傍で微分可能、$g'$が$\theta$で連続とします。

平均値の定理より、$\widehat\theta_n$と$\theta$の間にある$\xi_n$が存在して
$$
g(\widehat\theta_n)-g(\theta)
=g'(\xi_n)(\widehat\theta_n-\theta).
$$
$\widehat\theta_n\xrightarrow{p}\theta$なら$\xi_n\xrightarrow{p}\theta$であり、連続性から
$$
g'(\xi_n)\xrightarrow{p}g'(\theta).
$$
よって
$$
\sqrt n\{g(\widehat\theta_n)-g(\theta)\}
=g'(\xi_n)\sqrt n(\widehat\theta_n-\theta)
$$
へSlutsky型の定理を使うと
$$
\boxed{
\sqrt n\{g(\widehat\theta_n)-g(\theta)\}
\xrightarrow{d}N\left(0,[g'(\theta)]^2V\right)
}.
$$

この一次近似とSlutsky型の定理から得られる極限分布を、一次のデルタ法という。

---

# 9. 典型例

## 例1：ベルヌーイ標本

$X_i\sim\operatorname{Bernoulli}(p)$なら
$$
E[X_i]=p,
\qquad
\operatorname{Var}(X_i)=p(1-p).
$$
従って
$$
\overline X_n\xrightarrow{p}p,
$$
$$
\frac{\sqrt n(\overline X_n-p)}{\sqrt{p(1-p)}}
\xrightarrow{d}N(0,1).
$$
標本平均は標本比率そのものです。

## 例2：ポアソン標本

$X_i\sim\operatorname{Poisson}(\lambda)$なら
$$
E[\overline X_n]=\lambda,
\qquad
\operatorname{Var}(\overline X_n)=\frac\lambda n.
$$
よって
$$
\overline X_n\xrightarrow{p}\lambda,
$$
$$
\sqrt n(\overline X_n-\lambda)
\xrightarrow{d}N(0,\lambda).
$$

## 例3：二項分布の正規近似

$B\sim\operatorname{Bin}(400,0.3)$なら
$$
E[B]=120,
\qquad
\operatorname{Var}(B)=84.
$$
したがって
$$
P(B\leq130)
\approx
\Phi\left(\frac{130.5-120}{\sqrt{84}}\right).
$$
$130$ではなく$130.5$を使うのが連続補正です。

---

# 10. 本番での解法手順

1. **収束先を先に書く。** 母平均か、標準正規分布か、ポアソン分布かを区別する。
2. **定理の仮定を確認する。** 独立同分布、平均の存在、有限分散、母数範囲を書く。
3. **標本統計量の平均・分散を先に出す。** 標準化の中心と尺度が自動的に決まる。
4. **確率収束なら誤差確率、分布収束なら累積分布関数・標準化を見る。**
5. **離散分布を正規近似するなら連続補正を確認する。**
6. **未知母数を推定値へ置き換えるなら一致性とSlutsky型の定理を明示する。**

3分でモデルと使う定理を特定できれば選択します。15分で標準化式または主要極限まで進めば継続し、25分では仮定・近似式・結論を残して閉じます。

---

# 11. 演習

## Level A

### P4T-A01 定数列の三つの収束
- level: A
- minutes: 7
- topics: 確率収束, 概収束, 分布収束

同一の確率空間上で、各$n$について定数確率変数$X_n(\omega)=1/n$とする。$X_n$が0へ確率収束、概収束、分布収束することを定義から示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

任意の$\varepsilon>0$を固定します。$n>1/\varepsilon$なら$|X_n|=1/n<\varepsilon$なので
$$
P(|X_n|>\varepsilon)=0.
$$
従って$X_n\xrightarrow{p}0$です。

また$X_n(\omega)=1/n$は全ての標本点$\omega$で0へ収束するので
$$
P\left(\lim_{n\to\infty}X_n=0\right)=1,
$$
すなわち概収束します。

概収束は確率収束を、確率収束は分布収束を含意するため、0への分布収束も従います。

##### 本番答案

任意の$\varepsilon>0$について$n>1/\varepsilon$なら$P(|X_n|>\varepsilon)=0$。よって$X_n\to0$確率収束。各$\omega$でも$1/n\to0$なので概収束し、従って分布収束もする。

##### 採点基準

確率収束8点、概収束7点、分布収束5点。合計20点。

<!-- solution-end -->

### P4T-A02 ベルヌーイ標本平均
- level: A
- minutes: 7
- topics: 標本平均

$0\leq p\leq1$とする。独立なベルヌーイ確率変数$X_1,\ldots,X_n$が
$$
P(X_i=1)=p,\qquad P(X_i=0)=1-p
$$
を満たすとする。標本平均を
$$
\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義する。$E[\overline X_n]$と$\operatorname{Var}(\overline X_n)$を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$E[X_i]=p$, $\operatorname{Var}(X_i)=p(1-p)$です。期待値の線形性より
$$
E[\overline X_n]
=\frac1n\sum_{i=1}^nE[X_i]=p.
$$
独立性から共分散項が0なので
$$
\begin{aligned}
\operatorname{Var}(\overline X_n)
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)\\
&=\frac{p(1-p)}n.
\end{aligned}
$$

##### 本番答案

$E[\overline X_n]=p$、独立性より$\operatorname{Var}(\overline X_n)=p(1-p)/n$。

##### 採点基準

平均8点、独立性の使用4点、分散8点。合計20点。

<!-- solution-end -->

### P4T-A03 正規標本平均
- level: A
- minutes: 8
- topics: 正規分布, 標本平均

$\mu\in\mathbb R$, $\sigma^2>0$とする。独立な$X_1,\ldots,X_n\sim N(\mu,\sigma^2)$について
$$
\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義する。$\overline X_n$の分布を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

独立な正規確率変数の線形結合は正規分布に従います。また
$$
E[\overline X_n]=\mu,
\qquad
\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n}.
$$
従って近似ではなく正確に
$$
\boxed{\overline X_n\sim N\left(\mu,\frac{\sigma^2}{n}\right)}.
$$

##### 本番答案

正規分布の線形結合の閉性と平均・分散計算より$\overline X_n\sim N(\mu,\sigma^2/n)$。

##### 採点基準

正規性6点、平均6点、分散8点。合計20点。

<!-- solution-end -->

### P4T-A04 希少二項の平均・分散
- level: A
- minutes: 8
- topics: 二項分布, ポアソン近似

$\lambda>0$を固定し、$n\geq\lceil\lambda\rceil$とする。$B_n$は
$$
P(B_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k},\qquad k=0,\ldots,n
$$
で定まる二項分布に従うとする。二項分布$\operatorname{Bin}(n,p)$の平均$np$、分散$np(1-p)$は用いてよい。$B_n$の平均と分散を求め、それぞれ$n\to\infty$でどうなるか述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

二項分布の平均・分散へ$p=\lambda/n$を代入すると
$$
E[B_n]=n\frac\lambda n=\lambda,
$$
$$
\operatorname{Var}(B_n)
=n\frac\lambda n\left(1-\frac\lambda n\right)
=\lambda\left(1-\frac\lambda n\right).
$$
従って両者とも$\lambda$へ収束します。

##### 本番答案

$E[B_n]=\lambda$、$\operatorname{Var}(B_n)=\lambda(1-\lambda/n)\to\lambda$。

##### 採点基準

平均7点、分散8点、極限5点。合計20点。

<!-- solution-end -->

## Level B

### P4T-B01 アフィン変換と確率収束
- level: B
- minutes: 12
- topics: 確率収束

確率変数列$X_n$が確率変数$X$へ確率収束するとする。定数$a,b\in\mathbb R$について$aX_n+b$の確率収束先を示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$a=0$なら$aX_n+b=b=aX+b$なので自明です。$a\neq0$なら任意の$\varepsilon>0$について
$$
\begin{aligned}
P(|aX_n+b-(aX+b)|>\varepsilon)
&=P(|a||X_n-X|>\varepsilon)\\
&=P\left(|X_n-X|>\frac\varepsilon{|a|}\right)\to0.
\end{aligned}
$$
従って
$$
aX_n+b\xrightarrow{p}aX+b.
$$

##### 本番答案

$a\neq0$なら$P(|aX_n-aX|>\varepsilon)=P(|X_n-X|>\varepsilon/|a|)\to0$。$a=0$も自明なので$aX_n+b\xrightarrow p aX+b$。

##### 採点基準

$a=0$の場合3点、確率の変形10点、結論7点。合計20点。

<!-- solution-end -->

### P4T-B02 大数の法則の適用
- level: B
- minutes: 14
- topics: 大数の法則

$X_1,X_2,\ldots$は独立同分布で$E|X_1|<\infty$とし、
$$
\mu=E[X_1],\qquad \overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義する。$\overline X_n$の収束を大数の法則で説明せよ。さらに$\operatorname{Var}(X_1)=\sigma^2<\infty$とし、チェビシェフの不等式
$$
P(|Y-E[Y]|>\varepsilon)\leq\frac{\operatorname{Var}(Y)}{\varepsilon^2}
$$
を用いて$\overline X_n$の確率収束を直接示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$E|X_1|<\infty$なので母平均$\mu=E[X_1]$が存在し、強大数の法則により
$$
\overline X_n\xrightarrow{a.s.}\mu.
$$
従って確率収束もします。

さらに有限分散なら
$$
\operatorname{Var}(\overline X_n)=\frac{\sigma^2}{n}
$$
なので、任意の$\varepsilon>0$について
$$
P(|\overline X_n-\mu|>\varepsilon)
\leq\frac{\sigma^2}{n\varepsilon^2}\to0.
$$
これは有限分散の場合の弱大数則を直接示しています。

##### 本番答案

$E|X_1|<\infty$より強大数則で$\overline X_n\to\mu$概収束、従って確率収束。有限分散ならチェビシェフの不等式から$P(|\overline X_n-\mu|>\varepsilon)\leq\sigma^2/(n\varepsilon^2)\to0$。

##### 採点基準

強大数則8点、含意3点、分散3点、チェビシェフの不等式6点。合計20点。

<!-- solution-end -->

### P4T-B03 ポアソン標本平均の近似確率
- level: B
- minutes: 15
- topics: 中心極限定理, ポアソン分布

$\lambda>0$とする。独立な確率変数$X_1,\ldots,X_n$が
$$
P(X_i=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
で与えられるポアソン分布に従い、$E[X_i]=\operatorname{Var}(X_i)=\lambda$を用いてよいとする。標本平均を
$$
\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義し、$\varepsilon>0$とする。標準正規分布の累積分布関数を$\Phi$とするとき、$P(|\overline X_n-\lambda|\leq\varepsilon)$を中心極限定理で近似せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ポアソン分布では平均・分散ともに$\lambda$です。中心極限定理より
$$
Z_n=\frac{\sqrt n(\overline X_n-\lambda)}{\sqrt\lambda}
\approx N(0,1).
$$
したがって
$$
\begin{aligned}
P(|\overline X_n-\lambda|\leq\varepsilon)
&=P\left(|Z_n|\leq\varepsilon\sqrt{\frac n\lambda}\right)\\
&\approx\Phi\left(\varepsilon\sqrt{\frac n\lambda}\right)
-\Phi\left(-\varepsilon\sqrt{\frac n\lambda}\right).
\end{aligned}
$$

##### 本番答案

$E[X_i]=\operatorname{Var}(X_i)=\lambda$なので$\sqrt n(\overline X_n-\lambda)/\sqrt\lambda\approx N(0,1)$。従って求める近似は$\Phi(\varepsilon\sqrt{n/\lambda})-\Phi(-\varepsilon\sqrt{n/\lambda})$。

##### 採点基準

平均分散4点、標準化8点、確率変形8点。合計20点。

<!-- solution-end -->

### P4T-B04 二項分布の連続補正
- level: B
- minutes: 15
- topics: 正規近似, 連続補正

$B\sim\operatorname{Bin}(400,0.3)$とする。二項分布$\operatorname{Bin}(n,p)$の平均$np$、分散$np(1-p)$を用いてよい。標準正規分布の累積分布関数を$\Phi$とするとき、$P(B\leq130)$を連続補正付き正規近似で表せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

平均と分散は
$$
np=120,
\qquad
np(1-p)=400\cdot0.3\cdot0.7=84.
$$
$B\leq130$は正規近似では境界を$130.5$へ補正するので
$$
P(B\leq130)
\approx
\Phi\left(\frac{130.5-120}{\sqrt{84}}\right).
$$

##### 本番答案

$E[B]=120$, $\operatorname{Var}(B)=84$。連続補正により$P(B\le130)\approx\Phi\{(130.5-120)/\sqrt{84}\}$。

##### 採点基準

平均分散6点、連続補正6点、標準化8点。合計20点。

<!-- solution-end -->

## Level C

### P4T-C01 ポアソン標本平均から推定
- level: C
- minutes: 25
- topics: 大数の法則, 中心極限定理, 不偏性

$\lambda>0$とする。独立な確率変数$X_1,\ldots,X_n$が
$$
P(X_i=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
で与えられるポアソン分布に従い、$E[X_i]=\operatorname{Var}(X_i)=\lambda$を用いてよいとする。標本平均を
$$
\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義する。標準正規分布の累積分布関数を$\Phi$とする。

1. $E[\overline X_n]$と$\operatorname{Var}(\overline X_n)$を求めよ。
2. $\overline X_n$が$\lambda$の不偏推定量であることを示せ。
3. $\overline X_n\xrightarrow{p}\lambda$をチェビシェフの不等式から示せ。
4. $\sqrt n(\overline X_n-\lambda)$の極限分布を求めよ。
5. $\lambda=4,n=100$で$P(|\overline X_n-4|\leq0.4)$を中心極限定理で近似せよ。さらに$T=\sum_iX_i$が整数値であることを利用した連続補正付き近似も示せ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)(2)5分、(3)5分、(4)5分、(5)5分、見直し2分。

##### 詳細解答

ポアソン分布の平均・分散はともに$\lambda$なので
$$
E[\overline X_n]=\lambda,
\qquad
\operatorname{Var}(\overline X_n)=\frac\lambda n.
$$
従って$\overline X_n$は$\lambda$の不偏推定量です。

任意の$\varepsilon>0$についてチェビシェフの不等式から
$$
P(|\overline X_n-\lambda|>\varepsilon)
\leq\frac{\lambda}{n\varepsilon^2}\to0,
$$
よって$\overline X_n\xrightarrow p\lambda$です。

中心極限定理より
$$
\frac{\sqrt n(\overline X_n-\lambda)}{\sqrt\lambda}
\xrightarrow dN(0,1),
$$
すなわち
$$
\sqrt n(\overline X_n-\lambda)
\xrightarrow dN(0,\lambda).
$$

$\lambda=4,n=100$では標本平均の近似標準偏差は
$$
\sqrt{\frac4{100}}=0.2.
$$
したがって連続補正を使わない中心極限定理の近似は
$$
P(|\overline X_n-4|\leq0.4)
\approx\Phi(2)-\Phi(-2)\approx0.9545.
$$
一方、$T=100\overline X_n\sim\operatorname{Poisson}(400)$であり、事象は$360\leq T\leq440$です。整数値に対する連続補正を入れると
$$
P(359.5<T<440.5)
\approx
\Phi(2.025)-\Phi(-2.025)
\approx0.9571.
$$

##### 本番答案

$E[\overline X_n]=\lambda$, $\operatorname{Var}(\overline X_n)=\lambda/n$より不偏。チェビシェフの不等式で$P(|\overline X_n-\lambda|>\varepsilon)\leq\lambda/(n\varepsilon^2)\to0$。また$\sqrt n(\overline X_n-\lambda)\to_dN(0,\lambda)$。$\lambda=4,n=100$では無補正近似$0.9545$、$T\sim\operatorname{Poisson}(400)$として連続補正すると$\Phi(2.025)-\Phi(-2.025)\approx0.9571$。

##### 採点基準と選択判断

平均分散4点、不偏性2点、一致性4点、中心極限定理4点、無補正近似3点、連続補正3点。合計20点。3分で平均分散が出れば選択し、15分で一致性まで進めば継続します。

<!-- solution-end -->

### P4T-C02 ベルヌーイ標本比率と漸近区間
- level: C
- minutes: 25
- topics: 大数の法則, 中心極限定理, Slutsky型

$0<p<1$とする。独立なベルヌーイ確率変数$X_1,\ldots,X_n$が
$$
P(X_i=1)=p,\qquad P(X_i=0)=1-p
$$
を満たすとする。標本比率を
$$
\widehat p=\overline X_n=\frac1n\sum_{i=1}^nX_i
$$
と定義する。

1. $E[\widehat p]$と$\operatorname{Var}(\widehat p)$を求めよ。
2. $\widehat p$が不偏であることを示せ。
3. $\widehat p\xrightarrow{p}p$を示せ。
4. $\widehat p\pm1.96\sqrt{\widehat p(1-\widehat p)/n}$が大標本で用いられる理由を、中心極限定理とSlutsky型の定理から説明せよ。
5. $n=400,\widehat p=0.3$で区間を数値化せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ベルヌーイ分布より
$$
E[\widehat p]=p,
\qquad
\operatorname{Var}(\widehat p)=\frac{p(1-p)}n.
$$
従って不偏です。また分散が0へ行くためチェビシェフの不等式から
$$
\widehat p\xrightarrow p p.
$$

中心極限定理により
$$
\frac{\sqrt n(\widehat p-p)}{\sqrt{p(1-p)}}
\xrightarrow dN(0,1).
$$
一致性と関数$x\mapsto\sqrt{x(1-x)}$の$p\in(0,1)$での連続性から
$$
\sqrt{\widehat p(1-\widehat p)}\xrightarrow p\sqrt{p(1-p)}.
$$
したがってSlutsky型の定理により
$$
\frac{\sqrt n(\widehat p-p)}{\sqrt{\widehat p(1-\widehat p)}}
\xrightarrow dN(0,1).
$$
標準正規分布で$P(|Z|\leq1.96)\approx0.95$なので、これを$p$について解けば
$$
\widehat p\pm1.96\sqrt{\frac{\widehat p(1-\widehat p)}n}
$$
を得ます。

$n=400,\widehat p=0.3$では
$$
1.96\sqrt{\frac{0.3\cdot0.7}{400}}
\approx0.0449,
$$
よって
$$
[0.2551,0.3449]
$$
です。

##### 本番答案

$E[\widehat p]=p$, $\operatorname{Var}(\widehat p)=p(1-p)/n$より不偏・一致。中心極限定理と$\widehat p\to_p p$、Slutsky型の定理から$\sqrt n(\widehat p-p)/\sqrt{\widehat p(1-\widehat p)}\to_dN(0,1)$。従って漸近95%区間は$\widehat p\pm1.96\sqrt{\widehat p(1-\widehat p)/n}$。数値は$[0.2551,0.3449]$。

##### 採点基準と選択判断

平均分散4点、不偏2点、一致3点、中心極限定理4点、Slutsky型3点、数値4点。合計20点。

<!-- solution-end -->

### P4T-C03 ポアソン和・最尤推定・正規近似
- level: C
- minutes: 25
- topics: ポアソン分布, 中心極限定理, 最尤推定

$\lambda>0$とする。独立な確率変数$X_1,\ldots,X_n$が
$$
P(X_i=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
で与えられるポアソン分布に従うとし、
$$
T_n=\sum_{i=1}^nX_i
$$
と定義する。標準正規分布の累積分布関数を$\Phi$とする。

1. $T_n$の分布を求めよ。
2. $T_n/n$の平均と分散を求めよ。
3. $T_n$の正規近似を書け。
4. 観測値$t_n>0$のとき$\lambda$の最尤推定量を導け。$t_n=0$の場合も母数空間$\lambda>0$の境界に注意して述べよ。
5. $n=50,\lambda=2$で$P(T_n\geq120)$を連続補正付き正規近似で求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ポアソン分布の再生性より
$$
T_n\sim\operatorname{Poisson}(n\lambda).
$$
従って
$$
E[T_n/n]=\lambda,
\qquad
\operatorname{Var}(T_n/n)=\frac\lambda n.
$$
また大標本では
$$
T_n\approx N(n\lambda,n\lambda).
$$

観測値$t_n=\sum_ix_i$に対する尤度は、$\lambda$に依存しない因子を除けば
$$
L(\lambda)\propto\lambda^{t_n}e^{-n\lambda}.
$$
$t_n>0$なら対数尤度は
$$
\ell(\lambda)=t_n\log\lambda-n\lambda+C,
$$
$$
\ell'(\lambda)=\frac{t_n}{\lambda}-n.
$$
従って
$$
\widehat\lambda=\frac{t_n}{n}.
$$
二階微分$\ell''(\lambda)=-t_n/\lambda^2<0$なので最大です。

$t_n=0$なら$L(\lambda)\propto e^{-n\lambda}$で$\lambda>0$上では単調減少し、$\lambda\downarrow0$で上限1へ近づくものの最大値を取らないため、母数空間$\lambda>0$内には最尤推定量が存在しません。

$n=50,\lambda=2$なら$T_n$の平均・分散はともに100です。連続補正から
$$
\begin{aligned}
P(T_n\geq120)
&\approx1-\Phi\left(\frac{119.5-100}{10}\right)\\
&=1-\Phi(1.95)\approx0.0256.
\end{aligned}
$$

##### 本番答案

$T_n\sim\operatorname{Poisson}(n\lambda)$、$E[T_n/n]=\lambda$, $\operatorname{Var}(T_n/n)=\lambda/n$、$T_n\approx N(n\lambda,n\lambda)$。$t_n>0$では$\ell'=t_n/\lambda-n=0$より$\widehat\lambda=t_n/n$。$t_n=0$では$\lambda>0$内に最大点なし。$n=50,\lambda=2$では$P(T_n\ge120)\approx1-\Phi(1.95)\approx0.0256$。

##### 採点基準と選択判断

和の分布4点、平均分散3点、正規近似3点、最尤推定6点、近似確率4点。合計20点。

<!-- solution-end -->

### P4T-C04 収束概念の反例
- level: C
- minutes: 24
- topics: 分布収束, 確率収束, 概収束

$X_1,X_2,\ldots$は独立で、各$n$について
$$
P(X_n=1)=P(X_n=-1)=\frac12
$$
とする。

1. $P(X=1)=P(X=-1)=1/2$を満たす確率変数$X$への分布収束を示せ。
2. $X_n$がどの確率変数へも確率収束しないことを示せ。
3. $X_n$が概収束しないことを示せ。
4. $X_n^2$の収束を述べよ。
5. 概収束・確率収束・分布収束の含意を整理せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

全ての$X_n$は同じRademacher分布をもつので、その分布をもつ任意の確率変数$X$に対し累積分布関数は最初から同一です。従って
$$
X_n\xrightarrow dX.
$$

一方、$n\neq m$では$X_n$と$X_m$が異符号となる確率が$1/2$なので
$$
P(|X_n-X_m|>1)=\frac12.
$$
もし$X_n\xrightarrow pY$となる確率変数$Y$が存在すれば、2.4節より$X_n$は確率Cauchyでなければなりません。しかし上式は$n,m\to\infty$でも0へ行かないため矛盾します。従って**どの確率変数へも**確率収束しません。

概収束するなら確率収束するので、上で確率収束しないことを示した時点で、概収束もしないことが従います。

一方
$$
X_n^2=1
$$
は恒等的なので、1へ概収束・確率収束・分布収束します。

含意は
$$
\text{概収束}\Rightarrow\text{確率収束}\Rightarrow\text{分布収束}
$$
で、逆は一般には成り立ちません。

##### 本番答案

各$X_n$の分布は同一なので同じRademacher分布へ分布収束。一方$n\neq m$で$P(|X_n-X_m|>1)=1/2$だから確率Cauchyでなく、どの確率変数へも確率収束しない。従って概収束もしない。$X_n^2\equiv1$は1へ三つ全ての意味で収束。概収束$\Rightarrow$確率収束$\Rightarrow$分布収束。

##### 採点基準と選択判断

分布収束4点、確率Cauchy反証7点、概収束3点、二乗3点、含意3点。合計20点。

<!-- solution-end -->

### P4T-C05 二項分布からポアソン分布への極限
- level: C
- minutes: 25
- topics: 二項分布, ポアソン近似

$\lambda>0$を固定し、$n\geq\lceil\lambda\rceil$とする。$B_n$は
$$
P(B_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k},\qquad k=0,\ldots,n
$$
で定まる二項分布に従うとする。また、平均$\lambda$のポアソン分布の確率質量関数は
$$
q(k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
である。

1. 固定した$k\in\mathbb N_0$について$P(B_n=k)$の極限を因子ごとに示せ。
2. $E[B_n]$と$\operatorname{Var}(B_n)$の極限を求めよ。
3. $P(B_n=0)$の極限を求めよ。
4. $\lambda=3,n=300$で$P(B_n\leq2)$をポアソン近似せよ。
5. この近似が有効になる条件を説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

固定した$k$について
$$
\begin{aligned}
P(B_n=k)
&=\binom nk\left(\frac\lambda n\right)^k
\left(1-\frac\lambda n\right)^{n-k}\\
&=\frac{\lambda^k}{k!}
\prod_{j=0}^{k-1}\left(1-\frac jn\right)
\left(1-\frac\lambda n\right)^n
\left(1-\frac\lambda n\right)^{-k}.
\end{aligned}
$$
各因子は順に
$$
1,\qquad e^{-\lambda},\qquad1
$$
へ収束するので
$$
P(B_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!}.
$$
従って$B_n\xrightarrow d\operatorname{Poisson}(\lambda)$です。

平均・分散は
$$
E[B_n]=\lambda,
$$
$$
\operatorname{Var}(B_n)=\lambda\left(1-\frac\lambda n\right)\to\lambda.
$$
また
$$
P(B_n=0)=\left(1-\frac\lambda n\right)^n\to e^{-\lambda}.
$$

$\lambda=3$では
$$
P(B_n\leq2)
\approx e^{-3}\left(1+3+\frac{3^2}{2}\right)
\approx0.4232.
$$

近似の本質的条件は、試行回数が大きく各試行の成功確率$p_n$が小さい一方、期待成功回数$np_n$が有限の正の値$\lambda$へ保たれることです。

##### 本番答案

確率質量関数を三因子に分けると$P(B_n=k)\to e^{-\lambda}\lambda^k/k!$。平均は$\lambda$、分散は$\lambda(1-\lambda/n)\to\lambda$、$P(B_n=0)\to e^{-\lambda}$。$\lambda=3$では$P(B_n\le2)\approx e^{-3}(1+3+9/2)\approx0.4232$。条件は$p_n\to0$, $np_n\to\lambda\in(0,\infty)$。

##### 採点基準と選択判断

因子分解8点、平均分散3点、0個確率2点、数値4点、条件3点。合計20点。

<!-- solution-end -->

## Level D

### P4T-D01 推定量の漸近評価
- level: D
- minutes: 30
- topics: 大数の法則, 中心極限定理, 一次Taylor展開

$\lambda>0$とする。独立な確率変数$X_1,\ldots,X_n$が
$$
P(X_i=k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
で与えられるポアソン分布に従い、$E[X_i]=\operatorname{Var}(X_i)=\lambda$を用いてよいとする。標本平均と変換を
$$
\widehat\lambda_n=\overline X_n=\frac1n\sum_{i=1}^nX_i,\qquad g(x)=\log(1+x)
$$
と定義する。

1. $\widehat\lambda_n\xrightarrow p\lambda$を示せ。
2. $\sqrt n(\widehat\lambda_n-\lambda)$の極限分布を求めよ。
3. 平均値の定理とSlutsky型の定理から$\sqrt n\{g(\widehat\lambda_n)-g(\lambda)\}$の極限分布を導け。
4. $\lambda=4,n=100$で$g(\widehat\lambda_n)$の近似分散を求めよ。
5. 上の近似に必要な仮定を列挙せよ。

<!-- solution-start -->

#### 解答

##### 時間配分

初動3分、(1)4分、(2)5分、(3)9分、(4)4分、(5)3分、見直し2分。

##### 詳細解答

大数の法則から
$$
\widehat\lambda_n=\overline X_n\xrightarrow p\lambda.
$$
中心極限定理から
$$
\sqrt n(\widehat\lambda_n-\lambda)
\xrightarrow dN(0,\lambda).
$$

平均値の定理により、$\widehat\lambda_n$と$\lambda$の間に$\xi_n$が存在して
$$
g(\widehat\lambda_n)-g(\lambda)
=g'(\xi_n)(\widehat\lambda_n-\lambda).
$$
一致性から$\xi_n\xrightarrow p\lambda$で、
$$
g'(x)=\frac1{1+x}
$$
は$x>-1$で連続なので
$$
g'(\xi_n)\xrightarrow p\frac1{1+\lambda}.
$$
従ってSlutsky型の定理より
$$
\sqrt n\{g(\widehat\lambda_n)-g(\lambda)\}
\xrightarrow dN\left(0,\frac{\lambda}{(1+\lambda)^2}\right).
$$

したがって大標本で
$$
\operatorname{Var}\{g(\widehat\lambda_n)\}
\approx\frac1n\frac{\lambda}{(1+\lambda)^2}.
$$
$\lambda=4,n=100$なら
$$
\frac4{100\cdot25}=0.0016.
$$

必要な仮定は、独立同分布、$E[X_i]=\lambda$と$0<\operatorname{Var}(X_i)=\lambda<\infty$、$\widehat\lambda_n$の一致性、$g$が$\lambda$近傍で微分可能で$g'$が$\lambda$で連続であることです。

##### 本番答案

大数の法則で$\widehat\lambda_n\to_p\lambda$、中心極限定理で$\sqrt n(\widehat\lambda_n-\lambda)\to_dN(0,\lambda)$。平均値の定理から$g(\widehat\lambda_n)-g(\lambda)=g'(\xi_n)(\widehat\lambda_n-\lambda)$、$g'(\xi_n)\to_p1/(1+\lambda)$なのでSlutsky型の定理より極限は$N\{0,\lambda/(1+\lambda)^2\}$。$\lambda=4,n=100$の近似分散は$0.0016$。

##### 採点基準と選択判断

一致性3点、中心極限定理4点、平均値の定理4点、Slutsky型4点、近似分散3点、仮定2点。合計20点。15分で平均値の定理の式まで進めば継続します。

<!-- solution-end -->

---

# 12. 30分ドリル

- id: P4T-DRILL-01
- level: C
- minutes: 30
- total: 100点

## 過去問傾向との対応

MATH-2017-Q1の標本平均モーメント・漸近評価を参考に、二項希少事象を一つの設定で独自に再構成しています。

## 問題

$\lambda>0$、$n\geq\lceil\lambda\rceil$とする。$B_n$は
$$
P(B_n=k)=\binom nk\left(\frac\lambda n\right)^k\left(1-\frac\lambda n\right)^{n-k},\qquad k=0,\ldots,n
$$
で定まる二項分布に従うとする。また、平均$\lambda$のポアソン分布の確率質量関数は
$$
q(k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k=0,1,2,\ldots
$$
である。

1. $E[B_n]$, $\operatorname{Var}(B_n)$と極限を求めよ。（20点）
2. 固定した$k$で$P(B_n=k)$が$\operatorname{Poisson}(\lambda)$の確率質量関数へ収束することを因子分解で示せ。（20点）
3. $B_n$の極限分布を述べよ。（20点）
4. $n=80,\lambda=1.5$で$P(B_n\geq5)$をポアソン近似せよ。（20点）
5. 有限$n$で近似誤差が生じる原因を因子分解に戻って説明し、正確な二項確率$0.01747$とポアソン近似値を比較せよ。（20点）

<!-- solution-start -->

### 解答

#### 詳細解答

平均と分散は
$$
E[B_n]=\lambda,
\qquad
\operatorname{Var}(B_n)=\lambda\left(1-\frac\lambda n\right)\to\lambda.
$$

固定した$k$では
$$
P(B_n=k)
=\frac{\lambda^k}{k!}
\prod_{j=0}^{k-1}\left(1-\frac jn\right)
\left(1-\frac\lambda n\right)^n
\left(1-\frac\lambda n\right)^{-k}.
$$
三因子が順に$1,e^{-\lambda},1$へ収束するため
$$
P(B_n=k)\to e^{-\lambda}\frac{\lambda^k}{k!},
$$
従って
$$
B_n\xrightarrow d\operatorname{Poisson}(\lambda).
$$

$n=80,\lambda=1.5$では
$$
\begin{aligned}
P(B_n\geq5)
&\approx1-e^{-1.5}\sum_{k=0}^4\frac{1.5^k}{k!}\\
&\approx0.01858.
\end{aligned}
$$
正確な二項確率が$0.01747$なので
$$
\text{ポアソン近似}-\text{正確値}
\approx0.00111.
$$
有限$n$では
$$
\prod_{j=0}^{k-1}(1-j/n),
\qquad
(1-\lambda/n)^n,
\qquad
(1-\lambda/n)^{-k}
$$
がそれぞれ極限値$1,e^{-\lambda},1$とまだ一致しないことが誤差の原因です。

#### 本番答案

$E[B_n]=\lambda$, $\operatorname{Var}(B_n)=\lambda(1-\lambda/n)\to\lambda$。確率質量関数を三因子へ分けると固定$k$で$e^{-\lambda}\lambda^k/k!$へ収束するため$B_n\to_d\operatorname{Poisson}(\lambda)$。$n=80,\lambda=1.5$では$P(B_n\ge5)\approx0.01858$、正確値$0.01747$との差は約$0.00111$。有限$n$では三因子が極限値へ到達していないため誤差が残る。

#### 採点基準・時間配分・選択判断

各小問20点。3分で平均分散、15分で確率質量関数の因子分解、25分でポアソン確率まで進めば継続します。第5問では数値差だけでなく、どの因子が極限値とずれるかを書くことを得点対象とします。

<!-- solution-end -->

---

# 13. 実過去問演習

問題文は転載せず、公式問題集の年度・科目・大問番号で参照します。

### PAST-P4T-01: MATH-2023-Q1

- 入手先: 統計検定公式問題集または公式過去問題ページ
- 現在解く範囲: ポアソン分布のモーメント、不偏性、一致性
- 後続章で再挑戦: 重み付き統計量の推定論的評価
- 答案確認: 独立性、平均・分散、一致性の根拠を式で書く。

### PAST-P4T-02: MATH-2017-Q1

- 入手先: 統計検定公式問題集
- 現在解く範囲: 標本平均のモーメントと漸近評価
- 復習先: 高次モーメントの詳細計算はP2-02
- 答案確認: 標準化の中心と尺度、どの収束を述べているかを明記する。

---

# 14. 復習チェック

- [ ] 確率収束の定義で「任意の$\varepsilon>0$」を書ける。
- [ ] 概収束と確率収束の違いを標本点固定の観点から説明できる。
- [ ] 分布収束では極限累積分布関数の連続点だけを要求する理由を認識している。
- [ ] 概収束$\Rightarrow$確率収束$\Rightarrow$分布収束を区別できる。
- [ ] 確率収束列が確率Cauchyになることを三角不等式から示せる。
- [ ] 有限分散の場合の弱大数則をチェビシェフの不等式から導出できる。
- [ ] 中心極限定理の独立同分布・有限正分散の仮定を確認できる。
- [ ] 標本平均と標本和で標準化の尺度を取り違えない。
- [ ] 二項分布の正規近似で$\pm1/2$の連続補正を入れられる。
- [ ] 二項分布のポアソン極限を確率質量関数の因子分解から再現できる。
- [ ] Slutsky型の定理で未知母数を一致推定量へ置換する根拠を説明できる。
- [ ] 平均値の定理から一次のデルタ法を再現できる。
