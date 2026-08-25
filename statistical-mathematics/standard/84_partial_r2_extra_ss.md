# Standard 27 偏決定係数・追加平方和

- 旧No.: 84
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ○

## 問題

縮小モデルの残差平方和を $SSE_R=100$、追加説明変数2個を入れた完全モデルの残差平方和を $SSE_F=80$ とする。完全モデルの残差自由度は20である。

1. 追加平方和と偏決定係数を求めよ。
2. 追加説明変数2個を同時に検定する部分F統計量を求めよ。
3. 偏決定係数と部分F統計量の一般関係を導け。

## 詳細解答

### 1. 追加平方和と偏決定係数

縮小モデルに説明変数を追加すると、完全モデルでは残差平方和が小さくなる。本問では

$$
SSE_R=100,
\qquad
SSE_F=80.
$$

追加した2変数によって減少した残差平方和が追加平方和だから

$$
\begin{aligned}
SS_{\mathrm{add}}
&=SSE_R-SSE_F\\
&=100-80\\
&=\boxed{20}.
\end{aligned}
$$

偏決定係数は、**縮小モデルでまだ説明できずに残っていた変動のうち、追加変数によって新たに説明できた割合**である。従って

$$
R_{\mathrm{partial}}^2
=\frac{SSE_R-SSE_F}{SSE_R}.
$$

数値を代入すると

$$
R_{\mathrm{partial}}^2
=\frac{20}{100}
=\boxed{0.2}.
$$

つまり縮小モデルに残っていた残差変動の20%を、追加した2変数がさらに説明したことになる。

### 2. 部分F統計量

追加した説明変数の個数を

$$
q=2
$$

とする。帰無仮説は「追加した2個の回帰係数がともに0」である。

追加平方和を1自由度当たりに直した量は

$$
\frac{SSE_R-SSE_F}{q}.
$$

一方、完全モデルの誤差分散の推定量は

$$
\frac{SSE_F}{\nu},
$$

ここで完全モデルの残差自由度は

$$
\nu=20.
$$

したがって部分F統計量は

$$
F
=\frac{(SSE_R-SSE_F)/q}{SSE_F/\nu}.
$$

数値を代入すると

$$
\begin{aligned}
F
&=\frac{(100-80)/2}{80/20}\\
&=\frac{10}{4}\\
&=\boxed{2.5}.
\end{aligned}
$$

### 3. 偏決定係数と部分F統計量の関係

一般に

$$
r=R_{\mathrm{partial}}^2
=\frac{SSE_R-SSE_F}{SSE_R}
$$

と置く。

この式から

$$
SSE_R-SSE_F=rSSE_R.
$$

また

$$
SSE_F
=SSE_R-(SSE_R-SSE_F)
=(1-r)SSE_R.
$$

これらを部分F統計量

$$
F
=\frac{(SSE_R-SSE_F)/q}{SSE_F/\nu}
$$

へ代入すると

$$
\begin{aligned}
F
&=\frac{rSSE_R/q}{(1-r)SSE_R/\nu}\\
&=\frac{\nu r}{q(1-r)}.
\end{aligned}
$$

従って

$$
qF(1-r)=\nu r.
$$

左辺を展開して

$$
qF-qFr=\nu r.
$$

$r$ を含む項を右辺へ集めると

$$
qF=r(qF+\nu).
$$

したがって

$$
\boxed{
R_{\mathrm{partial}}^2
=\frac{qF}{qF+\nu}
}.
$$

逆に書けば

$$
\boxed{
F
=\frac{\nu}{q}
\frac{R_{\mathrm{partial}}^2}{1-R_{\mathrm{partial}}^2}
}.
$$

本問では $q=2,F=2.5,\nu=20$ なので

$$
R_{\mathrm{partial}}^2
=\frac{2\cdot2.5}{2\cdot2.5+20}
=\frac5{25}
=0.2,
$$

と第1問の値に一致する。

## 本番答案

追加平方和は

$$
SSE_R-SSE_F=100-80=20.
$$

偏決定係数は

$$
R_{\mathrm{partial}}^2
=\frac{SSE_R-SSE_F}{SSE_R}
=\frac{20}{100}
=0.2.
$$

追加変数数 $q=2$、完全モデルの残差自由度 $\nu=20$ なので

$$
F
=\frac{(100-80)/2}{80/20}
=2.5.
$$

一般に $r=R_{\mathrm{partial}}^2$ と置くと

$$
SSE_R-SSE_F=rSSE_R,
\qquad
SSE_F=(1-r)SSE_R.
$$

従って

$$
F
=\frac{rSSE_R/q}{(1-r)SSE_R/\nu}
=\frac{\nu r}{q(1-r)},
$$

よって

$$
\boxed{
r=\frac{qF}{qF+\nu}
}.
$$

## 採点基準

- 追加平方和の意味と計算: 3点
- 偏決定係数の定義と計算: 5点
- 部分F統計量の分子・分母の意味と計算: 5点
- 一般関係を代数的に導出: 7点
