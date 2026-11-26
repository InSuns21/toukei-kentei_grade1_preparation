# ATOP22 CW複体・胞体ホモロジー

[単体ホモロジーと特異ホモロジーの比較](../ATOP21/index.md#thm-atop21-comparison) によって三角形分割で穴を計算できました。しかしトーラスを正方形の対辺の同一視で作ると、頂点は一つ、辺は二つ、面は一つです。三角形分割へ戻らず、この四つの部品だけで整数係数のホモロジーを計算したいのです。

直接の前提講座は [ATOP21](../ATOP21/index.md) と [ATOP11](../ATOP11/index.md) です。本講は有限個の円板を有限段で貼って作る空間に範囲を定めます。すべて整数係数とし、負次数の群は零とします。

## 1. 円板を順に貼る

$D^n$ はユークリッド空間の閉単位球、$S^{n-1}$ はその境界とします。$D^0$ は一点、$S^{-1}$ は空集合です。境界の点は古い空間へ送りますが、円板の内部は新しい点として残します。$\sqcup$ は互いに区別した非交和、$\sim$ は指定した同一視から生成される同値関係です。商には商位相を入れます。添字 $\alpha$ はその段で貼る円板を区別します。こうして得る各段を骨格、各円板の内部の像（0次では各点）を開胞体と呼びます。「開」は円板内部に対応する意味で、最終空間で開集合とは限りません。

<a id="def-atop22-cw"></a>

<!-- formal-statement-start -->
> **定義（有限 CW 複体）**
> 有限個の点の離散空間 $X^0$ から出発し、各 $n\ge1$ で有限個の連続写像 $\varphi_\alpha:S^{n-1}\to X^{n-1}$ を選ぶ。有限 CW 複体とは、次の貼り合わせを有限段行って得る空間 $X=X^N$ とその胞体分解である。

$$
X^n=\left(X^{n-1}\sqcup\bigsqcup_\alpha D^n_\alpha\right)/
(x\sim\varphi_\alpha(x),\ x\in\partial D^n_\alpha).
$$

> $X^n$ を $n$ 次骨格、$\varphi_\alpha$ を付着写像、円板から商空間への写像 $\Phi_\alpha$ を特性写像とする。円板内部の像を開胞体とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop22-cw -->
**定義の確認**：一点 $v$ に区間 $[-1,1]$ の両端を送る連続写像を取ります。付着写像の定義域は二点の離散空間なので連続です。内部の点は同一視されず、商は円周になります。次に閉円板の境界をこの円周へ恒等的に貼ると閉円板が得られます。骨格は一点、円周、円板の順であり、各段で有限個（一個）の円板を付着しています。
<!-- definition-example-end -->

有限段の商はコンパクト Hausdorff です。実際、古い骨格がコンパクト Hausdorff なら、有限個の円板との非交和もそうです。同値関係は対角集合、境界と付着像のグラフ、および境界同士で付着像が等しい点対の有限和で閉じています。閉同値関係の各同値類は閉でコンパクトです。閉集合の飽和も、閉同値関係とその閉集合の積部分との交わりを第1座標へ射影したコンパクト集合なので閉です。従って商写像は閉写像です。異なる二同値類は互いに素なコンパクト集合なので、互いに素な開近傍を取れます。各近傍の補集合の像を商から除くと、対応する類の開近傍が得られ、互いに交わらないので商は Hausdorff です。古い骨格上では商写像は単射であり、コンパクト空間から Hausdorff 空間への連続単射なので、その像への同相で、像も閉です。円板内部は当該段の商で開で、商写像はそこでは同相です。

無限個の胞体を許す場合は、各胞体の閉包が有限個の胞体としか交わらず、集合が閉であることを各閉円板への逆像が閉であることから判定する、という条件も必要です。本講では有限模型だけを扱います。胞体の閉包が円板と同相とは限りません。円周の一つの1胞体の閉包は円周全体で、区間ではありません。

## 2. 一層で増える相対群

$X^{-1}=\varnothing$ とします。$n\ge1$ の円板の境界を潰した空間は球面です。実際、$x=ru$（$0<r\le1,\ u\in S^{n-1}$）に対し

$$
F(ru)=(\sin(\pi r)u,\cos(\pi r))\in S^n
$$

と置き、$F(0)=(0,\ldots,0,1)$ とします。$r=0,1$ で正弦が零になるので原点で連続であり、境界全体は南極へ移ります。北極・南極以外では最後の座標が $r$ を一意に定め、最初の $n$ 成分が $u$ を一意に定めます。従って境界だけを同一視した商から球面への連続全単射が得られ、コンパクト性と Hausdorff 性から同相です。円板の [相対ホモロジー群](../ATOP18/index.md#def-atop18-relative-homology) は境界の三角形分割から計算できます。

<a id="lem-atop22-disk-relative"></a>

<!-- formal-statement-start -->
> **補題（円板と境界の相対群）**
> $n\ge0$ に対し、$H_k(D^n,S^{n-1})$ は $k=n$ で $\mathbb Z$、他の非負次数で零である。
<!-- formal-statement-end -->

円板を一枚の $n$ 単体に置き換えると、その全ての真の面が相対鎖で消えます。

<!-- proof-start -->
### 証明

$n=0$ は点と空集合の対であり、[0次特異ホモロジーと道連結成分](../ATOP16/index.md#thm-atop16-h0-path-components) と [可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) から従います。$n\ge1$ では標準単体とその境界は、内部の重心からの放射方向に各境界点を単位球面へ対応させる同相で円板対になります。相対単体鎖群は最高次数に基底一個、他の次数は零です。従って境界は零で、[相対版の比較定理](../ATOP21/index.md#thm-atop21-comparison) が所望の相対特異群を与えます。
<!-- proof-end -->

各円板で [円板と境界の相対群](#lem-atop22-disk-relative) の $n$ 次整数生成元 $u_\alpha$ を一つ選ぶことを胞体の向きの選択とします。0次では点そのものの類を選びます。生成元の符号を逆にすることは許されます。

<a id="thm-atop22-relative-cells"></a>

<!-- formal-statement-start -->
> **定理（胞体ごとの相対群の分解）**
> 有限 CW 複体の $n\ge0$ 次骨格について、特性写像 $\Phi_\alpha:(D^n_\alpha,S^{n-1}_\alpha)\to(X^n,X^{n-1})$ が誘導する相対群上の準同型の和

$$
\bigoplus_\alpha H_k(D^n_\alpha,S^{n-1}_\alpha)
\longrightarrow H_k(X^n,X^{n-1})
$$

> は全ての $k\ge0$ で同型である。従って右辺は $k=n$ で $n$ 胞体を基底とする自由アーベル群、他の次数で零である。
<!-- formal-statement-end -->

見取り図：古い骨格の近傍を境界付近の帯まで広げてから、古い骨格を切除します。新しい円板の内部が互いに分離するので、一枚ずつ計算できます。

<!-- proof-start -->
### 証明

$n=0$ は有限離散集合への特異単体が一点に入るので鎖群も成分別直和です。各成分は一点であり、[円板と境界の相対群](#lem-atop22-disk-relative) の $n=0$ の場合で計算できます。$n\ge1$ とし $A=X^{n-1}$、$Y=X^n$ と置きます。$0<r<1$ を固定し、$U$ を $A$ と各円板の $\|x\|>r$ の部分の像の和とします。商写像による逆像が各成分で開なので $U$ は開です。

円板の帯では

$$
F(x,t)=\left((1-t)+\frac{t}{\|x\|}\right)x
$$

と置き、$A$ 上では恒等とします。半径は $(1-t)\|x\|+t>r$ で、境界点は固定されます。境界の付着関係と両立するため $U$ 上の連続変形を誘導します（商写像はコンパクト Hausdorff 空間間の閉全射であり、区間との積も商写像、その開集合への制限も商写像です）。時刻1で全ての帯が $A$ に移るので強変形レトラクションです。

[ホモトピー同値と特異ホモロジー群](../ATOP17/index.md#cor-atop17-equivalence) から $H_k(A)\to H_k(U)$ は同型です。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) と [完全列の中央の比較](../ATOP21/index.md#lem-atop21-exact-comparison) を、相対群を中央に置いた五項に適用します。四つの周囲の写像は $A\to U$ による同型または $Y$ 上の恒等写像なので $H_k(Y,A)\to H_k(Y,U)$ は同型です。

$A$ は閉で $A\subset U$ だから [切除定理](../ATOP19/index.md#thm-atop19-excision) を使えます。$Y\setminus A$ は円板内部の非交和であり、各内部はその空間で開かつ閉です。連結な標準単体の像は一成分に含まれるので、相対鎖の分解は境界と可換です。従って

$$
H_k(Y,U)\cong
\bigoplus_\alpha H_k(\operatorname{int}D_\alpha^n,
\{r<\|x\|<1\}).
$$

個々の円板でも $V_\alpha=\{x\in D^n_\alpha:\|x\|>r\}$ と置くと、同じ半径変形により帯は境界へ戻ります。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) と [完全列の中央の比較](../ATOP21/index.md#lem-atop21-exact-comparison) から、境界を帯に変更する写像は同型です。[切除定理](../ATOP19/index.md#thm-atop19-excision) も境界が閉で開集合 $V_\alpha$ に含まれるので適用できます。従って包含による同型の列

$$
H_k(D^n_\alpha,S^{n-1}_\alpha)
\xrightarrow{\cong}H_k(D^n_\alpha,V_\alpha)
\xleftarrow{\cong}
H_k(\operatorname{int}D^n_\alpha,V_\alpha\setminus S^{n-1}_\alpha)
$$

が得られます。特性写像は境界を $A$ へ、帯を $U$ へ送り、内部では同相です。[相対ホモロジーの誘導準同型](../ATOP18/index.md#thm-atop18-relative-map) は合成を保存するので、上の比較を全胞体について戻すと、定理で指定した特性写像の和になります。[円板と境界の相対群](#lem-atop22-disk-relative) によって各項を計算して結論を得ます。
<!-- proof-end -->

例えば一点へ二本の区間を付けると $H_1(X^1,X^0)=\mathbb Z^2$ です。区間の両端が同じ点へ行っても、内部が二つあるため基底は二つ残ります。

## 3. 骨格間の境界から鎖複体を作る

新しい $n$ 胞体の相対サイクルの境界は古い骨格に入ります。そのうち直前の層に残る部分だけを取り出せば、有限の整数行列になります。[相対ホモロジーの接続準同型](../ATOP18/index.md#thm-atop18-connecting) を $\delta_n$、[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の絶対群から相対群への商誘導写像を $j_n$ と書きます。前者は相対類の代表鎖の境界を取る操作、後者はさらに一つ下の骨格内の鎖を無視する操作です。最高次より上は骨格を $X$ のまま延長します。

<a id="def-atop22-cellular-chain"></a>

<!-- formal-statement-start -->
> **定義（胞体鎖群と胞体境界）**
> 有限 CW 複体 $X$ に対して $C_n^{\rm cell}(X)=H_n(X^n,X^{n-1})$ とする。$n\ge1$ の胞体境界は対の接続と商への写像の合成

$$
d_n:C_n^{\rm cell}(X)
\xrightarrow{\delta_n} H_{n-1}(X^{n-1})
\xrightarrow{j_{n-1}} C_{n-1}^{\rm cell}(X)
$$

> とし、$d_0=0$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-atop22-cellular-chain -->
**定義の確認**：二頂点 $v,w$ に向き付き区間 $e$ を始点 $v$、終点 $w$ として付けます。相対群の基底は区間一個と頂点二個です。

区間 $e$ の始点・終点が古い骨格に入るので、特異1単体としての境界は古い骨格の0鎖 $w-v$ です。[相対ホモロジーの接続準同型](../ATOP18/index.md#thm-atop18-connecting) はこの境界の類を絶対群へ送ります。次に $X^{-1}=\varnothing$ なので商への写像 $j_0$ は恒等です。従って

$$
d_1(e)=w-v,\qquad d_0d_1(e)=0.
$$
円周の場合は両端が同じ点なので $d_1(e)=v-v=0$ です。
<!-- definition-example-end -->

行列で表すときは [行列として境界を読む](../ATOP13/index.md#boundary-matrix-coordinates) と同じ基底展開を使います。[胞体ごとの相対群の分解](#thm-atop22-relative-cells) により、$e_\alpha=(\Phi_\alpha)_*u_\alpha$ は胞体鎖群の整数基底です。次数 $n-1$ の基底を $e_\beta$ とし、

$$
d_ne_\alpha=\sum_\beta M_{\beta\alpha}e_\beta
$$

と書くと、$M_n=(M_{\beta\alpha})$ が境界の行列です。行は終域、列は始域に対応します。鎖 $z=\sum_\alpha z_\alpha e_\alpha$ の境界は

$$
d_nz=\sum_\beta\left(\sum_\alpha M_{\beta\alpha}z_\alpha\right)e_\beta.
$$

よってサイクル条件は整数座標列 $[z]$ に対する $M_n[z]=0$ と同値です。上の区間の例では頂点基底 $(v,w)$ に対する境界行列は一列 $(-1,1)^{\mathsf T}$ です。

<a id="thm-atop22-cellular-comparison"></a>

<!-- formal-statement-start -->
> **定理（胞体ホモロジー定理）**
> 有限 CW 複体 $X$ の胞体境界は $d_nd_{n+1}=0$ を満たし、その鎖複体のホモロジー群（胞体ホモロジー群）は全ての $n\ge0$ で特異ホモロジー群と同型である。

$$
\ker d_n/\operatorname{im}d_{n+1}\cong H_n(X).
$$
<!-- formal-statement-end -->

見取り図：$n$ 次のサイクルは $n$ 次骨格ですでに作れます。次の $(n+1)$ 次胞体だけがそれを埋めることができ、それ以上の胞体は $n$ 次群を変えません。この三段階を完全列で示します。

<!-- proof-start -->
### 証明

[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の完全性から $n\ge1$ で $\delta_n j_n=0$ です。$n=0$ では $d_0=0$ なので合成は零です。$n\ge1$ では

$$
d_nd_{n+1}=j_{n-1}\delta_n j_n\delta_{n+1}=0.
$$

まず $H_k(X^m)=0$ が $k>m$ で成立することを骨格の帰納で示します。空集合の群は零です。$m$ 次で $k>m$ とすると、[胞体ごとの相対群の分解](#thm-atop22-relative-cells) により $H_k(X^m,X^{m-1})=0$ です。長完全列の

$$
H_k(X^{m-1})\to H_k(X^m)\to H_k(X^m,X^{m-1})
$$

の両端が零なので中央も零です。

$n\ge1$ のとき $H_n(X^{n-1})=0$ から $j_n$ は単射で、その像は $\ker\delta_n$ です。また $j_{n-1}$ は同じ理由で単射です（$n=1$ なら $j_0$ は恒等）。よって

$$
\ker d_n=\ker\delta_n=j_n(H_n(X^n)).
$$

$n=0$ でも $j_0$ が恒等で $d_0=0$ なので同じ等式です（$\delta_0$ は零群への写像です）。次に対 $(X^{n+1},X^n)$ の長完全列は

$$
C_{n+1}^{\rm cell}\xrightarrow{\delta_{n+1}}
H_n(X^n)\xrightarrow{i_*}H_n(X^{n+1})\to0
$$

を与えます。右端の相対 $n$ 次群は零だから $i_*$ は全射、核は $\operatorname{im}\delta_{n+1}$ です。$j_n$ が単射で $j_n\delta_{n+1}=d_{n+1}$ なので、商を取ると

$$
H_n(X^{n+1})\cong
H_n(X^n)/\operatorname{im}\delta_{n+1}
\cong\ker d_n/\operatorname{im}d_{n+1}.
$$

$m\ge n+2$ では相対群の $n+1,n$ 次がともに零です。長完全列により $H_n(X^{m-1})\to H_n(X^m)$ は同型になります。有限段で $X$ に達するため結論が成立します。最高次より上では骨格を $X$ のまま延長し、胞体鎖群は零とします。
<!-- proof-end -->

球面 $S^n$（$n\ge1$）は一点に $n$ 円板の境界を定値写像で貼った模型です。$n=1$ なら端点差が零、$n\ge2$ なら直前の鎖群が零なので全境界は零です。従って $H_0=H_n=\mathbb Z$、他は零です。$S^0$ は二点なので $H_0=\mathbb Z^2$、正次数は零です。

## 4. 境界行列の係数を読む

$n\ge2$ とします。$n$ 胞体 $\alpha$ の付着写像は $S^{n-1}\to X^{n-1}$ です。$(n-1)$ 胞体 $\beta$ の係数だけを読むために、$X^{n-2}$ とそれ以外の $(n-1)$ 胞体を一点に潰すと $D^{n-1}/S^{n-2}$、つまり $S^{n-1}$ が残ります。具体的には潰す部分を除くと $\beta$ の円板内部だけが残り、$\beta$ の閉円板からその商への写像は境界を一点へ送り、内部で単射です。潰す部分は閉なので商はコンパクト Hausdorff であり、境界を潰した円板と同相です。第2節の球面との同相まで合成した写像を $q_\beta:X^{n-1}\to S^{n-1}$ とします。潰した点を $*$ と書きます。

$a:S^m\to S^m$（$m\ge1$）が最高次の生成元を整数倍する値を、ここでは写像度とします。生成元は定義域・値域の双方で指定します。これは [特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) を最高次の整数群で表したものです。零次の場合は端点差を直接使います。写像度の一般的性質は次講で扱います。

<a id="thm-atop22-incidence"></a>

<!-- formal-statement-start -->
> **定理（胞体境界の係数公式）**
> $n\ge2$ の有限 CW 複体において、向き付けられた胞体基底に関する $d_n$ の $\beta,\alpha$ 成分は球面写像 $q_\beta\varphi_\alpha$ の写像度である。定義域の生成元は $u_\alpha$ の接続による境界、値域の生成元は $u_\beta$ の境界商での相対類に対応する絶対群の生成元とする。
<!-- formal-statement-end -->

見取り図：接続で付着球面の生成元を取り出し、他の胞体を潰す商写像によって目的の係数だけを残します。

<!-- proof-start -->
### 証明

$n\ge2$ なら円板は可縮で、[可縮空間の被約特異ホモロジー](../ATOP17/index.md#cor-atop17-contractible) により正次数 $n,n-1$ の絶対群は零です。[対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の接続 $H_n(D^n,S^{n-1})\to H_{n-1}(S^{n-1})$ は同型です。従って $\delta u_\alpha$ は生成元です。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) により

$$
\delta_n(\Phi_{\alpha,*}u_\alpha)
=(\varphi_\alpha)_*(\delta u_\alpha).
$$

商写像 $q_\beta$ は対

$$
(X^{n-1},X^{n-2})\longrightarrow(S^{n-1},*)
$$

の写像でもあります。以下、$H_m(q_\beta)$ を絶対群上、$H_m((q_\beta)_{\rm rel})$ を相対群上の誘導写像と区別します。ここで $m=n-1$ です。相対群の胞体基底のうち $\beta$ 以外は一点へ送られ、相対鎖では零になります。

$\beta$ の生成元の像が生成元になることは次のように確認できます。円板の境界を $V=\{x\in D^m:\|x\|>r\}$（$0<r<1$）へ広げます。商写像 $p:D^m\to D^m/S^{m-1}\cong S^m$ で $W=p(V)$ とすると、$V$ は境界を含む飽和開集合なので $W$ は開です。第2節の半径変形は境界を固定するので $V$ を境界へ、$W$ を $*$ へ変形レトラクトします。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) と [完全列の中央の比較](../ATOP21/index.md#lem-atop21-exact-comparison) で両方の帯への変更が同型になります。

境界と商の一点は閉で、それぞれ $V,W$ の内部に入るので [切除定理](../ATOP19/index.md#thm-atop19-excision) が適用できます。切除後の対は $p$ により同相です。包含と $p$ の誘導写像は可換なので、元の写像 $H_m(p_{\rm rel})$ も同型です。従って $\bar u_\beta=H_m(p_{\rm rel})u_\beta$ は $H_m(S^m,*)$ の生成元です。

さらに $m=n-1\ge1$ に対し、点と球面の対の長完全列の一部は

$$
0\to H_m(S^m)\to H_m(S^m,*)\to H_{m-1}(*)\to H_{m-1}(S^m).
$$

$m=1$ では最後の二群間の写像は同型です。$m>1$ では点の正次数群が零です。いずれの場合も相対群への写像は全射かつ単射です。

この同型を $j^S:H_m(S^m)\to H_m(S^m,*)$ と書き、値域の絶対群の生成元を $v_\beta=(j^S)^{-1}\bar u_\beta$ と定めます。[対の長完全列の自然性](../ATOP18/index.md#thm-atop18-naturality) から

$$
H_m((q_\beta)_{\rm rel})j_m
=j^S H_m(q_\beta).
$$

胞体基底で $d_ne_\alpha=\sum_\gamma M_{\gamma\alpha}e_\gamma$ と展開すると、上の式と接続の自然性より

$$
\begin{aligned}
M_{\beta\alpha}\bar u_\beta
&=H_m((q_\beta)_{\rm rel})d_ne_\alpha\\
&=j^S H_m(q_\beta)\delta_ne_\alpha\\
&=j^S H_m(q_\beta\varphi_\alpha)(\delta u_\alpha).
\end{aligned}
$$

$j^S$ の逆を適用すると、$H_m(q_\beta\varphi_\alpha)(\delta u_\alpha)=M_{\beta\alpha}v_\beta$ となります。これは指定した二つの生成元での写像度の定義そのものです。
<!-- proof-end -->

[胞体境界の係数公式](#thm-atop22-incidence) を2胞体に適用します。[辺対付き多角形表示](../ATOP11/index.md#def-atop11-polygon-word) のように境界を向き付き区間に分けて貼る場合、各辺を一度通るごとにその1胞体の係数へ $+1$ または $-1$ を加えればよいです。これを鎖で確認します。多角形を中心から三角形へ分割し、向きを揃えて足した相対2鎖を取ります。隣接三角形の放射辺は互いに反対向きで相殺され、外周の辺だけが残ります。各辺の像は対応する区間の向き付き相対生成元に一致し、逆向きなら符号が反転します（区間を反転したとき接続の端点差が逆になるためです）。接続と商への写像を順に適用した結果が係数和です。

トーラスは頂点 $v$、辺 $a,b$、面 $p$ を持ち、外周語は $aba^{-1}b^{-1}$ です。ここで逆元の記号は辺を逆向きに通ることを表し、鎖群に移ると負符号になります。両辺の始点終点は $v$ なので $d_1=0$ です。

$$
d_2(p)=a+b-a-b=0.
$$

従って $H_2=\mathbb Z$、$H_1=\mathbb Z^2$、$H_0=\mathbb Z$ です。一方実射影平面は円板の境界で対蹠点を同一視し、半円二つが同じ向きに一つの辺 $a$ を通ります。

$$
d_2(p)=2a,\qquad d_1(a)=0.
$$

$d_2$ は整数の2倍写像なので核は零、像は $2\mathbb Z a$ です。従って $H_2=0$、$H_1=\mathbb Z/2\mathbb Z$、$H_0=\mathbb Z$ です。整数係数にすると単なる穴の数だけでなく、二倍すると消える類まで見えます。

## 5. 実射影空間の一般次元

$\mathbb RP^n$ は $S^n$ の対蹠点を同一視した空間です。上半球の内部は一つの開 $n$ 胞体、赤道の像は $\mathbb RP^{n-1}$ です。上半球を閉円板と見なせば境界の付着は赤道から対蹠点を同一視する写像です。この操作を繰り返すと各次数 $0,\ldots,n$ に一胞体があります。

<a id="prop-atop22-projective-boundary"></a>

<!-- formal-statement-start -->
> **命題（実射影空間の胞体境界）**
> $\mathbb RP^n$ の上記胞体模型で向きを適切に選ぶと、$1\le k\le n$ の胞体境界は

$$
d_k=1+(-1)^k
$$

> 倍の準同型である。
<!-- formal-statement-end -->

見取り図：付着する球面の二つの半球が、同じ古い胞体へ入ります。二つ目の半球の向きが一つ目と一致するか反転するかで係数が2または0になります。

<!-- proof-start -->
### 証明

$k=1$ は端点差で零です。$k\ge2$ とし $m=k-1$ と置きます。$S^m$ を赤道 $S^{m-1}$ で上下に分割します。球面の最高次生成元の符号を基準に、各半球の相対生成元を選びます。

符号を具体的な単体鎖で計算します。$\mathbb R^{m+1}$ の標準基底を $e_1,\ldots,e_{m+1}$ とします。多面体 $\sum_i |x_i|\le1$ の境界は動径方向の同相で $S^m$ になり、赤道は $x_{m+1}=0$ に対応します。各符号列 $\varepsilon=(\varepsilon_1,\ldots,\varepsilon_{m+1})\in\{-1,1\}^{m+1}$ について、最高次の向き付き単体を

$$
\sigma_\varepsilon=[\varepsilon_1e_1,\ldots,\varepsilon_{m+1}e_{m+1}]
$$

とします。頂点順は座標軸の順です。[単体境界作用素](../ATOP13/index.md#def-atop13-boundary) で第 $i$ 頂点を落とす符号は $(-1)^{i-1}$ です。そこで鎖

$$
z=\sum_\varepsilon
\left(\prod_{i=1}^{m+1}\varepsilon_i\right)\sigma_\varepsilon
$$

を取ります。第 $i$ 成分だけ符号を変えた二つの単体は同じ面を同じ頂点順で持ち、$z$ の係数は互いに逆符号なので、境界が相殺されます。逆に任意の最高次サイクルの係数は隣り合う符号列で逆符号になり、一成分ずつの符号変更ですべての符号列へ到達できます。従って全係数が一つの整数で決まり、最高次より上の鎖群は零なので $[z]$ は生成元です。[単体ホモロジーと特異ホモロジーの比較定理](../ATOP21/index.md#thm-atop21-comparison) により特異群でも生成元です。

対蹠写像 $a$ は各頂点を反対の頂点へ送り、座標軸の順を保ったまま $\sigma_\varepsilon$ を $\sigma_{-\varepsilon}$ に移します。符号列を $\eta=-\varepsilon$ と置き換えると

$$
\begin{aligned}
a_\# z
&=\sum_\varepsilon\left(\prod_i\varepsilon_i\right)\sigma_{-\varepsilon}\\
&=\sum_\eta\left(\prod_i(-\eta_i)\right)\sigma_\eta\\
&=(-1)^{m+1}z.
\end{aligned}
$$

[比較同型の自然性と頂点順序への非依存性](../ATOP21/index.md#thm-atop21-naturality) によって特異ホモロジーでも同じ符号です。$z_+,z_-$ を $z$ のうち最後の符号がそれぞれ正、負である項の和とします。赤道にない境界面は各半球内で相殺されるので、これらは半球対の相対サイクルです。係数がすべて $\pm1$ で、各半球内の隣接単体は連結しているため、同じ係数の議論でそれぞれ相対群の生成元になります。対蹠写像は $a_\#z_-=(-1)^{m+1}z_+=(-1)^kz_+$ と送ります。

付着写像の後で $\mathbb RP^{m-1}$ を一点に潰すと、上半球内部は古い $m$ 胞体へ一対一に移り、下半球内部は対蹠写像を経由して同じ胞体へ移ります。赤道は一点に潰れます。[胞体ごとの相対群の分解](#thm-atop22-relative-cells) を赤道に二枚の半球を貼る模型に適用すると、球面の生成元は半球の二つの相対生成元の和へ写ります。

相対群から古い胞体への写像の係数は、上半球の向きを基準に $1,(-1)^k$ です。[胞体境界の係数公式](#thm-atop22-incidence) によりその和が $d_k$ です。各偶数次の向きは直下の奇数次の向きに合わせて係数を正にでき、奇数次の境界は零なので矛盾しません。
<!-- proof-end -->

例えば [実射影空間の胞体境界](#prop-atop22-projective-boundary) を $\mathbb RP^4$ に適用すると、胞体鎖は

$$
\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{0}
\mathbb Z\xrightarrow{2}\mathbb Z\xrightarrow{0}\mathbb Z
$$

であり左端から次数4,3,2,1,0です。偶数正次数の核は零、奇数次の核は全体です。従って $H_1=H_3=\mathbb Z/2\mathbb Z$、$H_2=H_4=0$、$H_0=\mathbb Z$ となります。一般に最高次が奇数ならその次数の群は $\mathbb Z$ です。

## 6. Euler 標数と閉曲面の分類

[Euler–Poincaré の鎖レベル恒等式](../ATOP14/index.md#thm-atop14-euler-poincare) と同様、胞体数の交代和をホモロジー群の自由部分の階数で表します。$\operatorname{rank}$ は有限生成アーベル群の自由部分の階数であり、$\chi(X)$ は胞体数の交代和（Euler 標数）を表します。

<a id="thm-atop22-euler"></a>

<!-- formal-statement-start -->
> **定理（胞体数の Euler 標数）**
> 有限 CW 複体の $n$ 胞体の個数を $c_n$ とすると

$$
\sum_{n=0}^N(-1)^n c_n
=\sum_{n=0}^N(-1)^n\operatorname{rank} H_n(X).
$$

> 従って左辺は有限 CW 分解の選択に依存せず、同相不変量である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$Z_n=\ker d_n$、$B_n=\operatorname{im}d_{n+1}$ とすると、$C_n/Z_n\cong B_{n-1}$、$Z_n/B_n=H_n(C^{\rm cell})$ です。[Smith 標準形による単体ホモロジーの計算](../ATOP14/index.md#thm-atop14-smith-computation) の整数行列の議論は、境界の合成が零である任意の有限自由アーベル群の鎖複体に適用できます。$d_n$ の有理数上の行列階数を $r_n$ とすると、核の階数は $c_n-r_n$ であり、商の自由部分の階数はそこから $r_{n+1}$ を引いたものです。すなわち $\operatorname{rank} B_{n-1}=r_n$、$\operatorname{rank} B_n=r_{n+1}$ なので

$$
c_n=\operatorname{rank}B_{n-1}+
\operatorname{rank}B_n+\operatorname{rank}H_n(X)
$$

となります。ここで [胞体ホモロジー定理](#thm-atop22-cellular-comparison) を使いました。符号付きで足すと $B_n$ の項は隣り合う次数で打ち消し合い、端では $B_{-1}=B_N=0$ です。従って式が成立し、同相写像が特異群の同型を誘導するため右辺は同相不変です。
<!-- proof-end -->

[コンパクト閉曲面の分類・存在部分](../ATOP11/index.md#thm-atop11-surface-existence) では連結な閉曲面の標準形を得ました。向き付け可能な型は $g$ 個のハンドルを持ち、向き付け不可能な型は $h\ge1$ 個の交叉帽を持ちます。ここでは両系列の標準形をホモロジーだけで区別します。

<a id="thm-atop22-surface-uniqueness"></a>

<!-- formal-statement-start -->
> **定理（閉曲面の標準形の一意性）**
> コンパクト連結閉曲面の標準形は、向き付け可能な種数 $g\ge0$ の型と向き付け不可能な種数 $h\ge1$ の型のうちただ一つである。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

存在は [コンパクト閉曲面の分類・存在部分](../ATOP11/index.md#thm-atop11-surface-existence) です。[胞体境界の係数公式](#thm-atop22-incidence) に続く多角形の計算法を使います。$g\ge1$ の向き付け可能な多角形は外周語が $\prod_{i=1}^g a_i b_i a_i^{-1}b_i^{-1}$ で、頂点一つ、辺 $2g$ 本、面一つです。各辺の正負の出現が相殺されるので $d_2=0$、端点差も零です。従って

$$
H_1=\mathbb Z^{2g},\qquad H_2=\mathbb Z,\qquad
\chi=2-2g.
$$

$g=0$ は球面で $H_1=0$、$H_2=\mathbb Z$、$\chi=2$ なので同じ式です。向き付け不可能な型は外周語 $a_1^2\cdots a_h^2$ で、頂点一つ、辺 $h$ 本、面一つです。よって $d_2(1)=2(a_1+\cdots+a_h)$、$d_1=0$ です。基底を $s=a_1+\cdots+a_h,a_2,\ldots,a_h$ と変更できます。逆方向は $a_1=s-\sum_{i=2}^h a_i$ なので整数基底です。従って

$$
H_1=\mathbb Z^{h-1}\oplus\mathbb Z/2\mathbb Z,
\qquad H_2=0,\qquad\chi=2-h.
$$

ここで $d_2$ は $h\ge1$ なので単射です。一次群のねじれ（零でない元が有限回の加算で零になること）の有無で二系列を区別でき、各系列内では [胞体数の Euler 標数](#thm-atop22-euler) から $g=(2-\chi)/2$ または $h=2-\chi$ が一意に定まります。同相写像は一次群の同型と Euler 標数の一致を与えるので、異なる標準形は同相ではありません。
<!-- proof-end -->

トーラスと Klein の壺はともに $\chi=0$ ですが、前者の一次群は $\mathbb Z^2$、後者は $\mathbb Z\oplus\mathbb Z/2\mathbb Z$ です。Euler 標数だけでは区別できない場合を整数係数が解決します。

## 7. 演習

### 演習 ATOP22-A1：骨格と相対群

- Level: A

一点に3本の区間の両端を貼り、さらに2枚の円板を貼る。各次数の胞体鎖群を求めよ。

<!-- solution-start -->
**詳細解答**

0次骨格は一点、1次で3胞体、2次で2胞体が増えます。[胞体ごとの相対群の分解](#thm-atop22-relative-cells) によって各相対群の指定次数だけが自由群となり、

$$
C_0^{\rm cell}=\mathbb Z,\quad C_1^{\rm cell}=\mathbb Z^3,
\quad C_2^{\rm cell}=\mathbb Z^2
$$

です。他は零です。付着写像をまだ指定していないので $d_2$ はこの情報だけでは決まりません。
<!-- solution-end -->

### 演習 ATOP22-A2：端点差

- Level: A

頂点 $v,w$ を二本の辺 $e,f$ で結ぶ。$e$ は $v$ から $w$、$f$ は $w$ から $v$ とする。胞体境界の行列と全ホモロジー群を求めよ。

<!-- solution-start -->
**詳細解答**

終域の基底を $(v,w)$、始域の基底を $(e,f)$ とします。[胞体鎖群と胞体境界](#def-atop22-cellular-chain) により $d_1(e)=w-v$、$d_1(f)=v-w$ です。これらの座標を列に置くと

$$
d_1=\begin{pmatrix}-1&1\\1&-1\end{pmatrix}.
$$

以下、$(x,y)$ は $xe+yf$ の整数座標です。境界は $(-x+y)v+(x-y)w$ なので、行列を作用させると $(-x+y,x-y)$ となります。核の条件は $x=y=t\in\mathbb Z$ です。2胞体がないので [胞体ホモロジー定理](#thm-atop22-cellular-comparison) から $H_1=\mathbb Z[e+f]$ です。像は $(-1,1)$ の整数倍で、商では $v=w$ となり $H_0=\mathbb Z$ です。他は零です。
<!-- solution-end -->

### 演習 ATOP22-A3：二つの2球面

- Level: A

一点に2枚の2円板をそれぞれ境界定値写像で貼る。全ホモロジー群と Euler 標数を求めよ。

<!-- solution-start -->
**詳細解答**

$C_0=\mathbb Z,C_1=0,C_2=\mathbb Z^2$、他は零です。$d_2$ の値域は零、$d_1$ の定義域は零なので両方零です。[胞体ホモロジー定理](#thm-atop22-cellular-comparison) により $H_2=\mathbb Z^2,H_0=\mathbb Z$、他は零です。[胞体数の Euler 標数](#thm-atop22-euler) から $\chi=1-0+2=3$ となります。
<!-- solution-end -->

### 演習 ATOP22-A4：実射影3空間

- Level: A

$\mathbb RP^3$ の全整数係数ホモロジー群を計算せよ。

<!-- solution-start -->
**詳細解答**

[実射影空間の胞体境界](#prop-atop22-projective-boundary) により $d_3=0,d_2=2,d_1=0$ です。最高次の核は $\mathbb Z$ で上からの像は零です。2次では倍写像の核が零、1次では核が $\mathbb Z$ で上からの像が $2\mathbb Z$ です。0次では像が零です。従って [胞体ホモロジー定理](#thm-atop22-cellular-comparison) から

$$
H_3=\mathbb Z,\quad H_2=0,\quad
H_1=\mathbb Z/2\mathbb Z,\quad H_0=\mathbb Z
$$

で、他は零です。
<!-- solution-end -->

### 演習 ATOP22-B1：外周語から行列へ

- Level: B

一点、二つのループ $a,b$ と2胞体 $p,q$ を持ち、付着語を $a^2b^{-1}$ と $ab^2$ とする。全ホモロジー群を求めよ。

<!-- solution-start -->
**詳細解答**

[胞体境界の係数公式](#thm-atop22-incidence) に続く外周の向き付き出現回数の計算法から $d_2(p)=2a-b$、$d_2(q)=a+2b$ です。始域の基底 $(p,q)$、終域の基底 $(a,b)$ でそれぞれの像を列に置くと

$$
d_2=\begin{pmatrix}2&1\\-1&2\end{pmatrix},\qquad d_1=0.
$$

鎖 $xp+yq$（$x,y\in\mathbb Z$）の境界が零となる条件は

$$
2x+y=0,\qquad -x+2y=0
$$

です。$y=-2x$ を入れると $-5x=0$、従って $x=y=0$ です。

商群の関係式は $b=2a$ と $a+2b=0$ です。代入すると $5a=0$ となります。

逆に $a\mapsto1,b\mapsto2$ は $\mathbb Z/5\mathbb Z$ への全射で二関係を零にするので $a$ の位数はちょうど5です。よって [胞体ホモロジー定理](#thm-atop22-cellular-comparison) から $H_2=0,H_1=\mathbb Z/5\mathbb Z,H_0=\mathbb Z$、他は零です。
<!-- solution-end -->

### 演習 ATOP22-B2：高次胞体の影響

- Level: B

有限 CW 複体の骨格に4胞体を付けるとき、$H_1,H_2$ が変わらない理由を長完全列で示せ。$H_3$ が変化し得ることも説明せよ。

<!-- solution-start -->
**詳細解答**

古い骨格を $A=X^3$、新しい骨格を $Y=X^4$ とします。[胞体ごとの相対群の分解](#thm-atop22-relative-cells) により $H_k(Y,A)=0$ は $k\ne4$ で成立します。$j=1,2$ では [対のホモロジー長完全列](../ATOP18/index.md#thm-atop18-long-exact) の部分

$$
0=H_{j+1}(Y,A)\to H_j(A)\to H_j(Y)
\to H_j(Y,A)=0
$$

から中央の包含誘導写像は同型です。$j=3$ では左端が $H_4(Y,A)$ となり、接続の像が $H_3(A)$ の中で消えます。例えば $A=S^3$ に4円板を恒等付着すれば $Y=D^4$ となり、$H_3$ は $\mathbb Z$ から零に変わります。
<!-- solution-end -->

### 演習 ATOP22-B3：向きの変更

- Level: B

演習 B1 の $p$ と $b$ の基底の向きを逆転する。新しい境界行列を求め、核と商の型が変わらないことを説明せよ。

<!-- solution-start -->
**詳細解答**

古い行列を $M$ とし、新しい2次基底を $(-p,q)$、1次基底を $(a,-b)$ とします。2次の座標から古い座標への行列も、古い1次座標から新しい座標への行列も符号反転の対角行列です。従って

$$
\begin{aligned}
M'&=\begin{pmatrix}1&0\\0&-1\end{pmatrix}
M\begin{pmatrix}-1&0\\0&1\end{pmatrix}\\
&=\begin{pmatrix}-2&1\\-1&-2\end{pmatrix}.
\end{aligned}
$$

右の対角行列を $P$、左の対角行列を $Q$ とします。$P^2=Q^2=I_2$ なので両方とも整数座標の自己同型です。$M'x=0$ は $M(Px)=0$ と同値なので $\ker M'=P^{-1}\ker M$ です。また $\operatorname{im} M'=Q(\operatorname{im} M)$ なので、$[y]\mapsto[Qy]$ は古い像による商から新しい像による商への同型です。従って $H_2=0,H_1=\mathbb Z/5\mathbb Z$ は変わりません。
<!-- solution-end -->

### 演習 ATOP22-C1：同じ Euler 標数の閉曲面

- Level: C

向き付け可能な種数2の閉曲面と、向き付け不可能な種数4の閉曲面の整数胞体鎖から、Euler 標数が同じでも同相でないことを証明せよ。

<!-- solution-start -->
**詳細解答**

[コンパクト閉曲面の分類・存在部分](../ATOP11/index.md#thm-atop11-surface-existence) の標準形を使います。前者の付着語は $a_1b_1a_1^{-1}b_1^{-1}a_2b_2a_2^{-1}b_2^{-1}$ です。後者は $c_1^2c_2^2c_3^2c_4^2$ です。どちらも鎖群の階数は次数0,1,2の順に $1,4,1$ であり、[胞体数の Euler 標数](#thm-atop22-euler) から $\chi=1-4+1=-2$ です。

両者とも頂点一つなので $d_1=0$ です。[胞体境界の係数公式](#thm-atop22-incidence) に続く多角形の計算法により、前者は各辺の符号が相殺して $d_2=0$ なので [胞体ホモロジー定理](#thm-atop22-cellular-comparison) から $H_2=\mathbb Z,H_1=\mathbb Z^4$ です。後者では

$$
d_2(1)=2(c_1+c_2+c_3+c_4).
$$

核は零です。$s=c_1+c_2+c_3+c_4$ と置けば $c_1=s-c_2-c_3-c_4$ なので $(s,c_2,c_3,c_4)$ は整数基底です。像は $2s$ の整数倍です。商では $s$ の位数が2となり、残りの三基底に関係はありません。従って $H_2=0,H_1=\mathbb Z^3\oplus\mathbb Z/2\mathbb Z$ です。一次群はねじれの有無が異なり同型ではありません。同相なら特異ホモロジーが同型になるので、この二曲面は同相ではありません。
<!-- solution-end -->

## 8. まとめ

胞体を貼った各層の相対群は一胞体につき一つの整数生成元を持ちます。接続と商への写像から有限の境界行列を作り、特異ホモロジーを計算できました。付着写像の球面上の整数係数が境界行列を決めます。次講ではその整数を写像度として体系的に調べます。
