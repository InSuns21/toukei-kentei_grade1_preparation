# QFT64 Virasoro・OPE・レプリカ・高次元境界相関の総合演習

<!-- definition-example-audit: strict -->

QFT IVでは、共形対称性が相関関数を制約する仕組みと、局所領域の量子もつれを計算する仕組みを別々に学びました。ここでは同じ数式をもう一度眺めるのではなく、**どの仮定を使ったかを自分で追跡できるか**を確かめます。特に、Virasoro表現の零状態、OPEと交差対称性、整数レプリカと解析接続、熱円筒と空間円周、境界鏡像と大 $N$ 因子化を接続します。

## 1. 設定と解法の地図

この章は総合演習です。新しい一般定理を仮定する章ではありません。必要な道具は次のとおりです。

1. **二次元正則理論：** [Virasoroの交換子](../QFT51/index.md#thm-qft51-virasoro)、[最高ウェイトのレベル2 Gram行列](../QFT52/index.md#thm-qft52-level-gram)、[自由電流のOPE](../QFT54/index.md#prop-qft54-current-ope)。自由電流 $a(z)$ は $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$t=\tfrac12:\!a^2\!:$、$c=1$ とします。挿入点は相異なり、正則四点の実交差比は $0<x<1$ とします。
2. **レプリカと円筒：** [有限状態のレプリカ貼り合わせ](../QFT58/index.md#thm-qft58-sewing-trace)、[twistウェイト](../QFT58/index.md#thm-qft58-twist-weight)、[熱円筒](../QFT60/index.md#thm-qft60-thermal-renyi)と[空間円周](../QFT60/index.md#thm-qft60-circle-renyi)。整数 $n\ge2$ と $n\to1$ の微分は、別の論理段階です。
3. **高次元の全空間と物理的境界：** $d\ge3$ のEuclid場に対する[四点交差式](../QFT63/index.md#thm-qft63-crossing)、[大 $N$ 因子化の条件](../QFT63/index.md#def-qft63-large-n-factorizing)、[半空間の鏡像Green核](../QFT63/index.md#thm-qft63-half-space-image)。半空間は $z>0$、Dirichlet/Neumannは $z=0$ で課します。ホログラフィーでいう漸近境界とは異なります。
4. **量子情報との接続：** [有限cutoffでのエンタングルメント第一法則](../QFT61/index.md#thm-qft61-first-law)と[相対エントロピーの単調性](../QFT62/index.md#thm-qft62-region-monotonicity)。連続体の無限次元代数へ無条件に移しません。

前半のレベルAは手順を一度ずつ確かめ、レベルBはその手順を別の設定へ転用し、レベルCは一つの解答の中で異なる講の仮定を取り違えない練習です。解答を見る前に、使用する結果の対象・仮定・規格化を書き出してください。

## 2. Level A：一つの道具を確実に使う

<a id="ex-qft64-a01"></a>

### QFT64-A01 レベル2内積の三成分

- Level: A
- 対応目標: Virasoroの最高ウェイト・内積

$L_n^\dagger=L_{-n}$、$L_n|h\rangle=0$（$n>0$）、$\langle h|h\rangle=1$ を仮定する。$c=1,h=1/4$ で、$L_{-2}|h\rangle,L_{-1}^2|h\rangle$ のGram行列と、その固有値を求めよ。

<!-- solution-start -->
### 詳細解答

[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)により $[L_2,L_{-2}]=4L_0+c/2$、$[L_2,L_{-1}]=3L_1$、$[L_1,L_{-1}]=2L_0$ です。したがって各内積は

$$
\begin{aligned}
\langle h|L_2L_{-2}|h\rangle&=4h+c/2=3/2,\\
\langle h|L_2L_{-1}^2|h\rangle&=3\langle h|L_1L_{-1}|h\rangle=6h=3/2,\\
\langle h|L_1^2L_{-1}^2|h\rangle&=(4h+2)2h=3/2.
\end{aligned}
$$

最後の式は $L_1L_{-1}^2|h\rangle=(4h+2)L_{-1}|h\rangle$ を先に使いました。[Gram行列の正本](../QFT52/index.md#thm-qft52-level-gram)とも一致し、

$$
G_2=\frac32\begin{pmatrix}1&1\\1&1\end{pmatrix},
\qquad \det(G_2-\lambda I)=\lambda(\lambda-3).
$$

固有値は $0,3$ です。零固有値があっても普遍Verma加群の二つの形式的子孫が同一という意味ではありません。
<!-- solution-end -->

<a id="ex-qft64-a02"></a>

### QFT64-A02 電流四点の三対合と規格化

- Level: A
- 対応目標: OPE・Wick対合・正則交差比

$\langle a(z)a(w)\rangle=(z-w)^{-2}$ の自由正則電流について、$F(x)=\langle a(\infty)a(1)a(x)a(0)\rangle$ と $\mathcal G(x)=x^2F(x)$ を $x=1/2$ で求めよ。無限遠挿入を $a(\infty)=\lim_{R\to\infty}R^2a(R)$ で定義する。

<!-- solution-start -->
### 詳細解答

[自由電流四点のWick表示](../QFT54/index.md#def-qft54-reduced-four-point)で、有限 $R$ の三対合は

$$
\frac1{(R-1)^2x^2}+\frac1{(R-x)^2}
+\frac1{R^2(1-x)^2}.
$$

各項に $R^2$ を掛けて $R\to\infty$ とすると

$$
F(x)=x^{-2}+1+(1-x)^{-2}.
$$

$x=1/2$ なら $F=4+1+4=9$、$\mathcal G=x^2F=9/4$ です。$\mathcal G$ と未縮約の $F$ を混同すると $4$ 倍の誤差が出ます。
<!-- solution-end -->

<a id="ex-qft64-a03"></a>

### QFT64-A03 有限密度行列の整数レプリカ

- Level: A
- 対応目標: 有限レプリカのトレースとRényiエントロピー

有限次元密度行列 $\rho=\operatorname{diag}(1/2,1/3,1/6)$ について $R_2=\operatorname{Tr}\rho^2$、$R_3=\operatorname{Tr}\rho^3$、$S_2,S_3$ を求めよ。$S_n=(1-n)^{-1}\ln R_n$ とする。

<!-- solution-start -->
### 詳細解答

固有値は非負で総和 $1$ なので $\rho$ は密度行列です。[レプリカの添字貼り合わせ](../QFT58/index.md#thm-qft58-sewing-trace)から

$$
R_2=\frac14+\frac19+\frac1{36}=\frac7{18},
\qquad
R_3=\frac18+\frac1{27}+\frac1{216}=\frac16.
$$

定義を使うと $S_2=-\ln(7/18)=\ln(18/7)$、$S_3=-\tfrac12\ln(1/6)=\tfrac12\ln6$ です。これは有限行列の厳密な計算であり、場の切断領域で密度行列が存在するという新たな主張ではありません。
<!-- solution-end -->

<a id="ex-qft64-a04"></a>

### QFT64-A04 熱円筒と空間円周で符号が変わる

- Level: A
- 対応目標: 二つの円筒と短区間極限

$c=1,n=2$ とし、$D_\beta(\ell)=\beta\sinh(\pi\ell/\beta)/\pi$、$D_L(\ell)=L\sin(\pi\ell/L)/\pi$ を用いる。$\ell\ll\min(\beta,L)$ で $\ln[D_\beta(\ell)/\ell]$、$\ln[D_L(\ell)/\ell]$ の最初の非零項を求めよ。

<!-- solution-start -->
### 詳細解答

$y=\pi\ell/\beta$ とすると $\sinh y/y=1+y^2/6+O(y^4)$、従って $\ln(\sinh y/y)=y^2/6+O(y^4)$ です。同様に $z=\pi\ell/L$ では $\sin z/z=1-z^2/6+O(z^4)$ なので

$$
\ln\frac{D_\beta(\ell)}\ell=\frac{\pi^2\ell^2}{6\beta^2}+O(\ell^4/\beta^4),
\quad
\ln\frac{D_L(\ell)}\ell=-\frac{\pi^2\ell^2}{6L^2}+O(\ell^4/L^4).
$$

[円筒Rényi式](../QFT60/index.md#thm-qft60-thermal-renyi)の長さ対数に掛かる係数は $\alpha_2=c(1+1/2)/6=1/4$ です。熱と空間円周を区別せず $\sinh$ に統一すると二次の符号を誤ります。
<!-- solution-end -->

<a id="ex-qft64-a05"></a>

### QFT64-A05 鏡像の幾何と符号

- Level: A
- 対応目標: 半空間境界条件

$d=4$ の半空間で、境界に平行な座標が同じ二点 $z=1,z'=2$ を取る。$c_4=1/(4\pi^2)$ とし、$r^2,r_*^2,\xi=r^2/(4zz')$、$G_D/c_4,G_N/c_4$ を求めよ。

<!-- solution-start -->
### 詳細解答

点間距離は $r^2=(1-2)^2=1$、像点 $(\boldsymbol y',-2)$ までは $r_*^2=(1+2)^2=9$、$\xi=1/(4\cdot1\cdot2)=1/8$ です。[半空間鏡像Green核](../QFT63/index.md#thm-qft63-half-space-image)の指数は $2-d=-2$ なので

$$
G_D/c_4=1-\frac19=\frac89,\qquad
G_N/c_4=1+\frac19=\frac{10}9.
$$

差をとるDirichlet核は境界で値が零、和をとるNeumann核は法線微分が零です。係数だけを替える操作ではありません。
<!-- solution-end -->

<a id="ex-qft64-a06"></a>

### QFT64-A06 大Nの数え上げを数値へ

- Level: A
- 対応目標: 行列模型の連結累積量

独立標準Gaussian変数 $g_1,\dots,g_{N^2}$ に対し $X=N^{-1}\sum_a g_a^2-N$ とする。$N=4$ における分散、三次・四次累積量を求めよ。

<!-- solution-start -->
### 詳細解答

[Gaussian行列模型の累積量](../QFT63/index.md#thm-qft63-matrix-cumulants)は $k\ge2$ で $\kappa_k=2^{k-1}(k-1)!N^{2-k}$ です。個別に代入すると

$$
\kappa_2=2^1\,1!=2,\quad
\kappa_3=\frac{2^2\,2!}{4}=2,\quad
\kappa_4=\frac{2^3\,3!}{4^2}=3.
$$

$N=4$ では三次・四次がまだ零ではありません。大 $N$ 因子化は $N\to\infty$ の次数の主張です。
<!-- solution-end -->

## 3. Level B：別の講の結果をつないで検算する

<a id="ex-qft64-b01"></a>

### QFT64-B01 零ノルムを特異ベクトルと判定する

- Level: B
- 対応目標: Gram行列と正モードの区別

A01の $c=1,h=1/4$ で $v=(L_{-2}-L_{-1}^2)|h\rangle$ とする。$L_1v,L_2v$ を交換子から計算し、零ノルムだけで何が結論できないかを説明せよ。

<!-- solution-start -->
### 詳細解答

[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)から

$$
\begin{aligned}
L_1L_{-2}|h\rangle&=3L_{-1}|h\rangle,\\
L_1L_{-1}^2|h\rangle&=2(L_0L_{-1}+L_{-1}L_0)|h\rangle\\
&=(4h+2)L_{-1}|h\rangle=3L_{-1}|h\rangle,\\
L_2L_{-2}|h\rangle&=(4h+c/2)|h\rangle=\tfrac32|h\rangle,\\
L_2L_{-1}^2|h\rangle&=6h|h\rangle=\tfrac32|h\rangle.
\end{aligned}
$$

よって $L_1v=L_2v=0$。$n\ge3$ では $[L_n,L_{-2}]=(n+2)L_{n-2}$ と $[L_n,L_{-1}]=(n+1)L_{n-1}$ から、最終的に全て正モードが最高ウェイトを消すため $L_nv=0$。これで特異ベクトルの条件を確認しました。[QFT52の系](../QFT52/index.md#cor-qft52-c1-null)のように、Verma加群の形式的 $v$ は非零ですが、正値内積の具体表現では零ノルムベクトルを商で落とします。「零ノルムだから元の代数で恒等的に $v=0$」は誤りです。
<!-- solution-end -->

<a id="ex-qft64-b02"></a>

### QFT64-B02 OPEの定数項と一次項を四点で照合する

- Level: B
- 対応目標: OPEの局所係数を相関関数で検証

A02の $F(x)$ を $x\to0$ で $x$ の一次まで展開せよ。さらに $a(x)a(0)=x^{-2}+2t(0)+x\partial t(0)+O(x^2)$ と $\langle t(w)a(\infty)a(1)\rangle=(w-1)^{-2}$ が同じ係数を与えることを確かめよ。

<!-- solution-start -->
### 詳細解答

幾何級数を微分すると $(1-x)^{-2}=\sum_{k\ge0}(k+1)x^k=1+2x+3x^2+\cdots$（$|x|<1$）。よって

$$
F(x)=x^{-2}+2+2x+O(x^2).
$$

[自由電流の局所OPE](../QFT54/index.md#prop-qft54-current-ope)と $\langle a(\infty)a(1)\rangle=1$ から、特異項は $x^{-2}$、定数項は $2\langle t(0)a(\infty)a(1)\rangle=2(0-1)^{-2}=2$ です。一次項では

$$
\langle\partial t(0)a(\infty)a(1)\rangle
=\left.\frac{d}{dw}(w-1)^{-2}\right|_{w=0}
=-2(-1)^{-3}=2.
$$

OPEの三項と四点の直接対合が一致します。ただし $x\to0$ は他の点 $1,\infty$ を固定した領域での展開であり、この局所的な等式から全複素平面での展開の正当性までは主張していません。
<!-- solution-end -->

<a id="ex-qft64-b03"></a>

### QFT64-B03 整数値が同じでも解析接続の微分は違う

- Level: B
- 対応目標: 整数レプリカと $n\to1$ の論理差

A03の $\rho$ に対し $R(n)=\sum_i p_i^n$ を実数 $n>0$ へ拡張する。$\varepsilon\in\mathbb R$ で $\widetilde R(n)=R(n)\exp(\varepsilon\sin\pi(n-1))$ と置く。両者が全ての正整数で一致し、$n=1$ で正規化されることを確認してから、$-\partial_n\ln R|_{1}$ と $-\partial_n\ln\widetilde R|_{1}$ を比較せよ。

<!-- solution-start -->
### 詳細解答

正整数 $m$ なら $\sin\pi(m-1)=0$ なので $\widetilde R(m)=R(m)=\operatorname{Tr}\rho^m$。また $R(1)=\sum p_i=1$ で指数因子も $1$、実 $n$ で $\widetilde R(n)>0$ です。一方

$$
\begin{aligned}
-\left.\partial_n\ln R(n)\right|_1
&=-\sum_i p_i\ln p_i\\
&=\tfrac12\ln2+\tfrac13\ln3+\tfrac16\ln6,\\
-\left.\partial_n\ln\widetilde R(n)\right|_1
&=-\left.\partial_n\ln R(n)\right|_1-\varepsilon\pi.
\end{aligned}
$$

後者は一般には物理的な密度行列族のレプリカ関数とは限りません。そのためこれは**整数データだけでは微分が決まらない**反例であり、物理的解析接続が任意に選べるという主張ではありません。[条件付きエントロピー導出](../QFT58/index.md#prop-qft58-conditional-entropy)で必要な追加条件を確認してください。
<!-- solution-end -->

<a id="ex-qft64-b04"></a>

### QFT64-B04 二つの円筒の短区間差

- Level: B
- 対応目標: 円筒写像・cutoff・漸近評価

$c=1,n=2$、共通のUV cutoff $a$ と同じ端点規格化定数 $k_2$ を使える状況を仮定する。熱円筒と空間円周の区間Rényi主項の差 $S_2^\beta(\ell)-S_2^L(\ell)$ を $O(\ell^2)$ まで求めよ。$0<\ell\ll\min(\beta,L)$ とする。

<!-- solution-start -->
### 詳細解答

[熱円筒](../QFT60/index.md#thm-qft60-thermal-renyi)と[空間円周](../QFT60/index.md#thm-qft60-circle-renyi)の両式で、規格化定数 $k_2$ と $\ln a$ は差から消えます。A04の展開と $\alpha_2=1/4$ から

$$
\begin{aligned}
S_2^\beta-S_2^L
&=\frac14\ln\frac{D_\beta(\ell)}{D_L(\ell)}\\
&=\frac14\left[
\frac{\pi^2\ell^2}{6\beta^2}
+\frac{\pi^2\ell^2}{6L^2}
+O\!\left(\ell^4/\beta^4+\ell^4/L^4\right)\right]\\
&=\frac{\pi^2\ell^2}{24}\left(\beta^{-2}+L^{-2}\right)
+O\!\left(\ell^4/\beta^4+\ell^4/L^4\right).
\end{aligned}
$$

この等号は**普遍的CFTスケーリング主項同士**の比較です。有限cutoffの非普遍補正や幾何ごとに異なる端点定数まで無条件に等しいとはしていません。
<!-- solution-end -->

<a id="ex-qft64-b05"></a>

### QFT64-B05 境界で二点核が変わっても連結四点は消える

- Level: B
- 対応目標: 境界の効果と大 $N$ 効果の分離

半空間の中心化自由Gaussianスカラー場の、相異なる四点での二点核を $K_{ij}$ とする。$\langle\phi_1\phi_2\phi_3\phi_4\rangle$ と連結四点を $K_{ij}$ で表せ。A05の二点でDirichletとNeumannの核が異なることから「境界では連結四点が非零」とは結論できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

[Wickの対合公式](../QFT19/index.md#thm-qft19-boson-wick)はGaussian状態で成り立つので、境界で変化した二点核をそのまま用いて

$$
\langle\phi_1\phi_2\phi_3\phi_4\rangle
=K_{12}K_{34}+K_{13}K_{24}+K_{14}K_{23}.
$$

[連結四点の定義](../QFT63/index.md#def-qft63-connected-cumulants)で三つの二点積を引けば

$$
\langle\phi_1\phi_2\phi_3\phi_4\rangle_c=0.
$$

Dirichlet/Neumannでは [鏡像Green核](../QFT63/index.md#thm-qft63-half-space-image)によって各 $K_{ij}$ が違うため、全四点の数値も一般には異なります。しかし三対合だけで構成されている限り連結部分は両方で零です。境界効果と $N^{-2}$ の相互作用補正を混ぜてはいけません。
<!-- solution-end -->

<a id="ex-qft64-b06"></a>

### QFT64-B06 エンタングルメント第一法則の有限次元再計算

- Level: B
- 対応目標: モジュラーエネルギーと相対エントロピー

$\sigma=\operatorname{diag}(3/4,1/4)$、$\rho(t)=\operatorname{diag}(3/4+t,1/4-t)$、$|t|<1/4$ とする。$K_\sigma=-\ln\sigma$ に対する $\Delta\langle K_\sigma\rangle$、$\Delta S=S(\rho(t))-S(\sigma)$ を $t^2$ まで求め、$D(\rho(t)\Vert\sigma)$ の先頭係数を検算せよ。

<!-- solution-start -->
### 詳細解答

どちらも対角の忠実な密度行列です。[第一法則と相対エントロピーの恒等式](../QFT61/index.md#thm-qft61-first-law)に合わせ

$$
\Delta\langle K_\sigma\rangle
=-t\ln(3/4)+t\ln(1/4)=-t\ln3.
$$

$S(p)=-p\ln p-(1-p)\ln(1-p)$ とおけば $S'(p)=\ln[(1-p)/p]$、$S''(p)=-1/[p(1-p)]$ です。$p=3/4$ で $S'=-\ln3$、$S''=-16/3$ なので

$$
\Delta S=-t\ln3-\frac83t^2+O(t^3).
$$

従って $\Delta\langle K_\sigma\rangle-\Delta S=(8/3)t^2+O(t^3)$。直接、

$$
D=(3/4+t)\ln\left(1+\frac{4t}3\right)
+(1/4-t)\ln(1-4t)
$$

へ $\ln(1+s)=s-s^2/2+O(s^3)$ を代入しても一次項が相殺し、二次は $\tfrac12(4/3+4)t^2=8t^2/3$ です。$O(t)$ までが第一法則で、二次以降まで常に $\Delta S=\Delta K$ ではありません。
<!-- solution-end -->

<a id="ex-qft64-b07"></a>

### QFT64-B07 四点交差式を数値で反証テストする

- Level: B
- 対応目標: 高次元交差比と規格化

$d\ge3$ の同一直線上に $0,1,2,4$ の四点を置く。スカラー次元 $\Delta=2$ の一般化自由場型の先頭縮約関数を $\mathcal G_0(u,v)=1+u^2+(u/v)^2$ とする。$u,v,\mathcal G_0(u,v)$ を求め、$1\leftrightarrow3$ による交差式を両辺別々に計算せよ。

<!-- solution-start -->
### 詳細解答

[高次元交差比](../QFT48/index.md#def-qft48-conformal-cross-ratios)より、距離二乗の組は $r_{12}^2=1,r_{34}^2=4,r_{13}^2=4,r_{24}^2=9,r_{14}^2=16,r_{23}^2=1$。ゆえに

$$
u=\frac{1\cdot4}{4\cdot9}=\frac19,\quad
v=\frac{16\cdot1}{4\cdot9}=\frac49,\quad
\mathcal G_0(u,v)=1+\frac1{81}+\frac1{16}=\frac{1393}{1296}.
$$

[四点交差式](../QFT63/index.md#thm-qft63-crossing)の右辺は

$$
\left(\frac uv\right)^2\mathcal G_0(v,u)
=\frac1{16}\left[1+\frac{16}{81}+16\right]
=\frac1{16}\frac{1393}{81}
=\frac{1393}{1296}.
$$

両辺は一致します。交差式は解の整合条件であり、この具体的な対合解の一意性の証明ではありません。
<!-- solution-end -->

## 4. Level C：一つの解答で複数の境界線を守る

<a id="ex-qft64-c01"></a>

### QFT64-C01 Virasoroの零状態からレプリカ区間まで

- Level: C
- 対応目標: 最高ウェイト・OPE・twist・円筒の規約横断

中心電荷 $c=1$ の二次元自由boson CFTを考える。正則電流は $\langle a(z)a(w)\rangle=(z-w)^{-2}$、$t=\tfrac12:\!a^2\!:$ とする。次を一続きに検算せよ。

1. 実ウェイト $h=1/4$ の最高ウェイト状態についてレベル2のGram行列と零ノルム方向を求める。
2. 自由電流の正則四点 $F(x)$ と $x=1/2$ での縮約関数を求め、$x\to0$ の $x^0$ 項がOPEの $2t$ から得られることを確認する。
3. 整数 $n=2$ のtwistの正則ウェイト $h_2$、全スケーリング次元 $x_2$ と、平面上の単一区間の $S_2$ の $\ln(\ell/a)$ 係数を求める。
4. 同じ主項を熱円筒へ移したとき $\ell\ll\beta$ の最初の補正と、$n=1$ への操作で必要な追加条件を明記する。

<!-- solution-start -->
### 詳細解答

**(1)** [Virasoroレベル2行列](../QFT52/index.md#thm-qft52-level-gram)の三成分に $c=1,h=1/4$ を代入すると

$$
G_2=\begin{pmatrix}3/2&3/2\\3/2&3/2\end{pmatrix},
\qquad G_2\binom{1}{-1}=0.
$$

したがって $L_{-2}|h\rangle-L_{-1}^2|h\rangle$ が零ノルム方向です。正モードで消えることはB01の交換子計算で確認でき、具体的なユニタリ表現では零状態で割ります。

**(2)** [正則四点の対合](../QFT54/index.md#def-qft54-reduced-four-point)で $F(x)=x^{-2}+1+(1-x)^{-2}$。$x=1/2$ では $F=9,\mathcal G=x^2F=9/4$。[OPEの定数項](../QFT54/index.md#prop-qft54-current-ope)は

$$
\lim_{x\to0}[F(x)-x^{-2}]
=2,\qquad
2\langle t(0)a(\infty)a(1)\rangle=2(0-1)^{-2}=2.
$$

両者は一致します。(1)の最高ウェイト $h=1/4$ と、ここで使う電流の $h=1$ は**別の場**なので、ウェイトを取り違えません。

**(3)** [分岐一様化からのtwistウェイト](../QFT58/index.md#thm-qft58-twist-weight)は $h_n=\bar h_n=c(n-1/n)/24$。$n=2,c=1$ によって

$$
h_2=\frac1{16},\qquad x_2=h_2+\bar h_2=\frac18,\qquad
\operatorname{Tr}\rho_A^2\simeq C_2(\ell/a)^{-2x_2}=C_2(\ell/a)^{-1/4}.
$$

従って [単一区間Rényi式](../QFT59/index.md#prop-qft59-renyi-interval)で

$$
S_2=\frac14\ln(\ell/a)-\ln C_2+\text{cutoff補正}.
$$

**(4)** [熱円筒の区間式](../QFT60/index.md#thm-qft60-thermal-renyi)で $\ell$ を $D_\beta(\ell)=\beta\sinh(\pi\ell/\beta)/\pi$ に置き換えます。A04のTaylor展開より

$$
S_2^\beta
=\frac14\ln(\ell/a)-\ln C_2
+\frac{\pi^2\ell^2}{24\beta^2}
+O(\ell^4/\beta^4)+\text{非普遍補正}.
$$

指数 $n=2$ は整数レプリカで求められますが、$S_1$ を取り出すには、cutoff極限と $n\to1$ の微分に適した物理的補間・一様制御が別途必要です。B03の反例が示すように、整数一致だけでは十分ではありません。
<!-- solution-end -->

<a id="ex-qft64-c02"></a>

### QFT64-C02 高次元四点と物理的境界、大Nの限界

- Level: C
- 対応目標: 交差・大N・鏡像・連結相関の区別

$d=4$ の全空間で同一bosonスカラー一次場族 $\mathcal O_N$ の次元を $\Delta=1$ とし、[大N因子化の条件](../QFT63/index.md#def-qft63-large-n-factorizing)が相異なる固定点で成立すると仮定する。四点を同一直線上 $0,1,2,4$ に置く。一方、**別の模型**として半空間 $z>0$ に質量零自由Gaussianスカラー場 $\phi$ を置き、$z=1,2$ の二点を考える。

1. 全空間の先頭四点縮約関数と有限 $N$ 誤差の次数、$1\leftrightarrow3$ 交差式の右辺を求める。
2. 半空間の二点のDirichlet/Neumann鏡像核を $c_4=1/(4\pi^2)$ の倍数で求める。
3. 半空間の相異なる四点に対しGaussianの連結四点が零であることを示し、(1)と(2)を合わせてもAdS/CFTや重力双対を結論できない理由を述べる。

<!-- solution-start -->
### 詳細解答

**(1)** 距離の組を[交差比の定義](../QFT48/index.md#def-qft48-conformal-cross-ratios)へ代入すると $u=1/9,v=4/9$ です。[大N因子化の先頭四点関数](../QFT63/index.md#thm-qft63-leading-four-point)の定理により

$$
\mathcal G_N(u,v)=1+u+(u/v)+O(N^{-2})
=\frac{49}{36}+O(N^{-2}).
$$

[交差対称式](../QFT63/index.md#thm-qft63-crossing)の先頭右辺は

$$
\frac uv\left[1+v+\frac vu\right]
=\frac14\left(1+\frac49+4\right)
=\frac{49}{36}.
$$

誤差は固定された相異なる点での評価です。$N\to\infty$ と点衝突極限を勝手に交換していません。

**(2)** 直接距離と像距離は $r=1,r_*=3$ です。[鏡像Green核](../QFT63/index.md#thm-qft63-half-space-image)へ $d=4$ を代入すると

$$
G_D=c_4(1-1/9)=\frac89c_4,\qquad
G_N=c_4(1+1/9)=\frac{10}9c_4.
$$

異なる境界条件の二点関数であり、(1)の全空間 $\mathcal O_N$ の二点正規化と同一視しません。

**(3)** 相異なる半空間四点で $K_{ij}=\langle\phi_i\phi_j\rangle$ とすると、[Gaussian Wick則](../QFT19/index.md#thm-qft19-boson-wick)から四点は $K_{12}K_{34}+K_{13}K_{24}+K_{14}K_{23}$。これから[連結累積量](../QFT63/index.md#def-qft63-connected-cumulants)の三対合を引くと厳密に零です。境界鏡像が存在しても、相互作用の連結相関が発生したわけではありません。

(1)の大 $N$ 階層は別途課した相関の仮定、(2)の核は半空間のGaussian境界値問題の解です。どちらも重力時空・bulk局所場・境界演算子の辞書・スペクトルの疎性や強結合の条件を構成していません。したがって重力双対の**存在**、RT/HRT、有限 $N$ の重力補正は帰結しません。
<!-- solution-end -->

## 5. 答え合わせの後に確認すること

- **同じ記号の別の意味：** 二次元正則ウェイト $h$、twistの全次元 $x_n=2h_n$、高次元スカラー次元 $\Delta$ を一つの数として扱っていませんか。
- **違う極限：** 正則OPEの点衝突、$n\to1$ の解析接続、cutoff除去、$N\to\infty$ は別々の操作です。交換した箇所は条件を示しましたか。
- **違う「境界」：** 半空間のDirichlet/Neumann境界と、ホログラフィーの漸近境界を混同していませんか。
- **必要条件と十分条件：** 低レベルのGram行列の正半定値性、有限数の相関恒等式、整数レプリカ値だけから、ユニタリ性・完全なQFT構成・解析接続の一意性まで主張していませんか。

QFT IVの計算道具はこれで一巡しました。ここから先の厳密な局所代数、重力双対、量子極値曲面は別の講座で仮定と証明責務を改めて設定します。
