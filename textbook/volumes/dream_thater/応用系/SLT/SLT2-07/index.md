# SLT2-07 kernel補間と有効次元

[SLT2-06の早期停止](../SLT2-06/index.md#thm-slt2-06-finite-flow)では、設計行列の小さい特異値に対応する係数が、長時間の学習で観測雑音を増幅することを見た。しかし、特徴量が無限個あるときに設計行列の列をすべて並べる必要はあるだろうか。

[再生核 Hilbert 空間（RKHS）](../../RKHS/RKHS1/index.md#def-rkhs1-rkhs)では、関数の値を核の内積として扱える。[表現定理](../../RKHS/RKHS2/index.md#thm-rkhs2-representer)と[カーネルリッジ回帰の解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)はすでに学んだ。本章では、その結果を**統計的学習の立場から**、有限標本で何が補間可能か、どの方向に雑音が通るか、いつ学習を止めると何が変わるかへつなぐ。

この章の到達目標は次の五つである。

1. Gram行列が特異でも、補間可能な応答と不可能な応答を判定できる。
2. 係数表示の非一意性と、関数としての最小ノルム解の一意性を証明できる。
3. kernel ridgeの有効次元を、重複・零固有値も含めて計算できる。
4. 核勾配流を固有方向ごとに解き、ridgeと比較できる。
5. 訓練点の信号への偏り・分散を導き、それが標本外汎化の保証ではないと説明できる。

## 1. Gram行列でどの応答が見えるか

入力空間を $\mathcal X$、実数値のRKHSを $\mathcal H$、その[再生核](../../RKHS/RKHS1/index.md#def-rkhs1-reproducing-kernel)を $k$ とする。固定した訓練入力 $x_1,\ldots,x_n\in\mathcal X$（重複を許す）と、応答 $y\in\mathbb R^n$ を考える。

関数 $f\in\mathcal H$ を各訓練点で評価する線形写像と、その[Gram行列](../../RKHS/RKHS2/index.md#prop-rkhs2-gram-reduction)を

$$
Tf=(f(x_1),\ldots,f(x_n))^{\mathsf T},\qquad
K_{ij}=k(x_i,x_j)
$$

と置く。$K$ は[再生核の正半定値性](../../RKHS/RKHS1/index.md#thm-rkhs1-kernel-psd)から対称正半定値であり、負の固有値は持たない。

有限個の点評価は有界なので、$T:\mathcal H\to\mathbb R^n$ の随伴写像 $T^*:\mathbb R^n\to\mathcal H$ が存在する。[再生性](../../RKHS/RKHS1/index.md#def-rkhs1-reproducing-property)から、任意の $f\in\mathcal H$ と $c\in\mathbb R^n$ に対して

$$
\langle Tf,c\rangle_{\mathbb R^n}
=\sum_{i=1}^nc_if(x_i)
=\left\langle f,\sum_{i=1}^nc_i k(x_i,\cdot)\right\rangle_{\mathcal H}.
$$

よって $T^*c=\sum_i c_i k(x_i,\cdot)$ であり、各成分を評価すれば

$$
(TT^*c)_i=\sum_{j=1}^n k(x_i,x_j)c_j=(Kc)_i,
\qquad TT^*=K.
$$

これは抽象的な関数の問題を行列に移す橋である。**関数の評価ベクトル**は $Tf$、**核切片の係数**は $c$ であり、同じものではない。

例えば有限入力集合上で、特徴写像を

$$
\phi(x_1)=(2,0),\qquad
\phi(x_2)=(0,1),\qquad
\phi(x_3)=(0,0)
$$

とする。$k(x,z)=\phi(x)^{\mathsf T}\phi(z)$ は[特徴写像から作る正半定値核](../../RKHS/RKHS1/index.md#prop-rkhs1-feature-kernel)である。各成分の内積を取ると

$$
K=\operatorname{diag}(4,1,0).
$$

第三入力での関数値は任意の $f$ に対して $0$ である。従って $y=(8,3,5)^{\mathsf T}$ の最初の二成分は再現できても、第三成分の $5$ は再現できない。行列が特異であることは、**どんな応答も補間できるわけではない**という注意を含む。

<a id="def-slt2-07-kernel-interpolation"></a>

<!-- formal-statement-start -->
> **定義（kernel補間可能性と最小ノルム補間）**
> 実数値RKHS $\mathcal H$ と固定入力 $x_1,\ldots,x_n$ に対し、評価写像を $Tf=(f(x_i))_{i=1}^n$ とする。
> 応答 $y\in\mathbb R^n$ について $Tf=y$ を満たす関数が存在するとき、$y$ は **kernel補間可能**という。
> 補間可能な場合、$Tf=y$ を満たす関数のうち $\|f\|_{\mathcal H}$ が最小のものを **最小ノルム補間関数**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-07-kernel-interpolation -->
**定義の確認**。上の $K=\operatorname{diag}(4,1,0)$ について、応答 $y=(8,3,0)^{\mathsf T}$ は補間可能である。実際、係数 $c=(2,3,0)^{\mathsf T}$ で作る関数 $f=T^*c$ は

$$
Tf=Kc=(8,3,0)^{\mathsf T}=y
$$

を満たす。一方、応答 $(8,3,5)^{\mathsf T}$ は、任意の関数の第三訓練点での値が $(Tf)_3=0$ のため補間不能である。

前者の $f$ が最小ノルムであることも、定義から直接確認できる。$T\widetilde f=y$ を満たす任意の別の関数 $\widetilde f$ は $\widetilde f=f+h$、$Th=0$ と書ける。随伴の定義から

$$
\langle f,h\rangle_{\mathcal H}
=\langle T^*c,h\rangle_{\mathcal H}
=c^{\mathsf T}Th=0
$$

だから、

$$
\|\widetilde f\|_{\mathcal H}^2=\|f\|_{\mathcal H}^2+\|h\|_{\mathcal H}^2
=c^{\mathsf T}Kc+\|h\|_{\mathcal H}^2
=25+\|h\|_{\mathcal H}^2\ge25.
$$

等号は $h=0$、すなわち $\widetilde f=f$ のときだけである。補間可能性と最小ノルム性という定義の二条件をともに確認した。
<!-- definition-example-end -->

## 2. 特異なGram行列と最小ノルム解

実対称正半定値行列 $K$ は、正の固有値 $\kappa_1,\ldots,\kappa_r>0$ と、それぞれに対応する直交規格化固有ベクトル $u_1,\ldots,u_r$ を持つ。

ここで $r=\operatorname{rank}K$ とし、同じ固有値が複数回現れるときは**重複度だけ数える**。零固有値に対応する部分空間を $\ker K$ とする。

[固有値分解と擬似逆の既習公式](../SLT2-02/index.md#thm-slt2-02-minimum-norm)と同様に、$K$ の正の固有値だけを反転する行列と、像への直交射影を

$$
K^\dagger=\sum_{j=1}^r\kappa_j^{-1}u_ju_j^{\mathsf T},
\qquad P_K=\sum_{j=1}^ru_ju_j^{\mathsf T}
$$

とする。$r=0$ ではいずれも零行列とする。$P_Ky$ が $y$ のうち核によって表現できる成分である。

<a id="thm-slt2-07-minimum-norm"></a>

<!-- formal-statement-start -->
> **定理（Gram行列による補間判定と最小ノルム解）**
> 実数値RKHS $\mathcal H$、固定入力 $x_1,\ldots,x_n$（$n\ge1$）、評価写像 $T:\mathcal H\to\mathbb R^n$、$K=TT^*$、$y\in\mathbb R^n$ とする。$P_K$ を $\operatorname{ran}K$ への直交射影、$K^\dagger$ をMoore–Penrose擬似逆とする。
>
> **（1）補間の判定。** $Tf=y$ を満たす関数が存在する必要十分条件は $y\in\operatorname{ran}K$、すなわち $P_Ky=y$ である。
>
> **（2）最小ノルム解。** 最小二乗誤差 $\|Tf-y\|_2^2$ を最小にする関数のうち、RKHSノルムが最小の一意な関数は
>
$$
f^\dagger=T^*K^\dagger y
$$
>
> である。$Tf^\dagger=P_Ky$ と $\|f^\dagger\|_{\mathcal H}^2=y^{\mathsf T}K^\dagger y$ を満たす。補間可能な $y$ では最小ノルム補間関数になる。
> **（3）係数の非一意性。** $T^*c=T^*c'$ と $K(c-c')=0$ は同値であり、核切片の係数 $c$ は $K$ が特異なら一般に一意ではない。関数の一意性とは区別する。
<!-- formal-statement-end -->

### 証明の見取り図

$\ker K=\ker T^*$ を内積で確認する。有限次元の直交補空間を取れば $\operatorname{ran}K=\operatorname{ran}T$ が従う。次に関数を $\operatorname{ran}T^*$ と $\ker T$ に直交分解し、訓練値を変えない余分な成分を取り除く。

<!-- proof-start -->
### 証明

$K=TT^*$ だから、任意の $c\in\mathbb R^n$ について

$$
c^{\mathsf T}Kc=\langle T^*c,T^*c\rangle_{\mathcal H}
=\|T^*c\|_{\mathcal H}^2.
$$

$Kc=0$ なら右辺は零で $T^*c=0$、逆に $T^*c=0$ なら $Kc=TT^*c=0$。従って $\ker K=\ker T^*$。有限次元空間 $\mathbb R^n$ では

$$
\operatorname{ran}K=(\ker K)^\perp
=(\ker T^*)^\perp=\operatorname{ran}T.
$$

最後の等号は、$c\perp\operatorname{ran}T$ が $\langle Tf,c\rangle=0$（全 $f$）と同値であり、さらに $T^*c=0$ と同値であることから従う。これが第1項である。

正の固有方向で $KK^\dagger=P_K$ なので

$$
Tf^\dagger=TT^*K^\dagger y=KK^\dagger y=P_Ky.
$$

任意の $f$ に対して $Tf\in\operatorname{ran}K$ だから、$y=P_Ky+(I-P_K)y$ の[直交分解](../../../解析系/F0/F0-02C1A/index.md#thm-f0-02c1a-orthogonal-decomposition)より

$$
\|Tf-y\|_2^2
=\|Tf-P_Ky\|_2^2+\|(I-P_K)y\|_2^2.
$$

従って最小二乗解は $Tf=P_Ky$ を満たす関数に限られる。それらは $f^\dagger+h$、$h\in\ker T$ と書ける。他方、$f^\dagger\in\operatorname{ran}T^*$ であり、

$$
\langle T^*c,h\rangle_{\mathcal H}=\langle c,Th\rangle_{\mathbb R^n}=0
$$

から $\operatorname{ran}T^*\perp\ker T$。よって

$$
\|f^\dagger+h\|_{\mathcal H}^2
=\|f^\dagger\|_{\mathcal H}^2+\|h\|_{\mathcal H}^2,
$$

等号最小は $h=0$ のときだけである。さらに

$$
\|f^\dagger\|_{\mathcal H}^2
=(K^\dagger y)^{\mathsf T}K(K^\dagger y)
=y^{\mathsf T}K^\dagger KK^\dagger y
=y^{\mathsf T}K^\dagger y.
$$

最後の等式は正の固有方向では $\kappa_j^{-1}\kappa_j\kappa_j^{-1}=\kappa_j^{-1}$、零方向ではすべて零であることから分かる。第3項は $\|T^*(c-c')\|^2=(c-c')^{\mathsf T}K(c-c')$ と正半定値性から従う。$\square$
<!-- proof-end -->

特異な $K$ で $Kc=y$ が解ける場合、解の係数は $K^\dagger y+\ker K$ と変わるが、どの係数でも $T^*c$ は同じである。補間不能な $y$ に対しては、補間したと主張せず、$\operatorname{ran}K$ への**最小二乗射影**だと読む。

## 3. kernel ridgeの有効次元

補間は訓練点の観測値を可能な範囲ですべて通す。しかし観測に雑音があるなら、小さい固有値の方向を弱めることに意味がある。[RKHS3の正則化問題](../../RKHS/RKHS3/index.md#def-rkhs3-kernel-ridge-regression)は $\lambda>0$ に対して

$$
\min_{f\in\mathcal H}\left\{\frac1{2n}\|Tf-y\|_2^2+
\frac{\lambda}{2}\|f\|_{\mathcal H}^2\right\}
$$

である。ここでは $\mu=n\lambda>0$ と書くことで損失 $\|Tf-y\|^2/2+\mu\|f\|^2/2$ との対応を固定する。[解公式](../../RKHS/RKHS3/index.md#thm-rkhs3-closed-form)から

$$
f_\mu=T^*(K+\mu I_n)^{-1}y,\qquad
\widehat y_\mu=Tf_\mu=H_\mu y,\qquad
H_\mu=K(K+\mu I_n)^{-1}.
$$

$K+\mu I_n$ は $\mu>0$ により正定値で必ず可逆である。$H_\mu$ は応答 $y$ から訓練点予測への[平滑化行列](../../RKHS/RKHS3/index.md#def-rkhs3-smoother-matrix)である。

<a id="def-slt2-07-effective-dimension"></a>

<!-- formal-statement-start -->
> **定義（kernelの有効次元）**
> 固定入力のGram行列 $K\in\mathbb R^{n\times n}$ が対称正半定値で、$\mu>0$ とする。$H_\mu=K(K+\mu I_n)^{-1}$ に対し
>
$$
d_{\mathrm{eff}}(\mu)=\operatorname{tr}(H_\mu)
$$
>
> を **kernel ridgeの有効次元**という。比較のため $v_{\mathrm{noise}}(\mu)=\operatorname{tr}(H_\mu^2)$ を **単位分散当たりの予測雑音感度**と呼ぶ。前者は通過率の和、後者はその二乗和であり、別の量である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-07-effective-dimension -->
**定義の確認**。$K=\operatorname{diag}(4,1,0)$、$\mu=1$ なら $K+I_3=\operatorname{diag}(5,2,1)$、その逆は $\operatorname{diag}(1/5,1/2,1)$。掛ける順序を守ると

$$
H_1=\operatorname{diag}(4/5,1/2,0),
\quad d_{\mathrm{eff}}(1)=\frac45+\frac12=\frac{13}{10},
$$

$$
v_{\mathrm{noise}}(1)=\frac{16}{25}+\frac14=\frac{89}{100}.
$$

いずれも定義した行列の対角和を直接計算した。階数は2だが、有効次元は $13/10$。零固有方向は有効次元にも雑音感度にも寄与しない。
<!-- definition-example-end -->

<a id="thm-slt2-07-effective-spectrum"></a>

<!-- formal-statement-start -->
> **定理（kernel ridgeの有効次元と重複固有値）**
> $K\in\mathbb R^{n\times n}$ を対称正半定値、階数を $r$、正の固有値を**重複度込みで** $\kappa_1,\ldots,\kappa_r>0$ とする。$\mu>0$ について
>
$$
d_{\mathrm{eff}}(\mu)=\sum_{j=1}^r\frac{\kappa_j}{\kappa_j+\mu},
\qquad
v_{\mathrm{noise}}(\mu)=\sum_{j=1}^r
\left(\frac{\kappa_j}{\kappa_j+\mu}\right)^2.
$$
>
> $0\le v_{\mathrm{noise}}(\mu)\le d_{\mathrm{eff}}(\mu)\le r$ であり、
>
$$
\frac{d}{d\mu}d_{\mathrm{eff}}(\mu)
=-\sum_{j=1}^r\frac{\kappa_j}{(\kappa_j+\mu)^2}\le0,\qquad
\lim_{\mu\downarrow0}d_{\mathrm{eff}}(\mu)=r,\quad
\lim_{\mu\to\infty}d_{\mathrm{eff}}(\mu)=0.
$$
>
> 固有値 $\kappa>0$ の重複度が $m$ ならその固有空間の寄与は $m\kappa/(\kappa+\mu)$。同じ固有空間内で直交基底を取り替えても $H_\mu$ と両方の値は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

固有ベクトルを行列の列として並べれば $H_\mu$ はその基底で対角行列になる。重複固有値では各固有ベクトルそのものではなく、**固有空間への射影**が変わらないことを使う。

<!-- proof-start -->
### 証明

正の固有値に対応する直交規格化固有ベクトルを $u_j$ とし、零固有空間へも直交基底を追加する。正の方向では $(K+\mu I)u_j=(\kappa_j+\mu)u_j$、零方向では $(K+\mu I)u=\mu u$ である。従って

$$
H_\mu=\sum_{j=1}^r
\frac{\kappa_j}{\kappa_j+\mu}u_ju_j^{\mathsf T}.
$$

$\operatorname{tr}(u_ju_j^{\mathsf T})=u_j^{\mathsf T}u_j=1$ なので $d_{\mathrm{eff}}$ の式を得る。また $u_i^{\mathsf T}u_j=\delta_{ij}$ より

$$
H_\mu^2=\sum_{j=1}^r
\left(\frac{\kappa_j}{\kappa_j+\mu}\right)^2u_ju_j^{\mathsf T},
$$

これで $v_{\mathrm{noise}}$ の式も得る。各重み $h_j=\kappa_j/(\kappa_j+\mu)$ は $0<h_j<1$ だから $h_j^2\le h_j\le1$。有限和を項別微分・極限して残りの主張を得る（$r=0$ は空和）。

同じ固有値 $\kappa$ に属する $m$ 次元固有空間 $E_\kappa$ について、直交基底を $u_1,\ldots,u_m$ から別の直交基底 $w_1,\ldots,w_m$ に替えても

$$
P_{E_\kappa}
=\sum_{j=1}^mu_ju_j^{\mathsf T}
=\sum_{j=1}^mw_jw_j^{\mathsf T}.
$$

実際、どちらも任意の $z$ の $E_\kappa$ への直交射影を与える。従って $E_\kappa$ 上で $H_\mu$ は $(\kappa/(\kappa+\mu))P_{E_\kappa}$ となり、この固有空間から有効次元へ加わる値は $m\kappa/(\kappa+\mu)$ である。これは基底の選び方に依存しない。$\square$
<!-- proof-end -->

例えば $K=\operatorname{diag}(2,2,0)$ と $\mu=2$ では、正固有値 $2$ は重複度2だから $H_2=\operatorname{diag}(1/2,1/2,0)$、$d_{\mathrm{eff}}(2)=1$、$v_{\mathrm{noise}}(2)=1/2$。二つの正固有方向の基底を回転させても値は変わらない。反対に同じ固有値を一回だけ数えると、誤って $1/2$ としてしまう。

## 4. RKHSの勾配流を有限標本で解く

正則化係数 $\mu$ を選ぶ代わりに、関数を時間とともに少しずつ学習させる。[線形模型の勾配流](../SLT2-06/index.md#def-slt2-06-early-stopping-filter)に対応するが、ここでは未知数は係数ベクトルではなくRKHSの関数そのものである。

$L(f)=\|Tf-y\|_2^2/2$ とおく。方向 $h\in\mathcal H$ と実数の摂動パラメータ $\eta$ を用い、$f$ を $f+\eta h$ と変えると

$$
\left.\frac{d}{d\eta}L(f+\eta h)\right|_{\eta=0}
=\langle Tf-y,Th\rangle_{\mathbb R^n}
=\langle T^*(Tf-y),h\rangle_{\mathcal H}.
$$

よってHilbert空間の勾配は $\nabla L(f)=T^*(Tf-y)$ である。ここで $\eta$ は関数を変化させる方向の大きさで、$d/d\eta$ はその一変数微分である。

一方、これからの $t\ge0$ は学習の時間であり、$\dot f_t=df_t/dt$ は $\mathcal H$ 値の時間微分を表す。後で用いる訓練点予測は $g_t=Tf_t$ である。

[点評価の有界性](../../RKHS/RKHS1/index.md#cor-rkhs1-evaluation-bound)により、固定した有限個の入力での評価写像 $T$ はノルムに関して連続である。実数の時間増分 $\delta$（$t=0$ では右から）を用い、時間微分の定義で $T$ を極限の外へ出せば、

$$
\dot g_t=\frac{dg_t}{dt}
=\lim_{\delta\to0}T\frac{f_{t+\delta}-f_t}{\delta}
=T\dot f_t
$$

となる。ここでは $1/n$ の規格化を使わず、時間 $t$ は $L$ のこの定義に対応させる。

<a id="def-slt2-07-kernel-flow"></a>

<!-- formal-statement-start -->
> **定義（RKHSの核勾配流）**
> 実数値RKHS $\mathcal H$、固定入力による有界評価写像 $T:\mathcal H\to\mathbb R^n$、固定応答 $y\in\mathbb R^n$ に対し、$L(f)=\|Tf-y\|_2^2/2$ の **零初期値の核勾配流**とは
>
$$
\dot f_t=-T^*(Tf_t-y),\qquad f_0=0,\quad t\ge0
$$
>
> を満たす $\mathcal H$ 値の微分可能な関数族である。訓練点予測を $g_t=Tf_t\in\mathbb R^n$ と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt2-07-kernel-flow -->
**定義の確認**。一つの入力 $x$、$k(x,x)=1$、応答 $y=(2)$ とする。核切片 $k(x,\cdot)$ のノルムは1なので、関数を $f_t=a(t)k(x,\cdot)$ と置くと、

$$
Tf_t=(a(t)),\qquad
T^*(Tf_t-y)=(a(t)-2)k(x,\cdot)
$$

となる。ここで $\dot a=da/dt$ は係数の時間微分である。定義の方程式と初期値は

$$
\dot a=2-a,\qquad a(0)=0
$$

へ帰着する。$a(t)=2(1-e^{-t})$ は $\dot a=2e^{-t}=2-a(t)$ と初期値を直接満たし、$g_t=(2(1-e^{-t}))$ となる。
<!-- definition-example-end -->

<a id="thm-slt2-07-kernel-flow-spectrum"></a>

<!-- formal-statement-start -->
> **定理（核勾配流のスペクトル解とridge比較）**
> 実数値RKHS $\mathcal H$ と固定入力 $x_1,\ldots,x_n$、$y\in\mathbb R^n$、評価写像 $T$、$K=TT^*$ を考える。$r=\operatorname{rank}K$ とし、$K$ の正の固有値と直交規格化固有ベクトルを $(\kappa_j,u_j)$（$j=1,\ldots,r$、重複度込み）とする。零初期値の核勾配流には一意の解があり、各 $t\ge0$ で
>
$$
g_t=\sum_{j=1}^r(1-e^{-t\kappa_j})
(u_j^{\mathsf T}y)u_j,\qquad
f_t=T^*\sum_{j=1}^r\frac{1-e^{-t\kappa_j}}{\kappa_j}
(u_j^{\mathsf T}y)u_j.
$$
>
> 従って $g_t=H_ty$ と書け、平滑化行列と有効次元は
>
$$
H_t=\sum_{j=1}^r(1-e^{-t\kappa_j})u_ju_j^{\mathsf T},
\qquad
d_{\mathrm{eff}}^{\mathrm{flow}}(t)=\operatorname{tr}H_t
=\sum_{j=1}^r(1-e^{-t\kappa_j}).
$$
>
> この有効次元は $0$ から $r$ へ単調非減少に変化する。$t\to\infty$ では $g_t\to P_Ky$、$f_t\to f^\dagger$。
>
> $t>0$、kernel ridgeの $\mu=1/t$ を対応させたとき、正の各固有値 $\kappa$ で
>
$$
\frac{\kappa}{\kappa+1/t}\le1-e^{-t\kappa}
\le\frac{2\kappa}{\kappa+1/t}.
$$
>
> 零固有方向の通過率は両方法とも零だが、正固有方向の通過率は一般に一致しない。
<!-- formal-statement-end -->

### 証明の見取り図

関数の方程式へ $T$ を掛けると、有限次元で閉じた $g_t$ の方程式になる。固有方向ごとの一次方程式を解き、その解を $T^*$ で関数へ戻す。

<!-- proof-start -->
### 証明

定義の方程式に $T$ を掛け、$TT^*=K$ と $g_t=Tf_t$ を使えば

$$
\dot g_t=-K(g_t-y),\qquad g_0=0.
$$

$u_j$ の方向の係数を $b_j(t)=u_j^{\mathsf T}g_t$、応答係数を $a_j=u_j^{\mathsf T}y$ と置くと

$$
\dot b_j(t)=-\kappa_j(b_j(t)-a_j),\qquad b_j(0)=0.
$$

$\kappa_j>0$ なら積分因子 $e^{t\kappa_j}$ により

$$
\frac{d}{dt}(e^{t\kappa_j}b_j(t))
=\kappa_ja_je^{t\kappa_j},\qquad
b_j(t)=a_j(1-e^{-t\kappa_j}).
$$

零固有方向では $\dot b=0$ と $b(0)=0$ より常に零となる。これが $g_t$ の式である。一方、提示した $f_t$ を微分すると

$$
\dot f_t=T^*\sum_{j=1}^re^{-t\kappa_j}
(u_j^{\mathsf T}y)u_j
=T^*(y-g_t)
$$

を得る。最後の等号では $y-g_t$ の零固有方向成分が $T^*$ によって消えることを $\ker K=\ker T^*$ から用いた。さらに $f_0=0$、$Tf_t=g_t$ であるから、関数の方程式そのものも満たす。二解の差 $h_t$ があれば

$$
\frac{d}{dt}\frac12\|h_t\|_{\mathcal H}^2
=-\|Th_t\|_2^2\le0,\qquad h_0=0
$$

なので差は恒等的に零で一意である。各正固有値について $1-e^{-t\kappa_j}$ は0から1へ増えるため有効次元は単調非減少で、有限和の項別極限と[Gram行列による最小ノルム解](#thm-slt2-07-minimum-norm)が極限を与える。

最後の比較は $z=t\kappa>0$ と置き、

$$
\frac{z}{1+z}\le1-e^{-z}\le\frac{2z}{1+z}
$$

を使えばよい。下側は $e^z\ge1+z$ の逆数から従う。上側は $0<z\le1$ なら

$$
1-e^{-z}\le z\le\frac{2z}{1+z}
$$

であり、$z\ge1$ なら

$$
1-e^{-z}\le1\le\frac{2z}{1+z}
$$

である。これは[前章のスペクトル比較](../SLT2-06/index.md#thm-slt2-06-ridge-comparison)の $s^2$ を $\kappa$ に読み替えたものである。$\square$
<!-- proof-end -->

注意したいのは、関数を係数表示 $f_t=T^*c_t$ と書き、$c_0=0$、$\dot c_t=y-Kc_t$ と選んだ場合である。単位ベクトル $u\in\ker K$ に射影すると、対称性により $u^{\mathsf T}K=0$ なので

$$
\frac{d}{dt}(u^{\mathsf T}c_t)=u^{\mathsf T}y,
\qquad u^{\mathsf T}c_t=t\,u^{\mathsf T}y.
$$

従って零固有方向の応答成分は係数内で時間に比例して増え得る。しかし[核方向の係数は関数から消える](#thm-slt2-07-minimum-norm)ため、**係数が発散しても関数と予測は変わらない**。定理の表示では核方向の係数を常に零としている。

## 5. 有効次元と偏り・分散は別の量

有効次元が小さいほど、通す方向が少ないことは分かった。ではそれが直接、期待二乗誤差の雑音項になるだろうか。答えは否である。雑音の二乗誤差には固有方向の通過率の**二乗**が現れる。

入力と $K$ を固定し、観測応答だけを確率的にする。訓練点上の雑音を含まない平均信号を $m\in\mathbb R^n$、雑音を $\varepsilon\in\mathbb R^n$ とし、

$$
Y=m+\varepsilon,\qquad E\varepsilon=0,\qquad
\operatorname{Cov}(\varepsilon)=\tau^2I_n,\quad \tau^2\ge0
$$

とする。ここでは $m$ が $\operatorname{ran}K$ に属するとは限らず、表現不能な成分も明示する。雑音の正規性と成分独立性は不要である。$\mu>0$ または $t\ge0$ は**観測 $Y$ を見る前に決めた値**とする。

<a id="thm-slt2-07-fixed-risk"></a>

<!-- formal-statement-start -->
> **定理（固定設計のkernel偏り分散分解）**
> 対称正半定値 $K\in\mathbb R^{n\times n}$ を固定する。平均信号を $m\in\mathbb R^n$、雑音を $\varepsilon$ とし、$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=\tau^2I_n$（$\tau^2\ge0$）の下で $Y=m+\varepsilon$ を考える。
>
> $r=\operatorname{rank}K$ として、正固有値・直交規格化固有ベクトルを $(\kappa_j,u_j)$（$j=1,\ldots,r$）とする。$\operatorname{ran}K$ への直交射影を $P_K$、零固有空間への直交射影を $P_0=I-P_K$、信号係数を $a_j=u_j^{\mathsf T}m$ とする。応答に依存せず固定した対称平滑化行列
>
$$
H=\sum_{j=1}^rh_ju_ju_j^{\mathsf T},
\qquad 0\le h_j\le1
$$
>
> （零固有方向の通過率は0）による訓練点信号予測 $HY$ は
>
$$
E_\varepsilon\|HY-m\|_2^2
=\|P_0m\|_2^2+
\sum_{j=1}^r(1-h_j)^2a_j^2+
\tau^2\sum_{j=1}^rh_j^2.
$$
>
> kernel ridgeでは $h_j=\kappa_j/(\kappa_j+\mu)$、零初期値の核勾配流では $h_j=1-e^{-t\kappa_j}$ である。右辺は**固定された訓練入力における平均信号への二乗誤差の期待値**であり、新規入力分布に対する汎化リスクそのものではない。
<!-- formal-statement-end -->

### 証明の見取り図

$HY-m$ を信号の偏りと観測雑音に分ける。直交固有方向で展開したあと、各雑音係数の平均零と分散 $\tau^2$ だけを使う。

<!-- proof-start -->
### 証明

$m=P_0m+\sum_{j=1}^ra_ju_j$、$HY=H(m+\varepsilon)$ だから

$$
HY-m=-P_0m+\sum_{j=1}^r
\left[(h_j-1)a_j+h_j u_j^{\mathsf T}\varepsilon\right]u_j.
$$

$P_0m$ と $u_j$、さらに異なる $u_i,u_j$ は直交する。従ってこの二乗ノルムは核項の二乗と、各括弧の二乗の和となる。平均零から

$$
E(u_j^{\mathsf T}\varepsilon)=0,\qquad
E(u_j^{\mathsf T}\varepsilon)^2
=u_j^{\mathsf T}\operatorname{Cov}(\varepsilon)u_j
=\tau^2u_j^{\mathsf T}u_j=\tau^2.
$$

各括弧を展開した交差項の期待値は $2(h_j-1)a_jh_j E(u_j^{\mathsf T}\varepsilon)=0$。そのため

$$
E\left[(h_j-1)a_j+h_j u_j^{\mathsf T}\varepsilon\right]^2
=(1-h_j)^2a_j^2+\tau^2h_j^2.
$$

有限個の和であるから期待値と和を交換でき、公式を得る。$\square$
<!-- proof-end -->

例えば $K=\operatorname{diag}(4,1,0)$、$\mu=1$、$m=(4,2,0)^{\mathsf T}$、$\tau^2=1$ なら、核方向の偏りは零で、平方偏りは

$$
\left(\frac15\cdot4\right)^2+
\left(\frac12\cdot2\right)^2
=\frac{16}{25}+1=\frac{41}{25}.
$$

雑音寄与は $v_{\mathrm{noise}}(1)=89/100$ なので、リスクは $41/25+89/100=253/100$ となる。有効次元 $13/10$ を雑音分散と取り違えると $294/100$ という誤値になる。

この定理では平滑化行列を**固定**した。応答を見て $\mu(Y)$ や停止時刻 $t(Y)$ を選ぶと、$H$ が雑音に依存するため $E[u_j^{\mathsf T}\varepsilon]=0$ だけでは交差項が消えない。

さらに訓練点外の入力 $x$ については、[核ベクトル](../../RKHS/RKHS3/index.md#def-rkhs3-kernel-vector)と新規点予測を

$$
k_x=(k(x_1,x),\ldots,k(x_n,x))^{\mathsf T},
\qquad f_\mu(x)=k_x^{\mathsf T}(K+\mu I)^{-1}Y
$$

と表せる。ただし、その期待誤差を保証するには入力分布、真の回帰関数、損失などの条件が必要である。

次章のニューラルネット線形化では、この $K$ が訓練中も固定とみなせる条件を改めて問う。**有限標本のkernel法が解けること**と、任意のニューラルネットが固定kernel法になることは別の主張である。

## 演習

### SLT2-07-A01 特徴写像からGram行列と補間関数を作る
- Level: A
- 目安時間: 12分

三つの入力の特徴写像を $\phi(x_1)=\phi(x_2)=(1,0)^{\mathsf T}$、$\phi(x_3)=(0,2)^{\mathsf T}$ とし、$k(x,z)=\phi(x)^{\mathsf T}\phi(z)$ とする。$y=(1,1,2)^{\mathsf T}$ に対し、Gram行列、$Kc=y$ の一つの解、補間関数のRKHSノルム二乗を求めよ。

<!-- solution-start -->
#### 詳細解答

特徴の内積を取ると

$$
K=\begin{pmatrix}1&1&0\\1&1&0\\0&0&4\end{pmatrix}.
$$

$c=(1/2,1/2,1/2)^{\mathsf T}$ は $Kc=(1,1,2)^{\mathsf T}=y$ を満たす。従って $f=T^*c$ は補間関数である。[Gram行列による補間判定と最小ノルム解](#thm-slt2-07-minimum-norm)からその関数は最小ノルムであり、

$$
\|f\|_{\mathcal H}^2=c^{\mathsf T}Kc
=c^{\mathsf T}y=\frac12+\frac12+1=2.
$$

特徴空間では係数を合計した重み $w=\sum_ic_i\phi(x_i)=(1,1)^{\mathsf T}$ で、$\|w\|_2^2=2$ とも確認できる。$c+(a,-a,0)^{\mathsf T}$ は同じ関数を与え、係数だけは一意でない。
<!-- solution-end -->

### SLT2-07-A02 補間不可能な方向
- Level: A
- 目安時間: 10分

$K=\operatorname{diag}(2,0)$、$y=(2,3)^{\mathsf T}$ とする。補間可能か判定し、最小ノルムの最小二乗関数の係数 $c=K^\dagger y$、訓練点予測、RKHSノルム二乗を求めよ。

<!-- solution-start -->
#### 詳細解答

[Gram行列による補間判定](#thm-slt2-07-minimum-norm)を使う。$\operatorname{ran}K=\{(a,0)^{\mathsf T}:a\in\mathbb R\}$ だから $y$ は像に属さず補間不可能である。擬似逆と射影は

$$
K^\dagger=\operatorname{diag}(1/2,0),\quad
c=(1,0)^{\mathsf T},\quad
P_Ky=(2,0)^{\mathsf T}.
$$

ノルム二乗は $y^{\mathsf T}K^\dagger y=(2,3)\cdot(1,0)=2$。残差は $(0,3)^{\mathsf T}$ で、これを零にはできない。$K$ の零固有方向にある応答の成分はどの関数にも見えない。
<!-- solution-end -->

### SLT2-07-A03 有効次元と雑音感度
- Level: A
- 目安時間: 10分

$K=\operatorname{diag}(4,1,0)$、$\mu=1$、$y=(5,2,7)^{\mathsf T}$ とする。$H_\mu y$、$d_{\mathrm{eff}}(\mu)$、$v_{\mathrm{noise}}(\mu)$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

[kernelの有効次元](#def-slt2-07-effective-dimension)の定義を用いる。$K+\mu I=\operatorname{diag}(5,2,1)$ より $H_1=\operatorname{diag}(4/5,1/2,0)$。従って

$$
H_1y=(4,1,0)^{\mathsf T},\quad
d_{\mathrm{eff}}(1)=\frac45+\frac12=\frac{13}{10}.
$$

二乗行列は $H_1^2=\operatorname{diag}(16/25,1/4,0)$ だから

$$
v_{\mathrm{noise}}(1)=\frac{16}{25}+\frac14=\frac{89}{100}.
$$

有効次元は通過率、雑音感度は通過率の二乗を足すため一致しない。
<!-- solution-end -->

### SLT2-07-A04 零固有値をもつ核勾配流
- Level: A
- 目安時間: 12分

$K=\operatorname{diag}(1,1,0)$、$y=(2,-2,3)^{\mathsf T}$ とする。零初期値の核勾配流の $t=\log2$ での訓練点予測、残差 $y-g_t$、有効次元を求めよ。

<!-- solution-start -->
#### 詳細解答

[核勾配流のスペクトル解](#thm-slt2-07-kernel-flow-spectrum)を適用する。正固有値は $1,1$ だから、それぞれの通過率は $1-e^{-\log2}=1/2$。零固有値の通過率は零なので、

$$
g_{\log2}=(1,-1,0)^{\mathsf T},\quad
y-g_{\log2}=(1,-1,3)^{\mathsf T}.
$$

有効次元は $1/2+1/2=1$。第三方向は時間を延ばしても学習できず、$t\to\infty$ でも残差 $(0,0,3)^{\mathsf T}$ が残る。
<!-- solution-end -->

### SLT2-07-A05 重複固有値を数える
- Level: A
- 目安時間: 10分

$K=2I_2$、$\mu=2$ とする。$H_\mu$、有効次元、雑音感度を求め、二次元空間の直交基底を回転させても値が変わらない理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

[有効次元の定義](#def-slt2-07-effective-dimension)を適用する。$K+\mu I=4I_2$ なので $H_\mu=2I_2(4I_2)^{-1}=I_2/2$。よって

$$
d_{\mathrm{eff}}=2\cdot\frac12=1,\qquad
v_{\mathrm{noise}}=2\cdot\left(\frac12\right)^2=\frac12.
$$

直交行列 $Q$ で基底を替えても $Q^{\mathsf T}H_\mu Q=I_2/2$ である。同じ正固有値2を「異なる値として一種類」だけ数えるのではなく、重複度2として二度数える。
<!-- solution-end -->

### SLT2-07-B01 定数核で補間の可否を証明する
- Level: B
- 目安時間: 20分

二つの入力の Gram行列が $K=\begin{pmatrix}1&1\\1&1\end{pmatrix}$ である。$y^{(1)}=(1,-1)^{\mathsf T}$ と $y^{(2)}=(2,2)^{\mathsf T}$ のそれぞれについて補間可否を判定し、最小ノルム関数の訓練点予測、係数とノルム二乗を求めよ。係数の非一意性も確認せよ。

<!-- solution-start -->
#### 詳細解答

[Gram行列による補間判定と最小ノルム解](#thm-slt2-07-minimum-norm)を用いる。$u=(1,1)^{\mathsf T}/\sqrt2$ に沿う固有値は2、$v=(1,-1)^{\mathsf T}/\sqrt2$ に沿う固有値は0だから

$$
P_K=uu^{\mathsf T}=\frac12K,\qquad
K^\dagger=\frac12uu^{\mathsf T}=\frac14K.
$$

$y^{(1)}=\sqrt2v$ は $\ker K$ にあり、$P_Ky^{(1)}=0$。よって補間不能で、$c^{(1)}=K^\dagger y^{(1)}=0$、最小ノルム関数は零関数、ノルム二乗0である。

$y^{(2)}=2\sqrt2u$ は $\operatorname{ran}K$ にあり、$c^{(2)}=K^\dagger y^{(2)}=(1,1)^{\mathsf T}$、$Kc^{(2)}=y^{(2)}$。ノルム二乗は

$$
(y^{(2)})^{\mathsf T}K^\dagger y^{(2)}
=(2,2)\cdot(1,1)=4.
$$

任意の $a\in\mathbb R$ に対し $K(1+a,1-a)^{\mathsf T}=y^{(2)}$ なので係数は非一意だが、核方向 $(a,-a)$ による関数は零であり、補間関数は同一である。
<!-- solution-end -->

### SLT2-07-B02 正則化と重複固有値の微分
- Level: B
- 目安時間: 18分

$K=\operatorname{diag}(4,4,0)$、$\mu>0$ とする。$d_{\mathrm{eff}}(\mu)$ とその導関数を定義から求め、$\mu=4$ での有効次元、雑音感度、導関数を計算せよ。$\mu\downarrow0$ と $\mu\to\infty$ の極限も説明せよ。

<!-- solution-start -->
#### 詳細解答

[有効次元の定義](#def-slt2-07-effective-dimension)から $H_\mu=\operatorname{diag}(4/(4+\mu),4/(4+\mu),0)$ なので

$$
d_{\mathrm{eff}}(\mu)=\frac8{4+\mu},\qquad
\frac{d}{d\mu}d_{\mathrm{eff}}(\mu)
=-\frac8{(4+\mu)^2}.
$$

$\mu=4$ では各正方向の通過率が $1/2$ だから

$$
d_{\mathrm{eff}}(4)=1,\quad
v_{\mathrm{noise}}(4)=2\left(\frac12\right)^2=\frac12,\quad
d_{\mathrm{eff}}'(4)=-\frac8{64}=-\frac18.
$$

$\mu\downarrow0$ では $d_{\mathrm{eff}}\to8/4=2=\operatorname{rank}K$、$\mu\to\infty$ では0。零固有値を誤って $0/(0+\mu)$ 以外の値で数えない。
<!-- solution-end -->

### SLT2-07-B03 核勾配流とridgeは同じではない
- Level: B
- 目安時間: 20分

正固有値 $\kappa>0$ と $t>0$ を固定し、$\mu=1/t$ とする。核勾配流の通過率 $1-e^{-t\kappa}$ とkernel ridgeの通過率 $\kappa/(\kappa+\mu)$ を比較する二側不等式を証明せよ。$K=\operatorname{diag}(1,4)$、$t=1$ では二つの平滑化行列が等しくならないことを示せ。

<!-- solution-start -->
#### 詳細解答

$z=t\kappa>0$ と置くとridgeの通過率は $z/(1+z)$。$e^z\ge1+z$ の逆数により

$$
1-e^{-z}\ge1-\frac1{1+z}=\frac z{1+z}.
$$

上側は $0<z\le1$ なら $1-e^{-z}\le z\le2z/(1+z)$、$z\ge1$ なら $1-e^{-z}\le1\le2z/(1+z)$。従って

$$
\frac{\kappa}{\kappa+1/t}\le1-e^{-t\kappa}
\le\frac{2\kappa}{\kappa+1/t}.
$$

$K=\operatorname{diag}(1,4)$ の $t=1$ では $H_t=\operatorname{diag}(1-e^{-1},1-e^{-4})$、ridgeの $\mu=1$ では $H_\mu=\operatorname{diag}(1/2,4/5)$。$e>2$ なので $1-e^{-1}>1/2$、また $e^4>5$ なので $1-e^{-4}>4/5$。二つの行列は一致しない。
<!-- solution-end -->

### SLT2-07-B04 表現不能な信号を含む偏り分散
- Level: B
- 目安時間: 22分

固定Gram行列 $K=\operatorname{diag}(2,1,0)$、真の訓練点平均 $m=(2,1,3)^{\mathsf T}$、観測 $Y=m+\varepsilon$（$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=I_3$）を考える。$\mu=1$ を事前に固定したkernel ridgeの期待信号予測二乗誤差を、零固有方向の偏り、正固有方向の偏り、雑音分散に分けて求めよ。$\mu\downarrow0$ の極限とも比較せよ。

<!-- solution-start -->
#### 詳細解答

[固定設計の偏り分散分解](#thm-slt2-07-fixed-risk)を適用する。$H_1=\operatorname{diag}(2/3,1/2,0)$ である。零固有方向の信号 $(0,0,3)^{\mathsf T}$ は学習できず偏り二乗は9。正方向の平均信号への偏りは

$$
(H_1-I)m=(-2/3,-1/2,-3)^{\mathsf T},
$$

なので正方向だけの平方偏りは $4/9+1/4=25/36$。雑音分散は $1\cdot[(2/3)^2+(1/2)^2]=25/36$。合計は

$$
9+\frac{25}{36}+\frac{25}{36}
=9+\frac{25}{18}=\frac{187}{18}.
$$

$\mu\downarrow0$ では正方向の偏りは0に近づくが、雑音通過率はどちらも1へ近づく。零方向の偏り9は残るのでリスク極限は $9+2=11$。したがってこの例では $\mu=1$ のリスク $187/18<11$ が、無正則化極限より小さい。
<!-- solution-end -->

### SLT2-07-C01 補間・ridge・核勾配流・リスクの統合
- Level: C
- 目安時間: 35分

固定入力のGram行列 $K=\operatorname{diag}(4,1,0)$ をもつRKHSを考える。観測応答の一実現値を $y=(8,3,5)^{\mathsf T}$ とする。

1. $y$ が補間可能か判定し、最小ノルム最小二乗関数 $f^\dagger=T^*K^\dagger y$ の訓練点予測とノルム二乗を求めよ。
2. $\mu=1$ のkernel ridgeの訓練点予測、有効次元、雑音感度を求めよ。
3. 零初期値の核勾配流を $t=\log2$ で止めた訓練点予測と有効次元を求めよ。核方向が学習されない理由も示せ。
4. 別の確率模型として平均信号 $m=(4,2,0)^{\mathsf T}$、$Y=m+\varepsilon$、$E\varepsilon=0$、$\operatorname{Cov}(\varepsilon)=I_3$ を考える。$\mu=1$ と $t=\log2$ をそれぞれ事前に固定して、両推定量の訓練点信号への期待二乗誤差を偏りと分散に分解して比較せよ。

<!-- solution-start -->
#### 詳細解答

**1.** $\operatorname{ran}K$ は第三成分が零のベクトル全体であり、$y_3=5$ なので補間不能である。[Gram行列による補間判定と最小ノルム解](#thm-slt2-07-minimum-norm)より

$$
K^\dagger=\operatorname{diag}(1/4,1,0),\qquad
K^\dagger y=(2,3,0)^{\mathsf T}.
$$

従って訓練点予測は $P_Ky=(8,3,0)^{\mathsf T}$、ノルム二乗は

$$
y^{\mathsf T}K^\dagger y=8\cdot2+3\cdot3=25.
$$

係数の第三成分は関数に寄与しない。これは補間ではなく最小二乗射影である。

**2.** $K+I=\operatorname{diag}(5,2,1)$ として

$$
H_1=\operatorname{diag}(4/5,1/2,0),\quad
H_1y=(32/5,3/2,0)^{\mathsf T}.
$$

その対角和と二乗の対角和から

$$
d_{\mathrm{eff}}(1)=\frac{13}{10},\qquad
v_{\mathrm{noise}}(1)=\frac{89}{100}.
$$

**3.** $e^{-4\log2}=1/16$、$e^{-\log2}=1/2$ なので、[核勾配流の解](#thm-slt2-07-kernel-flow-spectrum)から

$$
H_{\log2}=\operatorname{diag}(15/16,1/2,0),
\quad g_{\log2}=(15/2,3/2,0)^{\mathsf T},
$$

$$
d_{\mathrm{eff}}^{\mathrm{flow}}(\log2)
=\frac{15}{16}+\frac12=\frac{23}{16}.
$$

$\ker K$ 上の流れは $\dot g=0$、初期値は零であり、第三成分はどの時刻にも現れない。

**4.** 確率模型の平均信号は第1・第2方向にあり核成分は零。[偏り分散分解](#thm-slt2-07-fixed-risk)にridgeの通過率 $4/5,1/2$ を代入すると偏り二乗は

$$
\left(\frac15\cdot4\right)^2+
\left(\frac12\cdot2\right)^2
=\frac{16}{25}+1=\frac{41}{25};
$$

分散は $16/25+1/4=89/100$。合計は $253/100$ である。

勾配流では通過率 $15/16,1/2$ だから、偏り二乗は

$$
\left(\frac1{16}\cdot4\right)^2+
\left(\frac12\cdot2\right)^2
=\frac1{16}+1=\frac{17}{16}=\frac{272}{256},
$$

分散は $(15/16)^2+(1/2)^2=225/256+64/256=289/256$。合計は

$$
\frac{272}{256}+\frac{289}{256}=\frac{561}{256}.
$$

$561/256<253/100$ は $56100<64768$ で検算できる。この特定の信号・雑音・パラメータでは核勾配流のリスクが小さいが、任意の分布やパラメータで常に優れるという主張ではない。どちらも**固定訓練点の信号予測**の比較である。
<!-- solution-end -->

## 章末チェック

- $Tf=y$ を解ける条件と、$K$ が可逆である条件を混同していないか。
- 重複固有値は重複度込みで数え、零固有方向は射影で分けられるか。
- 有効次元 $\operatorname{tr}H$ と予測雑音感度 $\operatorname{tr}H^2$ を使い分けられるか。
- $\mu=n\lambda$ と時間 $t$ の損失正規化を確認できるか。
- ここで導いたリスクが新入力の汎化リスクではない理由を説明できるか。
