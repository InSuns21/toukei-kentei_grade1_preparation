# 独立数理査読記録：ADHOC-20260817-expectation-covariance

- 対象：`anki/cards/25_moments_inequalities.md`（新規8枚）
- 正本：`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`、`anki/syllabus/coverage.yaml`
- 担当：独立数理査読サブエージェント（数理再計算を独立に実施）

## 確認範囲

新規8枚すべての本文を読み、各数式・定義・不等式を独立に再計算した。

- prob-total-expectation
- prob-total-variance
- prob-conditional-covariance
- prob-covariance-matrix-components
- prob-cauchy-schwarz-correlation
- prob-jensen-inequality
- prob-markov-inequality
- prob-chebyshev-inequality

## 独立再計算・検証

- 全期待値・全分散・条件付き共分散の分解式：符号・添字とも正しい。
  - $E[X]=E[E[X\mid Y]]$
  - $\operatorname{Var}(X)=E[\operatorname{Var}(X\mid Y)]+\operatorname{Var}(E[X\mid Y])$
  - $\operatorname{Cov}(X,Y)=E[\operatorname{Cov}(X,Y\mid Z)]+\operatorname{Cov}(E[X\mid Z],E[Y\mid Z])$
- Cauchy–Schwarzから $\lvert\rho\rvert\le1$：$Var(X),Var(Y)>0$ の下で $\lvert\rho\rvert=1\iff$ 直線関係。導出は正しい。
- Markov（非負条件 $X\ge0$、$a>0$）、Chebyshev（$Y=(X-\mu)^2\ge0$ への適用、$k>0$）の式は正しい。
- Jensenの凸凹の向きと等号条件（退化分布、並びに線形関数の例外）は正しい。
- 計算例（3.8、7、5、2×2共分散行列、$\le20$、$E[X^2]=2\ge1$、$0.2$、$1/4,1/9$）をすべて再計算し一致。

## 記法整合（正本との対比）

- $E[X]$、$\operatorname{Var}(X)$、$\operatorname{Cov}(X,Y)$、$\rho_{X,Y}$、$\boldsymbol\Sigma$、$\boldsymbol X,\boldsymbol a$（太字）は `notation.md` と一致。
- coverage.yaml に8枚すべてが `math-distribution-characteristics` の cards および対応用語（期待値・分散・共分散・相関係数）に登録済み。

## 初回指摘

### minor

1. **prob-total-expectation**（一手の誤字）：`重みて` → `重み付けして`
2. **prob-markov-inequality**（一手の誤字）：`押さる` → `aP(X\ge a) を E[X] で上から押さえる`
3. **prob-cauchy-schwarz-correlation**（答えの精度）：非退化条件 $Var(X),Var(Y)>0$ を併記
4. **prob-total-variance**（一手の表現）：`2つに分ける` → `2つの項に分ける`、分散の有限性 $E[X^2]<\infty$ を明示
5. **prob-jensen-inequality**（等号条件の正確性）：`退化分布に限る` は狭すぎる。$g$ が線形関数なら非退化でも一致する旨を追記

## 初回査読の最終判定

fatal: 0 / major: 0 / minor: 5

## 機械検証（初回査読）

- `npm run validate` 成功（構造・KaTeX strict 278ファイル・テキスト237ファイル）

## 修正確認（メイン担当による修正後）

1. prob-total-expectation：`重み付けして` に修正。→ 解消
2. prob-markov-inequality：「$X\ge0$ の非負性と $a>0$ を確認し、$aP(X\ge a)$ を $E[X]$ で上から押さえる」に修正。→ 解消
3. prob-cauchy-schwarz-correlation：答えに非退化条件を併記。→ 解消
4. prob-total-variance：`2つの項に分ける`、$E[X^2]<\infty$ を明示。→ 解消
5. prob-jensen-inequality：退化分布での成立と線形関数の例外を明記。→ 解消

数式区切り・YAMLフロントマター・KaTeXに新たな問題なし。

## 再査読（独立数理査読による修正確認）

- 上記5件の修正がすべて反映されていることを確認。
- `npm run anki:validate` 成功（308 cards, 0 warnings；7 category pages）。
- `npm run validate` 成功（構造・KaTeX strict 278ファイル・テキスト237ファイル、exit 0）。

## 最終判定（再査読）

fatal: 0 / major: 0 / minor: 0

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer-25moments
- final_reviewer_id: independent-math-reviewer-25moments
- initial_reviewed_at: 2026-08-16T15:20:00.000Z
- final_reviewed_at: 2026-08-16T15:31:30.000Z