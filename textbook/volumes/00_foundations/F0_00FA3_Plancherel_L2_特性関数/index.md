# F0-00FA3 Encore II：Plancherel・$L^2$ Fourier変換・特性関数

FA2では $f\in L^1(\mathbb R)$ に対して Fourier 積分を点ごとに定義しました。しかし $L^2$ 関数は $L^1$ とは限らず、積分

$$
\int f(x)e^{-i\xi x}dx
$$

が各 $\xi$ で存在するとは限りません。

この章では

```text
L1∩L2 上で Fourier変換
 ↓
Gaussian cutoff で Plancherel を証明
 ↓
L1∩L2 の L2 稠密性
 ↓
全 L2 へ連続拡張
```

という順で、Fourier変換を Hilbert 空間上の等長座標変換へ拡張します。

---

## 1. まず $L^1\cap L^2$ 上で考える

$f\in L^1\cap L^2$ なら古典的 Fourier 変換

$$
\widehat f(\xi)=\int f(x)e^{-i\xi x}dx
$$

が点ごとに定義できます。

目標は

$$
\boxed{
\frac1{2\pi}\int|\widehat f(\xi)|^2d\xi
=\int|f(x)|^2dx
}
$$

をまずこのクラスで証明することです。

---

## 2. $L^2(\mathbb R)$ の平行移動連続性

FA1で周期版を証明しました。実数全体でも同じ構造です。

<a id="lem-f0-00fa3-l2-translation"></a>

<!-- formal-statement-start -->
> **補題（$L^2(\mathbb R)$ の平行移動連続性）**  
> $f\in L^2(\mathbb R)$ とし $(\tau_hf)(x)=f(x-h)$ と置くと

$$
\boxed{\|\tau_hf-f\|_2\to0\qquad(h\to0)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：有限測度台の単関数で近似する

まず有限区間 $I$ なら

$$
\|1_{I+h}-1_I\|_2^2
=\lambda((I+h)\triangle I)\to0.
$$

有限個の区間の指示関数の線形結合にも従います。

有限測度の可測集合は、Lebesgue外測度の定義から有限個の区間の和で対称差測度を任意に小さくできます。従って有限測度台の単関数にも平行移動連続性が従います。

一般の $f\in L^2$ に対して

$$
f_N(x)=f(x)1_{[-N,N]}(x)1_{\{|f(x)|\le N\}}
$$

と置けば $\|f_N-f\|_2\to0$ です。各 $f_N$ は有限測度台を持つ有界関数なので単関数で $L^2$ 近似できます。平行移動が $L^2$ ノルムを保存することから、近似誤差を挟めば一般の $f$ でも主張が従います。
<!-- proof-end -->

---

## 3. Gaussian kernel は $L^2$ でも恒等作用素へ近づく

FA2と同じ

$$
k_\varepsilon(x)
=\frac1{2\sqrt{\pi\varepsilon}}
\exp\left(-\frac{x^2}{4\varepsilon}\right)
$$

を使います。

<a id="lem-f0-00fa3-gaussian-l2"></a>

<!-- formal-statement-start -->
> **補題（Gaussian approximate identity の $L^2$ 収束）**  
> 任意の $f\in L^2(\mathbb R)$ について

$$
\boxed{\|f*k_\varepsilon-f\|_2\to0
\qquad(\varepsilon\downarrow0)}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：平行移動連続性を Gaussian で平均する

$k_\varepsilon\ge0$ かつ $\int k_\varepsilon=1$ です。Cauchy--Schwarz により

$$
|f*k_\varepsilon(x)-f(x)|^2
\le
\int k_\varepsilon(h)|f(x-h)-f(x)|^2dh.
$$

非負関数なので積分順序を交換して

$$
\|f*k_\varepsilon-f\|_2^2
\le
\int k_\varepsilon(h)\|\tau_hf-f\|_2^2dh.
$$

任意の $\eta>0$ に対し、[$L^2(\mathbb R)$ の平行移動連続性](#lem-f0-00fa3-l2-translation)から $|h|<\delta$ なら $\|\tau_hf-f\|_2^2<\eta$ とできます。遠方では常に

$$
\|\tau_hf-f\|_2^2\le4\|f\|_2^2
$$

であり、Gaussian の質量は $|h|\ge\delta$ から消えていきます。従って右辺は0へ収束します。
<!-- proof-end -->

---

## 4. $L^1\cap L^2$ 上の Plancherel 等式

<a id="thm-f0-00fa3-plancherel-core"></a>

<!-- formal-statement-start -->
> **定理（Plancherel 等式：$L^1\cap L^2$ 版）**  
> $f\in L^1(\mathbb R)\cap L^2(\mathbb R)$ とします。このとき $\widehat f\in L^2(\mathbb R)$ で

$$
\boxed{
\frac1{2\pi}\|\widehat f\|_2^2
=\|f\|_2^2
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：周波数側の Gaussian cutoff を空間側へ戻す

$\varepsilon>0$ に対して

$$
I_\varepsilon
:=\frac1{2\pi}
\int_{\mathbb R}|\widehat f(\xi)|^2e^{-\varepsilon\xi^2}d\xi
$$

と置きます。$f\in L^1$ なので、Fourier変換の定義を二回代入した三重積分は絶対可積分です。実際

$$
\iiint |f(x)||f(y)|e^{-\varepsilon\xi^2}
\,dx\,dy\,d\xi
=\|f\|_1^2\sqrt{\frac\pi\varepsilon}<\infty.
$$

したがって [Fubiniの定理](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-f0-00d2c-02) を使えます。$\widehat f(\xi)\overline{\widehat f(\xi)}$ を展開すると

$$
\begin{aligned}
I_\varepsilon
&=\iint f(x)\overline{f(y)}
\left[
\frac1{2\pi}\int e^{-\varepsilon\xi^2}e^{-i\xi(x-y)}d\xi
\right]dx\,dy\\
&=\iint f(x)\overline{f(y)}k_\varepsilon(x-y)dx\,dy\\
&=\int f(x)\overline{(f*k_\varepsilon)(x)}dx.
\end{aligned}
$$

[Gaussian approximate identity の $L^2$ 収束](#lem-f0-00fa3-gaussian-l2)から $f*k_\varepsilon\to f$ in $L^2$ なので Cauchy--Schwarz により

$$
I_\varepsilon\to\|f\|_2^2.
$$

一方 $\varepsilon\downarrow0$ のとき

$$
|\widehat f(\xi)|^2e^{-\varepsilon\xi^2}
\uparrow |\widehat f(\xi)|^2.
$$

非負関数の単調収束から

$$
I_\varepsilon
\uparrow
\frac1{2\pi}\int|\widehat f(\xi)|^2d\xi.
$$

両極限を比較して

$$
\frac1{2\pi}\|\widehat f\|_2^2=\|f\|_2^2.
$$

特に右辺が有限なので $\widehat f\in L^2$ も同時に分かります。
<!-- proof-end -->

この証明では Plancherel を反転定理から借りていません。Gaussian cutoff と $L^2$ approximate identity だけで直接証明しています。

---

## 5. $L^1\cap L^2$ は $L^2$ に稠密

任意の $f\in L^2$ に対し

$$
f_N(x)=f(x)1_{[-N,N]}(x)1_{\{|f(x)|\le N\}}
$$

と置きます。$f_N$ は有界かつ有限測度台を持つので $f_N\in L^1\cap L^2$ です。また

$$
|f-f_N|^2
=|f|^2 1_{\{|x|>N\}\cup\{|f|>N\}}
$$

であり、右辺は0へ点wise収束し $|f|^2$ に支配されるので優収束定理から

$$
\|f_N-f\|_2\to0.
$$

この稠密性が、古典的 Fourier 積分を全 $L^2$ へ延ばす鍵です。

---

## 6. $L^2$ Fourier変換

<a id="def-f0-00fa3-l2-fourier"></a>

<!-- formal-statement-start -->
> **定義（$L^2$ Fourier変換）**  
> $f\in L^2(\mathbb R)$ に対し、$f_n\in L^1\cap L^2$ で $\|f_n-f\|_2\to0$ となる列を取ります。[Plancherel等式の $L^1\cap L^2$ 版](#thm-f0-00fa3-plancherel-core)により $(\widehat f_n)$ は $L^2$ Cauchy 列になるので、その $L^2$ 極限を

$$
\mathcal F_2f
:=L^2\text{-}\lim_{n\to\infty}\widehat f_n
$$

> と定義します。
<!-- formal-statement-end -->

近似列を変えても、二つの列の差に同じ Plancherel 等式を使えば極限は同じです。したがって定義は well-defined です。

### 6.1 例：Gaussianでは古典的変換と一致する

$f(x)=e^{-x^2}$ とします。

<!-- definition-example-start: def-f0-00fa3-l2-fourier -->
**定義の確認**  
$f\in L^1\cap L^2$ なので、定義で近似列を $f_n=f$ と一定に取れます。したがって $L^2$ Fourier変換は古典的 Fourier変換と一致し、FA2の計算から

$$
\mathcal F_2f(\xi)=\sqrt\pi e^{-\xi^2/4}
$$

です。
<!-- definition-example-end -->

---

## 7. 全 $L^2$ 上の Plancherel 定理

<a id="thm-f0-00fa3-plancherel"></a>

<!-- formal-statement-start -->
> **定理（Plancherel）**  
> 上で定義した $L^2$ Fourier変換 $\mathcal F_2$ は線形で、任意の $f\in L^2(\mathbb R)$ に対して

$$
\boxed{
\|\mathcal F_2f\|_2^2
=2\pi\|f\|_2^2
}
$$

> を満たします。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：稠密部分空間上の等式を極限へ送る

$f_n\in L^1\cap L^2$、$f_n\to f$ in $L^2$ とします。定義から

$$
\widehat f_n\to\mathcal F_2f
\quad\text{in }L^2.
$$

[Plancherel等式の $L^1\cap L^2$ 版](#thm-f0-00fa3-plancherel-core)より

$$
\|\widehat f_n\|_2^2=2\pi\|f_n\|_2^2.
$$

ノルムの連続性で $n\to\infty$ とすれば

$$
\|\mathcal F_2f\|_2^2=2\pi\|f\|_2^2.
$$

線形性も近似列へ線形結合を取れば従います。
<!-- proof-end -->

正規化

$$
Uf:=\frac1{\sqrt{2\pi}}\mathcal F_2f
$$

を使えば

$$
\boxed{\|Uf\|_2=\|f\|_2}.
$$

---

## 8. 内積も保存する

<a id="cor-f0-00fa3-inner-product"></a>

<!-- formal-statement-start -->
> **系（Parseval--Plancherel の内積形）**  
> 任意の $f,g\in L^2(\mathbb R)$ について

$$
\boxed{
\langle f,g\rangle_{L^2}
=\frac1{2\pi}
\langle\mathcal F_2f,\mathcal F_2g\rangle_{L^2}
}
$$

> が成り立ちます。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：ノルム保存を偏極する

複素内積空間では、$\|f+g\|^2$、$\|f-g\|^2$、$\|f+ig\|^2$、$\|f-ig\|^2$ の4本から $\langle f,g\rangle$ の実部・虚部を復元できます。[Plancherel定理](#thm-f0-00fa3-plancherel)をこの4本へ適用すれば、内積も同じ倍率 $2\pi$ で保存されることが従います。
<!-- proof-end -->

従って正規化 Fourier 変換 $U$ は Hilbert 空間の角度と距離を保存します。

---

## 9. 逆変換も $L^2$ へ拡張できる

$g\in L^1$ に対する逆向き積分を

$$
\check g(x)
:=\frac1{2\pi}\int g(\xi)e^{i\xi x}d\xi
$$

と書きます。前節までの証明を符号を反転して同じように行えば、$\check{\phantom g}$ も $L^2$ 上の連続作用素へ拡張でき、

$$
\|\check g\|_2^2=\frac1{2\pi}\|g\|_2^2
$$

を満たします。

<a id="thm-f0-00fa3-unitary"></a>

<!-- formal-statement-start -->
> **定理（正規化 Fourier変換のユニタリ性）**  
> $U=(2\pi)^{-1/2}\mathcal F_2$ は $L^2(\mathbb R)$ から $L^2(\mathbb R)$ への全単射な等長線形写像です。古典的に積分表示できる関数では逆写像は

$$
U^{-1}g(x)
=\frac1{\sqrt{2\pi}}\int_{\mathbb R}g(\xi)e^{i\xi x}d\xi
$$

> であり、一般の $L^2$ 関数にはこの作用素を $L^2$ 連続拡張して定義します。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明：Gaussian cutoff で逆変換との合成を恒等写像へ戻す

まず $f\in L^1\cap L^2$ とします。$\widehat f\in L^2$ は既に示しました。周波数側で

$$
h_\varepsilon(\xi)
=e^{-\varepsilon\xi^2}\widehat f(\xi)
$$

と置くと、$\widehat f$ は $L^1$ Fourier変換なので有界であり、Gaussianを掛けた $h_\varepsilon$ は $L^1\cap L^2$ です。

FA2の反転証明と同じ Fubini の議論から、その逆 Fourier 積分は

$$
\check h_\varepsilon=f*k_\varepsilon.
$$

$\varepsilon\downarrow0$ で、左の入力は $h_\varepsilon\to\widehat f$ in $L^2$、右辺は $f*k_\varepsilon\to f$ in $L^2$ です。逆変換の $L^2$ 連続性から

$$
\mathcal F_2^{-1}(\mathcal F_2f)=f
$$

が $L^1\cap L^2$ 上で従います。両作用素は $L^2$ 連続で $L^1\cap L^2$ は稠密なので、この恒等式は全 $L^2$ へ延長されます。逆向きの合成も同様です。

したがって $\mathcal F_2$ は可逆であり、正規化した $U=(2\pi)^{-1/2}\mathcal F_2$ は [Plancherel定理](#thm-f0-00fa3-plancherel) により等長です。上の $\check{\phantom g}$ との係数関係から、$U^{-1}$ の古典的積分式はステートメントの $1/\sqrt{2\pi}$ 規約になります。
<!-- proof-end -->

これで「Fourier変換は無限次元版の直交座標変換」という比喩が、数学的にも literal な主張になります。

---

## 10. Fourier級数の Parseval との対応

FA1では

$$
\|f\|_2^2
=2\pi\sum_{n\in\mathbb Z}|c_n|^2.
$$

ここでは

$$
\|f\|_2^2
=\frac1{2\pi}\int_{\mathbb R}|\mathcal F_2f(\xi)|^2d\xi.
$$

つまり

$$
\boxed{
\text{離散周波数の二乗和}
\longleftrightarrow
\text{連続周波数の二乗積分}
}
$$

であり、Parseval と Plancherel は同じ Hilbert 空間構造の離散版・連続版です。

---

## 11. 微分作用素・特性関数・CLT

十分滑らかな関数では

$$
\widehat{f'}(\xi)=i\xi\widehat f(\xi),
$$

なので Fourier 変換は微分作用素を掛け算作用素へ移します。これが熱方程式・波動方程式を周波数ごとのODEへ分解する理由です。

また確率変数 $X$ の特性関数

$$
\varphi_X(t)=E[e^{itX}]
$$

は確率測度の Fourier 変換です。独立和が畳み込み、Fourier空間では積になるため、中心極限定理の特性関数証明も Fourier 解析として読めます。

---

# 演習

## F0-00FA3-A01 $2\pi$ の定数を具体例で確認する

- Level: A
- 目安時間: 12分

$$
f(x)=e^{-|x|},
\qquad
\widehat f(\xi)=\frac2{1+\xi^2}
$$

を使い Plancherel 等式を確認せよ。ただし

$$
\int_{-\infty}^{\infty}\frac{d\xi}{(1+\xi^2)^2}=\frac\pi2
$$

を使ってよい。

<!-- solution-start -->
### 詳細解答

空間側は

$$
\|f\|_2^2
=2\int_0^\infty e^{-2x}dx=1.
$$

周波数側は

$$
\frac1{2\pi}\|\widehat f\|_2^2
=\frac1{2\pi}\cdot4\cdot\frac\pi2=1.
$$

### 本番答案

両辺とも1。

### 採点基準（20点）

- 空間側: 7点
- 周波数側: 9点
- 一致: 4点
<!-- solution-end -->

## F0-00FA3-A02 $L^1\cap L^2$ 近似列を作る

- Level: A
- 目安時間: 10分

$f\in L^2(\mathbb R)$ に対し

$$
f_N=f1_{[-N,N]}1_{\{|f|\le N\}}
$$

が $L^1\cap L^2$ に属し、$f_N\to f$ in $L^2$ を示せ。

<!-- solution-start -->
### 詳細解答

$f_N$ は台の測度が有限で $|f_N|\le N$ なので $L^1\cap L^2$。また

$$
|f-f_N|^2
=|f|^2 1_{\{|x|>N\}\cup\{|f|>N\}}
$$

で右辺は0へ点wise収束し、$|f|^2$ に支配されます。従って優収束定理により $\|f_N-f\|_2\to0$ です。

### 本番答案

有界・有限台より $L^1\cap L^2$。$L^2$ 誤差は $|f|^2$ の尾部積分なので0へ行く。

### 採点基準（20点）

- $L^1$: 7点
- $L^2$: 5点
- 収束: 8点
<!-- solution-end -->

## F0-00FA3-B01 Gaussian cutoff から Plancherel の核心式

- Level: B
- 目安時間: 18分

$f\in L^1\cap L^2$ とし

$$
I_\varepsilon
=\frac1{2\pi}\int|\widehat f(\xi)|^2e^{-\varepsilon\xi^2}d\xi.
$$

$$
I_\varepsilon
=\int f(x)\overline{(f*k_\varepsilon)(x)}dx
$$

を示せ。

<!-- solution-start -->
### 詳細解答

$|\widehat f|^2$ を二つの Fourier 積分の積として展開する。$f\in L^1$ と Gaussian 因子により三重積分は絶対可積分なので Fubini が使える。$\xi$ 積分は

$$
\frac1{2\pi}\int e^{-\varepsilon\xi^2}e^{-i\xi(x-y)}d\xi
=k_\varepsilon(x-y).
$$

従って主張の内積形を得る。

### 本番答案

絶対可積分性を確認して積分順序を交換し、Gaussian Fourier公式で $k_\varepsilon(x-y)$ を得る。

### 採点基準（20点）

- 展開: 5点
- Fubini条件: 6点
- Gaussian積分: 6点
- 内積形: 3点
<!-- solution-end -->

## F0-00FA3-B02 なぜ古典的積分を直接 $L^2$ に使えないか

- Level: B
- 目安時間: 12分

$$
f(x)=\frac1{(1+|x|)^{3/4}}
$$

について $f\in L^2(\mathbb R)$ だが $f\notin L^1(\mathbb R)$ を示し、$L^2$ Fourier変換を極限で定義する必要性を説明せよ。

<!-- solution-start -->
### 詳細解答

無限遠で $f(x)\asymp |x|^{-3/4}$ なので $\int|f|$ は発散します。一方 $|f|^2\asymp |x|^{-3/2}$ なので $\int|f|^2$ は収束します。従って古典的 $L^1$ Fourier積分は自動では定義できず、稠密部分空間からの $L^2$ 極限が必要です。

### 本番答案

$p$-積分判定で $3/4\le1$ より $L^1$ でなく、$3/2>1$ より $L^2$。ゆえに点ごとの積分ではなく $L^2$ 拡張が必要。

### 採点基準（20点）

- $L^1$ 判定: 7点
- $L^2$ 判定: 7点
- 定義との接続: 6点
<!-- solution-end -->

## F0-00FA3-B03 正規化 Fourier変換が距離を保存する

- Level: B
- 目安時間: 10分

$U=(2\pi)^{-1/2}\mathcal F_2$ とする。任意の $f,g\in L^2$ について

$$
\|Uf-Ug\|_2=\|f-g\|_2
$$

を示せ。

<!-- solution-start -->
### 詳細解答

線形性と [Plancherel定理](#thm-f0-00fa3-plancherel) から

$$
\|Uf-Ug\|_2
=\|U(f-g)\|_2
=\|f-g\|_2.
$$

### 本番答案

Plancherel を $f-g$ に適用するだけでよい。

### 採点基準（20点）

- 線形性: 6点
- Plancherel: 10点
- 結論: 4点
<!-- solution-end -->

---

## 章末チェック

- $L^1\cap L^2$ 上で Plancherel 等式を Gaussian cutoff から証明できる。
- $L^1\cap L^2$ が $L^2$ に稠密であることを具体的な切断列で示せる。
- $L^2$ Fourier変換を近似列の極限として定義できる。
- 全 $L^2$ 上の Plancherel 等式を連続拡張で導ける。
- 正規化 Fourier変換が等長かつ可逆である理由を説明できる。
- Parseval と Plancherel を離散スペクトル・連続スペクトルの対応として説明できる。

次は [F0-00PDE1 熱方程式・Fourier変換](../F0_00PDE1_熱方程式_Fourier変換/index.md) で、この座標変換を実際に微分方程式へ適用します。
