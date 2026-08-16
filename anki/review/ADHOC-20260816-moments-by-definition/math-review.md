# 独立数理査読記録：ADHOC-20260816-moments-by-definition（定義からのモーメント導出）

- 担当：independent-math-reviewer（独立数理査読サブエージェント）
- 対象：`anki/cards/23_moments_by_definition.md`（新規5枚）
- 正本：`anki/notation.md`、`anki/formulae.md`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：初回査読

## 確認範囲

5枚すべての本文を読み、各分布の平均・分散を確率質量関数／密度の定義から独立に再計算した。

## 重要要件の確認（定義から導出・MGF/公式非依存）

- `dist-poisson-moments-by-definition`：PMFからΣ k·p(k) と Σ k(k-1)p(k) を直接計算。k/k!=1/(k-1)! と指数級数 e^λ のみ。MGF不使用。○
- `dist-hypergeometric-moments-by-definition`：PMFから Σ x·pmf を直接計算。x C(K,x)=K C(K-1,x-1) と Vandermonde 恒等式を使用。MGF不使用。○
- `dist-gamma-moments-by-definition`：密度の積分 ∫x^r f(x)dx を直接計算。Γ(α+1)=αΓ(α) を使用。MGF不使用。○
- `dist-beta-moments-by-definition`：密度の積分を B(a+r,b)/B(a,b) に帰着。B(a,b)=Γ(a)Γ(b)/Γ(a+b) を使用。MGF不使用。○
- `dist-lognormal-moments-by-definition`：E[e^{rY}]=∫e^{ry}f_Y(y)dy を平方完成で直接積分。MGF表記・既知公式を使わず積分を直接実行。○

結論：5枚とも要件（MGF・公式非依存、定義からの直接計算）を満たす。

## 独立再計算での確認

- ポアソン：E[X]=λ、E[X(X-1)]=λ²、Var=λ。
- 超幾何：E[X]=nK/N。（Vandermonde は x-1 と n-x の和が N-1 と n-1 で成立）
- ガンマ：E[X]=α/β、E[X²]=α(α+1)/β²、Var=α/β²。
- ベータ：E[X]=a/(a+b)、E[X²]=a(a+1)/((a+b)(a+b+1))、Var=ab/((a+b)²(a+b+1))。
- 対数正規：平方完成の定数項 -μ²/(2σ²)+rμ+r²σ²/2 の展開を確認し、E[e^{rY}]=e^{rμ+r²σ²/2}、Var=(e^{σ²}-1)e^{2μ+σ²} を確認。

## 初回指摘

### minor

1. **`dist-beta-moments-by-definition`**（計算例）：Var の通分（E[X²]-E[X]² の分数計算）が1行で省略されている。分母を (a+b)²(a+b+1) に揃える中間を明示する。
2. **`dist-gamma-moments-by-definition`**（計算例）：E[X²] の導出が「同様に」で済まされ、u=βx の置換が E[X] と同一であることが明示されていない。置換を明記する。
3. **`dist-hypergeometric-moments-by-definition`**（使用公式）：Vandermonde の恒等式の Σ の index 範囲（x=1..n）が `Σ_x` と不記載。`Σ_{x=1}^{n}` と明示する。

## 修正確認（メイン担当による修正後）

3件のminor指摘に対して、以下の修正を行った。

1. Beta の Var 通分：分母 $(a+b)^2(a+b+1)$ に揃える中間式を計算例に明示した。
2. Gamma の E[X²] 導出：$u=\beta x$ の置換を明記し、$\int_0^\infty x^{\alpha+1}e^{-\beta x}dx$ の形を明示した。
3. 超幾何の Vandermonde：$\sum_{x=1}^{n}$ と index 範囲を明示した。

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer
- final_reviewer_id: independent-math-reviewer
- initial_reviewed_at: 2026-08-16T12:04:40.000Z
- final_reviewed_at: 2026-08-16T12:40:00.000Z

## 機械検証

- `npm run validate` を実行し、成功を確認（structure／math=KaTeX strict／text）。

## 最終結果（初回）

fatal: 0 / major: 0 / minor: 3
---

# 再査読（修正確認）：ADHOC-20260816-moments-by-definition

- 実施日時：2026-08-16（Asia/Tokyo・再査読）
- 担当：初回と同じ independent-math-reviewer
- 対象：`anki/cards/23_moments_by_definition.md` 全5枚（再確認）

## 修正1：dist-beta-moments-by-definition（解消）

修正後計算例は分母 $(a+b)^2(a+b+1)$ に揃えた中間式を明示：
$$\operatorname{Var}(X)=\frac{a(a+1)(a+b)}{(a+b)^2(a+b+1)}-\frac{a^2(a+b+1)}{(a+b)^2(a+b+1)}=\frac{ab}{(a+b)^2(a+b+1)}.$$

独立確認：分子 $a(a+1)(a+b)-a^2(a+b+1)=a[(a+1)(a+b)-a(a+b+1)]=a[(a+b)-a]=ab$ となり、$\dfrac{ab}{(a+b)^2(a+b+1)}$ を得る。数値例（$a=2,b=3$）で $0.04$ と一致する。通分の暗算が不要になり、指摘1は解消。

## 修正2：dist-gamma-moments-by-definition（解消）

修正後は $u=\beta x$ と置いて
$$E[X^2]=\frac{\beta^\alpha}{\Gamma(\alpha)}\int_0^\infty x^{\alpha+1}e^{-\beta x}dx=\frac{\beta^\alpha}{\Gamma(\alpha)}\frac{\Gamma(\alpha+2)}{\beta^{\alpha+2}}=\frac{\alpha(\alpha+1)}{\beta^2}$$
と明示。

独立確認：$du=\beta dx$ の置換で $\int_0^\infty x^{\alpha+1}e^{-\beta x}dx=\Gamma(\alpha+2)/\beta^{\alpha+2}$。$\Gamma(\alpha+2)=(\alpha+1)\alpha\Gamma(\alpha)$。よって $E[X^2]=\alpha(\alpha+1)/\beta^2$。置換・ガンマ積分への帰着の行間が埋まり、指摘2は解消。

## 修正3：dist-hypergeometric-moments-by-definition（解消）

修正後は $\sum_{x=1}^{n}\binom{K-1}{x-1}\binom{N-K}{n-x}=\binom{N-1}{n-1}$ と index 範囲を明示。$x=1..n$ で $x-1=0..n-1$ に対応し、$x\binom Kx=K\binom{K-1}{x-1}$（$x\ge1$）と併せて成立。計算例の $\sum_{x=1}^{n}$ とも整合。指摘3は解消。

## 全5枚の再確認（定義からの導出・MGF/公式非依存）

- ポアソン：PMFの級数を直接計算（$k/k!=1/(k-1)!$ と $e^{\lambda}$ 級数のみ）。MGF・PGF不使用。既存カード `dist-poisson-moments` は注意欄で「別の経路」と明記。
- 超幾何：PMFから直接、組合わせ恒等式のみ。既存カード `dist-hypergeometric-moments` は「分散・有限母集団補正は既存カードで扱う」という役割分担の言及のみで、導出の代用なし。
- ガンマ：密度の積分から直接（ガンマ積分・$\Gamma(\alpha+1)=\alpha\Gamma(\alpha)$ のみ）。既存カード `dist-gamma-moments` は「公式提示の既存カードとは異なる」と明記。
- ベータ：密度の積分を $B(a+r,b)/B(a,b)$ に帰着し、$B$ の $\Gamma$ 表示のみ。既存カード `dist-beta-moments` は「補完」と明記。
- 対数正規：$E[e^{rY}]$ を密度積分の平方完成で直接計算。注意欄に「モーメント母関数を使わず」のまま。

いずれも MGF や既知の平均・分散公式の丸写しではなく、定義からの直接導出が保たれている。修正で MGF 依存や公式依存に変わった箇所はない。

## 修正による新たな問題の有無

- ID 5個・重複なし。カード区切り `<!-- CARD -->` 5個。coverage 登録（`anki/syllabus/coverage.yaml` 449/450/478/492/538-540/573/579/590 行付近）を確認。
- 注意欄が参照する既存カード `dist-poisson-moments`、`dist-hypergeometric-moments`、`dist-gamma-moments`、`dist-beta-moments` が `anki/cards/20_discrete_continuous_distributions.md` に実在することを確認。
- 導出結果（平均・分散）は修正前と同一で変更なし。台・母数条件（ポアソン $\lambda>0$、ガンマ $\alpha,\beta>0$、ベータ $a,b>0$・$0<x<1$、対数正規母 $\sigma>0$）に変更なし。
- 新たな数式・数値エラー、NaN、行間の発生なし。

## 機械検証（再査読）

- `npm run validate` を再実行し、成功を確認（structure／math＝KaTeX strict／text すべて成功）。

## 最終結果（再査読）

fatal: 0 / major: 0 / minor: 0
