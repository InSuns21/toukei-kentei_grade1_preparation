# LREP3 Lie環表現と群表現の積分

<!-- definition-example-audit: strict -->

[LREP1の線形表現](../LREP1/index.md#def-lrep1-linear-representation)は群全体の元に可逆線形変換を対応させました。[LIE2で定義した Lie 群の写像 $\exp_G$](../../LIE/LIE2/index.md#def-lie2-exponential-map)を用いると、群の元を一つの接ベクトルから動かせます。そこで、群表現を単位元で微分すると何が残るか、逆にその微分だけから群表現を取り戻せるか、という問いが生じます。

例えば実数の加法群の表現 $t\mapsto e^{tA}$ は行列 $A$ 一つで決まります。しかし円周群の角度を $2\pi$ だけ増やすと同じ群要素へ戻るため、好きな $A$ を指数化してよいわけではありません。局所的な交換関係と、閉曲線を一周して戻るという大域的条件は別物です。

本講では、**有限次元の実 Lie 群** $G$ と **[複素ベクトル空間](../../../基礎科目/LA/LA1/index.md#def-la1-real-complex-vector-space)** $V$ （複素次元は有限） を基本設定にします。$\mathfrak g=T_eG$ は実 Lie 環、$\operatorname{End}_{\mathbb C}(V)$ は複素線形自己写像の空間ですが、Lie 環としては実数体上で考えます。積分によって局所表現を作り、閉曲線を一点へ縮められる群で大域表現に延長し、一般の連結群では被覆の核への作用を判定します。

## 1. 群表現を微分すると何が得られるか

単なる群準同型には微分できる保証がありません。そこでまず、$G$ の多様体構造に関して滑らかな線形表現を扱います。すなわち群準同型 $D:G\to GL_{\mathbb C}(V)$ が滑らかであるとします。$GL_{\mathbb C}(V)$ は実 Lie 群として見ます。

単位元 $e$ を固定して $D$ を微分すると、$\mathfrak g$ の元 $X$ は $V$ 上の複素線形写像 $dD_e(X)$ に移ります。微分は実線形です。Lie 環における括弧に対応する操作は、行列では交換子 $[A,B]=AB-BA$ です。この二つの操作を両立させることが、無限小表現の核心です。

<a id="def-lrep3-lie-algebra-representation"></a>
<!-- formal-statement-start -->
> **定義（Lie 環表現）**  
> $G$ を有限次元実 Lie 群、$\mathfrak g=T_eG$ をその実 Lie 環、$V$ を有限次元複素ベクトル空間とする。実線形写像
>
$$
\rho:\mathfrak g\longrightarrow\operatorname{End}_{\mathbb C}(V)
$$
>
> が、すべての $X,Y\in\mathfrak g$ に対して
>
$$
\rho([X,Y])=[\rho(X),\rho(Y)]
=\rho(X)\rho(Y)-\rho(Y)\rho(X)
$$
>
> を満たすとき、$\rho$ を $\mathfrak g$ の $V$ 上の **Lie 環表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep3-lie-algebra-representation -->
**定義の確認**： $\mathfrak g=\mathbb R$ を加法群 $(\mathbb R,+)$ の Lie 環とすると、群が可換なので括弧は常に零です。$V=\mathbb C^2$ の標準基底を $e_1,e_2$ とし、各実数 $x$ に対して
$
\rho(x)e_1=0,\qquad \rho(x)e_2=xe_1
$
という作用を定めます。この二式から、任意の複素数 $z_1,z_2$ に対して
$
\rho(x)(z_1e_1+z_2e_2)=xz_2e_1
$
です。したがって各 $\rho(x)$ は $V$ 上の**複素線形**自己写像で、同じ基底での行列は
$
[\rho(x)]_{(e_1,e_2)}=xN,\qquad
N=\begin{pmatrix}0&1\\0&0\end{pmatrix}
$
となります。[線形作用の合成と同一基底での行列積の対応](../LREP1/index.md#def-lrep1-linear-representation)により、定義の交換子条件を行列積で検査できます。

実数 $a,b,x,y$ に対して $\rho(ax+by)=(ax+by)N=a\rho(x)+b\rho(y)$ であり、**実線形性**が成り立ちます。さらに
$
\rho([x,y])=0,\qquad
[\rho(x),\rho(y)]=xy(NN-NN)=0.
$
よって、複素線形自己写像への実線形性と括弧保存の両方を確認できました。
<!-- definition-example-end -->

<a id="thm-lrep3-differentiation"></a>
<!-- formal-statement-start -->
> **定理（群表現の微分は Lie 環表現になる）**  
> $G$ を有限次元実 Lie 群、$V$ を有限次元複素ベクトル空間、$D:G\to GL_{\mathbb C}(V)$ を滑らかな群準同型とする。このとき
>
$$
dD:=dD_e:\mathfrak g\to\operatorname{End}_{\mathbb C}(V)
$$
>
> は実線形な Lie 環表現であり、すべての $X\in\mathfrak g$、$t\in\mathbb R$ について
>
$$
D(\exp_G(tX))=\exp(t\,dD(X))
$$
>
> が成り立つ。右辺の指数は行列指数である。
<!-- formal-statement-end -->

**証明の見取り図。** まず群準同型は指数曲線を指数曲線へ写すことを使います。次に共役による変換を微分し、Lie 環の括弧が行列の交換子へ移ることを確かめます。

<!-- proof-start -->
### 証明

微分 $dD_e$ が実線形なことは多様体写像の微分の線形性によります。[Lie 群準同型と Lie 群の指数写像の自然性](../../LIE/LIE2/index.md#thm-lie2-exponential-naturality)を $D$ に適用すると
$$
D(\exp_G(tX))
=\exp_{GL(V)}(t\,dD_e(X)).
$$
[一般線形群における Lie 群の指数写像の計算](../../LIE/LIE2/index.md#thm-lie2-general-linear-exponential)は行列指数と一致します（複素行列にも同じ微分方程式の証明が使えます）。したがって主張の指数公式を得ます。

括弧の保存を確認します。$X,Y\in\mathfrak g$ を固定して $g_s=\exp_G(sX)$ とします。共役 $g_s\exp_G(tY)g_s^{-1}$ を $D$ で写し、$t=0$ で微分すると、[共役と Lie 群の指数写像の関係](../../LIE/LIE2/index.md#thm-lie2-conjugation-exponential)を用いて
$$
dD(\operatorname{Ad}_{g_s}Y)
=D(g_s)\,dD(Y)\,D(g_s)^{-1}
=e^{s\,dD(X)}dD(Y)e^{-s\,dD(X)}.
$$
左辺を $s=0$ で微分すると [無限小随伴作用と Lie 括弧](../../LIE/LIE2/index.md#thm-lie2-infinitesimal-adjoint-bracket)により $dD([X,Y])$ です。右辺では行列指数の導関数が $\frac{d}{ds}e^{sA}|_{s=0}=A$、$\frac{d}{ds}e^{-sA}|_{s=0}=-A$ だから
$$
\left.\frac{d}{ds}\right|_{s=0}
e^{sA}Be^{-sA}
=AB-BA,\qquad A=dD(X),\ B=dD(Y).
$$
両辺を比べて $dD([X,Y])=[dD(X),dD(Y)]$ です。$\square$
<!-- proof-end -->

**一つの行列に戻る例。** 先ほどの $N$ は $N^2=0$ なので
$$
D(t)=e^{tN}=I_2+tN
=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$
実際 $D(t+s)=D(t)D(s)$、$D(0)=I_2$、$D'(0)=N$ です。[LREP1の上三角表現](../LREP1/index.md#prop-lrep1-nonsplit)が無限小作用 $N$ から復元されました。コンパクト群でなくても微分・積分はできる一方、[コンパクト群の有限次元連続複素表現の完全可約性](../LREP2/index.md#thm-lrep2-complete-reducibility)を適用するには別の仮定が必要です。

## 2. Lie 環表現は局所的には積分できる

交換関係を満たす $\rho$ が与えられたとします。$G$ の元を任意に Lie 群の指数写像の逆で表して $D(\exp_G X)=e^{\rho(X)}$ と置きたくなります。しかし Lie 群の指数写像が一対一とは限らず、さらに非可換群では一般に $e^{\rho(X+Y)}=e^{\rho(X)}e^{\rho(Y)}$ ではありません。

そこでまず単位元近くの小さい領域だけで積を保つ写像を考えます。ここで「局所」とは、任意の二元の積を常に領域内で定義するという意味ではなく、積が領域内にある場合に限り群法則を課すという意味です。

<a id="def-lrep3-local-representation"></a>
<!-- formal-statement-start -->
> **定義（局所群表現）**  
> $G$ を Lie 群、$U\subseteq G$ を単位元 $e$ を含む開近傍、$V$ を有限次元複素ベクトル空間とする。滑らかな写像 $D_U:U\to GL_{\mathbb C}(V)$ が $D_U(e)=I_V$ を満たし、$g,h,gh\in U$ ならば
>
$$
D_U(gh)=D_U(g)D_U(h)
$$
>
> を満たすとき、$D_U$ を $U$ 上の **局所群表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep3-local-representation -->
**定義の確認**： $G=SO(2)$、$V=\mathbb C$ とし、$|\theta|<\pi/4$ で
$
R_\theta=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}
$
と書ける単位元の近傍 $U$ を選びます。実数 $\lambda$ を固定し、$D_U(R_\theta)$ を $V$ 上で複素数 $e^{i\lambda\theta}$ を掛ける写像と定めます。この値は非零なので $GL_{\mathbb C}(\mathbb C)$ に入り、角度表示が一意な区間で滑らかに変化します。

単位元 $I=R_0$ では $D_U(I)=1=I_V$ です。回転行列の積は $R_\theta R_\phi=R_{\theta+\phi}$ です。$R_\theta,R_\phi,R_\theta R_\phi\in U$ なら $|\theta+\phi|<\pi/2$ であり、積が再び $U$ にあることからこの範囲で $|\theta+\phi|<\pi/4$ です。したがって積の角度として $\theta+\phi$ をそのまま使え、
$
D_U(R_\theta R_\phi)=e^{i\lambda(\theta+\phi)}
=e^{i\lambda\theta}e^{i\lambda\phi}
=D_U(R_\theta)D_U(R_\phi).
$
以上で、滑らかさ・単位元・定義域内の積という定義の全条件を確認しました。実数 $\lambda$ は任意です。
<!-- definition-example-end -->

次に、Lie 環から局所表現を構成するための微分方程式を用意します。[左 Maurer–Cartan 形式](../../LIE/LIE4/index.md#def-lie4-maurer-cartan-form)は $\theta_g:T_gG\to\mathfrak g$ により接ベクトルを単位元へ戻すものです。$\rho$ を適用して、行列値1形式
$$
\alpha_g(v):=\rho(\theta_g(v))
\quad(g\in G,\ v\in T_gG)
$$
を作ります。曲線 $c:[0,1]\to G$ に対し $\alpha_{c(t)}(c'(t))$ は行列なので、初期値問題
$$
U'(t)=U(t)\,\alpha_{c(t)}(c'(t)),
\qquad U(0)=I_V
$$
を解けます。ここで $U'(t)=dU(t)/dt$ は**経路の変数 $t$ に関する通常の導関数**であり、$\alpha(c')$ は $\alpha_{c(t)}(c'(t))$ の略記です。左 Maurer–Cartan 形式に対応するのは $U'=U\alpha(c')$ という右側からの係数の掛け方です。係数が連続なら線形 ODE の解は一意に存在します。さらに $W'=-\alpha(c')W$、$W(0)=I_V$ の解を取ると
$
(UW)'=U'W+UW'
=U\alpha(c')W-U\alpha(c')W=0.
$
初期値から $U(t)W(t)=I_V$ となり、有限次元の正方行列 $U(t)$ は常に可逆です。

$\rho$ が括弧を保つことは、行列値1形式の可積分条件を意味します。$A\wedge A$ を $(A\wedge A)(v,w)=A(v)A(w)-A(w)A(v)$ とする規約で書きます。

<a id="lem-lrep3-flatness"></a>
<!-- formal-statement-start -->
> **補題（Lie 環表現から作る行列値1形式の平坦性）**  
> $G$ を有限次元実 Lie 群、$\rho:\mathfrak g\to\operatorname{End}_{\mathbb C}(V)$ を有限次元 Lie 環表現とする。$\alpha=\rho\circ\theta$ について
>
$$
d\alpha+\alpha\wedge\alpha=0
$$
>
> が成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 左 Maurer–Cartan 方程式を $\rho$ で写します。括弧を交換子に写す条件が、外積の第二項と一致します。

<!-- proof-start -->
### 証明

[Lie 環値1形式の Maurer–Cartan 方程式](../../LIE/LIE4/index.md#thm-lie4-maurer-cartan-equation)は
$$
d\theta(v,w)=-[\theta(v),\theta(w)]
$$
です。$\rho$ は定数の線形写像なので各成分の外微分と交換し、
$$
\begin{aligned}
d\alpha(v,w)
&=\rho(d\theta(v,w))\\
&=-\rho([\theta(v),\theta(w)])\\
&=-[\rho(\theta(v)),\rho(\theta(w))]\\
&=-\alpha(v)\alpha(w)+\alpha(w)\alpha(v).
\end{aligned}
$$
これは $d\alpha+\alpha\wedge\alpha=0$ を意味します。$\square$
<!-- proof-end -->

## 3. 単連結なら経路に依存せず積分できる

行列の微分方程式を曲線に沿って解いても、終点が同じ二本の経路で異なる行列が出るかもしれません。ここで **単連結** とは、空間が弧状連結であり、任意の閉曲線が連続変形によって一点へ縮められることです。これは二本の道を同じ始点・終点を保ったまま移り合わせられることと同値です。滑らかな多様体上では、その変形を区分的に滑らかな経路の変形として扱えます。

実直線では、閉曲線 $c:[0,1]\to\mathbb R$ が $c(0)=c(1)=a$ を満たすとき、$H(s,t)=(1-s)c(t)+sa$ と置けば $H(0,t)=c(t)$、$H(1,t)=a$、$H(s,0)=H(s,1)=a$ です。従って閉路を端点を保って一点へ縮められます。単連結性は比較幾何などでも用いる位相条件ですが、本講では今述べた閉路収縮条件を直接使い、別の章の定理を仮定しません。

<a id="thm-lrep3-integration"></a>
<!-- formal-statement-start -->
> **定理（単連結 Lie 群への一意な積分）**  
> $G$ を連結かつ単連結な有限次元実 Lie 群、$\mathfrak g=T_eG$、$V$ を有限次元複素ベクトル空間とする。任意の実線形 Lie 環表現
>
$$
\rho:\mathfrak g\to\operatorname{End}_{\mathbb C}(V)
$$
>
> に対し、一意な滑らかな群表現 $D:G\to GL_{\mathbb C}(V)$ が存在して $dD_e=\rho$ を満たす。このとき
>
$$
D(\exp_G X)=e^{\rho(X)}
\qquad(X\in\mathfrak g)
$$
>
> である。
<!-- formal-statement-end -->

**証明の見取り図。** [平坦性の補題](#lem-lrep3-flatness)で経路を変形しても ODE の終端値が変わらないことを示します。曲線の左移動で ODE 係数が不変になるため、終端値が群の積を保ちます。最後に Lie 群の指数写像の局所可逆性から滑らかさと一意性を確認します。

<!-- proof-start -->
### 証明

**(1) 経路変形で終端値が変わらない。** $c(s,t)$ を $c(s,0)=e$、$c(s,1)=g$ を満たす始点と終点を保つ滑らかな経路変形とします。$s,t\in[0,1]$ とし、
$$
A(s,t)=\alpha_{c(s,t)}(\partial_t c),\qquad
B(s,t)=\alpha_{c(s,t)}(\partial_s c)
$$
と置きます。$\partial_t c$ は **$s$ を固定して $t$ で微分した接ベクトル**、$\partial_s c$ は **$t$ を固定して $s$ で微分した接ベクトル**です。したがって $A,B$ は二つの変数 $(s,t)$ に依存する行列であり、$\partial_s A$ には $c(s,t)$ と $\partial_t c$ の $s$ 依存も含まれます。各 $s$ について
$
\partial_t U(s,t)=U(s,t)A(s,t),\qquad U(s,0)=I_V
$
を解き、$C(s,t)=U(s,t)^{-1}\partial_s U(s,t)$ を定めます。前節の $U'(t)$ は経路を一つ固定した導関数で、ここではそれが $\partial_t U(s,t)$ に当たります。曲線に沿う線形 ODE の解は、滑らかな係数と初期値によりパラメータ $s$ に滑らかに依存します。

$\partial_t U=UA$ を $s$ で微分して
$$
\begin{aligned}
\partial_t C
&=-U^{-1}(\partial_t U)U^{-1}\partial_s U
+U^{-1}\partial_s\partial_t U\\
&=-AC+U^{-1}\bigl((\partial_s U)A+U\partial_s A\bigr)\\
&=\partial_s A+[C,A].
\end{aligned}
$$
一方、[平坦性](#lem-lrep3-flatness)を経路変形の二つの接ベクトル $(\partial_s c,\partial_t c)$ に適用します。$(s,t)$ 平面に引き戻した1形式は $c^*\alpha=A\,dt+B\,ds$ なので、外微分と行列値外積を $ds\wedge dt$ の係数で比較すると
$
\begin{aligned}
d(c^*\alpha)
&=(\partial_s A-\partial_t B)\,ds\wedge dt,\\
(c^*\alpha)\wedge(c^*\alpha)
&=(BA-AB)\,ds\wedge dt.
\end{aligned}
$
従って
$
0=\partial_s A-\partial_t B+[B,A],
\qquad
\partial_t B=\partial_s A+[B,A].
$
したがって $C,B$ は同じ線形 ODE を満たします。始点が一定で $U(s,0)=I$、$\partial_s c(s,0)=0$ だから $C(s,0)=B(s,0)=0$ です。解の一意性で $C=B$ となります。終点も一定なので $B(s,1)=0$、従って
$$
\partial_sU(s,1)=U(s,1)C(s,1)=0.
$$
よって ODE の終端値は端点固定変形によらず一定です。区分的に滑らかな変形でも区間ごとに同じ議論を適用できます。

**(2) 経路の選択と積。** $G$ が連結な多様体であるため、$e$ から各 $g$ への区分的滑らかな経路があります。任意の閉路が一点へ縮められるという仮定により、任意の二経路は始点と終点を固定した変形で結べるので、終端値を $D(g)$ とすれば一意に定まります。

$e\to g$ の経路 $c$ と $e\to h$ の経路 $d$ を選び、後者を $g$ で左移動して $g\to gh$ とします。[左 Maurer–Cartan 形式の左不変性](../../LIE/LIE4/index.md#prop-lie4-maurer-cartan-equivariance)から
$$
\alpha_{gd(t)}\bigl((L_g)_*d'(t)\bigr)
=\alpha_{d(t)}(d'(t)).
$$
連結した経路上の ODE は、前半の終端値 $D(g)$ を初期値として後半を解くことになります。後半の解は $D(g)U_d(t)$ なので
$$
D(gh)=D(g)D(h),\qquad D(e)=I.
$$
また逆元は $D(g^{-1})=D(g)^{-1}$ です。従って $D$ は群表現です。

**(3) 滑らかさ・微分・一意性。** $e$ に近い元は[Lie 群の指数写像の局所微分同相性](../../LIE/LIE2/index.md#thm-lie2-exponential-local-diffeomorphism)から $g=\exp_G X$ と一意に表せます。経路 $c(t)=\exp_G(tX)$ では $\theta(c'(t))=X$ が一定なので ODE の解は $U(t)=e^{t\rho(X)}$ です。従って
$$
D(\exp_G X)=e^{\rho(X)}
$$
が $e$ の近くで成立し、$D$ はそこで滑らかです。積の法則 $D(gh)=D(g)D(h)$ によって任意の $g$ の近くでも滑らかです。$tX$ の曲線を $t=0$ で微分すると $dD_e(X)=\rho(X)$ となります。

指数公式は任意の $X$ にも成り立ちます。実際 $n$ を十分大きくすれば $X/n$ は上の近傍に入り、
$$
D(\exp_G X)=D(\exp_G(X/n))^n
=(e^{\rho(X)/n})^n=e^{\rho(X)}.
$$

最後に一意性を確かめます。$D_1,D_2$ を同じ $\rho$ を微分として持つ二つの表現とすると、既に示した指数曲線の等式により単位元 $e$ のある近傍で一致します。その近傍の元を有限回掛け合わせて得る集合は、開いた部分群です。連結 Lie 群の開部分群は全体と一致するため、全ての $g\in G$ に対して $D_1(g)=D_2(g)$ が成り立ちます。$\square$
<!-- proof-end -->

この証明は、[LIE4の Maurer–Cartan 方程式](../../LIE/LIE4/index.md#thm-lie4-maurer-cartan-equation)が「局所的な交換関係」から「経路に沿った行列作用」へ橋を架けることも示します。単連結性がなくても、単位元の十分小さい可縮な近傍では経路変形ができるため、同じ構成で局所群表現を得られます。ただし遠回りした二経路の終端値が等しいとは限りません。

<a id="cor-lrep3-local-integrability"></a>
<!-- formal-statement-start -->
> **系（Lie 環表現の局所積分）**  
> $G$ を有限次元実 Lie 群、$V$ を有限次元複素ベクトル空間、$\rho$ を $\mathfrak g$ の $V$ 上の Lie 環表現とする。
> このとき単位元のある開近傍 $U$ と滑らかな局所群表現 $D_U$ が存在し、次の微分条件を満たす。

$$
d(D_U)_e=\rho.
$$

> 十分小さい連結な近傍上では、この局所群表現は一意である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$e$ を含む指数座標の開球をさらに小さく取り、座標内で星型となる開近傍を選びます。各終点への径路上の ODE の終端値を使います。上の[積分定理](#thm-lrep3-integration)の証明 (1) は可縮な近傍内部の二経路に適用でき、そこで終端値は経路に依存しません。

具体的には単位元の可縮な開近傍 $W$ を先に取り、さらに小さい指数座標近傍 $U$ を次の包含が成り立つように選びます。

$$
U\cdot U\subset W.
$$

$g,h,gh\in U$ とします。$U$ 内の経路 $e\to g$ と $e\to h$ を選び、後者を $g$ で左移動して $g\to gh$ の道を作ります。連結した経路は $W$ 内にあります。一方、$e\to gh$ への道を $U$ 内に取ることもできます。$W$ は可縮なので、この二つの道は $W$ 内で両端を保ったまま変形できます。

上の証明 (2) と同じ ODE の議論により

$$
D_U(gh)=D_U(g)D_U(h).
$$

滑らかさと微分は指数曲線で確認します。局所で $D_U(\exp_G X)=e^{\rho(X)}$ が成立するため、同じ微分を持つ局所表現の値は一意です。$\square$
<!-- proof-end -->

## 4. 被覆の核は何を妨げるか

一般の連結 Lie 群 $G$ には、同じ Lie 環を持つ単連結 Lie 群 $\widetilde G$ と、その上への被覆準同型 $\pi:\widetilde G\to G$ が存在します。被覆とは、どの点でも小さな開近傍上は同相に見える全射であり、$\pi$ はさらに群準同型です。$\pi$ の微分は Lie 環の同型を与えます。これを利用すると、Lie 環表現はまず $\widetilde G$ 上で一意に積分されます。

重要なのは、$\pi(\tilde g)=\pi(\tilde h)$ となる異なる被覆群の元が、元の群では同じ元だということです。その二つに割り当てる行列が一致しないなら、元の群上の表現は定義できません。

<a id="def-lrep3-descent"></a>
<!-- formal-statement-start -->
> **定義（被覆表現の降下）**  
> $\pi:\widetilde G\to G$ を Lie 群の全射準同型、$\widetilde D:\widetilde G\to GL_{\mathbb C}(V)$ を滑らかな表現とする。$G$ の表現 $D$ が存在して
>
$$
\widetilde D=D\circ\pi
$$
>
> となるとき、$\widetilde D$ は $G$ 上の表現へ **降下する**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep3-descent -->
**定義の確認**： $\pi:\mathbb R\to SO(2)$ を $\pi(\theta)=R_\theta$ とします。$V=\mathbb C$ 上での乗法表現 $\widetilde D(\theta)=e^{2i\theta}$ は、$D(R_\theta)=e^{2i\theta}$ と置いても
$
e^{2i(\theta+2\pi k)}=e^{2i\theta}\qquad(k\in\mathbb Z)
$
となるため代表角の選択によらず定義できます。さらに $D(R_\theta R_\phi)=D(R_\theta)D(R_\phi)$、$D(I)=1$ です。角度を局所座標とすれば $D$ は滑らかで、$\widetilde D=D\circ\pi$ が成り立つので降下します。

一方 $\widetilde D(\theta)=e^{i\theta/2}$ は滑らかな $\mathbb R$ の群表現で $\widetilde D(0)=1$ ですが $\widetilde D(2\pi)=-1$ です。同じ回転 $R_0=R_{2\pi}=I$ に異なる値を割り当てるため、$D$ を一価に定義できず降下しません。
<!-- definition-example-end -->

<a id="thm-lrep3-descent-criterion"></a>
<!-- formal-statement-start -->
> **定理（被覆核による降下判定）**  
> $G$ を連結な有限次元実 Lie 群、$\pi:\widetilde G\to G$ をその単連結被覆群の被覆準同型、$K=\ker\pi$ とする。$\mathfrak g$ の有限次元複素 Lie 環表現 $\rho$ を被覆側の Lie 環へ微分同型で移し、[単連結群への積分](#thm-lrep3-integration)で $\widetilde D$ を得る。このとき $\rho$ が $G$ の滑らかな群表現の微分となるための必要十分条件は
>
$$
\widetilde D(k)=I_V\quad(\forall k\in K)
$$
>
> である。条件が成立すれば、対応する $G$ の表現は一意である。
<!-- formal-statement-end -->

**証明の見取り図。** 必要性は $\pi(k)=e$ から直ちに得られます。十分性は $G$ の元の持ち上げ方を変えたとき、その違いが $K$ に属することを使います。

<!-- proof-start -->
### 証明

必要性：$D:G\to GL(V)$ があり $\widetilde D=D\circ\pi$ なら、任意の $k\in K$ に対し
$$
\widetilde D(k)=D(\pi(k))=D(e)=I_V.
$$

十分性：$\widetilde D(K)=\{I_V\}$ とします。$g\in G$ に対し $\pi(\tilde g)=g$ となる持ち上げ $\tilde g$ を選んで $D(g)=\widetilde D(\tilde g)$ と置きます。他の持ち上げ $\tilde g'$ なら $\tilde g^{-1}\tilde g'\in K$ なので
$$
\widetilde D(\tilde g')
=\widetilde D(\tilde g)\widetilde D(\tilde g^{-1}\tilde g')
=\widetilde D(\tilde g).
$$
従って $D$ は well-defined です。$g,h$ の持ち上げ $\tilde g,\tilde h$ を選ぶと、$\tilde g\tilde h$ は $gh$ の持ち上げであり
$$
D(gh)=\widetilde D(\tilde g\tilde h)=D(g)D(h).
$$
$\pi$ は局所微分同相なので、各点の近くで $D=\widetilde D\circ(\pi|_{\widetilde U})^{-1}$ と表せ、$D$ は滑らかです。微分は $\rho$、一意性は $\pi$ が全射であることから従います。$\square$
<!-- proof-end -->

被覆の核 $K$ は離散です。$\widetilde G$ が連結であれば $K$ は中心にも入ります。実際、固定した $k\in K$ に対し $\tilde g\mapsto\tilde gk\tilde g^{-1}$ は連続で、値は離散集合 $K$ に入るため一定です。$\tilde g=e$ で値は $k$ なので全ての $\tilde g$ で同じ値になります。この事実は、後続で $SU(2)$ の二重被覆を扱うときにも使います。

## 5. 二つの代表例：円周と回転の被覆

### 円周 $SO(2)$ で整数条件が現れる

$SO(2)$ の Lie 環は $J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ の実数倍です。括弧は零なので、任意の $\lambda\in\mathbb R$ に対する $\rho_\lambda(xJ)=i\lambda x$ は1次元複素 Lie 環表現です。この段階では $\lambda$ は整数である必要はありません。

被覆写像 $\pi:\mathbb R\to SO(2)$ は $\pi(\theta)=e^{\theta J}=R_\theta$、$\ker\pi=2\pi\mathbb Z$ です。[単連結群への積分](#thm-lrep3-integration)は
$$
\widetilde D_\lambda(\theta)=e^{i\lambda\theta}
$$
を与えます。[降下判定](#thm-lrep3-descent-criterion)に必要なのは $\widetilde D_\lambda(2\pi)=1$ であり、
$$
e^{2\pi i\lambda}=1
\quad\Longleftrightarrow\quad
\lambda\in\mathbb Z
$$
です。$\lambda=1/2$ でも小さな回転では正しい局所表現を与えますが、一周すると符号が反転します。

### $SU(2)$ と $SO(3)$ に向けた予告

行列群 $SU(2)$ の Lie 環 $\mathfrak{su}(2)$ に対し、$\rho(X)=X$ を $\mathbb C^2$ 上の複素行列作用として取ると
$$
\rho([X,Y])=XY-YX=[\rho(X),\rho(Y)].
$$
この Lie 環表現は $SU(2)$ の標準行列表現 $D(U)=U$ へ積分されます。後の LREP5 で構成する二重被覆 $SU(2)\to SO(3)$ の核は $\{I_2,-I_2\}$ です。標準表現では $D(-I_2)=-I_2$ なので、この表現は通常の $SO(3)$ 表現へ降下しません。

対照的に $SU(2)$ の[随伴表現](../../LIE/LIE2/index.md#def-lie2-adjoint-representation) $\operatorname{Ad}_U(X)=UXU^{-1}$ は、$-I_2$ についても $\operatorname{Ad}_{-I_2}(X)=X$ なので降下します。どちらも Lie 環レベルでは正しい表現です。**Lie 環の交換関係だけで、元の群の全ての閉じた回転を区別できるわけではありません。** 被覆の証明そのものと $2\pi$ 回転の行列計算は LREP5 で行います。

## 6. 演習

### Level A

<a id="ex-lrep3-a01"></a>
#### LREP3-A01 上三角の無限小表現を積分する
- Level: A
- ID: LREP3-A01

$N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$、$\rho(x)=xN$（$x\in\mathbb R$）について、Lie 環表現の条件を確認し、$(\mathbb R,+)$ 上の群表現 $D(t)$ を構成せよ。$D'(0)$ と $D(s+t)$ も計算せよ。

<!-- solution-start -->
**詳細解答。** $\mathbb R$ の括弧は零で、$\rho(ax+by)=a\rho(x)+b\rho(y)$、$[\rho(x),\rho(y)]=xy[N,N]=0$ だから Lie 環表現です。$N^2=0$ より
$$
D(t)=e^{tN}=I+tN=\begin{pmatrix}1&t\\0&1\end{pmatrix}.
$$
掛け算を直接行うと $D(s)D(t)=I+(s+t)N+stN^2=I+(s+t)N=D(s+t)$ で、$D(0)=I$、行列式は1です。最後に $D'(t)=N$ なので $D'(0)=N=\rho(1)$ です。
<!-- solution-end -->

<a id="ex-lrep3-a02"></a>
#### LREP3-A02 交換しない生成子を見抜く
- Level: A
- ID: LREP3-A02

可換な Lie 環 $\mathbb R^2$ の基底 $e_1,e_2$ について、$A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$、$B=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ を $\rho(e_1)=A,\ \rho(e_2)=B$ と割り当てる。これは Lie 環表現か。定義から判定せよ。

<!-- solution-start -->
**詳細解答。** 実線形に延長することはできますが、$[e_1,e_2]=0$ なので必要条件は $[A,B]=0$ です。行列を掛けると
$$
AB=\begin{pmatrix}0&1\\0&0\end{pmatrix}=B,\qquad
BA=\begin{pmatrix}0&0\\0&0\end{pmatrix}.
$$
従って $[A,B]=B\ne0=\rho([e_1,e_2])$ であり Lie 環表現ではありません。指数化しても $(s,0)$ と $(0,t)$ の像は一般には可換しないため、加法群 $\mathbb R^2$ の群表現は得られません。
<!-- solution-end -->

<a id="ex-lrep3-a03"></a>
#### LREP3-A03 円周での降下条件
- Level: A
- ID: LREP3-A03

$\rho_\lambda(xJ)=i\lambda x$ を $SO(2)$ の Lie 環の1次元複素表現とする。$\lambda=3$ と $\lambda=1/2$ について $\mathbb R$ 上への積分を求め、$SO(2)$ に降下するか調べよ。

<!-- solution-start -->
**詳細解答。** $R_\theta=e^{\theta J}$ の被覆群は $(\mathbb R,+)$ なので、指数公式から $\widetilde D_\lambda(\theta)=e^{i\lambda\theta}$ です。被覆の核 $2\pi\mathbb Z$ で恒等的に1になる条件を判定します。$\lambda=3$ なら $\widetilde D_3(2\pi k)=e^{6\pi ik}=1$ なので降下し、$D_3(R_\theta)=e^{3i\theta}$ と書けます。$\lambda=1/2$ なら $\widetilde D_{1/2}(2\pi)=-1$ です。$R_0=R_{2\pi}=I$ に異なる値を与えるため降下しません。
<!-- solution-end -->

<a id="ex-lrep3-a04"></a>
#### LREP3-A04 基底変更と微分
- Level: A
- ID: LREP3-A04

$D:G\to GL_{\mathbb C}(V)$ を滑らかな表現、$S\in GL_{\mathbb C}(V)$ を固定した可逆線形写像とする。$E(g)=SD(g)S^{-1}$ の微分を求め、二つの Lie 環表現の交換子条件が同値であることを確かめよ。

<!-- solution-start -->
**詳細解答。** $E(gh)=SD(g)D(h)S^{-1}=(SD(g)S^{-1})(SD(h)S^{-1})=E(g)E(h)$、$E(e)=I$ です。定数の $S,S^{-1}$ は微分の外へ出せるので
$$
dE_e(X)=S\,dD_e(X)\,S^{-1}.
$$
$A=dD_e(X)$、$B=dD_e(Y)$ とすれば
$$
[SAS^{-1},SBS^{-1}]
=SABS^{-1}-SBAS^{-1}
=S[A,B]S^{-1}.
$$
[微分表現の括弧保存](#thm-lrep3-differentiation)により、これは $S\,dD_e([X,Y])\,S^{-1}=dE_e([X,Y])$ です。従って基底変更は Lie 環表現の条件を保ちます。
<!-- solution-end -->

### Level B

<a id="ex-lrep3-b01"></a>
#### LREP3-B01 二次元アフィン Lie 環の積分
- Level: B
- ID: LREP3-B01

$\mathfrak g$ を実基底 $H,E$ と関係 $[H,E]=E$ を持つ二次元 Lie 環とする。$A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$、$N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ と置く。

1. $\rho(H)=A,\rho(E)=N$ が Lie 環表現であることを示せ。
2. $G=\left\{\begin{pmatrix}a&b\\0&1\end{pmatrix}:a>0,\ b\in\mathbb R\right\}$ 上の標準行列表現 $D(g)=g$ を考え、微分が $\rho$ になることを示せ。
3. 群の積と指数曲線の整合を $H,E$ について検算せよ。

<!-- solution-start -->
**詳細解答。** (1) $AN=N$、$NA=0$ なので $[A,N]=N=\rho([H,E])$ です。実双線形性と交代性から任意の $xH+yE$ に対する括弧条件も従います。

(2) $G$ の行列積は
$$
\begin{pmatrix}a&b\\0&1\end{pmatrix}
\begin{pmatrix}c&d\\0&1\end{pmatrix}
=\begin{pmatrix}ac&ad+b\\0&1\end{pmatrix}.
$$
結果の左上成分 $ac$ は正なので $G$ は群で、$D(gh)=D(g)D(h)$ です。単位元での接空間は $\begin{pmatrix}x&y\\0&0\end{pmatrix}=xA+yN$ なので、標準表現の微分は $dD_e(xA+yN)=xA+yN$ です。$H$ と $E$ をそれぞれ $A,N$ に同定すると $\rho$ になります。

(3) 行列指数を計算すると
$$
e^{tA}=\begin{pmatrix}e^t&0\\0&1\end{pmatrix},
\qquad
e^{sN}=\begin{pmatrix}1&s\\0&1\end{pmatrix}.
$$
これらは $G$ に入り、$D(\exp_G(tH))=e^{tA}$、$D(\exp_G(sE))=e^{sN}$ です。さらに
$$
e^{tA}e^{sN}e^{-tA}
=\begin{pmatrix}1&e^ts\\0&1\end{pmatrix}
=e^{(e^ts)N}.
$$
この共役の $t=0$ での微分が $[A,N]=N$ を再現し、群と Lie 環の計算が一致します。
<!-- solution-end -->

<a id="ex-lrep3-b02"></a>
#### LREP3-B02 二重被覆で何が降下するか
- Level: B
- ID: LREP3-B02

$\pi:SU(2)\to SO(3)$ が核 $\{\pm I_2\}$ を持つ二重被覆であることを用いてよい。$SU(2)$ 上の (i) 標準表現 $D_{\mathrm{std}}(U)=U$ と (ii) 複素化した随伴表現 $D_{\mathrm{ad}}(U)(X)=UXU^{-1}$（$X\in\mathfrak{su}(2)\otimes_\mathbb R\mathbb C$）が $SO(3)$ へ降下するか判定せよ。

<!-- solution-start -->
**詳細解答。** [被覆核による降下判定](#thm-lrep3-descent-criterion)を使います。(i) $\ker\pi$ の元 $-I_2$ は $\mathbb C^2$ に $-I_2$ として作用し、恒等写像ではありません。従って降下しません。

(ii) $\operatorname{Ad}_{-I_2}(X)=(-I_2)X(-I_2)^{-1}=X$ です。また $\operatorname{Ad}_{I_2}$ も恒等写像なので、核の全ての元に対して恒等的に作用します。従って随伴表現は降下します。どちらも Lie 環への微分は正しい Lie 環表現ですが、元の $SO(3)$ への降下可能性は異なります。
<!-- solution-end -->

<a id="ex-lrep3-b03"></a>
#### LREP3-B03 平坦性とホモトピーの微分計算
- Level: B
- ID: LREP3-B03

$\alpha$ を行列値1形式とし、$d\alpha+\alpha\wedge\alpha=0$ とする。$c(s,t)$ に対して $A=\alpha(\partial_t c)$、$B=\alpha(\partial_s c)$ とする。

1. 平坦性から $\partial_tB=\partial_sA+[B,A]$ を導け。
2. $\partial_tU=UA,\ U(s,0)=I$ の解に $C=U^{-1}\partial_sU$ を定義し、$C$ が同じ微分方程式を満たすことを示せ。
3. $c(s,0),c(s,1)$ が一定なら $U(s,1)$ が $s$ に依存しないことを示せ。

<!-- solution-start -->
**詳細解答。** (1) $c^*\alpha=A\,dt+B\,ds$ です。$(\partial_s,\partial_t)$ に評価すれば
$$
d\alpha(\partial_s c,\partial_t c)=\partial_sA-\partial_tB,\quad
(\alpha\wedge\alpha)(\partial_s c,\partial_t c)=BA-AB.
$$
よって $0=\partial_sA-\partial_tB+BA-AB$ から主張が従います。

(2) $C=U^{-1}U_s$ を微分し、$(U^{-1})_t=-U^{-1}U_tU^{-1}=-AU^{-1}$ を使うと
$$
C_t=-AC+U^{-1}(U_sA+UA_s)
=-AC+CA+A_s=A_s+[C,A].
$$
(3) 始点が一定なら $B(s,0)=0$ かつ $U(s,0)=I$ から $C(s,0)=0$ です。(1),(2) の差 $C-B$ は初期値0で同じ同次線形 ODE を満たすので $C=B$。終点一定なら $B(s,1)=0$、従って $U_s(s,1)=U(s,1)C(s,1)=0$ です。これが経路変形による値の不変性です。
<!-- solution-end -->

<a id="ex-lrep3-b04"></a>
#### LREP3-B04 トーラスの二つの周期
- Level: B
- ID: LREP3-B04

$G=SO(2)\times SO(2)$ の Lie 環 $\mathbb R^2$ から1次元複素空間への $\rho(x,y)=i(\lambda x+\mu y)$（$\lambda,\mu\in\mathbb R$）を考える。被覆 $(\mathbb R^2,+)\to G$ への積分を求め、$G$ 上への降下条件を必要十分に示せ。

<!-- solution-start -->
**詳細解答。** $\mathbb R^2$ は可換なので $\rho$ は実線形で括弧を保ちます。[単連結群への積分](#thm-lrep3-integration)によって
$$
\widetilde D(s,t)=e^{i(\lambda s+\mu t)}.
$$
被覆の核は $(2\pi\mathbb Z)^2$ です。[降下判定](#thm-lrep3-descent-criterion)より全ての整数 $k,\ell$ に対し
$$
\widetilde D(2\pi k,2\pi\ell)
=e^{2\pi i(\lambda k+\mu\ell)}=1
$$
が必要十分です。$k=1,\ell=0$ と $k=0,\ell=1$ を代入すると $\lambda,\mu\in\mathbb Z$ が必要です。逆に双方が整数なら任意の $k,\ell$ に対して指数は整数倍の $2\pi i$ なので1です。二つの周期はそれぞれ独立に検査する必要があります。
<!-- solution-end -->

### Level C

<a id="ex-lrep3-c01"></a>
#### LREP3-C01 可換な行列と大域的な降下の総合
- Level: C
- ID: LREP3-C01

$G=SO(2)\times(\mathbb R,+)$ とし、被覆群 $\widetilde G=\mathbb R^2$ の座標を $(\theta,t)$ とする。$V=\mathbb C^2$、$A=\operatorname{diag}(i\lambda,i\mu)$、$N=\begin{pmatrix}0&1\\0&0\end{pmatrix}$ として、$\rho(x,y)=xA+yN$（$x,y\in\mathbb R$）を考える。

1. $\rho$ が Lie 環表現になる $\lambda,\mu$ の条件を導け。
2. その条件の下で $\widetilde G$ 上の群表現 $\widetilde D(\theta,t)$ を求めよ。
3. $G$ への降下条件を導き、得られる表現が既約か可約か判定せよ。

<!-- solution-start -->
**詳細解答。** (1) $\widetilde G$ の Lie 環は可換なので、必要十分条件は $[A,N]=0$ です。積を求めると
$$
AN=\begin{pmatrix}0&i\lambda\\0&0\end{pmatrix},
\qquad
NA=\begin{pmatrix}0&i\mu\\0&0\end{pmatrix}.
$$
従って $[A,N]=i(\lambda-\mu)N$ で、$\lambda=\mu$ が必要十分です。

(2) $a=\lambda=\mu$ と書けば $A=iaI_2$ は $N$ と可換し、$N^2=0$ です。指数行列を級数で計算すると
$$
\begin{aligned}
\widetilde D(\theta,t)
&=e^{\theta A+tN}
=e^{ia\theta I_2}e^{tN}\\
&=e^{ia\theta}
\begin{pmatrix}1&t\\0&1\end{pmatrix}.
\end{aligned}
$$
二つの因子が可換するため、$\widetilde D(\theta,t)\widetilde D(\phi,s)=e^{ia(\theta+\phi)}(I+(t+s)N)=\widetilde D(\theta+\phi,t+s)$ です。また微分で $\rho$ を回復します。

(3) 被覆の核は $\{(2\pi k,0):k\in\mathbb Z\}$ です。そこで
$$
\widetilde D(2\pi k,0)=e^{2\pi iak}I_2
$$
が全ての $k$ で $I_2$ となる条件は $a\in\mathbb Z$ です。このとき
$$
D(R_\theta,t)=e^{ia\theta}\begin{pmatrix}1&t\\0&1\end{pmatrix}
$$
は代表角の選択によらない $G$ 表現です。直線 $\mathbb Ce_1$ は全ての行列で不変なので、この表現は可約です。ただし $t$ の上三角作用が残るため不変補直線はなく、完全可約ではありません。実際 $e_2+ce_1$ の張る直線を $D(I,1)$ が保つなら、第二成分から比例係数は1、第一成分から $c+1=c$ となって矛盾します。これは[LREP1の非分裂な上三角表現](../LREP1/index.md#prop-lrep1-nonsplit)と同じ障害です。従って「Lie 環表現の成立」「被覆からの降下」「完全可約性」は互いに別の判定です。
<!-- solution-end -->

## 7. まとめと次講

滑らかな群表現は [微分定理](#thm-lrep3-differentiation)によって Lie 環表現を与えます。逆向きには [Maurer–Cartan 方程式](../../LIE/LIE4/index.md#thm-lie4-maurer-cartan-equation)と行列 ODE を使い、[単連結群では一意に積分](#thm-lrep3-integration)できます。一般の連結群では [被覆の核で恒等的に作用する条件](#thm-lrep3-descent-criterion)が追加されます。

次の LREP4 では、すでに得た群表現を直和・テンソル積・双対で組み合わせ、それぞれを Lie 環レベルでも扱えるようにします。
