# LIE2 1パラメータ部分群・exp・随伴表現

<!-- definition-example-audit: strict -->

[LIE1](../LIE1/index.md) では、Lie 群の単位元の接空間
$$
\mathfrak g=T_eG
$$
に Lie 環構造が入り、各
$$
X\in\mathfrak g
$$
が一意な左不変ベクトル場へ延長されることを示しました。

しかし接ベクトルはまだ「単位元での瞬間的な速度」です。本章では、その速度を実際の群の曲線へ積分します。

主線は
$$
X\in\mathfrak g
\longrightarrow
\text{左不変ベクトル場}
\longrightarrow
\text{1パラメータ部分群}
\longrightarrow
\exp X
\longrightarrow
\operatorname{Ad}
\longrightarrow
\operatorname{ad}
\longrightarrow
[X,Y]
$$
です。

[GRP3](../GRP3/index.md#def-grp3-conjugation) の共役作用は集合上の群作用として導入済みです。本章ではそれを滑らかな Lie 群自己同型として微分します。また [ODE4](../ODE4/index.md#def-ode4-nonlinear-autonomous-system) の自律系の見方と、LIE1 の前提である [GEO5](../GEO5/index.md) の積分曲線・流れを使って、接ベクトルから大域的な曲線を構成します。

> **この章の停止線**
>
> Lie 部分群と閉部分群定理、古典群の体系的な Lie 環計算は LIE3 へ送ります。Lie 群作用・軌道・等質空間・Maurer--Cartan 形式は LIE4 へ送ります。一般表現論、半単純 Lie 環、root system、最高ウェイト理論は本系列のさらに後続です。Baker--Campbell--Hausdorff 公式は、本章では Lie 括弧が最初の非可換補正として現れる機構までを扱い、一般の収束公式を証明済みの道具としては使いません。

---

## 1. 実数を群の中の曲線として入れる

<a id="def-lie2-one-parameter-subgroup"></a>
<!-- formal-statement-start -->
> **定義（1パラメータ部分群）**
>
> Lie 群 $G$ に対し、滑らかな Lie 群準同型
>
$$
\gamma:(\mathbb R,+)\to G
$$
>
> を $G$ の **1パラメータ部分群**という。
>
> すなわち
>
$$
\gamma(0)=e,
\qquad
\gamma(s+t)=\gamma(s)\gamma(t)
$$
>
> が全ての $s,t\in\mathbb R$ で成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie2-one-parameter-subgroup -->
**定義の確認**

### 1.1 加法 Lie 群

$G=(\mathbb R^n,+)$ とし、$v\in\mathbb R^n$ を固定します。

$$
\gamma_v(t)=tv
$$
と置くと
$$
\gamma_v(s+t)
=(s+t)v
=sv+tv
=\gamma_v(s)+\gamma_v(t).
$$

また $\gamma_v$ は滑らかです。従って
$$
\boxed{\gamma_v(t)=tv}
$$
は1パラメータ部分群です。

### 1.2 正の実数の乗法群

$G=\mathbb R_{>0}$ とし、$a\in\mathbb R$ を固定します。

$$
\gamma_a(t)=e^{at}
$$
と置けば
$$
\gamma_a(s+t)
=e^{a(s+t)}
=e^{as}e^{at}
=\gamma_a(s)\gamma_a(t).
$$

従って
$$
\boxed{\gamma_a(t)=e^{at}}
$$
も1パラメータ部分群です。

この二例では、同じ実数パラメータ $t$ が、加法群では直線、乗法群では指数曲線として現れます。
<!-- definition-example-end -->

1パラメータ部分群は群準同型なので
$$
\gamma(-t)=\gamma(t)^{-1}.
$$

したがって正の時刻だけでなく、負の時刻も群の逆元によって自動的に決まります。

---

## 2. 1パラメータ部分群を微分すると左不変ベクトル場が現れる

$\gamma$ を1パラメータ部分群とし、
$$
X:=\gamma'(0)\in T_eG=\mathfrak g
$$
と置きます。

準同型性から
$$
\gamma(t+h)=\gamma(t)\gamma(h)
=L_{\gamma(t)}(\gamma(h)).
$$

$h=0$ で微分すると
$$
\gamma'(t)
=
d(L_{\gamma(t)})_e(\gamma'(0)).
$$

[LIE1 の左不変ベクトル場](../LIE1/index.md#thm-lie1-left-invariant-evaluation)を使えば、右辺は $X$ に対応する左不変ベクトル場
$$
X^L_g:=d(L_g)_eX
$$
の $\gamma(t)$ における値です。

従って
$$
\boxed{
\gamma'(t)=X^L_{\gamma(t)}
}.
$$

つまり、1パラメータ部分群は左不変ベクトル場の積分曲線です。

ここで重要なのは、準同型性が曲線全体を初速度一つへ圧縮していることです。

---

## 3. 左不変ベクトル場はなぜ全時間で流れるのか

一般の滑らかなベクトル場は完備とは限りません。[GEO5](../GEO5/index.md#def-geo5-complete-vector-field) の例
$$
x^2\frac{\partial}{\partial x}
$$
は有限時刻で無限遠へ逃げます。

一方、Lie 群上の左不変ベクトル場には群の左移動があります。この対称性が有限時刻での停止を防ぎます。

<a id="thm-lie2-one-parameter-classification"></a>
<!-- formal-statement-start -->
> **定理（1パラメータ部分群と単位元接ベクトルの一対一対応）**
>
> $G$ を Lie 群、$\mathfrak g=T_eG$ とする。
>
> 任意の $X\in\mathfrak g$ に対し、
>
$$
\gamma_X(0)=e,
\qquad
\gamma_X'(0)=X
$$
>
> を満たす1パラメータ部分群
>
$$
\gamma_X:\mathbb R\to G
$$
>
> が一意に存在する。
>
> したがって
>
$$
\{\text{1パラメータ部分群 }\mathbb R\to G\}
\longleftrightarrow
\mathfrak g,
\qquad
\gamma\longmapsto\gamma'(0)
$$
>
> は一対一対応である。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ を LIE1 で左不変ベクトル場 $X^L$ へ延長し、その単位元を通る最大積分曲線を $\gamma$ とします。

局所的には ODE の一意性から
$$
\gamma(s+t)=\gamma(s)\gamma(t)
$$
が出ます。

次に、単位元近くで存在する短い曲線を左移動すれば、どの時刻の終点からも同じ長さだけ先へ進めます。したがって有限端点で最大積分曲線が止まることはできません。

これが左不変性から完備性が出る核心です。

<!-- proof-start -->
### 証明

$X\in\mathfrak g$ を固定し、[LIE1 の評価同型](../LIE1/index.md#thm-lie1-left-invariant-evaluation)により
$$
X^L_g=d(L_g)_eX
$$
という左不変ベクトル場を取ります。

[GEO5 の最大積分曲線の存在・一意性](../GEO5/index.md#thm-geo5-maximal-integral-curve)から、単位元を通る最大積分曲線
$$
\gamma:I\to G,
\qquad
\gamma(0)=e
$$
が存在します。$I$ は0を含む開区間です。

まず局所群則を示します。

$s\in I$ を固定し、$t$ が0の近くで $s+t\in I$ となる範囲を考えます。

曲線
$$
\eta(t):=\gamma(s)\gamma(t)
=L_{\gamma(s)}(\gamma(t))
$$
を微分すると
$$
\eta'(t)
=
d(L_{\gamma(s)})_{\gamma(t)}(\gamma'(t)).
$$

$\gamma$ は $X^L$ の積分曲線なので
$$
\gamma'(t)=X^L_{\gamma(t)}.
$$

左不変性から
$$
d(L_{\gamma(s)})_{\gamma(t)}
(X^L_{\gamma(t)})
=
X^L_{\gamma(s)\gamma(t)}.
$$

従って $\eta$ も $X^L$ の積分曲線です。

また
$$
\eta(0)=\gamma(s)e=\gamma(s).
$$

一方
$$
t\longmapsto\gamma(s+t)
$$
も $t=0$ で $\gamma(s)$ を通る $X^L$ の積分曲線です。

積分曲線の一意性から、共通して定義される範囲で
$$
\boxed{
\gamma(s+t)=\gamma(s)\gamma(t)
}
$$
が成り立ちます。

次に $I=\mathbb R$ を示します。

局所存在により、ある $\varepsilon>0$ が存在して
$$
(-\varepsilon,\varepsilon)\subset I.
$$

もし $I$ の右端が有限値 $b$ なら、$s\in I$ を
$$
b-\frac{\varepsilon}{2}<s<b
$$
となるように取れます。

$s$ の近くでは
$$
t\longmapsto\gamma(s)\gamma(t-s)
$$
により、$X^L$ の積分曲線を
$$
s-\varepsilon<t<s+\varepsilon
$$
へ定義できます。

この曲線は $t=s$ で $\gamma(s)$ を通り、既存の $\gamma$ と重なる区間では一意性により一致します。

しかし
$$
s+\varepsilon>b
$$
なので、これは最大積分曲線を右へ延長してしまい、$b$ が最大定義域の端点であることに反します。

従って右端は $+\infty$ です。

左端についても同じ議論を時間反転して行えば $-\infty$ です。よって
$$
I=\mathbb R.
$$

局所群則は、任意の $s$ について二つの全実数上の積分曲線
$$
t\longmapsto\gamma(s+t),
\qquad
t\longmapsto\gamma(s)\gamma(t)
$$
が $t=0$ で同じ点を通ることから、再び一意性により全ての $t$ で成立します。

したがって $\gamma$ は1パラメータ部分群です。

初速度は
$$
\gamma'(0)=X^L_e=X.
$$

一意性について、別の1パラメータ部分群 $\widetilde\gamma$ が同じ初速度 $X$ を持つとします。§2より $\widetilde\gamma$ も $X^L$ の積分曲線で、$t=0$ で $e$ を通ります。積分曲線の一意性から
$$
\widetilde\gamma=\gamma.
$$

従って対応は一対一です。$\square$
<!-- proof-end -->

この定理から、**Lie 群上の左不変ベクトル場は全て完備**です。

一般の滑らかなベクトル場との違いは、局所解を左移動してどの点からでも同じ形で再開できることです。

---

## 4. 接ベクトルを「時刻1まで流す」

<a id="def-lie2-exponential-map"></a>
<!-- formal-statement-start -->
> **定義（Lie 群の指数写像）**
>
> $G$ を Lie 群、$\mathfrak g=T_eG$ とする。
>
> $X\in\mathfrak g$ に対応する一意な1パラメータ部分群を $\gamma_X$ とするとき、
>
$$
\exp_G:\mathfrak g\to G,
\qquad
\exp_G(X):=\gamma_X(1)
$$
>
> を **Lie 群の指数写像**といい、$\exp_G$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie2-exponential-map -->
**定義の確認**

### 4.1 加法群

$G=(\mathbb R^n,+)$ では
$$
\gamma_X(t)=tX.
$$

従って
$$
\boxed{
\exp_{\mathbb R^n}(X)=X
}.
$$

### 4.2 正の実数の乗法群

$G=\mathbb R_{>0}$ では
$$
\gamma_a(t)=e^{at}.
$$

従って
$$
\boxed{
\exp_{\mathbb R_{>0}}(a)=e^a
}.
$$

通常の実指数関数は Lie 群の指数写像の最も基本的な例です。
<!-- definition-example-end -->

<a id="thm-lie2-exponential-basic"></a>
<!-- formal-statement-start -->
> **定理（Lie 群の指数写像の基本性質）**
>
> 任意の $X\in\mathfrak g$ と $s,t\in\mathbb R$ に対して
>
$$
\gamma_X(t)=\exp_G(tX)
$$
>
> であり、
>
$$
\exp_G((s+t)X)
=
\exp_G(sX)\exp_G(tX).
$$
>
>
> 特に
>
$$
\exp_G(0)=e,
\qquad
\exp_G(-X)=\exp_G(X)^{-1}.
$$
>
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\gamma_X$ を $X$ に対応する1パラメータ部分群とします。

固定した $t$ に対し
$$
\eta_t(s):=\gamma_X(ts)
$$
と置きます。

$\eta_t$ は
$$
\eta_t(s+r)
=
\gamma_X(t(s+r))
=
\gamma_X(ts)\gamma_X(tr)
=
\eta_t(s)\eta_t(r)
$$
を満たすので1パラメータ部分群です。

初速度は
$$
\eta_t'(0)
=
t\gamma_X'(0)
=
tX.
$$

[1パラメータ部分群と単位元接ベクトルの一対一対応](#thm-lie2-one-parameter-classification)から、$\eta_t$ は $tX$ に対応する1パラメータ部分群です。

従って時刻1で
$$
\exp_G(tX)
=
\eta_t(1)
=
\gamma_X(t).
$$

あとは $\gamma_X$ の準同型性から
$$
\exp_G((s+t)X)
=
\gamma_X(s+t)
=
\gamma_X(s)\gamma_X(t)
=
\exp_G(sX)\exp_G(tX).
$$

$t=0,-1$ を代入すれば残りも従います。$\square$
<!-- proof-end -->

注意すべき点があります。

一般の $X,Y\in\mathfrak g$ について
$$
\exp(X+Y)=\exp(X)\exp(Y)
$$
とは限りません。

これは右辺の積が非可換であり得るからです。後半で、そのずれの最初の項が Lie 括弧によって測られることを見ます。

---

## 5. Lie 群の指数写像は滑らかで、0の近くでは座標になる

Lie 群の指数写像を後で微分するためには、滑らかさが必要です。

「各 $X$ ごとに積分曲線がある」だけでは、$X$ を変えたとき終点が滑らかに変わることはまだ自動ではありません。そこで全ての $X$ を一つの滑らかなベクトル場へまとめます。

<a id="thm-lie2-exponential-local-diffeomorphism"></a>
<!-- formal-statement-start -->
> **定理（Lie 群の指数写像の滑らかさと単位元近傍での局所可逆性）**
>
> Lie 群 $G$ の指数写像
>
$$
\exp_G:\mathfrak g\to G
$$
>
> は滑らかである。
>
> また
>
$$
d(\exp_G)_0
=
\operatorname{id}_{\mathfrak g}.
$$
>
>
> 従って0のある開近傍 $U\subset\mathfrak g$ と $e$ のある開近傍 $V\subset G$ が存在し、
>
$$
\exp_G|_U:U\to V
$$
>
> は微分同相写像である。
<!-- formal-statement-end -->

### 証明の見取り図

$\mathfrak g\times G$ 上に
$$
\widetilde X_{(A,g)}
=
(0,d(L_g)_eA)
$$
という滑らかなベクトル場を置きます。

第一成分 $A$ は流れの間ずっと固定され、第二成分は $A$ に対応する左不変ベクトル場の流れです。

前節で左不変ベクトル場が完備と分かったので、この一つの滑らかなベクトル場の時刻1の流れから $\exp$ を取り出せます。

<!-- proof-start -->
### 証明

積多様体
$$
\mathfrak g\times G
$$
を考えます。

各 $(A,g)$ に対して
$$
\widetilde X_{(A,g)}
=
\left(
0,\ d(L_g)_eA
\right)
$$
と定めます。

群の乗法
$$
m:G\times G\to G
$$
は滑らかです。$d(L_g)_eA$ は $m$ の第二変数方向の微分なので、局所座標で見れば $g$ と $A$ に滑らかに依存します。

従って $\widetilde X$ は滑らかなベクトル場です。

初期点 $(A,e)$ から出る積分曲線は
$$
t\longmapsto
(A,\gamma_A(t)).
$$

第一成分は一定で、第二成分は $A$ に対応する左不変ベクトル場の積分曲線だからです。

前節で左不変ベクトル場は完備と示したので、この積分曲線は全ての $t\in\mathbb R$ で存在します。同じことが任意の初期点 $(A,g)$ に対して左移動した曲線
$$
(A,g\gamma_A(t))
$$
で成り立つため、$\widetilde X$ 自身も完備です。

[GEO5 の最大流の滑らかさ](../GEO5/index.md#thm-geo5-maximal-flow)から、その流れ
$$
\widetilde\Phi_t(A,g)
=
(A,g\gamma_A(t))
$$
は $(t,A,g)$ の滑らかな関数です。

特に
$$
\exp_G(A)
=
\operatorname{pr}_G
\left(
\widetilde\Phi_1(A,e)
\right)
$$
なので $\exp_G$ は滑らかです。

次に微分を求めます。

$A\in\mathfrak g=T_0\mathfrak g$ を接ベクトルとみなし、$\mathfrak g$ 内の曲線
$$
c(t)=tA
$$
を取ります。

[Lie 群の指数写像の基本性質](#thm-lie2-exponential-basic)から
$
\exp_G(c(t))
=
\exp_G(tA)
=
\gamma_A(t).
$$

従って
$$
d(\exp_G)_0(A)
=
\left.
\frac{d}{dt}
\right|_{t=0}
\exp_G(tA)
=
\gamma_A'(0)
=
A.
$$

任意の $A$ で成り立つので
$$
d(\exp_G)_0
=
\operatorname{id}_{\mathfrak g}.
$$

この微分は線形同型です。

[逆関数定理](../RA6A/index.md#thm-ra6a-inverse-function)を $\exp_G$ の0へ適用すると、0の近傍 $U$ と $e$ の近傍 $V$ が存在し、
$$
\exp_G|_U:U\to V
$$
は微分同相写像です。$\square$
<!-- proof-end -->

この局所逆写像を
$$
\log_G:V\to U
$$
と書くことがあります。

ただし $\exp_G$ が大域的に単射・全射とは限りません。局所微分同相性は、あくまで0と単位元の近くの主張です。

---

## 6. Lie 群準同型は Lie 群の指数写像と可換する

<a id="thm-lie2-exponential-naturality"></a>
<!-- formal-statement-start -->
> **定理（Lie 群準同型と Lie 群の指数写像の自然性）**
>
> $\Phi:G\to H$ を Lie 群準同型とする。
>
> 単位元での微分を
>
$$
d\Phi_e:\mathfrak g\to\mathfrak h
$$
>
> とすると、全ての $X\in\mathfrak g$ に対して
>
$$
\boxed{
\Phi(\exp_G X)
=
\exp_H(d\Phi_eX)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$X\in\mathfrak g$ を固定し、
$$
\gamma_X(t)=\exp_G(tX)
$$
とします。

合成
$$
\eta(t):=\Phi(\gamma_X(t))
$$
を考えます。

$\Phi$ と $\gamma_X$ はどちらも Lie 群準同型なので
$$
\eta(s+t)
=
\eta(s)\eta(t).
$$

また滑らかな写像の合成なので $\eta$ は滑らかです。従って $\eta$ は $H$ の1パラメータ部分群です。

初速度は連鎖律から
$$
\eta'(0)
=
d\Phi_e(\gamma_X'(0))
=
d\Phi_eX.
$$

1パラメータ部分群の一意性により
$$
\eta(t)
=
\exp_H(t\,d\Phi_eX).
$$

$t=1$ と置けば
$$
\Phi(\exp_GX)
=
\exp_H(d\Phi_eX).
$$

$\square$
<!-- proof-end -->

この定理は後で共役自己同型へそのまま適用します。

---

## 7. 一般線形群では Lie 群の指数写像は行列指数に一致する

行列指数そのものは [ODE3](../ODE3/index.md#def-ode3-matrix-exponential) で
$$
e^{tA}
=
\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}
$$
として構成済みです。また [ODE3 の行列指数の基本性質](../ODE3/index.md#thm-ode3-matrix-exponential-properties)で、級数の収束、項別微分、時間加法則
$$
e^{(s+t)A}=e^{sA}e^{tA}
$$
まで証明済みです。

ここではそれを再証明せず、「ODE の行列指数」と「Lie 群の指数写像」が同じ対象であることを閉じます。

<a id="thm-lie2-general-linear-exponential"></a>
<!-- formal-statement-start -->
> **定理（一般線形群では Lie 群の指数写像が行列指数に一致する）**
>
> $G=GL(n,\mathbb R)$ とし、
>
$$
\mathfrak g=\mathfrak{gl}(n,\mathbb R)=M_n(\mathbb R)
$$
>
> と同一視する。
>
> このとき任意の $A\in M_n(\mathbb R)$ について
>
$$
\boxed{
\exp_G(A)
=
e^A
=
\sum_{k=0}^{\infty}\frac{A^k}{k!}
}
$$
>
> である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[ODE3 の行列指数の基本性質](../ODE3/index.md#thm-ode3-matrix-exponential-properties)から
$$
E_A(t):=e^{tA}
$$
は滑らかで、
$$
E_A(0)=I,
\qquad
E_A(s+t)=E_A(s)E_A(t)
$$
を満たします。

特に
$$
E_A(t)E_A(-t)=I
$$
なので
$$
E_A(t)\in GL(n,\mathbb R)
$$
です。従って
$$
t\longmapsto E_A(t)
$$
は $GL(n,\mathbb R)$ の1パラメータ部分群です。

同じ ODE3 の定理から
$$
\frac d{dt}e^{tA}=Ae^{tA}
$$
なので
$$
E_A'(0)=A.
$$

[1パラメータ部分群と単位元接ベクトルの一対一対応](#thm-lie2-one-parameter-classification)により、初速度 $A$ を持つ1パラメータ部分群は一意です。

従って
$$
E_A(t)=\exp_G(tA).
$$

$t=1$ と置けば
$$
\boxed{\exp_G(A)=e^A}.
$$

$\square$
<!-- proof-end -->

### 7.1 対角行列

$$
A=
\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
$$
なら
$$
\boxed{
e^A
=
\operatorname{diag}(e^{\lambda_1},\ldots,e^{\lambda_n})
}.
$$

### 7.2 可換するときだけ和が積に分かれる

$AB=BA$ なら二項展開が使えるため
$$
e^{A+B}=e^Ae^B.
$$

非可換なら一般には成立しません。

この失敗を系統的に補正するのが Baker--Campbell--Hausdorff 理論です。

---

## 8. 共役作用を滑らかな自己同型として見る

[GRP3 の共役作用](../GRP3/index.md#def-grp3-conjugation)では
$$
h\longmapsto ghg^{-1}
$$
を群の内部での変換として扱いました。

Lie 群ではこの写像は滑らかです。

<a id="def-lie2-conjugation-automorphism"></a>
<!-- formal-statement-start -->
> **定義（共役自己同型）**
>
> $G$ を Lie 群、$g\in G$ とする。
>
>
$$
C_g:G\to G,
\qquad
C_g(h)=ghg^{-1}
$$
>
> を $g$ による **共役自己同型**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie2-conjugation-automorphism -->
**定義の確認**

$C_g$ は群準同型です。実際、
$$
\begin{aligned}
C_g(h_1h_2)
&=
gh_1h_2g^{-1}\\
&=
(gh_1g^{-1})(gh_2g^{-1})\\
&=
C_g(h_1)C_g(h_2).
\end{aligned}
$$

また乗法と逆元写像が滑らかなので $C_g$ は滑らかです。

逆写像は
$$
C_{g^{-1}}
$$
です。

従って
$$
\boxed{
C_g\text{ は Lie 群自己同型}
}.
$$
<!-- definition-example-end -->

共役自己同型は単位元を固定します。
$$
C_g(e)=e.
$$

したがって単位元で微分すれば
$$
d(C_g)_e:\mathfrak g\to\mathfrak g
$$
という線形自己同型が得られます。

---

## 9. 随伴表現 Ad は共役を単位元で微分したもの

<a id="def-lie2-adjoint-representation"></a>
<!-- formal-statement-start -->
> **定義（随伴表現）**
>
> $G$ を Lie 群、$\mathfrak g=T_eG$ とする。
>
> 各 $g\in G$ に対して
>
$$
\operatorname{Ad}_g
:=
d(C_g)_e
\in GL(\mathfrak g)
$$
>
> と定める。
>
> 写像
>
$$
\operatorname{Ad}:G\to GL(\mathfrak g),
\qquad
g\mapsto\operatorname{Ad}_g
$$
>
> を $G$ の **随伴表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie2-adjoint-representation -->
**定義の確認：一般線形群**

$G=GL(n,\mathbb R)$ とします。

$g\in G$ を固定すると
$$
C_g(h)=ghg^{-1}.
$$

単位行列 $I$ を通る曲線
$$
h(t)=I+tA
$$
を取ると
$$
h'(0)=A.
$$

よって
$$
C_g(h(t))
=
g(I+tA)g^{-1}
=
I+t\,gAg^{-1}.
$$

$t=0$ で微分して
$$
\boxed{
\operatorname{Ad}_g(A)
=
gAg^{-1}
}.
$$

つまり一般線形群では随伴表現も文字通り行列の共役です。
<!-- definition-example-end -->

<a id="thm-lie2-adjoint-homomorphism"></a>
<!-- formal-statement-start -->
> **定理（随伴表現の準同型性）**
>
> $G$ を Lie 群とする。
>
> 随伴表現
>
$$
\operatorname{Ad}:G\to GL(\mathfrak g)
$$
>
> は滑らかな Lie 群準同型であり、
>
$$
\operatorname{Ad}_{gh}
=
\operatorname{Ad}_g\operatorname{Ad}_h,
\qquad
\operatorname{Ad}_{g^{-1}}
=
\operatorname{Ad}_g^{-1}
$$
>
> が成り立つ。
>
> さらに各 $\operatorname{Ad}_g$ は Lie 環自己同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず共役写像の合成を計算します。

任意の $x\in G$ に対して
$$
\begin{aligned}
(C_g\circ C_h)(x)
&=
g(hxh^{-1})g^{-1}\\
&=
(gh)x(gh)^{-1}\\
&=
C_{gh}(x).
\end{aligned}
$$

従って
$$
C_{gh}=C_g\circ C_h.
$$

単位元で微分し、連鎖律を使うと
$$
\operatorname{Ad}_{gh}
=
d(C_g)_e\circ d(C_h)_e
=
\operatorname{Ad}_g\operatorname{Ad}_h.
$$

また
$$
C_{g^{-1}}=C_g^{-1}
$$
なので
$$
\operatorname{Ad}_{g^{-1}}
=
\operatorname{Ad}_g^{-1}.
$$

次に滑らかさを確認します。

二変数写像
$$
F:G\times G\to G,
\qquad
F(g,h)=ghg^{-1}
$$
は群の乗法と逆元写像の合成なので滑らかです。

局所座標で $F$ を成分表示し、第二変数 $h$ について $h=e$ で微分すると、その Jacobi 行列の各成分は $g$ の滑らかな関数です。

従って
$$
g\longmapsto d(C_g)_e
$$
は滑らかです。

$\mathfrak g$ の基底を一つ選べば $GL(\mathfrak g)$ は $GL(n,\mathbb R)$ と同一視できるため、$\operatorname{Ad}$ は滑らかな Lie 群準同型です。

最後に $C_g:G\to G$ 自身が Lie 群準同型なので、[LIE1 の Lie 群準同型の微分定理](../LIE1/index.md#thm-lie1-homomorphism-differential)から
$$
d(C_g)_e=\operatorname{Ad}_g
$$
は Lie 環準同型です。

可逆でもあるため Lie 環自己同型です。$\square$
<!-- proof-end -->

「表現」という名前ですが、本章では一般表現論を前提にしていません。

ここで使っている事実は単に
$$
\operatorname{Ad}:G\to GL(\mathfrak g)
$$
が滑らかな群準同型だということです。

---

## 10. 共役と Lie 群の指数写像は可換する

<a id="thm-lie2-conjugation-exponential"></a>
<!-- formal-statement-start -->
> **定理（共役と Lie 群の指数写像の可換性）**
>
> 任意の $g\in G$ と $X\in\mathfrak g$ に対して
>
$$
\boxed{
g\exp(X)g^{-1}
=
\exp(\operatorname{Ad}_gX)
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

共役自己同型
$$
C_g:G\to G
$$
へ [Lie 群準同型と Lie 群の指数写像の自然性](#thm-lie2-exponential-naturality)を適用します。

その単位元での微分は定義から
$$
d(C_g)_e=\operatorname{Ad}_g.
$$

従って
$$
C_g(\exp X)
=
\exp(\operatorname{Ad}_gX).
$$

左辺を書き戻せば
$$
g\exp(X)g^{-1}
=
\exp(\operatorname{Ad}_gX).
$$

$\square$
<!-- proof-end -->

特に $GL(n,\mathbb R)$ では
$$
ge^Ag^{-1}
=
e^{gAg^{-1}}.
$$

これは行列級数からも直接確認できますが、上の証明は任意の Lie 群で同じ機構が働くことを示しています。

---

## 11. Ad をさらに微分すると ad が現れる

随伴表現自体も Lie 群準同型です。したがって単位元でさらに微分できます。

<a id="def-lie2-infinitesimal-adjoint"></a>
<!-- formal-statement-start -->
> **定義（無限小随伴作用）**
>
> 随伴表現
>
$$
\operatorname{Ad}:G\to GL(\mathfrak g)
$$
>
> の単位元での微分を
>
$$
\operatorname{ad}
:=
d(\operatorname{Ad})_e:
\mathfrak g
\to
\mathfrak{gl}(\mathfrak g)
$$
>
> と書く。
>
> $X\in\mathfrak g$ に対して
>
$$
\operatorname{ad}_X
:=
\operatorname{ad}(X)
\in\operatorname{End}(\mathfrak g)
$$
>
> と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lie2-infinitesimal-adjoint -->
**定義の確認：一般線形群**

$G=GL(n,\mathbb R)$ では
$$
\operatorname{Ad}_{e^{tA}}(B)
=
e^{tA}Be^{-tA}.
$$

$t=0$ で微分すると、積の微分則から
$$
\begin{aligned}
\left.
\frac{d}{dt}
\right|_{0}
e^{tA}Be^{-tA}
&=
AB-BA.
\end{aligned}
$$

従って
$$
\boxed{
\operatorname{ad}_A(B)=AB-BA
}.
$$

LIE1 で得た $\mathfrak{gl}(n,\mathbb R)$ の Lie 括弧と一致しています。
<!-- definition-example-end -->

これは一般の Lie 群でも偶然ではありません。

<a id="thm-lie2-infinitesimal-adjoint-bracket"></a>
<!-- formal-statement-start -->
> **定理（無限小随伴作用は Lie 括弧）**
>
> 任意の $X,Y\in\mathfrak g$ に対して
>
$$
\boxed{
\operatorname{ad}_X(Y)
=
[X,Y]
}.
$$
>
>
> 従って
>
$$
\operatorname{ad}:\mathfrak g\to\mathfrak{gl}(\mathfrak g)
$$
>
> は
>
$$
X\mapsto(Y\mapsto[X,Y])
$$
>
> という写像そのものである。
<!-- formal-statement-end -->

### 証明の見取り図

$X$ に対応する左不変ベクトル場の流れは
$$
\Phi_t(g)=g\exp(tX)
$$
です。

[GEO5 の流れによる Lie 括弧](../GEO5/index.md#thm-geo5-bracket-flow)は
$$
\left.
\frac d{dt}
\right|_0
(\Phi_{-t})_*Y^L
=
[X^L,Y^L]
$$
と言っています。

この押し出しを単位元で評価すると、ちょうど
$$
\operatorname{Ad}_{\exp(tX)}Y
$$
になります。

<!-- proof-start -->
### 証明

$X,Y\in\mathfrak g$ に対応する左不変ベクトル場を $X^L,Y^L$ とします。

$X^L$ の積分曲線を任意の $g\in G$ から出すと
$$
t\longmapsto g\exp(tX)
$$
です。

実際、その微分は
$$
d(L_g)_{\exp(tX)}
\left(
\frac d{dt}\exp(tX)
\right)
=
d(L_g)_{\exp(tX)}
X^L_{\exp(tX)}
=
X^L_{g\exp(tX)}.
$$

従って $X^L$ の流れは右移動
$$
\Phi_t=R_{\exp(tX)}
$$
です。

[GEO5 の流れによる Lie 括弧の解釈](../GEO5/index.md#thm-geo5-bracket-flow)から
$$
\left.
\frac d{dt}
\right|_{0}
(\Phi_{-t})_*Y^L
=
[X^L,Y^L].
$$

ここで
$$
\Phi_{-t}=R_{\exp(-tX)}.
$$

左辺を単位元 $e$ で評価します。

押し出しの定義から
$$
\left(
(R_{\exp(-tX)})_*Y^L
\right)_e
=
d(R_{\exp(-tX)})_{\exp(tX)}
\left(
Y^L_{\exp(tX)}
\right).
$$

左不変性から
$$
Y^L_{\exp(tX)}
=
d(L_{\exp(tX)})_eY.
$$

従って
$$
\begin{aligned}
\left(
(R_{\exp(-tX)})_*Y^L
\right)_e
&=
d(R_{\exp(-tX)})_{\exp(tX)}
d(L_{\exp(tX)})_eY\\
&=
d(C_{\exp(tX)})_eY\\
&=
\operatorname{Ad}_{\exp(tX)}Y.
\end{aligned}
$$

ここで
$$
R_{\exp(-tX)}\circ L_{\exp(tX)}
=
C_{\exp(tX)}
$$
を使いました。

したがって GEO5 の式を単位元で評価すると
$$
\left.
\frac d{dt}
\right|_{0}
\operatorname{Ad}_{\exp(tX)}Y
=
[X^L,Y^L]_e.
$$

右辺は LIE1 の Lie 環の定義により
$$
[X,Y].
$$

一方左辺は $\operatorname{ad}=d(\operatorname{Ad})_e$ の定義から
$$
\operatorname{ad}_X(Y).
$$

よって
$$
\operatorname{ad}_X(Y)=[X,Y].
$$

$\square$
<!-- proof-end -->

この定理により、LIE1 で導入した括弧は「共役作用を二段階微分したもの」としても読み取れます。

---

## 12. Ad と ad は指数で対応する

随伴表現
$$
\operatorname{Ad}:G\to GL(\mathfrak g)
$$
は Lie 群準同型でした。

その微分は
$$
d(\operatorname{Ad})_e=\operatorname{ad}.
$$

従って Lie 群の指数写像の自然性をそのまま使えます。

<a id="cor-lie2-ad-exp"></a>
<!-- formal-statement-start -->
> **系（Ad_exp と exp_ad の一致）**
>
> 任意の $X\in\mathfrak g$ に対して
>
$$
\boxed{
\operatorname{Ad}_{\exp X}
=
\exp_{\!GL(\mathfrak g)}
(\operatorname{ad}_X)
}
$$
>
> が成り立つ。
>
> 右辺は線形写像 $\operatorname{ad}_X$ の行列指数である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

[Lie 群準同型と Lie 群の指数写像の自然性](#thm-lie2-exponential-naturality)を
$$
\operatorname{Ad}:G\to GL(\mathfrak g)
$$
へ適用します。

すると
$$
\operatorname{Ad}(\exp_GX)
=
\exp_{GL(\mathfrak g)}
\left(
d(\operatorname{Ad})_eX
\right).
$$

定義から
$$
d(\operatorname{Ad})_eX
=
\operatorname{ad}_X.
$$

従って
$$
\operatorname{Ad}_{\exp X}
=
\exp(\operatorname{ad}_X).
$$

$\square$
<!-- proof-end -->

特に
$$
\operatorname{ad}_X(Y)=0
$$
なら
$$
\operatorname{Ad}_{\exp(tX)}Y=Y
$$
が全ての $t$ で成り立ちます。

---

## 13. 二次元アフィン群で exp・Ad・ad を全部見る

LIE1 の二次元アフィン群
$$
G_{\mathrm{aff}}
=
\{(a,b):a>0\},
$$
$$
(a,b)(c,d)=(ac,b+ad)
$$
を行列
$$
(a,b)
\longleftrightarrow
\begin{pmatrix}
a&b\\
0&1
\end{pmatrix}
$$
と同一視します。

Lie 環の基底を
$$
H=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
E=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$
と取ると、LIE1 で
$$
[H,E]=E
$$
を得ました。

### 13.1 Lie 群の指数写像

$$
A=xH+yE
=
\begin{pmatrix}
x&y\\
0&0
\end{pmatrix}.
$$

$k\ge1$ について
$$
A^k
=
\begin{pmatrix}
x^k&x^{k-1}y\\
0&0
\end{pmatrix}
$$
です。

従って $x\ne0$ なら
$$
e^A
=
\begin{pmatrix}
e^x&
y\displaystyle\frac{e^x-1}{x}\\
0&1
\end{pmatrix}.
$$

$x=0$ なら $A^2=0$ なので
$$
e^A
=
\begin{pmatrix}
1&y\\
0&1
\end{pmatrix}.
$$

したがって群の座標では
$$
\boxed{
\exp(xH+yE)
=
\begin{cases}
\left(e^x,\ y\dfrac{e^x-1}{x}\right),&x\ne0,\\[1.2ex]
(1,y),&x=0.
\end{cases}
}
$$

です。

### 13.2 随伴表現

$$
g=
\begin{pmatrix}
a&b\\
0&1
\end{pmatrix},
\qquad
g^{-1}
=
\begin{pmatrix}
a^{-1}&-ba^{-1}\\
0&1
\end{pmatrix}.
$$

直接計算すると
$$
g(xH+yE)g^{-1}
=
xH+(ay-bx)E.
$$

従って
$$
\boxed{
\operatorname{Ad}_{(a,b)}(xH+yE)
=
xH+(ay-bx)E
}.
$$

特に
$$
\operatorname{Ad}_{(a,b)}H
=
H-bE,
$$
$$
\operatorname{Ad}_{(a,b)}E
=
aE.
$$

### 13.3 無限小随伴作用

括弧から
$$
\operatorname{ad}_H(H)=0,
\qquad
\operatorname{ad}_H(E)=E,
$$
$$
\operatorname{ad}_E(H)=-E,
\qquad
\operatorname{ad}_E(E)=0.
$$

基底 $(H,E)$ に関する行列は
$$
[\operatorname{ad}_H]
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix},
\qquad
[\operatorname{ad}_E]
=
\begin{pmatrix}
0&0\\
-1&0
\end{pmatrix}.
$$

例えば
$$
\exp(tH)=(e^t,0)
$$
なので
$$
\operatorname{Ad}_{\exp(tH)}H=H,
\qquad
\operatorname{Ad}_{\exp(tH)}E=e^tE.
$$

一方
$$
e^{t\operatorname{ad}_H}
=
\begin{pmatrix}
1&0\\
0&e^t
\end{pmatrix}.
$$

確かに
$$
\operatorname{Ad}_{\exp(tH)}
=
e^{t\operatorname{ad}_H}
$$
を直接確認できます。

---

## 14. Baker--Campbell--Hausdorff 公式への入口

可換 Lie 群なら
$$
\exp(X+Y)=\exp(X)\exp(Y)
$$
です。

非可換 Lie 群では、この等式のずれを Lie 括弧が測ります。

本章では一般の Baker--Campbell--Hausdorff 公式そのものを黒箱として使わず、まず共役四項積
$$
\exp(sX)\exp(tY)\exp(-sX)\exp(-tY)
$$
を調べます。

Lie 群の指数写像は0近傍で微分同相なので、$s,t$ が十分小さければ局所逆写像 $\log$ を適用できます。

<a id="prop-lie2-commutator-second-derivative"></a>
<!-- formal-statement-start -->
> **命題（共役四項積の混合二階微分と Lie 括弧）**
>
> $X,Y\in\mathfrak g$ とする。
>
> $s,t$ が0の十分近くにあるとき
>
$$
K(s,t)
:=
\exp(sX)\exp(tY)\exp(-sX)\exp(-tY)
$$
>
> と置き、
>
$$
\kappa(s,t):=\log K(s,t)
$$
>
> とする。
>
> このとき
>
$$
\kappa(s,0)=\kappa(0,t)=0
$$
>
> であり、
>
$$
\boxed{
\frac{\partial^2\kappa}{\partial s\,\partial t}(0,0)
=
[X,Y]
}.
$$
>
<!-- formal-statement-end -->

### 証明の見取り図

まず共役と Lie 群の指数写像の可換性から
$$
\exp(sX)\exp(tY)\exp(-sX)
=
\exp\left(t\,\operatorname{Ad}_{\exp(sX)}Y\right).
$$

$t=0$ で微分すると、四項積曲線の速度は
$$
\operatorname{Ad}_{\exp(sX)}Y-Y
$$
です。

さらに $s=0$ で微分すると
$$
\operatorname{ad}_X(Y)=[X,Y]
$$
が現れます。

<!-- proof-start -->
### 証明

$t=0$ なら
$$
K(s,0)
=
\exp(sX)e\exp(-sX)e
=
e.
$$

同様に
$$
K(0,t)=e.
$$

従って
$$
\kappa(s,0)=\kappa(0,t)=0.
$$

[共役と Lie 群の指数写像の可換性](#thm-lie2-conjugation-exponential)から
$$
\exp(sX)\exp(tY)\exp(-sX)
=
\exp\left(
t\,\operatorname{Ad}_{\exp(sX)}Y
\right).
$$

よって
$$
K(s,t)
=
\exp\left(
t\,\operatorname{Ad}_{\exp(sX)}Y
\right)
\exp(-tY).
$$

$s$ を固定して $t=0$ で微分します。

Lie 群の乗法
$$
m:G\times G\to G
$$
の $(e,e)$ における微分は
$$
dm_{(e,e)}(U,V)=U+V.
$$

実際、第一変数だけを動かせば $m(g,e)=g$、第二変数だけを動かせば $m(e,h)=h$ なので、微分の線形性からこの式が従います。

したがって
$$
\left.
\frac{\partial K}{\partial t}
\right|_{t=0}
=
\operatorname{Ad}_{\exp(sX)}Y-Y.
$$

また
$$
d(\log)_e
=
\left(d(\exp)_0\right)^{-1}
=
\operatorname{id}_{\mathfrak g}.
$$

従って連鎖律から
$$
\left.
\frac{\partial\kappa}{\partial t}
\right|_{t=0}
=
\operatorname{Ad}_{\exp(sX)}Y-Y.
$$

これを $s=0$ で微分すると
$$
\begin{aligned}
\frac{\partial^2\kappa}{\partial s\,\partial t}(0,0)
&=
\left.
\frac d{ds}
\right|_{s=0}
\operatorname{Ad}_{\exp(sX)}Y\\
&=
\operatorname{ad}_X(Y)\\
&=
[X,Y].
\end{aligned}
$$

最後の等号は [無限小随伴作用は Lie 括弧](#thm-lie2-infinitesimal-adjoint-bracket)によります。$\square$
<!-- proof-end -->

この命題は「非可換性を二方向へ微分すると Lie 括弧が残る」ことを厳密に示しています。

一般の Baker--Campbell--Hausdorff 公式は、単位元近傍で
$$
\log(\exp X\exp Y)
$$
を $X,Y$ と反復 Lie 括弧で記述する理論です。その展開では $[X,Y]$ が最初の非可換補正として現れます。

本章で必要なのは、この括弧がどこから出るかを上の混合微分で再構成できることです。一般の BCH 収束定理は後続の表現論・Lie 理論で必要になった段階に送ります。

---

## 15. 演習

### Level A

<a id="ex-lie2-a01"></a>
#### LIE2-A01 1パラメータ部分群の初速度
- Level: A

$G=\mathbb R_{>0}$ を乗法 Lie 群とし、
$$
\gamma(t)=e^{3t}
$$
とする。

1. $\gamma$ が1パラメータ部分群であることを定義から確認せよ。
2. 初速度 $\gamma'(0)\in T_1G$ を求めよ。
3. 対応する左不変ベクトル場を求めよ。
4. その積分曲線が $\gamma$ になることを直接確認せよ。

<!-- solution-start -->
##### 詳細解答

1. $\gamma$ は滑らかであり、
$$
\gamma(0)=1.
$$

また
$$
\gamma(s+t)
=
e^{3(s+t)}
=
e^{3s}e^{3t}
=
\gamma(s)\gamma(t).
$$

従って1パラメータ部分群です。

2.
$$
\gamma'(t)=3e^{3t}
$$
なので
$$
\boxed{\gamma'(0)=3}.
$$

3. LIE1 で $\mathbb R_{>0}$ の接ベクトル $c$ に対応する左不変ベクトル場は
$$
cx\frac{\partial}{\partial x}
$$
でした。

従って $c=3$ を代入して
$$
\boxed{
X=3x\frac{\partial}{\partial x}
}.
$$

4. 積分曲線 $x(t)$ は
$$
x'(t)=3x(t),
\qquad
x(0)=1
$$
を満たします。

解は
$$
x(t)=e^{3t}.
$$

これは $\gamma(t)$ と一致します。
<!-- solution-end -->

<a id="ex-lie2-a02"></a>
#### LIE2-A02 冪零行列の行列指数
- Level: A

$$
N=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}
$$
とする。

1. $N^2$ を求めよ。
2. $e^{tN}$ を求めよ。
3. $e^{sN}e^{tN}=e^{(s+t)N}$ を直接確認せよ。
4. $t\mapsto e^{tN}$ の初速度を求めよ。

<!-- solution-start -->
##### 詳細解答

1.
$$
N^2
=
\begin{pmatrix}
0&2\\
0&0
\end{pmatrix}^2
=
0.
$$

2. $N^2=0$ なので指数級数は
$$
e^{tN}
=
I+tN
$$
で止まります。

従って
$$
\boxed{
e^{tN}
=
\begin{pmatrix}
1&2t\\
0&1
\end{pmatrix}
}.
$$

3.
$$
\begin{aligned}
e^{sN}e^{tN}
&=
(I+sN)(I+tN)\\
&=
I+(s+t)N+stN^2\\
&=
I+(s+t)N\\
&=
e^{(s+t)N}.
\end{aligned}
$$

4.
$$
\left.
\frac d{dt}
\right|_{0}
e^{tN}
=
N.
$$

従って初速度は
$$
\boxed{N}.
$$
<!-- solution-end -->

<a id="ex-lie2-a03"></a>
#### LIE2-A03 準同型と Lie 群の指数写像
- Level: A

$$
\Phi:\mathbb R_{>0}\to(\mathbb R,+),
\qquad
\Phi(x)=\log x
$$
とする。

1. $\Phi$ が Lie 群準同型であることを示せ。
2. $d\Phi_1$ を求めよ。
3. Lie 群の指数写像の自然性
   $$
   \Phi(\exp_{\mathbb R_{>0}}a)
   =
   \exp_{\mathbb R}(d\Phi_1a)
   $$
   を直接確認せよ。

<!-- solution-start -->
##### 詳細解答

1.
$$
\Phi(xy)
=
\log(xy)
=
\log x+\log y
=
\Phi(x)+\Phi(y).
$$

また $\log x$ は $x>0$ 上で滑らかです。従って Lie 群準同型です。

2.
$$
\Phi'(x)=\frac1x
$$
なので
$$
\boxed{
d\Phi_1(a)=a
}.
$$

3. 乗法 Lie 群の指数写像は
$$
\exp_{\mathbb R_{>0}}a=e^a.
$$

加法 Lie 群の指数写像は恒等写像なので
$$
\exp_{\mathbb R}(a)=a.
$$

従って
$$
\Phi(\exp_{\mathbb R_{>0}}a)
=
\log(e^a)
=
a
$$
であり、
$$
\exp_{\mathbb R}(d\Phi_1a)
=
\exp_{\mathbb R}(a)
=
a.
$$

よって両辺は一致します。
<!-- solution-end -->

<a id="ex-lie2-a04"></a>
#### LIE2-A04 GL(2) の随伴表現
- Level: A

$$
g=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix},
\qquad
A=
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
$$
とする。

1. $g^{-1}$ を求めよ。
2. $\operatorname{Ad}_g(A)$ を求めよ。
3. $\operatorname{Ad}_{g^{-1}}(\operatorname{Ad}_g(A))=A$ を確認せよ。

<!-- solution-start -->
##### 詳細解答

1.
$$
\boxed{
g^{-1}
=
\begin{pmatrix}
1/2&0\\
0&1
\end{pmatrix}
}.
$$

2. 一般線形群では
$$
\operatorname{Ad}_g(A)=gAg^{-1}.
$$

まず
$$
gA
=
\begin{pmatrix}
2&0\\
0&1
\end{pmatrix}
\begin{pmatrix}
0&1\\
1&0
\end{pmatrix}
=
\begin{pmatrix}
0&2\\
1&0
\end{pmatrix}.
$$

従って
$$
\boxed{
\operatorname{Ad}_g(A)
=
\begin{pmatrix}
0&2\\
1/2&0
\end{pmatrix}
}.
$$

3.
$$
\operatorname{Ad}_{g^{-1}}(\operatorname{Ad}_g(A))
=
g^{-1}(gAg^{-1})g
=
A.
$$

実際に積を結合すれば
$$
g^{-1}g=I,
\qquad
gg^{-1}=I
$$
が相殺し、
$$
\boxed{A}
$$
へ戻ります。
<!-- solution-end -->

### Level B

<a id="ex-lie2-b01"></a>
#### LIE2-B01 左不変ベクトル場の完備性を再構成する
- Level: B

$G$ を Lie 群、$X\in\mathfrak g$ とし、$X^L$ を対応する左不変ベクトル場とする。

単位元を通る最大積分曲線を
$$
\gamma:I\to G
$$
とする。

1. $s\in I$ を固定したとき、$t\mapsto\gamma(s)\gamma(t)$ が $X^L$ の積分曲線であることを示せ。
2. 一意性から局所的な群則を導け。
3. $I$ が有限右端を持てないことを示せ。
4. $I=\mathbb R$ と $\gamma(s+t)=\gamma(s)\gamma(t)$ を結論せよ。

<!-- solution-start -->
##### 詳細解答

1. 左移動 $L_{\gamma(s)}$ を用いると
$$
\eta(t)=L_{\gamma(s)}(\gamma(t)).
$$

微分して
$$
\eta'(t)
=
d(L_{\gamma(s)})_{\gamma(t)}(\gamma'(t)).
$$

$\gamma$ は積分曲線なので
$$
\gamma'(t)=X^L_{\gamma(t)}.
$$

左不変性から
$$
d(L_{\gamma(s)})_{\gamma(t)}
(X^L_{\gamma(t)})
=
X^L_{\gamma(s)\gamma(t)}.
$$

従って $\eta$ は $X^L$ の積分曲線です。

2. $t\mapsto\gamma(s+t)$ も $X^L$ の積分曲線です。

$t=0$ で両者は
$$
\gamma(s)
$$
を通ります。

積分曲線の一意性から、共通して定義される範囲で
$$
\boxed{
\gamma(s+t)=\gamma(s)\gamma(t)
}.
$$

3. 局所存在によりある $\varepsilon>0$ について
$$
(-\varepsilon,\varepsilon)\subset I.
$$

右端を有限値 $b$ と仮定します。

$$
b-\varepsilon/2<s<b
$$
となる $s\in I$ を取ります。

曲線
$$
t\longmapsto
\gamma(s)\gamma(t-s)
$$
は $s-\varepsilon<t<s+\varepsilon$ で定義される積分曲線です。

既存の $\gamma$ と重なる区間では一意性により一致します。

しかし
$$
s+\varepsilon>b
$$
なので、これは $\gamma$ を $b$ より先へ延長します。最大性に反します。

従って有限右端はありません。

4. 左端も同様に有限ではないので
$$
I=\mathbb R.
$$

全実数上で二つの積分曲線
$$
t\mapsto\gamma(s+t),
\qquad
t\mapsto\gamma(s)\gamma(t)
$$
を比較し、一意性を使えば
$$
\boxed{
\gamma(s+t)=\gamma(s)\gamma(t)
}
$$
が全ての $s,t$ で成り立ちます。

したがって $\gamma$ は1パラメータ部分群です。
<!-- solution-end -->

<a id="ex-lie2-b02"></a>
#### LIE2-B02 アフィン群の exp
- Level: B

二次元アフィン群を
$$
G_{\mathrm{aff}}
=
\left\{
\begin{pmatrix}
a&b\\
0&1
\end{pmatrix}
:a>0
\right\}
$$
と表す。

$$
A=
xH+yE
=
\begin{pmatrix}
x&y\\
0&0
\end{pmatrix}
$$
について次を示せ。

1. $k\ge1$ に対し
   $$
   A^k=
   \begin{pmatrix}
   x^k&x^{k-1}y\\
   0&0
   \end{pmatrix}.
   $$
2. $x\ne0$ のとき $\exp A$ を求めよ。
3. $x=0$ のとき $\exp A$ を求めよ。
4. $x\to0$ で二つの式が連続につながることを示せ。

<!-- solution-start -->
##### 詳細解答

1. $k=1$ では明らかです。

$k$ で式が成り立つと仮定すると
$$
\begin{aligned}
A^{k+1}
&=
\begin{pmatrix}
x^k&x^{k-1}y\\
0&0
\end{pmatrix}
\begin{pmatrix}
x&y\\
0&0
\end{pmatrix}\\
&=
\begin{pmatrix}
x^{k+1}&x^ky\\
0&0
\end{pmatrix}.
\end{aligned}
$$

従って帰納法で成立します。

2. 指数級数から
$$
e^A
=
I+\sum_{k=1}^\infty\frac{A^k}{k!}.
$$

左上成分は
$$
1+\sum_{k=1}^{\infty}\frac{x^k}{k!}
=
e^x.
$$

右上成分は
$$
\sum_{k=1}^{\infty}
\frac{x^{k-1}y}{k!}
=
y\frac{e^x-1}{x}.
$$

従って
$$
\boxed{
e^A
=
\begin{pmatrix}
e^x&y\dfrac{e^x-1}{x}\\
0&1
\end{pmatrix}
\qquad(x\ne0).
}
$$

3. $x=0$ なら
$$
A=yE,
\qquad
E^2=0.
$$

従って
$$
\boxed{
e^A
=
I+yE
=
\begin{pmatrix}
1&y\\
0&1
\end{pmatrix}.
}
$$

4. 実指数関数の微分から
$$
\lim_{x\to0}\frac{e^x-1}{x}=1.
$$

よって右上成分は
$$
y\frac{e^x-1}{x}\to y.
$$

左上成分は $e^x\to1$ なので、$x\ne0$ の式は $x=0$ の式へ連続につながります。
<!-- solution-end -->

<a id="ex-lie2-b03"></a>
#### LIE2-B03 アフィン Lie 環の ad と Ad
- Level: B

二次元アフィン Lie 環の基底 $H,E$ が
$$
[H,E]=E
$$
を満たすとする。

1. $\operatorname{ad}_H,\operatorname{ad}_E$ の基底 $(H,E)$ に関する行列を求めよ。
2. $e^{t\operatorname{ad}_H}$ を求めよ。
3. $\exp(tH)=(e^t,0)$ と
   $$
   \operatorname{Ad}_{(a,b)}(xH+yE)=xH+(ay-bx)E
   $$
   を使って $\operatorname{Ad}_{\exp(tH)}$ を求めよ。
4. $\operatorname{Ad}_{\exp(tH)}=e^{t\operatorname{ad}_H}$ を確認せよ。

<!-- solution-start -->
##### 詳細解答

1.
$$
\operatorname{ad}_H(H)=[H,H]=0,
$$
$$
\operatorname{ad}_H(E)=[H,E]=E.
$$

従って
$$
\boxed{
[\operatorname{ad}_H]
=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}.
}
$$

また反対称性から
$$
[E,H]=-E.
$$

従って
$$
\operatorname{ad}_E(H)=-E,
\qquad
\operatorname{ad}_E(E)=0,
$$
なので
$$
\boxed{
[\operatorname{ad}_E]
=
\begin{pmatrix}
0&0\\
-1&0
\end{pmatrix}.
}
$$

2. $\operatorname{ad}_H$ は基底 $H,E$ に対して固有値 $0,1$ の対角作用なので
$$
\boxed{
e^{t\operatorname{ad}_H}
=
\begin{pmatrix}
1&0\\
0&e^t
\end{pmatrix}.
}
$$

3. $a=e^t,b=0$ を随伴作用の式へ入れると
$$
\operatorname{Ad}_{\exp(tH)}(xH+yE)
=
xH+e^tyE.
$$

従って基底 $(H,E)$ に関する行列は
$$
\boxed{
[\operatorname{Ad}_{\exp(tH)}]
=
\begin{pmatrix}
1&0\\
0&e^t
\end{pmatrix}.
}
$$

4. 2と3の行列が一致するので
$$
\boxed{
\operatorname{Ad}_{\exp(tH)}
=
e^{t\operatorname{ad}_H}.
}
$$
<!-- solution-end -->

### Level C

<a id="ex-lie2-c01"></a>
#### LIE2-C01 共役四項積から Lie 括弧を再構成する
- Level: C

$G$ を Lie 群、$\mathfrak g=T_eG$ とする。$X,Y\in\mathfrak g$ に対し
$$
K(s,t)
=
\exp(sX)\exp(tY)\exp(-sX)\exp(-tY)
$$
と置く。

Lie 群の指数写像が0近傍で微分同相であることを使い、$s,t$ が十分小さい範囲で
$$
\kappa(s,t)=\log K(s,t)
$$
とする。

1. $K(s,0)=K(0,t)=e$ を示せ。
2. 共役と Lie 群の指数写像の可換性から
   $$
   K(s,t)
   =
   \exp(t\operatorname{Ad}_{\exp(sX)}Y)\exp(-tY)
   $$
   を導け。
3.
   $$
   \left.
   \frac{\partial\kappa}{\partial t}
   \right|_{t=0}
   =
   \operatorname{Ad}_{\exp(sX)}Y-Y
   $$
   を示せ。
4.
   $$
   \frac{\partial^2\kappa}{\partial s\,\partial t}(0,0)
   =
   [X,Y]
   $$
   を導け。
5. $[X,Y]=0$ のとき、この混合二階微分が消える理由を「群の非可換性の最初の無限小検出」という観点から説明せよ。

<!-- solution-start -->
##### 詳細解答

1. $t=0$ なら
$$
\exp(tY)=e,
\qquad
\exp(-tY)=e.
$$

従って
$$
K(s,0)
=
\exp(sX)\exp(-sX)
=
e.
$$

同様に $s=0$ なら
$$
K(0,t)
=
\exp(tY)\exp(-tY)
=
e.
$$

2. 共役と Lie 群の指数写像の可換性より
$$
\exp(sX)\exp(tY)\exp(-sX)
=
\exp\left(
\operatorname{Ad}_{\exp(sX)}(tY)
\right).
$$

$\operatorname{Ad}$ は線形なので
$$
\operatorname{Ad}_{\exp(sX)}(tY)
=
t\operatorname{Ad}_{\exp(sX)}Y.
$$

従って
$$
\boxed{
K(s,t)
=
\exp(t\operatorname{Ad}_{\exp(sX)}Y)\exp(-tY).
}
$$

3. $t=0$ では二つの因子はともに $e$ です。

第一因子の初速度は
$$
\operatorname{Ad}_{\exp(sX)}Y,
$$
第二因子の初速度は
$$
-Y.
$$

群の乗法の $(e,e)$ における微分は
$$
(U,V)\mapsto U+V
$$
なので
$$
\left.
\frac{\partial K}{\partial t}
\right|_{t=0}
=
\operatorname{Ad}_{\exp(sX)}Y-Y.
$$

また
$$
d(\log)_e=\operatorname{id}_{\mathfrak g}
$$
なので連鎖律により
$$
\boxed{
\left.
\frac{\partial\kappa}{\partial t}
\right|_{t=0}
=
\operatorname{Ad}_{\exp(sX)}Y-Y.
}
$$

4. 3の式を $s=0$ で微分します。

右辺の $-Y$ は定数なので消え、
$$
\begin{aligned}
\frac{\partial^2\kappa}{\partial s\,\partial t}(0,0)
&=
\left.
\frac d{ds}
\right|_{0}
\operatorname{Ad}_{\exp(sX)}Y\\
&=
\operatorname{ad}_X(Y).
\end{aligned}
$$

本文で証明した
$$
\operatorname{ad}_X(Y)=[X,Y]
$$
を使って
$$
\boxed{
\frac{\partial^2\kappa}{\partial s\,\partial t}(0,0)
=
[X,Y].
}
$$

5. $[X,Y]=0$ なら上の混合二階微分は0です。

共役四項積 $K(s,t)$ は、$X$ 方向へ動き、次に $Y$ 方向へ動き、それぞれ逆向きに戻ったときの「戻り切らなさ」を測ります。

一次では各方向の正逆が相殺します。二方向を同時に変化させた最初の交差効果が混合二階微分であり、その値が $[X,Y]$ です。

従って
$$
[X,Y]=0
$$
は、この次数では $X$ と $Y$ の順序交換によるずれが検出されないことを意味します。
<!-- solution-end -->

---

## 16. まとめ

本章では、LIE1 の単位元接空間を実際の群の曲線へ戻しました。

1. 1パラメータ部分群は
   $$
   \gamma:(\mathbb R,+)\to G
   $$
   という滑らかな Lie 群準同型である。
2. 1パラメータ部分群は、その初速度に対応する左不変ベクトル場の積分曲線である。
3. 左不変性により局所解を群のどの点からも同じ形で再開できるため、左不変ベクトル場は完備である。
4. 従って任意の
   $$
   X\in\mathfrak g
   $$
   から一意な1パラメータ部分群が得られる。
5. その時刻1の値
   $$
   \exp X
   $$
   が Lie 群の指数写像であり、
   $$
   \exp(tX)
   $$
   が対応する1パラメータ部分群そのものである。
6. Lie 群の指数写像は滑らかで
   $$
   d\exp_0=\operatorname{id}
   $$
   だから、単位元近傍では指数座標を与える。
7. Lie 群準同型は
   $$
   \Phi(\exp X)=\exp(d\Phi_eX)
   $$
   を満たす。
8. 一般線形群では Lie 群の指数写像は行列指数
   $$
   e^A=\sum_{k=0}^{\infty}\frac{A^k}{k!}
   $$
   と一致する。
9. 共役自己同型を単位元で微分すると
   $$
   \operatorname{Ad}:G\to GL(\mathfrak g)
   $$
   が得られる。
10. さらに微分すると
    $$
    \operatorname{ad}_X(Y)=[X,Y]
    $$
    となり、Lie 括弧は共役作用の無限小形として再発見される。
11. Lie 群の指数写像の自然性から
    $$
    \operatorname{Ad}_{\exp X}
    =
    \exp(\operatorname{ad}_X)
    $$
    が従う。
12. 共役四項積を指数座標で二方向へ微分すると
    $$
    [X,Y]
    $$
    が現れ、Baker--Campbell--Hausdorff 理論への入口になる。

次章 LIE3 では、この Lie 群の指数写像と接 Lie 環を使って Lie 部分群を調べます。特に
$$
SL(n),\ O(n),\ SO(n),\ U(n),\ SU(n)
$$
などの古典群について、群を定義する方程式を単位元で微分し、対応する Lie 環を具体的に計算します。
