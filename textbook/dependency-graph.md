# 依存関係

通常カリキュラムの機械可読な正本は `curriculum.yaml` の各章の `prerequisites` です。

```text
F0-00（統計検定1級のための数学速習）
  -> P1（確率） -> P2（分布） -> P3（多変量・変数変換）
  -> P3-04（混合分布・潜在変数）
  -> P4（変数変換・極限定理・経験分布・乱数生成） -> S1（標本分布・有限母集団）
  -> I1（点推定） -> I2（漸近推測・区間推定） -> I3（検定）
  -> I4（Bayes推定・欠測・不完全データ）
  -> L1（回帰・線形モデル） -> L2（分散分析・一般化線形モデル）
  -> E1（多変量） / E2（確率過程・時系列） / E3（実験計画） / E4（品質・信頼性）
```

F0-01は通常教材章として廃止済み。試験対策の前提数学はF0-00へ集約し、F0-00修了後はP1-01へ直接進む。

`status: supplementary` の補講は通常カリキュラムの進捗集計に含めない。各補講の機械可読な局所前提は各 `chapter.yaml` の `prerequisites` を正本とする。

---

## 発展補講：F0-00から関数解析・RKHSまで

```text
F0-00
  ↓
F0-00A  集合・写像・上限下限
  ↓
F0-00A2 選択公理・Zorn・極大原理
  ↓
F0-00B  距離・開閉集合・収束
  ↓
F0-00C  連続・コンパクト・最大最小
  ↓
F0-00D  Cauchy列・完備性・無限次元
  ↓
F0-00D2 測度・可測関数・Lebesgue積分・Lp
  ↓
F0-00E  ベクトル空間・基底・Gram--Schmidt・射影
  ↓
F0-00E2 Cauchy--Schwarz・Bessel・Parseval
  ↓
F0-00F  線形写像・スペクトル定理・SVD
  ↓
F0-00G  凸集合・凸関数・凸最適化
  ↓
F0-02 → F0-02A → F0-02B
  ↓
F0-02C1 Banach / Hilbert
  ↓
F0-02C2 双対空間・Riesz
  ↓
F0-02C3 Frechet微分・作用素・随伴
  ↓
F0-02C4 凸解析・normal cone
  ↓
F0-02C5 一般化KKT・制約想定
  ↓
F0-02C6 Hahn--Banach・分離
  ↓
F0-02C7 RKHS・representer theorem・kernel SVM
```

A2はC6のHahn--Banach標準証明で使うZornの補題を先に導入する。D2はC1で使う $L^2$・a.e.同値類・可測関数を未定義語にしないための橋である。C7はSVMの必要事項を再掲するためE1-04を完全通読の必須前提にはしない。

読者向けの全体分岐は `F0_00R_基礎論ロードマップ/index.md`、関数解析系列の入口は `F0_02C_関数解析_制約想定_RKHS/index.md` とする。

---

## 完全基礎論（DREAM THEATER）ルート

Lebesgue測度そのものの建設まで追う場合だけ、D2の直後に挿入する。

```text
F0-00A2
   │
F0-00D2
  ↓
F0-00D3 外測度・Caratheodory可測性
  ↓
F0-00D4 Lebesgue測度・Borel集合・Caratheodory拡張定理
  ↓
F0-00D5 Vitali集合・非可測集合・選択公理
  ↓
F0-00Eへ復帰
```

D3〜D5は関数解析・RKHSの必須前提にはしない。標準通読ルートへ不要な深掘りを逆流させない。

---

## 確率論「それどこから来た？」系列

```text
F0-00D2
  ↓
F0-00P1  確率空間・確率変数・分布
  ↓
F0-00P2  密度・期待値・Radon--Nikodym
  ↓
F0-00P3  独立・積測度・条件付き期待値
  ↓
F0-00P4  収束・Borel--Cantelli・一様可積分性
  ↓
F0-00P5  大数の強法則
  ↓
F0-00P6  特性関数・Levy連続性定理・中心極限定理
  ↓
F0-00P7  統計モデル・尤度・正則性条件
```

この系列では、確率変数を可測写像、分布を押し出し測度、pdfをRadon--Nikodym密度、期待値をLebesgue積分、条件付き期待値を部分sigma代数へのRadon--Nikodym構成として戻す。有限分散版強大数則は最大不等式から証明し、CLTは特性関数で導く。

D3〜D5はこの系列にも必須ではない。

---

## Encore II：Fourier Analysis & Differential Equations

Fourier解析・微分方程式は通常カリキュラム、RKHS系列、確率論系列の必須前提にはしない。

```text
F0-00F / F0-00D2 / F0-00E2 / F0-02C1
  ↓
F0-00H1   常微分方程式・線形系・行列指数
  ↓
F0-00FA1  Fourier級数・直交展開
  ↓
F0-00FA2  Fourier変換・畳み込み・反転
  ↓
F0-00FA3  Plancherel・L2 Fourier変換・特性関数
  ↓
F0-00PDE1 熱方程式・Gaussian heat kernel
  ↓
F0-00PDE2 波動方程式・Laplace方程式・変数分離
  ↓
F0-00PDE3 Sturm--Liouville・自己共役性・スペクトル展開
```

H1ではPDEをFourier変換した後に残る時間ODEを準備する。FA1〜FA3ではFourier級数をHilbert空間の直交展開として導入し、Fourier変換・畳み込み・微分作用素・Plancherelへ進む。PDE1〜PDE3では古典解・Fourier法・固有関数展開まで扱う。

読者向け入口は `F0_00R2_EncoreII_Fourier解析_微分方程式/index.md` とする。

---

## Encore III：Distributions, Sobolev Spaces & Weak Solutions

Encore IIの古典PDEから、低正則性の解と変分法へ進む任意の発展系列。通常カリキュラムへ必須依存を追加しない。

```text
F0-00D2 / F0-02C1 / F0-02C2 / F0-00PDE3
  ↓
F0-00DS1  Schwartz超関数・テスト関数・Dirac delta
  ↓
F0-00DS2  超関数微分・弱微分
  ↓
F0-00SOB1 Sobolev空間 W^{k,p}・H^k
  ↓
F0-00SOB2 H_0^1・Poincare不等式・trace
  ↓
F0-00WK1  弱形式・変分形式・Poisson方程式
  ↓
F0-00WK2  Lax--Milgram・弱解の存在一意性
  ↓
F0-00WK3  楕円型PDE・Galerkin法・有限要素法への橋
```

DS1では確率分布との混同を避けてSchwartz超関数と呼び、テスト関数上の連続線形汎関数として定義する。DS2では部分積分を双対化して超関数微分と弱微分を導入する。

SOB1では弱微分のLp可積分性からSobolev空間を作り、$H^k=W^{k,2}$ をHilbert空間として扱う。SOB2では零Dirichlet境界条件を $H_0^1$ とtraceで表し、Poincare不等式からcoercivityの準備をする。

WK1ではPoisson方程式を

$$
a(u,v)=F(v)
$$

というHilbert空間上の弱形式へ落とす。WK2ではLax--MilgramをRiesz表現から作用素へ移し、単射・閉range・稠密range・全射まで証明する。WK3ではGalerkin直交性とCeaの補題から有限要素法へ接続する。

Encore IIIは線形二階楕円型PDEとGalerkin/FEMへの橋までで閉じる。一般Sobolev embedding・Rellichの完全証明、楕円型正則性、非線形PDE、Navier--Stokes等は必須にしない。

読者向け入口は `F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md` とする。

---

## 構造変更時の確認

通常カリキュラム章を追加・分割するときは、先に `curriculum.yaml` を更新し、循環依存がないことを `npm run validate:structure` で確認する。

補講を追加・分割するときは、各 `chapter.yaml` の `prerequisites`、読者向けロードマップ、相互リンクを同じ変更単位で更新する。

補講の深掘りを追加するときは、標準通読ルートへ不要な必須依存を追加しない。必要十分な標準ルートと任意の深掘りルートを明示的に分離する。
