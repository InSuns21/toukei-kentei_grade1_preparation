# C03-characteristics-transformations 試験適合性査読

initial_reviewer_id: exam-reviewer-C03-20260816
initial_reviewed_at: 2026-08-16T00:53:23+09:00

## 初回指摘

### ねらい適合性

公式「ねらい」全文:

- `math-distribution-characteristics`: 「分布の各種特性値の意味を理解すると共に、特性値の値から分布の形状が推測できる。」
- `math-transformations`: 「変数変換後の分布が導出できる。」

到達行動との対応:

- 特性値の意味を理解する: `prob-expected-value-*`, `prob-variance-*`, `prob-standard-deviation-standardize`, `prob-moment-*`, `prob-coefficient-of-variation`, `prob-percentile-from-cdf`, `prob-median-from-density`, `prob-quartiles-iqr`, `prob-range-definition`, `prob-mode-from-density`, `prob-covariance-computation`, `prob-correlation-*`, `prob-partial-correlation` が、定義の再生だけでなく計算・比較・条件判定を行わせる。
- 特性値から形状を推測する: `prob-skewness-shape` は歪度の符号から非対称性の向きを判定し、`prob-kurtosis-shape` は正規分布との比較を行わせる。ただし後者には下記 major 指摘がある。`prob-coefficient-of-variation` と `prob-quartiles-iqr` は散布の比較、`prob-mode-from-density` は山の位置の特定を担う。
- 変換後の分布を導出する: `prob-transform-inverse-cdf`, `prob-transform-nonmonotonic`, `prob-transform-jacobian-2d`, `prob-transform-ratio`, `prob-transform-log` がCDF法・逆変換・Jacobian・領域積分を使って台を含む分布を導出する。`prob-transform-sum-density` は畳み込み、`prob-linear-combination-normal` は分布族の閉性、`prob-linear-combination-moments` は一般の線形結合の特性値計算を担う。

#### major EXAM-C03-01: 尖度から裾の重さを一意に推測できるという一般化が強すぎる

- 場所: `prob-kurtosis-definition`, `prob-kurtosis-shape`
- 根拠: 尖度は標準化四次中心モーメントであり、中心部と裾部の双方の寄与を受ける。尖度が3より大きいことだけから、一般の2分布について尾確率が正規分布より常に大きい、または「裾が重い」と一意に断定することはできない。カード自身も「中央の尖りの両方に影響」と注意する一方、問題・答えでは無条件に裾の重さを判定させており矛盾する。
- 再現手順: `prob-kurtosis-shape` の問題文では尖度6と2以外の分布情報が与えられていない。それでも答えが裾の重さを断定しているため、学習者は適用条件を判定できない。
- 修正案: 「尖度は外れた値への感度を含む形状指標だが、値だけで尾確率の大小は決まらない」を正答に含める。試験で求められる判定技能として、歪度は向き、分位点/IQRは位置・散布、尖度は四次標準化モーメントの大小として読み、追加仮定なしに尾の順序を断定しないカードへ直す。

### 知識充足性

公式用語16+2件の技能対応:

| 公式用語 | カードID | 実質的技能 |
|---|---|---|
| モーメント | `prob-moment-central-relation`, `prob-moment-third-central` | 原点・中心モーメントを展開して変換 |
| 期待値 | `prob-expected-value-linearity`, `prob-expected-value-discrete`, `prob-expected-value-integral`, `prob-expected-value-function` | 線形性、和・積分、関数の期待値を選択・計算 |
| 分散 | `prob-variance-affine`, `prob-variance-independent-sum`（既存 `dist-variance-moment`） | アフィン変換と共分散項の要否を判定 |
| 標準偏差 | `prob-standard-deviation-standardize` | 標準化して平均0・分散1を導出 |
| 歪度 | `prob-skewness-definition`, `prob-skewness-shape` | 計算と符号による非対称性判定 |
| 尖度 | `prob-kurtosis-definition`, `prob-kurtosis-shape` | 四次中心モーメントから計算。ただし解釈は EXAM-C03-01 |
| 変動係数 | `prob-coefficient-of-variation` | 異なる平均水準の相対散布を比較し不適用条件を判定 |
| パーセント点 | `prob-percentile-from-cdf` | 上側確率をCDFへ変換して逆算 |
| 中央値 | `prob-median-from-density` | 密度からCDFを作り中央値を計算 |
| 四分位数 | `prob-quartiles-iqr` | CDFの25%・75%点を計算 |
| 範囲 | `prob-range-definition` | 台の上下端から範囲を判定 |
| 四分位範囲 | `prob-quartiles-iqr` | 四分位差を計算し中央50%の散布として解釈 |
| 最頻値 | `prob-mode-from-density` | 密度の臨界点・端点を比較 |
| 共分散 | `prob-covariance-computation` | 同時分布から周辺期待値と積の期待値を計算 |
| 相関係数 | `prob-correlation-coefficient`, `prob-correlation-independence` | 標準化計算と無相関・独立の区別 |
| 偏相関係数 | `prob-partial-correlation` | 3相関から第三変数調整後の相関を計算 |
| 変数変換 | `prob-transform-inverse-cdf`, `prob-transform-nonmonotonic`, `prob-transform-jacobian-2d`, `prob-transform-ratio`, `prob-transform-log`（既存 `dist-jacobian-scale`） | 単調・非単調・多変量変換で台と密度/CDFを導出 |
| 確率変数の線形結合 | `prob-transform-sum-density`, `prob-linear-combination-normal`, `prob-linear-combination-moments`（既存 `dist-convolution-uniform`） | 畳み込み、正規族、共分散ありの平均・分散を使い分ける |

18用語すべてに代表カードがあり、定義掲載だけで終わる用語はない。変数変換は単調・非単調・2変量・和・比まで含み、合格に必要な導出技能を概ね満たす。

### 過不足

- 新規カード数は `17_distribution_characteristics.md` 23枚 + `18_transformations.md` 8枚 = 31枚で、`target.min=26`, `target.max=34` の範囲内。
- `prob-expected-value-discrete` と `prob-expected-value-integral`、`prob-transform-sum-density` と既存 `dist-convolution-uniform` は類似するが、離散/連続の選択、一般畳み込み/区分的な台処理という別技能を担い、削除すべき重複ではない。
- `prob-quartiles-iqr` は四分位数と四分位範囲を一枚で扱うが、同じCDF逆算の連続操作であり過剰な詰め込みではない。
- 枚数は適正。ただし EXAM-C03-01 を解消するまで、ねらいの「形状が推測できる」を正確に達成したとは判定しない。

### 優先度根拠

- A（直接対応が妥当）: `prob-moment-third-central`, `prob-skewness-definition`, `prob-kurtosis-definition` は `MATH-2017-Q1`（標本平均の歪度・尖度）に直接対応する。`prob-transform-inverse-cdf` は `MATH-2023-Q2`（カイ二乗分布・逆関数法）に直接対応する。いずれも索引IDが存在し `frequency.past_exam: 1` と整合する。
- A（線形変換系列）: `prob-variance-independent-sum`, `prob-covariance-computation`, `prob-correlation-coefficient`, `prob-transform-jacobian-2d`, `prob-linear-combination-normal`, `prob-linear-combination-moments` はすべて存在する `MATH-2021-Q5` を根拠とする。ただし索引テーマは「多変量正規分布の線形変換・独立性」であり、一般離散分布の共分散計算や一様分布のJacobian計算までが直接問われたことは索引から確認できない。技能の橋渡しとしては重要だが、直接出題と推測をmetadata上で区別すべきである。
- B: 残りは公式範囲または基礎依存技能を根拠とし、past_examを0としている。全件一律Bではなく、A/Bの差自体は設けられている。

#### major EXAM-C03-02: priority Aの過去問直接対応が複数カードで過大表示されている

- 場所: `prob-transform-nonmonotonic`, `prob-transform-jacobian-2d`, `prob-covariance-computation`, `prob-correlation-coefficient`, `prob-variance-independent-sum`, `prob-linear-combination-moments`
- 根拠: `MATH-2023-Q2` の索引テーマは「カイ二乗分布・逆関数法」で、`prob-transform-nonmonotonic` の一様分布の二乗変換を直接示さない。`MATH-2021-Q5` は「多変量正規分布の線形変換・独立性」で、上記カードの一般離散共分散、一様分布の2次元Jacobian、一般分布の線形結合モーメントが直接出題されたと索引だけからは確認できない。テーマが近いことと、同じ操作が直接問われたことが混同されている。
- 再現手順: 各カードの `sources[].topic` と `references/past-exam-index.yaml` の該当IDの `theme` を比較する。索引はIDの存在を確認できるが、カード固有操作の直接対応を裏付けない。
- 修正案: 公式問題・略解で操作を確認できるカードだけAと `past_exam: 1` を維持する。橋渡し技能ならpriority Bへ下げてpast_exam sourceを依存根拠として区別するか、直接対応する別過去問IDを追加する。少なくとも `prob-transform-nonmonotonic` は逆関数法との直接対応を再確認する。

#### minor EXAM-C03-03: 形状推測の横断問題がなく、技能が歪度・尖度の単発判定に分かれている

- 場所: `prob-skewness-shape`, `prob-kurtosis-shape`, `prob-coefficient-of-variation`, `prob-quartiles-iqr`, `prob-mode-from-density`
- 根拠: 公式ねらいは「各種特性値の値から分布の形状」を要求するが、複数の特性値を同時に見て、位置・散布・非対称性・外れた値への感度を総合記述するカードがない。
- 修正案: 新規枚数上限内で、既存の単発カード1枚を統合するか、平均・中央値・最頻値、四分位範囲、歪度、尖度を与えて「言えること／言えないこと」を判定する1枚を追加する。

#### minor EXAM-C03-04: `prob-mode-from-density` の端点説明は開区間の台で不正確になり得る

- 場所: `prob-mode-from-density` の注意
- 根拠: 「密度が単調な分布では最頻値は台の端点に来る」は、開区間上で上限値が達成されない密度ではarg maxが存在しない場合がある。試験では台と最大値達成の判定が必要。
- 修正案: 「端点が台に含まれ最大値を達成する場合。開端点では上限のみで最頻値が存在しない定義もある」と条件を補う。

初回件数: fatal: 0 / major: 2 / minor: 2

## 機械検証

- `npm run anki:validate`: 成功（139 cards、0 warnings、7 category pages、各ページ最大200枚）
- `npm run validate`: 成功（構造検証成功、251 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功）

## 修正確認

再査読日時: 2026-08-16T01:03:02+09:00

- EXAM-C03-01（major）: **major解消、minor残存**。`prob-kurtosis-shape` の問題・答え・計算例・注意には、尖度だけで尾確率の大小を一意に断定できないことが追加され、主要な誤学習リスクは解消した。ただしタイトル「尖度の値から分布の裾の重さを判定する」と使用公式・定理「超過尖度の符号で正規分布との裾の重さを比較する」は無条件の断定表現のままで、同じカードの答え・注意と矛盾する。
- EXAM-C03-02（major）: **解消**。`prob-variance-independent-sum`, `prob-covariance-computation`, `prob-correlation-coefficient`, `prob-transform-nonmonotonic`, `prob-transform-jacobian-2d`, `prob-linear-combination-moments` はpriority B、`frequency.past_exam: 0` となり、根拠が確認できないpast_exam sourceも除去された。Aに残る `prob-moment-third-central`, `prob-skewness-definition`, `prob-kurtosis-definition`, `prob-transform-inverse-cdf`, `prob-linear-combination-normal` は索引の `MATH-2017-Q1`, `MATH-2023-Q2`, `MATH-2021-Q5` と操作が直接対応する。
- EXAM-C03-03（minor）: **解消**。新規 `prob-shape-summary` は平均・中央値・最頻値、IQR、歪度、尖度を位置・散布・非対称性・外れた値への感度に分け、「示唆」と「断定できないこと」を総合判定させる。coverageにも登録済み。
- EXAM-C03-04（minor）: **解消**。`prob-mode-from-density` は端点が台に含まれ、そこで最大値を達成する場合に限定し、開端点では最頻値が存在しない定義があることを明記した。

数理査読由来の修正も全32枚と正本で確認した。歪度の符号は示唆へ限定され、`prob-linear-combination-normal` は同時正規条件を明示し、分位点は一般化逆関数、変動係数は比率尺度かつ正の平均、モーメント・共分散は存在条件、逆関数法は全実数上のCDFをそれぞれ示している。これらによる試験適合性上の回帰はない。

### 再査読残存指摘

#### minor EXAM-C03-R1: 尖度カードのタイトル・公式欄が修正後の限定解釈と不一致

- 場所: `prob-kurtosis-shape` の `title` と「使用公式・定理」
- 根拠: タイトルは「裾の重さを判定する」、公式欄は「超過尖度の符号で正規分布との裾の重さを比較する」と断定する一方、答えと注意は尖度だけで尾確率の大小を一意に断定できないと正しく限定している。Ankiではタイトル・公式欄だけを先に再生するため、初回指摘の誤った短縮形が残る。
- 修正案: タイトルを「尖度の値から形状について言えることを判定する」等へ変更し、公式欄を「超過尖度の符号は四次標準化モーメントの正規分布との差を表す。裾の重さとの対応は分布族内または典型例での示唆に限る」とする。

再査読件数: fatal: 0 / major: 0 / minor: 1

### 再査読時の機械検証

- `npm run anki:validate`: 成功（140 cards、0 warnings、7 category pages、各ページ最大200枚）
- `npm run validate`: 成功（構造検証成功、251 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功）

`fatal: 0 / major: 0 / minor: 0` ではないため、`final_reviewer_id` と `final_reviewed_at` は未記録。EXAM-C03-R1修正後に同じ担当IDで再確認する。

担当ID: exam-reviewer-C03-20260816 / 実行日時: 2026-08-16T01:03:02+09:00 / 最終件数: fatal: 0 / major: 0 / minor: 1

## 最終確認

final_reviewer_id: exam-reviewer-C03-20260816
final_reviewed_at: 2026-08-16T01:06:53+09:00

- EXAM-C03-R1（minor）: **解消**。`prob-kurtosis-shape` のタイトルは「尖度の値から分布の形状を推測する」となり、使用公式・定理も超過尖度を平均から遠い値への感度の目安と位置付け、値だけで尾確率の大小を一意に断定できないと明記した。問題・答え・計算例・一手・注意および `anki/formulae.md` と矛盾しない。
- 全32枚（`17_distribution_characteristics.md` 24枚、`18_transformations.md` 8枚）を再確認した。公式ねらい2件、公式用語16+2件、coverage、優先度、過去問source、正本との同期に未解消指摘はない。
- A指定5枚の `MATH-2017-Q1`, `MATH-2023-Q2`, `MATH-2021-Q5` は `references/past-exam-index.yaml` に存在し、カードの直接操作と対応する。その他はBとして過去問直接対応を過大表示していない。
- 新規32枚は `target.min=26`, `target.max=34` の範囲内で、統合形状判定カードを含めても不要な重複・過剰な細分化はない。
- `npm run anki:validate`: 成功（140 cards、0 warnings、7 category pages、各ページ最大200枚）。
- `npm run validate`: 成功（構造検証成功、251 Markdown filesのKaTeX strict検証成功、237生成対象テキスト検証成功）。

担当ID: exam-reviewer-C03-20260816 / 実行日時: 2026-08-16T01:06:53+09:00 / 最終件数: fatal: 0 / major: 0 / minor: 0
