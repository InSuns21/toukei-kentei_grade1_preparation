# CA4 Laurent展開・孤立特異点・留数定理

> **実装状態**：定理文・例・演習を先行実装した draft。**定理の証明は TODO**。

## 1. Laurent 展開
### 定理 CA4-THM-01：Laurent 展開
$f$ が $r<|z-a|<R$ で正則なら
$$f(z)=\sum_{n=-\infty}^{\infty}c_n(z-a)^n,$$
$$c_n=\frac1{2\pi i}\int_{|\zeta-a|=\rho}\frac{f(\zeta)}{(\zeta-a)^{n+1}}\,d\zeta$$
と一意に展開できる。
**証明 TODO**：内外の Cauchy 核を幾何級数展開し項別積分する。

## 2. 孤立特異点
### 定理 CA4-THM-02：分類
Laurent 主部が空なら可除、有限非空なら極、無限なら真性特異点である。
**証明 TODO**：有界性・零点の位数・Laurent 一意性を対応させる。

### 定理 CA4-THM-03：可除特異点定理
孤立特異点の近傍で有界な正則関数は正則に延長できる。
**証明 TODO**：負の Laurent 係数が消えることを Cauchy 評価で示す。

## 3. 留数
$c_{-1}$ を $\operatorname{Res}(f,a)$ と呼ぶ。

### 定理 CA4-THM-04：留数定理
適切な閉曲線 $\gamma$ と孤立特異点 $a_k$ に対し
$$\int_\gamma f(z)\,dz=2\pi i\sum_k\operatorname{Ind}(\gamma,a_k)\operatorname{Res}(f,a_k).$$
**証明 TODO**：特異点を小円でくり抜き、境界の向きを追う。

単純極では $\operatorname{Res}(f,a)=\lim_{z\to a}(z-a)f(z)$。contour 実積分では大円弧の寄与を「減衰×弧長」で必ず評価する。

## 演習
- Level: A — $1/[z(z-1)]$ の各極の留数を求めよ。
- Level: A — $e^z/z^3$ の0での留数を求めよ。
- Level: A — $\sin z/z^4$ の Laurent 主部を求めよ。
- Level: A — $e^{1/z}$ の0が真性特異点であることを確認せよ。
- Level: B — 可除特異点定理を Laurent 係数から導け。
- Level: B — 単純極の留数公式を導け。
- Level: B — 留数定理で $\int_{-\infty}^{\infty}(1+x^2)^{-1}dx$ を計算し大円弧評価も書け。
- Level: C — $\int_{-\infty}^{\infty}e^{itx}/(1+x^2)\,dx$ を計算し Fourier 変換との接続を説明せよ。
