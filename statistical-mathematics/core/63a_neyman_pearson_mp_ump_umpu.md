# 補足：Neyman–Pearson補題から最強力・一様最強力・一様最強力不偏検定へ

このページでは、Neyman–Pearson補題を出発点に、

- 最強力検定（Most Powerful; MP）
- 一様最強力検定（Uniformly Most Powerful; UMP）
- 一様最強力不偏検定（Uniformly Most Powerful Unbiased; UMPU）

の違いを、**正規分布の母平均の検定**で一続きに整理する。

先に全体像を書くと、

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

という流れである。

> 指数分布で単調尤度比から一様最強力検定を構成する演習は [Core 03 Neyman–Pearson・単調尤度比・一様最強力検定](#/statistical-mathematics/core/63_neyman_pearson_ump) を参照。

---

## 1. 検出力関数と水準

検定関数を

$$
\varphi(x)\in[0,1]
$$

とする。通常の非ランダム検定なら

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

を確認すればよい。

---

## 2. 最強力・一様最強力・不偏・一様最強力不偏

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

ここでは**特定の対立点 $\theta_1$** における検出力だけを最大化している。

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

「一様」とは、対立仮説の**全ての母数値にわたって**同じ検定が最強という意味である。

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

点帰無仮説で

$$
\beta(\theta_0)=\alpha
$$

なら、不偏性は

$$
\beta(\theta)\ge\beta(\theta_0)
\qquad(\theta\ne\theta_0)
$$

を要求している。

つまり、帰無点が検出力関数の谷底になることを要求する。

これは推定量の不偏性

$$
E_\theta[\widehat\theta]=\theta
$$

とは別の概念である。

### 2.4 一様最強力不偏検定

水準 $\alpha$ の**不偏検定だけ**を候補にし、その中で対立仮説の全ての点に対して検出力を最大にする検定を**一様最強力不偏検定**という。

したがって

$$
\boxed{
\text{UMPU}
=
\text{不偏検定という制約の中で一様に最強}
}
$$

であり、「全ての水準 $\alpha$ の検定の中で最強」という意味ではない。

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

ある $k\ge0$ と、必要なら $0\le\gamma\le1$ を選び、

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

を満たすようにする。

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

である。

連続分布では境界

$$
f(x;\theta_1)=k f(x;\theta_0)
$$

が起こる確率が0であることが多く、通常は境界でのランダム化を意識しなくてよい。

---

## 3.2 直感

$$
\frac{f(x;\theta_1)}{f(x;\theta_0)}
$$

が大きいとは、観測値 $x$ が帰無仮説より対立仮説の下で相対的に起こりやすいことを意味する。

水準 $\alpha$ という制約があるので、帰無仮説の下で棄却する確率を好きなだけ増やすことはできない。

そこで、限られた「棄却域の予算」を**対立仮説に最も有利な標本点から使う**。これが Neyman–Pearson 補題の考え方である。

---

## 3.3 証明

$\varphi^*$ を上の検定とし、$\varphi$ を任意の水準 $\alpha$ の検定とする。

$\varphi^*$ の定義から、各 $x$ について

$$
\boxed{
\{\varphi^*(x)-\varphi(x)\}
\{f(x;\theta_1)-k f(x;\theta_0)\}
\ge0
}
$$

が成り立つ。

なぜなら、

- $f(x;\theta_1)>k f(x;\theta_0)$ なら $\varphi^*(x)=1$ なので第1因子も第2因子も0以上、
- $f(x;\theta_1)<k f(x;\theta_0)$ なら $\varphi^*(x)=0$ なので第1因子も第2因子も0以下、
- 等号なら第2因子が0、

だからである。

この不等式を $x$ について積分する。

$$
\int
(\varphi^*-\varphi)
(f_1-kf_0)\,dx
\ge0.
$$

ここで

$$
f_0=f(x;\theta_0),
\qquad
f_1=f(x;\theta_1)
$$

と略記した。

展開すると

$$
\int(\varphi^*-\varphi)f_1\,dx
\ge
k\int(\varphi^*-\varphi)f_0\,dx.
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

$\varphi^*$ は

$$
E_{\theta_0}[\varphi^*]=\alpha
$$

となるように作った。一方、$\varphi$ は水準 $\alpha$ の検定なので

$$
E_{\theta_0}[\varphi]\le\alpha.
$$

したがって

$$
E_{\theta_0}[\varphi^*]-E_{\theta_0}[\varphi]\ge0.
$$

さらに $k\ge0$ だから

$$
E_{\theta_1}[\varphi^*]-E_{\theta_1}[\varphi]\ge0.
$$

すなわち

$$
\boxed{
\beta_{\varphi^*}(\theta_1)
\ge
\beta_\varphi(\theta_1)
}
$$

であり、$\varphi^*$ は最強力検定である。

> **証明の核**  
> $$
> (\varphi^*-\varphi)(f_1-kf_0)\ge0
> $$
> を作って積分する。Neyman–Pearson補題の証明は、この1行の意味を理解するとかなり見通しがよくなる。

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

---

## 4.2 尤度比

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
+(\mu_1^2-\mu_0^2)
$$

だから

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

$\mu_1>\mu_0$ なので係数

$$
\frac{n(\mu_1-\mu_0)}{\sigma^2}
$$

は正である。

したがって尤度比は $\bar x$ の増加関数であり、Neyman–Pearson補題から

$$
\boxed{
\bar X>c
}
$$

という形の棄却域が最強力になる。

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

従って

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

が、固定した $\mu_1>\mu_0$ に対する水準 $\alpha$ の最強力検定である。

---

## 4.4 検出力

一般の $\mu$ の下では

$$
Z
\sim
N\left(
\frac{\sqrt n(\mu-\mu_0)}{\sigma},
1
\right).
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

である。

$\mu$ が $\mu_0$ より大きくなるほど検出力が増える。

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

前節で見たとおり、

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

のどれを選んでも、同じ

$$
Z>z_{1-\alpha}
$$

が最強力になる。

したがって、同じ1つの検定が全ての

$$
\mu_1>\mu_0
$$

に対して最強力である。

さらに棄却確率は $\mu$ とともに増加するから

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

この「対立点を動かしても尤度比の向きが変わらない」という構造が単調尤度比であり、それを一般化して片側問題の一様最強力検定を与えるのが Karlin–Rubin の定理である。

---

# 6. なぜ両側検定では一様最強力検定がなくなるのか

今度は

$$
H_0:\mu=\mu_0
\qquad\text{対}\qquad
H_1:\mu\ne\mu_0
$$

を考える。

もし

$$
\mu_1>\mu_0
$$

を固定すれば、Neyman–Pearson補題による最強力検定は

$$
Z>z_{1-\alpha}
$$

という上側検定である。

一方、

$$
\mu_1<\mu_0
$$

を固定すれば、最強力検定は

$$
Z<z_\alpha
$$

という下側検定になる。

右方向の対立に最強な棄却域と、左方向の対立に最強な棄却域が一致しない。

したがって1つの検定が、右側と左側の全ての対立点で同時に最強になることはできない。

よって通常の両側問題

$$
\boxed{
H_0:\mu=\mu_0
\quad\text{対}\quad
H_1:\mu\ne\mu_0
}
$$

には一様最強力検定は存在しない。

そこで、候補を「不偏検定」に限定して最適性を考える。

---

# 7. 正規平均の両側検定と一様最強力不偏性

## 7.1 分散既知の場合

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

について

$$
\boxed{
|Z|>z_{1-\alpha/2}
}
$$

なら $H_0$ を棄却する。

これは正規1母数指数型分布族のこの両側問題における**一様最強力不偏検定**である。

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

点帰無仮説では

$$
\beta(\mu_0)=\alpha.
$$

そして $\mu$ が $\mu_0$ から左右どちらに離れても棄却確率は増えるので

$$
\beta(\mu)\ge\alpha
\qquad(\mu\ne\mu_0).
$$

従ってこの検定は不偏である。

滑らかな検出力関数なら、不偏性から $\mu_0$ は検出力の最小点になるため

$$
\beta'(\mu_0)=0
$$

が必要になる。

正規1母数指数型分布族の一様最強力不偏検定の定理では、

1. 水準条件、
2. この不偏性に対応する条件、

を満たす2つの臨界点を取る検定が一様最強力不偏になる。

正規分布は $\mu_0$ のまわりで対称なので、2つの臨界点は

$$
-z_{1-\alpha/2},
\qquad
z_{1-\alpha/2}
$$

となる。

従って

$$
\boxed{
|Z|>z_{1-\alpha/2}
}
$$

が一様最強力不偏検定である。

---

## 7.3 検出力関数で確認する

$$
\delta
=
\frac{\sqrt n(\mu-\mu_0)}{\sigma}
$$

とおくと

$$
Z\sim N(\delta,1).
$$

$c=z_{1-\alpha/2}$ とすれば

$$
\begin{aligned}
\beta(\mu)
&=P_\mu(Z<-c)+P_\mu(Z>c)\\
&=\Phi(-c-\delta)
+1-\Phi(c-\delta).
\end{aligned}
$$

したがって

$$
\boxed{
\beta(\mu)
=
\Phi(-c-\delta)
+1-\Phi(c-\delta)
}
$$

である。

$\delta=0$、すなわち $\mu=\mu_0$ で

$$
\beta(\mu_0)=\alpha,
$$

そこから $|\delta|$ が大きくなるほど検出力が増える。

「帰無点が検出力の谷底」という不偏性が式でも見える。

---

# 8. 分散未知なら Student の t 検定

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

この通常の両側 $t$ 検定も、正規母集団の平均を分散未知のもとで検定する問題における一様最強力不偏検定である。

ただし証明は分散既知の場合より一段難しい。$\sigma^2$ が邪魔母数だからである。

厳密な導出では、正規分布族の十分統計量を用い、帰無仮説の下で邪魔母数に関する完全十分統計量に条件付けて1母数問題へ落とす。その条件付き問題で Neyman–Pearson 型の議論を行うと、最終的な棄却域が Student の $t$ 統計量だけで表される。

統計検定1級ではまず

$$
\boxed{
\text{正規平均・片側：UMP}
}
$$

$$
\boxed{
\text{正規平均・両側：一般には UMP なし、通常の両側 }Z\text{ / }t\text{ 検定は UMPU}
}
$$

という対比を押さえておきたい。

---

# 9. MP・UMP・UMPU を同じ正規分布で比較する

| 概念 | 仮説 | 最適性の意味 | 分散既知での棄却域 |
|---|---|---|---|
| 最強力検定 (MP) | $H_0:\mu=\mu_0$ vs. $H_1:\mu=\mu_1>\mu_0$ | 固定した1点 $\mu_1$ で検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力検定 (UMP) | $H_0:\mu\le\mu_0$ vs. $H_1:\mu>\mu_0$ | 全ての $\mu>\mu_0$ で同じ検定が検出力最大 | $Z>z_{1-\alpha}$ |
| 一様最強力不偏検定 (UMPU) | $H_0:\mu=\mu_0$ vs. $H_1:\mu\ne\mu_0$ | 不偏検定の中で全ての $\mu\ne\mu_0$ に対し検出力最大 | $|Z|>z_{1-\alpha/2}$ |

MP と UMP では式が同じでも、**主張している最適性の範囲**が違う。

MP は

$$
\mu_1\text{ を1点固定}
$$

した話である。

UMP は

$$
\mu_1>\mu_0\text{ のどこを選んでも同じ検定が最強}
$$

という、より強い主張である。

UMPU は、両側問題で UMP が存在しなくなった後、不偏性という条件を課して最適性を回復したものである。

---

# 10. 試験での見分け方

### 単純仮説対単純仮説

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta=\theta_1
$$

なら、まず Neyman–Pearson 補題を考える。

1. 尤度比を作る。
2. 尤度比が大きくなる統計量を特定する。
3. $H_0$ の分布から水準 $\alpha$ になる臨界値を決める。

### 1母数分布族の片側対立

$$
H_0:\theta\le\theta_0,
\qquad
H_1:\theta>\theta_0
$$

などで、尤度比がある統計量に関して同じ向きに単調なら

$$
\text{単調尤度比}
\Longrightarrow
\text{Karlin--Rubin}
\Longrightarrow
\text{UMP}
$$

を考える。

### 両側対立

$$
H_0:\theta=\theta_0,
\qquad
H_1:\theta\ne\theta_0
$$

なら、右側の対立に対する最強力検定と左側の対立に対する最強力検定が競合しないかを見る。

競合すれば通常 UMP は存在しない。そのうえで指数型分布族などでは

$$
\text{不偏性}
\Longrightarrow
\text{UMPU}
$$

を検討する。

---

# 11. よくある混同

### 「Neyman–Pearson補題が UMP 検定を直接与える」

直接保証するのは

$$
\boxed{
\text{単純仮説対単純仮説の最強力検定}
}
$$

である。

その最強力検定の棄却域が、対立点を動かしても同じ形になるときに一様最強力検定へ進める。

### 「両側検定なら UMPU」

両側であることだけでは UMPU は保証されない。

必要なのは

- 水準条件、
- 不偏性、
- 不偏検定のクラス内での一様最強力性、

である。

正規平均の通常の両側 $Z$ 検定・$t$ 検定ではこれらが満たされる。

### 「不偏検定」と「不偏推定量」は同じ概念

違う。

不偏推定量は

$$
E_\theta[\widehat\theta]=\theta
$$

を意味し、不偏検定は

$$
\beta(\theta)\ge\alpha
\qquad(\theta\in\Theta_1)
$$

を意味する。

---

# 12. 本番答案用の最短まとめ

Neyman–Pearson補題は、単純仮説

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

では、正側と負側の対立に対する最強力棄却域が逆向きになるため、一般に一様最強力検定は存在しない。

不偏検定に限定すると、分散既知では

$$
|Z|>z_{1-\alpha/2}
$$

が一様最強力不偏検定となる。分散未知では

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
- あつまれ統計の森「指数型分布族における一様最強力不偏検定(UMPU test)とその図形的解釈」  
  https://www.hello-statisticians.com/explain-terms-cat/most_powerful_test2.html
- DataArts「ネイマン・ピアソンの補題」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/neyman_pearson_lemma.html
- DataArts「一様最強力検定」  
  https://www.data-arts.jp/course/statistical_testing/methods_of_test/uniformly_most_powerful_test.html
- Duke University, STA 732 Statistical Inference, UMPU tests and Gaussian mean with unknown variance  
  https://www2.stat.duke.edu/courses/Spring22/sta732.01/lecture21.pdf
