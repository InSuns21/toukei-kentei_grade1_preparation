# DREAM THEATER 最適輸送・Wasserstein 幾何 — 独立全26講PLAN

作成日: 2026-10-10  
改訂日: 2026-11-08（標準教科書との照合・全26講の設計確定）
更新日: 2026-11-09（OTR21 の実装進捗を反映）
状態: in_progress（OTR1–OTR21 の本文・系列manifest・公開導線を実装。OTR22–OTR26 は未実装）

## 0. 中心問い・到達点

質量を保存しながら確率分布を移す最小費用を考えると、**確率測度の距離・測地線・時間発展**がどのように生まれるか。Monge の写像から Kantorovich の結合へ移る理由を反例とともに理解し、双対性、最適写像、$W_p$ の位相、動的輸送、勾配流を自力で証明・計算できることを目標とする。

終点は、確率密度の連続の方程式、熱・Fokker–Planck 方程式の Wasserstein 勾配流としての解釈、JKO 時間離散化の根拠、有限離散輸送の Sinkhorn 計算の違いを説明できるところに置く。score-based diffusion / flow matching へは**定義と仮定の違いを明示する接続**だけを行い、そのモデル理論は ML2 に委ねる。

**OTR は ML2 の基礎的な生成モデル説明の必須前提ではない。** ML/PML/確率解析の傘下には入れず、独立した発展数学科目とする。

## 1. 教科書照合と講数決定

次の市販・公開教科書の構成を突き合わせた。章題は対応箇所を示すもので、説明・問題・証明は転載せず独自に構成する。

| 参照する教科書・テキスト | 対応する主題 | このPLANへの反映 |
|---|---|---|
| [Santambrogio, *Optimal Transport for Applied Mathematicians* (2015)](https://link.springer.com/book/10.1007/978-3-319-20828-2) | Ch. 1 *Primal and dual problems*、Ch. 2 *One-dimensional issues*、Ch. 5 *Wasserstein distances and curves*、Ch. 6 *Benamou-Brenier*、Ch. 7 *Functionals*、Ch. 8 *Gradient flows* | 双対・一次元・動的輸送・汎関数・勾配流を別の証明単位に分ける骨格 |
| [Villani, *Optimal Transport: Old and New* (2009)](https://link.springer.com/book/10.1007/978-3-540-71050-9) | *Cyclical monotonicity and Kantorovich duality*、*The Wasserstein distances*、*Displacement interpolation*、*Solution of the Monge problem* | 循環単調性・Brenier 定理・測地線の仮定と証明を独立して扱う |
| [Ambrosio–Gigli–Savaré, *Gradient Flows*, 2nd ed. (2008)](https://link.springer.com/book/10.1007/978-3-7643-8722-8) | *Absolutely Continuous Curves ... and the Continuity Equation*、*Convex Functionals*、*Metric Slope and Subdifferential Calculus*、*Gradient Flows and Curves of Maximal Slope* | 連続の方程式・metric derivative・JKO の存在・収束を同一講に押し込まない |
| [Peyré–Cuturi, *Computational Optimal Transport* (2019)](https://optimaltransport.github.io/book/) | 離散最適輸送、双対、エントロピー正則化、Sinkhorn 法 | JKO とエントロピー正則化OTを分離し、後者は有限行列で実装・検証する |

**講数を全26講に確定する。** 4部構成：第1部7講（定式化・双対）、第2部9講（Wasserstein空間と写像）、第3部8講（動的輸送・勾配流）、第4部2講（数値解法と接続）。26は最低問題数や時間割から逆算した数ではなく、証明の前提・中間補題・反例・演習を閉じるための章境界である。1セメスター・15週・90分という制約は置かない。**講数は設計上確定**し、実執筆で重要な未証明補題が判明した場合は、証明を削らず根拠を記してPLAN改訂を行う。

以下の `OTR1`–`OTR26` は計画済み講義IDであり、既存の公開章・完了statusを意味しない。着手時にID衝突、series manifest、chapter metadata、knowledge DAG、公開目次を照合する。

## 2. 26講の正式シラバス

### 第1部：輸送問題と双対（OTR1–OTR7、7講）

| 講 | 中心問い | 主要定義・証明・再現可能な計算 |
|---|---|---|
| OTR1 | 写像で質量を運ぶとは何か | 押し出し測度 $T_{\#}\mu$、Monge 問題と保存則。原子測度から非原子的測度への写像が存在しない例、最適写像の非存在例。 |
| OTR2 | 分割して運べば何が解消するか | coupling $\Pi(\mu,\nu)$、周辺分布、Kantorovich primal、$(\mathrm{id},T)_{\#}\mu$ の埋め込み。有限例で Monge と Kantorovich の差を検証。 |
| OTR3 | 最適結合はいつ存在するか | tightness・狭義収束（弱収束）・下半連続性による直接法。まずコンパクト空間、次に Polish 空間上の非負・下半連続費用への拡張を仮定付きで証明。 |
| OTR4 | 離散輸送はどんな最適化問題か | 輸送多面体、行列の行・列和制約、有限次元線形計画。$2\times2$、$3\times3$ 例の primal を手計算し、退化と非一意性を確認。 |
| OTR5 | 双対変数は何を保証するか | 有限LP双対、弱双対・強双対・相補性条件。具体的な primal/dual 最適証明書を構成。 |
| OTR6 | 連続空間でも双対性は成立するか | Kantorovich ポテンシャル、$c$-transform。まずコンパクト空間・連続費用で双対の証明を閉じ、非コンパクトな一般化の追加条件を区別。 |
| OTR7 | 最適性を支持集合から判定できるか | $c$-循環単調性と双対等号、二次費用での単調性。双対ポテンシャルと最適支持の往復を証明し、単調ではあっても一般の $c$-最適性を保証しない例を確認。 |

### 第2部：Wasserstein空間・最適写像・測地線（OTR8–OTR16、9講）

| 講 | 中心問い | 主要定義・証明・再現可能な計算 |
|---|---|---|
| OTR8 | 輸送費用は距離になるか | $\mathcal P_p(X)$ と有限 $p$ 次モーメント、$W_p$、gluing lemma、Minkowski 不等式による三角不等式。$p\ge1$ と基礎空間の距離を明示。 |
| OTR9 | $W_p$ 収束は何を意味するか | 狭義収束＋$p$ 次モーメント収束との同値、完備性・可分性（基礎空間も完備・可分な場合）。質量が遠方へ逃げる反例。 |
| OTR10 | $W_1$ はLipschitz関数で測れるか | Kantorovich–Rubinstein 双対。Lipschitz 半ノルムと確率測度の差、離散例・反例。双対成立の仮定を証明の位置ごとに記す。 |
| OTR11 | 一次元なら輸送を陽に解けるか | 単調結合、一般化逆関数（quantile）、$W_p^p=\int_0^1|F_\mu^{-1}-F_\nu^{-1}|^p$。原子がある場合の最適**結合**と、写像の存在条件を区別。 |
| OTR12 | 二次費用で凸解析が現れる理由は | $c(x,y)=|x-y|^2/2$ と循環単調性、凸関数の劣微分、Rockafellar 型構成、凸関数のほとんど至る所での微分可能性を Brenier に必要な粒度で準備・証明。 |
| OTR13 | いつ最適結合は凸勾配写像で表せるか | Brenier 定理（$\mathbb R^d$、$\mu\ll\mathcal L^d$、$\mu,\nu\in\mathcal P_2$）の存在・$\mu$-a.e.一意性と証明。source の絶対連続性を外した反例。 |
| OTR14 | Gaussian 分布間の $W_2$ はどう計算するか | 平均差と共分散行列の公式。まず正定値共分散で線形最適写像を導き、半正定値・退化例への極限と一意性の注意を分ける。 |
| OTR15 | 測度空間の最短経路とは | displacement interpolation、$W_2$ 定速測地線、最適結合からの構成。混合分布の線形補間との相違を具体計算。 |
| OTR16 | 汎関数の凸性は測地線で変わるか | 位置エネルギー・相互作用・内部エネルギーの displacement convexity。滑らかな正密度でのJacobian・行列式評価を導き、一般化に必要な条件を明示。 |

### 第3部：動的輸送と確率測度の勾配流（OTR17–OTR24、8講）

| 講 | 中心問い | 主要定義・証明・再現可能な計算 |
|---|---|---|
| OTR17 | 密度を時間発展させる保存則は | 連続の方程式 $\partial_t\rho+\nabla\cdot(\rho v)=0$ の弱形式、流束、初期条件、境界の no-flux 条件。密度がない測度解も定義してから使う。 |
| OTR18 | 測度曲線の速さを定義できるか | $W_2$-絶対連続曲線・metric derivative・速度場・superposition principle。OTR19で使う範囲の主張・近似補題・証明と $L^2(\rho)$ 速度の評価をここで閉じる。 |
| OTR19 | 静的最適輸送と流体作用は等価か | Benamou–Brenier の $W_2^2$ 動的定式化。$(\rho,m)$、$|m|^2/\rho$（$\rho=0$ での規約）、両不等式、境界条件と有限作用の仮定まで閉じる。 |
| OTR20 | Otto 計算の「接ベクトル」は何か | 速度場の勾配への射影、連続の方程式での接方向、第一変分と形式的 $W_2$ 勾配。有限次元Riemann計量との類似を**形式計算**と厳密な計量構造に分ける。 |
| OTR21 | どのエネルギーがどのPDEを生むか | entropy $\int\rho\log\rho$、外場 $\int V\,d\rho$、相互作用の第一変分。滑らかな場合の熱・Fokker–Planck 導出、自由エネルギー減少・Fisher情報の計算と境界項。 |
| OTR22 | 勾配流を変分最小化で離散化できるか | JKO 反復 $\rho^{k+1}\in\arg\min_\rho\{\mathcal F(\rho)+W_2^2(\rho,\rho^k)/(2\tau)\}$、最小化解の存在・エネルギー評価。$\tau>0$ と有界下性・tightnessを確認。 |
| OTR23 | JKO の一歩はPDEにどう近づくか | 最適性条件・Euler–Lagrange 式の弱い導出、第一変分、離散散逸不等式と時間補間。密度・正則性の仮定を明示。 |
| OTR24 | 時間刻みをゼロにすると何が得られるか | 熱/Fokker–Planck の採用モデルで $\tau\downarrow0$ のコンパクト性、弱方程式への移行、解の一意性（適切な凸性/EVI または PDE 評価）。主張した範囲の核心証明を完結させる。 |

### 第4部：計算と生成モデルへの接続（OTR25–OTR26、2講）

| 講 | 中心問い | 主要定義・証明・再現可能な計算 |
|---|---|---|
| OTR25 | 離散OTを安定して近似するには | 有限次元の結合エントロピー正則化、厳密凸性、双対、Sinkhorn の行列スケーリング反復、log-domain 実装。正則化パラメータとゼロ極限の条件を区別。 |
| OTR26 | 理論と数値解はどこまで一致するか | 離散primal/dual、一次元quantile、Gaussian $W_2$、連続の方程式・自由エネルギー散逸、Sinkhorn の誤差と残差を再現実験。score matching / reverse-time diffusion / flow matching と OT 測地線・JKO を対応づけ、**同値でないこと**も反例・式で確認。 |

## 3. 前提・正本・実装時の依存ゲート

| 到達区間 | 必要な既習内容と実装時の照合対象 | この科目内で補う橋渡し |
|---|---|---|
| OTR1–OTR7 | MT（Borel確率測度・積分・押し出し・弱収束）、確率論、OPT（凸最適化・有限LP双対）、必要な位相 | coupling、tightnessから存在、一般費用の下半連続性、$c$-transform の使用順 |
| OTR8–OTR16 | MT・確率論、RA/FA の収束と凸解析、LA の行列・正定値性 | gluing・モーメント条件・quantile・凸劣微分・Brenier のa.e.微分可能性 |
| OTR17–OTR24 | VC9 の質量流束・連続の式、PDE/GPDE の弱方程式・積分 by parts・時間発展、変分法の直接法 | 測度解・弱連続の方程式・metric derivative・速度場・JKO のコンパクト性 |
| OTR25–OTR26 | OPT/LA の双対と行列計算、ML2/PMLの用語は**相互参照に限る** | KL正則化と物理的自由エネルギーの別物性、log-sum-exp 安定化、残差検証 |

既存の MT/OPT/FA/PDE/GPDE 等で既習とみなすのは**実在する定義・定理の適用条件が一致する場合だけ**とする。執筆開始時に `chapter.yaml`/`knowledge.yaml` と canonical stable anchor を実照合し、未導入・到達不能なら OTR に補題を置くか前提変更を明示してから章を確定する。後続の ML2/PML を OTR の証明へ逆輸入しない。

### 数学上の停止線と証明方針

1. **空間と費用を固定してから定理を述べる。** 一般の確率測度上の existence/duality と、$\mathcal P_p(X)$ 上の距離を混同しない。コンパクト連続費用での証明から Polish 空間の l.s.c. 費用へ移るときは tightness、可積分性、dual potential の条件を再確認する。
2. **Monge と Kantorovich は別問題。** 原子の有無・source の絶対連続性を落とした反例を各使用位置で示す。$W_p$ は $p\ge1$、基準点について有限 $p$ 次モーメントの確率測度上で定義する。
3. **Brenier は仮定付き定理。** 二次費用・Euclid空間・source のLebesgue絶対連続性・二次モーメントを明記する。凸劣微分・ほとんど至る所の微分可能性を導入しないまま $T=\nabla\varphi$ と書かない。
4. **Benamou–Brenier には両方向の証明が必要。** 速度場から結合を作る議論には superposition/近似等の適用条件を示し、形式的な微分だけで全一般性を主張しない。真空部分の $|m|^2/\rho$ の定義を固定する。
5. **幾何学的勾配流と古典PDE解を区別する。** entropy・potential・JKO の存在・収束はそれぞれ必要な下半連続性・下界・境界条件・初期データを持つ採用モデルで証明する。$\partial_t\rho=\Delta\rho+\nabla\cdot(\rho\nabla V)$ はまず滑らかな正密度と境界項消失の下で導出し、弱解への拡張は OTR24 で処理する。
6. **二種類の「エントロピー」を混線させない。** OTR21–24の $\int\rho\log\rho$ は密度の自由エネルギー、OTR25の coupling entropy は有限輸送行列への正則化であり、JKOそのものではない。score/flow matching も勾配流の別名ではない。
7. **未証明の一般版を証明済み扱いしない。** McCannの一般条件、非コンパクト双対、superpositionの全一般性、一般曲率空間のEVIなど、採用仮定を越える高度定理は必要補題と証明の所有先を確定し、扱わない範囲は発展項目と明記する。一般Riemann多様体のLaplace–Beltrami・拡散半群は幾何解析/確率解析IIに委ねる。

## 4. 演習・計算・完成ゲート

- **各講に導入と直接例を置き、原則 Level A 4題・B 3題・C 1題以上と全問の詳細解答**を付ける。数字合わせはせず、各講の主要学習目標、仮定の破綻例、proof step を自力で確認させる。
- 手計算ゲート：有限輸送のprimal/dualと相補性、$W_1$ Lipschitz双対、一次元quantile、非可換な共分散行列の Gaussian $W_2$、自由エネルギーの第一変分、JKO 一歩の Euler–Lagrange 式を、仮定と中間式付きで解き直す。
- 数値ゲート：有限輸送行列の質量保存・dual gap、Sinkhorn の周辺残差と正則化誤差、一次元quantileと数値OTの一致、Gaussian公式との照合、保守的離散化の質量保存・非負性・自由エネルギー減少と時間刻み依存性を記録する。Pythonファイルを「別途実行」と書くだけで済ませず、利用可能な教材内実行基盤へ接続する。実行できない環境にも再現手順・期待値・許容誤差を残す。
- 数学ゲート：各主要定理の仮定・定義域・主要補題・証明、全演習と解答を自己再計算し、別観点で本文を再読する。既習専門語は使用位置より前の導入または実在stable anchorへ接続する。
- OTR1–OTR5 では写像・結合・存在・離散主問題・有限双対を、OTR6–OTR7 では連続双対と循環単調性を、OTR8–OTR9 では Wasserstein 距離・収束・完備可分性を、OTR10 では Kantorovich–Rubinstein 双対を、OTR11 では一次元分位点公式を、OTR12 では二次費用の凸解析と Rockafellar 型構成・凸関数のほとんど至る所微分可能性を、OTR13 では Brenier 定理の存在・一意性と原子出発測度の反例を、OTR14 では非可換共分散の Gaussian $W_2$ 公式と退化極限・一意性の区別を、OTR15 では変位補間と定速測地線を、OTR16 では位置・相互作用・内部エネルギーの変位凸性（内部エネルギーは滑らかな最適写像の範囲）を実装した。OTR17 では古典・測度弱形式、no-flux、質量保存、滑らかな流れとJacobianを実装した。OTR18 では距離微分、重ね合わせ原理、最適結合の折れ線近似、最小作用速度場を実装した。OTR19 では真空を含む流体作用、静的費用との両不等式、凸領域no-fluxを実装した。OTR20 では勾配接空間と不可視速度、直交射影による最小速度、距離微分、第一変分と形式的勾配を実装した。残る OTR21–OTR26 は各章の執筆・依存関係監査・検証を経て順次実装する。章ごとに PR/CI と対象に応じた数学・依存・Pages 検証を終えるまで `completed` にしない。

## 5. 近接科目との責務分担

- **OTR**: 結合・双対・循環単調性、$W_p$・最適写像・測地線、動的輸送・JKO、有限離散OTの数値原理。
- **MT/OPT/FA/PDE/GPDE**: 既存の測度・双対・弱位相・弱PDEの一般定理は該当する canonical owner から参照し、同じ一般論を再執筆しない。
- **幾何解析・確率解析 II**: 多様体上の曲率・Laplace–Beltrami・拡散半群の一般論。一般多様体版OT・曲率次元条件は本PLANの必修外。
- **ML2 / PML1・2**: score-based diffusion、flow matching、物理制約付き学習等のモデル構成・損失・実装。OTRはそれらに使う幾何的基礎と相違点のみを所有する。

設計は以上の**全26講で確定**。本文完成時は講数の消化ではなく、採用した主定理の証明と演習・計算・リンク・公開導線の整合を基準に判断する。
