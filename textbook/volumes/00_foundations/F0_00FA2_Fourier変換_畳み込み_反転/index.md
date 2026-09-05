# F0-00FA2 Encore II：Fourier変換・畳み込み・反転

FA1では周期関数を離散周波数 $n\in\mathbb Z$ に分解しました。ここでは実数全体上の関数を、連続周波数 $\xi\in\mathbb R$ に分解します。

この章の主題は

```text
Fourier変換
 ↓
畳み込みは積へ
 ↓
Gaussian正則化
 ↓
Fourier反転
```

です。特に反転定理を「十分良い関数なら」と済ませず、**どの仮定で、なぜ元へ戻るのか**まで証明します。

---

## 1. Fourier変換

<a id="def-f0-00fa2-fourier-transform"></a>

<!-- formal-statement-start -->
> **定義（Fourier変換）**  
> $f\in L^1(\mathbb R)$ に対し
>
> $$
> \widehat f(\xi)
> :=\int_{\mathbb R}f(x)e^{-i\xi x}\,dx,
> \qquad \xi\in\mathbb R
> $$
>
> を $f$ の Fourier 変換と定義します。
<!-- formal-statement-end -->

本教材では逆向きの定数を $1/(2\pi)$ 側に置く規約を使います。

### 1.1 例：$1_{[-1,1]}$

$f=1_{[-1,1]}$ とします。

<!-- definition-example-start: def-f0-00fa2-fourier-transform -->
**定義の確認**  
$f\in L^1(\mathbb R)$ であり、定義に代入すると $\xi\ne0$ で

$$
\widehat f(\xi)
=\int_{-1}^{1}e^{-i\xi x}dx
=\frac{2\sin\xi}{\xi}.
$$

$\xi=0$ では定義から $\widehat f(0)=2$ で、右辺も極限として2へ連続に延長されます。
<!-- definition-example-end -->

---

## 2. 基本変換則

変数変換だけで次が得られます。

### 平行移動

$g(x)=f(x-a)$ なら

$$
\boxed{\widehat g(\xi)=e^{-ia\xi}\widehat f(\xi)}.
$$

### 変調

$g(x)=e^{iax}f(x)$ なら

$$
\boxed{\widehat g(\xi)=\widehat f(\xi-a)}.
$$

### 尺度変換

$a\ne0$、$g(x)=f(ax)$ なら

$$
\boxed{
\widehat g(\xi)
=\frac1{|a|}\widehat f\left(\frac\xi a\right)
}.
$$

狭い関数ほど周波数側で広がる、という逆関係がここに現れます。

---

## 3. $L^1$ の平行移動連続性

Riemann--Lebesgue の補題を短く証明するため、まず一つ床板を置きます。

<a id="lem-f0-00fa2-l1-translation"></a>

<!-- formal-statement-start -->
> **補題（$L^1$ の平行移動連続性）**  
> $f\in L^1(\mathbb R)$ に対して $(\tau_hf)(x)=f(x-h)$ と置くと
>
> $$
> \boxed{\|\tau_hf-f\|_1\to0\qquad(h\to0)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限区間の指示関数から一般の $L^1$ へ

有限区間 $I=(a,b)$ なら

$$
\|1_{I+h}-1_I\|_1
=\lambda((I+h)\triangle I)
\le2|h|.
$$

有限個の区間の指示関数の線形結合にも従います。

次に可測集合 $E$ で $\lambda(E)<\infty$ を取ります。Lebesgue外測度の定義から、任意の $\varepsilon>0$ に対して $E$ を有限個の区間の和 $U$ で

$$
\lambda(E\triangle U)<\varepsilon
$$

となるよう近似できます。したがって

$$
\|1_{E+h}-1_E\|_1
\le2\|1_E-1_U\|_1+\|1_{U+h}-1_U\|_1
\to 2\lambda(E\triangle U),
$$

ゆえに $\varepsilon\downarrow0$ で指示関数の場合が従います。有限測度台を持つ単関数、さらに $L^1$ 関数をそのような単関数で近似すれば一般の場合も従います。
<!-- proof-end -->

---

## 4. Riemann--Lebesgue の補題

<a id="lem-f0-00fa2-riemann-lebesgue"></a>

<!-- formal-statement-start -->
> **補題（Riemann--Lebesgue）**  
> $f\in L^1(\mathbb R)$ なら
>
> $$
> \boxed{\widehat f(\xi)\to0\qquad(|\xi|\to\infty)}
> $$
>
> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：半周期だけ平行移動して打ち消す

$\xi\ne0$ に対して

$$
h=\frac{\pi}{\xi}
$$

と置くと $e^{-i\xi h}=-1$ です。変数変換により

$$
\int f(x+h)e^{-i\xi x}dx
=e^{i\xi h}\widehat f(\xi)
=-\widehat f(\xi).
$$

したがって

$$
2\widehat f(\xi)
=\int (f(x)-f(x+h))e^{-i\xi x}dx.
$$

絶対値を取れば

$$
2|\widehat f(\xi)|
\le\|f-\tau_{-h}f\|_1.
$$

$|\xi|\to\infty$ なら $h\to0$ なので、前節の平行移動連続性から右辺は0へ収束します。
<!-- proof-end -->

---

## 5. 畳み込み

<a id="def-f0-00fa2-convolution"></a>

<!-- formal-statement-start -->
> **定義（畳み込み）**  
> $f,g\in L^1(\mathbb R)$ に対し
>
> $$
> (f*g)(x)
> :=\int_{\mathbb R}f(x-y)g(y)dy
> $$
>
> と定義します。これは a.e. $x$ で有限で、$f*g\in L^1(\mathbb R)$ です。
<!-- formal-statement-end -->

### 5.1 例：二つの区間指示関数

$f=g=1_{[-1/2,1/2]}$ とします。

<!-- definition-example-start: def-f0-00fa2-convolution -->
**定義の確認**  
$(f*g)(x)$ は

$$
[-1/2,1/2]\cap[x-1/2,x+1/2]
$$

の長さなので

$$
(f*g)(x)
=
\begin{cases}
1-|x|,&|x|\le1,\\
0,&|x|>1.
\end{cases}
$$

定義積分が「二つの区間の重なり長さ」を数えていることが直接確認できます。
<!-- definition-example-end -->

また [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を $|f(x-y)g(y)|$ に適用すると

$$
\|f*g\|_1\le\|f\|_1\|g\|_1
$$

も従います。

---

## 6. 畳み込み定理

<a id="thm-f0-00fa2-convolution"></a>

<!-- formal-statement-start -->
> **定理（畳み込み定理）**  
> $f,g\in L^1(\mathbb R)$ なら
>
> $$
> \boxed{\widehat{f*g}(\xi)=\widehat f(\xi)\widehat g(\xi)}
> $$
>
> が任意の $\xi\in\mathbb R$ で成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：絶対可積分性を確認して積分順序を交換する

固定した $\xi$ について

$$
\iint |f(x-y)g(y)e^{-i\xi x}|\,dy\,dx
=\|f\|_1\|g\|_1<\infty.
$$

したがって [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使えます。$z=x-y$ と置けば

$$
\begin{aligned}
\widehat{f*g}(\xi)
&=\iint f(x-y)g(y)e^{-i\xi x}dy\,dx\\
&=\iint f(z)g(y)e^{-i\xi(z+y)}dz\,dy\\
&=\widehat f(\xi)\widehat g(\xi).
\end{aligned}
$$
<!-- proof-end -->

確率論で独立な和の特性関数が積になるのは、この構造そのものです。

---

## 7. 微分は周波数側の掛け算になる

曖昧な「十分滑らか」を避け、まず確実な十分条件を置きます。

<a id="prop-f0-00fa2-derivative"></a>

<!-- formal-statement-start -->
> **命題（Fourier変換と微分）**  
> $f\in C_c^1(\mathbb R)$ なら
>
> $$
> \boxed{\widehat{f'}(\xi)=i\xi\widehat f(\xi)}
> $$
>
> が成り立ちます。さらに $f\in C_c^2(\mathbb R)$ なら
>
> $$
> \boxed{\widehat{f''}(\xi)=-\xi^2\widehat f(\xi)}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：コンパクト台なので境界項が消える

部分積分により

$$
\begin{aligned}
\widehat{f'}(\xi)
&=\int f'(x)e^{-i\xi x}dx\\
&=[f(x)e^{-i\xi x}]_{-\infty}^{\infty}
+i\xi\int f(x)e^{-i\xi x}dx\\
&=i\xi\widehat f(\xi).
\end{aligned}
$$

もう一度適用すれば二階微分の式を得ます。
<!-- proof-end -->

---

## 8. Gaussian の Fourier 変換

反転証明で使うため、Gaussianの変換もここで導きます。

<a id="lem-f0-00fa2-gaussian-transform"></a>

<!-- formal-statement-start -->
> **補題（Gaussian の Fourier 変換）**  
> $a>0$ に対し $g_a(x)=e^{-ax^2}$ とすると
>
> $$
> \boxed{
> \widehat g_a(\xi)
> =\sqrt{\frac\pi a}\exp\left(-\frac{\xi^2}{4a}\right)
> }.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：$a=1$ を微分方程式に落とす

まず

$$
I(\xi)=\int_{\mathbb R}e^{-x^2}e^{-i\xi x}dx
$$

と置きます。被積分関数とその $\xi$ 微分は積分可能なので積分記号下で微分でき、

$$
I'(\xi)
=-i\int xe^{-x^2}e^{-i\xi x}dx.
$$

$(e^{-x^2})'=-2xe^{-x^2}$ を使って部分積分すると

$$
I'(\xi)=-\frac\xi2 I(\xi).
$$

また Gaussian 積分から $I(0)=\sqrt\pi$。従って一階ODEを解いて

$$
I(\xi)=\sqrt\pi e^{-\xi^2/4}.
$$

一般の $a>0$ は尺度変換 $e^{-ax^2}=g_1(\sqrt a\,x)$ から従います。
<!-- proof-end -->

---

## 9. Gaussian approximate identity

$\varepsilon>0$ に対し

$$
k_\varepsilon(x)
:=\frac1{2\sqrt{\pi\varepsilon}}
\exp\left(-\frac{x^2}{4\varepsilon}\right)
$$

と置きます。すると

$$
k_\varepsilon\ge0,
\qquad
\int_{\mathbb R}k_\varepsilon(x)dx=1,
$$

かつ前節から

$$
\widehat{k_\varepsilon}(\xi)=e^{-\varepsilon\xi^2}.
$$

$a>0$ を固定すれば

$$
\int_{|x|\ge a}k_\varepsilon(x)dx\to0
\qquad(\varepsilon\downarrow0),
$$

なので質量が原点へ集中します。

<a id="lem-f0-00fa2-gaussian-approximation"></a>

<!-- formal-statement-start -->
> **補題（Gaussian による点ごとの近似）**  
> $f\in L^1(\mathbb R)$ が点 $x$ で連続なら
>
> $$
> \boxed{(f*k_\varepsilon)(x)\to f(x)
> \qquad(\varepsilon\downarrow0)}.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：近傍と遠方を分ける

$$
(f*k_\varepsilon)(x)-f(x)
=\int k_\varepsilon(z)(f(x-z)-f(x))dz.
$$

連続性から、任意の $\eta>0$ に対して $|z|<\delta$ なら

$$
|f(x-z)-f(x)|<\eta
$$

となる $\delta>0$ を取れます。近傍部分の絶対値は $\eta$ 以下です。

遠方では

$$
\int_{|z|\ge\delta}k_\varepsilon(z)|f(x-z)|dz
\le
\sup_{|z|\ge\delta}k_\varepsilon(z)\,\|f\|_1\to0,
$$

また

$$
|f(x)|\int_{|z|\ge\delta}k_\varepsilon(z)dz\to0.
$$

従って極限は0です。
<!-- proof-end -->

---

## 10. Fourier反転定理

<a id="thm-f0-00fa2-inversion"></a>

<!-- formal-statement-start -->
> **定理（Fourier反転：$f,\widehat f\in L^1$ の連続版）**  
> $f\in L^1(\mathbb R)$ が連続で、さらに $\widehat f\in L^1(\mathbb R)$ とします。このとき任意の $x\in\mathbb R$ について
>
> $$
> \boxed{
> f(x)
> =\frac1{2\pi}\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}d\xi
> }.
> $$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：周波数側に Gaussian を掛けてから極限を取る

$\varepsilon>0$ に対し

$$
I_\varepsilon(x)
:=\frac1{2\pi}
\int_{\mathbb R}\widehat f(\xi)e^{i\xi x}e^{-\varepsilon\xi^2}d\xi
$$

と置きます。$\widehat f\in L^1$ なので dominated convergence により

$$
I_\varepsilon(x)
\to
\frac1{2\pi}\int\widehat f(\xi)e^{i\xi x}d\xi.
$$

一方 Fourier 変換の定義を代入すると

$$
I_\varepsilon(x)
=\frac1{2\pi}\iint
f(y)e^{-i\xi y}e^{i\xi x}e^{-\varepsilon\xi^2}
\,dy\,d\xi.
$$

絶対値の二重積分は

$$
\|f\|_1\int e^{-\varepsilon\xi^2}d\xi<\infty
$$

なので [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) により積分順序を交換できます。Gaussian の Fourier 公式から内側積分は $2\pi k_\varepsilon(x-y)$ なので

$$
I_\varepsilon(x)
=\int f(y)k_\varepsilon(x-y)dy
=(f*k_\varepsilon)(x).
$$

$f$ は $x$ で連続なので前節の補題から

$$
I_\varepsilon(x)\to f(x).
$$

二つの極限を比較すれば反転公式が得られます。
<!-- proof-end -->

これで「Fourier変換は可逆です」の中身が、

```text
Gaussianで周波数を切る
 ↓
Fubiniで空間側の畳み込みへ戻す
 ↓
Gaussian kernelが恒等作用素へ近づく
 ↓
反転
```

と追えるようになりました。

---

## 11. 特性関数・PDEとの接続

確率変数 $X$ の分布 $P_X$ に対する特性関数

$$
\varphi_X(t)=\int e^{itx}dP_X(x)
$$

は、符号規約を除けば確率測度の Fourier 変換です。独立和で積になる理由も畳み込み定理で統一されます。

また $f\in C_c^2$ なら微分が

$$
\frac d{dx}\longleftrightarrow i\xi,
\qquad
-\frac{d^2}{dx^2}\longleftrightarrow \xi^2
$$

へ移るため、PDEを周波数ごとのODEへ分解できます。

---

# 演習

## F0-00FA2-A01 $e^{-|x|}$ の Fourier 変換

- Level: A
- 目安時間: 12分

$f(x)=e^{-|x|}$ の Fourier 変換を求めよ。

<!-- solution-start -->
### 詳細解答

偶関数なので

$$
\widehat f(\xi)=2\int_0^\infty e^{-x}\cos(\xi x)dx.
$$

$\int_0^\infty e^{-(1-i\xi)x}dx=(1-i\xi)^{-1}$ の実部を取ると

$$
\boxed{\widehat f(\xi)=\frac{2}{1+\xi^2}}.
$$

### 本番答案

偶性より $2\int_0^\infty e^{-x}\cos(\xi x)dx=2/(1+\xi^2)$。

### 採点基準（20点）

- 偶性: 5点
- 積分: 10点
- 結論: 5点
<!-- solution-end -->

## F0-00FA2-A02 区間指示関数の畳み込み

- Level: A
- 目安時間: 10分

$f=1_{[-1/2,1/2]}$ とし、$f*f$ を求めよ。

<!-- solution-start -->
### 詳細解答

$(f*f)(x)$ は二区間 $[-1/2,1/2]$ と $[x-1/2,x+1/2]$ の共通部分の長さです。従って

$$
(f*f)(x)=(1-|x|)_+.
$$

### 本番答案

重なり長さを数えれば $(f*f)(x)=1-|x|$ for $|x|\le1$、それ以外0。

### 採点基準（20点）

- 重なりの解釈: 8点
- 場合分け: 8点
- 結論: 4点
<!-- solution-end -->

## F0-00FA2-B01 畳み込み定理を三角関数で確認する

- Level: B
- 目安時間: 15分

$f=g=1_{[-1/2,1/2]}$ とする。$f*f=(1-|x|)_+$ と $\widehat f(\xi)=2\sin(\xi/2)/\xi$ を使い、$\widehat{f*f}=\widehat f^{\,2}$ を確認せよ。

<!-- solution-start -->
### 詳細解答

畳み込み定理から

$$
\widehat{f*f}(\xi)
=\left(\frac{2\sin(\xi/2)}{\xi}\right)^2.
$$

直接計算する場合も $(1-|x|)_+$ の偶性から

$$
2\int_0^1(1-x)\cos(\xi x)dx
=\frac{2(1-\cos\xi)}{\xi^2}
=\left(\frac{2\sin(\xi/2)}{\xi}\right)^2.
$$

### 本番答案

直接積分で $2(1-\cos\xi)/\xi^2=4\sin^2(\xi/2)/\xi^2=\widehat f^{\,2}$。

### 採点基準（20点）

- 直接積分: 10点
- 三角恒等式: 5点
- 畳み込み定理との一致: 5点
<!-- solution-end -->

## F0-00FA2-B02 Gaussian 正則化から反転する

- Level: B
- 目安時間: 18分

反転定理の証明で用いた

$$
I_\varepsilon(x)
=\frac1{2\pi}\int\widehat f(\xi)e^{i\xi x}e^{-\varepsilon\xi^2}d\xi
$$

が $(f*k_\varepsilon)(x)$ に等しいことを、積分順序交換の条件も含めて示せ。

<!-- solution-start -->
### 詳細解答

$\widehat f$ の定義を代入すると二重積分の絶対値は

$$
\iint |f(y)|e^{-\varepsilon\xi^2}dy\,d\xi
=\|f\|_1\sqrt{\pi/\varepsilon}<\infty.
$$

従って Fubini が使えます。$\xi$ 積分は Gaussian 変換公式より $2\pi k_\varepsilon(x-y)$ なので

$$
I_\varepsilon(x)=\int f(y)k_\varepsilon(x-y)dy.
$$

### 本番答案

絶対可積分性 $\|f\|_1\int e^{-\varepsilon\xi^2}<\infty$ を確認して Fubini。内側の Gaussian 積分を評価して畳み込みを得る。

### 採点基準（20点）

- 絶対可積分性: 7点
- Fubini: 5点
- Gaussian積分: 5点
- 畳み込みへの整理: 3点
<!-- solution-end -->

## F0-00FA2-B03 反転定理の仮定を使う場所

- Level: B
- 目安時間: 12分

反転定理で、(i) $f\in L^1$、(ii) $f$ の連続性、(iii) $\widehat f\in L^1$ をそれぞれ証明のどこで使ったか説明せよ。

<!-- solution-start -->
### 詳細解答

(i) は Fourier 変換の定義と、Gaussian 正則化した二重積分の絶対可積分性に使います。(ii) は approximate identity により $(f*k_\varepsilon)(x)\to f(x)$ とする箇所に使います。(iii) は $e^{-\varepsilon\xi^2}\to1$ に dominated convergence を適用し、正則化した逆積分を通常の逆積分へ戻す箇所に使います。

### 本番答案

$L^1$：変換とFubini、連続性：空間側の近似恒等作用素、$\hat f\in L^1$：周波数側の dominated convergence。

### 採点基準（20点）

- $f\in L^1$: 7点
- 連続性: 6点
- $\widehat f\in L^1$: 7点
<!-- solution-end -->

---

## 章末チェック

- $L^1$ Fourier変換を定義できる。
- Riemann--Lebesgue の補題を平行移動連続性から証明できる。
- 畳み込み定理で Fubini を使う条件を確認できる。
- $C_c^1$ という明示条件の下で微分則を導ける。
- Gaussian の Fourier 変換を導ける。
- $f\in L^1$ continuous、$\widehat f\in L^1$ という条件の下で Fourier 反転を証明できる。

次は [F0-00FA3 Plancherel・L2 Fourier変換](../F0_00FA3_Plancherel_L2_特性関数/index.md) で、点ごとの積分定義を越えて $L^2$ 全体へ Fourier 変換を拡張します。
