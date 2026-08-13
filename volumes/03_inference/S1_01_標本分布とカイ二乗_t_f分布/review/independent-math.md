# S1-01 独立数理査読

- 担当ID: `/root/s101_math_review`
- 実行モデル: `gpt-5.6-sol`（リポジトリ既定）
- 初回査読日時: 2026-08-13T22:04:42+09:00
- 対象: `00_overview.md` から `09_past_exam_practice.md`、`chapter.yaml`、`glossary.yaml`、全14問・全解答、`S1-DRILL-01`
- 前提照合: P3-02、P4-02、記号・スタイル・公式範囲・過去問索引

## 独立再計算

### 正規標本の直交分解

$\boldsymbol Z=((X_1-\mu)/\sigma,\ldots,(X_n-\mu)/\sigma)^{\mathsf T}$ とし、第一行が $\boldsymbol e^{\mathsf T}=n^{-1/2}(1,\ldots,1)$ である直交行列 $\boldsymbol A$ を取る。$\boldsymbol W=\boldsymbol A\boldsymbol Z$ と置けば
$$
\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n),
\qquad
W_1=\boldsymbol e^{\mathsf T}\boldsymbol Z
=\frac{\sqrt n(\overline X-\mu)}{\sigma}.
$$
直交変換は長さを保ち、$\boldsymbol e\boldsymbol e^{\mathsf T}$ が平均方向への射影なので
$$
\begin{aligned}
\frac1{\sigma^2}\sum_{i=1}^n(X_i-\overline X)^2
&=\left\|(\boldsymbol I_n-\boldsymbol e\boldsymbol e^{\mathsf T})\boldsymbol Z\right\|^2\\
&=\sum_{j=2}^nW_j^2
\sim\chi^2_{n-1}.
\end{aligned}
$$
$W_1$ と $(W_2,\ldots,W_n)$ は独立だから、$\overline X$ と $S^2$ も独立である。したがって
$$
\frac{\sqrt n(\overline X-\mu)}S
=\frac{W_1}{\sqrt{\sum_{j=2}^nW_j^2/(n-1)}}
\sim t_{n-1}.
$$
本文の分布・自由度・独立性の結論自体はこの独立計算と一致する。

### 密度・台・分位点

カイ二乗密度は $Q\sim\operatorname{Gamma}(\nu/2,1/2)$ から
$$
\int_0^\infty
\frac{q^{\nu/2-1}e^{-q/2}}{2^{\nu/2}\Gamma(\nu/2)}\,dq=1,
\qquad E[Q]=\nu,\quad\operatorname{Var}(Q)=2\nu
$$
である。掲載されたt密度の係数と指数も生成表現 $Z/\sqrt{Q/\nu}$ から得るものと一致する。

F分布の未掲載の密度は、$w>0$ で
$$
f_W(w)=
\frac{\Gamma((\nu_1+\nu_2)/2)}
{\Gamma(\nu_1/2)\Gamma(\nu_2/2)}
\left(\frac{\nu_1}{\nu_2}\right)^{\nu_1/2}
w^{\nu_1/2-1}
\left(1+\frac{\nu_1}{\nu_2}w\right)^{-(\nu_1+\nu_2)/2}.
$$
また $W^{-1}\sim F_{\nu_2,\nu_1}$ なので、上側分位点規約の下で
$$
P(W\leq F_{\nu_1,\nu_2;\alpha})=1-\alpha,
\qquad
P\left(W<\frac1{F_{\nu_2,\nu_1;\alpha}}\right)=\alpha.
$$
標本分散では
$$
P\left(S^2>
\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)=\alpha.
$$

### 全14問と数値

| ID | 独立計算で確認した結論 |
|---|---|
| S1-A01 | $E[Q]=6$、$\operatorname{Var}(Q)=12$。 |
| S1-A02 | $\overline X\sim N(3,1/4)$。 |
| S1-A03 | $\sqrt9(\overline X-\mu)/S\sim t_8$。 |
| S1-A04 | $W^{-1}\sim F_{12,5}$。 |
| S1-B01 | 交差項は $2(\overline X-\mu)\sum_i(X_i-\overline X)=0$。 |
| S1-B02 | $11S^2/9\sim\chi^2_{11}$、区間は $22/3\leq Q\leq44/3$。 |
| S1-B03 | 観測t値は1、自由度24。 |
| S1-B04 | $S_1^2/S_2^2\sim F_{9,15}$、観測比は $8/5=1.6$。 |
| S1-C01 | $\overline X\sim N(\mu,\sigma^2/n)$、残差自由度 $n-1$、$(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$、平均と分散は独立。 |
| S1-C02 | $Q\sim\chi^2_9$、閾値13.5、$E[S^2]=16$、$\operatorname{Var}(S^2)=512/9$、不偏。 |
| S1-C03 | $Z\sim N(0,1)$ と $Q\sim\chi^2_{n-1}$ は独立、$T\sim t_{n-1}$。数値は2、自由度15。 |
| S1-C04 | 標準化分散比は $F_{n_1-1,n_2-1}$、等分散時は未調整比、逆比は自由度も逆転。 |
| S1-C05 | 補集合、逆数、不等号、自由度逆転は正しい。標本分散の分位点式は上記のとおり。 |
| S1-D01 | 射影行列の階数 $n-1$、直交正規成分の独立、t・F生成表現はいずれも正しい。 |

### S1-DRILL-01

独立再計算すると
$$
\overline X\sim N(\mu,\sigma^2/10),\quad
Q_X\sim\chi^2_9,\quad
T\sim t_9,
$$
$$
Q_Y=15S_Y^2/\sigma_Y^2\sim\chi^2_{15},\qquad
R=\frac{Q_X/9}{Q_Y/15}\sim F_{9,15}.
$$
等分散時の観測比は $12/8=1.5$、逆比は $2/3$、逆比の分布は $F_{15,9}$ である。詳細解答と完成形本番答案の数式・数値は一致する。

## 初回指摘

### major

1. `chapter.yaml` の `prerequisites` — 中心証明は多変量正規ベクトル $N_n(\boldsymbol0,\boldsymbol I_n)$、直交変換後の正規性、無相関な正規成分の独立性に依存するが、前提はP3-02とP4-02だけである。P3-02は一変量連続分布、P4-02は極限定理であり、この道具を導入しない。多変量正規分布の章P3-03を前提へ追加するか、本章内で必要な命題を定義・証明する。
2. `03_theorems.md` S1-THM-02、`07_solutions.md` S1-C01・S1-D01、`08_exam_drill.md` 小問2 — 「直交行列で座標を取り直すと」「直交射影成分なので独立」と結論へ飛び、直交行列、変換後ベクトルの分布、残差平方和が第2成分以降の平方和になる等式、独立性を与える共分散計算がない。章の中心証明を読者が再現できない。上の独立再計算の $\boldsymbol A,\boldsymbol W$ とノルム等式を本文・詳細解答へ入れ、D01では射影行列の対称性・べき等性・階数も計算する。
3. `07_solutions.md` の「完成形本番答案と採点」— C01--C05・D01の本番答案が答案本文ではなく「何を書くか」のチェックリストである。特にC01/D01は射影・独立性の得点根拠、C05は分位点式がなく、詳細解答との式単位の一致を検証できない。各小問について、採点に必要な式・根拠・結論を実際の完成答案として掲載し、詳細解答と一対一で照合できる形にする。

### minor

1. `02_definitions.md` S1-DEF-03・04 — $\nu,\nu_1,\nu_2$ の許容範囲が各定義に明記されず、F分布には確率密度関数もない。少なくとも本章の生成表現なら正整数であることを明記し、上記のF密度と正規化根拠を追加する。
2. `03_theorems.md` と `06_exercises.md` 冒頭 — 定理で使うt・カイ二乗・F分布の台・母数・密度を同じ節に置かず、演習でも「定義節の生成表現に従う」と別ファイル探索を要求する。定理冒頭と問題集冒頭に、少なくとも母数・台・密度（または問題に必要な生成表現を含む完全な定義表）を再掲する。
3. `03_theorems.md` S1-THM-04 と `06_exercises.md` S1-C04 — 不偏標本分散と自由度を使うのに $n_1,n_2\geq2$ が明記されていない。この標本数条件を問題・定理の仮定へ追加する。
4. `07_solutions.md` S1-C05(4) — 設問は上側分位点を標本分散へ適用する流れだが、解答は任意の $s^2$ に対する標準化で止まり、分位点を代入した結論を示さない。$P(S^2>\sigma^2\chi^2_{n-1;\alpha}/(n-1))=\alpha$ と、その補集合を明記する。

## 初回機械検証

- 実行日時: 2026-08-13T22:04:42+09:00
- `npm run validate`: 成功（構造・依存関係・進捗メタデータ成功、KaTeX strict 211 Markdown、本文検査236ファイル）
- 機械検証成功は、上記の前提依存・証明の行間・答案欠落を否定しない。

## 初回判定

`fatal: 0 / major: 3 / minor: 4`（未承認）

修正後は同一担当が指摘箇所だけでなく対象全文、全14問・全解答、S1-DRILL-01を再査読する。

## 修正後最終全文再査読

- 再査読日時: 2026-08-13T22:21:21+09:00
- 担当ID: `/root/s101_math_review`（初回と同一担当）
- 再査読範囲: 修正箇所だけでなく `00_overview.md`--`09_past_exam_practice.md`、`chapter.yaml`、`glossary.yaml`、全14問・全詳細解答、C/D完成形本番答案、S1-DRILL-01、前提章・過去問索引

### 初回指摘の解消確認

1. `chapter.yaml` は多変量正規分布の章P3-03を前提へ追加し、射影・直交変換・無相関正規成分の独立性への依存が明示された。
2. S1-THM-02は $\boldsymbol e=n^{-1/2}\boldsymbol1$、第一行が $\boldsymbol e^{\mathsf T}$ の直交行列 $\boldsymbol A$、$\boldsymbol W=\boldsymbol A\boldsymbol Z$ を導入した。$\boldsymbol W\sim N_n(\boldsymbol0,\boldsymbol I_n)$、残差ノルム $\sum_{j=2}^nW_j^2$、成分独立から $\overline X\perp S^2$ まで逐次接続され、中心証明を再現できる。
3. S1-C01--C05・S1-D01には実際の完成形本番答案が追加された。C01とD01は $\boldsymbol e,\boldsymbol Z,\boldsymbol A,\boldsymbol W$ を答案内で定義し、詳細解答の分布・自由度・独立性と一致する。
4. t・F分布の自由度範囲とF密度が定義節へ追加された。定理、演習、30分ドリルにも正規・カイ二乗・t・F分布の母数・台・密度または必要な生成表現が近接して置かれた。F密度はBeta積分から得る独立計算と一致する。
5. 二標本定理とS1-C04は $n_1,n_2\geq2$ を明記した。
6. S1-C05は
$$
P\left(S^2>\frac{\sigma^2}{n-1}\chi^2_{n-1;\alpha}\right)=\alpha
$$
を詳細解答と本番答案に示し、F分布の補集合と自由度を逆にした下側 $\alpha$ 点も一致した。
7. C02の上側点16.92、C03の両側境界2.131、C04とドリルのF上側点2.59への比較が追加された。閾値13.5、$\operatorname{Var}(S^2)=512/9$、t値2、分散比3、逆比 $1/3$ を再計算し、問題・詳細解答・本番答案で一致した。

### 全問再計算の最終確認

- S1-A01--A04、S1-B01--B04の平均・分散・標本平均分布・平方和分解・t値・F逆数は初回独立計算と一致する。
- S1-C01--C05は射影、自由度、独立性、カイ二乗・t・F生成表現、分位点、数値境界を全小問で再照合し、新規不整合はない。
- S1-D01は平均射影と残差射影、階数 $n-1$、独立性、t生成表現、独立二標本のF生成表現を再計算し、詳細解答・完成形答案と一致する。
- S1-DRILL-01は $Q_X\sim\chi^2_9$、$T\sim t_9$、$Q_Y\sim\chi^2_{15}$、$R\sim F_{9,15}$、観測比3、逆比 $1/3\sim F_{15,9}$ を再計算し、全5小問、救済式、詳細解答、完成形答案が一致する。
- 全14問題IDと解答IDは一対一であり、台・母数・標本数条件、詳細解答と本番答案の結論に残存指摘はない。

### 最終機械検証

- 実行日時: 2026-08-13T22:21:21+09:00
- `npm run validate`: 成功（構造・依存関係・進捗メタデータ成功、KaTeX strict 212 Markdown、本文検査237ファイル）

## 最終判定

`fatal: 0 / major: 0 / minor: 0`（承認）
