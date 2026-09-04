# 補足：ネイマン・ピアソン補題から最強力・一様最強力・一様最強力不偏検定へ

このページでは、ネイマン・ピアソン補題を出発点にして、

- 最強力検定（Most Powerful test）
- 一様最強力検定（Uniformly Most Powerful test）
- 一様最強力不偏検定（Uniformly Most Powerful Unbiased test）

の違いを、**正規分布の母平均の検定**を軸に一本の流れとして整理する。

先に結論だけ書くと、

$$
\text{特定の1点の対立仮説に対して最強}
\Longrightarrow
\text{最強力検定}
$$

$$
\text{対立仮説の全ての母数値で同じ検定が最強}
\Longrightarrow
\text{一様最強力検定}
$$

$$
\text{両側問題では一様最強力検定が通常存在しない}
\Longrightarrow
\text{不偏検定に候補を絞る}
\Longrightarrow
\text{一様最強力不偏検定}
$$

という関係である。

> 指数分布で単調尤度比から一様最強力検定を構成する演習は [Core 03 ネイマン・ピアソン・単調尤度比・一様最強力検定](#/statistical-mathematics/core/63_neyman_pearson_ump) を参照。

---

## 1. まず検出力関数と水準を確認する

検定関数を

$$
\varphi(x)\in[0,1]
$$

とする。

通常の非ランダム検定では

$$
\varphi(x)=
\begin{cases}
1,&H_0\text{ を棄却する},\\
0,&H_0\text{ を棄却しない}
\end{cases}
$$

である。

$0<\varphi(x)<1$ を許すのは、離散分布などで境界上だけ確率的に棄却し、有意水準をちょうど合わせるためである。

母数を $\theta$ とすると、検出力関数は

$$
\boxed{
\beta_\varphi(\theta)
=E_\theta[\varphi(X)]
=P_\theta(H_0\text{ を棄却})
}
$$

である。

つまり、真の母数が $\theta$ であるとき、その検定がどの程度の確率で帰無仮説を棄却するかを表す。

帰無仮説

$$
H_0:\theta\in\Theta_0
$$

に対する水準 $\alpha$ の検定とは

$$
\boxed{
\sup_{\theta\in\Theta_0}\beta_\varphi(\theta)\le\alpha
}
$$

を満たす検定である。

特に帰無仮説が単純仮説

$$
H_0:\theta=\theta_0
$$

なら

$$
\beta_\varphi(\theta_0)\le\alpha
$$

を確認すればよい。

---

## 2. 4つの言葉を先に分ける

### 2.1 最強力検定

単純仮説

$$
H_0:\theta=\theta_0
\qquad\text{対}\qquad
H_1:\theta=\theta_1
$$

を考える。

水準 $\alpha$ の検定 $\varphi^*$ が**最強力検定**であるとは、任意の水準 $\alpha$ の検定 $\varphi$ に対して

$$
\boxed{
\beta_{\varphi^*}(\theta_1)
\ge
\beta_\varphi(\theta_1)
}
$$

が成り立つことである。

ここで最大化しているのは、**固定した1つの対立点 $\theta_1$ における検出力**である。

### 2.2 一様最強力検定

対立仮説が

$$
H_1:\theta\in\Theta_1
$$

という複合仮説なら、水準 $\alpha$ の検定 $\varphi^*$ が**一様最強力検定**であるとは、任意の水準 $\alpha$ の検定 $\varphi$ に対して

$$
\boxed{
\beta_{\varphi^*}(\theta)
\ge
\beta_\varphi(\theta)
\qquad
(\forall\theta\in\Theta_1)
}
$$

が成り立つことである。

「一様」とは、対立仮説に含まれる**全ての母数値にわたって同じ検定が最強**という意味である。

### 2.3 不偏検定

水準 $\alpha$ の検定が**不偏**であるとは、対立仮説の全ての点で

$$
\boxed{
\beta_\varphi(\theta)\ge\alpha
\qquad
(\theta\in\Theta_1)
}
$$

を満たすことをいう。

点帰無仮説で、ちょうど

$$
\beta(\theta_0)=\alpha
$$

なら、不偏性は

$$
\beta(\theta)\ge\beta(\theta_0)
\qquad(\theta\ne\theta_0)
$$

を要求していることになる。

つまり、帰無点 $\theta_0$ が検出力関数の谷底になることを要求する。

これは推定量の不偏性

$$
E_\theta[\widehat\theta]=\theta
$$

とは別の概念である。

### 2.4 一様最強力不偏検定

水準 $\alpha$ の**不偏検定だけ**を候補とし、その中で対立仮説の全ての点に対して検出力を最大にする検定を**一様最強力不偏検定**という。

すなわち

$$
\boxed{
\text{一様最強力不偏検定}
=
\text{不偏検定という制約の中で一様に最強な検定}
}
$$

である。

「全ての水準 $\alpha$ の検定の中で最強」という意味ではない点に注意する。

---

# 3. ネイマン・ピアソン補題

<a id="lem-statmath-core63a-neyman-pearson"></a>

<!-- formal-statement-start -->
> **補題（ネイマン・ピアソン補題）**  
> 観測 $X$ の確率密度関数または確率質量関数を $f(x;\theta)$ とし、単純仮説 $H_0:\theta=\theta_0$ 対 $H_1:\theta=\theta_1$ を考えます。ある $k\ge0$ と、必要なら $0\le\gamma\le1$ を選び、

$$
\varphi^*(x)=
\begin{cases}
1,&f(x;\theta_1)>k f(x;\theta_0),\\
\gamma,&f(x;\theta_1)=k f(x;\theta_0),\\
0,&f(x;\theta_1)<k f(x;\theta_0)
\end{cases}
$$

> が $E_{\theta_0}[\varphi^*(X)]=\alpha$ を満たすようにします。このとき $\varphi^*$ は、水準 $\alpha$ の検定の中で $H_1:\theta=\theta_1$ に対する最強力検定です。
<!-- formal-statement-end -->

## 3.1 ステートメント

観測 $X$ の確率密度関数または確率質量関数を $f(x;\theta)$ とする。

単純仮説

$$
H_0:\theta=\theta_0
\qquad\text{対}\qquad
H_1:\theta=\theta_1
$$

を考える。

ある定数 $k\ge0$ と、必要なら $0\le\gamma\le1$ を選び、

$$
\varphi^*(x)=
\begin{cases}
1,&f(x;\theta_1)>k f(x;\theta_0),\\
\gamma,&f(x;\theta_1)=k f(x;\theta_0),\\
0,&f(x;\theta_1)<k f(x;\theta_0)
\end{cases}
$$

が

$$
E_{\theta_0}[\varphi^*(X)]=\alpha
$$

を満たすように $k,\gamma$ を定める。

このとき $\varphi^*$ は、水準 $\alpha$ の検定の中で

$$
H_1:\theta=\theta_1
$$

に対する**最強力検定**である。

尤度比で書けば、

$$
\boxed{
\frac{f(x;\theta_1)}{f(x;\theta_0)}>k
\quad\Longrightarrow\quad
H_0\text{ を棄却}
}
$$

という形になる。

連続分布では境界

$$
f(x;\theta_1)=k f(x;\theta_0)
$$

が起こる確率が0になることが多いため、通常は境界上のランダム化を意識しなくてよい。

---

## 3.2 尤度比が大きいところから棄却する理由

$$
\frac{f(x;\theta_1)}{f(x;\theta_0)}
$$

が大きいとは、同じ観測値 $x$ が

$$
H_0
$$

の下よりも

$$
H_1
$$

の下で相対的に起こりやすいことを意味する。

水準 $\alpha$ という制約があるので、帰無仮説の下で棄却する確率を好きなだけ増やすことはできない。

そこで、限られた「棄却域の予算」を、対立仮説に最も有利な標本点から使う。

これがネイマン・ピアソン補題の直感である。

---

## 3.3 ネイマン・ピアソン補題の証明

$\varphi^*$ を上で構成した検定とし、$\varphi$ を任意の水準 $\alpha$ の検定とする。

$\varphi^*$ の定義から、各 $x$ について

$$
\boxed{
\{\varphi^*(x)-\varphi(x)\}
\{f(x;\theta_1)-k f(x;\theta_0)\}
\ge0
}
$$

が成り立つ。

ここが証明の核心である。

### 場合1：$f(x;\theta_1)>k f(x;\theta_0)$

このとき

$$
\varphi^*(x)=1.
$$

任意の検定関数は $0\le\varphi(x)\le1$ なので

$$
\varphi^*(x)-\varphi(x)\ge0.
$$

また

$$
f(x;\theta_1)-k f(x;\theta_0)>0.
$$

従って積は0以上である。

### 場合2：$f(x;\theta_1)<k f(x;\theta_0)$

このとき

$$
\varphi^*(x)=0.
$$

従って

$$
\varphi^*(x)-\varphi(x)\le0.
$$

一方

$$
f(x;\theta_1)-k f(x;\theta_0)<0.
$$

負と負の積なので、やはり0以上である。

### 場合3：$f(x;\theta_1)=k f(x;\theta_0)$

第2因子が0なので積も0である。

従って全ての $x$ について

$$
\{\varphi^*-\varphi\}(f_1-kf_0)\ge0
$$

である。ただし

$$
f_0=f(x;\theta_0),
\qquad
f_1=f(x;\theta_1)
$$

と略記した。

両辺を $x$ について積分すると

$$
\int
(\varphi^*-\varphi)
(f_1-kf_0)\,dx
\ge0.
$$

展開して

$$
\int(\varphi^*-\varphi)f_1\,dx
-k
\int(\varphi^*-\varphi)f_0\,dx
\ge0.
$$

期待値で書けば

$$
E_{\theta_1}[\varphi^*]
-E_{\theta_1}[\varphi]
\ge
k\left(
E_{\theta_0}[\varphi^*]
-E_{\theta_0}[\varphi]
\right).
$$

$\varphi^*$ はちょうど水準 $\alpha$ になるように作ったので

$$
E_{\theta_0}[\varphi^*]=\alpha.
$$

一方、$\varphi$ は任意の水準 $\alpha$ の検定だから

$$
E_{\theta_0}[\varphi]\le\alpha.
$$

従って

$$
E_{\theta_0}[\varphi^*]
-E_{\theta_0}[\varphi]
\ge0.
$$

さらに $k\ge0$ なので

$$
E_{\theta_1}[\varphi^*]
-E_{\theta_1}[\varphi]
\ge0.
$$

すなわち

$$
\boxed{
\beta_{\varphi^*}(\theta_1)
\ge
\beta_\varphi(\theta_1)
}
$$

である。

よって $\varphi^*$ は最強力検定である。

> **証明で覚えるべき1行**  
$$
(\varphi^*-\varphi)(f_1-kf_0)\ge0
$$
> を作って積分する。この1行の符号の意味が分かれば、ネイマン・ピアソン補題の証明全体を追いやすい。

---

# 4. 正規分布で最強力検定を作る

## 4.1 問題設定

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2)
$$

とし、$\sigma^2$ は既知とする。

まず

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu=\mu_1,
\qquad
\mu_1>\mu_0
$$

という単純仮説対単純仮説を考える。

直感的には、対立仮説では平均が大きいので

$$
\bar X
$$

が大きいほど対立仮説らしい。

これをネイマン・ピアソン補題で厳密に確認する。

---

## 4.2 尤度比を計算する

尤度は

$$
L(\mu;x)
=(2\pi\sigma^2)^{-n/2}
\exp\left\{
-\frac{1}{2\sigma^2}
\sum_{i=1}^n(x_i-\mu)^2
\right\}.
$$

対数尤度比を取ると

$$
\log\frac{L(\mu_1;x)}{L(\mu_0;x)}
=
-\frac{1}{2\sigma^2}
\left[
\sum_{i=1}^n(x_i-\mu_1)^2
-
\sum_{i=1}^n(x_i-\mu_0)^2
\right].
$$

各項について

$$
(x_i-\mu_1)^2-(x_i-\mu_0)^2
=
-2(\mu_1-\mu_0)x_i
+(\mu_1^2-\mu_0^2).
$$

従って

$$
\begin{aligned}
\log\frac{L(\mu_1;x)}{L(\mu_0;x)}
&=
\frac{\mu_1-\mu_0}{\sigma^2}
\sum_{i=1}^n x_i
-
\frac{n(\mu_1^2-\mu_0^2)}{2\sigma^2}\\
&=
\frac{n(\mu_1-\mu_0)}{\sigma^2}\bar x
-
\frac{n(\mu_1^2-\mu_0^2)}{2\sigma^2}.
\end{aligned}
$$

$\mu_1>\mu_0$ だから

$$
\frac{n(\mu_1-\mu_0)}{\sigma^2}>0.
$$

よって尤度比は $\bar x$ の増加関数である。

ネイマン・ピアソン補題から

$$
\boxed{
\bar X>c
}
$$

という形の検定が最強力になる。

---

## 4.3 有意水準から臨界値を決める

$H_0$ の下で

$$
\bar X\sim N\left(\mu_0,\frac{\sigma^2}{n}\right).
$$

従って

$$
Z=
\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
\sim N(0,1).
$$

$z_{1-\alpha}$ を標準正規分布の $1-\alpha$ 分位点とすると

$$
P_{\mu_0}(Z>z_{1-\alpha})=\alpha.
$$

したがって棄却域は

$$
\boxed{
Z>z_{1-\alpha}
}
$$

すなわち

$$
\boxed{
\bar X>
\mu_0+
\frac{\sigma}{\sqrt n}z_{1-\alpha}
}
$$

である。

これは

$$
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu=\mu_1>\mu_0
$$

に対する水準 $\alpha$ の最強力検定である。

---

## 4.4 検出力も確認する

一般の $\mu$ の下では

$$
Z
\sim
N\left(
\frac{\sqrt n(\mu-\mu_0)}{\sigma},
1
\right).
$$

従って

$$
\begin{aligned}
\beta(\mu)
&=P_\mu(Z>z_{1-\alpha})\\
&=1-\Phi\left(
z_{1-\alpha}
-
\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right).
\end{aligned}
$$

したがって

$$
\boxed{
\beta(\mu)
=
1-\Phi\left(
z_{1-\alpha}
-
\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right)
}
$$

であり、$\mu$ が大きくなるほど検出力も大きくなる。

---

# 5. 最強力検定から一様最強力検定へ

今度は

$$
H_0:\mu\le\mu_0
\qquad\text{対}\qquad
H_1:\mu>\mu_0
$$

を考える。

対立仮説から任意の1点

$$
\mu_1>\mu_0
$$

を固定する。

前節のネイマン・ピアソン補題から、

$$
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu=\mu_1
$$

に対する最強力検定は

$$
Z>z_{1-\alpha}
$$

である。

ここで重要なのは、この棄却域が**具体的な $\mu_1$ の値に依存しない**ことである。

例えば

$$
\mu_1=\mu_0+0.1,
\qquad
\mu_1=\mu_0+1,
\qquad
\mu_1=\mu_0+10
$$

のどれを選んでも同じ棄却域が最強力になる。

したがって、同じ1つの検定が全ての

$$
\mu_1>\mu_0
$$

に対して最強力である。

さらに棄却確率は $\mu$ とともに増加するので

$$
\sup_{\mu\le\mu_0}
P_\mu(Z>z_{1-\alpha})
=
P_{\mu_0}(Z>z_{1-\alpha})
=
\alpha.
$$

よって

$$
\boxed{
Z>z_{1-\alpha}
}
$$

は

$$
H_0:\mu\le\mu_0
\qquad\text{対}\qquad
H_1:\mu>\mu_0
$$

に対する**一様最強力検定**である。

---

## 5.1 単調尤度比との関係

$\mu_1>\mu_0$ のどの点を選んでも

$$
\frac{L(\mu_1;x)}{L(\mu_0;x)}
$$

が $\bar X$ の同じ向きの増加関数になる。

つまり、正規分布の既知分散モデルは $\bar X$ に関して単調尤度比を持つ。

この

> ネイマン・ピアソン補題を各対立点に適用しても、最強力な棄却域の向きが変わらない

という構造を一般化したものが Karlin–Rubin の定理である。

本題の指数分布の一様最強力検定も同じ構造になっている。

---

# 6. なぜ両側検定では一様最強力検定がなくなるのか

今度は

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu\ne\mu_0
$$

を考える。

対立仮説には

$$
\mu>\mu_0
$$

と

$$
\mu<\mu_0
$$

の両方が含まれる。

### $\mu_1>\mu_0$ を固定した場合

ネイマン・ピアソン補題による最強力検定は

$$
Z>z_{1-\alpha}
$$

という**上側だけ**の棄却域になる。

### $\mu_1<\mu_0$ を固定した場合

今度は尤度比が $\bar X$ の減少関数になるため、最強力検定は

$$
Z<z_\alpha
$$

という**下側だけ**の棄却域になる。

したがって、正方向の対立に最強な検定と、負方向の対立に最強な検定が一致しない。

1つの検定が同時に

$$
\mu>\mu_0
$$

の全ての点でも

$$
\mu<\mu_0
$$

の全ての点でも最強になることはできない。

よって通常の両側問題

$$
\boxed{
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu\ne\mu_0
}
$$

に対する一様最強力検定は存在しない。

そこで、両側問題では「どのような検定まで候補にするか」を制限する。その代表的な制約が**不偏性**である。

---

# 7. 正規平均の両側検定と一様最強力不偏性

## 7.1 分散既知の場合

再び

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2),
\qquad
\sigma^2\text{ は既知}
$$

とし、

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu\ne\mu_0
$$

を考える。

通常の両側標準正規検定は

$$
Z=
\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
$$

に対して

$$
\boxed{
|Z|>z_{1-\alpha/2}
}
$$

なら $H_0$ を棄却する。

これは、正規1母数指数型分布族におけるこの両側問題の**一様最強力不偏検定**である。

---

## 7.2 なぜ両側に $\alpha/2$ ずつ置くのか

$H_0$ の下で

$$
Z\sim N(0,1)
$$

だから

$$
P_{\mu_0}
\left(
|Z|>z_{1-\alpha/2}
\right)
=
\frac{\alpha}{2}
+
\frac{\alpha}{2}
=
\alpha.
$$

従って水準はちょうど $\alpha$ である。

さらに棄却域は $\mu_0$ を中心に対称である。

帰無点では

$$
\beta(\mu_0)=\alpha.
$$

一方、$\mu$ が $\mu_0$ から左右どちらに離れても棄却確率は増えるため

$$
\beta(\mu)\ge\alpha
\qquad(\mu\ne\mu_0).
$$

よってこの検定は不偏である。

滑らかな検出力関数なら、$\mu_0$ が検出力の最小点になるためには少なくとも

$$
\boxed{
\beta'(\mu_0)=0
}
$$

が必要である。

正規1母数指数型分布族の一様最強力不偏検定に関する定理では、

1. 水準条件、
2. 不偏性に対応する条件、

を満たす2つの臨界点を持つ検定が最適になる。

正規分布では対称性によってその2点が

$$
-z_{1-\alpha/2},
\qquad
z_{1-\alpha/2}
$$

となる。

したがって

$$
\boxed{
|Z|>z_{1-\alpha/2}
}
$$

が一様最強力不偏検定である。

---

## 7.3 検出力関数で不偏性を確認する

$$
\delta
=
\frac{\sqrt n(\mu-\mu_0)}{\sigma}
$$

とおくと、一般の $\mu$ の下で

$$
Z\sim N(\delta,1).
$$

$c=z_{1-\alpha/2}$ とおけば

$$
\begin{aligned}
\beta(\mu)
&=P_\mu(Z<-c)+P_\mu(Z>c)\\
&=\Phi(-c-\delta)
+1-\Phi(c-\delta).
\end{aligned}
$$

従って

$$
\boxed{
\beta(\mu)
=
\Phi(-c-\delta)
+1-\Phi(c-\delta)
}
$$

である。

$\delta=0$、すなわち $\mu=\mu_0$ では

$$
\beta(\mu_0)=\alpha.
$$

そして $|\delta|$ が大きくなるほど検出力は増加する。

これが「帰無点が検出力の谷底になる」という不偏性の形である。

---

# 8. 分散未知なら Student の t 検定になる

今度は

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2)
$$

で $\sigma^2$ も未知とする。

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu\ne\mu_0
$$

を考える。

標本不偏分散

$$
S^2
=
\frac{1}{n-1}
\sum_{i=1}^n(X_i-\bar X)^2
$$

を用いると

$$
T=
\frac{\sqrt n(\bar X-\mu_0)}{S}
$$

は $H_0$ の下で自由度 $n-1$ の Student の $t$ 分布に従う。

したがって通常の両側 $t$ 検定

$$
\boxed{
|T|>t_{n-1,1-\alpha/2}
}
$$

を用いる。

この通常の両側 $t$ 検定も、正規母集団の平均を分散未知のもとで検定する問題における**一様最強力不偏検定**である。

ただし、分散既知の標準正規検定より証明は一段難しい。

理由は

$$
\sigma^2
$$

が**邪魔母数**として残るからである。

厳密な導出では、正規分布族の十分統計量を用い、帰無仮説の下で邪魔母数に関する完全十分統計量に条件付けて1母数問題へ落とし、その条件付き問題にネイマン・ピアソン型の議論を適用する。

最終的に棄却域が Student の $t$ 統計量だけで表されることが分かる。

統計検定1級では、まず

$$
\boxed{
\text{正規平均の片側検定：一様最強力検定}
}
$$

$$
\boxed{
\text{正規平均の両側検定：一般には一様最強力検定は存在しないが、}
}
$$

$$
\boxed{
\text{通常の両側標準正規検定・両側 }t\text{ 検定は一様最強力不偏検定}
}
$$

という構造を押さえておきたい。

---

# 9. 3種類の最適性を同じ正規分布で比較する

| 概念 | 仮説 | 最適性の意味 | 分散既知での棄却域 |
|---|---|---|---|
| 最強力検定 | $H_0:\mu=\mu_0$ 対 $H_1:\mu=\mu_1>\mu_0$ | 固定した1点 $\mu_1$ で検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力検定 | $H_0:\mu\le\mu_0$ 対 $H_1:\mu>\mu_0$ | 全ての $\mu>\mu_0$ で同じ検定が検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力不偏検定 | $H_0:\mu=\mu_0$ 対 $H_1:\mu\ne\mu_0$ | 不偏検定の中で全ての $\mu\ne\mu_0$ に対し検出力最大 | $|Z|>z_{1-\alpha/2}$ |

最強力検定と一様最強力検定では棄却域の式が同じでも、**主張している最適性の範囲が違う**。

最強力検定は

$$
\mu_1\text{ を1点固定}
$$

した話である。

一様最強力検定は

$$
\mu_1>\mu_0\text{ のどこを選んでも同じ検定が最強}
$$

という、より強い主張である。

一様最強力不偏検定は、両側問題で一様最強力検定が存在しなくなった後に、不偏性という条件を追加して最適性を回復したものである。

---

# 10. 試験での見分け方

## 10.1 単純仮説対単純仮説

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta=\theta_1
$$

なら、まずネイマン・ピアソン補題を疑う。

手順は

1. 尤度比を作る。
2. 尤度比が大きくなる統計量を特定する。
3. $H_0$ の分布から水準 $\alpha$ になる臨界値を決める。

である。

## 10.2 1母数分布族の片側対立

$$
H_0:\theta\le\theta_0,
\qquad
H_1:\theta>\theta_0
$$

などで、尤度比がある統計量 $T$ に関して同じ向きに単調なら

$$
\text{単調尤度比}
\Longrightarrow
\text{Karlin--Rubin の定理}
\Longrightarrow
\text{一様最強力検定}
$$

を考える。

## 10.3 両側対立

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta\ne\theta_0
$$

なら、まず

> 右側の対立に対する最強力検定と左側の対立に対する最強力検定が競合するため、一様最強力検定が存在しないのではないか

と考える。

そのうえで指数型分布族などでは

$$
\text{不偏性}
\Longrightarrow
\text{一様最強力不偏検定}
$$

を検討する。

---

# 11. よくある混同

### 混同1：「ネイマン・ピアソン補題が一様最強力検定を直接与える」

厳密には違う。

ネイマン・ピアソン補題が直接保証するのは

$$
\boxed{
\text{単純仮説対単純仮説の最強力検定}
}
$$

である。

その最強力検定の棄却域が、対立点を動かしても同じ形になるときに一様最強力検定へ進める。

### 混同2：「両側検定なら一様最強力不偏検定」

両側であることだけでは一様最強力不偏性は保証されない。

必要なのは

- 水準条件
- 不偏性
- 不偏検定のクラス内での一様最強力性

である。

正規平均の通常の両側標準正規検定や両側 $t$ 検定では、その条件が満たされるため一様最強力不偏検定になる。

### 混同3：「不偏検定」の不偏は推定量の不偏性と同じ

別概念である。

不偏推定量は

$$
E_\theta[\widehat\theta]=\theta
$$

を意味する。

不偏検定は

$$
\beta(\theta)\ge\alpha
\qquad(\theta\in\Theta_1)
$$

を意味する。

同じ「不偏」という日本語でも、定義している対象が違う。

---

# 12. 本番答案で使える最短まとめ

ネイマン・ピアソン補題は、単純仮説

$$
H_0:\theta=\theta_0
\quad\text{対}\quad
H_1:\theta=\theta_1
$$

に対し、尤度比

$$
\frac{f(x;\theta_1)}{f(x;\theta_0)}
$$

が大きい領域から水準 $\alpha$ まで棄却域に取る検定が最強力であることをいう。

正規母集団 $N(\mu,\sigma^2)$ で $\sigma^2$ が既知なら、$\mu_1>\mu_0$ に対する尤度比は $\bar X$ の増加関数なので

$$
Z=
\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
>z_{1-\alpha}
$$

が最強力検定である。

しかも棄却域は具体的な $\mu_1>\mu_0$ に依存しないため

$$
H_0:\mu\le\mu_0
\quad\text{対}\quad
H_1:\mu>\mu_0
$$

に対して一様最強力である。

一方

$$
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu\ne\mu_0
$$

では、正側と負側の対立に対する最強力棄却域が逆向きになるため、一般に一様最強力検定は存在しない。

不偏検定に限定すると、分散既知では

$$
|Z|>z_{1-\alpha/2}
$$

が一様最強力不偏検定となる。

分散未知では

$$
\left|
\frac{\sqrt n(\bar X-\mu_0)}{S}
\right|
>t_{n-1,1-\alpha/2}
$$

という通常の両側 Student の $t$ 検定が一様最強力不偏検定となる。

---

# 参考

- あつまれ統計の森「最強力検定とネイマン・ピアソンの補題」  
  https://www.hello-statisticians.com/explain-terms-cat/most_powerful_test1
- あつまれ統計の森「指数型分布族における一様最強力不偏検定の解説」  
  https://www.hello-statisticians.com/explain-terms-cat/most_powerful_test2.html
- DataArts「ネイマン・ピアソンの補題」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/neyman_pearson_lemma.html
- DataArts「一様最強力検定」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/uniformly_most_powerful_test.html
- Duke University, STA 732 Statistical Inference, Gaussian mean with unknown variance に対する不偏最適検定の講義資料  
  https://www2.stat.duke.edu/courses/Spring22/sta732.01/lecture21.pdf
