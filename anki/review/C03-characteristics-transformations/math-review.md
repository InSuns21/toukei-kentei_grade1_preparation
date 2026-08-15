# C03-characteristics-transformations 独立数理査読

initial_reviewer_id: math-reviewer-C03-20260816
initial_reviewed_at: 2026-08-16T00:52:24+09:00
final_reviewer_id: math-reviewer-C03-20260816
final_reviewed_at: 2026-08-16T01:06:51+09:00

## 対象

- `anki/cards/17_distribution_characteristics.md` の新規23枚
- `anki/cards/18_transformations.md` の新規8枚
- 整合性確認: `dist-variance-moment`, `dist-jacobian-scale`, `dist-convolution-uniform`
- `anki/notation.md`, `anki/formulae.md`, `anki/syllabus/syllabus.yaml`, `anki/syllabus/coverage.yaml`

## 初回査読

### major 1: 歪度の符号から裾の方向を一般則として断定している

- カードID・場所: `prob-skewness-shape` の答え・計算例・一手、`prob-skewness-definition` の注意、`anki/formulae.md` の歪度。
- 根拠: 歪度は標準化三次中心モーメントであり、符号だけから「右裾が長い」「左裾が長い」を数学的に必ず導けない。少数の遠い質点と確率配分により、裾の長さという幾何的記述と三次中心モーメントの符号は一致しない場合がある。
- 再計算結果: `prob-skewness-definition` は $E[X]=0.7$, $E[X^2]=1.1$, $E[X^3]=1.9$, $\operatorname{Var}(X)=0.61$, $\mu_3=0.276$, 歪度 $0.276/0.61^{3/2}=0.5793\ldots$ で数値は正しい。ただし正値から一般に裾の長さを断定する論理は成立しない。
- 修正案: 「正なら右側の大きな偏差が三次中心モーメントを優勢にしており、典型的には右に歪んだ形状を示唆する」のように推測・目安へ弱める。問題も「典型的な解釈」を問う形にし、反例があることを注意へ明記する。正本も同様に直す。

### major 2: 尖度だけで正規分布より裾が重い・軽いと断定している

- カードID・場所: `prob-kurtosis-shape` 全体、`prob-kurtosis-definition` の注意、`anki/formulae.md` の尖度周辺。
- 根拠: 尖度 $E[(X-\mu)^4]/\sigma^4$ は標準化四次モーメントであり、尾確率の大小を全閾値で順序付ける量ではない。中央部と裾の双方の確率配置に依存するため、尖度 $>3$ だけから正規分布より裾が重いとは一般には断定できない。また二点分布に「中央が平坦」と述べるのも不適切である。
- 再計算結果: `prob-kurtosis-definition` の二点分布では $\mu=0$, $\sigma^2=1$, $\mu_4=1$、尖度1で数値は正しい。しかし、この値だけから連続分布の中央形状や尾確率を断定できない。
- 修正案: 尖度を「平均から遠い値への感度を持つ標準化四次モーメント」と定義し、裾の重さとの関係は分布族内や典型例での解釈に限定する。`prob-kurtosis-shape` は具体的な分布族または明示した密度同士を比較する問題へ変更する。

### major 3: 非独立な正規変数の線形結合も正規になるように読める

- カードID・場所: `prob-linear-combination-normal` の注意。
- 根拠: 周辺的に $X,Y$ が正規分布でも、同時正規でなければ $aX+bY$ は一般に正規分布とは限らない。共分散項を加えるだけで分布族まで決まるのは、$(X,Y)$ が同時正規の場合である。
- 再計算結果: 問題の独立な場合は $E[2X-3Y]=-4$, $\operatorname{Var}(2X-3Y)=16+81=97$ で $N(-4,97)$ は正しい。注意だけが条件不足である。
- 修正案: 「$(X,Y)$ が同時正規なら、独立でなくても線形結合は正規で、分散に $2ab\operatorname{Cov}(X,Y)$ を加える」と直す。周辺正規だけでは不十分とも明記する。

### major 4: 分位点の正本定義が離散分布・平坦区間で定義不能になる

- カードID・場所: `anki/notation.md` の第 $p$ 分位点、`anki/formulae.md` のパーセント点、coverage の「パーセント点・中央値・四分位数」。
- 根拠: 一般の累積分布関数では $F_X(x)=p$ の解が存在しない、または一意でない。coverage は公式用語を complete としているが、現在のカードは連続かつ一意な例だけで、一般定義・離散分布での判定を扱わない。
- 再計算結果: 各連続例は正しく、指数分布の上側5%点は $\log 20=2.9957\ldots$、密度 $3x^2$ の中央値は $2^{-1/3}=0.7937\ldots$、$U(0,4)$ の四分位数は1, 3、IQRは2である。しかし、例えば Bernoulli 分布では通常 $F(x)=0.5$ の解がない場合がある。
- 修正案: 正本を $q_p=\inf\{x:F_X(x)\ge p\}$ に直し、連続狭義単調の場合だけ $F_X(q_p)=p$ とする。離散例または非一意例をカードへ追加・統合し、coverage の complete を実質的に満たす。

### major 5: 変動係数の適用条件が弱く、負の平均でも比較可能に見える

- カードID・場所: `prob-coefficient-of-variation` の使用公式、`anki/notation.md`、`anki/formulae.md`。
- 根拠: $CV=\sigma/\mu$ を相対的ばらつきとして比較する通常の用途では、比率尺度かつ正の平均を前提とする。単に $\mu\ne0$ とすると負のCVが生じ、「大きいほど相対ばらつきが大きい」というカードの判定規則と矛盾する。原点を任意に移せる尺度にも不適切である。
- 再計算結果: 提示例は $CV_A=10/50=0.20$, $CV_B=30/200=0.15$ で正しい。
- 修正案: 少なくとも $\mu>0$ と比率尺度を適用条件に明記する。別流儀の $\sigma/|\mu|$ を採るなら正本で明示し、カード全体を統一する。

### major 6: モーメント変換公式の存在条件が欠落している

- カードID・場所: `prob-moment-central-relation`, `prob-moment-third-central`, `anki/formulae.md` の中心モーメント。
- 根拠: 二次式には $E[X^2]<\infty$、三次式には少なくとも $E[|X|^3]<\infty$ が必要である。単に $\mu=E[X]$ と置くだけでは各項の有限性や期待値の線形操作を保証しない。ユーザー指定の「期待値の存在条件・分散の有限性」の確認事項に抵触する。
- 再計算結果: 代数展開 $\mu_2=\mu_2'-(\mu_1')^2$、$\mu_3=\mu_3'-3\mu_2'\mu_1'+2(\mu_1')^3$ は、上記絶対モーメントが有限なら正しい。
- 修正案: 各カードと正本に必要な絶対モーメントの有限性を明記する。歪度・尖度カードの既存条件表現とも揃える。

### minor 1: 逆関数法の例で累積分布関数を全実数上に書いていない

- カードID・場所: `prob-transform-inverse-cdf` の計算例。
- 根拠: 問題は累積分布関数を求めるよう要求するが、$x>0$ の式だけを示し、$x\le0$ の値を明記していない。
- 再計算結果: $X=-\log(1-U)>0$ なので $F_X(x)=0$ ($x\le0$), $1-e^{-x}$ ($x>0$)。端点 $x=0$ でも0で連続である。
- 修正案: CDFを場合分けで完結させる。

### minor 2: 共分散公式の存在条件が曖昧

- カードID・場所: `prob-covariance-computation` の使用公式。
- 根拠: 「各期待値が存在」は $E[XY]$ を含むのか不明確である。通常は $E[X^2],E[Y^2]<\infty$ を十分条件として明記すると、Cauchy-Schwarz により $E|XY|<\infty$ も保証される。
- 再計算結果: 表の確率和は1、$E[X]=0.7$, $E[Y]=0.6$, $E[XY]=0.4$、共分散は $-0.02$ で正しい。
- 修正案: 「$E[X^2],E[Y^2]<\infty$ のとき」または必要条件を明示する。

## 全カード独立再計算の要約

- 新規31枚の確率和・密度正規化・期待値・分散・中心モーメント・共分散・相関・偏相関・分位点・Jacobian・畳み込み・比のCDF・正規線形結合を独立に再計算した。上記指摘以外の提示数値と式変形は一致した。
- `prob-partial-correlation`: 分子0.5、分母 $\sqrt{0.63}=0.793725\ldots$、結果 $0.62994\ldots$。相関行列式も $1+2(0.7)(0.5)(0.4)-0.7^2-0.5^2-0.4^2=0.38>0$ で入力は実現可能。
- `prob-transform-jacobian-2d`: 逆Jacobianは $-1/2$、台の面積2、密度積分1。
- `prob-transform-ratio`: CDFは0 ($z\le0$), $z/2$ ($0<z\le1$), $1-1/(2z)$ ($z>1$)。接続点で連続、密度積分1。
- `prob-transform-sum-density`: $ze^{-z}$ ($z>0$)、積分1。`dist-convolution-uniform` の三角密度も積分1。
- `dist-variance-moment`, `dist-jacobian-scale`, `dist-convolution-uniform` は新規カード・正本との式および記号上の矛盾なし。
- coverage の公式用語はカードIDへ形式上すべて対応するが、分位点系は major 4 のため実質的 complete と判定できない。他の対応は、上記一般性・条件の修正を前提に実質的である。

## 機械検証

- `npm run anki:validate`: 成功。139 cards、0 warnings、7 category pages、各ページ最大200枚。
- `npm run validate`: 成功。構造検証成功、249 Markdown files のKaTeX strict検証成功、237生成対象テキストの検証成功。
- 実行日時: 2026-08-16T00:52:24+09:00

## 初回件数

fatal: 0 / major: 6 / minor: 2

担当ID: math-reviewer-C03-20260816 / 実行日時: 2026-08-16T00:52:24+09:00 / 初回件数: fatal: 0 / major: 6 / minor: 2

## 修正後再査読

### 初回指摘の修正確認

1. major 1（歪度）: 解消。`prob-skewness-definition`, `prob-skewness-shape`, `anki/formulae.md` は、三次中心モーメントの符号が示す内容と典型的な形状解釈を区別し、裾の長さを断定できないことを明記している。数値 $0.5793\ldots$ も再計算と一致した。
2. major 2（尖度）: 解消。`prob-kurtosis-definition`, `prob-kurtosis-shape`, `anki/formulae.md` は、尖度を標準化四次中心モーメントとして扱い、尾確率を全閾値で順序付けないことを明記している。二点分布の尖度1、例示値の超過尖度 $+3,-1$ は正しい。
3. major 3（同時正規）: 解消。`prob-linear-combination-normal` は同時正規を明記し、周辺正規だけでは不十分と区別した。独立な問題設定での $N(-4,97)$ も正しい。
4. major 4（分位点）: 解消。正本と3カードは $q_p=\inf\{x:F_X(x)\ge p\}$ に統一され、連続かつ狭義単調増加の場合だけ方程式の解へ還元している。指数分布、$3x^2$ 密度、一様分布の数値に回帰なし。
5. major 5（変動係数）: カードと `anki/formulae.md` は解消。比率尺度かつ $\mu>0$ を明記し、例の $0.20,0.15$ は正しい。ただし下記 minor 1 の正本不整合が残る。
6. major 6（モーメント存在条件）: 解消。二次は $E[X^2]<\infty$、三次は $E[|X|^3]<\infty$ をカードと公式集に明記した。展開式に回帰なし。
7. minor 1（逆関数法CDF）: 解消。$F_X(x)=0$ ($x\le0$), $1-e^{-x}$ ($x>0$) と全実数上で完結している。
8. minor 2（共分散存在条件）: 解消。$E[X^2],E[Y^2]<\infty$ と Cauchy--Schwarz による $E|XY|<\infty$ を明記した。共分散 $-0.02$ は正しい。

### 追加変更と全体回帰確認

- 新規 `prob-shape-summary` は、平均 $>$ 中央値 $>$ 最頻値、正の歪度、尖度4.5をそれぞれ典型的な形状の手掛かりとして扱い、尾確率・裾の長さを一意に断定できないと明記している。与えられた特性値間に数値計算上の矛盾はなく、1カード1論点の範囲で総合判定を扱っている。
- 指定された6カードの priority B 化と `past_exam` source削除を確認した。数式、台、母数条件、計算例への影響はない。
- 新規32枚を全件再読し、期待値、分散、中心モーメント、歪度、尖度、分位点、共分散、相関、偏相関、Jacobian、畳み込み、比のCDF、線形結合を再計算した。初回指摘および下記1件以外に回帰なし。
- 既存 `dist-variance-moment`, `dist-jacobian-scale`, `dist-convolution-uniform` と新規カード・正本の記号、台、公式は整合している。
- coverage の公式用語とカード対応は実質的であり、`math-distribution-characteristics` と `math-transformations` の complete 判定に新たな数理上の欠落はない。

### minor 1: 変動係数の条件が `anki/notation.md` に反映されていない

- カードID・場所: `anki/notation.md` の「歪度・尖度・変動係数」の行。
- 根拠: 同行は依然として「変動係数は $CV=\sigma/\mu$ とする」とだけ記載する一方、`prob-coefficient-of-variation` と `anki/formulae.md` は「比率尺度で $\mu>0$」を適用条件としている。正本内の条件がカード・公式集と不整合であり、初回 major 5 で指定した正本修正が一箇所残っている。
- 再計算結果: 正の平均を持つ提示例では $10/50=0.20$, $30/200=0.15$。負の平均を無条件に許すと $CV<0$ となり、「大きいほど相対的ばらつきが大きい」という比較規則を適用できない。
- 修正案: `anki/notation.md` も「変動係数は比率尺度で $\mu>0$ のとき $CV=\sigma/\mu$ とする」へ統一する。

## 修正後機械検証

- `npm run anki:validate`: 成功。140 cards、0 warnings、7 category pages、各ページ最大200枚。
- `npm run validate`: 成功。構造検証成功、251 Markdown files のKaTeX strict検証成功、237生成対象テキストの検証成功。
- 実行日時: 2026-08-16T01:02:51+09:00

## 最終件数

fatal: 0 / major: 0 / minor: 1

担当ID: math-reviewer-C03-20260816 / 実行日時: 2026-08-16T01:02:51+09:00 / 初回件数: fatal: 0 / major: 6 / minor: 2 / 最終件数: fatal: 0 / major: 0 / minor: 1

## 残件修正後の最終確認

- 前回 minor 1: 解消。`anki/notation.md` は変動係数を「比率尺度で $\mu>0$ のとき $CV=\sigma/\mu$」と定め、`prob-coefficient-of-variation` および `anki/formulae.md` と条件・記号が一致した。
- 新規32枚（`17_distribution_characteristics.md` 24枚、`18_transformations.md` 8枚）を再確認し、前回再計算結果からの数式・数値・条件・台・論理展開の回帰なし。
- `anki/notation.md`, `anki/formulae.md`, `anki/syllabus/syllabus.yaml`, `anki/syllabus/coverage.yaml` の対応と公式用語の実質的coverageに新たな不整合なし。
- `npm run anki:validate`: 成功。140 cards、0 warnings、7 category pages、各ページ最大200枚。
- `npm run validate`: 成功。構造検証成功、251 Markdown files のKaTeX strict検証成功、237生成対象テキストの検証成功。
- 実行日時: 2026-08-16T01:06:51+09:00

fatal: 0 / major: 0 / minor: 0

担当ID: math-reviewer-C03-20260816 / 実行日時: 2026-08-16T01:06:51+09:00 / 初回件数: fatal: 0 / major: 6 / minor: 2 / 最終件数: fatal: 0 / major: 0 / minor: 0
