# Standard 26 Bonferroni・Scheffé多重比較

- 旧No.: 83
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

## 問題

1. $m$ 個の仮説を家族内有意水準 $\alpha$ で検定するとき、Bonferroni法の個別有意水準を、保証の根拠とともに述べよ。
2. 4群の平均を $\mu_1,\mu_2,\mu_3,\mu_4$ とする。次の線形結合がコントラストか判定し、意味を説明せよ。

$$
\mu_1-\mu_2,
\qquad
\mu_1-\frac{\mu_2+\mu_3+\mu_4}{3},
\qquad
\mu_1+\mu_2.
$$

3. 独立な誤差 $\varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)$ を持つ $g$ 群固定効果一元配置モデルで、任意のコントラスト

$$
L=\sum_{i=1}^g c_i\mu_i,
\qquad
\sum_i c_i=0
$$

を考える。推定量 $\widehat L=\sum_i c_i\bar Y_i$ の分散を求めよ。
4. Scheffé法が全コントラストを同時保証できる理由を説明し、

$$
\widehat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}}
$$

を導け。ただし $N=\sum_i n_i$、$MSE=SSE/(N-g)$ とする。
5. BonferroniとSchefféがそれぞれ向く状況を、保証対象の違いも含めて説明せよ。

## 詳細解答

### 1. Bonferroni法

各仮説 $H_i$ について、第1種過誤の事象を $A_i$ とする。

少なくとも1つ第1種過誤を起こす確率

$$
FWER=P\left(\bigcup_{i=1}^m A_i\right)
$$

を家族内誤差率という。

Bonferroniの不等式

$$
P\left(\bigcup_{i=1}^mA_i\right)
\le\sum_{i=1}^mP(A_i)
$$

には $A_i$ 同士の独立性を必要としない。

したがって各検定の個別有意水準を $\alpha_i$ として

$$
\sum_{i=1}^m\alpha_i\le\alpha
$$

とすれば

$$
FWER\le\sum_i\alpha_i\le\alpha.
$$

特に均等に割り当てるなら

$$
\boxed{\alpha_i=\alpha/m}
$$

でよい。

### 2. コントラストとは何か

群平均の線形結合

$$
L=\sum_{i=1}^g c_i\mu_i
$$

で

$$
\boxed{\sum_{i=1}^g c_i=0}
$$

を満たすものを **コントラスト（contrast）** という。

コントラストは、平均水準そのものではなく **群と群の差** を表す。

例えば

$$
\mu_1-\mu_2
$$

は係数 $(1,-1,0,0)$ の和が0なのでコントラストであり、第1群と第2群の平均差を表す。

また

$$
\mu_1-\frac{\mu_2+\mu_3+\mu_4}{3}
$$

も係数和が

$$
1-\frac13-\frac13-\frac13=0
$$

なのでコントラストである。これは「第1群」と「第2〜4群の平均」を比較している。

一方

$$
\mu_1+\mu_2
$$

は係数和が2なのでコントラストではない。

#### なぜ係数和0なのか

すべての群平均に同じ定数 $a$ を加えて

$$
\mu_i'=\mu_i+a
$$

とすると

$$
\sum_i c_i\mu_i'
=
\sum_i c_i\mu_i+a\sum_i c_i.
$$

コントラストなら $\sum_i c_i=0$ なので

$$
\sum_i c_i\mu_i'=\sum_i c_i\mu_i.
$$

したがって、全群を同じだけ持ち上げても値が変わらない。これが「絶対的な平均水準ではなく群間の差だけを見る」という意味である。

### 3. コントラスト推定量の分散

各群平均について

$$
\bar Y_i\sim N\left(\mu_i,\frac{\sigma^2}{n_i}\right)
$$

であり、異なる群は独立である。

したがって

$$
\widehat L=\sum_i c_i\bar Y_i
$$

について

$$
Var(\widehat L)
=
\sum_i c_i^2Var(\bar Y_i)
=
\boxed{\sigma^2\sum_i\frac{c_i^2}{n_i}}.
$$

固定した1本のコントラストだけを見るなら、標準誤差は

$$
\sigma\sqrt{\sum_i\frac{c_i^2}{n_i}}
$$

である。

Scheffé法のポイントは、1本だけでなく **係数和0のすべてのコントラスト** を同時に扱うことである。

### 4. なぜSchefféで $g-1$ と $F$ 分布が出るのか

まず

$$
Z_i=\frac{\sqrt{n_i}(\bar Y_i-\mu_i)}{\sigma}
$$

とおくと

$$
Z_1,\dots,Z_g\overset{\mathrm{iid}}\sim N(0,1).
$$

また

$$
\widehat L-L
=
\sigma\sum_i\frac{c_i}{\sqrt{n_i}}Z_i.
$$

ここで

$$
a_i=\frac{c_i}{\sqrt{n_i}}
$$

とおくと、コントラスト条件 $\sum_i c_i=0$ は

$$
\sum_i\sqrt{n_i}a_i=0
$$

となる。

つまり $a=(a_1,\dots,a_g)^\top$ は、$g$ 次元空間の中の1本の線形制約を満たす部分空間を動く。この部分空間の次元は

$$
\boxed{g-1}
$$

である。

さらに

$$
\frac{(\widehat L-L)^2}
{\sigma^2\sum_i c_i^2/n_i}
=
\frac{(a^\top Z)^2}{a^\top a}.
$$

全コントラストについて最大化すると、Cauchy--Schwarzの不等式より

$$
\sup_a\frac{(a^\top Z)^2}{a^\top a}
=
\|P_SZ\|^2,
$$

となる。ここで $P_S$ は上の $g-1$ 次元部分空間への直交射影である。

標準正規ベクトルを $g-1$ 次元部分空間へ射影した平方ノルムだから

$$
\boxed{
\sup_{\sum_i c_i=0}
\frac{(\widehat L-L)^2}
{\sigma^2\sum_i c_i^2/n_i}
\sim\chi^2_{g-1}
}.
$$

一方、一元配置正規モデルでは

$$
\frac{(N-g)MSE}{\sigma^2}\sim\chi^2_{N-g}
$$

であり、上の量と $MSE$ は独立である。

したがって

$$
\boxed{
\frac{1}{g-1}
\sup_{\sum_i c_i=0}
\frac{(\widehat L-L)^2}
{MSE\sum_i c_i^2/n_i}
\sim F_{g-1,N-g}
}.
$$

よって確率 $1-\alpha$ で、すべてのコントラストについて同時に

$$
\frac{(\widehat L-L)^2}
{MSE\sum_i c_i^2/n_i}
\le
(g-1)F_{g-1,N-g;1-\alpha}
$$

が成り立つ。

ここから信頼区間の形まで式を追う。右辺の平方根を

$$
C
=
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}}
$$

と置くと $C\ge0$ であり、上の不等式は

$$
(\widehat L-L)^2\le C^2
$$

と同値である。したがって

$$
|\widehat L-L|\le C,
$$

すなわち

$$
-C\le\widehat L-L\le C.
$$

両辺を $L$ について解けば

$$
\widehat L-C\le L\le\widehat L+C.
$$

よって Scheffé の同時信頼区間は

$$
\boxed{
\widehat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}}
}
$$

となる。

特に $g=4$ なら係数は

$$
\sqrt{3F_{3,N-4;1-\alpha}}
$$

である。

### 5. 使い分け

Bonferroniは、事前に有限個の比較が決まっている場合に使いやすい。

例えば

$$
\mu_1-\mu_2,
\quad
\mu_1-\mu_3,
\quad
\mu_1-\mu_4
$$

の3比較だけを見たいなら、各検定を水準 $\alpha/3$ で行えばよい。

一方Schefféは

$$
\mu_1-\frac{\mu_2+\mu_3+\mu_4}{3}
$$

や

$$
\frac{\mu_1+\mu_2}{2}-\frac{\mu_3+\mu_4}{2}
$$

などを含む **全コントラストを一括して保証したい場合** に向く。

Bonferroniは検定間の独立性を必要とせず柔軟だが、比較数 $m$ が増えると保守的になりやすい。Schefféは正規・等分散の線形モデルを前提とするが、事前に比較を列挙しなくても全コントラストを同時保証できる。

## 本番答案

Bonferroniの不等式

$$
P(\cup_iA_i)\le\sum_iP(A_i)
$$

は独立性を仮定しない。よって各検定を水準 $\alpha/m$ で行えば $FWER\le\alpha$。

コントラストとは

$$
L=\sum_i c_i\mu_i,
\qquad\sum_i c_i=0
$$

を満たす群平均の線形結合であり、群間の差を表す。

$$
Var(\widehat L)=\sigma^2\sum_i\frac{c_i^2}{n_i}.
$$

コントラスト空間は $g-1$ 次元なので、全コントラストについて標準化誤差を最大化すると

$$
\frac{1}{g-1}
\sup_{\sum_i c_i=0}
\frac{(\widehat L-L)^2}
{MSE\sum_i c_i^2/n_i}
\sim F_{g-1,N-g}.
$$

したがってScheffé同時信頼区間は

$$
\widehat L
\pm
\sqrt{(g-1)F_{g-1,N-g;1-\alpha}}
\sqrt{MSE\sum_i\frac{c_i^2}{n_i}}.
$$

有限個の事前比較はBonferroni、全コントラストを同時保証したい場合はSchefféが向く。

## 採点基準

- Bonferroni閾値・家族内誤差率・Bonferroniの不等式: 4点
- コントラストの定義と係数和0の意味: 4点
- $Var(\widehat L)$ の導出: 3点
- $g-1$ 次元となる理由: 3点
- 最大化から $\chi^2$、$F$ 分布へ進む流れ: 4点
- BonferroniとSchefféの使い分け: 2点
