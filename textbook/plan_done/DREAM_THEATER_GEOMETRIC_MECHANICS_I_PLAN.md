# DREAM THEATER 幾何学的力学 I（GMECH1〜GMECH8）

作成・分冊: 2026-10-11  
状態: completed（2026-10-12。GMECH1〜8の実装・GMECH8追跡監査・系列横断確認・公開導線確認を完了）

## 中心問い

Hamilton力学の対称性を保存量と商空間による自由度削減へどう結び付けるか。

## 直接必要な前提・PLAN間依存

- **直接前提の独立PLAN：** [シンプレクティック幾何学 I](../plan_done/DREAM_THEATER_SYMPLECTIC_GEOMETRY_I_PLAN.md)。GMECH1にはSYM3、GMECH2〜3にはSYM4、GMECH4〜5にはSYM3・SYM4、GMECH6〜8には先行GMECH講が必要。全SYM8講の一括履修は不要。
- 既存完成章：AMECH4（Noether）、AMECH6（Poisson）、GEO2/7、LIE1〜LIE4、MECH剛体・保存則。
- 後続：[可積分系・KAM](../plans_progress/DREAM_THEATER_INTEGRABLE_SYSTEMS_PERTURBATION_KAM_PLAN.md)、[三体問題](../plans/DREAM_THEATER_CELESTIAL_MECHANICS_THREE_BODY_CHAOS_PLAN.md)。

## 所有範囲

Hamiltonian Lie群作用、運動量写像、幾何学的Noether、Marsden–Weinstein簡約、Lie–Poisson剛体、相対平衡。

**境界：** ω・Darboux・Lagrange部分多様体はSYM。Lie群の基礎は既存LIE。Liouville–ArnoldはINT。

## 着手時の依存確認（2026-10-12）

- SYM3 は余接持ち上げの定義、正準1形式の保存、余接持ち上げの合成則をすでに扱う。GMECH1ではそれらを重複して新定理にせず、**Lie群作用を各群元ごとに持ち上げて作用則と無限小生成子を調べる**ことを新しい中心課題とする。
- SYM4 は $\iota_{X_H}\omega=dH$ と $\omega=\sum_i dq^i\wedge dp_i$ の規約を採用している。GMECH2の運動量写像の符号はこれに合わせて証明する。
- SYM系列manifestではSYM3・SYM4を含む全8章が `completed` であり、幾何学的力学の直接前提PLANは完了状態にある。
- 系列manifestを `textbook/dream-theater-series/GMECH.yaml` に新規登録し、GMECH1を `completed` とし、GMECH2〜8を `planned` から管理する。章本文、章別metadata、公開索引は実装してから更新する。
- GMECH1の本文はGEO・LIE・SYMの実在する結果アンカーを照合し、変更章自身の査読・検証を通して公開する。

## 全8講の計画

### GMECH1 Lie群作用と余接束への持ち上げ

GEO、LIE既存の群作用、軌道、等方群、無限小生成子。余接束への作用と正準形式保存を直接計算。

### GMECH2 Hamilton作用と運動量写像

ι_{ξ_M}ω=d⟨J,ξ⟩（SYMの符号規約と整合）、線形運動量・角運動量の具体式、equivarianceを検証。

### GMECH3 幾何学的Noetherの定理

不変Hamiltonianから{⟨J,ξ⟩,H}=0を導き、時間発展で保存することを仮定・群・パラメータを明記して証明。

### GMECH4 運動量レベル集合・群作用・正則性

正則値とレベル集合の次元、安定化部分群、零でない運動量の扱い、作用のfree/proper条件、退化例。

### GMECH5 Marsden–Weinstein簡約

ωの制限の基本性と商への降下、非退化性の証明、作用の条件、次元計算、具体的回転対称系。

### GMECH6 Lie–Poisson構造と余随伴軌道

Lie代数双対上の括弧、余随伴軌道、Casimir、シンプレクティック葉。符号・随伴作用の左右規約を検査。

### GMECH7 Euler剛体の幾何学的力学

SO(3)、角運動量球面、Euler方程式、エネルギー曲面、Poisson括弧とreduced phase portraitを再計算。

### GMECH8 相対平衡・安定性・可積分系への橋

群軌道を除いた平衡の定義、energy–momentum法の適用条件、保存量の可換性、INT1へ接続。

## 執筆・査読・完了条件

- 各章の実在 prerequisite / canonical anchor を着手時に確定する。前提PLANが planned の場合、その定理を証明済み扱いしない。
- DREAM THEATER 現行 standard に従い、動機→定義例→仮定つき主要定理→再計算可能な証明→演習と全詳細解答で閉じる。
- 理由付き例外がなければ変更章につき Level A 4 / B 3 / C 1 以上。変更章自身の主要証明と全詳細解答を再導出し、別観点の再査読を行う。別の完了章の追跡監査は章IDを指定して明示依頼された場合だけ行う。
- 科目単位の横断監査で章間依存、証明担当、演習接続、図・リンク・公開導線を確認する。PLANの設計だけで進行中・完了扱いしない。

## 最終クローズ記録（2026-10-12）

- 系列manifestの GMECH1〜GMECH8 はすべて `completed`。8章の実本文・`chapter.yaml`・`knowledge.yaml` と公開目次・公開索引が存在する。
- 系列横断の棚卸し：formal statement 49件、主要証明ブロック33件、演習・詳細解答72件（各章A4/B4/C1）。章間の結果参照と外部前提を含むMarkdownリンク177使用箇所・参照先19ページの実在とstable anchorを照合し、参照欠落0件。章内リンクの不一致0件。対象8章に新規のSVG・画像はない。
- GMECH8の明示追跡監査：最新本文を全文再読し、主要証明4件・全演習解答9件の仮定、符号、計算、Hessian、Poisson括弧、非自明な行間、表示配置、使用箇所リンクを点検した。代表再導出は相対平衡の臨界点判定、固定運動量面のenergy–momentum安定判定、Kepler円軌道のB1解答。重大な数学的指摘・本文変更はなし。
- 代表計算：`d(H-J_ξ)(v)=ω(X_H-ξ_M,v)` から非退化性で臨界点条件を得る。簡約Hessianが正定値なら `H_μ(z)-H_μ(0)≥λ|z|²/4` の保存エネルギー障壁が成立する。Kepler系で `r₀=μ²/k`、`Ω=k²/μ³`、`U''_μ(r₀)=μ²/r₀⁴>0` を再計算した。
- 相対平衡・運動量写像・簡約・Lie–Poisson・剛体の正本をGMECH1〜8で接続し、Liouville可積分性・Liouville–Arnold・KAMの証明担当は後続INTへ分離している。系列横断監査は章間依存・正本重複・演習連続性・掲載導線を確認したもので、別の全7章の全証明・全解答を再計算したという意味ではない。
- 実施主体：ChatGPTによる本文再読・計算照合・別観点チェック。同一担当者の再読であり、第三者独立査読ではない。数式はMarkdownソースの区切り・配置とリンク整合を点検した。実ブラウザ描画は未確認、変更対象に図版・教材本文の表示変更はない。
