# シラバス穴埋め型 予想問題 5題

このファイルは、統計検定1級「統計数理」のシラバスと、既存の過去問型再構成演習・30分ドリルを照合し、過去問19題だけでは演習密度が薄い重要論点を補うための独自予想問題集である。

- 公式問題の再現ではなく、シラバス上の重要項目を組み合わせた独自問題である。
- 多変量正規分布、Weibull分布、Poisson極限は既存30分ドリルで既に厚く扱っているため、本ファイルでは重複を避けた。
- Level Cを中心とし、20〜30分で論述答案まで完成する構造を採用する。
- 数式は KaTeX 互換の `$...$`、`$$...$$`、`$$\begin{aligned}...\end{aligned}$$` を用いる。

## 追加優先度

| 優先 | 予想テーマ | シラバス上の穴 | 主な接続 |
|---:|---|---|---|
| 1 | 多項分布と条件付き二項分布 | 多項分布が過去問19題で薄い | 共分散、条件付き分布、中心極限定理 |
| 2 | 特性関数による中心極限定理 | 特性関数が過去問19題で未演習 | Taylor展開、独立和、極限分布 |
| 3 | 指数分布の順序統計量とspacing | 指数分布はMGF中心で順序構造が薄い | 無記憶性、最小値、Poisson過程 |
| 4 | Beta--Binomial混合 | Poisson--Gamma以外の混合・Bayes接続が薄い | 全期待値、全分散、事後分布、予測分布 |
| 5 | 対数正規分布と標本幾何平均 | 対数正規分布とDelta法の横断問題が薄い | 変数変換、正規標本、連続写像、Delta法 |

---

# 予想問題1 多項分布・条件付き分布・共分散・正規近似

- 安定ID: `PRED-SYL-01-MULTINOMIAL`
- Level: C
- 目安時間: 25分
- 主題: 多項分布、周辺分布、条件付き分布、共分散、中心極限定理
- 計算量: 中

## 問題

各試行で結果がカテゴリー1, 2, 3のいずれかとなり、それぞれの確率を

$$
p_1,p_2,p_3>0,
\qquad
p_1+p_2+p_3=1
$$

とする。独立に $n$ 回試行し、各カテゴリーの出現回数を $X_1,X_2,X_3$ とする。

1. $(X_1,X_2,X_3)$ の同時確率質量関数を書け。
2. $X_1$ の周辺分布を求めよ。
3. $E[X_i]$、$\operatorname{Var}(X_i)$、$\operatorname{Cov}(X_i,X_j)$ $(i\ne j)$ を求めよ。
4. $M=X_1+X_2$ とする。$M=m$ の下での $X_1$ の条件付き分布を求めよ。
5. $A=X_1-X_2$ とする。$E[A]$ と $\operatorname{Var}(A)$ を求めよ。
6. $n=400$、$(p_1,p_2,p_3)=(0.40,0.35,0.25)$ とする。中心極限定理と連続修正を用いて $P(X_1>X_2)$ を近似せよ。

## 詳細解答

### 1. 同時確率質量関数

非負整数 $x_1,x_2,x_3$ が

$$
x_1+x_2+x_3=n
$$

を満たすとき

$$
\boxed{
P(X_1=x_1,X_2=x_2,X_3=x_3)
=
\frac{n!}{x_1!x_2!x_3!}
 p_1^{x_1}p_2^{x_2}p_3^{x_3}
}
$$

である。これは多項分布

$$
(X_1,X_2,X_3)\sim\operatorname{Multinomial}(n;p_1,p_2,p_3)
$$

の確率質量関数である。

### 2. 周辺分布

カテゴリー1に入ったかどうかだけを見れば、各試行は成功確率 $p_1$ のBernoulli試行になる。したがって

$$
\boxed{X_1\sim\operatorname{Bin}(n,p_1)}.
$$

同様に

$$
X_i\sim\operatorname{Bin}(n,p_i).
$$

### 3. 平均・分散・共分散

第 $r$ 試行がカテゴリー $i$ に入った指示変数を

$$
I_{ri}=\boldsymbol{1}\{\text{第 }r\text{ 試行がカテゴリー }i\}
$$

とすると

$$
X_i=\sum_{r=1}^n I_{ri}.
$$

よって

$$
E[X_i]=np_i,
$$

$$
\operatorname{Var}(X_i)=np_i(1-p_i).
$$

$i\ne j$ では同じ試行でカテゴリー $i$ と $j$ に同時に入れないので

$$
I_{ri}I_{rj}=0.
$$

したがって

$$
\begin{aligned}
\operatorname{Cov}(I_{ri},I_{rj})
&=E[I_{ri}I_{rj}]-E[I_{ri}]E[I_{rj}]\\
&=0-p_ip_j\\
&=-p_ip_j.
\end{aligned}
$$

異なる試行間は独立だから

$$
\boxed{
\operatorname{Cov}(X_i,X_j)=-np_ip_j,
\qquad i\ne j
}.
$$

カテゴリー総数が固定されているため、一方が増えれば他方が減りやすく、負の共分散が生じる。

### 4. $M=X_1+X_2$ で条件付ける

$M=m$ とは「$n$ 回のうち $m$ 回がカテゴリー1または2に入った」ことを意味する。その $m$ 回の中でカテゴリー1である条件付き確率は

$$
\frac{p_1}{p_1+p_2}.
$$

したがって

$$
\boxed{
X_1\mid(M=m)
\sim
\operatorname{Bin}\left(m,\frac{p_1}{p_1+p_2}\right)
}.
$$

直接確率質量関数の比を取っても同じ結果になる。

### 5. 差 $A=X_1-X_2$

期待値は

$$
\begin{aligned}
E[A]
&=E[X_1]-E[X_2]\\
&=n(p_1-p_2).
\end{aligned}
$$

したがって

$$
\boxed{E[A]=n(p_1-p_2)}.
$$

分散は

$$
\begin{aligned}
\operatorname{Var}(A)
&=\operatorname{Var}(X_1)+\operatorname{Var}(X_2)
 -2\operatorname{Cov}(X_1,X_2)\\
&=np_1(1-p_1)+np_2(1-p_2)+2np_1p_2\\
&=n\{p_1+p_2-(p_1-p_2)^2\}.
\end{aligned}
$$

よって

$$
\boxed{
\operatorname{Var}(A)
=n\{p_1+p_2-(p_1-p_2)^2\}
}.
$$

### 6. 正規近似

数値を代入すると

$$
E[A]=400(0.40-0.35)=20.
$$

また

$$
\begin{aligned}
\operatorname{Var}(A)
&=400\{0.40+0.35-(0.05)^2\}\\
&=400(0.7475)\\
&=299.
\end{aligned}
$$

したがって

$$
A\approx N(20,299).
$$

$X_1>X_2$ は整数値では $A\ge1$ なので、連続修正を用いて

$$
P(A\ge1)
\approx
P\left(N(20,299)>0.5\right).
$$

標準化すると

$$
\frac{0.5-20}{\sqrt{299}}
\approx -1.13.
$$

よって

$$
\boxed{
P(X_1>X_2)
\approx
\Phi(1.13)
\approx0.87
}.
$$

## 本番答案

多項分布の周辺は二項分布で、

$$
E[X_i]=np_i,
\quad
\operatorname{Var}(X_i)=np_i(1-p_i),
\quad
\operatorname{Cov}(X_i,X_j)=-np_ip_j.
$$

また

$$
X_1\mid(X_1+X_2=m)
\sim
\operatorname{Bin}\left(m,\frac{p_1}{p_1+p_2}\right).
$$

差 $A=X_1-X_2$ の平均・分散は

$$
E[A]=n(p_1-p_2),
$$

$$
\operatorname{Var}(A)
=n\{p_1+p_2-(p_1-p_2)^2\}.
$$

数値例では $A\approx N(20,299)$ なので、連続修正より $P(A\ge1)\approx\Phi(1.13)\approx0.87$。

## 持ち帰るパターン

$$
\operatorname{Multinomial}
\to
\text{周辺 Binomial}
\to
\text{和で条件付けると再び Binomial}
$$

という流れを白紙から再現する。

---

# 予想問題2 特性関数から中心極限定理を再現する

- 安定ID: `PRED-SYL-02-CF-CLT`
- Level: C
- 目安時間: 25分
- 主題: 特性関数、独立確率変数の和、Taylor展開、中心極限定理
- 計算量: 中

## 問題

$X_1,X_2,\ldots$ を独立同分布とし

$$
X_i\sim U(-\sqrt3,\sqrt3)
$$

とする。

1. $E[X_i]$ と $\operatorname{Var}(X_i)$ を求めよ。
2. 特性関数

$$
\varphi_X(t)=E[e^{itX}]
$$

を求めよ。
3. 

$$
S_n=\frac{X_1+\cdots+X_n}{\sqrt n}
$$

の特性関数を求めよ。
4. $u\to0$ で

$$
\frac{\sin u}{u}=1-\frac{u^2}{6}+O(u^4)
$$

を用いて、各固定 $t$ に対し

$$
\varphi_{S_n}(t)\to e^{-t^2/2}
$$

を示せ。
5. 特性関数の連続性定理を用いて $S_n$ の極限分布を求めよ。

## 詳細解答

### 1. 平均と分散

一様分布 $U(a,b)$ について

$$
E[X]=\frac{a+b}{2},
\qquad
\operatorname{Var}(X)=\frac{(b-a)^2}{12}.
$$

ここでは対称なので

$$
E[X_i]=0.
$$

また

$$
\operatorname{Var}(X_i)
=
\frac{(2\sqrt3)^2}{12}
=1.
$$

したがって

$$
\boxed{E[X_i]=0,\qquad \operatorname{Var}(X_i)=1}.
$$

### 2. 特性関数

密度は

$$
f_X(x)=\frac1{2\sqrt3},
\qquad -\sqrt3<x<\sqrt3.
$$

よって $t\ne0$ では

$$
\begin{aligned}
\varphi_X(t)
&=\frac1{2\sqrt3}\int_{-\sqrt3}^{\sqrt3}e^{itx}\,dx\\
&=\frac1{2\sqrt3}
\left[\frac{e^{itx}}{it}\right]_{-\sqrt3}^{\sqrt3}\\
&=\frac{e^{i\sqrt3t}-e^{-i\sqrt3t}}{2\sqrt3\,it}\\
&=\frac{\sin(\sqrt3t)}{\sqrt3t}.
\end{aligned}
$$

$t=0$ では特性関数の定義から1なので

$$
\boxed{
\varphi_X(t)=
\begin{cases}
\dfrac{\sin(\sqrt3t)}{\sqrt3t},&t\ne0,\\
1,&t=0.
\end{cases}
}.
$$

### 3. 標準化和の特性関数

独立性から和の特性関数は積になる。

$$
\begin{aligned}
\varphi_{S_n}(t)
&=E\left[
\exp\left\{it\frac{X_1+\cdots+X_n}{\sqrt n}\right\}
\right]\\
&=\prod_{j=1}^n
\varphi_X\left(\frac{t}{\sqrt n}\right)\\
&=
\left[
\frac{\sin(\sqrt3t/\sqrt n)}{\sqrt3t/\sqrt n}
\right]^n.
\end{aligned}
$$

したがって

$$
\boxed{
\varphi_{S_n}(t)
=
\left[
\frac{\sin(\sqrt3t/\sqrt n)}{\sqrt3t/\sqrt n}
\right]^n
}.
$$

### 4. 極限

$$
u_n=\frac{\sqrt3t}{\sqrt n}
$$

とおくと $u_n\to0$。Taylor展開より

$$
\frac{\sin u_n}{u_n}
=1-\frac{u_n^2}{6}+O(u_n^4).
$$

ここで

$$
u_n^2=\frac{3t^2}{n},
\qquad
u_n^4=O(n^{-2})
$$

だから

$$
\frac{\sin u_n}{u_n}
=1-\frac{t^2}{2n}+O(n^{-2}).
$$

したがって

$$
\varphi_{S_n}(t)
=
\left[
1-\frac{t^2}{2n}+O(n^{-2})
\right]^n.
$$

対数を取ると

$$
\begin{aligned}
\log\varphi_{S_n}(t)
&=n\log\left[
1-\frac{t^2}{2n}+O(n^{-2})
\right]\\
&=-\frac{t^2}{2}+O(n^{-1}).
\end{aligned}
$$

よって

$$
\boxed{
\varphi_{S_n}(t)\to e^{-t^2/2}
}.
$$

### 5. 極限分布

$$
e^{-t^2/2}
$$

は標準正規分布 $N(0,1)$ の特性関数である。したがって特性関数の連続性定理から

$$
\boxed{S_n\xrightarrow{d}N(0,1)}.
$$

これは平均0、分散1の独立同分布標本に対する中心極限定理を、この一様分布の場合に特性関数から直接再現したことになる。

## 本番答案

$X_i\sim U(-\sqrt3,\sqrt3)$ より平均0、分散1。特性関数は

$$
\varphi_X(t)=\frac{\sin(\sqrt3t)}{\sqrt3t}.
$$

独立性より

$$
\varphi_{S_n}(t)
=
\left[
\frac{\sin(\sqrt3t/\sqrt n)}{\sqrt3t/\sqrt n}
\right]^n.
$$

$\sin u/u=1-u^2/6+O(u^4)$ を代入すると

$$
\varphi_{S_n}(t)
=
\left[1-\frac{t^2}{2n}+O(n^{-2})\right]^n
\to e^{-t^2/2}.
$$

よって $S_n\xrightarrow{d}N(0,1)$。

## 持ち帰るパターン

$$
\text{独立和}
\to
\text{特性関数の積}
\to
\text{0近傍のTaylor展開}
\to
\text{正規特性関数}
$$

で中心極限定理型の極限を処理する。

---

# 予想問題3 指数分布の最小値・到着順位・spacing

- 安定ID: `PRED-SYL-03-EXP-ORDER`
- Level: C
- 目安時間: 25分
- 主題: 指数分布、無記憶性、順序統計量、spacing、Poisson過程
- 計算量: 中

## 問題

$X_1,\ldots,X_n$ を独立に

$$
\operatorname{Exp}(\lambda),
\qquad
f(x)=\lambda e^{-\lambda x},\quad x>0
$$

に従う確率変数とする。順序統計量を

$$
X_{(1)}<X_{(2)}<\cdots<X_{(n)}
$$

とする。

1. 最小値 $X_{(1)}$ の分布を求めよ。
2. 最初に最小値を取る添字を

$$
J=\operatorname*{arg\,min}_{1\le j\le n}X_j
$$

とする。$P(J=j)$ を求め、$J$ と $X_{(1)}$ が独立であることを示せ。
3. 指数分布の無記憶性を用いて、最初の発生後に残った $n-1$ 個の残余時間の分布を説明せよ。
4. spacingを

$$
D_1=X_{(1)},
\qquad
D_k=X_{(k)}-X_{(k-1)},\quad k=2,\ldots,n
$$

とする。$D_1,\ldots,D_n$ の分布と独立性を述べよ。
5. $E[X_{(n)}]$ と $\operatorname{Var}(X_{(n)})$ を求めよ。
6. $n=3$ のとき $E[X_{(3)}]$ と $\operatorname{Var}(X_{(3)})$ を求めよ。

## 詳細解答

### 1. 最小値

$t\ge0$ に対し

$$
\begin{aligned}
P(X_{(1)}>t)
&=P(X_1>t,\ldots,X_n>t)\\
&=\prod_{j=1}^nP(X_j>t)\\
&=(e^{-\lambda t})^n\\
&=e^{-n\lambda t}.
\end{aligned}
$$

したがって

$$
\boxed{X_{(1)}\sim\operatorname{Exp}(n\lambda)}.
$$

「独立な指数時計を $n$ 個同時に動かすと、最初に鳴る時計の率は率の和になる」と読める。

### 2. 最初に鳴る時計

対称性から

$$
\boxed{P(J=j)=\frac1n}.
$$

独立性も密度から確認できる。$J=j$ かつ最小値が $t$ 付近にある確率密度は

$$
\lambda e^{-\lambda t}
(e^{-\lambda t})^{n-1}
=
\lambda e^{-n\lambda t}.
$$

一方、$X_{(1)}$ の密度は

$$
f_{X_{(1)}}(t)=n\lambda e^{-n\lambda t}.
$$

したがって

$$
P(J=j)f_{X_{(1)}}(t)
=
\frac1n n\lambda e^{-n\lambda t}
=
\lambda e^{-n\lambda t}.
$$

よって同時密度が積に因数分解され

$$
\boxed{J\perp X_{(1)}}.
$$

### 3. 無記憶性

指数分布は

$$
P(X>s+t\mid X>s)=P(X>t)
$$

を満たす。

したがって最初の発生時刻を $T=X_{(1)}$ とすると、$T$ まで発生しなかった残り $n-1$ 個について

$$
X_j-T\mid(X_j>T)
\sim\operatorname{Exp}(\lambda).
$$

しかも元の独立性と指数分布の無記憶性により、残余時間は再び独立な指数分布として扱える。

### 4. spacing

最初のspacingは

$$
D_1=X_{(1)}\sim\operatorname{Exp}(n\lambda).
$$

最初の発生後は $n-1$ 個の指数時計が残るので

$$
D_2\sim\operatorname{Exp}((n-1)\lambda).
$$

同様に繰り返して

$$
\boxed{
D_k\sim\operatorname{Exp}((n-k+1)\lambda),
\qquad k=1,\ldots,n
}.
$$

また無記憶性により

$$
\boxed{D_1,\ldots,D_n\text{ は独立}}.
$$

### 5. 最大値の平均と分散

$$
X_{(n)}=D_1+\cdots+D_n.
$$

指数分布 $\operatorname{Exp}(r)$ の平均・分散は

$$
E[D]=\frac1r,
\qquad
\operatorname{Var}(D)=\frac1{r^2}.
$$

したがって

$$
\begin{aligned}
E[X_{(n)}]
&=\sum_{k=1}^n\frac1{(n-k+1)\lambda}\\
&=\frac1\lambda\sum_{j=1}^n\frac1j.
\end{aligned}
$$

よって

$$
\boxed{
E[X_{(n)}]
=\frac{H_n}{\lambda},
\qquad
H_n=\sum_{j=1}^n\frac1j
}.
$$

独立性から分散も和になり

$$
\boxed{
\operatorname{Var}(X_{(n)})
=\frac1{\lambda^2}\sum_{j=1}^n\frac1{j^2}
}.
$$

### 6. $n=3$

$$
E[X_{(3)}]
=\frac1\lambda\left(1+\frac12+\frac13\right)
=\boxed{\frac{11}{6\lambda}}.
$$

また

$$
\operatorname{Var}(X_{(3)})
=\frac1{\lambda^2}\left(1+\frac14+\frac19\right)
=\frac{36+9+4}{36\lambda^2}.
$$

したがって

$$
\boxed{
\operatorname{Var}(X_{(3)})
=\frac{49}{36\lambda^2}
}.
$$

## 本番答案

独立性から

$$
P(X_{(1)}>t)=e^{-n\lambda t}
$$

なので $X_{(1)}\sim\operatorname{Exp}(n\lambda)$。対称性と同時密度の因数分解により $J$ は一様で $X_{(1)}$ と独立。指数分布の無記憶性を発生ごとに使えば

$$
D_k\sim\operatorname{Exp}((n-k+1)\lambda)
$$

が独立に成り立つ。よって

$$
E[X_{(n)}]=\frac1\lambda\sum_{j=1}^n\frac1j,
$$

$$
\operatorname{Var}(X_{(n)})
=\frac1{\lambda^2}\sum_{j=1}^n\frac1{j^2}.
$$

## 持ち帰るパターン

$$
\text{指数分布の最小値}
\to
\text{率の和}
\to
\text{無記憶性}
\to
\text{独立spacing}
$$

は、順序統計量とPoisson過程を結ぶ重要パターンである。

---

# 予想問題4 Beta--Binomial混合とBayes更新

- 安定ID: `PRED-SYL-04-BETA-BINOMIAL`
- Level: C
- 目安時間: 25分
- 主題: 混合分布、Beta分布、二項分布、全期待値、全分散、Bayes更新
- 計算量: 中

## 問題

未知の成功確率 $\Theta$ が

$$
\Theta\sim\operatorname{Beta}(a,b),
\qquad a,b>0
$$

に従うとする。すなわち

$$
f_\Theta(\theta)
=
\frac{1}{B(a,b)}
\theta^{a-1}(1-\theta)^{b-1},
\qquad 0<\theta<1.
$$

$\Theta=\theta$ の下で

$$
X\mid\Theta=\theta
\sim\operatorname{Bin}(n,\theta)
$$

とする。

1. $X$ の周辺確率質量関数を求めよ。
2. $E[X]$ を全期待値の公式から求めよ。
3. $\operatorname{Var}(X)$ を全分散の公式から求めよ。
4. $X=x$ を観測した後の $\Theta$ の事後分布を求めよ。
5. 次の1回のBernoulli試行を $Y$ とする。$P(Y=1\mid X=x)$ を求めよ。
6. $a=2,b=3,n=10,x=7$ のとき、事後分布と次回成功確率を求めよ。

## 詳細解答

### 1. 周辺分布

条件付き確率を $\theta$ について積分する。

$$
\begin{aligned}
P(X=x)
&=\int_0^1P(X=x\mid\Theta=\theta)f_\Theta(\theta)\,d\theta\\
&=\int_0^1
{n\choose x}\theta^x(1-\theta)^{n-x}
\frac{\theta^{a-1}(1-\theta)^{b-1}}{B(a,b)}
\,d\theta\\
&={n\choose x}\frac1{B(a,b)}
\int_0^1
\theta^{a+x-1}(1-\theta)^{b+n-x-1}
\,d\theta.
\end{aligned}
$$

Beta関数の定義より

$$
\int_0^1
\theta^{a+x-1}(1-\theta)^{b+n-x-1}\,d\theta
=B(a+x,b+n-x).
$$

したがって

$$
\boxed{
P(X=x)
={n\choose x}
\frac{B(a+x,b+n-x)}{B(a,b)},
\qquad x=0,\ldots,n
}.
$$

これはBeta--Binomial分布である。

### 2. 平均

全期待値の公式から

$$
\begin{aligned}
E[X]
&=E[E[X\mid\Theta]]\\
&=E[n\Theta]\\
&=nE[\Theta].
\end{aligned}
$$

Beta分布の平均は

$$
E[\Theta]=\frac{a}{a+b}
$$

なので

$$
\boxed{
E[X]=\frac{na}{a+b}
}.
$$

### 3. 分散

全分散の公式

$$
\operatorname{Var}(X)
=E[\operatorname{Var}(X\mid\Theta)]
+\operatorname{Var}(E[X\mid\Theta])
$$

を用いる。

条件付き分散は

$$
\operatorname{Var}(X\mid\Theta)
=n\Theta(1-\Theta).
$$

Beta分布について

$$
E[\Theta(1-\Theta)]
=\frac{ab}{(a+b)(a+b+1)}.
$$

したがって

$$
E[\operatorname{Var}(X\mid\Theta)]
=
\frac{nab}{(a+b)(a+b+1)}.
$$

また

$$
\operatorname{Var}(\Theta)
=rac{ab}{(a+b)^2(a+b+1)}
$$

なので

$$
\operatorname{Var}(E[X\mid\Theta])
=n^2\operatorname{Var}(\Theta)
=
\frac{n^2ab}{(a+b)^2(a+b+1)}.
$$

よって

$$
\boxed{
\operatorname{Var}(X)
=
\frac{nab(a+b+n)}{(a+b)^2(a+b+1)}
}.
$$

$\Theta$ を固定した二項分布に比べ、個体ごとに成功確率が揺れることで追加分散が生じる。

### 4. 事後分布

Bayesの公式で $\theta$ に依存する部分だけを見ると

$$
\begin{aligned}
f(\theta\mid X=x)
&\propto
\theta^x(1-\theta)^{n-x}
\theta^{a-1}(1-\theta)^{b-1}\\
&=
\theta^{a+x-1}(1-\theta)^{b+n-x-1}.
\end{aligned}
$$

したがって

$$
\boxed{
\Theta\mid X=x
\sim\operatorname{Beta}(a+x,b+n-x)
}.
$$

### 5. 事後予測確率

次の試行 $Y$ は、$\Theta$ が与えられれば成功確率 $\Theta$ のBernoulli分布である。したがって

$$
\begin{aligned}
P(Y=1\mid X=x)
&=E[P(Y=1\mid\Theta,X=x)\mid X=x]\\
&=E[\Theta\mid X=x].
\end{aligned}
$$

事後Beta分布の平均より

$$
\boxed{
P(Y=1\mid X=x)
=\frac{a+x}{a+b+n}
}.
$$

### 6. 数値例

$a=2,b=3,n=10,x=7$ なので

$$
\Theta\mid X=7
\sim\operatorname{Beta}(2+7,3+10-7)
=\operatorname{Beta}(9,6).
$$

したがって次回成功確率は

$$
\boxed{
P(Y=1\mid X=7)
=\frac9{15}
=\frac35
}.
$$

## 本番答案

Beta事前分布と二項尤度を掛けるとBeta核が残るため

$$
P(X=x)
={n\choose x}rac{B(a+x,b+n-x)}{B(a,b)},
$$

$$
\Theta\mid X=x
\sim\operatorname{Beta}(a+x,b+n-x).
$$

全期待値・全分散から

$$
E[X]=\frac{na}{a+b},
$$

$$
\operatorname{Var}(X)
=rac{nab(a+b+n)}{(a+b)^2(a+b+1)}.
$$

次回成功確率は事後平均なので

$$
P(Y=1\mid X=x)=\frac{a+x}{a+b+n}.
$$

## 持ち帰るパターン

$$
\operatorname{Beta}
+
\operatorname{Binomial}
\to
\operatorname{Beta\text{-}Binomial}
$$

と

$$
\operatorname{Beta}(a,b)
\xrightarrow{x\text{ successes in }n}
\operatorname{Beta}(a+x,b+n-x)
$$

を、Poisson--Gamma混合と対になる形で覚える。

---

# 予想問題5 対数正規分布・幾何平均・Delta法

- 安定ID: `PRED-SYL-05-LOGNORMAL-DELTA`
- Level: C
- 目安時間: 30分
- 主題: 対数正規分布、変数変換、正規標本、連続写像、Delta法、区間推定
- 計算量: 中

## 問題

$X\sim N(\mu,\sigma^2)$ とし

$$
Y=e^X
$$

とする。ただし $\sigma>0$ は既知とする。

1. $Y$ の確率密度関数を求めよ。
2. 任意の実数 $r$ に対して $E[Y^r]$ を求め、特に $E[Y]$ と $\operatorname{Var}(Y)$ を求めよ。
3. $Y_1,\ldots,Y_n$ を独立同分布な対数正規標本とし、幾何平均を

$$
G_n=\left(\prod_{i=1}^nY_i\right)^{1/n}
$$

とする。$G_n$ の正確な分布を求めよ。
4. $G_n$ が $e^\mu$ に確率収束することを示せ。
5. Delta法を用いて

$$
\sqrt n(G_n-e^\mu)
$$

の極限分布を求めよ。
6. $\sigma$ 既知のとき、$e^\mu$ の信頼係数 $1-\alpha$ の信頼区間を $G_n$ を用いて構成せよ。

## 詳細解答

### 1. 変数変換

$Y=e^X$ は単調増加であり、逆変換は

$$
X=\log Y.
$$

Jacobianは

$$
\left|\frac{dx}{dy}\right|=\frac1y.
$$

したがって $y>0$ で

$$
\boxed{
f_Y(y)
=
\frac{1}{y\sigma\sqrt{2\pi}}
\exp\left[
-\frac{(\log y-\mu)^2}{2\sigma^2}
\right]
}.
$$

$y\le0$ では密度0である。

### 2. モーメント

$$
Y^r=e^{rX}
$$

なので、正規分布のモーメント母関数を用いて

$$
\begin{aligned}
E[Y^r]
&=E[e^{rX}]\\
&=\exp\left(r\mu+\frac{r^2\sigma^2}{2}\right).
\end{aligned}
$$

したがって

$$
\boxed{
E[Y^r]
=
\exp\left(r\mu+\frac{r^2\sigma^2}{2}\right)
}.
$$

$r=1$ で

$$
\boxed{E[Y]=e^{\mu+\sigma^2/2}}.
$$

$r=2$ で

$$
E[Y^2]=e^{2\mu+2\sigma^2}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(Y)
&=e^{2\mu+2\sigma^2}-e^{2\mu+\sigma^2}\\
&=e^{2\mu+\sigma^2}(e^{\sigma^2}-1).
\end{aligned}
$$

したがって

$$
\boxed{
\operatorname{Var}(Y)
=e^{2\mu+\sigma^2}(e^{\sigma^2}-1)
}.
$$

### 3. 幾何平均の正確な分布

$$
\log G_n
=rac1n\sum_{i=1}^n\log Y_i.
$$

ここで

$$
\log Y_i=X_i\sim N(\mu,\sigma^2).
$$

したがって

$$
\log G_n
\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

よって

$$
\boxed{
G_n\sim\operatorname{Lognormal}\left(\mu,\frac{\sigma^2}{n}\right)
}.
$$

特に中央値は $e^\mu$ であり、平均は

$$
E[G_n]=e^{\mu+\sigma^2/(2n)}.
$$

したがって有限 $n$ では $G_n$ は $e^\mu$ の不偏推定量ではない。

### 4. 一致性

大数の法則より

$$
\frac1n\sum_{i=1}^n\log Y_i
\xrightarrow{p}\mu.
$$

指数関数は連続なので連続写像定理から

$$
\exp\left(rac1n\sum_{i=1}^n\log Y_i\right)
\xrightarrow{p}e^\mu.
$$

左辺は $G_n$ だから

$$
\boxed{G_n\xrightarrow{p}e^\mu}.
$$

### 5. Delta法

正規標本平均について

$$
\sqrt n(\overline{X}-\mu)
\xrightarrow{d}N(0,\sigma^2).
$$

ここで

$$
G_n=e^{\overline{X}}
$$

であり、$g(x)=e^x$ とすれば

$$
g'(\mu)=e^\mu.
$$

Delta法より

$$
\sqrt n\{g(\overline{X})-g(\mu)\}
\xrightarrow{d}
N\left(0,[g'(\mu)]^2\sigma^2\right).
$$

したがって

$$
\boxed{
\sqrt n(G_n-e^\mu)
\xrightarrow{d}
N(0,\sigma^2e^{2\mu})
}.
$$

### 6. $e^\mu$ の信頼区間

$\sigma$ 既知なので

$$
\frac{\sqrt n(\overline{X}-\mu)}{\sigma}
\sim N(0,1)
$$

が正確に成り立つ。

$z_{1-\alpha/2}$ を標準正規分布の上側 $\alpha/2$ 分位点とすると

$$
P\left(
\overline{X}-z_{1-\alpha/2}\frac\sigma{\sqrt n}
\le\mu\le
\overline{X}+z_{1-\alpha/2}\frac\sigma{\sqrt n}
\right)
=1-\alpha.
$$

指数関数は単調増加なので両辺を指数化して

$$
\boxed{
\left[
G_n\exp\left(-z_{1-\alpha/2}\frac\sigma{\sqrt n}\right),
\quad
G_n\exp\left(z_{1-\alpha/2}\frac\sigma{\sqrt n}\right)
\right]
}
$$

が $e^\mu$ の信頼係数 $1-\alpha$ の正確な信頼区間である。

Delta法だけで近似区間を作るなら

$$
G_n
\pm
z_{1-\alpha/2}\frac{\sigma G_n}{\sqrt n}
$$

となるが、この設定では対数スケールを使った区間の方が正確で、下端も必ず正になる。

## 本番答案

変数変換 $x=\log y$、$|dx/dy|=1/y$ から対数正規密度を得る。モーメントは

$$
E[Y^r]=E[e^{rX}]
=e^{r\mu+r^2\sigma^2/2}.
$$

また

$$
\log G_n=\overline{X}
\sim N\left(\mu,\frac{\sigma^2}{n}\right)
$$

なので $G_n$ は対数正規分布で、$G_n\xrightarrow{p}e^\mu$。Delta法より

$$
\sqrt n(G_n-e^\mu)
\xrightarrow{d}N(0,\sigma^2e^{2\mu}).
$$

$\sigma$ 既知なら対数スケールの正規pivotを指数化して

$$
\left[
G_ne^{-z_{1-\alpha/2}\sigma/\sqrt n},
G_ne^{z_{1-\alpha/2}\sigma/\sqrt n}
\right]
$$

を得る。

## 持ち帰るパターン

$$
\log Y\sim N
\Longleftrightarrow
Y\sim\operatorname{Lognormal}
$$

と

$$
\overline{\log Y}
\to
\text{正規標本平均}
\to
\exp
\to
\text{Delta法}
$$

を一つの流れとして処理する。

---

# 5題の演習順

最短で効果を出すなら、次の順で解く。

1. `PRED-SYL-01-MULTINOMIAL`：離散分布の構造と条件付き分布を固める。
2. `PRED-SYL-03-EXP-ORDER`：指数分布・順序統計量・Poisson過程を接続する。
3. `PRED-SYL-04-BETA-BINOMIAL`：混合分布をPoisson--Gamma以外へ一般化する。
4. `PRED-SYL-02-CF-CLT`：特性関数と極限分布を白紙から再現する。
5. `PRED-SYL-05-LOGNORMAL-DELTA`：分布変換から漸近推測までを横断する。

## 25分時点の共通打ち切り判断

- 多項分布では、条件付き二項分布と共分散まで書ければ後半の正規近似を切ってよい。
- 特性関数では、$\varphi_{S_n}(t)$ と $1-t^2/(2n)+O(n^{-2})$ まで書ければ主要点を確保する。
- 指数spacingでは、$D_k\sim\operatorname{Exp}((n-k+1)\lambda)$ を書ければ最大値のモーメントへ進める。
- Beta--Binomialでは、周辺PMFと事後Beta分布を優先し、全分散の整理は後回しにする。
- 対数正規では、$\log G_n\sim N(\mu,\sigma^2/n)$ を先に確定し、Delta法は最後に回す。
