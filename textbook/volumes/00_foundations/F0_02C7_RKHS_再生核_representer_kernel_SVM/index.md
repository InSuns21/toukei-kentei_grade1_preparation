# F0-02C7 関数解析VII：RKHS・再生核・Moore--Aronszajn

評価汎関数の連続性からRiesz表現を通じて再生核を得て、逆にPSD kernelからRKHSを構成するところまでを閉じます。学習アルゴリズムは次講C7Aです。

## 1. なぜ一般のHilbert関数空間では足りないのか

F0-02C1, C2で $L^2([0,1])$ をHilbert空間の代表例として見ました。

しかし $L^2$ の元は「ほとんど至る所等しい関数」を同一視した同値類です。

一点 $x$ の値だけを変えても同じ $L^2$ の元なので

$$
f\mapsto f(x)
$$

は一般には空間の元から一意に定まりません。

したがって

$$
\boxed{
\text{Hilbert空間である}
\not\Rightarrow
\text{点評価が使える}
}
$$

です。

RKHSはここへ追加条件を入れます。

---

## 2. RKHSの定義

入力集合を $\mathcal X$ とし、$\mathcal X$ 上の実数値関数からなるHilbert空間を $\mathcal H$ とします。

各 $x\in\mathcal X$ に対して評価汎関数

$$
\delta_x:\mathcal H\to\mathbb R,
\qquad
\delta_x(f)=f(x)
$$

を考えます。

<a id="def-f0-02c7-rkhs"></a>

<!-- formal-statement-start -->
> **定義（再生核Hilbert空間）**  
> 集合 $\mathcal X$ 上の実数値関数からなるHilbert空間 $\mathcal H$ で、すべての $x\in\mathcal X$ について評価汎関数 $\delta_x(f)=f(x)$ が連続であるものを **再生核Hilbert空間（RKHS）** といいます。
<!-- formal-statement-end -->

$$
\boxed{
\mathcal H\text{ がRKHS}
\Longleftrightarrow
\delta_x\in\mathcal H^*
\quad(\forall x\in\mathcal X)
}
$$

です。

---

## 3. Riesz表現を評価汎関数へ使う

$\delta_x$ は連続線形汎関数です。

したがってRiesz表現定理により、各 $x$ に対して一意な

$$
K_x\in\mathcal H
$$

が存在して

<a id="def-f0-02c7-reproducing-property"></a>

<!-- formal-statement-start -->
> **定義（再生性）**  
> RKHS $\mathcal H$ において、各 $x$ に対応する $K_x\in\mathcal H$ が

$$
f(x)=\langle f,K_x\rangle_{\mathcal H}\qquad(\forall f\in\mathcal H)
$$

> を満たす性質を **再生性** といいます。
<!-- formal-statement-end -->

「関数の一点の値」が、Hilbert空間内積として再現されています。

---

## 4. 再生核

各 $x$ に対応する $K_x$ 自身も $\mathcal X$ 上の関数です。

<a id="def-f0-02c7-reproducing-kernel"></a>

<!-- formal-statement-start -->
> **定義（再生核）**  
> RKHSで評価汎関数を表現する $K_x$ を用いて

$$
K(x,z)=K_z(x)
$$

> と定めた二変数関数 $K$ を **再生核** といいます。
<!-- formal-statement-end -->

再生性を $f=K_z$ に適用すると

$$
K_z(x)
=\langle K_z,K_x\rangle_{\mathcal H}.
$$

したがって

$$
\boxed{
K(x,z)
=\langle K_z,K_x\rangle_{\mathcal H}
}
$$

です。

これが **再生核** です。

---

## 5. kernelは対称になる

実Hilbert空間では内積が対称なので

$$
K(x,z)
=\langle K_z,K_x\rangle
=\langle K_x,K_z\rangle
=K(z,x).
$$

したがって

$$
\boxed{K(x,z)=K(z,x)}.
$$

---

## 6. Gram行列は半正定値になる

任意の点

$$
x_1,\dots,x_n\in\mathcal X
$$

と実数

$$
c_1,\dots,c_n
$$

に対し

$$
\begin{aligned}
\sum_{i,j=1}^n
c_ic_jK(x_i,x_j)
&=
\sum_{i,j}c_ic_j
\langle K_{x_j},K_{x_i}\rangle\\
&=
\left\|
\sum_{i=1}^n c_iK_{x_i}
\right\|_{\mathcal H}^2\\
&\ge0.
\end{aligned}
$$

したがってGram行列

$$
\boldsymbol K
=(K(x_i,x_j))_{i,j}
$$

は半正定値です。

$$
\boxed{
c^{\mathsf T}\boldsymbol Kc\ge0}
$$

が任意の $c$ で成立します。

---

## 7. positive semidefinite kernel

<a id="def-f0-02c7-psd-kernel"></a>

<!-- formal-statement-start -->
> **定義（positive semidefinite kernel）**  
> 集合 $\mathcal X$ 上の対称関数 $K:\mathcal X\times\mathcal X\to\mathbb R$ が、任意の有限点列 $x_1,\dots,x_n$ と実係数 $c_1,\dots,c_n$ に対して

$$
\sum_{i,j}c_ic_jK(x_i,x_j)\ge0
$$

> を満たすとき、$K$ を **positive semidefinite kernel** といいます。
<!-- formal-statement-end -->

重要なのは

> 好きな「類似度関数」をkernelとして使えるわけではない。

という点です。

少なくともkernel法のHilbert空間解釈には、この半正定値性が必要です。

---

## 8. canonical feature map

<a id="def-f0-02c7-canonical-feature-map"></a>

<!-- formal-statement-start -->
> **定義（canonical feature map）**  
> RKHS $\mathcal H$ とその再生核 $K$ に対し、

$$
\varphi(x)=K_x
$$

> と定める写像 $\varphi:\mathcal X\to\mathcal H$ を **canonical feature map** といいます。
<!-- formal-statement-end -->

すると

$$
\boxed{
\langle\varphi(x),\varphi(z)\rangle_{\mathcal H}
=K(x,z)
}
$$

です。

kernel trickの式

$$
K(x,z)
=\langle\varphi(x),\varphi(z)\rangle
$$

は、RKHSでは作り話ではなく自然な構成として出てきます。

---

## 9. 代表的なkernel

### 9.1 線形kernel

$\mathcal X=\mathbb R^p$ で

$$
\boxed{K(x,z)=x^{\mathsf T}z}
$$

です。

特徴写像はそのまま $\varphi(x)=x$ と取れます。

### 9.2 多項式kernel

$c\ge0$、正整数 $d$ に対して

$$
\boxed{
K(x,z)=(x^{\mathsf T}z+c)^d
}
$$

は標準的な半正定値kernelです。

展開すると有限個の単項式特徴の内積と解釈できます。

### 9.3 Gaussian kernel

$\gamma>0$ に対して

$$
\boxed{
K(x,z)=\exp(-\gamma\|x-z\|^2)
}
$$

も標準的な半正定値kernelです。

対応するRKHSは一般に無限次元です。

しかし学習アルゴリズムが必要とするのは多くの場合 $K(x_i,x_j)$ であり、無限個の特徴座標を明示的に並べる必要はありません。

---

## 10. 逆向き：kernelからRKHSを作れるのか

ここまで

$$
\text{RKHS}
\Longrightarrow
\text{再生核}
$$

を示しました。

ではpositive semidefinite kernel $K$ を先に与えたら、それを再生核とするRKHSを作れるでしょうか。

答えは yes です。

これが **Moore--Aronszajnの定理** です。

---

## 11. Moore--Aronszajnの定理

<a id="thm-f0-02c7-moore-aronszajn"></a>

<!-- formal-statement-start -->
> **定理（Moore--Aronszajnの定理）**  
> 集合 $\mathcal X$ 上の対称なpositive semidefinite kernel $K:\mathcal X\times\mathcal X\to\mathbb R$ を与えます。このとき $K$ を再生核とする再生核Hilbert空間が存在し、関数Hilbert空間として一意に定まります。
<!-- formal-statement-end -->

任意のpositive semidefinite kernel

$$
K:\mathcal X\times\mathcal X\to\mathbb R
$$

に対して、$K$ を再生核とするRKHSが存在し、関数空間として自然な意味で一意です。

つまり

$$
\boxed{
\text{PSD kernel}
\Longleftrightarrow
\text{あるRKHSの再生核}
}
$$

という対応があります。

---

## 12. 構成の第一歩：kernel sectionの有限線形結合

各 $x\in\mathcal X$ に対して形式的に

$$
K_x(\cdot)=K(\cdot,x)
$$

を考えます。

それらの有限線形結合

$$
f
=\sum_{i=1}^n a_iK_{x_i}
$$

全体をまず集めます。

この段階では

$$
\mathcal H_0
=\operatorname{span}\{K_x:x\in\mathcal X\}
$$

です。

---

## 13. 内積をkernelから定義する

$$
f=\sum_i a_iK_{x_i},
\qquad
g=\sum_j b_jK_{z_j}
$$

に対して

$$
\boxed{
\langle f,g\rangle_0
=\sum_{i,j}a_ib_jK(x_i,z_j)
}
$$

と定義します。

半正定値性から

$$
\langle f,f\rangle_0\ge0
$$

です。

表現の仕方によって同じ関数が複数の係数表示を持つ場合や、ノルム0の形式的要素が生じる場合は、ノルム0のものを同一視して商空間を取ります。

ここで **完備化（completion）** とは、もとの内積空間を稠密部分空間として含む完備な内積空間へ拡張する操作です。一般にはCauchy列の同値類を用いて構成でき、完備化は等長同型を除いて一意です。

その後、この意味で完備化します。

---

## 14. 完備化してRKHSを得る

$\mathcal H_0$ を上の内積で完備化して

$$
\mathcal H
$$

を作ります。

この構成では

$$
\langle f,K_x\rangle
=f(x)
$$

が成り立ちます。

したがって点評価は

$$
|f(x)|
=|\langle f,K_x\rangle|
\le\|f\|\,\|K_x\|
$$

とCauchy--Schwarzで抑えられ、連続です。

よって $\mathcal H$ はRKHSです。

ここで、上で定義した「完備化」が実際に登場しました。

---

## 15. kernel sectionのノルム

再生核の式から

$$
\|K_x\|_{\mathcal H}^2
=\langle K_x,K_x\rangle
=K(x,x).
$$

したがって

$$
\boxed{\|K_x\|=\sqrt{K(x,x)}}.
$$

評価汎関数のノルムもRiesz表現から

$$
\boxed{
\|\delta_x\|_{\mathcal H^*}
=\sqrt{K(x,x)}
}
$$

です。

---

## 演習

### F0-02C7-A01 線形kernelのPSD性

- Level: A
- 目安時間: 10分

$K(x,z)=x^Tz$ がPSD kernelであることを示せ。

<!-- solution-start -->
#### 詳細解答
任意の係数$c_i$について $\sum_{ij}c_ic_jx_i^Tx_j=\|\sum_i c_ix_i\|^2\ge0$。
#### 本番答案
任意の係数$c_i$について $\sum_{ij}c_ic_jx_i^Tx_j=\|\sum_i c_ix_i\|^2\ge0$。
#### 採点基準（20点）
- 定義・設定: 6点
- 推論・計算: 10点
- 結論: 4点
<!-- solution-end -->

### F0-02C7-B01 評価汎関数のノルム

- Level: B
- 目安時間: 15分

RKHSで $\|\delta_x\|=\sqrt{K(x,x)}$ を示せ。

<!-- solution-start -->
#### 詳細解答
Riesz表現で $\delta_x(f)=\langle f,K_x\rangle$ なので $\|\delta_x\|=\|K_x\|$。さらに $\|K_x\|^2=K(x,x)$。
#### 本番答案
Riesz表現で $\delta_x(f)=\langle f,K_x\rangle$ なので $\|\delta_x\|=\|K_x\|$。さらに $\|K_x\|^2=K(x,x)$。
#### 採点基準（20点）
- 方針: 5点
- 中心となる導出: 11点
- 結論: 4点
<!-- solution-end -->

---

## 次に進む

**次：[F0-02C7A representer theorem・kernel SVM](../F0_02C7A_representer_kernel_SVM/index.md)**
