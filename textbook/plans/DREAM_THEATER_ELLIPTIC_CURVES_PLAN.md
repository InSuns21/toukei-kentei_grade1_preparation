# DREAM THEATER 楕円曲線（EC1〜EC8）

分冊: 2026-10-11  
状態: planned（科目固有の実装は未着手）

## 中心問いと直接依存

[NT1〜4](DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)、RNG/FLD/GRP、CA9のWeierstrass関数。MF8との相互参照を循環必須としない。

**本科目の正本：** 代数曲線の群則・一様化・torsion・L関数・算術。

# 6. 楕円曲線 EC1--EC8

主 prerequisite:

- RNG1--RNG4
- FLD0--FLD3
- GRP1--GRP3
- NT1--NT4

EC3 では CA8--CA9 を追加する。

## EC1 非特異三次曲線と Weierstrass 方程式

- projective plane の必要最小限
- 無限遠点
- plane cubic
- nonsingularity
- Weierstrass equation
- discriminant
- 変数変換
- characteristic 2,3 の注意
- Q, R, C, F_p 上の具体例

## EC2 chord--tangent 群則

- chord--tangent construction
- 単位元・逆元
- 加法公式
- 可換性
- associativity
- doubling formula

associativity を図から明らかとして済ませない。実装前に proof route を確定する。

候補:

1. 有理関数・divisor の必要最小限を導入する。
2. CA9 の複素一様化から characteristic 0 を理解し、代数的恒等式として整理する。
3. 将来の代数曲線 canonical owner を参照する。

## EC3 複素一様化・格子・j 不変量

- CA9 の wp を再利用
- C/Λ → E(C)
- 群準同型性
- 双正則性
- lattice scaling
- g2, g3, Δ, j
- C 上の楕円曲線の同型分類
- complex multiplication への入口

CA9 と EC の正式な合流点とする。

## EC4 torsion・height・descent・Mordell--Weil

- torsion subgroup
- Nagell--Lutz 型結果
- rational height
- canonical height への入口
- descent
- weak Mordell--Weil
- Mordell--Weil theorem

完全証明に数体一般論が不可避になる場合、代数的整数論を黙って prerequisite にせず proof route を再設計する。

## EC5 有限体上の楕円曲線・Frobenius・Hasse 評価

- E(F_q)
- 点数
- Frobenius endomorphism
- a_q=q+1-#E(F_q)
- Hasse bound
  $$
  |a_q|\le2\sqrt q
  $$
- extension field 上の点数
- finite-field zeta function への入口

## EC6 reduction・good/bad reduction・conductor

- integral model
- reduction modulo p
- good reduction
- multiplicative / additive reduction
- discriminant と bad prime
- minimal model への入口
- conductor N_E
- local data と modular form の level への橋

Kodaira--Néron classification の完全理論は必須範囲にしない。

## EC7 Hasse--Weil L 関数

good prime p について

$$
a_p=p+1-\#E(\mathbb F_p)
$$

を用い、

$$
L_p(E,s)=
\left(1-a_pp^{-s}+p^{1-2s}\right)^{-1}
$$

型の local factor を構成する。

- Euler product
- bad prime の local factor
- conductor
- Hasse bound による収束域
- completed L function の予想される関数等式
- Modularity Theorem により解析接続・関数等式が得られる論理順序

## EC8 modular な楕円曲線と modularity interface

- modular elliptic curve の定義
- weight 2 newform
- Fourier coefficient a_p(f)
- good prime での a_p(E)=a_p(f)
- Euler factor の一致
- L(E,s)=L(f,s)
- modular parametrization X_0(N)→E
- conductor と level

Modularity Theorem の最終 statement は MF8 でまとめる。

---

## 章別執筆・数理査読・完了判定

本PLANは設計段階であり、未実装科目・未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して直前完了章の追跡監査とともに記録する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。
