initial_reviewer_id: agent-math-C09
final_reviewer_id: agent-math-C09
initial_reviewed_at: 2026-08-19T04:17:40Z
final_reviewed_at: 2026-08-19T05:00:00Z

# C09-model-selection 独立数理査読記録

## 初回指摘（major: 1 / minor: 1）
- major: `ms-aic-formula` — $k=7$ のAICを $208$ と誤記（正しくは $-2(-100)+2\cdot7=214$）。
- minor: `ms-multicollinearity-ridge` — $10^3$ 倍の分散膨張が最小固有値方向であることを明示していなかった。

## 修正確認
- 両指摘とも執筆者が `anki/cards/30_model_selection.md` で修正。再計算により $214$ および最小固有値方向の限定が確認された。

- 査読対象: `anki/cards/30_model_selection.md` の新規21枚
- 査読役: independent-math-reviewer
- 実施日時: 2026-08-19
- 方針: カード本文の説明に依存せず、定義式・数値例を独立に再計算した。数式はKaTeX規約に沿う `$...$` インライン形式で記述されている。Ankiカードであるため、連結演習・答案圧縮・部分点指針の欠如は評価対象外とした。

## 独立計算・確認結果

### checked: ms-overfitting-generalization
- 汎化誤差の定義 $E_{(X,Y)}[L(\widehat f(X),Y)]$ は正しい。
- 計算例の大小関係: 訓練MSE $2.0>0.4>0.01$、テストMSE $2.1>0.9<5.3$。テストMSEは次数3で最小なので、次数3付近を最適とする結論は数値と一致する。
- 1カード1論点（過学習と汎化誤差の関係）、使用公式・定理・計算例完遂を確認。

### checked: ms-train-test-error
- テスト誤差の定義式は正しい。
- 計算例: $0.55>0.48$ なのでモデル2を選ぶ判断は正しい。
- 訓練誤差は選択根拠に使わないという条件分岐も明確である。

### checked: ms-kl-divergence
- 離散・連続KLの定義は正しい。自然対数ならナットという単位の注意も正しい。
- 独立計算: $0.5\log 2+0.5\log(2/3)=0.5\log(4/3)=0.5\cdot0.28768207245=0.14384103623\approx0.144$。
- KLの非対称性・距離でない旨も数学的に正しい。

### checked: ms-kl-nonnegativity
- $\log x\le x-1$（等号は $x=1$ のみ）を正しく使用している。
- 独立再導出: $-D_{\mathrm{KL}}(P\|Q)=E_P[\log\{Q(X)/P(X)\}]\le E_P[Q/P-1]=1-1=0$。したがって $D_{\mathrm{KL}}\ge0$。等号条件から $Q/P=1$ が $P$ 正の確率で成り立ち、$P=Q$。
- 支払い条件の注意は、$D=\infty$ を許す一般定義と整合的であり、数学的誤りではない。

### issue: ms-aic-formula
- severity: major
- 場所: `anki/cards/30_model_selection.md` `## 計算例`
- 根拠: 説明文は「$k=7$ なら $208$」と述べている。
- 独立計算: $-2(-100)+2\cdot7=200+14=214$。
- 修正案: 「$k=7$ なら $208$」を「$k=7$ なら $214$」へ修正する。
- その他: 定義 $\operatorname{AIC}=-2\ell(\widehat\theta)+2k$ は正しく、小さいほど良い。$k=3$ の例は $200+6=206$ で正しい。

### checked: ms-aic-asymptotic-loo
- AICとLOOCVの予測対数尤度評価が、大標本・正則条件下で一致するという主張は標準的な結果である。
- カードは「漸近的に一致」・「正則性」条件を明示しており、無条件の同値と誤っていない。

### checked: ms-bic-formula
- 定義 $\operatorname{BIC}=-2\ell(\widehat\theta)+k\log n$ は正しい。
- 独立計算: $\log200=5.29831736655$、したがって $200+3(5.29831736655)=215.89495209964\approx215.9$。

### checked: ms-bic-consistency
- 真のモデルが候補に含まれる場合、BICの選択一致性は標準定理どおり。
- 無関係母数の追加による $-2\ell$ 改善は $O_p(1)$、ペナルティ差は $(k_2-k_1)\log n\to\infty$ という大小比較は正しい。

### checked: ms-info-criterion-likelihood
- AIC・BICが最大化対数尤度と母数数で比較する旨は正しい。
- 計算例は概念例だが、数値計算を要求する形式ではなく、結論は具体的水準で完結している。

### checked: ms-variable-selection-stepwise
- 前進選択・後退消去・ステップワイズ法の説明は標準的。
- AIC等の基準で改善がないとき停止する手続きの記述は正しい。

### checked: ms-cv-model-selection
- k分割CVの定義式は `anki/formulae.md` と一致する。
- 計算例: $2.1>0.9<1.4$ なので $d=3$ が最小。数値と結論は一致する。

### checked: ms-cv-loo
- LOOCVの定義式は正しい。
- 線形回帰の閉形式 $n^{-1}\sum_i\{(Y_i-\widehat Y_i)/(1-h_{ii})\}^2$ は、Hat行列の対角成分を用いた標準公式で正しい。

### checked: ms-ridge-regression
- Ridge閉形式 $(\boldsymbol X^{\mathsf T}\boldsymbol X+\lambda\boldsymbol I_p)^{-1}\boldsymbol X^{\mathsf T}\boldsymbol Y$ は正しい。
- 計算例: $\begin{pmatrix}1&0.99\\0.99&1\end{pmatrix}+0.1\boldsymbol I=\begin{pmatrix}1.1&0.99\\0.99&1.1\end{pmatrix}$。加算は正しい。

### checked: ms-ridge-shrinkage
- 直交計画では $\widehat{\boldsymbol\beta}_{\mathrm{ridge}}=(\boldsymbol I+\lambda\boldsymbol I)^{-1}\widehat{\boldsymbol\beta}_{\mathrm{LS}}=(1+\lambda)^{-1}\widehat{\boldsymbol\beta}_{\mathrm{LS}}$。
- 独立計算: $3/(1+0.5)=3/1.5=2$。数値は正しい。

### checked: ms-lasso-regression
- LassoのL1ペナルティ付き最小化問題の表現は正しい。
- 大きな $\lambda$ で係数が0になる方向が生じる旨も正しい。

### checked: ms-l1-l2-difference
- L1制約領域は菱形、L2制約領域は球面であり、L1の角で解が軸に一致し係数が0になりうる説明は正しい。

### checked: ms-regularization-bias-variance
- 分解 $\operatorname{Err}=\operatorname{Bias}^2+\operatorname{Var}+\sigma^2$ は期待二乗誤差の標準分解である。
- $\lambda$ 増加によるバイアス増・バリアンス減の方向は正しい。

### checked: ms-lasso-selection
- 真の係数がスパースな場合、適切な $\lambda$ の下での選択性・オラクル性に近い性質という記述は標準的。
- 計算例の添字 $j=2,5$ が0、$j=1,3,4$ が非零という対応は $\beta=(1,0,0,2,0)$ と一致する。

### checked: ms-elastic-net
- Elastic Netの目的関数は `anki/formulae.md` と一致する。
- 独立計算: $\lambda=1,\alpha=0.5$ のとき $\alpha\sum|\beta_j|+(1-\alpha)\frac12\sum\beta_j^2=0.5\sum|\beta_j|+0.25\sum\beta_j^2$。
- $\alpha=0$ でRidge、$\alpha=1$ でLassoに一致することも式から直ちに確認できる。

### issue: ms-multicollinearity-ridge
- severity: minor
- 場所: `anki/cards/30_model_selection.md` `## 計算例`
- 根拠: 「最小二乗法の分散が $10^3$ 倍に膨む」とある。
- 独立計算: 最小固有値 $0.001$ に対応する方向の係数分散は $\sigma^2/0.001=10^3\sigma^2$ であり、この方向については正しい。ただし分散行列全体が一律 $10^3$ 倍になるわけではない。
- 修正案: 「その方向の係数分散は $10^3\sigma^2$」のように方向を明示する。
- その他: $\lambda=0.1$ を加えた後の最小固有値は $0.001+0.1=0.101$ であり「約 $0.1$」で正しい。

### checked: ms-prediction-vs-inference
- 予測では汎化誤差、推測ではバイアス・信頼区間・因果構造を重視する整理は数学的に妥当。
- Lassoの縮小により推測用係数にバイアスが入る旨も正しい。

## 全体確認
- 新規カード数は21枚で、指定対象と一致した。
- 各カードに「使用公式・定理」と「計算例」があり、数値を要する例は最終値まで到達している。ただし `ms-aic-formula` の最終値は誤り。
- AIC、BIC、KL、OLS、L1、L2、Ridge、Lasso、Elastic Net等の略語は日本語名・定義付近の説明と併用されており、略語のみの初出ではない。
- KaTeX数式はインライン `$...$` を用いており、禁止された `\(...\)`、`\[...\]`、`align`、`equation`、`\label`、`\ref`、`\tag` は確認されなかった。
- `anki/notation.md`・`anki/formulae.md` のモデル評価・正則化公式と定義は一致している。

## 機械検証
- コマンド: `npm run anki:validate`
- 実施日時: 2026-08-19
- 結果: 成功（`validated 418 cards (0 warnings)`、配信HTML生成・一致確認も成功）

fatal: 0 / major: 1 / minor: 1

<!-- initial_reviewer_id: agent-math-C09  initial_reviewed_at: 2026-08-19T04:17:40Z  final_reviewer_id: agent-math-C09  final_reviewed_at: 2026-08-19T05:00:00Z -->

---

# 再査読（独立数理）

- 担当: independent-math-reviewer（再査読）
- 実施日時: 2026-08-19
- 対象: `anki/cards/30_model_selection.md` の21枚、`anki/notation.md`、`anki/formulae.md`
- 範囲: 前回指摘2件の解消確認と全カードの数式・数値の独立再計算。Ankiに不要な連結演習・答案圧縮・部分点要件は対象外とする。

## 旧指摘の解消確認

### resolved: ms-aic-formula
- 前回指摘: $k=7$ のAICを $208$ としていた。
- 独立再計算: $\operatorname{AIC}=-2(-100)+2\cdot7=200+14=214$。
- 修正後カードは $214$ と記載しており、$k=3$ の $206$ も $200+6=206$ として正しい。major指摘は解消。

### resolved: ms-multicollinearity-ridge
- 前回指摘: $10^3$ 倍の分散膨張が最小固有値方向であることを明示していなかった。
- 修正後カードは「その最小固有値方向の最小二乗法推定量の分散が $10^3$ 倍に膨む」と記載している。
- 独立再計算: 固有ベクトル $u$ に対し $\operatorname{Var}(u^{\mathsf T}\widehat{\boldsymbol\beta}_{\mathrm{LS}})=\sigma^2u^{\mathsf T}(\boldsymbol X^{\mathsf T}\boldsymbol X)^{-1}u=\sigma^2/10^{-3}=10^3\sigma^2$。$\lambda=0.1$ を加えた後は $1/(10^{-3}+0.1)=1/0.101\approx9.90$ 倍へ抑えられ、当該固有値は $0.101\approx0.1$。minor指摘は解消。

## 全カード再確認（21枚）

- `ms-overfitting-generalization`: 汎化誤差の定義と、訓練誤差減少・テスト誤差U字型の例示は数学的に整合。数値は与えられた例として内部整合する。
- `ms-train-test-error`: $0.55>0.48$ の比較とモデル2の選択は正しい。訓練MSEの説明とも整合。
- `ms-kl-divergence`: 定義式は正しい。独立計算: $0.5\log2+0.5\log(2/3)=0.5\log(4/3)=0.14384103622579\approx0.144$。
- `ms-kl-nonnegativity`: $\log x\le x-1$、$E_P[Q/P]=1$、総和の差 $1-1=0$、符号反転によるKL非負性はすべて正しい。連続分布でも絶対連続性の下で同様に成立する。
- `ms-aic-formula`: 定義と $k=3,7$ の計算 $206,214$ は正しい。
- `ms-aic-asymptotic-loo`: AICとLOOCV予測対数尤度評価の大標本・正則条件下での漸近的一致の主張は標準的で、条件が明示されている。
- `ms-bic-formula`: 定義は正しい。独立計算: $\log200=5.29831736655$、$200+3(5.29831736655)=215.89495209964\approx215.9$。
- `ms-bic-consistency`: 過剰母数の $-2\ell$ 改善が $O_p(1)$、ペナルティ差が $3\log n\to\infty$ となる大小比較は標準定理と整合。
- `ms-info-criterion-likelihood`: 同一標本の最大化対数尤度と母数数に基づく比較の説明は正しい。
- `ms-variable-selection-stepwise`: 前進・後退・ステップワイズの手続き説明は標準的。
- `ms-cv-model-selection`: 定義式は正しく、$2.1,0.9,1.4$ の中で最小 $0.9$ により $d=3$ を選ぶ判断は正しい。
- `ms-cv-loo`: LOOCV定義と $n^{-1}\sum_i\{(Y_i-\widehat Y_i)/(1-h_{ii})\}^2$ の線形回帰閉形式は正しい。$(0.3)^2=0.09$ も正しい。
- `ms-ridge-regression`: Ridge閉形式は正しい。$\begin{pmatrix}1&0.99\\0.99&1\end{pmatrix}+0.1I=\begin{pmatrix}1.1&0.99\\0.99&1.1\end{pmatrix}$ は正しい。
- `ms-ridge-shrinkage`: 直交計画では $(I+\lambda I)^{-1}=(1+\lambda)^{-1}I$。$3/(1+0.5)=2$ は正しい。
- `ms-lasso-regression`: L1ペナルティ付き最小化の定義は正しい。
- `ms-l1-l2-difference`: L1菱形・L2球面の幾何とL1角での係数ゼロの説明は正しい。
- `ms-regularization-bias-variance`: $\operatorname{Err}=\operatorname{Bias}^2+\operatorname{Var}+\sigma^2$ は期待二乗誤差の標準分解。$\lambda$ 増加によるバイアス増・バリアンス減の方向も正しい。
- `ms-lasso-selection`: $\beta=(1,0,0,2,0)$ に対し $j=2,5$ が零、$j=1,3,4$ が非零という対応は正しい。スパース回帰における標準的な選択性・オラクル性の記述も条件付きで妥当。
- `ms-elastic-net`: 定義式は `anki/formulae.md` と一致。$\lambda=1,\alpha=0.5$ のとき $\alpha\sum|\beta_j|+(1-\alpha)\frac12\sum\beta_j^2=0.5\sum|\beta_j|+0.25\sum\beta_j^2$。$\alpha=0$ でRidge、$\alpha=1$ でLassoに一致する。
- `ms-multicollinearity-ridge`: 旧minorは解消済み。$10^3$ 倍の分散膨張は最小固有値方向と限定され、Ridge後の当該固有値 $0.101\approx0.1$ も正しい。
- `ms-prediction-vs-inference`: 予測では汎化誤差、解釈・推測ではバイアスや不偏性・信頼性を重視する整理は数学的に妥当。

## 正本整合

- AIC・BIC・KL・CV・LOOCV・Ridge・Lasso・Elastic Net・バイアス・バリアンスの公式は `anki/formulae.md` の「モデル評価・正則化」と一致する。
- 太字ベクトル・行列、$\boldsymbol X^{\mathsf T}$、$\boldsymbol I_p$、期待値・分散の記法は `anki/notation.md` と整合する。

## 機械検証

- コマンド: `npm run anki:validate`
- 実施日時: 2026-08-19
- 結果: 成功（`validated 418 cards (0 warnings)`、配信HTML生成・一致確認も成功）

fatal: 0 / major: 0 / minor: 0
