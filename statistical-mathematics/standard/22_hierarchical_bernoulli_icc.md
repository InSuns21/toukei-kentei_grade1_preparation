# Standard 10 階層Bernoulli・全分散・級内相関

- 旧No.: 22
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$a,b>0$ とし、潜在成功確率 $P$ は Beta 分布

$$
f_P(p)=
\frac{1}{B(a,b)}p^{a-1}(1-p)^{b-1},
\qquad 0<p<1
$$

に従うとする。ただし

$$
B(a,b)=\int_0^1p^{a-1}(1-p)^{b-1}\,dp
$$

である。$P$ を与えた下で $X_1,\ldots,X_m$ は条件付き独立で

$$
P(X_i=1\mid P=p)=p,
\qquad
P(X_i=0\mid P=p)=1-p
$$

とする。

1. $E[X_i]$, $\operatorname{Var}(X_i)$ を求めよ。
2. $i\ne j$ に対し $\operatorname{Cov}(X_i,X_j)$ を求めよ。
3. 級内相関係数を求めよ。

## 詳細解答

まず Beta 分布の必要なモーメントを定義から確認する。

Beta 関数には

$$
B(a+1,b)=\frac{a}{a+b}B(a,b)
$$

という関係がある。従って

$$
\begin{aligned}
E[P]
&=\frac1{B(a,b)}\int_0^1p^a(1-p)^{b-1}\,dp\\
&=\frac{B(a+1,b)}{B(a,b)}\\
&=\boxed{\frac{a}{a+b}}.
\end{aligned}
$$

同様に

$$
B(a+2,b)
=\frac{a(a+1)}{(a+b)(a+b+1)}B(a,b)
$$

だから

$$
E[P^2]
=\frac{B(a+2,b)}{B(a,b)}
=\frac{a(a+1)}{(a+b)(a+b+1)}.
$$

よって

$$
\begin{aligned}
\operatorname{Var}(P)
&=E[P^2]-E[P]^2\\
&=\boxed{
\frac{ab}{(a+b)^2(a+b+1)}
}.
\end{aligned}
$$

これを使って階層モデルを周辺化する。

### 1. 周辺平均と周辺分散

$P=p$ を与えると

$$
X_i\mid P=p\sim\operatorname{Bernoulli}(p),
$$

従って

$$
E[X_i\mid P]=P,
\qquad
\operatorname{Var}(X_i\mid P)=P(1-P).
$$

全期待値の公式より

$$
\begin{aligned}
E[X_i]
&=E\{E[X_i\mid P]\}\\
&=E[P]\\
&=\boxed{\frac{a}{a+b}}.
\end{aligned}
$$

次に全分散の公式

$$
\operatorname{Var}(X_i)
=E\{\operatorname{Var}(X_i\mid P)\}
+\operatorname{Var}\{E[X_i\mid P]\}
$$

を使うと

$$
\operatorname{Var}(X_i)
=E[P(1-P)]+\operatorname{Var}(P).
$$

ここで

$$
E[P(1-P)]=E[P]-E[P^2]
$$

および

$$
\operatorname{Var}(P)=E[P^2]-E[P]^2
$$

だから $E[P^2]$ が消えて

$$
\begin{aligned}
\operatorname{Var}(X_i)
&=E[P]-E[P]^2\\
&=\frac{a}{a+b}\left(1-\frac{a}{a+b}\right)\\
&=\boxed{\frac{ab}{(a+b)^2}}.
\end{aligned}
$$

これは周辺分布だけ見れば

$$
P(X_i=1)=E[P]=\frac{a}{a+b}
$$

なので、$X_i$ 自体が成功確率 $a/(a+b)$ のベルヌーイ分布になることとも一致する。

### 2. 異なる個体間の共分散

$i\ne j$ とする。$P$ を固定した条件付きでは $X_i,X_j$ は独立なので

$$
\begin{aligned}
E[X_iX_j\mid P]
&=E[X_i\mid P]E[X_j\mid P]\\
&=P^2.
\end{aligned}
$$

全期待値を取ると

$$
E[X_iX_j]=E[P^2].
$$

従って

$$
\begin{aligned}
\operatorname{Cov}(X_i,X_j)
&=E[X_iX_j]-E[X_i]E[X_j]\\
&=E[P^2]-E[P]^2\\
&=\operatorname{Var}(P)\\
&=\boxed{
\frac{ab}{(a+b)^2(a+b+1)}
}.
\end{aligned}
$$

同じ式は全共分散の公式

$$
\operatorname{Cov}(X_i,X_j)
=E\{\operatorname{Cov}(X_i,X_j\mid P)\}
+\operatorname{Cov}\{E[X_i\mid P],E[X_j\mid P]\}
$$

からも分かる。第1項は条件付き独立性により0、第2項は

$$
\operatorname{Cov}(P,P)=\operatorname{Var}(P)
$$

である。

重要なのは、**条件付き独立と周辺独立は別物**だという点である。$P$ を固定すれば独立でも、$P$ を観測せず周辺化すると、全ての $X_i$ が同じランダムな成功確率 $P$ を共有しているため正の依存が生じる。

### 3. 級内相関係数

$i\ne j$ に対する級内相関係数を

$$
\rho_{\mathrm{ICC}}
=\operatorname{Corr}(X_i,X_j)
$$

とする。全ての $X_i$ は同じ分散を持つので

$$
\rho_{\mathrm{ICC}}
=\frac{\operatorname{Cov}(X_i,X_j)}
{\operatorname{Var}(X_i)}.
$$

第1,2問の結果を代入すると

$$
\begin{aligned}
\rho_{\mathrm{ICC}}
&=\frac{ab/\{(a+b)^2(a+b+1)\}}
{ab/(a+b)^2}\\
&=\boxed{\frac1{a+b+1}}.
\end{aligned}
$$

$a+b$ は Beta 分布の集中度を表す。平均 $a/(a+b)$ を固定したまま $a+b$ を大きくすると $P$ のばらつきが小さくなり、個体間で共有するランダム効果が弱くなる。そのため級内相関も0へ近づく。

## 本番答案

Beta 分布のモーメントは

$$
E[P]=\frac a{a+b},
\qquad
\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

$X_i\mid P\sim\operatorname{Bernoulli}(P)$ だから全期待値より

$$
E[X_i]=E[P]=\frac a{a+b}.
$$

全分散より

$$
\operatorname{Var}(X_i)
=E[P(1-P)]+\operatorname{Var}(P)
=E[P]-E[P]^2
=\frac{ab}{(a+b)^2}.
$$

$i\ne j$ では条件付き独立性から

$$
E[X_iX_j\mid P]=P^2,
$$

従って

$$
\operatorname{Cov}(X_i,X_j)
=\operatorname{Var}(P)
=\frac{ab}{(a+b)^2(a+b+1)}.
$$

よって

$$
\boxed{\rho_{\mathrm{ICC}}=\frac1{a+b+1}}.
$$

## 採点基準

- Beta モーメントの確認: 4点
- 全期待値・全分散による周辺モーメント: 6点
- 条件付き独立性から共分散を導出: 6点
- 級内相関係数・集中度の解釈: 4点
