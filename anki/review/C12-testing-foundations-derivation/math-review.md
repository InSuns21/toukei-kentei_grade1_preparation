# C12 独立数理査読

initial_reviewer_id: /root/c12_math_review
initial_reviewed_at: 2026-08-21T00:26:17.4995322+09:00

## 対象

- `anki/cards/34_testing_foundations_derivation.md` の新規53枚
- `anki/formulae.md` の「検定」および信頼区間との双対性に関する項目
- `anki/syllabus/coverage.yaml` の `math-testing-foundations`、`math-test-derivation`

53枚について定義、棄却確率、尤度比、検出力、標本サイズ、漸近分布、数値例を独立に再計算した。coverageには対象53枚が対応する2サブカテゴリーへ収録されており、カードIDの欠落は認めなかった。

## 初回指摘

### major

1. `test-power-normal-one-sided`、`test-sample-size-power-z`、`test-one-two-sided-critical-values`、`test-np-normal-mean`、`test-ump-normal-one-sided`、`test-local-alternative-power`、`test-np-exponential-rate`、および `anki/formulae.md` 130--132行付近で、確率点の添字が正本 `anki/notation.md` と逆転している。正本は $z_\alpha$、$\chi^2_{\nu,\alpha}$ を「上側 $\alpha$ 点」と定義しているため、右片側臨界値は $z_\alpha$、両側臨界値は $z_{\alpha/2}$、標本サイズ式は $(z_\alpha+z_\beta)^2\sigma^2/\delta^2$ でなければならない。指数分布の左片側臨界値は上側点表記なら $\chi^2_{2n,1-\alpha}/(2\lambda_0)$ となる。現状の $z_{1-\alpha}=1.645$、$z_{0.95}=1.645$、$\chi^2_{2n,\alpha}$ を下側点として使う記述は、正本の定義と両立しない。数値結果自体は通常の下側分位点表記として再計算すると正しい。
2. `test-np-lemma-statement` の定理文は「尤度比が大きい標本点から棄却域に入れ、有意水準を満たす検定」だけでは最強力性を保証しない。例えば棄却しない検定もこの文言を満たす。閾値と境界無作為化を選び、サイズを $\alpha$ まで使う（または到達可能な最大サイズにする）条件を定理文に明記する必要がある。`anki/formulae.md` のNeyman--Pearson補題も同じ条件を補うこと。
3. `test-ump-binomial-one-sided` は $c=10$ の検定を「非無作為化UMP検定」と結論しているが、カード群は無作為化検定も許している。$P_{0.3}(X\ge10)\approx0.04796<0.05$ なので、$X=9$ で残余確率だけ無作為化する検定がサイズ0.05となり、全ての $p>0.3$ で現行検定より高い検出力を持つ。したがって現行検定は全検定中のUMPではなく、非無作為化検定にクラスを限定したUMPと明示するか、境界無作為化を含む真のUMP検定を提示する必要がある。
4. `test-power-curve-reading` は $\pi(0)=0.05$ だけから $\sup_{\theta\le0}\pi(\theta)=0.05$ と結論している。問題文が与える3点の値だけでは、$\theta<0$ でより大きい検出力を持たないことは導けない。「$\theta\le0$ で非減少」または「帰無領域で最大値が境界0にある」を条件として追加する必要がある。

### minor

1. `test-null-alternative-definition` は $\Theta_0$ と $\Theta_1$ の互いに素性しか述べない一方、「母数空間を二分する」と説明している。二分を意図するなら $\Theta=\Theta_0\cup\Theta_1$ も明記すること。
2. `test-simple-composite-hypotheses` の「単純仮説は母数値を1点に定める」は、非識別な母数化では一般に正しくない。問題本文と同様に「標本分布を一意に定める仮説」とするのが正確である。
3. 数式コマンドの脱落がある。`test-randomized-boundary` と `test-likelihood-ratio-ordering` の `qquad` は `\qquad`、`test-function-randomized-definition` の `phi(1)` は `\phi(1)` に直すこと。KaTeXは文字の積として解釈するため機械検証を通過するが、数式表示は誤る。
4. `test-glrt-normal-variance-known-mean` は分散母数の範囲 $\tau>0$ を問題文に明記すること。また「正規分布の尤度は」の式で `\tau` のバックスラッシュがタブに化け、`au^{-n/2}` と表示されるため修正すること。

## 独立再計算メモ

- 無作為化境界は $\gamma=(0.05\times1024-11)/45=0.89333\ldots$。
- 二項分布 $n=20,p=0.3$ では $P(X\ge10)=0.0479619\ldots$、$P(X\ge9)=0.113331\ldots$。
- ベルヌーイ例 $n=100,x=60$ は Wald $Z^2=4.1667$、Score $Z^2=4$、LR $-2\log\Lambda=4.0271$。
- $P_{0.7}\{\operatorname{Binomial}(10,0.7)\ge8\}=0.382783\ldots$。
- $\chi^2_2$ の上側確率は $P(\chi^2_2\ge7)=e^{-3.5}=0.030197\ldots$。
- 上記以外の検出力、尤度比、Wilks自由度、Bonferroni上界、FWERの数値例に計算上の誤りは認めなかった。

## 機械検証

- `npm run anki:validate`: 成功（613 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 312 Markdown files、テキスト、2026-08-21）
- 機械検証は上記の意味上の誤りおよび、KaTeXが変数列として受理するコマンド脱落を検出しなかった。

## 初回集計

fatal: 0 / major: 4 / minor: 4

## 修正後再査読

final_reviewer_id: /root/c12_math_review
final_reviewed_at: 2026-08-21T00:33:57.6424162+09:00

対象53枚、`anki/formulae.md` のC12関連項目、`anki/syllabus/coverage.yaml` の2サブカテゴリーを同じ担当が再査読した。

### 修正確認

- 初回major 1（上側確率点）: 解消。正規検定は $z_\alpha,z_{\alpha/2},z_\beta$、指数分布の左尾は $\chi^2_{2n,1-\alpha}$ に統一され、正本と一致する。検出力式と標本サイズ式も再計算して一致した。
- 初回major 2（Neyman--Pearson補題）: 一部解消。無作為化を許す本来の補題について、閾値・境界無作為化・サイズ $\alpha$ の条件は追記された。ただし、非無作為化への拡張に下記の残存majorがある。
- 初回major 3（二項UMP）: 一部解消。$X=9$ での無作為化確率 $\gamma=0.03118\ldots$ は正しく、サイズ0.05となる。ただし、カード前半の非無作為化検定に対するUMP主張が残っている。
- 初回major 4（検出力曲線）: 解消。$\theta$ に関する非減少条件が問題文に追加され、帰無領域での上限が境界0となる。
- 初回minor 1（仮説空間）: 解消。$\Theta=\Theta_0\cup\Theta_1$ が追加された。
- 初回minor 2（単純仮説）: 解消。「標本分布を一意に定める」へ修正された。
- 初回minor 3（数式コマンド）: 解消。`\qquad` と `\phi(1)` の綴りを確認した。
- 初回minor 4（分散母数）: 解消。$\tau>0$ と正しい `\tau` が記載された。

### 残存指摘

#### major

1. `test-np-lemma-statement` の「離散性によりサイズ $\alpha$ が到達不能な非無作為化検定に限定する場合は、到達可能な最大サイズを使う」は一般にはNeyman--Pearson補題から従わない。非無作為化検定の選択は0--1型の組合せ問題になり、サイズを最大にするだけでは対立仮説下の検出力最大化を保証しない。この一文を削除し、補題の主張を境界無作為化を許す検定に限定する必要がある。
2. `test-ump-binomial-one-sided` の答えは、まず $X\ge c$、$P_{0.3}(X\ge c)\le\alpha$ を満たす最小整数 $c$ と定義し、直後に「この右片側検定は…UMP」としている。しかし $c=10$ の非無作為化検定は、後段で正しく構成した $X=9$ の境界無作為化検定に全ての $p>0.3$ で劣るため、無作為化を許す全検定中のUMPではない。答え・定理欄を最初から「$X>c$ で棄却し、$X=c$ で確率 $\gamma$ により棄却してサイズ $\alpha$」という検定関数で定義し、非無作為化の $c=10$ は限定クラスでの結論として分離する必要がある。

### 再検証

- `npm run anki:validate`: 成功（613 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 314 Markdown files、テキスト、2026-08-21）
- coverageには対象53枚が引き続き漏れなく登録されている。

## 最終集計（第1回再査読）

fatal: 0 / major: 2 / minor: 0

## 第2回修正後再査読

- `test-np-lemma-statement`: 不正確だった非無作為化検定への拡張は削除された。尤度比順序、閾値、境界無作為化によってサイズを $\alpha$ にする検定として記述され、Neyman--Pearson補題の条件と結論が一致する。
- `test-ump-binomial-one-sided`: 答えと定理欄は
  $$P_{0.3}(X>c)+\gamma P_{0.3}(X=c)=\alpha$$
  を満たす境界無作為化検定へ統一された。$\alpha=0.05$ では $c=9$、$P_{0.3}(X\ge10)=0.0479619\ldots$、$P_{0.3}(X=9)=0.0653691\ldots$ から
  $$\gamma=\frac{0.05-0.0479619\ldots}{0.0653691\ldots}=0.03118\ldots$$
  となり、サイズは厳密に0.05である。非無作為化検定の $c=10$ は限定クラスの結論として分離され、UMP主張との矛盾は解消した。
- 対象53枚を通して再確認し、初回指摘8件および第1回再査読の残存2件は全て解消した。`anki/formulae.md` の検定公式と `anki/notation.md` の上側確率点記法は一致し、coverageの対象53枚にも欠落・誤所属はない。

### 最終機械検証

- `npm run anki:validate`: 成功（613 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 314 Markdown files、テキスト、2026-08-21）

## 最終集計

fatal: 0 / major: 0 / minor: 0

## 最終表記修正後の確認

- `test-ump-binomial-one-sided` の末尾は「非無作為化検定に限定する場合の棄却域は $\{X\ge10\}$」へ変更された。境界無作為化版の規約 $X>c$ と $X=c$（この数値例では $c=9$）と、非無作為化版の棄却域表記が混同されない。
- $P_{0.3}(X\ge10)=0.0479619\ldots$、$P_{0.3}(X=9)=0.0653691\ldots$、$\gamma=0.03118\ldots$ を再確認した。無作為化版のサイズは0.05、非無作為化版のサイズは約0.04796である。
- 対象53枚、`anki/formulae.md`、coverageを最終変更後に確認し、新たな数理・表記上の指摘はない。
- `npm run anki:validate`: 成功（613 cards、0 warnings、2026-08-21）
- `npm run validate`: 成功（構造、KaTeX strict 314 Markdown files、テキスト、2026-08-21）

最終結果: fatal: 0 / major: 0 / minor: 0
