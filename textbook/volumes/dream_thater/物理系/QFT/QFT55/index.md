# QFT55 平面–円筒写像・Schwarzianと有限サイズ・熱的相関

<!-- definition-example-audit: strict -->

QFT54では、平面上で局所場を近づけてOPEと四点相関を調べました。しかし有限の長さの円周上では、局所的に同じ理論でも真空のエネルギーが零とは限りません。平面で真空の応力テンソルの期待値が零なのに、円筒で負の定数が現れるのはなぜでしょうか。

鍵は、[QFT51の応力テンソルの局所量子Ward作用](../QFT51/index.md#cor-qft51-stress-ward)です。中心電荷を含む三階微分の項は、有限の共形写像でも特別な補正を生みます。その形を手で導いてから、円周の真空エネルギー、励起準位、二点相関関数を計算します。

この章は二次元Euclid CFTを扱います。正則・反正則の中心電荷をそれぞれ $c,\bar c$、対応する応力テンソルを $t(z),\bar t(\bar z)$ と記します。円周の長さを $L>0$、逆温度を $\beta>0$ とし、$\hbar=v=1$ とします。局所的な正則写像では導関数が零でない領域を使い、挿入点が衝突する位置は除きます。平面真空と円筒真空の対応を指定したときの式であり、任意の境界条件・任意の状態に同じ期待値を主張するものではありません。

## 1. 平面を巻いて円筒にする

[QFT52の放射量子化](../QFT52/index.md#def-qft52-radial-state)では平面の円 $|z|=\text{const.}$ を時間一定の切片としていました。半径の対数を時間に、偏角を空間座標に取れば、半径方向の時間発展が円筒の時間発展に変わります。

円筒座標 $w=\tau+ix$ は $\tau\in\mathbb R$、$x\in\mathbb R/L\mathbb Z$ とし、反正則座標は $\bar w=\tau-ix$ とします。$\alpha=2\pi/L$ を固定し、指数関数 $e^{\alpha w}$ によって平面の原点を除いた領域へ移します。

<a id="def-qft55-cylinder-map"></a>

<!-- formal-statement-start -->
> **定義（空間円周をもつ円筒の平面写像）**  
> 周長 $L>0$ のEuclid円筒 $w=\tau+ix$（$x\sim x+L$）に対して、正則・反正則座標を

$$
z=e^{\alpha w},\qquad \bar z=e^{\alpha\bar w},\qquad
\alpha=\frac{2\pi}{L}
$$

> で対応させる。$z\ne0$ の平面を円筒とみなし、$\tau$ が増加する向きを半径が増える向きとする。
<!-- formal-statement-end -->

この対応では $|z|=e^{\alpha\tau}$、$\arg z=\alpha x\pmod{2\pi}$ です。したがって空間を一周しても同じ $z$ に戻り、逆に平面の原点と無限遠は $\tau\to-\infty,+\infty$ に対応します。微分は

$$
\frac{dz}{dw}=\alpha z,\quad
\frac{d^2z}{dw^2}=\alpha^2z,\quad
\frac{d^3z}{dw^3}=\alpha^3z
$$

であり、有限の $w$ では第1導関数が零になりません。

<!-- definition-example-start: def-qft55-cylinder-map -->
**定義の確認**：$x=0,L/4,L/2,L$ は同じ $\tau$ で、それぞれ $z=e^{\alpha\tau},ie^{\alpha\tau},-e^{\alpha\tau},e^{\alpha\tau}$ に移ります。四つの点は円周を一周し、最後の点だけが最初と一致します。$\tau$ を $L\log2/(2\pi)$ だけ増すと $|z|$ が2倍になることも定義から直接確かめられます。
<!-- definition-example-end -->

## 2. 応力テンソルの三階微分を有限変換へ運ぶ

一次場は [QFT50の正則・反正則ウェイト](../QFT50/index.md#def-qft50-weights) に従い座標の第1導関数のべきで変換します。しかし応力テンソルには [中心電荷付きOPE](../QFT51/index.md#def-qft51-stress-ope) があり、第1導関数だけでは足りません。どんな追加項なら写像を二回合成しても矛盾しないかを調べます。

[QFT50の局所正則共形変換](../QFT50/index.md#def-qft50-local-conformal)として正則な座標写像 $f$ で $f'\ne0$ とするとき、次の三階微分の組合せを使います。微分はすべて元の座標 $w$ に関するものです。

<a id="def-qft55-schwarzian"></a>

<!-- formal-statement-start -->
> **定義（正則写像のSchwarzian微分）**  
> 正則局所写像 $f(w)$ が三回微分可能で $f'(w)\ne0$ の点において、この三階微分の組合せを

$$
\{f,w\}:=\frac{f'''(w)}{f'(w)}
-\frac32\left(\frac{f''(w)}{f'(w)}\right)^2
$$

> と定義する。これは一般の一次場の変換因子ではなく、応力テンソルに必要な追加項である。
<!-- formal-statement-end -->

**手で確かめる例**：$f(w)=aw+b$（$a\ne0$）では二階・三階微分が零なので $\{f,w\}=0$。指数関数 $f(w)=e^{\alpha w}$ では $f'''/f'=\alpha^2$、$f''/f'=\alpha$ だから

$$
\{e^{\alpha w},w\}=\alpha^2-\frac32\alpha^2
=-\frac{\alpha^2}{2}.
$$

この負号が円筒真空のエネルギーの負号になります。

<!-- definition-example-start: def-qft55-schwarzian -->
**定義の確認**：$f(w)=1/w$（$w\ne0$）では $f'=-w^{-2}$、$f''=2w^{-3}$、$f'''=-6w^{-4}$。よって $f'''/f'=6/w^2$、$(f''/f')^2=4/w^2$ なので $\{f,w\}=0$。指数関数の場合は非零なのに、反転では零です。これは大域Möbius変換では中心電荷の補正が消えることと整合します。
<!-- definition-example-end -->

<a id="lem-qft55-schwarzian-chain"></a>

<!-- formal-statement-start -->
> **補題（正則写像のSchwarzian合成則）**  
> $f,g$ が三回微分可能な正則局所写像で、$g'(w)\ne0$、$f'(g(w))\ne0$ なら

$$
\{f\circ g,w\}=g'(w)^2\{f,g(w)\}+\{g,w\}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$f''/f'$ と $g''/g'$ をそれぞれ対数微分としてまとめると、混合項が打ち消し合います。この打消しが応力テンソルの写像合成の整合性を保証します。

<!-- proof-start -->
### 証明

$A(u)=f''(u)/f'(u)$、$B(w)=g''(w)/g'(w)$ と置く。$f,A$ のプライムは $u$ に関する微分、$g,B,F$ のプライムは $w$ に関する微分とし、$A'(g)$ は $dA/du$ を $u=g(w)$ で評価したものとする。$F=f\circ g$ について連鎖律を一回ずつ使うと

$$
F'=f'(g)g',\qquad
\frac{F''}{F'}=A(g)g'+B.
$$

任意の $F$ に対して $\{F,w\}=(F''/F')'-\tfrac12(F''/F')^2$ です。したがって

$$
\begin{aligned}
\{F,w\}
&=A'(g)(g')^2+A(g)g''+B'\\
&\quad-\tfrac12\bigl(A(g)^2(g')^2+2A(g)g'B+B^2\bigr)\\
&=(g')^2\bigl(A'(g)-\tfrac12A(g)^2\bigr)
+\bigl(B'-\tfrac12B^2\bigr).
\end{aligned}
$$

ここで $g''=g'B$ により混合項 $A(g)g''-A(g)g'B$ が相殺した。第1項は $g'^2\{f,g\}$、第2項は $\{g,w\}$ であり、補題を得る。
<!-- proof-end -->

以下、$t_z(z)$ と $t_w(w)$ は同じ正則応力テンソルをそれぞれ $z$ 座標と $w$ 座標で表した成分とします。$t_z'(z)$ は $z$ 微分、$f'(w)$ は $w$ 微分であり、合成 $t_z(f(w))$ の微分には連鎖律を使います。

<a id="thm-qft55-stress-transform"></a>

<!-- formal-statement-start -->
> **定理（正則応力テンソルの有限共形変換）**  
> 中心電荷 $c$ をもつ二次元Euclid CFTで、[応力テンソルの局所Ward作用](../QFT51/index.md#cor-qft51-stress-ward) が成り立つとする。座標 $z=f(w)$ が向きを保つ正則局所写像で $f'\ne0$ なら、同じ局所状態を二つの座標で記述した応力テンソルは

$$
t_{w}(w)=f'(w)^2t_{z}(f(w))
+\frac{c}{12}\{f,w\}
$$

> と関係する。反正則成分では $c,f,w$ を $\bar c,\bar f,\bar w$ に置き換える。大域的な状態・境界条件の選択は、この局所変換則だけでは固定されない。
<!-- formal-statement-end -->

### 証明の見取り図

小さな写像 $f(w)=w+\epsilon(w)$ に戻すとSchwarzianは $\epsilon'''$ となり、QFT51の中心項と係数が一致します。合成則を使うことで微小変換をつなげられます。

<!-- proof-start -->
### 証明

$f(w)=w+\epsilon(w)$ とし、$\epsilon$ の二次以上を捨てる。$f'=1+\epsilon'$、$f''=\epsilon''$、$f'''=\epsilon'''$ なので

$$
\{f,w\}=\epsilon'''+O(\epsilon^2),\qquad
f'^2t_z(f(w))=t_z(w)+\epsilon t_z'(w)+2\epsilon't_z(w)+O(\epsilon^2).
$$

したがって上式の一次変化は $\epsilon t'+2\epsilon't+(c/12)\epsilon'''$ であり、[局所量子Ward作用](../QFT51/index.md#cor-qft51-stress-ward) と一致する。さらに $z=f(u),u=g(w)$ と二段階に変換すると、中心項は

$$
\frac{c}{12}\left[g'^2\{f,g\}+\{g,w\}\right]
=\frac{c}{12}\{f\circ g,w\}
$$

となり、[正則写像のSchwarzian合成則](#lem-qft55-schwarzian-chain)によって一度に変換した式に等しい。恒等変換ではSchwarzianが零なので初期値も一致する。恒等写像から滑らかな局所正則写像の経路に沿って微小変換を合成すれば有限変換式を得る。指数関数による写像には局所的にこの議論を適用し、円筒全体での状態の選択は別途指定する。
<!-- proof-end -->

## 3. 円周の真空エネルギーは中心電荷を測る

平面真空では $\langle t_z(z)\rangle=0$ と規格化します。指数関数のSchwarzianが負の定数なので、円筒で真空の応力テンソルは零になりません。これは局所的な座標の引き伸ばしだけでは説明できない効果です。

<a id="prop-qft55-cylinder-stress"></a>

<!-- formal-statement-start -->
> **命題（円筒真空の応力テンソル）**  
> 平面真空 $\langle t_z\rangle=\langle\bar t_{\bar z}\rangle=0$ を $z=e^{2\pi w/L}$ によって周長 $L>0$ の円筒へ移したとき、円筒真空の一体期待値は

$$
\langle t_w\rangle_{\rm cyl}=-\frac{\pi^2c}{6L^2},\qquad
\langle\bar t_{\bar w}\rangle_{\rm cyl}=-\frac{\pi^2\bar c}{6L^2}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前節の有限変換式に $f=e^{\alpha w}$ と平面真空の零期待値を入れます。Schwarzianの $-\alpha^2/2$ だけが残ります。

<!-- proof-start -->
### 証明

[有限共形変換](#thm-qft55-stress-transform)より

$$
\langle t_w\rangle=\alpha^2z^2\langle t_z(z)\rangle
+\frac{c}{12}\{e^{\alpha w},w\}
=0-\frac{c\alpha^2}{24}.
$$

$\alpha=2\pi/L$ を代入すると $-c(4\pi^2/L^2)/24=-\pi^2c/(6L^2)$。反正則成分も独立に同じ計算を行う。
<!-- proof-end -->

平面の真空が円筒の最低エネルギー状態に対応することは、放射量子化と境界条件を用いる追加の仮定です。たとえばフェルミオンの周期・反周期の選択や、ねじった部門では最低ウェイトが変わり得ます。

<a id="thm-qft55-cylinder-spectrum"></a>

<!-- formal-statement-start -->
> **定理（空間円周のエネルギーと運動量）**  
> [放射量子化](../QFT52/index.md#def-qft52-radial-state)で平面の $L_0,\bar L_0$ が定義され、周長 $L>0$ の円筒へ $z=e^{2\pi w/L}$ で移した二次元CFTを考える。エネルギーの基準は上の応力テンソル規格化で固定し、$x$ 正方向の運動量を選ぶ。このとき円筒の発展・並進生成子は

$$
H_L=\frac{2\pi}{L}\left(L_0+\bar L_0-\frac{c+\bar c}{24}\right),\qquad
P_L=\frac{2\pi}{L}\left(L_0-\bar L_0-\frac{c-\bar c}{24}\right).
$$

> 特に $L_0=\bar L_0=0$ の真空が許される部門では、$c=\bar c$ のとき $E_0=-\pi c/(6L)$、$P_0=0$。この真空からウェイト $(h,\bar h)$ の状態へのエネルギー差は $2\pi(h+\bar h)/L$ である。
<!-- formal-statement-end -->

### 証明の見取り図

円筒の $\tau$ 並進は平面の一様な拡大、$x$ 並進は回転です。[Virasoroモード](../QFT51/index.md#def-qft51-virasoro-modes)の $L_0,\bar L_0$ が対応する一方、応力テンソルの定数移動が零点エネルギーを変えます。

<!-- proof-start -->
### 証明

[QFT51のVirasoro輪郭モード](../QFT51/index.md#def-qft51-virasoro-modes)から得る局所Laurent展開 $t_z(z)=\sum_n L_nz^{-n-2}$ を使い、[有限共形変換](#thm-qft55-stress-transform)に代入すると

$$
t_w(w)=\alpha^2\left(\sum_nL_ne^{-\alpha nw}-\frac{c}{24}\right).
$$

同様に $\bar t_{\bar w}=\alpha^2(\sum_n\bar L_ne^{-\alpha n\bar w}-\bar c/24)$。$x\in[0,L)$ を一周して平均すると、$n\ne0$ では $\int_0^L e^{-2\pi inx/L}dx=0$（反正則成分も同じ）なので零モードだけが残る。したがって円筒の二つの零モードは $\alpha^2(L_0-c/24)$ と $\alpha^2(\bar L_0-\bar c/24)$ である。

[QFT50の共形輪郭電荷](../QFT50/index.md#def-qft50-contour-charge)を円筒の時刻 $\tau$ 一定の空間周回に移す。$dw=i\,dx$、$d\bar w=-i\,dx$ なので、反正則側では周回の向きを反転して正規化すると、二つの零モード電荷は

$$
\begin{aligned}
Q_+&=\frac1{2\pi}\int_0^L t_w(\tau+ix)\,dx
=\frac{L\alpha^2}{2\pi}\left(L_0-\frac{c}{24}\right)
=\alpha\left(L_0-\frac{c}{24}\right),\\
Q_-&=\frac1{2\pi}\int_0^L\bar t_{\bar w}(\tau-ix)\,dx
=\alpha\left(\bar L_0-\frac{\bar c}{24}\right).
\end{aligned}
$$

$\partial_\tau=\alpha(z\partial_z+\bar z\partial_{\bar z})$ は両電荷の和、$\partial_x=i\alpha(z\partial_z-\bar z\partial_{\bar z})$ は差に対応する。Euclid時間発展 $e^{-\tau H_L}$ と空間並進 $e^{ixP_L}$ の規約で $H_L=Q_++Q_-$、$P_L=Q_+-Q_-$ とすれば定理の式を得る。真空では $L_0=\bar L_0=0$ を代入し、$c=\bar c$ なら

$$
E_0=-\frac{2\pi}{L}\frac{2c}{24}=-\frac{\pi c}{6L}.
$$

二つの状態のエネルギー差を取ると共通の中心電荷定数が消え、$\Delta E=(2\pi/L)(\Delta h+\Delta\bar h)$ となる。特にウェイト零の真空から $(h,\bar h)$ への差は $(2\pi/L)(h+\bar h)$ である。
<!-- proof-end -->

**具体例**：[QFT53の中心電荷](../QFT53/index.md#thm-qft53-majorana-central)では、左右対称な自由bosonは $c=\bar c=1$、自由Majorana（NS真空）なら $c=\bar c=1/2$ です。ゆえに

$$
E_0^{\rm boson}=-\frac{\pi}{6L},\qquad
E_0^{\rm Majorana,NS}=-\frac{\pi}{12L}.
$$

どちらも $1/L$ で変わり、密度を考えると $1/L^2$ です。円周の長さを半分にすると真空エネルギーの絶対値は2倍になり、最低励起とのエネルギー間隔も2倍になります。無限直線 $L\to\infty$ ではこの有限サイズ補正は消えます。通常の周期境界条件とは異なるフェルミオン部門では、最低 $L_0,\bar L_0$ が変わるため、同じ公式から**別の**基底エネルギーを求めます。

## 4. 一次場の二点関数を円筒へ移す

真空エネルギーだけでなく、相関関数にも有限サイズが見えます。[QFT50の一次場](../QFT50/index.md#def-qft50-weights)のウェイトを $(h,\bar h)$ とし、平面の二点核を

$$
\langle\Phi_z(z_1,\bar z_1)\Phi_z(z_2,\bar z_2)\rangle
=\frac{1}{(z_1-z_2)^{2h}(\bar z_1-\bar z_2)^{2\bar h}}
$$

に規格化します（同じ場とその適切な共役場の組を取り、必要なら複素位相の枝を固定します）。座標のヤコビアンを各挿入点で掛けると円筒での核を得ます。

<a id="thm-qft55-cylinder-two-point"></a>

<!-- formal-statement-start -->
> **定理（円筒一次場の二点関数）**  
> 平面上の正規化された二点核が上式で与えられるウェイト $(h,\bar h)$ の一次場を、$z=e^{\alpha w}$、$\bar z=e^{\alpha\bar w}$（$\alpha=2\pi/L$）に写す。相異なる挿入点で解析枝を連続に選べば、平面真空から誘導される円筒二点核は

$$
\begin{aligned}
G_L(w_{12},\bar w_{12})
&=\left[\frac{\alpha}{2\sinh(\alpha w_{12}/2)}\right]^{2h}
\left[\frac{\alpha}{2\sinh(\alpha\bar w_{12}/2)}\right]^{2\bar h},\\
w_{12}&=w_1-w_2,\qquad\bar w_{12}=\bar w_1-\bar w_2.
\end{aligned}
$$

> これは空間円周の平面真空に対応する二点核であり、トーラス上の任意の有限温度・有限サイズ二点関数を決める式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二点差 $e^{\alpha w_1}-e^{\alpha w_2}$ を中心座標と差座標に分けると $2\sinh$ が現れ、ヤコビアンの指数因子が相殺します。

<!-- proof-start -->
### 証明

[QFT50の一次場変換則](../QFT50/index.md#def-qft50-weights)で、各正則挿入に $(dz_i/dw_i)^h=(\alpha z_i)^h$ を掛ける。すると正則因子は

$$
\frac{(\alpha z_1)^h(\alpha z_2)^h}{(z_1-z_2)^{2h}}.
$$

指数の差は

$$
z_1-z_2
=e^{\alpha(w_1+w_2)/2}\left(e^{\alpha w_{12}/2}-e^{-\alpha w_{12}/2}\right)
=2e^{\alpha(w_1+w_2)/2}\sinh(\alpha w_{12}/2).
$$

分子の $z_1^hz_2^h=e^{\alpha h(w_1+w_2)}$ が分母の中心因子と相殺し、正則側は $[\alpha/(2\sinh(\alpha w_{12}/2))]^{2h}$ となる。反正則側も同様に計算して掛け合わせる。
<!-- proof-end -->

**空間円周での直接検算**：スカラー一次場 $h=\bar h=\Delta/2$（$\Delta>0$）について等時刻 $\tau_1=\tau_2$ とし、$0<|x_{12}|<L$ とする。$w_{12}=ix_{12}$、$\bar w_{12}=-ix_{12}$ と $\sinh(iy)=i\sin y$ から

$$
G_L(0,x_{12})
=\left[\frac{\pi/L}{|\sin(\pi x_{12}/L)|}\right]^{2\Delta}.
$$

$|x_{12}|\ll L$ なら $\sin(\pi x_{12}/L)\sim\pi x_{12}/L$ なので $|x_{12}|^{-2\Delta}$ に戻ります。$x_{12}=L/2$ では有限値 $(\pi/L)^{2\Delta}$ で、円周の反対側が最も遠い点になります。$x_{12}=0$ の接触特異性を有限値だと読み替えてはいけません。

**フェルミオンの注意**：正則Majorana一次場は $h=1/2,\bar h=0$ なので局所的に $G_L(w)=\alpha/[2\sinh(\alpha w/2)]$ です。$w\to w+iL$ で $\sinh(u+i\pi)=-\sinh u$ となり符号が反転します。これは [QFT53のNS反周期部門](../QFT53/index.md#def-qft53-majorana-ns) に対応します。座標点 $z$ が同じに戻っても、スピン場の平方根の枝は一周で変化し得ます。

## 5. 時間を巻けば熱的二点関数が現れる

ここまでは $x$ を周期化しました。次に無限直線上のEuclid時間 $\tau_E$ を $\tau_E\sim\tau_E+\beta$ と周期化して、温度 $T=1/\beta$ に対応する円筒を考えます。今度は $u=x+i\tau_E$、$\bar u=x-i\tau_E$ なので、指数関数による同じ構成でも **空間の位置 $x$ が実部** になります。空間円周と熱円筒を同じ座標設定として混ぜないことが重要です。

<a id="def-qft55-thermal-cylinder"></a>

<!-- formal-statement-start -->
> **定義（無限直線の熱円筒）**  
> $\beta>0$ を逆温度とし、$u=x+i\tau_E$、$x\in\mathbb R$、$\tau_E\sim\tau_E+\beta$ とする。局所的な平面対応を

$$
z=e^{2\pi u/\beta},\qquad
\bar z=e^{2\pi\bar u/\beta}
$$

> で定める。熱平衡相関関数と解釈する際には、Euclid時間の周期性・場の統計に応じた境界条件と熱トレースの存在を別途仮定する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft55-thermal-cylinder -->
**定義の確認**：$\tau_E\to\tau_E+\beta$ とすると $z\to ze^{2\pi i}=z$、$\bar z\to\bar ze^{-2\pi i}=\bar z$ です。一方 $x\to x+\beta$ では $z,\bar z$ の絶対値はそれぞれ $e^{2\pi}$ 倍になるだけで同じ点には戻りません。周期化されたのは時間であって空間ではありません。
<!-- definition-example-end -->

<a id="prop-qft55-thermal-two-point"></a>

<!-- formal-statement-start -->
> **命題（無限直線の熱的スカラー二点核）**  
> 一次場の平面真空二点核と熱円筒の対応が成立し、熱トレースの適切な境界条件を満たす二次元CFTで、$h=\bar h=\Delta/2$ の局所スカラー一次場を取る。等Euclid時間 $\tau_{E,1}=\tau_{E,2}$、空間分離 $r=|x_1-x_2|>0$ の二点関数は

$$
G_\beta(r)=\left[\frac{\pi/\beta}{\sinh(\pi r/\beta)}\right]^{2\Delta}.
$$

> この円筒は空間が無限長の熱状態を表す。空間も有限のときのトーラス二点関数は、一般に全スペクトル・部門・状態の情報を要する。
<!-- formal-statement-end -->

### 証明の見取り図

第4節の一次場の変換計算で $L$ を $\beta$、$w$ を $u=x+i\tau_E$ と読み替えます。等時刻では $u_{12}=\bar u_{12}=x_1-x_2$ が実数なので、$\sin$ ではなく $\sinh$ が残ります。

<!-- proof-start -->
### 証明

$a=2\pi/\beta$ と置く。[円筒一次場の二点関数](#thm-qft55-cylinder-two-point)の導出を $w\mapsto u$、$L\mapsto\beta$ に適用する。平面の $z_{12}$ の指数差を分解し、正則・反正則のヤコビアンを掛けると

$$
G_\beta(u_{12},\bar u_{12})
=\left[\frac{a}{2\sinh(au_{12}/2)}\right]^\Delta
\left[\frac{a}{2\sinh(a\bar u_{12}/2)}\right]^\Delta.
$$

等時刻では $u_{12}=\bar u_{12}=x_1-x_2$。符号を二因子で相殺する枝を取り、$r=|x_1-x_2|$ とすると $[a/(2\sinh(ar/2))]^{2\Delta}$ になり、$a/2=\pi/\beta$ を代入して命題の式を得る。
<!-- proof-end -->

$r\ll\beta$ では $\sinh(\pi r/\beta)\sim\pi r/\beta$ なので $G_\beta(r)\sim r^{-2\Delta}$ です。一方 $r\gg\beta$ では $\sinh y\sim e^y/2$ だから

$$
G_\beta(r)\sim\left(\frac{2\pi}{\beta}\right)^{2\Delta}
e^{-2\pi\Delta r/\beta}.
$$

平面のべき減衰が、熱円筒では大きな空間分離で指数減衰に変わります。これは無限直線・熱平衡の条件付き結論であり、質量のある一般理論や空間有限トーラスにそのまま当てはめることはできません。

## 演習：局所Ward作用から有限サイズへ

### 演習 QFT55-A1：指数関数で円周を一周する

- Level: A
- 問題: $w=\tau+ix$、$z=e^{2\pi w/L}$（$L>0$）について、$x\to x+L$、$\tau\to\tau+L\log3/(2\pi)$ の像をそれぞれ求めよ。

**詳細解答**：前者では指数が $2\pi i$ 増え、$e^{2\pi i}=1$ だから $z$ は不変です。後者では指数の実部が $\log3$ 増えるので $z$ は3倍になります。空間円周と半径方向の尺度がそれぞれ偏角・絶対値に対応します。

### 演習 QFT55-A2：Schwarzianの直接計算

- Level: A
- 問題: $f(w)=e^{kw}$（$k>0$）、$g(w)=(aw+b)/(cw+d)$（$ad-bc\ne0$、$cw+d\ne0$）のSchwarzianを求めよ。

**詳細解答**：$f'=kf,f''=k^2f,f'''=k^3f$ より $\{f,w\}=k^2-3k^2/2=-k^2/2$。後者は $D=ad-bc$ として $g'=D/(cw+d)^2$、$g''=-2cD/(cw+d)^3$、$g'''=6c^2D/(cw+d)^4$ です。従って $g'''/g'=6c^2/(cw+d)^2$、$(g''/g')^2=4c^2/(cw+d)^2$、差は零になります。

### 演習 QFT55-A3：中心電荷の係数

- Level: A
- 問題: $\langle t_z\rangle=0$、$c=2$、$L=4\pi$ の円筒真空について $\langle t_w\rangle$ を計算せよ。

**詳細解答**：$\alpha=2\pi/L=1/2$ なので $\{z,w\}=-\alpha^2/2=-1/8$。変換則から $\langle t_w\rangle=(c/12)(-1/8)=-2/96=-1/48$。直接式 $-\pi^2c/(6L^2)=-2/(6\cdot16)=-1/48$ と一致します。

### 演習 QFT55-A4：円周二点核の短距離

- Level: A
- 問題: $h=\bar h=1/4$ のスカラー一次場に対し、等時刻円周二点核を求め、$x=L/2$ と $x\to0$ の値・極限を確認せよ。

**詳細解答**：$\Delta=h+\bar h=1/2$ なので $G_L(0,x)=[(\pi/L)/|\sin(\pi x/L)|]^{1}$ です。$x=L/2$ では $\sin(\pi/2)=1$ より $\pi/L$。$x\to0$ では $\sin(\pi x/L)\sim\pi x/L$ だから $G_L\sim1/|x|$ で、平面の $|x|^{-2\Delta}$ に戻ります。

### 演習 QFT55-A5：子孫のエネルギー間隔

- Level: A
- 問題: 周長 $L$ で $c=\bar c=1$、一次状態 $(h,\bar h)=(1/2,1/2)$ とその $L_{-1}$ 子孫について、真空からのエネルギー差を求めよ。

**詳細解答**：一次状態の $L_0+\bar L_0=1$ なので $\Delta E=2\pi/L$。[Virasoro交換関係](../QFT51/index.md#thm-qft51-virasoro)の $[L_0,L_{-1}]=L_{-1}$ により $L_{-1}$ は左ウェイトを1増すので子孫の和は2、$\Delta E'=4\pi/L$。両者の差は $2\pi/L$ で、中心電荷の零点移動は差で消えます。

### 演習 QFT55-A6：熱二点核の二つの極限

- Level: A
- 問題: $\Delta=1$ の熱二点核 $G_\beta(r)$ の $r\ll\beta$ と $r\gg\beta$ の先頭項を求めよ。

**詳細解答**：$G_\beta=[(\pi/\beta)/\sinh(\pi r/\beta)]^2$。$y=\pi r/\beta$ とおけば、$y\ll1$ で $\sinh y=y+O(y^3)$ なので $G_\beta\sim r^{-2}$。$y\gg1$ では $\sinh y\sim e^y/2$ だから $G_\beta\sim(2\pi/\beta)^2e^{-2\pi r/\beta}$ です。

### 演習 QFT55-B1：合成則を最後まで導く

- Level: B
- 問題: $f,g$ の第1導関数が零でないとし、$A=f''/f'$、$B=g''/g'$ を使って $\{f\circ g,w\}=g'^2\{f,g\}+\{g,w\}$ を導け。

**詳細解答**：$F=f\circ g$ とおくと $F'=f'(g)g'$、$F''=f''(g)g'^2+f'(g)g''$ で、$F''/F'=A(g)g'+B$。その微分は $A'(g)g'^2+A(g)g''+B'$。$\{F,w\}=(F''/F')'-(F''/F')^2/2$ に代入すると、平方に混合項 $-A(g)g'B$ が出る。一方、微分にある $A(g)g''$ は $g''=g'B$ により同じ量なので相殺します。残りは $g'^2(A'-A^2/2)(g)+(B'-B^2/2)$ であり、両括弧は元のSchwarzianです。

### 演習 QFT55-B2：四次極から有限変換の係数へ

- Level: B
- 問題: [QFT51の応力テンソルOPE](../QFT51/index.md#def-qft51-stress-ope)における $t(z)t(w)$ の四次・二次・一次極がそれぞれ $c/[2(z-w)^4]$、$2t(w)/(z-w)^2$、$\partial t(w)/(z-w)$ とする。小円の $\oint dz\,\epsilon(z)/(2\pi i)$ を計算し、有限則の係数 $c/12$ と比較せよ。

**詳細解答**：四次極の留数はTaylor係数 $\epsilon'''(w)/3!$ に $c/2$ を掛けた $c\epsilon'''/12$。二次極は $2\epsilon' t$、一次極は $\epsilon\partial t$。従って $\delta_\epsilon t=\epsilon\partial t+2\epsilon't+(c/12)\epsilon'''$。$f=w+\epsilon$ では $f'^2t(f)=t+\epsilon t'+2\epsilon't+O(\epsilon^2)$、$\{f,w\}=\epsilon'''+O(\epsilon^2)$ なので有限変換の中心項の係数は $c/12$ で一致します。

### 演習 QFT55-B3：二模型の真空エネルギー

- Level: B
- 問題: 左右対称な自由bosonの $c=1$ とNS Majoranaの $c=1/2$ について、周長 $L$ の真空エネルギーを求め、$L\to2L$ での変化を説明せよ。$L_0=\bar L_0=0$ を仮定する。

**詳細解答**：各模型で $c=\bar c$ なので $E_0=(2\pi/L)(-(c+\bar c)/24)=-(2\pi/L)(c/12)=-\pi c/(6L)$。よってbosonは $-\pi/(6L)$、NS Majoranaは $-\pi/(12L)$。周長を $2L$ にするとそれぞれ $-\pi/(12L)$ と $-\pi/(24L)$ で、絶対値は半分です。部門の最低ウェイトが零でない場合は $L_0+\bar L_0$ を足す必要があり、中心電荷の値だけで基底エネルギーを決めることはできません。

### 演習 QFT55-B4：Majoranaの反周期性

- Level: B
- 問題: $h=1/2,\bar h=0$ の自由Majorana場を空間円筒に写し、二点核 $G_L(w)=\alpha/[2\sinh(\alpha w/2)]$ の $w\to w+iL$ での符号を確かめよ。なぜ $z$ は同じ点へ戻るのに符号が変わるか。

**詳細解答**：$\alpha(iL)/2=i\pi$ だから $\sinh(\alpha(w+iL)/2)=\sinh(\alpha w/2+i\pi)=-\sinh(\alpha w/2)$。従って $G_L(w+iL)=-G_L(w)$。座標写像は $z\to ze^{2\pi i}=z$ ですが、ウェイト $1/2$ の一次場の変換因子 $(dz/dw)^{1/2}=(\alpha z)^{1/2}$ は一周で符号を変えます。これはNS反周期スピン構造であり、Ramond周期部門の相関を同じ式から無条件に読むことはできません。

### 演習 QFT55-B5：二種類の円筒を区別する

- Level: B
- 問題: 同じ $\Delta=1$ のスカラー一次場について、(i) 周長 $L$ の空間円周・等時刻分離 $r=L/4$ と、(ii) 無限直線・逆温度 $\beta=L$ の等時刻分離 $r=L/4$ で二点核を求め、大小関係を示せ。

**詳細解答**：(i) は $G_L=[(\pi/L)/\sin(\pi/4)]^2=2\pi^2/L^2$。(ii) は $G_\beta=[(\pi/L)/\sinh(\pi/4)]^2$。$y>0$ で $\sinh y>y>\sin y$（例えば $\sinh y-y$ と $y-\sin y$ の導関数が正）なので、(ii) は (i) より小さい。空間円周では三角関数、熱円筒では双曲線関数になる理由は、それぞれ $w_{12}=ir$ と $u_{12}=r$ を代入するためです。

### 演習 QFT55-C1：中心電荷から相関とエネルギーへ

- Level: C
- 問題: 二次元の左右対称な単位的CFTが $c=\bar c=1$ で、平面真空 $\langle t_z\rangle=0$ と規格化されるとする。さらに、ウェイト $(1/4,1/4)$ のスカラー一次状態が存在すると仮定する。次を求めよ。

  1. $f(w)=e^{2\pi w/L}$ のSchwarzianを出発点から計算し、$\langle t_w\rangle$ を求める。
  2. 空間円周の真空エネルギーと、その一次状態のエネルギーを求める。
  3. そのスカラー一次場の等時刻二点核を求め、$r\ll L$ と $r=L/2$ を検算する。
  4. 熱円筒 $\beta=L$ の等時刻二点核と大距離極限を求め、3との相違を説明する。

**詳細解答**：

**(1) 変換の中心項。** $\alpha=2\pi/L$、$f'=\alpha f$、$f''=\alpha^2f$、$f'''=\alpha^3f$ なので

$$
\{f,w\}=\frac{\alpha^3 f}{\alpha f}
-\frac32\left(\frac{\alpha^2f}{\alpha f}\right)^2
=-\frac{\alpha^2}{2}.
$$

$\langle t_z\rangle=0$ より $\langle t_w\rangle=(1/12)(-\alpha^2/2)=-\pi^2/(6L^2)$。反正則側も同値です。

**(2) 零点と励起。** [空間円周のエネルギーと運動量](#thm-qft55-cylinder-spectrum)を使うと $H_L=\alpha(L_0+\bar L_0-(1+1)/24)$ なので真空は $E_0=-\alpha/12=-\pi/(6L)$。ウェイト和は $1/4+1/4=1/2$ なので一次状態は

$$
E=\frac{2\pi}{L}\left(\frac12-\frac1{12}\right)
=\frac{5\pi}{6L},\qquad E-E_0=\frac{\pi}{L}.
$$

**(3) 空間円周。** [円筒一次場の二点関数](#thm-qft55-cylinder-two-point)で $\Delta=1/2$ だから

$$
G_L(r)=\frac{\pi/L}{\sin(\pi r/L)},\qquad0<r<L.
$$

$r\ll L$ では $G_L\sim1/r$、$r=L/2$ では $G_L=\pi/L$。零距離では発散することに注意します。

**(4) 熱円筒。** [熱的スカラー二点核](#prop-qft55-thermal-two-point)で空間無限・Euclid時間周期 $\beta=L$ として $u=x+i\tau_E$ を使えば

$$
G_\beta(r)=\frac{\pi/L}{\sinh(\pi r/L)}
\sim\frac{2\pi}{L}e^{-\pi r/L}\qquad(r\gg L).
$$

(3) は空間円周の真空で $x$ を巻いた配置、(4) は無限空間の熱平衡で時間 $\tau_E$ を巻いた配置です。両方を周期化した有限温度・有限空間のトーラスは一般に同じ二点核ではありません。加えてフェルミオンのスピン構造や挿入点の一致、相関の解析枝を指定する必要があります。

## この章で確認したこと

応力テンソルのOPEにある四次極は微小Ward変換の $c\epsilon'''/12$ を生み、その有限版がSchwarzianです。$z=e^{2\pi w/L}$ では $\{z,w\}=-\tfrac12(2\pi/L)^2$ となり、平面真空から円筒の $-\pi c/(6L)$（$c=\bar c$）という有限サイズの真空エネルギーが現れます。一次場の二点核は空間円周で $\sin$、熱円筒で $\sinh$ となり、局所的な短距離では同じ平面のべきに戻ります。

次は、境界・区間・UV cutoffを具体模型で扱い、局所領域のエンタングルメントへ向かう準備をします。
