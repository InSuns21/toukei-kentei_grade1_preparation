# DREAM THEATER 数学講座

> 統計検定1級の教材を読んでいたはずが、気づけば測度論・Fourier解析・PDE・Sobolev空間・確率過程・有限要素法・Monte Carloまで来てしまった人のための入口です。

このページは **DREAM THEATER 系列のオリエンテーション兼全体目次** です。数学的な依存関係を意識して、標準数学コアから各 Encore へつながる全体像を示します。

## 読み方

- **統計検定1級の合格が目的なら、まず通常教材を優先してください。** DREAM THEATER は、そこで使う数学を出発点に、大学数学・大学院数学の標準的な理論まで体系的に掘り下げる系列です。
- 通読するときは、まず **標準数学コア（読む順DAG）** を入口にし、各章の前提関係に沿って進んでください。章IDの番号順に読む必要はありません。
- Encore II 以降は、ODE・Fourier解析・PDE、Graduate PDE、確率解析・時系列、数値解析へ分岐します。必要な標準数学コアを押さえたうえで、目的に合う系列へ進めます。
- 各章では、定義と直接例、主要定理、証明の見取り図と完全証明、演習と詳細解答を通じて、前提章だけを既知として論証を再構成できることを目標にしています。

## 0. 入口

1. [標準数学コア（読む順DAG）](textbook/dream-theater-standard-math-core.md)

---

## 1. DREAM THEATER 本編

### 集合・位相・完備性

1. [F0-00A 集合・写像・上限下限](textbook/volumes/00_foundations/F0_00A_集合_写像_上限下限/index.md)
2. [F0-00A1 supremum・infimum](textbook/volumes/00_foundations/F0_00A1_上界_下界_supremum_infimum/index.md)
3. [F0-00A1B 実数の上限性質・Archimedes性](textbook/volumes/00_foundations/F0_00A1B_実数の上限性質_Archimedes性/index.md)
4. [F0-00A1C 集合族・添字集合・べき集合](textbook/volumes/00_foundations/F0_00A1C_集合族_添字集合_べき集合/index.md)
5. [F0-00A1D 順序・全順序・最小最大・整列](textbook/volumes/00_foundations/F0_00A1D_順序_全順序_最小最大_整列/index.md)
6. [F0-00A2 選択公理・Zorn](textbook/volumes/00_foundations/F0_00A2_選択公理_Zorn_極大原理/index.md)
7. [F0-00A3 半順序・Zorn・極大延長](textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md)
8. [F0-00A3A 選択公理とZornの補題の同値性](textbook/volumes/00_foundations/F0_00A3A_AC_Zorn_equivalence_proof/index.md)
9. [F0-00B0 点列・部分列・十分大きい添字](textbook/volumes/00_foundations/F0_00B0_点列_部分列_十分大きい添字/index.md)
10. [F0-00B 距離空間・収束](textbook/volumes/00_foundations/F0_00B_距離空間_開集合_閉集合_収束/index.md)
11. [F0-00B1 位相空間・近傍・部分空間・収束](textbook/volumes/00_foundations/F0_00B1_位相空間_近傍_部分空間_収束/index.md)
12. [TOP1 位相の生成・initial/final topology・積・商](textbook/volumes/00_foundations/TOP1/index.md)
13. [F0-00C 連続写像・連続性の同値条件](textbook/volumes/00_foundations/F0_00C_連続写像_コンパクト性_最大最小/index.md)
14. [F0-00C1 点列コンパクト性・Heine–Borel](textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md)
15. [TOP2 同値関係による商空間・貼り合わせ](textbook/volumes/00_foundations/TOP2/index.md)
16. [TOP3 連結性・弧状連結性・連結成分](textbook/volumes/00_foundations/TOP3/index.md)
17. [TOP4 分離公理・可算性公理](textbook/volumes/00_foundations/TOP4/index.md)
18. [TOP5 コンパクト性の一般論](textbook/volumes/00_foundations/TOP5/index.md)
19. [TOP5A Urysohn の補題・局所コンパクト性・cutoff](textbook/volumes/00_foundations/TOP5A/index.md)
20. [F0-00C2 最大最小・最近点](textbook/volumes/00_foundations/F0_00C2_コンパクト性の応用_最大最小_最近点/index.md)
21. [F0-00D Cauchy列・完備性](textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md)
22. [F0-00D0 Cauchy完備化：有理数から実数](textbook/volumes/00_foundations/F0_00D0_Cauchy完備化_有理数から実数/index.md)
23. [F0-00D0A 一般距離空間の完備化](textbook/volumes/00_foundations/F0_00D0A_一般距離空間の完備化/index.md)
24. [F0-00D0B Dedekind切断：順序の穴から実数](textbook/volumes/00_foundations/F0_00D0B_Dedekind切断_実数の構成/index.md)
25. [F0-00D0C Cauchy構成とDedekind構成の同値](textbook/volumes/00_foundations/F0_00D0C_Cauchy構成_Dedekind構成_同値/index.md)
26. [TOP6 全有界性・Baire・net/フィルタ](textbook/volumes/00_foundations/TOP6/index.md)
27. [TOP7 一様構造・一様連続・Cauchy構造](textbook/volumes/00_foundations/TOP7/index.md)

### 標準実解析コア

既存の実数・点列・コンパクト性を「定義の床」として再利用し、ここから数学科標準の実解析を積み上げます。

1. [RA1 数列・級数](textbook/volumes/00_foundations/RA1/index.md)
2. [RA1A 数値級数の収束論](textbook/volumes/00_foundations/RA1A/index.md)
3. [RA2 極限・連続・一様連続](textbook/volumes/00_foundations/RA2/index.md)
4. [RA3 微分法の理論](textbook/volumes/00_foundations/RA3/index.md)
5. [RA4 Riemann/Darboux積分・FTC](textbook/volumes/00_foundations/RA4/index.md)
6. [RA4A 広義積分・収束判定](textbook/volumes/00_foundations/RA4A/index.md)
7. [RA5 関数列・関数級数・一様収束](textbook/volumes/00_foundations/RA5/index.md)
8. [RA6 多変数微分・Fréchet微分（既存 F0-02C3）](textbook/volumes/00_foundations/F0_02C3_Frechet微分_線形作用素_随伴/index.md)
9. [RA6A 逆関数定理・陰関数定理](textbook/volumes/00_foundations/RA6A/index.md)
10. [RA7 多重Riemann積分・変数変換](textbook/volumes/00_foundations/RA7/index.md)
11. [RA8 関数族のコンパクト性・近似](textbook/volumes/00_foundations/RA8/index.md)

### 標準線形代数コア

基底・線形写像・実内積・実対称スペクトル定理・実SVDを踏まえ、LA系列で複素数体・商空間・代数的双対・行列式・作用素構造・複素内積へ進みます。

1. [F0-00E ベクトル空間・基底](textbook/volumes/00_foundations/F0_00E_ベクトル空間_基底_Gram_Schmidt_直交射影/index.md)
2. [F0-00F 線形写像・固有空間・SVD](textbook/volumes/00_foundations/F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md)
3. [LA1 実・複素線形空間](textbook/volumes/00_foundations/LA1/index.md)
4. [LA2 直和・補空間・商空間](textbook/volumes/00_foundations/LA2/index.md)
5. [LA3A 代数的双対・双対基底・annihilator](textbook/volumes/00_foundations/LA3A/index.md)
6. [LA3B 置換の符号・Leibniz公式・行列式の構成](textbook/volumes/00_foundations/LA3B/index.md)
7. [LA3C 行列式の計算・Laplace展開・可逆性・乗法性](textbook/volumes/00_foundations/LA3C/index.md)
8. [LA4 作用素多項式・最小多項式・Jordan構造](textbook/volumes/00_foundations/LA4/index.md)
9. [F0-00E1 内積・Gram–Schmidt・QR](textbook/volumes/00_foundations/F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)
10. [F0-00E2 Cauchy–Schwarz・Bessel・Parseval](textbook/volumes/00_foundations/F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)
11. [LA5 複素内積・有限次元随伴・normal operator](textbook/volumes/00_foundations/LA5/index.md)
12. [F0-00F1 スペクトル定理・PSD](textbook/volumes/00_foundations/F0_00F1_固有空間_スペクトル定理_PSD/index.md)
13. [F0-00F2 SVD・作用素ノルム](textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md)
14. [LA6 スペクトル・二次形式・polar decomposition・複素SVD](textbook/volumes/00_foundations/LA6/index.md)
15. [LA3D 交代多重線形形式・抽象行列式（発展分岐）](textbook/volumes/00_foundations/LA3D/index.md)
16. [LA3E テンソル積・外積代数（幾何学への発展分岐）](textbook/volumes/00_foundations/LA3E/index.md)

**院試・編入の計算演習**：[線形代数・院試／編入計算演習（A8・B10・C4、計22題）](textbook/volumes/00_foundations/F0_00CALC_線形代数_院試編入計算演習/index.md)。

### 多様体・微分幾何コア

位相・多変数解析を、一般多様体上の微分幾何へ接続する系列です。

1. [GEO1 滑らかな多様体・滑らかな写像](textbook/volumes/00_foundations/GEO1/index.md)
2. [GEO2 接空間・余接空間・微分・接束](textbook/volumes/00_foundations/GEO2/index.md)
3. [GEO3 階数定理・はめ込み・沈め込み・部分多様体](textbook/volumes/00_foundations/GEO3/index.md)
4. [GEO4 1 の分割・局所化・埋め込み](textbook/volumes/00_foundations/GEO4/index.md)
5. [GEO5 ベクトル場・積分曲線・局所流・Lie 括弧](textbook/volumes/00_foundations/GEO5/index.md)
6. [GEO6 線形分布・積分多様体・Frobenius の定理](textbook/volumes/00_foundations/GEO6/index.md)
7. [GEO7 テンソル場・微分形式・外微分](textbook/volumes/00_foundations/GEO7/index.md)
8. [GEO8 向き・多様体上の積分・一般 Stokes の定理](textbook/volumes/00_foundations/GEO8/index.md)
9. [GEO9 Poincaré の補題・de Rham コホモロジー入門](textbook/volumes/00_foundations/GEO9/index.md)
10. [GEO10 Euclid 空間の曲線・超曲面 I：基本形式と形作用素](textbook/volumes/00_foundations/GEO10/index.md)
11. [GEO11 Euclid 空間の超曲面 II：構造方程式・Gauss--Codazzi・基本定理](textbook/volumes/00_foundations/GEO11/index.md)
12. [GEO12 Riemann 計量・長さ・距離・体積](textbook/volumes/00_foundations/GEO12/index.md)
13. [GEO13 アフィン接続・Levi-Civita 接続・平行移動](textbook/volumes/00_foundations/GEO13/index.md)

### 標準ベクトル解析コア

多変数微分と多重積分を、曲線・曲面・場・積分定理へ接続する独立系列です。PDE に加えて、流体・電磁気・連続体力学にも共通する基礎を扱います。

1. [VC1 ベクトル場と微分演算子](textbook/volumes/00_foundations/VC1/index.md)
2. [VC2 曲線・線積分・保存場](textbook/volumes/00_foundations/VC2/index.md)
3. [VC3 曲面・向き・曲面積分・flux](textbook/volumes/00_foundations/VC3/index.md)
4. [VC4 Green・Gauss--Ostrogradsky と保存則](textbook/volumes/00_foundations/VC4/index.md)
5. [VC5 Stokes theorem・curl・topology](textbook/volumes/00_foundations/VC5/index.md)
6. [VC6 直交曲線座標](textbook/volumes/00_foundations/VC6/index.md)
7. [VC7 添字記法・直交基底・成分変換](textbook/volumes/00_foundations/VC7/index.md)
8. [VC8 Newton ポテンシャル・Helmholtz 分解](textbook/volumes/00_foundations/VC8/index.md)
9. [VC9 保存則・流体・Maxwell 方程式](textbook/volumes/00_foundations/VC9/index.md)

### ノルム空間・測度・Lebesgue積分

1. [F0-00D1 ノルム・Banach](textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)
2. [F0-00D2 測度・可測関数・Lebesgue積分](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)
3. [F0-00D3 外測度・Carathéodory](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)
4. [F0-00D3A π–λ定理・Dynkin族](textbook/volumes/00_foundations/F0_00D3A_pi_lambda_Dynkin/index.md)
5. [F0-00D4 Lebesgue測度・Borel・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)
6. [F0-00D5 Vitali集合・非可測集合](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)
7. [MT0 Lebesgue測度の正則性・有限単関数近似](textbook/volumes/00_foundations/MT0/index.md)
8. [F0-00D2A 単関数からLebesgue積分](textbook/volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md)
9. [F0-00D2B MCT・Fatou・DCT](textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md)
10. [MT1 収束様式・Egorov・Lusin](textbook/volumes/00_foundations/MT1/index.md)
11. [MT2 符号付き測度・Hahn–Jordan分解・全変動](textbook/volumes/00_foundations/MT2/index.md)
12. [MT3 Radon–Nikodym定理・Lebesgue分解](textbook/volumes/00_foundations/MT3/index.md)
13. [MT4 Lebesgue微分定理・絶対連続関数](textbook/volumes/00_foundations/MT4/index.md)
14. [MT5 Radon測度・Riesz–Markov](textbook/volumes/00_foundations/MT5/index.md)
15. [MT6 C0版Riesz–Markov・有限符号付きRadon測度](textbook/volumes/00_foundations/MT6/index.md)
16. [MT-RL Riemann積分とLebesgue積分の橋](textbook/volumes/00_foundations/MT-RL/index.md)
17. [F0-00D2C 積測度・Tonelli・Fubini](textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md)
18. [F0-00D2D Lp・Hölder・Minkowski](textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md)
19. [F0-00D2E L2完備性・Riesz–Fischer](textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md)
20. [MT7 Lp完備性・稠密性・双対](textbook/volumes/00_foundations/MT7/index.md)
21. [MT8 Hausdorff測度・Hausdorff次元](textbook/volumes/00_foundations/MT8/index.md)

### 関数解析

ここからは、関数空間を「無限次元の線形空間」として扱うための本体です。後ろの凸解析・KKT・RKHSが、ここで準備する完備性・双対・作用素・分離の言葉を使います。多変数微分は標準実解析コアの RA6 で扱い、ここではその後続となる Banach/Hilbert 空間上の理論へ進みます。

1. [F0-02C 関数解析・制約想定・RKHS ロードマップ](textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md)
2. [F0-02C1 Banach・Hilbert](textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md)
3. [F0-02C1A Hilbert射影定理](textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md)
4. [F0-02C2 双対空間・Riesz](textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md)
5. [F0-02C3A Banach双対・Hilbert随伴](textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md)
6. [F0-02C3B Fréchet連鎖律・Hilbert随伴の証明](textbook/volumes/00_foundations/F0_02C3B_Frechet_chain_adjoint_proofs/index.md)
7. [FA1 Banach空間の商・Baire・一様有界性原理](textbook/volumes/00_foundations/FA1/index.md)
8. [FA2 開写像定理・有界逆定理・閉グラフ定理](textbook/volumes/00_foundations/FA2/index.md)
9. [F0-02C6 Hahn–Banach](textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md)
10. [FA3 弱位相・弱*位相・標準埋め込み](textbook/volumes/00_foundations/FA3/index.md)
11. [FA4 Banach–Alaoglu・Goldstine・反射性](textbook/volumes/00_foundations/FA4/index.md)
12. [FA5 スペクトル・レゾルベント](textbook/volumes/00_foundations/FA5/index.md)
13. [FA6 コンパクト作用素](textbook/volumes/00_foundations/FA6/index.md)
14. [FA7 コンパクト自己共役作用素・Fredholm alternative](textbook/volumes/00_foundations/FA7/index.md)
15. [F0-02C6A 分離定理・Minkowski・Farkas](textbook/volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md)

### 標準複素解析コア

実解析・複素線形代数を受け、Cauchy 理論から留数・調和関数・スペクトル論へ進む独立系列です。

1. [CA1 複素微分・Cauchy–Riemann・初等正則関数](textbook/volumes/00_foundations/CA1/index.md)
2. [CA2 複素線積分・原始関数・Cauchy–Goursat](textbook/volumes/00_foundations/CA2/index.md)
3. [CA3 Cauchy積分公式・Taylor展開・Liouville・最大値原理](textbook/volumes/00_foundations/CA3/index.md)
4. [CA4 Laurent展開・孤立特異点・留数・偏角原理・Rouché](textbook/volumes/00_foundations/CA4/index.md)
5. [CA5 winding number・解析接続・monodromy](textbook/volumes/00_foundations/CA5/index.md)
6. [CA6 Möbius変換・Schwarz補題・調和関数・ポアソン核](textbook/volumes/00_foundations/CA6/index.md)
7. [CA7 正則関数列・正規族・Riemann 写像定理](textbook/volumes/00_foundations/CA7/index.md)
8. [CA8 Riemann 面・被覆・多価関数](textbook/volumes/00_foundations/CA8/index.md)
9. [CA9 楕円関数・Weierstrass wp 関数](textbook/volumes/00_foundations/CA9/index.md)
10. [CA10 無限積・Weierstrass 因数分解・Mittag--Leffler](textbook/volumes/00_foundations/CA10/index.md)
11. [CA11 Gamma 関数・反射公式・Stirling 公式](textbook/volumes/00_foundations/CA11/index.md)
12. [CA12 Riemann ζ 関数・theta 変換・解析接続・関数等式](textbook/volumes/00_foundations/CA12/index.md)

**院試・編入の計算演習**：[複素解析・院試／編入計算演習（A8・B10・C4、計22題）](textbook/volumes/00_foundations/F0_00CALC_複素解析_院試編入計算演習/index.md)。

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
14. [P6 特性関数・Lévy連続性定理](textbook/volumes/00_foundations/F0_00P6_特性関数_中心極限定理/index.md)
15. [P6A iid中心極限定理](textbook/volumes/00_foundations/F0_00P6A_iid_中心極限定理/index.md)
16. [P6B Poisson少数法則・希少事象三角配列](textbook/volumes/00_foundations/F0_00P6B_Poisson少数法則_希少事象列/index.md)
17. [P7 統計モデル・尤度・正則性](textbook/volumes/00_foundations/F0_00P7_統計モデル_尤度_正則性/index.md)
18. [P7A MLE一致性・漸近正規性](textbook/volumes/00_foundations/F0_00P7A_MLE_一致性_漸近正規性/index.md)
19. [P7B QMD・LAN](textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md)

---

## 3. Encore II：ODE・Fourier解析・PDE

1. [Encore II ロードマップ](textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)
2. [ODE1 一階常微分方程式・初期値問題](textbook/volumes/00_foundations/ODE1/index.md)
3. [ODE2 高階線形微分方程式](textbook/volumes/00_foundations/ODE2/index.md)
4. [ODE3 線形連立系・行列指数・安定性](textbook/volumes/00_foundations/ODE3/index.md)
5. [ODE4 非線形系・位相平面・線形化](textbook/volumes/00_foundations/ODE4/index.md)
6. [ODE5 Laplace変換と初期値問題](textbook/volumes/00_foundations/ODE5/index.md)
7. [ODE6 級数解・正則特異点](textbook/volumes/00_foundations/ODE6/index.md)
8. [ODE7 境界値問題・Sturm--Liouville](textbook/volumes/00_foundations/ODE7/index.md)
9. [ODE8 最大解・Grönwall・連続依存・流れ](textbook/volumes/00_foundations/ODE8/index.md)
10. [ODE9 Lyapunov 関数・不変集合・LaSalle](textbook/volumes/00_foundations/ODE9/index.md)
11. [ODE10 平面力学系・周期軌道・Poincaré--Bendixson](textbook/volumes/00_foundations/ODE10/index.md)
12. [ODE11 局所分岐・Poincaré 写像・周期軌道の安定性](textbook/volumes/00_foundations/ODE11/index.md)
13. [FOU1 Fourier級数・直交性・係数計算](textbook/volumes/00_foundations/FOU1/index.md)
14. [FOU2 Fourier級数の収束・Fejér・Parseval](textbook/volumes/00_foundations/FOU2/index.md)
15. [FOU3 Fourier変換・畳み込み・反転](textbook/volumes/00_foundations/FOU3/index.md)
16. [FOU4 Plancherel・L2 Fourier解析](textbook/volumes/00_foundations/FOU4/index.md)
17. [FOU5 確率・離散Fourier変換・サンプリング](textbook/volumes/00_foundations/FOU5/index.md)
18. [PDE1 PDEの基本・一次方程式・特性曲線](textbook/volumes/00_foundations/PDE1/index.md)
19. [PDE2 二階線形PDEの分類](textbook/volumes/00_foundations/PDE2/index.md)
20. [PDE3 熱方程式](textbook/volumes/00_foundations/PDE3/index.md)
21. [PDE4 波動方程式](textbook/volumes/00_foundations/PDE4/index.md)
22. [PDE5 Laplace・Poisson方程式と調和関数](textbook/volumes/00_foundations/PDE5/index.md)
23. [PDE6 Greenの恒等式・基本解・Green関数](textbook/volumes/00_foundations/PDE6/index.md)
24. [PDE7 固有関数展開・Green表現・三類型の統合](textbook/volumes/00_foundations/PDE7/index.md)
25. [PDE8 Duhamel 原理・非斉次問題](textbook/volumes/00_foundations/PDE8/index.md)
26. [PDE9 多次元波動方程式・Kirchhoff 公式・Huygens 原理](textbook/volumes/00_foundations/PDE9/index.md)
27. [PDE10 多次元 Laplace・Poisson 方程式とポテンシャル論](textbook/volumes/00_foundations/PDE10/index.md)
28. [PDE11 変数分離・Bessel・Legendre・球面調和関数](textbook/volumes/00_foundations/PDE11/index.md)
29. [PDE12 一般一階 PDE・Hamilton--Jacobi 方程式](textbook/volumes/00_foundations/PDE12/index.md)
---

## 4. Encore III：Graduate PDE

Encore II が **古典 PDE** を閉じた後、Encore III では distribution・Sobolev 空間・compactness・変分法を使う **大学院 PDE の基礎理論**へ進みます。

1. [Encore III Graduate PDE ロードマップ](textbook/volumes/00_foundations/F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)
2. [GPDE1 テスト関数・distribution](textbook/volumes/00_foundations/GPDE1/index.md)
3. [GPDE2 distribution 微分・mollifier・弱微分](textbook/volumes/00_foundations/GPDE2/index.md)
4. [GPDE3 Sobolev空間](textbook/volumes/00_foundations/GPDE3/index.md)
5. [GPDE4 H0^1・Poincare・trace](textbook/volumes/00_foundations/GPDE4/index.md)
6. [GPDE5 Sobolev embedding・compactness](textbook/volumes/00_foundations/GPDE5/index.md)
7. [GPDE6 弱形式・変分形式](textbook/volumes/00_foundations/GPDE6/index.md)
8. [GPDE7 Lax--Milgram](textbook/volumes/00_foundations/GPDE7/index.md)
9. [GPDE8 二階線形楕円型PDE](textbook/volumes/00_foundations/GPDE8/index.md)
10. [GPDE9 楕円型正則性](textbook/volumes/00_foundations/GPDE9/index.md)
11. [GPDE10 Galerkin・時間発展PDEの弱解](textbook/volumes/00_foundations/GPDE10/index.md)

Encore III では distributional solution、variational 弱解、energy solution を扱い、mild solution は橋渡しに留めます。entropy / viscosity / renormalized / measure-valued solution、Navier--Stokes の本格弱解理論、geometric analysis は別系列として扱います。

---

## 5. Encore IV：確率解析・時系列

1. [Encore IV ロードマップ](textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)

2. [STO1 確率過程・フィルトレーション・停止時刻](textbook/volumes/00_foundations/STO1/index.md)
3. [STO2 離散時間マルチンゲール・不等式・収束](textbook/volumes/00_foundations/STO2/index.md)
4. [STO2A 離散時間Markov連鎖・再帰・Green核・不変測度](textbook/volumes/00_foundations/STO2A/index.md)
5. [STO3 確率過程の構成・Kolmogorov continuity](textbook/volumes/00_foundations/STO3/index.md)
6. [STO4 ブラウン運動・到達時刻・強マルコフ性](textbook/volumes/00_foundations/STO4/index.md)
7. [STO3A 経路空間の弱収束・tightness・Donsker](textbook/volumes/00_foundations/STO3A/index.md)
8. [STO5 連続局所マルチンゲール・二次変分・セミマルチンゲール](textbook/volumes/00_foundations/STO5/index.md)
9. [STO6 確率積分](textbook/volumes/00_foundations/STO6/index.md)
10. [STO7 多次元 Itô 解析・Stratonovich](textbook/volumes/00_foundations/STO7/index.md)
11. [STO8 局所時間・Tanaka 公式](textbook/volumes/00_foundations/STO8/index.md)
12. [STO4A Brown運動の標本路幾何](textbook/volumes/00_foundations/STO4A/index.md)
13. [STO9 SDE・強解・存在一意性・局所化](textbook/volumes/00_foundations/STO9/index.md)
14. [STO10 弱解・Girsanov](textbook/volumes/00_foundations/STO10/index.md)
15. [STO11 マルコフ過程・半群・生成作用素・マルチンゲール問題](textbook/volumes/00_foundations/STO11/index.md)
16. [STO12 ブラウン運動のマルチンゲール表現](textbook/volumes/00_foundations/STO12/index.md)
17. [STO13 ポアソン過程・連続時間マルコフ連鎖・ランダム測度](textbook/volumes/00_foundations/STO13/index.md)
18. [STO14 Lévy 過程・跳躍型確率解析](textbook/volumes/00_foundations/STO14/index.md)
19. [TSA1 定常過程・Hilbert 予測](textbook/volumes/00_foundations/TSA1/index.md)
20. [TSA2 Wold 分解](textbook/volumes/00_foundations/TSA2/index.md)
21. [TSA3 Herglotz の定理・スペクトル表現](textbook/volumes/00_foundations/TSA3/index.md)
22. [TSA4 線形フィルタ・ARMA / ARIMA・周波数領域](textbook/volumes/00_foundations/TSA4/index.md)
23. [TSA5 エルゴード性・混合性・従属極限定理](textbook/volumes/00_foundations/TSA5/index.md)
24. [TSA6 状態空間・Kalman フィルタ・イノベーション](textbook/volumes/00_foundations/TSA6/index.md)

STO 系列ではマルチンゲール・ブラウン運動・二次変分・確率積分・SDE・Girsanov・Markov 過程・生成作用素・マルチンゲール表現・ポアソン / Lévy / 跳躍型確率解析まで、TSA 系列では定常過程・予測・Wold 分解・スペクトル表現・ARMA / ARIMA・エルゴード性・Kalman フィルタまでを扱います。

---

## 6. Encore V：計算数理

1. [Encore V：計算数理](textbook/volumes/00_foundations/F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)
2. [NA1 浮動小数点・誤差・条件数・安定性](textbook/volumes/00_foundations/NA1/index.md)
3. [NA2 非線形方程式・不動点反復・Newton 法](textbook/volumes/00_foundations/NA2/index.md)
4. [NA3 非線形連立方程式](textbook/volumes/00_foundations/NA3/index.md)
5. [NA4 多項式補間](textbook/volumes/00_foundations/NA4/index.md)
6. [NA5 数値積分・直交多項式・Gauss 型積分](textbook/volumes/00_foundations/NA5/index.md)
7. [NA6 ODE 数値解法 I：一段法と収束](textbook/volumes/00_foundations/NA6/index.md)
8. [NA7 ODE 数値解法 II：Runge–Kutta・絶対安定性](textbook/volumes/00_foundations/NA7/index.md)
9. [NA8 数値線形代数 I：直接法](textbook/volumes/00_foundations/NA8/index.md)
