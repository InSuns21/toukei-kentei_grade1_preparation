# QFT56 境界自由場・区間のUV正則化と熱的尺度

<!-- definition-example-audit: strict -->

[QFT55の円筒二点関数](../QFT55/index.md#thm-qft55-cylinder-two-point)は、空間を周期化した場合とEuclid時間を周期化した場合とで、相関の距離依存が変わることを示しました。今度は空間に**端**があると何が変わるでしょうか。周期条件と壁での条件は同じではありません。また、ある区間 $A=[u,v]$ だけを観測する場合、端点を無限に細かく分解する操作には短距離の発散が現れます。

この章ではまず、二次元の自由Gaussian bosonを半平面に置き、壁の鏡像を用いて相関関数を実際に構成します。それを幅が有限の帯領域へ写し、点分離の長さ $a$ を導入します。最後に[QFT55の熱円筒二点核](../QFT55/index.md#prop-qft55-thermal-two-point)と比較し、どの対数の係数が計算で決まり、どの定数が正則化の選択に残るかを分けます。**区間のエントロピーをまだ導いたことにはしません**。局所領域と有限次元密度行列を結ぶ作業、レプリカ法、解析接続は後続の課題です。

この章の固定条件は、二次元Euclid平坦空間、実スカラー場、$g>0$、$\hbar=1$ です。境界Green関数は質量零の自由理論の**形式的なGaussian共分散**として扱い、Dirichletでは境界値を固定します。Neumannでは零モードの赤外（IR）処理を明示します。点が一致する前にはUV cutoff $a>0$ を置き、$a$ より十分大きな距離で連続体の式を使います。一般の相互作用CFTや任意の境界状態の相関を同じ式で決めるものではありません。

## 1. 壁の上に場を置く：境界値とGreen方程式

壁のない平面では自由場の基本核は二点間の距離だけで決まります。壁があると、同じ距離にある二点でも壁までの距離によって相関が変わります。まず壁を横軸に、理論が存在する側をその上側に取ります。

<a id="def-qft56-half-plane-boundaries"></a>

<!-- formal-statement-start -->
> **定義（半平面と二つの境界条件）**  
> 複素座標 $z=x+iy$ について、虚部が正の点の集合を半平面 $H$、実軸を境界 $\partial H$ とする。境界の外向き単位法線は $n=(0,-1)$ とする。境界値零の**Dirichlet条件**と、法線微分零の**Neumann条件**はそれぞれ次を意味する。

$$
\begin{aligned}
H&=\{x+iy:y>0\},\quad \partial H=\{y=0\},\\
\text{Dirichlet: }&\phi(x,0)=0,\\
\text{Neumann: }&\partial_n\phi(x,0)=-\partial_y\phi(x,0)=0.
\end{aligned}
$$
<!-- formal-statement-end -->

Dirichletは場の値を固定し、Neumannは壁を横切る勾配を零にします。たとえば $\phi(x,y)=y$ は境界で値が零ですが法線微分は $-1$ なのでDirichletだけを満たします。$\phi(x,y)=1$ は値が零ではなく、法線微分が零なのでNeumannだけを満たします。

<!-- definition-example-start: def-qft56-half-plane-boundaries -->
**定義の確認**：$\phi(x,y)=xy$ では $\phi(x,0)=0$ なので全ての $x$ でDirichlet条件を満たします。しかし $\partial_n\phi(x,0)=-x$ は $x\ne0$ で零ではなく、Neumann条件は満たしません。条件は壁の一点だけでなく**壁の全点**で確認します。
<!-- definition-example-end -->

この章では境界をもつ領域 $\Omega$ 上で、滑らかな場の形式的作用を

$$
S[\phi]=\frac{g}{4\pi}\int_\Omega
\bigl((\partial_x\phi)^2+(\partial_y\phi)^2\bigr)\,dx\,dy
$$

とします。これは[QFT20のEuclid Gaussian作用](../QFT20/index.md#def-qft20-euclidean-action)と同じ二次形式の模型ですが、ここでは係数を $g/(4\pi)$ と固定しました。以下、微分・測度の記号を

$$
\nabla\phi=(\partial_x\phi,\partial_y\phi),\qquad
\Delta=\partial_x^2+\partial_y^2,\qquad
d^2z=dx\,dy
$$

とします。$\partial_n$ は各境界の外向き単位法線方向の微分です。変分 $\phi\mapsto\phi+\varepsilon\eta$ の一次項は、部分積分で

$$
\begin{aligned}
\delta S[\phi;\eta]
&=\frac{g}{2\pi}\int_\Omega\nabla\phi\cdot\nabla\eta\,d^2z\\
&=-\frac{g}{2\pi}\int_\Omega(\Delta\phi)\eta\,d^2z
+\frac{g}{2\pi}\int_{\partial\Omega}\eta\,\partial_n\phi\,ds.
\end{aligned}
$$

Dirichletでは許容変分が境界で $\eta=0$、Neumannでは境界条件 $\partial_n\phi=0$ を課すので、どちらも境界項が消えます。形式的二次作用素は $K=-(g/2\pi)\Delta$ です。共分散はこの逆核に対応します。

逆核を定義する前に追加の記号を固定します。$\Delta_z$ はLaplace作用素を第一変数 $z$ に作用させる記号、$\delta^{(2)}(z-w)$ は二次元Diracデルタ分布です。後者は内部の点 $w$ と内部に台をもつ試験関数 $h$ に対して

$$
\int_\Omega\delta^{(2)}(z-w)h(z)\,d^2z=h(w)
$$

となることで特徴付けられます。

<a id="def-qft56-boundary-green"></a>

<!-- formal-statement-start -->
> **定義（二次元自由bosonの境界Green核）**  
> $g>0$、$\Omega\subset\mathbb R^2$ とする。境界条件 $B$ のGreen核 $G_B(z,w)$ とは、固定された $w\in\Omega$ に対し $z$ の分布として

$$
-\Delta_zG_B(z,w)=\frac{2\pi}{g}\delta^{(2)}(z-w)
$$

> を満たし、$z$ が境界に達するとき $B$ の条件を満たす対称核をいう。Dirichletでは $G_D=0$、Neumannでは $\partial_nG_N=0$ を境界で課す。非有界領域のNeumann核はIRの零モード・加法定数の選択を別途要する。
<!-- formal-statement-end -->

作用の係数を二倍にするとGreen核の係数は半分になるので、係数 $2\pi/g$ は省略できません。小円 $|z-w|=\epsilon$ の外向き微分を積分すると

$$
-\oint_{|z-w|=\epsilon}\partial_r
\left[-\frac1g\log\frac{|z-w|}{\ell_0}\right]ds
=-\left(-\frac1{g\epsilon}\right)2\pi\epsilon
=\frac{2\pi}{g}.
$$

したがって平面の核 $G_0(z,w)=-(1/g)\log(|z-w|/\ell_0)$ は定義のデルタ源を持ちます。$\ell_0>0$ は対数の引数を無次元化する参照長であり、二次元質量零場の赤外零モードについての規約を含みます。

<!-- definition-example-start: def-qft56-boundary-green -->
**定義の確認**：平面の $G_0$ は $z\ne w$ で $\Delta\log|z-w|=0$、小円の流束は上で $2\pi/g$ となり、局所Green方程式を満たします。しかし壁 $y=0$ では一般に $G_0(x,w)\ne0$ です。つまり局所的な源の式だけでは境界Green核にならず、**境界値も別に**検査する必要があります。
<!-- definition-example-end -->

## 2. 鏡像法：Dirichletは引き算、Neumannは足し算

$w=u+iv$（$v>0$）の壁に関する鏡像点は $\bar w=u-iv$ です。鏡像は $H$ の外にあるため、内部には余計なデルタ源を作りません。境界では $|x-w|=|x-\bar w|$ なので、二つの対数を引けば値が零になります。

<a id="thm-qft56-dirichlet-image"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet境界核の鏡像公式）**  
> $g>0$、$H=\{\operatorname{Im}z>0\}$、$z,w\in H$、$z\ne w$ とする。境界値零かつ無限遠で零となる半平面のDirichlet Green核は

$$
G_D(z,w)=-\frac1g\log\frac{|z-w|}{|z-\bar w|}.
$$

> この核は $G_D(z,w)=G_D(w,z)$ を満たし、$z$ の変数では $-\Delta_zG_D=(2\pi/g)\delta^{(2)}(z-w)$、$z=x\in\partial H$ では $G_D(x,w)=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

平面の対数源を $w$ と鏡像 $\bar w$ に置きます。鏡像は領域外なのでGreen方程式の源は $w$ だけです。壁では二つの距離が一致するため、差が零になります。

<!-- proof-start -->
### 証明

$G_D=G_0(z,w)-G_0(z,\bar w)$ と置くと、参照長 $\ell_0$ が相殺して表示式になります。$-\Delta_zG_0(z,w)=(2\pi/g)\delta^{(2)}(z-w)$ ですが、鏡像点 $\bar w$ は $H$ の外なので、$H$ の試験関数を作用させると第2項のデルタ分布は零です。よって内部で所定のGreen方程式を満たします。

境界 $z=x$ では

$$
|x-w|^2=(x-u)^2+v^2=|x-\bar w|^2
$$

なので $G_D(x,w)=-(1/g)\log1=0$。また $|z|\to\infty$ では $|z-w|/|z-\bar w|\to1$ で、核は零に近づきます。$|z-\bar w|=|w-\bar z|$ と $|z-w|=|w-z|$ により対称性も成立します。以上で表示した核が要求された境界条件と局所源の方程式を満たすことが確かめられました。
<!-- proof-end -->

**数値で確認する例**：$z=i$、$w=2i$ なら $|z-w|=1$、$|z-\bar w|=3$ なので $G_D(i,2i)=(1/g)\log3$。同じ二点距離 $1$ でも、壁から十分遠くへ二点を平行移動すると鏡像距離が増え、核の値が変わります。平面のような並進不変性を壁に垂直な方向へ適用することはできません。

次に壁で法線微分を消したいときは鏡像の**和**を使います。ただし同じ二次元の質量零場にはIRの曖昧さが残ります。

<a id="prop-qft56-neumann-image"></a>

<!-- formal-statement-start -->
> **命題（Neumann鏡像核と零モードの曖昧さ）**  
> $g>0$、$z,w\in H$、$z\ne w$、$\ell_0>0$ とする。次の核は半平面内部のGreen方程式と、壁でのNeumann条件を満たす。

$$
G_N(z,w)=-\frac1g\log\frac{|z-w|\,|z-\bar w|}{\ell_0^2}.
$$

> $\ell_0$ を変えると加法定数が変わる。無限体積のNeumann零モードを固定しないまま、これを任意の非中性な場の観測量に対する一意な正値共分散とみなしてはならない。
<!-- formal-statement-end -->

### 証明の見取り図

内部の源はDirichletと同じです。壁 $y=0$ で、実源による対数の法線微分と鏡像による法線微分が反対符号となることを確かめます。

<!-- proof-start -->
### 証明

$z=x+iy$、$w=u+iv$ とする。$\partial_y\log|z-w|=(y-v)/((x-u)^2+(y-v)^2)$、同じく鏡像では $(y+v)/((x-u)^2+(y+v)^2)$ です。$y=0$ で両者は $-v/((x-u)^2+v^2)$ と $+v/((x-u)^2+v^2)$ になり和が零です。外向き法線は $-\partial_y$ なので $\partial_nG_N=0$ です。鏡像源は領域外にあり、内部のデルタ源係数は[Dirichlet核の証明](#thm-qft56-dirichlet-image)と同じ $2\pi/g$ になります。

参照長を $\ell_0'=\kappa\ell_0$ に変えると、$G_N$ は $(2/g)\log\kappa$ だけ増えます。定数のLaplace作用と法線微分はともに零なので、二つの条件はこの定数を決めません。例えば中性な試験電荷 $\sum_iq_i=0$ について二次形式 $\sum_{ij}q_iG_N(z_i,z_j)q_j$ を考えると、加法定数の寄与は定数倍の $(\sum_iq_i)^2=0$ となります。一方で $\sum_iq_i\ne0$ ならIRの規約が数値に残ります。
<!-- proof-end -->

**壊れる仮定**：Dirichlet核をNeumannの代わりに使うと、境界で値は零でも $\partial_nG_D$ は一般に零ではありません。鏡像の符号は任意の表記差ではなく、境界条件という物理的な仮定を反映します。

## 3. 帯領域へ写す：二つの壁を同時に扱う

幅 $W>0$ の帯 $\Sigma_W=\{w=x+iy:0<y<W\}$ を考えます。ここでは $x$ は無限方向、$y=0,W$ が二つの壁です。[QFT55の指数関数による写像](../QFT55/index.md#def-qft55-cylinder-map)と同じ指数関数を使いますが、周期同一視ではなく**領域の像**を扱います。

$$
f(w)=e^{\pi w/W}.
$$

$0<y<W$ なら $\arg f(w)=\pi y/W\in(0,\pi)$ なので $f$ は帯を半平面へ一対一で写します。下の壁は正の実軸、上の壁は負の実軸へ移ります。さらに $f'(w)=(\pi/W)f(w)\ne0$ なので、内部で局所座標を失いません。

<a id="thm-qft56-strip-green"></a>

<!-- formal-statement-start -->
> **定理（帯領域のDirichlet Green核）**  
> $g>0$、$W>0$、$w,w'\in\Sigma_W$、$w\ne w'$ とし、両壁でDirichlet値零を課す。帯領域のGreen核は

$$
G_{D,W}(w,w')=-\frac1g\log
\left|\frac{\sinh\!\left(\frac{\pi(w-w')}{2W}\right)}
{\sinh\!\left(\frac{\pi(w-\overline{w'})}{2W}\right)}\right|.
$$

> 内部で $-\Delta_wG_{D,W}=(2\pi/g)\delta^{(2)}(w-w')$ を満たし、$y=0$ と $y=W$ のどちらの壁でも値が零になる。
<!-- formal-statement-end -->

### 証明の見取り図

半平面の[鏡像公式](#thm-qft56-dirichlet-image)に $z=f(w)$、$z'=f(w')$ を代入し、指数の差を $\sinh$ に分解します。分子と分母の指数因子が相殺されます。

<!-- proof-start -->
### 証明

$\alpha=\pi/W$ と置きます。この $\alpha$ は写像の逆長さの尺度であり、第4節以降のUV長 $a$ とは別です。$f(w)-f(w')$ は

$$
e^{\alpha w}-e^{\alpha w'}=2e^{\alpha(w+w')/2}\sinh\left(\frac{\alpha(w-w')}{2}\right)
$$

です。分母の鏡像点は $\overline{f(w')}=e^{\alpha\overline{w'}}$ なので

$$
e^{\alpha w}-e^{\alpha\overline{w'}}
=2e^{\alpha(w+\overline{w'})/2}\sinh\left(\frac{\alpha(w-\overline{w'})}{2}\right).
$$

二つの前置因子の絶対値は、$\operatorname{Re}w'=\operatorname{Re}\overline{w'}$ より一致します。したがって[半平面のDirichlet核](#thm-qft56-dirichlet-image)を引き戻せば表示式です。

[QFT50の局所正則共形写像の判定](../QFT50/index.md#def-qft50-local-conformal)より、$f=U+iV$ の実Jacobian $Df$ は $Df(Df)^{\mathsf T}=|f'|^2I_2$ を満たし、$U,V$ は調和関数です。合成関数 $F(U,V)$ の二階連鎖律を確認します。$f_1=U,f_2=V$ とし、$i,j\in\{1,2\}$ を像の実座標の添字、$k\in\{x,y\}$ を元の座標の微分変数とすると

$$
\sum_{k=x,y}(\partial_k f_i)(\partial_k f_j)
=|f'|^2\delta_{ij},
\qquad
\Delta_w f_i=0.
$$

前者は $\partial_{ij}F$ の係数、後者は $\partial_iF$ の係数なので、連鎖律で

$$
\Delta_w(F\circ f)=|f'|^2(\Delta_zF)\circ f,
\qquad
\delta^{(2)}(f(w)-f(w'))=
\frac{\delta^{(2)}(w-w')}{|\det Df(w')|}
=\frac{\delta^{(2)}(w-w')}{|f'(w')|^2}.
$$

後式は上で可逆性を確かめた正則写像の面積Jacobianによります。デルタ分布の支持 $w=w'$ で両係数が消し合うので、源の係数は変わりません。壁上では $f(w)$ が実数になるため、[半平面の境界値零](#thm-qft56-dirichlet-image)がそのまま保たれます。
<!-- proof-end -->

**定義・境界の直接確認**：$w=x$（下の壁）では $f(w)>0$、$w=x+iW$（上の壁）では $f(w)<0$ です。どちらも実軸上にあるため、半平面の鏡像距離が一致して $G_{D,W}=0$ になります。単に双曲線関数の式を代入して終えるのでなく、「なぜ両壁の条件が守られるか」を写像で説明できました。

## 4. 区間端点と点分離：何を小さくしているのか

場の二点関数は $z\to w$ で発散します。しかし連続体の「一点を測る」操作と、格子間隔が有限の模型で一つのセルを測る操作は異なります。まず区間の両端に小さな円を置くという幾何学的な正則化を定義します。**この円は物理的な壁ではありません**。そこへDirichlet条件を課すわけではないことが重要です。

<a id="def-qft56-interval-cutoff"></a>

<!-- formal-statement-start -->
> **定義（区間端点の点分離cutoff）**  
> 固定Euclid時刻の無限直線上に $A=[u,v]$、$u<v$ を取り、区間長を $\ell=v-u>0$ とする。$a>0$ をUV点分離長とし、$2a<\ell$ を課す。Euclid平面では端点 $(u,0),(v,0)$ を中心とする半径 $a$ の円盤内を、端点への接近を扱う計算から除く。この処方を**区間端点のcutoff**という。連続体近似の制御にはさらに $a/\ell\ll1$ を要する。
<!-- formal-statement-end -->

円盤を除くのは局所演算子の挿入を端点に近づけすぎないためであって、区間の外に場がないという意味ではありません。半平面の壁 $\partial H$ は作用の境界条件を指定しますが、ここで除いた小円には追加の物理境界条件を置きません。また、$a$ が同じでも別の格子化や平滑化によって有限の定数は変わり得ます。

<!-- definition-example-start: def-qft56-interval-cutoff -->
**定義の確認**：$A=[0,100a]$ とすれば $\ell=100a$、二つの円盤の中心間距離は $100a$、半径の和は $2a$ なので円盤は交わらず、$a/\ell=10^{-2}$ です。一方 $A=[0,a]$ では $2a<\ell$ 自体が偽で、端点を独立な短距離領域として扱う計算は成立しません。
<!-- definition-example-end -->

点分離を使って自己縮約の対数を見ます。半平面の $z=x+iy$ から水平方向に距離 $a$ だけ離れた $z_a=x+a+iy$ を取ります。二点はどちらも $H$ の内部にあり、$|z-z_a|=a$、鏡像距離は $|z-\overline{z_a}|=\sqrt{a^2+4y^2}$ です。

<a id="prop-qft56-point-split-variance"></a>

<!-- formal-statement-start -->
> **命題（境界距離とUV自己縮約）**  
> $g>0$、$a>0$、$y>0$ とする。水平方向に点分離したDirichlet縮約核 $C_{D,a}(y):=G_D(x+iy,x+a+iy)$ は

$$
C_{D,a}(y)=\frac{1}{2g}\log\left(1+\frac{4y^2}{a^2}\right).
$$

> $a/y\to0$ での先頭項は次のとおり。

$$
C_{D,a}(y)=\frac1g\log\frac{2y}{a}
+O\left(\frac{a^2}{y^2}\right).
$$

> 幅 $W$ の帯の内部では $w=x+iy$、$0<y<W$ として、$a/W\to0$ かつ $a\ll\min(y,W-y)$ の範囲で

$$
C_{D,W,a}(y)=\frac1g\log\left[
\frac{2W}{\pi a}\sin\left(\frac{\pi y}{W}\right)
\right]+o(1).
$$

> これらは指定した**点分離処方の縮約核**の式であり、別の正則化では有限の加法定数がずれることがある。
<!-- formal-statement-end -->

### 証明の見取り図

半平面では実点と鏡像点までの二つの距離をそのまま入れます。帯では[帯のGreen核](#thm-qft56-strip-green)に水平分離 $a$ を代入してから、小さい $a/W$ の極限を取ります。

<!-- proof-start -->
### 証明

[Dirichlet鏡像公式](#thm-qft56-dirichlet-image)へ $|z-z_a|=a$、$|z-\overline{z_a}|=\sqrt{a^2+4y^2}$ を代入すると

$$
C_{D,a}(y)=-\frac1g\log\frac{a}{\sqrt{a^2+4y^2}}
=\frac1{2g}\log\left(1+\frac{4y^2}{a^2}\right).
$$

$a/y\to0$ では $1+4y^2/a^2=(4y^2/a^2)(1+a^2/(4y^2))$ と分解し、$\log(1+t)=t+O(t^2)$ を $t=a^2/(4y^2)$ に適用すれば、記載の誤差まで得られます。

帯では $w'=w+a$ として[帯のGreen核](#thm-qft56-strip-green)の比を計算します。$t=\pi a/(2W)$、$\theta=\pi y/W$ と置くと $w-w'=-a$、$w-\overline{w'}=-a+2iy$ です。$|\sinh(-t+i\theta)|^2=\sinh^2t+\sin^2\theta$ なので、**cutoffを有限に保った式**は

$$
C_{D,W,a}(y)=\frac1g\log
\frac{\sqrt{\sinh^2t+\sin^2\theta}}{\sinh t}.
$$

$t\to0$ かつ $t/|\sin\theta|\to0$ なら分子は $|\sin\theta|(1+o(1))$、分母は $t(1+o(1))$ となります。$0<\theta<\pi$ では $\sin\theta>0$、$t=\pi a/(2W)$ なので表示式を得ます。$y$ が壁に $a$ 程度まで近づく場合にはこの近似条件が壊れるため、有限 $a$ の式へ戻る必要があります。
<!-- proof-end -->

**中央と壁の違い**：$y=W/2$ では $\sin(\pi y/W)=1$ なので、$C_{D,W,a}\simeq(1/g)\log(2W/(\pi a))$ です。$a\ll y\ll W$ では $\sin(\pi y/W)\sim\pi y/W$ となり、$C_{D,W,a}\simeq(1/g)\log(2y/a)$ と半平面へ戻ります。これに対して $y\to0$ を固定 $a$ のまま取れば、厳密な有限 $a$ 式は零へ近づきます。**先に $a\to0$、その後 $y\to0$ とする極限は交換できません。**

## 5. 境界の一体関数：指数と係数の担当を分ける

相関に現れる対数からべき乗を作る最も単純な対象が、自由bosonの指数型局所演算子です。Gaussian場 $\phi$ は二次作用で定まるので、有限個の平滑化変数の生成関数には[QFT19の有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を適用できます。一点の指数の期待値を有限にするには、自己縮約の発散を先に差し引かなければなりません。

ここは前節の**水平二点分離**と、一つの場を平滑化して作る**自己分散**を区別します。前節の $C_{D,a}(y)=G_D(z,z+a)$ は異なる二点の縮約であり、そのまま一つの確率変数の分散だとは言えません。そこで $z=x+iy$ の周囲の半径 $a<y$ の円が半平面内に収まるとき、場の円周平均を

$$
\phi_a(z)=\frac{1}{2\pi}\int_0^{2\pi}\phi(z+ae^{i\vartheta})\,d\vartheta
$$

と定めます。$\vartheta$ は円周上を動かす角度で、$z$ は固定します。この平滑化による平面の自己縮約を $C_{0,a}=(1/g)\log(\ell_0/a)$ とします。$\ell_0>0$ は赤外の加法定数を選んだ正規順序の参照長で、物理的な区間の長さ $\ell$ とは別の記号です。二点分離と円周平均では有限 $a$ の核が異なりますが、下の計算で極限の有限差が一致することを確かめます。

<a id="def-qft56-gaussian-vertex"></a>

<!-- formal-statement-start -->
> **定義（平面規格化のGaussian頂点演算子）**  
> $g>0$、$q\in\mathbb R$、$\ell_0>0$ とし、二次元自由Gaussian bosonの円周平均 $\phi_a$ の平面自己縮約を $C_{0,a}=(1/g)\log(\ell_0/a)$ とする。平面規格化の頂点演算子をGaussian縮約の意味で

$$
V_q^{(\ell_0)}(z)=\lim_{a\to0}
\exp\!\left(\frac{q^2}{2}C_{0,a}\right)e^{iq\phi_a(z)}
$$

> と定義する。ただし極限は許容された相関関数内で取り、無限大の点wise作用素の存在を主張しない。$q=0$ では単位演算子である。
<!-- formal-statement-end -->

この正規順序は、平面で指数を二つ掛けるときの自己収縮を除き、相異なる点間の収縮だけを残すものです。二点で電荷が $q,-q$ の組なら、[有限次元Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)から距離 $r$ に対して $r^{-q^2/g}$ の形が現れ、局所スカラーの次元は $\Delta_q=q^2/(2g)$ となります。任意の $q$ の演算子が任意のコンパクト化半径の理論で局所的に許されるとは限らず、ここでは非コンパクト自由場の形式的Gaussian観測量として扱います。

<!-- definition-example-start: def-qft56-gaussian-vertex -->
**定義の確認**：$q=0$ なら補正因子も指数も1です。$q\ne0$ で $a$ を $a/2$ にすると $C_{0,a}$ は $(1/g)\log2$ 増え、補正因子は $2^{q^2/(2g)}$ 倍になります。これは裸の $e^{iq\phi_a}$ の自己縮約が変わる分を打ち消すための変化であって、物理的な境界からの距離を変更したわけではありません。
<!-- definition-example-end -->

<a id="thm-qft56-dirichlet-vertex"></a>

<!-- formal-statement-start -->
> **定理（Dirichlet境界の頂点一体関数）**  
> $g>0$、$\ell_0>0$、$q\in\mathbb R$ とする。半平面の中心化Gaussian自由bosonに境界値 $\phi(x,0)=0$ を課し、上の円周平均・平面規格化で $V_q^{(\ell_0)}$ を定める。$z=x+iy\in H$ では、$0<a<y$ から $a\to0$ とした極限において

$$
\langle V_q^{(\ell_0)}(x+iy)\rangle_D
=\left(\frac{\ell_0}{2y}\right)^{\Delta_q},
\qquad \Delta_q=\frac{q^2}{2g}.
$$

> 境界値を定数 $\phi_b$ に変えた場合は右辺に $e^{iq\phi_b}$ が掛かる。一般の境界CFTでは一体関数のべきが対称性で固定されても、係数は境界状態と局所場の規格化に依存する。
<!-- formal-statement-end -->

### 証明の見取り図

中心化Gaussianの指数平均には、単一の平滑化場の分散が入ります。円周平均の分散をGreen核の二重積分から求め、平面自己縮約との差を取ります。最後に水平点分離の核とも極限を照合します。

<!-- proof-start -->
### 証明

有限自由度Gaussianを平滑化して取る場合、[Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)を複素ソース $J=iq$ へ拡張すると、中心化共分散 $C$ について $\langle e^{iqX}\rangle=e^{-q^2C/2}$ です。拡張は、実部が有界な複素ソースの各コンパクト集合上でGaussian積分が一様に収束し、両辺が $J$ の整関数で一致することから正当化できます。

まず円周平均の分散を $C^{\mathrm{circ}}_{D,a}(y)=\langle\phi_a(z)^2\rangle_D$ と書きます。Dirichlet核の[鏡像公式](#thm-qft56-dirichlet-image)を二つの円周で平均すると、実源同士の対数には

$$
\frac{1}{(2\pi)^2}\int_0^{2\pi}\!\!\int_0^{2\pi}
\log|ae^{i\vartheta}-ae^{i\varphi}|\,d\vartheta\,d\varphi
=\log a
$$

を使えます。これは $\log|1-re^{i\vartheta}|$ の円周平均が $0$（$0\le r<1$）であることから、可積分な対数特異性を保ったまま $r\uparrow1$ として得られます。

一方、鏡像源同士の距離は中心で $|z-\bar z|=2y$ です。$a<y$ なら各円盤は鏡像の円盤と交わらず、$\log|\zeta-\bar\eta|$ はそれぞれの円盤内で調和的です。そのため平均値性質を二回使ってその平均は $\log(2y)$ です。よって

$$
\begin{aligned}
C^{\mathrm{circ}}_{D,a}(y)
&=-\frac1g\log\frac a{\ell_0}
+\frac1g\log\frac{2y}{\ell_0}
=\frac1g\log\frac{2y}{a},\\
C^{\mathrm{circ}}_{D,a}(y)-C_{0,a}
&=\frac1g\log\frac{2y}{\ell_0}.
\end{aligned}
$$

したがって[境界距離の点分離式](#prop-qft56-point-split-variance)も
$C_{D,a}(y)-C^{\mathrm{circ}}_{D,a}(y)=O(a^2/y^2)\to0$
となり、正則化の違いはこの極限を変えません。ただし**有限 $a$ で両者を同一の分散として扱ってはいけません**。[Gaussian生成公式](../QFT19/index.md#thm-qft19-gaussian)に円周平均の分散を適用すれば

$$
\begin{aligned}
\langle V_q^{(\ell_0)}(z)\rangle_D
&=\lim_{a\to0}\exp\!\left[
-\frac{q^2}{2}\bigl(C^{\mathrm{circ}}_{D,a}(y)-C_{0,a}\bigr)\right]\\
&=\exp\!\left[-\frac{q^2}{2g}\log\frac{2y}{\ell_0}\right].
\end{aligned}
$$

指数をべきに直して $(\ell_0/(2y))^{q^2/(2g)}$ を得ます。定数境界値 $\phi_b$ は $\phi=\phi_b+\widetilde\phi$ と分解でき、$e^{iq\phi}=e^{iq\phi_b}e^{iq\widetilde\phi}$ だから位相だけが追加されます。
<!-- proof-end -->

**規格化定数は残る**：$\ell_0\mapsto\kappa\ell_0$（$\kappa>0$）なら一体関数は $\kappa^{\Delta_q}$ 倍です。一方、$y$ 依存の指数 $-\Delta_q$ は変わりません。したがって「普遍的な指数」と「演算子の規格化に依存する振幅」を混同してはいけません。壁から $y\sim a$ まで近づけば、連続体のべき則をそのまま使う制御も失われます。

## 6. 熱円筒の比：温度とcutoffを同じ式に入れる

境界を持つ帯と、Euclid時間を巻いた熱円筒は異なる幾何です。ここからは境界を外し、無限空間の熱円筒へ戻ります。$\beta>0$ は逆温度、$r>0$ は等Euclid時間の二点間の空間距離です。[QFT55の熱円筒相関](../QFT55/index.md#prop-qft55-thermal-two-point)は、等時刻のスカラー一次場（次元 $\Delta>0$）に対して

$$
G_\beta(r)=\left[\frac{\pi/\beta}{\sinh(\pi r/\beta)}\right]^{2\Delta}
\qquad(r>0,\ \beta>0)
$$

でした。これは挿入点が一致しない式であり、$G_\beta(0)$ は有限ではありません。そこでUV尺度 $a$ で相関を1へ規格化し、**相関の比**だけを観測します。

<a id="prop-qft56-thermal-ratio"></a>

<!-- formal-statement-start -->
> **命題（熱円筒の正規化二点比と尺度極限）**  
> 次元 $\Delta>0$ のスカラー一次場について、[QFT55の熱円筒二点核](../QFT55/index.md#prop-qft55-thermal-two-point)が成り立つとする。$0<a\le r$、$\beta>0$ とし、$R_\beta(r;a):=G_\beta(r)/G_\beta(a)$ と定めると

$$
R_\beta(r;a)=\left[
\frac{\sinh(\pi a/\beta)}{\sinh(\pi r/\beta)}
\right]^{2\Delta}.
$$

> $a\ll r\ll\beta$ では $R_\beta(r;a)\sim(a/r)^{2\Delta}$。$a\ll\beta\ll r$ では

$$
R_\beta(r;a)\sim\left(\frac{2\pi a}{\beta}\right)^{2\Delta}
e^{-2\pi\Delta r/\beta}.
$$

> 固定 $r,\beta$ で $a\mapsto\kappa a$、$a,\kappa a\ll\beta$ とすると、比は先頭で $\kappa^{2\Delta}$ 倍になる。これは相関の規格化点の変更であり、温度の変更ではない。
<!-- formal-statement-end -->

### 証明の見取り図

二点核の共通の係数は比で消えます。残った $\sinh$ の引数を、$a/\beta$、$r/\beta$ が小さいか大きいかに応じて展開します。

<!-- proof-start -->
### 証明

[熱円筒二点核](../QFT55/index.md#prop-qft55-thermal-two-point)の式へ $r$ と $a$ をそれぞれ代入して除すと $(\pi/\beta)^{2\Delta}$ が相殺し、表示の比が得られます。$a/\beta\to0$、$r/\beta\to0$ の領域では $\sinh t=t+O(t^3)$ なので

$$
\frac{\sinh(\pi a/\beta)}{\sinh(\pi r/\beta)}
=\frac{a}{r}\left[1+O\left(\frac{a^2+r^2}{\beta^2}\right)\right].
$$

一方 $r/\beta\to\infty$ では $\sinh(\pi r/\beta)=(e^{\pi r/\beta}/2)(1-e^{-2\pi r/\beta})$ です。分子を $\pi a/\beta+O((a/\beta)^3)$ に置き換えると比は $(2\pi a/\beta)e^{-\pi r/\beta}$ の先頭形になり、$2\Delta$ 乗して命題を得ます。最後に分子の $a$ を $\kappa a$ に置き換え、短距離近似の比を取れば $\kappa^{2\Delta}$ です。
<!-- proof-end -->

**誤読を避ける**：$R_\beta(a;a)=1$ は規格化の定義であって、相関がUVで本当に有限になったという主張ではありません。特に $a\to0$ として $r>0$ を固定すれば $R_\beta(r;a)\to0$ です。規格化点を変えると前置定数が変わる一方、熱的長距離の減衰率 $2\pi\Delta/\beta$ は変わりません。

## 7. 区間のエントロピーへ向かう前に

有限次元の量子系なら、領域 $A$ とその外 $A^c$ のHilbert空間を $\mathcal H_A\otimes\mathcal H_{A^c}$ と因数分解し、全系の状態から領域 $A$ の状態を表す縮約密度行列 $\rho_A$ を作って、その混合度をエントロピーで測る道筋があります。ここではこの領域状態の構成やエントロピーの定義・計算を既習とはせず、後続の課題として残します。

しかし連続場の「一点の演算子」を直ちに各セルの有限次元自由度とみなすと、前節の対数発散を見落とします。局所演算子環の厳密なType IIIの議論は本章の到達目標ではありません。

この章で**計算したもの**は境界Green核、帯の核、点分離自己縮約、頂点一体関数、熱二点関数の比です。**まだ計算していないもの**は、整数 $n\ge2$ に対する $\operatorname{Tr}\rho_A^n$、そこから $n\to1$ への解析接続、区間エントロピーの普遍係数です。後続では、$n$ 枚の被覆とtwist演算子の規格化から、それらを別途導きます。相関の $\log(\ell/a)$ を見ただけでエントロピーの係数 $c/3$（$c$ は中心電荷）を宣言してはいけません。

## 演習：境界の条件を検算し、cutoffの意味を分ける

### 演習 QFT56-A1：作用の係数からGreen方程式へ

- Level: A
- 問題: $g>0$ とし、$S[\phi]=g/(4\pi)\int_\Omega|\nabla\phi|^2d^2z$ を考える。変分の体積項と境界項を求め、$K$ とその逆核が満たす分布方程式の係数を述べよ。境界ではDirichletまたはNeumann条件を課す。

**詳細解答**：[本章のGreen核の定義](#def-qft56-boundary-green)の係数を独立に検算します。$\phi\mapsto\phi+\varepsilon\eta$ として $\varepsilon$ の一次係数を取ると

$$
\delta S=\frac{g}{2\pi}\int_\Omega\nabla\phi\cdot\nabla\eta\,d^2z
=-\frac{g}{2\pi}\int_\Omega(\Delta\phi)\eta\,d^2z
+\frac{g}{2\pi}\int_{\partial\Omega}\eta\,\partial_n\phi\,ds.
$$

Dirichletなら $\eta|_{\partial\Omega}=0$、Neumannなら $\partial_n\phi|_{\partial\Omega}=0$ で境界項が消えます。二次形式は $S=(1/2)\langle\phi,K\phi\rangle$ なので $K=-(g/2\pi)\Delta$、したがって $K_zG(z,w)=\delta^{(2)}(z-w)$ から

$$
-\Delta_zG(z,w)=\frac{2\pi}{g}\delta^{(2)}(z-w).
$$

### 演習 QFT56-A2：Dirichlet核の二つの距離

- Level: A
- 問題: $H$ の $z=i,w=2i$ と $z=i,w=3i$ について、[鏡像公式](#thm-qft56-dirichlet-image)の $G_D$ を求め、壁に接近した $z=x$ で値が零になる理由も書け。

**詳細解答**：前者は $|i-2i|=1$、$|i+2i|=3$ なので $G_D(i,2i)=g^{-1}\log3$。後者は $|i-3i|=2$、$|i+3i|=4$ なので $G_D(i,3i)=g^{-1}\log2$ です。壁の $z=x\in\mathbb R$ では $|x-w|^2=(x-u)^2+v^2=|x-\bar w|^2$ で、比が1だから $\log1=0$ となります。単に値が零だと宣言せず、**壁で二つの距離が等しいこと**を確認します。

### 演習 QFT56-A3：Neumannの法線微分

- Level: A
- 問題: $w=u+iv$（$v>0$）を固定し、$F(z)=\log|z-w|+\log|z-\bar w|$ とする。$z=x+iy$ で $y=0$ の $\partial_nF$ を計算せよ。

**詳細解答**：

$$
\partial_yF=\frac{y-v}{(x-u)^2+(y-v)^2}
+\frac{y+v}{(x-u)^2+(y+v)^2}.
$$

$y=0$ を代入すると $-v/((x-u)^2+v^2)+v/((x-u)^2+v^2)=0$ です。法線 $n=(0,-1)$ なので $\partial_nF=-\partial_yF=0$。従って[Neumann核](#prop-qft56-neumann-image)は壁で法線微分が消えます。$F$ 自身は一般に零でなく、Dirichlet条件の検査とは異なります。

### 演習 QFT56-A4：帯の中央と片側の壁

- Level: A
- 問題: 幅 $W>0$ の帯で $a/W\to0$ とし、$C_{D,W,a}(y)$ の先頭式を $y=W/2$ と $a\ll y\ll W$ に適用せよ。$g>0$ は一定とする。

**詳細解答**：[点分離の命題](#prop-qft56-point-split-variance)に $y=W/2$ を入れると $\sin(\pi/2)=1$ なので

$$
C_{D,W,a}(W/2)\simeq\frac1g\log\frac{2W}{\pi a}.
$$

$a\ll y\ll W$ では $\sin(\pi y/W)\sim\pi y/W$ を代入して

$$
C_{D,W,a}(y)\simeq\frac1g\log\left[
\frac{2W}{\pi a}\frac{\pi y}{W}\right]
=\frac1g\log\frac{2y}{a}.
$$

この近似では $y\gg a$ を保つ必要があり、固定 $a$ で壁へ $y\to0$ とすることはできません。

### 演習 QFT56-A5：熱二点比の短距離

- Level: A
- 問題: $\Delta=1/2$、$0<a<r\ll\beta$ の熱円筒について $a/\beta,r/\beta\to0$ での $R_\beta(r;a)$ の先頭形を求め、$r=4a$ と $r=10a$（いずれも $r\ll\beta$）を比較せよ。

**詳細解答**：[正規化二点比](#prop-qft56-thermal-ratio)で $2\Delta=1$、$\sinh(\pi a/\beta)=(\pi a/\beta)[1+O(a^2/\beta^2)]$、分母にも同じ展開を使うと $R_\beta(r;a)=(a/r)[1+O((a^2+r^2)/\beta^2)]$ です。$r=4a$ で先頭値 $1/4$、$r=10a$ で $1/10$。この二例では $a/r$ を零へ送る必要はなく、$a/\beta\to0$ でそれぞれの値へ近づきます。同じUV規格化点でも距離を大きくすると相関の比が減少します。

### 演習 QFT56-B1：鏡像核の正値と法線方向の非不変性

- Level: B
- 問題: $z=x+iy,w=u+iv$（$y,v>0$、$z\ne w$）とする。Dirichlet核 $G_D(z,w)$ が正であることを距離の平方差から証明せよ。また $z,w$ を共に $it$ だけ上へ移すと核が一般に変わることを説明せよ。$t>0$ とする。

**詳細解答**：距離の平方を直接引けば

$$
|z-\bar w|^2-|z-w|^2
=\bigl((x-u)^2+(y+v)^2\bigr)
-\bigl((x-u)^2+(y-v)^2\bigr)=4yv>0.
$$

したがって $0<|z-w|/|z-\bar w|<1$ なので、[Dirichlet核](#thm-qft56-dirichlet-image)は $-(1/g)\log(\text{比})>0$。平行移動後の実二点距離 $|(z+it)-(w+it)|=|z-w|$ は変わりませんが、鏡像距離の平方差は $4(y+t)(v+t)$ となり元の $4yv$ と異なります。ゆえに核は一般に変わります。なお、二点ごとの $G_D>0$ は**任意の試験関数に対する共分散の正定値性の完全な証明ではありません**。

### 演習 QFT56-B2：有限cutoffでの帯の壁極限

- Level: B
- 問題: $g,W,a>0$、$t=\pi a/(2W)$、$\theta=\pi y/W$、$0<y<W$ とする。$C_{D,W,a}=(1/g)\log[\sqrt{\sinh^2t+\sin^2\theta}/\sinh t]$ について次を示せ。

  1. $y=W/2$ での値を求める。
  2. 固定 $a$ で $y\to0$ とした極限を求める。
  3. まず固定 $y>0$ で $a\to0$ とした極限が異なる理由を述べる。

**詳細解答**：

**1. 中央。** $\theta=\pi/2$ なので分子は $\sqrt{\sinh^2t+1}=\cosh t$。したがって

$$
C_{D,W,a}(W/2)=\frac1g\log\coth t.
$$

**2. 壁。** $a>0$ を固定すれば $t>0$ です。$y\to0$ で $\theta\to0$、$\sin\theta\to0$ なので比は $\sinh t/\sinh t=1$、極限は0です。

**3. UV。** $0<y<W$ を固定して $a\to0$ にすれば $t\to0$ ですが $\sin\theta>0$ は固定です。比は $\sin\theta/t\to\infty$ となり $C_{D,W,a}\to+\infty$。一方 2 では壁のDirichlet条件が先に効いて零でした。両極限を交換すると、$y/a$ が大きいという近似仮定を無断で失います。

### 演習 QFT56-B3：頂点の正規化と壁のべき指数

- Level: B
- 問題: $g=2$、$q=2$、Dirichlet境界値零の半平面を考える。平面規格化の参照長 $\ell_0>0$ を用い、$\Delta_q$ と $\langle V_q^{(\ell_0)}(x+iy)\rangle_D$ を求めよ。次に $\ell_0\to3\ell_0$、$y\to2y$ のそれぞれで何倍になるか求め、両者の意味を区別せよ。

**詳細解答**：[頂点の定義](#def-qft56-gaussian-vertex)から $\Delta_q=q^2/(2g)=4/4=1$。よって[境界一体関数](#thm-qft56-dirichlet-vertex)は

$$
\langle V_2^{(\ell_0)}(x+iy)\rangle_D
=\frac{\ell_0}{2y}.
$$

$\ell_0\to3\ell_0$ では振幅が3倍になります。これは正規順序規格化の変更です。$y\to2y$ では値は $\ell_0/(4y)$ で1/2倍になります。これは**物理的な壁からの距離**の変更です。指数はどちらでも $\Delta_q=1$ のままで、適用は $y$ がUV長より十分大きい範囲です。

### 演習 QFT56-B4：区間端点と熱的比の独立性

- Level: B
- 問題: 区間 $A=[0,\ell]$、点分離 $a>0$、$2a<\ell$ とする。別途、$\Delta=1$ の熱円筒で $\beta>0$、$r>a$ における $R_\beta(r;a)$ を考える。

  1. 端点の円盤が交差しない条件と $a/\ell\ll1$ の追加条件を説明せよ。
  2. $a,r\ll\beta$ で $a\to2a$ とした熱的比の先頭変化を求めよ（$r>2a$ とする）。
  3. これだけで区間エントロピー $S(A)$ を計算したと言えない理由を述べよ。

**詳細解答**：

**1. 幾何。** 中心間距離が $\ell$、各円の半径が $a$ だから交差しない条件は $\ell>2a$。さらに $a/\ell\ll1$ とすると、端点付近の微視的な円と区間全体の長さを別尺度として扱えます。

**2. 相関。** [熱的二点比](#prop-qft56-thermal-ratio)は $a,r\ll\beta$ で $R_\beta(r;a)\sim(a/r)^{2\Delta}=(a/r)^2$。したがって $a\to2a$ で $R_\beta(r;2a)/R_\beta(r;a)\sim4$。これは分母の規格化点を変更した効果です。

**3. 領域状態。** $S(A)$ には領域の縮約状態やレプリカ分配関数が必要で、二点相関の比はその情報を一意に指定しません。壁の境界条件と端点のcutoffも別物であり、$\log(\ell/a)$ の出現だけからエントロピーの係数を決めてはいけません。

### 演習 QFT56-C1：二つの境界と熱を一度に検算する

- Level: C
- 問題: $g=2$、$q=2$ の自由Gaussian bosonを考える。以下は**異なる配置**なので同じ状態の観測値とみなさないこと。

  1. 半平面のDirichlet核で $z=i,w=2i$ とし、Green方程式の源の係数と核の値を求める。
  2. 幅 $W=\pi$ のDirichlet帯で中央 $y=W/2$ の点分離縮約核を、$a/W\ll1$ の先頭項まで求める。
  3. 半平面のDirichlet境界値零で、正規順序の参照長 $\ell_0=1$、点 $z=x+i$ における頂点 $V_q^{(\ell_0)}$ の一体関数を求め、$\ell_0$ を2倍にした場合を比較する。
  4. 別の無限空間熱円筒で次元 $\Delta=1$ のスカラー一次場を取り、$\beta=4\pi$、$r=2\pi$、$a\ll\beta$ として $R_\beta(r;a)$ の先頭式を求める。$r\gg\beta$ での一般の指数減衰率も述べる。
  5. 以上の計算から区間エントロピーの $c/3$ を主張できるか、必要な未実施の操作を挙げて判定する。

**詳細解答**：

**1. 半平面。** $K=-(g/2\pi)\Delta$ から $-\Delta G=(2\pi/g)\delta^{(2)}=\pi\delta^{(2)}$。鏡像点は $\bar w=-2i$ なので $|i-2i|=1$、$|i+2i|=3$。従って[Dirichlet鏡像核](#thm-qft56-dirichlet-image)より

$$
G_D(i,2i)=-\frac12\log\frac13=\frac12\log3.
$$

**2. 帯の中央。** [帯の点分離式](#prop-qft56-point-split-variance)で $\sin(\pi/2)=1$、$g=2$、$W=\pi$ を代入すると

$$
C_{D,W,a}(W/2)=\frac12\log\frac{2\pi}{\pi a}+o(1)
=\frac12\log\frac2a+o(1).
$$

これは $a\ll\min(W/2,W/2)=\pi/2$ の領域での式です。$a$ を長さ単位で測っているため $2/a$ はこの配置で無次元になるよう $W=\pi$ という固定尺度を基準に書いたものです。

**3. 境界頂点。** $\Delta_q=q^2/(2g)=1$ とし、[頂点の一体関数](#thm-qft56-dirichlet-vertex)で $y=1,\ell_0=1$ を代入すると

$$
\langle V_2^{(1)}(x+i)\rangle_D=\frac12.
$$

同じ場と境界距離で正規順序の参照長だけ $\ell_0=2$ に変えると $2/(2\cdot1)=1$ となり2倍です。指数 $\Delta_q=1$ は変わりません。

**4. 熱相関。** [熱的比の式](#prop-qft56-thermal-ratio)で $\pi r/\beta=\pi(2\pi)/(4\pi)=\pi/2$、$\pi a/\beta=a/4$ とするので

$$
R_{4\pi}(2\pi;a)
=\left[\frac{\sinh(a/4)}{\sinh(\pi/2)}\right]^2
\sim\frac{a^2}{16\sinh^2(\pi/2)}.
$$

一般に $r\gg\beta$ では $R_\beta(r;a)\propto e^{-2\pi\Delta r/\beta}$。ここで $\Delta=1,\beta=4\pi$ なら指数は $e^{-r/2}$ です。前置係数の $a$ 依存と指数減衰率を区別します。

**5. 何が不足か。** 半平面のGreen核と熱二点比は二点の縮約情報です。区間エントロピーには、領域 $A$ の正則化された縮約状態、整数 $n$ における $\operatorname{Tr}\rho_A^n$ を表す分岐被覆／twist相関、さらに $n\to1$ の解析接続の仮定が必要です。以上を行っていないので $c/3$ は導かれていません。対数とcutoffが現れたという類似性だけでは不十分です。

## この章で確認したこと

二次元自由bosonのGreen方程式の係数は $2\pi/g$ で、Dirichletの鏡像は**差**、Neumannの鏡像は**和**です。帯へ写すと二つの壁の条件が保たれ、点分離自己縮約には $\log(2y/a)$ または $\log[(2W/(\pi a))\sin(\pi y/W)]$ が現れます。Dirichlet頂点一体関数の距離指数は $q^2/(2g)$ と定まりますが、正規順序の参照長は振幅に残ります。熱円筒の相関比にも短距離のべきと長距離の指数減衰が現れ、cutoffの変更と温度の変更は別です。

次は有限次元の領域密度行列からレプリカの整数 $n$ を作る道筋を確認し、端点のcutoffが区間エントロピーへどのように入るかを証明・計算していきます。


