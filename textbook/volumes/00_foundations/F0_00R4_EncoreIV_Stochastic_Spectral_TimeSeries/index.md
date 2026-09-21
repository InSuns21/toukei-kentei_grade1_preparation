# F0-00R4 Encore IV：確率解析・時系列

このページは、再編後の **Encore IV：確率解析・時系列** の入口です。

旧 Encore IV の個別章は backup / migration source として残しますが、現行主線では参照しません。新系列は旧章への prerequisite・proof dependency・forward reference を持たず、現行 DREAM THEATER 規約に従って独立に正本化します。

通常カリキュラムの統計検定1級本編は、この Encore IV を必須前提にはしません。

---

## 1. 新しい全体像

Encore IV は二本立てです。

~~~text
確率論
  ↓
STO1--STO14
確率過程 → マルチンゲール → ブラウン運動
→ 二次変分 → 確率積分
→ Itô / Stratonovich → 局所時間
→ SDE → Girsanov
→ Markov / 生成作用素 / マルチンゲール問題
→ マルチンゲール representation
→ ポアソン / CTMC → Lévy / 跳躍型確率解析

Hilbert / Fourier / 確率論
  ↓
TSA1--TSA6
定常過程 → Hilbert 予測 → Wold
→ Herglotz / スペクトル表現
→ ARMA / フィルタ
→ エルゴード性 / 従属極限定理
→ 状態空間 / Kalman フィルタ
~~~

新章は完成したものから順にこのページと DREAM THEATER 目次へ公開します。未完成章への空リンクは置きません。

---

## 2. 確率解析主線 STO

新主線では、多様体を使わない標準的な大学院確率解析をかなり深く扱います。

予定している中心論点は次です。

1. [STO1：確率過程・フィルトレーション・停止時刻](../STO1/index.md) — 実装済み
2. [STO2：離散時間マルチンゲール・不等式・収束](../STO2/index.md) — 実装済み
3. [STO2A：離散時間Markov連鎖・再帰・Green核・不変測度](../STO2A/index.md) — 実装済み add-on
4. [STO3：確率過程の構成・Kolmogorov continuity](../STO3/index.md) — 実装済み
5. [STO4：ブラウン運動・到達時刻・強マルコフ性](../STO4/index.md) — 実装済み
6. [STO3A：経路空間の弱収束・tightness・Donsker](../STO3A/index.md) — 実装済み add-on
7. [STO5：連続局所マルチンゲール・二次変分・セミマルチンゲール](../STO5/index.md) — 実装済み
8. [STO6：確率積分](../STO6/index.md) — 実装済み
9. [STO7：多次元 Itô 解析・Stratonovich](../STO7/index.md) — 実装済み
10. [STO8：局所時間・Tanaka 公式](../STO8/index.md) — 実装済み
11. [STO4A：Brown運動の標本路幾何](../STO4A/index.md) — 実装済み add-on
12. [STO9：SDE の強解・存在一意性・局所化](../STO9/index.md) — 実装済み
13. [STO10：弱解・Girsanov](../STO10/index.md) — 実装済み
14. [STO11：マルコフ過程・半群・生成作用素・マルチンゲール問題](../STO11/index.md) — 実装済み
15. [STO12：ブラウン運動のマルチンゲール表現](../STO12/index.md) — 実装済み
16. [STO13：ポアソン過程・連続時間マルコフ連鎖・ランダム測度](../STO13/index.md) — 実装済み
17. [STO14：Lévy 過程・跳躍型確率解析](../STO14/index.md) — 実装済み

---

## 3. 多様体の直前で止める

Euclidean space 上では Stratonovich calculus まで扱います。

~~~text
Itô integral
  ↓
Itô formula
  ↓
Stratonovich integral
  ↓
Itô--Stratonovich conversion
  ↓
ここまでは Encore IV

manifold / tangent bundle / connection
  ↓
manifold-valued SDE / stochastic development
  ↓
幾何学系列完成後の別系列
~~~

したがって「Stratonovich は名前だけ紹介して終了」にはしませんが、座標不変性を本格的に使う stochastic differential geometry は先取りしません。

---

## 4. 時系列枝 TSA

時系列は STO 全章完了を必須にはせず、別枝として進めます。

1. [TSA1：定常過程・Hilbert 予測](../TSA1/index.md) — 実装済み
2. [TSA2：Wold 分解](../TSA2/index.md) — 実装済み
3. TSA3：Herglotz・スペクトル表現
4. TSA4：linear フィルタ・ARMA / ARIMA・周波数領域
5. TSA5：エルゴード性・mixing・従属極限定理 theory
6. TSA6：状態空間・Kalman フィルタ・innovations

統計検定1級本編の AR / MA / ARIMA は試験向け正本として独立に維持し、TSA はその数学的地下構造を扱います。

---

## 5. 確率制御・HJB への橋

Encore IV の STO9 と STO11 まで進むと、

~~~text
controlled SDE
  ↓
Markov property / 生成作用素
  ↓
dynamic programming principle
  ↓
Hamilton--Jacobi--Bellman equation
  ↓
viscosity solution
~~~

へ進む前提が揃います。

確率制御・HJB・viscosity solution は Encore IV 本体へ詰め込まず、後続の独立系列として構成します。

---

## 6. PDE・数値解析との交点

- SDE の生成作用素から Kolmogorov equation / Fokker--Planck / Feynman--Kac へ進む。
- Encore III の弱 PDE と「確率表現」の側から再会する。
- Encore V の Euler--Maruyama / Monte Carlo / MLMC は STO9 以降の数値枝として読む。
- 跳躍過程まで進めば、将来 jump SDE の数値計算へも接続できる。

---

## 7. 停止線

Encore IV の必須主線では、Malliavin calculus、rough paths、regularity structures、stochastic PDE の本格理論、large deviations の一般論までは要求しません。

これらは多様体を必要としないものもありますが、それぞれ独立した大規模理論だからです。

一方で、local マルチンゲール、二次変分、局所時間、Girsanov、マルチンゲール representation、ポアソン random measure、Lévy process までは主線の射程に入れます。

---

## 8. 現在地

再編計画の正本は **textbook/DREAM_THEATER_ENCORE_IV_STOCHASTIC_ANALYSIS_RESTRUCTURE_PLAN.md** です。

Phase 0 は完了し、旧個別章は archive / migration source として現行主線から外しました。

追加補完として [STO2A「離散時間Markov連鎖・再帰・Green核・不変測度」](../STO2A/index.md)、[STO3A「経路空間の弱収束・tightness・Donsker」](../STO3A/index.md)、[STO4A「Brown運動の標本路幾何」](../STO4A/index.md) も実装済みです。有限状態計算を越えた可算状態Markov連鎖、random walkからBrown運動へのfunctional 中心極限定理、Brownian zero setのHausdorff dimension 1/2までを既存正本へ接続しました。

Phase 1 の [STO1「確率過程・フィルトレーション・停止時刻」](../STO1/index.md)、[STO2「離散時間マルチンゲール・不等式・収束」](../STO2/index.md#def-sto2-martingale)、[STO3「確率過程の構成・Kolmogorov continuity」](../STO3/index.md#thm-sto3-kolmogorov-extension)、[STO4「ブラウン運動・到達時刻・強マルコフ性」](../STO4/index.md#thm-sto4-brownian-strong-markov) は、本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済みです。

STO3 では整合的 finite-dimensional laws から canonical process を構成し、cylinder premeasure の可算加法性を compact 近似から閉じたうえで、Kolmogorov--Chentsov continuity theorem を dyadic chaining まで証明しました。

STO4 では covariance $\min(s,t)$ からブラウン運動を構成し、停止時刻の dyadic approximation から強マルコフ性を証明したうえで、reflection principle、到達時刻 distribution、1 次元 recurrence、time inversion まで閉じました。

Phase 2 の [STO5「連続局所マルチンゲール・二次変分・セミマルチンゲール」](../STO5/index.md#thm-sto5-local-martingale-qv) も、本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済みです。

STO5 では STO2 の bounded optional sampling を dyadic approximation で連続時間へ持ち上げ、localization を閉じました。finite variation と二次変分を対比し、ブラウン二次変分 $[B]_t=t$、連続局所マルチンゲールの bracket、covariation、continuous セミマルチンゲール分解の一意性、Lévy characterization まで接続しています。二次変分一般存在の技術的入力だけは continuous-time Doob--Meyer theorem として境界を明示し、STO6 の確率積分は逆輸入していません。

[STO6「確率積分」](../STO6/index.md#thm-sto6-l2-construction) も実装済みです。simple predictable integrand から増分和を定義し、Itô isometry と L2 completion で一般 predictable integrand へ拡張しました。continuous-time Doob L2 inequality、積分の bracket、stopping との交換、localization まで閉じ、一般 p の BDG inequality は標準形と用途を示したうえで、p=2 を章内証明し、一般 p の完全証明は意図的 black box として境界を明記しています。

[STO7「多次元 Itô 解析・Stratonovich」](../STO7/index.md#thm-sto7-multidimensional-ito) も実装済みです。vector ブラウン motion の covariation から始め、weighted covariation sum を介して multidimensional Itô formula を二次 Taylor 展開から証明し、product rule、Itô process、stochastic exponential、ブラウン exponential マルチンゲールまで接続しました。さらに symmetric sum から Stratonovich integral を構成し、Itô--Stratonovich conversion と Euclidean chain rule、vector field 形式のドリフト correctionまで閉じています。manifold 上の確率解析は先取りしていません。

[STO8「局所時間・Tanaka 公式」](../STO8/index.md#thm-sto8-tanaka) も実装済みです。絶対値の smooth approximation からブラウン局所時間を構成し、Tanaka 公式、positive / negative part、level-set support、空間連続性、occupation time formula、interval occupation approximation、Skorokhod reflection、Levy transform まで閉じています。

[STO9「SDE：強解・存在一意性・局所化」](../STO9/index.md#thm-sto9-global-existence-uniqueness) も実装済みです。ブラウン SDE を積分方程式として定式化し、Picard iteration から global Lipschitz 係数下の strong existence・pathwise uniqueness を証明しました。さらに finite-horizon moment / stability estimate、local Lipschitz 係数の cutoff による maximal 強解と explosion time、linear growth と Lyapunov 条件による non-explosion、一次元 comparison theorem まで閉じています。

[STO10「弱解・Girsanov」](../STO10/index.md#thm-sto10-girsanov) も実装済みです。弱解と法則の一意性を strong / pathwise の概念から分離し、Radon--Nikodym density process、stochastic exponential、bounded-energy criterion、Novikov condition を整理した上で、Girsanov local-マルチンゲール transform と Lévy characterization からブラウン Girsanov theorem の核心証明を閉じました。さらにドリフト removal と bounded Borel ドリフト SDE の finite-horizon weak existence を構成し、Yamada--Watanabe theorem は strong / weak theory を結ぶ位置付けを明示して技術的黒箱の境界を示しています。

[STO11「マルコフ過程・半群・生成作用素・マルチンゲール問題」](../STO11/index.md#def-sto11-markov-process) も実装済みです。遷移核と Markov 半群から生成作用素を定義し、global Lipschitz SDE の Markov 性、拡散生成作用素、Dynkin formula、backward / forward Kolmogorov equation、Fokker--Planck、Feynman--Kac verification formula まで接続しました。さらに SDE からマルチンゲール問題への移行と、nondegenerate 拡散でのブラウン運動復元による逆向きを証明し、well-posed マルチンゲール問題から強マルコフ性が生じる一般定理は canonical-space regularity を要する技術的入力として境界を明示しています。

[STO12「ブラウン運動のマルチンゲール表現」](../STO12/index.md#thm-sto12-martingale-representation) も実装済みです。ブラウン natural フィルトレーション上で terminal 確率積分の closed range を Itô isometry から示し、deterministic exponential マルチンゲールの Gaussian totalityを一次元特性関数の一意性・有限独立 Gaussian product・dyadic information・Lévy 上昇定理から証明しました。その稠密性を closed range へ回収して任意の $L^2(\mathcal F_T^B)$ terminal variable の一意な確率積分 representation を得て、conditional expectation process と predictable representation property まで閉じています。独立ブラウン雑音でフィルトレーションを拡大すると PRP が壊れる反例と、Ornstein--Uhlenbeck terminal payoff の explicit integrand まで演習で確認します。\n\n[STO13「ポアソン過程・連続時間マルコフ連鎖・ランダム測度」](../STO13/index.md#def-sto13-poisson-process) も実装済みです。ポアソン過程の指数待ち時間と補償マルチンゲール、有限状態 Q-行列からの跳躍連鎖・滞在時間構成、Kolmogorov 後退・前進方程式、生成作用素マルチンゲールを章内で閉じました。さらにポアソンランダム測度と補償ランダム測度を定義し、決定論的単関数に対する L2 等長性まで証明しています。可算状態では q_n=n^2 の純粋出生過程が有限時間で爆発する反例を置き、有限状態仮定が非爆発性を保証する機構も明示しました。複合ポアソン過程・Lévy 理論・一般の予測可能被積分関数に対する跳躍型確率積分は STO14 の正本として先取りしていません。

[STO14「Lévy 過程・跳躍型確率解析」](../STO14/index.md#def-sto14-levy-process) も実装済みです。複合 Poisson 過程から Lévy 過程・無限分解可能分布・Lévy 指数・Lévy 測度へ進み、補償 Poisson ランダム測度に対するランダムな予測可能被積分過程の $L^2$ 積分を単純過程から完備化で構成しました。小跳躍は閾値付き近似と補償から sup ノルムの二乗平均極限として作り、Lévy--Itô 分解の構成方向と跳躍 Itô 公式、Lévy 生成作用素まで閉じています。一般 Lévy--Khintchine 分類の逆向きだけは、無限分解可能分布の一般構造論を要するため意図的な技術的入力として境界を明示しています。

[TSA1「定常過程・Hilbert 予測」](../TSA1/index.md#thm-tsa1-best-linear-prediction) も実装済みです。狭義定常性と二次定常性を分離し、自己共分散関数の正定値性、有限過去の正規方程式、無限過去への Hilbert 射影、有限過去予測の $L^2$ 収束、時間移動作用素のユニタリ性、イノベーションの直交性・定常分散まで閉じました。ランダム正弦波を線形決定論的な極端例として置き、MA(1) では有限過去予測と無限過去予測の差を演習で直接計算します。remote past・純非決定論性・Wold 分解は TSA2 の canonical content として先取りしていません。

[TSA2「Wold 分解」](../TSA2/index.md#thm-tsa2-wold) も実装済みです。TSA1 の過去空間と標準イノベーションを出発点に、イノベーション部分空間、無限遠過去、純非決定論性、減少閉部分空間への射影収束を導入し、過去空間を remote past と時刻別イノベーション空間の無限直交和へ分解しました。そこから Wold の決定論成分、標準イノベーションによる因果的無限移動平均表示、係数の平方可和性と一意性まで証明しています。安定 AR(1) と可逆 MA(1) を純非決定論側、ランダム正弦波を完全決定論側の直接例として検証しました。

現在地は **Phase 5：TSA1 → TSA2 完了。次は TSA3「Herglotz・spectral representation」** です。
