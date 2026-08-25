# Core 09 多項分布尤度比検定とPearson適合度

- 旧No.: 62
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎・修正済（対数は数値化不要）

## 問題

$(X_1,X_2,X_3)$ の同時確率質量関数を

$$
P(X_1=x_1,X_2=x_2,X_3=x_3)
=\frac{60!}{x_1!x_2!x_3!}
p_1^{x_1}p_2^{x_2}p_3^{x_3},
$$

$$
x_1+x_2+x_3=60,
\qquad
p_1+p_2+p_3=1,
\qquad p_j>0
$$

とする。帰無仮説

$$
H_0:(p_1,p_2,p_3)
=\left(\frac12,\frac13,\frac16\right)
$$

を検定する。観測度数は

$$
(x_1,x_2,x_3)=(27,21,12)
$$

であった。

1. 上の確率質量関数から尤度を作り、制約なし最尤推定量を求めよ。
2. 尤度比の定義から尤度比検定統計量 $G^2$ を求めよ。対数は式のままでよい。
3. Pearson統計量 $X_P^2$ を求めよ。
4. 両統計量の漸近自由度を答えよ。
5. 一般に $G^2-X_P^2=o_p(1)$ となる理由を、対数の Taylor 展開の各次数を確認して説明せよ。

## 詳細解答

### 1. 確率質量関数から制約なし最尤推定量を求める

観測値 $x_1,x_2,x_3$ を固定すると、問題文の同時確率質量関数を $p_1,p_2,p_3$ の関数として見たものが尤度である。

$$
L(p_1,p_2,p_3)
=\frac{60!}{x_1!x_2!x_3!}
\prod_{j=1}^3p_j^{x_j}.
$$

対数を取ると

$$
\begin{aligned}
\ell(p_1,p_2,p_3)
&=\log(60!)-\sum_{j=1}^3\log(x_j!)
+\sum_{j=1}^3x_j\log p_j.
\end{aligned}
$$

ここで

$$
\log(60!)-\sum_{j=1}^3\log(x_j!)
$$

は観測度数だけで決まり、$p_1,p_2,p_3$ を含まない。したがって最大化には影響しないが、完全な対数尤度を書いた後で初めて省いてよい。

制約

$$
p_1+p_2+p_3=1
$$

の下で最大化するため、Lagrange 乗数 $\nu$ を使い

$$
\mathcal L
=\sum_{j=1}^3x_j\log p_j
+\nu\left(1-\sum_{j=1}^3p_j\right)
$$

と置く。各 $p_j$ で偏微分すると

$$
\frac{\partial\mathcal L}{\partial p_j}
=\frac{x_j}{p_j}-\nu.
$$

1次条件より

$$
\frac{x_j}{p_j}-\nu=0
\quad\Longrightarrow\quad
p_j=\frac{x_j}{\nu}.
$$

制約へ代入すると

$$
1=\sum_{j=1}^3p_j
=\frac{x_1+x_2+x_3}{\nu}
=\frac{60}{\nu},
$$

したがって

$$
\nu=60.
$$

よって

$$
\boxed{\widehat p_j=\frac{x_j}{60}}.
$$

本データでは

$$
(\widehat p_1,\widehat p_2,\widehat p_3)
=\left(\frac{27}{60},\frac{21}{60},\frac{12}{60}\right).
$$

### 2. 尤度比の定義から $G^2$ を導く

帰無仮説の確率を

$$
p_{10}=\frac12,
\qquad
p_{20}=\frac13,
\qquad
p_{30}=\frac16
$$

とする。尤度比は

$$
\Lambda
=\frac{L(p_{10},p_{20},p_{30})}
{L(\widehat p_1,\widehat p_2,\widehat p_3)}.
$$

分子・分母の両方に多項係数

$$
\frac{60!}{x_1!x_2!x_3!}
$$

が含まれるため、この係数は比を取ると約分される。したがって

$$
\begin{aligned}
\Lambda
&=\prod_{j=1}^3
\left(\frac{p_{j0}}{\widehat p_j}\right)^{x_j}.
\end{aligned}
$$

尤度比検定統計量は

$$
G^2=-2\log\Lambda.
$$

よって

$$
\begin{aligned}
G^2
&=-2\sum_{j=1}^3x_j
\log\frac{p_{j0}}{\widehat p_j}\\
&=2\sum_{j=1}^3x_j
\log\frac{\widehat p_j}{p_{j0}}.
\end{aligned}
$$

帰無仮説下の期待度数を

$$
E_j=60p_{j0}
$$

とすると $x_j=60\widehat p_j$ なので

$$
\frac{\widehat p_j}{p_{j0}}
=\frac{x_j}{E_j}.
$$

したがって一般形は

$$
\boxed{
G^2=2\sum_{j=1}^3x_j\log\frac{x_j}{E_j}
}.
$$

本問では

$$
(E_1,E_2,E_3)=(30,20,10),
$$

よって

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

### 3. Pearson統計量

Pearson統計量の定義は

$$
X_P^2
=\sum_{j=1}^3\frac{(x_j-E_j)^2}{E_j}.
$$

各セルについて

$$
x_1-E_1=27-30=-3,
$$

$$
x_2-E_2=21-20=1,
$$

$$
x_3-E_3=12-10=2.
$$

したがって

$$
\begin{aligned}
X_P^2
&=\frac{(-3)^2}{30}
+\frac{1^2}{20}
+\frac{2^2}{10}\\
&=\frac{9}{30}+\frac1{20}+\frac4{10}\\
&=\frac{6}{20}+\frac1{20}+\frac8{20}\\
&=\boxed{\frac34}.
\end{aligned}
$$

### 4. 漸近カイ二乗分布と自由度

尤度比検定について Wilks の定理を使う。本問では

- 区分数3は固定である。
- 帰無確率 $1/2,1/3,1/6$ は全て正で、単体の内部点にある。
- 多項分布モデルはこの点の近くで滑らかかつ識別可能である。
- 非制約モデルは $p_1+p_2+p_3=1$ のため自由次元が $3-1=2$ である。
- 帰無仮説は確率ベクトルを1点に固定するので自由次元は0である。

したがって次元差は2であり

$$
\boxed{G^2\xrightarrow{d}\chi^2_2}.
$$

Pearson統計量については、固定区分数で全帰無確率が正なら

$$
E_j=np_{j0}\longrightarrow\infty
$$

となり、Pearson 適合度統計量のカイ二乗極限定理を適用できる。自由度は同じく

$$
3-1=2
$$

だから

$$
\boxed{X_P^2\xrightarrow{d}\chi^2_2}.
$$

### 5. 尤度比統計量と Pearson 統計量の漸近同値

一般の標本サイズ $n$ を考え、

$$
E_j=np_j,
\qquad
D_j=X_j-E_j
$$

と置く。多項分布の中心極限定理から

$$
D_j=O_p(\sqrt n).
$$

また $p_j>0$ は固定なので

$$
E_j=np_j=O(n).
$$

したがって

$$
u_j=\frac{D_j}{E_j}=O_p(n^{-1/2}).
$$

尤度比統計量は

$$
\begin{aligned}
G^2
&=2\sum_jX_j\log\frac{X_j}{E_j}\\
&=2\sum_j(E_j+D_j)
\log\left(1+\frac{D_j}{E_j}\right)\\
&=2\sum_jE_j(1+u_j)\log(1+u_j).
\end{aligned}
$$

ここで

$$
\log(1+u)
=u-\frac{u^2}{2}+\frac{u^3}{3}+O(u^4).
$$

これに $1+u$ を掛けると

$$
\begin{aligned}
(1+u)\log(1+u)
&=(1+u)\left(u-\frac{u^2}{2}+\frac{u^3}{3}+O(u^4)\right)\\
&=u+\frac{u^2}{2}-\frac{u^3}{6}+O(u^4).
\end{aligned}
$$

したがって

$$
\begin{aligned}
G^2
&=2\sum_jE_j
\left(u_j+\frac{u_j^2}{2}-\frac{u_j^3}{6}+O_p(u_j^4)\right)\\
&=2\sum_jD_j
+\sum_j\frac{D_j^2}{E_j}
-\frac13\sum_j\frac{D_j^3}{E_j^2}
+\sum_jO_p(E_ju_j^4).
\end{aligned}
$$

全度数と期待度数の合計はともに $n$ なので

$$
\sum_jD_j
=\sum_jX_j-\sum_jE_j
=n-n=0.
$$

第2項はちょうど

$$
\sum_j\frac{D_j^2}{E_j}=X_P^2.
$$

残りの次数を確認する。$D_j=O_p(\sqrt n)$, $E_j=O(n)$ だから

$$
\frac{D_j^3}{E_j^2}
=O_p\left(\frac{n^{3/2}}{n^2}\right)
=O_p(n^{-1/2})
=o_p(1).
$$

また

$$
E_ju_j^4
=O(n)\,O_p(n^{-2})
=O_p(n^{-1})
=o_p(1).
$$

区分数は固定なので有限個の和を取っても $o_p(1)$ のままである。よって

$$
\boxed{G^2=X_P^2+o_p(1)}.
$$

## 本番答案

問題文の確率質量関数から

$$
L(p)
=\frac{60!}{x_1!x_2!x_3!}\prod_{j=1}^3p_j^{x_j}.
$$

対数を取り、Lagrange法で

$$
\frac{x_j}{p_j}-\nu=0,
\qquad
\sum_jp_j=1
$$

を解くと

$$
\widehat p_j=x_j/60.
$$

尤度比では多項係数が約分され、

$$
G^2=2\sum_jx_j\log\frac{x_j}{E_j}.
$$

$E=(30,20,10)$ なので

$$
G^2
=2\left[
27\log\frac{27}{30}
+21\log\frac{21}{20}
+12\log\frac{12}{10}
\right].
$$

また

$$
X_P^2
=\sum_j\frac{(x_j-E_j)^2}{E_j}
=\frac34.
$$

帰無確率は全て正で固定3区分、真値は単体内部にある。Wilks の定理と Pearson のカイ二乗極限定理から

$$
G^2,X_P^2\xrightarrow{d}\chi^2_2.
$$

さらに $D_j=X_j-E_j$, $u_j=D_j/E_j$ と置くと

$$
(1+u_j)\log(1+u_j)
=u_j+\frac12u_j^2+O_p(u_j^3).
$$

$\sum_jD_j=0$, $D_j=O_p(\sqrt n)$, $E_j=O(n)$ より

$$
G^2=X_P^2+o_p(1).
$$

## 採点基準

- 確率質量関数・完全な対数尤度・Lagrange法による最尤推定量: 4点
- 尤度比の定義から $G^2$ を導く: 5点
- Pearson統計量: 3点
- 漸近自由度と定理の条件: 3点
- Taylor 展開と剰余項の次数確認による漸近同値: 5点
