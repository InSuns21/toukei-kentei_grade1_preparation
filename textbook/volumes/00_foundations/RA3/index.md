# RA3 標準実解析 III：微分法の理論

高校微積分で使った公式を、**存在定理としての平均値定理**から組み直します。

---

## 1. 導関数と局所線形化

<a id="def-ra3-derivative"></a>
<!-- formal-statement-start -->
> **定義（導関数）**  
> $$
> f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}
> $$
> が有限値として存在するとき、$f$ は $a$ で微分可能という。
<!-- formal-statement-end -->

微分可能なら連続ですが、逆は偽です。$|x|$ は0で連続ですが微分可能ではありません。

---

## 2. Rolleから平均値定理へ

<a id="thm-ra3-rolle"></a>
<!-- formal-statement-start -->
> **定理（Rolleの定理）**  
> $f$ が $[a,b]$ で連続、$(a,b)$ で微分可能、かつ $f(a)=f(b)$ なら、ある $c\in(a,b)$ が存在して $f'(c)=0$。
<!-- formal-statement-end -->

最大最小値定理により極値点が存在し、定数関数でなければ内部の極値点で導関数が0になります。

<a id="thm-ra3-mvt"></a>
<!-- formal-statement-start -->
> **定理（平均値定理）**  
> $f$ が $[a,b]$ で連続、$(a,b)$ で微分可能なら、ある $c\in(a,b)$ が存在して
> $$
> f'(c)=\frac{f(b)-f(a)}{b-a}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

割線を引いた差
$$
g(x)=f(x)-\frac{f(b)-f(a)}{b-a}(x-a)
$$
を考えると $g(a)=g(b)$。Rolleの定理より $g'(c)=0$ となる $c$ があり、整理すれば主張を得ます。$\square$
<!-- proof-end -->

この一行から「$f'\ge0$ なら単調増加」「$|f'|\le M$ なら $|f(x)-f(y)|\le M|x-y|$」が出ます。

<a id="thm-ra3-cauchy-mvt"></a>
<!-- formal-statement-start -->
> **定理（Cauchyの平均値定理）**  
> $f,g$ が平均値定理と同様の仮定を満たすとき、ある $c\in(a,b)$ が存在して
> $$
> (f(b)-f(a))g'(c)=(g(b)-g(a))f'(c).
> $$
<!-- formal-statement-end -->

L'Hôpitalの法則はこの定理を局所極限へ適用した結果として位置付けられます。分母の導関数が0にならないことなどの仮定を落とさないことが重要です。

---

## 3. Taylorの定理

<a id="thm-ra3-taylor"></a>
<!-- formal-statement-start -->
> **定理（Taylorの定理：Lagrange剰余）**  
> $f$ が $a$ と $x$ を含む区間で $n+1$ 回微分可能なら、ある $\xi$ が $a$ と $x$ の間に存在して
> $$
> f(x)=\sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k
> +\frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}.
> $$
<!-- formal-statement-end -->

「Taylor級数と関数が等しい」は別の主張です。有限次Taylor定理は剰余項込みなら成立しますが、無限級数へ移るには剰余が0へ行く確認が必要です。

---

## 4. 逆関数の微分

<a id="thm-ra3-inverse"></a>
<!-- formal-statement-start -->
> **定理（逆関数の微分）**  
> $f$ が単調で逆関数を持ち、$f$ が $a$ で微分可能、$f'(a)\ne0$、逆関数が $b=f(a)$ で連続なら
> $$
> (f^{-1})'(b)=\frac1{f'(a)}.
> $$
<!-- formal-statement-end -->

差商を
$$
\frac{f^{-1}(y)-f^{-1}(b)}{y-b}
=\frac{x-a}{f(x)-f(a)}
$$
と書けば意味が見えます。

---

## 5. 演習

### Level A

<a id="ex-ra3-a01"></a>
#### RA3-A01 Rolle
- Level: A

$f(x)=x^2-1$ を $[-1,1]$ に制限してRolleの定理の点を求めよ。

<!-- solution-start -->
**解答**：$f(-1)=f(1)=0$。$f'(x)=2x$ なので $c=0$。
<!-- solution-end -->

<a id="ex-ra3-a02"></a>
#### RA3-A02 平均値定理
- Level: A

$f(x)=\log x$ を $[1,e]$ に適用したときの $c$ を求めよ。

<!-- solution-start -->
**解答**：平均変化率は $1/(e-1)$。$f'(c)=1/c$ だから $c=e-1\in(1,e)$。
<!-- solution-end -->

<a id="ex-ra3-a03"></a>
#### RA3-A03 Lipschitz評価
- Level: A

$|\sin x-\sin y|\le|x-y|$ を平均値定理で示せ。

<!-- solution-start -->
**解答**：ある $c$ が存在して $\sin x-\sin y=\cos c(x-y)$。$|\cos c|\le1$ から従う。
<!-- solution-end -->

<a id="ex-ra3-a04"></a>
#### RA3-A04 Taylor
- Level: A

$e^x$ を0のまわりで2次までTaylor展開し、Lagrange剰余を書け。

<!-- solution-start -->
**解答**：$e^x=1+x+x^2/2+e^{\xi}x^3/6$。$\xi$ は0と $x$ の間。
<!-- solution-end -->

### Level B

<a id="ex-ra3-b01"></a>
#### RA3-B01 導関数0なら定数
- Level: B

区間 $I$ 上で $f'(x)=0$ がすべての内部点で成り立つなら $f$ は定数であることを示せ。

<!-- solution-start -->
**解答**：任意の $x<y$ に平均値定理を適用すると $f(y)-f(x)=f'(c)(y-x)=0$。よって任意の二点で値が等しい。
<!-- solution-end -->

<a id="ex-ra3-b02"></a>
#### RA3-B02 指数関数の誤差
- Level: B

$0\le x\le1$ で $e^x-(1+x)\le ex^2/2$ を示せ。

<!-- solution-start -->
**解答**：1次Taylor定理より $e^x=1+x+e^{\xi}x^2/2$。$0\le\xi\le1$ なので $e^{\xi}\le e$。
<!-- solution-end -->

<a id="ex-ra3-b03"></a>
#### RA3-B03 逆関数
- Level: B

$f(x)=x^3+x$ の逆関数 $g$ について $g'(0)$ を求めよ。

<!-- solution-start -->
**解答**：$f(0)=0$, $f'(0)=1$。したがって $g'(0)=1/f'(0)=1$。
<!-- solution-end -->

### Level C

<a id="ex-ra3-c01"></a>
#### RA3-C01 Taylorからeの近似誤差を保証する
- Level: C

$e=e^1$ を $\sum_{k=0}^{n}1/k!$ で近似する。誤差が $10^{-6}$ 未満になることを保証する十分な $n$ を、Lagrange剰余を使って求めよ。

<!-- solution-start -->
**解答**：$R_n=e^{\xi}/(n+1)!$ で $0<\xi<1$ より $R_n<e/(n+1)!$。$10! = 3628800$ なので $e/10!<10^{-6}$。したがって $n=9$ で十分（最小性までは要求していない）。
<!-- solution-end -->

---

## 6. 次に進む

**次：[RA4 Riemann/Darboux積分・FTC](../RA4_Riemann_Darboux積分_FTC/index.md)**
