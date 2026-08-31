# Core 13 ARIMA・差分・単位根

- 安定ID: `RIKOU-CORE-13`
- 80大問 No.: 27
- 演習価値: S
- 難度: A
- 目安時間: 30分

## 前提知識チェック

時系列 $\{X_t\}$ の**1階差分**を

$$
\Delta X_t=X_t-X_{t-1}
$$

と定義する。

水準系列 $X_t$ 自体は非定常でも、差分 $\Delta X_t$ が定常になることがある。この考え方をARIMAモデルで用いる。

ARIMA$(p,d,q)$ は、系列を $d$ 回差分した後にARMA$(p,q)$ になるモデルである。

後退作用素 $B$ は

$$
BX_t=X_{t-1}
$$

と定義される**短縮記法**であり、本問の概念的前提ではない。まず通常の添字式で考え、最後に作用素表現との対応を確認する。

## 問題

ある工程指標の水準 $X_t$ について、1階差分が

$$
\boxed{
X_t-X_{t-1}
=\varepsilon_t+0.4\varepsilon_{t-1}
}
$$

を満たすとする。ここで $\{\varepsilon_t\}$ は平均0、分散 $\sigma^2$ の独立同一分布な白色雑音である。

この式は後退作用素を使えば

$$
(1-B)X_t=(1+0.4B)\varepsilon_t
$$

と短く書ける。

1. このモデルを ARIMA$(p,d,q)$ で表せ。
2. $Y_t=\Delta X_t$ と置く。$X_t$ を $X_0$ と $Y_1,\ldots,Y_t$ の和で表し、$X_t$ 自体が弱定常でない理由を分散から説明せよ。さらに「単位根」という言葉と $1-B$ の関係を説明せよ。
3. 差分系列 $Y_t$ の自己共分散 $\gamma_Y(0),\gamma_Y(1)$ と自己相関 $\rho_Y(1)$ を求めよ。$|h|\ge2$ の自己共分散も答えよ。
4. 時点 $t$ までの情報に $X_t$ と $\varepsilon_t$ が含まれるとする。1期先、2期先を実際に展開してから、一般の $h$ 期先予測値を求めよ。
5. $h$ 期先予測誤差を将来の $\varepsilon$ で表し、その分散を求めよ。予測期間が長くなると分散がどう変化するか説明せよ。

## 詳細解答

### 1. ARIMA次数

問題文の式は

$$
\Delta X_t
=\varepsilon_t+0.4\varepsilon_{t-1}.
$$

右辺は現在と1期前の白色雑音の線形結合なので、差分系列 $\Delta X_t$ は MA(1) である。

したがって

- AR次数 $p=0$
- 差分次数 $d=1$
- MA次数 $q=1$

であり

$$
\boxed{\operatorname{ARIMA}(0,1,1)}.
$$

作用素表現は、この事実を

$$
(1-B)X_t=(1+0.4B)\varepsilon_t
$$

と1行で書いたものにすぎない。

### 2. 水準系列が非定常である理由

$$
Y_t=\Delta X_t=X_t-X_{t-1}
$$

だから

$$
X_t=X_{t-1}+Y_t.
$$

これを繰り返すと

$$
\boxed{
X_t=X_0+\sum_{j=1}^tY_j
}.
$$

本問では

$$
Y_j=\varepsilon_j+0.4\varepsilon_{j-1}.
$$

したがって

$$
\begin{aligned}
X_t-X_0
&=\sum_{j=1}^t
(\varepsilon_j+0.4\varepsilon_{j-1})\\
&=\sum_{j=1}^t\varepsilon_j
+0.4\sum_{j=1}^t\varepsilon_{j-1}.
\end{aligned}
$$

添字を揃えると

$$
\sum_{j=1}^t\varepsilon_{j-1}
=\varepsilon_0+\sum_{j=1}^{t-1}\varepsilon_j,
$$

よって

$$
\boxed{
X_t-X_0
=0.4\varepsilon_0
+1.4\sum_{j=1}^{t-1}\varepsilon_j
+\varepsilon_t
}.
$$

$X_0$ を固定値とみなすと、異なる時刻の $\varepsilon$ は独立なので

$$
\begin{aligned}
\operatorname{Var}(X_t)
&=0.4^2\sigma^2
+1.4^2(t-1)\sigma^2
+\sigma^2\\
&=\sigma^2\{0.16+1.96(t-1)+1\}.
\end{aligned}
$$

この分散は $t$ に依存して増加する。弱定常系列なら分散は時刻によらず一定でなければならないため

$$
\boxed{X_t\text{ は弱定常ではない}}.
$$

作用素で書いた左辺は

$$
(1-B)X_t.
$$

多項式 $1-z$ は $z=1$ を根に持つ。このようにAR側に絶対値1の根があることを**単位根を持つ**という。

単位根があるとショックが水準へ累積され、$X_t$ の分散が時間とともに増え得る。本問では1回差分して $1-B$ を取り除くと定常なMA(1)になる。

### 3. 差分系列の自己共分散

$$
Y_t=\varepsilon_t+0.4\varepsilon_{t-1}.
$$

まず分散は

$$
\begin{aligned}
\gamma_Y(0)
&=\operatorname{Var}(Y_t)\\
&=\operatorname{Var}(\varepsilon_t)
+0.4^2\operatorname{Var}(\varepsilon_{t-1})\\
&\quad+2(0.4)\operatorname{Cov}(\varepsilon_t,\varepsilon_{t-1}).
\end{aligned}
$$

独立性から共分散は0なので

$$
\boxed{
\gamma_Y(0)=1.16\sigma^2
}.
$$

次に

$$
Y_{t-1}=\varepsilon_{t-1}+0.4\varepsilon_{t-2}.
$$

したがって

$$
\begin{aligned}
\gamma_Y(1)
&=\operatorname{Cov}(Y_t,Y_{t-1})\\
&=\operatorname{Cov}(
\varepsilon_t+0.4\varepsilon_{t-1},
\varepsilon_{t-1}+0.4\varepsilon_{t-2}
).
\end{aligned}
$$

異なる時刻の白色雑音どうしの共分散は0で、両式が共有するのは $\varepsilon_{t-1}$ だけだから

$$
\boxed{
\gamma_Y(1)=0.4\sigma^2
}.
$$

よって

$$
\boxed{
\rho_Y(1)
=\frac{0.4}{1.16}
=\frac{10}{29}
\approx0.345
}.
$$

$|h|\ge2$ では $Y_t$ と $Y_{t-h}$ が共通の白色雑音を含まないため

$$
\boxed{
\gamma_Y(h)=0,
\qquad |h|\ge2
}.
$$

これはMA(1)の自己相関がラグ1で打ち切られることに対応する。

### 4. $h$ 期先予測

元の差分式から

$$
X_{t+1}
=X_t+\varepsilon_{t+1}+0.4\varepsilon_t.
$$

時点 $t$ で $X_t,\varepsilon_t$ は既知、将来ショックは平均0なので

$$
\boxed{
\widehat X_{t+1|t}
=E[X_{t+1}\mid\mathcal F_t]
=X_t+0.4\varepsilon_t
}.
$$

2期先は

$$
X_{t+2}=X_{t+1}+\varepsilon_{t+2}+0.4\varepsilon_{t+1}.
$$

1期先の式を代入すると

$$
\begin{aligned}
X_{t+2}
&=X_t+0.4\varepsilon_t
+\varepsilon_{t+1}+0.4\varepsilon_{t+1}
+\varepsilon_{t+2}\\
&=X_t+0.4\varepsilon_t
+1.4\varepsilon_{t+1}
+\varepsilon_{t+2}.
\end{aligned}
$$

したがって

$$
\widehat X_{t+2|t}=X_t+0.4\varepsilon_t.
$$

さらに先でも、既知なのは $X_t$ と最後の $\varepsilon_t$ だけで、それ以後の白色雑音は条件付き平均0なので

$$
\boxed{
\widehat X_{t+h|t}
=X_t+0.4\varepsilon_t,
\qquad h\ge1
}.
$$

### 5. 予測誤差分散

1期先では

$$
X_{t+1}-\widehat X_{t+1|t}
=\varepsilon_{t+1},
$$

したがって

$$
V_1=\sigma^2.
$$

$h\ge2$ では、展開すると

$$
\boxed{
X_{t+h}-\widehat X_{t+h|t}
=1.4\sum_{j=1}^{h-1}\varepsilon_{t+j}
+\varepsilon_{t+h}
}.
$$

実際、各中間ショック $\varepsilon_{t+j}$ は「その時点の差分」で係数1、その次の差分で係数0.4を持つため、合計係数が1.4になる。

独立性から分散は足し算できるので

$$
\begin{aligned}
V_h
&=1.4^2(h-1)\sigma^2+\sigma^2\\
&=\boxed{
\{1+1.96(h-1)\}\sigma^2
},
\qquad h\ge1.
\end{aligned}
$$

$h=1$ を代入しても $V_1=\sigma^2$ となる。

予測期間 $h$ が長くなるほど未知の将来ショックが水準へ累積するため、予測誤差分散は $h$ に対して線形に増える。これは非定常な水準系列を予測するときの重要な特徴である。

## 本番答案

$$
\Delta X_t
=\varepsilon_t+0.4\varepsilon_{t-1}
$$

なので、1回差分後がMA(1)。従って

$$
\boxed{ARIMA(0,1,1)}.
$$

また

$$
X_t=X_0+\sum_{j=1}^t\Delta X_j
$$

より

$$
X_t-X_0
=0.4\varepsilon_0
+1.4\sum_{j=1}^{t-1}\varepsilon_j
+\varepsilon_t.
$$

従って

$$
\operatorname{Var}(X_t)
=\sigma^2\{0.16+1.96(t-1)+1\}
$$

は $t$ に依存し、$X_t$ は弱定常でない。作用素表示の $1-B$ は $B=1$ に単位根を持つ。

差分系列 $Y_t$ について

$$
\gamma_Y(0)=1.16\sigma^2,
\qquad
\gamma_Y(1)=0.4\sigma^2,
$$

$$
\rho_Y(1)=10/29,
\qquad
\gamma_Y(h)=0\ (|h|\ge2).
$$

予測値は

$$
\widehat X_{t+h|t}=X_t+0.4\varepsilon_t.
$$

予測誤差分散は

$$
\boxed{
V_h=\{1+1.96(h-1)\}\sigma^2
}.
$$

## 採点基準

- ARIMA次数: 3点
- 非定常性・単位根の説明: 5点
- 差分系列の自己共分散・自己相関: 4点
- 予測値: 4点
- 予測誤差分散と解釈: 4点

30分経過時は後退作用素による記法説明を短くしてよい。通常の差分式から非定常性・自己共分散・予測を出す計算を優先する。