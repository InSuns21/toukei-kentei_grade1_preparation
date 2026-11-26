# VNP7 C/O：CN不等式、priceのCAT(0)完備化

前講の[交差不等式の二乗評価](../VNP6/index.md#cor-vnp6-crossing-quadratic)は、一つのpriceにおける八点の距離を制約します。しかし中点の曲率を調べるには四点しかありません。そこで新点を多数配置し、その局所的な距離を平均して平行四辺形則を取り出します。最後に中点を繰り返し追加し、完備な空間へ移します。

一次資料：Claude (Anthropic), [VP ≠ VNP over every field, v1](https://hexagonmath.org/2611.00954v1), C/O。対応する形式化は [Means.lean](https://github.com/anthropics/formal-math/blob/11b6c7e3c927df2658f513b6b68ea7f8929c62c5/vp-vnp/Paper/Means.lean)、[Fan.lean](https://github.com/anthropics/formal-math/blob/11b6c7e3c927df2658f513b6b68ea7f8929c62c5/vp-vnp/Paper/Fan.lean)、[Curvature.lean](https://github.com/anthropics/formal-math/blob/11b6c7e3c927df2658f513b6b68ea7f8929c62c5/vp-vnp/Paper/Curvature.lean)。ここでは平均の構成を可算個の収束部分列で行い、局所的な幾何の論証を再構成します。

直接前提：[VNP6](../VNP6/index.md)、[VNP5](../VNP5/index.md)、[VNP3](../VNP3/index.md)、[NPCG1](../../../幾何系/NPCG/NPCG1/index.md)、[NPCG4](../../../幾何系/NPCG/NPCG4/index.md)、[NPCG6](../../../幾何系/NPCG/NPCG6/index.md)、[NPCG7](../../../幾何系/NPCG/NPCG7/index.md)、[NPCG8](../../../幾何系/NPCG/NPCG8/index.md)。体 $K$ は固定し、距離を $|ab|=d(a,b)$ と略記します。

## 1. 格子上の平均距離

二枚の整数格子を考えます。各点を $(b,P)$、$b\in\{0,1\}$、$P=(i,k)\in\mathbb Z^2$ と書きます。各整数 $n\ge1$ に対してこの集合上のprice $W_n$ があり、同じ枚の点間には一定の $\Lambda\ge0$ による上界

$$
W_n((b,P),(b,P+g))\le\Lambda(|g_1|+|g_2|)
$$

があるとします。平均を取る窓は $0\le i<n^2,\ 0\le k<n$ の長方形です。二枚を合わせた $2n^3$ 点での算術平均を $E_n$ とします。固定した整数ベクトル $g$ による窓の平行移動で入れ替わる点は、高々二枚合わせて $4(|g_1|n+|g_2|n^2)$ 個です。従って一様有界な量の平均の差は $n\to\infty$ で0になります。

距離の二乗は固定した変位ごとに有界です。変位は可算個なので、一つずつ収束部分列を取り、その第 $j$ 段の部分列の第 $j$ 項を（添字が増加するように）選ぶと、全変位に共通な収束部分列が得られます。後で有限個の有界な量の平均も同じ手順で追加できます。以下の $E$ はこの共通部分列に沿う平均の極限を表します。

大きな変位をそのまま測ると、細かな凹凸が残ります。変位を整数倍して、その距離を倍率で割る操作で長距離の増加率を取り出します。

<a id="def-vnp7-mean-length"></a>

<!-- formal-statement-start -->
> **定義（格子の平均距離と漸近長）**
>
> 上記の条件を満たすprice列 $W_n$ と共通収束部分列について、$g\in\mathbb Z^2$ の平均距離を

$$
\nu(g)=\sqrt{E\,W_n((b,P),(b,P+g))^2}
$$

> とする。漸近長は

$$
N(g)=\inf_{S\in\mathbb N,\ S\ge1}\frac{\nu(Sg)}S
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-vnp7-mean-length -->
**定義の確認**：VNP3の[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws)で、二点 $a,c$ の距離が1のpriceを整数格子へ引き戻します。

$(b,i,k)$ を $i$ が偶数なら $a$、奇数なら $c$ に送ります。変位 $g$ による距離は第一成分の偶奇だけで決まるので、$\Lambda=1$ の条件を満たします。

窓内の全点で二乗値が同じであることから、

$$
\nu(g)=\begin{cases}1 & g_1\text{ が奇数},\\0 & g_1\text{ が偶数}.\end{cases}
$$

$S=2$ なら必ず $\nu(2g)=0$ です。全商が非負なので $N(g)=0$。平均距離が非零でも長距離での増加率は零になり得ます。
<!-- definition-example-end -->

## 2. 交差評価から平行四辺形則へ

平均距離には三角不等式が残ります。さらに前講の二乗評価を保存することが肝心です。

<a id="thm-vnp7-mean-parallelogram"></a>

<!-- formal-statement-start -->
> **補題（漸近長の平行四辺形則）**
>
> [格子の平均距離と漸近長](#def-vnp7-mean-length) の条件の下で $N$ は非負、対称、劣加法的、$N(kg)=|k|N(g)$（整数 $k$）を満たし、

$$
N(g)=\lim_{S\to\infty}\frac{\nu(Sg)}S,\qquad
N(a+b)^2+N(a-b)^2=2N(a)^2+2N(b)^2
$$

> がすべての $a,b,g\in\mathbb Z^2$ について成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**平均と極限。** $W_n$ は擬距離なので対角零・対称性・三角不等式があります。窓を $-g$ だけ移して平均を取ると $\nu(-g)=\nu(g)$。変位 $g+h$ の距離は変位 $g$ の距離と、出発点を $g$ だけ移した変位 $h$ の距離の和以下です。非負な量 $A,B$ について有限平均の Cauchy–Schwarz 不等式から

$$
E_n(A+B)^2\le(\sqrt{E_n A^2}+\sqrt{E_n B^2})^2
$$

です。窓の移動誤差を極限で消すと $\nu(g+h)\le\nu(g)+\nu(h)$ となります。

固定した $S\ge1$ に対して $r=qS+s,\ 0\le s<S$ と割り算すると $\nu(rg)\le q\nu(Sg)+\nu(sg)$。後者は $s$ の有限範囲で有界なので、$r$ で割った上極限は $\nu(Sg)/S$ 以下です。下極限は定義により $N(g)$ 以上です。$S$ の下限を取ると極限が存在し $N(g)$ に一致します。劣加法性・対称性は $\nu$ の対応する式を同じ倍率で割って極限を取れば保存されます。正整数 $k$ について

$$
N(kg)=k\lim_{S\to\infty}\frac{\nu(Skg)}{Sk}=kN(g).
$$

$k=0$ と負整数は対角零と対称性から従います。

**二乗評価の保存。** 八点 $x,v,y,u,o,o',w,w'\in\mathbb Z^2$ を固定します。[交差不等式の二乗評価](../VNP6/index.md#cor-vnp6-crossing-quadratic) において、これらに共通の出発点 $(b,P)$ を加え、各距離を $W_n$ で測り、$p=|xv|,q=|yu|,t_0=\tau>0$ と選びます。左辺は $2(|xv|^2+|yu|^2)$。例えば右辺の $p|xo|$ の平均は

$$
E_n(|xv||xo|)\le\sqrt{E_n|xv|^2}\sqrt{E_n|xo|^2}.
$$

八つの外側項それぞれにこの操作を施します。平行移動の誤差を消した後、$\nu$ は前講の二乗評価を、重み $p=\nu(x-v),q=\nu(y-u)$ として満たします。さらに八点すべてを $S$ 倍し、式全体を $S^2$ で割り、$S\to\infty$ とすると、同じ式が $\nu$ を $N$ へ置き換えて成立します。

ここに $(x,v,y,u)=(p,-p,q,-q)$、$(o,o',w,w')=(a,-a,b,-b)$ を入れます（この段階の $p,q$ は点であり重みではありません）。斉次性で $N(2p)=2N(p)$、対称性で $N(-p+a)=N(p-a)$ です。両辺を4で割り、外側の項を左辺へ移すと

$$
N(p)\partial p+N(q)\partial' q
\le\tau(N(p)^2+N(q)^2)+\frac{Q}{2\tau},
$$

$$
\begin{aligned}
\partial p&=2N(p)-N(p-a)-N(p-b),\\
\partial' q&=2N(q)-N(q-a)-N(q+b),\\
Q&=N(a)^2+N(b)^2 .
\end{aligned}
$$

左辺を大きくできる点を探すのが次の操作です。

**差分の平均。** $c=a+b,e=a-b,f=N(c),f'=N(e),\kappa=N(a)+N(b)$ とします。整数 $R\ge1,M=R^2$ を選び $A_i=Mc+ie,\ B_i=Me+ic$（$0\le i<R$）とします。$\delta_i=N(A_i-a)-N(A_i-2a)$ と置くと $A_{i+1}-a=A_i-b$、$A_{i+1}-2a=A_i-c$ なので

$$
\partial A_i+\partial(A_i-a)
=2(N(A_i)-N(A_i-c))+\delta_i-\delta_{i+1}.
$$

実際左辺は $2N(A_i)+N(A_i-a)-N(A_i-b)-N(A_i-2a)-N(A_i-c)$ で、右辺を展開しても一致します。逆三角不等式から $|\delta_i|\le N(a)$。

整数 $t\ge0$ で $H(t)=N(tc+ie)$ と置きます。斉次性と劣加法性で $2H(t+1)\le H(t)+H(t+2)$。従って最後の差分 $H(M)-H(M-1)$ は全差分の平均 $(H(M)-H(0))/M$ 以上です。$H(M)\ge Mf-i f'$、$H(0)=if'$ なので

$$
N(A_i)-N(A_i-c)\ge f-2if'/M\ge f-2Rf'/M.
$$

和を取れば中間の $\delta_i$ が消え、

$$
\sum_{i=0}^{R-1}(\partial A_i+\partial(A_i-a))
\ge2R(f-2Rf'/M)-2N(a).
$$

$a,-b$ に対して同じ恒等式を使うと $c,e$ が交換され、$B_i$ における $\partial'$ の和は $2R(f'-2Rf/M)-2N(a)$ 以上になります。

**誤差を消す。** $\kappa$ は $f,f',N(a),N(b)$ 以上です。$p=A_i$ または $A_i-a$、$q=B_i$ または $B_i-a$ の対応する組では、逆三角不等式により $|N(p)-Mf|,|N(q)-Mf'|\le2R\kappa$。また $|\partial p|,|\partial' q|\le\kappa$ です。従って $N(p)\partial p$ を $Mf\partial p$ に替えると誤差は高々 $2R\kappa^2$ です。$\tau=1/(2M)$ を選べば

$$
\frac{N(p)^2}{2M}
\le\frac{Mf^2}{2}+2Rf\kappa+\frac{2R^2\kappa^2}M
\le\frac{Mf^2}{2}+4R\kappa^2.
$$

$q$ でも同じ上界で $f$ を $f'$ に替えます。よって各組について

$$
Mf\partial p+Mf'\partial' q
\le M((f^2+f'^2)/2+Q)+12R\kappa^2.
$$

二組ずつ $R$ 回加え、上で求めた差分和の下界を左辺に代入し、$2RM>0$ で割ると

$$
\begin{aligned}
f^2+f'^2-4Rff'/M-(f+f')N(a)/R
&\le(f^2+f'^2)/2+Q+12R\kappa^2/M.
\end{aligned}
$$

$M=R^2$、各値が $\kappa$ 以下であることから、移項して倍にすると

$$
f^2+f'^2\le2Q+36\kappa^2/R.
$$

$R\to\infty$ で平行四辺形則の一方向の不等式が得られます。この不等式を $a+b,a-b$ に適用すると

$$
4N(a)^2+4N(b)^2\le2N(a+b)^2+2N(a-b)^2.
$$

従って逆向きも成立し、等号です。
<!-- proof-end -->

この結論は任意の擬距離の平均には成立しません。例えば整数格子上の長さ $N(i,k)=|i|+|k|$ は斉次で劣加法的ですが、$a=(1,0),b=(0,1)$ で平行四辺形則の左辺8、右辺4です。二乗評価を使った差分の上界が一般の擬距離では保証されないのです。

## 3. fanから四つの評価を得る

目標は中点 $m$ に対する [Bruhat–Tits CN不等式](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn) です。$|xm|,|vm|\le D,\ |xv|=2D$ なら三角不等式で両方とも $D$。$B=|zm|$、$\Gamma=B^2-(|zx|^2+|zv|^2)/2$ と置きます。目標は $\Gamma\le-D^2$ です。

整数 $T\ge2$ と $\theta=1/T$ を固定します。[fanの距離評価](../VNP5/index.md#thm-vnp5-fan) を二枚（始点 $x,v$、共通終点 $m$）に同時適用します。各枚の底辺点 $\gamma_i$ と fan 点 $G(i,j)$ について $0\le i\le n^2,\ 0\le j\le Tn^2$、$L_i=|z\gamma_i|$、$\rho_j=1-j\theta/n^2$ です。枚の添字は省略します。終端 $G(n^2,j)$ は他方の枚の同じ添字と距離0です。

格子点 $(i,k)$ を $G(i',j')$ へ送ります。$i'$ は $i$ を区間 $[0,n^2]$ に切り詰めた整数、$j'$ は $i+k+n$ を $[0,Tn^2]$ に切り詰めた整数です。この距離を $n^2$ 倍したものを $W_n$ とします。[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) によりpriceです。$L_i$ も切り詰めて全整数に延長します。

縦方向一歩の上界は $\theta L_i/n^2$、横方向は $\rho_jD/n^2$。また $0\le L_i\le D+B$、$|L_{i+1}-L_i|\le D/n^2$ です。切り詰めは整数差の絶対値を増やさないので、変位 $(h_1,h_2)$ に対し横・縦の順に動けば

$$
W_n(P,P+h)\le D|h_1|+\theta(D+B)|h_1+h_2|
\le(2D+B)(|h_1|+|h_2|).
$$

第1節の条件を満たします。共通収束部分列には $E_n L_i^2$ も含め、$\Lambda_2=E L_i^2$ と置きます。$0\le\Lambda_2\le(D+B)^2$ です。

<a id="lem-vnp7-fan-four"></a>

<!-- formal-statement-start -->
> **補題（fanの漸近長の四評価）**
>
> 体 $K$ のprice上の四点 $x,v,m,z$ と $D\ge0$ が $|xm|,|vm|\le D,\ |xv|=2D$ を満たすとする。上の二枚のfanから作った $N,\theta,B,\Gamma,\Lambda_2$ に対して、任意の整数 $A\ge0$ で

$$
\begin{aligned}
N(1,0)&\ge D,\\
N(1,-1)^2&\le D^2(1-\theta+\theta^2),\\
N(0,1)^2&\le\theta^2\Lambda_2,\\
N(1,-1-A)^2&\ge A^2\theta^2\Lambda_2
+A\theta\Gamma-4A\theta^2 D(D+B).
\end{aligned}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

**第一評価。** 枚ごとに始点 $x_b$（$x$ または $v$）から格子点の写像先への距離を $F(i,k)$ とします。三角不等式で $n^2|F(i+1,k)-F(i,k)|\le2D+B$。窓の $i$ 方向に和を取ると

$$
E_n n^2(F(i+1,k)-F(i,k))
=\frac1{2n}\sum_{b,k}(F(n^2,k)-F(0,k)).
$$

二枚の終端の距離は0なので、終端の二つの $F$ の和は $|xv|=2D$ 以上です。始点で $j=k+n<2n$、従って $F(0,k)\le2\theta|zx_b|/n$。上式の下極限は $D$ 以上になります。

固定整数 $S\ge1$ の差分は一歩の差分 $S$ 個の和です。各一歩差分に $n^2$ を掛けた量は一様有界なので、窓を固定幅だけずらした誤差は0へ収束します。従って $E_n n^2(F(i+S,k)-F(i,k))$ の下極限は $SD$ 以上です。各点でこの符号付き差分は $W_n(P,P+(S,0))$ 以下、有限平均の Cauchy–Schwarz 不等式でその平均は二乗平均の平方根以下です。ゆえに $\nu(S,0)\ge SD$、全 $S$ の下限で第一評価です。

**第二・第三評価。** 十分大きな $n$ では窓内の $j=i+k+n$ は $Tn^2$ 以下です。変位 $(1,-1)$ は $j$ を変えないので

$$
W_n(P,P+(1,-1))\le \rho_jD\le(1-\theta i/n^2)D.
$$

$u=i/n^2$ は $[0,1]$ 内、$E_n u=(n^2-1)/(2n^2)$ です。$(1-\theta u)^2=1-2\theta u+\theta^2u^2\le1-2\theta u+\theta^2$。平均の極限と $N(g)\le\nu(g)$ で第二評価を得ます。変位 $(0,1)$ は縦一歩なので $W_n\le\theta L_i$、二乗して平均すれば第三評価です。

**第四評価。** 固定した $A\ge0,S\ge1$ に対し変位 $S(1,-1-A)$ は $i$ を $S$ 増やし、$j$ を $AS$ 減らします。$n$ を十分大きくして $AS\le n$、$n^2+2n\le Tn^2$、$n^2+2n\le2n^2$ とすれば、$j$ と $j-AS$ は範囲内です。$L'=L_{i+S},L=L_i,\rho=1-j\theta/n^2$ とします。[fanの距離評価](../VNP5/index.md#thm-vnp5-fan) による $z$ からの距離の差を使うと

$$
W_n(P,P+S(1,-1-A))\ge|n^2\rho(L'-L)+AS\theta L'|.
$$

これは移動後の $z$ からの距離が $(\rho+AS\theta/n^2)L'$ だからです。$c_0=AS\theta\ge0$ と置いて平方すると

$$
\begin{aligned}
W_n^2
&\ge c_0^2 L'^2+2c_0 n^2\rho L'(L'-L)\\
&\ge c_0^2 L'^2+c_0 n^2\rho(L'^2-L^2).
\end{aligned}
$$

最後は $2L'(L'-L)-(L'^2-L^2)=(L'-L)^2\ge0$ と $\rho\ge0$ によります。$1-\rho\le2\theta$、$n^2|L'-L|\le SD$ から

$$
n^2|L'^2-L^2|\le2SD(D+B).
$$

従って $\rho$ を1に置き換える際の誤差は高々 $4A S^2\theta^2 D(D+B)$。

平均の極限では $E L'^2=\Lambda_2$。また

$$
E_n n^2(L_{i+1}^2-L_i^2)
=\frac12\sum_b(L_{n^2}^2-L_0^2)=\Gamma.
$$

一歩差分を $n^2$ 倍した量は $2D(D+B)$ 以下の絶対値を持つため、窓の平行移動の誤差を消せます。$S$ 歩を足せば極限は $S\Gamma$ です。以上を代入し

$$
\frac{\nu(S(1,-1-A))^2}{S^2}
\ge A^2\theta^2\Lambda_2+A\theta\Gamma-4A\theta^2D(D+B).
$$

全 $S\ge1$ で同じ下界なので、非負の商の極限を取って第四評価を得ます。右辺が負でも平方根を取る必要はありません。
<!-- proof-end -->

## 4. CN不等式の証明

四評価のうち、最後の式には $A^2$ の項があります。平行四辺形則を使うと同じ二次項を上から抑えられるため、差し引いて一次項を比較できます。

<a id="thm-vnp7-price-cn"></a>

<!-- formal-statement-start -->
> **定理（price上の中点二乗評価）**
>
> 固定した体 $K$ の任意のprice上の点 $x,v,m,z$ と実数 $D\ge0$ が $|xm|,|vm|\le D,\ |xv|=2D$ を満たすとき

$$
|zm|^2\le\frac{|zx|^2+|zv|^2}{2}-D^2.
$$
<!-- formal-statement-end -->

原著の Theorem C.3 に対応する中点の評価です。

<!-- proof-start -->
### 証明

前節と同じ記号を使います。整数 $\ell\ge-1$ で $h(\ell)=N(1,-1-\ell)^2$ と置きます。[漸近長の平行四辺形則](#thm-vnp7-mean-parallelogram) を $a=(1,-1-\ell),b=(0,1)$ に適用すると

$$
h(\ell+1)+h(\ell-1)-2h(\ell)=2N(0,1)^2.
$$

[fanの漸近長の四評価](#lem-vnp7-fan-four) の第三式から $\psi(\ell)=h(\ell)-\ell^2\theta^2\Lambda_2$ の二階差分は非正です。従って一階差分は単調非増加で、$A\ge1$ について

$$
\psi(A)\le\psi(0)+A(\psi(0)-\psi(-1)).
$$

左辺は第四評価から $A(\theta\Gamma-4\theta^2D(D+B))$ 以上です。右辺は第一・第二評価で

$$
D^2(1-\theta+\theta^2)+A(D^2(-\theta+\theta^2)+\theta^2\Lambda_2)
$$

以下です。$A>0$ で割り、固定した $\theta$ の下で $A\to\infty$ とすれば

$$
\theta\Gamma-4\theta^2D(D+B)
\le D^2(-\theta+\theta^2)+\theta^2\Lambda_2.
$$

$\theta>0$ で割り、$\Lambda_2\le(D+B)^2$ を用いると

$$
\Gamma+D^2\le
\theta(D^2+(D+B)^2+4D(D+B)).
$$

右辺の括弧は元の四点だけで決まり、$T$ に依存しません。$\theta=1/T$ で $T\to\infty$ とすれば $\Gamma\le-D^2$。定義を戻して結論です。$D=0$ の場合にも割った量は $A,\theta$ だけなので成立します。
<!-- proof-end -->

たとえば $|xv|=6,\ |zx|=4,\ |zv|=5$ で $m$ が中点なら、$|zm|^2\le(16+25)/2-9=23/2$。また $z$ も中点なら右辺は0となり $|zm|=0$。擬距離では点の一致ではなく距離0までが結論です。

## 5. 中点を追加して完備化する

CNの評価は既に存在する中点についての定理です。中点が存在しない集合もあるため、それを追加する手続きが必要です。

<a id="thm-vnp7-price-completion"></a>

<!-- formal-statement-start -->
> **命題（priceのCAT(0)完備化）**
>
> 固定した体 $K$ に関する非空集合 $V$ 上のprice $d$ に対して、完備なCAT(0)距離空間 $(X,d_X)$ と写像 $f:V\to X$ が存在し、$d_X$ は同じ体 $K$ のpriceであり、

$$
d_X(f(a),f(b))=d(a,b)\qquad(a,b\in V)
$$

> が成り立つ。$d$ が距離なら $f$ は単射である。
<!-- formal-statement-end -->

原著の Proposition C.4 に対応します。CAT(0)という語は [CAT(0)条件とCN条件の同値性](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-equivalence) の意味で使います。

<!-- proof-start -->
### 証明

$V_0=V$ とします。各段階で $V_j$ の全点対 $(s,t)$ に新点 $m_{st}$ を加え、確率 $1/2$ ずつ $s,t$ に置く [priceの確率的拡張](../VNP5/index.md#thm-vnp5-random-extension) を同時に適用します。古い距離が保存され、新点から両端への距離は $d(s,t)/2$ 以下です。三角不等式でその和は $d(s,t)$ 以上なので両方等号です。

和集合 $V_\infty=\bigcup_{j\ge0}V_j$ 上では点対が初めて同じ段に入ったときの距離を採用します。その後は変わらないので一意に決まります。任意の有限個の点は共通の段に入るため、priceの有限集合への引き戻しによる[定義](../VNP3/index.md#def-vnp3-price) から全体もpriceです。すべての点対に中点があり、[price上の中点二乗評価](#thm-vnp7-price-cn) により第三点すべてについて二乗評価を満たします。

[NPCG1の零距離商](../../../幾何系/NPCG/NPCG1/index.md#thm-npcg1-zero-distance-quotient) を取り距離空間 $S$ を得ます。商の各点の代表元を選ぶ写像による引き戻しが商距離なので、[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) で商距離もpriceです。中点と二乗評価は距離だけの式なので商へ移ります。[Cauchy列による完備化](../../../幾何系/NPCG/NPCG1/index.md#thm-npcg1-pseudometric-completion) で完備距離空間 $X$ を作り、$S$ をその稠密な部分集合とみなします。

まず $a,b\in S$ の中点について、第三点 $z\in X$ を $S$ の点列 $z_j\to z$ で近似します。距離の差は $d_X(z_j,z)$ 以下で0へ収束しますから、両辺の二乗の極限を取ると評価は $z\in X$ にも成立します。

次に $a,b\in X$ を任意に取り、$a_j,b_j\in S$ をそれぞれに収束させます。$m_j\in S$ を両点の中点とします。$R=d_X(a_k,b_k)$、$e=d_X(a_j,a_k)+d_X(b_j,b_k)$ と置けば

$$
d_X(a_j,b_j)\le R+e,\qquad
d_X(m_j,a_k)\le (R+e)/2+e\le R/2+2e.
$$

$b_k$ についても同じ上界です。$a_k,b_k$ の中点 $m_k$ の二乗評価に第三点 $m_j$ を入れると

$$
d_X(m_j,m_k)^2\le (R/2+2e)^2-R^2/4=2Re+4e^2.
$$

$R$ は収束列の距離で有界、$e\to0$（$j,k\to\infty$）なので $(m_j)$ はCauchy列です。完備性により $m_j\to m\in X$。中点の距離式の極限を取れば $d_X(a,m)=d_X(b,m)=d_X(a,b)/2$。第三点 $z\in X$ の二乗評価も同じ操作で移ります。

この評価を別の中点 $m'$ に適用すると $d_X(m,m')^2\le0$ なので中点は一意です。各区間を中点で二分して二進有理数時刻の点を定めます。

隣接点の距離は段階 $l$ で $d_X(a,b)/2^l$ です。任意の二進時刻 $s<t$ の点間距離はこの刻みの和以下です。

逆に始点から時刻 $s$ の点、二点間、時刻 $t$ の点から終点への三距離の和は全距離以上なので、二点間距離は $(t-s)d_X(a,b)$ 以上でもあります。従って等号です。

完備性により二進有理数から任意の実数時刻へ延長でき、その距離式は連続性で保存されるので測地線分を得ます。従って [CAT(0)条件とCN条件の同値性](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-equivalence) を適用できます。

最後に $X$ の各点 $a$ について $S$ の近似列 $s_j(a)$ を一つ選びます。$d_j(a,b)=d_X(s_j(a),s_j(b))$ は $S$ のpriceの引き戻しです。四点評価により

$$
|d_j(a,b)-d_X(a,b)|\le d_X(s_j(a),a)+d_X(s_j(b),b)\to0.
$$

[priceの保存則](../VNP3/index.md#thm-vnp3-price-laws) で $d_X$ もpriceです。$f$ を包含・商写像・完備化への埋め込みの合成とすれば古い距離を保存し、$d$ が距離なら異なる二点の像は異なります。
<!-- proof-end -->

### 使える幾何学

完備CAT(0)空間 $X$ を得たので、原論文の Toolkit の評価を既習結果から取り出せます。

1. [任意比の二乗距離評価](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-interpolation)：端点 $a,b$ の比率 $t\in[0,1]$ の点 $p_t$ について

$$
d(z,p_t)^2\le(1-t)d(z,a)^2+td(z,b)^2-t(1-t)d(a,b)^2.
$$

2. [四点の平方差評価](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-four-point-product) に $(p,q,r,s)=(x,y,u,v)$ を代入します。

$$
d(x,v)^2+d(y,u)^2
\le d(x,u)^2+d(y,v)^2+2d(x,y)d(u,v).
$$

さらに $2d(x,y)d(u,v)\le d(x,y)^2+d(u,v)^2$ なので、対角線の平方和は四辺の平方和以下です。等号なら二つの不等式とも等号なので $(d(x,y)-d(u,v))^2=0$。$y,u$ を交換して他方の対辺についても等長を得ます。

3. 等しい重み $1/N$ の $N\ge1$ 個の点 $x_i$ に対する [重心の存在](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-barycenter-existence) と [分散不等式](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-variance-inequality) から、重心 $b$ は

$$
\sum_i d(z,x_i)^2\ge\sum_i d(b,x_i)^2+N d(z,b)^2
$$

を満たします。[重心の安定性](../../../幾何系/NPCG/NPCG8/index.md#thm-npcg8-barycenter-stability) により二組の重心の距離は対応する点間距離の平均以下です。

4. 非空閉凸集合 $C$ には [距離射影の存在と一意性](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-projection-existence) と [射影のPythagoras型不等式](../../../幾何系/NPCG/NPCG7/index.md#thm-npcg7-pythagorean) が適用でき、$p=P_C(x)$ と $z\in C$ について $d(x,p)^2+d(p,z)^2\le d(x,z)^2$ です。

5. 有限個の完備CAT(0)空間の積に距離 $d_{\rm prod}(x,y)=\sqrt{\sum_i d_i(x_i,y_i)^2}$ を入れると、これも完備CAT(0)空間です。三角不等式は有限次元の Minkowski 不等式から従います。積のCauchy列は各座標でもCauchy列で、各座標の極限への距離の平方和は有限和なので0へ収束します。座標ごとの測地線を同じ比率で取れば、二時刻間の距離は積距離に時刻差を掛けた値です。中点も座標ごとに取れ、各座標のCN不等式を足すと積のCN不等式になります。[CN条件との同値性](../../../幾何系/NPCG/NPCG4/index.md#thm-npcg4-cn-equivalence) が適用できます。ここで述べたのは距離空間としての性質であり、積距離がpriceであるとの主張ではありません。

6. 四点 $x,y,u,v$ の辺と対角線が次を満たすとします。

$$
\begin{aligned}
d(x,y)=d(u,v)&=\delta,\\
d(x,u)=d(y,v)&=h,\\
d(x,v)^2=d(y,u)^2&=\delta^2+h^2.
\end{aligned}
$$

[四辺形の等号から平坦な領域](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-flat-quadrilateral) を巡回順 $x,y,v,u$ に適用できます。平面表示では対角線の中点が一致するので、$x$ を原点にすれば $y=e,u=f,v=e+f$ と書けます。

$$
|e|^2=\delta^2,\quad |f|^2=h^2,\quad |e+f|^2=\delta^2+h^2.
$$

この三式から $2\langle e,f\rangle=0$。辺 $xu,yv$ 上の比率 $s,t\in[0,1]$ の点 $a,b$ はそれぞれ $sf,e+tf$ と表せます。従って

$$
d(a,b)^2=|e+(t-s)f|^2=\delta^2+h^2(t-s)^2.
$$

この等号は、後続講義で距離の等号から平坦な配置を取り出す際に使います。

元の集合がすでに完備であっても中点が存在するとは限りません。二点だけの距離空間では異なる二点の中点は存在しません。完備化だけでなく、先に中点を追加することが必要です。

## 6. 演習

### A1. 平均窓の大きさ
- Level: A
- ID: VNP7-A1

$n=4$ で二枚の窓の総点数を求め、変位 $(2,-1)$ による窓の移動で入れ替わる点数の上界を求めよ。

<!-- solution-start -->
**詳細解答**：一枚は $16\times4=64$ 点なので二枚で128点。横に2動かすと左右に幅2、縦に1動かすと上下に幅1の帯が入れ替わります。各枚の対称差は高々 $2(2\cdot4+1\cdot16)=48$ 点、二枚で96点です。第1節の一般上界 $4(|g_1|n+|g_2|n^2)$ に一致します。固定変位なら総点数で割った上界は $2(|g_1|/n^2+|g_2|/n)\to0$ です。
<!-- solution-end -->

### A2. 漸近長の下限
- Level: A
- ID: VNP7-A2

固定した $g$ について $\nu(3g)=5$、$\nu(g)=2,\nu(2g)=4$ とする。劣加法性だけから $\nu(11g)$ および $N(g)$ の上界を求めよ。

<!-- solution-start -->
**詳細解答**：$11=3\cdot3+2$。劣加法性で $\nu(11g)\le3\nu(3g)+\nu(2g)=19$。[格子の平均距離と漸近長](#def-vnp7-mean-length) の下限の候補 $S=3$ から $N(g)\le5/3$。$S=11$ の候補は高々 $19/11$ ですが、この情報では $5/3$ の方が小さい上界です。
<!-- solution-end -->

### A3. 平行四辺形則の逆向き
- Level: A
- ID: VNP7-A3

整数倍に斉次な非負対称長さ $N$ に対して、全 $a,b$ で平行四辺形則の左辺が右辺以下と仮定する。逆向きを証明せよ。

<!-- solution-start -->
**詳細解答**：仮定の二ベクトルを $c=a+b,e=a-b$ とすると、$c+e=2a,c-e=2b$ なので

$$
N(2a)^2+N(2b)^2\le2N(a+b)^2+2N(a-b)^2.
$$

斉次性で左辺は $4(N(a)^2+N(b)^2)$。2で割ると逆向きであり、元の不等式と合わせて等号です。
<!-- solution-end -->

### A4. 四評価の係数
- Level: A
- ID: VNP7-A4

$D=3,B=2,T=4,\Lambda_2=10$ のfanについて [fanの漸近長の四評価](#lem-vnp7-fan-four) の第二・第三評価と第四評価の $A=2$ における下界を求めよ。

<!-- solution-start -->
**詳細解答**：$\theta=1/4$ なので第二評価は $9(1-1/4+1/16)=117/16$、第三評価は $10/16=5/8$。第四評価の二次項は $4\cdot10/16=5/2$、一次項は $\Gamma/2$、誤差は $4\cdot2\cdot3\cdot5/16=15/2$。従って下界は $\Gamma/2-5$ です。負値の下界も許され、平方根を取るとは限りません。
<!-- solution-end -->

### B1. 差分の相殺
- Level: B
- ID: VNP7-B1

第2節の $A_i,\delta_i,\partial$ を用い、$R=3$ の差分和を $\delta_0,\delta_3$ と三つの $N(A_i)-N(A_i-c)$ で表し、下界を導け。

<!-- solution-start -->
**詳細解答**：[漸近長の平行四辺形則](#thm-vnp7-mean-parallelogram) の証明の恒等式を $i=0,1,2$ で加えます。$\delta_0-\delta_1+\delta_1-\delta_2+\delta_2-\delta_3=\delta_0-\delta_3$ なので

$$
\sum_{i=0}^2(\partial A_i+\partial(A_i-a))
=2\sum_{i=0}^2(N(A_i)-N(A_i-c))+\delta_0-\delta_3.
$$

各差分は $f-2if'/M$ 以上、$\delta_0-\delta_3\ge-2N(a)$ です。$\sum_{i=0}^2i=3$ から下界は $6f-12f'/M-2N(a)$。一般式で $i<R$ を一律 $R$ で抑えるより鋭い評価です。
<!-- solution-end -->

### B2. fanの斜め変位
- Level: B
- ID: VNP7-B2

$n=10,T=5,A=2,S=3,i=20,k=4$ とする。移動前後の $j,\rho$ を求め、$L'=L_{23}$ として $z$ からの距離の差による $W_n$ の下界を導け。

<!-- solution-start -->
**詳細解答**：変位は $(3,-9)$、移動後は $(23,-5)$。$j=20+4+10=34$、$j'=23-5+10=28$ でどちらも $[0,500]$ 内です。$\rho=1-34/500=466/500$、$\rho'=472/500$。従って逆三角不等式と $100$ 倍の定義で

$$
W_n\ge100|\rho'L'-\rho L|
=|(466/5)(L'-L)+(6/5)L'|.
$$

ここで $AS\theta=6/5$ です。これは [fanの漸近長の四評価](#lem-vnp7-fan-four) の第四式の出発点であり、負の縦変位で $\rho$ が増加することに注意します。
<!-- solution-end -->

### B3. 中点列の収束
- Level: B
- ID: VNP7-B3

第5節の記号で $R\le8$、$e\le1/100$ とする。中点列の距離の上界を求め、$e\to0$ で収束が保証される理由と、完備性の役割を述べよ。

<!-- solution-start -->
**詳細解答**：[priceのCAT(0)完備化](#thm-vnp7-price-completion) の証明に従い、両端からの距離は $R/2+2e$ 以下です。中点二乗評価に代入すると

$$
d_X(m_j,m_k)^2\le2Re+4e^2\le16/100+4/10000=401/2500.
$$

従って距離は $\sqrt{401}/50$ 以下です。$R$ が有界で $e\to0$ なら右辺は0へ収束するのでCauchy列です。この段階ではまだ極限点の存在を述べていません。$X$ の完備性を用いることで初めて極限点を $X$ 内に得ます。
<!-- solution-end -->

### C1. 二階差分からCNまで
- Level: C
- ID: VNP7-C1

第3節の四評価を用いる。$\theta$ を固定し、$\psi(\ell)=N(1,-1-\ell)^2-\ell^2\theta^2\Lambda_2$ と置く。二階差分を計算して $\Gamma+D^2$ の上界を得よ。最後の二つの極限の順序が重要な理由を述べよ。

<!-- solution-start -->
**詳細解答**：[漸近長の平行四辺形則](#thm-vnp7-mean-parallelogram) から $h(\ell+1)+h(\ell-1)-2h(\ell)=2N(0,1)^2$。平方の二階差分は $(\ell+1)^2+(\ell-1)^2-2\ell^2=2$ です。従って $\psi$ の二階差分は $2(N(0,1)^2-\theta^2\Lambda_2)\le0$。

差分を $1$ から $A$ まで加えると

$$
\psi(A)-\psi(0)\le A(\psi(0)-\psi(-1)).
$$

[fanの漸近長の四評価](#lem-vnp7-fan-four) の第四評価で $\psi(A)\ge A\theta\Gamma-4A\theta^2D(D+B)$。第二評価で $\psi(0)\le D^2(1-\theta+\theta^2)$、第一評価で $\psi(-1)\ge D^2-\theta^2\Lambda_2$ です。代入して $A\theta>0$ で割ると

$$
\Gamma+D^2\le
\frac{D^2(1-\theta+\theta^2)}{A\theta}
+\theta(D^2+\Lambda_2+4D(D+B)).
$$

固定した $\theta>0$ で $A\to\infty$ とすれば第一項は0。$\Lambda_2\le(D+B)^2$ で上界を一様化し、$\theta\to0$ とすれば $\Gamma+D^2\le0$。逆に $A$ を固定したまま $\theta\to0$ とすると第一項は $D>0$ のとき発散します。先に $A$ を大きくする理由はこの誤差項です。
<!-- solution-end -->

### B4. 平坦な四辺形の辺上の距離
- Level: B
- ID: VNP7-B4

完備CAT(0)空間の四点が第5節の平坦な四辺形の条件を $\delta=3,h=4$ で満たすとする。辺 $xu,yv$ のそれぞれ比率 $1/4,3/4$ の点 $a,b$ の距離を求めよ。また両対角線の平方が25という仮定を外すと、なぜ同じ計算を保証できないか。

<!-- solution-start -->
**詳細解答**：四辺の平方和は $2\cdot9+2\cdot16=50$、対角線の平方和も $2\cdot25=50$。[四辺形の等号から平坦な領域](../../../幾何系/NPCG/NPCG6/index.md#thm-npcg6-flat-quadrilateral) により平面表示ができ、第5節の計算に $s=1/4,t=3/4$ を代入すると

$$
d(a,b)^2=9+16(3/4-1/4)^2=13.
$$

距離は $\sqrt{13}$ です。対角線の条件を外すと四辺形不等式の等号も辺の直交性も保証されません。例えば平面で辺長3と4の平行四辺形のなす角が60度なら、内積は $3\cdot4/2=6$ であり、平方距離に交差項 $2(1/2)6=6$ が加わります。
<!-- solution-end -->

## 7. 次の講への接続

priceを完備CAT(0)空間の距離として実現できました。次講では有限体上の行列階数を用いた距離を取り上げ、平均距離の増加率を調べます。局所的な中点評価から得た幾何学が、その増加率の制約に使われます。
