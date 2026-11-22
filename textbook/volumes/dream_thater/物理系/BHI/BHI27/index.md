# BHI27 時間依存の蒸発JT模型

## 1. 平衡のPage転移を蒸発する境界へ移すには

[BHI26のPage型転移](../BHI26/index.md#prop-bhi26-page-crossing)は、左右に浴を持つ**定常・二側**のJTブラックホールで計算しました。今度は**片側の重力領域から、初め冷たい非重力浴へ流出する放射**を追います。ブラックホールのエネルギーが変わるので、境界の時計も時間によって曲がります。

この講で一続きに確定するのは、(i) 同じ時計によるエネルギーと流束の収支、(ii) その時計を使った浴の有限区間の**精細エントロピーの真空差**、(iii) 準静的な熱力学的エントロピー収支です。この三つは異なる観測量です。とくに、熱的放射の粗視化エントロピーをisland公式の精細エントロピーと取り違えず、次講以降の重力レプリカの計算へ渡します。

時間座標を浴の接合面で測る右向きの遅延時刻 $u$ とし、蒸発模型を始める時刻を $u_0$ とします。自然単位 $\hbar=k_B=1$、正のSchwarzian係数 $C$ と、左右の中心電荷が等しい二次元CFTの値 $c>0$ を使います。時刻 $u\ge u_0$ の有限な半古典的な区間を対象とし、重力側と浴側の時間規格化を合わせます。

[BHI21のLorentz境界エネルギー](../BHI21/index.md#prop-bhi21-lorentz-energy)と[BHI22の透過浴流束](../BHI22/index.md#prop-bhi22-anomalous-flux)を、出射真空写像と境界時計が等しい $p=F$ という接合条件の下で結びます。

$$
E(u)=-C\{F,u\},\qquad
P(u)=-\frac{c}{24\pi}\{F,u\}.
$$

ここで $\{F,u\}=F'''/F'-(3/2)(F''/F')^2$ はSchwarzian微分です。$F'>0$ と、入射流束が零であることを仮定します。定常二浴模型のように入射と出射が釣り合っているのではなく、エネルギー保存 $\dot E=-P$ により重力側が冷えます。

## 2. エネルギーの初期値を与え、蒸発の時間尺度を決める

[BHI22の減衰則](../BHI22/index.md#prop-bhi22-energy-decay)はエネルギーの時間変化を与えますが、蒸発し始める時刻と初期エネルギーを指定し、同じ時計から放射まで計算するための初期値問題が必要です。まず、入射真空と完全透過の条件を持つ計算対象を定めます。

<a id="def-bhi27-evaporating-jt"></a>

<!-- formal-statement-start -->
> **定義（真空浴に冷却される半古典JT境界模型）**
>
> $C,c,E_0>0$、$u_0\in\mathbb R$ とする。$u\ge u_0$ で向きを保つ $C^3$ 級境界時計 $F$ を取り、完全透過する浴の出射状態を $p=F$ の正周波数真空、入射を平坦浴の真空とする。重力境界と浴の正味エネルギー保存を課し、
>
$$
E=-C\{F,u\}>0,\qquad
P=-\frac{c}{24\pi}\{F,u\},\qquad
\dot E=-P,\qquad E(u_0)=E_0
$$
>
> とする。ここで $\gamma:=c/(24\pi C)>0$ を冷却率と呼ぶ。これらの条件を満たす有限時間区間を**蒸発JT境界模型**とする。
<!-- formal-statement-end -->

この定義の量は $[C]=L$、$[E]=L^{-1}$、$[P]=L^{-2}$、$[\gamma]=L^{-1}$ です。$c$ は無次元です。場と境界の貼り合わせは[BHI22の透過条件](../BHI22/index.md#def-bhi22-transmission)に従い、界面に別の蓄積エネルギーや外部仕事を置きません。

<!-- definition-example-start: def-bhi27-evaporating-jt -->
**定義の直接確認**：$C>0,c=1,u_0=0,E_0=2C$ を選びます。このとき $\gamma=1/(24\pi C)$。初期Schwarzianを $\{F,0\}=-2$ とする時計があれば、初期のエネルギーは $E(0)=2C$、出射流束は $P(0)=1/(12\pi)$ です。$\gamma E_0=1/(12\pi)$ なので、初期収支の係数が一致します。第3節では条件 $F'>0$ を含め、この初期値に対応する時計を実際に構成します。
<!-- definition-example-end -->

<a id="prop-bhi27-cooling"></a>

<!-- formal-statement-start -->
> **命題（蒸発境界のエネルギーと準静的温度）**
>
> 上の模型の条件に加え、各時刻に熱的JTの状態方程式を**準静的近似**で使えると仮定する。$\tau=u-u_0\ge0$、$\kappa_0=\sqrt{2E_0/C}>0$ と置けば、
>
$$
\begin{aligned}
E(u)&=E_0e^{-\gamma\tau},&
P(u)&=\gamma E_0e^{-\gamma\tau},\\
\kappa_{\rm eff}(u)&=\kappa_0e^{-\gamma\tau/2},&
T_{\rm eff}(u)&=\frac{\kappa_{\rm eff}(u)}{2\pi}.
\end{aligned}
$$
>
> ここで $E=C\kappa_{\rm eff}^2/2=2\pi^2CT_{\rm eff}^2$ である。$P>0$ は定義された模型の厳密な収支式、$T_{\rm eff}$ は熱平衡状態を瞬間ごとに対応付けた**近似的温度**である。
<!-- formal-statement-end -->

### 証明の見取り図

流束とエネルギーの両方に同じSchwarzianが現れるので、比を取ります。その後、初期値を用いて一次方程式を解き、熱的なエネルギー関係へ代入します。

<!-- proof-start -->
### 証明

[BHI22の減衰命題](../BHI22/index.md#prop-bhi22-energy-decay)の前提がここでの接合条件と一致することを確認します。$E=-C\{F,u\}$ と $P=-c\{F,u\}/(24\pi)$ から

$$
P=\frac{c}{24\pi C}E=\gamma E.
$$

保存式は $dE/du=-\gamma E$ です。$E(u_0)=E_0>0$ なので、対数微分を初期時刻から積分して

$$
\ln\frac{E(u)}{E_0}
=\int_{u_0}^{u}\frac{\dot E(s)}{E(s)}\,ds
=-\gamma(u-u_0).
$$

従って $E(u)=E_0e^{-\gamma\tau}>0$ であり、流束へ戻すと $P=\gamma E_0e^{-\gamma\tau}>0$ です。

[BHI21の熱的Schwarzian熱力学](../BHI21/index.md#prop-bhi21-thermal-thermodynamics)で $E=2\pi^2CT^2$。$E=C\kappa_{\rm eff}^2/2$ と定めて正の平方根を取れば

$$
\kappa_{\rm eff}(u)
=\sqrt{\frac{2E_0e^{-\gamma\tau}}C}
=\kappa_0e^{-\gamma\tau/2},
\quad T_{\rm eff}=\frac{\kappa_{\rm eff}}{2\pi}.
$$

正の平方根を選んだので温度は非負です。$\square$
<!-- proof-end -->

**二つの時間尺度**：$E$ の減衰時間は $\gamma^{-1}$、$\kappa_{\rm eff}$ の減衰時間は $2\gamma^{-1}$ です。瞬間的な熱周期は $\kappa_{\rm eff}^{-1}$ のオーダーなので、準静的に扱うには少なくとも $\gamma/\kappa_{\rm eff}\ll1$ が必要です。この条件は $u$ が進むと悪化します。形式上 $E(u)>0$ が永遠に続く式を、ブラックホール消滅の終期にまで適用してはいけません。

## 3. 指定された減衰を実現する境界軌道を構成する

エネルギー曲線を与えるだけでは、実際の境界時計 $F$ が存在するとは限りません。[BHI22の局所時計構成](../BHI22/index.md#prop-bhi22-local-clock)を、ここでは初期値と全ての有限未来時刻を指定して用います。

二階方程式の係数 $a(u)=E(u)/(2C)$ は正で連続です。二つの実解 $y_1,y_2$ に同じ微分方程式を課し、初期条件を互いに独立に選びます。二解の比を作る理由は、Wronskian（行列式の形をした解の独立性の量）がその導関数の符号を決めるからです。

<a id="def-bhi27-fundamental-clock"></a>

<!-- formal-statement-start -->
> **定義（初期値で規格化した蒸発境界時計）**
>
> [蒸発境界模型](#def-bhi27-evaporating-jt)の $E(u)$ に対し、
>
$$
y_j''-\frac{E(u)}{2C}y_j=0\quad(j=1,2)
$$
>
> の二解を
>
$$
\begin{array}{c|cc}
 &y_j(u_0)&y_j'(u_0)\\ \hline
j=1&0&1\\
j=2&1&0
\end{array}
$$
>
> で定める。$y_2(u)\ne0$ の区間で
>
$$
F(u):=u_0+\frac{y_1(u)}{y_2(u)}
$$
>
> と置く。この $F$ を初期値規格化された境界時計とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi27-fundamental-clock -->
**定義の直接確認**：初期点で $y_2(u_0)=1\ne0$。上の初期値から $F(u_0)=u_0$、$F'(u_0)=1$ です。二解のWronskianは初期点で $1\cdot1-0\cdot0=1>0$。第1節の例 $E_0=2C$ なら、方程式から $y_1''(u_0)=0$、$y_2''(u_0)=1$ であり、$F''(u_0)=0$、$\{F,u_0\}=-2$ が得られます。単なる形式上の比でなく、向きと初期エネルギーを確認できる構成です。
<!-- definition-example-end -->

<a id="prop-bhi27-exact-clock"></a>

<!-- formal-statement-start -->
> **命題（減衰流束と両立する時間依存時計の構成）**
>
> $C,c,E_0>0$ とし、$E(u)=E_0e^{-\gamma(u-u_0)}$ を取る。上の初期値問題は任意の有限区間 $[u_0,U]$ で一意な実解を持つ。全ての有限 $u\ge u_0$ で $y_2(u)\ge1$、$F'(u)>0$ であり、
>
$$
F'(u)=\frac1{y_2(u)^2},\qquad
\{F,u\}=-\frac{E(u)}C.
$$
>
> 従ってこの $F$ はエネルギーと流束の双方を**近似を用いずに**満たす。
<!-- formal-statement-end -->

### 証明の見取り図

二階線形方程式の解の存在・一意性とWronskianの保存を用います。係数が正なので $y_2$ が零へ近づかないことを直接示し、比の三階微分をSchwarzianへ代入します。

<!-- proof-start -->
### 証明

係数 $a(u)=E(u)/(2C)$ は各有限区間で連続です。線形初期値問題の存在・一意性から $y_1,y_2$ はその区間で定まり、有限区間を延長できます。Wronskianを $W=y_1'y_2-y_1y_2'$ と置くと

$$
W'=y_1''y_2-y_1y_2''
=a(u)y_1y_2-a(u)y_1y_2=0.
$$

初期値から $W(u_0)=1$、従って $W=1$ です。

$y_2(u_0)=1$、$y_2'(u_0)=0$、$y_2''=a(u)y_2$ です。仮に最初に $y_2=0$ となる有限時刻があれば、その直前まで $y_2>0$、従って $y_2''>0$、$y_2'>0$、$y_2\ge1$ となり、零に達することと矛盾します。よって $y_2\ge1$ が任意の有限未来時刻で成り立ちます。

比を微分すると

$$
F'=\frac{W}{y_2^2}=\frac1{y_2^2}>0,\qquad
\frac{F''}{F'}=-2\frac{y_2'}{y_2}.
$$

$q=F''/F'$ としてSchwarzianの等価表示 $\{F,u\}=q'-q^2/2$ を使えば

$$
\begin{aligned}
\{F,u\}
&=-2\left(\frac{y_2''}{y_2}-\frac{y_2'^2}{y_2^2}\right)
-2\frac{y_2'^2}{y_2^2}\\
&=-2\frac{y_2''}{y_2}
=-2a(u)=-\frac{E(u)}C.
\end{aligned}
$$

これを $E=-C\{F,u\}$ と $P=-c\{F,u\}/(24\pi)$ へ代入すると $P=\gamma E$ となり、[冷却命題](#prop-bhi27-cooling)の保存式と一致します。$\square$
<!-- proof-end -->

**一つの具体的な初期値**：$u_0=0$、$\kappa_0=2$、$E_0=2C$ なら $a(0)=1$。初期点でのTaylor展開は

$$
y_1(u)=u+\frac{u^3}{6}+O(u^4),\qquad
y_2(u)=1+\frac{u^2}{2}-\frac{\gamma u^3}{6}+O(u^4).
$$

これから $F(u)=u-u^3/3+O(u^4)$、$F'(0)=1$、$F''(0)=0$、$F'''(0)=-2$ で、初期の $\{F,0\}=-2$ を直接検算できます。係数の時間変化は $y_2$ の三次以降に現れます。

## 4. 「瞬間的な指数時計」がなぜ厳密解でないか

局所的な放射温度だけを見て、$p''/p'=-\kappa_{\rm eff}(u)$ と置く近似は便利です。しかし時間依存する $\kappa_{\rm eff}$ の微分がSchwarzianに入ります。

<a id="prop-bhi27-adiabatic-correction"></a>

<!-- formal-statement-start -->
> **命題（指数型の瞬間近似に残る導関数補正）**
>
> 正の $C^1$ 関数 $\kappa(u)$ について、$p'>0$ かつ $p''/p'=-\kappa(u)$ となる $C^3$ 写像を取る。この写像が作る流束は
>
$$
P_p(u)=\frac{c}{48\pi}\left(\kappa(u)^2+2\kappa'(u)\right).
$$
>
> 特に $\kappa=\kappa_0e^{-\gamma(u-u_0)/2}$ とすれば
>
$$
P_p=\frac{c}{48\pi}\left(\kappa^2-\gamma\kappa\right),
\qquad
P_{\rm exact}=\frac{c}{48\pi}\kappa^2.
$$
>
> 従って瞬間指数近似と[厳密な蒸発時計](#prop-bhi27-exact-clock)の流束の相対差は $-\gamma/\kappa$ である。
<!-- formal-statement-end -->

### 証明の見取り図

Schwarzianを比 $q=p''/p'$ で表し、$q=-\kappa$ を代入します。$\kappa$ の時間微分を零と置くことは、非定常系では追加の近似です。

<!-- proof-start -->
### 証明

$q=p''/p'$ を微分すると $q'=p'''/p'-(p''/p')^2$ なので

$$
\{p,u\}=\frac{p'''}{p'}-\frac32q^2
=q'-\frac12q^2
=-\kappa'-\frac12\kappa^2.
$$

[BHI22のSchwarzian流束](../BHI22/index.md#prop-bhi22-anomalous-flux)へ代入して $P_p=c(\kappa'+\kappa^2/2)/(24\pi)$ を得ます。指数的減衰なら $\kappa'=-\gamma\kappa/2$ なので表示式が従います。一方、[厳密解](#prop-bhi27-cooling)は $P_{\rm exact}=\gamma E=\gamma C\kappa^2/2=c\kappa^2/(48\pi)$ です。差を $P_{\rm exact}>0$ で割ると

$$
\frac{P_p-P_{\rm exact}}{P_{\rm exact}}
=-\frac{\gamma\kappa}{\kappa^2}
=-\frac{\gamma}{\kappa}.
$$

$\square$
<!-- proof-end -->

$\kappa\gg\gamma$ ではこの差は小さいですが、$\kappa<\gamma$ では瞬間指数近似の流束が負になります。**これは厳密な模型が負の流束を予言したのではなく、その近似が収支と両立しなくなった**ことを意味します。

## 5. 同じ時計で有限浴区間の精細エントロピーを計算する

浴の観測区間を固定してからエントロピーを求めます。平坦浴の座標 $(t,x)$ で $R(t)=[b,L]$、$0<b<L$、右向き光線ラベルは $u=t-x$ とします。端点を $u_b=t-b$、$u_L=t-L$ と記し、$u_L\ge u_0$ の時刻だけを扱います。長さ $\ell=L-b=u_b-u_L$ は固定です。

左向き成分は平坦真空、右向き成分は上の $U=p(u)=F(u)$ 真空です。[固定有限区間のislandなしエントロピー](../BHI23/index.md#prop-bhi23-finite-interval)を使うため、同じ浴区間、同じ正の紫外cutoff、同じ端点規格化を持つ平坦真空との差を取ります。これは二側永遠系の[BHI26の空island枝](../BHI26/index.md#prop-bhi26-empty-two-bath)とは**別の状態・別の領域**です。

<a id="def-bhi27-radiation-ledger"></a>

<!-- formal-statement-start -->
> **定義（蒸発浴の有限区間エントロピー台帳）**
>
> $0<b<L$、$t-L\ge u_0$、真空差の共通cutoff規約を固定し、$R(t)=[b,L]$ の正則化された物質エントロピーの差を
>
$$
\Delta S_R(t):=
S_{\rm matter}^{(a)}(R(t);p\text{-vacuum})
-S_{\rm matter}^{(a)}(R(t);\text{flat vacuum})
$$
>
> と定める。右向きの真空座標は[初期値規格化された時計](#def-bhi27-fundamental-clock) $p=F$、左向きは平坦真空とする。差の普遍的な共形部分を以下で計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-bhi27-radiation-ledger -->
**定義の直接確認**：$b=1,L=3,t=u_0+4$ とすれば $0<b<L$、$u_L=u_0+1$、$u_b=u_0+3$ は両方とも模型の定義域内です。同じ区間を同じcutoffで平坦真空から差し引くので、$\log a$ と共通端点定数は消えます。もし $p(u)=u$ の平坦真空を改めて代入すれば、この差は零です。蒸発模型では第3節の $p$ が非自明なので、次の命題で値を計算します。
<!-- definition-example-end -->

<a id="prop-bhi27-radiation-entropy"></a>

<!-- formal-statement-start -->
> **命題（蒸発時計による放射区間の精細エントロピー差）**
>
> 上の台帳と完全透過・右向き $p=F$ 真空を取り、共形真空の区間公式が成立する範囲で考える。$u_L=t-L$、$u_b=t-b$、$\ell=L-b>0$ とすると、普遍的な真空差は
>
$$
\boxed{\displaystyle
\Delta S_R^{\rm univ}(t)
=\frac c6\ln\left[
\frac{F(u_b)-F(u_L)}
{\ell\sqrt{F'(u_b)F'(u_L)}}\right]
=\frac c6\ln\frac{D(u_b,u_L)}{\ell},}
$$
>
> ただし
>
$$
D(v,s):=y_1(v)y_2(s)-y_1(s)y_2(v)\quad(v>s\ge u_0).
$$
>
> $E>0$ なら $D(v,s)\ge v-s$ なので $\Delta S_R^{\rm univ}\ge0$。$s=u_L$ として $\ell\to0^+$ の局所極限は
>
$$
\Delta S_R^{\rm univ}
=\frac{cE(s)}{72C}\ell^2+O(\ell^3).
$$
<!-- formal-statement-end -->

### 証明の見取り図

[固定有限区間のislandなしエントロピー](../BHI23/index.md#prop-bhi23-finite-interval)へ $p=F$ を代入し、両端のJacobianを残します。二解の比で書くと分母の $y_2$ が正確に消え、$D$ は正係数の二階微分方程式を満たします。短い区間の展開はその初期条件から求めます。

<!-- proof-start -->
### 証明

右向き真空の区間普遍項は、平坦真空との共通cutoff差を取ると

$$
\Delta S_R^{\rm univ}
=\frac c6\ln\left[
\frac{p(u_b)-p(u_L)}{u_b-u_L}
\frac1{\sqrt{p'(u_b)p'(u_L)}}\right]
$$

です。左向き成分は同じ平坦真空なので消えます。[時計の構成](#prop-bhi27-exact-clock)より $p=F=u_0+y_1/y_2$、$p'=1/y_2^2$。$y_2>0$ のため平方根の符号が確定し、

$$
\frac{F(v)-F(s)}{\sqrt{F'(v)F'(s)}}
=\left(\frac{y_1(v)y_2(s)-y_1(s)y_2(v)}
{y_2(v)y_2(s)}\right)y_2(v)y_2(s)
=D(v,s).
$$

固定した $s$ について二解の微分方程式を使うと

$$
\partial_v^2 D(v,s)=a(v)D(v,s),\quad
D(s,s)=0,\quad
\partial_vD(s,s)=W(s)=1.
$$

まず $D$ は $v>s$ の十分近傍で正です。もし初めて正から零へ戻る点があれば、その手前では $D''=aD>0$ で $D'\ge1$、従って零へ戻れず矛盾します。従って $D(v,s)>0$、$D''\ge0$、$D(v,s)\ge v-s$ です。

$a(s)=E(s)/(2C)$ として $v=s+\ell$ のTaylor展開を行うと、$D(s,s)=0,D'(s,s)=1,D''(s,s)=0,D'''(s,s)=a(s)$ なので

$$
D(s+\ell,s)=\ell+\frac{a(s)}6\ell^3+O(\ell^4),
\quad
\frac{D}{\ell}=1+\frac{E(s)}{12C}\ell^2+O(\ell^3).
$$

$\ln(1+z)=z+O(z^2)$ を適用して、$\Delta S_R^{\rm univ}=cE(s)\ell^2/(72C)+O(\ell^3)$ を得ます。$\square$
<!-- proof-end -->

この式は**同じ有限区間の精細エントロピーの真空差**です。ある時刻における放射の累積した熱力学的エントロピーではありません。区間を動かせば $u_b$ と $u_L$ の両端が同時に動くため、片方だけの赤方偏移を見て増加率を決めることもできません。

<a id="prop-bhi27-finite-detector"></a>

<!-- formal-statement-start -->
> **命題（固定長の浴検出区間の後期極限）**
>
> [蒸発模型](#def-bhi27-evaporating-jt)と[有限区間台帳](#def-bhi27-radiation-ledger)で $b,L$ を固定し、$t\to+\infty$ を同じ模型の数式内で形式的に取ると、
>
$$
\Delta S_R^{\rm univ}(t)\longrightarrow0.
$$
>
> これは固定された有限区間が冷却後の後期真空に近づくことを表す。蒸発終期の半古典的な妥当性を保証する主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

$D$ が満たす二階方程式の係数は後期に一様に零へ近づきます。固定区間の長さ $\ell$ を動かさず、積分方程式と正係数による上界で $D/\ell\to1$ を示します。

<!-- proof-start -->
### 証明

$s=t-L$、$v=s+\ell$ と置きます。区間 $[s,s+\ell]$ 上で $a(u)=E(u)/(2C)$ は単調減少し、

$$
0<a(u)\le a_s:=\frac{E_0}{2C}e^{-\gamma(s-u_0)}.
$$

$D$ の初期値問題を二回積分して

$$
D(s+h,s)=h+\int_0^h(h-r)a(s+r)D(s+r,s)\,dr
$$

を得ます。被積分核は非負ですから $D\ge h$。正係数の逐次積分による比較（同じ初期値を持つ定数係数解を上界にする）から

$$
h\le D(s+h,s)\le
\frac{\sinh(\sqrt{a_s}\,h)}{\sqrt{a_s}}
\quad(0\le h\le\ell).
$$

右辺は $a_s\to0$ で $h$ に収束します。特に $h=\ell$ で挟み撃ちすると $D(s+\ell,s)/\ell\to1$。前命題の対数式の連続性により $\Delta S_R^{\rm univ}\to0$ です。$\square$
<!-- proof-end -->

後期に零へ戻るのは**有限の検出区間の真空差**です。全放射を集める赤外極限やislandの精細エントロピーの消失を意味しません。$L\to\infty$ と $t\to\infty$ の順序についても[BHI23の赤外先行極限](../BHI23/index.md#prop-bhi23-hawking-branch)で学んだとおり、別々に調べる必要があります。

## 6. 準静的な熱エントロピー収支と交点候補

[BHI21の熱的JTエントロピー](../BHI21/index.md#prop-bhi21-thermal-thermodynamics)を各時刻に対応付けると、定数 $S_0\ge0$ を保持して

$$
S_{\rm BH}^{\rm ad}(u)=S_0+4\pi^2CT_{\rm eff}(u)
=S_0+2\pi C\kappa_{\rm eff}(u).
$$

これは準静的な**重力側の熱力学的エントロピー**です。幾何学的には[BHI20の定常JT地平線エントロピー](../BHI20/index.md#prop-bhi20-entropy)と[第一法則](../BHI20/index.md#prop-bhi20-first-law)を各瞬間に対応させます。AdS半径 $\ell>0$、Newton定数 $G_2>0$、正のdilaton境界傾き $a$ を固定し、$C=a\ell/(8\pi G_2)$ という[BHI21の係数規格化](../BHI21/index.md#prop-bhi21-thermal-thermodynamics)を採用すれば、瞬間的な静的解の地平線位置とdilaton値は

$$
\begin{aligned}
r_h^{\rm ad}(u)&=\ell^2\kappa_{\rm eff}(u)
=\ell^2\kappa_0e^{-\gamma\tau/2},\\
\Phi_h^{\rm ad}(u)&=\frac a\ell r_h^{\rm ad}(u)
=8\pi G_2 C\kappa_0e^{-\gamma\tau/2},\\
S_{\rm BH}^{\rm ad}(u)-S_0&=\frac{\Phi_h^{\rm ad}(u)}{4G_2}.
\end{aligned}
$$

この式は**dilatonの地平線値の準静的収支**です。時間依存する時空全域のdilaton場の偏微分方程式を解いたという主張ではありません。地平線値を時間微分すると、

$$
\dot\Phi_h^{\rm ad}=-\frac{\gamma}{2}\Phi_h^{\rm ad}
$$

です。エネルギーは率 $\gamma$、dilatonの地平線値は率 $\gamma/2$ で減衰します。

出射CFTを各瞬間に温度 $T_{\rm eff}$ の片向き熱流と近似します。対応する熱エネルギー流とエントロピー流は、

$$
P_{\rm th}=\frac{\pi c}{12}T_{\rm eff}^2,\qquad
j_{S,\rm th}=\frac{\pi c}{6}T_{\rm eff}
$$

です。後者は $dP_{\rm th}/dT=(\pi c/6)T$ と熱力学の関係 $dS=dE/T$ から、零温度を基準に積分して得られます。

<a id="prop-bhi27-entropy-budget"></a>

<!-- formal-statement-start -->
> **命題（準静的なエントロピー収支と収支交点）**
>
> $C,c,E_0>0,S_0\ge0$、入射真空、$p=F$ の蒸発模型を取り、熱的JT状態方程式と出射の片向き熱的エントロピー流を**準静的近似**で用いる。$\tau=u-u_0\ge0$、$x=e^{-\gamma\tau/2}$ と置くと、
>
$$
\begin{aligned}
S_{\rm BH}^{\rm ad}(u)&=S_0+2\pi C\kappa_0x,\\
S_{\rm rad}^{\rm coarse}(u;u_0)
&:=\int_{u_0}^u\frac{\pi c}{6}T_{\rm eff}(s)\,ds
=4\pi C\kappa_0(1-x).
\end{aligned}
$$
>
> この近似では、放射の粗視化エントロピー増分は重力の熱力学的エントロピーの減少量の2倍である。二曲線が**有限時刻**で一致する条件は $0\le S_0<4\pi C\kappa_0$ で、その収支交点は
>
$$
x_*=\frac{4\pi C\kappa_0-S_0}{6\pi C\kappa_0},
\qquad
\tau_*=\frac2\gamma\ln\frac1{x_*}.
$$
>
> この交点は**island端点を極値化したPage時刻ではない**。
<!-- formal-statement-end -->

### 証明の見取り図

瞬間温度を熱流の式へ代入して時刻積分します。重力側は温度に比例するので微分して比を検査します。交点については $x$ の一次方程式を解き、$x\in(0,1]$ を確認します。

<!-- proof-start -->
### 証明

$T_{\rm eff}(u)=\kappa_0e^{-\gamma\tau/2}/(2\pi)$ なので、熱的エントロピー流は

$$
j_{S,\rm th}(u)
=\frac{\pi c}{6}T_{\rm eff}(u)
=\frac{c\kappa_0}{12}e^{-\gamma\tau/2}.
$$

これを積分すると

$$
\begin{aligned}
S_{\rm rad}^{\rm coarse}
&=\frac{c\kappa_0}{12}
\int_0^\tau e^{-\gamma r/2}\,dr\\
&=\frac{c\kappa_0}{12}\frac2\gamma
(1-e^{-\gamma\tau/2})
=4\pi C\kappa_0(1-x),
\end{aligned}
$$

最後に $\gamma=c/(24\pi C)$ を代入しました。一方、$S_{\rm BH}^{\rm ad}-S_0=2\pi C\kappa_0x$ なので

$$
-\frac{dS_{\rm BH}^{\rm ad}}{du}
=\pi C\gamma\kappa_0x=\frac{c\kappa_0}{24}x,
\qquad
\frac{dS_{\rm rad}^{\rm coarse}}{du}
=\frac{c\kappa_0}{12}x.
$$

比は2です。交点を求めると

$$
4\pi C\kappa_0(1-x)=S_0+2\pi C\kappa_0x,
$$

よって $6\pi C\kappa_0x=4\pi C\kappa_0-S_0$ です。$S_0\ge0$ なら $x_*\le2/3<1$。$x_*>0$ と同値な条件は $S_0<4\pi C\kappa_0$ であり、$\tau_*=-(2/\gamma)\ln x_*$ は有限非負です。$S_0=4\pi C\kappa_0$ のときは形式的な $x_*=0$、つまり有限時刻の交点はありません。$\square$
<!-- proof-end -->

**直接例**：$S_0=0$ なら $x_*=2/3$、$\tau_*=(2/\gamma)\ln(3/2)$ です。この時点でも $\gamma/\kappa_{\rm eff}(u_*)\ll1$ を確認しなければ準静的近似の数値的な意味はありません。

ここでの $S_{\rm rad}^{\rm coarse}$ は、各瞬間の熱的流束に対応するエントロピーの**累積近似**です。第5節の $\Delta S_R^{\rm univ}$ は特定の有限区間の**精細エントロピー真空差**です。放射全体の精細エントロピーを求めるには、観測領域、端点とcutoff、非平衡状態、重力側のisland候補とその二方向の極値化を同一の模型で求める必要があります。[BHI24の一般化エントロピー](../BHI24/index.md#def-bhi24-jt-island-ledger)と[BHI25の端点極値化](../BHI25/index.md#prop-bhi25-two-endpoint-equations)を、BHI26の定常二浴の数値へそのまま代入しても、その仕事は完了しません。

## 7. 蒸発の初期条件・終期条件と模型の読み方

| 確認点 | 本講の蒸発模型 | BHI26の定常二浴模型 |
| --- | --- | --- |
| 浴と状態 | 片側、入射平坦真空、出射 $p=F$ 真空 | 二側、熱平衡のKruskal状態 |
| エネルギー | $\dot E=-\gamma E<0$ | 正味流束0、時間に依存しない温度 |
| 境界時計 | 初期値付き二階方程式の解の比 | 定常Kruskal写像 |
| 放射量 | 有限 $[b,L]$ の精細エントロピー**真空差** | 二浴半直線の空枝とisland枝の値 |
| 時間限界 | 初期時刻 $u_0$ より後の半古典区間 | 定常幾何の後期極限 |
| Page型の折返し | 本講ではまだQESと枝比較を計算していない | 同一模型で二変数QESを極値化した候補比較 |

**初期**には $u_0,E_0$ と時計の3階までの規格化を指定しました。入射が真空で、流出が始まるという接合条件も初期データの一部です。**終期**には、指数的な式の形式的極限 $E\to0$ があるだけです。いつ半古典近似を外し、どの状態へ接続し、どの領域に情報を回収するかは別の境界値問題として残ります。

今回得た実計算は次の三つです。

1. $E$ の減衰と正の出射流束を、実在する向き保存の時計から同時に再構成した。
2. 二端点Jacobianを保った真空差 $\Delta S_R^{\rm univ}$ を得て、短区間と有限検出器の後期極限を検証した。
3. 準静的熱エントロピーの収支を求め、粗視化の交点だけではPage転移を証明できないことを確認した。

次講BHI28では、放射領域の複製と重力の境界条件を指定し、ここで区別した「精細エントロピーを計算すること」を重力レプリカの問題へ進めます。

## 8. 演習：同じ模型の時計・流束・エントロピーを結ぶ

### Level A：各条件を単独で確認する

<a id="ex-bhi27-a01"></a>

#### BHI27-A01 エネルギーと冷却率

- Level: A
- 問題: $C,c,E_0>0$、$u\ge u_0$ で $E=-C\{F,u\}$、$P=-c\{F,u\}/(24\pi)$、$\dot E=-P$ とする。$E(u)$ とその半減時刻を求めよ。

<!-- solution-start -->
**詳細解答**：二式の比から $P=cE/(24\pi C)=\gamma E$、$\gamma=c/(24\pi C)$。保存条件は $\dot E=-\gamma E$ なので $E(u)=E_0e^{-\gamma(u-u_0)}$。半減条件 $E/E_0=1/2$ に代入すると $-\gamma(u-u_0)=-\ln2$、従って半減までの時間は $\ln2/\gamma$ である。
<!-- solution-end -->

<a id="ex-bhi27-a02"></a>

#### BHI27-A02 Wronskianと時計の向き

- Level: A
- 問題: $y_j''=a(u)y_j$、$a(u)>0$、$y_1(u_0)=0,y_1'(u_0)=1,y_2(u_0)=1,y_2'(u_0)=0$ とする。$W=y_1'y_2-y_1y_2'$ と $F'=(y_1/y_2)'$ を求めよ。

<!-- solution-start -->
**詳細解答**：$W'=y_1''y_2-y_1y_2''=a y_1y_2-a y_1y_2=0$。初期値から $W(u_0)=1$ なので $W=1$。$y_2''=a y_2$、$y_2(u_0)=1,y_2'(u_0)=0$ であり、最初の零点があると仮定すると、その手前で $y_2''>0$、$y_2'\ge0$、$y_2\ge1$ となり矛盾する。よって $y_2>0$。比を微分して $F'=W/y_2^2=1/y_2^2>0$。
<!-- solution-end -->

<a id="ex-bhi27-a03"></a>

#### BHI27-A03 時計の三階微分と初期流束

- Level: A
- 問題: $u_0=0,E_0=2C$ とする。初期値規格化した $F$ の $F'(0),F''(0),F'''(0)$ と出射流束 $P(0)$ を求めよ。

<!-- solution-start -->
**詳細解答**：$a(0)=E_0/(2C)=1$。$y_2(0)=1,y_2'(0)=0,y_2''(0)=1$ と $F'=y_2^{-2}$ から $F'(0)=1$、$F''=-2y_2'/y_2^3$ より $F''(0)=0$。さらに $F'''=-2y_2''/y_2^3+6y_2'^2/y_2^4$ なので $F'''(0)=-2$。Schwarzianは $\{F,0\}=-2$、[BHI22の流束公式](../BHI22/index.md#prop-bhi22-anomalous-flux)で $P(0)=-c\{F,0\}/(24\pi)=c/(12\pi)$。
<!-- solution-end -->

<a id="ex-bhi27-a04"></a>

#### BHI27-A04 二端点の真空差

- Level: A
- 問題: $u_L<u_b$、$\ell=u_b-u_L$、右向き真空写像を $p(u)=au+d$（$a>0$）とする。[有限区間台帳](#def-bhi27-radiation-ledger)の普遍的な真空差が零であることを示せ。

<!-- solution-start -->
**詳細解答**：$p(u_b)-p(u_L)=a\ell$、両端で $p'=a$。従って[固定有限区間のislandなしエントロピー](../BHI23/index.md#prop-bhi23-finite-interval)の対数内は $(a\ell)/(\ell\sqrt{a\cdot a})=1$。$\ln1=0$ なので真空差は零。共通cutoffと規格化の定数は、同じ区間の真空を差し引いた段階で既に消えている。
<!-- solution-end -->

<a id="ex-bhi27-a05"></a>

#### BHI27-A05 瞬間指数近似の破綻点

- Level: A
- 問題: $\kappa(u)=\kappa_0e^{-\gamma(u-u_0)/2}$、$p''/p'=-\kappa$ とする。近似流束が零になる時刻を求め、その時点の準静的条件を判定せよ。$\kappa_0>\gamma$ とする。

<!-- solution-start -->
**詳細解答**：[指数型の瞬間近似に残る導関数補正](#prop-bhi27-adiabatic-correction)から $P_p=c\kappa(\kappa-\gamma)/(48\pi)$。$\kappa>0$ なので零は $\kappa=\gamma$ で起こる。$\kappa_0e^{-\gamma\tau/2}=\gamma$ を解けば $\tau=(2/\gamma)\ln(\kappa_0/\gamma)>0$。この時点で $\gamma/\kappa=1$ となり、必要条件 $\gamma/\kappa\ll1$ を満たさない。厳密時計の流束 $c\kappa^2/(48\pi)$ はこの時点でも正である。
<!-- solution-end -->

### Level B：複数の結果を接続する

<a id="ex-bhi27-b01"></a>

#### BHI27-B01 二解の比から区間の局所エントロピーまで

- Level: B
- 問題: $a(u)=E(u)/(2C)$、二解の初期値は第3節のとおりとする。固定した $s\ge u_0$ に対し $D(v,s)=y_1(v)y_2(s)-y_1(s)y_2(v)$ の初期条件を求め、$v=s+\ell$ でのエントロピー真空差の二次係数を導け。

<!-- solution-start -->
**詳細解答**：各 $y_j''=ay_j$ により $D_{vv}=a(v)D$。$D(s,s)=0$。$D_v(s,s)=y_1'(s)y_2(s)-y_1(s)y_2'(s)=W(s)=1$。[時計の構成](#prop-bhi27-exact-clock)で $W=1$ である。さらに $D_{vv}(s,s)=a(s)D(s,s)=0$、$D_{vvv}(s,s)=a'(s)D(s,s)+a(s)D_v(s,s)=a(s)$。Taylorの定理から $D(s+\ell,s)=\ell+a(s)\ell^3/6+O(\ell^4)$。従って

$$
\frac c6\ln\frac D\ell
=\frac c6\left(\frac{a(s)}6\ell^2+O(\ell^3)\right)
=\frac{cE(s)}{72C}\ell^2+O(\ell^3).
$$

この結果は[放射エントロピー命題](#prop-bhi27-radiation-entropy)の係数と一致する。
<!-- solution-end -->

<a id="ex-bhi27-b02"></a>

#### BHI27-B02 有限検出区間の後期上界

- Level: B
- 問題: $E(u)=E_0e^{-\gamma(u-u_0)}$、$\ell=L-b>0$ を固定する。$s=t-L$ に対し $a_s=E(s)/(2C)$ と置き、$0\le\Delta S_R^{\rm univ}$ の後期上界と極限を示せ。

<!-- solution-start -->
**詳細解答**：$u\in[s,s+\ell]$ で $0<a(u)\le a_s$。$D''=aD$、$D(s,s)=0,D_v(s,s)=1$ の積分表示から $D(s+\ell,s)\ge\ell$。同じ初期値を持つ定数係数方程式 $H''=a_sH$ の解 $H(h)=\sinh(\sqrt{a_s}h)/\sqrt{a_s}$ は逐次積分項の各係数を上から抑えるので $D(s+\ell,s)\le H(\ell)$。従って[放射区間の命題](#prop-bhi27-radiation-entropy)より

$$
0\le\Delta S_R^{\rm univ}(t)
\le\frac c6\ln\left[
\frac{\sinh(\sqrt{a_s}\ell)}{\sqrt{a_s}\ell}\right].
$$

$s\to\infty$ で $a_s\to0$。$\sinh z/z=1+z^2/6+O(z^4)$ を使うと右辺は零へ収束するので、挟み撃ちから $\Delta S_R^{\rm univ}\to0$。
<!-- solution-end -->

<a id="ex-bhi27-b03"></a>

#### BHI27-B03 熱流と第一法則を別々に積分する

- Level: B
- 問題: $E=2\pi^2CT^2$、$S_{\rm BH}^{\rm ad}-S_0=4\pi^2CT$、$P=\pi cT^2/12$、$T=T_0e^{-\gamma\tau/2}$ とする。$dE=T\,dS_{\rm BH}^{\rm ad}$ と、片向き熱流のエントロピー流 $j_S$ を確かめ、二つのエントロピー率の比を求めよ。

<!-- solution-start -->
**詳細解答**：温度微分は $dE/dT=4\pi^2CT$、$dS_{\rm BH}^{\rm ad}/dT=4\pi^2C$ なので $T(dS_{\rm BH}^{\rm ad}/dT)=dE/dT$。出射の熱エネルギー流の温度微分は $dP/dT=\pi cT/6$ であり、熱的な片向き流れのエントロピー流は零温度を基準に $j_S=\int_0^T (1/T') (dP/dT')\,dT'=\pi cT/6$。また $\dot S_{\rm BH}^{\rm ad}=\dot E/T=-P/T=-\pi cT/12$。従って $j_S/(-\dot S_{\rm BH}^{\rm ad})=(\pi cT/6)/(\pi cT/12)=2$。精細エントロピーの時間微分に同じ等式を置いたわけではない。
<!-- solution-end -->

<a id="ex-bhi27-b04"></a>

#### BHI27-B04 交点の存在と近似の条件

- Level: B
- 問題: $S_0\ge0$ とし、[収支命題](#prop-bhi27-entropy-budget)の二曲線が有限時刻で交わる条件を求めよ。さらに $S_0=0$ での交点の $\gamma/\kappa_{\rm eff}$ を計算し、何を確認すれば準静的近似として使えるか述べよ。

<!-- solution-start -->
**詳細解答**：交点は $4\pi C\kappa_0(1-x)=S_0+2\pi C\kappa_0x$、従って $x=(4\pi C\kappa_0-S_0)/(6\pi C\kappa_0)$。有限 $\tau\ge0$ なら $0<x\le1$。$S_0\ge0$ の下では上限は自動的に満たされ、正値条件は $S_0<4\pi C\kappa_0$。$S_0=0$ なら $x=2/3$ で、$\kappa_{\rm eff}(\tau_*)=2\kappa_0/3$。従って $\gamma/\kappa_{\rm eff}(\tau_*)=3\gamma/(2\kappa_0)$。これが十分小さいことに加え、半古典的な重力・熱流近似がその時点でも適用できることを確認する必要がある。交点だけではQESの存在・支配性を示さない。
<!-- solution-end -->

### Level C：冷却・時計・放射の全体像

<a id="ex-bhi27-c01"></a>

#### BHI27-C01 蒸発模型の一貫性検査

- Level: C
- 問題: $C>0,c=1,u_0=0,E_0=C/2,S_0=0$ を取り、$\gamma=1/(24\pi C)$ とする。

1. エネルギー、瞬間的な $\kappa_{\rm eff}$、正味流束を求め、次元と符号を検査せよ。
2. 二つの二階方程式の初期値から時計 $F$ を構成し、$\{F,u\}=-E/C$ を示せ。
3. $R(t)=[b,L]$、$0<b<L$、$t-L\ge0$ に対し共通cutoffの精細エントロピー差を二解で表せ。$R(t)$ の固定長の後期極限を述べよ。
4. 熱的な粗視化放射エントロピーと重力エントロピーの交点候補を求め、この計算だけでPage転移を宣言できない理由を述べよ。

<!-- solution-start -->
**詳細解答**：

**（1）** $\kappa_0=\sqrt{2E_0/C}=1$。よって[冷却命題](#prop-bhi27-cooling)から

$$
E=\frac C2e^{-\gamma u},\qquad
\kappa_{\rm eff}=e^{-\gamma u/2},\qquad
P=\gamma\frac C2e^{-\gamma u}
=\frac1{48\pi}e^{-\gamma u}.
$$

$E>0,P>0$。$[E]=L^{-1},[P]=L^{-2}$、$\gamma>0$ なので $\dot E=-P<0$ である。

**（2）** $a(u)=E/(2C)=e^{-\gamma u}/4$ と置き、$y_j''=ay_j$ に $y_1(0)=0,y_1'(0)=1,y_2(0)=1,y_2'(0)=0$ を与える。$W'=0$、$W(0)=1$ なので $W=1$。$a>0$ と $y_2(0)=1,y_2'(0)=0$ から $y_2\ge1$。よって $F=y_1/y_2$ は $F'=1/y_2^2>0$。さらに

$$
\{F,u\}=-2\frac{y_2''}{y_2}
=-2a=-\frac12e^{-\gamma u}
=-\frac EC.
$$

したがって流束の式は（1）に一致する。

**（3）** $u_L=t-L$、$u_b=t-b$ はともに非負、$\ell=L-b$。両端のJacobianを保った[固定有限区間のislandなしエントロピー](../BHI23/index.md#prop-bhi23-finite-interval)から

$$
\Delta S_R^{\rm univ}
=\frac16\ln\frac{
y_1(u_b)y_2(u_L)-y_1(u_L)y_2(u_b)
}{L-b}.
$$

分母・分子はともに時間の次元を持ち、対数内は無次元。積分方程式の比較で $1\le D/\ell\le\sinh(\sqrt{a_{u_L}}\ell)/(\sqrt{a_{u_L}}\ell)$。$t\to\infty$ では $a_{u_L}\to0$ なので差は零へ近づく。

**（4）** [準静的収支命題](#prop-bhi27-entropy-budget)に $\kappa_0=1,S_0=0$ を代入すると

$$
S_{\rm rad}^{\rm coarse}=4\pi C(1-x),\qquad
S_{\rm BH}^{\rm ad}=2\pi Cx,\qquad x=e^{-\gamma u/2}.
$$

交点では $4(1-x)=2x$ なので $x=2/3$、$u_*=(2/\gamma)\ln(3/2)$ となる。$\gamma/\kappa_{\rm eff}(u_*)=3\gamma/2$ が十分小さい場合のみ準静的近似の範囲にある。さらにこの比較は有限区間の精細エントロピーでもisland端点を極値化した候補でもない。Page転移の主張には、同一状態・同一放射領域でQESを極値化し、他の鞍点との支配関係と近似範囲を調べる必要がある。
<!-- solution-end -->

## 9. まとめ

時間依存のJT境界は、指定した蒸発エネルギーから二階方程式の二解の比として構成できます。その同じ境界時計をCFTの出射状態へ使えば、エネルギーと流束だけでなく、有限浴区間の精細エントロピー真空差まで一貫して計算できます。

準静的な熱エントロピーの収支は蒸発によるエネルギー・熱の移動を説明しますが、放射全体の精細エントロピーとisland鞍点の比較は別の計算です。ここを分けたことが、次講の重力レプリカで何を求めるのかを明確にします。
