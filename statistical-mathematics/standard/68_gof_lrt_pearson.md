# Standard 22 適合度LRT・Pearson・自由度

- 旧No.: 68
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎・修正済（対数の数値評価不要）

## 問題

4カテゴリ多項分布で

$$
p(\theta)=\left(\frac\theta2,\frac\theta2,\frac{1-\theta}{2},\frac{1-\theta}{2}\right),
\qquad0<\theta<1
$$

とする。観測度数は $(20,10,30,40)$。

1. $\theta$ のMLEを求めよ。
2. 期待度数を求め、Pearson統計量を計算せよ。
3. LRT統計量を書け。対数は数値化しなくてよい。
4. Pearson統計量とLRT統計量の漸近自由度を、使う定理の条件とともに求めよ。

## 詳細解答

### 1. MLE

定数を除く対数尤度は

$$
\ell(\theta)
=(x_1+x_2)\log\theta+(x_3+x_4)\log(1-\theta)+C.
$$

したがって

$$
\ell'(\theta)
=\frac{x_1+x_2}{\theta}-\frac{x_3+x_4}{1-\theta}.
$$

$\ell'(\theta)=0$ より

$$
\boxed{
\widehat\theta=\frac{x_1+x_2}{n}=30/100=0.3
}.
$$

$0<\widehat\theta<1$ で、

$$
\ell''(\theta)<0
$$

だから内部最大点である。

### 2. Pearson統計量

帰無モデルをMLEで当てはめたセル確率は

$$
\widehat p=(0.15,0.15,0.35,0.35),
$$

従って期待度数は

$$
(E_1,E_2,E_3,E_4)=(15,15,35,35).
$$

Pearson統計量は

$$
\begin{aligned}
X^2
&=\sum_{i=1}^4\frac{(O_i-E_i)^2}{E_i}\\
&=\frac{25}{15}+\frac{25}{15}+\frac{25}{35}+\frac{25}{35}\\
&=\boxed{\frac{100}{21}}.
\end{aligned}
$$

### 3. LRT

帰無モデルでの適合期待度数を $E_i=n\widehat p_i$ とすれば、飽和多項モデルとの尤度比統計量は

$$
\boxed{
G^2=2\sum_{i=1}^4O_i\log\frac{O_i}{E_i}
}.
$$

$O_i=0$ の項は極限として0と扱う。

### 4. 漸近カイ二乗分布と自由度

Pearson統計量には **母数推定を伴うPearson適合度統計量のカイ二乗極限定理**、LRTには **Wilksの定理**を用いる。

本問で条件を確認する。

- カテゴリ数4は固定。
- 真の $\theta$ は $0<\theta<1$ の内部点。
- このとき4セル確率は全て正なので、各期待度数 $np_i(\theta)$ は $n\to\infty$ で発散する。
- $p(\theta)$ は $\theta$ について滑らかで、

$$
\frac{dp}{d\theta}
=\left(\frac12,\frac12,-\frac12,-\frac12\right)
$$

は0でないので、推定される局所母数の次元は1。
- 多項確率には総和1という1本の制約があるため、飽和モデルの自由次元は $4-1=3$。

従って帰無モデルの次元1をさらに差し引き

$$
\boxed{df=(4-1)-1=2}.
$$

以上の正則条件の下で

$$
\boxed{X^2\Rightarrow\chi^2_2},
\qquad
\boxed{G^2\Rightarrow\chi^2_2}.
$$

もし真の $\theta$ が0または1の境界にあるとセル確率0が生じ、通常の内部点カイ二乗近似の条件が壊れる。

## 本番答案

スコア方程式から

$$
\hat\theta=(x_1+x_2)/n=0.3.
$$

従って期待度数は $(15,15,35,35)$、

$$
X^2=\frac{100}{21},
\qquad
G^2=2\sum_iO_i\log(O_i/E_i).
$$

真の $\theta$ は $(0,1)$ の内部、全セル確率正、固定4カテゴリ、モデルは滑らかで推定母数の局所次元は1。よって **Pearsonのカイ二乗極限定理**および **Wilksの定理**を適用でき、

$$
df=(4-1)-1=2,
\quad
X^2,G^2\Rightarrow\chi^2_2.
$$

## 採点基準

- MLE: 4点
- 期待度数: 4点
- Pearson統計量: 5点
- LRT: 3点
- 定理名・内部点・正セル確率・自由度: 4点
