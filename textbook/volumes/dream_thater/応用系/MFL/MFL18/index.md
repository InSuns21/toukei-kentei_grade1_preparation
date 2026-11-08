# MFL18 円周の離散→連続スペクトル

<!-- definition-example-audit: strict -->

## 1. 一つの関数の差分近似から、固有モード全体へ

[MFL12の周期差分の固有値](../MFL12/index.md#prop-mfl12-cycle-spectrum)は、円周上の等間隔点で正弦波・余弦波を差分作用素に代入して得られた。しかし、いくつかの固有ベクトルを発見したことと、**すべての固有ベクトルを見つけ、連続円周の固有関数へ対応させたこと**は違う。

小さな格子では、$N=4$ のとき一周に一回振動する正弦波と余弦波は区別できるが、二回振動する正弦波の標本はすべて零になる。一方、交互符号の余弦波は残る。どこまでが独立な周波数なのだろう。

以下では、半径 $R>0$、周長 $L=2\pi R$ の円周を $N\ge3$ 個の等しい弧長セルに分ける。頂点位置 $s_j=jh$、$h=L/N$、$j=0,\ldots,N-1$ とし、添字は $N$ を法として読む。$s$ は弧長、$\theta=s/R$ は角度である。実数の余弦・正弦を一つの式で扱うため複素数を使うが、最後に実数基底も明示する。

隣接値との差分を測る [MFL12の質量形式・剛性形式](../MFL12/index.md#def-mfl12-cycle-forms) を複素ベクトルへ拡張し、

$$
\langle u,v\rangle_h=h\sum_{j=0}^{N-1}\overline{u_j}v_j,\qquad
(A_Nv)_j=\frac{2v_j-v_{j-1}-v_{j+1}}{h^2}
$$

と置く。$\overline{z}$ は複素共役、$A_N$ は質量内積で剛性を表す非負の周期差分 Laplacian である。対称な近傍グラフを作るだけでは長さの尺度が確定しないので、$h^{-2}$ は省けない。

複素数へ拡張しても、周期添字を一つずらして隣接差を展開すれば、任意の $u,v\in\mathbb C^N$ に対して

$$
\langle u,A_Nv\rangle_h
=\frac1h\sum_{j=0}^{N-1}\overline{(u_{j+1}-u_j)}(v_{j+1}-v_j)
$$

となる。これは[MFL12の剛性形式](../MFL12/index.md#def-mfl12-cycle-forms)を複素Hermitian形式に拡張した式である。特に $u=v$ なら右辺は $h^{-1}\sum_j|v_{j+1}-v_j|^2\ge0$ なので、$A_N$ の非負性を元の差分から判定できる。

## 2. 離散Fourier基底を直接作る

各頂点の番号 $j$ に対し、一定の位相 $2\pi k/N$ ずつ進む複素波を考える。整数 $k$ は一周で何回振動するかを表す。$k$ と $k+N$ は標本点上では同じ波なので、異なる周波数を $N$ 個だけ選ぶ。

<a id="def-mfl18-fourier"></a>

<!-- formal-statement-start -->
> **定義（円周格子の正規化離散Fourier基底）**  
> $R>0$、$N\ge3$、$L=2\pi R$、$h=L/N$ に対し、$k\in\mathbb Z$ の離散Fourierベクトルを

$$
\phi_{N,k}(j)=\frac1{\sqrt L}\exp\!\left(\frac{2\pi i kj}{N}\right),
\qquad j=0,\ldots,N-1
$$

> とする。$i^2=-1$。異なる代表元は $k=0,1,\ldots,N-1$ とし、内積は $\langle u,v\rangle_h=h\sum_j\overline{u_j}v_j$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl18-fourier -->
**定義の確認**。$N=4$ なら $\sqrt L\,\phi_{4,0}=(1,1,1,1)$、$\sqrt L\,\phi_{4,1}=(1,i,-1,-i)$、$\sqrt L\,\phi_{4,2}=(1,-1,1,-1)$ である。どの成分も絶対値 $L^{-1/2}$ なので $\langle\phi_{4,k},\phi_{4,k}\rangle_h=4h/L=1$。さらに

$$
\langle\phi_{4,0},\phi_{4,1}\rangle_h
=\frac hL(1+i-1-i)=0.
$$

複素波を使う理由は、余弦と正弦を実部・虚部として同時に扱えるためである。実際、隣接値を代入すると

$$
\begin{aligned}
A_4\phi_{4,1}&=\frac2{h^2}\phi_{4,1},\\
\operatorname{Re}\phi_{4,1}&=\frac{(1,0,-1,0)}{\sqrt L},\\
\operatorname{Im}\phi_{4,1}&=\frac{(0,1,0,-1)}{\sqrt L}.
\end{aligned}
$$

$A_4$ は実係数、固有値 $2/h^2$ は実数だから、上の非零な実部と虚部はともに実固有ベクトルとなる。ただし定数モードや偶数格子の最高周波数では虚部が零になり、零ベクトルは固有ベクトルとは呼ばない。
<!-- definition-example-end -->

<a id="thm-mfl18-complete"></a>

<!-- formal-statement-start -->
> **定理（周期差分の完全固有分解）**  
> $R>0$、$N\ge3$、$L=2\pi R$、$h=L/N$ とする。$\{\phi_{N,k}:0\le k<N\}$ は $\mathbb C^N$ の $\langle\cdot,\cdot\rangle_h$ に関する正規直交基底であり、

$$
A_N\phi_{N,k}=\lambda_{N,k}\phi_{N,k},\qquad
\lambda_{N,k}=\frac4{h^2}\sin^2\!\left(\frac{\pi k}{N}\right).
$$

> 実固有空間では、零固有値の重複度は1、$1\le m<N/2$ に対応する正固有値の重複度は2であり、$N$ が偶数なら $m=N/2$ の最大固有値の重複度は1である。これ以外の固有値はない。
<!-- formal-statement-end -->

### 証明の見取り図

[MFL12の周期差分の固有値と正規化の係数](../MFL12/index.md#prop-mfl12-cycle-spectrum)では、隣接する正弦・余弦を加法定理で処理した。ここでは複素指数の位相を用いて固有値を再導出し、さらに異なる周波数の内積が有限等比級数で零となることを示す。$N$ 個の正規直交ベクトルが $N$ 次元空間を張るので、固有値の取りこぼしはない。

<!-- proof-start -->
### 証明

$z=\exp(2\pi i(\ell-k)/N)$ と置く。$k\not\equiv\ell\pmod N$ なら $z\ne1$、しかし $z^N=1$ である。等比級数の積を直接計算すると

$$
(1-z)\sum_{j=0}^{N-1}z^j=1-z^N=0,
\qquad\sum_{j=0}^{N-1}z^j=0.
$$

$k\equiv\ell\pmod N$ なら各項は1で和は $N$。したがって

$$
\langle\phi_{N,k},\phi_{N,\ell}\rangle_h
=\frac hL\sum_{j=0}^{N-1}e^{2\pi i(\ell-k)j/N}
=\begin{cases}1&k\equiv\ell\pmod N,\\0&\text{それ以外}. \end{cases}
$$

特に互いに直交する非零ベクトルは線形独立である。$\mathbb C^N$ の次元と同数 $N$ 本なので基底である。次に $\alpha=2\pi k/N$ と置くと、隣接値は $\phi_{N,k}(j\pm1)=e^{\pm i\alpha}\phi_{N,k}(j)$。よって

$$
\begin{aligned}
(A_N\phi_{N,k})(j)
&=h^{-2}(2-e^{-i\alpha}-e^{i\alpha})\phi_{N,k}(j)\\
&=h^{-2}(2-2\cos\alpha)\phi_{N,k}(j)\\
&=4h^{-2}\sin^2(\alpha/2)\phi_{N,k}(j).
\end{aligned}
$$

重複度を調べるため $m=\min(k,N-k)$ とする。$0\le m\le\lfloor N/2\rfloor$ であり、$\sin^2(\pi m/N)$ はこの範囲で厳密に増加する。

$m=0$ の代表は $k=0$ だけ。$1\le m<N/2$ では $k=m$ と $k=N-m$ の二つがあり、複素共役の対から実部の余弦、虚部の正弦が独立な実固有ベクトルになる。

偶数 $N$ の最高周波数 $m=N/2$ には $k=N/2=N-m$ しかなく、$\phi_{N,N/2}(j)=(-1)^j/\sqrt L$ は実数である。これですべての重複度が決まる。$\square$
<!-- proof-end -->

実数値の正規直交基底は、定数 $L^{-1/2}$、各 $1\le m<N/2$ の $\sqrt{2/L}\cos(2\pi mj/N)$ と $\sqrt{2/L}\sin(2\pi mj/N)$、さらに偶数 $N$ では $(-1)^j/\sqrt L$ からなる。余弦と正弦の規格化係数 $\sqrt2$ は、複素共役の二つの正規直交モードを足し引きすることで現れる。

**例：$N=5$。** 固有値の順序は $0<\lambda_{5,1}=\lambda_{5,4}<\lambda_{5,2}=\lambda_{5,3}$ で、実次元は $1+2+2=5$。**例：$N=6$。** $m=3$ の交互符号モードが一つだけ残り、実次元は $1+2+2+1=6$ となる。

基底の完全性から、任意の $v\in\mathbb C^N$ は係数 $a_{N,k}=\langle\phi_{N,k},v\rangle_h$ によって一意に表せる。以下、$\|v\|_h^2=\langle v,v\rangle_h$ と記す。このとき

$$
v=\sum_{k=0}^{N-1}a_{N,k}\phi_{N,k},\qquad
\|v\|_h^2=\sum_{k=0}^{N-1}|a_{N,k}|^2
$$

後半は有限和を展開し、直交で交差項が消えることから従う（離散 Parseval 等式）。

## 3. 固定波数なら、固有値だけでなく関数も比較できる

連続円周では、[MFL12の半径付き円周のスペクトル](../MFL12/index.md#prop-mfl12-circle)で扱った実数値の正弦・余弦を複素線形に組み合わせる。弧長 $s=R\theta$ では $L_g=-d^2/ds^2$ であり、$e^{iks/R}=\cos(ks/R)+i\sin(ks/R)$ の二階微分から

$$
-\frac{d^2}{ds^2}e^{iks/R}=\frac{k^2}{R^2}e^{iks/R}
$$

が従う。そこで

$$
\phi_k(s)=L^{-1/2}e^{iks/R},\qquad
L_g\phi_k=\frac{k^2}{R^2}\phi_k\quad(k\in\mathbb Z)
$$

となる。連続側の内積は $\langle f,g\rangle_{L^2}=\int_0^L\overline f(s)g(s)\,ds$ である。整数 $k,\ell$ に対して

$$
\langle\phi_k,\phi_\ell\rangle_{L^2}
=\frac1L\int_0^L e^{i(\ell-k)s/R}\,ds
=\begin{cases}1&k=\ell,\\0&k\ne\ell.\end{cases}
$$

$k\ne\ell$ では積分の原始関数 $Re^{i(\ell-k)s/R}/(i(\ell-k))$ が両端で同じ値を取るため零になり、$k=\ell$ では $L/L=1$ となる。これで連続側の正規直交性も確認できた。

格子上の $\phi_{N,k}$ と連続関数 $\phi_k$ は、**同じ弧長点で値が一致する**。ただし格子の添字 $k$ は $N$ ごとに折り返すため、補間にどの代表周波数を使うかを指定する必要がある。

有限格子の値から連続な三角多項式を一つ選ぶため、中心に近い周波数代表を使う。

<a id="def-mfl18-interpolation"></a>

<!-- formal-statement-start -->
> **定義（円周格子の三角補間）**  
> $N\ge3$ に対し $K_N=\{-\lfloor(N-1)/2\rfloor,\ldots,\lfloor N/2\rfloor\}$ と置く。$k\in K_N$ の $\phi_{N,k}$ で $v\in\mathbb C^N$ を展開した係数 $a_{N,k}=\langle\phi_{N,k},v\rangle_h$ を用い、三角補間 $I_Nv$ を

$$
(I_Nv)(s)=\sum_{k\in K_N}a_{N,k}L^{-1/2}e^{iks/R},
\qquad 0\le s<L
$$

> と定義する。偶数 $N$ の最高周波数には $+N/2$ を選ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl18-interpolation -->
**定義の確認**。例えば

$$
K_5=\{-2,-1,0,1,2\},\qquad K_6=\{-2,-1,0,1,2,3\}
$$

はそれぞれ5個、6個の異なる剰余類を一つずつ含む。弧長点 $s_j=jL/N$ へ代入すると $e^{iks_j/R}=e^{2\pi ikj/N}$ だから、[完全基底展開](#thm-mfl18-complete)より

$$
(I_Nv)(s_j)=\sum_{k\in K_N}a_{N,k}\phi_{N,k}(j)=v_j
$$

が全頂点で成り立つ。したがってこれは確かに標本を通る補間である。偶数格子の最高周波数の符号は標本だけからは判定できず、一方を選ぶのは補間規約である。
<!-- definition-example-end -->

<a id="thm-mfl18-low-frequency"></a>

<!-- formal-statement-start -->
> **定理（固定波数の定量的スペクトル近似）**  
> $R>0$、整数 $k$ を固定し、$N>2|k|$、$N\ge3$ とする。$h=2\pi R/N$ の周期差分 $A_N$ と上の三角補間に対し、格子固有ベクトル $\phi_{N,k}$ と連続固有関数 $\phi_k$ は

$$
I_N\phi_{N,k}=\phi_k,\qquad
0\le\frac{k^2}{R^2}-\lambda_{N,k}
\le\frac{\pi^2 k^4}{3R^2N^2}
$$

> を満たす。ここで負の $k$ の $\lambda_{N,k}$ は $N$ を法として読んだ固有値を表す。従って固有値の誤差は固定 $k,R$ で $O(N^{-2})$ である。
<!-- formal-statement-end -->

### 証明の見取り図

波の標本値の一致を先に利用する。固有値については[MFL12の周期差分公式](../MFL12/index.md#prop-mfl12-cycle-spectrum)を $x=\pi|k|/N$ で書き直し、$\sin x/x$ が1からどれだけ離れるかを積分で抑える。

<!-- proof-start -->
### 証明

$N>2|k|$ により $k\in K_N$ であり、補間の直交係数は $k$ の位置だけ1、他は0だから $I_N\phi_{N,k}=\phi_k$ である。$k=0$ では両固有値が0で不等式は等号となる。$k\ne0$ なら $x=\pi|k|/N\in(0,\pi/2)$ と置いて

$$
\lambda_{N,k}=\frac{k^2}{R^2}\left(\frac{\sin x}{x}\right)^2.
$$

$0\le 1-\cos t\le t^2/2$ を $0\le t\le x$ で積分すると

$$
0\le x-\sin x=\int_0^x(1-\cos t)\,dt\le\frac{x^3}{6}.
$$

$0\le\sin x/x\le1$ だから、$1-y^2=(1-y)(1+y)\le2(1-y)$ を $y=\sin x/x$ に適用して

$$
0\le1-\left(\frac{\sin x}{x}\right)^2
\le2\frac{x-\sin x}{x}\le\frac{x^2}{3}.
$$

この式に $k^2/R^2$ を掛け、$x^2=\pi^2k^2/N^2$ を代入すれば主張が得られる。$\square$
<!-- proof-end -->

連続側の $k\ge1$ の固有値は正弦・余弦で重複度2を持ち、[完全分解](#thm-mfl18-complete)によれば $N>2k$ の有限格子でも同じ二次元空間を三角補間で再現できる。重複固有値に属する固有ベクトルは基底の回転が自由なので、一本ずつの符号や向きではなく、その二次元部分空間を比較するのが自然である。

## 4. 有限帯域のエネルギーと熱の減衰

固定された低周波を有限個だけ足した関数なら、固有値の誤差を足し合わせるだけで、エネルギーと熱の時間発展まで定量化できる。ここでは整数 $K\ge0$ と係数 $a_k$ を固定し、

$$
f(s)=\sum_{|k|\le K}a_k\phi_k(s),\qquad v_j^{(N)}=f(s_j)
$$

とする。$f'(s)=df/ds$ は弧長 $s$ による微分であり、角度 $\theta$ による微分とは $d/ds=R^{-1}d/d\theta$ で結ばれる。$f$ は有限和なので微分と和の交換に極限操作は要らない。

<a id="prop-mfl18-energy-heat"></a>

<!-- formal-statement-start -->
> **命題（有限帯域のエネルギーと熱作用素の近似）**  
> $R>0$、整数 $K\ge0$、複素係数 $a_k$（$|k|\le K$）を固定し、$N>2K$、$N\ge3$ とする。$f=\sum_{|k|\le K}a_k\phi_k$、$v^{(N)}_j=f(jh)$、$h=2\pi R/N$ と置く。このとき

$$
\begin{aligned}
0&\le\int_0^L|f'(s)|^2\,ds
-h\sum_j\overline{v_j^{(N)}}(A_Nv^{(N)})_j\\
&\le\frac{\pi^2}{3R^2N^2}\sum_{|k|\le K}k^4|a_k|^2.
\end{aligned}
$$

> また $t\ge0$ として有限行列の熱作用素を $e^{-tA_N}$、連続円周の熱作用素をこの有限Fourier和に対して次の式で定める。

$$
e^{-tL_g}f=\sum_{|k|\le K}a_ke^{-tk^2/R^2}\phi_k.
$$

> このとき次の誤差評価が成り立つ。

$$
\left\|I_Ne^{-tA_N}v^{(N)}-e^{-tL_g}f\right\|_{L^2(0,L)}
\le\frac{t\pi^2}{3R^2N^2}\left(\sum_{|k|\le K}k^8|a_k|^2\right)^{1/2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

標本ベクトルを[離散Fourier基底](#thm-mfl18-complete)で展開し、エネルギーでは固有値 $\lambda_{N,k}$、熱では指数因子 $e^{-t\lambda_{N,k}}$ を掛ける。有限帯域のため周波数の折り返しは起こらない。両者に[固定波数の誤差評価](#thm-mfl18-low-frequency)を適用する。

<!-- proof-start -->
### 証明

$N>2K$ なので各 $|k|\le K$ は異なる剰余類を表す。標本値の式を代入すれば

$$
v^{(N)}=\sum_{|k|\le K}a_k\phi_{N,k},\qquad
A_Nv^{(N)}=\sum_{|k|\le K}a_k\lambda_{N,k}\phi_{N,k}.
$$

[正規直交性](#thm-mfl18-complete)から離散エネルギーは $\sum\lambda_{N,k}|a_k|^2$ となる。一方 $\phi_k'(s)=(ik/R)\phi_k(s)$ と連続内積の正規直交性から、$\int|f'|^2=\sum(k^2/R^2)|a_k|^2$。二式を差し引き、各項に[低周波固有値誤差の上界](#thm-mfl18-low-frequency)を掛ければ第一の不等式が得られる。

次に有限行列の指数関数を冪級数で定義する。$A_N\phi_{N,k}=\lambda_{N,k}\phi_{N,k}$ なので $A_N^m\phi_{N,k}=\lambda_{N,k}^m\phi_{N,k}$。級数を足すと

$$
e^{-tA_N}v^{(N)}
=\sum_{|k|\le K}a_ke^{-t\lambda_{N,k}}\phi_{N,k}.
$$

これを補間し、連続熱作用素との差を取る。$\phi_k$ の正規直交性より差のノルムの二乗は

$$
\sum_{|k|\le K}|a_k|^2
\left|e^{-t\lambda_{N,k}}-e^{-tk^2/R^2}\right|^2.
$$

$a,b\ge0$ に対し指数関数の導関数の絶対値は区間上 $t e^{-tx}\le t$ だから、平均値の定理より $|e^{-ta}-e^{-tb}|\le t|a-b|$。各項に[定理の誤差評価](#thm-mfl18-low-frequency)を用いて平方根を取ると第二式になる。$\square$
<!-- proof-end -->

これは**固定された有限帯域**についての直接証明である。$K$ が $N$ とともに増える場合、係数の減衰条件などを別に確認する必要がある。ランダム点群や一般の多様体について、固有空間全体が収束すると主張したわけではない。

## 5. 高周波では何が壊れるか

格子上では $e^{2\pi i(k+N)j/N}=e^{2\pi ikj/N}$ である。異なる連続周波数が全標本で同じ値になることを**折り返し（aliasing）**と呼ぶ。値だけを見てもどちらの連続波を標本化したか分からない。

<a id="prop-mfl18-aliasing"></a>

<!-- formal-statement-start -->
> **命題（高周波の折り返しと非一様誤差）**  
> $R>0$、$N\ge3$ とする。任意の整数 $k$ に対し $\phi_{N,k+N}=\phi_{N,k}$ であるが、連続円周の $\phi_{k+N}$ と $\phi_k$ の固有値は一般に等しくない。さらに偶数 $N$ で $k_N=N/2$ とすると、

$$
\frac{\lambda_{N,k_N}}{k_N^2/R^2}=\frac4{\pi^2}\ne1
$$

> がすべての偶数 $N\ge4$ で成立する。したがって固定波数の $O(N^{-2})$ 評価は、格子で表現できる全周波数に一様な相対誤差収束を意味しない。
<!-- formal-statement-end -->

### 証明の見取り図

$N$ を足したときの位相は頂点ごとに $2\pi j$ だけ増える。Nyquist周波数 $N/2$ では $\sin(\pi/2)=1$ なので、差分の固有値と連続固有値の係数差がそのまま残る。

<!-- proof-start -->
### 証明

各 $j$ で

$$
e^{2\pi i(k+N)j/N}
=e^{2\pi ikj/N}e^{2\pi ij}=e^{2\pi ikj/N}
$$

だから離散ベクトルは一致する。連続側の固有値は $(k+N)^2/R^2$ と $k^2/R^2$ で、例えば $k=0$ なら $N^2/R^2$ と $0$ で異なる。次に偶数 $N$ で $k_N=N/2$、$h=2\pi R/N$ を代入すると

$$
\lambda_{N,k_N}=\frac4{h^2}\sin^2\!\frac\pi2
=\frac{N^2}{\pi^2R^2},\qquad
\frac{k_N^2}{R^2}=\frac{N^2}{4R^2}.
$$

両者の比は $4/\pi^2$ に固定される。$k_N$ が $N$ とともに増えるので、[固定 $k$ の定理](#thm-mfl18-low-frequency)の仮定を満たさない。$\square$
<!-- proof-end -->

たとえば連続定数波と一周に $N$ 回振動する波は同じ $N$ 点で同じ値を取る。どちらも格子では零モードに見えるのに、連続でのエネルギーはまったく異なる。これは誤差を改善する以前の**識別不能性**であり、標本の位置・帯域に条件を置く理由になる。

## 6. 決定論的な再現実験

下のラボは標準ライブラリだけで動き、$R,N,k$ を変更して正規化Fourierベクトルへの差分作用、理論固有値、固定周波数の誤差上界を照合する。円周の標本点は等間隔に**固定**されており、乱数による近傍グラフ推定誤差は含めない。

```python-file-lab
# lab-id: MFL18-CIRCLE-SPECTRUM-FILE
# lab-title: 円周の周期差分スペクトルと高周波折り返し
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL18/circle_spectrum_lab.py
# timeout-ms: 30000
# lab-preset: 低周波・12点 | --n 12 --radius 1 --frequency 2
# lab-preset: 同じ波数・48点 | --n 48 --radius 1 --frequency 2
# lab-preset: 半径2の円周 | --n 48 --radius 2 --frequency 3
# lab-preset: Nyquist周波数・24点 | --n 24 --radius 1 --frequency 12
# lab-preset: 折り返し波数・24点 | --n 24 --radius 1 --frequency 25
```

`continuous_eigenvalue` は入力した**連続**周波数の $k^2/R^2$、`discrete_eigenvalue` は標本化した波の離散固有値である。`bound_if_low_frequency` は $N>2|k|$ のときだけ存在し、`sampled_eigen_residual` は実際に離散行列を掛けた残差である。`nyquist_ratio` は偶数格子で最大周波数の比を返す。`python circle_spectrum_lab.py --self-test` で直交性・Parseval・固有方程式と折り返しを検算できる。

## 7. 演習：周波数・誤差・補間を自分で検算する

<a id="ex-mfl18-a01"></a>

### MFL18-A01 四点格子の全固有値

- Level: A
- 問題: 周長 $L=2\pi R$ の円周を $N=4$ 点に等分し、$h=L/4$、$(A_4v)_j=(2v_j-v_{j-1}-v_{j+1})/h^2$ とする。$k=0,1,2,3$ の固有値を求め、実重複度の和を確認せよ。

**詳細解答。** [完全分解の公式](#thm-mfl18-complete)を $N=4$ に適用する。$\sin^2(0)=0$、$\sin^2(\pi/4)=1/2$、$\sin^2(\pi/2)=1$、$\sin^2(3\pi/4)=1/2$ なので

$$
(\lambda_{4,0},\lambda_{4,1},\lambda_{4,2},\lambda_{4,3})
=\frac1{h^2}(0,2,4,2).
$$

$0$ は1重、$2/h^2$ は2重、$4/h^2$ は1重で、$1+2+1=4$。$k=2$ の正弦標本はすべて0なので二重とは数えない。

<a id="ex-mfl18-a02"></a>

### MFL18-A02 五点格子の実基底

- Level: A
- 問題: $N=5$、$L=2\pi R$、$h=L/5$ とする。実数の正規直交固有基底を全て書き、$k=1$ の余弦・正弦の内積が0であることを示せ。内積は $h\sum_j u_jv_j$ とする。

**詳細解答。** 定数 $1/\sqrt L$、$m=1,2$ に対する $\sqrt{2/L}\cos(2\pi mj/5)$ と $\sqrt{2/L}\sin(2\pi mj/5)$ の計5本を取る。[離散Fourierの直交性](#thm-mfl18-complete)から正規直交であるが、$m=1$ の交差項を直接計算すれば

$$
\begin{aligned}
h\sum_{j=0}^4\frac2L\cos\frac{2\pi j}5\sin\frac{2\pi j}5
&=\frac hL\sum_{j=0}^4\sin\frac{4\pi j}5\\
&=0.
\end{aligned}
$$

最後は $e^{4\pi i/5}$ の五乗が1で、それ自体は1でないため等比級数の虚部が0となることから従う。各モードのノルムも $\cos^2x=(1+\cos2x)/2$、$\sin^2x=(1-\cos2x)/2$ と $5h=L$ により1となる。

<a id="ex-mfl18-a03"></a>

### MFL18-A03 六点格子の最高周波数

- Level: A
- 問題: $N=6$、$h=L/6$ のとき $v_j=(-1)^j/\sqrt L$ が正規化固有ベクトルであることを差分から示し、固有値と実重複度を求めよ。

**詳細解答。** $v_{j-1}=v_{j+1}=-v_j$ だから

$$
(A_6v)_j=\frac{2v_j-(-v_j)-(-v_j)}{h^2}=\frac4{h^2}v_j.
$$

質量内積で $\|v\|_h^2=6h/L=1$。$k=3$ と $k=6-3$ は同じ周波数なので固有空間は実1次元である。

<a id="ex-mfl18-a04"></a>

### MFL18-A04 無次元化と長さ尺度

- Level: A
- 問題: $N\ge3$、$h=2\pi R/N$ の重み $1/h$ の円環グラフで、次数正規化固有値 $\mu_{N,k}=2\sin^2(\pi k/N)$ と質量正規化差分固有値 $\lambda_{N,k}=4h^{-2}\sin^2(\pi k/N)$ の関係を導け。$R$ を2倍にした場合も述べよ。

**詳細解答。** 同じ正弦因子を消すのではなく式全体を比較すると、[MFL12の尺度対応](../MFL12/index.md#prop-mfl12-cycle-spectrum)と一致して

$$
\lambda_{N,k}=\frac2{h^2}\mu_{N,k}
$$

となる。$N$ を固定して $R\mapsto2R$ にすれば $h\mapsto2h$ なので、差分固有値は $1/4$ 倍、無次元の次数正規化固有値は不変である。$k=0$ のときも両辺は0で成立する。

<a id="ex-mfl18-b01"></a>

### MFL18-B01 Fourier係数とエネルギーの復元

- Level: B
- 問題: $R>0$、$N\ge3$、$h=L/N$、$L=2\pi R$ とする。任意の $v\in\mathbb C^N$ のFourier係数を明示し、$\|v\|_h^2$ と $h\sum_j\overline{v_j}(A_Nv)_j$ を係数から再構成せよ。

**詳細解答。** [正規直交基底](#thm-mfl18-complete)での係数は内積を取ることで

$$
a_{N,k}=\langle\phi_{N,k},v\rangle_h
=\frac h{\sqrt L}\sum_{j=0}^{N-1}e^{-2\pi ikj/N}v_j.
$$

$v=\sum_k a_{N,k}\phi_{N,k}$ を内積へ二回代入すると $\langle\phi_{N,k},\phi_{N,\ell}\rangle_h$ は $k=\ell$ のときのみ1だから $\|v\|_h^2=\sum_k|a_{N,k}|^2$。$A_Nv=\sum_k\lambda_{N,k}a_{N,k}\phi_{N,k}$ も代入すれば

$$
h\sum_j\overline{v_j}(A_Nv)_j
=\sum_{k=0}^{N-1}\lambda_{N,k}|a_{N,k}|^2.
$$

これは隣接差を展開した $(1/h)\sum_j|v_{j+1}-v_j|^2$ に一致し、各項が非負である。

<a id="ex-mfl18-b02"></a>

### MFL18-B02 固定波数の誤差係数

- Level: B
- 問題: $R=2$、$k=2$、$N>4$ とする。$\lambda_{N,k}$ を $N$ で表し、$4/R^2-\lambda_{N,2}$ の明示的上界と極限を求めよ。

**詳細解答。** $h=4\pi/N$ なので

$$
\lambda_{N,2}=\frac{N^2}{4\pi^2}\sin^2\!\frac{2\pi}{N}.
$$

連続固有値は $k^2/R^2=1$。[低周波誤差定理](#thm-mfl18-low-frequency)へ $k=2,R=2$ を代入すると

$$
0\le 1-\lambda_{N,2}\le\frac{\pi^2\cdot16}{3\cdot4N^2}
=\frac{4\pi^2}{3N^2}\longrightarrow0.
$$

したがって $\lambda_{N,2}\to1$。$N$ を増やしても相対誤差が必ず零になるという結論は、$k=2$ を固定したから使える。

<a id="ex-mfl18-b03"></a>

### MFL18-B03 高周波で二次精度が壊れる

- Level: B
- 問題: 偶数 $N\ge4$、$R>0$、$k_N=N/2$ とする。連続固有値と差分固有値を比較し、相対誤差 $(k_N^2/R^2-\lambda_{N,k_N})/(k_N^2/R^2)$ を導出せよ。固定波数定理と矛盾しない理由を述べよ。

**詳細解答。** $h=2\pi R/N$ を代入して

$$
\frac{k_N^2}{R^2}=\frac{N^2}{4R^2},\qquad
\lambda_{N,k_N}=\frac4{h^2}=\frac{N^2}{\pi^2R^2}.
$$

従って相対誤差は $1-4/\pi^2>0$ で一定である。[高周波の命題](#prop-mfl18-aliasing)の通り、$k_N$ が $N$ に比例して増えるため $N>2|k_N|$ を満たさず、[固定波数定理](#thm-mfl18-low-frequency)の適用外となる。

<a id="ex-mfl18-b04"></a>

### MFL18-B04 単一モードの熱減衰

- Level: B
- 問題: $R>0$、$k\in\mathbb Z$、$N>2|k|$、$t\ge0$ とする。標本ベクトル $v_j=L^{-1/2}e^{2\pi ikj/N}$ に $e^{-tA_N}$ を作用させ、連続熱解 $e^{-tk^2/R^2}\phi_k$ との補間後の $L^2$ 誤差を評価せよ。

**詳細解答。** [完全分解](#thm-mfl18-complete)から $A_Nv=\lambda_{N,k}v$ なので、行列指数の冪級数は各項で固有値の冪へ置き換わり、

$$
e^{-tA_N}v=e^{-t\lambda_{N,k}}v
$$

となる。$N>2|k|$ により[三角補間](#def-mfl18-interpolation)で $I_Nv=\phi_k$。したがって補間後の差は $(e^{-t\lambda_{N,k}}-e^{-tk^2/R^2})\phi_k$ で、連続側の規格化から $\|\phi_k\|_{L^2}=1$。指数関数に平均値の定理を適用すれば

$$
\|I_Ne^{-tA_N}v-e^{-tk^2/R^2}\phi_k\|_{L^2}
\le t|\lambda_{N,k}-k^2/R^2|
\le\frac{t\pi^2k^4}{3R^2N^2}.
$$

ここには確率的な近傍グラフ誤差は入っていない。

<a id="ex-mfl18-c01"></a>

### MFL18-C01 二つの周波数のエネルギーと折り返し

- Level: C
- 問題: 半径 $R>0$、$N\ge5$、$h=2\pi R/N$ の円周で、$f(s)=\cos(s/R)+2\cos(2s/R)$ とし $v_j=f(jh)$ とする。次を示せ。

  1. $h\sum_j v_j^2$ と $h\sum_jv_j(A_Nv)_j$ を $\lambda_{N,1},\lambda_{N,2}$ で表す。
  2. 連続側の $\int_0^L f^2ds$ と $\int_0^L(f')^2ds$ を求め、エネルギー差の $N^{-2}$ 上界を導く。
  3. $g_N(s)=f(s)+\cos(Ns/R)-1$ が全格子点で $f$ と同じ値を取るにもかかわらず、連続の関数として異なることを示せ。

**詳細解答。** $N\ge5$ なので周波数 $\pm1,\pm2$ は異なる剰余類で、[離散Fourierの直交性](#thm-mfl18-complete)を使える。余弦を連続Fourier関数の和に書けば

$$
\cos(ks/R)=\frac{\sqrt L}{2}(\phi_k+\phi_{-k}),\qquad
a_{\pm1}=\frac{\sqrt L}{2},\quad a_{\pm2}=\sqrt L.
$$

これは $f$ の正規化基底係数だから、

$$
\begin{aligned}
h\sum_jv_j^2
&=2\cdot\frac L4+2L=\frac{5L}{2},\\
h\sum_jv_j(A_Nv)_j
&=\frac L2\lambda_{N,1}+2L\lambda_{N,2}.
\end{aligned}
$$

連続側では $\phi_k'=ik\phi_k/R$ なので、[MFL12の半径付き円周の計量・エネルギー・スペクトル](../MFL12/index.md#prop-mfl12-circle)により

$$
\int_0^L f^2ds=\frac{5L}{2},\qquad
\int_0^L(f')^2ds=\frac L{2R^2}+\frac{8L}{R^2}=\frac{17L}{2R^2}.
$$

上の二つのエネルギー差は $D=(L/2)(1/R^2-\lambda_{N,1})+2L(4/R^2-\lambda_{N,2})$ である。[定量評価](#thm-mfl18-low-frequency)から各括弧は非負であり、

$$
0\le D\le\frac{L\pi^2}{3R^2N^2}
\left(\frac{1^4}{2}+2\cdot2^4\right)
=\frac{65L\pi^2}{6R^2N^2}.
$$

最後に格子点 $s_j=2\pi Rj/N$ では $\cos(Ns_j/R)=\cos(2\pi j)=1$。従って $g_N(s_j)=f(s_j)$。一方 $s=\pi R/N$ では $\cos(Ns/R)=\cos\pi=-1$ なので $g_N(s)-f(s)=-2$。標本一致だけで連続の高周波成分を回復できるわけではない。

---

本章では、完全に計算できる円周格子であっても、**波数を固定した場合の収束**と**全周波数に一様な収束**は違うことを確かめた。この区別を出発点に、次章では補間・二次形式・コンパクト性・min–max を一般のスペクトル一致性へ接続する。
