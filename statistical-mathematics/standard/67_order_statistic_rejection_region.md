# Standard 21 順序統計量で棄却域を設計

- 旧No.: 67
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で $U(0,\theta)$ に従うとする。

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

$H_0:\theta=1$ の下では各 $X_i$ は $U(0,1)$ に従う。

$0\le m\le1$ に対して、最大値が $m$ 以下であることは、全ての観測値が $m$ 以下であることと同値なので

$$
\{M\le m\}
=\{X_1\le m,\ldots,X_n\le m\}.
$$

独立性より

$$
\begin{aligned}
P_0(M\le m)
&=P_0(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP_0(X_i\le m).
\end{aligned}
$$

$X_i\sim U(0,1)$ だから

$$
P_0(X_i\le m)=m,
\qquad 0\le m\le1.
$$

従って

$$
P_0(M\le m)=m^n.
$$

全範囲まで書けば累積分布関数は

$$
\boxed{
F_M(m)=
\begin{cases}
0,&m<0,\\
m^n,&0\le m\le1,\\
1,&m>1.
\end{cases}
}
$$

### 2. 有意水準 $\alpha$ の棄却域

対立仮説は $\theta<1$ である。$\theta$ が小さくなると各 $X_i$ が取り得る上限も小さくなり、最大値 $M$ も小さくなりやすい。したがって小さい $M$ を棄却側に取るのが自然である。

棄却域を

$$
M\le c
$$

とすると、有意水準が $\alpha$ であるためには

$$
P_0(M\le c)=\alpha
$$

でなければならない。

第1問から $0<c<1$ では

$$
c^n=\alpha.
$$

両辺の $n$ 乗根を取って

$$
\boxed{c=\alpha^{1/n}}.
$$

従って棄却域は

$$
\boxed{M\le\alpha^{1/n}}.
$$

### 3. 対立仮説の下での検出力

今度は真の母数を $0<\theta<1$ とする。

$0\le m\le\theta$ に対して

$$
P_\theta(X_i\le m)=\frac{m}{\theta}.
$$

したがって独立性より

$$
\begin{aligned}
P_\theta(M\le m)
&=\prod_{i=1}^nP_\theta(X_i\le m)\\
&=\left(\frac m\theta\right)^n,
\qquad 0\le m\le\theta.
\end{aligned}
$$

検出力は、真の母数が $\theta$ のときに棄却する確率

$$
\pi(\theta)=P_\theta(M\le c)
$$

である。

まず $c<\theta$ なら上の累積分布関数をそのまま使えて

$$
\pi(\theta)
=\left(\frac c\theta\right)^n.
$$

一方 $0<\theta\le c$ なら、$M$ は必ず $M\le\theta\le c$ を満たすため

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

$\theta$ が小さくなるほど検出力が高くなり、$\theta\le c$ では必ず棄却する。

## 本番答案

$H_0$ の下では $X_i\sim U(0,1)$。$0\le m\le1$ に対して

$$
\begin{aligned}
P_0(M\le m)
&=P_0(X_1\le m,\ldots,X_n\le m)\\
&=\prod_{i=1}^nP_0(X_i\le m)\\
&=m^n.
\end{aligned}
$$

棄却域 $M\le c$ の有意水準を $\alpha$ にするには

$$
c^n=\alpha
$$

だから

$$
c=\alpha^{1/n}.
$$

一般の $0<\theta<1$ では、$0\le m\le\theta$ について

$$
P_\theta(M\le m)
=\left(\frac m\theta\right)^n.
$$

従って検出力は

$$
\pi(\theta)=
\begin{cases}
(c/\theta)^n,&c<\theta<1,\\
1,&0<\theta\le c.
\end{cases}
$$

## 採点基準

- 最大値の事象を全観測値の同時事象へ分解し帰無分布を導出: 6点
- 棄却方向の理由とサイズ条件から臨界値を導出: 5点
- 対立下の最大値分布から検出力を場合分けして導出: 6点
- 検出力の挙動の解釈: 3点
