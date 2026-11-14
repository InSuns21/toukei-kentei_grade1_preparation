# AQFT34 自由場net・真空・モジュラー流・相対情報の総合演習

一つの時空領域だけを見れば、自由場のWeyl作用素は単にユニタリ作用素の族です。しかし、時空の領域を動かすと「どの観測量を測れるか」が変わり、同じ二状態でも区別できたり、できなかったりします。さらに、真空のモジュラー時間は右wedgeではLorentz boostですが、励起状態のモジュラー時間まで同じとは限りません。

これまでの構成を**質量 $m>0$ の四次元Minkowski時空における実・中性Klein–Gordon自由場の真空Fock表現**で統一して確かめます。計量符号は $(-,+,+,+)$、$c=\hbar=1$ とします。次の四つの問いを、同じWeylユニタリから追います。

1. 因果的に離れた領域で、局所励起はなぜ検出できないか。
2. 真空の巡回・分離性と幾何学的モジュラー流は、どの仮定によって成り立つか。
3. 局所代数を小さくすると、二状態の相対情報はどう変わるか。
4. 緩衝領域がある場合だけ、どんなテンソル積的解釈が可能になるか。

既習の主要定理は適用条件を明示して利用します。ここでは一般の相互作用模型、すべてのnetのType III性、DHR再構成を新しく証明するものではありません。

## 1. 商空間から局所観測量を取り出す

実試験関数空間を $\mathcal D=C_c^\infty(\mathbb R^{1,3},\mathbb R)$、Klein–Gordon作用素を

$$
P=\partial_t^2-\Delta_{\boldsymbol x}+m^2,
\qquad
\mathcal V=\mathcal D/P\mathcal D
$$

とします。$E=G_{\mathrm{ret}}-G_{\mathrm{adv}}$ の順序を採ると、[因果伝播子からのシンプレクティック形式](../AQFT5/index.md#def-aqft5-causal-symplectic)は

$$
\sigma([f],[g])=-\int_{\mathbb R^{1,3}}f(x)(Eg)(x)\,d^4x
$$

です。$F,G$ は商空間 $\mathcal V$ の元、$f,g$ はそれぞれの代表元とします。開領域 $O$ に対し $\mathcal V(O)$ は $O$ 内に支持を持つ実試験関数の像です。**代表元を変えても** $\sigma$ と $W(F)$ が変わらないことが重要です。

[Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)と[真空Fock表現の構成](../AQFT8/index.md#def-aqft8-fock-weyl)を使い、以後 $W(F)$ は真空Fock空間 $\mathcal H=\mathcal F_s(\mathfrak h)$ 上の有界ユニタリとします。

$$
W(F)W(G)=e^{-i\sigma(F,G)/2}W(F+G),
\quad
W(F)^*=W(-F).
$$

真空を $\Omega$、正周波数写像を $K:\mathcal V\to\mathfrak h$ とすると、[Fock真空の特性汎関数](../AQFT8/index.md#prop-aqft8-fock-weyl)は

$$
\omega_0(W(F))
=\langle\Omega,W(F)\Omega\rangle
=\exp\left(-\frac{\|KF\|_{\mathfrak h}^2}{2}\right)>0.
$$

開領域の局所von Neumann環は[局所Fock環の定義](../AQFT9/index.md#def-aqft9-fock-local-vn)に従い

$$
\mathcal M(O)=\{W(F):F\in\mathcal V(O)\}''
\subset B(\mathcal H)
$$

とします。右辺の二重可換子は同じHilbert空間上で取ります。[Weyl関係の交換位相](../AQFT6/index.md#prop-aqft6-weyl-commutator)を二回掛ければ

$$
\begin{aligned}
W(F)W(G)&=e^{-i\sigma(F,G)/2}W(F+G),\\
W(G)W(F)&=e^{+i\sigma(F,G)/2}W(F+G),\\
W(F)W(G)&=e^{-i\sigma(F,G)}W(G)W(F).
\end{aligned}
$$

[因果支持による直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から、$O_1,O_2$ が空間的に分離していれば $\sigma(\mathcal V(O_1),\mathcal V(O_2))=0$。従って生成元同士が可換であり、[局所von Neumann環への継承定理](../AQFT9/index.md#thm-aqft9-isotony-locality)によって

$$
\mathcal M(O_1)\subset\mathcal M(O_2)'
$$

です。ここは包含であって、Haag双対性の等号を勝手に仮定していません。

## 2. 一つのWeylユニタリで二状態を作る

真空と別の状態を比べるには、新しいHilbert空間を導入する必要はありません。実試験関数の商元 $H\in\mathcal V$ を選び、そのWeylユニタリで真空ベクトルを動かします。空間的に分離した領域では励起の影響が消えますが、他の観測量では位相として検出できます。

<a id="def-aqft34-weyl-excitation"></a>

<!-- formal-statement-start -->
> **定義（局所Weyl励起状態）**  
> $m>0$ の実自由スカラー場の真空Fock表現と開領域 $O$ を固定する。$H\in\mathcal V(O)$ を選び、$U_H=W(H)$ と置く。全環 $B(\mathcal H)$ 上のベクトル状態と、その局所von Neumann環への制限を

$$
\omega_H(A)=\langle U_H\Omega,A U_H\Omega\rangle,
\qquad
\omega_H|_{\mathcal M(O_1)}\quad (O_1\text{ は開領域})
$$

> と定める。$\omega_0$ は $H=0$ の場合である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-aqft34-weyl-excitation -->
### 直接例：正規性と測定可能な位相

$H=[h]\in\mathcal V(O)$ とし、$h$ は $O$ にコンパクト支持を持つ実試験関数とします。$U_H=W(H)$ は $W(H)^*W(H)=W(0)=I$ を満たすので $\|U_H\Omega\|=1$ です。従って $\omega_H(I)=1$、任意の $A\in B(\mathcal H)$ に対して

$$
\omega_H(A^*A)=\|AU_H\Omega\|^2\ge0.
$$

ベクトル状態なので正規であり、局所von Neumann環へ制限しても正規です。さらに任意の $F\in\mathcal V$ に対し、Weyl積を順番に展開すると

$$
\begin{aligned}
U_H^*W(F)U_H
&=W(-H)W(F)W(H)\\
&=e^{i\sigma(H,F)/2}e^{-i\sigma(F-H,H)/2}W(F)\\
&=e^{i\sigma(H,F)}W(F).
\end{aligned}
$$

最後の等号には $\sigma(F-H,H)=\sigma(F,H)=-\sigma(H,F)$ を使いました。よって

$$
\omega_H(W(F))
=e^{i\sigma(H,F)}e^{-\|KF\|^2/2}.
$$

**定義の確認**：$H$ が局所商の元であること、$U_H$ のユニタリ性、状態の正値性・規格化・正規性、制限の意味をそれぞれ検証しました。この位相公式は、同じ状態を真空と取り違えないための手計算にも使えます。
<!-- definition-example-end -->

<a id="prop-aqft34-local-invisibility"></a>

<!-- formal-statement-start -->
> **命題（空間的に分離した領域からは励起を見分けられない）**  
> 上記の真空Fock表現で $H\in\mathcal V(O_H)$ とし、開領域 $O_1$ は $O_H$ と空間的に分離しているとする。このとき

$$
\omega_H|_{\mathcal M(O_1)}
=\omega_0|_{\mathcal M(O_1)}.
$$

> 一方、ある $F\in\mathcal V(O_2)$ で $\sigma(H,F)\notin 2\pi\mathbb Z$ なら、$\omega_H$ と $\omega_0$ は $\mathcal M(O_2)$ 上で異なる。
<!-- formal-statement-end -->

### 証明の見取り図

励起が局所von Neumann環と可換なら、その局所von Neumann環のどの観測量の期待値も真空と同じです。違いを検出するときは、真空のWeyl期待値が零でないことと、位相が1でないことを使います。

<!-- proof-start -->
### 証明

$H\in\mathcal V(O_H)$ だから $U_H\in\mathcal M(O_H)$ です。$O_1$ と $O_H$ が空間的に分離すれば、[局所性の継承](../AQFT9/index.md#thm-aqft9-isotony-locality)より $U_H\in\mathcal M(O_1)'$ です。従って任意の $A\in\mathcal M(O_1)$ に対し

$$
\begin{aligned}
\omega_H(A)
&=\langle\Omega,U_H^*AU_H\Omega\rangle\\
&=\langle\Omega,A U_H^*U_H\Omega\rangle
=\langle\Omega,A\Omega\rangle=\omega_0(A).
\end{aligned}
$$

これは生成元だけでなく、局所von Neumann環の**すべての**元について成立します。

一方、仮定した $F\in\mathcal V(O_2)$ の $W(F)$ は $\mathcal M(O_2)$ に属し、上の直接計算から

$$
\omega_H(W(F))-\omega_0(W(F))
=(e^{i\sigma(H,F)}-1)e^{-\|KF\|^2/2}\ne0.
$$

したがって二状態の $\mathcal M(O_2)$ への制限は異なります。一般に $H\ne0$ というだけで任意の小領域 $O_2$ に検出可能な $F$ があるとは主張していません。
<!-- proof-end -->

具体的な配置として、$t=x^0$ と $\boldsymbol x=(x^1,x^2,x^3)$ を使い

$$
D_\varepsilon(a)=
\{(t,\boldsymbol x):|t|+\|\boldsymbol x-(a,0,0)\|<\varepsilon\}
$$

とします。$0<\varepsilon<1/2$ なら $D_\varepsilon(-1)$ と $D_\varepsilon(1)$ の点は、時間差の絶対値が $2\varepsilon$ 未満、空間距離が $2-2\varepsilon$ より大きく、$2\varepsilon<2-2\varepsilon$ なので空間的に分離しています。両方とも $D_3(0)$ に含まれます。この幾何で $O_1=D_\varepsilon(-1)$、$O_H=D_\varepsilon(1)$、$O_2=D_3(0)$ と取れば、上の「小領域では一致、大領域では識別できる」配置を用意できます。後者には $O_H$ 内で位相を検出する $F$ が選ばれたことを別途確認します。

## 3. 巡回・分離な真空から幾何学的時間へ

局所励起の話と真空のモジュラー流は、同じ真空Fock空間上の別々の主張です。[Reeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)は、この自由場真空に対して適切な局所領域の巡回性を与えます。領域の因果補集合に非空な開集合があり、そこで真空が巡回的なら、[局所性と巡回性による分離性](../AQFT13/index.md#thm-aqft13-complement-cyclicity-separating)が成り立ちます。

たとえば $O=D_r(0)$ は有界double coneであり、補領域に非空な開領域を持ちます。もし $A\in\mathcal M(O)$ で $A\Omega=0$ なら、補領域の局所演算子 $B$ と可換なので

$$
AB\Omega=BA\Omega=0.
$$

補領域側の $\{B\Omega\}$ の線形包は稠密で、$A$ は有界です。ゆえに $A=0$。これが分離性の導出であり、単に「正エネルギーだから分離的」と言っているわけではありません。

右wedgeを $W_R=\{x:x^1>|x^0|\}$ とし、$01$ 平面に作用するboostを

$$
\Lambda(s)|_{01}=
\begin{pmatrix}\cosh s&\sinh s\\
\sinh s&\cosh s\end{pmatrix}
$$

とします。[自由場のBisognano–Wichmann定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)と[モジュラーKMS性](../AQFT25/index.md#thm-aqft25-modular-kms)を適用すると、**真空**と $\mathcal M(W_R)$ の標準対に対し

$$
\Delta_{W_R,\Omega}^{it}=U(\Lambda(-2\pi t)),\qquad
\sigma_t^\Omega(A)=
U(\Lambda(-2\pi t))A U(\Lambda(2\pi t))
$$

で、真空制限はこのモジュラー時間の逆温度1のKMS状態です。ここで $\Delta_{W_R,\Omega}$ は真空ベクトルについてのモジュラー作用素、$U$ はboostのユニタリ表現です。**rapidityは $-2\pi t$** であって $+2\pi t$ ではありません。

励起したベクトルが同じ環に対して標準なら、モジュラー作用素の関係も直接求められます。ただし、得られるのは一般に真空のboost流そのものではありません。

<a id="prop-aqft34-excited-modular"></a>

<!-- formal-statement-start -->
> **命題（局所ユニタリ励起のモジュラー流）**  
> $(\mathcal M,\Omega)$ を巡回・分離な標準対とし、$V\in\mathcal M$ をユニタリとする。$\Omega_V=V\Omega$ は $\mathcal M$ に対して巡回・分離であり、各モジュラー作用素と流は

$$
\Delta_{\Omega_V}=V\Delta_\Omega V^*,
\qquad
\sigma_t^{\Omega_V}(A)
=V\sigma_t^\Omega(V^*AV)V^*
$$

> を満たす。特に $\mathcal M=\mathcal M(W_R)$、$V=W(H)$、$H\in\mathcal V(W_R)$ のとき右辺の $\sigma_t^\Omega$ は上のboostである。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal M$ のユニタリで標準ベクトルを移すと、代数は同じまま、Tomita作用素の定義式をユニタリ共役で移せます。極分解を取ってモジュラー作用素の関係を得ます。

<!-- proof-start -->
### 証明

$V\mathcal M V^*=\mathcal M$ なので

$$
\mathcal M(V\Omega)=V\mathcal M\Omega
$$

は稠密で、$\Omega_V$ は巡回的です。$A V\Omega=0$ なら $V^*AV\Omega=0$ であり、$\Omega$ の分離性から $V^*AV=0$、従って $A=0$ です。

[Tomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)を使います。$A\in\mathcal M$ とし、$B=V^*AV\in\mathcal M$ と置くと、初期定義域上で

$$
\begin{aligned}
(VS_\Omega V^*)(AV\Omega)
&=VS_\Omega(B\Omega)\\
&=VB^*\Omega=A^*V\Omega\\
&=S_{\Omega_V}(AV\Omega).
\end{aligned}
$$

$V$ がユニタリなので初期定義域、グラフ、閉包が対応します。従って閉じた反線形作用素として $S_{\Omega_V}=VS_\Omega V^*$。反線形随伴についても $S_{\Omega_V}^{\sharp}=VS_\Omega^{\sharp}V^*$ なので

$$
\Delta_{\Omega_V}
=S_{\Omega_V}^{\sharp}S_{\Omega_V}
=V S_\Omega^{\sharp}S_\Omega V^*
=V\Delta_\Omega V^*.
$$

スペクトル関数計算から $\Delta_{\Omega_V}^{it}=V\Delta_\Omega^{it}V^*$。これを $A$ に共役作用させると主張の流が得られます。wedgeの場合は、$V\in\mathcal M(W_R)$ と[AQFT27の真空定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)の仮定が揃うのでboost表示を代入できます。
<!-- proof-end -->

KMS性は[AQFT25の一般モジュラーKMS定理](../AQFT25/index.md#thm-aqft25-modular-kms)により $\omega_H$ の**自身のモジュラー流**についても成立します。しかし $\omega_H$ が真空boostに関するKMS状態である、という結論にはなりません。物理時間・モジュラー時間・状態の三者を区別してください。

## 4. 部分環の制限と失われる相対情報

局所netでは $\mathcal M(O_1)\subset\mathcal M(O_2)$ が成り立つとき、二状態の制限を比較できます。[部分環上の正規状態の制限](../AQFT33/index.md#def-aqft33-restriction)は、同じ作用素への期待値を小さい環の上で読む操作です。

<a id="prop-aqft34-information-loss"></a>

<!-- formal-statement-start -->
> **命題（局所励起による相対情報の不可逆な消失）**  
> 同一の自由場真空Fock表現で $O_1\subset O_2$ とし、$H\in\mathcal V(O_H)$ が $O_1$ と空間的に分離しているとする。$\rho=\omega_H|_{\mathcal M(O_2)}$、$\eta=\omega_0|_{\mathcal M(O_2)}$ と置く。さらにある $F\in\mathcal V(O_2)$ で $\sigma(H,F)\notin2\pi\mathbb Z$ とする。このとき

$$
\begin{gathered}
S_{\mathrm A}^{\mathcal M(O_1)}
(\rho|_{\mathcal M(O_1)}\Vert\eta|_{\mathcal M(O_1)})=0,\\
0<
S_{\mathrm A}^{\mathcal M(O_2)}(\rho\Vert\eta)
\le+\infty.
\end{gathered}
$$

> 二状態は同一表現上の正規状態であり、局所von Neumann環がType IIIでも主張は変わらない。大領域側の値の有限性は仮定しない。
<!-- formal-statement-end -->

### 証明の見取り図

小領域では励起ユニタリが全観測量と可換なため状態が一致します。大領域では位相を検出するWeyl観測量があるため状態が異なります。この二点を、一般のAraki相対エントロピーの零条件と単調性へ代入します。

<!-- proof-start -->
### 証明

$\rho,\eta$ は全Hilbert空間上のベクトル状態の制限だから正規です。[局所包含の継承](../AQFT9/index.md#thm-aqft9-isotony-locality)により $\mathcal N=\mathcal M(O_1)\subset\mathcal M=\mathcal M(O_2)$ であり、[本章の局所不可視性](#prop-aqft34-local-invisibility)から $\rho|_{\mathcal N}=\eta|_{\mathcal N}$ です。[相対エントロピーの零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)をこの**小さい環 $\mathcal N$** に適用して $S_{\mathrm A}^{\mathcal N}=0$ を得ます。

次に $F$ を命題の仮定で選んだ元とします。[局所Weyl励起状態](#def-aqft34-weyl-excitation)の直接例で導いた位相式に $\sigma(H,F)\notin2\pi\mathbb Z$ を代入すると、$\rho(W(F))\ne\eta(W(F))$ です。従って $\rho\ne\eta$ は**大きい環 $\mathcal M$** 上の主張です。再び[AQFT32の零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)より $S_{\mathrm A}^{\mathcal M}>0$（$+\infty$ を含む）です。

最後に、二状態が同一環 $\mathcal M$ 上で正規であり、$\mathcal N\subset\mathcal M$ は単位元を共有することを確認したので、[一般のAraki単調性](../AQFT33/index.md#thm-aqft33-monotonicity)を適用できます。これは $0\le S_{\mathrm A}^{\mathcal M}$ と一致します。どの段階にも有限次元の密度行列や局所部分トレースは使っていません。
<!-- proof-end -->

比較のため、Type Iの二準位模型では数値まで出せます。$\mathcal M=M_2(\mathbb C)$、$\mathcal N$ を対角部分環とし、

$$
\rho=\begin{pmatrix}3/4&0\\0&1/4\end{pmatrix},
\qquad
\eta=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}
$$

とします。$\eta$ の固有値は $3/4,1/4$、両状態は正定値・トレース1です。[有限次元へのAraki式の還元](../AQFT30/index.md#thm-aqft30-finite-reduction)を用いれば

$$
S_{\mathrm A}^{\mathcal M}(\rho\Vert\eta)
=\tfrac14\log3,
\qquad
S_{\mathrm A}^{\mathcal N}(\rho|_{\mathcal N}\Vert\eta|_{\mathcal N})
=\tfrac34\log3-\log2.
$$

差は $\log2-\tfrac12\log3=\log(2/\sqrt3)>0$ です。これは**有限次元での検算**であり、Type IIIの計算をトレースへ還元したものではありません。

## 5. 緩衝領域があるときだけのテンソル積的解釈

局所性は「空間的に分離した二つの局所von Neumann環が可換」という条件です。それだけではHilbert空間の厳密なテンソル分解も、任意の正規状態を積状態として延長できることも保証しません。

有界double coneを $D_r(0)\Subset D_R(0)$（$0<r<R$）とします。[split inclusionの定義](../AQFT16/index.md#def-aqft16-split-inclusion)では、次を満たすType I因子 $\mathcal I$ の存在を**追加で仮定**します。

$$
\mathcal M(D_r(0))\subset\mathcal I
\subset\mathcal M(D_R(0)).
$$

[splitの空間テンソル表示](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)をこの包含に適用すると、適切なHilbert空間のテンソル積表示で、内側の $\mathcal M(D_r(0))$ と外側の $\mathcal M(D_R(0))'$ を互いに異なるテンソル因子上で作用させられます。さらに[split包含における任意の正規積状態延長](../AQFT17/index.md#thm-aqft17-normal-product-extension)により、指定した両側の正規状態を同時に再現する正規積状態を構成できます。

ただし、その積状態が真空であるとは言っていません。また中間の $\mathcal I$ がType Iでも、内側の局所von Neumann環そのものがType Iになるわけではありません。splitを保証する十分な解析条件の一般論には、[nuclearityからsplitへの条件付き結果](../AQFT17/index.md#thm-aqft17-nuclearity-split-literature)のように別の仮定が必要です。真空のReeh–Schlieder性や局所性だけからsplitを導かないでください。

## 6. 総合演習

各問では、採用する環・領域・状態を確認してから計算してください。前半は式と仮定の単独検算、後半は複数講義の結果の接続です。

### Level A：記号・符号・適用条件

<a id="ex-aqft34-a01"></a>
#### AQFT34-A01 Weyl位相の向きを固定する
- Level: A

$\sigma(H,F)=\pi/2$ とする。$W(H)^*W(F)W(H)$ を $W(F)$ で表し、$\omega_H(W(F))/\omega_0(W(F))$ を求めよ。$\omega_0(W(F))>0$ を使ってよい。

<!-- solution-start -->
**詳細解答。** [Weyl関係](../AQFT6/index.md#def-aqft6-weyl-ccr)の二回の積から

$$
\begin{aligned}
W(H)^*W(F)W(H)
&=W(-H)W(F)W(H)\\
&=e^{i\sigma(H,F)/2}e^{-i\sigma(F-H,H)/2}W(F)\\
&=e^{i\sigma(H,F)}W(F)=iW(F).
\end{aligned}
$$

従って $\omega_H(W(F))=i\omega_0(W(F))$、比は $i$ です。交換の位相と共役の位相の符号を混同して $-i$ としないことが重要です。
<!-- solution-end -->

<a id="ex-aqft34-a02"></a>
#### AQFT34-A02 局所状態の正値性と正規性
- Level: A

$U=W(H)$ を真空Fock表現のWeylユニタリとする。$\omega_H(A)=\langle U\Omega,AU\Omega\rangle$ が規格化・正値・正規な状態であることを確かめ、$\mathcal M(O)$ への制限にもこの三性質が残る理由を述べよ。

<!-- solution-start -->
**詳細解答。** [Weylユニタリ性](../AQFT6/index.md#def-aqft6-weyl-ccr)から $U^*U=I$、$\|\Omega\|=1$ なので $\omega_H(I)=\|U\Omega\|^2=1$。任意の $A$ に対して

$$
\omega_H(A^*A)
=\langle AU\Omega,AU\Omega\rangle=\|AU\Omega\|^2\ge0.
$$

また、$A_n\uparrow A$ が有界な正作用素の増大列・網なら、ベクトル内積の単調収束により $\langle U\Omega,A_n U\Omega\rangle\uparrow\langle U\Omega,A U\Omega\rangle$ で、ベクトル汎関数は正規です。$\mathcal M(O)$ は同じ単位元を持つvon Neumann部分環なので、制限は正値性・規格化を保ち、正作用素の単調極限に対する連続性も保ちます（[局所正規状態の定義と適用](../AQFT9/index.md#prop-aqft9-local-normal-state)）。
<!-- solution-end -->

<a id="ex-aqft34-a03"></a>
#### AQFT34-A03 double coneの幾何学
- Level: A

$D_\varepsilon(a)=\{(t,\boldsymbol x):|t|+\|\boldsymbol x-(a,0,0)\|<\varepsilon\}$ とする。$0<\varepsilon<1/2$ のとき $D_\varepsilon(-1)$ と $D_\varepsilon(1)$ が空間的に分離すること、両者が $D_3(0)$ に含まれることを示せ。

<!-- solution-start -->
**詳細解答。** 第一の領域の点 $x$ と第二の領域の点 $y$ について $|t_x|,|t_y|<\varepsilon$、$\|\boldsymbol x-(-1,0,0)\|,\|\boldsymbol y-(1,0,0)\|<\varepsilon$ です。三角不等式から

$$
|t_x-t_y|<2\varepsilon,\qquad
\|\boldsymbol x-\boldsymbol y\|>2-2\varepsilon.
$$

$2\varepsilon<2-2\varepsilon$ なので、すべての点の差は空間的、つまり $-(t_x-t_y)^2+\|\boldsymbol x-\boldsymbol y\|^2>0$ です（[領域の空間的分離の定義](../AQFT1/index.md#def-aqft1-separated-regions)）。またどちらも $|t|+\|\boldsymbol x\|<\varepsilon+1<3$ だから $D_3(0)$ に含まれます。
<!-- solution-end -->

<a id="ex-aqft34-a04"></a>
#### AQFT34-A04 情報量の零条件
- Level: A

同一von Neumann環 $\mathcal M$ の二つの正規状態 $\rho,\eta$ が等しいとき、$S_{\mathrm A}^{\mathcal M}(\rho\Vert\eta)$ はいくつか。異なるとき有限値であると断言できるか。理由を述べよ。

<!-- solution-start -->
**詳細解答。** [Araki相対エントロピーの正値性と零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)により

$$
S_{\mathrm A}^{\mathcal M}(\rho\Vert\eta)=0
\quad\Longleftrightarrow\quad \rho=\eta.
$$

従って同じなら0、異なれば厳密に正です。ただし値域は $[0,+\infty]$ なので $+\infty$ の可能性があります。例えば[支持包含の不成立と無限値](../AQFT31/index.md#def-aqft31-relative-entropy-extended)では異なる純粋状態の比較が無限になります。「異なる」だけから有限な値を主張するのは誤りです。
<!-- solution-end -->

### Level B：複数の既習結果を接続する

<a id="ex-aqft34-b01"></a>
#### AQFT34-B01 観測できない励起を全局所von Neumann環で証明する
- Level: B

$H\in\mathcal V(O_H)$、$O_H$ と $O_1$ は空間的に分離するとする。$\sigma(H,F)=0$ が $F\in\mathcal V(O_1)$ に成立することから、$\omega_H(A)=\omega_0(A)$ が任意の $A\in\mathcal M(O_1)$ に成立するまで証明せよ。なぜ生成元上の一致だけで議論を止めないのか。

<!-- solution-start -->
**詳細解答。** [因果伝播子の局所直交性](../AQFT5/index.md#prop-aqft5-local-orthogonality)から $\sigma(H,F)=0$ です。[Weylの交換位相](../AQFT6/index.md#prop-aqft6-weyl-commutator)により $W(H)W(F)=W(F)W(H)$。よって $W(H)$ は生成元の各々と、その有限線形結合・積・随伴と可換です。可換子は弱作用素位相で閉じているため、それらの二重可換子 $\mathcal M(O_1)$ の全元とも可換です（[局所性のvon Neumann環への継承](../AQFT9/index.md#thm-aqft9-isotony-locality)）。従って $A\in\mathcal M(O_1)$ について

$$
\omega_H(A)=\langle\Omega,W(H)^*AW(H)\Omega\rangle
=\langle\Omega,A\Omega\rangle.
$$

一般の $A$ はWeyl生成元そのものではありません。二重可換子への移行を示さなければ、結論の定義域を局所**環全体**へ拡張したことになりません。
<!-- solution-end -->

<a id="ex-aqft34-b02"></a>
#### AQFT34-B02 励起ベクトルのTomita作用素
- Level: B

$(\mathcal M,\Omega)$ を標準対、$V\in\mathcal M$ をユニタリとする。$S_{V\Omega}=VS_\Omega V^*$ と $\Delta_{V\Omega}=V\Delta_\Omega V^*$ を導き、なぜ $\sigma_t^{V\Omega}=\sigma_t^\Omega$ とは一般に言えないか説明せよ。

<!-- solution-start -->
**詳細解答。** $A V\Omega=V(V^*AV)\Omega$ に対して[Tomita初期作用素](../AQFT18/index.md#def-aqft18-tomita-initial)を適用し、

$$
\begin{aligned}
VS_\Omega V^*(AV\Omega)
&=VS_\Omega((V^*AV)\Omega)\\
&=V(V^*A^*V)\Omega=A^*V\Omega
\end{aligned}
$$

を得ます。$V\mathcal M V^*=\mathcal M$ なので両辺の初期定義域は対応し、閉包も一致します。反線形随伴を取って $S_{V\Omega}^\sharp=VS_\Omega^\sharp V^*$、従って $\Delta_{V\Omega}=V\Delta_\Omega V^*$ です。ゆえに流は

$$
\sigma_t^{V\Omega}(A)
=V\sigma_t^\Omega(V^*AV)V^*.
$$

$V$ による内部自己同型が $\sigma_t^\Omega$ と可換でなければ同一流とはいえません。[自由場wedgeのboost同定](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)は真空ベクトルに対する主張なので、この差を無視して励起状態にも同じboostを代入できません。
<!-- solution-end -->

<a id="ex-aqft34-b03"></a>
#### AQFT34-B03 非可換二準位模型での減少量
- Level: B

$\rho=\operatorname{diag}(3/4,1/4)$、$\eta=\begin{pmatrix}1/2&1/4\\1/4&1/2\end{pmatrix}$ を $M_2(\mathbb C)$ 上の状態とする。対角部分環への制限を考え、両環の相対エントロピーと差を対数の式で求め、単調性を検算せよ。

<!-- solution-start -->
**詳細解答。** $\rho$ の固有値は $3/4,1/4$、$\eta$ の固有値も $3/4,1/4$ です。$\eta$ の対角を同じ値へ保つユニタリ対角化から

$$
\log\eta=\frac12
\begin{pmatrix}
\log(3/4)+\log(1/4)&\log(3/4)-\log(1/4)\\
\log(3/4)-\log(1/4)&\log(3/4)+\log(1/4)
\end{pmatrix}.
$$

したがって、[Araki相対エントロピーの忠実有限次元還元](../AQFT30/index.md#thm-aqft30-finite-reduction)により

$$
\begin{aligned}
\operatorname{Tr}(\rho\log\rho)&=\frac34\log\frac34+\frac14\log\frac14=\frac34\log3-\log4,\\
\operatorname{Tr}(\rho\log\eta)&=\frac12\left(\log\frac34+\log\frac14\right)=\frac12\log3-\log4,\\
S_{\mathcal M}(\rho\Vert\eta)&=\frac14\log3.
\end{aligned}
$$

対角部分環では $\rho=(3/4,1/4)$、$\eta=(1/2,1/2)$ なので

$$
S_{\mathcal N}=\frac34\log\frac{3/4}{1/2}+\frac14\log\frac{1/4}{1/2}
=\frac34\log3-\log2.
$$

差は

$$
S_{\mathcal M}-S_{\mathcal N}
=\log2-\frac12\log3=\log(2/\sqrt3)>0
$$

です。これは[AQFT33の単調性](../AQFT33/index.md#thm-aqft33-monotonicity)を有限次元で確認したものです。$\rho\eta\ne\eta\rho$ であっても、制限で情報量は増えません。
<!-- solution-end -->

<a id="ex-aqft34-b04"></a>
#### AQFT34-B04 splitの追加仮定と真空
- Level: B

$D_r\Subset D_R$ で、$\mathcal M(D_r)\subset\mathcal I\subset\mathcal M(D_R)$ を満たすType I因子 $\mathcal I$ が存在するとする。$\mathcal M(D_r)$ と $\mathcal M(D_R)'$ の正規積状態の存在を説明し、(i) その積状態が真空、(ii) $\mathcal M(D_r)$ 自身がType I、という二主張がなぜ従わないか述べよ。

<!-- solution-start -->
**詳細解答。** 仮定は[split inclusion](../AQFT16/index.md#def-aqft16-split-inclusion)そのものです。[Type I中間因子の空間表示](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)によって、あるユニタリ表示で内側と外側の可換子が別のテンソル因子に作用します。両側に正規状態 $\rho_{\mathrm{in}},\rho_{\mathrm{out}}$ を与えると、[split包含における任意の正規積状態延長](../AQFT17/index.md#thm-aqft17-normal-product-extension)により $AB$ での値が $\rho_{\mathrm{in}}(A)\rho_{\mathrm{out}}(B)$ となる正規状態を構成できます。

(i) 真空に元からその積の期待値公式が成り立つ、という仮定はありません。splitは**積状態を選べる**ことであり、真空の相関の消失ではありません。(ii) 型についての結論は中間因子 $\mathcal I$ のみに関するものです。$\mathcal M(D_r)\subset\mathcal I$ から部分環がType Iとはいえず、特にType III局所von Neumann環をType I因子が包含する状況と矛盾しません。局所性は可換性、splitは中間因子の存在であり、別の条件です。
<!-- solution-end -->

### Level C：同一模型で全体を組み立てる

<a id="ex-aqft34-c01"></a>
#### AQFT34-C01 Weyl励起・局所情報・wedge時間の統合
- Level: C

質量 $m>0$ の実自由場Fock表現で、$O_1=D_\varepsilon(-1)$、$O_H=D_\varepsilon(1)$、$O_2=D_3(0)$、$0<\varepsilon<1/2$ とする。$H\in\mathcal V(O_H)$、$F\in\mathcal V(O_2)$ を $\sigma(H,F)=\pi$ となるよう選べたとする。また右wedge内の別の実源 $J\in\mathcal V(W_R)$ を取る。

1. $O_1,O_H$ の分離と両者の $O_2$ への包含を確かめよ。
2. $\omega_H|_{\mathcal M(O_1)}$ と $\omega_0|_{\mathcal M(O_1)}$ を比較し、$W(F)$ で大領域の違いを判定せよ。
3. 二状態のAraki相対エントロピーの小領域と大領域における値の関係を示せ。有限値と決めつけないこと。
4. 真空に対する $\mathcal M(W_R)$ のモジュラー流を示し、$W(J)\Omega$ のモジュラー流を明示せよ。
5. $D_r\Subset D_R$ のsplitを追加するとどんな結論が増えるか、また何が増えないかを説明せよ。

<!-- solution-start -->
**詳細解答。**

**1.** $x\in O_1,y\in O_H$ なら $|t_x-t_y|<2\varepsilon$、$\|\boldsymbol x-\boldsymbol y\|>2-2\varepsilon$ です。$2\varepsilon<2-2\varepsilon$ により空間的分離が成立します。いずれも $|t|+\|\boldsymbol x\|<1+\varepsilon<3$ なので $O_2$ に含まれます。

**2.** $W(H)\in\mathcal M(O_H)$ は[局所性](../AQFT9/index.md#thm-aqft9-isotony-locality)から $\mathcal M(O_1)$ と可換です。任意の $A\in\mathcal M(O_1)$ で

$$
\omega_H(A)
=\langle\Omega,W(H)^*AW(H)\Omega\rangle
=\omega_0(A).
$$

一方、$W(F)\in\mathcal M(O_2)$ で、[Weyl位相の計算](#def-aqft34-weyl-excitation)から

$$
\omega_H(W(F))=e^{i\pi}\omega_0(W(F))
=-e^{-\|KF\|^2/2}\ne e^{-\|KF\|^2/2}.
$$

従って大領域では二状態が異なります。

**3.** 二状態は同じFock空間上の正規ベクトル状態の制限です。[相対エントロピーの零条件](../AQFT32/index.md#thm-aqft32-positivity-rigidity)を小さい環と大きい環にそれぞれ適用し、さらに[一般の部分環単調性](../AQFT33/index.md#thm-aqft33-monotonicity)を適用すると

$$
0=S_{\mathrm A}^{\mathcal M(O_1)}
(\omega_H\Vert\omega_0)
<
S_{\mathrm A}^{\mathcal M(O_2)}
(\omega_H\Vert\omega_0)\le+\infty.
$$

ここで両辺の $\omega$ は各環への制限を意味します。右辺が有限かどうかを示す追加の推定は行っていません。

**4.** [自由場Bisognano–Wichmann定理](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)から、真空について

$$
\sigma_t^\Omega(A)=U(\Lambda(-2\pi t))A U(\Lambda(2\pi t)).
$$

$V=W(J)\in\mathcal M(W_R)$ はユニタリなので、[局所ユニタリ励起のモジュラー流](#prop-aqft34-excited-modular)より

$$
\sigma_t^{V\Omega}(A)
=V U(\Lambda(-2\pi t))V^*\,A\,
V U(\Lambda(2\pi t))V^*.
$$

$V$ が真空boostで不変であるなどの追加条件なしに二つを等置しません。

**5.** $\mathcal M(D_r)\subset\mathcal I\subset\mathcal M(D_R)$ のType I中間因子が存在するなら、[splitのテンソル表示](../AQFT16/index.md#thm-aqft16-split-tensor-inclusion)と[正規積状態の延長](../AQFT17/index.md#thm-aqft17-normal-product-extension)を利用できます。一方、真空が積状態になる、局所Type III環がType Iへ変化する、$D_r$ の鋭い境界で部分トレースを定義できる、という三結論は導けません。
<!-- solution-end -->

<a id="ex-aqft34-c02"></a>
#### AQFT34-C02 仮定の誤用を正す
- Level: C

Minkowski自由スカラー場の真空Fock表現と、任意の局所netを混同しないよう次の五つを判定し、成立する場合の追加条件または反例の機構を述べよ。

1. 「Einstein局所性さえあれば、すべての局所領域で真空は分離的である。」
2. 「右wedgeの真空モジュラー流がboostなので、任意の局所励起状態でも同じboostである。」
3. 「$O_1\subset O_2$ なら、二つの正規状態のAraki相対エントロピーは $O_1$ で大きくなる。」
4. 「split inclusionがあれば、その内側の鋭い局所von Neumann環はType Iである。」
5. 「自由場のwedgeで幾何学的モジュラー流を知れば、すべてのdouble coneのType III$_1$性が無条件に従う。」

<!-- solution-start -->
**詳細解答。**

**1. 誤り。** 分離性の導出には、空間的な補領域側の真空の巡回性が必要です。[Reeh–Schlieder定理](../AQFT12/index.md#thm-aqft12-reeh-schlieder)のスペクトル・加法性等の仮定を満たす模型なら、補領域の巡回性と[空間的補領域の巡回性から局所分離性へ](../AQFT13/index.md#thm-aqft13-complement-cyclicity-separating)から $A\Omega=0\Rightarrow A=0$ が従います。局所性だけでは $\{B\Omega:B\in\mathcal M(O')\}$ の稠密性が得られず、証明の核心が壊れます。

**2. 誤り。** [自由場の幾何学的モジュラー流](../AQFT27/index.md#thm-aqft27-bisognano-wichmann)は真空対の結果です。$V\in\mathcal M(W_R)$ に対して励起状態の流は[本章のユニタリ共役命題](#prop-aqft34-excited-modular)の $V\sigma_t^\Omega(V^*(\cdot)V)V^*$ です。一般にこれは真空boost流と異なり、同じ流を結論するための不変性条件が抜けています。

**3. 誤り。** [Araki単調性](../AQFT33/index.md#thm-aqft33-monotonicity)は、小さい環への制限で**増えない**と主張します。両状態を同一の大きい環の正規状態として比較する必要があります。局所励起を外した小領域では値が0となる例が[本章の命題](#prop-aqft34-information-loss)です。

**4. 誤り。** [splitの定義](../AQFT16/index.md#def-aqft16-split-inclusion)は中間Type I因子 $\mathcal I$ の存在を仮定するだけです。型は部分環へそのまま遺伝せず、内側の鋭い局所von Neumann環までType Iにはなりません。

**5. 誤り。** [wedgeのモジュラースペクトルの検査](../AQFT28/index.md#prop-aqft28-wedge-modular-spectrum)と、[局所Type III$_1$性の条件付き文献結果](../AQFT28/index.md#thm-aqft28-local-typeiii1-literature)は別です。wedgeの一つのモジュラー作用素からすべてのdouble coneの型を決めるための仮定と橋渡しは与えられていません。まして一般の相互作用netに無条件に拡張できません。
<!-- solution-end -->

## 7. この先に続く理論

自由場で確認した構造は、さらに三つの方向へつながります。これらは今後の学修先であって、本章で新たに証明した結果ではありません。

- **超選択セクター・DHR理論**：一つの真空表現だけではすべての電荷セクターを記述できません。局所化できる表現や圏的な構造を調べる際は、真空netと新しい表現の役割を区別します。
- **局所共変な代数的場の理論**：Minkowski時空のPoincaré共変性を、一般の大域双曲的時空間の埋め込みに対する対応へ置き換えます。曲がった時空上ではHadamard条件やmicrolocal解析が追加で必要です。
- **地平線・重力と情報**：wedgeのboost–KMS対応は、加速観測者の熱的記述への橋を架けます。ただしブラックホールのエントロピーや重力双対の公式を、wedgeの定理だけから導いたわけではありません。

本系列の自由場から得られる正確な結論は、**局所観測可能性は領域に依存し、真空の幾何学的モジュラー時間と相対情報の単調性はそれぞれ異なる仮定・定理によって支えられる**、ということです。演習の式をもう一度、仮定から順に再現してから先へ進んでください。

### 参考文献

- Rudolf Haag, *Local Quantum Physics: Fields, Particles, Algebras*, Springer, 1996.
- Christopher J. Fewster and Kasia Rejzner, [Algebraic Quantum Field Theory – an introduction](https://arxiv.org/abs/1904.04051), 2019.
- Daniele Guido, [Modular theory for the von Neumann algebras of Local Quantum Physics](https://arxiv.org/abs/0812.1511), 2008.
- Huzihiro Araki, [Relative Entropy of States of von Neumann Algebras](https://doi.org/10.2977/prims/1195191148), *Publ. RIMS* 11 (1976).
