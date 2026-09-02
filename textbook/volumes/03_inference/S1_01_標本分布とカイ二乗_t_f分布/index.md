# S1-01 標本分布とカイ二乗・t・F分布

母集団の分布が既知でも、標本平均や標本分散は標本ごとに変動します。本章では、この統計量自身の分布である標本分布を、正規標本の平均方向と残差方向の分解から構成し、カイ二乗・t・F分布へつなげます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

## この章で解けるようになる問題

- カイ二乗・t・F分布を生成表現から定義する。
- 正規標本の標本平均と不偏標本分散の分布を導く。
- 標本平均と不偏標本分散の独立性を説明する。
- 標準正規変数と独立なカイ二乗変数からt統計量を構成する。
- 独立な二標本の標本分散比からF分布を構成する。
- 自由度が残差空間の次元として現れる理由を説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| 標本分布 | 標本平均、不偏標本分散 |
| カイ二乗分布 | 正規残差の平方和、自由度 |
| t分布 | 未知分散を標本分散で置き換えた標準化 |
| F分布 | 独立な二つの標本分散の比 |
| 独立性 | 正規標本での標本平均と標本分散の独立性 |

## 前提知識チェック

1. P3-02: 正規分布、ガンマ分布、標準化を使う。
2. P3-03: 多変量正規分布と直交変換後の独立性を使う。
3. P2-02: 標本平均・分散の基本計算を使う。
4. F0-00: 直交行列、射影、二次形式、階数を確認する。

---

## なぜ三つの分布が必要か

正規母集団 $N(\mu,\sigma^2)$ から標本を取ると、$\sigma$ が既知なら
$$
Z=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1)
$$
である。しかし実際には $\sigma$ も未知であることが多い。$\sigma$ を標本標準偏差 $S$ に置き換えると、分母も確率変数になるため標準正規分布ではなくt分布が現れる。

また、標本分散の変動は正規残差の平方和なのでカイ二乗分布で表される。独立な二つの標本分散を比べると、二つのカイ二乗変数の比であるF分布が現れる。

$$
\text{正規標本}
\longrightarrow
\begin{cases}
\text{残差平方和} &\longrightarrow \chi^2,\\
\text{平均}/\sqrt{\text{残差平方和}} &\longrightarrow t,\\
\text{二つの残差平方和の比} &\longrightarrow F.
\end{cases}
$$

この一本の構造を理解すれば、後続の信頼区間・検定で公式を取り違えにくくなる。

---

<a id="def-s1-01-01"></a>
 
<!-- formal-statement-start -->
## 定義
<!-- formal-statement-end -->

### S1-DEF-01 統計量と標本分布

$X_1,\ldots,X_n$ を標本とする。未知母数を含まない標本の関数 $T=T(X_1,\ldots,X_n)$ を統計量といい、$T$ の確率分布を標本分布という。

標本平均と不偏標本分散は
$$
\overline X=\frac1n\sum_{i=1}^nX_i,\qquad
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2
$$
とする。$S^2$ の分母が $n-1$ であることに注意する。

### S1-DEF-02 カイ二乗分布

$\nu\in\mathbb N$ とし、$Z_1,\ldots,Z_\nu$ が独立に標準正規分布 $N(0,1)$ に従うとする。
$$Q=\sum_{j=1}^{\nu}Z_j^2$$
の分布を自由度 $\nu$ のカイ二乗分布といい、$Q\sim\chi^2_\nu$ と書く。台は $q>0$、密度は
$$
f_Q(q)=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}q^{\nu/2-1}e^{-q/2}
\boldsymbol1_{(0,\infty)}(q).
$$
これは形状母数 $\nu/2$、率母数 $1/2$ のガンマ分布 $\operatorname{Gamma}(\nu/2,1/2)$ であるから
$$E[Q]=\nu,\qquad \operatorname{Var}(Q)=2\nu.$$

### S1-DEF-03 t分布

$\nu\in\mathbb N$ とする。$Z\sim N(0,1)$、$Q\sim\chi^2_\nu$ が独立であるとき
$$T=\frac{Z}{\sqrt{Q/\nu}}$$
の分布を自由度 $\nu$ のt分布といい、$T\sim t_\nu$ と書く。台は実数全体、密度は
$$
f_T(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2}.
$$
密度は0について対称で、$\nu>1$ なら $E[T]=0$、$\nu>2$ なら $\operatorname{Var}(T)=\nu/(\nu-2)$ である。

### S1-DEF-04 F分布

$\nu_1,\nu_2\in\mathbb N$ とする。$Q_1\sim\chi^2_{\nu_1}$、$Q_2\sim\chi^2_{\nu_2}$ が独立であるとき
$$W=\frac{Q_1/\nu_1}{Q_2/\nu_2}$$
の分布を自由度 $(\nu_1,\nu_2)$ のF分布といい、$W\sim F_{\nu_1,\nu_2}$ と書く。台は $w>0$ である。逆数を取ると
$$W^{-1}\sim F_{\nu_2,\nu_1}.$$
密度は $w>0$ で
$$
f_W(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}
{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}
w^{\nu_1/2-1}
\left(1+\frac{\nu_1}{\nu_2}w\right)^{-(\nu_1+\nu_2)/2},
$$
台外では0である。$u=\nu_1w/(\nu_2+\nu_1w)$ と置くとベータ積分へ変換され、全積分が1となる。

上側確率 $P(F_{\nu_1,\nu_2}>c)=\alpha$ を満たす点を $F_{\nu_1,\nu_2;\alpha}$ と書く。以後、上側確率で添字を付ける。

---

## 定理と導出

### S1-THM-01 正規標本の平均と分散

$X_1,\ldots,X_n\overset{\text{独立同分布}}{\sim}N(\mu,\sigma^2)$、$n\geq2$ とする。このとき
$$
\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right),
\qquad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $\overline X$ と $S^2$ は独立である。

標本平均の式は正規変数の線形結合から従う。分散については次の平方和分解が中心になる。
$$
\sum_{i=1}^n(X_i-\mu)^2
=\sum_{i=1}^n(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$
実際、$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ を二乗して足すと、交差項は
$$
2(\overline X-\mu)\sum_{i=1}^n(X_i-\overline X)=0
$$
となる。

### S1-THM-02 平方和分解と自由度

標準化したベクトル
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}
X_1-\mu\\ \vdots\\ X_n-\mu
\end{pmatrix}
\sim N_n(\boldsymbol0,\boldsymbol I_n)
$$
を考える。平均方向
$$
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
へ射影した成分は
$$
\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1).
$$
第一行が $\boldsymbol e^{\mathsf T}$ である直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置く。直交性より
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol A\boldsymbol I_n\boldsymbol A^{\mathsf T})
=N_n(\boldsymbol0,\boldsymbol I_n).
$$
従って $W_1,\ldots,W_n$ は独立な標準正規変数で、$W_1=\boldsymbol e^{\mathsf T}\boldsymbol Z$ である。直交変換は長さを保つため
$$
\left\|(\boldsymbol I_n-\boldsymbol e\boldsymbol e^{\mathsf T})\boldsymbol Z\right\|^2
=\sum_{j=2}^nW_j^2
=\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2.
$$
従って
$$
\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2
=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$
$W_1$ と $(W_2,\ldots,W_n)$ は独立だから、前者の関数である $\overline X$ と、後者の平方和の関数である $S^2$ も独立である。自由度が $n-1$ なのは、残差が
$$\sum_{i=1}^n(X_i-\overline X)=0$$
という一つの線形制約を満たすためである。

### S1-THM-03 t統計量

S1-THM-01より
$$
Z=\frac{\sqrt n(\overline X-\mu)}{\sigma}\sim N(0,1),
\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $Z,Q$ は独立である。従ってt分布の定義から
$$
\frac{Z}{\sqrt{Q/(n-1)}}
=\frac{\sqrt n(\overline X-\mu)/\sigma}{S/\sigma}
=\frac{\sqrt n(\overline X-\mu)}S
\sim t_{n-1}.
$$
未知の $\sigma$ が約分され、分布が $\mu,\sigma^2$ に依存しないことが重要である。

### S1-THM-04 二標本の分散比

二つの標本が互いに独立で、$n_1,n_2\geq2$ とし、
$$
X_1,\ldots,X_{n_1}\overset{\text{独立同分布}}{\sim}N(\mu_1,\sigma_1^2),
\qquad
Y_1,\ldots,Y_{n_2}\overset{\text{独立同分布}}{\sim}N(\mu_2,\sigma_2^2)
$$
とする。各不偏標本分散を $S_1^2,S_2^2$ とすると
$$
Q_1=\frac{(n_1-1)S_1^2}{\sigma_1^2}\sim\chi^2_{n_1-1},
\qquad
Q_2=\frac{(n_2-1)S_2^2}{\sigma_2^2}\sim\chi^2_{n_2-1}.
$$
標本間の独立性から $Q_1,Q_2$ は独立である。従って
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$
$\sigma_1^2=\sigma_2^2$ のときだけ、未調整の比 $S_1^2/S_2^2$ 自体がこのF分布に従う。

---

## 典型例

### 例1 標本分散の確率

$X_1,\ldots,X_{10}\overset{\text{独立同分布}}{\sim}N(\mu,4)$ とする。$P(S^2\leq6)$ をカイ二乗分布で表す。

$$
Q=\frac{(10-1)S^2}{4}\sim\chi^2_9.
$$
$S^2\leq6$ は $Q\leq9\cdot6/4=13.5$ と同値なので
$$P(S^2\leq6)=P(\chi^2_9\leq13.5).$$
自由度は標本数10ではなく9である。

### 例2 t統計量

$X_1,\ldots,X_{16}\overset{\text{独立同分布}}{\sim}N(\mu,\sigma^2)$ とし、$\overline X=12,S=4$ を観測した。$\mu=10$ を代入したt統計量は
$$
t=\frac{\sqrt{16}(12-10)}4=2.
$$
帰無値10の下で対応する確率変数は $t_{15}$ に従う。

### 例3 二標本分散比

独立な正規標本で $n_1=8,n_2=11$ とする。母分散が等しいと仮定したとき
$$
\frac{S_1^2}{S_2^2}\sim F_{7,10}.
$$
$S_1^2=6,S_2^2=3$ なら観測比は2である。分子・分母を逆にすると値は $1/2$、自由度も $F_{10,7}$ へ逆転する。

### 例4 平方和分解

観測値 $1,2,3$ では $\overline x=2$ であり、
$$
\sum_{i=1}^3(x_i-\mu)^2
=\sum_{i=1}^3(x_i-2)^2+3(2-\mu)^2
=2+3(2-\mu)^2.
$$
左辺を直接展開しても $3\mu^2-12\mu+14$、右辺も同じ式になる。平均との差と残差の交差項が消えることの数値検算である。

---

## 問題解決の型

### 1. 何がランダムかを先に書く

標本平均、標本分散、観測値を区別する。$S^2$ は確率変数、$s^2$ はその観測値である。

### 2. 生成表現へ戻る

- 平方和なら $\chi^2$。
- 標準正規を独立なカイ二乗平方根で割るなら $t$。
- 独立な二つのカイ二乗を自由度で割った比なら $F$。

### 3. 自由度を式から数える

標本分散では平均を推定して一つ制約を使うため $n-1$。二標本なら分子 $n_1-1$、分母 $n_2-1$ の順で書く。

### 4. 不等号を標準量へ移す

例えば
$$
P(a\leq S^2\leq b)
=P\left(\frac{(n-1)a}{\sigma^2}
\leq\frac{(n-1)S^2}{\sigma^2}
\leq\frac{(n-1)b}{\sigma^2}\right).
$$
正の量で割るため不等号の向きは変わらない。

### 5. 正規性と独立性を確認する

正規母集団でない場合、標本平均と標本分散の独立性や有限標本でのt・カイ二乗分布は一般には成り立たない。中心極限定理による近似と混同しない。

### 6. 本番答案の最小構造

「標準量の定義→分布名と自由度→事象の変形→結論」の順に書く。分位点を使う場合は上側か下側かを言葉でも確認する。

---

## 演習

### Level A

#### S1-A01 カイ二乗の平均分散
- level: A
- minutes: 7

$Q\sim\chi^2_6$ の平均と分散を求めよ。

<!-- solution-start -->

##### 詳細解答

$Q\sim\chi^2_\nu$ では $E[Q]=\nu$、$\operatorname{Var}(Q)=2\nu$ なので、自由度6では
$$E[Q]=6,\qquad\operatorname{Var}(Q)=12.$$

##### 本番答案

$Q\sim\chi^2_6$ より
$$
E[Q]=6,\qquad \operatorname{Var}(Q)=12.
$$

##### 採点基準

平均10点、分散10点。合計20点。

<!-- solution-end -->

#### S1-A02 正規標本平均
- level: A
- minutes: 8

$X_i\overset{\text{独立同分布}}{\sim}N(3,4)$、$n=16$ のとき $\overline X$ の分布を求めよ。

<!-- solution-start -->

##### 詳細解答

正規変数の平均は正規分布に従い、
$$E[\overline X]=3,\qquad\operatorname{Var}(\overline X)=\frac4{16}=\frac14.$$
従って $\overline X\sim N(3,1/4)$。

##### 本番答案

独立な正規変数の平均なので
$$
\overline X\sim N\left(3,\frac4{16}\right)=N\left(3,\frac14\right).
$$

##### 採点基準

標本平均の平均・分散8点、正規分布としての結論12点。合計20点。

<!-- solution-end -->

#### S1-A03 t統計量
- level: A
- minutes: 8

$N(\mu,\sigma^2)$ からの大きさ9の標本について、$\sqrt9(\overline X-\mu)/S$ の分布を答えよ。

<!-- solution-start -->

##### 詳細解答

正規標本で標本標準偏差を用いるため
$$\frac{\sqrt9(\overline X-\mu)}S\sim t_{9-1}=t_8.$$

##### 本番答案

正規標本のt統計量より
$$
\frac{\sqrt9(\overline X-\mu)}S\sim t_8.
$$

##### 採点基準

t統計量の形10点、自由度8の特定10点。合計20点。

<!-- solution-end -->

#### S1-A04 F分布の逆数
- level: A
- minutes: 8

$W\sim F_{5,12}$ のとき $1/W$ の分布を答えよ。

<!-- solution-start -->

##### 詳細解答

F分布の逆数関係から $W^{-1}\sim F_{12,5}$。自由度の順も逆になる。

##### 本番答案

F分布の逆数関係より
$$
W^{-1}\sim F_{12,5}.
$$

##### 採点基準

逆数関係10点、自由度の順を逆にした結論10点。合計20点。

<!-- solution-end -->

### Level B

#### S1-B01 平方和分解
- level: B
- minutes: 13

$\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2$ を展開して示せ。

<!-- solution-start -->

##### 詳細解答

$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ を代入すると
$$
\begin{aligned}
\sum_i(X_i-\mu)^2
&=\sum_i(X_i-\overline X)^2
+2(\overline X-\mu)\sum_i(X_i-\overline X)\\
&\quad+n(\overline X-\mu)^2.
\end{aligned}
$$
$\sum_i(X_i-\overline X)=\sum_iX_i-n\overline X=0$ なので交差項が消え、結論を得る。

##### 本番答案

$X_i-\mu=(X_i-\overline X)+(\overline X-\mu)$ より
$$
\sum_i(X_i-\mu)^2
=\sum_i(X_i-\overline X)^2
+2(\overline X-\mu)\sum_i(X_i-\overline X)
+n(\overline X-\mu)^2.
$$
$\sum_i(X_i-\overline X)=0$ だから
$$
\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$

##### 採点基準

二乗展開8点、交差項が0になる説明8点、最終恒等式4点。合計20点。

<!-- solution-end -->

#### S1-B02 標本分散の区間確率
- level: B
- minutes: 14

$X_i\overset{\text{独立同分布}}{\sim}N(\mu,9)$、$n=12$ とする。$P(6\leq S^2\leq12)$ を $\chi^2_{11}$ の確率で表せ。

<!-- solution-start -->

##### 詳細解答

$$Q=\frac{11S^2}{9}\sim\chi^2_{11}.$$
正の数 $11/9$ を掛けると
$$
P(6\leq S^2\leq12)
=P\left(\frac{22}{3}\leq Q\leq\frac{44}{3}\right).
$$

##### 本番答案

$$
Q=\frac{11S^2}{9}\sim\chi^2_{11}.
$$
したがって
$$
P(6\leq S^2\leq12)
=P\left(\frac{22}{3}\leq Q\leq\frac{44}{3}\right).
$$

##### 採点基準

カイ二乗化8点、両端の標準化8点、確率表示4点。合計20点。

<!-- solution-end -->

#### S1-B03 t統計量の観測値
- level: B
- minutes: 14

正規標本で $n=25,\overline x=52,s=10$ を得た。$\mu=50$ に対するt統計量と自由度を求めよ。

<!-- solution-start -->

##### 詳細解答

$$t=\frac{\sqrt{25}(52-50)}{10}=1,$$
自由度は $25-1=24$。

##### 本番答案

$$
t=\frac{\sqrt{25}(52-50)}{10}=1,
\qquad \text{自由度}=24.
$$

##### 採点基準

統計量の式8点、数値計算6点、自由度6点。合計20点。

<!-- solution-end -->

#### S1-B04 分散比
- level: B
- minutes: 15

独立な二つの正規標本で $n_1=10,n_2=16$ とする。$\sigma_1^2=\sigma_2^2$ の下で $S_1^2/S_2^2$ の分布を求め、$s_1^2=8,s_2^2=5$ の比を計算せよ。

<!-- solution-start -->

##### 詳細解答

母分散が等しいので
$$\frac{S_1^2}{S_2^2}\sim F_{9,15}.$$
観測比は $8/5=1.6$。

##### 本番答案

等分散の下で
$$
\frac{S_1^2}{S_2^2}\sim F_{9,15},
\qquad
\frac{s_1^2}{s_2^2}=\frac85=1.6.
$$

##### 採点基準

F分布と自由度12点、観測比8点。合計20点。

<!-- solution-end -->

### Level C

#### S1-C01 正規標本の標本分布
- level: C
- minutes: 25

$X_1,\ldots,X_n\overset{\text{独立同分布}}{\sim}N(\mu,\sigma^2)$、$n\geq2$ とする。
1. $\overline X$ の分布を求めよ。
2. 全平方和を平均成分と残差成分に分解せよ。
3. 残差の自由度が $n-1$ となる理由を述べよ。
4. $(n-1)S^2/\sigma^2$ の分布を求めよ。
5. $\overline X$ と $S^2$ の独立性を説明せよ。

<!-- solution-start -->

##### 詳細解答

**方針。** 標準化した正規標本ベクトルを、標本平均を表す1方向と、それに直交する残差の $n-1$ 方向へ分けます。

1. 正規変数の線形結合なので
$$
\overline X\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

2. 各 $i$ について
$$
X_i-\mu=(X_i-\overline X)+(\overline X-\mu)
$$
です。二乗して足すと
$$
\begin{aligned}
\sum_{i=1}^n(X_i-\mu)^2
&=\sum_{i=1}^n(X_i-\overline X)^2\\
&\quad+2(\overline X-\mu)\sum_{i=1}^n(X_i-\overline X)
+n(\overline X-\mu)^2.
\end{aligned}
$$
ここで
$$
\sum_{i=1}^n(X_i-\overline X)=\sum_{i=1}^nX_i-n\overline X=0
$$
なので
$$
\sum_{i=1}^n(X_i-\mu)^2
=\sum_{i=1}^n(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$

3. 標準化ベクトルと平均方向を
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}X_1-\mu\\ \vdots\\ X_n-\mu\end{pmatrix},
\qquad
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
と置きます。$\boldsymbol Z\sim N_n(\boldsymbol0,\boldsymbol I_n)$ で、
$$
\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}\sigma.
$$
残差は $\sum_i(X_i-\overline X)=0$ を満たすので、$n$ 方向のうち1方向が制約され、残差方向の次元は $n-1$ です。

4. 第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、
$$
\boldsymbol W=\boldsymbol A\boldsymbol Z
$$
と置きます。すると
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol A\boldsymbol A^{\mathsf T})
=N_n(\boldsymbol0,\boldsymbol I_n),
$$
したがって $W_1,\ldots,W_n$ は独立な標準正規変数です。また直交変換は長さを保つので
$$
\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2
=\sum_{j=2}^nW_j^2.
$$
よって
$$
\frac{(n-1)S^2}{\sigma^2}
=\sum_{j=2}^nW_j^2
\sim\chi^2_{n-1}.
$$

5. $W_1$ は標本平均だけを表し、$S^2$ は $W_2,\ldots,W_n$ の平方和だけで決まります。$W_1$ と $(W_2,\ldots,W_n)$ は独立なので
$$
\overline X\perp S^2.
$$

##### 本番答案

$$
\overline X\sim N(\mu,\sigma^2/n),\qquad
\sum_i(X_i-\mu)^2=\sum_i(X_i-\overline X)^2+n(\overline X-\mu)^2.
$$
$\boldsymbol e=n^{-1/2}\boldsymbol1$、$\boldsymbol Z=((X_1-\mu)/\sigma,\ldots,(X_n-\mu)/\sigma)^{\mathsf T}$ とし、第一行が $\boldsymbol e^{\mathsf T}$ の直交行列 $\boldsymbol A$ と $\boldsymbol W=\boldsymbol A\boldsymbol Z$ を取る。残差和0により残差空間の次元は $n-1$ で、$\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n)$ だから平均成分 $W_1$ と残差成分 $W_2,\ldots,W_n$ は独立である。従って
$$
\frac{(n-1)S^2}{\sigma^2}=\sum_{j=2}^nW_j^2\sim\chi^2_{n-1},\qquad
\overline X\perp S^2.
$$

##### 採点基準

各小問4点。標本平均、平方和分解、自由度、カイ二乗分布、独立性をそれぞれ採点する。合計20点。

<!-- solution-end -->

#### S1-C02 標本分散の確率と不偏性
- level: C
- minutes: 25

$X_i\overset{\text{独立同分布}}{\sim}N(\mu,16)$、$n=10$ とする。
1. $Q=9S^2/16$ の分布を求めよ。
2. $P(S^2\leq24)$ をカイ二乗確率で表せ。
3. $E[S^2]$ を求めよ。
4. $\operatorname{Var}(S^2)$ を求めよ。
5. 上側5%点を $\chi^2_{9;0.05}=16.92$ とする。$P\{S^2>16\chi^2_{9;0.05}/9\}$ を求め、この閾値の意味を述べよ。

<!-- solution-start -->

##### 詳細解答

1. $Q=9S^2/16\sim\chi^2_9$。
2. $S^2\leq24$ は $Q\leq9\cdot24/16=13.5$ と同値なので
$$P(S^2\leq24)=P(\chi^2_9\leq13.5).$$
3. $S^2=(16/9)Q$ と $E[Q]=9$ より $E[S^2]=16$。
4. $\operatorname{Var}(Q)=18$ より
$$\operatorname{Var}(S^2)=\left(\frac{16}{9}\right)^218=\frac{512}{9}.$$
5. 上側分位点の定義と $Q=9S^2/16$ より
$$
P\left(S^2>\frac{16}{9}\chi^2_{9;0.05}\right)
=P(Q>\chi^2_{9;0.05})=0.05.
$$
すなわち真の分散が16なら、この閾値を標本分散が上回る確率は5%である。なお3より $S^2$ は不偏である。

##### 本番答案

$$Q=9S^2/16\sim\chi^2_9,\qquad
P(S^2\leq24)=P(Q\leq13.5).$$
$S^2=(16/9)Q$ より
$$E[S^2]=16,\qquad \operatorname{Var}(S^2)=512/9.$$
また
$$P\{S^2>16\chi^2_{9;0.05}/9\}=0.05,$$
すなわち真の分散16の下でこの閾値を超える確率は5%である。

##### 採点基準

各小問4点。カイ二乗化、確率変形、平均、分散、上側確率の意味をそれぞれ採点する。合計20点。

<!-- solution-end -->

#### S1-C03 t分布の導出
- level: C
- minutes: 26

正規標本について、$Z=\sqrt n(\overline X-\mu)/\sigma$、$Q=(n-1)S^2/\sigma^2$ とする。
1. $Z$ の分布を求めよ。
2. $Q$ の分布を求めよ。
3. $Z,Q$ が独立である理由を述べよ。
4. $T=\sqrt n(\overline X-\mu)/S$ の分布を導け。
5. $n=16,\overline x=12,s=4,\mu=10$ の観測t値を求めよ。さらに $t_{15}$ の両側5%境界を $\pm2.131$ として、この値が境界の内側か外側かを判定せよ。

<!-- solution-start -->

##### 詳細解答

1. $\overline X\sim N(\mu,\sigma^2/n)$ だから $Z\sim N(0,1)$。
2. $Q\sim\chi^2_{n-1}$。
3. $Z$ は平均方向、$Q$ は残差方向だけの関数であり、正規標本の直交成分なので独立。
4.
$$
\frac Z{\sqrt{Q/(n-1)}}
=\frac{\sqrt n(\overline X-\mu)/\sigma}{S/\sigma}
=\frac{\sqrt n(\overline X-\mu)}S
\sim t_{n-1}.
$$
5. 観測値は $\sqrt{16}(12-10)/4=2$、自由度15。$|2|<2.131$ なので両側5%境界の内側である。

##### 本番答案

$$Z=\frac{\sqrt n(\overline X-\mu)}\sigma\sim N(0,1),\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},\qquad Z\perp Q.$$
よって
$$\frac{\sqrt n(\overline X-\mu)}S=\frac Z{\sqrt{Q/(n-1)}}\sim t_{n-1}.$$
$n=16,\overline x=12,s=4,\mu=10$ では $t=2$、自由度15で、$|2|<2.131$ より両側5%境界の内側である。

##### 採点基準

各小問4点。標準正規化、カイ二乗化、独立性、t分布の構成、数値比較をそれぞれ採点する。合計20点。

<!-- solution-end -->

#### S1-C04 F分布と二標本分散
- level: C
- minutes: 25

独立な正規標本の大きさを $n_1,n_2\geq2$、母分散を $\sigma_1^2,\sigma_2^2$ とする。
1. 各標本分散からカイ二乗変数 $Q_1,Q_2$ を作れ。
2. $Q_1,Q_2$ が独立である理由を述べよ。
3. $(S_1^2/\sigma_1^2)/(S_2^2/\sigma_2^2)$ の分布を求めよ。
4. $\sigma_1^2=\sigma_2^2$ のとき簡約せよ。
5. $n_1=10,n_2=16$、等分散、$s_1^2/s_2^2=3$ とする。上側5%点 $F_{9,15;0.05}=2.59$ と比較し、上側5%領域に入るか判定せよ。

<!-- solution-start -->

##### 詳細解答

1.
$$Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}\quad(j=1,2).$$
2. 各 $Q_j$ は互いに独立な標本だけの関数なので独立。
3.
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$
4. $\sigma_1^2=\sigma_2^2$ なら $S_1^2/S_2^2\sim F_{n_1-1,n_2-1}$。
5. 観測比3は $F_{9,15;0.05}=2.59$ より大きいので、上側5%領域に入る。逆比を用いるなら分布は $F_{15,9}$ へ変わる。

##### 本番答案

$$Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}$$
であり、標本間独立性から $Q_1\perp Q_2$。従って
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}\sim F_{n_1-1,n_2-1}.
$$
等分散なら $S_1^2/S_2^2$ 自体がこの分布に従う。$n_1=10,n_2=16$ で観測比3は $F_{9,15;0.05}=2.59$ を超え、上側5%領域に入る。逆比は $F_{15,9}$。

##### 採点基準

各小問4点。二つのカイ二乗変数、独立性、標準化分散比、等分散時の簡約、上側点との比較をそれぞれ採点する。合計20点。

<!-- solution-end -->

#### S1-C05 分位点と確率の読み替え
- level: C
- minutes: 25

上側分位点を $P(\chi^2_\nu>\chi^2_{\nu;\alpha})=\alpha$、$P(F_{\nu_1,\nu_2}>F_{\nu_1,\nu_2;\alpha})=\alpha$ と定める。
1. 各上側分位点以下となる確率を求めよ。
2. $W\sim F_{\nu_1,\nu_2}$ のとき $P(W<c)$ を $1/W$ で表せ。
3. F分布の下側確率を自由度を逆にした上側確率へ直せ。
4. $Q=(n-1)S^2/\sigma^2$ に適用し、$S^2$ の上側確率を式で表せ。
5. 自由度と上側・下側を取り違えない答案確認法を述べよ。

<!-- solution-start -->

##### 詳細解答

1. 定義の補集合より各確率は $1-\alpha$。
2. $P(W<c)=P(1/W>1/c)$。
3. $1/W\sim F_{\nu_2,\nu_1}$ なので、下側確率を自由度を逆にしたF変数の上側確率へ変換できる。特に下側 $\alpha$ 点は $1/F_{\nu_2,\nu_1;\alpha}$。
4. 上側分位点を代入すると
$$
P\left(S^2>\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)
=P(Q>\chi^2_{n-1;\alpha})=\alpha.
$$
補集合の確率は $1-\alpha$ である。
5. 「上側確率の定義を書く→分子・分母の自由度を書く→逆数なら自由度も逆にする」の3点を答案末尾で確認する。

##### 本番答案

上側分位点の定義から
$$
P(\chi^2_\nu\leq\chi^2_{\nu;\alpha})=1-\alpha,
\qquad
P(F_{\nu_1,\nu_2}\leq F_{\nu_1,\nu_2;\alpha})=1-\alpha.
$$
$W\sim F_{\nu_1,\nu_2}$ なら $P(W<c)=P(W^{-1}>c^{-1})$ かつ $W^{-1}\sim F_{\nu_2,\nu_1}$。また
$$P\left(W<\frac1{F_{\nu_2,\nu_1;\alpha}}\right)=\alpha.$$
$$P\left(S^2>\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)=\alpha.$$
逆数を取ると不等号と自由度順の両方が逆になることを確認する。

##### 採点基準

各小問4点。補集合、逆数による事象変換、自由度逆転、標本分散への適用、答案確認をそれぞれ採点する。合計20点。

<!-- solution-end -->

### Level D

#### S1-D01 正規標本総合
- level: D
- minutes: 40

正規標本の平方和分解を出発点として、
1. 標本平均方向と残差方向をベクトルで表せ。
2. 残差平方和が $\chi^2_{n-1}$ となることを示せ。
3. 標本平均と標本分散の独立性を示せ。
4. t統計量を導け。
5. 独立な第二標本を導入し、標準化した標本分散比がF分布に従うことを導け。

2で止まった場合は「平均成分と残差成分は独立」と、5で止まった場合は
$$Q_j=(n_j-1)S_j^2/\sigma_j^2\sim\chi^2_{n_j-1}$$
を使って後半へ進んでよい。

<!-- solution-start -->

##### 詳細解答

1. 
$$
\boldsymbol Z=\frac1\sigma
\begin{pmatrix}X_1-\mu\\ \vdots\\ X_n-\mu\end{pmatrix},
\qquad
\boldsymbol e=\frac1{\sqrt n}(1,\ldots,1)^{\mathsf T}
$$
と置きます。平均方向への射影行列を
$$
\boldsymbol P=\boldsymbol e\boldsymbol e^{\mathsf T},
$$
残差方向への射影行列を
$$
\boldsymbol M=\boldsymbol I_n-\boldsymbol P
$$
とすると、平均成分は $\boldsymbol P\boldsymbol Z$、残差成分は $\boldsymbol M\boldsymbol Z$ です。

2. $\boldsymbol M^{\mathsf T}=\boldsymbol M$ であり、$\boldsymbol P^2=\boldsymbol P$ から
$$
\boldsymbol M^2=(\boldsymbol I_n-\boldsymbol P)^2
=\boldsymbol I_n-\boldsymbol P=\boldsymbol M.
$$
また $\boldsymbol M\boldsymbol e=\boldsymbol0$ で、$\boldsymbol e$ に直交する $n-1$ 次元部分空間では恒等写像として働くため
$$
\operatorname{rank}(\boldsymbol M)=n-1.
$$
第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置くと
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n).
$$
さらに
$$
\frac{(n-1)S^2}{\sigma^2}
=\|\boldsymbol M\boldsymbol Z\|^2
=\sum_{j=2}^nW_j^2
\sim\chi^2_{n-1}.
$$

3. 
$$
W_1=\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}\sigma
$$
で、$W_1$ と $W_2,\ldots,W_n$ は独立です。したがって
$$
\overline X\perp S^2.
$$

4. 
$$
Z_0=\frac{\sqrt n(\overline X-\mu)}\sigma\sim N(0,1),
\qquad
Q=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1},
$$
かつ $Z_0\perp Q$ なので
$$
\frac{\sqrt n(\overline X-\mu)}S
=\frac{Z_0}{\sqrt{Q/(n-1)}}
\sim t_{n-1}.
$$

5. 独立な第二標本について
$$
Q_j=\frac{(n_j-1)S_j^2}{\sigma_j^2}\sim\chi^2_{n_j-1}
\qquad(j=1,2)
$$
を作ると $Q_1\perp Q_2$ です。したがって
$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}
=\frac{Q_1/(n_1-1)}{Q_2/(n_2-1)}
\sim F_{n_1-1,n_2-1}.
$$

##### 本番答案

$\boldsymbol Z=((X_1-\mu)/\sigma,\ldots,(X_n-\mu)/\sigma)^{\mathsf T}$、$\boldsymbol e=n^{-1/2}\boldsymbol1$ とする。第一行を $\boldsymbol e^{\mathsf T}$ とする直交行列 $\boldsymbol A$ を取り、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置くと $\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n)$。従って
$$
W_1=\frac{\sqrt n(\overline X-\mu)}\sigma,\qquad
\frac{(n-1)S^2}{\sigma^2}=\sum_{j=2}^nW_j^2\sim\chi^2_{n-1},\qquad
W_1\perp(W_2,\ldots,W_n).
$$
よって $\overline X\perp S^2$ かつ $\sqrt n(\overline X-\mu)/S\sim t_{n-1}$。独立な第二標本についても同様に $Q_j\sim\chi^2_{n_j-1}$ を作れば、標準化分散比は $F_{n_1-1,n_2-1}$ に従う。

##### 採点基準

各小問4点。射影表示、残差平方和と階数、独立性、t分布、二標本F分布をそれぞれ採点する。合計20点。

<!-- solution-end -->

---

## 30分ドリル

- id: S1-DRILL-01
- level: C
- minutes: 30
- total: 100点

### 過去問傾向との対応

MATH-2023-Q2のカイ二乗分布、MATH-2018-Q1の標本分散、MATH-2014-Q3のt分布という技能を、一つの正規標本設定から第二標本へ広げる独自問題に再構成した。

### 問題

本問で使う生成表現は
$$
\chi^2_\nu=\sum_{j=1}^{\nu}Z_j^2,\qquad
t_\nu=\frac{Z}{\sqrt{Q/\nu}},\qquad
F_{\nu_1,\nu_2}=\frac{Q_1/\nu_1}{Q_2/\nu_2},
$$
ただし各右辺の標準正規変数・カイ二乗変数は互いに独立とする。台はカイ二乗・Fが正の実数、tが実数全体である。

近接して使う密度を再掲する。$N(\mu,\sigma^2)$（$\mu\in\mathbb R,\sigma^2>0$）の台は $\mathbb R$ で、
$$
f_N(x)=\frac1{\sigma\sqrt{2\pi}}\exp\left\{-\frac{(x-\mu)^2}{2\sigma^2}\right\}.
$$
$\nu,\nu_1,\nu_2\in\mathbb N$ とすると、
$$
f_{\chi^2_\nu}(q)=\frac{q^{\nu/2-1}e^{-q/2}}{2^{\nu/2}\Gamma(\nu/2)}\quad(q>0),
$$
$$
f_{t_\nu}(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2}\quad(t\in\mathbb R),
$$
$$
f_{F_{\nu_1,\nu_2}}(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}w^{\nu_1/2-1}
\left(1+\frac{\nu_1w}{\nu_2}\right)^{-(\nu_1+\nu_2)/2}\quad(w>0)
$$
であり、各台外では0である。

$X_1,\ldots,X_{10}\overset{\text{独立同分布}}{\sim}N(\mu,\sigma^2)$ とし、標本平均を $\overline X$、不偏標本分散を $S_X^2$ とする。独立に $Y_1,\ldots,Y_{16}\overset{\text{独立同分布}}{\sim}N(\mu_Y,\sigma_Y^2)$ を取り、不偏標本分散を $S_Y^2$ とする。

1. $\overline X$ の分布と、$Q_X=9S_X^2/\sigma^2$ の分布を求めよ。（20点）
2. $\overline X$ と $S_X^2$ が独立となる理由を説明せよ。（20点）
3. $T=\sqrt{10}(\overline X-\mu)/S_X$ の分布を導け。（20点）
4. $R=(S_X^2/\sigma^2)/(S_Y^2/\sigma_Y^2)$ の分布を導け。（20点）
5. $\sigma^2=\sigma_Y^2$、$s_X^2=24,s_Y^2=8$ とする。観測分散比を求め、上側5%点 $F_{9,15;0.05}=2.59$ と比較して上側5%領域に入るか判定せよ。逆比の分布も答えよ。（20点）

<!-- solution-start -->

### 詳細解答

#### 1. 平均と標本分散

正規変数の線形結合より
$$\overline X\sim N\left(\mu,\frac{\sigma^2}{10}\right).$$
また正規標本の残差平方和より
$$Q_X=\frac{9S_X^2}{\sigma^2}\sim\chi^2_9.$$
自由度は、10個の残差に残差和0という一つの制約があるため9である。

#### 2. 独立性

標準化標本ベクトルを平均方向と残差方向へ直交射影する。$\overline X$ は平均方向だけ、$S_X^2$ は残差方向の長さだけの関数である。多変量正規分布では直交する射影成分は共分散0で独立なので、$\overline X$ と $S_X^2$ は独立である。

#### 3. t分布

$$Z=\frac{\sqrt{10}(\overline X-\mu)}{\sigma}\sim N(0,1)$$
と $Q_X\sim\chi^2_9$ は独立である。従って
$$
\frac Z{\sqrt{Q_X/9}}
=\frac{\sqrt{10}(\overline X-\mu)}{S_X}
\sim t_9.
$$

#### 4. F分布

第二標本について
$$Q_Y=\frac{15S_Y^2}{\sigma_Y^2}\sim\chi^2_{15}.$$
標本間の独立性から $Q_X,Q_Y$ は独立である。よって
$$R=\frac{Q_X/9}{Q_Y/15}\sim F_{9,15}.$$

#### 5. 観測比と逆数

母分散が等しければ $R=S_X^2/S_Y^2$ なので、観測値は
$$r=\frac{24}{8}=3.$$
$3>2.59$ なので上側5%領域に入る。逆比は $1/3$ であり、分布は自由度も逆転して
$$\frac{S_Y^2}{S_X^2}\sim F_{15,9}.$$

### 本番答案

$$
\overline X\sim N(\mu,\sigma^2/10),\qquad
Q_X=9S_X^2/\sigma^2\sim\chi^2_9.
$$
平均方向と残差方向は直交する正規成分なので $\overline X$ と $S_X^2$ は独立。従って
$$
\frac{\sqrt{10}(\overline X-\mu)}{S_X}
=\frac{N(0,1)}{\sqrt{\chi^2_9/9}}\sim t_9.
$$
また $Q_Y=15S_Y^2/\sigma_Y^2\sim\chi^2_{15}$ だから
$$
\frac{S_X^2/\sigma^2}{S_Y^2/\sigma_Y^2}
=\frac{Q_X/9}{Q_Y/15}\sim F_{9,15}.
$$
等分散で観測分散比は3で、$3>F_{9,15;0.05}=2.59$ より上側5%領域に入る。逆比は $1/3$ で $F_{15,9}$ に従う。

### 採点基準

各小問20点。分布・自由度、独立性の根拠、t・Fの生成表現、観測比と上側点の比較を小問ごとに採点する。合計100点。

<!-- solution-end -->

---

## 過去問との対応

### MATH-2023-Q2

- 科目: 統計数理
- 制限時間: 25分
- 入手先: 統計検定1級 公式問題集［2022～2024年］
- 現在解く範囲: カイ二乗分布を直接扱う小問
- 後続で再挑戦: 逆関数法・乱数生成を扱う小問はP4-03
- 答案確認: 自由度、台、変換前後の分布を明記する
- 確認元: 第三者テーマ索引（Academaid）、問題自体は公式問題集を参照

### MATH-2018-Q1

- 科目: 統計数理
- 制限時間: 25分
- 入手先: 統計検定1級 公式問題集［2017～2019年］
- 現在解く範囲: 正規標本からカイ二乗分布・標本分散を導く小問
- 後続で再挑戦: 区間推定を要求する小問はI2-02
- 答案確認: $\chi^2$ 化の分母と自由度を先に書く
- 確認元: 第三者テーマ索引（SATOLOG・Academaid）、問題自体は公式問題集を参照

### MATH-2014-Q3

- 科目: 統計数理
- 制限時間: 25分
- 入手先: 『日本統計学会公式認定 統計検定1級 公式問題集［2014～2015年］』（POD版）または『統計検定1級・準1級 公式問題集［2014～2015年］』（電子書籍版）
- 現在解く範囲: t分布、標本平均と標本分散を扱う小問
- 後続で再挑戦: 信頼区間端点を評価する小問はI2-02
- 答案確認: 標準正規とカイ二乗の独立性、自由度 $n-1$
- 確認元: 第三者テーマ索引（Academaid）、問題自体は公式問題集を参照

### MATH-2014-Q4

- 科目: 統計数理
- 制限時間: 25分
- 入手先: 『日本統計学会公式認定 統計検定1級 公式問題集［2014～2015年］』（POD版）または『統計検定1級・準1級 公式問題集［2014～2015年］』（電子書籍版）
- 現在解く範囲: F分布と自由度、二標本分散比を作る小問
- 後続で再挑戦: 仮説・棄却判断を正式に扱う小問はI3-03
- 答案確認: 分子・分母の自由度順、逆数関係
- 確認元: 第三者テーマ索引（Academaid）、問題自体は公式問題集を参照

### 独自ドリルとの接続

S1-DRILL-01 は上記のカイ二乗・標本分散・t構成を一つの正規標本に統合し、さらに独立な第二標本を加えてF分布へ接続する。標本数・数値・設問順は独自である。
