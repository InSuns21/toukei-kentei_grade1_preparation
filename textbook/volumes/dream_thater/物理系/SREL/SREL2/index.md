# SREL2 Minkowski時空・光円錐・固有時

<!-- definition-example-audit: strict -->

[SREL1の一次元Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)では、位置の差と時刻の差が慣性系を変えると混ざることを示しました。では、同じ二事象を扱っていると確認するために、すべての慣性系に共通する量はないでしょうか。

光信号が結ぶ二事象を考えると、どちらの慣性系でも光は速さ $c$ で進みます。従って時間差と空間距離の平方の差には、特別な意味がありそうです。本章では三次元空間へ戻り、この差を時空の幾何学として記述します。**ここで使う符号付きの形式は、距離を常に正にするのではなく、事象の因果関係を分類する道具**です。最後に、時計が自分の世界線に沿って実際に刻む時間を定義し、加速する時計と慣性運動する時計を比較します。

## 1. 四つの座標をまとめる

真空中の光速を $c>0$ とし、ある慣性系 $S$ の事象を

$$
X=(x^0,x^1,x^2,x^3)=(ct,x,y,z)\in\mathbb R^4
$$

で表します。$x^0=ct$ とするのは四つの成分の単位を長さにそろえるためです。空間部分を $\boldsymbol r=(x,y,z)$、二事象 $A,B$ の差を $\Delta X=X_B-X_A$ とします。空間の長さは通常の Euclid ノルム $|\boldsymbol r|=\sqrt{x^2+y^2+z^2}$ です。

### 1.1 なぜ普通の四次元距離では駄目か

Euclid 型の平方和 $(c\Delta t)^2+|\Delta\boldsymbol r|^2$ は、[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)で保存されません。次の数値で確かめます。二事象の差とboost速度を

$$
c\Delta t=5\,\mathrm m,\qquad
\Delta x=3\,\mathrm m,\qquad
v=\frac{3c}{5},\qquad
\gamma=\frac54
$$

と取って座標を変換すると

$$
\begin{aligned}
c\Delta t'&=\frac54\left(5-\frac35\cdot3\right)\mathrm m=4\,\mathrm m,\\
\Delta x'&=\frac54\left(3-\frac35\cdot5\right)\mathrm m=0.
\end{aligned}
$$

平方和は $25+9=34\,\mathrm m^2$ から $16\,\mathrm m^2$ に変わります。一方、**差**を取ると両方とも $16\,\mathrm m^2$ です。

この符号の違いを幾何学の定義へ組み込みます。

<a id="def-srel2-minkowski-metric"></a>

<!-- formal-statement-start -->
> **定義（Minkowski計量）**  
> 実四次元ベクトル $U=(U^0,U^1,U^2,U^3)$ と $V=(V^0,V^1,V^2,V^3)$ に対して、対称双線形形式 $g$ を

$$
g(U,V)=U^0V^0-U^1V^1-U^2V^2-U^3V^3
$$

> と定める。この符号規約を $(+,-,-,-)$ と書く。標準座標での計量行列は $\eta=\operatorname{diag}(1,-1,-1,-1)$ であり、$g(U,V)=U^{\mathsf T}\eta V$ である。
<!-- formal-statement-end -->

この計量は非退化ですが正定値ではありません。$U\ne0$ でも $g(U,U)=0$ になり得ます。添字 $0$ は時間成分、$1,2,3$ は空間成分を表します。本章では添字の上げ下げを計算の前提にせず、行列の積を直接使います。

非退化であることも、正定値性とは分けて確認できます。$g(U,V)=0$ がすべての $V\in\mathbb R^4$ に対して成り立つと仮定し、標準基底 $e_0=(1,0,0,0)$、$e_1=(0,1,0,0)$、$e_2=(0,0,1,0)$、$e_3=(0,0,0,1)$ を順に代入すると

$$
g(U,e_0)=U^0=0,\qquad
g(U,e_i)=-U^i=0\quad(i=1,2,3)
$$

となります。従って $U=0$ です。一方、特定の非零 $U$ に対して $g(U,U)=0$ になることは、この非退化性と矛盾しません。

<!-- definition-example-start: def-srel2-minkowski-metric -->
### 例：零でないベクトルの平方が零になる

**定義の確認**として、$U=(1,1,0,0)$ と $V=(1,0,1,0)$ を代入します。

$$
g(U,U)=1-1=0,\qquad
g(U,V)=1,\qquad
g(V,V)=1-1=0.
$$

二つのベクトルはどちらも零ベクトルではありません。それでも各自の平方が零です。「内積」という言葉から正定値性を推測しないでください。
<!-- definition-example-end -->

<a id="def-srel2-interval"></a>

<!-- formal-statement-start -->
> **定義（時空間隔）**  
> Minkowski時空 $\mathbb R^4$ の二事象 $A,B$ に対し、時空間隔の**平方**を

$$
\Delta s^2:=g(\Delta X,\Delta X)
=c^2(\Delta t)^2-|\Delta\boldsymbol r|^2
$$

> と定める。$\Delta s^2$ は負にもなり得るため、一般に $\Delta s$ を実数の距離として定義するわけではない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel2-interval -->
### 例：二つの点滅の時空間隔

**定義の確認**として、$c\Delta t=5\,\mathrm m$、$\Delta\boldsymbol r=(3,0,0)\,\mathrm m$ を使います。空間距離の平方は $9\,\mathrm m^2$ なので

$$
\Delta s^2=25-9=16\,\mathrm m^2.
$$

時空間隔の平方は正ですが、空間的な距離が $4\,\mathrm m$ という意味ではありません。後で $4\,\mathrm m/c$ を時計の時間として解釈します。
<!-- definition-example-end -->

## 2. Lorentz変換で何が保存されるか

[SREL1のLorentz因子](../SREL1/index.md#def-srel1-gamma)を $\gamma=1/\sqrt{1-\beta^2}$、$\beta=v/c$、$|\beta|<1$ と書きます。$x$ 方向の慣性系の相対運動では、$y,z$ 成分は変えずに

$$
\begin{aligned}
x'^0&=\gamma(x^0-\beta x^1),&
x'^1&=\gamma(x^1-\beta x^0),\\
x'^2&=x^2,&x'^3&=x^3
\end{aligned}
$$

とします。時間・進行方向の二成分は SREL1 の式と同じで、進行方向に垂直な長さをそのまま取る三次元への拡張です。空間の回転なら $x,y,z$ の直交座標を変えるだけなので $|\boldsymbol r|^2$ は不変です。

<a id="thm-srel2-interval-invariance"></a>

<!-- formal-statement-start -->
> **定理（Minkowski時空間隔のLorentz不変性）**  
> 二つの事象 $A,B\in\mathbb R^4$ を、速度 $|v|<c$ の $x$ 方向のLorentz変換で $A',B'$ に写すとする。このとき

$$
g(X_{B'}-X_{A'},X_{B'}-X_{A'})
=g(X_B-X_A,X_B-X_A)
$$

> が成り立つ。空間の直交回転や、これらの変換の有限回の合成でも成立する。
<!-- formal-statement-end -->

### 証明の見取り図

二事象の**差**へ変換を適用します。時間成分の平方から空間成分の平方を引くと交差項が打ち消し合います。行列式の値だけから不変性を推測するのではなく、二次形式を直接展開します。

<!-- proof-start -->
### 証明

[一次元Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)の時間・進行方向成分を二事象 $A,B$ にそれぞれ適用して引くと

$$
\Delta x'^0=\gamma(\Delta x^0-\beta\Delta x^1),\qquad
\Delta x'^1=\gamma(\Delta x^1-\beta\Delta x^0)
$$

となり、垂直な $\Delta x^2,\Delta x^3$ は変わりません。従って

$$
\begin{aligned}
(\Delta x'^0)^2-(\Delta x'^1)^2
&=\gamma^2\bigl[(\Delta x^0-\beta\Delta x^1)^2
-(\Delta x^1-\beta\Delta x^0)^2\bigr]\\
&=\gamma^2\bigl[(1-\beta^2)(\Delta x^0)^2
-(1-\beta^2)(\Delta x^1)^2\bigr]\\
&=(\Delta x^0)^2-(\Delta x^1)^2.
\end{aligned}
$$

二行目では、各平方の交差項 $-2\beta\Delta x^0\Delta x^1$ が互いに消えます。三行目では $\gamma^2(1-\beta^2)=1$ を用いました。変わらない $\Delta x^2,\Delta x^3$ の平方をさらに引けば四成分について結論が出ます。

空間の直交回転を行列 $R$ で書けば $R^{\mathsf T}R=I$ なので $|R\Delta\boldsymbol r|^2=|\Delta\boldsymbol r|^2$ です。二つの変換 $T_1,T_2$ が $g$ を保存するなら

$$
g(T_2T_1U,T_2T_1V)
=g(T_1U,T_1V)=g(U,V)
$$

です。一般の $U,V$ について双線形性と対称性から

$$
\begin{aligned}
g(U+V,U+V)&=g(U,U)+2g(U,V)+g(V,V),\\
g(U-V,U-V)&=g(U,U)-2g(U,V)+g(V,V).
\end{aligned}
$$

この二式の差を4で割れば

$$
g(U,V)=\frac14\left[g(U+V,U+V)-g(U-V,U-V)\right]
$$

です。既に証明した平方の不変性を $U+V$、$U-V$ に個別に適用すると、右辺は変換前後で一致します。これで任意の二ベクトルについて $g(TU,TV)=g(U,V)$ となり、二つの保存変換を合成しても先ほどの等式が適用できます。
<!-- proof-end -->

任意の速度方向については、まず空間の軸を回して速度を $x$ 軸へ一致させ、上のboostを行い、必要に応じて回転を戻せば同じ結論になります。**ここで扱うのは平坦時空の慣性系間の変換**であって、曲がった時空での座標変換を証明したわけではありません。

## 3. 光円錐は因果関係をどう分けるか

物体がある事象 $A$ を通った後、光より速く移動せずに $B$ へ達するには、経過時間に対して空間距離が大き過ぎてはなりません。まず二事象の差を分類します。

<a id="def-srel2-causal-types"></a>

<!-- formal-statement-start -->
> **定義（時間的・光的・空間的分離）**  
> 異なる事象 $A,B\in\mathbb R^4$ の時空間隔の平方で、次のように分離の種類を定める。
>
> - $\Delta s^2>0$：**時間的**（timelike）。
> - $\Delta s^2=0$：**光的**（null）。
> - $\Delta s^2<0$：**空間的**（spacelike）。
>
> 時間的または光的な差を**因果的**（causal）といい、時間成分 $\Delta t>0$ の因果的な差を未来向きという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel2-causal-types -->
### 例：同じ時間差でも位置で分類が変わる

**定義の確認**として、$c\Delta t=5\,\mathrm m$ を固定し、空間差を3通りに変えます。[時空間隔の定義](#def-srel2-interval)にそれぞれ代入すると

$$
\begin{aligned}
\Delta\boldsymbol r=(3,0,0)\,\mathrm m
&:\quad\Delta s^2=(25-9)\,\mathrm m^2=16\,\mathrm m^2>0,\\
\Delta\boldsymbol r=(3,4,0)\,\mathrm m
&:\quad\Delta s^2=(25-9-16)\,\mathrm m^2=0,\\
\Delta\boldsymbol r=(6,0,0)\,\mathrm m
&:\quad\Delta s^2=(25-36)\,\mathrm m^2=-11\,\mathrm m^2<0.
\end{aligned}
$$

よって順に時間的、光的、空間的です。

光的の場合の非零の差は $|\Delta\boldsymbol r|=c|\Delta t|$ を満たします。この境界こそ光がたどる直線の傾きです。
<!-- definition-example-end -->

<a id="def-srel2-light-cone"></a>

<!-- formal-statement-start -->
> **定義（光円錐と因果円錐）**  
> 事象 $A=(ct_A,\boldsymbol r_A)$ に対し、未来の光円錐面、未来の因果円錐をそれぞれ

$$
\begin{aligned}
N^+(A)&=\{B\ne A:\ c(t_B-t_A)=|\boldsymbol r_B-\boldsymbol r_A|,\ t_B>t_A\},\\
J^+(A)&=\{B:\ c(t_B-t_A)\ge|\boldsymbol r_B-\boldsymbol r_A|\}
\end{aligned}
$$

> と定める。過去向きは時間差の符号を逆にして定める。$J^+(A)$ には頂点 $A$ および光的境界が含まれる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel2-light-cone -->
### 例：届く信号と届かない信号

**定義の確認**として $A=(0,\boldsymbol0)$、$B=(2c\,\mathrm s,(3c/2)\,\mathrm s,0,0)$ を取ります。$c\Delta t=2c\,\mathrm s$ に対して $|\Delta\boldsymbol r|=3c\,\mathrm s/2$ だから

$$
2c\,\mathrm s>\frac{3c\,\mathrm s}{2},
$$

すなわち $B$ は $J^+(A)$ の内部です。一方、同じ時刻で距離が $3c\,\mathrm s$ の事象は外部にあり、$A$ から光速以下で送った信号では届きません。
<!-- definition-example-end -->

<a id="prop-srel2-causal-order"></a>

<!-- formal-statement-start -->
> **命題（因果的時間順序の保存と空間的同時系）**  
> 二事象の差が未来向きで時間的または光的なら、未来方向を保存する任意の $|v|<c$ のboostと空間回転のもとで時間差は正のままである。一方、$\Delta s^2<0$ なら、二事象が同時となる慣性系が存在し、別の慣性系では二事象の時刻順序を逆転できる。
<!-- formal-statement-end -->

### 証明の見取り図

前半は $|\Delta x|\le c\Delta t$ と $|v|<c$ を [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)の時刻差へ代入します。後半は空間差を一つの軸へ回し、$v=c^2\Delta t/|\Delta\boldsymbol r|$ を選びます。この速度が光速未満であることこそ空間的分離の条件です。

<!-- proof-start -->
### 証明

まず未来向き因果的なら $\Delta t>0$ かつ $|\Delta\boldsymbol r|\le c\Delta t$ です。$x$ 方向のboostについて

$$
\begin{aligned}
\Delta t'&=\gamma\left(\Delta t-\frac{v\Delta x}{c^2}\right),\\
\Delta t-\frac{v\Delta x}{c^2}
&\ge\Delta t-\frac{|v||\Delta x|}{c^2}\\
&\ge\Delta t\left(1-\frac{|v|}{c}\right)>0.
\end{aligned}
$$

従って $\Delta t'>0$ です。回転は時間成分を変えず、合成でも正値が保たれます。

次に空間的分離では $|\Delta\boldsymbol r|>c|\Delta t|$ であり、$\Delta\boldsymbol r\ne0$ です。空間軸を回し $\Delta x=|\Delta\boldsymbol r|>0$、$\Delta y=\Delta z=0$ とします。そこで

$$
v_0=\frac{c^2\Delta t}{\Delta x},\qquad
\frac{|v_0|}{c}=\frac{c|\Delta t|}{\Delta x}<1
$$

を選べます。[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)から

$$
\Delta t'=\gamma(v_0)
\left(\Delta t-\frac{v_0\Delta x}{c^2}\right)
=\gamma(v_0)(\Delta t-\Delta t)=0
$$

です。実際、$|v_0|<c$ なので正数 $\varepsilon$ を

$$
0<\varepsilon<\min(c-v_0,c+v_0)
$$

と取れます。$v_\pm=v_0\pm\varepsilon$ はいずれも $|v_\pm|<c$ であり、

$$
\Delta t-\frac{v_\pm\Delta x}{c^2}
=\frac{(v_0-v_\pm)\Delta x}{c^2}
=\mp\frac{\varepsilon\Delta x}{c^2}
$$

となります。$\Delta x>0$ と $\gamma(v_\pm)>0$ から、二つのboost後の時間差は逆符号です。従って時刻順序は慣性系によって逆転できます。
<!-- proof-end -->

**何が保存されるか**を整理すると、光円錐の内側・表面・外側という区分は[時空間隔の不変性](#thm-srel2-interval-invariance)によって変わりません。一方、光円錐の外側の二事象には、どちらが「先」かという慣性系に依らない答えはありません。

### 3.1 一本の経路で因果円錐の外へ出られるか

未来向きで速さが常に $c$ 未満の区分的 $C^1$ 世界線 $\boldsymbol r(t)$ を時刻 $t_A<t_B$ の間で考えます。微分可能な区間ごとに $\dot{\boldsymbol r}(t)$ を速度とすると

$$
\begin{aligned}
|\boldsymbol r(t_B)-\boldsymbol r(t_A)|
&=\left|\int_{t_A}^{t_B}\dot{\boldsymbol r}(t)\,dt\right|\\
&\le\int_{t_A}^{t_B}|\dot{\boldsymbol r}(t)|\,dt
<c(t_B-t_A).
\end{aligned}
$$

最後の厳密な不等号を確かめます。区分点を $t_A=t_0<t_1<\cdots<t_N=t_B$ と取り、各閉区間で速度が連続で常に $c$ 未満だとします。その区間での速さの最大値を $M_j$ とおくと $M_j<c$ であり、

$$
\begin{aligned}
\int_{t_A}^{t_B}|\dot{\boldsymbol r}(t)|\,dt
&=\sum_{j=1}^N\int_{t_{j-1}}^{t_j}|\dot{\boldsymbol r}(t)|\,dt\\
&\le\sum_{j=1}^NM_j(t_j-t_{j-1})\\
&<c\sum_{j=1}^N(t_j-t_{j-1})
=c(t_B-t_A).
\end{aligned}
$$

各区間の長さは正で、区間数は有限なので最終行は厳密です。従って終点は必ず未来の因果円錐の**内部**です。光速そのものの経路なら境界へ達し得ます。この主張は超光速信号が禁止されるモデルに依存し、そのモデルを純粋数学から導いたものではありません。

## 4. 一本の時計が刻む固有時

[SREL1の時間の遅れ](../SREL1/index.md#prop-srel1-time-dilation)では一定速度で動く一本の時計を比較しました。しかし加速する時計には、一つの慣性系をずっと貼り付けられません。変化する速度に応じた**微小な**時計の刻みを足し合わせる必要があります。

<a id="def-srel2-proper-time"></a>

<!-- formal-statement-start -->
> **定義（時間的世界線の固有時）**  
> 慣性系 $S$ で時刻 $t\in[t_A,t_B]$（$t_B>t_A$）を用いて表された、区分的 $C^1$ な未来向き時間的世界線 $\boldsymbol r(t)$ を考え、各滑らかな区分で $|\dot{\boldsymbol r}(t)|<c$ とする。この世界線に沿って一本の理想時計が刻む**固有時**を

$$
\tau[\boldsymbol r]=
\int_{t_A}^{t_B}
\sqrt{1-\frac{|\dot{\boldsymbol r}(t)|^2}{c^2}}\,dt
$$

> と定める。単一の滑らかな区間では微小固有時は

$$
d\tau=\frac1c\sqrt{g(dX,dX)}
=dt\sqrt{1-\frac{|\boldsymbol v(t)|^2}{c^2}}
$$

> である。ただし $dt>0$、$\boldsymbol v=d\boldsymbol r/dt$ であり、平方根は正の枝とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-srel2-proper-time -->
### 例：一定速度の時計の一刻み

**定義の確認**として、$0\le t\le10\,\mathrm s$ で $\boldsymbol r(t)=(4ct/5,0,0)$ とします。速度の大きさは $4c/5<c$、世界線は $C^1$ なので

$$
\tau=\int_0^{10\,\mathrm s}\sqrt{1-\frac{16}{25}}\,dt
=\int_0^{10\,\mathrm s}\frac35\,dt
=6\,\mathrm s.
$$

ここで $10\,\mathrm s$ は $S$ の座標時間、$6\,\mathrm s$ はその動く時計自身の固有時です。
<!-- definition-example-end -->

積分の下の平方根は、微小な時空間隔の正の平方根を $c$ で割ったものです。$dX=(c\,dt,\boldsymbol v\,dt)$ を [Minkowski計量](#def-srel2-minkowski-metric)へ入れると

$$
\begin{aligned}
g(dX,dX)&=c^2dt^2-|\boldsymbol v|^2dt^2\\
&=c^2\left(1-\frac{|\boldsymbol v|^2}{c^2}\right)dt^2>0.
\end{aligned}
$$

従って $dt>0$ を使って定義の $d\tau$ に戻ります。瞬間的な速度が変化しても、各小区間でこの計算を行って積分できるのが利点です。

<a id="thm-srel2-proper-time-invariance"></a>

<!-- formal-statement-start -->
> **定理（固有時の慣性系不変性）**  
> 二つの慣性系が未来方向を保存するLorentz変換と空間回転で関係づけられているとする。区分的 $C^1$、未来向き時間的な同じ世界線の両端 $A,B$ を固定するとき、いずれの系の座標で計算しても固有時 $\tau[\boldsymbol r]$ は一致する。
<!-- formal-statement-end -->

### 証明の見取り図

世界線を時刻で微分して得られる四成分の変化に [時空間隔の不変性](#thm-srel2-interval-invariance)を適用します。さらに [因果的時間順序の保存](#prop-srel2-causal-order)から新座標でも時間が未来向きなので、正の平方根を積分できます。

<!-- proof-start -->
### 証明

滑らかな区間で世界線を $X(t)=(ct,\boldsymbol r(t))$ と表示します。時間で微分し、線形なLorentz変換を $\Lambda$ と書くと、微小変化は

$$
dX=(c,\dot{\boldsymbol r}(t))\,dt,\qquad
dX'=\Lambda\,dX
$$

です。この同じ二つの微小変化へ [時空間隔の不変性](#thm-srel2-interval-invariance)を適用すると

$$
g(dX',dX')=g(dX,dX)
$$

であり、時間的条件により両辺は正です。新しい時刻が増加することも確認します。$S'$ が $S$ に対して $x$ 方向へ速度 $w$（$|w|<c$）で動く場合、[一次元Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を世界線に沿って微分すると

$$
\begin{aligned}
\frac{dt'}{dt}
&=\gamma_w\left(1-\frac{w\dot x(t)}{c^2}\right)\\
&\ge\gamma_w\left(1-\frac{|w|}{c}\right)>0.
\end{aligned}
$$

$|\dot x(t)|\le|\dot{\boldsymbol r}(t)|<c$ を使いました。空間回転は時刻を変えず、合成した変換でも時刻の増加性は保たれます。これは[因果的時間順序の保存](#prop-srel2-causal-order)の微分版です。従って $dt'>0$ で、各系で

$$
\begin{aligned}
d\tau'&=\frac1c\sqrt{g(dX',dX')}\\
&=\frac1c\sqrt{g(dX,dX)}=d\tau
\end{aligned}
$$

となります。これは同じ世界線の各微小区間についての等式です。区分の境界点は有限個で積分値を変えないので、すべての区分の積分を足せば

$$
\int_A^B d\tau'=\int_A^B d\tau
$$

を得ます。時間座標の取り方は異なっても、この積分の値は同じです。
<!-- proof-end -->

注意点は、**固有時は二つの事象だけから常に決まるわけではない**ことです。両端が同じでも、途中で異なる世界線を通れば積分値が変わります。二事象の $\Delta s^2$ だけで固有時が決まるのは、次の直線的な慣性運動の場合などです。

<a id="prop-srel2-inertial-max-proper-time"></a>

<!-- formal-statement-start -->
> **命題（同じ二事象を結ぶ慣性世界線の固有時最大性）**  
> 未来向きに時間的に分離した二事象 $A,B$ を固定する。両端を結ぶ区分的 $C^1$ な未来向き時間的世界線のうち、一直線の慣性世界線に沿う固有時は

$$
\tau_{\mathrm{inertial}}=\frac{\sqrt{\Delta s^2}}{c}
$$

> であり、他のいずれの世界線の固有時 $\tau$ についても

$$
\tau\le\tau_{\mathrm{inertial}}
$$

> が成り立つ。等号が成立するのは同じ直線の世界線をたどるときに限る（区分点におけるパラメータ表示の違いは許す）。
<!-- formal-statement-end -->

### 証明の見取り図

まず両端が**同じ位置**に見える慣性系を探します。その系では、任意の寄り道した時計の微小固有時は $d\tau=dt\sqrt{1-v^2/c^2}\le dt$ です。その系で二事象間の時間差が $\sqrt{\Delta s^2}/c$ なので、すべての経路を一度に比較できます。

<!-- proof-start -->
### 証明

$\Delta t>0$ かつ $c^2\Delta t^2>|\Delta\boldsymbol r|^2$ です。$\Delta\boldsymbol r=0$ なら元の $S$ で両端は同じ場所にあります。そうでなければ、空間軸を $\Delta\boldsymbol r$ 方向へ回し、速度

$$
v=\frac{|\Delta\boldsymbol r|}{\Delta t},
\qquad 0<v<c
$$

でその方向へboostします。ここで $v<c$ は時間的分離の仮定から従います。$x$ 方向について [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を使うと

$$
\Delta x'=\gamma(|\Delta\boldsymbol r|-v\Delta t)=0.
$$

垂直方向の位置差も零だから、選んだ慣性系 $S'$ では $\Delta\boldsymbol r'=0$ です。[時空間隔の不変性](#thm-srel2-interval-invariance)から

$$
c^2(\Delta t')^2=\Delta s^2,
\qquad
\Delta t'=\frac{\sqrt{\Delta s^2}}{c}>0
$$

となります。最後の正の符号は [因果的時間順序の保存](#prop-srel2-causal-order)によります。

任意の競合する未来向き時間的世界線をこの $S'$ で表します。そこでの速度を $\boldsymbol v'(t')$ とすると

$$
0<\sqrt{1-\frac{|\boldsymbol v'(t')|^2}{c^2}}\le1.
$$

従って

$$
\begin{aligned}
\tau&=\int_{t'_A}^{t'_B}
\sqrt{1-\frac{|\boldsymbol v'(t')|^2}{c^2}}\,dt'\\
&\le\int_{t'_A}^{t'_B}1\,dt'
=\Delta t'=\frac{\sqrt{\Delta s^2}}{c}.
\end{aligned}
$$

等号になるには速度が各滑らかな区間で恒等的に $\boldsymbol0$ でなければなりません。実際、連続な速度が一点でも非零なら近傍で平方根は1より小さく、積分は真に小さくなります。従って等号の経路は $S'$ で同じ空間位置に静止する経路だけであり、元の系では両端を結ぶ直線の慣性世界線です。逆にこの直線の経路なら $S'$ で速度が零なので等号が成立します。
<!-- proof-end -->

### 4.1 二本の時計で比較する

$S$ の同じ場所を出発・再会する二本の時計を考えます。一方は $S$ で静止し、もう一方は次の速度で移動する理想化した折れ線世界線です。

$$
v(t)=
\begin{cases}
u &(0\le t<T/2),\\
-u &(T/2\le t\le T),
\end{cases}
\qquad 0<u<c.
$$

前半の変位は $uT/2$、後半は $-uT/2$ で打ち消し合うため、両者は時刻 $T$ に同じ位置で再会します。

静止する時計の固有時は $T$、往復時計の固有時は

$$
\begin{aligned}
\tau_{\mathrm{round}}
&=\int_0^{T/2}\sqrt{1-\frac{u^2}{c^2}}\,dt
+\int_{T/2}^T\sqrt{1-\frac{(-u)^2}{c^2}}\,dt\\
&=T\sqrt{1-\frac{u^2}{c^2}}<T.
\end{aligned}
$$

折返し時の瞬間的な速度変化は理想化です。滑らかな折返しに置き換えても、再会する時間的世界線が直線でなければ[固有時最大性の命題](#prop-srel2-inertial-max-proper-time)によって不等号は厳密です。**両時計が出発・再会という同じ二事象を共有する一方、たどった世界線は異なる**ことが結果を分けます。「どちらから見ても相手が動く」という等速の二慣性系の対称性を、折返しを含む一本の慣性系へそのまま適用することはできません。

## 5. 使える範囲と次章への橋渡し

本章では、Minkowski計量が保存される変換、光円錐による因果分類、そして時計の世界線の積分量としての固有時を区別しました。

- $\Delta s^2$ は**二事象の組**に対応し、正・零・負のいずれでも定義できる。
- $\tau$ は**選んだ時間的世界線**に対応し、異なる経路なら一般に異なる。
- 光的経路では $g(dX,dX)=0$ で固有時の微小増分は零ですが、光に静止する慣性系は存在しません。光的世界線を固有時で通常の時計と同じようにパラメータ表示することはできません。
- 空間的分離の二事象の間には、光速以下の未来向き物体の経路を作れない。時間的分離でも、加速する時計を一つの慣性系と取り違えてはいけません。

次章では、固有時をパラメータとして世界線を微分し、四元速度・四元運動量を構成します。固有時を導入したのは、そこで現れる四元ベクトルをどの慣性系でも同じ物理量として扱うためでもあります。

---

# 演習

## Level A

### A1. 三種類の分離を分類する

二事象の差の四成分 $(c\Delta t,\Delta x,\Delta y,\Delta z)$ が長さ単位 $\mathrm m$ でそれぞれ (i) $(5,3,0,0)$、(ii) $(5,3,4,0)$、(iii) $(2,3,0,0)$ と与えられた。各 $\Delta s^2$ と分離の種類を求めよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

[時空間隔の定義](#def-srel2-interval)にそれぞれ代入します。

$$
\begin{aligned}
\text{(i)}\quad\Delta s^2&=5^2-3^2=16\,\mathrm m^2>0,\\
\text{(ii)}\quad\Delta s^2&=5^2-3^2-4^2=0,\\
\text{(iii)}\quad\Delta s^2&=2^2-3^2=-5\,\mathrm m^2<0.
\end{aligned}
$$

[因果分類の定義](#def-srel2-causal-types)から、順に時間的、光的、空間的です。(ii) の空間距離は $\sqrt{3^2+4^2}=5\,\mathrm m$ で、$c\Delta t$ と一致することでも確認できます。
<!-- solution-end -->

### A2. Lorentz不変性を数値で試す

$c\Delta t=5\,\mathrm m$、$\Delta x=3\,\mathrm m$、$\Delta y=\Delta z=0$ とする。速度 $v=3c/5$ の $x$ 方向boost後の差を求め、$\Delta s^2$ が一致することを確認せよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|\beta|=3/5<1$ なので変換でき、$\gamma=1/\sqrt{1-9/25}=5/4$ です。[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)から

$$
\begin{aligned}
c\Delta t'&=\frac54\left(5-\frac35\cdot3\right)\mathrm m
=\frac54\cdot\frac{16}{5}\,\mathrm m=4\,\mathrm m,\\
\Delta x'&=\frac54\left(3-\frac35\cdot5\right)\mathrm m=0.
\end{aligned}
$$

変換前は $\Delta s^2=(25-9)\,\mathrm m^2=16\,\mathrm m^2$、変換後は $(16-0)\,\mathrm m^2=16\,\mathrm m^2$ です。[不変性の定理](#thm-srel2-interval-invariance)と一致します。
<!-- solution-end -->

### A3. 光円錐の内側か外側か

$A=(0,\boldsymbol0)$ とし、未来の事象 $B$ は $\Delta t=2\,\mathrm s$、$|\Delta\boldsymbol r|=3c\,\mathrm s/2$ にある。$B$ が $J^+(A)$ に属するか判定せよ。また距離が $3c\,\mathrm s$ ならどうなるか。

- Level: A

<!-- solution-start -->
#### 詳細解答

[未来の因果円錐の定義](#def-srel2-light-cone)は $c\Delta t\ge|\Delta\boldsymbol r|$ です。第一の場合は

$$
c\Delta t=2c\,\mathrm s>\frac{3c}{2}\,\mathrm s=|\Delta\boldsymbol r|
$$

なので、$B$ は $J^+(A)$ の内部です。第二の場合は

$$
2c\,\mathrm s<3c\,\mathrm s
$$

となり条件が成立せず、$J^+(A)$ の外部です。光速以下の信号が後者に届くという想定はモデルに反します。
<!-- solution-end -->

### A4. 定速時計の固有時

$S$ で $10\,\mathrm s$ の間、速さ $4c/5$ で等速直線運動する一本の時計の固有時を求めよ。速さが零ならどうなるかも答えよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

$|v|=4c/5<c$ で、滑らかな時間的世界線なので[固有時の定義](#def-srel2-proper-time)を適用できます。積分の因子は一定で

$$
\sqrt{1-\frac{v^2}{c^2}}
=\sqrt{1-\frac{16}{25}}
=\frac35.
$$

従って

$$
\tau=\int_0^{10\,\mathrm s}\frac35\,dt=6\,\mathrm s.
$$

$v=0$ なら因子は1となり、固有時は $10\,\mathrm s$ です。単に「動く時計の時間は遅れる」と暗記せず、どの時計の時間かを積分で特定しました。
<!-- solution-end -->

### A5. 空間的な二事象を同時にする

$\Delta x=600\,\mathrm m$、$c\Delta t=300\,\mathrm m$、$\Delta y=\Delta z=0$ の二事象について、$\Delta t'=0$ とするboostの速度 $v$ を求めよ。その速度が許される理由を述べよ。

- Level: A

<!-- solution-start -->
#### 詳細解答

まず $\Delta s^2=(300^2-600^2)\,\mathrm m^2=-270000\,\mathrm m^2<0$ なので空間的です。[Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)の時間差を零と置くと

$$
0=\gamma\left(\Delta t-\frac{v\Delta x}{c^2}\right)
\quad\Longleftrightarrow\quad
\frac vc=\frac{c\Delta t}{\Delta x}=\frac{300}{600}=\frac12.
$$

従って $v=c/2$ です。$|v|<c$ を満たすため、実在する慣性系へのboostです。[因果順序の命題](#prop-srel2-causal-order)の具体例になっています。
<!-- solution-end -->

## Level B

### B1. 三次元boostでの二次形式

$x$ 方向boostにおいて $\Delta x'^2=\Delta x^2$、$\Delta x'^3=\Delta x^3$ であることを使い、任意の $\Delta X$ について

$$
(\Delta x'^0)^2-\sum_{i=1}^3(\Delta x'^i)^2
=(\Delta x^0)^2-\sum_{i=1}^3(\Delta x^i)^2
$$

を直接証明せよ。特に光的分離が光的分離へ移ることを説明せよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

[一次元Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)を $x^0=ct$ に書き換えると

$$
\begin{aligned}
\Delta x'^0&=\gamma(\Delta x^0-\beta\Delta x^1),\\
\Delta x'^1&=\gamma(\Delta x^1-\beta\Delta x^0),\qquad \beta=v/c.
\end{aligned}
$$

それぞれ二乗して差を取ります。

$$
\begin{aligned}
(\Delta x'^0)^2-(\Delta x'^1)^2
&=\gamma^2\bigl[(\Delta x^0)^2-2\beta\Delta x^0\Delta x^1+\beta^2(\Delta x^1)^2\\
&\qquad-(\Delta x^1)^2+2\beta\Delta x^0\Delta x^1-\beta^2(\Delta x^0)^2\bigr]\\
&=\gamma^2(1-\beta^2)\bigl[(\Delta x^0)^2-(\Delta x^1)^2\bigr]\\
&=(\Delta x^0)^2-(\Delta x^1)^2.
\end{aligned}
$$

垂直二成分の平方は不変なので、それぞれを両辺から引けば問題の四成分の等式が出ます。変換前の左辺が零なら変換後も零であり、逆変換も存在するため、非零の光的分離は非零の光的分離のままです。
<!-- solution-end -->

### B2. 任意方向の両端静止系

$c\Delta t=13\,\mathrm m$、$\Delta\boldsymbol r=(3,4,0)\,\mathrm m$ とする。両事象が同じ空間位置に見える慣性系の速度の向きと大きさを求め、その系での $c\Delta t'$ と $\Delta s^2$ を求めよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

空間差の長さは

$$
|\Delta\boldsymbol r|=\sqrt{3^2+4^2}\,\mathrm m=5\,\mathrm m,
$$

時空間隔は $\Delta s^2=(13^2-5^2)\,\mathrm m^2=144\,\mathrm m^2>0$ です。空間差の単位方向を

$$
\boldsymbol n=\frac{\Delta\boldsymbol r}{|\Delta\boldsymbol r|}
=\left(\frac35,\frac45,0\right)
$$

とすると、両端静止系の相対速度ベクトルは

$$
\boldsymbol v=\frac{\Delta\boldsymbol r}{\Delta t}
=\frac{5c}{13}\boldsymbol n
=c\left(\frac3{13},\frac4{13},0\right).
$$

速度の大きさは $5c/13<c$ なので許されます。空間軸を $\boldsymbol n$ 方向に回してから[boost](../SREL1/index.md#thm-srel1-lorentz)を適用します。$\beta=5/13$、$\gamma=13/12$ より

$$
\begin{aligned}
\Delta x'_{\parallel}
&=\frac{13}{12}\left(5-\frac5{13}\cdot13\right)\mathrm m=0,\\
c\Delta t'&=\frac{13}{12}\left(13-\frac5{13}\cdot5\right)\mathrm m\\
&=\frac{13}{12}\cdot\frac{144}{13}\,\mathrm m=12\,\mathrm m.
\end{aligned}
$$

垂直の空間差は最初から零で、変換後も零です。従って $\Delta s'^2=(12^2-0)\,\mathrm m^2=144\,\mathrm m^2$ で、元と一致します。
<!-- solution-end -->

### B3. 折り返す時計と経路の違い

$S$ の原点から出発し、時刻 $T>0$ に同じ原点へ戻る時計を考える。途中の速度は次の区分的な関数とする。

$$
v(t)=
\begin{cases}
u & (0\le t<T/2),\\
-u & (T/2\le t\le T),
\end{cases}
\qquad 0<u<c.
$$

静止する時計の固有時との大小関係を積分から証明せよ。なぜ二つの慣性系を入れ替える議論だけでは同じ結論が出ないかを述べよ。

- Level: B

<!-- solution-start -->
#### 詳細解答

往路の変位は $uT/2$、復路の変位は $-uT/2$ なので合計零、従って両時計の出発・再会事象が一致します。区分的に $|v|=u<c$ なので [固有時の定義](#def-srel2-proper-time)により

$$
\begin{aligned}
\tau_{\mathrm{move}}
&=\int_0^{T/2}\sqrt{1-\frac{u^2}{c^2}}\,dt
+\int_{T/2}^T\sqrt{1-\frac{u^2}{c^2}}\,dt\\
&=\frac T2\sqrt{1-\frac{u^2}{c^2}}
+\frac T2\sqrt{1-\frac{u^2}{c^2}}\\
&=T\sqrt{1-\frac{u^2}{c^2}}<T=\tau_{\mathrm{rest}}.
\end{aligned}
$$

不等号は $0<u<c$ から $0<1-u^2/c^2<1$ と分かるため厳密です。移動する時計は折返しで速度を変えるので、全経路を一つの静止慣性系で表せません。往路の慣性系と復路の慣性系を区別しない相互対称性の議論は、この世界線を表していません。
<!-- solution-end -->

## Level C

### C1. 光円錐・両端静止系・二本の時計を総合する

$S$ の二事象を、時間の成分が $ct$ となる四成分表示で次のように与える。

$$
A=(0,\boldsymbol0),\qquad
B=(10c\,\mathrm s,(3c\,\mathrm s,0,0)).
$$

二本の時計は同じ事象 $A$ で出発し $B$ で再会する。時計Iは $S$ で速度 $3c/10$ の等速直線運動を続ける。時計IIの速度は

$$
v_{\mathrm{II}}(t)=
\begin{cases}
3c/5 & (0\le t<5\,\mathrm s),\\
0 & (5\,\mathrm s\le t\le10\,\mathrm s)
\end{cases}
$$

とする（速度の切替は理想化する）。

1. $A,B$ の因果分類と $\Delta s^2$ を求めよ。
2. $A,B$ が同じ位置となる慣性系の速度を求め、その系の座標時間差を求めよ。
3. 時計I・IIの固有時をそれぞれ積分から求め、大小を比較せよ。
4. 時計IIの方が短いことを固有時最大性の命題とも照合し、どの仮定が使われたか述べよ。

- Level: C

<!-- solution-start -->
#### 詳細解答

(1) 空間差は $3c\,\mathrm s$、時間差は $10\,\mathrm s$ です。[時空間隔の定義](#def-srel2-interval)によれば

$$
\begin{aligned}
\Delta s^2
&=c^2(10\,\mathrm s)^2-(3c\,\mathrm s)^2\\
&=(100-9)c^2\,\mathrm s^2
=91c^2\,\mathrm s^2>0.
\end{aligned}
$$

$\Delta t>0$ なので $B$ は $A$ の未来向き時間的領域にあります。

(2) [Lorentz変換](../SREL1/index.md#thm-srel1-lorentz)で $\Delta x'=\gamma(\Delta x-v\Delta t)=0$ と置きます。$\Delta t=10\,\mathrm s>0$ なので

$$
v=\frac{\Delta x}{\Delta t}=\frac{3c\,\mathrm s}{10\,\mathrm s}=\frac{3c}{10}.
$$

$|v|<c$ だから実現可能です。$\gamma=(1-9/100)^{-1/2}=10/\sqrt{91}$ であり

$$
\begin{aligned}
\Delta t'
&=\gamma\left(\Delta t-\frac{v\Delta x}{c^2}\right)\\
&=\frac{10}{\sqrt{91}}\left(10\,\mathrm s-\frac{(3c/10)(3c\,\mathrm s)}{c^2}\right)\\
&=\frac{10}{\sqrt{91}}\left(10-\frac9{10}\right)\mathrm s\\
&=\sqrt{91}\,\mathrm s.
\end{aligned}
$$

これは [時空間隔の不変性](#thm-srel2-interval-invariance)から $\Delta t'=\sqrt{\Delta s^2}/c$ としても一致します。

(3) 時計Iは一定の速度 $3c/10$ で動くため、[固有時の定義](#def-srel2-proper-time)より

$$
\begin{aligned}
\tau_{\mathrm I}
&=\int_0^{10\,\mathrm s}\sqrt{1-\frac9{100}}\,dt\\
&=10\frac{\sqrt{91}}{10}\,\mathrm s
=\sqrt{91}\,\mathrm s.
\end{aligned}
$$

時計IIは最初の区間に $3c/5$、次の区間に $0$ であり、移動距離は $(3c/5)(5\,\mathrm s)=3c\,\mathrm s$ なので確かに $B$ へ到達します。よって

$$
\begin{aligned}
\tau_{\mathrm{II}}
&=\int_0^{5\,\mathrm s}\sqrt{1-\frac9{25}}\,dt
+\int_{5\,\mathrm s}^{10\,\mathrm s}1\,dt\\
&=\frac45(5\,\mathrm s)+5\,\mathrm s
=9\,\mathrm s.
\end{aligned}
$$

$91>81$ だから $\sqrt{91}>9$ であり $\tau_{\mathrm I}>\tau_{\mathrm{II}}$ です。

(4) 二時計は同じ時間的に分離した $A,B$ を結び、区分的 $C^1$ で各区間の速度が $c$ 未満です。時計Iの世界線は両端を結ぶ一直線で、時計IIは途中で速度が変わります。従って [固有時最大性](#prop-srel2-inertial-max-proper-time)により

$$
\tau_{\mathrm{II}}<\tau_{\mathrm I}
=\frac{\sqrt{\Delta s^2}}{c}
=\sqrt{91}\,\mathrm s
$$

となり、直接積分した結果と一致します。比較に必要なのは同じ二事象を共有すること、未来向き時間的な経路であること、平坦なMinkowski時空であることです。切替時に理想的な速度の跳びを許す点を除き、一般相対論の重力や曲率は持ち込んでいません。
<!-- solution-end -->
