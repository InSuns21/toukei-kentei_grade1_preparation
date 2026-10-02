# F0-00P7A 最尤推定量の一致性・漸近正規性

P7 では、尤度を微分するとスコア和が現れ、その平均と分散を正則性条件の下で計算できるところまで進みました。ここでは、その局所的な微分情報を「推定量が真値へ近づく」「$\sqrt n$ 倍した誤差が正規分布へ近づく」という二つの漸近結果へ組み立てます。

重要なのは順序です。尤度の2階微分を $\widehat\theta_n$ と真値 $\theta_0$ の間で評価するには、まず $\widehat\theta_n$ が $\theta_0$ の近くへ来ることを保証しなければなりません。したがって

$$
\boxed{
\text{大域的な一致性}
\longrightarrow
\text{局所 Taylor 展開}
\longrightarrow
\text{スコア和の中心極限定理}
+
\text{2階微分の大数則}
}
$$

という順で進みます。

---

## 1. 尤度を最大にする推定量

標本 $X_1,\ldots,X_n$ に対する尤度を $L_n(\theta)$ とします。観測された標本を固定したとき、最も大きな尤度を与えるパラメータを推定値として選ぶのが最尤法です。

<a id="def-f0-00p7a-mle"></a>

<!-- formal-statement-start -->
> **定義（最尤推定量）**  
> パラメータ空間を $\Theta$ とします。標本ごとに尤度を最大化する推定量
>
$$
\widehat\theta_n
\in
\operatorname*{arg\,max}_{\theta\in\Theta}L_n(\theta)
$$
>
> を最尤推定量といいます。最大値が存在しない場合や数値最適化で厳密な最大値を取らない場合には、後の一致性定理で「正規化対数尤度を $o_P(1)$ の誤差まで最大化する」近似最大化点を扱います。
<!-- formal-statement-end -->

対数は単調増加なので、$L_n$ の代わりに

$$
\ell_n(\theta)=\log L_n(\theta)
$$

を最大化しても最大化点は同じです。

<!-- definition-example-start: def-f0-00p7a-mle -->
**定義の確認**  
**直接例：ベルヌーイ標本**  
$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Bernoulli}(p_0)$ とします。$S_n=\sum_iX_i$ とすると

$$
\ell_n(p)
=
S_n\log p+(n-S_n)\log(1-p).
$$

内部解では

$$
\ell_n'(p)
=
\frac{S_n}{p}
-
\frac{n-S_n}{1-p}
=
0
$$

なので

$$
\widehat p_n=\frac{S_n}{n}=\overline X_n.
$$

この例では最尤推定量が標本平均に一致するため、大数の法則と中心極限定理がそのまま使えます。
<!-- definition-example-end -->

---

## 2. 最後に二つの極限を合成する

漸近正規性の最後では、正規分布へ収束するスコア側と、定数へ確率収束する2階微分側を掛け合わせます。そのために次の定理を使います。

<a id="thm-f0-00p7a-slutsky"></a>

<!-- formal-statement-start -->
> **定理（Slutsky の定理）**  
> $Y_n\xrightarrow{d}Y$、$Z_n\xrightarrow{p}c$ とし、$c$ は定数とします。このとき
>
$$
Y_n+Z_n\xrightarrow{d}Y+c,
\qquad
Y_nZ_n\xrightarrow{d}cY.
$$
>
> さらに $c\ne0$ なら
>
$$
\frac{Y_n}{Z_n}\xrightarrow{d}\frac{Y}{c}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：定数へ確率収束する因子は $o_P(1)$ の摂動だけを作る

$Y_n\Rightarrow Y$ なら、$Y_n$ は確率的に無限遠へ逃げません。実際、任意の $\varepsilon>0$ に対して十分大きい $R$ を取れば

$$
\limsup_{n\to\infty}P(|Y_n|>R)<\varepsilon
$$

とできます。

一方 $Z_n\to c$ in probability なので、任意の $\delta>0$ に対し

$$
P(|Z_n-c|>\delta)\to0.
$$

和については

$$
(Y_n+Z_n)-(Y_n+c)=Z_n-c\to0
$$

in probability です。積についても、$|Y_n|\le R$ の範囲では

$$
|Y_nZ_n-cY_n|
\le
R|Z_n-c|,
$$

であり、$|Y_n|>R$ の確率を先に小さくできます。したがって

$$
Y_n(Z_n-c)\xrightarrow{p}0.
$$

よって

$$
Y_nZ_n-cY_n\xrightarrow{p}0.
$$

和についても $(Y_n+Z_n)-(Y_n+c)=Z_n-c\to0$ in probability です。[有界 Lipschitz 関数による分布収束の特徴付け](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-bl-characterization)を使えば、「分布収束する列へ $o_P(1)$ を加えても極限分布は変わらない」ことが従います。したがって和と積の結論を得ます。

$c\ne0$ のとき、$Z_n\to c$ in probability から $1/Z_n\to1/c$ in probability です。積の結論を $Y_n$ と $1/Z_n$ に適用すれば

$$
\frac{Y_n}{Z_n}\Rightarrow\frac{Y}{c}
$$

も得られます。
<!-- proof-end -->

---

## 3. 点ごとの大数の法則だけでは最大化点を追えない

各固定した $\theta$ について

$$
\frac1n\ell_n(\theta)
\to
M(\theta)
:=
E_{\theta_0}[\log p_\theta(X)]
$$

が成り立っても、$\theta$ 自体を標本に応じて動かして最大化するので、それだけでは十分ではありません。

例えば、各 $n$ でごく狭い場所に大きな「針」のような誤差があり、その場所が $n$ とともに移動する場合、各固定点では誤差が消えても最大化点はその針を追い続ける可能性があります。

そこでパラメータ全体にわたって誤差を同時に小さくする条件を使います。

<a id="def-f0-00p7a-uniform-lln"></a>

<!-- formal-statement-start -->
> **定義（一様大数の法則）**  
> 関数 $m_\theta(x)$ と
>
$$
M(\theta)=E[m_\theta(X)]
$$
>
> に対し
>
$$
\sup_{\theta\in\Theta}
\left|
\frac1n\sum_{i=1}^{n}m_\theta(X_i)-M(\theta)
\right|
\xrightarrow{p}0
$$
>
> が成り立つとき、この関数族について一様大数の法則が成り立つといいます。
<!-- formal-statement-end -->

最尤法では $m_\theta(x)=\log p_\theta(x)$ を使います。

---

## 4. 真値が期待対数尤度を最大化する理由

パラメータ全体での収束先 $M(\theta)$ が、真値 $\theta_0$ で一意に最大にならなければ、標本側の最大化点を真値へ押し込めません。その一意最大性を説明するために、二つの分布のずれを測る量をここで導入します。

<a id="def-f0-00p7a-kl"></a>

<!-- formal-statement-start -->
> **定義（カルバック・ライブラー情報量）**  
> $P$ と $Q$ が共通の支配測度 $\mu$ に関する密度 $p,q$ をもち、$P\ll Q$ とします。積分が定義できるとき
>
$$
D_{\mathrm{KL}}(P\|Q)
:=
\int
p(x)\log\frac{p(x)}{q(x)}
\,d\mu(x)
$$
>
> と定義します。
<!-- formal-statement-end -->

### 非負性

$R=q(X)/p(X)$ を $X\sim P$ の下で考えると

$$
E_P[R]
=
\int_{\{p>0\}}q\,d\mu
\le1.
$$

任意の $r>0$ について $\log r\le r-1$ なので、$R=q(X)/p(X)$ に適用して

$$
E_P[\log R]
\le
E_P[R]-1
\le0.
$$

従って

$$
D_{\mathrm{KL}}(P\|Q)
=
-E_P[\log R]
\ge0.
$$

真値 $\theta_0$ の下で

$$
M(\theta)
=
E_{\theta_0}[\log p_\theta(X)]
$$

と置けば

$$
\begin{aligned}
M(\theta_0)-M(\theta)
&=
E_{\theta_0}\left[
\log\frac{p_{\theta_0}(X)}{p_\theta(X)}
\right]\\
&=
D_{\mathrm{KL}}(P_{\theta_0}\|P_\theta)
\ge0.
\end{aligned}
$$

さらにモデルが識別可能、すなわち

$$
P_\theta=P_{\theta_0}
\Longrightarrow
\theta=\theta_0
$$

であり、等号条件を確認できれば、$M$ の一意最大点は $\theta_0$ です。

---

## 5. パラメータ全体での収束から最大化点を真値へ押し込む

ここで一様大数の法則が「なぜ一致性に効くのか」を定理として閉じます。

<a id="thm-f0-00p7a-consistency"></a>

<!-- formal-statement-start -->
> **定理（最大化点による最尤推定量の一致性）**  
> $\Theta\subset\mathbb R$ をコンパクト集合、$\theta_0\in\Theta$ とします。確率関数 $M_n(\theta)$ と連続関数 $M(\theta)$ が
>
$$
\sup_{\theta\in\Theta}|M_n(\theta)-M(\theta)|
\xrightarrow{p}0
$$
>
> を満たすとします。また $M$ は $\theta_0$ で一意に最大になり、$\widehat\theta_n$ は
>
$$
M_n(\widehat\theta_n)
\ge
\sup_{\theta\in\Theta}M_n(\theta)-o_P(1)
$$
>
> を満たすとします。このとき
>
$$
\widehat\theta_n\xrightarrow{p}\theta_0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：真値から離れた集合には最大値の隙間がある

任意の $\varepsilon>0$ を固定し

$$
A_\varepsilon
=
\{\theta\in\Theta:|\theta-\theta_0|\ge\varepsilon\}
$$

と置きます。$A_\varepsilon$ はコンパクトです。$M$ は連続で $\theta_0$ を一意最大点にもつので

$$
\sup_{\theta\in A_\varepsilon}M(\theta)
<
M(\theta_0).
$$

従って、ある $\eta>0$ が存在して

$$
\sup_{\theta\in A_\varepsilon}M(\theta)
\le
M(\theta_0)-3\eta
$$

とできます。

一様誤差が $\eta$ 未満なら

$$
M_n(\theta_0)
\ge
M(\theta_0)-\eta
$$

である一方、$\theta\in A_\varepsilon$ では

$$
M_n(\theta)
\le
M(\theta)+\eta
\le
M(\theta_0)-2\eta.
$$

よってその事象上では

$$
M_n(\theta_0)
-
\sup_{\theta\in A_\varepsilon}M_n(\theta)
\ge\eta.
$$

近似最大化誤差も $\eta/2$ 未満なら、$\widehat\theta_n$ は $A_\varepsilon$ に入れません。したがって

$$
P(|\widehat\theta_n-\theta_0|\ge\varepsilon)
\to0.
$$
<!-- proof-end -->

最尤法では

$$
M_n(\theta)=\frac1n\ell_n(\theta)
$$

と取ります。カルバック・ライブラー情報量で $M$ の一意最大性を確保し、一様大数の法則で $M_n$ を $M$ へ近づければ、一致性が得られます。

---

## 6. 一致性があるから Taylor 展開の評価点を真値へ戻せる

1次元パラメータを考えます。真値 $\theta_0$ が内点で、最尤推定量も高確率で内点に入り、スコア方程式

$$
U_n(\widehat\theta_n)=0
$$

を満たすとします。

$U_n$ を $\theta_0$ のまわりで1回 Taylor 展開すると、$\theta_0$ と $\widehat\theta_n$ の間の点 $\theta_n^*$ が存在して

$$
0
=
U_n(\theta_0)
+
U_n'(\theta_n^*)
(\widehat\theta_n-\theta_0).
$$

したがって

$$
\boxed{
\sqrt n(\widehat\theta_n-\theta_0)
=
\left\{
-\frac1nU_n'(\theta_n^*)
\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}
}
$$

です。

ここで一致性から

$$
|\theta_n^*-\theta_0|
\le
|\widehat\theta_n-\theta_0|
\xrightarrow{p}0.
$$

これが、ランダムな評価点 $\theta_n^*$ における2階微分を真値 $\theta_0$ の情報量へ近づけるための橋です。

---

## 7. 分子はスコア和の正規極限

P7 の [スコア恒等式](../F0_00P7_統計モデル_尤度_正則性/index.md#thm-f0-00p7-score-identity) から

$$
E_{\theta_0}[s_{\theta_0}(X)]=0,
$$

フィッシャー情報量の定義から

$$
\operatorname{Var}_{\theta_0}(s_{\theta_0}(X))
=
I(\theta_0).
$$

全スコアは

$$
U_n(\theta_0)
=
\sum_{i=1}^{n}s_{\theta_0}(X_i)
$$

なので、[独立同分布・有限分散版の中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から

$$
\frac{U_n(\theta_0)}{\sqrt n}
\xrightarrow{d}
N(0,I(\theta_0)).
$$

ここで中心極限定理へ渡した確率変数は「スコア関数を各観測に適用したもの」だと明示しておくことが重要です。

---

## 8. 分母は2階微分の大数の法則

$$
-\frac1nU_n'(\theta)
=
-\frac1n
\sum_{i=1}^{n}
\partial_\theta^2\log p_\theta(X_i).
$$

真値近傍 $|\theta-\theta_0|\le\delta$ で

$$
\sup_{|\theta-\theta_0|\le\delta}
\left|
-\frac1nU_n'(\theta)-I(\theta_0)
\right|
\xrightarrow{p}0
$$

が成り立つとします。

一致性から $\theta_n^*$ はこの近傍へ高確率で入るため

$$
-\frac1nU_n'(\theta_n^*)
\xrightarrow{p}
I(\theta_0).
$$

これは「固定した $\theta_0$ でだけ大数則が成り立つ」より強い条件です。評価点 $\theta_n^*$ 自体が標本に依存して動くからです。

---

## 9. 最尤推定量の漸近正規性

ここまでの部品を一つの定理へまとめます。

<a id="thm-f0-00p7a-asymptotic-normality"></a>

<!-- formal-statement-start -->
> **定理（1次元正則モデルにおける最尤推定量の漸近正規性）**  
> 真値を $\theta_0$ とし、次を仮定します。
>
> 1. $\theta_0$ はパラメータ空間の内点である。
> 2. $\widehat\theta_n\xrightarrow{p}\theta_0$。
> 3. 高確率で $U_n(\widehat\theta_n)=0$。
> 4. $E_{\theta_0}[s_{\theta_0}(X)]=0$、$0<I(\theta_0)<\infty$。
> 5. $U_n(\theta_0)/\sqrt n\Rightarrow N(0,I(\theta_0))$。
> 6. ある $\delta>0$ について
>
$$
\sup_{|\theta-\theta_0|\le\delta}
\left|
-\frac1nU_n'(\theta)-I(\theta_0)
\right|
\xrightarrow{p}0.
$$
>
> このとき
>
$$
\sqrt n(\widehat\theta_n-\theta_0)
\xrightarrow{d}
N\!\left(0,I(\theta_0)^{-1}\right).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Taylor 展開の二つの因子へ極限定理を当てる

Taylor 展開から

$$
\sqrt n(\widehat\theta_n-\theta_0)
=
A_n^{-1}B_n
$$

と書けます。ここで

$$
A_n
=
-\frac1nU_n'(\theta_n^*),
\qquad
B_n
=
\frac{U_n(\theta_0)}{\sqrt n}.
$$

一致性により $\theta_n^*\to\theta_0$ in probability なので、仮定6から

$$
A_n\xrightarrow{p}I(\theta_0).
$$

また仮定5から

$$
B_n\xrightarrow{d}N(0,I(\theta_0)).
$$

$I(\theta_0)>0$ なので、[Slutsky の定理](#thm-f0-00p7a-slutsky) により

$$
A_n^{-1}B_n
\xrightarrow{d}
I(\theta_0)^{-1}Z,
\qquad
Z\sim N(0,I(\theta_0)).
$$

定数倍した正規分布の分散は

$$
I(\theta_0)^{-2}I(\theta_0)
=
I(\theta_0)^{-1}
$$

なので結論を得ます。
<!-- proof-end -->

---

## 10. ベルヌーイモデルで一般論を照合する

$X_i\overset{\mathrm{iid}}{\sim}\operatorname{Bernoulli}(p_0)$ では

$$
\widehat p_n=\overline X_n.
$$

大数の法則から

$$
\widehat p_n\xrightarrow{p}p_0,
$$

[独立同分布・有限分散版の中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\sqrt n(\widehat p_n-p_0)
\Rightarrow
N(0,p_0(1-p_0)).
$$

P7 で求めた

$$
I(p_0)=\frac1{p_0(1-p_0)}
$$

を使えば

$$
p_0(1-p_0)=I(p_0)^{-1}.
$$

したがって一般定理の分散と一致します。この例では推定量が標本平均として明示できるため、一般論の各部品が見えやすくなっています。

---

## 演習

### F0-00P7A-A01 最尤推定量の Taylor 展開を整理する

- Level: A

1次元正則モデルで $U_n(\widehat\theta_n)=0$ とする。$U_n$ を $\theta_0$ のまわりで1回 Taylor 展開し、$\sqrt n(\widehat\theta_n-\theta_0)$ の形へ整理せよ。

<!-- solution-start -->
#### 詳細解答

平均値の定理により、$\theta_0$ と $\widehat\theta_n$ の間の点 $\theta_n^*$ が存在して

$$
0
=
U_n(\widehat\theta_n)
=
U_n(\theta_0)
+
U_n'(\theta_n^*)
(\widehat\theta_n-\theta_0).
$$

移項して

$$
-U_n'(\theta_n^*)
(\widehat\theta_n-\theta_0)
=
U_n(\theta_0).
$$

両辺を $\sqrt n$ の尺度に合わせるため、左の係数を $n$ で割り、右を $\sqrt n$ で割ると

$$
\sqrt n(\widehat\theta_n-\theta_0)
=
\left\{
-\frac1nU_n'(\theta_n^*)
\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}.
$$

この形にすると、右辺の第1因子へ大数の法則、第2因子へ中心極限定理を適用できます。
<!-- solution-end -->

### F0-00P7A-A02 カルバック・ライブラー情報量から真値の最大性を出す

- Level: A

$M(\theta)=E_{\theta_0}[\log p_\theta(X)]$ とする。$M(\theta_0)-M(\theta)$ をカルバック・ライブラー情報量で表し、真値が最大点になることを示せ。

<!-- solution-start -->
#### 詳細解答

差を取ると

$$
\begin{aligned}
M(\theta_0)-M(\theta)
&=
E_{\theta_0}[\log p_{\theta_0}(X)]
-
E_{\theta_0}[\log p_\theta(X)]\\
&=
E_{\theta_0}\left[
\log\frac{p_{\theta_0}(X)}{p_\theta(X)}
\right]\\
&=
D_{\mathrm{KL}}(P_{\theta_0}\|P_\theta).
\end{aligned}
$$

カルバック・ライブラー情報量は非負なので

$$
M(\theta)\le M(\theta_0).
$$

さらに識別可能性と等号条件から、等号が $\theta=\theta_0$ のときに限られれば、$\theta_0$ は一意最大点です。
<!-- solution-end -->

### F0-00P7A-A03 一様な誤差評価が最大化点を守る理由

- Level: A

$M$ が $\theta_0$ で一意最大になり、真値から $\varepsilon$ 以上離れた集合で

$$
\sup_{|\theta-\theta_0|\ge\varepsilon}M(\theta)
\le
M(\theta_0)-3\eta
$$

とする。$\sup_\theta|M_n(\theta)-M(\theta)|<\eta$ のとき、$M_n$ の最大化点が真値から $\varepsilon$ 以上離れた場所に存在できないことを示せ。

<!-- solution-start -->
#### 詳細解答

真値では

$$
M_n(\theta_0)
\ge
M(\theta_0)-\eta.
$$

一方、$|\theta-\theta_0|\ge\varepsilon$ なら

$$
M_n(\theta)
\le
M(\theta)+\eta
\le
M(\theta_0)-2\eta.
$$

従って

$$
M_n(\theta_0)
-
\sup_{|\theta-\theta_0|\ge\varepsilon}M_n(\theta)
\ge
\eta>0.
$$

したがって最大化点は真値から $\varepsilon$ 以上離れた集合には入れません。これが [一様大数の法則](#def-f0-00p7a-uniform-lln) から一致性が出る中心機構です。
<!-- solution-end -->

### F0-00P7A-A04 スコア和へ中心極限定理を適用する

- Level: A

$E_{\theta_0}[s_{\theta_0}(X)]=0$、$E_{\theta_0}[s_{\theta_0}(X)^2]=I(\theta_0)<\infty$ とする。独立同分布標本について $U_n(\theta_0)/\sqrt n$ の極限分布を求めよ。

<!-- solution-start -->
#### 詳細解答

全スコアは

$$
U_n(\theta_0)
=
\sum_{i=1}^{n}s_{\theta_0}(X_i).
$$

各項は独立同分布で、平均0、分散 $I(\theta_0)$ です。したがって [P6A の中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\frac{1}{\sqrt{nI(\theta_0)}}
\sum_{i=1}^{n}s_{\theta_0}(X_i)
\Rightarrow N(0,1).
$$

両辺を $\sqrt{I(\theta_0)}$ 倍して

$$
\frac{U_n(\theta_0)}{\sqrt n}
\Rightarrow
N(0,I(\theta_0)).
$$
<!-- solution-end -->

### F0-00P7A-B01 点ごとの大数の法則では足りない理由

- Level: B

「各固定した $\theta$ で $M_n(\theta)\to M(\theta)$」だけでは最大化点の一致性を保証しにくい理由を説明し、sup 型で同時に抑えられるなら何が防げるか述べよ。

<!-- solution-start -->
#### 詳細解答

最大化点 $\widehat\theta_n$ は $n$ と標本に依存して動くので、固定した $\theta$ に対する収束だけでは $\theta=\widehat\theta_n$ での誤差を制御できません。各 $n$ で場所を変える細い大きな誤差が存在すると、各固定点では誤差が最終的に消えても、最大化点がその誤差を追う可能性があります。

一様な収束評価

$$
\sup_{\theta\in\Theta}|M_n(\theta)-M(\theta)|\to0
$$

なら、どの $\theta$ を選んでも誤差が同時に小さくなります。したがって $M$ が真値から離れた場所にもつ「最大値の隙間」を、$M_n$ でも保つことができます。
<!-- solution-end -->

### F0-00P7A-B02 ポアソンモデルで漸近分散まで確認する

- Level: B

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\operatorname{Poisson}(\lambda_0)$、$\lambda_0>0$ とする。

1. 最尤推定量を求めよ。
2. 1標本あたりのフィッシャー情報量を求めよ。
3. [中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から $\sqrt n(\widehat\lambda_n-\lambda_0)$ の極限分布を求め、分散が逆情報量と一致することを確認せよ。

<!-- solution-start -->
#### 詳細解答

対数尤度は、$\lambda$ に依存する部分だけを残すと

$$
\ell_n(\lambda)
=
\left(\sum_{i=1}^{n}X_i\right)\log\lambda
-
n\lambda
+
\text{定数}.
$$

微分すると

$$
\ell_n'(\lambda)
=
\frac{\sum_iX_i}{\lambda}-n.
$$

したがって内部解は

$$
\widehat\lambda_n
=
\frac1n\sum_iX_i
=
\overline X_n.
$$

1標本のスコアは

$$
s_\lambda(X)
=
\frac{X-\lambda}{\lambda}.
$$

$\operatorname{Var}_\lambda(X)=\lambda$ なので

$$
I(\lambda)
=
\frac{\lambda}{\lambda^2}
=
\frac1\lambda.
$$

また [独立同分布・有限分散版の中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt) から

$$
\sqrt n(\overline X_n-\lambda_0)
\Rightarrow
N(0,\lambda_0).
$$

一方

$$
I(\lambda_0)^{-1}
=
\lambda_0.
$$

よって漸近分散は逆フィッシャー情報量と一致します。
<!-- solution-end -->

### F0-00P7A-B03 一致性が2階微分評価に必要な理由

- Level: B

Taylor 展開に現れる $\theta_n^*$ が $\theta_0$ と $\widehat\theta_n$ の間の点であるとする。$\widehat\theta_n\to\theta_0$ in probability から $\theta_n^*\to\theta_0$ in probability を示し、それが2階微分の大数則にどう使われるか説明せよ。

<!-- solution-start -->
#### 詳細解答

$\theta_n^*$ は線分上の点なので

$$
|\theta_n^*-\theta_0|
\le
|\widehat\theta_n-\theta_0|.
$$

右辺が確率収束で0へ行くため、左辺も確率収束で0へ行きます。

真値近傍で

$$
\sup_{|\theta-\theta_0|\le\delta}
\left|
-\frac1nU_n'(\theta)-I(\theta_0)
\right|
\xrightarrow{p}0
$$

が成り立つとします。一致性により $\theta_n^*$ がこの近傍へ入る確率は1へ行くので

$$
-\frac1nU_n'(\theta_n^*)
\xrightarrow{p}
I(\theta_0).
$$

つまり一致性は、ランダムに動く Taylor の中間点を真値近傍へ閉じ込めるために使われています。
<!-- solution-end -->

### F0-00P7A-C01 一致性から漸近正規性まで再構成する

- Level: C

1次元正則モデルについて、次を仮定する。

- $M_n(\theta)=n^{-1}\ell_n(\theta)$ が連続関数 $M$ へ一様確率収束する。
- $M$ は $\theta_0$ で一意最大になる。
- $\widehat\theta_n$ は $M_n$ の近似最大化点である。
- $U_n(\widehat\theta_n)=0$。
- $U_n(\theta_0)/\sqrt n\Rightarrow N(0,I(\theta_0))$。
- 真値近傍で $-n^{-1}U_n'(\theta)$ が $I(\theta_0)>0$ へ一様確率収束する。

この仮定から、$\widehat\theta_n\to\theta_0$ in probability と

$$
\sqrt n(\widehat\theta_n-\theta_0)
\Rightarrow
N(0,I(\theta_0)^{-1})
$$

を順に導け。

<!-- solution-start -->
#### 詳細解答

まず一致性を示します。任意の $\varepsilon>0$ に対し

$$
A_\varepsilon
=
\{\theta:|\theta-\theta_0|\ge\varepsilon\}
$$

と置きます。$M$ の連続性と $\theta_0$ の一意最大性から、ある $\eta>0$ が存在して

$$
\sup_{\theta\in A_\varepsilon}M(\theta)
\le
M(\theta_0)-3\eta.
$$

sup 型の収束により高確率で

$$
\sup_\theta|M_n(\theta)-M(\theta)|<\eta.
$$

その事象上では

$$
M_n(\theta_0)\ge M(\theta_0)-\eta
$$

であり、$\theta\in A_\varepsilon$ では

$$
M_n(\theta)
\le M(\theta_0)-2\eta.
$$

したがって近似最大化点は $A_\varepsilon$ に入れず

$$
\widehat\theta_n\xrightarrow{p}\theta_0.
$$

次に漸近正規性です。スコア方程式を $\theta_0$ のまわりで展開すると

$$
0
=
U_n(\theta_0)
+
U_n'(\theta_n^*)
(\widehat\theta_n-\theta_0)
$$

となる中間点 $\theta_n^*$ が存在します。従って

$$
\sqrt n(\widehat\theta_n-\theta_0)
=
\left\{
-\frac1nU_n'(\theta_n^*)
\right\}^{-1}
\frac{U_n(\theta_0)}{\sqrt n}.
$$

一致性により $\theta_n^*\to\theta_0$ in probability です。真値近傍での sup 型の収束から

$$
-\frac1nU_n'(\theta_n^*)
\xrightarrow{p}
I(\theta_0).
$$

一方

$$
\frac{U_n(\theta_0)}{\sqrt n}
\Rightarrow
N(0,I(\theta_0)).
$$

よって [Slutsky の定理](#thm-f0-00p7a-slutsky) から

$$
\sqrt n(\widehat\theta_n-\theta_0)
\Rightarrow
I(\theta_0)^{-1}Z,
\qquad
Z\sim N(0,I(\theta_0)).
$$

右辺の分散は

$$
I(\theta_0)^{-2}I(\theta_0)
=
I(\theta_0)^{-1}
$$

なので

$$
\sqrt n(\widehat\theta_n-\theta_0)
\Rightarrow
N(0,I(\theta_0)^{-1}).
$$
<!-- solution-end -->

---

## 次に進む

ここでは「密度を通常の意味で微分できる」正則モデルを使い、最尤推定量の漸近正規性を組み立てました。次の [F0-00P7B](../F0_00P7B_QMD_LAN/index.md) では、密度そのものではなく平方根密度を $L^2$ で微分し、局所対数尤度比そのものが正規型へ近づく仕組みを扱います。
