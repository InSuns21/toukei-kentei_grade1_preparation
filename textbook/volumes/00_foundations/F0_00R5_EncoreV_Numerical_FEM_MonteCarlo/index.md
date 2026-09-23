# F0-00R5 Encore V：計算数理

Encore V は、連続数学で定式化した問題を有限個の計算へ落とし、その誤差と安定性を数学的に追うための発展系列です。

主線は次の5系列です。

1. 数値解析
2. 差分法
3. 有限要素法
4. Monte Carlo 法
5. 準 Monte Carlo 法

統計検定1級本編の必須前提ではありません。DREAM THEATER の解析・線形代数・微分方程式・確率論を、実際の計算可能な形へ接続する位置に置きます。

---

## 1. 全体像

```text
線形代数・解析・ODE
        ↓
      NA1–NA12
        ↓
   ┌────┴────┐
   ↓         ↓
FDM1–FDM4   FEM1–FEM7

確率論・積分
      ↓
    MC1–MC4
      ↓
    QMC1–QMC8
```

差分法と有限要素法では、連続問題を有限次元へ落としたときに

```text
連続問題
  ↓
離散化
  ↓
整合性・近似性
  ↓
安定性
  ↓
誤差評価・収束
```

という論理がどう現れるかを比較します。

Monte Carlo 法と準 Monte Carlo 法では、同じ積分問題に対して

- 確率的標本平均による誤差評価
- 点集合の一様性による決定論的誤差評価

という二つの考え方を並べます。

---

## 2. 数値解析 NA1–NA12

| ID | 講座 |
|---|---|
| [NA1](../NA1/index.md) | 浮動小数点・誤差・条件数・安定性 |
| [NA2](../NA2/index.md) | 非線形方程式・不動点反復・Newton 法 |
| [NA3](../NA3/index.md) | 非線形連立方程式 |
| [NA4](../NA4/index.md) | 多項式補間 |
| [NA5](../NA5/index.md) | 数値積分・直交多項式・Gauss 型積分 |
| [NA6](../NA6/index.md) | ODE 数値解法 I：一段法と収束 |
| [NA7](../NA7/index.md) | ODE 数値解法 II：Runge–Kutta・絶対安定性 |
| [NA8](../NA8/index.md) | 数値線形代数 I：直接法 |
| [NA9](../NA9/index.md) | 数値線形代数 II：反復法・Krylov 法 |
| [NA10](../NA10/index.md) | 固有値数値計算 |
| [NA11](../NA11/index.md) | Perron–Frobenius 理論と PageRank |
| [NA12](../NA12/index.md) | 無制約最適化と共役勾配法 |

**実装済み：NA1、NA2、NA3、NA4、NA5、NA6、NA7、NA8、NA9、NA10、NA11、NA12、FDM1、FDM2、FDM3、FDM4。次の実装対象：FEM1。**

数値解析では、単にアルゴリズムを列挙するのではなく、

- 問題そのものの条件の悪さ
- 離散化誤差
- 丸め誤差
- アルゴリズムの安定性
- 反復停止による代数誤差

を分離して考えます。

---

## 3. 差分法 FDM1–FDM4

| ID | 講座 |
|---|---|
| [FDM1](../FDM1/index.md) | 熱方程式と差分法の導入 |
| [FDM2](../FDM2/index.md) | 差分スキームの安定性 |
| [FDM3](../FDM3/index.md) | 整合性・安定性・収束性 |
| [FDM4](../FDM4/index.md) | 移流拡散と風上化 |

中心となる問いは、微分を差分商へ置き換えたとき、その近似が本当に元の PDE の解へ近づくのか、です。

---

## 4. 有限要素法 FEM1–FEM7

| ID | 講座 |
|---|---|
| FEM1 | Poisson 方程式・変分形式・Galerkin 法 |
| FEM2 | 有限要素・三角形分割・基底 |
| FEM3 | 有限要素補間とメッシュ |
| FEM4 | 楕円型 FEM の誤差解析 |
| FEM5 | 鞍点問題・Stokes 方程式 |
| FEM6 | 放物型方程式の有限要素法 |
| FEM7 | 移流拡散・安定化有限要素法 |

Encore III の Sobolev 空間・弱形式・Lax–Milgram・Galerkin 法を canonical dependency とし、Encore V では有限次元空間、メッシュ、補間、assembly、離散誤差へ重心を移します。

---

## 5. Monte Carlo 法 MC1–MC4

| ID | 講座 |
|---|---|
| MC1 | Monte Carlo 法と統計的誤差 |
| MC2 | 乱数生成とサンプリング |
| MC3 | 分散減少法 |
| MC4 | Multilevel Monte Carlo |

ここでは積分を期待値と見なし、大数の法則・中心極限定理を数値積分の誤差論へ接続します。

---

## 6. 準 Monte Carlo 法 QMC1–QMC8

| ID | 講座 |
|---|---|
| QMC1 | 一様分布・discrepancy・Koksma–Hlawka |
| QMC2 | RKHS・最悪誤差・重み付き空間 |
| QMC3 | 格子則 |
| QMC4 | (t,m,s)-net・(t,s)-sequence |
| QMC5 | Walsh 解析と digital net の双対理論 |
| QMC6 | polynomial lattice |
| QMC7 | randomized QMC |
| QMC8 | 高次 QMC |

準 Monte Carlo 法では、標本平均の確率変動ではなく、点集合がどれだけ一様に空間を埋めるかを誤差評価へ結びつけます。

---

## 7. 既存系列との接続

数値解析・差分法・有限要素法は、主として次へ接続します。

- 線形代数
- 実解析・関数解析
- ODE
- PDE
- Encore III の Sobolev 空間・弱形式・楕円型 PDE

Monte Carlo・準 Monte Carlo は、主として次へ接続します。

- 測度論・Lebesgue 積分
- 確率論
- 大数の法則・中心極限定理
- RKHS

既存の canonical result は重複再証明せず、各講で必要な適用条件を局所的に確認して使います。

---

## 8. この系列で身につける見方

Encore V の狙いは「数値計算法を使える」だけではありません。

連続問題を計算機で扱うとき、

1. 何を近似しているのか
2. どの誤差が支配的なのか
3. 安定性はどこで必要なのか
4. 計算量を増やすとどの速さで誤差が減るのか
5. 理論上の仮定が数値法のどこへ現れるのか

を追えることを目標にします。
