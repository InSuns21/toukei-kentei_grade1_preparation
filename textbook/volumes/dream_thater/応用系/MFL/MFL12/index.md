# MFL12 Laplace–Beltramiへの橋

<!-- definition-example-audit: strict -->

## 1. 頂点の値を、多様体上の関数へ置き換える

[MFL11のLaplacian Eigenmaps](../MFL11/index.md#def-mfl11-variational)では、グラフの各頂点に値 $f_i$ を置き、重い辺の両端で値が大きく変わることを罰した。しかし標本点が滑らかな曲面上に密に並んだとき、何に近づくべきなのだろう。

例えば円周上の十分近い二点間では、関数値の差を弧長で割ると接線方向の微分に近い。有限和を面積・長さの積分に移した極限の候補は、勾配の二乗を積分するエネルギーである。そのエネルギーを支配する連続作用素が、[GEO12で定義されたLaplace–Beltrami作用素](../../../幾何系/GEO/GEO12/index.md#def-geo12-div-laplacian)である。

本章で区別するのは次の三つである。

1. **連続幾何**：計量から体積と作用素を決める。ここには標本誤差がない。
2. **決定論的な離散化**：円周上の等間隔点で、差分と積分の対応を係数まで検算する。
3. **ランダムな点群**：標本密度・核幅・分散が入る。一般の収束保証はこの章の結論ではなく、後続で扱う。

以下、連続側では滑らかなコンパクトRiemann多様体 $(M,g)$ を考え、特記しない限り境界はない。符号は

$$
\Delta_g=\operatorname{div}_g\nabla_g\le0,\qquad L_g=-\Delta_g\ge0
$$

とする。$\Delta_g\le0$ は任意の関数値が点ごとに非正という意味ではなく、$L^2$ 内積の意味で $\int_M f\Delta_gf\,dV_g\le0$ という意味である。

## 2. 計量から作用素と体積が同時に決まる

滑らかな局所座標 $(x^1,\ldots,x^d)$ の座標接ベクトル $\partial_i$ を考える。それらの内積を並べた計量行列を $G=(g_{ij})$、その逆行列を $(g^{ij})$ とする。

正定値性より $\rho=\sqrt{\det G}>0$ である。[GEO12の勾配・発散の座標公式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)では、勾配の第 $i$ 成分は $g^{ij}\partial_jf$、体積密度は $\rho$。反復添字は座標次元の範囲で足す。したがって

$$
dV_g=\rho\,dx^1\cdots dx^d,\qquad
\Delta_gf=\frac1\rho\partial_i\!\left(\rho g^{ij}\partial_jf\right).
$$

ここで $dV_g$ は座標の取り方に依存しない体積測度である。$G$ が変われば、**微分の係数と積分の重みが同時に変わる**。以下では、[GA1の連続作用素の計算](../../../幾何系/GA/GA1/index.md)を二つの半径付き具体例へ代入し直す。

### 半径 $R$ の円周：角度と弧長を区別する

$R>0$ として、$F(\theta)=R(\cos\theta,\sin\theta)$、$\theta\in\mathbb R/(2\pi\mathbb Z)$ と置く。$F'(\theta)=R(-\sin\theta,\cos\theta)$ なので $g_{\theta\theta}=|F'|^2=R^2$、逆行列の成分は $R^{-2}$、体積密度は $R$ である。弧長座標 $s=R\theta$ と角度座標は同じ長さの尺度を持たない。

<a id="prop-mfl12-circle"></a>

<!-- formal-statement-start -->
> **命題（半径付き円周の計量・エネルギー・スペクトル）**  
> 半径 $R>0$ の円周 $S_R^1$ に誘導計量を入れる。滑らかな実数値周期関数 $f$ について

$$
dV_g=R\,d\theta,\qquad
\Delta_gf=R^{-2}f_{\theta\theta},\qquad
\int_{S_R^1}|\nabla_gf|_g^2\,dV_g
=R^{-1}\int_0^{2\pi}|f_\theta|^2\,d\theta.
$$

> さらに整数 $k\ge1$ に対し $\cos(k\theta),\sin(k\theta)$ は $L_g=-\Delta_g$ の固有値 $k^2/R^2$ に属し、定数関数は固有値 $0$ に属する。
<!-- formal-statement-end -->

### 証明の見取り図

角度方向の接ベクトルの長さは $R$。逆計量で勾配の二乗を作り、体積密度 $R$ を掛ける。[GEO12の座標公式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)に定数計量を代入すると、二階微分に $R^{-2}$ が残る。

<!-- proof-start -->
### 証明

$G=(R^2)$、$G^{-1}=(R^{-2})$、$\rho=R$ を先の公式へ代入すると

$$
\Delta_gf=\frac1R\frac{d}{d\theta}
\left(R\cdot R^{-2}f_\theta\right)=R^{-2}f_{\theta\theta}.
$$

勾配のノルムは $g^{\theta\theta}(f_\theta)^2=R^{-2}(f_\theta)^2$。これに $dV_g=R\,d\theta$ を掛ければエネルギー公式を得る。最後に $\partial_{\theta\theta}\cos(k\theta)=-k^2\cos(k\theta)$、正弦も同じで、$L_g=-\Delta_g$ の符号を代入する。定数の二階微分は零である。$\square$
<!-- proof-end -->

例えば $f(\theta)=\cos\theta$ なら $\int f\,dV_g=0$、$\int f^2dV_g=\pi R$、$\int|\nabla_gf|^2dV_g=\pi/R$。この比は $R^{-2}$ であり、半径を2倍にすると低周波の固有値が4分の1になる。

### 半径 $R$ の球面：極座標の特異性は幾何の特異性ではない

球面 $S_R^2$ の極を除き、極角 $0<\varphi<\pi$ と経度 $\theta$ で

$$
F(\varphi,\theta)=R(\sin\varphi\cos\theta,
\sin\varphi\sin\theta,\cos\varphi)
$$

と表す。接ベクトルを偏微分すると

$$
\begin{aligned}
F_\varphi&=R(\cos\varphi\cos\theta,\cos\varphi\sin\theta,-\sin\varphi),\\
F_\theta&=R(-\sin\varphi\sin\theta,\sin\varphi\cos\theta,0).
\end{aligned}
$$

この内積から $g_{\varphi\varphi}=R^2$、$g_{\varphi\theta}=0$、$g_{\theta\theta}=R^2\sin^2\varphi$ を得る。対角行列だから逆計量と行列式の平方根が直接計算できる。

<a id="prop-mfl12-sphere"></a>

<!-- formal-statement-start -->
> **命題（半径付き球面の体積・高さ固有関数）**  
> 半径 $R>0$ の球面 $S_R^2$ に誘導計量を入れる。極を除いた上記座標では

$$
G=R^2\begin{pmatrix}1&0\\0&\sin^2\varphi\end{pmatrix},\quad
dV_g=R^2\sin\varphi\,d\varphi\,d\theta,
$$

$$
\Delta_gf=\frac1{R^2}\left[
\frac1{\sin\varphi}\partial_\varphi(\sin\varphi\,\partial_\varphi f)
+\frac1{\sin^2\varphi}\partial_{\theta\theta}f\right].
$$

> 球面全体で滑らかな高さ関数 $z=R\cos\varphi$ は $L_gz=(2/R^2)z$ を満たす。球面の面積は $4\pi R^2$、平均は $\int z\,dV_g=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

接ベクトルの内積から $G$ を作り、$\sqrt{\det G}$ を求める。[GEO12の座標公式](../../../幾何系/GEO/GEO12/index.md#prop-geo12-div-laplacian-coordinate)へその成分を入れ、高さ $z$ の偏微分を計算する。極は座標の外だが、等式の両辺は滑らかな球面関数として延長される。

<!-- proof-start -->
### 証明

$\det G=R^4\sin^2\varphi$ で $0<\varphi<\pi$ では $\sin\varphi>0$。よって $\rho=R^2\sin\varphi$、逆行列は $R^{-2}\operatorname{diag}(1,\sin^{-2}\varphi)$。座標公式の $\varphi$ 成分は

$$
\frac1{R^2\sin\varphi}\partial_\varphi
\left(\sin\varphi\,\partial_\varphi f\right),
$$

$\theta$ 成分は $[R^2\sin^2\varphi]^{-1}\partial_{\theta\theta}f$ となる。$z_\varphi=-R\sin\varphi$、$z_\theta=0$ だから

$$
\begin{aligned}
\Delta_gz
&=\frac1{R^2\sin\varphi}\partial_\varphi(-R\sin^2\varphi)\\
&=\frac{-2R\sin\varphi\cos\varphi}{R^2\sin\varphi}
=-\frac2{R^2}z.
\end{aligned}
$$

$z$ と $\Delta_gz$ は球面上で滑らかなので、極を除いた稠密集合での等式は極でも成り立つ。さらに極は面積零であり、積分は通常の座標領域で行える。

$$
\begin{aligned}
\operatorname{Area}(S_R^2)&=\int_0^{2\pi}\int_0^\pi R^2\sin\varphi\,d\varphi\,d\theta
=2\pi R^2[-\cos\varphi]_0^\pi=4\pi R^2,\\
\int z\,dV_g&=2\pi R^3\int_0^\pi\cos\varphi\sin\varphi\,d\varphi
=\pi R^3[\sin^2\varphi]_0^\pi=0.
\end{aligned}
$$

以上より結論を得る。$\square$
<!-- proof-end -->

極で $\sin\varphi=0$ となるのはこの座標が退化するためで、球面の計量や作用素が退化するわけではない。球面上で $z$ の固有値が正になる符号も明示できた。

## 3. Green公式が二つのエネルギーを結ぶ

有限グラフでは、[Dirichletエネルギーの辺表示](../../../計算系/SGT/SGT1/index.md#thm-sgt1-dirichlet)により

$$
f^{\mathsf T}L_{\mathrm{graph}}f
=\frac12\sum_{i,j}w_{ij}(f_i-f_j)^2\ge0
$$

が成り立つ。連続側では [GA1のGreenの第一公式](../../../幾何系/GA/GA1/index.md#thm-ga1-green-first) を、境界なしのコンパクト $M$ と $u=v=f$ に適用する。$f$ を滑らかな実数値関数として境界項が存在しないことを確認すると、

$$
\int_M fL_gf\,dV_g
=-\int_M f\Delta_gf\,dV_g
=\int_M|\nabla_gf|_g^2\,dV_g.
$$

そのため両者とも非負の二次形式を持つ。ただし **同じ作用素であるとの主張ではない**。グラフの内積には頂点の重み（次数やセルの長さ）を選ぶ必要がある。

[GA4のRayleigh商](../../../幾何系/GA/GA4/index.md#def-ga4-rayleigh)は、零でない $f\in H^1(M)$ に対して上の勾配エネルギーを $L^2(dV_g)$ ノルムの二乗で割る。連結・コンパクト・境界なしなら、[Rayleigh--Ritzとmin--max原理](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)により平均零の関数の商の最小値が第一正固有値になる。連結性がない場合には零モードが各連結成分に現れ、平均零だけで正の下界を作れない。

**境界の反例**。区間 $[0,1]$ にEuclid計量を入れ $f(s)=s$ とする。$L_gf=-f''=0$ なので $\int_0^1fL_gf\,ds=0$ だが、$\int_0^1|f'|^2ds=1$。実際に部分積分すれば

$$
\int_0^1f(-f'')\,ds
=\int_0^1(f')^2\,ds-[ff']_0^1=1-1=0.
$$

境界なしという仮定が落ちると境界項が消えなくなる。Dirichlet条件 $f=0$ またはNeumann条件 $f'=0$ を端点で課す場合には、それぞれの適用条件を確認してからエネルギー恒等式を使える。

## 4. 円周の有限格子で、長さ尺度を合わせる

ランダム標本より先に、半径 $R$ の円周を等しい弧長 $h=2\pi R/N$ に分ける。$N\ge3$ とし、頂点を $s_j=jh$（$j=0,\ldots,N-1$）に置いて、添字は $N$ を法として周期的に読む。実数列 $v=(v_j)$ の隣接差 $v_{j+1}-v_j$ は、滑らかな関数を標本化したとき $h$ 倍の導関数に相当する。

連続エネルギー $\int|f'|^2ds$ は差分の二乗 $[(v_{j+1}-v_j)/h]^2$ にセル長 $h$ を掛けた和で近似する。一方 $\int f^2ds$ は $h\sum_jv_j^2$ に対応する。**分子と分母を別々に正規化する**必要がある。

<a id="def-mfl12-cycle-forms"></a>

<!-- formal-statement-start -->
> **定義（等間隔円周の質量形式・剛性形式）**  
> $R>0$、整数 $N\ge3$、$h=2\pi R/N$ とする。周期添字付き実ベクトル $v\in\mathbb R^N$ に対し、質量形式 $M_h(v)$ と剛性形式 $K_h(v)$ を

$$
M_h(v)=h\sum_{j=0}^{N-1}v_j^2,\qquad
K_h(v)=\frac1h\sum_{j=0}^{N-1}(v_{j+1}-v_j)^2
$$

> で定める。$v\ne0$ の離散Rayleigh商は $\mathcal R_h(v)=K_h(v)/M_h(v)$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl12-cycle-forms -->
**定義の確認**。$N=4$、$v=(1,0,-1,0)$ なら隣接差の二乗は順に $1,1,1,1$ なので $K_h(v)=4/h$。質量は $M_h(v)=h(1+0+1+0)=2h>0$、したがって $\mathcal R_h(v)=2/h^2$。定数列では剛性は零だが質量は正であり、連続円周の定数零モードに対応する。ここで分母の $h$ を落とすと固有値の長さの次元が合わない。
<!-- definition-example-end -->

作用素としては、周期差分 $A_hv$ の第 $j$ 成分を $(2v_j-v_{j-1}-v_{j+1})/h^2$ とする。これは $K_h$ の行列 $h^{-1}(2I-S-S^{\mathsf T})$ を質量行列 $hI$ で割ったものに相当する。$S$ は一つ先の成分を選ぶ周期シフトである。

<a id="prop-mfl12-cycle-spectrum"></a>

<!-- formal-statement-start -->
> **命題（周期差分の固有値と正規化の係数）**  
> 上の $R,N,h$ に対し $v_j=\cos(2\pi kj/N)$ または $v_j=\sin(2\pi kj/N)$（整数 $k$、零ベクトルになる場合を除く）とする。このベクトルは $A_h$ の固有ベクトルで、固有値は

$$
\lambda_{N,k}=\frac4{h^2}\sin^2\!\left(\frac{\pi k}{N}\right).
$$

> $k$ と $R$ を固定して $N\to\infty$ とすると $\lambda_{N,k}\to k^2/R^2$ となる。一方、同じ辺の重みを $1/h$ として[MFL11の次数正規化](../MFL11/index.md#def-mfl11-variational)を使った一般化固有値は $\mu_{N,k}=2\sin^2(\pi k/N)$ であり、$\lambda_{N,k}=(2/h^2)\mu_{N,k}$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

隣り合う余弦・正弦の和を加法定理でまとめると、中心の値の定数倍になる。差分で作った質量行列は $hI$、次数正規化側は $(2/h)I$ なので、固有ベクトルは一致しても固有値の尺度は一致しない。

<!-- proof-start -->
### 証明

$t_j=2\pi kj/N$、$\alpha=2\pi k/N$ と置く。加法定理から

$$
\cos(t_j+\alpha)+\cos(t_j-\alpha)
=2\cos\alpha\cos t_j.
$$

したがって

$$
(A_hv)_j=\frac{2-2\cos\alpha}{h^2}v_j
=\frac4{h^2}\sin^2\left(\frac\alpha2\right)v_j.
$$

正弦についても $\sin(t_j+\alpha)+\sin(t_j-\alpha)=2\cos\alpha\sin t_j$ を使えば同じ式になる。$h=2\pi R/N$ を代入し、$x=\pi k/N\to0$ で $\sin x/x\to1$ を用いると

$$
\lambda_{N,k}
=\frac{k^2}{R^2}\left(\frac{\sin(\pi k/N)}{\pi k/N}\right)^2
\longrightarrow\frac{k^2}{R^2}.
$$

一方、周期グラフの辺重みを $w_{j,j+1}=1/h$ と置くと、組合せLaplacianは $L_{\mathrm{graph}}=h^{-1}(2I-S-S^{\mathsf T})$、次数行列は $D_g=(2/h)I$ である。$L_{\mathrm{graph}}v=\mu D_gv$ を両辺 $h/2$ 倍すると $(I-(S+S^{\mathsf T})/2)v=\mu v$。上の加法定理から $\mu=1-\cos\alpha=2\sin^2(\alpha/2)$ を得る。さらに $A_h=(1/h)(hI)^{-1}(2I-S-S^{\mathsf T})$、すなわち $A_h=(2/h^2)D_g^{-1}L_{\mathrm{graph}}$ なので係数が一致する。$\square$
<!-- proof-end -->

**重要な読み分け**：$\mu_{N,k}\to0$ を見て「作用素が零に収束した」と結論してはいけない。無次元の次数正規化固有値を長さの二乗 $h^2$ で再尺度化した $\lambda_{N,k}$ を、連続側の固有値と比較する。$k$ を $N$ とともに増やす高周波や、標本点・重みがランダムな場合のスペクトル全体の収束はここでは証明していない。

### 固定された滑らかな関数にも差分が一致するか

固有関数以外でも確かめるため、$f\in C^4(S_R^1)$ を弧長 $s$ の周期関数として $v_j=f(jh)$ を作る。$C^4$ は四階まで連続微分できることを意味する。

<a id="prop-mfl12-consistency"></a>

<!-- formal-statement-start -->
> **命題（周期二階差分の点ごとの誤差）**  
> $R>0$、$N\ge3$、$h=2\pi R/N$ とし、$f$ を弧長に関して四階連続微分可能な周期関数とする。$v_j=f(jh)$ に対して

$$
\left|(A_hv)_j+f''(jh)\right|
\le\frac{h^2}{12}\max_{s\in[0,2\pi R]}|f^{(4)}(s)|
$$

> が全 $j$ で成り立つ。したがって固定された $f$ では $A_hv$ は標本点上の $L_gf=-f''$ に一様に近づく。
<!-- formal-statement-end -->

### 証明の見取り図

標本点を中心に $\pm h$ のTaylor展開を作る。奇数次の項は両側の和で消え、残りの四階剰余を評価する。周期延長により端の添字でも同じ展開が使える。

<!-- proof-start -->
### 証明

$s=jh$ とする。$f$ の周期延長を実直線上の $C^4$ 関数とみなし、展開点 $s$、増分 $\pm h$、三次までのTaylor公式と四階の剰余を適用する。

$$
\begin{aligned}
f(s+h)&=f(s)+hf'(s)+\frac{h^2}{2}f''(s)
+\frac{h^3}{6}f'''(s)+r_+,\\
f(s-h)&=f(s)-hf'(s)+\frac{h^2}{2}f''(s)
-\frac{h^3}{6}f'''(s)+r_-,
\end{aligned}
$$

ここで $|r_\pm|\le h^4M/24$、$M=\max|f^{(4)}|$ である。二式を足すと奇数次が相殺され、

$$
f(s+h)+f(s-h)-2f(s)=h^2f''(s)+r_++r_-.
$$

左辺に負号を付けて $h^2$ で割れば $A_hv=-f''(s)-(r_++r_-)/h^2$。三角不等式から誤差は $2h^4M/(24h^2)=Mh^2/12$ 以下。$M$ はコンパクトな円周上で有限なので $h\to0$ で一様収束する。$\square$
<!-- proof-end -->

この結果は**固定した滑らかな関数に作用させたときの一致**である。高周波の固有ベクトル全体、一般の標本から組んだgraph Laplacianの固有空間、クラスタ分割の収束を保証するものではない。

## 5. 数値で確かめる範囲と、次に必要な仮定

同じフォルダの [`laplace_beltrami_bridge_lab.py`](laplace_beltrami_bridge_lab.py) はPython標準ライブラリだけで動く決定論的な円周実験である。例えば次を実行する。

```bash
python textbook/volumes/dream_thater/応用系/MFL/MFL12/laplace_beltrami_bridge_lab.py --n 48 --radius 2 --frequency 3
python -m unittest textbook/volumes/dream_thater/応用系/MFL/MFL12/test_laplace_beltrami_bridge_lab.py
```

出力には $h$、連続固有値 $k^2/R^2$、離散固有値、次数正規化固有値、誤差、実際の固有残差を含める。$N$ を増やしたときの変化は、**等間隔点という条件付き**の差分誤差であり、点群学習の統計的一般保証ではない。

一般の観測点では、辺の近さだけでは有限和の重みが体積測度 $dV_g$ を近似するとは限らない。標本密度 $p$ が非一様なら、単純な頂点平均と体積平均は異なる。境界、曲率、核幅 $\varepsilon$、分母の小ささ、標本分散も作用する。MFL13ではまず連続kernel平均のbiasを計算し、MFL14で標本誤差、MFL15で密度補正を分けて調べる。

## 6. 演習

<a id="ex-mfl12-a01"></a>

### MFL12-A01 円周の半径と勾配

- Level: A
- 問題: 半径 $R=3$ の円周の角度関数 $f(\theta)=\sin(2\theta)$ について、計量、体積要素、$L_gf$、$\int|\nabla_gf|^2dV_g$ を計算せよ。

**詳細解答**。[円周の計量・エネルギー](#prop-mfl12-circle)の導出を $R=3$、$k=2$ に適用する。$F'$ の長さは3だから $g_{\theta\theta}=9$、$dV_g=3\,d\theta$。$f_{\theta\theta}=-4\sin2\theta$ より

$$
L_gf=-\frac19(-4\sin2\theta)=\frac49\sin2\theta.
$$

$f_\theta=2\cos2\theta$、$\int_0^{2\pi}\cos^2(2\theta)\,d\theta=\pi$ なので

$$
\int|\nabla_gf|^2dV_g=\frac13\int_0^{2\pi}4\cos^2(2\theta)\,d\theta=\frac{4\pi}{3}.
$$

<a id="ex-mfl12-a02"></a>

### MFL12-A02 球面の面積と平均

- Level: A
- 問題: 半径 $R=2$ の球面で $u=R\cos\varphi$ とする。$\int 1\,dV_g$ と $\int u\,dV_g$ を極角で積分せよ。極で座標が退化しても積分できる理由も述べよ。

**詳細解答**。[半径付き球面の体積・高さ固有関数](#prop-mfl12-sphere)を使い、$dV_g=4\sin\varphi\,d\varphi\,d\theta$ を得る。したがって

$$
\int1\,dV_g=\int_0^{2\pi}\int_0^\pi4\sin\varphi\,d\varphi\,d\theta
=2\pi\cdot4\cdot2=16\pi.
$$

また $u=2\cos\varphi$ から

$$
\int u\,dV_g=2\pi\cdot8\int_0^\pi\cos\varphi\sin\varphi\,d\varphi
=8\pi[\sin^2\varphi]_0^\pi=0.
$$

二つの極は球面上の面積零集合で、座標積分はそれらを除いた領域で正しく計算できる。

<a id="ex-mfl12-a03"></a>

### MFL12-A03 零モードと第一正固有値

- Level: A
- 問題: 半径 $R$ の円周上で、$1$、$\cos\theta$、$\sin\theta$ の $L_g$ 固有値を求め、後二者が体積平均零であることを確認せよ。

**詳細解答**。$L_g=-R^{-2}\partial_{\theta\theta}$ より、定数の固有値は0、後二者の固有値は $R^{-2}$。体積要素は $R\,d\theta$ なので

$$
\int_0^{2\pi}\cos\theta\,R\,d\theta=R[\sin\theta]_0^{2\pi}=0,
$$

$$
\int_0^{2\pi}\sin\theta\,R\,d\theta=-R[\cos\theta]_0^{2\pi}=0.
$$

これは[GA4の平均零Rayleigh最小化](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)と一致する。

<a id="ex-mfl12-a04"></a>

### MFL12-A04 区間での境界項

- Level: A
- 問題: 区間 $[0,2]$ のEuclid計量で $f(s)=s^2$ とする。$\int_0^2 f(-f'')\,ds$、$\int_0^2(f')^2ds$、境界項 $[ff']_0^2$ を別々に計算し、Green公式を検算せよ。

**詳細解答**。$f'=2s$、$f''=2$ なので

$$
\int_0^2 f(-f'')\,ds=-2\int_0^2s^2ds=-\frac{16}{3},
\qquad \int_0^2(f')^2ds=4\int_0^2s^2ds=\frac{32}{3}.
$$

端点では $f(2)f'(2)=4\cdot4=16$、$f(0)f'(0)=0$。よって $32/3-16=-16/3$。境界条件を課さなければ両エネルギーは等しくない。

<a id="ex-mfl12-b01"></a>

### MFL12-B01 球面の高さのRayleigh商

- Level: B
- 問題: 半径 $R>0$ の球面上の高さ関数 $z=R\cos\varphi$ について $\int z^2\,dV_g$ と $\int|\nabla_gz|^2\,dV_g$ を直接計算し、商が $2/R^2$ になることを確認せよ。

**詳細解答**。球面の[計量・体積](#prop-mfl12-sphere)を使う。$z_\varphi=-R\sin\varphi$、$z_\theta=0$、$g^{\varphi\varphi}=R^{-2}$ なので勾配の二乗は $\sin^2\varphi$。また $t=\cos\varphi$ と置き $dt=-\sin\varphi\,d\varphi$ によって

$$
\begin{aligned}
\int z^2dV_g
&=2\pi R^4\int_0^\pi\cos^2\varphi\sin\varphi\,d\varphi
=2\pi R^4\int_{-1}^1t^2dt=\frac{4\pi R^4}{3},\\
\int|\nabla_gz|^2dV_g
&=2\pi R^2\int_0^\pi\sin^3\varphi\,d\varphi
=2\pi R^2\int_{-1}^1(1-t^2)dt=\frac{8\pi R^2}{3}.
\end{aligned}
$$

両者の比は $(8\pi R^2/3)/(4\pi R^4/3)=2/R^2$ で、[高さ固有関数](#prop-mfl12-sphere)の固有値とも一致する。

<a id="ex-mfl12-b02"></a>

### MFL12-B02 離散Rayleigh商の行列表示

- Level: B
- 問題: $N=4$ の周期格子で $v=(1,0,-1,0)$ と $h=2\pi R/4$ を用いる。剛性行列 $K$、質量行列 $M$ を書き、$Kv=\lambda Mv$ と $\lambda=2/h^2$ を直接確認せよ。

**詳細解答**。[質量・剛性形式](#def-mfl12-cycle-forms)の辺を $0-1-2-3-0$ と並べると

$$
K=\frac1h\begin{pmatrix}2&-1&0&-1\\-1&2&-1&0\\0&-1&2&-1\\-1&0&-1&2\end{pmatrix},
\qquad M=hI_4.
$$

実際の積は

$$
Kv=\frac1h(2,0,-2,0)^{\mathsf T}=\frac2h v,
\qquad Mv=hv.
$$

したがって $Kv=(2/h^2)Mv$。$v^{\mathsf T}Kv=4/h$ と $v^{\mathsf T}Mv=2h$ の商も同じである。

<a id="ex-mfl12-b03"></a>

### MFL12-B03 Taylor剰余の係数

- Level: B
- 問題: 弧長 $s$ の $C^4$ 周期関数 $f$ を刻み幅 $h$ で標本化する。三次Taylor展開を $s+h$ と $s-h$ で作り、周期二階差分の誤差上界 $h^2\|f^{(4)}\|_\infty/12$ を導け。

**詳細解答**。展開点は $s$、評価点は $s\pm h$、次数は3とする。$f(s+h)=f(s)+hf'(s)+h^2f''(s)/2+h^3f'''(s)/6+r_+$ と $f(s-h)=f(s)-hf'(s)+h^2f''(s)/2-h^3f'''(s)/6+r_-$ を得る。四階導関数の有界性より $|r_\pm|\le h^4\|f^{(4)}\|_\infty/24$。加えて差を作ると

$$
\frac{2f(s)-f(s-h)-f(s+h)}{h^2}
=-f''(s)-\frac{r_++r_-}{h^2}.
$$

最後の項の絶対値は $2(h^4M/24)/h^2=h^2M/12$ 以下である。周期性が端点をまたぐ展開を正当化する。

<a id="ex-mfl12-b04"></a>

### MFL12-B04 連続側の非負性と平均零

- Level: B
- 問題: 滑らかな連結コンパクト境界なし多様体 $M$ で、滑らかな実数値 $f$ が $\int f\,dV_g=0$ を満たすとする。[Greenの第一公式](../../../幾何系/GA/GA1/index.md#thm-ga1-green-first)を用いてエネルギーを表せ。さらに [Rayleigh--Ritzとmin--max原理](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)を用い、第一正固有値に関する不等式を導け。非連結なら何が壊れるか。

**詳細解答**。境界がないのでGreen公式の境界積分は0となり、$\int fL_gf=\int|\nabla_gf|^2\ge0$。連結・コンパクト・境界なしで $f$ は滑らかゆえ $H^1$ に属する。零関数なら不等式は自明、非零なら平均零の制約で[GA4の第一正固有値の最小化式](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)が適用でき、

$$
\frac{\int|\nabla_gf|^2dV_g}{\int f^2dV_g}\ge\lambda_1
$$

を得る。非連結で二成分が正の体積を持つとき、各成分上で異なる定数を選び全体平均を0に調整すれば、$f\not\equiv0$ でも勾配は零である。従って正の一様な下界は成り立たず、連結性を使った零固有値の単純性が破綻する。

<a id="ex-mfl12-c01"></a>

### MFL12-C01 Eigenmapsと連続固有値の尺度

- Level: C
- 問題: 半径 $R$ の円周に $N\ge5$ 個の等間隔点を置き、周期隣接辺の重みを $1/h$ とする。ここで $h=2\pi R/N$ である。波数1の実余弦ベクトルについて、組合せLaplacian、次数行列、質量行列に関する二種類の一般化固有値を求めよ。次数行列は $D_g=(2/h)I$、質量行列は $M=hI$ とする。

点数を無限に増やしたとき、次数側の固有値が0へ、質量側の固有値が $R^{-2}$ へ近づくことが矛盾しない理由を説明せよ。また点数が有限なら、質量側の固有値は $R^{-2}$ より小さいことを示せ。

**詳細解答**。各頂点の次数は $2/h$ なので $D_g=(2/h)I$。周期シフト $S$ で $L_{\mathrm{graph}}=h^{-1}(2I-S-S^{\mathsf T})$。$v_j=\cos(2\pi j/N)$ を代入し、余弦の両隣の和を展開すると

$$
v_{j-1}+v_{j+1}=2\cos(2\pi/N)v_j.
$$

したがって

$$
L_{\mathrm{graph}}v=\frac{2-2\cos(2\pi/N)}h v
=\frac{4\sin^2(\pi/N)}h v.
$$

次数側は $L_{\mathrm{graph}}v=\mu D_gv$ より $\mu=2\sin^2(\pi/N)$。質量側は $L_{\mathrm{graph}}v=\lambda Mv$ より $\lambda=4\sin^2(\pi/N)/h^2$。両者には $\lambda=2\mu/h^2$ の関係がある。$h=2\pi R/N$ に代入すれば

$$
\lambda=\frac1{R^2}\left(\frac{\sin(\pi/N)}{\pi/N}\right)^2
\longrightarrow\frac1{R^2}.
$$

$0<\pi/N<\pi/2$ では $0<\sin x<x$ なので $\lambda<R^{-2}$。$\mu\to0$ は次数規格化の無次元固有値、$\lambda$ は質量 $h$ を使う長さの逆二乗次元の固有値であり、異なる量を比較していたことが原因である。これは規則格子の固定波数の計算であり、ランダム点群での一様なスペクトル一致を主張していない。

## 7. 次章へ

円周・球面では、計量・体積・Greenエネルギー・固有値の符号を具体的に確かめられた。等間隔円周の周期差分では、適切に質量と長さ尺度を取れば固定した滑らかな関数への作用と固定波数の固有値が一致する。しかし**任意の点群の近傍重みがこの質量と剛性を実現するか**はまだ示していない。次は連続kernel積分がどの微分作用素を近似し、密度と曲率がbiasにどう入るかを計算する。
