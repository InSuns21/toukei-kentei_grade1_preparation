# CA6 Möbius変換・Schwarz補題・調和関数・Poisson核

> **実装状態**：複素解析から Fourier/PDE へ渡す draft。**定理の証明は TODO**。Riemann mapping theorem・Montel theorem は別の advanced-standard 拡張へ延期します。

## 1. Möbius 変換
$$M(z)=\frac{az+b}{cz+d},\qquad ad-bc\ne0$$
を Riemann 球面上で扱う。

### 定理 CA6-THM-01：基本性質
Möbius 変換は全単射な等角写像で、逆も Möbius。一般化円を一般化円へ写す。
**証明 TODO**：分数線形変換を直接計算する。

## 2. Schwarz lemma
### 定理 CA6-THM-02：Schwarz lemma
$f:\mathbb D\to\mathbb D$, $f(0)=0$ なら
$$|f(z)|\le|z|,\qquad |f'(0)|\le1.$$
等号の場合は $f(z)=e^{i\theta}z$。
**証明 TODO**：$f(z)/z$ の可除特異点と最大値原理を使う。

### 系 CA6-COR-01：円板自己同型
円板自己同型は $e^{i\theta}(z-a)/(1-\bar az)$ の形。
**証明 TODO**：$a$ を0へ送る Möbius 変換と Schwarz lemma を合成する。

## 3. 調和関数
$\Delta u=u_{xx}+u_{yy}=0$ を満たす $C^2$ 関数を調和関数という。

### 定理 CA6-THM-03：正則関数と調和関数
正則関数の実部・虚部は調和的。
**証明 TODO**：CA3 の滑らかさと Cauchy–Riemann を使う。

### 定理 CA6-THM-04：平均値性質
調和関数は円周平均で中心値を表し、非定数なら内部最大・最小を持たない。
**証明 TODO**：局所調和共役を使う方法と直接証明の依存を整理する。

## 4. Poisson kernel
$$P_r(\theta)=\frac{1-r^2}{1-2r\cos\theta+r^2}.$$

### 定理 CA6-THM-05：Poisson integral
$$u(re^{i\theta})=\frac1{2\pi}\int_{-\pi}^{\pi}P_r(\theta-t)g(e^{it})\,dt$$
は連続境界データ $g$ に対する円板内の調和拡張で、$r\uparrow1$ で境界値へ収束する。
**証明 TODO**：非負性、平均1、質量集中という approximate identity の3性質を分離して示す。

$$P_r(\theta)=1+2\sum_{n\ge1}r^n\cos(n\theta)$$
は Fourier 解析との直接の接点である。

## 証明境界
Riemann mapping theorem、normal family、Montel theorem はここでは使用しない。RA8 と接続した発展章へ送る。

## 演習
- Level: A — 上半平面を単位円板へ写す Möbius 変換を構成せよ。
- Level: A — $(z-a)/(1-\bar az)$ が $a$ を0へ写すことを確認せよ。
- Level: A — $x^2-y^2$ が調和的であることを示せ。
- Level: A — Poisson kernel の非負性を示せ。
- Level: B — Schwarz lemma から円板自己同型を導け。
- Level: B — 正則関数の実部の調和性を導け。
- Level: B — $P_r$ の積分が $2\pi$ であることを示せ。
- Level: C — Poisson integral の境界収束を近傍・遠方に分けた $\varepsilon$ 論証で示せ。
