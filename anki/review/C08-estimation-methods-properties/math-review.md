# 独立数理査読記録

- initial_reviewer_id: independent-math-reviewer-C08
- final_reviewer_id: independent-math-reviewer-C08
- initial_reviewed_at: 2026-08-18T16:30:00Z
- final_reviewed_at: 2026-08-18T17:10:00Z
- 担当ID: independent-math-reviewer-C08
- 作業: C08-estimation-methods-properties（各種推定法・点推定量の性質）
- 対象: anki/cards/29_estimation_properties.md（新規カード43枚）と、同一サブカテゴリーを共有する anki/cards/03_estimation.md（既存カード、うち est-bias-variance が math-point-estimator-properties に属する）
- 査読日時: 2026-08-19

## 検証の要点

- 不偏性・一致性・平均二乗誤差(MSE)分解・相対効率
- モーメント法・プラグイン推定量・最小二乗法/BLUE/Gauss--Markov・正規方程式
- Rao--Blackwell・UMVU・Lehmann--Scheffé・完備十分統計量・指数型分布族
- スコア関数の期待値0・フィッシャー情報量（両形・加法性・Bernoulli/Poisson/指数/正規）
- Cramér--Rao下界・等号条件・有効推定量・漸近効率
- MLE漸近正規性・母数変換の情報量・正規(2母数)の情報行列

全43枚の定理・計算例を独立に再計算した。大部分は正しい。以下、指摘を記す。

## 指摘

### major
- major-1（est-crlb-exponential）: 指数分布のCRLBカードで、標本平均 $\overline X$ の分散と Gamma 分布のパラメータ化が誤っている。
  - カードはrateパラメータ表示 $X_i\sim\operatorname{Exp}(\lambda)$（密度 $f(x)=\lambda e^{-\lambda x}$、平均 $\mu=1/\lambda$）を冒頭で宣言している。rate表示では $\operatorname{Var}(X_1)=1/\lambda^2$ であるから $\operatorname{Var}(\overline X)=\operatorname{Var}(X_1)/n=1/(n\lambda^2)$ となり、カードの「$\operatorname{Var}(\overline X)=\lambda^2/n$」は誤り。$\lambda^2/n$ は $\lambda$ 自身のCRLB $1/I_n(\lambda)=1/(n/\lambda^2)=\lambda^2/n$ であって、$\mu=1/\lambda$ の推定量 $\overline X$ の分散ではない。
  - さらに「$\overline X$ の分布は $\operatorname{Gamma}(n,1/\lambda)$」も誤り。$\sum_iX_i\sim\operatorname{Gamma}(n,\lambda)$（rate $=\lambda$）であり、$\overline X=\sum_iX_i/n\sim\operatorname{Gamma}(n,n\lambda)$（rate $=n\lambda$）となる。$\operatorname{Gamma}(n,1/\lambda)$ は「スケール $=\lambda$（平均 $=\lambda$）」表示の下での和 $\sum_iX_i$ の分布であり、rate表示の $\overline X$ と混同している。
  - 独立再計算: $I_1(\lambda)=1/\lambda^2$、$I_n(\lambda)=n/\lambda^2$。$\mu=1/\lambda$ に対して $g(\lambda)=1/\lambda$、$g'(\lambda)=-1/\lambda^2$ だから CRLB for $\mu = (g')^2/I_n(\lambda)=(1/\lambda^4)/(n/\lambda^2)=1/(n\lambda^2)$。$\operatorname{Var}(\overline X)=1/(n\lambda^2)$ がこの下界に一致する。つまり「$\overline X$ が $\mu$ の有効推定量」という結論自体は正しいが、表示した分散値 $\lambda^2/n$ と Gamma 分布 $1/\lambda$ は rate表示と矛盾する（rate表示では分散 $1/(n\lambda^2)$、$\operatorname{Gamma}(n,n\lambda)$）。
  - 修正案: 「$\overline X$ は $\mu=1/\lambda$ の有効推定量（$\operatorname{Var}(\overline X)=1/(n\lambda^2)$）。$\lambda$ 自身の下界は $\lambda^2/n$ で、$1/\overline X$ で推定（バイアスあり）」とし、計算例を「$\sum_iX_i\sim\operatorname{Gamma}(n,\lambda)$ より $\overline X\sim\operatorname{Gamma}(n,n\lambda)$ で $\operatorname{Var}(\overline X)=n/(n\lambda)^2=1/(n\lambda^2)$、CRLBと一致」に改めるか、またはスケール表示（平均 $=\lambda$）に統一して記載を整合させる。

### minor
- minor-1（est-mle-fisher-information）: 使用公式・定理の文言「スコア方程式 $\sum_i U(X_i;\theta)=0$ の周りでのTaylor展開と中心極限定理から導かれる」は、実際にはMLE $\widehat\theta$ の周り（真値 $\theta$ の近傍）でのスコア方程式 $0=\sum_iU(X_i;\widehat\theta)$ のTaylor展開と、スコアのCLTから導出される。「スコア方程式の周りでTaylor展開」という言い回しは不正確。数式・結論自体の誤りではないため minor とした。
  - 修正案: 「スコア方程式 $\sum_i U(X_i;\widehat\theta)=0$ を真値 $\theta$ の周りで1次Taylor展開し、$n^{-1/2}\sum_iU(X_i;\theta)\xrightarrow{d}N(0,I_1(\theta))$ と $-(1/n)\sum_iU'(X_i;\theta)\xrightarrow{p}I_1(\theta)$ を用いる」のように置き換える。

- minor-2（est-sufficiency-completeness）: 「自然母数空間が開集合を内部に持つとき」という日本語は不自然かつ条件の記述として簡潔さに欠ける。指数型分布族で $T=\sum_iT(X_i)$ が完備十分となるのは「自然母数空間に内点（空でない開集合）が存在する」ときであり、内容は正しいが言い回しを整えると紛れがなくなる。
  - 修正案: 「自然母数空間が $k$ 次元で空でない開集合を内部に含むとき、$T=\sum_iT(X_i)$ は完備十分統計量である」のように言い換える。内容の変更は不要。

- minor-3（est-relative-efficiency）: 効率の定義 $\operatorname{eff}(T_1,T_2)=\operatorname{Var}_\theta(T_2)/\operatorname{Var}_\theta(T_1)$ と「効率が $>1$ なら $T_1$ が優れる」の対応は正しいが、どちらを分母に取るかで大小が逆転するため、分母指定（$T_1$＝基準となる推定量）を明記すると読者の誤読を防げる。数式の誤りではない。
  - 修正案: 「$\operatorname{eff}(T_1,T_2)=\operatorname{Var}(T_2)/\operatorname{Var}(T_1)$（基準 $T_1$ を分母に取る）で、$>1$ なら分子の $T_2$ の分散が大きく、$T_1$ が優れる」のように分母を明示する。

## 再計算で正しさを確認した主な項目

- バイアス・バリアンス分解（交差項0）、MSE＝分散＋バイアス²
- 相対効率例 $T_1=\overline X$、$T_2=X_1$ で $\operatorname{eff}=n>1$
- モーメント法（正規2母数、一様 $U(0,\theta)$ で $\widehat\theta_{MM}=2\overline X$）
- 正規方程式 $\widehat\beta=(X^TX)^{-1}X^T\mathbf y$、導関数 $-2X^T(\mathbf y-X\beta)$、Gauss--Markov／BLUEの仮定
- Rao--Blackwell、Lehmann--Scheffé、完備十分統計量と指数型分布族の完備性
- スコア期待値0、$I_1(\theta)=E[U^2]=-E[\partial^2\log f/\partial\theta^2]$
- $I_1(p)=1/[p(1-p)]$、$I_1(\lambda)=1/\lambda$（Poisson）、$I_1(\lambda)=1/\lambda^2$（Exp rate）、$I_1(\mu)=1/\sigma^2$（正規・$\sigma^2$既知）
- 加法性 $I_n(\theta)=nI_1(\theta)$
- Cramér--Rao $\operatorname{Var}(T)\ge(g')^2/I_n(\theta)$、等号条件 $T-g(\theta)=a(\theta)U(\theta)$、Bernoulli 例
- 有効推定量、漸近効率、$\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,1/I_1(\theta))$、Poisson/Bernoulli例
- 母数変換 $I(\eta)=I(\theta)(d\theta/d\eta)^2$（$N(\theta,1)$、$\eta=2\theta$ で $I(\eta)=1/4$）
- 正規2母数の情報行列 $\begin{pmatrix}1/\sigma^2&0\\0&1/(2\sigma^4)\end{pmatrix}$、非対角0
- MSE比較 $\widehat\sigma^2=\frac1n\sum(X_i-\overline X)^2$ と $S^2$：$(2n-1)/n^2<2/(n-1)$（$n>1$）、$n=10$ で $0.19$ vs $0.222$
- 一致推定量（標本平均、母分散MLE）、「不偏⇒一致」反例（$T=X_1$、レンジ中点）
- 非線形変換で不偏性が崩れる（Jensen）、二乗損失で最良は事後平均

## 検証結果

- `npm run validate`: 実行し、成功（exit code 0）を確認した。`validate:structure`（教材構造・依存関係・進捗メタデータ）、`validate:math`（296 Markdown を KaTeX strict で検証、禁止形 LaTeX を含む）、`validate:text`（237 生成対象テキスト）のすべてが成功した。

---

## 再査読記録（修正確認）

- 担当ID: independent-math-reviewer-C08（再査読）
- 再査読日時: 2026-08-19
- 対象: 初回指摘 major-1 / minor-1 / minor-2 / minor-3 に対する修正の確認。加えて anki/cards/29_estimation_properties.md 全体を再確認した。
- 初回指摘は全件、修正確認済みであり、独立再計算で解消を確認した。

### major-1（est-crlb-exponential）: 解消
- 修正後は、rate表示（$f(x)=\lambda e^{-\lambda x}$、平均 $\mu=1/\lambda$）を明記し、$\mu$ のCRLBを $g(\lambda)=1/\lambda$、$g'(\lambda)=-1/\lambda^2$ から $\operatorname{Var}(T)\ge(1/\lambda^4)/(n/\lambda^2)=1/(n\lambda^2)$ と正しく導いている。
- 独立再計算: $I_1(\lambda)=1/\lambda^2$、$I_n(\lambda)=n/\lambda^2$。$\operatorname{Var}(\overline X)=n/(n\lambda)^2=1/(n\lambda^2)$ がCRLBと一致するので、$\overline X$ は $\mu$ の有効推定量（正しい）。
- 誤っていた $\lambda^2/n$ を $\overline X$ の分散としていた記述は改められ、$\lambda^2/n$ は $\lambda$ 自身の下界である旨が明示された。
- Gamma分布のパラメータ化も修正され、$\sum_iX_i\sim\operatorname{Gamma}(n,\lambda)$（rate）、$\overline X\sim\operatorname{Gamma}(n,n\lambda)$ と正しい。$\lambda$ は $1/\overline X$ で推定（バイアスあり）も正しい。

### minor-1（est-mle-fisher-information）: 解消
- 修正後は「$\widehat\theta$ がスコア方程式 $\sum_iU(X_i;\widehat\theta)=0$ を満たすことを使い、左辺を真値 $\theta$ の周りで1次Taylor展開」と記述されている。
- さらにスコアのCLT $n^{-1/2}\sum_iU(X_i;\theta)\xrightarrow{d}N(0,I_1(\theta))$ と $-(1/n)\sum_iU'(X_i;\theta)\xrightarrow{p}I_1(\theta)$ から漸近分散 $1/I_1(\theta)$ を得る旨が明記され、導出の行間が正しく埋められた。漸近分布 $\sqrt n(\widehat\theta-\theta)\xrightarrow{d}N(0,1/I_1(\theta))$ も正しい。

### minor-2（est-sufficiency-completeness）: 解消
- 修正後は「自然母数空間が空でない開集合（内点）を含むとき、$T=\sum_iT(X_i)$ は完備十分統計量になる」と正しい条件が明記された。
- 指数型分布族の完備性の定理（自然母数空間に内点が存在）に整合する。題意・結論に変更なし。

### minor-3（est-relative-efficiency）: 解消
- 修正後は「基準 $T_1$ を分母に取る分散の比」と明記され、$\operatorname{eff}(T_1,T_2)=\operatorname{Var}(T_2)/\operatorname{Var}(T_1)$、値が $>1$ なら分母 $T_1$ が優れることが明示された。
- 例 $T_1=\overline X$、$T_2=X_1$ で $\operatorname{eff}=n>1$ も正しい。分母の指定が明確になり誤読の余地がなくなった。

### 全対象の再確認
- 修正の影響で他カードの数式・結論が壊れていないことを、対象カード群全体で確認した。MSE分解、Fisher情報量の各計算、CRLB等式条件、情報行列、Gauss--Markov/BLUE、正規方程式、モーメント法、一様分布のCRLB関連に新たな数学的誤りは確認されなかった。

### 検証
- `npm run validate` を再実行し、成功（exit code 0）を確認した（詳細は下記）。

### 再査読の結論
- 初回指摘（major-1 / minor-1 / minor-2 / minor-3）は全て解消・対応済み。
- fatal: 0 / major: 0 / minor: 0

## 検証追記（再査読時）

- `npm run validate` 成功: `validate:structure`（教材構造・依存関係・進捗メタデータ）、`validate:math`（296 Markdown を KaTeX strict で検証）、`validate:text`（237 生成対象テキスト）のすべてが exit code 0 で成功。

## 結論

fatal: 0 / major: 0 / minor: 0