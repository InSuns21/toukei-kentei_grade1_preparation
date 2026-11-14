# SP10 計数過程・Poisson 過程・指数待ち時間

電話の着信や機械の故障を調べるとき、個々の出来事の中身より、まず「時刻 $t$ までに何回起きたか」を知りたいことがあります。[STO1 の確率過程](../../STO/STO1/index.md#def-sto1-stochastic-process)は時刻ごとの確率変数を与えますが、それだけでは、過去と無関係な到着かどうかは分かりません。

本講では、出来事を数える標本路から始め、**Poisson 分布で数える方法**と**独立な指数待ち時間を足し合わせる方法**が同じ過程を構成することを検証します。最後に、過去の計数を知っても将来の増分の平均は変わらないという性質を、[STO2 のマルチンゲール](../../STO/STO2/index.md#def-sto2-martingale)へ接続します。

以下、確率空間を $(\Omega,\mathcal F,P)$、率を $\lambda>0$ とし、時間は $t\ge0$ とします。$N_t$ は時刻 $t$ までの到着回数で、$N_t-N_s$ は区間 $(s,t]$ 内の到着回数です。[STO1 の自然なフィルトレーション](../../STO/STO1/index.md#def-sto1-adapted-natural-filtration)に従い、$\mathcal F_t^N=\sigma(N_u:0\le u\le t)$ を時刻 $t$ までの計数の情報とします。

## 1. 到着を数える標本路

たとえば到着が時刻 $0.4,1.1,1.9$ に生じれば、$N_0=0$、$N_1=1$、$N_{1.1}=2$、$N_2=3$ となります。到着の瞬間を「すでに数えた」値にするため、右連続な階段状の標本路を考えます。

<a id="def-sp10-simple-counting"></a>

<!-- formal-statement-start -->
> **定義（単純計数過程）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上の過程 $N=(N_t)_{t\ge0}$ が単純計数過程であるとは、確率 $1$ で次をすべて満たすことをいう。
>
> 1. $N_0=0$ で、各 $N_t$ は有限の非負整数値を取る。
> 2. 標本路 $t\mapsto N_t$ は非減少かつ右連続である。
> 3. 各跳躍の大きさは $1$ である（同時に二件以上到着しない）。
>
> 従って各有限区間には有限個の到着しかない。$n\ge1$ に対する第 $n$ 到着時刻は次で与える。

$$
T_n=\inf\{t\ge0:N_t\ge n\},\qquad T_0=0,
$$

> ただし到着しなければ $T_n=\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp10-simple-counting -->
### 直接例：三回の確定的な到着

上の $0.4,1.1,1.9$ の三回だけ到着するモデルでは

$$
N_t=\boldsymbol{1}_{\{t\ge0.4\}}+
\boldsymbol{1}_{\{t\ge1.1\}}+
\boldsymbol{1}_{\{t\ge1.9\}}.
$$

**定義の確認**：単純計数過程の三条件を、式の各項から順に確かめます。

1. 最初の到着は時刻 $0.4>0$ なので $N_0=0$ です。また指示関数は $0$ または $1$ しか取らないため、すべての時刻で $N_t\in\{0,1,2,3\}$ は有限の非負整数です。
2. 各指示関数は非減少で、到着の瞬間に値が $1$ になる右連続関数です。従って有限和 $N_t$ も非減少・右連続です。
3. 三つの到着時刻はすべて異なるため、一時刻に変化する指示関数は一つだけです。各跳躍は正確に $1$ で、二件同時到着はありません。

従って $T_1=0.4,T_2=1.1,T_3=1.9$、$T_4=\infty$ です。
<!-- definition-example-end -->

このモデルは単純計数過程ですが、到着時刻が決定論的なため、これから導入する Poisson 過程とは異なります。**計数過程であること**と**Poisson 過程であること**を分ける必要があります。

## 2. 区間の長さだけで到着確率を決める

到着数が時間の長さだけで決まり、互いに重ならない区間の到着数が独立なら、過去の件数を知っても次の区間の件数を予測しやすくなりません。独立増分と定常増分とは、それぞれ「離れた区間の無関係さ」と「同じ長さの区間の同じ分布」という別の条件です。

本講では、率 $\lambda$ の **Poisson 過程**を、右連続・非減少・整数値で $N_0=0$ を満たし、互いに重ならない区間の増分が独立で、各増分が区間の長さに比例する母数の Poisson 分布に従う過程として扱います。後続の確率解析の[Poisson 過程の定義](../../STO/STO13/index.md#def-sto13-poisson-process)もこの条件を用います。任意の $0\le s<t$ と整数 $k\ge0$ に対して

$$
P(N_t-N_s=k)=e^{-\lambda(t-s)}
\frac{(\lambda(t-s))^k}{k!},
$$

かつ互いに重ならない時間区間の増分は独立です。Poisson 分布の値は非負整数です。長さ $h>0$ の区間 $(s,s+h]$ の件数を $\Delta N:=N_{s+h}-N_s$ と書くと、

$$
\begin{aligned}
P(\Delta N=0)&=e^{-\lambda h},\\
P(\Delta N=1)&=\lambda h e^{-\lambda h},\\
P(\Delta N\ge2)&=1-(1+\lambda h)e^{-\lambda h}.
\end{aligned}
$$

$h\downarrow0$ とすると、指数関数の展開から三式は順に $1-\lambda h+O(h^2)$、$\lambda h+O(h^2)$、$O(h^2)$ となります。短い時間での二回以上の到着は一次より小さい確率です。

### 分布で指定された過程は本当に一回ずつ跳ぶか

前節で用いた Poisson 過程の条件は、右連続・整数値・非減少と増分分布を要求しますが、跳躍の大きさ $1$ を別の公理としては置いていません。そこで $[0,T]$ を長さ $T/m$ の $m$ 区間に分けます。Poisson 変数 $K$ の平均が $\mu$ なら

$$
E[K(K-1)]=\mu^2,\qquad
P(K\ge2)\le\frac{E[K(K-1)]}{2}=\frac{\mu^2}{2}.
$$

各小区間の平均は $\mu=\lambda T/m$。和集合の確率の上界から

$$
P\left(\text{少なくとも一つの小区間で二回以上到着}\right)
\le\frac{\lambda^2T^2}{2m}\longrightarrow0.
$$

大きさ $2$ 以上の跳躍があれば、どの分割でもそれを含む区間の増分は $2$ 以上です。ゆえに $[0,T]$ で複数同時到着の確率は $0$。$T=1,2,\ldots$ を合わせれば全時刻で単位跳躍です。また $N_T$ は有限の Poisson 変数なので有限時間で無限回の跳躍はありません。これで Poisson 過程が前節の単純計数過程でもあることを確認できました。

## 3. 最初の到着を待つ：指数分布と無記憶性

最初の到着 $T_1$ が $t$ より後であることは、時刻 $t$ まで何も到着しないことと同値です。

$$
P(T_1>t)=P(N_t=0)=e^{-\lambda t}\qquad(t\ge0).
$$

これが率 $\lambda$ の指数分布の生存関数です。従って $T_1$ は密度 $\lambda e^{-\lambda t}$（$t>0$）を持ち、積分により平均 $1/\lambda$ となります。

すでに時刻 $s$ まで何も起きなかったとき、追加で $t$ 待つ確率を考えます。条件付き確率を商で書けば

$$
\begin{aligned}
P(T_1>s+t\mid T_1>s)
&=\frac{P(T_1>s+t)}{P(T_1>s)}\\
&=\frac{e^{-\lambda(s+t)}}{e^{-\lambda s}}\\
&=e^{-\lambda t}.
\end{aligned}
$$

これが**無記憶性**です。経過した待ち時間 $s$ が、残りの待ち時間の分布に影響しません。逆に、非負で有限な待ち時間の生存関数 $G(t)$ が $G(0)=1$、$G(s+t)=G(s)G(t)$ を満たし右連続かつ $G(t)>0$ なら、$g(t)=-\log G(t)$ は連続な加法関数です。正整数の倍数から有理数へ、さらに連続性で実数へ拡張すると $g(t)=\lambda t$ となります。正の有限平均を仮定すれば $\lambda>0$ です。**指数分布だけ**がこの条件を満たすことが分かります。

最初の一回だけでは足りません。二回目以降にも同じ法則が現れ、しかも独立である必要があります。以下で直接証明します（後続の確率解析では[Poisson 過程の待ち時間定理](../../STO/STO13/index.md#thm-sto13-exponential-waiting)としても扱います）。結論は

$$
W_n=T_n-T_{n-1}\quad(n\ge1),\qquad
W_1,W_2,\ldots\ \text{独立同分布 }\operatorname{Exp}(\lambda)
$$

を与えます。ここではこの定理の密度計算を再確認します。

### なぜ待ち時間は互いに独立なのか

$0<t_1<\cdots<t_n$ と正数 $h_1,\ldots,h_n$ を、区間 $(t_i,t_i+h_i]$ が互いに重ならないように取ります。各 $T_i$ が対応する区間に入るには、$t_n$ 以前に第 $1$ から第 $n-1$ 区間ではちょうど一件ずつ到着し、それ以外では到着せず、最後の区間には少なくとも一件到着することが必要十分です。独立増分により、この事象の確率は**厳密に**

$$
\begin{aligned}
&e^{-\lambda(t_n-\sum_{i=1}^{n-1}h_i)}
\prod_{i=1}^{n-1}(e^{-\lambda h_i}\lambda h_i)
(1-e^{-\lambda h_n})\\
&=e^{-\lambda t_n}\lambda^{n-1}
\left(\prod_{i=1}^{n-1}h_i\right)(1-e^{-\lambda h_n}).
\end{aligned}
$$

$n=1$ でも空積を $1$ とすれば同じ式です。これを $h_1\cdots h_n$ で割り、各幅を零へ送ると、$(1-e^{-\lambda h_n})/h_n\to\lambda$ です。従って順序付き到着時刻の同時密度は

$$
f_{T_1,\ldots,T_n}(t_1,\ldots,t_n)
=\lambda^n e^{-\lambda t_n}
\qquad(0<t_1<\cdots<t_n)
$$

になります。これは上の定理の証明で使った密度です。

待ち時間へ変数変換するには $w_1=t_1$、$w_k=t_k-t_{k-1}$（$k\ge2$）と置きます。逆変換は $t_k=w_1+\cdots+w_k$ です。積分変数を $t_n$ から $w_n=t_n-t_{n-1}$ に替えると、$t_{n-1}$ を固定した一変数の平行移動なので $dt_n=dw_n$ です。次に $t_{n-1}$ も同様に $w_{n-1}$ へ置き換える操作を繰り返すため、積分の体積要素に倍率は生じません。以上から

$$
\begin{aligned}
f_{W_1,\ldots,W_n}(w_1,\ldots,w_n)
&=\lambda^n e^{-\lambda(w_1+\cdots+w_n)}\\
&=\prod_{j=1}^n\lambda e^{-\lambda w_j},
\qquad w_j>0.
\end{aligned}
$$

任意の有限 $n$ で同時密度が積へ分解するため、全待ち時間は互いに独立で、同じ率 $\lambda$ の指数分布に従います。また $T_n$ の密度は、$T_1,\ldots,T_{n-1}$ の取り得る領域を積分消去して

$$
\begin{aligned}
f_{T_n}(t)
&=\int_{0<t_1<\cdots<t_{n-1}<t}
\lambda^n e^{-\lambda t}\,dt_1\cdots dt_{n-1}\\
&=\frac{\lambda^n t^{n-1}e^{-\lambda t}}{(n-1)!},\qquad t>0.
\end{aligned}
$$

です。最後は $(0,t)^{n-1}$ を $(n-1)!$ 個の順序領域へ分けた体積で、$n=1$ のときは空積分を $1$ とします。さらに $n$ を固定して $t\to\infty$ とすると、

$$
P(T_n>t)=P(N_t<n)
=e^{-\lambda t}\sum_{k=0}^{n-1}\frac{(\lambda t)^k}{k!}
\longrightarrow0.
$$

従って各 $T_n$ は確率 $1$ で有限であり、差 $W_n=T_n-T_{n-1}$ も確率 $1$ で定まります。このように待ち時間の独立性も到着時刻の密度も、本節の独立増分から計算できます。

**この片方向だけなら**、Poisson 過程が存在することを前提として待ち時間を取り出しています。逆に指数待ち時間だけを用意したとき、Poisson 過程を構成できるでしょうか。

## 4. 指数待ち時間から計数過程を構成する

互いに独立で同じ分布に従う正の待ち時間 $W_1,W_2,\ldots$ を用意し、到着時刻を部分和 $T_n=\sum_{j=1}^nW_j$ で定めます。$T_n$ が有限時間に無限個たまらないことを確認した後、$N_t$ を $T_n\le t$ の個数で定めます。

<a id="thm-sp10-exponential-construction"></a>

<!-- formal-statement-start -->
> **定理（指数待ち時間からの Poisson 過程構成）**  
> $\lambda>0$ とし、確率空間上の $W_1,W_2,\ldots$ を互いに独立で同じ分布を持ち、各 $W_j$ が密度 $\lambda e^{-\lambda w}$（$w>0$）を持つ確率変数とする。

$$
T_0=0,\qquad T_n=\sum_{j=1}^nW_j,\qquad
N_t=\sum_{n=1}^{\infty}\boldsymbol{1}_{\{T_n\le t\}}
$$

> と定める。このとき確率 $1$ で $T_n\to\infty$ であり、$N$ は率 $\lambda$ の Poisson 過程である。特に自然なフィルトレーションについて独立定常増分を持ち、任意の $t\ge0$、$k\ge0$ で次が成立する。

$$
P(N_t=k)=e^{-\lambda t}\frac{(\lambda t)^k}{k!}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

まず指数変数の Laplace 変換を使い、有限時間で到着回数が無限大にならないことを示します。次に $N_t=n$ を「$n$ 回目まで到着し、次はまだ到着していない」という事象へ置き換え、時刻の同時密度を単体領域で積分します。最後に無記憶性を**任意の決定論的時刻 $s$** に適用し、残りの待ち時間と、その後の待ち時間列が過去から独立であることを示します。

<!-- proof-start -->
### 証明

**(1) 非爆発性と標本路。** $W_j>0$ a.s. なので $T_n$ は狭義増加です。任意の $a>0$ と固定した $t>0$ に対し、$e^{-aT_n}$ への Markov の不等式を用います。

$$
\begin{aligned}
P(T_n\le t)
&=P(e^{-aT_n}\ge e^{-at})\\
&\le e^{at}E[e^{-aT_n}]\\
&=e^{at}\prod_{j=1}^nE[e^{-aW_j}]\\
&=e^{at}\left(\int_0^\infty\lambda e^{-(\lambda+a)w}\,dw\right)^n\\
&=e^{at}\left(\frac{\lambda}{\lambda+a}\right)^n
\longrightarrow0.
\end{aligned}
$$

$T_n$ は増加するため、$\{T_n\le t\}$ は $n$ に関して減少します。その極限事象 $\{\sup_nT_n\le t\}$ の確率は $0$。$t=1,2,\ldots$ を合わせれば $T_n\to\infty$ a.s. です。従って有限の $t$ には有限個の到着しかなく、$N_0=0$、非減少・右連続・整数値・単位跳躍が成立します。

**(2) 一時刻の Poisson 分布。** 変数変換 $w_j=t_j-t_{j-1}$（$t_0=0$）では、第3節と同じく一変数の平行移動を順に行うため、積分の体積要素は変わりません。独立な指数密度を掛けると、任意の $n\ge1$ について

$$
f_{T_1,\ldots,T_n}(t_1,\ldots,t_n)
=\lambda^n e^{-\lambda t_n},
\qquad 0<t_1<\cdots<t_n.
$$

また、$W_{n+1}$ は $(T_1,\ldots,T_n)$ と独立なので、$N_t=n$ は $T_n\le t<T_{n+1}=T_n+W_{n+1}$ に書き換えられます。従って

$$
\begin{aligned}
P(N_t=n)
&=\int_{0<t_1<\cdots<t_n\le t}
\lambda^n e^{-\lambda t_n}
P(W_{n+1}>t-t_n)\,dt_1\cdots dt_n\\
&=\int_{0<t_1<\cdots<t_n\le t}
\lambda^n e^{-\lambda t_n}e^{-\lambda(t-t_n)}
\,dt_1\cdots dt_n\\
&=\lambda^ne^{-\lambda t}\frac{t^n}{n!}.
\end{aligned}
$$

最後の $t^n/n!$ は立方体 $(0,t)^n$ を全順列の $n!$ 個の等体積の領域に分けた一つの体積です。$n=0$ では $P(N_t=0)=P(W_1>t)=e^{-\lambda t}$ で同じ式となります。$t=0$ は $N_0=0$ から従います。

**(3) 過去と将来の増分の独立性。** 固定した $s\ge0$、$n\ge0$ を取り、$N_s=n$ とします。$T_n\le s<T_{n+1}$ です。非爆発性より $N_s$ は有限なので、次の到着までの残余時間を $R_s:=T_{N_s+1}-s$ と定められます。事象 $\{N_s=n\}$ 上では $R_s=T_{n+1}-s$ です。任意の $B\in\sigma(W_1,\ldots,W_n)$ と $h\ge0$ について、$W_{n+1}$ の独立性を使うと

$$
\begin{aligned}
&P(B,N_s=n,R_s>h)\\
&=E\left[\boldsymbol{1}_B\boldsymbol{1}_{\{T_n\le s\}}
P(W_{n+1}>s+h-T_n\mid W_1,\ldots,W_n)\right]\\
&=E\left[\boldsymbol{1}_B\boldsymbol{1}_{\{T_n\le s\}}
e^{-\lambda(s+h-T_n)}\right]\\
&=e^{-\lambda h}P(B,N_s=n).
\end{aligned}
$$

時刻 $s$ までの計数経路は、$N_s=n$ の上では $T_1,\ldots,T_n$ と「$T_{n+1}>s$」から読み取れます。従って上の等式を、有限到着時刻から決まる過去の事象へ拡張すると、$R_s$ の条件付き生存関数は過去に依存せず $e^{-\lambda h}$ です。

ただし残余時間だけの計算では、その後の待ち時間まで含めた独立性はまだ示していません。任意の整数 $m\ge1$ と $C\in\sigma(W_{n+2},\ldots,W_{n+m+1})$ を取ります。$\{N_s=n\}$ と $\{R_s>h\}$ は $W_1,\ldots,W_{n+1}$ だけで決まるため、独立な待ち時間列の仮定から

$$
\begin{aligned}
&P(B,N_s=n,R_s>h,C)\\
&\quad=P(B,N_s=n,R_s>h)P(C)\\
&\quad=e^{-\lambda h}P(B,N_s=n)P(C).
\end{aligned}
$$

この式は、過去を固定しても $R_s$ が率 $\lambda$ の指数分布を持ち、$W_{n+2},\ldots,W_{n+m+1}$ と独立であることを表します。$n$ ごとに同じ積の分布が得られ、$\{N_s=n\}$ で場合分けして足し合わせられます。任意の有限個の未来の待ち時間と、有限個の過去の計数の事象について独立性が成立するので、生成される $\mathcal F_s^N$ 全体にも拡張できます。よって **時刻 $s$ 以降の待ち時間列** $(R_s,W_{N_s+2},W_{N_s+3},\ldots)$ は $\mathcal F_s^N$ と独立で、元の $(W_1,W_2,\ldots)$ と同じ独立な率 $\lambda$ の指数列です。

従って $u\ge0$ に対し $N_{s+u}-N_s$ は元の構成の $N_u$ と同じ法則を持ち、しかも $\mathcal F_s^N$ から独立です。順に時刻を選び条件付ければ、互いに重ならない複数区間の増分も独立です。以上で独立定常増分、Poisson 分布、および右連続な計数標本路をすべて示しました。
<!-- proof-end -->

この証明は「待ち時間の無記憶性」を、最初の一回だけでなく**時刻 $s$ で進行中の待ち時間**へ使う点が重要です。単に $N_t$ の周辺分布が Poisson であると分かっても、独立増分は自動的には得られません。

## 5. 到着時刻を条件付きで見る

$N_t=n$ と分かったとき、時刻 $t$ より前の $n$ 回はどのように配置されるでしょうか。上の同時密度計算が、そのまま答えを与えます。

<a id="prop-sp10-conditional-arrival-times"></a>

<!-- formal-statement-start -->
> **命題（到着回数を固定したときの到着時刻）**  
> $N$ を率 $\lambda>0$ の Poisson 過程とする。$t>0$ と $n\ge1$ を固定すると、$N_t=n$ を条件とした $(T_1,\ldots,T_n)$ の同時密度は

$$
f(t_1,\ldots,t_n\mid N_t=n)
=\frac{n!}{t^n}
\boldsymbol{1}_{\{0<t_1<\cdots<t_n<t\}}.
$$

> 特に、この条件付き分布は $\lambda$ に依存せず、区間 $(0,t)$ の独立な一様乱数 $n$ 個を小さい順に並べた分布と一致する。
<!-- formal-statement-end -->

### 証明の見取り図

「指定した $n$ 時刻に到着し、時刻 $t$ まで次の到着がない」同時密度は $\lambda^n e^{-\lambda t}$ です。これを $P(N_t=n)$ で割ると、$\lambda$ が消えます。

<!-- proof-start -->
### 証明

第3節で直接求めた到着時刻の同時密度と第4節の指数待ち時間構成から、$0<t_1<\cdots<t_n<t$ における $T_1,\ldots,T_n$ と $N_t=n$ の同時密度は

$$
\lambda^ne^{-\lambda t_n}
P(W_{n+1}>t-t_n)
=\lambda^ne^{-\lambda t}.
$$

一方、$P(N_t=n)=e^{-\lambda t}(\lambda t)^n/n!>0$ です。従って条件付き密度は

$$
\frac{\lambda^ne^{-\lambda t}}
{e^{-\lambda t}(\lambda t)^n/n!}
=\frac{n!}{t^n}
$$

です。一様乱数 $n$ 個の同時密度は立方体 $(0,t)^n$ 上で $t^{-n}$。その並び方は $n!$ 通りで、重複時刻の確率は $0$ なので、昇順に整列した密度は $n!/t^n$ です。これで一致を示しました。
<!-- proof-end -->

例えば $N_t=1$ と分かったときの $T_1$ は $(0,t)$ の一様分布です。これは、到着数を先に固定して時刻をランダムに配置するシミュレーションにも利用できます。

二件と分かっている場合は、前半と後半に一件ずつ到着する条件付き確率も求められます。$N_t=2$ のもとで、$T_1<t/2<T_2$ の確率は

$$
\begin{aligned}
P(T_1<t/2<T_2\mid N_t=2)
&=\frac{2}{t^2}\int_0^{t/2}\int_{t/2}^{t}dv\,du\\
&=\frac{2}{t^2}\cdot\frac t2\cdot\frac t2=\frac12.
\end{aligned}
$$

実際、区間 $(0,t)$ の一様乱数二個のうち、ちょうど一個が前半に入る確率は $2(1/2)(1/2)=1/2$ です。順序付き時刻は独立ではありませんが、並べ替える前の二つの一様乱数は独立だという違いが、この計算に現れます。

## 6. 平均の蓄積とマルチンゲール

Poisson 分布から $E[N_t]=\lambda t$、$\operatorname{Var}(N_t)=\lambda t$ です。これらは確率母関数を使わなくても、$P(N_t=k)$ の級数を添字移動して確かめられます。たとえば $\mu=\lambda t$ とすると

$$
\begin{aligned}
E[N_t]
&=e^{-\mu}\sum_{k=1}^\infty
k\frac{\mu^k}{k!}
=\mu e^{-\mu}\sum_{\ell=0}^\infty\frac{\mu^\ell}{\ell!}
=\mu,\\
E[N_t(N_t-1)]
&=e^{-\mu}\sum_{k=2}^\infty
k(k-1)\frac{\mu^k}{k!}=\mu^2.
\end{aligned}
$$

従って $E[N_t^2]=\mu^2+\mu$、$\operatorname{Var}(N_t)=\mu$ です。$0\le s\le t$ なら $N_t=N_s+(N_t-N_s)$、二項は独立であり、

$$
\operatorname{Cov}(N_s,N_t)
=\operatorname{Var}(N_s)=\lambda s.
$$

一般には $\operatorname{Cov}(N_s,N_t)=\lambda\min(s,t)$ です。時間差を無視して $N_s$ と $N_t$ を独立だと考えると、この共分散を失います。

[STO2 のマルチンゲールの定義](../../STO/STO2/index.md#def-sto2-martingale)で求める可積分性・適合性・条件付き平均の等式を、ここでは連続時間の任意の実数時刻 $0\le s\le t$ に対して確認します。中心化した $M_t=N_t-\lambda t$ は各 $t$ で可積分、$\mathcal F_t^N$ 可測です。$s\le t$ のとき

$$
\begin{aligned}
E[M_t\mid\mathcal F_s^N]
&=E[N_s+(N_t-N_s)-\lambda t\mid\mathcal F_s^N]\\
&=N_s+E[N_t-N_s]-\lambda t\\
&=N_s+\lambda(t-s)-\lambda t
=M_s.
\end{aligned}
$$

最後の等式には、未来の増分が過去の観測すべてと独立であることを使っています。任意の有限個の過去の時刻を

$$
0\le u_1<\cdots<u_m\le s
$$

とします。$u_0=0$ と置けば、過去の観測値は

$$
N_{u_i}=\sum_{j=1}^i(N_{u_j}-N_{u_{j-1}})
$$

と、区間 $(u_{j-1},u_j]$ の増分から復元できます。これらの区間と将来の区間 $(s,t]$ は互いに重なりません。

従って独立増分の条件により、$N_t-N_s$ は過去の観測ベクトルと独立です。この独立性を有限個の観測で判定できる事象から、それらが生成する $\mathcal F_s^N$ 全体へ拡張します。

$N_s$ 一変数との独立性だけでは、自然な情報全体についての条件付き等式を保証できません。後続の[STO13 の補償 Poisson マルチンゲール](../../STO/STO13/index.md#prop-sto13-compensated-poisson-martingale)でも同じ計算を扱いますが、ここでは本講の独立増分だけで証明が閉じています。

$N_t-\lambda t$ は「平均 $\lambda t$ を引いた公平な揺らぎ」です。後続の[STO13 の補償過程の定義](../../STO/STO13/index.md#def-sto13-compensator)では、この決定論的な平均蓄積項が補償過程の最も基本的な例になります。

## 7. 何が Poisson 過程でないか

待ち時間 $W_1$ だけを率 $\lambda$ の指数分布として、その後は到着が二度と起きない過程

$$
X_t=\boldsymbol{1}_{\{W_1\le t\}}
$$

を考えます。これは単純計数過程で、最初の待ち時間は無記憶です。しかし $X_t\le1$ なので $P(X_t=2)=0$、一方 Poisson 分布なら $t>0$ で $P(N_t=2)=e^{-\lambda t}(\lambda t)^2/2>0$ です。壊れたのは**二回目以降も同率の独立な待ち時間が続く**という構成条件です。

また、到着が必ず時刻 $1,2,3,\ldots$ に起きる $N_t=\lfloor t\rfloor$ は単純計数過程ですが、例えば $(0,1/2]$ と $(1/2,1]$ では長さが同じでも到着数がそれぞれ $0$ と $1$ です。定常増分を失っています。名前だけを見て「計数過程なら Poisson」としてはいけません。

## 8. 演習 Level A：標本路・分布・待ち時間

#### SP10-A01 右連続な到着回数
- Level: A

確定的な到着時刻が $1/2,3/2,2$ の三回だけである。$N_t$ を指示関数の和で書き、$N_1,N_{3/2},N_3$ および $T_4$ を求めよ。単純計数過程の三条件を検証せよ。

<!-- solution-start -->
### 詳細解答

$$
N_t=\boldsymbol{1}_{\{t\ge1/2\}}+
\boldsymbol{1}_{\{t\ge3/2\}}+
\boldsymbol{1}_{\{t\ge2\}}.
$$

よって $N_1=1$、到着の瞬間を含めるため $N_{3/2}=2$、$N_3=3$。四回目は存在しないので $T_4=\infty$ です。各指示関数は右連続・非減少で、和は整数値かつ $N_0=0$。時刻は相異なるので各跳躍は $1$。いずれも有限個で、[単純計数過程の定義](#def-sp10-simple-counting)を満たします。
<!-- solution-end -->

#### SP10-A02 短い区間で二件以上
- Level: A

率 $2$ の Poisson 過程について、長さ $h=0.1$ の区間に $0,1,2$ 件以上到着する確率を、それぞれ厳密な式で求めよ。さらに $h\downarrow0$ のとき、二件以上の確率を $h^2$ まで展開せよ。

<!-- solution-start -->
### 詳細解答

区間の件数 $K$ は平均 $\mu=2h=0.2$ の Poisson 分布なので

$$
P(K=0)=e^{-0.2},\qquad
P(K=1)=0.2e^{-0.2},\qquad
P(K\ge2)=1-1.2e^{-0.2}.
$$

一般の $h$ に戻し $e^{-2h}=1-2h+2h^2+O(h^3)$ を $(1+2h)$ に掛けると

$$
(1+2h)e^{-2h}=1-2h^2+O(h^3).
$$

従って $P(K\ge2)=2h^2+O(h^3)$ です。一次の係数は $0$ で、一回到着の $2h+O(h^2)$ より小さい次数です。
<!-- solution-end -->

#### SP10-A03 残りの指数待ち時間
- Level: A

$W\sim\operatorname{Exp}(3)$ とする。$P(W>5/3\mid W>2/3)$ を求め、$E[W]$ と比較して残り時間の解釈を述べよ。

<!-- solution-start -->
### 詳細解答

$\{W>5/3\}\subset\{W>2/3\}$ で、分母は $e^{-2}>0$ です。従って

$$
P(W>5/3\mid W>2/3)
=\frac{e^{-3(5/3)}}{e^{-3(2/3)}}
=e^{-5+2}=e^{-3}.
$$

追加で $1$ 単位待つ確率は $P(W>1)=e^{-3}$ に一致します。指数待ち時間の平均は $\int_0^\infty e^{-3t}\,dt=1/3$。すでに $2/3$ 待ったことは、残りの待ち時間の分布や平均 $1/3$ を変えません。
<!-- solution-end -->

#### SP10-A04 二時刻の相関
- Level: A

率 $2$ の Poisson 過程について、$E[N_1]$、$E[N_3]$、$\operatorname{Cov}(N_1,N_3)$、$E[N_1N_3]$ を求めよ。

<!-- solution-start -->
### 詳細解答

$E[N_1]=2$、$E[N_3]=6$ です。$N_3=N_1+(N_3-N_1)$ で増分は $N_1$ と独立なので

$$
\operatorname{Cov}(N_1,N_3)
=\operatorname{Var}(N_1)+\operatorname{Cov}(N_1,N_3-N_1)
=2+0=2.
$$

従って $E[N_1N_3]=\operatorname{Cov}(N_1,N_3)+E[N_1]E[N_3]=2+2\cdot6=14$。$N_1$ は $N_3$ の一部分なので独立ではありません。
<!-- solution-end -->

#### SP10-A05 二回目までに到着する確率
- Level: A

率 $\lambda$ の Poisson 過程に対して、$P(T_2\le t)$ を $N_t$ の分布から計算せよ。$t>0$ で微分し、第2到着時刻の密度を求めよ。

<!-- solution-start -->
### 詳細解答

$\{T_2\le t\}=\{N_t\ge2\}$ なので

$$
P(T_2\le t)=1-P(N_t=0)-P(N_t=1)
=1-e^{-\lambda t}(1+\lambda t).
$$

右辺を微分すると、積の微分より

$$
f_{T_2}(t)
=\lambda e^{-\lambda t}(1+\lambda t)-\lambda e^{-\lambda t}
=\lambda^2 t e^{-\lambda t}\quad(t>0).
$$

これは第3節で直接導いた到着時刻の密度で $n=2$ とした結果と一致します。後続の[STO13 の待ち時間定理](../../STO/STO13/index.md#thm-sto13-exponential-waiting)でもこの密度を扱います。
<!-- solution-end -->

## 9. 演習 Level B：構成の仮定と条件付き時刻

#### SP10-B01 件数を固定した時刻の分布
- Level: B

率 $\lambda$ の Poisson 過程について、$t>0$ と $0<a<t$ を固定する。$P(T_1\le a\mid N_t=1)$ を求め、$E[T_1\mid N_t=1]$ を導け。

<!-- solution-start -->
### 詳細解答

[到着回数を固定したときの到着時刻](#prop-sp10-conditional-arrival-times)で $n=1$ とすると、$T_1$ の条件付き密度は $1/t$（$0<u<t$）です。従って

$$
P(T_1\le a\mid N_t=1)=\int_0^a\frac{du}{t}=\frac at.
$$

また

$$
E[T_1\mid N_t=1]=\int_0^t u\frac{du}{t}
=\frac{t^2/2}{t}=\frac t2.
$$

「最初の到着までの指数分布」は無条件の分布であり、「時刻 $t$ までに一件だけと分かったとき」は一様分布です。条件付けを無視して $1/\lambda$ と答えてはいけません。
<!-- solution-end -->

#### SP10-B02 指数列から三つの計数確率を復元
- Level: B

独立な $W_i\sim\operatorname{Exp}(\lambda)$ から $T_n=\sum_{j=1}^nW_j$ と $N_t=\#\{n:T_n\le t\}$ を作る。$P(N_t=0)$、$P(N_t=1)$、$P(N_t=2)$ を、指数密度の積分によって直接示せ。また $T_n$ が有限時刻に蓄積しない理由を一つ示せ。

<!-- solution-start -->
### 詳細解答

零件は $W_1>t$ なので $P(N_t=0)=e^{-\lambda t}$ です。一件では最初の到着時刻を $u$ とし、次の待ち時間が $t-u$ より長い必要があります。

$$
P(N_t=1)=\int_0^t\lambda e^{-\lambda u}e^{-\lambda(t-u)}\,du
=\lambda te^{-\lambda t}.
$$

二件では $0<u<v<t$ に到着し、三件目は $t$ より後なので

$$
\begin{aligned}
P(N_t=2)
&=\int_0^t\int_u^t
\lambda^2 e^{-\lambda v}e^{-\lambda(t-v)}\,dv\,du\\
&=\lambda^2 e^{-\lambda t}\int_0^t(t-u)\,du\\
&=e^{-\lambda t}\frac{(\lambda t)^2}{2}.
\end{aligned}
$$

有限時間への蓄積を否定するには、[構成定理](#thm-sp10-exponential-construction)の証明で示した $P(T_n\le t)\le e^{at}(\lambda/(\lambda+a))^n\to0$（任意の $a>0$）を使えます。$T_n$ は単調増加なので、全有理 $t>0$ でのこの評価から $T_n\to\infty$ a.s. です。
<!-- solution-end -->

#### SP10-B03 最初だけ無記憶な反例
- Level: B

$W\sim\operatorname{Exp}(\lambda)$ とし、$X_t=\boldsymbol{1}_{\{W\le t\}}$ と置く。次を求め、この過程が Poisson 過程でない理由を二種類述べよ。

1. 単純計数過程の条件を満たすか。
2. $P(X_t=2)$ はいくらか。
3. $s,h>0$ に対し $P(X_{s+h}-X_s=1)$ はいくらか。

<!-- solution-start -->
### 詳細解答

$W>0$ a.s. なので $X_0=0$、$X_t$ は非減少・右連続の $\{0,1\}$ 値で、時刻 $W$ の一回だけ $1$ 跳びます。よって [単純計数過程の定義](#def-sp10-simple-counting)を満たします。$X_t\le1$ より $P(X_t=2)=0$ です。

$s,h>0$ の区間に到着する事象は $\{s<W\le s+h\}$ だから

$$
P(X_{s+h}-X_s=1)
=P(W>s)-P(W>s+h)
=e^{-\lambda s}(1-e^{-\lambda h}).
$$

これは $s$ に依存し、定常増分ではありません。また $t>0$ の Poisson 分布なら二件到着の確率 $e^{-\lambda t}(\lambda t)^2/2$ が正なので周辺分布も合いません。最初の待ち時間が無記憶であることだけから、二回目以降の到着や定常増分は導けません。
<!-- solution-end -->

#### SP10-B04 二回の到着の条件付き平均
- Level: B

$t>0$ について $N_t=2$ と条件付ける。このとき $E[T_1\mid N_t=2]$ と $E[T_2\mid N_t=2]$ を条件付き同時密度から求めよ。

<!-- solution-start -->
### 詳細解答

[到着回数を固定したときの到着時刻](#prop-sp10-conditional-arrival-times)より領域 $0<u<v<t$ で同時密度は $2/t^2$ です。従って

$$
\begin{aligned}
E[T_1\mid N_t=2]
&=\frac2{t^2}\int_0^t\int_0^v u\,du\,dv
=\frac2{t^2}\int_0^t\frac{v^2}{2}\,dv=\frac t3,\\
E[T_2\mid N_t=2]
&=\frac2{t^2}\int_0^t\int_0^v v\,du\,dv
=\frac2{t^2}\int_0^t v^2\,dv=\frac{2t}{3}.
\end{aligned}
$$

二個の一様な時刻を昇順に並べるため、早い方の平均は $t/3$、遅い方は $2t/3$ です。二つの時刻そのものは条件付きで独立ではありません（必ず $T_1<T_2$）。
<!-- solution-end -->

## 10. 演習 Level C：過去の計数と未来の到着

#### SP10-C01 到着を二件観測した後の一時間
- Level: C

率 $\lambda>0$ の Poisson 過程と、その自然なフィルトレーション $\mathcal F_t^N$ を考える。$t>0$ を固定し、$A=\{N_t=2\}$ とする。

1. $P(A)$、$P(N_{2t}=3\mid A)$ を求めよ。
2. $A$ の下で $(T_1,T_2)$ の条件付き同時密度を導き、$E[T_2-T_1\mid A]$ を計算せよ。
3. $A$ が分かっているときの $P(N_{t+h}-N_t=0\mid A)$ と、$\mathcal F_t^N$ 全体で条件付けた $E[N_{t+h}-N_t\mid\mathcal F_t^N]$ を求めよ。
4. $M_u=N_u-\lambda u$ が連続時間のマルチンゲールであることを、可積分性・適合性・条件付き等式を順に確認して示せ。2で求めた過去の待ち時間の条件付き分布と、3の未来の増分の独立性が矛盾しない理由も説明せよ。

<!-- solution-start -->
### 詳細解答

**1. 件数の条件付き確率。** $N_t$ は平均 $\lambda t$ の Poisson 分布なので

$$
P(A)=e^{-\lambda t}\frac{(\lambda t)^2}{2}.
$$

$(t,2t]$ の増分 $K=N_{2t}-N_t$ は、$A\in\mathcal F_t^N$ と独立で平均 $\lambda t$ の Poisson 分布です。$A$ 上で $N_{2t}=3$ と $K=1$ は同値なので

$$
P(N_{2t}=3\mid A)=P(K=1)=\lambda t e^{-\lambda t}.
$$

**2. 過去の到着時刻。** 到着時刻の密度と $T_3>t$ を掛けた同時密度は、$0<u<v<t$ で $\lambda^2e^{-\lambda t}$ です。これを $P(A)$ で割ると

$$
f_{T_1,T_2\mid A}(u,v)=\frac2{t^2}
\boldsymbol{1}_{\{0<u<v<t\}}.
$$

ゆえに

$$
\begin{aligned}
E[T_2-T_1\mid A]
&=\frac2{t^2}\int_0^t\int_0^v(v-u)\,du\,dv\\
&=\frac2{t^2}\int_0^t\frac{v^2}{2}\,dv\\
&=\frac t3.
\end{aligned}
$$

**3. 未来の待ち時間。** $N_{t+h}-N_t$ は長さ $h$ の区間の Poisson 件数で、$\mathcal F_t^N$ と独立です。従って

$$
P(N_{t+h}-N_t=0\mid A)=e^{-\lambda h},
$$

$$
E[N_{t+h}-N_t\mid\mathcal F_t^N]
=E[N_{t+h}-N_t]=\lambda h
\quad\text{a.s.}
$$

**4. マルチンゲール性と情報の違い。** [マルチンゲールの定義](../../STO/STO2/index.md#def-sto2-martingale)の三条件を連続時間に適用します。$N_u$ は $\mathcal F_u^N$ 可測で、$E|M_u|\le E[N_u]+\lambda u=2\lambda u<\infty$。従って $M_u$ は可積分かつ適合です。$0\le s\le u$ とすると独立定常増分から

$$
\begin{aligned}
E[M_u\mid\mathcal F_s^N]
&=E[N_s+(N_u-N_s)-\lambda u\mid\mathcal F_s^N]\\
&=N_s+\lambda(u-s)-\lambda u\\
&=M_s.
\end{aligned}
$$

よってマルチンゲールです。2の分布は**過去の二到着がいつ起きたか**を $A$ によって条件付けた結果です。3は**これからの増分**を扱い、Poisson 過程では自然な過去の情報全体と独立です。過去の配置が条件付けで変化しても、未来の増分が過去と独立であることと矛盾しません。
<!-- solution-end -->

## 11. この講義のまとめ

- [単純計数過程](#def-sp10-simple-counting)は、時間とともに一件ずつ増える階段状の標本路を記述します。それだけでは Poisson 性は決まりません。
- 本講で条件として用いた独立定常増分と Poisson 件数により、最初の待ち時間の指数分布、全待ち時間の独立性が得られます。後続の[STO13 の Poisson 過程の定義](../../STO/STO13/index.md#def-sto13-poisson-process)と[待ち時間定理](../../STO/STO13/index.md#thm-sto13-exponential-waiting)が対応する正本です。
- [指数待ち時間からの構成定理](#thm-sp10-exponential-construction)は逆方向を保証します。非爆発性、一時刻の Poisson 分布、過去から独立な将来増分を**別々に証明**する必要があります。
- [到着回数を固定したときの到着時刻](#prop-sp10-conditional-arrival-times)から、件数を固定した到着時刻は一様乱数の順序統計量になります。
- $M_t=N_t-\lambda t$ の公平性は、自然な過去の情報に関する独立増分から従います。[補償 Poisson マルチンゲール](../../STO/STO13/index.md#prop-sto13-compensated-poisson-martingale)へ接続し、次の SP11 では独立な到着流の重ね合わせ・間引きを考えます。
