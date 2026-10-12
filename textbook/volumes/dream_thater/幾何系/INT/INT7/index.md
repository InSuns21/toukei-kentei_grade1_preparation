# INT7 twist mapとPoincaré–Birkhoff

[INT3の作用角変数](../INT3/index.md#def-int3-action-angle)では可積分Hamilton系の軌道をトーラス上の直線運動として表し、[INT5の共鳴正規形](../INT5/index.md#def-int5-resonant-projection)では共鳴付近に振り子型の運動が現れました。しかし連続時間の軌道を毎回追っていると、周期軌道が摂動によって何本現れるかを調べにくくなります。

そこで横断面を一度通過してから次に戻るまでを**一回の写像**とします。面積を保つ写像でも、回転角が作用方向に変わる（twistする）と、境界の回転方向が反対になる場所に固定点が現れます。本章ではこの構造をHamilton流から導き、Poincaré–Birkhoffの定理の**単調twist版**を生成関数から完全に証明します。境界だけでtwistを要求する一般形との区別、$q$回反復の条件、共鳴周期点と周期軌道の違いまで確認します。

## 1. Hamilton流を「次の交差」へ圧縮する

2自由度のHamilton系の正則なエネルギー面 $M_E=\{H=E\}$ は3次元です。Hamiltonベクトル場 $X_H$ が零でない点に、流れの方向と横断する2次元の局所断面 $\Sigma\subset M_E$ を取り、初めて戻る時刻 $\tau(x)>0$ が定義される領域で $P(x)=\varphi_H^{\tau(x)}(x)$ を考えます。$\tau$ は点によって変わり、任意の断面の任意の点が必ず戻るわけではありません。

<a id="def-int7-return"></a>

<!-- formal-statement-start -->
> **定義（Poincaré第一帰還写像）**  
> $H$ を4次元シンプレクティック多様体上の $C^2$ 級Hamilton関数とし、$E$ を正則値、$\Sigma\subset H^{-1}(E)$ を $X_H$ に横断する $C^2$ 級の2次元断面とする。ある開集合 $U\subset\Sigma$ 上で、最小の正の再交差時刻 $\tau(x)$ が有限かつ $C^1$ に定まり、$\varphi_H^{\tau(x)}(x)\in\Sigma$ となるとき、
>
$$
P:U\longrightarrow\Sigma,\qquad P(x)=\varphi_H^{\tau(x)}(x)
$$
>
> をその領域のPoincaré第一帰還写像と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int7-return -->
### 直接例：二つの角度から一つを消す

**定義の確認**：$H_0(I_1,I_2)=I_2+cI_1^2/2$、$c>0$、$I_1>0$、$I_2>0$ を作用角座標で考えます。Hamilton方程式は $\dot I_1=\dot I_2=0$、$\dot\theta_1=cI_1$、$\dot\theta_2=1$ です。$\theta_2=0\pmod{2\pi}$ を断面とすれば $\dot\theta_2=1$ で横断し、最初の帰還は $\tau=2\pi$ です。従って

$$
P(\theta_1,I_1)=(\theta_1+2\pi cI_1\pmod{2\pi},I_1).
$$

> $I_1$ が正の小区間を動き、$I_2=E-cI_1^2/2>0$ を満たす部分だけで考えているため、作用角座標の端点や再交差不能点を含めていません。
<!-- definition-example-end -->

帰還時間が変化しても面積を保つことが重要です。断面の面積形式は、周囲の[シンプレクティック形式](../../SYM/SYM2/index.md#def-sym2-symplectic-manifold)を断面へ制限したものです。

<a id="prop-int7-return-area"></a>

<!-- formal-statement-start -->
> **命題（第一帰還写像の面積保存）**  
> 上の定義の下で、$\omega_\Sigma=\omega|_{T\Sigma}$ は各点で非退化な2形式である。帰還写像 $P$ が局所微分同相で定義される領域では
>
$$
P^*\omega_\Sigma=\omega_\Sigma
$$
>
> が成立する。
<!-- formal-statement-end -->

### 証明の見取り図

固定時間のHamilton流は2形式を保ちます。一方、帰還時間の変化によって微分に $X_H\,d\tau$ が余分に現れますが、エネルギー面の接ベクトルと $X_H$ のシンプレクティック積が零なので、その項が消えます。

<!-- proof-start -->
### 証明

エネルギー面の接空間は $T_xM_E=\ker dH_x$ です。[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)では $\iota_{X_H}\omega=dH$ なので、$v\in T_xM_E$ に対して $\omega(X_H,v)=0$ です。非退化な4次元形式の3次元部分空間への制限の核は $\operatorname{span}(X_H)$ であり、断面が $X_H$ に横断するため、その2次元接空間上の制限は非退化です。

$u,v\in T_x\Sigma$ を取り、$t=\tau(x)$ と置きます。連鎖律を成分ごとに書くと

$$
dP_xu=d\varphi_H^t(x)u+X_H(P(x))\,d\tau_x(u),
$$

$$
dP_xv=d\varphi_H^t(x)v+X_H(P(x))\,d\tau_x(v).
$$

固定時間の流れはエネルギーを保存するため、$d\varphi_H^t u,d\varphi_H^t v$ は $T_{P(x)}M_E$ に属します。上の二つの式を $\omega$ に代入すると、混合項二つは $\omega(X_H,T M_E)=0$、最後の項は $\omega(X_H,X_H)=0$ で消えます。残った項には[Hamilton流のシンプレクティック形式保存](../../SYM/SYM4/index.md#thm-sym4-flow-preservation)を適用して

$$
\begin{aligned}
\omega_{P(x)}(dP_xu,dP_xv)
&=\omega_{P(x)}(d\varphi_H^t u,d\varphi_H^t v)\\
&=\omega_x(u,v)
\end{aligned}
$$

です。断面への制限が主張する等式です。
<!-- proof-end -->

この証明は局所の結果です。後で使う**閉円環全体へ帰還写像が延長できること、両境界をそれぞれ保つこと**は別に確認する必要があります。

## 2. 円環の面積保存とtwistを定義する

$\mathbb T=\mathbb R/2\pi\mathbb Z$ とし、閉円環 $A=\mathbb T\times[a,b]$（$a<b$）に座標 $(\theta,r)$、面積形式 $d\theta\wedge dr$ を入れます。$F(\theta,r)=(\Theta(\theta,r)\pmod{2\pi},R(\theta,r))$ は $C^2$ 級微分同相で、各境界円 $r=a,b$ をそれぞれ自身へ写し、面積を保存するとします。角度の持ち上げ $\Theta$ は $\Theta(\theta+2\pi,r)=\Theta(\theta,r)+2\pi$ を満たすものを選びます。

<a id="def-int7-twist"></a>

<!-- formal-statement-start -->
> **定義（正の単調twistと境界twist）**  
> 上の $F$ について、すべての $(\theta,r)\in\mathbb R\times[a,b]$ で
>
$$
\partial_r\Theta(\theta,r)>0
$$
>
> なら**正の単調twist写像**と呼ぶ。さらに持ち上げを一つ固定して
>
$$
\Theta(\theta,a)<\theta<\Theta(\theta,b)
\qquad(\text{すべての }\theta\in\mathbb R)
$$
>
> を満たすとき、固定点回転数 $0$ をまたぐ**境界twist条件**を満たすという。円環上の境界点が反対向きに動く、というだけでなく、同じ持ち上げでの厳密不等式である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-int7-twist -->
### 直接例：積分可能なせん断写像

**定義の確認**：$A=\mathbb T\times[-1,1]$、$F_0(\theta,r)=(\theta+r\pmod{2\pi},r)$ とします。微分行列は

$$
DF_0=\begin{pmatrix}1&1\\0&1\end{pmatrix},\qquad
\det DF_0=1,\qquad \partial_r\Theta=1>0.
$$

境界での持ち上げ差は $-1$ と $+1$ なので境界twistも成立します。固定点は $r=0$ の円全体です。後の定理の「少なくとも2点」は、ちょうど2点という意味ではありません。
<!-- definition-example-end -->

面積保存は $F^*(d\theta\wedge dr)=d\theta\wedge dr$ と同値です。行列式が正の1でも $\partial_r\Theta$ の符号は決まりません。したがってtwistは面積保存とは**独立に確認すべき仮定**です。逆に境界twistだけから内部の微分の符号が揃うとも限りません。

### 連続時間の回転数からtwistを計算する

帰還断面で $H_0=H_0(I_1,I_2)$ とし、$\omega_j=\partial_{I_j}H_0$、$\omega_2>0$ とします。固定エネルギー $E$ 上で $\partial_{I_2}H_0=\omega_2\ne0$ なので、局所的には $I_2=I_2(I_1)$ と解けます。帰還角は $\Delta(I_1)=2\pi\omega_1/\omega_2$ です。これは単に $\omega_1$ を変化させるだけでなく、**エネルギーを固定したまま**微分する必要があります。

<a id="prop-int7-frequency-twist"></a>

<!-- formal-statement-start -->
> **命題（可積分帰還写像のtwist係数）**  
> $H_0\in C^2$、$\omega_2>0$ とし、固定エネルギー面の作用区間で $I_2=I_2(I_1)$ が存在するなら、帰還写像は $P_0(\theta_1,I_1)=(\theta_1+\Delta(I_1),I_1)$ であり、
>
$$
\frac{d\Delta}{dI_1}
= \frac{2\pi}{\omega_2^3}
\left(\omega_2^2H_{11}-2\omega_1\omega_2H_{12}+\omega_1^2H_{22}\right).
$$
>
> ここで $H_{ij}=\partial_{I_i}\partial_{I_j}H_0$ は固定エネルギー曲線上で評価する。
<!-- formal-statement-end -->

### 証明の見取り図

エネルギー一定の微分から $I_2'$ を求め、$\omega_1/\omega_2$ を商の微分で処理します。

<!-- proof-start -->
### 証明

$H_0(I_1,I_2(I_1))=E$ の両辺を微分すると

$$
\omega_1+\omega_2\frac{dI_2}{dI_1}=0,
\qquad
\frac{dI_2}{dI_1}=-\frac{\omega_1}{\omega_2}.
$$

従って連鎖律による角周波数の微分は

$$
\frac{d\omega_1}{dI_1}=H_{11}-H_{12}\frac{\omega_1}{\omega_2},
\qquad
\frac{d\omega_2}{dI_1}=H_{12}-H_{22}\frac{\omega_1}{\omega_2}.
$$

これらを $\Delta=2\pi\omega_1/\omega_2$ の微分へ代入して

$$
\begin{aligned}
\frac{d\Delta}{dI_1}
&=\frac{2\pi}{\omega_2^2}
\left[\omega_2\left(H_{11}-H_{12}\frac{\omega_1}{\omega_2}\right)
-\omega_1\left(H_{12}-H_{22}\frac{\omega_1}{\omega_2}\right)\right]\\
&=\frac{2\pi}{\omega_2^3}
(\omega_2^2H_{11}-2\omega_1\omega_2H_{12}+\omega_1^2H_{22})
\end{aligned}
$$

を得ます。分母は $\omega_2>0$ により零ではありません。
<!-- proof-end -->

直接例の $H_0=I_2+cI_1^2/2$ では $H_{11}=c$、$H_{12}=H_{22}=0$、$\omega_2=1$ ですから $d\Delta/dI_1=2\pi c>0$ です。これは[作用角変数による直線運動](../INT3/index.md#def-int3-action-angle)を円環の単調せん断に読み替えたものです。

## 3. 生成関数で「固定点が2つ」を証明する

一般に境界で回転方向が逆なら固定点の存在が期待できます。しかし中間値の定理を角度変位だけに適用しても、**作用方向の変位 $R-r$ が零**とは限りません。このもう一つの方程式を同時に扱う道具が生成関数です。

単調twistなら $(\theta,r)\mapsto(\theta,X=\Theta(\theta,r))$ の第二成分は $r$ に関して狭義増加で、逆に $r=r(\theta,X)$ を定義できます。$X$ は新しい角度の実数持ち上げです。

<a id="lem-int7-generating"></a>

<!-- formal-statement-start -->
> **補題（円環のtwist生成関数）**  
> 境界をそれぞれ保つ $C^2$ 級の面積保存微分同相 $F:A\to A$ が正の単調twistを満たすとする。持ち上げ上の帯領域
>
$$
D=\{(\theta,X):\Theta(\theta,a)\le X\le\Theta(\theta,b)\}
$$
>
> には実数値の $C^2$ 級関数 $S(\theta,X)$ が存在し、$r=r(\theta,X)$、$R=R(\theta,r(\theta,X))$ として
>
$$
\partial_\theta S=-r,\qquad \partial_XS=R,
\qquad S(\theta+2\pi,X+2\pi)=S(\theta,X)
$$
>
> が成り立つ。$S$ は加法定数を除いて一意である。
<!-- formal-statement-end -->

### 証明の見取り図

面積保存を1形式 $R\,dX-r\,d\theta$ が閉じているという式へ変えます。帯は円環なので閉形式が必ず完全とは限りませんが、両境界を保つことで円環一周の積分が零になります。

<!-- proof-start -->
### 証明

$\partial_r\Theta>0$ だから、逆関数定理で $(\theta,X)$ は局所座標です。区間 $[a,b]$ で厳密単調なので、大域的にも上の帯で逆写像が一価に存在します。そこで

$$
\eta=R(\theta,r(\theta,X))\,dX-r(\theta,X)\,d\theta
$$

と置きます。微分すると

$$
d\eta=dR\wedge dX-dr\wedge d\theta.
$$

面積保存は $dX\wedge dR=d\theta\wedge dr$ です。両辺の順序を逆にすれば $dR\wedge dX=dr\wedge d\theta$ なので、$d\eta=0$ です。

次に下側境界では $r=a$、境界保存から $R=a$ です。$\theta$ が一周すると持ち上げ $\Theta(\theta,a)$ は $2\pi$ 増えるので

$$
\int_{\partial_{\rm lower}D}\eta
=\int_0^{2\pi}\left[a\frac{d}{d\theta}\Theta(\theta,a)-a\right]d\theta
=a(2\pi-2\pi)=0.
$$

帯領域を同時平行移動 $(\theta,X)\mapsto(\theta+2\pi,X+2\pi)$ で割ると円環であり、任意の閉曲線の積分は下側境界の整数倍（閉形式なのでホモロジーだけで決まる）です。その値が零だから、基点から $\eta$ を積分して定める $S$ は経路に依存しません。従って $dS=\eta$、すなわち $\partial_\theta S=-r$ と $\partial_XS=R$ です。閉曲線一周の積分が零なので $S$ は同時に $2\pi$ だけ移動しても値を変えず、一意性は $d(S-\widetilde S)=0$ から従います。
<!-- proof-end -->

<a id="thm-int7-poincare-birkhoff"></a>

<!-- formal-statement-start -->
> **定理（Poincaré–Birkhoff固定点定理：単調twist版）**  
> $A=\mathbb T\times[a,b]$ 上の $C^2$ 級面積保存微分同相 $F$ が、両境界円をそれぞれ保ち、ある角度持ち上げで
>
$$
\partial_r\Theta>0,\qquad
\Theta(\theta,a)<\theta<\Theta(\theta,b)
\quad(\forall\theta)
$$
>
> を満たすなら、$F$ には少なくとも二つの**相異なる固定点**がある。固定点が連続無限個になる場合も含む。
<!-- formal-statement-end -->

### 証明の見取り図

[生成関数の補題](#lem-int7-generating)で二つの固定点条件を、周期関数 $s(\theta)=S(\theta,\theta)$ の臨界点条件一つへ変えます。境界twistが対角線 $X=\theta$ を生成関数の定義域内部へ置くことが鍵です。

<!-- proof-start -->
### 証明

各 $\theta$ で $\Theta(\theta,a)<\theta<\Theta(\theta,b)$ なので、$(\theta,\theta)$ は帯領域 $D$ の内部です。従って

$$
s(\theta)=S(\theta,\theta)
$$

は実数値 $C^1$ 級関数です。[生成関数の周期性](#lem-int7-generating)から $s(\theta+2\pi)=s(\theta)$ です。連鎖律を二つの偏導関数へ分解すると

$$
s'(\theta)=\partial_\theta S(\theta,\theta)+\partial_XS(\theta,\theta)
=-r(\theta,\theta)+R(\theta,r(\theta,\theta)).
$$

このとき $X=\theta$ に固定しているので、角度の持ち上げは $\Theta(\theta,r(\theta,\theta))=\theta$、すなわち角度は元に戻っています。従って $s'(\theta)=0$ なら $R=r$ も成立し、点 $(\theta,r(\theta,\theta))$ は**両座標が一致する**固定点です。

$s$ は円周上で最大値と最小値を取ります。定数関数でなければ、最大点と最小点は相異なり、どちらも微分可能な周期関数の臨界点です。定数関数なら全ての $\theta$ に対して $s'(\theta)=0$ となるので、異なる角度の固定点が無限個あります。いずれの場合も相異なる固定点が少なくとも二つ存在します。
<!-- proof-end -->

**適用範囲**：古典的なPoincaré–Birkhoffの定理には、**内部の $\partial_r\Theta>0$ を仮定せず、境界で逆向きのtwistだけを仮定する**より一般的な形式があります。その一般形には位相的な議論が必要です。本章の完全証明は明示した単調twist版を対象とし、一般形まで証明したと読み替えてはいけません。逆に、単調twistが分かっている具体的なHamilton帰還写像には上の構成を直接適用できます。

### 計算できる生成関数と、境界条件の落とし穴

無限円筒上の局所例として

$$
S(\theta,X)=\frac12(X-\theta)^2-\varepsilon\cos\theta
$$

を考えます。生成式を偏微分すると

$$
r=X-\theta-\varepsilon\sin\theta,\qquad
R=X-\theta,
$$

$$
F_\varepsilon(\theta,r)=
(\theta+r+\varepsilon\sin\theta,\ r+\varepsilon\sin\theta)
\quad(\text{角度は }2\pi\text{ で割る}).
$$

$\partial_r\Theta=1$、Jacobianの行列式は1です。対角線上で $s(\theta)=-\varepsilon\cos\theta$ なので $s'(\theta)=\varepsilon\sin\theta$ です。$\varepsilon\ne0$ のとき、持ち上げの**角度変位が零**（$X=\theta$）となる固定点は $(0,0)$ と $(\pi,0)$ です。ただし円筒上の固定点は角度が $2\pi$ の整数倍だけ変化してもよいため、作用条件 $R=r$ と併せると

$$
\sin\theta=0,\qquad r=2\pi k\quad(k\in\mathbb Z)
$$

が必要十分であり、実際には $(0,2\pi k)$ と $(\pi,2\pi k)$ がすべて固定点です。対角線 $X=\theta$ の臨界点から構成した二固定点と、円筒上の固定点全体を混同してはいけません。また $\varepsilon\ne0$ なら任意の有限水平境界 $r=a,b$ は一般に保存されません。従って**この無限円筒の計算を、そのまま閉円環版の定理の仮定確認に代えてはいけません**。

境界を実際に保つ例として、$A=\mathbb T\times[-1,1]$ で

$$
G(\theta,r)=(1-r^2)^2\cos\theta,\qquad
T(\theta,r)=(\theta+r,r),\qquad
F_\varepsilon=T\circ\varphi_G^\varepsilon
$$

とします。$G$ のHamilton流では $\dot\theta=\partial_rG$、$\dot r=-\partial_\theta G$ です。$r=\pm1$ で両偏導関数が零なので流れは境界で恒等です。よって $F_\varepsilon$ は境界保存・面積保存で、境界持ち上げ差は $-1,+1$ のままです。$\varepsilon=0$ で $\partial_r\Theta=1$ なので、コンパクト円環上の流れの $C^1$ 連続依存性により、十分小さい $|\varepsilon|$ でも $\partial_r\Theta>0$ です。定理の全仮定を満たし、少なくとも二固定点が現れます。実際 $(0,0)$ と $(\pi,0)$ は $G$ の平衡点で $T$ でも固定されます。

## 4. 共鳴回転数 $p/q$ と周期点

周期軌道を探すには固定点を $q$ 回反復へ適用します。ただし**一回のtwist写像の $q$ 回合成が、必ず単調twistを保つわけではない**ことに注意します。以下では反復後の微分条件を明記します。

<a id="prop-int7-resonant-periodic"></a>

<!-- formal-statement-start -->
> **命題（反復twistから得る共鳴周期点）**  
> 円環の面積保存境界保存微分同相 $F$ の持ち上げを $\widetilde F$ とする。整数 $p$、正整数 $q$ に対し、$\widetilde G(\theta,r)=\widetilde F^{\,q}(\theta,r)-(2\pi p,0)$ が全域で
>
$$
\partial_r\Theta_G>0,\qquad
\Theta_G(\theta,a)<\theta<\Theta_G(\theta,b)
$$
>
> を満たすなら、少なくとも二つの相異なる点 $x\in A$ が
>
$$
F^q(x)=x,\qquad
\widetilde F^{\,q}(\widetilde x)=\widetilde x+(2\pi p,0)
$$
>
> を満たす。この結論だけから**相異なる周期軌道が二本**あるとは断言しない。
<!-- formal-statement-end -->

### 証明の見取り図

角度の $2\pi p$ は円周上では同一点なので、反復した写像から整数回転分を引き、先ほどの固定点定理を適用します。

<!-- proof-start -->
### 証明

$F$ が面積と各境界を保つため、$F^q$ も同じ二性質を持ちます。角度方向の整数平行移動は微分と各境界を変えません。従って持ち上げから整数回転分を引いた $G$ も面積・境界を保ちます。

仮定した単調twistと境界twistを合わせ、[単調twist版の固定点定理](#thm-int7-poincare-birkhoff)を $G$ に適用します。相異なる二固定点 $x_1,x_2$ が存在し、それぞれの持ち上げで

$$
\widetilde F^{\,q}(\widetilde x_j)=\widetilde x_j+(2\pi p,0)
\qquad(j=1,2)
$$

となります。円環へ射影すれば $F^q(x_j)=x_j$ です。ただし二点が $F$ によって互いに移る可能性は残ります。二点だけを根拠に二本の周期軌道があるとは結論しません。
<!-- proof-end -->

積分可能なせん断 $F_0(\theta,r)=(\theta+\alpha(r),r)$ では

$$
\Theta_G(\theta,r)-\theta=q\alpha(r)-2\pi p,\qquad
\partial_r\Theta_G=q\alpha'(r).
$$

$\alpha'(r)>0$ かつ $q\alpha(a)<2\pi p<q\alpha(b)$ なら命題を適用できます。共鳴層 $\alpha(r_*)=2\pi p/q$ では角度全体が周期点になります。摂動で共鳴層の連続な周期点群が孤立点へ分裂する入口がここにありますが、**境界保存・反復のtwist・周期軌道の本数**はいずれも別々に調べます。後続のKAM理論では、非共鳴の不変曲線がどの条件で存続するかを検討します。

### 仮定を外すと何が壊れるか

$F(\theta,r)=(\theta+\gamma,r)$、$\gamma\notin2\pi\mathbb Z$ は面積と両境界を保ちますが、$\partial_r\Theta=0$ かつ境界回転の符号が逆になりません。固定点はありません。先ほどの証明では対角線 $X=\theta$ が生成関数の帯領域内部に入る、という箇所が壊れます。面積保存**だけ**では固定点が存在しません。

同様に、反復で $\partial_r\Theta_G>0$ が崩れる場合にこの単調版の証明を流用することはできません。内部の単調性を要求しない広い結論を主張するには、その形式に見合う別の位相的証明が必要です。

## 5. 演習：連続の流れ・面積・固定点をつなぐ

### Level A

<a id="ex-int7-a01"></a>
**A1. せん断の全仮定。** $F(\theta,r)=(\theta+2r,r)$ を $\mathbb T\times[-1,1]$ 上で考える。面積保存、境界保存、単調twist、境界twistを各々調べ、固定点集合を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** $DF=\begin{pmatrix}1&2\\0&1\end{pmatrix}$ だから行列式は1、従って面積を保ちます。$R=r$ より二つの境界をそれぞれ保ちます。持ち上げ $\Theta=\theta+2r$ の偏微分は $\partial_r\Theta=2>0$、境界では $\Theta(\theta,-1)-\theta=-2<0$、$\Theta(\theta,1)-\theta=2>0$ です。[twistの定義](#def-int7-twist)の全条件を満たします。固定点には $R=r$ が常に成立し、角度条件は $2r\in2\pi\mathbb Z$ です。$r\in[-1,1]$ では $2r\in[-2,2]$ なので整数倍は0だけで、$r=0$、$\theta$ は任意です。
<!-- solution-end -->

<a id="ex-int7-a02"></a>
**A2. 面積保存だけでは足りない。** $0<\gamma<2\pi$ として $F(\theta,r)=(\theta+\gamma,r)$ を $\mathbb T\times[a,b]$ 上で考える。面積と境界を保つこと、固定点が存在しないこと、[固定点定理](#thm-int7-poincare-birkhoff)の失われた仮定を確認せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 微分行列は単位行列なので行列式1です。$R=r$ で境界も保存します。固定点なら $\theta+\gamma=\theta\pmod{2\pi}$ すなわち $\gamma\in2\pi\mathbb Z$ が必要ですが、$0<\gamma<2\pi$ に反します。$\partial_r\Theta=0$ なので正の単調twistでなく、どちらの境界でも持ち上げ差は同じ正数 $\gamma$ で境界twist条件も不成立です。
<!-- solution-end -->

<a id="ex-int7-a03"></a>
**A3. 生成式から標準型写像を復元。** 無限円筒上で $S(\theta,X)=(X-\theta)^2/2-\varepsilon\cos\theta$ とする。$r=-S_\theta$、$R=S_X$ を計算し、$\partial_rX$ を求めよ。また $\varepsilon\ne0$ として、持ち上げで $X=\theta$ を満たす固定点と、角度を $2\pi$ で割った円筒上の固定点全体を区別して求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** まず生成関数を偏微分して

$$
S_\theta=-(X-\theta)+\varepsilon\sin\theta,\qquad
S_X=X-\theta
$$

を得ます。$r=-S_\theta$ を $X$ について解き、$R=S_X$ に代入すると

$$
X=\theta+r+\varepsilon\sin\theta,\qquad
R=r+\varepsilon\sin\theta,\qquad
\partial_rX=1>0
$$

です。固定点の作用条件 $R=r$ は、$\varepsilon\ne0$ より $\sin\theta=0$、すなわち $\theta=0,\pi\pmod{2\pi}$ と同値です。この条件の下では $X=\theta+r$ なので、**持ち上げで** $X=\theta$ と要求すれば $r=0$ となり $(0,0),(\pi,0)$ の二点を得ます。

一方、**円筒上**の角度条件は $X-\theta\in2\pi\mathbb Z$ です。従って

$$
(\theta,r)=(0,2\pi k),\ (\pi,2\pi k)
\qquad(k\in\mathbb Z)
$$

が円筒上の固定点全体です。円筒は作用方向に無限なので $k\ne0$ の点を排除できません。有限水平境界は一般に保存されないため、この計算単体は閉円環定理の適用ではありません。
<!-- solution-end -->

<a id="ex-int7-a04"></a>
**A4. 臨界点が固定点になる理由。** [生成関数の補題](#lem-int7-generating)の仮定に加え境界twistがあるとき、$s(\theta)=S(\theta,\theta)$ の微分から固定点の二条件をそれぞれ明示せよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 境界twistにより $\Theta(\theta,a)<\theta<\Theta(\theta,b)$、従って $(\theta,\theta)$ は生成関数の定義域内です。連鎖律より $s'=S_\theta+S_X=-r+R$ です。対角線上で $X=\theta$ を固定したことが角度条件 $\Theta(\theta,r)=\theta$ を与え、$s'=0$ が作用条件 $R=r$ を与えます。二条件が揃って初めて固定点です。最大値・最小値の2点が互いに異なる場合は二固定点、$s$ が定数なら全角度が固定点です。
<!-- solution-end -->

<a id="ex-int7-a05"></a>
**A5. 有理回転層。** $\mathbb T\times[0,2]$ 上で $F(\theta,r)=(\theta+\pi r,r)$ とする。$(p,q)=(1,2)$ の回転を持つ点と最小周期を求めよ。

- Level: A

<!-- solution-start -->
**詳細解答。** 持ち上げで二回作用させると $\widetilde F^2(\theta,r)=(\theta+2\pi r,r)$ です。回転 $p=1$ の条件は $\theta+2\pi r=\theta+2\pi$ だから $r=1$ です。この層では一回で角度が $\pi$ 増え、$\pi\notin2\pi\mathbb Z$ なので一回では戻りません。二回で $2\pi$ 増えるため最小周期は2です。全ての $\theta$ が周期点で、点が無限個でも軌道本数を数えるときは一回の写像で互いに移る点を同一軌道として数えます。
<!-- solution-end -->

### Level B

<a id="ex-int7-b01"></a>
**B1. 固定エネルギー上のtwist。** $H_0(I_1,I_2)=I_2+(c/2)I_1^2$、$c>0$ で、$I_2=E-cI_1^2/2>0$ を満たす $I_1\in[a,b]$（$0<a<b$）を取る。帰還写像の面積とtwistを確認し、整数 $p,q$（$q>0$）について $ca<p/q<cb$ なら回転数 $p/q$ の点を求めよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $\dot\theta_2=1$ なので帰還時間は $2\pi$、$\dot\theta_1=cI_1$ から $\Theta=\theta_1+2\pi cI_1$、$R=I_1$ です。微分行列は $\begin{pmatrix}1&2\pi c\\0&1\end{pmatrix}$ で行列式1、twistは $2\pi c>0$ です。$q$ 回の持ち上げ変位は $2\pi qcI_1$ ですから $2\pi p$ と等しくなる作用は $I_1=p/(cq)$ です。条件 $ca<p/q<cb$ によりこの値は $(a,b)$ 内にあり、そこにある全角度が $F^q$ の固定点になります。[可積分帰還twist係数](#prop-int7-frequency-twist)でも $H_{11}=c$、$\omega_2=1$ から同じ値を得ます。
<!-- solution-end -->

<a id="ex-int7-b02"></a>
**B2. 面積保存の連鎖律。** エネルギー面内の断面上の接ベクトル $u,v$ に対し、$P(x)=\varphi_H^{\tau(x)}(x)$ の微分を展開して面積保存を導け。帰還時間が一定であるという仮定を使ってはならない。

- Level: B

<!-- solution-start -->
**詳細解答。** 時間変数と初期値変数への連鎖律を、それぞれ $u,v$ に適用します。

$$
dPu=d\varphi^\tau u+X_H(P(x))\,d\tau(u),
\qquad
dPv=d\varphi^\tau v+X_H(P(x))\,d\tau(v).
$$

$\omega(dPu,dPv)$ を双線形性によって四項に展開します。固定時間流の接写像はエネルギー面の接ベクトルを同じエネルギー面へ写します。[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)より $\iota_{X_H}\omega=dH$ であり、エネルギー面では $dH$ が接ベクトル上で零です。

従って $X_H$ とエネルギー面への接ベクトルとの混合項二つは零です。最後の $X_H$ 同士の項も交代性で零となります。残りは[Hamilton流のシンプレクティック形式保存](../../SYM/SYM4/index.md#thm-sym4-flow-preservation)によって

$$
\omega(dPu,dPv)
=\omega(d\varphi^\tau u,d\varphi^\tau v)
=\omega(u,v)
$$

となり、[帰還写像の面積保存](#prop-int7-return-area)を得ます。帰還時間を一定と仮定していません。
<!-- solution-end -->

<a id="ex-int7-b03"></a>
**B3. 境界を保つ摂動を作る。** $G(\theta,r)=(1-r^2)^2\cos\theta$ を $\mathbb T\times[-1,1]$ 上で考える。Hamilton方程式を書き、$F_\varepsilon=T\circ\varphi_G^\varepsilon$、$T(\theta,r)=(\theta+r,r)$ が十分小さい $|\varepsilon|$ で[固定点定理](#thm-int7-poincare-birkhoff)の条件を満たす理由を述べよ。

- Level: B

<!-- solution-start -->
**詳細解答。** $G$ の偏微分からHamilton方程式は次の形です。

$$
\dot\theta=\partial_rG=-4r(1-r^2)\cos\theta,\qquad
\dot r=-\partial_\theta G=(1-r^2)^2\sin\theta.
$$

$r=\pm1$ では二成分がともに零なので、$\varphi_G^\varepsilon$ は両境界上で恒等です。[Hamilton流のシンプレクティック形式保存](../../SYM/SYM4/index.md#thm-sym4-flow-preservation)と $T$ の行列式1から、合成は面積を保存します。境界変位はそれぞれ $-1$ と $+1$ なので、境界twistは厳密です。

$\varepsilon=0$ では $F_0=T$、すなわち $\partial_r\Theta_0=1$ です。コンパクト円環でのHamilton流の $C^1$ 連続依存性から $\partial_r\Theta_\varepsilon=1+O(\varepsilon)$ が一様に成り立ちます。十分小さい $|\varepsilon|$ を選べば $\partial_r\Theta_\varepsilon>1/2$ となり、[単調twist版の固定点定理](#thm-int7-poincare-birkhoff)を適用できます。
<!-- solution-end -->

<a id="ex-int7-b04"></a>
**B4. 一回のtwistは反復のtwistを保証しない。** 無限円筒上の $F_\varepsilon(\theta,r)=(\theta+r+\varepsilon\sin\theta,\ r+\varepsilon\sin\theta)$ について、一回と二回の角度成分をそれぞれ $r$ で微分し、$\varepsilon>2$ なら二回目の単調twistが壊れ得ることを示せ。

- Level: B

<!-- solution-start -->
**詳細解答。** 第一回を $\theta_1=\theta+r+\varepsilon\sin\theta$、$r_1=r+\varepsilon\sin\theta$ とすると $\partial_r\theta_1=\partial_r r_1=1$ です。第二回の作用は $r_2=r_1+\varepsilon\sin\theta_1$ なので $\partial_r r_2=1+\varepsilon\cos\theta_1$ です。角度は $\theta_2=\theta_1+r_2$ だから

$$
\partial_r\theta_2=\partial_r\theta_1+\partial_r r_2
=2+\varepsilon\cos\theta_1.
$$

$\theta_1=\pi\pmod{2\pi}$ となる初期値は任意の $\theta$ に対して $r$ を選べば作れます。そこで $\partial_r\theta_2=2-\varepsilon<0$（$\varepsilon>2$）です。一回では $\partial_r\theta_1=1>0$ でしたから、[共鳴反復の命題](#prop-int7-resonant-periodic)で反復後の条件を別途要求する理由が分かります。この例の円筒写像は有限水平境界を保存しないため、閉円環への適用とは混同しません。
<!-- solution-end -->

### Level C

<a id="ex-int7-c01"></a>
**C1. 実際のHamilton摂動から二固定点まで。** $A=\mathbb T\times[-1,1]$ に $d\theta\wedge dr$ を入れ、

$$
G(\theta,r)=(1-r^2)^2\cos\theta,\qquad
F_\varepsilon=T\circ\varphi_G^\varepsilon,\qquad
T(\theta,r)=(\theta+r,r)
$$

とする。次の各問いを証明せよ。

1. $\varphi_G^\varepsilon$ が円環の境界を点ごとに保ち、$F_\varepsilon$ が面積と境界を保つこと。
2. $F_\varepsilon$ の境界持ち上げ差と、$\varepsilon$ が十分小さい場合の単調twistを確かめること。
3. 少なくとも二固定点の存在を定理から結論し、実際に固定される二点を直接確認すること。
4. この議論で $\partial_r\Theta>0$ を外したとき、どの段階に追加の証明が必要になるか説明すること。

- Level: C

<!-- solution-start -->
**詳細解答。**

**1. 面積と境界。** $G$ の偏導関数を計算すると

$$
G_r=-4r(1-r^2)\cos\theta,\qquad
G_\theta=-(1-r^2)^2\sin\theta.
$$

Hamilton方程式は $\dot\theta=G_r$、$\dot r=-G_\theta$ です。$r=\pm1$ では両方が零なので、境界上の初期値は定数解です。従って $\varphi_G^\varepsilon$ は各境界点を固定します。また[Hamilton流はシンプレクティック形式を保存](../../SYM/SYM4/index.md#thm-sym4-flow-preservation)し、$T$ の微分行列は $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ で行列式1です。従って合成は面積を保存し各境界を保ちます。コンパクト円環上でベクトル場は滑らかで境界に接するので、流れは任意の有限時刻で定義され円環から出ません。

**2. 境界と内部。** $\varphi_G^\varepsilon$ が境界恒等なので、持ち上げは

$$
\Theta_\varepsilon(\theta,-1)=\theta-1,\qquad
\Theta_\varepsilon(\theta,1)=\theta+1.
$$

従って境界twistは厳密です。$\varepsilon=0$ のとき $\varphi_G^0$ は恒等、$F_0=T$ で $\partial_r\Theta_0=1$ です。ODE解の初期値と時刻に関する $C^1$ 連続依存性はコンパクト集合 $A$ 上で一様です。ある $\varepsilon_0>0$ を選び

$$
|\partial_r\Theta_\varepsilon-1|<\frac12
\qquad(|\varepsilon|<\varepsilon_0)
$$

とできるため $\partial_r\Theta_\varepsilon>1/2>0$ が成立します。

**3. 固定点。** 1, 2 の確認から、[Poincaré–Birkhoffの単調twist版](#thm-int7-poincare-birkhoff)は少なくとも二固定点を保証します。具体的には $(0,0)$ と $(\pi,0)$ で $G_r=0$、$G_\theta=0$ です。したがって両点は $\varphi_G^\varepsilon$ の平衡点です。また $T(\theta,0)=(\theta,0)$ だから $F_\varepsilon$ でも二点とも固定されます。$0$ と $\pi$ は $\mathbb T$ 上で異なります。

**4. 仮定の役目。** 単調twistを外すと、$r\mapsto\Theta(\theta,r)$ の単射性を利用して $(\theta,X)$ を座標にする[生成関数の補題](#lem-int7-generating)の最初の段階が保証されません。境界twistと面積保存だけを仮定する一般形の定理を証明するには別の位相的論法が必要です。$\partial_r\Theta$ の条件を削ったまま本章の同じ生成関数証明を引用することはできません。
<!-- solution-end -->
