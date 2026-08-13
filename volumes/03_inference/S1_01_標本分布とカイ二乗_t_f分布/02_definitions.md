# 定義

## S1-DEF-01 統計量と標本分布

$X_1,\ldots,X_n$ を標本とする。未知母数を含まない標本の関数 $T=T(X_1,\ldots,X_n)$ を統計量といい、$T$ の確率分布を標本分布という。

標本平均と不偏標本分散は
$$
\overline X=\frac1n\sum_{i=1}^nX_i,\qquad
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\overline X)^2
$$
とする。$S^2$ の分母が $n-1$ であることに注意する。

## S1-DEF-02 カイ二乗分布

$\nu\in\mathbb N$ とし、$Z_1,\ldots,Z_\nu$ が独立に標準正規分布 $N(0,1)$ に従うとする。
$$Q=\sum_{j=1}^{\nu}Z_j^2$$
の分布を自由度 $\nu$ のカイ二乗分布といい、$Q\sim\chi^2_\nu$ と書く。台は $q>0$、密度は
$$
f_Q(q)=\frac{1}{2^{\nu/2}\Gamma(\nu/2)}q^{\nu/2-1}e^{-q/2}
\boldsymbol1_{(0,\infty)}(q).
$$
これは shape-rate 表示の $\operatorname{Gamma}(\nu/2,1/2)$ であるから
$$E[Q]=\nu,\qquad \operatorname{Var}(Q)=2\nu.$$

## S1-DEF-03 t分布

$\nu\in\mathbb N$ とする。$Z\sim N(0,1)$、$Q\sim\chi^2_\nu$ が独立であるとき
$$T=\frac{Z}{\sqrt{Q/\nu}}$$
の分布を自由度 $\nu$ のt分布といい、$T\sim t_\nu$ と書く。台は実数全体、密度は
$$
f_T(t)=\frac{\Gamma((\nu+1)/2)}{\sqrt{\nu\pi}\Gamma(\nu/2)}
\left(1+\frac{t^2}{\nu}\right)^{-(\nu+1)/2}.
$$
密度は0について対称で、$\nu>1$ なら $E[T]=0$、$\nu>2$ なら $\operatorname{Var}(T)=\nu/(\nu-2)$ である。

## S1-DEF-04 F分布

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
台外では0である。$u=\nu_1w/(\nu_2+\nu_1w)$ と置くとBeta積分へ変換され、全積分が1となる。

上側確率 $P(F_{\nu_1,\nu_2}>c)=\alpha$ を満たす点を $F_{\nu_1,\nu_2;\alpha}$ と書く。本教材では上側確率で添字を付ける。
