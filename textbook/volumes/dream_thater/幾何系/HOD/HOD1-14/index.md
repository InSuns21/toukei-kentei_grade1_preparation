# HOD1-14 HodgeダイヤモンドIIと大域制約

<!-- definition-example-audit: strict -->

## 1. 同じ対称性でも、ダイヤモンドは一つに決まらない

[Hodge数の共役対称性と補次数対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)は、ダイヤモンドの向かい合う数を等しくする。しかし、それだけでは中央の値は決まらない。[複素二次元トーラス](../HOD1-09/index.md#thm-hod1-09-torus-numbers)の中央は $h^{1,1}=4$、[射影直線の積](../HOD1-09/index.md#thm-hod1-09-product-hodge)では $h^{1,1}=2$ である。どちらも複素次元 $2$ のコンパクトKähler多様体だ。

今回は三つの問いを結び付ける。

1. 複素射影空間 $\mathbb{CP}^n$ のHodge数を、コホモロジー環の公式を仮定せずに計算できるか。
2. [Hard Lefschetz定理](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)は、各次数・各型の次元にどのような不等式を強制するか。
3. $\mathbb{CP}^2$、$\mathbb{CP}^1\times\mathbb{CP}^1$、複素二次元トーラスでは、中央の原始類と交叉形式がどう違うか。

特に断らない限り、$X$ は滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体、$\omega$ は実基本 $(1,1)$ 形式である。$H^k(X)$ は複素係数de Rhamコホモロジー、$H^{p,q}(X)$ は[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で $H^{p+q}(X)$ に入る型別成分、$b_k=\dim_{\mathbb C}H^k(X)$ とする。$h^{p,q}=\dim_{\mathbb C}H^{p,q}$ は[Hodge数](../HOD1-07/index.md#def-hod1-07-hodge-numbers)である。$L_Ha=[\omega]_d\smile a$ は[de Rham積](../HOD1-10/index.md#def-hod1-10-de-rham-product)によるLefschetz作用で、$L_H^0=I$ と約束する。

## 2. 射影空間は対称性だけで全ての調和形式を数えられる

まず最小例の $\mathbb{CP}^1$ を思い出す。[射影直線の計算](../HOD1-09/index.md#prop-hod1-09-projective-line)では調和形式が次数 $0,2$ に各一つあり、次数 $1$ は零だった。高次元でも、回転に対して形が変わらない調和形式が残るはずである。

$\mathbb{CP}^n$ は $\mathbb C^{n+1}$ の原点を通る複素直線全体の空間であり、点を同次座標 $[Z_0:\cdots:Z_n]$ で表す。[正則アトラス](../../CM/CM1-10/index.md#thm-cm1-10-projective-topology)と[大域Fubini–Study形式](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)は既習である。[群作用](../../../代数系/GRP/GRP3/index.md#def-grp3-group-action)は、群の各元が空間上の変換を与え、その合成が群演算と整合することをいう。ここでは[ユニタリ群](../../../代数系/LIE/LIE3/index.md#def-lie3-unitary-groups) $U(n+1)$ による変換だけを使う。Fubini–Study形式の規格化を

$$
\omega_{\mathrm{FS}}=i\partial\bar\partial
\log\!\left(1+\sum_{j=1}^n|z^j|^2\right)
$$

とする。$U(n+1)$ は標準Hermite内積を保つ複素行列の群であり、同次座標に作用する。二つの単位ベクトルをそれぞれ正規直交基底へ延長すれば、その基底を移すユニタリ行列が作れる。従って作用は射影空間上で推移的である。$\log\|Z\|^2$ の $i\partial\bar\partial$ という表示から、$\|UZ\|=\|Z\|$ を使えば $\omega_{\mathrm{FS}}$ も保たれる。これは単なる複素構造の自己同型ではなく**計量を保つ作用**である。

この対称性が調和形式を縛る。$g\in U(n+1)$ に対し、スペクトル定理で $g=V\operatorname{diag}(e^{i\theta_0},\ldots,e^{i\theta_n})V^*$ と書ける。$g_t=V\operatorname{diag}(e^{it\theta_0},\ldots,e^{it\theta_n})V^*$（$0\le t\le1$）は単位行列から $g$ への滑らかな道で、各 $g_t$ の射影作用は微分同相写像である。したがって $g$ の作用は恒等写像と滑らかにホモトピックであり、[de Rhamコホモロジーのホモトピー不変性](../../GEO/GEO9/index.md#thm-geo9-homotopy-invariance)により類への引き戻しは恒等作用になる。

<a id="thm-hod1-14-projective-hodge"></a>

<!-- formal-statement-start -->
> **定理（複素射影空間のHodge数とコホモロジー環）**
> $n\ge1$ とし、$X=\mathbb{CP}^n$ に上記のFubini–Study Kähler計量を入れる。$0\le p,q\le n$ について

$$
h^{p,q}(X)=
\begin{cases}1&(p=q),\\0&(p\ne q).\end{cases}
$$

> また $x=[\omega_{\mathrm{FS}}/(2\pi)]_d\in H^{1,1}(X)$ と置くと、複素係数次数付き環として

$$
H^*_{\mathrm{dR}}(X;\mathbb C)
\cong\mathbb C[x]/(x^{n+1}),\qquad \deg x=2.
$$

> 特に $b_{2r}=1$（$0\le r\le n$）、$b_{2r+1}=0$（$0\le r<n$）である。
<!-- formal-statement-end -->

### 証明の見取り図

コンパクトKähler上の[調和代表の一意性](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を、ユニタリ群の連結性と組み合わせると、**全ての調和形式が群作用で不変**になる。一点を固定するユニタリ群の対角回転と座標の置換を調べれば、不変 $(p,q)$ 形式は $p=q$ のときの $\omega_{\mathrm{FS}}^p$ だけと分かる。最後に[調和形式へのLefschetz作用](../HOD1-10/index.md#thm-hod1-10-harmonic-lefschetz)がその候補を実現する。

<!-- proof-start -->
### 証明

**（1）調和形式はユニタリ作用で不変。** $\alpha$ を任意の調和 $k$ 形式とする。$g\in U(n+1)$ はFubini–Study計量を保つので、Hodge星・$d$・$d^*$ と可換であり、$g^*\alpha$ も調和的である。他方、上で作った $g_t$ によって $g$ は恒等写像と滑らかにホモトピックだから、[ホモトピー不変性](../../GEO/GEO9/index.md#thm-geo9-homotopy-invariance)で $[g^*\alpha]_d=[\alpha]_d$。そこで[一意な調和代表](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を適用すると $g^*\alpha=\alpha$ となる。型も保つので、$(p,q)$ 型ごとに論じてよい。

**（2）一点の不変形式を分類。** 基点を $o=[1:0:\cdots:0]$ とする。$o$ を固定する行列 $\operatorname{diag}(1,A)$（$A\in U(n)$）は、局所座標 $z=(Z_1/Z_0,\ldots,Z_n/Z_0)$ に $z\mapsto Az$ と作用する。従って接空間で完全な $U(n)$ 作用が得られる。

点 $o$ でunitary $(1,0)$ 余標構 $\theta^1,\ldots,\theta^n$ を選ぶ。$(p,q)$ 形式は $\theta^I\wedge\bar\theta^J$（$|I|=p,|J|=q$、添字は昇順）の線形結合である。対角回転 $A=\operatorname{diag}(e^{it_1},\ldots,e^{it_n})$ による引き戻しでは、各添字 $j$ の因子は $e^{it_j}$ と $e^{-it_j}$ の積である。全ての $t_j$ に対し不変であるには、$j$ が $I$ と $J$ の両方に現れるか、どちらにも現れない必要がある。ゆえに $I=J$、従って $p=q=r$ に限られる。

$\omega_j=i\theta^j\wedge\bar\theta^j$ とおけば、不変候補は $\omega_I=\bigwedge_{j\in I}\omega_j$（$|I|=r$）の線形結合である。座標を置換するユニタリ行列は $\omega_I$ を $\omega_{\sigma(I)}$ に移す。二形式 $\omega_j$ 同士の入れ替えには符号がないため、全ての $r$ 元部分集合の係数は等しくなければならない。従って不変形式の空間は高々一次元であり、

$$
\sum_{|I|=r}\omega_I=\frac{1}{r!}
\left(\sum_{j=1}^n\omega_j\right)^r
=\frac{\omega_{\mathrm{FS}}^r}{r!}
$$

がその候補である。推移性により、群不変な形式は基点での値だけで決まるので、この分類は全 $X$ に及ぶ。

**（3）候補は全て存在する。** 定数関数 $1$ は調和 $0$ 形式である。[Kähler上のLaplacianとLの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)を $r$ 回使えば $\omega_{\mathrm{FS}}^r=L^r1$ も調和的である。Kähler正値性から点ごとに $\omega_{\mathrm{FS}}^r\ne0$（$0\le r\le n$）。したがって各 $(r,r)$ の調和形式はこの一つで尽くされ、他の型には調和形式がない。[型別調和代表との同型](../HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)からHodge数の公式が従う。

**（4）積構造。** [Hodge–de Rham同型](../../GA/GA6/index.md#thm-ga6-hodge-de-rham)を複素化し、[型別Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)と合わせると $H^{2r}=\mathbb C[\omega_{\mathrm{FS}}^r]_d$、奇数次は零となる。$x=[\omega_{\mathrm{FS}}/(2\pi)]_d$ の積 $x^r$ は非零の $[\omega_{\mathrm{FS}}^r/(2\pi)^r]_d$ であり、各偶数次の基底となる。一方、実次元は $2n$ なので $x^{n+1}=0$。従って $1,x,\ldots,x^n$ を基底に持ち、関係は $x^{n+1}=0$ のみである。$\square$
<!-- proof-end -->

この証明は射影空間のセル分解や一般の特異コホモロジーの計算を仮定しない。必要だったのはFubini–Studyの等長対称性、群の連結性、調和代表の一意性、点ごとのユニタリ線形代数である。**単なる複素多様体の自己同型であれば調和形式を保つとは限らない**ので、「等長作用」を抜かして同じ議論をしてはいけない。

**具体例 $n=2$。** ダイヤモンドは[配置規約](../HOD1-09/index.md#def-hod1-09-hodge-diamond)に従い

$$
\begin{array}{ccccc}
&&1&&\\
&0&&0&\\
0&&1&&0\\
&0&&0&\\
&&1&&
\end{array}
$$

となる。$b=(1,0,1,0,1)$、$H^2=\mathbb Cx$、$x^2\ne0$、$x^3=0$。後で比較する射影直線の積では、中央の $1$ が $2$ になる。

## 3. $2\pi$ を含む交叉積分を局所座標から検算する

コホモロジー環の複素係数生成元としては、$[\omega_{\mathrm{FS}}]$ を使っても変わらない。しかし整数的に自然な規格化を読み取るには、最高次の積分が必要である。[射影直線の面積計算](../../KAH/KAH1-07/index.md#thm-kah1-07-area)では $\int_{\mathbb{CP}^1}\omega_{\mathrm{FS}}=2\pi$ だった。これを高次元でも直接検算する。

<a id="prop-hod1-14-fs-volume"></a>

<!-- formal-statement-start -->
> **命題（Fubini–Study形式の最高次積分）**
> $n\ge1$、$X=\mathbb{CP}^n$ とし、Fubini–Study形式を第2節の規格化で取る。このとき複素向きによる積分について

$$
\int_X\frac{\omega_{\mathrm{FS}}^n}{n!}
=\frac{(2\pi)^n}{n!},\qquad
\int_X\left(\frac{\omega_{\mathrm{FS}}}{2\pi}\right)^n=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

標準チャート $U_0\simeq\mathbb C^n$ でHermite係数行列の行列式を求める。高次元実球面の極座標積分を、一変数置換 $t=r^2/(1+r^2)$ に落とす。チャート外は滑らかな体積測度について零集合なので、全体の積分と一致する。

<!-- proof-start -->
### 証明

$r^2=\sum_j|z^j|^2$、$A=1+r^2$ と置く。[Fubini–Study局所表示](../../KAH/KAH1-06/index.md#def-kah1-06-local-fs)を $z^j,\bar z^k$ で微分すれば

$$
g_{j\bar k}=\frac{A\delta_{jk}-\bar z^jz^k}{A^2}.
$$

階数一の行列 $(\bar z^jz^k)$ は $z$ に沿う複素一次元で固有値 $r^2$、その直交補で固有値零を持つ。従って $g$ はその一次元上で $A^{-2}(A-r^2)=A^{-2}$、直交補 $n-1$ 次元上で $A^{-1}$ を固有値に持ち、

$$
\det(g_{j\bar k})=A^{-2}A^{-(n-1)}=A^{-(n+1)}.
$$

$i\,dz^j\wedge d\bar z^j=2\,dx^j\wedge dy^j$ だから、複素向きでの体積形式は

$$
\frac{\omega_{\mathrm{FS}}^n}{n!}
=\frac{2^n}{(1+r^2)^{n+1}}
\,dx^1\,dy^1\cdots dx^n\,dy^n.
$$

上式の積は向き付けられた体積要素を意味する。$X\setminus U_0\cong\mathbb{CP}^{n-1}$ は滑らかな実余次元 $2$ の部分多様体なので体積測度零。従って積分を $\mathbb R^{2n}$ 上で計算してよい。

単位球面 $S^{2n-1}$ の面積を $S_{2n-1}$ と書く。Gauss積分 $\int_{\mathbb R^{2n}}e^{-|x|^2}dx=\pi^n$ を極座標に直すと、$\int_0^\infty e^{-r^2}r^{2n-1}dr=(n-1)!/2$ より $S_{2n-1}=2\pi^n/(n-1)!$。これを使い、$t=r^2/(1+r^2)$（$0\le t<1$）と置換する。$dt=2r(1+r^2)^{-2}dr$ なので

$$
\frac{r^{2n-1}}{(1+r^2)^{n+1}}dr
=\frac12\left(\frac{r^2}{1+r^2}\right)^{n-1}dt
=\frac12t^{n-1}dt.
$$

よって

$$
\begin{aligned}
\int_X\frac{\omega_{\mathrm{FS}}^n}{n!}
&=2^n S_{2n-1}\int_0^\infty
\frac{r^{2n-1}}{(1+r^2)^{n+1}}dr\\
&=2^n\frac{2\pi^n}{(n-1)!}\cdot\frac12\int_0^1t^{n-1}dt\\
&=2^n\frac{2\pi^n}{(n-1)!}\cdot\frac{1}{2n}
=\frac{(2\pi)^n}{n!}.
\end{aligned}
$$

両辺に $n!/(2\pi)^n$ を掛ければ第二式を得る。$\square$
<!-- proof-end -->

例えば $n=2$ では $\int\omega_{\mathrm{FS}}^2=(2\pi)^2$、$\int\omega_{\mathrm{FS}}^2/2!=2\pi^2$。後者がRiemann計量の体積であり、両者を混同すると係数 $2$ を失う。$x=[\omega_{\mathrm{FS}}/(2\pi)]_d$ に対し $\int x^2=1$ なので、曲面の交叉行列は基底 $x$ で $(1)$ になる。

## 4. Lefschetz作用は低次数で自由度を減らせない

[Hard Lefschetz](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)は $L_H^{n-k}:H^k\to H^{2n-k}$ の同型である。しかしこれを $L_H:H^k\to H^{k+2}$ の単射性に直す際には、指数 $n-k$ が正であることを確かめなければならない。$k=n$ の中央次数にはその議論を適用できない。

<a id="prop-hod1-14-low-degree-injection"></a>

<!-- formal-statement-start -->
> **命題（低次数Lefschetz単射性とHodge数の単調性）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とする。整数 $0\le k<n$ に対して

$$
L_H:H^k(X)\longrightarrow H^{k+2}(X)
$$

> は単射であり、$b_k\le b_{k+2}$ である。さらに $p,q\ge0$、$p+q=k<n$ に対して型別写像 $L_H:H^{p,q}(X)\to H^{p+1,q+1}(X)$ は単射であり、

$$
h^{p,q}\le h^{p+1,q+1}.
$$

> $k\le n-2$ なら差は $\dim_{\mathbb C}P_H^{p+1,q+1}\ge0$ に等しい。一方 $k=n-1$ では型別写像は同型で、上記不等式は等号となる。
<!-- formal-statement-end -->

### 証明の見取り図

$L_Ha=0$ を仮定して、残り $n-k-1$ 回だけ $L_H$ を掛けるとHard Lefschetzの同型に到達する。型別性は[型別Hard Lefschetz](../HOD1-11/index.md#prop-hod1-11-type-refinement)で確かめる。差の式は[原始Hodge型の分解](../HOD1-12/index.md#prop-hod1-12-type-decomposition)で不足分を数える。

<!-- proof-start -->
### 証明

$k<n$ より $n-k-1\ge0$。$a\in H^k$ が $L_Ha=0$ を満たすなら、

$$
L_H^{n-k}a=L_H^{n-k-1}(L_Ha)=0.
$$

[Hard Lefschetz同型](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)の定義域はちょうどこの $H^k$ であり、単射だから $a=0$。有限次元空間の単射なので $b_k\le b_{k+2}$。

$[\omega]_d$ は $(1,1)$ 型なので、[型の移動](../HOD1-10/index.md#prop-hod1-10-hodge-type-shift)によって $L_H$ は $H^{p,q}$ を $H^{p+1,q+1}$ に写す。全空間で単射な写像の制限も単射ゆえ $h^{p,q}\le h^{p+1,q+1}$。さらに $p+q+2\le n$ のとき、[原始Hodge型による直和](../HOD1-12/index.md#prop-hod1-12-type-decomposition)を次数 $k+2$ に適用して

$$
H^{p+1,q+1}=P_H^{p+1,q+1}\oplus L_HH^{p,q}
$$

を得る。右辺第二項の次元は単射性で $h^{p,q}$ なので、差の式が従う。$k=n-1$ のときは $n-k=1$ だから[型別Hard Lefschetz同型](../HOD1-11/index.md#prop-hod1-11-type-refinement)がそのまま $L_H$ の同型性を与える。$\square$
<!-- proof-end -->

**不等式の読み方。** 偶数列 $b_0\le b_2\le b_4\le\cdots$ と奇数列 $b_1\le b_3\le\cdots$ は、いずれも**次数が $n$ を超える手前まで**増加する。上半分は[Hard Lefschetzの次数対称性](../HOD1-11/index.md#cor-hod1-11-betti-symmetry)で折り返す。例えば $n=3$ なら $b_0\le b_2$、$b_1\le b_3$、$b_2\le b_4$ だが、最後は $b_2=b_4$ でもある。$b_3\le b_5$ はこの命題からは出ず、実際 $b_3$ が $b_5$ より大きい例もある。

**中央で止まる理由。** $X=\mathbb{CP}^1\times\mathbb{CP}^1$ は $n=2$、$H^2$ の次元が $2$、$H^4$ の次元が $1$ なので、$L_H:H^2\to H^4$ は単射になれない。中央次数 $k=n$ まで不等式を延長して $b_2\le b_4$ とするのは誤りである。

## 5. Kähler形式を掛けた類は途中で消えない

第4節の単射性を次数 $0$ の単位類から繰り返してもよいが、最高次積分の正値性からさらに直接的に分かる。Kähler形式の冪は **$n$ 回目までは必ず非零** である。

<a id="cor-hod1-14-kahler-powers"></a>

<!-- formal-statement-start -->
> **系（Kähler類の冪の非零性）**
> $X$ を滑らか・コンパクト・境界なしの複素次元 $n\ge1$ のKähler多様体とし、$\omega$ を基本形式とする。このとき $0\le r\le n$ で $[\omega]_d^r\ne0\in H^{2r}(X)$ であり、

$$
\int_X\omega^n=n!\operatorname{Vol}_g(X)>0.
$$

> 特に $b_{2r}\ge1$、$h^{r,r}\ge1$ である。$X$ が連結なら $b_0=h^{0,0}=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最高次の積分が零ならStokesの定理と矛盾する。低い冪が零類だったと仮定すれば、それに残りの冪を掛けて最高次の零類を得てしまう。この仕組みは[コンパクトKähler類の非零性](../../KAH/KAH1-13/index.md#thm-kah1-13-compact-nonzero)を全ての冪へ拡張する。

<!-- proof-start -->
### 証明

[Kähler体積の規約](../HOD1-13/index.md#thm-hod1-13-primitive-star)により、各点で $dV_g=\omega^n/n!$ は正の滑らかな体積形式である。$X$ は空でないコンパクト多様体で境界なしだから、$\int_XdV_g>0$。$d\omega=0$ より全ての $\omega^r$ は閉形式である。

$1\le r\le n$ で $[\omega^r]_d=0$ と仮定すると、ある滑らかな $(2r-1)$ 形式 $\eta$ が存在して $\omega^r=d\eta$ となる。$d\omega=0$ なので

$$
\omega^n=d\eta\wedge\omega^{n-r}
=d(\eta\wedge\omega^{n-r}).
$$

境界がないためStokesの定理で $\int_X\omega^n=0$ となり、正値性に矛盾する。$r=0$ の単位類も、$X\ne\varnothing$ では零でない。さらに $\omega^r$ は $(r,r)$ 型であり、[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)で非零の $H^{r,r}$ 成分を与える。従って二つの次元の下界を得る。$X$ が連結なら調和 $0$ 形式は定数関数だけなので $h^{0,0}=b_0=1$。$\square$
<!-- proof-end -->

**適用の境界。** コンパクト性を外した $\mathbb C^n$ は標準的なKähler形式を持つが、$H^2_{\mathrm{dR}}(\mathbb C^n)=0$ である。実際、標準座標の $\omega=\sum_jdx^j\wedge dy^j$ は $d(\sum_j x^jdy^j)$ で完全となる。非コンパクトではStokesの境界項を捨てられず、上の非零性は結論できない。

## 6. 三つの複素曲面を比べる：中央の「余分な成分」

複素次元 $2$ の場合、[Hodgeダイヤモンド](../HOD1-09/index.md#def-hod1-09-hodge-diamond)の中央には $(2,0),(1,1),(0,2)$ の三種類がある。$\mathbb{CP}^2$、$Q=\mathbb{CP}^1\times\mathbb{CP}^1$、$T=\mathbb C^2/\Lambda$（$\Lambda$ は全格子）を同じ表に置くと、違いが明瞭になる。三例とも連結・コンパクト・境界なしで、[Fubini–Study計量](../../KAH/KAH1-07/index.md#thm-kah1-07-global-fs)、その積計量、[平坦トーラスのKähler計量](../../KAH/KAH1-05/index.md#prop-kah1-05-torus)をそれぞれ持つ。

| $X$ | $h^{1,0}$ | $h^{2,0}$ | $h^{1,1}$ | $(b_0,b_1,b_2,b_3,b_4)$ |
|---|---:|---:|---:|---|
| $\mathbb{CP}^2$ | $0$ | $0$ | $1$ | $(1,0,1,0,1)$ |
| $\mathbb{CP}^1\times\mathbb{CP}^1$ | $0$ | $0$ | $2$ | $(1,0,2,0,1)$ |
| $T$ | $2$ | $1$ | $4$ | $(1,4,6,4,1)$ |

一行目は[第2節の定理](#thm-hod1-14-projective-hodge)、二行目は[積のHodge数](../HOD1-09/index.md#thm-hod1-09-product-hodge) $P_Q=(1+uv)^2$、三行目は[複素トーラスのHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers) $P_T=(1+u)^2(1+v)^2$ から導いた。表に示さなかった値は[共役・補次数対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)で復元できる。

数字の差をさらに理解するため、曲面の実二次類に対する**交叉形式**を使う。実コホモロジー $H^2_{\mathrm{dR}}(X;\mathbb R)$ の二つの類 $a,b$ に対して $Q_X(a,b)=\int_Xa\smile b$ と定める。次数が偶数なので対称双線形である。ここでの実係数部分の符号は[Hodge指数定理とその拡張](../HOD1-13/index.md#cor-hod1-13-full-signature)の対象であり、複素係数全体を実ベクトル空間と見なして符号を数えるものではない。

<a id="prop-hod1-14-surface-comparison"></a>

<!-- formal-statement-start -->
> **命題（複素曲面三例の原始部分と交叉形式）**
> $X$ を次のいずれかの滑らか・連結・コンパクトKähler曲面とする。原始二次類は[原始コホモロジー](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)の $P_H^2=\ker(L_H:H^2\to H^4)$ とする。
>
> 1. 射影平面 $X=\mathbb{CP}^2$、$x=[\omega_{\mathrm{FS}}/(2\pi)]_d$ について

$$
H^2(X)=\mathbb Cx,\qquad P_H^2=0,\qquad Q_X(x,x)=1.
$$

> 2. 射影直線の積 $X=\mathbb{CP}^1\times\mathbb{CP}^1$ では、二因子からの規格化二次類を $u,v$、$[\omega]_d=2\pi(au+bv)$（$a,b>0$）とすると

$$
u^2=v^2=0,\quad \int_Xuv=1,\quad P_H^2=\mathbb C(au-bv).
$$

> 実二次交叉形式の符号は $(1,1)$ である。
> 3. $X=T=\mathbb C^2/\Lambda$ に定数正定値Hermite計量を降ろすと

$$
\dim_{\mathbb C}P_H^2=5,\qquad
\dim_{\mathbb C}P_H^{1,1}=3.
$$

> 実二次交叉形式の符号は $(3,3)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

最初の二例は $H^2$ の具体的な基底で $L_H$ と交叉積を行列計算する。三例目は[原始部分の次元公式](../HOD1-12/index.md#cor-hod1-12-primitive-dimensions)と、[複素曲面の交叉形式の符号](../HOD1-13/index.md#cor-hod1-13-full-signature)を、実・複素の次元を区別して適用する。

<!-- proof-start -->
### 証明

**（1）射影平面。** [射影空間の環構造](#thm-hod1-14-projective-hodge)で $H^2=\mathbb Cx$、$H^4=\mathbb Cx^2$。Kähler類は $[\omega]_d=2\pi x$ だから、$L_H(cx)=2\pi c x^2$。$x^2\ne0$ より核は零。[最高次積分](#prop-hod1-14-fs-volume)で $Q_X(x,x)=\int x^2=1$。実基底 $x$ の交叉行列は $(1)$ で、符号は $(1,0)$。

**（2）射影直線の積。** 各因子に[射影直線上の規格化類](../../KAH/KAH1-07/index.md#thm-kah1-07-area) $[\omega_{\mathrm{FS}}/(2\pi)]$ を置き、二つの射影 $\pi_1,\pi_2$ で引き戻して $u,v$ を作る。[積のコホモロジー計算](../HOD1-09/index.md#thm-hod1-09-product-hodge)から $H^2=\mathbb Cu\oplus\mathbb Cv$、$H^4=\mathbb Cuv$。各 $u^2,v^2$ は一因子上の四次形式の引き戻しなので零、積分は積分の積に分かれ $\int uv=1\cdot1=1$。従って

$$
L_H(su+tv)=2\pi(au+bv)(su+tv)
=2\pi(at+bs)uv.
$$

$uv\ne0$ なので核条件は $at+bs=0$、つまり $(s,t)=\lambda(a,-b)$。ゆえに $P_H^2=\mathbb C(au-bv)$。実基底 $(u,v)$ の交叉行列と二つの独立な実ベクトルの値は

$$
[Q_X]_{u,v}=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
Q_X(u+v,u+v)=2,
\quad Q_X(u-v,u-v)=-2.
$$

行列の固有値は $+1,-1$ なので符号は $(1,1)$。またKähler方向 $au+bv$ と原始方向 $au-bv$ の直交性は

$$
Q_X(au+bv,au-bv)=a(-b)+ba=0
$$

と直接検算できる。原始方向の自己交叉は $Q_X(au-bv,au-bv)=-2ab<0$。なお $\int\omega^2=2(2\pi)^2ab>0$ であり、[Kähler類の非零性](#cor-hod1-14-kahler-powers)と一致する。

**（3）複素二次元トーラス。** [トーラスのHodge数](../HOD1-09/index.md#thm-hod1-09-torus-numbers)から $b_2=6$、$b_0=1$、$h^{1,1}=4$、$h^{2,0}=1$。[原始次元公式](../HOD1-12/index.md#cor-hod1-12-primitive-dimensions)を $n=k=2$ に適用して $\dim P_H^2=b_2-b_0=5$。また[型別原始分解](../HOD1-12/index.md#prop-hod1-12-type-decomposition)により $H^{1,1}=P_H^{1,1}\oplus\mathbb C[\omega]_d$ である。従って原始 $(1,1)$ は $4-1=3$ 次元で、残りの原始 $(2,0),(0,2)$ は各一次元である。

[実二次交叉形式の符号公式](../HOD1-13/index.md#cor-hod1-13-full-signature)では正方向が $1+2h^{2,0}=3$、負方向が $h^{1,1}-1=3$ となる。$H^{2,0}\oplus H^{0,2}$ の二つの複素一次元を実空間の正方向 **4次元** と二重に数えてはいけない。複素共役で結び付いた実部分空間の実次元は $2h^{2,0}=2$ で、これに実Kähler方向の $1$ を足す。$\square$
<!-- proof-end -->

**三つともKählerである。** したがって[奇数次Betti数の偶数性](../HOD1-07/index.md#thm-hod1-07-betti-constraints)と[低次数の単調性](#prop-hod1-14-low-degree-injection)は三例に共通する。一方で $h^{1,1}$ や $b_2$、交叉形式の符号まで一致するわけではない。「Kählerならダイヤモンドが一意に決まる」という推論は成り立たない。

## 7. 大域制約をまとめて読む

連結な複素次元 $n$ のコンパクトKähler多様体について、ここまでの結果と既習の定理を組み合わせると、数表に次の試験ができる。

1. [Hodge数の対称性](../HOD1-07/index.md#thm-hod1-07-hodge-conjugation)と[補次数対称性](../HOD1-07/index.md#thm-hod1-07-hodge-duality)を満たすか。
2. [Hodge分解によるBetti数の和・奇数次の偶数性](../HOD1-07/index.md#thm-hod1-07-betti-constraints)を満たすか。
3. [低次数単射性](#prop-hod1-14-low-degree-injection)から $k<n$ で $b_k\le b_{k+2}$、$p+q<n$ で $h^{p,q}\le h^{p+1,q+1}$ となるか。
4. [Kähler類の冪](#cor-hod1-14-kahler-powers)から $0\le r\le n$ で $h^{r,r}\ge1$、$b_{2r}\ge1$ となるか。
5. 複素曲面なら[Hodge指数定理](../HOD1-13/index.md#thm-hod1-13-hodge-index)が交叉形式の符号に課す制約と整合するか。

これらはどれも「Kählerなら必ず成立する」という**片方向の判定**である。数表が全条件を満たしても、その数表を持つコンパクトKähler多様体が存在するとは限らない。例えば数だけからKähler計量を構成することはできない。逆に、いずれか一つに反すればKähler構造の不存在を直ちに証明できる。これが「局所的に正定値な計量」が生む大域的な障害である。

---

## 8. 演習：計算から大域制約へ

演習では $H^k$ は複素係数de Rhamコホモロジー、実交叉形式を使うときだけ $H^k(X;\mathbb R)$ と明記する。引用するKähler形式の規格化、次元、群の基底は各問に示す。

### Level A：まず実際に数える

<a id="ex-hod1-14-a01"></a>
#### HOD1-14-A01 射影平面の環とダイヤモンド
- Level: A

$X=\mathbb{CP}^2$、$x=[\omega_{\mathrm{FS}}/(2\pi)]_d$ とする。[射影空間のHodge数と環構造](#thm-hod1-14-projective-hodge)を用いて、全 $h^{p,q}$、Betti数、$x^2$ と $x^3$ の零・非零、原始二次類の次元を求めよ。

<!-- solution-start -->
### 詳細解答

$n=2$ なので $h^{0,0}=h^{1,1}=h^{2,2}=1$、その他は零である。総次数 $0,1,2,3,4$ ごとに足して $b=(1,0,1,0,1)$。環は $\mathbb C[x]/(x^3)$ だから、基底 $1,x,x^2$ はそれぞれ次数 $0,2,4$ にあり、$x^2\ne0$、$x^3=0$。原始二次類は[核による定義](../HOD1-12/index.md#def-hod1-12-primitive-cohomology)で

$$
P_H^2=\ker(L_H:H^2\to H^4),\qquad
L_H(cx)=2\pi c x^2.
$$

$x^2\ne0$ なので $c=0$ のときだけ像が零。従って $\dim P_H^2=0$。
<!-- solution-end -->

<a id="ex-hod1-14-a02"></a>
#### HOD1-14-A02 三次元射影空間の正規化
- Level: A

$X=\mathbb{CP}^3$ に $\omega_{\mathrm{FS}}=i\partial\bar\partial\log(1+|z|^2)$ を入れ、$x=[\omega_{\mathrm{FS}}/(2\pi)]_d$ とする。$\int_X\omega_{\mathrm{FS}}^3$、Riemann体積、$\int_Xx^3$ を求め、$b_2,b_4,b_6$ を確認せよ。

<!-- solution-start -->
### 詳細解答

[最高次積分](#prop-hod1-14-fs-volume)へ $n=3$ を代入して $\int_X\omega_{\mathrm{FS}}^3=(2\pi)^3=8\pi^3$。体積形式は $\omega^3/3!$ なので $\operatorname{Vol}(X)=8\pi^3/6=4\pi^3/3$。$x^3=[\omega^3/(2\pi)^3]_d$ であるから

$$
\int_Xx^3=\frac{1}{(2\pi)^3}\int_X\omega^3=1.
$$

環は $\mathbb C[x]/(x^4)$ なので $x,x^2,x^3$ が次数 $2,4,6$ にそれぞれ一次元の基底を与え、$b_2=b_4=b_6=1$。
<!-- solution-end -->

<a id="ex-hod1-14-a03"></a>
#### HOD1-14-A03 射影直線の積の二次形式
- Level: A

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$、$H^2(Q)=\mathbb Cu\oplus\mathbb Cv$、$u^2=v^2=0$、$\int_Q uv=1$、$[\omega]_d=2\pi(u+v)$ とする。$L_H$ の核を求め、実基底 $u,v$ で交叉行列とその固有値を計算せよ。

<!-- solution-start -->
### 詳細解答

$L_H(su+tv)=2\pi(u+v)(su+tv)=2\pi(s+t)uv$。$uv$ は非零なので $s+t=0$、核は $\mathbb C(u-v)$。交叉行列の四成分は $\int u^2=0$、$\int uv=1$、$\int vu=1$、$\int v^2=0$ だから $\bigl(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\bigr)$。特性多項式は

$$
\det\begin{pmatrix}-\lambda&1\\1&-\lambda\end{pmatrix}
=\lambda^2-1=(\lambda-1)(\lambda+1).
$$

固有値は $1,-1$ で、実二次交叉形式の符号は $(1,1)$。
<!-- solution-end -->

<a id="ex-hod1-14-a04"></a>
#### HOD1-14-A04 どの次数で単射か
- Level: A

$X$ を複素次元 $n=4$ の滑らか・コンパクト・境界なしKähler多様体とする。[Hard Lefschetz](../HOD1-11/index.md#thm-hod1-11-hard-lefschetz)から $L_H:H^k\to H^{k+2}$ の単射性を保証できる $k=0,1,2,3,4$ を挙げ、対応するBetti数の不等式を書け。$k=4$ で保証できない理由も述べよ。

<!-- solution-start -->
### 詳細解答

[低次数単射性](#prop-hod1-14-low-degree-injection)の条件 $k<n=4$ を満たすのは $k=0,1,2,3$。よって

$$
b_0\le b_2,\qquad b_1\le b_3,\qquad
b_2\le b_4,\qquad b_3\le b_5.
$$

各 $k<4$ では $L_Ha=0$ なら $L_H^{4-k}a=L_H^{3-k}(L_Ha)=0$、Hard Lefschetzの同型の単射性から $a=0$ となる。$k=4$ では指数 $4-k=0$ で、同型なのは $L_H^0=I:H^4\to H^4$ だけ。ここから次の $L_H:H^4\to H^6$ の単射性は導けない。
<!-- solution-end -->

### Level B：なぜそうなるかを再導出する

<a id="ex-hod1-14-b01"></a>
#### HOD1-14-B01 点ごとのユニタリ不変形式
- Level: B

複素次元 $n=2$ のHermiteベクトル空間にunitary $(1,0)$ 余標構 $\theta^1,\theta^2$ を取り、$\omega_j=i\theta^j\wedge\bar\theta^j$ とする。$U(2)$ の対角回転と座標交換に不変な複素二次形式を全て求めよ。なぜ $(2,0)$ 型の不変形式はないかも説明せよ。

<!-- solution-start -->
### 詳細解答

任意の二次形式を $(2,0),(1,1),(0,2)$ 型に分ける。対角回転 $(\theta^1,\theta^2)\mapsto(e^{it_1}\theta^1,e^{it_2}\theta^2)$ の下で、$\theta^1\wedge\theta^2$ は $e^{i(t_1+t_2)}$ 倍、$\bar\theta^1\wedge\bar\theta^2$ は $e^{-i(t_1+t_2)}$ 倍される。全ての $t_1,t_2$ で不変になる非零の係数はない。

$(1,1)$ 型の $\theta^j\wedge\bar\theta^k$ は $e^{i(t_j-t_k)}$ 倍される。$j\ne k$ の項は消え、残る候補は $c_1\omega_1+c_2\omega_2$。二つの座標を交換するユニタリ行列を作用させると $c_1=c_2$ が必要なので、全不変二次形式は

$$
c(\omega_1+\omega_2)=c\omega,\qquad c\in\mathbb C.
$$

逆に $U(2)$ はHermite計量と複素構造を保つので基本形式 $\omega$ を保つ。従ってこの一次元空間の全てが本当に不変である。
<!-- solution-end -->

<a id="ex-hod1-14-b02"></a>
#### HOD1-14-B02 トーラスの原始成分と符号
- Level: B

$T=\mathbb C^2/\Lambda$（$\Lambda$ は全格子）に平坦Kähler計量を入れる。$h^{p,q}=\binom2p\binom2q$ を用いて $\dim P_H^2$、$\dim P_H^{1,1}$ を求め、実二次交叉形式の正・負方向の次元を[実二次コホモロジー全体の交叉形式の符号](../HOD1-13/index.md#cor-hod1-13-full-signature)から導け。

<!-- solution-start -->
### 詳細解答

$b_0=h^{0,0}=1$、$b_2=h^{2,0}+h^{1,1}+h^{0,2}=1+4+1=6$。[原始部分の次元公式](../HOD1-12/index.md#cor-hod1-12-primitive-dimensions)へ $k=n=2$ を代入すると $\dim P_H^2=6-1=5$。原始 $(1,1)$ 型は $H^{1,1}=P_H^{1,1}\oplus L_HH^{0,0}$ により、次元 $4-1=3$。実二次交叉形式について、正方向はKähler類の $1$ 次元と $H^{2,0}\oplus H^{0,2}$ の実部分 $2h^{2,0}=2$ 次元を足し $3$。負方向は原始実 $(1,1)$ の $3$ 次元である。したがって符号は $(3,3)$、合計 $3+3=b_2=6$ とも整合する。
<!-- solution-end -->

<a id="ex-hod1-14-b03"></a>
#### HOD1-14-B03 対称性を満たすだけでは足りない
- Level: B

連結な複素次元 $2$ のコンパクト複素多様体に、仮に $h^{0,0}=h^{2,2}=1$、それ以外の $h^{p,q}=0$ という数表が対応しているとする。この数表は共役対称性と補次数対称性を満たす。それでもKähler多様体にはなり得ないことを、二つの異なる理由で示せ。

<!-- solution-start -->
### 詳細解答

Kählerであると仮定して[Hodge分解](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)を適用すると、$b_0=1$、$b_2=h^{2,0}+h^{1,1}+h^{0,2}=0$、$b_4=1$。[低次数単射性](#prop-hod1-14-low-degree-injection)では複素次元 $n=2$、$k=0<2$ のとき $b_0\le b_2$ が必要だが、$1\le0$ は偽なので矛盾する。

別の理由として、[Kähler類の冪の非零性](#cor-hod1-14-kahler-powers)に $r=1$ を代入すると $[\omega]_d\ne0\in H^{1,1}$ が必要で、$h^{1,1}\ge1$ となる。しかし仮定では $h^{1,1}=0$。つまり単に菱形が左右上下対称でも、正のKähler類を収める中央成分を欠くため実現不能である。
<!-- solution-end -->

<a id="ex-hod1-14-b04"></a>
#### HOD1-14-B04 係数の異なる積Kähler計量
- Level: B

$Q=\mathbb{CP}^1\times\mathbb{CP}^1$、$u^2=v^2=0$、$\int_Q uv=1$、$[\omega]_d=2\pi(2u+3v)$ とする。$P_H^2$ の実生成元を求め、その自己交叉、Kähler方向との交叉、$\int_Q\omega^2$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$L_H(su+tv)=2\pi(2u+3v)(su+tv)=2\pi(2t+3s)uv$。核条件 $2t+3s=0$ は $(s,t)=\lambda(2,-3)$ を与えるため、実生成元は $w=2u-3v$。偶次数の積は可換で、$u^2=v^2=0$ だから

$$
\begin{aligned}
Q_Q(w,w)&=\int_Q(2u-3v)^2=-12,\\
Q_Q(2u+3v,w)&=\int_Q(2u+3v)(2u-3v)=0,\\
\int_Q\omega^2&=(2\pi)^2\int_Q(2u+3v)^2
=12(2\pi)^2.
\end{aligned}
$$

原始方向が負、Kähler方向が正であることは $-12<0<12(2\pi)^2$ と一致する。
<!-- solution-end -->

### Level C：異なる結果を結んで判定する

<a id="ex-hod1-14-c01"></a>
#### HOD1-14-C01 射影空間のHodge数を対称性から構成し直す
- Level: C

$X=\mathbb{CP}^n$（$n\ge1$）にFubini–Study計量を与える。次を順に示せ。(i) $U(n+1)$ の任意の元が恒等写像とホモトピックな等長変換を与える。(ii) 調和 $(p,q)$ 形式はその作用で不変。(iii) 基点の対角ユニタリ回転と座標置換によって不変形式が $p=q$ のとき $\omega^p$ の定数倍だけになる。(iv) その候補は調和的かつ非零であり、コホモロジー環は $\mathbb C[x]/(x^{n+1})$ である。ここで $x=[\omega/(2\pi)]_d$ とする。

<!-- solution-start -->
### 詳細解答

**(i)** $g\in U(n+1)$ はユニタリ対角化 $g=V\operatorname{diag}(e^{i\theta_j})V^*$ を持つ。$g_t=V\operatorname{diag}(e^{it\theta_j})V^*$ は $I$ と $g$ を結び、同次座標への作用から恒等写像と $g$ の射影作用のホモトピーを得る。Fubini–Study形式は $i\partial\bar\partial\log\|Z\|^2$ の局所表示を持つので、$\|gZ\|=\|Z\|$ により不変である。従って各作用は等長変換となる。

**(ii)** 等長性により $g^*$ は $d,d^*,\Delta_d$ と可換だから、調和形式 $\alpha$ に対し $g^*\alpha$ も調和的。(i) の[滑らかなホモトピー不変性](../../GEO/GEO9/index.md#thm-geo9-homotopy-invariance)で $[g^*\alpha]_d=[\alpha]_d$ であり、[調和代表の一意性](../HOD1-06/index.md#thm-hod1-06-hodge-decomposition)から $g^*\alpha=\alpha$。複素構造も保つため $(p,q)$ 型ごとに成立する。

**(iii)** 基点 $[1:0:\cdots:0]$ の[安定化群](../../../代数系/GRP/GRP3/index.md#def-grp3-orbit-stabilizer)に含まれる $\operatorname{diag}(1,A)$（$A\in U(n)$）は接空間に $A$ として作用する。余標構 $\theta^j$ に対する対角回転では単項式 $\theta^I\wedge\bar\theta^J$ の重みは $\prod_{j\in I}e^{it_j}\prod_{j\in J}e^{-it_j}$。全ての $t_j$ に対して重みが $1$ なら $I=J$。従って $p=q=r$、候補は $\omega_I=\bigwedge_{j\in I}(i\theta^j\wedge\bar\theta^j)$ の和。座標置換で全係数が同じになるので $\sum_{|I|=r}\omega_I=\omega^r/r!$ の倍数に限る。推移性により全体でも同じである。

**(iv)** 定数 $1$ は調和的であり、[LaplacianとLの可換性](../HOD1-05/index.md#thm-hod1-05-laplacian-lefschetz)から $\omega^r=L^r1$ も調和的。$\omega^n/n!$ が正の体積形式であるため $0\le r\le n$ の $\omega^r$ は非零である。ゆえに $H^{r,r}=\mathbb C[\omega^r]$、その他の $H^{p,q}$ は零。[de Rhamの積](../HOD1-10/index.md#def-hod1-10-de-rham-product)で $x^r=[\omega^r/(2\pi)^r]_d$ が偶数次数の基底となり、実次元 $2n$ より $x^{n+1}=0$。従って環は $\mathbb C[x]/(x^{n+1})$。$\square$
<!-- solution-end -->

<a id="ex-hod1-14-c02"></a>
#### HOD1-14-C02 三つの曲面に同時に課される制約
- Level: C

三つの滑らか・連結・コンパクトKähler曲面 $X_1=\mathbb{CP}^2$、$X_2=\mathbb{CP}^1\times\mathbb{CP}^1$、$X_3=\mathbb C^2/\Lambda$（$\Lambda$ は全格子）を考える。前二者にはFubini–Study（積）計量、三番目には平坦Kähler計量を与える。$X_2$ では $[\omega]_d=2\pi(u+v)$、$u^2=v^2=0$、$\int uv=1$ とする。各 $X_j$ の $(h^{2,0},h^{1,1})$、$b_2$、$\dim P_H^2$、実二次交叉形式の符号を求めよ。さらに、(a) $b_0\le b_2$、(b) $h^{0,0}\le h^{1,1}$、(c) 奇数次Betti数の偶数性を三例全てで確認せよ。

<!-- solution-start -->
### 詳細解答

$X_1$ では[射影空間の定理](#thm-hod1-14-projective-hodge)から $(h^{2,0},h^{1,1})=(0,1)$、$b_2=1$、$b_0=1$。原始次元は[差の式](../HOD1-12/index.md#cor-hod1-12-primitive-dimensions)により $1-1=0$。[最高次積分](#prop-hod1-14-fs-volume)で実基底 $x$ の交叉値は $\int x^2=1$ なので符号は $(1,0)$。

$X_2$ では[積のHodge数](../HOD1-09/index.md#thm-hod1-09-product-hodge)から $(h^{2,0},h^{1,1})=(0,2)$、$b_2=2$、$b_0=1$、原始次元 $2-1=1$。$H^2$ の実基底 $(u,v)$ で交叉行列は $\bigl(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\bigr)$、固有値は $\pm1$ だから符号は $(1,1)$。また $L_H(u-v)=2\pi(u+v)(u-v)=0$ と具体的に原始類を確認できる。

$X_3$ では[トーラス公式](../HOD1-09/index.md#thm-hod1-09-torus-numbers)に $n=2$ を代入し、$(h^{2,0},h^{1,1})=(1,4)$、$b_2=1+4+1=6$、$b_0=1$。原始次元は $6-1=5$。[Hodge指数の全実二次類への拡張](../HOD1-13/index.md#cor-hod1-13-full-signature)で符号は $(1+2h^{2,0},h^{1,1}-1)=(3,3)$。

最後に三例を並べる。

| | $b_0$ | $b_2$ | $h^{0,0}$ | $h^{1,1}$ | $b_1=b_3$ |
|---|---:|---:|---:|---:|---:|
| $X_1$ | $1$ | $1$ | $1$ | $1$ | $0$ |
| $X_2$ | $1$ | $2$ | $1$ | $2$ | $0$ |
| $X_3$ | $1$ | $6$ | $1$ | $4$ | $4$ |

各行で $b_0\le b_2$ と $h^{0,0}\le h^{1,1}$ が成立し、$b_1,b_3$ はいずれも偶数である。しかし $b_2$ や交叉形式の符号は同一でなく、これらの必要条件だけで数表を一意には決められない。$\square$
<!-- solution-end -->

## 9. この先のHodge構造へ

ここまでは複素係数のHodge分解と、実係数の交叉形式を使った。次は「$H^k(X;\mathbb Q)$ の複素化を分解する」という視点を明確にし、分解を部分空間の列として記録するHodgeフィルトレーションへの入口を作る。射影空間では型 $(r,r)$ しかなくても、トーラスでは $(p,q)$ が入り交じる。その差を整理するためには、複素共役と有理構造を別々に追う必要がある。

