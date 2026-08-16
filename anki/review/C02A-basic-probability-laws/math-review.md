# C02A-basic-probability-laws 初回独立数理査読

- 作業ID: `C02A-basic-probability-laws`
- 査読種別: 初回 Anki 独立数理査読
- 担当ID: `codex-independent-math-reviewer-C02A-20260816`
- 実行日時: 2026-08-16 16:30:32 JST
- 対象カード: 14枚（`anki/cards/21_basic_probability_laws.md`）
- 対象サブカテゴリー: `math-events`
- 参照・照合した正本: `agents/independent-math-reviewer.md`、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml`

## 査読方法

執筆時の解答を正しさの根拠にせず、各カードについて、定義または定理を先に書き直し、数値を別順序で計算し、必要条件（分母の正、分割、等確率性、独立性など）を個別に確認した。さらに、カード内の記法が `anki/notation.md` と `anki/formulae.md` に一致するか、問題・答え・使用公式・計算例が1つの論点として再現可能かを確認した。

## カード別確認結果

### 1. `prob-basic-sample-space` — 標本空間・事象・確率測度の基本

- 判定: 数理上問題なし。
- 独立再計算: 公平な6面サイコロでは各結果の確率が $1/6$。$A=\{1,3,5\}$ は3結果を含むため、$P(A)=3(1/6)=1/2$。補集合は $A^c=\{2,4,6\}$ で、$1/2+1/2=1$。
- 条件・記法: $\Omega=\{1,\ldots,6\}$、有限標本空間の事象全体 $\mathcal F=2^\Omega$、有限一様公式の適用はいずれも整合する。確率空間の非負性・規格化・可算加法性の記載も論点に必要な範囲で妥当。

### 2. `prob-basic-addition-complement` — 加法定理と余事象

- 判定: 数値・公式は正しい。ただし下記の `minor` 指摘あり。
- 独立再計算: $0.6+0.5-0.2=0.9$、$1-0.6=0.4$。
- 条件・記法: 包除原理と補集合公式の適用条件に問題なし。

#### 指摘 M-01

- severity: `minor`
- カードID: `prob-basic-addition-complement`
- 見出し: `加法定理と余事象`
- 根拠: Anki作業の1カード1論点基準に対し、問題が $P(A\cup B)$ と $P(A^c)$ という別々の操作を同時に要求し、「使用公式・定理」も加法定理と補集合公式の2本を並列に扱っている。数学的誤りではないが、想起時の判定対象が2つになり、カード単位の論点境界が曖昧になる。
- 修正案: `加法定理` と `余事象` を別カードへ分割する。または本カードをどちらか一方に限定し、もう一方は関連カードへのリンクに留める。分割時はcoverageのカードIDも対応して更新する。

### 3. `prob-basic-conditional-probability` — 条件付き確率の定義と計算

- 判定: 数理上問題なし。
- 独立再計算: $P(A\mid B)=P(A\cap B)/P(B)=0.12/0.30=0.4$。
- 条件・記法: $P(B)=0.30>0$ が明示的に満たされ、$P(A\mid B)$ と $P(B\mid A)$ を区別する注意も適切。

### 4. `prob-basic-chain-rule` — 乗法定理と確率の連鎖律

- 判定: 数理上問題なし。
- 独立再計算: $P(A\cap B)=0.5\times0.6=0.30$、続いて $P(A\cap B\cap C)=0.30\times0.25=0.075$。
- 条件・記法: $P(A)>0$、$P(A\cap B)=0.30>0$ なので両条件付き確率が定義できる。公式の順序も `formulae.md` と一致する。

### 5. `prob-basic-independent-vs-disjoint` — 独立事象と排反事象の違い

- 判定: 数理上問題なし。
- 独立再計算: $P(A\cap B)=0$ なので排反。一方、独立性なら必要な積は $P(A)P(B)=0.4\times0.5=0.2$ だが、実際の交わりは0で不一致。したがって独立でない。
- 条件・記法: 両確率が正の排反事象は独立でないという注意も正しい。

### 6. `prob-basic-total-probability` — 全確率の公式

- 判定: 数理上問題なし。
- 独立再計算: $P(D)=P(D\mid A)P(A)+P(D\mid B)P(B)=0.02\times0.7+0.08\times0.3=0.014+0.024=0.038$。
- 条件・記法: 「$A,B$ は標本空間を分割」により互いに排反で和が標本空間、重みの和が1と読める。条件付き確率を単純加算していない。

### 7. `prob-basic-bayes` — Bayesの定理

- 判定: 数理上問題なし。
- 独立再計算: $P(D^c)=0.99$、$P(+)=0.9\times0.01+0.05\times0.99=0.009+0.0495=0.0585$。したがって $P(D\mid +)=0.009/0.0585=2/13\approx0.153846$、約15.4%。
- 条件・記法: 感度 $P(+\mid D)$ と事後確率 $P(D\mid +)$ の区別、分母の全確率展開ともに妥当。

### 8. `prob-basic-inclusion-exclusion` — 包除原理による確率計算

- 判定: 数理上問題なし。
- 独立再計算: $P(A\cup B)=0.55+0.40-0.18=0.77$。
- 条件・記法: 共通部分を二重計上して1回引く説明が公式に対応する。与えられた数値は確率として整合的。

### 9. `prob-basic-symmetry` — 対称性を使う確率計算

- 判定: 数理上問題なし。
- 独立再計算: 3人の全順列は $3!=6$ 通り、特定の人を先頭に固定した順列は残り2人の $2!=2$ 通り。比は $2/6=1/3$。対称性から3人の先頭確率の和が1なので各 $1/3$ という別経路も成立。
- 条件・記法: 「ランダム」を全順列一様と明示しており、重み付きの場合に対称性を使えない注意も適切。

### 10. `prob-basic-combination-probability` — 組合せ計数と確率

- 判定: 数理上問題なし。
- 独立再計算: 全ての2個組は $\binom82=28$ 通り。赤1個・青1個は $\binom51\binom31=15$ 通りなので $15/28$。同時抽出で順序を捨てた標本空間を分母に使っており、非復元条件にも整合する。

### 11. `prob-basic-conditional-independence` — 条件付き独立

- 判定: 数理上問題なし。
- 独立再計算: $P(A\cap B\mid C)=0.12/0.5=0.24$、$P(A\mid C)=0.2/0.5=0.4$、$P(B\mid C)=0.3/0.5=0.6$。積は $0.4\times0.6=0.24$ で一致するため、$C$ の下で条件付き独立。
- 条件・記法: $P(C)=0.5>0$ があり、条件付き確率の全分母が正。無条件独立と区別する注意も適切。$C$ の外側の確率が未指定でも条件付き独立判定には不要。

### 12. `prob-basic-event-limsup-liminf` — 事象列のlimsup・liminf

- 判定: 数理上問題なし。
- 独立再計算: 任意の尾部には奇数添字と偶数添字が存在する。したがって尾部の和集合は $A\cup A^c=\Omega$、尾部の共通部分は $A\cap A^c=\varnothing$。それらをそれぞれ全 $n$ で交差・和集合しても $\limsup A_n=\Omega$、$\liminf A_n=\varnothing$。
- 条件・記法: 定義式、無限回起こる／十分先では常に起こるという意味づけ、$\liminf\subseteq\limsup$ の注意が `formulae.md` と一致する。

### 13. `prob-basic-boole-inequality` — Booleの不等式

- 判定: 数理上問題なし。
- 独立再計算: $P(A_1\cup A_2\cup A_3)\le P(A_1)+P(A_2)+P(A_3)=0.2+0.2+0.2=0.6$。
- 条件・記法: 有限版・可算版の両方を示し、独立性を仮定していない。和が1を超える場合に確率上限1も併用できる注意も正しい。

### 14. `prob-basic-borel-cantelli` — Borel–Cantelliの補題（基本形）

- 判定: 数理上問題なし。
- 独立再計算: $\sum_{n=1}^{\infty}P(A_n)=\sum_{n=1}^{\infty}1/n^2=\pi^2/6<\infty$。第1 Borel–Cantelli補題より $P(\limsup_n A_n)=0$。この含意には独立性不要で、注意書きも正しい。
- 条件・記法: 直前カードの「無限回起こる」と $\limsup$ の対応が明確で、逆向きに追加条件が必要という説明も妥当。

## 総括

- 14カードの定義、公式、数値計算、論理、必要条件、記法を独立に確認した。
- 数学的な `fatal` 指摘: 0件。
- 数学的な `major` 指摘: 0件。
- `minor` 指摘: 1件（M-01、1カード1論点の境界）。
- 既存の修正: 作業専用査読記録は未作成で、対象カード・正本・coverage・progress上に今回査読前の修正記録は確認できなかった。したがって、既存の修正を前提にした再判定はない。
- 今回の査読では、カード本文、`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`、`anki/progress.yaml` は変更していない。

## 機械検証

- コマンド: `npm run validate`
- 実行日時: 2026-08-16 16:36:25 JST
- 結果: 成功。`validate:structure`（教材構造・依存関係・進捗メタデータ）、`validate:math`（264 MarkdownファイルをKaTeX strictで検証）、`validate:text`（237生成対象テキスト）をすべて通過。

## 初回査読件数

`fatal: 0 / major: 0 / minor: 1`
## 修正後再査読

- 査読種別: 初回指摘後の修正後再査読
- 担当ID: `codex-independent-math-reviewer-C02A-20260816`（初回と同一担当）
- 実行日時: 2026-08-16 16:46:28 JST
- 対象: `anki/cards/21_basic_probability_laws.md` の14枚全体
- 独立性: 初回の判定結果を前提にせず、現行本文を最初から読み直し、公式の再導出と数値の再計算を行った。

### 修正確認

- `prob-basic-sample-space`: 問題文に「$\mathcal F$ は $\Omega$ 上のシグマ代数である」が追加され、初回の前提明示不足は改善された。$P(A)=3/6=1/2$ を再確認し、問題なし。
- `prob-basic-addition-complement`: 例が排反事象に変更され、$P(A\cup B)=P(A)+P(B)$ の条件が明記された。数値は $0.4+0.3=0.7$、$1-0.4=0.6$ で正しい。ただし、初回M-01の1カード1論点問題は残る。
- `prob-basic-combination-probability`: 「各2個の組合せが等確率」と明記され、組合せ比の適用条件が改善された。$\binom82=28$、$\binom51\binom31=15$、確率 $15/28$ を再確認し、問題なし。
- `prob-basic-conditional-independence`: 「$P(C)>0$ のとき」が追加され、条件付き確率の定義条件が明示された。その他の11枚にも、再査読で新たな修正漏れは確認されなかった。

### 14枚の独立再計算

1. `prob-basic-sample-space`: 公平な6面サイコロで各結果は $1/6$。$A=\{1,3,5\}$ は3結果なので $P(A)=3/6=1/2$。$\mathcal F=2^\Omega$ はシグマ代数。問題なし。
2. `prob-basic-addition-complement`: 排反条件より $P(A\cup B)=0.4+0.3=0.7$。補集合は $P(A^c)=1-0.4=0.6$。数理計算は正しいが、下記M-01が残る。
3. `prob-basic-conditional-probability`: $P(A\mid B)=0.12/0.30=0.4$。分母 $P(B)>0$ を満たす。問題なし。
4. `prob-basic-chain-rule`: $P(A\cap B)=0.5\times0.6=0.30$、$P(A\cap B\cap C)=0.30\times0.25=0.075$。必要な分母は正。問題なし。
5. `prob-basic-independent-vs-disjoint`: 交わりが0なので排反。独立なら交わりは $0.4\times0.5=0.2$ のはずで不一致。排反だが独立でない。問題なし。
6. `prob-basic-total-probability`: 分割に対し $0.02\times0.7+0.08\times0.3=0.014+0.024=0.038$。問題なし。
7. `prob-basic-bayes`: $P(D^c)=0.99$、$P(+)=0.009+0.0495=0.0585$、$P(D\mid +)=0.009/0.0585=2/13\approx0.1538$。問題なし。
8. `prob-basic-inclusion-exclusion`: $0.55+0.40-0.18=0.77$。包除原理の適用と説明は正しい。問題なし。
9. `prob-basic-symmetry`: 全順列 $3!=6$、特定の人を先頭に固定した順列 $2!=2$、確率 $2/6=1/3$。問題なし。
10. `prob-basic-combination-probability`: 等確率な2個組が28通り、赤青の組が15通りなので $15/28$。前提明示後も計算・記法は正しい。問題なし。
11. `prob-basic-conditional-independence`: $P(A\cap B\mid C)=0.12/0.5=0.24$、$P(A\mid C)P(B\mid C)=(0.2/0.5)(0.3/0.5)=0.4\times0.6=0.24$。$P(C)=0.5>0$。問題なし。
12. `prob-basic-event-limsup-liminf`: 任意の尾部に奇数・偶数添字があるため、尾部の和集合は $A\cup A^c=\Omega$、共通部分は $A\cap A^c=\varnothing$。よって $\limsup A_n=\Omega$、$\liminf A_n=\varnothing$。問題なし。
13. `prob-basic-boole-inequality`: $P(\cup_{i=1}^3A_i)\le0.2+0.2+0.2=0.6$。独立性を仮定していない。問題なし。
14. `prob-basic-borel-cantelli`: $\sum_nP(A_n)=\sum_n1/n^2=\pi^2/6<\infty$。第1 Borel–Cantelli補題より $P(\limsup A_n)=0$。独立性不要の向きであり、問題なし。

### 初回指摘M-01の再判定

- 対象: `prob-basic-addition-complement` / 見出し「加法定理と余事象」
- 初回指摘: 加法定理と余事象という2つの操作を1カードに併載しており、1カード1論点の基準に抵触。
- 修正確認: 排反条件の追加により、加法公式の数学的条件は明確になった。しかし、問題は依然として $P(A\cup B)$ と $P(A^c)$ の2問を含み、使用公式も2本、一手も2操作を扱っている。したがって、初回指摘は未解消。
- severity: `minor`
- 具体的修正案: `prob-basic-addition-complement` を、(a) 排反または一般の加法定理だけを扱うカード、(b) 余事象公式だけを扱うカードに分割する。分割しない場合は、本カードの問題・答え・使用公式・一手をどちらか一方の論点に限定し、coverageのカードIDと必要な進捗記録を同期する。

### 再査読最終判定

- 新規 `fatal`: 0件
- 新規 `major`: 0件
- 修正後に残る `minor`: 1件（M-01未解消）
- 再査読結果: `fatal: 0 / major: 0 / minor: 1`
- `fatal: 0 / major: 0 / minor: 0` には未到達。M-01の分割または単一論点化後に、同一担当による再査読が必要。
## 最終再査読

- 査読種別: 追加修正後の最終再査読
- 担当ID: `codex-independent-math-reviewer-C02A-20260816`（初回・前回再査読と同一担当）
- 実行日時: 2026-08-16 16:55:29 JST
- 対象: `anki/cards/21_basic_probability_laws.md` の14枚全体
- 独立性: 現行本文を最初から読み直し、各カードの定義・公式・条件・数値を独立に再導出した。

### 修正確認

- `prob-basic-addition-complement`: title が「余事象の確率」、topic が `complement-probability` となり、問題・公式・計算例・一手・注意が余事象だけに限定された。初回M-01は解消。
- `prob-basic-bayes`: 壺 $U_1,U_2$ と赤玉 $R$ の新規設定へ差し替えられ、既存診断カードとの重複は解消された。数値も整合する。

### 14枚の最終独立再計算

1. `prob-basic-sample-space`: 公平な6面サイコロで $A=\{1,3,5\}$ は3結果。$P(A)=3/6=1/2$。$\mathcal F=2^\Omega$ はシグマ代数。問題なし。
2. `prob-basic-addition-complement`: $P(A^c)=1-P(A)=1-0.4=0.6$。単一論点で、M-01解消。
3. `prob-basic-conditional-probability`: $P(A\mid B)=0.12/0.30=0.4$、分母は正。問題なし。
4. `prob-basic-chain-rule`: $P(A\cap B)=0.5\times0.6=0.30$、$P(A\cap B\cap C)=0.30\times0.25=0.075$。問題なし。
5. `prob-basic-independent-vs-disjoint`: $P(A\cap B)=0$ なので排反。独立性に必要な積は $0.4\times0.5=0.2$ で不一致。問題なし。
6. `prob-basic-total-probability`: $0.02\times0.7+0.08\times0.3=0.014+0.024=0.038$。分割条件も明記され、問題なし。
7. `prob-basic-bayes`: $P(R)=0.7\times0.4+0.2\times0.6=0.28+0.12=0.40$。よって $P(U_1\mid R)=0.7\times0.4/0.40=0.28/0.40=0.7$。問題なし。
8. `prob-basic-inclusion-exclusion`: $P(A\cup B)=0.55+0.40-0.18=0.77$。問題なし。
9. `prob-basic-symmetry`: 全順列は $3!=6$、特定の人を先頭に固定すると $2!=2$。確率は $2/6=1/3$。問題なし。
10. `prob-basic-combination-probability`: 等確率な2個組は $\binom82=28$、赤青の組は $\binom51\binom31=15$。確率は $15/28$。問題なし。
11. `prob-basic-conditional-independence`: $P(A\cap B\mid C)=0.12/0.5=0.24$、$P(A\mid C)P(B\mid C)=0.4\times0.6=0.24$。$P(C)>0$。問題なし。
12. `prob-basic-event-limsup-liminf`: 任意の尾部で和集合は $A\cup A^c=\Omega$、共通部分は $A\cap A^c=\varnothing$。したがって $\limsup A_n=\Omega$、$\liminf A_n=\varnothing$。問題なし。
13. `prob-basic-boole-inequality`: $P(A_1\cup A_2\cup A_3)\le0.2+0.2+0.2=0.6$。問題なし。
14. `prob-basic-borel-cantelli`: $\sum_n1/n^2=\pi^2/6<\infty$ なので、第1 Borel–Cantelli補題より $P(\limsup A_n)=0$。問題なし。

### 初回指摘の解消確認

- M-01（`prob-basic-addition-complement` の1カード1論点）: 解消。
- 修正後カードは余事象の定義・公式 $P(A^c)=1-P(A)$・単一計算例だけを扱う。
- Bayesカードの差替えによる新たな数学的問題・重複上の問題は確認されなかった。

### 最終判定

- `fatal: 0`
- `major: 0`
- `minor: 0`
- 最終結果: `fatal: 0 / major: 0 / minor: 0`