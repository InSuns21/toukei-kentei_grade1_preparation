# 確率分布分野 過去問型再構成演習 Top 10

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、演習価値の高い10題を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 数値・記号・小問構成は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 数式はリポジトリ規約に従い KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 演習価値ランキング

| 順位 | 参照年・問 | 主題 | Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|---:|---|
| 1 | 2024 問5 | 一様分布の順序統計量 | D | 35分 | 順序統計量、十分統計量、条件付き期待値、Rao--Blackwell化 |
| 2 | 2014 問2 | Gamma・Beta分布 | C | 30分 | MGF、再生性、Jacobian、Beta--Gamma関係 |
| 3 | 2022 問3 | Poisson--Gamma混合 | C | 25分 | 混合分布、負の二項分布、全期待値、全分散、モーメント法 |
| 4 | 2012 問2 | カイ二乗分布 | C | 25分 | MGF、再生性、2変数変換、Beta分布 |
| 5 | 2017 問5 | カイ二乗分布とCauchy分布 | C | 25分 | 非単調変換、比の分布、$F$ 分布、Cauchy分布 |
| 6 | 2012 問1 | 一様分布・確率積分変換 | B | 15分 | 確率積分変換、順序統計量 |
| 7 | 2022 問1 | 確率空間・独立性 | B | 15分 | 包含排除、Fréchet型上下限、ペア独立と相互独立 |
| 8 | 2014 問1 | 条件付き確率 | B | 15分 | 条件付け、全確率、独立性 |
| 9 | 2021 問1 | 指数分布＋一様分布 | C | 20分 | 畳み込み、支持集合、確率積分変換、依存構造 |
| 10 | 2018 問5 | 順序統計量の密度 | C | 25分 | 最小・中央値・最大、同時密度、range |

## 1位: 2024 問5型 一様分布の順序統計量からRao--Blackwell化まで

- 安定ID: `RECON-TOP10-01`
- 参照: 2024年 問5
- 確度: `third_party_topic_index`
- 主題: 順序統計量、十分統計量、条件付き期待値、Rao--Blackwell化
- 変更点: 記号と説明順を独自化し、推定論との接続を明示した。

### 問題

$X_1,X_2,X_3$ を独立に

$$
U\left(-\frac12,\frac12\right)
$$

に従う確率変数とし、その順序統計量を

$$
X_{(1)}\le X_{(2)}\le X_{(3)}
$$

とする。さらに

$$
Y_i=X_i+\theta
$$

とし、$Y_1,Y_2,Y_3$ の順序統計量を $Y_{(1)},Y_{(2)},Y_{(3)}$ とする。

1. $X_{(1)},X_{(2)},X_{(3)}$ の密度と期待値を求めよ。
2. $(X_{(1)},X_{(2)},X_{(3)})$ の同時密度を求めよ。
3. 任意の定数 $c$ に対して

$$
\widehat{\theta}_c
=cY_{(1)}+(1-2c)Y_{(2)}+cY_{(3)}
$$

が $\theta$ の不偏推定量であることを示せ。
4. $(Y_{(1)},Y_{(3)})$ が $\theta$ の十分統計量であることを示せ。
5. $E[Y_{(2)}\mid Y_{(1)},Y_{(3)}]$ を求め、Rao--Blackwellの定理を用いて $\widehat{\theta}_c$ の分散を最小にする $c$ を求めよ。

### 解答

#### 1. 順序統計量の周辺密度

一般に独立同分布標本 $X_1,\ldots,X_n$ の第 $k$ 順序統計量の密度は

$$
f_{X_{(k)}}(x)
=
\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x)
$$

である。ここでは

$$
f(x)=1,\qquad
F(x)=x+\frac12,\qquad -\frac12<x<\frac12
$$

だから、$n=3$ を代入して

$$
f_{X_{(1)}}(x)=3\left(\frac12-x\right)^2,
$$

$$
f_{X_{(2)}}(x)=6\left(\frac12+x\right)\left(\frac12-x\right)
=6\left(\frac14-x^2\right),
$$

$$
f_{X_{(3)}}(x)=3\left(\frac12+x\right)^2.
$$

一様分布 $U(0,1)$ の第 $k$ 順序統計量 $U_{(k)}$ について

$$
E[U_{(k)}]=\frac{k}{n+1}
$$

であり、$X=U-1/2$ とみなせるので

$$
E[X_{(1)}]=-\frac14,\qquad
E[X_{(2)}]=0,\qquad
E[X_{(3)}]=\frac14.
$$

#### 2. 同時密度

元の3変数の同時密度は立方体 $(-1/2,1/2)^3$ 上で1である。同じ順序値を生む元の並び方は $3!=6$ 通りあるから

$$
f_{X_{(1)},X_{(2)},X_{(3)}}(x_1,x_2,x_3)
=6
$$

ただし

$$
-\frac12<x_1<x_2<x_3<\frac12.
$$

それ以外では0である。

#### 3. 不偏性

$Y_{(k)}=X_{(k)}+\theta$ だから

$$
E[Y_{(1)}]=\theta-\frac14,
$$

$$
E[Y_{(2)}]=\theta,
$$

$$
E[Y_{(3)}]=\theta+\frac14.
$$

よって

$$
\begin{aligned}
E[\widehat{\theta}_c]
&=c\left(\theta-\frac14\right)
 +(1-2c)\theta
 +c\left(\theta+\frac14\right)\\
&=\theta.
\end{aligned}
$$

したがってすべての $c$ について $\widehat{\theta}_c$ は不偏である。

#### 4. 十分統計量

$Y_i$ の密度は

$$
f_\theta(y)
=\boldsymbol{1}\left\{\theta-\frac12<y<\theta+\frac12\right\}.
$$

3標本の尤度は

$$
L(\theta;y_1,y_2,y_3)
=
\prod_{i=1}^3
\boldsymbol{1}\left\{\theta-\frac12<y_i<\theta+\frac12\right\}.
$$

これは

$$
y_{(3)}-\frac12<\theta<y_{(1)}+\frac12
$$

と同値である。したがって尤度の $\theta$ 依存部分は $y_{(1)},y_{(3)}$ のみを通じて現れる。Neymanの分解定理より

$$
\boxed{(Y_{(1)},Y_{(3)})\text{ は }\theta\text{ の十分統計量}}
$$

である。

#### 5. 条件付き期待値とRao--Blackwell化

端点

$$
Y_{(1)}=y_1,\qquad Y_{(3)}=y_3
$$

を固定すると、中央の順序統計量は区間 $(y_1,y_3)$ 上で一様になる。したがって

$$
Y_{(2)}\mid(Y_{(1)}=y_1,Y_{(3)}=y_3)
\sim U(y_1,y_3)
$$

であり

$$
E[Y_{(2)}\mid Y_{(1)},Y_{(3)}]
=\frac{Y_{(1)}+Y_{(3)}}2.
$$

よって

$$
\begin{aligned}
E[\widehat{\theta}_c\mid Y_{(1)},Y_{(3)}]
&=cY_{(1)}
 +(1-2c)\frac{Y_{(1)}+Y_{(3)}}2
 +cY_{(3)}\\
&=\frac{Y_{(1)}+Y_{(3)}}2.
\end{aligned}
$$

Rao--Blackwellの定理より

$$
\operatorname{Var}\left(\frac{Y_{(1)}+Y_{(3)}}2\right)
\le
\operatorname{Var}(\widehat{\theta}_c)
$$

である。元の族の中でこの推定量そのものになるには

$$
1-2c=0
$$

であればよい。したがって

$$
\boxed{c=\frac12}
$$

であり、対応する推定量は

$$
\boxed{\widehat{\theta}=\frac{Y_{(1)}+Y_{(3)}}2}.
$$

### 本番答案

順序統計量公式から3つの周辺密度を求め、$E[X_{(1)}],E[X_{(2)}],E[X_{(3)}]=(-1/4,0,1/4)$ を得る。同時密度は順序領域上で $3!=6$。尤度の台条件は

$$
y_{(3)}-\frac12<\theta<y_{(1)}+\frac12
$$

なので $(Y_{(1)},Y_{(3)})$ は十分。さらに

$$
Y_{(2)}\mid Y_{(1)},Y_{(3)}\sim U(Y_{(1)},Y_{(3)})
$$

より条件付き期待値は両端の平均である。Rao--Blackwell化すると任意の $c$ から $(Y_{(1)}+Y_{(3)})/2$ を得るため、族の中で分散最小となるのは $c=1/2$。

### 持ち帰るパターン

$$
\text{順序統計量}
\to
\text{同時密度}
\to
\text{十分統計量}
\to
\text{条件付き期待値}
\to
\text{Rao--Blackwell化}
$$

---

## 2位: 2014 問2型 Gamma分布とBeta分布の接続

- 安定ID: `RECON-TOP10-02`
- 参照: 2014年 問2
- 確度: `third_party_topic_index`
- 主題: Gamma再生性、Beta--Gamma関係、順序統計量
- 変更点: Gamma分布をリポジトリ規約の shape-rate 表示に統一した。

### 問題

$X_1,\ldots,X_{n+1}$ を独立に

$$
X_j\sim\operatorname{Gamma}(1,1)
$$

とする。ここで shape-rate 表示

$$
f(x)=\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x},\qquad x>0
$$

を用いる。

1. $X\sim\operatorname{Gamma}(m,1)$ のモーメント母関数を求めよ。
2. その平均と分散を求めよ。
3. $T=\sum_{j=1}^{n+1}X_j$、$Y_i=(X_1+\cdots+X_i)/T$ とする。$T,Y_i$ の分布を求め、独立性を示せ。
4. $U_1,\ldots,U_n\overset{\mathrm{i.i.d.}}{\sim}U(0,1)$ の第 $i$ 順序統計量 $U_{(i)}$ と $Y_i$ が同分布であることを示せ。
5. $E[U_{(i)}]$ を求めよ。

### 解答

#### 1. モーメント母関数

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\frac1{\Gamma(m)}\int_0^\infty x^{m-1}e^{-(1-t)x}\,dx\\
&=(1-t)^{-m},\qquad t<1.
\end{aligned}
$$

したがって

$$
\boxed{M_X(t)=(1-t)^{-m}}.
$$

#### 2. 平均と分散

$$
E[X]=M_X'(0)=m,
$$

$$
E[X^2]=M_X''(0)=m(m+1).
$$

ゆえに

$$
\operatorname{Var}(X)
=m(m+1)-m^2
=m.
$$

したがって

$$
\boxed{E[X]=m,\qquad \operatorname{Var}(X)=m}.
$$

#### 3. 比を作る

$$
A=X_1+\cdots+X_i,
\qquad
B=X_{i+1}+\cdots+X_{n+1}
$$

とおく。Gamma分布の再生性から

$$
A\sim\operatorname{Gamma}(i,1),
$$

$$
B\sim\operatorname{Gamma}(n+1-i,1),
$$

かつ $A,B$ は独立である。

変換

$$
T=A+B,\qquad Y=\frac{A}{A+B}
$$

を考える。逆変換は

$$
A=TY,\qquad B=T(1-Y)
$$

で、Jacobianの絶対値は

$$
\left|\frac{\partial(A,B)}{\partial(T,Y)}\right|=T.
$$

同時密度を代入すると

$$
f_{T,Y}(t,y)
\propto
t^n e^{-t}
y^{i-1}(1-y)^{n-i}.
$$

$t$ の部分と $y$ の部分へ因数分解できるので

$$
\boxed{T\sim\operatorname{Gamma}(n+1,1)}
$$

および

$$
\boxed{Y_i\sim\operatorname{Beta}(i,n+1-i)}
$$

かつ

$$
\boxed{T\perp Y_i}.
$$

#### 4. 一様分布の順序統計量

$U(0,1)$ の第 $i$ 順序統計量の密度は

$$
f_{U_{(i)}}(u)
=
\frac{n!}{(i-1)!(n-i)!}
 u^{i-1}(1-u)^{n-i},
\qquad 0<u<1.
$$

これは $\operatorname{Beta}(i,n+1-i)$ の密度そのものなので

$$
\boxed{U_{(i)}\overset{d}{=}Y_i}.
$$

#### 5. 期待値

Beta分布の平均

$$
E[Z]=\frac{a}{a+b},\qquad Z\sim\operatorname{Beta}(a,b)
$$

を用いて

$$
\boxed{E[U_{(i)}]=\frac{i}{n+1}}.
$$

### 本番答案

Gamma再生性で $A\sim\operatorname{Gamma}(i,1)$、$B\sim\operatorname{Gamma}(n+1-i,1)$。$T=A+B$、$Y=A/(A+B)$ と変換すると逆変換は $A=TY$、$B=T(1-Y)$、Jacobianは $T$。同時密度が Gamma部分とBeta部分に分離するため

$$
T\sim\operatorname{Gamma}(n+1,1),\qquad
Y\sim\operatorname{Beta}(i,n+1-i),\qquad T\perp Y.
$$

一方、一様標本の第 $i$ 順序統計量も同じBeta分布なので同分布であり、平均は $i/(n+1)$。

### 持ち帰るパターン

$$
\frac{\operatorname{Gamma}(a,\beta)}
{\operatorname{Gamma}(a,\beta)+\operatorname{Gamma}(b,\beta)}
\sim\operatorname{Beta}(a,b)
$$

同じ rate を持つことが重要である。

---

## 3位: 2022 問3型 Poisson--Gamma混合

- 安定ID: `RECON-TOP10-03`
- 参照: 2022年 問3
- 確度: `third_party_topic_index`
- 主題: 混合分布、負の二項分布、全期待値、全分散、モーメント法
- 変更点: Gamma分布の母数化を shape-rate に固定した。

### 問題

階層モデル

$$
X\mid\Lambda=\lambda\sim\operatorname{Poisson}(\lambda),
$$

$$
\Lambda\sim\operatorname{Gamma}(\alpha,\beta)
$$

を考える。ただし

$$
g(\lambda)
=
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0.
$$

1. Poisson分布とGamma分布の平均・分散を書け。
2. $X$ の周辺確率質量関数を求めよ。
3. $E[X]$ と $\operatorname{Var}(X)$ を全期待値・全分散から求めよ。
4. 標本平均 $\overline{X}$ と不偏標本分散 $S^2$ を用いて $\alpha,\beta$ のモーメント法推定量を求めよ。

### 解答

#### 1. 条件付きモーメント

Poisson分布より

$$
E[X\mid\Lambda]=\Lambda,
\qquad
\operatorname{Var}(X\mid\Lambda)=\Lambda.
$$

Gamma分布より

$$
E[\Lambda]=\frac{\alpha}{\beta},
\qquad
\operatorname{Var}(\Lambda)=\frac{\alpha}{\beta^2}.
$$

#### 2. 周辺分布

$$
\begin{aligned}
P(X=k)
&=\int_0^\infty P(X=k\mid\Lambda=\lambda)g(\lambda)\,d\lambda\\
&=\int_0^\infty
\frac{\lambda^k e^{-\lambda}}{k!}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}
\,d\lambda\\
&=\frac{\beta^\alpha}{k!\Gamma(\alpha)}
\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}
\,d\lambda.
\end{aligned}
$$

Gamma積分より

$$
\int_0^\infty
\lambda^{k+\alpha-1}e^{-(\beta+1)\lambda}
\,d\lambda
=
\frac{\Gamma(k+\alpha)}{(\beta+1)^{k+\alpha}}.
$$

したがって

$$
\boxed{
P(X=k)
=
\frac{\Gamma(k+\alpha)}{k!\Gamma(\alpha)}
\left(\frac{\beta}{\beta+1}\right)^\alpha
\left(\frac1{\beta+1}\right)^k
}.
$$

これは負の二項分布の確率質量関数である。

#### 3. 全期待値と全分散

全期待値の公式から

$$
\begin{aligned}
E[X]
&=E[E[X\mid\Lambda]]\\
&=E[\Lambda]\\
&=\frac{\alpha}{\beta}.
\end{aligned}
$$

したがって

$$
\boxed{E[X]=\frac{\alpha}{\beta}}.
$$

全分散の公式

$$
\operatorname{Var}(X)
=E[\operatorname{Var}(X\mid\Lambda)]
+\operatorname{Var}(E[X\mid\Lambda])
$$

から

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[\Lambda]+\operatorname{Var}(\Lambda)\\
&=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}\\
&=\frac{\alpha}{\beta}\left(1+\frac1\beta\right).
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(X)
=
\frac{\alpha}{\beta}\left(1+\frac1\beta\right)
}.
$$

Poisson分布単独では平均と分散が等しいが、$\Lambda$ 自体をGamma分布で揺らすと

$$
\operatorname{Var}(X)>E[X]
$$

となり、過分散が生じる。

#### 4. モーメント法

理論平均と理論分散を標本モーメントへ一致させる。

$$
\overline{X}=\frac{\alpha}{\beta},
$$

$$
S^2
=\frac{\alpha}{\beta}\left(1+\frac1\beta\right).
$$

第1式から

$$
\alpha=\beta\overline{X}.
$$

これを第2式へ代入すると

$$
S^2
=\overline{X}\left(1+\frac1\beta\right).
$$

したがって

$$
\frac1\beta
=\frac{S^2-\overline{X}}{\overline{X}}
$$

なので

$$
\boxed{
\widehat{\beta}
=\frac{\overline{X}}{S^2-\overline{X}}
}
$$

および

$$
\boxed{
\widehat{\alpha}
=\frac{\overline{X}^2}{S^2-\overline{X}}
}.
$$

### 本番答案

Poisson--Gamma混合の周辺確率はGamma積分へ帰着し、負の二項分布となる。全期待値と全分散により

$$
E[X]=\frac{\alpha}{\beta},
\qquad
\operatorname{Var}(X)=\frac{\alpha}{\beta}+\frac{\alpha}{\beta^2}.
$$

モーメント法ではこれらを $\overline{X},S^2$ に一致させて

$$
\widehat{\beta}=\frac{\overline{X}}{S^2-\overline{X}},
\qquad
\widehat{\alpha}=\frac{\overline{X}^2}{S^2-\overline{X}}.
$$

### 持ち帰るパターン

$$
\operatorname{Poisson}(\Lambda),
\qquad
\Lambda\sim\operatorname{Gamma}
\quad\Longrightarrow\quad
\text{負の二項分布}
$$

であり、混合により異質性が入ると過分散が現れる。

---

## 4位: 2012 問2型 カイ二乗分布の比からBeta分布を作る

- 安定ID: `RECON-TOP10-04`
- 参照: 2012年 問2
- 確度: `third_party_topic_index`
- 主題: カイ二乗分布、再生性、Jacobian、Beta分布
- 変更点: Gamma分布との関係を補足した。

### 問題

独立に

$$
X\sim\chi_m^2,
\qquad
Y\sim\chi_n^2
$$

とする。

1. $\chi_\nu^2$ 分布のモーメント母関数を求めよ。
2. $X+Y\sim\chi_{m+n}^2$ を示せ。
3. $Z=X+Y$、$W=X/(X+Y)$ とおく。$W$ の分布を求め、$Z$ と $W$ の独立性を示せ。
4. $m,n>2$ のとき $W$ の最頻値を求めよ。

### 解答

#### 1. モーメント母関数

$$
\chi_\nu^2
\overset{d}{=}
\operatorname{Gamma}\left(\frac\nu2,\frac12\right)
$$

だから

$$
\boxed{
M_X(t)=(1-2t)^{-\nu/2},\qquad t<\frac12
}.
$$

#### 2. 再生性

独立性から

$$
\begin{aligned}
M_{X+Y}(t)
&=M_X(t)M_Y(t)\\
&=(1-2t)^{-m/2}(1-2t)^{-n/2}\\
&=(1-2t)^{-(m+n)/2}.
\end{aligned}
$$

したがって

$$
\boxed{X+Y\sim\chi_{m+n}^2}.
$$

#### 3. 2変数変換

変換

$$
Z=X+Y,
\qquad
W=\frac{X}{X+Y}
$$

の逆変換は

$$
X=ZW,
\qquad
Y=Z(1-W).
$$

Jacobianの絶対値は

$$
\left|\frac{\partial(X,Y)}{\partial(Z,W)}\right|=Z.
$$

カイ二乗分布の密度を代入して整理すると

$$
f_{Z,W}(z,w)
\propto
z^{(m+n)/2-1}e^{-z/2}
\cdot
w^{m/2-1}(1-w)^{n/2-1}.
$$

$z$ と $w$ の関数へ因数分解されるため

$$
\boxed{Z\perp W}
$$

かつ

$$
\boxed{
W\sim\operatorname{Beta}\left(\frac m2,\frac n2\right)
}.
$$

#### 4. 最頻値

$B\sim\operatorname{Beta}(a,b)$、$a,b>1$ の最頻値は

$$
\frac{a-1}{a+b-2}.
$$

ここで

$$
a=\frac m2,
\qquad
b=\frac n2
$$

だから

$$
\boxed{
\operatorname{mode}(W)
=\frac{m-2}{m+n-4}
}.
$$

### 本番答案

カイ二乗分布を同一rateのGamma分布とみなし、$Z=X+Y$、$W=X/(X+Y)$ と変換する。逆変換 $X=ZW$、$Y=Z(1-W)$、Jacobian $Z$ を用いると同時密度が $z$ 部分と $w$ 部分へ分離し

$$
Z\sim\chi_{m+n}^2,
\qquad
W\sim\operatorname{Beta}\left(\frac m2,\frac n2\right),
\qquad
Z\perp W.
$$

### 持ち帰るパターン

$$
\frac{X}{X+Y}
$$

が現れ、$X,Y$ が同一rateのGamma分布ならBeta分布を疑う。

---

## 5位: 2017 問5型 正規分布からカイ二乗・F・Cauchyへ

- 安定ID: `RECON-TOP10-05`
- 参照: 2017年 問5
- 確度: `third_party_topic_index`
- 主題: 分布間関係、非単調変換、比の分布
- 変更点: Cauchy分布への接続を $t_1$ の関係でも確認できる形にした。

### 問題

$Z_1,Z_2$ を独立な標準正規確率変数とする。

1. $X=Z_1^2$ の密度を求めよ。
2. $Y=Z_2^2$ とし、$S=X/Y$ の密度を求めよ。
3. $T=Z_1/Z_2$ が標準Cauchy分布に従うことを示せ。

### 解答

#### 1. 標準正規分布の二乗

$x>0$ に対して

$$
\begin{aligned}
P(X\le x)
&=P(Z_1^2\le x)\\
&=P(-\sqrt{x}\le Z_1\le\sqrt{x}).
\end{aligned}
$$

微分すると

$$
\boxed{
f_X(x)
=
\frac{1}{\sqrt{2\pi x}}e^{-x/2},
\qquad x>0
}.
$$

これは自由度1のカイ二乗分布である。

$$
\boxed{Z_1^2\sim\chi_1^2}.
$$

#### 2. 比の分布

$X,Y$ は独立な $\chi_1^2$ である。$S=X/Y$、$U=Y$ とおくと

$$
X=SU,
\qquad
Y=U
$$

であり、Jacobianの絶対値は $u$。したがって

$$
\begin{aligned}
f_S(s)
&=\int_0^\infty f_X(su)f_Y(u)u\,du\\
&=\frac{1}{\pi\sqrt{s}(1+s)},
\qquad s>0.
\end{aligned}
$$

よって

$$
\boxed{S\sim F_{1,1}}.
$$

#### 3. Cauchy分布

$T=Z_1/Z_2$ とすると

$$
T^2=S.
$$

$S$ の密度から $T$ の密度を変数変換してもよい。$s=t^2$ は2対1なので

$$
f_T(t)=f_S(t^2)\cdot 2|t|\cdot\frac12
$$

と考えるか、正負対称性を明示して計算する。より直接には

$$
T
=
\frac{Z_1}{\sqrt{Z_2^2/1}}
$$

であり、右辺は自由度1の $t$ 分布である。自由度1の $t$ 分布は標準Cauchy分布なので

$$
\boxed{
f_T(t)=\frac1{\pi(1+t^2)},
\qquad -\infty<t<\infty
}.
$$

### 本番答案

標準正規の二乗は $\chi_1^2$。独立な二つの $\chi_1^2$ の比は $F_{1,1}$。さらに

$$
\frac{Z_1}{Z_2}
=
\frac{N(0,1)}{\sqrt{\chi_1^2/1}}
\sim t_1
$$

で、$t_1$ は標準Cauchy分布である。

### 持ち帰るパターン

$$
N(0,1)
\xrightarrow{\text{二乗}}
\chi_1^2,
$$

$$
\frac{\chi_m^2/m}{\chi_n^2/n}
\sim F_{m,n},
$$

$$
\frac{N(0,1)}{\sqrt{\chi_\nu^2/\nu}}
\sim t_\nu,
\qquad
t_1=\text{Cauchy}.
$$

---

## 6位: 2012 問1型 確率積分変換と順序統計量

- 安定ID: `RECON-TOP10-06`
- 参照: 2012年 問1
- 確度: `third_party_topic_index`
- 主題: 確率積分変換、最小・中央値・最大
- 変更点: 確率積分変換と逆関数法の往復を明示した。

### 問題

連続確率変数 $Z$ の累積分布関数 $F_Z$ は連続かつ狭義単調増加とする。

1. $U=F_Z(Z)$ が $U(0,1)$ に従うことを示せ。
2. 独立に $U_1,U_2,U_3\sim U(0,1)$ とし、順序統計量を $U_{(1)}\le U_{(2)}\le U_{(3)}$ とする。3つの密度を求めよ。

### 解答

#### 1. 確率積分変換

$0<u<1$ とする。$F_Z$ は狭義単調増加なので

$$
F_Z(Z)\le u
\iff
Z\le F_Z^{-1}(u).
$$

したがって

$$
\begin{aligned}
P(U\le u)
&=P(F_Z(Z)\le u)\\
&=P(Z\le F_Z^{-1}(u))\\
&=F_Z(F_Z^{-1}(u))\\
&=u.
\end{aligned}
$$

よって

$$
\boxed{F_Z(Z)\sim U(0,1)}.
$$

逆に $U\sim U(0,1)$ なら $F_Z^{-1}(U)$ は分布関数 $F_Z$ に従う。これが逆関数法の基礎である。

#### 2. 最小値

$$
P(U_{(1)}>u)
=P(U_1>u,U_2>u,U_3>u)
=(1-u)^3.
$$

したがって

$$
F_{U_{(1)}}(u)=1-(1-u)^3
$$

より

$$
\boxed{f_{U_{(1)}}(u)=3(1-u)^2}.
$$

#### 中央値

$U_{(2)}\le u$ は3個のうち少なくとも2個が $u$ 以下ということだから

$$
\begin{aligned}
F_{U_{(2)}}(u)
&={3\choose2}u^2(1-u)+u^3\\
&=3u^2-2u^3.
\end{aligned}
$$

したがって

$$
\boxed{f_{U_{(2)}}(u)=6u(1-u)}.
$$

#### 最大値

$$
P(U_{(3)}\le u)=u^3
$$

より

$$
\boxed{f_{U_{(3)}}(u)=3u^2}.
$$

### 本番答案

確率積分変換ではCDFを直接計算し $P(F_Z(Z)\le u)=u$ を示す。3標本一様分布の順序統計量は、最小値は補集合、中央値は「少なくとも2個」、最大値は「3個全部」を使えばよい。

### 持ち帰るパターン

$$
X\sim F
\quad\Longrightarrow\quad
F(X)\sim U(0,1),
$$

$$
U\sim U(0,1)
\quad\Longrightarrow\quad
F^{-1}(U)\sim F.
$$

また

$$
U_{(k)}\sim\operatorname{Beta}(k,n+1-k).
$$

---

## 7位: 2022 問1型 ペア独立と相互独立

- 安定ID: `RECON-TOP10-07`
- 参照: 2022年 問1
- 確度: `third_party_topic_index`
- 主題: 包含排除、独立性、確率の上下限
- 変更点: ペア独立と相互独立の差を独立した小問として強調した。

### 問題

3事象 $A,B,C$ が

$$
P(A)=P(B)=P(C)=\frac34
$$

を満たすとする。

1. $A,B,C$ が相互に独立なら $P(A\cap B)$、$P(A\cap B\cap C)$ を求めよ。
2. 独立性を仮定しないとき $P(A\cap B)$ の取り得る範囲を求めよ。
3. 独立性を仮定しないとき $P(A\cap B\cap C)$ の取り得る範囲を求めよ。
4. $A,B,C$ がどの2事象を取っても独立であるとき、$q=P(A\cap B\cap C)$ の取り得る範囲を求めよ。

### 解答

#### 1. 相互独立

$$
P(A\cap B)
=P(A)P(B)
=\frac9{16}.
$$

また

$$
P(A\cap B\cap C)
=P(A)P(B)P(C)
=\frac{27}{64}.
$$

#### 2. 2事象の共通部分

一般に

$$
P(A\cap B)
\ge P(A)+P(B)-1
$$

かつ

$$
P(A\cap B)\le\min\{P(A),P(B)\}.
$$

したがって

$$
\boxed{
\frac12\le P(A\cap B)\le\frac34
}.
$$

#### 3. 3事象の共通部分

上限は

$$
P(A\cap B\cap C)\le\frac34.
$$

また

$$
(A\cap B\cap C)^c=A^c\cup B^c\cup C^c
$$

なのでBooleの不等式から

$$
P((A\cap B\cap C)^c)
\le\frac14+\frac14+\frac14
=\frac34.
$$

したがって

$$
P(A\cap B\cap C)\ge\frac14.
$$

よって

$$
\boxed{
\frac14\le P(A\cap B\cap C)\le\frac34
}.
$$

#### 4. ペア独立

ペア独立より

$$
P(A\cap B)
=P(B\cap C)
=P(C\cap A)
=\frac9{16}.
$$

$q=P(A\cap B\cap C)$ とおく。8つの原子的領域の確率がすべて非負でなければならない。

たとえば $A\cap B\cap C^c$ の確率は

$$
P(A\cap B)-q
=\frac9{16}-q
$$

なので

$$
q\le\frac9{16}.
$$

さらに $A$ のみが起こる領域は

$$
\begin{aligned}
P(A\cap B^c\cap C^c)
&=P(A)-P(A\cap B)-P(A\cap C)+q\\
&=\frac34-\frac9{16}-\frac9{16}+q\\
&=q-\frac38.
\end{aligned}
$$

よって

$$
q\ge\frac38.
$$

最後に何も起こらない領域は包含排除から

$$
\begin{aligned}
P(A^c\cap B^c\cap C^c)
&=1-P(A\cup B\cup C)\\
&=1-\left(\frac94-\frac{27}{16}+q\right)\\
&=\frac7{16}-q.
\end{aligned}
$$

したがって

$$
q\le\frac7{16}.
$$

これが最も強い上限であるから

$$
\boxed{
\frac38\le q\le\frac7{16}
}.
$$

相互独立なら $q=27/64$ だが、これは上の区間内の一点にすぎない。

### 本番答案

ペア独立は2事象の積確率だけを規定し、3重共通部分までは規定しない。$q=P(A\cap B\cap C)$ とおき、Venn図の各原子的領域の確率を $q$ で表して非負条件を課すと

$$
\frac38\le q\le\frac7{16}.
$$

### 持ち帰るパターン

$$
\text{相互独立}
\Longrightarrow
\text{ペアごとに独立}
$$

だが逆は一般に成立しない。

---

## 8位: 2014 問1型 条件付けによる最大確率の計算

- 安定ID: `RECON-TOP10-08`
- 参照: 2014年 問1
- 確度: `third_party_topic_index`
- 主題: 条件付き確率、全確率、独立性
- 変更点: 2変数から $n$ 変数まで一般化した。

### 問題

$U,V,W$ を独立に $U(0,1)$ に従う確率変数とする。

1. $X=U^2$、$Y=V^3$ とするとき $P(X>Y)$ を求めよ。
2. $\alpha,\beta,\gamma>0$ とし、$X=U^\alpha$、$Y=V^\beta$、$Z=W^\gamma$ とする。$X$ が3変数の中で最大となる確率を求めよ。
3. 独立な $U_i\sim U(0,1)$ と $\alpha_i>0$ に対し $X_i=U_i^{\alpha_i}$ とする。$P(X_1=\max_i X_i)$ を求めよ。

### 解答

#### 1. 1変数で条件付ける

$U=u$ と固定する。

$$
U^2>V^3
\iff
V<u^{2/3}.
$$

したがって

$$
P(X>Y\mid U=u)=u^{2/3}.
$$

これを $u$ について平均して

$$
\begin{aligned}
P(X>Y)
&=\int_0^1u^{2/3}\,du\\
&=\frac35.
\end{aligned}
$$

よって

$$
\boxed{P(X>Y)=\frac35}.
$$

#### 2. 3変数

$U=u$ と固定すると

$$
X>Y
\iff
V<u^{\alpha/\beta},
$$

$$
X>Z
\iff
W<u^{\alpha/\gamma}.
$$

$V,W$ は独立だから

$$
\begin{aligned}
P(X>Y,X>Z\mid U=u)
&=u^{\alpha/\beta}u^{\alpha/\gamma}\\
&=u^{\alpha(1/\beta+1/\gamma)}.
\end{aligned}
$$

よって

$$
P(X\text{ が最大})
=
\int_0^1u^{\alpha(1/\beta+1/\gamma)}\,du.
$$

したがって

$$
\boxed{
P(X\text{ が最大})
=
\frac{1/\alpha}{1/\alpha+1/\beta+1/\gamma}
}.
$$

#### 3. 一般化

$U_1=u$ と固定すると

$$
X_j<X_1
\iff
U_j<u^{\alpha_1/\alpha_j},
\qquad j\ge2.
$$

独立性から

$$
P(X_1\text{ が最大}\mid U_1=u)
=
\prod_{j=2}^n u^{\alpha_1/\alpha_j}.
$$

したがって

$$
\boxed{
P(X_1=\max_i X_i)
=
\frac{1/\alpha_1}{\sum_{j=1}^n1/\alpha_j}
}.
$$

### 本番答案

多変量積分へ直行せず、比較の基準となる変数を固定する。$U_1=u$ の下では他の各変数に関する条件が独立な区間条件へ分解されるため、条件付き確率は積で書ける。最後に $u$ について積分する。

### 持ち帰るパターン

$$
P(A)=E[P(A\mid X)]
$$

を使って、複数変数の確率を「1変数を固定した世界」へ落とす。

---

## 9位: 2021 問1型 指数分布と一様分布の和・依存構造

- 安定ID: `RECON-TOP10-09`
- 参照: 2021年 問1
- 確度: `third_party_topic_index`
- 主題: 畳み込み、支持集合、確率積分変換、依存構造
- 変更点: 独立の場合と完全依存の場合を対比した。

### 問題

周辺分布が

$$
f_X(x)=e^{-x},\qquad x>0,
$$

$$
f_Y(y)=1,\qquad 0<y<1
$$

で与えられるとする。

1. $E[X],E[Y]$ を求めよ。
2. $X,Y$ が独立なら $E[XY]$ を求めよ。
3. $X,Y$ が独立なら $Z=X+Y$ の密度を求めよ。
4. 今度は独立ではなく $Y=h(X)$ とし、$h$ は単調増加とする。$Y\sim U(0,1)$ となる $h$ を求め、さらに $E[XY]$ を求めよ。

### 解答

#### 1. 周辺平均

$X\sim\operatorname{Exp}(1)$ だから

$$
\boxed{E[X]=1}.
$$

$Y\sim U(0,1)$ だから

$$
\boxed{E[Y]=\frac12}.
$$

#### 2. 独立の場合

独立性より

$$
E[XY]=E[X]E[Y]
$$

なので

$$
\boxed{E[XY]=\frac12}.
$$

#### 3. 和の密度

畳み込みより

$$
f_Z(z)
=
\int_{-\infty}^{\infty}
f_X(z-y)f_Y(y)\,dy.
$$

条件は

$$
0<y<1,
\qquad
z-y>0.
$$

したがって積分範囲は

$$
0<y<\min(1,z).
$$

$0<z<1$ では

$$
\begin{aligned}
f_Z(z)
&=\int_0^z e^{-(z-y)}\,dy\\
&=1-e^{-z}.
\end{aligned}
$$

$z\ge1$ では

$$
\begin{aligned}
f_Z(z)
&=\int_0^1e^{-(z-y)}\,dy\\
&=(e-1)e^{-z}.
\end{aligned}
$$

したがって

$$
\boxed{
f_Z(z)=
\begin{cases}
0,&z\le0,\\
1-e^{-z},&0<z<1,\\
(e-1)e^{-z},&z\ge1.
\end{cases}
}
$$

である。

#### 4. 完全依存の場合

$h$ は単調増加だから

$$
F_Y(h(x))=F_X(x).
$$

$Y\sim U(0,1)$ なので $F_Y(y)=y$、また

$$
F_X(x)=1-e^{-x}
$$

だから

$$
\boxed{h(x)=1-e^{-x}}.
$$

すなわち

$$
Y=F_X(X).
$$

これは確率積分変換そのものである。

さらに

$$
\begin{aligned}
E[XY]
&=E[X(1-e^{-X})]\\
&=E[X]-E[Xe^{-X}]\\
&=1-\int_0^\infty xe^{-2x}\,dx.
\end{aligned}
$$

$$
\int_0^\infty xe^{-ax}\,dx=\frac1{a^2}
$$

より

$$
E[Xe^{-X}]=\frac14.
$$

したがって

$$
\boxed{E[XY]=\frac34}.
$$

同じ周辺分布でも、独立なら $E[XY]=1/2$、この完全依存なら $E[XY]=3/4$ である。周辺分布だけでは同時分布は決まらない。

### 本番答案

和の密度では積分計算より先に支持集合

$$
0<y<1,
\qquad y<z
$$

を決め、$z=1$ で場合分けする。依存の場合は $Y=F_X(X)$ とすれば確率積分変換により一様分布になる。

### 持ち帰るパターン

$$
X+Y
\Longrightarrow
\text{畳み込みと支持集合},
$$

$$
F_X(X)
\Longrightarrow
U(0,1),
$$

$$
\text{周辺分布が同じ}
\not\Longrightarrow
\text{同時分布が同じ}.
$$

---

## 10位: 2018 問5型 順序統計量とrange

- 安定ID: `RECON-TOP10-10`
- 参照: 2018年 問5
- 確度: `third_party_topic_index`
- 主題: 最小・中央値・最大、同時密度、range
- 変更点: range の密度まで独立に導出し、Beta分布との対応を強調した。

### 問題

独立に

$$
X_1,X_2,X_3\sim U(0,1)
$$

とし、順序統計量を

$$
Y_1=X_{(1)},
\qquad
Y_2=X_{(2)},
\qquad
Y_3=X_{(3)}
$$

とする。

1. $Y_1,Y_3$ の密度と期待値を求めよ。
2. $Y_2$ の密度を求め、$P(Y_2\le1/2)$ を求めよ。
3. range $R=Y_3-Y_1$ の密度、期待値、分散を求めよ。

### 解答

#### 1. 最小値

$$
P(Y_1>y)
=P(X_1>y,X_2>y,X_3>y)
=(1-y)^3.
$$

したがって

$$
F_{Y_1}(y)=1-(1-y)^3
$$

より

$$
\boxed{f_{Y_1}(y)=3(1-y)^2}.
$$

期待値は

$$
\boxed{E[Y_1]=\frac14}.
$$

#### 最大値

$$
P(Y_3\le y)=y^3
$$

より

$$
\boxed{f_{Y_3}(y)=3y^2}
$$

かつ

$$
\boxed{E[Y_3]=\frac34}.
$$

#### 2. 中央値

$Y_2\le y$ は少なくとも2個が $y$ 以下であることなので

$$
\begin{aligned}
F_{Y_2}(y)
&={3\choose2}y^2(1-y)+y^3\\
&=3y^2-2y^3.
\end{aligned}
$$

よって

$$
\boxed{f_{Y_2}(y)=6y(1-y)}.
$$

これは $\operatorname{Beta}(2,2)$ であり、$1/2$ を中心に対称だから

$$
\boxed{P(Y_2\le1/2)=\frac12}.
$$

#### 3. rangeの分布

最小値と最大値の同時密度を求める。$0<y_1<y_3<1$ で、3標本のうち1個が最小値、1個が最大値、残り1個が $(y_1,y_3)$ に入る。役割の割当ては $3!=6$ 通りなので

$$
\boxed{
f_{Y_1,Y_3}(y_1,y_3)
=6(y_3-y_1),
\qquad 0<y_1<y_3<1
}.
$$

変換

$$
R=Y_3-Y_1,
\qquad
W=Y_1
$$

を用いる。逆変換は

$$
Y_1=W,
\qquad
Y_3=W+R
$$

で、Jacobianの絶対値は1。領域は

$$
0<r<1,
\qquad
0<w<1-r.
$$

したがって

$$
\begin{aligned}
f_R(r)
&=\int_0^{1-r}6r\,dw\\
&=6r(1-r),
\qquad 0<r<1.
\end{aligned}
$$

よって

$$
\boxed{R\sim\operatorname{Beta}(2,2)}.
$$

したがって

$$
\boxed{E[R]=\frac12}.
$$

またBeta分布の分散公式

$$
\operatorname{Var}(B)
=
\frac{ab}{(a+b)^2(a+b+1)}
$$

に $a=b=2$ を代入して

$$
\boxed{\operatorname{Var}(R)=\frac1{20}}.
$$

### 本番答案

最小値と最大値はCDFから求め、中央値は二項計数で求める。rangeではまず $(Y_1,Y_3)$ の同時密度

$$
6(y_3-y_1)
$$

を作り、$R=Y_3-Y_1$ へ変換する。結果は $R\sim\operatorname{Beta}(2,2)$ なので平均 $1/2$、分散 $1/20$。

### 持ち帰るパターン

最大値と最小値は一般に独立ではない。したがって

$$
\operatorname{Var}(Y_3-Y_1)
$$

を単純に分散の和として処理せず、同時分布または共分散を扱う。

---

## 10題を横断して残す変身パターン

この10題では、次の分布間関係と解法を白紙から再現できることを目標とする。

$$
\operatorname{Gamma}+\operatorname{Gamma}
\to
\operatorname{Gamma},
$$

$$
\frac{\operatorname{Gamma}}
{\operatorname{Gamma}+\operatorname{Gamma}}
\to
\operatorname{Beta},
$$

$$
\chi_m^2+\chi_n^2
\to
\chi_{m+n}^2,
$$

$$
\frac{\chi_m^2/m}{\chi_n^2/n}
\to
F_{m,n},
$$

$$
\frac{N(0,1)}{\sqrt{\chi_\nu^2/\nu}}
\to
t_\nu,
$$

$$
t_1
\to
\operatorname{Cauchy}(0,1),
$$

$$
\operatorname{Poisson}(\Lambda),
\quad
\Lambda\sim\operatorname{Gamma}
\to
\text{負の二項分布},
$$

$$
U_{(k)}
\to
\operatorname{Beta}(k,n+1-k),
$$

$$
F_X(X)
\to
U(0,1).
$$

## 解法選択のチェックリスト

- $F_X(X)$ が見えたら確率積分変換を疑う。
- $F_X^{-1}(U)$ が見えたら逆関数法を疑う。
- 最大・最小・第 $k$ 順序統計量ではまずCDFまたは配置係数を考える。
- $X+Y$ では畳み込みより前に支持集合を描く。
- $X/(X+Y)$ で $X,Y$ が同一rateのGamma分布ならBeta分布を疑う。
- 独立なカイ二乗分布の正規化比なら $F$ 分布を疑う。
- 標準正規とカイ二乗分布の組合せなら $t$ 分布を疑う。
- Poisson率をGamma分布で混合したら負の二項分布と過分散を疑う。
- 複数変数の大小比較では1変数で条件付けて次元を落とせないか確認する。
- 「どの2つも独立」と「すべて相互に独立」を区別する。
- 最大値と最小値は原則として独立ではない。

## 参照方針

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは、出題テーマをもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
