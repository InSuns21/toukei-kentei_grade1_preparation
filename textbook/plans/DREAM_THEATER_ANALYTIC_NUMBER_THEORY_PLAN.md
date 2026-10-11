# DREAM THEATER 解析的整数論（ANT1〜ANT8）

分冊: 2026-10-11  
状態: planned（科目固有の実装は未着手）

## 中心問いと直接依存

[NT4〜5/NT8](DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)、CA7・CA12の必要部分。

**本科目の正本：** Dirichlet級数・L関数、素数定理とゼータ零点。

# 4. 解析的整数論 ANT1--ANT8

主 prerequisite:

- NT4--NT5
- NT8
- CA7 以降
- CA12

Dirichlet 文字を扱う ANT3 以降では NT2--NT3 を追加する。

## ANT1 算術関数の平均と部分和

- summatory function
- Abel の部分和公式
- Dirichlet hyperbola method
- τ(n), φ(n) の代表的平均
- main term / error term
- 平均次数

## ANT2 Dirichlet 級数・Euler 積の一般論

$$
F(s)=\sum_{n\ge1}\frac{a(n)}{n^s}
$$

を一般に扱う。

- 絶対収束半平面
- Dirichlet 畳み込みと積
- 乗法的係数と Euler 積
- 逆 Dirichlet 級数
- CA12 の ζ を一般構造の基準例として再解釈

## ANT3 Dirichlet 文字・Gauss 和・Dirichlet L 関数

- Dirichlet 文字
- principal / primitive character
- 有限可換群の指標との対応
- 直交関係
- Gauss 和
- Dirichlet L 関数
  $$
  L(s,\chi)=\sum_{n\ge1}\frac{\chi(n)}{n^s}
  $$
- Euler 積

## ANT4 算術級数中の素数に関する Dirichlet の定理

- L(1,χ)≠0
- 文字直交関係による剰余類抽出
- 素数 Euler 積
- 算術級数中の素数無限性

核心である L(1,χ)≠0 を名前だけで飛ばさない。

## ANT5 ζ'/ζ と von Mangoldt 関数

- von Mangoldt 関数 Λ(n)
- Euler 積の対数微分
  $$
  -\frac{\zeta'(s)}{\zeta(s)}
  =
  \sum_{n\ge1}\frac{\Lambda(n)}{n^s}
  $$
- ψ(x), θ(x), π(x) の比較
- 零点情報が素数側へ戻る仕組み

## ANT6 Re s=1 の零点不存在と素数定理

- ζ(s) の Re s=1 上の零点不存在
- de la Vallée Poussin 型の正値性議論
- Tauberian theorem の必要性
- Wiener--Ikehara
- ψ(x)~x
- 部分積分から π(x)~x/log x

Wiener--Ikehara を採用する場合は必要な形を証明するか、将来 canonical Tauberian result が存在する場合のみ直接参照する。

## ANT7 非自明零点・明示公式・零点計数

- critical strip
- functional equation による対称性
- ξ(s)
- Hadamard product への必要最小限の接続
- Riemann--von Mangoldt 型零点計数
- Perron 型反転への入口
- von Mangoldt の明示公式の意味

## ANT8 Riemann 予想と誤差項・一般 L 関数への橋

- Riemann 予想の exact statement
- 素数定理の誤差項との関係
- zero-free region
- GRH への入口
- Dirichlet L 関数の零点
- L 関数に共通する
  - Dirichlet 級数
  - Euler 積
  - 解析接続
  - 関数等式
- modular form の L 関数への橋

---

## 章別執筆・数理査読・完了判定

本PLANは設計段階であり、未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して直前完了章の追跡監査とともに記録する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
