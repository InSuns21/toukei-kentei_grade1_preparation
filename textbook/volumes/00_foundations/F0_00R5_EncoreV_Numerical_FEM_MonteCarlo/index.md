# F0-00R5 Encore V：Numerical Analysis, FEM & Monte Carlo

この系列は、Encore IIIの弱解・FEMへの橋とEncore IVのSDE・確率過程を、実際の数値計算へ延長する任意の発展補講です。

通常カリキュラム・統計検定1級本編の必須前提にはしません。

---

## 1. 推奨通読ルート

```text
共通数値基礎
F0-00F   線形代数・スペクトル
   ↓
F0-00NA1 浮動小数点・誤差・条件数・安定性
   ↓
F0-00NA2 数値線形代数・疎行列・CG・前処理
   ↓
F0-00NA3 補間・数値微分・数値積分
   ↓
F0-00NA4 ODE数値解法・Runge--Kutta・安定性

FEM branch                         Monte Carlo / SDE branch
Encore III                         P5/P6 + Encore IV SP4
WK3 Galerkin/FEM bridge             │
   ↓                                ↓
F0-00FEM1                        F0-00MC1
mesh・basis・assembly              Monte Carlo・LLN/CLT
   │                                ↓
   │                             F0-00MC2
   │                             variance reduction
   │                                ↓
   │                             F0-00SDE1
   │                             Euler--Maruyama
   │                                │
   └──────────────┬─────────────────┘
                  ↓
             F0-00UQ1
       random PDE・Monte Carlo FEM
                  ↓
             F0-00MLMC
       Multilevel Monte Carlo
```

全講を一本道に読む場合は

```text
NA1 → NA2 → NA3 → NA4 → FEM1 → MC1 → MC2 → SDE1 → UQ1 → MLMC
```

を推奨します。

---

## 2. NA1：まず誤差を分類する

数値結果が真値と違う原因を

- input/model error
- discretization error
- algebraic solver error
- roundoff error
- sampling error

へ分けます。

さらに

- conditioning：問題の性質
- stability：アルゴリズムの性質

を区別します。

以後の全章でこの誤差分解を再利用します。

---

## 3. NA2：FEMのsolve()を開ける

FEMは最終的に

$$
KU=F
$$

という巨大疎線形系になります。

NA2では

- LU / Cholesky
- sparse matrix
- residual
- stationary iteration
- Conjugate Gradient
- Krylov subspace
- preconditioning

を扱います。

coercivityから生まれたSPD構造が、CGを使える理由になります。

---

## 4. NA3：連続量を有限個の値へ落とす

- interpolation
- finite difference
- quadrature
- Gaussian quadrature

を扱います。

Sturm--Liouvilleで出た直交多項式がGaussian quadratureへ戻り、FEM element integralにも使われます。

---

## 5. NA4：時間を離散化する

ODEに対して

- forward/backward Euler
- Runge--Kutta
- absolute stability
- stiffness
- adaptive step
- method of lines

を扱います。

PDE空間離散化後のODE系にも、SDE数値法の比較対象にもなります。

---

## 6. FEM1：弱形式を疎行列へ変換する

Poisson問題から

$$
\int\nabla u\cdot\nabla v
=
\int fv
$$

を有限要素空間へ制限し

$$
K_{ij}=a(\phi_j,\phi_i)
$$

を構成します。

局所element matrixをglobal matrixへassemblyし、疎線形系として解きます。

Ceaの補題から $h$ による誤差評価へ進みます。

---

## 7. MC1：積分を標本平均へ変換する

$$
I=E[g(X)]
$$

を

$$
\widehat I_N
=\frac1N\sum_i g(X_i)
$$

で推定します。

P5のLLNがconsistency、P6のCLTが

$$
O(N^{-1/2})
$$

の標準誤差を与えます。

Monte Carloが確率論の応用ではなく、数値積分法として読めるようになります。

---

## 8. MC2：標本数を増やす前にvarianceを下げる

- antithetic variates
- control variate
- stratification
- importance sampling
- common random numbers

を扱います。

control variateは回帰・直交射影、stratificationは標本抽出論、importance samplingは測度変更として既存理論へ戻ります。

---

## 9. SDE1：確率微分方程式をsimulationする

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

を

$$
X_{n+1}
=X_n+b(X_n)h+\sigma(X_n)\sqrt h Z_n
$$

と離散化します。

ここでは

- strong convergence
- weak convergence
- Euler--Maruyama
- Milstein

を区別します。

期待値だけ欲しいときとpath精度が欲しいときでは数値法の評価基準が違います。

---

## 10. UQ1：FEMとMonte Carloを合流する

random coefficient PDE

$$
-\nabla\cdot(a(x,\omega)\nabla u)=f
$$

をsampleごとにFEMで解きます。

random fieldは共分散作用素のKarhunen--Loeve展開で有限parameter化できます。

Monte Carlo FEMの総誤差は

$$
\boxed{
\text{model/truncation}
+
\text{FEM bias}
+
\text{sampling error}
+
\text{solver error}
}
$$

として管理します。

地下水流のrandom permeabilityを主要例にします。

---

## 11. MLMC：粗い計算も全部使う

$$
E[Q_L]
=E[Q_0]+
\sum_{\ell=1}^L E[Q_\ell-Q_{\ell-1}]
$$

と分解し、level差をMonte Carloします。

fine/coarseを同じ乱数でcoupleすることで差のvarianceを小さくし、sample数を

$$
N_\ell\propto\sqrt{V_\ell/C_\ell}
$$

の思想で配分します。

FEM mesh hierarchyとSDE time-step hierarchyの両方に適用できます。

---

## 12. Encore III/IVとの交点

```text
Encore III
Sobolev → weak solution → Galerkin
                         ↓
                       FEM1
                         ↓
                     random PDE
                         ↓
                        MLMC

Encore IV
Brown → Ito → SDE
               ↓
          Euler--Maruyama
               ↓
          Monte Carlo
               ↓
              MLMC
```

IIIとIVはVの別々の地下水脈として合流します。

---

## 13. 通読可能性の停止線

Encore Vは次までで閉じます。

- floating-point / conditioning / stability
- sparse numerical linear algebra
- interpolation / finite difference / quadrature
- basic ODE solvers
- basic conforming FEM
- Monte Carlo integration and variance reduction
- Euler--Maruyama / Milstein entry
- Monte Carlo FEM
- MLMC

以下は必須にしません。

- full multigrid theory
- domain decomposition
- discontinuous Galerkin
- mixed FEM
- spectral element method
- finite volume method
- advanced adaptive a posteriori theory
- MCMC general theory
- sequential Monte Carlo
- polynomial chaos / stochastic Galerkin
- quasi-Monte Carlo complete theory
- stochastic PDE discretization

---

## 14. 所要時間

10講を読解・小演習・復習込みで

$$
\boxed{45\text{--}50\text{ 時間程度}}
$$

を想定します。

---

## 15. 最終的な景色

```text
解析学 ─→ 弱解 ─→ FEM ───────────┐
                                  │
線形代数 ─→ 条件数 ─→ CG ─────────┤
                                  ↓
                            random PDE
                                  ↓
確率論 ─→ LLN/CLT ─→ Monte Carlo ─┤
                                  ↓
Brown運動 ─→ SDE ─→ EM/Milstein ──┤
                                  ↓
                                 MLMC
```

**Encore V: Numerical Analysis, FEM & Monte Carlo** はここまでです。
