# DREAM THEATER：Encore IV 確率解析・時系列 再編計画

作成日: 2026-09-20

## 0. この計画の目的

旧 Encore IV は、filtration・martingale・Brown 運動・Itô 積分・SDE・generator と、Hilbert 予測・Wold・spectral measure・ARMA 周波数解析を短い補講として接続していた。

Encore III の Graduate PDE 主線が GPDE1--GPDE10 まで現行 DREAM THEATER 規約で閉じた現在、Encore IV も同じ品質基準へ引き上げる。

新 Encore IV は、単なる「確率過程の補講」ではなく、**多様体を前提にしない範囲で、大学院標準の確率解析をかなり深いところまで自力で追える系列**として再構成する。

主線は次の二本に分ける。

~~~text
確率論
  ↓
STO1--STO14  確率解析・Markov・jump process
  ↓
確率制御 / HJB / 数値 SDE / SPDE 等への橋

L2 / Fourier / 確率論
  ↓
TSA1--TSA6  定常過程・予測・spectral theory・時系列
~~~

Encore IV の入口 ID F0-00R4 は維持し、内容を新系列ロードマップへ差し替える。

## 1. 旧 Encore IV の扱い

再編前の F0-00SP1--F0-00SP5、F0-00TS1、F0-00TS2、F0-00TS2A、F0-00TS3 は削除しない。

ただし、これらは **archive / migration source** とする。

- dream-theater-index.json の現行主線から外す。
- dream-theater.md の現行通読順から外す。
- 新 STO / TSA 章から prerequisite にしない。
- 新 STO / TSA 章から concept owner、proof dependency、forward reference にしない。
- 新本文から旧章へのリンクを残さない。
- 旧本文の有用な証明・例・演習は、必要なものだけ新正本へ移植する。
- 新旧両方の本文を並行保守しない。
- 旧 URL は Git 履歴・既存外部リンク保護のためファイルを残すが、現行 reader-facing route には載せない。

この扱いは Encore II / Encore III の再編と同じであり、旧章を「既存 anchor」として温存して新系列の証明責務を逃がさない。

## 2. 新 Encore IV の深さ

新主線は、実数値・ユークリッド空間値過程を中心に次まで扱う。

- filtration / stopping time / predictable・progressive measurability
- martingale / submartingale / local martingale
- optional sampling / Doob decomposition
- maximal inequality / upcrossing / martingale convergence
- process の存在と path regularity
- Brown 運動の構成・strong Markov property・hitting time
- quadratic variation / covariation
- continuous semimartingale
- stochastic integral
- multidimensional Itô formula
- Itô--Stratonovich conversion in Euclidean space
- local time / Tanaka formula / occupation time
- multidimensional SDE の存在一意性・局所化・爆発時刻
- weak / strong solution の区別
- Girsanov theorem
- Brownian martingale representation
- Markov semigroup / generator / Dynkin formula
- Kolmogorov equations / Fokker--Planck / Feynman--Kac
- martingale problem
- Poisson process / continuous-time Markov chain
- Poisson random measure / compensated random measure
- jump stochastic integral
- Lévy process / Lévy--Khintchine / Lévy--Itô の位置付け
- jump を含む Itô formula

### 停止線

次は新 Encore IV の必須主線へは入れない。

- 多様体上の Brown 運動
- tangent bundle / connection を使う SDE
- manifold 上の Stratonovich SDE と stochastic development
- geometric stochastic analysis
- Malliavin calculus
- rough path theory
- regularity structures
- stochastic PDE の本格理論
- large deviations の一般論

ただし、**ユークリッド空間上の Stratonovich 積分と Itô--Stratonovich 変換までは扱う**。これにより、後続の幾何学系列が完成した際に「なぜ Stratonovich 形式が manifold で自然なのか」へ接続できる。

Malliavin / rough path / SPDE / large deviations は多様体を必要としないが、それぞれ独立した大規模理論なので Encore IV 本線とは分離する。

## 3. 確率解析主線 STO1--STO14

### STO1 確率過程・filtration・stopping time

**役割**：時間と情報の可測構造を固定する。

- stochastic process
- modification / indistinguishability
- filtration / usual conditions の位置付け
- adapted process
- progressively measurable process
- predictable process
- stopping time
- stopped process
- 停止時刻までの sigma-field
- debut / optional sigma-field の一般論は停止線の外

主役定義には有限状態過程・ランダムウォークなどの直接例を置き、各可測性条件を実際に確認する。

### STO2 離散時間 martingale・不等式・収束

- martingale / submartingale / supermartingale
- predictable transform
- stopped martingale
- optional sampling
- Doob decomposition
- Doob maximal inequality
- upcrossing inequality
- a.s. martingale convergence
- L1 / UI martingale convergence
- 条件を外した optional stopping の反例

F0-00P3C の上向き横断と F0-00P4A の一様可積分性を canonical dependency として再利用し、旧 SP2 へは依存しない。

### STO3 確率過程の構成・Kolmogorov continuity

**役割**：有限次元分布から「過程そのもの」と連続 path を作る論理を閉じる。

- finite-dimensional distributions
- consistency
- Kolmogorov extension theorem
- canonical path space
- modification
- Kolmogorov--Chentsov continuity theorem
- moment estimate から Hölder regularity を得る機構

Brown 運動を「存在すると仮定」せず、次章で構成できる床を作る。

### STO4 Brown 運動・hitting time・strong Markov property

- Brownian motion の構成
- Gaussian process と covariance
- stationary independent increments
- scaling
- time inversion の位置付け
- reflection principle
- hitting time distribution
- recurrence in one dimension の基本形
- Markov property
- strong Markov property
- Brownian filtration

停止時刻近似で strong Markov property がどこから出るかを追える証明粒度にする。

### STO5 連続 local martingale・quadratic variation・semimartingale

- continuous local martingale
- localization
- quadratic variation
- covariation
- polarization
- finite variation process
- continuous semimartingale
- bracket
- Lévy characterization of Brownian motion
- quadratic variation が通常の微積分を壊す機構

後続の stochastic integral と Itô calculus の algebraic / probabilistic foundation を作る。

### STO6 stochastic integral

- simple predictable integrand
- Brownian stochastic integral
- Itô isometry
- L2 completion
- local square integrability
- continuous local martingale としての積分
- quadratic variation of stochastic integral
- stopping と integral の交換
- Doob L2 inequality
- BDG inequality は標準形と役割を扱い、一般 p の完全証明を本文へ入れるかは実装時に証明コストを再評価する

「積分を記号として書く」だけでなく、単純過程から completion で作る構成を閉じる。

### STO7 multidimensional Itô calculus・Stratonovich

- vector Brownian motion
- multidimensional Itô formula
- product rule / integration by parts
- stochastic exponential
- exponential martingale
- Itô process
- Itô--Stratonovich conversion in R^d
- chain rule が Stratonovich 形式で通常形へ戻る理由
- manifold へは進まない

### STO8 local time・Tanaka formula

- convex function に対する滑らかでない Itô formula の動機
- local time
- Tanaka formula
- occupation time formula
- Brownian local time
- positive / negative part
- reflection と local time の関係
- regularity と zero set の位置付け

local time を「公式」ではなく、二次変分が path の滞在密度を測る対象として理解する。

### STO9 SDE：strong solution・存在一意性・局所化

- strong solution
- pathwise uniqueness
- global Lipschitz / linear growth
- Picard iteration
- multidimensional SDE
- moment estimate
- stability with respect to initial data / coefficients
- local Lipschitz
- explosion time
- localization
- non-explosion criteria の基本形
- comparison theorem の標準例

### STO10 weak solution・Girsanov

- weak solution
- strong solution との違い
- equivalent change of measure
- exponential martingale
- Novikov condition
- Girsanov theorem
- drift removal
- Brownian motion under changed measure
- SDE の weak existence への応用
- pathwise uniqueness と uniqueness in law の位置付け
- Yamada--Watanabe は定理の位置付けまでを基本とし、完全証明は実装時に独立章化の要否を判定する

### STO11 Markov process・semigroup・generator・martingale problem

- Markov process / transition kernel
- time-homogeneous Markov process
- Markov semigroup
- generator
- Dynkin formula
- backward Kolmogorov equation
- forward equation / Fokker--Planck
- Feynman--Kac
- martingale problem
- SDE と martingale problem の対応
- strong Markov property を generator 側から読む入口
- Feller process は bridge

GPDE / PDE と確率解析が再合流する中心章とする。

### STO12 Brownian martingale representation

- Brownian filtration
- square-integrable martingale
- predictable representation property
- terminal variable representation
- exponential martingale を使う稠密性論法
- conditional expectation process の representation
- stochastic control / mathematical finance への橋

Clark--Ocone formula は Malliavin calculus を必要とするため本章へ逆輸入しない。

### STO13 Poisson process・continuous-time Markov chain・random measure

- Poisson process
- exponential waiting time
- independent increments
- compensated Poisson martingale
- counting process compensator の基本形
- continuous-time Markov chain
- Q-matrix
- jump chain / holding time
- Kolmogorov forward / backward equations
- Poisson random measure
- compensated Poisson random measure

通常教材 E2 の計算論を前提にせず、確率解析の言葉で独立に正本化する。

### STO14 jump stochastic calculus・Lévy process

- compound Poisson process
- Lévy process
- infinitely divisible law
- Lévy--Khintchine formula
- Lévy measure
- finite / infinite activity
- Lévy--Itô decomposition
- stochastic integral with compensated Poisson random measure
- jump semimartingale の Itô formula
- diffusion + jump SDE の位置付け

Lévy--Khintchine と Lévy--Itô の一般形は証明量が大きいため、実装時に「核心を本章で閉じる部分」と「意図的黒箱」を明示的に切り分ける。単なる名前紹介では終えない。

## 4. 時系列枝 TSA1--TSA6

時系列は確率解析主線とは分ける。STO 全章を読まないと TSA を読めない設計にはしない。

### TSA1 定常過程・Hilbert 予測

- strict / second-order stationarity
- covariance kernel
- closed linear span of the past
- best linear prediction as Hilbert projection
- innovation
- white noise
- deterministic component

### TSA2 Wold decomposition

- innovation subspaces
- remote past
- purely nondeterministic process
- Wold decomposition
- moving-average representation
- uniqueness
- AR(1) / MA(1) の直接例

### TSA3 Herglotz・spectral representation

- positive-definite sequence
- Herglotz theorem
- spectral measure
- spectral density
- line spectrum / absolutely continuous spectrum
- orthogonal increment random measure
- spectral representation theorem

Herglotz と spectral representation を旧 TS2 / TS2A の二重正本にはせず、新章側で一貫した proof dependency を作る。

### TSA4 linear filter・ARMA / ARIMA・周波数領域

- backshift operator
- linear filter
- transfer function
- causality / invertibility
- ARMA spectrum
- differencing / seasonal differencing
- time-domain ACF / PACF と frequency-domain の対応
- spectral factorization の入口

### TSA5 ergodicity・mixing・dependent limit theory

- stationary measure-preserving shift
- ergodicity
- mean ergodic theorem の Hilbert 版
- Birkhoff theorem の位置付け
- mixing coefficients の入口
- stationary process の LLN
- sample autocovariance の consistency
- dependent CLT は仮定と適用範囲を限定して扱う

一般 ergodic theory 全体へ拡張しないが、「標本平均が母平均へ近づく」ために stationarity だけでは足りないことを明示する。

### TSA6 state-space・Kalman filter・innovations

- linear Gaussian state-space model
- prediction / filtering
- Kalman recursion
- covariance Riccati recursion
- innovation process
- likelihood との接続
- ARMA と state-space representation
- stochastic control への橋

有限次元線形 Gaussian 系に限定し、一般 nonlinear filtering は別系列へ送る。

## 5. 依存 DAG の基本形

~~~text
F0-00P3A / P3C / P4A / P6
          │
          ↓
        STO1
          ↓
        STO2
          ↓
        STO3
          ↓
        STO4
          ↓
        STO5
          ↓
        STO6
          ↓
        STO7
          ↓
        STO8

STO7 ──→ STO9 ──→ STO10
              │
              ├────→ STO11 ──→ stochastic control / HJB
              │
              └────→ STO12

STO2 ──→ STO13 ──→ STO14

F0-00P3B + Hilbert/Fourier
          ↓
        TSA1
          ↓
        TSA2
          ↓
        TSA3
          ↓
        TSA4
          ↓
        TSA5

TSA1 + linear Gaussian theory
          ↓
        TSA6 ──→ stochastic control
~~~

実装時には読順と direct prerequisite を混同せず、chapter.yaml には証明に本当に必要な直接依存だけを置く。

## 6. 確率制御・HJB への接続

Encore IV 完成後の次系列として、確率制御を次の流れで作れる状態を目標にする。

~~~text
STO9  SDE
  +
STO11 Markov / generator / Feynman--Kac
  +
TSA6 linear Gaussian filtering の一部
      ↓
controlled diffusion
      ↓
dynamic programming principle
      ↓
Hamilton--Jacobi--Bellman equation
      ↓
viscosity solution
~~~

Girsanov や martingale representation は重要な別手法だが、HJB の direct prerequisite に機械的には置かない。

## 7. Encore V・PDE・幾何との接続

- STO9 の SDE は Encore V の Euler--Maruyama / MLMC へ接続する。
- STO11 の generator / Feynman--Kac は Encore II / III の PDE と接続する。
- STO14 の jump SDE は将来の jump numerical scheme へ接続できる。
- STO7 の Euclidean Stratonovich calculus は、幾何学系列完成後の manifold-valued SDE への橋になる。
- 多様体側の canonical definitions が完成する前に manifold Brownian motion を Encore IV へ逆輸入しない。

## 8. 証明・演習品質

ロードマップを除く新 STO / TSA 章は、理由付き例外がない限り各章で最低

- Level A: 4題
- Level B: 3題
- Level C: 1題

を置き、全問へ詳細解答を付ける。

特に次は「名前だけ知っている」状態で終わらせない。

- stopping time の可測性判定
- optional sampling の適用条件
- martingale convergence の UI 条件
- Kolmogorov continuity の指数計算
- Brownian hitting time
- quadratic variation の直接計算
- stochastic integral の Itô isometry
- multidimensional Itô formula
- local time / Tanaka
- SDE Picard iteration
- Girsanov の density process
- generator から Dynkin / Kolmogorov equation
- martingale problem
- Poisson compensator
- jump Itô formula
- Wold projection
- Herglotz measure
- ARMA transfer function
- ergodicity と sample mean
- Kalman covariance recursion

## 9. 実装フェーズ

### Phase 0：ルーティングと設計台帳

- 本再編計画を正本化する。
- F0-00R4 を新 Encore IV ロードマップへ更新する。
- dream-theater-index.json から旧 SP / TS 章を外す。
- dream-theater.md から旧 SP / TS 現行導線を外す。
- 新 STO / TSA DAG と停止線を固定する。
- 未完成の新章は reader-facing index に先行登録しない。

### Phase 1：確率解析の床

~~~text
STO1 → STO2 → STO3 → STO4
~~~

情報構造、martingale、過程の構成、Brown 運動までを閉じる。

### Phase 2：連続確率解析

~~~text
STO5 → STO6 → STO7 → STO8
~~~

local martingale、quadratic variation、stochastic integral、Itô / Stratonovich、local time までを閉じる。

### Phase 3：SDE・Markov・representation

~~~text
STO9 → STO10 → STO11 → STO12
~~~

SDE、Girsanov、Markov semigroup / generator / martingale problem、Brownian martingale representation までを閉じる。

### Phase 4：jump process

~~~text
STO13 → STO14
~~~

Poisson / CTMC から Lévy / jump stochastic calculus までを閉じる。

### Phase 5：時系列

~~~text
TSA1 → TSA2 → TSA3 → TSA4 → TSA5 → TSA6
~~~

予測・Wold・spectral representation・ARMA・ergodicity・Kalman filter を閉じる。

## 10. 公開ルール

新章は本文・主要証明・直接例・A4/B3/C1・全問詳細解答・chapter / knowledge / glossary・必要な validation が完了した章からだけ reader-facing index に追加する。

空ページ、metadata だけ、旧章のリンクだけを置いたページを implemented と扱わない。

旧 SP / TS は backup としてファイルを残すが、新系列からの参照は作らない。

## 11. 検証

各章の変更では少なくとも次を実行する。

~~~bash
npm run validate
npm run validate:pages
npm run validate:dream-theater-exercise-counts
npm run audit:proof-pedagogy
npm run audit:formalism-pedagogy
~~~

knowledge / standard math core を変更した場合は対応する strict validation も実行する。

CI green は完成の十分条件ではなく、独立数理査読と読者粒度査読で fatal: 0 / major: 0 / minor: 0 を確認する。

## 12. 完成時の位置付け

~~~text
測度論・条件付き期待値
        ↓
Encore IV STO
martingale / Brownian / stochastic calculus
SDE / Girsanov / Markov / jump / Lévy
        │
        ├── 確率制御 → HJB → viscosity solution
        ├── Encore V：数値 SDE / Monte Carlo
        ├── PDE：Feynman--Kac / Kolmogorov
        └── 幾何学完成後：manifold 上の確率解析

Hilbert / Fourier
        ↓
Encore IV TSA
prediction / Wold / spectral representation
ARMA / ergodicity / Kalman
~~~

新 Encore IV は、**確率過程を「公式を使う対象」ではなく、可測性・martingale・path・quadratic variation・確率積分・generator から再構成できるようにする系列**とする。

## 13. 実装進捗

最終更新: 2026-09-21

- Phase 0「ルーティングと設計台帳」：完了。
- 旧 Encore IV の SP / TS 章を archive / migration source 扱いへ切り替え、reader-facing index と目次から除外した。
- 新系列 ID を STO1--STO14 / TSA1--TSA6 として固定。
- Phase 1：STO1「確率過程・filtration・stopping time」を実装。filtration / adapted / progressive / predictable / stopping time / stopped process / $\mathcal F_\tau$ を、直接例・主要証明・A4/B3/C1・全問詳細解答まで閉じた。
- STO1 の direct prerequisite は F0-00P1 と F0-00P3C に限定し、旧 SP1 は参照しない。
- Phase 1：STO2「離散時間 martingale・不等式・収束」を実装。martingale / submartingale / predictable transform / stopped process / bounded optional sampling / Doob decomposition / maximal inequality / upcrossing inequality / a.s. convergence / UI・L1 convergence を、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- STO2 の direct prerequisite は STO1・F0-00P3C・F0-00P4A とし、旧 SP2 は migration source に留めて prerequisite / proof dependency にしない。
- Phase 1：STO3「確率過程の構成・Kolmogorov continuity」を実装。finite-dimensional distributions / consistency / canonical path space / Kolmogorov extension theorem / Hölder continuity / Kolmogorov--Chentsov continuity theorem / continuous modifications の一意性を、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- STO3 の direct prerequisite は STO1・F0-00D4・F0-00P4 とし、読順上は STO2 の後に置くが、martingale 理論を不要な direct prerequisite として追加しない。
- Kolmogorov extension theorem は cylinder algebra 上の well-definedness・有限加法性だけで済ませず、有限次元 Borel 測度の compact 内部近似、continuity from above、premeasure 性、Carathéodory extension まで本文で核心証明を閉じた。
- Kolmogorov--Chentsov continuity theorem は dyadic grid・Markov inequality・union bound・Borel--Cantelli・chaining から continuous modification と Hölder exponent を構成するところまで証明した。
- Phase 1：STO4「Brown 運動・hitting time・strong Markov property」を実装。covariance $\min(s,t)$ の Gaussian finite-dimensional laws から Kolmogorov extension / continuity を用いて Brown 運動を構成し、Markov property / strong Markov property / reflection principle / hitting time distribution / 1 次元 recurrence / time inversion を、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- strong Markov property は stopping time を右側 dyadic grid へ近似し、countably-valued stopping time で deterministic-time independent increments を使った後、path continuity と bounded convergence で極限へ戻す核心証明を本文で閉じた。
- reflection principle は strong Markov property の後に配置し、停止時刻での反射に必要な独立性を先取りしない証明依存にした。
- STO4 の direct prerequisite は STO3 のみに限定し、旧 SP 系列は migration source に留めて prerequisite / proof dependency にしない。
- Phase 1「確率解析の床」STO1--STO4 は完了。
- Phase 2：STO5「continuous local martingale・quadratic variation・semimartingale」を実装。continuous-time martingale / local martingale / localization / ucp / finite variation / quadratic variation / covariation / continuous semimartingale / Lévy characterization を、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- STO5 の direct prerequisite は STO2・STO4・RA3 とした。STO2 の離散時間 bounded optional sampling を dyadic stopping-time approximation で連続時間へ持ち上げ、bounded stopping による martingale の停止を章内証明した。RA3 は Lévy characterization の二次 Taylor 展開と compact 上の微分評価に実際に使う標準解析依存として明示した。
- Brownian quadratic variation は一般の deterministic partition に対して平均・分散を直接計算し、$[B]_t=t$ を process-level の ucp limit まで接続した。finite-variation part の二次変分と cross term が消えることを total variation で評価し、continuous semimartingale の quadratic variation と分解一意性を閉じた。
- continuous local martingale の quadratic variation 一般存在については、continuous-time Doob--Meyer theorem の一般証明が class D / regularization / predictable compensator を含む独立した大規模理論になるため、その存在部分だけを技術的入力として境界明示した。STO6 の stochastic integral は証明へ逆輸入していない。
- Lévy characterization は localization 後の bracket が $t\wedge\sigma_n$ になることを追跡し、停止した exponential process の二次 Taylor 展開から conditional characteristic function を導く形で閉じた。
- Phase 2：STO6「stochastic integral」を実装。simple predictable integrand の増分和から始め、Itô isometry、predictable simple process の L2 density、Doob L2 maximal inequality、L2 completion、quadratic variation、stopping との交換、local square integrability と localization までを、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- STO6 の direct prerequisite は STO2・STO5・F0-00D2E・F0-00D3A とした。STO2 の Doob maximal inequalityを dyadic grid で連続時間へ持ち上げ、F0-00D2E の L2 completion を stochastic integral construction に実際に使う。predictable simple process の稠密性では F0-00D3A の π--λ 定理を生成 σ 代数への拡張に使う。旧 SP 系列は prerequisite / proof dependency にしない。
- 一般 p の Burkholder--Davis--Gundy inequality は、good-lambda / stopping decomposition を要する独立した大きな証明であるため標準定理として境界明示し、p=2 の比較は Itô isometry と Doob L2 inequality から章内で完全証明した。
- Phase 2：STO7「multidimensional Itô calculus・Stratonovich」を実装。vector Brownian motion / semimartingale integral / weighted covariation / multidimensional Itô formula / product rule / Itô process / stochastic exponential / Stratonovich integral / Itô--Stratonovich conversion を、主要証明・直接例・A4/B3/C1・全問詳細解答まで閉じた。
- STO7 の direct prerequisite は STO5・STO6・RA3 とした。STO5 の quadratic variation / covariation と semimartingale 分解、STO6 の local stochastic integral、RA3 の Taylor theorem を実際の証明に使い、旧 SP4 や後続 STO8 / STO9 は prerequisite / proof dependency にしない。
- multidimensional Itô formula は weighted covariation sum を補題として、二次 Taylor 展開の一次和・二次和・remainder をそれぞれ stochastic integral・covariation integral・0 へ送る核心証明を本文で閉じた。
- Stratonovich integral は symmetric Riemann sum から定義し、Itô integral との差が covariation の半分になること、covariation chain rule、Euclidean Stratonovich chain rule、vector field 形式の drift correctionまで導いた。manifold / connection は停止線の外に保った。
- Phase 2：STO8「local time・Tanaka formula」を実装。absolute value の smooth approximation から Brownian local time を occupation kernel の ucp limit として構成し、Tanaka formula、positive / negative part、level-set support、Brownian level set の Lebesgue 時間 0、空間連続性、occupation time formula、interval occupation approximation、Skorokhod reflection、Levy transform まで閉じた。
- STO8 の direct prerequisite は STO3・STO4・STO5・STO6・STO7・F0-00D2C とした。空間連続性で Kolmogorov--Chentsov、reflection law で reflection principle / Levy characterization、高次 moment で BDG、occupation formula で Tonelli / Fubini を使い、π–λ 定理は concept-level dependency として canonical result を直接参照するためであり、旧 SP 系列は prerequisite / proof dependency にしない。
- Phase 2「連続確率解析」STO5--STO8 は完了。
- Phase 3：STO9「SDE：strong solution・存在一意性・局所化」を実装。Brownian SDE / strong solution / pathwise uniqueness を定義し、Picard iteration の factorial estimate から global Lipschitz 係数下の strong existence・pathwise uniqueness、finite-horizon moment estimate、初期値・係数に対する stability estimate まで核心証明を閉じた。
- STO9 の direct prerequisite は STO5・STO6・STO7・RA5 とした。STO6 の Itô integral / Doob L2 estimate、STO7 の multidimensional Itô formula、RA5 の一様極限の連続性を使い、comparison theorem は smooth positive-part approximation で証明して STO8 を prerequisite にしない。STO10 の weak solution / Girsanov と STO11 の generator も逆輸入しない。
- local Lipschitz 係数は radial cutoff で global Lipschitz 問題へ落とし、exit time 前の pathwise uniqueness から maximal strong solution を貼り合わせた。finite-time explosion の具体例、linear growth による non-explosion、coercive C2 Lyapunov function による non-explosion まで扱った。
- STO9 は本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済み。
- Phase 3：STO10「weak solution・Girsanov」を実装。weak solution / equivalent change of measure / density process / Novikov condition / Girsanov theorem / drift removal / uniqueness in law を定義し、Girsanov local-martingale transform と Lévy characterization から Brownian drift shift の核心証明を閉じた。
- STO10 の direct prerequisite は STO5・STO6・STO7・STO9・F0-00P2・F0-00P3A・F0-00P4A とした。STO5 の covariation / Lévy characterization、STO6 の stochastic integral、STO7 の stochastic exponential / product rule、STO9 の strong solution / pathwise uniqueness、P2 の Radon--Nikodym、P3A の条件付き期待値、P4A の一様可積分性を実際に使う。
- stochastic exponential が density になるための true-martingale 問題を明示し、bounded quadratic energy の場合は L2 boundedness から完全証明した。一般 Novikov criterion は停止後の一様可積分性 lemma の技術部分だけを意図的黒箱として境界明示し、Girsanov 本体の drift cancellation は章内で完全証明した。
- bounded Borel drift $dX=b(X)dt+dB$ は driftless Brownian motion から measure change で finite-horizon weak solution を構成し、STO9 の Lipschitz Picard construction より weak existence が柔軟であることを直接例と演習で確認した。
- Yamada--Watanabe theorem は weak existence + pathwise uniqueness から strong existence + uniqueness in law を結ぶ定理として位置付け、regular conditional distribution / coupling / measurable selection を要する完全証明は独立した大規模論証として本章では技術的黒箱にした。
- STO10 は本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済み。
- Phase 3：STO11「Markov process・semigroup・generator・martingale problem」を実装。transition kernel / time-homogeneous Markov process / Markov semigroup / generator / Dynkin formula / backward Kolmogorov / forward Kolmogorov・Fokker--Planck / Feynman--Kac / martingale problem / Feller bridge を、主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで閉じた。
- STO11 の direct prerequisite は STO4・STO5・STO7・STO9・F0-00P3A とした。STO4 の Markov / strong Markov、STO5 の local martingale・optional sampling・Lévy characterization、STO7 の時間依存 Itô formula、STO9 の SDE existence / pathwise uniqueness、P3A の conditional expectation / tower property を実際に使う。
- global Lipschitz SDE の Markov 性を shifted Brownian motion と pathwise uniqueness から章内証明し、diffusion generator から Dynkin formula、backward / forward equations、Feynman--Kac verification まで PDE 側への橋を閉じた。
- martingale problem については SDE からの導出に加え、nondegenerate diffusion では coordinate / product test functions から drift と quadratic covariation を復元し、Lévy characterization により Brown 運動を構成して weak SDE へ戻すところまで証明した。
- well-posed martingale problem から strong Markov property を得る一般 canonical-space theorem は、regular conditional probability・path shift・stopped martingale problem の可測性を要する独立した大規模論証のため、その機構を本文で説明した上で技術的入力として境界を明示した。
- STO11 は本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済み。
- Phase 3：STO12「Brownian martingale representation」を実装。Brownian natural filtration / Brownian square-integrable integrand space / predictable representation property / terminal variable representation / conditional expectation process representation を、主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで閉じた。\n- STO12 の direct prerequisite は STO4・STO6・STO7・STO9・F0-00P3A・F0-00P3C・F0-00P6 とした。Brownian natural filtration、Itô isometry / L2 stochastic integral、stochastic exponential、strong SDE application、conditional expectation、Lévy 上昇定理、特性関数の一意性を実際の証明・演習で使い、STO11 や Malliavin calculus は theorem 本体へ逆輸入しない。\n- representation theorem は terminal stochastic integral の closed range を Itô isometry から証明し、deterministic exponential martingale がその値域に入ることを確認した上で、Gaussian exponential vectors の totality を一次元 Gaussian の signed-measure / characteristic-function argument、有限独立 Gaussian product、dyadic Brownian information、Lévy 上昇定理で閉じた。\n- terminal variable representation から conditional expectation process と Brownian predictable representation property を導き、独立 Brownian noise による enlarged filtration では PRP が失敗する機構を quadratic covariation で示した。stochastic control / mathematical finance への橋は存在・一意性と explicit integrand 同定を分離して記述し、Clark--Ocone formula は停止線の外に保った。\n- STO12 は本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済み。\n- 現在地：Phase 3 は STO12 完了。次の実装対象は STO13「Poisson process・continuous-time Markov chain・random measure」。
