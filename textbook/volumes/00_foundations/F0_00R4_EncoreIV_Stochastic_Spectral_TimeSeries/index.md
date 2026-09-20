# F0-00R4 Encore IV：Stochastic Analysis & Time Series

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
確率過程 → martingale → Brown 運動
→ quadratic variation → stochastic integral
→ Itô / Stratonovich → local time
→ SDE → Girsanov
→ Markov / generator / martingale problem
→ martingale representation
→ Poisson / CTMC → Lévy / jump calculus

Hilbert / Fourier / 確率論
  ↓
TSA1--TSA6
定常過程 → Hilbert 予測 → Wold
→ Herglotz / spectral representation
→ ARMA / filter
→ ergodicity / dependent limit
→ state-space / Kalman filter
~~~

新章は完成したものから順にこのページと DREAM THEATER 目次へ公開します。未完成章への空リンクは置きません。

---

## 2. 確率解析主線 STO

新主線では、多様体を使わない標準的な大学院確率解析をかなり深く扱います。

予定している中心論点は次です。

1. [STO1：確率過程・filtration・stopping time](../STO1/index.md) — 実装済み
2. [STO2：離散時間 martingale・不等式・収束](../STO2/index.md) — 実装済み
3. STO3：Kolmogorov extension・continuity
4. STO4：Brown 運動・hitting time・strong Markov property
5. STO5：continuous local martingale・quadratic variation・semimartingale
6. STO6：stochastic integral
7. STO7：multidimensional Itô calculus・Stratonovich
8. STO8：local time・Tanaka formula
9. STO9：SDE の strong solution・存在一意性・局所化
10. STO10：weak solution・Girsanov
11. STO11：Markov process・semigroup・generator・martingale problem
12. STO12：Brownian martingale representation
13. STO13：Poisson process・continuous-time Markov chain・random measure
14. STO14：Lévy process・jump stochastic calculus

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

1. TSA1：定常過程・Hilbert 予測
2. TSA2：Wold decomposition
3. TSA3：Herglotz・spectral representation
4. TSA4：linear filter・ARMA / ARIMA・周波数領域
5. TSA5：ergodicity・mixing・dependent limit theory
6. TSA6：state-space・Kalman filter・innovations

統計検定1級本編の AR / MA / ARIMA は試験向け正本として独立に維持し、TSA はその数学的地下構造を扱います。

---

## 5. 確率制御・HJB への橋

Encore IV の STO9 と STO11 まで進むと、

~~~text
controlled SDE
  ↓
Markov property / generator
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

- SDE の generator から Kolmogorov equation / Fokker--Planck / Feynman--Kac へ進む。
- Encore III の弱 PDE と「確率表現」の側から再会する。
- Encore V の Euler--Maruyama / Monte Carlo / MLMC は STO9 以降の数値枝として読む。
- jump process まで進めば、将来 jump SDE の数値計算へも接続できる。

---

## 7. 停止線

Encore IV の必須主線では、Malliavin calculus、rough paths、regularity structures、stochastic PDE の本格理論、large deviations の一般論までは要求しません。

これらは多様体を必要としないものもありますが、それぞれ独立した大規模理論だからです。

一方で、local martingale、quadratic variation、local time、Girsanov、martingale representation、Poisson random measure、Lévy process までは主線の射程に入れます。

---

## 8. 現在地

再編計画の正本は **textbook/DREAM_THEATER_ENCORE_IV_STOCHASTIC_ANALYSIS_RESTRUCTURE_PLAN.md** です。

Phase 0 は完了し、旧個別章は archive / migration source として現行主線から外しました。

Phase 1 の [STO1「確率過程・filtration・stopping time」](../STO1/index.md) と [STO2「離散時間 martingale・不等式・収束」](../STO2/index.md) は、本文・主要証明・直接例・A4/B3/C1 演習・全問詳細解答まで実装済みです。

次の実装対象は **STO3「確率過程の構成・Kolmogorov continuity」** です。
