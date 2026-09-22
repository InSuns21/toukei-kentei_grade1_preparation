# F0-00FEM1 Encore V：メッシュ・基底関数・assembly・Poisson FEM

Encore IIIではGalerkin法とCeaの補題まで進みました。

ここでは

$$
\text{弱形式}
\to
\text{有限次元基底}
\to
\text{要素行列}
\to
\text{assembly}
\to
\text{疎線形系}
$$

を実際に構成します。

---

## 1. モデル問題

区間 $0<x<1$ で

$$
-u''=f,
\qquad
u(0)=u(1)=0
$$

を考えます。

弱形式は

$$
\boxed{
\int_0^1u'v'\,dx
=
\int_0^1fv\,dx
\qquad(\forall v\in H_0^1(0,1))
}
$$

です。

---

## 2. メッシュ

$$
0=x_0<x_1<\cdots<x_N=1
$$

と区間を分割し

$$
K_e=[x_e,x_{e+1}]
$$

をelementと呼びます。

最大要素幅を

$$
h=\max_e|K_e|
$$

とします。

---

## 3. piecewise linear finite element space

$$
V_h
=
\{v_h\in C([0,1]):v_h|_{K_e}\text{ は一次},\ v_h(0)=v_h(1)=0\}
$$

とします。

これは $H_0^1(0,1)$ の有限次元部分空間です。

---

## 4. nodal basis

内部節点 $x_i$ に対し

$$
\phi_i(x_j)=\delta_{ij}
$$

を満たすhat function $\phi_i$ を取ります。

すると

$$
\boxed{
u_h(x)=\sum_{j=1}^{N-1}U_j\phi_j(x)}
$$

で、係数 $U_j$ は節点値そのものです。

---

## 5. Galerkin条件から行列へ

全ての基底関数 $\phi_i$ をtest functionに取ると

$$
\sum_jU_j
\int_0^1\phi_j'\phi_i'\,dx
=
\int_0^1f\phi_i\,dx.
$$

したがって

$$
\boxed{KU=F}
$$

で

$$
K_{ij}=\int_0^1\phi_j'\phi_i'\,dx,
\qquad
F_i=\int_0^1f\phi_i\,dx.
$$

$K$ をstiffness matrixと呼びます。

---

## 6. 一要素上の局所行列

長さ $h_e$ の要素上で線形基底を使うと

$$
\boxed{
K^{(e)}
=\frac1{h_e}
\begin{pmatrix}
1&-1\\
-1&1
\end{pmatrix}
}
$$

です。

この2×2行列を各elementで作り、global matrixへ足し込みます。

---

## 7. assembly

局所自由度からglobal自由度への対応を使い

$$
K_{I(a),I(b)}
\mathrel{+}=K_{ab}^{(e)}
$$

と加算します。

各elementは近傍節点にしか寄与しないのでglobal matrixは疎になります。

---

## 8. load vector

同様に

$$
F_a^{(e)}
=
\int_{K_e}f(x)\phi_a^{(e)}(x)dx
$$

を計算してglobal vectorへassemblyします。

$f$ が単純でなければNA3のGaussian quadratureを使います。

---

## 9. Dirichlet境界条件

$u(0)=u(1)=0$ は $H_0^1$ と有限要素空間の定義へ組み込みました。

非零Dirichlet条件ならliftingや境界自由度の消去を使います。

Neumann条件は弱形式の部分積分で自然境界条件として現れます。

---

## 10. 2次元三角形要素

多角形領域を三角形に分割し、各三角形上で一次関数を使います。

各頂点にnodal basisを対応させ、element stiffness matrixを計算し同じassemblyを行います。

原理は一次元と同じです。

---

## 11. 参照要素

要素ごとに別々の積分公式を書く代わりに、標準的なreference element $\widehat K$ から写像

$$
F_K:\widehat K\to K
$$

で実要素へ移します。

Jacobianによる変数変換を使えば、基底評価・quadratureを共通化できます。

---

## 12. 誤差評価

Encore IIIのCeaの補題から

$$
\|u-u_h\|_{H^1}
\le C
\inf_{v_h\in V_h}
\|u-v_h\|_{H^1}.
$$

一次要素で $u$ が十分滑らかなら典型的に

$$
\boxed{
\|u-u_h\|_{H^1}
\le Ch\,|u|_{H^2}
}
$$

です。

さらに適切な条件下で $L^2$ 誤差は $O(h^2)$ まで改善します。

---

## 13. h-refinementとp-refinement

精度を上げる方法は

- $h$ を小さくする：h-refinement
- 要素内の多項式次数 $p$ を上げる：p-refinement
- 両方を行う：hp-method

があります。

局所的に誤差が大きい場所だけ細かくするadaptive mesh refinementも重要です。

---

## 14. solver誤差もある

離散化して $KU=F$ を得ても、反復solverを途中で止めればalgebraic errorが残ります。

したがって

$$
\boxed{
\text{total error}
\le
\text{FEM discretization error}
+
\text{linear solver error}
}
$$

です。

NA2のCGと前処理がここで実務上不可欠になります。

---

## 15. FEMアルゴリズム

基本形は

1. mesh生成
2. finite element space選択
3. 各elementで局所行列・局所vector計算
4. global assembly
5. boundary condition適用
6. sparse solverで解く
7. 誤差推定・必要ならmesh refinement

です。

弱解理論が、そのまま実装手順へ落ちました。

---

## 章末チェック

- Poisson方程式の弱形式から有限次元線形系を導ける。
- nodal basisとhat functionを説明できる。
- element stiffness matrixを導ける。
- assemblyでglobal sparse matrixができる理由を説明できる。
- reference elementの役割を説明できる。
- Ceaの補題からFEM誤差評価への流れを説明できる。
- h/p refinementを区別できる。
- discretization errorとsolver errorを区別できる。
