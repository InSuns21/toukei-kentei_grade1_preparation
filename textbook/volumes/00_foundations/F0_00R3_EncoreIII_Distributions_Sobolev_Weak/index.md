# F0-00R3 Encore III：Graduate PDE

Encore II では、ODE・Fourier解析・古典 PDE を一巡し、PDE7 で固有関数展開・Green 表現・熱／波動／Laplace--Poisson の三類型を統合しました。

Encore III では、古典解の十分な滑らかさを仮定できない問題へ進みます。中心は **distribution・Sobolev 空間・compactness・変分法・弱解** です。

再編前の F0-00DS1、F0-00DS2、F0-00SOB1、F0-00SOB2、F0-00WK1、F0-00WK2、F0-00WK3 は移植元・履歴確認用としてリポジトリに残しますが、**現行の読者向け主線には載せません**。新しい正本は GPDE 系列へ一本化します。

---

## 1. 標準通読ルート

~~~text
Encore II：PDE1 → … → PDE7
             │
             ↓
GPDE1  テスト関数・distribution
             ↓
GPDE2  distribution微分・mollifier・弱微分
             ↓
GPDE3  Sobolev空間
             ↓
GPDE4  H0^1・Poincare・trace
             ↓
GPDE5  Sobolev embedding・compactness
             ↓
GPDE6  弱形式・変分形式
             ↓
GPDE7  Lax--Milgram
             ↓
GPDE8  二階線形楕円型PDE
             ↓
GPDE9  楕円型正則性
             ↓
GPDE10 Galerkin・時間発展PDEの弱解
~~~

未完成章を reader-facing index に先行登録しません。各章は本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答・依存検証まで完了した時点で、このロードマップからリンク化します。

現在は [GPDE6「弱形式・変分形式」](../GPDE6/index.md) まで公開済みで、次は GPDE7「Lax--Milgram」です。

---

## 2. Encore II と何が変わるか

Encore II では、十分滑らかな解に対し

- Fourier 級数・Fourier 変換
- Sturm--Liouville 固有関数
- Green 関数
- 最大原理
- エネルギー法

を使って古典解を構成・解析しました。

Encore III では

$$
\boxed{
\text{古典解を明示的に作る}
\quad\longrightarrow\quad
\text{適切な関数空間で解の存在を示す}
}
$$

へ重心を移します。

たとえば Poisson 方程式

$$
-\Delta u=f,\qquad u|_{\partial\Omega}=0
$$

を二階微分を直接要求する式としてではなく、

$$
\int_\Omega \nabla u\cdot\nabla v
=
\langle f,v\rangle
\qquad
(\forall v\in H_0^1(\Omega))
$$

として読みます。

---

## 3. 弱解概念の主線

Encore III 本線では次を正本化します。

1. **distributional solution** — PDE を $\mathcal D'(\Omega)$ の等式として読む。
2. **Sobolev / variational weak solution** — 楕円型 PDE と Lax--Milgram の主役。
3. **energy solution** — 熱・波動など時間発展 PDE の主役。
4. **mild solution** — GPDE10 の bridge として位置付ける。

次は Encore III 本線へ入れません。

- entropy solution
- viscosity solution
- renormalized solution
- measure-valued solution
- Leray--Hopf weak solution の本格理論

これらは後続 PDE 拡張として別系列で扱います。

---

## 4. GPDE1--GPDE5：解析基盤

### [GPDE1 テスト関数・distribution](../GPDE1/index.md)

$\mathcal D(\Omega)=C_c^\infty(\Omega)$、テスト関数列の収束、distribution の連続性、正則 distribution、Dirac delta、distribution の収束、distributional solution を導入します。

### [GPDE2 distribution 微分・mollifier・弱微分](../GPDE2/index.md)

部分積分の双対化として distribution 微分を定義し、Heaviside と jump の delta 項、weak derivative、mollifier の尺度変換、局所 $L^1$ 近似、弱微分と mollification の交換までを証明します。

### [GPDE3 Sobolev 空間](../GPDE3/index.md)

$W^{k,p}$、$H^k$、弱微分作用素の閉性、完備性、Hilbert 構造、Sobolev membership / non-membership、局所 mollification、全空間での smooth density までを証明します。

### [GPDE4 $H_0^1$・Poincare・trace](../GPDE4/index.md)

零 Dirichlet 境界条件を $H_0^1$ と zero trace で定式化し、任意の有界開集合での Poincare 不等式、区間上の trace の完全構成、bounded Lipschitz domain 上の trace と $H_0^1=\ker\operatorname{Tr}$ までを整理します。

### [GPDE5 Sobolev embedding・compactness](../GPDE5/index.md)

Sobolev 共役指数を scaling から導き、$\mathbb R^d$ 上の Sobolev 不等式を $W^{1,1}$ の座標積分・Loomis--Whitney 型評価・power trick から証明します。さらに $H_0^1$ の零延長に対する translation estimate と有限次元近似から

$$
H_0^1(\Omega)
\hookrightarrow\!\hookrightarrow
L^2(\Omega)
$$

を bounded open set 上で完全証明し、

$$
\text{boundedness}
\to
\text{weak }H_0^1\text{ subsequence}
\to
\text{strong }L^2\text{ subsequence}
$$

という大学院 PDE の基本技法を正本化します。critical exponent では concentration により compactness が壊れることも尺度計算から確認します。

---

## 5. GPDE6--GPDE8：変分法と楕円型 PDE

### [GPDE6 弱形式・変分形式](../GPDE6/index.md)

PDE5 の Poisson 問題を $H_0^1$ 上の

$
a(u,v)=F(v)
$

へ移し、$H^{-1}$、bounded / coercive bilinear form、distributional solution と variational weak solution の関係、energy minimization を正本化します。さらに minimizing sequence と GPDE5 の弱コンパクト性、Hilbert norm の弱下半連続性を用いて、Lax--Milgram を先取りせず Poisson 弱解の存在一意性と安定性まで直接法で閉じます。

### GPDE7 Lax--Milgram

Riesz 表現から作用素を構成し、

~~~text
coercivity
  ↓
下からの評価
  ↓
単射 + closed range
  ↓
dense range
  ↓
全射
~~~

までを核心証明として閉じます。

### GPDE8 二階線形楕円型 PDE

一様楕円性、一般係数、lower-order term、energy estimate、弱解の存在一意性を扱います。

---

## 6. GPDE9--GPDE10：正則性と時間発展

### GPDE9 楕円型正則性

difference quotient・cutoff・Caccioppoli 型評価を使い、弱解が追加仮定の下でどこまで滑らかさを回復するかを扱います。

### GPDE10 Galerkin・時間発展 PDE の弱解

Galerkin 法を有限要素法専用の計算法ではなく、有限次元近似から無限次元解を構成する方法として扱います。

$$
H_0^1\subset L^2\subset H^{-1}
$$

という Gelfand triple を導入し、Encore II の熱方程式・波動方程式を energy solution の立場から再訪します。

数値 FEM の mesh・basis・assembly・solver は Encore V へ送ります。

---

## 7. 旧 Encore III 7章の扱い

旧7章は削除しません。

- 移植元・履歴確認用として保持する。
- reader-facing index から外す。
- 新 GPDE 章の prerequisite / concept owner / proof dependency にしない。
- 必要な証明・例だけを新正本へ移植する。
- 新旧本文を並行保守しない。

つまり、Encore II 再編時と同じく **削除ではなく隔離** です。

---

## 8. Encore III の停止線

Encore III は次までで閉じます。

- distribution
- weak derivative
- Sobolev spaces
- trace / embedding / compactness
- variational weak solution
- Lax--Milgram
- linear elliptic PDE
- basic elliptic regularity
- evolution energy solution
- Galerkin existence method

以下は別系列です。

~~~text
semigroup / mild solution の本格理論
conservation law / entropy solution
Hamilton--Jacobi / viscosity solution
nonlinear monotone PDE
Navier--Stokes
renormalized / measure-valued solution
geometric analysis
~~~

---

## 9. 最終的な景色

~~~text
Encore II
古典解 / Fourier / eigenfunction / Green
        ↓
Encore III
distribution
        ↓
weak derivative / mollifier
        ↓
Sobolev / trace / embedding / compactness
        ↓
weak formulation
        ↓
Lax--Milgram
        ↓
linear elliptic PDE
        ↓
regularity
        ↓
Galerkin / evolution weak solution
        ↓
 ┌──────┼───────────────┐
 ↓      ↓               ↓
Encore V  nonlinear PDE  geometric analysis
FEM       等の別系列     （幾何学完成後）
~~~

Encore III の到達目標は、弱解の名前を列挙することではありません。**PDE の構造に応じて関数空間と解概念を選び、a priori estimate・compactness・変分法から存在・一意性・正則性を追えること**です。
