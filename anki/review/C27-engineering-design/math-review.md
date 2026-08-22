# C27-engineering-design 独立数理査読

- 担当ID: `/root/c27_math_review`
- 実行日時: 2026-08-22 (Asia/Tokyo)
- initial_reviewer_id: c27_math_review
- initial_reviewed_at: 2026-08-22T22:06:54+09:00
- 対象: `anki/cards/49_engineering_design.md` の新規43枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml`
- 査読方法: 全43枚について、実験単位と反復、コントラストの直交性、$2^k$ 要因効果と平方和、一部実施計画の定義関係・別名・解像度・foldover、ブロック交絡、直交表、乱塊法・ラテン方格、固定効果・変量効果、分散成分、SN比、分割法、不完備ブロック・BIBDを問題設定から独立再計算した。併せて、成立条件、未定義記号、7節テンプレート、公式正本・記法正本・coverageとの同期を確認した。

## 初回結果

- fatal: 0
- major: 2
- minor: 2

## 初回指摘

### major

1. `engdesign-factorial-22-effects`: A、B、AB効果の答え $6,4,2$ 自体は正しいが、「計算例」の「ABが正なのでAの効果はB高水準の方が2だけ大きい」は誤りである。Aの単純効果はB低水準で $14-10=4$、B高水準で $20-12=8$ なので、後者は4だけ大きい。このカードの定義ではAB効果2は単純効果差4の半分であるため、その関係まで式で示すこと。
2. `engdesign-bibd-contrast-variance`、`anki/formulae.md`: BIBDの調整処置差分散を $2k\sigma^2/(rv)$ としているが、正しくは
   $$\operatorname{Var}(\widehat\tau_i-\widehat\tau_j)=\frac{2k\sigma^2}{\lambda v}.$$
   BIBDの情報行列は $C=rI-k^{-1}NN^{\mathsf T}$、$NN^{\mathsf T}=(r-\lambda)I+\lambda J$ なので、対比空間上の固有値は $\lambda v/k$ となる。したがって例の $v=4,k=3,r=3,\lambda=2,\sigma^2=6$ では分散は $36/8=4.5$、標準誤差は $\sqrt{4.5}\approx2.121$ であり、掲載値3と $\sqrt3$ は誤りである。カードの「記号・用語」に $\lambda$ と $\widehat\tau_i-\widehat\tau_j$ の意味も明記し、公式集と同時に訂正すること。

### minor

1. `engdesign-random-intercept-moments`: 「使用公式・定理」で突然 $\tau^2,\sigma^2$ を用いるが、カード内の「記号・用語」では $U_i,\varepsilon_{ij}$ しか定義していない。単独提示されるカードとして、$\tau^2=\operatorname{Var}(U_i)$、$\sigma^2=\operatorname{Var}(\varepsilon_{ij})$ を明記すること。
2. `engdesign-latin-square-treatment-mean`: 公式の $k(i,j)$ がカード内で未定義である。$k(i,j)$ をセル $(i,j)$ に割り付けられた処置記号と定義するか、指示関数を使わず「処置Aが置かれたセルの和を $p$ で割る」と記すこと。

## 再計算で確認した事項

- 全43枚に「問題 → 記号・用語 → 使用公式・定理 → 一手／方針 → 答え → 計算例 → 注意」の7節が各1件存在する。
- コントラスト内積0、$2^2$ 効果 $(6,4,2)$、$2^3$ 主効果5、$SS_A=100$ を再計算した。上記の単純効果差の解釈だけが不一致である。
- $C=AB$ から $I=ABC$、$A=BC,B=AC,C=AB$、解像度IVの別名、foldoverによる奇数次数・偶数次数効果の分離、ABC符号による2ブロック分割を符号表から確認した。
- L4列積 $(+,-,-,+)$、独立反復3・総測定24、完全無作為化の平均差3、乱塊法の差平均3と処置平方和13.5、ラテン方格の自由度配分と処置平均11を再計算し一致した。
- 変量切片模型の全分散25・群内相関0.36、一元変量模型の分散成分推定値 $(\widehat\tau^2,\widehat\sigma^2)=(5,10)$、群内相関 $1/3$ を再計算し一致した。
- L8の使用自由度5・残り2、直交表のA効果5、望小特性SN比 $-10\log_{10}(14/3)\approx-6.69$ dB、入れ子型自由度 $(2,9)$、反復数4倍による標準誤差半減を再計算し一致した。
- 接続行列、BIBDの関係 $vr=bk$ と $\lambda(v-1)=r(k-1)$、接続グラフによる推定可能性を確認した。BIBDの分散だけは上記major 2のとおり不一致である。
- `coverage.yaml` では新規43カードが `engineering-design` に収録され、公式7用語「実験の計画と実施」「固定効果」「変量効果」「交絡因子」「ブロック化」「直交表」「交絡法」へ該当カードIDが対応している。

## 機械検証

- `npm run anki:validate`: 成功。1368 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（374 Markdown files）、本文検証（237 files）がすべて成功。
- 注記: 機械検証はBIBD分散式の分母誤り、数値例の意味上の不一致、カード内の未定義記号を検出しないため、成功だけでは上記指摘を解消扱いにできない。

## 修正後再査読

- 未実施。

## 初回集計

fatal: 0 / major: 2 / minor: 2

## 第1回修正確認

- reviewed_at: 2026-08-22T22:19:00+09:00
- 初回major 1: `engdesign-factorial-22-effects` は重複解消に伴い差し替えられ、誤った単純効果解釈は残っていないことを確認した。
- 初回major 2: `engdesign-bibd-contrast-variance` と `anki/formulae.md` の分散式が $2k\sigma^2/(\lambda v)$ へ訂正され、数値も分散4.5、標準誤差2.121へ修正されたことを確認した。
- 初回minor 1: 対象カードは `engdesign-random-effect-blup` へ差し替えられた。初回minor 2: `engdesign-latin-square-treatment-mean` で $k(i,j)$ が定義されたことを確認した。
- 差し替え16枚を含む全43枚を再査読した。不等反復コントラスト共分散 $\sigma^2/8$、欠測後の列内積 $-1$、純粋誤差平方和6・自由度4、曲率平方和 $216/11$、適合不足平方和12・$F=2.667$、2生成子の定義群、解像度II/III、サブサンプリング分散3.05、乱塊法の相対効率1.6、単一欠測推定値 $80/6$、グレコ・ラテン方格の自由度、BLUP $78/7$、分割法の誤差自由度6・9を独立再計算し、下記残存指摘を除き一致した。

## 第1回修正後再査読

- fatal: 0
- major: 1
- minor: 2

### major

1. `engdesign-bibd-contrast-variance`: 問題は $v=4,k=3,r=3$ だけを与え、公式欄は分散式しか示していないのに、一手／方針で未導出の $\lambda=2$ を代入している。単独カードとして答えを追えるよう、使用公式へ $\lambda(v-1)=r(k-1)$ を再掲し、$\lambda=3(3-1)/(4-1)=2$ を一手または答えで導出してから分散式へ代入すること。

### minor

1. `engdesign-subsampling-variance`: $(\tau^2+\sigma^2/m)/n$ は装置効果同士、測定誤差同士、両成分が無相関で、装置内測定誤差が等分散であることを要する。問題・用語欄にはこの成立条件がなく、与えた2分散だけから公式は導けない。独立な変量切片模型を明示すること。
2. `engdesign-random-effect-blup`: 掲載した縮小係数は $Y_{ij}=\mu+U_i+\varepsilon_{ij}$ の変量切片模型で、$E[U_i]=E[\varepsilon_{ij}]=0$、$U_i$ と誤差が独立、群内誤差が独立同分散、$\mu$ と分散成分を既知としたBLUPである。現状はこの模型・成立条件を示さず、群平均と分散値だけから公式を掲げているため、少なくとも独立な変量切片模型と既知母数の条件を明記すること。

## 第1回修正後の機械検証

- `npm run anki:validate`: 成功。1368 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（376 Markdown files）、本文検証（237 files）がすべて成功。

fatal: 0 / major: 1 / minor: 2

## 第2回修正確認

- `engdesign-bibd-contrast-variance` は問題で $\lambda=2$ を明示し、使用公式へ $\lambda(v-1)=r(k-1)$ を再掲した。分散 $2k\sigma^2/(\lambda v)=4.5$ と標準誤差2.121を再確認した。
- `engdesign-subsampling-variance` は独立な変量切片模型、両成分のゼロ平均・分散を問題へ明記し、$(\tau^2+\sigma^2/m)/n=3.05$ の成立条件が追えるようになった。
- `engdesign-random-effect-blup` は既知の $\mu,\tau^2,\sigma^2$、独立同分散の変量切片模型、両成分のゼロ平均を明記し、縮小係数 $4/7$ と予測群平均 $78/7$ の成立条件が追えるようになった。
- 差し替え4枚を独立再計算した。逆分散重み付きブロック差は $24/7$、推定分散 $4/7$、巡回不完備ブロックは各処置反復2で接続グラフが5角形、変量傾き模型の $x=0,2$ 間共分散は5、Gage R&Rは測定システム分散20・総分散29・分散割合 $20/29$・標準偏差割合 $\sqrt{20/29}$ で、すべて掲載値と一致した。
- 全43枚、`anki/formulae.md`、`anki/notation.md`、`anki/syllabus/coverage.yaml` を再確認し、追加の計算誤り、成立条件欠落、未定義記号、式展開の飛躍、7節欠落、正本・coverage不整合を認めなかった。

## 最終再査読

- final_reviewer_id: c27_math_review
- final_reviewed_at: 2026-08-22T22:21:41+09:00
- fatal: 0
- major: 0
- minor: 0

## 最終機械検証

- `npm run anki:validate`: 成功。1368 cards、0 warnings。配信HTMLのbuild/checkも成功。
- `npm run validate`: 成功。構造検証、KaTeX strict（376 Markdown files）、本文検証（237 files）がすべて成功。

fatal: 0 / major: 0 / minor: 0
