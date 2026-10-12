# DREAM THEATER 解析的整数論（ANT1〜ANT8）

分冊: 2026-10-11  
状態: completed（2026-10-13 ANT1〜ANT8実装・公開経路・横断監査・ANT8追跡監査完了）

## 中心問いと直接依存

[NT4〜5/NT8](../plan_done/DREAM_THEATER_ELEMENTARY_NUMBER_THEORY_PLAN.md)、CA7・CA12の必要部分。

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

以下は2026-10-12着手時点の執筆方針の履歴である。現在はANT1〜ANT8の本文が実装済みである。未証明定理を既習としない。実装前に章ID・実在する直接prerequisite・concept ownerを確認し、独習者が追える証明粒度と演習A4/B3/C1以上の全詳細解答を整える。完成本文の全証明・全演習を再計算し、別観点で再査読して記録する。別章の追跡監査は対象IDの明示依頼がある場合だけ実施する。科目ごとの公開・依存・リンクの横断監査を通して初めて完了扱いにする。


## 2026-10-12 ANT1 着手入口・依存監査（当時の記録）

- **着手判定**：NT4・NT5・NT8、CA7・CA12は現行公開索引に存在し、本文・chapter metadata・knowledge metadataの正本を確認済み。NT系列manifestは全10章 `completed`、PLANは `textbook/plan_done/` にある。ANT1を妨げる直接依存の未実装はない。
- **ID・公開状態**：`ANT1`〜`ANT8` は現在の公開索引に未掲載で、既存 `代数系/ANT/` ディレクトリおよび `ANT.yaml` はない。今回系列manifestを用意するが、すべて `planned` で、章本文とその公開索引・knowledge DAGには先行登録しない。
- **次章**：`ANT1 算術関数の平均と部分和`。本文作成時の最低限の前提候補はNT4・NT5・NT8（NT8はRA1を前提にする）。章の実際の依存は新規 `chapter.yaml` の論証に照らして最小化する。CA7・CA12の結果はANT2以降の必要箇所で使い、ANT1へ不要に課さない。
- **既出結果の再利用**：[算術関数](../volumes/dream_thater/代数系/NT/NT4/index.md#def-nt4-arithmetic-function)、[Dirichlet畳み込み](../volumes/dream_thater/代数系/NT/NT4/index.md#def-nt4-dirichlet)、[総和関数](../volumes/dream_thater/代数系/NT/NT5/index.md#def-nt5-summatory-function)、[畳み込みの総和](../volumes/dream_thater/代数系/NT/NT5/index.md#thm-nt5-summatory-convolution)、[Dirichletの双曲線分割](../volumes/dream_thater/代数系/NT/NT5/index.md#thm-nt5-hyperbola)、[素数分布の評価](../volumes/dream_thater/代数系/NT/NT8/index.md#thm-nt8-chebyshev-two-sided)を用いる。ANT1ではAbelの部分和公式から平均次数・主項・誤差を新たな中心問いとして導く。NT5の主要証明を重複させない。
- **後続の解析依存**：ANT2以降は[CA12のζのEuler積](../volumes/dream_thater/解析系/CA/CA12/index.md#thm-ca12-euler-product)・[有理型解析接続](../volumes/dream_thater/解析系/CA/CA12/index.md#thm-ca12-meromorphic-continuation)・[関数等式](../volumes/dream_thater/解析系/CA/CA12/index.md#thm-ca12-functional-equation)を既存の正本とする。
- **将来の証明責務**：ANT4の `L(1,χ)≠0`、ANT6の `Re(s)=1` 零点不存在とWiener–Ikehara（または代替の完全なTauber型経路）、ANT7の零点計数は各章の執筆前に証明経路を定める。**未完成の経路を既証明として先行使用しない**。これらはANT1執筆のブロッカーではない。
- **次アクション**：ANT1の `chapter.yaml` / `knowledge.yaml` / `index.md` を実装し、学習目標・証明・直接例・有意味な演習A4/B3/C1以上と全詳細解答をそろえる。変更章について規約第10節の区分C全件再査読とchanged-only CIを実施した後、公開索引と目次にANT1だけを追加して `ANT.yaml` のANT1を `completed` に更新する。

## 2026-10-13 系列完了確認

- **実装範囲**：`textbook/dream-theater-series/ANT.yaml` の ANT1〜ANT8 は全件 `completed`。8章の `index.md` と `chapter.yaml`、`knowledge.yaml` が存在することを確認した。
- **公開経路**：`textbook/dream-theater-index.json` にANT1〜ANT8の8エントリ、`textbook/dream-theater.md` に8章の各リンクを確認した。ルーティングの正本は系列manifestを使い、共有 `dream-theater-work.yaml` は変更しない。
- **演習・解答の在庫**：ANT1 (A4/B3/C1)、ANT2 (A4/B4/C1)、ANT3 (A4/B4/C1)、ANT4 (A4/B3/C1)、ANT5 (A4/B3/C1)、ANT6 (A4/B4/C2)、ANT7 (A4/B4/C2)、ANT8 (A4/B4/C1)。全63題について `solution-start` の対応を確認した。
- **系列内部のstable anchor**：ANT1〜ANT8の本文中で他のANT章を指す結果リンク94件を抽出し、各リンク先の明示的なanchor存在を照合、欠落0件。ANT8の直接援用先（ANT3・ANT5・ANT6・ANT7・CA・NT）も参照先の実在を確認した。
- **ANT8の明示依頼追跡監査**：現行本文を全文再読し、主要結果8件・全演習9題の証明・解答、平滑化、零点和の分割、3-4-1正値性、文字付きEuler積を再計算した。局所対数微分の証明ではJensenの円周上に零点がない仮定を明示するため、外半径を適切に選ぶ局所修正を実施。査読根拠・中間式・未確認事項・CI結果は対応PRを参照する。
- **完了判定**：この監査で確認した範囲に未着手の章・明示PLANタスクは残らない。PLANを `textbook/plan_done/` へ移し、系列manifestの `plan` を同時更新する。GitHubのrequired checksが成功した統合状態でmergeして確定する。
