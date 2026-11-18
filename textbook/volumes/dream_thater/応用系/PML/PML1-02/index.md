# PML1-02 有限状態からGibbs分布を構成できるか

<!-- definition-example-audit: strict -->

## 1. 最も小さい状態を選ぶだけでよいのか

前講では、[有限状態の指数重み](../PML1-01/index.md#def-pml1-01-temperature-scale)は正であっても、その和が1とは限らないことを確認した。例えばエネルギーが $0$ と $\Delta>0$ の二状態では、正の尺度 $\tau$ に対して重みは $1$ と $e^{-\Delta/\tau}$ である。これらをそのまま「確率」と呼ぶことはできない。

ここで解きたい問いは、**有限個の状態それぞれに正の重みが与えられたとき、合計1の確率をどう作り、どれほどの頻度で高エネルギー状態を選ぶか**である。最低エネルギーを持つ状態だけを選ぶ決定的な規則と、有限の温度尺度で複数の状態を選び分ける確率的な規則を区別しよう。

本講で扱うのは非空有限集合、有限な実数値エネルギー、正の尺度である。物理的な正準分布の一般構成と熱浴条件は[SM3の有限正準アンサンブル](../../../物理系/SM/SM3/index.md#def-sm3-canonical)で既習とし、ここではその公式を**学習候補の選択に移すと何が言えて、何が言えないか**を計算する。熱浴に接するという物理的仮定は、学習損失から自動的には生じない。

## 2. 分配関数は重みを確率へ変える

非空有限集合 $\Omega$ の各状態 $s$ に、同じ単位の有限なエネルギー $E(s)$ を対応させる。$\tau>0$ はエネルギーと同じ単位を持つ。有限和

$$
Z_\tau=\sum_{s\in\Omega}\exp\left(-\frac{E(s)}{\tau}\right)
$$

を分配関数と呼ぶ。これは[SM3の定義](../../../物理系/SM/SM3/index.md#def-sm3-canonical)における $\beta=1/\tau$ の場合である。$\Omega$ は空でなく、すべての指数重みが有限かつ正なので $0<Z_\tau<\infty$ が成立する。したがって

$$
p_\tau(s)=\frac{\exp(-E(s)/\tau)}{Z_\tau}
$$

は $0<p_\tau(s)<1$（ただし一状態だけなら $p_\tau(s)=1$）を満たし、

$$
\sum_{s\in\Omega}p_\tau(s)
=\frac{\sum_s\exp(-E(s)/\tau)}{Z_\tau}=1
$$

となる。確率の規格化の一般命題は[SM3の正準分布の規格化](../../../物理系/SM/SM3/index.md#prop-sm3-normalization)で証明されている。ここでの式は各分子を同じ正の和で割る操作を実際に確かめたものである。

例えば $\Omega=\{a,b\}$、$E(a)=0$、$E(b)=\Delta$、$\Delta>0$ とすれば、$r=e^{-\Delta/\tau}$ と書いて

$$
Z_\tau=1+r,\qquad p_\tau(a)=\frac1{1+r},\qquad
p_\tau(b)=\frac r{1+r}.
$$

両確率の和は1であり、$0<r<1$ だから $p_\tau(a)>p_\tau(b)>0$ である。**低い方が選ばれやすいこと**と、**高い方も正の確率を持つこと**を混同してはいけない。

### 物理モデルと学習モデルの差

物理では $E$ がエネルギー、$\tau=k_{\mathrm B}T$（$k_{\mathrm B}>0$、絶対温度 $T>0$）である。一方、候補パラメータの損失 $L(\theta)$ が無次元なら $\tau_{\mathrm{alg}}>0$ も無次元でなければならない。物理的熱浴の存在を仮定しないまま同じ数式を使う際には、これは**選択確率の設計**であって熱平衡の証明ではない。

候補の損失を使った確率化を、本講で扱う対象として次のように定める。ここで「選択」とは確率を指定するだけであり、実際にその確率でサンプリングするアルゴリズムまで自動的に定めるものではない。

<a id="def-pml1-02-finite-loss-gibbs"></a>

<!-- formal-statement-start -->
> **定義（有限候補のGibbs選択則）**  
> 非空有限集合 $\Theta$、有限実数値の損失 $L:\Theta\to\mathbb R$、$L$ と同じ単位を持つ正の尺度 $\tau_{\mathrm{alg}}>0$ を与える。このとき選択確率 $q_{\tau_{\mathrm{alg}}}:\Theta\to(0,1]$ を
>
> $$q_{\tau_{\mathrm{alg}}}(\theta)=
> \frac{\exp(-L(\theta)/\tau_{\mathrm{alg}})}
> {\sum_{\eta\in\Theta}\exp(-L(\eta)/\tau_{\mathrm{alg}})}$$
>
> と定める。分母は正の有限和であり、全候補の確率の合計は1となる。$\tau_{\mathrm{alg}}$ は選択の尺度であり、物理的な絶対温度とは限らない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-02-finite-loss-gibbs -->
**定義の確認**。無次元の損失を持つ $\Theta=\{A,B\}$ に対し $L(A)=0$、$L(B)=\log2$、$\tau_{\mathrm{alg}}=1$ とする。候補は非空有限、損失は有限、尺度は正で無次元であり、

$$
e^{-L(A)/\tau_{\mathrm{alg}}}=1,\qquad
e^{-L(B)/\tau_{\mathrm{alg}}}=\frac12,\qquad
Z_{\mathrm{alg}}=\frac32.
$$

したがって $q(A)=2/3$、$q(B)=1/3$。両者は正で和が1なので、定義の非自明な条件をすべて満たす。この例では物理的エネルギーを一切指定していない。
<!-- definition-example-end -->

## 3. 二状態の確率の比と温度尺度

分配関数を直接計算しなくても、確率の**比**からどちらを選びやすいかがわかる。二状態模型の $p_\tau(b)/p_\tau(a)=e^{-\Delta/\tau}$ は、分母 $Z_\tau$ が相殺されるためである。差 $\Delta$ が正なら、尺度 $\tau$ が小さいほど比は小さい。

<a id="prop-pml1-02-two-state-odds"></a>

<!-- formal-statement-start -->
> **命題（二状態のGibbs確率と選択比）**  
> $\Omega=\{a,b\}$、$E(a)=E_0\in\mathbb R$、$E(b)=E_0+\Delta$、$\Delta>0$ とする。各エネルギーと同じ単位の $\tau>0$ について、$p_\tau(s)=e^{-E(s)/\tau}/Z_\tau$ とすると
>
> $$\frac{p_\tau(b)}{p_\tau(a)}=e^{-\Delta/\tau},\qquad
> p_\tau(b)=\frac1{1+e^{\Delta/\tau}},\qquad
> p_\tau(a)=1-p_\tau(b).$$
>
> $p_\tau(b)$ は $\tau$ に関して厳密に増加し、$0<p_\tau(b)<1/2$ である。
<!-- formal-statement-end -->

### 証明の見取り図

分配関数で割った二つの数の比を取って共通因子を消す。確率が増えることは、指数を $\tau$ で微分して示す。

<!-- proof-start -->
### 証明

[正準Gibbs分布](../../../物理系/SM/SM3/index.md#def-sm3-canonical)を二状態へ適用する。まず

$$
\begin{aligned}
Z_\tau
&=e^{-E_0/\tau}+e^{-(E_0+\Delta)/\tau}\\
&=e^{-E_0/\tau}\left(1+e^{-\Delta/\tau}\right).
\end{aligned}
$$

正の共通因子で約分すれば $p_\tau(b)=e^{-\Delta/\tau}/(1+e^{-\Delta/\tau})=1/(1+e^{\Delta/\tau})$。また分母を共有するので $p_\tau(b)/p_\tau(a)=e^{-\Delta/\tau}$。$\Delta/\tau>0$ から $e^{\Delta/\tau}>1$ となり、$0<p_\tau(b)<1/2$。

増加性について $r(\tau)=e^{-\Delta/\tau}$ とおくと、連鎖律で

$$
r'(\tau)=e^{-\Delta/\tau}\frac{\Delta}{\tau^2}
=r(\tau)\frac{\Delta}{\tau^2}>0.
$$

商の微分により

$$
\frac{d}{d\tau}p_\tau(b)
=\frac{r'(1+r)-rr'}{(1+r)^2}
=\frac{\Delta r}{\tau^2(1+r)^2}>0.
$$

すべての因子が正なので、厳密な増加性が示された。
<!-- proof-end -->

**数値で確かめる**。$E(a)=0$、$E(b)=2\,\mathrm J$、$\tau=1\,\mathrm J$ のとき $r=e^{-2}\approx0.135335$ なので $p_\tau(b)\approx0.119203$、$p_\tau(a)\approx0.880797$ となる。確率を足すと1で、確率比も約0.135335である。温度尺度を大きくしても $p_\tau(b)$ が $1/2$ を超えることはない。

## 4. 平均エネルギーを確率から計算する

一度状態に確率を与えれば、各エネルギーを確率で重み付けした平均（期待値）を計算できる。二状態では平均 $U_\tau$ と分散 $V_\tau$ を次の有限和で表す。

$$
U_\tau=\sum_{s\in\Omega}p_\tau(s)E(s),\qquad
V_\tau=\sum_s p_\tau(s)\bigl(E(s)-U_\tau\bigr)^2.
$$

以後、状態 $s$ に対する確率 $p_\tau(s)$ で平均を取る演算を $\mathbb E_\tau$ と書く。例えば $g:\mathbb R\to\mathbb R$ に対し

$$
\mathbb E_\tau[g(E)]=\sum_{s\in\Omega}p_\tau(s)g(E(s))
$$

である。したがって $U_\tau=\mathbb E_\tau[E]$、$V_\tau=\mathbb E_\tau[E^2]-U_\tau^2$ とも書ける。ここで最初の $E$ はエネルギー関数、$\mathbb E_\tau$ は期待値の演算子であり、混同しない。平均はエネルギーの単位、分散はその二乗の単位を持つ。**分配関数自体は無次元**なので、$Z_\tau$ と平均エネルギーを同じ量と呼んではいけない。

<a id="prop-pml1-02-two-state-response"></a>

<!-- formal-statement-start -->
> **命題（二状態の平均・分散・温度応答）**  
> $\Omega=\{a,b\}$、$E(a)=0$、$E(b)=\Delta>0$、$\tau>0$ はエネルギーと同じ単位を持ち、$r=e^{-\Delta/\tau}$、$p_\tau(s)=e^{-E(s)/\tau}/(1+r)$ とする。このとき
>
> $$U_\tau=\frac{\Delta r}{1+r},\qquad
> V_\tau=\frac{\Delta^2r}{(1+r)^2},\qquad
> \frac{dU_\tau}{d\tau}=\frac{V_\tau}{\tau^2}>0.$$
>
> 物理的に $\tau=k_{\mathrm B}T$、$k_{\mathrm B}>0$、$T>0$ が成り立ち、$\Delta$ と $k_{\mathrm B}$ が温度に依存しないとする。このとき $U(T):=U_{k_{\mathrm B}T}$ と定めれば
>
> $$\frac{dU}{dT}=\frac{V_\tau}{k_{\mathrm B}T^2}>0.$$
<!-- formal-statement-end -->

### 証明の見取り図

$E(a)=0$ なので、平均は励起側の確率に $\Delta$ を掛けたもの。分散は二乗の期待値から平均の二乗を引く。微分には前節で求めた $r'(\tau)$ を使い、最後だけ温度 $T$ への連鎖律を施す。

<!-- proof-start -->
### 証明

[二状態のGibbs確率と選択比](#prop-pml1-02-two-state-odds)から、ここでは $p(a)=p_\tau(a)=1/(1+r)$、$p(b)=p_\tau(b)=r/(1+r)$ である。よって

$$
U_\tau=0\cdot p(a)+\Delta p(b)=\frac{\Delta r}{1+r}
$$

であり、同様に二乗の期待値を**項ごとに**書くと

$$
\sum_s p(s)E(s)^2=0^2p(a)+\Delta^2p(b)=\frac{\Delta^2r}{1+r}.
$$

分散を引き算で求めれば

$$
\begin{aligned}
V_\tau
&=\frac{\Delta^2r}{1+r}
-\left(\frac{\Delta r}{1+r}\right)^2\\
&=\frac{\Delta^2r(1+r)-\Delta^2r^2}{(1+r)^2}
=\frac{\Delta^2r}{(1+r)^2}.
\end{aligned}
$$

$\Delta$ を固定し、前節の $r'=\Delta r/\tau^2$ を代入して

$$
\frac{dU_\tau}{d\tau}
=\Delta\frac{r'(1+r)-rr'}{(1+r)^2}
=\frac{\Delta^2r}{\tau^2(1+r)^2}
=\frac{V_\tau}{\tau^2}.
$$

ここでは分母は正、$\Delta>0$ なので厳密に正である。一般の有限正準分布についても[分配関数の微分とエネルギー揺らぎ](../../../物理系/SM/SM3/index.md#thm-sm3-energy-variance)から同じ結論が出るが、今回は二状態の和から独立に再現した。

さらに $\tau=k_{\mathrm B}T$、$d\tau/dT=k_{\mathrm B}$ だから

$$
\frac{dU}{dT}
=\frac{dU_\tau}{d\tau}\frac{d\tau}{dT}
=\frac{V_\tau}{\tau^2}k_{\mathrm B}
=\frac{V_\tau}{k_{\mathrm B}T^2}.
$$

温度依存の $\Delta(T)$ を導入した場合は追加の微分項が出るため、この式をそのまま使えない。
<!-- proof-end -->

例えば $\Delta=2\,\mathrm J$、$\tau=1\,\mathrm J$ では

$$
U_\tau=\frac{2e^{-2}}{1+e^{-2}}\,\mathrm J\approx0.238406\,\mathrm J,\qquad
V_\tau=\frac{4e^{-2}}{(1+e^{-2})^2}\,\mathrm J^2\approx0.419974\,\mathrm J^2.
$$

この二状態の平均はエネルギーの最小値0ではない。「期待値」と「最小値」は別の操作である。

## 5. 基準の変更と尺度の変更を見分ける

前講の[正倍率と基準移動による最小点の不変性](../PML1-01/index.md#prop-pml1-01-affine-minimizers)は、最小化解についての命題だった。Gibbs確率全体まで不変にするには、エネルギーの倍率に合わせて温度尺度も変える必要がある。

この節で使う $E'(s)$ と $\tau'$ のプライムは**変換後の量**を示し、前節の $r'(\tau)=dr/d\tau$ のような微分を表さない。後の反例や演習で使う $p'$ も変換後の確率を表す。

<a id="prop-pml1-02-affine-covariance"></a>

<!-- formal-statement-start -->
> **命題（Gibbs確率と尺度の同時変換）**  
> 非空有限 $\Omega$、有限な実数値 $E:\Omega\to\mathbb R$、$\tau>0$ と、$a>0$、$b\in\mathbb R$ を与える。すべて同じ単位系へ整えた上で $E'(s)=aE(s)+b$、$\tau'=a\tau$ とすると
>
> $$\frac{e^{-E'(s)/\tau'}}{\sum_t e^{-E'(t)/\tau'}}
> =\frac{e^{-E(s)/\tau}}{\sum_t e^{-E(t)/\tau}}$$
>
> が任意の $s\in\Omega$ について成り立つ。
> $a$ は無次元の正の倍率、$b$ は $E$ と同じ単位を持つ共通のエネルギー基準の変更量とする。
<!-- formal-statement-end -->

### 証明の見取り図

分子と分母から同じ指数因子をくくり出して約分する。

<!-- proof-start -->
### 証明

$\tau'=a\tau>0$ であり、有限和の全項について

$$
e^{-E'(s)/\tau'}
=e^{-(aE(s)+b)/(a\tau)}
=e^{-b/(a\tau)}e^{-E(s)/\tau}.
$$

従って

$$
\sum_t e^{-E'(t)/\tau'}
=e^{-b/(a\tau)}\sum_t e^{-E(t)/\tau}.
$$

共通因子は正なので、分子と分母で約分できる。これが述べた確率の一致である。
<!-- proof-end -->

**倍率だけ変える反例**。二状態 $E(a)=0$、$E(b)=1$、$\tau=1$ では $p(b)=1/(1+e)$ だが、$E'=2E$、$\tau'=1$ とすると $p'(b)=1/(1+e^2)$ になる。最小状態 $a$ は変わらないが、選択確率は変わった。

## 6. 状態を数える単位によって確率は変わる

「エネルギーが0」と「エネルギーが $\Delta$」という二つの**準位**があっても、配置が二通りとは限らない。状態集合を $\Omega=\{a_1,a_2,b\}$ とし、$E(a_1)=E(a_2)=0$、$E(b)=\Delta>0$ とする。二つの基底配置と一つの励起配置があるので、分配関数は

$$
Z_\tau=1+1+e^{-\Delta/\tau}=2+r.
$$

各配置には $p(a_1)=p(a_2)=1/(2+r)$、$p(b)=r/(2+r)$ が割り当てられる。[SM3の準位表示](../../../物理系/SM/SM3/index.md#prop-sm3-normalization)では、準位 $u\in E(\Omega)$ の確率は、そのエネルギーを持つ配置の確率をすべて足したものとする。すなわち

$$
P_\tau(E=u)=\sum_{\substack{s\in\Omega\\E(s)=u}}p_\tau(s).
$$

以下では固定した尺度 $\tau$ を添字から省略し、$P(E=u)$ とも書く。この三状態では

$$
P(E=0)=\frac2{2+r},\qquad P(E=\Delta)=\frac r{2+r}.
$$

[SM1のエネルギー準位ごとの状態数](../../../物理系/SM/SM1/index.md#def-sm1-density-of-states)と[SM3の準位表示](../../../物理系/SM/SM3/index.md#prop-sm3-normalization)を三状態へ代入した結果である。準位を二つ数えて一律 $1/2$ とする計算は、配置の多重度を落としてしまう。

一般に最小エネルギーを達成する配置全体 $M=\{s:E(s)=E_{\min}\}$ は非空である。$E(s)-E_{\min}\ge0$ を使うと

$$
p_\tau(s)=\frac{e^{-(E(s)-E_{\min})/\tau}}
{\sum_t e^{-(E(t)-E_{\min})/\tau}}
$$

となる。$\tau\to0+$ では $s\in M$ の分子は1、それ以外では0へ収束するため、有限和の分母は $|M|$ へ近づく。従って極限確率は $M$ 上で一様、$M$ の外で0となる。逆に $\tau\to\infty$ ではすべての分子が1へ近づき、各配置の確率は $1/|\Omega|$ へ近づく。**有限の正の $\tau$ ではすべての配置に正の確率が残る**ことも忘れない。

## 7. 学習でGibbs重みを使うときの注意

- 学習候補 $\theta$ の確率 $q_\tau(\theta)$ は**候補を選ぶ確率**であり、観測データ $(x,y)$ の確率モデルを指定するものではない。[損失のデータ依存性](../PML1-01/index.md#def-pml1-01-data-objective)により、$D$ を変えれば同じ候補の重みも変わり得る。
- 任意の目的関数を $e^{-L/\tau}$ へ入れても、その学習アルゴリズムの実行が Gibbs 分布へ収束するとは結論できない。実際の遷移規則、不変分布、収束条件は別に検討しなければならない。
- [SM3での物理的正準分布](../../../物理系/SM/SM3/index.md#def-sm3-canonical)は熱浴等の仮定と結び付く。一方、アルゴリズム的尺度を物理温度へ読み替えるには追加の模型が必要である。分配関数を使っただけで熱力学が学習器に成立するわけではない。
- 次講では、**なぜこの分布を選ぶのか**を平均エネルギーとエントロピーの釣合いから特徴付ける。正規化して確率を作ったことと、分布の選択に変分的な理由を与えたことを区別する。

### 二状態の数値検算

以下は標準ライブラリだけで、$\Delta=2$、$\tau=0.5,1,2$ における分配関数・励起確率・平均を再現する最小コードである。ここでのエネルギーと $\tau$ は共通単位に換算済みの数値とし、実行結果を物理的温度の測定値とは呼ばない。

```python
from math import exp

gap = 2.0
for tau in (0.5, 1.0, 2.0):
    r = exp(-gap / tau)
    z = 1.0 + r
    p_excited = r / z
    mean = gap * p_excited
    variance = gap * gap * p_excited * (1.0 - p_excited)
    print(f"{tau:.1f} {z:.6f} {p_excited:.6f} {mean:.6f} {variance:.6f}")
```

手計算に戻るときは $p_\tau(b)=r/(1+r)$、$U_\tau=\Delta p_\tau(b)$、$V_\tau=\Delta^2p_\tau(b)(1-p_\tau(b))$ を照合する。さらに $r=e^{-\Delta/\tau}\in(0,1)$ と $dr/d\tau=\Delta r/\tau^2>0$ から、分散についても

$$
\frac{dV_\tau}{d\tau}
=\Delta^2\frac{1-r}{(1+r)^3}\frac{dr}{d\tau}
=\frac{\Delta^3r(1-r)}{\tau^2(1+r)^3}>0
$$

となる。この二状態模型では尺度を大きくすると励起確率も分散も増えるが、有限状態の別の模型で同じ分散の単調性を使うには改めて検証が必要である。

## 演習

### PML1-02-A01 三配置と規格化
- Level: A
- 目安時間: 10分

$\Omega=\{a,b,c\}$、エネルギー $E(a)=0$、$E(b)=E(c)=\varepsilon>0$、$\tau=\varepsilon$ とする。分配関数と各配置の確率を求め、和が1であることを確認せよ。

<!-- solution-start -->
#### 詳細解答

[分配関数](../../../物理系/SM/SM3/index.md#def-sm3-canonical)の有限和へ代入する。指数の入力は $0,1,1$ なので、重みは $1,e^{-1},e^{-1}$ となる。従って

$$
Z=1+2e^{-1},\quad p(a)=\frac1{1+2e^{-1}},\quad
p(b)=p(c)=\frac{e^{-1}}{1+2e^{-1}}.
$$

三確率の和は $(1+2e^{-1})/(1+2e^{-1})=1$。すべて正で、励起準位の確率は一配置の確率ではなく $p(b)+p(c)=2e^{-1}/(1+2e^{-1})$ である。
<!-- solution-end -->

### PML1-02-A02 学習損失の指数化
- Level: A
- 目安時間: 10分

$\Theta=\{A,B\}$、無次元損失 $L(A)=0$、$L(B)=\log4$、$\tau_{\mathrm{alg}}=1$ に対し、選択確率とその比 $q(B)/q(A)$ を求めよ。

<!-- solution-start -->
#### 詳細解答

[有限候補のGibbs選択則](#def-pml1-02-finite-loss-gibbs)に代入すると $w(A)=1$、$w(B)=e^{-\log4}=1/4$。分母は $Z=5/4$ なので

$$
q(A)=\frac{1}{5/4}=\frac45,\qquad
q(B)=\frac{1/4}{5/4}=\frac15,\qquad
\frac{q(B)}{q(A)}=\frac14.
$$

確率の和は1である。これは候補選択の規則であり、データの確率分布までは与えない。
<!-- solution-end -->

### PML1-02-A03 確率を指定する尺度
- Level: A
- 目安時間: 10分

$E(a)=0$、$E(b)=\Delta>0$ で、$\tau=\Delta/\log3$ とする。$p_\tau(b)$、$U_\tau$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\log3>0$ なので $\tau>0$。指数比は $r=e^{-\Delta/\tau}=e^{-\log3}=1/3$。したがって[二状態のGibbs確率と選択比](#prop-pml1-02-two-state-odds)より

$$
p_\tau(b)=\frac{1/3}{1+1/3}=\frac14.
$$

$E(a)=0$ だから $U_\tau=0\cdot(3/4)+\Delta\cdot(1/4)=\Delta/4$。平均はエネルギーの単位を持つ。
<!-- solution-end -->

### PML1-02-A04 基準と倍率を同時に変える
- Level: A
- 目安時間: 10分

二状態のエネルギー $(0,2)$ と $\tau=1$（共通単位で表す）を $E'=3E+4$、$\tau'=3$ へ移す。両模型の励起確率の比 $p(b)/p(a)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

元のエネルギー差は2、変更後のエネルギーは $(E'(a),E'(b))=(4,10)$ で差は6である。[二状態のGibbs確率と選択比](#prop-pml1-02-two-state-odds)をそれぞれの尺度に適用すると

$$
\frac{p(b)}{p(a)}=e^{-2/1}=e^{-2},\qquad
\frac{p'(b)}{p'(a)}=e^{-6/3}=e^{-2}.
$$

ここで $p'$ は変換後の分布を表し、微分ではない。$a=3>0,b=4,\tau'=3\tau$ であるため、[Gibbs確率と尺度の同時変換](#prop-pml1-02-affine-covariance)の仮定も満たす。両模型とも規格化後の励起確率は $e^{-2}/(1+e^{-2})$ で一致する。
<!-- solution-end -->

### PML1-02-B01 平均と分散を二通りに求める
- Level: B
- 目安時間: 20分

二状態のエネルギー $0,\Delta>0$、尺度 $\tau>0$ とする。分散を $\mathbb E_\tau[E^2]-(\mathbb E_\tau[E])^2$ と $\sum_s p_\tau(s)(E(s)-U_\tau)^2$ の両方法で求め、同じ式になることを示せ。

<!-- solution-start -->
#### 詳細解答

[二状態のGibbs確率と選択比](#prop-pml1-02-two-state-odds)の $r=e^{-\Delta/\tau}$ を使う。第一法では

$$
\mathbb E_\tau[E^2]=\frac{\Delta^2r}{1+r},\qquad
U=\frac{\Delta r}{1+r},
$$

なので

$$
\mathbb E_\tau[E^2]-U^2
=\frac{\Delta^2r(1+r)-\Delta^2r^2}{(1+r)^2}
=\frac{\Delta^2r}{(1+r)^2}.
$$

第二法では $p(a)=1/(1+r)$、$p(b)=r/(1+r)$ だから

$$
\begin{aligned}
\sum_s p(s)(E(s)-U)^2
&=\frac1{1+r}\left(\frac{-\Delta r}{1+r}\right)^2
+\frac r{1+r}\left(\frac{\Delta}{1+r}\right)^2\\
&=\frac{\Delta^2r^2+\Delta^2r}{(1+r)^3}
=\frac{\Delta^2r}{(1+r)^2}.
\end{aligned}
$$

二式は一致し、分散はエネルギーの二乗単位で正である。
<!-- solution-end -->

### PML1-02-B02 最小点は同じでも分布が違う
- Level: B
- 目安時間: 15分

$E(a)=0$、$E(b)=1$、$\tau=1$ とし、$E'=2E$、$\tau'=1$ とする。最小点と励起確率をそれぞれ比較せよ。$\tau'$ をどう直せば確率が一致するか。

<!-- solution-start -->
#### 詳細解答

元の分布は $Z=1+e^{-1}$、$p(b)=e^{-1}/(1+e^{-1})=1/(1+e)$。変更後は $Z'=1+e^{-2}$、$p'(b)=1/(1+e^2)$ となり、$e^2>e$ なので $p'(b)<p(b)$。双方の最小状態は $a$ だが分布は異なる。

[正倍率による最小点の不変性](../PML1-01/index.md#prop-pml1-01-affine-minimizers)は倍率が正であることだけを要する。一方、[Gibbs確率と尺度の同時変換](#prop-pml1-02-affine-covariance)は $\tau'=2\tau=2$ を要求する。これに直すと $E'(b)/\tau'=2/2=1$ となり元の確率へ戻る。
<!-- solution-end -->

### PML1-02-B03 準位と配置の区別
- Level: B
- 目安時間: 20分

$\Omega=\{a_1,a_2,b\}$、$E(a_1)=E(a_2)=0$、$E(b)=\Delta>0$ とする。$P(E=\Delta)$ を求め、$\tau\to\infty$、$\tau\to0+$ の各極限を計算せよ。「準位二つなので高温で各準位1/2」とする議論の誤りを説明せよ。

<!-- solution-start -->
#### 詳細解答

三配置それぞれの重みは $1,1,r$（$r=e^{-\Delta/\tau}$）なので $Z=2+r$。励起準位には $b$ しか属さず

$$
P(E=\Delta)=p(b)=\frac r{2+r}.
$$

$\tau\to\infty$ で $-\Delta/\tau\to0$、従って $r\to1$ なので確率は $1/(2+1)=1/3$。$\tau\to0+$ では $-\Delta/\tau\to-\infty$、$r\to0$ なので確率は0へ近づく。

高温で等確率になるのは $a_1,a_2,b$ の**三配置**である。基底準位には2配置、励起準位には1配置あるため、準位の確率は $2/3,1/3$ に分かれる。[準位ごとの状態数](../../../物理系/SM/SM1/index.md#def-sm1-density-of-states)を落とすと誤る。
<!-- solution-end -->

### PML1-02-B04 確率の微分を状態ごとに確認する
- Level: B
- 目安時間: 25分

非空有限 $\Omega$、温度非依存の有限な $E(s)$、$\tau>0$ とし、$p_\tau(s)=e^{-E(s)/\tau}/Z_\tau$、$U_\tau=\sum_s p_\tau(s)E(s)$ とする。$dp_\tau(s)/d\tau=p_\tau(s)(E(s)-U_\tau)/\tau^2$ を示し、それを用いて $dU_\tau/d\tau$ を分散で表せ。

<!-- solution-start -->
#### 詳細解答

有限和なので各項を微分できる。$w_s=e^{-E(s)/\tau}$ について連鎖律から $w_s'=w_sE(s)/\tau^2$。従って

$$
Z_\tau'=\sum_s w_s'=\frac1{\tau^2}\sum_s w_sE(s)
=\frac{Z_\tau U_\tau}{\tau^2}.
$$

$Z_\tau>0$ なので商の微分を使え、

$$
\begin{aligned}
p_\tau'(s)
&=\frac{w_s'Z_\tau-w_sZ_\tau'}{Z_\tau^2}\\
&=\frac{w_s}{Z_\tau}\left(\frac{E(s)}{\tau^2}-\frac{U_\tau}{\tau^2}\right)
=\frac{p_\tau(s)(E(s)-U_\tau)}{\tau^2}.
\end{aligned}
$$

総和を取ると $\sum_s p_\tau'(s)=(U_\tau-U_\tau)/\tau^2=0$ で規格化の微分とも一致する。$E(s)$ は温度に依存しないので

$$
\begin{aligned}
U_\tau'
&=\sum_s E(s)p_\tau'(s)\\
&=\frac{\sum_s p_\tau(s)E(s)^2-U_\tau\sum_s p_\tau(s)E(s)}{\tau^2}\\
&=\frac{\mathbb E_\tau[E^2]-U_\tau^2}{\tau^2}
=\frac{\operatorname{Var}_\tau(E)}{\tau^2}.
\end{aligned}
$$

これは[SM3のエネルギー揺らぎ定理](../../../物理系/SM/SM3/index.md#thm-sm3-energy-variance)の $\beta=1/\tau$ 表示と一致する。非負性は分散の定義による。
<!-- solution-end -->

### PML1-02-C01 零温度と高温の極限
- Level: C
- 目安時間: 30分

非空有限集合 $\Omega$ と $E:\Omega\to\mathbb R$、$\tau>0$ を与える。$M=\{s:E(s)=\min_t E(t)\}$、$m=|M|$ とおく。$p_\tau(s)=e^{-E(s)/\tau}/Z_\tau$ について、各状態ごとに $\tau\to0+$ と $\tau\to\infty$ の極限を証明せよ。$m>1$ の場合、最低エネルギー状態のうち一つだけが選ばれるとは限らないことを説明せよ。

<!-- solution-start -->
#### 詳細解答

有限非空集合なので $E_{\min}$ を達成する状態は少なくとも一つあり $m\ge1$。各 $s$ に $\delta_s=E(s)-E_{\min}\ge0$ を定める。[基準エネルギーの同時平行移動に対する確率の不変性](#prop-pml1-02-affine-covariance)（$a=1,b=-E_{\min}$）から

$$
p_\tau(s)=\frac{e^{-\delta_s/\tau}}{\sum_t e^{-\delta_t/\tau}}.
$$

$\tau\to0+$ では $\delta_s=0$ のとき分子は常に1、$\delta_s>0$ のとき分子は0に収束する。分母は有限個の項の和なので極限と和を交換でき、$\sum_t e^{-\delta_t/\tau}\to m>0$。よって

$$
\lim_{\tau\to0+}p_\tau(s)=
\begin{cases}1/m&(s\in M),\\0&(s\notin M).\end{cases}
$$

逆に $\tau\to\infty$ では各固定状態で $\delta_s/\tau\to0$、全分子が1に収束し、分母は $|\Omega|$ に収束する。よって $\lim_{\tau\to\infty}p_\tau(s)=1/|\Omega|$。

例えば二つの最小配置があるなら、零温度極限は各々 $1/2$ である。最低エネルギーを「一つに決定する」という結論には、唯一の最小配置など追加の仮定が要る。
<!-- solution-end -->

### PML1-02-C02 三候補学習と温度応答の統合
- Level: C
- 目安時間: 35分

無次元損失 $L(A)=0$、$L(B)=L(C)=1$ を持つ三候補について $\tau_{\mathrm{alg}}=1/\log2$ とする。次を順に求め、最後にこの構成を物理的熱平衡と呼べるか説明せよ。

- Gibbs選択確率
- 損失の平均と分散
- 損失を固定したときの $d\mathbb E_\tau[L]/d\tau$（ここで $\tau=\tau_{\mathrm{alg}}$ と略記する）
- $L'=2L+7$、$\tau'_{\mathrm{alg}}=2\tau_{\mathrm{alg}}$ としたときの新しい選択確率

<!-- solution-start -->
#### 詳細解答

$\log2>0$ なので $\tau_{\mathrm{alg}}>0$。指数重みは $e^0=1$、$e^{-\log2}=1/2$、$1/2$ であり、分配関数は $Z=2$。ゆえに[有限候補のGibbs選択則](#def-pml1-02-finite-loss-gibbs)から

$$
q(A)=\frac12,\qquad q(B)=q(C)=\frac14.
$$

三確率の和は1で、各々正である。平均は

$$
U=0\cdot\frac12+1\cdot\frac14+1\cdot\frac14=\frac12.
$$

ここでは $U_\tau:=\mathbb E_\tau[L]=\sum_\theta q_\tau(\theta)L(\theta)$、$V_\tau:=\mathbb E_\tau[L^2]-U_\tau^2$ とする。損失の二乗も $0,1,1$ だから $\mathbb E_\tau[L^2]=1/2$、従って $V_\tau=1/2-(1/2)^2=1/4$ である。

有限で尺度に依存しない損失なので、[SM3のエネルギー揺らぎ定理](../../../物理系/SM/SM3/index.md#thm-sm3-energy-variance)のエネルギーを $L$、逆尺度を $\beta=1/\tau$ と読み替えられる。ここで $dU/d\beta=-V$ と $d\beta/d\tau=-1/\tau^2$ に連鎖律を適用すると

$$
\frac{dU_\tau}{d\tau}
=\frac{dU}{d\beta}\frac{d\beta}{d\tau}
=(-V_\tau)\left(-\frac1{\tau^2}\right)
=\frac{V_\tau}{\tau^2}
$$

であり、

$$
\left.\frac{dU_\tau}{d\tau}\right|_{\tau=1/\log2}
=\frac{V}{\tau^2}
=\frac{1/4}{(1/\log2)^2}
=\frac{(\log2)^2}{4}.
$$

最後に $L'(A)=7$、$L'(B)=L'(C)=9$。$a=2>0$、$b=7$、$\tau'=2\tau$ なので[Gibbs確率と尺度の同時変換](#prop-pml1-02-affine-covariance)より新しい確率は $(1/2,1/4,1/4)$ のままである。ここに物理的なエネルギー・熱浴・絶対温度は指定されていないので、数学的に Gibbs 形であることだけから物理的熱平衡とは呼べない。
<!-- solution-end -->
