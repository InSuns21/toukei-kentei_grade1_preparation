# LREP4 直和・テンソル積・双対表現

<!-- definition-example-audit: strict -->

[LREP1で定義した群表現](../LREP1/index.md#def-lrep1-linear-representation)は、群の各元を一つの複素ベクトル空間の可逆線形変換に対応させます。[LREP2の完全可約性](../LREP2/index.md#def-lrep2-completely-reducible)は、一つの表現を不変部分空間へ分解する話でした。今度は逆に、**すでにある二つの表現から新しい表現を作る**ことを考えます。

二つの状態を別々の成分として並べる操作が**直和**、二つの状態の組合せを線形に扱う操作が**テンソル積**、ベクトルを数値へ写す線形形式に群を作用させる操作が**双対**です。これらを同じ「群の積を保つか」という基準で検査します。最後に、二次元で現れる交代形式 $\epsilon$ がどの群で保存されるかまで計算します。

本講では群 $G$ と、有限次元複素表現 $(V,D)$、$(W,E)$ を考えます。表現は全て群準同型です。Lie 環表現の話題だけは $G$ を有限次元実 Lie 群、$D,E$ を滑らかな表現とします。テンソル積、双対、双線形形式の基礎は [LA3Eのテンソル積](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)と [LA3Aの代数的双対](../../../基礎科目/LA/LA3A/index.md#def-la3a-dual-space)を使います。

## 1. 二つの表現を並べる――直和

$D(g)$ は $V$ に、$E(g)$ は $W$ に作用します。$V\oplus W$ のベクトルを $(v,w)$ と書けば、各成分に別々の行列を作用させられます。二つの成分を混ぜないことがこの構成の特徴です。

<a id="def-lrep4-direct-sum"></a>

<!-- formal-statement-start -->
> **定義（表現の直和）**  
> 群 $G$ の有限次元複素表現 $D:G\to GL(V)$ と $E:G\to GL(W)$ に対し、$V\oplus W$ 上の写像 $D\oplus E$ を
>
$$
(D\oplus E)(g)(v,w)=(D(g)v,E(g)w)
$$
>
> で定める。これを二つの表現の**直和表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep4-direct-sum -->
**定義の確認。** $G=C_2=\{e,s\}$、$s^2=e$ とし、$D(s)=1$ を $\mathbb C$ 上に、$E(s)=-1$ を別の $\mathbb C$ 上に作用させます。いずれも二乗が1です。$V\oplus W\cong\mathbb C^2$ の順序付き基底では
$$
(D\oplus E)(e)=I_2,\qquad
(D\oplus E)(s)=\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$
この行列の二乗も $I_2$ なので、群関係を満たします。二つの座標軸はそれぞれ不変であり、二成分を直和にしたことが行列のブロックから読めます。
<!-- definition-example-end -->

<a id="prop-lrep4-direct-sum"></a>

<!-- formal-statement-start -->
> **命題（直和は表現となる）**  
> 任意の群 $G$ と有限次元複素表現 $(V,D)$、$(W,E)$ に対し、$D\oplus E$ は $V\oplus W$ 上の表現であり、$V\oplus\{0\}$ と $\{0\}\oplus W$ は不変部分空間である。
<!-- formal-statement-end -->

**証明の見取り図。** $D(gh)=D(g)D(h)$、$E(gh)=E(g)E(h)$ を成分ごとに使います。不変性も、一方の座標が零なら作用後も零であることを見ます。

<!-- proof-start -->
### 証明

任意の $g,h\in G$、$(v,w)\in V\oplus W$ について
$$
\begin{aligned}
(D\oplus E)(gh)(v,w)
&=(D(gh)v,E(gh)w)\\
&=(D(g)D(h)v,E(g)E(h)w)\\
&=(D\oplus E)(g)(D\oplus E)(h)(v,w).
\end{aligned}
$$
また $(D\oplus E)(e)=I_{V\oplus W}$ です。逆元は $(D(g)^{-1}\oplus E(g)^{-1})$ となるので各作用は可逆です。最後に
$$
(D\oplus E)(g)(v,0)=(D(g)v,0),\qquad
(D\oplus E)(g)(0,w)=(0,E(g)w)
$$
だから両部分空間は不変です。$\square$
<!-- proof-end -->

逆向きも理解しておきましょう。表現 $(U,F)$ が $U=U_1\oplus U_2$ と**二つの不変部分空間の直和**に分かれるなら、$(u_1,u_2)\mapsto u_1+u_2$ は $(F|_{U_1})\oplus(F|_{U_2})$ と $F$ の [絡作用素](../LREP1/index.md#def-lrep1-intertwiner)です。逆写像もあり、両表現は同値になります。ただし一つの不変部分空間があるだけでは、不変な補空間の存在は保証されません。[LREP2の非分裂模型](../LREP2/index.md#def-lrep2-completely-reducible)との違いです。

## 2. 二つの作用を同時に受ける――テンソル積

直和では $(v,w)$ は「いずれか一方の成分」の和として記述されます。二つの成分の**組合せ**を表すには $v\otimes w$ を使います。[テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)により、二変数の双線形な規則は $V\otimes W$ 上の線形写像を一意に定めます。例えば $v\otimes w$ に $D(g)v\otimes E(g)w$ を対応させれば、テンソル全体にも矛盾なく作用を延長できます。

<a id="def-lrep4-tensor-product"></a>

<!-- formal-statement-start -->
> **定義（表現のテンソル積）**  
> 群 $G$ の有限次元複素表現 $(V,D)$、$(W,E)$ に対し、$V\otimes_{\mathbb C}W$ 上の線形写像を単純テンソルで
>
$$
(D\otimes E)(g)(v\otimes w)
=D(g)v\otimes E(g)w
$$
>
> と定める。これを**テンソル積表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep4-tensor-product -->
**定義の確認。** $G=C_2$、$V=\mathbb C^2$、$D(s)=\operatorname{diag}(1,-1)$、$W=\mathbb C$、$E(s)=-1$ とします。[テンソル積の基底定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)から $e_1\otimes1,e_2\otimes1$ が基底です。各基底ベクトルに作用すると
$$
(D\otimes E)(s)(e_1\otimes1)=-e_1\otimes1,\qquad
(D\otimes E)(s)(e_2\otimes1)=+e_2\otimes1.
$$
従って表示行列は $\operatorname{diag}(-1,1)$、その二乗は $I_2$ です。群の作用条件と、二つの因子の符号が**掛け算**されることを同時に確認できました。
<!-- definition-example-end -->

<a id="thm-lrep4-tensor-representation"></a>

<!-- formal-statement-start -->
> **定理（テンソル積表現の群法則と次元）**  
> 群 $G$ の有限次元複素表現 $D$、$E$ に対し、$D\otimes E$ は $V\otimes W$ 上の表現である。また
>
$$
\dim_{\mathbb C}(V\otimes W)
=(\dim_{\mathbb C}V)(\dim_{\mathbb C}W).
$$
<!-- formal-statement-end -->

**証明の見取り図。** 群法則は単純テンソルで検査し、基底全体へ線形に延長します。次元は二つの基底の全ての組合せを数えます。

<!-- proof-start -->
### 証明

任意の $g,h$ と $v\otimes w$ に対して
$$
\begin{aligned}
(D\otimes E)(g)(D\otimes E)(h)(v\otimes w)
&=(D(g)D(h)v)\otimes(E(g)E(h)w)\\
&=D(gh)v\otimes E(gh)w\\
&=(D\otimes E)(gh)(v\otimes w).
\end{aligned}
$$
単純テンソルは全空間を張るため、線形写像として等しいと分かります。単位元は $I_V\otimes I_W$、逆元は $D(g^{-1})\otimes E(g^{-1})$ です。$V$ の基底を $e_1,\dots,e_m$、$W$ の基底を $f_1,\dots,f_n$ とすれば [LA3Eの基底定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)により $\{e_i\otimes f_j\}_{i,j}$ は基底で、元の数は $mn$ です。$\square$
<!-- proof-end -->

このとき、直和の次元は $m+n$、テンソル積の次元は $mn$ です。$m=n=2$ なら前者は4次元、後者も4次元ですが、作用の行列は一般に異なります。例えば $D(s)=E(s)=\operatorname{diag}(1,-1)$ なら、順序 $e_1\otimes e_1,e_1\otimes e_2,e_2\otimes e_1,e_2\otimes e_2$ で
$$
(D\otimes D)(s)=\operatorname{diag}(1,-1,-1,1)
$$
となります。

### Lie 環に微分すると「積」ではなく「和」になる

[LREP3の群表現の微分定理](../LREP3/index.md#thm-lrep3-differentiation)により、$dD(X)$、$dE(X)$ は Lie 環表現です。テンソル積を微分するときは、二つの因子の積の微分と同様に、片方ずつ微分した項が現れます。

<a id="prop-lrep4-tensor-differential"></a>

<!-- formal-statement-start -->
> **命題（テンソル積表現の微分）**  
> $G$ を有限次元実 Lie 群、$D:G\to GL(V)$、$E:G\to GL(W)$ を滑らかな有限次元複素表現とする。このとき任意の $X\in\mathfrak g$ に対して
>
$$
d(D\otimes E)(X)
=dD(X)\otimes I_W+I_V\otimes dE(X).
$$
<!-- formal-statement-end -->

**証明の見取り図。** $g(t)=\exp_G(tX)$ に沿って $D(g(t))v\otimes E(g(t))w$ を $t=0$ で微分します。

<!-- proof-start -->
### 証明

$D(g(0))=I_V$、$E(g(0))=I_W$ です。双線形写像 $(a,b)\mapsto a\otimes b$ の差商をとると
$$
\begin{aligned}
\left.\frac{d}{dt}\right|_{0}
(D(g(t))v\otimes E(g(t))w)
&=dD(X)v\otimes w+v\otimes dE(X)w\\
&=(dD(X)\otimes I_W+I_V\otimes dE(X))(v\otimes w).
\end{aligned}
$$
ここで一次の交差項は $t^2$ の次数なので微分後は残りません。単純テンソルが全空間を張るため、作用素全体について等式が成立します。$\square$
<!-- proof-end -->

例として $G=(\mathbb R,+)$、$D(t)=e^{at}$、$E(t)=e^{bt}$（$a,b\in\mathbb C$）なら $D\otimes E(t)=e^{(a+b)t}$ で、微分は $a+b$ となります。

## 3. 線形形式を変換する――双対表現

ベクトル $v$ に線形形式 $\varphi\in V^*$ を作用させると $\varphi(v)$ という数を得ます。群で $v$ を $D(g)v$ に動かしたとき、**この数を変えずに**線形形式側も動かしたいとします。そのためには線形形式に $D(g)$ の**逆変換**を事前合成する必要があります。単純な転置を使うと、非可換な群で積の順序が逆転するので表現になりません。

<a id="def-lrep4-dual"></a>

<!-- formal-statement-start -->
> **定義（双対表現）**  
> 群 $G$ の有限次元複素表現 $D:G\to GL(V)$ に対して、$V^*=\operatorname{Hom}_{\mathbb C}(V,\mathbb C)$ 上の写像 $D^\vee$ を
>
$$
(D^\vee(g)\varphi)(v)
=\varphi(D(g^{-1})v)
\quad(g\in G,\ \varphi\in V^*,\ v\in V)
$$
>
> と定める。これを $D$ の**双対表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep4-dual -->
**定義の確認。** $(\mathbb R,+)$ の表現 $D(t)=\operatorname{diag}(e^t,e^{2t})$ を $V=\mathbb C^2$ 上に取ります。$D(-t)=\operatorname{diag}(e^{-t},e^{-2t})$ です。双対基底 $e^1,e^2$ で
$$
D^\vee(t)=\operatorname{diag}(e^{-t},e^{-2t}).
$$
特に $D^\vee(t+s)=D^\vee(t)D^\vee(s)$ です。$v=(x,y)^{\mathsf T}$、$\varphi=\alpha e^1+\beta e^2$ なら
$$
(D^\vee(t)\varphi)(D(t)v)
=e^{-t}\alpha\,e^t x+e^{-2t}\beta\,e^{2t}y
=\alpha x+\beta y=\varphi(v).
$$
数値評価が保存され、逆元が必要な理由を具体的に確認できました。
<!-- definition-example-end -->

<a id="thm-lrep4-dual-action"></a>

<!-- formal-statement-start -->
> **定理（双対は表現となり評価を保存する）**  
> 任意の群 $G$ の有限次元複素表現 $D:G\to GL(V)$ に対し、$D^\vee$ は $V^*$ 上の表現である。双対基底における表示行列は
>
$$
[D^\vee(g)]=[D(g)^{-1}]^{\mathsf T}.
$$
>
> また全ての $g\in G$、$\varphi\in V^*$、$v\in V$ について
>
$$
(D^\vee(g)\varphi)(D(g)v)=\varphi(v)
$$
>
> が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** まず $(gh)^{-1}=h^{-1}g^{-1}$ を使い、双対作用の合成順序を確認します。行列表示では座標を読み取るための [双対基底](../../../基礎科目/LA/LA3A/index.md#def-la3a-dual-basis)を用います。

<!-- proof-start -->
### 証明

任意の $\varphi\in V^*$ と $v\in V$ について
$$
\begin{aligned}
(D^\vee(g)D^\vee(h)\varphi)(v)
&=(D^\vee(h)\varphi)(D(g^{-1})v)\\
&=\varphi(D(h^{-1})D(g^{-1})v)\\
&=\varphi(D((gh)^{-1})v)\\
&=(D^\vee(gh)\varphi)(v).
\end{aligned}
$$
また $D^\vee(e)=I_{V^*}$ であり、$D^\vee(g^{-1})$ が逆作用を与えます。$D(g)$ の列行列を $A$ とすると、$\varphi$ の列係数 $c$ は $\varphi(v)=c^{\mathsf T}[v]$ を満たします。変換後は
$$
(D^\vee(g)\varphi)(v)
=c^{\mathsf T}A^{-1}[v]
=(A^{-\mathsf T}c)^{\mathsf T}[v],
$$
ゆえに表示行列は $A^{-\mathsf T}$ です。評価の式は
$$
(D^\vee(g)\varphi)(D(g)v)
=\varphi(D(g^{-1})D(g)v)=\varphi(v)
$$
から直ちに従います。$\square$
<!-- proof-end -->

$\varphi(v)$ は二つの因子を同時変換した際の不変量です。ただし双対表現と元の表現が常に同値になるわけではありません。例えば1次元の $D(t)=e^t$ は $D^\vee(t)=e^{-t}$ と異なり、もし非零の絡作用素 $c$ が存在すれば $ce^t=e^{-t}c$ が全ての $t$ で必要になるため、$t=1$ で矛盾します。

## 4. 複素共役表現との違い

複素数の係数だけを共役にする操作もあります。しかし複素共役表現は元の $V$ を**同じ複素スカラー倍の空間**として扱うわけではありません。$\overline V$ は元 $\overline v$ を使って表し、スカラー倍を $\lambda\overline v:=\overline{\overline\lambda v}$ とする複素ベクトル空間です。これで $v\mapsto\overline v$ は共役線形、$\overline V$ 上の作用は複素線形になります。

<a id="def-lrep4-conjugate"></a>

<!-- formal-statement-start -->
> **定義（複素共役表現）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ に対し、複素共役空間 $\overline V$ 上の作用を
>
$$
\overline D(g)(\overline v)
=\overline{D(g)v}
$$
>
> と定める。これを**複素共役表現**という。$V$ の基底から得た $\overline V$ の基底では、その行列は $\overline{[D(g)]}$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep4-conjugate -->
**定義の確認。** $C_3=\langle r:r^3=e\rangle$ の1次元表現 $D(r)=\omega=e^{2\pi i/3}$ に対し、共役表現では $\overline D(r)=\overline\omega=\omega^2$ です。$(\omega^2)^3=1$ なので群関係が保たれます。$\overline D(r)(\lambda\overline v)=\lambda\overline D(r)(\overline v)$ が成立するのは、上に指定した $\overline V$ のスカラー倍によります。
<!-- definition-example-end -->

任意の $g,h$ について $\overline D(g)\overline D(h)\overline v=\overline{D(g)D(h)v}=\overline D(gh)\overline v$ なので、これも群表現です。

**双対との相違。** それぞれの行列は $\overline A$ と $A^{-\mathsf T}$ です。例えば $(\mathbb R,+)$ の1次元表現 $D(t)=e^t$ では $\overline D(t)=e^t$、$D^\vee(t)=e^{-t}$ で、同値ですらありません。一方、$D$ が不変正定値 Hermite 内積を持つときは、共役表現と双対表現に自然な同値ができます。ここで内積は第一変数に共役線形、第二変数に線形とします。

<a id="prop-lrep4-unitary-dual-conjugate"></a>

<!-- formal-statement-start -->
> **命題（不変 Hermite 内積と共役・双対の同値）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ が $G$-不変な正定値 Hermite 内積 $h$ を持つとする。このとき
>
$$
H:\overline V\longrightarrow V^*,\qquad
H(\overline v)(w)=h(v,w)
$$
>
> は複素線形な可逆絡作用素であり、$\overline D$ と $D^\vee$ は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 第一変数が共役線形であることが、$\overline V$ からの複素線形性に変わります。不変性を一度適用して共変性を得ます。

<!-- proof-start -->
### 証明

$\lambda\overline v=\overline{\overline\lambda v}$ なので
$$
H(\lambda\overline v)(w)
=h(\overline\lambda v,w)=\lambda h(v,w)
=\lambda H(\overline v)(w).
$$
加法性も同様です。$H(\overline v)=0$ なら特に $h(v,v)=0$ ですから、正定値性により $v=0$ となります。有限次元で $\dim\overline V=\dim V^*$ なので $H$ は同型です。任意の $g\in G$、$w\in V$ について
$$
\begin{aligned}
H(\overline D(g)\overline v)(w)
&=h(D(g)v,w)\\
&=h(v,D(g^{-1})w)\\
&=(D^\vee(g)H(\overline v))(w).
\end{aligned}
$$
中段は $h(D(g)v,D(g)u)=h(v,u)$ に $u=D(g^{-1})w$ を代入した式です。従って $H\overline D(g)=D^\vee(g)H$ です。$\square$
<!-- proof-end -->

## 5. $V\otimes V^*$ を線形作用素として見る

$V$ のベクトル $v$ と線形形式 $\varphi$ から、「入力 $w$ を測り、その数だけ $v$ を出力する」作用素
$$
T_{v,\varphi}(w)=\varphi(w)v
$$
を作れます。これは階数が高々1の線形写像です。$(v,\varphi)\mapsto T_{v,\varphi}$ は双線形なので、テンソル積上の線形写像になります。

<a id="thm-lrep4-endomorphism"></a>

<!-- formal-statement-start -->
> **定理（$V\otimes V^*$ と自己準同型の自然な対応）**  
> $G$ の有限次元複素表現 $(V,D)$ に対し
>
$$
\Phi:V\otimes V^*\longrightarrow
\operatorname{End}_{\mathbb C}(V),\qquad
\Phi(v\otimes\varphi)(w)=\varphi(w)v
$$
>
> は複素線形同型である。左辺に $D\otimes D^\vee$、右辺に $T\mapsto D(g)TD(g)^{-1}$ を作用させると、$\Phi$ は絡作用素である。従って固定されるテンソルは $D(g)$ と可換する自己準同型に対応する。
<!-- formal-statement-end -->

**証明の見取り図。** 双対基底で逆写像を具体的に作り、共変性は単純テンソルへ作用させて計算します。

<!-- proof-start -->
### 証明

$V$ の基底 $e_1,\ldots,e_n$ と [双対基底](../../../基礎科目/LA/LA3A/index.md#def-la3a-dual-basis) $e^1,\ldots,e^n$ を選びます。$\Phi(e_i\otimes e^j)$ は $e_j$ を $e_i$ へ送り、それ以外の基底ベクトルを零へ送る行列単位です。この $n^2$ 個は $\operatorname{End}(V)$ の基底なので $\Phi$ は同型です。具体的な逆写像は
$$
\Phi^{-1}(T)=\sum_{i=1}^n Te_i\otimes e^i
$$
です。実際、右辺を $w=\sum_i e^i(w)e_i$ に作用させると $\sum_i e^i(w)Te_i=Tw$ になります。

共変性を任意の単純テンソルで調べると
$$
\begin{aligned}
\Phi((D(g)\otimes D^\vee(g))(v\otimes\varphi))(w)
&=(D^\vee(g)\varphi)(w)\,D(g)v\\
&=\varphi(D(g^{-1})w)\,D(g)v\\
&=(D(g)T_{v,\varphi}D(g)^{-1})(w).
\end{aligned}
$$
線形性によって一般のテンソルにも成立します。固定テンソルである条件は対応する $T$ に対し $D(g)TD(g)^{-1}=T$ であり、右から $D(g)$ を掛ければ $D(g)T=TD(g)$ と同値です。$\square$
<!-- proof-end -->

特に
$$
\Omega=\sum_{i=1}^n e_i\otimes e^i
$$
は $I_V$ に対応するので、どの基底で書いても同じテンソルであり、常に $G$-不変です。$D$ が複素既約なら [Schurの補題](../LREP2/index.md#thm-lrep2-schur)によって可換な自己準同型はスカラー倍の恒等写像に限られます。この場合、$(V\otimes V^*)^G=\mathbb C\Omega$ です。

## 6. 双線形形式を保存する作用と $\epsilon$

線形形式が一つのベクトルを数値に写すのに対し、[双線形形式](../../../基礎科目/LA/LA3E/index.md#def-la3e-bilinear-form) $B:V\times V\to\mathbb C$ は二つのベクトルを数値に写します。$v,w$ を同時に群で動かしたとき、結果が変わらないという条件を調べましょう。ここは Hermite 内積と違って、**二つの変数とも複素線形**です。

<a id="def-lrep4-invariant-bilinear"></a>

<!-- formal-statement-start -->
> **定義（不変双線形形式）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ と複素双線形形式 $B:V\times V\to\mathbb C$ に対し、全ての $g\in G$ と $v,w\in V$ について
>
$$
B(D(g)v,D(g)w)=B(v,w)
$$
>
> が成立するとき、$B$ を **$G$-不変双線形形式**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep4-invariant-bilinear -->
**定義の確認。** $V=\mathbb C^2$、$G=SL(2,\mathbb C)$、$D(A)v=Av$ とし、交代形式を
$$
\epsilon(v,w)=v^{\mathsf T}
\begin{pmatrix}0&1\\-1&0\end{pmatrix}w
=v_1w_2-v_2w_1
$$
と定めます。各変数について加法性・複素スカラー倍への線形性は式から従います。$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と置くと、後で導く恒等式 $A^{\mathsf T}JA=(ad-bc)J$ により、$\det A=1$ なら
$$
\epsilon(Av,Aw)=v^{\mathsf T}A^{\mathsf T}JAw
=v^{\mathsf T}Jw=\epsilon(v,w).
$$
従って定義の全ての群元について不変です。ここで $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ です。
<!-- definition-example-end -->

同じ条件は「$V$ から双対への絡作用素」と読み替えられます。$B(v,-)$ は線形形式なので
$$
b_B:V\to V^*,\qquad b_B(v)(w)=B(v,w)
$$
を作れます。[非退化性](../../../基礎科目/LA/LA3E/index.md#def-la3e-nondegenerate-bilinear-form)は有限次元では $b_B$ が同型となる条件です。

<a id="thm-lrep4-bilinear-intertwiner"></a>

<!-- formal-statement-start -->
> **定理（不変双線形形式と双対への絡作用素）**  
> 群 $G$ の有限次元複素表現 $(V,D)$ と複素双線形形式 $B$ に対し、$B$ が $G$-不変であることと
>
$$
b_BD(g)=D^\vee(g)b_B
\quad(\forall g\in G)
$$
>
> は同値である。さらに $B$ が非退化なら $b_B$ は同型であり、$D$ と $D^\vee$ は同値である。
<!-- formal-statement-end -->

**証明の見取り図。** 双対側に入る逆元を明示したあと、両辺の線形形式を同じ $w$ に作用させて比べます。

<!-- proof-start -->
### 証明

左辺を $w$ で評価すると
$$
(b_BD(g)v)(w)=B(D(g)v,w).
$$
右辺は [双対表現の定義](#def-lrep4-dual)により
$$
(D^\vee(g)b_B(v))(w)
=B(v,D(g^{-1})w).
$$
不変性があれば $w=D(g)u$、すなわち $u=D(g^{-1})w$ と置くと両者は等しくなります。逆に絡作用素の条件から $w=D(g)u$ を代入すれば
$$
B(D(g)v,D(g)u)=B(v,u)
$$
を得ます。非退化性は $b_B$ が単射である条件で、有限次元では $\dim V=\dim V^*$ なので全単射です。$\square$
<!-- proof-end -->

<a id="prop-lrep4-epsilon"></a>

<!-- formal-statement-start -->
> **命題（二次元交代形式と行列式）**  
> $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ とする。任意の $A\in M_2(\mathbb C)$ について
>
$$
A^{\mathsf T}JA=(\det A)J.
$$
>
> 従って標準表現における $\epsilon(v,w)=v^{\mathsf T}Jw$ は $SL(2,\mathbb C)$ およびその部分群 $SU(2)$ の不変な非退化交代双線形形式である。
<!-- formal-statement-end -->

**証明の見取り図。** 二つの $2\times2$ 行列積を成分で計算すると、非対角成分に行列式が現れます。

<!-- proof-start -->
### 証明

$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とすると
$$
JA=\begin{pmatrix}c&d\\-a&-b\end{pmatrix}
$$
であり、
$$
A^{\mathsf T}JA
=\begin{pmatrix}a&c\\b&d\end{pmatrix}
\begin{pmatrix}c&d\\-a&-b\end{pmatrix}
=\begin{pmatrix}0&ad-bc\\bc-ad&0\end{pmatrix}
=(ad-bc)J.
$$
$\det A=1$ なら不変性が成立します。また $J^{\mathsf T}=-J$ から $\epsilon(w,v)=-\epsilon(v,w)$ で、$\det J=1\ne0$ だから非退化です。$\square$
<!-- proof-end -->

具体的に $\epsilon(e_1,e_2)=1$、$\epsilon(e_2,e_1)=-1$、$\epsilon(e_i,e_i)=0$ です。$b_\epsilon(e_1)=e^2$、$b_\epsilon(e_2)=-e^1$ なので、二つの基底間の写像も目で追えます。同じ係数から
$$
\Xi=e_1\otimes e_2-e_2\otimes e_1\in V\otimes V
$$
も作れます。$A$ の列を $Ae_1=(a,c)^{\mathsf T}$、$Ae_2=(b,d)^{\mathsf T}$ とすると
$$
(A\otimes A)\Xi
=(ad-bc)(e_1\otimes e_2-e_2\otimes e_1)
=(\det A)\Xi.
$$
よって $\det A=1$ なら $\Xi$ は不変テンソルです。ただし $\epsilon\in V^*\otimes V^*$ と $\Xi\in V\otimes V$ は**異なる空間の元**であり、基底で見た係数が似ていることと同一の対象であることは区別します。

## 7. 演習

### Level A

<a id="ex-lrep4-a01"></a>
#### LREP4-A01 直和の群法則と不変部分空間
- Level: A
- ID: LREP4-A01

$G=C_2=\{e,s\}$、$D(s)=-1$ を $\mathbb C$ 上、$E(s)=I_2$ を $\mathbb C^2$ 上に取る。$D\oplus E$ の $s$ の表示行列を求め、表現条件と二つの不変部分空間を確認せよ。

<!-- solution-start -->
**詳細解答。** 直和の順序付き基底を $e_0,e_1,e_2$ とすると
$$
(D\oplus E)(s)=\operatorname{diag}(-1,1,1),\qquad
(D\oplus E)(e)=I_3.
$$
$s^2=e$ に対して $\operatorname{diag}(-1,1,1)^2=I_3$ なので [直和表現の命題](#prop-lrep4-direct-sum)の群法則を直接検算できます。最初の成分 $\mathbb Ce_0$ は $s$ で $-1$ 倍、後の二次元部分 $\mathbb Ce_1\oplus\mathbb Ce_2$ は固定されるので、いずれも不変です。両者は共通部分が零で和が全空間であり、表現はこの二つの部分表現の直和です。
<!-- solution-end -->

<a id="ex-lrep4-a02"></a>
#### LREP4-A02 二つの符号表現をテンソルで合成する
- Level: A
- ID: LREP4-A02

$C_2$ に $D(s)=\operatorname{diag}(1,-1)$ を $\mathbb C^2$ 上、$E(s)=-1$ を $\mathbb C$ 上に作用させる。$D\otimes E$ の表示行列と固有値、および $s^2=e$ の確認を行え。

<!-- solution-start -->
**詳細解答。** 基底 $e_1\otimes1,e_2\otimes1$ において
$$
(D\otimes E)(s)(e_1\otimes1)
=e_1\otimes(-1)=-e_1\otimes1,
$$
$$
(D\otimes E)(s)(e_2\otimes1)
=(-e_2)\otimes(-1)=e_2\otimes1.
$$
従って表示行列は $\operatorname{diag}(-1,1)$、固有値は $-1,1$ です。その二乗は $I_2$ なので表現条件に一致します。次元は $2\cdot1=2$ で、[テンソル積表現の定理](#thm-lrep4-tensor-representation)の次元公式とも一致します。
<!-- solution-end -->

<a id="ex-lrep4-a03"></a>
#### LREP4-A03 双対行列と評価の不変性
- Level: A
- ID: LREP4-A03

$(\mathbb R,+)$ の $\mathbb C^2$ 上の表現 $D(t)=\operatorname{diag}(e^t,e^{-3t})$ を考える。$D^\vee(t)$ を双対基底で求め、$v=(x,y)^{\mathsf T}$、$\varphi=\alpha e^1+\beta e^2$ について評価の不変性を示せ。

<!-- solution-start -->
**詳細解答。** まず $D(t)^{-1}=\operatorname{diag}(e^{-t},e^{3t})$ です。これは対角行列なので転置しても変わらず、[双対の行列公式](#thm-lrep4-dual-action)から
$$
D^\vee(t)=\operatorname{diag}(e^{-t},e^{3t}).
$$
変換後のベクトルは $(e^tx,e^{-3t}y)^{\mathsf T}$、変換後の線形形式の係数は $(e^{-t}\alpha,e^{3t}\beta)$ です。従って
$$
(D^\vee(t)\varphi)(D(t)v)
=e^{-t}\alpha e^tx+e^{3t}\beta e^{-3t}y
=\alpha x+\beta y=\varphi(v).
$$
<!-- solution-end -->

<a id="ex-lrep4-a04"></a>
#### LREP4-A04 複素共役と双対の異なる構成
- Level: A
- ID: LREP4-A04

$C_3=\langle r:r^3=e\rangle$ の1次元表現 $D(r)=\omega=e^{2\pi i/3}$ について、$\overline D(r)$ と $D^\vee(r)$ を計算し、それぞれ表現となることを確認せよ。

<!-- solution-start -->
**詳細解答。** $\overline D(r)=\overline\omega=\omega^2$ です。双対表現では $r^{-1}=r^2$ なので
$$
D^\vee(r)=D(r^{-1})^{\mathsf T}=\omega^{-1}=\omega^2
$$
です。両方の像で $(\omega^2)^3=\omega^6=1$ なので $r^3=e$ の群関係を保ちます。この例では表示した数値が一致しますが、前者は $\overline V$、後者は $V^*$ 上の作用であり、一般の表現では一致しません。
<!-- solution-end -->

### Level B

<a id="ex-lrep4-b01"></a>
#### LREP4-B01 直和へのテンソル積の分配
- Level: B
- ID: LREP4-B01

$G$ の有限次元複素表現 $(V,D)$、$(W,E)$、$(U,F)$ に対し、自然な写像
$$
(v,w)\otimes u\longmapsto(v\otimes u,w\otimes u)
$$
を線形に延長して $(V\oplus W)\otimes U\cong(V\otimes U)\oplus(W\otimes U)$ が $G$-同変な同型となることを示せ。

<!-- solution-start -->
**詳細解答。** $(v,w)$ と $u$ の双方に線形な上記の規則は [テンソル積の普遍性](../../../基礎科目/LA/LA3E/index.md#def-la3e-tensor-product)により線形写像 $F_0$ を定めます。逆向きには
$$
(v\otimes u,0)\longmapsto(v,0)\otimes u,\qquad
(0,w\otimes u)\longmapsto(0,w)\otimes u
$$
を各テンソル積から線形に延長し、和を取る写像 $K_0$ を作れます。各単純テンソルに対し
$$
K_0F_0((v,w)\otimes u)
=(v,0)\otimes u+(0,w)\otimes u
=(v,w)\otimes u.
$$
逆方向も $F_0K_0(v\otimes u,0)=(v\otimes u,0)$、第二成分も同様です。両方向で恒等写像なので同型です。最後に
$$
\begin{aligned}
F_0(((D\oplus E)\otimes F)(g)((v,w)\otimes u))
&=(D(g)v\otimes F(g)u,E(g)w\otimes F(g)u)\\
&=((D\otimes F)\oplus(E\otimes F))(g)F_0((v,w)\otimes u)
\end{aligned}
$$
です。生成元である単純テンソル全てで成立するので、$F_0$ は絡作用素です。
<!-- solution-end -->

<a id="ex-lrep4-b02"></a>
#### LREP4-B02 Lie 環のテンソル作用の括弧
- Level: B
- ID: LREP4-B02

Lie 環表現 $\rho:\mathfrak g\to\operatorname{End}(V)$、$\sigma:\mathfrak g\to\operatorname{End}(W)$ に対し
$$
\tau(X)=\rho(X)\otimes I_W+I_V\otimes\sigma(X)
$$
と置く。$\tau([X,Y])=[\tau(X),\tau(Y)]$ を行列積から示せ。

<!-- solution-start -->
**詳細解答。** まず $\rho,\sigma$ の実線形性から $\tau$ も実線形です。$A_X=\rho(X)\otimes I$、$B_X=I\otimes\sigma(X)$ とすると、混合項は
$$
A_XB_Y=\rho(X)\otimes\sigma(Y)=B_YA_X
$$
なので $[A_X,B_Y]=[B_X,A_Y]=0$ です。同じ因子同士では
$$
[A_X,A_Y]=[\rho(X),\rho(Y)]\otimes I,\quad
[B_X,B_Y]=I\otimes[\sigma(X),\sigma(Y)].
$$
従って
$$
\begin{aligned}
[\tau(X),\tau(Y)]
&=[\rho(X),\rho(Y)]\otimes I
+I\otimes[\sigma(X),\sigma(Y)]\\
&=\rho([X,Y])\otimes I+I\otimes\sigma([X,Y])\\
&=\tau([X,Y]).
\end{aligned}
$$
ここで二つ目の等号に [Lie 環表現の定義](../LREP3/index.md#def-lrep3-lie-algebra-representation)を用いました。
<!-- solution-end -->

<a id="ex-lrep4-b03"></a>
#### LREP4-B03 自己準同型の共変性と固定点
- Level: B
- ID: LREP4-B03

$C_2$ の $\mathbb C^2$ 上の表現 $D(s)=\operatorname{diag}(1,-1)$ を考える。(i) $V\otimes V^*$ の次元、(ii) 共役作用 $T\mapsto D(s)TD(s)^{-1}$ の固定行列全体、(iii) 固定テンソルの次元を求めよ。

<!-- solution-start -->
**詳細解答。** (i) $\dim V=2$、$\dim V^*=2$ なので次元は4です。(ii) $D(s)^{-1}=D(s)$ とし、$T=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ と置きます。
$$
D(s)TD(s)^{-1}
=\begin{pmatrix}a&-b\\-c&d\end{pmatrix}.
$$
これが $T$ と等しければ $b=-b$、$c=-c$ より $b=c=0$ です。固定行列は $\{\operatorname{diag}(a,d):a,d\in\mathbb C\}$、次元2です。(iii) [自己準同型との同型](#thm-lrep4-endomorphism)は作用を保つので固定テンソル全体も次元2です。具体的な基底は $e_1\otimes e^1$ と $e_2\otimes e^2$ です。
<!-- solution-end -->

<a id="ex-lrep4-b04"></a>
#### LREP4-B04 交代形式が失われる場合
- Level: B
- ID: LREP4-B04

$J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、$A=\operatorname{diag}(-1,1)$ とする。(i) $A^{\mathsf T}JA$ を計算せよ。(ii) $C_2$ の表現 $D(s)=A$ で $\epsilon(v,w)=v^{\mathsf T}Jw$ は不変か。(iii) 何が $SL(2,\mathbb C)$ の例と異なるか。

<!-- solution-start -->
**詳細解答。** 直接掛けると
$$
JA=\begin{pmatrix}0&1\\1&0\end{pmatrix},\qquad
A^{\mathsf T}JA
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}=-J.
$$
従って (i) は $-J$ です。(ii) $e_1,e_2$ を入力すると $\epsilon(Ae_1,Ae_2)=\epsilon(-e_1,e_2)=-1$ ですが $\epsilon(e_1,e_2)=1$ なので不変ではありません。(iii) この行列は $\det A=-1$ であり、[二次元交代形式の行列式公式](#prop-lrep4-epsilon)による倍率が $-1$ になります。群の表現条件 $A^2=I$ を満たしていても、交代形式の不変性には別に行列式1が必要です。
<!-- solution-end -->

<a id="ex-lrep4-b05"></a>
#### LREP4-B05 不変形式と双対同値の対応
- Level: B
- ID: LREP4-B05

$G=(\mathbb R,+)$、$V=\mathbb C$、$D(t)=e^t$ とする。全ての $t$ に対して不変な複素双線形形式は零形式のみであることを示し、$D$ と $D^\vee$ が同値でないことを直接確かめよ。

<!-- solution-start -->
**詳細解答。** $\mathbb C$ 上の双線形形式は $B(z,w)=c zw$（$c=B(1,1)$）です。不変性は任意の実数 $t$ に対し
$$
B(e^tz,e^tw)=ce^{2t}zw=czw
$$
を要求します。$z=w=1$、$t=1$ とすれば $c(e^2-1)=0$ なので $c=0$ です。他方、双対表現は $D^\vee(t)=e^{-t}$ です。二つの1次元表現の絡作用素はスカラー倍 $T(z)=az$ の形で、[絡作用素条件](../LREP1/index.md#def-lrep1-intertwiner)から
$$
ae^t=e^{-t}a
$$
が必要です。$t=1$ より $a=0$ であり、可逆な絡作用素はありません。[不変形式と双対の定理](#thm-lrep4-bilinear-intertwiner)の結論と整合しています。
<!-- solution-end -->

### Level C

<a id="ex-lrep4-c01"></a>
#### LREP4-C01 二次元標準表現のテンソル二乗と不変交代成分
- Level: C
- ID: LREP4-C01

$G=SU(2)$ とし、$V=\mathbb C^2$ 上の標準表現 $D(U)=U$ を考える。基底を $e_1,e_2$ とし、
$$
S=\operatorname{span}_{\mathbb C}\{
e_1\otimes e_1,\ e_1\otimes e_2+e_2\otimes e_1,\ e_2\otimes e_2\},\qquad
A=\mathbb C(e_1\otimes e_2-e_2\otimes e_1)
$$
と置く。

1. $V\otimes V=S\oplus A$ であり、それぞれの次元が3と1であることを示せ。
2. $S,A$ は $D\otimes D$ による不変部分空間であり、$A$ 上の作用は自明表現であることを示せ。
3. $\epsilon(v,w)=v_1w_2-v_2w_1$ が不変で非退化であることを確かめ、$b_\epsilon(e_1)$ と $b_\epsilon(e_2)$ を求めて $V\cong V^*$ を構成せよ。

<!-- solution-start -->
**詳細解答。** (1) [テンソル積の基底定理](../../../基礎科目/LA/LA3E/index.md#thm-la3e-tensor-product-existence-basis)によって
$$
e_1\otimes e_1,\ e_1\otimes e_2,\ e_2\otimes e_1,\ e_2\otimes e_2
$$
は4次元空間の基底です。混合項の和と差は独立です。実際、$a(e_1\otimes e_2+e_2\otimes e_1)+b(e_1\otimes e_2-e_2\otimes e_1)=0$ とすると $(a+b,a-b)=(0,0)$ で、$a=b=0$ です。従って問題にある四つのベクトルは基底となり、$S\cap A=\{0\}$、$S+A=V\otimes V$、次元は3と1です。

(2) 因子の交換写像 $P(v\otimes w)=w\otimes v$ を用意します。この作用は二重線形性を保つためテンソル全体へ定まり、$P^2=I$ です。$P$ の固有値 $+1$ の空間が $S$、$-1$ の空間が $A$ です。単純テンソル上で
$$
P(Uv\otimes Uw)=Uw\otimes Uv
=(U\otimes U)P(v\otimes w)
$$
だから $P$ と $U\otimes U$ は可換であり、その各固有空間 $S,A$ は不変です。さらに $U=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ に対し [行列式と交代テンソルの計算](#prop-lrep4-epsilon)と同じ成分展開により
$$
(U\otimes U)(e_1\otimes e_2-e_2\otimes e_1)
=(ad-bc)(e_1\otimes e_2-e_2\otimes e_1).
$$
$U\in SU(2)$ なら $\det U=1$ なので $A$ 上の作用は恒等写像です。ここでは $S$ が既約であるとまでは主張しません（それは後続のSU(2)既約表現で扱います）。

(3) $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ と置けば $\epsilon(v,w)=v^{\mathsf T}Jw$ であり、$J^{\mathsf T}=-J$ だから交代、$\det J=1$ だから非退化です。[二次元行列式恒等式](#prop-lrep4-epsilon)を $U$ に適用して $U^{\mathsf T}JU=(\det U)J=J$、従って $\epsilon(Uv,Uw)=\epsilon(v,w)$ です。[不変形式からの絡作用素定理](#thm-lrep4-bilinear-intertwiner)によって $b_\epsilon:V\to V^*$ は同型です。具体的には
$$
b_\epsilon(e_1)(x e_1+y e_2)=y,\qquad
b_\epsilon(e_2)(x e_1+y e_2)=-x.
$$
よって $b_\epsilon(e_1)=e^2$、$b_\epsilon(e_2)=-e^1$ です。この同型は全ての $U\in SU(2)$ に対して $b_\epsilon U=D^\vee(U)b_\epsilon$ を満たします。$\square$
<!-- solution-end -->

## 8. まとめと次講

直和は二つの不変成分を並べ、テンソル積は両因子の作用を掛け合わせます。双対は逆元の転置で評価を保ち、複素共役は共役係数を $\overline V$ 上の作用に移します。$V\otimes V^*$ の不変テンソルは群作用と可換する作用素へ対応し、不変な双線形形式は元の表現と双対を結びます。

二次元の $\epsilon$ は行列式1の変換で保存されます。この小さな計算が、次の **LREP5「SU(2)からSO(3)への二重被覆」** を準備します。そこで保存される長さと群の核を行列で確かめ、後にスピン表現を合成するときにテンソル積を使います。
