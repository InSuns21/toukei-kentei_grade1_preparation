# BHI18 二次元CFT放射領域のエントロピー

<!-- definition-example-audit: strict -->

## 1. 放射の場所が決まっても、場の状態を指定しなければエントロピーは決まらない

[前講で定義した浴の領域とエントロピー台帳](../BHI17/index.md#def-bhi17-radiation-ledger)は、時刻 $t_*$ の非重力浴 $B=\{x>0\}$、接合面 $\Sigma=\{x=0\}$、観測区間 $R=[b,L]$（$0<b<L$）、cutoffを固定しました。次に必要なのは、その区間に置かれた量子場の**相関**です。有限格子では縮約密度行列を対角化しましたが、二次元共形場理論（CFT）では相関関数から区間の精細エントロピーの普遍部分を計算できます。

本講は浴の計量を $ds_B^2=-dt^2+dx^2$、符号を $(-,+)$ とし、単位 $\hbar=k_B=v_{\rm light}=1$、対数を自然対数（nat）に固定します。浴の物質は左右の中心電荷が等しい $c=\bar c>0$ のユニタリな二次元CFTとし、必要な場合には重力側を含めて同じCFTの状態が透過的に延長される**計算用の仮定**を別途課します。区間長を $\ell_R=L-b$、等時刻の端点を $(t_*,b),(t_*,L)$ と記します。

まず浴側の局所領域が[正則化された精細エントロピー](../BHI17/index.md#def-bhi17-radiation-ledger)を持つよう有限cutoff $a>0$ を指定します。[QFT57の正則化された領域縮約](../../QFT/QFT57/index.md#def-qft57-regulated-reduction)と同じ操作です。場の連続極限ではエントロピーの**絶対定数**はcutoffや状態の端点処方に依存するので、以下では普遍的な対数項と、端点定数 $k$ およびスケーリング補正を分けて扱います。

本講で使う真空は、**無限直線の平坦CFT真空を浴へ制限できる場合**の真空です。$x=0$ に反射境界を課した半直線の境界CFT（BCFT）とは別の状態・別の相関関数です。BHI17の透過条件を古典的な試験場に課しただけで、この量子真空・熱平衡状態が一意に定まるわけではありません。

## 2. 平坦浴の二端点をCFTの区間公式へ入れる

二端点 $(b,L)$ を持つ単一区間の計算では、[QFT59の単一区間von Neumann係数](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)をそのまま利用できます。これは一般のブラックホールの答えではなく、上で固定した**浴の場の状態**についての式です。

何を入力するかが曖昧にならないように、浴の計算結果を台帳として定めます。状態と区間長とcutoffを固定したうえで、比較可能なエントロピーを記録するための定義です。

<a id="def-bhi18-cft-ledger"></a>

<!-- formal-statement-start -->
> **定義（放射浴のCFTエントロピー台帳）**
>
> 平坦な二次元非重力浴の等時刻区間 $R=[b,L]$、$0<b<L$ と、中心電荷 $c=\bar c>0$ のCFTの状態 $\omega$、正の短距離cutoff $a$、時刻 $t_*$、端点の規格化および赤外条件を固定する。この正則化で定めた縮約状態 $\rho_R^{(a)}$ の
>
$$
S_{\rm matter}^{(a)}(R;\omega)
=-\operatorname{Tr}\bigl(\rho_R^{(a)}\ln\rho_R^{(a)}\bigr)
$$
>
> を台帳のエントロピー欄とする。CFTスケーリング領域で用いる普遍項、端点定数、有限cutoff補正、および境界条件は別欄に記録する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi18-cft-ledger -->
**定義の確認**： $b=2$、$L=5$、$a=10^{-2}$、$t_*=0$、自由bosonの無限直線真空（$c=\bar c=1$）を浴へ制限し、反射効果がない延長と赤外処方を固定します。端点とスケーリング条件は

$
0<b=2<L=5,\qquad \ell_R=L-b=3,\qquad \frac{\ell_R}{a}=300\gg1
$

です。これで台帳に必要な領域、状態、正則化、端点・境界の条件を指定しました。

**既習公式からの判定**： [QFT59の条件付き単一区間公式](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)の区間端点と長さ比を、浴に合わせて

$
u=b=2,\qquad v=L=5,\qquad x=\frac{v-u}{a}=300
$

と定めます。同公式の解析接続・補正微分の仮定も課し、$c=1$ を代入すると

$
S_{\rm matter}^{(a)}=\frac13\ln300+k_{\rm vac}+o(1)
$

を得ます。$k_{\rm vac}$ は同じ端点処方の定数です。定数の数値を知らないことと、状態が未指定であることは違います。
<!-- definition-example-end -->

<a id="prop-bhi18-vacuum-bath"></a>

<!-- formal-statement-start -->
> **命題（透過的な平坦浴での真空区間普遍項）**
>
> 上記のCFTと $R=[b,L]\subset B$、$\ell_R=L-b\gg a$ を取り、浴の区間相関が無限直線の平坦CFT真空の単一区間相関に一致すると仮定する。[QFT59の条件付き区間エントロピー公式](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)の解析接続・補正の微分制御も仮定する。このとき
>
$$
S_{\rm matter}^{(a)}(R;\omega_{\rm vac})
=\frac c3\ln\frac{L-b}{a}+k_{\rm vac}+o(1).
$$
>
> $o(1)$ は同じ正則化で $\ell_R/a\to\infty$ としたスケーリング補正であり、$k_{\rm vac}$ は端点処方に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

区間公式の端点 $u,v$ を、それぞれ実際の浴端点 $b,L$ に対応させます。長さは $L-b$ であり、接合面と右端の距離 $L$ ではありません。

<!-- proof-start -->
### 証明

[QFT59の定理](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)の単一区間を $A=[u,v]$、$v-u>0$ とします。その定理の長さパラメータと本講の領域を対応させると

$$
u=b,\qquad v=L,\qquad v-u=L-b=\ell_R>0.
$$

無限直線真空への延長、同じ中心電荷、同じcutoff、解析接続・補正微分の仮定を明示的に置いているので、$x=(v-u)/a=\ell_R/a$ を同定できます。定理の $S_A(x)=\frac c3\ln x+k_1+o(1)$ に代入し、同一端点処方の $k_1$ を $k_{\rm vac}$ と書き直せば所期の式を得ます。$\square$
<!-- proof-end -->

**二つの長さの検算。** $R_1=[2,5]$、$R_2=[2,8]$ を同じ真空・cutoff・端点処方で測れば、$\ell_1=3,\ell_2=6$ なので

$$
S_{\rm matter}(R_2)-S_{\rm matter}(R_1)
=\frac c3\ln2+\bigl[o_2(1)-o_1(1)\bigr].
$$

端点の数はどちらも2個で、共通の端点定数は打ち消されます。これは物理的な区間長の比較であり、$x=0$ の界面に新たな端点を加えたのではありません。

## 3. 共形写像で端点間隔とcutoffを一緒に動かす

状態が真空から共形変換で作られるとき、座標の端点差だけを変えると誤答になります。**端点での局所的な尺度変換（Jacobian）**も同時に必要です。そこで平坦浴の光円錐座標を

$$
u=t-x,\qquad v=t+x,\qquad ds_B^2=-du\,dv
$$

とします。$u$ は右向き波に沿って一定、$v$ は左向き波に沿って一定です。等時刻の区間端点 $P_1=(t_*,b)$、$P_2=(t_*,L)$ では

$$
u_1=t_*-b,\quad u_2=t_*-L,\qquad
v_1=t_*+b,\quad v_2=t_*+L,
$$

$$
|u_2-u_1|=|v_2-v_1|=\ell_R.
$$

真空に対する二つの独立な単調共形写像 $U=f(u)$、$V=g(v)$ を使います。以下の公式は**変換後の座標での真空相関を、浴の座標へ引き戻して状態を指定する**場合に適用します。単なる受動的な座標名変更と混同しません。

ここで $f'(u)=df(u)/du$、$g'(v)=dg(v)/dv$ は、それぞれ $u$ と $v$ だけを動かす一変数の導関数です。$t,x$ に関する偏微分 $\partial_t,\partial_x$ とは微分変数が異なります。

一次場の二点相関を浴へ引き戻すと、変換された端点の**座標差**と、両端の**局所Jacobian**が組になって現れます。各端点の尺度変換を対称に配分した比を、次に $D_f,D_g$ と定めます。

両端を短距離で切り取る際は、各 $P_i$ の正の物理cutoff $a_i$ を用います。$f'(u_i),g'(v_i)>0$ とし、平方根が現れる指数は次の命題の証明でtwistウェイトから確かめます。

<a id="def-bhi18-endpoint-scale"></a>

<!-- formal-statement-start -->
> **定義（共形写像の端点間有効尺度）**
>
> 二つの空間的に離れた浴端点 $P_1,P_2$ に対し、そこを含む各光円錐座標区間で $f,g$ は連続微分可能かつ微分が正、端点の差 $f(u_2)-f(u_1),g(v_2)-g(v_1)$ は非零とする。端点尺度を
>
$$
D_f=\frac{|f(u_2)-f(u_1)|}{\sqrt{f'(u_1)f'(u_2)}},
\qquad
D_g=\frac{|g(v_2)-g(v_1)|}{\sqrt{g'(v_1)g'(v_2)}}.
$$
>
> と定める。それぞれ正の長さ尺度であり、分母は両端の局所Jacobianから作る。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi18-endpoint-scale -->
**定義の確認**： $f(u)=\lambda u+\alpha$、$g(v)=\mu v+\gamma$（$\lambda,\mu>0$）を取ります。差は $|\lambda(u_2-u_1)|=\lambda\ell_R$、両端の導関数は $\lambda,\lambda$ なので $D_f=\lambda\ell_R/\sqrt{\lambda^2}=\ell_R$。$g$ についても $D_g=\mu\ell_R/\sqrt{\mu^2}=\ell_R$ です。定義に必要な正値・非零差・微分条件も直接確認できました。単なる線形尺度変更がエントロピーに偽の差を作らないことを示す最小例です。
<!-- definition-example-end -->

<a id="prop-bhi18-conformal-bath"></a>

<!-- formal-statement-start -->
> **命題（共形変換で指定した浴状態の区間普遍項）**
>
> $c=\bar c>0$ の二次元ユニタリCFTで、$R$ と二端点の正のcutoff $a_1,a_2$ を固定する。光円錐写像 $U=f(u),V=g(v)$ は[端点有効尺度の定義](#def-bhi18-endpoint-scale)の条件を満たし、$U,V$ の平面真空における単一区間twist相関を浴へ引き戻して状態を定める。その相関の局所一次場変換が有効で、整数レプリカの主項から $n=1$ へ解析接続・補正微分制御ができるスケーリング領域では
>
$$
S_{\rm matter}^{(a_1,a_2)}(R;\omega_{f,g})
=\frac c6\ln\frac{D_fD_g}{a_1a_2}
+k_{f,g}+o(1).
$$
>
> 同じ局所端点規格化で比べる場合、$k_{f,g}$ は同じ端点定数 $k$ として扱える。任意の非共形的な状態や反射境界の半直線CFTにはこの二点式を仮定なしに適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

[QFT58のtwistウェイト](../../QFT/QFT58/index.md#thm-qft58-twist-weight)と[QFT55の円筒二点核に使う一次場変換則](../../QFT/QFT55/index.md#thm-qft55-cylinder-two-point)を、今度は任意の単調 $f,g$ の両端で使います。両端のJacobianが分母の平方根になる過程を計算します。

<!-- proof-start -->
### 証明

整数レプリカ次数 $n\ge2$ に対して、[巡回twistのウェイト](../../QFT/QFT58/index.md#thm-qft58-twist-weight)は

$$
h_n=\bar h_n=\frac c{24}\left(n-\frac1n\right),\qquad
p_n=2h_n+2\bar h_n=\frac c6\left(n-\frac1n\right).
$$

真空二点核は $|U_2-U_1|^{-2h_n}|V_2-V_1|^{-2\bar h_n}$ です。一次場の端点での変換は正則側に $[f'(u_1)f'(u_2)]^{h_n}$、反正則側に $[g'(v_1)g'(v_2)]^{\bar h_n}$ を掛けます。したがって

$$
\begin{aligned}
\langle\mathcal T_n(P_1)\overline{\mathcal T}_n(P_2)\rangle
&\propto
\frac{[f'(u_1)f'(u_2)]^{h_n}}{|f(u_2)-f(u_1)|^{2h_n}}
\frac{[g'(v_1)g'(v_2)]^{\bar h_n}}{|g(v_2)-g(v_1)|^{2\bar h_n}}\\
&=D_f^{-2h_n}D_g^{-2\bar h_n}.
\end{aligned}
$$

両端のcutoff規格化 $(a_1a_2)^{p_n/2}$ と正の係数 $C_n$ を掛けて

$$
\operatorname{Tr}(\rho_R^n)
\simeq C_n(a_1a_2)^{p_n/2}D_f^{-2h_n}D_g^{-2\bar h_n}.
$$

ここで $2h_n=2\bar h_n=p_n/2$ なので、対数は

$$
\ln\operatorname{Tr}(\rho_R^n)
\simeq\ln C_n-\frac{p_n}{2}
\ln\frac{D_fD_g}{a_1a_2}.
$$

仮定した物理的解析接続で $C(1)=1$、$\partial_n$ に関する補正が小さく、[QFT59のレプリカ微分条件](../../QFT/QFT59/index.md#thm-qft59-conditional-von-neumann)を満たすとします。$p'_1=c/3$ であるから

$$
\begin{aligned}
S_{\rm matter}
&=-\left.\partial_n\ln\operatorname{Tr}(\rho_R^n)\right|_{n=1}\\
&=-\left.\partial_n\ln C(n)\right|_{n=1}
+\frac{p'_1}{2}\ln\frac{D_fD_g}{a_1a_2}+o(1)\\
&=k_{f,g}+\frac c6\ln\frac{D_fD_g}{a_1a_2}+o(1).
\end{aligned}
$$

$n$ 微分時には端点、写像、cutoffを固定しました。$\square$
<!-- proof-end -->

**同一状態の座標表示と、異なる状態。** $f(u)=u$、$g(v)=v$、$a_1=a_2=a$ なら $D_fD_g=\ell_R^2$ で、[前節の真空命題](#prop-bhi18-vacuum-bath)に戻ります。他方、$f$ を指数写像にして「写像後の座標で真空」と規定すると、浴の元の座標での状態は一般に変わります。受動座標変換ならcutoffも同じ物理長さで変換して物理エントロピーを不変に保たねばなりません。

### cutoffを両端で取り違えない

平坦浴の同一座標で同じ物理cutoff $a$ を選んだときは $a_1a_2=a^2$ です。一方、端点ごとに $a_1=a$、$a_2=4a$ とした表示なら、真空主項は

$$
\frac c6\ln\frac{\ell_R^2}{4a^2}
=\frac c3\ln\frac{\ell_R}{a}-\frac c6\ln4.
$$

cutoffを変えたときの**端点定数の再表示**まで合わせれば、[QFT59のcutoff尺度の命題](../../QFT/QFT59/index.md#prop-qft59-cutoff-shift)のように同じ物理状態の比較値は保てます。単純にcutoff記号だけ変えて $k$ を固定するのは、同一の正則化を記した台帳にはなりません。

## 4. 熱的な浴へ適用する：なぜ $\sinh$ が現れるか

温度 $T=1/\beta$、$\beta>0$ の無限直線熱平衡CFTを、同じ区間 $R=[b,L]$ に制限した状態を考えます。ここで温度は浴の状態の温度であり、ブラックホールの質量変化から導いた温度ではありません。[QFT60の熱円筒公式](../../QFT/QFT60/index.md#thm-qft60-conditional-von-neumann)を実際の二端点へ代入します。

指数写像の光円錐表示を $f(u)=e^{qu}$、$g(v)=e^{qv}$、$q=2\pi/\beta>0$ とします。正の導関数 $f'(u)=qe^{qu}$ によって

$$
\begin{aligned}
\frac{|f(u_2)-f(u_1)|}{\sqrt{f'(u_1)f'(u_2)}}
&=\frac{2e^{q(u_1+u_2)/2}\sinh(q|u_2-u_1|/2)}
{qe^{q(u_1+u_2)/2}}\\
&=\frac{2}{q}\sinh\frac{q\ell_R}{2}
=\frac{\beta}{\pi}\sinh\frac{\pi\ell_R}{\beta}.
\end{aligned}
$$

$g$ 側も端点の差の絶対値が $\ell_R$ なので同じ値です。これで温度によって変わる長さ尺度が求まりました。

<a id="prop-bhi18-thermal-bath"></a>

<!-- formal-statement-start -->
> **命題（無限直線熱状態を制限した浴の区間普遍項）**
>
> [真空命題](#prop-bhi18-vacuum-bath)と同じCFTを、無限直線上の熱平衡状態（逆温度 $\beta>0$）として浴へ制限でき、熱円筒のtwist二点表示と $n=1$ 近傍の微分制御が成立すると仮定する。$R=[b,L]$、$\ell_R=L-b>0$、$a\ll\min(\ell_R,\beta)$ のスケーリング領域で
>
$$
S_{\rm matter}^{(a)}(R;\omega_\beta)
=\frac c3\ln\left[
\frac{\beta}{\pi a}
\sinh\left(\frac{\pi(L-b)}{\beta}\right)
\right]+k_\beta+o(1).
$$
>
> 端点規格化が同じなら真空と同じ $k$ に揃えて差を取れる。これは静的な熱平衡CFTの結果であり、蒸発過程の放射エントロピーの時間変化を単独では与えない。
<!-- formal-statement-end -->

### 証明の見取り図

前の指数写像では $D_f=D_g=(\beta/\pi)\sinh(\pi\ell_R/\beta)$ が確定しました。[共形変換命題](#prop-bhi18-conformal-bath)に代入し、平方の対数を2倍にします。

<!-- proof-start -->
### 証明

上で計算した両端尺度を $D_\beta=(\beta/\pi)\sinh(\pi\ell_R/\beta)>0$ とします。$a_1=a_2=a$ を[共形変換の区間式](#prop-bhi18-conformal-bath)に代入すると

$$
\begin{aligned}
S_{\rm matter}
&=\frac c6\ln\frac{D_fD_g}{a^2}+k_\beta+o(1)\\
&=\frac c6\ln\left(\frac{D_\beta^2}{a^2}\right)+k_\beta+o(1)\\
&=\frac c3\ln\frac{D_\beta}{a}+k_\beta+o(1)\\
&=\frac c3\ln\left[
\frac{\beta}{\pi a}\sinh\frac{\pi(L-b)}{\beta}\right]
+k_\beta+o(1).
\end{aligned}
$$

$\ell_R>0$、$\beta>0$ から $\sinh(\pi\ell_R/\beta)>0$ なので対数の引数は正です。$\square$
<!-- proof-end -->

**真空への極限。** $y=\pi\ell_R/\beta$ と置くと、$\beta\to\infty$ では $y\to0$ です。

$$
\frac{\beta}{\pi}\sinh y
=\ell_R\frac{\sinh y}{y}
=\ell_R\left(1+\frac{y^2}{6}+O(y^4)\right).
$$

従って同じ端点処方で $k_\beta\to k_{\rm vac}$ を採用でき、補正が制御されるときには真空の $\frac c3\ln(\ell_R/a)$ へ戻ります。逆に $\ell_R\gg\beta$ では

$$
\ln\frac{D_\beta}{a}
=\frac{\pi\ell_R}{\beta}
+\ln\frac{\beta}{2\pi a}
+\ln\left(1-e^{-2\pi\ell_R/\beta}\right),
$$

なので $\ell_R$ に比例する主項 $\pi c\ell_R/(3\beta)$ が現れます。これは[QFT60の熱区間体積項](../../QFT/QFT60/index.md#prop-qft60-thermal-volume)の浴への適用です。時間経過に対する増加ではなく、**平衡状態で観測区間を長くした結果**です。

### 片向きだけが熱的な模型

右向き成分を指数写像 $f(u)=e^{qu}$、左向き成分を $g(v)=v$ にすると、$D_f=D_\beta$、$D_g=\ell_R$ です。従って同じ仮定の範囲で

$$
S_{\rm matter}
=\frac c6\ln\left[
\frac{\beta\ell_R}{\pi a^2}
\sinh\frac{\pi\ell_R}{\beta}\right]
+k_{\rm chiral}+o(1).
$$

長い区間では線形係数は $\pi c/(6\beta)$、両向き熱平衡の半分です。片方向の放射を両方向の熱平衡公式に代入する誤りを防ぐ計算例になります。ただし実際のHawking放射の非平衡状態、端点軌跡、反作用をこれだけで構成したことにはなりません。

## 5. 界面・cutoff・時間を混同しない

**反射境界での破綻点。** 浴の半直線 $x>0$ の端点 $x=0$ が反射する境界なら、全直線の真空二点関数とは違って鏡像による相関が入ります。$R=[b,L]$ の二端点のtwist相関は半平面上で評価する必要があり、$b$ と $L$ それぞれの境界までの距離にも依存します。上の単一の長さ $\ell_R$ の式は**一般には成立しません**。壊れているのは共形場理論そのものではなく、無限直線真空相関に一致するという[真空命題](#prop-bhi18-vacuum-bath)の仮定です。

**同じ区間の時刻変化。** $R=[b,L]$ と真空・熱平衡状態を時刻によらず固定すれば、上の結果は $t_*$ に依存しません。$u_i,v_i$ はともに $t_*$ に依存しても、その差から共通時刻が消え、指数写像の端点Jacobianでも共通の指数が消えます。したがって、この結果をそのままPage曲線の上昇枝として時間軸に描くことはできません。BHI23では、浴の**収集領域の時刻依存、放射状態、接合の物理**を追加して再計算します。

**数式を比較する際の台帳。**

| 入力 | 真空の平坦浴 | 両向き熱平衡浴 | 片向き熱的な浴 |
|---|---|---|---|
| 状態 | 全直線真空に一致する相関 | KMS熱状態の二点相関 | 右向きに熱的・左向きに真空 |
| $D_f,D_g$ | $\ell_R,\ell_R$ | $D_\beta,D_\beta$ | $D_\beta,\ell_R$ |
| 普遍項 $S-k$ | $\frac c3\ln(\ell_R/a)$ | $\frac c3\ln(D_\beta/a)$ | $\frac c6\ln(D_\beta\ell_R/a^2)$ |
| 未入力 | 動く界面・重力応答 | 熱の供給源・反作用 | 非平衡状態の時間発展・反作用 |

上の式は同じ二端点の**物質場の精細エントロピー**です。重力側の面積に相当するdilaton項はまだ含んでいません。一般化エントロピーの定義、islandの候補、重力レプリカの鞍点については後の講義で追加します。

## 6. 演習：入力を揃えてから式を使う

以下では、明記しない限り $c=\bar c>0$、無限直線相関への延長、同じ端点処方、$a\ll\min(\ell_R,\beta)$ が成立する範囲の**普遍主項**を扱います。$k$ と有限cutoff補正は明示的に分けます。エントロピーの単位はnatです。

### Level A：区間、温度、端点尺度を計算する

<a id="ex-bhi18-a01"></a>

#### BHI18-A01 接合面と区間長

- Level: A
- 問題: 浴 $x>0$、$R=[3,7]$、$a=0.01$、自由boson $c=1$ の真空とする。$\ell_R$ と $S_{\rm matter}-k_{\rm vac}$ の普遍主項を求め、なぜ $L=7$ を区間長に使わないか述べよ。

<!-- solution-start -->
**詳細解答。** 二つの端点は $b=3$ と $L=7$ なので $\ell_R=L-b=4$ です。$0<3<7$、$\ell_R/a=400\gg1$ より[真空区間公式](#prop-bhi18-vacuum-bath)を使えます。従って $S_{\rm matter}-k_{\rm vac}=(1/3)\ln(4/0.01)=(1/3)\ln400$ が主項です。$L=7$ は接合面から遠端までの座標距離であり、$R$ 自体の長さではありません。$\ell_R/a\to\infty$ の補正は別に残ります。
<!-- solution-end -->

<a id="ex-bhi18-a02"></a>

#### BHI18-A02 有限温度の二端点

- Level: A
- 問題: $c=1$、$\ell_R=\beta$、$\beta/a\gg1$ の両向き熱平衡浴で、$S_{\rm matter}-k_\beta$ の普遍主項を求めよ。

<!-- solution-start -->
**詳細解答。** [熱浴の式](#prop-bhi18-thermal-bath)で $(L-b)/\beta=1$ と置き、$D_\beta=(\beta/\pi)\sinh\pi>0$ を得ます。よって $S_{\rm matter}-k_\beta=(1/3)\ln[(\beta/(\pi a))\sinh\pi]$ が普遍主項です。$\sinh\pi$ を単に $\pi$ と置けるのは $\ell_R/\beta\ll1$ のときだけで、今回 $\ell_R/\beta=1$ では使えません。
<!-- solution-end -->

<a id="ex-bhi18-a03"></a>

#### BHI18-A03 一次変換のJacobian

- Level: A
- 問題: $f(u)=3u+2$、$g(v)=2v-5$、等時刻の区間長 $\ell_R=5$ のとき $D_f,D_g$ を求めよ。

<!-- solution-start -->
**詳細解答。** 導関数は $f'=3>0$、$g'=2>0$、端点の差はそれぞれ $3\ell_R=15$、$2\ell_R=10$ です。よって[端点尺度の定義](#def-bhi18-endpoint-scale)から $D_f=15/\sqrt{3\cdot3}=5$、$D_g=10/\sqrt{2\cdot2}=5$。両端差だけなら15と10へ伸びますが、Jacobianを入れると元の長さへ戻ります。
<!-- solution-end -->

<a id="ex-bhi18-a04"></a>

#### BHI18-A04 二つのcutoff

- Level: A
- 問題: 真空浴で $\ell_R$ を固定し、端点cutoffを $a_1=a$、$a_2=4a$ に取る。共通 $a$ の場合と比較して、**端点定数を固定した式の普遍対数項だけ**の差を求めよ。

<!-- solution-start -->
**詳細解答。** $D_f=D_g=\ell_R$ です。[共形写像命題](#prop-bhi18-conformal-bath)の対数項は二つのcutoffなら $(c/6)\ln[\ell_R^2/(4a^2)]$、共通cutoffなら $(c/6)\ln[\ell_R^2/a^2]$。差は $(c/6)\ln(1/4)=-(c/6)\ln4$ です。これは正則化を変更した表示の対数項の差で、物理エントロピーの変化とは断言できません。定数項も同じ処方へ変換する必要があります。
<!-- solution-end -->

<a id="ex-bhi18-a05"></a>

#### BHI18-A05 低温極限

- Level: A
- 問題: $D_\beta=(\beta/\pi)\sinh(\pi\ell_R/\beta)$ とする。$\beta\to\infty$、固定 $\ell_R>0$ で $D_\beta/\ell_R\to1$ を、展開を一段示して証明せよ。

<!-- solution-start -->
**詳細解答。** $y=\pi\ell_R/\beta$ と置けば $y\to0$、$\beta/\pi=\ell_R/y$ です。$\sinh y=y+y^3/6+O(y^5)$ より $D_\beta/\ell_R=\sinh y/y=1+y^2/6+O(y^4)\to1$ です。ここで $\ell_R$ 固定に対して $a\ll\ell_R$ というCFT適用条件も保つ必要があります。
<!-- solution-end -->

### Level B：相関と限界を検算する

<a id="ex-bhi18-b01"></a>

#### BHI18-B01 真空と熱の差のcutoff消去

- Level: B
- 問題: 同じ $c,a$ と端点規格化で、長さ $\ell_R$ の真空・熱平衡浴を比較する。普遍主項の差 $\Delta S=S_\beta-S_{\rm vac}$ を導け。$\beta\to\infty$ での符号と極限を確認せよ。

<!-- solution-start -->
**詳細解答。** [真空公式](#prop-bhi18-vacuum-bath)と[熱浴公式](#prop-bhi18-thermal-bath)を引き、共通の端点定数 $k$、cutoff $a$ の対数を打ち消します。

$$
\Delta S_{\rm univ}
=\frac c3\ln\frac{(\beta/\pi)\sinh(\pi\ell_R/\beta)}{\ell_R}
=\frac c3\ln\frac{\sinh y}{y},\qquad y=\frac{\pi\ell_R}{\beta}>0.
$$

$y>0$ で $\sinh y>y$ なので普遍主項の差は正です。[A05](#ex-bhi18-a05)の展開により $\ln(\sinh y/y)=y^2/6+O(y^4)$。よって $\Delta S_{\rm univ}=c\pi^2\ell_R^2/(18\beta^2)+O(\ell_R^4/\beta^4)\to0$。有限cutoff補正の差が小さいことは別途必要です。
<!-- solution-end -->

<a id="ex-bhi18-b02"></a>

#### BHI18-B02 指数写像を最初から追う

- Level: B
- 問題: $f(u)=e^{qu}$、$g(v)=e^{qv}$（$q>0$）について、任意の等時刻区間の $D_f,D_g$ を計算し、$q=2\pi/\beta$ の熱公式を導け。

<!-- solution-start -->
**詳細解答。** 端点 $u_1,u_2$ について $f'(u_i)=qe^{qu_i}>0$ です。$e^{qu_2}-e^{qu_1}=2e^{q(u_1+u_2)/2}\sinh[q(u_2-u_1)/2]$ なので絶対値を取ると

$$
D_f=\frac{2e^{q(u_1+u_2)/2}\sinh(q\ell_R/2)}
{qe^{q(u_1+u_2)/2}}
=\frac2q\sinh\frac{q\ell_R}{2}.
$$

$v$ でも同じ計算が成立し $D_g=D_f$。$q=2\pi/\beta$ とすると $D_fD_g=[(\beta/\pi)\sinh(\pi\ell_R/\beta)]^2$ です。[共形写像命題](#prop-bhi18-conformal-bath)へ $a_1=a_2=a$ とともに代入すると $S-k=(c/6)\ln[(D_f/a)^2]=(c/3)\ln[(\beta/(\pi a))\sinh(\pi\ell_R/\beta)]$ を得ます。これが熱浴の主項です。
<!-- solution-end -->

<a id="ex-bhi18-b03"></a>

#### BHI18-B03 非線形写像と局所尺度

- Level: B
- 問題: $t_*=0$、$R=[0,\ell]$ の局所的な平坦CFT区間で $f(u)=u+\gamma u^2$、$g(v)=v$、$z=\gamma\ell\in(0,1/2)$ とする。$D_fD_g/\ell^2$ と、それに伴う普遍項の真空との差を求めよ。ただしこの局所例の区間を浴へ平行移動しても同じ差が得られるよう写像の原点を対応して動かす。

<!-- solution-start -->
**詳細解答。** $u_1=0$、$u_2=-\ell$ なので $f(u_1)=0$、$f(u_2)=-\ell+\gamma\ell^2=-\ell(1-z)$ です。端点だけで単調性を推測せず、区間全体で微分を確認します。

$
f'(u)=1+2\gamma u\ge1-2\gamma\ell=1-2z>0
\qquad(-\ell\le u\le0).
$

従って $f$ はこの区間で単調増加し、$f'(u_1)=1$、$f'(u_2)=1-2z$ です。よって

$$
D_f=\ell\frac{1-z}{\sqrt{1-2z}},\qquad D_g=\ell,\qquad
\frac{D_fD_g}{\ell^2}=\frac{1-z}{\sqrt{1-2z}}.
$$

共通cutoffと端点定数を取れば普遍項の差は $(c/6)[\ln(1-z)-\tfrac12\ln(1-2z)]$。$\ln(1-z)=-z-z^2/2+O(z^3)$、$\ln(1-2z)=-2z-2z^2+O(z^3)$ を代入すると $(c/6)[z^2/2+O(z^3)]=cz^2/12+O(z^3)$。端点差だけなら $(1-z)$ しか現れず、Jacobianを忘れた誤答となります。

この局所区間を実際の浴へ移すには、$b>0$ として $R_b=[b,b+\ell]$ を取り、$t_*=0$ で端点と写像の原点を対応させます。

$
\begin{aligned}
u_1&=-b,\quad u_2=-b-\ell,\\
f_b(u)&=(u+b)+\gamma(u+b)^2,\quad g(v)=v.
\end{aligned}
$

このとき端点の値は $f_b(u_1)=0$、$f_b(u_2)=-\ell(1-z)$ で、区間全体にわたり

$
f_b'(u)=1+2\gamma(u+b)\ge1-2z>0
$

です。従って $D_{f_b}=\ell(1-z)/\sqrt{1-2z}$ と $D_g=\ell$ が再現されます。単に浴へ平行移動して写像の原点を固定した場合とは区別します。
<!-- solution-end -->

<a id="ex-bhi18-b04"></a>

#### BHI18-B04 片向き熱状態を両向きと比べる

- Level: B
- 問題: $f(u)=e^{2\pi u/\beta}$、$g(v)=v$ の単一区間主項を求め、$\ell_R\gg\beta$ での $\ell_R$ に比例する係数を、両向き熱平衡と比較せよ。

<!-- solution-start -->
**詳細解答。** [指数写像の計算](#prop-bhi18-thermal-bath)で $D_f=(\beta/\pi)\sinh(\pi\ell_R/\beta)$、恒等写像の[直接例](#def-bhi18-endpoint-scale)で $D_g=\ell_R$ です。[共形写像命題](#prop-bhi18-conformal-bath)から

$$
S_{\rm chiral}-k_{\rm chiral}
=\frac c6\ln\left[\frac{\beta\ell_R}{\pi a^2}
\sinh\frac{\pi\ell_R}{\beta}\right].
$$

$\ell_R/\beta\to\infty$ で $\sinh y=(e^y/2)(1-e^{-2y})$ なので、主要線形項は $(c/6)(\pi\ell_R/\beta)=\pi c\ell_R/(6\beta)$。両向きの場合は $\pi c\ell_R/(3\beta)$ です。差は一方の光円錐成分だけを熱的にしたことによります。両者が同じ熱平衡密度行列だという仮定は使っていません。
<!-- solution-end -->

### Level C：BHI17の浴を具体的に診断する

<a id="ex-bhi18-c01"></a>

#### BHI18-C01 状態・cutoff・時間の統合監査

- Level: C
- 問題: [BHI17の接合模型](../BHI17/index.md#def-bhi17-regulated-coupling)で平坦浴 $x>0$ を取り、$b=3,L=5,a=10^{-2}$、自由bosonのCFT（$c=\bar c=1$）を考える。透過的延長を別途仮定し、(i) 無限直線真空と逆温度 $\beta=1$ の熱平衡における各普遍項、(ii) 同じ端点処方での熱と真空の差、(iii) 熱状態を片向き熱状態に変更した場合の普遍項、(iv) $a'=2a$ と書き直す場合の端点定数の変化、(v) 反射境界または蒸発模型へ移る際に不足する情報、をそれぞれ計算・説明せよ。$a\ll\min(\ell_R,\beta)$ のスケーリング主項で答えてよい。

<!-- solution-start -->
**詳細解答。** (i) $R=[3,5]$ だから $\ell_R=5-3=2$、$\ell_R/a=200$、$\beta/a=100$ です。[真空公式](#prop-bhi18-vacuum-bath)で $S_{\rm vac}-k=(1/3)\ln200$。次に[無限直線熱状態を制限した浴の区間普遍項](#prop-bhi18-thermal-bath)を適用すると、 $D_\beta=(1/\pi)\sinh(2\pi)$ なので $S_\beta-k=(1/3)\ln[100\sinh(2\pi)/\pi]$ です。ここで同じ端点規格化を使ったため、二つの式の定数を共通の $k$ としました。

(ii) 二式を引くと

$$
\Delta S_{\rm univ}
=\frac13\ln\left[\frac{\sinh(2\pi)}{2\pi}\right]>0.
$$

$\sinh y>y$ は $y=2\pi>0$ で成立します。cutoff $a$ が消えるのは、**同じ端点処方で同じ区間**を比較したためです。

(iii) 片向き熱状態では $D_f=\sinh(2\pi)/\pi$、$D_g=2$ なので[共形写像命題](#prop-bhi18-conformal-bath)から

$$
S_{\rm chiral}-k_{\rm chiral}
=\frac16\ln\left[\frac{2\sinh(2\pi)}{\pi(10^{-2})^2}\right].
$$

両向き熱状態の式の平方を取ることはできません。

(iv) 真空の表示式を $S=(1/3)\ln(\ell_R/a)+k$ とし、新しいcutoff名称 $a'=2a$ を使って**同じ物理量**を書くには

$$
\frac13\ln\frac{\ell_R}{a'}+k'
=\frac13\ln\frac{\ell_R}{a}+k
$$

でなければなりません。$\ln(\ell_R/a')=\ln(\ell_R/a)-\ln2$ から $k'=k+(1/3)\ln2$ を得ます。これは[QFT59のcutoff再表示則](../../QFT/QFT59/index.md#prop-qft59-cutoff-shift)の $c=1$ の場合です。格子間隔そのものを変更して得た別の状態の実測差を示す式ではありません。

(v) 反射境界なら鏡像との相関・境界状態が必要で、(i)の「無限直線相関に一致」の前提が破れます。蒸発なら、時刻に応じた量子状態、放射を収集する領域または動く端点、重力の場の方程式、接合に伴う反作用が必要です。さらにisland候補の一般化エントロピーには重力端点の寄与が必要です。今回の同じ $R$・同じ熱平衡状態の数値式だけを時刻変数へ読み替えてPage曲線とは呼べません。
<!-- solution-end -->

## 7. 次にどの入力を重力模型から得るか

この章で計算したのは、指定した二次元CFTの相関から得る $S_{\rm matter}(R)$ です。$R$ の位置、光円錐端点、共形写像のJacobian、左右の熱的状態、cutoffを揃えれば、どの項が普遍的で、どこから模型依存になるかを追跡できました。

次講BHI19ではJT重力の作用を変分して二次元の幾何とdilatonを導入します。その後、浴との接合・放射領域の時間依存・island端点の極値化へ進みます。物質場の区間エントロピーと、重力の寄与を含む一般化エントロピーは計算対象の異なる二つの段階です。
