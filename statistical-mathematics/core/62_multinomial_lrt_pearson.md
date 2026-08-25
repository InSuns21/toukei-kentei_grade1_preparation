# Core 09 多項分布LRTとPearson適合度

- 旧No.: 62
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数は数値化不要）

## 問題

$(X_1,X_2,X_3)\sim\operatorname{Multinomial}(60;p_1,p_2,p_3)$ とする。

$$
H_0:(p_1,p_2,p_3)=\left(\frac12,\frac13,\frac16\right)
$$

を検定する。観測度数は

$$
(x_1,x_2,x_3)=(27,21,12)
$$

であった。

1. 制約なしMLEを求めよ。
2. LRT統計量$G^2$を求めよ。対数は式のままでよい。
3. Pearson統計量$X_P^2$を求めよ。
4. 両統計量の漸近自由度を答えよ。
5. 一般に$G^2-X_P^2=o_p(1)$となる理由を説明せよ。

## 詳細解答

### 1. 制約なしMLE

定数を除く対数尤度は

$$
\ell(p)=\sum_{j=1}^3X_j\log p_j,
\qquad \sum_jp_j=1.
$$

Lagrange乗数 $\nu$ を用いると

$$
\frac{X_j}{p_j}-\nu=0
\quad\Rightarrow\quad
p_j=\frac{X_j}{\nu}.
$$

和を取れば $1=60/\nu$ なので $\nu=60$。従って

$$
\boxed{\widehat p_j=X_j/60}.
$$

### 2・3. 二つの統計量

帰無仮説下の期待度数は

$$
(E_1,E_2,E_3)=(30,20,10).
$$

従って

$$
\boxed{
G^2
=2\left[
27\log\frac{27}{30}
+21\log\frac{21}{20}
+12\log\frac{12}{10}
\right]
}.
$$

Pearson統計量は

$$
X_P^2
=\frac{(-3)^2}{30}+\frac{1^2}{20}+\frac{2^2}{10}
=\boxed{\frac34}.
$$

### 4. 漸近カイ二乗分布の定理と条件

LRTについて使うのは **Wilks の定理**である。正則モデルで、真の母数が帰無モデルの内部点にあり、識別可能で、次元が固定なら

$$
-2\log\Lambda\Rightarrow\chi^2_{d_1-d_0}
$$

となる。

本問では

- 区分数3は固定。
- 帰無確率 $1/2,1/3,1/6$ はすべて正なので単体の内部点にある。
- 多項モデルはこの点の近傍で滑らかかつ識別可能。
- 非制約モデルの自由次元は $3-1=2$、帰無モデルは点仮説なので次元0。

したがって

$$
\boxed{G^2\Rightarrow\chi^2_2}.
$$

Pearson統計量については **Pearson適合度統計量のカイ二乗極限定理**を使う。固定区分数で全ての帰無確率が正、すなわち各期待度数 $np_j\to\infty$ が条件である。本問は全 $p_j>0$ なので $n\to\infty$ で条件を満たし、

$$
\boxed{X_P^2\Rightarrow\chi^2_2}.
$$

### 5. 漸近同値

$D_j=X_j-E_j$ とすると、多項CLTより固定 $j$ で

$$
D_j=O_p(\sqrt n).
$$

また $E_j=np_j=O(n)$ かつ $p_j>0$ なので

$$
u_j=\frac{D_j}{E_j}=O_p(n^{-1/2}).
$$

$\log(1+u)=u-u^2/2+O(u^3)$ を使うと

$$
\begin{aligned}
G^2
&=2\sum_j(E_j+D_j)\log(1+D_j/E_j)\\
&=2\sum_jD_j+\sum_j\frac{D_j^2}{E_j}+o_p(1).
\end{aligned}
$$

$\sum_jD_j=0$ だから

$$
\boxed{G^2=X_P^2+o_p(1)}.
$$

## 本番答案

Lagrange法から $\hat p_j=X_j/60$、$E=(30,20,10)$。

$$
G^2=2\left[27\log\frac{27}{30}+21\log\frac{21}{20}+12\log\frac{12}{10}\right],
$$

$$
X_P^2=3/4.
$$

帰無確率は全て正で、固定3区分の正則多項モデル、真値は単体内部にある。したがって **Wilksの定理**から $G^2\Rightarrow\chi^2_2$。同じ正確率条件で期待度数が発散するので **Pearsonのカイ二乗極限定理**から $X_P^2\Rightarrow\chi^2_2$。

さらに $D_j/E_j=O_p(n^{-1/2})$ とTaylor展開、$\sum D_j=0$ より

$$
G^2=X_P^2+o_p(1).
$$

## 採点基準

- MLE: 3点
- LRT: 5点
- Pearson統計量: 4点
- 漸近自由度（定理名・条件確認）: 3点
- 漸近同値: 5点
