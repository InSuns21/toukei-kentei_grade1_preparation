# DREAM THEATER 逆問題計画

作成日: 2026-10-05  
講義構成確定: 2026-11-09  
状態: in_progress（INV1〜INV6 の本文・系列 manifest・公開導線を整備。INV7〜INV18 は未着手）
移行元: `DREAM_THEATER_UNDERGROUND_EMPIRE_PLAN.md` 旧 U1  
**確定講義数: 全18講（INV1〜INV18）**

## 0. 目的と確定の理由

本計画は、逆問題を CT 等の応用事例の寄せ集めではなく、**観測作用素から未知対象を復元する際の存在・一意性・安定性・正則化**を研究する解析学の発展科目として整備する。

中心問いは次である。

> forward map が分かっているとき、観測から未知量をどこまで一意かつ安定に復元できるか。安定性が壊れる場合、どの追加仮定・正則化・観測設計によって意味のある近似解を得られるか。

旧案の8講は、特に線形正則化の収束証明・誤差率・パラメータ選択、tomography の積分変換・反転・不完全データ、Bayes 逆問題と PDE 逆問題の各核心計算を一つの講義に集約しすぎていた。標準的な教科書の論証単位と照合し、**線形理論7講・変分理論2講・非線形2講・tomography 3講・Bayes 2講・PDE 2講、計18講**に確定する。

これは18週・90分×18回を意味しない。1講は、主要定義の直接例・核心証明・演習と詳細解答が独習者にとって一つの中心問いとして閉じる単位である。**以後は講数を増やして済ませず、章内で必要な節・例・演習を充実させる。** 本PLANの対象範囲を変更する際は改めて計画を審査する。

公開分類は「解析系」を第一候補とする。応用事例は各章の結果を検証する例として置き、医学・画像処理・地球物理の実務講座にはしない。

## 1. 教科書・テキストとの照合

講義項目と停止線は、以下の**出版社による内容紹介・章構成、著者公開資料**を照合して設計した。各書の章数をそのまま講義数へ写したものではない。引用するのは構成と分野の守備範囲であり、教材本文・演習の転載はしない。

| 参照テキスト | 確認した構成 | 本計画への反映 |
|---|---|---|
| H. W. Engl, M. Hanke, A. Neubauer, *Regularization of Inverse Problems* (1996; softcover 2000), [Springer](https://link.springer.com/book/9780792341574) | 線形正則化を複数章で展開し、非線形理論を別章群に置く | INV2〜INV7 の特異系・正則化・収束と INV10〜INV11 の分離 |
| A. Kirsch, *An Introduction to the Mathematical Theory of Inverse Problems*, 3rd ed. (2021), [Springer](https://link.springer.com/book/10.1007/978-3-030-63343-1) | 第一種方程式の正則化、離散化正則化、非線形問題、EIT・逆散乱を区分 | INV1〜INV7 の解析学的骨格、離散化誤差の区別。EIT・逆散乱の本格理論は停止線外 |
| C. R. Vogel, *Computational Methods for Inverse Problems* (2002), [SIAM 目次](https://epubs.siam.org/doi/pdf/10.1137/1.9780898717570.fm) | フィルタ、パラメータ選択、変分・TV、画像復元、PDE パラメータ同定と随伴法 | INV5〜INV9、INV17〜INV18 の証明と具体計算の分離 |
| F. Natterer, *The Mathematics of Computerized Tomography* (1986; SIAM Classics 2001), [SIAM](https://epubs.siam.org/doi/book/10.1137/1.9780898719284) | Radon 変換、標本化・分解能、ill-posedness、再構成算法、不完全データを別に扱う | INV12〜INV14 を「変換→反転→不完全観測」に分割 |
| J. P. Kaipio, E. Somersalo, *Statistical and Computational Inverse Problems* (2005), [Springer](https://link.springer.com/book/10.1007/b138659) | 古典的正則化と統計的逆問題、モデル誤差、事例を接続 | INV15〜INV16 で Gaussian の明示計算と不確実性を分離 |
| A. M. Stuart, “Inverse problems: a Bayesian perspective” (2010), [*Acta Numerica*](https://doi.org/10.1017/S0962492910000061) | 関数空間での posterior の定式化と well-posedness、計算法を整理 | 無限次元 posterior を有限次元密度の形式的極限と取り違えない停止線 |
| A. Alexanderian, *Computational Inverse Problems Governed by PDEs* (2026), [SIAM](https://epubs.siam.org/doi/book/10.1137/1.9781611978827), [著者紹介](https://alen_alexanderian.gitlab.io/ip-pde/) | PDE の変分定式化、微分・随伴法、離散化と最適化、Bayes 逆問題を接続 | INV17〜INV18 の forward/linearization と adjoint の切り分け |

## 2. canonical owner と prerequisite

本計画の正本対象は Hadamard の逆問題論、特異系の逆問題への適用、Picard 条件、正則化作用素族・収束と誤差評価、非線形逆問題の局所的機構、Radon 変換による逆問題、Bayes 逆問題との比較、PDE 制約逆問題の parameter-to-observation map と随伴感度である。

再利用する先行成果は次に限定し、定義・定理を重複して所有しない。

| 既存系列 | 本系列で直接使うもの |
|---|---|
| 線形代数 | SVD、最小二乗、擬似逆、直交射影、条件数 |
| 実解析・関数解析 I / II | ノルム・弱収束、Hilbert / Banach 空間、随伴、コンパクト作用素、スペクトル理論 |
| Fourier 解析 | Fourier 変換、Plancherel、畳み込み、Schwartz 関数の基本性質（使用前に実在する既習定義を確認） |
| 最適化・変分法 | 凸性、弱下半連続性、劣勾配、直接法（章ごとに実在する先行結果を確認） |
| 確率・統計 | 条件付き分布、Bayes 公式、多変量 Gaussian、共分散行列 |
| PDE / GPDE | 対応する楕円・放物型 PDE の弱解とエネルギー評価、Sobolev 空間 |

未執筆 PLAN の表題だけを prerequisite の既習保証にはしない。**各章の執筆開始前**に系列 manifest、直接必要な `chapter.yaml` / `knowledge.yaml` と canonical stable anchor を実在照合し、欠けている前提は導入するか着手を延期する。INV1 は `F0-00F2` の実特異値分解・作用素ノルムと `NA1` の行列条件数・感度定理を直接前提とし、Hadamard の三条件および逆問題固有の擬似逆・誤差増幅を扱う。以降の講義は系列 manifest の進捗に従い個別に着手する。

## 3. 共通の数学的骨格

forward map を $F:X\to Y$ として $F(x)=y$ を観測から逆に解く。線形の場合は $A:X\to Y$ と書く。ノイズは、適用する $Y$ のノルムについて

$$
\|y^\delta-y\|_Y\le\delta
$$

と表す。**存在、一意性、安定性、識別可能性、正則化**は別々に判定する。無限次元では $A$ が単射でも $A^{-1}:\mathcal R(A)\to X$ が非有界になりうる。最小ノルム一般化解 $A^\dagger y$ の定義域と $\mathcal R(A)$ の閉性にも注意する。

離散化誤差と観測ノイズを分離し、離散化後の条件数だけで連続逆問題の安定性を主張しない。source condition、有限次元のフルランク、Gaussian prior、PDE の正則性は必要な章で逐一定量化する。

## 4. 全18講の確定構成

### A. 線形逆問題と正則化の核（7講）

#### INV1　Hadamard の三条件と有限次元モデル

- forward / inverse、存在・一意性・連続依存、識別可能性と条件数。
- 最小二乗・SVD・擬似逆を既習結果から適用し、フルランクと rank deficient な場合を比較する。
- **到達点**：特異値 $\sigma_{\min}$ と誤差増幅の関係を導き、各例で何が不良設定か判定する。有限次元の固定行列と離散化列を区別する。

#### INV2　コンパクト作用素が逆を不安定にする理由

- Hilbert 空間間のコンパクト作用素、閉値域、smoothing、無限次元への移行。
- **到達点**：無限次元の単射コンパクト作用素が（無限次元の定義域上で）下から有界になれないことを示し、対角作用素の反例を構成する。

#### INV3　特異系と Picard 条件

- compact operator の singular system、零空間と直交補空間、形式逆写像。
- **到達点**：$y\perp\ker A^*$ と $\sum_j|\langle y,u_j\rangle|^2/\sigma_j^2<\infty$ による可解性を適切な特異系の仮定の下で示し、非閉値域の具体例を解く。

#### INV4　正則化作用素族と収束の定義

- minimum-norm solution、$R_\alpha$、無雑音の整合性、ノイズを含む収束。
- **到達点**：$R_\alpha y\to A^\dagger y$ と $\delta\|R_{\alpha(\delta)}\|\to0$ からの誤差分解を導き、単なる逆行列近似と正則化の違いを示す。

#### INV5　TSVD・Tikhonov と spectral filter

- truncated SVD、二乗ノルム Tikhonov、normal equation、filter factors。
- **到達点**：Hilbert 空間で $\alpha>0$ の Tikhonov minimizer の一意性と $(A^*A+\alpha I)x_\alpha^\delta=A^*y^\delta$ を導き、特異値表示と TSVD の抑制機構を比較する。

#### INV6　source condition と収束速度

- noise error、bias / approximation error、source condition、qualification の入口。
- **到達点**：$x^\dagger=(A^*A)^\nu w$（$0<\nu\le1$）に対する Tikhonov の誤差上界 $C_1\delta/\sqrt\alpha+C_2\alpha^\nu\|w\|$ を導き、適切な $\alpha(\delta)$ と rate を得る。範囲外の指数へ無条件に外挿しない。

#### INV7　正則化パラメータの選び方と離散化

- a priori choice、Morozov discrepancy principle、discretization と観測ノイズの区別。
- **到達点**：選択則の仮定と収束の論理を少なくとも一つの方法で示し、ノイズ水準を誤って扱うと破綻する例を計算する。GCV / L-curve は選択法の比較例に留める。

### B. 変分・非滑らか正則化（2講）

#### INV8　一般変分正則化の存在・安定性

- $\mathcal D(Fx,y^\delta)+\alpha\mathcal R(x)$、coercivity、下半連続性、弱コンパクト性。
- **到達点**：反射的空間・弱下半連続性等を明示した直接法で minimizer の存在を証明し、観測摂動に対する部分列安定性と一意性の別条件を区別する。

#### INV9　疎性・TV・Bregman 距離

- $\ell^1$ penalty、劣勾配・最適性条件、離散 TV と連続 BV の違い、edge preservation。
- **到達点**：有限次元 $\ell^1$ の最適性条件を導き、劣勾配から Bregman 距離の非負性を検証し、一次元 TV の直接例で階段状信号と二乗ノルム罰則を比較する。連続 BV の存在証明を扱う場合は必要な compact embedding の仮定を先に導入する。

### C. 非線形逆問題（2講）

#### INV10　非線形 forward map の微分と局所識別

- Fréchet 微分、linearization、局所識別可能性、conditional stability。
- **到達点**：具体的な $F$ を微分し、有限次元のフルランクによる局所識別と無限次元の微分単射の限界を反例で区別する。

#### INV11　反復正則化と停止則

- 非線形 Landweber、Newton / Gauss--Newton、iteratively regularized Gauss--Newton の概念、tangential cone condition。
- **到達点**：非線形 Landweber の残差・勾配式と線形化誤差評価を導き、局所仮定とノイズ依存の停止が必要な理由を示す。一般 IRGNM の大域収束理論は要求しない。

### D. 積分変換と tomography（3講）

#### INV12　Radon 変換と Fourier slice theorem

- $f\in\mathcal S(\mathbb R^2)$ 等、積分と Fourier 変換が正当化できる関数類から始める。線積分、sinogram。
- **到達点**：線積分の一次元 Fourier 変換が二次元 Fourier 変換の断面に等しいことを変数変換・正規化定数まで導き、完全角度データの単射性を説明する。

#### INV13　反転公式・back projection・filtered back projection

- Fourier slice からの反転、Jacobian と周波数の重み、逆フィルタの高周波増幅。
- **到達点**：定めた Fourier 規約の下で反転公式と FBP の主要式を導き、周波数切断による正則化・ノイズ増幅・バイアスを計算する。関数類を超えた分布論的一般化は要求しない。

#### INV14　不完全観測・有限角度・標本化

- limited-angle、finite-view、missing wedge、解像度、再構成 artifact。
- **到達点**：Fourier 空間で未観測方向を示し、有限方向データによる非一意性と、コンパクト台など追加仮定下での一意性／極端な不安定性を**別問題**として整理する。完全な microlocal artifact 定理は扱わない。

### E. Bayes 逆問題（2講）

#### INV15　有限次元線形 Gaussian 逆問題

- Gaussian prior、Gaussian 観測誤差、尤度、posterior、MAP と加重 Tikhonov の関係。
- **到達点**：正定値共分散と独立性を明示し、平方完成で posterior mean と covariance を再導出する。退化共分散や非線形 posterior へ公式を無条件に転用しない。

#### INV16　不確実性と関数空間 Bayes の入口

- credible region / frequentist coverage の区別、prior sensitivity、model discrepancy、関数空間 posterior の定式化。
- **到達点**：有限次元 posterior の不確実性を数値例で計算し、関数空間では「Lebesgue 密度」を前提にできないこと、基準測度と likelihood の可積分性が必要なことを確認する。一般 Gaussian measure の構成、Hellinger 安定性や posterior contraction の完全証明は停止線外とする。

### F. PDE 制約逆問題（2講）

#### INV17　parameter-to-state / observation map と微分

- source / coefficient inverse problem の区別、境界条件、弱形式、状態の解作用素と観測作用素。
- **到達点**：例えば一様楕円な一次元拡散問題で解の存在・一意性を既習 PDE 定理へ接続し、係数摂動による感度方程式を正しい境界条件・関数空間で導く。

#### INV18　adjoint-state method と識別可能性の出口

- PDE 制約目的関数、Lagrangian、状態変分・随伴方程式、parameter gradient、局所識別性・条件付き安定性の評価。
- **到達点**：同一の具体的 PDE に対して state → objective → Lagrangian → adjoint → gradient を符号・境界項まで検算し、観測不足による非一意性を具体例で示す。inverse scattering / Full Waveform Inversion は理論と仮定への案内に留める。

## 5. 実装順と依存関係

基幹の **INV1→INV2→INV3→INV4→INV5→INV6→INV7** を先に整備する。INV8・INV9 は INV7、INV10・INV11 は INV5 と INV8、INV12〜INV14 は INV3〜INV5 と Fourier 解析、INV15・INV16 は INV5 と確率・統計、INV17・INV18 は INV8・INV10 と PDE を直接前提とする。

番号は公開上の学習順であり、独立した枝の執筆着手順までは強制しない。特に INV12〜INV16 に INV11 の内容を暗黙の前提として持ち込まない。INV18 は INV17 を直接前提とし、INV11・INV16 は必要な事項のみを参照する。

| 節目 | 最低限の実証・演習 |
|---|---|
| INV1〜INV3 | 条件数の誤差増幅、非閉値域・Picard 条件の $\ell^2$ 具体例 |
| INV4〜INV7 | TSVD と Tikhonov の filter、誤差分解、source rate、パラメータ選択の仮定 |
| INV8〜INV9 | minimizer の存在の直接法、$\ell^1$ の劣勾配、TV の直接例 |
| INV10〜INV11 | 非線形写像の Fréchet 微分、局所仮定、停止則 |
| INV12〜INV14 | Fourier slice の変数変換、FBP の係数、有限方向・不完全角度データの差 |
| INV15〜INV16 | Gaussian posterior の平方完成、共分散と不確実性、関数空間の注意 |
| INV17〜INV18 | 感度方程式、随伴境界条件、gradient の独立な有限差分照合 |

全講で理由付き例外がなければ Level A 4題・B 3題・C 1題以上の演習と全問の詳細解答を置く。講数を埋める短章や題数合わせの演習は作らない。直接必要な canonical result は使用位置から実在する stable anchor へリンクし、論証の2〜4手を暗黙補完させない。

## 6. 停止線（改訂）

### 本18講で**証明・導出まで閉じる**範囲

- 線形・コンパクト作用素の不良設定性、Picard 条件、Tikhonov / TSVD の正則化、指定した source condition 下の収束速度と一つのパラメータ選択則。
- 適切なコンパクト性・下半連続性仮定の下での変分 minimizer の存在・安定性、有限次元 $\ell^1$・一次元 TV の基本例。
- 具体的な非線形 forward map の微分と、局所仮定を明示した反復正則化の主要評価。
- 二次元の Radon / Fourier slice / FBP の主要導出（最初は Schwartz 級等の正当化できるクラス）。
- 有限次元 Gaussian posterior の平均・共分散と MAP、具体的 PDE の感度・随伴 gradient。

### 出口・紹介までで止める範囲

- compressed sensing の RIP・高次元確率論、一般 $BV$・幾何学的測度論の全理論、TV のあらゆる収束率。
- microlocal analysis による可視特異性と artifact の完全分類、全 CT 幾何・散乱モデル、医療機器の実務設計。
- Calderón / EIT / inverse scattering の一般一意性・安定性定理と完全証明、一般係数逆問題の大域的安定性、Full Waveform Inversion の研究レベルの収束理論。
- 無限次元 Gaussian measure の一般構成、Bayesian posterior contraction・MCMC 混合の一般定理、非 Gaussian 階層モデルの全面的推論理論。
- 汎用の nonlinear IRGNM 大域的収束理論、最適実験計画、数値 PDE ソルバ・大規模最適化の実装体系。

ただし、**停止線の外に出した理論を内部の証明で無断使用しない**。必要なら既習の正本への根拠付き参照、対象仮定の明示、または別PLANへの切り出しを行う。INV14 の有限方向と有限角度、INV16 の有限次元と関数空間、INV18 の具体 PDE と一般 PDE は意図的に分ける。

## 7. 完成条件と実装上の判定

1. 各講の主要定義・定理は prerequisite の到達可能な定義から追え、formal statement の使用語が導入に先行しない。
2. 主要結果について適用条件、零空間、作用素定義域、ノルム、係数、変数変換、極限、boundary term を検算し、核心証明を省略しない。
3. 旧8講案で圧縮されていた収束率・parameter choice・FBP・limited-angle・Bayes / PDE 微分を、実際の演習と詳細解答で再現できる。
4. 用語・参照・chapter / knowledge metadata / series manifest・公開導線が整合し、変更区分に応じた自己査読・別観点再査読、CI と表示確認を終える。
5. **18講を列挙した時点では完了としない。** 全講の本文・必要な検証・横断参照まで終了した段階で PLAN の lifecycle を更新する。
