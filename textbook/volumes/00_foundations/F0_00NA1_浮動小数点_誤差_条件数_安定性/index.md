# F0-00NA1 Encore V：浮動小数点・誤差・条件数・安定性

数値計算では、数学的に正しい式を書いただけでは十分ではありません。

実際の計算機は有限桁しか持たず、入力データにも誤差があり、アルゴリズム自身も近似を行います。

Encore Vでは最初に

- 問題そのものが誤差に敏感なのか
- アルゴリズムが余計な誤差を増幅しているのか

を分離します。

---

## 1. 誤差を三つに分ける

典型的には

1. **モデル・入力誤差**：観測値や係数が正確でない。
2. **離散化・打切り誤差**：無限過程や連続問題を有限近似する。
3. **丸め誤差**：有限精度演算による。

を区別します。

数値解析では、これらを一つの「誤差」に潰さず、どこで発生したか追跡します。

---

## 2. 絶対誤差と相対誤差

真値を $x$、近似値を $\widetilde x$ とすると

$$
|x-\widetilde x|
$$

が絶対誤差です。

$x\neq0$ なら

$$
\frac{|x-\widetilde x|}{|x|}
$$

が相対誤差です。

桁数の議論では相対誤差の方が自然です。

---

## 3. 浮動小数点数

計算機では実数を概念的に

$$
\pm m\,\beta^e
$$

の有限桁仮数 $m$ と指数 $e$ で表します。

IEEE 754のbinary64では基数2で有限精度です。

したがって $0.1$ のような十進小数で有限桁の数でも、二進法では有限表現できない場合があります。

---

## 4. machine epsilon

浮動小数点演算を単純化して

$$
\operatorname{fl}(x\circ y)
=(x\circ y)(1+\delta),
\qquad
|\delta|\le u
$$

とモデル化します。

$u$ はunit roundoffです。

このモデルにより、丸め誤差を確率的なノイズとしてではなく、決定論的な上界で解析できます。

---

## 5. 桁落ち

近い二数の差

$$
x-y
$$

を計算すると、有効桁が大きく失われることがあります。

例えば

$$
\sqrt{x+1}-\sqrt{x}
$$

を大きい $x$ で直接計算するより

$$
\frac{1}{\sqrt{x+1}+\sqrt{x}}
$$

と有理化した方が安定です。

数学的に等価な式でも、数値的には等価とは限りません。

---

## 6. 条件数：問題そのものの難しさ

関数 $y=f(x)$ に小さな入力摂動 $\Delta x$ を与えます。

微分可能なら

$$
\Delta y\approx f'(x)\Delta x.
$$

相対誤差について

$$
\frac{|\Delta y|}{|y|}
\approx
\left|\frac{x f'(x)}{f(x)}\right|
\frac{|\Delta x|}{|x|}.
$$

したがって相対条件数を

$$
\boxed{\kappa_f(x)=\left|\frac{x f'(x)}{f(x)}\right|}
$$

と定義できます。

条件数が大きければ、どんな優秀なアルゴリズムでも入力誤差を完全には救えません。

---

## 7. 線形方程式の条件数

$$
Ax=b
$$

に対し、行列ノルムから

$$
\boxed{\kappa(A)=\|A\|\,\|A^{-1}\|}
$$

を定義します。

$\kappa(A)$ が大きいと、$b$ や $A$ の小さな摂動が解 $x$ の大きな変化を生み得ます。

対称正定値行列の2-ノルムでは

$$
\kappa_2(A)=\frac{\lambda_{\max}}{\lambda_{\min}}.
$$

FEMで現れる剛性行列の解きやすさにも直結します。

---

## 8. well-conditionedとill-conditioned

- 条件数が小さい：well-conditioned
- 条件数が大きい：ill-conditioned

です。

重要なのは、ill-conditionedは**アルゴリズムのバグではなく問題の性質**だという点です。

---

## 9. forward errorとbackward error

真の解を $x$、計算結果を $\widetilde x$ とします。

forward errorは

$$
\|x-\widetilde x\|.
$$

一方backward errorは

> 計算結果 $\widetilde x$ が、どれくらい小さく摂動した入力に対する厳密解になっているか

を測ります。

数値線形代数ではbackward stabilityが非常に重要です。

---

## 10. backward stable algorithm

入力 $d$ に対する問題を $F(d)$ とします。

アルゴリズムが返す $\widetilde x$ が

$$
\widetilde x=F(d+\Delta d)
$$

で、$\Delta d$ が丸め誤差程度なら、そのアルゴリズムはbackward stableと考えます。

するとforward errorは概念的に

$$
\boxed{\text{forward error}\approx\text{condition number}\times\text{backward error}}
$$

で理解できます。

---

## 11. 安定性と条件数を混同しない

- **conditioning**：問題の性質
- **stability**：アルゴリズムの性質

です。

悪条件問題を安定アルゴリズムで解いても精度が悪いことはあります。

逆に良条件問題を不安定アルゴリズムで壊すこともあります。

---

## 12. 離散化誤差への入口

PDEやODEでは刻み幅 $h$ を導入して近似します。

典型的に

$$
\|u-u_h\|\le C h^p
$$

のような評価を目指します。

ここで $p$ は収束次数です。

Encore IIIのCea型評価では

$$
\|u-u_h\|
\le C\inf_{v_h\in V_h}\|u-v_h\|
$$

まで得ました。

Encore Vでは右辺の近似誤差を具体的なメッシュ幅へ落としていきます。

---

## 13. 数値計算の基本分解

今後は常に

$$
\boxed{
\text{total error}
\approx
\text{model/input}
+
\text{discretization}
+
\text{algebraic solver}
+
\text{roundoff}
+
\text{sampling}
}
$$

という視点を持ちます。

Monte Carloを混ぜるとsampling errorが追加されます。

random PDEではFEMの離散化誤差とMonte Carloの標本誤差を同時に管理する必要があります。

---

## 章末チェック

- 絶対誤差と相対誤差を区別できる。
- 浮動小数点演算の有限精度を説明できる。
- 桁落ちの例を説明できる。
- 条件数を問題の感度として説明できる。
- $\kappa(A)=\|A\|\|A^{-1}\|$ の意味を説明できる。
- forward errorとbackward errorを区別できる。
- conditioningとalgorithmic stabilityを区別できる。
- 数値計算の誤差源を分解して説明できる。
