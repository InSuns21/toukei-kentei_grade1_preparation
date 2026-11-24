# AFR1 古典的モジュラー形式から保型形式へ

MFでは、上半平面の関数が整数行列による変換で決まった係数倍になることを学びました。この係数は点と行列の両方に依存するため、同じ格子を表す点でも関数値が一致するとは限りません。重さ4の形式と重さ0の形式を同じ空間に置き、群の作用によって比較するにはどうすればよいでしょうか。

本章では点だけでなく、点へ移る行列そのものを変数にします。点を動かさず向きだけを変える回転を記録すれば、重さは回転に対する単純な複素数倍として現れます。整数行列による変換は左から、回転は右から作用させるので、二つの条件を分離できます。まずこの変換則の翻訳を完全に証明し、正則性とカスプ条件は別の条件であることを確認します。

<!-- definition-example-audit: strict -->

## 1. 点を動かす実行列と向きを表す回転

[整数モジュラー群](../../MF/MF1/index.md#def-mf1-modular-group) $\Gamma=SL_2(\mathbb Z)$ の整数成分という条件を実数成分へ広げます。行列式1を保てば、[一次分数変換](../../MF/MF1/index.md#def-mf1-fractional-action)と同じ式を使えます。群全体で上半平面を動かし、整数行列だけを後で同一視するための準備です。[上半平面](../../MF/MF1/index.md#def-mf1-upper-half-plane) $\mathbb H$ の点を $z=x+iy$（$x,y\in\mathbb R$、$y>0$）と書きます。MF1の $\tau$ と本章の $z$ は同じ種類の点を表します。$i$ は虚数単位、$I$ は2次単位行列です。

実2次正方行列の行列式は $ad-bc$ です。行列式1の行列は逆行列 $\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ を持ち、その行列式も1です。積の行列式は行列式の積なので1であり、$I$ も含まれます。従って実行列に広げても行列の積について群になります。

<a id="def-afr1-real-group"></a>
<!-- formal-statement-start -->
> **定義（実特殊線形群の上半平面への作用）**  
> $G=SL_2(\mathbb R)$ は行列式1の実2次正方行列全体の群である。$g=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in G$ と $z=x+iy\in\mathbb H$ に対し
>
$$
g\cdot z=\frac{az+b}{cz+d},\qquad j(g,z)=cz+d
$$
>
> と置く。$j(g,z)$ を本章の変換因子とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr1-real-group -->
**定義の確認**。$g=\begin{pmatrix}2&1\\0&1/2\end{pmatrix}$ は実成分を持ち、行列式は $2/2=1$ です。逆行列は $\begin{pmatrix}1/2&-1\\0&2\end{pmatrix}$ で、これも行列式1です。$g\cdot i=(2i+1)/(1/2)=2+4i$ は上半平面内にあり、$j(g,i)=1/2$ は非零です。
<!-- definition-example-end -->

MF1の[虚部公式](../../MF/MF1/index.md#thm-mf1-imaginary-action)の導出で整数性は不要です。分母が非零なのは、$c\ne0$ なら $cz+d=0$ が $z=-d/c\in\mathbb R$ を強制し、$c=0$ なら $ad=1$ より $d\ne0$ だからです。$\overline z=x-iy$ を複素共役と書きます。分子と分母に $c\overline z+d$ を掛けると

$$
(az+b)(c\overline z+d)
=ac|z|^2+ad z+bc\overline z+bd.
$$

右辺の虚部は $ad y-bc y$、分母は実数 $|cz+d|^2>0$ なので

$$
\operatorname{Im}(g\cdot z)=\frac{(ad-bc)y}{|cz+d|^2}
=\frac{y}{|j(g,z)|^2}>0.
$$

二つの行列を続けて作用させたとき、変換因子はどのように合成されるでしょうか。この積の法則が重さを消去する鍵になります。

<a id="prop-afr1-factor"></a>
<!-- formal-statement-start -->
> **命題（変換因子の積法則）**  
> $g,h\in G$、$z\in\mathbb H$ とする。上の一次分数変換は群作用をなし、その変換因子は
>
$$
j(gh,z)=j(g,h\cdot z)j(h,z)
$$
>
> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

列ベクトル $(z,1)^{\mathsf T}$ に行列を掛け、下成分を取り出します。下成分を1に戻すために非零の下成分で割ると、上成分が変換後の点になります。その際に取り出す係数が変換因子です。

<!-- proof-start -->
### 証明

$g(z,1)^{\mathsf T}=(az+b,cz+d)^{\mathsf T}$ より

$$
g\begin{pmatrix}z\\1\end{pmatrix}
=j(g,z)\begin{pmatrix}g\cdot z\\1\end{pmatrix}.
$$

先に $h$ を作用させてから $g$ を掛けると

$$
gh\begin{pmatrix}z\\1\end{pmatrix}
=j(h,z)j(g,h\cdot z)
\begin{pmatrix}g\cdot(h\cdot z)\\1\end{pmatrix}.
$$

左辺を行列 $gh$ についての最初の式で書いたときの下成分は $j(gh,z)$ です。従って積法則が成立します。

下成分が非零なので上成分を下成分で割れば $(gh)\cdot z=g\cdot(h\cdot z)$ も従います。単位行列 $I$ は $I\cdot z=z$ を満たすため、群作用です。
<!-- proof-end -->

次に、点 $i$ を固定する行列を調べます。点が同じでも行列が違えば、そこに残った情報を回転角で表せます。実平面の長さと向きを保つ行列、すなわち特殊直交群 $SO(2)$ の行列を使います。直交条件は列ベクトルが互いに直交し、長さがともに1であること、向きを保つ条件は行列式が1であることです。

第一列が $(a,c)^{\mathsf T}$ なら $a^2+c^2=1$ で、直交する単位第二列の候補は $(-c,a)^{\mathsf T}$ とその負です。前者の行列式は $a^2+c^2=1$、後者は $-1$ なので前者を選びます。$a=\cos\theta,\ c=-\sin\theta$ と置くと次の表示になります。

<a id="def-afr1-rotation"></a>
<!-- formal-statement-start -->
> **定義（右回転に用いる部分群）**  
> $G=SL_2(\mathbb R)$ の部分群 $K=SO(2)$ を
>
$$
K=\{k_\theta:\theta\in\mathbb R\},\qquad
k_\theta=\begin{pmatrix}\cos\theta&\sin\theta\\
-\sin\theta&\cos\theta\end{pmatrix}
$$
>
> と表示する。角度は $2\pi$ を法として考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr1-rotation -->
**定義の確認**。$\theta=\pi/2$ なら

$$
k_{\pi/2}=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
$$

二つの列は長さ1で内積0、行列式は1です。一般にも列の長さの二乗は $\cos^2\theta+\sin^2\theta=1$、内積は $\cos\theta\sin\theta-\sin\theta\cos\theta=0$、行列式は1です。従って全行列が $SO(2)$ と $G$ に属します。三角関数の加法公式で

$$
k_\theta k_\varphi
=\begin{pmatrix}
\cos\theta\cos\varphi-\sin\theta\sin\varphi&
\cos\theta\sin\varphi+\sin\theta\cos\varphi\\
-\sin\theta\cos\varphi-\cos\theta\sin\varphi&
\cos\theta\cos\varphi-\sin\theta\sin\varphi
\end{pmatrix}
=k_{\theta+\varphi}.
$$

$k_0=I$、$k_\theta^{-1}=k_{-\theta}$ なので積と逆元について閉じています。特に $k_{\pi/2}^2=k_\pi=-I$ です。
<!-- definition-example-end -->

この符号の回転行列を一貫して使います（通常の反時計回りの回転角は $-\theta$ です）。$\operatorname{diag}(a,d)$ は対角成分が $a,d$、非対角成分が0の行列を表します。

[左剰余類](../../GRP/GRP2/index.md#def-grp2-cosets) $gK=\{gk:k\in K\}$ は右に回転を掛けて得られる行列の集合です。その集合全体を $G/K$ と書きます。次の定理では点 $i$ の[安定化群](../../GRP/GRP3/index.md#def-grp3-orbit-stabilizer)（$i$ を固定する元全体）がちょうど $K$ であることを示します。逆向きの回転行列を使う文献では、後の指数の符号も逆になります。

<a id="thm-afr1-coordinates"></a>
<!-- formal-statement-start -->
> **定理（上半平面と回転による実行列の表示）**  
> $z=x+iy\in\mathbb H$ に対し
>
$$
s(z)=\begin{pmatrix}\sqrt y&x/\sqrt y\\0&1/\sqrt y\end{pmatrix}
$$
>
> と置く。任意の $g\in G$ は $z=g\cdot i$ と一意な $k_\theta\in K$ を用いて $g=s(z)k_\theta$ と表示できる。点 $i$ を固定する $G$ の元全体は $K$ に等しい。従って、左剰余類の集合 $G/K=\{gK:g\in G\}$ と $\mathbb H$ は $gK\mapsto g\cdot i$ により一対一に対応する。
<!-- formal-statement-end -->

### 証明の見取り図

$s(z)$ で $i$ を希望の点へ運び、残った $s(z)^{-1}g$ が $i$ を固定することを確かめます。その固定条件を成分で解くと回転行列になります。

<!-- proof-start -->
### 証明

まず $s(z)$ は行列式1で、作用の式から

$$
s(z)\cdot i=\frac{\sqrt y\,i+x/\sqrt y}{1/\sqrt y}
=x+iy=z.
$$

$h=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in G$ が $h\cdot i=i$ を満たすなら、分母は非零なので $ai+b=i(ci+d)=-c+di$ です。実部と虚部を比較して $b=-c$、$a=d$ となります。行列式条件は $a^2+b^2=1$ なので、ある $\theta$ に対して $a=\cos\theta$、$b=\sin\theta$、$h=k_\theta$ です。逆にこの成分関係から $k_\theta\cdot i=i$ となります。

[群作用の合成則](#prop-afr1-factor)で $z=g\cdot i$ とすると

$$
(s(z)^{-1}g)\cdot i=s(z)^{-1}\cdot z=i.
$$

よって $s(z)^{-1}g\in K$ であり、表示が存在します。$s(w)k_\varphi=g$ なら $i$ に作用させて $w=z$、左から $s(z)^{-1}$ を掛けて $k_\varphi=k_\theta$ です。

[左剰余類](../../GRP/GRP2/index.md#def-grp2-cosets) $gK$ のどの元も同じ点へ $i$ を移すので写像は良定義です。$s(z)K$ が任意の $z$ の原像であり全射です。

$g\cdot i=h\cdot i$ なら $h^{-1}g\in K$ なので $gK=hK$ となり単射です。
<!-- proof-end -->

例えば $g=\begin{pmatrix}0&-2\\1/2&0\end{pmatrix}$ は $g\cdot i=4i$ を与えます。$s(4i)=\operatorname{diag}(2,1/2)$ で、$s(4i)^{-1}g=\begin{pmatrix}0&-1\\1&0\end{pmatrix}=k_{-\pi/2}$ です。点 $4i$ だけを記録すれば、この回転角を失います。

## 2. 重さを群の右作用に移す

[重さkのモジュラー形式](../../MF/MF2/index.md#def-mf2-modular-form)は $f(\gamma\cdot z)=j(\gamma,z)^k f(z)$ を満たします。今回はまずこの変換則だけに注目し、正則性や無限遠の条件をいったん分離します。

[右剰余類](../../GRP/GRP2/index.md#def-grp2-cosets) $\Gamma g=\{\gamma g:\gamma\in\Gamma\}$ を考えると、異なる行列が同じ右剰余類を表す場合があります。$G$ 上の関数が左からの整数行列の作用で値を変えなければ、$\Gamma g$ に値を割り当てられます。全右剰余類の集合を $\Gamma\backslash G$ と書きます。$\Gamma$ が正規部分群であることは要求しておらず、これは商群ではありません。

右から $k_\theta$ を掛ける操作では $g\cdot i$ が変わりませんが、$j(g,i)$ は変わります。したがって、この係数を使って左からの変化を相殺し、右からの変化として重さを残すことができます。

<a id="def-afr1-weight-space"></a>
<!-- formal-statement-start -->
> **定義（群上の重さ付き不変関数）**  
> $\Gamma=SL_2(\mathbb Z)$、$G=SL_2(\mathbb R)$、$k\in\mathbb Z$ とする。関数 $\Phi:G\to\mathbb C$ が群上の重さ $k$ の不変関数であるとは、全ての $\gamma\in\Gamma$、$g\in G$、$\theta\in\mathbb R$ に対して
>
$$
\Phi(\gamma g)=\Phi(g),\qquad
\Phi(gk_\theta)=e^{ik\theta}\Phi(g)
$$
>
> が成立することをいう。第1条件により $\Phi$ は $\Gamma\backslash G$ 上の関数でもある。
<!-- formal-statement-end -->

<!-- definition-example-start: def-afr1-weight-space -->
**定義の確認**。$\Phi(g)=1$ とすると全 $\gamma,g$ に対して左条件は $1=1$、$k=0$ なら全 $\theta$ について右条件も $1=e^0\cdot1$ です。

一方同じ関数を重さ2とすると $\theta=\pi/2$ の右条件は $1=e^{i\pi}=-1$ となり失敗します。群上で左不変であることだけでは重さは決まりません。
<!-- definition-example-end -->

以下ではこの空間を変換則を調べるための広い関数空間として使います。一般の保型形式を定義するには、対象に応じて滑らかさ、増大条件、微分作用素に関する条件なども指定します。本章でそれらをすべて課したとみなすことはしません。

<a id="thm-afr1-lift"></a>
<!-- formal-statement-start -->
> **定理（重さ付き変換則と群上の持ち上げの対応）**  
> 整数 $k$ に対して、全 $\gamma\in\Gamma$、$z\in\mathbb H$ で $f(\gamma\cdot z)=j(\gamma,z)^k f(z)$ を満たす関数 $f:\mathbb H\to\mathbb C$ と、群上の重さ $k$ の不変関数 $\Phi:G\to\mathbb C$ は、次の互いに逆な線形写像で一対一に対応する。
>
$$
\Phi_f(g)=j(g,i)^{-k}f(g\cdot i),\qquad
f_\Phi(z)=y^{-k/2}\Phi(s(z))\quad(z=x+iy).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[変換因子の積法則](#prop-afr1-factor)で左作用の係数を相殺します。右作用では $k_\theta\cdot i=i$ なので係数だけが残ります。逆方向では [上半平面と回転による実行列の表示](#thm-afr1-coordinates)を用いて、元の関数を復元します。

<!-- proof-start -->
### 証明

**左不変性。** $z=g\cdot i$ と置きます。[変換因子の積法則](#prop-afr1-factor)および仮定された変換則により

$$
\begin{aligned}
\Phi_f(\gamma g)
&=j(\gamma g,i)^{-k}f(\gamma\cdot z)\\
&=j(\gamma,z)^{-k}j(g,i)^{-k}j(\gamma,z)^k f(z)\\
&=\Phi_f(g).
\end{aligned}
$$

**右回転。** $j(k_\theta,i)=-i\sin\theta+\cos\theta=e^{-i\theta}$ です。[上半平面と回転による実行列の表示](#thm-afr1-coordinates)で $k_\theta\cdot i=i$ です。[変換因子の積法則](#prop-afr1-factor)を $h=k_\theta$ に適用すると

$$
j(gk_\theta,i)=j(g,i)e^{-i\theta},\qquad
(gk_\theta)\cdot i=g\cdot i.
$$

従って $\Phi_f(gk_\theta)=e^{ik\theta}\Phi_f(g)$ です。

**逆写像。** $\Phi$ が二つの不変条件を満たすとします。$j(s(z),i)=1/\sqrt y$ なので、復元式は $f_\Phi(z)=j(s(z),i)^k\Phi(s(z))$ です。任意の $g=s(z)k_\theta$ について

$$
\begin{aligned}
j(g,i)^k\Phi(g)
&=j(s(z),i)^k e^{-ik\theta}e^{ik\theta}\Phi(s(z))\\
&=f_\Phi(z).
\end{aligned}
$$

つまり $f_\Phi(g\cdot i)=j(g,i)^k\Phi(g)$ が全 $g$ に成立します。左不変性を $s(z)$ に適用すれば $\Phi(\gamma s(z))=\Phi(s(z))$ です。[変換因子の積法則](#prop-afr1-factor)を $g=\gamma$、$h=s(z)$ に適用すると

$$
\begin{aligned}
f_\Phi(\gamma\cdot z)
&=j(\gamma s(z),i)^k\Phi(\gamma s(z))\\
&=j(\gamma,z)^k j(s(z),i)^k\Phi(s(z))\\
&=j(\gamma,z)^k f_\Phi(z).
\end{aligned}
$$

最後に $f_{\Phi_f}(z)=j(s(z),i)^k j(s(z),i)^{-k}f(z)=f(z)$、また $\Phi_{f_\Phi}(g)=j(g,i)^{-k}j(g,i)^k\Phi(g)=\Phi(g)$ です。いずれの写像も固定係数を掛けて関数を評価するので、加法と複素数倍を保ちます。
<!-- proof-end -->

この対応を座標で書けば

$$
\Phi_f(s(x+iy)k_\theta)=y^{k/2}e^{ik\theta}f(x+iy).
$$

たとえば MF2 の [Eisenstein級数の変換則](../../MF/MF2/index.md#thm-mf2-eisenstein-modularity)を満たす正規化された $E_4$ では、$\Phi_{E_4}(s(2i))=4E_4(2i)$ です。右に $k_{\pi/4}$ を掛けると点 $2i$ は変わらず、値だけが $e^{4i\pi/4}=-1$ 倍になります。この回転角への依存が、元の重さを保存しています。

## 3. 中心の作用と重さの偶奇

[群の中心](../../GRP/GRP3/index.md#def-grp3-center-centralizer)とは全ての群の元と可換な元の集合です。この群では $-I$ が左から掛けても右から掛けても同じ行列を与えます。従って左不変性と右回転の条件が同時に成立するかを調べられます。

<a id="prop-afr1-center"></a>
<!-- formal-statement-start -->
> **命題（中心と重さの偶奇）**  
> $SL_2(\mathbb R)$ の中心は $\{I,-I\}$ である。群上の重さ $k$ の不変関数が恒等的に零でなければ $k$ は偶数である。
<!-- formal-statement-end -->

### 証明の見取り図

中心に属する行列を対角行列と上三角行列に可換と仮定し、成分を絞ります。次に $-I=k_\pi$ が左不変性にも右回転にも現れることを利用します。

<!-- proof-start -->
### 証明

中心の元を $u=\begin{pmatrix}a&b\\c&d\end{pmatrix}$ とします。$D=\operatorname{diag}(2,1/2)\in G$ に対して $uD=Du$ を比較すると $b/2=2b$、$2c=c/2$ なので $b=c=0$ です。さらに $T=\begin{pmatrix}1&1\\0&1\end{pmatrix}\in G$ に対し

$$
uT=\begin{pmatrix}a&a\\0&d\end{pmatrix},\qquad
Tu=\begin{pmatrix}a&d\\0&d\end{pmatrix}.
$$

従って $a=d$ となり、行列式1より $a^2=1$ です。逆に $\pm I$ はどの行列とも可換なので中心はこの二元です。

[群上の重さ付き不変関数の二条件](#def-afr1-weight-space)を、$\gamma=-I\in\Gamma$ と $\theta=\pi$ に適用すると

$$
\Phi(g)=\Phi((-I)g)=\Phi(gk_\pi)=(-1)^k\Phi(g).
$$

奇数 $k$ では全ての $g$ で $2\Phi(g)=0$ です。非零関数なら $k$ は偶数に限られます。
<!-- proof-end -->

これは MF2 の[奇数重さの消滅](../../MF/MF2/index.md#prop-mf2-basic-properties)の群上での読み替えです。偶数であれば中心による矛盾がない、というだけで、全ての偶数重さに非零の正則モジュラー形式が存在するという主張ではありません。

## 4. 正則性とカスプ条件はどこへ行くか

変換則だけの関数空間は大きすぎます。群上の関数から復元した $y^{-k/2}\Phi(s(x+iy))$ が正則かどうかを別途調べなければ、古典的なモジュラー形式にはなりません。また無限遠での条件も必要です。[モジュラー形式の定義](../../MF/MF2/index.md#def-mf2-modular-form)で $M_k(SL_2(\mathbb Z))$ は上半平面で正則、重さ $k$ の変換則を満たし、$q=0$ まで正則に延長できる関数全体でした。[q展開とカスプ形式](../../MF/MF2/index.md#def-mf2-q-expansion)ではこの延長の冪級数の係数を $a_n$（$n$ は非負整数）と書き、定数項 $a_0=0$ をカスプ形式の条件としました。

<a id="prop-afr1-cusp-growth"></a>
<!-- formal-statement-start -->
> **命題（正則形式とカスプ条件の群上での読み替え）**  
> $k\ge0$ を整数とし、$f\in M_k(SL_2(\mathbb Z))$ の持ち上げを $\Phi_f$ とする。$q=e^{2\pi iz}$、$f(z)=\sum_{n\ge0}a_nq^n$ と書く。このとき $y\to\infty$ において、$x,\theta$ に関して一様に
>
$$
y^{-k/2}e^{-ik\theta}\Phi_f(s(x+iy)k_\theta)\longrightarrow a_0.
$$
>
> 特に $f$ がカスプ形式であることと、この極限が0であることは同値である。カスプ形式ならある定数 $C,Y>0$ が存在し、全 $y\ge Y$ で
>
$$
|\Phi_f(s(x+iy)k_\theta)|\le C y^{k/2}e^{-2\pi y}
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

[持ち上げの対応](#thm-afr1-lift)で回転因子と高さ因子を取り除けば元の $q$ 冪級数です。カスプでの消滅は $q$ が一つ以上掛かっていることに対応します。

<!-- proof-start -->
### 証明

$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}\in\Gamma$ では $j(T,z)=1$ なので $f(z+1)=f(z)$ です。[周期正則関数のq表示](../../MF/MF2/index.md#thm-mf2-q-coordinate)により、まず穿孔円板 $0<|q|<1$ の正則関数 $F$ が存在して $f(x+iy)=F(q)$ となります。さらに $f\in M_k$ という[定義の仮定](../../MF/MF2/index.md#def-mf2-modular-form)により $F$ は原点まで正則に延長し、$F(0)=a_0$ です。

$q=e^{2\pi ix}e^{-2\pi y}$ なので $|q|=e^{-2\pi y}$ は $x$ に依存しません。任意の $\varepsilon>0$ に対して原点での連続性から $|q|<\delta$ なら $|F(q)-F(0)|<\varepsilon$ となる $\delta\in(0,1)$ が存在します。$y>(-\log\delta)/(2\pi)$ なら全 $x$ でこの条件が成立し、一様収束が従います。[持ち上げの対応](#thm-afr1-lift)で左辺が $f(x+iy)$ に等しいため、回転角についても一様です。

[カスプ形式の定義](../../MF/MF2/index.md#def-mf2-q-expansion)によって、ここでは $a_0=0$ が必要十分条件です。

この場合 $F(q)=qH(q)$ と書け、$H$ は原点を含む円板上正則です。例えば閉円板 $|q|\le1/2$ 上で連続なので有界であり、正の上界を $C$ とします（例えば $C=1+\max_{|q|\le1/2}|H(q)|$）。$Y=(\log2)/(2\pi)$ と取れば $y\ge Y$ に対して

$$
|f(x+iy)|=|qH(q)|\le Ce^{-2\pi y}.
$$

$|e^{ik\theta}|=1$ と持ち上げの座標式により求める不等式が従います。
<!-- proof-end -->

重さ4の $E_4$ では [Eisenstein級数のモジュラー性](../../MF/MF2/index.md#thm-mf2-eisenstein-modularity)により $a_0=1$ なので、[カスプ条件の読み替え](#prop-afr1-cusp-growth)から、群上では高さを大きくすると $|\Phi_{E_4}(s(iy))|/y^2\to1$ です。

重さ12の [モジュラー判別式](../../MF/MF2/index.md#def-mf2-discriminant) $\Delta$ では定数項0なので [カスプ形式の評価](#prop-afr1-cusp-growth)から $|\Phi_\Delta(s(iy))|\le Cy^6 e^{-2\pi y}$ です。同じ左不変性を持つ二つの関数でも無限遠での振る舞いは異なります。

重さ0の不変関数が正則とは限らないことも直接確認できます。MF2の [$j$ 不変量の群不変性](../../MF/MF2/index.md#thm-mf2-j-properties)を使い、ここだけ $J(z)$ と書くと

$$
u(z)=\frac{|J(z)|^2}{1+|J(z)|^2}
$$

は $\Gamma$ 不変で、実数値かつ有界です。$J$ は無限遠に極を持つ一方、上半平面では有限なので $u$ は非定数です。

実数値の関数 $u(x+iy)$ を複素関数の実部と見れば虚部は恒等的に0です。もし正則なら [Cauchy–Riemann 必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)で

$$
\frac{\partial u}{\partial x}=0,\qquad
\frac{\partial u}{\partial y}=0
$$

となります。ここで $\partial/\partial x$ は $y$ を固定、$\partial/\partial y$ は $x$ を固定した微分です。任意の二点は上半平面内で水平・垂直な線分で結べるので、それぞれの線分に沿って値が一定、従って全体で定数になります。従って $u$ は正則ではありません。

非正則の関数を扱う余地があることが、次講で学ぶ Maass 形式の入口になります。ただし $u$ が Maass 形式であるとはまだ言えません。次講で固有方程式を導入します。

## 5. 演習と詳細解答

#### A1. 変換因子の直接計算

$g=\begin{pmatrix}1&2\\0&1\end{pmatrix}$、$h=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ とする。$h\cdot i$、$gh\cdot i$、$j(gh,i)$ を求め、積法則を確認せよ。

- Level: A
- ID: AFR1-A1

<!-- solution-start -->
**詳細解答**　両行列の行列式は1です。$h\cdot i=-1/i=i$、$gh=\begin{pmatrix}2&-1\\1&0\end{pmatrix}$ なので $gh\cdot i=(2i-1)/i=2+i$ です。下段から $j(gh,i)=i$。一方 $j(h,i)=i$、$j(g,h\cdot i)=1$ なので積は $1\cdot i=i$ となり [積法則](#prop-afr1-factor)と一致します。
<!-- solution-end -->

#### A2. 点と回転を取り出す

$g=\begin{pmatrix}0&-3\\1/3&0\end{pmatrix}$ を $s(z)k_\theta$ と表示せよ。

- Level: A
- ID: AFR1-A2

<!-- solution-start -->
**詳細解答**　行列式は1です。$g\cdot i=-3/(i/3)=9i$ なので、[実行列の表示定理](#thm-afr1-coordinates)に従い $s(9i)=\operatorname{diag}(3,1/3)$ を取ります。

$$
s(9i)^{-1}g
=\begin{pmatrix}1/3&0\\0&3\end{pmatrix}
\begin{pmatrix}0&-3\\1/3&0\end{pmatrix}
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}=k_{-\pi/2}.
$$

従って $g=s(9i)k_{-\pi/2}$ です。角度は $2\pi$ の整数倍を加えても同じ行列になります。
<!-- solution-end -->

#### A3. 回転に対する重さ

重さ6の変換則を満たす $f$ について $f(2i)=3$ と仮定する。このとき $\Phi_f(s(2i)k_{\pi/6})$ を求めよ。

- Level: A
- ID: AFR1-A3

<!-- solution-start -->
**詳細解答**　[持ち上げの対応](#thm-afr1-lift)に $y=2,k=6,\theta=\pi/6$ を代入すると

$$
2^{6/2}e^{6i\pi/6}\cdot3=8(-1)\cdot3=-24.
$$

回転の前の値は24で、点自体は $2i$ のままです。
<!-- solution-end -->

#### A4. 奇数重さと中心

左不変な関数 $\Phi$ が右回転で $e^{3i\theta}$ 倍されるとする。$\Phi$ が恒等的に零となることを二つの変換則から示せ。

- Level: A
- ID: AFR1-A4

<!-- solution-start -->
**詳細解答**　[重さ付き不変関数の定義](#def-afr1-weight-space)の左条件を $\gamma=-I\in\Gamma$ に適用すると $\Phi((-I)g)=\Phi(g)$。$k_\pi=-I$ は全行列と可換なので $(-I)g=gk_\pi$。右回転条件では $\Phi(gk_\pi)=e^{3i\pi}\Phi(g)=-\Phi(g)$ です。よって $\Phi(g)=-\Phi(g)$、複素数上では2で割れるため $\Phi(g)=0$。$g$ は任意なので恒等的に零です。
<!-- solution-end -->

#### B1. 固定点と群上の零点

$f$ が重さ6の変換則を満たすとする。$S=\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ の作用から $f(i)=0$ を示し、群上の条件からも $\Phi_f(I)=0$ を示せ。

- Level: B
- ID: AFR1-B1

<!-- solution-start -->
**詳細解答**　$S\cdot i=i$、$j(S,i)=i$ です。仮定した変換則に代入すると $f(i)=i^6f(i)=-f(i)$ なので $f(i)=0$ です。

群上では $S=k_{-\pi/2}\in\Gamma\cap K$。[重さ付き不変関数の定義](#def-afr1-weight-space)の左不変性で $\Phi_f(S)=\Phi_f(I)$、右回転で $\Phi_f(S)=e^{-3\pi i}\Phi_f(I)=-\Phi_f(I)$ です。従って $\Phi_f(I)=0$。

また $j(I,i)=1$ なので [持ち上げの対応](#thm-afr1-lift)で両者は同じ値です。中心だけでは偶数重さ6は排除されませんが、固定点 $i$ ではさらに $S$ が制約を課します。
<!-- solution-end -->

#### B2. 高さを変える行列

$z=x+iy$、$\gamma=S$ とする。$w=\gamma\cdot z$ の実部・虚部を計算し、$s(w)^{-1}\gamma s(z)$ が回転行列であることを成分で確かめよ。

- Level: B
- ID: AFR1-B2

<!-- solution-start -->
**詳細解答**　$z\in\mathbb H$ なので $y>0$、従って $r=\sqrt{x^2+y^2}>0$ です。分子と分母に $\overline z$ を掛けると

$$
w=-1/z=-x/r^2+i y/r^2.
$$

[実行列の表示定理](#thm-afr1-coordinates)の $s$ に $w$ の実部 $-x/r^2$ と虚部 $y/r^2$ を代入します。$r>0$ なので $\sqrt{y/r^2}=\sqrt y/r$ です。従って

$$
s(w)=\begin{pmatrix}\sqrt y/r&-x/(r\sqrt y)\\0&r/\sqrt y\end{pmatrix},
\quad
s(w)^{-1}=\begin{pmatrix}r/\sqrt y&x/(r\sqrt y)\\0&\sqrt y/r\end{pmatrix}.
$$

また

$$
S s(z)=\begin{pmatrix}0&-1/\sqrt y\\\sqrt y&x/\sqrt y\end{pmatrix}.
$$

積を成分ごとに計算すると左上は $x/r$、右上は $-r/y+x^2/(ry)=-y/r$、左下は $y/r$、右下は $x/r$ です。従って

$$
s(w)^{-1}S s(z)=
\begin{pmatrix}x/r&-y/r\\y/r&x/r\end{pmatrix}.
$$

$(x/r)^2+(-y/r)^2=1$ なので $\cos\theta=x/r$、$\sin\theta=-y/r$ と取れ、[回転部分群の定義](#def-afr1-rotation)を満たします。
<!-- solution-end -->

#### B3. カスプでの高さの効果

$f$ が重さ12のカスプ形式で、$q$ 展開が $f=q+O(q^2)$ とする。$y\to\infty$ のとき $e^{2\pi y}y^{-6}\Phi_f(s(iy))$ の極限を求めよ。定数項が1の正則形式なら $y^{-6}\Phi_f(s(iy))$ の極限はどうなるか。

- Level: B
- ID: AFR1-B3

<!-- solution-start -->
**詳細解答**　$z=iy$ で $q=e^{-2\pi y}>0$ です。$O(q^m)$ は $q\to0$ で絶対値が定数倍の $|q|^m$ 以下となる項を表します。[持ち上げの対応](#thm-afr1-lift)より $\Phi_f(s(iy))=y^6 f(iy)$。したがって

$$
e^{2\pi y}y^{-6}\Phi_f(s(iy))
=q^{-1}(q+O(q^2))=1+O(q)\to1.
$$

定数項1なら $f(iy)=1+O(q)$ なので $y^{-6}\Phi_f(s(iy))=f(iy)\to1$ です。二つの極限は規格化が異なります。前者では指数減衰まで相殺して先頭係数を読み取り、後者では高さの冪だけを除いて定数項を読み取っています。
<!-- solution-end -->

#### C1. 実行列上の関数から元の変換則を復元する

$\Phi:G\to\mathbb C$ が左不変で、$\Phi(gk_\theta)=e^{4i\theta}\Phi(g)$ とする。$f(x+iy)=y^{-2}\Phi(s(x+iy))$ と置く。

1. $f(z+1)=f(z)$ を示せ。
2. $f(-1/z)=z^4 f(z)$ を、B2の回転行列を使って導け。
3. $\Phi$ の左不変性と右回転条件だけから $f$ が正則であると結論してよいか。

- Level: C
- ID: AFR1-C1

<!-- solution-start -->
**詳細解答**

**（1）平行移動の変換則**

$T=\begin{pmatrix}1&1\\0&1\end{pmatrix}\in\Gamma$ とすると

$$
T s(z)=\begin{pmatrix}\sqrt y&(x+1)/\sqrt y\\0&1/\sqrt y\end{pmatrix}=s(z+1).
$$

$z+1$ の虚部は $y$ であり、左不変性により $f(z+1)=y^{-2}\Phi(Ts(z))=y^{-2}\Phi(s(z))=f(z)$。

**（2）反転の変換則**

演習B2で求めた回転行列より $S s(z)=s(w)k_\theta$、$w=-1/z$、$e^{i\theta}=(x-iy)/r=\overline z/r$、$\operatorname{Im}w=y/r^2$ を得ました。左不変性と右回転条件から

$$
\Phi(s(z))=\Phi(Ss(z))=e^{4i\theta}\Phi(s(w)).
$$

従って $\Phi(s(w))=e^{-4i\theta}\Phi(s(z))$ です。復元式に代入して

$$
\begin{aligned}
f(w)&=(y/r^2)^{-2}e^{-4i\theta}\Phi(s(z))\\
&=r^4(z/r)^4 y^{-2}\Phi(s(z))\\
&=z^4 f(z).
\end{aligned}
$$

ここで $e^{-i\theta}=z/r$ を用いました。これは [持ち上げの対応](#thm-afr1-lift)の逆方向を $S$ について具体化した計算です。

**（3）正則性の判定**

正則性は結論できません。本文の非定数実数値不変関数 $u=|J|^2/(1+|J|^2)$ と [Eisenstein級数](../../MF/MF2/index.md#thm-mf2-eisenstein-modularity) $E_4$ の積 $f_*=uE_4$ は重さ4の変換則を満たします。実際に $u(\gamma\cdot z)=u(z)$ と $E_4(\gamma\cdot z)=j(\gamma,z)^4E_4(z)$ を掛ければ

$$
f_*(\gamma\cdot z)=j(\gamma,z)^4 f_*(z).
$$

もし $f_*$ が正則なら、$E_4\ne0$ の開集合で商 $f_*/E_4=u$ は正則です。$E_4$ は定数項1なので恒等的に零ではなく、[零点の孤立性](../../../解析系/CA/CA3/index.md#thm-ca3-isolated-zeros-identity)によりその零点は孤立します。よってその補集合は稠密です。

この補集合上で [Cauchy–Riemann 必要条件](../../../解析系/CA/CA1/index.md#thm-ca1-cr-necessary)を実数値の正則関数 $u$ に適用すると両偏微分は0です。$u$ は $J$ が正則で分母が正であることから滑らかなので、偏微分の連続性により全上半平面で両偏微分は0。連結性から $u$ は定数となり矛盾します。

従って $f_*$ は正則ではありません。[持ち上げの対応](#thm-afr1-lift)はこの $f_*$ からも二つの変換則を満たす群上の関数を作るので、二条件だけでは正則性が保証されないことが分かります。
<!-- solution-end -->

## 6. 次講への接続

上半平面上の重さ付き変換則を、群上の左不変性と右回転の条件へ移せました。古典的な正則形式は復元された関数の正則性と無限遠の条件によって選ばれます。次の AFR2 では、正則性とは異なる選別条件として双曲計量から得られる Laplace 作用素の固有方程式を導入し、Maass 形式に進みます。

### 参考文献

- Daniel Bump, *Automorphic Forms and Representations*, Cambridge University Press（古典的形式と実群上の形式の対応）。
- Stephen Gelbart, *Automorphic Forms on Adele Groups*, Princeton University Press（群上の形式から大域的な表現への接続）。
