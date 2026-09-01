# F0-00NA4 Encore V：ODE数値解法・Runge--Kutta・安定性

初期値問題

$$
y'(t)=f(t,y(t)),\qquad y(t_0)=y_0
$$

を解析的に解けない場合、時間を離散化します。

---

## 1. forward Euler

Taylor展開から

$$
y(t+h)=y(t)+hy'(t)+O(h^2)
$$

なので

$$
\boxed{y_{n+1}=y_n+h f(t_n,y_n)}
$$

を得ます。

局所打切り誤差は $O(h^2)$、適切な条件下で大域誤差は $O(h)$ です。

---

## 2. consistencyとconvergence

刻み幅 $h\to0$ で差分式が元の微分方程式へ戻る性質をconsistencyと呼びます。

しかしconsistentだから必ず数値解が正しいとは限りません。誤差が時間発展で増幅されないstabilityも必要です。

---

## 3. test equation

安定性を見る基本問題は

$$
y'=\lambda y
$$

です。

forward Eulerでは

$$
y_{n+1}=(1+h\lambda)y_n.
$$

真の解が減衰する $\operatorname{Re}\lambda<0$ でも、数値解が減衰するには

$$
\boxed{|1+h\lambda|<1}
$$

が必要です。

刻み幅が大きすぎると、安定なODEを数値的に爆発させます。

---

## 4. absolute stability region

数値法をtest equationへ適用して

$$
y_{n+1}=R(h\lambda)y_n
$$

となるとき

$$
|R(z)|\le1
$$

となる $z$ の領域をabsolute stability regionと呼びます。

数値法の安定性を複素平面上の領域として比較できます。

---

## 5. backward Euler

$$
\boxed{y_{n+1}=y_n+h f(t_{n+1},y_{n+1})}
$$

はimplicit法です。

test equationでは

$$
y_{n+1}=\frac{1}{1-h\lambda}y_n.
$$

左半平面全体で安定なのでA-stableです。

ただし各stepで方程式を解く必要があります。

---

## 6. stiff equation

異なる時間尺度を含み、最も速い減衰モードのためにexplicit法の刻み幅を極端に小さく要求される問題をstiffと呼びます。

拡散方程式を空間離散化したODE系はstiffになりやすく、implicit法の重要な用途です。

---

## 7. midpointとRunge--Kutta

Euler法は区間始点の傾きだけ使います。

より高精度にするには途中の傾きも評価します。

古典4次Runge--Kutta法は

$$
k_1=f(t_n,y_n),
$$
$$
k_2=f(t_n+h/2,y_n+hk_1/2),
$$
$$
k_3=f(t_n+h/2,y_n+hk_2/2),
$$
$$
k_4=f(t_n+h,y_n+hk_3)
$$

から

$$
\boxed{y_{n+1}=y_n+\frac h6(k_1+2k_2+2k_3+k_4)}
$$

とします。

大域誤差は典型的に $O(h^4)$ です。

---

## 8. adaptive time stepping

常に同じ $h$ を使う必要はありません。

異なる次数の近似を同時に作り差を誤差推定に使えば、誤差が大きい区間ではstepを細かく、小さい区間では粗くできます。

---

## 9. method of lines

PDEを空間だけ離散化すると

$$
M\dot U(t)+KU(t)=F(t)
$$

のような大規模ODE系になります。

その後NA4の時間積分法を適用します。

つまり

$$
\boxed{\text{PDE}\to\text{spatial discretization}\to\text{ODE system}\to\text{time integrator}}
$$

です。

---

## 10. heat equationとCFL型制約

熱方程式を中心差分＋forward Eulerで離散化すると、安定性のため典型的に

$$
\Delta t\lesssim C(\Delta x)^2
$$

という制約が現れます。

空間を細かくすると時間stepも二乗で細かくする必要があり、explicit法が高価になります。

---

## 11. consistency + stability -> convergence

線形問題ではLax equivalence theoremに代表されるように、適切な設定で

$$
\boxed{\text{consistency}+\text{stability}\Longrightarrow\text{convergence}}
$$

という原理があります。

「局所式が正しそう」だけでなく、誤差伝播を解析することが数値解析です。

---

## 章末チェック

- forward EulerをTaylor展開から導ける。
- 局所誤差と大域誤差を区別できる。
- test equationからabsolute stabilityを説明できる。
- explicitとimplicit法を比較できる。
- stiffnessを説明できる。
- RK4の構造を説明できる。
- method of linesを説明できる。
- consistency・stability・convergenceの関係を説明できる。
