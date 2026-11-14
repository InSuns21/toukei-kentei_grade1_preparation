# SP12 CTMC の Q 行列・跳躍連鎖・滞在時間

[SP10 の指数待ち時間構成](../SP10/index.md#thm-sp10-exponential-construction)では、一定の率で出来事が起きる時計を作りました。[SP11 の独立な印付け](../SP11/index.md#def-sp11-independent-marking)では、到着した出来事へ種類を付けました。しかし、機械が正常・故障・修理中のどの状態にいるかによって、次に起きる出来事の速さも行き先も変わります。

今回は **現在状態からの跳躍率を Q 行列で記録し、次の状態を選ぶ離散連鎖と、そこまで待つ指数時計を結び付ける** ことを考えます。有限状態ならこの手順が有限時間内に無限回跳ばないことを確かめ、可算無限状態ではなぜ同じ結論を無条件に使えないのかを調べます。

時間は $t\ge0$ とし、状態空間はまず有限集合 $S$ とします。時刻 $t$ の状態を $X_t$ と書きます。連続時間 Markov 連鎖（continuous-time Markov chain）を以下 **CTMC** と略記します。[離散時間 Markov 連鎖の遷移確率](../../STO/STO2A/index.md#def-sto2a-markov)とは、次の状態の確率を指定するという点で共通していますが、CTMC では **いつ** 状態が変わるかも指定します。

## 1. Q 行列は「どこへ・どの速さで」を分ける

状態 $i$ から別の状態 $j$ へ移る単位時間当たりの率を $q_{ij}$ と書きます。率は確率そのものではありません。短い長さ $h$ の間に $i$ から $j$ へ移る確率の一次係数に相当します。

[有限状態 Q 行列の定義](../../STO/STO13/index.md#def-sto13-ctmc-qmatrix)では、有限集合 $S$ 上の実行列 $Q=(q_{ij})$ に対し次の条件を要求します。

$$
q_{ij}\ge0\quad(i\ne j),\qquad
q_{ii}=-\sum_{j\ne i}q_{ij}.
$$

したがって行和は零で、$q_i:=-q_{ii}=\sum_{j\ne i}q_{ij}\ge0$ です。$q_i$ は状態 $i$ から **実際に別の状態へ出る総率** を表します。対角成分は「負の確率」ではなく、全ての流出率を相殺する項です。

### 直接例：正常・故障・修理中

$S=\{0,1,2\}$ とし、それぞれ正常・故障・修理中を表すとします。例えば

$$
Q=
\begin{pmatrix}
-2&2&0\\
0&-3&3\\
1&0&-1
\end{pmatrix}
$$

と置きます。非対角成分 $2,3,1$ は非負で、それ以外の非対角成分は零です。各行の和は $-2+2+0=0$、$0-3+3=0$、$1+0-1=0$ となり、定義の全条件を満たします。状態 $0$ では率 $2$ で $1$ へ、$1$ では率 $3$ で $2$ へ、$2$ では率 $1$ で $0$ へ移ります。

**定義から行列へ**：行 $i$ に並ぶ非対角成分は「状態 $i$ から各 $j$ へ」の率です。対角成分をその行の非対角成分の負の和にするのは、微小時間における「残る確率」と「出る確率」の合計を $1$ にするためです。後でこの対応を確率から計算します。

$q_i=0$ なら非対角の $q_{ij}$ がすべて零で、そこから二度と別の状態へ出ない **吸収状態** として扱います。例えば二状態集合 $\{0,1\}$ で $Q=\bigl(\begin{smallmatrix}-2&2\\0&0\end{smallmatrix}\bigr)$ とすれば、$1$ は吸収状態です。

## 2. Q から跳躍連鎖と滞在時間を作る

$Q$ は連続時間の率ですが、**次にどこへ跳ぶか** だけを取り出すと離散時間の連鎖になります。現在状態が $i$、総率が $q_i>0$ のとき、次の行き先 $j\ne i$ の確率を $p_{ij}=q_{ij}/q_i$ にします。確かに

$$
\sum_{j\ne i}p_{ij}
=\frac{1}{q_i}\sum_{j\ne i}q_{ij}=1.
$$

$q_i>0$ の行では $p_{ii}=0$ と置き、実際の跳躍で同じ状態を選ぶことはありません。一方、$q_i=0$ の行では $p_{ii}=1$、$j\ne i$ に対して $p_{ij}=0$ とし、吸収後は同じ状態を記録し続けます。各行の全成分が非負で和が $1$ になるため、この行列 $P=(p_{ij})$ を離散時間の遷移確率行列にできます。$P$ に従って状態を選ぶ連鎖を **跳躍連鎖** $Y_0,Y_1,\ldots$ といいます。

「いつ次へ移るか」は別の乱数で決めます。$E_0,E_1,\ldots$ を互いに独立な率 $1$ の指数変数とし、連鎖 $Y$ とも独立に取ります。$Y_n=i$ のときの滞在時間を

$$
H_n=
\begin{cases}
E_n/q_i,&q_i>0,\\
+\infty,&q_i=0
\end{cases}
$$

とします。$q_i>0$ なら、$h\ge0$ に対して

$$
P(H_n>h\mid Y_n=i)
=P(E_n>q_ih)=e^{-q_ih}.
$$

これが **率 $q_i$ の指数滞在時間** です。平均は $1/q_i$。率が大きいほど平均滞在時間が短くなります。行き先の選択は $Y$、時計は独立な $E_n$ によるため、現在状態を固定すれば待ち時間と次の行き先は独立です。

時刻 $T_0=0$ から、$T_{n+1}=T_n+H_n$ と足していき、$T_n\le t<T_{n+1}$ では $X_t=Y_n$ と置きます。これは [STO13 の跳躍連鎖・滞在時間構成定理](../../STO/STO13/index.md#thm-sto13-ctmc-construction)の構成そのものです。$H_n=+\infty$ に達したらそこに留まります。

先ほどの三状態例では $q_0=2,q_1=3,q_2=1$ で、跳躍連鎖は $0\to1\to2\to0$ を繰り返します。ただし各状態にいる時間は、それぞれ平均 $1/2,1/3,1$ の指数分布に従うため、状態の順番が同じでも実際の時間軸上の軌道は毎回異なります。

初跳躍時刻 $H$ は連続量、行き先 $J$ は離散量です。以下の $P(H\in dh,J=j)=g_j(h)\,dh$ は同時法則の密度表記であり、時間区間 $A\subset(0,\infty)$ に対して $P(H\in A,J=j)=\int_Ag_j(h)\,dh$ となることを意味します。$dh$ は時間 $h$ に関する積分の記号です。

<a id="prop-sp12-first-jump"></a>

<!-- formal-statement-start -->
> **命題（初跳躍時刻と行き先の同時法則）**  
> 有限状態集合 $S$ 上の Q 行列 $Q=(q_{ij})$ に対し、[跳躍連鎖と指数滞在時間による構成](../../STO/STO13/index.md#thm-sto13-ctmc-construction)を行う。$X_0=i$ で $q_i=-q_{ii}>0$ とし、最初の実際の状態変化までの時間を $H$、変化先を $J\in S\setminus\{i\}$ とする。このとき $h>0$、$j\ne i$ について同時密度は

$$
P(H\in dh,J=j)=q_{ij}e^{-q_ih}\,dh.
$$

> 特に $H\sim\operatorname{Exp}(q_i)$、$P(J=j)=q_{ij}/q_i$ であり、$H$ と $J$ は独立である。$q_i=0$ なら $H=+\infty$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時刻については率 $q_i$ の指数密度、行き先については $p_{ij}$ を掛けます。両乱数を独立に作ったことが、同時密度の積への分解を保証します。

<!-- proof-start -->
### 証明

$q_i>0$ とします。$H=E_0/q_i$ は $E_0$ が率 $1$ の指数変数であることから密度 $f_H(h)=q_ie^{-q_ih}$（$h>0$）を持ちます。$J=Y_1$ は $Y_0=i$ の条件で $P(J=j)=p_{ij}=q_{ij}/q_i$ です。$E_0$ と $Y$ は独立なので、$H$ と $J$ も $Y_0=i$ のもとで独立です。従って

$$
f_{H,J}(h,j)
=q_ie^{-q_ih}\frac{q_{ij}}{q_i}
=q_{ij}e^{-q_ih}.
$$

これを $h$ について積分すると

$$
P(J=j)=\int_0^\infty q_{ij}e^{-q_ih}\,dh
=\frac{q_{ij}}{q_i}.
$$

全ての $j\ne i$ について和を取ると $\sum_{j\ne i}q_{ij}/q_i=1$ です。$q_i=0$ の場合は構成で $H=+\infty$ と定めています。
<!-- proof-end -->

例えば $q_{01}=2$、$q_{02}=1$ なら $q_0=3$ なので、初跳躍までの平均は $1/3$、行き先が $1$ となる確率は $2/3$ です。「率 $2$ だから確率 $2$」と読むのは誤りです。

## 3. 有限状態では無限回の跳躍が有限時間へ詰まらない

連続時間へ状態を割り当てるには、$T_n$ が有限の値に収束してしまわないことが重要です。もし時刻 $2$ までに無限回跳んだら、$T_n\le t<T_{n+1}$ でその後の状態を指定する式は機能しません。

有限状態なら総率には有限な最大値 $L=\max_{i\in S}q_i$ があります。$L=0$ なら全状態が吸収状態です。$L>0$ で、吸収に至らない滞在では

$$
H_n=\frac{E_n}{q_{Y_n}}\ge\frac{E_n}{L}.
$$

吸収に達した場合も $H_n=+\infty$ と定めたので同じ下界が成り立ちます。従って、どの標本路でも $T_n\ge L^{-1}\sum_{k=0}^{n-1}E_k$ です。[STO13 の構成定理](../../STO/STO13/index.md#thm-sto13-ctmc-construction)の非爆発性を、ここでは上界の意味まで追います。

実際、任意の $a>0$ に対し、非負変数 $e^{-\sum_{k<n}E_k}$ に [Markov の不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)を適用すると

$$
\begin{aligned}
P\left(\sum_{k=0}^{n-1}E_k\le a\right)
&=P\left(e^{-\sum_{k<n}E_k}\ge e^{-a}\right)\\
&\le e^a\prod_{k=0}^{n-1}E[e^{-E_k}]\\
&=e^a(1/2)^n.
\end{aligned}
$$

ここで $E[e^{-E_k}]=\int_0^\infty e^{-x}e^{-x}\,dx=1/2$ を使いました。右辺は $n\to\infty$ で零へ収束します。$\sum_{k<n}E_k$ は非減少なので、その極限が任意の有限 $a$ 以下となる確率は零です。整数 $a=1,2,\ldots$ で可算和を取れば、和はほぼ確実に無限大へ発散します。よって $T_n\to\infty$ です。

次に Markov 性も確認します。状態 $i$ に入ってから時刻 $s$ まで滞在していたなら、残る滞在時間 $H-s$ について

$$
P(H>s+t\mid H>s,Y_n=i)
=\frac{e^{-q_i(s+t)}}{e^{-q_is}}=e^{-q_it}
$$

となります。[指数分布の無記憶性](../SP10/index.md#thm-sp10-exponential-construction)により経過時間は将来に影響せず、その後の独立な $E_{n+1},\ldots$ と跳躍連鎖の Markov 性によって、現在状態から同じ規則で続行します。したがって $X$ は時間一様な CTMC となります。ここで重要なのは「離散時間の連鎖だけで Markov 性を宣言する」のではなく、**その時点からさらに待つ時間の条件付き分布**を確認することです。

## 4. 一つの Poisson 時計で全状態を動かす

状態ごとに率が変わる時計を追う代わりに、全状態を共通の高速な Poisson 時計で観測し、「何もしない回」を許す方法があります。**一様化**と呼ばれる構成です。これを使うと、短時間遷移確率の $o(h)$ を具体的な $O(h^2)$ で抑えられます。ここで $o(h)$ は誤差を $h$ で割ると零へ収束すること、$O(h^2)$ は十分小さい $h>0$ で誤差の絶対値が定数倍の $h^2$ 以下になることを表します。

状態集合 $S$ を行と列に同じ順で並べた単位行列を $I$ とします。共通時計の率 $L$ で各流出率 $q_{ij}$ を割れば、$i\ne j$ の行き先を選ぶ確率 $q_{ij}/L$ になります。その行の残りの確率 $1-q_i/L$ は「時計は鳴ったが $i$ に留まる」場合に割り当てます。これらを一つの遷移行列にまとめたものが $R=I+Q/L$ です。

<a id="thm-sp12-uniformization"></a>

<!-- formal-statement-start -->
> **定理（有限状態 CTMC の一様化）**  
> 有限状態集合 $S$ 上の Q 行列 $Q$ を与え、$q_i=-q_{ii}$、$L=\max_{i\in S}q_i$ とする。$L>0$ と仮定し、確率行列を

$$
R=I+\frac{Q}{L}
$$

> と定める。遷移行列 $R$ の離散時間 Markov 連鎖 $Z_0,Z_1,\ldots$ と、それから独立な率 $L$ の Poisson 過程 $N$ を取り、$X_t=Z_{N_t}$ と置く。この $X$ は Q 行列 $Q$ を持つ時間一様 CTMC であり、有限時間内の実際の状態変化回数は $N_t$ 以下である。また $q_i>0$ における次の実際の変化までの待ち時間は率 $q_i$ の指数分布、行き先は $q_{ij}/q_i$ である。$L=0$ なら $X_t=X_0$ とする。
<!-- formal-statement-end -->

### 直接確認：行列 $R$ がなぜ確率行列か

$i\ne j$ では $R_{ij}=q_{ij}/L\ge0$、対角では $R_{ii}=1-q_i/L\ge0$ です。各行和は

$$
\sum_jR_{ij}=1+\frac1L\sum_jq_{ij}=1.
$$

したがって $R$ は離散時間連鎖の遷移行列です。$R_{ii}>0$ の回は、**Poisson 時計は鳴ったが状態は変わらなかった**という仮想的な回を表します。実際の Q 行列の跳躍と区別してください。

### 証明の見取り図

各 Poisson 時刻で $R$ に従って行き先を選びます。状態 $i$ から本当に離れる確率は $q_i/L$ なので、[Poisson の独立間引き](../SP11/index.md#thm-sp11-thinning)により実際の離脱時計は率 $q_i$。さらに Poisson 時計には有限時間内に有限回しか到着しません。

<!-- proof-start -->
### 証明

上で $R$ の非負性と各行和が $1$ であることを確認しました。[Poisson 過程の指数待ち時間構成](../SP10/index.md#thm-sp10-exponential-construction)から、時計の到着回数は任意の有限時間までほぼ確実に有限です。

状態変化は時計が鳴ったときにしか起きません。従って時刻 $t$ までの実際の状態変化回数は $N_t$ 以下であり、非爆発性が従います。

時刻 $t$ における離散連鎖の位置は $Z_{N_t}$ です。離散連鎖の Markov 性と、時計の独立増分および両者の独立性から、将来の状態の法則は現在状態と時間差のみに依存します。従って構成した $X$ は時間一様な Markov 過程です。

$X$ が $i$ にいる間、各 Poisson 時刻で $i$ から離脱する確率は

$$
1-R_{ii}=\frac{q_i}{L}.
$$

この確率で「本当の跳躍」に印を付けると、状態 $i$ に留まっている間は各試行に新しい独立乱数を使うので、[独立間引きの定理](../SP11/index.md#thm-sp11-thinning)を率 $L$、保存確率 $q_i/L$ に適用できます。実際の最初の跳躍までの待ち時間は率 $q_i$ の指数分布で、$q_i=0$ なら無限大です。

離脱を条件とした行き先 $j\ne i$ の確率は

$$
P(Z_{n+1}=j\mid Z_n=i,\ Z_{n+1}\ne i)
=\frac{R_{ij}}{1-R_{ii}}
=\frac{q_{ij}/L}{q_i/L}
=\frac{q_{ij}}{q_i}.
$$

印の行き先は各時刻の乱数から決まり、待ち時間とは独立です。これにより[有限状態の跳躍連鎖・滞在時間構成](../../STO/STO13/index.md#thm-sto13-ctmc-construction)と同じ条件付き法則になります。$L=0$ なら Q の非対角成分はすべて零なので、全状態を一定に保ちます。
<!-- proof-end -->

例えば前節の三状態 Q なら $L=3$ で、

$$
R=\begin{pmatrix}
1/3&2/3&0\\
0&0&1\\
1/3&0&2/3
\end{pmatrix}.
$$

状態 $0$ にいると、率 $3$ の時計が鳴っても確率 $1/3$ では留まり、確率 $2/3$ で $1$ へ移ります。実際の離脱率は $3(2/3)=2$ です。$R_{00}=1/3$ を「実際の自己跳躍」と数えないことが要点です。

時刻差 $h\ge0$ に対し、状態 $i$ から出発する法則を $P_i$ と書き、$P_h(i,j):=P_i(X_h=j)$ を遷移確率とします。時間一様な Markov 性により、$P(X_t=i)>0$ なら $P(X_{t+h}=j\mid X_t=i)=P_h(i,j)$ です。これにより、到達確率が零の状態についても $P_h(i,j)$ を定義できます。また、$\delta_{ij}$ は $i=j$ のとき $1$、そうでないとき $0$ となる Kronecker のデルタです。

<a id="prop-sp12-short-time"></a>

<!-- formal-statement-start -->
> **命題（有限状態 CTMC の短時間遷移）**  
> 有限状態集合 $S$ 上の Q 行列 $Q$ を持つ CTMC の遷移確率を $P_h(i,j)=P_i(X_h=j)$ とする。ここで $P_i$ は状態 $i$ から出発する法則である。$h\downarrow0$ において、全ての $i,j\in S$ について

$$
P_h(i,j)=\delta_{ij}+q_{ij}h+O(h^2).
$$

> 特に $i\ne j$ なら $P_h(i,j)=q_{ij}h+O(h^2)$、$i=j$ なら $P_h(i,i)=1-q_ih+O(h^2)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

一様化の Poisson 時計で、長さ $h$ の区間に $0$ 回、$1$ 回、$2$ 回以上鳴る場合に分けます。$2$ 回以上は二次の誤差なので、一次係数は $R-I=Q/L$ から読めます。

<!-- proof-start -->
### 証明

$L=0$ なら $Q=0$、$P_h=I$ で成り立ちます。$L>0$ では[一様化定理](#thm-sp12-uniformization)より、$Z$ の一歩遷移を $R=I+Q/L$、独立な Poisson 時計の回数を $N_h$ と書けば

$$
P_h(i,j)
=\sum_{n=0}^{\infty}P(N_h=n)(R^n)_{ij}.
$$

$N_h\sim\operatorname{Poisson}(Lh)$ なので $n=0,1$ の項はそれぞれ $e^{-Lh}\delta_{ij}$、$e^{-Lh}LhR_{ij}$ です。残りの和は非負で、$(R^n)_{ij}\le1$ より

$$
0\le\sum_{n=2}^{\infty}P(N_h=n)(R^n)_{ij}
\le P(N_h\ge2)\le\frac{E[N_h(N_h-1)]}{2}
=\frac{(Lh)^2}{2}.
$$

最後の不等式には $1_{\{n\ge2\}}\le n(n-1)/2$ を使いました。二次階乗モーメントも、$\mu=Lh$ とおいて Poisson 分布の質量関数から直接計算できます。

$$
\begin{aligned}
E[N_h(N_h-1)]
&=\sum_{n=2}^{\infty}n(n-1)e^{-\mu}\frac{\mu^n}{n!}\\
&=e^{-\mu}\mu^2\sum_{k=0}^{\infty}\frac{\mu^k}{k!}
=\mu^2=(Lh)^2.
\end{aligned}
$$

従って残りは $O(h^2)$。$e^{-Lh}=1-Lh+O(h^2)$ を代入し、

$$
\begin{aligned}
P_h(i,j)
&=(1-Lh)\delta_{ij}+LhR_{ij}+O(h^2)\\
&=\delta_{ij}+Lh(R_{ij}-\delta_{ij})+O(h^2)\\
&=\delta_{ij}+q_{ij}h+O(h^2)
\end{aligned}
$$

と得ます。有限状態では $L$ が共通なので誤差評価は状態に依存せず一様です。
<!-- proof-end -->

この命題から、Q 行列の率は実際の短時間データを使って $q_{ij}=\lim_{h\downarrow0}P_h(i,j)/h$（$i\ne j$）として回収できます。ただし **有限時間 $h$ の遷移確率が $q_{ij}h$ に等しいわけではありません**。二度以上の変化が起きる場合もあり、短時間での同値は極限の主張です。

## 5. 可算状態では爆発が起こり得る

有限状態での証明は $L=\max_iq_i<\infty$ に依存しました。可算無限集合では、行ごとの総率が有限でも全体の上界が存在しないことがあります。

例として、状態 $n=1,2,\ldots$ から必ず $n+1$ へ跳び、状態 $n$ で率 $\lambda_n>0$ の指数時間だけ待つ **純粋出生過程** を考えます。各状態は一度しか訪れず、待ち時間 $H_n$ は独立で $H_n\sim\operatorname{Exp}(\lambda_n)$ とします。

<a id="def-sp12-explosion-time"></a>

<!-- formal-statement-start -->
> **定義（純粋出生過程の爆発時刻）**  
> 状態空間 $\{1,2,\ldots\}$、跳躍 $n\to n+1$ のみを持ち、独立な $H_n\sim\operatorname{Exp}(\lambda_n)$（$0<\lambda_n<\infty$）を順次足して跳躍する純粋出生過程を考える。初期状態を $1$ とし、$m$ 回跳ぶ時刻 $T_m=\sum_{n=1}^{m}H_n$ と置く。極限

$$
\zeta=\lim_{m\to\infty}T_m=\sum_{n=1}^{\infty}H_n\in(0,\infty]
$$

> を爆発時刻という。$\zeta<\infty$ の標本路では有限時間内に無限回の跳躍が起き、$\zeta=\infty$ の標本路では爆発しないという。ここでは $\zeta$ 以後の状態を指定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp12-explosion-time -->
### 直接例：率が $n^2$ のとき

**定義の確認**

$\lambda_n=n^2$ とします。各 $\lambda_n$ は正で有限であり、$H_n$ は独立な指数変数なので、定義の前提を満たします。$T_m$ は非減少で、極限 $\zeta$ は拡張実数として確実に存在します。さらに非負変数の[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)により

$$
E[\zeta]=\lim_{m\to\infty}\sum_{n=1}^mE[H_n]
=\sum_{n=1}^{\infty}\frac1{n^2}<\infty.
$$

無限大を正の確率で取る非負変数の期待値は無限大になるので、$P(\zeta<\infty)=1$ です。つまり **どの状態でも率は有限なのに、無限個の状態を有限時間で通過** します。
<!-- definition-example-end -->

<a id="thm-sp12-birth-explosion"></a>

<!-- formal-statement-start -->
> **定理（純粋出生過程の爆発判定）**  
> 初期状態 $1$ の純粋出生過程で、各 $\lambda_n$ は $0<\lambda_n<\infty$、待ち時間 $H_n$ は互いに独立で $H_n\sim\operatorname{Exp}(\lambda_n)$ とする。爆発時刻を $\zeta=\sum_{n=1}^{\infty}H_n$ とすれば、

$$
P(\zeta<\infty)=1
\quad\Longleftrightarrow\quad
\sum_{n=1}^{\infty}\frac1{\lambda_n}<\infty.
$$

> 右辺が発散すれば $P(\zeta=\infty)=1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

逆数和が有限なら $E[\zeta]$ が有限なので爆発します。逆数和が発散する場合は期待値が無限大というだけでは足りません。$e^{-\zeta}$ の期待値を独立性から積へ分解し、積が零になることを示します。

<!-- proof-start -->
### 証明

まず $\sum_n1/\lambda_n<\infty$ とします。非負項の[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)から

$$
E[\zeta]=E\left[\lim_{m\to\infty}T_m\right]
=\lim_{m\to\infty}\sum_{n=1}^m\frac1{\lambda_n}
=\sum_{n=1}^\infty\frac1{\lambda_n}<\infty.
$$

よって $\zeta<\infty$ がほぼ確実に成り立ちます。

次に $\sum_n1/\lambda_n=\infty$ とします。各指数変数の Laplace 変換を直接積分すると

$$
E[e^{-H_n}]
=\int_0^\infty e^{-h}\lambda_ne^{-\lambda_nh}\,dh
=\frac{\lambda_n}{1+\lambda_n}.
$$

$H_n$ の独立性より

$$
E[e^{-T_m}]
=\prod_{n=1}^{m}\frac{\lambda_n}{1+\lambda_n}
=\exp\left\{-\sum_{n=1}^{m}\log\left(1+\frac1{\lambda_n}\right)\right\}.
$$

$x>0$ で $\log(1+x)\ge(\log2)\min(x,1)$ です。$0<x\le1$ なら $\log(1+x)/x$ が減少して $x=1$ で $\log2$ となり、$x\ge1$ なら $\log(1+x)\ge\log2$ です。逆数和が発散すれば $\sum_n\min(1,1/\lambda_n)$ も発散します（$1/\lambda_n>1$ が無限個ある場合と、有限個しかない場合に分ければ分かります）。従って

$$
\sum_{n=1}^{m}\log\left(1+\frac1{\lambda_n}\right)
\longrightarrow\infty,
\qquad E[e^{-T_m}]\longrightarrow0.
$$

$T_m\uparrow\zeta$ より $e^{-T_m}\downarrow e^{-\zeta}$ であり、$0\le e^{-T_m}\le1$ です。有界収束定理を適用して $E[e^{-\zeta}]=0$。非負変数の期待値が零なので $e^{-\zeta}=0$ がほぼ確実です。これは $\zeta=\infty$ と同値です。
<!-- proof-end -->

$\lambda_n=n$ なら調和級数 $\sum1/n$ が発散するので爆発しません。$\lambda_n=n^2$ なら収束するので爆発します。したがって「各状態で指数待ち時間だから必ず非爆発」という説明は誤りです。有限状態の証明に必要だった **総率の一様上界** が失われています。

## 6. 演習 Level A：Q 行列を読み、時計を計算する

#### SP12-A01 行和・吸収状態・跳躍連鎖
- Level: A

$S=\{0,1,2\}$ に対する行列

$$
Q=\begin{pmatrix}-3&2&1\\0&-4&4\\0&0&0\end{pmatrix}
$$

が Q 行列か確かめ、総率 $q_i$ と跳躍連鎖の行列 $P$ を求めよ。吸収状態を特定せよ。

<!-- solution-start -->
### 詳細解答

非対角成分 $2,1,4,0$ はすべて非負で、行和は $-3+2+1=0$、$0-4+4=0$、$0=0$。よって [Q 行列の定義](../../STO/STO13/index.md#def-sto13-ctmc-qmatrix)を満たします。総率は $q_0=3,q_1=4,q_2=0$。状態 $0$ の離脱先確率は $2/3,1/3$、状態 $1$ からは確率 $1$ で $2$、$2$ は離脱率零なので

$$
P=\begin{pmatrix}
0&2/3&1/3\\
0&0&1\\
0&0&1
\end{pmatrix}.
$$

全行の和が $1$、成分が非負であることも確認できます。状態 $2$ が吸収状態です。
<!-- solution-end -->

#### SP12-A02 最初の跳躍時間と行き先
- Level: A

$S=\{0,1,2\}$、$q_{01}=2,q_{02}=4,q_{00}=-6$ とする。$X_0=0$ のとき、最初の跳躍までの平均待ち時間、最初に $1$ へ跳ぶ確率、$P(H>1,J=2)$ を求めよ。

<!-- solution-start -->
### 詳細解答

状態 $0$ の総率は $q_0=2+4=6$ です。[初跳躍時刻と行き先の同時法則](#prop-sp12-first-jump)によれば $H\sim\operatorname{Exp}(6)$、$P(J=1)=2/6=1/3$、$P(J=2)=4/6=2/3$ です。従って $E[H]=1/6$。

$H$ と $J$ は独立なので、$P(H>1,J=2)=P(H>1)P(J=2)=e^{-6}(2/3)$ です。「率 $4$」は行き先の確率そのものではありません。
<!-- solution-end -->

#### SP12-A03 一様化行列の作り方
- Level: A

二状態の Q 行列 $Q=\bigl(\begin{smallmatrix}-2&2\\3&-3\end{smallmatrix}\bigr)$ を率 $L=3$ で一様化したときの $R$ を求め、状態 $0$ の Poisson 時計一回で本当に状態が変わる確率と、その実際の離脱率を示せ。

<!-- solution-start -->
### 詳細解答

$L=\max(2,3)=3$ です。[一様化定理](#thm-sp12-uniformization)の $R=I+Q/L$ に各成分を代入すると

$$
R=
\begin{pmatrix}1-2/3&2/3\\3/3&1-3/3\end{pmatrix}
=\begin{pmatrix}1/3&2/3\\1&0\end{pmatrix}.
$$

状態 $0$ で一回の時計から実際に離脱する確率は $R_{01}=2/3$、仮想的に留まる確率は $R_{00}=1/3$ です。時計は率 $3$ で鳴るので、独立間引き後の実際の離脱率は $3(2/3)=2$ となり、$q_0$ と一致します。
<!-- solution-end -->

#### SP12-A04 短時間確率の一次項
- Level: A

二状態 Q 行列 $Q=\bigl(\begin{smallmatrix}-a&a\\b&-b\end{smallmatrix}\bigr)$（$a,b>0$）について、$P_h(0,0)$、$P_h(0,1)$、$P_h(1,0)$ の $h\downarrow0$ における一次展開を書け。

<!-- solution-start -->
### 詳細解答

[短時間遷移の命題](#prop-sp12-short-time)では $P_h(i,j)=\delta_{ij}+q_{ij}h+O(h^2)$ です。対角では $\delta_{ii}=1$、非対角では $\delta_{ij}=0$ として代入すると

$$
P_h(0,0)=1-ah+O(h^2),\qquad
P_h(0,1)=ah+O(h^2),
$$

$$
P_h(1,0)=bh+O(h^2).
$$

$P_h(0,0)+P_h(0,1)=1+O(h^2)$ で一次までの行和も確率の行和 $1$ と整合します。有限 $h$ で $ah$ が確率に等しいわけではありません。
<!-- solution-end -->

#### SP12-A05 爆発する出生率
- Level: A

状態 $n=1,2,\ldots$ で $\lambda_n=n(n+1)$ の純粋出生過程を考える。爆発するか判定し、爆発時刻 $\zeta$ の期待値を求めよ。

<!-- solution-start -->
### 詳細解答

各 $\lambda_n>0$ は有限です。[純粋出生過程の爆発判定](#thm-sp12-birth-explosion)に使う逆数和は

$$
\begin{aligned}
\sum_{n=1}^{\infty}\frac1{\lambda_n}
&=\sum_{n=1}^{\infty}\frac1{n(n+1)}\\
&=\sum_{n=1}^{\infty}\left(\frac1n-\frac1{n+1}\right)\\
&=\lim_{m\to\infty}\left(1-\frac1{m+1}\right)=1.
\end{aligned}
$$

よってほぼ確実に爆発します。各滞在時間の平均が $1/[n(n+1)]$ なので、非負項の[単調収束定理](../../F0/F0-00D2B/index.md#ref-limit-integral-exchange)で $E[\zeta]=\sum_nE[H_n]=1$ です。
<!-- solution-end -->

## 7. 演習 Level B：独立性・一様化・爆発を証明する

#### SP12-B01 二つの指数時計の競争
- Level: B

互いに独立な $U\sim\operatorname{Exp}(\alpha)$、$V\sim\operatorname{Exp}(\beta)$（$\alpha,\beta>0$）について $H=\min(U,V)$、$J=1$ if $U<V$、$J=2$ if $V<U$ とする。$H$ の率と $P(J=1)$ を求め、$H$ と $J$ の独立性を同時密度から証明せよ。

<!-- solution-start -->
### 詳細解答

連続分布なので $P(U=V)=0$ です。独立性を用いて

$$
P(H>h)=P(U>h,V>h)=e^{-\alpha h}e^{-\beta h}
=e^{-(\alpha+\beta)h}.
$$

従って $H\sim\operatorname{Exp}(\alpha+\beta)$。時刻 $h>0$ で時計1が先に鳴る同時密度は、時計1の密度と時計2がまだ鳴らない確率を掛け

$$
f_{H,J}(h,1)=\alpha e^{-\alpha h}e^{-\beta h}
=\alpha e^{-(\alpha+\beta)h}.
$$

積分すれば $P(J=1)=\int_0^\infty \alpha e^{-(\alpha+\beta)h}\,dh=\alpha/(\alpha+\beta)$。$f_H(h)=(\alpha+\beta)e^{-(\alpha+\beta)h}$ だから

$$
f_{H,J}(h,1)=f_H(h)\frac{\alpha}{\alpha+\beta}.
$$

$J=2$ でも $\beta/(\alpha+\beta)$ と分解します。従って $H,J$ は独立です。[SP11 の出身印の命題](../SP11/index.md#prop-sp11-reverse-marking)を、各状態にいる間の二つの遷移候補に適用した形です。
<!-- solution-end -->

#### SP12-B02 率の上界から非爆発を証明する
- Level: B

有限状態 Q 行列で $L=\max_iq_i>0$ とし、跳躍連鎖と独立な率 $1$ の指数変数列から $H_n=E_n/q_{Y_n}$（$q_{Y_n}>0$）を作る。$q_{Y_n}=0$ で吸収される場合も含め、任意の $t<\infty$ に対して無限回跳ばないことを、指数の期待値を用いた評価で証明せよ。

<!-- solution-start -->
### 詳細解答

吸収後は本当の状態変化がなく、その状態の滞在時間は $+\infty$ とします。吸収前は $0<q_{Y_n}\le L$ から $H_n=E_n/q_{Y_n}\ge E_n/L$ であり、吸収に達した後も $+\infty\ge E_n/L$ です。従って、全ての経路について

$$
T_m=\sum_{n=0}^{m-1}H_n
\ge L^{-1}\sum_{n=0}^{m-1}E_n.
$$

$t>0$ を固定します。$e^{-x}$ は減少関数なので $T_m\le t$ なら $\sum_{n<m}E_n\le Lt$。[Markov の不等式](../../F0/F0-00P2A/index.md#thm-f0-00p2a-markov)と独立性から

$$
\begin{aligned}
P(T_m\le t)
&\le P\left(e^{-\sum_{n<m}E_n}\ge e^{-Lt}\right)\\
&\le e^{Lt}\prod_{n=0}^{m-1}E[e^{-E_n}]
=e^{Lt}2^{-m}.
\end{aligned}
$$

最後は $E[e^{-E_n}]=\int_0^\infty e^{-2u}du=1/2$ です。$m\to\infty$ とすると右辺は零。任意の整数 $t=1,2,\ldots$ について合併しても、有限時間内の無限回の跳躍の確率は零です。[STO13 の構成定理](../../STO/STO13/index.md#thm-sto13-ctmc-construction)の証明に必要な有限状態の率の上界を明示しました。
<!-- solution-end -->

#### SP12-B03 Poisson 時計の二回以上を抑える
- Level: B

有限状態 Q 行列 $Q$ と $L=\max_iq_i>0$ に対して $R=I+Q/L$ とする。率 $L$ の Poisson 回数 $N_h$ を使って

$$
P_h(i,j)=\sum_{n\ge0}P(N_h=n)(R^n)_{ij}
$$

と表したとき、$n\ge2$ の項の和が $O(h^2)$ であることを示し、$P_h(i,j)=\delta_{ij}+q_{ij}h+O(h^2)$ を導け。

<!-- solution-start -->
### 詳細解答

$R$ は確率行列なので $(R^n)_{ij}\in[0,1]$。従って

$$
0\le\sum_{n\ge2}P(N_h=n)(R^n)_{ij}
\le P(N_h\ge2).
$$

$1_{\{N_h\ge2\}}\le N_h(N_h-1)/2$ と Poisson の階乗モーメント $E[N_h(N_h-1)]=(Lh)^2$ により、右辺は $(Lh)^2/2$ 以下です。[一様化の定理](#thm-sp12-uniformization)を使い、$n=0,1$ の寄与を取り出すと

$$
\begin{aligned}
P_h(i,j)
&=e^{-Lh}\delta_{ij}+e^{-Lh}LhR_{ij}+O(h^2)\\
&=(1-Lh)\delta_{ij}+LhR_{ij}+O(h^2)\\
&=\delta_{ij}+Lh(R_{ij}-\delta_{ij})+O(h^2)\\
&=\delta_{ij}+q_{ij}h+O(h^2).
\end{aligned}
$$

$R-I=Q/L$ を最後に用いました。
<!-- solution-end -->

#### SP12-B04 爆発しないのに期待値が無限大
- Level: B

$\lambda_n=n$ の純粋出生過程について、$E[\zeta]=\infty$ だけで非爆発を結論するのが誤りである理由を説明し、$\zeta=\infty$ がほぼ確実であることを独立な待ち時間の Laplace 変換から証明せよ。

<!-- solution-start -->
### 詳細解答

期待値が無限大の非負確率変数も有限値をほぼ確実に取ることがあります。例えば $P(W=n)=c/n^2$（$n\ge1$、$c$ は正規化定数）なら $W<\infty$ は常に成り立ちますが $E[W]=c\sum 1/n=\infty$ です。従って期待値だけでは足りません。

$H_n\sim\operatorname{Exp}(n)$ が独立なので

$$
E[e^{-T_m}]
=\prod_{n=1}^m\frac{n}{n+1}
=\frac{1}{m+1}.
$$

$T_m\uparrow\zeta$ かつ $0\le e^{-T_m}\le1$ なので有界収束定理から

$$
E[e^{-\zeta}]
=\lim_{m\to\infty}E[e^{-T_m}]
=\lim_{m\to\infty}\frac1{m+1}=0.
$$

$e^{-\zeta}$ は非負ですからほぼ確実に零であり、$\zeta=\infty$ がほぼ確実です。[純粋出生過程の判定定理](#thm-sp12-birth-explosion)の非爆発側を具体的な望遠積で再現しました。
<!-- solution-end -->

## 8. 演習 Level C：有限 CTMC を一から構成する

#### SP12-C01 三状態機械の連続時間モデル
- Level: C

機械は $S=\{0,1,2\}$ の三状態を持ち、$0\to1$ は率 $2$、$1\to0$ は率 $3$、$1\to2$ は率 $2$、$2\to1$ は率 $1$ で起きる。他の直接遷移はない。$X_0=0$ とする。

1. Q 行列、総率 $q_i$、跳躍連鎖 $P$ を求めよ。
2. 率 $L=\max_iq_i$ の Poisson 時計で一様化するときの $R$ を求めよ。状態 $0$ の時計一回で何も起こらない確率も述べよ。
3. 最初の実際の跳躍時間 $H$ の分布と $E[H]$ を求めよ。$P(H>t,J=1)$ も求めよ。
4. $P_h(0,2)$ の $h\downarrow0$ における二次の主項が $2h^2$ であることを、時計二回の経路から示せ。三回以上の時計の寄与は $O(h^3)$ と評価せよ。
5. この CTMC が非爆発である理由と、率の一様上界が使われた箇所を述べよ。

<!-- solution-start -->
### 詳細解答

**1. 行列と跳躍連鎖。** 各行に出る率を入れ、対角成分をその負の和にすると

$$
Q=\begin{pmatrix}
-2&2&0\\
3&-5&2\\
0&1&-1
\end{pmatrix},
\qquad (q_0,q_1,q_2)=(2,5,1).
$$

非対角は非負、各行の和は零です。[Q 行列の定義](../../STO/STO13/index.md#def-sto13-ctmc-qmatrix)の条件を満たします。次の状態の確率は非対角成分をそれぞれの総率で割るので

$$
P=\begin{pmatrix}
0&1&0\\
3/5&0&2/5\\
0&1&0
\end{pmatrix}.
$$

**2. 一様化。** 最大率は $L=5$ です。[一様化定理](#thm-sp12-uniformization)から

$$
\begin{aligned}
R=I+\frac15Q
=\begin{pmatrix}
3/5&2/5&0\\
3/5&0&2/5\\
0&1/5&4/5
\end{pmatrix}.
\end{aligned}
$$

全ての成分が非負で各行の和は $1$ です。状態 $0$ で仮想的に留まる確率は $R_{00}=3/5$、実際に離脱する率は $5(1-3/5)=2$ です。

**3. 最初の実際の変化。** $q_0=2$ で、出る先は $1$ だけです。[初跳躍時刻と行き先の同時法則](#prop-sp12-first-jump)から $H\sim\operatorname{Exp}(2)$、$E[H]=1/2$、$J=1$ が確率 $1$ です。従って

$$
P(H>t,J=1)=P(H>t)=e^{-2t}\quad(t\ge0).
$$

**4. 二次遷移。** $Q_{02}=0$ なので直接 $0\to2$ は起こりません。一様化の $R$ でも $R_{02}=0$。二回の時計で $0$ から $2$ へ達するには $0\to1\to2$ しかなく、その確率は

$$
(R^2)_{02}=\sum_{k=0}^2R_{0k}R_{k2}
=R_{01}R_{12}
=\frac25\frac25=\frac4{25}.
$$

$N_h\sim\operatorname{Poisson}(5h)$ により $P(N_h=2)=e^{-5h}(5h)^2/2$ です。従って時計二回の寄与は

$$
P(N_h=2)(R^2)_{02}
=e^{-5h}\frac{25h^2}{2}\frac4{25}
=2h^2+O(h^3).
$$

時計三回以上について、$1_{\{N_h\ge3\}}\le N_h(N_h-1)(N_h-2)/6$ を使います。三次階乗モーメントは Poisson 分布の質量関数を $n=3$ から和にして

$$
\begin{aligned}
E[N_h(N_h-1)(N_h-2)]
&=e^{-5h}(5h)^3\sum_{k=0}^{\infty}\frac{(5h)^k}{k!}\\
&=(5h)^3
\end{aligned}
$$

と求まります。従って

$$
P(N_h\ge3)\le\frac{E[N_h(N_h-1)(N_h-2)]}{6}
=\frac{(5h)^3}{6}=O(h^3).
$$

時計零回と一回の寄与は零なので、$P_h(0,2)=2h^2+O(h^3)$ です。

**5. 非爆発性。** $L=5<\infty$ が全ての状態の総率の共通上界です。一様化すると有限時間 $t$ までの実際の変化回数は $N_t\sim\operatorname{Poisson}(5t)$ 以下で、$N_t<\infty$ がほぼ確実なので無限回の変化は起きません。[STO13 の構成定理](../../STO/STO13/index.md#thm-sto13-ctmc-construction)の滞在時間による方法でも、$H_n\ge E_n/5$ と比較する点に同じ上界を使っています。
<!-- solution-end -->

---

**次講への接続**：Q 行列から標本路を作り、短時間の変化を計算できました。次は時刻 $t$ の確率分布全体をどう追うかを考えます。有限状態では $P_h=I+hQ+O(h^2)$ が [Kolmogorov 方程式](../../STO/STO13/index.md#thm-sto13-kolmogorov-equations)への入口になります。