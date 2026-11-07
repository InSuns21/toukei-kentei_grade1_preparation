# SLT2-01 過剰パラメータと線形補間

特徴量の数が訓練データの数を超えると、何が起こるのだろうか。「未知数が多いから訓練誤差をゼロにできる」という直感には、重要な条件が抜けている。訓練点での予測が一致しても、未知の点での予測は一致しないこともある。

ここでは線形回帰の**有限次元の恒等式**だけを使い、補間できる条件、何通りの係数が補間するか、どの標本外予測が確定するかを区別する。確率的な汎化界はまだ主張しない。次章では、複数の補間解から最小ノルム解や勾配流が何を選ぶかを調べる。

[設計行列と線形予測の定義](../../ML/ML1-04/index.md#def-ml1-04-design-matrix)に従い、訓練標本を $n$ 件、特徴を $p$ 個とする。各標本の特徴を行に並べた行列を $X\in\mathbb R^{n\times p}$、応答を $y\in\mathbb R^n$、係数を $\beta\in\mathbb R^p$ と置く。

訓練点での予測全体は $X\beta$ という $n$ 次元ベクトルである。$p>n$ を**過剰パラメータ**の場合と呼ぶ。この不等式だけでは行の独立性は決まらない。

## 1. 訓練データを全て再現できる条件

例えば次の2件・3特徴の設計では、1番目の特徴と3番目の特徴を足した値で1件目を、2番目と3番目を足した値で2件目を予測する。

$$
X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix},
\qquad
X\beta=\begin{pmatrix}\beta_1+\beta_3\\\beta_2+\beta_3\end{pmatrix}.
$$

応答を $y=(1,2)^{\mathsf T}$ とすれば $\beta=(1,2,0)^{\mathsf T}$ は完全に一致する。しかし「ある応答で一致した」と「どんな応答でも一致できる」は別の主張である。

訓練値を全て一致させることを、線形模型の**補間**と考える。[最小二乗問題](../../ML/ML1-04/index.md#def-ml1-04-least-squares)では残差二乗和を小さくするが、補間ではその残差をちょうどゼロに要求する。

<a id="def-slt2-01-linear-interpolation"></a>

<!-- formal-statement-start -->
> **定義（線形補間可能性）**  
> $X\in\mathbb R^{n\times p}$、$y\in\mathbb R^n$ に対し、ある $\beta\in\mathbb R^p$ が $X\beta=y$ を満たすとき、組 $(X,y)$ は線形補間可能という。この $\beta$ を補間解と呼ぶ。すなわち、[像の定義](../../../基礎科目/F0/F0-00F/index.md#def-f0-00f-kernel-image)を用いれば、$y\in\operatorname{Im}X$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-01-linear-interpolation -->
### 例：2件・3特徴で定義を直接確認する

**定義の確認**。冒頭の $X$ と $y=(1,2)^{\mathsf T}$ について $\beta=(1,2,0)^{\mathsf T}$ を実際に代入すると

$$
X\beta
=\begin{pmatrix}1+0\\2+0\end{pmatrix}
=\begin{pmatrix}1\\2\end{pmatrix}=y.
$$

したがって $y$ は $X$ の像に入り、残差 $y-X\beta$ は零ベクトルである。$p>n$ という数の比較だけでなく、この等式が補間可能性の条件そのものである。
<!-- definition-example-end -->

全ての $y$ に補間解があるためには、写像 $X:\mathbb R^p\to\mathbb R^n$ が全射、すなわち階数が $n$ でなければならない。これを**行フルランク**という。また [階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01) は、核の次元が $p-\operatorname{rank}X$ であると教える。

<a id="thm-slt2-01-full-row-rank"></a>

<!-- formal-statement-start -->
> **定理（任意応答の補間と行フルランクの同値性）**  
> $n,p$ を正整数、$X\in\mathbb R^{n\times p}$ を固定する。次は同値である。
>
> 1. 任意の $y\in\mathbb R^n$ に対して $X\beta=y$ となる $\beta\in\mathbb R^p$ が存在する。
> 2. $\operatorname{rank}X=n$（行フルランク）である。
>
> さらに $p>n$ かつ行フルランクなら、任意の $y$ の補間解は無限個存在し、その解集合の自由度は $p-n$ である。$p>n$ だけでは条件1は従わない。
<!-- formal-statement-end -->

### 証明の見取り図

条件1は像が $\mathbb R^n$ 全体であることを意味する。像の次元を数えると条件2になる。解が一つあれば、その解に核の任意の元を加えても $X\beta$ は変わらない。行フルランクかつ $p>n$ では[階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)から核に少なくとも一つ非零方向がある。

<!-- proof-start -->
### 証明

$X$ の像は $X\beta$ の形のベクトル全体なので、条件1は $\operatorname{Im}X=\mathbb R^n$ と同値である。$\operatorname{Im}X$ は $\mathbb R^n$ の部分空間であり、

$$
\dim\operatorname{Im}X=\operatorname{rank}X.
$$

したがって像が全体空間に等しいことと階数が $n$ であることは同値である。

次に $p>n$、$\operatorname{rank}X=n$ とする。上で補間解 $\beta_0$ が存在することを示した。[階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)を $X:\mathbb R^p\to\mathbb R^n$ に適用すると

$$
\dim\ker X=p-\operatorname{rank}X=p-n>0.
$$

任意の $z\in\ker X$ について $X(\beta_0+z)=X\beta_0+Xz=y$。逆に $X\beta=y$ なら $X(\beta-\beta_0)=0$ なので $\beta-\beta_0\in\ker X$ である。ゆえに解集合は

$$
\{\beta:X\beta=y\}=\beta_0+\ker X.
$$

核に非零の $z$ があるから $\beta_0+tz$（$t\in\mathbb R$）は全て異なる解で、自由な係数の次元は $p-n$ である。最後に $p>n$ でも階数が $n$ に満たない行列は存在する（直後の例）。したがって未知数の個数だけでは十分でない。$\square$
<!-- proof-end -->

### 反例：3特徴あっても2件を補間できない

$$
X_{\mathrm{dep}}=
\begin{pmatrix}1&0&1\\2&0&2\end{pmatrix},
\qquad y=\begin{pmatrix}1\\0\end{pmatrix}.
$$

任意の係数について $X_{\mathrm{dep}}\beta=(a,2a)^{\mathsf T}$（$a=\beta_1+\beta_3$）である。$y$ と一致するには $a=1$ と $2a=0$ が必要で、矛盾する。2行目が1行目の2倍なので階数は1であり、全射ではない。一方 $y'=(1,2)^{\mathsf T}$ なら補間できる。**一部の応答が補間できること**と、**任意の応答を補間できること**を混同しない。

補間できない場合でも、[最小二乗解の存在と適合値の一意性](../../ML/ML1-04/index.md#thm-ml1-04-existence-fit-uniqueness)により、列空間への射影として訓練上の最良近似は一意に決まる。ただし係数は一意とは限らない。

## 2. 訓練値の一致と標本外予測の一致

冒頭の例では $X\beta=y$ の全ての解は

$$
\beta(t)=\begin{pmatrix}1-t\\2-t\\t\end{pmatrix},
\qquad t\in\mathbb R
$$

と表せる。どの $t$ も訓練点では同じ予測を返す。しかし未知の特徴ベクトル $x\in\mathbb R^p$ に対する予測は $x^{\mathsf T}\beta(t)$ であり、こちらは違うかもしれない。そこで「訓練行列で区別できない係数」という関係を先に定めよう。

<a id="def-slt2-01-observational-equivalence"></a>

<!-- formal-statement-start -->
> **定義（訓練上の観測同値性）**  
> 固定した $X\in\mathbb R^{n\times p}$ に対し、二つの係数 $\beta,\beta'\in\mathbb R^p$ が $X\beta=X\beta'$ を満たすとき、訓練上で観測同値といい $\beta\sim_X\beta'$ と書く。これは $\beta-\beta'\in\ker X$ と同値である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-01-observational-equivalence -->
### 例：異なる係数が全訓練点で一致する

**定義の確認**。冒頭の $X$ で $\beta=(1,2,0)^{\mathsf T}$、$\beta'=(0,1,1)^{\mathsf T}$ とする。成分ごとに積を取れば

$$
X\beta=(1,2)^{\mathsf T},
\qquad X\beta'=(0+1,1+1)^{\mathsf T}=(1,2)^{\mathsf T}.
$$

差 $\beta-\beta'=(1,1,-1)^{\mathsf T}$ は $X$ で零へ写されるから、同値性の二つの判定法は一致する。だが $\beta\ne\beta'$ である。
<!-- definition-example-end -->

ここで、$X$ の各行（$p$ 次元特徴ベクトル）から作る部分空間を $\operatorname{row}(X)=\operatorname{Im}X^{\mathsf T}\subseteq\mathbb R^p$ と書く。これは**行空間**である。[直交補空間](../../../基礎科目/F0/F0-00E1/index.md#def-f0-00e1-orthogonal-complement)は、ある部分空間の全ベクトルと内積が零になるベクトルを集めたものである。行空間に垂直な方向は、訓練点の予測へ影響しない。

<a id="thm-slt2-01-row-null-prediction"></a>

<!-- formal-statement-start -->
> **定理（行空間・核の直交分解と標本外予測）**  
> 任意の $X\in\mathbb R^{n\times p}$ に対し、

$$
\mathbb R^p=\operatorname{row}(X)\oplus\ker X,
\qquad \operatorname{row}(X)=(\ker X)^\perp
$$

> は直交直和である。さらに $y\in\operatorname{Im}X$、$x\in\mathbb R^p$ とすると、補間解 $\beta$ をどれに選んでも $x^{\mathsf T}\beta$ が同一値となるための必要十分条件は $x\in\operatorname{row}(X)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

行 $r_i^{\mathsf T}$ の各々と $z\in\ker X$ の内積は $(Xz)_i=0$ だから、行空間は核の直交補空間に入る。次元が一致することを確かめ、[直交分解定理](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-orthogonal-decomposition)につなぐ。新しい特徴 $x$ が行空間内なら核方向の違いは見えない。外なら核へ射影した成分が反例を与える。

<!-- proof-start -->
### 証明

$r_i^{\mathsf T}$ を $X$ の第 $i$ 行とし、$z\in\ker X$ を任意に取る。各 $i$ について

$$
r_i^{\mathsf T}z=(Xz)_i=0.
$$

行空間の任意の元は行の線形結合なので、その全てが $z$ と直交する。すなわち $\operatorname{row}(X)\subseteq(\ker X)^\perp$。一方、[階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)より $\dim\ker X=p-r$（$r=\operatorname{rank}X$）、行空間の次元は $r$ である。[直交補空間の次元と分解](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-orthogonal-decomposition)を用いると

$$
\dim(\ker X)^\perp=p-\dim\ker X=r=\dim\operatorname{row}(X).
$$

有限次元の部分空間の包含で次元が等しいため、$\operatorname{row}(X)=(\ker X)^\perp$。また[射影による有限次元分解](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-orthogonal-decomposition)の存在・一意性から $\mathbb R^p=\operatorname{row}(X)\oplus\ker X$。

$y\in\operatorname{Im}X$ なので一つ補間解 $\beta_0$ がある。[任意応答の補間と行フルランクの同値性](#thm-slt2-01-full-row-rank)の証明で得た解集合の表示により、全ての補間解は $\beta_0+z$（$z\in\ker X$）と書ける。$x\in\operatorname{row}(X)=(\ker X)^\perp$ なら

$$
x^{\mathsf T}(\beta_0+z)=x^{\mathsf T}\beta_0+x^{\mathsf T}z=x^{\mathsf T}\beta_0
$$

だから一意である。逆に $x\notin\operatorname{row}(X)$ とする。[射影による有限次元分解](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-orthogonal-decomposition)により $x=u+v$、$u\in\operatorname{row}(X)$、$0\ne v\in\ker X$ となる。この $v$ を用いれば $\beta_0$ と $\beta_0+v$ はどちらも補間解であり、

$$
x^{\mathsf T}(\beta_0+v)-x^{\mathsf T}\beta_0
=x^{\mathsf T}v=(u+v)^{\mathsf T}v=\|v\|_2^2>0.
$$

よって標本外予測は一意でない。$\square$
<!-- proof-end -->

### 例：同じ訓練値から、変わる予測と変わらない予測

冒頭の $X$ の行を $r_1=(1,0,1)^{\mathsf T}$、$r_2=(0,1,1)^{\mathsf T}$ とすると、核は $(-1,-1,1)^{\mathsf T}$ の張る直線である。新しい特徴 $x_a=r_1+r_2=(1,1,2)^{\mathsf T}$ は行空間内なので

$$
x_a^{\mathsf T}\beta(t)=(1-t)+(2-t)+2t=3
$$

と必ず一致する。一方 $x_b=(0,0,1)^{\mathsf T}$ は核方向との内積が1で、行空間に属さない。このとき

$$
x_b^{\mathsf T}\beta(t)=t
$$

は好きなだけ変えられる。訓練上の同値性は、未知の特徴での同値性を意味しない。どの解を**選ぶか**は次章の問題であり、選択規則を指定せずに「予測性能が良い」とは結論できない。

## 3. 雑音も補間してしまう

行フルランクの設計では、応答 $y$ がどのように得られたかにかかわらず補間できる。応答が「真の信号＋観測雑音」である場合、訓練誤差ゼロは信号の正確な回復を意味しない。

真の係数を固定ベクトル $\beta^\star\in\mathbb R^p$、雑音を確率ベクトル $\varepsilon\in\mathbb R^n$ として、固定設計の応答を

$$
Y=X\beta^\star+\varepsilon
$$

と置く。$X$ は非確率的であり、以下の期待値は雑音 $\varepsilon$ のみに関する。これに対し、補間する任意の学習算法は $X\widehat\beta(Y)=Y$ を満たす。真の信号 $X\beta^\star$ と学習後の訓練点予測の差を評価しよう。

<a id="prop-slt2-01-noise-interpolation"></a>

<!-- formal-statement-start -->
> **命題（固定設計の雑音補間誤差）**  
> 固定した $X\in\mathbb R^{n\times p}$ が $\operatorname{rank}X=n$ を満たし、固定した $\beta^\star\in\mathbb R^p$ に対して $Y=X\beta^\star+\varepsilon$ とする。雑音の平均が0、共分散行列が $\sigma^2I_n$（$0\le\sigma^2<\infty$）で、各成分の二次モーメントが有限とする。任意の可測な補間推定量 $\widehat\beta(Y)$ が $X\widehat\beta(Y)=Y$ をほとんど確実に満たすなら、

$$
\mathbb E_\varepsilon\left[\frac1n\|X\widehat\beta(Y)-X\beta^\star\|_2^2\right]=\sigma^2.
$$

> 一方、同じ推定量の訓練残差は $\|Y-X\widehat\beta(Y)\|_2^2/n=0$ である。前者は真の訓練信号に対する誤差であり、未知の入力分布に対する予測リスクを表す式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

補間等式から推定量の詳細を消去できる。残るのは雑音 $\varepsilon$ なので、その二乗長の期待値を各座標の分散の和に展開する。独立性はこの式自体には不要で、共分散の対角成分が使われる。

<!-- proof-start -->
### 証明

[任意応答の補間と行フルランクの同値性](#thm-slt2-01-full-row-rank)により、各応答 $Y$ への補間が可能である。実際に補間するという推定量の仮定から

$$
X\widehat\beta(Y)-X\beta^\star
=Y-X\beta^\star=\varepsilon
$$

がほとんど確実に成り立つ。したがって期待値の中身は $n^{-1}\sum_{i=1}^n\varepsilon_i^2$。各成分の平均が0で分散が $\sigma^2$ だから $\mathbb E\varepsilon_i^2=\sigma^2$ であり、

$$
\mathbb E_\varepsilon\frac1n\sum_{i=1}^n\varepsilon_i^2
=\frac1n\sum_{i=1}^n\sigma^2=\sigma^2.
$$

一方、$Y-X\widehat\beta(Y)=0$ がほとんど確実なので訓練残差は零である。$\square$
<!-- proof-end -->

例えば $\sigma^2=4$ なら、どのような完全補間解を選んでも真の**訓練点信号**への平均二乗誤差の期待値は4となる。これは、補間が雑音も含めて再現することの代数的帰結である。

さらに固定した $X$ の核に $z\ne0$ があれば、$\beta^\star$ と $\beta^\star+z$ の信号は共に $X\beta^\star$ になる。同じ雑音分布を加えれば $Y$ の確率分布も等しい。しかし行空間外の特徴 $x$ については $x^{\mathsf T}\beta^\star$ と $x^{\mathsf T}(\beta^\star+z)$ が違い得る。これは**固定設計からの係数・標本外予測の非識別性**であり、ランダム設計全体から新しい特徴を観測する問題と区別する。

## 4. どこまで言えて、どこから言えないか

| 確認する問い | 行列から言えること | 追加情報が要ること |
|---|---|---|
| 与えた $y$ を補間できるか | $y\in\operatorname{Im}X$ のとき、かつそのときのみ可能 | なし |
| 全ての $y$ を補間できるか | $\operatorname{rank}X=n$ と同値 | $p>n$ だけでは不十分 |
| 係数は一意か | 補間解は $\beta_0+\ker X$、自由度は $p-\operatorname{rank}X$ | 一意解を選ぶための規則 |
| 新しい $x$ の予測は一意か | $x\in\operatorname{row}(X)$ と同値 | 行空間外なら解の選択 |
| 真の信号・未知分布への予測は正確か | 補間等式だけでは保証しない | 雑音・設計分布・選択算法・評価損失の仮定 |

前半の結果は確率分布を仮定しない有限次元の恒等式である。一方、訓練誤差から母集団での予測性能へ進むには、[汎化保証の適用条件](../SLT1-18/index.md#thm-slt1-18-fixed-menu)のように評価する量と確率様式を明示する必要がある。ただし本章の補間係数集合は連続・非有界で、同リンクの有界損失・固定有限クラスの界をそのまま当てはめることはできない。

## 演習

**問題 SLT2-01-A01（行フルランクと補間解）**
- Level: A

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}\in\mathbb R^{2\times3}$、$y=(3,-1)^{\mathsf T}$ とする。階数、核の次元、全補間解を求めよ。

<!-- solution-start -->
**詳細解答**。最初の2列が単位行列の列なので行は独立で、$\operatorname{rank}X=2=n$。[階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)より $\dim\ker X=3-2=1$。方程式は $\beta_1+\beta_3=3$、$\beta_2+\beta_3=-1$。$t=\beta_3$ とおけば

$$
\beta(t)=(3-t,-1-t,t)^{\mathsf T},
\qquad t\in\mathbb R.
$$

これを代入すると $X\beta(t)=(3,-1)^{\mathsf T}=y$ となり、$t$ の取り方に制限はない。差は $t(-1,-1,1)^{\mathsf T}\in\ker X$ である。
<!-- solution-end -->

**問題 SLT2-01-A02（過剰でも補間不能）**
- Level: A

$X=\begin{pmatrix}1&0&1\\2&0&2\end{pmatrix}$ に対し、$y=(1,0)^{\mathsf T}$ と $y'=(1,2)^{\mathsf T}$ の補間可否をそれぞれ判定せよ。$p>n$ と階数を比較せよ。

<!-- solution-start -->
**詳細解答**。任意の係数 $\beta$ について $X\beta=(a,2a)^{\mathsf T}$（$a=\beta_1+\beta_3$）。$y$ なら $a=1$ と $2a=0$ が矛盾するので補間不能。一方 $y'$ なら $a=1$ を選べばよく、例えば $\beta=(1,0,0)^{\mathsf T}$ で補間できる。2行目は1行目の2倍で、零でない行が一つあるため $\operatorname{rank}X=1<2=n$。$p=3>2$ でも[任意応答の補間定理](#thm-slt2-01-full-row-rank)の条件を満たさない。
<!-- solution-end -->

**問題 SLT2-01-A03（行空間と核の直交）**
- Level: A

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$ とする。$v=(-1,-1,1)^{\mathsf T}$ が核に属することを各行との内積で確かめ、$\operatorname{row}(X)$ の次元と直交補空間との関係を示せ。

<!-- solution-start -->
**詳細解答**。第1行と $v$ の内積は $-1+1=0$、第2行との内積も $-1+1=0$。よって $Xv=0$。2行は独立だから行空間の次元は2。核の次元は $3-2=1$ で $v\ne0$ が生成する。行空間は $v^\perp$ に含まれ、両者の次元は2なので等しい。したがって $\operatorname{row}(X)=(\ker X)^\perp$ である。
<!-- solution-end -->

**問題 SLT2-01-A04（雑音の訓練信号誤差）**
- Level: A

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$、真の係数 $\beta^\star=0$、観測雑音 $\varepsilon=(1,-2)^{\mathsf T}$、応答 $y=X\beta^\star+\varepsilon$ とする。補間係数を一つ示し、観測応答への平均二乗残差と真の訓練信号への平均二乗誤差をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**。$y=(1,-2)^{\mathsf T}$ で、$\widehat\beta=(1,-2,0)^{\mathsf T}$ とすれば $X\widehat\beta=y$。したがって観測応答への残差は $y-X\widehat\beta=0$、二乗残差の平均も0。真の訓練信号は $X\beta^\star=0$ なので差は $(1,-2)^{\mathsf T}$。その二乗長を2件で割れば

$$
\frac12\|X\widehat\beta-X\beta^\star\|_2^2
=\frac12(1^2+(-2)^2)=\frac52.
$$

学習に用いた観測値との差と、雑音を除いた信号との差を取り違えない。
<!-- solution-end -->

**問題 SLT2-01-A05（未知点で一意な予測）**
- Level: A

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$、$y=(1,2)^{\mathsf T}$ とする。全補間解 $\beta(t)=(1-t,2-t,t)^{\mathsf T}$ に対し、$x_a=(1,1,2)^{\mathsf T}$ と $x_b=(0,0,1)^{\mathsf T}$ での予測を求め、一意性を判定せよ。

<!-- solution-start -->
**詳細解答**。行 $r_1,r_2$ の和が $x_a$ なので $x_a\in\operatorname{row}(X)$。[行空間による予測一意性](#thm-slt2-01-row-null-prediction)の条件を満たし、

$$
x_a^{\mathsf T}\beta(t)=(1-t)+(2-t)+2t=3.
$$

対して $x_b$ は核を張るベクトル $(-1,-1,1)^{\mathsf T}$ との内積が1で、行空間にない。実際 $x_b^{\mathsf T}\beta(t)=t$ は $t$ で変わる。
<!-- solution-end -->

**問題 SLT2-01-B01（補間できない場合の直交射影）**
- Level: B

$X=\begin{pmatrix}1&0&1\\2&0&2\end{pmatrix}$、$y=(1,0)^{\mathsf T}$ とする。$\operatorname{Im}X$ 上で $y$ に最も近い適合値、全ての最小二乗係数、平均二乗損失 $\|y-X\beta\|_2^2/(2n)$（$n=2$）の最小値を求めよ。

<!-- solution-start -->
**詳細解答**。像は $u=(1,2)^{\mathsf T}$ の張る直線で、予測は $au$（$a=\beta_1+\beta_3$）に限られる。[最小二乗解の存在と適合値の一意性](../../ML/ML1-04/index.md#thm-ml1-04-existence-fit-uniqueness)を使うため $u\ne0$ を確認する。最小化するのは

$$
\|y-au\|_2^2=(1-a)^2+(0-2a)^2
=1-2a+5a^2.
$$

微分すると $-2+10a=0$ なので $a=1/5$。従って適合値と残差は

$$
\widehat y=\frac15(1,2)^{\mathsf T},
\quad y-\widehat y=(4/5,-2/5)^{\mathsf T},
\quad \|y-\widehat y\|_2^2=\frac{16+4}{25}=\frac45.
$$

全ての最小二乗係数は $\beta_1+\beta_3=1/5$、$\beta_2$ 自由であり、$\beta=(1/5-t,s,t)^{\mathsf T}$（$s,t\in\mathbb R$）。目的関数の最小値は $(4/5)/(2\cdot2)=1/5$。補間不能でも適合値は一意である。
<!-- solution-end -->

**問題 SLT2-01-B02（任意応答と予測可能な方向）**
- Level: B

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$ とする。任意の $y=(a,b)^{\mathsf T}$ の全補間解を求める。さらに任意の新規特徴 $x=(u,v,w)^{\mathsf T}$ における予測が補間解の選択によらず一定になるための必要十分条件と、そのときの予測値を求めよ。

<!-- solution-start -->
**詳細解答**。先頭2列が独立なので行フルランクであり、全ての $(a,b)$ を補間できる。方程式は $\beta_1+\beta_3=a$、$\beta_2+\beta_3=b$。従って

$$
\beta(t)=(a-t,b-t,t)^{\mathsf T},
\qquad
x^{\mathsf T}\beta(t)=ua+vb+t(w-u-v).
$$

この式が全ての $t\in\mathbb R$ で同一になるための必要十分条件は $w=u+v$。条件が成り立つときの予測は $ua+vb$ である。実際 $x=u(1,0,1)^{\mathsf T}+v(0,1,1)^{\mathsf T}$ と表せるから $x\in\operatorname{row}(X)$ であり、[行空間定理](#thm-slt2-01-row-null-prediction)とも一致する。
<!-- solution-end -->

**問題 SLT2-01-B03（固定設計Gaussian雑音）**
- Level: B

非確率的な行フルランク行列 $X\in\mathbb R^{n\times p}$ と固定係数 $\beta^\star$ に対し、$Y=X\beta^\star+\varepsilon$、$\varepsilon\sim N(0,4I_n)$ とする。$X\widehat\beta(Y)=Y$ を満たす任意の可測な推定量について、訓練残差の平均二乗、真の訓練信号への誤差の期待値を求めよ。係数誤差や未知入力でのリスクもこの条件だけで決まるか。

<!-- solution-start -->
**詳細解答**。補間等式により $Y-X\widehat\beta=0$ なので観測応答への平均二乗残差は0。信号との差は $X\widehat\beta-X\beta^\star=\varepsilon$ だから

$$
\mathbb E\frac1n\|X\widehat\beta-X\beta^\star\|_2^2
=\frac1n\sum_{i=1}^n\mathbb E\varepsilon_i^2
=\frac1n\cdot n\cdot4=4.
$$

Gaussian分布の各成分は平均0・分散4であり、[雑音補間命題](#prop-slt2-01-noise-interpolation)の条件を満たす。$p>n$ の場合、$\ker X$ に非零方向があるため、補間解へ任意の核成分を加えても信号への訓練誤差は変わらず、係数誤差や行空間外の予測は任意に変わり得る。従って後二者は一意に決まらない。
<!-- solution-end -->

**問題 SLT2-01-B04（データだけからの予測の限界）**
- Level: B

$X=\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix}$ とし、雑音のない応答 $y=(1,2)^{\mathsf T}$ を観測した。候補の真の係数を $\beta^{(0)}=(1,2,0)^{\mathsf T}$、$\beta^{(1)}=(0,1,1)^{\mathsf T}$ とする。両候補の訓練値を比較し、新規特徴 $x=(0,0,1)^{\mathsf T}$ に対して $(X,y)$ だけから一つの実数 $a$ を予測する任意の決定的算法が、両候補で同時に二乗誤差を $1/4$ 未満にできないことを示せ。

<!-- solution-start -->
**詳細解答**。直接掛ければ $X\beta^{(0)}=(1,2)^{\mathsf T}=X\beta^{(1)}$ なので、観測される $(X,y)$ は両方で同一である。一方、新規特徴では $x^{\mathsf T}\beta^{(0)}=0$、$x^{\mathsf T}\beta^{(1)}=1$。同じ入力を受けた決定的算法は同じ実数 $a$ を出す。もし $a^2<1/4$ と $(a-1)^2<1/4$ が同時に成り立てば、$|a|<1/2$ かつ $|a-1|<1/2$ であり、三角不等式より

$$
1=|1-0|\le |1-a|+|a-0|<1
$$

となって矛盾する。よって $\max\{a^2,(a-1)^2\}\ge1/4$。失われたのは観測同値な係数を区別する情報で、訓練データの個数を数えるだけではこの違いを回復できない。
<!-- solution-end -->

**問題 SLT2-01-C01（階数・補間・外挿を統合する）**
- Level: C

3件・4特徴の固定設計と2つの応答を考える。

$$
X=\begin{pmatrix}
1&0&0&1\\
0&1&0&1\\
1&1&0&2
\end{pmatrix},
\qquad
y=(1,2,3)^{\mathsf T},
\qquad
y'=(1,2,4)^{\mathsf T}.
$$

1. $X$ の階数と核の基底・次元を求め、$p>n$ であるのに任意の応答を補間できない理由を説明せよ。
2. $y$ の全補間解を求めよ。新規特徴 $x_a=(1,-1,0,0)^{\mathsf T}$、$x_b=(0,0,1,0)^{\mathsf T}$ での予測が一意か判定し、値または自由度を示せ。
3. $y'$ を補間できるか判定し、最小二乗の適合値と最小目的関数 $\|y'-X\beta\|_2^2/(2n)$ を求めよ。
4. $y'=y+(0,0,1)^{\mathsf T}$ を真の訓練信号に加わった雑音と読む場合、訓練値を完全には再現できない幾何学的理由を述べよ。

<!-- solution-start -->
**詳細解答**。

**1.** 第3行は第1行と第2行の和であり、最初の2行は独立なので $\operatorname{rank}X=2<3=n$。$Xz=0$ の条件は $z_1+z_4=0$、$z_2+z_4=0$（第3式は両者の和）だから、$s=z_3,t=z_4$ とおくと

$$
z=(-t,-t,s,t)^{\mathsf T}
=s(0,0,1,0)^{\mathsf T}+t(-1,-1,0,1)^{\mathsf T}.
$$

この二つのベクトルは一次独立で、核は2次元。[階数・退化次数公式](../../../基礎科目/F0/F0-00F/index.md#thm-f0-00f-01)の $4-2=2$ と一致する。$p=4>3$ だが行フルランクではないので全応答への補間はできない。

**2.** $\beta_0=(1,2,0,0)^{\mathsf T}$ は $X\beta_0=y$ を満たす。全解は

$$
\beta(s,t)=(1-t,2-t,s,t)^{\mathsf T},
\qquad s,t\in\mathbb R.
$$

$x_a$ は第1行から第2行を引いた特徴ベクトルだから行空間内で、

$$
x_a^{\mathsf T}\beta(s,t)=(1-t)-(2-t)=-1
$$

と一定である。一方 $x_b$ は核の基底 $(0,0,1,0)^{\mathsf T}$ そのものなので行空間に属さず、$x_b^{\mathsf T}\beta(s,t)=s$ は自由に変わる。

**3.** $X\beta$ の第3成分は必ず第1・第2成分の和である。$y'$ では $4\ne1+2$ だから補間不能。像は平面 $z_3=z_1+z_2$ で、法線を $v=(-1,-1,1)^{\mathsf T}$ とする。$\|v\|_2^2=3$、$v^{\mathsf T}y'=-1-2+4=1$ なので[直交射影定理](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-nearest-point)の適用により

$$
\widehat y=y'-\frac{v^{\mathsf T}y'}{v^{\mathsf T}v}v
=\begin{pmatrix}1\\2\\4\end{pmatrix}
-\frac13\begin{pmatrix}-1\\-1\\1\end{pmatrix}
=\begin{pmatrix}4/3\\7/3\\11/3\end{pmatrix}.
$$

残差は $y'-\widehat y=(-1/3,-1/3,1/3)^{\mathsf T}$ であり、

$$
\|y'-\widehat y\|_2^2=\frac19+\frac19+\frac19=\frac13,
\qquad
\min_\beta\frac{\|y'-X\beta\|_2^2}{2\cdot3}=\frac1{18}.
$$

例えば $\beta=(4/3,7/3,0,0)^{\mathsf T}$ がこの適合値を生むので、射影点は実現可能である。

**4.** 雑音 $e=(0,0,1)^{\mathsf T}$ は像に属さず、法線との内積 $v^{\mathsf T}e=1$ を持つ。このため $y+e$ は像の平面から外れる。任意の係数でも $X\beta$ は像にとどまるので、雑音の法線成分は補間で消せない。[雑音補間命題](#prop-slt2-01-noise-interpolation)は**行フルランク**を仮定しており、ここへは適用できない。
<!-- solution-end -->

## まとめ

- $p>n$ は係数の自由度を示すだけであり、**全ての応答を補間できる条件は $\operatorname{rank}X=n$** である。
- 補間係数の自由度は核にあり、行空間と核は直交する。行空間内の特徴に対する予測だけが、解の選択に依存しない。
- 訓練残差ゼロでも固定設計の雑音を再現している場合がある。信号に対する誤差と母集団での汎化リスクは別の量である。
- 次章では、無数の補間解から最小ノルムや勾配流がどの解を選ぶのかを調べる。
