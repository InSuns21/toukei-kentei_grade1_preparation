# MMX19 臨界tripodの腕とラベルrate、rectangular decoderと多項式乗算のrigidity、比 $6/(8/3)=9/4$ の位置づけ

MMX8 では三本の独立した添字を運ぶ価格と、一つの共通添字から階数分解を作る価格を比較しました。平面上の三角形で得られる比は2でした。三本の腕が一点から伸びる配置では、この比はどこまで大きくなるでしょうか。今回は三地点の共通ラベルに対する下界を多項式乗算から導き、長方形行列積の出力を短い和と低次元の補正に分けます。これらが、後で動く地点を調べるための二つの道具です。

直接前提：[MMX7](../MMX7/index.md)、[MMX8](../MMX8/index.md)、[MMX9](../MMX9/index.md)、[MMX10](../MMX10/index.md)、[MMX11](../MMX11/index.md)、[MMX6](../MMX6/index.md)。一次資料：OpenAI, *The matrix multiplication exponent is nine fourths*（2026年11月24日版）の [boundary.tex](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/build/boundary.tex) と [contact.tex](https://github.com/openai/math/blob/main/preprints/The-matrix-multiplication-exponent-is-nine-fourths-November-24-2026/build/contact.tex) の前半。以下、体 $F$ は代数閉体、対数は自然対数です。MMX9 の二進対数の価格は $\log 2$ 倍して自然対数版に換算し、距離とラベル率の数値は変えません。

## 1. 三脚の距離と階数

原点 $O$ から三方向に伸びる腕を考え、同じ腕の上では距離を長さの差、異なる腕の上では原点を経由する長さの和とします。この距離配置を三脚（tripod）と呼びます。三つの先端を $1,2,3$、腕の長さを $a_1,a_2,a_3$ とすると、対向する二先端間の距離は $d_i=a_j+a_k$（$\{i,j,k\}=\{1,2,3\}$）です。

[整合的スペクトル価格系](../MMX9/index.md#def-mmx9-compatible) の価格を $H$ とします。[共通ラベルの価格率](../MMX8/index.md#thm-mmx8-label-rate) に従い、三地点で $q$ 値を共有するテンソル $\Delta(q)$ の価格を $D\log q$ と書きます。三地点の距離から $D$ が一意に決まるとは限りません。二地点への制限で $D\ge\max_i d_i$、原点を含む三脚が実現していれば木上の三本のwireから $D\le\sum_i a_i$ です。

下界の候補には、腕長の逆数の和が現れます。

<a id="def-mmx19-contact"></a>

<!-- formal-statement-start -->
> **定義（三脚の基準率と接触）**
>
> 腕長 $a_i\ge0$ の三先端における共通ラベル率を $D$ とする。$h=(\sum_i a_i^{-1})^{-1}$ と置く。ただし一つでも $a_i=0$ なら $h=0$ と定める。
>
$$
D_*(a)=\sum_i a_i-h,\qquad \Delta=D-D_*(a).
$$
>
> $\Delta=0$ を接触（contact）、$\Delta$ を欠損と呼ぶ。固定した三本の半直線上の全テンソルの価格が、腕長を同時に $t>0$ 倍すると $t$ 倍になる場合、その三脚上の価格を斉次という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mmx19-contact -->
単位腕 $a=(1,1,1)$ なら $h=1/3$、$D_*=8/3$。例えば三本の独立したwireを原点に集める供給価格は $3\log q$ で、接触時の共通ラベル価格は $(8/3)\log q$ です。接触かどうかは実際に $D$ を求めないと判定できません。腕が $(0,2,3)$ なら三先端は距離5の線分上にあり、二地点への制限と二本のwireによる供給から $5\le D\le5$。従って $h=0,D_*=5$ で接触です。
<!-- definition-example-end -->

[配線網と階数分解の価格評価](../MMX8/index.md#thm-mmx8-network-rank) により、$n\ge2$ の正方行列積テンソル $M_{n,n,n}$ の価格は

$$
H(M_{n,n,n})=(d_1+d_2+d_3)\log n
=2(a_1+a_2+a_3)\log n.
$$

階数 $r$ の分解があればこの価格は $D\log r$ 以下です。よって接触した単位三脚では $\log r\ge(9/4)\log n$ となります。これはその価格配置が存在する場合の結論です。以下では基準率の意味と、接触を得るための準備を検算します。

## 2. 多項式乗算を連続的な幅で測る

先端 $i,j$ を入力、$k$ を出力とし、[多項式乗算テンソル](../MMX4/index.md#def-mmx4-convolution) $C(A,B)$（入力長 $A,B$、出力長 $A+B-1$）をこの順に置きます。幅を一緒に増やしても発散分を引けば比較ができます。

<a id="lem-mmx19-profile"></a>

<!-- formal-statement-start -->
> **補題（連続幅プロファイル）**
>
> 代数閉体上の固定三地点の共通ラベル率を $D>0$ とする。$C(A,B)$ は地点 $i,j$ に長さ $A,B$ の入力、地点 $k$ に出力を置く多項式乗算テンソルとする。任意の $x,y>0$ に対し、正整数長 $A_N/N\to x,B_N/N\to y$ なら
>
$$
P_k(x,y)=\lim_{N\to\infty}\bigl(H(C(A_N,B_N))-D\log N\bigr)
$$
>
> が存在し、連続で座標ごとに非減少であり、$P_k(cx,cy)=P_k(x,y)+D\log c$（$c>0$）を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $A,B$ を正整数とする。入力の切り詰めで価格は非減少。[多項式乗算テンソルの階数](../MMX4/index.md#thm-mmx4-convolution-rank) と [配線網と階数分解の価格評価](../MMX8/index.md#thm-mmx8-network-rank) から上界 $D\log(A+B-1)$ を得る。

整数 $m\ge1$ について $C(mA,mB)$ から $m$ 個の全直和 $C(A,B)$ への退化を作る。第1入力の次数 $u$ に位置 $(u+1/2)/(mA)$、第2入力の次数 $v$ に位置 $(v+1/2)/(mB)$ を対応させる。区間 $[0,1]$ を $m$ 等分し、各分割点で傾きが厳密に増加する有理係数の凸折れ線 $f$ を取る。例えば $f(t)=\sum_{\ell=1}^{m-1}\max(t-\ell/m,0)$ でよい。

第1入力の重みを $mA f((u+1/2)/(mA))$、第2入力の重みを $mB f((v+1/2)/(mB))$、出力次数 $w=u+v$ の重みを $-m(A+B)f((w+1)/(m(A+B)))$ とする。重みの和は凸性により非負で、二つの入力位置が同じ小区間にあるとき、かつそのときに限り0になる。入力位置は分割点上にない。すべての重みを共通分母倍して整数化し、局所基底にパラメータの対応する冪を掛けて0次項を取る。

区間番号 $\ell=0,\ldots,m-1$ の残存項は $u=\ell A+u',v=\ell B+v'$ で、$0\le u'<A,0\le v'<B$。出力は $w=\ell(A+B)+u'+v'$、従ってその範囲は $\ell(A+B)$ から $\ell(A+B)+A+B-2$ まで。区間ごとの出力座標も互いに交わらない。全脚で分離した各ブロックは $C(A,B)$ に一致する。[多項式退化のスペクトル単調性](../MMX4/index.md#lem-mmx4-spectral-degeneration) と全直和の価格則により

$$
H(C(mA,mB))\ge D\log m+H(C(A,B)).
$$

$A_N=\lfloor Nx\rfloor,B_N=\lfloor Ny\rfloor$ とし、十分大きい $M$ を固定する。$m=\lfloor N/M\rfloor$ なら $m A_M\le A_N,m B_M\le B_N$。$p_N=H(C(A_N,B_N))-D\log N$ と置くと

$$
p_N\ge p_M+D\log(mM/N).
$$

$N\to\infty$ で $mM/N\to1$ だから $\liminf p_N\ge p_M$。上界 $p_N\le D\log(x+y)$ と固定 $M$ による下界で有限性があり、さらに $M\to\infty$ の上極限を取れば $\liminf p_N\ge\limsup p_N$。従って極限がある。

同じ証明は実数 $N\to\infty$ にも通る。$cN$ を新たな尺度とすれば $P_k(cx,cy)=P_k(x,y)+D\log c$。$(x',y')$ が $(x,y)$ に近ければ成分ごとに $(1-\varepsilon)(x,y)\le(x',y')\le(1+\varepsilon)(x,y)$ とできる。単調性と尺度則から価格差は $D\log(1-\varepsilon)$ と $D\log(1+\varepsilon)$ の間にあり、連続性が従う。任意の整数列 $A_N,B_N$ も十分大きい $N$ で同じ二つの幅の床関数の間に挟まる（必要なら $\varepsilon$ を少し大きくする）ので、同じ極限となる。
<!-- proof-end -->

例えば $A=B=2,m=2$ なら第1ブロックの出力次数は0,1,2、第2ブロックは4,5,6です。次数3の座標を空けることで二つの出力を共有せずに済みます。

## 3. 共有脚を固定したまま傾きと切片を測る

ここでは三先端は相異なり $d_i>0$ とします。第1入力 $i$ の幅を1に固定し、第2入力 $j$ の幅を $t$ とした価格を指数化します。

$$
F_{ik}(t)=\exp(P_k(1,t)/d_i).
$$

$k$ は出力です。$F_{ij}$ は $i$ を固定したまま残りの入力と出力を交換したものです。先行講義では六置換を平均しましたが、今回は個々の配置の切片を残します。

<a id="lem-mmx19-intercept"></a>

<!-- formal-statement-start -->
> **補題（配置別の傾きと切片）**
>
> 代数閉体上の相異なる三地点 $i,j,k$ で、$d_i=d(j,k)>0$、$P_k$ を [連続幅プロファイル](#lem-mmx19-profile) とする。$t>0$ について $F_{ik}(t)=\exp(P_k(1,t)/d_i)$（入力 $i,j$、出力 $k$）とする。$F_{ij}$ は入力 $i,k$、出力 $j$ とする。$F_{ik}$ は正、非減少、凹であり、
>
$$
F_{ik}(3t+1)\ge2F_{ik}(t)+F_{ij}(t).
$$
>
> ある共通の正の傾き $s_i=\exp(c_i/d_i)$ と非負の切片 $\beta_{ik},\beta_{ij}$ が存在し、
>
$$
\beta_{ik}+\beta_{ij}\le1,\qquad
t\le F_{ik}(t)/s_i\le t+\beta_{ik}.
$$
>
> $F_{ik}(t)/s_i-t$ は非減少で、$t\to\infty$ において $\beta_{ik}$ に収束する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず二脚 $j,k$ だけでブロック番号が直に分かる和 $T=\sum_b T_b$ に [任意標数の共有脚評価](../MMX6/index.md#cor-mmx6-entropy) を使う。$H=D\log\lambda$、wireの指数は $d_i/D$ なので、確率 $p_b$ について

$$
H(T)\ge\sum_b p_b H(T_b)-d_i\sum_b p_b\log p_b.
$$

$Z=\sum_b\exp(H(T_b)/d_i)$、$p_b=\exp(H(T_b)/d_i)/Z$ と選べば右辺は $d_i\log Z$ になる。従って指数化したブロック値の和が下界となる。

[行列式による次数の分離](../MMX4/index.md#lem-mmx4-determinant-filtration) の核と商の二ブロック退化は第1脚を共有し、$j,k$ に長さ2のwireを一つ加える。$G(A,B)=\exp(H(C(A,B))/d_i)$ と書くと $B\ge2$ で

$$
2G(A,B)\ge G(A,B+1)+G(A,B-1).
$$

任意の整数区間上で線形補間した $B$ の関数は、隣接差分の非増加から凹である。$A=N$、$B/N\to t$ として $G$ を $N^{D/d_i}$ で割ると [連続幅プロファイル](#lem-mmx19-profile) より $F_{ik}(t)$ に収束する。二つの端点を床関数で近似し、その凸結合を挟む二整数も尺度極限が同じなので、凹不等式は極限でも成り立つ。

[移動付き三倍不等式](../MMX5/index.md#lem-mmx5-tripling) の三区画退化を六置換の積を取る前の形で使う。左右は $C(A,B)$、中央は $j,k$ を交換した $C(A,B)$ であり、三ブロックとも $j,k$ で分離する。上の共有脚評価により

$$
G(A,3B+A-1)\ge2G(A,B)+G^{\rm swap}(A,B).
$$

再び $A=N,B/N\to t$ で正規化すると主張の三倍不等式になる。

正で非減少な凹関数は、$t\ge1$ で割線の傾きが非増加かつ非負なので、$F_{ik}(t)/t$ は有限な非負極限 $s$ を持つ。同様に $F_{ij}$ の極限を $s'$ とする。三倍不等式を $t$ で割って極限を取ると $3s\ge2s+s'$、交換して $3s'\ge2s'+s$。従って $s=s'$。

$S=F_{ik}+F_{ij}$ とすると $S(3t+1)\ge3S(t)$。$t_m=3^m(t+1/2)-1/2$ とすれば $S(t_m)\ge3^mS(t)$、従って

$$
\frac{S(t)}{t+1/2}\le\frac{S(t_m)}{t_m+1/2}\longrightarrow2s.
$$

左辺は正なので $s>0$。各凹関数の割線傾きは無限遠の傾き $s$ 以上だから $F_{ik}(t)-st$ は非減少。$u\downarrow0$ に対し $F_{ik}(u)>0$ より $F_{ik}(t)-st\ge F_{ik}(u)-su>-su$、従って非負。もう一つも同様であり、二つの差の和は $S(t)-2st\le s$。各差は有界な非減少関数なので極限を持ち、それぞれ $s$ で割ったものを $\beta_{ik},\beta_{ij}$ とすれば結論が従う。
<!-- proof-end -->

## 4. 基準率と多項式プロファイルの剛性

腕長を正とします。$h$ は第1節の逆数和、$b_i=a_i-h$、$u_i=b_i/a_i$ と置きます。$0<h<a_i$ より $0<u_i<1$ です。$\beta^*_{ik}=a_k/d_i$ とし、[配置別の傾きと切片](#lem-mmx19-intercept) と尺度則を合わせます。

$$
P_k(x,y)\le U_{ik}(x,y)
=c_i+(b_i+\Delta)\log x+d_i\log(y+\beta_{ik}x).
$$

これは $D-d_i=b_i+\Delta$ を使った上界です。差 $E_{ik}=U_{ik}-P_k$ は非負です。$E_{ik}$ は比 $y/x$ だけに依存します。

<a id="thm-mmx19-profile-rigidity"></a>

<!-- formal-statement-start -->
> **定理（基準率の下界と接触プロファイル）**
>
> 代数閉体上、三地点の距離が $a_i+a_j$（$i\ne j$、$a_i\ge0$）なら共通ラベル率 $D\ge D_*(a)$。
> 全腕が正なら $h=(\sum_i a_i^{-1})^{-1}, b_i=a_i-h,u_i=b_i/a_i,d_i=a_j+a_k,\beta^*_{ik}=a_k/d_i$ とする。$c_i,\beta_{ik}$ は [配置別の傾きと切片](#lem-mmx19-intercept) の値、$\Delta=D-D_*$、$E_{ik}=c_i+(D-d_i)\log x+d_i\log(y+\beta_{ik}x)-P_k(x,y)$ とする。
> $\min_i u_i\ge\eta>0$ なら、配置に依存しない $\eta$ のみの定数による評価
>
$$
d_i(\beta_{ik}-\beta^*_{ik})=O_\eta(\Delta),\qquad
c_i+b_i\log u_i=C+O_\eta(\Delta)
$$
>
> がある。ここで $C$ は三地点に共通の実数である。また $y/x\ge u_j/u_i$ では $0\le E_{ik}(x,y)\le O_\eta(\Delta)$。
> 特に接触時には $\beta_{ik}=\beta^*_{ik}$ かつこの範囲で $U_{ik}=P_k$ である。
<!-- formal-statement-end -->

### 証明の見取り図

二つの入力の幅を同時に増やすと価格の増分は尺度則で決まります。それぞれ別々に増やしたときの下界を足し、三通りの出力について足し合わせます。切片の誤差が相殺されるので、残る非負項が欠損で抑えられます。

<!-- proof-start -->
### 証明

片方の入力を固定して $y$ を増加させると、前節の割線傾き下界から、任意の $v>0$ について

$$
F_{ik}((y+v)/x)\ge F_{ik}(y/x)+s_i v/x.
$$

尺度則を用いて対数を取る。右側の増分は $d_i\log(1+s_i v/(xF_{ik}(y/x)))$ 以上である。$v\downarrow0$ で増分を $v$ で割った下極限は

$$
\frac{d_i s_i}{xF_{ik}(y/x)}
=\frac{d_i}{y+\beta_{ik}x}\exp(E_{ik}(x,y)/d_i).
$$

$x$ についても $i,j$ を交換した下界がある。点 $(x,y)$ を $(1+t)(x,y)$ に動かす際、まず $x$、次に $y$ を増やす。下界の係数は連続で、尺度則による全増分は $D\log(1+t)$。$t$ で割って $t\downarrow0$ とすれば

$$
D\ge
\frac{y d_i e^{E_{ik}/d_i}}{y+\beta_{ik}x}
+\frac{x d_j e^{E_{jk}/d_j}}{x+\beta_{jk}y}.
$$

これなら微分可能性を仮定する必要がない。$x=u_i,y=u_j$ とする。$h\sum 1/a_i=1$ から $\sum u_i=2$ である。また

$$
u_j+u_i\frac{a_k}{a_j+a_k}
=1-\frac{h}{a_j}+\frac{a_k}{a_j+a_k}\left(1-\frac h{a_i}\right)=1
$$

となる（$a_k-h a_k/a_i=h+h a_k/a_j$ を使った）。同様に $u_i+u_j\beta^*_{jk}=1$。さらに

$$
u_jd_i+u_id_j=\sum_\ell a_\ell-h=D_*.
$$

実際、左辺は $a_i+a_j+2a_k-h(2+a_k/a_i+a_k/a_j)$ で、$h(a_k/a_i+a_k/a_j)=a_k-h$。

$z_{ik}=d_i(\beta_{ik}-\beta^*_{ik})$、$r=u_i z_{ik}/d_i$ と置く。$1+r=u_j+u_i\beta_{ik}$ は $\eta$ 以上2以下。$e^q\ge1+q$（$q\ge0$）および $1/(1+r)=1-r+r^2/(1+r)$ から、第1項の下界は

$$
u_jd_i-u_iu_j z_{ik}
+\frac{u_j u_i^2 z_{ik}^2}{2d_i}
+\frac{u_j E_{ik}}2.
$$

第2項も交換して同じ展開をし、$D_*$ を引き、$u_iu_j>0$ で割ると

$$
\frac{\Delta}{u_iu_j}\ge
-z_{ik}-z_{jk}
+\frac{\eta}{2}\left(E_{ik}+E_{jk}
+\frac{z_{ik}^2}{d_i}+\frac{z_{jk}^2}{d_j}\right).
$$

ここで各 $E$ は $(u_i,u_j)$ での値である。三通りの出力 $k$ について足すと、$z$ の各行和は $d_i(\beta_{ik}+\beta_{ij}-1)\le0$ なので右辺は非負。従って $\Delta\ge0$。左辺は $3\Delta/\eta^2$ 以下であり、非負の各 $E$、各 $z^2/d$、各行和の負はそれぞれ $O_\eta(\Delta)$ である。また出力ごとの不等式から各列和は $-\Delta/\eta^2$ 以上。列和の総和は行和の総和と同じで非正だから、各列和は $2\Delta/\eta^2$ 以下でもある。

二つの上界 $U_{ik},U_{jk}$ は同じ $P_k(u_i,u_j)$ と $O_\eta(\Delta)$ しか違わない。$\log(1+r)=r+O_\eta(r^2)$ は $1+r\in[\eta,2]$ での二階微分の上界から従う。従って $d_i\log(1+r)=u_i z_{ik}+O_\eta(z_{ik}^2/d_i)$ であり、

$$
c_i+b_i\log u_i+u_i z_{ik}
=c_j+b_j\log u_j+u_j z_{jk}+O_\eta(\Delta)
$$

となる。ここで $\Delta\log u_i$ も $O_\eta(\Delta)$ へ含めた。

$z=z_{12}$ とすると、行1、列3、行2、列1、行3の順に和の評価を使い、

$$
(z_{12},z_{13},z_{23},z_{21},z_{31},z_{32})
=(z,-z,z,-z,z,-z)+O_\eta(\Delta)
$$

を得る。出力を順に3,1,2とし、入力の順を $(1,2),(2,3),(3,1)$ とした三つの上界比較を足せば $c_i+b_i\log u_i$ は消え、$-2(u_1+u_2+u_3)z=O_\eta(\Delta)$ となる。$\sum u_i=2$ なので $z=O_\eta(\Delta)$。全 $z_{ik}$ にも同じ評価が成立し、上界比較に戻れば三つの $c_i+b_i\log u_i$ の差も $O_\eta(\Delta)$ である。その一つを $C$ と取れる。

最後に $t=y/x$ とすれば

$$
E_{ik}=d_i\log\frac{t+\beta_{ik}}{F_{ik}(t)/s_i}.
$$

分子と分母の差は $\beta_{ik}-(F_{ik}(t)/s_i-t)$ で非負かつ非増加、分母は正かつ非減少。よって比 $1+$（差）/（分母）は非増加。$t\ge u_j/u_i$ での $E$ は先ほどの値以下になる。腕長の一つが0なら最大二点距離が $\sum a_i=D_*$ であり、二地点への制限で下界が従う。
<!-- proof-end -->

単位三脚なら $u_i=2/3,d_i=2,\beta^*_{ik}=1/2$。接触時には $t\ge1$ で $F_{ik}(t)/s_i=t+1/2$ です。腕を $(1,1,b)$ として $b\to\infty$ としても $h=b/(2b+1)$、$u_1=u_2\to1/2,u_3\to1$ なので、上の誤差定数が発散する必要はありません。ただし、異なる配置の欠損が等しいとはまだ示していません。固定した斉次三脚での接触の伝播には、価格の最適化と腕の移動を比較する別の議論が必要です。

## 5. 長方形の出力を短い計算と補正に分ける

正整数の第四冪 $N$ に対し $s=N^{1/2},q=N^{1/4}$。$s\times q$ と $q\times s$ の行列積は $N$ 個の出力を持ちます。出力の添字を $e=(u,v)$、双線形形式を $B_e=\sum_{j=1}^q X_{uj}Y_{jv}$ とします。出力側の腕を $c$、入力側を $a,b$ とすれば三本のwireの価格は

$$
H(M_{s,q,s})/\log N
=c+\frac34(a+b).
$$

$ab/(a+b)\le(a+b)/4$（$a+b=0$ のときは0）であり、$h\le ab/(a+b)$。従って $c+3(a+b)/4\le D_*(c,a,b)\le D$ です。この評価は任意の三脚の腕長表示を持つ三地点に通ります。任意のスペクトル点のwire距離は三角不等式を満たすので、例えば $a=(d_{ab}+d_{ac}-d_{bc})/2$ として非負の腕長表示を得ます。

任意の $\theta>0$ について第四冪の基準サイズ $N_0\ge16$ と対角テンソルのサイズ $R=\lceil N_0^{1+\theta/2}\rceil$ を取ります。すべてのスペクトル点で行列積の値は $N_0$ 以下、対角の値は $R>N_0$。[スペクトル厳密比較](../MMX11/index.md#lem-mmx11-strict) による固定整数 $K_0$ に対し、$m$ 冪の階数は $K_0 R^m$ 以下です。先に $N_0$ を十分大きくして $R\le N_0^{1+3\theta/4}$、次に $m$ を大きくして $K_0\le (N_0^m)^{\theta/4}$ とすれば、$N=N_0^m$ で階数 $\le N^{1+\theta}$ を得ます。

階数分解の各単純双線形積を $L_\ell(X)Q_\ell(Y)$ と書けば、出力をそれらから読み出す行列 $M$ が存在します。これを decoder と呼びます。短い行とは、参照する単純積の個数が少ない行です。すべての出力の補正を共通の少数の双線形形式で表せれば、その補正は別の通信路を使えます。

<a id="lem-mmx19-decoder"></a>

<!-- formal-statement-start -->
> **補題（短い行を持つ長方形decoder）**
>
> 代数閉体 $F$ 上で任意の $\varepsilon>0$ に対しある $\delta>0$ が存在し、任意に大きい第四冪 $N$ について $s=N^{1/2},q=N^{1/4}$ とする。$s\times q$ 行列 $X$ と $q\times s$ 行列 $Y$ の積の全出力 $B_e=\sum_{j=1}^q X_{uj}Y_{jv}$（$e=(u,v)$、$1\le u,v\le s$）を
>
$$
B_e=S_e+R_e,\qquad
\operatorname{rank}(S_e)\le N^\varepsilon,\qquad
\dim_F\operatorname{span}\{R_e:1\le e\le N\}\le N^{1-\delta}
$$
>
> と分解できる。ここで双線形形式の階数は係数行列の階数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$0<\varepsilon<1$ の場合を示せば十分。整数 $K>10/\varepsilon$ を固定する。基準の出力数 $d$ は第四冪、階数 $r$ は前段により $d\le r\le d^{1+\theta}$ とする。下界 $d$ は出力形式が一次独立であるためで、例えば各 $e=(u,v)$ に対して単項式 $X_{u1}Y_{1v}$ はその出力だけに現れる。$\theta>0$ は後で選ぶ。

基準decoder $M$ は $d$ 行 $r$ 列である。$Km$ 冪の出力数は $N=d^{Km}$。$M^{\otimes m}$ を行と列に零を加えて $2^t$ 次の正方行列にする。ただし $t=\lceil m\log_2 r\rceil$。全decoderはこの正方行列を $K$ 個テンソル積した行列で、サイズは $T=2^{Kt}$、添字は $K$ 個の $t$ ビットregisterである。零を加えても元の部分行列は変わらない。

第1 registerだけを計算用にする。第1のブロックをそこで作用させ、第2以降は第1と交換してからブロックを作用させ、再び交換して元に戻す。これで全ブロックの積になる。

一対のビットの交換は四つの文字 $00,01,10,11$ のうち $01,10$ だけを入れ替える。対応する二次ブロックは

$$
\begin{pmatrix}0&1\\1&0\end{pmatrix}
=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
\begin{pmatrix}1&1\\0&1\end{pmatrix}
\begin{pmatrix}1&0\\-1&1\end{pmatrix}
\begin{pmatrix}1&1\\0&1\end{pmatrix}.
$$

右辺を右から掛けると中の三行列の積は $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、左の符号行列で交換になる。標数2でも成立する。斜め上または下に非零の非対角要素を一つだけ持つ単位行列への加算を shear と呼ぶ。同じshearを $t$ ビット位置で並行して作用させる。

shearの非対角要素が送る先の文字を高文字と呼ぶ。各shear段の直前・直後に、高文字の出現回数が $t/4-\rho t$ 以上 $t/4+\rho t$ 以下の座標だけを残す対角射影を入れる。$\rho>0$ は小さい固定数。全 $T$ 座標を一様に数えると高文字の個数 $X$ は二項分布 $(t,1/4)$ である。任意の $\alpha>0$ に対し

$$
\Pr(X\ge t(1/4+\rho))
\le\left(e^{-\alpha(1/4+\rho)}(3+e^\alpha)/4\right)^t.
$$

括弧の対数は $\alpha=0$ で0、微分は $-\rho$ なので十分小さい正の $\alpha$ で負。下側は $\Pr(X\le t(1/4-\rho))\le(e^{\alpha(1/4-\rho)}(3+e^{-\alpha})/4)^t$。この括弧の対数の原点での微分も $-\rho$ なので、十分小さい正の $\alpha$ で負になる。よって捨てた座標の割合は $2e^{-c_\rho t}$ 以下である。全射影は $O(K)$ 個。射影を順次挿入する前後の行列差は $A(I-P)B$ の形で、その階数は捨てた座標数以下。差を望遠和にして階数を足すと、元のdecoderと射影付きdecoderの差の階数は $O(K)Te^{-c_\rho t}$ 以下。$T=2^{Kt}$ なので、例えば $\gamma=\min(1/2,c_\rho/(2K\log2))>0$ なら十分大きい $m$ で $T^{1-\gamma}$ 以下になる。

次に射影付きdecoderの一行を調べる。積の成分に寄与する添字列を考えると、shear段で非対角成分を使う位置では必ず高文字の個数が1増え、他の位置では変わらない。始めと終わりの個数は同じ幅 $2\rho t$ の区間にあるので、変わるビット位置は高々 $2\rho t$ 個。第1以外のregisterは各二回の交換（各三shear）にしか参加せず、符号行列は添字を変えない。したがってその入力と出力のビット列は高々 $12\rho t$ 箇所しか異ならない。第1 registerの入力には制限を課さず、可能な全入力添字数を上から数えると一行の非零列数は

$$
2^t\left(\sum_{j\le12\rho t}\binom tj\right)^{K-1}.
$$

$0<p=12\rho<1/2$ とする。二項定理から $j\le pt$ のとき $p^j(1-p)^{t-j}\ge p^{pt}(1-p)^{(1-p)t}$、従って和は $\exp(t[-p\log p-(1-p)\log(1-p)])$ 以下である。底2のエントロピーを $H_2(p)$ と書けば、一行の非零数は $T^{1/K+(1-1/K)H_2(p)}$ 以下。$p\downarrow0$ で $H_2(p)\to0$ なので、$\rho$ を十分小さくしてこの指数を $\varepsilon/2$ 未満にする。

$T\le2^K r^{Km}\le2^K N^{1+\theta}$。ここで $\theta$ を十分小さく選び、$(1+\theta)(1-\gamma)<1-\gamma/2$ と $(1+\theta)\varepsilon/2<\varepsilon$ を同時に満たすようにする。先ほどの基準 $d,r$ はこの $\theta$ について選べばよい。十分大きい $m$ では定数 $2^K$ も指数の余裕に吸収され、行の非零数は $N^\varepsilon$、差の階数は $N^{1-\gamma/2}$ 以下になる。

零paddingを除去し、元の $r^{Km}$ 個の単純積の列ベクトルへ両行列を作用させる。射影付き部分の各行は高々 $N^\varepsilon$ 個の単純積の和なので係数行列の階数も同じ上界。差行列の行空間を単純積の線形結合へ写した像の次元は行空間の次元以下である。これが補正 $R_e$ の張る空間であり、$\delta=\gamma/2$ を取れば結論となる。
<!-- proof-end -->

この分解は $R_e$ の各階数が小さいことを主張していません。例えば同じ階数100の形式を全出力で異なる係数倍しても、それらの張る空間の次元は1です。後ではこの次元が通信費用になります。

## 6. 衝突近傍の二重出力

四地点 $A,B,C,D'$ の距離が、$AB,CD'$ は $h_0$、他の四対は $L$（$0<h_0<L$）とします。$h_0$ は第1節の逆数和 $h$ とは別です。出力を $A,B$ の二地点に複製し、入力を $C,D'$ に置いたテンソルは

$$
U_N=\sum_{u,v,j} e_{uv}\otimes e_{uv}\otimes e_{uj}\otimes e_{jv}
$$

です。ここで $1\le u,v\le s,1\le j\le q$。同じ $u$ は $A,B,C$ に、同じ $v$ は $A,B,D'$ に、$j$ は $C,D'$ に共有されます。局所基底を対の添字へ組み替えるだけで三つの独立ラベルの積になります。四地点の共通ラベル率を $D_4$、三地点の率を $D_{ABC},D_{ABD'}$ とします。

<a id="prop-mmx19-collision"></a>

<!-- formal-statement-start -->
> **命題（二重出力の価格比較）**
>
> 代数閉体上の整合的スペクトル価格系で四地点 $A,B,C,D'$ を取り、$AB,CD'$ の距離は $h_0$、他の四対の距離は $L$（$0<h_0<L$）とする。$D_4$ は四地点、$D_{ABC},D_{ABD'}$ は対応する三地点の共通ラベル率とする。任意の $\varepsilon>0$ に対し [短い行を持つ長方形decoder](#lem-mmx19-decoder) の $\delta>0$ を選び、$h_0/L<\delta/2$ とする。このとき
>
$$
L+h_0/4\le D_{ABC},D_{ABD'},\qquad
\frac{D_{ABC}+D_{ABD'}}2+\frac{h_0}4
\le D_4+\varepsilon h_0.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

三地点の腕長は $(h_0/2,h_0/2,L-h_0/2)$。逆数和の逆数は $1/(4/h_0+1/(L-h_0/2))\le h_0/4$ なので [基準率の下界と接触プロファイル](#thm-mmx19-profile-rigidity) より両率とも $L+h_0/2-h_0/4=L+h_0/4$ 以上。

積の価格則により $H(U_N)/\log N=(D_{ABC}+D_{ABD'})/2+h_0/4$。decoderの分解により $U_N$ を $S_e$ からの部分と $R_e$ からの部分の和にする。前者は $e$ を四地点で共有し、$C,D'$ 間で高々 $\lfloor N^\varepsilon\rfloor$ 個の単純積の番号を共有すれば、各地点で $e$ と番号に応じたベクトルに写せる。よって費用は $(D_4+\varepsilon h_0)\log N$ 以下。

後者の $AB\mid CD'$ の係数行列の階数は補正空間の次元以下。従って $A,C$ 間にサイズ高々 $N^{1-\delta}$ のwireを置き、まず $AB$ の脚を $A$、$CD'$ の脚を $C$ にまとめた階数分解を作る。次に $AB$ 間で次元 $N$ の $B$ の脚を、$CD'$ 間で次元 $sq=N^{3/4}$ 以下 $N$ の $D'$ の脚を輸送する。[wire距離と脚の輸送](../MMX8/index.md#thm-mmx8-wire-distance) により価格は $((1-\delta)L+2h_0)\log N$ 以下。仮定からこの係数は $L$ 未満である。一方、共通ラベルの二地点への制限から $D_4\ge L$。

[スペクトル価格の演算則](../MMX8/index.md#prop-mmx8-price-rules) による二項の通常和の費用は最大価格に高々 $D_4\log 2$ を加えたもの。よって

$$
H(U_N)\le(D_4+\varepsilon h_0)\log N+D_4\log 2.
$$

第四冪 $N$ をdecoderの存在する列に沿って無限大へ送れば、固定配置で $D_4\log2/\log N\to0$。結論を得る。
<!-- proof-end -->

例えば、別の幾何的議論で $D_4\le L+(1/2+\kappa)h_0$ が分かったと仮定すると、上の命題を2倍し $D_{ABD'}\ge L+h_0/4$ を引くことで

$$
D_{ABC}\le L+h_0/4+2(\varepsilon+\kappa)h_0.
$$

$t=h_0/2$、$b=2L/h_0-1$ とすると三腕は $t(1,1,b)$。価格を $t$ で割り、$\kappa\to0$ の極限で同じ斉次三脚の価格が得られるなら

$$
D(1,1,b)\le b+3/2+4\varepsilon,\quad
D_*(1,1,b)=b+3/2+\frac1{4b+2}.
$$

従って固定した三脚上で十分大きな $b$ すべてについてこの上界を得られれば、$\varepsilon\downarrow0$ により無限遠の欠損は0になります。これはまだその三脚の存在を示すものではありません。次講から付値、動く地点と極限を扱い、さらに接触を伝播する議論によってこの欠損0を単位腕へ移します。

単位腕で接触が得られた場合、三辺の価格の和は $6\log n$、共通ラベル $r$ 値の価格は $(8/3)\log r$。第1節の比較から $r\ge n^{9/4}$ です。この比較を同じ配置で任意の $n\ge2$ とテンソル冪に適用し、[行列積指数と漸近階数の一致](../../TSP/TSP14/index.md#thm-tsp14-omega-rank) を使えば指数も $9/4$ 以上です。厳密な節約（指数が $9/4$ より小さいという仮定）の下ではこのような接触した斉次三脚は存在できません。この排除が後の同期・圧縮に使われます。一般の体への移送や回路の下界はここで結論していません。

## 7. 演習

### Level A

<a id="ex-mmx19-a01"></a>

#### MMX19-A01 腕長の計算

- Level: A

腕長 $(2,3,6)$ の三先端の距離、$h,D_*$ を求めよ。

<!-- solution-start -->
##### 詳細解答

$d_1=3+6=9,d_2=2+6=8,d_3=2+3=5$。逆数和は $1/2+1/3+1/6=1$ なので $h=1$。従って $D_*=2+3+6-1=10$。最大二点距離9より大きい下界である。
<!-- solution-end -->

<a id="ex-mmx19-a02"></a>

#### MMX19-A02 退化の出力区間

- Level: A

$A=2,B=3,m=3$ とし、[連続幅プロファイル](#lem-mmx19-profile) の退化で残る入力・出力の区間を全て求めよ。

<!-- solution-start -->
##### 詳細解答

区間番号 $\ell=0,1,2$。入力区間はそれぞれ $[\ell A,\ell A+A-1]$、$[\ell B,\ell B+B-1]$。出力は和なので $[\ell(A+B),\ell(A+B)+A+B-2]$ となる。具体的に入力対は $([0,1],[0,2]),([2,3],[3,5]),([4,5],[6,8])$、出力は $[0,3],[5,8],[10,13]$。すべて各脚で互いに素で、各ブロックは長さ2と3の積である。
<!-- solution-end -->

<a id="ex-mmx19-a03"></a>

#### MMX19-A03 長方形の価格

- Level: A

$N=256$、出力の腕 $c=3$、入力の腕 $a=1,b=2$ とする。行列の形、価格を $\log N$ で割った値、$D_*$ を求めよ。

<!-- solution-start -->
##### 詳細解答

$s=16,q=4$ だから $16\times4$ と $4\times16$。出力との二辺は4と5、入力間は3。よって価格は $4\log16+5\log16+3\log4$、$\log16=(1/2)\log256,\log4=(1/4)\log256$ なので比は $9/2+3/4=21/4$。$h=(1/3+1+1/2)^{-1}=6/11$、$D_*=6-6/11=60/11$。$21/4\le60/11$ は $231\le240$ に等しい。
<!-- solution-end -->

<a id="ex-mmx19-a04"></a>

#### MMX19-A04 符号とshear

- Level: A

第5節の交換行列の分解を標数2で確かめよ。

<!-- solution-start -->
##### 詳細解答

標数2では $-1=1$ なので符号行列は単位行列。最初の二つのshearの積は $\begin{pmatrix}0&1\\1&1\end{pmatrix}$。これに右から $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ を掛けると $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ になる。最後の右下は $1+1=0$。従って逆元2を使わずに交換できる。
<!-- solution-end -->

### Level B

<a id="ex-mmx19-b01"></a>

#### MMX19-B01 長腕の基準率

- Level: B

腕 $(1,1,b)$（$b>0$）について $D_*$ と $u_i$ を求め、$b\ge1$ で $\min_i u_i\ge1/2$ を示せ。

<!-- solution-start -->
##### 詳細解答

$h=(2+1/b)^{-1}=b/(2b+1)=1/2-1/(4b+2)$。従って $D_*=b+2-h=b+3/2+1/(4b+2)$。$u_1=u_2=1-h=(b+1)/(2b+1)>1/2$。$u_3=1-h/b=2b/(2b+1)\ge2/3$（$b\ge1$）。従って [基準率の下界と接触プロファイル](#thm-mmx19-profile-rigidity) の誤差定数には $\eta=1/2$ を共通に使える。
<!-- solution-end -->

<a id="ex-mmx19-b02"></a>

#### MMX19-B02 切片和の制約

- Level: B

正の非減少凹関数 $f,g$ が $f(3t+1)\ge2f(t)+g(t)$、$g(3t+1)\ge2g(t)+f(t)$ を満たすとする。無限遠の傾きが共通の正数となり、正規化した二つの切片の和が1以下となることを示せ。

<!-- solution-start -->
##### 詳細解答

[配置別の傾きと切片](#lem-mmx19-intercept) の実数部分を再構成する。凹性と非減少性から無限遠の割線傾き $s,s'$ が非負有限な極限を持ち、$f(t)/t\to s,g(t)/t\to s'$。各不等式を $t$ で割ると $3s\ge2s+s'$ と $3s'\ge2s'+s$ から一致する。$S=f+g$、$t_m=3^m(t+1/2)-1/2$ と置けば $S(t_m)\ge3^m S(t)$ なので $S(t)/(t+1/2)\le 2s$。正値性から $s>0$。割線傾きは $s$ 以上だから $f(t)-st,g(t)-st$ は非減少、$t\downarrow0$ での正値性から非負。和は $S(t)-2st\le s$。それぞれの有限極限を $s$ で割ると切片和は1以下となる。
<!-- solution-end -->

<a id="ex-mmx19-b03"></a>

#### MMX19-B03 paddingの余裕

- Level: B

短い行の指数が $T^{1/10}$、差の階数が $T^{4/5}$、$T\le 2^{20}N^{1+\theta}$ とする。$\theta=1/20$ で十分大きい $N$ に対して非零列数 $N^{1/8}$ 以下、差の階数 $N^{9/10}$ 以下となるか。

<!-- solution-start -->
##### 詳細解答

$T^{1/10}\le 2^2 N^{21/200}$。目標指数 $1/8=25/200$ との差は $4/200=1/50>0$ なので $4\le N^{1/50}$ なら達成する。$T^{4/5}\le2^{16}N^{21/25}$、目標指数 $9/10$ との差は $3/50>0$ なので $2^{16}\le N^{3/50}$ なら達成する。両方の閾値の最大を超えればよい。定数倍があっても正の指数差が必要である。
<!-- solution-end -->

<a id="ex-mmx19-b04"></a>

#### MMX19-B04 低次元補正の通信

- Level: B

$D_4\ge L=10$、$h_0=1/4$、$\delta=1/10$、$\varepsilon=1/5$ とする。補正と短い行の各価格上界を $\log N$ で割り、補正が主項より小さいことを示せ。

<!-- solution-start -->
##### 詳細解答

$h_0/L=1/40<\delta/2=1/20$。 [二重出力の価格比較](#prop-mmx19-collision) の証明で補正の上界は $(1-\delta)L+2h_0=9+1/2=19/2$。短い行の上界は $D_4+\varepsilon h_0=D_4+1/20\ge201/20$ であり、$19/2<10$ だから二項の最大上界は後者である。通常和の価格の余分な $D_4\log2$ は $\log N$ で割ると0へ向かう。
<!-- solution-end -->

### Level C

<a id="ex-mmx19-c01"></a>

#### MMX19-C01 臨界比までの論理

- Level: C

四地点の配置について $D_4\le L+(1/2+\kappa)h_0$ とし、$h_0/L<\delta/2$ を満たすとする。$\kappa\downarrow0$ の極限で価格を $h_0/2$ で割った三地点の価格が固定した斉次三脚上に得られると仮定する。任意の $\varepsilon>0$ で十分大きい $b=2L/h_0-1$ 全体に適用できるとき、無限遠の欠損が0となることを示せ。さらに接触の伝播を仮定して単位三脚での階数下界を求め、どの仮定がこの講で証明されていないか述べよ。

<!-- solution-start -->
##### 詳細解答

[二重出力の価格比較](#prop-mmx19-collision) により

$$
D_{ABC}+D_{ABD'}\le2D_4+2\varepsilon h_0-h_0/2.
$$

$D_{ABD'}\ge L+h_0/4$ と仮定の $D_4$ 上界を代入すると

$$
D_{ABC}\le L+h_0/4+2(\kappa+\varepsilon)h_0.
$$

$h_0/2$ で割れば $2L/h_0+1/2+4(\kappa+\varepsilon)=b+3/2+4(\kappa+\varepsilon)$。仮定した極限で $\kappa\to0$ とし、[基準率の下界と接触プロファイル](#thm-mmx19-profile-rigidity) と B01 の式から

$$
0\le D(1,1,b)-D_*(1,1,b)\le4\varepsilon.
$$

各 $\varepsilon$ に対し十分大きい全 $b$ で同じ斉次三脚上の評価が成り立つため、上極限は $4\varepsilon$ 以下。$\varepsilon\downarrow0$ で欠損の極限は0。接触の伝播をさらに仮定すれば $D(1,1,1)=3-1/3=8/3$。独立した三本のwireの価格は $6\log n$ なので [配線網と階数分解の価格評価](../MMX8/index.md#thm-mmx8-network-rank) から

$$
\log r\ge \frac6{8/3}\log n=\frac94\log n,\qquad r\ge n^{9/4}.
$$

四地点の価格上界、全 $b$ に共通する斉次三脚への極限、接触の伝播はこの問題では仮定した。前二者を動く地点の解析から得て、最後を価格の最適化から示すのが後続講義の仕事である。腕が三本あるだけで $D=8/3$ になるわけではない。
<!-- solution-end -->

## 8. 次の問い

長方形積の価格比較と、接触時に多項式乗算の切片が決まる機構を得ました。次講では付値を持つ体の価格を作り、パラメータが衝突するときの価格と地点の移動を調べます。
