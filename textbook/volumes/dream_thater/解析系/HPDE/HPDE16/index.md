# HPDE16 大域Cauchy問題の存在一意性

[HPDE11の局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)によって、初期面の各点では波動方程式を解けるようになりました。[HPDE15の貼り合わせ](../HPDE15/index.md#thm-hpde15-compact-collar)では、解の重なりを一意性で比較できることも示しました。しかし、局所解を有限回つなぐだけでは「任意の未来・過去時刻まで到達できる」という結論になりません。延長時間の幅が次第に零へ縮む可能性を、排除する必要があります。

その障害を取り除く二つの鍵は、**コンパクトなデータからの影響が有限時間帯ではコンパクトな領域に収まること**と、**その領域で高階エネルギーを制御して、有限時刻で滑らかさが失われないこと**です。本章では、これらを局所存在・重なりの一意性に結び付け、コンパクト支持データに対する大域Cauchy定理を完成させます。先進・遅延Green作用素の存在を仮定しません。

## 1. 問題を時空全体で指定する

$(M,g)$ は境界のない、連結した時間向き付き滑らかな大域双曲Lorentz多様体、符号は $(-,+,\ldots,+)$ とします。$E\to M$ は有限ランクの実または複素滑らかなベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ は滑らかな[normally hyperbolic作用素](../HPDE5/index.md#def-hpde5-normally-hyperbolic)です。形式的自己随伴性や正定値で接続と両立する束計量を、定理の**仮定にはしません**。

[HPDE5の一意接続表示](../HPDE5/index.md#thm-hpde5-unique-connection)を使い、$P=-\operatorname{tr}_g(\nabla^P)^2+B$ と書きます。$B$ は滑らかな零次の束自己準同型です。[LORG20の滑らかなCauchy時間分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)から滑らかなCauchy時間関数 $t:M\to\mathbb R$ を選び、$\Sigma_s=t^{-1}(s)$、$\Sigma=\Sigma_0$ とします。後の定理で **先に任意の滑らかな空間的Cauchy面 $\Sigma$ を指定した場合** には、与えられた面を $t^{-1}(0)$ にできるというBernal–Sánchezの強化定理（[原論文](https://arxiv.org/abs/gr-qc/0512095)）を使います。これは「あるCauchy時間分割が存在する」というLORG20の定理だけからは直ちに従わない点です。未来向き単位法線を $N$ と書きます。法線速度は $\nabla_N^Pu$ であり、別の接続に取り替えません。

時空の**コンパクト支持の滑らかな源** $f\in\Gamma_c(M,E)$ と、初期面の**コンパクト支持の滑らかな二つのデータ** $u_0,u_1\in\Gamma_c(\Sigma,E|_\Sigma)$ を与えます。$\Gamma_c$ は滑らかで支持がコンパクトな切断の空間です。空間方向が非コンパクトでも、これらの支持はコンパクトとします。

これまでの局所Cauchy問題と違い、今回は方程式と初期値条件を **時空のすべての点** で満たす滑らかな切断を求めます。

<a id="def-hpde16-global-cauchy"></a>

<!-- formal-statement-start -->
> **定義（大域Cauchy問題）**  
> 上記の $(M,g)$、$\Sigma$、$E$、$P$、$f$、$(u_0,u_1)$ に対して、全時空 $M$ 上の滑らかな切断 $u\in\Gamma(M,E)$ が次を満たすとき、$u$ をこのデータに対する**大域Cauchy解**と呼ぶ。

$$
Pu=f\ \text{on }M,\qquad
u|_\Sigma=u_0,\qquad
\nabla_N^Pu|_\Sigma=u_1.
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde16-global-cauchy -->
**定義の確認**。$M=\mathbb R^{1+1}$、$g=-dt^2+dx^2$、$E=M\times\mathbb R$、$P=\partial_t^2-\partial_x^2$、$\Sigma=\{t=0\}$ とします。$\phi\in C_c^\infty(\mathbb R)$ に対して

$$
u(t,x)=\tfrac12\bigl(\phi(x-t)+\phi(x+t)\bigr)
$$

と置きます。各項はその引数について二回微分したとき $\partial_t^2=\partial_x^2$ なので $Pu=0$。$u(0,x)=\phi(x)$、$\partial_tu(0,x)=\tfrac12(-\phi'(x)+\phi'(x))=0$ です。式はすべての $(t,x)$ で滑らかに定義されており、$f=0$、$(u_0,u_1)=(\phi,0)$ の大域Cauchy解です。
<!-- definition-example-end -->

この例では固定時刻ごとの支持がコンパクトでも、一般に**時空全体の支持がコンパクトではありません**。解の定義域が大域的であることと、解自体が時空コンパクト支持であることは別です。

## 2. コンパクトな影響が有限時間では逃げない

[HPDE10の有限伝播](../HPDE10/index.md#thm-hpde10-finite-propagation)は、解が存在すれば初期データ・源の支持から因果的に到達できない点では解が零になることを示しました。ただし $J^+(K)$ は未来へ無限に広がり得ます。「影響は因果集合内にある」というだけでは係数上界を一度に取れません。

そこで、時刻の上限を固定して因果的な影響の広がりを切り取ります。記号の $J^\pm$ は[因果的未来・過去](../../../幾何系/LORG/LORG6/index.md#def-lorg6-chronological-causal-future)です。

<a id="def-hpde16-finite-shadow"></a>

<!-- formal-statement-start -->
> **定義（有限時間因果影）**  
> $(M,g)$ を大域双曲時空、$t$ を各レベルがCauchy面となる滑らかな時間関数、$K\subset M$ をコンパクト集合とする。$a<b$ に対して

$$
C^+_{K,[a,b]}=J^+(K)\cap t^{-1}([a,b]),
\qquad
C^-_{K,[a,b]}=J^-(K)\cap t^{-1}([a,b])
$$

> を、それぞれ未来・過去の**有限時間因果影**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde16-finite-shadow -->
**定義の確認**。Minkowski平面で $t$ を標準時刻、$K=\{(0,x):|x|\le1\}$、$0\le s\le T$ とします。$(s,x)\in J^+(K)$ であることは、ある $y\in[-1,1]$ に対して $|x-y|\le s$ ということです。これは $|x|\le1+s$ と同値なので

$$
C^+_{K,[0,T]}
=\{(s,x):0\le s\le T,\ |x|\le1+s\}.
$$

この集合は閉かつ有界でコンパクトです。初期集合が一枚の線分であっても未来への影響は広がりますが、**有限の $T$ で切ればコンパクト**になります。
<!-- definition-example-end -->

<a id="lem-hpde16-shadow-compact"></a>

<!-- formal-statement-start -->
> **補題（有限時間因果影のコンパクト性）**  
> $(M,g)$ を境界のない時間向き付き大域双曲時空とし、$t:M\to\mathbb R$ を各レベル $\Sigma_s$ がCauchy超曲面である滑らかなCauchy時間関数とする。任意のコンパクト集合 $K\subset M$ と実数 $a<b$ に対し、$C^\pm_{K,[a,b]}$ はコンパクトである。
<!-- formal-statement-end -->

### なぜCauchy性まで必要なのか

大域双曲性は[因果関係の閉性](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)と因果ダイヤモンドのコンパクト性をもたらします。しかしこの補題では、終点を一つのコンパクト集合に固定していません。必要な追加の理由は、**未来非延長因果曲線はCauchy時間関数のすべての値を通過する**ことです。有限時刻内で無限遠へ逃げる曲線があれば、この性質と矛盾します。

<!-- proof-start -->
### 証明

未来側を示します。まず $J^+(K)$ は閉です。実際、$q_j\in J^+(K)$ が $q_j\to q$ と収束するとき、$q_j$ の因果的過去にある点 $p_j\in K$ を選びます。$K$ のコンパクト性から部分列で $p_j\to p\in K$ とできます。[閉因果関係](../../../幾何系/LORG/LORG16/index.md#lem-lorg16-closed-causal-relation)により $p\le q$、従って $q\in J^+(K)$ です。$t^{-1}([a,b])$ も閉なので、$C^+_{K,[a,b]}$ は閉です。

次に相対コンパクト性を示します。反対に、有限時間因果影から、どのコンパクト集合からも外へ出る点列 $q_j$ を取れるとします。各 $q_j$ を $p_j\in K$ に結ぶ未来向き因果曲線 $\gamma_j$ を選びます。始点は部分列で $p_j\to p\in K$ とできます。終点の時刻は $\max(b,\sup_Kt)$ 以下で、各 $\gamma_j$ に沿って $t$ は増加します。

固定した完備な補助Riemann計量 $h$ で各 $\gamma_j$ を始点から弧長表示します。$p_j$ は収束し $q_j$ は全コンパクト集合から逃げるため、

$
\operatorname{Length}_h(\gamma_j)\ge d_h(p_j,q_j)\longrightarrow\infty.
$

ここで[限界曲線の抽出法](../../../幾何系/LORG/LORG14/index.md#thm-lorg14-limit-curve)と[LORG16の非閉じ込め・コンパクト性の議論](../../../幾何系/LORG/LORG16/index.md#prop-lorg16-curves-compact)を片側区間に用います。始点がコンパクト集合に収まるので、各有限弧長区間で部分列を抽出し、対角部分列から $p$ を始点とする未来因果曲線 $\gamma$ を得ます。もし $\gamma$ が未来端点を持てば、その近くの因果的座標箱を通じて延長でき、局所時間座標の増加と非閉じ込め性に反します。従って $\gamma$ は未来非延長です。

$\gamma$ 上の $t$ は上限 $\max(b,\sup_Kt)$ を越えません。ところが各 $\Sigma_s$ はCauchy面なので、未来非延長因果曲線は任意に大きい $s$ の $\Sigma_s$ に出会うはずです。

矛盾します。

よって $C^+_{K,[a,b]}$ は相対コンパクトであり、既に閉であることからコンパクトです。過去側は因果曲線の向きと $t$ の上下を反転して同様に従います。$\square$
<!-- proof-end -->

**ここで得た利点**。閉区間 $[a,b]$ を固定すれば、影響領域を有限個の局所座標箱で覆えます。その箱の閉包上では計量、接続、$P$ の係数と必要な有限階の微分に上界があります。時空全体の無限時間に共通する上界を仮定しているわけではありません。

## 3. 有限時刻で導関数が発散しない仕組み

局所解を滑らかなまま延長するには、値と一階速度だけでは足りません。新たなスライスで局所存在を繰り返すとき、どの階の導関数も滑らかに保たれることを知る必要があります。

まず[HPDE11の一次対称双曲化](../HPDE11/index.md#prop-hpde11-positive-symmetrizer)で局所的に得られる、一階系のエネルギー計算を確認します。時間 $s$ と空間局所座標 $x^j$ で束とテンソル成分をまとめたベクトル $V$ を考えると、正定値対称化を施した系は

$$
A^0\partial_sV+\sum_{j=1}^n A^j\partial_jV+DV=F
$$

という形です。$A^0$ は正定値Hermite行列、$A^j$ はHermite行列で、係数は滑らかです。実束なら転置対称行列を使います。任意の局所枠に正定値Hermite内積を**補助的に選んで**エネルギーを測ればよく、$P$ が自己随伴である必要はありません。

行列が何を表すか、平坦な直線束で確かめます。$u_{tt}-u_{xx}=f$ に対して $v=u_t$、$w=u_x$、$V=(u,v,w)^\mathsf T$ と置くと

$
\underbrace{I_3}_{A^0}\partial_tV+
\underbrace{\begin{pmatrix}0&0&0\\0&0&-1\\0&-1&0\end{pmatrix}}_{A^1}\partial_xV+
\underbrace{\begin{pmatrix}0&-1&0\\0&0&0\\0&0&0\end{pmatrix}}_{D}V
=\underbrace{\begin{pmatrix}0\\f\\0\end{pmatrix}}_{F}.
$

第一行は $u_t=v$、第二行は $v_t-w_x=f$、第三行は $w_t-v_x=0$ であり、最後は $w=u_x$ と $v=u_t$ の混合微分の交換です。$A^0=I_3$ が正定値、$A^1=(A^1)^\mathsf T$ が対称なので、$V^*A^0V=u^2+u_t^2+u_x^2$ は元の波動解の値と一階微分を測る量になります。一般の束ではこの対応を[HPDE11の正定値対称化](../HPDE11/index.md#prop-hpde11-positive-symmetrizer)で局所枠ごとに作ります。

空間積分に境界項が出ないよう、切断の支持を内部に含むコンパクトな座標領域、またはそのような領域を有限個貼り合わせたコンパクトな台のあるスライスを考えます。局所表示で $A^0$ は有限領域上、一様に正定値です。

<a id="lem-hpde16-bundle-energy"></a>

<!-- formal-statement-start -->
> **補題（コンパクト領域での束値高階評価）**  
> $a<b$ を有限とし、$[a,b]$ 上の滑らかな解 $Pu=f$ の各スライス上の支持が、一つのコンパクトな時空集合 $C$ 内に含まれるとする。$C$ を内部に含む有限個の座標箱で $P$ の係数と必要な階数の導関数が有界であるとする。
>
> 時間分割でスライスを固定したうえで、$C$ の空間射影を含む有限個の座標箱と、それらに従属する滑らかな切断関数 $\chi_i$ を固定する。各 $\chi_i f$ を局所枠・座標で表した $H^m$ ノルムの二乗和を $\|f(s)\|_{H^m_\chi}^2$ と書く（座標箱内のコンパクト支持関数として零延長する）。同じ有限被覆で定める一次還元変数の $H^m$ エネルギーを $Y_m(s)$ とする。このとき任意の整数 $m\ge0$ に対して定数 $c_m$ が選べて、

$
Y_m(s)\le c_m e^{c_m(s-a)}
\left(Y_m(a)+\int_a^s\|f(\tau)\|_{H^m_\chi}^2\,d\tau\right),
\qquad a\le s\le b
$$

> が成り立つ。ここで $Y_m$ は局所一階還元変数の空間 $H^m$ ノルムの二乗和に対応し、特に $u$ の $m+1$ 階までと時間一階微分の $m$ 階までを制御する。定数は $C$、$[a,b]$、係数の有限階上界、$m$ に依存するが解そのものには依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

[HPDE8の束値エネルギー評価](../HPDE8/index.md#prop-hpde8-bundle-energy)と[HPDE9の高階交換子法](../HPDE9/index.md#thm-hpde9-high-energy-estimate)を、有限個の局所枠に適用します。既習のHPDE9の表示はスカラートーラス模型なので、束値・有限被覆へ移すときには、一次還元の正定値行列と局所枠・切断関数で生じる低階項を明示的に数えます。

<!-- proof-start -->
### 証明

**一次エネルギー**。局所枠でのHermite内積を用い、境界項のないコンパクトな支持の場合に

$$
\mathcal E_0(s)=\int_{\Sigma_s}V^*A^0V\,dx
$$

を考えます。一次系に左から $2\operatorname{Re}(V^*\cdot)$ を掛けると、

$$
\begin{aligned}
\partial_s(V^*A^0V)
+\sum_j\partial_j(V^*A^jV)
={}&V^*\left(\partial_sA^0+\sum_j\partial_jA^j-D-D^*\right)V\\
&+2\operatorname{Re}(V^*F).
\end{aligned}
$$

例えば $\partial_j(V^*A^jV)$ の両端の項は $2\operatorname{Re}(V^*A^j\partial_jV)$ にまとまり、$\partial_jA^j$ の項だけ残ります。空間積分で発散項は支持条件から消えます。$A^0$ の正定値性と係数上界、$2|V||F|\le |V|^2+|F|^2$ を使い、

$$
\mathcal E_0'(s)\le C_0\mathcal E_0(s)+C_0\|F(s)\|_{L^2}^2
$$

を得ます。

**高階微分**。空間多重指数 $\alpha$、$|\alpha|\le m$ に対し $V_\alpha=\partial_x^\alpha V$ と置きます。一次系を微分して得る新しい源を $F_\alpha$ とすると、

$$
\begin{aligned}
A^0\partial_s V_\alpha+\sum_j A^j\partial_jV_\alpha+DV_\alpha
={}&\partial^\alpha F\\
&-\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
 \bigl((\partial^\beta A^0)\partial_s\partial^{\alpha-\beta}V
 +(\partial^\beta A^j)\partial_j\partial^{\alpha-\beta}V\bigr)\\
&-\sum_{0<\beta\le\alpha}{\alpha\choose\beta}
 (\partial^\beta D)\partial^{\alpha-\beta}V .
\end{aligned}
$$

第2行にある時間微分は一見すると制御できないように見えます。しかし元の一次系の $A^0$ は可逆なので、

$$
\partial_sW=-(A^0)^{-1}\left(\sum_j A^j\partial_jW+DW-F\right)
$$

を $W=V$ に適用し、空間微分を $|\alpha-\beta|\le m-1$ 回まで行えば、現れる導関数は空間 $m$ 階以下です。係数の微分も $C$ 上で有界なので

$$
\sum_{|\alpha|\le m}\|F_\alpha\|_{L^2}^2
\le C_m\left(\|F\|_{H^m}^2+\|V\|_{H^m}^2\right).
$$

束と複数箱の場合、$V_i=\chi_i V$ に対する局所方程式の新しい源は $\chi_iF+\sum_jA^j(\partial_j\chi_i)V$ です。さらに $\partial^\alpha V_i$ を作ると、$\partial^\beta\chi_i$ と係数・枠変換の微分が積の微分則から現れます。これらの係数は固定した有限被覆の閉包で有界であり、$|\alpha|\le m$ の空間微分だけで支配できます。切断関数の支持を座標箱内部に置くため、外側の境界フラックスは零です。内部で生じた切断関数の交換子は、より大きい箱上の同じ $H^m$ エネルギーにまとめます。

すべての $\alpha$ の一次エネルギーを加えると、ある $C_m$ について

$$
Y_m'(s)\le C_mY_m(s)+C_m\|f(s)\|_{H^m}^2.
$$

元の $P$ の一次還元では $F$ に $f$ の局所成分が現れます。[積分型Grönwall補題](../HPDE8/index.md#lem-hpde8-gronwall)を適用して主張の時間指数因子を伴う不等式を得ます。

$V$ に $u$ の一階空間・時間微分が含まれ、一次還元の拘束は[HPDE11の構成](../HPDE11/index.md#thm-hpde11-local-cauchy)で保存されるため、$Y_m$ は必要な $u$ の高階ノルムを制御します。$\square$
<!-- proof-end -->

**重要な限定**。$C$ がコンパクトであることから係数界を得ました。非コンパクトな $\Sigma$ 上のすべての滑らかなデータについて、同一の $c_m$ を取れるという主張ではありません。そのような一様評価は後のHPDE17で条件を明示して扱います。

## 4. 最大延長時刻が有限だと何が矛盾するか

有限時刻まで解けたとしても、その時刻直前で二階・三階微分が爆発するなら、次のCauchy問題は始められません。そこで前節の評価を、**端点での滑らかなトレース**に変えます。

<a id="lem-hpde16-smooth-endpoint"></a>

<!-- formal-statement-start -->
> **補題（有限端点での滑らかな延長）**  
> $a<b<\infty$ とし、$P$ は前節の滑らかなnormally hyperbolic作用素、$f$ は滑らかとする。$u$ が $a\le t<b$ で滑らかに $Pu=f$ を満たし、その支持がこの時間帯の一つのコンパクト集合 $C$ に含まれるとする。初期面 $\Sigma_a$ 上の二つのCauchyデータも滑らかでコンパクト支持とする。
>
> このとき $t\uparrow b$ で $u$ と $\nabla_N^Pu$ の滑らかなCauchyトレースが存在し、その支持はコンパクトである。これらを初期データとして、$\Sigma_b$ を越える正の短時間帯へ $u$ を滑らかに延長できる。
<!-- formal-statement-end -->

### 証明の見取り図

有限時間帯のコンパクトな支持により、あらゆる高階エネルギーの定数を固定できます。上界だけでは極限の存在は従いませんが、方程式で**時間微分も一段低いSobolevノルムに抑える**と、時刻に関してCauchy列になり、滑らかな極限データが得られます。

<!-- proof-start -->
### 証明

$\Sigma_s$ を[LORG20の分割](../../../幾何系/LORG/LORG20/index.md#thm-lorg20-orthogonal-splitting)で固定した基準面 $\Sigma$ と同一視し、$C$ の空間射影を含むコンパクト集合上の有限個の座標箱を使います。[高階評価](#lem-hpde16-bundle-energy)で、各 $m$ に対して $a\le s<b$ の $Y_m(s)$ が一様有界です。

時間帯の終端 $b$ は有限で $f$ も滑らかなので、右辺の源積分は有限です。

一次還元ベクトル $V$ について $A^0$ の可逆性から

$$
\|\partial_sV(s)\|_{H^{m-1}}
\le C_m\bigl(\|V(s)\|_{H^m}+\|F(s)\|_{H^{m-1}}\bigr),
\qquad m\ge1.
$$

右辺は $s<b$ で一様に有界です。従って $a<s_1<s_2<b$ に対し、微分積分を空間Sobolev空間で行えば

$$
\|V(s_2)-V(s_1)\|_{H^{m-1}}
\le\int_{s_1}^{s_2}\|\partial_sV(\tau)\|_{H^{m-1}}\,d\tau
\le M_m(s_2-s_1).
$$

$s_1,s_2\uparrow b$ で右辺が零になるため、$V(s)$ はすべての有限次数のSobolev空間でCauchy列になります。各空間の完備性から $V(s)$ はすべての $H^{m-1}$ で極限を持ちます。異なる $m$ の極限は低階空間への連続包含により一致します。局所Sobolev埋込みを任意に高い次数で適用すると、この共通極限 $V_b$ は空間変数について滑らかです。特に第一成分と接続法線微分の成分から、$u_b$ と $v_b$ が得られます。支持は $C$ の閉じた空間射影に含まれるのでコンパクトです。

**時間方向の滑らかさも確認します。** 一階系を $\partial_sV=G(s,x,V,\partial_xV,F)$ と解いたとき、$G$ は上記の $(A^0)^{-1}$ と滑らかな係数からなる線形な式です。$V(s)\to V_b$ がすべての空間 $H^m$ で成立し、$F$ と係数も滑らかなので

$
\partial_sV(s)\longrightarrow
-(A^0_b)^{-1}\Bigl(\sum_jA^j_b\partial_jV_b+D_bV_b-F_b\Bigr)
\quad\text{in every }H^m.
$

さらに一次系を繰り返し時間微分すると、$\partial_s^{k+1}V$ は $\partial_s^\ell V$（$\ell\le k$）の空間一階微分と係数・$F$ の時間微分で表されます。$k=0$ から帰納すると、すべての時間導関数に $s\uparrow b$ で滑らかな左極限が存在します。この再帰式で決まる時間方向のjetは、同じデータから始める局所解の右側のjetとも一致します。

次に $u_b,v_b$ と $f$ を新たなデータとして[HPDE11の局所存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を $\Sigma_b$ の各点で適用します。データと源の支持を含むコンパクト集合に対しては[HPDE15のコンパクト貼り合わせ](../HPDE15/index.md#thm-hpde15-compact-collar)で共通の正時間幅を選べます。その外側で源とデータが零の局所領域は零解で埋め、[重なりの一意性](../HPDE15/index.md#lem-hpde15-patch-intersection)により境界の一致を確認します。ここでは $C$ と源支持を少し広げたコンパクト近傍を使い、外での零解との比較に十分な因果的余裕を取ります。こうして $\Sigma_b$ の周囲に局所的に正の時間幅を持つ解が得られ、コンパクトな有効領域では幅の最小値を選べます。

残るのは $t<b$ にある元の解との一致です。元の解と新解の初期データは $\Sigma_b$ でともに $(u_b,v_b)$ ですが、元の解はまだ $b$ で定義されていません。

上で構成したすべての空間・時間導関数の左極限を $t=b$ に与えれば、元の解はその面まで滑らかに延び、$Pu=f$ も極限で成立します。新解は同じ $(u_b,v_b)$ から始まるので、一階還元方程式による時間jetの再帰式も一致します。従って二つを $t=b$ で滑らかに接続できます。新解との差は $t=b$ 上で零のCauchyデータを持ちます。

[局所零データ一意性](../HPDE10/index.md#lem-hpde10-local-cone)を過去側に適用すると、十分小さい共通領域で二解が一致します。したがって、元の解を変えずに $\Sigma_b$ の先まで延長できます。 $\square$
<!-- proof-end -->

この補題が排除するのは「有限時刻に高階微分が無限大になり、滑らかなCauchyデータが消えてしまう」という線形方程式での障害です。非線形問題ではエネルギーの右辺が未知解の高階ノルムに超線形に依存し、同じ議論が自動では成立しません。

## 5. 解を全時刻へ延ばす

ここまでで必要な材料が揃いました。有限伝播は**解の支持を予め絞る**ために使います。高階評価は**有限端点での延長を可能にする**ために使います。一意性は、途中でパッチ・座標・時刻の刻み幅を選び直しても同じ解になるために使います。

<a id="thm-hpde16-global-cauchy"></a>

<!-- formal-statement-start -->
> **定理（大域Cauchy問題の存在一意性）**  
> $(M,g)$ は境界のない時間向き付き滑らかな大域双曲Lorentz多様体、$E\to M$ は有限ランクの実または複素滑らかなベクトル束、$P:\Gamma(M,E)\to\Gamma(M,E)$ は滑らかなnormally hyperbolic作用素とする。$\Sigma\subset M$ は滑らかな空間的Cauchy超曲面であり、$N$ は未来向き単位法線、$\nabla^P$ は $P$ の一意接続とする。
>
> 任意の $f\in\Gamma_c(M,E)$ と $u_0,u_1\in\Gamma_c(\Sigma,E|_\Sigma)$ に対し、滑らかな大域Cauchy解 $u\in\Gamma(M,E)$ が**ただ一つ**存在し、

$$
Pu=f,\qquad u|_\Sigma=u_0,\qquad \nabla_N^Pu|_\Sigma=u_1
$$

> を満たす。さらに $K_\Sigma=\operatorname{supp}u_0\cup\operatorname{supp}u_1$、$K_f=\operatorname{supp}f$ として、未来側・過去側それぞれに

$$
\begin{aligned}
\operatorname{supp}u\cap J^+(\Sigma)
&\subset J^+\!\bigl(K_\Sigma\cup(K_f\cap J^+(\Sigma))\bigr),\\
\operatorname{supp}u\cap J^-(\Sigma)
&\subset J^-\!\bigl(K_\Sigma\cup(K_f\cap J^-(\Sigma))\bigr)
\end{aligned}
$$

> が成り立つ。$P$ の形式的自己随伴性は不要である。
<!-- formal-statement-end -->

### 証明の見取り図

まず $\Sigma$ に沿って局所解を構成し、重なりで一致させます。初期データ・源が零の因果的外側では零解を使えます。将来の任意の有限時刻 $T$ まで、支持は[有限時間因果影](#lem-hpde16-shadow-compact)に収まります。最大延長時刻が $T$ より前なら[滑らかな端点延長](#lem-hpde16-smooth-endpoint)に反します。過去側も時間を逆にすれば同じです。最後に[依存領域の一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)で二つの大域解の差を消します。

<!-- proof-start -->
### 証明

**(1) 初期面近傍での構成**。$K_\Sigma$ と、$K_f$ の時間分割に関する空間射影を含む相対コンパクトな初期面開集合 $A$ を選びます。$K_f$ はコンパクトなので射影もコンパクトです。$A$ を含むコンパクトな初期面集合を有限個の小領域で覆い、[局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)から解を得ます。[HPDE15の貼り合わせ定理](../HPDE15/index.md#thm-hpde15-compact-collar)で、有限被覆上に正の共通幅 $\varepsilon$ を持つ解を構成します。

$A$ の外側では、初期データと源がともに零であるように余裕を取っています。従って外側の初期点の小さい因果的近傍には零解を用いられます。この零解と既存の局所解は、重なりで双方の初期データが零であるため[HPDE15の重なり補題](../HPDE15/index.md#lem-hpde15-patch-intersection)により一致します。初期面を覆う解ができ、影響が届く部分はコンパクトなので、有効部分には共通の時間幅があります。必要なら零領域を少し広げて貼り合わせ、全スライス上の解を定義します。

**(2) 未来側の最大時間**。未来側に有限時間帯の解を持つ区間の上限を $b\in(0,\infty]$ とします。任意の有限 $T>0$ を先に固定して、$b\le T$ と仮定し矛盾を導きます。未来への支持を制限するコンパクト集合を

$$
K_+=K_\Sigma\cup(K_f\cap J^+(\Sigma))
$$

と置きます。[HPDE10の有限伝播](../HPDE10/index.md#thm-hpde10-finite-propagation)を既に存在する時間帯の各解へ局所的に適用すると、$0\le s<b$ において

$$
\operatorname{supp}u\cap\Sigma_s\subset J^+(K_+)\cap\Sigma_s.
$$

従って $0\le t<b$ での支持は $C^+_{K_+,[0,T]}$ に収まります。この集合は[因果影のコンパクト性](#lem-hpde16-shadow-compact)でコンパクトです。ここで $K_f$ が $\Sigma$ より前にもある場合、それは未来側の影響へ含めません。未来側に入る $f$ の支持だけを取っています。

**(3) 有限時刻では停止できない**。支持が固定したコンパクトな領域にあるため、[束値高階評価](#lem-hpde16-bundle-energy)の定数を $[0,T]$ 上で固定できます。$P$ の係数と源は滑らかなので、各 $m$ に対し

$$
\sup_{0\le s<b}Y_m(s)
\le c_m e^{c_mT}\left(Y_m(0)+\int_0^T\|f(\tau)\|_{H^m}^2\,d\tau\right)<\infty.
$$

[有限端点の延長補題](#lem-hpde16-smooth-endpoint)によって $\Sigma_b$ に滑らかなコンパクト支持のトレースが存在し、$b$ を越える正時間だけ解を延長できます。これは $b$ の最大性に矛盾します。従って $b>T$ です。$T$ は任意なので、未来側の解はすべての時刻に存在します。互いに異なる $T$ で構成した解は、共通時間帯の[一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)により一致します。

**(4) 過去への延長**。時間関数を $-t$ とし、未来・過去を逆にします。源支持のうち $\Sigma$ 以前にある部分と $K_\Sigma$ の和 $K_-=K_\Sigma\cup(K_f\cap J^-(\Sigma))$ を用い、コンパクトな $C^-_{K_-,[-T,0]}$ 上で(2)・(3)を繰り返します。すべての負時刻まで解が得られ、初期面の周囲では未来側の解と[局所一意性](../HPDE10/index.md#lem-hpde10-local-cone)により一致します。両者を接合して $M$ 全体の滑らかな解 $u$ を得ます。

**(5) 大域一意性**。もう一つの滑らかな大域解 $v$ が同じ $f$、$u_0$、$u_1$ を満たすとします。

$w=u-v$ は $Pw=0$ で $\Sigma$ 上の変位と法線微分が零です。任意の $q\in M$ を取り、$\Sigma$ から $q$ への因果的足跡のコンパクト領域で[HPDE10の因果的依存評価](../HPDE10/index.md#thm-hpde10-causal-dependence)を適用すると $w(q)=0$ です。

$q$ は任意なので $u=v$。この議論は $v$ の支持がコンパクトであることを仮定しません。

(2)と(4)で得た支持包含は、各有限時間帯の局所支持評価を全時刻についてまとめたものです。$\square$
<!-- proof-end -->

<a id="cor-hpde16-slice-compact"></a>

<!-- formal-statement-start -->
> **系（因果的支持と時間スライス上のコンパクト性）**  
> 上の大域Cauchy定理の解 $u$ について、任意の有限区間 $[a,b]$ に対し

$$
\operatorname{supp}u\cap t^{-1}([a,b])
$$

> はコンパクトである。従って各 $\Sigma_s$ への解の制限と法線微分はコンパクト支持である。ただし一般に $\operatorname{supp}u$ 自体は時空内でコンパクトとは限らない。
<!-- formal-statement-end -->

### 証明の見取り図

未来側と過去側の因果的包含を有限時間帯で切るだけです。ただし「支持の部分集合」と「閉性」は分けて確認します。

<!-- proof-start -->
### 証明

$K=K_\Sigma\cup K_f$ はコンパクトです。[大域Cauchy定理](#thm-hpde16-global-cauchy)の支持包含から

$$
\operatorname{supp}u\cap t^{-1}([a,b])
\subset\bigl(J^+(K)\cup J^-(K)\bigr)\cap t^{-1}([a,b]).
$$

右辺は[因果影のコンパクト性](#lem-hpde16-shadow-compact)による二つのコンパクト集合の和集合です。左辺は滑らかな切断 $u$ の支持（閉集合）と $t^{-1}([a,b])$（閉集合）の共通部分なので閉です。コンパクト集合の閉部分集合ゆえコンパクトです。スライス $\Sigma_s$ は閉なので、その上の二つのトレースの支持もコンパクトです。$\square$
<!-- proof-end -->

## 6. 何を証明したか、何をまだ証明していないか

この大域解は、一般に全時空コンパクト支持ではありません。第1節の平坦波動解では、コンパクト支持の $\phi$ を選んでも、波は左右へ伝わり、支持は時間方向に無限に続きます。一方、どんな有限時刻の範囲を先に決めても、その範囲での支持はコンパクトに収まります。

また、今回の存在定理が要求したのは **コンパクト支持の滑らかなデータと源** です。非コンパクトな滑らかなデータへの延長、非コンパクトな面全体のSobolevノルムでの安定性、一般の分布源に対する解の構成は、別の仮定と論証が要ります。特に「各点の近くで係数が滑らか」から「非コンパクトな面に一つの一様係数定数がある」は導けません。

最後に、局所基本解の存在だけからこの大域定理は証明できません。今回の論理は、局所初期値解、有限伝播、滑らかな端点延長、重なり一意性に依存しています。局所点源核の構成は[HPDE14](../HPDE14/index.md#thm-hpde14-true-local)で確立しましたが、それだけで時空全体の初期値問題を解いたことにはならないのです。

## 7. 演習：証明機構を個別に再構成する

### Level A

<a id="ex-hpde16-a01"></a>
#### HPDE16-A01 有限時間因果影を計算する

Minkowski平面で $K=\{(0,x):2\le x\le3\}$、$0\le t\le4$ とする。未来因果影 $C^+_{K,[0,4]}$ を不等式で表し、$t=2$ の断面を求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。点 $(t,x)$ が $J^+(K)$ に入る条件は、ある $y\in[2,3]$ について $t\ge0$、$|x-y|\le t$ が成立することです。これは区間 $[x-t,x+t]$ と $[2,3]$ が交わる条件に等しいので $x+t\ge2$ かつ $x-t\le3$。従って

$$
C^+_{K,[0,4]}=\{(t,x):0\le t\le4,\ 2-t\le x\le3+t\}.
$$

$t=2$ では $0\le x\le5$ です。時刻帯で切らずに $J^+(K)$ 全体をコンパクトと呼ぶのは誤りです。
<!-- solution-end -->

<a id="ex-hpde16-a02"></a>
#### HPDE16-A02 初速度を接続で読む

$\mathbb R^{1+1}$ の自明な実直線束で、接続が $\nabla_{\partial_t}^P u=\partial_tu+a(t,x)u$ と表示されるとする。$\Sigma=\{t=0\}$ の単位法線を $N=\partial_t$ としたとき、接続初期データ $u_1$ と座標時間微分 $\partial_tu|_\Sigma$ の関係を求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。[HPDE6の法線初期データ](../HPDE6/index.md#prop-hpde6-first-jet)で $u_1=(\nabla_N^Pu)|_\Sigma$ と定めます。与えられた表示へ $N=\partial_t$ と $t=0$ を代入すると

$$
u_1(x)=\partial_tu(0,x)+a(0,x)u(0,x).
$$

$u(0,x)=u_0(x)$ を用いて移項すれば $\partial_tu(0,x)=u_1(x)-a(0,x)u_0(x)$。接続の係数を落とすと初期速度が変わります。
<!-- solution-end -->

<a id="ex-hpde16-a03"></a>
#### HPDE16-A03 一次系のエネルギーを微分する

$A^0=I_2$、$A^1=\begin{pmatrix}0&1\\1&0\end{pmatrix}$、$D=\operatorname{diag}(1,2)$ とし、コンパクト支持ベクトル $V(t,x)\in\mathbb R^2$ が $V_t+A^1V_x+DV=F$ を満たすとする。$E(t)=\int_{\mathbb R}|V|^2dx$ の導関数を求めよ。
- Level: A

<!-- solution-start -->
**詳細解答**。まず $E'=2\int V^\mathsf TV_tdx$。方程式で $V_t=-A^1V_x-DV+F$ と置くと

$$
E'=-2\int V^\mathsf TA^1V_xdx-2\int V^\mathsf TDVdx+2\int V^\mathsf TFdx.
$$

$A^1$ が対称定数なので $2V^\mathsf TA^1V_x=\partial_x(V^\mathsf TA^1V)$。コンパクト支持によりその積分は零です。従って

$$
E'=-2\int(V_1^2+2V_2^2)dx+2\int(V_1F_1+V_2F_2)dx.
$$

正定値の時間行列と、対称な空間行列の役割がそれぞれ異なります。
<!-- solution-end -->

<a id="ex-hpde16-a04"></a>
#### HPDE16-A04 時空コンパクトとスライスコンパクト

$\phi\in C_c^\infty(\mathbb R)$ は非零、$u(t,x)=\phi(x-t)$ とする。$Pu=0$、各 $t$ で $\operatorname{supp}u(t,\cdot)$ はコンパクト、しかし時空全体の $\operatorname{supp}u$ はコンパクトでないことを示せ。
- Level: A

<!-- solution-start -->
**詳細解答**。$u_t=-\phi'(x-t)$、$u_{tt}=\phi''(x-t)$、$u_{xx}=\phi''(x-t)$ より $Pu=u_{tt}-u_{xx}=0$ です。$S=\operatorname{supp}\phi$ とすれば固定時刻で $\operatorname{supp}u(t,\cdot)=t+S$、これはコンパクトです。一方 $y_0\in S$ を固定すると、任意の $t$ で $(t,t+y_0)$ は $u$ の支持に属します。$t\to\infty$ の列は時空内に収束部分列を持たないので全支持は非コンパクトです。
<!-- solution-end -->

### Level B

<a id="ex-hpde16-b01"></a>
#### HPDE16-B01 因果的な支持制約と零解

$1+1$ 次元波動方程式 $Pu=f$ を考え、初期データは $[-1,1]$ に、源 $f$ は $[1,2]\times[-2,2]$ に支持されるとする。$t=3$ で解の支持が入る区間を有限伝播から求めよ。解が存在すると仮定してよい。
- Level: B

<!-- solution-start -->
**詳細解答**。初期データから時刻 $3$ に届く範囲は、$y\in[-1,1]$ から速度1以下で3だけ伝わる区間 $[-4,4]$ です。

源の点 $(s,y)$ は $1\le s\le2$、$|y|\le2$ なので、時刻3へ届くには $|x-y|\le3-s$。最大の半径は $s=1$ のとき2、従って源が寄与し得る区間は $[-4,4]$ です。

二つの和集合も $[-4,4]$。[有限伝播定理](../HPDE10/index.md#thm-hpde10-finite-propagation)によって $\operatorname{supp}u(3,\cdot)\subset[-4,4]$。

この包含は区間の全点で $u\ne0$ だという主張ではありません。
<!-- solution-end -->

<a id="ex-hpde16-b02"></a>
#### HPDE16-B02 高階評価から端点極限を作る

時間帯 $0\le s<b<2$ の一階還元変数 $V(s)$ が $\|V(s)\|_{H^3}\le10$、$\|\partial_sV(s)\|_{H^2}\le7$ を満たすとする。$V(s)$ が $s\uparrow b$ で $H^2$ の極限を持つことを示し、$H^3$ での強収束までこの二つの不等式だけから言えるか検討せよ。
- Level: B

<!-- solution-start -->
**詳細解答**。$s_1<s_2<b$ に対してBanach空間 $H^2$ の微分積分より

$$
V(s_2)-V(s_1)=\int_{s_1}^{s_2}\partial_\tau V(\tau)\,d\tau
$$

です。三角不等式と微分の界を使うと

$$
\|V(s_2)-V(s_1)\|_{H^2}\le\int_{s_1}^{s_2}7\,d\tau=7(s_2-s_1).
$$

右辺は両時刻が $b$ に近づくと零なのでCauchy列です。$H^2$ の完備性によって極限が存在します。一方、$H^3$ ノルム有界だけから $H^3$ の強収束は直ちには出ません。滑らかさを結論するには同じ論法を任意に高い階数で行い、低階で極限を一致させる必要があります。
<!-- solution-end -->

<a id="ex-hpde16-b03"></a>
#### HPDE16-B03 一意性にコンパクト支持は要るか

滑らかな大域解 $u,v$ が同じnormally hyperbolic作用素 $P$、同じ滑らかな源、同じ初期データを満たすとする。ただし $v$ の時空支持や初期データはコンパクトと仮定しない。適切なCauchy面を持つ大域双曲時空で $u=v$ を示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。$w=u-v$ は $Pw=f-f=0$、$\Sigma$ 上で $w=0$ かつ $\nabla_N^Pw=0$ です。

任意の $q\in J^+(\Sigma)$ に対し、$q$ の過去から $\Sigma$ に至る因果的足跡は、大域双曲性とCauchy面の性質でコンパクトな局所比較領域に含まれます。[HPDE10の因果的依存評価](../HPDE10/index.md#thm-hpde10-causal-dependence)を零の初期データ・源に適用して $w(q)=0$ となります。

$q\in J^-(\Sigma)$ も向きを逆にして同じです。従って $u=v$。

この一意性は解の差の支持を先にコンパクトと仮定しておらず、有限伝播を使った**構成のためのコンパクト支持仮定**と区別できます。
<!-- solution-end -->

<a id="ex-hpde16-b04"></a>
#### HPDE16-B04 非コンパクト面で一様幅を仮定できない理由

$\Sigma=\mathbb R$ 上の開被覆 $A_n=(n-1,n+1)$（$n\in\mathbb Z$）があり、各 $A_n$ 上で時間幅 $\varepsilon_n=(1+|n|)^{-1}$ の局所Cauchyパッチがあるとする。各コンパクト部分集合で正の共通幅を取れること、全 $\Sigma$ に共通する幅をこの情報だけでは保証できないことを示せ。
- Level: B

<!-- solution-start -->
**詳細解答**。コンパクト集合 $L\subset[-R,R]$ は、有限個の $A_n$、例えば $|n|\le\lceil R\rceil+1$ の中から選んだものに覆われます。その有限集合 $I$ について $\varepsilon_L=\min_{n\in I}(1+|n|)^{-1}>0$ です。一方 $\inf_{n\in\mathbb Z}\varepsilon_n=0$ なので、与えられた各パッチ幅の最小値という方法では全 $\Sigma$ の正の幅は取れません。この例は局所パッチ幅についての情報不足を示すもので、**実際の方程式に大域解が存在しないことを意味しません**。大域定理はコンパクト因果影ごとに幅・エネルギー定数を選ぶことで、この問題を回避します。
<!-- solution-end -->

### Level C

<a id="ex-hpde16-c01"></a>
#### HPDE16-C01 大域Cauchy解の構成を自分で閉じる

$(M,g)$ を境界のない滑らかな大域双曲時空、$E\to M$ を有限ランク束、$P$ を滑らかなnormally hyperbolic作用素とする。$\Sigma=\Sigma_0$ は滑らかなCauchy面で、$f\in\Gamma_c(M,E)$、$u_0,u_1\in\Gamma_c(\Sigma,E|_\Sigma)$ とする。次を示せ。

(i) 任意の有限 $T>0$ に対し、未来側での解の支持候補を一つのコンパクト領域に絞れる。

(ii) 最大未来存在時刻 $b\le T$ と仮定すると、高階エネルギー評価と時間微分の制御から、$\Sigma_b$ で滑らかなCauchyデータを再構成できる。

(iii) 局所存在・貼り合わせを再適用して $b$ を越えて延長し、矛盾する。

(iv) 過去側でも同様の結果を得、局所一意性から大域一意性を導く。

各段階で必要な先行結果と、非コンパクトな初期面全体の一様評価を仮定していない理由を明示せよ。
- Level: C

<!-- solution-start -->
**詳細解答**。

(i) $K_\Sigma=\operatorname{supp}u_0\cup\operatorname{supp}u_1$、$K_f=\operatorname{supp}f$、$K_+=K_\Sigma\cup(K_f\cap J^+(\Sigma))$ と定めます。$K_+$ はコンパクトです。[HPDE10の有限伝播定理](../HPDE10/index.md#thm-hpde10-finite-propagation)は既に存在する局所解に対して、$0\le t<b$ で $\operatorname{supp}u\subset J^+(K_+)$ を与えます。よって $0\le t\le T$ で必要な領域は

$$
C_T=J^+(K_+)\cap t^{-1}([0,T]).
$$

[有限時間因果影のコンパクト性](#lem-hpde16-shadow-compact)から $C_T$ はコンパクトです。

(ii) $b\le T$ と仮定します。コンパクトな $C_T$ を有限個の座標箱で覆えば、任意の有限階の係数界を取れます。[束値高階評価](#lem-hpde16-bundle-energy)により、任意の $m$ について

$$
\sup_{0\le s<b}Y_m(s)\le C_{m,T}\left(Y_m(0)+\int_0^T\|f(\tau)\|_{H^m}^2\,d\tau\right)<\infty.
$$

一階系 $A^0V_s+A^jV_j+DV=F$ について $A^0$ は可逆なので、$V_s=-(A^0)^{-1}(A^jV_j+DV-F)$ です。従って $m\ge1$ なら $\|V_s\|_{H^{m-1}}\le M_m$。$s_1<s_2<b$ で

$$
\|V(s_2)-V(s_1)\|_{H^{m-1}}
\le\int_{s_1}^{s_2}\|V_s\|_{H^{m-1}}\,ds
\le M_m(s_2-s_1).
$$

よって任意の階数で $V(s)$ に極限があり、Sobolev埋込みと極限の整合性から $\Sigma_b$ 上の滑らかな $u_b,v_b$ を得ます。支持は $C_T$ の空間射影内なのでコンパクトです。

(iii) 新データ $(u_b,v_b)$ から[局所Cauchy存在](../HPDE11/index.md#thm-hpde11-local-cauchy)を適用し、[HPDE15の有限パッチ貼り合わせ](../HPDE15/index.md#thm-hpde15-compact-collar)でコンパクトな有効領域に正の共通延長幅を取ります。外側は源とデータが零なので零解と[重なり一意性](../HPDE15/index.md#lem-hpde15-patch-intersection)で整合させます。元の解も $\Sigma_b$ に滑らかに収束し、同じ二つのデータを持つので、新解と過去側で一致します。これで解を $b+\delta$ へ延長でき、最大性に反します。

(iv) $K_-=K_\Sigma\cup(K_f\cap J^-(\Sigma))$ を用い、$J^-(K_-)\cap t^{-1}([-T,0])$ 上で時間を反転して(i)〜(iii)を繰り返せばすべての過去時刻まで延長できます。初期面の周囲で両側を一致させて滑らかな全時空解とします。別解 $v$ との差は斉次方程式と零Cauchyデータを満たし、[依存領域一意性](../HPDE10/index.md#cor-hpde10-domain-uniqueness)により任意の時空点で零です。

どこでもコンパクトなのは **先に $T$ を固定した因果影** です。$T$ を変えるごとに被覆と係数定数を選び直しており、非コンパクトな全初期面や $T\to\infty$ での一様なエネルギー定数は仮定していません。
<!-- solution-end -->

## 8. 次章へ

この章で、滑らかなコンパクト支持の初期データと源から、曲がった大域双曲時空の**全時刻で唯一の滑らかな波動解**を構成しました。次章では、解の構成過程で得た支持と高階評価を、時間分割・データ摂動の下で整理します。とくに非コンパクトな滑らかなデータをどの意味で扱えるかを切り分けます。これが先進・遅延Green作用素へ進む際の関数空間上の準備になります。
