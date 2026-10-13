# VAR5 第二変分・Jacobi場・共役点

[VAR4のエネルギー停留曲線](../VAR4/index.md#prop-var4-metric-el-connection)として測地線を得ても、その曲線が端点間で最短とは限りません。球面では赤道の小さな弧が最短である一方、半周を越えた弧は遠回りです。第一変分はどちらもゼロなので、両者を区別するには「横へずらすとエネルギーが二次でどちらに動くか」を調べる必要があります。

[VAR2の第二変分と最小性の必要条件](../VAR2/index.md#thm-var2-necessary)はその入口でした。しかし一般の関数の二次微分とは異なり、測地線では周囲の空間の**曲率**が二次項に現れます。本章では [GEO17の一般的な第二変分公式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)を再証明せず、模型上で一項ずつ計算し、Jacobi場が測地線族の微分として本当に現れること、共役点の直前・ちょうど・直後で何が違うかを見ます。

本章を読む際は、測地線に沿う共変微分を $D/dt$、曲率を $R(X,Y)Z$ と書き、GEO17と同じ符号規約（正曲率の法方向で $R(V,\dot\gamma)\dot\gamma$ が正）を用います。以後エネルギーは $E(\gamma)=\frac12\int|\dot\gamma|^2dt$ です。

## 1. 第一変分からは見えない二次のずれ

滑らかなRiemann多様体 $(M,g)$ の測地線 $\gamma:[0,L]\to M$ を単位速とします。固定端点変分 $F(s,t)$ の変分ベクトル場を $V(t)=\partial_sF(0,t)$ とすると $V(0)=V(L)=0$ です。

[第二変分公式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)をこの $\gamma$ と $V$ に適用すると、

$$
\left.\frac{d^2}{ds^2}E(F(s,\cdot))\right|_{s=0}
=\int_0^L\left(
\left|\frac{DV}{dt}\right|^2-
g(R(V,\dot\gamma)\dot\gamma,V)
\right)dt.
$$

右辺は [指数形式](../../../幾何系/GEO/GEO17/index.md#def-geo17-index-form) $I(V,V)$ です。第一項は変分場が速く変化することへの正の罰則です。第二項は正曲率の場合にはその罰則を打ち消し、負曲率なら強めます。

固定端点で非零 $V$ に対し $I(V,V)<0$ を見つければ、$s=0$ で一次微分が0、二次微分が負です。Taylorの定理を $s$ に沿うエネルギーへ適用して

$$
E(F(s,\cdot))-E(\gamma)
=\frac{s^2}{2}I(V,V)+o(s^2)<0
$$

を得ます（十分小さい非零 $s$）。したがって測地線は局所エネルギー最小ではありません。逆に、**第二変分が非負という必要条件だけから極小性は断定できません**。[VAR2の十分条件](../VAR2/index.md#thm-var2-coercive-sufficient)には適切なノルムでの強い下界と剰余制御が必要でした。

ここで「固定端点の任意の場」が実際の変分を生むことも確認します。$V$ が滑らかで端点0なら、各点の指数写像を用いた

$$
F(s,t)=\exp_{\gamma(t)}(sV(t))
$$

は $|s|$ を十分小さくすると滑らかな固定端点変分です。$F(0,t)=\gamma(t)$、$\partial_sF(0,t)=V(t)$ なので、負の指数形式から得た方向は形式的な記号ではありません。この変分の各 $s$ 曲線が測地線である必要はありません。

## 2. 曲率を一つの実数に還元する

単位速測地線に沿う単位法ベクトル場 $N(t)$ が平行、すなわち

$$
g(N,\dot\gamma)=0,\quad |N|=1,\quad \frac{DN}{dt}=0
$$

であるとします。$\gamma$ と $N$ が張る平面の断面曲率を $K(t)$ とし、$V(t)=f(t)N(t)$（$f(0)=f(L)=0$）を取ります。

[曲率テンソルの対称性と断面曲率](../../../幾何系/GEO/GEO16/index.md#thm-geo16-curvature-symmetries)から

$$
\frac{DV}{dt}=f'N,\qquad
g(R(fN,\dot\gamma)\dot\gamma,fN)=K(t)f^2
$$

です。従って

$$
I(fN,fN)=\int_0^L\{(f')^2-K(t)f^2\}\,dt.
$$

この一次元化こそ「曲率の違いが最短性の違いになる」計算の要です。

<a id="prop-var5-constant-curvature-threshold"></a>
<!-- formal-statement-start -->
> **命題（定曲率の法方向と区間長の閾値）**  
> $[0,L]$ 上の単位速測地線 $\gamma$ に沿い、平行な単位法ベクトル場 $N$ が存在し、その法断面曲率が定数 $k$ であるとする。$f$ は連続かつ区分的 $C^1$ 級、$f(0)=f(L)=0$ とする。このとき

$$
I(fN,fN)=\int_0^L\{(f')^2-kf^2\}\,dt.
$$

> $k\le0$ なら任意の非零 $f$ に対し正である。$k>0$ なら $L<\pi/\sqrt{k}$ で正、$L=\pi/\sqrt{k}$ で非負かつ $f(t)=c\sin(\pi t/L)$ が零方向、$L>\pi/\sqrt{k}$ では負の方向が存在する。
<!-- formal-statement-end -->

この命題は全変分方向ではなく、指定した法方向についての主張です。一定曲率の球面・Euclid空間・双曲型模型ではこの方向を具体的に選べます。

### 証明の見取り図

[固定端の鋭いWirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)を使います。ここで $f$ は $f(0)=f(L)=0$ を満たします。この不等式によって、微分の正の項と曲率の負の項を同じ $\int f^2$ で比較できます。最初の正弦波は等号を達成するため、閾値が鋭いことも一度に分かります。

<!-- proof-start -->
### 証明

平行条件から $D(fN)/dt=f'N$ であり、曲率項は $kf^2$ なので第一式を得ます。

[固定端の鋭いWirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)は $C^1$ 級関数について証明されています。ここで用いる連続な区分的 $C^1$ 級関数にも適用できることを確認します。接続点は有限個なので、その各点の前後の幅 $2\varepsilon$ の区間を、両端の関数値と一階微分を一致させる三次Hermite補間で置き換えます。各区分で $f'$ は有界であり、補間区間の両端の関数値の差は $O(\varepsilon)$ です。したがって補間後の導関数も $\varepsilon$ に依らず有界に取れます。こうして得た $f_\varepsilon\in C^1([0,L])$ は端点0を保ちます。変更区間では $|f_\varepsilon-f|=O(\varepsilon)$、$|f_\varepsilon'-f'|=O(1)$ で、区間の全長が $O(\varepsilon)$ なので

$$
\int_0^L|f_\varepsilon-f|^2dt\longrightarrow0,\qquad
\int_0^L|f_\varepsilon'-f'|^2dt\longrightarrow0
$$

です。$f_\varepsilon$ にWirtinger不等式を適用し、両辺の積分の極限を取れば $f$ にも成立します。そこで区間長 $L$ と端点0の $f$ に適用すると

$$
\int_0^L(f')^2dt\ge\frac{\pi^2}{L^2}\int_0^Lf^2dt.
$$

よって

$$
I(fN,fN)\ge\left(\frac{\pi^2}{L^2}-k\right)\int_0^Lf^2dt.
$$

$k\le0$ または $k>0,\ L<\pi/\sqrt{k}$ なら係数は正で、$f\ne0$ なら積分も正です。$L=\pi/\sqrt{k}$ の場合、上界ではなく下界が0となり、$f=c\sin(\pi t/L)$ について直接

$$
\int_0^L f^2dt=\frac{c^2L}{2},\qquad
\int_0^L(f')^2dt=\frac{c^2\pi^2}{2L}
$$

なので $I=0$ です。$L>\pi/\sqrt{k}$ なら同じ $f$（$c=1$）に対して

$$
I(fN,fN)=\frac L2\left(\frac{\pi^2}{L^2}-k\right)<0.
$$

これで全場合が確認できました。$\square$
<!-- proof-end -->

ここで現れた $\pi/\sqrt{k}$ は偶然の係数ではありません。次節では**測地線の束が初めて再び集まる時刻**として同じ値が出てきます。

## 3. Jacobi場は測地線族を微分したもの

[GEO17のJacobi場の定義](../../../幾何系/GEO/GEO17/index.md#def-geo17-jacobi)は、$\gamma$ に沿う場 $J$ が

$$
\frac{D^2J}{dt^2}+R(J,\dot\gamma)\dot\gamma=0
$$

を満たすというものです。[測地線変分からJacobi方程式が出る定理](../../../幾何系/GEO/GEO17/index.md#thm-geo17-geodesic-variation-jacobi)を一般形のままなぞるより、実際に測地線族を微分してみます。

半径 $a>0$ の球面 $S_a^2\subset\mathbb R^3$ を取り、互いに直交する単位ベクトル $n,e_1,e_2$ を固定します。北極 $an$ を共有し、初速の方位だけを回した大円の族

$$
F(s,t)=a\left\{\cos\frac ta\,n+
\sin\frac ta(\cos s\,e_1+\sin s\,e_2)\right\}
$$

を考えます。$s$ は角度、$t$ は弧長です。各 $s$ で

$$
\partial_tF=-\sin\frac ta\,n+
\cos\frac ta(\cos s\,e_1+\sin s\,e_2),\quad
|\partial_tF|=1
$$

で、$\partial_t^2F=-F/a^2$ は球面法線方向です。従って接方向の加速度が0であり、各 $t\mapsto F(s,t)$ は測地線です。

<a id="prop-var5-sphere-variation"></a>
<!-- formal-statement-start -->
> **命題（球面の測地線族から得るJacobi場）**  
> 上記の球面、測地線族 $F$ と基準曲線 $\gamma(t)=F(0,t)$ について、その変分ベクトル場は

$$
J(t)=a\sin\frac ta\,e_2.
$$

> この $J$ はJacobi方程式を満たし、$J(0)=J(\pi a)=0$、$(DJ/dt)(0)=e_2$ である。$0<t<\pi a$ では零にならない。
<!-- formal-statement-end -->

### 証明の見取り図

方位角 $s$ で微分して得た場を球面の接ベクトルとして確かめます。$e_2$ は基準の大円全体で接方向かつ平行なので、Jacobi方程式は一変数の正弦波方程式になります。

<!-- proof-start -->
### 証明

まず $s$ で通常の微分を行うと

$$
\partial_sF(s,t)=a\sin\frac ta(-\sin s\,e_1+\cos s\,e_2)
$$

であり、$s=0$ では $J=a\sin(t/a)e_2$ です。基準曲線 $\gamma=a(\cos(t/a)n+\sin(t/a)e_1)$ は常に $e_2$ と直交するので $e_2$ は球面の接ベクトルです。Euclid空間で $e_2$ は一定ですから、その球面接成分である共変微分は $De_2/dt=0$ です。

よって

$$
\frac{DJ}{dt}=\cos\frac ta\,e_2,\qquad
\frac{D^2J}{dt^2}=-\frac1a\sin\frac ta\,e_2=-\frac1{a^2}J.
$$

球面の曲率 $1/a^2$ と $J\perp\dot\gamma$ から、[定曲率の曲率作用素](../../../幾何系/GEO/GEO16/index.md#prop-geo16-constant-curvature-tensor)は $R(J,\dot\gamma)\dot\gamma=J/a^2$ です。従って二項は打ち消し合い、Jacobi方程式が成立します。端点と初期微分は正弦・余弦へ $t=0,\pi a$ を代入して得られます。$\square$
<!-- proof-end -->

これは [GEO17の球面共役点の一般命題](../../../幾何系/GEO/GEO17/index.md#prop-geo17-sphere-conjugate)の、$S_a^2$ における**測地線族を実際に書いた例**です。Jacobi場は任意の横ずれではなく、**近くの測地線との一次のずれ**として解釈できます。ただし、一般の固定端点変分がすべて測地線変分であるわけではありません。

## 4. 共役点は最小性の破綻をいつ告げるか

[共役点の定義](../../../幾何系/GEO/GEO17/index.md#def-geo17-conjugate)では、$J(0)=J(T)=0$ を満たす非零Jacobi場があるとき $\gamma(T)$ は始点 $\gamma(0)$ に共役です。上の球面族では最初の共役時刻は $T=\pi a$ です。[指数写像の微分との同値](../../../幾何系/GEO/GEO17/index.md#thm-geo17-conjugate-exp)によれば、同じ時刻に指数写像の微分も退化します。

しかし **共役点がちょうど終点にあること**と、**共役点が区間内部にあること**は別です。これを半径 $a$ の球面で計算します。$e_2$ は大円に沿い平行で、$0\le t\le L$ に対し

$$
V(t)=\sin\frac{\pi t}{L}\,e_2
$$

とします。端点では $V=0$ です。球面の断面曲率は $1/a^2$ です。[第2節の定曲率の命題](#prop-var5-constant-curvature-threshold)に $f(t)=\sin(\pi t/L)$ を代入すると

$$
\begin{aligned}
I(V,V)
&=\int_0^L\left\{\frac{\pi^2}{L^2}\cos^2\frac{\pi t}{L}
-\frac1{a^2}\sin^2\frac{\pi t}{L}\right\}dt\\
&=\frac L2\left(\frac{\pi^2}{L^2}-\frac1{a^2}\right).
\end{aligned}
$$

したがって $L<\pi a$ ではこの方向で正、$L=\pi a$ では0、$L>\pi a$ では負です。最後の場合には第1節で構成した固定端点変分によって実際にエネルギーが下がります。

この計算は特定の場の符号を示しただけです。一方、[共役点がない区間での指数形式の正定値性](../../../幾何系/GEO/GEO17/index.md#thm-geo17-index-positive)は、共役点が $(0,L]$ に存在しなければ**すべての非零固定端点方向**に正であるという、より強い定理です。[区間内部の共役点が局所最短性を壊す定理](../../../幾何系/GEO/GEO17/index.md#thm-geo17-interior-conjugate-not-minimizing)も一般次元で証明済みです。

それでも半周大円は北極から南極への最短曲線です。球面の極座標を使えば任意の滑らかな極間曲線の長さは

$$
\ell=\int a\sqrt{\dot\theta^2+\sin^2\theta\,\dot\varphi^2}\,dt
\ge a\int|\dot\theta|dt\ge a|\theta_{\rm end}-\theta_{\rm start}|=\pi a
$$

となり、半周大円は等号を達成します（極座標が極で特異でも内部を分割して極限を取れます）。**終点が共役なら第二変分が退化し得るが、最短性は失われるとは限らない**のです。

## 5. 曲率の上界だけで得られる安全な区間

定曲率でなくても、正曲率が強くなりすぎなければ短い測地線で第二変分は正です。接方向の変分を無視せず、全ベクトル場で定量化します。

<a id="prop-var5-curvature-upper-bound"></a>
<!-- formal-statement-start -->
> **命題（断面曲率上界からの指数形式の下界）**  
> $\gamma:[0,L]\to(M,g)$ を単位速測地線、$\kappa\ge0$ とする。$\gamma$ 上のすべての接平面の断面曲率が $\kappa$ 以下と仮定する。任意の連続かつ区分的 $C^1$ 級ベクトル場 $V$ で $V(0)=V(L)=0$ なら

$$
I(V,V)\ge\left(\frac{\pi^2}{L^2}-\kappa\right)\int_0^L|V|^2dt.
$$

> 特に $\kappa=0$、または $\kappa>0$ かつ $L<\pi/\sqrt\kappa$ なら、非零 $V$ に対して $I(V,V)>0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

曲率項の上界を入れた後、測地線に沿う平行正規直交標構で $V$ を成分表示します。各成分には [固定端の鋭いWirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)が使えます。

<!-- proof-start -->
### 証明

各 $t$ で $V=V^\perp+c\dot\gamma$ と直交分解します。曲率テンソルの交代性から接方向は曲率項に寄与せず、断面曲率の上界と $|\dot\gamma|=1$ より

$$
g(R(V,\dot\gamma)\dot\gamma,V)
\le \kappa|V^\perp|^2\le\kappa|V|^2.
$$

[平行移動の存在と一意性](../../../幾何系/GEO/GEO13/index.md#thm-geo13-parallel-existence)および[等長性](../../../幾何系/GEO/GEO13/index.md#prop-geo13-parallel-isometry)から、区間に沿う平行正規直交標構 $E_1,\ldots,E_n$ を取り $V=\sum_i f_iE_i$ と書くと、$DE_i/dt=0$ であるため

$$
\int_0^L\left|\frac{DV}{dt}\right|^2dt=\sum_i\int_0^L(f_i')^2dt.
$$

$V(0)=V(L)=0$ なので全成分に $f_i(0)=f_i(L)=0$ が成り立ちます。各 $f_i$ は連続かつ区分的 $C^1$ 級です。第2節で確認した接続点の $C^1$ 近似により、[固定端の鋭いWirtinger不等式](../VAR2/index.md#lem-var2-wirtinger)を各 $f_i$ に適用できます。成分ごとの評価を足すと

$$
\sum_i\int_0^L(f_i')^2dt
\ge\frac{\pi^2}{L^2}\sum_i\int_0^Lf_i^2dt
=\frac{\pi^2}{L^2}\int_0^L|V|^2dt.
$$

これを[指数形式](../../../幾何系/GEO/GEO17/index.md#def-geo17-index-form)に代入して目的の下界を得ます。係数が正なら非零場の $L^2$ ノルムも正なので、最後の主張が従います。$\square$
<!-- proof-end -->

この正性は短い区間の二次的な安定性を保証しますが、距離の最短曲線の**大域的存在**は別問題です。それを扱う [Hopf–Rinow定理](../../../幾何系/GEO/GEO15/index.md#thm-geo15-hopf-rinow)は完備性など別の仮定を必要とします。次のVAR6では、その違いを扱います。

## 6. Jacobi方程式の接方向と法方向

単位速測地線の接線方向だけに変分場を取ると、$V=h\dot\gamma$、$h(0)=h(L)=0$ について

$$
\frac{DV}{dt}=h'\dot\gamma,\qquad
R(h\dot\gamma,\dot\gamma)\dot\gamma=0.
$$

従って

$$
I(h\dot\gamma,h\dot\gamma)=\int_0^L(h')^2dt>0
$$

です（$h\ne0$）。この方向は速さの変更や再パラメータ化に対応し、曲率による負方向を作れません。一方、法方向には第2節の $-Kf^2$ が現れます。球面で最初の共役点を作るのは、**接方向でなく法方向のJacobi場**です。

定曲率 $k$ の法方向Jacobi方程式は $f''+kf=0$ です。$f(0)=0,\ f'(0)=1$ に対する解は

$$
f(t)=
\begin{cases}
\sin(\sqrt{k}\,t)/\sqrt{k},&k>0,\\
t,&k=0,\\
\sinh(\sqrt{-k}\,t)/\sqrt{-k},&k<0.
\end{cases}
$$

三つとも初期微分は1ですが、正の零点を持つのは $k>0$ だけです。負曲率模型では横に出発した測地線は再び集まりません。これは [GEO17の非正曲率で共役点がない命題](../../../幾何系/GEO/GEO17/index.md#prop-geo17-nonpositive-no-conjugate)の具体的な見え方です。

## 7. 演習：場を作り、二次形式を評価し、結論の強さを区別する

### Level A

<a id="ex-var5-a01"></a>
## VAR5-A01 Euclid空間の指数形式
- Level: A
- 目安時間: 12分

$\gamma(t)=(t,0)$、$0\le t\le L$、$L>0$ とし、$V(t)=t(L-t)(0,1)$ とする。$I(V,V)$ を求め、固定端点の非零Jacobi場があるか判定せよ。

<!-- solution-start -->
### 詳細解答

Euclid空間の曲率は0で、$V'= (L-2t)(0,1)$ です。[指数形式](../../../幾何系/GEO/GEO17/index.md#def-geo17-index-form)から

$$
I(V,V)=\int_0^L(L-2t)^2dt
=\left[L^2t-2Lt^2+\frac43t^3\right]_0^L
=\frac{L^3}{3}>0.
$$

Jacobi方程式は $J''=0$ なので $J=A+tB$。$J(0)=0$ より $A=0$、$J(L)=0$ より $LB=0$、$L>0$ だから $B=0$。非零の固定端点Jacobi場はありません。
<!-- solution-end -->

<a id="ex-var5-a02"></a>
## VAR5-A02 球面の大円族
- Level: A
- 目安時間: 15分

第3節の $F(s,t)$ について $F(s,0)$、$F(s,\pi a)$、$J(t)$、$(DJ/dt)(0)$ を求め、終点を固定する測地線族がどの区間で得られるか説明せよ。

<!-- solution-start -->
### 詳細解答

$t=0$ では $\cos0=1,\sin0=0$ なので $F(s,0)=an$ です。$t=\pi a$ では $\cos\pi=-1,\sin\pi=0$ より $F(s,\pi a)=-an$ で、どちらも $s$ に依りません。

$$
\partial_sF=a\sin(t/a)(-\sin s\,e_1+\cos s\,e_2)
$$

なので $J=a\sin(t/a)e_2$。$e_2$ は基準大円に沿い平行だから

$$
\frac{DJ}{dt}(0)=\cos0\,e_2=e_2.
$$

さらに一般の終時刻 $T>0$ では $F(s,T)=a\{\cos(T/a)n+\sin(T/a)(\cos s\,e_1+\sin s\,e_2)\}$ です。したがって全ての $s$ で終点が同じになるのは $\sin(T/a)=0$、すなわち $T=m\pi a$（正整数 $m$）の場合に限ります。最初の正の時刻は $T=\pi a$ です。$0<T<\pi a$ では終点が動き、固定端点変分ではありません。
<!-- solution-end -->

<a id="ex-var5-a03"></a>
## VAR5-A03 三つの区間長
- Level: A
- 目安時間: 15分

球面 $S_a^2$ の単位速大円に沿って $V(t)=\sin(\pi t/L)e_2$ を取る。$L=\pi a/2,\pi a,3\pi a/2$ で $I(V,V)$ を評価し、その符号を述べよ。

<!-- solution-start -->
### 詳細解答

[第二変分公式](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)に $K=1/a^2$ と $V=f e_2$ を代入すると

$$
I(V,V)=\int_0^L\{(f')^2-a^{-2}f^2\}dt
=\frac L2\left(\frac{\pi^2}{L^2}-\frac1{a^2}\right).
$$

順に代入して

$$
I_{\pi a/2}=\frac{\pi a}{4}\frac3{a^2}=\frac{3\pi}{4a}>0,
$$

$$
I_{\pi a}=\frac{\pi a}{2}(a^{-2}-a^{-2})=0,
$$

$$
I_{3\pi a/2}=\frac{3\pi a}{4}\left(\frac4{9a^2}-\frac1{a^2}\right)
=-\frac{5\pi}{12a}<0.
$$

最後の負値は実際の固定端点変分によりエネルギーを下げられることを意味します。最初の正値だけでは全方向での正定性はまだ証明できず、別途[GEO17の定理](../../../幾何系/GEO/GEO17/index.md#thm-geo17-index-positive)が必要です。
<!-- solution-end -->

<a id="ex-var5-a04"></a>
## VAR5-A04 正の定曲率のJacobi方程式
- Level: A
- 目安時間: 12分

単位速測地線の法断面曲率が定数 $k=4$ とする。$f''+4f=0$、$f(0)=0$、$f'(0)=1$ を解き、最初の正の零点を求めよ。

<!-- solution-start -->
### 詳細解答

一般解 $f=A\cos2t+B\sin2t$ に $f(0)=0$ を代入して $A=0$。微分すると $f'=2B\cos2t$ なので $2B=f'(0)=1$、従って

$$
f(t)=\frac12\sin2t.
$$

正の零点は $2t=m\pi$（正整数 $m$）であり、最初は $t=\pi/2$ です。$\pi/\sqrt4=\pi/2$ と[第2節の命題](#prop-var5-constant-curvature-threshold)の閾値に一致します。
<!-- solution-end -->

### Level B

<a id="ex-var5-b01"></a>
## VAR5-B01 接方向では曲率による負方向が作れない
- Level: B
- 目安時間: 18分

任意の単位速測地線について $V=h\dot\gamma$、$h(0)=h(L)=0$ を考える。$I(V,V)$ を導き、$h(t)=\sin(2\pi t/L)$ で評価せよ。曲率符号との関係を述べよ。

<!-- solution-start -->
### 詳細解答

[測地線方程式](../../../幾何系/GEO/GEO14/index.md#prop-geo14-geodesic-equation) $D\dot\gamma/dt=0$ から $DV/dt=h'\dot\gamma$。曲率テンソルの最初の二変数の交代性により $R(\dot\gamma,\dot\gamma)=0$ です。従って

$$
I(V,V)=\int_0^L(h')^2dt.
$$

指定された関数では $h'=(2\pi/L)\cos(2\pi t/L)$ なので

$$
I=\frac{4\pi^2}{L^2}\int_0^L\cos^2(2\pi t/L)\,dt
=\frac{4\pi^2}{L^2}\frac L2=\frac{2\pi^2}{L}.
$$

$L>0$ より正です。これは接方向の結果であり、曲率が正である場合の法方向の負値を否定しません。
<!-- solution-end -->

<a id="ex-var5-b02"></a>
## VAR5-B02 断面曲率上界による定量評価
- Level: B
- 目安時間: 20分

単位速測地線の全断面曲率が $1/9$ 以下とする。$L=2\pi$ の固定端点変分場 $V$ について、$\int|V|^2dt$ を用いた $I(V,V)$ の下界を示せ。また、$L=4\pi$ に同じ議論を適用して結論の違いを述べよ。

<!-- solution-start -->
### 詳細解答

[第5節の曲率上界の命題](#prop-var5-curvature-upper-bound)の仮定を $\kappa=1/9$ として確認します。平行標構でWirtingerの不等式を成分ごとに適用した結論は

$$
I(V,V)\ge\left(\frac{\pi^2}{L^2}-\frac19\right)\int_0^L|V|^2dt.
$$

$L=2\pi$ では $\pi^2/L^2=1/4$ なので

$$
I(V,V)\ge\frac5{36}\int_0^{2\pi}|V|^2dt.
$$

非零 $V$ では正です。一方 $L=4\pi$ では係数は $1/16-1/9=-7/144$ となります。この下界は負でもよいというだけで、**実際に指数形式が負になると断定はできません**。上界による判定の十分性と必要性を混同しないことが重要です。
<!-- solution-end -->

<a id="ex-var5-b03"></a>
## VAR5-B03 終点共役でも半周は最短
- Level: B
- 目安時間: 20分

半径 $a$ の球面の北極から南極までの半周大円について、(i) 非零の両端0 Jacobi場、(ii) すべての極間曲線に対する長さ下界を求めることで、共役点と最短性の両立を証明せよ。

<!-- solution-start -->
### 詳細解答

(i) [第3節の球面Jacobi場の命題](#prop-var5-sphere-variation)で $J=a\sin(t/a)e_2$ が Jacobi場であることを直接検算しました。$J(0)=J(\pi a)=0$ で、$t=\pi a/2$ では $J=ae_2\ne0$ です。[共役点の定義](../../../幾何系/GEO/GEO17/index.md#def-geo17-conjugate)から南極は北極に共役です。

(ii) 球面の極座標計量では各滑らかな曲線の速さは $a\sqrt{\dot\theta^2+\sin^2\theta\dot\varphi^2}$ です。非負項を落とすと速さは $a|\dot\theta|$ 以上なので

$$
\ell\ge a\int|\dot\theta|dt
\ge a\left|\int\dot\theta\,dt\right|
=a|\pi-0|=\pi a.
$$

極付近では座標を避けて小区間を取り除き極限を取れば同じ下界です。半周大円は単位速で時間 $\pi a$ だけ進むから長さが $\pi a$ です。よって最短ですが第二変分に零方向があります。端点共役と内部共役の結論を区別できました。
<!-- solution-end -->

### Level C

<a id="ex-var5-c01"></a>
## VAR5-C01 非単位速の球面測地線・共役時刻・最小性
- Level: C
- 目安時間: 30分

$a>0$、$v>0$ とし、$S_a^2$ 上の測地線族を

$$
F(s,t)=a\left\{\cos\frac{vt}{a}n+\sin\frac{vt}{a}(\cos s\,e_1+\sin s\,e_2)\right\},\qquad 0\le t\le T
$$

とする（$n,e_1,e_2$ は直交単位ベクトル）。(i) 各曲線の速度とJacobi場 $J=\partial_sF(0,\cdot)$、その初期条件を求めよ。(ii) 最初の正の共役時刻を求めよ。(iii) 法方向の $V(t)=\sin(\pi t/T)e_2$ の指数形式を計算し、$vT$ と $\pi a$ の大小で判定せよ。(iv) $T$ が共役時刻ちょうどのとき、局所最小ではないと結論してよいか述べよ。

<!-- solution-start -->
### 詳細解答

(i) 微分すると

$$
\partial_tF=v\left\{-\sin\frac{vt}{a}n+\cos\frac{vt}{a}(\cos s\,e_1+\sin s\,e_2)\right\}.
$$

括弧内は単位ベクトルなので $|\partial_tF|=v$ です。さらに $\partial_t^2F=-(v^2/a^2)F$ は球面の法線方向ですから、各 $s$ で測地線です。$s$ 微分から

$$
J(t)=a\sin\frac{vt}{a}e_2,\quad J(0)=0,\quad
\frac{DJ}{dt}(0)=v e_2.
$$

基準大円に沿い $e_2$ は平行であり、$D^2J/dt^2=-(v^2/a^2)J$ です。球面の曲率項も $R(J,\dot\gamma)\dot\gamma=(v^2/a^2)J$ なのでJacobi方程式を確認できます。

(ii) 初期微分が非零のこの法Jacobi場が次に零になるのは $\sin(vt/a)=0$ の最初の正の解、すなわち $t_*=\pi a/v$ です。球面で接方向のJacobi場は両端0の非零解を持たず、法方向はこの一方向なので、これが最初の共役時刻です。

(iii) $\dot\gamma$ の大きさが $v$ なので曲率項は $v^2/a^2$ です。また $DV/dt=(\pi/T)\cos(\pi t/T)e_2$ より

$$
\begin{aligned}
I(V,V)&=\int_0^T\left\{\frac{\pi^2}{T^2}\cos^2\frac{\pi t}{T}
-\frac{v^2}{a^2}\sin^2\frac{\pi t}{T}\right\}dt\\
&=\frac T2\left(\frac{\pi^2}{T^2}-\frac{v^2}{a^2}\right).
\end{aligned}
$$

従って $vT<\pi a$ で正、$vT=\pi a$ で0、$vT>\pi a$ で負です。最後の場合、非零の固定端点場 $V$ を指数変分で実現し、負の第二変分により局所エネルギー最小でないことが分かります。

(iv) $T=t_*$ ではこの場の第二変分は0ですが、それだけでは非最小性を導けません。実際、半周大円の長さは $\pi a$ であり、前問の長さ下界から最短です。零方向は二次の厳密正性の消失を表し、最短性の消失ではありません。
<!-- solution-end -->

## 8. 章末チェック

測地線が停留していることから最短だと断定しない。一般論を使うときは[GEO17の第二変分](../../../幾何系/GEO/GEO17/index.md#thm-geo17-second-variation)へ戻り、曲率の符号・速度の大きさ・端点が固定かを確認する。Jacobi場については[GEO17の測地線変分からの導出](../../../幾何系/GEO/GEO17/index.md#thm-geo17-geodesic-variation-jacobi)と、ここで直接微分した大円族の双方を再現できるようにする。

**次のVAR6**では、第二変分の局所的な情報と、完備性・最短曲線の存在・切断点という大域的問題を切り分けます。
