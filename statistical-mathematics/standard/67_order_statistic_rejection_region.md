# Standard 21 順序統計量で棄却域を設計

- 旧No.: 67
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で、未知母数 $\theta>0$ に対し

$$
f(x;\theta)=
\begin{cases}
\dfrac1\theta,&0<x<\theta,\\
0,&\text{otherwise}
\end{cases}
$$

に従うとする。すなわち $X_i\sim U(0,\theta)$ である。

$$
H_0:\theta=1,
\qquad
H_1:\theta<1
$$

を有意水準 $\alpha$ で検定したい。最大順序統計量

$$
M=X_{(n)}=\max(X_1,\ldots,X_n)
$$

を用いる。

1. $H_0$ の下での $M$ の累積分布関数を求めよ。
2. 棄却域を $M\le c$ としたとき、有意水準が $\alpha$ となる $c$ を求めよ。
3. 対立母数 $0<\theta<1$ の下での検出力を求めよ。

## 詳細解答

### 1. $H_0$ の下での最大値の分布

$H_0:\theta=1$ の下では

$$
f(x;1)=1,
\qquad0<x<1,
$$

だから $X_i\sim U(0,1)$ である。従って $0\le m\le1$ で

$$
P_0(X_i\le m)=\int_0^m1\,dx=m.
$$

最大値が $m$ 以下であることは、全ての観測値が $m$ 以下であることと同値なので

$$
\{M\le m\}
=\{X_1\le m,\ldots,X_n\le m\}.
$$

独立性より

$$
\begin{aligned}
P_0(M\le m)
&=P_0(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP_0(X_i\le m)\\
&=m^n.
\end{aligned}
$$

従って

$$
\boxed{
F_M(m)=
\begin{cases}
0,&m<0,\\
m^n,&0\le m\le1,\\
1,&m>1.
\end{cases}}
$$

### 2. 有意水準 $\alpha$ の棄却域

対立仮説は $\theta<1$ である。$\theta$ が小さくなると支持の右端自体が左へ動くため、最大値 $M$ は小さくなりやすい。したがって小さい $M$ を棄却側に取る。

棄却域を

$$
M\le c
$$

とすると、有意水準がちょうど $\alpha$ である条件は

$$
P_0(M\le c)=\alpha.
$$

第1問より

$$
c^n=\alpha,
$$

従って

$$
\boxed{c=\alpha^{1/n}}.
$$

よって棄却域は

$$
\boxed{M\le\alpha^{1/n}}.
$$

### 3. 対立仮説の下での検出力

真の母数を $0<\theta<1$ とする。問題文の密度から、$0\le m\le\theta$ で

$$
P_\theta(X_i\le m)
=\int_0^m\frac1\theta\,dx
=\frac m\theta.
$$

従って独立性より

$$
P_\theta(M\le m)
=\left(\frac m\theta\right)^n,
\qquad0\le m\le\theta.
$$

検出力は

$$
\pi(\theta)=P_\theta(M\le c)
$$

である。

$c<\theta<1$ なら

$$
\pi(\theta)=\left(\frac c\theta\right)^n.
$$

一方 $0<\theta\le c$ なら、支持から常に

$$
M\le\theta\le c
$$

なので

$$
\pi(\theta)=1.
$$

従って

$$
\boxed{
\pi(\theta)=
\begin{cases}
(c/\theta)^n,&c<\theta<1,\\
1,&0<\theta\le c,
\end{cases}
\qquad
c=\alpha^{1/n}.
}
$$

$\theta$ が小さくなるほど検出力は高まり、$\theta\le c$ では必ず棄却する。

この問題では $\theta$ が支持集合を動かすため、最大順序統計量が検定に直接効く。通常の正則な位置・尺度モデルとは少し違う端点母数の検定である。

## 本番答案

$H_0$ の下では $X_i\sim U(0,1)$ なので、$0\le m\le1$ に対して

$$
P_0(M\le m)
=\prod_{i=1}^nP_0(X_i\le m)
=m^n.
$$

棄却域 $M\le c$ のサイズを $\alpha$ にするには

$$
c^n=\alpha
$$

だから

$$
\boxed{c=\alpha^{1/n}}.
$$

一般の $0<\theta<1$ では $0\le m\le\theta$ について

$$
P_\theta(M\le m)
=\left(\frac m\theta\right)^n.
$$

従って

$$
\boxed{
\pi(\theta)=
\begin{cases}
(c/\theta)^n,&c<\theta<1,\\
1,&0<\theta\le c.
\end{cases}}
$$

## 採点基準

- 密度から帰無下の累積分布関数を導出: 6点
- 棄却方向の理由とサイズ条件から臨界値を導出: 5点
- 対立下の最大値分布から検出力を場合分けして導出: 6点
- 支持が母数に依存することの解釈: 3点
