# U3-17 Feynman–Kac：期待値と PDE の橋

[前講の Black–Scholes–Merton（BSM）方程式](../U3-16/index.md#thm-u3-16-bsm-necessity)は、価格関数が**存在して複製できるなら**何を満たすべきかを定めました。しかし、満期支払額を指定するたびに PDE の解を当て推量するのでは実用的ではありません。一方、[リスク中立評価](../U3-15/index.md#thm-u3-15-replication-price)は満期の期待値を出発点にします。この二つの方法は本当に同じ価格を与えるのでしょうか。

本講では、まず一つの満期請求権に対する条件付き期待値を計算可能な正規積分へ直し、次にその積分が **PDE の古典解を実際に作る**ことを示します。最後に、成長条件がなぜ一意性に必要か、終端条件と空間境界条件の違い、満期前の継続支払への拡張まで確かめます。[一般の Feynman–Kac 検証公式](../../../解析系/STO/STO11/index.md#thm-sto11-feynman-kac)は既習ですが、そこに書かれた有界解の定理を、無限に成長する金融ペイオフに条件を確認せず適用してはいけません。

## 1. 終端支払から途中の価格へ

満期を $T>0$ 年、現在時刻を $0\le t\le T$、株価を $s>0$ 円とします。無配当、定数短期金利 $r\in\mathbb R$（年$^{-1}$）、定数ボラティリティ $\sigma>0$（年$^{-1/2}$）の摩擦のない市場です。株式と預金の複製を考えるときは連続取引・借入・空売りを許します。

[U3-15 で構成したリスク中立測度 $Q$](../U3-15/index.md#thm-u3-15-risk-neutral-measure)では株価 $S^{t,s}$ は

$$
dS_u^{t,s}=rS_u^{t,s}\,du+\sigma S_u^{t,s}\,dW_u^Q,
\qquad S_t^{t,s}=s,\qquad t\le u\le T
$$

に従います。[幾何 Brown 運動の陽解](../U3-14/index.md#thm-u3-14-explicit-gbm)を初期点 $(t,s)$ に使えば

$$
S_T^{t,s}
=s\exp\left\{\left(r-\frac{\sigma^2}{2}\right)(T-t)
+\sigma(W_T^Q-W_t^Q)\right\}.
$$

$\tau=T-t$ と書き、$t<T$ では $Z=(W_T^Q-W_t^Q)/\sqrt{\tau}$ が標準正規分布に従います。$Z$ は時刻 $t$ までの情報と独立です。これにより条件付き期待値を、初期値 $(t,s)$ を固定した通常の積分へ変えられます。

支払額 $g(S_T)$ 円の $g:(0,\infty)\to\mathbb R$ は、まず**連続かつ多項式成長**、すなわちある $C>0,m\ge0$ に対して

$$
|g(s)|\le C(1+s^m)\quad(s>0)
$$

を満たすとします。ここで「多項式成長」は $s\to\infty$ だけでなく $s\downarrow0$ でもこの上界が成り立つことを含みます。次に、この条件のもとで有限になる期待値を候補として定義し、その後で PDE を満たすかを証明します。この条件と[GBM の実数モーメント](../U3-14/index.md#prop-u3-14-moments)で以下の期待値が有限になります。

<a id="def-u3-17-valuation"></a>

<!-- formal-statement-start -->
> **定義（リスク中立評価関数）**  
> $T>0$、$r\in\mathbb R$、$\sigma>0$ とし、$g:(0,\infty)\to\mathbb R$ は連続で $|g(s)|\le C(1+s^m)$ を満たす。上の $Q$ 下の GBM $S^{t,s}$ に対して
>
$$
v(t,s):=E_Q\!\left[e^{-r(T-t)}g(S_T^{t,s})\right],
\qquad (t,s)\in[0,T]\times(0,\infty)
$$
>
> を **リスク中立評価関数**と呼ぶ。$S_T^{T,s}=s$ と定める。これはまず数値として定義するものであり、PDE の滑らかさや取引による複製はまだ仮定しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-u3-17-valuation -->
**定義の確認**：満期に $K>0$ 円を受け取る契約では $g(s)=K$ は連続で $|g(s)|\le K(1+s^0)$ を満たします。支払額は確定値なので期待値は $K$、割引因子は $e^{-r(T-t)}$、従って $v(t,s)=Ke^{-r(T-t)}$ です。$t=T$ なら $v(T,s)=K=g(s)$ で、株価に依存しません。定義域・成長・有限期待値・終端値を個別に確認できました。
<!-- definition-example-end -->

## 2. 株価変動を正規積分に置き換える

$Z$ の密度を $\phi(z)=(2\pi)^{-1/2}e^{-z^2/2}$ とすれば、前節の陽解を定義に代入して

$$
\boxed{
v(t,s)=e^{-r\tau}\int_{\mathbb R}
g\!\left(s e^{(r-\sigma^2/2)\tau+\sigma\sqrt{\tau}z}\right)
\phi(z)\,dz,\quad \tau>0.
}
$$

この式は、分岐する標本路を全部列挙せず、満期株価の**分布**だけで途中の価格を計算する道具です。正規分布の積分が有限である理由は $|g|\le C(1+s^m)$ と $E[e^{m\sigma\sqrt{\tau}Z}]<\infty$ にあります。

ここで**生成作用素**とは拡散過程が滑らかな試験関数を瞬間的にどう変化させるかを記述する微分演算子です。[拡散の生成作用素](../../../解析系/STO/STO11/index.md#prop-sto11-diffusion-generator)を $b(s)=rs$、拡散係数 $a(s)=\sigma s$ に当てはめます。

一変数関数 $f(s)$ では、$f'(s)=df/ds$ と $f''(s)=d^2f/ds^2$ は株価方向の一階・二階導関数です。二変数の価格関数 $v(t,s)$ では、$v_t$ は株価を固定して時刻で偏微分し、$v_s,v_{ss}$ は時刻を固定して株価で一階・二階偏微分します。

したがって

$$
(\mathcal L^Q f)(s)=rs f'(s)+\frac{\sigma^2s^2}{2}f''(s).
$$

[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)でも $f(u,S_u)$ の $du$ の係数は $f_u+\mathcal L^Qf$ です。したがって期待値の時間変化と PDE をつなぐべき演算子は $\mathcal L^Q-r$ です。$-rv$ は支払額を現在価値へ割り引く項であり、株価の期待成長率 $\mu$ は入りません。

## 3. 期待値から古典解を構成する

「既に解があれば期待値で表せる」という検証と、「期待値が解として存在する」は区別します。本節では後者を、この定数係数モデルに限って直接証明します。

<a id="thm-u3-17-fk-existence"></a>

<!-- formal-statement-start -->
> **定理（対数正規期待値からの BSM 古典解）**  
> $T>0,r\in\mathbb R,\sigma>0$ とする。$g:(0,\infty)\to\mathbb R$ は連続で、ある $C>0,m\ge0$ に対し $|g(s)|\le C(1+s^m)$ を満たす。前節の期待値で定義した $v$ は
>
> 1. $v\in C^{1,2}([0,T)\times(0,\infty))\cap C([0,T]\times(0,\infty))$ を満たし、$v(T,s)=g(s)$ となる。
> 2. $\sup_{0\le t\le T}|v(t,s)|\le C_T(1+s^m)$ を満たす。
> 3. 各 $0\le t<T,s>0$ で次の終端値問題を満たす。
>
$$
\boxed{
v_t+\frac{\sigma^2s^2}{2}v_{ss}+rs v_s-rv=0,
\qquad v(T,s)=g(s).
}
$$
<!-- formal-statement-end -->

**証明の見取り図**：$x=\log s$ に変えると、GBM の対数は定数ドリフト付き Brown 運動です。その正規密度で $g(e^x)$ を平滑化すれば、$g$ 自体を微分しなくても時間1回・空間2回の微分ができます。正規密度の微分方程式から $v$ の PDE を作り、最後に $s=e^x$ の連鎖律で元へ戻します。

<!-- proof-start -->
### 証明

**（1）積分と正則性。** $a=r-\sigma^2/2$、$h(x)=g(e^x)$、$F(\tau,x)=e^{r\tau}v(T-\tau,e^x)$ とします。$\tau>0$ では積分変数 $y=\log S_T$ の密度を

$$
k_\tau(w)=\frac{1}{\sigma\sqrt{2\pi\tau}}
\exp\left(-\frac{(w-a\tau)^2}{2\sigma^2\tau}\right)
$$

と置けば

$$
F(\tau,x)=\int_{\mathbb R}h(y)k_\tau(y-x)\,dy.
$$

仮定は $|h(y)|\le C(1+e^{my})$ と書けます。$\tau$ を $0<\varepsilon\le\tau\le T$、$x$ を有界な閉区間に制限すると、$k_\tau$ と必要な $\partial_\tau k_\tau,\partial_w k_\tau,\partial_{ww}k_\tau$ は、定数倍の多項式と Gaussian 尾部で一様に支配されます。$e^{my}$ を掛けても可積分です。従って支配収束定理による積分内微分ができ、

$$
F_x=-\int h(y)\,\partial_w k_\tau(y-x)\,dy,\quad
F_{xx}=\int h(y)\,\partial_{ww}k_\tau(y-x)\,dy,
$$

および $F_\tau=\int h(y)\partial_\tau k_\tau(y-x)dy$ が存在し連続です。$x=\log s$ は $s>0$ で滑らかですから $v\in C^{1,2}$ が得られます。

**（2）密度が満たす方程式。** $w=y-x$ とすると正規密度について直接微分して

$$
\partial_w k_\tau=-\frac{w-a\tau}{\sigma^2\tau}k_\tau,\qquad
\partial_{ww}k_\tau=
\left(\frac{(w-a\tau)^2}{\sigma^4\tau^2}
-\frac{1}{\sigma^2\tau}\right)k_\tau
$$

です。また対数微分で

$$
\partial_\tau\log k_\tau
=-\frac{1}{2\tau}
+\frac{a(w-a\tau)}{\sigma^2\tau}
+\frac{(w-a\tau)^2}{2\sigma^2\tau^2}.
$$

以上を合わせると

$$
\partial_\tau k_\tau
=-a\partial_w k_\tau+\frac{\sigma^2}{2}\partial_{ww}k_\tau.
$$

先ほどの積分微分式へ代入して

$$
F_\tau=aF_x+\frac{\sigma^2}{2}F_{xx}
$$

を得ます。ここで $g$ を微分していない点が重要です。

**（3）株価座標へ戻す。** $\tau=T-t$、$x=\log s$ を使うと

$$
v_t=e^{-r\tau}(rF-F_\tau),\qquad
v_s=e^{-r\tau}\frac{F_x}{s},\qquad
v_{ss}=e^{-r\tau}\frac{F_{xx}-F_x}{s^2}.
$$

PDE 左辺へ一つずつ代入すると

$$
\begin{aligned}
v_t+\tfrac12\sigma^2s^2v_{ss}+rsv_s-rv
&=e^{-r\tau}\left[-F_\tau
+\tfrac12\sigma^2F_{xx}
+(r-\tfrac12\sigma^2)F_x\right]\\
&=e^{-r\tau}[-F_\tau+\tfrac12\sigma^2F_{xx}+aF_x]=0.
\end{aligned}
$$

**（4）成長と終端値。** [GBM の実数モーメント公式](../U3-14/index.md#prop-u3-14-moments)で

$$
E_Q[(S_T^{t,s})^m]
=s^m\exp\left(mr\tau+\tfrac12m(m-1)\sigma^2\tau\right)
$$

となるため、$0\le\tau\le T$ で割引も含めた定数 $C_T$ を取れば $|v(t,s)|\le C_T(1+s^m)$ です。

さらに $(t_n,s_n)\to(T,s)$、$s>0$ に対して同じ標準正規変数 $Z$ で $S_T^{t_n,s_n}$ を構成すると、指数内の $\tau_n$ と $\sqrt{\tau_n}$ が0になり $S_T^{t_n,s_n}\to s$ がほとんど確実に成立します。$s_n$ は有界、$0\le\tau_n\le T$ なので被積分関数の絶対値は定数倍の $1+\exp(m|a|T+m\sigma\sqrt{T}|Z|)$ で支配され、その期待値は有限です。$g$ は連続なので $g(S_T^{t_n,s_n})\to g(s)$ がほとんど確実に成立します。上で構成した可積分な共通上界によって期待値と極限を交換でき、$v(t_n,s_n)\to g(s)$ です。$v(T,s)=g(s)$ と合わせて終端までの連続性が示されました。
<!-- proof-end -->

**何が得られたか**：$g$ が満期で微分可能でなくても、$t<T$ では積分の Gaussian 平滑化により PDE の古典解が存在します。ただし満期の点 $(T,s)$ で $v_s,v_{ss}$ が連続に延長されるとは言っていません。

## 4. 成長条件・終端条件・境界条件の役割

期待値から解を作れたとしても、別の PDE 解が同じ終端値を持つ可能性を排除しなければなりません。[前講の古典解からの複製](../U3-16/index.md#thm-u3-16-bsm-replication)にはデルタの成長条件がありますが、ここでは価格関数自身の成長上界だけで**一意性**を証明します。

<a id="prop-u3-17-uniqueness"></a>

<!-- formal-statement-start -->
> **命題（多項式成長クラスでの BSM 解の一意性）**  
> $T>0,r\in\mathbb R,\sigma>0$ とする。同じ連続終端値 $g$ を持ち、各々 $C^{1,2}([0,T)\times(0,\infty))\cap C([0,T]\times(0,\infty))$ に属して BSM PDE を満たす関数 $u_1,u_2$ が、ある $C,m$ について
>
$$
|u_i(t,s)|\le C(1+s^m)\quad(0\le t\le T,\ s>0,\ i=1,2)
$$
>
> を満たすなら $u_1=u_2$ である。
<!-- formal-statement-end -->

**証明の見取り図**：二つの解の差を $w$ とし、$Q$ 下で割引した $w(u,S_u)$ に Itô 公式を適用します。PDE のためドリフトが消えます。局所マルチンゲールから期待値恒等式へ移るときだけ、成長上界と GBM の尾部を使用します。

<!-- proof-start -->
### 証明

$w=u_1-u_2$ は終端値 $w(T,s)=0$ と $|w(t,s)|\le 2C(1+s^m)$ を満たします。任意の初期点 $(t,s)$ に対し [時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)を $e^{-r(u-t)}w(u,S_u^{t,s})$ に適用すると $u<T$ で

$$
d\!\left(e^{-r(u-t)}w(u,S_u)\right)
=e^{-r(u-t)}\sigma S_uw_s(u,S_u)\,dW_u^Q
$$

です。したがってまず局所マルチンゲールです。$\sigma>0$、$s>0$ の GBM の陽解から

$$
\sup_{t\le u\le T}S_u
\le s\exp\left(|r-\sigma^2/2|T+
\sigma\sup_{t\le v\le T}|W_v^Q-W_t^Q|\right)
$$

が成り立ちます（$W_v^Q-W_t^Q$ は時刻 $t$ からの Brown 増分です）。[Brown 運動の反射原理](../../../解析系/STO/STO4/index.md#thm-sto4-reflection-principle)から最大値の尾確率が正規分布の尾で抑えられ、右辺はどの有限な正のべきについても有限期待値を持ちます。従って、任意の $p>1$ について

$$
E_Q\!\left[\sup_{t\le u\le T}
|e^{-r(u-t)}w(u,S_u)|^p\right]<\infty
$$

です。これにより局所化した過程は一様可積分であり、停止を外して真のマルチンゲールになります。さらに $u\uparrow T$ とすると $w(u,S_u)\to w(T,S_T)=0$ がほとんど確実に成立します。先ほどの可積分な最大値上界により期待値の極限も交換できるので

$$
w(t,s)=E_Q[e^{-r(T-t)}w(T,S_T^{t,s})]=0.
$$

初期点 $(t,s)$ は任意なので一意性が従います。
<!-- proof-end -->

**空間境界がなぜ不要か**：GBM は任意の有限期間で $S_u>0$ を保ち、$s=0$ に到達しません。[GBM の正値性](../U3-14/index.md#thm-u3-14-explicit-gbm)と上の成長クラスの一意性により、この問題で指定するのは $s>0$ 上の**満期支払との一致**です。$s=0$ に吸収境界値を別に課したり、$s\to\infty$ に任意の固定値を課したりしません。障壁商品では到達する障壁に境界条件が必要になり、別の問題になります。

**壊れる例**：$g(s)=\mathbf 1_{\{s>K\}}$ は $s=K$ で不連続です。上の定理の「$g$ は連続」を失います。$\Phi$ を標準正規累積分布関数とします。期待値積分は $t<T$ で滑らかですが、$s=K$、$\tau\downarrow0$ では

$$
e^{-r\tau}Q(S_T^{t,K}>K)
=e^{-r\tau}\Phi\!\left(\frac{(r-\sigma^2/2)\sqrt{\tau}}{\sigma}\right)
\longrightarrow\frac12
$$

となり、$g(K)=0$ へ連続に接続しません。これは PDE が間違いという意味ではなく、**満期端点での連続性**という証明機構が使えなくなった例です。満期の不連続な支払額には別の終端値概念が必要です。

また上の存在・一意性が示すのは価格関数についてで、どのような $g$ に対してもヘッジ保有量の全期間の可積分性が自動的に成立するとまでは主張しません。自己金融による複製には[前講の条件](../U3-16/index.md#thm-u3-16-bsm-replication)を別途確認します。

## 5. PDE と期待値を別々に計算して照合する

ここでは $g$ を具体的に決め、正規積分による期待値と、PDE 左辺を微分で計算した結果を**独立に**照合します。いずれも無配当、単位は円・年です。

満期固定額 $K$ の場合は既に $v=Ke^{-r\tau}$ と求めました。$v_t=rv$、$v_s=v_{ss}=0$ だから PDE 左辺は $rv-rv=0$ です。

満期に株式一株相当を払う $g(s)=s$ なら、[GBM の一次モーメント](../U3-14/index.md#prop-u3-14-moments)で $E_Q S_T=s e^{r\tau}$ ですから $v=s$。$v_t=v_{ss}=0,v_s=1$ を代入すると $rs-rs=0$ です。

より非自明な $g(s)=s^2/K$（$K>0$ 円）では、同じ[二次モーメント公式](../U3-14/index.md#prop-u3-14-moments)から

$$
E_Q[(S_T^{t,s})^2]=s^2e^{(2r+\sigma^2)\tau},\qquad
v(t,s)=\frac{s^2}{K}e^{(r+\sigma^2)\tau}.
$$

$a_2=r+\sigma^2$ と置くと $v_t=-a_2v,v_s=2v/s,v_{ss}=2v/s^2$ なので

$$
v_t+\frac12\sigma^2s^2v_{ss}+rsv_s-rv
=(-a_2+\sigma^2+2r-r)v=0.
$$

さらに $v(T,s)=s^2/K$ ですから終端条件も一致します。[前講の自己金融デルタ](../U3-16/index.md#thm-u3-16-bsm-replication)を適用できるのは、これらの滑らかな例では $v_s$ にも多項式成長上界があるためです。二乗例の株式保有は $2v/s$ 株、預金保有は $-v/B$ 単位となります。

**計算値の照合**：$s=K=100$ 円、$r=0.03$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$\tau=1$ 年では $a_2=0.07$ 年$^{-1}$ です。

$$
v(0,100)=100e^{0.07}\approx107.2508\text{ 円},\qquad
\Delta(0,100)=2e^{0.07}\approx2.1450\text{ 株}.
$$

次の Python は同じ価値を**密度積分**と**モーメント式**で別々に計算します。標準正規密度を $[-9,9]$ で切り、刻みを細かくした Simpson 則で積分します。切断誤差が無視できるのは正規尾部とこの二乗支払額の指数成長の組合せに限った数値確認です。

~~~python
import math

r, sigma, s, K, tau = 0.03, 0.20, 100.0, 100.0, 1.0
N, L = 4000, 9.0
dz = 2 * L / N

def density_integrand(z):
    st = s * math.exp((r - sigma**2 / 2) * tau + sigma * math.sqrt(tau) * z)
    return (st**2 / K) * math.exp(-z*z / 2) / math.sqrt(2 * math.pi)

total = sum(
    (1 if i in (0, N) else (4 if i % 2 else 2))
    * density_integrand(-L + i * dz)
    for i in range(N + 1)
)
integral_price = math.exp(-r * tau) * dz * total / 3
moment_price = (s*s/K) * math.exp((r + sigma*sigma) * tau)
print(f"integral={integral_price:.8f}, moment={moment_price:.8f}")
assert abs(integral_price - moment_price) < 1e-8
~~~

静図を加える代わりに、終端条件 → 正規積分 → PDE の対応を上の式と手計算で固定しました。時間依存の新しい因果関係を表示する必要がないため、今回は動的図を使用しません。

## 6. 満期まで続く定額の支払

満期の一括支払だけでなく、途中で毎年 $c$ 円（円／年）を連続して受け取る契約を考えます。以下では $c$ は定数で、満期の追加支払は0です。経過時間 $du$ に $c\,du$ 円の支払があるため、受取時点ごとに割り引きます。

<a id="prop-u3-17-running-cashflow"></a>

<!-- formal-statement-start -->
> **命題（定額連続支払の期待値と非斉次 BSM 方程式）**  
> $T>0,r\in\mathbb R,\sigma>0,c\in\mathbb R$ の無配当 GBM 市場で、時刻 $t$ から $T$ まで定額支払率 $c$ を持ち、満期一括支払を持たない契約の価値を
>
$$
v(t,s)=E_Q\!\left[\int_t^T e^{-r(u-t)}c\,du\right]
$$
>
> とする。このとき $v$ は $s$ に依存せず、
>
$$
v(t,s)=
\begin{cases}
\displaystyle\frac{c}{r}(1-e^{-r(T-t)}),&r\ne0,\\
c(T-t),&r=0,
\end{cases}
$$
>
> となり、$v_t+\mathcal L^Qv-rv+c=0$、$v(T,s)=0$ を満たす。
<!-- formal-statement-end -->

この $+c$ は満期 payoff の一部ではなく、**途中で受け取る利得の現在価値**です。[一般 Feynman–Kac 公式の積分項](../../../解析系/STO/STO11/index.md#thm-sto11-feynman-kac)で $V=r,g=c,h=0$ とした形です。ただしその一般定理の $V\ge0$ 条件を使って直接主張できるのは $r\ge0$ の場合です。ここでは任意の実数 $r$ に対して定額積分を直接計算します。

<!-- proof-start -->
### 証明

$c$ は確定値なので期待値を外すと

$$
v(t,s)=c\int_t^T e^{-r(u-t)}du
=c\int_0^{T-t}e^{-rz}dz
$$

です。$r\ne0$ では原始関数 $-e^{-rz}/r$ の両端値から $c(1-e^{-r\tau})/r$、$r=0$ では $c\tau$ が得られます。いずれも $v_s=v_{ss}=0$、$v(T,s)=0$ です。$r\ne0$ では $v_t=-c e^{-r\tau}$、$rv=c(1-e^{-r\tau})$ であるため

$$
v_t+\mathcal L^Qv-rv+c
=-ce^{-r\tau}-c(1-e^{-r\tau})+c=0.
$$

$r=0$ でも $v_t=-c$ だから $v_t+c=0$ です。
<!-- proof-end -->

## 7. 演習

まず対象・条件を読む練習をしてから、期待値、PDE、成長条件、反例、複製を順につなげます。各問題の $t<T$ に対し $\tau=T-t$ とし、特記がなければ $r\in\mathbb R,\sigma>0,s>0$ とします。

<a id="ex-u3-17-a1"></a>
### U3-17-A1：生成作用素の係数
- Level: A

$Q$ 下で $dS_u=rS_u\,du+\sigma S_u\,dW_u^Q$ とする。$f(s)=s^3$ へ生成作用素を適用し、$(\mathcal L^Qf)(s)$ を求めよ。

<!-- solution-start -->
**詳細解答**：[生成作用素の拡散公式](../../../解析系/STO/STO11/index.md#prop-sto11-diffusion-generator)におけるドリフトと拡散係数は $b(s)=rs$、$a(s)=\sigma s$ です。

ただし引用先の命題はコンパクト台を持つ $C^2$ 関数を仮定し、$f(s)=s^3$ にはそのまま適用できません。ここでは初期株価 $s$ を含む区間 $[1/n,n]$（$n>\max(s,1/s)$）から出る時刻で株価を停止させ、[時間依存 Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)の $du$ 係数として $\mathcal L^Qf$ を計算します。停止前の各株価において

$$
f'(s)=3s^2,\qquad f''(s)=6s
$$

なので

$$
\mathcal L^Qf=rs(3s^2)+\tfrac12\sigma^2s^2(6s)
=(3r+3\sigma^2)s^3.
$$

単位は $s^3$/年で、$r$ を $P$ 下の $\mu$ へ置き換えないことが重要です。
<!-- solution-end -->

<a id="ex-u3-17-a2"></a>
### U3-17-A2：終端条件だけの計算
- Level: A

満期に $K>0$ 円を確定支払する契約の期待値価格を求め、PDE 左辺と終端値を検査せよ。

<!-- solution-start -->
**詳細解答**：$g(S_T)=K$ なので $E_Q[g(S_T)]=K$、従って $v=Ke^{-r\tau}$ です。$\partial_t\tau=-1$ だから $v_t=rKe^{-r\tau}=rv$。また $v_s=v_{ss}=0$ より $v_t+\mathcal L^Qv-rv=rv-rv=0$ です。$\tau=0$ で $v(T,s)=K$ と、指定した満期額に一致します。
<!-- solution-end -->

<a id="ex-u3-17-a3"></a>
### U3-17-A3：株式そのもの
- Level: A

$g(s)=s$ の割引期待値を求め、$Q$ 下の成長率 $r$ が割引と相殺することを示せ。

<!-- solution-start -->
**詳細解答**：[GBM のモーメント](../U3-14/index.md#prop-u3-14-moments)を次数1で使うと $E_Q[S_T^{t,s}]=se^{r\tau}$ です。割引で

$$
v(t,s)=e^{-r\tau}se^{r\tau}=s
$$

となります。時間微分と二階株価微分は0、一階株価微分は1だから、PDE 左辺は $0+0+rs-rs=0$。また $v(T,s)=s$ です。
<!-- solution-end -->

<a id="ex-u3-17-a4"></a>
### U3-17-A4：二次モーメントの指数
- Level: A

$g(s)=s^2/K$、$K>0$ とする。$Q$ 下の二次モーメントと割引期待値の指数をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**：[GBM の二次モーメント](../U3-14/index.md#prop-u3-14-moments)を使うと $E_Q S_T^2=s^2e^{(2r+\sigma^2)\tau}$ です。支払額を $K$ で割ってから割り引くため

$$
v=\frac{e^{-r\tau}}{K}s^2e^{(2r+\sigma^2)\tau}
=\frac{s^2}{K}e^{(r+\sigma^2)\tau}.
$$

モーメントの指数は $2r+\sigma^2$、**価格**の指数は $r+\sigma^2$ であり、差の $r$ は割引です。
<!-- solution-end -->

<a id="ex-u3-17-a5"></a>
### U3-17-A5：終端の連続性を壊す支払
- Level: A

$g(s)=\mathbf1_{\{s>K\}}$、$K>0$ について、上の存在定理のどの仮定が失われるか述べ、$s=K$ で $\tau\downarrow0$ の価格極限を求めよ。

<!-- solution-start -->
**詳細解答**：$g$ は有界で多項式成長条件は満たしますが、$s=K$ で不連続です。$S_T^{t,K}>K$ は $a\tau+\sigma\sqrt{\tau}Z>0$ と同値なので

$$
v(t,K)=e^{-r\tau}Q\!\left(Z>-\frac{a\sqrt{\tau}}{\sigma}\right)
=e^{-r\tau}\Phi(a\sqrt{\tau}/\sigma)
\longrightarrow\tfrac12,
\quad a=r-\sigma^2/2.
$$

他方、厳密な不等号で定義した $g(K)=0$ です。したがって $t=T$ への連続延長を主張できない原因は満期支払の不連続性です。
<!-- solution-end -->

<a id="ex-u3-17-b1"></a>
### U3-17-B1：一般べき乗の価格と PDE
- Level: B

整数 $n\ge2$、$g(s)=s^n/K^{n-1}$、$K>0$ とする。割引期待値価格を求め、PDE・終端条件・デルタを検算せよ。

<!-- solution-start -->
**詳細解答**：[次数 $n$ の GBM モーメント](../U3-14/index.md#prop-u3-14-moments)は $E_Q S_T^n=s^ne^{(nr+n(n-1)\sigma^2/2)\tau}$ なので、割引後の指数を

$$
\lambda_n=(n-1)r+\frac{n(n-1)}2\sigma^2
$$

と置けば $v=s^n e^{\lambda_n\tau}/K^{n-1}$ です。時間・株価で微分すると

$$
v_t=-\lambda_nv,\quad v_s=\frac{n}{s}v,\quad
v_{ss}=\frac{n(n-1)}{s^2}v.
$$

よって PDE 左辺を $v$ で割ると

$$
-\lambda_n+\tfrac12\sigma^2n(n-1)+rn-r
=-(n-1)r-\tfrac12n(n-1)\sigma^2
+\tfrac12n(n-1)\sigma^2+(n-1)r=0.
$$

$t=T$ では指数1で $v(T,s)=g(s)$、デルタ保有量は $nv/s$ 株です。$s>0$、有限 $T$ ではデルタに多項式成長上界があり、[自己金融複製定理](../U3-16/index.md#thm-u3-16-bsm-replication)の条件を満たします。
<!-- solution-end -->

<a id="ex-u3-17-b2"></a>
### U3-17-B2：局所マルチンゲールと一意性
- Level: B

同じ終端値を持つ二つの多項式成長する BSM 古典解の差 $w$ について、割引過程のドリフトを求めよ。なぜ局所マルチンゲールというだけで $w(t,s)=0$ と結論してはいけないか述べ、今回使える追加条件を示せ。

<!-- solution-start -->
**詳細解答**：差 $w$ も $w_t+\mathcal L^Qw-rw=0$、$w(T,s)=0$ です。[Itô 公式](../../../解析系/STO/STO7/index.md#thm-sto7-ito-process-formula)と割引因子の積を微分すると

$$
d(e^{-r(u-t)}w(u,S_u))
=e^{-r(u-t)}[(w_u+\mathcal L^Qw-rw)du
+\sigma S_uw_s\,dW_u^Q].
$$

PDE によりドリフトは0ですが、局所マルチンゲールが必ず真のマルチンゲールになるわけではありません。ここでは $|w(u,z)|\le C(1+z^m)$ と有限期間 GBM の最大値の全正モーメント有限性から

$$
E_Q\sup_{t\le u\le T}|e^{-r(u-t)}w(u,S_u)|^p<\infty
\qquad(p>1)
$$

が成立します。停止過程が一様可積分なので期待値を保ったまま局所化を解除でき、終端まで連続に延長して $w(t,s)=E_Q[e^{-r\tau}w(T,S_T)]=0$ です。
<!-- solution-end -->

<a id="ex-u3-17-b3"></a>
### U3-17-B3：途中の現金流を組み込む
- Level: B

満期の追加支払が0、満期まで毎年 $c$ 円を連続受取する契約について、$r\ne0$ と $r=0$ の価格を計算し、非斉次 PDE の $+c$ の符号を確かめよ。

<!-- solution-start -->
**詳細解答**：各時点の $c\,du$ 円は現在時点へ $e^{-r(u-t)}$ 倍するので

$$
v=c\int_t^T e^{-r(u-t)}du
=c\int_0^\tau e^{-rz}dz.
$$

$r\ne0$ なら積分は $c(1-e^{-r\tau})/r$、$r=0$ なら $c\tau$ です。いずれも株価微分は0です。$r\ne0$ の時間微分は $v_t=-ce^{-r\tau}$ なので

$$
v_t-rv+c=-ce^{-r\tau}-c(1-e^{-r\tau})+c=0.
$$

$r=0$ の場合も $v_t=-c$ なので $v_t+c=0$。受取 $c>0$ は価値を増やすため、PDE では $+c$ が適切です。
<!-- solution-end -->

<a id="ex-u3-17-b4"></a>
### U3-17-B4：どの仮定が必要か
- Level: B

連続でないデジタル支払と、$s\downarrow0$ で $g(s)=1/s$ となる連続支払を比較せよ。それぞれ存在定理のどの仮定に反するか、また期待値自体が有限かを確認せよ。

<!-- solution-start -->
**詳細解答**：デジタル支払は有界なので成長上界は満たしますが、$K$ で連続性を失います。期待値は確率を割り引くだけなので有限で、$s=K$ の終端連続性が破れます。

$g(s)=1/s$ は $s>0$ 上で連続ですが、$s\downarrow0$ で発散するため $C(1+s^m)$ の一様な上界を持ちません。それでも GBM の負一次モーメントは有限です。[実数モーメント](../U3-14/index.md#prop-u3-14-moments)で $p=-1$ とすると

$$
E_Q[S_T^{-1}]=s^{-1}e^{(-r+\sigma^2)\tau},
\quad
v(t,s)=s^{-1}e^{(-2r+\sigma^2)\tau}.
$$

従って期待値有限性は十分でなく、本講の**一律の成長クラスでの定理の適用条件**と区別します。負の次数まで含む別クラスでは改めて存在・一意性を証明できます。
<!-- solution-end -->

<a id="ex-u3-17-c1"></a>
### U3-17-C1：二つの経路で評価・複製・測度を検算する
- Level: C

$g(s)=(s-K)^2/K$、$K>0$ とする。

1. $Q$ 下の割引期待値を三つのモーメントに分けて求めよ。
2. その価格の PDE、終端条件、デルタ $\Delta$、預金保有単位 $\psi$ を検算せよ（$B_t=e^{rt}$）。
3. $P$ 下の株価ドリフトが $\mu$ のとき、単純な $P$ 下の割引期待値と比較し、なぜ $Q$ と区別すべきか説明せよ。
4. $s=K=100$ 円、$r=0.03$ 年$^{-1}$、$\sigma=0.20$ 年$^{-1/2}$、$\tau=1$ 年で価格とデルタを求めよ。

<!-- solution-start -->
**詳細解答**：

**（1）期待値。** 満期支払を $g(S_T)=S_T^2/K-2S_T+K$ と展開します。[GBM モーメント公式](../U3-14/index.md#prop-u3-14-moments)に指数 $2,1,0$ を順に適用すると

$$
\begin{aligned}
v(t,s)
&=e^{-r\tau}\left(\frac{s^2}{K}e^{(2r+\sigma^2)\tau}
-2se^{r\tau}+K\right)\\
&=\frac{s^2}{K}e^{(r+\sigma^2)\tau}-2s+Ke^{-r\tau}.
\end{aligned}
$$

**（2）PDE・デルタ・預金。** $A=s^2e^{(r+\sigma^2)\tau}/K$、$D=Ke^{-r\tau}$ と置くと $v=A-2s+D$ です。微分を独立に行うと

$$
v_t=-(r+\sigma^2)A+rD,\quad
v_s=\frac{2A}{s}-2,\quad
v_{ss}=\frac{2A}{s^2}.
$$

従って PDE 左辺は

$$
\begin{aligned}
&[-(r+\sigma^2)A+rD]+\sigma^2A
+rs(2A/s-2)-r(A-2s+D)\\
&=\bigl[-(r+\sigma^2)+\sigma^2+2r-r\bigr]A
+(r-r)D+(-2rs+2rs)=0.
\end{aligned}
$$

$t=T$ で $A=s^2/K,D=K$ より $v(T,s)=s^2/K-2s+K=g(s)$。デルタと預金単位は[自己金融複製の保有量](../U3-16/index.md#thm-u3-16-bsm-replication)から

$$
\Delta=\frac{2A}{s}-2,\qquad
\psi=\frac{v-s\Delta}{B_t}=\frac{D-A}{B_t}.
$$

これらは滑らかで多項式成長し、複製定理の適用条件を満たします。

**（3）測度の違い。** 実確率 $P$ 下では $E_P S_T=se^{\mu\tau}$、$E_P S_T^2=s^2e^{(2\mu+\sigma^2)\tau}$ なので

$$
e^{-r\tau}E_Pg(S_T)
=\frac{s^2}{K}e^{(2\mu+\sigma^2-r)\tau}
-2se^{(\mu-r)\tau}+Ke^{-r\tau}.
$$

これは一般に（1）の式とは等しくありません。無裁定複製価格は $Q$ のもとで決まり、現実の平均収益率 $\mu$ は損益予測のためのパラメータです。

**（4）数値。** $A=100e^{0.07}\approx107.2508$、$D=100e^{-0.03}\approx97.0446$ だから

$$
v(0,100)=A-200+D\approx4.2954\text{ 円},\qquad
\Delta(0,100)=2e^{0.07}-2\approx0.1450\text{ 株}.
$$

満期支払 $g(S_T)=(S_T-K)^2/K\ge0$ と、正の現在価格が整合します。預金単位は $B_0=1$ のため $\psi_0=D-A\approx-10.2063$（円を初期預金価値1円で割った単位）です。株式価値 $100\Delta_0\approx14.5016$ 円と預金保有の和が約 $4.2954$ 円に戻ります。
<!-- solution-end -->

---

**本講の到達点**：定数係数・無配当 GBM の連続で多項式成長する終端ペイオフについて、期待値の存在だけでなく正則性、BSM PDE、終端連続性、一意性まで示しました。複製価格と期待値価格が一致することは、複製可能性の仮定を吟味した上で判断します。次講 U3-18 では、折れ曲がりのある call/put の正規積分を実際に閉形式まで計算します。
