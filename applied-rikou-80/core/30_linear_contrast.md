# Core 30 線形結合・線形対比

- 安定ID: `RIKOU-CORE-30`
- 80大問 No.: 33
- 演習価値: A
- 難度: B
- 目安時間: 20〜25分
- 電卓: 四則演算・平方根までで完結

## 問題

4群の一元配置モデル

$$
Y_{ij}=\mu_i+\varepsilon_{ij},
\qquad \varepsilon_{ij}\overset{\mathrm{iid}}\sim N(0,\sigma^2)
$$

を考える。各群の標本数は5、標本平均は

$$
\bar y=(10,12,9,8),
$$

誤差分散の不偏推定値は $s^2=4$ とする。

1. $L=\mu_1+\mu_2-\mu_3-\mu_4$ が対比であることを確認し、対比条件の意味を説明せよ。
2. $\hat L$ とその標準誤差を求めよ。
3. $H_0:L=0$ の検定統計量が自由度16の $t$ 分布に従う理由を導き、統計量を求めよ。
4. $M=\mu_1-\mu_2+\mu_3-\mu_4$ とする。$L,M$ が直交対比であることを確認し、$\hat M$ と $\operatorname{Cov}(\hat L,\hat M)$ を求めよ。正規性の下で両推定量の独立性について述べよ。
5. 標本数が群ごとに異なる場合、2つの対比の直交条件が単なる係数ベクトルの内積0ではなくなることを示せ。

## 詳細解答

### 1. 対比条件とその意味

一般に

$$
L=\sum_{i=1}^a c_i\mu_i
$$

で、係数が

$$
\sum_{i=1}^a c_i=0
$$

を満たすとき、$L$ を **線形対比** と呼ぶ。

本問では係数が

$$
(1,1,-1,-1)
$$

なので

$$
1+1-1-1=0.
$$

したがって $L$ は対比である。

この条件の意味も確認する。全群平均を同じ定数 $a$ だけ平行移動して

$$
\mu_i' = \mu_i+a
$$

としても

$$
\sum_i c_i\mu_i'
=\sum_i c_i\mu_i+a\sum_i c_i
=L
$$

となる。つまり対比は絶対的な水準ではなく、群間の相対的な差だけを表す。

---

### 2. 推定量と標準誤差

各群の標本平均

$$
\bar Y_i=\frac15\sum_{j=1}^5Y_{ij}
$$

について

$$
E[\bar Y_i]=\mu_i,
\qquad
\operatorname{Var}(\bar Y_i)=\frac{\sigma^2}{5}.
$$

異なる群は独立だから

$$
\hat L=\bar Y_1+\bar Y_2-\bar Y_3-\bar Y_4
$$

は不偏で、

$$
\begin{aligned}
\operatorname{Var}(\hat L)
&=\frac{\sigma^2}{5}
(1^2+1^2+(-1)^2+(-1)^2)\\
&=\frac{4\sigma^2}{5}.
\end{aligned}
$$

観測値から

$$
\boxed{\hat L=10+12-9-8=5}.
$$

$\sigma^2$ を $s^2=4$ で置き換えると推定標準誤差は

$$
\boxed{
SE(\hat L)
=\sqrt{\frac{4s^2}{5}}
=\sqrt{\frac{16}{5}}
}.
$$

---

### 3. なぜ $t_{16}$ になるのか

ここは

$$
t=\frac{\hat L}{SE(\hat L)}\sim t_{16}
$$

を公式として置かず、分子と分母を分けて確認する。

正規標本の線形結合なので

$$
\hat L\sim N\left(L,\frac{4\sigma^2}{5}\right).
$$

帰無仮説 $H_0:L=0$ の下では

$$
Z
=\frac{\hat L}{\sigma\sqrt{4/5}}
\sim N(0,1).
$$

一方、一元配置モデルの誤差平方和を $SSE$ とすると、4群それぞれで標本平均を1個推定するため誤差自由度は

$$
20-4=16.
$$

正規一元配置モデルでは、群平均ベクトルと群内残差は直交する正規成分なので独立であり、Cochran の定理から

$$
\frac{SSE}{\sigma^2}\sim\chi^2_{16}.
$$

また

$$
s^2=MSE=\frac{SSE}{16}
$$

だから

$$
U=\frac{16s^2}{\sigma^2}\sim\chi^2_{16}.
$$

さらに $Z$ と $U$ は独立である。

Student の $t$ 分布の定義

$$
\frac{Z}{\sqrt{U/16}}\sim t_{16}
$$

を使うと

$$
\begin{aligned}
\frac{Z}{\sqrt{U/16}}
&=
\frac{\hat L/(\sigma\sqrt{4/5})}{s/\sigma}\\
&=
\frac{\hat L}{s\sqrt{4/5}}.
\end{aligned}
$$

したがって

$$
\boxed{
T
=\frac{\hat L}{\sqrt{4s^2/5}}
\sim t_{16}
\qquad(H_0)
}.
$$

本問では

$$
\boxed{
T=\frac{5}{\sqrt{16/5}}
}.
$$

この導出で重要なのは、単に分散を推定したから $t$ になるのではなく、

1. 標準化した対比推定量が標準正規、
2. 独立な分散推定量がカイ二乗、
3. その比が $t$

という3段である。

---

### 4. 直交対比と独立性

$M$ の係数は

$$
(1,-1,1,-1)
$$

で、係数和は0だから $M$ も対比である。

等標本数 $n_i=5$ の場合、

$$
\hat L=\sum_i c_i\bar Y_i,
\qquad
\hat M=\sum_i d_i\bar Y_i
$$

の共分散は

$$
\begin{aligned}
\operatorname{Cov}(\hat L,\hat M)
&=\sum_i c_id_i\operatorname{Var}(\bar Y_i)\\
&=\frac{\sigma^2}{5}\sum_i c_id_i.
\end{aligned}
$$

したがって、等標本数では

$$
\sum_i c_id_i=0
$$

が直交条件になる。

本問では

$$
(1,1,-1,-1)\cdot(1,-1,1,-1)
=1-1-1+1=0.
$$

よって

$$
\boxed{\operatorname{Cov}(\hat L,\hat M)=0}.
$$

推定値は

$$
\boxed{\hat M=10-12+9-8=-1}.
$$

群平均ベクトル

$$
(\bar Y_1,\ldots,\bar Y_4)^\top
$$

は多変量正規であり、$\hat L,\hat M$ はその線形変換なので同時正規。したがって

$$
\operatorname{Cov}(\hat L,\hat M)=0
$$

から

$$
\boxed{\hat L\perp\hat M}
$$

が従う。

---

### 5. 不等標本数では何が変わるか

群 $i$ の標本数を $n_i$ とすると

$$
\operatorname{Var}(\bar Y_i)=\frac{\sigma^2}{n_i}.
$$

したがって

$$
\begin{aligned}
\operatorname{Cov}(\hat L,\hat M)
&=\sum_i c_id_i\frac{\sigma^2}{n_i}\\
&=\sigma^2\sum_i\frac{c_id_i}{n_i}.
\end{aligned}
$$

よって一般の直交条件は

$$
\boxed{
\sum_i\frac{c_id_i}{n_i}=0
}.
$$

全ての $n_i$ が同じ $n$ なら

$$
\sum_i\frac{c_id_i}{n}
=\frac1n\sum_i c_id_i
$$

なので、初めて単純な係数内積0へ簡約される。

したがって「係数ベクトルの内積0が直交条件」というのは **等標本数の場合の特殊形** である。

## 本番答案

係数和

$$
1+1-1-1=0
$$

より $L$ は対比。

$$
\hat L=5,
\qquad
\operatorname{Var}(\hat L)=\frac{4\sigma^2}{5},
\qquad
SE=\sqrt{16/5}.
$$

$H_0$ では

$$
Z=\frac{\hat L}{\sigma\sqrt{4/5}}\sim N(0,1),
$$

一方

$$
16s^2/\sigma^2\sim\chi^2_{16}
$$

で両者は独立だから

$$
\boxed{T=5/\sqrt{16/5}\sim t_{16}}.
$$

$M$ も係数和0。等標本数なので

$$
\operatorname{Cov}(\hat L,\hat M)
=\frac{\sigma^2}{5}\sum c_id_i=0,
$$

かつ

$$
\hat M=-1.
$$

正規性から無相関なら独立。不等標本数では直交条件は

$$
\sum_i c_id_i/n_i=0
$$

となる。

## 採点基準

- (1) 対比条件と平行移動不変性: 3点
- (2) 推定値・分散・標準誤差: 4点
- (3) 正規分子＋独立なカイ二乗分母から $t_{16}$ を導出: 6点
- (4) 直交条件・共分散・正規性から独立: 4点
- (5) 不等標本数での一般直交条件: 3点

20分経過時は「係数和0」「対比の分散」「正規÷独立カイ二乗→$t$」の3段を優先する。
