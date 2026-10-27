# GR44 宇宙論的地平線とde Sitter

<!-- definition-example-audit: strict -->

[GR43の動径光路](../GR43/index.md#prop-gr43-null-path)では、光が共動座標で進める距離は宇宙時間そのものではなく $\int d\tau/a(\tau)$ で決まることを確かめました。では、どれほど昔に出た光でも今ここへ届くのでしょうか。今ここから発した信号は、どれほど遠い銀河にもいつか届くのでしょうか。この二つは別の問いです。

本章では **過去から届く範囲**、**未来へ信号が届く範囲**、**その時刻の膨張率が定める長さ**を区別します。積分の収束で地平線を判定し、冪乗膨張とde Sitter宇宙を計算します。最後にde Sitterの膨張座標を静的座標へ変換し、地平線が座標表示の見かけだけではないことを確認します。

計量の符号規約は $(-,+,+,+)$、光速は $c=1$ とします。宇宙時間を $\tau$ と呼び、正の尺度因子は開区間 $(\tau_i,\tau_f)$ 上で必要な回数だけ微分可能とします。膨張率と時間微分の記法は

$$
H(\tau)=\frac{\dot a(\tau)}{a(\tau)},\qquad \dot a=\frac{da}{d\tau}
$$

です。光信号は未来向きの光的曲線をたどるものとし、障害物・吸収は考えません。

**地平線の大域判定はまず $k=0$ の非コンパクトな平坦空間切片**で行います。$k=-1$ の単連結双曲切片も動径計算は同じですが、$k=+1$ の閉じた空間では後述の注意が必要です。

## 1. 光の45度線と、宇宙の時間区間

[GR41のFLRW計量](../GR41/index.md#def-gr41-flrw)を平坦な球座標で書くと

$$
ds^2=-d\tau^2+a(\tau)^2(d\chi^2+\chi^2d\Omega^2),
\qquad \chi\ge0.
$$

ここで $d\Omega^2=d\theta^2+\sin^2\theta\,d\phi^2$ です。[GR43の共形時間](../GR43/index.md#prop-gr43-null-path)の加法定数を一つ選んで

$$
\eta(\tau)=\int_{\tau_*}^{\tau}\frac{ds}{a(s)},\qquad
ds^2=a(\tau)^2(-d\eta^2+d\chi^2+\chi^2d\Omega^2)
$$

と置きます。$a>0$ なので $\eta$ は単調増加します。動径の光線は $d\chi/d\eta=\pm1$、すなわち $(\eta,\chi)$ 図では45度の線です。共形因子 $a^2$ は光円錐を変えません。これは[GR28で使った共形的な因果構造の読み方](../GR28/index.md#prop-gr28-null-rescaling)と同じ原理です。

重要なのは、宇宙時間が無限に続いていても、共形時間の幅が有限とは限らず、その逆もあることです。両端の共形時間を広義積分で

$$
\eta_i=\lim_{\tau\downarrow\tau_i}\eta(\tau),
\qquad
\eta_f=\lim_{\tau\uparrow\tau_f}\eta(\tau)
$$

と表します。値は $\pm\infty$ でもかまいません。$\eta_i,\eta_f$ は座標の範囲を述べる記号であり、境界が物理的特異点だという意味はまだ含みません。

## 2. 過去から届いた光と、未来に届く光

過去方向の問いから始めます。時刻 $\tau$ の中心観測者 $\chi=0$ が受け取れる光が、宇宙の過去端 $\tau_i$ に近づける限界の共動距離を考えます。過去端に物理的な初期境界がある場合、これが粒子地平線です。座標パッチが途中で終わるだけなら、その結果を時空全体の初期境界と取り違えません。

<a id="def-gr44-particle-horizon"></a>

<!-- formal-statement-start -->
> **定義（FLRWの粒子地平線）**
> 空間切片が非コンパクトな平坦FLRW時空 $(\tau_i,\tau_f)\times\mathbb R^3$ と、共動観測者 $\chi=0$ を考える。$\tau_i$ は考えている時空領域の過去端とする。時刻 $\tau$ の**粒子地平線の共動半径**を、広義積分が有限のとき

$$
\chi_{\mathrm p}(\tau)=\int_{\tau_i}^{\tau}\frac{ds}{a(s)}
=\eta(\tau)-\eta_i
$$

> と定め、同じ時刻面での**固有半径**を $D_{\mathrm p}(\tau)=a(\tau)\chi_{\mathrm p}(\tau)$ とする。積分が発散する場合、有限半径の粒子地平線はない。過去端がさらに延長可能な座標境界なら、この定義はその領域に相対的である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr44-particle-horizon -->
**定義の確認**：$a(\tau)=A\sqrt{\tau}$、$A>0$、$\tau\in(0,\infty)$、$\chi=0$ とします。$a>0$ で切片は $\mathbb R^3$、初期端は $\tau_i=0$ です。$\int_0^\tau ds/(A\sqrt{s})=2\sqrt{\tau}/A$ は有限なので $\chi_{\mathrm p}=2\sqrt{\tau}/A$、$D_{\mathrm p}=A\sqrt{\tau}\,(2\sqrt{\tau}/A)=2\tau$ です。**共動半径にその時刻の尺度因子を掛ける**理由は、時刻一定の動径線分の計量が $dl=a(\tau)d\chi$ だからです。この模型の初期端を越えた延長可能性は別途調べる必要があります。
<!-- definition-example-end -->

次に、時刻 $\tau$ の位置 $\chi>0$ で発した内向きの光が、中心の共動観測者の生涯のうちに受信され得るかを問います。宇宙論的事象地平線は「いま見える範囲」ではなく**未来の観測可能性の境界**です。ここでは中心観測者が $\tau\to+\infty$ まで存在し、$\tau_f=+\infty$ であると仮定します。

<a id="def-gr44-event-horizon"></a>

<!-- formal-statement-start -->
> **定義（FLRWの宇宙論的事象地平線）**
> 空間切片が $\mathbb R^3$ の平坦FLRW時空で、未来まで存在する共動観測者 $\gamma(\tau)=(\tau,0)$、$\tau\in(\tau_i,\infty)$ を取る。$\gamma$ の未来全体へ信号を届け得る点の集合、すなわち $\gamma$ の**因果的過去**の境界を、この観測者の**宇宙論的事象地平線**という。時刻 $\tau$ の共動半径が有限なら

$$
\chi_{\mathrm e}(\tau)=\int_\tau^\infty\frac{ds}{a(s)}
=\eta_f-\eta(\tau),\qquad
D_{\mathrm e}(\tau)=a(\tau)\chi_{\mathrm e}(\tau)
$$

> と表す。積分が発散するなら、この観測者に有限半径の宇宙論的事象地平線はない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr44-event-horizon -->
**定義の確認**：$a(\tau)=A\tau^2$、$A>0$、$\tau>0$ では $\int_\tau^\infty ds/(As^2)=1/(A\tau)$ が有限です。内向きの光が進める最大共動距離は $\chi_{\mathrm e}=1/(A\tau)$、時刻 $\tau$ の固有半径は $D_{\mathrm e}=A\tau^2/(A\tau)=\tau$ です。$\chi>\chi_{\mathrm e}$ からの信号は受信できません。逆に $0<\chi<\chi_{\mathrm e}$ なら、積分 $\int_\tau^{\tau_r}ds/a(s)$ が $\chi$ に達する有限の $\tau_r$ が存在します。
<!-- definition-example-end -->

この二つの積分は、過去端から現在までと、現在から未来端までを積分する点が違います。図で同じ45度線に見えても、どちらの共形時間端へ向かうかが異なります。

<a id="prop-gr44-integral-criterion"></a>

<!-- formal-statement-start -->
> **命題（共形時間積分による地平線判定）**
> $a\in C^1((\tau_i,\infty))$ は正、空間切片は $\mathbb R^3$、中心観測者は全未来で共動し続けるとする。動径光信号について、時刻 $\tau$ の有限な粒子地平線が存在するための条件は $\int_{\tau_i}^{\tau}ds/a(s)<\infty$、有限な宇宙論的事象地平線が存在するための条件は $\int_\tau^\infty ds/a(s)<\infty$ である。後者が有限なら $0<\chi<\chi_{\mathrm e}(\tau)$ から出た内向き信号は有限の宇宙時間に中心へ届き、$\chi>\chi_{\mathrm e}(\tau)$ からは届かない。
<!-- formal-statement-end -->

### 証明の見取り図

光は共形時間1だけ進むと共動動径距離1だけ進みます。過去向きには初期端までの共形時間の幅、未来向きには未来端までの幅を測れば、届く範囲の境界が分かります。等号上の光は未来の有限時刻でなく境界の極限に沿います。

<!-- proof-start -->
### 証明

[GR43の光路積分](../GR43/index.md#prop-gr43-null-path)で、$\tau_s$ に共動半径 $\chi_s$ から内向きに出た光の位置は

$$
\chi(\tau_r)=\chi_s-\int_{\tau_s}^{\tau_r}\frac{ds}{a(s)}.
$$

$a>0$ より右辺の積分は $\tau_r$ に関して連続かつ単調増加です。時刻 $\tau_s$ から未来無限遠までの上限値を $L=\int_{\tau_s}^\infty ds/a(s)$ とすると、$0<\chi_s<L$ では中間値の定理により有限 $\tau_r$ で積分が $\chi_s$ に等しくなります。$\chi_s>L$ では任意の有限 $\tau_r$ で積分が不足します。$L<\infty$ で $\chi_s=L$ なら各有限 $\tau_r$ で積分は $L$ 未満なので、光は受信者へ有限時刻に届きません。これが未来の因果的過去の境界です。

過去方向については同じ等式の始点 $\tau_s$ を $\tau_i$ に近づけます。固定した $\tau$ までの可達な共動半径の上限が $\int_{\tau_i}^{\tau}ds/a(s)$ であり、有限なら粒子地平線の半径、無限なら有限半径の境界はありません。どちらも平坦空間切片で光線が一度だけ中心へ向かうことを使っています。$\square$
<!-- proof-end -->

**空間の大域形状への注意**：$k=+1$ の3球面のようにコンパクトな切片では、測地極座標の $\chi$ は一つの経路の長さで、対蹠点 $\chi=\pi$ の先をそのまま「別の空間点」とは読めません。$\eta-\eta_i\ge\pi$ なら、単純な「球半径」表示は空間全体を既に覆い得ます。また、未来が有限宇宙時間で特異点に終わる模型では $\int_\tau^{\tau_f}ds/a$ を計算できても、本節の「無限の未来まで存在する観測者」の事象地平線定義を機械的に適用しません。真の時空の端か座標パッチの端かは、[GR28の境界の判定](../GR28/index.md#prop-gr28-boundary-classification)と同じく別問題です。

## 3. Hubble半径は地平線ではない

宇宙膨張の瞬間的な速さを測る[GR42のHubble率](../GR42/index.md#def-gr42-hubble-fluid)からも長さを作れます。ただし、これは未来や過去全体を積分せず、現在の微分係数だけを使う量です。

<a id="def-gr44-hubble-radius"></a>

<!-- formal-statement-start -->
> **定義（Hubble半径）**
> FLRW時空のある時刻で $H(\tau)=\dot a/a\ne0$ のとき、**Hubble半径**を $D_H(\tau)=1/|H(\tau)|$、対応する共動長を $\chi_H(\tau)=1/(a(\tau)|H(\tau)|)$ とする。$H=0$ の時刻では有限のHubble半径を定めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gr44-hubble-radius -->
**定義の確認**：$a(\tau)=A\tau^{2/3}$、$\tau>0$ なら $H=(2/3)\tau^{-1}>0$ だから $D_H=3\tau/2$ です。平坦空間切片では、共動分離 $\chi$ の同時刻固有距離 $D=a\chi$ は $\dot D=HD$ を満たします。$D=D_H$ に置けば $\dot D=1$、すなわち膨張による距離増大率が $c=1$ と等しくなる長さです。しかし、この関係だけではその光信号が将来受信されないとはいえません。
<!-- definition-example-end -->

実際、中心へ向かう光について $\dot\chi=-1/a$ を距離 $D=a\chi$ に代入すると $\dot D=HD-1$ です。$HD>1$ の間は中心との固有距離がいったん増えますが、その後 $H$ や $D$ が変われば内側へ転じることがあります。

<a id="prop-gr44-horizon-evolution"></a>

<!-- formal-statement-start -->
> **命題（地平線固有距離の時間発展）**
> 平坦FLRW時空で $a\in C^1$ は正とする。粒子地平線の積分が有限なら $D_{\mathrm p}=a\int_{\tau_i}^\tau ds/a(s)$ は

$$
\boxed{\dot D_{\mathrm p}=HD_{\mathrm p}+1}
$$

> を満たす。未来無限遠まで定義された模型で事象地平線の積分が有限なら $D_{\mathrm e}=a\int_\tau^\infty ds/a(s)$ は

$$
\boxed{\dot D_{\mathrm e}=HD_{\mathrm e}-1}
$$

> を満たす。いずれも時刻 $\tau$ での同時刻固有距離に関する式であり、局所観測者が測る光速が1からずれるという主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

どちらも $D=a\chi$ を微分します。過去から積分すると上端の微分が $+1/a$、未来へ積分すると下端の微分が $-1/a$ を生みます。

<!-- proof-start -->
### 証明

$a>0$ で $1/a$ は連続です。[FLRWの粒子地平線](#def-gr44-particle-horizon)の定義にある積分について微積分学の基本定理から

$$
\frac{d\chi_{\mathrm p}}{d\tau}=\frac1a,\qquad
\dot D_{\mathrm p}=\dot a\chi_{\mathrm p}+a\frac1a
=HD_{\mathrm p}+1.
$$

同様に[FLRWの宇宙論的事象地平線](#def-gr44-event-horizon)の未来積分が収束するなら、任意の小さい $\epsilon$ に対し

$$
\chi_{\mathrm e}(\tau+\epsilon)-\chi_{\mathrm e}(\tau)
=-\int_\tau^{\tau+\epsilon}\frac{ds}{a(s)}.
$$

$\epsilon$ で割って $\epsilon\to0$ とすると $\dot\chi_{\mathrm e}=-1/a$。従って

$$
\dot D_{\mathrm e}=\dot a\chi_{\mathrm e}-1=HD_{\mathrm e}-1.
$$

積分の収束は端点での定義を保証するために使い、微分は有限区間の差の商で行いました。$\square$
<!-- proof-end -->

例えば将来 $H$ が変わる場合、$D_{\mathrm e}=D_H$ と決め打ちすると $\dot D_{\mathrm e}=0$ となってしまい、一般の事象地平線の変化を再現できません。$H>0$ のとき $\chi_H=1/\dot a$ ですから、$\dot\chi_H=-\ddot a/\dot a^2$ となり、加速膨張 $\ddot a>0$ で共動Hubble半径は減少します。**減少することと、未来積分が有限になることは異なる条件**です。

## 4. 冪乗宇宙で三つの長さを見比べる

粒子地平線は過去端での積分、事象地平線は未来端での積分なので、同じ模型に両方あるとは限りません。まず平坦な冪乗膨張 $a=A\tau^p$、$A>0$、$p>0$、$\tau\in(0,\infty)$ を使います。これは幾何学的な模型であり、物質の種類を指定するときは別途[GR42の流体スケーリング](../GR42/index.md#prop-gr42-fluid-continuity)と照合します。

<a id="prop-gr44-power-law"></a>

<!-- formal-statement-start -->
> **命題（冪乗膨張の地平線とHubble半径）**
> 平坦FLRW時空で $a(\tau)=A\tau^p$、$A>0$、$p>0$、$\tau\in(0,\infty)$ とする。粒子地平線が存在するのは $0<p<1$ の場合に限り、宇宙論的事象地平線が存在するのは $p>1$ の場合に限る。それぞれの固有半径とHubble半径は

$$
\boxed{D_{\mathrm p}=\frac{\tau}{1-p}\quad(0<p<1),\qquad
D_{\mathrm e}=\frac{\tau}{p-1}\quad(p>1),\qquad
D_H=\frac{\tau}{p}\quad(p>0)}
$$

> である。
<!-- formal-statement-end -->

### 証明の見取り図

同じ $s^{-p}$ を、積分の下端 $s\downarrow0$ と上端 $s\uparrow\infty$ で別々に検査します。$p=1$ のときは対数が両端で発散するため、境界を含めてはいけません。

<!-- proof-start -->
### 証明

[地平線積分判定](#prop-gr44-integral-criterion)へ $1/a=1/(As^p)$ を代入します。$p\ne1$ なら

$$
\int_\epsilon^\tau\frac{ds}{As^p}
=\frac{\tau^{1-p}-\epsilon^{1-p}}{A(1-p)}.
$$

$\epsilon\downarrow0$ で右辺が有限なのは $1-p>0$ のときだけで、その値は $\tau^{1-p}/[A(1-p)]$ です。$a=A\tau^p$ を掛ければ $D_{\mathrm p}=\tau/(1-p)$。同様に

$$
\int_\tau^L\frac{ds}{As^p}
=\frac{L^{1-p}-\tau^{1-p}}{A(1-p)}.
$$

$L\uparrow\infty$ で収束するのは $1-p<0$、すなわち $p>1$ のときだけです。その値は $\tau^{1-p}/[A(p-1)]$、従って $D_{\mathrm e}=\tau/(p-1)$ です。$p=1$ なら両方の原始関数が $(\log s)/A$ なので両端で発散します。

最後に $H=(Ap\tau^{p-1})/(A\tau^p)=p/\tau$ から $D_H=\tau/p$ です。$\square$
<!-- proof-end -->

| 膨張の例 | 粒子地平線 $D_{\mathrm p}$ | 事象地平線 $D_{\mathrm e}$ | Hubble半径 $D_H$ |
| --- | --- | --- | --- |
| $p=1/2$（放射型） | $2\tau$ | なし | $2\tau$ |
| $p=2/3$（塵型） | $3\tau$ | なし | $3\tau/2$ |
| $p=1$（等速の尺度因子） | なし | なし | $\tau$ |
| $p=2$（加速型） | なし | $\tau$ | $\tau/2$ |

最初の行では偶然 $D_{\mathrm p}=D_H$ ですが、塵型では一致しません。最後の行も $D_{\mathrm e}=2D_H$ です。二つの半径が一例で一致したからといって、それらを同じ概念にしてはいけません。

さらに、**永続的な加速でも未来積分が発散する例**があります。定数 $\tau_*>0$ を取り、$\tau>e\tau_*$ で $a(\tau)=\tau\log(\tau/\tau_*)$ とすると

$$
\dot a=\log(\tau/\tau_*)+1>0,\qquad
\ddot a=\frac1\tau>0.
$$

しかし $u=\log(s/\tau_*)$ と置換すれば

$$
\int_\tau^L\frac{ds}{s\log(s/\tau_*)}
=\int_{\log(\tau/\tau_*)}^{\log(L/\tau_*)}\frac{du}{u}
=\log\frac{\log(L/\tau_*)}{\log(\tau/\tau_*)}
\longrightarrow\infty.
$$

よって未来に向けて加速が続いていても有限な宇宙論的事象地平線はありません。未来全体の積分と「現在 $\ddot a>0$」は論理的に別です。

## 5. de Sitterで未来地平線を計算する

[GR42のFriedmann方程式](../GR42/index.md#thm-gr42-friedmann)に、物質のない $\rho=p=0$、平坦空間 $k=0$、正の宇宙項 $\Lambda>0$ を入れると

$$
H^2=\frac{\Lambda}{3},\qquad \frac{\ddot a}{a}=\frac{\Lambda}{3}.
$$

膨張する枝を選び $H_*=\sqrt{\Lambda/3}>0$ と定数で置きます。宇宙時間全体 $\tau\in\mathbb R$ に対して $a(\tau)=a_*e^{H_*(\tau-\tau_*)}$（$a_*>0$）が解です。これがde Sitter時空の**平坦FLRW表示（膨張パッチ）**です。平坦パッチという語は、空間切片の曲率が零であることを指し、四次元時空が平坦だという意味ではありません。

<a id="prop-gr44-de-sitter"></a>

<!-- formal-statement-start -->
> **命題（平坦de Sitterの曲率と共形時間）**
> $k=0$、$\rho=p=0$、$\Lambda=3H_*^2>0$、$\tau\in\mathbb R$ とし、$a(\tau)=a_*e^{H_*(\tau-\tau_*)}$ を取る。この平坦FLRW解は $R_{\mu\nu}=3H_*^2g_{\mu\nu}$、$\mathcal R=12H_*^2$ を満たす。ここで $\mathcal R$ はRicciスカラーであり、後節の面積半径 $R$ と区別する。未来端で $\eta_f=0$ となる共形時間は

$$
\boxed{\eta(\tau)=-\frac1{a(\tau)H_*}},\qquad -\infty<\eta<0
$$

> である。平坦パッチ内の共動原点には粒子地平線はなく、事象地平線は

$$
\boxed{\chi_{\mathrm e}(\tau)=\frac1{a(\tau)H_*},
\qquad D_{\mathrm e}=\frac1{H_*}=D_H}
$$

> となる。
<!-- formal-statement-end -->

### 証明の見取り図

指数関数を微分してFriedmann方程式とRicciの式へ代入します。$1/a$ は未来へ積分すると有限ですが、過去無限遠へは発散します。$D_{\mathrm e}=D_H$ の一致は $H_*$ が一定というこの模型の性質です。

<!-- proof-start -->
### 証明

$\dot a=H_*a,\ddot a=H_*^2a,\dot H=0$ です。[GR42のRicci成分](../GR42/index.md#prop-gr42-flrw-curvature)へ $k=0$ を代入すると

$$
R_{00}=-3H_*^2=3H_*^2g_{00},\qquad
R_{ij}=3H_*^2h_{ij}=3H_*^2g_{ij},
\qquad \mathcal R=12H_*^2.
$$

Einsteinテンソルは $G_{\mu\nu}=R_{\mu\nu}-\tfrac12\mathcal R g_{\mu\nu}=-3H_*^2g_{\mu\nu}$ なので、$\Lambda=3H_*^2$ の真空方程式 $G_{\mu\nu}+\Lambda g_{\mu\nu}=0$ と一致します。

共形時間の微分を直接確かめると

$$
\frac{d}{d\tau}\left(-\frac1{H_*a}\right)
=\frac{\dot a}{H_*a^2}=\frac1a.
$$

$\tau\to+\infty$ で $a\to\infty$ なので $\eta_f=0$、$\tau\to-\infty$ では $a\to0$ なので $\eta_i=-\infty$ です。従って

$$
\int_{-\infty}^{\tau}\frac{ds}{a(s)}=\infty,\qquad
\int_\tau^\infty\frac{ds}{a(s)}
=\frac1{a(\tau)H_*}.
$$

[地平線判定](#prop-gr44-integral-criterion)によって前者は有限粒子地平線なし、後者は事象地平線ありです。その固有半径は $a/(aH_*)=H_*^{-1}$ で、$H=H_*$ より $D_H=H_*^{-1}$。$\square$
<!-- proof-end -->

たとえば $H_*=2$（選んだ時間単位の逆数）なら、時刻に関係なく $D_{\mathrm e}=1/2$ です。ただし光源が共動していればその座標距離の境界 $\chi_{\mathrm e}=1/(2a)$ は時刻とともに縮みます。時刻 $\tau$ での固有距離と、固定された共動座標を混同しないでください。

ここで「粒子地平線がない」は**平坦膨張パッチについての結果**です。de Sitter全体をこの座標だけで覆うことはできません。真に過去へどこまで延長できるか、また別の切片で初期端をどう読むかは大域的な問いです。「$\tau=-\infty$ に曲率特異点がある」とは述べていません。事実、上で計算した $\mathcal R$ は一定かつ有限です。

## 6. 同じde Sitterを静的座標で見る

尺度因子が指数的に増えるとき、共動していない物体の固有距離 $R=a(\tau)\chi$ を新たな動径座標にします。これを**面積半径**と呼ぶ理由は、球面 $\chi=\mathrm{const}$ の面積が $4\pi a^2\chi^2=4\pi R^2$ となるからです。面積半径の考え方は[GR15の球対称計量](../GR15/index.md#def-gr15-areal-radius)で導入済みです。

平坦de Sitter計量の動径部分は、$dR=H_*R\,d\tau+a\,d\chi$ を使えば

$$
ds^2=-(1-H_*^2R^2)d\tau^2-2H_*R\,d\tau\,dR+dR^2+R^2d\Omega^2
$$

です。交差項 $d\tau\,dR$ があるため、このままでは時刻を固定した観測者の読み方が煩雑です。そこで $R<H_*^{-1}$ に限り、新たな時間 $T$ で交差項を消します。

<a id="thm-gr44-static-patch"></a>

<!-- formal-statement-start -->
> **定理（de Sitterの静的座標と宇宙論的地平線）**
> $\tau\in\mathbb R$、$\chi\ge0$ 上の平坦de Sitter膨張パッチ

$$
ds^2=-d\tau^2+a(\tau)^2(d\chi^2+\chi^2d\Omega^2),
\qquad a(\tau)=a_*e^{H_*(\tau-\tau_*)},\quad H_*>0
$$

> を考える。領域 $0\le R=a\chi<H_*^{-1}$ で

$$
T=\tau-\frac1{2H_*}\log(1-H_*^2R^2),\qquad R=a(\tau)\chi
$$

> と定めると、計量は

$$
\boxed{ds^2=-(1-H_*^2R^2)dT^2
+\frac{dR^2}{1-H_*^2R^2}+R^2d\Omega^2}
$$

> となる。$R=H_*^{-1}$ は原点の共動観測者の未来の宇宙論的事象地平線に一致し、静的座標での $g_{TT}=0$ はその境界の座標的な退化であって曲率の発散ではない。
<!-- formal-statement-end -->

### 証明の見取り図

固有面積半径 $R=a\chi$ を使って動径計量を展開し、$T$ の全微分を代入して混合項を打ち消します。最後に、内向き光線の $R$ の変化を調べて境界の因果的意味を確認します。計量の座標成分が発散しても曲率不変量は有限です。

<!-- proof-start -->
### 証明

$d\chi=(dR-H_*R\,d\tau)/a$ なので

$$
\begin{aligned}
-d\tau^2+a^2d\chi^2
&=-d\tau^2+(dR-H_*R\,d\tau)^2\\
&=-(1-H_*^2R^2)d\tau^2-2H_*R\,d\tau\,dR+dR^2.
\end{aligned}
$$

$f(R)=1-H_*^2R^2>0$ と書きます。与えた $T$ を微分すると

$$
dT=d\tau+\frac{H_*R}{f}\,dR,\qquad
d\tau=dT-\frac{H_*R}{f}\,dR.
$$

代入して係数を一つずつ整理すると、$dT\,dR$ の係数は $2H_*R-2H_*R=0$、$dR^2$ の係数は

$$
-\frac{H_*^2R^2}{f}
+\frac{2H_*^2R^2}{f}+1
=\frac{f+H_*^2R^2}{f}=\frac1f.
$$

従って $ds^2=-f\,dT^2+f^{-1}dR^2+R^2d\Omega^2$ です。$f>0$ の領域では $\partial_T$ が時間的で、$R$ 一定の静的観測者が存在します。

一方、膨張座標で内向き動径光線の $d\chi/d\tau=-1/a$ に対して

$$
\frac{dR}{d\tau}
=\frac{d(a\chi)}{d\tau}
=H_*a\chi+a\frac{d\chi}{d\tau}
=H_*R-1.
$$

$R>H_*^{-1}$ で発した内向きの光は、たとえ内向きであっても原点までの固有距離が増加します。$R=H_*^{-1}$ ではこの式は零で、地平線に沿った光線の $R$ は一定です。これが[事象地平線の積分](#prop-gr44-de-sitter)の固有半径 $1/H_*$ と一致します。また[平坦de Sitterの曲率計算](#prop-gr44-de-sitter)によれば、曲率スカラー $\mathcal R=12H_*^2$ は境界でも有限です。$\square$
<!-- proof-end -->

**座標の名前に注意**：面積半径は $R$、曲率スカラーは $\mathcal R$ と書き分けます。[GR28の共形図での境界分類](../GR28/index.md#prop-gr28-boundary-classification)と同じく、「静的座標が $R=H_*^{-1}$ で終わる」ことと「時空がそこですべて終わる」ことは別です。静的パッチは原点観測者が受信できる因果領域を表し、全de Sitter時空を覆いません。

ここでは地平線の**古典的因果構造**だけを扱いました。表面重力の幾何的定義と計算はGR45、その熱力学的・量子的な意味は後続科目の課題です。

## 7. 演習

### Level A：端点と半径を自分で判定する

<a id="ex-gr44-a01"></a>

### GR44-A01 塵型宇宙の粒子地平線
- Level: A

$k=0$、$a(\tau)=A\tau^{2/3}$、$A>0$、$\tau>0$ について、$\chi_{\mathrm p}$、$D_{\mathrm p}$ と $D_H$ を計算し、同じ量か判定せよ。

<!-- solution-start -->
**詳細解答。** [FLRWの粒子地平線](#def-gr44-particle-horizon)の定義により

$$
\chi_{\mathrm p}=\frac1A\int_0^\tau s^{-2/3}\,ds
=\frac{3\tau^{1/3}}A,
\quad D_{\mathrm p}=A\tau^{2/3}\frac{3\tau^{1/3}}A=3\tau.
$$

他方 $H=\dot a/a=(2/3)/\tau$ なので $D_H=1/H=3\tau/2$。$D_{\mathrm p}=2D_H$ で一致しません。$0$ 付近で $s^{-2/3}$ が可積分なことが地平線の存在条件です。
<!-- solution-end -->

<a id="ex-gr44-a02"></a>

### GR44-A02 加速型宇宙の事象地平線
- Level: A

$a(\tau)=A\tau^2$、$A>0$、$\tau>0$ の事象地平線の共動・固有半径を求め、粒子地平線があるかも答えよ。

<!-- solution-start -->
**詳細解答。** [FLRWの宇宙論的事象地平線](#def-gr44-event-horizon)の定義から

$$
\chi_{\mathrm e}=\frac1A\int_\tau^\infty s^{-2}\,ds
=\frac1{A\tau},\qquad
D_{\mathrm e}=A\tau^2\frac1{A\tau}=\tau.
$$

過去端へは $\int_\epsilon^\tau ds/(As^2)=A^{-1}(1/\epsilon-1/\tau)\to\infty$。よって有限な粒子地平線はありません。同じ式でも積分する端点が異なる点が決定的です。
<!-- solution-end -->

<a id="ex-gr44-a03"></a>

### GR44-A03 対数発散の境界例
- Level: A

$a(\tau)=A\tau$、$A>0$、$\tau>0$ について、粒子地平線・事象地平線の積分を有限の切断端点から書き、両方の存在を判定せよ。

<!-- solution-start -->
**詳細解答。** 過去側は

$$
\int_\epsilon^\tau\frac{ds}{As}
=\frac1A\log\frac{\tau}{\epsilon}\longrightarrow\infty
\quad(\epsilon\downarrow0).
$$

未来側も

$$
\int_\tau^L\frac{ds}{As}
=\frac1A\log\frac L\tau\longrightarrow\infty
\quad(L\uparrow\infty).
$$

したがって[積分判定](#prop-gr44-integral-criterion)により、どちらにも有限半径の地平線はありません。$H=1/\tau$ より $D_H=\tau$ は有限ですが、それは両地平線の存在を意味しません。
<!-- solution-end -->

<a id="ex-gr44-a04"></a>

### GR44-A04 光の固有距離は瞬間的に増えてもよい
- Level: A

膨張中の平坦FLRWで、内向き光線に対し $D=a\chi$ とする。$\dot D=HD-1$ を導き、$D>D_H$ の瞬間の $\dot D$ の符号と、そこから事象地平線の存在を結論してよいかを述べよ。

<!-- solution-start -->
**詳細解答。** 光的条件から $d\chi/d\tau=-1/a$、積の微分から

$$
\dot D=\dot a\chi+a\dot\chi
=\frac{\dot a}{a}(a\chi)-1=HD-1.
$$

$H>0$、$D_H=1/H$ なので $D>D_H$ なら $HD>1$ で $\dot D>0$。しかしこれはその**一時刻**の変化率です。未来に $H$ が減れば光が内側へ転じる場合があり、事象地平線の有無は $\int_\tau^\infty ds/a(s)$ の収束で判定します。
<!-- solution-end -->

<a id="ex-gr44-a05"></a>

### GR44-A05 de Sitterの共形時間
- Level: A

$a(\tau)=a_*e^{H_*(\tau-\tau_*)}$、$H_*>0$、$\tau\in\mathbb R$ とする。$\eta_f=0$ の共形時間 $\eta$ を求め、$\eta_i$ と $D_{\mathrm e}$ を計算せよ。

<!-- solution-start -->
**詳細解答。** $\dot a=H_*a$（点は宇宙時間微分）より

$$
\frac{d}{d\tau}\left(-\frac1{H_*a}\right)
=\frac{1}{a}.
$$

従って $\eta=-1/(H_*a)$ が未来端で0となる共形時間です。$\tau\to-\infty$ では $a\to0^+$ なので $\eta_i=-\infty$。未来積分は $0-\eta=1/(H_*a)$ で、これに $a$ を掛けると $D_{\mathrm e}=1/H_*$。初期端までの共形時間幅は無限です。
<!-- solution-end -->

### Level B：異なる判定法と表示をつなぐ

<a id="ex-gr44-b01"></a>

### GR44-B01 地平線の固有半径の微分
- Level: B

$a\in C^1$ は正で、過去・未来の地平線積分がともに有限と仮定する。$\chi_{\mathrm p}$ と $\chi_{\mathrm e}$ を微分して $D_{\mathrm p},D_{\mathrm e}$ の発展式を導け。$\dot D_{\mathrm e}=0$ と $D_{\mathrm e}=D_H$ の関係は $H>0$ のときどうなるか。

<!-- solution-start -->
**詳細解答。** 定積分の端点微分より

$$
\dot\chi_{\mathrm p}=\frac1a,\qquad
\dot\chi_{\mathrm e}=-\frac1a.
$$

$D=a\chi$ と $\dot a=Ha$ を各式に用いると

$$
\dot D_{\mathrm p}=Ha\chi_{\mathrm p}+a/a=HD_{\mathrm p}+1,\qquad
\dot D_{\mathrm e}=Ha\chi_{\mathrm e}-a/a=HD_{\mathrm e}-1.
$$

従って $\dot D_{\mathrm e}=0$ なら $HD_{\mathrm e}=1$。$H>0$ の時刻で $D_{\mathrm e}=1/H=D_H$ です。逆に $D_{\mathrm e}=D_H$ が成立する時刻では $\dot D_{\mathrm e}=0$。これは時刻ごとの関係であり、一般に未来の全時刻での定数性を含意しません。
<!-- solution-end -->

<a id="ex-gr44-b02"></a>

### GR44-B02 加速膨張だが未来地平線がない例
- Level: B

$\tau>\mathrm e\tau_*$、$a(\tau)=\tau\log(\tau/\tau_*)$、$\tau_*>0$ とする。$\dot a>0,\ddot a>0$ を示し、事象地平線積分を置換積分で判定せよ。$\chi_H$ の時間変化の符号も調べよ。

<!-- solution-start -->
**詳細解答。** $\tau/\tau_*>\mathrm e$ なので $\log(\tau/\tau_*)>1$ で、積の微分から

$$
\dot a=\log(\tau/\tau_*)+1>0,\quad
\ddot a=\frac1\tau>0.
$$

$u=\log(s/\tau_*)$ と置くと $du=ds/s$ で、

$$
\int_\tau^L\frac{ds}{a(s)}
=\int_{\log(\tau/\tau_*)}^{\log(L/\tau_*)}\frac{du}{u}
=\log\log(L/\tau_*)-\log\log(\tau/\tau_*)
\to\infty.
$$

従って事象地平線はありません。他方 $aH=\dot a$ より $\chi_H=1/\dot a$、

$$
\dot\chi_H=-\frac{\ddot a}{\dot a^2}
=-\frac{1}{\tau[\log(\tau/\tau_*)+1]^2}<0.
$$

共動Hubble半径が減り続けても未来積分が発散し得る、という反例です。
<!-- solution-end -->

<a id="ex-gr44-b03"></a>

### GR44-B03 静的de Sitter計量への座標変換
- Level: B

平坦de Sitterで $R=a\chi$、$f(R)=1-H_*^2R^2$ とする。$R<H_*^{-1}$ で $T=\tau-(2H_*)^{-1}\log f$ を用いて混合項が消えること、および $dR^2$ の係数が $f^{-1}$ になることを途中式で確認せよ。

<!-- solution-start -->
**詳細解答。** $dR=H_*R\,d\tau+a\,d\chi$ なので、動径計量は

$$
-f\,d\tau^2-2H_*R\,d\tau\,dR+dR^2.
$$

$df=-2H_*^2R\,dR$ より $dT=d\tau+H_*R\,dR/f$、従って $d\tau=dT-H_*R\,dR/f$。代入後の $dT\,dR$ の係数は $2f(H_*R/f)-2H_*R=0$。$dR^2$ の係数は

$$
-f\left(\frac{H_*R}{f}\right)^2
+2H_*R\left(\frac{H_*R}{f}\right)+1
=1+\frac{H_*^2R^2}{f}=\frac1f.
$$

よって $-f\,dT^2+f^{-1}dR^2$ です。$f>0$ が対数を実数として定め、$R=H_*^{-1}$ にはこの座標式をそのまま代入できません。
<!-- solution-end -->

<a id="ex-gr44-b04"></a>

### GR44-B04 de Sitterの真空方程式を二方向から確かめる
- Level: B

$a=a_*e^{H_*\tau}$、$k=0$ とする。Friedmann制約とRicciテンソルを使い、$\Lambda=3H_*^2$ の真空Einstein方程式を検算せよ。$H_*$ を固定したまま $k=+1$ に変更しても同じ $a$ が真空解になるか。

<!-- solution-start -->
**詳細解答。** $H=H_*$、$\dot H=0$ なので[GR42のFriedmann制約](../GR42/index.md#thm-gr42-friedmann)は $H_*^2+0=\Lambda/3$。また[GR42のRicci式](../GR42/index.md#prop-gr42-flrw-curvature)から

$$
R_{00}=-3H_*^2,\quad R_{ij}=3H_*^2h_{ij},\quad
R=12H_*^2.
$$

従って $R_{\mu\nu}=3H_*^2g_{\mu\nu}$、$G_{\mu\nu}=-3H_*^2g_{\mu\nu}$ で、$G_{\mu\nu}+\Lambda g_{\mu\nu}=0$ を満たします。もし $k=+1$ に変更し $a$ をそのままにすると、制約左辺は $H_*^2+1/a^2$ となり $\Lambda/3=H_*^2$ と一致しません。空間曲率の変更は同じ指数解では吸収できません。
<!-- solution-end -->

### Level C：膨張史を接続して因果的到達範囲を計算する

<a id="ex-gr44-c01"></a>

### GR44-C01 塵型宇宙から指数膨張への移行
- Level: C

平坦FLRWの運動学的な模型として、$A>0$、$\tau_0>0$ を用い

$$
a(\tau)=
\begin{cases}
A\tau^{2/3},&0<\tau\le\tau_0,\\
A\tau_0^{2/3}e^{H_*(\tau-\tau_0)},&\tau\ge\tau_0
\end{cases},
\qquad H_*=\frac{2}{3\tau_0}.
$$

この模型は $\tau_0$ で $C^1$ 級につながることを確かめる。次に (1) $\tau_0$ の粒子・事象地平線の固有半径、(2) $\tau>\tau_0$ の両固有半径とHubble半径、(3) $\tau>\tau_0$ において粒子地平線と事象地平線の意味がどう異なるかを計算・説明せよ。接続点で二階微分が不連続なため、物質方程式の滑らかな解であるとは仮定しない。

<!-- solution-start -->
**詳細解答。** 左側の値は $a_-=A\tau_0^{2/3}$、時間微分は $\dot a_-=(2/3)A\tau_0^{-1/3}$。右側の値は $a_+=A\tau_0^{2/3}$、時間微分は $\dot a_+=H_*A\tau_0^{2/3}=(2/3)A\tau_0^{-1/3}$。従って値・一階微分とも連続で $C^1$ です。

(1) $\tau_0$ までの過去積分は

$$
\chi_{\mathrm p}(\tau_0)
=\int_0^{\tau_0}\frac{ds}{As^{2/3}}
=\frac{3\tau_0^{1/3}}A,\qquad
D_{\mathrm p}(\tau_0)=A\tau_0^{2/3}\chi_{\mathrm p}=3\tau_0.
$$

未来積分は指数膨張枝のみを通るので

$$
\chi_{\mathrm e}(\tau_0)
=\frac1{A\tau_0^{2/3}}\int_{\tau_0}^\infty
e^{-H_*(s-\tau_0)}ds
=\frac1{A\tau_0^{2/3}H_*},
\quad D_{\mathrm e}(\tau_0)=\frac1{H_*}=\frac{3\tau_0}{2}.
$$

(2) $\Delta=\tau-\tau_0>0$、$a_0=A\tau_0^{2/3}$ と置くと、過去側は初期時刻から接続点までと、接続点から現在までに分割して

$$
\begin{aligned}
\chi_{\mathrm p}(\tau)
&=\frac{3\tau_0^{1/3}}A
+\frac1{a_0}\int_{\tau_0}^{\tau}e^{-H_*(s-\tau_0)}ds\\
&=\frac1{a_0}\left(3\tau_0+\frac{1-e^{-H_*\Delta}}{H_*}\right).
\end{aligned}
$$

従って

$$
\begin{aligned}
D_{\mathrm p}(\tau)
&=a_0e^{H_*\Delta}\chi_{\mathrm p}(\tau)
=\left(3\tau_0+\frac1{H_*}\right)e^{H_*\Delta}-\frac1{H_*}\\
&=\frac{9\tau_0}{2}e^{H_*\Delta}-\frac{3\tau_0}{2}.
\end{aligned}
$$

未来側は

$$
\chi_{\mathrm e}(\tau)
=\frac{e^{-H_*\Delta}}{a_0H_*},\qquad
D_{\mathrm e}(\tau)=\frac1{H_*}=\frac{3\tau_0}{2},\qquad
D_H(\tau)=\frac1{H_*}=\frac{3\tau_0}{2}.
$$

(3) 粒子地平線は**過去に発した光が今までに届く最大の共動範囲**なので、指数膨張が始まる前の塵型時代の寄与 $3\tau_0$ を引き継ぎ、固有半径は増大します。事象地平線は**今から出た信号が未来の受信者へ届く範囲**なので、$\tau>\tau_0$ の未来の指数膨張だけで決まり、固有半径は一定です。過去と未来を別々に積分することが答えの違いを生みます。接続点で $a''$ は一致せず、この模型が滑らかなEinstein–流体解だとまでは述べていません。
<!-- solution-end -->

## 8. 次に何を区別すべきか

GR43の光の伝播を過去端・未来端まで追うと、三つの半径は次のように分かれます。

- **粒子地平線**：過去端からの $\int ds/a$。既に受信できた情報の限界。
- **宇宙論的事象地平線**：未来端への $\int ds/a$。将来も受信できない領域との境界。
- **Hubble半径**：現在の $H$ の逆数。瞬間的な膨張率の長さで、一般には因果境界ではない。

de Sitterでは事象地平線とHubble半径が一致しますが、これは特殊な一致です。次のGR45では、今見たような地平線のうちKilling場を備える場合に、表面重力をどのように幾何学的に定義するかを学びます。
