# LREP24 質量零little group

<!-- definition-example-audit: strict -->

前講の[正質量の静止安定化群](../LREP23/index.md#thm-lrep23-rest-group)は、粒子を静止させても残る空間回転でした。質量零の粒子は静止運動量へ移せません。では、光の進行方向を保つ変換は回転だけでしょうか。実は、光的運動量を変えない二つの独立な変換がさらに残ります。その作用を物理的内部空間でどう選ぶかがヘリシティを決めます。

[共通の符号規約](../../../../../dream-theater-lorentz-conventions.md)に従い、$c=\hbar=1$、$\eta=\operatorname{diag}(-1,1,1,1)$ とします。行列は右から先に作用させます。

## 1. 光的運動量を固定する行列

[未来円錐のLorentz軌道](../LREP22/index.md#thm-lrep22-orbits)より、原点を除く未来光円錐上の点はすべて $k=(1,0,0,1)$ からLorentz変換で到達できます。そこでまずこの標準点を固定する群だけを求めます。

$G=SO^+(1,3)$、$\pi:SL(2,\mathbb C)\to G$ を[二重被覆](../LREP10/index.md#thm-lrep10-double-cover)とします。[運動量のlittle group](../LREP23/index.md#def-lrep23-little-group)に従い、四次元側・被覆側の固定群を

$$
G_k=\{\Lambda\in G:\Lambda k=k\},\qquad
\widetilde G_k=\{A\in SL(2,\mathbb C):\pi(A)k=k\}
$$

と書きます。$\pi$ はLREP10の $\Phi$ と同じ写像です。$I_n$ は $n$ 次単位行列、$\dagger$ は共役転置です。

[四元ベクトルのエルミート行列模型](../LREP10/index.md#def-lrep10-hermitian-model)では

$$
H(t,x,y,z)=\begin{pmatrix}t+z&x-iy\\x+iy&t-z\end{pmatrix},
\qquad H(k)=\begin{pmatrix}2&0\\0&0\end{pmatrix}.
$$

静止運動量の模型は正定値でしたが、今は階数1です。従って全列を直交規格化する必要がなく、第2列に自由度が残ります。

<a id="thm-lrep24-null-stabilizer"></a>

<!-- formal-statement-start -->
> **定理（光的標準運動量の被覆固定群）**
> $k=(1,0,0,1)$ の被覆固定群は次の行列全体である。

$$
\widetilde G_k=
\left\{\begin{pmatrix}a&b\\0&a^{-1}\end{pmatrix}:
|a|=1,\ b\in\mathbb C\right\}.
$$

> 各元は、$\theta$ を $4\pi$ 周期、$w\in\mathbb C$ として、次の形に一意に分解できる。

$$
N(w)R(\theta),\quad
N(w)=\begin{pmatrix}1&w\\0&1\end{pmatrix},
\quad R(\theta)=\operatorname{diag}(e^{-i\theta/2},e^{i\theta/2}).
$$
<!-- formal-statement-end -->

**証明の見取り図。** $H(k)$ との合同積は第1列の外積だけで決まります。第1列の形を固定した後、行列式1を使って第2列の下成分を決めます。

<!-- proof-start -->
### 証明

$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}\in SL(2,\mathbb C)$ とします。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)と $H$ の単射性により、固定条件は

$$
AH(k)A^\dagger
=2\begin{pmatrix}|a|^2&a\overline c\\c\overline a&|c|^2\end{pmatrix}
=\begin{pmatrix}2&0\\0&0\end{pmatrix}
$$

です。右下成分から $c=0$、左上成分から $|a|=1$。この二条件で非対角成分も零になります。行列式の条件 $ad-bc=1$ は $ad=1$ となるので $d=a^{-1}$ です。

逆にこの形なら行列式1であり、上の合同積は $H(k)$ に一致します。よって必要十分です。

$a=e^{-i\theta/2}$ と表すと $\theta$ は $4\pi$ を法として一意です。積

$$
N(w)R(\theta)=
\begin{pmatrix}a&wa^{-1}\\0&a^{-1}\end{pmatrix}
$$

の右上成分を $b$ に等しくするには $w=ab$ とする必要があり、これで一意に定まります。$\square$
<!-- proof-end -->

例えば $N(1)$ は $k$ を固定しますが、

$$
N(1)N(1)^\dagger=\begin{pmatrix}2&1\\1&1\end{pmatrix}\ne I_2.
$$

従って[ユニタリ作用素](../../../基礎科目/LA/LA5/index.md#def-la5-unitary)ではありません。ここに正質量の固定群との違いが現れます。

## 2. 平面の回転と並進の群

平面を複素数 $\zeta=x-iy$ で表します。角度 $\theta$ の能動回転はこの記法で $\zeta\mapsto e^{-i\theta}\zeta$ です。積を展開すると

$$
e^{-i\theta}(x-iy)
=(x\cos\theta-y\sin\theta)-i(x\sin\theta+y\cos\theta).
$$

従って実標準基底での回転行列は

$$
Q_\theta=\begin{pmatrix}\cos\theta&-\sin\theta\\
\sin\theta&\cos\theta\end{pmatrix}.
$$

等長変換とは二点間の距離を保つ全単射です。向きを保つとは、正の向きの三角形の向きを逆転させないことです。平行移動は二点間の差を変えません。線形部分の行列の列は基底ベクトルの像であり、その行列式が正なら向きが保たれます。[特殊直交群](../../LIE/LIE3/index.md#def-lie3-orthogonal-groups)の条件 $Q_\theta^{\mathsf T}Q_\theta=I_2$ と $\det Q_\theta=1$ は、距離と向きをともに保つことに対応します。

平面の点を回転させてから平行移動すると、二つのパラメータの組が自然に現れます。

<a id="def-lrep24-plane-motion"></a>

<!-- formal-statement-start -->
> **定義（平面の向きを保つ等長変換群）**
> $ISO(2)$ を、$w\in\mathbb C$、$\theta\in\mathbb R/(2\pi\mathbb Z)$ による平面写像

$$
f_{w,\theta}(\zeta)=e^{-i\theta}\zeta+w
$$

> 全体の合成群とする。$\theta=0$ の部分群が平面の並進部分である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep24-plane-motion -->
**定義の確認**。 $w=1$、$\theta=\pi/2$ の場合 $f(\zeta)=-i\zeta+1$ です。二点間の差は $-i(\zeta_1-\zeta_2)$ となり、その絶対値は元の距離に一致します。実座標では $f(x-iy)=(1-y)-ix$ です。原点の像 $(1,0)$ を引いた標準基底の像は $(0,1),(-1,0)$ なので、

$$
Q_{\pi/2}=\begin{pmatrix}0&-1\\1&0\end{pmatrix},
\qquad Q_{\pi/2}^{\mathsf T}Q_{\pi/2}=I_2,\quad
\det Q_{\pi/2}=1.
$$

従って距離だけでなく向きも保ちます。逆写像は $\zeta\mapsto i(\zeta-1)$ であり、全単射です。

一般に二つの写像を合成すると

$$
f_{w,\theta}(f_{v,\phi}(\zeta))
=e^{-i(\theta+\phi)}\zeta+w+e^{-i\theta}v.
$$

恒等元は $(0,0)$、逆元は $(-e^{i\theta}w,-\theta)$ となるので群の条件も確かめられます。角度は $2\pi$ を加えても写像が同じです。
<!-- definition-example-end -->

これで向きを保つ等長変換をすべて記述できる理由も確かめます。任意のそのような等長変換 $F$ に対し、$T(\boldsymbol x)=F(\boldsymbol x)-F(0)$ とすれば $T(0)=0$ で距離を保存します。内積は

$$
2\langle\boldsymbol x,\boldsymbol y\rangle
=|\boldsymbol x|^2+|\boldsymbol y|^2-|\boldsymbol x-\boldsymbol y|^2
$$

から距離だけで決まるので、$T$ は内積を保存します。標準基底 $\boldsymbol e_1,\boldsymbol e_2$ の像は正規直交基底となり、$T(\boldsymbol x)$ のこの基底での成分は $\langle T(\boldsymbol x),T(\boldsymbol e_j)\rangle=x_j$ です。従って $T(\boldsymbol x)=x_1T(\boldsymbol e_1)+x_2T(\boldsymbol e_2)$ となり、$T$ は線形直交変換です。向きを保つ条件から行列式は1、第1列が $(\cos\theta,\sin\theta)^{\mathsf T}$ なら第2列は $(-\sin\theta,\cos\theta)^{\mathsf T}$ です。よって $F$ は先の回転と並進の形になります。

光的運動量の被覆固定群もこの合成則を持ちます。ただし角度の周期だけが異なります。

<a id="thm-lrep24-iso2"></a>

<!-- formal-statement-start -->
> **定理（質量零固定群と平面運動群）**
> 光的標準運動量 $k=(1,0,0,1)$ の被覆固定群の座標 $(w,\theta)$ を $N(w)R(\theta)$ で定める。角度は $4\pi$ 周期で、積は

$$
(w,\theta)(v,\phi)=(w+e^{-i\theta}v,\theta+\phi)
$$

> である。四次元側の固定群 $G_k$ は $ISO(2)$ と同型であり、被覆の核は $(0,0),(0,2\pi)$ である。
<!-- formal-statement-end -->

**証明の見取り図。** 回転を並進の右側へ移すときに、並進パラメータそのものが回転します。この関係が平面の合成則を作ります。

<!-- proof-start -->
### 証明

[光的標準運動量の被覆固定群](#thm-lrep24-null-stabilizer)の行列を掛けると

$$
R(\theta)N(v)R(\theta)^{-1}
=\begin{pmatrix}1&e^{-i\theta}v\\0&1\end{pmatrix}
=N(e^{-i\theta}v).
$$

また $N(w)N(v)=N(w+v)$、$R(\theta)R(\phi)=R(\theta+\phi)$ です。従って

$$
\begin{aligned}
N(w)R(\theta)N(v)R(\phi)
&=N(w)N(e^{-i\theta}v)R(\theta+\phi)\\
&=N(w+e^{-i\theta}v)R(\theta+\phi).
\end{aligned}
$$

$\pi$ の全射性により任意の $\Lambda\in G_k$ の持ち上げ $A$ が存在し、$\pi(A)k=k$ なので $A\in\widetilde G_k$ です。[二重被覆](../LREP10/index.md#thm-lrep10-double-cover)の核 $\{I_2,-I_2\}$ はここでは $(0,0),(0,2\pi)$ に対応します。

写像 $(w,\theta)\mapsto f_{w,\theta}$ は上の積と[平面の向きを保つ等長変換群](#def-lrep24-plane-motion)の合成則から準同型です。すべての $f_{w,\theta}$ が得られ、恒等写像になる条件は $w=0$ かつ $e^{-i\theta}=1$ です。従って核は $\pi$ の核と同じです。

$\pi(A)=\pi(B)$ と $f_A=f_B$ はともに $B^{-1}A$ がこの核に属することと同値です。よって $\pi(A)\mapsto f_A$ は一意に定まり、全単射かつ準同型です。$\square$
<!-- proof-end -->

被覆側は平面の並進部分と $4\pi$ 周期の回転部分の半直積です。例えば $R(\pi)N(1)=N(-1)R(\pi)$ であり、一般に二部分は可換ではありません。

ここでいう並進は時空の平行移動ではありません。四次元側では原点を固定する線形Lorentz変換です。実際、$w=a-ib$（$a,b$ は実数）、$u=t+z$、$v=t-z$、$\zeta=x-iy$ とすると

$$
N(w)H(t,x,y,z)N(w)^\dagger
=\begin{pmatrix}
u+w\overline\zeta+\overline w\zeta+|w|^2v & \zeta+wv\\
\overline\zeta+\overline wv & v
\end{pmatrix}.
$$

したがって $N(w)$ による変換は

$$
v'=v,\quad x'=x+av,\quad y'=y+bv,
$$

$$
u'=u+2ax+2by+(a^2+b^2)v.
$$

ここでプライムは微分ではなく変換後の座標を表し、$t'=(u'+v')/2$、$z'=(u'-v')/2$ です。$k$ では $u=2$、$v=x=y=0$ なので全成分が固定されます。横方向の基底 $e_1=(0,1,0,0)$ では $u=v=y=0$、$x=1$ なので $u'=2a$、$v'=0$ です。従って像は $(a,1,0,a)=e_1+ak$ です。同じ運動量を固定しても他のベクトルには作用することが分かります。後に光子の偏極を扱う際、この差が重要になります。

## 3. 並進が恒等作用なら何が残るか

群の行列 $N(w)$ 自体が非自明であることと、状態空間上の表現 $D(N(w))$ が非自明であることは別です。内部状態に対して[不変正定値Hermite内積を持つユニタリ表現](../LREP2/index.md#def-lrep2-invariant-inner-product)を選び、その中で並進が全状態を変えない場合をまず調べます。

角度を $\theta$ だけ増す回転に対し、状態の位相が $e^{-ih\theta}$ になるとき、その実数 $h$ は運動方向に沿った角運動量の量子数です。この符号は[角運動量演算子](../LREP7/index.md#def-lrep7-angular-momentum)の回転を $e^{-i\theta J_3}$ とする約束に対応します。[Diracスピノルのヘリシティ](../LREP16/index.md#def-lrep16-helicity)でも運動方向が正の $z$ 軸なら回転生成子 $J_3$ の固有値を測りました。ここではDirac場の係数に限らず、固定群が作用する物理的内部空間を対象とします。

<a id="def-lrep24-helicity-rep"></a>

<!-- formal-statement-start -->
> **定義（ヘリシティの内部表現）**
> $h\in\frac12\mathbb Z$ に対し、標準光的運動量の被覆固定群の一次元複素空間上の表現を

$$
D_h(N(w)R(\theta))z=e^{-ih\theta}z,\qquad z\in\mathbb C
$$

> と定める。$h$ をこの内部表現のヘリシティ（helicity）とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep24-helicity-rep -->
**定義の確認**。 $h=m/2$（$m\in\mathbb Z$）なら角度を $4\pi$ 増しても $e^{-4\pi ih}=e^{-2\pi im}=1$ なので値は一意です。例えば $h=1/2$ ではこの条件が $e^{-2\pi i}=1$ となります。[質量零固定群と平面運動群](#thm-lrep24-iso2)の積を用いると

$$
D_h((w,\theta)(v,\phi))
=e^{-ih(\theta+\phi)}
=e^{-ih\theta}e^{-ih\phi}.
$$

各作用は複素数 $z$ へのスカラー倍なので線形です。位相の絶対値は1で、逆作用は共役の位相を掛ける操作であり、恒等元の作用は1です。標準内積 $\langle z,z'\rangle=\bar z z'$ に対して位相とその共役の積が1になるので、内積を保つ全射、すなわちユニタリ表現です。並進では $\theta=0$ なので恒等作用になります。$h=1/2$ のとき $D_h(R(2\pi))=-1$ ですが、$h=1$ なら $+1$ です。
<!-- definition-example-end -->

一次元表現が選択肢の一つであるだけでなく、並進を自明にした[既約表現](../LREP1/index.md#def-lrep1-irreducible)（非零真不変部分空間を持たない表現）ならこの形しかないことを有限次元で証明します。[表現の同値](../LREP1/index.md#def-lrep1-equivalence)は可逆な絡作用素によって作用を移せること、[降下](../LREP3/index.md#def-lrep3-descent)は被覆側の作用が四次元側の群元だけで決まることです。

<a id="thm-lrep24-helicity-classification"></a>

<!-- formal-statement-start -->
> **定理（並進自明な有限次元既約内部表現）**
> $D$ を非零有限次元複素内積空間上の $\widetilde G_k$ の滑らかな既約ユニタリ表現とし、任意の $w\in\mathbb C$ について $D(N(w))=I$ と仮定する。
>
> このとき一意な $h\in\frac12\mathbb Z$ に対して $D$ はヘリシティの内部表現 $D_h$ と同値である。四次元側の $G_k$ に降りるのは $h$ が整数の場合に限る。
<!-- formal-statement-end -->

**証明の見取り図。** 並進を消すと残るのは一つの回転パラメータです。その微分生成子を対角化すると、各固有直線は表現で不変になります。

<!-- proof-start -->
### 証明

内部空間の内積に関する正規直交基底で $U(\theta)=D(R(\theta))$ を行列表示します。プライムは回転角による成分ごとの常微分を表し、時刻微分ではありません。滑らかさより

$$
M=U'(0)=\left.\frac{dU(s)}{ds}\right|_{s=0}
$$

が存在します。群法則 $U(\theta+s)=U(\theta)U(s)$ の両辺を $\theta$ を固定して $s$ で微分し、$s=0$ とすると、左辺は連鎖律から $U'(\theta)$、右辺は $U(\theta)M$ です。

$U(s)^\dagger U(s)=I$ を実変数 $s$ で微分し、$U(0)=I$ を代入すると

$$
0=M^\dagger U(0)+U(0)^\dagger M=M^\dagger+M.
$$

従って $J=iM$ とおけば $J^\dagger=-iM^\dagger=iM=J$ なので [Hermitian作用素](../../../基礎科目/LA/LA5/index.md#def-la5-hermitian) であり、$M=-iJ$ です。$U(\theta)e^{i\theta J}$ を微分すると

$$
U(\theta)(-iJ)e^{i\theta J}+U(\theta)iJe^{i\theta J}=0.
$$

初期値は $I$ なので $U(\theta)=e^{-i\theta J}$ です。[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)により、非零有限次元の内積空間上でエルミート行列 $J$ の単位固有ベクトル $v$ と実固有値 $h$ を取れます。$J^nv=h^nv$ を行列指数関数の級数に代入すると $U(\theta)v=e^{-ih\theta}v$ です。並進作用が恒等なので $\mathbb Cv$ は固定群の全元に対して不変です。既約性から全空間が $\mathbb Cv$ です。

$R(4\pi)=I_2$ より $e^{-4\pi ih}=1$、従って $2h\in\mathbb Z$ です。写像 $z\mapsto zv$ は一次元空間から元の空間へのユニタリな絡作用素です。同値な一次元表現の位相関数は一致し、角度0での微分 $-ih$ も一致するので $h$ は一意です。

[質量零固定群と平面運動群](#thm-lrep24-iso2)の核が作用上恒等であれば、二つの持ち上げで同じ作用が得られます。逆に四次元側の表現なら核は恒等作用です。よって降下条件は

$$
D_h(R(2\pi))=e^{-2\pi ih}=1,
$$

すなわち $h\in\mathbb Z$ です。$\square$
<!-- proof-end -->

$h=1$ と $h=-1$ は異なる一次元表現です。二つのヘリシティを含む物理模型はこれらの直和であって、一つの二次元既約固定群表現ではありません。

## 4. 並進作用を非自明に選ぶ場合

なぜ有限個の内部成分だけを使うと並進が自明になるのでしょうか。鍵は、並進を表すユニタリ行列が互いに可換である一方、回転によって並進の方向を連続的に変えられることです。

<a id="thm-lrep24-finite-translation"></a>

<!-- formal-statement-start -->
> **定理（有限次元ユニタリ内部表現の並進自明性）**
> $\widetilde G_k$ の任意の非零有限次元連続ユニタリ表現 $D$ に対して

$$
D(N(w))=I\qquad(w\in\mathbb C)
$$

> が成立する。既約性は仮定しない。
<!-- formal-statement-end -->

**証明の見取り図。** 並進を同時対角化すると、各共通固有空間には並進の位相関数が対応します。回転は有限個の位相関数を置換しますが、連続的に回転するためその置換は恒等に限られます。

<!-- proof-start -->
### 証明

$T(w)=D(N(w))$、$U(\theta)=D(R(\theta))$ と置きます。$T(w+v)=T(w)T(v)=T(v)T(w)$ なので全 $T(w)$ は可換なユニタリ行列です。

同時対角化の理由を確認します。もし全行列がスカラー倍の恒等なら任意の正規直交基底が使えます。そうでなければスカラーでない一つを選びます。ユニタリ行列は正規行列なので、[複素正規作用素のスペクトル定理](../../../基礎科目/LA/LA5/index.md#thm-la5-normal-spectral)により正規直交基底で対角化し、互いに直交する固有空間に分けられます。選んだ行列を $S$、他の行列を $T$ とすれば、$Sx=\lambda x$ に対して $S(Tx)=T(Sx)=\lambda Tx$ なので各固有空間を保存します。各制限は内積を保ち、有限次元の同じ固有空間内で単射なので全射でもあり、ユニタリです。固有空間の次元は元より小さいため、次元について帰納的に同時対角化できます。

こうして共通固有値の関数 $\chi$ ごとの非零空間 $V_\chi$ が有限個得られます。$v\in V_\chi$ に対して $T(w)v=\chi(w)v$ であり、積の条件から

$$
\chi(w+v_0)=\chi(w)\chi(v_0),\quad
|\chi(w)|=1,\quad \chi(0)=1
$$

です（ここで $v_0\in\mathbb C$ は並進パラメータです）。

[質量零固定群と平面運動群](#thm-lrep24-iso2)の共役関係から

$$
T(w)U(\theta)=U(\theta)T(e^{i\theta}w).
$$

従って $x\in V_\chi$ に対して

$$
T(w)U(\theta)x=U(\theta)T(e^{i\theta}w)x
=\chi(e^{i\theta}w)U(\theta)x.
$$

よって $U(\theta)V_\chi$ は $\chi_\theta(w)=\chi(e^{i\theta}w)$ に対応する共通固有空間に入ります。

固定した単位ベクトル $v\in V_\chi$ に対し、$U(\theta)v$ は単位ベクトルで、有限個の相異なる共通固有空間のいずれかに属します。相異なる固有値関数を持つ空間は、少なくとも一つの $T(w)$ の異なる固有値に属するので直交します。よって異なる空間の単位ベクトル間の距離は $\sqrt2$ です。

$\theta\mapsto U(\theta)v$ は連続なので、近い角度で別空間に移ることはできません。実数直線は連結で、$\theta=0$ の空間は $V_\chi$ ですから全角度で同じ空間に留まります。従って $\chi_\theta=\chi$ です。

特に $\theta=\pi$ から $\chi(-w)=\chi(w)$。一方、$\chi(w)\chi(-w)=\chi(0)=1$ なので $\chi(w)^2=1$ です。任意の $w$ に対し $w/2$ にもこの結論が適用でき、

$$
\chi(w)=\chi(w/2)^2=1.
$$

全共通固有空間で固有値が1となるので $T(w)=I$ です。$\square$
<!-- proof-end -->

この証明は、有限次元であれば並進を自明とする選択が強制されることを示します。しかし一般のHilbert空間では共通固有空間が有限個という議論は使えません。

非自明な並進作用を持つ模型を実際に作りましょう。円周上の角変数 $\alpha$ に対し $\boldsymbol n(\alpha)=(\cos\alpha,\sin\alpha)$ と置きます。$w=a-ib$ を実平面ベクトル $\boldsymbol w=(a,b)$ と同一視します。$\rho>0$ を固定し、円周上の二乗可積分関数のHilbert空間を

$$
\mathcal H=L^2([0,2\pi),d\alpha/(2\pi))
$$

とします。関数はほとんど至る所で一致するものを同一視し、引数は $2\pi$ 周期で扱います。並進は方向ごとに異なる位相を掛け、回転は引数をずらします。

<a id="prop-lrep24-nontrivial-model"></a>

<!-- formal-statement-start -->
> **命題（非自明な並進を持つ円周上の内部表現）**
> $\rho>0$ とし、標準光的運動量の被覆固定群の元 $(w,\theta)$ に対し、円周上の二乗可積分関数へ

$$
(D_\rho(w,\theta)f)(\alpha)
=e^{i\rho\boldsymbol w\cdot\boldsymbol n(\alpha)}
 f(\alpha-\theta)
$$

> と作用させる。この作用は無限次元の強連続ユニタリ表現で、並進部分の作用は自明でない。
<!-- formal-statement-end -->

**証明の見取り図。** 回転で引数をずらすと位相の方向も回転するため、群の積と一致します。ノルム保存は位相の絶対値と円周積分の周期性から得られます。

<!-- proof-start -->
### 証明

実平面の回転行列を $Q_\theta$ とすると $\boldsymbol n(\alpha-\theta)=Q_{-\theta}\boldsymbol n(\alpha)$ です。ゆえに

$$
\boldsymbol v\cdot\boldsymbol n(\alpha-\theta)
=(Q_\theta\boldsymbol v)\cdot\boldsymbol n(\alpha).
$$

複素数の $e^{-i\theta}v$ が $Q_\theta\boldsymbol v$ に対応します。二回作用させると

$$
\begin{aligned}
(D_\rho(w,\theta)D_\rho(v,\phi)f)(\alpha)
&=e^{i\rho\boldsymbol w\cdot\boldsymbol n(\alpha)}
 e^{i\rho\boldsymbol v\cdot\boldsymbol n(\alpha-\theta)}
 f(\alpha-\theta-\phi)\\
&=e^{i\rho(\boldsymbol w+Q_\theta\boldsymbol v)
 \cdot\boldsymbol n(\alpha)}f(\alpha-\theta-\phi).
\end{aligned}
$$

これは[質量零固定群と平面運動群](#thm-lrep24-iso2)の積に対応します。恒等元で元の関数に戻り、逆元に対応する作用が逆作用です。回転角の $4\pi$ 周期にも矛盾しません（この模型は $2\pi$ 周期です）。

位相因子の絶対値は1なので

$$
\|D_\rho(w,\theta)f\|^2
=\int_0^{2\pi}|f(\alpha-\theta)|^2\frac{d\alpha}{2\pi}
=\|f\|^2.
$$

引数の移動は零測度集合を零測度集合へ移すため、作用は関数の同値類上でも定まります。

[強連続ユニタリ表現](../LREP21/index.md#def-lrep21-unitary-representation)で用いた条件をこの固定群にも適用します。強連続性は恒等元で確認すれば、任意の群元 $g$ と $h\to g$ に対し

$$
\|D_\rho(h)f-D_\rho(g)f\|
=\|D_\rho(g^{-1}h)f-f\|
$$

で $g^{-1}h\to e$ となるので、各点でも従います。位相因子について $|e^{is}-1|\le |s|$ より

$$
\|(D_\rho(w,\theta)-I)f\|
\le \rho|\boldsymbol w|\|f\|+\|f(\cdot-\theta)-f\|.
$$

右辺第2項は連続周期関数なら一様連続性から零へ収束します。一般の $f\in L^2$ には連続周期関数 $g$ をノルムで近似し、移動の等長性から

$$
\|f(\cdot-\theta)-f\|
\le 2\|f-g\|+\|g(\cdot-\theta)-g\|
$$

を使います。連続周期関数の密度は、区間の階段関数を $L^2$ で近似に用い、その各跳躍点の小区間を線形補間し、端点も周期的に接続することで得られます。従って[強連続ユニタリ表現](../LREP21/index.md#def-lrep21-unitary-representation)の条件が満たされます。

$f=1$、$\boldsymbol w=(1/\rho,0)$ では $D_\rho(w,0)f=e^{i\cos\alpha}$ となり、例えば $\alpha=0$ の近傍で1と異なります。従って並進は恒等作用ではありません。関数 $e^{in\alpha}$（$n\in\mathbb Z$）の内積は

$$
\int_0^{2\pi} e^{i(m-n)\alpha}\frac{d\alpha}{2\pi}
=\begin{cases}1&(m=n),\\0&(m\ne n)\end{cases}
$$

となるので、無限個の互いに直交する単位ベクトルが存在し、空間は無限次元です。$\square$
<!-- proof-end -->

この模型で並進の二方向の位相の係数は $\rho\cos\alpha$ と $\rho\sin\alpha$ であり、その二乗和は $\rho^2$ です。回転はこの係数の方向を連続的に動かします。これが連続スピン表現につながる仕組みです。$\rho=0$ にすると並進は恒等になり、各 $e^{in\alpha}$ は回転で $e^{-in\theta}$ 倍されます。

ここでは固定群上の非自明な表現を構成しました。連続スピン表現の全分類やPoincare群の既約1粒子表現の構成は、この命題だけからは結論しません。次講では固定群の表現から運動量の異なる状態を組み合わせる方法を扱います。

## 5. 演習

### Level A

<a id="ex-lrep24-a01"></a>

#### LREP24-A01 固定群の判定
- Level: A
- ID: LREP24-A01

$k=(1,0,0,1)$ とし、$A=\begin{pmatrix}i&2\\0&-i\end{pmatrix}$、$B=\operatorname{diag}(2,1/2)$ が被覆固定群に属するか求めよ。属するなら $(w,\theta)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 両者の行列式は1である。[光的標準運動量の被覆固定群](#thm-lrep24-null-stabilizer)より $A$ は左上成分の絶対値1、左下成分0を満たす。$a=i=e^{-i(-\pi)/2}$ なので $\theta=-\pi$（$4\pi$ 周期）、$w=ab=2i$ である。

$B$ は左上成分の絶対値2なので固定群に属さない。実際 $BH(k)B^\dagger=\operatorname{diag}(8,0)=4H(k)$ となり、方向は保つが運動量そのものは固定しない。
<!-- solution-end -->

<a id="ex-lrep24-a02"></a>

#### LREP24-A02 平面運動の合成
- Level: A
- ID: LREP24-A02

被覆固定群の座標で $g=(2,\pi/2)$、$h=(1+i,\pi)$ とする。$gh$ と $g^{-1}$ を求めよ。

<!-- solution-start -->
**詳細解答。** [質量零固定群と平面運動群](#thm-lrep24-iso2)の積では $e^{-i\pi/2}=-i$ なので

$$
gh=(2-i(1+i),3\pi/2)=(3-i,3\pi/2).
$$

逆元の並進パラメータ $v$ は $2-iv=0$ を満たすので $v=-2i$、角度は $-\pi/2$。逆順でも $-2i+e^{i\pi/2}2=0$ となる。従って $g^{-1}=(-2i,-\pi/2)$ である。
<!-- solution-end -->

<a id="ex-lrep24-a03"></a>

#### LREP24-A03 光的固定群の作用
- Level: A
- ID: LREP24-A03

$N(w)$ に $w=2-i$ を代入して $q=(1,0,0,-1)$ の像を求め、光的であることを確かめよ。

<!-- solution-start -->
**詳細解答。** $H(q)=\operatorname{diag}(0,2)$ である。[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)を使い、

$$
N(w)H(q)N(w)^\dagger
=\begin{pmatrix}2|w|^2&2w\\2\bar w&2\end{pmatrix}
=\begin{pmatrix}10&4-2i\\4+2i&2\end{pmatrix}.
$$

$t'+z'=10$、$t'-z'=2$、$x'-iy'=4-2i$ なので $q'=(6,4,2,4)$。計量を代入すると $-36+16+4+16=0$、$t'>0$ なので未来光的である。
<!-- solution-end -->

<a id="ex-lrep24-a04"></a>

#### LREP24-A04 位相と被覆
- Level: A
- ID: LREP24-A04

$h=0,1/2,-1,3/2$ について $D_h(N(3)R(2\pi))$ を求め、通常の固定群に降りるものを選べ。

<!-- solution-start -->
**詳細解答。** [ヘリシティの内部表現](#def-lrep24-helicity-rep)では並進は恒等で、位相は $e^{-2\pi ih}$。順に $1,-1,1,-1$ となる。二重被覆の核 $R(2\pi)$ が恒等作用になるのは $h=0,-1$ だけである。
<!-- solution-end -->

### Level B

<a id="ex-lrep24-b01"></a>

#### LREP24-B01 光的運動量の固定群の移送
- Level: B
- ID: LREP24-B01

$p=(3,0,0,3)$ と $B=\operatorname{diag}(\sqrt3,1/\sqrt3)$ を取る。$\pi(B)k=p$ を示し、$\widetilde G_p=B\widetilde G_kB^{-1}$ を証明せよ。さらに $BN(w)B^{-1}$ を求めよ。

<!-- solution-start -->
**詳細解答。** $B$ の行列式は1で、[SL(2,C)の四元ベクトル作用](../LREP10/index.md#def-lrep10-sl2c-action)を用いると $BH(k)B^\dagger=\operatorname{diag}(6,0)=H(p)$ なので $\pi(B)k=p$ である。

$A$ が $p$ を固定することと

$$
\pi(B^{-1}AB)k=\pi(B)^{-1}\pi(A)p=k
$$

は同値である。従って $B^{-1}AB\in\widetilde G_k$ と同値であり、両辺を $B$ と $B^{-1}$ で挟むと求める集合の等式になる。

$$
BN(w)B^{-1}=\begin{pmatrix}1&3w\\0&1\end{pmatrix}.
$$

この例では並進パラメータが3倍になるが、回転部分は対角行列同士なので変わらない。
<!-- solution-end -->

<a id="ex-lrep24-b02"></a>

#### LREP24-B02 有限次元性とユニタリ性
- Level: B
- ID: LREP24-B02

被覆固定群の自然な二次元行列表現 $D(A)=A$ において、$N(1)$ の作用を調べよ。この表現がいかなる正定値Hermite内積でもユニタリにならないことを示せ。

<!-- solution-start -->
**詳細解答。** 標準基底を $e_1,e_2$ とすると $N(1)e_1=e_1$、$N(1)e_2=e_2+e_1$ であり、並進は自明でない。

任意の正定値内積に付随するノルムを $\|\cdot\|$ とする。もしユニタリならすべての正整数 $n$ に対して

$$
\|N(1)^ne_2\|=\|e_2\|.
$$

しかし[質量零固定群と平面運動群](#thm-lrep24-iso2)の積を繰り返すと $N(1)^n=N(n)$ なので、三角不等式より

$$
\|N(n)e_2\|=\|e_2+ne_1\|
\ge n\|e_1\|-\|e_2\|.
$$

正定値性から $\|e_1\|>0$ であり、右辺は無限大へ発散する。矛盾である。[有限次元ユニタリ内部表現の並進自明性](#thm-lrep24-finite-translation)でユニタリ性を落とすと、非自明な有限次元並進を許すことが分かる。
<!-- solution-end -->

<a id="ex-lrep24-b03"></a>

#### LREP24-B03 二つのヘリシティ
- Level: B
- ID: LREP24-B03

[直和表現](../LREP4/index.md#def-lrep4-direct-sum) $D=D_1\oplus D_{-1}$ とする。角度 $\pi/3$ での回転行列を求め、既約でないこと、$D_1$ と $D_{-1}$ は同値でないことを示せ。

<!-- solution-start -->
**詳細解答。** [ヘリシティの内部表現](#def-lrep24-helicity-rep)の定義をそれぞれの成分に使うと

$$
D(R(\pi/3))=\operatorname{diag}
(e^{-i\pi/3},e^{i\pi/3}).
$$

すべての元でこの対角形式が保たれるため、例えば第1成分の直線が非零真部分表現となる。

[表現の同値](../LREP1/index.md#def-lrep1-equivalence)を判定する一次元表現間の可逆な絡作用素は非零スカラー $s$ である。絡作用の条件は $se^{-i\theta}=e^{i\theta}s$ なので $e^{-i\theta}=e^{i\theta}$ が全角度で必要になる。$\theta=\pi/3$ では虚部が反対で一致しない。従って同値ではない。
<!-- solution-end -->

### Level C

<a id="ex-lrep24-c01"></a>

#### LREP24-C01 非自明な内部並進の生成子
- Level: C
- ID: LREP24-C01

$\rho>0$ とし、第4節の円周上の表現 $D_\rho$ を考える。$f(\alpha)=e^{in\alpha}$、$n\in\mathbb Z$ に対し回転作用を求めよ。また二つの並進経路を $w_1(s)=s$、$w_2(s)=-is$（$s\in\mathbb R$）とし、それぞれの微分生成子を

$$
T_j f=\left.\frac1i\frac{d}{ds}
(D_\rho(w_j(s),0)f)\right|_{s=0},
\qquad j=1,2
$$

で定める。$f$ と $j$ を固定し、実変数 $s$ に関する $L^2$ ノルムでの微分を取る。$T_j$ の作用と $T_1^2+T_2^2$ を求めよ。$f$ の張る直線は固定群全体で不変か。

<!-- solution-start -->
**詳細解答。** [非自明な並進を持つ円周上の内部表現](#prop-lrep24-nontrivial-model)に $w=0$ を代入すると

$$
D_\rho(0,\theta)e^{in\alpha}
=e^{in(\alpha-\theta)}=e^{-in\theta}e^{in\alpha}.
$$

回転だけなら $h=n$ の位相を得る。次に $w=s$ は実平面の $(s,0)$、$w=-is$ は $(0,s)$ である。対応する位相は $e^{i\rho s\cos\alpha}$ と $e^{i\rho s\sin\alpha}$ なので

$$
T_1 f=\rho\cos\alpha\, f,\qquad
T_2 f=\rho\sin\alpha\, f.
$$

[強微分による生成作用素](../../../解析系/QM/QM7/index.md#def-qm7-generator)と同様に、各 $f$ を固定した差商のノルム極限を取る（ここでは位相の符号に合わせて $1/i$ を掛ける）。微分は $L^2$ ノルムでも成立する。実数 $b$ に対して $|e^{isb}-1-isb|\le s^2 b^2/2$ で、ここでは $|b|\le\rho$ だから差商の誤差ノルムは $|s|\rho^2\|f\|/2$ 以下となる。

各作用は関数の各点に実数係数を掛ける操作である。係数の絶対値が $\rho$ 以下だから、$\|T_jf\|\le\rho\|f\|$ であり、二回作用させても定義域は全 $\mathcal H$ のままである。従って

$$
(T_1^2+T_2^2)f
=\rho^2(\cos^2\alpha+\sin^2\alpha)f=\rho^2f.
$$

さらに

$$
T_1e^{in\alpha}=\frac\rho2
(e^{i(n+1)\alpha}+e^{i(n-1)\alpha}).
$$

右辺の二つの関数は元の関数と直交し、係数は非零である。もし元の直線がすべての並進に対して不変なら、その差商も直線に入り、閉部分空間なので極限も入るはずである。上の計算はこれに反する。よって固定群全体では不変でない。有限個のヘリシティだけを持つ場合との違いが、並進生成子による隣接する回転固有値の結合として現れる。
<!-- solution-end -->

## 6. まとめ

正質量では内部変換は三次元回転の被覆 $SU(2)$ であり、スピン $j$ に対して $2j+1$ 次元の既約内部空間を得ました。質量零では平面の回転・並進型の群が残り、並進作用を自明にすることで一次元のヘリシティ表現が得られます。非自明な並進を許す場合は有限次元のユニタリ表現では足りません。

次講では、選んだ固定群表現を運動量軌道全体の波束へ広げます。
