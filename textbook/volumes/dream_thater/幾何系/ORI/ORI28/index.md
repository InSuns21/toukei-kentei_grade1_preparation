# ORI28 曲線折りと可展曲面

<!-- definition-example-audit: strict -->

[ORI27 の Miura 折り](../ORI27/index.md#thm-ori27-rigid-motion)では、平面の四角形を硬いまま保ち、直線の折り目をヒンジとして動かしました。しかし、紙を曲線に沿って折ると、折り目の左右はそれぞれ**曲がった面**になります。四角形の剛体運動だけでは、面内の距離が守られているか判定できません。

そこで [GEO10 の第一基本形式](../../GEO/GEO10/index.md#def-geo10-first-fundamental-form)で紙の長さを測り、[GEO11 の Gauss の驚異の定理](../../GEO/GEO11/index.md#thm-geo11-egregium)と [GEO19 の測地曲率](../../GEO/GEO19/index.md#def-geo19-kg)を用いて、折り目の形と左右の面の整合性を調べます。

この講では次の問いに答えます。

1. 紙を伸ばさずに曲げた面は、どの曲率条件を満たすか。
2. 直線の集まりでできた面なら、必ず平らに展開できるか。
3. 平面上の曲線と空間内の折り目の曲率は、折り角とどう結び付くか。
4. 曲線に沿った折りが**本当に存在する**具体例を、座標から作れるか。
5. 局所的な計算で、閉じた紙や厚さのある工作物まで保証できるか。

以下では、厚さ0、引き伸ばしなし、曲げエネルギー・駆動力なしの幾何模型を考えます。微分可能性は必要箇所で明記し、角度はラジアンで扱います。

## 1. 曲線の左右で、同じ紙の長さを保つ

平面の紙に滑らかな曲線 $\Gamma$ を描き、その片側を $D_+$、反対側を $D_-$ とします。紙を空間へ置く写像を $F_+$ と $F_-$ に分けて考えます。折り目上では両者の位置が一致しますが、**接平面**は一致しなくても構いません。ここが一枚の滑らかな曲面と異なる点です。

各側の接ベクトル $v,w$ の内積を保つという条件は、[第一基本形式](../../GEO/GEO10/index.md#def-geo10-first-fundamental-form)を保つことです。平面の座標 $x=(x^1,x^2)$ で記せば、各側の微分 $dF_\pm$ について

$$
\langle dF_\pm(v),dF_\pm(w)\rangle_{\mathbb R^3}
=\langle v,w\rangle_{\mathbb R^2}
$$

を要求します。内積を保存すれば長さと角度はともに保存されます。一方、折り目をまたぐ微分の連続性は要求しません。

<a id="def-ori28-curved-crease"></a>
<!-- formal-statement-start -->
> **定義（滑らかな曲線折り模型）**  
> 平面の開集合 $D\subset\mathbb R^2$ を正則な $C^2$ 曲線 $\Gamma$ が局所的に二側 $D_+,D_-$ に分けるとする。各 $F_\pm:D_\pm\cup\Gamma\to\mathbb R^3$ はそれぞれの側から境界まで $C^2$ に延長し、内部で正則な局所等長な曲面表示とする。さらに $\Gamma$ 上で $F_+=F_-$ とする。この組を **滑らかな曲線折り模型**という。折り目の像は $C=F_\pm(\Gamma)$ である。大域的単射性および非貫通性は、この定義とは別に確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ori28-curved-crease -->
**直接例：折り角0の円弧。** 半径 $r>0$ の円弧を含む平面帯で、両側の写像を $F_\pm(x,y)=(x,y,0)$ とします。曲線は $C^2$ で、$dF(v)=(v_1,v_2,0)$ なので $\langle dF(v),dF(w)\rangle=v\cdot w$。両側の像は折り目で一致し、各側の偏微分は独立です。**定義の確認**：位置・等長性・正則性をすべて満たしますが、接平面も一致するため折り角は0です。定義を満たすことと、実際に折り目が立つことは別だと分かります。
<!-- definition-example-end -->

この定義の局所性は重要です。各側の面が局所等長でも、離れた点が三次元空間で重なる可能性があります。[ORI26 の非貫通条件](../ORI26/index.md#def-ori26-configuration)と同じく、完成した工作物については位置の単射性を追加で調べます。

## 2. 可展性は第一基本形式から判定する

円柱の側面は曲がって見えますが、紙を巻くだけで作れます。一方、球面の小片を平面紙から**一切伸ばさずに**作ることはできません。この違いを表すのが、曲面上で内在的に測る Gauss 曲率 $K$ です。

曲面の $K$ は [GEO10 の主曲率・Gauss 曲率の定義](../../GEO/GEO10/index.md#def-geo10-principal-curvature)で主曲率の積として導入され、[Gauss の驚異の定理](../../GEO/GEO11/index.md#thm-geo11-egregium)により第一基本形式だけで決まります。本講では、紙の像となり得る**滑らかな局所パッチ**に着目します。

<a id="def-ori28-developable-patch"></a>
<!-- formal-statement-start -->
> **定義（可展パッチ）**  
> $C^2$ 正則曲面の局所パッチで、すべての点の Gauss 曲率が $K=0$ であるものを本講では **可展パッチ**という。「可展」は局所的な内在曲率の条件であり、パッチ全体が重なりなく一枚の平面に配置できることまでは意味しない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ori28-developable-patch -->
**直接例：半径 $R>0$ の円柱。** $|s|<\pi R$ の範囲で

$$
Y(s,v)=(R\cos(s/R),R\sin(s/R),v)
$$

と置きます。$Y_s=(-\sin(s/R),\cos(s/R),0)$、$Y_v=(0,0,1)$ なので

$$
\langle Y_s,Y_s\rangle=1,\quad
\langle Y_s,Y_v\rangle=0,\quad
\langle Y_v,Y_v\rangle=1.
$$

第一基本形式が $ds^2+dv^2$ で平面と同一です。さらに単位法線 $N=(\cos(s/R),\sin(s/R),0)$ の導関数は $N_s=Y_s/R$、$N_v=0$。形作用素 $S=-dN$ の主曲率は $-1/R,0$ で、積は $K=0$。**定義の確認**：正則性 $|Y_s\times Y_v|=1$ と可展条件 $K=0$ をともに確認しました。
<!-- definition-example-end -->

局所等長な平面紙に対しては、円柱の例に限らず同じ必要条件が出ます。

<a id="thm-ori28-isometry-flat"></a>
<!-- formal-statement-start -->
> **定理（局所等長な紙面は Gauss 曲率0）**  
> 平面の開集合 $U\subset\mathbb R^2$ から $\mathbb R^3$ の $C^2$ 正則曲面への $C^2$ 局所等長写像 $F$ があるなら、像の各点で $K=0$ である。したがって滑らかな曲線折り模型の各側は可展パッチである。
<!-- formal-statement-end -->

### 証明の見取り図

平面の計量は $dx^2+dy^2$ で内在曲率0です。局所等長性は二つの計量を等しくし、[Gauss の驚異の定理](../../GEO/GEO11/index.md#thm-geo11-egregium)は内在曲率も等しくすると保証します。

<!-- proof-start -->
### 証明

$F$ の座標偏微分を $F_x=\partial F/\partial x,F_y=\partial F/\partial y$ とします。局所等長の仮定を標準基底 $e_1,e_2$ へ適用すると、[第一基本形式の座標係数](../../GEO/GEO10/index.md#def-geo10-first-fundamental-form)は

$$
g_{11}=F_x\cdot F_x=1,\qquad
g_{12}=F_x\cdot F_y=0,\qquad
g_{22}=F_y\cdot F_y=1.
$$

ここで $g_{ij}$ は接ベクトル $F_i,F_j$ の内積であり、$F_{12}$ のような二階偏微分とは区別します。

よって像の第一基本形式は $dx^2+dy^2$ です。平面の第一基本形式もこれと等しく、平面の曲率は0です。各点で $F$ が正則かつ局所微分同相な曲面表示であるため、[Gauss の驚異の定理](../../GEO/GEO11/index.md#thm-geo11-egregium)をこの座標対応へ適用でき、像の $K$ は平面の $0$ に一致します。曲線折りでは $F_+$ と $F_-$ の内部にそれぞれ適用すればよく、折り目で二階微分が一致する必要はありません。$\square$
<!-- proof-end -->

**反例：球面は局所的にも無理。** 半径 $R$ の球面の主曲率は同符号で絶対値 $1/R$、したがって $K=1/R^2>0$ です。平面から局所等長な像であれば[局所等長な紙面は Gauss 曲率0 という定理](#thm-ori28-isometry-flat)により $K=0$ のはずなので矛盾します。球の地図を平面に引き伸ばす場合と同様、どこかで長さ・角度の整合性を失います。

ただし $K=0$ **だけ**で、指定した折り目の両側がつながること、自己交差しないこと、境界条件を守ることは保証されません。次は曲面を直線の集まりとして表す別の判定を加えます。

## 3. 母線を持つことと可展であることは違う

円柱は、軸に平行な直線を動かしてできています。このように、曲面を構成する直線を**母線**として追えば、折れた面の形を手で記述しやすくなります。しかし、直線を寄せ集めた曲面のすべてが紙から作れるわけではありません。

直線の通過点を $\gamma(s)$、向きの単位ベクトルを $d(s)$ で指定し、$s$ で母線を選び、$v$ でその母線上を動くことにします。$X_s=\partial X/\partial s$ は $v$ を固定した偏微分、$X_v=\partial X/\partial v$ は $s$ を固定した偏微分です。

<a id="def-ori28-ruled-surface"></a>
<!-- formal-statement-start -->
> **定義（線織曲面と母線）**  
> $C^2$ 曲線 $\gamma(s)$ と $C^2$ 単位ベクトル場 $d(s)$ により

$$
X(s,v)=\gamma(s)+v d(s),\qquad |d(s)|=1
$$

> と表せる正則な曲面パッチを **線織曲面**、$s$ を固定して $v$ を動かした直線部分を **母線**という。正則とは $X_s\times X_v\ne0$ であることをいう。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ori28-ruled-surface -->
**直接例：円柱の母線。** 先の $Y$ で $\gamma(s)=(R\cos(s/R),R\sin(s/R),0)$、$d(s)=(0,0,1)$ とします。**定義の確認**：$|d|=1$、$Y=\gamma+vd$、$|Y_s\times Y_v|=1$ を満たします。$s$ を固定すると $v$ の変化は鉛直の直線となり、母線の定義を文字どおり満たします。
<!-- definition-example-end -->

Gauss 曲率を計算する際には [GEO10 の第二基本形式と座標表示](../../GEO/GEO10/index.md#prop-geo10-coordinate-forms)を用います。以下で $\gamma',d'$ はそれぞれ $s$ による通常微分です。また $\det(a,b,c)=(a\times b)\cdot c$ は3本のベクトルを列に並べた行列式（三重積）です。

母線方向では $X_{vv}=0$ です。第一基本形式の係数 $g_{ij}=X_i\cdot X_j$ と第二基本形式の係数 $b_{ij}=N\cdot X_{ij}$ を、それぞれ行列 $G=(g_{ij})$、$B=(b_{ij})$ に並べます。これが定義のどの条件を判定するか、以下の計算で追えます。

<a id="prop-ori28-ruled-curvature"></a>
<!-- formal-statement-start -->
> **命題（線織曲面の可展性判定）**  
> $X(s,v)=\gamma(s)+v d(s)$ が $C^2$ 正則な線織曲面で $|d|=1$ なら、Gauss 曲率は

$$
K(s,v)=-\frac{\det(\gamma'(s),d(s),d'(s))^2}
{|X_s(s,v)\times d(s)|^4}\le0.
$$

> 特に、このパッチが可展であるための必要十分条件は全 $s$ で $\det(\gamma',d,d')=0$ となることである。
<!-- formal-statement-end -->

### 証明の見取り図

母線 $v\mapsto X(s,v)$ は直線なので $X_{vv}=0$ です。第二基本形式の $vv$ 成分が0でも、混合成分が残ると Gauss 曲率は負になります。その混合成分が三重積で表せます。

<!-- proof-start -->
### 証明

$X_s=\gamma'+vd'$、$X_v=d$、$X_{sv}=d'$、$X_{vv}=0$ です。単位法線を $N=(X_s\times d)/w$、$w=|X_s\times d|>0$ とします。第二基本形式の $vv$ 成分と混合成分は

$$
\begin{aligned}
b_{22}&=N\cdot X_{vv}=0,\\
b_{12}&=N\cdot X_{sv}
=\frac{(X_s\times d)\cdot d'}{w}\\
&=\frac{\det(\gamma',d,d')+v\det(d',d,d')}{w}
=\frac{\det(\gamma',d,d')}{w}.
\end{aligned}
$$

最終等号では二つの列が同じ三重積 $\det(d',d,d')=0$ を用いました。第一基本形式の行列式は、外積の恒等式により

$$
\det(g_{ij})
=(X_s\cdot X_s)(d\cdot d)-(X_s\cdot d)^2
=|X_s\times d|^2=w^2.
$$

したがって [形作用素の座標表示 $G^{-1}B$](../../GEO/GEO10/index.md#prop-geo10-coordinate-forms)と [Gauss 曲率の定義](../../GEO/GEO10/index.md#def-geo10-principal-curvature)から

$$
K=\det(G^{-1}B)
=\frac{b_{11}b_{22}-b_{12}^2}{\det(g_{ij})}
=-\frac{\det(\gamma',d,d')^2}{w^4}.
$$

分母は正であり、分子は $s$ のみの二乗です。よって全パッチで $K=0$ となることと、各 $s$ で三重積が0となることは同値です。$\square$
<!-- proof-end -->

**直線があっても紙からは作れない例。**

$$
X(s,v)=(s,v\cos s,v\sin s)
$$

なら $\gamma'=(1,0,0)$、$d=(0,\cos s,\sin s)$、$d'=(0,-\sin s,\cos s)$ で三重積は1です。$|X_s\times d|^2=1+v^2$ なので

$$
K(s,v)=-\frac1{(1+v^2)^2}<0.
$$

各 $s$ の母線は確かに直線ですが、曲率0という必要条件に違反します。「線織曲面」と「可展パッチ」を同一視できない理由が、式から見えます。

## 4. 折り目の曲率から折り角を計算する

面が可展でも、折り目の左右で接平面がどれだけずれるかを決めなければなりません。平面の折り目を弧長 $s$ でたどる単位速曲線を $\gamma_0(s)$ と書き、単位接線を $T_0(s)=\gamma_0'(s)$、平面内で $T_0$ に直交する単位横方向を $n_0(s)$ とします。プライムはここでは弧長 $s$ による微分です。$n_0$ は**左右両側へ延長する際の同じ向き**を選びます。

折った後の共通空間曲線を $C(s)$ と書きます。局所等長なので $|C'(s)|=1$ です。その単位接線を $T=C'$、横方向の像を $m_+,m_-$ とすると、それぞれ $T$ に直交する単位ベクトルです。ここで二本の横方向の開きが折り角を定めます。

<a id="def-ori28-fold-angle"></a>
<!-- formal-statement-start -->
> **定義（曲線折りの折り角）**  
> 滑らかな曲線折り模型の折り目を弧長 $s$ で表す。平面内で折り目に直交する一つの単位横方向 $n_0(s)$ を固定し、その各側の像を $m_\pm(s)=dF_\pm(n_0(s))$ とする。$m_\pm$ は $C'(s)$ に直交する単位ベクトルである。**折り角** $\theta(s)$ を

$$
\theta(s)=\arccos\bigl(m_+(s)\cdot m_-(s)\bigr)
\quad(0\le\theta\le\pi)
$$

> とする。$\theta=0$ は接平面が連続する状態であり、$0<\theta<\pi$ はここで扱う非退化な折り目である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ori28-fold-angle -->
**直接例：直線折り。** 平面の折り目を $x$ 軸とし、$n_0=(0,1)$ とします。左右の面を $x$ 軸まわりにそれぞれ角 $\beta$、$-\beta$ 回転すると、$m_+=(0,\cos\beta,\sin\beta)$、$m_-=(0,\cos\beta,-\sin\beta)$ です。$0\le\beta<\pi/2$ なら内積は $\cos2\beta$、したがって $\theta=2\beta$。**定義の確認**：両側は回転なので局所等長、折り目で一致し、$m_\pm$ は単位かつ折り目接線に直交します。横方向の内積から角度が定まることまで直接確かめました。
<!-- definition-example-end -->

平面での折り目の**符号付き測地曲率**を $k_g$ とします。これは横方向 $n_0$ を固定して

$$
k_g(s)=\gamma_0''(s)\cdot n_0(s)
$$

と計算した値です。[GEO19 の測地曲率の定義](../../GEO/GEO19/index.md#def-geo19-kg)では正の $90^\circ$ 回転 $J$ に対する $JT$ を用いるので、ここでは $JT_0=n_0$ となる平面の向きを選びます。折り後の各側でも $JC'=m_\pm$ となる向きを別々に選んで同じ符号を比較します。空間曲線の曲率は $\kappa(s)=|C''(s)|$ とします。

<a id="thm-ori28-curvature-fold-law"></a>
<!-- formal-statement-start -->
> **定理（曲線折りの曲率と折り角）**  
> $C^2$ の滑らかな曲線折り模型の折り目を共通の弧長 $s$ で表し、各側から得た横方向 $m_\pm$ の折り角が $0<\theta(s)<\pi$ とする。元の平面曲線の符号付き測地曲率を $k_g(s)$、像の空間曲率を $\kappa(s)=|C''(s)|$ とすると

$$
|k_g(s)|=\kappa(s)\cos\frac{\theta(s)}2.
$$

> 特に $k_g\ne0$ なら $\kappa\ge|k_g|$ であり、$\kappa$ と $k_g$ が分かれば折り角が定まる。$\theta=0$ の点には、一般にはこの等式を適用できない。
<!-- formal-statement-end -->

### 証明の見取り図

局所等長性により、空間加速度 $C''$ を各側の横方向 $m_\pm$ に射影した値はどちらも同じ $k_g$ です。両横方向は折り目の接線に直交する平面内で $\theta$ だけ開くため、二方向への等しい射影は二等分線上にしか存在できません。

<!-- proof-start -->
### 証明

$|C'|=1$ を微分して $C''\cdot C'=0$ を得ます。よって $C''$、$m_+$、$m_-$ はいずれも $T=C'$ に直交する同一の二次元平面にあります。

まず、局所等長性が測地曲率を保つことを、[第一基本形式の座標表示](../../GEO/GEO10/index.md#def-geo10-first-fundamental-form)から直接確かめます。平面の直交座標を $x=(x^1,x^2)$ とし、各側で $F_i=\partial F_\pm/\partial x^i$、$F_{ij}=\partial^2F_\pm/(\partial x^i\partial x^j)$ と書きます。$F_i\cdot F_j=\delta_{ij}$ を座標 $x^k$ で偏微分し、添字を巡回して整理すると

$$
2F_{ij}\cdot F_k
=\partial_i(F_j\cdot F_k)+\partial_j(F_i\cdot F_k)
-\partial_k(F_i\cdot F_j)=0.
$$

したがって二階偏微分 $F_{ij}$ は各接ベクトル $F_k$ に直交します。$\gamma_0(s)=(\gamma_0^1(s),\gamma_0^2(s))$ として $C=F_\pm\circ\gamma_0$ を弧長 $s$ で二回微分すると、連鎖律から

$$
C''=\sum_i F_i(\gamma_0^i)''
+\sum_{i,j}F_{ij}(\gamma_0^i)'(\gamma_0^j)',
\qquad
m_\pm=\sum_k F_k n_0^k.
$$

第二項は $m_\pm$ に直交し、第一項では $F_i\cdot F_k=\delta_{ik}$ です。よって [測地曲率の定義](../../GEO/GEO19/index.md#def-geo19-kg)と、先に選んだ各側の向きから

$$
C''\cdot m_\pm
=\sum_i(\gamma_0^i)''n_0^i
=\gamma_0''\cdot n_0=k_g.
$$

この式は両側で同じなので

$$
C''\cdot m_+=k_g=C''\cdot m_-.
$$

この二式を引くと $C''\cdot(m_+-m_-)=0$。$0<\theta<\pi$ なら $m_+-m_-$ は非零、かつ $m_++m_-$ も非零で、二つは直交します。さらに $C''$ は $T$ と $m_+-m_-$ の双方に直交するので、ある実数 $q$ で

$$
C''=q\frac{m_++m_-}{|m_++m_-|}.
$$

$|m_++m_-|^2=2+2\cos\theta=4\cos^2(\theta/2)$ です。また

$$
\frac{(m_++m_-)\cdot m_+}{|m_++m_-|}
=\frac{1+\cos\theta}{2\cos(\theta/2)}
=\cos\frac\theta2.
$$

従って $k_g=q\cos(\theta/2)$、$\kappa=|C''|=|q|$。絶対値を取って主張を得ます。$\square$
<!-- proof-end -->

**なぜ $\theta=0$ を除外するか。** この場合 $m_+=m_-$ なので、証明で用いた $m_+-m_-$ は零ベクトルです。例えば円柱上に任意の滑らかな曲線を描き、折り目として左右を区切るだけなら $\theta=0$ です。空間加速度は接平面に垂直な成分も持ち得るため、一般には $|k_g|\ne\kappa$ です。非零折り角の式を、接平面が連続する点へ機械的に代入してはいけません。

## 5. 円弧を本当に折れる二枚の円錐面

必要条件を満たすだけでは、左右の可展パッチが位置まで一致するとは分かりません。ここでは**明示的な存在構成**を作ります。平面の半径 $r$ の円弧を、空間ではより小さい半径 $\rho$ の円弧へ写します。ただし全周ではなく、まず短い円弧とその両側の紙帯です。

平面の極座標の半径方向を $u$、角度を $\varphi$ とし、元の紙の位置を

$$
p(u,\varphi)=((r+u)\cos\varphi,(r+u)\sin\varphi)
$$

で記します。$u=0$ が折り目、$u>0$ が外側、$u<0$ が内側です。$r>0$ と $0<\rho<r$ に対し

$$
a=\frac\rho r,\qquad b=\sqrt{1-a^2},\qquad\lambda=\frac r\rho=\frac1a
$$

とします。$a,b$ は無次元、$r,\rho,u$ は長さです。角度の写り方は $\lambda\varphi$ と大きくなります。折り目の長さ $r\,d\varphi$ を、半径の小さい空間円弧の $\rho\,d(\lambda\varphi)$ に合わせるためです。

<a id="thm-ori28-conical-construction"></a>
<!-- formal-statement-start -->
> **定理（円弧の局所的円錐面折り）**  
> $r>\rho>0$、$0<\delta<r$、$0<\eta<\pi\rho/r$ とする。平面帯 $|u|<\delta,|\varphi|<\eta$ を上記の $p$ で表す。$u\ge0$ には $F_+$、$u\le0$ には $F_-$ を

$$
F_\pm(u,\varphi)
=\bigl((\rho+au)\cos(\lambda\varphi),
(\rho+au)\sin(\lambda\varphi),\;\pm bu\bigr)
$$

> で定めると、各側は正則・局所等長かつ可展な線織曲面である。両側は $u=0$ で一致し、全帯の像は自己交差しない。折り目の像は半径 $\rho$ の円弧、折り角は一定で $\theta=2\arccos(\rho/r)\in(0,\pi)$ となる。
<!-- formal-statement-end -->

### 証明の見取り図

平面の極座標で距離を測ると $du^2+(r+u)^2d\varphi^2$ です。像の半径方向の微分は長さ1、円周方向の微分は長さ $r+u$ で互いに直交します。さらに、両側は半径 $\rho$ の同じ円弧を共有し、外側と内側は半径の大小で分離できます。

<!-- proof-start -->
### 証明

$e_r=(\cos\lambda\varphi,\sin\lambda\varphi,0)$、$e_\varphi=(-\sin\lambda\varphi,\cos\lambda\varphi,0)$、$e_z=(0,0,1)$ とします。元の平面の偏微分は $p_u=(\cos\varphi,\sin\varphi)$、$p_\varphi=(r+u)(-\sin\varphi,\cos\varphi)$ で、第一基本形式は $du^2+(r+u)^2d\varphi^2$ です。

空間側では

$$
(F_\pm)_u=ae_r\pm be_z,\qquad
(F_\pm)_\varphi=\lambda(\rho+au)e_\varphi=(r+u)e_\varphi.
$$

最後の等号は $\lambda\rho=r$、$\lambda a=1$ を使いました。従って

$$
\begin{aligned}
|(F_\pm)_u|^2&=a^2+b^2=1,\\
(F_\pm)_u\cdot(F_\pm)_\varphi&=0,\\
|(F_\pm)_\varphi|^2&=(r+u)^2.
\end{aligned}
$$

$r+u>r-\delta>0$ なので二偏微分は常に独立で、正則かつ局所等長です。[局所等長な紙面は Gauss 曲率0 という定理](#thm-ori28-isometry-flat)から $K=0$。また $u$ に沿った像は $(F_\pm)_{uu}=0$ の直線であるため、両側は母線を持ちます。より具体的には $F_\pm(0,\varphi)+u(ae_r\pm be_z)$ と書け、これを [線織曲面の定義](#def-ori28-ruled-surface)に照らしても可展パッチです。

$u=0$ では

$$
F_+(0,\varphi)=F_-(0,\varphi)
=(\rho\cos\lambda\varphi,\rho\sin\lambda\varphi,0).
$$

したがって同じ円弧に沿って接合します。横方向の像は $m_\pm=ae_r\pm be_z$、内積は $a^2-b^2=2a^2-1$ です。$0<a<1$ より $\theta=\arccos(2a^2-1)=2\arccos a$。

最後に大域的な重複を排除します。各像の水平半径は $\rho+au=a(r+u)>0$、偏角は $\lambda\varphi\in(-\lambda\eta,\lambda\eta)$ です。仮定 $\lambda\eta<\pi$ によりこの角度区間の幅は $2\pi$ 未満なので、水平位置から $u$ と $\varphi$ が一意に復元できます。さらに $u>0$ 側の水平半径は $\rho$ より大きく、$u<0$ 側では小さいため、両側は折り目以外では交わりません。全帯の像は単射です。$\square$
<!-- proof-end -->

**直接計算：$r=2,\rho=1$ の折り角。** 折り目の弧長は $s=r\varphi$ なので、第4節の $C(s)$ とここでの角度表示 $F_\pm(0,\varphi)$ は $\varphi=s/r$ で対応します。$a=1/2$、$b=\sqrt3/2$、$\lambda=2$ なので $\theta=2\arccos(1/2)=2\pi/3$ です。平面の折り目は半径2の円弧で $|k_g|=1/2$、空間の像は半径1の円弧で $\kappa=1$。確かに

$$
\kappa\cos(\theta/2)=1\cdot\cos(\pi/3)=\frac12=|k_g|.
$$

また単位接線は $e_\varphi$ なので、空間加速度は $C''=-e_r/\rho$。選んだ外向き横方向 $m_\pm$ に射影すると $-a/\rho=-1/r$ です。ここでは [曲率と折り角の定理](#thm-ori28-curvature-fold-law)の符号付き導出まで具体的に確認できます。

## 6. 局所折りと大域的工作物の境界

ここまでの円錐面構成は短い円弧に対して正確です。しかし、平面上で一周した点が空間でも同じ点に戻るかは別の条件です。$\varphi$ を $2\pi$ 増やしたとき、空間側の角度は $2\pi\lambda$ 増えます。ここから、同じ公式を円全体へ延長する際の問題が分かります。

<a id="prop-ori28-closed-crease"></a>
<!-- formal-statement-start -->
> **命題（円錐面模型の閉曲線への延長障害）**  
> $0<\rho<r$ とし、上の $F_\pm$ の同じ公式を平面の全円 $u=0$、$0\le\varphi\le2\pi$ へ使う。$r/\rho\notin\mathbb Z$ なら始点と終点の空間位置が一致せず連続な全周写像を定義できない。$r/\rho\in\mathbb Z$ ならその整数は2以上で、空間の円弧を複数周し、折り目の像は単射でない。
<!-- formal-statement-end -->

### 証明の見取り図

閉曲線では一周後の偏角が $2\pi$ の整数倍である必要があります。しかし整数倍を選んだ場合は、同じ空間位置に別々の平面上の点が現れます。

<!-- proof-start -->
### 証明

この証明では弧長 $s$ でなく角度 $\varphi$ を引数にして、折り目の像を $C(\varphi)=(\rho\cos\lambda\varphi,\rho\sin\lambda\varphi,0)$ と書きます。始点と終点が一致するのは $\lambda\in\mathbb Z$ の場合だけです。$\lambda=r/\rho>1$ なので整数なら $n\ge2$。このとき $\varphi=0$ と $\varphi=2\pi/n$ は平面円周上の異なる点ですが

$$
C(0)=(\rho,0,0)=C(2\pi/n).
$$

したがって単射性が失われます。$\square$
<!-- proof-end -->

これは**この円錐面の公式**についての障害であり、一般の閉じた曲線折りすべてが不可能という定理ではありません。同様に、$K=0$ は伸びを避ける必要条件ですが、局所的な接合、離れた部分の衝突、材料の厚さ、折りを作る力を一度に保証しません。

さらに有限個の剛体パネルをつないだ折り線図と、各側が滑らかな曲面であるこの模型は異なります。[ORI27 のパネル合同の検算](../ORI27/index.md#thm-ori27-rigid-motion)では各面の全距離を Gram 行列で確認しました。一方、曲線折りでは各点の微分が内積を保つことを検算します。細い直線折り目を多数並べた図の見た目だけで、極限として滑らかな等長曲面が存在するとは結論できません。

## 7. 演習と詳細解答

### Level A：曲面の計量と曲率を手で確かめる

<a id="ex-ori28-a1"></a>
#### A1. 円柱は本当に長さを保つか
- Level: A

$R=3$ として $Y(s,v)=(3\cos(s/3),3\sin(s/3),v)$ を考える。第一基本形式と $|Y_s\times Y_v|$ を計算し、$|s|<3\pi$ の範囲が平面からの局所等長な正則パッチであることを確認せよ。

<!-- solution-start -->
**詳細解答。** $Y_s=(-\sin(s/3),\cos(s/3),0)$、$Y_v=(0,0,1)$ なので

$$
|Y_s|^2=\sin^2(s/3)+\cos^2(s/3)=1,
\quad Y_s\cdot Y_v=0,\quad |Y_v|^2=1.
$$

従って第一基本形式は $ds^2+dv^2$、つまり元の平面の計量に一致します。外積は $(\cos(s/3),\sin(s/3),0)$ で長さ1、従って正則です。$|s|<3\pi$ は幅 $6\pi=2\pi R$ の開区間なので、円柱を一周する直前まで異なる $s$ は異なる角度を持ちます。この区間で局所等長な曲面パッチと判定できます。
<!-- solution-end -->

<a id="ex-ori28-a2"></a>
#### A2. 円錐面の第一基本形式を数値で検算
- Level: A

円弧模型で $r=3,\rho=2,u=1/2$ とする。$a,b,\lambda$ および $|(F_+)_u|^2,(F_+)_u\cdot(F_+)_\varphi,|(F_+)_\varphi|^2$ を求め、元の平面の値と比較せよ。

<!-- solution-start -->
**詳細解答。** $a=\rho/r=2/3$、$b=\sqrt{1-4/9}=\sqrt5/3$、$\lambda=r/\rho=3/2$ です。定理の微分公式に代入して

$$
(F_+)_u=\frac23e_r+\frac{\sqrt5}3e_z,
\qquad (F_+)_\varphi=(3+1/2)e_\varphi=\frac72e_\varphi.
$$

$e_r,e_\varphi,e_z$ は互いに直交する単位ベクトルですから

$$
|(F_+)_u|^2=\frac49+\frac59=1,
\quad (F_+)_u\cdot(F_+)_\varphi=0,
\quad |(F_+)_\varphi|^2=\frac{49}4.
$$

平面側は $p_u$ が単位、$p_\varphi$ の長さが $r+u=7/2$、内積0です。三つの係数が一致し、正則性も $|(F_+)_u\times(F_+)_\varphi|=7/2>0$ と確認できます。
<!-- solution-end -->

<a id="ex-ori28-a3"></a>
#### A3. 球面を紙から作れない理由
- Level: A

半径 $R=4$ の球面の主曲率の絶対値がどちらも $1/4$ であることを用い、平面から球面の開パッチへ $C^2$ 正則な局所等長写像が存在しない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** 球面の二つの主曲率は同符号なので、Gauss 曲率は $K=(1/4)(1/4)=1/16$ です。仮に局所等長写像が存在するなら、[局所等長な紙面は曲率0という定理](#thm-ori28-isometry-flat)から像の各点で $K=0$ となります。$1/16\ne0$ で矛盾します。失われる仮定は「伸びなしの局所等長性」であり、ただ曲面に近い形へ丸めるだけでは条件を満たしません。
<!-- solution-end -->

<a id="ex-ori28-a4"></a>
#### A4. 母線があるだけでは可展でない
- Level: A

$X(s,v)=(s,v\cos s,v\sin s)$ に対し、$X_s,X_v$、および $\det(\gamma',d,d')$ を計算し、$v=0$ での $K$ を求めよ。

<!-- solution-start -->
**詳細解答。** $\gamma=(s,0,0)$、$d=(0,\cos s,\sin s)$ と見れば

$$
X_s=(1,-v\sin s,v\cos s),\qquad X_v=(0,\cos s,\sin s).
$$

さらに $\gamma'=(1,0,0)$、$d'=(0,-\sin s,\cos s)$。三重積は

$$
\det(\gamma',d,d')=\cos^2s+\sin^2s=1.
$$

$v=0$ では $|X_s\times X_v|^2=1$ です。[線織曲面の曲率式](#prop-ori28-ruled-curvature)より $K(s,0)=-1/1^2=-1$。線織曲面の定義は満たしますが、可展条件 $K=0$ は満たしません。
<!-- solution-end -->

<a id="ex-ori28-a5"></a>
#### A5. 半径比から折り角へ
- Level: A

平面の折り目が半径 $r=2$ の円弧、空間折り目が半径 $\rho=1$ の円弧である円錐面模型について、$|k_g|,\kappa,\theta$ を計算し、曲率と折り角の式を確認せよ。

<!-- solution-start -->
**詳細解答。** 平面の円の曲率の絶対値は $|k_g|=1/r=1/2$、空間の円の曲率は $\kappa=1/\rho=1$ です。模型の横方向ベクトルの内積は $2(\rho/r)^2-1=2(1/2)^2-1=-1/2$。よって $\theta=\arccos(-1/2)=2\pi/3$。さらに

$$
\kappa\cos(\theta/2)=1\cdot\cos(\pi/3)=1/2=|k_g|.
$$

半径比が $0<\rho/r<1$ なので $0<\theta<\pi$ となり、[曲率と折り角の定理](#thm-ori28-curvature-fold-law)の適用条件も満たします。
<!-- solution-end -->

### Level B：必要条件と構成上の障害を区別する

<a id="ex-ori28-b1"></a>
#### B1. 曲率の二等分線則を最初から導く
- Level: B

単位接線 $T$ に直交する単位ベクトル $m_+,m_-$ がなす角を $0<\theta<\pi$ とする。$C''\perp T$、$C''\cdot m_+=C''\cdot m_-=k_g$ と仮定する。$|k_g|=|C''|\cos(\theta/2)$ を導き、$\theta=0$ ではなぜ導出できないか述べよ。

<!-- solution-start -->
**詳細解答。** 二つの射影の差から

$$
C''\cdot(m_+-m_-)=0.
$$

$m_+-m_-$ は零でなく $T$ に直交します。$T$ の直交平面は二次元なので、その中でさらに $m_+-m_-$ に直交する $C''$ は $m_++m_-$ に平行です。$m_+\cdot m_-=\cos\theta$ より

$$
|m_++m_-|^2=2+2\cos\theta=4\cos^2(\theta/2).
$$

従って $C''=q(m_++m_-)/(2\cos(\theta/2))$ と書け、$|C''|=|q|$、

$$
k_g=C''\cdot m_+=q\frac{1+\cos\theta}{2\cos(\theta/2)}
=q\cos(\theta/2).
$$

絶対値を取ると結論が得られます。$\theta=0$ なら $m_+-m_-=0$ で方向を制限する独立な式がなく、$C''$ の面法線方向の成分を消せません。よって一般の滑らかな接合にはこの二等分線則を使えません。
<!-- solution-end -->

<a id="ex-ori28-b2"></a>
#### B2. 全周への延長で何が壊れるか
- Level: B

円錐面模型の折り目 $C(\varphi)=(\rho\cos(\lambda\varphi),\rho\sin(\lambda\varphi),0)$ を全周 $0\le\varphi\le2\pi$ に拡張しようとする。$\lambda=3/2$ と $\lambda=3$ の場合、それぞれ閉鎖条件と単射性を調べよ。どちらも平面上の**全円の埋め込み**にならない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $\lambda=3/2$ では $C(0)=(\rho,0,0)$ ですが

$$
C(2\pi)=(\rho\cos3\pi,\rho\sin3\pi,0)=(-\rho,0,0).
$$

平面では同じ始終点なのに空間像が異なるので、全円上の連続写像としても定義できません。$\lambda=3$ なら $C(2\pi)=C(0)$ で閉じますが、$\varphi=0,2\pi/3$ は平面上の異なる点なのに、像の偏角はそれぞれ $0,2\pi$ となり一致します。単射ではありません。[閉曲線への延長障害](#prop-ori28-closed-crease)の二つの機構を具体的に確認できました。これは本模型に関する判定です。
<!-- solution-end -->

<a id="ex-ori28-b3"></a>
#### B3. 見た目だけで曲げると伸びが生じる
- Level: B

$r>0,c>0$ とし、平面の帯 $p(u,\varphi)=((r+u)\cos\varphi,(r+u)\sin\varphi)$ に対し、安易な立体化

$$
Z(u,\varphi)=((r+u)\cos\varphi,(r+u)\sin\varphi,cu)
$$

を考える。第一基本形式を計算し、なぜ局所等長でないか示せ。$c=0$ との違いも説明せよ。

<!-- solution-start -->
**詳細解答。** $Z_u=(\cos\varphi,\sin\varphi,c)$、$Z_\varphi=(r+u)(-\sin\varphi,\cos\varphi,0)$ なので

$$
|Z_u|^2=1+c^2,\quad Z_u\cdot Z_\varphi=0,
\quad |Z_\varphi|^2=(r+u)^2.
$$

従って像の計量は $(1+c^2)du^2+(r+u)^2d\varphi^2$ です。平面の計量は $du^2+(r+u)^2d\varphi^2$ なので、$c>0$ では半径方向の単位長が $\sqrt{1+c^2}>1$ へ伸びます。破れた条件は [曲線折り模型の局所等長性](#def-ori28-curved-crease)です。$c=0$ なら両計量が一致しますが、像は元の平面のままで立体的な曲げではありません。
<!-- solution-end -->

<a id="ex-ori28-b4"></a>
#### B4. 局所等長でも大域的には重なる
- Level: B

円柱写像 $Y(s,v)=(R\cos(s/R),R\sin(s/R),v)$ を今度は $0<s<4\pi R$ 上に定める（$R>0$）。局所等長性と正則性を確認し、異なる二点が同じ像を持つ例を挙げよ。

<!-- solution-start -->
**詳細解答。** $Y_s=(-\sin(s/R),\cos(s/R),0)$、$Y_v=(0,0,1)$ は長さ1で互いに直交し、外積の長さも1です。従ってどの点でも $C^\infty$ 正則・局所等長です。しかし $s_1=\pi R/2$ と $s_2=5\pi R/2$ はどちらも $(0,4\pi R)$ に属し、$s_2-s_1=2\pi R$ です。同じ $v$ で

$$
Y(s_1,v)=(0,R,v)=Y(s_2,v)
$$

となります。局所の計量が保存されても、全体の写像が単射とは限りません。[円弧の局所的円錐面折りの定理](#thm-ori28-conical-construction)で角度幅を $2\pi$ 未満に制限した理由も、同じ重複を防ぐためです。
<!-- solution-end -->

### Level C：曲線折りを一つ完全に構成する

<a id="ex-ori28-c1"></a>
#### C1. 半径2の円弧を折り上げる検証設計
- Level: C

元の紙を $p(u,\varphi)=((2+u)\cos\varphi,(2+u)\sin\varphi)$ とし、$|u|<1/4$、$|\varphi|<\pi/8$ とする。折り目は $u=0$。半径 $\rho=1$ の空間円弧を折り目の像にするため、[円弧の円錐面折りの構成](#thm-ori28-conical-construction)を使う。

1. $a,b,\lambda$ と $F_\pm$ を書き、平面側と両空間側の第一基本形式を計算せよ。
2. 正則性、左右の接合、母線および Gauss 曲率0を検算せよ。
3. 平面・空間の折り目の曲率と折り角を求め、曲率と折り角の関係を確認せよ。
4. パッチ内部と左右間の自己重複がないことを示せ。
5. 同じ式を全周、または厚さのある紙や離散剛体パネルへ直ちに適用できるか、その境界を述べよ。

<!-- solution-start -->
**詳細解答。**

1. $a=\rho/r=1/2$、$b=\sqrt3/2$、$\lambda=r/\rho=2$ です。従って

$$
F_\pm(u,\varphi)
=\left((1+u/2)\cos2\varphi,(1+u/2)\sin2\varphi,
\pm\frac{\sqrt3}{2}u\right).
$$

   平面では $p_u=e_r^{(0)}$、$p_\varphi=(2+u)e_\varphi^{(0)}$、従って計量は

$$
du^2+(2+u)^2d\varphi^2.
$$

   空間では $e_r=(\cos2\varphi,\sin2\varphi,0)$、$e_\varphi=(-\sin2\varphi,\cos2\varphi,0)$ と書くと

$$
(F_\pm)_u=\frac12e_r\pm\frac{\sqrt3}{2}e_z,
\qquad (F_\pm)_\varphi=(2+u)e_\varphi.
$$

   内積は $1,0,(2+u)^2$ であり、平面の第一基本形式と完全に一致します。

2. $|u|<1/4$ から $2+u>7/4>0$。よって外積の長さは $2+u>0$ で、どちらも正則です。$u=0$ なら

$$
F_+(0,\varphi)=F_-(0,\varphi)
=(\cos2\varphi,\sin2\varphi,0),
$$

   と同じ折り目になります。$\varphi$ を固定すると $F_\pm$ は $u$ に関する一次式、$u$ 方向の二階微分は0で、母線は直線です。局所等長と正則性から [Gauss曲率0の定理](#thm-ori28-isometry-flat)を適用でき、各側は可展パッチです。あるいは三重積が0になることを [線織曲面の判定](#prop-ori28-ruled-curvature)に代入しても同じです。

3. 平面円弧の曲率の絶対値は $1/2$、空間像は半径1の円弧なので $\kappa=1$。横方向は $m_\pm=(1/2)e_r\pm(\sqrt3/2)e_z$ ですから

$$
m_+\cdot m_-=1/4-3/4=-1/2,
\qquad\theta=\arccos(-1/2)=2\pi/3.
$$

   $0<\theta<\pi$ を満たし、$\kappa\cos(\theta/2)=\cos(\pi/3)=1/2$ は [曲率と折り角の定理](#thm-ori28-curvature-fold-law)に一致します。符号付きでは外向きの横方向を取れば $k_g=-1/2$ です。

4. 空間の水平半径は $1+u/2$ で、$u>0$ の外側は1より大きく、$u<0$ の内側は1より小さいため左右が交差しません。また $|2\varphi|<\pi/4$ は長さ $\pi/2<2\pi$ の偏角区間なので、水平位置から $\varphi$ が一意に決まり、その半径から $u=2(\text{水平半径}-1)$ が一意に求まります。ゆえに各側と接合した全体が単射です。

5. 全周にすると $\lambda=2$ なので、平面で異なる $\varphi=0$ と $\varphi=\pi$ の折り目がともに $(1,0,0)$ へ写り、単射性を失います。これは [全周延長の命題](#prop-ori28-closed-crease)に一致します。また厚さ・曲げ剛性・衝突を含む製造過程は局所等長の式だけでは保証されません。直線ヒンジの離散パネルで作る場合は、各面の合同性と頂点・衝突の条件を [ORI27 の剛体模型](../ORI27/index.md#thm-ori27-rigid-motion)に沿って別途検証する必要があります。
<!-- solution-end -->

## 8. まとめと次の問い

- 滑らかな紙面の局所等長性は第一基本形式の一致で検算し、各側の Gauss 曲率は0となります。
- 母線を持つだけでは可展性は保証されず、線織曲面では $\det(\gamma',d,d')=0$ が判定条件です。
- 非零の折り角では、折り目の測地曲率と空間曲率は $|k_g|=\kappa\cos(\theta/2)$ でつながります。
- 円弧の局所的円錐面折りは、計量・接合・正則性・単射性をすべて座標で確認できます。ただし全周の閉鎖や厚さのある実装は別問題です。

次の ORI29 では、これらの理想曲面・理想ヒンジが**厚み、干渉、材料の曲げ、駆動**を入れたときにも成立するかを調べます。

### 参考文献

- T. C. Hull, *Origametry: Mathematical Methods in Paper Folding*, Cambridge University Press, 2020（数学的折り紙の幾何模型）。
- E. D. Demaine and J. O'Rourke, *Geometric Folding Algorithms*, Cambridge University Press, 2007（可展面・折りの幾何モデル）。
- M. A. Dias, L. H. Dudte, L. Mahadevan and C. D. Santangelo, “Geometric Mechanics of Curved Crease Origami,” *Physical Review Letters* **109** (2012), 114301（曲線折りの曲率・幾何力学。本文の局所円錐面例は独立に座標検算した）。

