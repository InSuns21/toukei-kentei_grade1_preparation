# SP21 Brown 運動の再始動と境界到達の計算

前講で構成したブラウン運動は、決まった時刻で見る限り独立なガウス増分を持ちます。しかし「初めて水準を越えた瞬間」は標本路自身が選ぶランダムな時刻です。その瞬間から先を、時刻0からの新しいブラウン運動のように扱えるでしょうか。

既習の[ブラウン運動の強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)は、到達時刻以後の増分を過去から切り離します。[反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)は最大値を正規分布へ変換します。この講では定理をもう一度別の正本として証明するのではなく、**どの条件を確認し、何に代入すると、どんな到達問題まで解けるか**を計算します。

**学ぶ道筋**：ランダムな時刻での再出発 → 停止時刻後の最大値 → 最大値と終点の同時情報 → 停止時刻での平均値保存 → 一側到達と両側退出の時間・確率。

## 1. ランダムな時刻から「もう一度」出発する

[Brown 運動の定義](../../STO/STO4/index.md#def-sto4-brownian-motion)に従う1次元標準ブラウン運動を $B=(B_t)_{t\ge0}$ とします。情報は、零集合を加えて完備化した自然なフィルトレーション $(\mathcal F_t)$ で表します。経路連続性により[水準到達時刻](../../STO/STO4/index.md#def-sto4-hitting-time)はこのフィルトレーションの停止時刻です。

水準 $c>0$ の初到達時刻を $\tau_c$ とします。到達事象が起きるかどうかを将来を見てから決める時刻ではなく、時刻 $t$ の情報だけで $\{\tau_c\le t\}$ を判定できる時刻です。さらに[到達時刻の分布定理](../../STO/STO4/index.md#thm-sto4-hitting-time-law)から $P(\tau_c<\infty)=1$ です。

ここで[強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)を $\tau=\tau_c$ に適用すると、

$$
W_u=B_{\tau_c+u}-B_{\tau_c}=B_{\tau_c+u}-c,\qquad u\ge0
$$

は $\mathcal F_{\tau_c}$ と独立な標準ブラウン運動です。単に「未来だから独立」とする推論ではありません。既習の証明では、停止時刻を上から二進格子に丸め、格子上では決定論的時刻の独立増分を使い、最後に連続性と有界収束で極限を通します。

**直接例**：$\tau_2$ の後の1時間相当の長さ $h=1$ について、$B_{\tau_2+1}-2$ は $N(0,1)$ に従い、$\mathcal F_{\tau_2}$ と独立です。したがって、到達前にどんな経路を通ったかを記録しても、到達後の増分が正になる条件付き確率は $1/2$ です。$\tau_2$ が無限にならないことを確認した上での結論であり、任意の未来依存のランダム時刻へは拡張できません。

### 1.1 停止した後の最大値

新しい過程 $W$ の時間 $h$ までの最大値を考えます。$c>0$ の初到達時刻を境に、さらに $d>0$ 上昇する確率は、再出発前にどれほど時間が経ったかに依存しません。

<a id="prop-sp21-post-stopping-maximum"></a>

<!-- formal-statement-start -->
> **命題（停止時刻後の最大上昇）**  
> $B$ を標準ブラウン運動、$(\mathcal F_t)$ を完備化した自然なフィルトレーションとする。$\tau$ が $P(\tau<\infty)=1$ を満たす停止時刻なら、任意の $h,d>0$ に対して

$$
P\!\left(
\sup_{0\le u\le h}(B_{\tau+u}-B_\tau)\ge d
\,\middle|\,\mathcal F_\tau
\right)
=
2\left(1-\Phi\!\left(\frac d{\sqrt h}\right)\right)
$$

> がほとんど確実に成り立つ。$\Phi$ は標準正規分布の累積分布関数である。
<!-- formal-statement-end -->

### 証明の見取り図

$\tau$ 後の差を $W_u$ と置くと強 Markov 性で $W$ は過去と独立な標準ブラウン運動です。最大値は $W$ の標本路だけで決まるため、条件付き確率を通常の確率へ戻し、反射原理を $W$ に適用します。

<!-- proof-start -->
### 証明

[強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)より、$W=(W_u)_{u\ge0}$ は $\mathcal F_\tau$ と独立で、標準ブラウン運動と同じ連続経路法則を持ちます。したがって

$$
\begin{aligned}
&P\!\left(\sup_{0\le u\le h}W_u\ge d\mid\mathcal F_\tau\right)\\
&\qquad=P\!\left(\sup_{0\le u\le h}W_u\ge d\right)\\
&\qquad=2P(W_h\ge d).
\end{aligned}
$$

二つ目の等号には、時間長を $T=h$、水準を $a=d$ とした[反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)を使いました。$W_h\sim N(0,h)$ なので $P(W_h\ge d)=1-\Phi(d/\sqrt h)$ です。
<!-- proof-end -->

例えば $\tau=\tau_2$、$d=1$、$h=4$ とすれば、到達後の4単位時間でさらに1上がる条件付き確率は $2(1-\Phi(1/2))$ です。この確率は $\tau_2$ の値で変化しません。一方「全期間 $[0,\tau_2+4]$ での最大値」は停止前も含むため、同じ式へ何も考えずに置き換えることはできません。

## 2. 最大値と終点を同時に知る

時間 $T>0$ を固定し、

$$
M_T=\sup_{0\le s\le T}B_s
$$

と置きます。[反射原理の同時事象の式](../../STO/STO4/index.md#thm-sto4-reflection-principle)は、水準 $a>0$ と $b<a$ について

$$
P(M_T\ge a,\ B_T\le b)=P(B_T\ge 2a-b)
$$

を与えます。右辺を $b$ で動かすと、終点が狭い区間にある場合の障壁到達確率まで分かります。終点が障壁より下にあったとしても、途中で障壁を越えて戻ってきた経路は除外できません。

正規分布 $N(0,T)$ の密度を

$$
\varphi_T(y)=\frac{1}{\sqrt{2\pi T}}\exp\left(-\frac{y^2}{2T}\right)
$$

と書きます。

<a id="thm-sp21-maximum-endpoint"></a>

<!-- formal-statement-start -->
> **定理（最大値と終点の同時分布）**  
> 標準ブラウン運動 $B$ と $T>0$ に対し $M_T=\sup_{0\le s\le T}B_s$ とする。$a>0$、$b<a$ のとき、終点が $b$ 付近にある同時確率の密度は

$$
P(M_T<a,\ B_T\in db)
=
\bigl(\varphi_T(b)-\varphi_T(2a-b)\bigr)\,db.
$$

> 特に $b<a$ において、$B_T$ の値を $b$ としたときの正則条件付き分布の一つの版として

$$
P(M_T<a\mid B_T=b)
=
1-\exp\left(-\frac{2a(a-b)}{T}\right)
$$

> が得られる。等式は条件付き分布の版としての表示であり、確率0の事象 $\{B_T=b\}$ で素朴に割り算する意味ではない。
<!-- formal-statement-end -->

### 証明の見取り図

終点 $b<a$ について、経路が水準 $a$ に到達しない場合の密度は「全ての終点の密度」から「到達した終点の密度」を引いたものです。反射原理の右辺を $b$ で微分すると、後者は $\varphi_T(2a-b)$ になります。最後に通常の終点密度 $\varphi_T(b)$ で割って条件付き分布を作ります。

<!-- proof-start -->
### 証明

[反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)を $b<a$ に適用します。

$$
P(M_T\ge a,\ B_T\le b)
=
\int_{2a-b}^{\infty}\varphi_T(y)\,dy.
$$

右辺は $b$ に関して微分可能で、積分の下端の微分が $-1$ であるため

$$
\frac{d}{db}\int_{2a-b}^{\infty}\varphi_T(y)\,dy
=
\varphi_T(2a-b).
$$

つまり $b<a$ の範囲では、$M_T\ge a$ と $B_T\in db$ の同時分布は密度 $\varphi_T(2a-b)$ を持ちます。$B_T$ 全体の密度 $\varphi_T(b)$ から差し引けば、主張の第一式です。境界 $M_T=a$ の確率は零であり、ここでは $<$ と $\le$ の違いを生みません。

$\varphi_T(b)>0$ なので、密度の比を取ると

$$
\begin{aligned}
P(M_T<a\mid B_T=b)
&=1-\frac{\varphi_T(2a-b)}{\varphi_T(b)}\\
&=1-\exp\left(
-\frac{(2a-b)^2-b^2}{2T}
\right)\\
&=1-\exp\left(-\frac{2a(a-b)}T\right).
\end{aligned}
$$

最後の指数整理では $(2a-b)^2-b^2=4a(a-b)$ を使いました。
<!-- proof-end -->

**直接例**：$T=1$、障壁 $a=1$、終点 $b=0$ なら、最初から最後まで水準1へ到達しない条件付き確率は $1-e^{-2}$ です。終点が0だと分かっても「ずっと0付近だった」とは限りません。

この条件付き計算は後続の経路空間理論で現れる Brownian bridge の典型的な式でもあります。ただしここでは橋過程の構成を既習とはせず、終点に関する通常の密度計算だけで導きました。

## 3. 停止時刻にマルチンゲールを代入する準備

一側の水準に到達する平均時刻は無限大なのに、上下二つの境界で止めると平均退出時刻は有限になります。その違いを数式で導くには、時間とともに平均値が保存される過程を停止時刻で評価します。

本節で使う**マルチンゲール**とは、各 $t$ で可積分かつその時刻までの情報で値が定まり、$s\le t$ に対して $E[X_t\mid\mathcal F_s]=X_s$ となる過程です。離散時間の定義は[既習のマルチンゲール](../../STO/STO2/index.md#def-sto2-martingale)と同じで、ここでは連続時間の対象に直接計算します。一般の連続時間任意抽出定理を仮定せず、必要な範囲を次の補題で証明します。

まず $Z\sim N(0,h)$ なら

$$
E[Z]=0,\qquad E[Z^2]=h,\qquad
E[e^{\theta Z}]=e^{\theta^2h/2}
$$

です。$B_t-B_s$ が $\mathcal F_s$ と独立な $N(0,t-s)$ に従うため、次の三過程はマルチンゲールです。

$$
B_t,\qquad B_t^2-t,\qquad
L_t^{(\theta)}=\exp\left(\theta B_t-\frac{\theta^2t}{2}\right)
\quad(\theta>0).
$$

例えば二番目は

$$
\begin{aligned}
E[B_t^2-t\mid\mathcal F_s]
&=E[(B_s+Z)^2-t\mid\mathcal F_s]\\
&=B_s^2+2B_sE[Z]+E[Z^2]-t\\
&=B_s^2-s
\end{aligned}
$$

で確かめられます。三番目も独立性を使って

$$
E[L_t^{(\theta)}\mid\mathcal F_s]
=
L_s^{(\theta)}
E[e^{\theta Z-\theta^2(t-s)/2}]
=
L_s^{(\theta)}
$$

です。

<a id="lem-sp21-bounded-stopping"></a>

<!-- formal-statement-start -->
> **補題（本講で使う有界停止時刻の平均値保存）**  
> $B$ を標準ブラウン運動、$(\mathcal F_t)$ を完備化した自然なフィルトレーションとする。$S$ が $0\le S\le T$ を満たす停止時刻で $T<\infty$ なら、任意の $\theta>0$ に対して

$$
E[B_S]=0,\qquad E[B_S^2-S]=0,\qquad
E\!\left[\exp\left(\theta B_S-\frac{\theta^2S}{2}\right)\right]=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$S$ を少し後の二進格子へ丸めます。丸めた時刻は有限個の決定論的時刻しか取りません。停止前の指示関数と「次の一歩」の平均0を掛ければ平均値は保存されます。最後の極限で重要なのは単なる経路連続性だけでなく、**期待値へ極限を通すための可積分な支配**があることです。

<!-- proof-start -->
### 証明

上に挙げた三つのマルチンゲールの任意の一つを $X$ とします。$\delta_n=2^{-n}$、$S_n=\delta_n\lceil S/\delta_n\rceil$ と置くと、$S_n$ は有限個の格子点に値を取る停止時刻で、$S_n\downarrow S$、$S_n\le T+1$ です。

$N$ を $N\delta_n\ge T+1$ となる整数とし、$t_k=k\delta_n$ とします。格子上では

$$
X_{S_n}-X_0
=
\sum_{k=0}^{N-1}
1_{\{S_n>t_k\}}(X_{t_{k+1}}-X_{t_k}).
$$

しかも $\{S_n>t_k\}=\{S>t_k\}\in\mathcal F_{t_k}$ です。マルチンゲール性から

$$
E[1_{\{S_n>t_k\}}(X_{t_{k+1}}-X_{t_k})]
=
E\!\left[
1_{\{S_n>t_k\}}
E[X_{t_{k+1}}-X_{t_k}\mid\mathcal F_{t_k}]
\right]
=0.
$$

有限和を取って $E[X_{S_n}]=E[X_0]$ を得ます。

極限交換を確かめます。[反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)を $B$ と $-B$ に使うと、任意の $R>0$ について $\sup_{0\le t\le R}|B_t|$ は全ての正の整数次モーメントと正の指数モーメントを持ちます。実際、正側最大値の分布は $|N(0,R)|$ の分布と同じであり、負側最大値も同じ分布だからです。

$R=T+1$ とすれば、三つの $X$ に対してそれぞれ

$$
|B_{S_n}|\le \sup_{t\le R}|B_t|,
$$

$$
|B_{S_n}^2-S_n|\le \left(\sup_{t\le R}|B_t|\right)^2+R,
$$

$$
0<L_{S_n}^{(\theta)}\le
\exp\left(\theta\sup_{t\le R}|B_t|\right)
$$

という可積分な支配を得ます。標本路連続性から $X_{S_n}\to X_S$ がほとんど確実に成り立つので、有界区間上のこの支配による収束定理を使い $E[X_S]=E[X_0]$ です。三つの初期値は順に $0,0,1$ であり、補題が従います。
<!-- proof-end -->

**何が保存されないか**：上の補題は $S$ が有界であることと、極限交換を保証する具体的な支配を使いました。$\tau_c$ は上から決まった有限数で抑えられないので、$E[B_{\tau_c}]=E[B_0]$ と書くことはできません。実際 $B_{\tau_c}=c>0$ であり、そのような式は偽です。次節では必ず $\tau_c\wedge n$ に補題を適用し、極限の段階を別に吟味します。

## 4. 一側の到達時刻を Laplace 変換で測る

[到達時刻の分布](../../STO/STO4/index.md#thm-sto4-hitting-time-law)から $E[\tau_c]=\infty$ が分かっています。平均を直接計算する代わりに、長い待ち時間ほど小さい重みを付ける $E[e^{-\lambda\tau_c}]$ を考えます。$\lambda>0$ を固定するとこの期待値は必ず $0$ と $1$ の間にあります。

<a id="thm-sp21-hitting-laplace"></a>

<!-- formal-statement-start -->
> **定理（正の水準到達時刻の Laplace 変換）**  
> 標準ブラウン運動 $B$ の水準 $c>0$ への初到達時刻 $\tau_c$ について、任意の $\lambda>0$ で

$$
E[e^{-\lambda\tau_c}]
=
\exp(-c\sqrt{2\lambda}).
$$

> とくに $\tau_c<\infty$ はほとんど確実だが、$E[\tau_c]=\infty$ である。
<!-- formal-statement-end -->

### 証明の見取り図

指数マルチンゲールを、まず有界な $\tau_c\wedge n$ で止めます。初到達時刻より前は $B_t<c$ なので、$\theta>0$ なら停止させた指数全体が $e^{\theta c}$ で抑えられます。この上界が、非有界な $\tau_c$ へ極限を通す鍵です。

<!-- proof-start -->
### 証明

$\theta>0$ を取り、補題の $L_t^{(\theta)}$ と $S_n=\tau_c\wedge n$ を考えます。[水準到達時刻の停止時刻性](../../STO/STO4/index.md#def-sto4-hitting-time)から $S_n$ は停止時刻で、$S_n\le n$ です。[有界停止補題](#lem-sp21-bounded-stopping)より

$$
1=E[L_{S_n}^{(\theta)}]
=
E\!\left[
\exp\left(\theta B_{S_n}-\frac{\theta^2 S_n}{2}\right)
\right].
$$

経路連続性と初到達の定義から $B_{S_n}\le c$ です。$S_n\ge0$ なので

$$
0<L_{S_n}^{(\theta)}\le e^{\theta c}.
$$

さらに $\tau_c<\infty$ がほとんど確実であるため、$n\to\infty$ で $S_n\to\tau_c$、$B_{S_n}\to B_{\tau_c}=c$ となります。したがって支配収束から

$$
1=e^{\theta c}E[e^{-\theta^2\tau_c/2}].
$$

$\lambda=\theta^2/2$、すなわち $\theta=\sqrt{2\lambda}$ と置けば

$$
E[e^{-\lambda\tau_c}]
=
e^{-c\sqrt{2\lambda}}.
$$

平均が無限大となる結論は[一側到達時刻の分布定理](../../STO/STO4/index.md#thm-sto4-hitting-time-law)によります。Laplace 変換が有限でも平均が有限とは限らない点に注意します。
<!-- proof-end -->

**例**：$c=2$、$\lambda=1/2$ なら $E[e^{-\tau_2/2}]=e^{-2}$ です。これは $E[\tau_2]$ が有限だと主張する式ではありません。

### 4.1 水準を二段階で通過する

強 Markov 性は、最初の水準に到達してから次の水準へ向かう時間を独立な待ち時間として分離します。この事実は Laplace 変換の指数形とも整合します。

<a id="prop-sp21-successive-hitting"></a>

<!-- formal-statement-start -->
> **命題（連続する二水準の到達待ち時間）**  
> $B$ を標準ブラウン運動、$c,d>0$ とする。このとき

$$
\tau_{c+d}-\tau_c
$$

> は $\mathcal F_{\tau_c}$ と独立で、その分布は水準 $d$ の到達時刻 $\tau_d$ の分布に等しい。また

$$
E[e^{-\lambda\tau_{c+d}}]
=
E[e^{-\lambda\tau_c}]E[e^{-\lambda\tau_d}]
\qquad(\lambda>0)
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

連続経路は水準 $c+d$ へ行く前に必ず $c$ を通ります。$\tau_c$ 後の過程を $W$ と置けば、残りの距離は $d$ で、強 Markov 性により新しい経路 $W$ は過去から独立です。

<!-- proof-start -->
### 証明

$c,d>0$ とします。$\tau_c<\infty$、$\tau_{c+d}<\infty$ は既習の到達確率1から従います。水準を飛び越えない連続性により $\tau_c\le\tau_{c+d}$ です。

$W_u=B_{\tau_c+u}-c$ と置くと、[強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)から $W$ は $\mathcal F_{\tau_c}$ と独立な標準ブラウン運動です。$u$ において $W_u=d$ となることは $B_{\tau_c+u}=c+d$ と同じなので

$$
\tau_{c+d}-\tau_c
=
\inf\{u\ge0:W_u=d\}.
$$

右辺は $W$ のみから決まる可測確率変数であり、過去 $\mathcal F_{\tau_c}$ と独立、かつ $\tau_d$ と同じ法則を持ちます。したがって $\tau_{c+d}=\tau_c+(\tau_{c+d}-\tau_c)$ の両項は独立で、期待値が積へ分かれます。
<!-- proof-end -->

## 5. 両側に壁があると退出時間はどう変わるか

一側の水準 $c$ はいつか到達しますが、その平均時間は無限大でした。ここで下の壁 $-u$ と上の壁 $v$ を設け、どちらか先に当たった時刻で止めます。**片側に逃げ続ける標本路もそこで打ち切る**ので、平均時間が有限になる余地が生まれます。

<a id="def-sp21-two-sided-exit"></a>

<!-- formal-statement-start -->
> **定義（区間からの初退出時刻）**  
> $u,v>0$、$x\in(-u,v)$ とする。$B_0=0$ の標準ブラウン運動から $X_t=x+B_t$ を作り、

$$
\sigma=\inf\{t\ge0:X_t\notin(-u,v)\}
$$

> を開区間 $(-u,v)$ からの初退出時刻という。$\sigma<\infty$ のとき、連続性により $X_\sigma=-u$ または $X_\sigma=v$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sp21-two-sided-exit -->
### 直接例：下に1、上に2の壁がある

$x=0,u=1,v=2$ とし、$\sigma=\inf\{t\ge0:B_t\notin(-1,2)\}$ とします。初期値 $X_0=0$ は区間内です。連続標本路では、区間から外へ出るためには必ず最初に端点 $-1$ または $2$ に到達します。また

$$
\{\sigma\le t\}
=
\left\{\inf_{0\le s\le t}B_s\le-1\right\}
\cup
\left\{\sup_{0\le s\le t}B_s\ge2\right\}.
$$

連続標本路上では両極値は有理時刻の値で近似できるので、この事象は完備化した $\mathcal F_t$ に属します。よって停止時刻の条件も実際に確認できます。さらに $\sigma\le\tau_2<\infty$ がほとんど確実なので、退出後の値 $B_\sigma$ も定義できます。
<!-- definition-example-end -->

<a id="thm-sp21-two-sided-exit"></a>

<!-- formal-statement-start -->
> **定理（Brown 運動の両側退出確率と平均退出時刻）**  
> $B$ を標準ブラウン運動、$X_t=x+B_t$、$u,v>0$、$-u<x<v$ とする。[初退出時刻](#def-sp21-two-sided-exit) $\sigma$ はほとんど確実に有限で、

$$
P_x(X_\sigma=v)
=
\frac{x+u}{u+v},
\qquad
P_x(X_\sigma=-u)
=
\frac{v-x}{u+v},
$$

$$
E_x[\sigma]=(x+u)(v-x)
$$

> が成立する。添字 $x$ は初期値 $X_0=x$ で計算することを表す。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\sigma\le\tau_{v-x}$ なので $\sigma<\infty$ です。停止時刻 $S_n=\sigma\wedge n$ は有界だから、上で証明した $B_t$ と $B_t^2-t$ の停止補題を適用できます。$X_{S_n}\in[-u,v]$ という**一様な有界性**が極限交換を保証します。

<!-- proof-start -->
### 証明

$x\in(-u,v)$ なので $v-x>0$ です。$B$ が水準 $v-x$ に到達すれば $X$ は上の壁 $v$ に達します。ゆえに $\sigma\le\tau_{v-x}$ で、[到達確率1](../../STO/STO4/index.md#thm-sto4-hitting-time-law)から $P(\sigma<\infty)=1$ です。

$S_n=\sigma\wedge n$ と置きます。$S_n$ は有界停止時刻なので、[停止補題](#lem-sp21-bounded-stopping)より

$$
E[B_{S_n}]=0,\qquad E[B_{S_n}^2-S_n]=0.
$$

$X_{S_n}=x+B_{S_n}$ だから、第一式から $E[X_{S_n}]=x$ です。第二式は

$$
\begin{aligned}
E[X_{S_n}^2-S_n]
&=E[(x+B_{S_n})^2-S_n]\\
&=x^2+2xE[B_{S_n}]
 +E[B_{S_n}^2-S_n]\\
&=x^2
\end{aligned}
$$

を与えます。

退出前は $X_t\in(-u,v)$ であり、退出時も連続性から $X_\sigma\in\{-u,v\}$ なので、全ての $n$ について $|X_{S_n}|\le\max(u,v)$ です。$S_n\uparrow\sigma$、$X_{S_n}\to X_\sigma$ であるため、有界収束と非負確率変数の単調収束から

$$
E[X_\sigma]=x,\qquad
E[X_\sigma^2]-E[\sigma]=x^2.
$$

$p=P_x(X_\sigma=v)$ と置きます。$X_\sigma$ は二つの端点にしか値を取らないので

$$
x=E[X_\sigma]=vp-u(1-p)
=(u+v)p-u.
$$

これを解いて

$$
p=\frac{x+u}{u+v},\qquad
1-p=\frac{v-x}{u+v}.
$$

さらに

$$
\begin{aligned}
E[X_\sigma^2]
&=v^2p+u^2(1-p)\\
&=\frac{v^2(x+u)+u^2(v-x)}{u+v}\\
&=uv+x(v-u).
\end{aligned}
$$

したがって

$$
\begin{aligned}
E_x[\sigma]
&=E[X_\sigma^2]-x^2\\
&=uv+x(v-u)-x^2\\
&=(x+u)(v-x).
\end{aligned}
$$
<!-- proof-end -->

**直接計算**：$x=0,u=1,v=2$ では上側へ先に出る確率が $1/3$、下側へ先に出る確率が $2/3$、平均退出時間が $2$ です。一側到達時刻 $\tau_2$ の平均は無限大なので、二つを同じ「到達時刻」として混同しないようにします。

### 5.1 一側到達時刻は何次モーメントまで有限か

無限平均という事実をもう一段細かく見るには、$E[\tau_c^q]$ を調べます。[反射原理から得られた分布](../../STO/STO4/index.md#thm-sto4-hitting-time-law)で、$c>0$、$t>0$ なら

$$
P(\tau_c>t)
=
2\Phi(c/\sqrt t)-1
=
2\int_0^{c/\sqrt t}\varphi_1(z)\,dz.
$$

大きい $t$ では積分区間が短くなり、$\varphi_1(0)=1/\sqrt{2\pi}$ に近い値だけを積分するため、尾確率はおおよそ $t^{-1/2}$ の速さで減衰します。

<a id="prop-sp21-hitting-moments"></a>

<!-- formal-statement-start -->
> **命題（一側到達時刻の正のモーメント）**  
> 標準ブラウン運動の水準 $c>0$ への到達時刻 $\tau_c$ に対し、任意の $q>0$ について

$$
E[\tau_c^q]<\infty
\quad\Longleftrightarrow\quad
q<\frac12.
$$
<!-- formal-statement-end -->

### 証明の見取り図

尾確率の漸近係数を求め、非負確率変数のモーメントを尾確率の積分で表します。$t$ の大きい部分では $t^{q-3/2}$ を積分することになり、指数が $-1$ より小さいかで判定できます。

<!-- proof-start -->
### 証明

$\varphi_1$ は0で連続なので $z=c/\sqrt t\downarrow0$ として

$$
\frac{1}{z}\int_0^z\varphi_1(y)\,dy
\longrightarrow\varphi_1(0)=\frac1{\sqrt{2\pi}}.
$$

よって

$$
\lim_{t\to\infty}\sqrt t\,P(\tau_c>t)
=
2c\varphi_1(0)
=
c\sqrt{\frac2\pi}>0.
$$

任意の非負確率変数 $Y$ と $q>0$ について、各標本点で $Y^q=\int_0^Y qt^{q-1}\,dt$ と表し、非負関数の積分順序を交換すると

$$
E[Y^q]
=
q\int_0^\infty t^{q-1}P(Y>t)\,dt
$$

です。ここで $Y=\tau_c$ とします。$t\in(0,1]$ では $P(\tau_c>t)\le1$ より積分は高々 $q\int_0^1t^{q-1}dt=1$ です。

一方十分大きい $t$ では、上の極限から定数 $0<C_1<C_2$ が存在して

$$
C_1t^{-1/2}
\le P(\tau_c>t)
\le C_2t^{-1/2}
$$

となります。したがって大きい $t$ の積分収束は

$$
\int_1^\infty t^{q-3/2}\,dt
$$

の収束と同値で、$q-3/2<-1$、すなわち $q<1/2$ の場合に限り有限です。
<!-- proof-end -->

この結果は $q=1/2$ **ちょうどで発散**することも示します。Laplace 変換が任意の $\lambda>0$ で存在しても、平均や高次モーメントは別に検討しなければなりません。

## 6. 演習：再始動から境界問題まで

問題で使う $B$ は断りがない限り標準ブラウン運動、$\Phi$ は標準正規分布の累積分布関数、$\tau_c$ は正の水準 $c$ への初到達時刻です。各問では対象の停止時刻が有限であるか、有界停止補題をどこに適用できるかを確かめます。

### Level A：適用する定理と条件を明示する

<a id="ex-sp21-a01"></a>

#### SP21-A01 到達後の増分と独立性
$B$ が水準 $3$ に初到達した後の増分 $B_{\tau_3+2}-B_{\tau_3}$ の分布を求め、$\mathcal F_{\tau_3}$ に属する任意の事象 $A$ との独立性を式で表せ。

- Level: A

<!-- solution-start -->
### 詳細解答

[到達時刻の分布定理](../../STO/STO4/index.md#thm-sto4-hitting-time-law)により $\tau_3<\infty$ はほとんど確実であり、[到達時刻の停止時刻性](../../STO/STO4/index.md#def-sto4-hitting-time)も成立します。したがって[強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)を $\tau=\tau_3$、$u=2$ に適用でき、

$$
B_{\tau_3+2}-B_{\tau_3}\sim N(0,2).
$$

任意の Borel 集合 $C\subset\mathbb R$ と $A\in\mathcal F_{\tau_3}$ に対して、強 Markov 性による独立性は

$$
P(A\cap\{B_{\tau_3+2}-B_{\tau_3}\in C\})
=
P(A)\,P(N(0,2)\in C)
$$

です。$\tau_3$ が確率的に決まることは、この定理を省く理由にはなりません。
<!-- solution-end -->

<a id="ex-sp21-a02"></a>

#### SP21-A02 停止後にもう一段上がる
$\tau_1$ 後の時間 $h=9$ の間に、初到達水準1からさらに水準4まで上がる条件付き確率を $\Phi$ で表せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\tau_1<\infty$ はほとんど確実で、$B_{\tau_1}=1$ です。「水準4へ上がる」は、$W_u=B_{\tau_1+u}-1$ の最大値が $d=4-1=3$ 以上となる事象です。[停止後の最大上昇](#prop-sp21-post-stopping-maximum)を $h=9,d=3$ に適用し、

$$
\begin{aligned}
&P\!\left(\sup_{0\le u\le9}B_{\tau_1+u}\ge4\mid\mathcal F_{\tau_1}\right)\\
&=2\left(1-\Phi(3/\sqrt9)\right)
=2(1-\Phi(1)).
\end{aligned}
$$

条件付き確率が停止前の標本路に依存しないのは、強 Markov 性によるものです。
<!-- solution-end -->

<a id="ex-sp21-a03"></a>

#### SP21-A03 一側到達時刻の Laplace 変換
水準 $c=2$ の到達時刻について $E[e^{-2\tau_2}]$ と $E[e^{-\tau_2/8}]$ を求めよ。平均到達時間についても答えよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[一側到達時刻の Laplace 変換](#thm-sp21-hitting-laplace)は $E[e^{-\lambda\tau_c}]=e^{-c\sqrt{2\lambda}}$ です。まず $\lambda=2$ を代入すると

$$
E[e^{-2\tau_2}]
=
e^{-2\sqrt4}=e^{-4}.
$$

次に $\lambda=1/8$ なら $\sqrt{2\lambda}=\sqrt{1/4}=1/2$ なので

$$
E[e^{-\tau_2/8}]
=
e^{-2(1/2)}=e^{-1}.
$$

一方、[到達時刻の分布](../../STO/STO4/index.md#thm-sto4-hitting-time-law)は $E[\tau_2]=\infty$ を与えます。指数重み付き期待値の有限性から平均の有限性は導けません。
<!-- solution-end -->

<a id="ex-sp21-a04"></a>

#### SP21-A04 左右非対称な壁
$B_0=0$ とし、区間 $(-2,3)$ から初めて退出する時刻を $\sigma$ とする。どちらの壁に先に当たる確率が高いか、また $E[\sigma]$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$u=2,v=3,x=0$ を[両側退出定理](#thm-sp21-two-sided-exit)へ代入します。

$$
P(B_\sigma=3)=\frac{0+2}{2+3}=\frac25,
\qquad
P(B_\sigma=-2)=\frac{3-0}{2+3}=\frac35.
$$

したがって近い下側の壁 $-2$ に先に当たりやすく、平均時間は

$$
E[\sigma]=(0+2)(3-0)=6
$$

です。区間が有界で連続経路により端点で止まることが、退出時の二値分布を使う条件です。
<!-- solution-end -->

<a id="ex-sp21-a05"></a>

#### SP21-A05 終点が0でも途中で越えたか
$T=2$ で $B_T=0$ と条件付けた場合に、時間 $T$ までずっと水準 $a=1$ 未満だった条件付き確率を求めよ。条件付けの意味も述べよ。

- Level: A

<!-- solution-start -->
### 詳細解答

[最大値と終点の同時分布](#thm-sp21-maximum-endpoint)に $a=1,b=0,T=2$ を代入すると

$$
P(M_2<1\mid B_2=0)
=
1-\exp\left(-\frac{2\cdot1\cdot(1-0)}2\right)
=
1-e^{-1}.
$$

$\{B_2=0\}$ の確率は0なので、この式は確率0の事象で割り算したものではありません。$B_2$ の正規密度による正則条件付き分布の版として定義された値です。
<!-- solution-end -->

### Level B：証明を自分で組み立てる

<a id="ex-sp21-b01"></a>

#### SP21-B01 二進近似の停止時刻性と平均値保存
有界停止時刻 $0\le S\le T$ に対して $S_n=2^{-n}\lceil2^nS\rceil$ とする。$S_n$ が停止時刻であること、$S_n\downarrow S$、および $E[B_{S_n}]=0$ を示せ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\delta=2^{-n}$ とすると、$\{S_n\le k\delta\}=\{S\le k\delta\}$ が成り立ち、右辺は $\mathcal F_{k\delta}$ に属します。一般の $t$ についても $\{S_n\le t\}$ は $t$ 以下の最大格子点で同じ形の事象になるので $S_n$ は停止時刻です。

丸め上げの定義から $S\le S_n<S+\delta$ であり、細かい二進格子は粗い格子を含むので $S_n\downarrow S$ です。

$t_k=k\delta$、$N\delta\ge T+1$ とします。有限の格子点の間で

$$
B_{S_n}
=
\sum_{k=0}^{N-1}
1_{\{S_n>t_k\}}(B_{t_{k+1}}-B_{t_k}).
$$

$\{S_n>t_k\}=\{S>t_k\}\in\mathcal F_{t_k}$ です。[決定論的時刻での独立増分](../../STO/STO4/index.md#thm-sto4-brownian-markov)から

$$
E[B_{t_{k+1}}-B_{t_k}\mid\mathcal F_{t_k}]=0.
$$

各項の期待値は0なので有限和の期待値も0です。$n\to\infty$ で $E[B_S]=0$ まで結論したい場合は、[停止補題](#lem-sp21-bounded-stopping)で確認した最大値の可積分な支配を追加してから極限を取ります。
<!-- solution-end -->

<a id="ex-sp21-b02"></a>

#### SP21-B02 二水準の到達時刻と積の形
$c,d,\lambda>0$ とする。$\tau_{c+d}-\tau_c$ が $\tau_c$ と独立で $\tau_d$ と同分布であることから、到達時刻の Laplace 変換 $F_\lambda(r)=E[e^{-\lambda\tau_r}]$ が $F_\lambda(c+d)=F_\lambda(c)F_\lambda(d)$ を満たすことを証明し、既知の明示式と照合せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\tau_c$ は有限な停止時刻で、連続標本路は $c+d$ に達する前に必ず $c$ に達します。[強 Markov 性](../../STO/STO4/index.md#thm-sto4-brownian-strong-markov)から $W_t=B_{\tau_c+t}-c$ は $\mathcal F_{\tau_c}$ と独立な標準ブラウン運動です。よって $\tau_{c+d}-\tau_c=\inf\{t:W_t=d\}$ は $\tau_d$ と同分布で $\tau_c$ と独立です。

この二つの独立な非負確率変数の和を指数の中に入れると

$$
\begin{aligned}
F_\lambda(c+d)
&=E[e^{-\lambda\tau_{c+d}}]\\
&=E[e^{-\lambda\tau_c}
e^{-\lambda(\tau_{c+d}-\tau_c)}]\\
&=E[e^{-\lambda\tau_c}]
E[e^{-\lambda\tau_d}]\\
&=F_\lambda(c)F_\lambda(d).
\end{aligned}
$$

[明示式](#thm-sp21-hitting-laplace)によれば左辺は $e^{-(c+d)\sqrt{2\lambda}}$、右辺は $e^{-c\sqrt{2\lambda}}e^{-d\sqrt{2\lambda}}$ で一致します。
<!-- solution-end -->

<a id="ex-sp21-b03"></a>

#### SP21-B03 最大値と終点の密度
$T>0$ において $a>0,b<a$ とする。反射原理の同時事象を $b$ で微分して $P(M_T<a,B_T\in db)$ を求め、さらに $P(M_T\ge a\mid B_T=b)$ を表せ。

- Level: B

<!-- solution-start -->
### 詳細解答

[反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)で

$$
P(M_T\ge a,B_T\le b)
=
\int_{2a-b}^\infty\varphi_T(y)\,dy.
$$

下端 $2a-b$ の $b$ 微分は $-1$ なので、微分で現れる密度は $\varphi_T(2a-b)$ です。一方 $B_T$ の密度は $\varphi_T(b)$ ですから

$$
P(M_T<a,B_T\in db)
=
\bigl(\varphi_T(b)-\varphi_T(2a-b)\bigr)\,db.
$$

したがって正則条件付き分布の版として

$$
\begin{aligned}
P(M_T\ge a\mid B_T=b)
&=\frac{\varphi_T(2a-b)}{\varphi_T(b)}\\
&=\exp\left(-\frac{(2a-b)^2-b^2}{2T}\right)\\
&=\exp\left(-\frac{2a(a-b)}{T}\right).
\end{aligned}
$$

$b<a$ の仮定を落とすとこの式はそのまま適用できません。$b\ge a$ なら終点自身が障壁以上なので到達確率は1です。
<!-- solution-end -->

<a id="ex-sp21-b04"></a>

#### SP21-B04 一側と両側で平均が違う理由
$u,v>0$、$x=0$ の両側退出時刻 $\sigma$ について、$E[B_{\sigma\wedge n}^2]=E[\sigma\wedge n]$ を出発点として $E[\sigma]=uv$ を導け。一側到達時刻 $\tau_v$ に同じ極限操作を無条件に適用できない理由を説明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$S_n=\sigma\wedge n$ は有界停止時刻なので、[停止補題](#lem-sp21-bounded-stopping)から

$$
E[B_{S_n}^2-S_n]=0.
$$

したがって $E[B_{S_n}^2]=E[S_n]$ です。$|B_{S_n}|\le\max(u,v)$ は区間からの初退出という定義と連続性によります。よって有界収束で $E[B_{S_n}^2]\to E[B_\sigma^2]$、単調収束で $E[S_n]\to E[\sigma]$ となります。

また $E[B_\sigma]=0$ から、$p=P(B_\sigma=v)$ は $vp-u(1-p)=0$ を満たすので $p=u/(u+v)$ です。したがって

$$
\begin{aligned}
E[\sigma]
&=E[B_\sigma^2]\\
&=v^2\frac{u}{u+v}
+u^2\frac{v}{u+v}\\
&=uv.
\end{aligned}
$$

一側 $\tau_v$ では $B_{\tau_v\wedge n}\le v$ という片側の上界しかなく、下側への逸脱を一様に抑えられません。従って $B_{\tau_v\wedge n}^2$ の期待値をそのまま $B_{\tau_v}^2=v^2$ の期待値へ移せるとは言えず、実際 $E[\tau_v]=\infty$ です。[到達時刻分布](../../STO/STO4/index.md#thm-sto4-hitting-time-law)と矛盾しないのは、必要な極限交換の条件が失われているからです。
<!-- solution-end -->

### Level C：複数の結果を組み合わせる

<a id="ex-sp21-c01"></a>

#### SP21-C01 到達・退出・条件付き障壁確率の統合
標準ブラウン運動 $B$ と $u=1,v=3$ を考える。

1. $\sigma=\inf\{t\ge0:B_t\notin(-1,3)\}$ として $P(B_\sigma=3)$、$E[\sigma]$ を求めよ。
2. $B$ が最初に水準1を通った時刻 $\tau_1$ の後、さらに水準3に到達するまでの時間の分布を特定し、その Laplace 変換を求めよ。
3. 固定時間 $T=2$ で終点 $B_2=0$ と条件付けたとき、時間2まで水準3へ達しなかった条件付き確率を求めよ。
4. 第1問と第2問から、両側退出時間と一側到達時間の平均を比較して説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

**1. 両側退出。** 初期値 $x=0$、下壁まで $u=1$、上壁まで $v=3$ なので、[両側退出定理](#thm-sp21-two-sided-exit)に代入して

$$
P(B_\sigma=3)=\frac{0+1}{1+3}=\frac14,
\qquad
E[\sigma]=(0+1)(3-0)=3.
$$

**2. 途中水準で再始動する。** $\tau_1<\infty$ はほとんど確実で、$B_{\tau_1}=1$ です。[連続する二水準の到達命題](#prop-sp21-successive-hitting)を $c=1,d=2$ に適用すると、$\tau_3-\tau_1$ は $\mathcal F_{\tau_1}$ と独立で $\tau_2$ と同分布です。したがって分布関数と密度は[到達時刻の分布](../../STO/STO4/index.md#thm-sto4-hitting-time-law)に $c=2$ を代入して

$$
P(\tau_3-\tau_1\le t)
=
2\left(1-\Phi\left(\frac2{\sqrt t}\right)\right),
\qquad t>0,
$$

$$
f(t)=\frac{2}{\sqrt{2\pi t^3}}\exp\left(-\frac{4}{2t}\right).
$$

Laplace 変換は[明示式](#thm-sp21-hitting-laplace)から

$$
E[e^{-\lambda(\tau_3-\tau_1)}]
=
e^{-2\sqrt{2\lambda}},\qquad\lambda>0.
$$

**3. 終点情報を使う。** [最大値と終点の定理](#thm-sp21-maximum-endpoint)へ $a=3,b=0,T=2$ を入れると

$$
P(M_2<3\mid B_2=0)
=
1-\exp\left(-\frac{2\cdot3\cdot(3-0)}2\right)
=
1-e^{-9}.
$$

ここで「到達しなかった」は $M_2<3$ と同じです。等式は正則条件付き分布の版として理解します。

**4. 平均の比較。** 第1問では二つの壁のどちらに当たっても止まるため $E[\sigma]=3$ は有限です。一方、水準3への一側初到達時刻について、[一側到達時刻のモーメント判定](#prop-sp21-hitting-moments)に $q=1$ を適用すると $E[\tau_3]=\infty$ です。$\sigma\le\tau_3$ が成り立ち、下側へ逃げる軌道を先に止めることが、この差を生んでいます。
<!-- solution-end -->

## 7. まとめと次の講義

- ランダムな時刻を再出発点にできるのは、その時刻の**停止時刻性と有限性**を確認し、強 Markov 性を使えるときです。
- [反射原理](../../STO/STO4/index.md#thm-sto4-reflection-principle)は最大値の確率だけでなく、最大値と終点の同時密度を与えます。
- 有界停止時刻の平均値保存は、格子化・条件付き平均0・可積分な支配の三段階で再構成できます。非有界停止時刻で極限を通すには別の根拠が要ります。
- 一側到達では平均が無限大でも Laplace 変換が計算でき、二側退出では確率と平均時間の両方が有限の式で表せます。

次講では、ランダムウォークの経路を細かくして得られる極限を扱います。終点の正規近似だけでは不十分で、**経路全体の弱収束**と tightness が必要になります。
