# C20-experimental-design 独立数理査読

- initial_reviewer_id: c20_math_review
- initial_reviewed_at: 2026-08-21T10:01:10+09:00
- 対象: `anki/cards/42_experimental_design.md` の新規44枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`

## 初回指摘

### minor

1. `design-randomization-purpose`（`anki/cards/42_experimental_design.md:610`）
   - 根拠: front matter に `id: design-randomization-purpose` が同じ行として2回連続している。現行 validator は通過するものの、YAML の重複キーであり、処理系によっては拒否または後勝ち解釈となる。
   - 修正案: 重複した `id:` の一方を削除する。

2. `design-orthogonality-check`（`anki/cards/42_experimental_design.md:402`）
   - 根拠: 「内積0なら最小二乗推定量が無相関」は、通常の線形モデルで誤差共分散が $\sigma^2\boldsymbol I$（少なくとも該当列間の推定共分散を0にする形）であることが必要である。列の直交だけでは、異分散・相関誤差の下の無相関は従わない。
   - 修正案: 使用公式を「誤差が互いに無相関・等分散の通常の線形モデルでは、直交する列に対応する最小二乗推定量は無相関」と条件付きで書く。

3. `design-interaction-plot`（`anki/cards/42_experimental_design.md:27`）
   - 根拠: 線の交差は効果の向きが逆転する crossover interaction を示すが、交差幅は任意に小さくなり得るため、それだけで「強い」交互作用または統計的に有意な交互作用とはいえない。注意欄は標本変動に触れているが、答え本文の表現がなお過大である。
   - 修正案: 「交差は効果の向きがB水準で逆転する交互作用を示す」とし、強さ・有意性は効果量と標本変動で別に判断すると明示する。

4. `anki/formulae.md` の「$2^k$ 要因計画の効果」（`anki/formulae.md:239`）
   - 根拠: $2^{-(k-1)}\sum x_Ay$ は、$y$ が各処置組合せのセル平均、または各組合せ1観測である場合の式である。反復生データをそのまま総和する場合には反復数 $r$ でさらに割る必要があり、現記述だけでは適用対象が曖昧である。カード `design-two-level-effect-contrast` の注意欄とは整合するが、公式集単独では条件が欠ける。
   - 修正案: $y$ をセル平均 $\bar y_j$ と明記するか、反復生データでは分母が $r2^{k-1}$ になることを併記する。

## 独立再計算結果

- 数値例: `design-two-cubed-effects-numeric` のA効果7.5・AB効果1.5、`design-crd-difference-means` の標準誤差1、`design-blocking-paired-variance` の $2\sigma^2(1-\rho)$、乱塊法F値6、ラテン方格F値3を再計算し一致した。
- 自由度: 二元要因計画、乱塊法、ラテン方格法の自由度分解はいずれも一致した。
- 要因計画: $C=AB\Rightarrow I=ABC$、$D=ABC\Rightarrow I=ABCD$、$I=ABC$ から $A=BC,\ AB=C$ を再導出し一致した。解像度III・IV・Vの別名関係も正しい。
- 分散・検出力: 変量切片モデルの群内共分散・相関、独立2群・対応ありの概算標本数、一元配置の $\lambda=Nf^2$ は提示条件の下で正しい。
- 公式・定義・具体例: 上記4件を除き、使用公式はカード内に再掲され、非自明な数値計算は目で追える粒度で完遂されている。1カード1論点も満たす。
- 同期: `coverage.yaml` の applied-design は既存 `eng-blocking` と新規44枚を収録し、対象6用語へ対応付けられている。`formulae.md` は主要公式を収録している。

## 機械検証

- `npm run anki:validate`: 成功。982 cards、0 warnings。配信HTML build/check も成功。
- `npm run validate`: 成功。構造検証、344 Markdown の KaTeX strict、237生成対象テキスト検証がすべて成功。

## severity 集計

- fatal: 0
- major: 0
- minor: 4

## 修正確認

- final_reviewer_id: c20_math_review
- final_reviewed_at: 2026-08-21T10:09:58+09:00
- 初回 minor 1: 解消扱い。UTF-8実体を `rg -n "^id: design-randomization-purpose$"` で再確認し、該当は620行の1行だけだった。初回表示では、範囲読込を609行で重ねたため同じ行が二重表示されており、重複キーという指摘は査読側の誤認だった。
- 初回 minor 2: 修正確認。`design-orthogonality-check` は、最小二乗推定量が無相関となる条件を「誤差が互いに無相関・等分散の通常の線形モデル」と明示した。
- 初回 minor 3: 修正確認。`design-interaction-plot` は線の交差を効果方向が逆転する交互作用とのみ述べ、「強い」という過大な表現を削除した。検定・区間による標本変動の確認も維持されている。
- 初回 minor 4: 修正確認。`anki/formulae.md` は $y$ をセル平均 $\bar y_j$ と明記し、r反復の生データ総和では分母が $r2^{k-1}$ となることを追記した。

### 差替え4枚の独立再計算

- `design-factorial-effect-ss`: $C_A=-10+14-12+18=10$、セル平均コントラストの公式 $SS_A=rC_A^2/2^k$ から $2\cdot100/4=50$。効果5からの $r2^{k-2}\widehat A^2=50$ とも一致した。
- `design-random-oneway-components`: $E[MS_A]=\sigma^2+r\tau^2$、$E[MS_E]=\sigma^2$ から $\widehat\sigma^2=2$、$\widehat\tau^2=(14-2)/4=3$。群内相関推定値 $3/(3+2)=3/5$ も一致した。
- `design-rcbd-relative-efficiency`: ブロック無視時は残差平方和60、自由度 $ab-a=9$ なので $MS_{E,\mathrm{CRD}}=20/3$。乱塊法は $20/6=10/3$ で、比は2。加法モデルという適用条件も明示されている。
- `design-rcbd-missing-value`: 正規方程式 $x=(T_i'+x)/b+(B_j'+x)/a-(G'+x)/(ab)$ を解くと、$\widehat x=(aT_i'+bB_j'-G')/\{(a-1)(b-1)\}$。数値は $(54+56-66)/6=22/3$ で一致し、誤差自由度を1減らす注意も正しい。

### 全体再査読

- 新規44枚を再確認し、定義、適用条件、公式、数値例、自由度、平方和、別名構造に残存する誤りはない。
- すべてのカードに使用公式・定理があり、計算カードは代入から結論まで目で追える。1カード1論点も維持されている。
- `coverage.yaml` は差替え後の44 IDと一致し、`formulae.md` の主要公式とも整合する。

### 最終機械検証

- `npm run anki:validate`: 成功。982 cards、0 warnings。配信HTML build/check も成功。
- `npm run validate`: 成功。構造検証、346 Markdown の KaTeX strict、237生成対象テキスト検証がすべて成功。

## 最終件数

- fatal: 0
- major: 0
- minor: 0

fatal: 0 / major: 0 / minor: 0
