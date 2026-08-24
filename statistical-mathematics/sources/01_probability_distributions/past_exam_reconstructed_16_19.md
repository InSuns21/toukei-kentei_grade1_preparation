# 確率分布分野 過去問型再構成演習 16位〜19位

このファイルは、統計検定1級「統計数理」の過去問テーマ一覧と公開解説をもとに、演習価値ランキング16位〜19位の4題を独自の設定・文章で再構成した演習集である。

- 原問題文・図表は転載しない。
- 年度・問番号は出題テーマの参照用であり、以下の問題文そのものが公式問題文ではない。
- 記号・設問順・補助設問は学習用に独自化している。
- 確度は `third_party_topic_index` とし、公式問題集を直接照合した `official_problem` ではない。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 対象ランキング

| 順位 | 参照年・問 | 主題 | Level | 目安時間 | 主な使用技術 |
|---:|---|---|:---:|---:|---|
| 16 | 2013 問1 | 依存する一様分布 | B | 15分 | 一様分布、完全依存、相関、単調変換、CDF法 |
| 17 | 2019 問1 | 二項分布の分布関数 | C | 25分 | PGF、下側確率評価、最適化、Chernoff型評価 |
| 18 | 2017 問3 | Poisson分布の極限 | C | 25分 | 二項→Poisson極限、MGF、再生性、正規近似 |
| 19 | 2024 問4 | 経験分布・混合分布 | C | 25分 | 経験分布、tail integral、指数--Gamma混合、重尾分布 |

---

## 16位: 2013 問1型 依存する一様分布と変数変換

- 安定ID: `RECON-R16-2013-Q1`
- 参照: 2013年 問1
- 確度: `third_party_topic_index`
- 主題: 一様分布、完全な負の依存、相関係数、単調変換
- 変更点: $Y=1-X$ という完全依存を明示し、比 $W=X/Y$ の分布をCDF法で導く構成にした。

### 問題

確率変数 $X$ が

$$
X\sim U\left(0,\frac12\right)
$$

に従うとする。さらに

$$
Y=1-X
$$

と定める。

1. $E[X],E[Y],\operatorname{Var}(X),\operatorname{Var}(Y)$ を求めよ。
2. $\operatorname{Cov}(X,Y)$ と相関係数 $\rho_{XY}$ を求めよ。
3. 

$$
W=\frac{X}{Y}=\frac{X}{1-X}
$$

とする。$W$ の台と累積分布関数を求めよ。
4. $W$ の密度を求めよ。
5. $E[W]$ と中央値を求めよ。

### 解答

#### 1. 平均と分散

一般に

$$
U\sim U(a,b)
$$

なら

$$
E[U]=\frac{a+b}{2},
\qquad
\operatorname{Var}(U)=\frac{(b-a)^2}{12}.
$$

したがって

$$
E[X]
=\frac{0+1/2}{2}
=\frac14,
$$

$$
\operatorname{Var}(X)
=\frac{(1/2)^2}{12}
=\frac1{48}.
$$

また $Y=1-X$ なので

$$
E[Y]
=1-E[X]
=\frac34,
$$

$$
\operatorname{Var}(Y)
=\operatorname{Var}(1-X)
=\operatorname{Var}(X)
=\frac1{48}.
$$

よって

$$
\boxed{
E[X]=\frac14,
\quad
E[Y]=\frac34,
\quad
\operatorname{Var}(X)=\operatorname{Var}(Y)=\frac1{48}
}.
$$

#### 2. 共分散と相関係数

$Y=1-X$ だから

$$
\begin{aligned}
\operatorname{Cov}(X,Y)
&=\operatorname{Cov}(X,1-X)\\
&=-\operatorname{Var}(X)\\
&=-\frac1{48}.
\end{aligned}
$$

したがって

$$
\rho_{XY}
=
\frac{-1/48}{\sqrt{1/48}\sqrt{1/48}}
=-1.
$$

よって

$$
\boxed{\rho_{XY}=-1}.
$$

これは「相関係数が $-1$」というだけでなく、実際に

$$
Y=1-X
$$

という一次関係が確率1で成り立つ完全な負の依存である。

#### 3. $W$ の台と累積分布関数

$0\le X\le1/2$ なので

$$
0\le \frac{X}{1-X}\le1.
$$

したがって $W$ の台は $[0,1]$。

$0\le w\le1$ に対し

$$
\begin{aligned}
F_W(w)
&=P(W\le w)\\
&=P\left(\frac{X}{1-X}\le w\right).
\end{aligned}
$$

$1-X>0$ だから

$$
\frac{X}{1-X}\le w
$$

は

$$
X\le w(1-X)
$$

すなわち

$$
X(1+w)\le w
$$

と同値である。よって

$$
X\le\frac{w}{1+w}.
$$

$X\sim U(0,1/2)$ の累積分布関数は

$$
F_X(x)=2x,
\qquad 0\le x\le\frac12
$$

なので

$$
F_W(w)
=2\frac{w}{1+w}.
$$

したがって

$$
\boxed{
F_W(w)=
\begin{cases}
0,&w<0,\\
\dfrac{2w}{1+w},&0\le w\le1,\\
1,&w>1.
\end{cases}
}
$$

#### 4. 密度

$0<w<1$ で微分して

$$
\begin{aligned}
f_W(w)
&=\frac{d}{dw}\frac{2w}{1+w}\\
&=\frac{2(1+w)-2w}{(1+w)^2}\\
&=\frac{2}{(1+w)^2}.
\end{aligned}
$$

よって

$$
\boxed{
f_W(w)=\frac{2}{(1+w)^2},
\qquad 0<w<1
}.
$$

#### 5. 期待値と中央値

期待値は

$$
\begin{aligned}
E[W]
&=\int_0^1w\frac{2}{(1+w)^2}\,dw.
\end{aligned}
$$

$t=1+w$ とおくと

$$
w=t-1,
\qquad
1\le t\le2
$$

なので

$$
\begin{aligned}
E[W]
&=\int_1^2\frac{2(t-1)}{t^2}\,dt\\
&=\int_1^2\left(\frac2t-\frac{2}{t^2}\right)dt\\
&=2\log2-1.
\end{aligned}
$$

したがって

$$
\boxed{E[W]=2\log2-1}.
$$

中央値 $m$ は

$$
F_W(m)=\frac12
$$

を満たすので

$$
\frac{2m}{1+m}=\frac12.
$$

したがって

$$
4m=1+m
$$

より

$$
\boxed{m=\frac13}.
$$

### 本番答案

$Y=1-X$ より平均・分散は線形変換で求まり、$\operatorname{Cov}(X,Y)=-\operatorname{Var}(X)$ なので相関係数は $-1$。比

$$
W=\frac{X}{1-X}
$$

は単調増加変換であり、CDF法を使うと

$$
F_W(w)=P\left(X\le\frac{w}{1+w}\right)=\frac{2w}{1+w}
$$

となる。よって

$$
f_W(w)=\frac{2}{(1+w)^2},
\qquad 0<w<1,
$$

$$
E[W]=2\log2-1,
\qquad
\operatorname{median}(W)=\frac13.
$$

### 持ち帰るパターン

- 周辺分布が一様でも、2変数が独立とは限らない。
- $Y=a+bX$ が確率1で成り立つなら $|\rho|=1$。
- 単調変換 $W=h(X)$ の分布は

$$
P(W\le w)
$$

を $X$ の不等式に戻すCDF法が堅い。

---

## 17位: 2019 問1型 二項分布の確率母関数から下側確率を評価する

- 安定ID: `RECON-R17-2019-Q1`
- 参照: 2019年 問1
- 確度: `third_party_topic_index`
- 主題: 二項分布、確率母関数、分布関数の上界、最適化
- 変更点: PGFから期待値・分散を出した後、下側確率に対するChernoff型評価へ接続した。

### 問題

$X\sim\operatorname{Bin}(n,p)$ とする。

1. 確率母関数

$$
G_X(t)=E[t^X]
$$

を求めよ。
2. $G_X'(1),G_X''(1)$ を用いて $E[X]$ と $\operatorname{Var}(X)$ を求めよ。
3. $0<t\le1$、実数 $r\ge0$ に対して

$$
P(X\le r)\le t^{-r}G_X(t)
$$

を示せ。
4. $0<a<p<1$ とする。$r=an$ として前問の上界を $t$ について最小化し、

$$
P(X\le an)
$$

の指数型上界を求めよ。
5. 得られた上界をKullback--Leibler型の形で書き直せ。

### 解答

#### 1. 確率母関数

二項分布の確率質量関数は

$$
P(X=k)
={n\choose k}p^k(1-p)^{n-k},
\qquad k=0,1,\ldots,n.
$$

したがって

$$
\begin{aligned}
G_X(t)
&=\sum_{k=0}^nt^k{n\choose k}p^k(1-p)^{n-k}\\
&=\sum_{k=0}^n{n\choose k}(pt)^k(1-p)^{n-k}\\
&=(pt+1-p)^n.
\end{aligned}
$$

よって

$$
\boxed{G_X(t)=(1-p+pt)^n}.
$$

#### 2. 平均と分散

確率母関数について

$$
E[X]=G_X'(1),
$$

$$
E[X(X-1)]=G_X''(1)
$$

が成り立つ。

微分すると

$$
G_X'(t)=np(1-p+pt)^{n-1},
$$

$$
G_X''(t)=n(n-1)p^2(1-p+pt)^{n-2}.
$$

したがって

$$
E[X]=np.
$$

また

$$
E[X^2]
=E[X(X-1)]+E[X]
=G_X''(1)+G_X'(1)
$$

だから

$$
\begin{aligned}
\operatorname{Var}(X)
&=E[X^2]-E[X]^2\\
&=n(n-1)p^2+np-n^2p^2\\
&=np(1-p).
\end{aligned}
$$

よって

$$
\boxed{E[X]=np,
\qquad
\operatorname{Var}(X)=np(1-p)}.
$$

#### 3. 下側確率の評価

$0<t\le1$ とする。

$$
\begin{aligned}
t^{-r}G_X(t)
&=\sum_{k=0}^nt^{k-r}P(X=k)\\
&=\sum_{k\le r}t^{k-r}P(X=k)
 +\sum_{k>r}t^{k-r}P(X=k).
\end{aligned}
$$

第2項は非負だから

$$
t^{-r}G_X(t)
\ge
\sum_{k\le r}t^{k-r}P(X=k).
$$

$k\le r$ なら $k-r\le0$。しかも $0<t\le1$ なので

$$
t^{k-r}\ge1.
$$

したがって

$$
\sum_{k\le r}t^{k-r}P(X=k)
\ge
\sum_{k\le r}P(X=k)
=P(X\le r).
$$

よって

$$
\boxed{P(X\le r)\le t^{-r}G_X(t)}.
$$

これはMarkovの不等式を指数変換に適用するChernoff型評価と同じ発想である。

#### 4. 二項分布に代入して最適化

$r=an$ とし、$0<a<p<1$ とする。

前問より

$$
P(X\le an)
\le
t^{-an}(1-p+pt)^n.
$$

右辺を

$$
B(t)=t^{-an}(1-p+pt)^n
$$

とおく。

積の最小化なので対数を取る。

$$
\log B(t)
=-an\log t+n\log(1-p+pt).
$$

微分すると

$$
\begin{aligned}
\frac{d}{dt}\log B(t)
&=-\frac{an}{t}+\frac{np}{1-p+pt}.
\end{aligned}
$$

これを0とおく。

$$
-\frac{a}{t}+\frac{p}{1-p+pt}=0.
$$

したがって

$$
p t=a(1-p+pt).
$$

よって

$$
p t(1-a)=a(1-p)
$$

なので

$$
\boxed{
t_*=
\frac{a(1-p)}{p(1-a)}
}.
$$

$0<a<p$ だから $0<t_*<1$ であり、許された範囲内にある。

これを上界へ代入する。

まず

$$
t_*^{-an}
=
\left(
\frac{p(1-a)}{a(1-p)}
\right)^{an}.
$$

また

$$
\begin{aligned}
1-p+pt_*
&=1-p+\frac{a(1-p)}{1-a}\\
&=(1-p)\left(1+\frac{a}{1-a}\right)\\
&=\frac{1-p}{1-a}.
\end{aligned}
$$

したがって

$$
\begin{aligned}
P(X\le an)
&\le
\left(
\frac{p(1-a)}{a(1-p)}
\right)^{an}
\left(
\frac{1-p}{1-a}
\right)^n\\
&=
\left(\frac{p}{a}\right)^{an}
\left(\frac{1-p}{1-a}\right)^{(1-a)n}.
\end{aligned}
$$

よって

$$
\boxed{
P(X\le an)
\le
\left(\frac{p}{a}\right)^{an}
\left(\frac{1-p}{1-a}\right)^{(1-a)n}
}.
$$

#### 5. KL型の表現

上界の対数を取ると

$$
\begin{aligned}
\log P(X\le an)
&\le
n\left[
 a\log\frac{p}{a}
 +(1-a)\log\frac{1-p}{1-a}
\right].
\end{aligned}
$$

ここでBernoulli分布間のKL情報量

$$
D(a\|p)
=
a\log\frac{a}{p}
+(1-a)\log\frac{1-a}{1-p}
$$

を用いれば

$$
\boxed{
P(X\le an)
\le
\exp\{-nD(a\|p)\}
}.
$$

この形から、平均 $np$ より固定割合だけ下に外れる確率が $n$ に対して指数的に減少することが読み取れる。

### 本番答案

二項分布のPGFは

$$
G_X(t)=(1-p+pt)^n.
$$

$0<t\le1$ なら $k\le r$ に対して $t^{k-r}\ge1$ なので

$$
P(X\le r)\le t^{-r}G_X(t).
$$

$r=an$ として右辺の対数を最小化すると

$$
t_*=\frac{a(1-p)}{p(1-a)}
$$

を得る。よって

$$
P(X\le an)
\le
\left(\frac{p}{a}\right)^{an}
\left(\frac{1-p}{1-a}\right)^{(1-a)n}
=
\exp\{-nD(a\|p)\}.
$$

### 持ち帰るパターン

- PGFはモーメントを出すだけでなく、尾確率評価にも使える。
- 積の最適化では対数を取る。
- 二項分布の大偏差型確率は

$$
\exp\{-nD(a\|p)\}
$$

という形が自然に現れる。

---

## 18位: 2017 問3型 二項分布からPoisson分布、さらに正規分布へ

- 安定ID: `RECON-R18-2017-Q3`
- 参照: 2017年 問3
- 確度: `third_party_topic_index`
- 主題: Poisson極限、MGF、再生性、標準化極限
- 変更点: 二項→Poissonだけでなく、Poisson→正規の極限まで一つの流れに整理した。

### 問題

1. $X_n\sim\operatorname{Bin}(n,\lambda/n)$ とする。固定した非負整数 $k$ に対し

$$
P(X_n=k)
$$

の $n\to\infty$ における極限を求めよ。
2. $X\sim\operatorname{Poisson}(\lambda)$ のモーメント母関数を求め、$E[X]$ と $\operatorname{Var}(X)$ を導け。
3. 独立に

$$
X_1\sim\operatorname{Poisson}(\lambda_1),
\qquad
X_2\sim\operatorname{Poisson}(\lambda_2)
$$

とするとき、$X_1+X_2$ の分布を求めよ。
4. $X_\lambda\sim\operatorname{Poisson}(\lambda)$ とし

$$
Z_\lambda
=
\frac{X_\lambda-\lambda}{\sqrt{\lambda}}
$$

とする。$\lambda\to\infty$ で $Z_\lambda$ が標準正規分布に近づくことをモーメント母関数を用いて示せ。

### 解答

#### 1. 二項分布のPoisson極限

$$
P(X_n=k)
={n\choose k}
\left(\frac{\lambda}{n}\right)^k
\left(1-\frac{\lambda}{n}\right)^{n-k}.
$$

これを

$$
\begin{aligned}
P(X_n=k)
&=
\frac{n(n-1)\cdots(n-k+1)}{k!}
\frac{\lambda^k}{n^k}
\left(1-\frac{\lambda}{n}\right)^n
\left(1-\frac{\lambda}{n}\right)^{-k}\\
&=
\frac{\lambda^k}{k!}
\prod_{j=0}^{k-1}\left(1-\frac{j}{n}\right)
\left(1-\frac{\lambda}{n}\right)^n
\left(1-\frac{\lambda}{n}\right)^{-k}
\end{aligned}
$$

と書く。

固定 $k$ に対し

$$
\prod_{j=0}^{k-1}\left(1-\frac{j}{n}\right)
\to1,
$$

$$
\left(1-\frac{\lambda}{n}\right)^{-k}
\to1,
$$

また

$$
\left(1-\frac{\lambda}{n}\right)^n
\to e^{-\lambda}.
$$

したがって

$$
\boxed{
P(X_n=k)
\to
\frac{\lambda^k e^{-\lambda}}{k!}
}.
$$

これは $\operatorname{Poisson}(\lambda)$ の確率質量関数である。

#### 2. Poisson分布のMGF

$$
\begin{aligned}
M_X(t)
&=E[e^{tX}]\\
&=\sum_{k=0}^{\infty}e^{tk}
 e^{-\lambda}\frac{\lambda^k}{k!}\\
&=e^{-\lambda}
\sum_{k=0}^{\infty}
\frac{(\lambda e^t)^k}{k!}\\
&=e^{-\lambda}e^{\lambda e^t}\\
&=\exp\{\lambda(e^t-1)\}.
\end{aligned}
$$

よって

$$
\boxed{M_X(t)=\exp\{\lambda(e^t-1)\}}.
$$

微分すると

$$
M_X'(t)
=
\lambda e^t\exp\{\lambda(e^t-1)\}
$$

なので

$$
E[X]=M_X'(0)=\lambda.
$$

また

$$
M_X''(0)=\lambda+\lambda^2.
$$

したがって

$$
\operatorname{Var}(X)
=M_X''(0)-M_X'(0)^2
=\lambda.
$$

よって

$$
\boxed{E[X]=\lambda,
\qquad
\operatorname{Var}(X)=\lambda}.
$$

#### 3. 再生性

独立性より

$$
\begin{aligned}
M_{X_1+X_2}(t)
&=M_{X_1}(t)M_{X_2}(t)\\
&=\exp\{\lambda_1(e^t-1)\}
\exp\{\lambda_2(e^t-1)\}\\
&=\exp\{(\lambda_1+\lambda_2)(e^t-1)\}.
\end{aligned}
$$

これは $\operatorname{Poisson}(\lambda_1+\lambda_2)$ のMGFだから

$$
\boxed{
X_1+X_2
\sim
\operatorname{Poisson}(\lambda_1+\lambda_2)
}.
$$

#### 4. Poisson分布の正規極限

$$
Z_\lambda
=
\frac{X_\lambda-\lambda}{\sqrt{\lambda}}
$$

だから

$$
\begin{aligned}
M_{Z_\lambda}(t)
&=E\left[
\exp\left\{
\frac{t(X_\lambda-\lambda)}{\sqrt{\lambda}}
\right\}
\right]\\
&=e^{-t\sqrt{\lambda}}
M_{X_\lambda}\left(\frac{t}{\sqrt{\lambda}}\right)\\
&=
\exp\left[
-t\sqrt{\lambda}
+\lambda\left(
 e^{t/\sqrt{\lambda}}-1
\right)
\right].
\end{aligned}
$$

指数部を展開する。

$$
e^{t/\sqrt{\lambda}}
=
1+\frac{t}{\sqrt{\lambda}}
+\frac{t^2}{2\lambda}
+O(\lambda^{-3/2}).
$$

したがって

$$
\begin{aligned}
&-t\sqrt{\lambda}
+\lambda\left(
 e^{t/\sqrt{\lambda}}-1
\right)\\
&=-t\sqrt{\lambda}
+\lambda\left[
\frac{t}{\sqrt{\lambda}}
+\frac{t^2}{2\lambda}
+O(\lambda^{-3/2})
\right]\\
&=-t\sqrt{\lambda}
+t\sqrt{\lambda}
+\frac{t^2}{2}
+O(\lambda^{-1/2})\\
&\to\frac{t^2}{2}.
\end{aligned}
$$

よって

$$
M_{Z_\lambda}(t)
\to
e^{t^2/2}.
$$

右辺は $N(0,1)$ のMGFだから

$$
\boxed{
Z_\lambda
\xrightarrow{d}
N(0,1)
}.
$$

### 本番答案

二項分布で $p_n=\lambda/n$ とすると、固定 $k$ に対する確率質量は

$$
{n\choose k}
\left(\frac{\lambda}{n}\right)^k
\left(1-\frac{\lambda}{n}\right)^{n-k}
\to
\frac{\lambda^k e^{-\lambda}}{k!}.
$$

Poisson分布のMGFは

$$
\exp\{\lambda(e^t-1)\}
$$

であり、平均・分散はいずれも $\lambda$。独立なPoisson変数の和もPoisson。さらに標準化変数のMGFの指数部を $t/\sqrt{\lambda}$ で展開すると $t^2/2$ へ収束するため、標準正規分布へ分布収束する。

### 持ち帰るパターン

$$
\operatorname{Bin}\left(n,\frac{\lambda}{n}\right)
\Longrightarrow
\operatorname{Poisson}(\lambda)
$$

は「希少事象極限」。一方

$$
\frac{\operatorname{Poisson}(\lambda)-\lambda}{\sqrt{\lambda}}
\Longrightarrow
N(0,1)
$$

は「平均数が大きいときの正規近似」である。

---

## 19位: 2024 問4型 経験分布と指数--Gamma混合

- 安定ID: `RECON-R19-2024-Q4`
- 参照: 2024年 問4
- 確度: `third_party_topic_index`
- 主題: 経験分布、tail integral、混合分布、重尾分布
- 変更点: 離散的な経験分布の図示を式へ置き換え、指数--Gamma混合からLomax型分布を導出する流れにした。

### 問題

観測値

$$
1,2,2,3,4
$$

を得たとする。

1. 経験分布関数

$$
F_5(x)
=\frac15\sum_{i=1}^5\boldsymbol{1}_{\{X_i\le x\}}
$$

を区分的に書け。
2. 標本平均 $\overline{X}$ を求め、

$$
\int_0^\infty\{1-F_5(x)\}\,dx
$$

と一致することを確認せよ。
3. 一般に非負連続確率変数 $X$ について

$$
E[X]
=
\int_0^\infty\{1-F_X(x)\}\,dx
$$

を示せ。
4. 条件付きで

$$
X\mid\Lambda=\lambda
\sim
\operatorname{Exp}(\lambda)
$$

すなわち

$$
f_{X\mid\Lambda}(x\mid\lambda)
=
\lambda e^{-\lambda x},
\qquad x\ge0
$$

とする。さらに

$$
\Lambda\sim\operatorname{Gamma}(\alpha,\beta)
$$

をshape-rate表示

$$
g(\lambda)
=
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda},
\qquad \lambda>0
$$

で与える。$X$ の周辺密度を求めよ。
5. $X$ の累積分布関数を求め、$E[X]$ が有限となる条件とその値を求めよ。
6. 混合後の分布が指数分布より重い尾を持つことを、上側確率から説明せよ。

### 解答

#### 1. 経験分布関数

標本は

$$
1,2,2,3,4
$$

なので、$x$ 以下の観測値の割合を数える。

$$
\boxed{
F_5(x)=
\begin{cases}
0,&x<1,\\
1/5,&1\le x<2,\\
3/5,&2\le x<3,\\
4/5,&3\le x<4,\\
1,&x\ge4.
\end{cases}
}
$$

経験分布関数は各観測値で $1/n$ ずつ跳ぶ右連続の階段関数である。同じ値が複数回観測されれば、その点では複数段分まとめて跳ぶ。

#### 2. 標本平均と経験分布の上側面積

標本平均は

$$
\overline{X}
=\frac{1+2+2+3+4}{5}
=\frac{12}{5}.
$$

一方

$$
1-F_5(x)
$$

は

$$
\begin{cases}
1,&0\le x<1,\\
4/5,&1\le x<2,\\
2/5,&2\le x<3,\\
1/5,&3\le x<4,\\
0,&x\ge4.
\end{cases}
$$

だから

$$
\begin{aligned}
\int_0^\infty\{1-F_5(x)\}\,dx
&=1\cdot1
+\frac45\cdot1
+\frac25\cdot1
+\frac15\cdot1\\
&=\frac{12}{5}.
\end{aligned}
$$

したがって

$$
\boxed{
\int_0^\infty\{1-F_5(x)\}\,dx
=\overline{X}
}.
$$

#### 3. tail integral identity

$X\ge0$ とする。

$$
1-F_X(x)
=P(X>x).
$$

密度 $f_X$ を持つ場合

$$
P(X>x)
=\int_x^\infty f_X(y)\,dy.
$$

したがって

$$
\begin{aligned}
\int_0^\infty\{1-F_X(x)\}\,dx
&=\int_0^\infty\int_x^\infty f_X(y)\,dy\,dx.
\end{aligned}
$$

積分領域は

$$
0\le x\le y<\infty.
$$

積分順序を交換すると

$$
\begin{aligned}
\int_0^\infty\int_x^\infty f_X(y)\,dy\,dx
&=\int_0^\infty\int_0^y f_X(y)\,dx\,dy\\
&=\int_0^\infty y f_X(y)\,dy\\
&=E[X].
\end{aligned}
$$

よって

$$
\boxed{
E[X]
=\int_0^\infty\{1-F_X(x)\}\,dx
}.
$$

この公式は非負確率変数について非常に広く使える。

#### 4. 指数--Gamma混合の周辺密度

混合分布の定義より

$$
\begin{aligned}
f_X(x)
&=\int_0^\infty
f_{X\mid\Lambda}(x\mid\lambda)
g(\lambda)\,d\lambda\\
&=\int_0^\infty
\lambda e^{-\lambda x}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}
\,d\lambda\\
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\int_0^\infty
\lambda^\alpha e^{-(\beta+x)\lambda}
\,d\lambda.
\end{aligned}
$$

Gamma積分

$$
\int_0^\infty
\lambda^\alpha e^{-c\lambda}\,d\lambda
=
\frac{\Gamma(\alpha+1)}{c^{\alpha+1}}
$$

を用いて

$$
\begin{aligned}
f_X(x)
&=\frac{\beta^\alpha}{\Gamma(\alpha)}
\frac{\Gamma(\alpha+1)}{(\beta+x)^{\alpha+1}}\\
&=\frac{\alpha\beta^\alpha}{(\beta+x)^{\alpha+1}}.
\end{aligned}
$$

よって

$$
\boxed{
f_X(x)
=
\frac{\alpha\beta^\alpha}{(\beta+x)^{\alpha+1}},
\qquad x\ge0
}.
$$

これはLomax分布、すなわちPareto II型の密度である。

#### 5. 累積分布関数と期待値

累積分布関数は

$$
\begin{aligned}
F_X(x)
&=\int_0^x
\frac{\alpha\beta^\alpha}{(\beta+t)^{\alpha+1}}\,dt\\
&=1-\left(\frac{\beta}{\beta+x}\right)^\alpha,
\qquad x\ge0.
\end{aligned}
$$

したがって上側確率は

$$
\boxed{
1-F_X(x)
=
\left(\frac{\beta}{\beta+x}\right)^\alpha
}.
$$

前問のtail integral identityを使う。

$$
\begin{aligned}
E[X]
&=\int_0^\infty
\left(\frac{\beta}{\beta+x}\right)^\alpha dx\\
&=\beta^\alpha
\int_0^\infty
(\beta+x)^{-\alpha}dx.
\end{aligned}
$$

この積分が収束するためには

$$
\alpha>1
$$

が必要十分である。

$\alpha>1$ のとき

$$
\begin{aligned}
E[X]
&=\beta^\alpha
\left[
\frac{(\beta+x)^{1-\alpha}}{1-\alpha}
\right]_0^\infty\\
&=\frac{\beta}{\alpha-1}.
\end{aligned}
$$

したがって

$$
\boxed{
E[X]<\infty
\iff
\alpha>1
}
$$

かつ

$$
\boxed{
E[X]=\frac{\beta}{\alpha-1}
\qquad(\alpha>1)
}.
$$

#### 6. なぜ重い尾になるのか

指数分布なら固定された $\lambda>0$ に対し

$$
P(X>x)=e^{-\lambda x}
$$

であり、尾は指数関数的に減衰する。

一方、Gamma混合後は

$$
P(X>x)
=
\left(\frac{\beta}{\beta+x}\right)^\alpha.
$$

$x\to\infty$ で

$$
\left(\frac{\beta}{\beta+x}\right)^\alpha
\sim
\beta^\alpha x^{-\alpha}.
$$

したがって尾は多項式的に減衰する。

$$
\boxed{
P(X>x)\asymp x^{-\alpha}
}
$$

であり、指数分布よりはるかに重い尾を持つ。

直感的には、混合分布の中に非常に小さい $\lambda$、すなわち「極端に長寿命な指数分布」が少量ずつ含まれることで、全体として重い尾が生まれる。

### 本番答案

経験分布は観測値以下の割合で定義する。非負変数では

$$
E[X]
=\int_0^\infty\{1-F_X(x)\}\,dx
$$

が成り立つ。指数分布をGamma(shape-rate)で率混合すると

$$
f_X(x)
=\int_0^\infty
\lambda e^{-\lambda x}
\frac{\beta^\alpha}{\Gamma(\alpha)}
\lambda^{\alpha-1}e^{-\beta\lambda}d\lambda
=
\frac{\alpha\beta^\alpha}{(\beta+x)^{\alpha+1}}.
$$

したがって

$$
1-F_X(x)
=
\left(\frac{\beta}{\beta+x}\right)^\alpha,
$$

$$
E[X]<\infty
\iff\alpha>1,
\qquad
E[X]=\frac{\beta}{\alpha-1}.
$$

### 持ち帰るパターン

- 経験分布の上側面積は標本平均になる。
- 非負変数では上側確率を積分して期待値を出せる。
- 指数分布のrateをGamma混合すると、指数尾が多項式尾へ変わる。
- 「混合すると裾が重くなる」という現象の具体例として重要である。

---

## 16〜19位の横断まとめ

### 依存構造

$$
Y=1-X
$$

のような決定論的関係があれば、周辺分布だけを見ても同時分布は分からない。

### 確率母関数による尾確率評価

$$
P(X\le r)
\le
t^{-r}G_X(t)
$$

と置き、$t$ を最適化すると指数型の確率評価が得られる。

### 二段階の極限

$$
\operatorname{Bin}\left(n,\frac{\lambda}{n}\right)
\to
\operatorname{Poisson}(\lambda)
$$

と

$$
\frac{\operatorname{Poisson}(\lambda)-\lambda}{\sqrt{\lambda}}
\to
N(0,1)
$$

は別の極限である。前者は希少事象、後者は大きな平均数の正規近似。

### 経験分布と混合分布

$$
E[X]
=\int_0^\infty P(X>x)\,dx
$$

というtail integralは経験分布にも連続分布にも共通して使える。さらに指数--Gamma混合では

$$
P(X>x)
\sim Cx^{-\alpha}
$$

となり、混合によって重尾が生まれる。

## 参照方針

実際の受験演習では、問題文の確認は統計検定公式問題集を優先する。本ファイルは公開されたテーマ・解説をもとに技法を反復するための独自演習であり、公式過去問の代替ではない。
