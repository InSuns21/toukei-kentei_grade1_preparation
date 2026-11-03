# CYG1-07 接束のChern類とEuler標数

## 1. 正則体積形式だけではEuler標数は決まらない

前章では、標準束が自明なコンパクトKähler曲面にも、Euler標数が $24$ の [Fermat四次K3曲面](../CYG1-05/index.md#prop-cyg1-05-euler-24) と $0$ の[複素トーラス](../CYG1-06/index.md#prop-cyg1-06-surface-skeleton)があると分かった。標準束は接束の**第一**Chern類を制約するが、Euler標数を決めるには接束の**最高次**Chern類まで知りたい。

そこで、射影空間に一つの多項式方程式を課して作る超曲面について、周囲の接ベクトルから超曲面の接ベクトルを取り出す。幾何的な二つの完全列と、既習の[Whitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を組み合わせれば、任意の次元で使える計算が得られる。

本章を通して $m\ge2$、$d\ge1$ とし、$X_d\subset\mathbb P^m_{\mathbb C}$ は**滑らかな**次数 $d$ の射影超曲面とする。$X_d$ の複素次元は $n=m-1$、実次元は $2n$ である。$i:X_d\hookrightarrow\mathbb P^m$ は包含、$H=c_1(\mathcal O_{\mathbb P^m}(1))$ およびその $X_d$ への制限を同じ $H$ で表す。積 $H^j$ はカップ積、$\int_{X_d}$ は複素構造が定める向きで最高次数の類を基本類に評価する記号とする。

複素階数 $r$ の束 $E$ の全Chern類は

$$
c(E)=1+c_1(E)+\cdots+c_r(E),\qquad
c_j(E)\in H^{2j}(X;\mathbb Z)
$$

である。$c_j$ の添字 $j$ は**複素**次数を表し、実コホモロジー次数は $2j$ となる。特に複素次元 $n$ の $X_d$ では $H^{n+1}=0$ である。多項式の「$H$ の係数」と数値 $\int_{X_d}H^n$ を、最初から別物として扱おう。

## 2. 射影空間の接束は何からできているか

まず $\mathbb P^m$ 自身の接束を計算する。斉次座標 $[Z_0:\cdots:Z_m]$ は全成分を同じ非零数倍しても同じ点を表す。この「同時の倍率変更」は点を動かさないため、$(m+1)$ 個の座標方向から一つの余分な方向を除く必要がある。これを束の完全列で表したものが **Euler列**である。

<a id="prop-cyg1-07-euler"></a>

<!-- formal-statement-start -->
> **命題（射影空間のEuler列と接束の全Chern類）**
>
> $m\ge1$ とする。複素射影空間 $\mathbb P^m$ の正則接束 $T\mathbb P^m$ には短完全列

$$
0\longrightarrow\mathcal O_{\mathbb P^m}
\longrightarrow\mathcal O_{\mathbb P^m}(1)^{\oplus(m+1)}
\longrightarrow T\mathbb P^m\longrightarrow0
$$

> がある。$H=c_1(\mathcal O_{\mathbb P^m}(1))$ とすると

$$
c(T\mathbb P^m)=(1+H)^{m+1}
$$

> が $H^*(\mathbb P^m;\mathbb Z)$ で成り立つ。右辺は $H^{m+1}=0$ として読む。
<!-- formal-statement-end -->

### 証明の見取り図

アフィン座標 $x_j=Z_j/Z_i$ の上で、$(m+1)$ 個の局所係数 $(v_0,\ldots,v_m)$ から接ベクトルの係数 $v_j-x_jv_i$ を作る。その核は倍率方向だけであり、写像は全射する。最後に[全Chern類のWhitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を正確な短完全列に適用する。

<!-- proof-start -->
### 証明

$U_i=\{Z_i\ne0\}$ を取り、$x_i=1$、$x_j=Z_j/Z_i$（$j\ne i$）とする。$\mathcal O(1)$ を局所枠 $Z_i$ で自明化すると、列の中央の束のファイバーを $(m+1)$ 成分 $(v_0,\ldots,v_m)$ で表せる。第一の写像は局所的に

$$
a\longmapsto a(x_0,\ldots,x_m)
$$

であり、第二の写像は

$$
(v_0,\ldots,v_m)\longmapsto
\sum_{j\ne i}(v_j-x_jv_i)\frac{\partial}{\partial x_j}.
$$

実際、斉次座標を一階だけ $Z_j+\varepsilon\,\delta Z_j$ と変えたとき、商の微分は

$$
\delta\left(\frac{Z_j}{Z_i}\right)
=\frac{\delta Z_j\,Z_i-Z_j\,\delta Z_i}{Z_i^2}
=\frac{\delta Z_j}{Z_i}-x_j\frac{\delta Z_i}{Z_i}
$$

なので、$v_j=\delta Z_j/Z_i$ がこの係数に対応する。第一写像の像では $v_j=ax_j$、$v_i=a$ だから全ての係数が零。逆に第二写像の核では $v_j=x_jv_i$（全ての $j\ne i$）となり、$v_i$ 倍の $(x_0,\ldots,x_m)$ に限られる。さらに任意の接ベクトル $\sum_{j\ne i}b_j\partial_{x_j}$ に対し、$v_i=0$、$v_j=b_j$ と選べば像となる。各チャートで核と像、全射性を確かめたので列は完全である。

この局所表示がチャートの重なりで一致することも確認する。$U_i\cap U_\ell$ では $x_\ell\ne0$ であり、新しい座標を $y_j=Z_j/Z_\ell=x_j/x_\ell$ と置く。$\mathcal O(1)$ の局所枠が $Z_i$ から $Z_\ell$ に変わるので、中央の束の係数は $v_j^{(\ell)}=v_j/x_\ell$ に変わる。一方、商の微分に $\delta x_j=v_j-x_jv_i$（$x_i=1$ なら $\delta x_i=0$）を代入すると、$j\ne\ell$ に対して

$$
\begin{aligned}
\delta y_j
&=\frac{x_\ell\delta x_j-x_j\delta x_\ell}{x_\ell^2}\\
&=\frac{x_\ell(v_j-x_jv_i)-x_j(v_\ell-x_\ell v_i)}{x_\ell^2}\\
&=v_j^{(\ell)}-y_jv_\ell^{(\ell)}.
\end{aligned}
$$

従って第二写像は新しい局所枠でも同じ形を持つ。第一写像も $a(x_j/x_\ell)=ay_j$ へ移るので、両写像は貼り合わさって束の短完全列を与える。

自明線束の全Chern類は $c(\mathcal O)=1$、線束 $\mathcal O(1)$ の全Chern類は $1+H$ である。ここで[全Chern類のWhitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を使う。

$$
c(\mathcal O(1)^{\oplus(m+1)})
=c(\mathcal O)c(T\mathbb P^m)
=c(T\mathbb P^m).
$$

左辺は $(1+H)^{m+1}$ である。$\mathbb P^m$ の実次元は $2m$ なので $H^{m+1}$ 以上の項は消える。$\square$
<!-- proof-end -->

**直接例：$\mathbb P^1$。** $U_0$ の座標を $x=Z_1/Z_0$ とすれば、$(v_0,v_1)$ の像は $(v_1-xv_0)\partial_x$ である。$(1,x)$ は核に入り、$(0,b)$ は任意の $b\partial_x$ へ写る。従って階数は $2-1=1$。Chern類では $H^2=0$ として

$$
c(T\mathbb P^1)=(1+H)^2=1+2H,
$$

となる。元の斉次座標が二個あるから接束も階数二、とはならない点を確かめられた。

## 3. 法方向を一つ取り除く

次は $X_d$ の方程式 $F(Z_0,\ldots,Z_m)=0$ が、周囲の接ベクトルにどんな条件を課すかを調べる。$F$ は次数 $d$ の斉次多項式で、$U_i$ 上では $f_i=F/Z_i^d$ が局所方程式となる。接ベクトル $v$ が超曲面に接する条件は $df_i(v)=0$ だ。微分値がどのチャートで計算されても一致するように、法方向の値を線束 $\mathcal O_{X_d}(d)$ として束ねる。

<a id="prop-cyg1-07-normal"></a>

<!-- formal-statement-start -->
> **命題（滑らかな超曲面の法束完全列）**
>
> $d\ge1$、$m\ge2$ とし、斉次次数 $d$ の多項式 $F$ で定まる滑らかな超曲面 $i:X_d\hookrightarrow\mathbb P^m_{\mathbb C}$ を考える。$X_d$ の正則接束 $TX_d$ と周囲の接束の制限との間に短完全列

$$
0\longrightarrow TX_d\longrightarrow i^*T\mathbb P^m
\xrightarrow{\,dF\,}\mathcal O_{X_d}(d)\longrightarrow0
$$

> がある。右端の法束は $N_{X_d/\mathbb P^m}\simeq\mathcal O_{X_d}(d)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

局所方程式 $f_i$ で微分すると、核が超曲面の接空間となる。滑らかさを与える[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)が $df_i\ne0$ を保証するため、行き先が一次元の写像は各点で全射である。

<!-- proof-start -->
### 証明

$U_i\cap X_d$ では方程式は $f_i=0$。$U_i$ の接ベクトルを $v=\sum_{j\ne i}v_j\partial_{x_j}$ とすると

$$
df_i(v)=\sum_{j\ne i}\frac{\partial f_i}{\partial x_j}v_j.
$$

局所正則曲線 $x(t)$ が $X_d$ に含まれれば $f_i(x(t))=0$ なので $df_i(x'(0))=0$。逆に、[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)では、被約な局所方程式の微分が接空間を核として表示すると証明されている。滑らかな $X_d$ の局所方程式 $f_i$ にこれを適用すれば $\ker df_i=TX_d$、その複素階数は $m-1$ である。

さらに $df_i\ne0$ なので、ある $j$ について $\partial f_i/\partial x_j\ne0$。その点では $v_j=(\partial f_i/\partial x_j)^{-1}$、他成分零と取ると $df_i(v)=1$。行き先の一次元ファイバーへの全射性が直接確かめられる。

最後にチャートを替えると、$f_j=(Z_i/Z_j)^d f_i$ である。$X_d$ 上では $f_i=0$ だから

$$
df_j=(Z_i/Z_j)^d\,df_i\quad\text{on }X_d.
$$

この遷移は次数 $d$ の線束 $\mathcal O(d)$ の局所表示と一致する。よって局所の全射と核が正しく貼り合わされ、主張の短完全列を得る。$\square$
<!-- proof-end -->

**何が壊れ得るか。** 特異点 $p$ で全偏導関数が零なら $df_i|_p=0$ である。そこでは法方向への写像は全射せず、核の次元も期待した $m-1$ ではない。「次数 $d$ だから同じ公式」という推論は、この**滑らかさ**の仮定を落としている。

## 4. 二つの完全列を一つの計算式にする

先に $c(T\mathbb P^m)$ を計算し、次に $TX_d$ と法束に分ける。束の次数と、コホモロジーの次数の両方を追いながら公式を得よう。

<a id="prop-cyg1-07-total-chern"></a>

<!-- formal-statement-start -->
> **命題（滑らかな射影超曲面の全Chern類）**
>
> $m\ge2$、$d\ge1$、$X_d\subset\mathbb P^m_{\mathbb C}$ を滑らかな次数 $d$ の超曲面とし、$H=c_1(\mathcal O_{\mathbb P^m}(1)|_{X_d})$ とする。複素階数 $m-1$ の接束の全Chern類は

$$
c(TX_d)=\frac{(1+H)^{m+1}}{1+dH}
=\sum_{j=0}^{m-1}a_jH^j,
\qquad
a_j=\sum_{k=0}^j\binom{m+1}{k}(-d)^{j-k}.
$$

> 分母は $H^m=0$ の環での逆元として読み、特に $c_j(TX_d)=a_jH^j$（$0\le j\le m-1$）である。
<!-- formal-statement-end -->

### 証明の見取り図

[Euler列の結果](#prop-cyg1-07-euler)を $X_d$ へ制限すると周囲の接束の全Chern類は $(1+H)^{m+1}$。法束は $\mathcal O(d)$ なので $c=1+dH$。[Whitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)で割り算の形にし、有限次の幾何級数で係数を取り出す。

<!-- proof-start -->
### 証明

最初に[射影空間の計算](#prop-cyg1-07-euler)を包含 $i$ で引き戻す。Chern類の引戻しに関する自然性を使い、$i^*H$ を $H$ と書けば

$$
c(i^*T\mathbb P^m)=i^*c(T\mathbb P^m)=(1+H)^{m+1}.
$$

一方、$\mathcal O_{X_d}(d)=\mathcal O_{X_d}(1)^{\otimes d}$ である。[テンソル冪のChern形式](../../KAH/KAH1-14/index.md#prop-kah1-14-positive-curvature)の実係数計算と線束の整係数第一Chern類の加法性を使えば $c_1(\mathcal O_{X_d}(d))=dH$ となる。線束なので高次Chern類は零、従って全Chern類は $1+dH$ である。

[法束列](#prop-cyg1-07-normal)は短完全列である。これに[全Chern類のWhitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を適用して

$$
c(TX_d)\,(1+dH)=c(i^*T\mathbb P^m)=(1+H)^{m+1}.
$$

$\dim_{\mathbb C}X_d=m-1$ であり、$H^m$ は実次数 $2m>2(m-1)$ の類なので零である。この環では

$$
(1+dH)^{-1}=1-dH+d^2H^2-\cdots+(-d)^{m-1}H^{m-1},
$$

なぜなら $(1+dH)\sum_{q=0}^{m-1}(-dH)^q=1-(-dH)^m=1$ だからである。二項展開

$$
(1+H)^{m+1}=\sum_{k=0}^{m+1}\binom{m+1}{k}H^k
$$

と掛けると、$H^j$ の項は $k+q=j$ を満たす組からだけ生じ、係数は

$$
a_j=\sum_{k=0}^j\binom{m+1}{k}(-d)^{j-k}.
$$

階数 $m-1$ なので $j>m-1$ のChern類も存在せず、ちょうどこの打切りが正しい。$\square$
<!-- proof-end -->

**係数を手で見る。** 最初の三つを展開すると

$$
\begin{aligned}
c_1(TX_d)&=(m+1-d)H,\\
c_2(TX_d)&=\left[\binom{m+1}{2}-(m+1)d+d^2\right]H^2,\\
c_3(TX_d)&=\left[\binom{m+1}{3}-\binom{m+1}{2}d+(m+1)d^2-d^3\right]H^3.
\end{aligned}
$$

ただし $c_3$ が意味を持つのは $m-1\ge3$ の場合だけだ。第一式 $c_1=(m+1-d)H$ は[随伴公式による標準束の計算](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)の $K_{X_d}\simeq\mathcal O_{X_d}(d-m-1)$ と符号も一致する。

## 5. トップChern類をなぜ積分するのか

いま得た $c(TX_d)$ は**コホモロジー類**であり、まだEuler標数という整数ではない。最高次の項を基本類に評価してよい理由は、位相的Euler類とChern類を結ぶ別の定理にある。

<a id="thm-cyg1-07-gauss-bonnet"></a>

<!-- formal-statement-start -->
> **定理（トップChern類とEuler標数：外部入力）**
>
> $Y$ を境界のない滑らかなコンパクト複素 $n$ 次元多様体とする。複素接束 $TY$ の最高Chern類 $c_n(TY)\in H^{2n}(Y;\mathbb Z)$ を複素構造で定まる向きの基本類に評価すると、位相的Euler標数に等しい。

$$
\chi_{\mathrm{top}}(Y)=\sum_{q=0}^{2n}(-1)^q b_q(Y)=\int_Yc_n(TY).
$$
<!-- formal-statement-end -->

これは実接束のEuler類が複素接束のトップChern類に一致する事実と、Poincaré–Hopf／Chern–Gauss–Bonnet型の定理を結ぶ**外部入力**である。高次Chern類の一般的な構成と定理の完全証明はここでは用いない。既習の[複素曲面版](../CYG1-05/index.md#thm-cyg1-05-gauss-bonnet-input)は $n=2$ の場合である。

次に、積分する相手の数を決める。滑らかな次数 $d$ 超曲面の基本類は、周囲の $\mathbb P^m$ で $dH$ を表す（超曲面の次数と交叉積の対応）。周囲の正規化 $\int_{\mathbb P^m}H^m=1$ と、基本類の押し出し・引戻しによる評価を組み合わせると

$$
\int_{X_d}H^{m-1}
=\int_{\mathbb P^m}H^{m-1}\smile[X_d]
=d\int_{\mathbb P^m}H^m=d.
$$

この交叉積の対応も外部入力だが、$H^{m-1}$ 自体が数 $d$ なのではなく、その**積分値**が $d$ であるという違いは式から分かる。

<a id="prop-cyg1-07-euler-formula"></a>

<!-- formal-statement-start -->
> **命題（超曲面のEuler標数の一般公式）**
>
> $m\ge2$、$d\ge1$ とし、$X_d\subset\mathbb P^m_{\mathbb C}$ を滑らかな次数 $d$ の超曲面とする。このとき

$$
\chi_{\mathrm{top}}(X_d)
=d\sum_{k=0}^{m-1}\binom{m+1}{k}(-d)^{m-1-k}
=m+1+\frac{(1-d)^{m+1}-1}{d}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

[全Chern類の式](#prop-cyg1-07-total-chern)からトップ係数 $a_{m-1}$ だけを抜き、[トップChern類とEuler標数](#thm-cyg1-07-gauss-bonnet)に $Y=X_d$ を代入する。閉じた式への変形では二項定理の一次項を相殺する。

<!-- proof-start -->
### 証明

$X_d$ は滑らかで射影的だからコンパクト・境界なしであり、複素次元は $m-1$。従って[外部定理](#thm-cyg1-07-gauss-bonnet)の仮定を満たす。[全Chern類の係数公式](#prop-cyg1-07-total-chern)に $j=m-1$ を代入すると

$$
c_{m-1}(TX_d)
=\left(\sum_{k=0}^{m-1}\binom{m+1}{k}(-d)^{m-1-k}\right)H^{m-1}.
$$

係数は整数なので積分の外へ出せる。先ほどの次数計算 $\int_{X_d}H^{m-1}=d$ から第一の等式を得る。

第二の等式は添字を $r=m+1-k$ と置き直して確認する。$k=0,\ldots,m-1$ は $r=m+1,\ldots,2$ に対応し、$(-1)^{r-2}=(-1)^r$ だから

$$
\begin{aligned}
\chi_{\mathrm{top}}(X_d)
&=\sum_{r=2}^{m+1}\binom{m+1}{r}(-1)^r d^{r-1}\\
&=\frac{1}{d}\left[\sum_{r=0}^{m+1}\binom{m+1}{r}(-d)^r-1+(m+1)d\right]\\
&=\frac{(1-d)^{m+1}-1}{d}+m+1.
\end{aligned}
$$

二行目では二項定理の $r=0$ 項 $1$ と $r=1$ 項 $-(m+1)d$ を取り除いた。$d>0$ なので除算にも問題はない。$\square$
<!-- proof-end -->

**低次元の確認。**

| 複素次元 | 周囲 | トップChern類の係数 | Euler標数 |
| --- | --- | --- | --- |
| $1$ | $\mathbb P^2$ | $3-d$ | $d(3-d)$ |
| $2$ | $\mathbb P^3$ | $6-4d+d^2$ | $d(6-4d+d^2)$ |
| $3$ | $\mathbb P^4$ | $10-10d+5d^2-d^3$ | $d(10-10d+5d^2-d^3)$ |

平面三次曲線なら $d=3$、$c_1(TX_3)=(3-3)H=0$、$\chi=3(3-3)=0$。四次曲面なら $d=4$、$c_2=(6-16+16)H^2=6H^2$ から $\chi=6\cdot4=24$。両者とも、次数が変わると積分するトップChern類の**添字**も変わる。

## 6. quinticの $-200$ はどこから来るか

次章でHodge数を計算する五次三次元超曲面を、ここでは位相的な数だけで先に準備する。

<a id="prop-cyg1-07-quintic"></a>

<!-- formal-statement-start -->
> **命題（滑らかなFermat五次超曲面のChern数）**
>
> $X=\{Z_0^5+\cdots+Z_4^5=0\}\subset\mathbb P^4_{\mathbb C}$ とし、$H=c_1(\mathcal O_{\mathbb P^4}(1)|_X)$ とする。$X$ は滑らかなコンパクト複素三次元多様体であり、

$$
c(TX)=1+10H^2-40H^3,
\qquad \chi_{\mathrm{top}}(X)=-200.
$$

> 特に $c_1(TX)=0$、$c_2(TX)=10H^2$、$c_3(TX)=-40H^3$ である。
<!-- formal-statement-end -->

### 証明の見取り図

五つの偏微分が同時に零になる射影点は存在しない。よって[超曲面公式](#prop-cyg1-07-total-chern)を $m=4,d=5$ で使い、$H^4=0$ まで展開する。積分値 $\int_XH^3=5$ と[トップChern類の定理](#thm-cyg1-07-gauss-bonnet)を最後に使う。

<!-- proof-start -->
### 証明

斉次方程式 $F=\sum_{j=0}^4Z_j^5$ の偏微分は

$$
\frac{\partial F}{\partial Z_j}=5Z_j^4\quad(0\le j\le4).
$$

これが全て零なら $Z_j=0$ が全 $j$ で成り立つが、原点は射影空間の点ではない。また $F$ に平方因子 $G^2$ があれば、$G=0$ 上では全偏導関数が零になるはずなので、$F$ に平方因子はない。従って[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の仮定がそろい、$X$ は滑らか。射影空間の閉部分集合なのでコンパクトである。

$\dim_{\mathbb C}X=4-1=3$ だから $H^4=0$。[全Chern類の式](#prop-cyg1-07-total-chern)を用い、分子と分母の逆元をそれぞれ三次まで書くと

$$
\begin{aligned}
(1+H)^5&=1+5H+10H^2+10H^3,\\
(1+5H)^{-1}&=1-5H+25H^2-125H^3.
\end{aligned}
$$

ここで $[H^j]$ はこの展開式の $H^j$ の係数を取り出す記号とし、コホモロジー類の括弧ではない。積の各係数は

$$
\begin{aligned}
[H^1]&:5-5=0,\\
[H^2]&:10-25+25=10,\\
[H^3]&:10-50+125-125=-40.
\end{aligned}
$$

よって $c(TX)=1+10H^2-40H^3$。

最後に $X$ が滑らか・コンパクトな複素三次元であることを確認済みなので[トップChern類とEuler標数](#thm-cyg1-07-gauss-bonnet)を適用できる。$\int_XH^3=5$ を代入し

$$
\chi_{\mathrm{top}}(X)=\int_Xc_3(TX)
=-40\int_XH^3=-40\cdot5=-200.
$$

符号はトップ係数の負号に由来する。$\square$
<!-- proof-end -->

**これはHodge数そのものではない。** [前章の三次元Hodge数の数値骨格](../CYG1-06/index.md#prop-cyg1-06-threefold-skeleton)は、$a=h^{1,0}$、$b=h^{2,0}$、$c=h^{1,1}$、$e=h^{2,1}$ と置くと $\chi=2(c+2b-2a-e)$ を与える。今回得た $-200$ だけでは四つの未知数は決まらない。次章で弱Lefschetzなどを使って残りを求める。

## 7. 演習：どの仮定と次数で計算したか

<a id="ex-cyg1-07-a01"></a>
#### CYG1-07-A01 Euler列の局所核
- Level: A

$\mathbb P^2$ の $U_0=\{Z_0\ne0\}$ で $x=Z_1/Z_0$、$y=Z_2/Z_0$ とする。$(v_0,v_1,v_2)$ から接ベクトル $(v_1-xv_0)\partial_x+(v_2-yv_0)\partial_y$ への写像の核と階数を求めよ。

<!-- solution-start -->
**詳細解答。** 像が零である条件は $v_1=xv_0$ と $v_2=yv_0$ である。$a=v_0$ とおけば核は $\{a(1,x,y):a\in\mathbb C\}$ の一次元空間。任意の接ベクトル $b\partial_x+c\partial_y$ は $(0,b,c)$ の像なので全射し、像の複素次元は2である。よって中央の階数3から核の階数1を引くと、$T\mathbb P^2$ の階数2を得る。これは[局所Euler列](#prop-cyg1-07-euler)そのものである。
<!-- solution-end -->

<a id="ex-cyg1-07-a02"></a>
#### CYG1-07-A02 二つの線束の全Chern類
- Level: A

複素線束 $L,M$ の第一Chern類を $u,v$ とする。$E=L\oplus M$ の $c_1(E),c_2(E)$ を求め、$c_2$ の実コホモロジー次数を答えよ。

<!-- solution-start -->
**詳細解答。** 線束の全Chern類は $c(L)=1+u$、$c(M)=1+v$。[Whitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)を分裂する短完全列 $0\to L\to L\oplus M\to M\to0$ に適用し、

$$
c(E)=(1+u)(1+v)=1+(u+v)+uv.
$$

従って $c_1(E)=u+v\in H^2$、$c_2(E)=uv\in H^4$。複素階数2の束の最高Chern類は実次数4である。
<!-- solution-end -->

<a id="ex-cyg1-07-a03"></a>
#### CYG1-07-A03 逆数の打切り
- Level: A

$H^3=0$ の可換環で、$(1+dH)^{-1}$ を二次まで求め、積が $1$ になることを確認せよ。

<!-- solution-start -->
**詳細解答。** 候補を $1-dH+d^2H^2$ と置いて掛けると

$$
\begin{aligned}
(1+dH)(1-dH+d^2H^2)
&=1-dH+d^2H^2+dH-d^2H^2+d^3H^3\\
&=1+d^3H^3=1.
\end{aligned}
$$

$H^3=0$ の環に限った逆元であり、数として $H$ が小さいと仮定する無限級数の収束議論ではない。
<!-- solution-end -->

<a id="ex-cyg1-07-a04"></a>
#### CYG1-07-A04 次数を積分する
- Level: A

滑らかな次数 $d$ 超曲面 $X_d\subset\mathbb P^3$ について、$H=c_1(\mathcal O_{\mathbb P^3}(1)|_{X_d})$ とする。$\int_{X_d}H^2$ を求め、なぜ $H^2=d$ と書いてはいけないか説明せよ。$[X_d]=dH$ と $\int_{\mathbb P^3}H^3=1$ を使ってよい。

<!-- solution-start -->
**詳細解答。** 問題で与えられた超曲面の基本類と積分の評価を順に使う。

$$
\int_{X_d}H^2
=\int_{\mathbb P^3}H^2\smile[X_d]
=\int_{\mathbb P^3}H^2(dH)
=d\int_{\mathbb P^3}H^3=d.
$$

$H^2$ は $H^4(X_d;\mathbb Z)$ に属する類、$d$ はその類の基本類への評価値であり、型が違うので等号を置かない。
<!-- solution-end -->

<a id="ex-cyg1-07-a05"></a>
#### CYG1-07-A05 平面三次曲線のEuler標数
- Level: A

$X_3\subset\mathbb P^2$ を滑らかな次数3の曲線とする。全Chern類の一次項とEuler標数を求めよ。

<!-- solution-start -->
**詳細解答。** 複素次元は $n=2-1=1$、従って $H^2=0$。 [超曲面の全Chern類](#prop-cyg1-07-total-chern)へ $m=2,d=3$ を代入すると

$$
c(TX_3)=\frac{(1+H)^3}{1+3H}
=(1+3H)(1-3H)=1.
$$

よって $c_1(TX_3)=0$。滑らか・射影的でコンパクトだから[トップChern類とEuler標数](#thm-cyg1-07-gauss-bonnet)が使え、$\chi=\int_{X_3}c_1=0$。一般の平面曲線公式 $d(3-d)$ にも $d=3$ を入れれば0となる。
<!-- solution-end -->

<a id="ex-cyg1-07-b01"></a>
#### CYG1-07-B01 法束列の全射が必要な理由
- Level: B

滑らかな超曲面 $X_d=\{F=0\}\subset\mathbb P^m$ の局所方程式を $f_i=F/Z_i^d$ とする。$df_i$ の核と全射性を、偏導関数を使って示せ。さらにチャート変更 $f_j=(Z_i/Z_j)^df_i$ の微分の余分な項が $X_d$ 上で消える理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $x_k=Z_k/Z_i$ のチャートで $v=\sum_{k\ne i}v_k\partial_{x_k}$ とすると

$$
df_i(v)=\sum_{k\ne i}(\partial f_i/\partial x_k)v_k.
$$

滑らかさにより少なくとも一つの偏導関数が非零である。非零な添字 $\ell$ を選び、$v_\ell=(\partial f_i/\partial x_\ell)^{-1}$、他は零とすれば値が1になるので、一次元の行き先へ全射する。さらに[射影超曲面のJacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の接空間表示を適用すると、$df_i$ の核が $TX_d$ となる。

チャート変更の微分は積の規則で

$$
df_j=(Z_i/Z_j)^d df_i+f_i\,d((Z_i/Z_j)^d).
$$

$X_d$ 上では $f_i=0$ だから第二項が消え、最初の係数が $\mathcal O(d)$ の遷移を与える。[法束列](#prop-cyg1-07-normal)の条件を確認できた。
<!-- solution-end -->

<a id="ex-cyg1-07-b02"></a>
#### CYG1-07-B02 一般のトップ係数を取り出す
- Level: B

滑らかな $X_d\subset\mathbb P^4$ で $H=c_1(\mathcal O(1)|_{X_d})$ とする。$c_1,c_2,c_3$ の各係数を $d$ の多項式として導き、$\chi_{\mathrm{top}}(X_d)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 複素次元3だから $H^4=0$。[全Chern類公式](#prop-cyg1-07-total-chern)の分子と逆数を三次で止める。

$$
(1+H)^5=1+5H+10H^2+10H^3,
\qquad(1+dH)^{-1}=1-dH+d^2H^2-d^3H^3.
$$

係数は積の同じ次数を集めて

$$
\begin{aligned}
c_1&=(5-d)H,\\
c_2&=(10-5d+d^2)H^2,\\
c_3&=(10-10d+5d^2-d^3)H^3.
\end{aligned}
$$

滑らかで射影的なので[トップChern類定理](#thm-cyg1-07-gauss-bonnet)が使える。さらに $\int_{X_d}H^3=d$ だから

$$
\chi_{\mathrm{top}}(X_d)=d(10-10d+5d^2-d^3).
$$
<!-- solution-end -->

<a id="ex-cyg1-07-b03"></a>
#### CYG1-07-B03 K3の24を別の次元で検算
- Level: B

滑らかな四次曲面 $Y_4\subset\mathbb P^3$ について、$c(TY_4)$ とEuler標数を本章の一般式を用いて計算し、複素次元・積分次数・符号を確認せよ。

<!-- solution-start -->
**詳細解答。** $\dim_{\mathbb C}Y_4=2$ なので $H^3=0$、トップは $c_2$。[全Chern類](#prop-cyg1-07-total-chern)の式を展開すると

$$
\begin{aligned}
c(TY_4)&=(1+4H+6H^2)(1-4H+16H^2)\\
&=1+(4-4)H+(6-16+16)H^2=1+6H^2.
\end{aligned}
$$

よって $c_2=6H^2$ は実次数4の類。滑らか・射影的でコンパクトなので[トップChern類定理](#thm-cyg1-07-gauss-bonnet)と $\int_{Y_4}H^2=4$ から $\chi=6\cdot4=24$。三次元の $c_3$ を使ったり、係数6だけをEuler標数と読んだりしてはいけない。
<!-- solution-end -->

<a id="ex-cyg1-07-b04"></a>
#### CYG1-07-B04 特異点で壊れる箇所
- Level: B

$Y=\{Z_0^4+Z_1^4+Z_2^4=0\}\subset\mathbb P^3$ に対し、$p=[0:0:0:1]$ を調べよ。滑らかな四次曲面のChern類公式をそのまま当てはめる議論のどこが壊れるか、完全列の写像で説明せよ。

<!-- solution-start -->
**詳細解答。** $p$ では $F(p)=0$ なので $p\in Y$。斉次偏導関数は

$$
(\partial F/\partial Z_0,\ldots,\partial F/\partial Z_3)
=(4Z_0^3,4Z_1^3,4Z_2^3,0)
$$

であり、$p$ で全て零になる。もし $F$ が平方因子 $G^2$ を持てば、積の微分から $G$ は全偏導関数の共通因子になる。しかし、非零な三つの偏導関数 $4Z_0^3,4Z_1^3,4Z_2^3$ の最大公約因子は $1$ なので、$F$ に平方因子はない。

従って[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)の被約性の仮定を満たし、$p$ は特異点である。局所法方向写像 $dF:T\mathbb P^3|_Y\to\mathcal O_Y(4)$ は $p$ のファイバーで零写像となり、全射でない。

したがって滑らかな階数2の $TY$ を核とする[法束完全列](#prop-cyg1-07-normal)が成立しない。次数が4というだけでは[全Chern類公式](#prop-cyg1-07-total-chern)や滑らかな複素曲面に対する[トップChern類定理](#thm-cyg1-07-gauss-bonnet)の仮定を満たさない。
<!-- solution-end -->

<a id="ex-cyg1-07-c01"></a>
#### CYG1-07-C01 quinticのEuler標数を二経路で導く
- Level: C

五次Fermat超曲面 $X=\{\sum_{j=0}^4Z_j^5=0\}\subset\mathbb P^4$ を考える。次をすべて確認せよ。

1. $X$ の滑らかさ・複素次元・コンパクト性。
2. $c_1,c_2,c_3$ を全Chern類の展開から求める。
3. トップChern類の積分と一般Euler公式から別々に $\chi$ を計算する。
4. この計算だけで $h^{2,1}=101$ を主張できるか判定する。

<!-- solution-start -->
**詳細解答。**

1. $\partial F/\partial Z_j=5Z_j^4$ が全て零なら全 $Z_j=0$ となり、射影点ではない。平方因子があればその零点で全偏導関数が零になるので、平方因子もない。[Jacobian判定](../../../代数系/AG/AG2-11/index.md#thm-ag2-11-jacobian-criterion)で滑らか。超曲面なので複素次元 $4-1=3$、射影空間内の閉集合なのでコンパクトである。
2. $H^4=0$ として

$$
(1+H)^5(1+5H)^{-1}
=(1+5H+10H^2+10H^3)(1-5H+25H^2-125H^3).
$$

$H$ の係数は $5-5=0$、$H^2$ は $10-25+25=10$、$H^3$ は $10-50+125-125=-40$。従って $c_1=0,c_2=10H^2,c_3=-40H^3$。
3. [トップChern類定理](#thm-cyg1-07-gauss-bonnet)と $\int_XH^3=5$ より $\chi=-40\cdot5=-200$。独立な代入検算として[一般Euler公式](#prop-cyg1-07-euler-formula)に $m=4,d=5$ を入れると

$$
\chi=5+\frac{(1-5)^5-1}{5}=5+\frac{-1024-1}{5}=-200.
$$

4. [三次元Hodge数の関係](../CYG1-06/index.md#prop-cyg1-06-threefold-skeleton)を使う前に、その仮定を照合する。

   滑らかな射影多様体なので[射影多様体のKähler性](../../KAH/KAH1-14/index.md#thm-kah1-14-projective-integral)が使える。また[標準束の次数判定](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)では $d=m+1=5$ だから $K_X\simeq\mathcal O_X$。

   さらに正次数超曲面 $X$ は連結である。もし $F=GH$ と非自明に分解すれば、射影空間で正次数の二つの超曲面 $G=0,H=0$ は交わり、その交点では $dF=G\,dH+H\,dG=0$ となり、滑らかさに反する。

   よって同命題が適用でき、$\chi=2(c+2b-2a-e)$。ただし、このEuler数だけでは $a,b,c,e$ は決定しない。$h^{2,1}=101$ には次章で弱Lefschetzなどから $a=b=0,c=1$ を別に示す必要がある。
<!-- solution-end -->

<a id="ex-cyg1-07-c02"></a>
#### CYG1-07-C02 四次と五次はどこで違うか
- Level: C

$X_d\subset\mathbb P^4$ を滑らかな次数 $d$ の超曲面とし、$d=4,5$ を比較する。$c_1,c_2,c_3,\chi_{\mathrm{top}}$ をそれぞれ求め、[標準束自明性の次数判定](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)でどちらの標準束が正則自明か確かめよ。さらにEuler標数が同じなら標準束も同じだと言えるか考察せよ。

<!-- solution-start -->
**詳細解答。** $m=4$ の[係数公式](#prop-cyg1-07-total-chern)に $d$ を代入する。

$$
\begin{array}{c|cccc}
d&c_1&c_2&c_3&\chi_{\mathrm{top}}\\\hline
4&H&6H^2&-14H^3&-14\cdot4=-56\\
5&0&10H^2&-40H^3&-40\cdot5=-200
\end{array}
$$

四次の三次係数は $10-40+80-64=-14$、五次は $10-50+125-125=-40$ と直接検算できる。[標準束自明性の次数判定](../CYG1-02/index.md#thm-cyg1-02-hypersurface-degree)に $m=4$ を代入すると

$$
K_{X_d}\simeq\mathcal O_{X_d}(d-5)
$$

となる。五次では自明束を得るが、四次では $K_{X_4}\simeq\mathcal O_{X_4}(-1)$。後者の第一Chern類は $-H$ であり、$\int_{X_4}H^3=4\ne0$ なので $H\ne0$、従って正則自明ではない。

この二つの超曲面のEuler標数は異なるため、これだけでは「同じEuler標数なら標準束も同じ」という命題を否定できない。別の反例として、楕円曲線 $E$ に対する二つの積 $E\times E$ と $E\times\mathbb P^1$ を比べる。$E$ は $\chi(E)=0$、$K_E$ は自明なので、$E\times E$ の標準束も自明である。

一方、$E\times\mathbb P^1$ の二つの射影を $\pi_1,\pi_2$ とすると、積の局所座標の接方向から $T(E\times\mathbb P^1)\simeq\pi_1^*TE\oplus\pi_2^*T\mathbb P^1$ である。任意の点 $e\in E$ に対し、$\{e\}\times\mathbb P^1$ に制限した第一項は固定ベクトル空間 $T_eE$ をファイバーに持つ自明線束なので、その第一Chern類は零。[Whitney積公式](../CYG1-05/index.md#thm-cyg1-05-whitney)と[射影直線の第一Chern類](#prop-cyg1-07-euler)を用いると

$$
c_1(T(E\times\mathbb P^1))|_{\{e\}\times\mathbb P^1}=2H\ne0.
$$

従って[標準束の第一Chern類の符号](../../KAH/KAH1-12/index.md#cor-kah1-12-canonical-sign)から、こちらの標準束は自明でない。

Euler標数は有限CW複体の積のセル数を数えれば積に関して乗法的なので、両者とも零である。

$$
\chi(E\times E)=\chi(E)^2=0,
\qquad
\chi(E\times\mathbb P^1)=\chi(E)\chi(\mathbb P^1)=0.
$$

したがってEuler標数だけから標準束の自明性は判定できない。
<!-- solution-end -->

## 8. 次のHodge数計算へ

二つの局所的な完全列とWhitney積公式から一般の全Chern類を導き、滑らかさとコンパクト性を確認したうえで最高次だけを積分した。とりわけ五次三次元超曲面では $c_3=-40H^3$ と $\int_XH^3=5$ が別々の入力で、積分して初めて $-200$ が出る。

次章ではこのEuler標数に弱Lefschetz超平面定理・Hodge分解・非零Kähler類という独立の入力を組み合わせ、五次三次元超曲面のHodge数を決める。
