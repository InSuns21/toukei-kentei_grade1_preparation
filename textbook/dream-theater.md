# DREAM THEATER 数学講座

> 統計検定1級の教材を読んでいたはずが、気づけば測度論・Fourier解析・PDE・Sobolev空間・確率過程・有限要素法・Monte Carloまで来てしまった人のための入口です。

このページは **DREAM THEATER系列のオリエンテーション兼目次** です。章ID順ではなく、前提関係を意識した通読順で並べています。

## 0. 入口

1. [F0-00 統計検定1級のための数学速習](textbook/volumes/00_foundations/F0_00_統計検定1級のための数学速習/index.md)
2. [F0-01 統計のための微積分・線形代数・答案記法](textbook/volumes/00_foundations/F0_01_統計のための微積分_線形代数_答案記法/index.md)
3. [F0-00R 基礎論ロードマップ](textbook/volumes/00_foundations/F0_00R_基礎論ロードマップ/index.md)

---

## 1. DREAM THEATER 本編

### 集合・位相・完備性

1. [F0-00A 集合・写像・上限下限](textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md)
2. [F0-00A1 supremum・infimum](textbook/volumes/00_foundations/F0_00A1_上界_下界_supremum_infimum/index.md)
3. [F0-00A2 選択公理・Zorn](textbook/volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md)
4. [F0-00A3 半順序・Zorn・極大延長](textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md)
5. [F0-00B 距離空間・収束](textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md)
6. [F0-00C 連続写像・コンパクト性](textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md)
7. [F0-00C1 点列コンパクト性・Heine–Borel](textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md)
8. [F0-00C2 最大最小・最近点](textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)
9. [F0-00D Cauchy列・完備性](textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md)

### 線形代数

1. [F0-00E ベクトル空間・基底](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)
2. [F0-00F 線形写像・固有空間・SVD](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)
3. [F0-00E1 内積・Gram–Schmidt・QR](textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)
4. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval](textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)
5. [F0-00F1 スペクトル定理・PSD](textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md)
6. [F0-00F2 SVD・作用素ノルム](textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md)

### ノルム空間・測度・Lebesgue積分

1. [F0-00D1 ノルム・Banach](textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)
2. [F0-00D2 測度・可測関数・Lebesgue積分](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)
3. [F0-00D3 外測度・Carathéodory](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)
4. [F0-00D4 Lebesgue測度・Borel・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)
5. [F0-00D5 Vitali集合・非可測集合](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)
6. [F0-00D2A 単関数からLebesgue積分](textbook/volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md)
7. [F0-00D2B MCT・Fatou・DCT](textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md)
8. [F0-00D2C 積測度・Tonelli・Fubini](textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md)
9. [F0-00D2D Lp・Hölder・Minkowski](textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md)
10. [F0-00D2E L2完備性・Riesz–Fischer](textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md)

### 関数解析

ここからは、関数空間を「無限次元の線形空間」として扱うための本体です。後ろの凸解析・KKT・RKHSが、ここで準備する完備性・双対・作用素・分離の言葉を使います。

1. [F0-02C 関数解析・制約想定・RKHS ロードマップ](textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md)
2. [F0-02C1 Banach・Hilbert](textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md)
3. [F0-02C1A Hilbert射影定理](textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md)
4. [F0-02C2 双対空間・Riesz](textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md)
5. [F0-02C3 Fréchet微分・有界線形作用素](textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md)
6. [F0-02C3A Banach双対・Hilbert随伴](textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md)
7. [F0-02C3B Fréchet連鎖律・Hilbert随伴の証明](textbook/volumes/00_foundations/F0_02C3B_Frechet_chain_adjoint_proofs/index.md)
8. [F0-02C6 Hahn–Banach](textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md)
9. [F0-02C6A 分離定理・Minkowski・Farkas](textbook/volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md)

### 凸解析・凸最適化

有限次元の凸性の基礎から入り、epigraph と支持超平面、劣微分、錐、Fenchel 共役・双対までを一つの系列として読みます。F0-00G 自体は早い段階でも読めますが、標準通読では関数解析・分離定理のあとにまとめます。

1. [F0-00G 凸集合・凸関数・凸最適化](textbook/volumes/00_foundations/F0_00G_凸集合_凸関数_凸最適化/index.md)
2. [F0-00G1 epigraph・閉凸関数・支持超平面](textbook/volumes/00_foundations/F0_00G1_epigraph_閉凸関数_支持超平面/index.md)
3. [F0-02C4 劣勾配・劣微分・normal cone](textbook/volumes/00_foundations/F0_02C4_凸解析_劣勾配_normal_cone_双対錐/index.md)
4. [F0-02C4A tangent・polar・dual cone](textbook/volumes/00_foundations/F0_02C4A_tangent_polar_dual_cone/index.md)
5. [F0-02C4B tangent-normal polar identity の証明](textbook/volumes/00_foundations/F0_02C4B_tangent_normal_polar_proof/index.md)
6. [F0-00G2 Fenchel共役・Fenchel–Young・双対](textbook/volumes/00_foundations/F0_00G2_Fenchel共役_Fenchel_Young_双対/index.md)

### 制約付き最適化・KKT

ここで有限次元の制約付き最適化へ戻ります。凸解析で準備した双対・normal cone・dual cone を、Farkas と Lagrangian を通して KKT 条件へ落とし込み、その後に一般化KKTへ進みます。

1. [F0-02 制約付き最適化・双対・KKT](textbook/volumes/00_foundations/F0_02_制約付き最適化_双対_KKT/index.md)
2. [F0-02B 分離超平面・Farkas](textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md)
3. [F0-02A KKT導出・接錐・polar・Farkas](textbook/volumes/00_foundations/F0_02A_KKT条件の導出_接錐_polar_Farkas/index.md)
4. [F0-02C5 一般化KKT・制約写像](textbook/volumes/00_foundations/F0_02C5_一般化KKT_制約写像_制約想定/index.md)
5. [F0-02C5A LICQ・MFCQ・Robinson CQ](textbook/volumes/00_foundations/F0_02C5A_制約想定_LICQ_MFCQ_Robinson/index.md)

### RKHS・SVM

最後に、Hilbert空間・Riesz・凸最適化・SVMが合流します。

1. [F0-02C7 RKHS・再生核](textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md)
2. [F0-02B1 SVM・凸包・最大マージン](textbook/volumes/00_foundations/F0_02B1_SVM_凸包_最大マージン/index.md)
3. [F0-02C7A representer theorem・kernel SVM](textbook/volumes/00_foundations/F0_02C7A_representer_kernel_SVM/index.md)

---

## 2. 確率論

1. [確率論ロードマップ](textbook/volumes/00_foundations/F0_00P_確率論_測度論から統計理論へ/index.md)
2. [P1 確率空間・確率変数・分布](textbook/volumes/00_foundations/F0_00P1_確率空間_確率変数_分布/index.md)
3. [P2 密度・期待値・Radon–Nikodym](textbook/volumes/00_foundations/F0_00P2_密度_期待値_Radon_Nikodym/index.md)
4. [P2A 期待値・LOTUS](textbook/volumes/00_foundations/F0_00P2A_期待値_LOTUS/index.md)
5. [P3 独立・積測度・条件付き期待値](textbook/volumes/00_foundations/F0_00P3_独立_積測度_条件付き期待値/index.md)
6. [P3A 条件付き期待値・Radon–Nikodym](textbook/volumes/00_foundations/F0_00P3A_条件付き期待値_Radon_Nikodym/index.md)
7. [P3B L2射影・最良予測](textbook/volumes/00_foundations/F0_00P3B_L2射影_最良予測/index.md)
8. [P3C Lévy上昇定理](textbook/volumes/00_foundations/F0_00P3C_Levy上昇定理_情報の増加/index.md)
9. [P3D pushforward・LOTUS・Doob–Dynkinの証明](textbook/volumes/00_foundations/F0_00P3D_pushforward_LOTUS_Doob_Dynkin/index.md)
10. [P4 収束・Borel–Cantelli・UI](textbook/volumes/00_foundations/F0_00P4_収束_Borel_Cantelli_一様可積分性/index.md)
11. [P4A 一様可積分性・Vitali](textbook/volumes/00_foundations/F0_00P4A_一様可積分性_Vitali/index.md)
12. [P5 大数の強法則](textbook/volumes/00_foundations/F0_00P5_大数の強法則/index.md)
13. [P5A truncation・Kronecker・一般SLLN](textbook/volumes/00_foundations/F0_00P5A_truncation_Kronecker_一般SLLN/index.md)
14. [P6 特性関数・中心極限定理](textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md)
15. [P6A iid中心極限定理](textbook/volumes/00_foundations/F0_00P6A_iid_中心極限定理/index.md)
16. [P7 統計モデル・尤度・正則性](textbook/volumes/00_foundations/F0_00P7_統計モデル_尤度_正則性/index.md)
17. [P7A MLE一致性・漸近正規性](textbook/volumes/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md)
18. [P7B QMD・LAN](textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md)

---

## 3. Encore II：Fourier解析・微分方程式

1. [Encore II ロードマップ](textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)
2. [H1 常微分方程式・行列指数](textbook/volumes/00_foundations/F0_00H1_常微分方程式_線形系_行列指数/index.md)
3. [FA1 Fourier級数・直交展開](textbook/volumes/00_foundations/F0_00FA1_Fourier級数_直交展開/index.md)
4. [FA2 Fourier変換・畳み込み・反転](textbook/volumes/00_foundations/F0_00FA2_Fourier変換_畳み込み_反転/index.md)
5. [FA3 Plancherel・L2・特性関数](textbook/volumes/00_foundations/F0_00FA3_Plancherel_L2_特性関数/index.md)
6. [PDE1 熱方程式・Fourier変換](textbook/volumes/00_foundations/F0_00PDE1_熱方程式_Fourier変換/index.md)
7. [PDE2 波動方程式・Laplace方程式](textbook/volumes/00_foundations/F0_00PDE2_波動方程式_Laplace方程式_変数分離/index.md)
8. [PDE3 Sturm–Liouville・スペクトル展開](textbook/volumes/00_foundations/F0_00PDE3_Sturm_Liouville_スペクトル展開/index.md)

---

## 4. Encore III：超関数・Sobolev・弱形式

1. [Encore III ロードマップ](textbook/volumes/00_foundations/F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)
2. [DS1 Schwartz超関数・テスト関数](textbook/volumes/00_foundations/F0_00DS1_Schwartz超関数_テスト関数/index.md)
3. [DS2 超関数微分・弱微分](textbook/volumes/00_foundations/F0_00DS2_超関数微分_弱微分/index.md)
4. [SOB1 Sobolev空間](textbook/volumes/00_foundations/F0_00SOB1_Sobolev空間_Wkp_Hk/index.md)
5. [SOB2 H01・Poincaré・trace](textbook/volumes/00_foundations/F0_00SOB2_H01_Poincare_trace/index.md)
6. [WK1 弱形式・変分形式](textbook/volumes/00_foundations/F0_00WK1_弱形式_変分形式/index.md)
7. [WK2 Lax–Milgram](textbook/volumes/00_foundations/F0_00WK2_Lax_Milgram_存在一意性/index.md)
8. [WK3 楕円型PDE・Galerkin・FEM](textbook/volumes/00_foundations/F0_00WK3_楕円型PDE_Galerkin_FEM/index.md)

---

## 5. Encore IV：確率過程・スペクトル・時系列

1. [Encore IV ロードマップ](textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)
2. [SP1 確率過程・filtration・stopping](textbook/volumes/00_foundations/F0_00SP1_確率過程_filtration_stopping/index.md)
3. [SP2 martingale・optional stopping](textbook/volumes/00_foundations/F0_00SP2_martingale_optional_stopping/index.md)
4. [SP3 Brown運動・Gaussian過程・二次変分](textbook/volumes/00_foundations/F0_00SP3_Brown運動_Gaussian過程_二次変分/index.md)
5. [SP4 Itô積分・Itô公式・SDE](textbook/volumes/00_foundations/F0_00SP4_Ito積分_Ito公式_SDE/index.md)
6. [SP5 generator・Kolmogorov・Fokker–Planck](textbook/volumes/00_foundations/F0_00SP5_generator_Kolmogorov_Fokker_Planck/index.md)
7. [TS1 定常過程・Hilbert予測・Wold](textbook/volumes/00_foundations/F0_00TS1_定常過程_Hilbert予測_Wold/index.md)
8. [TS2 Herglotz・spectral measure](textbook/volumes/00_foundations/F0_00TS2_Herglotz_spectral_measure_density/index.md)
9. [TS3 ARMA・transfer filter・spectrum](textbook/volumes/00_foundations/F0_00TS3_ARMA_transfer_filter_spectrum/index.md)

---

## 6. Encore V：数値解析・FEM・Monte Carlo

1. [Encore V ロードマップ](textbook/volumes/00_foundations/F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)
2. [NA1 浮動小数点・誤差・条件数](textbook/volumes/00_foundations/F0_00NA1_浮動小数点_誤差_条件数_安定性/index.md)
3. [NA2 数値線形代数・CG・前処理](textbook/volumes/00_foundations/F0_00NA2_数値線形代数_疎行列_CG_前処理/index.md)
4. [NA3 補間・数値微分・数値積分](textbook/volumes/00_foundations/F0_00NA3_補間_数値微分_数値積分/index.md)
5. [NA4 ODE数値解法・Runge–Kutta](textbook/volumes/00_foundations/F0_00NA4_ODE数値解法_Runge_Kutta_安定性/index.md)
6. [FEM1 メッシュ・基底・assembly・Poisson](textbook/volumes/00_foundations/F0_00FEM1_メッシュ_基底_assembly_Poisson/index.md)
7. [MC1 Monte Carlo積分・LLN・CLT](textbook/volumes/00_foundations/F0_00MC1_Monte_Carlo積分_LLN_CLT_誤差/index.md)
8. [MC2 分散削減・importance・control variate](textbook/volumes/00_foundations/F0_00MC2_分散削減_importance_control_variate/index.md)
9. [SDE1 Euler–Maruyama・strong/weak](textbook/volumes/00_foundations/F0_00SDE1_Euler_Maruyama_strong_weak/index.md)
10. [SDE1A Euler–Maruyama weak order 1 の証明](textbook/volumes/00_foundations/F0_00SDE1A_Euler_Maruyama_weak_order_proof/index.md)
11. [UQ1 random PDE・Monte Carlo FEM](textbook/volumes/00_foundations/F0_00UQ1_random_PDE_Monte_Carlo_FEM/index.md)
12. [MLMC Multilevel Monte Carlo](textbook/volumes/00_foundations/F0_00MLMC_Multilevel_Monte_Carlo/index.md)

---

## 読み方

- 統計検定1級の本線だけなら、まず通常教材を優先してください。
- DREAM THEATERは「この定理はどこから来たのか」を掘りたいときの補講系列です。
- 証明補講は、既存の概念章を肥大化させず **定義 → 例 → 定理 → 証明 → A/B演習** を閉じるために分離しています。
