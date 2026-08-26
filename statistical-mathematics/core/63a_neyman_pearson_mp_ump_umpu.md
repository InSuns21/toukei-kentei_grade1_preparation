# 補足：Neyman–Pearson補題から最強力・一様最強力・一様最強力不偏検定へ

このページでは、Neyman–Pearson補題を出発点にして、

- 最強力検定（Most Powerful; MP）
- 一様最強力検定（Uniformly Most Powerful; UMP）
- 一様最強力不偏検定（Uniformly Most Powerful Unbiased; UMPU）

の違いを、**正規分布の母平均の検定**を軸に整理する。

先に結論だけ言うと、3つの概念は次のようにつながる。

$$
\text{特定の1点の対立仮説に最強}
\quad\Longrightarrow\quad
\text{MP}
$$

$$
\text{対立仮説の全ての母数値で同じ検定が最強}
\quad\Longrightarrow\quad
\text{UMP}
$$

$$
\text{両側検定などで UMP が存在しない}
\quad\Longrightarrow\quad
\text{不偏検定に候補を絞る}
\quad\Longrightarrow\quad
\text{UMPU}
$$

> このページは「なぜその検定が最適なのか」を理解するための補足である。指数分布で単調尤度比から UMP 検定を構成する本題は [Core 03 Neyman–Pearson・単調尤度比・一様最強力検定](#/statistical-mathematics/core/63_neyman_pearson_ump) を参照。

---

## 1. まず検出力関数を確認する

検定関数を

$$
\varphi(x)\in[0,1]
$$

とする。

通常の非ランダム検定なら

$$
\varphi(x)=
\begin{cases}
1,&H_0\text{ を棄却する},\\
0,&H_0\text{ を棄却しない}
\end{cases}
$$

である。

$0<\varphi(x)<1$ を許すのは、離散分布などで有意水準をちょうど $\alpha$ に合わせるために境界上で確率的に棄却する場合である。

母数を $\theta$ とすると、検出力関数は

$$
\boxed{
\beta_\varphi(\theta)
=E_\theta[\varphi(X)]
=P_\theta(H_0\text{ を棄却})
}
$$

である。

つまり、母数が本当は $\theta$ であるときに、その検定がどれくらいの確率で棄却するかを表す。

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

帰無仮説が単純仮説

$$
H_0:\theta=\theta_0
$$

なら

$$
\beta_\varphi(\theta_0)\le\alpha
$$

だけを確認すればよい。

---

## 2. 最強力検定とは何か

まず

$$
H_0:\theta=\theta_0
\qquad\text{対}\qquad
H_1:\theta=\theta_1
$$

のように、帰無仮説も対立仮説も母数を1点に固定した場合を考える。

このとき、水準 $\alpha$ の検定 $\varphi^*$ が**最強力検定**であるとは、任意の水準 $\alpha$ の検定 $\varphi$ に対して

$$
\boxed{
\beta_{\varphi^*}(\theta_1)
\ge
\beta_{\varphi}(\theta_1)
}
$$

が成り立つことである。

重要なのは、ここで最大化しているのは**特定の対立点 $\theta_1$ における検出力**だという点である。

この最強力検定を与えるのが Neyman–Pearson 補題である。

---

# 3. Neyman–Pearson補題

## 3.1 ステートメント

観測 $X$ の確率密度関数または確率質量関数を $f(x;\theta)$ とする。

単純仮説

$$
H_0:\theta=\theta_0
\qquad\text{対}\qquad
H_1:\theta=\theta_1
$$

を考える。

ある定数 $k\ge0$ と、必要なら $0\le\gamma\le1$ を選び、検定関数

$$
\varphi^*(x)=
\begin{cases}
1,
&f(x;\theta_1)>k f(x;\theta_0),\\
\gamma,
&f(x;\theta_1)=k f(x;\theta_0),\\
0,
&f(x;\theta_1)<k f(x;\theta_0)
\end{cases}
$$

が

$$
E_{\theta_0}[\varphi^*(X)]=\alpha
$$

を満たすように $k,\gamma$ を決める。

このとき $\varphi^*$ は、水準 $\alpha$ の検定の中で

$$
H_1:\theta=\theta_1
$$

に対する**最強力検定**である。

同じことを尤度比で書けば

$$
\frac{f(x;\theta_1)}{f(x;\theta_0)}
$$

が大きい標本から順に棄却域へ入れればよい。

したがって基本形は

$$
\boxed{
\frac{f(x;\theta_1)}{f(x;\theta_0)}>k
\quad\Longrightarrow\quad
H_0\text{ を棄却}
}
$$

である。

連続分布では境界

$$
f(x;\theta_1)=k f(x;\theta_0)
$$

が起こる確率が0になることが多いため、通常は $\gamma$ を意識しなくてよい。

---

## 3.2 なぜ尤度比が大きいところを棄却域に入れるのか

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

水準 $\alpha$ という制約のため、帰無仮説の下で棄却する確率は好きなだけ大きくできない。

そこで限られた「棄却域の予算」を、対立仮説に最も有利な場所から使う。

これが Neyman–Pearson 補題の直感である。

---

## 3.3 Neyman–Pearson補題の証明

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

よって積は0以上である。

### 場合2：$f(x;\theta_1)<k f(x;\theta_0)$

このとき

$$
\varphi^*(x)=0.
$$

したがって

$$
\varphi^*(x)-\varphi(x)\le0.
$$

一方

$$
f(x;\theta_1)-k f(x;\theta_0)<0.
$$

負と負の積なのでやはり0以上である。

### 場合3：$f(x;\theta_1)=k f(x;\theta_0)$

第2因子が0なので積も0である。

したがって全ての $x$ で

$$
\{\varphi^*-\varphi\}
\{f_1-kf_0\}
\ge0
$$

が成り立つ。

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

また $k\ge0$ なので

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
> Neyman–Pearson補題の証明は
> $$
> (\varphi^*-\varphi)(f_1-kf_0)\ge0
> $$
> を積分するだけ、と覚えるとよい。

---

# 4. 正規分布で最強力検定を作る

## 4.1 問題設定

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2)
$$

とし、$\sigma^2$ は既知とする。

まず単純仮説

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu=\mu_1
$$

を考える。

ここでは

$$
\mu_1>\mu_0
$$

とする。

直感的には、$\mu_1$ の方が平均が大きいため

$$
\bar X
$$

が大きいと対立仮説寄りである。

これを Neyman–Pearson 補題で確認する。

---

## 4.2 尤度比を計算する

尤度は

$$
L(\mu;x)
=(2\pi\sigma^2)^{-n/2}
\exp\left\{
-\frac1{2\sigma^2}
\sum_{i=1}^n(x_i-\mu)^2
\right\}.
$$

対数尤度比を取ると

$$
\log\frac{L(\mu_1;x)}{L(\mu_0;x)}
=
-\frac1{2\sigma^2}
\left[
\sum_{i=1}^n(x_i-\mu_1)^2
-
\sum_{i=1}^n(x_i-\mu_0)^2
\right].
$$

平方を展開する。

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

よって尤度比は $\bar x$ の**増加関数**である。

Neyman–Pearson 補題から

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

したがって

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
\mu_0+rac{\sigma}{\sqrt n}z_{1-\alpha}
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

## 4.4 検出力も書いておく

一般の $\mu$ の下で

$$
Z
=
\frac{\sqrt n(\bar X-\mu_0)}{\sigma}
\sim
N\left(
\frac{\sqrt n(\mu-\mu_0)}{\sigma},
1
\right).
$$

したがって検出力は

$$
\begin{aligned}
\beta(\mu)
&=P_\mu(Z>z_{1-\alpha})\\
&=
1-\Phi\left(
z_{1-\alpha}
-
\frac{\sqrt n(\mu-\mu_0)}{\sigma}
\right).
\end{aligned}
$$

従って

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

である。

$\mu$ が大きくなるほど検出力も大きくなる。

---

# 5. 最強力検定から一様最強力検定へ

## 5.1 UMP の定義

今度は対立仮説が1点ではなく

$$
H_1:\theta\in\Theta_1
$$

という複合仮説であるとする。

水準 $\alpha$ の検定 $\varphi^*$ が**一様最強力検定**であるとは、任意の水準 $\alpha$ の検定 $\varphi$ に対して

$$
\boxed{
\beta_{\varphi^*}(\theta)
\ge
\beta_\varphi(\theta)
\qquad
\text{for every }\theta\in\Theta_1
}
$$

が成り立つことである。

つまり「ある $\theta_1$ だけで最強」ではなく、**対立仮説の全ての点で同じ検定が最強**でなければならない。

---

## 5.2 正規平均の片側検定は UMP になる

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2),
\qquad \sigma^2\text{ は既知}
$$

とし、

$$
H_0:\mu\le\mu_0
\qquad\text{対}\qquad
H_1:\mu>\mu_0
$$

を考える。

対立仮説から任意に1点

$$
\mu_1>\mu_0
$$

を固定する。

前節の Neyman–Pearson 補題から、

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

ここで極めて重要なのは、棄却域

$$
Z>z_{1-\alpha}
$$

が、選んだ $\mu_1$ の具体的な値に依存しないことである。

例えば

$$
\mu_1=\mu_0+0.1,
\quad
\mu_0+1,
\quad
\mu_0+10
$$

のどれを選んでも、同じ棄却域が最強力になる。

したがって同じ検定が全ての

$$
\mu_1>\mu_0
$$

に対して最強力である。

さらに $\mu\le\mu_0$ の範囲では棄却確率は $\mu$ とともに増加するので

$$
\sup_{\mu\le\mu_0}P_\mu(Z>z_{1-\alpha})
=P_{\mu_0}(Z>z_{1-\alpha})
=\alpha.
$$

従って水準も $\alpha$ に抑えられている。

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

## 5.3 ここで単調尤度比が見えてくる

$\mu_1>\mu_0$ のどの点を選んでも

$$
\frac{L(\mu_1;x)}{L(\mu_0;x)}
$$

が $\bar X$ の同じ向きの増加関数になる。

つまり正規分布の既知分散モデルは $\bar X$ に関して単調尤度比を持つ。

この「Neyman–Pearson 補題を各対立点に適用しても棄却域の向きが変わらない」という現象を一般化したものが Karlin–Rubin の定理である。

本題の指数分布の UMP 検定も全く同じ構造になっている。

---

# 6. なぜ両側検定では UMP がなくなるのか

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

の両方が入っている。

### $\mu_1>\mu_0$ を固定した場合

Neyman–Pearson 補題による最強力検定は

$$
Z>z_{1-\alpha}
$$

という**上側だけ**の棄却域になる。

### $\mu_1<\mu_0$ を固定した場合

今度は尤度比が $\bar X$ の減少関数になるので、最強力検定は

$$
Z<z_\alpha
$$

という**下側だけ**の棄却域になる。

したがって、正方向の対立に最強な検定と負方向の対立に最強な検定が一致しない。

1つの検定が同時に

$$
\mu>\mu_0
$$

の全ての点でも

$$
\mu<\mu_0
$$

の全ての点でも最強になることはできない。

よって通常の両側問題では

$$
\boxed{
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu\ne\mu_0
}
$$

に対する UMP 検定は存在しない。

ここで「では両側検定の最適性をどう定義するか」という問題が出てくる。

そのために導入されるのが**不偏検定**である。

---

# 7. 不偏検定とは何か

水準 $\alpha$ の検定 $\varphi$ が不偏であるとは、対立仮説の全ての点で

$$
\boxed{
\beta_\varphi(\theta)\ge\alpha
\qquad
(\theta\in\Theta_1)
}
$$

を満たすことをいう。

直感的には、

> 対立仮説が本当なのに、帰無仮説の境界での棄却確率よりも棄却しにくくなる方向を作らない

という条件である。

特に点帰無仮説

$$
H_0:\theta=\theta_0
$$

で、ちょうど水準 $\alpha$ の検定なら

$$
\beta(\theta_0)=\alpha
$$

である。

不偏性は

$$
\beta(\theta)\ge\beta(\theta_0)
\qquad(\theta\ne\theta_0)
$$

を要求していることになる。

つまり検出力関数が帰無点 $\theta_0$ で最小になることを要求する。

滑らかな検出力関数なら、内部点 $\theta_0$ が最小になるためには少なくとも

$$
\boxed{
\beta'(\theta_0)=0
}
$$

が必要になる。

この条件が UMPU 検定の導出で重要になる。

---

# 8. 一様最強力不偏検定とは何か

水準 $\alpha$ の不偏検定の集合だけを候補にする。

その中で、対立仮説の全ての母数値に対して検出力が最大の検定を**一様最強力不偏検定**という。

すなわち $\varphi^*$ が UMPU であるとは、

1. $\varphi^*$ 自身が水準 $\alpha$ の不偏検定であり、
2. 任意の水準 $\alpha$ の不偏検定 $\varphi$ に対して

$$
\boxed{
\beta_{\varphi^*}(\theta)
\ge
\beta_\varphi(\theta)
\qquad
\text{for every }\theta\in\Theta_1
}
$$

が成り立つことをいう。

ここでのポイントは、UMPU は「全ての検定の中で最強」という意味ではないことである。

$$
\boxed{
\text{UMPU}
=
\text{不偏という条件を満たす検定の中で一様に最強}
}
$$

である。

---

# 9. 正規平均の両側検定は UMPU になる

## 9.1 分散既知の場合

再び

$$
X_1,\ldots,X_n
\overset{\mathrm{iid}}{\sim}
N(\mu,\sigma^2),
\qquad \sigma^2\text{ は既知}
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

これは正規1母数指数型分布族における、この両側問題の UMPU 検定である。

---

## 9.2 なぜ両側に $\alpha/2$ ずつ置くのか

$H_0$ の下で

$$
Z\sim N(0,1)
$$

なので

$$
P_{\mu_0}
\left(
|Z|>z_{1-\alpha/2}
\right)
=
\frac\alpha2+rac\alpha2
=\alpha.
$$

したがって水準はちょうど $\alpha$ である。

さらに棄却域は $\mu_0$ を中心に対称なので、検出力関数も $\mu_0$ のまわりで対称になる。

従って

$$
\beta'(\mu_0)=0.
$$

また $\mu$ が $\mu_0$ から左右どちらに離れても棄却確率は増えるため

$$
\beta(\mu)\ge\beta(\mu_0)=\alpha
\qquad(\mu\ne\mu_0).
$$

よってこの両側検定は不偏である。

一方、片側に有意水準を偏らせれば、例えば右側に多く割り当てた検定は $\mu>\mu_0$ では有利になるが、$\mu<\mu_0$ の近くでは不利になる。

不偏性を課すことで、片側だけをひいきして逆側の検出力を落とす検定を候補から排除できる。

正規1母数指数型分布族の UMPU 定理を適用すると、サイズ条件と不偏性条件を満たす2つの臨界点を持つ検定が UMPU となる。

正規分布では対称性によりその2点が

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

が UMPU 検定である。

---

## 9.3 検出力関数を式で確認する

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

また $|\delta|$ が大きくなるほど検出力は増加する。

これが「帰無点が検出力の谷底になる」という不偏性の形である。

---

# 10. 分散未知なら Student の t 検定になる

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
\frac1{n-1}
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

この通常の両側 $t$ 検定も、正規母集団の平均を分散未知のもとで検定する問題における UMPU 検定である。

ただし、分散既知の $Z$ 検定より証明は一段難しい。

理由は

$$
\sigma^2
$$

が**邪魔母数**として残るからである。

厳密な導出では、正規分布族の十分統計量を用い、帰無仮説の下で邪魔母数に関する完全十分統計量に条件付けて1母数問題へ落とし、その条件付き問題に Neyman–Pearson 型の議論を適用する。

最終的に棄却域が Student の $t$ 統計量だけで表されることが分かる。

統計検定1級では、少なくとも

$$
\boxed{
\text{片側正規平均検定：UMP}
}
$$

$$
\boxed{
\text{両側正規平均検定：一般には UMP でないが、通常の両側 }Z\text{ / }t\text{ 検定は UMPU}
}
$$

という構造を押さえておきたい。

---

# 11. MP・UMP・UMPU を1つの正規分布で比較する

| 概念 | 仮説 | 最適性の意味 | 正規平均・分散既知での棄却域 |
|---|---|---|---|
| 最強力検定 (MP) | $H_0:\mu=\mu_0$ vs. $H_1:\mu=\mu_1>\mu_0$ | 固定した1点 $\mu_1$ で検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力検定 (UMP) | $H_0:\mu\le\mu_0$ vs. $H_1:\mu>\mu_0$ | 全ての $\mu>\mu_0$ で同じ検定が検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力不偏検定 (UMPU) | $H_0:\mu=\mu_0$ vs. $H_1:\mu\ne\mu_0$ | 不偏検定の中で全ての $\mu\ne\mu_0$ に対し検出力最大 | $|Z|>z_{1-\alpha/2}$ |

この表で特に大事なのは、MP と UMP では棄却域の式が同じでも、**主張している最適性の範囲が違う**ことである。

MP は

$$
\mu_1\text{ を1点固定}
$$

した話である。

UMP は

$$
\mu_1>\mu_0\text{ のどこを選んでも同じ検定が最強}
$$

という、はるかに強い主張である。

UMPU は両側問題で UMP が壊れたあとに、不偏性を追加して最適性を回復したものである。

---

# 12. 試験での見分け方

## パターン1：単純仮説対単純仮説

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta=\theta_1
$$

なら、まず Neyman–Pearson 補題を疑う。

手順は

1. 尤度比を作る。
2. 尤度比が大きくなる統計量を特定する。
3. $H_0$ の分布から水準 $\alpha$ になる臨界値を決める。

である。

---

## パターン2：1母数分布族の片側対立

$$
H_0:\theta\le\theta_0,
\qquad
H_1:\theta>\theta_0
$$

などで、尤度比がある統計量 $T$ に関して同じ向きに単調なら

$$
\text{単調尤度比}
\quad\Longrightarrow\quad
\text{Karlin--Rubin}
\quad\Longrightarrow\quad
\text{UMP}
$$

を考える。

---

## パターン3：両側対立

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta\ne\theta_0
$$

なら、まず

> 右側の対立に対する MP と左側の対立に対する MP が競合するので、UMP は存在しないのではないか

と考える。

そのうえで指数型分布族などでは

$$
\text{不偏性}
\quad\Longrightarrow\quad
\text{UMPU}
$$

を検討する。

---

# 13. よくある混同

### 混同1：「Neyman–Pearson補題が UMP 検定を直接与える」

厳密には違う。

Neyman–Pearson 補題が直接保証するのは

$$
\boxed{
\text{単純仮説対単純仮説の MP 検定}
}
$$

である。

その MP 検定の棄却域が、対立点を動かしても同じ形になるときに UMP へ昇格する。

---

### 混同2：「両側検定は両側だから UMPU」

両側であることだけでは UMPU は保証されない。

必要なのは

- 水準条件
- 不偏性
- 不偏検定のクラス内での一様最強力性

である。

正規平均の両側 $Z$ 検定や $t$ 検定では、その条件が満たされるため UMPU になる。

---

### 混同3：「不偏検定」の不偏は推定量の不偏性と同じ式

別概念である。

不偏推定量は

$$
E_\theta[\hat\theta]=\theta
$$

を意味する。

不偏検定は

$$
\beta(\theta)\ge\alpha
\qquad(\theta\in\Theta_1)
$$

を意味する。

同じ「不偏」という日本語だが、定義している対象が違う。

---

# 14. 本番答案で使える最短まとめ

Neyman–Pearson 補題は、単純仮説

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

正規母集団 $N(\mu,\sigma^2)$ で $\sigma^2$ 既知なら、$\mu_1>\mu_0$ に対する尤度比は $\bar X$ の増加関数なので

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

では、正側と負側の対立に対する最強力棄却域が逆向きになるため一般に UMP 検定は存在しない。不偏検定に限定すると、通常の両側検定

$$
|Z|>z_{1-\alpha/2}
$$

が一様最強力不偏検定となる。分散未知なら対応する Student の $t$ 検定

$$
\left|
\frac{\sqrt n(\bar X-\mu_0)}{S}
\right|
>t_{n-1,1-\alpha/2}
$$

が UMPU 検定となる。

---

# 参考

- あつまれ統計の森「最強力検定とネイマン・ピアソンの補題」  
  https://www.hello-statisticians.com/explain-terms-cat/most_powerful_test1
- あつまれ統計の森「指数型分布族における一様最強力不偏検定(UMPU test)とその図形的解釈」  
  https://www.hello-statisticians.com/explain-terms-cat/most_powerful_test2.html
- DataArts「ネイマン・ピアソンの補題」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/neyman_pearson_lemma.html
- DataArts「一様最強力検定」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/uniformly_most_powerful_test.html
- Duke University, STA 732 Statistical Inference, UMPU tests and Gaussian mean with unknown variance  
  https://www2.stat.duke.edu/courses/Spring22/sta732.01/lecture21.pdf
