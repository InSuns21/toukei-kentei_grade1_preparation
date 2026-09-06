from pathlib import Path

BLOCKS = {
    "textbook/volumes/00_foundations/F0_00A3_半順序_Zorn_極大延長/index.md": r'''

---

## 定義の確認：包含関係で4概念を区別する

<!-- definition-example-start: def-partial-order, def-maximum-maximal, def-chain, def-upper-bound-poset -->
**定義の確認**

$P=\mathcal P(\{1,2\})$ に包含関係 $\subseteq$ を入れます。包含関係は反射律・反対称律・推移律を満たすので $(P,\subseteq)$ は半順序集合です。

$$
C=\{\varnothing,\{1\},\{1,2\}\}
$$

では任意の2要素が包含関係で比較できるので $C$ はchainです。また $\{1,2\}$ は $C$ の全要素を含むので上界です。

一方、$Q=\{\{1\},\{2\}\}$ だけを包含関係で順序付けると、$\{1\}$ と $\{2\}$ はどちらもこれ以上大きい要素を $Q$ 内に持たないので極大元ですが、両方を上から支配する要素は $Q$ にないため最大元は存在しません。これで「極大」と「最大」が別概念であることも定義から確認できます。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00C1_コンパクト性_点列コンパクト性_Heine_Borel/index.md": r'''

---

## 定義の確認：有限集合なら全部を手で確かめられる

<!-- definition-example-start: def-f0-00c1-01, def-f0-00c1-02, def-f0-00c1-03, def-f0-00c1-totally-bounded, def-f0-00c1-lebesgue-number -->
**定義の確認**

$K=\{0,1\}\subset\mathbb R$ を通常の距離で考えます。$K$ の開被覆が与えられたら、0を含む開集合を1つ、1を含む開集合を1つ選べば高々2個で $K$ を覆えるので、$K$ はコンパクトです。$K$ 内の任意の無限列では0か1の少なくとも一方が無限回現れるため、その定数部分列を取れば点列コンパクト性も直接確認できます。

任意の $\varepsilon>0$ に対して

$$
K\subset B(0,\varepsilon)\cup B(1,\varepsilon)
$$

なので全有界です。また開被覆

$$
\mathcal U=\{(-1/4,1/4),(3/4,5/4)\}
$$

に対しては $\delta=1/8$ とすれば、$x=0,1$ のどちらでも $B(x,\delta)\cap K$ が対応する被覆要素1個に含まれます。したがって $1/8$ はこの被覆のLebesgue数です。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00D_Cauchy列_完備性_無限次元/index.md": r'''

---

## 定義の確認：Cauchy性と完備性は列と空間の別条件

<!-- definition-example-start: def-f0-00d-01, def-f0-00d-02 -->
**定義の確認**

$\mathbb R$ で $x_n=1/n$ とします。$m,n\ge N$ なら

$$
|x_m-x_n|\le \frac1m+\frac1n\le\frac2N,
$$

なので、$N>2/\varepsilon$ と取ればCauchy条件を満たします。さらに $x_n\to0\in\mathbb R$ です。

一方、$\sqrt2$ の有限小数近似を有理数列として並べると $\mathbb Q$ 内ではCauchy列ですが、極限 $\sqrt2$ は $\mathbb Q$ に属しません。したがって「列がCauchyである」は列の性質、「すべてのCauchy列が空間内で収束する」は空間の完備性であり、$\mathbb R$ は完備、$\mathbb Q$ は完備ではありません。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00D1_ノルム_Banach_有限次元_無限次元/index.md": r'''

---

## 定義の確認：$\mathbb R^2$ の標準ノルム

<!-- definition-example-start: def-f0-00d1-01, def-f0-00d1-02, def-f0-00d1-03 -->
**定義の確認**

$V=\mathbb R^2$ にEuclidノルム $\|x\|_2=(x_1^2+x_2^2)^{1/2}$ を入れます。正定値性・絶対斉次性・三角不等式を満たすのでこれはノルムであり、$\mathbb R^2$ はこのノルムについて完備なのでBanach空間です。

さらに全ての $x\in\mathbb R^2$ について

$$
\|x\|_\infty\le\|x\|_2\le\sqrt2\,\|x\|_\infty
$$

です。したがって $\|\cdot\|_2$ と $\|\cdot\|_\infty$ は、定義の $c=1, C=\sqrt2$ を取れる同値なノルムです。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00D2D_Lp_Holder_Minkowski/index.md": r'''

---

## 定義の確認：測度0集合を潰してから $L^p$ ノルムを測る

<!-- definition-example-start: def-f0-00d2d-01, def-f0-00d2d-02, def-f0-00d2d-03 -->
**定義の確認**

$[0,1]$ にLebesgue測度を入れ、$f=0$ と

$$
g(x)=1_{\{1/2\}}(x)
$$

を考えます。両者が異なるのは測度0の一点だけなので $f=g$ a.e.、従って $[f]=[g]$ です。

また $h=1_{[0,1/2]}$ なら $1\le p<\infty$ に対して

$$
\|h\|_p
=\left(\int_0^1|h|^pdx\right)^{1/p}
=2^{-1/p}<\infty,
$$

したがって $h\in L^p([0,1])$ です。一方 $|h|\le1$ a.e. で、1より小さい定数では $[0,1/2]$ 上を抑えられないため $\|h\|_\infty=1$。よって $h\in L^\infty([0,1])$ でもあります。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00D2E_L2完備性_Riesz_Fischer/index.md": r'''

---

## 定義の確認：有限次元Hilbert空間で4定義を一周する

<!-- definition-example-start: def-f0-00d2e-01, def-f0-00d2e-02, def-f0-00d2e-03, def-f0-00d2e-04 -->
**定義の確認**

$V=\mathbb R^2$、$x_n=(1/n,0)$ とします。$m,n\ge N$ なら

$$
\|x_m-x_n\|_2=|1/m-1/n|\le1/N,
$$

なので $(x_n)$ はCauchy列です。$\mathbb R^2$ はEuclidノルムについて完備なのでBanach空間です。

標準内積

$$
\langle x,y\rangle=x_1y_1+x_2y_2
$$

は $\|x\|_2=\sqrt{\langle x,x\rangle}$ を誘導し、このノルムについて $\mathbb R^2$ は完備です。したがって同じ例で、内積とHilbert空間の定義も確認できます。$L^2$ では有限和が積分へ置き換わるだけで、定義の構造は同じです。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00F2_SVD_特異値_作用素ノルム/index.md": r'''

---

## 定義の確認：対角行列のSVD

<!-- definition-example-start: def-f0-00f2-singular-values-right-vectors, def-f0-00f2-left-singular-vectors, def-f0-00f2-operator-norm -->
**定義の確認**

$$
A=\begin{pmatrix}3&0\\0&2\end{pmatrix}
$$

とすると

$$
A^{\mathsf T}A=\begin{pmatrix}9&0\\0&4\end{pmatrix}.
$$

従って特異値は $\sigma_1=3,\sigma_2=2$、右特異ベクトルは $v_1=e_1,v_2=e_2$ です。さらに

$$
u_i=\frac{Av_i}{\sigma_i}=e_i
$$

なので左特異ベクトルも $e_1,e_2$ です。

単位ベクトル $x=(x_1,x_2)$ に対して

$$
\|Ax\|_2^2=9x_1^2+4x_2^2\le9(x_1^2+x_2^2)=9,
$$

等号は $x=e_1$ で達成されるので $\|A\|_{\mathrm{op}}=3$。最大特異値と作用素ノルムが一致することも定義から直接見えます。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_00P7B_QMD_LAN/index.md": r'''

---

## 定義の確認：正規位置モデルはQMD

<!-- definition-example-start: def-f0-00p7b-qmd -->
**定義の確認**

$P_\theta=N(\theta,1)$ とし、Lebesgue測度に関する密度を $p_\theta$ とします。このとき

$$
\sqrt{p_\theta(x)}=(2\pi)^{-1/4}\exp\left(-\frac{(x-\theta)^2}{4}\right)
$$

なので

$$
\frac{\partial}{\partial\theta}\sqrt{p_\theta(x)}
=\frac12(x-\theta)\sqrt{p_\theta(x)}.
$$

従ってscore $s_\theta(x)=x-\theta$ に対し、平方根密度の一次項はQMD定義の

$$
\frac12h\,s_\theta\sqrt{p_\theta}
$$

と一致します。正規密度は十分滑らかで導関数も二乗可積分なのでTaylor剰余は $L^2$ で $o(|h|)$、従って定義式の二乗積分は $o(h^2)$ です。これは正規位置モデルがQMDである代表例です。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02B_分離超平面定理_Farkas_SVM/index.md": r'''

---

## 定義の確認：$\mathbb R^2$ で凸包・錐・超平面を見る

<!-- definition-example-start: def-f0-02b-convex-combination-set-hull, def-f0-02b-cones, def-f0-02b-hyperplane -->
**定義の確認**

$e_1=(1,0), e_2=(0,1)$ とします。$0\le t\le1$ に対する

$$
te_1+(1-t)e_2=(t,1-t)
$$

は凸結合であり、$\operatorname{conv}\{e_1,e_2\}$ はこの線分全体です。

一方

$$
K=\{\lambda_1e_1+\lambda_2e_2:\lambda_1,\lambda_2\ge0\}=\mathbb R_+^2
$$

は非負スカラー倍で閉じ、さらに凸集合なので有限生成凸錐です。係数和を1に固定する凸包と、係数和を制限しない錐の違いがこの2式に表れています。

また

$$
H=\{x\in\mathbb R^2:(1,1)^{\mathsf T}x=1\}
$$

は $a=(1,1)\ne0,b=1$ と書けるので超平面です。先ほどの凸包はちょうどこの超平面上の第1象限部分にあります。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02C1_ノルム空間_Banach_Hilbert/index.md": r'''

---

## 定義の確認：Euclid空間はBanachかつHilbert

<!-- definition-example-start: def-f0-02c1-norm-normed-space, def-f0-02c1-banach-space, def-f0-02c1-inner-product, def-f0-02c1-hilbert-space -->
**定義の確認**

$X=\mathbb R^2$ に

$$
\langle x,y\rangle=x_1y_1+x_2y_2,
\qquad
\|x\|_2=\sqrt{x_1^2+x_2^2}
$$

を入れます。標準内積は正定値性・対称性・線形性を満たし、そこから誘導される $\|\cdot\|_2$ は正定値性・絶対斉次性・三角不等式を満たすのでノルムです。

さらに $\mathbb R^2$ のEuclidノルムに関するCauchy列は各座標が $\mathbb R$ のCauchy列になり、各座標極限をまとめた点へ収束します。従って $\mathbb R^2$ はBanach空間であり、しかもこの完備ノルムが内積から来ているのでHilbert空間です。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02C2_線形汎関数_双対空間_Riesz/index.md": r'''

---

## 定義の確認：積分と点評価は双対空間の元になる

<!-- definition-example-start: def-f0-02c2-linear-functional, def-f0-02c2-dual-space, def-f0-02c2-evaluation-functional -->
**定義の確認**

$X=C([0,1])$ にsupノルムを入れ、

$$
\ell(f)=\int_0^1f(t)\,dt
$$

とします。積分の線形性から $\ell(af+bg)=a\ell(f)+b\ell(g)$ で、さらに

$$
|\ell(f)|\le\|f\|_\infty
$$

なので $\ell$ は連続線形汎関数、すなわち $\ell\in X^*$ です。

また $x=1/2$ を固定した評価汎関数

$$
\delta_{1/2}(f)=f(1/2)
$$

も

$$
|\delta_{1/2}(f)|\le\|f\|_\infty
$$

を満たすため連続で、$\delta_{1/2}\in X^*$ です。これで「線形汎関数」「双対空間」「評価汎関数」の三つを同じ関数空間上で確認できます。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02C6_Hahn_Banach_分離定理/index.md": r'''

---

## 定義の確認：ノルムはsublinear functional

<!-- definition-example-start: def-f0-02c6-sublinear-functional -->
**定義の確認**

$X=\mathbb R^2$ で

$$
p(x)=\|x\|_2
$$

と置きます。三角不等式から

$$
p(x+y)\le p(x)+p(y),
$$

また $a\ge0$ ならノルムの絶対斉次性から

$$
p(ax)=\|ax\|_2=a\|x\|_2=ap(x).
$$

従ってEuclidノルムはsublinear functionalの定義を満たします。Hahn--Banachでノルムを支配関数に使えるのはこのためです。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02C7_RKHS_再生核_representer_kernel_SVM/index.md": r'''

---

## 定義の確認：線形kernelからRKHSを全部組み立てる

<!-- definition-example-start: def-f0-02c7-rkhs, def-f0-02c7-reproducing-property, def-f0-02c7-reproducing-kernel, def-f0-02c7-psd-kernel, def-f0-02c7-canonical-feature-map -->
**定義の確認**

$\mathcal X=\mathbb R^p$ とし、

$$
\mathcal H=\{f_w:f_w(x)=w^{\mathsf T}x,\ w\in\mathbb R^p\},
\qquad
\langle f_w,f_v\rangle_{\mathcal H}=w^{\mathsf T}v
$$

とします。有限次元なので $\mathcal H$ はHilbert空間です。各 $x$ について

$$
|f_w(x)|\le\|w\|_2\|x\|_2=\|f_w\|_{\mathcal H}\|x\|_2
$$

だから評価汎関数は連続で、$\mathcal H$ はRKHSです。

$K_x=f_x$ と置けば

$$
\langle f_w,K_x\rangle_{\mathcal H}=w^{\mathsf T}x=f_w(x),
$$

なので再生性を満たし、再生核は

$$
K(x,z)=K_z(x)=z^{\mathsf T}x=x^{\mathsf T}z
$$

です。任意の $x_i,c_i$ に対して

$$
\sum_{i,j}c_ic_jK(x_i,x_j)
=\left\|\sum_i c_ix_i\right\|_2^2\ge0
$$

なのでこのkernelはPSDです。さらにcanonical feature mapは $\varphi(x)=K_x$ で、この例では係数ベクトル $x$ そのものと同一視できます。
<!-- definition-example-end -->
''',

    "textbook/volumes/00_foundations/F0_02_制約付き最適化_双対_KKT/index.md": r'''

---

## 定義の確認：1変数問題で主問題から強双対性まで計算する

<!-- definition-example-start: def-f0-02-lagrangian, def-f0-02-dual-function, def-f0-02-primal-dual-problem, def-f0-02-weak-strong-duality, def-f0-02-active-constraint -->
**定義の確認**

本文と同じ

$$
\min_x (x-2)^2
\qquad\text{subject to}\qquad x\le1
$$

を使います。$g(x)=x-1\le0$ と書けば、$\alpha\ge0$ に対するLagrangianは

$$
L(x,\alpha)=(x-2)^2+\alpha(x-1).
$$

$x$ で最小化すると $x=2-\alpha/2$ なので、双対関数は

$$
q(\alpha)=\inf_xL(x,\alpha)
=\alpha-\frac{\alpha^2}{4}.
$$

元の最小化が主問題、$\max_{\alpha\ge0}q(\alpha)$ が双対問題です。主問題は $x^*=1$ で $p^*=1$、双対問題は $\alpha^*=2$ で

$$
d^*=q(2)=1=p^*.
$$

従ってこの例では弱双対性 $q(\alpha)\le p^*$ を満たすだけでなく強双対性も成立します。また $g(x^*)=0$ なので制約 $x\le1$ は最適点でactiveです。
<!-- definition-example-end -->
''',
}

for rel, block in BLOCKS.items():
    path = Path(rel)
    text = path.read_text(encoding="utf-8")
    marker = block.split("\n<!-- definition-example-start:", 1)[1].split(" -->", 1)[0]
    if f"<!-- definition-example-start:{marker} -->" in text:
        continue
    path.write_text(text.rstrip() + block + "\n", encoding="utf-8")

print(f"Prepared definition-example verification blocks for {len(BLOCKS)} page(s).")
