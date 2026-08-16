# 独立数理査読記録：ADHOC-20260816-missing-topics-multivariate-transform-relations

- 担当：independent-math-reviewer（独立数理査読サブエージェント）
- 対象：`anki/cards/24_missing_topics.md`（新規11枚）
- 正本：`anki/notation.md`、`anki/formulae.md`、`anki/syllabus/syllabus.yaml`
- 実施日時：2026-08-16（Asia/Tokyo）
- 状態：初回査読（`anki/progress.yaml` の current_work）

## 確認範囲

11枚すべての本文を読み、密度・周辺化・交換可能性・条件付き期待値・畳み込み・ヤコビアン変換・Box–Muller・ポアソン再生性・Gamma-Beta比・ポアソン過程の順序統計量・極限マップを独立に再計算・再導出した。

- dist-bivariate-normal-definition
- dist-bivariate-normal-marginal
- multi-exchangeability
- prob-conditional-expectation
- prob-transform-difference
- prob-transform-product
- prob-transform-box-muller
- dist-poisson-reproductivity
- dist-gamma-beta-relation
- process-poisson-orderstat
- dist-limit-map

Coverage：`anki/syllabus/coverage.yaml` に11枚すべて登録済み（451/494/543-552/586/593/620-621行付近）を確認。

## 独立再計算・検証

- **二変量正規密度**：共分散行列 $\Sigma=\begin{pmatrix}\sigma_1^2&\rho\sigma_1\sigma_2\\\rho\sigma_1\sigma_2&\sigma_2^2\end{pmatrix}$、$|\Sigma|=\sigma_1^2\sigma_2^2(1-\rho^2)$、$\Sigma^{-1}$ の二次形式 $-(\boldsymbol x-\boldsymbol\mu)^{\mathsf T}\Sigma^{-1}(\boldsymbol x-\boldsymbol\mu)/2$ を展開し、カードの指数部と完全一致。パラメータ条件 $\sigma_1,\sigma_2>0$・$|\rho|<1$（正定値性）も正確。$\rho=0$ と独立の同値性（二変量正規に限る）も正しい。
- **周辺分布**：同時密度を一方の変数で積分して $N(\mu_1,\sigma_1^2)$・$N(\mu_2,\sigma_2^2)$。$\rho$ 非依存。正しい。注意の「周辺が正規でも独立とは限らない」も正確。
- **交換可能性**：同時分布の対称性により周辺分布が等しいことを確認。独立同分布 ⇒ 交換可能は真、逆は偽。正しい。
- **条件付き期待値**：$E[Y\mid X=x]=\int y f_{Y\mid X}(y\mid x)dy$。計算例の密度 $f_{Y\mid X}=\frac1x e^{y/x}$ は $\operatorname{Exp}(1/x)$（平均 $x$、$x>0$）と一致。
- **差の分布**：$f_Z(z)=\int f_X(x)f_Y(x-z)dx$。$Z=X+(-Y)$、$f_{-Y}(u)=f_Y(-u)$ で導出。Exp-Exp の例は $\frac{\lambda}{2}e^{-\lambda|z|}$（Laplace）になることを確認。
- **積の分布**：$W=X,\ Z=XY$ の逆変換 $X=W,\ Y=Z/W$。ヤコビ行列式 $\left|\frac{\partial(x,y)}{\partial(w,z)}\right|=1/w$ から $f_Z(z)=\int_0^\infty \frac1w f_X(w)f_Y(z/w)dw$。U(0,1) 例も $f_Z(z)=-\ln z$（$0<z<1$）を再現。
- **Box–Muller**：式 $Z_1=\sqrt{-2\ln U_1}\cos(2\pi U_2)$ ほかを検証。$R^2=Z_1^2+Z_2^2\sim\chi^2_2=\operatorname{Gamma}(1,1/2)$ であり、notation の $\operatorname{Exp}(\mathrm{rate}=1/2)$ と一致。計算例 $U_1=0.1$ で $R=\sqrt{-2\ln0.1}\approx2.146$、$U_2=0.25$ で $\cos(\pi/2)=0$。
- **ポアソン再生性**：$G_{X+Y}=G_XG_Y=\exp\{(\lambda_1+\lambda_2)(s-1)\}$ で一意に決まる。$\lambda$ 加算性も正しい。
- **Gamma–Beta比**：$U=X_1/(X_1+X_2)$、$X_1+X_2\sim\mathrm{Gamma}(\alpha+\beta,\lambda)$。$U\sim\mathrm{Beta}(\alpha,\beta)$（rate 共通 $\lambda$ が不可欠）。Jacobian 導出でも確認。
- **ポアソン過程の順序統計量**：$N(1)=n$ の下で到着時刻は $U(0,1)$ の順序統計量と同分布。$S_{(1)}=\min(U_1,U_2)\sim\mathrm{Beta}(1,2)$ も正確。
- **極限マップ**：二項→Poisson（$np$ 有限）、二項/Poisson→正規（$np(1-p)$ 大）、CLT。計算例 $n=50,p=0.02\to\mathrm{Poisson}(1)$、$n=100,p=0.3\to N(30,21)$。

主要な数式・数値はすべて独立に再現でき、fatal・major に相当する誤りは検出しなかった。

## 記法整合（正本との対比）

- 指数分布 $\operatorname{Exp}(\lambda)$ は rate 表示（notation.md 61行）。`Box–Muller` の $\chi^2_2=\operatorname{Exp}(1/2)$ は rate $1/2$ を意味し、規約自体は整合。
- Γ 分布は shape-rate（notation.md 62行）。$\operatorname{Gamma}(\alpha,\beta)$ の 密度・平均・分散と、Gamma–Beta比の rate 条件は整合。
- Poisson PGF $\exp\{\lambda(s-1)\}$・$E[X]=V[X]=\lambda$（notation 49行）と整合。
- 多変量正規 $\boldsymbol N_p(\boldsymbol\mu,\boldsymbol\Sigma)$ は正定値對称（notation 77行）で、$\rho$ の拘束と整合。
- 畳込み（公式 69行）の $\int f_X(x)f_Y(z-x)dx$ と差の畳込みが整合（符号の相違はカードに明記）。

## 初回指摘

### minor

1. **`prob-transform-product`**（使用公式・一手の誤字）
   - 「使用公式・定理」の `$X=W,\ Y=Z/W$ という変換。$x$ を $w$ と見て、$Z=XW$ の Jacobian は $1/w$」の「$Z=XW$」は「$Z=XY$」の誤り。また「一手」の「$Z/XW$ を置く」も無意味な文字列（「$W=X$、$Z=XY$ と置く」の意図）。
   - 根拠：$\det\partial(x,y)/\partial(w,z)=1/w$ は $Z=XY$ の引数で正当化される。
   - 修正案：「$X=W$、$Y=Z/X$ の変換。ヤコビ行列式 $|\partial(x,y)/\partial(w,z)|=1/w$」（使用公式）、「$W=X$、$Z=XY$ と置く。$Y=Z/X$ のヤコビアン $1/X$」（一手）。
2. **prob-conditional-expectation**（誤字と条件の未明示）
   - 「注意」の「$E[Y]=E[E[Y\mid X]]$ と育って全体の期待値と一致する」の「育って」は誤字（「と得られて」「と導いて」の意図）。
   - 計算例の $f_{Y\mid X}=\frac1x e^{-y/x}$（$y>0$）は $x>0$ のとき正規化され $\operatorname{Exp}(1/x)$ をなす。 $x>0$ の条件を明示すると読者が条件付き密度の正規性を補わなくてすむ。
   - 修正案：「……と得られ、全体の期待値と一致する」とし、計算例に「（$x>0$）」を付記。
3. **multi-exchangeability**（証明の表記と注意の曖昧さ）
   - 証明の `$P(X_1\mid X_2\le\infty)$` という表記は、周辺分布を同時分布で書くときに「もう一方の周辺として $\mathbb{R}$ 全体を取る」ことを明示すれば親切。
   - 注意「逆（同分布だが独立でない）は交換可能と一致しない場合もある」は曖昧。正しくは ①交換可能でも独立とは限らない（計算例の混合はその通り） ②同分布でも交換可能とは限らない、の2点に整理すべき。
   - 修正案：証明では $P(X_1\le a)=\int_A\int_{\mathbb{R}}f_{X_1,X_2}dx_2dx_1$ のように周辺化を明示。注意は「交換可能 ⇒ 同分布は真。逆は成り立たない（同分布でも交換可能とは限らない）」と2点を整理。
（参考）`prob-transform-box-muller` の規約の明示
   - $\chi^2_2=\operatorname{Exp}(1/2)$ は rate 1/2 を意味し notation 準拠なので数学的欠陥ではない。ただし読者に「Exp(1/2) は rate 1/2 の指数分布」と明記すると規約探索が不要になる。また $U_1=0$ または 1 では未定義/退化する端点への注意も任意でよい。
   - 参考（任意改善）であり、件数には含めない。

## 査読メタデータ

- initial_reviewer_id: independent-math-reviewer
- final_reviewer_id: independent-math-reviewer
- initial_reviewed_at: 2026-08-16T13:05:32.000Z
- final_reviewed_at: 2026-08-16T13:40:00.000Z

## 機械検証

- `npm run validate` を実行し、成功を確認（終了時）。詳細は下記の実行出力。


### 実行結果（初回査読）

- コマンド：`npm run validate`
- 結果：成功（`validate:structure`／`validate:math`＝KaTeX strict／`validate:text` すべて成功。Markdown 275ファイル、生成対象テキスト 237件）。
## 修正確認（メイン担当による修正後）

3件のminor指摘に対して、以下の修正を行った。

1. prob-transform-product：使用公式・一手の「$Z=XW$」「$Z/XW$」の誤字を修正し、$W=X$、$Z=XY$、$Y=Z/W$、Jacobian $1/w$ を明示した。
2. prob-conditional-expectation：「と育って」を「と求まり」に修正し、計算例に $x>0$ 条件を明示した。
3. multi-exchangeability：証明文の $X_2\le\infty$ を $X_2\in\mathbb R$ に、注意を「同分布は交換可能を意味しない」「交換可能だが独立でない例」の2点へ整理した。

---

# 再査読（独立数理査読による修正確認）

- 実施日時：2026-08-16（Asia/Tokyo・再査読）
- 担当：初回と同じ independent-math-reviewer
- 対象：`anki/cards/24_missing_topics.md` 全11枚

## 初回指摘3件の解消確認

1. **prob-transform-product（解消）**
   - 使用公式・定理：`$W=X$、$Y=Z/W$ という変換。$X=W$ を第1変数に取り、$Y=Z/W$ の従属関係から Jacobian は $|\partial(x,y)/\partial(w,z)|=1/w$ である。`
   - 一手：`$W=X$、$Z=XY$ と置くと $Y=Z/W$。$Y$ を $Z/W$ へ代入し、Jacobian の絶対値 $1/w$ を掛けて $w$ で積分する。`
   - 誤字 `$Z=XW$`・`$Z/XW$` は消滅。$W=X$・$Z=XY$・$Y=Z/W$・$\lvert\partial(x,y)/\partial(w,z)\rvert=1/w$ が正しく明示され、ヤコビアン法による $f_Z(z)=\int_0^\infty \frac1w f_X(w)f_Y(z/w)dw$ の導出と完全整合。計算例 $f_Z(z)=-\ln z$ も不変。

2. **prob-conditional-expectation**（解消）
   - 「と育って」が「と求まり」に修正。計算例に「$x>0,\ y>0$」が明示され、条件付き密度 $\frac1x e^{-y/x}$ が $\operatorname{Exp}(1/x)$（平均 $x$）であるための母数条件が整った。

3. multi-exchangeability（解消）
   - 証明が `$P(X_1\le a)=P(X_1\le a,\ X_2\in\mathbb R)=P(X_2\le a,\ X_1\in\mathbb R)=P(X_2\le a)$` に変更され、周辺化が $\mathbb R$ 全体で明示された。
   - 注意が「同分布は交換可能を意味しない」「交換可能だが独立でない例も存在する」の2点に整理され、元の曖昧な言い回しが解消された。

## 修正後の全11枚の再確認

- 各カードの数式・導出（二変量正規密度・周辺化、交換可能の証明、条件付き期待値、差・積の変換、Box–Muller、Poisson再生性、Gamma-Beta比、Poisson過程の順序統計量、極限マップ）は初回と同一または正しい変更のみで、数学的誤りなし。
- `process-poisson-orderstat` の一手が「到着件数 $\mathcal N$ を条件付けると…」に更新され、内容・表現とも正しい。
- `dist-limit-map` の注意が「条件ごとの個別判定は異なるカード（近似選択・二項ポアソン条件）を参照する」に更新され、参照先カード `dist-binomial-poisson-conditions` が `anki/cards/19_limit_approximations.md` に実在することを確認。「近似選択」はカードIDでなく概念の列挙と解釈される。
- YAML front matter（`---` 22個＝11カード×2）に破壊なし。ID 11個・重複なし。KaTeX strict で validate 成功。

## 新規の軽微な指摘（修正で生じた構造ノイズ）

1. **`<!-- CARD -->` 区切りの二重化**（minor）
   - 該当：`anki/cards/24_missing_topics.md` の 284-285、311-312、340-341行。
   - 状況：`process-poisson-orderstat`・`dist-limit-map` の本文更新時に、カード区切りが2連続で挿入された。正しくは各1個（計11個）となるべきところ、14個に。
   - 影響：`anki/scripts/lib.mjs` のパース（`split(/^<!-- CARD -->\s*$/m).filter(Boolean)`）は空部分を除去するため、動作に影響なし。`npm run validate`・`npm run anki:validate`（300 cards, 0 warnings）とも成功。
   - 修正案：二重のうち1個を削除し、区切りを11個にそろえる（`284`, `311`, `340` 行のいずれかを維持）。

## 機械検証（再査読）

- `npm run validate` 成功（structure／math＝KaTeX strict 276ファイル／text 237件）。
- `npm run anki:validate` 成功（300 cards, 0 warnings／7 pages, build & check ok）。

---

# 最終確認（区切り正規化の検証）

- 実施日時：2026-08-16（Asia/Tokyo・最終確認）
- 担当：independent-math-reviewer

## 確認内容

1. **区切り11個への正規化（解消）**
   - `<!-- CARD -->` が11個（行33/66/94/128/161/195/229/257/284/310/338）。二重化していた 284-285・311-312・340-341行は解消。
   - 11チャンクすべてで `ids=1 / frontmatter=2 / 開始='---'` を確認。11カード・ID重複なし。
   - `parseCards`（`anki/scripts/lib.mjs`）で11カードすべてが正しく分割・パースされることを直接実行して確認。各カードの front matter とセクション（問題・答え・使用公式・定理・計算例・一手・注意）が正常に抽出される。
2. KaTeX・構造検証
   - `npm run anki:validate`：300 cards / 0 warnings（build & check ok）。
   - `npm run validate`：成功（structure／math＝KaTeX strict 276ファイル／text 237件）。
3. 参考観察（影響なし）
   - 230行目に単独の U+FEFF（BOM）が残るが、これは初回査読時から存在する既存のノイズで今回の修正で生じたものではない。パース（`trim()`がBOMを除去）・`anki:validate`・`validate` のいずれにも影響はなく、数理的・構造的な欠陥ではない。クリーンアップ時に対象にできる参考事項。

## 最終結果（最終確認）

fatal: 0 / major: 0 / minor: 0
