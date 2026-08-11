# P3-03 独立数理査読

## 実行情報

- 担当ID: `/root/f0_math_review`
- 初回査読日時: 2026-08-10T01:51:27+09:00
- 査読種別: 初回独立数理査読
- 対象: `00_overview.md`〜`08_exam_drill.md`、`chapter.yaml`、`glossary.yaml`、全14演習の問題・詳細解答・完成形本番答案・採点基準、P3M-DRILL-01
- 方法: 他の査読結果を根拠にせず、定義・定理・例・全演習・全答案・ドリルを独立に再計算した。

## 独立再計算と照合

- 共分散行列について、対称性と $\boldsymbol a^{\mathsf T}\Sigma\boldsymbol a=\operatorname{Var}(\boldsymbol a^{\mathsf T}\boldsymbol X)\geq0$ を確認した。特異共分散を許す多変量正規の定義と、正定値の場合だけLebesgue密度を持つという区別は正しい。
- アフィン変換の平均 $A\boldsymbol\mu+\boldsymbol b$、共分散 $A\Sigma A^{\mathsf T}$、多変量正規MGF、周辺分布を再導出した。
- ブロック条件付き公式の次元を確認した。$\Sigma_{12}:p\times q$、$\Sigma_{22}^{-1}:q\times q$、条件付き平均は $p\times1$、Schur補は $p\times p$ である。
- 偏相関について、残差共分散・残差分散と精度行列の $-\omega_{ij}/\sqrt{\omega_{ii}\omega_{jj}}$ を独立に再導出した。
- 白色化 $L^{-1}(\boldsymbol X-\boldsymbol\mu)$ とMahalanobis二次形式を再計算し、$\chi_p^2$、平均 $p$、分散 $2p$ の結論を確認した。
- P3M-A01〜A04、P3M-B01〜B04、P3M-C01〜C05、P3M-D01を再計算した。数値結果はすべて一致した。特にC02の先頭主座小行列式は $4,11,10$、条件付き平均は $(2,2)^{\mathsf T}$、条件付き共分散は $\operatorname{diag}(2,5/2)$、C03の偏相関は0、C04の二次形式の平均・分散は $p,2p$ である。
- P3M-DRILL-01は $W\sim N(1,9)$、$Y\mid(X=3)\sim N(3,8)$、条件付き確率 $1/2$、観測値での二次形式 $Q=1$ を確認した。
- 問題・解答はA 4問、B 4問、C 5問、D 1問の計14問で一対一に対応し、`chapter.yaml` の件数とも一致する。

## 初回指摘

### P3M-MATH-001

- severity: major
- 場所: `03_theorems.md` P3M-THM-03「多変量正規の条件付き分布」
- 指摘: 本章の中心公式である条件付き平均・条件付き共分散と、Schur補が正定値であることを結論だけで提示し、定理本文に導出がない。P3M-D01の詳細解答には残差法による導出があるが、基本定理を読む時点ではその後の発展問題の解答を参照しない限り、公式と正定値性を読者が補完する構成になっている。
- 根拠・独立計算: $B=\Sigma_{12}\Sigma_{22}^{-1}$、$\boldsymbol R=\boldsymbol X_1-\boldsymbol\mu_1-B(\boldsymbol X_2-\boldsymbol\mu_2)$ と置けば
  $$
  \operatorname{Cov}(\boldsymbol R,\boldsymbol X_2)
  =\Sigma_{12}-B\Sigma_{22}=0,
  $$
  $$
  \operatorname{Cov}(\boldsymbol R)
  =\Sigma_{11}-\Sigma_{12}\Sigma_{22}^{-1}\Sigma_{21}.
  $$
  アフィン変換により $(\boldsymbol R,\boldsymbol X_2)$ はjointly normalで、交差共分散0から独立であるため条件付き公式が従う。また任意の $\boldsymbol u\neq\boldsymbol0$ に対し
  $$
  \begin{pmatrix}\boldsymbol u\\-\Sigma_{22}^{-1}\Sigma_{21}\boldsymbol u\end{pmatrix}^{\mathsf T}
  \Sigma
  \begin{pmatrix}\boldsymbol u\\-\Sigma_{22}^{-1}\Sigma_{21}\boldsymbol u\end{pmatrix}
  =\boldsymbol u^{\mathsf T}\Sigma_{1\mid2}\boldsymbol u>0
  $$
  なのでSchur補は正定値である。
- 修正案: 上の残差法をP3M-THM-03直下に逐行で追加し、交差共分散0、joint normal、独立、条件付き平行移動の順に公式を導く。Schur補の正定値性も上のブロックベクトルによる二次形式で証明する。D01はこの導出を自力で再現する発展演習として位置付ければよい。

### P3M-MATH-002

- severity: major
- 場所: `06_exercises.md` P3M-C02 (1)、`07_solutions.md` P3M-C02詳細解答・本番答案
- 指摘: Sylvesterの判定法を使うよう問題が要求し、解答も「先頭主座小行列式が全て正だから正定値」としているが、本章本文にも前提章F0-01にも同判定法の定理・適用条件が導入されていない。未修の同値条件を中心的なLevel C答案で根拠なく使わせている。
- 根拠: 実対称行列に対するSylvesterの判定法は「正定値であること」と「すべての先頭主座小行列式が正であること」の同値であり、単なる行列式計算だけではこの含意は得られない。対象行列の先頭主座小行列式 $4,11,10$ は正しく計算されているが、判定定理が教材内にない。
- 修正案: P3M-THM-01付近またはF0-01に、実対称行列に対するSylvesterの判定法を仮定とともに導入し、なぜ正定値性を結論できるかを示す。あるいはC02を直接二次形式または $LDL^{\mathsf T}$ 分解で正定値性を証明する問題へ変更する。

### P3M-MATH-003

- severity: minor
- 場所: `02_definitions.md` P3M-DEF-03 多変量正規密度の正規化
- 指摘: $LL^{\mathsf T}=\Sigma$を満たす「可逆な$L$」だけを選んだ後、Jacobianを $d\boldsymbol x=|L|d\boldsymbol z=|\Sigma|^{1/2}d\boldsymbol z$ としている。$|L|$を通常どおり行列式と読むと、任意の平方根因子では負になり得る一方、変数変換のJacobianは $|\det L|$ でなければならない。
- 根拠・反例: $\Sigma=I_p$でも $L=\operatorname{diag}(-1,1,\ldots,1)$ は $LL^{\mathsf T}=I_p$を満たすが、$\det L=-1$である。Lebesgue体積要素は負にならず、正しい関係は $d\boldsymbol x=|\det L|d\boldsymbol z=(\det\Sigma)^{1/2}d\boldsymbol z$ である。
- 修正案: $L$を正の対角を持つCholesky因子または対称正定値平方根に限定するか、Jacobianを明示的に $|\det L|$ と書く。行列式の記号も $\det\Sigma$ にすると絶対値との混同を避けられる。

### P3M-MATH-004

- severity: minor
- 場所: `07_solutions.md` P3M-C04詳細解答・本番答案
- 指摘: 二次形式の分散を求める主要計算で、標準正規の四次モーメント $E[Z_i^4]=3$ を導出・参照せずに使用している。本章はカイ二乗分布の詳細を後続S1-01へ送っているため、詳細解答だけではこの値を再現できない。
- 根拠・独立計算: P3-02で得た標準正規MGF $M_Z(t)=e^{t^2/2}$ を4回微分して $M_Z^{(4)}(0)=3$、または積分漸化式から $E[Z^4]=3E[Z^2]=3$ と得る。従って $\operatorname{Var}(Z_i^2)=3-1=2$、独立和の分散は $2p$ となる。
- 修正案: 詳細解答にMGF微分または正規積分の漸化式を1〜2行追加して $E[Z_i^4]=3$ を導く。本番答案は圧縮形のままでよい。

## 機械検証

- 実行日時: 2026-08-10T01:52:25+09:00（査読記録作成後の最終実行）
- コマンド: `npm run validate`
- 結果: 成功（structure、KaTeX strict: 122 Markdown files、text: 134 generated files）。

## 初回最終件数

- fatal: 0
- major: 2
- minor: 2
- 判定: **未承認**。全指摘の修正後に同一担当による全文再査読が必要である。

## 修正後再査読（第1回）

- 担当ID: `/root/f0_math_review`
- 再査読日時: 2026-08-10T01:57:02+09:00
- 対象: `00_overview.md`〜`08_exam_drill.md`、`chapter.yaml`、`glossary.yaml`、全14演習の問題・詳細解答・完成形本番答案・採点基準、P3M-DRILL-01
- 方法: 初回指摘箇所に限定せず章全文を再読し、全定義・定理・例・演習・答案・ドリルを独立再計算した。

### 初回指摘の解消確認

- P3M-MATH-001: **解消**。P3M-THM-03に、$B=\Sigma_{12}\Sigma_{22}^{-1}$ と独立残差 $\boldsymbol R$ を用いる証明が追加された。交差共分散0、joint normal、独立性、残差共分散、条件付き平行移動の順で公式を追跡できる。Schur補の正定値性も、$\boldsymbol v=(\boldsymbol a^{\mathsf T},-\boldsymbol a^{\mathsf T}\Sigma_{12}\Sigma_{22}^{-1})^{\mathsf T}$ に相当するブロックベクトルを全共分散の二次形式へ代入して証明されている。
- P3M-MATH-002: **解消**。P3M-C02は未導入のSylvester判定法を使わず、具体的な二次形式を
  $$
  4\left(u+\frac v4+\frac w2\right)^2
  +\frac{11}{4}\left(v+\frac{2w}{11}\right)^2
  +\frac{10}{11}w^2
  $$
  へ平方完成する問題・詳細解答・本番答案へ統一された。展開すると元の $4u^2+2uv+4uw+3v^2+2vw+2w^2$ に戻り、非零ベクトルでは正となる。
- P3M-MATH-003: **解消**。変数変換の体積要素が $d\boldsymbol x=|\det L|d\boldsymbol z=|\det\boldsymbol\Sigma|^{1/2}d\boldsymbol z$ と明記され、任意の可逆因子 $L$ に対して正しいJacobianとなった。
- P3M-MATH-004: **解消**。P3M-C04詳細解答に、標準正規MGF $M_Z(t)=e^{t^2/2}$ の4階微分から $E[Z_i^4]=M_Z^{(4)}(0)=3$ を得る根拠が追加され、$\operatorname{Var}(Z_i^2)=2$、独立和の分散 $2p$ まで接続された。

### 全文再計算結果

- 特異共分散を許す多変量正規の定義と正定値の場合の密度、密度正規化、MGF、アフィン変換、周辺分布を再確認し、新規指摘はない。
- 条件付き正規公式、ブロック次元、Schur補、無相関と独立、偏相関の残差・精度行列公式、白色化とMahalanobis二次形式を再導出し、新規指摘はない。
- P3M-A01〜A04、P3M-B01〜B04、P3M-C01〜C05、P3M-D01、およびP3M-DRILL-01を再計算した。数値・論理・条件・詳細答案と本番答案の対応に新規指摘はない。C05の反例も共分散0と非独立を同じ答案内で検証できる形に補強されている。
- 問題IDと解答IDはA 4問、B 4問、C 5問、D 1問の計14問で一対一に対応し、`chapter.yaml` の件数とも一致する。

## 機械検証（修正後再査読）

- 実行日時: 2026-08-10T01:57:02+09:00
- コマンド: `npm run validate`
- 結果: 成功（structure、KaTeX strict: 123 Markdown files、text: 135 generated files）。

## 修正後最終件数

- fatal: 0
- major: 0
- minor: 0
- 判定: **承認**。

## 過去問傾向対応改訂の修正後再査読

- 担当ID: `/root/f0_math_review`
- 再査読日時: 2026-08-11T10:18:58+09:00
- 対象: 横断索引、章全文、P3M-DRILL-01
- 確認結果: 周辺・差の分布、条件付き正規、尾確率、Mahalanobis二次形式を再計算し、全数値と前提は整合する。参照課題・横断索引にも新規不整合はない。
- 新規指摘: なし。
- 機械検証: `npm run validate` 成功（structure、KaTeX strict 146 Markdown、text 161ファイル）。
- 最終件数: `fatal: 0 / major: 0 / minor: 0`
- 判定: **承認**。

## 過去問傾向対応改訂の再査読

- 担当ID: `/root/f0_math_review`
- 実行日時: 2026-08-11T10:03:22+09:00
- 対象: 横断参照2ファイル、`chapter.yaml`、`09_past_exam_practice.md`、P3M-DRILL-01
- 独立再計算: 周辺分布、$\rho=1/3$、$Y-X\sim N(1,9)$、$Y\mid X=3\sim N(3,8)$、条件付き尾確率 $1/2$、$\Sigma^{-1}$、観測点でのMahalanobis値 $Q=1$ を確認した。技能対応と必要前提も章内で閉じている。
- 新規指摘: なし。
- 機械検証: `npm run validate` 成功（structure成功、KaTeX strict 146 Markdown、text 161ファイル）。
- 最終件数: `fatal: 0 / major: 0 / minor: 0`
- 判定: **承認**。
