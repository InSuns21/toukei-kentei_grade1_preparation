# Core 11 一般線形仮説・partial F

- 旧No.: 80
- 演習価値: S
- 難度: S
- 目安時間: 25分
- 手計算監査: ○

## 問題

正規線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

で、$X$ は列フルランク、フルモデルの母数数を $p=4$、標本数を $n=20$ とする。階数 $q=2$ の線形制約 $R\beta=r$ を課した制約モデルと比較したところ

$$
SSE_F=60,
\qquad
SSE_R=80
$$

であった。

1. 一般線形仮説の partial F 統計量を書け。
2. この例の $F$ 値と自由度を求めよ。
3. なぜ分子が「追加平方和」になるか説明せよ。
4. 正規誤差の下で $F$ 分布が出る理由を、使う定理の条件と射影の観点から説明せよ。

---

## まず何を検定しているのか

この問題で最初に押さえるべきなのは、

$$
H_0:R\beta=r
$$

が「回帰係数に対する複数の線形な条件をまとめて検定する」書き方だという点である。

たとえば

$$
\beta=
\begin{pmatrix}
\beta_0\\
\beta_1\\
\beta_2\\
\beta_3
\end{pmatrix}
$$

に対して

$$
H_0:\beta_2=0,\quad \beta_3=0
$$

を同時に検定したいとする。このとき

$$
R=
\begin{pmatrix}
0&0&1&0\\
0&0&0&1
\end{pmatrix},
\qquad
r=
\begin{pmatrix}
0\\
0
\end{pmatrix}
$$

と置けば

$$
R\beta=r
$$

と書ける。

$R$ の階数を

$$
\operatorname{rank}(R)=q
$$

とすると、独立な線形制約が $q$ 個あることを意味する。

本問では $q=2$ なので、独立な制約が2個課されている。

---

## フルモデルと制約モデル

### フルモデル

制約を課さず、$p$ 個の回帰係数をすべて自由に推定するモデルをフルモデルと呼ぶ。

最小二乗推定量は

$$
\hat\beta=(X^\top X)^{-1}X^\top y
$$

であり、残差平方和は

$$
SSE_F
=
\|y-X\hat\beta\|^2.
$$

### 制約モデル

一方、

$$
R\beta=r
$$

を満たす範囲だけで最小二乗法を行うモデルを制約モデルと呼ぶ。

その残差平方和を

$$
SSE_R
$$

とする。

制約モデルでは選べる $\beta$ の範囲が狭いので、フルモデルより良い当てはめをすることはできない。したがって必ず

$$
\boxed{SSE_F\le SSE_R}
$$

となる。

このため

$$
SSE_R-SSE_F\ge0
$$

である。

---

## なぜ $SSE_R-SSE_F$ が「追加平方和」なのか

フルモデルでは、制約モデルで禁止されていた方向にも回帰係数を動かせる。

その結果、残差平方和が

$$
SSE_R
$$

から

$$
SSE_F
$$

まで減少する。

したがって

$$
\boxed{SSE_R-SSE_F}
$$

は、制約を外したことによって新たに説明できた平方和である。

たとえば

$$
H_0:\beta_2=\beta_3=0
$$

なら、$\beta_2,\beta_3$ を自由にしたことで残差平方和がどれだけ減ったかを測っている。

これが「追加平方和」の意味である。

---

## なぜ追加平方和の自由度が $q$ なのか

$\beta\in\mathbb R^p$ に対して

$$
R\beta=r,
\qquad
\operatorname{rank}(R)=q
$$

という $q$ 個の独立な制約を課す。

階数・退化次数の関係から、制約を満たす $\beta$ の自由度は

$$
p-q
$$

である。

したがって、制約を外したときに増える自由度は

$$
p-(p-q)=q.
$$

よって追加平方和

$$
SSE_R-SSE_F
$$

の自由度は

$$
\boxed q
$$

となる。

なお、$r=0$ なら制約集合は線形部分空間である。一般の $r\ne0$ ではアフィン部分空間になるが、帰無仮説を満たす一点を基準に平行移動すれば同じ次元・直交分解の議論ができる。

---

## なぜ平方和を自由度で割るのか

partial $F$ 統計量は

$$
F=
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
$$

である。

分子・分母ともに「平方和を自由度で割った平均平方」になっている。

### 分子

追加平方和の自由度は $q$ なので

$$
MS_H
=
\frac{SSE_R-SSE_F}{q}.
$$

これは

> 制約を1自由度外したあたり、どれだけ残差平方和が改善したか

を表す。

### 分母

フルモデルでは $n$ 個の観測から $p$ 個の回帰係数を推定するので、残差自由度は

$$
n-p.
$$

したがって

$$
MSE
=
\frac{SSE_F}{n-p}.
$$

これは誤差分散 $\sigma^2$ の不偏推定量である。

したがって partial $F$ は

$$
\boxed{
F
=
\frac{\text{制約を外した1自由度あたりの改善}}
{\text{通常の誤差1自由度あたり}}
}
$$

と読むことができる。

帰無仮説が正しければ、制約を外しても本質的にはノイズに合わせ込んでいるだけなので、この比は極端には大きくならない。逆に $F$ が非常に大きければ、制約を外したことで誤差以上の大きな改善が起きたと考え、帰無仮説を疑う。

---

## 制約付き最小二乗と追加平方和の式

ここが一般線形仮説と追加平方和を結び付ける中心部分である。

制約なし最小二乗推定量は

$$
\hat\beta=(X^\top X)^{-1}X^\top y.
$$

制約

$$
R\beta=r
$$

の下で

$$
\|y-X\beta\|^2
$$

を最小化する。

ラグランジュ乗数 $\lambda$ を使って

$$
L(\beta,\lambda)
=
(y-X\beta)^\top(y-X\beta)
+2\lambda^\top(R\beta-r)
$$

と置く。

$\beta$ で微分して0と置くと

$$
-2X^\top(y-X\beta)+2R^\top\lambda=0.
$$

したがって

$$
X^\top X\beta
=X^\top y-R^\top\lambda
$$

より

$$
\beta
=\hat\beta-(X^\top X)^{-1}R^\top\lambda.
$$

これを制約 $R\beta=r$ に代入すると

$$
R\hat\beta
-R(X^\top X)^{-1}R^\top\lambda
=r.
$$

よって

$$
\lambda
=
\left[R(X^\top X)^{-1}R^\top\right]^{-1}
(R\hat\beta-r).
$$

したがって制約付き最小二乗推定量は

$$
\boxed{
\hat\beta_R
=
\hat\beta
-(X^\top X)^{-1}R^\top
\left[R(X^\top X)^{-1}R^\top\right]^{-1}
(R\hat\beta-r)
}.
$$

この式から計算すると、制約によって増えた残差平方和は

$$
\boxed{
SSE_R-SSE_F
=
(R\hat\beta-r)^\top
\left[R(X^\top X)^{-1}R^\top\right]^{-1}
(R\hat\beta-r)
}.
$$

つまり追加平方和は、帰無仮説からのずれ

$$
R\hat\beta-r
$$

を、その分散で標準化した二次形式そのものである。

---

## なぜ追加平方和がカイ二乗分布になるのか

正規線形モデルでは

$$
\hat\beta
\sim
N_p\left(
\beta,
\sigma^2(X^\top X)^{-1}
\right).
$$

帰無仮説

$$
H_0:R\beta=r
$$

の下では

$$
R\hat\beta-r
=R(\hat\beta-\beta).
$$

したがって

$$
R\hat\beta-r
\sim
N_q\left(
0,
\sigma^2R(X^\top X)^{-1}R^\top
\right).
$$

一般に

$$
Z\sim N_q(0,\sigma^2V)
$$

なら

$$
\frac{Z^\top V^{-1}Z}{\sigma^2}
\sim\chi^2_q.
$$

ここで

$$
Z=R\hat\beta-r,
\qquad
V=R(X^\top X)^{-1}R^\top
$$

と置けば

$$
\frac{
(R\hat\beta-r)^\top
\left[R(X^\top X)^{-1}R^\top\right]^{-1}
(R\hat\beta-r)
}{\sigma^2}
\sim\chi^2_q.
$$

上で示した追加平方和の式より

$$
\boxed{
\frac{SSE_R-SSE_F}{\sigma^2}
\sim\chi^2_q
}.
$$

これが分子にカイ二乗分布が現れる理由である。

---

## なぜフルモデルの残差平方和がカイ二乗分布になるのか

フルモデルの射影行列を

$$
P_X=X(X^\top X)^{-1}X^\top
$$

とする。

当てはめ値は

$$
\hat y=P_Xy
$$

なので、残差は

$$
e=y-\hat y=(I-P_X)y.
$$

$X\beta\in\mathcal C(X)$ だから

$$
(I-P_X)X\beta=0.
$$

したがって

$$
e=(I-P_X)\varepsilon.
$$

よって

$$
SSE_F=e^\top e
=\varepsilon^\top(I-P_X)\varepsilon.
$$

$P_X$ は階数 $p$ の直交射影行列なので

$$
I-P_X
$$

も直交射影行列であり、その階数は

$$
\operatorname{rank}(I-P_X)=n-p.
$$

正規誤差

$$
\varepsilon\sim N_n(0,\sigma^2I_n)
$$

に対して Cochran の定理を使うと

$$
\boxed{
\frac{SSE_F}{\sigma^2}
\sim\chi^2_{n-p}
}.
$$

したがって本問では

$$
\frac{SSE_F}{\sigma^2}
\sim\chi^2_{16}.
$$

---

## なぜ2つの平方和が独立なのか

$F$ 分布を得るには

$$
\frac{SSE_R-SSE_F}{\sigma^2}\sim\chi^2_q
$$

と

$$
\frac{SSE_F}{\sigma^2}\sim\chi^2_{n-p}
$$

だけでは足りない。

両者が独立であることも必要である。

幾何的には、

- $SSE_R-SSE_F$ は、制約モデルからフルモデルへ広げたときに新しく使えるようになった方向の平方長
- $SSE_F$ は、フルモデルの列空間 $\mathcal C(X)$ に直交する残差方向の平方長

である。

追加説明方向は $\mathcal C(X)$ の内部にあり、フルモデル残差方向は $\mathcal C(X)$ に直交するので、両者は直交する。

正規ベクトルでは、互いに直交する射影成分は独立である。

したがって Cochran の定理より

$$
\boxed{
SSE_R-SSE_F
\quad\perp\quad
SSE_F
}.
$$

---

## 以上から partial F が出る

帰無仮説の下で

$$
U=
\frac{SSE_R-SSE_F}{\sigma^2}
\sim\chi^2_q,
$$

$$
V=
\frac{SSE_F}{\sigma^2}
\sim\chi^2_{n-p},
$$

かつ

$$
U\perp V.
$$

$F$ 分布の定義より

$$
\frac{U/q}{V/(n-p)}
\sim F_{q,n-p}.
$$

したがって

$$
\boxed{
F
=
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
\sim F_{q,n-p}
}.
$$

ここでは未知の $\sigma^2$ が分子・分母で打ち消される点も重要である。

---

## 詳細解答

### 1・2. partial F

制約数は $q=2$。partial F は

$$
F=
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}.
$$

数値を代入すると

$$
\begin{aligned}
F
&=\frac{(80-60)/2}{60/(20-4)}\\
&=\frac{10}{15/4}\\
&=\boxed{\frac83}.
\end{aligned}
$$

自由度は

$$
\boxed{(2,16)}.
$$

### 3. 追加平方和の幾何

フルモデルの列空間を $\mathcal C(X)$ とする。制約モデルが表す平均ベクトルの集合は、$r=0$ ならその内部の部分空間、一般の $r$ ではアフィン部分空間になる。

制約を外すと、当てはめ可能な方向が $q$ 次元だけ増える。

フルモデル残差は、より大きなモデル空間へ射影した後の残差なので

$$
SSE_F\le SSE_R.
$$

差

$$
SSE_R-SSE_F
$$

は、制約を外した $q$ 個の方向によって新たに説明できた平方和、すなわち追加平方和である。

### 4. Cochran の定理と F 分布

使うのは **Cochran の定理**である。正規ベクトルを互いに直交する射影成分へ分解したとき、各射影成分の平方ノルムを $\sigma^2$ で割った量は、射影のランクを自由度とする独立なカイ二乗分布になる。

本問で条件を確認する。

- 誤差は $N_n(0,\sigma^2I_n)$ なので球対称な正規。
- $X$ は列フルランクなのでフルモデル残差射影のランクは $n-p=16$。
- $R$ は階数 $q=2$ なので、帰無仮説で制約される追加説明方向の次元は2。
- 制約モデルはフルモデルに nested で、追加説明方向とフルモデル残差方向は直交する。

したがって $H_0:R\beta=r$ の下で

$$
\frac{SSE_R-SSE_F}{\sigma^2}\sim\chi^2_q,
$$

$$
\frac{SSE_F}{\sigma^2}\sim\chi^2_{n-p},
$$

かつ両者は独立。よって **F 分布の定義**から

$$
\boxed{
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
\sim F_{q,n-p}=F_{2,16}
}.
$$

正規性や nested な直交分解がなければ、この有限標本での正確な F 分布は一般には保証されない。

---

## 本番答案

$$
F
=
\frac{(SSE_R-SSE_F)/q}{SSE_F/(n-p)}
=
\frac{20/2}{60/16}
=
\frac83.
$$

自由度は $(2,16)$。

正規誤差、$X$ 列フルランク、$\operatorname{rank}(R)=2$、制約モデルはフルモデルに nested。追加説明方向と残差方向は直交するので **Cochran の定理**から

$$
(SSE_R-SSE_F)/\sigma^2\sim\chi^2_2,
\qquad
SSE_F/\sigma^2\sim\chi^2_{16}
$$

が独立。従って比は $F_{2,16}$。差 $SSE_R-SSE_F$ は制約を外して新たに説明できた追加平方和である。

---

## 採点基準

- F 公式: 5点
- 数値・自由度: 5点
- 追加平方和の解釈: 4点
- Cochran の定理名・正規性・ランク・直交性: 6点
