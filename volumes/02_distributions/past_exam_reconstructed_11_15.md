# 確率分布分野 過去問型再構成演習 11位〜15位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、演習価値ランキング11位〜15位の5題を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 数値・記号・設問順は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|---:|---|
| 11 | 2022 問2 | 一様分布の条件付き分布 | C | 25分 | 同時分布、独立、面積比、条件付き密度、相関 |
| 12 | 2023 問2 | カイ二乗分布と逆関数法 | C | 25分 | $\chi^2$ 密度、変数変換、Cauchy分布、逆関数法 |
| 13 | 2023 問3 | 指数分布とMGF | C | 25分 | MGF、指数傾斜、モーメント、分散による単調性 |
| 14 | 2021 問4 | 中心モーメントと標本中心化 | C | 25分 | 三次中心モーメント、独立性、不偏推定 |
| 15 | 2017 問1 | 標本平均の歪度・尖度 | C | 30分 | 高次中心モーメント、CLTとの接続、分散のMLE |

---

## 11位: 2022 問2型 一様分布の条件付き分布を面積で処理する

- 安定ID: `RECON-R11-2022-Q2`
- 参照: 2022年 問2
- 確度: `third_party_topic_index`
- 主題: 二変量一様分布、条件付き分布、条件付き相関
- 変更点: 同時CDFの確認から、幾何的確率、条件付き密度、相関まで一つの流れに再構成した。

### 問題

$-1\le u,v\le1$ に対し、二変量確率変数 $(U,V)$ の同時累積分布関数が

$$
F(u,v)=\frac{(u+1)(v+1)}{4}
$$

で与えられるとする。

1. $U,V$ の周辺分布を求め、両者が独立であることを示せ。
2. $P(U^2+V^2\le1)$ を求めよ。
3. 事象

$$
D=\{|U-V|\le1\}
$$

の確率を求めよ。
4. $D$ で条件付けたときの $(U,V)$ の条件付き同時密度を求めよ。
5. $D$ の下での $V$ の周辺密度を求め、さらに

$$
E[V\mid D],\qquad \operatorname{Var}(V\mid D)
$$

を求めよ。
6. $D$ の下での相関係数

$$
\rho_{UV\mid D}
$$

を求めよ。

### 解答

#### 1. 周辺分布と独立性

周辺CDFは

$$
F_U(u)=F(u,1)=\frac{u+1}{2},
$$

$$
F_V(v)=F(1,v)=\frac{v+1}{2}.
$$

したがって

$$
U,V\sim U(-1,1).
$$

周辺密度は

$$
f_U(u)=\frac12,
\qquad
f_V(v)=\frac12.
$$

一方、同時密度は

$$
f_{U,V}(u,v)
=
\frac{\partial^2}{\partial u\partial v}F(u,v)
=
\frac14.
$$

したがって

$$
f_{U,V}(u,v)=f_U(u)f_V(v)
$$

が成り立つから

$$
\boxed{U\perp V}.
$$

さらに $(U,V)$ は正方形 $[-1,1]^2$ 上の一様分布である。

#### 2. 円内に入る確率

正方形の面積は $4$。事象 $U^2+V^2\le1$ は半径1の円なので面積は $\pi$。

したがって一様性より

$$
\boxed{
P(U^2+V^2\le1)=\frac{\pi}{4}
}.
$$

この問題では積分より面積比が最短である。

#### 3. $D=\{|U-V|\le1\}$ の確率

条件は

$$
-1\le U-V\le1.
$$

正方形 $[-1,1]^2$ のうち、直線

$$
u-v=1,
\qquad
u-v=-1
$$

の間にある帯状領域を考える。

正方形の四隅のうち $(1,-1)$ と $(-1,1)$ 側に、脚長1の直角三角形が2個除かれる。各三角形の面積は $1/2$ なので、条件領域の面積は

$$
4-\frac12-\frac12=3.
$$

よって

$$
\boxed{P(D)=\frac34}.
$$

#### 4. 条件付き同時密度

元の同時密度は条件領域内で $1/4$。条件付き密度は

$$
f_{U,V\mid D}(u,v)
=
\frac{f_{U,V}(u,v)}{P(D)}
$$

だから

$$
\frac{1/4}{3/4}=\frac13.
$$

したがって

$$
\boxed{
f_{U,V\mid D}(u,v)=\frac13
}
$$

ただし

$$
-1\le u,v\le1,
\qquad
|u-v|\le1.
$$

条件付け後も「許された領域上では一様」である。

#### 5. 条件付き周辺密度と分散

$v\in(-1,0)$ のとき条件 $|u-v|\le1$ から

$$
-1\le u\le v+1.
$$

したがって

$$
f_{V\mid D}(v)
=
\int_{-1}^{v+1}\frac13\,du
=
\frac{2+v}{3}.
$$

$v\in(0,1)$ では

$$
v-1\le u\le1
$$

だから

$$
f_{V\mid D}(v)
=
\int_{v-1}^{1}\frac13\,du
=
\frac{2-v}{3}.
$$

よって

$$
\boxed{
f_{V\mid D}(v)
=
\begin{cases}
\dfrac{2+v}{3},&-1<v<0,\\[0.5em]
\dfrac{2-v}{3},&0<v<1.
\end{cases}
}
$$

これは $v=0$ に関して対称なので

$$
\boxed{E[V\mid D]=0}.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(V\mid D)
&=E[V^2\mid D]\\
&=\int_{-1}^{0}v^2\frac{2+v}{3}\,dv
+\int_{0}^{1}v^2\frac{2-v}{3}\,dv\\
&=\frac{5}{18}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(V\mid D)=\frac{5}{18}
}.
$$

対称性から $U$ についても同じ分散である。

#### 6. 条件付き相関係数

対称性から

$$
E[U\mid D]=E[V\mid D]=0.
$$

したがって

$$
\operatorname{Cov}(U,V\mid D)=E[UV\mid D].
$$

積分すると

$$
\begin{aligned}
E[UV\mid D]
&=\int_{-1}^{0}\int_{-1}^{v+1}uv\frac13\,du\,dv\\
&\quad+
\int_{0}^{1}\int_{v-1}^{1}uv\frac13\,du\,dv\\
&=\frac{5}{36}.
\end{aligned}
$$

よって

$$
\rho_{UV\mid D}
=
\frac{5/36}{\sqrt{5/18}\sqrt{5/18}}
=
\frac12.
$$

したがって

$$
\boxed{\rho_{UV\mid D}=\frac12}.
$$

元は独立だった $U,V$ が、$|U-V|\le1$ という条件で選別されると正の相関を持つ点が重要である。

### 本番答案

$(U,V)$ は $[-1,1]^2$ 上で密度 $1/4$ の一様分布。したがって幾何学的事象の確率は面積比で処理できる。$D=\{|U-V|\le1\}$ の領域面積は3なので $P(D)=3/4$、条件付き同時密度は $1/3$。周辺化すると

$$
f_{V\mid D}(v)
=
\begin{cases}
(2+v)/3,&-1<v<0,\\
(2-v)/3,&0<v<1,
\end{cases}
$$

より分散 $5/18$。また $E[UV\mid D]=5/36$ なので相関係数は $1/2$。

### 持ち帰るパターン

$$
\text{一様分布}
+\text{幾何条件}
\Longrightarrow
\text{面積比}
$$

および

$$
\text{独立}
\not\Longrightarrow
\text{条件付きでも独立}.
$$

---

## 12位: 2023 問2型 カイ二乗分布からCauchy分布と逆関数法へ

- 安定ID: `RECON-R12-2023-Q2`
- 参照: 2023年 問2
- 確度: `third_party_topic_index`
- 主題: $\chi^2$ 分布、Cauchy分布、逆関数法
- 変更点: 密度の形状比較、比によるCauchy導出、逆関数法を一つの連結問題にした。

### 問題

自由度 $k=1,2,3$ のカイ二乗分布の密度を

$$
f_k(y)
=
\frac{1}{2^{k/2}\Gamma(k/2)}
y^{k/2-1}e^{-y/2},
\qquad y>0
$$

とする。

また $Z\sim N(0,1)$、$Y\sim\chi_1^2$ は独立とする。

1. $f_1,f_2,f_3$ を具体的に書き、$f_3$ の最頻値を求めよ。
2. $X=Z/\sqrt{Y}$ の密度を求めよ。
3. $W=\arctan X$ の分布を求めよ。
4. $U\sim U(0,1)$ から標準Cauchy分布に従う乱数 $X$ を生成する式を求めよ。

### 解答

#### 1. 自由度1,2,3の密度

Gamma関数の値

$$
\Gamma\left(\frac12\right)=\sqrt{\pi},
\qquad
\Gamma(1)=1,
\qquad
\Gamma\left(\frac32\right)=\frac{\sqrt\pi}{2}
$$

を用いると

$$
\boxed{
f_1(y)=\frac{1}{\sqrt{2\pi}}y^{-1/2}e^{-y/2}
},
$$

$$
\boxed{
f_2(y)=\frac12e^{-y/2}
},
$$

$$
\boxed{
f_3(y)=\frac{1}{\sqrt{2\pi}}y^{1/2}e^{-y/2}
}.
$$

$f_3$ を微分すると

$$
\frac{d}{dy}f_3(y)
=
\frac{e^{-y/2}}{2\sqrt{2\pi}}y^{-1/2}(1-y).
$$

したがって増加から減少へ変わるのは $y=1$ であり

$$
\boxed{\operatorname{mode}(\chi_3^2)=1}.
$$

一般に $\chi_k^2$ の最頻値は $k\ge2$ で $k-2$ である。

#### 2. $X=Z/\sqrt{Y}$ の密度

変換

$$
X=\frac{Z}{\sqrt{Y}},
\qquad
W=Y
$$

を考える。逆変換は

$$
Z=X\sqrt{W},
\qquad
Y=W.
$$

Jacobianの絶対値は

$$
\left|\frac{\partial(Z,Y)}{\partial(X,W)}\right|
=
\sqrt{W}.
$$

$Z$ と $Y$ は独立だから

$$
\begin{aligned}
f_X(x)
&=\int_0^\infty
\frac{1}{\sqrt{2\pi}}e^{-x^2w/2}
\cdot
\frac{1}{\sqrt{2\pi w}}e^{-w/2}
\cdot\sqrt{w}\,dw\\
&=\frac1{2\pi}
\int_0^\infty
e^{-(1+x^2)w/2}\,dw\\
&=\frac1{\pi(1+x^2)}.
\end{aligned}
$$

したがって

$$
\boxed{
X\sim\operatorname{Cauchy}(0,1)
}.
$$

これは $t_1$ 分布と同じである。

#### 3. $W=\arctan X$

標準Cauchyの密度は

$$
g(x)=\frac1{\pi(1+x^2)}.
$$

変換

$$
w=\arctan x
$$

の逆変換は

$$
x=\tan w,
\qquad
-\frac\pi2<w<\frac\pi2.
$$

また

$$
\frac{dx}{dw}=1+\tan^2w=1+x^2.
$$

したがって

$$
\begin{aligned}
h(w)
&=g(x)\left|\frac{dx}{dw}\right|\\
&=\frac1{\pi(1+x^2)}(1+x^2)\\
&=\frac1\pi.
\end{aligned}
$$

よって

$$
\boxed{
W\sim U\left(-\frac\pi2,\frac\pi2\right)
}.
$$

#### 4. 逆関数法

$U\sim U(0,1)$ から

$$
W=\pi U-\frac\pi2
$$

とすれば

$$
W\sim U\left(-\frac\pi2,\frac\pi2\right).
$$

さらに

$$
X=\tan W
$$

とすれば標準Cauchy分布になる。

したがって

$$
\boxed{
X=\tan\left(\pi U-\frac\pi2\right)
}
$$

が求める生成式である。

### 本番答案

独立な $Z\sim N(0,1)$ と $Y\sim\chi_1^2$ に対し $X=Z/\sqrt{Y}$ と変換し、Jacobian $\sqrt{y}$ を用いて周辺化すると

$$
f_X(x)=\frac1{\pi(1+x^2)}.
$$

よって $X$ は標準Cauchy。さらに $W=\arctan X$ は $(-\pi/2,\pi/2)$ 上の一様分布なので

$$
X=\tan\left(\pi U-\frac\pi2\right),
\qquad U\sim U(0,1)
$$

で生成できる。

### 持ち帰るパターン

$$
\frac{N(0,1)}{\sqrt{\chi_1^2}}
\to
\operatorname{Cauchy}(0,1)
$$

および

$$
U(0,1)
\xrightarrow{F^{-1}}
\text{目的分布}
$$

という逆関数法を結び付ける。

---

## 13位: 2023 問3型 指数分布と指数傾斜

- 安定ID: `RECON-R13-2023-Q3`
- 参照: 2023年 問3
- 確度: `third_party_topic_index`
- 主題: 指数分布、MGF、指数傾斜、モーメント
- 変更点: 一般分布に対する指数傾斜の性質まで一続きにした。

### 問題

$X\sim\operatorname{Exp}(\lambda)$、$\lambda>0$ とし

$$
f(x)=\lambda e^{-\lambda x},
\qquad x>0
$$

とする。

1. $E[X]$ を求めよ。
2. モーメント母関数 $M_X(t)$ とその存在範囲を求めよ。
3. $h<\lambda$ に対し、新しい密度

$$
f_h(x)
=
\frac{e^{hx}f(x)}{M_X(h)}
$$

を定める。この分布のMGFと平均を求めよ。
4. 一般の確率変数 $X$ に対して同じ指数傾斜を定めたとき、$r$ 次モーメントを

$$
E_h[X^r]
$$

と書く。これを $M_X$ の微分で表せ。
5.

$$
J(h)=E_h[X]
$$

とおく。$J'(h)$ を求め、$J(h)$ が単調非減少であることを示せ。

### 解答

#### 1. 平均

$$
\begin{aligned}
E[X]
&=\int_0^\infty x\lambda e^{-\lambda x}\,dx\\
&=\frac1\lambda.
\end{aligned}
$$

よって

$$
\boxed{E[X]=\frac1\lambda}.
$$

#### 2. MGF

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\int_0^\infty e^{tx}\lambda e^{-\lambda x}\,dx\\
&=\lambda\int_0^\infty e^{-(\lambda-t)x}\,dx.
\end{aligned}
$$

積分が収束するには

$$
t<\lambda
$$

が必要である。このとき

$$
\boxed{
M_X(t)=\frac{\lambda}{\lambda-t},
\qquad t<\lambda
}.
$$

#### 3. 指数傾斜後のMGF

指数傾斜後の期待値を $E_h$ と書く。

$$
\begin{aligned}
M_h(t)
&=E_h[e^{tX}]\\
&=\int e^{tx}\frac{e^{hx}f(x)}{M_X(h)}\,dx\\
&=\frac{M_X(h+t)}{M_X(h)}.
\end{aligned}
$$

指数分布のMGFを代入すると

$$
\begin{aligned}
M_h(t)
&=\frac{\lambda/(\lambda-h-t)}{\lambda/(\lambda-h)}\\
&=\frac{\lambda-h}{\lambda-h-t}.
\end{aligned}
$$

したがって傾斜後も指数分布であり

$$
\boxed{X_h\sim\operatorname{Exp}(\lambda-h)}.
$$

平均は

$$
\boxed{
E_h[X]=\frac1{\lambda-h}
}.
$$

特に $h>0$ なら

$$
E_h[X]>E[X].
$$

指数傾斜は大きな $x$ を相対的に重くするため、平均が右へ動く。

#### 4. 一般の $r$ 次モーメント

一般に

$$
M_h(t)=\frac{M_X(h+t)}{M_X(h)}.
$$

したがって $t=0$ で $r$ 回微分すると

$$
\boxed{
E_h[X^r]
=
\frac{M_X^{(r)}(h)}{M_X(h)}
}.
$$

#### 5. 平均の単調性

$$
J(h)
=
\frac{M_X'(h)}{M_X(h)}.
$$

微分すると

$$
\begin{aligned}
J'(h)
&=\frac{M_X''(h)M_X(h)-M_X'(h)^2}{M_X(h)^2}\\
&=\frac{M_X''(h)}{M_X(h)}
-\left(\frac{M_X'(h)}{M_X(h)}\right)^2\\
&=E_h[X^2]-E_h[X]^2\\
&=\operatorname{Var}_h(X)\\
&\ge0.
\end{aligned}
$$

したがって

$$
\boxed{J(h)\text{ は単調非減少}}
$$

である。

さらに $J(0)=E[X]$ だから

$$
h>0\Rightarrow E_h[X]\ge E[X],
$$

$$
h<0\Rightarrow E_h[X]\le E[X].
$$

### 本番答案

指数分布のMGFは

$$
M_X(t)=\frac{\lambda}{\lambda-t},\qquad t<\lambda.
$$

指数傾斜後は

$$
M_h(t)=\frac{M_X(h+t)}{M_X(h)}
$$

なので、指数分布では率 $\lambda-h$ の指数分布になる。一般に

$$
E_h[X^r]=\frac{M_X^{(r)}(h)}{M_X(h)}
$$

であり、平均 $J(h)=M_X'(h)/M_X(h)$ を微分すると

$$
J'(h)=\operatorname{Var}_h(X)\ge0.
$$

### 持ち帰るパターン

$$
f_h(x)
\propto
e^{hx}f(x)
$$

という指数傾斜では

$$
\log M_X(h)
$$

の1階微分が平均、2階微分が分散になる。

---

## 14位: 2021 問4型 三次中心モーメントと標本中心化

- 安定ID: `RECON-R14-2021-Q4`
- 参照: 2021年 問4
- 確度: `third_party_topic_index`
- 主題: 中心モーメント、独立性、標本中心化、不偏推定
- 変更点: 三次中心モーメント $\tau$ の推定に焦点を当てて再構成した。

### 問題

$X_1,\ldots,X_n$ を独立同分布とし

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2,
\qquad
E[(X_i-\mu)^3]=\tau
$$

とする。標本平均を $\overline{X}$ とする。

1. $\operatorname{Var}(\overline{X})$ を求めよ。
2. $E[(X_1-X_2)^3]$ を求めよ。
3. $Y_i=X_i-\mu$ とおく。相異なる $i,j,k$ に対して

$$
E[Y_i^3],
\qquad
E[Y_i^2Y_j],
\qquad
E[Y_iY_jY_k]
$$

を求めよ。
4.

$$
E\left[\sum_{i=1}^n(X_i-\overline{X})^3\right]
$$

を求めよ。
5. 4の結果を用いて $\tau$ の不偏推定量を作れ。
6. 定数 $a_1,\ldots,a_n$ に対し

$$
\widehat\tau
=
\left(\sum_{i=1}^n a_iX_i\right)^3
$$

が $\tau$ の不偏推定量になるための十分な条件を一組与えよ。

### 解答

#### 1. 標本平均の分散

独立性より

$$
\begin{aligned}
\operatorname{Var}(\overline{X})
&=\operatorname{Var}\left(\frac1n\sum_{i=1}^nX_i\right)\\
&=\frac1{n^2}\sum_{i=1}^n\operatorname{Var}(X_i)\\
&=\frac{\sigma^2}{n}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(\overline{X})=\frac{\sigma^2}{n}
}.
$$

#### 2. 差の三次モーメント

$$
X_1-X_2
=(X_1-\mu)-(X_2-\mu).
$$

展開して期待値を取ると、独立性と

$$
E[X_i-\mu]=0
$$

により交差項は0になる。

したがって

$$
\begin{aligned}
E[(X_1-X_2)^3]
&=E[(X_1-\mu)^3]-E[(X_2-\mu)^3]\\
&=\tau-\tau\\
&=0.
\end{aligned}
$$

よって

$$
\boxed{E[(X_1-X_2)^3]=0}.
$$

#### 3. 中心化変数の積

$Y_i=X_i-\mu$ とおくと

$$
E[Y_i]=0,
\qquad
E[Y_i^3]=\tau.
$$

独立性より

$$
E[Y_i^2Y_j]
=E[Y_i^2]E[Y_j]
=0
$$

であり、相異なる $i,j,k$ について

$$
E[Y_iY_jY_k]
=E[Y_i]E[Y_j]E[Y_k]
=0.
$$

したがって

$$
\boxed{
E[Y_i^3]=\tau,
\quad
E[Y_i^2Y_j]=0,
\quad
E[Y_iY_jY_k]=0
}.
$$

#### 4. 標本中心化後の三次モーメント

$$
X_i-\overline{X}
=Y_i-\overline{Y}
$$

であり

$$
\overline{Y}=\frac1n\sum_{j=1}^nY_j.
$$

各 $i$ について

$$
E[(Y_i-\overline{Y})^3]
$$

を展開する。必要な量は

$$
E[Y_i^3]=\tau,
$$

$$
E[Y_i^2\overline{Y}]=\frac{\tau}{n},
$$

$$
E[Y_i\overline{Y}^2]=\frac{\tau}{n^2},
$$

$$
E[\overline{Y}^3]=\frac{\tau}{n^2}.
$$

したがって

$$
\begin{aligned}
E[(Y_i-\overline{Y})^3]
&=\tau
-3\frac{\tau}{n}
+3\frac{\tau}{n^2}
-\frac{\tau}{n^2}\\
&=\tau\left(1-\frac3n+\frac2{n^2}\right)\\
&=\tau\frac{(n-1)(n-2)}{n^2}.
\end{aligned}
$$

これを $i=1,\ldots,n$ で和を取ると

$$
\boxed{
E\left[\sum_{i=1}^n(X_i-\overline{X})^3\right]
=
\frac{(n-1)(n-2)}{n}\tau
}.
$$

#### 5. $\tau$ の不偏推定量

4の式を定数倍すればよい。

$$
\boxed{
\widehat\tau
=
\frac{n}{(n-1)(n-2)}
\sum_{i=1}^n(X_i-\overline{X})^3
}
$$

とすれば

$$
E[\widehat\tau]=\tau.
$$

#### 6. 線形結合の三乗

$$
\sum_{i=1}^na_iX_i
=
\sum_{i=1}^na_iY_i
+\mu\sum_{i=1}^na_i.
$$

まず位置母数 $\mu$ の影響を消すため

$$
\sum_{i=1}^na_i=0
$$

とする。このとき

$$
\widehat\tau
=
\left(\sum_{i=1}^na_iY_i\right)^3.
$$

展開後、異なる添字を含む三次積は期待値0なので

$$
E[\widehat\tau]
=
\sum_{i=1}^na_i^3E[Y_i^3]
=
\tau\sum_{i=1}^na_i^3.
$$

したがって

$$
\boxed{
\sum_{i=1}^na_i=0,
\qquad
\sum_{i=1}^na_i^3=1
}
$$

なら $E[\widehat\tau]=\tau$ となる。

### 本番答案

中心化 $Y_i=X_i-\mu$ を入れると $E[Y_i]=0$ なので、独立性により異なる添字を含む三次積がほぼ全て消える。これを利用して

$$
E\left[\sum_{i=1}^n(X_i-\overline{X})^3\right]
=
\frac{(n-1)(n-2)}{n}\tau
$$

を得る。従って補正係数を掛ければ $\tau$ の不偏推定量になる。

### 持ち帰るパターン

高次モーメントでは

$$
Y_i=X_i-E[X_i]
$$

と中心化してから展開し、独立性と $E[Y_i]=0$ で交差項を消す。

---

## 15位: 2017 問1型 標本平均の歪度・尖度はどう縮むか

- 安定ID: `RECON-R15-2017-Q1`
- 参照: 2017年 問1
- 確度: `third_party_topic_index`
- 主題: 標本平均、高次中心モーメント、歪度、超過尖度、分散の最尤推定
- 変更点: 歪度・尖度と中心極限定理の接続を主軸にし、最後に正規モデルの分散MLEを追加した。

### 問題

$X_1,\ldots,X_n$ を独立同分布とし

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2
$$

とする。母分布の歪度を $\gamma_1$、超過尖度を $\gamma_2$ とし

$$
E[(X_i-\mu)^3]=\gamma_1\sigma^3,
$$

$$
E[(X_i-\mu)^4]=(\gamma_2+3)\sigma^4
$$

とする。

1. $E[\overline{X}]$ と $\operatorname{Var}(\overline{X})$ を求めよ。
2. $E[(\overline{X}-\mu)^3]$ を求め、$\overline{X}$ の歪度を求めよ。
3. $E[(\overline{X}-\mu)^4]$ を求め、$\overline{X}$ の超過尖度を求めよ。
4. 2,3の結果を中心極限定理と関連付けて解釈せよ。
5. さらに $X_i\sim N(\mu,\sigma^2)$ とする。$\mu$ が既知の場合と未知の場合について、$\sigma^2$ の最尤推定量を求めよ。

### 解答

#### 1. 平均と分散

線形性と独立性から

$$
\boxed{E[\overline{X}]=\mu},
$$

$$
\boxed{
\operatorname{Var}(\overline{X})=\frac{\sigma^2}{n}
}.
$$

#### 2. 三次中心モーメントと歪度

$Y_i=X_i-\mu$ とおくと

$$
\overline{X}-\mu
=
\frac1n\sum_{i=1}^nY_i.
$$

したがって

$$
E[(\overline{X}-\mu)^3]
=
\frac1{n^3}E\left[\left(\sum_{i=1}^nY_i\right)^3\right].
$$

独立性と $E[Y_i]=0$ により、期待値を取ったとき残るのは $Y_i^3$ の項だけである。

$$
\begin{aligned}
E[(\overline{X}-\mu)^3]
&=\frac1{n^3}\sum_{i=1}^nE[Y_i^3]\\
&=\frac{n\gamma_1\sigma^3}{n^3}\\
&=\frac{\gamma_1\sigma^3}{n^2}.
\end{aligned}
$$

標本平均の歪度は

$$
\frac{E[(\overline{X}-\mu)^3]}{\operatorname{Var}(\overline{X})^{3/2}}
$$

だから

$$
\begin{aligned}
\operatorname{Skew}(\overline{X})
&=\frac{\gamma_1\sigma^3/n^2}{(\sigma^2/n)^{3/2}}\\
&=\frac{\gamma_1}{\sqrt{n}}.
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Skew}(\overline{X})
=
\frac{\gamma_1}{\sqrt n}
}.
$$

#### 3. 四次中心モーメントと超過尖度

同様に

$$
E[(\overline{X}-\mu)^4]
=
\frac1{n^4}E\left[\left(\sum_{i=1}^nY_i\right)^4\right].
$$

期待値を取ると残るのは

- $Y_i^4$ 型
- $Y_i^2Y_j^2$ 型

だけである。

したがって

$$
\begin{aligned}
E\left[\left(\sum_{i=1}^nY_i\right)^4\right]
&=nE[Y_1^4]
+6{n\choose2}E[Y_1^2]E[Y_2^2]\\
&=n(\gamma_2+3)\sigma^4
+3n(n-1)\sigma^4\\
&=n(\gamma_2+3n)\sigma^4.
\end{aligned}
$$

よって

$$
\boxed{
E[(\overline{X}-\mu)^4]
=
\frac{(\gamma_2+3n)\sigma^4}{n^3}
}.
$$

標本平均の超過尖度は

$$
\frac{E[(\overline{X}-\mu)^4]}{\operatorname{Var}(\overline{X})^2}-3.
$$

したがって

$$
\begin{aligned}
\operatorname{ExKurt}(\overline{X})
&=\frac{(\gamma_2+3n)\sigma^4/n^3}{\sigma^4/n^2}-3\\
&=\frac{\gamma_2+3n}{n}-3\\
&=\frac{\gamma_2}{n}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{ExKurt}(\overline{X})
=
\frac{\gamma_2}{n}
}.
$$

#### 4. 中心極限定理との接続

$n\to\infty$ で

$$
\frac{\gamma_1}{\sqrt n}\to0,
$$

$$
\frac{\gamma_2}{n}\to0.
$$

正規分布は歪度0、超過尖度0なので、標本平均の形状が正規分布へ近づくことと整合する。

ただし、歪度・尖度が0へ近づくだけで中心極限定理そのものを証明したことにはならない。これは中心極限定理の結果と整合する「形状の指標による確認」である。

### 5. 正規モデルでの $\sigma^2$ の最尤推定

#### $\mu$ が既知

対数尤度は定数を除いて

$$
\ell(\sigma^2)
=
-\frac n2\log\sigma^2
-\frac1{2\sigma^2}\sum_{i=1}^n(X_i-\mu)^2.
$$

微分して0とおくと

$$
-\frac n{2\sigma^2}
+\frac1{2(\sigma^2)^2}
\sum_{i=1}^n(X_i-\mu)^2
=0.
$$

したがって

$$
\boxed{
\widehat{\sigma^2}_{\mathrm{MLE}}
=
\frac1n\sum_{i=1}^n(X_i-\mu)^2
}.
$$

#### $\mu$ が未知

まず

$$
\widehat\mu=\overline{X}
$$

であり、これを代入すると

$$
\boxed{
\widehat{\sigma^2}_{\mathrm{MLE}}
=
\frac1n\sum_{i=1}^n(X_i-\overline{X})^2
}.
$$

不偏標本分散

$$
S^2
=
\frac1{n-1}
\sum_{i=1}^n(X_i-\overline{X})^2
$$

との関係は

$$
\boxed{
\widehat{\sigma^2}_{\mathrm{MLE}}
=
\frac{n-1}{n}S^2
}.
$$

最尤推定量は一般に不偏である必要はない、という重要な例である。

### 本番答案

中心化 $Y_i=X_i-\mu$ を用いる。三次展開では $Y_i^3$ のみ、四次展開では $Y_i^4$ と $Y_i^2Y_j^2$ のみが期待値で残るため

$$
\operatorname{Skew}(\overline{X})
=
\frac{\gamma_1}{\sqrt n},
$$

$$
\operatorname{ExKurt}(\overline{X})
=
\frac{\gamma_2}{n}.
$$

したがって標本平均の非対称性と非正規的な尖りは標本サイズとともに消える。正規モデルでの分散MLEは、平均既知なら真の平均からの平方偏差の平均、平均未知なら標本平均からの平方偏差の平均である。

### 持ち帰るパターン

$$
\boxed{
\text{標本平均の歪度}=O(n^{-1/2})
}
$$

$$
\boxed{
\text{標本平均の超過尖度}=O(n^{-1})
}
$$

である。平均を取る操作が分布を「正規形へ丸める」速さを具体的に見る式として覚える。

---

## 11位〜15位の横断まとめ

この5題では、個別公式より次の解法パターンを残す。

1. 一様分布で領域条件が出たら、まず面積比を検討する。
2. 条件付けは独立性を壊し得る。条件付き相関を直接計算できるようにする。
3. $N(0,1)$ と $\chi_1^2$ の比から Cauchy が出ることを、$t_1$ の暗記だけでなく変数変換でも再現する。
4. 一様乱数から目的分布を作るときは逆関数法を考える。
5. 指数傾斜 $f_h(x)\propto e^{hx}f(x)$ では MGF の比 $M(h+t)/M(h)$ が現れる。
6. $\log M(h)$ の1階微分は傾斜分布の平均、2階微分は分散になる。
7. 高次モーメントは中心化してから展開し、独立性と平均0で交差項を消す。
8. 標本平均の歪度は $n^{-1/2}$、超過尖度は $n^{-1}$ の速さで縮む。
9. 最尤推定量と不偏推定量は別概念であり、正規分散のMLEは代表例である。

## 参照方針

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは、公開されている過去問解説から出題構造を抽出して独自化した演習であり、公式過去問の代替ではない。
