# Core 03 ネイマン・ピアソン・単調尤度比・一様最強力検定

- 旧No.: 63
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: 表

> **先に理論を整理したい場合**  
> ネイマン・ピアソン補題の正確なステートメントと証明、および正規分布の母平均検定を使った**最強力検定・一様最強力検定・一様最強力不偏検定**の違いは、[補足：ネイマン・ピアソン補題から最強力・一様最強力・一様最強力不偏検定へ](#/statistical-mathematics/core/63a_neyman_pearson_mp_ump_umpu)を参照。  
> このページでは、その理論を指数分布の片側検定へ実際に適用する。

## 問題

$X_1,\ldots,X_n$ は独立に指数分布

$$
f(x;\lambda)=\lambda e^{-\lambda x},\qquad x>0,\ \lambda>0
$$

に従うとする。

$$
H_0:\lambda=\lambda_0,
\qquad
H_1:\lambda<\lambda_0
$$

を有意水準 $\alpha$ で検定したい。以下

$$
T=\sum_{i=1}^nX_i
$$

とする。

1. 単純対立 $\lambda=\lambda_1<\lambda_0$ に対するネイマン・ピアソン検定の棄却域を求めよ。
2. 尤度比が $T$ について単調であることを示し、その意味を説明せよ。
3. $H_1:\lambda<\lambda_0$ 全体に対する一様最強力検定を構成せよ。
4. $H_0$ の下での $T$ の分布をモーメント母関数から導き、臨界値を表せ。

## 詳細解答

### 0. まず棄却する向きを予想する

指数分布を率母数 $\lambda$ で表すと

$$
E_\lambda[X_i]=\frac1\lambda.
$$

したがって、対立仮説 $\lambda<\lambda_0$ が正しければ

$$
\lambda\downarrow
\quad\Longrightarrow\quad
E[X_i]\uparrow
$$

であり、観測値は全体として大きくなると予想される。

よって

$$
T=X_1+\cdots+X_n
$$

が大きいときに $H_0$ を棄却する形になりそうだ、とまず見当をつけられる。

以下では、この直感をネイマン・ピアソン補題で厳密に示す。

---

### 1. 単純対立に対するネイマン・ピアソン検定

#### 1.1 なぜ最初に $\lambda_1$ を1点に固定するのか

ネイマン・ピアソン補題が直接扱うのは

$$
H_0:\lambda=\lambda_0
\quad\text{対}\quad
H_1:\lambda=\lambda_1
$$

という**単純仮説対単純仮説**である。

そこで、まず任意の

$$
\lambda_1<\lambda_0
$$

を1つ固定する。

#### 1.2 ネイマン・ピアソン補題を使う

単純仮説対単純仮説では、有意水準 $\alpha$ の検定の中で検出力を最大にするには

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}
$$

が大きい標本ほど棄却域に入れればよい。

すなわち、ある定数 $k$ を用いて

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}\ge k
$$

となる領域を棄却域に取る検定が最強力検定になる。

補題の厳密なステートメント、ランダム化を含む検定関数による表現、および

$$
(\varphi^*-\varphi)(f_1-kf_0)\ge0
$$

を積分する証明は、[補足ページ](#/statistical-mathematics/core/63a_neyman_pearson_mp_ump_umpu)で詳しく扱っている。

直感的には、

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}
$$

は「観測されたデータ $x$ が、帰無仮説より対立仮説の下でどれだけ起こりやすいか」を表す。したがって、この比が大きいデータから順に $H_0$ に不利な証拠として棄却域へ入れる。

#### 1.3 尤度を計算する

独立性より同時確率密度関数は

$$
L(\lambda;x)
=\prod_{i=1}^n\lambda e^{-\lambda x_i}
=\lambda^n\exp\left(-\lambda\sum_{i=1}^n x_i\right)
$$

である。

$T=\sum_iX_i$ と書けば

$$
L(\lambda;x)=\lambda^n e^{-\lambda T}.
$$

したがって尤度比は

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}
=
\left(\frac{\lambda_1}{\lambda_0}\right)^n
\exp\{(\lambda_0-\lambda_1)T\}.
$$

ここで $\lambda_1<\lambda_0$ なので

$$
\lambda_0-\lambda_1>0.
$$

従って尤度比は $T$ が大きいほど大きくなる。

ネイマン・ピアソン補題の棄却条件

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}\ge k
$$

は、ある定数 $c$ を用いて

$$
T\ge c
$$

と同値である。

有意水準を $\alpha$ にするように $c=c_\alpha$ を選べば、

$$
\boxed{T\ge c_\alpha}
$$

が $H_0:\lambda=\lambda_0$ 対 $H_1:\lambda=\lambda_1$ の最強力検定となる。

$c_\alpha$ は

$$
P_{\lambda_0}(T\ge c_\alpha)=\alpha
$$

を満たすように決める。

$T$ は連続分布に従うので、境界上でランダムに棄却する操作は本問では不要である。

---

### 2. 単調尤度比とは何を言っているのか

上では特定の $\lambda_1<\lambda_0$ について

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}
=
C\exp\{(\lambda_0-\lambda_1)T\}
$$

と書け、これが $T$ の増加関数であることを確認した。

より一般に、任意の

$$
\lambda_a<\lambda_b
$$

について考えると

$$
\frac{L(\lambda_a;x)}{L(\lambda_b;x)}
=
\left(\frac{\lambda_a}{\lambda_b}\right)^n
\exp\{(\lambda_b-\lambda_a)T\}.
$$

$\lambda_b-\lambda_a>0$ なので、この比も $T$ の増加関数である。

つまり、この指数分布族では

$$
T\text{ が大きい}
\quad\Longrightarrow\quad
\text{より小さい }\lambda\text{ の方が相対的にもっともらしい}
$$

という順序が、どの2つの母数を比べても崩れない。

この性質を、$T$ に関して**単調尤度比を持つ**という。

平均 $E[X]=1/\lambda$ から考えても

$$
\lambda\text{ が小さい}
\quad\Longleftrightarrow\quad
X_i\text{ が大きくなりやすい}
$$

ので、尤度比の計算結果は直感とも一致する。

---

### 3. なぜ一様最強力検定になるのか

ここが「最強力」と「一様最強力」の違いである。

#### 3.1 まず1つの対立点では最強力

固定した任意の $\lambda_1<\lambda_0$ に対して、1より

$$
T\ge c_\alpha
$$

が最強力検定である。

#### 3.2 $\lambda_1$ を変えても棄却域の形が変わらない

たとえば

$$
\lambda_1=0.9\lambda_0,
\qquad
\lambda_1=0.5\lambda_0,
\qquad
\lambda_1=0.1\lambda_0
$$

のどれを選んでも、尤度比は $T$ の増加関数であり、ネイマン・ピアソン補題から棄却域は

$$
T\ge c_\alpha
$$

となる。

しかも $c_\alpha$ は

$$
P_{\lambda_0}(T\ge c_\alpha)=\alpha
$$

で決めるため、帰無仮説の $\lambda_0$ と有意水準 $\alpha$ によって決まり、対立点 $\lambda_1$ には依存しない。

したがって**同じ1つの検定**

$$
T\ge c_\alpha
$$

が、すべての $\lambda_1<\lambda_0$ に対してそれぞれ最強力である。

よって

$$
\boxed{
T\ge c_\alpha
\text{ は }H_1:\lambda<\lambda_0
\text{ に対する一様最強力検定}
}
$$

となる。

「一様」とは、対立仮説内の**すべての母数値に対して同時に**検出力が最大、という意味である。

正規分布を使って「1点での最強力」と「全ての対立点での一様最強力」を並べて見たい場合は、[補足ページ](#/statistical-mathematics/core/63a_neyman_pearson_mp_ump_umpu)の正規平均の例を参照。

#### 3.3 Karlin–Rubinの定理との関係

単調尤度比を持つ1母数分布族では、片側仮説に対して、単調尤度比を与える統計量の片側領域から一様最強力検定を構成できる。

これがKarlin–Rubinの定理である。

本問では

- $T=\sum_iX_i$ に関して単調尤度比を持つ。
- 対立仮説が $\lambda<\lambda_0$ という片側仮説である。
- 小さい $\lambda$ ほど大きい $T$ が有利になる。

ので、Karlin–Rubinの定理から直接

$$
T\ge c_\alpha
$$

が一様最強力検定と結論してもよい。

ただし本問では、各 $\lambda_1<\lambda_0$ にネイマン・ピアソン補題を適用することで、その中身を直接確認している。

---

### 4. $T$ の帰無分布をモーメント母関数から導く

ここでは

$$
X_i\sim\operatorname{Exp}(\lambda_0)
$$

の和がなぜガンマ分布になるのかを、公式として飛ばさずモーメント母関数から確認する。

#### 4.1 1標本のモーメント母関数

$X_i$ のモーメント母関数は、$t<\lambda_0$ に対して

$$
\begin{aligned}
M_{X_i}(t)
&=E[e^{tX_i}]\\
&=\int_0^\infty e^{tx}\lambda_0e^{-\lambda_0x}\,dx\\
&=\lambda_0\int_0^\infty e^{-(\lambda_0-t)x}\,dx\\
&=\frac{\lambda_0}{\lambda_0-t}.
\end{aligned}
$$

#### 4.2 独立な和のモーメント母関数

$$
T=X_1+\cdots+X_n
$$

なので

$$
\begin{aligned}
M_T(t)
&=E[e^{t(X_1+\cdots+X_n)}]\\
&=E[e^{tX_1}\cdots e^{tX_n}].
\end{aligned}
$$

$X_1,\ldots,X_n$ は独立だから期待値が積に分解でき、

$$
\begin{aligned}
M_T(t)
&=\prod_{i=1}^nE[e^{tX_i}]\\
&=\left(\frac{\lambda_0}{\lambda_0-t}\right)^n.
\end{aligned}
$$

これは形状母数 $n$、率母数 $\lambda_0$ のガンマ分布

$$
\operatorname{Gamma}(n,\text{rate }\lambda_0)
$$

のモーメント母関数である。

したがって

$$
\boxed{
T\sim\operatorname{Gamma}(n,\text{rate }\lambda_0)
}
$$

となる。

> **母数表記の注意**  
> ガンマ分布の第2母数には「率」を使う流儀と「尺度」を使う流儀がある。本教材ではここでは率母数を明記している。尺度母数なら $1/\lambda_0$ である。

#### 4.3 ガンマ分布からカイ二乗分布へ

さらに

$$
Y=2\lambda_0T
$$

とおく。

変数変換した確率密度関数を計算してもよいが、モーメント母関数をそのまま使うと

$$
\begin{aligned}
M_Y(s)
&=E[e^{s(2\lambda_0T)}]\\
&=M_T(2\lambda_0s)\\
&=\left(
\frac{\lambda_0}{\lambda_0-2\lambda_0s}
\right)^n\\
&=(1-2s)^{-n}.
\end{aligned}
$$

自由度 $\nu$ のカイ二乗分布のモーメント母関数は

$$
(1-2s)^{-\nu/2}
$$

であるから、$\nu=2n$ と比較して

$$
\boxed{2\lambda_0T\sim\chi^2_{2n}}
$$

を得る。

したがって

$$
P_{\lambda_0}(T\ge c_\alpha)=\alpha
$$

となる $c_\alpha$ は

$$
P\left(
2\lambda_0T\ge2\lambda_0c_\alpha
\right)=\alpha
$$

を満たす。

$\chi^2_{2n,1-\alpha}$ を自由度 $2n$ のカイ二乗分布の $1-\alpha$ 分位点とすると

$$
2\lambda_0c_\alpha=\chi^2_{2n,1-\alpha}.
$$

よって

$$
\boxed{
c_\alpha=
\frac{\chi^2_{2n,1-\alpha}}{2\lambda_0}
}
$$

であり、棄却域は

$$
\boxed{
2\lambda_0T\ge\chi^2_{2n,1-\alpha}
}
$$

となる。

---

## 全体の論理

本問の流れは次の1本につながっている。

$$
\lambda<\lambda_0
\Longrightarrow
E[X]=1/\lambda\text{ が大きい}
\Longrightarrow
T\text{ が大きい方が対立仮説らしい}
$$

$$
\Downarrow
$$

固定した $\lambda_1<\lambda_0$ について

$$
\frac{L(\lambda_1)}{L(\lambda_0)}
=C\exp\{(\lambda_0-\lambda_1)T\}
$$

は $T$ の増加関数

$$
\Downarrow\quad\text{Neyman--Pearson補題}
$$

$$
T\ge c_\alpha
\text{ が各 }\lambda_1<\lambda_0\text{ に対して最強力}
$$

$$
\Downarrow
$$

同じ $c_\alpha$ がすべての $\lambda_1$ に使える

$$
\Downarrow
$$

$$
\boxed{
T\ge c_\alpha
\text{ が一様最強力検定}
}
$$

最後にモーメント母関数から

$$
T\sim\operatorname{Gamma}(n,\text{rate }\lambda_0),
\qquad
2\lambda_0T\sim\chi^2_{2n}
$$

を導けば臨界値まで具体化できる。

## 本番答案

固定した任意の $\lambda_1<\lambda_0$ について

$$
H_0:\lambda=\lambda_0
\quad\text{対}\quad
H_1:\lambda=\lambda_1
$$

は単純仮説対単純仮説である。尤度は

$$
L(\lambda;x)=\lambda^n e^{-\lambda T},
\qquad
T=\sum_{i=1}^nX_i,
$$

より

$$
\frac{L(\lambda_1;x)}{L(\lambda_0;x)}
=
\left(\frac{\lambda_1}{\lambda_0}\right)^n
\exp\{(\lambda_0-\lambda_1)T\}.
$$

$\lambda_1<\lambda_0$ なのでこれは $T$ の増加関数。ネイマン・ピアソン補題より

$$
T\ge c_\alpha,
\qquad
P_{\lambda_0}(T\ge c_\alpha)=\alpha
$$

が最強力検定である。この棄却域は任意の $\lambda_1<\lambda_0$ に対して同じなので、$H_1:\lambda<\lambda_0$ に対する一様最強力検定である。

また

$$
M_{X_i}(t)=\frac{\lambda_0}{\lambda_0-t}
$$

であり、独立性から

$$
M_T(t)
=\left(\frac{\lambda_0}{\lambda_0-t}\right)^n,
$$

よって

$$
T\sim\operatorname{Gamma}(n,\text{rate }\lambda_0).
$$

さらに

$$
M_{2\lambda_0T}(s)
=(1-2s)^{-n}
$$

なので

$$
2\lambda_0T\sim\chi^2_{2n}.
$$

従って棄却域は

$$
\boxed{
2\lambda_0T\ge\chi^2_{2n,1-\alpha}
}.
$$

## 採点基準

- 尤度を正しく構成する: 3点
- ネイマン・ピアソン補題の適用と尤度比の計算: 4点
- 尤度比が $T$ の増加関数であることを示す: 3点
- 同じ棄却域が全 $\lambda_1<\lambda_0$ で最強力となることから一様最強力性を説明する: 4点
- モーメント母関数から $T$ のガンマ分布を導く: 3点
- $2\lambda_0T\sim\chi^2_{2n}$ と臨界値を得る: 3点
