# DREAM THEATER モジュラー形式（MF1〜MF8）

分冊: 2026-10-11  
状態: in_progress（MF1実装・検証、MF2〜MF8と科目横断監査は未完了）

## 中心問いと直接依存

CA8/9/12、GRP3、[NT2〜4](../plan_done/DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)。MF8のmodularityで[EC11](DREAM_THEATER_ELLIPTIC_CURVES_PLAN.md)の算術との橋を扱う。MF1〜MF7へEC11を逆向きの必須前提として課さない。

**本科目の正本：** modular group・q展開・Hecke作用素・L関数とmodularityの橋。

# 7. モジュラー形式 MF1--MF8

主 prerequisite:

- CA8--CA9
- CA12
- GRP3
- NT2--NT4

MF6以降では、Dirichlet級数・L関数の使用範囲に応じてANTの該当章を追加する。MF8ではEC10（楕円曲線L関数）とEC11（modularity interface）を追加する。

## MF1 上半平面・格子・modular group

- upper half-plane H
- SL_2(Z), PSL_2(Z)
- fractional linear transformation
- generators S,T
- lattice basis change
- fundamental domain
- cusps への入口

CA9 の lattice scaling から自然に導入する。

## MF2 モジュラー形式・q 展開・Eisenstein 級数

- modular form of weight k
- cusp holomorphy
- q=e^{2πiτ}
- q-expansion
- cusp form
- Eisenstein series E_k
- E_4, E_6
- discriminant modular form Δ
- j invariant

CA9 の g2, g3, j と接続する。

## MF3 valence formula と full modular group 上の構造

- fundamental domain 内の零点
- valence formula
- dimension formula の full group 版
- ring structure
  $$
  M_*(SL_2(\mathbb Z))\cong\mathbb C[E_4,E_6]
  $$
- cusp forms
- Δ
- modular function と j

## MF4 congruence subgroup・cusps・modular curve

- Γ_0(N), Γ_1(N), Γ(N)
- finite index
- cusps
- compactification
- modular curve X_0(N)
- Riemann surface としての modular curve
- weight 2 form と正則微分
- elliptic curve の moduli interpretation への入口

scheme-theoretic moduli は本計画に含めない。

## MF5 Hecke 作用素・固有形式

- Hecke operator T_n
- q-expansion への作用
- commuting family
- eigenform
- normalized eigenform
- Fourier coefficient の乗法性
- Petersson inner product への入口

## MF6 モジュラー形式の L 関数

normalized eigenform

$$
f(\tau)=\sum_{n\ge1}a_nq^n
$$

に対し

$$
L(f,s)=\sum_{n\ge1}\frac{a_n}{n^s}
$$

を扱う。

- Euler product
- Mellin transform
- functional equation
- completed L function
- ANT の L 関数との共通構造
- weight / level と Gamma factor / conductor

CA12 の theta--Mellin 構成を prototype として再利用する。

## MF7 oldform・newform・level と算術

- oldspace / newspace
- newform
- Atkin--Lehner theory の必要部分
- normalized newform
- local Euler factor
- conductor / level dictionary
- weight 2 newform
- EC7 の有限体の点数と $a_p(E)$ の定義は比較対象として紹介し、実際の係数一致は EC11 / MF8 で扱う（MF7 の必須prerequisiteではない）

## MF8 Modularity Theorem と Fermat の最終定理への橋

本計画の終端章。

### statement

有理数体上の任意の楕円曲線 E/Q は modular である。

少なくとも次を接続する。

1. weight 2 newform f が存在し L(E,s)=L(f,s)。
2. good prime のほとんど全てで a_p(E)=a_p(f)。
3. 適切な level N に対し modular parametrization X_0(N)→E が存在する。

### FLT への論理接続

指数 p>2 の仮想的 Fermat 解から Frey 曲線を作り、

~~~text
Fermat の反例
  ↓
Frey 曲線
  ↓
Ribet の定理
  ↓
その曲線は modular ではあり得ない

一方

Modularity Theorem
  ↓
Q 上の楕円曲線は modular

したがって矛盾
~~~

を追う。

### 停止線

Wiles--Taylor--Wiles の modularity lifting proof は本章では証明しない。

証明へ進むには少なくとも、

- elliptic curve の Tate module
- l-adic Galois representation
- residual representation
- Galois cohomology
- deformation functor / universal deformation ring
- Hecke algebra
- modularity lifting
- R=T
- patching

が必要になる。

これらは将来の独立 PLAN「Galois 表現・modularity lifting・Wiles の証明」の責務とする。

---

## 章別執筆・数理査読・完了判定

MF1を実装し、MF2〜MF8および系列横断査読・公開確認は未完了である。未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読する。変更していない別章の追跡監査はユーザーの明示指定がある場合のみ行う。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
