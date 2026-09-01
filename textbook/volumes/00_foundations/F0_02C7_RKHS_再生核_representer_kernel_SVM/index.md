# F0-02C7 関数解析VII：RKHS・再生核・representer theorem・kernel SVM

ここまでの関数解析をkernel法へ戻します。

出発点は驚くほど単純です。

> 関数 $f$ を扱うHilbert空間で、点 $x$ における値 $f(x)$ を安定に取り出したい。

つまり評価汎関数

$$
\delta_x(f)=f(x)
$$

を連続にしたいのです。

この一条件からRiesz表現定理を通じて

$$
\boxed{
\text{評価汎関数}
\to
\text{kernel section}
\to
\text{再生核}
\to
\text{kernel内積}
}
$$

が現れます。

---

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

すべての $x$ について $\delta_x$ が連続なら、$\mathcal H$ を **再生核Hilbert空間（RKHS）** といいます。

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

$$
\boxed{
f(x)
=\delta_x(f)
=\langle f,K_x\rangle_{\mathcal H}
}
$$

となります。

この式を **再生性** といいます。

「関数の一点の値」が、Hilbert空間内積として再現されています。

---

## 4. 再生核

各 $x$ に対応する $K_x$ 自身も $\mathcal X$ 上の関数です。

そこで

$$
\boxed{
K(x,z)=K_z(x)
}
$$

と定めます。

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

逆向きの発想として、集合 $\mathcal X$ 上の対称関数

$$
K:\mathcal X\times\mathcal X\to\mathbb R
$$

が、任意の有限点列 $x_1,\dots,x_n$ と係数 $c_1,\dots,c_n$ に対して

$$
\boxed{
\sum_{i,j}c_ic_jK(x_i,x_j)\ge0
}
$$

を満たすとき、**positive semidefinite kernel** と呼びます。

重要なのは

> 好きな「類似度関数」をkernelとして使えるわけではない。

という点です。

少なくともkernel法のHilbert空間解釈には、この半正定値性が必要です。

---

## 8. canonical feature map

RKHS自身を特徴空間として

$$
\boxed{
\varphi(x)=K_x
}
$$

と置けます。

これを **canonical feature map** といいます。

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

その後、完備化します。

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

ここでF0-00Dの「完備化」が実際に登場しました。

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

## 16. representer theoremが必要になる理由

RKHSが無限次元でも、学習データは有限個

$$
(x_1,y_1),\dots,(x_n,y_n)
$$

です。

多くの学習問題では目的関数が

1. 訓練点での値 $f(x_i)$
2. 関数の複雑さ $\|f\|_{\mathcal H}$

だけに依存します。

すると最適解は、無限次元空間全体を探さなくても

$$
\operatorname{span}
\{K_{x_1},\dots,K_{x_n}\}
$$

の中に取れます。

これがrepresenter theoremです。

---

## 17. representer theoremの標準形

例えば

$$
\min_{f\in\mathcal H}
L(f(x_1),\dots,f(x_n))
+\Omega(\|f\|_{\mathcal H})
$$

を考えます。

$\Omega$ が単調増加で、最小解が存在するとします。

このとき少なくとも一つの最小解を

$$
\boxed{
f^*(\cdot)
=\sum_{i=1}^n\alpha_iK(\cdot,x_i)
}
$$

という有限和の形に取れます。

$\Omega$ が厳密単調増加なら、最小解の不要な直交成分は必ず0になります。

---

## 18. 証明：標本点が張る部分空間へ直交分解する

$$
S
=\operatorname{span}
\{K_{x_1},\dots,K_{x_n}\}
$$

とします。

Hilbert空間なので任意の $f\in\mathcal H$ を

$$
\boxed{
f=f_{\parallel}+f_{\perp}}
$$

と直交分解でき、

$$
f_{\parallel}\in S,
\qquad
f_{\perp}\in S^\perp.
$$

---

## 19. 直交成分は訓練点で見えない

再生性より

$$
f_{\perp}(x_i)
=\langle f_{\perp},K_{x_i}\rangle.
$$

しかし $K_{x_i}\in S$、$f_{\perp}\in S^\perp$ なので

$$
\boxed{f_{\perp}(x_i)=0}.
$$

したがって

$$
f(x_i)=f_{\parallel}(x_i)
$$

です。

つまり損失 $L$ から見ると $f_{\perp}$ は完全に不可視です。

---

## 20. しかし直交成分はノルムだけ増やす

Pythagorasの定理から

$$
\|f\|^2
=\|f_{\parallel}\|^2
+\|f_{\perp}\|^2
\ge\|f_{\parallel}\|^2.
$$

したがって $f_{\perp}$ を捨てても訓練点での予測値は変わらず、正則化項は悪化しません。

よって最適解は $S$ の中に取れます。

$$
\boxed{
\text{有限標本しか見ない損失}
+\text{Hilbertノルム正則化}
\Longrightarrow
\text{有限次元解}
}
$$

です。

---

## 21. kernel SVMの主問題

特徴写像

$$
\varphi(x)\in\mathcal H
$$

をHilbert空間に取ります。

soft-margin SVMの主問題は

$$
\min_{w\in\mathcal H,b\in\mathbb R,\xi_i\ge0}
\frac12\|w\|_{\mathcal H}^2
+C\sum_{i=1}^n\xi_i
$$

subject to

$$
y_i
\bigl(
\langle w,\varphi(x_i)\rangle_{\mathcal H}+b
\bigr)
\ge1-\xi_i.
$$

これはまさに **Hilbert空間上の凸最適化** です。

---

## 22. Lagrangian

マージン制約に $\alpha_i\ge0$、$\xi_i\ge0$ に $\mu_i\ge0$ を入れると

$$
\begin{aligned}
L
&=\frac12\|w\|^2
+C\sum_i\xi_i\\
&\quad+
\sum_i\alpha_i
\left[
1-\xi_i
-y_i(\langle w,\varphi(x_i)\rangle+b)
\right]
-\sum_i\mu_i\xi_i.
\end{aligned}
$$

$w$ に関するFréchet微分を取ります。

---

## 23. stationarityから有限和が出る

F0-02C3で見たように

$$
D_w\frac12\|w\|^2[h]
=\langle w,h\rangle.
$$

また

$$
D_w\langle w,\varphi(x_i)\rangle[h]
=\langle h,\varphi(x_i)\rangle.
$$

したがって $w$ に関するstationarityは

$$
\left\langle
w-\sum_i\alpha_i y_i\varphi(x_i),
 h
\right\rangle
=0
\qquad(\forall h\in\mathcal H).
$$

Riesz表現の一意性から

$$
\boxed{
w
=\sum_{i=1}^n
\alpha_i y_i\varphi(x_i)
}.
$$

無限次元かもしれない空間で、最適法線が有限個の訓練特徴の張る空間へ落ちました。

---

## 24. $b$ と $\xi$ のstationarity

$b$ について

$$
\boxed{
\sum_i\alpha_i y_i=0
}
$$

が得られます。

$\xi_i$ について

$$
C-\alpha_i-\mu_i=0.
$$

$\mu_i\ge0$ なので

$$
\boxed{0\le\alpha_i\le C}.
$$

---

## 25. 双対目的関数

$w$ の有限和表示をLagrangianへ戻すと

$$
\boxed{
\max_{\alpha}
\sum_{i=1}^n\alpha_i
-
\frac12
\sum_{i,j=1}^n
\alpha_i\alpha_jy_iy_j
\langle\varphi(x_i),\varphi(x_j)\rangle
}
$$

subject to

$$
0\le\alpha_i\le C,
\qquad
\sum_i\alpha_i y_i=0.
$$

ここで

$$
\langle\varphi(x_i),\varphi(x_j)\rangle
=K(x_i,x_j)
$$

なので

$$
\boxed{
\max_{\alpha}
\sum_i\alpha_i
-
\frac12
\sum_{i,j}
\alpha_i\alpha_jy_iy_jK(x_i,x_j)
}
$$

となります。

特徴ベクトルそのものは消え、kernel値だけが残ります。

---

## 26. 判別関数

新しい入力 $x$ に対して

$$
\begin{aligned}
f(x)
&=\langle w,\varphi(x)\rangle+b\\
&=
\sum_i\alpha_i y_i
\langle\varphi(x_i),\varphi(x)\rangle+b\\
&=
\boxed{
\sum_i\alpha_i y_iK(x_i,x)+b
}.
\end{aligned}
$$

したがって予測時にも特徴空間の座標を明示する必要がありません。

---

## 27. サポートベクトル

$\alpha_i=0$ の訓練点は

$$
w
=\sum_i\alpha_i y_i\varphi(x_i)
$$

にも判別関数にも寄与しません。

したがって

$$
\boxed{\alpha_i>0}
$$

の点だけが解を直接支えます。

これが **support vector** という名前の代数的な意味です。

相補性条件と合わせると、どの点がmargin上・margin内・誤分類側にあるかをさらに整理できます。具体的なKKT分類はE1-04へ戻ります。

---

## 28. representer theoremとSVM stationarityは同じ現象を見る

representer theoremは

$$
f^*\in\operatorname{span}\{K_{x_i}\}
$$

と言います。

SVMのstationarityは

$$
w^*\in\operatorname{span}\{\varphi(x_i)\}
$$

と言います。

canonical feature map

$$
\varphi(x)=K_x
$$

を使えば同じ構造です。

つまり

$$
\boxed{
\text{無限次元の最適化}
\quad\text{なのに}\quad
\text{解は有限標本が張る部分空間へ落ちる}
}
$$

ことがkernel法の核心です。

---

## 29. 「kernel trick」の正体

よくある説明は

> 高次元へ写して内積だけkernelで計算する。

です。

関数解析まで遡ると、より正確には

$$
\boxed{
\begin{array}{c}
K\text{ がPSD}\\
\Downarrow\\
K\text{ を再生核とするRKHSが存在}\\
\Downarrow\\
\varphi(x)=K_x\\
\Downarrow\\
K(x,z)=\langle\varphi(x),\varphi(z)\rangle\\
\Downarrow\\
\text{representer theorem / KKTにより有限和解}\\
\Downarrow\\
\text{Gram行列だけで学習できる}
\end{array}
}
$$

です。

---

## 30. Mercerの定理とは区別する

kernelの説明で「Mercerの定理」が同義語のように使われることがありますが、区別した方が安全です。

**Moore--Aronszajnの定理** は、抽象的なPSD kernelとRKHSの対応を与えます。

一方 **Mercerの定理** は、コンパクトな領域上の連続kernelなど追加条件の下で、積分作用素の固有関数を用いた展開を与える定理です。

したがって

$$
\boxed{
\text{kernelからRKHSを得るだけなら
Moore--Aronszajnが基本}
}
$$

と整理します。

---

## 31. 02C系列の全体回収

ここまでの7講を一本にすると

$$
\boxed{
\begin{array}{c}
\text{ノルム・完備性}\\
\Downarrow\\
\text{Banach / Hilbert}\\
\Downarrow\\
\text{双対空間・Riesz}\\
\Downarrow\\
\text{Fr\'echet微分・随伴}\\
\Downarrow\\
\text{normal cone・双対錐}\\
\Downarrow\\
\text{一般化KKT・制約想定}\\
\Downarrow\\
\text{Hahn--Banach・分離}\\
\Downarrow\\
\text{RKHS・再生核・kernel SVM}
\end{array}
}
$$

です。

SVMのkernelは最後に突然追加された計算テクニックではありません。

**線形代数・最適化を関数空間まで一般化していくと、かなり自然な場所に現れる構造**です。

---

## 章末チェック

- RKHSを評価汎関数の連続性から定義できる。
- Riesz表現から再生性 $f(x)=\langle f,K_x\rangle$ を導ける。
- 再生核のGram行列が半正定値であることを示せる。
- PSD kernelからRKHSを構成するMoore--Aronszajnの流れを説明できる。
- representer theoremを直交分解から証明できる。
- kernel SVMで $w=\sum_i\alpha_i y_i\varphi(x_i)$ を導ける。
- SVM双対と判別関数をkernel値だけで書ける。
- Moore--AronszajnとMercerの役割を区別できる。
