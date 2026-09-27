# DREAM THEATER 本編

> 統計検定1級の教材を読んでいたはずが、気づけば測度論・Fourier解析・PDE・Sobolev空間・確率過程・有限要素法・Monte Carloまで来てしまった人のための入口です。

このページは **DREAM THEATER のオリエンテーション兼全体目次** です。数学的な依存関係を意識しながら、基礎科目から解析・計算・幾何・代数・応用へ広がる全体像を示します。

[全体の読む順](textbook/dream-theater-standard-math-core.md)

**読み方**

- **統計検定1級の合格が目的なら、まず通常教材を優先してください。** DREAM THEATER は、そこで使う数学を出発点に、大学数学・大学院数学の標準的な理論まで体系的に掘り下げる系列です。
- 通読するときは **全体の読む順** と各章の前提関係に沿って進んでください。章IDの番号順に読む必要はありません。
- 基礎科目を土台に、目的に応じて解析系・計算系・幾何系・代数系・応用系へ分岐できます。
- 各章では、定義と直接例、主要定理、証明、演習と詳細解答を通じて、前提章だけを既知として論証を再構成できることを目標にしています。

## 基礎科目

<a id="dt-subject-set-topology"></a>
### 集合論・位相空間論

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

<a id="dt-subject-linear-algebra"></a>
### 線形代数

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
17. [線形代数・院試／編入計算演習（A8・B10・C4、計22題）](textbook/volumes/00_foundations/F0_00CALC_線形代数_院試編入計算演習/index.md)

<a id="dt-subject-real-analysis"></a>
### 実解析

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

## 解析系

<a id="dt-subject-complex-analysis-i"></a>
### 複素解析 I

1. [CA1 複素微分・Cauchy–Riemann・初等正則関数](textbook/volumes/00_foundations/CA1/index.md)
2. [CA2 複素線積分・原始関数・Cauchy–Goursat](textbook/volumes/00_foundations/CA2/index.md)
3. [CA3 Cauchy積分公式・Taylor展開・Liouville・最大値原理](textbook/volumes/00_foundations/CA3/index.md)
4. [CA4 Laurent展開・孤立特異点・留数・偏角原理・Rouché](textbook/volumes/00_foundations/CA4/index.md)
5. [CA5 winding number・解析接続・monodromy](textbook/volumes/00_foundations/CA5/index.md)
6. [CA6 Möbius変換・Schwarz補題・調和関数・ポアソン核](textbook/volumes/00_foundations/CA6/index.md)
7. [CA7 正則関数列・正規族・Riemann 写像定理](textbook/volumes/00_foundations/CA7/index.md)
8. [複素解析・院試／編入計算演習（A8・B10・C4、計22題）](textbook/volumes/00_foundations/F0_00CALC_複素解析_院試編入計算演習/index.md)

<a id="dt-subject-complex-analysis-ii"></a>
### 複素解析 II

1. [CA8 Riemann 面・被覆・多価関数](textbook/volumes/00_foundations/CA8/index.md)
2. [CA9 楕円関数・Weierstrass wp 関数](textbook/volumes/00_foundations/CA9/index.md)
3. [CA10 無限積・Weierstrass 因数分解・Mittag--Leffler](textbook/volumes/00_foundations/CA10/index.md)
4. [CA11 Gamma 関数・反射公式・Stirling 公式](textbook/volumes/00_foundations/CA11/index.md)
5. [CA12 Riemann ζ 関数・theta 変換・解析接続・関数等式](textbook/volumes/00_foundations/CA12/index.md)

<a id="dt-subject-ode-i"></a>
### 常微分方程式 I

1. [微分方程式・Fourier解析ロードマップ](textbook/volumes/00_foundations/F0_00R2_EncoreII_Fourier解析_微分方程式/index.md)
2. [ODE1 一階常微分方程式・初期値問題](textbook/volumes/00_foundations/ODE1/index.md)
3. [ODE2 高階線形微分方程式](textbook/volumes/00_foundations/ODE2/index.md)
4. [ODE3 線形連立系・行列指数・安定性](textbook/volumes/00_foundations/ODE3/index.md)
5. [ODE4 非線形系・位相平面・線形化](textbook/volumes/00_foundations/ODE4/index.md)
6. [ODE5 Laplace変換と初期値問題](textbook/volumes/00_foundations/ODE5/index.md)
7. [ODE6 級数解・正則特異点](textbook/volumes/00_foundations/ODE6/index.md)
8. [ODE7 境界値問題・Sturm--Liouville](textbook/volumes/00_foundations/ODE7/index.md)

<a id="dt-subject-ode-ii"></a>
### 常微分方程式 II

1. [ODE8 最大解・Grönwall・連続依存・流れ](textbook/volumes/00_foundations/ODE8/index.md)
2. [ODE9 Lyapunov 関数・不変集合・LaSalle](textbook/volumes/00_foundations/ODE9/index.md)
3. [ODE10 平面力学系・周期軌道・Poincaré--Bendixson](textbook/volumes/00_foundations/ODE10/index.md)
4. [ODE11 局所分岐・Poincaré 写像・周期軌道の安定性](textbook/volumes/00_foundations/ODE11/index.md)

<a id="dt-subject-fourier-analysis"></a>
### Fourier 解析

1. [FOU1 Fourier級数・直交性・係数計算](textbook/volumes/00_foundations/FOU1/index.md)
2. [FOU2 Fourier級数の収束・Fejér・Parseval](textbook/volumes/00_foundations/FOU2/index.md)
3. [FOU3 Fourier変換・畳み込み・反転](textbook/volumes/00_foundations/FOU3/index.md)
4. [FOU4 Plancherel・L2 Fourier解析](textbook/volumes/00_foundations/FOU4/index.md)
5. [FOU5 確率・離散Fourier変換・サンプリング](textbook/volumes/00_foundations/FOU5/index.md)

<a id="dt-subject-pde-undergraduate"></a>
### 偏微分方程式（学部レベル）

1. [PDE1 PDEの基本・一次方程式・特性曲線](textbook/volumes/00_foundations/PDE1/index.md)
2. [PDE2 二階線形PDEの分類](textbook/volumes/00_foundations/PDE2/index.md)
3. [PDE3 熱方程式](textbook/volumes/00_foundations/PDE3/index.md)
4. [PDE4 波動方程式](textbook/volumes/00_foundations/PDE4/index.md)
5. [PDE5 Laplace・Poisson方程式と調和関数](textbook/volumes/00_foundations/PDE5/index.md)
6. [PDE6 Greenの恒等式・基本解・Green関数](textbook/volumes/00_foundations/PDE6/index.md)
7. [PDE7 固有関数展開・Green表現・三類型の統合](textbook/volumes/00_foundations/PDE7/index.md)
8. [PDE8 Duhamel 原理・非斉次問題](textbook/volumes/00_foundations/PDE8/index.md)
9. [PDE9 多次元波動方程式・Kirchhoff 公式・Huygens 原理](textbook/volumes/00_foundations/PDE9/index.md)
10. [PDE10 多次元 Laplace・Poisson 方程式とポテンシャル論](textbook/volumes/00_foundations/PDE10/index.md)
11. [PDE11 変数分離・Bessel・Legendre・球面調和関数](textbook/volumes/00_foundations/PDE11/index.md)
12. [PDE12 一般一階 PDE・Hamilton--Jacobi 方程式](textbook/volumes/00_foundations/PDE12/index.md)

<a id="dt-subject-measure-theory"></a>
### 測度論

1. [F0-00D2 測度・可測関数・Lebesgue積分](textbook/volumes/00_foundations/F0_00D2_測度_可測関数_Lebesgue積分_Lp/index.md)
2. [F0-00D3 外測度・Carathéodory](textbook/volumes/00_foundations/F0_00D3_外測度_Caratheodory可測性/index.md)
3. [F0-00D3A π–λ定理・Dynkin族](textbook/volumes/00_foundations/F0_00D3A_pi_lambda_Dynkin/index.md)
4. [F0-00D4 Lebesgue測度・Borel・拡張定理](textbook/volumes/00_foundations/F0_00D4_Lebesgue測度_Borel集合_拡張定理/index.md)
5. [F0-00D5 Vitali集合・非可測集合](textbook/volumes/00_foundations/F0_00D5_Vitali集合_非可測集合_選択公理/index.md)
6. [MT0 Lebesgue測度の正則性・有限単関数近似](textbook/volumes/00_foundations/MT0/index.md)
7. [F0-00D2A 単関数からLebesgue積分](textbook/volumes/00_foundations/F0_00D2A_単関数_Lebesgue積分_構成/index.md)
8. [F0-00D2B MCT・Fatou・DCT](textbook/volumes/00_foundations/F0_00D2B_単調収束_Fatou_優収束/index.md)
9. [MT1 収束様式・Egorov・Lusin](textbook/volumes/00_foundations/MT1/index.md)
10. [MT2 符号付き測度・Hahn–Jordan分解・全変動](textbook/volumes/00_foundations/MT2/index.md)
11. [MT3 Radon–Nikodym定理・Lebesgue分解](textbook/volumes/00_foundations/MT3/index.md)
12. [MT4 Lebesgue微分定理・絶対連続関数](textbook/volumes/00_foundations/MT4/index.md)
13. [MT5 Radon測度・Riesz–Markov](textbook/volumes/00_foundations/MT5/index.md)
14. [MT6 C0版Riesz–Markov・有限符号付きRadon測度](textbook/volumes/00_foundations/MT6/index.md)
15. [MT-RL Riemann積分とLebesgue積分の橋](textbook/volumes/00_foundations/MT-RL/index.md)
16. [F0-00D2C 積測度・Tonelli・Fubini](textbook/volumes/00_foundations/F0_00D2C_積測度_Tonelli_Fubini/index.md)
17. [F0-00D2D Lp・Hölder・Minkowski](textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md)
18. [F0-00D2E L2完備性・Riesz–Fischer](textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md)
19. [MT7 Lp完備性・稠密性・双対](textbook/volumes/00_foundations/MT7/index.md)
20. [MT8 Hausdorff測度・Hausdorff次元](textbook/volumes/00_foundations/MT8/index.md)

<a id="dt-subject-probability"></a>
### 確率論

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

<a id="dt-subject-functional-analysis"></a>
### 関数解析

1. [関数解析ロードマップ](textbook/volumes/00_foundations/F0_02C_関数解析_制約想定_RKHS/index.md)
2. [F0-00D1 ノルム・Banach](textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md)
3. [F0-02C1 Banach・Hilbert](textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md)
4. [F0-02C1A Hilbert射影定理](textbook/volumes/00_foundations/F0_02C1A_Hilbert射影定理_直交分解/index.md)
5. [F0-02C2 双対空間・Riesz](textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md)
6. [F0-02C3A Banach双対・Hilbert随伴](textbook/volumes/00_foundations/F0_02C3A_随伴作用素_Banach_Hilbert/index.md)
7. [F0-02C3B Fréchet連鎖律・Hilbert随伴の証明](textbook/volumes/00_foundations/F0_02C3B_Frechet_chain_adjoint_proofs/index.md)
8. [FA1 Banach空間の商・Baire・一様有界性原理](textbook/volumes/00_foundations/FA1/index.md)
9. [FA2 開写像定理・有界逆定理・閉グラフ定理](textbook/volumes/00_foundations/FA2/index.md)
10. [F0-02C6 Hahn–Banach](textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md)
11. [FA3 弱位相・弱*位相・標準埋め込み](textbook/volumes/00_foundations/FA3/index.md)
12. [FA4 Banach–Alaoglu・Goldstine・反射性](textbook/volumes/00_foundations/FA4/index.md)
13. [FA5 スペクトル・レゾルベント](textbook/volumes/00_foundations/FA5/index.md)
14. [FA6 コンパクト作用素](textbook/volumes/00_foundations/FA6/index.md)
15. [FA7 コンパクト自己共役作用素・Fredholm alternative](textbook/volumes/00_foundations/FA7/index.md)
16. [F0-02C6A 分離定理・Minkowski・Farkas](textbook/volumes/00_foundations/F0_02C6A_分離定理_Minkowski_Farkas/index.md)

<a id="dt-subject-pde-graduate"></a>
### 偏微分方程式（大学院レベル）

1. [弱解・Sobolev空間・PDEロードマップ](textbook/volumes/00_foundations/F0_00R3_EncoreIII_Distributions_Sobolev_Weak/index.md)
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

<a id="dt-subject-stochastic-analysis"></a>
### 確率解析

1. [確率解析・時系列ロードマップ](textbook/volumes/00_foundations/F0_00R4_EncoreIV_Stochastic_Spectral_TimeSeries/index.md)
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

<a id="dt-subject-time-series"></a>
### 時系列解析（大学院レベル）

1. [TSA1 定常過程・Hilbert 予測](textbook/volumes/00_foundations/TSA1/index.md)
2. [TSA2 Wold 分解](textbook/volumes/00_foundations/TSA2/index.md)
3. [TSA3 Herglotz の定理・スペクトル表現](textbook/volumes/00_foundations/TSA3/index.md)
4. [TSA4 線形フィルタ・ARMA / ARIMA・周波数領域](textbook/volumes/00_foundations/TSA4/index.md)
5. [TSA5 エルゴード性・混合性・従属極限定理](textbook/volumes/00_foundations/TSA5/index.md)
6. [TSA6 状態空間・Kalman フィルタ・イノベーション](textbook/volumes/00_foundations/TSA6/index.md)

## 計算系

<a id="dt-subject-numerical-analysis"></a>
### 数値解析

1. [数値解析・FEM・Monte Carloロードマップ](textbook/volumes/00_foundations/F0_00R5_EncoreV_Numerical_FEM_MonteCarlo/index.md)
2. [NA1 浮動小数点・誤差・条件数・安定性](textbook/volumes/00_foundations/NA1/index.md)
3. [NA2 非線形方程式・不動点反復・Newton 法](textbook/volumes/00_foundations/NA2/index.md)
4. [NA3 非線形連立方程式](textbook/volumes/00_foundations/NA3/index.md)
5. [NA4 多項式補間](textbook/volumes/00_foundations/NA4/index.md)
6. [NA5 数値積分・直交多項式・Gauss 型積分](textbook/volumes/00_foundations/NA5/index.md)
7. [NA6 ODE 数値解法 I：一段法と収束](textbook/volumes/00_foundations/NA6/index.md)
8. [NA7 ODE 数値解法 II：Runge–Kutta・絶対安定性](textbook/volumes/00_foundations/NA7/index.md)
9. [NA8 数値線形代数 I：直接法](textbook/volumes/00_foundations/NA8/index.md)
10. [NA9 数値線形代数 II：反復法・Krylov 法](textbook/volumes/00_foundations/NA9/index.md)
11. [NA10 固有値数値計算](textbook/volumes/00_foundations/NA10/index.md)
12. [NA11 Perron–Frobenius 理論と PageRank](textbook/volumes/00_foundations/NA11/index.md)
13. [NA12 無制約最適化と共役勾配法](textbook/volumes/00_foundations/NA12/index.md)
14. [PYNUM1 Python 数値計算速習](textbook/volumes/00_foundations/PYNUM1/index.md)
15. [NUMLAB0 計算機演習基盤](textbook/volumes/00_foundations/NUMLAB0/index.md)
16. [NUMLAB1 数値解析演習](textbook/volumes/00_foundations/NUMLAB1/index.md)

<a id="dt-subject-fdm"></a>
### 差分法

1. [FDM1 熱方程式と差分法の導入](textbook/volumes/00_foundations/FDM1/index.md)
2. [FDM2 差分スキームの安定性](textbook/volumes/00_foundations/FDM2/index.md)
3. [FDM3 整合性・安定性・収束性](textbook/volumes/00_foundations/FDM3/index.md)
4. [FDM4 移流拡散と風上化](textbook/volumes/00_foundations/FDM4/index.md)
5. [NUMLAB2 差分法演習](textbook/volumes/00_foundations/NUMLAB2/index.md)

<a id="dt-subject-fem"></a>
### 有限要素法

1. [FEM1 Poisson 方程式・変分形式・Galerkin 法](textbook/volumes/00_foundations/FEM1/index.md)
2. [FEM2 三角形分割・局所基底・組立て](textbook/volumes/00_foundations/FEM2/index.md)
3. [FEM3 有限要素補間とメッシュ](textbook/volumes/00_foundations/FEM3/index.md)
4. [FEM4 楕円型 FEM の誤差解析](textbook/volumes/00_foundations/FEM4/index.md)
5. [FEM5 鞍点問題・Stokes 方程式](textbook/volumes/00_foundations/FEM5/index.md)
6. [FEM6 放物型方程式の有限要素法](textbook/volumes/00_foundations/FEM6/index.md)
7. [FEM7 移流拡散・安定化有限要素法](textbook/volumes/00_foundations/FEM7/index.md)
8. [NUMLAB3 有限要素法演習](textbook/volumes/00_foundations/NUMLAB3/index.md)

<a id="dt-subject-monte-carlo"></a>
### Monte Carlo 法

1. [MC1 Monte Carlo 法と統計的誤差](textbook/volumes/00_foundations/MC1/index.md)
2. [MC2 乱数生成とサンプリング](textbook/volumes/00_foundations/MC2/index.md)
3. [MC3 分散減少法](textbook/volumes/00_foundations/MC3/index.md)
4. [MC4 Multilevel Monte Carlo](textbook/volumes/00_foundations/MC4/index.md)
5. [NUMLAB4 Monte Carlo 演習](textbook/volumes/00_foundations/NUMLAB4/index.md)

<a id="dt-subject-qmc"></a>
### 準 Monte Carlo 法

1. [QMC1 一様分布・ディスクレパンシー・Koksma--Hlawka](textbook/volumes/00_foundations/QMC1/index.md)
2. [QMC2 RKHS・最悪誤差・重み付き空間](textbook/volumes/00_foundations/QMC2/index.md)
3. [QMC3 格子則](textbook/volumes/00_foundations/QMC3/index.md)
4. [QMC4 $(t,m,s)$-net・$(t,s)$-sequence](textbook/volumes/00_foundations/QMC4/index.md)
5. [QMC5 Walsh 解析とデジタルネットの双対理論](textbook/volumes/00_foundations/QMC5/index.md)
6. [QMC6 多項式格子](textbook/volumes/00_foundations/QMC6/index.md)
7. [QMC7 ランダム化準 Monte Carlo 法](textbook/volumes/00_foundations/QMC7/index.md)
8. [QMC8 高次準 Monte Carlo 法](textbook/volumes/00_foundations/QMC8/index.md)
9. [NUMLAB5 準 Monte Carlo 演習](textbook/volumes/00_foundations/NUMLAB5/index.md)

<a id="dt-subject-discrete-optimization"></a>
### 離散最適化

1. [DOPT1 整数計画・LP 緩和](textbook/volumes/00_foundations/DOPT1/index.md)
2. [DOPT2 ネットワーク最適化](textbook/volumes/00_foundations/DOPT2/index.md)
3. [DOPT3 マッチング・割当問題](textbook/volumes/00_foundations/DOPT3/index.md)
4. [DOPT4 全単模性・整数多面体](textbook/volumes/00_foundations/DOPT4/index.md)

## 幾何系

<a id="dt-subject-vector-calculus-i"></a>
### ベクトル解析 I

1. [VC1 ベクトル場と微分演算子](textbook/volumes/00_foundations/VC1/index.md)
2. [VC2 曲線・線積分・保存場](textbook/volumes/00_foundations/VC2/index.md)
3. [VC3 曲面・向き・曲面積分・flux](textbook/volumes/00_foundations/VC3/index.md)
4. [VC4 Green・Gauss--Ostrogradsky と保存則](textbook/volumes/00_foundations/VC4/index.md)
5. [VC5 Stokes theorem・curl・topology](textbook/volumes/00_foundations/VC5/index.md)
6. [VC6 直交曲線座標](textbook/volumes/00_foundations/VC6/index.md)
7. [VC7 添字記法・直交基底・成分変換](textbook/volumes/00_foundations/VC7/index.md)

<a id="dt-subject-vector-calculus-ii"></a>
### ベクトル解析 II

1. [VC8 Newton ポテンシャル・Helmholtz 分解](textbook/volumes/00_foundations/VC8/index.md)
2. [VC9 保存則・流体・Maxwell 方程式](textbook/volumes/00_foundations/VC9/index.md)

<a id="dt-subject-differential-geometry-i"></a>
### 微分幾何 I

1. [GEO1 滑らかな多様体・滑らかな写像](textbook/volumes/00_foundations/GEO1/index.md)
2. [GEO2 接空間・余接空間・微分・接束](textbook/volumes/00_foundations/GEO2/index.md)
3. [GEO3 階数定理・はめ込み・沈め込み・部分多様体](textbook/volumes/00_foundations/GEO3/index.md)
4. [GEO4 1 の分割・局所化・埋め込み](textbook/volumes/00_foundations/GEO4/index.md)
5. [GEO5 ベクトル場・積分曲線・局所流・Lie 括弧](textbook/volumes/00_foundations/GEO5/index.md)
6. [GEO6 線形分布・積分多様体・Frobenius の定理](textbook/volumes/00_foundations/GEO6/index.md)
7. [GEO7 テンソル場・微分形式・外微分](textbook/volumes/00_foundations/GEO7/index.md)
8. [GEO8 向き・多様体上の積分・一般 Stokes の定理](textbook/volumes/00_foundations/GEO8/index.md)
9. [GEO9 Poincaré の補題・de Rham コホモロジー入門](textbook/volumes/00_foundations/GEO9/index.md)

<a id="dt-subject-differential-geometry-ii"></a>
### 微分幾何 II

1. [GEO10 Euclid 空間の曲線・超曲面 I：基本形式と形作用素](textbook/volumes/00_foundations/GEO10/index.md)
2. [GEO11 Euclid 空間の超曲面 II：構造方程式・Gauss--Codazzi・基本定理](textbook/volumes/00_foundations/GEO11/index.md)
3. [GEO12 Riemann 計量・長さ・距離・体積](textbook/volumes/00_foundations/GEO12/index.md)
4. [GEO13 アフィン接続・Levi-Civita 接続・平行移動](textbook/volumes/00_foundations/GEO13/index.md)
5. [GEO14 測地線・指数写像・正規座標](textbook/volumes/00_foundations/GEO14/index.md)
6. [GEO15 完備性・Hopf--Rinow](textbook/volumes/00_foundations/GEO15/index.md)
7. [GEO16 Riemann 曲率](textbook/volumes/00_foundations/GEO16/index.md)
8. [GEO17 変分公式・Jacobi 場・共役点](textbook/volumes/00_foundations/GEO17/index.md)
9. [GEO18 比較幾何入門](textbook/volumes/00_foundations/GEO18/index.md)
10. [GEO19 Gauss--Bonnet と二次元大域幾何](textbook/volumes/00_foundations/GEO19/index.md)

## 代数系

<a id="dt-subject-abstract-algebra"></a>
### 抽象代数

1. [GRP1 群・部分群・巡回群・置換群](textbook/volumes/00_foundations/GRP1/index.md)
2. [GRP2 準同型・剰余類・正規部分群・商群](textbook/volumes/00_foundations/GRP2/index.md)
3. [GRP3 群作用・軌道・安定化群・共役](textbook/volumes/00_foundations/GRP3/index.md)
4. [GRP4 Cauchy の定理・Sylow の定理・有限群への応用](textbook/volumes/00_foundations/GRP4/index.md)
5. [RNG1 環・環準同型・イデアル・商環](textbook/volumes/00_foundations/RNG1/index.md)
6. [RNG2 素イデアル・極大イデアル・中国剰余定理](textbook/volumes/00_foundations/RNG2/index.md)
7. [RNG3 整除・Euclid 整域・単項イデアル整域・一意分解整域](textbook/volumes/00_foundations/RNG3/index.md)
8. [RNG4 多項式環・Gauss の補題・既約多項式](textbook/volumes/00_foundations/RNG4/index.md)
9. [MOD1 加群・部分加群・商加群・自由加群](textbook/volumes/00_foundations/MOD1/index.md)
10. [MOD2 Smith 標準形・PID 上有限生成加群](textbook/volumes/00_foundations/MOD2/index.md)
11. [FLD1 体拡大・代数的元・最小多項式](textbook/volumes/00_foundations/FLD1/index.md)
12. [FLD2 分解体・分離性・正規性](textbook/volumes/00_foundations/FLD2/index.md)
13. [FLD3 有限体](textbook/volumes/00_foundations/FLD3/index.md)
14. [FLD4 有限 Galois 理論](textbook/volumes/00_foundations/FLD4/index.md)
15. [FLD5 Galois 理論の応用：作図可能性・根号による可解性](textbook/volumes/00_foundations/FLD5/index.md)

<a id="dt-subject-lie-theory"></a>
### Lie 理論

1. [LIE1 Lie 群・Lie 環・不変ベクトル場](textbook/volumes/00_foundations/LIE1/index.md)
2. [LIE2 1パラメータ部分群・指数写像・随伴表現](textbook/volumes/00_foundations/LIE2/index.md)
3. [LIE3 Lie 部分群・古典群](textbook/volumes/00_foundations/LIE3/index.md)
4. [LIE4 Lie 群作用・軌道・等質空間・Maurer--Cartan](textbook/volumes/00_foundations/LIE4/index.md)

## 応用系

<a id="dt-subject-convex-optimization"></a>
### 凸解析・最適化

1. [OPT1 凸集合・凸関数・凸最適化](textbook/volumes/00_foundations/OPT1/index.md)
2. [OPT2 射影・支持超平面・分離・Farkas](textbook/volumes/00_foundations/OPT2/index.md)
3. [OPT3 閉真凸関数・劣微分・法錐](textbook/volumes/00_foundations/OPT3/index.md)
4. [OPT4 Fenchel 共役・凸双対](textbook/volumes/00_foundations/OPT4/index.md)
5. [OPT5 Lagrange 双対・Slater 条件・KKT](textbook/volumes/00_foundations/OPT5/index.md)
6. [OPT6 KKT の幾何学的導出・制約想定](textbook/volumes/00_foundations/OPT6/index.md)
7. [OPT6A 錐制約・一般化 KKT](textbook/volumes/00_foundations/OPT6A/index.md)
8. [OPT7 滑らかな凸最適化](textbook/volumes/00_foundations/OPT7/index.md)
9. [OPT8 非滑らか・近接最適化](textbook/volumes/00_foundations/OPT8/index.md)
10. [OPT9 制約付き数値最適化](textbook/volumes/00_foundations/OPT9/index.md)
11. [OPT10 線形計画 I：多面体・極点・双対](textbook/volumes/00_foundations/OPT10/index.md)
12. [OPT11 線形計画 II：単体法・内点法・感度解析](textbook/volumes/00_foundations/OPT11/index.md)
13. [OPT12 二次計画・錐計画入門](textbook/volumes/00_foundations/OPT12/index.md)

<a id="dt-subject-fixed-point"></a>
### 不動点理論

1. [FIX1 Sperner の補題・Brouwer 不動点定理](textbook/volumes/00_foundations/FIX1/index.md)
2. [FIX2 集合値写像・対応](textbook/volumes/00_foundations/FIX2/index.md)
3. [FIX3 Berge 最大値定理・Kakutani 不動点定理](textbook/volumes/00_foundations/FIX3/index.md)

<a id="dt-subject-rkhs"></a>
### RKHS・カーネル法

1. [RKHS1 再生核 Hilbert 空間・Moore--Aronszajn](textbook/volumes/00_foundations/RKHS1/index.md)
2. [RKHS2 正則化問題の表現定理](textbook/volumes/00_foundations/RKHS2/index.md)
3. [RKHS3 カーネルリッジ回帰](textbook/volumes/00_foundations/RKHS3/index.md)
4. [RKHS4 最大マージンとハードマージン SVM](textbook/volumes/00_foundations/RKHS4/index.md)
5. [RKHS5 ソフトマージン・ヒンジ損失・カーネル SVM](textbook/volumes/00_foundations/RKHS5/index.md)

<a id="dt-subject-microeconomics"></a>
### ミクロ経済学

1. [MICRO1 選好・効用・凸性](textbook/volumes/00_foundations/MICRO1/index.md)
2. [MICRO2 消費者最適化・需要](textbook/volumes/00_foundations/MICRO2/index.md)
3. [MICRO3 消費者双対性](textbook/volumes/00_foundations/MICRO3/index.md)
4. [MICRO4 生産者理論](textbook/volumes/00_foundations/MICRO4/index.md)
5. [MICRO5 Pareto 効率・社会計画問題・厚生定理](textbook/volumes/00_foundations/MICRO5/index.md)
6. [MICRO6 純粋交換経済・Walras 均衡](textbook/volumes/00_foundations/MICRO6/index.md)
7. [MICRO7 一般均衡の存在](textbook/volumes/00_foundations/MICRO7/index.md)
8. [MICRO8 Arrow--Debreu 経済](textbook/volumes/00_foundations/MICRO8/index.md)

<a id="dt-subject-game-theory"></a>
### ゲーム理論

1. [GAME-A1 戦略形ゲーム・最適反応・Nash 均衡](textbook/volumes/00_foundations/GAME-A1/index.md)
2. [GAME-A2 混合戦略・ゼロ和ゲーム・ミニマックス](textbook/volumes/00_foundations/GAME-A2/index.md)
3. [GAME-A3 Nash 均衡の存在](textbook/volumes/00_foundations/GAME-A3/index.md)
4. [GAME-A4 凹ゲーム・KKT・変分不等式](textbook/volumes/00_foundations/GAME-A4/index.md)
5. [GAME-A5 展開形ゲーム・部分ゲーム完全均衡](textbook/volumes/00_foundations/GAME-A5/index.md)
6. [GAME-A6 繰り返しゲーム・トリガー戦略](textbook/volumes/00_foundations/GAME-A6/index.md)
7. [GAME-A7 フォーク定理入門](textbook/volumes/00_foundations/GAME-A7/index.md)
8. [GAME-A8 ベイジアンゲーム・Bayesian Nash 均衡](textbook/volumes/00_foundations/GAME-A8/index.md)
9. [GAME-A9 オークション理論入門](textbook/volumes/00_foundations/GAME-A9/index.md)
10. [GAME-A10 動学的不完備情報・信念・Perfect Bayesian Equilibrium](textbook/volumes/00_foundations/GAME-A10/index.md)
11. [GAME-A11 シグナリング・スクリーニング・チープトーク入門](textbook/volumes/00_foundations/GAME-A11/index.md)
12. [GAME-B1 特性関数形ゲーム・コア](textbook/volumes/00_foundations/GAME-B1/index.md)
13. [GAME-B2 平衡ゲーム・Bondareva--Shapley の定理](textbook/volumes/00_foundations/GAME-B2/index.md)
14. [GAME-B3 Shapley 値・限界貢献・公理化](textbook/volumes/00_foundations/GAME-B3/index.md)
15. [GAME-B4 凸ゲーム・優モジュラ性](textbook/volumes/00_foundations/GAME-B4/index.md)
16. [GAME-B5 最小コア・仁](textbook/volumes/00_foundations/GAME-B5/index.md)
17. [GAME-B6 投票ゲーム・投票力指数](textbook/volumes/00_foundations/GAME-B6/index.md)
18. [GAME-C1 Nash 交渉問題](textbook/volumes/00_foundations/GAME-C1/index.md)
19. [GAME-C2 Nash 交渉解の公理化](textbook/volumes/00_foundations/GAME-C2/index.md)
20. [GAME-C3 代替的交渉解](textbook/volumes/00_foundations/GAME-C3/index.md)
21. [GAME-C4 Rubinstein 交渉](textbook/volumes/00_foundations/GAME-C4/index.md)
22. [GAME-C5 交渉力の比較静学・外部選択肢・決裂リスク](textbook/volumes/00_foundations/GAME-C5/index.md)
23. [GAME-C6 公理的交渉解の非協力的基礎](textbook/volumes/00_foundations/GAME-C6/index.md)
24. [GAME-C7 不完備情報下の交渉入門](textbook/volumes/00_foundations/GAME-C7/index.md)
