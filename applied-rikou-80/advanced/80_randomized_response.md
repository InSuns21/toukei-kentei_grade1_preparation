# Advanced 80 確率化回答法・最尤推定量・不偏補正

- 安定ID: `RIKOU-ADVANCED-80`
- 80大問 No.: 80
- 演習価値: S
- 難度: A
- 目安時間: 25〜30分

## 問題

母集団で敏感な属性を持つ割合を $\pi$ とする。回答者は確率 $p>1/2$ で「私は属性を持つ」という文、確率 $1-p$ でその否定文に答え、真ならYesと回答する。Yes確率を $\theta$ とする。

1. $\theta$ を $\pi,p$ で表せ。
2. Yes数 $Y\sim\operatorname{Binomial}(n,\theta)$ として、制約を無視した内部解 $\widetilde\pi$ を求めよ。
3. 母数制約 $0\le\pi\le1$ を考えた最尤推定量を述べよ。
4. $\widetilde\pi$ が不偏であることと、その分散を示せ。
5. $p\to1/2$ で推定精度が悪化する理由と、プライバシーとのトレードオフを説明せよ。

## 詳細解答

### 1. Yes確率

属性を持つ事象を $A$ とする。

$$
P(A)=\pi,
\qquad
P(A^c)=1-\pi.
$$

属性を持つ人は「私は属性を持つ」という文を選んだときだけYesになるので

$$
P(\mathrm{Yes}\mid A)=p.
$$

属性を持たない人は否定文「私は属性を持たない」を選んだとき真になるので

$$
P(\mathrm{Yes}\mid A^c)=1-p.
$$

全確率の公式より

$$
\begin{aligned}
\theta
&=P(\mathrm{Yes})\\
&=P(\mathrm{Yes}\mid A)P(A)
+P(\mathrm{Yes}\mid A^c)P(A^c)\\
&=p\pi+(1-p)(1-\pi)\\
&=(1-p)+(2p-1)\pi.
\end{aligned}
$$

従って

$$
\boxed{
\theta=(1-p)+(2p-1)\pi
}.
$$

$p>1/2$ なので $2p-1>0$ であり、$\theta$ は $\pi$ の単調増加関数である。

### 2. 制約を無視した内部解

Yes数は

$$
Y\sim\operatorname{Binomial}(n,\theta)
$$

なので、二項尤度は

$$
L(\theta)
\propto\theta^Y(1-\theta)^{n-Y}.
$$

対数尤度は

$$
\ell(\theta)
=Y\log\theta+(n-Y)\log(1-\theta)+C.
$$

微分すると

$$
\begin{aligned}
\ell'(\theta)
&=\frac Y\theta-\frac{n-Y}{1-\theta}\\
&=\frac{Y-n\theta}{\theta(1-\theta)}.
\end{aligned}
$$

内部解では

$$
Y-n\theta=0
$$

だから

$$
\widehat\theta=\frac Yn.
$$

第1問の関係

$$
\theta=(1-p)+(2p-1)\pi
$$

を $\pi$ について解くと

$$
\pi
=\frac{\theta-(1-p)}{2p-1}.
$$

従って制約を無視した内部解は

$$
\boxed{
\widetilde\pi
=\frac{Y/n-(1-p)}{2p-1}
}.
$$

### 3. 制約付き最尤推定量

$0\le\pi\le1$ のとき、第1問の単調な対応から $\theta$ の取り得る範囲は

$$
1-p\le\theta\le p.
$$

二項対数尤度は $0<\theta<1$ で凹関数であり、無制約最大点は $Y/n$ である。

- $1-p\le Y/n\le p$ なら内部最大点をそのまま使う。
- $Y/n<1-p$ なら許容範囲で最も近い下側境界 $\theta=1-p$、すなわち $\pi=0$ が最大になる。
- $Y/n>p$ なら上側境界 $\theta=p$、すなわち $\pi=1$ が最大になる。

従って

$$
\boxed{
\widehat\pi
=\min\left\{1,
\max\left(0,\widetilde\pi\right)
\right\}
}.
$$

つまり内部解を区間 $[0,1]$ へ切り詰めたものが制約付き最尤推定量である。

### 4. 不偏性と分散

切り詰め前の線形推定量について

$$
\widetilde\pi
=\frac{Y/n-(1-p)}{2p-1}.
$$

二項分布より

$$
E\left[\frac Yn\right]=\theta.
$$

したがって

$$
\begin{aligned}
E[\widetilde\pi]
&=\frac{E[Y/n]-(1-p)}{2p-1}\\
&=\frac{\theta-(1-p)}{2p-1}\\
&=\boxed{\pi}.
\end{aligned}
$$

よって $\widetilde\pi$ は不偏である。

また

$$
\operatorname{Var}\left(\frac Yn\right)
=\frac{\theta(1-\theta)}n.
$$

定数の加減は分散を変えず、定数倍では二乗が掛かるので

$$
\boxed{
\operatorname{Var}(\widetilde\pi)
=\frac{\theta(1-\theta)}
{n(2p-1)^2}
}.
$$

一方、第3問の制約付き最尤推定量 $\widehat\pi$ は境界外の値を0または1へ切り詰める非線形変換なので、一般には厳密な不偏性を持たない。

### 5. $p\to1/2$ とプライバシーのトレードオフ

Yes確率の $\pi$ に対する感度は

$$
\frac{d\theta}{d\pi}=2p-1.
$$

$p\to1/2$ では

$$
2p-1\to0
$$

となるので、属性割合 $\pi$ が変わってもYes確率 $\theta$ がほとんど変わらない。

実際 $p=1/2$ なら

$$
\theta
=\frac12+0\cdot\pi
=\frac12
$$

で、回答分布は $\pi$ に全く依存しない。この場合データから $\pi$ を識別できない。

第4問の分散にも

$$
\frac1{(2p-1)^2}
$$

が含まれるため

$$
p\to1/2
\quad\Rightarrow\quad
\operatorname{Var}(\widetilde\pi)\to\infty
$$

となる。

フィッシャー情報量で見ても、$\pi$ に関する1標本情報量は

$$
I_1(\pi)
=\frac{(2p-1)^2}{\theta(1-\theta)}
$$

なので $p\to1/2$ で0へ近づく。

一方、$p$ が1/2に近いほど、ある人のYes回答が本当に属性を持つことを強く示さなくなるため個人のプライバシーは高まる。

逆に $p\to1$ なら質問はほぼ直接質問になり、推定精度は上がるがプライバシー保護は弱くなる。

従って

$$
\boxed{
\text{統計的精度と個人プライバシーの間にトレードオフがある}
}
$$

と説明できる。

## 本番答案

全確率より

$$
\theta
=p\pi+(1-p)(1-\pi)
=(1-p)+(2p-1)\pi.
$$

二項尤度の無制約最大点は

$$
\widehat\theta=Y/n
$$

なので

$$
\widetilde\pi
=\frac{Y/n-(1-p)}{2p-1}.
$$

$\pi\in[0,1]$ は $\theta\in[1-p,p]$ に対応し、二項対数尤度は凹なので

$$
\widehat\pi
=\min\{1,\max(0,\widetilde\pi)\}.
$$

切り詰め前について

$$
E[\widetilde\pi]
=\frac{\theta-(1-p)}{2p-1}
=\pi,
$$

$$
\operatorname{Var}(\widetilde\pi)
=\frac{\theta(1-\theta)}{n(2p-1)^2}.
$$

$p\to1/2$ では $2p-1\to0$ なのでYes確率が $\pi$ に反応しなくなり推定分散が増大する。一方、回答から真の属性を推測しにくくなるためプライバシーは強くなる。

## 採点基準

- 全確率によるYes確率: 4点
- 二項尤度から内部解を導出: 4点
- 許容範囲と凹性から切り詰め最尤推定量: 4点
- 切り詰め前推定量の不偏性・分散: 5点
- $2p-1$・フィッシャー情報量とプライバシーのトレードオフ: 3点

25分経過時は「不偏なのは切り詰め前の線形推定量」と明記する。
