# F0-00P7B 二次平均微分可能性・局所漸近正規性

P7 と P7A では、対数密度を通常の意味で微分し、その微分を積分の中へ入れられる正則モデルを使いました。しかし「密度を点ごとに2回微分できる」といった条件は、座標や密度の表示に依存しやすく、統計的な局所比較に必要な強さより過剰な場合もあります。

ここでは視点を変えます。密度 $p_\theta$ そのものではなく、その平方根

$$
q_\theta:=\sqrt{p_\theta}
$$

を $L^2(\mu)$ の点として見ます。確率密度は $\int p_\theta\,d\mu=1$ なので

$$
\|q_\theta\|_2^2=1.
$$

したがって統計モデルは $L^2(\mu)$ の単位球面上を動く曲線・曲面として見えます。この幾何を一次近似するとスコアとフィッシャー情報量が現れ、その一次近似を独立標本 $n$ 個へ積み上げると局所対数尤度比の正規形が現れます。

---

## 1. 平方根密度の距離で分布を比べる

二つの密度 $p,q$ が似ているかを、平方根密度の $L^2$ 距離で測ります。

<a id="def-f0-00p7b-hellinger"></a>

<!-- formal-statement-start -->
> **定義（Hellinger 距離）**  
> 共通の支配測度 $\mu$ に関する密度 $p,q$ に対して
>
$$
H(P,Q)
:=
\left(
\int(\sqrt p-\sqrt q)^2\,d\mu
\right)^{1/2}
$$
>
> を Hellinger 距離といいます。
<!-- formal-statement-end -->

本章では係数 $1/\sqrt2$ を付けない規約を使います。文献によっては $H^2=(1/2)\int(\sqrt p-\sqrt q)^2d\mu$ と正規化するため、定数因子だけ確認してください。

平方根密度はどちらも $L^2$ ノルム1なので、これは単位球面上の2点間距離です。分布を局所的に比較するとき、「平方根密度が $L^2$ でどの方向へ動くか」を見る理由がここにあります。

---

## 2. 点ごとの Taylor 展開ではなく、$L^2$ 全体で一次近似する

パラメータを $\theta$ から $\theta+h$ へ動かしたとき、平方根密度の差が「$h$ に線形な部分 + それより小さい剰余」に分かれれば、局所幾何を一次近似できます。

<a id="def-f0-00p7b-qmd"></a>

<!-- formal-statement-start -->
> **定義（二次平均微分可能性（quadratic mean differentiability; QMD））**  
> $\theta\in\mathbb R^d$ とします。あるベクトル値関数 $s_\theta\in L^2(P_\theta)^d$ が存在し
>
$$
\int
\left(
\sqrt{p_{\theta+h}}
-
\sqrt{p_\theta}
-
\frac12 h^Ts_\theta\sqrt{p_\theta}
\right)^2
d\mu
=
o(\|h\|^2)
$$
>
> が $h\to0$ で成り立つとき、モデルは $\theta$ で二次平均微分可能であるといいます。
<!-- formal-statement-end -->

剰余を $r_h$ と書けば

$$
\sqrt{p_{\theta+h}}
=
\sqrt{p_\theta}
+
\frac12 h^Ts_\theta\sqrt{p_\theta}
+
r_h,
$$

$$
\|r_h\|_{L^2(\mu)}
=
o(\|h\|).
$$

これは平方根密度写像 $\theta\mapsto\sqrt{p_\theta}$ の $L^2$ における Fréchet 微分です。

<!-- definition-example-start: def-f0-00p7b-qmd -->
**直接例：正規位置モデル**  
$P_\theta=N(\theta,1)$ とします。

$$
\sqrt{p_\theta(x)}
=
(2\pi)^{-1/4}
\exp\left(-\frac{(x-\theta)^2}{4}\right).
$$

$\theta$ で微分すると

$$
\partial_\theta\sqrt{p_\theta(x)}
=
\frac12(x-\theta)\sqrt{p_\theta(x)}.
$$

したがって候補となるスコアは

$$
s_\theta(x)=x-\theta.
$$

このモデルでは平方根密度の2階微分も $L^2$ で局所的に支配できるので、Taylor の剰余は $L^2$ で $o(|h|)$ です。よって QMD 条件を満たします。
<!-- definition-example-end -->

---

## 3. QMD からスコア平均0を取り出す

P7 では、密度を微分してから積分と交換することでスコア平均0を示しました。QMD では、平方根密度の正規化だけから同じ性質が出ます。

$q_\theta=\sqrt{p_\theta}$ とし

$$
q_{\theta+h}
=
q_\theta
+
\frac12h^Ts_\theta q_\theta
+
r_h.
$$

両辺の $L^2$ ノルムは1なので

$$
1
=
\|q_{\theta+h}\|_2^2.
$$

右辺を展開すると

$$
\begin{aligned}
1
&=
\|q_\theta\|_2^2
+
h^T\int s_\theta q_\theta^2\,d\mu\\
&\quad
+
2\langle q_\theta,r_h\rangle
+
\frac14\int(h^Ts_\theta)^2q_\theta^2\,d\mu\\
&\quad
+
\left\langle h^Ts_\theta q_\theta,r_h\right\rangle
+
\|r_h\|_2^2.
\end{aligned}
$$

$\|q_\theta\|_2^2=1$ です。さらに Cauchy--Schwarz の不等式から

$$
|\langle q_\theta,r_h\rangle|
\le
\|r_h\|_2
=
o(\|h\|),
$$

他の二次以上の項は $O(\|h\|^2)$ または $o(\|h\|^2)$ です。従って一次項だけを取り出すと

$$
h^TE_\theta[s_\theta(X)]
=
o(\|h\|).
$$

任意の方向 $h$ について成り立つため

$$
\boxed{
E_\theta[s_\theta(X)]=0
}
$$

です。

ここでは「密度の微分と積分を交換する」という P7 の証明を使っていません。平方根密度の $L^2$ 微分可能性そのものが平均0を保証しています。

---

## 4. フィッシャー情報量は一次変化方向の Gram 行列になる

QMD の一次項は

$$
\frac12h^Ts_\theta\sqrt{p_\theta}.
$$

方向 $a,b\in\mathbb R^d$ に対応する一次変化方向の $L^2$ 内積は

$$
\begin{aligned}
\left\langle
\frac12a^Ts_\theta\sqrt{p_\theta},
\frac12b^Ts_\theta\sqrt{p_\theta}
\right\rangle
&=
\frac14
E_\theta[
(a^Ts_\theta)(b^Ts_\theta)
]\\
&=
\frac14
a^T
E_\theta[s_\theta s_\theta^T]
b.
\end{aligned}
$$

そこで

$$
\boxed{
I(\theta)
:=
E_\theta[s_\theta s_\theta^T]
}
$$

が局所幾何の Gram 行列として現れます。

また Hellinger 距離を QMD 展開へ代入すると

$$
H^2(P_{\theta+h},P_\theta)
=
\frac14 h^TI(\theta)h
+
o(\|h\|^2).
$$

つまりフィッシャー情報行列は、パラメータを $h$ だけ動かしたとき分布が Hellinger 距離でどれだけ離れるかを2次近似する量です。この見方を、ここでは**フィッシャー情報の局所Hilbert幾何**と呼びます。

---

## 5. なぜ局所差は $1/\sqrt n$ なのか

1標本でパラメータ差 $h$ による二乗 Hellinger 距離が

$$
\frac14h^TI(\theta_0)h
+
o(\|h\|^2)
$$

なら、独立標本を $n$ 個重ねると局所的な識別能力はおおよそ $n$ 倍になります。

そこでパラメータ差を

$$
h_n=\frac{h}{\sqrt n}
$$

と取ると

$$
n\,h_n^TI(\theta_0)h_n
=
h^TI(\theta_0)h,
$$

となり、情報量が0にも無限大にもならない有限の尺度に残ります。

このため局所代替を

$$
\theta_n
=
\theta_0+\frac{h}{\sqrt n}
$$

と置きます。

---

## 6. スコア和を有限な揺らぎへ正規化する

局所対数尤度比の一次項には、スコアベクトルの和が現れます。$n$ 個の和は標準偏差が $\sqrt n$ の大きさなので

<a id="def-f0-00p7b-central-sequence"></a>

<!-- formal-statement-start -->
> **定義（中心列）**  
> 真値 $\theta_0$ におけるスコアベクトルを $s_{\theta_0}$ とするとき
>
$$
\Delta_n
:=
\frac1{\sqrt n}
\sum_{i=1}^{n}s_{\theta_0}(X_i)
$$
>
> を中心列といいます。
<!-- formal-statement-end -->

QMD から $E_{\theta_0}[s_{\theta_0}]=0$、フィッシャー情報行列の定義から

$$
E_{\theta_0}[s_{\theta_0}s_{\theta_0}^T]
=
I(\theta_0).
$$

ベクトルの分布収束は、任意の1次元射影へ落として確認できます。

<a id="thm-f0-00p7b-cramer-wold"></a>

<!-- formal-statement-start -->
> **定理（Cramér--Wold の判定法）**  
> $\mathbb R^d$ 値確率ベクトル $Y_n,Y$ について
>
$$
Y_n\Rightarrow Y
$$
>
> であることと、全ての $a\in\mathbb R^d$ に対して
>
$$
a^TY_n\Rightarrow a^TY
$$
>
> であることは同値です。
<!-- formal-statement-end -->

この定理は、ベクトル全体を直接扱う代わりに、任意方向への射影を1変量の問題として調べればよいことを保証します。

<!-- proof-start -->
### 証明：特性関数を通して射影とベクトルを往復する

まず $Y_n\Rightarrow Y$ とします。P6 の有限次元版 Lévy 連続性定理の逆向きから、全ての $t\in\mathbb R^d$ で

$$
\varphi_{Y_n}(t)\to\varphi_Y(t).
$$

任意の $a\in\mathbb R^d$ と $u\in\mathbb R$ を固定すると

$$
\varphi_{a^TY_n}(u)
=
E[e^{iu a^TY_n}]
=
\varphi_{Y_n}(ua)
\to
\varphi_Y(ua)
=
\varphi_{a^TY}(u).
$$

1次元の Lévy 連続性定理より $a^TY_n\Rightarrow a^TY$ です。

逆に、全ての $a$ で $a^TY_n\Rightarrow a^TY$ とします。任意の $t\in\mathbb R^d$ を固定し、射影方向として $a=t$ を選びます。1次元の Lévy 連続性定理の逆向きから

$$
\varphi_{Y_n}(t)
=
\varphi_{t^TY_n}(1)
\to
\varphi_{t^TY}(1)
=
\varphi_Y(t).
$$

したがって P6 の[確率ベクトルの特性関数収束定理](../F0_00P6_特性関数_中心極限定理/index.md#thm-f0-00p6-levy-continuity-vector)より

$$
Y_n\Rightarrow Y.
$$
<!-- proof-end -->

この判定法を中心列へ適用します。

<a id="thm-f0-00p7b-central-sequence-clt"></a>

<!-- formal-statement-start -->
> **定理（中心列の中心極限定理）**  
> 独立同分布標本について $E_{\theta_0}\|s_{\theta_0}(X)\|^2<\infty$ なら
>
$$
\Delta_n
\Rightarrow
N_d(0,I(\theta_0)).
$$
<!-- formal-statement-end -->

証明では、固定した方向 $a$ への射影を P6A の1変量中心極限定理へ入力します。

<!-- proof-start -->
### 証明：各射影へ1変量中心極限定理を適用する

任意の $a\in\mathbb R^d$ について

$$
a^T\Delta_n
=
\frac1{\sqrt n}
\sum_{i=1}^{n}
a^Ts_{\theta_0}(X_i).
$$

各項の平均は0、分散は

$$
\operatorname{Var}(a^Ts_{\theta_0}(X))
=
a^TI(\theta_0)a.
$$

したがって [P6A の中心極限定理](../F0_00P6A_iid_中心極限定理/index.md#thm-iid-clt)から

$$
a^T\Delta_n
\Rightarrow
N(0,a^TI(\theta_0)a).
$$

これは $Z\sim N_d(0,I(\theta_0))$ に対する射影 $a^TZ$ の分布です。Cramér--Wold の判定法より

$$
\Delta_n\Rightarrow N_d(0,I(\theta_0)).
$$
<!-- proof-end -->

---

## 7. QMD から局所対数尤度比の正規形へ

ここからの目標は、平方根密度の $L^2$ 一次近似を、独立標本全体の対数尤度比へ変換することです。結論を先に固定すると、どの中間式が何のために必要か追いやすくなります。

<a id="thm-f0-00p7b-lan"></a>

<!-- formal-statement-start -->
> **定理（QMD から局所漸近正規性）**  
> 統計モデルが $\theta_0\in\mathbb R^d$ で QMD であり、独立同分布標本 $X_1,\ldots,X_n\sim P_{\theta_0}$ を考えます。フィッシャー情報行列
>
$
I(\theta_0)
=
E_{\theta_0}[s_{\theta_0}s_{\theta_0}^T]
$
>
> が有限であるとします。固定した $h\in\mathbb R^d$ に対して
>
$
\log
\frac{
dP_{\theta_0+h/\sqrt n}^{\otimes n}
}{
dP_{\theta_0}^{\otimes n}
}
=
h^T\Delta_n
-
\frac12h^TI(\theta_0)h
+
o_{P_{\theta_0}}(1),
$
>
> かつ
>
$
\Delta_n
\Rightarrow
N_d(0,I(\theta_0)).
$
>
> この性質を局所漸近正規性（local asymptotic normality; LAN）といいます。
<!-- formal-statement-end -->

### 証明の見取り図

1. $t_n=h/\sqrt n$ と置き、QMD を平方根密度比 $1+q_n$ の形へ直します。
2. 密度の正規化から $E[q_n]$ に $-h^TIh/(8n)$ の補正が現れることを示します。
3. $2\log(1+q)=2q-q^2+R(q)$ の剰余を $n$ 個足しても消えることを確認します。
4. 一次項を中心列 $h^T\Delta_n$、二次項を $-\frac12h^TIh$ へ整理します。

<!-- proof-start -->
### 証明

#### Step 1：QMD を1標本の尤度比へ変換する

LAN の核心は、QMD の平方根密度展開を、$n$ 個の対数尤度比の和へ変えることです。ここを「標準結果」として飛ばさず、主要中間式を追います。

$t_n=h/\sqrt n$ と置きます。$P_{\theta_0}$ の下では $p_{\theta_0}(X)>0$ がほとんど確実に成り立つので、その集合上で QMD 展開を $q_{\theta_0}=\sqrt{p_{\theta_0}}$ で割ると

$$
\sqrt{
\frac{p_{\theta_0+t_n}}{p_{\theta_0}}
}
=
1
+
\frac12t_n^Ts_{\theta_0}
+
\rho_n
$$

と書けます。ここで

$$
E_{\theta_0}[\rho_n^2]
=
o(\|t_n\|^2)
=
o(n^{-1})
$$

です。

なお $\{p_{\theta_0}=0\}$ 上では QMD の一次項も $p_{\theta_0}^{1/2}$ も0なので、QMD 条件そのものから

$$
\alpha_n
:=
\int_{\{p_{\theta_0}=0\}}
p_{\theta_0+t_n}\,d\mu
=
o(n^{-1})
$$

が従います。つまり局所代替が真値の支持の外へ置く確率質量は、1標本あたり $o(n^{-1})$ しかありません。

ここで

$$
q_{n}
:=
\frac12t_n^Ts_{\theta_0}
+
\rho_n
$$

と置くと、$P_{\theta_0}$-ほとんど確実に

$$
\sqrt{
\frac{p_{\theta_0+t_n}}{p_{\theta_0}}
}
=
1+q_n.
$$

平方して

$$
\frac{p_{\theta_0+t_n}}{p_{\theta_0}}
=
(1+q_n)^2
$$

なので、真値の下で観測される点では1標本の対数密度比は

$$
\log
\frac{p_{\theta_0+t_n}}{p_{\theta_0}}
=
2\log(1+q_n).
$$

これで QMD の $L^2$ 展開が、対数尤度比の Taylor 展開へ接続されました。

---

#### Step 2：正規化条件が二次の平均補正を作る

局所漸近正規性の二次項 $-\frac12h^TIh$ は、単に「2階微分したから」現れるのではありません。密度比の平均が1であることから、QMD の剰余の平均に二次補正が入ります。

$X\sim P_{\theta_0}$ とすると

$$
E_{\theta_0}[(1+q_n)^2]
=
\int_{\{p_{\theta_0}>0\}}
p_{\theta_0+t_n}\,d\mu
=
1-\alpha_n,
$$

ここで前節の $\alpha_n=o(n^{-1})$ です。従って

$$
2E[q_n]+E[q_n^2]
=
-\alpha_n
=
o(n^{-1}).
$$

一方

$$
q_n
=
\frac1{2\sqrt n}h^Ts_{\theta_0}
+
\rho_n.
$$

QMD の剰余条件と Cauchy--Schwarz の不等式から

$$
E[q_n^2]
=
\frac1{4n}
h^TI(\theta_0)h
+
o(n^{-1}).
$$

したがって

$$
E[q_n]
=
-\frac1{8n}
h^TI(\theta_0)h
+
o(n^{-1}).
$$

この平均補正が、後で $n$ 個足したとき有限な二次項になります。

---

#### Step 3：対数の剰余を $n$ 個足しても消えることを確認する

$|u|$ が十分小さいとき

$$
2\log(1+u)
=
2u-u^2+R(u),
$$

かつある定数 $C$ に対して

$$
|R(u)|
\le
C|u|^3
$$

です。

各観測 $X_i$ に対応する $q_{n,i}$ を考えます。必要なのは

$$
\max_{1\le i\le n}|q_{n,i}|
\xrightarrow{p}0
$$

と

$$
\sum_{i=1}^{n}q_{n,i}^2
=
O_P(1)
$$

です。

まずスコア部分について、二乗可積分性から

$$
x^2P(\|s_{\theta_0}(X)\|>x)\to0
$$

なので

$$
nP\left(
\|s_{\theta_0}(X)\|>\varepsilon\sqrt n
\right)
\to0.
$$

和事象評価により

$$
\max_{i\le n}
\frac{\|s_{\theta_0}(X_i)\|}{\sqrt n}
\xrightarrow{p}0.
$$

剰余についても

$$
nP(|\rho_{n,i}|>\varepsilon)
\le
\frac{nE[\rho_n^2]}{\varepsilon^2}
\to0.
$$

従って最大 $|q_{n,i}|$ は0へ確率収束します。

また

$$
\sum_{i=1}^{n}q_{n,i}^2
=
\frac1{4n}
\sum_{i=1}^{n}
(h^Ts_{\theta_0}(X_i))^2
+
o_P(1)
$$

であり、大数の法則から

$$
\sum_{i=1}^{n}q_{n,i}^2
\xrightarrow{p}
\frac14h^TI(\theta_0)h.
$$

よって

$$
\sum_{i=1}^{n}|R(q_{n,i})|
\le
C
\left(\max_{i\le n}|q_{n,i}|\right)
\sum_{i=1}^{n}q_{n,i}^2
\xrightarrow{p}0.
$$

これで対数 Taylor の3次以上の剰余を、$n$ 個足しても無視できることが確認できました。

---

#### Step 4：局所対数尤度比を組み立てる

独立標本の対数尤度比は

$$
\Lambda_n(h)
:=
\log
\frac{
dP_{\theta_0+h/\sqrt n}^{\otimes n}
}{
dP_{\theta_0}^{\otimes n}
}.
$$

前節の展開から

$$
\Lambda_n(h)
=
2\sum_{i=1}^{n}q_{n,i}
-
\sum_{i=1}^{n}q_{n,i}^2
+
o_P(1).
$$

第1項を平均と中心化部分に分けます。

$$
2\sum_{i=1}^{n}q_{n,i}
=
2\sum_{i=1}^{n}(q_{n,i}-E[q_n])
+
2nE[q_n].
$$

$q_n=\frac1{2\sqrt n}h^Ts_{\theta_0}+\rho_n$ なので

$$
2\sum_{i=1}^{n}(q_{n,i}-E[q_n])
=
h^T\Delta_n
+
2\sum_{i=1}^{n}
(\rho_{n,i}-E[\rho_n]).
$$

剰余の中心化和は

$$
E\left[
\left\{
\sum_{i=1}^{n}
(\rho_{n,i}-E[\rho_n])
\right\}^2
\right]
\le
nE[\rho_n^2]
=
o(1)
$$

なので $o_P(1)$ です。従って

$$
2\sum_{i=1}^{n}(q_{n,i}-E[q_n])
=
h^T\Delta_n+o_P(1).
$$

また

$$
2nE[q_n]
=
-\frac14h^TI(\theta_0)h+o(1),
$$

かつ

$$
\sum_{i=1}^{n}q_{n,i}^2
=
\frac14h^TI(\theta_0)h+o_P(1).
$$

以上を合わせると

$$
\boxed{
\Lambda_n(h)
=
h^T\Delta_n
-
\frac12h^TI(\theta_0)h
+
o_{P_{\theta_0}}(1)
}
$$

を得ます。

<!-- proof-end -->

## 8. 局所漸近正規性として何が得られたか
ここで「正規」という語は、元の観測分布が正規分布であるという意味ではありません。局所的な対数尤度比が

$$
h^TZ-\frac12h^TIh,
\qquad
Z\sim N_d(0,I)
$$

という正規シフト型の形へ近づくことを意味します。

---

## 9. P7A の Taylor 展開と何が違うか

P7A では、推定量を決めるスコア方程式

$$
U_n(\widehat\theta_n)=0
$$

を真値まわりで Taylor 展開しました。そこで必要だったのは、対数密度の通常微分や、真値近傍で2階微分を同時に安定化させる大数則です。

ここでは推定量を先に選びません。局所パラメータ

$$
\theta_0+\frac{h}{\sqrt n}
$$

の間の**実験そのものの尤度比**を展開しています。QMD は平方根密度の $L^2$ 一次近似だけを仮定し、その近似を積み上げて LAN を得ます。

したがって LAN は「特定の推定量が正規になる」より一段上で、局所統計問題全体が正規シフト型へ近づくことを記述しています。

---

## 10. LAN が後続理論の入口になる理由

LAN が得られると、局所的な推定・検定問題を

$$
Z\sim N_d(Ih,I)
$$

に対応する正規シフト実験と比較できるようになります。ここから

- 効率的推定量の漸近分散
- Wald 型・スコア型・尤度比型検定の局所比較
- Le Cam の第三補題
- 効率性の限界分布を記述する発展定理
- local asymptotic minimax theorem

へ進みます。

この章では QMD から LAN が出る証明機構までを閉じ、これらの発展結果は後続で扱います。

---

## 演習

### F0-00P7B-A01 正規位置モデルで QMD の一次項を確認する

- Level: A

$P_\theta=N(\theta,1)$ とする。平方根密度を $\theta$ で微分し、QMD のスコアが $s_\theta(x)=x-\theta$ になることを確認せよ。

<!-- solution-start -->
#### 詳細解答

平方根密度は

$$
q_\theta(x)
=
(2\pi)^{-1/4}
\exp\left(
-\frac{(x-\theta)^2}{4}
\right).
$$

微分すると

$$
\partial_\theta q_\theta(x)
=
\frac{x-\theta}{2}q_\theta(x).
$$

QMD の一次項は

$$
\frac12h\,s_\theta(x)q_\theta(x)
$$

なので

$$
s_\theta(x)=x-\theta
$$

と読めます。これは通常の対数密度

$$
\log p_\theta(x)
=
-\frac12(x-\theta)^2+\text{定数}
$$

を微分して得るスコアとも一致します。
<!-- solution-end -->

### F0-00P7B-A02 QMD からスコア平均0を取り出す

- Level: A

$$
q_{\theta+h}
=
q_\theta
+
\frac12h^Ts_\theta q_\theta
+
r_h,
\qquad
\|r_h\|_2=o(\|h\|)
$$

と $\|q_{\theta+h}\|_2=\|q_\theta\|_2=1$ を使い、$E_\theta[s_\theta]=0$ を示せ。

<!-- solution-start -->
#### 詳細解答

両辺の二乗ノルムを展開すると

$$
0
=
h^TE_\theta[s_\theta]
+
2\langle q_\theta,r_h\rangle
+
O(\|h\|^2)
+
o(\|h\|^2).
$$

Cauchy--Schwarz の不等式から

$$
|\langle q_\theta,r_h\rangle|
\le
\|q_\theta\|_2\|r_h\|_2
=
o(\|h\|).
$$

従って

$$
h^TE_\theta[s_\theta]
=
o(\|h\|).
$$

$h=ta$ として $t\downarrow0$ とすれば

$$
a^TE_\theta[s_\theta]=0
$$

が任意の $a$ で成り立つので

$$
E_\theta[s_\theta]=0.
$$
<!-- solution-end -->

### F0-00P7B-A03 $1/\sqrt n$ 尺度を情報量から導く

- Level: A

1標本の局所 Hellinger 距離が

$$
H^2(P_{\theta+h},P_\theta)
=
\frac14h^TI(\theta)h+o(\|h\|^2)
$$

であるとする。独立標本 $n$ 個で局所差を $h_n=c_nh$ としたとき、二次の総情報量 $n c_n^2h^TIh$ を有限の非零量に保つために $c_n$ が何次であるべきか求めよ。

<!-- solution-start -->
#### 詳細解答

独立標本を $n$ 個重ねると、局所的な二次情報量の尺度は $n$ 倍になります。従って

$$
nc_n^2h^TIh
$$

を $n$ に依存しない有限の大きさへ保つには

$$
nc_n^2\asymp1
$$

が必要です。よって

$$
c_n\asymp n^{-1/2}.
$$

標準的には

$$
c_n=\frac1{\sqrt n}
$$

と取り

$$
\theta_n=\theta+\frac{h}{\sqrt n}
$$

とします。
<!-- solution-end -->

### F0-00P7B-A04 中心列の1次元射影

- Level: A

$$
\Delta_n
=
\frac1{\sqrt n}
\sum_{i=1}^{n}s_{\theta_0}(X_i)
$$

とする。任意の $a\in\mathbb R^d$ について $a^T\Delta_n$ の平均と分散を求め、1次元中心極限定理を適用した極限を書け。

<!-- solution-start -->
#### 詳細解答

$$
a^T\Delta_n
=
\frac1{\sqrt n}
\sum_{i=1}^{n}
a^Ts_{\theta_0}(X_i).
$$

QMD から $E[s_{\theta_0}]=0$ なので各項の平均は0です。また

$$
\operatorname{Var}(a^Ts_{\theta_0}(X))
=
a^T
E[s_{\theta_0}s_{\theta_0}^T]
a
=
a^TI(\theta_0)a.
$$

従って1次元中心極限定理から

$$
a^T\Delta_n
\Rightarrow
N(0,a^TI(\theta_0)a).
$$
<!-- solution-end -->

### F0-00P7B-B01 正規化から $E[q_n]$ の二次補正を求める

- Level: B

$$
\sqrt{
\frac{p_{\theta_0+h/\sqrt n}}{p_{\theta_0}}
}
=
1+q_n
$$

とし

$$
E[q_n^2]
=
\frac1{4n}h^TI(\theta_0)h+o(n^{-1})
$$

が分かっているとする。さらに真値の支持の外へ出る局所代替の確率質量を

$
\alpha_n
:=
\int_{\{p_{\theta_0}=0\}}
p_{\theta_0+h/\sqrt n}\,d\mu
=
o(n^{-1})
$

とする。正規化条件から $E[q_n]$ の主要項を求めよ。

<!-- solution-start -->
#### 詳細解答

$P_{\theta_0}$ の下で見える密度比は $(1+q_n)^2$ です。ただし局所代替が真値の支持の外へ置く確率質量 $\alpha_n$ はこの期待値に含まれないので

$
E[(1+q_n)^2]
=
1-\alpha_n.
$

従って

$
2E[q_n]+E[q_n^2]
=
-\alpha_n,
$

すなわち

$
E[q_n]
=
-\frac12E[q_n^2]
-\frac12\alpha_n.
$

仮定を代入すると

$
E[q_n]
=
-\frac12
\left\{
\frac1{4n}h^TI(\theta_0)h+o(n^{-1})
\right\}
-\frac12o(n^{-1}),
$

よって

$
E[q_n]
=
-\frac1{8n}h^TI(\theta_0)h
+
o(n^{-1}).
$

$n$ 個の観測で $2nE[q_n]$ とすると $-\frac14h^TIh$ が残ります。
<!-- solution-end -->

### F0-00P7B-B02 対数 Taylor の剰余をまとめて消す

- Level: B

$|R(u)|\le C|u|^3$、$\max_{i\le n}|q_{n,i}|\to0$ in probability、$\sum_iq_{n,i}^2=O_P(1)$ とする。

$$
\sum_{i=1}^{n}R(q_{n,i})
\xrightarrow{p}0
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

各項について

$$
|R(q_{n,i})|
\le
C|q_{n,i}|^3
=
C|q_{n,i}|\,q_{n,i}^2.
$$

従って

$$
\sum_{i=1}^{n}|R(q_{n,i})|
\le
C
\left(
\max_{i\le n}|q_{n,i}|
\right)
\sum_{i=1}^{n}q_{n,i}^2.
$$

第1因子は $o_P(1)$、第2因子は $O_P(1)$ なので積は $o_P(1)$ です。従って絶対値で抑えた和も0へ確率収束し

$$
\sum_iR(q_{n,i})
\xrightarrow{p}0.
$$
<!-- solution-end -->

### F0-00P7B-B03 QMD の剰余和が消える理由

- Level: B

$E[\rho_n^2]=o(n^{-1})$ とし、$\rho_{n,1},\ldots,\rho_{n,n}$ は各行で独立同分布とする。

$$
\sum_{i=1}^{n}
(\rho_{n,i}-E[\rho_n])
\xrightarrow{p}0
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

中心化和の分散は独立性から

$$
\operatorname{Var}\left(
\sum_{i=1}^{n}
(\rho_{n,i}-E[\rho_n])
\right)
=
n\operatorname{Var}(\rho_n).
$$

分散は二乗平均以下なので

$$
n\operatorname{Var}(\rho_n)
\le
nE[\rho_n^2]
=
o(1).
$$

チェビシェフの不等式から、任意の $\varepsilon>0$ について

$$
P\left(
\left|
\sum_{i=1}^{n}
(\rho_{n,i}-E[\rho_n])
\right|>\varepsilon
\right)
\le
\frac{o(1)}{\varepsilon^2}
\to0.
$$

従って中心化剰余和は0へ確率収束します。
<!-- solution-end -->

### F0-00P7B-C01 QMD から LAN を紙上で再構成する

- Level: C

固定した $h\in\mathbb R^d$ に対して $t_n=h/\sqrt n$ とする。QMD から

$$
\sqrt{
\frac{p_{\theta_0+t_n}}{p_{\theta_0}}
}
=
1+q_n,
\qquad
q_n
=
\frac1{2\sqrt n}h^Ts_{\theta_0}
+
\rho_n,
$$

$
E[\rho_n^2]=o(n^{-1})
$

が得られているとする。また

$
\alpha_n
:=
\int_{\{p_{\theta_0}=0\}}
p_{\theta_0+t_n}\,d\mu
=
o(n^{-1})
$

とする。次を順に示し

$$
\log
\frac{
dP_{\theta_0+h/\sqrt n}^{\otimes n}
}{
dP_{\theta_0}^{\otimes n}
}
=
h^T\Delta_n
-\frac12h^TI(\theta_0)h
+o_P(1)
$$

を導け。

1. $E[q_n^2]=\frac1{4n}h^TIh+o(n^{-1})$。
2. $E[q_n]=-\frac1{8n}h^TIh+o(n^{-1})$。
3. $\sum_iq_{n,i}^2\to\frac14h^TIh$ in probability。
4. $2\sum_i(q_{n,i}-E[q_n])=h^T\Delta_n+o_P(1)$。
5. 対数 Taylor の剰余和が $o_P(1)$。

<!-- solution-start -->
#### 詳細解答

まず

$$
q_n
=
\frac1{2\sqrt n}h^Ts_{\theta_0}
+
\rho_n.
$$

二乗すると

$$
q_n^2
=
\frac1{4n}(h^Ts_{\theta_0})^2
+
\frac1{\sqrt n}
(h^Ts_{\theta_0})\rho_n
+
\rho_n^2.
$$

第1項の期待値は

$$
\frac1{4n}
h^TI(\theta_0)h.
$$

交差項は Cauchy--Schwarz の不等式から

$$
\left|
E[(h^Ts_{\theta_0})\rho_n]
\right|
\le
\{E[(h^Ts_{\theta_0})^2]\}^{1/2}
\{E[\rho_n^2]\}^{1/2}
=
o(n^{-1/2}).
$$

従って前の係数 $n^{-1/2}$ と合わせて $o(n^{-1})$ です。最後の項も $o(n^{-1})$ なので

$$
E[q_n^2]
=
\frac1{4n}h^TI(\theta_0)h
+
o(n^{-1}).
$$

次に、$P_{\theta_0}$ の下で見える密度比の期待値は、真値の支持の外へ出る質量 $\alpha_n$ を除いて

$
E[(1+q_n)^2]
=
1-\alpha_n.
$

従って

$
2E[q_n]+E[q_n^2]
=
-\alpha_n,
$

よって

$
\begin{aligned}
E[q_n]
&=
-\frac12E[q_n^2]
-\frac12\alpha_n\\
&=
-\frac1{8n}h^TI(\theta_0)h
+
o(n^{-1}).
\end{aligned}
$

各観測に対応する $q_{n,i}$ を取ります。QMD 剰余の二乗平均が $o(n^{-1})$ なので、二乗和の主項だけが残り

$$
\sum_{i=1}^{n}q_{n,i}^2
=
\frac1{4n}
\sum_{i=1}^{n}
(h^Ts_{\theta_0}(X_i))^2
+
o_P(1).
$$

大数の法則から

$$
\frac1n
\sum_{i=1}^{n}
(h^Ts_{\theta_0}(X_i))^2
\xrightarrow{p}
h^TI(\theta_0)h.
$$

従って

$$
\sum_iq_{n,i}^2
\xrightarrow{p}
\frac14h^TI(\theta_0)h.
$$

また

$$
2\sum_i(q_{n,i}-E[q_n])
=
\frac1{\sqrt n}
\sum_i h^Ts_{\theta_0}(X_i)
+
2\sum_i(\rho_{n,i}-E[\rho_n]).
$$

第1項は $h^T\Delta_n$ です。第2項の分散は

$$
4n\operatorname{Var}(\rho_n)
\le
4nE[\rho_n^2]
=o(1)
$$

なので $o_P(1)$ です。従って

$$
2\sum_i(q_{n,i}-E[q_n])
=
h^T\Delta_n+o_P(1).
$$

対数について

$$
2\log(1+q)
=
2q-q^2+R(q),
$$

$|R(q)|\le C|q|^3$ を使います。有限二次モーメントと QMD 剰余から

$$
\max_i|q_{n,i}|\xrightarrow{p}0
$$

であり、二乗和は $O_P(1)$ なので

$$
\sum_i|R(q_{n,i})|
\le
C
\max_i|q_{n,i}|
\sum_iq_{n,i}^2
=
o_P(1).
$$

従って独立標本の対数尤度比は

$$
\begin{aligned}
\Lambda_n(h)
&=
2\sum_iq_{n,i}
-
\sum_iq_{n,i}^2
+
o_P(1)\\
&=
2\sum_i(q_{n,i}-E[q_n])
+
2nE[q_n]
-
\sum_iq_{n,i}^2
+
o_P(1)\\
&=
h^T\Delta_n
-
\frac14h^TIh
-
\frac14h^TIh
+
o_P(1)\\
&=
h^T\Delta_n
-
\frac12h^TIh
+
o_P(1).
\end{aligned}
$$

さらに中心列の中心極限定理から

$$
\Delta_n
\Rightarrow
N_d(0,I(\theta_0)).
$$

これが局所漸近正規性です。
<!-- solution-end -->

---

## 次に進む

これで、確率測度・密度・特性関数・大数の法則・中心極限定理から出発し、正則統計モデルの局所対数尤度比が正規シフト型へ近づくところまで接続できました。ここから先は、LAN を使って効率性・局所検定・Le Cam 理論を統一的に扱う発展層へ進めます。
