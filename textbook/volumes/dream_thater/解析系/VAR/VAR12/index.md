# VAR12 第二変分作用素・Morse指数

[VAR2の第二変分](../VAR2/index.md#def-var2-second-variation)は停留点の周りでエネルギーが増えるか減るかを判定しました。[VAR11のMountain Passの定理](../VAR11/index.md#thm-var11-mountain-pass)では、最小点以外の臨界点も現れました。では鞍点に「下り坂」が何方向あるか、零になる変分があるかを数えられるでしょうか。これが **Morse指数** と **零化次数** の役割です。

本章では、はじめに有限次元のHessianを調べ、固定端点の二次汎関数から自己共役微分作用素を作ります。Dirichlet境界のSturm模型を最後まで解き、共役点、制約付き変分、時間発展の安定性を別々の問題として理解します。一般の閉測地線に対するMorse–Bott理論や無限次元Floer理論は扱いません。

## 1. Hessianの負方向を数える

$C^2$ 級の $f:\mathbb R^d\to\mathbb R$ が臨界点 $p$ を持てば、$Df(p)=0$ なのでTaylor展開の最初の非自明な項は $D^2f(p)[h,h]/2$ です。[第二変分の必要条件](../VAR2/index.md#thm-var2-necessary)は極小点ならこの二次形式が非負と教えます。しかし非負でない場合、下がる方向の「数」はまだ分かりません。

例えば $f(x,y,z)=-x^2-3y^2+2z^2$ の原点では、$(x,y,0)$ 平面のどの非零方向でも二次形式が負になり、$z$ 軸方向では正です。負方向を一本ずつ数えるのではなく、**二次形式が負定値になる線形部分空間の最大次元**を数えます。

<a id="def-var12-index-nullity"></a>
<!-- formal-statement-start -->
> **定義（Morse指数と零化次数）**  
> 実Hilbert空間 $H$ 上の連続対称双線形形式 $B:H\times H\to\mathbb R$ に対して、$Q(h)=B(h,h)$ とする。Morse指数 $m(Q)$ は、$Q$ が非零ベクトル上で厳密に負となる線形部分空間の次元の上限（無限大も許す）である。零化次数 $\nu(Q)$ は
$$
\nu(Q)=\dim\{h\in H:B(h,k)=0\ \text{for all }k\in H\}
$$
> とする。$f\in C^2(H,\mathbb R)$ の臨界点 $p$ では $B=D^2f(p)$ を用い、$m(p)=m(Q)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var12-index-nullity -->
**定義の確認**。$Q(x,y,z)=-2x^2-6y^2+4z^2$ とすると $z=0$ の二次元空間では負定値です。三次元全体では $Q(0,0,1)>0$ なので指数は2、零化次数は0です。$Q(x,y,z)=-x^2+z^2$ なら指数1、核は $(0,y,0)$ で零化次数1です。
<!-- definition-example-end -->

「$Q(h)=0$ となる方向」と「核に入る方向」は違います。$Q(x,y)=-x^2+y^2$ では $(1,1)$ は $Q=0$ ですが、$B((1,1),(1,0))=-1$ なので核ではありません。零化次数は零です。逆に零化次数が正でも、$f(x)=x^4$ と $g(x)=-x^4$ は原点で同じ零Hessianを持ち、一方は極小、他方は極大です。二階微分の情報だけで高次項まで判断してはいけません。

## 2. 二次形式と微分作用素は同じではない

$L>0$、$a\in\mathbb R$ を固定し、$H=H_0^1(0,L)$ で
$$
J_a(u)=\frac12\int_0^L\{u'(t)^2-a\,u(t)^2\}\,dt
$$
を考えます。零関数は停留点です。$u=\varepsilon h+\delta k$ として積を展開すると、
$$
J_a(\varepsilon h+\delta k)
=\frac{\varepsilon^2}{2}Q_a(h)+\varepsilon\delta B_a(h,k)
 +\frac{\delta^2}{2}Q_a(k),
$$
$$
B_a(h,k)=\int_0^L(h'k'-ahk)\,dt,\qquad Q_a(h)=B_a(h,h).
$$
したがって $D^2J_a(0)[h,k]=B_a(h,k)$ です。この二次形式は $H_0^1$ 上で連続です。一方、微分方程式としての作用素は **$L^2$ 上の別の定義域**を指定して初めて成立します。

<a id="def-var12-sturm-operator"></a>
<!-- formal-statement-start -->
> **定義（固定端点の第二変分作用素）**  
> $L>0$、$a\in\mathbb R$ とする。実Hilbert空間 $L^2(0,L)$ 上に
$$
A_a u=-u''-a u,\qquad
D(A_a)=H^2(0,L)\cap H_0^1(0,L)
$$
> を定める。$H_0^1$ は端点でトレースが零のSobolev空間である。$A_a$ を固定端点のSturm型第二変分作用素と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-var12-sturm-operator -->
**定義の確認**。$u(t)=\sin(\pi t/L)$ は滑らかで $u(0)=u(L)=0$、ゆえに $D(A_a)$ に属します。二階微分を実際に取ると
$$
A_a u=\left(\frac{\pi^2}{L^2}-a\right)u.
$$
ただし $u(t)=t(L-t)$ も作用素の定義域に入りますが、一般には固有関数ではありません。
<!-- definition-example-end -->

<a id="prop-var12-operator-selfadjoint"></a>
<!-- formal-statement-start -->
> **命題（第二変分作用素の自己共役性）**  
> $L>0$、$a\in\mathbb R$ とし、上記の $A_a:D(A_a)\subset L^2(0,L)\to L^2(0,L)$ を考える。$A_a$ は稠密に定義された自己共役作用素であり、全ての $u\in D(A_a)$、$v\in H_0^1(0,L)$ について
$$
\langle A_a u,v\rangle_{L^2}=B_a(u,v)
$$
> が成立する。さらに $(A_a+(a+1)I)^{-1}$ は $L^2$ 上のコンパクト作用素である。
<!-- formal-statement-end -->

### 証明の見取り図

部分積分だけでは「対称」は示せても「自己共役」には足りません。実数の十分大きいシフトに対する方程式が全ての $L^2$ 右辺について解けることを使い、随伴作用素の定義域が広がらないと示します。最後に弱解の $H^2$ 正則性とコンパクト埋め込みを使います。

<!-- proof-start -->
### 証明

$u,v\in H^2\cap H_0^1$ ならトレースが零なので部分積分から
$$
\langle A_a u,v\rangle
=\int_0^L(-u''-au)v\,dt
=\int_0^L(u'v'-auv)\,dt
=\langle u,A_a v\rangle.
$$
滑らかなコンパクト台関数は $L^2$ に稠密なので $D(A_a)$ も稠密です。

任意の $f\in L^2$ を取ります。シフト後の弱方程式は
$$
\int_0^L(u'v'+uv)\,dt=\int_0^Lfv\,dt
\quad(v\in H_0^1)
$$
です。左辺は $H_0^1$ 上の連続で強圧的な双線形形式なので、[Lax–Milgramの定理](../../GPDE/GPDE7/index.md#thm-gpde7-lax-milgram)により一意な $u\in H_0^1$ が存在し、$\|u\|_{H^1}\le C\|f\|_{L^2}$ です。分布の意味で $-u''+u=f$、従って $u''=u-f\in L^2$ です。よって $u\in H^2\cap H_0^1=D(A_a)$、しかも
$$
(A_a+(a+1)I)u=f.
$$
つまり $A_a+(a+1)I$ は $L^2$ の全域へ写る全単射です。

$z\in D(A_a^*)$ を取ります。右辺 $f=(A_a^*+(a+1)I)z$ に対し上の全射性で $(A_a+(a+1)I)y=f$ を満たす $y\in D(A_a)$ が存在します。対称性から $A_a\subset A_a^*$ なので
$$
(A_a^*+(a+1)I)(z-y)=0.
$$
他方
$$
\ker(A_a^*+(a+1)I)
=\operatorname{Ran}(A_a+(a+1)I)^\perp=\{0\}.
$$
従って $z=y\in D(A_a)$。$A_a^*=A_a$ です。

最後にシフトの逆作用素は $f$ を上の弱解 $u$ に写します。$\|u\|_{H^1}\le C\|f\|_{L^2}$ と[Rellich–Kondrachovの定理](../../GPDE/GPDE5/index.md#thm-gpde5-rellich-h01-l2)により、$L^2$ の有界列の像は $L^2$ で収束部分列を持つので逆作用素はコンパクトです。
<!-- proof-end -->

**定義域の落とし穴**。$B_a$ は $H_0^1$ 上の有界形式ですが、$A_a$ は $L^2$ 全体に作用する有界写像ではありません。任意の $H_0^1$ 関数に $u''\in L^2$ があるとは限らず、境界条件を変えれば自己共役実現も変わります。

## 3. 指数を整数として求める

[VAR2のWirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)は $h(0)=h(L)=0$ のとき
$$
\int_0^L|h'|^2\,dt\ge\frac{\pi^2}{L^2}\int_0^L|h|^2\,dt
$$
を与えます。これだけなら「負方向が存在するか」は分かりますが、負方向の個数には、区間を分割して補助的な零条件を課す工夫が必要です。

<a id="thm-var12-sturm-index"></a>
<!-- formal-statement-start -->
> **定理（Dirichlet Sturm模型のMorse指数と零化次数）**  
> $L>0$、$a\in\mathbb R$ とし、$H_0^1(0,L)$ 上で
$$
Q_a(h)=\int_0^L(|h'|^2-a|h|^2)\,dt
$$
> を定める。このとき
$$
m(Q_a)=\#\left\{n\in\mathbb N:
\left(\frac{n\pi}{L}\right)^2<a\right\},
$$
$$
\nu(Q_a)=\#\left\{n\in\mathbb N:
\left(\frac{n\pi}{L}\right)^2=a\right\}.
$$
> 特に零化次数は0または1である。$A_a$ の固有値は $(n\pi/L)^2-a$ ($n=1,2,\ldots$) であり、各固有値の固有関数は $\sin(n\pi t/L)$ の定数倍である。
<!-- formal-statement-end -->

### 証明の見取り図

負の固有関数を $m$ 本書けば指数は少なくとも $m$。逆向きはFourier展開の完全性を仮定して済ませず、$m$ 個の内部点で零となる変分について各小区間でWirtinger不等式を使います。核は二階ODEの両端条件から直接求めます。

<!-- proof-start -->
### 証明

$\lambda_n=(n\pi/L)^2$ と置き、$\lambda_n<a$ を満たす正整数の個数を $m$ とします。$a\le\lambda_1$ なら $m=0$ です。$n\le m$ に対し $s_n(t)=\sin(n\pi t/L)$ を取り、[正弦・余弦の直交積分](../../../解析系/FOU/FOU1/index.md#thm-fou1-frequency-cancellation)を区間 $(0,L)$ へ変数変換して使うと
$$
\int_0^L s_j s_k\,dt=\frac L2\delta_{jk},
\quad
\int_0^L s_j's_k'\,dt=\frac L2\lambda_j\delta_{jk}.
$$
したがって $h=\sum_{j=1}^{m}c_js_j$ に対し
$$
Q_a(h)=\frac L2\sum_{j=1}^{m}(\lambda_j-a)c_j^2<0
\quad(h\ne0).
$$
よって $m(Q_a)\ge m$ です。

次に内部の $m$ 点 $t_j=jL/(m+1)$ ($j=1,\ldots,m$) を定め、
$$
V=\{h\in H_0^1(0,L):h(t_j)=0\ (1\le j\le m)\}
$$
とします。1次元の $H^1$ 関数は連続代表を持つため点評価は意味を持ち、$V$ の余次元は高々 $m$ です。各小区間 $I_j=(t_{j-1},t_j)$ （$t_0=0,t_{m+1}=L$）で $h$ の両端値は零です。区間長 $\ell=L/(m+1)$ の[Wirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)を適用すると
$$
\int_{I_j}(|h'|^2-a|h|^2)\,dt
\ge\left(\frac{\pi^2}{\ell^2}-a\right)
\int_{I_j}|h|^2\,dt.
$$
$m$ の定義から $a\le\lambda_{m+1}=\pi^2/\ell^2$ なので、全小区間で和を取れば $Q_a(h)\ge0$ ($h\in V$) です。仮に負定値部分空間 $W$ の次元が $m+1$ 以上なら、$m$ 個の点評価の共通核と $W$ は非零ベクトルを共有します。そのベクトルでは $Q_a<0$ かつ $Q_a\ge0$ となり矛盾します。ゆえに $m(Q_a)\le m$ で等号です。

核に属する $u\in H_0^1$ は全ての $v\in H_0^1$ に対して
$$
\int_0^L(u'v'-auv)\,dt=0
$$
を満たすので分布の意味で $-u''-au=0$ です。右辺 $au\in L^2$ から $u\in H^2$、さらにこの定数係数ODEの解は滑らかです。$a\le0$ なら両端を零にする非零解はなく、$a>0$ なら
$$
u(t)=C\sin(\sqrt a\,t)+D\cos(\sqrt a\,t)
$$
です。$u(0)=0$ から $D=0$、$u(L)=0$ から $C\sin(\sqrt a L)=0$。非零解は $\sqrt a L=n\pi$ のときだけ存在し、その空間は一次元です。

作用素の固有値 $\mu$ も $-u''=(a+\mu)u$ の非零Dirichlet解が存在する条件を調べれば、$a+\mu=\lambda_n$ が必要十分です。上記と同じODEの境界値計算で $\mu=\lambda_n-a$ と固有関数を得ます。コンパクトなシフト逆作用素を持つため、これら以外の連続スペクトルはありません。
<!-- proof-end -->

この証明は、単に固有値を並べただけではありません。「負になる方向を $m$ 本作る」ことと「$m+1$ 本は作れない」ことを別々に確認しています。とくに $a=(n\pi/L)^2$ では **負方向には数えず、零化次数へ数える**点に注意します。

**数値例**。$L=\pi$、$a=4$ なら固有値は $n^2-4$。$n=1$ が負、$n=2$ が零、$n\ge3$ は正です。指数1、零化次数1。$a=4.1$ へ少し増やすと $n=2$ も負になり、指数2、零化次数0です。

## 4. 共役点を数える意味

[GEO17の第二変分公式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)では、単位速測地線に沿う法方向の指数形式に曲率項が現れました。断面曲率が定数 $K>0$ の模型では、平行な単位法ベクトル場 $E(t)$ に対する変分 $V(t)=h(t)E(t)$ について
$$
I(V,V)=\int_0^L(h'^2-Kh^2)\,dt=Q_K(h).
$$
[Jacobi方程式](../../../幾何系/GEO/GEO17/index.md#def-geo17-jacobi)は $h''+Kh=0$ です。始点で消える非零解は $h(t)=C\sin(\sqrt K\,t)$ で、$t=j\pi/\sqrt K$ が共役時刻になります。

<a id="prop-var12-conjugate-index"></a>
<!-- formal-statement-start -->
> **命題（定曲率測地線のMorse指数と共役点の個数）**  
> $d\ge2$ 次元の定断面曲率 $K>0$ のRiemann多様体上で、長さ $L>0$ の単位速測地線区間を考え、両端を固定する $H_0^1$ 変分場のエネルギー第二変分を取る。この指数形式のMorse指数は
$$
m=(d-1)\#\{j\in\mathbb N:j\pi/\sqrt K<L\},
$$
> 零化次数は $L=j\pi/\sqrt K$ を満たす正整数 $j$ があるとき $d-1$、ないとき0である。
<!-- formal-statement-end -->

### 証明の見取り図

平行正規直交枠で法方向を $d-1$ 個に分離すると、各方向は同じSturm模型になります。接方向の第二変分には曲率項がなく、固定端点で負方向も零方向もありません。

<!-- proof-start -->
### 証明

平行正規直交枠を $\dot\gamma,E_1,\ldots,E_{d-1}$ とし、$V=f_0\dot\gamma+\sum_{\alpha=1}^{d-1}f_\alpha E_\alpha$ と表します。全成分は端点で零です。[指数形式](../../../幾何系/GEO/GEO17/index.md#def-geo17-index-form)の曲率項は定曲率の公式から法成分に $K f_\alpha^2$、接成分に零を与えるので
$$
I(V,V)=\int_0^L|f_0'|^2dt+
\sum_{\alpha=1}^{d-1}\int_0^L(|f_\alpha'|^2-K|f_\alpha|^2)dt.
$$
接方向は端点零なら $\int|f_0'|^2=0$ から $f_0=0$ となるため正定値です。各法方向には[Sturm模型の指数定理](#thm-var12-sturm-index)を $a=K$ として適用できます。負定値部分空間は直交直和で $d-1$ 倍になり、核も同じだけ直和されます。$j^2\pi^2/L^2<K$ は $j\pi/\sqrt K<L$ と同値なので結論を得ます。
<!-- proof-end -->

[共役点の定義](../../../幾何系/GEO/GEO17/index.md#def-geo17-conjugate)は「始点からのJacobi場が別の時刻で零になること」です。定曲率では内部共役点の個数（重複度つき）が指数に一致し、**終点の共役点は核に数えます**。たとえば単位球面の半周大円 $L=\pi$ では指数0、零化次数1（$d=2$）。終点が共役であることだけから「厳密に負の方向がある」と結論してはいけません。これと[内部共役点が局所最短性を壊す定理](../../../幾何系/GEO/GEO17/index.md#thm-geo17-interior-conjugate-not-minimizing)の仮定を比較してください。

ここで証明した数え上げは **定曲率の模型**です。一般の曲率変動・境界条件に対するMorse指数定理を、この計算だけで証明したことにはなりません。

## 5. 制約を入れるとHessianが変わる

作用をある対称部分空間や保存量面上で最小化するとき、許された方向だけを検査しなくてはなりません。[VAR11の有限群の対称臨界性](../VAR11/index.md#prop-var11-symmetric-critical)は停留点の議論ですが、指数が全方向で同じになるとは主張しません。

<a id="prop-var12-constrained-hessian"></a>
<!-- formal-statement-start -->
> **命題（滑らかな等式制約下の第二変分）**  
> $f,g\in C^2(\mathbb R^d,\mathbb R)$ とし、$M=\{x:g(x)=0\}$、$p\in M$、$\nabla g(p)\ne0$ とする。ある $\lambda\in\mathbb R$ に対し $\nabla f(p)=\lambda\nabla g(p)$ が成り立つなら、制約面 $M$ 上の停留点 $p$ の第二変分は、接空間 $T_pM=\{h:\nabla g(p)\cdot h=0\}$ 上で
$$
B_M(h,h)=h^\mathsf T\left(D^2f(p)-\lambda D^2g(p)\right)h
$$
> である。したがって制約付きの指数と零化次数は、この接空間上の形式に対して数える。
<!-- formal-statement-end -->

### 証明の見取り図

制約曲線の二階微分には曲率に当たる加速度が入ります。制約を二回微分してその加速度を消去すると、Lagrange乗数の項が出ます。

<!-- proof-start -->
### 証明

任意の $h\in T_pM$ を取り、$M$ 内の $C^2$ 曲線 $x(s)$ で $x(0)=p$、$x'(0)=h$ を選びます。$\nabla g(p)\ne0$ だから陰関数定理によってこのような局所曲線が作れます。連鎖律を二度使えば
$$
\frac{d^2}{ds^2}f(x(s))\bigg|_{s=0}
=h^\mathsf TD^2f(p)h+\nabla f(p)\cdot x''(0),
$$
$$
0=\frac{d^2}{ds^2}g(x(s))\bigg|_{s=0}
=h^\mathsf TD^2g(p)h+\nabla g(p)\cdot x''(0).
$$
後式に $\lambda$ を掛け、$\nabla f(p)=\lambda\nabla g(p)$ を代入して前式から引くと
$$
\frac{d^2}{ds^2}f(x(s))\bigg|_{s=0}
=h^\mathsf T(D^2f(p)-\lambda D^2g(p))h.
$$
右辺は選んだ曲線の加速度に依存せず、接ベクトル $h$ だけで定まります。
<!-- proof-end -->

**曲がった制約の直接例**。$f(x,y)=x$、$g(x,y)=(x^2+y^2-1)/2$、$p=(1,0)$ とすると $\nabla f(p)=\nabla g(p)=(1,0)$、$\lambda=1$ です。周上の曲線 $(\cos s,\sin s)$ では $f=\cos s$、二階微分は $-1$。一方 $D^2f=0$ なので周囲のHessianをただ接空間へ制限すると誤答0になります。正しくは $D^2(f-g)=-I$ を接方向 $(0,1)$ に作用させて $-1$ です。

**線形制約の例**。$f(x,y)=(-x^2+4y^2)/2$ を全空間で考えると指数1ですが、許容集合 $x=0$ では $f(0,y)=2y^2$ なので制約付き指数は0です。これは線形制約なので $D^2g=0$ であり、接空間への単なる制限で足ります。

## 6. 作用の最小性と動力学の安定性

最後に、力学の「安定」という言葉を混同しないようにします。[解析力学のEuler–Lagrange方程式](../../../物理系/AMECH/AMECH3/index.md#thm-amech3-euler-lagrange)の解が小さい摂動で時間発展として有界であるかは、変分の二階微分と別の検査を要します。

周期 $T>0$ の調和振動子 $\ddot x+\omega^2x=0$（$\omega>0$）の零解を考えます。作用
$$
S[x]=\frac12\int_0^T(\dot x^2-\omega^2x^2)\,dt
$$
の固定端点Hessianは $Q_{\omega^2}$ です。[Sturm模型の指数定理](#thm-var12-sturm-index)より、$T>\pi/\omega$ なら負方向が存在します。一方、初期摂動 $(x(0),\dot x(0))=(u,v)$ の解は
$$
x(t)=u\cos(\omega t)+\frac v\omega\sin(\omega t),
\quad
\dot x(t)=-\omega u\sin(\omega t)+v\cos(\omega t),
$$
なので
$$
|x(t)|\le|u|+|v|/\omega,\quad
|\dot x(t)|\le\omega|u|+|v|
$$
が全時刻で成り立ち、零解は線形力学として有界安定です。周期 $T$ の状態遷移行列の固有値（Floquet乗数）は $e^{\pm i\omega T}$ で絶対値1です。

したがって **作用の固定端点Morse指数が正でも、力学的に不安定とは限りません**。制約の種類、境界条件、時間区間、力学の線形化は別々に指定してください。周期軌道を扱う後続の講義では、周期境界でのHessian、時間並進に伴う零モード、Floquet乗数を別々に調べる必要があります。

## 7. 演習と詳細解答

### Level A

<a id="ex-var12-a01"></a>
#### VAR12-A01 指数と等方方向の違い
- Level: A

$Q(x,y,z)=-3x^2+2y^2$ のMorse指数、零化次数を求めよ。さらに $Q(h)=0$ でも核には属さない非零ベクトルを一つ示せ。

<!-- solution-start -->
### 詳細解答

対称双線形形式は $B(h,k)=-3h_xk_x+2h_yk_y$。$x$ 軸で負定値だから指数は少なくとも1です。$x=0$ の二次元部分空間で $Q=2y^2\ge0$ なので指数は高々1です。$B(h,k)=0$ が全ての $k$ に成立するには $h_x=h_y=0$、$h_z$ は任意です。よって零化次数1です。$h=(\sqrt2,\sqrt3,0)$ は $Q(h)=-6+6=0$ ですが $B(h,(1,0,0))=-3\sqrt2\ne0$ なので核ではありません。
<!-- solution-end -->

<a id="ex-var12-a02"></a>
#### VAR12-A02 Dirichlet固有対
- Level: A

$L=2\pi$、$a=1$ とする。$n=1,2,3$ の固有値と固有関数を求め、負・零・正を分類せよ。

<!-- solution-start -->
### 詳細解答

$s_n(t)=\sin(nt/2)$ は両端で零、$-s_n''=(n^2/4)s_n$ です。従って $A_1s_n=(n^2/4-1)s_n$。固有値は順に $-3/4,0,5/4$ となります。$n=1$ は負、$n=2$ は零、$n=3$ は正です。さらに $n\ge3$ では $n^2/4-1>0$ なので全体の指数1、零化次数1です。
<!-- solution-end -->

<a id="ex-var12-a03"></a>
#### VAR12-A03 第二変分を双線形化する
- Level: A

$J(u)=\frac12\int_0^1(3u'^2-5u^2)dt$ ($u\in H_0^1$) で $D^2J(0)[h,k]$ と $DJ(0)[h]$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$J(\varepsilon h+\delta k)$ を展開して混合項を抜き出すと
$$
J(\varepsilon h+\delta k)=\frac{\varepsilon^2}{2}\int(3h'^2-5h^2)
+\varepsilon\delta\int(3h'k'-5hk)
+\frac{\delta^2}{2}\int(3k'^2-5k^2).
$$
一次項がないので $DJ(0)[h]=0$、混合二次係数が $D^2J(0)[h,k]=\int_0^1(3h'k'-5hk)dt$ です。
<!-- solution-end -->

<a id="ex-var12-a04"></a>
#### VAR12-A04 共役時刻と端点の扱い
- Level: A

$K=4$ の単位速曲面測地線について、$L=\pi/2$ および $L=3\pi/4$ の法方向指数と零化次数を求めよ。

<!-- solution-start -->
### 詳細解答

Jacobi方程式は $h''+4h=0$、始点で零の解は $h=C\sin(2t)$ です。最初の共役時刻は $\pi/2$、次は $\pi$。$L=\pi/2$ では内部に共役点がないので指数0、終点に零モード $\sin(2t)$ があるので零化次数1。$L=3\pi/4$ では内部の $\pi/2$ が一つあるので指数1、終点は共役でないので零化次数0です。
<!-- solution-end -->

<a id="ex-var12-a05"></a>
#### VAR12-A05 線形制約による指数の変化
- Level: A

$Q(x,y,z)=-x^2-y^2+3z^2$ を全空間、制約 $x=0$、制約 $x=y=0$ のそれぞれで考え、Morse指数を求めよ。

<!-- solution-start -->
### 詳細解答

全空間では $(x,y,0)$ 平面が負定値なので指数2です。$x=0$ 上では $Q(0,y,z)=-y^2+3z^2$ なので指数1。$x=y=0$ 上では $Q(0,0,z)=3z^2$ なので指数0です。各制約は線形空間であり、Lagrange乗数の曲率項を要しません。全てのケースで核は零です。
<!-- solution-end -->

### Level B

<a id="ex-var12-b01"></a>
#### VAR12-B01 内部点条件で指数の上界を示す
- Level: B

$L=\pi$、$a=6$ について、(1)負定値になる二次元部分空間を明示し、(2)$h(\pi/3)=h(2\pi/3)=0$ を満たす関数で $Q_6(h)\ge0$ を証明して、指数を決定せよ。

<!-- solution-start -->
### 詳細解答

$\sin t,\sin(2t)$ の張る空間で $h=c_1\sin t+c_2\sin(2t)$ とおくと、直交性から
$$
Q_6(h)=\frac\pi2\{(1-6)c_1^2+(4-6)c_2^2\}
=-\frac\pi2(5c_1^2+2c_2^2)<0
$$
が非零 $h$ で成り立つので、指数は少なくとも2です。次に $h(\pi/3)=h(2\pi/3)=0$ と両端零の仮定より、$(0,\pi/3)$、$(\pi/3,2\pi/3)$、$(2\pi/3,\pi)$ の各区間で[Wirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)が使えます。区間長は $\pi/3$ なので
$$
\int_I h'^2dt\ge 9\int_Ih^2dt.
$$
三つの区間で足して $Q_6(h)\ge(9-6)\int_0^\pi h^2dt\ge0$。この零条件の共通核は余次元高々2なので、負定値部分空間の次元は2を超えません。ゆえに指数は2です。**中点だけに零条件を課すと定数4しか得られず、この証明には足りない**ことにも注意してください。
<!-- solution-end -->

<a id="ex-var12-b02"></a>
#### VAR12-B02 曲がった制約とLagrangian Hessian
- Level: B

$f(x,y)=2x$、$g(x,y)=(x^2+y^2-1)/2$、$p=(1,0)$。制約 $g=0$ 上でのLagrange乗数、接空間、制約付き二階微分を求め、周上の曲線との一致を検証せよ。

<!-- solution-start -->
### 詳細解答

$\nabla f(p)=(2,0)$、$\nabla g(p)=(1,0)$ なので $\lambda=2$。接空間は $T_pM=\{(0,s):s\in\mathbb R\}$ です。$D^2f=0$、$D^2g=I$ より
$$
D^2(f-\lambda g)=-2I,\qquad
B_M((0,s),(0,s))=-2s^2.
$$
一方 $x(\theta)=(\cos\theta,\sin\theta)$ とすれば $f(x(\theta))=2\cos\theta$、二階微分は $\theta=0$ で $-2$。単位接方向 $s=1$ の結果と一致します。周上では局所極大なので制約付き指数1です。
<!-- solution-end -->

<a id="ex-var12-b03"></a>
#### VAR12-B03 固定端点の作用と時間発展
- Level: B

$\ddot x+9x=0$ の零解について、時間区間 $[0,\pi]$ の固定端点作用Hessianの指数・零化次数を求め、力学の解の有界性を検証せよ。

<!-- solution-start -->
### 詳細解答

作用の二次形式は $Q_9(h)=\int_0^\pi(h'^2-9h^2)dt$ です。固有値は $n^2-9$ だから $n=1,2$ で負、$n=3$ で零です。指数2、零化次数1となります。一方初期値 $(u,v)$ の解は
$$
x(t)=u\cos(3t)+\frac v3\sin(3t),\qquad
\dot x(t)=-3u\sin(3t)+v\cos(3t).
$$
従って $|x(t)|\le|u|+|v|/3$、$|\dot x(t)|\le3|u|+|v|$ で全時刻有界です。負の作用方向が二本あっても線形力学は有界安定です。
<!-- solution-end -->

<a id="ex-var12-b04"></a>
#### VAR12-B04 境界条件を変えると零モードが変わる
- Level: B

$Q(h)=\int_0^Lh'^2dt$ を固定端点空間 $H_0^1(0,L)$ と周期空間 $H_{\mathrm{per}}^1(0,L)$ 上で比較し、指数と零化次数をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

両空間とも $Q(h)\ge0$ だから指数0です。核条件は $B(h,k)=\int_0^Lh'k'=0$ が全ての許容 $k$ に対して成立することです。$k=h$ と取ると $\int_0^L|h'|^2=0$、従って $h$ は定数関数です。固定端点では定数関数が両端零であるには $h=0$、核の次元は0です。周期空間には任意の定数関数が入り、その一次元空間が核です。周期境界では零化次数1になります。
<!-- solution-end -->

### Level C

<a id="ex-var12-c01"></a>
#### VAR12-C01 定曲率・制約・力学の三つの指数
- Level: C

単位球面 $S^2$ 上の長さ $L=5\pi/2$ の単位速大円測地線を固定端点で考える。次を示せ。

1. 法方向の指数、零化次数を求める。接方向は負方向を作らないことを確かめる。
2. 長さを $L=2\pi$ へ変えた場合の指数、零化次数を求め、終点共役の意味を説明する。
3. 同じ $T=5\pi/2$ の区間で調和振動子 $\ddot x+x=0$ の零解の固定端点作用Hessianを考え、指数と時間発展の有界性が異なる概念であることを示す。

<!-- solution-start -->
### 詳細解答

**1.** 球面の断面曲率は $K=1$。法成分 $h$ の指数形式は $Q_1(h)=\int_0^{5\pi/2}(h'^2-h^2)dt$ です。負固有値条件は
$$
\left(\frac{n\pi}{5\pi/2}\right)^2<1
\quad\Longleftrightarrow\quad n<\frac52,
$$
従って $n=1,2$ の二本が負で、指数2です。$n=5/2$ は整数ではないので零化次数0です。接成分 $f$ は $\int f'^2dt\ge0$、零なら端点条件より $f=0$ なので指数・核へ寄与しません。

**2.** $L=2\pi$ なら負条件 $n<2$ より指数1です。$n=2$ では固有値 $(2\pi/(2\pi))^2-1=0$、零化次数1となります。$t=\pi$ は内部共役点として負方向に数えられますが、$t=2\pi$ は終点共役点なので零モードに数えられます。

**3.** 調和振動子の固定端点作用Hessianも $Q_1$ だから指数2、零化次数0です。しかし初期値 $(u,v)$ からの解は
$$
x(t)=u\cos t+v\sin t,\quad \dot x(t)=-u\sin t+v\cos t,
$$
なので $x(t)^2+\dot x(t)^2=u^2+v^2$ が恒等的に成立します。時間発展は摂動の大きさを保ちます。ゆえに作用の負方向の個数から力学的不安定性を結論できません。
<!-- solution-end -->

## 8. 到達点

固定端点の二次形式を作用素として扱うには、Hilbert空間と作用素の定義域・境界条件を指定する必要がありました。指数の数え上げは、負の固有関数を作る下界と区間分割による上界を組み合わせることで完結しました。定曲率の測地線では内部共役点が指数、終点共役が零化次数に対応します。制約面での指数はLagrangianのHessianを接空間に制限して計算し、作用の指数と時間発展のFloquet乗数は区別します。

後続の周期軌道解析では、周期境界、時間並進の零モード、衝突特異性による変分空間の制約を確認してから、ここで学んだ道具を適用します。
