# HPDE4 ベクトル束・接続・形式的随伴

[HPDE3の束値超関数](../HPDE3/index.md#def-hpde3-distribution-section)では、滑らかな切断を積分によって超関数と見なし、[密度値双対試験切断](../HPDE3/index.md#def-hpde3-test-dual-density)を相手にしました。しかし「超関数を微分する」とき、元のベクトルと試験側の双対ベクトルはどのように微分されるのでしょうか。平坦な実数値関数の $u'(\varphi)=-u(\varphi')$ をそのまま時空上の束値関数に書くと、枠の変化、密度のJacobian、複素共役の有無が見えなくなります。

本章では、各点の異なるベクトルを比較する**接続**を局所表示から作り、微分を密度値双対試験切断へ移す**形式的双対**をまず定義します。その後、各点のベクトルに内積を与える道具と正の密度を加えた場合に限り、複素共役を伴う**形式的随伴**を定義します。「双対」と「随伴」を一つの記号で済ませないことが、後のnormally hyperbolic作用素・Green作用素に必要な出発点です。

以下、$M$ は境界のない滑らかなHausdorff・第二可算な $d$ 次元多様体、$E,F\to M$ は有限ランクの滑らかな実または複素ベクトル束とします。[HPDE3の束と双対束の局所表示](../HPDE3/index.md#def-hpde3-test-dual-density)を使います。時空としてはLorentz計量を入れてよいですが、**形式的双対自体には計量・時間向き・大域双曲性を要求しません**。

## 1. 枠を取り替えると、なぜ成分の通常微分では困るか

局所枠 $e=(e_1,\ldots,e_r)$ で $s=e\,u$（$u$ は成分列）と書きます。新しい枠が $e'=eA$、$A:U\to GL_r(\mathbb K)$ なら $u'=A^{-1}u$ です。座標方向へ微分すると

$$
\partial_i u'=\partial_i(A^{-1}u)
=A^{-1}\partial_i u+(\partial_i A^{-1})u.
$$

ここで $A^{-1}A=I$ を微分すれば

$$
(\partial_iA^{-1})A+A^{-1}\partial_iA=0,
\qquad
\partial_iA^{-1}=-A^{-1}(\partial_iA)A^{-1}.
$$

したがって単なる $\partial_i u$ は枠変換の際に余分な項を生みます。**枠に依存しない微分**を作るには、その項を打ち消す補正係数が必要です。

<a id="def-hpde4-connection"></a>
<!-- formal-statement-start -->
> **定義（束接続）**  
> $E\to M$ を滑らかな $\mathbb K$ ベクトル束（$\mathbb K=\mathbb R$ または $\mathbb C$）とする。**接続**は、滑らかな実ベクトル場 $X$ と滑らかな切断 $s$ に切断 $\nabla_Xs$ を対応させる写像であって、すべての滑らかな実値関数 $f$、$\mathbb K$ 値関数 $a$ と切断 $s$ に対し
>
> 1. $\nabla_{fX}s=f\nabla_Xs$。
> 2. $\nabla_X(as)=X(a)s+a\nabla_Xs$。
> 3. $s$ および $X$ に関してそれぞれ加法的であり、$s$ に関して定数 $\mathbb K$ 線形。
>
> を満たすものをいう。複素束上でも $X$ は実ベクトル場とする。
<!-- formal-statement-end -->

局所枠では $\nabla_{\partial_i}e_b=\sum_a e_a(\Gamma_i)^a{}_b$ と置きます。積の微分規則により

$$
\nabla_{\partial_i}(e\,u)
=e(\partial_i u+\Gamma_i u).
$$

すなわち $\Gamma_i$ は「枠自身の動き」を記述する $r\times r$ 行列です。ここで局所行列を定義の代わりに突然導入したのではなく、**接続が各基底切断をどう微分するか**を各列に並べていることに注意してください。

<a id="prop-hpde4-gauge-rule"></a>
<!-- formal-statement-start -->
> **命題（接続係数の枠変換則）**  
> $U$ 上の二つの滑らかな枠が $e'=eA$（$A:U\to GL_r(\mathbb K)$）を満たすとき、同じ接続の行列係数は
>
$$
\Gamma'_i=A^{-1}\Gamma_iA+A^{-1}\partial_iA
$$
>
> を満たす。逆に、この規則に従う局所係数族は重なり上で同じ大域接続を定める。
<!-- formal-statement-end -->

### 証明の見取り図

新枠の基底切断 $e'_b$ を旧枠で微分し、その結果を新枠へ戻します。逆向きの主張では、任意の切断について両枠の微分結果が一致することを確認します。

<!-- proof-start -->
### 証明

$e'=eA$ に積の規則を適用すると

$$
\nabla_i(eA)=e\Gamma_iA+e\,\partial_iA
=eA\bigl(A^{-1}\Gamma_iA+A^{-1}\partial_iA\bigr).
$$

他方、$\Gamma'_i$ の定義から $\nabla_i e'=e'\Gamma'_i=eA\Gamma'_i$ です。$A$ の可逆性により係数を比較して変換則を得ます。

逆に $u'=A^{-1}u$ と変換則を使うと

$$
\begin{aligned}
\partial_i u'+\Gamma'_iu'
&=A^{-1}\partial_i u+(\partial_iA^{-1})u\\
&\quad+(A^{-1}\Gamma_iA+A^{-1}\partial_iA)A^{-1}u\\
&=A^{-1}(\partial_i u+\Gamma_i u).
\end{aligned}
$$

二行目で $(\partial_iA^{-1})=-A^{-1}(\partial_iA)A^{-1}$ を代入して余分な項を相殺しました。これに左から $e'=eA$ を掛けると旧枠と同じ切断が得られ、重なり上の接続が一致します。
<!-- proof-end -->

<!-- definition-example-start: def-hpde4-connection -->
### 直接例：同じ接続でも係数は零とは限らない

**定義の確認**。$M=\mathbb R$、$E=\mathbb R\times\mathbb R$ の標準枠 $e$ で $\nabla_{\partial_x}(fe)=f'e$ とします。$X=a(x)\partial_x$ なら $\nabla_X(fe)=af'e$ と定めれば、$a$ について $C^\infty$ 線形、$f$ について積の微分規則を満たすので、[接続の定義](#def-hpde4-connection)を満たします。

新枠 $e'=e^{x}e$ は各点で非零なので枠であり、$A=e^x$ として[枠変換則](#prop-hpde4-gauge-rule)に代入すると

$$
\Gamma'_x=e^{-x}\cdot0\cdot e^x+e^{-x}(e^x)'=1.
$$

実際、$s=e'f$ に対して旧枠では $s=e(e^xf)$ だから

$$
\nabla_{\partial_x}s=e(e^xf+e^xf')
=e'(f+f').
$$

新枠での係数 $1$ と一致します。$\Gamma'_x\ne0$ は接続そのものが変わったことを意味しません。
<!-- definition-example-end -->

## 2. 双対束の切断はどう微分するか

双対束は各点で $E_p$ の線形汎関数を収めます。$s$ と双対切断 $\ell$ の縮約 $\ell(s)$ は通常の関数なので、微分には積の規則が必要です。その規則を**双対側の微分の定義**にします。

<a id="def-hpde4-dual-connection"></a>
<!-- formal-statement-start -->
> **定義（双対接続）**  
> $E$ 上の接続 $\nabla^E$ と双対束 $E^*$ に対し、双対接続 $\nabla^{E^*}$ は任意の滑らかな実ベクトル場 $X$、双対切断 $\ell$、切断 $s$ について
>
$$
(\nabla_X^{E^*}\ell)(s)
=X\bigl(\ell(s)\bigr)-\ell(\nabla_X^E s)
$$
>
> を満たす接続である。双対束はHPDE3と同じく代数的（複素線形）双対であり、ここでは複素共役を取らない。
<!-- formal-statement-end -->

右辺は $s$ に関して点ごとの線形性を持ちます。実際、$\ell(as)=a\ell(s)$ と $\nabla_X(as)=X(a)s+a\nabla_Xs$ を使えば $X(a)\ell(s)$ が打ち消され、$a$ 倍だけが残ります。これで各点の双対ベクトルとして意味を持ちます。

局所枠 $e_a$ の双対枠 $e^a$ で、$\ell=\sum_a\ell_a e^a$ を係数列 $\ell$ で書き、$s=e\,u$ とすると $\ell(s)=\ell^{\mathsf T}u$ です。微分を展開して比較すると

$$
\begin{aligned}
\partial_i(\ell^{\mathsf T}u)
&=(\partial_i\ell)^{\mathsf T}u+\ell^{\mathsf T}\partial_i u\\
&=(\nabla_i^{E^*}\ell)(s)+\ell^{\mathsf T}(\partial_i u+\Gamma_iu).
\end{aligned}
$$

従って双対接続の係数列は

$$
\nabla_i^{E^*}\ell=\partial_i\ell-\Gamma_i^{\mathsf T}\ell.
$$

<!-- definition-example-start: def-hpde4-dual-connection -->
### 直接例：縮約を微分して検算する

**定義の確認**。$E=\mathbb R\times\mathbb R^2$ の固定枠において $\Gamma_x=\operatorname{diag}(1,2)$、$u=(x,x^2)^{\mathsf T}$、$\ell=(2,3)^{\mathsf T}$ とします。この係数による接続は $\partial_x+\Gamma_x$ の形で積の微分規則を満たします。

$$
\nabla_x^E u=(1+x,\,2x+2x^2)^{\mathsf T},\qquad
\nabla_x^{E^*}\ell=(-2,-6)^{\mathsf T}.
$$

二つを縮約すると

$$
(-2,-6)\cdot(x,x^2)+(2,3)\cdot(1+x,2x+2x^2)
=2+6x.
$$

一方 $\partial_x(\ell^{\mathsf T}u)=\partial_x(2x+3x^2)=2+6x$ で、[双対接続の定義](#def-hpde4-dual-connection)を数値的に全て確認できます。
<!-- definition-example-end -->

## 3. 微分を試験切断側へ移す：形式的双対

[HPDE3の密度値双対試験切断](../HPDE3/index.md#def-hpde3-test-dual-density)は積分用の密度も含みます。局所座標で $\psi=\sum_b\psi_b f^b\otimes|dx|$ と書けることから、係数が変わるときに積分要素も変わる問題は最初から含まれています。

切断の成分を有限回まで微分し、滑らかな係数を掛けて足す線形写像を考えます。次数を有限に限定すれば、試験切断への部分積分も有限回で済みます。[GPDE2の多重添字](../../GPDE/GPDE2/index.md#def-gpde2-multi-index) $\alpha$ は各方向の微分回数を表します。

<a id="def-hpde4-differential-operator"></a>
<!-- formal-statement-start -->
> **定義（有限階線形微分作用素）**  
> $E,F\to M$ を有限ランクの滑らかなベクトル束とする。$\mathbb K$ 線形写像 $P:\Gamma(M,E)\to\Gamma(M,F)$ が **$m$ 階以下の線形微分作用素**であるとは、ある非負整数 $m$ があり、任意の局所座標と局所枠において滑らかな係数行列 $A_\alpha(x)$ を用いて
>
$$
(Ps)^b=\sum_{a=1}^{\operatorname{rank}E}
\sum_{|\alpha|\le m}(A_\alpha)^b{}_a\,\partial^\alpha s^a
$$
>
> と書けることをいう。ある有限の $m$ についてこの条件を満たすとき **有限階線形微分作用素**と呼ぶ。
<!-- formal-statement-end -->

この行列は入力成分の微分が出力成分に与える係数をまとめたものです。出力添字 $b$ と入力添字 $a$ は異なる束の枠を指し、$A_\alpha$ は $\operatorname{rank}F\times\operatorname{rank}E$ 行列です。

<!-- definition-example-start: def-hpde4-differential-operator -->
### 直接例：有限階性と座標・枠変換

**定義の確認**。$\mathbb R$ の自明な実直線束で $Pu=xu'+2u$ と置きます。標準座標・標準枠では $m=1$、$A_1=x$、$A_0=2$ は滑らかです。$y=2x$ に取り替えると $\partial_x=2\partial_y$ と $x=y/2$ より

$$
Pu=y\partial_yu+2u.
$$

局所枠を $e'=e^xe$ に取り替えると、切断の係数は $u=e^xu'$ です。入力・出力とも新枠で書けば

$$
e^{-x}P(e^xu')=x\partial_xu'+(x+2)u'.
$$

座標・枠の変更後も係数が滑らかで一階以下であることを具体的に確認できました。
<!-- definition-example-end -->

<a id="def-hpde4-formal-transpose"></a>
<!-- formal-statement-start -->
> **定義（密度値の形式的双対）**  
> $E,F$ を有限ランクの滑らかな実または複素束、$M$ を境界のない多様体とし、$P:\Gamma(M,E)\to\Gamma(M,F)$ を有限階線形微分作用素とする。形式的双対 $P^t$ は
>
$$
P^t:\Gamma_c(M,F^*\otimes|\Lambda^dT^*M|)
\longrightarrow\Gamma_c(M,E^*\otimes|\Lambda^dT^*M|)
$$
>
> であって、すべての $s\in\Gamma(M,E)$ と $\psi\in\Gamma_c(M,F^*\otimes|\Lambda^dT^*M|)$ について
>
$$
\int_M\psi(Ps)=\int_M(P^t\psi)(s)
$$
>
> を満たす有限階線形微分作用素をいう。$t$ は代数的双対を表し、複素の場合も **$P^t$ は複素線形**であって係数を共役しない。
<!-- formal-statement-end -->

「微分を移す」符号は、実直線で $\int f'g=-\int fg'$ と部分積分する際のマイナスから現れます。境界がない多様体でも試験切断がコンパクト台なので、局所積分を有限個に分ければ境界項は消えます。

<a id="thm-hpde4-transpose-formula"></a>
<!-- formal-statement-start -->
> **定理（形式的双対の存在・一意性と局所公式）**  
> [形式的双対の定義](#def-hpde4-formal-transpose)の仮定を満たす任意の有限階線形微分作用素 $P$ に対し、形式的双対 $P^t$ は一意に存在する。
>
> 同一の局所座標と局所枠で $P$ と試験切断 $\psi$ を次のように表す。
>
$$
P=\sum_{|\alpha|\le m}A_\alpha\partial^\alpha,
\qquad \psi=(\psi_b)_{b}\otimes|dx|
$$
>
> このとき、形式的双対の密度係数列は
>
$$
(P^t\psi)_a
=\sum_{|\alpha|\le m}(-1)^{|\alpha|}
\partial^\alpha\!\left(\sum_b(A_\alpha)^b{}_a\psi_b\right).
$$
>
> とくに $\operatorname{supp}(P^t\psi)\subseteq\operatorname{supp}\psi$ である。
<!-- formal-statement-end -->

### 証明の見取り図

1成分の積分で部分積分を $|\alpha|$ 回行い、導関数を**係数と試験成分の積全体**へ移します。これを有限和で足して局所公式を得ます。二つの座標表示が同じ双対を与えることは、任意の切断との積分が等しいことから従います。

<!-- proof-start -->
### 証明

まず一つの座標近傍に $\psi$ の台が含まれる場合、有限和とコンパクト台での部分積分により

$$
\begin{aligned}
\int\psi(Ps)
&=\sum_{\alpha,a,b}\int \psi_b(A_\alpha)^b{}_a
 \partial^\alpha s^a\,dx\\
&=\sum_{\alpha,a,b}(-1)^{|\alpha|}
 \int s^a\partial^\alpha\!\bigl(\psi_b(A_\alpha)^b{}_a\bigr)\,dx\\
&=\int (P^t\psi)(s).
\end{aligned}
$$

1階では積の導関数 $\partial_i(\psi_b(A_i)^b{}_a)$、2階ではそれをもう一度微分するため符号が正に戻ります。係数を微分せず $\sum(-1)^{|\alpha|}A_\alpha^{\mathsf T}\partial^\alpha\psi$ としてしまうと、変係数では誤りです。

一般のコンパクト台は有限個の枠近傍で覆えます。滑らかな1の分割で $\psi$ を局所切断の有限和に分け、それぞれ上の式で定義します。重なる領域で異なる枠が与える式を $Q^t_1\psi,Q^t_2\psi$ とすれば任意の $s$ に対して

$$
\int(Q^t_1\psi-Q^t_2\psi)(s)=0
$$

です。[滑らかな切断の局所判定](../HPDE3/index.md#prop-hpde3-regular-injection)を双対密度の局所成分に適用すれば両切断は等しいので、貼り合わされた作用素は座標・枠に依存しません。二つの候補があっても同じ積分恒等式を満たし、同じ局所判定で一致するため一意です。

最後に、$P^t\psi$ の係数は $\psi$ とその有限階微分の局所線形結合です。$\psi$ が開集合 $U$ 上で零ならその全導関数も零なので $P^t\psi$ も $U$ 上で零です。これが台の包含を示します。
<!-- proof-end -->

<!-- definition-example-start: def-hpde4-formal-transpose -->
### 直接例：複素係数も共役しない

**定義の確認**。$\mathbb R$ 上の複素直線束で $P=(2+i x)\partial_x+3$ とします。$\psi=\varphi(x)|dx|$（$\varphi$ は滑らかなコンパクト台関数）なら[局所公式](#thm-hpde4-transpose-formula)より

$$
\begin{aligned}
P^t(\varphi|dx|)
&=\bigl(-\partial_x((2+ix)\varphi)+3\varphi\bigr)|dx|\\
&=\bigl(-(2+ix)\varphi'-i\varphi+3\varphi\bigr)|dx|.
\end{aligned}
$$

$\varphi$ を複素数値にしても作用は $\varphi$ に線形です。特に $i$ を $-i$ に直す操作はここにはありません。[定義](#def-hpde4-formal-transpose)の両辺は複素双線形な縮約だからです。
<!-- definition-example-end -->

## 4. 接続の微分を移すと密度の発散が現れる

正の滑らかな密度 $\mu=\rho(x)|dx|$ を固定します。実ベクトル場 $X=X^i\partial_i$ が小さな体積を流すときの変化率を、次の係数で定義します。

<a id="def-hpde4-divergence"></a>
<!-- formal-statement-start -->
> **定義（密度に関する発散）**  
> $M$ 上の正の滑らかな密度 $\mu$ と実ベクトル場 $X$ に対し、局所座標で $\mu=\rho|dx|$ と書き
>
$$
\operatorname{div}_{\mu}X
=\frac1\rho\sum_{i=1}^d\partial_i(\rho X^i)
$$
>
> と定める。これは座標によらない滑らかな実関数である。
<!-- formal-statement-end -->

座標不変性を確かめるには、コンパクト台の実数値関数 $f$ に対する

$$
\int_M X(f)\mu=-\int_M f\,\operatorname{div}_\mu X\,\mu
$$

が、各座標で積分の変数変換に対して不変であることを用います。すべてのコンパクト台関数 $f$ に対する積分恒等式を満たす滑らかな係数は一意なので、上の表示も座標によらないと分かります。$\mu=d\mathrm{vol}_g$ の選択は[HPDE3のLorentz体積密度](../HPDE3/index.md#prop-hpde3-metric-density)から得られます。

<!-- definition-example-start: def-hpde4-divergence -->
### 直接例：密度によって発散は変わる

**定義の確認**。$M=\mathbb R$、$X=\partial_x$、$\mu=e^{2x}|dx|$ とすると $\rho=e^{2x}>0$ で

$$
\operatorname{div}_{\mu}X
=e^{-2x}\partial_x(e^{2x}\cdot1)=2.
$$

一方 $\mu_0=|dx|$ なら $\operatorname{div}_{\mu_0}X=\partial_x1=0$ です。[発散の定義](#def-hpde4-divergence)は体積密度の選択に依存し、接続の係数では代用できません。
<!-- definition-example-end -->

<a id="prop-hpde4-connection-transpose"></a>
<!-- formal-statement-start -->
> **命題（接続の微分の形式的双対）**  
> $E\to M$ に接続 $\nabla^E$、$M$ に正の滑らかな密度 $\mu$、実ベクトル場 $X$ を与える。$\psi=\ell\otimes\mu$（$\ell$ はコンパクト台の双対切断）と書けば、$P=\nabla_X^E$ の形式的双対は
>
$$
P^t(\ell\otimes\mu)
=-\bigl(\nabla_X^{E^*}\ell+
(\operatorname{div}_\mu X)\ell\bigr)\otimes\mu.
$$
>
> 一般の零次束写像 $B:E\to E$ を加えた $P=\nabla_X^E+B$ ではさらに $B^t\ell$ が加わる。$B^t:E^*\to E^*$ は $(B^t\ell)(s)=\ell(Bs)$ で定義する。
<!-- formal-statement-end -->

### 証明の見取り図

[双対接続](#def-hpde4-dual-connection)は $\ell(s)$ を微分する規則、[発散](#def-hpde4-divergence)は体積を積分するときの規則です。この二つを一つの部分積分で組み合わせます。

<!-- proof-start -->
### 証明

双対接続の定義を $\ell(s)$ に適用して

$$
\ell(\nabla_X^E s)
=X(\ell(s))-(\nabla_X^{E^*}\ell)(s)
$$

となります。$\ell$ の台がコンパクトなので $\ell(s)$ もコンパクト台関数です。発散の積分恒等式を $f=\ell(s)$ に使えば

$$
\int_M X(\ell(s))\mu
=-\int_M(\operatorname{div}_\mu X)\ell(s)\mu.
$$

これらを加えると

$$
\int_M\ell(\nabla_X^E s)\mu
=-\int_M\bigl(\nabla_X^{E^*}\ell+
(\operatorname{div}_\mu X)\ell\bigr)(s)\mu.
$$

[形式的双対の一意性](#thm-hpde4-transpose-formula)によって所望の式です。零次項は $\ell(Bs)=(B^t\ell)(s)$ なので微分・符号変更を生みません。
<!-- proof-end -->

## 5. Hermite束計量を入れて初めて「随伴」になる

これまでは $E_p^*$ への複素線形汎関数を使い、**共役は不要**でした。別の切断 $t$ を用いて $\ell(s)$ を作りたい場合は、各点に束内積が必要です。以下、複素の場合の規約を**第一引数に線形、第二引数に共役線形**と固定します。実束の場合は対称正定値双線形内積に読み替えます。

<a id="def-hpde4-hermitian-bundle-metric"></a>
<!-- formal-statement-start -->
> **定義（正定値Hermite束計量）**  
> 複素滑らかなベクトル束 $E\to M$ 上の正定値Hermite束計量 $h_E$ は各点 $p$ に写像 $h_{E,p}:E_p\times E_p\to\mathbb C$ を滑らかに与え、すべての $u,v\in E_p$ と $a,b\in\mathbb C$ について
>
$$
h_E(au,bv)=a\overline b\,h_E(u,v),\qquad
h_E(v,u)=\overline{h_E(u,v)}
$$
>
> を満たし、$u\ne0$ なら $h_E(u,u)>0$ とするものをいう。
<!-- formal-statement-end -->

局所枠では $h_E(e\,u,e\,v)=v^*H_Eu$ となります。ここで $v^*=\overline v^{\mathsf T}$、$(H_E)_{ab}=h_E(e_b,e_a)$ です。共役対称性は $H_E^*=H_E$、正定値性は $u^*H_Eu>0$（$u\ne0$）に対応します。**これらの行列条件は、束の二つの入力に基底を代入した結果**であり、定義と別の仮定ではありません。

<!-- definition-example-start: def-hpde4-hermitian-bundle-metric -->
### 直接例：標準内積と非対角表示

**定義の確認**。$E=\mathbb R\times\mathbb C^2$、$h(u,v)=\overline{v_1}u_1+\overline{v_2}u_2$ とします。各成分に定数を掛ければ第一引数の線形性、第二の共役線形性が分かり、$h(v,u)=\overline{h(u,v)}$、$h(u,u)=|u_1|^2+|u_2|^2>0$（$u\ne0$）です。

枠を $e'=eA$、$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ に替えると

$$
H'_E=A^*IA=
\begin{pmatrix}1&1\\1&2\end{pmatrix}.
$$

新枠で $u'=(a,b)^{\mathsf T}$ なら $u'^*H'_Eu'=|a+b|^2+|b|^2>0$（$u'\ne0$）です。変換 $A$ は行列式 $1$ で可逆なので、元の内積の全条件が新枠でも保たれています。
<!-- definition-example-end -->

Hermite束計量と正の密度を選ぶと、切断 $t$ を使って密度値双対試験切断 $\psi_t=h_F(\,\cdot\,,t)\mu$ を作れます。ただし $t\mapsto\psi_t$ は**共役線形**です。これが形式的双対から形式的随伴への複素共役の出発点です。

<a id="def-hpde4-formal-adjoint"></a>
<!-- formal-statement-start -->
> **定義（束計量・密度に関する形式的随伴）**  
> 有限ランク滑らかな複素束 $E,F\to M$ に正定値Hermite束計量 $h_E,h_F$、$M$ に正の滑らかな密度 $\mu$ を指定する。有限階線形微分作用素 $P:\Gamma(M,E)\to\Gamma(M,F)$ の**形式的随伴** $P^*:\Gamma(M,F)\to\Gamma(M,E)$ は、任意のコンパクト台の切断 $s\in\Gamma_c(M,E)$ と $t\in\Gamma_c(M,F)$ について
>
$$
\int_M h_F(Ps,t)\,\mu
=\int_M h_E(s,P^*t)\,\mu
$$
>
> を満たす線形微分作用素である。第一引数線形の規約を用いる。実束は実対称正定値束計量で同じ定義とする。
<!-- formal-statement-end -->

<a id="prop-hpde4-adjoint-from-transpose"></a>
<!-- formal-statement-start -->
> **命題（形式的双対と随伴の関係）**  
> [形式的随伴の定義](#def-hpde4-formal-adjoint)の仮定の下で $P^*$ は一意に存在する。$j_h(t)\in E^*$ を $j_h(t)(s)=h_E(s,t)$ で定める共役線形な束同型とすると
>
$$
P^t\bigl(j_{h_F}(t)\otimes\mu\bigr)
=j_{h_E}(P^*t)\otimes\mu.
$$
>
> 零次の束写像 $A:E\to F$ の随伴を $A^\dagger$ と書く。局所枠での束計量行列を $H_E,H_F$ とすれば
>
$$
A^\dagger=H_E^{-1}A^*H_F
$$
>
> である。右辺の $A^*$ は行列の共役転置を表す。
<!-- formal-statement-end -->

### 証明の見取り図

非退化なHermite内積は各切断 $t$ から双対切断 $j_h(t)$ を作ります。[形式的双対の存在一意性](#thm-hpde4-transpose-formula)をこの双対切断に適用し、再び内積を用いて切断へ戻せば随伴を得られます。

<!-- proof-start -->
### 証明

まず $j_h$ がどのような束同型かを基底で確かめます。$s=e\,u$、$t=e\,v$ とすると、[Hermite束計量の定義](#def-hpde4-hermitian-bundle-metric)から

$
j_h(t)(s)=h_E(s,t)=v^*H_Eu
=\bigl(H_E^{\mathsf T}\overline v\bigr)^{\mathsf T}u.
$

したがって $j_h(t)$ の双対枠での係数列は $H_E^{\mathsf T}\overline v$ です。これは $v$ に共役線形であり、$H_E$ は正定値なので可逆です。よって各点で $j_h$ は共役線形同型となり、$H_E$ と $H_E^{-1}$ の滑らかさから逆写像も滑らかです。

ここで作用域に注意します。[形式的双対の局所公式](#thm-hpde4-transpose-formula)で作った $P^t$ は、最初は**コンパクト台の密度値双対切断**に作用するものです。一方、一般の $t\in\Gamma(M,F)$ に対して $j_{h_F}(t)\otimes\mu$ はコンパクト台とは限りません。そこで任意の滑らかな双対密度 $\eta$ と点 $p$ について、$p$ の近傍で $1$ になるコンパクト台の切断用カットオフ関数 $\chi$ を取り、その近傍で

$
P^t_{\mathrm{loc}}\eta:=P^t(\chi\eta)
$

と定めます。局所公式は有限階の微分と滑らかな係数だけからなり、$\chi=1$ である近傍では $\chi$ の導関数が消えるので、この値はカットオフの選び方に依存しません。同じ理由で局所定義が貼り合わさり、$P^t_{\mathrm{loc}}$ は全滑らかな双対密度へ作用する有限階微分作用素で、コンパクト台上では元の $P^t$ と一致します。

この延長を用いて、密度で割った双対を $j_{h_E}$ で引き戻し、

$
P^*t=j_{h_E}^{-1}\!\left(
\mu^{-1}P^t_{\mathrm{loc}}(j_{h_F}(t)\otimes\mu)\right)
$

と定義します。二つの共役線形写像 $j_{h_F},j_{h_E}^{-1}$ を複素線形な $P^t_{\mathrm{loc}}$ の両側で合成するため $P^*$ は複素線形です。コンパクト台の $t$ では $P^t_{\mathrm{loc}}=P^t$ なので、定義を代入して

$$
\begin{aligned}
\int h_F(Ps,t)\mu
&=\int (j_{h_F}(t)\otimes\mu)(Ps)\\
&=\int\bigl(P^t(j_{h_F}(t)\otimes\mu)\bigr)(s)\\
&=\int h_E(s,P^*t)\mu
\end{aligned}
$$

となり、局所性と有限階性は $P^t_{\mathrm{loc}}$ と各束同型から従います。

一意性もコンパクト台から全切断へ順に示します。二つの候補の差を $D=P^*-Q^*$ とします。任意の $t\in\Gamma_c(M,F)$ に対し $w=Dt$ はコンパクト台です。二つの積分恒等式を引いて $s=w$ と選ぶと

$
0=\int_M h_E(w,w)\,\mu.
$

正定値性と正の密度から $w=0$ です。一般の滑らかな $t$ と任意の点 $p$ には、$p$ の近傍で $1$ になるコンパクト台関数 $\chi$ を選べます。$D$ は有限階の微分作用素で局所的なので

$
(Dt)(p)=\bigl(D(\chi t)\bigr)(p)=0.
$

すべての $p$ で零ですから、候補は全滑らかな切断上でも一致します。

零次項の局所公式は $h_F(Au,v)=v^*H_FA u$ と $h_E(u,A^\dagger v)=v^*(A^\dagger)^*H_Eu$ を比較して

$$
(A^\dagger)^*H_E=H_FA,
\qquad
A^\dagger=H_E^{-1}A^*H_F
$$

を得ます。$H_E$ が可逆なのは正定値性からです。
<!-- proof-end -->

<!-- definition-example-start: def-hpde4-formal-adjoint -->
### 直接例：共役と密度の導関数を確かめる

**定義の確認**。$M=\mathbb R$、自明複素直線束に標準内積 $h(u,v)=u\overline v$、$\mu=\rho(x)|dx|$（$\rho>0$）を与え、$P=a(x)\partial_x+b(x)$ とします。コンパクト台の $u,v$ について

$$
\begin{aligned}
\int (Pu)\overline v\,\rho dx
&=\int a u'\overline v\,\rho dx+\int bu\overline v\,\rho dx\\
&=-\int u\,\partial_x(a\overline v\,\rho)\,dx
   +\int u\,b\overline v\,\rho dx.
\end{aligned}
$$

よって、第二引数の複素共役を戻すと

$$
P^*v=-\rho^{-1}\partial_x(\rho\,\overline a\,v)
+\overline b\,v
=-\overline a\,v'
-\left(\overline{a'}+\overline a\,\frac{\rho'}{\rho}\right)v
+\overline b\,v.
$$

これは定義の積分恒等式をすべてのコンパクト台関数で満たし、正定値内積と正の密度の仮定も満たします。例えば $a=1+i x$、$b=2i$、$\rho=e^{x}$ なら

$$
P^*v=-(1-ix)v'+(-1+ix+i-2i)v
=-(1-ix)v'+(-1+ix-i)v.
$$

対照的に[形式的双対の存在・一意性と局所公式](#thm-hpde4-transpose-formula)からは $P^t\varphi=-\partial_x((1+ix)\varphi)+2i\varphi$（標準密度の係数として）であり、共役も $\rho$ への依存も現れ方が異なります。
<!-- definition-example-end -->

## 6. どのとき $\nabla_X^*=-\nabla_X-\operatorname{div}X$ か

束計量を固定しても、接続がその内積を保つとは限りません。切断の微分と内積の微分が整合するかを次の条件で確かめます。

<a id="def-hpde4-metric-compatible-connection"></a>
<!-- formal-statement-start -->
> **定義（Hermite束計量と両立する接続）**  
> $E$ 上の正定値Hermite束計量 $h_E$ と接続 $\nabla^E$ を与える。$\nabla^E$ が **計量両立**であるとは、任意の滑らかな切断 $s,t$ と滑らかな実ベクトル場 $X$ について
>
$$
X(h_E(s,t))
=h_E(\nabla_X^Es,t)+h_E(s,\nabla_X^Et)
$$
>
> が成り立つことをいう。これは接続だけからは保証されない条件である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-hpde4-metric-compatible-connection -->
### 直接例：Hermite束計量を保つ通常微分

**定義の確認**。$\mathbb R$ 上の自明な複素直線束で $h(u,v)=u\overline v$、$\nabla_Xu=a(x)u'$ とします（$X=a(x)\partial_x$ は滑らかな実ベクトル場）。これは[束接続の定義](#def-hpde4-connection)を満たし、すべての滑らかな $u,v$ に対し

$$
X(h(u,v))=a(u'\overline v+u\overline{v'})
=h(\nabla_Xu,v)+h(u,\nabla_Xv)
$$

です。$a$ が実値であり、第二引数が共役線形であることも確認しました。任意の $u,v,X$ で成り立つので、計量両立の全称条件を満たします。
<!-- definition-example-end -->

<a id="prop-hpde4-metric-connection-adjoint"></a>
<!-- formal-statement-start -->
> **命題（計量両立な接続の形式的随伴）**  
> 複素束 $E$ の接続 $\nabla^E$ が正定値Hermite束計量 $h_E$ と両立し、$\mu$ が正の滑らかな密度、$X$ が実ベクトル場なら
>
$$
(\nabla_X^E)^*
=-\nabla_X^E-(\operatorname{div}_\mu X)\operatorname{id}_E.
$$
>
> 一般の束写像 $B$ に対して $(\nabla_X^E+B)^*$ は右辺に $B^\dagger$ を加えたものになる。
<!-- formal-statement-end -->

### 証明の見取り図

計量両立性は微分を第一引数から第二引数へ移す際の積の法則です。[発散の積分恒等式](#def-hpde4-divergence)で積分から微分を取り除くと、発散が一つ残ります。

<!-- proof-start -->
### 証明

任意の $s,t\in\Gamma_c(M,E)$ に対して計量両立性から

$$
h_E(\nabla_Xs,t)
=X(h_E(s,t))-h_E(s,\nabla_Xt).
$$

右辺の最初の項へ発散の積分恒等式を適用します。$h_E(s,t)$ はコンパクト台なので境界項がなく、

$$
\begin{aligned}
\int h_E(\nabla_Xs,t)\mu
&=-\int(\operatorname{div}_\mu X)h_E(s,t)\mu\\
&\quad-\int h_E(s,\nabla_Xt)\mu\\
&=\int h_E\bigl(s,-\nabla_Xt-(\operatorname{div}_\mu X)t\bigr)\mu.
\end{aligned}
$$

ここで発散は実数値なので第二引数の共役線形性と矛盾しません。[形式的随伴の一意性](#prop-hpde4-adjoint-from-transpose)で結論が従います。零次の $B$ は $h_E(Bs,t)=h_E(s,B^\dagger t)$ によって移ります。
<!-- proof-end -->

### 非自己随伴の模型と破れた仮定

$\mathbb R$ の標準密度・標準Hermite内積・通常微分接続で $P=\partial_x+x$ とすると、[計量両立な接続の命題](#prop-hpde4-metric-connection-adjoint)と零次項の随伴から

$$
P^*=-\partial_x+x\ne\partial_x+x=P.
$$

例えば非定数のコンパクト台関数 $f$ に作用させれば $(P-P^*)f=2f'\ne0$ です。「形式的随伴が存在する」ことから「形式的自己随伴である」は導けません。

さらに $\nabla_{\partial_x}=\partial_x+c(x)$（複素関数 $c$）を標準内積で考えると、$c$ が純虚数値の場合にだけこの接続は計量両立です。実際

$$
\begin{aligned}
\partial_x(u\overline v)
&=u'\overline v+u\overline{v'},\\
h(\nabla_xu,v)+h(u,\nabla_xv)
&=u'\overline v+u\overline{v'}
 +(c+\overline c)u\overline v.
\end{aligned}
$$

一致する必要十分条件は $c+\overline c=0$ です。例えば $c=1$ なら $\nabla_x^*=-\partial_x+1$ であって $-\nabla_x=-\partial_x-1$ ではありません。失われた**計量両立性**が、随伴の単純公式を破ります。

### 境界項はどこへ行ったか

これまでの積分恒等式はコンパクト台で境界項を零にしてきました。区間 $[a,b]$ 上の $C^1$ 関数については

$$
\int_a^b u'(x)\overline{v(x)}\,dx
=\bigl[u(x)\overline{v(x)}\bigr]_{a}^{b}
-\int_a^b u(x)\overline{v'(x)}\,dx.
$$

したがって境界値を制約しない関数全体では $\partial_x^*=-\partial_x$ という**積分恒等式は成立しません**。この形式的な部分積分恒等式と、関数空間・作用域・境界条件を決めたあとの積分恒等式とを無条件に同一視してはいけません。ここでは境界条件付きの問題は扱いません。

## 7. 束値超関数へ作用素を拡張する

[HPDE3の束値超関数の定義](../HPDE3/index.md#def-hpde3-distribution-section)は、試験切断上の連続線形汎関数でした。[形式的双対の台の包含](#thm-hpde4-transpose-formula)によりコンパクト台の試験切断を再びコンパクト台へ送るので、超関数にも $P$ を移せます。

<a id="prop-hpde4-distribution-extension"></a>
<!-- formal-statement-start -->
> **命題（線形微分作用素の超関数への延長）**  
> $P:\Gamma(M,E)\to\Gamma(M,F)$ を有限階線形微分作用素とする。$T\in\mathcal D'(M,E)$ に対し
>
$$
\langle PT,\psi\rangle
:=\langle T,P^t\psi\rangle,\qquad
\psi\in\Gamma_c(M,F^*\otimes|\Lambda^dT^*M|)
$$
>
> は $F$ 値超関数を定める。この延長は複素線形で、滑らかな切断 $s$ には $PT_s=T_{Ps}$ と一致し、$\operatorname{supp}(PT)\subseteq\operatorname{supp}T$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

試験切断の収束に対して $P^t$ が連続であることを局所係数の積・微分から確かめ、次に積分による埋め込みと整合することを検査します。支持の包含は「$T$ が零の開集合上で、$P^t$ はその外へ台を広げない」ことから従います。

<!-- proof-start -->
### 証明

[形式的双対の局所公式](#thm-hpde4-transpose-formula)では、$P^t\psi$ の各係数は滑らかな係数と $\psi$ の有限階偏微分の積の有限和です。$\psi_n\to0$ が一つのコンパクト集合に台を持ち、全階局所偏微分が一様に零へ向かえば、Leibniz則で $P^t\psi_n$ の任意の階数の微分も同じコンパクト集合上で零へ向かいます。よって $P^t$ は試験切断の位相に関して連続で、$T\circ P^t$ も連続線形です。

滑らかな $s$ に対しては[滑らかな切断の分布埋め込み](../HPDE3/index.md#prop-hpde3-regular-injection)と[形式的双対の積分恒等式](#def-hpde4-formal-transpose)を順に使い

$$
\langle PT_s,\psi\rangle
=\int_M(P^t\psi)(s)
=\int_M\psi(Ps)
=\langle T_{Ps},\psi\rangle.
$$

最後に $T$ が開集合 $U$ で零なら、$U$ に台を持つ $\psi$ の $P^t\psi$ も[台の包含](#thm-hpde4-transpose-formula)により $U$ に台を持つので $\langle PT,\psi\rangle=0$。したがって $PT$ は $U$ 上で零であり、[超関数の台の定義](../HPDE3/index.md#def-hpde3-distribution-support)から $\operatorname{supp}(PT)\subseteq\operatorname{supp}T$ が従います。
<!-- proof-end -->

### 点源を微分すると何が起きるか

標準密度 $|dx|$ 上の点源 $\delta_0$ と $P=\partial_x$ を考えます。[HPDE3の点源](../HPDE3/index.md#def-hpde3-point-source)および $P^t=-\partial_x$ から

$$
\langle\partial_x\delta_0,\varphi|dx|\rangle
=\langle\delta_0,-\varphi'|dx|\rangle
=-\varphi'(0).
$$

一方、滑らかな通常関数の微分とは異なり、この作用を一点の値 $\partial_x\delta_0(0)$ と解釈できません。微分した源も支持は $\{0\}$ にとどまります（任意の近傍で $\varphi'(0)\ne0$ の試験関数を選べるため）。

## 8. 演習：どちらの演算子を移したのかを確認する

### A1. 枠を変えた接続係数

- Level: A
- 問題：$\mathbb R$ の自明実直線束で $\Gamma_x=2$、新枠を $e'=e^{3x}e$ とする。$\Gamma'_x$ を求め、切断 $s=e'x$ の微分を新旧両枠で照合せよ。

<!-- solution-start -->
**詳細解答**

$A=e^{3x}$ は常に非零なので枠変換です。[接続の枠変換則](#prop-hpde4-gauge-rule)により

$$
\Gamma'_x=A^{-1}\Gamma_xA+A^{-1}A'
=2+3=5.
$$

新枠では $\nabla_xs=e'(1+5x)$ です。旧枠で $s=e(e^{3x}x)$ と書けば

$$
\nabla_xs=e\bigl(\partial_x(e^{3x}x)+2e^{3x}x\bigr)
=e\bigl(e^{3x}(1+3x)+2e^{3x}x\bigr)
=e'(1+5x).
$$

一致するため、接続係数の差 $3$ は同じ切断を異なる枠で記述した結果です。
<!-- solution-end -->

### A2. 双対接続の係数

- Level: A
- 問題：固定枠の階数2実束で $\Gamma_x=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$、双対成分 $\ell=(x,1)^{\mathsf T}$、切断成分 $u=(1,x)^{\mathsf T}$ とする。$\nabla_x^{E^*}\ell$ と $\nabla_x^Eu$ を求め、縮約の導関数を検算せよ。

<!-- solution-start -->
**詳細解答**

[双対接続の局所表示](#def-hpde4-dual-connection)より

$$
\nabla_x^{E^*}\ell
=\binom{1}{0}-\begin{pmatrix}0&-1\\1&0\end{pmatrix}\binom{x}{1}
=\binom{2}{-x}.
$$

また

$$
\nabla_x^Eu
=\binom{0}{1}+\begin{pmatrix}0&1\\-1&0\end{pmatrix}\binom{1}{x}
=\binom{x}{0}.
$$

従って

$$
(\nabla_x^{E^*}\ell)^{\mathsf T}u+\ell^{\mathsf T}(\nabla_x^Eu)
=(2-x^2)+x^2=2.
$$

直接の縮約は $\ell^{\mathsf T}u=x+x=2x$ で導関数は $2$ となり一致します。
<!-- solution-end -->

### A3. 変係数形式的双対

- Level: A
- 問題：$\mathbb R$ の自明複素直線束で $P=x^2\partial_x+ix$ とする。標準密度の試験切断 $\varphi|dx|$ に対して $P^t$ を計算し、係数 $i$ の扱いを述べよ。

<!-- solution-start -->
**詳細解答**

[形式的双対の局所公式](#thm-hpde4-transpose-formula)で一階項を移すと

$$
\begin{aligned}
P^t\varphi
&=-\partial_x(x^2\varphi)+ix\varphi\\
&=-x^2\varphi'-2x\varphi+ix\varphi.
\end{aligned}
$$

$\partial_x(x^2\varphi)=2x\varphi+x^2\varphi'$ の積の微分を省略できません。$P^t$ は**複素線形**なので $ix$ はそのまま残り、$-ix$ とはなりません。
<!-- solution-end -->

### A4. 密度付き発散

- Level: A
- 問題：$\mathbb R$ 上で $\mu=(1+x^2)|dx|$、$X=x\partial_x$ とする。$\operatorname{div}_\mu X$ と、標準内積を持つ自明複素直線束上の $P=\nabla_X=x\partial_x$ の形式的随伴 $P^*$ を求めよ。

<!-- solution-start -->
**詳細解答**

$\rho=1+x^2>0$ なので[密度付き発散の定義](#def-hpde4-divergence)を適用でき、

$$
\operatorname{div}_{\mu}X
=\frac{\partial_x((1+x^2)x)}{1+x^2}
=\frac{1+3x^2}{1+x^2}.
$$

通常微分は標準Hermite内積と両立します。[計量両立な接続の随伴公式](#prop-hpde4-metric-connection-adjoint)で

$$
(x\partial_x)^*v
=-xv'-\frac{1+3x^2}{1+x^2}v.
$$

単に $-xv'$ では発散項が欠けます。
<!-- solution-end -->

### B1. 二階の形式的双対と境界項

- Level: B
- 問題：$\mathbb R$ 上の $P=a(x)\partial_x^2+b(x)\partial_x+c(x)$（滑らかな複素係数）について、標準密度の形式的双対を求めよ。$a=x$、$b=2x$、$c=3$ とするとき微分作用素の係数を展開せよ。

<!-- solution-start -->
**詳細解答**

コンパクト台の $\varphi$ に対して、一階の部分積分で負号が1つ、二階で負号が2つ現れます。[形式的双対の局所公式](#thm-hpde4-transpose-formula)を次数ごとに使えば

$$
P^t\varphi=(a\varphi)''-(b\varphi)'+c\varphi.
$$

積の微分をそれぞれ展開して

$$
(a\varphi)''=a\varphi''+2a'\varphi'+a''\varphi,\qquad
(b\varphi)'=b\varphi'+b'\varphi
$$

だから

$$
P^t
=a\partial_x^2+(2a'-b)\partial_x+(a''-b'+c).
$$

$a=x$、$b=2x$、$c=3$ では $a'=1$、$a''=0$、$b'=2$ なので

$$
P^t=x\partial_x^2+(2-2x)\partial_x+1.
$$

この計算に複素共役はありません。境界で値が消えるのは試験切断がコンパクト台だからで、任意の端点値を許す区間では境界寄与を別途扱う必要があります。
<!-- solution-end -->

### B2. Hermite行列から零次の随伴へ

- Level: B
- 問題：各点で $\mathbb C^2$ を持つ自明束 $E=F$ に、一定の計量行列 $H=\operatorname{diag}(2,3)$ を与える。束写像 $A=\begin{pmatrix}0&1\\2i&0\end{pmatrix}$ の随伴 $A^\dagger$ を求め、任意の $u,v$ に対する内積の等式を行列で確認せよ。

<!-- solution-start -->
**詳細解答**

$H$ はHermite対称かつ $u^*Hu=2|u_1|^2+3|u_2|^2>0$（$u\ne0$）なので束計量です。[零次随伴の公式](#prop-hpde4-adjoint-from-transpose)を適用して

$$
A^*=\begin{pmatrix}0&-2i\\1&0\end{pmatrix},\qquad
A^*H=\begin{pmatrix}0&-6i\\2&0\end{pmatrix},
$$

$$
A^\dagger=H^{-1}A^*H
=\begin{pmatrix}0&-3i\\2/3&0\end{pmatrix}.
$$

内積は $h(Au,v)=v^*HAu$、$h(u,A^\dagger v)=v^*(A^\dagger)^*Hu$ です。今

$$
(A^\dagger)^*H=
\begin{pmatrix}0&2/3\\3i&0\end{pmatrix}
\begin{pmatrix}2&0\\0&3\end{pmatrix}
=\begin{pmatrix}0&2\\6i&0\end{pmatrix}
=HA.
$$

よって全ての $u,v$ で等式が成り立ちます。$A^*$ そのものを束随伴としてしまうと $H\ne I$ の影響を落とします。
<!-- solution-end -->

### B3. 計量非両立接続の反例

- Level: B
- 問題：$\mathbb R$ 上の複素直線束で $\nabla_x=\partial_x+(1+ix)$、$h(u,v)=u\overline v$、$\mu=e^{2x}|dx|$ とする。計量両立性を検査し、$(\nabla_x)^*$ を求め、$-\nabla_x-\operatorname{div}_{\mu}(\partial_x)$ と比較せよ。

<!-- solution-start -->
**詳細解答**

$c=1+ix$ とすると $c+\overline c=2$ です。実際、任意の $u,v$ に対し

$$
h(\nabla_xu,v)+h(u,\nabla_xv)
=\partial_x(u\overline v)+2u\overline v,
$$

となるため計量両立性は成り立ちません。$\rho=e^{2x}$ の対数微分は $\rho'/\rho=2$。形式的随伴を直接部分積分すれば

$$
(\nabla_x)^*v
=-v'-2v+\overline c\,v
=-v'-(1+ix)v.
$$

一方[発散](#def-hpde4-divergence)は $2$ だから、計量両立を誤って仮定した式は

$$
-\nabla_xv-2v=-v'-(3+ix)v.
$$

差は $2v$ です。計量非両立の余分な $2u\overline v$ が部分積分で消えず、誤差として残ります。
<!-- solution-end -->

### C1. 形式的双対、随伴、超関数を一つの模型で区別する

- Level: C
- 問題：$M=\mathbb R$、$E=\mathbb R\times\mathbb C$、$h(u,v)=u\overline v$、$\mu=e^x|dx|$ とする。$P=(1+i)\partial_x+x$ に対して次を示せ。
  1. $\psi=\varphi|dx|$ を標準密度の試験切断として、$P^t\psi$ の係数を求める。
  2. 束計量と $\mu$ に関する $P^*$ を求め、$P\ne P^*$ を確かめる。
  3. $\mu$ に関する点源 $\delta_{0,1}^{\mu}$ の $P\delta_{0,1}^{\mu}$ の作用を、$\varphi|dx|$ に対して求め、その台を証明せよ。

<!-- solution-start -->
**詳細解答**

まず一階係数 $1+i$ は定数なので、[形式的双対の存在・一意性と局所公式](#thm-hpde4-transpose-formula)から

$$
P^t(\varphi|dx|)
=\bigl(-(1+i)\varphi'+x\varphi\bigr)|dx|.
$$

次に[形式的随伴の定義](#def-hpde4-formal-adjoint)で $h$ は第一引数線形、第二引数共役線形です。$u,v$ をコンパクト台とすると

$$
\begin{aligned}
\int(Pu)\overline v\,e^xdx
&=\int(1+i)u'\overline v\,e^xdx+\int xu\overline v\,e^xdx\\
&=-\int u(1+i)e^x(\overline{v'}+\overline v)\,dx
+\int xu\overline v\,e^xdx.
\end{aligned}
$$

従って

$$
P^*v=-(1-i)v'-(1-i)v+xv.
$$

微分係数が $1+i$ と $-(1-i)$ で異なるので $P\ne P^*$ です。この違いは形式的双対との共役だけでなく、密度 $e^x$ の導関数からも生じています。

最後に[線形微分作用素の超関数への延長](#prop-hpde4-distribution-extension)と[基準密度に関する点源](../HPDE3/index.md#def-hpde3-point-source)の定義を使います。$\mu_0=e^0|dx|=|dx|$ なので

$$
\begin{aligned}
\langle P\delta_{0,1}^{\mu},\varphi|dx|\rangle
&=\langle\delta_{0,1}^{\mu},P^t(\varphi|dx|)\rangle\\
&=-(1+i)\varphi'(0)+0\cdot\varphi(0)\\
&=-(1+i)\varphi'(0).
\end{aligned}
$$

$0$ の外で支持された試験関数は $\varphi'(0)=0$ なので作用は零です。他方、$0$ の任意の近傍 $U$ に支持される滑らかな関数 $\varphi(x)=x\chi(x)$（$\chi\in C_c^\infty(U)$、$\chi(0)=1$）を選べば $\varphi'(0)=1$ で作用値は $-(1+i)\ne0$ です。[超関数の台の定義](../HPDE3/index.md#def-hpde3-distribution-support)から

$$
\operatorname{supp}(P\delta_{0,1}^{\mu})=\{0\}.
$$

なお、最後の作用を $P^*$ で計算するのは誤りです。超関数のテスト相手は密度値の代数的双対なので、定義に現れるのは $P^t$ です。
<!-- solution-end -->

---

## 9. 次章へ：波の「最高階の微分」は何を示すか

接続で束の切断を微分し、有限階微分作用素と形式的双対・随伴を区別できました。超関数にも作用素を移せます。しかしここで扱った作用素が「波動型」かどうかは、随伴を調べるだけでは分かりません。次のHPDE5では二階微分の最高階係数から**主シンボル**を構成し、Lorentz計量の光的方向が特性になる理由を導きます。
