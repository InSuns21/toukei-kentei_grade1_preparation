# SP16 更新報酬・残余寿命・長期平均

[SP15 の通常更新過程](../SP15/index.md#def-sp15-renewal-process)では、更新時刻 $S_n=T_1+\cdots+T_n$ と更新回数 $N(t)$ を作り、平均間隔 $\mu=E[T_1]$ が正で有限なら $N(t)/t\to1/\mu$ と分かりました。しかし交換された部品が毎回違う利益を生み、あるいは時計を見た瞬間に「次の交換まで何時間残るか」を知りたいときは、回数だけでは答えられません。

この講義では**一サイクルの報酬を時間で割る**方法を証明し、その考え方を「今いるサイクルの経過時間・残り時間」へ応用します。長いサイクルほど無作為な観測時刻に見つかりやすいという現象も、式から確認します。最後に、時間平均と**特定の時刻の確率分布の極限**は別物であることを示します。

## 1. 一回ごとの報酬を時間平均へ変える

時刻 $0$ から始まる更新間隔を $T_1,T_2,\ldots$ とし、更新時刻を $S_0=0$, $S_n=\sum_{i=1}^nT_i$ とします。第 $i$ サイクルは時刻 $S_{i-1}$ から $S_i$ までです。たとえば修理が終わるたびに得る売上を $R_i$ とすれば、時刻 $t$ までに完了したサイクルの報酬合計は $Y(t)=\sum_{i=1}^{N(t)}R_i$ です。$T_i$ と $R_i$ は**同じサイクル内では依存してよい**ことが重要です。

<a id="def-sp16-renewal-reward"></a>

<!-- formal-statement-start -->
> **定義（更新報酬過程）**  
> $(T_i,R_i)_{i\ge1}$ を独立同分布な $\mathbb R^2$ 値確率変数列とし、$P(0<T_i<\infty)=1$、$0<\mu=E[T_1]<\infty$、$E[|R_1|]<\infty$ を仮定する。$N(t)$ は $S_n=\sum_{i=1}^nT_i$ から定めた通常更新過程である。このとき

$$
Y(t)=\sum_{i=1}^{N(t)}R_i
=\sum_{i=1}^{\infty}R_i\mathbf1_{\{S_i\le t\}}
\quad(t\ge0)
$$

> を**更新報酬過程**と呼ぶ。報酬は各サイクルの**終了時に**計上する。負の報酬も認める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp16-renewal-reward -->
### 直接例：寿命に比例する報酬

**定義の確認**

$P(T_i=1)=P(T_i=3)=1/2$ とし、異なる $i$ では独立、$R_i=2T_i$ とします。組 $(T_i,R_i)$ は各 $i$ で同じ二点分布 $(1,2),(3,6)$ を取り、組同士は独立です。$T_i>0$、$\mu=(1+3)/2=2$、$E|R_i|=(2+6)/2=4$ なので全条件を満たします。

例えば最初の間隔が $1$、次が $3$ なら $S_1=1$, $S_2=4$ で、$Y(2)=2$, $Y(4)=8$ です。$R_i$ と $T_i$ が依存していてもよく、必要なのは**サイクルを表す組の独立同分布性**です。
<!-- definition-example-end -->

一回当たり平均報酬は $E[R_1]$、単位時間当たり平均サイクル数は $1/\mu$ です。ただし両者を掛けた長期極限を得るには、標本路と期待値を分けて示す必要があります。

<a id="thm-sp16-renewal-reward"></a>

<!-- formal-statement-start -->
> **定理（更新報酬定理）**  
> [更新報酬過程](#def-sp16-renewal-reward)の仮定の下で、$\rho=E[R_1]$ とすると

$$
\boxed{\frac{Y(t)}t\longrightarrow\frac{\rho}{\mu}
\quad(t\to\infty)\quad\text{ほとんど確実に}}
$$

> が成り立つ。また全ての $t<\infty$ で $E|Y(t)|<\infty$ であり、

$$
\boxed{\frac{E[Y(t)]}t\longrightarrow\frac{\rho}{\mu}}
$$

> も成り立つ。$T_i$ と $R_i$ の同一サイクル内の独立性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

標本路については「完了したサイクル数 $\times$ 一サイクルの平均」を使います。期待値については、$R_1$ と $T_1$ の相関を無視して $E[R_1]E[N(t)]$ と置かず、**最後に終了したサイクルの添字ごとに和を分ける**ことで有限時刻の正しい式を作ります。

<!-- proof-start -->
### 証明

**標本路の極限。** [独立同分布の可積分な確率変数の強大数則](../../F0/F0-00P5A/index.md#thm-iid-integrable-slln)を組の二つの成分それぞれに適用すると、確率 $1$ の事象上で

$$
\frac1n\sum_{i=1}^nR_i\to\rho,\qquad
\frac{S_n}{n}\to\mu.
$$

[更新回数の強大数法則](../SP15/index.md#thm-sp15-renewal-strong-law)によれば、その事象上で $N(t)\to\infty$ かつ $N(t)/t\to1/\mu$。十分大きい $t$ では $N(t)\ge1$ であり、

$$
\frac{Y(t)}t
=\left(\frac1{N(t)}\sum_{i=1}^{N(t)}R_i\right)
\frac{N(t)}t
\longrightarrow \rho\frac1\mu.
$$

強大数則が成り立つ標本路では、添字を $n=N(t)$ という無限大へ向かう整数に置き換えても収束は保存されます。

**有限時刻の期待値。** $m(u)=E[N(u)]$ とし、$u<0$ では $m(u)=0$ と約束します。第 $i$ サイクルが時刻 $t$ までに終了したときの報酬の絶対値を和に取ります。[SP15 の分布公式](../SP15/index.md#prop-sp15-count-distribution)による $F^{*n}(u)=P(S_n\le u)$ と、$F^{*0}(u)=1$（$u\ge0$）を使います。第 $i$ サイクルの組はそれより前の $S_{i-1}$ と独立で、$S_i=S_{i-1}+T_i$ なので、非負和の期待値を順に計算すると

$$
\begin{aligned}
E\left[\sum_{i=1}^{N(t)}|R_i|\right]
&=\sum_{i=1}^\infty E\left[|R_i|\mathbf1_{\{S_i\le t\}}\right]\\
&=\sum_{i=1}^\infty E\left[
|R_i|\mathbf1_{\{T_i\le t\}}F^{*(i-1)}(t-T_i)\right]\\
&=E\left[|R_1|\mathbf1_{\{T_1\le t\}}
\sum_{i=1}^\infty F^{*(i-1)}(t-T_1)\right]\\
&=E\left[|R_1|\mathbf1_{\{T_1\le t\}}
\{1+m(t-T_1)\}\right]\\
&\le E|R_1|\{1+m(t)\}<\infty.
\end{aligned}
$$

最後の級数は $S_0$ の1項と、[SP15 の更新関数](../SP15/index.md#def-sp15-renewal-function) $m$ の和です。局所有限性と $m(t)<\infty$ は [SP15 の局所有限性](../SP15/index.md#prop-sp15-local-finiteness)によります。非負和で各サイクルの直前までにかかった時間に条件付けした後、絶対収束から符号付きの $R_i$ にも同じ分解が使え、

$$
E[Y(t)]=E\left[R_1\mathbf1_{\{T_1\le t\}}
\{1+m(t-T_1)\}\right].
$$

[初等更新定理](../SP15/index.md#thm-sp15-elementary-renewal)より $m(u)/u\to1/\mu$。各固定値 $T_1=s<\infty$ に対し、$t>s$ として

$$
\frac{1+m(t-s)}t
=\frac1t+\frac{m(t-s)}{t-s}\frac{t-s}{t}
\longrightarrow\frac1\mu.
$$

また $m$ は非減少なので $0\le m(t-s)\le m(t)$（$0\le s\le t$）。$t\ge1$ において $(1+m(t))/t$ は、初等更新定理と局所有限性から一様な有限上界 $C$ を持ちます。したがって期待値の被積分変数を $t$ で割った絶対値は $C|R_1|$ 以下です。$E|R_1|<\infty$ より優収束定理を適用して

$$
\lim_{t\to\infty}\frac{E[Y(t)]}{t}
=E\left[\frac{R_1}{\mu}\right]=\frac{\rho}{\mu}.
$$

この論証では $R_1$ と $T_1$ を別々に平均した箇所はありません。
<!-- proof-end -->

最初の直接例では $\rho/\mu=4/2=2$、すなわち長期報酬率は $2$ です。これは $R_i=2T_i$ なので、終了時点を無視すればサイクル全体で「時間1当たり2の報酬」に対応することとも整合します。

## 2. いま進行しているサイクルの年齢と残余寿命

更新直後に時計を見るのと、十分長く稼働した設備を適当な時刻に調べるのとでは、「次の交換までの時間」の分布は異なり得ます。時刻 $t$ で直前の更新から経過した時間を**年齢**、次の更新までの時間を**残余寿命**とします。

<a id="def-sp16-age-residual"></a>

<!-- formal-statement-start -->
> **定義（年齢過程・残余寿命・観測サイクル長）**  
> 正で有限な独立同分布待ち時間からなる通常更新過程で、$N(t)=\max\{n:S_n\le t\}$ とする。$t\ge0$ に対し

$$
A(t)=t-S_{N(t)},\qquad
B(t)=S_{N(t)+1}-t,\qquad
L(t)=T_{N(t)+1}=A(t)+B(t)
$$

> と定める。$A(t)$ は**年齢**、$B(t)$ は**残余寿命**、$L(t)$ は時刻 $t$ に観測されるサイクルの全長である。更新時刻そのものでは新しいサイクルを選び、$A(S_n)=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp16-age-residual -->
### 直接例：2時間ごとの交換

**定義の確認**

$T_i=2$ を全ての $i$ について確率 $1$ とします。組ではなく待ち時間だけの独立同分布性が必要で、各 $T_i$ は正かつ有限です。$S_n=2n$, $N(t)=\lfloor t/2\rfloor$ より

$$
A(t)=t-2\lfloor t/2\rfloor,\qquad
B(t)=2\bigl(\lfloor t/2\rfloor+1\bigr)-t.
$$

$t=3$ では $A=1,B=1,L=2$。$t=4$ は更新の瞬間なので $N(4)=2$、$A(4)=0,B(4)=2,L(4)=2$ です。いずれも $A\ge0,B>0$、$A+B=T_{N+1}=2$ を確認できます。
<!-- definition-example-end -->

この章での「時間平均」は一つの長い標本路に沿った積分の平均です。例えば「残余寿命が $x$ より大きい時間の割合」は $t^{-1}\int_0^t\mathbf1_{\{B(s)>x\}}ds$ と書けます。**特定時刻の確率** $P(B(t)>x)$ と混同しないようにします。

## 3. 時間平均をサイクル別の報酬として計算する

サイクル長が $T_i$ なら、そのサイクル開始後 $u$ 時間の時点では $(A,B)=(u,T_i-u)$ です。各サイクルでの積分を一回分の報酬とすると、[更新報酬定理](#thm-sp16-renewal-reward)が使えます。

<a id="thm-sp16-occupation"></a>

<!-- formal-statement-start -->
> **定理（年齢・残余寿命の時間平均）**  
> $T_i$ が独立同分布で $P(0<T_i<\infty)=1$、$0<\mu=E[T_1]<\infty$ とする。任意の有界 Borel 可測関数 $h:[0,\infty)^2\to\mathbb R$ に対して

$$
\boxed{\lim_{t\to\infty}\frac1t\int_0^t h(A(s),B(s))\,ds
=\frac1\mu E\left[\int_0^{T_1}h(u,T_1-u)\,du\right]}
$$

> がほとんど確実に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

各サイクルに $Z_i=\int_0^{T_i}h(u,T_i-u)du$ を割り当てます。完了サイクルの合計は更新報酬定理で処理でき、最後の未完了部分は $h$ が有界であるため、時間 $t$ で割ると消えます。

<!-- proof-start -->
### 証明

$|h|\le M<\infty$ とします。$Z_i=\int_0^{T_i}h(u,T_i-u)du$ は $T_i$ の可測関数なので独立同分布で、$|Z_i|\le MT_i$ より $E|Z_i|\le M\mu<\infty$ です。

サイクル $i$ の時刻 $S_{i-1}+u$ では、$0\le u<T_i$ において $A=u$, $B=T_i-u$。更新瞬間は可算集合なので積分値に影響せず、

$$
\int_0^t h(A(s),B(s))\,ds
=\sum_{i=1}^{N(t)}Z_i
+\int_{S_{N(t)}}^t h(A(s),B(s))\,ds.
$$

第一項は [更新報酬定理](#thm-sp16-renewal-reward)で $t$ で割ると $E[Z_1]/\mu$ に収束します。第二項の絶対値は $M(t-S_{N(t)})=MA(t)$ 以下です。[SP15 の更新回数の強大数法則](../SP15/index.md#thm-sp15-renewal-strong-law)と待ち時間への強大数則から

$$
\frac{S_{N(t)}}t
=\frac{S_{N(t)}}{N(t)}\frac{N(t)}t
\longrightarrow\mu\cdot\frac1\mu=1.
$$

従って $0\le A(t)/t=1-S_{N(t)}/t\to0$ であり、端の項は消えます。これで表示した極限が従います。
<!-- proof-end -->

### 年齢と残余寿命の「典型値」

固定した $x\ge0$ について $h(a,b)=\mathbf1_{\{a>x\}}$ とおくと、一サイクルで条件が成立する時間は $(T_i-x)_+=\max(T_i-x,0)$。$h(a,b)=\mathbf1_{\{b>x\}}$ の場合も、$0\le u<T_i-x$ の長さが同じになります。よって [時間平均定理](#thm-sp16-occupation)から両方に対し

$$
\lim_{t\to\infty}\frac1t\int_0^t\mathbf1_{\{A(s)>x\}}\,ds
=\lim_{t\to\infty}\frac1t\int_0^t\mathbf1_{\{B(s)>x\}}\,ds
=\frac{E[(T_1-x)_+]}{\mu}
$$

がほとんど確実に成り立ちます。非負量の積分を確率で分解する 非負量を指示関数の積分へ分解すると、

$$
(T_1-x)_+=\int_x^\infty\mathbf1_{\{T_1>v\}}\,dv,
\qquad
E[(T_1-x)_+]=\int_x^\infty P(T_1>v)\,dv.
$$

この順の交換は非負性によります。従って時間平均に現れる共通の尾確率は

$$
\boxed{G(x)=\frac1\mu\int_x^\infty P(T_1>v)\,dv}\qquad(x\ge0)
$$

です。$G(0)=E[T_1]/\mu=1$、$G(x)\downarrow0$ なので、$G$ は非負の待ち時間分布の尾確率として使えます。元の待ち時間の尾確率 $P(T_1>x)$ そのものとは一般に一致しません。

## 4. 点検で長いサイクルを引きやすい理由

長さが $3$ 時間のサイクルには、長さが $1$ 時間のサイクルの3倍の「観測できる時間」があります。この重みは観測の仕方から生じ、サイクルの出現確率そのものが変わるわけではありません。

<a id="prop-sp16-length-bias"></a>

<!-- formal-statement-start -->
> **命題（観測サイクル長の長さによる偏り）**  
> [年齢・残余寿命の定義](#def-sp16-age-residual)の待ち時間について $0<\mu<\infty$ とし、$C\subset(0,\infty)$ を Borel 集合とする。このとき

$$
\lim_{t\to\infty}\frac1t\int_0^t\mathbf1_{\{L(s)\in C\}}\,ds
=\frac{E[T_1\mathbf1_{\{T_1\in C\}}]}{\mu}
$$

> がほとんど確実に成り立つ。さらに $E[T_1^2]<\infty$ なら

$$
\lim_{t\to\infty}\frac1t\int_0^t L(s)\,ds
=\frac{E[T_1^2]}{\mu},
\qquad
\lim_{t\to\infty}\frac1t\int_0^t B(s)\,ds
=\frac{E[T_1^2]}{2\mu}
$$

> がほとんど確実に成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

最初の式はサイクル中ずっと $\mathbf1_{\{T_i\in C\}}$ を観測するだけなので、報酬は $T_i\mathbf1_{\{T_i\in C\}}$。平均残余寿命では一サイクルの残余時間を積分すると三角形の面積 $T_i^2/2$ になります。後者は有界な関数ではないため、**更新時刻での強大数則と積分の単調性**を用いて端のサイクルを処理します。

<!-- proof-start -->
### 証明

最初の主張は [時間平均定理](#thm-sp16-occupation)に $h(a,b)=\mathbf1_{\{a+b\in C\}}$ を代入します。サイクル内で $a+b=T_1$ は一定だから

$$
\frac1\mu E\int_0^{T_1}\mathbf1_{\{T_1\in C\}}\,du
=\frac{E[T_1\mathbf1_{\{T_1\in C\}}]}{\mu}.
$$

二乗モーメントが有限なら、更新時刻 $S_n$ までの観測長さの積分は

$$
\int_0^{S_n}L(s)\,ds=\sum_{i=1}^nT_i^2,\qquad
\int_0^{S_n}B(s)\,ds
=\sum_{i=1}^n\int_0^{T_i}(T_i-u)\,du
=\frac12\sum_{i=1}^nT_i^2.
$$

[可積分な独立同分布列の強大数則](../../F0/F0-00P5A/index.md#thm-iid-integrable-slln)を $T_i^2$ と $T_i$ に適用すると、それぞれを $S_n$ で割った値が $E[T_1^2]/\mu$ と $E[T_1^2]/(2\mu)$ に収束します。

$t$ が $S_n\le t<S_{n+1}$ にあるとき、$L(s),B(s)\ge0$ のため累積積分は非減少です。$H(t)=\int_0^tL(s)ds$ または $H(t)=\int_0^tB(s)ds$ と書くと、

$$
\frac{H(S_n)}{S_n}\frac{S_n}{t}
\le \frac{H(t)}t
\le \frac{H(S_{n+1})}{S_{n+1}}\frac{S_{n+1}}t.
$$

$S_n/n\to\mu>0$ と $S_n\le t<S_{n+1}$ より $S_n/t\to1$、$S_{n+1}/t\to1$ です。両端の極限が一致し、一般の $t$ で主張が得られます。
<!-- proof-end -->

特に時間平均で観測されるサイクルの平均長は

$$
\frac{E[T_1^2]}{\mu}
=\mu+\frac{\operatorname{Var}(T_1)}{\mu}\ge\mu.
$$

分散が正なら、サイクルの始点だけを数えて平均した長さ $\mu$ より長くなります。これが**検査のパラドックス（inspection paradox）**です。「ランダムに来た観測者が長い待ちに出会う」という逆説は、時刻を一様に選ぶこととサイクルを一様に選ぶことが違うという事実です。

### 二点分布で手計算する

$P(T_i=1)=P(T_i=3)=1/2$ なら $\mu=2$、$E[T_i^2]=5$。一つずつサイクルを数えると長さ $1$ と $3$ は半々ですが、時間平均で観測される長さは

$$
P_{\mathrm{time}}(L=1)=\frac{1(1/2)}2=\frac14,\qquad
P_{\mathrm{time}}(L=3)=\frac{3(1/2)}2=\frac34.
$$

したがって観測長の平均は $1/4+9/4=5/2$、残余寿命の時間平均は $5/(2\cdot2)=5/4$ です。後者は**無作為な更新直後の待ち時間の平均 $2$** とは別の量です。

## 5. 固定時刻の残余寿命：いつ時間平均と一致するか

ここまでの公式は、一つの標本路を長時間観測した割合でした。では $P(B(t)>x)$ を $t\to\infty$ としたときにも $G(x)$ が出るのでしょうか。**一般には否**です。まず有限時刻の正確な公式を作り、極限を取るための追加条件を分離します。

最初の時刻 $S_0=0$ も含めた更新時刻の分布を足し合わせると、時刻ごとの更新の積み重なりを測れます。この量を次に定義します。

<a id="def-sp16-renewal-measure"></a>

<!-- formal-statement-start -->
> **定義（更新測度）**  
> 正で有限な独立同分布待ち時間の更新時刻 $S_0=0$, $S_n=\sum_{i=1}^nT_i$ について、Borel 集合 $C\subset[0,\infty)$ に

$$
U(C)=\sum_{n=0}^\infty P(S_n\in C)
$$

> を対応させる局所有限な測度 $U$ を**更新測度**と呼ぶ。
<!-- formal-statement-end -->

[SP15 の局所有限性と更新関数](../SP15/index.md#prop-sp15-local-finiteness)から $U([0,t])=1+m(t)<\infty$ です。$\overline F(v)=P(T_1>v)$（$v\ge0$）を待ち時間の尾確率とします。

<!-- definition-example-start: def-sp16-renewal-measure -->
### 直接例：2時間刻みの更新測度

**定義の確認**

$T_i=2$ なら $S_n=2n$ は確定値で、$P(S_n\in C)=\mathbf1_{\{2n\in C\}}$。従って $U(C)$ は $C$ に含まれる $0,2,4,\ldots$ の個数です。互いに素な Borel 集合の可算和に対して個数を足せるので測度となり、$U([0,t])=1+\lfloor t/2\rfloor<\infty$ により局所有限性も確認できます。
<!-- definition-example-end -->

<a id="prop-sp16-residual-formula"></a>

<!-- formal-statement-start -->
> **命題（残余寿命の更新測度表示）**  
> 正で有限な独立同分布待ち時間をもつ通常更新過程について、任意の $t,x\ge0$ に対し

$$
\boxed{P(B(t)>x)=\int_{[0,t]}\overline F(t+x-s)\,U(ds)}
$$

> が成り立つ。連続分布であることは仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

時刻 $t$ が第 $n+1$ サイクルの中にある事象は $S_n\le t<S_{n+1}$。さらに残余寿命が $x$ より長い条件は $S_{n+1}>t+x$ です。$S_n$ を固定すると、次の待ち時間 $T_{n+1}$ は独立です。

<!-- proof-start -->
### 証明

各標本路の時刻 $t$ を含むサイクルはただ一つなので、互いに素な事象に分けて

$$
\begin{aligned}
P(B(t)>x)
&=\sum_{n=0}^\infty P(S_n\le t,\ S_{n+1}>t+x)\\
&=\sum_{n=0}^\infty E\left[
\mathbf1_{\{S_n\le t\}}
P(T_{n+1}>t+x-S_n\mid S_n)\right].
\end{aligned}
$$

$T_{n+1}$ は $(T_1,\ldots,T_n)$ に独立であり、$S_n$ はこれらの和です。したがって条件付き確率は $\overline F(t+x-S_n)$ です。非負項の和なので順序を交換でき、

$$
P(B(t)>x)
=\sum_{n=0}^\infty\int_{[0,t]}\overline F(t+x-s)\,P(S_n\in ds)
=\int_{[0,t]}\overline F(t+x-s)\,U(ds).
$$

更新直後に次のサイクルを取る規約は $S_n\le t$ と一致しています。
<!-- proof-end -->

### 固定時刻の極限で必要となる条件

この計算の最後の積分は、**鍵更新定理**という更新理論の追加結果で処理できます。次の結果は SP15 の初等更新定理より強く、一般形の証明には更新測度の細かな区間増分の評価が必要です。本講ではその適用条件と、残余寿命への代入を明示します。一般形の鍵更新定理自体を初等更新定理から証明したとは扱いません。

固定時刻に残る周期性を区別するには、更新時刻が共通の時間刻みに乗るかどうかを調べます。

<a id="def-sp16-arithmetic-renewal"></a>

<!-- formal-statement-start -->
> **定義（算術型・非算術型の更新間隔）**  
> 正の確率変数 $T$ に対して、ある $d>0$ が存在して $P(T\in\{d,2d,3d,\ldots\})=1$ となるとき、その分布を**算術型**と呼ぶ。そのような $d$ が存在しないとき、**非算術型（非格子型）**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp16-arithmetic-renewal -->
### 直接例：一定間隔と指数間隔

**定義の確認**

$T=2$ の場合は $d=2$ と取れば $P(T\in\{2,4,6,\ldots\})=1$ なので算術型です。率 $\lambda>0$ の指数分布では、任意の $d>0$ について集合 $\{d,2d,\ldots\}$ は可算で、連続密度 $\lambda e^{-\lambda t}$ を持つ $T$ がその集合に入る確率は $0$ です。従って非算術型です。
<!-- definition-example-end -->

<a id="thm-sp16-key-renewal-input"></a>

<!-- formal-statement-start -->
> **定理（鍵更新定理：単調可積分関数への適用形）**  
> $T_i$ を正で有限な独立同分布待ち時間、$0<\mu=E[T_1]<\infty$ とし、分布が非算術型であるとする。$g:[0,\infty)\to[0,\infty)$ が非増加、可積分であれば

$$
\lim_{t\to\infty}\int_{[0,t]}g(t-s)\,U(ds)
=\frac1\mu\int_0^\infty g(v)\,dv
$$

> が成り立つ。これは一般の鍵更新定理の、ここで必要な特殊形である。
<!-- formal-statement-end -->

上の鍵更新定理は**本章で証明しない外部結果**です。以下の残余寿命極限は、既習の初等更新定理からではなく、この追加結果を用いた帰結です。具体的な非格子分布に対する独立した計算も後で示します。

<a id="cor-sp16-residual-limit"></a>

<!-- formal-statement-start -->
> **系（非格子型の固定時刻残余寿命極限）**  
> 正で有限な独立同分布待ち時間が $0<\mu=E[T_1]<\infty$ で、非算術型なら、各 $x\ge0$ に対し

$$
\boxed{\lim_{t\to\infty}P(B(t)>x)
=\frac1\mu\int_x^\infty P(T_1>v)\,dv=G(x)}
$$

> が成り立つ。ここでは $E[T_1^2]<\infty$ は要求しない。
<!-- formal-statement-end -->

### 証明の見取り図

[更新測度表示](#prop-sp16-residual-formula)に現れる関数 $g_x(u)=\overline F(u+x)$ は非負・非増加です。積分が有限であることを平均待ち時間から確認すれば、上の鍵更新定理に代入できます。

<!-- proof-start -->
### 証明

$x\ge0$ を固定し $g_x(u)=P(T_1>u+x)$ と置きます。尾確率は非負・非増加であり、

$$
\int_0^\infty g_x(u)\,du
=\int_x^\infty P(T_1>v)\,dv
=E[(T_1-x)_+]\le E[T_1]=\mu<\infty.
$$

したがって [鍵更新定理](#thm-sp16-key-renewal-input)の $g$ に $g_x$ を代入できます。[更新測度表示](#prop-sp16-residual-formula)の左辺をそれと同じ形で書けば

$$
P(B(t)>x)=\int_{[0,t]}g_x(t-s)\,U(ds)
\longrightarrow\frac1\mu\int_0^\infty g_x(u)\,du=G(x).
$$

これは各 $x$ の尾確率の極限であり、時間平均からの単なる期待値交換ではありません。
<!-- proof-end -->

### 二つの境界例

**格子型では固定時刻極限が壊れる。** $T_i=2$ なら $B(2n)=2$、$B(2n+1)=1$ です。例えば $x=3/2$ に対して

$$
P(B(2n)>3/2)=1,\qquad P(B(2n+1)>3/2)=0.
$$

従って $P(B(t)>x)$ の極限は存在しません。一方、時間平均の尾確率は $G(x)=(2-x)_+/2$ で、$x=3/2$ では $1/4$ です。**時間平均の極限には非格子性は不要**でした。

**Poisson 過程では全時刻で残余寿命が指数型。** $T_i$ が率 $\lambda$ の指数分布なら [Poisson 過程の構成](../SP10/index.md#thm-sp10-exponential-construction)の独立増分より、時刻 $t$ から $x$ の間に更新がない確率は $e^{-\lambda x}$。ゆえに

$$
P(B(t)>x)=e^{-\lambda x}\quad(t,x\ge0).
$$

同時に $\mu=1/\lambda$、$G(x)=\lambda\int_x^\infty e^{-\lambda v}dv=e^{-\lambda x}$ です。指数間隔では観測時刻に依らないという、一般には成立しない特別な性質が現れます。

### 非格子型の具体的な検算：二段階の指数待ち時間

独立な率 $\lambda$ の指数確率変数二つの和 $T_i=E_{i,1}+E_{i,2}$ を、一サイクルの長さとします。これは連続密度をもつ非格子型で、$\mu=2/\lambda$、尾確率は

$$
\overline F(v)=e^{-\lambda v}(1+\lambda v).
$$

更新が起こるのは、基礎の Poisson 到着の偶数番目だけです。$n$ 回目の更新時刻は率 $\lambda$ の指数待ち時間を $2n$ 個足すので、その密度は

$$
f_{S_n}(s)=\frac{\lambda^{2n}s^{2n-1}e^{-\lambda s}}{(2n-1)!}\quad(s>0).
$$

従って $U$ は時刻 $0$ の原子と、$s>0$ 上の密度

$$
u(s)=\sum_{n=1}^\infty f_{S_n}(s)
=\lambda e^{-\lambda s}\sinh(\lambda s)
=\frac{\lambda}{2}(1-e^{-2\lambda s})
$$

を持ちます。ここでは鍵更新定理を使わず、[更新測度表示](#prop-sp16-residual-formula)へこの密度を入れます。変数 $v=t-s$ に取り直すと

$$
P(B(t)>x)=\overline F(t+x)+\int_0^t\overline F(v+x)u(t-v)\,dv.
$$

第一項は $0$ へ収束し、$0\le u(s)\le\lambda/2$ と $u(t-v)\to\lambda/2$（固定 $v$）から、$\overline F(v+x)$ の可積分性を使って優収束定理を適用できます。その結果

$$
\begin{aligned}
\lim_{t\to\infty}P(B(t)>x)
&=\frac{\lambda}{2}\int_x^\infty e^{-\lambda v}(1+\lambda v)\,dv\\
&=\frac{\lambda}{2}e^{-\lambda x}\left(x+\frac2\lambda\right)
=e^{-\lambda x}\left(1+\frac{\lambda x}{2}\right).
\end{aligned}
$$

具体例では、更新密度を求めることから始めて**固定時刻の極限まで自力で閉じた**ことになります。一般の非格子分布にはこの簡単な更新密度表示がないため、鍵更新定理が必要になります。

### 二乗モーメントと平均残余寿命

$G(x)$ は $E[T_1]<\infty$ だけで定義できますが、その分布の平均は、非負関数の積分順を交換して

$$
\int_0^\infty G(x)\,dx
=\frac1\mu\int_0^\infty\int_x^\infty\overline F(v)\,dv\,dx
=\frac1\mu\int_0^\infty v\overline F(v)\,dv
=\frac{E[T_1^2]}{2\mu}
$$

です。最後の式は $T_1^2=\int_0^{T_1}2v\,dv$ の期待値から出ます。$E[T_1^2]=\infty$ なら極限分布の平均も無限であり、**各時刻の残余寿命の確率分布に極限があることだけから、$E[B(t)]$ の収束を主張してはいけません**。時間平均の残余寿命についての [命題](#prop-sp16-length-bias)も有限二次モーメントを仮定しました。

## 6. 演習 Level A：定義と一サイクルの計算

<a id="ex-sp16-a01"></a>

#### SP16-A01 一定間隔と完成報酬

- Level: A

独立同分布な $T_i=4$、$R_i=6$（いずれも確率 $1$）について $Y(7),Y(8)$ と $Y(t)/t$ の極限を求めよ。更新瞬間の計上規約も示せ。

<!-- solution-start -->
### 詳細解答

$S_n=4n$ なので $N(t)=\lfloor t/4\rfloor$。したがって $Y(t)=6\lfloor t/4\rfloor$、$Y(7)=6$, $Y(8)=12$ です。$S_2=8$ での第2回報酬を含むから $Y(8)=12$ になります。$\mu=4,\rho=6$ で、[更新報酬定理](#thm-sp16-renewal-reward)の条件を満たします。$t/4-1<\lfloor t/4\rfloor\le t/4$ を用いても $Y(t)/t\to6/4=3/2$ です。
<!-- solution-end -->

<a id="ex-sp16-a02"></a>

#### SP16-A02 待ち時間と報酬の相関

- Level: A

$(T_i,R_i)$ が独立同分布で、$(1,1)$ を確率 $3/4$、$(3,9)$ を確率 $1/4$ で取る。平均サイクル長、平均報酬、長期報酬率を求め、同じサイクルの $T_i,R_i$ が独立でないことを確認せよ。

<!-- solution-start -->
### 詳細解答

$\mu=1(3/4)+3(1/4)=3/2$、$\rho=1(3/4)+9(1/4)=3$ です。よって [更新報酬定理](#thm-sp16-renewal-reward)より $Y(t)/t\to3/(3/2)=2$。独立なら $P(T=1,R=1)=P(T=1)P(R=1)=9/16$ のはずですが、実際は $3/4$。従って同じサイクル内では依存します。それでも組同士が独立同分布で $E|R|<\infty$ だから定理を適用できます。
<!-- solution-end -->

<a id="ex-sp16-a03"></a>

#### SP16-A03 更新時刻上の年齢と残余寿命

- Level: A

待ち時間が確率 $1$ で $T_i=3$ の場合、$t=7$ と $t=9$ の $N(t),A(t),B(t),L(t)$ をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

$S_n=3n$ だから $N(7)=2$、$S_2=6,S_3=9$ です。従って $A(7)=7-6=1$, $B(7)=9-7=2$, $L(7)=3$。時刻 $9$ は更新そのものなので $N(9)=3$ として次のサイクルを選び、$A(9)=9-S_3=0$, $B(9)=S_4-9=12-9=3$, $L(9)=3$ です。どちらも $A+B=L$ です。
<!-- solution-end -->

<a id="ex-sp16-a04"></a>

#### SP16-A04 残余寿命の時間平均尾確率

- Level: A

$T_i=2$ の一定更新間隔について、時刻を長時間にわたって観測したとき $B(s)>1/2$ となる時間の割合を求めよ。式 $G(x)$ でも確認せよ。

<!-- solution-start -->
### 詳細解答

各長さ $2$ のサイクル内では $B(s)=2-u$（$0\le u<2$）です。$B(s)>1/2$ は $0\le u<3/2$ と同値で、1サイクルのうち $3/2$ 時間です。よって長期割合は $(3/2)/2=3/4$。[時間平均定理](#thm-sp16-occupation)からも $E[(T-1/2)_+]/E[T]=(2-1/2)/2=3/4$ です。
<!-- solution-end -->

<a id="ex-sp16-a05"></a>

#### SP16-A05 指数間隔の残余寿命

- Level: A

更新間隔が独立同分布の率 $\lambda>0$ の指数分布に従う。$G(x)$ を直接積分し、$P(B(t)>x)$ と比較せよ。

<!-- solution-start -->
### 詳細解答

$\mu=1/\lambda$、$\overline F(v)=e^{-\lambda v}$ だから

$$
G(x)=\lambda\int_x^\infty e^{-\lambda v}\,dv
=\lambda\left[-\frac1\lambda e^{-\lambda v}\right]_x^\infty
=e^{-\lambda x}.
$$

[Poisson 過程の独立増分](../SP10/index.md#thm-sp10-exponential-construction)から、$(t,t+x]$ に更新がない確率も $e^{-\lambda x}$ です。ゆえに固定時刻でも $P(B(t)>x)=G(x)$ であり、指数型の特別な無記憶性を示しています。
<!-- solution-end -->

## 7. 演習 Level B：証明の機構と仮定

<a id="ex-sp16-b01"></a>

#### SP16-B01 期待報酬で独立性を誤用しない

- Level: B

$(T_i,R_i)$ は独立同分布なサイクルの組で、$T_i>0$、$E[T_i]\in(0,\infty)$、$E|R_i|<\infty$ とする。$m(u)=E[N(u)]$ とするとき、$E[Y(t)]$ を $(T_1,R_1)$ と $m$ だけで表し、なぜ $E[Y(t)]=E[R_1]m(t)$ と一般には置けないか述べよ。

<!-- solution-start -->
### 詳細解答

**完了した第 $i$ サイクルが寄与する報酬**を $R_i\mathbf1_{\{S_i\le t\}}$ と分解します。$S_{i-1}$ は $(T_i,R_i)$ に独立であるため、$T_i=s\le t$ で条件付けたときの寄与の期待値は $E[R_i\mathbf1_{\{T_i\le t\}}P(S_{i-1}\le t-T_i\mid T_i,R_i)]$ です。$i\ge1$ で足し合わせ、$U([0,u])=1+m(u)$ を使うと

$$
E[Y(t)]=E\left[\mathbf1_{\{T_1\le t\}}R_1\{1+m(t-T_1)\}\right].
$$

絶対可積分性は [更新報酬定理の証明](#thm-sp16-renewal-reward)で示した $E|R_1|(1+m(t))<\infty$ から従います。例として $P((T,R)=(1,1))=P((T,R)=(3,9))=1/2$ を取ると $t=1$ では $Y(1)=1$ が確率 $1/2$、それ以外は零なので $E[Y(1)]=1/2$。一方 $\rho=5$, $m(1)=1/2$ だから $\rho m(1)=5/2$ で一致しません。完成時刻と報酬が同じ組の中で結び付くため、単純な積への分解ができないのです。
<!-- solution-end -->

<a id="ex-sp16-b02"></a>

#### SP16-B02 時間に偏ったサイクルの分布

- Level: B

$T_i$ は独立同分布で、$P(T_i=1)=2/3$、$P(T_i=4)=1/3$ とする。長い時間から無作為に時刻を選んだときの観測サイクル長の時間割合、平均観測長、平均残余寿命の時間平均を求めよ。

<!-- solution-start -->
### 詳細解答

$\mu=(2/3)\cdot1+(1/3)\cdot4=2$、$E[T^2]=(2/3)\cdot1+(1/3)\cdot16=6$。[観測サイクル長の偏り](#prop-sp16-length-bias)によれば長さ $1$ を観測する時間割合は $1(2/3)/2=1/3$、長さ $4$ は $4(1/3)/2=2/3$。和は1です。平均観測長は $1(1/3)+4(2/3)=3=E[T^2]/\mu$。平均残余寿命の時間平均は $E[T^2]/(2\mu)=6/4=3/2$。サイクル本数の平均 $\mu=2$ と区別します。
<!-- solution-end -->

<a id="ex-sp16-b03"></a>

#### SP16-B03 格子型で壊れる極限

- Level: B

$T_i=3$ の一定更新間隔で $x=1$ とする。$\lim_{t\to\infty}P(B(t)>1)$ が存在しないことを示し、一方で $\lim_{t\to\infty}t^{-1}\int_0^t\mathbf1_{\{B(s)>1\}}ds$ を求めよ。

<!-- solution-start -->
### 詳細解答

一定間隔なので $S_n=3n$ であり、$B(t)=3(\lfloor t/3\rfloor+1)-t$ です。整数 $n\ge0$ で時刻 $3n$ を観測すると $B(3n)=3$、時刻 $3n+5/2$ なら $B(3n+5/2)=1/2$ になります。従って

$$
P(B(3n)>1)=1,\qquad P(B(3n+5/2)>1)=0.
$$

二つの部分列で極限が異なるので、固定時刻確率の極限は存在しません。

一方、サイクル内の経過時間を $u\in[0,3)$ とすれば、残余寿命は $B=3-u$ です。$B>1$ は $u<2$ と同値で、各サイクルにおける成立時間が $2$、サイクル長が $3$ だから、長期の時間割合は $2/3$ です。[時間平均定理](#thm-sp16-occupation)でも

$$
G(1)=\frac{E[(3-1)_+]}{E[T_1]}=\frac23
$$

と計算できます。固定時刻極限に必要な [非格子性の仮定](#cor-sp16-residual-limit)が失われたことが、周期的な振動の原因です。
<!-- solution-end -->

<a id="ex-sp16-b04"></a>

#### SP16-B04 更新測度の式と非格子型の残余寿命

- Level: B

正で有限な独立同分布待ち時間が非格子型かつ平均 $\mu<\infty$ とする。$U(C)=\sum_{n\ge0}P(S_n\in C)$ として $P(B(t)>x)$ の積分表示を導き、鍵更新定理を適用する関数を指定し、その可積分性を確認せよ。

<!-- solution-start -->
### 詳細解答

$B(t)>x$ であるのは、ただ一つの $n\ge0$ で $S_n\le t<S_{n+1}$ かつ $S_{n+1}>t+x$ が成立することです。$S_{n+1}=S_n+T_{n+1}$、$T_{n+1}$ は $S_n$ と独立なので

$$
P(B(t)>x)=\sum_{n\ge0}E[\mathbf1_{\{S_n\le t\}}\overline F(t+x-S_n)]
=\int_{[0,t]}\overline F(t+x-s)\,U(ds).
$$

$g_x(v)=\overline F(v+x)$ と置けば、非負・非増加であり

$$
\int_0^\infty g_x(v)\,dv
=E[(T_1-x)_+]\le\mu<\infty.
$$

よって [鍵更新定理](#thm-sp16-key-renewal-input)の仮定を満たし、極限は $(1/\mu)\int_x^\infty\overline F(v)dv$。**非格子性はこの定理の適用で使い、有限二次モーメントは使っていません。**
<!-- solution-end -->

## 8. 演習 Level C：更新報酬と観測バイアスをつなぐ

<a id="ex-sp16-c01"></a>

#### SP16-C01 二値間隔の報酬・残余寿命・長期観測

- Level: C

$(T_i,R_i)$ は独立同分布な組で、$(T_i,R_i)=(1,1)$ または $(3,9)$ が各確率 $1/2$ で起こる。通常更新過程から $Y(t)$、$A(t)$、$B(t)$、$L(t)$ を定める。

1. $E[T_i]$、$E[R_i]$ を求め、$Y(t)/t$ と $E[Y(t)]/t$ の極限を求めよ。
2. 長時間の観測で $L(s)=3$ となる時間割合と、$B(s)>1$ となる時間割合をそれぞれ求めよ。
3. $B(s)$ の時間平均の極限を求め、二乗モーメントが使われる箇所を指摘せよ。
4. $P(B(t)>1)$ の $t\to\infty$ における極限が存在するか判定せよ。時間平均の結果との相違を説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 報酬率。** $T_i$ の平均は $\mu=(1+3)/2=2$、$R_i$ の平均は $\rho=(1+9)/2=5$ です。二点分布なので $E|R_i|=5<\infty$。各組は独立同分布で正の待ち時間を持つため、[更新報酬定理](#thm-sp16-renewal-reward)の標本路版・期待値版とも適用でき、

$$
\frac{Y(t)}t\to\frac52\quad\text{ほとんど確実に},
\qquad
\frac{E[Y(t)]}t\to\frac52.
$$

**2. 観測時間割合。** 一サイクルを本数で数えれば $T=3$ は確率 $1/2$ ですが、[長さによる偏り](#prop-sp16-length-bias)では

$$
P_{\mathrm{time}}(L=3)
=\frac{E[T\mathbf1_{\{T=3\}}]}{\mu}
=\frac{3(1/2)}2=\frac34.
$$

残余寿命が $1$ より長いのは、長さ $1$ のサイクルでは（時刻集合の測度零を除いて）起こらず、長さ $3$ のサイクルでは開始から2時間です。したがって [時間平均定理](#thm-sp16-occupation)から

$$
G(1)=\frac{E[(T-1)_+]}{\mu}
=\frac{(1/2)\cdot0+(1/2)\cdot2}{2}
=\frac12.
$$

**3. 残余寿命の平均時間。** $E[T^2]=(1+9)/2=5<\infty$ なので、[残余寿命の時間平均](#prop-sp16-length-bias)から

$$
\frac1t\int_0^t B(s)\,ds\longrightarrow\frac{5}{2\cdot2}=\frac54
\quad\text{ほとんど確実に}.
$$

各サイクルの積分が $\int_0^{T_i}(T_i-u)du=T_i^2/2$ であるため、その平均に強大数則を使う箇所で $E[T^2]<\infty$ が必要です。

**4. 固定時刻の判定。** $x=1$ では、意外にも極限が**存在**します。更新時刻は全て整数なので、$k\le t<k+1$（整数 $k$）なら途中で更新は起きず、$B(t)=B(k)-(t-k)$ です。$B(k)$ は正整数なので

$$
\{B(t)>1\}=\{B(k)\ge2\}\qquad(k\le t<k+1).
$$

整数 $k\ge0$ で更新が起きる確率を $a_k=U(\{k\})$ とします。$a_0=1$、$a_j=0$（$j<0$）、最初の間隔が $1$ または $3$ なので

$$
a_k=\frac12a_{k-1}+\frac12a_{k-3}\qquad(k\ge1).
$$

特性方程式は $2r^3-r^2-1=(r-1)(2r^2+r+1)=0$。$r=1$ 以外の二根は $(-1\pm i\sqrt7)/4$ で、その絶対値は $1/\sqrt2<1$ です。よって $a_k\to c$ と書けます。また上の漸化式から

$$
a_k+\frac12a_{k-1}+\frac12a_{k-2}=1\qquad(k\ge0)
$$

が帰納法で分かります（$k=0$ では $a_0=1$、漸化式を使うと左辺は一つ前から変わりません）。極限を取って $2c=1$、すなわち $a_k\to1/2$ です。

$B(k)\ge2$ となるのは、最後の更新が $k$ か $k-1$ で、**次の間隔が $3$** の場合だけです。両事象は互いに素で、更新後の間隔は過去に独立なので

$$
P(B(k)>1)=\frac12a_k+\frac12a_{k-1}
\longrightarrow\frac12.
$$

従って任意の実時刻 $t\to\infty$ に対し $P(B(t)>1)\to1/2$ です。これは第2問の時間平均 $G(1)=1/2$ に一致しますが、**非格子性が不要になったわけではありません**。例えば $x=1/2$ では整数時刻の超過確率が常に $1$、時刻 $k+3/4$ の超過確率は $P(B(k)\ge2)\to1/2$ です。したがって別の閾値では極限が存在せず、固定時刻の分布全体は収束しません。

<!-- solution-end -->

## 9. まとめと次の講義

独立同分布なサイクルの組と $E[T]\in(0,\infty)$、$E|R|<\infty$ があれば、終了時に加える報酬の標本路平均と期待報酬率は $E[R]/E[T]$ になります。年齢と残余寿命の**時間について平均した尾確率**は $G(x)=E[(T-x)_+]/E[T]$ によって求まり、長いサイクルを見つけやすい検査のパラドックスも説明できます。平均残余寿命の有限値には $E[T^2]<\infty$ が必要です。

これに対して**固定時刻における残余寿命の尾確率**を同じ形へ収束させるには、一般には非格子性と鍵更新定理が必要です。次の SP17 では更新・報酬の考え方を、到着とサービスが競合する待ち行列の人数や待ち時間に使います。
