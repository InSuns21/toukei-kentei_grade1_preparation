# U3-14 幾何 Brown 運動と対数正規価格分布

U3-13 では、株価が正の連続 Itô 過程であると**仮定**した上で、[対数株価の Itô 変換](../U3-13/index.md#prop-u3-13-log-price) を計算しました。しかし、方程式を与えるだけでは、その仮定を満たす株価が本当に存在するか、満期株価がいくらになる確率がどれだけあるかは分かりません。

本講の問いは、**株価の確率微分方程式から、正値の価格過程を自分で作り、確率分布と平均・分散を導けるか**です。既習の [Brown 運動と CRR 木の極限](../U3-12/index.md#thm-u3-12-crr-brownian-limit)、[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)、[SDE の強解の存在・一意性](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness) を、金融の変数に具体的に適用します。

## 1. 株価が必ず正であるモデルを作る

時刻を年単位の $t\in[0,T]$、$T>0$ とします。確率空間上のフィルトレーション $(\mathcal F_t)$ に関して $W$ を [標準 Brown 運動](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) とし、$S_0=s_0>0$ 円を確定初期価格、$\mu\in\mathbb R$ をドリフト（年$^{-1}$）、$\sigma\ge0$ をボラティリティ（年$^{-1/2}$）とします。係数は定数、株価は無配当です。

変化量が現在の株価に比例するモデルを考えます。株価100円と200円で同じ割合の変動が起きるという想定に対応し、係数が株価に比例しない加法的な Brown 運動とは異なります。

ここで [SDE の積分表示](../../../解析系/STO/STO9/index.md#def-sto9-sde) と [強解](../../../解析系/STO/STO9/index.md#def-sto9-strong-solution) を使います。強解では先に初期値と Brown 運動を固定し、それらから作る連続・適合過程が積分方程式を満たすかを調べます。「$dS_t=\cdots$」は通常の標本路の微分ではなく、この積分方程式の略記です。

<a id="def-u3-14-gbm"></a>

<!-- formal-statement-start -->
> **定義（幾何 Brown 運動）**  
> $T>0$、確定初期値 $s_0>0$、定数 $\mu\in\mathbb R$、$\sigma\ge0$、フィルトレーション $(\mathcal F_t)$ に関する標準 Brown 運動 $W$ を固定する。[Brown SDE](../../../解析系/STO/STO9/index.md#def-sto9-sde)
>
$$
S_t=s_0+\int_0^t\mu S_u\,du+\int_0^t\sigma S_u\,dW_u,\qquad 0\le t\le T
$$
>
> の連続な適合強解 $S$ を、このパラメータの**幾何 Brown 運動**（geometric Brownian motion、GBM）と呼ぶ。微分記法では $dS_t=\mu S_t\,dt+\sigma S_t\,dW_t$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-14-gbm -->
**定義の確認**（雑音のない例）：$\sigma=0$ の場合を調べます。候補は確定的な関数 $S_t=s_0e^{\mu t}$ です。$S_0=s_0>0$、全時刻で $S_t>0$、各標本路は連続、しかも確定的なので任意の $\mathcal F_t$ に適合します。

有限時間区間で $S$ は有界であり、$\int_0^T|\mu S_u|\,du<\infty$ です。拡散係数は $\sigma S_u=0$ なので確率積分は定義され、値は0です。さらに

$$
\int_0^t\mu S_u\,du
=\int_0^t\mu s_0e^{\mu u}\,du
=s_0e^{\mu t}-s_0
$$

となります。$\mu=0$ の場合も積分は0で同じ等式が成立します。従って $S_t=s_0+\int_0^t\mu S_u\,du$ は**積分形の SDE・初期値・連続適合性**を全て満たしています。$\sigma>0$ でも解が存在し全時刻で正となることを次に証明します。
<!-- definition-example-end -->

## 2. 指数関数は方程式を満たすか

先に [対数変換の結果](../U3-13/index.md#prop-u3-13-log-price) を読めば、正の解が**存在するとき**は

$$
\log(S_t/s_0)=\left(\mu-\frac12\sigma^2\right)t+\sigma W_t
$$

であるはずです。そこで逆向きに、右辺を指数に戻した候補から出発します。この向きなら正値性を先に確保でき、存在を仮定した循環論法になりません。

<a id="thm-u3-14-explicit-gbm"></a>

<!-- formal-statement-start -->
> **定理（幾何 Brown 運動の陽解と正値性）**  
> $T>0,s_0>0,\mu\in\mathbb R,\sigma\ge0$ を定数とし、$(\mathcal F_t)$ に関する標準 Brown 運動 $W$ を与える。次の確率微分方程式
>
$$
dS_t=\mu S_t\,dt+\sigma S_t\,dW_t,\qquad S_0=s_0
$$
>
> は、$[0,T]$ 上で経路ごとに一意な連続適合強解を持ち、その解は
>
$$
\boxed{S_t=s_0\exp\left[\left(\mu-\frac{\sigma^2}{2}\right)t+\sigma W_t\right]}
$$
>
> である。特に $P(S_t>0\text{ for every }t\in[0,T])=1$。
<!-- formal-statement-end -->

**見取り図**：$a=\mu-\sigma^2/2$ とおいて $F(t,x)=s_0e^{at+\sigma x}$ に [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) を使います。$F_t$ が $aF$ を、Brown 運動の二次変分が $\sigma^2F/2$ を生み、両方を足すとちょうど $\mu F$ になります。解が複数ないことは、[大域 Lipschitz SDE の強解の存在・経路ごとの一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness) に係数を代入して確かめます。

<!-- proof-start -->
### 証明

候補を $Y_t=F(t,W_t)$、$F(t,x)=s_0\exp(at+\sigma x)$、$a=\mu-\sigma^2/2$ と定めます。$F$ は $[0,T]\times\mathbb R$ 上 $C^{1,2}$ で、$\mathcal F_t$ に適合する連続な $Y$ を与えます。ここで添字 $F_t,F_x,F_{xx}$ はそれぞれ $\partial F/\partial t$、$\partial F/\partial x$、$\partial^2F/\partial x^2$ の略記です。$F_t$ は空間変数 $x$ を固定した時間偏微分、$F_x,F_{xx}$ は時刻 $t$ を固定した空間偏微分であり、情報の $\mathcal F_t$ とは別の記号です。実際に指数の中身 $at+\sigma x$ を微分すると

$
F_t=aF,\qquad F_x=\sigma F,\qquad F_{xx}=\sigma^2F
$

となります。[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) を、状態過程 $X_t=W_t$ の $b_t=0$、拡散係数1、二次変分密度1として適用すると、

$$
\begin{aligned}
dY_t
&=\left(F_t(t,W_t)+\frac12F_{xx}(t,W_t)\right)dt
  +F_x(t,W_t)\,dW_t\\
&=\left(a+\frac12\sigma^2\right)Y_t\,dt+\sigma Y_t\,dW_t\\
&=\mu Y_t\,dt+\sigma Y_t\,dW_t.
\end{aligned}
$$

また $W_0=0$ より $Y_0=s_0$ です。有限時間の各標本路で $Y$ は連続で有界なので、$\int_0^T|\mu Y_u|du<\infty$、$\int_0^T|\sigma Y_u|^2du<\infty$ がほとんど確実に成立し、積分形の SDE を満たします。

存在だけでなく一意性を確かめます。係数 $b(x)=\mu x$、$g(x)=\sigma x$ は、任意の $x,y\in\mathbb R$ について

$$
|b(x)-b(y)|=|\mu||x-y|,\qquad
|g(x)-g(y)|=\sigma|x-y|,
$$

したがって大域 Lipschitz で、さらに $|b(x)|^2+|g(x)|^2=(\mu^2+\sigma^2)|x|^2$ と線形成長を満たします。[大域 Lipschitz SDE の強解の存在・経路ごとの一意性定理](../../../解析系/STO/STO9/index.md#thm-sto9-global-existence-uniqueness) を同じ $W$、同じ初期値に適用すると、他の連続適合強解は $Y$ と区別できません。

最後に $s_0>0$ と実数値指数関数の正値性から、各標本路で全時刻 $Y_t>0$ です。これは時刻ごとの確率1の主張より強く、全区間で同時に成り立ちます。
<!-- proof-end -->

**最小の数値例**：$s_0=100$ 円、$\mu=0.08$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$T=1$ 年なら

$$
S_1=100\exp(0.06+0.20W_1).
$$

$W_1=0$ の標本では $S_1=100e^{0.06}\approx106.184$ 円です。これは平均価格とは違います。Brown 運動の平均が0でも、指数を通した後の平均は指数の非線形性によって変化します。

## 3. 対数価格から価格の分布へ

正規分布を使う理由は、[標準 Brown 運動の定義](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) により $W_t-W_0\sim N(0,t)$ となることです。定理の指数の**中身**は正規分布ですが、株価 $S_t$ 自体は正規分布ではありません。

「対数正規」という名称は、価格の対数が正規分布になるという特徴を表します。正規分布の分散パラメータは**対数を取った量の分散**であり、価格の分散とは異なります。ここでは $t>0,\sigma>0$ に限ると連続な確率密度が存在します。以下の $\Phi^{-1}(p)$ は、標準正規累積分布関数 $\Phi$ が値 $p$ を取る実数（$p$ 分位点）を表します。

<a id="prop-u3-14-lognormal-law"></a>

<!-- formal-statement-start -->
> **命題（満期株価の対数正規分布）**  
> [幾何 Brown 運動の陽解](#thm-u3-14-explicit-gbm) の条件に加えて $t\in(0,T]$、$\sigma>0$ とする。$m_t=\log s_0+(\mu-\sigma^2/2)t$、$v_t=\sigma^2t>0$ とおくと
>
$$
\log S_t\sim N(m_t,v_t).
$$
>
> $S_t$ の確率密度関数は
>
$$
\boxed{f_{S_t}(x)=\frac{1}{x\sigma\sqrt{2\pi t}}
\exp\left[-\frac{(\log x-m_t)^2}{2\sigma^2t}\right]\quad(x>0)}
$$
>
> であり、$x\le0$ では密度を0とする。標準正規分布の累積分布関数を $\Phi$ とすると、$x>0$ に対し
>
$$
P(S_t\le x)=\Phi\left(\frac{\log x-m_t}{\sigma\sqrt t}\right).
$$
>
> $p\in(0,1)$ に対する $p$ 分位点は $s_0\exp((\mu-\sigma^2/2)t+\sigma\sqrt t\,\Phi^{-1}(p))$ である。
<!-- formal-statement-end -->

**見取り図**：対数を取ると正規分布、元に戻すと正の値にしかならない対数正規分布です。密度の $1/x$ は見た目の補正係数ではなく、変数変換の Jacobian です。これが抜けると密度の積分が1になりません。

<!-- proof-start -->
### 証明

陽解の両辺に対数を取り、$W_t\sim N(0,t)$ を代入すると

$$
\log S_t=\log s_0+\left(\mu-\frac12\sigma^2\right)t+\sigma W_t
\sim N(m_t,\sigma^2t).
$$

$Y=\log S_t$ の密度は $g(y)=(2\pi v_t)^{-1/2}\exp(-(y-m_t)^2/(2v_t))$ です。$x=e^y$ は実数全体から $(0,\infty)$ への狭義単調な $C^1$ 全単射で、逆写像は $y=\log x$、その導関数は $dy/dx=1/x$。従って任意の $x>0$ で密度の変数変換を行い、

$$
f_{S_t}(x)=g(\log x)\left|\frac{d\log x}{dx}\right|
=\frac{1}{x\sqrt{2\pi v_t}}\exp\left(-\frac{(\log x-m_t)^2}{2v_t}\right).
$$

正規分布の密度 $g$ の積分が1であることと、$y=\log x$ の置換により

$$
\int_0^\infty f_{S_t}(x)\,dx
=\int_{-\infty}^\infty g(y)\,dy=1
$$

と確かめられます。$x>0$ に対して単調性を用いて

$$
P(S_t\le x)=P(\log S_t\le\log x)
=P\left(\frac{\log S_t-m_t}{\sqrt{v_t}}
\le\frac{\log x-m_t}{\sqrt{v_t}}\right)
=\Phi\left(\frac{\log x-m_t}{\sqrt{v_t}}\right).
$$

$\Phi$ が連続・狭義単調なので $p=\Phi(z_p)$ とおき、$\log x=m_t+\sigma\sqrt t\,z_p$ を解けば分位点が得られます。
<!-- proof-end -->

**分布を直接確認する例**：$s_0=100$ 円、$\mu=0.08$、$\sigma=0.20$、$t=1$ 年なら $\log(S_1/100)\sim N(0.06,0.04)$。中央値は $100e^{0.06}\approx106.184$ 円、95%分位点は $100e^{0.06+0.2(1.64485)}\approx147.55$ 円です。対数増分の左右対称性が、**円で測った価格の左右対称性を意味しない**点が重要です。

| 比較対象 | 対数増分 $X_t=\log(S_t/s_0)$ | 株価 $S_t$ |
| --- | --- | --- |
| 取り得る値 | 実数全体 | 正の実数 |
| 分布 | 正規 $N((\mu-\sigma^2/2)t,\sigma^2t)$ | 対数正規 |
| 中央値 | $(\mu-\sigma^2/2)t$ | $s_0e^{(\mu-\sigma^2/2)t}$ |
| 平均 | $(\mu-\sigma^2/2)t$ | $s_0e^{\mu t}$ |
| 対称性 | 平均を中心に対称 | 右に長い裾を持つ |

$\sigma=0$ なら $S_t=s_0e^{\mu t}$ に確率1で等しく、**一点に集中した分布**になります。上の密度を $\sigma=0$ に形式代入することはできません。$t=0$ も同様です。

## 4. 平均・分散・条件付き分布を計算する

平均株価を $s_0e^{(\mu-\sigma^2/2)t}$ としてしまう誤りは、対数の平均を指数に入れてしまうことから起こります。[Brown 指数の計算](../../../解析系/STO/STO7/index.md#prop-sto7-brownian-exponential-martingale) で使った正規指数モーメントを、$Z\sim N(0,v)$、$E[e^{aZ}]=e^{a^2v/2}$ として係数を明示して使います。

<a id="prop-u3-14-moments"></a>

<!-- formal-statement-start -->
> **命題（幾何 Brown 運動の実数モーメント）**  
> [陽解](#thm-u3-14-explicit-gbm) の条件で、任意の $p\in\mathbb R$ と $t\in[0,T]$ について
>
$$
E[S_t^p]=s_0^p\exp\left[\left(p\mu+\frac12p(p-1)\sigma^2\right)t\right]<\infty.
$$
>
> 特に
>
$$
E[S_t]=s_0e^{\mu t},\qquad
\operatorname{Var}(S_t)=s_0^2e^{2\mu t}(e^{\sigma^2t}-1).
$$
<!-- formal-statement-end -->

**見取り図**：指数の中の Brown 運動を $p\sigma W_t$ に変えれば、その指数モーメントの二次項が $\tfrac12p^2\sigma^2t$ です。元のドリフト $-\tfrac12p\sigma^2t$ と合わせると $\tfrac12p(p-1)\sigma^2t$ が残ります。

<!-- proof-start -->
### 証明

任意の実数 $p$ で $S_t>0$ だから $S_t^p$ は定義されます。[陽解](#thm-u3-14-explicit-gbm) を $p$ 乗し、$W_t\sim N(0,t)$ の正規指数モーメントを使うと

$$
\begin{aligned}
E[S_t^p]
&=s_0^p e^{p(\mu-\sigma^2/2)t}E[e^{p\sigma W_t}]\\
&=s_0^p e^{p(\mu-\sigma^2/2)t}e^{p^2\sigma^2t/2}\\
&=s_0^p e^{(p\mu+p(p-1)\sigma^2/2)t}.
\end{aligned}
$$

正規分布の指数モーメントはすべての実数パラメータで有限なので、負の $p$ にも使えます。$p=1$、$p=2$ を代入すると

$$
E[S_t]=s_0e^{\mu t},\quad
E[S_t^2]=s_0^2e^{(2\mu+\sigma^2)t}.
$$

二次モーメントから平均の二乗を引くと

$$
\begin{aligned}
\operatorname{Var}(S_t)
&=E[S_t^2]-(E[S_t])^2\\
&=s_0^2e^{(2\mu+\sigma^2)t}-s_0^2e^{2\mu t}\\
&=s_0^2e^{2\mu t}(e^{\sigma^2t}-1).
\end{aligned}
$$
<!-- proof-end -->

$T=1$ 年、$s_0=100$ 円、$\mu=0.08$、$\sigma=0.20$ なら、平均は $100e^{0.08}\approx108.329$ 円、標準偏差は $100e^{0.08}\sqrt{e^{0.04}-1}\approx21.884$ 円です。中央値 $106.184$ 円より平均が大きいことは、右に長い裾を持つ分布と整合します。

時刻 $u$ までの価格を知った後の予測では、**未来の Brown 増分が過去の情報と独立**であることを明示して使います。

<a id="prop-u3-14-conditional"></a>

<!-- formal-statement-start -->
> **命題（対数収益率の独立増分と条件付きモーメント）**  
> [陽解](#thm-u3-14-explicit-gbm) の条件で $0\le u<t\le T$ とする。このとき
>
$$
\log(S_t/S_u)\sim N\left((\mu-\sigma^2/2)(t-u),\sigma^2(t-u)\right)
$$
>
> であり、$\log(S_t/S_u)$ は $\mathcal F_u$ と独立である。任意の実数 $p$ について
>
$$
E[S_t^p\mid\mathcal F_u]
=S_u^p\exp\left[\left(p\mu+\frac12p(p-1)\sigma^2\right)(t-u)\right].
$$
>
> 特に $E[S_t\mid\mathcal F_u]=S_ue^{\mu(t-u)}$。
<!-- formal-statement-end -->

**見取り図**：未来の価格そのものは過去の価格 $S_u$ に依存します。しかし**価格の比**は未来区間の Brown 増分だけから作られ、過去と独立です。価格 $S_t$ と $S_u$ が独立だと取り違えないでください。

<!-- proof-start -->
### 証明

[陽解](#thm-u3-14-explicit-gbm) を $u$ と $t$ に適用して除算し、正値性を使って対数を取ると

$$
\frac{S_t}{S_u}
=\exp\left[\left(\mu-\frac12\sigma^2\right)(t-u)
+\sigma(W_t-W_u)\right].
$$

いま用いる標準 Brown 運動 $W$ では、$\Delta W=W_t-W_u\sim N(0,t-u)$ で、かつこの未来増分は $\mathcal F_u$ と独立です。これで対数収益率の分布と独立性が従います。さらに、$S_u$ は $\mathcal F_u$ 可測なので

$$
\begin{aligned}
E[S_t^p\mid\mathcal F_u]
&=S_u^p e^{p(\mu-\sigma^2/2)(t-u)}
  E[e^{p\sigma\Delta W}\mid\mathcal F_u]\\
&=S_u^p e^{p(\mu-\sigma^2/2)(t-u)}
  E[e^{p\sigma\Delta W}]\\
&=S_u^p e^{p(\mu-\sigma^2/2)(t-u)}
  e^{p^2\sigma^2(t-u)/2}.
\end{aligned}
$$

二行目は独立性、三行目は正規指数モーメントによります。指数を整理し、$p=1$ を代入して結論を得ます。
<!-- proof-end -->

この条件付き平均を、[U3-13 の割引株価の式](../U3-13/index.md#prop-u3-13-discount-stock) と比べると、定数金利 $r$ の下で

$$
E[e^{-rt}S_t\mid\mathcal F_u]
=e^{-ru}S_u e^{(\mu-r)(t-u)}
$$

です。$\mu=r$ なら割引株価は真のマルチンゲールですが、**この等式だけで市場のリスク中立測度を構成したことにはなりません**。測度変更とヘッジは U3-15 で扱います。

## 5. 離散木と連続モデルをつなぐ

[U3-12 の CRR 対数価格の Brown 極限](../U3-12/index.md#thm-u3-12-crr-brownian-limit) では、有限刻みの対数株価が、適切な仮定と評価用確率の下で

$$
\log S_t=\log s_0+\left(r-\frac{\sigma^2}{2}\right)t+\sigma W_t
$$

へ弱収束しました。今回の陽解では $\mu$ を任意に設定できるので、**$\mu=r$ と置いた特別な場合**にこの極限の形と一致します。これは二つのモデルの式が整合するという主張であって、現実の株価のドリフトが常に $r$ だという主張ではありません。

離散側の数値実験を再確認するには、[U3-12 の CRR・Brown 運動極限の再実行手順](../U3-12/assets/README.md) が利用できます。U3-12 の有限刻みでは刻み幅に由来する誤差と標本誤差の両方があり、これから扱う GBM の厳密終端サンプリングでは刻み幅誤差がありません。この違いを比べると、有限木と連続モデルの数値比較の意味が明確になります。

価格の高低を線形に見積もる代わりに、対数価格を正規分布で見積もる利点は、価格が0未満になるという不合理を避けられることです。一方、GBM では価格経路が連続で、係数 $\mu,\sigma$ が一定であると仮定しており、突然のジャンプや期間ごとに変わる変動率は表現できません。

## 6. 手元で再現する数値検証

$T=1$ 年、$s_0=100$ 円、$\mu=0.08$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、乱数シード20261113、標本数50000で、$Z_i\sim N(0,1)$ を擬似乱数生成し、

$$
X_i=(\mu-\sigma^2/2)T+\sigma\sqrt T\,Z_i,\qquad
S_i=s_0e^{X_i}
$$

と直接生成します。時間差分による近似は使わず、**理論分布から満期値を生成**します。比較するのは $X_i$ の平均・分散、$S_i$ の平均・分散、$S_i$ の95%分位点と $P(S_T>100)$ です。

| 評価対象 | 手計算の理論基準 |
| --- | ---: |
| $E[X_T]$ | $0.060000$ |
| $\operatorname{Var}(X_T)$ | $0.040000$ |
| $E[S_T]$ | $108.328707$ 円 |
| $\operatorname{Var}(S_T)$ | $10000e^{0.16}(e^{0.04}-1)$ 円$^2$ |
| 中央値 | $106.183655$ 円 |
| 95%分位点 | 約 $147.55$ 円 |
| $P(S_T>100)$ | $\Phi(0.3)\approx0.617911$ |

上の表は「対数増分」と「価格」では分散の単位も形も違うことを示します。比較表と標本検証により目的を果たせるため、表示上のグラフを増やす代わりに、下記の実行結果を確かめます。乱数に伴う統計誤差は生じますが、時間離散化誤差はありません。

実装正本は [gbm_distribution.py](assets/gbm_distribution.py)、[自動テスト](assets/tests/test_gbm_distribution.py)、[実行手順](assets/README.md) です。Python 3.10 以降の標準ライブラリのみを使用します。初回のブラウザ実行には Pyodide の読み込みが必要で、通信環境によって利用できない場合はローカル実行できます。標本平均の理論標準誤差は $\sqrt{\operatorname{Var}(S_T)/50000}$ 円です。標本ごとに厳密一致を要求せず、その数倍程度の揺らぎを見込みます。

```python-file-lab
# lab-id: U3-14-GBM-DISTRIBUTION
# lab-title: 幾何 Brown 運動の対数増分・価格の分布検証
# lab-file: textbook/volumes/dream_thater/応用系/U/U3-14/assets/gbm_distribution.py
# timeout-ms: 20000
# lab-preset: 乱数標本と理論モーメントを比較 |
```

## 7. 演習と詳細解答

すべての問題は、明示しない限り第1節の定数係数・無配当 GBM と同じ Brown 運動の測度の下で扱い、価格は円、時間は年とします。

<a id="ex-u3-14-a1"></a>
### A1：ドリフト補正と満期値
- Level: A

$s_0=120$、$\mu=0.05$、$\sigma=0.30$、$T=1$ のとき $\log(S_1/s_0)$ の平均・分散と、$W_1=0$ に対応する株価を求めよ。

<!-- solution-start -->
**詳細解答**：[陽解](#thm-u3-14-explicit-gbm) の対数を取ると $\log(S_1/120)=(0.05-0.30^2/2)+0.30W_1$。二階補正は $0.09/2=0.045$ なので、平均は $0.005$、分散は $0.30^2\cdot1=0.09$ です。$W_1=0$ の標本では $S_1=120e^{0.005}\approx120.602$ 円です。対数の平均0.005を価格の平均増分と取り違えないでください。
<!-- solution-end -->

<a id="ex-u3-14-a2"></a>
### A2：正値性と拡散項の確認
- Level: A

$Y_t=50e^{0.01t+0.2W_t}$ とおく。[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) から $dY_t$ を求め、どの時刻でも $Y_t>0$ となる理由を述べよ。

<!-- solution-start -->
**詳細解答**：$F(t,x)=50e^{0.01t+0.2x}$ とおくと、時間偏微分 $F_t=\partial F/\partial t$ は $x$ を固定して $F_t=0.01F$、空間偏微分 $F_x,F_{xx}$ は $t$ を固定して $F_x=0.2F$、$F_{xx}=0.04F$ です。[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula) に $X_t=W_t$ を代入して

$$
dY_t=(0.01+0.04/2)Y_tdt+0.2Y_tdW_t
=0.03Y_tdt+0.2Y_tdW_t.
$$

$Y_0=50$ であり、実数の指数関数は常に正なので、全区間の各標本路で $Y_t>0$ です。
<!-- solution-end -->

<a id="ex-u3-14-a3"></a>
### A3：価格の中央値と期待値
- Level: A

$s_0=100$、$\mu=0.06$、$\sigma=0.40$、$T=1$ とする。$S_T$ の中央値と平均を式で示し、どちらが大きいか答えよ。

<!-- solution-start -->
**詳細解答**：対数ドリフトは $0.06-0.40^2/2=0.06-0.08=-0.02$。従って [分位点公式](#prop-u3-14-lognormal-law) で $p=1/2$ として中央値は $100e^{-0.02}\approx98.020$ 円です。[一次モーメント](#prop-u3-14-moments) は $100e^{0.06}\approx106.184$ 円。平均の方が大きく、ボラティリティが大きい場合は中央値が初期価格より低くても平均は高くなり得ます。
<!-- solution-end -->

<a id="ex-u3-14-a4"></a>
### A4：雑音が消える境界
- Level: A

$\sigma=0$、$s_0=80$、$\mu=-0.02$、$T=2$ とする。$S_T$ の分布、平均、分散を求め、対数正規の密度式をそのまま使えない理由を述べよ。

<!-- solution-start -->
**詳細解答**：[陽解](#thm-u3-14-explicit-gbm) に $\sigma=0$ を代入すると $S_2=80e^{-0.04}$ 円で確定します。従って分布はこの一点への集中、平均は $80e^{-0.04}$ 円、分散は0です。[密度公式](#prop-u3-14-lognormal-law) は $\sigma>0$ で導出されており、$\sigma=0$ では分母 $\sigma\sqrt{2\pi t}$ がゼロになります。点質量には Lebesgue 密度がありません。
<!-- solution-end -->

<a id="ex-u3-14-a5"></a>
### A5：分位点を逆算する
- Level: A

$s_0=100$、$\mu=0.02$、$\sigma=0.2$、$T=1$ のとき $P(S_T>100)$ を $\Phi$ で表せ。$\Phi(0)=1/2$ を使って確率を判定せよ。

<!-- solution-start -->
**詳細解答**：対数ドリフトは $0.02-0.2^2/2=0$ です。正の $S_T$ について $S_T>100$ と $\log(S_T/100)>0$ は同値です。よって

$$
P(S_T>100)=P(0.2W_1>0)=P(W_1>0)=1-\Phi(0)=1/2.
$$

ここでは対数価格の中央値が初期価格であるため、上昇確率がちょうど半分になります。
<!-- solution-end -->

<a id="ex-u3-14-b1"></a>
### B1：二乗・逆数モーメントを両方計算する
- Level: B

$S$ を $s_0>0,\mu,\sigma$ の GBM とする。$E[S_T^2]$ と $E[1/S_T]$ を導き、いずれも有限となる理由を示せ。

<!-- solution-start -->
**詳細解答**：[モーメント命題](#prop-u3-14-moments) の指数は $p\mu+p(p-1)\sigma^2/2$ です。$p=2$ なら $2\mu+2\cdot1\,\sigma^2/2=2\mu+\sigma^2$、$p=-1$ なら $-\mu+(-1)(-2)\sigma^2/2=-\mu+\sigma^2$。従って

$$
E[S_T^2]=s_0^2e^{(2\mu+\sigma^2)T},\qquad
E[1/S_T]=s_0^{-1}e^{(-\mu+\sigma^2)T}.
$$

正規分布の指数モーメント $E[e^{cW_T}]=e^{c^2T/2}$ は任意の実数 $c$ で有限なので、負のべきも有限です。$S_T>0$ が逆数の定義を保証します。
<!-- solution-end -->

<a id="ex-u3-14-b2"></a>
### B2：二時点の共分散
- Level: B

$0<u<t$ とする。$\operatorname{Cov}(S_u,S_t)$ を $s_0,\mu,\sigma,u,t$ で求めよ。価格二時点が独立とは言えない理由も述べよ。

<!-- solution-start -->
**詳細解答**：[条件付き平均](#prop-u3-14-conditional) は $E[S_t\mid\mathcal F_u]=S_ue^{\mu(t-u)}$。$S_u$ は $\mathcal F_u$ 可測ですが、一般に有界ではありません。[条件付き期待値の既知量の取り出し](../../../解析系/F0/F0-00P3A/index.md#thm-f0-00p3a-basic-properties) を適用するため、まず $Z_n=\min(S_u,n)$ と置きます。$Z_n$ は有界・$\mathcal F_u$ 可測なので、[塔の性質](../../../解析系/F0/F0-00P3A/index.md#thm-f0-00p3a-tower) と合わせて

$
E[Z_nS_t]=E[Z_n E[S_t\mid\mathcal F_u]]
=e^{\mu(t-u)}E[Z_nS_u].
$

$S_u,S_t>0$ で、[実数モーメント](#prop-u3-14-moments) から二次モーメントが有限です。$n\to\infty$ として単調収束定理を使うと

$
E[S_uS_t]=e^{\mu(t-u)}E[S_u^2].
$

[二次モーメント](#prop-u3-14-moments) を入れて $E[S_uS_t]=s_0^2e^{\mu(t+u)}e^{\sigma^2u}$。一方 $E[S_u]E[S_t]=s_0^2e^{\mu(t+u)}$。従って

$$
\operatorname{Cov}(S_u,S_t)
=s_0^2e^{\mu(t+u)}(e^{\sigma^2u}-1).
$$

$\sigma>0,u>0$ なら正であるため独立ではありません。独立なのは $S_t/S_u$ を作る未来の対数増分であり、価格自体ではありません。
<!-- solution-end -->

<a id="ex-u3-14-b3"></a>
### B3：確率密度の変数変換を省略しない
- Level: B

$X\sim N(a,b^2)$（$b>0$）とし、$S=se^X$（$s>0$）とする。$S$ の確率密度関数と $P(S>k)$（$k>0$）を求め、密度を積分して1になることを確認せよ。

<!-- solution-start -->
**詳細解答**：$x=\log(y/s)$ は $y>0$ で $dx/dy=1/y$。$X$ の密度を $g(x)=(b\sqrt{2\pi})^{-1}e^{-(x-a)^2/(2b^2)}$ とおくと、変数変換によって

$$
f_S(y)=g(\log(y/s))\frac1y
=\frac{1}{yb\sqrt{2\pi}}
\exp\left[-\frac{(\log(y/s)-a)^2}{2b^2}\right]\quad(y>0).
$$

$y=se^x$ で $dy=y\,dx$ なので $\int_0^\infty f_S(y)\,dy=\int_{-\infty}^\infty g(x)\,dx=1$。また $S>k$ は $X>\log(k/s)$ と同値だから

$$
P(S>k)=1-\Phi\left(\frac{\log(k/s)-a}{b}\right).
$$

$1/y$ を落とすと正規密度の単なる関数合成となり、密度変換になりません。
<!-- solution-end -->

<a id="ex-u3-14-b4"></a>
### B4：定数係数によるモデルの限界
- Level: B

$S$ の対数増分が区間 $[0,1]$ と $[1,2]$ でそれぞれ独立な正規分布 $N(0.01,0.04)$ と $N(0.01,0.09)$ に従うとする。単一定数 $\mu,\sigma$ の GBM で両方を同時に表せるかを述べ、どの仮定を変える必要があるか答えよ。

<!-- solution-start -->
**詳細解答**：[対数収益率の独立増分と条件付きモーメント](#prop-u3-14-conditional) より、定数係数 GBM なら長さ1年のどの区間でも $\operatorname{Var}(\log(S_t/S_u))=\sigma^2\cdot1$ は同じです。しかし指定の二つの分散は $0.04$ と $0.09$ で等しくありません。従って単一の定数 $\sigma$ では表せません。

分散だけでなく**平均も**合わせるには、例えば区間ごとに確定的なドリフトと変動率を

$
(\mu(t),\sigma(t))=
\begin{cases}
(0.03,0.2),&0\le t<1,\\
(0.055,0.3),&1\le t\le2
\end{cases}
$

と取ります。なぜ二つのドリフトも必要かというと、[対数株価の Itô 変換](../U3-13/index.md#prop-u3-13-log-price) から、各定数係数区間 $[a,b]$ では

$
\log(S_b/S_a)=\left(\mu-\frac{\sigma^2}{2}\right)(b-a)+\sigma(W_b-W_a)
$

となるためです。第1区間は $0.03-0.2^2/2=0.01$、分散 $0.2^2=0.04$。第2区間は $0.055-0.3^2/2=0.01$、分散 $0.3^2=0.09$ です。[Brown 運動の独立増分](../../../解析系/STO/STO4/index.md#def-sto4-brownian-motion) により両区間の対数増分は独立です。このように**係数の時間一定性**を外せば指定分布を実現できますが、単一の定数係数 GBM にはなりません。
<!-- solution-end -->

<a id="ex-u3-14-c1"></a>
### C1：条件付き価格分布から将来の上昇確率・期待値を求める
- Level: C

$s_0=100$ 円、$\mu=0.06$ 年$^{-1}$、$\sigma=0.2$ 年$^{-1/2}$ の GBM を考える。時刻 $u=1$ 年に観測して $S_u=s$ 円（$s>0$）だったとする。満期 $t=2$ 年について次を求めよ。

1. $S_2/S_1$ の条件付き対数分布と、$P(S_2>1.1S_1\mid\mathcal F_1)$。
2. $E[S_2\mid\mathcal F_1]$ と $\operatorname{Var}(S_2\mid\mathcal F_1)$。
3. 金利 $r=0.03$ 年$^{-1}$ の無配当預金で割引するとき、$e^{-rt}S_t$ がこの測度の下でマルチンゲールか判定し、判定と上の確率計算がどの仮定に依存するか説明せよ。

<!-- solution-start -->
**詳細解答**：

1. [条件付き対数収益率](#prop-u3-14-conditional) に $t-u=1$ を代入します。対数ドリフトは $0.06-0.2^2/2=0.04$、分散は $0.2^2\cdot1=0.04$ なので、$\log(S_2/S_1)$ は $\mathcal F_1$ と独立で $N(0.04,0.04)$ に従います。$S_1>0$ を使って事象を変形すると

   $$
   \begin{aligned}
   P(S_2>1.1S_1\mid\mathcal F_1)
   &=P(\log(S_2/S_1)>\log1.1\mid\mathcal F_1)\\
   &=1-\Phi\left(\frac{\log1.1-0.04}{0.2}\right).
   \end{aligned}
   $$

   $\log1.1\approx0.0953102$ より正規標準化値は約 $0.27655$、確率は約 $0.3911$ です。右辺に観測価格 $s$ は残りません。

2. [条件付きモーメント](#prop-u3-14-conditional) の $p=1,2$ を用います。$E[S_2\mid\mathcal F_1]=S_1e^{0.06}$、$E[S_2^2\mid\mathcal F_1]=S_1^2e^{2(0.06)+0.04}=S_1^2e^{0.16}$ です。二次モーメントから条件付き平均の二乗を引くと

   $$
   \begin{aligned}
   \operatorname{Var}(S_2\mid\mathcal F_1)
   &=E[S_2^2\mid\mathcal F_1]-(E[S_2\mid\mathcal F_1])^2\\
   &=S_1^2e^{0.12}(e^{0.04}-1).
   \end{aligned}
   $$

   観測値 $S_1=s$ を代入すると条件付き平均は $se^{0.06}$ 円、分散は $s^2e^{0.12}(e^{0.04}-1)$ 円$^2$ です。

3. [割引株価の条件付き期待値](../U3-13/index.md#prop-u3-13-discount-stock) は

   $$
   E[e^{-0.03t}S_t\mid\mathcal F_u]
   =e^{-0.03u}S_u e^{(0.06-0.03)(t-u)}.
   $$

   $t>u$ で指数倍率が1でないため、この測度の下で割引株価はマルチンゲールではありません。上の確率は、同じ測度で $W$ が Brown 運動であること、係数が定数であること、未来増分の独立性に依存します。$r$ に置き換えるだけで現実の確率をリスク中立確率へ変えられるわけではありません。
<!-- solution-end -->

## 8. 次の問い

GBM により「どんな価格がどの確率で生じるか」は計算できました。しかしオプションの無裁定価格は、与えられた $\mu$ のまま将来価格を平均した値とは限りません。U3-15 では、どの測度で割引株価がマルチンゲールになるのかを確認し、連続時間のリスク中立評価へ進みます。
