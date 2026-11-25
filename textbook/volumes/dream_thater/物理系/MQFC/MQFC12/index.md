# MQFC12 質量ギャップと指数的相関減衰

[MQFC11](../MQFC11/index.md) では一つの場の二点量から、その場が真空から作るベクトルのエネルギーの重みを読んだ。しかし、その場が検出できない励起ベクトルにも低いエネルギーがあるかもしれない。今回は Hilbert 空間全体について、真空直交方向のエネルギーに正の下限があることと、Euclid 時間相関が速く減衰することを結び付ける。

直接の前提は [MQFC9](../MQFC9/index.md)、[MQFC10](../MQFC10/index.md)、[MQFC11](../MQFC11/index.md)、[QM6](../../../解析系/QM/QM6/index.md) とする。自然単位系、内積は第2引数線形とする。ここで扱うのは構成された理論のハミルトニアンについての判定であって、四次元 Yang–Mills 理論の存在そのものの証明ではない。

## 1. 真空と励起ベクトルの間に隙間を作る

[自己共役縮小半群の非負生成作用素](../MQFC9/index.md#thm-mqfc9-hamiltonian) により、Euclid 時間の並進を $T(t)=e^{-tH}$ と書ける。ここでは Hilbert 空間 $\mathcal H$ 上の非負自己共役作用素 $H$ と単位ベクトル $\Omega$ を持ち、$\Omega\in D(H)$、$H\Omega=0$ と仮定する。これは真空エネルギーを零とした設定である。

真空方向への直交射影を $P_0v=\Omega\langle\Omega,v\rangle$、その補射影を $Q=I-P_0$ とする。真空と直交する空間を $\mathcal K=Q\mathcal H$ と書く。$E_H$ は [射影値測度](../../../解析系/QM/QM3/index.md#def-qm3-pvm) で、Borel 集合 $B$ に属するエネルギー成分を取り出す直交射影 $E_H(B)$ を与える。

[非有界自己共役作用素のスペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) から

$$
\|H\Omega\|^2=\int_{[0,\infty)}\lambda^2\,d\langle\Omega,E_H(\lambda)\Omega\rangle=0.
$$

よって $\Omega$ の測度は零以外に重みを持たない。実際、$[\epsilon,\infty)$ 上で $\lambda^2\ge\epsilon^2$ なので、その集合の測度は零であり、$\epsilon=1/n$ として和集合を取れる。従って任意の $B$ について $E_H(B)\Omega=\mathbf 1_B(0)\Omega$ である（射影の像の長さの二乗が測度の値に等しいため）。

自己共役性から $\langle\Omega,E_H(B)v\rangle=\mathbf 1_B(0)\langle\Omega,v\rangle$。従って $E_H(B)$ は $\mathcal K$ を保ち、$Q$ と可換である。制限 $H_{\mathcal K}$ は $D(H)\cap\mathcal K$ 上の自己共役作用素となる。実際、制限した射影値測度によるスペクトル積分の定義域はまさに $D(H)\cap\mathcal K$ であり、[スペクトル積分の自己共役性](../../../解析系/QM/QM6/index.md#thm-qm6-spectral-integral-self-adjoint) を適用できる。

零より大きい固有値だけを数えるのでは足りない。連続スペクトルも含め、真空方向以外に零の近くのエネルギーがないことを要求する。

<a id="def-mqfc12-gap"></a>

<!-- formal-statement-start -->
> **定義（真空直交補空間の質量ギャップ）**
> 非負自己共役作用素 $H$ と単位真空 $\Omega\in D(H)$、$H\Omega=0$ を持つ Hilbert 空間を考える。$\mathcal K=\Omega^\perp\ne\{0\}$ とする。ある $\Delta>0$ が
>
$$
E_H([0,\Delta))Q=0
$$
>
> を満たすとき、真空に対して幅 $\Delta$ のギャップがあるという。最大の幅は $\inf\sigma(H_{\mathcal K})$ である。ここで $\sigma$ は作用素のスペクトルを表す。
<!-- formal-statement-end -->

この定義は $\ker H=\mathbb C\Omega$ も要求する。もし $\Omega$ に直交する零固有ベクトルがあれば左辺がそのベクトルを保つからである。逆に真空の一意性だけでは正の下限は保証されない。相対論的理論ではエネルギーの下限と不変質量の関係も問題になるが、この講義ではまずハミルトニアンのギャップとして定式化する。

<!-- definition-example-start: def-mqfc12-gap -->
### 直接例：三準位系

$\mathcal H=\mathbb C^3$、標準正規直交基底を $e_0,e_1,e_2$、$H=\operatorname{diag}(0,2,5)$、$\Omega=e_0$ とする。実対角行列なので自己共役であり、$\langle v,Hv\rangle=2|v_1|^2+5|v_2|^2\ge0$。真空は単位ベクトルで $H\Omega=0$、補空間は $\operatorname{span}(e_1,e_2)$ で非零である。

**定義の確認**：エネルギーの集合 $[0,2)$ に含まれる固有値は零だけなので、$E_H([0,2))=P_0$。$P_0Q=0$ から定義が満たされる。$\Delta>2$ なら $E_H([0,\Delta))Qe_1=e_1\ne0$。従って最大幅は2である。このように固有値の検査が定義の射影の条件に結び付くのは、正規直交固有基底が存在し、射影が該当する固有方向を選ぶためである。
<!-- definition-example-end -->

スペクトル定理では $\mathcal K$ 上のスペクトルは制限された射影値測度の台である。従って $[0,\Delta)$ 上の射影が零であることと $\sigma(H_{\mathcal K})\subset[\Delta,\infty)$ は同値である。

## 2. 連結 Euclid 時間相関を正の積分にする

観測量を真空に作用させてできたベクトルを $v$ とする。観測量が非有界であっても、$v$ が Hilbert 空間の元として定義されていれば以下の計算には十分である。真空の寄与を除いた相関を連結 Euclid 時間相関と呼ぶ。一般の二つのベクトル $v,w$ に対して

$$
C_{v,w}(t)=\langle v,T(t)w\rangle-
\langle v,\Omega\rangle\langle\Omega,w\rangle.
$$

$T(t)\Omega=\Omega$ かつ $T(t)Q=QT(t)$ なので、$v=P_0v+Qv$、$w=P_0w+Qw$ を代入すると混合項は直交性により零になる。残るのは

$$
C_{v,w}(t)=\langle Qv,T(t)Qw\rangle.
$$

特に同じ観測ベクトルを両側に置くと正値性が使える。$u=Qv$ とし、$\mu_u(B)=\|E_H(B)u\|^2$ と置く。これは射影値測度から作る有限正測度である。

<a id="thm-mqfc12-laplace"></a>

<!-- formal-statement-start -->
> **定理（連結相関のLaplace表示）**
> 非負自己共役作用素 $H$、単位真空 $H\Omega=0$、$v\in\mathcal H$ に対し $u=Qv$ とする。全ての $t\ge0$ で
>
$$
C_{v,v}(t)=\int_{[0,\infty)}e^{-t\lambda}\,d\mu_u(\lambda),
\qquad \mu_u([0,\infty))=\|u\|^2.
$$
>
> 特に $C_{v,v}(t)\ge0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

真空を差し引いた後、時間並進の各エネルギー成分に掛かる因子をスペクトル積分に代入する。非負性は測度がベクトルの長さの二乗から作られることに由来する。

<!-- proof-start -->
### 証明

[自己共役作用素のBorel関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) において $f_t(\lambda)=e^{-t\lambda}$（$\lambda\ge0$）を選ぶ。$0<f_t\le1$ なので $T(t)=f_t(H)$ は全 Hilbert 空間上の有界作用素で、$H$ の定義域に $u$ が属する必要はない。

射影値測度の性質 $E_H(B)^*E_H(B)=E_H(B)$ により

$$
\langle u,E_H(B)u\rangle
=\langle E_H(B)u,E_H(B)u\rangle=\mu_u(B).
$$

従ってスペクトル積分の内積表示に代入すると、$C_{v,v}(t)=\langle u,T(t)u\rangle=\int f_t\,d\mu_u$ となる。$E_H([0,\infty))=I$ から全質量は $\|u\|^2$。被積分関数が非負なので相関も非負である。
<!-- proof-end -->

三準位系で $v=3e_0+e_1+2e_2$ を選ぶと $u=e_1+2e_2$ であり、$\mu_u=\delta_2+4\delta_5$、$C_{v,v}(t)=e^{-2t}+4e^{-5t}$ となる。真空寄与9を除くことで、減衰する成分だけが残る。

## 3. ギャップから指数減衰へ

<a id="thm-mqfc12-gap-decay"></a>

<!-- formal-statement-start -->
> **定理（ギャップによる連結相関の指数評価）**
> [真空直交補空間の質量ギャップ](#def-mqfc12-gap) の条件を満たす $H,\Omega,\Delta$ について、任意の $v,w\in\mathcal H$ と $t\ge0$ に対し
>
$$
|C_{v,w}(t)|\le e^{-\Delta t}\|Qv\|\,\|Qw\|.
$$
<!-- formal-statement-end -->

### 証明の見取り図

真空以外では $\lambda\ge\Delta$ なので $e^{-t\lambda}$ の最大値は $e^{-t\Delta}$ 以下になる。ベクトルの長さの評価を内積に移す。

<!-- proof-start -->
### 証明

$z=Qw$ とすれば $E_H([0,\Delta))z=0$ である。[Borel関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) により $T(t)^*T(t)=e^{-2tH}$ だから、[連結相関のLaplace表示](#thm-mqfc12-laplace) の積分を時間 $2t$ で使って

$$
\begin{aligned}
\|T(t)z\|^2
&=\int_{[\Delta,\infty)}e^{-2t\lambda}\,d\mu_z(\lambda)\\
&\le e^{-2t\Delta}\mu_z([\Delta,\infty))\\
&=e^{-2t\Delta}\|z\|^2.
\end{aligned}
$$

両辺の非負平方根を取り、Cauchy–Schwarz の不等式を $\langle Qv,T(t)z\rangle$ に適用すれば結論を得る。
<!-- proof-end -->

単一場についての [質量測度からのEuclid二点量](../MQFC11/index.md#prop-mqfc11-euclidean-spectrum) もこの機構を具体化する。質量二乗の測度が $[m^2,\infty)$ に支持されるなら、$E_s(k)=\sqrt{s+|k|^2}\ge m$。任意の $\tau_0>0$、$\tau\ge\tau_0$ に対し

$$
\begin{aligned}
C_g(\tau)
&=\int e^{-(\tau-\tau_0)E_s(k)}
 e^{-\tau_0E_s(k)}|\hat g(k)|^2\,d\eta_s(k)\,d\rho(s)\\
&\le e^{-m(\tau-\tau_0)}C_g(\tau_0).
\end{aligned}
$$

$\tau_0$ を設けたのは、点時刻での二点量が $\tau=0$ で有限とは仮定しないためである。この評価は当該場の二点量の評価であり、補空間全体の評価とは区別する。

## 4. 逆向きの推論：正値性と稠密性

一つの相関が速く減衰したとき、その測度に低いエネルギーの重みがないことは証明できる。ところが測度は選んだベクトルに依存する。補空間全体を検査するには、線形包が補空間に稠密になる観測ベクトル族が必要である。稠密とは、補空間の任意のベクトルをその有限線形結合でノルム近似できることである。

<a id="thm-mqfc12-decay-gap"></a>

<!-- formal-statement-start -->
> **定理（稠密な観測ベクトル族からのギャップ判定）**
> $H$ は非負自己共役作用素、$\Omega\in D(H)$ は $H\Omega=0$ を満たす単位真空、$\mathcal K=\Omega^\perp\ne\{0\}$ とする。ベクトル族 $\mathcal V\subset\mathcal H$ が $\overline{\operatorname{span}(Q\mathcal V)}=\mathcal K$ を満たすとする。
>
> ある共通の $\Delta>0$ が存在し、各 $v\in\mathcal V$ に有限な $M_v\ge0$、$t_v\ge0$ があって全ての $t\ge t_v$ で
>
$$
C_{v,v}(t)\le M_v e^{-\Delta t}
$$
>
> ならば $E_H([0,\Delta))Q=0$ である。逆にこの射影条件から上の評価が $M_v=\|Qv\|^2$、$t_v=0$ で成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

低いエネルギーに正の重みがあれば、そこからの相関は想定した指数より遅くしか減衰できない。正の測度では他の成分による相殺がない。射影が観測ベクトルの全てを消すことを示した後、連続性によってその結論を補空間全体へ広げる。

<!-- proof-start -->
### 証明

$v\in\mathcal V$ を固定し $u=Qv$ とする。任意の $0\le a<\Delta$ について [連結相関のLaplace表示](#thm-mqfc12-laplace) と $\lambda\le a$ での $e^{-t\lambda}\ge e^{-ta}$ から

$$
e^{-ta}\mu_u([0,a])\le C_{v,v}(t)
\le M_v e^{-\Delta t}.
$$

$e^{ta}$ を掛ければ

$$
0\le\mu_u([0,a])\le M_v e^{-(\Delta-a)t}.
$$

$\Delta-a>0$ だから $t\to\infty$ で右辺が零になり、$\mu_u([0,a])=0$。$a_n=\Delta(1-1/n)$、$n\ge1$ と選べば $[0,a_n]$ は増大して $[0,\Delta)$ を尽くす。測度の[下からの連続性](../../../解析系/F0/F0-00D2/index.md#thm-f0-00d2-01)より $\mu_u([0,\Delta))=0$ となる。

$R=E_H([0,\Delta))$ と置くと $\|RQv\|^2=0$、すなわち $RQv=0$ である。線形性から $R$ は $\operatorname{span}(Q\mathcal V)$ を消す。任意の $z\in\mathcal K$ に対し $z_n$ をその線形包から選んで $\|z-z_n\|\to0$ とする。直交射影の作用素ノルムは1以下だから

$$
\|Rz\|=\|R(z-z_n)\|\le\|z-z_n\|\to0.
$$

従って $Rz=0$。任意の $w\in\mathcal H$ に対し $Qw\in\mathcal K$ なので $RQw=0$。逆方向は [ギャップによる連結相関の指数評価](#thm-mqfc12-gap-decay) で $w=v$ とした場合である。
<!-- proof-end -->

定数 $M_v$ は観測量ごとに異なってよい。必要なのは指数 $\Delta$ の共通性である。OS 構成では正時間多項式の類が稠密であることは [OS Hilbert空間](../MQFC9/index.md#def-mqfc9-os-hilbert) の完備化から従う。その類を中心化したものは補空間で稠密となる。実際、$z\in\mathcal K$ を多項式の類 $v_n$ で近似すると $\|Qv_n-z\|\le\|v_n-z\|\to0$。従って全てのその類の自己相関について共通の指数を証明できれば逆向きの定理が使える。

## 5. どこまで読み取れるか

### 一つの観測では見落とす

$H=\operatorname{diag}(0,1,4)$、$\Omega=e_0$、$v=e_2$ なら $C_{v,v}(t)=e^{-4t}$ だが真のギャップは1である。$Qv$ の線形包は $e_1$ を含まないので、稠密性が壊れている。

### 真空が一意でもギャップはないことがある

$\ell^2(\{0,1,2,\ldots\})$ 上で $He_0=0$、$He_n=n^{-1}e_n$（$n\ge1$）とする。実有界対角作用素で自己共役、非負であり、$Hx=0$ は $x_n=0$（$n\ge1$）を意味する。真空は一意だが任意の $\Delta>0$ に対し $n>1/\Delta$ を選べば $E_H([0,\Delta))e_n=e_n$。従って正のギャップはない。観測族 $\{e_n:n\ge1\}$ は補空間に稠密な線形包を持つが、それぞれの指数 $1/n$ に正の共通下限はない。

### 連続スペクトルと最も遅い減衰率

固有値がなくてもエネルギーの下端は相関に現れる。非零 $u=Qv$ に対し $a=\inf\operatorname{supp}\mu_u$ とする。有限正測度の台は、どの開近傍にも正の測度を持つ点全体である。

<a id="prop-mqfc12-log-rate"></a>

<!-- formal-statement-start -->
> **命題（自己相関の対数減衰率）**
> 非負自己共役作用素 $H$、単位真空 $H\Omega=0$、$u=Qv\ne0$ に対し、$a=\inf\operatorname{supp}\mu_u$ とする。このとき
>
$$
\lim_{t\to\infty}-\frac1t\log\frac{C_{v,v}(t)}{\|u\|^2}=a.
$$
<!-- formal-statement-end -->

### 証明の見取り図

全重みは $a$ 以上にあり、一方で $a$ に任意に近い区間には正の重みがある。その二つの事実で相関を挟む。

<!-- proof-start -->
### 証明

$\mu_u$ は非零の有限正測度なので $a$ は有限非負であり、$\mu_u([0,a))=0$。後者は台の補集合が測度零の開集合の可算和で覆われることから従う。任意の $\epsilon>0$ に対し $b_\epsilon=\mu_u([a,a+\epsilon])>0$ である。[連結相関のLaplace表示](#thm-mqfc12-laplace) により

$$
b_\epsilon e^{-(a+\epsilon)t}
\le C_{v,v}(t)\le\|u\|^2 e^{-at}.
$$

全て正なので、$\|u\|^2$ で割り対数を取って $-1/t$ を掛けると不等号が反転し、

$$
a\le-\frac1t\log\frac{C_{v,v}(t)}{\|u\|^2}
\le a+\epsilon-\frac1t\log\frac{b_\epsilon}{\|u\|^2}.
$$

$t\to\infty$ で最後の項は零。任意の $\epsilon>0$ について上極限が $a+\epsilon$ 以下、下極限が $a$ 以上なので極限は $a$ である。
<!-- proof-end -->

例えば $\mathcal H=\mathbb C\Omega\oplus L^2([2,3],d\lambda)$ で $H$ は真空上で零、第二成分では $\lambda$ を掛ける作用素とする。$u=(0,1)$ なら $\|u\|^2=1$ かつ

$$
C_{u,u}(t)=\int_2^3 e^{-t\lambda}d\lambda
=\frac{e^{-2t}(1-e^{-t})}{t}\quad(t>0).
$$

対数減衰率は2だが、エネルギー2の固有ベクトルは存在しない。実際 $(\lambda-2)f(\lambda)=0$ なら $f$ は測度零の一点以外で零となる。このため指数の下端から孤立した粒子質量が存在すると結論してはならない。

## 6. 演習

### 演習 MQFC12-A1：射影とギャップ

- Level: A

$H=\operatorname{diag}(0,3,7)$、$\Omega=e_0$ とする。$Q$ と $E_H([0,3))Q$、$E_H([0,4))Q$ を計算し最大幅を求めよ。

<!-- solution-start -->
真空への射影は $\operatorname{diag}(1,0,0)$ だから $Q=\operatorname{diag}(0,1,1)$。区間 $[0,3)$ にある固有値は零のみなので $E_H([0,3))Q=\operatorname{diag}(1,0,0)Q=0$。$[0,4)$ には3もあるので $E_H([0,4))Q=\operatorname{diag}(1,1,0)Q=\operatorname{diag}(0,1,0)$。任意の幅3より大きい区間には3が含まれる。[ギャップの定義](#def-mqfc12-gap) より最大幅は3。
<!-- solution-end -->

### 演習 MQFC12-A2：真空の差し引き

- Level: A

$H=\operatorname{diag}(0,2,3)$、$\Omega=e_0$、$v=(2,i,3)$ に対する $\mu_{Qv}$ と $C_{v,v}(t)$ を求めよ。

<!-- solution-start -->
$Qv=(0,i,3)$。各固有方向の長さの二乗は $|i|^2=1$ と $|3|^2=9$ なので $\mu_{Qv}=\delta_2+9\delta_3$。真空成分は $|\langle\Omega,v\rangle|^2=4$ である。[連結相関のLaplace表示](#thm-mqfc12-laplace) より $C_{v,v}(t)=e^{-2t}+9e^{-3t}$、特に $C_{v,v}(0)=10=\|Qv\|^2$ となる。
<!-- solution-end -->

### 演習 MQFC12-A3：二つの観測の相関

- Level: A

$H=\operatorname{diag}(0,2,4)$、$\Omega=e_0$、$v=e_0+e_1+e_2$、$w=e_0+e_1-e_2$ とする。$C_{v,w}(t)$ と [ギャップによる連結相関の指数評価](#thm-mqfc12-gap-decay) の上界を求めよ。

<!-- solution-start -->
$Qv=e_1+e_2$、$Qw=e_1-e_2$ である。$T(t)Qw=e^{-2t}e_1-e^{-4t}e_2$ を内積に代入し $C_{v,w}(t)=e^{-2t}-e^{-4t}$ を得る。両ベクトルの長さは $\sqrt2$、ギャップは2だから [ギャップによる連結相関の指数評価](#thm-mqfc12-gap-decay) の右辺は $2e^{-2t}$。実際 $0\le e^{-2t}-e^{-4t}\le e^{-2t}$ なのでこの評価を満たす。
<!-- solution-end -->

### 演習 MQFC12-A4：低い重みを排除する

- Level: A

有限正測度 $\mu$ が $[0,\infty)$ 上にあり、$\int e^{-t\lambda}d\mu(\lambda)\le 5e^{-3t}$ が全ての $t\ge1$ で成り立つとする。$\mu([0,2])$ を求めよ。$\mu(\{3\})$ は零といえるか。

<!-- solution-start -->
$[0,2]$ 上で $e^{-t\lambda}\ge e^{-2t}$。正値性から $e^{-2t}\mu([0,2])\le 5e^{-3t}$、従って $\mu([0,2])\le5e^{-t}$。極限で零となる。一方 $\mu=\delta_3$ は積分が $e^{-3t}\le5e^{-3t}$ を満たし $\mu(\{3\})=1$。端点3は排除できない。
<!-- solution-end -->

### 演習 MQFC12-B1：稠密性が足りない場合

- Level: B

$H=\operatorname{diag}(0,1,6)$、$\Omega=e_0$、観測族 $\mathcal V=\{e_0+ce_2:c\in\mathbb C\}$ を考える。共通指数6を確認し、なぜギャップ6が従わないか説明せよ。族に $e_1$ を加えるとどうなるか。

<!-- solution-start -->
各 $v$ について $Qv=ce_2$ だから

$$
C_{v,v}(t)=|c|^2e^{-6t}.
$$

しかし中心化した族の線形包は $\mathbb Ce_2$ に等しく、$e_1$ に直交する閉部分空間である。従って [稠密な観測ベクトル族からのギャップ判定](#thm-mqfc12-decay-gap) の稠密性仮定を満たさない。

$e_1$ を加えると中心化した族は補空間全体を張るが、$C_{e_1,e_1}(t)=e^{-t}$ なので指数6に対して

$$
e^{5t}\le M_{e_1}
$$

を要求することになり不可能。共通指数1なら全ての相関の評価が成立し、ギャップ1を得る。
<!-- solution-end -->

### 演習 MQFC12-B2：有限系からの一様下界

- Level: B

各 $N\ge1$ に対して $\mathbb C^{N+1}$ 上の $H_N=\operatorname{diag}(0,1,1/2,\ldots,1/N)$、$\Omega=e_0$ を考える。最大ギャップを求め、$N\to\infty$ で共通の正の減衰指数で相関を抑えられないことを示せ。

<!-- solution-start -->
固有値は $0$ と $1/n$（$1\le n\le N$）であり、補空間で最小は $1/N$。従って [ギャップの定義](#def-mqfc12-gap) により最大幅は $1/N$。仮に共通の $\Delta>0$ が存在すると、$N>1/\Delta$ を選び $v=e_N$ に適用した評価は $e^{-t/N}\le M_{N,v}e^{-\Delta t}$ を意味する。両辺に $e^{\Delta t}$ を掛けると $e^{(\Delta-1/N)t}\le M_{N,v}$ だが左辺が発散する。各有限系で正であることと、系の大きさに依存しない正の下界があることは異なる。
<!-- solution-end -->

### 演習 MQFC12-B3：連続分布からの減衰

- Level: B

$\mathcal H=\mathbb C\Omega\oplus L^2([0,1])$、$H=0\oplus M_\lambda$（$M_\lambda$ は $\lambda$ を掛ける作用素）、$u=(0,1)$ とする。相関を求め、真空の一意性とギャップの有無を確認せよ。

<!-- solution-start -->
第二成分で $T(t)$ は $e^{-t\lambda}$ を掛ける。従って $C_{u,u}(t)=\int_0^1 e^{-t\lambda}d\lambda=(1-e^{-t})/t$（$t>0$）、$t=0$ では1。$M_\lambda f=0$ は $\lambda f(\lambda)=0$ がほとんど至る所で成立することを意味し、$\lambda>0$ で $f=0$。零点は測度零だから第二成分に零固有ベクトルはない。しかし任意の $\Delta>0$ に対し $b=\min(1,\Delta/2)>0$ とすると、第二成分の $\mathbf 1_{(0,b)}$ は非零で $E_H([0,\Delta))$ によって保たれる。従ってギャップなし。さらに $t\ge\log 2$ なら相関は $1/(2t)$ 以上で、$e^{\Delta t}/(2t)\to\infty$ よりどの正の指数でも上から抑えられない。
<!-- solution-end -->

### 演習 MQFC12-B4：質量測度と基準時刻

- Level: B

[質量測度からのEuclid二点量](../MQFC11/index.md#prop-mqfc11-euclidean-spectrum) において $\rho$ が $[9,\infty)$ に支持され、$C_g(1)=2$ とする。$\tau\ge1$ での上界を導け。なぜこれだけでは全空間のギャップ3を主張できないか。

<!-- solution-start -->
積分中の $s\ge9$ に対して $E_s(k)\ge3$ である。$e^{-\tau E_s(k)}=e^{-(\tau-1)E_s(k)}e^{-E_s(k)}\le e^{-3(\tau-1)}e^{-E_s(k)}$。正の測度 $d\eta_s\,d\rho$ と非負の $|\hat g|^2$ を掛けて積分し $C_g(\tau)\le2e^{-3(\tau-1)}$ を得る。これは指定した場の波束の二点量に限る。補空間全体を稠密に張る観測ベクトル族で共通評価が成立するとは示されていないため、[逆向きの定理](#thm-mqfc12-decay-gap) は適用できない。
<!-- solution-end -->

### 演習 MQFC12-C1：連続部分と見えない励起ベクトル

- Level: C

$\mathcal H=\mathbb C\Omega\oplus\mathbb Ce\oplus L^2([4,5])$ を直交直和とし、$H=0\oplus 2\oplus M_\lambda$ とする。$\Omega,e$ は単位ベクトルとする。$v=(1,0,1)$ の連結相関とその対数減衰率を求め、全空間の最大ギャップを求めよ。さらに $\mathcal V=\{e\}\cup\{(0,0,f):f\in L^2([4,5])\}$ に [逆向きの定理](#thm-mqfc12-decay-gap) を適用して同じギャップ下界を導け。

<!-- solution-start -->
$Qv=(0,0,1)$ だから $\|Qv\|^2=1$。第二の励起方向には成分がなく、連続成分のスペクトル測度は $[4,5]$ 上の Lebesgue 測度である。[連結相関のLaplace表示](#thm-mqfc12-laplace) から

$$
C_{v,v}(t)=\int_4^5 e^{-t\lambda}d\lambda
=e^{-4t}\frac{1-e^{-t}}t.
$$

$t>0$ で $-t^{-1}\log C_{v,v}(t)=4+t^{-1}\log t-t^{-1}\log(1-e^{-t})$。後二項は零に収束するので減衰率は4となる（[対数減衰率の命題](#prop-mqfc12-log-rate) とも一致する）。

一方 $H$ の補空間での測度は固有方向 $e$ のエネルギー2と区間 $[4,5]$ だけに重みを持つ。$E_H([0,2))Q=0$ だが任意の $\Delta>2$ で $E_H([0,\Delta))e=e$ なので最大ギャップは2。

観測族は全て真空直交で、$Q$ は各元を変えない。$e$ と第二の励起成分全体の線形包が補空間そのものである。$e$ の自己相関は $e^{-2t}$。任意の $f\in L^2([4,5])$ に対して

$$
\begin{aligned}
C_{f,f}(t)&=\int_4^5 e^{-t\lambda}|f(\lambda)|^2d\lambda\\
&\le e^{-4t}\|f\|^2
\le e^{-2t}\|f\|^2.
\end{aligned}
$$

共通指数2と各ノルムの二乗を係数に選べば、稠密性と自己相関の仮定を両方満たす。従って [逆向きの定理](#thm-mqfc12-decay-gap) から幅2の下界が復元できる。$e$ の相関により幅2を超えられないことも分かる。
<!-- solution-end -->

## 7. まとめ

ギャップは真空直交補空間のスペクトル全体に関する主張である。相関の指数減衰からギャップを導くには正の測度、共通指数、観測ベクトル族の稠密性が必要となる。各有限体積でギャップがあることも、極限で正の値が残ることを自動的には意味しない。次講では正則化と極限を構成する際の問題に進む。
