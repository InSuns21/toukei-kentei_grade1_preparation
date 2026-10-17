# MF7 oldform・newform・レベルと算術

[MF5のHecke作用素](../MF5/index.md#def-mf5-level-operators)は同じレベルのカスプ形式を動かし、[MF6のEuler積](../MF6/index.md#thm-mf6-euler)は固有形式の係数を素数ごとの因子へ分解しました。しかし、レベル $N$ の形式が本当に $N$ で初めて生まれたとは限りません。たとえばレベル1の $\Delta(\tau)$ は $\Delta(2\tau)$ に置き換えるだけでレベル2のカスプ形式になります。後者をレベル2の「新しい」算術情報と数えてよいのでしょうか。

低いレベルから持ち上げられた部分を除けば、レベルに固有の情報を持つ形式が残ります。本章では、低レベルからの引き上げ操作を実際に変換則から作り、oldspaceとその直交補newspaceを定め、悪い素数の局所因子を調べます。空間の基本構成は証明しますが、同時固有基底・一意性や局所係数の深い部分は **Atkin–Lehner–Liの定理**として出典と証明範囲を明示して用います。最後にレベル11の重さ2の具体例で全体を接続します。

<!-- definition-example-audit: strict -->

## 1. 低いレベルから来た形式を見つける

[合同部分群に関するモジュラー形式・カスプ形式](../MF4/index.md#def-mf4-level-form)により、$S_k(\Gamma_0(M))$ の元は全カスプで消え、重さ $k$ の変換則を満たします。本章では $k\ge2$ を**偶数**、指標を自明とし、$M\mid N$ を正の整数とします。

まず $M\mid N$ なら $\Gamma_0(N)\subseteq\Gamma_0(M)$ なので、$f(\tau)$ 自体はレベル $N$ でも形式です。さらに整数 $d\mid N/M$ に対し、引数を $d$ 倍した $f(d\tau)$ もレベル $N$ に属します。この二つを統一して扱う操作を、次で定義します。

<a id="def-mf7-degeneracy"></a>
<!-- formal-statement-start -->
> **定義（退化写像）**  
> $M\mid N$、$d\mid N/M$、偶数 $k\ge2$ とする。$f\in S_k(\Gamma_0(M))$ に対し
>
$$
V_d f(\tau)=f(d\tau)
$$
>
> と置く。$V_d:S_k(\Gamma_0(M))\to S_k(\Gamma_0(N))$ を退化写像という。ここでは $d^{k/2}$ を掛けない規約を採る。
<!-- formal-statement-end -->

ここで行列を使うのは基底を変えるためではなく、分数線形変換 $\tau\mapsto d\tau$ を $D=\operatorname{diag}(d,1)$ で表し、既習の[合同部分群の変換則](../MF4/index.md#def-mf4-level-form)と照合するためです。以下では変換則・上半平面での正則性・全カスプでの消失を順に確認します。

<a id="prop-mf7-degeneracy"></a>
<!-- formal-statement-start -->
> **命題（退化写像はカスプ形式を保つ）**  
> $M\mid N$、$d\mid N/M$、偶数 $k\ge2$ に対し、$V_d$ は well-defined な単射である。さらに $V_aV_b=V_{ab}$ が定義できるレベルの間で成立する。
<!-- formal-statement-end -->

### 証明の見取り図

$\tau$ を $d\tau$ へ移す行列 $D=\operatorname{diag}(d,1)$ で $\Gamma_0(N)$ の元を共役すると、$\Gamma_0(M)$ の元になります。カスプでの消失は有限被覆の局所変数に置き換えて確認します。

<!-- proof-start -->
### 証明

$\gamma=\begin{pmatrix}a&b\\c&e\end{pmatrix}\in\Gamma_0(N)$、$D=\begin{pmatrix}d&0\\0&1\end{pmatrix}$ とする。行列積を計算すると

$$
D\gamma D^{-1}
=\begin{pmatrix}a&db\\c/d&e\end{pmatrix}.
$$

$c$ は $N$ の倍数、$d\mid N/M$ だから $c/d$ は $M$ の倍数である。従って $D\gamma D^{-1}\in\Gamma_0(M)$ である。分数線形変換について $d(\gamma\tau)=(D\gamma D^{-1})(d\tau)$ となるため、[MF4の変換則](../MF4/index.md#def-mf4-level-form)を使って

$$
\begin{aligned}
(V_df)(\gamma\tau)
&=f\!\left((D\gamma D^{-1})(d\tau)\right)\\
&=((c/d)(d\tau)+e)^k f(d\tau)\\
&=(c\tau+e)^k(V_df)(\tau).
\end{aligned}
$$

上半平面上で正則なのは、正の整数 $d$ による引数の変換と $f$ の正則性から従う。

全カスプでの消失を、[スケーリング行列と幅の定義](../MF4/index.md#def-mf4-cusp-width)に戻って確かめる。レベル $N$ の任意のカスプ $s$ を取り、$\sigma_s\in SL_2(\mathbb Z)$ を $\sigma_s\infty=s$ となる行列、その幅を $h_s$ とする。$D$ が分数線形変換として送る $s'=D\cdot s$ は有理カスプなので、レベル $M$ のスケーリング行列 $\sigma_{s'}\in SL_2(\mathbb Z)$ が取れる。その幅を $h'$ と記す。

$$
A=\sigma_{s'}^{-1}D\sigma_s
=\begin{pmatrix}\alpha&\beta\\0&\delta\end{pmatrix},
\qquad \alpha,\delta>0,\quad \alpha\delta=d.
$$

$\sigma_{s'}$ の符号は必要なら $-1$ 倍して $\alpha,\delta>0$ とできる。$A$ が上三角なのは $A\cdot\infty=\infty$ だからである。$\sigma_s,\sigma_{s'}$ は整数行列で行列式1なので、$\alpha,\beta,\delta$ は整数である。カスプ幅の定義から $\sigma_sT^{h_s}\sigma_s^{-1}\in\Gamma_0(N)$ であり、先ほど証明した $D\Gamma_0(N)D^{-1}\subseteq\Gamma_0(M)$ を使うと

$$
AT^{h_s}A^{-1}=T^{\alpha h_s/\delta}
\in \sigma_{s'}^{-1}\Gamma_0(M)\sigma_{s'}.
$$

左辺は整数行列であり、右辺の群の無限遠での平行移動の最小正周期は $h'$ である。従って $\alpha h_s/\delta=rh'$ を満たす正整数 $r$ が存在する。これは**元のカスプ変数を引き戻したときの冪指数**を決める関係である。

[正の行列式のslash作用](../MF5/index.md#def-mf5-slash)では $f|_kD=d^{k/2}V_df$ であり、右作用の合成から

$$
\begin{aligned}
((V_df)|_k\sigma_s)(\tau)
&=d^{-k/2}(f|_kD\sigma_s)(\tau)\\
&=d^{-k/2}((f|_k\sigma_{s'})|_kA)(\tau)\\
&=\delta^{-k}(f|_k\sigma_{s'})
  \left(\frac{\alpha\tau+\beta}{\delta}\right).
\end{aligned}
$$

$f$ はカスプ形式なので、$q'=e^{2\pi iz/h'}$ により
$(f|_k\sigma_{s'})(z)=\sum_{n\ge1}b_n(q')^n$ と展開できる。これに上の表示を代入して、$q_s=e^{2\pi i\tau/h_s}$ と置けば

$$
((V_df)|_k\sigma_s)(\tau)
=\delta^{-k}\sum_{n\ge1}
b_n\exp\left(\frac{2\pi i n\beta}{\delta h'}\right)
q_s^{rn}.
$$

$r\ge1$ だから負冪も定数項も現れず、$q_s=0$ に正則延長してそこで消える。$s$ は任意だったので、全てのカスプで消失する。

もし $V_df=0$ なら、任意の $z\in\mathbb H$ を $z=d\tau$ と表せるので $f(z)=0$。従って単射である。最後に $V_a(V_bf)(\tau)=f(ab\tau)=V_{ab}f(\tau)$ である。
<!-- proof-end -->

<!-- definition-example-start: def-mf7-degeneracy -->
**定義の確認**。 [MF2の判別式](../MF2/index.md#def-mf2-discriminant) $\Delta(\tau)=q-24q^2+252q^3+\cdots$ は $S_{12}(\Gamma_0(1))$ に属します。$M=1,N=2,d=2$ は $M\mid N$ および $d\mid N/M$ を満たすので

$$
V_2\Delta=\Delta(2\tau)=q^2-24q^4+252q^6+\cdots
$$

は $S_{12}(\Gamma_0(2))$ の元です。上半平面の正則性・変換則・**全カスプでの消失**は直前の命題の各条件で保証されます。$\Delta$ と $\Delta(2\tau)$ は $q$ の最低次数が1と2で異なるため一次独立です。どちらもレベル2にいますが、元の材料はレベル1です。
<!-- definition-example-end -->

## 2. oldspace と newspace

[MF5のPetersson内積](../MF5/index.md#def-mf5-petersson)はレベル1で定義しました。レベル $N$ でも同じ被積分関数を $\Gamma_0(N)$ の基本領域上で積分します。ただし内積を使う前に、その測度と対象空間を明示します。

<a id="def-mf7-petersson"></a>
<!-- formal-statement-start -->
> **定義（レベルNのPetersson内積）**  
> 偶数 $k\ge2$、$N\ge1$ とし、$f,g\in S_k(\Gamma_0(N))$ に対し、$\Gamma_0(N)$ の基本領域 $F_N\subset\mathbb H$ 上で
>
$$
\langle f,g\rangle_N
=\int_{F_N}f(\tau)\overline{g(\tau)}
(\operatorname{Im}\tau)^k\frac{dx\,dy}{y^2},
\qquad \tau=x+iy
$$
>
> と定める（第1変数線形）。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf7-petersson -->
**定義の確認**。 $\gamma=\begin{pmatrix}a&b\\c&e\end{pmatrix}\in\Gamma_0(N)$ の下で、[MF1の虚部変換](../MF1/index.md#thm-mf1-imaginary-action)と[MF4の変換則](../MF4/index.md#def-mf4-level-form)から

$$
f(\gamma\tau)\overline{g(\gamma\tau)}\operatorname{Im}(\gamma\tau)^k
=f(\tau)\overline{g(\tau)}y^k
$$

です。さらに双曲面積要素 $dx\,dy/y^2$ はMöbius変換で不変なので、積分は基本領域の選択によらないものになります。$f=g\ne0$ なら非負の連続被積分関数がある開集合で正なので $\langle f,f\rangle_N>0$ です。カスプ形式の指数減衰によりカスプ近傍での積分も収束します。
<!-- definition-example-end -->

この正定値内積を持つ有限次元のカスプ形式空間で直交補を取ります。

<a id="def-mf7-old-new"></a>
<!-- formal-statement-start -->
> **定義（oldspace・newspace）**  
> $N\ge1$、偶数 $k\ge2$ とする。レベル $N$ のoldspaceを
>
$$
S_k^{\mathrm{old}}(N)=
\sum_{\substack{M\mid N\\M<N}}\ 
\sum_{d\mid N/M} V_d S_k(\Gamma_0(M))
$$
>
> と定める。レベル $N$ のPetersson内積に関するその直交補
>
$$
S_k^{\mathrm{new}}(N)=
\bigl(S_k^{\mathrm{old}}(N)\bigr)^\perp
\ \subseteq S_k(\Gamma_0(N))
$$
>
> をnewspaceと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf7-old-new -->
**定義の確認**。 $N=1$ のとき真の約数 $M$ は存在しないので $S_k^{\mathrm{old}}(1)=\{0\}$、$S_k^{\mathrm{new}}(1)=S_k(\Gamma_0(1))$ です。$N=2$ では真の約数は $M=1$ だけで、$d=1,2$ です。従って

$$
S_k^{\mathrm{old}}(2)=
S_k(\Gamma_0(1))+V_2S_k(\Gamma_0(1)).
$$

例えば $k=12$ なら $\Delta,V_2\Delta$ はこの部分空間に入り、最低次数が異なるため2次元の部分空間を作ります。直交補の条件は「$\Delta$ とだけ直交」ではなく、**低レベルから来る全ての退化像と直交**することです。
<!-- definition-example-end -->

<a id="prop-mf7-orthogonal"></a>
<!-- formal-statement-start -->
> **命題（old/newの直交直和）**  
> $N\ge1$、偶数 $k\ge2$ について
>
$$
S_k(\Gamma_0(N))=
S_k^{\mathrm{old}}(N)\oplus S_k^{\mathrm{new}}(N)
$$
>
> がPetersson内積に関して直交直和として成立する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[MF4の重さ2と正則微分の対応](../MF4/index.md#thm-mf4-weight-two-differentials)は重さ2の場合の有限次元性を与える。一般の偶数重さでもコンパクトなモジュラー曲線上の正則な線束の切断空間として $S_k(\Gamma_0(N))$ は有限次元である（この有限次元性の一般論はここでは既習の重さ2の証明からの類推だけで証明したとはしない）。$S_k^{\mathrm{old}}(N)$ は有限次元線形空間の部分空間なので閉である。

oldspaceの正規直交基底を $e_1,\ldots,e_r$ とする。任意の $f\in S_k(\Gamma_0(N))$ に対して、内積の第1変数が線形であることに合わせて

$$
u=\sum_{j=1}^r\langle f,e_j\rangle_N e_j
$$

と置く。$u$ はoldspaceに属する。また各 $1\le i\le r$ で、正規直交性を使うと

$$
\begin{aligned}
\langle f-u,e_i\rangle_N
&=\langle f,e_i\rangle_N
-\sum_{j=1}^r\langle f,e_j\rangle_N
  \langle e_j,e_i\rangle_N\\
&=\langle f,e_i\rangle_N-\langle f,e_i\rangle_N=0.
\end{aligned}
$$

よって $f-u$ はnewspaceに属し、$f=u+(f-u)$ と分解できる。両方に属する $v$ は $\langle v,v\rangle_N=0$ なので、内積の正定値性より $v=0$。従って和は直交直和である。
<!-- proof-end -->

**ここまでで分かったこと、まだ分からないこと。** 直交直和は内積空間の一般定理であり、newspaceに固有形式があるか、正規化できるか、レベルを割る素数で $a_p$ が何になるかは証明していません。これらに必要なのが次の定理です。なお、レベル $N$ の全ての $U_p$ が自己随伴だという主張は使いません。

## 3. newform を選ぶ：深い部分との境界

$T_\ell$（$\ell\nmid N$）は[MF5のレベル付きHecke作用](../MF5/index.md#prop-mf5-level-q)です。全てのそのような素数で同時固有となるベクトルがnewspaceの中にあること、そして $q$ の第一係数で正規化できることは、直交直和だけでは従いません。

<a id="thm-mf7-newform"></a>
<!-- formal-statement-start -->
> **定理（Atkin–Lehner–Li のnewform理論：引用・自明指標の場合）**  
> 偶数 $k\ge2$、$N\ge1$ とする。$S_k^{\mathrm{new}}(N)$ には、全ての $\ell\nmid N$ に対する $T_\ell$ の同時固有形式からなる基底があり、各固有直線には $q$ 展開が
>
$$
f(\tau)=q+\sum_{n\ge2}a_nq^n
$$
>
> となる元がただ一つある。この元をレベル $N$ の**正規化newform**という。同じ重さ・レベル・自明指標の正規化newformは、全ての $\ell\nmid N$ の固有値が一致すれば同一である。
>
> また各正規化newformは $p\mid N$ に対して $U_pf=a_pf$ を満たし、互いに素な $m,n$ では $a_{mn}=a_ma_n$ となる。
<!-- formal-statement-end -->

この結果は **本章では証明を引用する外部大定理** です。旧空間と新空間のHecke不変性、Petersson内積の随伴公式、newspaceでの固有形式の正規化、強い重複度1、$U_p$ の作用の精密な議論が必要です。定理名を掲げるだけでこれらの核心証明が済んだと扱いません。出典として A. O. L. Atkin–J. Lehner, *Hecke operators on $\Gamma_0(m)$* (1970)、W.-C. W. Li, (1975, *Math. Ann.*)、W. Stein, *Modular Forms: A Computational Approach* を参照してください。

ただし、良い素数での退化写像との交換はここで検算できます。$f=\sum a_nq^n$ に対し $\ell\nmid N$ と $d\mid N/M$ なら $\ell\nmid d$ です。[合同部分群上の素数作用素の係数](../MF5/index.md#prop-mf5-level-q)より

$$
T_\ell f=\sum_{n\ge1}
\left(a_{\ell n}+\ell^{k-1}a_{n/\ell}\right)q^n
\quad (a_{n/\ell}=0\text{ if }\ell\nmid n).
$$

$V_df=\sum_{d\mid n}a_{n/d}q^n$ に $T_\ell$ を作用させ、$d\mid\ell n$ と $d\mid n$ が同値であること、$d\mid n/\ell$ が $d\ell\mid n$ と同値であることを使うと

$$
T_\ell V_df=
\sum_{d\mid n}
\left(a_{\ell(n/d)}+\ell^{k-1}a_{(n/d)/\ell}\right)q^n
=V_dT_\ell f.
$$

従ってoldspaceは良い素数のHecke作用で保たれます。一方、これだけで $U_p$ のnewspace上の固有性は結論できません。

<a id="cor-mf7-first-coefficient"></a>
<!-- formal-statement-start -->
> **系（固有値と第一係数の一致）**  
> 偶数 $k\ge2$、$N\ge1$、自明指標のレベル $N$ の正規化newform $f=\sum_{n\ge1}a_nq^n$（$a_1=1$）に対し、素数ごとの固有値は次の通りである。
>
$$
T_\ell f=a_\ell f\quad(\ell\nmid N),\qquad
U_pf=a_pf\quad(p\mid N).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T_\ell f=\lambda_\ell f$ の $q^1$ 係数を比較する。[合同部分群上の素数作用素の係数](../MF5/index.md#prop-mf5-level-q)の $n=1$ では左辺は $a_\ell$、右辺は $\lambda_\ell a_1=\lambda_\ell$ だから $\lambda_\ell=a_\ell$。$U_pf=\mu_pf$ も左辺の $q^1$ 係数は $a_p$ で、$a_1=1$ より $\mu_p=a_p$。
<!-- proof-end -->

## 4. レベルを割る素数とEuler因子

MF6で得た良い素数の因子は $p\nmid N$ のときのものでした。$p\mid N$ では $U_p$ の係数公式に二次補正項はありません。正規化newformならその固有性が保証され、$p$ 冪係数が幾何級数になるため、局所因子は一次式になります。

<a id="prop-mf7-local-factor"></a>
<!-- formal-statement-start -->
> **命題（newform の良い素数と悪い素数の局所因子）**  
> 偶数 $k\ge2$、自明指標のレベル $N$ の正規化newform $f=\sum_{n\ge1}a_nq^n$ に対し、Dirichlet級数の絶対収束する領域で
>
$$
L(f,s)=\prod_pL_p(f,s)
$$
>
> となり、その因子は
>
$$
L_p(f,s)=
\begin{cases}
(1-a_pp^{-s}+p^{k-1-2s})^{-1},&p\nmid N,\\
(1-a_pp^{-s})^{-1},&p\mid N.
\end{cases}
$$
>
> 特に $a_p=0$ の場合、悪い素数の因子は $1$ である。
<!-- formal-statement-end -->

### 証明の見取り図

良い素数はMF5の2項漸化式を使います。悪い素数は $U_p$ の $q$ 係数だけで $a_{p^r}=a_p^r$ を示します。最後に乗法性と絶対収束で素数ごとに掛け合わせます。

<!-- proof-start -->
### 証明

$\ell\nmid N$ については[MF5のHecke係数公式](../MF5/index.md#prop-mf5-level-q)と $T_\ell f=a_\ell f$ より

$$
a_{\ell^{r+1}}+\ell^{k-1}a_{\ell^{r-1}}
=a_\ell a_{\ell^r}\quad(r\ge1).
$$

$a_1=1$ を加え、生成関数 $A_\ell(X)=\sum_{r\ge0}a_{\ell^r}X^r$ を使うと

$$
(1-a_\ell X+\ell^{k-1}X^2)A_\ell(X)=1.
$$

一方 $p\mid N$ については[MF5の $U_p$ 係数公式](../MF5/index.md#prop-mf5-level-q)と $U_pf=a_pf$ から任意の $n\ge1$ で

$$
a_{pn}=a_pa_n.
$$

$n=p^{r-1}$ を繰り返せば $a_{p^r}=a_p^r$（$r\ge0$）であり、形式的冪級数として

$$
\sum_{r\ge0}a_{p^r}X^r=\sum_{r\ge0}(a_pX)^r=(1-a_pX)^{-1}.
$$

[引用定理](#thm-mf7-newform)による互いに素な添字の乗法性と[MF6の係数上界](../MF6/index.md#lem-mf6-growth)から $\operatorname{Re}s>1+k/2$ でDirichlet級数は絶対収束する。[乗法的係数のEuler積](../../ANT/ANT2/index.md#thm-ant2-euler-product)を使って $X=p^{-s}$ を代入し、局所因子を掛け合わせればよい。
<!-- proof-end -->

一次因子ということと、$a_p$ の大きさまで決まることは別の問題です。次は引用する深い算術的帰結です。

<a id="thm-mf7-bad-eigenvalues"></a>
<!-- formal-statement-start -->
> **定理（自明指標newformの悪い素数の係数：引用）**  
> 偶数 $k\ge2$、レベル $N$、自明指標の正規化newform $f$ と素数 $p\mid N$ に対し、
>
$$
\begin{cases}
a_p=\pm p^{k/2-1},& p\parallel N,\\
a_p=0,&p^2\mid N
\end{cases}
$$
>
> が成立する。$p\parallel N$ は $p\mid N$ かつ $p^2\nmid N$ を表す。
<!-- formal-statement-end -->

これもAtkin–Lehner–Li理論の引用結果で、前の $U_p$ 係数計算だけから証明したのではありません。特に重さ2では、$p\parallel N$ のとき $a_p=\pm1$、$p^2\mid N$ のとき $a_p=0$ です。非自明なDirichlet指標のときは導手や局所指標の分岐でこの形が変わるため、ここで一律に外挿しません。

**oldformとnewformの違いがEuler因子に現れる例。** $\Delta(2\tau)=q^2-24q^4+\cdots$ はレベル2のoldspaceに属し、$q$ の第一係数は0です。従ってこれは正規化newformではありません。さらに $U_2\Delta(2\tau)=\Delta(\tau)$ であり（$q^{2n}\mapsto q^n$）、元の $\Delta(2\tau)$ のスカラー倍ではありません。単にレベル2に属するというだけで悪い素数の一次Euler因子を割り当てるのは誤りです。

## 5. レベル11を自分の手で追う

[モジュラー曲線の種数公式](../MF4/index.md#thm-mf4-genus)に $N=11$ を代入する。指数は $\mu=11(1+1/11)=12$、位数2・3の楕円点はともに0個、カスプは2個なので

$$
g(X_0(11))=1+\frac{12}{12}-\frac{0}{4}-\frac{0}{3}-\frac{2}{2}=1.
$$

また[重さ2カスプ形式と正則微分の対応](../MF4/index.md#thm-mf4-weight-two-differentials)より $\dim S_2(\Gamma_0(11))=1$。[MF2のレベル1の重さ2の消失](../MF2/index.md#def-mf2-modular-form)により $S_2(\Gamma_0(1))=0$ です。レベル11は素数なので真の低レベルは1だけです。従って定義から

$$
S_2^{\mathrm{old}}(11)=\{0\},\qquad
S_2^{\mathrm{new}}(11)=S_2(\Gamma_0(11)).
$$

この空間の非零元を具体的に書くにはDedekindの $\eta$ 関数を用いると便利です。$\eta(\tau)=q^{1/24}\prod_{n\ge1}(1-q^n)$ と置きます。ここでは次の **$\eta$ 商のモジュラー性判定を外部補題として引用**します。$F(\tau)=\prod_{\delta\mid N}\eta(\delta\tau)^{r_\delta}$（$r_\delta\in\mathbb Z$）について、$k=\tfrac12\sum_\delta r_\delta$ が整数で、

$$
\sum_{\delta\mid N}\delta r_\delta\equiv0\pmod{24},
\qquad
\sum_{\delta\mid N}(N/\delta)r_\delta\equiv0\pmod{24}
$$

ならば、$F$ は $\Gamma_0(N)$ 上で重さ $k$、ある二次指標の変換則を満たします。さらに $(-1)^k\prod_\delta\delta^{r_\delta}$ が整数の平方数であれば、この指標は自明です。この判定は**変換則**についてのもので、全カスプでの正則性・消失は別に検査します。一般の判定法は Ken Ono, *The Web of Modularity* (2004), Theorem 1.64 を参照し、本章では証明を引用します。

<a id="prop-mf7-level-eleven"></a>
<!-- formal-statement-start -->
> **命題（レベル11の重さ2のnewform）**  
> 次の関数はレベル11の自明指標・重さ2の正規化newformである。
>
$$
f_{11}(\tau)=\eta(\tau)^2\eta(11\tau)^2.
$$
>
> その展開の初項は
>
$$
f_{11}=q-2q^2-q^3+2q^4+q^5+2q^6-2q^7
+0q^8-2q^9-2q^{10}+q^{11}+\cdots.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\eta$ 商の判定条件とカスプでの消失を調べて $S_2(\Gamma_0(11))$ に入れます。次元1なのでnewspace全体を張り、先頭係数1から正規化を確かめます。

<!-- proof-start -->
### 証明

$\eta(\tau)^2\eta(11\tau)^2$ の重さは $(2+2)/2=2$ であり、$\eta$ 商の指数は $r_1=r_{11}=2$ です。レベル11の判定条件の和は

$$
\sum_{\delta\mid11}\delta r_\delta=2+22=24,\qquad
\sum_{\delta\mid11}(11/\delta)r_\delta=22+2=24.
$$

両方とも24の倍数で、$\prod_{\delta\mid11}\delta^{r_\delta}=11^2$ は平方数です。よって引用した $\eta$ 商のモジュラー性判定により、重さ2・レベル11・自明指標の変換則を満たします。$\eta$ は上半平面で零を持たず、そこで正則です。

無限遠では積表示から $q^{(2+22)/24}=q$ で始まり、定数項は0です。レベル11のカスプは[MF4の素数レベルのカスプ](../MF4/index.md#prop-mf4-prime-cusps)から $\infty$ と $0$ の二つです。後者について、$\eta(-1/\tau)=(-i\tau)^{1/2}\eta(\tau)$ を二乗して用いると

$$
\begin{aligned}
f_{11}\!\left(-\frac1{11\tau}\right)
&=\eta\!\left(-\frac1{11\tau}\right)^2
 \eta\!\left(-\frac1{\tau}\right)^2\\
&=(-i11\tau)(-i\tau)\eta(11\tau)^2\eta(\tau)^2\\
&=-11\tau^2f_{11}(\tau).
\end{aligned}
$$

[MF6のFricke作用](../MF6/index.md#def-mf6-fricke)の行列式因子を含めると $f_{11}|_2W_{11}=-f_{11}$ です。ただし、これはFricke正規化の座標での式です。[MF4のカスプ幅](../MF4/index.md#prop-mf4-prime-cusps)によれば $0$ の幅は $11$ なので、$S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ で無限遠へ移した後の局所変数は $q_0=e^{2\pi i\tau/11}$ です。$W_{11}$ の引数を $z=\tau/11$ と取ると

$$
(f_{11}|_2S)(\tau)
=\frac1{11}(f_{11}|_2W_{11})(\tau/11)
=-\frac1{11}f_{11}(\tau/11)
=-\frac1{11}q_0+O(q_0^2).
$$

従ってカスプ $0$ でも負冪・定数項がなく、幅11の局所変数で正則かつ消失します。これで全カスプの消失を確認しました。

$q$ 展開は $\eta$ の積から

$$
f_{11}=q\prod_{n\ge1}(1-q^n)^2(1-q^{11n})^2
$$

で得られます。$q^{11}$ までなら積の後半は $1+O(q^{11})$ なので、必要な有限個の前半因子を掛ければ表示した係数になります。先頭係数は1で、関数は零でありません。既にnewspaceが1次元と示したので、[Atkin–Lehner–Liのnewform理論](#thm-mf7-newform)によりその正規化newformはこの $f_{11}$ に一致します。
<!-- proof-end -->

例えば $a_2=-2$、$a_3=-1$ なので良い素数2・3の因子は

$$
L_2(f_{11},s)=(1+2\cdot2^{-s}+2^{1-2s})^{-1},
\quad
L_3(f_{11},s)=(1+3^{-s}+3^{1-2s})^{-1}.
$$

$11\parallel11$ で $a_{11}=1$ なので、悪い素数では **二次項が存在せず**

$$
L_{11}(f_{11},s)=(1-11^{-s})^{-1}.
$$

[MF6の関数等式](../MF6/index.md#thm-mf6-functional-equation)では $\varepsilon=-1$、$k=2$ だから符号は $i^2\varepsilon=(-1)(-1)=+1$。従って中心 $s=1$ での消失は関数等式**だけからは**強制されません。

## 6. 有理係数と楕円曲線：まだ同じものではない

正規化newformの係数から生成される体を係数体と呼びます。有限次元Hecke作用の固有値から係数が代数的になることはnewform理論の一部ですが、ここで「係数が有理数」と「レベルが11」は異なる条件です。

<a id="def-mf7-coefficient-field"></a>
<!-- formal-statement-start -->
> **定義（newform の係数体）**  
> 自明指標の正規化newform $f=\sum_{n\ge1}a_nq^n$ の係数体を
>
$$
K_f=\mathbb Q(a_1,a_2,a_3,\ldots)
$$
>
> とする。$K_f=\mathbb Q$ なら有理係数newformと呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mf7-coefficient-field -->
**定義の確認**。 $f_{11}$ の積表示を有限次数で展開した係数は整数です。実際、各 $(1-q^n)^2$ は整数係数で、$q^m$ の係数には $n\le m$ の有限個の因子しか関与しません。よって全ての $a_m\in\mathbb Z$、しかも $a_1=1$ なので $K_{f_{11}}=\mathbb Q$ です。一般のnewformには $\mathbb Q$ より大きい数体を係数体に持つものもあります。「newformだから有理」という推論はできません。
<!-- definition-example-end -->

次のMF8で楕円曲線 $E/\mathbb Q$ と結び付くのは、特に **重さ2・自明指標・有理係数** の正規化newformです。レベルは曲線の導手と対応しますが、その対応は本章のold/new直交分解だけで導かれません。逆に任意の重さ2newformが有理数体上の楕円曲線一つを与えるとも言えません。係数体が大きい場合には、より高次元のAbelian varietyが現れる理論へ進みます。

## 7. 演習と詳細解答

### A1. 共役行列でレベルを確かめる

$M=3,N=12,d=2$ とし、$\gamma=\begin{pmatrix}a&b\\c&e\end{pmatrix}\in\Gamma_0(12)$ とする。$D\gamma D^{-1}$ の左下成分と行列式を求め、$\Gamma_0(3)$ に入る理由を述べよ。

- Level: A
- ID: MF7-A1

<!-- solution-start -->
**詳細解答**　$D=\operatorname{diag}(2,1)$ と置くと

$$
D\gamma D^{-1}=\begin{pmatrix}a&2b\\c/2&e\end{pmatrix}.
$$

$c=12t$（$t\in\mathbb Z$）なので $c/2=6t$ は3の倍数で整数です。行列式は共役で不変だから $ae-bc=1$。よって行列は整数成分・行列式1・左下成分3の倍数という三条件を満たし、$\Gamma_0(3)$ に属します。
<!-- solution-end -->

### A2. oldspaceの約数を列挙する

レベル $N=6$ で、$M=1,2,3$ からの退化像を全て列挙せよ。また $S_k^{\mathrm{old}}(6)$ はそれらの和であることを記せ。

- Level: A
- ID: MF7-A2

<!-- solution-start -->
**詳細解答**　$M=1$ では $d\mid6$ から $d=1,2,3,6$。$M=2$ では $d\mid3$ より $d=1,3$。$M=3$ では $d\mid2$ より $d=1,2$。従って

$$
\begin{aligned}
S_k^{\mathrm{old}}(6)={}&
\sum_{d\in\{1,2,3,6\}}V_dS_k(\Gamma_0(1))\\
&+\sum_{d\in\{1,3\}}V_dS_k(\Gamma_0(2))\\
&+\sum_{d\in\{1,2\}}V_dS_k(\Gamma_0(3)).
\end{aligned}
$$

$\Gamma_0(2)$ と $\Gamma_0(3)$ の中に既にレベル1由来の像が含まれ得るため、この表示を**直和**とは書けません。定義は部分空間の「和」です。
<!-- solution-end -->

### A3. $U_2V_2$ の係数を調べる

偶数 $k\ge2$ とし、$f=\sum_{n\ge1}a_nq^n\in S_k(\Gamma_0(1))$ とする。レベル2の $V_2f$ の係数と、レベル2で定義された $U_2V_2f$ を求めよ。$U_2V_2f=V_2f$ か。

- Level: A
- ID: MF7-A3

<!-- solution-start -->
**詳細解答**　$V_2f=\sum_{n\ge1}a_nq^{2n}$ なので、$q^m$ 係数は $2\mid m$ なら $a_{m/2}$、奇数なら0です。[MF5の $U_2$ 係数公式](../MF5/index.md#prop-mf5-level-q)で $q^n$ 係数は元の $q^{2n}$ 係数となり $a_n$ です。従って $U_2V_2f=f$。一般に $V_2f$ の先頭次数は少なくとも2であるのに $f$ は先頭次数1の場合があるので、$U_2V_2f=V_2f$ とは限りません。
<!-- solution-end -->

### A4. 悪い素数の分岐

重さ $k=4$、自明指標の正規化newformを仮定する。$p=3$ について (i) $3\parallel N$ と (ii) $9\mid N$ のそれぞれで $a_3$ とEuler因子の形を答えよ。

- Level: A
- ID: MF7-A4

<!-- solution-start -->
**詳細解答**　[悪い素数の引用定理](#thm-mf7-bad-eigenvalues)を $k=4$ に適用する。(i) では $k/2-1=1$ なので $a_3=\pm3$、従って $L_3=(1\mp3\cdot3^{-s})^{-1}$ です。(ii) では $a_3=0$ なので $L_3=(1-0\cdot3^{-s})^{-1}=1$ です。どちらも $3\mid N$ なので良い素数用の二次項 $3^{3-2s}$ を挿入してはいけません。
<!-- solution-end -->

### B1. oldspaceのHecke不変性を係数から示す

偶数 $k\ge2$、$f\in S_k(\Gamma_0(M))$、$M\mid N$、$d\mid N/M$、素数 $p\nmid N$ とする。$T_pV_df=V_dT_pf$ を $q^n$ 係数で検証せよ。また、この仮定の下で $p\mid d$ は起こり得るか。$p\mid N$ へ条件を変えると、レベル $N$ でどの作用素を使い、どの割り切りの推論が使えなくなるか説明せよ。

- Level: B
- ID: MF7-B1

<!-- solution-start -->
**詳細解答**　$V_df$ の $q^n$ 係数を $b_n$ と書くと $b_n=a_{n/d}$（$d\mid n$）、それ以外は0です。$p\nmid d$ なので $d\mid pn$ と $d\mid n$ は同値で、$d\mid n/p$ は $dp\mid n$ と同値です。従って

$$
\begin{aligned}
[T_pV_df]_n
&=b_{pn}+p^{k-1}b_{n/p}\\
&=\mathbf1_{d\mid n}\left(a_{p(n/d)}+p^{k-1}a_{(n/d)/p}\right)\\
&=[V_dT_pf]_n.
\end{aligned}
$$

ただし $a_x=0$ は $x$ が正整数でない場合の規約とします。

現行の仮定 $d\mid N/M$ と $p\nmid N$ からは $p\nmid d$ が従います。従って $p\mid d$ は**起こり得ません**。

仮に $p\mid d$ とするには $p\mid N$ へ条件を変える必要があります。そのときレベル $N$ で作用するのは $T_p$ ではなく[定義された $U_p$](../MF5/index.md#def-mf5-level-operators) です。例えば

$$
d=p,\qquad n=1:\qquad d\mid pn,\qquad d\nmid n
$$

なので、第2行の指示関数への置き換えは使えません。
<!-- solution-end -->

### B2. newformの局所生成関数を再構成する

重さ2、レベル11の正規化newform $f_{11}$ について $a_2=-2,a_3=-1,a_{11}=1$ が与えられる。(i) $a_4$、$a_6$、$a_{11^2}$ を求め、(ii) $2,11$ の局所生成関数を $X^2$ まで展開せよ。

- Level: B
- ID: MF7-B2

<!-- solution-start -->
**詳細解答**　$2\nmid11$ なので良い素数の漸化式で

$$
a_4=a_2^2-2^{2-1}a_1=4-2=2.
$$

互いに素な $2,3$ の乗法性から $a_6=a_2a_3=(-2)(-1)=2$。一方 $11\mid N$ なので $a_{11^2}=a_{11}^2=1$ です。従って

$$
\begin{aligned}
\sum_{r\ge0}a_{2^r}X^r
&=(1+2X+2X^2)^{-1}
 =1-2X+2X^2+O(X^3),\\
\sum_{r\ge0}a_{11^r}X^r
&=(1-X)^{-1}=1+X+X^2+O(X^3).
\end{aligned}
$$

$11$ の因子に $+11X^2$ を加えないのが重要です。
<!-- solution-end -->

### B3. 直交補の構成が何を証明したか区別する

偶数 $k\ge2$、$N\ge1$ とし、$f\in S_k(\Gamma_0(N))$ を任意に取る。oldspaceが $\langle u_1,u_2\rangle$、Petersson内積で $\langle u_i,u_j\rangle_N=\delta_{ij}$ とする。$f$ のnewspaceへの直交射影を書き、これだけでその射影がHecke同時固有形式になると言えるか理由を述べよ。

- Level: B
- ID: MF7-B3

<!-- solution-start -->
**詳細解答**　内積を第1変数線形とするとoldspaceへの射影は $P_{\mathrm{old}}f=\langle f,u_1\rangle u_1+\langle f,u_2\rangle u_2$ です。従って

$$
P_{\mathrm{new}}f=f-\langle f,u_1\rangle u_1-\langle f,u_2\rangle u_2.
$$

各 $j$ について $\langle P_{\mathrm{new}}f,u_j\rangle=0$ なのでこれはnewspaceに入ります。しかし直交性はある線形部分空間への所属条件であり、各 $T_\ell$ の固有方程式 $T_\ell v=\lambda_\ell v$ とは異なります。newspace内の固有基底・正規化・一意性には[Atkin–Lehner–Liの引用定理](#thm-mf7-newform)という追加入力が必要です。
<!-- solution-end -->

### B4. レベル11のカスプ0での判定

$f=\eta(\tau)^2\eta(11\tau)^2$ について $\eta(-1/\tau)=(-i\tau)^{1/2}\eta(\tau)$ を仮定する。$f|_2W_{11}=-f$ を導出し、$\infty$ における $f=q+O(q^2)$ と合わせて両カスプでの消失を確認せよ。特に $S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$、$q_0=e^{2\pi i\tau/11}$ に対する $f|_2S$ の初項を求め、Fricke正規化と区別せよ。

- Level: B
- ID: MF7-B4

<!-- solution-start -->
**詳細解答**　$\eta(-1/(11\tau))^2=(-i11\tau)\eta(11\tau)^2$、$\eta(-1/\tau)^2=(-i\tau)\eta(\tau)^2$ です。積を取ると $f(-1/(11\tau))=-11\tau^2 f(\tau)$。[Frickeの定義](../MF6/index.md#def-mf6-fricke)による重さ2の因子は $11/(11\tau)^2=1/(11\tau^2)$ なので

$$
(f|_2W_{11})(\tau)=\frac{1}{11\tau^2}(-11\tau^2f(\tau))=-f(\tau).
$$

[MF4の素数レベルのカスプ分類](../MF4/index.md#prop-mf4-prime-cusps)では $\infty,0$ の2カスプだけです。Fricke正規化では $-q+O(q^2)$ ですが、カスプ $0$ の本来の幅は11です。$q_0=e^{2\pi i\tau/11}$ として

$$
(f|_2S)(\tau)=\frac1{11}(f|_2W_{11})(\tau/11)
=-\frac1{11}q_0+O(q_0^2)
$$

なので、無限遠でもカスプ $0$ でも定数項が0です。ただし、これだけでは上半平面での正則性と $\Gamma_0(11)$ 変換則を示していないため、モジュラー形式性の証明を省いてよいわけではありません。
<!-- solution-end -->

### C1. レベル2のoldformからレベル11のnewformまで

次の各問いを証明とともに答えよ。(i) $\Delta,\Delta(2\tau)$ がレベル2のoldspaceで一次独立となる理由、(ii) $S_2(\Gamma_0(11))$ がすべてnewspaceになる理由、(iii) $f_{11}$ の $p=2$ と $p=11$ のEuler因子、(iv) $f_{11}$ の関数等式の中心符号、(v) (i) のoldformをnewformの局所係数公式へ誤って代入すると何が壊れるか。

- Level: C
- ID: MF7-C1

<!-- solution-start -->
**詳細解答**　(i) [退化写像の命題](#prop-mf7-degeneracy)で $M=1,N=2,d=1,2$ とすれば両者はレベル2のカスプ形式です。[oldspaceとnewspace](#def-mf7-old-new)によりoldspaceに入ります。$q$ の最低次数がそれぞれ1,2なので $A\Delta+B\Delta(2\tau)=0$ の $q^1$ 係数から $A=0$、$q^2$ 係数から $B=0$。従って一次独立です。

(ii) [モジュラー曲線の種数公式](../MF4/index.md#thm-mf4-genus)と[重さ2の正則微分の対応](../MF4/index.md#thm-mf4-weight-two-differentials)で $\dim S_2(\Gamma_0(11))=1$。11は素数なので真の約数は1のみで、[MF2の重さ2のレベル1形式の消失](../MF2/index.md#def-mf2-modular-form)より $S_2(\Gamma_0(1))=0$ です。従ってoldspaceは零で、直交補は空間全体です。

(iii) [局所因子の命題](#prop-mf7-local-factor)に $k=2$、$a_2=-2$、$a_{11}=1$ を代入すると

$$
L_2=(1+2\cdot2^{-s}+2^{1-2s})^{-1},\qquad
L_{11}=(1-11^{-s})^{-1}.
$$

2は11を割らないため二次因子、11は11を割るため一次因子です。

(iv) [レベル11の例](#prop-mf7-level-eleven)で $f_{11}|_2W_{11}=-f_{11}$。従って[MF6の関数等式](../MF6/index.md#thm-mf6-functional-equation)の符号は $i^2(-1)=+1$ です。中心 $s=1$ で零とも非零とも強制されません。

(v) $\Delta(2\tau)$ の第一係数は0で正規化newformではありません。$U_2\Delta(2\tau)=\Delta(\tau)$ は $\Delta(2\tau)$ のスカラー倍でないため、固有性から $a_{2n}=a_2a_n$ を導く段階が失敗します。従って $p\mid N$ のnewformの一次Euler因子をそのまま適用するのは誤りです。
<!-- solution-end -->

## 8. MF8への接続

低レベル由来の部分を除くnewspaceから正規化newformを選び、良い素数の二次因子と悪い素数の一次・自明因子を区別できるようになりました。一方、newformのレベルが楕円曲線の導手になる理由、有理係数の重さ2newformがどのように曲線と結び付くかは未証明です。MF8では[モジュラー形式のL関数](../MF6/index.md#def-mf6-l-series)と楕円曲線側の局所データを合流させ、Modularity Theoremを明示的な外部大定理として位置付けます。
