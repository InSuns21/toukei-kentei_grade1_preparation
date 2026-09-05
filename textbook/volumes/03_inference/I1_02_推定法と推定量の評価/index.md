# I1-02 推定法と推定量の評価

前章 I1-01 では「尤度を最大にする」という一つの原理から推定量を作りました。しかし、推定量の作り方は最尤法だけではありません。母集団の平均や分散と標本の平均や分散を対応させる**モーメント法**、観測値とモデル値のずれを小さくする**最小二乗法**もあります。

そして、推定量を作った後には別の問題が残ります。平均的に正しいのか、標本数を増やせば真値へ近づくのか、同じ条件の推定量の中でどれだけ分散が小さいのか。本章では

$$
\boxed{\text{推定量を作る}\;\longrightarrow\;\text{性質を測る}\;\longrightarrow\;\text{達成可能な分散下限と比べる}}
$$

という流れで、推定法と評価基準を一つにつなげます。

本章は [通常教材の執筆スタイルガイド](../../../style-guide.md)、[共通演習規約](../../../../EXERCISE_GUIDELINES.md)、[共通記号ガイド](../../../../references/notation-guide.md)、[共通用語ガイド](../../../../references/terminology-guide.md)、[分布・記号ガイド](../../../../references/distribution-notation-guide.md) に従います。

関連章:

- [I1-01 尤度・最尤推定](../I1_01_尤度_最尤推定/index.md): 尤度・スコア・最尤推定の基本。
- [P4-02](../../02_distributions/P4_02_確率変数の収束_大数則_中心極限定理/index.md): 収束概念の復習。
- [L1-02 重回帰・線形モデルの行列表現](../../04_linear_models/L1_02_重回帰_線形モデルの行列表現/index.md): 線形モデルと通常最小二乗法の復習。
- I2-01 漸近推測・デルタ法: 本章の一致性・フィッシャー情報量を、最尤推定量の漸近正規性へ進める。

## この章で解けるようになる問題

- モーメント条件を立て、1母数・2母数モデルのモーメント推定量を求める。
- 残差平方和を微分し、位置母数や線形モデルの最小二乗推定量を導出する。
- バイアス、分散、平均二乗誤差を計算し、MSE分解で推定量を比較する。
- 不偏性と一致性を区別し、「不偏ではないが一致的」な推定量を判定する。
- 複数の不偏測定値を、逆分散に比例する重みで最適に統合する。
- ガウス・マルコフの定理がいう「最良」の意味を行列で説明する。
- ベルヌーイ、ポアソン、正規、指数分布のフィッシャー情報量を計算する。
- クラーメル・ラオ不等式を導出し、推定量が下限を達成するか判定する。
- 一様分布のような非正則モデルで、クラーメル・ラオ下限を無条件に使ってはいけない理由を説明する。

## 公式出題範囲との対応

| 範囲 | 本章の内容 |
|---|---|
| モーメント法 | 母集団モーメントと標本モーメントの等置、1母数・2母数例 |
| 最小二乗法 | 残差平方和の最小化、位置母数、線形モデル |
| BLUE | 逆分散重み、ガウス・マルコフの定理 |
| 不偏性 | バイアス、標本分散、順序統計量の補正 |
| 一致性 | 確率収束、平均二乗誤差からの十分条件、大数則 |
| 有効性 | 分散比較、クラーメル・ラオ下限の達成、相対効率 |
| フィッシャー情報量 | スコア二乗、二階微分表示、独立標本での加法性 |
| クラーメル・ラオ不等式 | 一般の $g(\theta)$ に対する分散下限と等号条件 |

## 前提知識チェック

1. I1-01: 尤度、対数尤度、スコア関数を計算できる。
2. P4-02: 確率収束と大数則の意味を説明できる。
3. L1-02: $Y=X\beta+\varepsilon$ の行列表現と通常最小二乗法推定量を知っている。
4. 共分散と Cauchy--Schwarz 不等式を使える。

---

## 1. 推定量を「作る」と「評価する」は別の問題

たとえば $X_1,\ldots,X_n$ が平均 $\mu$ の分布から得られたとします。標本平均 $\bar X$ は自然な推定量です。しかし、別の推定量

$$
T_n=\frac{n}{n+1}\bar X
$$

も作れます。後者には小さなバイアスがありますが、$n\to\infty$ では係数が1へ近づくため、条件次第では一致的です。

つまり

- **不偏か**: 有限標本で期待値が真値に一致するか。
- **一致的か**: 標本数を増やしたとき真値へ確率的に近づくか。
- **精度がよいか**: 分散や平均二乗誤差が小さいか。

は別々の問いです。

---

## 2. モーメント法

母数を $\theta=(\theta_1,\ldots,\theta_k)$ とし、母集団の最初の $k$ 個の原点モーメントを

$$
\mu_r'(\theta)=E_\theta[X^r],\qquad r=1,\ldots,k
$$

とします。対応する標本モーメントは

$$
m_r'=\frac1n\sum_{i=1}^nX_i^r.
$$

<a id="def-i1-02-moment-method"></a>

<!-- formal-statement-start -->
> **定義（モーメント法）**  
> 母数の個数と同じ数の母集団モーメントを標本モーメントに等置し、その連立方程式を母数について解いて得る推定量をモーメント推定量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-moment-method -->
**定義の確認**  
$X_1,\ldots,X_n\sim U(0,\theta)$ では $E[X]=\theta/2$ と $\bar X$ を等置して $\hat\theta_{\mathrm{MM}}=2\bar X$ を得ます。母集団モーメントと標本モーメントを等置して母数を解く、という定義そのものの計算です。
<!-- definition-example-end -->

### 2.1 一様分布 $U(0,\theta)$

$$
E[X]=\frac\theta2
$$

なので

$$
\bar X=\frac\theta2
$$

と置けば

$$
\boxed{\hat\theta_{\mathrm{MM}}=2\bar X}.
$$

I1-01 で求めた最尤推定量は $X_{(n)}$ でした。同じ母数を推定していても、推定原理が違えば推定量は違います。

### 2.2 2母数ガンマ分布

形状 $a>0$、尺度 $b>0$ のガンマ分布では

$$
E[X]=ab,
\qquad
\operatorname{Var}(X)=ab^2.
$$

標本の第1原点モーメントを $m_1'=\bar X$、第2原点モーメントを $m_2'=n^{-1}\sum X_i^2$ とすると、標本側の

$$
m_2'-(m_1')^2
$$

を母分散 $ab^2$ に対応させて

$$
\boxed{
\hat a_{\mathrm{MM}}
=\frac{(m_1')^2}{m_2'-(m_1')^2},
\qquad
\hat b_{\mathrm{MM}}
=\frac{m_2'-(m_1')^2}{m_1'}
}.
$$

モーメント法は尤度の微分が難しい場合にも方程式を作りやすい一方、有限標本での不偏性や最小分散性が自動的に保証されるわけではありません。

---

## 3. 最小二乗法

観測値 $y_i$ とモデル値 $m_i(\theta)$ の差

$$
e_i=y_i-m_i(\theta)
$$

を残差とし、その平方和

$$
Q(\theta)=\sum_i e_i^2
$$

を最小にするのが最小二乗法です。

<a id="def-i1-02-least-squares"></a>

<!-- formal-statement-start -->
> **定義（最小二乗推定量）**  
> 残差平方和 $Q(\theta)$ を母数空間上で最小にする値を最小二乗推定値とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-least-squares -->
**定義の確認**  
位置母数モデル $m_i(\mu)=\mu$ では $Q(\mu)=\sum_i(X_i-\mu)^2$ です。$Q'(\mu)=0$ を解くと $\hat\mu=\bar X$ となり、残差平方和を最小にする値という定義を具体的に確認できます。
<!-- definition-example-end -->

### 3.1 位置母数の最小二乗

モデル値が全観測で共通の $\mu$ なら

$$
Q(\mu)=\sum_{i=1}^n(X_i-\mu)^2.
$$

微分して

$$
Q'(\mu)=-2\sum_i(X_i-\mu)=0
$$

より

$$
\boxed{\hat\mu_{\mathrm{LS}}=\bar X}.
$$

正規誤差モデルでは最小二乗推定量と最尤推定量が一致しますが、**最小二乗法は残差平方和、最尤法は確率モデルの尤度を最適化している**ため、一般には同じ方法ではありません。

---

## 3A. 公式シラバス補完：推定量の相対効率と「その他の手法」

<a id="def-i1-02-relative-efficiency"></a>

<!-- formal-statement-start -->
> **定義（推定量の相対効率）**  
> 同じ母数 $\theta$ を推定する不偏推定量 $T_1,T_2$ に対し、本章では
>
> $e(T_1,T_2)=\operatorname{Var}(T_2)/\operatorname{Var}(T_1)$
>
> を $T_1$ の $T_2$ に対する推定量の相対効率とする。$e(T_1,T_2)>1$ なら $T_1$ の方が分散が小さい。漸近比較では分散を漸近分散に置き換える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-relative-efficiency -->
**定義の確認**  
$\operatorname{Var}(T_1)=\sigma^2/n$、$\operatorname{Var}(T_2)=2\sigma^2/n$ なら $e(T_1,T_2)=2$ で、同じ精度を得るのに $T_2$ は概ね2倍の標本数を要するという読み方ができます。文献によって比の向きを逆に定義することがあるので、式を必ず確認します。
<!-- definition-example-end -->

公式シラバスの **その他の手法** は、特定の固有名をもつ単一の推定法を指す項目ではありません。モーメント法、最小二乗法、最尤法だけに固定せず、推定量を構成したうえで不偏性・一致性・平均二乗誤差・相対効率などにより比較する問題を含む包括的な枠です。

### 3A.1 例：不偏性だけでは選べない

2つの不偏推定量があっても、分散が違えば有限標本での精度は違います。逆に少しバイアスを許して平均二乗誤差を下げる推定量もあり、推定法の評価は「不偏なら終わり」ではありません。

## 4. バイアス・不偏性・平均二乗誤差

推定対象を $g(\theta)$、推定量を $T$ とします。

<a id="def-i1-02-bias"></a>

<!-- formal-statement-start -->
> **定義（バイアスと不偏性）**  
> $T$ のバイアスを $\operatorname{Bias}_\theta(T)=E_\theta[T]-g(\theta)$ とする。すべての $\theta$ でバイアスが0なら $T$ を $g(\theta)$ の不偏推定量という。
<!-- formal-statement-end -->

<a id="def-i1-02-mse"></a>

<!-- formal-statement-start -->
> **定義（平均二乗誤差）**  
> 推定量 $T$ の平均二乗誤差を次で定義する。

$$
\operatorname{MSE}_\theta(T)
=E_\theta[(T-g(\theta))^2].
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-bias, def-i1-02-mse -->
**定義の確認**  
$E[T]=\theta+1/n$、$\operatorname{Var}(T)=2/n$ なら、バイアスは $1/n$、平均二乗誤差は $2/n+1/n^2$ です。不偏性は期待値のずれ、平均二乗誤差は分散とずれを合わせた尺度であることが分かります。
<!-- definition-example-end -->

<a id="prop-i1-02-mse-decomposition"></a>

<!-- formal-statement-start -->
> **命題（平均二乗誤差分解）**  
> 二次モーメントが有限なら、平均二乗誤差は分散とバイアスの二乗に分解できる。

$$
\boxed{
\operatorname{MSE}_\theta(T)
=\operatorname{Var}_\theta(T)
+\operatorname{Bias}_\theta(T)^2
}.
$$
<!-- formal-statement-end -->

### 導出

$T-g(\theta)$ を

$$
T-g(\theta)
=\{T-E[T]\}+\{E[T]-g(\theta)\}
$$

と分けて二乗します。交差項の期待値は

$$
E[T-E[T]]=0
$$

なので消えます。

この式は「不偏なら必ず最良」ではないことを示します。少しバイアスを許して分散を大きく下げれば、平均二乗誤差が小さくなる場合があります。

---

## 5. 一致性

<a id="def-i1-02-consistency"></a>

<!-- formal-statement-start -->
> **定義（一致性）**  
> 推定量列 $T_n$ が推定対象 $g(\theta)$ に確率収束するとき、すなわち任意の $\varepsilon>0$ に対して次が成り立つとき、$T_n$ を一致推定量という。

$$
P_\theta(|T_n-g(\theta)|>\varepsilon)\to0.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-consistency -->
**定義の確認**  
$T_n=\frac{n}{n+1}\bar X$ とし $E[X]=\mu$、$\operatorname{Var}(X)=\sigma^2<\infty$ とします。$T_n-\mu=\frac{n}{n+1}(\bar X-\mu)-\frac{\mu}{n+1}$ で、第1項は大数則、第2項は通常の極限で0へ行くため $T_n\xrightarrow{p}\mu$、したがって一致的です。
<!-- definition-example-end -->

<a id="prop-i1-02-mse-consistency"></a>

<!-- formal-statement-start -->
> **命題（バイアスと分散からの一致性判定）**  
> $\operatorname{Bias}_\theta(T_n)\to0$ かつ $\operatorname{Var}_\theta(T_n)\to0$ なら $T_n$ は $g(\theta)$ の一致推定量である。
<!-- formal-statement-end -->

実際、平均二乗誤差分解から

$$
E[(T_n-g(\theta))^2]\to0.
$$

Markov不等式を二乗誤差に適用すれば

$$
P(|T_n-g(\theta)|>\varepsilon)
\le
\frac{E[(T_n-g(\theta))^2]}{\varepsilon^2}
\to0.
$$

### 5.1 不偏ではないが一致的な標本分散

$$
\tilde S_n^2=\frac1n\sum_i(X_i-\bar X)^2
$$

は一般に母分散 $\sigma^2$ の不偏推定量ではなく、

$$
E[\tilde S_n^2]=\frac{n-1}{n}\sigma^2.
$$

しかし係数 $(n-1)/n\to1$ であり、適切なモーメント条件の下では $\tilde S_n^2\to_p\sigma^2$ です。

**不偏性は有限標本の期待値、一致性は標本サイズを増やした極限の性質**です。

---

<a id="ex-i1-02-relative-efficiency"></a>
### I102-B05 推定量の相対効率と推定法の選択

- Level: B
- 目安時間: 10分
- 主題: 推定量の相対効率・その他の手法

同じ母数 $\theta$ の不偏推定量 $T_1,T_2$ が
$$
\operatorname{Var}(T_1)=\frac{3}{n},\qquad
\operatorname{Var}(T_2)=\frac{5}{n}
$$
を満たす。本章の定義で $T_1$ の $T_2$ に対する相対効率を求め、どちらが効率的か答えよ。また、公式シラバスの「その他の手法」を評価するとき分散以外に確認すべき性質を2つ挙げよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
e(T_1,T_2)=\frac{5/n}{3/n}=\frac53>1
$$
なので $T_1$ の方が効率的。ほかに不偏性、一致性、平均二乗誤差、十分性、計算可能性などを確認する。

##### 本番答案

相対効率は $5/3$ で $T_1$ が効率的。ほかに不偏性・一致性などを確認する。

##### 採点基準

相対効率10点、判定4点、他の評価軸2つで6点。

<!-- solution-end -->

## 6. 線形不偏推定と BLUE

まず、独立な2つの測定値

$$
Y_1,Y_2,
\qquad
E[Y_1]=E[Y_2]=\mu,
$$

$$
\operatorname{Var}(Y_1)=v_1,
\qquad
\operatorname{Var}(Y_2)=v_2
$$

を考えます。線形推定量

$$
T=wY_1+(1-w)Y_2
$$

は常に不偏です。独立なら

$$
\operatorname{Var}(T)
=w^2v_1+(1-w)^2v_2.
$$

微分して最小化すると

$$
2wv_1-2(1-w)v_2=0
$$

より

$$
\boxed{
w=\frac{v_2}{v_1+v_2},
\qquad
1-w=\frac{v_1}{v_1+v_2}
}.
$$

これは

$$
\boxed{
T
=
\frac{Y_1/v_1+Y_2/v_2}{1/v_1+1/v_2}
}
$$

と書けます。**分散の小さい測定値ほど大きな重みを与える**逆分散重みです。

<a id="def-i1-02-blue"></a>

<!-- formal-statement-start -->
> **定義（BLUE）**  
> 線形不偏推定量のクラスの中で分散、ベクトル母数では分散共分散行列、が最小となる推定量を最良線形不偏推定量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-blue -->
**定義の確認**  
独立な不偏測定 $Y_1,Y_2$ の分散がそれぞれ $1,4$ なら、$wY_1+(1-w)Y_2$ の分散を最小にする重みは $w=4/5$ です。線形かつ不偏というクラスの中で分散を最小にする、という BLUE の「最良」を具体化しています。
<!-- definition-example-end -->

### 6.1 ガウス・マルコフの定理

<a id="thm-i1-02-gauss-markov"></a>

<!-- formal-statement-start -->
> **定理（ガウス・マルコフ）**  
> 線形モデル $Y=X\beta+\varepsilon$ で $X$ が列フルランク、$E[\varepsilon]=0$、$\operatorname{Var}(\varepsilon)=\sigma^2I$ とする。このとき次の通常最小二乗法推定量は $\beta$ の BLUE である。

$$
\boxed{
\hat\beta=(X^\mathsf TX)^{-1}X^\mathsf TY
}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

任意の線形不偏推定量 $AY$ は $AX=I$ を満たします。通常最小二乗法の係数行列を $A_0=(X^\mathsf TX)^{-1}X^\mathsf T$ とし、$A=A_0+D$ と書くと $DX=0$ です。すると共分散の差に交差項が残らず、$DD^\mathsf T$ だけが残ります。

<!-- proof-start -->
### 証明

$AY$ が不偏である条件は

$$
E[AY]=AX\beta=\beta
$$

がすべての $\beta$ で成り立つこと、すなわち $AX=I$ です。

$A_0=(X^\mathsf TX)^{-1}X^\mathsf T$ とおき、$D=A-A_0$ とすると

$$
DX=AX-A_0X=I-I=0.
$$

また

$$
A_0D^\mathsf T
=(X^\mathsf TX)^{-1}X^\mathsf TD^\mathsf T
=(X^\mathsf TX)^{-1}(DX)^\mathsf T
=0.
$$

したがって

$$
\operatorname{Var}(AY)
=\sigma^2AA^\mathsf T
=\sigma^2(A_0A_0^\mathsf T+DD^\mathsf T).
$$

よって

$$
\operatorname{Var}(AY)-\operatorname{Var}(A_0Y)
=\sigma^2DD^\mathsf T
$$

は半正定値です。したがって通常最小二乗法は線形不偏推定量の中で分散共分散行列が最小です。
<!-- proof-end -->

重要なのは、ガウス・マルコフが「すべての推定量の中で最良」とは言っていないことです。比較対象は**線形かつ不偏**な推定量です。また正規性は BLUE の結論自体には不要です。

---

## 7. フィッシャー情報量

I1-01 のスコアを

$$
U(\theta)=\frac{\partial}{\partial\theta}\ell(\theta)
$$

とします。

<a id="def-i1-02-fisher-information"></a>

<!-- formal-statement-start -->
> **定義（フィッシャー情報量）**  
> 正則条件の下で、1母数モデルのフィッシャー情報量をスコアの二乗平均で定義する。

$$
\boxed{
I(\theta)=E_\theta[U(\theta)^2]
}.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-fisher-information -->
**定義の確認**  
$X\sim N(\mu,\sigma^2)$ で $\sigma^2$ 既知なら、1観測のスコアは $U(\mu)=(X-\mu)/\sigma^2$ です。よって $E[U(\mu)^2]=\sigma^2/\sigma^4=1/\sigma^2$ となり、フィッシャー情報量の定義を直接計算できます。
<!-- definition-example-end -->

スコアの期待値が0なら

$$
I(\theta)=\operatorname{Var}_\theta(U(\theta)).
$$

### 7.1 独立標本では情報量が足し算になる

独立な観測のスコアを $U_i$ とすると

$$
U_n=\sum_{i=1}^nU_i.
$$

正則条件下では $E[U_i]=0$、独立性から交差共分散が0なので

<a id="prop-i1-02-information-additivity"></a>

<!-- formal-statement-start -->
> **命題（フィッシャー情報量の加法性）**  
> 独立観測では全標本の情報量は各観測の情報量の和になる。特に独立同分布標本なら

$$
\boxed{I_n(\theta)=nI_1(\theta)}.
$$
<!-- formal-statement-end -->

### 7.2 二階微分表示

正則条件の下では

$$
E_\theta[U(\theta)]=0.
$$

これを $\theta$ で微分すると

$$
0
=
\frac{\partial}{\partial\theta}E[U]
=
E\left[\frac{\partial U}{\partial\theta}\right]
+E[U^2].
$$

したがって

<a id="prop-i1-02-information-hessian"></a>

<!-- formal-statement-start -->
> **命題（フィッシャー情報量の二階微分表示）**  
> 微分と積分の交換が許される正則モデルでは、フィッシャー情報量は対数尤度の二階微分の負の期待値に等しい。

$$
\boxed{
I(\theta)
=-E_\theta\left[\frac{\partial^2}{\partial\theta^2}\ell(\theta)\right]
}.
$$
<!-- formal-statement-end -->

### 7.3 例: ベルヌーイ分布

1観測 $X\sim\mathrm{Bernoulli}(p)$ なら

$$
U(p)=\frac{X-p}{p(1-p)}.
$$

よって

$$
I_1(p)
=\frac{\operatorname{Var}(X)}{p^2(1-p)^2}
=\frac1{p(1-p)}.
$$

したがって

$$
\boxed{I_n(p)=\frac{n}{p(1-p)}}.
$$

### 7.4 例: 正規平均

$X_i\sim N(\mu,\sigma^2)$ で $\sigma^2$ 既知なら

$$
U(\mu)=\frac1{\sigma^2}\sum_i(X_i-\mu),
$$

なので

$$
\boxed{I_n(\mu)=\frac n{\sigma^2}}.
$$

---

## 8. クラーメル・ラオ不等式

推定対象を $g(\theta)$ とし、不偏推定量 $T$ を考えます。

正則条件の下で

$$
E_\theta[T]=g(\theta)
$$

を微分すると

$$
g'(\theta)
=
\frac{\partial}{\partial\theta}E[T]
=E[TU].
$$

また $E[U]=0$ なので

$$
\operatorname{Cov}(T,U)=g'(\theta).
$$

Cauchy--Schwarz不等式から

$$
\operatorname{Cov}(T,U)^2
\le
\operatorname{Var}(T)\operatorname{Var}(U)
=\operatorname{Var}(T)I(\theta).
$$

従って次を得ます。

<a id="thm-i1-02-cramer-rao"></a>

<!-- formal-statement-start -->
> **定理（クラーメル・ラオ不等式）**  
> 支持が母数に依存せず、必要な微分と積分の交換ができ、$0<I(\theta)<\infty$ などの正則条件を満たす1母数モデルを考える。$T$ が $g(\theta)$ の不偏推定量なら

$$
\boxed{
\operatorname{Var}_\theta(T)
\ge
\frac{\{g'(\theta)\}^2}{I(\theta)}
}.
$$
<!-- formal-statement-end -->

特に $g(\theta)=\theta$ なら

$$
\boxed{\operatorname{Var}(T)\ge\frac1{I(\theta)}}.
$$

### 8.1 等号条件

Cauchy--Schwarzの等号条件から、下限達成には

$$
T-g(\theta)=c(\theta)U(\theta)
$$

という線形関係が必要です。

<a id="def-i1-02-efficient-estimator"></a>

<!-- formal-statement-start -->
> **定義（有効推定量）**  
> 正則モデルで不偏推定量がクラーメル・ラオ下限を達成するとき、その推定量を本章では有効推定量という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-i1-02-efficient-estimator -->
**定義の確認**  
ベルヌーイ標本では $I_n(p)=n/[p(1-p)]$ なのでクラーメル・ラオ下限は $p(1-p)/n$ です。標本平均 $\bar X$ は不偏で、その分散も $p(1-p)/n$ だから下限を達成し、本章の意味で有効推定量です。
<!-- definition-example-end -->

### 8.2 ベルヌーイ標本平均は下限を達成する

$\bar X$ は $p$ の不偏推定量で

$$
\operatorname{Var}(\bar X)=\frac{p(1-p)}n.
$$

一方

$$
\frac1{I_n(p)}=\frac{p(1-p)}n.
$$

従って $\bar X$ はクラーメル・ラオ下限を達成します。

---

## 9. 相対効率と「下限を使えない」モデル

同じ量を推定する2つの不偏推定量 $T_1,T_2$ に対し、分散比で

$$
\operatorname{RE}(T_1,T_2)
=\frac{\operatorname{Var}(T_2)}{\operatorname{Var}(T_1)}
$$

のように相対効率を比較できます。どちらを分母に置くかは文献で流儀があるため、問題文の定義を必ず確認します。

### 9.1 一様分布ではクラーメル・ラオを機械適用しない

$X_i\sim U(0,\theta)$ では支持 $[0,\theta]$ が $\theta$ に依存します。このため

$$
\frac{\partial}{\partial\theta}
\int_0^\theta f(x\mid\theta)\,dx
$$

には積分区間の端点の変化が入ります。通常の

$$
E[U]=0
$$

を導く計算をそのまま使えません。

実際、モーメント推定量

$$
T_{\mathrm{MM}}=2\bar X
$$

は不偏で

$$
\operatorname{Var}(T_{\mathrm{MM}})=\frac{\theta^2}{3n}.
$$

最大値 $M=X_{(n)}$ は

$$
E[M]=\frac{n}{n+1}\theta
$$

なので

$$
T_M=\frac{n+1}{n}M
$$

は不偏です。その分散は

$$
\operatorname{Var}(T_M)
=\frac{\theta^2}{n(n+2)},
$$

で、$T_{\mathrm{MM}}$ より小さくなります。非正則モデルではこのような比較を**直接分散計算**で行い、正則モデル用の下限公式を無条件に持ち込みません。

---

## 10. 典型例題

### 例1: 正規平均では最小二乗・最尤・モーメント法が一致する

$X_i\sim N(\mu,\sigma^2)$、$\sigma^2$ 既知とします。

- モーメント法: $E[X]=\mu$ と $\bar X$ を等置して $\hat\mu=\bar X$。
- 最小二乗法: $\sum(X_i-\mu)^2$ を最小化して $\hat\mu=\bar X$。
- 最尤法: I1-01 より $\hat\mu=\bar X$。

同じ答えになっても、出発原理は異なります。

### 例2: 指数分布の平均母数は有効に推定できる

平均母数 $\mu>0$ の指数分布

$$
f(x\mid\mu)=\frac1\mu e^{-x/\mu},\qquad x\ge0
$$

では

$$
U(\mu)=-\frac n\mu+\frac{\sum X_i}{\mu^2},
$$

$$
I_n(\mu)=\frac n{\mu^2}.
$$

$\bar X$ は不偏で

$$
\operatorname{Var}(\bar X)=\frac{\mu^2}{n}
=\frac1{I_n(\mu)}.
$$

従って $\bar X$ はクラーメル・ラオ下限を達成します。

---

## 11. 演習

### I1-02-A01 一様分布のモーメント推定

- Level: A
- 目安時間: 8分
- 主題: モーメント法
- 使用技術: 期待値、標本平均

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}U(0,\theta)$ とする。

1. $\theta$ のモーメント推定量を求めよ。
2. その不偏性を確認せよ。
3. 分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$E[X]=\theta/2$ なので

$$
\hat\theta_{\mathrm{MM}}=2\bar X.
$$

期待値は

$$
E[2\bar X]=2\cdot\frac\theta2=\theta
$$

だから不偏です。また $\operatorname{Var}(X)=\theta^2/12$ より

$$
\operatorname{Var}(2\bar X)
=4\frac{\theta^2}{12n}
=\boxed{\frac{\theta^2}{3n}}.
$$

##### 本番答案

$$
E[X]=\theta/2=\bar X
\Rightarrow
\boxed{\hat\theta_{\rm MM}=2\bar X}.
$$

$E[2\bar X]=\theta$ で不偏、

$$
\boxed{\operatorname{Var}(2\bar X)=\theta^2/(3n)}.
$$

##### 採点基準

- モーメント条件: 6点
- 推定量: 5点
- 不偏性: 4点
- 分散: 5点

<!-- solution-end -->

### I1-02-A02 平均二乗誤差分解

- Level: A
- 目安時間: 8分
- 主題: バイアスと平均二乗誤差
- 使用技術: 期待値、分散

$T$ が $\theta$ の推定量で

$$
E[T]=\theta+b,
\qquad
\operatorname{Var}(T)=v
$$

とする。$\operatorname{MSE}(T)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

バイアスは $b$ なので平均二乗誤差分解より

$$
\boxed{\operatorname{MSE}(T)=v+b^2}.
$$

##### 本番答案

$$
\operatorname{Bias}(T)=b
$$

より

$$
\boxed{\operatorname{MSE}(T)=v+b^2}.
$$

##### 採点基準

- バイアス: 8点
- 平均二乗誤差分解: 8点
- 結論: 4点

<!-- solution-end -->

### I1-02-A03 ベルヌーイのフィッシャー情報量

- Level: A
- 目安時間: 10分
- 主題: フィッシャー情報量
- 使用技術: スコア、分散

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Bernoulli}(p)$ とする。$I_n(p)$ を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測のスコアは

$$
U_1(p)=\frac{X-p}{p(1-p)}.
$$

したがって

$$
I_1(p)=E[U_1(p)^2]
=\frac{\operatorname{Var}(X)}{p^2(1-p)^2}
=\frac1{p(1-p)}.
$$

独立標本では加法性から

$$
\boxed{I_n(p)=\frac{n}{p(1-p)}}.
$$

##### 本番答案

$$
U_1(p)=\frac{X-p}{p(1-p)},
\qquad
I_1(p)=\frac1{p(1-p)}.
$$

従って

$$
\boxed{I_n(p)=n/[p(1-p)]}.
$$

##### 採点基準

- スコア: 6点
- 1観測の情報量: 7点
- 加法性: 3点
- 結論: 4点

<!-- solution-end -->

### I1-02-A04 正規平均のクラーメル・ラオ下限

- Level: A
- 目安時間: 10分
- 主題: クラーメル・ラオ下限
- 使用技術: フィッシャー情報量

$X_i\overset{\mathrm{iid}}{\sim}N(\mu,\sigma^2)$ とし、$\sigma^2$ は既知とする。$\mu$ の不偏推定量の分散下限を求め、$\bar X$ が達成することを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
I_n(\mu)=n/\sigma^2
$$

なのでクラーメル・ラオ下限は

$$
\frac1{I_n(\mu)}=\frac{\sigma^2}{n}.
$$

また

$$
E[\bar X]=\mu,
\qquad
\operatorname{Var}(\bar X)=\frac{\sigma^2}{n}.
$$

従って $\bar X$ は下限を達成します。

##### 本番答案

$$
I_n(\mu)=n/\sigma^2
\Rightarrow
\operatorname{Var}(T)\ge\sigma^2/n.
$$

$\bar X$ は不偏かつ $\operatorname{Var}(\bar X)=\sigma^2/n$ なので有効。

##### 採点基準

- フィッシャー情報量: 6点
- 下限: 5点
- $\bar X$ の不偏性・分散: 5点
- 有効性: 4点

<!-- solution-end -->

### I1-02-B01 逆分散重みによる線形不偏推定

- Level: B
- 目安時間: 15分
- 主題: BLUEの原型
- 使用技術: 制約付き分散最小化

独立な $Y_1,Y_2$ が

$$
E[Y_1]=E[Y_2]=\mu,
\quad
\operatorname{Var}(Y_1)=1,
\quad
\operatorname{Var}(Y_2)=4
$$

を満たす。$T=wY_1+(1-w)Y_2$ の分散を最小にする $w$ と最小分散を求めよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$T$ は任意の $w$ で不偏です。

$$
\operatorname{Var}(T)=w^2+4(1-w)^2.
$$

微分して

$$
2w-8(1-w)=10w-8=0
$$

より

$$
w=\frac45.
$$

従って

$$
T=\frac45Y_1+\frac15Y_2,
$$

$$
\operatorname{Var}(T)
=\frac{16}{25}+4\frac1{25}
=\boxed{\frac45}.
$$

分散の小さい $Y_1$ に大きな重みがつきます。

##### 本番答案

$$
V(w)=w^2+4(1-w)^2,
\qquad
V'(w)=10w-8.
$$

従って

$$
\boxed{w=4/5},
\qquad
\boxed{\operatorname{Var}(T)=4/5}.
$$

##### 採点基準

- 不偏性: 3点
- 分散式: 5点
- 最小化: 6点
- 重みと分散: 6点

<!-- solution-end -->

### I1-02-B02 不偏性と一致性は別

- Level: B
- 目安時間: 15分
- 主題: 一致性
- 使用技術: バイアス、分散、平均二乗誤差

$X_1,\ldots,X_n$ は平均 $\mu$、分散 $\sigma^2<\infty$ の独立同分布標本とする。

$$
T_n=\frac{n}{n+1}\bar X
$$

について、

1. バイアスを求めよ。
2. 分散を求めよ。
3. $T_n$ が一致推定量であることを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
E[T_n]=\frac{n}{n+1}\mu
$$

なので

$$
\operatorname{Bias}(T_n)=-\frac\mu{n+1}\to0.
$$

また

$$
\operatorname{Var}(T_n)
=\left(\frac{n}{n+1}\right)^2\frac{\sigma^2}{n}
=\frac{n\sigma^2}{(n+1)^2}
\to0.
$$

従って平均二乗誤差も0へ収束し、$T_n\to_p\mu$ です。

##### 本番答案

$$
\operatorname{Bias}(T_n)=-\mu/(n+1)\to0,
$$

$$
\operatorname{Var}(T_n)=n\sigma^2/(n+1)^2\to0.
$$

よって平均二乗誤差 $\to0$ なので $\boxed{T_n\to_p\mu}$。

##### 採点基準

- バイアス: 6点
- 分散: 6点
- 極限: 4点
- 一致性の結論: 4点

<!-- solution-end -->

### I1-02-B03 ポアソン平均の有効性

- Level: B
- 目安時間: 15分
- 主題: フィッシャー情報量・クラーメル・ラオの不等式
- 使用技術: ポアソンスコア、分散比較

$X_i\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$ とする。

1. $I_n(\lambda)$ を求めよ。
2. $\bar X$ が $\lambda$ の不偏推定量であることを確認せよ。
3. $\bar X$ がクラーメル・ラオ下限を達成することを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

1観測の対数尤度は

$$
\ell_1=-\lambda+X\log\lambda-\log(X!).
$$

よって

$$
U_1=-1+\frac X\lambda=\frac{X-\lambda}{\lambda}.
$$

したがって

$$
I_1(\lambda)=\frac{\operatorname{Var}(X)}{\lambda^2}=\frac1\lambda,
\qquad
I_n(\lambda)=\frac n\lambda.
$$

一方

$$
E[\bar X]=\lambda,
\qquad
\operatorname{Var}(\bar X)=\frac\lambda n
=\frac1{I_n(\lambda)}.
$$

従って下限を達成します。

##### 本番答案

$$
U_1=(X-\lambda)/\lambda,
\qquad
I_n(\lambda)=n/\lambda.
$$

$\bar X$ は不偏で

$$
\operatorname{Var}(\bar X)=\lambda/n=1/I_n(\lambda),
$$

よって有効。

##### 採点基準

- スコア: 5点
- フィッシャー情報量: 6点
- 不偏性・分散: 5点
- 有効性: 4点

<!-- solution-end -->

### I1-02-B04 非正則な一様分布での分散比較

- Level: B
- 目安時間: 15分
- 主題: 非正則モデル
- 使用技術: 順序統計量、分散比較

$X_i\overset{\mathrm{iid}}{\sim}U(0,\theta)$ とし、$M=X_{(n)}$ とする。次を用いてよい。

$$
E[M]=\frac{n}{n+1}\theta,
\qquad
\operatorname{Var}(M)=\frac{n\theta^2}{(n+1)^2(n+2)}.
$$

1. $T_1=2\bar X$ と $T_2=(n+1)M/n$ がともに不偏であることを示せ。
2. それぞれの分散を求めて比較せよ。
3. この比較に通常のクラーメル・ラオ下限をそのまま使わない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$E[X]=\theta/2$ より $E[T_1]=\theta$。また

$$
E[T_2]=\frac{n+1}{n}\frac{n}{n+1}\theta=\theta.
$$

分散は

$$
\operatorname{Var}(T_1)=\frac{\theta^2}{3n},
$$

$$
\operatorname{Var}(T_2)
=\left(\frac{n+1}{n}\right)^2
\frac{n\theta^2}{(n+1)^2(n+2)}
=\frac{\theta^2}{n(n+2)}.
$$

$n\ge2$ なら

$$
\frac1{n(n+2)}<\frac1{3n},
$$

なので $T_2$ の方が小分散です。

一様分布は支持 $[0,\theta]$ が母数に依存し、通常の正則条件を満たさないため、標準形のクラーメル・ラオ不等式を機械適用できません。

##### 本番答案

両者とも不偏で、

$$
\operatorname{Var}(T_1)=\theta^2/(3n),
\qquad
\operatorname{Var}(T_2)=\theta^2/[n(n+2)].
$$

$n\ge2$ で $T_2$ の方が小さい。支持が $\theta$ に依存するため通常のクラーメル・ラオの不等式の正則条件が破れる。

##### 採点基準

- 不偏性: 5点
- 2つの分散: 8点
- 比較: 3点
- 正則条件の指摘: 4点

<!-- solution-end -->

### I1-02-C01 ポアソン推定量の不偏性・一致性・有効性

- Level: C
- 目安時間: 25分
- 主題: 推定量評価の連結問題
- 使用技術: 不偏性、一致性、フィッシャー情報量、クラーメル・ラオの不等式

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$ とする。$T_1=\bar X$、$T_2=X_1$ とする。

1. $T_1,T_2$ がともに不偏であることを示せ。
2. 分散を比較せよ。
3. $T_1$ は一致的だが $T_2$ は一致的でないことを示せ。
4. フィッシャー情報量を求め、$T_1$ がクラーメル・ラオ下限を達成することを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

どちらも期待値は $\lambda$ なので不偏です。

$$
\operatorname{Var}(T_1)=\frac\lambda n,
\qquad
\operatorname{Var}(T_2)=\lambda.
$$

$T_1$ は不偏で分散が0へ収束するので一致的です。一方 $T_2=X_1$ の分布は $n$ を増やしても変わりません。たとえば $0<\varepsilon<1/2$ を固定すると、ポアソン分布は離散なので一般に

$$
P(|X_1-\lambda|>\varepsilon)
$$

は $n$ に依存せず0へ収束しません。

また

$$
I_n(\lambda)=n/\lambda
$$

なのでクラーメル・ラオの不等式は $\lambda/n$。$T_1$ の分散はこれに一致します。

##### 本番答案

$$
E[T_1]=E[T_2]=\lambda,
$$

$$
\operatorname{Var}(T_1)=\lambda/n,
\quad
\operatorname{Var}(T_2)=\lambda.
$$

よって $T_1$ は平均二乗誤差 $\to0$ で一致的。$T_2$ は分布が $n$ に依存せず一致しない。

$$
I_n(\lambda)=n/\lambda
$$

よりクラーメル・ラオの不等式 $=\lambda/n$ で、$T_1$ は達成する。

##### 採点基準

- 不偏性: 4点
- 分散比較: 5点
- 一致性判定: 5点
- フィッシャー情報量: 3点
- クラーメル・ラオの不等式と有効性: 3点

<!-- solution-end -->

### I1-02-C02 ガンマ分布の2母数モーメント法

- Level: C
- 目安時間: 25分
- 主題: 2母数モーメント法
- 使用技術: 原点モーメント、連立方程式

$X_1,\ldots,X_n$ は形状 $a>0$、尺度 $b>0$ のガンマ分布に従う。次を用いてよい。

$$
E[X]=ab,
\qquad
E[X^2]=a(a+1)b^2.
$$

$m_1'=n^{-1}\sum X_i$、$m_2'=n^{-1}\sum X_i^2$ とする。

1. モーメント方程式を書け。
2. $a,b$ のモーメント推定量を求めよ。
3. $m_2'-(m_1')^2$ が標本分散の分母 $n$ 版に対応することを説明せよ。
4. モーメント推定量が有限標本で不偏とは限らない理由を述べよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

モーメント方程式は

$$
m_1'=ab,
\qquad
m_2'=a(a+1)b^2.
$$

差をとると

$$
m_2'-(m_1')^2=ab^2.
$$

従って

$$
\frac{(m_1')^2}{m_2'-(m_1')^2}=a,
$$

$$
\frac{m_2'-(m_1')^2}{m_1'}=b.
$$

よって

$$
\boxed{
\hat a=\frac{(m_1')^2}{m_2'-(m_1')^2},
\qquad
\hat b=\frac{m_2'-(m_1')^2}{m_1'}
}.
$$

また

$$
m_2'-(m_1')^2
=\frac1n\sum_i(X_i-\bar X)^2.
$$

モーメント法は「標本モーメントを母集団モーメントへ代入して方程式を解く」方法であり、非線形な比を取った推定量の期待値が真値になることまでは保証しません。

##### 本番答案

$$
m_1'=ab,
\quad
m_2'=a(a+1)b^2
$$

より

$$
\boxed{\hat a=(m_1')^2/[m_2'-(m_1')^2]},
$$

$$
\boxed{\hat b=[m_2'-(m_1')^2]/m_1'}.
$$

なお $m_2'-(m_1')^2=n^{-1}\sum(X_i-\bar X)^2$。モーメント法は不偏性を自動保証しない。

##### 採点基準

- モーメント方程式: 5点
- $a$ の導出: 5点
- $b$ の導出: 5点
- 分散との対応・不偏性の説明: 5点

<!-- solution-end -->

### I1-02-C03 ガウス・マルコフを行列で使う

- Level: C
- 目安時間: 30分
- 主題: BLUE
- 使用技術: 線形不偏性、分散共分散行列、半正定値

線形モデル

$$
Y=X\beta+\varepsilon,
\qquad
E[\varepsilon]=0,
\qquad
\operatorname{Var}(\varepsilon)=\sigma^2I
$$

で $X$ は列フルランクとする。$A_0=(X^\mathsf TX)^{-1}X^\mathsf T$ とする。

1. $A_0Y$ が不偏であることを示せ。
2. 任意の線形不偏推定量 $AY$ について $AX=I$ を示せ。
3. $D=A-A_0$ とおくと $DX=0$ であることを示せ。
4. 分散共分散行列の差が $\sigma^2DD^\mathsf T$ になることを示し、BLUEを結論せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$$
E[A_0Y]
=A_0X\beta
=(X^\mathsf TX)^{-1}X^\mathsf TX\beta
=\beta.
$$

任意の $AY$ がすべての $\beta$ で不偏なら

$$
AX\beta=\beta
$$

なので $AX=I$。従って

$$
DX=(A-A_0)X=0.
$$

また

$$
A_0D^\mathsf T
=(X^\mathsf TX)^{-1}(DX)^\mathsf T=0.
$$

よって

$$
AA^\mathsf T
=(A_0+D)(A_0+D)^\mathsf T
=A_0A_0^\mathsf T+DD^\mathsf T.
$$

従って

$$
\operatorname{Var}(AY)-\operatorname{Var}(A_0Y)
=\sigma^2DD^\mathsf T\succeq0.
$$

よって $A_0Y$ は BLUE です。

##### 本番答案

$A_0X=I$ より $A_0Y$ は不偏。任意の線形不偏推定量 $AY$ は $AX=I$。$D=A-A_0$ とすれば $DX=0$ であり $A_0D^\mathsf T=0$。従って

$$
\operatorname{Var}(AY)-\operatorname{Var}(A_0Y)
=\sigma^2DD^\mathsf T\succeq0.
$$

ゆえに通常最小二乗法は BLUE。

##### 採点基準

- 通常最小二乗法の不偏性: 4点
- $AX=I$: 4点
- $DX=0$: 4点
- 共分散差の展開: 5点
- BLUEの結論: 3点

<!-- solution-end -->

### I1-02-C04 一般の関数 $g(\theta)$ に対するクラーメル・ラオの不等式

- Level: C
- 目安時間: 25分
- 主題: クラーメル・ラオ導出
- 使用技術: 微分と積分の交換、共分散、Cauchy--Schwarz

正則な1母数モデルでスコアを $U(\theta)$、フィッシャー情報量を $I(\theta)$ とする。$T$ は $g(\theta)$ の不偏推定量とする。

1. $E[U]=0$ を用いて $\operatorname{Cov}(T,U)=E[TU]$ と書けることを示せ。
2. $E[T]=g(\theta)$ を微分し、$E[TU]=g'(\theta)$ を導け。
3. Cauchy--Schwarz不等式からクラーメル・ラオ不等式を導け。
4. $g(\theta)=\theta^2$ の場合の下限を書け。

<!-- solution-start -->

#### 解答

##### 詳細解答

$E[U]=0$ より

$$
\operatorname{Cov}(T,U)
=E[TU]-E[T]E[U]
=E[TU].
$$

また

$$
g'(\theta)
=\frac{\partial}{\partial\theta}\int T(x)f_\theta(x)\,dx
=\int T(x)\frac{\partial f_\theta(x)}{\partial\theta}\,dx.
$$

ここで

$$
\frac{\partial f_\theta}{\partial\theta}
=f_\theta\frac{\partial\log f_\theta}{\partial\theta}
=f_\theta U
$$

なので

$$
g'(\theta)=E[TU].
$$

従って

$$
\{g'(\theta)\}^2
=\operatorname{Cov}(T,U)^2
\le\operatorname{Var}(T)I(\theta).
$$

よって

$$
\boxed{\operatorname{Var}(T)\ge\{g'(\theta)\}^2/I(\theta)}.
$$

$g(\theta)=\theta^2$ なら $g'=2\theta$ だから

$$
\boxed{\operatorname{Var}(T)\ge4\theta^2/I(\theta)}.
$$

##### 本番答案

$E[U]=0$ より $\operatorname{Cov}(T,U)=E[TU]$。正則条件下で

$$
g'(\theta)=\partial_\theta E[T]=E[TU].
$$

従って Cauchy--Schwarz より

$$
\boxed{\operatorname{Var}(T)\ge\{g'(\theta)\}^2/I(\theta)}.
$$

$g(\theta)=\theta^2$ なら下限は $4\theta^2/I(\theta)$。

##### 採点基準

- 共分散: 4点
- 微分による恒等式: 7点
- Cauchy--Schwarz: 5点
- 一般式と具体化: 4点

<!-- solution-end -->

### I1-02-D01 ポアソンで同じ量を推定する二つの不偏推定量

- Level: D
- 目安時間: 40分
- 主題: 十分性・分散改善・クラーメル・ラオの不等式
- 使用技術: ポアソン母関数、条件付き分布、分散比較

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$ とし

$$
q=P_\lambda(X_1=0)=e^{-\lambda}
$$

を推定したい。$S=\sum_iX_i$ とする。

1. 零の割合
   $$
   T_1=\frac1n\sum_{i=1}^n\mathbf1(X_i=0)
   $$
   が $q$ の不偏推定量であることを示し、分散を求めよ。
2. $q$ の不偏推定量に対するクラーメル・ラオ下限を求めよ。
3. $T_1$ の効率を「クラーメル・ラオの不等式 / 分散」で定義して求めよ。
4. 
   $$
   T_2=\left(1-\frac1n\right)^S
   $$
   も $q$ の不偏推定量であることを示せ。
5. $\operatorname{Var}(T_2)$ を求め、$n\to\infty$ でクラーメル・ラオ下限との比が1へ近づくことを示せ。

<!-- solution-start -->

#### 解答

##### 詳細解答

$\mathbf1(X_i=0)$ は成功確率 $q$ のベルヌーイ変数なので

$$
E[T_1]=q,
\qquad
\operatorname{Var}(T_1)=\frac{q(1-q)}n.
$$

ポアソン標本のフィッシャー情報量は

$$
I_n(\lambda)=\frac n\lambda.
$$

$g(\lambda)=e^{-\lambda}=q$ なので $g'=-q$。従ってクラーメル・ラオの不等式は

$$
\boxed{\frac{q^2\lambda}{n}}.
$$

よって $T_1$ の効率は

$$
\frac{q^2\lambda/n}{q(1-q)/n}
=\frac{q\lambda}{1-q}
=\boxed{\frac{\lambda}{e^\lambda-1}}.
$$

一方 $S\sim\mathrm{Poisson}(n\lambda)$ です。ポアソン変数の確率母関数

$$
E[t^S]=\exp\{n\lambda(t-1)\}
$$

に $t=1-1/n$ を代入すると

$$
E[T_2]
=\exp\left\{n\lambda\left(-\frac1n\right)\right\}
=e^{-\lambda}=q.
$$

また

$$
E[T_2^2]
=E\left[\left(1-\frac1n\right)^{2S}\right]
$$

であり、$t=(1-1/n)^2$ を代入すれば

$$
E[T_2^2]
=\exp\left\{n\lambda\left[\left(1-\frac1n\right)^2-1\right]\right\}
=e^{-2\lambda+\lambda/n}.
$$

従って

$$
\operatorname{Var}(T_2)
=e^{-2\lambda}(e^{\lambda/n}-1)
=q^2(e^{\lambda/n}-1).
$$

クラーメル・ラオの不等式との比は

$$
\frac{\operatorname{Var}(T_2)}{q^2\lambda/n}
=\frac{n(e^{\lambda/n}-1)}{\lambda}
\to1
$$

です。ここでは $e^x-1\sim x$ を用いました。

##### 本番答案

$T_1$ はベルヌーイ$(q)$ の標本平均なので

$$
E[T_1]=q,
\quad
\operatorname{Var}(T_1)=q(1-q)/n.
$$

$I_n(\lambda)=n/\lambda$、$g'=-q$ より

$$
\mathrm{CRLB}=q^2\lambda/n,
\quad
\mathrm{Eff}(T_1)=\lambda/(e^\lambda-1).
$$

$S\sim\mathrm{Poisson}(n\lambda)$ の確率母関数から

$$
E[(1-1/n)^S]=e^{-\lambda}=q,
$$

$$
\operatorname{Var}(T_2)=q^2(e^{\lambda/n}-1).
$$

したがって

$$
\frac{\operatorname{Var}(T_2)}{\mathrm{CRLB}}
=\frac{n(e^{\lambda/n}-1)}{\lambda}\to1.
$$

##### 採点基準

- $T_1$ の不偏性・分散: 4点
- クラーメル・ラオの不等式: 5点
- $T_1$ の効率: 3点
- $T_2$ の不偏性: 4点
- $T_2$ の分散: 3点
- 漸近比較: 1点

<!-- solution-end -->

## 12. 本番ドリル

### I1-02-DRILL01 ポアソンの零確率を推定する

- Level: C
- 目安時間: 30分
- 主題: 不偏性・十分統計量・フィッシャー情報量・効率
- 使用技術: ポアソン、確率母関数、クラーメル・ラオの不等式、分散比較

$X_1,\ldots,X_n\overset{\mathrm{iid}}{\sim}\mathrm{Poisson}(\lambda)$ とし、$q=e^{-\lambda}$ を推定する。$S=\sum_iX_i$ とする。

1. $\hat\lambda=\bar X$ が $\lambda$ の不偏推定量かつ一致推定量であることを示せ。
2. $T_1=n^{-1}\sum_i\mathbf1(X_i=0)$ が $q$ の不偏推定量であることを示せ。
3. $q$ の不偏推定量のクラーメル・ラオ下限を導け。
4. $T_2=(1-1/n)^S$ が $q$ の不偏推定量であることを示せ。
5. $T_2$ はデータを $S$ だけで使う。この構造が S1-02 の十分統計量とどうつながるか説明せよ。

<!-- solution-start -->

#### 解答

##### 詳細解答

ポアソン分布では

$$
E[\bar X]=\lambda,
\qquad
\operatorname{Var}(\bar X)=\frac\lambda n\to0,
$$

よって $\bar X$ は不偏かつ一致的です。

また $P(X_i=0)=q$ なので

$$
E[T_1]=q.
$$

ポアソン標本では

$$
I_n(\lambda)=n/\lambda.
$$

$q=g(\lambda)=e^{-\lambda}$、$g'=-q$ だから

$$
\boxed{\operatorname{Var}(T)\ge\frac{q^2\lambda}{n}}
$$

です。

さらに $S\sim\mathrm{Poisson}(n\lambda)$ なので

$$
E[t^S]=e^{n\lambda(t-1)}.
$$

$t=1-1/n$ とすれば

$$
E[T_2]=e^{-\lambda}=q.
$$

ポアソン標本の尤度は

$$
L(\lambda)
\propto e^{-n\lambda}\lambda^S
$$

でデータを $S$ を通じてのみ含みます。したがって $S$ は $\lambda$ の十分統計量であり、$T_2$ は十分統計量だけの関数として推定を行っています。

##### 本番答案

$$
E[\bar X]=\lambda,
\quad
\operatorname{Var}(\bar X)=\lambda/n\to0
$$

より $\bar X$ は不偏かつ一致。

$T_1$ は零指示変数の平均なので $E[T_1]=q$。

$$
I_n(\lambda)=n/\lambda,
\quad
g'=-q
$$

より

$$
\boxed{\mathrm{CRLB}=q^2\lambda/n}.
$$

$S\sim\mathrm{Poisson}(n\lambda)$ の確率母関数から

$$
E[(1-1/n)^S]=e^{-\lambda}=q.
$$

また尤度は $S$ のみに依存するため、$S$ は十分統計量であり $T_2$ はその関数である。

##### 採点基準

- $\bar X$ の不偏性・一致性: 4点
- $T_1$ の不偏性: 3点
- フィッシャー情報量とクラーメル・ラオの不等式: 6点
- $T_2$ の不偏性: 4点
- 十分性との接続: 3点

<!-- solution-end -->

## 13. 過去問との対応

本章の Level C/D と30分ドリルは、公式問題文を転載せず、過去問で確認される「推定量を作る → 期待値・分散を計算する → 不偏性・一致性・効率を判断する」という連結構造を独自設定で再構成しています。

- `MATH-2023-Q1`: ポアソン分布の不偏推定量・一致推定量。本章では C01 と DRILL01 で、不偏性と一致性を分離して判定する技能へ接続する。
- `MATH-2024-Q1`: 回帰係数の推定・検定・検出力。本章では最小二乗推定と BLUE の分散評価までを担当し、検定・検出力は I3 系で扱う。

## 14. 章末チェック

- モーメント法で母数と同数のモーメント方程式を立てられる。
- 最小二乗法と最尤法の目的関数の違いを説明できる。
- バイアス・分散・平均二乗誤差を混同せず計算できる。
- 平均二乗誤差分解を導出できる。
- 不偏性と一致性を別の性質として判定できる。
- バイアス $\to0$、分散 $\to0$ から一致性を示せる。
- BLUE の「best」が比較する推定量のクラスを説明できる。
- ガウス・マルコフの定理を $D=A-A_0$ の分解で証明できる。
- スコアからフィッシャー情報量を計算できる。
- 独立標本でフィッシャー情報量が加法的になる理由を説明できる。
- クラーメル・ラオ不等式を共分散と Cauchy--Schwarz から導出できる。
- $g(\theta)$ の推定では分子に $\{g'(\theta)\}^2$ が入ることを忘れない。
- 支持が母数に依存するモデルでは正則条件を先に確認する。
