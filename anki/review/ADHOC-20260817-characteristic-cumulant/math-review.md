# 独立数理査読記録 — ADHOC-20260817-characteristic-cumulant

- 担当ID: independent-math-reviewer-26cgf
- 査読対象: `anki/cards/26_characteristic_cumulant.md` の新規7枚
- 実行日時: 2026-08-17
- 適用範囲: AGENTS.md「Anki作業と通常章・模試の範囲境界」に従う。連結演習・答案圧縮・部分点指針の不在は欠陥としない。

## 査読対象カード

1. `prob-characteristic-function-definition` (S)
2. `prob-characteristic-function-sum` (S)
3. `prob-characteristic-function-uniqueness` (S)
4. `prob-characteristic-function-normal` (S)
5. `prob-cumulant-mgf` (S)
6. `prob-cumulant-sum` (A)
7. `prob-characteristic-nonexistence-mgf` (S)

## 機械検証

- `npm run validate`（validate:structure / validate:math / validate:text）: **成功**（exit 0）
- KaTeX strict で Markdown 282ファイル、生成対象テキスト237件を検証し、エラーなし。
- 数式区切り：インライン `$...$`・別行 `$$...$$` が使用され、`\(...\)`・`\[...\]`・`align`・`\label`・`\ref`・`\tag`・独自マクロは不使用。
- YAMLフロントマター：7枚すべて parse 成功。`type`, `id`, `category`, `subcategory`, `topic`, `hashtags`, `priority`, `difficulty`, `sources` 整合。
- ID重複：全カード323 ID中重複なし。参照先 `prob-mgf-iid-sum`・`prob-pgf-independent-sum`・`prob-mgf-identify-normal`・`prob-mgf-mean-variance` はすべて存在。

## 正本整合

- `anki/notation.md` の $N(\mu,\sigma^2)$ 第2引数は分散（カード一致）、$M_X(t)=E[e^{tX}]$（一致）、コーシー分布 `Cauchy(x0,γ)` 台 $\mathbb R$（カードの $\operatorname{Cauchy}(0,\gamma)$ は位置0の特殊形として整合）。
- `anki/formulae.md` の正規 MGF $\exp(\mu t+\sigma^2t^2/2)$（カード一致）、独立和 MGF $M_{X+Y}=M_XM_Y$（カード一致）。
- 特性関数 $\varphi$・キュムラント母関数 $K$・キュムラント $\kappa$ は正本に未登録（下記 minor C1 / C2に関連）。

## 独立再計算

### card 1 prob-characteristic-function-definition
$\varphi_X(t)=E[e^{itX}]$。$|e^{itX}|=1$ より $\|e^{itX}\|_1=E[|e^{itX}|]=1<\infty$。$E[\cos(tX)]$・$E[\sin(tX)]$ は各々 $|\cos|\le1,|\sin|\le1$ で有限。実数 $t$ 全体で絶対収束し、Bernoulli 例 $1-p+pe^{it}$ も正しい。

### card 2 prob-characteristic-function-sum
$n\ge1$ に対し $e^{it\sum X_i}=\prod e^{itX_i}$、独立性より積分の積が積の積分に分解し $\varphi_S=\prod\varphi_{X_i}$。全項が実数 $t$ を共有（同一 $t$）する必要がある。Bernoulli 例は二項 MGF と整合。

### card 3 prob-characteristic-function-uniqueness
特性関数一致→分布一致（Levy/Cramér–Wold の一意性）。原点近傍有限を要求しない点の指摘は正しい。応用（再生性・和の同定）として正しい。

### card 4 prob-characteristic-function-normal
$M_X(t)=e^{\mu t+\sigma^2t^2/2}$ に対し $\varphi_X(t)=M_X(it)=e^{i\mu t-\sigma^2t^2/2}$。正規分布への $t\mapsto it$ はモーメント母関数（整関数・複素平面上で有界に制御される指数部）の解析接続として正当。符号 $-(\sigma^2t^2)/2$ に注意する指摘も正しい。但し「解析接続として正当」は広く認められた手続きであり、「（置き換えは）常に無条件に正当」と一般化しないこと（下記 minor F1）。

### card 5 prob-cumulant-mgf
$K_X(t)=\log M_X(t)$、原点近傍で $M_X>0$。第1・第2キュムラントが $\kappa_1=E[X]$、$\kappa_2=\mathrm{Var}(X)$ に一致（正規分布例で $\kappa_1=\mu,\kappa_2=\sigma^2,r\ge3$→0 と整合）。original の「対数の関数の展開係数としてキュムラントを与える」は多義的（下記 minor C3）。

### card 6 prob-cumulant-sum
$M_S=M_XM_Y$ に対し $K_S=\log M_S=\log M_X+\log M_Y=K_X+K_Y$、各次数の加法性 $\kappa_r(S)=\kappa_r(X)+\kappa_r(Y)$ が導かれる。正規の加法再生（$\mu_1+\mu_2,\sigma_1^2+\sigma_2^2$、3次以上0）と整合。

### card 7 prob-characteristic-nonexistence-mgf
コーシー分布 $\operatorname{Cauchy}(0,\gamma)$ の特性関数は $E[e^{itX}]=e^{-\gamma|t|}$、確かに実軸全体で定義される。平均もモーメント母関数も存在しないのに特性関数は存在する、という pitfall は正しい（下記 minor H1, H2）。

## 初回指摘

### 【minor C1】特性関数の定義が「定義する」という問いの前半部に対して明示的に示されていない — `anki/cards/26_characteristic_cumulant.md` / `prob-cumulant-mgf`
- 根拠: カード題名は「キュムラント母関数を対数モーメント母関数で定義する」だが、問題文・答えは第1・第2キュムラントと平均・分散の関係を中心に構成し、コーシー分布とは異なり「特性関数」あるいは「$K_X$ の定義」そのもの（$K_X(t)=\log M_X(t)$）への集中は副次である。読者がカード題名から期待する主目標である「定義」が、達成確認しにくい。
- 独立計算: 不要（定義の提示論点）。
- 修正案: 問題文を「キュムラント母関数 $K_X(t)=\log M_X(t)$ を定義し、…（第1・第2キュムラントと平均・分散の関係）」のように、$K_X$ の定義式を問題文か答えの冒頭で明示する。題名と一致させる。

### 【minor C2】特性関数・キュムラント母関数が `anki/notation.md` / `anki/formulae.md` に未登録 — `prob-characteristic-function-definition`, `prob-cumulant-mgf`
- 根拠: 当該論点の記法 $\varphi_X(t)$・$K_X(t)$・$\kappa_r$ は正本に未登録。カードは自己完結的に定義を載せているため読み手の探索は発生しない（AGENTS.md「定義ファイルを探索させない」は満たす）が、正本が「記法正本」「利用公式正本」と位置づけられている以上、特性関数の母関数としての位置づけ・対数加法性に対応する項目を正本へ同期登録するのが一貫する。
- 独立計算: 不要。
- 修正案: `anki/notation.md`（記法: 特性関数 $\varphi_X(t)=E[e^{itX}]$、$K_X(t)=\log M_X(t)$）と `anki/formulae.md`（特性関数の定義・独立和の積、対数加法性）へ追記。

### 【minor C3】original「対数の関数の展開係数としてキュムラントを与える」が曖昧 — `anki/cumulant-mgf`
- 根拠: $K_X(t)=\sum_r\kappa_rt^r/r!$ の「展開係数」を意味するなら正確に書ける。
- 独立計算: $K_X=\log M_X$、$M_X$ の原点周りの展開を用いれば $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$。単なる「対数の関数の展開係数」は読み手に $\kappa_r$ の定義そのものを曖昧に伝える。
- 修正案: original に「$K_X(t)=\log M_X(t)$ の $t=0$ での展開 $K_X(t)=\sum_{r\ge1}\kappa_rt^r/r!$ の係数 $\kappa_r$ を第 $r$ キュムラントとする」と明記する。

### 【minor F1】「$it$ の置き換えは…解析接続として正当化され」という表現がやや強い — `anki/cards/26_characteristic_cumulant.md` / `prob-characteristic-function-normal`
- 根拠: 正規分布への $t\mapsto it$ は指数部の多項式と整関数であるモーメント母関数に対し解析接続として正当だが、一般の分布では $M_X(it)=E[e^{itX}]$ はモーメント母関数の $t=it$ への形式的代入と必ずしも一致しない（モーメント母関数が虚軸のどの近傍まで拡張できるか、また複素期待値の計算の正当性に依る）。カードの例・結論は正しいが、「モーメント母関数の $it$ 置き換え」を一般に正当化してよい読み方にするなら、正規分布（指数部が整関数）に限定する旨を明示すると安全。
- 独立計算: 正規分布 $N(\mu,\sigma^2)$ のモーメント母関数 $M(t)=e^{\mu t+\sigma^2t^2/2}$ は複素 $t$ まで整関数として延長でき、$M(it)=e^{i\mu t-\sigma^2t^2/2}$ は特性関数に一致。
- 修正案: 「$N(\mu,\sigma^2)$ のような $t$ の整関数指数部を持つモーメント母関数では、$t\mapsto it$ の置き換えが解析接続として正当であり…」のように限定句を補う。

### 【minor H1】「対数正規分布も特性関数は存在する」の記述が高レベル — `anki/cards/26_characteristic_cumulant.md` / `prob-characteristic-nonexistence-mgf`
- 根拠: 対数正規分布の特性関数の閉形式は初等的でなく、このカードの主旨（MGF不存在でも CFは存在）には不要に散漫。コーシー例だけで主旨は立つ。
- 独立計算: コーシー分布の特性関数 $e^{-\gamma|t|}$ は標準公式に一致。
- 修正案: 対数正規分布の文言は維持してもよいが、閉形式は複雑と明記済みのため、このままでも完全な誤りではない。要修正とまではしない。

### 【minor H2】「特性関数は…複素積分が必要」が補足的にやや散漫 — `anki/cards/26_characteristic_cumulant.md` / `prob-characteristic-nonexistence-mgf`
- 根拠: 一意性・独立性の議論に十分という主旨は使えるが、複素積分という文言が主旨から外れるので、むしろ「期待値の存在に $E[|e^{itX}|]=1$ を使えば複素積分を回避できる」と書く方が主旨に合う。
- 独立計算: 不要。
- 修正案: 注意欄を「複素積分は必要としない（$\lvert e^{itX}\rvert=1$）」と書き換えると主旨と一致する。

## 最終判定

- fatal: 0
- major: 0
- minor: 6（同一複数カード起因の軽微指摘を含む。いずれも致命的・構造的欠陥ではなく、カードの数学的結論は全て独立再計算で確認済み）

---

# 2回目 修正後再査読（初回指摘の解消確認を含む全文再査読）

- 担当ID: independent-math-reviewer-26cgf（初回査読と同じ担当）
- 実行日時: 2026-08-17
- 方法: 対象カード7枚と `anki/notation.md`・`anki/formulae.md`・`anki/syllabus/syllabus.yaml`・`anki/syllabus/coverage.yaml`・`anki/progress.yaml`・`references/*`・`style-guide.md` の全文再読と、初回6件の指摘解消確認を独立に行った。旧指摘は消していない。

## 機械検証（2回目）

- `npm run validate`（validate:structure / validate:math / validate:text）: **成功**（exit 0）
- KaTeX strict で Markdown 284ファイル、生成対象テキスト237件を検証し、エラーなし。
- YAMLフロントマター・全カードID・参照先すべて整合。`prob-mgf-iid-sum`・`prob-pgf-independent-sum`・`prob-mgf-identify-normal`・`prob-mgf-mean-variance` は存在。

## 初回指摘の解消確認

### 【minor C1】解消済み — キュムラント母関数カードの定義式の明示
- 確認内容: `prob-cumulant-mgf` の問題文が「キュムラント母関数 $K_X(t)=\log M_X(t)$ を定義し、その展開 $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ の係数 $\kappa_r$ …」と、定義式 $K_X(t)=\log M_X(t)$ を問題文冒頭で明示し、答えにも $K_X(t)=\log M_X(t)$ を掲載している。題名と一致。
- 独立再計算: 答えの展開 $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$、$\kappa_1=E[X],\kappa_2=\operatorname{Var}(X)$ は、$K_X(0)=\log M_X(0)=\log 1=0$（定数項なし）と整合。正規分布例 $M_X=e^{\mu t+\sigma^2t^2/2}$ より $K_X=\mu t+\sigma^2t^2/2$、$\kappa_1=\mu,\kappa_2=\sigma^2$、$r\ge3$ で $0$ は正しい。
- 結果: 指摘解消。

### 【minor C2】解消済み — 記法・公式の正本への同期登録
- 確認内容: `anki/notation.md` に「特性関数は実変数 $t$ に対し $\varphi_X(t)=E[e^{itX}]=E[\cos(tX)]+iE[\sin(tX)]$」「$\lvert e^{itX}\rvert=1$ より実軸全体で常に存在」「キュムラント母関数は $M_X(t)>0$ の範囲で $K_X(t)=\log M_X(t)$、展開係数 $\kappa_r=K_X^{(r)}(0)$」が登録済み。`anki/formulae.md` に特性関数の定義・独立和の積・代表例（正規・Cauchy）・一意性・キュムラント母関数・加法性が登録済み。カード内容と符号・条件（$M_X(t)>0$）が一致。
- 結果: 指摘解消。

### 【minor C3】解消済み — 「(original)対数の関数の展開係数」の曖昧さ
- 確認内容: original を「$K_X(t)=\log M_X(t)$ を $t=0$ で展開した $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ の係数 $\kappa_r$ を第 $r$ キュムラントとする」と、展開式と係数 $\kappa_r$ の定義を明記して修正。
- 独立再計算: 問題文・答え・使用公式の3箇所が展開式 $K_X(t)=\sum_{r\ge1}\kappa_r t^r/r!$ で一致。
- 結果: 指摘解消。

### 【minor F1】解消済み — 「it置き換えは解析接続として正当」の限定
- 確認内容: `prob-characteristic-function-normal` の注意欄に「$N(\mu,\sigma^2)$ のモーメント母関数は指数部が $t$ の整関数（多項式）なので、$t\mapsto it$ の置き換えはこの場合に解析接続として正当化される。一般の分布では…必ずしも一致しない点に注意」と限定句を補った。
- 独立再計算: 正規 MGF $M(t)=e^{\mu t+\sigma^2t^2/2}$ は複素 $t$ まで整関数として延長でき、$M(it)=e^{i\mu t-\sigma^2t^2/2}=\varphi_X(t)$ で整合。一般分布への無条件拡張をしない明示となっている。
- 結果: 指摘解消。

### 【minor H1】対応確認済み — 対数正規分布の高レベル記述
- 確認内容: `prob-characteristic-nonexistence-mgf` の計算例で「対数正規分布も特性関数は存在する（閉形式は複雑）」と明記し、閉形式が非初等的であることを示した上でコーシー例を主例にしている。カード主旨（MGF不存在でもCFは存在）に散漫を与えない表現となり、維持判断も妥当。
- 独立再計算: コーシー分布 $\operatorname{Cauchy}(0,\gamma)$ の特性関数 $e^{-\gamma\lvert t\rvert}$ は標準公式と一致。対数正規分布のモーメント母関数不存在（正本 `notation.md` に登録）は特性関数存在と矛盾しない。
- 結果: 指摘解消。

### 【minor H2】解消済み — 複素積分の文言
- 確認内容: `prob-characteristic-nonexistence-mgf` の注意欄を「期待値の存在は $\lvert e^{itX}\rvert=1$ により複素積分を必要とせずに保証される」と、主旨（複素積分を回避できる）に合う形へ書き換え。
- 独立再計算: $E[|e^{itX}|]=1<\infty$ だから複素測度論的正当化を要しない、という論理と整合。
- 結果: 指摘解消。

→ 初回6件の minor はすべて解消済み。

## 全文再査読（初回指摘を除く再検証）

### card 1 prob-characteristic-function-definition
$\varphi_X(t)=E[e^{itX}]$、$|e^{itX}|=1$、$\|e^{itX}\|_1=E[1]=1$。$E[\cos(tX)]$・$E[\sin(tX)]$ は有界関数の期待値で有限。Bernoulli 例 $1-p+pe^{it}$ は正しい。実軸全体で絶対収束の記述も正しい。新規指摘なし。

### card 2 prob-characteristic-function-sum
$e^{it\sum X_i}=\prod e^{itX_i}$、独立性から $E[\prod]= \prod E$。全項が実数 $t$ を共有する必要がある点を注意欄に明記し、既存 MGF/PGF の独立和カードと同じ構造であることも明記。Bernoulli 例は二項の特性関数 $(1-p+pe^{it})^n$ に一致。新規指摘なし。

### card 3 prob-characteristic-function-uniqueness
一意性定理「すべての実数 $t$ で $\varphi_X=\varphi_Y$ なら同分布」（Lévy の反転公式に基づく）の主張は正しい。正規特性関数の形 $\exp(i\mu t-\sigma^2t^2/2)$ で同定する例も正しい。原点近傍有限を要求しない利点の記述も正確。新規指摘なし。

### card 4 prob-characteristic-function-normal
導出 $\varphi_X(t)=M_X(it)=e^{i\mu t+\sigma^2(it)^2/2}=e^{i\mu t-\sigma^2t^2/2}$ は正しい。数値例 $X\sim N(2,9)\Rightarrow e^{i2t-9t^2/2}$ も正しい。F1 の解消後も残る内容に新規の行間はない。新規指摘なし。

### card 5 prob-cumulant-mgf
定義域条件 $M_X(t)>0$、$K(0)=\log M(0)=0$、展開 $K(t)=\sum_{r\ge1}\kappa_rt^r/r!$、$\kappa_1=E[X]$、$\kappa_2=\operatorname{Var}(X)$ を独立再導出し正しい。正規例と総合演習との接続（既存 `prob-mgf-mean-variance`）も妥当。新規指摘なし。

### card 6 prob-cumulant-sum
$M_S=M_XM_Y$（正本と一致）に対し $K_S=K_X+K_Y$、加法性 $\kappa_r(S)=\kappa_r(X)+\kappa_r(Y)$。正規の加法再生と整合。新規指摘なし。

### card 7 prob-characteristic-nonexistence-mgf
MGF 不存在（$e^{tX}$ の $t>0$ で発散）と CF 存在（$e^{itX}$ 有界）の対比は正確。Cauchy 例も正しい。新規指摘なし。

## 正本・シラバス・progress 整合

- `anki/progress.yaml` の `ADHOC-20260817-characteristic-cumulant` は `status: revision`、`target.min/max: 7`、新規カード7枚に整合。`review_dir` も本ファイルと一致。
- `anki/syllabus/coverage.yaml` の `math-distribution-functions` に当該7カード ID が登録され、`status: complete`。
- `style-guide.md` の最新化内容に矛盾なし（数式区切り・分布台条件・日本語優先などの規則を満たす）。
- 過去問索引・傾向（`references/*`）との突合で、当該カード群は母関数・特性関数の定義域・一意性・加法性という基礎論点を補強する位置づけであり、以前ない出題構造上の過剰はない。

## 最終判定（2回目）

- fatal: 0
- major: 0
- minor: 0（初回6件の minor はすべて解消済み。全文再査読で新規指摘なし）

## 修正確認

初回指摘の minor C1/C2/C3/F1/H1/H2 はすべて修正済みであり、再査読で解消を確認した。全文再査読でも新規指摘はなかった（fatal: 0 / major: 0 / minor: 0）。

## 最終判定（単一行）

fatal: 0 / major: 0 / minor: 0

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer-26cgf
- final_reviewer_id: independent-math-reviewer-26cgf
- initial_reviewed_at: 2026-08-17T00:20:00.000Z
- final_reviewed_at: 2026-08-17T01:00:00.000Z