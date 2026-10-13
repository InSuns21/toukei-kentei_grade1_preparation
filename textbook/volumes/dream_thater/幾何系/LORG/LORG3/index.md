# LORG3 因果曲線とLorentz長さ

<!-- definition-example-audit: strict -->

## 1. 未来向きのベクトルを、曲線へつなぐ

[LORG1の未来錐](../LORG1/index.md#def-lorg1-future-cone)は一つの接空間の方向を分類し、[LORG2の時間向き](../LORG2/index.md#def-lorg2-time-orientation)は点が変わっても未来を選ぶ方法を与えました。しかし、時空の二点を結ぶ曲線が「未来へ進む」かどうかは、曲線の各点の**速度ベクトル**が未来錐に入るかを検査しなければ決まりません。

また、[Riemann曲線の長さ](../../GEO/GEO12/index.md#def-geo12-length-energy)は速度の正の二乗から作りましたが、Lorentz計量では未来向き時間的ベクトルの二乗が負です。長さの根号には符号を反転した量を使います。すると光に沿った曲線の長さは零になり、長さの比較もRiemann幾何と逆向きになります。

本章の問いは、**どの曲線を許すか、固有時をどう積分するか、曲線の速さの付け直しで結果は変わらないか**です。局所的な測地線の最大化は、接続と正規近傍を準備した後に調べます。

以下、断らない限り $(M,g)$ は滑らかな連結・Hausdorff・第二可算な境界なしの時間向き付きLorentz多様体（次元 $n+1$、$n\ge1$、符号 $(-,+,\ldots,+)$）とします。

## 2. 区分的に滑らかな未来向き曲線

ここでは各時点の速度が未来錐の外へ出ない道筋を考えます。まず区間 $[a,b]$ を有限分割し、各小区間では通常の微分で速度を追える曲線を考えます。角がある折れ線も扱えますが、角の一点で左右の微分が一致する必要はありません。速度が零になる「停止」も許しておくと、パラメータの取り方に柔軟性が生まれます。

<a id="def-lorg3-causal-curve"></a>

<!-- formal-statement-start -->
> **定義（区分的 $C^1$ 因果曲線・時間的曲線・光的曲線）**  
> 時間向き付きLorentz多様体 $(M,g)$ と $a<b$ に対し、連続写像 $\gamma:[a,b]\to M$ が **区分的 $C^1$** であるとは、有限分割
>
$$
a=s_0<s_1<\cdots<s_N=b
$$
>
> があり、各閉小区間への制限が $C^1$ で、端点で片側微分を持つことをいう。各開小区間のすべての $s$ で $\dot\gamma(s)$ が零または非零の未来向き因果ベクトルであるとき、$\gamma$ を **未来向き因果曲線**という。各開小区間のすべての $s$ で $\dot\gamma(s)$ が未来向き時間的なら **未来向き時間的曲線**、零または未来向き光的なら **未来向き光的曲線**という。過去向きは未来を過去に置き換えて定める。定数曲線は退化した因果曲線として許し、二点間の非自明な移動を述べるときは定数曲線を除く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg3-causal-curve -->
**定義の確認**。$1+1$ 次元Minkowski時空の計量を $\eta=-dt^2+dx^2$、未来を $t$ 増加方向とします。

$$
\gamma(s)=(2s,s),\qquad 0\le s\le1
$$

なら $\dot\gamma=(2,1)$、$\eta(\dot\gamma,\dot\gamma)=-4+1=-3<0$、時間成分 $2>0$ なので未来向き時間的です。$\lambda(s)=(s,s)$ は $\dot\lambda=(1,1)$ で自己二乗 $-1+1=0$、時間成分は正なので未来向き光的です。$\sigma(s)=(s,2s)$ は自己二乗 $-1+4=3>0$ であり、時間成分が正でも因果曲線ではありません。$\gamma$ を逆にたどる曲線 $\gamma(1-s)$ は過去向きになります。
<!-- definition-example-end -->

曲線に沿って[LORG2の大域時間的場による未来判定](../LORG2/index.md#cor-lorg2-global-future-test)を使うと、非零の因果的速度について $g(T,\dot\gamma)<0$ かどうかで向きを検査できます。**時間成分が正なら未来**という単純な判定は、未来を $\partial_t$ で選んだMinkowski座標の例に限ります。

### 2.1 なぜ角を許すのか

$\gamma_1(s)=(s,0)$（$0\le s\le1$）の終点と、そこから $\gamma_2(s)=(1+s,s/2)$（$0\le s\le1$）の始点をつなぐと、$s=1$ に角が生じます。二つの速度は $(1,0)$ と $(1,1/2)$ でいずれも未来向き時間的ですが、角の一点には単一の速度がありません。区分的 $C^1$ の定義なら、この自然な連結曲線を含められます。

曲線が区分的 $C^1$ の各小区間で因果的かどうかを検査するとき、両側の端点速度を一致させる必要はありません。ただし**有限分割**という仮定は残します。任意の連続曲線を微分可能な因果曲線とみなすわけではありません。

## 3. Lorentz長さと固有時

時間的速度の自己二乗は負なので、その符号を反転した非負量を積分します。時間的世界線を動く観測者の時計が刻む時間に対応する量を「固有時」と呼びます。光的世界線ではその量が零になることも、同じ式に含まれます。

<a id="def-lorg3-lorentz-length"></a>

<!-- formal-statement-start -->
> **定義（因果曲線のLorentz長さ・固有時）**  
> 時間向き付きLorentz多様体 $(M,g)$ 上の区分的 $C^1$ 未来向き因果曲線 $\gamma:[a,b]\to M$ と、定義に用いた有限分割 $a=s_0<\cdots<s_N=b$ に対し、**Lorentz長さ**を
>
$$
L_g(\gamma)=\sum_{j=1}^{N}
\int_{s_{j-1}}^{s_j}
\sqrt{-g_{\gamma(s)}(\dot\gamma(s),\dot\gamma(s))}\,ds
$$
>
> と定義する。零速度での被積分関数は零とする。未来向き時間的曲線の場合は、その曲線に沿う**固有時**とも呼ぶ。区分ごとの片側微分で値を定めるので、有限個の分割端点での速度は積分値に影響しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lorg3-lorentz-length -->
**定義の確認**。先ほどの時間的直線 $\gamma(s)=(2s,s)$ では

$$
L_\eta(\gamma)=\int_0^1\sqrt{4-1}\,ds=\sqrt3.
$$

光的直線 $\lambda(s)=(s,s)$ では $\sqrt{-\eta(\dot\lambda,\dot\lambda)}=0$ なので $L_\eta(\lambda)=0$ です。どちらも非定数曲線ですが、後者のLorentz長さは正ではありません。空間的な $\sigma(s)=(s,2s)$ には**この因果曲線用の定義を適用しません**。
<!-- definition-example-end -->

長さが積分として一貫しているために、分割の取り直しと曲線の連結に対する性質を確認しましょう。

<a id="prop-lorg3-length-additivity"></a>

<!-- formal-statement-start -->
> **命題（Lorentz長さの非負性・分割独立性・加法性）**  
> $(M,g)$ を時間向き付きLorentz多様体とし、$\gamma:[a,b]\to M$ を区分的 $C^1$ 未来向き因果曲線とする。このとき $L_g(\gamma)$ は有限で非負であり、許容分割の選択によらない。$a<c<b$ に対して両制限曲線を考えると
>
$$
L_g(\gamma)=L_g(\gamma|_{[a,c]})+L_g(\gamma|_{[c,b]}).
$$
>
> さらに区分ごとの速度がすべて光的または零なら長さは零である。逆に長さが零なら、各滑らかな開小区間のすべての点で速度は光的または零である。
<!-- formal-statement-end -->

### 証明の見取り図

各区分では速度・計量・平方根が連続で被積分関数は非負です。分割点の追加は定積分を二つに分けるだけです。「零長さなら光的」の方向では、**連続な非負関数の積分が零なら、その関数は各点で零**であることを使います。

<!-- proof-start -->
### 証明

各閉小区間で $\dot\gamma$ は片側端点まで連続、$g$ も滑らかなので

$$
f(s)=\sqrt{-g_{\gamma(s)}(\dot\gamma(s),\dot\gamma(s))}
$$

はその区間で連続です。因果的条件から根号内は非負であり、コンパクトな小区間上で $f$ は有界です。従って各定積分は有限かつ非負です。

二つの許容分割を合わせた共通細分を考えます。細分点 $c$ を一つ加えるたびに、連続関数の定積分の加法性により

$$
\int_u^v f(s)\,ds
=\int_u^c f(s)\,ds+\int_c^v f(s)\,ds
$$

です。よって共通細分で計算した長さはどちらの元の分割での長さにも一致し、分割に依存しません。$c$ を分割点へ加えると、同じ等式が二つの制限曲線について成り立ち、加法性を得ます。

各区分の速度が光的または零なら $g(\dot\gamma,\dot\gamma)=0$ なので $f=0$、全区分の積分は零です。逆に $L_g(\gamma)=0$ と仮定すると、有限個の非負積分の和が零だから各積分は零です。ある滑らかな区間の内部に $f(s_*)>0$ の点があれば、連続性によりその点の近傍では $f(s)\ge f(s_*)/2>0$ となり積分が正になります。これは矛盾なので全内部で $f=0$、すなわち $g(\dot\gamma,\dot\gamma)=0$ です。因果的条件からその速度は光的または零です。$\square$
<!-- proof-end -->

光的曲線が「動いていない」という意味ではありません。$h=dt^2+dx^2$ という補助Riemann計量で[Riemann計量による長さを定義](../../GEO/GEO12/index.md#def-geo12-length-energy)すると、同じ $\lambda(s)=(s,s)$ の長さは

$$
L_h(\lambda)=\int_0^1\sqrt{1+1}\,ds=\sqrt2,
\qquad L_\eta(\lambda)=0.
$$

**Riemann長さは正、Lorentz長さは零**です。Riemann計量の長さを固有時と読み替えることはできません。

## 4. パラメータを付け直しても固有時は同じ

曲線を同じ向きに同じ順番でたどり、途中の「進む速さ」だけを変えてみます。積分の値が変わってしまうなら固有時は曲線自身の量とは呼べません。これを連鎖律と変数変換から導きます。

<a id="thm-lorg3-reparam-invariance"></a>

<!-- formal-statement-start -->
> **定理（Lorentz長さの向き保存再パラメータ化不変性）**  
> $(M,g)$ を時間向き付きLorentz多様体とする。$\gamma:[a,b]\to M$ を区分的 $C^1$ 未来向き因果曲線とし、$\phi:[c,d]\to[a,b]$ を $\phi(c)=a,\ \phi(d)=b$ を満たす向き保存の区分的 $C^1$ 全単射とする。各滑らかな開小区間で $\phi'(u)>0$、かつ $\gamma\circ\phi$ が区分的 $C^1$ となるものとする。このとき $\widetilde\gamma=\gamma\circ\phi$ も未来向き因果曲線で、
>
$$
L_g(\gamma\circ\phi)=L_g(\gamma).
$$
<!-- formal-statement-end -->

### 証明の見取り図

速度には連鎖律で $\phi'(u)$ が掛かり、計量の二次性のため長さの被積分関数には $|\phi'(u)|$ が掛かります。向きを保存するので絶対値を外し、$s=\phi(u)$ と変数変換します。

<!-- proof-start -->
### 証明

$\gamma$ と $\phi$ の分割点および $\gamma$ の分割点の $\phi$ による逆像を合わせて有限分割を作ります。各滑らかな小区間で連鎖律により

$$
\frac{d}{du}\widetilde\gamma(u)
=\dot\gamma(\phi(u))\,\phi'(u).
$$

$\phi'(u)>0$ なので、[未来錐の正のスカラー倍に関する閉性](../LORG1/index.md#prop-lorg1-cone-convex)から速度は零または未来向き因果のままです。また計量の双線形性から

$$
\begin{aligned}
-g_{\widetilde\gamma(u)}
(\widetilde\gamma'(u),\widetilde\gamma'(u))
&=-g_{\gamma(\phi(u))}
(\dot\gamma(\phi(u))\phi'(u),\dot\gamma(\phi(u))\phi'(u))\\
&=(\phi'(u))^2
\bigl[-g_{\gamma(\phi(u))}
(\dot\gamma(\phi(u)),\dot\gamma(\phi(u)))\bigr].
\end{aligned}
$$

よって平方根を取ると

$$
\sqrt{-g(\widetilde\gamma',\widetilde\gamma')}
=\phi'(u)\sqrt{-g(\dot\gamma(\phi(u)),\dot\gamma(\phi(u)))}.
$$

各細分区間で $s=\phi(u)$ と置換すると $ds=\phi'(u)\,du$ です。端点も順序どおり対応するから

$$
\begin{aligned}
L_g(\widetilde\gamma)
&=\int_c^d\phi'(u)
 \sqrt{-g_{\gamma(\phi(u))}(\dot\gamma(\phi(u)),\dot\gamma(\phi(u)))}\,du\\
&=\int_a^b\sqrt{-g_{\gamma(s)}(\dot\gamma(s),\dot\gamma(s))}\,ds
=L_g(\gamma).
\end{aligned}
$$

各積分は実際には有限区分の和であり、[分割独立性](#prop-lorg3-length-additivity)から書き方によらず同じ値です。$\square$
<!-- proof-end -->

**速度を変える具体例**。$\gamma(s)=(2s,s)$（$0\le s\le1$）を $\phi(u)=2u$（$0\le u\le1/2$）で付け直すと

$$
\widetilde\gamma(u)=(4u,2u),\qquad
L_\eta(\widetilde\gamma)
=\int_0^{1/2}\sqrt{16-4}\,du
=\frac12\sqrt{12}=\sqrt3.
$$

同じ経路を逆向きにたどると $|\phi'|$ を使った**数値としての積分値**は同じですが、未来向きではなく**過去向き**になります。向き保存という条件は長さの値のためだけではなく、未来向き曲線という種類を維持するためにも必要です。

## 5. Minkowski時空での長さの比較

Riemann幾何では直線が最短という直感を持ちます。しかしLorentz幾何では、**未来向き因果曲線の間で直線がむしろ固有時を最大にする**という逆向きの現象が現れます。一般の曲がった時空について無条件に主張しているのではなく、まず計量が一定のMinkowski時空で確かめます。

<a id="thm-lorg3-minkowski-length-bound"></a>

<!-- formal-statement-start -->
> **定理（Minkowski時空における端点とLorentz長さ）**  
> $\mathbb R^{1+n}$ に $\eta=-dt^2+\sum_{i=1}^n(dx^i)^2$ と標準未来向きを与える。$p=(t_0,\mathbf x_0)$ から $q=(t_1,\mathbf x_1)$ へ向かう区分的 $C^1$ 未来向き因果曲線 $\gamma$ があるなら、$\Delta=(t_1-t_0,\mathbf x_1-\mathbf x_0)$ は零または未来向き因果ベクトルであり、
>
$$
0\le L_\eta(\gamma)\le
\sqrt{(t_1-t_0)^2-\|\mathbf x_1-\mathbf x_0\|^2}.
$$
>
> さらに $\Delta$ が非零因果ベクトルなら、直線曲線 $\ell(u)=p+u\Delta$（$0\le u\le1$）は未来向き因果曲線で、右辺に等しい長さを持つ。特に端点差が光的なら、そこを結ぶすべての未来向き因果曲線のLorentz長さは零である。
<!-- formal-statement-end -->

### 証明の見取り図

未来向き速度は各点で閉未来錐にあります。[LORG1の未来錐の凸性と逆三角不等式](../LORG1/index.md#cor-lorg1-reverse-triangle)を細かな折れ線の速度和に適用します。有限和の不等式から積分の不等式へ移る部分を省略しないことが核心です。

<!-- proof-start -->
### 証明

$\gamma(s)=(t(s),\mathbf x(s))$ と書きます。滑らかな区間で速度が未来向き因果または零である条件は

$$
t'(s)\ge\|\mathbf x'(s)\|\ge0.
$$

各区間で積分し、全区間で足せば

$$
\begin{aligned}
\Delta t&=\int_a^b t'(s)\,ds
\ge\int_a^b\|\mathbf x'(s)\|\,ds\\
&\ge\left\|\int_a^b\mathbf x'(s)\,ds\right\|
=\|\Delta\mathbf x\|.
\end{aligned}
$$

最後の不等式はEuclidノルムの積分三角不等式であり、座標ごとの積分を取っても成り立ちます。従って $\Delta$ は零または未来向き因果です。

次に未来向き因果ベクトルまたは零に対して $\tau(v)=\sqrt{-\eta(v,v)}$ と置きます。[LORG1の逆三角不等式](../LORG1/index.md#cor-lorg1-reverse-triangle)は、非負係数を掛けた未来向き因果ベクトルの有限和にも繰り返し適用でき、

$$
\sum_{k=1}^m\tau(w_k)\le\tau\left(\sum_{k=1}^m w_k\right)
$$

です（零項では $\tau(0)=0$ と定めます）。$\gamma$ の各滑らかな区間を細分し、細分小区間 $I_k$ から点 $\xi_k$ を選んで $w_k=|I_k|\dot\gamma(\xi_k)$ とします。各 $w_k$ は未来錐または零に入るので、

$$
\sum_k |I_k|\tau(\dot\gamma(\xi_k))
\le\tau\left(\sum_k |I_k|\dot\gamma(\xi_k)\right).
$$

区分ごとに速度は連続です。細分幅を零にすると左辺は $L_\eta(\gamma)$ のRiemann和に収束し、右辺の括弧内は

$$
\int_a^b\dot\gamma(s)\,ds
=\gamma(b)-\gamma(a)=\Delta
$$

へ収束します。$\tau$ は閉未来錐上で連続なので、右辺も $\tau(\Delta)$ へ収束します。これで $L_\eta(\gamma)\le\tau(\Delta)$ を得ます。

$\Delta\ne0$ のとき $\ell'(u)=\Delta$ であり、その因果型と未来向きは既に示しました。従って

$$
L_\eta(\ell)=\int_0^1\sqrt{-\eta(\Delta,\Delta)}\,du
=\tau(\Delta).
$$

$\Delta$ が非零光的なら $\tau(\Delta)=0$ です。最初の不等式と非負性から、どの未来向き因果曲線も長さは零です。$\square$
<!-- proof-end -->

**折れ線の検算**。$(0,0)$ から $(2,0)$ を結ぶ未来向き時間的折れ線として、前半 $(0,0)\to(1,1/2)$、後半 $(1,1/2)\to(2,0)$ を考えます。それぞれの長さは $\sqrt{1-1/4}=\sqrt3/2$ なので、折れ線全体は $\sqrt3$。直線 $(0,0)\to(2,0)$ は長さ $2$ で、

$$
\sqrt3<2.
$$

時間的世界線に沿う固有時は、空間的な寄り道で増えるとは限らず、この例では減ります。

**何がまだ言えないか**。この証明は一定の計量 $\eta$ を持つMinkowski時空で速度ベクトルを**異なる点同士でも同じベクトル空間で足せる**ことに依存しています。一般のLorentz多様体の異なる接空間をそのまま足すことはできません。[GEOのRiemann最短路理論](../../GEO/GEO12/index.md#def-geo12-distance)を流用して大域的最大化を主張することもできません。接続と正規近傍を導入した後に、**局所**最大化が成立する条件を調べます。

## 6. 演習

各問では別記しない限り $\eta=-dt^2+dx^2$、未来向きを $\partial_t$ 側とし、曲線は指定した区間上で考えます。結論には速度の因果型と向きの判定も含めてください。

### Level A

<a id="ex-lorg3-a01"></a>
#### LORG3-A01 速度の因果型と長さ
- Level: A

$\gamma(s)=(3s,2s)$（$0\le s\le2$）が未来向き時間的であることを確認し、Lorentz長さを求めよ。

<!-- solution-start -->
**詳細解答**。速度は $(3,2)$、自己二乗は $-9+4=-5<0$、時間成分は $3>0$ です。従って[因果曲線の定義](#def-lorg3-causal-curve)を満たし、

$$
L_\eta(\gamma)=\int_0^2\sqrt{-(-5)}\,ds
=2\sqrt5.
$$

積分区間の長さは $2$ なので、速度の固有時ノルム $\sqrt5$ を一度だけ書いて終わりにしないことが重要です。
<!-- solution-end -->

<a id="ex-lorg3-a02"></a>
#### LORG3-A02 光的なのに移動する
- Level: A

$\lambda(s)=(s, -s)$（$0\le s\le3$）の因果型、Lorentz長さ、補助Euclid計量 $h=dt^2+dx^2$ による長さを求めよ。

<!-- solution-start -->
**詳細解答**。速度は $(1,-1)$ で $\eta(\dot\lambda,\dot\lambda)=-1+1=0$、時間成分 $1>0$ なので未来向き光的です。[Lorentz長さの定義](#def-lorg3-lorentz-length)から

$$
L_\eta(\lambda)=\int_0^3\sqrt0\,ds=0.
$$

一方、$h(\dot\lambda,\dot\lambda)=1+1=2$ なので

$$
L_h(\lambda)=\int_0^3\sqrt2\,ds=3\sqrt2.
$$

時空の中で終点 $(3,-3)$ まで移動しても、光的速度に沿った固有時は零です。
<!-- solution-end -->

<a id="ex-lorg3-a03"></a>
#### LORG3-A03 向きを保つ付け直し
- Level: A

$\gamma(s)=(2s,s)$（$0\le s\le1$）に $\phi(u)=u/3$（$0\le u\le3$）を合成せよ。両方の長さを別々に積分し、未来向きが維持されることも確認せよ。

<!-- solution-start -->
**詳細解答**。合成後は $\widetilde\gamma(u)=(2u/3,u/3)$、速度は $(2/3,1/3)$ で

$$
\eta(\widetilde\gamma',\widetilde\gamma')=-\frac49+\frac19=-\frac13<0.
$$

時間成分が正で未来向きです。従って

$$
L_\eta(\widetilde\gamma)=\int_0^3\frac1{\sqrt3}\,du
=\sqrt3.
$$

元の曲線では $L_\eta(\gamma)=\int_0^1\sqrt{4-1}\,ds=\sqrt3$ です。$\phi'(u)=1/3>0$ であることが[再パラメータ化定理](#thm-lorg3-reparam-invariance)の条件に対応します。
<!-- solution-end -->

<a id="ex-lorg3-a04"></a>
#### LORG3-A04 因果的ではない速度
- Level: A

$\sigma(s)=(s,2s)$（$0\le s\le1$）について、未来向き因果曲線か判定せよ。計量の自己二乗に単純に負号を付けて平方根を取る手順が使えない理由を説明せよ。

<!-- solution-start -->
**詳細解答**。$\dot\sigma=(1,2)$ で $\eta(\dot\sigma,\dot\sigma)=-1+4=3>0$ です。空間的なので、時間成分 $1>0$ であっても[未来向き因果曲線の定義](#def-lorg3-causal-curve)を満たしません。[Lorentz長さ](#def-lorg3-lorentz-length)は因果曲線に対して定義した実数値積分です。ここで $-\eta(\dot\sigma,\dot\sigma)=-3$ となり、実数の平方根は定義されません。誤りは単なる符号ミスではなく、**適用できる曲線の仮定を落としたこと**です。
<!-- solution-end -->

<a id="ex-lorg3-a05"></a>
#### LORG3-A05 連結で長さが加わる
- Level: A

$0\le s\le2$ で、$0\le s\le1$ なら $\gamma(s)=(s,0)$、$1\le s\le2$ なら $\gamma(s)=(s,(s-1)/2)$ と定める。曲線の連続性、因果型、二つの区間の長さと全長を確認せよ。

<!-- solution-start -->
**詳細解答**。分割点 $s=1$ で両式とも $(1,0)$ となり連続です。前半の速度 $(1,0)$ は自己二乗 $-1$、後半の速度 $(1,1/2)$ は自己二乗 $-1+1/4=-3/4$ で、ともに時間成分が正なので区分的 $C^1$ 未来向き時間的です。長さは順に

$$
L_1=\int_0^1 1\,ds=1,\qquad
L_2=\int_1^2\sqrt{\frac34}\,ds=\frac{\sqrt3}{2}.
$$

[長さの加法性](#prop-lorg3-length-additivity)から全長は $1+\sqrt3/2$ です。角で速度が一致しなくても、その一点は積分に影響しません。
<!-- solution-end -->

### Level B

<a id="ex-lorg3-b01"></a>
#### LORG3-B01 折れ線と直線の固有時
- Level: B

$p=(0,0)$ と $q=(4,0)$ を結ぶ折れ線 $p\to(2,1)\to q$ を各辺で線形にたどる。未来向き因果性と長さを検算し、$p$ と $q$ を結ぶ直線との大小を証明せよ。

<!-- solution-start -->
**詳細解答**。第一辺の差は $(2,1)$、第二辺の差は $(2,-1)$ です。各辺を $u\in[0,1]$ で線形にたどると速度の自己二乗はともに $-4+1=-3<0$、時間成分は $2>0$ なので未来向き時間的です。各辺の長さは

$$
\int_0^1\sqrt3\,du=\sqrt3
$$

であり、[加法性](#prop-lorg3-length-additivity)から折れ線は $2\sqrt3$ です。直線 $\ell(u)=(4u,0)$ の長さは

$$
L_\eta(\ell)=\int_0^1\sqrt{16}\,du=4.
$$

$2\sqrt3<4$ は両辺正で、平方すると $12<16$ なので従います。この場合は[Minkowski時空における端点とLorentz長さ](#thm-lorg3-minkowski-length-bound)が上限 $4$ を与え、実計算でも厳密な不等号を得ました。
<!-- solution-end -->

<a id="ex-lorg3-b02"></a>
#### LORG3-B02 曲がった計量でも積分を定義できる
- Level: B

$M=\{(t,x)\in\mathbb R^2:t>-1\}$、$g=-dt^2+(1+t)^2dx^2$ とし、$\partial_t$ 側を未来とする。

1. $\gamma(s)=(s,0)$（$0\le s\le1$）の固有時を求めよ。
2. $\lambda(s)=(s,\log(1+s))$（$0\le s\le1$）が未来向き光的で長さ零であることを直接確認せよ。

<!-- solution-start -->
**詳細解答**。$1+t>0$ だから係数行列 $\operatorname{diag}(-1,(1+t)^2)$ はすべての点で非退化、負方向が一本です。[Lorentz計量の定義](../LORG2/index.md#def-lorg2-lorentz-metric)を満たします。

$\gamma'(s)=(1,0)$ について $g(\gamma',\gamma')=-1<0$、また未来向きなので

$$
L_g(\gamma)=\int_0^1\sqrt1\,ds=1.
$$

$\lambda'(s)=(1,1/(1+s))$ を $\lambda(s)$ で評価すると

$$
g_{\lambda(s)}(\lambda',\lambda')
=-1+(1+s)^2\frac1{(1+s)^2}=0.
$$

$\partial_t$ と速度の内積は $g(\partial_t,\lambda')=-1<0$ です。[未来判定](../LORG2/index.md#cor-lorg2-global-future-test)より非零の光的速度は未来向きで、

$$
L_g(\lambda)=\int_0^1\sqrt0\,ds=0.
$$

座標上の空間速度は一定でなくても、**評価点の計量係数と組にして**因果型を確定できます。
<!-- solution-end -->

<a id="ex-lorg3-b03"></a>
#### LORG3-B03 光的端点差の制約
- Level: B

$1+1$ 次元Minkowski時空の $p=(0,0)$、$q=(2,2)$ を結ぶ区分的 $C^1$ 未来向き因果曲線 $\gamma(s)=(t(s),x(s))$ があるとする。(1) $L_\eta(\gamma)$ を決定せよ。(2) 各滑らかな区間で $t'(s)=x'(s)\ge0$ が成立することを示せ。

<!-- solution-start -->
**詳細解答**。端点差は $(2,2)$ で自己二乗 $-4+4=0$、未来向き光的です。[Minkowski時空における端点とLorentz長さ](#thm-lorg3-minkowski-length-bound)から

$$
0\le L_\eta(\gamma)\le\sqrt{4-4}=0,
$$

よって $L_\eta(\gamma)=0$ です。

未来向き因果速度の条件は $t'\ge|x'|$ です。したがって $t'-x'\ge0$ であり、区分ごとに積分すると

$$
\int_a^b(t'(s)-x'(s))\,ds
=(t(b)-t(a))-(x(b)-x(a))=2-2=0.
$$

被積分関数は区分ごとに連続で非負です。どこかで正なら近傍で積分が正となるので、すべての滑らかな内部点で $t'-x'=0$ です。さらに $t'\ge|x'|$ と $t'=x'$ から $x'=t'\ge0$ です。端点差が光的であるとき、折れ線が空間方向へ寄り道する余地がないことまで分かります。
<!-- solution-end -->

### Level C

<a id="ex-lorg3-c01"></a>
#### LORG3-C01 速度が変化する時間的世界線
- Level: C

$1+1$ 次元Minkowski時空で $\gamma:[0,1]\to\mathbb R^2$ を

$$
\gamma(s)=(\sinh s,\cosh s-1)
$$

と定める。

1. 未来向き時間的曲線であることと固有時が $1$ であることを示せ。
2. 同じ端点を結ぶ直線のLorentz長さが $2\sinh(1/2)$ であることを導け。
3. $2\sinh(1/2)>1$ を証明し、両曲線の長さが異なる理由を説明せよ。

<!-- solution-start -->
**詳細解答**。微分すると

$$
\dot\gamma(s)=(\cosh s,\sinh s)
$$

です。双曲関数の恒等式 $\cosh^2s-\sinh^2s=1$ から

$$
\eta(\dot\gamma,\dot\gamma)
=-\cosh^2s+\sinh^2s=-1.
$$

$\cosh s>0$ なので未来向き時間的です。[Lorentz長さの定義](#def-lorg3-lorentz-length)より

$$
L_\eta(\gamma)=\int_0^1\sqrt1\,ds=1.
$$

端点は $\gamma(0)=(0,0)$、$\gamma(1)=(\sinh1,\cosh1-1)$ です。$\Delta$ の固有時ノルムの二乗を展開すると

$$
\begin{aligned}
-\eta(\Delta,\Delta)
&=\sinh^2 1-(\cosh1-1)^2\\
&=(\cosh^2 1-1)-(\cosh^2 1-2\cosh1+1)\\
&=2(\cosh1-1)
=4\sinh^2(1/2).
\end{aligned}
$$

最後は $\cosh1-1=2\sinh^2(1/2)$ によります。$\Delta t=\sinh1>0$ で上式も正なので $\Delta$ は未来向き時間的です。[端点差に対する直線の等号成立](#thm-lorg3-minkowski-length-bound)により、直線の長さは $2\sinh(1/2)$ です。

$z>0$ では $\sinh z-z$ の微分は $\cosh z-1>0$ で、$z=0$ で差は零です。よって $\sinh(1/2)>1/2$、従って

$$
2\sinh(1/2)>1=L_\eta(\gamma).
$$

$\gamma$ の速度の時間成分・空間成分は $s$ に依存して変わり、直線の一定速度とは異なります。Minkowski時空では[逆三角不等式](../LORG1/index.md#cor-lorg1-reverse-triangle)の積分版により直線が上限を与えます。一般のLorentz計量について、同じ端点だけを使ってこの公式を適用することはできません。
<!-- solution-end -->

## 7. 次に何を調べるか

本章で、因果曲線は「各点の速度が未来錐に入る」曲線、Lorentz長さはその速度の負の自己二乗の平方根を積分した量として定義できました。光的曲線の長さは零で、向き保存の再パラメータ化では長さは変わりません。Minkowski時空では直線が端点を結ぶ未来向き因果曲線の長さの上限を達成します。

しかし一般の時空では、異なる接空間の速度を直接足せません。次章でLorentz計量から接続・測地線を構成し、さらに正規近傍を使って「どの範囲で固有時の最大化が成立するか」を定式化します。
