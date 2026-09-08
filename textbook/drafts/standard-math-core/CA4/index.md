# CA4 Laurent展開・孤立特異点・留数定理

> **実装状態**：定理文・例・演習を先行実装した draft。**定理の証明は TODO**。CA5 の winding number を先取りせず、本章の留数定理は正向き単純閉曲線版で閉じます。

## 1. Laurent 展開

### 定理 CA4-THM-01：Laurent 展開

$f$ が $r<|z-a|<R$ で正則なら

$$
f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n,
$$

$$
c_n=\frac1{2\pi i}\int_{|\zeta-a|=\rho}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta
$$

と一意に展開できる。

**証明 TODO**：内外の Cauchy 核を幾何級数展開し項別積分する。

## 2. 孤立特異点と meromorphic 関数

### 定理 CA4-THM-02：分類

Laurent 主部が空なら可除、有限非空なら極、無限なら真性特異点である。

**証明 TODO**：有界性・零点の位数・Laurent 一意性を対応させる。

### 定理 CA4-THM-03：可除特異点定理

孤立特異点の近傍で有界な正則関数は正則に延長できる。

**証明 TODO**：負の Laurent 係数が消えることを Cauchy 評価で示す。

領域 $\Omega$ 上の関数 $f$ が **meromorphic** であるとは、$\Omega$ 内の各点の近傍で、正則であるか、有限位数の極を持つことをいう。したがって極は領域内部に集積しない。

## 3. 留数

Laurent 展開の係数 $c_{-1}$ を $f$ の $a$ における留数 $\operatorname{Res}(f,a)$ と呼ぶ。

### 定理 CA4-THM-04：留数定理（単純閉曲線版）

$\gamma$ を正向きの区分的 $C^1$ 単純閉曲線とし、その像と内部を含む開集合で $f$ が有限個の孤立特異点 $a_1,\dots,a_m$ を除いて正則で、$\gamma$ 上には特異点を持たないとする。このとき

$$
\int_\gamma f(z)\,dz
=2\pi i\sum_{k=1}^m\operatorname{Res}(f,a_k).
$$

**証明 TODO**：各特異点を互いに素な小円板でくり抜き、残った領域に Cauchy の定理を適用して外側境界と内側境界の向きを追う。一般閉曲線に対する winding number 付き形式は CA5 で扱う。

単純極では

$$
\operatorname{Res}(f,a)=\lim_{z\to a}(z-a)f(z).
$$

contour を用いる実積分では、大円弧の寄与を0と書くだけで済ませず、「被積分関数の上界 × 弧長」で実際に評価する。

## 演習

- Level: A — $1/[z(z-1)]$ の各極の留数を求めよ。
- Level: A — $e^z/z^3$ の0での留数を求めよ。
- Level: A — $\sin z/z^4$ の Laurent 主部を求めよ。
- Level: A — $e^{1/z}$ の0が真性特異点であることを確認せよ。
- Level: B — 可除特異点定理を Laurent 係数から導け。
- Level: B — 単純極の留数公式を導け。
- Level: B — 留数定理で $\int_{-\infty}^{\infty}(1+x^2)^{-1}dx$ を計算し、大円弧評価も書け。
- Level: C — $\int_{-\infty}^{\infty}e^{itx}/(1+x^2)\,dx$ を計算し Fourier 変換との接続を説明せよ。