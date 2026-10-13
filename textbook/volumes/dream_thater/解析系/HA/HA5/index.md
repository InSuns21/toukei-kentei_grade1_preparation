# HA5 特異積分とRiesz変換

[HA4のCalderón–Zygmund分解](../HA4/index.md#thm-ha4-cz-decomposition)は、入力を $L^2$ で扱える部分と各立方体で平均が零になる部分へ分けました。[遠方評価補題](../HA4/index.md#lem-ha4-off-support)では、後者に核の差を掛けると積分可能になることも確認しました。ところが、これだけでは核を積分してよい範囲も、作用素の有界性も確定していません。

本章では「対角線 $x=y$ で特異な核から作る作用素は、どんな仮定の下で $L^p$ を保つか」を問い、一般の作用素定理と、Fourier乗数から出発できる具体例を区別します。先に結果を述べれば、**核のサイズ・滑らかさに加えて $L^2$ 有界性を仮定する**と、分解から弱型 $(1,1)$、補間と双対から強型 $(p,p)$ が導けます。その具体例については、必要な $L^2$ 仮定をFourier側で直接検証します。

## 1. 対角線を除いた核だけでは足りない

核 $|x-y|^{-d}$ は、$x=y$ の近くで体積要素 $r^{d-1}dr$ と掛けると $dr/r$ になり、通常の絶対積分では発散します。そこで対角線から離れた積分表示と、作用素そのものの $L^2$ 制御を分けて規定します。

<a id="def-ha5-standard-kernel"></a>
<!-- formal-statement-start -->
> **定義（標準Calderón–Zygmund核）**  
> $d\ge1$、$0<\delta\le1$、$A>0$ とする。$x\ne y$ で定義された可測な複素数値関数 $K(x,y)$ を、以下の三条件を満たすとき標準核という。
>
> **サイズ**：$|K(x,y)|\le A|x-y|^{-d}$。
>
> **第1変数の滑らかさ**：$|x-x'|\le|x-y|/2$ なら
>
$$
|K(x,y)-K(x',y)|
\le A\frac{|x-x'|^\delta}{|x-y|^{d+\delta}}.
$$
>
> **第2変数の滑らかさ**：$|y-y'|\le|x-y|/2$ なら
>
$$
|K(x,y)-K(x,y')|
\le A\frac{|y-y'|^\delta}{|x-y|^{d+\delta}}.
$$
>
> 核の条件だけには $L^2$ 作用素の存在や、主値の存在は含めない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha5-standard-kernel -->
**定義の確認**　$d=1$、$K(x,y)=1/\{\pi(x-y)\}$ とする。$|y-y'|\le|x-y|/2$ なら $|x-y'|\ge|x-y|/2$ だから

$$
\left|\frac1{x-y}-\frac1{x-y'}\right|
=\frac{|y-y'|}{|x-y|\,|x-y'|}
\le\frac{2|y-y'|}{|x-y|^2}.
$$

$x$ と $x'$ を交換した場合も同じ計算になります。したがって $\delta=1$、$A=2/\pi$ とすれば三条件を満たします。これが [HA3のHilbert変換](../HA3/index.md#thm-ha3-multiplier)の核です。
<!-- definition-example-end -->

次に「核で表せる」という言葉の適用範囲を正確に定めます。

<a id="def-ha5-cz-operator"></a>
<!-- formal-statement-start -->
> **定義（L2 Calderón–Zygmund作用素）**  
> 標準核 $K$ に対応する線形作用素 $T$ は $L^2(\mathbb R^d)$ 上で定義され、ある $B\ge0$ について
>
$$
\|Tf\|_2\le B\|f\|_2\quad(f\in L^2)
$$
>
> を満たすとする。さらにコンパクト台を持つ $f\in L^2$ に対して、台から離れたほとんどすべての $x$ で
>
$$
Tf(x)=\int_{\mathbb R^d}K(x,y)f(y)\,dy
$$
>
> となるとき、$T$ を $L^2$ Calderón–Zygmund作用素という。積分表示は対角線から離れた場所の主張であり、$Tf(x)$ を全点での主値として定義したという意味ではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha5-cz-operator -->
**定義の確認**　[Hilbert変換の$L^2$乗数表示](../HA3/index.md#thm-ha3-multiplier)により $T=H$ のノルムは1です。

$f\in C_c^1$ と $x\notin\operatorname{supp}f$ では $1/(x-y)$ に特異点がなく、[滑らかな関数の主値](../HA3/index.md#prop-ha3-smooth-pv)が通常の積分と一致します。

一般のコンパクト台 $L^2$ 入力にも台から離れた積分はCauchy–Schwarzで制御でき、$C_c^1$ 近似と $L^2$ 極限で同一視できます。
<!-- definition-example-end -->

定義で $B$ を独立の仮定としたことが重要です。例えば $K(x,y)=|x-y|^{-d}$ は対角線から離れたサイズ・滑らかさの評価を満たしますが、定数関数に近い非負入力に対する切断積分は対角線付近で正の対数発散を起こします。核の条件から正負の消去を勝手に読み取れません。

## 2. 分解を使って弱型 $(1,1)$ を証明する

[HA4の分解](../HA4/index.md#thm-ha4-cz-decomposition)を高さ $\lambda$ で行い、$f=g+\sum_jb_j$ とします。良い部分は $L^2$、悪い部分は零平均と核の滑らかさ、例外集合は体積で押さえます。この三種類を混ぜずに追うことが弱型証明の中心です。

<a id="thm-ha5-weak11"></a>
<!-- formal-statement-start -->
> **定理（標準Calderón–Zygmund作用素の弱型）**  
> $d\ge1$、$0<\delta\le1$ とする。$T$ は定数 $A,B$ を持つ[標準核と$L^2$有界性](#def-ha5-cz-operator)を満たすとする。このとき $T$ は $L^1(\mathbb R^d)$ 上の弱型 $(1,1)$ 作用素へ一意に延長され、$f\in L^1$、$\lambda>0$ に対して
>
$$
|\{x:|Tf(x)|>\lambda\}|
\le \frac{C(d,\delta)(A+B^2+1)}{\lambda}\|f\|_1.
$$
>
> 延長は $L^1\cap L^2$ 上で元の $L^2$ 作用素と一致する（それぞれ同値類として解釈する）。
<!-- formal-statement-end -->

### 証明の見取り図

まず $f\in L^1\cap L^2$ とし、$U=\bigcup_jQ_j^*$ の外側で各 $Tb_j$ を核積分に置き換えます。無限個ある $b_j$ を足すときに、$L^2$ での収束と $U^c$ での絶対積分評価を両方使って同じ極限であることを確認します。最後に $L^1$ 近似から延長を作り、弱型の閾値評価を引き継ぎます。

<!-- proof-start -->
### 証明

**(1) まず $f\in L^1\cap L^2$ とする。**　[分解定理](../HA4/index.md#thm-ha4-cz-decomposition)より

$$
\|g\|_2^2\le2^d\lambda\|f\|_1,\qquad
\sum_j\|b_j\|_1\le2\|f\|_1,\qquad
\sum_j|Q_j|\le\frac{\|f\|_1}{\lambda}.
$$

$b=f-g\in L^2$ です。異なる $b_j$ の台は互いに素なので、有限部分和は $L^2$ で $b$ へ収束します。$L^1$ での和と一致することも分解定理に含まれています。

**(2) 良い部分。**　[HA4の二乗平均評価](../HA4/index.md#prop-ha4-good-l2)を $t=\lambda/2$ に適用すると

$$
|\{|Tg|>\lambda/2\}|
\le\frac{2^{d+2}B^2}{\lambda}\|f\|_1.
$$

**(3) 例外集合。**　[拡大立方体の定義](../HA4/index.md#def-ha4-enlarged-cube)から $|Q_j^*|=(4\sqrt d)^d|Q_j|$ なので

$$
|U|\le\sum_j|Q_j^*|
\le\frac{(4\sqrt d)^d}{\lambda}\|f\|_1.
$$

**(4) 悪い部分。**　$x\notin Q_j^*$、$y\in Q_j$ なら $|y-c_j|\le|x-c_j|/4$ です。三角不等式から $|x-y|\ge(3/4)|x-c_j|$ であり、$|y-c_j|\le|x-y|/3<|x-y|/2$ です。よって標準核の第2変数の滑らかさを $y'=c_j$ として適用でき、

$$
\begin{aligned}
|K(x,y)-K(x,c_j)|
&\le A\frac{|y-c_j|^\delta}{|x-y|^{d+\delta}}\\
&\le A\left(\frac43\right)^{d+\delta}
\frac{|y-c_j|^\delta}{|x-c_j|^{d+\delta}}.
\end{aligned}
$$

以下 $\widetilde C_{d,\delta}=(4/3)^{d+\delta}C_{d,\delta}$ と置きます。

各 $b_j$ の平均は零なので、[HA4の遠方評価](../HA4/index.md#lem-ha4-off-support)を各立方体に適用して

$$
F_j(x)=\int_{Q_j}K(x,y)b_j(y)\,dy,\qquad
\int_{(Q_j^*)^c}|F_j(x)|\,dx
\le \widetilde C_{d,\delta}A\|b_j\|_1.
$$

有限部分和 $b^{(N)}=\sum_{j=1}^Nb_j$ はコンパクト台であるとは限りませんが、各 $b_j$ は立方体に台を持つ $L^2$ 関数です。そのため $U^c$ 上では個別に $Tb_j=F_j$ がほとんど至る所で成立します。$Tb^{(N)}\to Tb$ は $L^2$ 収束し、一方 [Tonelliの定理](../../F0/F0-00D2C/index.md#thm-tonelli)により

$$
\int_{U^c}\sum_j|F_j(x)|\,dx
\le \widetilde C_{d,\delta}A\sum_j\|b_j\|_1
\le 2\widetilde C_{d,\delta}A\|f\|_1.
$$

従って $\sum_jF_j$ は $U^c$ 上 $L^1$ 収束かつほとんど至る所絶対収束します。部分和は $Tb$ に $L^2$ 収束し、同時に $U^c$ では $\sum_jF_j$ に $L^1$ 収束します。それぞれからほとんど至る所収束する部分列を順に選べるので、二つの極限は同じであり、$Tb=\sum_jF_j$ が $U^c$ のほとんど至る所で成り立ちます。よって

$$
|\{x\in U^c:|Tb(x)|>\lambda/2\}|
\le\frac{2}{\lambda}\int_{U^c}|Tb|
\le\frac{4\widetilde C_{d,\delta}A}{\lambda}\|f\|_1.
$$

**(5) 合成。**　$|Tf|>\lambda$ なら $|Tg|>\lambda/2$ または $|Tb|>\lambda/2$ です。したがって

$$
|\{|Tf|>\lambda\}|
\le\frac{2^{d+2}B^2+(4\sqrt d)^d+4\widetilde C_{d,\delta}A}
{\lambda}\|f\|_1.
$$

**(6) $L^1$ 全体への延長。**　$f_n\in L^1\cap L^2$、$\|f_n-f\|_1\to0$ を取ります。上の評価を $f_n-f_m$ に適用すると、任意の $\eta>0$ について

$$
|\{|Tf_n-Tf_m|>\eta\}|
\le C\eta^{-1}\|f_n-f_m\|_1\longrightarrow0.
$$

この式から実際に極限を構成します。部分列 $f_{n_k}$ を $\|f_{n_{k+1}}-f_{n_k}\|_1\le2^{-3k}$ となるよう選ぶと、$E_k=\{|Tf_{n_{k+1}}-Tf_{n_k}|>2^{-k}\}$ に対し $|E_k|\le C2^{-2k}$。従って

$$
\left|\bigcap_{N=1}^\infty\bigcup_{k\ge N}E_k\right|
\le\lim_{N\to\infty}\sum_{k\ge N}|E_k|=0.
$$

この零集合の外では十分大きい $k$ で差が $2^{-k}$ 以下となるため、$Tf_{n_k}$ は各点でCauchyです。

その極限を $Tf$ と定めます。元の列や別の近似列との差にも同じ超水準集合評価を用いると、任意の $\eta>0$ について極限との差が $\eta$ を超える集合の測度は0に近づくので極限は一致します。

固定した $\lambda$ で閾値を $\lambda-\eta$ に下げて極限を取り、$\eta\downarrow0$ とすれば同じ弱型不等式が $f$ に成立します。

$f\in L^1\cap L^2$ では $L^1\cap L^2$ に同時収束する近似を選べるので元の $L^2$ 作用素と一致します。任意の弱型連続延長も稠密性から同じで、一意性も得ます。
<!-- proof-end -->

ここで得たのは **$Tf$ の分布関数の評価** です。$L^1$ から $L^1$ への強型有界性は結論にありません。主値収束についてもまだ別の証明が要ります。

## 3. 強い $L^p$ 推定と切断の扱い

弱型 $(1,1)$ と $L^2$ 強型を結ぶには[Marcinkiewicz補間](../HA2/index.md#thm-ha2-marc-finite)を使います。一方 $p>2$ では核の第1変数の滑らかさを使い、随伴を経由します。

<a id="thm-ha5-stronglp"></a>
<!-- formal-statement-start -->
> **定理（強型Lp有界性）**  
> [標準Calderón–Zygmund作用素](#def-ha5-cz-operator) $T$ は、各 $1<p<\infty$ について有界作用素 $T:L^p(\mathbb R^d)\to L^p(\mathbb R^d)$ に一意に延長される。定数は $p,d,\delta,A,B$ に依存するが入力 $f$ には依存しない。
<!-- formal-statement-end -->

### 証明の見取り図

$1<p<2$ では弱型 $(1,1)$ と強型 $(2,2)$ を直接補間します。$p>2$ では随伴核 $K^*(x,y)=\overline{K(y,x)}$ を使います。**核の二変数の滑らかさを両方仮定した理由**がここで効きます。

<!-- proof-start -->
### 証明

[弱型定理](#thm-ha5-weak11)で $p_0=1$、$A_0=C(d,\delta)(A+B^2+1)$、元の $L^2$ 推定で $p_1=2$、$A_1=B$ とする。[有限端点Marcinkiewicz補間](../HA2/index.md#thm-ha2-marc-finite)を任意の $1<p<2$ に適用すると $\|Tf\|_p\le C_p\|f\|_p$ が成立します。$p=2$ は仮定です。

随伴 $T^*$ の核を $K^*(x,y)=\overline{K(y,x)}$ と定めます。元の第1変数と第2変数の条件が入れ替わるだけなので $K^*$ も同じ $A,\delta$ の標準核です。台が離れた $f,h$ の組について

$$
\langle Tf,h\rangle
=\iint K(x,y)f(y)\overline{h(x)}\,dy\,dx
=\langle f,T^*h\rangle
$$

となり、$T^*$ は $L^2$ 有界でノルム $B$ 以下です。従って既に証明した $1<q<2$ の議論を $T^*$ に適用し、$\|T^*h\|_q\le C_q\|h\|_q$ を得ます。

$p>2$、$q=p/(p-1)<2$ とします。$f,h$ をコンパクト台の $L^2\cap L^p$、$L^2\cap L^q$ 関数から始めると、[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)により

$$
|\langle Tf,h\rangle|
=|\langle f,T^*h\rangle|
\le\|f\|_p\|T^*h\|_q
\le C_q\|f\|_p\|h\|_q.
$$

[$L^p$双対性](../../MT/MT7/index.md#thm-mt7-lp-duality)で $h$ に関する上限を取れば $\|Tf\|_p\le C_q\|f\|_p$ です。[$L^p$単関数の稠密性](../../MT/MT7/index.md#thm-mt7-simple-dense)で全 $L^p$ へ一意に延長できます。
<!-- proof-end -->

主値と作用素の区別を、切断族として言い直します。

<a id="prop-ha5-truncation"></a>
<!-- formal-statement-start -->
> **命題（一様な切断作用素の評価と限界）**  
> $\{T_\varepsilon\}_{\varepsilon>0}$ が、同一の $d,\delta,A,B$ を持つ標準Calderón–Zygmund作用素の族であるとする（各作用素の核は異なってよい）。そのとき $T_\varepsilon$ は $\varepsilon$ に依存しない弱型 $(1,1)$、強型 $(p,p)$（$1<p<\infty$）評価を満たす。ただし、これだけから $\varepsilon\downarrow0$ での点ごとの主値収束は従わない。
<!-- formal-statement-end -->

### 証明の見取り図

前二定理の定数を読めば一様性が分かります。収束については、ノルムが一様有界な列でさえ必ず収束するとは限らないため、追加の極限論証が必要です。

<!-- proof-start -->
### 証明

[弱型定理](#thm-ha5-weak11)の右辺は $C(d,\delta)(A+B^2+1)$、[強型定理](#thm-ha5-stronglp)の定数は $d,\delta,A,B,p$ だけで決まります。したがって同じ上界をすべての $\varepsilon$ へ適用できます。一方、例えば $S_n=(-1)^nI$ はどの $L^p$ でもノルム1ですが $f\ne0$ では収束しません。一様ノルム評価から収束を推論することはできません。
<!-- proof-end -->

**切断核の注意**　$K(x,y)\boldsymbol1_{\{|x-y|>\varepsilon\}}$ は境界 $|x-y|=\varepsilon$ で跳ぶため、上の標準核の滑らかさを一様に満たすとは限りません。滑らかな切断 $\chi(|x-y|/\varepsilon)$ なら核の微分評価を追えますが、それでも **$L^2$ 一様有界性の検証は別** です。切断しただけで前命題の仮定が自動成立すると読み替えてはいけません。

## 4. Riesz変換はFourier側で作る

一般作用素では $L^2$ 有界性を仮定しました。ここでは自分で証明できる例を作ります。[FOU4のPlancherel定理](../../FOU/FOU4/index.md#thm-fou4-l2-extension)の下では、絶対値が1以下のFourier乗数は直ちに $L^2$ 有界です。

本節では $d\ge1$、$\widehat f(\xi)=\int_{\mathbb R^d}e^{-ix\cdot\xi}f(x)\,dx$ とします（1次元では [FOU3のFourier変換規約](../../FOU/FOU3/index.md#def-fou3-fourier-transform)と一致）。多次元Plancherelの正規化は $(2\pi)^d$ です。実際、$f(x)=\prod_{\ell=1}^d f_\ell(x_\ell)$ という座標ごとの関数の積では[Fubiniの定理](../../F0/F0-00D2C/index.md#thm-f0-00d2c-02)により $\widehat f(\xi)=\prod_\ell\widehat f_\ell(\xi_\ell)$ であり、[1次元Plancherel等式](../../FOU/FOU4/index.md#thm-fou4-l2-extension)を各座標で順に適用すると $\|\widehat f\|_2^2=(2\pi)^d\|f\|_2^2$。有限和のテンソルが $L^2(\mathbb R^d)$ に稠密であることから一般の場合へ延長できます。

<a id="def-ha5-riesz"></a>
<!-- formal-statement-start -->
> **定義（Riesz変換）**  
> $j\in\{1,\ldots,d\}$ とする。$L^2(\mathbb R^d)$ 上のRiesz変換 $R_j$ を
>
$$
\widehat{R_jf}(\xi)=
-i\frac{\xi_j}{|\xi|}\widehat f(\xi)
\quad(\xi\ne0)
$$
>
> で定め、$\xi=0$ の乗数値は0とする。$c_d=\Gamma((d+1)/2)/\pi^{(d+1)/2}$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ha5-riesz -->
**定義の確認**　$d=1$ では $\xi/|\xi|=\operatorname{sgn}\xi$ なので [Hilbert変換](../HA3/index.md#def-ha3-l2-hilbert)に一致します。$d=2$ で $\xi=(3,4)$ なら乗数は $R_1$ が $-3i/5$、$R_2$ が $-4i/5$ です。二つの乗数の絶対値の二乗の和は $9/25+16/25=1$ で、各乗数の絶対値は1以下です。
<!-- definition-example-end -->

<a id="thm-ha5-riesz-kernel"></a>
<!-- formal-statement-start -->
> **定理（Riesz変換の核とLp有界性）**  
> $d\ge1$、$1\le j\le d$ とする。[Riesz変換](#def-ha5-riesz)は $\|R_j\|_{2\to2}\le1$ を満たし、$x\ne0$ に対する核は
>
$$
k_j(x)=c_d\frac{x_j}{|x|^{d+1}}.
$$
>
> $f\in C_c^1(\mathbb R^d)$ では任意の $x$ で球対称切断の主値
>
$$
R_jf(x)=\lim_{\varepsilon\downarrow0}
\int_{|x-y|>\varepsilon}k_j(x-y)f(y)\,dy
$$
>
> が存在し、$L^2$ で定義した $R_jf$ とほとんど至る所一致する。$R_j$ は弱型 $(1,1)$、任意の $1<p<\infty$ で強型 $(p,p)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

乗数の大きさで $L^2$ 評価を得ます。核の定数と符号はGaussian核のLaplace積分で計算し、奇関数の相殺により球対称主値を扱います。最後に核の微分を評価して一般定理へ接続します。核公式の $c_d$ を単なる「既知の定数」にしないことが狙いです。

<!-- proof-start -->
### 証明

**(1) $L^2$。**　$\xi\ne0$ なら $|\xi_j|/|\xi|\le1$ なので、[Plancherel等式](../../FOU/FOU4/index.md#thm-fou4-l2-extension)（多次元では $(2\pi)^d$ 係数）から

$$
\|R_jf\|_2^2=(2\pi)^{-d}
\int\frac{\xi_j^2}{|\xi|^2}|\widehat f(\xi)|^2\,d\xi
\le\|f\|_2^2.
$$

**(2) 核の導出。**　Gaussian核 $G_t(x)=(4\pi t)^{-d/2}e^{-|x|^2/(4t)}$ は直接Gaussian積分で $\widehat G_t(\xi)=e^{-t|\xi|^2}$ となります。$a>0$ に対して変数変換 $s=t a^2$ を使うと

$$
\frac1{\sqrt\pi}\int_0^\infty t^{-1/2}e^{-ta^2}\,dt
=\frac1{a\sqrt\pi}\int_0^\infty s^{-1/2}e^{-s}\,ds
=\frac1a
$$

であり、最後は $\Gamma(1/2)=\sqrt\pi$ です。よって周波数側で

$$
-i\frac{\xi_j}{|\xi|}
=\frac1{\sqrt\pi}\int_0^\infty
t^{-1/2}(-i\xi_j)e^{-t|\xi|^2}\,dt.
$$

一方、$-\partial_jG_t(x)=x_jG_t(x)/(2t)$ です。$x\ne0$ で積分すると

$$
\begin{aligned}
\frac1{\sqrt\pi}\int_0^\infty t^{-1/2}[-\partial_jG_t(x)]\,dt
&=\frac{x_j}{2\sqrt\pi(4\pi)^{d/2}}
\int_0^\infty t^{-(d+3)/2}e^{-|x|^2/(4t)}\,dt,\\
\int_0^\infty t^{-(d+3)/2}e^{-|x|^2/(4t)}\,dt
&=\left(\frac4{|x|^2}\right)^{(d+1)/2}
\Gamma\!\left(\frac{d+1}2\right).
\end{aligned}
$$

第二式は $s=|x|^2/(4t)$ の置換です。係数を掛け合わせると $\Gamma((d+1)/2)/\pi^{(d+1)/2}=c_d$ となり、核 $k_j(x)$ を得ます。

この計算を作用素の等式へ移すときは分布として読む必要があります。$\varphi\in C_c^\infty$ に対し、$-\partial_jG_t$ との双対積分は $t\downarrow0$ で $-\partial_j\delta$ の作用へ収束して有界であり、$t^{-1/2}$ は0付近で可積分です。

$t\to\infty$ では $|\partial_jG_t(x)|\le C_dt^{-(d+1)/2}$ を用い、$\varphi$ の $L^1$ ノルムで押さえると $t^{-(d+2)/2}$ の可積分な上界を得ます。

従ってこのGaussian核の積分は、任意の滑らかなコンパクト台試験関数との積分として定義できます。

さらに $0<a<b<\infty$ で $t$ を切るとFourier乗数は $(-i\xi_j)/\sqrt\pi\int_a^b t^{-1/2}e^{-t|\xi|^2}\,dt$ です。

その絶対値は $|\xi_j|/|\xi|\le1$ であり、$a\downarrow0,b\to\infty$ で定義の乗数へ各点収束します。

$L^2$ 入力にはPlancherelと優収束を用いて極限を取り、試験関数と積分した極限とは次段の奇性による減算で一致させます。

より具体的には、$k_j$ は奇関数であり、球殻での積分が0です。球対称切断を試験関数 $\varphi$ に作用させると

$$
\int_{\varepsilon<|z|<1}k_j(z)
\{\varphi(z)-\varphi(0)\}\,dz
+\int_{|z|\ge1}k_j(z)\varphi(z)\,dz.
$$

第一項では $|\varphi(z)-\varphi(0)|\le\|\nabla\varphi\|_\infty|z|$ により $|z|^{1-d}$ が現れ、極座標で $\int_0^1dr<\infty$。

第二項は $\varphi$ の台がコンパクトなので絶対収束します。

この球対称主値の試験関数との積分は上のGaussian核積分と一致します。

実際、各 $t$ の奇性から $\varphi(z)$ を $\varphi(z)-\varphi(0)\boldsymbol1_{\{|z|<1\}}$ に置き換えても積分値は変わりません。

この差は原点付近で $O(|z|)$ で、外側ではコンパクト台を持ちます。

Gaussian核を $t$ について積分した絶対値が $|k_j(z)|$ となるため、$t$ と $z$ の積分を交換でき、先ほどの球対称主値の式が得られます。

$f\in C_c^1$ に同じ減算を $f(x-z)$ へ適用すれば、すべての $x$ で局所主値が存在します。$f$ はコンパクト台なので無限遠の積分も有限で、分布の等式と $L^2$ Fourier乗数の一意性から主値は $R_jf$ とほとんど至る所一致します。

**(3) 核の条件。**　$|x_j|\le|x|$ から $|k_j(x)|\le c_d|x|^{-d}$。$r=|x|>0$ として

$$
\partial_\ell k_j(x)
=c_d\left(\frac{\boldsymbol1_{\ell=j}}{r^{d+1}}
-(d+1)\frac{x_jx_\ell}{r^{d+3}}\right),
\qquad
|\nabla k_j(x)|\le C_d r^{-d-1}.
$$

$|z-z'|\le|z|/2$ を満たす二点間の線分では $|w|\ge|z|/2$ なので、[平均値の定理](../../../基礎科目/RA/RA3/index.md#thm-ra3-mvt)を線分に沿う一変数関数 $s\mapsto k_j(z+s(z'-z))$ へ使い

$$
|k_j(z)-k_j(z')|
\le C'_d\frac{|z-z'|}{|z|^{d+1}}.
$$

従って $K_j(x,y)=k_j(x-y)$ は両変数で $\delta=1$ の標準核です。$L^2$ 有界性は(1)で既に確認しました。[$L^2$ Calderón–Zygmund作用素の定義](#def-ha5-cz-operator)に当てはめ、[弱型 $(1,1)$ の結論](#thm-ha5-weak11)を適用します。続いて[強型 $L^p$ の結論](#thm-ha5-stronglp)を適用して結論を得ます。
<!-- proof-end -->

**消去と滑らかさを分ける**　$k_j$ は奇関数なので各球殻上の積分が0です。一方、もし $k(x)=|x|^{-d}$ に置き換えると、$f\equiv1$ となる球の内部では

$$
\int_{\varepsilon<|z|<1/2}|z|^{-d}\,dz
=|S^{d-1}|\log\frac1{2\varepsilon}
\longrightarrow\infty.
$$

滑らかな放射核であっても相殺のない主値は存在しません。ただし「消去条件がない核はすべて非有界」といった逆命題を主張しているわけではありません。

もう一つ、核の第2変数の滑らかさを失うと何が起こるかを見ます。$d=1$、$a(y)=\boldsymbol1_{[0,1/2)}(y)-\boldsymbol1_{[1/2,1)}(y)$、$b=a$、$K(x,y)=a(y)/(x-y)$ と置きます。$b$ は零平均ですが $x>2$ では

$$
\int_0^1K(x,y)b(y)\,dy
=\int_0^1\frac{dy}{x-y}\ge\frac1x.
$$

従って遠方の絶対積分は発散します。$a(y)$ のジャンプにより標準核の滑らかさが壊れ、[HA4の核差評価](../HA4/index.md#lem-ha4-off-support)を使えなくなった例です。これだけで作用素一般の弱型が偽だと主張するわけではなく、**零平均だけではこの遠方証明は閉じない**ことを示しています。

## 5. Poisson方程式の二階微分と圧力

Riesz変換の符号を二回掛けると $(-i)^2=-1$ になります。この負号は $-\Delta$ の逆作用素と二階微分を結びます。ここでいう「逆」は零周波数での曖昧さを避け、初めは滑らかな関数に対する恒等式として扱います。

<a id="prop-ha5-second-derivatives"></a>
<!-- formal-statement-start -->
> **命題（Poisson方程式の二階微分評価）**  
> $d\ge2$、$1<p<\infty$、$u\in C_c^\infty(\mathbb R^d)$ とし、$f=-\Delta u$ とする。このとき
>
$$
\partial_j\partial_k u=R_jR_k f
\quad(1\le j,k\le d)
$$
>
> が成立し、$\|\partial_j\partial_k u\|_p\le C_{p,d}\|f\|_p$。特に $\|D^2u\|_{L^p}\le C'_{p,d}\|\Delta u\|_p$。同じ恒等式は適切なSobolev近似により $u\in W^{2,p}$ へ拡張できる。
<!-- formal-statement-end -->

### 証明の見取り図

Fourier変換で $-\Delta$ は $|\xi|^2$、二階微分は $-\xi_j\xi_k$ を掛けます。Riesz変換を二回掛けた乗数がその比に一致します。その後に強型定理を二回適用します。

<!-- proof-start -->
### 証明

$u$ は滑らかでコンパクト台を持つので、部分積分により

$$
\widehat f(\xi)=|\xi|^2\widehat u(\xi),\qquad
\widehat{\partial_j\partial_k u}(\xi)
=-\xi_j\xi_k\widehat u(\xi).
$$

[$R_j$の乗数定義](#def-ha5-riesz)を $R_k f$ へ適用すると、$\xi\ne0$ で

$$
\widehat{R_jR_k f}(\xi)
=\left(-i\frac{\xi_j}{|\xi|}\right)
\left(-i\frac{\xi_k}{|\xi|}\right)
|\xi|^2\widehat u(\xi)
=-\xi_j\xi_k\widehat u(\xi).
$$

零集合 $\{\xi=0\}$ は $L^2$ 乗数に影響しません。[Fourier変換の$L^2$一意性](../../FOU/FOU4/index.md#thm-fou4-l2-inversion)で恒等式を得ます。[$L^p$有界性](#thm-ha5-riesz-kernel)を順に適用し

$$
\|\partial_j\partial_k u\|_p
=\|R_j(R_kf)\|_p
\le\|R_j\|_{p\to p}\|R_k\|_{p\to p}\|f\|_p.
$$

有限個 $d^2$ の成分のノルムを合計すれば行列 $D^2u$ の評価になります。$W^{2,p}$ の主張は $C_c^\infty$ の密度（全空間の場合）で両辺を収束させれば従います。
<!-- proof-end -->

<a id="prop-ha5-pressure"></a>
<!-- formal-statement-start -->
> **命題（圧力の非局所表示）**  
> $d\ge2$、$1<p<\infty$、$F=(F_{jk})_{1\le j,k\le d}$ の各成分が $L^p(\mathbb R^d)$ に属するとする。
>
$$
\pi=\sum_{j,k=1}^d R_jR_k F_{jk}
$$
>
> と定めると、$\pi\in L^p$、$\|\pi\|_p\le C_{p,d}\sum_{j,k}\|F_{jk}\|_p$ であり、分布の意味で
>
$$
-\Delta\pi=\sum_{j,k=1}^d\partial_j\partial_kF_{jk}
$$
>
> を満たす。$L^p$ 解の範囲では一意である。特に速度場 $v$ の各成分が $L^{2p}$ なら $F_{jk}=v_jv_k$ と置ける。
<!-- formal-statement-end -->

### 証明の見取り図

Riesz変換の二重乗数に $|\xi|^2$ を掛けると $-\xi_j\xi_k$ が出ます。まず滑らかな入力で計算し、一般 $L^p$ 入力には有界性と分布への収束で渡します。一意性では全空間の $L^p$ 調和関数が零であることを使います。

<!-- proof-start -->
### 証明

$F_{jk}\in C_c^\infty$ のとき、乗数の積を計算すると

$$
\widehat\pi(\xi)
=-\sum_{j,k}\frac{\xi_j\xi_k}{|\xi|^2}\widehat F_{jk}(\xi),
\qquad
\widehat{-\Delta\pi}(\xi)
=-\sum_{j,k}\xi_j\xi_k\widehat F_{jk}(\xi)
=\widehat{\sum_{j,k}\partial_j\partial_kF_{jk}}(\xi).
$$

[$L^p$有界性](#thm-ha5-riesz-kernel)を二回用いると

$$
\|\pi\|_p\le
\sum_{j,k}\|R_j\|_{p\to p}\|R_k\|_{p\to p}\|F_{jk}\|_p
\le C_{p,d}\sum_{j,k}\|F_{jk}\|_p.
$$

一般の $F_{jk}\in L^p$ に対し [$L^p$単関数の稠密性](../../MT/MT7/index.md#thm-mt7-simple-dense)と滑らかな近似を用います。近似列のRiesz像は上の評価で $L^p$ 収束し、$\partial_j\partial_k$ と $\Delta$ は試験関数に移して極限を取れるため分布恒等式が残ります。

同じ右辺を持つ二つの $L^p$ 解の差 $h$ は調和分布です。滑らかなGaussian核で畳み込んだ $h*G_t$ は調和関数で、平均値性と[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)から任意の $R>0$ について

$$
|h*G_t(x)|\le C_d R^{-d/p}\|h*G_t\|_p
\le C_dR^{-d/p}\|h\|_p.
$$

$R\to\infty$ とすれば $h*G_t=0$、さらに $t\downarrow0$ の近似恒等族の極限で $h=0$ です。最後に [$L^{2p}$ Hölder不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)より $\|v_jv_k\|_p\le\|v_j\|_{2p}\|v_k\|_{2p}$ なので速度場の場合も定義できます。
<!-- proof-end -->

この圧力は一点の速度だけでは決まりません。各 $R_j$ は空間全体に広がった核を使い、各点の速度積が離れた点の圧力へ寄与します。非圧縮流体の運動方程式から圧力Poisson方程式を得る部分は方程式側の課題であり、ここで証明したのは**その右辺に対応する解作用素の解析的評価**です。

## 6. 演習と詳細解答

数式の符号・例外集合の測度・$L^2$ と主値の区別を、独立の問題で確認します。

<a id="ex-ha5-a01"></a>
**演習 HA5-A01（核のサイズと微分）**  
- Level: A

$d=2$、$k_1(z)=c_2z_1/|z|^3$ とする。$|k_1(z)|\le c_2|z|^{-2}$ と $|\partial_2k_1(z)|\le3c_2|z|^{-3}$ を示せ。

<!-- solution-start -->
**詳細解答**　$|z_1|\le|z|$ より $|k_1(z)|\le c_2|z|/|z|^3=c_2|z|^{-2}$。$r=|z|$ とすると $\partial_2r^{-3}=-3z_2r^{-5}$ だから $\partial_2k_1=-3c_2z_1z_2r^{-5}$。$|z_1z_2|\le r^2$ を代入して絶対値は $3c_2r^{-3}$ 以下です。
<!-- solution-end -->

<a id="ex-ha5-a02"></a>
**演習 HA5-A02（1次元の定数）**  
- Level: A

$c_d=\Gamma((d+1)/2)/\pi^{(d+1)/2}$ から $c_1$ を計算し、$k_1(t)$ がHilbert変換の核と一致することを確かめよ。

<!-- solution-start -->
**詳細解答**　$d=1$ なら $\Gamma((1+1)/2)=\Gamma(1)=1$、$\pi^{(1+1)/2}=\pi$ だから $c_1=1/\pi$。$t\ne0$ では $t/|t|^2=t/t^2=1/t$、従って $k_1(t)=1/(\pi t)$ です。[HA3のHilbert変換](../HA3/index.md#thm-ha3-multiplier)と同じ正規化であり、乗数も $-i\operatorname{sgn}\xi$ になります。
<!-- solution-end -->

<a id="ex-ha5-a03"></a>
**演習 HA5-A03（良い部分の閾値）**  
- Level: A

$d=2$、$L^2$ 作用素ノルムが $B$、分解の高さが $\lambda$ とする。$\{|Tg|>\lambda/2\}$ の測度の上界を求めよ。

<!-- solution-start -->
**詳細解答**

[Calderón–Zygmund分解](../HA4/index.md#thm-ha4-cz-decomposition)から $\|g\|_2^2\le2^2\lambda\|f\|_1=4\lambda\|f\|_1$。[作用素の二乗評価](../HA4/index.md#prop-ha4-good-l2)に $t=\lambda/2$ を代入すると

$$
|\{|Tg|>\lambda/2\}|
\le\frac{B^2\cdot4\lambda\|f\|_1}{\lambda^2/4}
=\frac{16B^2}{\lambda}\|f\|_1.
$$

閾値を半分にすると測度評価の係数は4倍になります。
<!-- solution-end -->

<a id="ex-ha5-a04"></a>
**演習 HA5-A04（球殻上の相殺）**  
- Level: A

$k_j(z)=c_d z_j/|z|^{d+1}$ とする。$0<r<R$ について $\int_{\{r<|z|<R\}}k_j(z)\,dz=0$ を示せ。

<!-- solution-start -->
**詳細解答**　領域は $z\mapsto-z$ で不変です。$k_j(-z)=c_d(-z_j)/|-z|^{d+1}=-k_j(z)$ です。球殻では $r>0$ のため積分は絶対収束します。変数変換 $w=-z$ によって積分 $I$ は $I=\int k_j(-w)\,dw=-I$ だから $I=0$ となります。球を中心にした切断に重要な性質です。
<!-- solution-end -->

<a id="ex-ha5-a05"></a>
**演習 HA5-A05（強型の指数の対応）**  
- Level: A

$p=4$ の $L^p$ 有界性を随伴から証明するときに使う共役指数を求め、なぜ $1<q<2$ になるか確認せよ。

<!-- solution-start -->
**詳細解答**　共役条件 $1/p+1/q=1$ に $p=4$ を入れて $1/q=1-1/4=3/4$、従って $q=4/3$。$1<4/3<2$ なので、[弱型と$L^2$からの補間](#thm-ha5-stronglp)を随伴 $T^*$ に使えます。[双対性](../../MT/MT7/index.md#thm-mt7-lp-duality)で $T^*:L^{4/3}\to L^{4/3}$ の評価を $T:L^4\to L^4$ へ戻します。
<!-- solution-end -->

<a id="ex-ha5-b01"></a>
**演習 HA5-B01（随伴核の滑らかさ）**  
- Level: B

$K$ が[標準核](#def-ha5-standard-kernel)とし、$K^*(x,y)=\overline{K(y,x)}$ と置く。$K^*$ の第2変数について標準核の評価を証明せよ。

<!-- solution-start -->
**詳細解答**　$|y-y'|\le|x-y|/2$ とする。共役を取っても絶対値は変わらないから

$$
|K^*(x,y)-K^*(x,y')|
=|K(y,x)-K(y',x)|.
$$

右辺では元の $K$ の第1変数が $y$ と $y'$、第2変数が $x$ です。$|y-y'|\le|y-x|/2$ なので元の第1変数の滑らかさの仮定を適用し

$$
|K(y,x)-K(y',x)|
\le A\frac{|y-y'|^\delta}{|y-x|^{d+\delta}}
=A\frac{|y-y'|^\delta}{|x-y|^{d+\delta}}.
$$

従って $K^*$ の第2変数の条件が成立します。元の第2変数の条件は随伴の第1変数に対応します。
<!-- solution-end -->

<a id="ex-ha5-b02"></a>
**演習 HA5-B02（弱型評価の三つの項）**  
- Level: B

$d=1$、$A,B>0$、高さ $\lambda$ で分解する。$|Q_j^*|=4|Q_j|$ とし、[HA4の遠方補題](../HA4/index.md#lem-ha4-off-support)の定数を $C_{1,\delta}A$ と書く。弱型証明の三項を明示して測度上界を導け。

<!-- solution-start -->
**詳細解答**　$U=\cup_jQ_j^*$ に対し $|U|\le4\|f\|_1/\lambda$。良い部分は $2^{1+2}B^2\|f\|_1/\lambda=8B^2\|f\|_1/\lambda$。悪い部分は $\sum_j\|b_j\|_1\le2\|f\|_1$ から

$$
\int_{U^c}|Tb|\le C_{1,\delta}A\sum_j\|b_j\|_1
\le2C_{1,\delta}A\|f\|_1,
$$

従って閾値 $\lambda/2$ の測度は $4C_{1,\delta}A\|f\|_1/\lambda$ 以下。三つを足して

$$
|\{|Tf|>\lambda\}|
\le\frac{8B^2+4+4C_{1,\delta}A}{\lambda}\|f\|_1.
$$

です。悪い部分の制御は $U^c$ だけでよく、$U$ 内部の値を評価する必要はありません。
<!-- solution-end -->

<a id="ex-ha5-b03"></a>
**演習 HA5-B03（二階微分と符号）**  
- Level: B

$d=2$、$u\in C_c^\infty(\mathbb R^2)$、$f=-\Delta u$ とする。$\partial_1\partial_2u=R_1R_2f$ を周波数側で示し、$p=3$ に対するノルム評価を記せ。

<!-- solution-start -->
**詳細解答**　部分積分から $\widehat f=(\xi_1^2+\xi_2^2)\widehat u$。[乗数定義](#def-ha5-riesz)を二度用いると

$$
\widehat{R_1R_2f}
=\left(-i\frac{\xi_1}{|\xi|}\right)
\left(-i\frac{\xi_2}{|\xi|}\right)|\xi|^2\widehat u
=-\xi_1\xi_2\widehat u.
$$

これは $\widehat{\partial_1\partial_2u}$ と一致します。[Riesz変換の強型](#thm-ha5-riesz-kernel)から

$$
\|\partial_1\partial_2u\|_3
\le\|R_1\|_{3\to3}\|R_2\|_{3\to3}\|f\|_3.
$$

二回の $-i$ の積が $-1$ になることが符号の要点です。
<!-- solution-end -->

<a id="ex-ha5-b04"></a>
**演習 HA5-B04（平均零でも核が荒いと遠方積分が壊れる）**  
- Level: B

$Q=[0,1)$、$a(y)=\boldsymbol1_{[0,1/2)}-\boldsymbol1_{[1/2,1)}$、$b=a$ とする。$x>2$ に対し $K(x,y)=a(y)/(x-y)$ を考える。$\int_Qb=0$ だが $\int_2^\infty|\int_QK(x,y)b(y)\,dy|\,dx=\infty$ を証明し、失われた仮定を特定せよ。

<!-- solution-start -->
**詳細解答**　$\int_0^1b=(1/2)-(1/2)=0$。また $a(y)b(y)=a(y)^2=1$ がほとんど至る所で成り立ち、

$$
\int_QK(x,y)b(y)\,dy
=\int_0^1\frac{1}{x-y}\,dy
=\log\frac{x}{x-1}.
$$

$x>2$、$0\le y\le1$ では $1/(x-y)\ge1/x$ よりこの積分は $1/x$ 以上です。従って遠方の積分は $\int_2^\infty dx/x=\infty$。$y=1/2$ をまたいで $a(y)$ が跳ぶため[標準核の第2変数の滑らかさ](#def-ha5-standard-kernel)が失われ、零平均を用いた $K(x,y)-K(x,c_Q)$ の評価ができません。この反例は一般の弱型の否定を意味しません。
<!-- solution-end -->

<a id="ex-ha5-c01"></a>
**演習 HA5-C01（圧力Poisson方程式）**  
- Level: C

$d=3$、$1<p<\infty$、$v=(v_1,v_2,v_3)$ で各 $v_j\in L^{2p}(\mathbb R^3)$ とする。$\pi=\sum_{j,k=1}^3R_jR_k(v_jv_k)$ を定義する。(i) $\pi\in L^p$ と量的上界、(ii) $-\Delta\pi=\sum_{j,k}\partial_j\partial_k(v_jv_k)$ の分布等式、(iii) その $L^p$ 解の一意性を証明せよ。速度場の発散零はこの解析的主張に必要か。

<!-- solution-start -->
**詳細解答**　(i) [Hölder不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)で $\|v_jv_k\|_p\le\|v_j\|_{2p}\|v_k\|_{2p}$。[$R_j$の強型推定](#thm-ha5-riesz-kernel)を二回用い

$$
\|\pi\|_p
\le C_{p,3}\sum_{j,k=1}^3\|v_jv_k\|_p
\le C_{p,3}\left(\sum_{j=1}^3\|v_j\|_{2p}\right)^2<\infty.
$$

(ii) 滑らかなテンソル $F_{jk}$ から始めると、$R_jR_k$ の乗数は $-\xi_j\xi_k/|\xi|^2$ です。従って $-\Delta$ の乗数 $|\xi|^2$ を掛ければ $-\xi_j\xi_k$ となり、$\partial_j\partial_k$ の乗数に一致します。一般の $F_{jk}=v_jv_k\in L^p$ は滑らかな関数で $L^p$ 近似し、Riesz変換の有界性で左辺を $L^p$ 収束させ、両辺を試験関数で評価して分布極限を取れば結論です。

(iii) 二解の差 $h\in L^p$ は $\Delta h=0$ です。[圧力表示命題](#prop-ha5-pressure)の証明と同じくGaussian核で平滑化すると調和関数 $h*G_t$ になり、球平均と[Hölderの不等式](../../F0/F0-00D2D/index.md#thm-f0-00d2d-01)から $|h*G_t(x)|\le C R^{-3/p}\|h\|_p$。$R\to\infty$ で零、さらに $t\downarrow0$ で $h=0$。発散零は流体方程式から圧力式を導く場面で使う条件ですが、ここで定義した作用素の評価・分布恒等式・一意性そのものには不要です。
<!-- solution-end -->

## 7. 何を得て、何をまだ得ていないか

標準核の**滑らかさ**は悪い部分の零平均を遠方減衰に変え、独立に仮定した **$L^2$ 有界性**は良い部分を制御しました。これで弱型から強型までを自力でつなげます。Riesz変換の場合はFourier側で $L^2$ を確保できるため、この一般定理が実際に使用できます。

ただし、一般の切断核についての最大切断評価、すべての $L^p$ 関数の点wise主値収束、$L^\infty$ での強型評価までは示していません。最後の端点で何が起きるかを次のHA6で平均振動という新しい尺度を用いて調べます。
