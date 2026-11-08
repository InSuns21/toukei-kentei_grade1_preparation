# DEF1-09 Bogomolov–Tian–Todorov I――核心恒等式

<!-- definition-example-audit: strict -->

## 1. 二次の括弧を「微分したもの」に変えたい

[二次障害類](../DEF1-05/index.md#def-def1-05-primary-obstruction)は、一次の接束値 $(0,1)$ 形式 $\phi$ に対する $\frac12[\phi,\phi]$ のDolbeault類だった。一般のコンパクト複素多様体では、この類が零になる保証はない。[Kuranishi基底](../DEF1-07/index.md#def-def1-07-kuranishi-germ)は障害写像の零点集合として構成されたが、その零点集合が滑らかかどうかは別の問題である。

今回は、**零にならない正則体積形式を持つコンパクトKähler多様体**で、障害を消すための新しい機構を組み立てる。正則体積形式 $\Omega$ でベクトルを形式へ置き換えると、二次括弧の収縮が $\partial$-完全になる。その後で初めて、大域 $\partial\bar\partial$-補題が $\bar\partial$-完全性を与える。

二つの段階を混同しないことが大切だ。

1. **局所的・代数的段階**：$\partial(\phi\lrcorner\Omega)=0$ を使い、$[\phi,\psi]\lrcorner\Omega$ を $\partial$-完全と示す。ここにはKähler仮定を使わない。
2. **大域的・コホモロジー的段階**：括弧が $\bar\partial$-閉でもあれば、コンパクトKähler上の $\partial\bar\partial$-補題で $\bar\partial$-完全にする。

$X$ は以後、複素次元 $n\ge2$ の複素多様体、$T_X=T^{1,0}X$ とする。$K_X\simeq\mathcal O_X$ を仮定すると、[標準束の自明化](../../CYG/CYG1-02/index.md#prop-cyg1-02-volume-trivialization)により各点で零でない大域正則 $n$ 形式 $\Omega$ を選べる。局所正則座標では

$$
\Omega=f(z)\,dz^1\wedge\cdots\wedge dz^n,
\qquad f(z)\ne0.
$$

$\Omega$ の非消滅性は収縮の**逆**に必要であり、Kähler性はこの時点では不要である。複素次元 $1$ の場合は $\mathcal A^{0,2}(X,T_X)=0$ なので二次障害そのものが零になる。以下の二重収縮は $n\ge2$ について扱う。

## 2. 収縮が $\partial$-閉であるとは何か

[体積形式による収縮](../../CYG/CYG1-12/index.md#def-cyg1-12-contraction)を、既習の「反正則成分は左」規約で使う。$\phi=\sum_jd\bar z^j\otimes\phi_{\bar j}$ と書けば

$$
\mathcal I_{\Omega,1}(\phi)
=\sum_jd\bar z^j\wedge\iota_{\phi_{\bar j}}\Omega
\in\mathcal A^{n-1,1}(X).
$$

ここで $\iota_v\Omega$ は最初の引数を $v$ に固定した内部積である。$\partial$ は正則次数を1上げるから、$\partial\mathcal I_{\Omega,1}(\phi)$ の型は $(n,1)$。この閉条件を座標で判定するため、$\Omega$ に関する発散を導入する。

<a id="def-def1-09-volume-divergence"></a>

<!-- formal-statement-start -->
> **定義（体積形式に関する発散）**
>
> 各点で零でない正則 $n$ 形式 $\Omega$ と滑らかな $(1,0)$ ベクトル場 $v$ に対し、唯一の滑らかな関数 $\operatorname{div}_{\Omega}v$ を

$$
\partial(\iota_v\Omega)
=(\operatorname{div}_{\Omega}v)\Omega
$$

> で定める。$\Omega=f\,dz^1\wedge\cdots\wedge dz^n$、$v=\sum_pv^p\partial_{z^p}$ では

$$
\operatorname{div}_{\Omega}v
=\frac1f\sum_p\partial_{z^p}(fv^p).
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-09-volume-divergence -->
**定義の確認**（平面で符号も確認）。$\mathbb C^2$、$\Omega=dz^1\wedge dz^2$、$v=z^1\partial_{z^1}+2z^2\partial_{z^2}$ とする。$\iota_v\Omega=z^1dz^2-2z^2dz^1$ だから

$$
\partial(\iota_v\Omega)
=dz^1\wedge dz^2-2dz^2\wedge dz^1
=3\Omega.
$$

座標式でも $\partial_{z^1}(z^1)+\partial_{z^2}(2z^2)=1+2=3$。$\Omega$ は非零なのでこの係数は一意であり、定義の両方の表示が一致する。
<!-- definition-example-end -->

収縮の式に $\partial$ を作用させると、$\partial d\bar z^j=0$ と外積のLeibniz則（$d\bar z^j$ は次数1）より

$$
\partial\mathcal I_{\Omega,1}(\phi)
=-\sum_jd\bar z^j\wedge
  (\operatorname{div}_{\Omega}\phi_{\bar j})\Omega.
$$

したがって、$\Omega$ が非消滅であることと $d\bar z^j$ の線形独立性から

$$
\boxed{\ \partial\mathcal I_{\Omega,1}(\phi)=0
\quad\Longleftrightarrow\quad
\operatorname{div}_{\Omega}\phi_{\bar j}=0\quad(1\le j\le n).\ }
$$

この条件は $\bar\partial_T\phi=0$ とは**異なる**。前者は正則方向の微分、後者は反正則方向の微分であり、後で両方を用いる。

## 3. 二重収縮の順序を固定する

二つのベクトルを体積形式の二つの引数へ入れると、正則次数が2減る。$\phi$ と $\psi$ の反正則1形式部分も外積するので、出力は $(n-2,2)$ 型である。符号を曖昧にすると核心恒等式の右辺が反転するため、順序を定義に含める。

<a id="def-def1-09-double-contraction"></a>

<!-- formal-statement-start -->
> **定義（接束値形式の二重収縮）**
>
> $n\ge2$、$\phi,\psi\in\mathcal A^{0,1}(X,T_X)$ とし、局所的に $\phi=\sum_jd\bar z^j\otimes\phi_{\bar j}$、$\psi=\sum_kd\bar z^k\otimes\psi_{\bar k}$ と書く。二重収縮 $B_\Omega(\phi,\psi)\in\mathcal A^{n-2,2}(X)$ を

$$
B_\Omega(\phi,\psi)
=\sum_{j,k}d\bar z^j\wedge d\bar z^k
\wedge\iota_{\psi_{\bar k}}\iota_{\phi_{\bar j}}\Omega
$$

> で定める。内部積は右から順に作用させる。$B_\Omega(\phi,\psi)=B_\Omega(\psi,\phi)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-def1-09-double-contraction -->
**定義の確認**。$\mathbb C^2$、$\Omega=dz^1\wedge dz^2$、$\phi=a\,d\bar z^1\otimes\partial_{z^1}$、$\psi=b\,d\bar z^2\otimes\partial_{z^2}$ では

$$
\iota_{\partial_{z^1}}\Omega=dz^2,
\quad \iota_{\partial_{z^2}}dz^2=1,
\quad B_\Omega(\phi,\psi)=ab\,d\bar z^1\wedge d\bar z^2.
$$

入力を交換すると、反正則外積が $-$、内部積の交換も $-$ を与え、積は $+$ になる。実際 $\iota_{\partial_{z^1}}\iota_{\partial_{z^2}}\Omega=-1$、$d\bar z^2\wedge d\bar z^1=-d\bar z^1\wedge d\bar z^2$ で同じ値を得る。型は $(0,2)=(n-2,2)$ である。
<!-- definition-example-end -->

**なぜ大域的か。** $\phi$ と $\psi$ はテンソルであり、内部積と外積は各点での線形・交代演算である。局所座標を変えても同じテンソルに対する二つの収縮を計算しているので、上式は貼り合う。対称性は $\iota_v\iota_w=-\iota_w\iota_v$ と反正則1形式の交代性が二度の符号反転を打ち消すことから従う。

## 4. Cartan恒等式から括弧を微分へ変える

核心の前に、滑らかな $(1,0)$ ベクトル場 $U,V$ に対して、通常のLie括弧 $[U,V]$ と内部積をつなぐ公式を証明する。ここでの $\partial$ は滑らかな係数を正則座標方向で微分する作用素である。$\Omega$ は正則最高次形式なので $\partial\Omega=0$。

<a id="lem-def1-09-cartan"></a>

<!-- formal-statement-start -->
> **補題（正則Cartan収縮恒等式）**
>
> $X$ を複素次元 $n\ge2$ の複素多様体、$\Omega$ を零にならない正則 $n$ 形式、$U,V$ を滑らかな $(1,0)$ ベクトル場とする。その通常のLie括弧について

$$
\partial(\iota_V\iota_U\Omega)
=(\operatorname{div}_\Omega V)\iota_U\Omega
 -(\operatorname{div}_\Omega U)\iota_V\Omega
 -\iota_{[U,V]}\Omega.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\partial$ と内部積から正則方向のLie微分 $L^{1,0}_U=\partial\iota_U+\iota_U\partial$ を作る。$L^{1,0}_U\Omega=(\operatorname{div}_\Omega U)\Omega$ と、$[L^{1,0}_V,\iota_U]=\iota_{[V,U]}$ を直接座標で確認して代入する。

<!-- proof-start -->
### 証明

局所座標で $U=\sum_pu^p\partial_{z^p}$ とし、$\partial$ は係数の $z$ 方向微分として働く。$L^{1,0}_U=\partial\iota_U+\iota_U\partial$ を定義すると、関数 $g$ について $L^{1,0}_Ug=U(g)$、基本1形式について $L^{1,0}_Udz^q=\partial u^q$、$L^{1,0}_Ud\bar z^q=0$ である。従って $L^{1,0}_U$ は外積にLeibniz則を満たし、$\Omega=f dz^1\wedge\cdots\wedge dz^n$ に作用させると

$$
L^{1,0}_U\Omega
=\left(U(f)+f\sum_p\partial_{z^p}u^p\right)
dz^1\wedge\cdots\wedge dz^n
=(\operatorname{div}_\Omega U)\Omega.
$$

次に関数 $g$ と基本形式 $dz^q$ に $L_V^{1,0}\iota_U-\iota_U L_V^{1,0}$ を作用させる。関数では両辺が零、$dz^q$ では

$$
V(u^q)-\iota_U\partial v^q
=V(u^q)-U(v^q)
=([V,U])^q.
$$

両辺が外積上の次数 $-1$ の導分であることから、任意の形式で $[L^{1,0}_V,\iota_U]=\iota_{[V,U]}$ が従う。最後に $\partial\Omega=0$ と $\partial\iota_U\Omega=(\operatorname{div}_\Omega U)\Omega$ を代入すると

$$
\begin{aligned}
\partial(\iota_V\iota_U\Omega)
&=L^{1,0}_V(\iota_U\Omega)-\iota_V\partial(\iota_U\Omega)\\
&=\iota_U L^{1,0}_V\Omega+\iota_{[V,U]}\Omega
  -(\operatorname{div}_\Omega U)\iota_V\Omega\\
&=(\operatorname{div}_\Omega V)\iota_U\Omega
  -(\operatorname{div}_\Omega U)\iota_V\Omega
  -\iota_{[U,V]}\Omega.
\end{aligned}
$$

これは各座標近傍で成立し、両辺は大域的な形式なので $X$ 上で成立する。$\square$
<!-- proof-end -->

これを接束値1形式の各反正則成分へ適用する。既習の[次数1の括弧](../DEF1-03/index.md#def-def1-03-bracket)は、通常のベクトル場のLie括弧を用いて、$j<k$ の成分を

$$
[\phi,\psi]_{\bar j\bar k}
=[\phi_{\bar j},\psi_{\bar k}]
 -[\phi_{\bar k},\psi_{\bar j}]
$$

と書ける。右辺の括弧はここでは**通常のベクトル場のLie括弧**である。定義の四項に展開すれば、二種類の括弧を混同せずに一致を検算できる。

<a id="thm-def1-09-tian-todorov"></a>

<!-- formal-statement-start -->
> **定理（Tian–Todorov核心恒等式）**
>
> $X$ を複素次元 $n\ge2$ の複素多様体、$\Omega$ を零にならない正則 $n$ 形式とする。$\phi,\psi\in\mathcal A^{0,1}(X,T_X)$ が

$$
\partial\mathcal I_{\Omega,1}(\phi)=0,
\qquad
\partial\mathcal I_{\Omega,1}(\psi)=0
$$

> を満たすなら、既習の接束値括弧と上記の二重収縮について

$$
\boxed{\ \mathcal I_{\Omega,2}([\phi,\psi])
=-\partial B_\Omega(\phi,\psi).\ }
$$

> 特に括弧の収縮は $\partial$-完全である。この結論には $\bar\partial_T\phi=\bar\partial_T\psi=0$ もKähler性も必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

$\partial$-閉条件は第2節で各 $\phi_{\bar j}$、$\psi_{\bar k}$ の $\Omega$-発散が零であることと同値だった。[正則Cartan収縮恒等式](#lem-def1-09-cartan)から二重収縮の微分には $-\iota_{[\phi_{\bar j},\psi_{\bar k}]}\Omega$ だけが残り、反正則外積の係数をまとめると次数1括弧になる。

<!-- proof-start -->
### 証明

$\partial\mathcal I_{\Omega,1}(\phi)=0$ を第2節で導いた式へ代入すると、すべての $j$ で $\operatorname{div}_{\Omega}\phi_{\bar j}=0$。$\psi$ についても同様である。したがって[補題](#lem-def1-09-cartan)に $U=\phi_{\bar j}$、$V=\psi_{\bar k}$ を代入すれば

$$
\partial(\iota_{\psi_{\bar k}}\iota_{\phi_{\bar j}}\Omega)
=-\iota_{[\phi_{\bar j},\psi_{\bar k}]}\Omega.
$$

二重収縮は第3節の定義で反正則部分を左へ置いた。$\partial$ をそこへ作用させると、反正則1形式を**二本**越えるので符号は $(-1)^2=+1$。よって

$$
\begin{aligned}
\partial B_\Omega(\phi,\psi)
&=\sum_{j,k}d\bar z^j\wedge d\bar z^k
 \wedge\partial(\iota_{\psi_{\bar k}}\iota_{\phi_{\bar j}}\Omega)\\
&=-\sum_{j<k}d\bar z^j\wedge d\bar z^k
 \wedge\iota_{[\phi_{\bar j},\psi_{\bar k}]-[\phi_{\bar k},\psi_{\bar j}]}\Omega\\
&=-\mathcal I_{\Omega,2}([\phi,\psi]).
\end{aligned}
$$

最後の等号には第4節で確認した接束値括弧の成分式と[収縮の型別拡張](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を使った。$\square$
<!-- proof-end -->

### 手計算：括弧は零でなくても $\partial$-完全

$\mathbb C^2$ の $\Omega=dz^1\wedge dz^2$ 上で

$$
\phi=z^2d\bar z^1\otimes\partial_{z^1},
\qquad
\psi=z^1d\bar z^2\otimes\partial_{z^2}
$$

とする。$\partial_{z^1}z^2=0$、$\partial_{z^2}z^1=0$ なので、二つの発散は零である。括弧の $\bar1\bar2$ 成分は

$$
[\phi,\psi]_{\bar1\bar2}
=-z^1\partial_{z^1}+z^2\partial_{z^2}.
$$

一方 $B_\Omega(\phi,\psi)=z^1z^2 d\bar z^1\wedge d\bar z^2$。$\iota_{\partial_{z^1}}\Omega=dz^2$、$\iota_{\partial_{z^2}}\Omega=-dz^1$ から

$$
\begin{aligned}
\mathcal I_{\Omega,2}([\phi,\psi])
&=d\bar z^1\wedge d\bar z^2\wedge(-z^1dz^2-z^2dz^1)\\
&=-\partial(z^1z^2d\bar z^1\wedge d\bar z^2).
\end{aligned}
$$

括弧自体は一般に零でないが、その収縮は $\partial$-完全である。これは局所計算であり、非コンパクトな $\mathbb C^2$ に大域 $\partial\bar\partial$-補題を適用したわけではない。

## 5. どこでKähler条件を使うか

次数1の変形は $\bar\partial_T$-閉形式の類で表される。核心恒等式には $\partial$-閉性が必要だが、任意の $\bar\partial_T$-閉代表がその条件を満たすわけではない。ここで調和代表を選ぶ。

<a id="prop-def1-09-closed-representative"></a>

<!-- formal-statement-start -->
> **命題（一次類の∂閉代表の選択）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体とし、$\Omega$ を零にならない大域正則 $n$ 形式とする。任意の $a\in H^1(X,T_X)$ に対し、$a$ を代表する滑らかな接束値 $(0,1)$ 形式 $\phi$ を、同時に

$$
\bar\partial_T\phi=0,
\qquad \partial\mathcal I_{\Omega,1}(\phi)=0
$$

> を満たすように選べる。
<!-- formal-statement-end -->

### 証明の見取り図

[収縮によるDolbeault同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)で $a$ を $(n-1,1)$ 型の類に移し、Kähler計量の調和代表を取る。調和代表は $\bar\partial$-閉かつ $\partial$-閉であり、収縮を逆にたどればよい。

<!-- proof-start -->
### 証明

[収縮による同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)で $a$ に対応する $H_{\bar\partial}^{n-1,1}(X)$ の類を $b$ とする。[Dolbeaultコホモロジーの調和代表](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)から $b$ に一意の滑らかな $\bar\partial$-調和代表 $h$ がある。

コンパクトKähler上では[型別Laplacianの一致](../../HOD/HOD1-05/index.md#thm-hod1-05-laplacian-equality)により $\Delta_d=2\Delta_{\bar\partial}=2\Delta_\partial$。$\Delta_{\bar\partial}h=0$ なので $\Delta_\partial h=0$。非負性を表す $0=(\Delta_\partial h,h)=\|\partial h\|^2+\|\partial^*h\|^2$ から $\partial h=0$（同時に $\bar\partial h=0$）である。

$\mathcal I_{\Omega,1}$ は各点で線形同型なので、$\phi:=\mathcal I_{\Omega,1}^{-1}(h)$ は滑らかである。さらに同型が $\bar\partial_T$ と $\bar\partial$ を可換にするため、

$$
\mathcal I_{\Omega,2}(\bar\partial_T\phi)
=\bar\partial h=0.
$$

収縮の単射性から $\bar\partial_T\phi=0$。そして $\partial\mathcal I_{\Omega,1}(\phi)=\partial h=0$。Dolbeault類も $a$ と一致する。$\square$
<!-- proof-end -->

次に $\bar\partial_T$-閉な $\phi,\psi$ の括弧は、[接束値Dolbeault複体の括弧恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)により $\bar\partial_T$-閉である。ここまでを二次障害へまとめる。

<a id="thm-def1-09-quadratic-obstruction"></a>

<!-- formal-statement-start -->
> **定理（Calabi–Yauの二次障害類の消滅）**
>
> $X$ を複素次元 $n\ge2$ のコンパクトKähler多様体とし、$K_X\simeq\mathcal O_X$ とする。任意の $a,b\in H^1(X,T_X)$ を、上記命題による $\bar\partial_T$-閉かつ収縮後 $\partial$-閉な代表 $\phi,\psi$ で表す。このとき

$$
\bigl[[\phi,\psi]\bigr]_{\bar\partial_T}
=0\quad\text{in }H^2(X,T_X),
$$

> すなわち括弧のDolbeault類は零である。とくに $a=b$ とすれば、[二次障害類](../DEF1-05/index.md#def-def1-05-primary-obstruction) $\frac12[\phi,\phi]$ の類は零である。
<!-- formal-statement-end -->

### 証明の見取り図

核心恒等式で $\gamma=\mathcal I_{\Omega,2}([\phi,\psi])$ が $\partial$-完全になる。括弧の $\bar\partial_T$-閉性から $\gamma$ は $\bar\partial$-閉でもある。[大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)をこの**二つの条件を同時に満たす形式**へ適用し、$\gamma$ の $\bar\partial$-原始形式を作って収縮を逆にする。

<!-- proof-start -->
### 証明

$K_X\simeq\mathcal O_X$ から非消滅 $\Omega$ を選べる。前命題により $\phi,\psi$ を選び、$\gamma=\mathcal I_{\Omega,2}([\phi,\psi])\in\mathcal A^{n-1,2}$ と置く。[核心恒等式](#thm-def1-09-tian-todorov)から

$$
\gamma=-\partial B_\Omega(\phi,\psi)
\in\operatorname{im}\partial.
$$

一方、[括弧の微分恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)に $\bar\partial_T\phi=\bar\partial_T\psi=0$ を代入すると $\bar\partial_T[\phi,\psi]=0$。収縮は $\bar\partial$ と可換なので

$$
\bar\partial\gamma
=\mathcal I_{\Omega,3}(\bar\partial_T[\phi,\psi])=0.
$$

ここで $n=2$ の場合も $\mathcal A^{n-1,3}=0$ と解せる。よって $\gamma\in\operatorname{im}\partial\cap\ker\bar\partial$。コンパクトKählerであることを確認して[大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)を $(p,q)=(n-1,2)$ に適用すると、滑らかな $u\in\mathcal A^{n-2,1}$ が存在し

$$
\gamma=\partial\bar\partial u
=-\bar\partial(\partial u).
$$

$\eta:=\mathcal I_{\Omega,1}^{-1}(-\partial u)\in\mathcal A^{0,1}(X,T_X)$ と定める。[収縮の複体同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)により

$$
\mathcal I_{\Omega,2}(\bar\partial_T\eta)
=\bar\partial(-\partial u)=\gamma
=\mathcal I_{\Omega,2}([\phi,\psi]).
$$

収縮の単射性から $[\phi,\psi]=\bar\partial_T\eta$。したがってそのDolbeault類、ひいては層コホモロジー $H^2(X,T_X)$ での類が零となる。$a=b$ では係数 $1/2$ を掛けても零である。$\square$
<!-- proof-end -->

**何をまだ証明していないか。** 二次の障害類が消えたことだけから、すべての高次で補正が選べるとも、その形式的級数が収束するとも言えない。後続の[高次障害の定義と延長判定](../DEF1-05/index.md#thm-def1-05-higher-criterion)では、係数 $\phi_r$ が一般に $\bar\partial_T$-閉でないため、ここでの二次障害の議論を一行で反復することはできない。次章DEF1-10で次数ごとの $\partial$-閉ゲージ、帰納法、解析的収束を別々に扱う。

## 6. 仮定を落としたときと、零になる簡単な例

**$\partial$-閉性を落とすと公式が壊れる。** $\mathbb C^2$、$\Omega=dz^1\wedge dz^2$ で $\phi=z^1d\bar z^1\otimes\partial_{z^1}$、$\psi=d\bar z^2\otimes\partial_{z^2}$ とする。両者は $\bar\partial_T$-閉だが $\operatorname{div}_\Omega\phi_{\bar1}=1$。括弧は零、一方

$$
B_\Omega(\phi,\psi)=z^1d\bar z^1\wedge d\bar z^2,
\qquad
\partial B_\Omega(\phi,\psi)=d\bar z^1\wedge d\bar z^2\wedge dz^1\ne0.
$$

ゆえに $\partial$-閉条件なしで $\mathcal I([\phi,\psi])=-\partial B$ と書いてはいけない。壊れたのはCartan恒等式の**発散項が消える**という段階である。

**平坦複素トーラス。** $X=\mathbb C^n/\Lambda$、$\Omega=dz^1\wedge\cdots\wedge dz^n$ では、[定数係数の一次変形代表](../../CYG/CYG1-12/index.md#prop-cyg1-12-torus-directions)はすべて $\bar\partial_T$-閉で発散零である。正則座標方向の係数微分も零なので $[\phi,\psi]=0$ となる。これは定理の特別に簡単な場合だが、一般のKähler多様体では括弧が形式として零であるとは限らない。

**Kähler性を落とすと何が残るか。** 正則体積形式が存在し、$\partial$-閉代表が与えられれば第4節の核心恒等式は成り立つ。しかし $\partial$-完全かつ $\bar\partial$-閉な形式を大域的に $\bar\partial$-完全へ変えるには追加仮定がいる。[大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)を無条件に使うことはできない。また、体積形式が途中で零になれば収縮の逆が失われる（[反例](../../CYG/CYG1-12/index.md#thm-cyg1-12-bundle-isomorphism)の後の説明）。

## 7. 演習――符号・仮定・コホモロジーの三段階

### Level A：定義と一段の計算

#### DEF1-09-A01 三次元の収縮符号

- Level: A

$\Omega=dz^1\wedge dz^2\wedge dz^3$、$U=\partial_{z^1}$、$V=\partial_{z^3}$ とする。$\iota_U\Omega$ と $\iota_V\iota_U\Omega$ を求めよ。

<!-- solution-start -->
**詳細解答。** 最初の引数を $U$ に固定すると $\iota_U\Omega=dz^2\wedge dz^3$。この1番目の引数へ $V=\partial_{z^3}$ を入れると、$\iota_V(dz^2\wedge dz^3)=dz^2(V)dz^3-dz^3(V)dz^2=0-dz^2=-dz^2$。よって二重収縮は $-dz^2$ である。内部積の作用順を逆にすると符号が反転する。
<!-- solution-end -->

#### DEF1-09-A02 発散零の判定

- Level: A

$\mathbb C^2$ で $\Omega=dz^1\wedge dz^2$、$U=z^2\partial_{z^1}+z^1\partial_{z^2}$ とする。$\operatorname{div}_\Omega U$ を計算し、$\partial\iota_U\Omega$ と照合せよ。

<!-- solution-start -->
**詳細解答。** 発散は $\partial_{z^1}z^2+\partial_{z^2}z^1=0+0=0$。内部積は $\iota_U\Omega=z^2dz^2-z^1dz^1$。$\partial(z^2dz^2)=dz^2\wedge dz^2=0$、$\partial(z^1dz^1)=dz^1\wedge dz^1=0$ なので $\partial\iota_U\Omega=0=(\operatorname{div}_\Omega U)\Omega$ である。
<!-- solution-end -->

#### DEF1-09-A03 局所括弧の二成分

- Level: A

$\phi=z^2d\bar z^1\otimes\partial_{z^1}$、$\psi=z^1d\bar z^2\otimes\partial_{z^2}$ に対して、$[\phi,\psi]_{\bar1\bar2}$ を既習の四項式から求めよ。

<!-- solution-start -->
**詳細解答。** [括弧の成分式](../DEF1-03/index.md#def-def1-03-bracket)の $i=1$ では $-\psi^2_{\bar2}\partial_{z^2}\phi^1_{\bar1}=-z^1\partial_{z^2}z^2=-z^1$ だけが残る。$i=2$ では $\phi^1_{\bar1}\partial_{z^1}\psi^2_{\bar2}=z^2\partial_{z^1}z^1=z^2$ だけが残る。ゆえに $[\phi,\psi]_{\bar1\bar2}=-z^1\partial_{z^1}+z^2\partial_{z^2}$。両入力を交換しても次数1の括弧は同じである。
<!-- solution-end -->

#### DEF1-09-A04 複素曲線の例外

- Level: A

複素次元 $1$ で二次障害形式と $B_\Omega(\phi,\psi)$ を同じ定義域で扱わない理由を述べよ。

<!-- solution-start -->
**詳細解答。** $[\phi,\psi]$ は接束値 $(0,2)$ 形式であり、複素次元1では $d\bar z\wedge d\bar z=0$ なので必ず零。二次障害形式も零となる。一方 $B_\Omega$ は $(n-2,2)=(-1,2)$ 型となり、通常の微分形式としては定義の対象でない。従って本章では二重収縮を $n\ge2$ に限定し、$n=1$ の結論は型の消滅から直接得る。
<!-- solution-end -->

#### DEF1-09-A05 発散項を残す反例

- Level: A

$\phi=z^1d\bar z^1\otimes\partial_{z^1}$、$\psi=d\bar z^2\otimes\partial_{z^2}$ とする。$\Omega=dz^1\wedge dz^2$ に対し $\partial\mathcal I_{\Omega,1}(\phi)$ が零でないことを示し、なぜ $-\partial B_\Omega=\mathcal I[\phi,\psi]$ と結論できないか説明せよ。

<!-- solution-start -->
**詳細解答。** $\mathcal I_{\Omega,1}(\phi)=z^1d\bar z^1\wedge dz^2$ だから $\partial\mathcal I_{\Omega,1}(\phi)=dz^1\wedge d\bar z^1\wedge dz^2=-d\bar z^1\wedge\Omega\ne0$。定義により発散は1である。$\psi$ は定数係数なので $[\phi,\psi]=0$。しかし $B=z^1d\bar z^1\wedge d\bar z^2$ より $\partial B=d\bar z^1\wedge d\bar z^2\wedge dz^1\ne0$。Cartan恒等式で発散を消した段階が適用不能だった。
<!-- solution-end -->

### Level B：複数の道具を接続する

#### DEF1-09-B01 Cartan公式を座標で再導出する

- Level: B

$\mathbb C^2$ で $U=a(z,\bar z)\partial_{z^1}$、$V=b(z,\bar z)\partial_{z^2}$、$\Omega=dz^1\wedge dz^2$ とする。$\partial(\iota_V\iota_U\Omega)$ と、発散2項から $\iota_{[U,V]}\Omega$ を引いた式をそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答。** $\iota_U\Omega=a dz^2$、$\iota_V\iota_U\Omega=ab$ なので $\partial(ab)=\partial_{z^1}(ab)dz^1+\partial_{z^2}(ab)dz^2$。発散は $\operatorname{div}U=\partial_{z^1}a$、$\operatorname{div}V=\partial_{z^2}b$。通常の括弧は $[U,V]=a(\partial_{z^1}b)\partial_{z^2}-b(\partial_{z^2}a)\partial_{z^1}$ であり、収縮は $\iota_{[U,V]}\Omega=-a(\partial_{z^1}b)dz^1-b(\partial_{z^2}a)dz^2$。従って補題の右辺は

$$
\begin{aligned}
&(\partial_{z^2}b)a dz^2-(\partial_{z^1}a)(-b dz^1)-\iota_{[U,V]}\Omega\\
&=(b\partial_{z^1}a+a\partial_{z^1}b)dz^1
 +(a\partial_{z^2}b+b\partial_{z^2}a)dz^2
=\partial(ab),
\end{aligned}
$$

となり左右が一致する。$a,b$ は正則でなくても、$z$ 微分に関するこの計算は成立する。
<!-- solution-end -->

#### DEF1-09-B02 二重収縮の対称性と係数2

- Level: B

$\alpha=a\,d\bar z^1\otimes\partial_{z^1}+b\,d\bar z^2\otimes\partial_{z^2}$ とする。$B_\Omega(\alpha,\alpha)$ を $\Omega=dz^1\wedge dz^2$ で求め、なぜ $ab$ でなく $2ab$ になるか説明せよ。

<!-- solution-start -->
**詳細解答。** $j=k$ の項は $d\bar z^j\wedge d\bar z^j=0$。$(j,k)=(1,2)$ では $\iota_{\partial_{z^2}}\iota_{\partial_{z^1}}\Omega=1$ から $ab\,d\bar z^1\wedge d\bar z^2$。$(2,1)$ では $d\bar z^2\wedge d\bar z^1=-d\bar z^1\wedge d\bar z^2$、$\iota_{\partial_{z^1}}\iota_{\partial_{z^2}}\Omega=-1$ なので再び $ab\,d\bar z^1\wedge d\bar z^2$。合計 $2ab\,d\bar z^1\wedge d\bar z^2$。この係数2は[括弧の対角成分の $1/2$](../DEF1-03/index.md#def-def1-03-bracket)との整合を検算する際にも重要である。
<!-- solution-end -->

#### DEF1-09-B03 大域∂∂̄補題から原始形式へ

- Level: B

$X$ は複素次元 $n\ge2$ のコンパクトKähler多様体、$\Omega$ は非消滅正則体積形式とする。$\gamma\in\mathcal A^{n-1,2}$ が $\gamma\in\operatorname{im}\partial\cap\ker\bar\partial$ を満たし、さらに $\gamma=\mathcal I_{\Omega,2}(\tau)$、$\bar\partial_T\tau=0$ とする。$\tau=\bar\partial_T\eta$ となる $\eta$ を記号的に構成せよ。

<!-- solution-start -->
**詳細解答。** [大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)の仮定はコンパクトKähler性、$\partial$-完全性、$\bar\partial$-閉性で、すべて満たされている。よって $u\in\mathcal A^{n-2,1}$ を選んで $\gamma=\partial\bar\partial u$ とできる。反交換関係 $\partial\bar\partial=-\bar\partial\partial$ より $\gamma=\bar\partial(-\partial u)$。$-\partial u$ は $(n-1,1)$ 型なので[収縮の逆同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)を適用し、$\eta=\mathcal I_{\Omega,1}^{-1}(-\partial u)$ と置く。すると $\mathcal I_{\Omega,2}(\bar\partial_T\eta)=\bar\partial(-\partial u)=\gamma=\mathcal I_{\Omega,2}(\tau)$、単射性から $\tau=\bar\partial_T\eta$。$\eta$ の係数の存在を得たのであり、数値として一意だとは主張していない。
<!-- solution-end -->

#### DEF1-09-B04 調和代表が満たす二種類の閉性

- Level: B

コンパクトKähler $X$ 上で $a\in H^1(X,T_X)$ を $\Omega$ で $(n-1,1)$ 型のDolbeault類へ移し、調和代表 $h$ を選んだ。$\partial h=\bar\partial h=0$ を導き、$\phi=\mathcal I_{\Omega,1}^{-1}h$ の二種類の条件を書け。

<!-- solution-start -->
**詳細解答。** [調和代表定理](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)で $\Delta_{\bar\partial}h=0$、従ってエネルギー恒等式で $\bar\partial h=0$。[KählerのLaplacian一致](../../HOD/HOD1-05/index.md#thm-hod1-05-laplacian-equality)から $\Delta_\partial h=\Delta_{\bar\partial}h=0$ であり、再びエネルギー恒等式で $\partial h=0$。$\mathcal I$ と $\bar\partial$ の可換性から $\mathcal I_{\Omega,2}(\bar\partial_T\phi)=\bar\partial h=0$、逆同型の単射性で $\bar\partial_T\phi=0$。また $\partial\mathcal I_{\Omega,1}(\phi)=\partial h=0$。前者だけでは後者を導けず、Kähler条件の出番を区別できる。
<!-- solution-end -->

### Level C：一続きの障害消滅を組み立てる

#### DEF1-09-C01 二次障害の消滅と証明範囲

- Level: C

$X$ を複素次元 $n\ge2$ のコンパクトKähler多様体、$K_X\simeq\mathcal O_X$ とし、$a\in H^1(X,T_X)$ とする。

1. $a$ の代表 $\phi$ を $\bar\partial_T\phi=0$、$\partial\mathcal I_{\Omega,1}(\phi)=0$ を満たすように選ぶ手順を述べよ。
2. $B_\Omega(\phi,\phi)$ と $\mathcal I_{\Omega,2}([\phi,\phi])$ の型を求め、後者が $\partial$-完全かつ $\bar\partial$-閉であることを示せ。
3. $\frac12[\phi,\phi]$ のDolbeault類が零であることを、$\partial\bar\partial$-補題の適用条件と収縮の逆まで書いて証明せよ。
4. 以上から「収束する変形族が存在する」とただちに言えるか。理由を述べよ。

<!-- solution-start -->
**詳細解答。**

**(1)** $K_X$ が自明なので[非消滅正則体積形式](../../CYG/CYG1-02/index.md#prop-cyg1-02-volume-trivialization) $\Omega$ を選ぶ。[収縮によるDolbeault同型](../../CYG/CYG1-12/index.md#thm-cyg1-12-cohomology-isomorphism)で $a$ に対応する $H_{\bar\partial}^{n-1,1}$ の類を作り、[Kähler調和代表定理](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)で $h$ を選ぶ。$\Delta_\partial=\Delta_{\bar\partial}$ により $\partial h=\bar\partial h=0$。$\phi=\mathcal I_{\Omega,1}^{-1}(h)$ は収縮の複体同型により $\bar\partial_T\phi=0$、また $\partial\mathcal I_{\Omega,1}(\phi)=0$ を満たす。

**(2)** $B_\Omega(\phi,\phi)$ は $(n-2,2)$ 型、括弧は接束値 $(0,2)$ 型、収縮後は $(n-1,2)$ 型である。[核心恒等式](#thm-def1-09-tian-todorov)の仮定は(1)で確保したので $\mathcal I_{\Omega,2}([\phi,\phi])=-\partial B_\Omega(\phi,\phi)$ と書け、$\partial$-完全。[接束値括弧の微分恒等式](../DEF1-05/index.md#lem-def1-05-graded-identities)と $\bar\partial_T\phi=0$ から $\bar\partial_T[\phi,\phi]=0$。収縮の可換性で $\bar\partial\mathcal I_{\Omega,2}([\phi,\phi])=0$ である。

**(3)** $\gamma=\frac12\mathcal I_{\Omega,2}([\phi,\phi])$ と置く。(2)から $\gamma\in\operatorname{im}\partial\cap\ker\bar\partial$。$X$ はコンパクトKählerなので[大域 $\partial\bar\partial$-補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)が適用でき、$u\in\mathcal A^{n-2,1}$ で $\gamma=\partial\bar\partial u=-\bar\partial\partial u$ を満たすものがある。$\eta=\mathcal I_{\Omega,1}^{-1}(-\partial u)$ を選べば

$$
\mathcal I_{\Omega,2}(\bar\partial_T\eta)
=\bar\partial(-\partial u)
=\gamma
=\mathcal I_{\Omega,2}\left(\frac12[\phi,\phi]\right).
$$

収縮の単射性で $\frac12[\phi,\phi]=\bar\partial_T\eta$、すなわち二次障害類は零。

**(4)** 言えない。(3)で確かめたのは二次のコホモロジー的可解性であり、高次の障害の整合、補正係数の選択を全次数で実行する帰納法、形式的級数の解析的収束は未証明である。[Kuranishiの解析的基底](../DEF1-07/index.md#thm-def1-07-analytic-base)だけでも障害写像の零性は従わない。これらは次章で分けて論証する。
<!-- solution-end -->

## 8. 今章で得たこと

正則体積形式の収縮、発散零条件、二重収縮を[正則Cartan収縮恒等式](#lem-def1-09-cartan)でつなぐと

$$
\partial\mathcal I_\Omega(\phi)
=\partial\mathcal I_\Omega(\psi)=0
\quad\Longrightarrow\quad
\mathcal I_\Omega([\phi,\psi])=-\partial B_\Omega(\phi,\psi)
$$

となる。コンパクトKählerではさらに、[Dolbeaultコホモロジーの調和代表](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)を選び、[大域∂∂̄補題](../../HOD/HOD1-08/index.md#thm-hod1-08-ddbar-lemma)を使って、$H^1(X,T_X)$ の二次障害類が零であることまで証明した。これはBogomolov–Tian–Todorovの**核心恒等式**であり、BTT非障害性の全証明はまだ先にある。次のDEF1-10では、二次を越えてすべての次数の方程式を解き、形式解と実際の解析的変形族をつなぐ。
