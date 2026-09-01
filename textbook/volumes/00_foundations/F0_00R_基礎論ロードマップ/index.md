# F0-00R 基礎論ロードマップ：標準ルートと発展Encore

このページは、F0-00の先に増えた発展補講を **どこまで読めばよいか** 整理するための入口です。

出発点は [F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) です。

設計基準は一貫して次です。

> **物量に負ける可能性はあるが、未定義語に殴られて脱落する構成にはしない。**

通常カリキュラムへ不要な必須依存は追加せず、深掘りは明示的な分岐として隔離します。

---

## 1. 標準通読ルート：F0-00からRKHSまで

```text
F0-00   数学速習
  ↓
F0-00A  集合・写像・sup/inf
  ↓
F0-00A2 選択公理・Zorn・極大原理
  ↓
F0-00B  距離・開閉集合・収束
  ↓
F0-00C  連続・コンパクト・最大最小
  ↓
F0-00D  Cauchy列・完備性
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
F0-02C1 → C2 → C3 → C4 → C5 → C6 → C7
```

A2はC6のHahn--Banach標準証明で使うZornの補題を先に導入します。D2は $L^2$・a.e.・可測関数を関数解析で突然出さないための橋です。

---

## 2. 完全基礎論ルート：DREAM THEATER

Lebesgue測度そのものの建設まで追う場合だけ、D2の直後に挿入します。

```text
F0-00D2
  ↓
F0-00D3 外測度・Carathéodory可測性
  ↓
F0-00D4 Lebesgue測度・Borel集合・拡張定理
  ↓
F0-00D5 Vitali集合・非可測集合・選択公理
  ↓
F0-00Eへ復帰
```

D3では

$$
\lambda^*(A)
=
\inf\left\{
\sum_n|I_n|:
A\subset\bigcup_nI_n
\right\}
$$

から外測度を作り、Carathéodory可測性で測れる集合を選別します。

D4では区間の長さ・Borel集合・Carathéodory拡張定理まで進み、D5ではVitali集合から「全ての部分集合を可測にはできない」ことを回収します。

この分岐は標準RKHSルートの必須にはしません。

---

## 3. 確率論「それどこから来た？」ルート

D2から確率論・漸近統計の理論側へ進む分岐です。

```text
F0-00D2
  ↓
F0-00P1  確率空間・確率変数・分布
  ↓
F0-00P2  Radon--Nikodym・密度・期待値
  ↓
F0-00P3  独立・積測度・条件付き期待値
  ↓
F0-00P4  収束・Borel--Cantelli・一様可積分性
  ↓
F0-00P5  大数の強法則
  ↓
F0-00P6  特性関数・中心極限定理
  ↓
F0-00P7  統計モデル・尤度・正則性
```

確率変数を可測写像、分布を押し出し測度、pdfをRadon--Nikodym密度、条件付き期待値を部分sigma代数上の構成として読み直します。

---

## 4. Encore II：Fourier Analysis & Differential Equations

[Encore II ロードマップを読む](../F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)

```text
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

特性関数が確率測度のFourier変換であることから始まり、微分作用素の周波数対角化、熱・波動・Laplace方程式、Sturm--Liouvilleまで進みます。

目安は約30時間です。

---

## 5. Encore III：Distributions, Sobolev Spaces & Weak Solutions

[Encore III ロードマップを読む](../F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)

Encore IIの古典的PDEから、低正則性の解と変分法へ進みます。

```text
F0-00DS1  Schwartz超関数・テスト関数・Dirac delta
  ↓
F0-00DS2  超関数微分・弱微分
  ↓
F0-00SOB1 Sobolev空間 W^{k,p}・H^k
  ↓
F0-00SOB2 H_0^1・Poincare・trace
  ↓
F0-00WK1  弱形式・Poisson方程式
  ↓
F0-00WK2  Lax--Milgram・存在一意性
  ↓
F0-00WK3  楕円型PDE・Galerkin・FEM
```

中心線は

$$
\boxed{
\text{超関数}
\to
\text{弱微分}
\to
\text{Sobolev空間}
\to
\text{弱形式}
\to
\text{Lax--Milgram}
\to
\text{Galerkin/FEM}
}
$$

です。

Lax--MilgramはRiesz表現から作用素を作り、coercivityで単射・閉range・稠密range・全射まで証明します。Encore IIIは線形二階楕円型PDEとFEMへの橋までで閉じます。

目安は約30時間です。

---

## 6. Encore IV：Stochastic Processes & Spectral Time Series

[Encore IV ロードマップを読む](../F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)

確率論・Hilbert空間・Fourier解析を、確率過程と時系列解析へ延長します。

```text
F0-00SP1 filtration・adapted process・stopping time
  ↓
F0-00SP2 martingale・optional stopping
  ↓
F0-00SP3 Brown運動・Gaussian過程・二次変分
  ↓
F0-00SP4 Ito積分・Ito公式・SDE
  ↓
F0-00SP5 generator・Kolmogorov・Fokker--Planck
  ↓
F0-00TS1 定常過程・Hilbert予測・innovation・Wold
  ↓
F0-00TS2 Herglotz・spectral measure・spectral density
  ↓
E2-03    AR・MA・ARIMA本編
  ↓
F0-00TS3 線形filter・ARMA transfer function・周波数領域
```

前半では

$$
\boxed{
\text{条件付き期待値}
\to
\text{martingale}
\to
\text{Brown運動}
\to
\text{Ito/SDE}
\to
\text{generator/PDE}
}
$$

を作ります。

後半では

$$
\boxed{
\text{定常過程}
\to
\text{Hilbert空間予測}
\to
\text{innovation/Wold}
\to
\text{spectral measure}
\to
\text{ARMA filter}
}
$$

を作り、E2-03へ帰還します。

Encore IVは通常教材E2の代替ではありません。E2は試験向け、Encore IVはその理論地下です。

目安は約40時間です。

---

## 7. Encore IIIとIVが交差する場所

Brown運動の形式的時間微分であるwhite noiseは通常の関数ではありません。

$$
\text{Brown運動}
\to
\text{white noise}
\to
\text{Schwartz超関数}
$$

としてEncore IIIへ接続します。

またSDEのgeneratorから出るKolmogorov/Fokker--Planck PDEが低正則性しか持たない場合、Sobolev空間・弱解が受け皿になります。

$$
\boxed{
\text{SDE}
\to
\text{generator}
\to
\text{PDE}
\to
\text{Sobolev弱解}
}
$$

です。

---

## 8. 目的別の読み方

### 統計検定1級の試験対策

F0-00から通常教材へ戻ってください。Encoreは不要です。

### RKHS・関数解析まで理解したい

標準通読ルートを読んでください。

### 漸近統計の理論まで理解したい

D2からP1〜P7へ進んでください。

### 「Lebesgue測度って誰が作った？」

DREAM THEATERルートへ進んでください。

### 「特性関数ってFourier変換ですよね？」

Encore IIへ進んでください。

### 「古典解がないとPDEは終わり？」

Encore IIIへ進んでください。

### 「Brown運動を微分したら？ ARMAをFourier変換したら？」

Encore IVへ進んでください。

---

## 9. 通読可能性の確認基準

全発展ルートで次を守ります。

1. 定義語は原則として使う前に導入する。
2. 高度定理を証明しない場合は「定理として使う」と明記する。
3. 前章の概念が次章で何に使われるかを明記する。
4. 有限次元と無限次元、古典解と弱解、確率分布とSchwartz超関数など、同名・類似概念を区別する。
5. 標準カリキュラムへ不要な発展前提を逆流させない。
6. 深掘り系列ごとに停止線を明示する。

---

## 10. 現在の全体像

```text
                                  ┌→ D3 → D4 → D5
                                  │
F0-00 → A → A2 → B → C → D → D2 ├→ P1 → P2 → P3 → P4 → P5 → P6 → P7
                                  │
                                  └→ E → E2 → F → G → 02 → 02A → 02B → C1 ... C7
                                                   │
                                                   └→ H1 → FA1 → FA2 → FA3
                                                                  ↓
                                                          PDE1 → PDE2 → PDE3
                                                                  ↓
                                                  DS1 → DS2 → SOB1 → SOB2
                                                                  ↓
                                                        WK1 → WK2 → WK3

P3/P4/P6 + C1 + FA2
          ↓
 SP1 → SP2 → SP3 → SP4 → SP5
                           │
                           └→ PDE / Encore III
          ↓
 TS1 → TS2 → E2-03 → TS3
```

もはや一本の道ではなく、**前提関係を壊さず乗り換えられる地下鉄網**として管理します。
