# 定理

## P4T-THM-01 大数の法則

$X_i$ が独立同分布で $E|X_1|<\infty$ なら $\overline X_n\xrightarrow{p}\mu$。さらに同じ仮定で強法則 $\overline X_n\to\mu$ 概収束も成り立つ。

## P4T-THM-02 中心極限定理

$X_i$ が独立同分布、$E[X_i]=\mu$、$0<\sigma^2<\infty$ なら
$$Z_n=\frac{\sqrt n(\overline X_n-\mu)}{\sigma}\xrightarrow{d}N(0,1).$$
従って $\overline X_n$ は大標本で平均 $\mu$、分散 $\sigma^2/n$ の正規分布で近似できる。

## P4T-THM-03 Slutsky型

$X_n\xrightarrow{d}X$、$Y_n\xrightarrow{p}c$ なら $(X_n,Y_n)\xrightarrow{d}(X,c)$。連続関数 $g$ について $g(X_n,Y_n)\xrightarrow{d}g(X,c)$。

## ポアソン近似と連続補正

$B_n\sim\operatorname{Bin}(n,p_n)$、$np_n\to\lambda$、$p_n\to0$ なら $B_n\xrightarrow{d}\operatorname{Poisson}(\lambda)$。二項の正規近似では $P(B_n\le k)$ を $\Phi((k+1/2-np)/\sqrt{np(1-p)})$ で近似する。

二項ポアソン極限は、固定した $k$ に対し
$$\binom n k(\lambda/n)^k(1-\lambda/n)^{n-k}
\to \frac{\lambda^k}{k!}e^{-\lambda}.$$
# Poisson極限の母数条件

以下の二項ポアソン極限では必ず $\lambda\in(0,\infty)$ とし、$np_n\to\lambda$、$p_n\to0$ とする。
