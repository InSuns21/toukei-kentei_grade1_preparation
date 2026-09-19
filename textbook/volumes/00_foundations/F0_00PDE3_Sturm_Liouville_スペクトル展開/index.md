# F0-00PDE3 旧URL互換：Sturm--Liouville・スペクトル展開

このページは、Encore II 再編前の旧URLを壊さないために残している**互換ハブ**です。旧 F0-00PDE3 に置かれていた Sturm--Liouville 理論は、証明・定義例・演習を補強して標準 ODE コアへ移しました。

新しく学ぶ場合は、このページを本文として読まず、次の正本へ進んでください。

- [ODE7 境界値問題・Sturm--Liouville](../ODE7/index.md)
  - 二点境界値問題
  - 正則 Sturm--Liouville 問題
  - Lagrange 恒等式と分離型自己共役境界条件
  - 固有値の実数性
  - 異なる固有値に属する固有関数の直交性
  - 分離型問題の固有値の単純性
  - Dirichlet / Neumann / 混合境界条件の固有値
  - Rayleigh 商
  - 共鳴時の可解条件
  - 固有関数展開と一般完全性の証明境界

- [PDE7 固有関数展開・Green表現・三類型の統合](../PDE7/index.md)
  - 固有関数展開による空間作用素の対角化
  - 熱・波動・Poisson のモード方程式
  - 有界区間の離散固有モードと全空間 Fourier 周波数の対応
  - Green kernel の固有関数表示と $1/\lambda_n$ の意味
  - Neumann 零モードと可解条件

## 旧章からの対応

| 旧 F0-00PDE3 の話題 | 現在の扱い |
|---|---|
| Sturm--Liouville 問題の定義 | [ODE7](../ODE7/index.md#def-ode7-regular-sl) |
| 重み付き内積 | [ODE7](../ODE7/index.md#def-ode7-weighted-inner-product) |
| Green 型の1次元境界恒等式 | [ODE7 の Lagrange 恒等式](../ODE7/index.md#thm-ode7-lagrange-identity) |
| 境界条件込みの自己共役性 | [ODE7](../ODE7/index.md#thm-ode7-boundary-form) |
| 固有値の実数性・直交性 | [ODE7](../ODE7/index.md#thm-ode7-real-eigenvalue) |
| Dirichlet / Neumann と正弦・余弦系 | [ODE7 §10–11](../ODE7/index.md) |
| 固有関数展開 | ODE7 で Sturm--Liouville の意味と証明境界を整理し、[PDE7](../PDE7/index.md#prop-pde7-modal-diagonalization) で PDE の有限モード対角化へ接続 |
| PDE の変数分離・時間発展 | [PDE7](../PDE7/index.md#prop-pde7-three-type-mode-laws) で熱・波動・Poisson のモード方程式として統合 |

旧 F0-00PDE3 自体は数学概念の正本を持ちません。Sturm--Liouville 理論の修正・参照は以後 ODE7 を正本として行います。
