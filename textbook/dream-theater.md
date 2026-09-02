# DREAM THEATER 数学講座

> **統計検定1級の教材を読んでいたはずが、気づけば測度論・Fourier解析・PDE・Sobolev空間・確率過程・有限要素法・Monte Carloまで来てしまった人のための入口です。**
>
> ここは通常教材の必須ルートではありません。必要なところで降りて構いません。ただし、先へ進む場合は「未定義語に殴られない」順序で地下まで案内します。

> **このページの役割**  
> DREAM THEATER系列の全体像だけを見たいときのFacadeです。細かい前提・証明・演習は各ロードマップと各講義へ分けています。左サイドバーにはこのFacadeを常駐させません。

---

## まず、どこから入る？

| いま気になっていること | 入口 |
|---|---|
| 「そもそもLebesgue測度って誰が作った？」 | [完全基礎論・DREAM THEATER本編](textbook/volumes/00_foundations/F0_00R_基礎論ロードマップ/index.md) |
| 「特性関数ってFourier変換ですよね？」 | [Encore II: Fourier Analysis & Differential Equations](textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md) |
| 「古典解がないPDEはどうする？」 | [Encore III: Distributions, Sobolev Spaces & Weak Solutions](textbook/volumes/00_foundations/F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md) |
| 「Brown運動を微分したら？ ARMAをFourier変換したら？」 | [Encore IV: Stochastic Processes & Spectral Time Series](textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md) |
| 「で、実際どうやって計算するの？」 | [Encore V: Numerical Analysis, FEM & Monte Carlo](textbook/volumes/00_foundations/F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md) |

---

## 全体路線図

```text
統計検定1級の数学速習
        │
        ├─→ 関数解析・RKHS・SVM
        │
        ├─→ DREAM THEATER本編
        │      選択公理 / Zorn
        │      外測度 / Carathéodory
        │      Lebesgue測度 / Vitali集合
        │
        ├─→ 確率論「それどこから来た？」
        │      測度論的確率
        │      条件付き期待値
        │      大数の法則 / 中心極限定理
        │
        └─→ Encore II
               Fourier解析 / ODE / 古典PDE
                    │
                    └─→ Encore III
                           Schwartz超関数
                           Sobolev空間 / 弱解
                           Lax--Milgram / Galerkin
                                │
                                ├─→ Encore V
                                │      FEM / 数値線形代数
                                │      Monte Carlo / MLMC
                                │
確率論 ─→ Encore IV ────────────┘
          martingale / Brown運動
          Itô / SDE / generator
          Wold / スペクトル時系列
```

この図は一本道ではありません。**興味のある分岐だけ読む**ための路線図です。

---

## Main Set — DREAM THEATER 本編

### 「存在するって誰が言った？」を掘る

標準教材では、ある程度の基礎定理を「使ってよいもの」として先へ進みます。DREAM THEATER本編は、その床板を剥がすルートです。

主なテーマ：

- 集合・写像・距離・位相・完備性
- 選択公理・Zornの補題・Hahn--Banachへの接続
- 測度・可測関数・Lebesgue積分・$L^p$
- 外測度・Carathéodory可測性
- Lebesgue測度の構成
- Vitali集合と非可測集合
- Banach / Hilbert空間、双対、Riesz、凸解析、RKHS

**設計原則：**

> 物量に負ける可能性はあるが、未定義語に殴られて脱落する構成にはしない。

[基礎論ロードマップへ進む](textbook/volumes/00_foundations/F0_00R_基礎論ロードマップ/index.md)

---

## Encore II — Fourier Analysis & Differential Equations

### 「特性関数はFourier変換ですか？」から始まった公演

ここでは、$L^2$・直交展開・Fourier変換が、確率論と微分方程式の共通言語になることを追います。

```text
ODE
 ↓
Fourier級数
 ↓
Fourier変換・畳み込み
 ↓
Plancherel
 ↓
熱方程式・Gaussian heat kernel
 ↓
波動方程式・Laplace方程式
 ↓
Sturm--Liouville・スペクトル展開
```

見どころは、

$$
\widehat{f'}(\xi)=i\xi\widehat f(\xi)
$$

によって「微分」が周波数空間で「掛け算」へ変わること、そしてGaussianが中心極限定理・Fourier変換・熱方程式・Brown運動の周辺で何度も再登場することです。

[Encore IIへ進む](textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)

---

## Encore III — Distributions, Sobolev Spaces & Weak Solutions

### 「微分できないなら、弱い意味で微分すれば？」

古典的な微分可能性を捨て、PDEをHilbert空間上の問題として読み直します。

```text
Schwartz超関数
 ↓
超関数微分・弱微分
 ↓
Sobolev空間
 ↓
弱形式
 ↓
Lax--Milgram
 ↓
Galerkin / FEM
```

Poisson方程式

$$
-\Delta u=f
$$

を、

$$
\int_\Omega \nabla u\cdot\nabla v\,dx
=
\int_\Omega fv\,dx
$$

という弱形式へ落とし、存在一意性から数値計算への橋までつなぎます。

[Encore IIIへ進む](textbook/volumes/00_foundations/F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)

---

## Encore IV — Stochastic Processes & Spectral Time Series

### 確率過程と時系列がFourier・Hilbert・PDEへ合流する

連続時間側では、

```text
filtration
 ↓
martingale
 ↓
Brown運動
 ↓
Itô積分・SDE
 ↓
generator
 ↓
Kolmogorov / Fokker--Planck PDE
```

離散時間側では、

```text
定常過程
 ↓
Hilbert空間としての線形予測
 ↓
innovation / Wold
 ↓
spectral measure
 ↓
ARMAの周波数応答
```

へ進みます。

ARMAの

$$
\phi(B)X_t=\theta(B)\varepsilon_t
$$

は周波数領域で

$$
H(\lambda)=\frac{\theta(e^{-i\lambda})}{\phi(e^{-i\lambda})}
$$

となり、backshift演算子がfilterとして読めるようになります。

[Encore IVへ進む](textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)

---

## Encore V — Numerical Analysis, FEM & Monte Carlo

### 「理論は分かった。で、どう計算する？」

ここでは解析学と確率論を、実際にコンピュータで解くための数値計算へ落とします。

主な路線：

- 浮動小数点・誤差・条件数・安定性
- 疎行列・Conjugate Gradient・前処理
- 補間・数値微分・数値積分・Gaussian quadrature
- Euler / Runge--Kutta
- FEMのmesh・basis・assembly
- Monte Carlo積分・分散削減
- Euler--Maruyama
- random PDE / Monte Carlo FEM
- Multilevel Monte Carlo

最終的には、地下水流のrandom permeabilityを例に、

$$
-\nabla\cdot\bigl(k(x,\omega)\nabla h(x,\omega)\bigr)=q(x)
$$

をsampleごとに有限要素法で解き、Monte Carloで統計量を推定するところまで到達します。

[Encore Vへ進む](textbook/volumes/00_foundations/F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)

---

## どこで降りればいい？

> **統計検定1級に合格したいだけ**  
> このページを閉じて通常教材へ戻って大丈夫です。DREAM THEATER系列は必須ではありません。

> **SVM / RKHSを理論まで理解したい**  
> 基礎論ロードマップの標準通読ルートまでで十分です。Fourier解析やPDEは必須ではありません。

> **確率論・時系列を理論から理解したい**  
> 測度論的確率からEncore IVへ。Encore IIIやFEMは興味が出てからで構いません。

> **PDEやシミュレーションまでやりたい**  
> Encore II → III → Vが主線です。SDEや確率的不確実性まで扱うならEncore IVも合流します。

---

## 最後に

この講座群は「統計検定1級に必要だから全部やる」ものではありません。

むしろ、

> **いま使っている公式・定理・アルゴリズムは、数学のどの地下水脈につながっているのか？**

を、気になったところだけ掘れるようにした発展ルートです。

そして掘るほど、

$$
\text{線形代数}
\leftrightarrow
\text{Hilbert空間}
\leftrightarrow
\text{Fourier解析}
\leftrightarrow
\text{確率論}
\leftrightarrow
\text{PDE}
\leftrightarrow
\text{数値計算}
$$

が別々の科目ではなく、同じ構造を違う角度から見ていることが分かってきます。

**ようこそ、DREAM THEATER数学講座へ。**
