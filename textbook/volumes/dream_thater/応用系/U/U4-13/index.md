# U4-13 2系列の共和分とEngle–Granger法

<!-- definition-example-audit: strict -->

前講では、[単位根と拡張 Dickey–Fuller（ADF）検定](../U4-12/index.md#def-u4-12-adf)を学びました。価格水準がそれぞれ単位根を持つからといって、2本の価格を差し引いた系列にも単位根が残るとは限りません。例えば、同じ基礎的ショックが2銘柄に異なる倍率で伝わるなら、倍率を合わせた差からそのショックを消せるかもしれません。

他方、無関係な2本のランダムウォークを過去のデータで回帰しても、傾きや高い当てはまりは計算できてしまいます。**共通する確率的変動があること**と**有限標本で回帰がよく当てはまること**を区別するのが本講の目的です。ここでの $X_t,Y_t$ は同一時刻に観測した実数値系列（価格、対数価格など）です。価格と対数価格は[変換と収益率の定義](../U4-11/index.md#def-u4-11-price-transforms)どおり異なる量です。共和分は、そのまま収益・自己金融・無裁定を意味しません。

## 1. 一回の階差で定常になる系列を組み合わせる

確率的な長期変動を捉えるため、まず[二次定常性](../../../解析系/TSA/TSA1/index.md#def-tsa1-second-order-stationarity)と[階差](../U4-11/index.md#def-u4-11-difference-trend)を組み合わせます。本講では二次モーメントが有限なモデルを扱い、「定常」は原則として二次定常の意味です。

水準の分散が累積ショックによって増大し、その一回の階差が定常となる系列を、ここでは **1階和分系列（$I(1)$）** として扱います。定常な系列は **0階和分系列（$I(0)$）** と表します。単に一回差分が定常というだけで強い単位根検定の正則性がすべて満たされるわけではありません。以下の理論と実験では生成過程・誤差条件を別途明示します。

<a id="def-u4-13-integration"></a>

<!-- formal-statement-start -->
> **定義（0階和分と1階和分）**  
> 実数値時系列 $Z_t$（$t\ge0$）が二次定常であるとき、本講では $Z$ を $I(0)$ と記す。これは平均・分散が時点によらず一定で、自己共分散が時差だけに依存し、有限な二次モーメントを持つことを意味する。
>
> 水準 $Z$ の分散は時刻とともに無限に増大するが、$t\ge1$ で定義する一回階差
>
$$
\Delta Z_t=Z_t-Z_{t-1}
$$
>
> が二次定常であるとき、本講で扱う範囲の $Z$ を $I(1)$ と記す。単なる決定論的トレンドを持つ系列を誤って含めないため、分散の発散も条件としている。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u4-13-integration -->
**定義の確認**：$X_0=0$、$X_t=\sum_{s=1}^t\varepsilon_s$ とし、$\varepsilon_t$ は平均0、分散1の独立同分布とします。すると $E[X_t]=0$、$\operatorname{Var}(X_t)=t\to\infty$ なので水準は二次定常ではありません。一方 $\Delta X_t=\varepsilon_t$ は平均0、分散1、異なる時点間の共分散0の二次定常系列です。よって $X$ は $I(1)$ です。対照的に、両側無限の独立同分布列 $\eta_t$ はそれ自体が $I(0)$ です。

**条件の境界**：[決定論的線形トレンド](../U4-11/index.md#def-u4-11-difference-trend)を加えた $Z_t=t+\eta_t$ についても、$\Delta Z_t=1+\eta_t-\eta_{t-1}$ は定常です。しかし $\operatorname{Var}(Z_t)=\operatorname{Var}(\eta_t)$ は一定であり、$Z_t-t=\eta_t$ も定常です。したがって単に「差を取ると定常」だけを条件にして $I(1)$ と判定するのは誤りです。
<!-- definition-example-end -->

より一般の文献では、定常性だけでなくショックの長期的な蓄積に関する追加条件を $I(0)$ に課す流儀もあります。本講の定義は二次定常性の観点に限ります。**検定のサイズや検出力**を論じる際は、それだけでは不十分なので個別の誤差条件を付けます。

2本の $I(1)$ が同じ長期ショックを共有する場合を考えます。$Y_t$ と $X_t$ の差を無造作に取るのでなく、「$X$ を何倍すれば共通変動が消えるか」を問います。この倍率を正規化した共和分係数と呼びます。

<a id="def-u4-13-cointegration"></a>

<!-- formal-statement-start -->
> **定義（2系列の共和分と正規化係数）**  
> 二つの実数値系列 $X_t,Y_t$ がともに $I(1)$ であり、零ベクトルでない定数ベクトル $(c_Y,c_X)\in\mathbb R^2$ に対して $c_YY_t+c_XX_t$ が $I(0)$ となるとき、$(X,Y)$ は**共和分する**という。定数を加えても定常性は変わらないため、差の水準を表す $\alpha\in\mathbb R$ を許す。
>
> 両系列が $I(1)$ なので、共和分ベクトルで $c_Y=0$ なら $c_XX_t$ が $I(0)$ となって矛盾する。したがって必ず $c_Y\ne0$ である。元の結合を $c_Y$ で割って $c_Y=1$ と正規化し、$c_X/c_Y=-\beta$ と置き、
>
$$
U_t=Y_t-\alpha-\beta X_t
$$
>
> を定常にする係数 $\beta$ を **$Y$ を $X$ に対して正規化した共和分係数**と呼ぶ。$U_t$ は長期関係からの偏差であり、まだ売買に使う保有数量ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u4-13-cointegration -->
**定義の確認**：平均0、分散 $\sigma_\varepsilon^2>0$ の独立同分布列 $\varepsilon_t$ を累積した $X_t$ と、それと独立な二次定常列 $U_t$（有限で正の分散）を用いて $Y_t=3+2X_t+U_t$ とします。$\Delta Y_t=2\varepsilon_t+\Delta U_t$ は定常で、$\operatorname{Var}(Y_t)=4t\sigma_\varepsilon^2+\operatorname{Var}(U_t)$ は時点とともに増加します。従って $Y$ も $I(1)$ です。しかし
>
$$
Y_t-3-2X_t=U_t
$$
>
> は $I(0)$ です。ベクトル $(1,-2)$ の非零性、両系列の $I(1)$、結合系列の $I(0)$ をそれぞれ確認しました。
<!-- definition-example-end -->

$Y$ と $X$ の表示単位を変えると $\beta$ の数値も変わります。例えば $Y$ を円、$X$ を百円単位で測った係数と、両者を円で測った係数を無条件に比較できません。また $Y-\beta X$ の共通トレンドが消えることと、株式 $Y$ を1株買い $X$ を $\beta$ 株売ることの実行可能性は別問題です。

## 2. 共通確率トレンドの消去はいつ成立するか

もっとも単純な構成では、一つのランダムウォーク $S_t$ が2系列の双方に入ります。式で確認すると、なぜ回帰係数が「長期の倍率」の候補になるのかが見えます。

<a id="prop-u4-13-common-trend"></a>

<!-- formal-statement-start -->
> **命題（共通確率トレンドの消去と係数の一意性）**  
> $S_0=0$、$S_t=S_{t-1}+\varepsilon_t$（$t\ge1$）とし、$\varepsilon_t$ は平均0・分散 $\sigma^2>0$ の独立同分布とする。$V_t,W_t$ は平均一定・有限分散を持つ二次定常系列であり、$(V,W)$ 全体は $S$ と独立、$(V,W)$ の任意の線形結合も二次定常とする。$a,b\ne0$ として
>
$$
X_t=aS_t+V_t,\qquad Y_t=bS_t+W_t
$$
>
> と置く。このとき $X,Y$ は $I(1)$ であり、$Y_t-\beta X_t$ が $I(0)$ になる正規化係数は $\beta=b/a$ に限る。
<!-- formal-statement-end -->

### 証明の見取り図

候補の差は $(b-\beta a)S_t+(W_t-\beta V_t)$ です。後者は定常で、その分散は時点に依存しません。前者のランダムウォーク成分が残ると、独立性により分散に $(b-\beta a)^2t\sigma^2$ が加わってしまいます。

<!-- proof-start -->
### 証明

[ランダムウォークの分散計算](../U4-11/index.md#prop-u4-11-random-walk)に従い、$E[S_t]=0$、$\operatorname{Var}(S_t)=t\sigma^2$ です。独立性と有限分散により
>
$$
\operatorname{Var}(X_t)=a^2t\sigma^2+\operatorname{Var}(V_t),\qquad
\operatorname{Var}(Y_t)=b^2t\sigma^2+\operatorname{Var}(W_t).
$$
>
> $a,b$ が非零なのでいずれも時点により分散が増え、二次定常ではありません。一回階差は $\Delta X_t=a\varepsilon_t+\Delta V_t$、$\Delta Y_t=b\varepsilon_t+\Delta W_t$ です。$(V,W)$ の同時二次定常性から $(\Delta V,\Delta W)$ も同時二次定常です。$S$ と $(V,W)$ は独立なので、$\varepsilon_t$ とこれらの階差との交差共分散は全時差で0です。よって $(\varepsilon_t,\Delta V_t,\Delta W_t)$ は同時二次定常で、定数係数の線形結合である $\Delta X,\Delta Y$ も二次定常です。分散の発散と合わせ、両者は $I(1)$ です。
>
> 任意の定数 $\beta$ に対して
>
$$
Y_t-\beta X_t=(b-\beta a)S_t+(W_t-\beta V_t).
$$
>
> 右辺第2項と $S_t$ の独立性から交差共分散は0です。従って
>
$$
\operatorname{Var}(Y_t-\beta X_t)
=(b-\beta a)^2t\sigma^2+
\operatorname{Var}(W_t-\beta V_t).
$$
>
> 第2項は時点に依存しません。$b-\beta a\ne0$ なら第1項が時点とともに発散し、差は $I(0)$ ではありません。$b-\beta a=0$、すなわち $\beta=b/a$ なら差は $W_t-(b/a)V_t$ であり、仮定から二次定常です。必要十分性と一意性が従います。
<!-- proof-end -->

例えば $a=2,b=5,V=0$、$W_t$ を独立同分布の平均0系列とすれば、$X_t=2S_t$、$Y_t=5S_t+W_t$ です。$Y_t-(5/2)X_t=W_t$ が定常になります。$\beta=2$ なら差は $S_t+W_t$ で分散が $t\sigma^2+\operatorname{Var}(W_t)$ となり定常ではありません。

**仮定を外すと**、$V_t,W_t$ が $S_t$ と相関し、交差項が時間とともに増える構造では、上記の「分散の非負な増大項」という分解は使えません。$\sigma^2=0$ ならそもそもランダムウォークは非定常とは限りません。これらを無視して係数の一意性を一般の2系列へ移すことはできません。

## 3. 第1段階：水準回帰から係数を推定する

母集団の $b/a$ は通常は未知です。同じ尺度・同じ時刻で整列した標本 $t=1,\ldots,n$ を使い、長期式 $Y_t=\alpha+\beta X_t+U_t$ を最小二乗で当てはめます。推定係数は標本全体の情報を使うため、標本内の残差と将来の未知残差を同一視しません。

<a id="def-u4-13-eg-regression"></a>

<!-- formal-statement-start -->
> **定義（Engle–Granger法の第1段階：水準回帰）**  
> 同時刻の実数観測 $(x_t,y_t)$、$t=1,\ldots,n$、$n\ge3$ を与える。標本平均を $\bar x=n^{-1}\sum_{t=1}^n x_t$、$\bar y=n^{-1}\sum_{t=1}^n y_t$ とし、$D=\sum_{t=1}^n(x_t-\bar x)^2>0$ とする。切片と傾きの最小二乗推定量、および推定残差を
>
$$
\widehat\beta=
\frac{\sum_{t=1}^n(x_t-\bar x)(y_t-\bar y)}{D},
\qquad
\widehat\alpha=\bar y-\widehat\beta\bar x,
\qquad
\widehat u_t=y_t-\widehat\alpha-\widehat\beta x_t
$$
>
> と定める。
<!-- formal-statement-end -->

この式がどこから来たかも確かめます。二乗和 $Q(a,b)=\sum(y_t-a-bx_t)^2$ を $a,b$ で微分すると
>
$$
\frac{\partial Q}{\partial a}=-2\sum(y_t-a-bx_t),\qquad
\frac{\partial Q}{\partial b}=-2\sum x_t(y_t-a-bx_t).
$$
>
> 先の方程式を0とすると $a=\bar y-b\bar x$、これを後の方程式に代入すると
>
$$
0=\sum(x_t-\bar x)(y_t-\bar y)-b\sum(x_t-\bar x)^2
$$
>
> です。$D>0$ により一意な傾きが求まります。この導出から直ちに
>
$$
\sum_{t=1}^n\widehat u_t=0,\qquad
\sum_{t=1}^n x_t\widehat u_t=0
$$
>
> という標本内直交性が従います。しかしこれは**最小二乗計算の恒等式**であり、確率的な平均回帰の証明ではありません。

<!-- definition-example-start: def-u4-13-eg-regression -->
**定義の確認**：$x=(0,1,2)$、$y=(1,4,5)$ とすると、$\bar x=1$、$\bar y=10/3$、
>
$$
D=(-1)^2+0^2+1^2=2,\qquad
\sum(x_t-\bar x)(y_t-\bar y)=4.
$$
>
> よって $\widehat\beta=2$、$\widehat\alpha=4/3$、残差は $(-1/3,\,2/3,\,-1/3)$ です。残差の和が0、$x$ と残差の積和も0になりますが、この3点から定常性は判定できません。
<!-- definition-example-end -->

適切な共和分モデルでは、定常誤差を伴う水準回帰の傾きが通常の定常回帰より速く真値へ近づくことがあります。ここでは強い一般定理を暗記せず、独立な誤差という限定モデルで証明します。

<a id="prop-u4-13-superconsistency"></a>

<!-- formal-statement-start -->
> **命題（独立誤差モデルでの水準回帰の推定速度）**  
> $X_0=0$、$X_t=\sum_{s=1}^t\varepsilon_s$、$Y_t=\alpha_0+\beta_0X_t+U_t$、$t=1,\ldots,n$ とする。$\varepsilon_t$ は独立同分布の正規変数 $N(0,\sigma_\varepsilon^2)$（$\sigma_\varepsilon^2>0$）であり、$U_t$ も独立同分布、平均0、分散 $\sigma_U^2\in(0,\infty)$ で、両列は互いに独立とする。切片付き最小二乗推定量が定義される標本では、標本長が大きくなると
>
$$
\widehat\beta-\beta_0=O_p(n^{-1}),\qquad
\widehat\alpha-\alpha_0=O_p(n^{-1/2})
$$
>
> が成り立つ。$O_p$ は括弧内の速さで割った系列が確率的有界であることを表す。
<!-- formal-statement-end -->

### 証明の見取り図

傾きの誤差は「水準と定常誤差の標本共分散／水準の平方和」です。ランダムウォークの水準は通常 $n^{1/2}$ 程度なので、分母は $n^2$ オーダー、一方分子は独立性を使うと $n$ オーダーです。**独立性を外しても同じ速度と推論が使える、とは主張していません。**

<!-- proof-start -->
### 証明

$D_n=\sum_{t=1}^n(X_t-\bar X)^2$ と置きます。上で導いた正規方程式を $Y_t=\alpha_0+\beta_0X_t+U_t$ に代入し、
>
$$
\widehat\beta-\beta_0
=\frac{\sum_{t=1}^n(X_t-\bar X)U_t}{D_n}.
$$
>
> $X_1,\ldots,X_n$ を固定すると、独立性によって分子の条件付き平均は0、条件付き分散は
>
$$
\sigma_U^2\sum_{t=1}^n(X_t-\bar X)^2=\sigma_U^2D_n
$$
>
> です。よって $D_n>0$ で
>
$$
E[(\widehat\beta-\beta_0)^2\mid X_1,\ldots,X_n]
=\frac{\sigma_U^2}{D_n}.
$$
>
> ここでショックを正規分布に限定した理由を確かめます。標準[ブラウン運動](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) $W$ の独立増分について、各 $n$ で $\sigma_\varepsilon\sqrt n\{W(t/n)-W((t-1)/n)\}$ は平均0、分散 $\sigma_\varepsilon^2$ の独立な正規変数です。よって $X$ の規格化水準ベクトルと格子点のブラウン運動は、同じ同時分布を持ちます。
>
$$
\left(\frac{X_1}{\sigma_\varepsilon\sqrt n},
\ldots,\frac{X_n}{\sigma_\varepsilon\sqrt n}\right)
\ \stackrel{d}{=}\
\left(W(1/n),\ldots,W(1)\right).
$$
>
> これを中心化平方和 $D_n$ に代入すると、$D_n/n^2$ は次の格子上の式と同じ分布になります。
>
$$
\frac{\sigma_\varepsilon^2}{n}
\sum_{t=1}^n
\left(W(t/n)-\frac1n\sum_{k=1}^nW(k/n)\right)^2.
$$
>
> $W$ の標本路は $[0,1]$ 上連続なので、Riemann 和は標本路ごとに積分へ収束します。このため、[前講の単位根回帰の非標準極限](../U4-12/index.md#thm-u4-12-df-limit)と同様に、
>
$$
\frac{D_n}{n^2}\ \xrightarrow{d}\
\sigma_\varepsilon^2\int_0^1
\left(W(r)-\int_0^1W(s)\,ds\right)^2\,dr=:D_\infty.
$$
>
> この正規増分による構成は、一般の有限分散ショックに関する極限定理を無条件に仮定したものではありません。
>
> 右辺はほとんど確実に正です。なぜなら積分が0なら連続な $W$ は区間内で定数ですが、$W(0)=0$ かつ $W(1)$ は非退化正規分布だからです。任意の $\delta>0$ に対して小さい $c>0$ を選べば、大きい $n$ で $P(D_n<cn^2)<\delta$ とできます。条件付き Chebyshev の不等式を $D_n\ge cn^2$ 上で用いると、
>
$$
P\!\left(n|\widehat\beta-\beta_0|>M\right)
\le P(D_n<cn^2)+\frac{\sigma_U^2}{cM^2}.
$$
>
> 任意の $\delta$ のもとで $M$ を十分大きくできるので $n(\widehat\beta-\beta_0)=O_p(1)$ です。さらに
>
$$
\widehat\alpha-\alpha_0
=\bar U-(\widehat\beta-\beta_0)\bar X.
$$
>
> 独立同分布の平均について $\operatorname{Var}(\bar U)=\sigma_U^2/n$ なので $\bar U=O_p(n^{-1/2})$ です。一方、$\operatorname{Cov}(X_s,X_t)=\sigma_\varepsilon^2\min(s,t)$ から
>
$$
\operatorname{Var}(\bar X)
=\frac{\sigma_\varepsilon^2}{n^2}\sum_{s,t=1}^n\min(s,t)
=\frac{\sigma_\varepsilon^2(n+1)(2n+1)}{6n}=O(n).
$$
>
> 従って Chebyshev の不等式で $\bar X=O_p(n^{1/2})$ です。第二項は $O_p(n^{-1})O_p(n^{1/2})=O_p(n^{-1/2})$ であり、切片の結論も得られます。
<!-- proof-end -->

$n^{-1}$ の推定速度から「普通の t 分布で検定してよい」は従いません。帰無仮説が共和分なしのときには定常誤差という仮定自体が成立せず、係数推定によって残差の確率分布も変わるからです。

## 4. 第2段階：推定残差の単位根を検定する

第1段階の正規方程式は、残差に単位根がないことを保証しません。[ADF 検定](../U4-12/index.md#def-u4-12-adf)をそのままのデータ水準に適用するのと、**推定した関係から得た残差**に適用するのは別の推論です。

<a id="def-u4-13-engle-granger"></a>

<!-- formal-statement-start -->
> **定義（Engle–Grangerの残差ベース共和分検定）**  
> 同じ観測区間 $t=1,\ldots,n$ にある2系列 $X,Y$ がともに $I(1)$ であることをモデル・データと適切な単位根診断から吟味し、標本長 $n\ge2p+4$、追加差分ラグ数 $p\ge0$（回帰の説明変数が一次独立である標本） を選ぶ。第1段階で切片付き水準回帰 $Y_t=\alpha+\beta X_t+u_t$ を最小二乗推定し、残差 $\widehat u_t$ を得る。
>
> 第2段階では、$t=p+2,\ldots,n$ の $n-p-1$ 観測について、切片・トレンドなしの残差回帰を行う。ここで $\Delta\widehat u_t=\widehat u_t-\widehat u_{t-1}$、$\gamma$ は1期前の残差水準の係数、$\psi_j$（$j=1,\ldots,p$）は追加した階差ラグの係数、$v_t$ は回帰誤差とする。$p=0$ では和の項はない。回帰式は
>
$$
\Delta\widehat u_t
=\gamma\widehat u_{t-1}
+\sum_{j=1}^p\psi_j\Delta\widehat u_{t-j}
+v_t
$$
>
> と書ける。左片側検定の帰無仮説 $H_0$ は**共和分なし**、対立仮説 $H_1$ は**共和分あり**とする。$\gamma$ の最小二乗推定値を $\widehat\gamma$、その回帰の推定標準誤差を $\widehat{\operatorname{SE}}(\widehat\gamma)$ として $\tau_{\mathrm{res}}=\widehat\gamma/\widehat{\operatorname{SE}}(\widehat\gamma)$ を検定統計量とする。ただし棄却判断には、**第1段階で係数を推定したこと、切片の有無、$I(1)$ 説明系列の数に対応する Engle–Granger 用の帰無分布・臨界値**を使用し、単一系列の通常の DF/ADF 用臨界値を流用しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u4-13-engle-granger -->
**定義の確認**：$p=0$ の場合、第2段階は $\Delta\widehat u_t=\gamma\widehat u_{t-1}+v_t$ で、$t=2,\ldots,n$ の $n-1$ 組です。例えば固定した係数で $U_t=0.4U_{t-1}+\eta_t$ が真の定常残差モデルなら、母集団の階差関係は $\Delta U_t=-0.6U_{t-1}+\eta_t$ です。従って負の $\gamma$ は定常対立仮説の方向と整合します。ただし推定残差 $\widehat u$ に対する有限標本の統計量と、その母集団係数 $-0.6$ を同一視してはいけません。
<!-- definition-example-end -->

### なぜ通常のADF臨界値ではないか

最も単純な反例として、互いに独立で分散が正の2本のランダムウォーク $X_t=\sum_{s=1}^t\varepsilon_s$ と $Y_t=\sum_{s=1}^t\zeta_s$ を考えます。両者とも $I(1)$ ですが、任意の定数 $\beta$ について
>
$$
\operatorname{Var}(Y_t-\beta X_t)
=t(\sigma_\zeta^2+\beta^2\sigma_\varepsilon^2)
$$
>
> となり、共和分しません。それでも標本回帰は毎回 $\widehat\alpha,\widehat\beta$ を返します。

<a id="prop-u4-13-spurious"></a>

<!-- formal-statement-start -->
> **命題（独立なランダムウォークの見せかけの回帰）**  
> $X_0=Y_0=0$ とし、二つの水準を次で定める。
>
$$
X_t=\sum_{s=1}^t\varepsilon_s,\qquad
Y_t=\sum_{s=1}^t\zeta_s.
$$
>
> 二つの誤差列は互いに独立で、それぞれ独立同分布、平均0、分散は正かつ有限とする。このとき2系列は共和分しない。一方、標本で
>
$$
D_n=\sum_{t=1}^n(X_t-\bar X)^2>0
$$
>
> が成り立つなら、切片付き最小二乗回帰の推定残差について
>
$$
\sum_{t=1}^n\widehat u_t=0,\qquad
\sum_{t=1}^nX_t\widehat u_t=0
$$
>
> が成立する。従って、これらの標本内直交性から共和分を結論してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

非共和分性は任意の固定倍率の差の分散の成長で示します。標本内直交性は確率的な独立性ではなく、二つの正規方程式にすぎません。

<!-- proof-start -->
### 証明

誤差列間・時点間の独立性から
>
$$
E[Y_t-\beta X_t]=0,\qquad
\operatorname{Var}(Y_t-\beta X_t)
=\operatorname{Var}(Y_t)+\beta^2\operatorname{Var}(X_t)
=t(\sigma_\zeta^2+\beta^2\sigma_\varepsilon^2).
$$
>
> 正の $\sigma_\zeta^2$ によってこの分散は任意の $\beta$ に対して増加します。従って差は $I(0)$ ではありません。他方、[第1段階の水準回帰](#def-u4-13-eg-regression)で誤差平方和 $Q$ を最小にする $\widehat\alpha,\widehat\beta$ を選ぶと、既に導いた $\partial Q/\partial a=0$ と $\partial Q/\partial b=0$ から
>
$$
\sum_{t=1}^n\widehat u_t=0,\qquad
\sum_{t=1}^nX_t\widehat u_t=0
$$
>
> が従います。非共和分のモデルでも成立するので、直交性は共和分の十分条件ではありません。
<!-- proof-end -->

[前講の単位根回帰の非標準極限](../U4-12/index.md#thm-u4-12-df-limit)で行った部分和の規格化と同様に独立な2本の部分和を規格化すると、切片付き第1段階の残差の規格化極限は、おおまかに
>
$$
R(r)=W_Y(r)-A-BW_X(r)
$$
>
> の形になります。この仕組みを明示するため、ここでは二つのショックをそれぞれ分散 $\sigma_\varepsilon^2,\sigma_\zeta^2>0$ の正規分布とします。時点 $t$ の規格化水準を $X_t/(\sigma_\varepsilon\sqrt n)$、$Y_t/(\sigma_\zeta\sqrt n)$ とすれば、その極限は独立な標準ブラウン運動 $W_X,W_Y$ です。規格化した残差は
>
$
\frac{\widehat u_t}{\sigma_\zeta\sqrt n}
=\frac{Y_t}{\sigma_\zeta\sqrt n}
-\frac{\widehat\alpha}{\sigma_\zeta\sqrt n}
-\frac{\sigma_\varepsilon\widehat\beta}{\sigma_\zeta}
 \frac{X_t}{\sigma_\varepsilon\sqrt n}.
$
>
> したがって、極限での $A$ は規格化切片、$B$ は規格化傾きに対応します。$A,B$ は $W_Y$ を $1$ と $W_X$ の張る空間へ区間 $[0,1]$ 上の二乗積分で射影する係数で、[第1段階の正規方程式](#def-u4-13-eg-regression)を積分に置き換えて導けます。$\bar W_X=\int_0^1W_X(r)\,dr$、$\bar W_Y=\int_0^1W_Y(r)\,dr$ と置き、
>
$$
Q(A,B)=\int_0^1\{W_Y(r)-A-BW_X(r)\}^2\,dr.
$$
>
> この $Q$ を $A,B$ で微分して0とすると、$\int_0^1R(r)\,dr=0$ と $\int_0^1W_X(r)R(r)\,dr=0$ が得られます。第1式から $A=\bar W_Y-B\bar W_X$、これを第2式に代入して
>
$$
B\int_0^1(W_X-\bar W_X)^2\,dr
=\int_0^1(W_X-\bar W_X)(W_Y-\bar W_Y)\,dr,
$$
>
> 従って
>
$$
B=\frac{\int_0^1(W_X-\bar W_X)(W_Y-\bar W_Y)\,dr}
{\int_0^1(W_X-\bar W_X)^2\,dr},\qquad
A=\bar W_Y-B\bar W_X.
$$
>
> 分母が0なら連続な $W_X$ は定数ですが、$W_X(0)=0$ かつ $W_X(1)$ が非退化正規分布なので、その事象の確率は0です。この $R$ は通常の DF 統計量に現れる単一のブラウン運動ではありません。**推定した係数で系列を残差化する操作自体が帰無分布を変えます。** 上式はその機構の説明であり、これだけで臨界値を導出したとはしません。

実務での判断は次の順です。まず両水準が同じ次数で和分されるかを吟味し、決定論的項（切片のみか、トレンドも許すか）とラグ選択を事前に固定します。次に学習標本だけで長期関係を推定し、対応する **残差共和分検定用** の表または実装を用いて帰無仮説を評価します。p値が小さくても構造変化や誤指定があればモデルは失敗し得ます。逆に棄却できないことは、共和分が存在しないという論理的証明ではありません。

## 5. 再現実験：真の共通トレンド・無関係な水準・関係崩壊

本節では市場データを用いず、次の三つの**合成系列**だけを比べます。共通の $X$ は平均0・分散1の正規ショックを累積した水準、定常誤差 $U$ は係数0.45で平均回帰する AR(1) です。前者が変化し続けるのに対し、$U$ は[安定 AR(1) の定常解](../U4-11/index.md#thm-u4-11-ar1)を用いることができ、初期値の過渡は別途注意します。

| ケース | 学習区間の $Y$ | 評価区間の $Y$ | 何を疑うか |
| --- | --- | --- | --- |
| 固定した共通トレンド | $1+1.8X+U$ | $1+1.8X+U$ | 共和分は成立し得るが、利益は別 |
| 独立した水準 | 独立なランダムウォーク $Z$ | 同じ生成則の $Z$ | 見せかけの水準回帰 |
| 係数が変わる | $1+1.8X+U$ | $1+2.7X+U$ | 学習した残差関係の標本外崩壊 |

次の標準ライブラリだけの Python 3 コードでは、乱数生成器に与える初期値（20261114）、学習期間、評価期間、第1段階の水準回帰、評価区間への固定係数の適用を明示しています。**残差平方平均の平方根**は診断値であり、共和分検定のp値でも期待利益でもありません。評価区間で係数を再推定すると、関係崩壊を隠してしまうため行いません。

~~~python
import math
import random

rng = random.Random(20261114)
train_n, test_n = 240, 120
n = train_n + test_n
x, z, u = [], [], []
sx = sz = su = 0.0
for t in range(n):
    sx += rng.gauss(0.0, 1.0)
    sz += rng.gauss(0.0, 1.0)
    su = 0.45 * su + rng.gauss(0.0, 0.6)
    x.append(sx)
    z.append(sz)
    u.append(su)

fixed = [1.0 + 1.8 * x[t] + u[t] for t in range(n)]
broken = [1.0 + (1.8 if t < train_n else 2.7) * x[t] + u[t]
          for t in range(n)]

def fit_level(xx, yy):
    mx = sum(xx) / len(xx)
    my = sum(yy) / len(yy)
    denom = sum((v-mx)**2 for v in xx)
    if denom <= 0:
        raise ValueError("regressor has no variation")
    beta = sum((xx[i]-mx)*(yy[i]-my) for i in range(len(xx))) / denom
    return my - beta * mx, beta

def root_mean_square(v):
    return math.sqrt(sum(w*w for w in v) / len(v))

for label, y in [("shared", fixed), ("independent", z),
                 ("break", broken)]:
    a, b = fit_level(x[:train_n], y[:train_n])
    residual_train = [y[t]-a-b*x[t] for t in range(train_n)]
    residual_test = [y[t]-a-b*x[t] for t in range(train_n, n)]
    print(label, "beta=", round(b, 3),
          "train_RMS=", round(root_mean_square(residual_train), 3),
          "test_RMS=", round(root_mean_square(residual_test), 3))
~~~

コードを実行した結果は次の通りです（表示値は小数第3位に丸めています）。

| ケース | 推定された $\widehat\beta$ | 学習残差 RMS | 評価残差 RMS |
| --- | ---: | ---: | ---: |
| 固定した共通トレンド | 1.794 | 0.647 | 0.784 |
| 独立した水準 | -0.295 | 2.994 | 5.381 |
| 係数が変わる | 1.794 | 0.647 | 11.160 |

コードでは $U_0=0$ と固定して始めています。ショックの分散が $0.6^2$ なので、時点 $t\ge1$ での分散は
>
$$
\operatorname{Var}(U_t)=0.6^2\sum_{j=0}^{t-1}0.45^{2j}
=\frac{0.36(1-0.45^{2t})}{1-0.45^2}.
$$
>
> 最初から定常な AR(1) なら分散は常に $0.36/(1-0.45^2)$ ですが、コードでは有限の $t$ でそこまで達していません。したがって、母集団の定常モデルと、開始直後の影響を持つ有限標本のシミュレーションを区別してください。評価区間での $Y_t=1+2.7X_t+U_t$ に、学習時点の真の係数1.8を当てると、
>
$$
Y_t-1-1.8X_t=0.9X_t+U_t
$$
>
> となり、水準の累積ショックが残ります。条件の変更が残差の定常性を壊す機構は、単に平方平均の値が大きくなったという観察より重要です。

残差検定の実装を使う場合には、帰無仮説「共和分なし」、長期回帰の決定論的項、ラグの自動選択の有無、どの標本で推定したか、**Engle–Granger用の臨界値**であることを実行記録に残します。複数ペアを後から選んだなら、単一ペアのp値をそのまま最終的な偽陽性率と解釈しません。

## 6. 演習と詳細解答

### Level A：定義と二段階手順を手で確かめる

<a id="ex-u4-13-a1"></a>
### 演習 U4-13-A1：和分次数

- Level: A

$X_0=0$、$X_t=\sum_{s=1}^t\varepsilon_s$ で、$\varepsilon_s$ は独立同分布、平均0、分散4とする。(1) $X$ が $I(1)$ であること、(2) $\Delta X_t$ の平均と自己共分散を示せ。

<!-- solution-start -->
**詳細解答**：(1) $E[X_t]=\sum_{s=1}^tE[\varepsilon_s]=0$ です。独立性から異なるショックの共分散は0なので
>
$$
\operatorname{Var}(X_t)=
\sum_{s=1}^t\operatorname{Var}(\varepsilon_s)=4t.
$$
>
> 水準の分散が一定でないため、[二次定常性](../../../解析系/TSA/TSA1/index.md#def-tsa1-second-order-stationarity)を満たしません。(2) $\Delta X_t=\varepsilon_t$ より平均は0、$\operatorname{Cov}(\Delta X_t,\Delta X_{t-h})$ は $h=0$ で4、$h\ne0$ で0です。時差のみに依存するので階差は二次定常、従って $I(1)$ です。
<!-- solution-end -->

<a id="ex-u4-13-a2"></a>
### 演習 U4-13-A2：共和分係数を決める

- Level: A

$S_t$ は平均0・分散1の独立同分布ショックの累積、$\eta_t$ はそれと独立な平均0・分散9の独立同分布列とする。$X_t=3S_t$、$Y_t=2+6S_t+\eta_t$ の共和分係数 $\beta$、切片 $\alpha$、定常残差を求め、他の $\beta$ が不適切な理由を示せ。

<!-- solution-start -->
**詳細解答**：$Y_t-\alpha-\beta X_t=(2-\alpha)+(6-3\beta)S_t+\eta_t$ です。$\alpha=2$、$\beta=2$ で残差は $\eta_t$ となり、平均0、分散9、非零ラグ共分散0の $I(0)$ です。$X,Y$ はいずれも $I(1)$（階差はショックの定常な線形結合、水準分散は増大）です。他の $\beta$ では独立性から差の分散は $(6-3\beta)^2t+9$ となり、定常ではありません。切片は残差の平均0という正規化に対応し、定常性だけなら別の定数切片でも成立します。
<!-- solution-end -->

<a id="ex-u4-13-a3"></a>
### 演習 U4-13-A3：回帰の正規方程式

- Level: A

$x=(0,1,2)$、$y=(1,4,5)$ で切片付き水準回帰を行い、$\widehat\alpha,\widehat\beta,\widehat u$ を求めよ。残差の二つの直交条件も確認せよ。

<!-- solution-start -->
**詳細解答**：$\bar x=1$、$\bar y=10/3$、$D=2$、交差積和 $(-1)(1-10/3)+(1)(5-10/3)=4$ です。従って $\widehat\beta=4/2=2$、$\widehat\alpha=10/3-2=4/3$ です。予測値は $(4/3,10/3,16/3)$ なので $\widehat u=(-1/3,2/3,-1/3)$。和は $(-1+2-1)/3=0$、$x$ との積和は $0+2/3-2/3=0$ です。これは回帰の性質であり、わずか3点の残差を定常と証明したものではありません。
<!-- solution-end -->

<a id="ex-u4-13-a4"></a>
### 演習 U4-13-A4：残差ADFの対象標本

- Level: A

長期回帰を時点1から150までで推定した。残差に追加差分ラグ $p=2$ の切片なしADF回帰を行う。最初に利用する時点、観測組数、帰無仮説、使用する臨界値の種類を答えよ。

<!-- solution-start -->
**詳細解答**：差 $\Delta\widehat u_t$ は $t\ge2$ で定義されます。2期前の差 $\Delta\widehat u_{t-2}$ も必要なので $t-2\ge2$、従って最初は $t=4$ です。時点4から150までで $150-4+1=147$ 組です。帰無仮説は「両系列が $I(1)$ としたモデルで、共和分なし」です。推定残差に通常のADFの臨界値を当てず、第1段階に切片を含む2系列 Engle–Granger残差検定用の臨界値（または対応するp値）を使います。
<!-- solution-end -->

<a id="ex-u4-13-a5"></a>
### 演習 U4-13-A5：単位の変換

- Level: A

水準の関係 $Y_t=5+2X_t+U_t$ がある。$Y$ は円、$X$ は円で測られていた。新しい観測値 $X_t'=X_t/100$ を「百円単位」で測るとき、同じ残差 $U_t$ を得る切片と傾きを求めよ。

<!-- solution-start -->
**詳細解答**：$X_t=100X_t'$ を元の式へ代入すると $Y_t=5+2(100X_t')+U_t=5+200X_t'+U_t$ です。従って切片は5、係数は200です。元の数値2をそのまま使うと $Y_t-5-2X_t'=U_t+198X_t'$ となり、$X'$ が $I(1)$ なら定常な残差ではありません。係数は表示単位に依存します。
<!-- solution-end -->

### Level B：理論・反例・検定の仮定を組み合わせる

<a id="ex-u4-13-b1"></a>
### 演習 U4-13-B1：独立ランダムウォークは共和分しない

- Level: B

$X_0=Y_0=0$ とし、二系列を $X_t=\sum_{s=1}^t\varepsilon_s$、$Y_t=\sum_{s=1}^t\zeta_s$ で定める。すべての $\varepsilon_s,\zeta_s$ は互いに独立、平均0、分散はそれぞれ1と4とする。

1. 任意の $\beta\in\mathbb R$ で $Y-\beta X$ が $I(0)$ でないことを示せ。
2. それでも水準回帰の推定残差の和が0となる理由を説明せよ。

<!-- solution-start -->
**詳細解答**：(1) 分散の交差項は独立性により0なので、
>
$$
\operatorname{Var}(Y_t-\beta X_t)
=\operatorname{Var}(Y_t)+\beta^2\operatorname{Var}(X_t)
=(4+\beta^2)t.
$$
>
> $4+\beta^2>0$ は任意の実数 $\beta$ で成立し、時点に依存して増大します。従って差は二次定常でありません。(2) 残差和が0なのは、切片 $\alpha$ に関する二乗和の微分 $-2\sum(y_t-\alpha-\beta x_t)=0$ を満たすように推定するからです。回帰を使って標本内平均を0にしただけで、母集団の長期関係は現れません。
<!-- solution-end -->

<a id="ex-u4-13-b2"></a>
### 演習 U4-13-B2：独立誤差の下での推定速度

- Level: B

$Y_t=\alpha_0+\beta_0 X_t+U_t$ とし、$X$ は平均0・分散1の独立ショックを累積した水準、$U_t$ はそれと独立な平均0・分散9の独立同分布列である。$D_n=\sum(X_t-\bar X)^2$ とする。条件付き分散を計算し、もし $D_n\ge cn^2$（$c>0$）なら $n(\widehat\beta-\beta_0)$ の絶対値が $M$ を超える条件付き確率の上界を求めよ。

<!-- solution-start -->
**詳細解答**：[第1段階の正規方程式](#def-u4-13-eg-regression)による傾き推定式に $Y_t=\alpha_0+\beta_0X_t+U_t$ を代入すると
>
$$
\widehat\beta-\beta_0
=\frac{\sum(X_t-\bar X)U_t}{D_n}.
$$
>
> $X_1,\ldots,X_n$ を固定したとき分子は平均0、分散 $\sum(X_t-\bar X)^2\operatorname{Var}(U_t)=9D_n$ です。従って
>
$$
\operatorname{Var}\!\left(n(\widehat\beta-\beta_0)\mid X\right)
=\frac{9n^2}{D_n}\le\frac9c.
$$
>
> 条件付き Chebyshev から $P(n|\widehat\beta-\beta_0|>M\mid X)\le 9/(cM^2)$ です。これは $D_n\ge cn^2$ の条件下の上界です。無条件に確率的有界性を得るには、さらに $D_n/n^2$ が正の極限を持つことを示す必要があります。
<!-- solution-end -->

<a id="ex-u4-13-b3"></a>
### 演習 U4-13-B3：検定と臨界値の取り違え

- Level: B

2系列の水準がともに単位根を持つと仮定し、切片付き水準回帰から残差を得た。担当者は残差ADFの統計量を計算し、単一系列の「定数項なしADF用」5%臨界値より小さいことから、「5%水準で共和分が証明でき、無裁定利益がある」と報告した。推論の誤りを少なくとも三つ指摘し、正しい判定手順を述べよ。

<!-- solution-start -->
**詳細解答**：第一に、推定残差は $\widehat\alpha,\widehat\beta$ の推定に使ったデータから作られており、帰無分布は通常の単一系列ADFとは違います。適用すべきは、切片付き長期回帰という仕様に合う Engle–Granger専用臨界値です。第二に、適切な検定で棄却しても確率的なモデル仮説への統計的根拠であり、「数学的に証明した」わけではありません。第三に、共和分が成立しても取引数量、費用、資金制約と将来ペイオフは確定せず、無裁定利益の存在は導けません。第四に、2系列が $I(1)$ という事前判定の不確実性、ラグ・決定論的項の指定、事後的なペア選択によるサイズ変化が未検証です。正しくは水準の和分次数と整列データを点検し、検定仕様を先に固定して長期回帰・残差回帰を順に行い、専用帰無分布と比較し、標本外で残差関係の安定性を独立に確認します。
<!-- solution-end -->

<a id="ex-u4-13-b4"></a>
### 演習 U4-13-B4：一回の関係変化

- Level: B

$X_t$ は分散1の独立ショックの累積で、$U_t$ はそれと独立な二次定常系列とする。$Y_t=2X_t+U_t$ が時点 $T$ 以前、$Y_t=3X_t+U_t$ が $T$ より後で成立する。学習区間 $t\le T$ の真の係数2を固定した残差が、後半で二次定常でなくなる理由を説明せよ。また、全標本で再推定すれば問題が解決したといえるか。

<!-- solution-start -->
**詳細解答**：後半で学習済み係数を用いる残差は $Y_t-2X_t=X_t+U_t$ です。独立性からその分散は $\operatorname{Var}(X_t)+\operatorname{Var}(U_t)=t+\operatorname{Var}(U_t)$ となり、時点依存です。よって後半の差は $I(0)$ ではありません。全標本で係数を推定しても、過去の各期で必要な係数が2と3で異なるので、一つの定数 $\beta$ で両方の確率トレンドを消すというモデル仮定が壊れています。さらに評価後のデータを長期回帰へ混ぜると、評価時点には利用不能な情報を使ったことになります。
<!-- solution-end -->

### Level C：研究報告を一貫した論理で査読する

<a id="ex-u4-13-c1"></a>
### 演習 U4-13-C1：ペア候補の判定と標本外検証

- Level: C

ある研究者は、同一通貨・同時刻の対数価格 $X_t,Y_t$ を扱う。学習区間は $t=1,\ldots,240$、評価区間は $t=241,\ldots,360$ とする。

単位根診断では、各水準について帰無仮説を棄却できなかった一方、各一回階差については単位根帰無仮説を棄却した。切片付き水準回帰の推定値と、推定残差に追加ラグ1を用いたDF型統計量は次であった。

$$
\widehat\alpha=1,\qquad \widehat\beta=1.8,\qquad
\tau_{\mathrm{res}}=-3.1.
$$

担当者は、単一系列の通常ADF検定（定数なし）の5%臨界値 $-1.95$ と比較し、共和分を断定した。

評価区間の実際の関係は次と分かった。$U_t$ は $X$ と独立な二次定常系列、$X_t$ は分散正の独立ショックの累積である。

$$
Y_t=1+2.7X_t+U_t.
$$

次の四点を答えよ。

1. 和分次数の事前診断をどう読むか。
2. 残差ADFに使う最初の時点と観測数を求め、統計量 $-3.1$ から何が判定可能か述べよ。
3. 評価区間で固定した学習係数を用いる残差を導出し、定常性を判断せよ。
4. 共和分から利益を結論するには何が不足するか、少なくとも三点述べよ。

<!-- solution-start -->
**詳細解答**：

(1) 各水準で棄却できなかった事実は単位根の「証明」ではありません。階差で棄却した事実と合わせて $I(1)$ の候補とみなせますが、[単位根検定のサイズ・検出力](../U4-12/index.md#def-u4-12-test-errors)、トレンド仕様、構造変化を点検する必要があります。

(2) 残差は時点1から240で得ています。追加差分ラグ $p=1$ の回帰は $\Delta\widehat u_t$ と $\Delta\widehat u_{t-1}$ を必要とし、$t=3,\ldots,240$ の $240-3+1=238$ 観測です。$-3.1<-1.95$ は算術上正しいですが、$-1.95$ はこの検定の帰無分布に対応しません。従って提示値だけから5%棄却は判定できません。切片付き長期回帰、2系列、ラグ指定に適合した Engle–Granger 用の臨界値またはp値が必要です。

(3) 学習係数を評価区間に固定すると
>
$$
Y_t-\widehat\alpha-\widehat\beta X_t
=(1+2.7X_t+U_t)-1-1.8X_t=0.9X_t+U_t.
$$
>
> 独立性から分散は $0.9^2\operatorname{Var}(X_t)+\operatorname{Var}(U_t)=0.81t+\operatorname{Var}(U_t)$ です。時点が進むと増加するため、評価区間に延長した残差過程は二次定常ではありません。学習中の見かけの関係が持続したとはいえません。

(4) 少なくとも、対数価格の線形差と**実際の株数・通貨金額**の対応、ロングとショートの可否・借株条件、bid/ask・手数料・資金調達費用、モデル変化に伴う損失分布、評価時刻に利用可能な情報と保有期間が必要です。これらがなければ、学習上の共和分の推定は[全状態裁定の証明](../U4-10/index.md#def-u4-10-statewise-arbitrage)にも収益保証にもなりません。
<!-- solution-end -->

## 7. 次に何を問うか

本講で扱ったのは、2本の非定常系列の確率的な長期関係と、その残差に対する**専用の**統計的検定です。共和分の係数を標本内で推定できたとしても、将来に同じ関係が保たれるとは限りません。次講では複数系列に共通するトレンドの数と誤差修正を扱い、その後、推定した差をどの保有数量・費用・損益で実現するかを検討します。
