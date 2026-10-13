# AG2-10 正規束と随伴公式

[前章のEuler列](../AG2-09/index.md#thm-ag2-09-euler-sequence)によって射影空間の余接層と標準束が分かりました。しかし、射影空間の中に曲線や超曲面を置いたとき、周囲のすべての微分方向が部分多様体の微分方向になるわけではありません。たとえば平面内の放物線 $y=x^2$ に沿って移動できる方向は、平面の二方向のうち一本だけです。

[Zariski接空間のJacobian表示](../AG1-10/index.md#prop-ag1-10-jacobian-kernel)を踏まえて、**どの方向を差し引けばよいか**を局所方程式の微分で求め、その「外向きの方向」を束として貼り合わせます。そこから部分多様体自身の標準束を計算するのが**随伴公式**です。この公式は、平面三次曲線の標準束が自明になる理由や、射影4次元空間内の五次超曲面の標準束を説明します。

以下、基礎体は $k=\mathbb C$、$n\ge2$ とし、$P=\mathbb P^n_k$ と書きます。$Y\subset P$ は、次数 $d\ge1$ の非零斉次式 $F(X_0,\ldots,X_n)$ の零点集合とします。本文の主定理では $Y$ のすべての点で斉次偏微分 $\partial F/\partial X_i$ が同時に零にならないことを仮定します。これはここで扱う超曲面の滑らかさの判定条件です。

## 1. 内側の方向と外側の方向

まず $P$ のアフィンチャート $U_0$ 内で $f(x,y)=y-x^2$ による曲線 $C$ を考えます。曲線上で $f=0$ だから、曲線に接する変位 $(a,b)$ は

$$
df(a,b)=(-2x\,dx+dy)(a,b)=-2xa+b=0
$$

を満たします。従って接方向は $(1,2x)$ の倍数です。一方、$df$ によって検出される方向が一本残ります。「周囲の接方向を、曲線の接方向で割ったもの」を正規方向と考えたいわけです。

一つの方程式の値を変える方向は局所的には計算できますが、方程式を別の単元倍へ取り直すと $df$ も変わります。値そのものではなく、この変換則ごと記録する必要があります。

<a id="def-ag2-10-conormal"></a>

<!-- formal-statement-start -->
> **定義（余法層と正規層）**  
> $Y\subset P=\mathbb P^n_{\mathbb C}$ を閉部分多様体とし、$\mathcal I_Y\subset\mathcal O_P$ を局所的に $Y$ 上で零となる正則関数のイデアル層とする。$\mathcal I_Y/\mathcal I_Y^2$ を $Y$ 上の **余法層** とする。これが局所自由であるとき、その双対層

$$
N_{Y/P}:=\mathcal Hom_{\mathcal O_Y}
\bigl(\mathcal I_Y/\mathcal I_Y^2,\mathcal O_Y\bigr)
$$

> を **正規束（正規層）** とする。$\mathcal I_Y^2$ は局所イデアルの元どうしの積が生成するイデアルであり、商は $\mathcal O_Y=\mathcal O_P/\mathcal I_Y$ 上の加群である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ag2-10-conormal -->
**定義の直接例。** $A=\mathbb C[x,y]$、$I=(y-x^2)=(f)$ とします。$A$ は整域なので、$a f\in(f^2)$ は $a\in(f)$ と同値です。よって

$$
A/(f)\longrightarrow I/I^2,\qquad
\overline a\longmapsto\overline{af}
$$

は全単射であり、$I/I^2$ は $\overline f$ を基底とする自由階数1の加群です。その双対も自由階数1です。$\overline f$ に値1を与える写像が正規方向の局所基底になります。
<!-- definition-example-end -->

## 2. 方程式の変換から余法層を貼り合わせる

射影超曲面では、アフィンチャート $U_i=\{X_i\ne0\}$ 上の方程式を

$$
f_i=\frac{F}{X_i^d}
$$

とします。$U_i\cap U_j$ で $z_j^{(i)}=X_j/X_i$ と置くと

$$
f_j=(z_j^{(i)})^{-d}f_i.
$$

従って $Y$ 上の余法層の局所基底 $\overline{f_i}$ は、重なりで $\overline{f_j}=(z_j^{(i)})^{-d}\overline{f_i}$ と変わります。この変換は[射影空間の $\mathcal O(-d)$](../AG2-06/index.md#def-ag2-06-twisting-sheaf)の局所基底の変換そのものです。

<a id="prop-ag2-10-conormal-hypersurface"></a>

<!-- formal-statement-start -->
> **命題（超曲面の余法層）**  
> $P=\mathbb P^n_{\mathbb C}$ とし、$F$ を次数 $d\ge1$ の非零斉次多項式とする。$Y=V_+(F)$ のイデアル層が各 $U_i$ 上で $f_i=F/X_i^d$ により生成され、$Y$ を定義するスキーム構造がこの一方程式で与えられるとき、

$$
\mathcal I_Y/\mathcal I_Y^2
\simeq\mathcal O_Y(-d).
$$

> 特に、$Y$ の余法層は階数1の局所自由層である。
<!-- formal-statement-end -->

### 証明の見取り図

各チャートの多項式環は整域なので、$(f_i)/(f_i^2)$ には一つの自由基底があります。重なりでその基底が変わる係数を上の式から読み取り、[可逆層の貼り合わせ](../AG2-06/index.md#prop-ag2-06-gluing-transitions)と比較します。ここでは滑らかさは不要ですが、**微分による法線方向の分離**には後で滑らかさを使います。

<!-- proof-start -->
### 証明

$A_i=\mathbb C[z_j^{(i)}:j\ne i]$ とします。$f_i$ は非零多項式なので $A_i$ の零因子ではありません。写像

$$
A_i/(f_i)\longrightarrow(f_i)/(f_i^2),
\quad \overline a\longmapsto\overline{af_i}
$$

は全射です。核を調べると、$af_i=b f_i^2$ なら $f_i(a-bf_i)=0$ であり、零因子でないことから $a=bf_i$ です。よって単射でもあります。この同型は局所化しても成り立ちます。

$U_i\cap U_j$ では $f_j=(X_i/X_j)^d f_i$ なので、商に移すと $\overline{f_j}=(X_i/X_j)^d\overline{f_i}$ です。[ $\mathcal O(-d)$ の遷移関数](../AG2-06/index.md#prop-ag2-06-od-cocycle)と一致し、三重交叉でも係数の積は $(X_i/X_k)^d$ となります。したがって各チャートの同型は貼り合わされます。
<!-- proof-end -->

**具体例。** $P=\mathbb P^2$ の二次曲線 $F=YZ-X^2$ では $U_Y$ 上で $f_Y=z-x^2$（$x=X/Y,z=Z/Y$）です。余法層の局所基底は $\overline{z-x^2}$、$U_Z$ 上では $\overline{y-x^2}$（$x=X/Z,y=Y/Z$）です。両者の比は $(Y/Z)^2$ です。局所的にはどちらも自由階数1ですが、貼り合わせ係数は定数1ではありません。したがって、局所自由であることと大域的に自明であることは異なります。

## 3. 微分すると何が失われるか

[多項式環と商環のKähler微分表示](../AG2-08/index.md#prop-ag2-08-polynomial-differentials)では、一方程式 $f=0$ の曲線上で $df=0$ という関係が生じます。一般に $I$ の元を微分すると、$I^2$ の元の微分は $Y$ へ制限したとき零になります。実際 $g,h\in I$ なら

$$
d(gh)|_Y=(g\,dh+h\,dg)|_Y=0.
$$

従って $[g]\mapsto dg|_Y$ は余法層から周囲の余接層の制限への写像を定めます。

<a id="thm-ag2-10-conormal-sequence"></a>

<!-- formal-statement-start -->
> **定理（滑らかな超曲面の余法完全列）**  
> $P=\mathbb P^n_{\mathbb C}$、$n\ge2$ とし、$Y=V_+(F)$ を次数 $d\ge1$ の斉次式で定まる超曲面とする。$Y$ の各点で $(F_{X_0},\ldots,F_{X_n})\ne0$ と仮定する。このとき自然な微分写像は局所分裂する短完全列

$$
0\longrightarrow\mathcal O_Y(-d)
\xrightarrow{\ dF\ }\Omega^1_P|_Y
\longrightarrow\Omega^1_Y\longrightarrow0
$$

> を与える。左辺の $dF$ はチャート $U_i$ で局所基底を $df_i$ に送るという意味であり、$\Omega^1_Y$ は階数 $n-1$ の局所自由層である。
<!-- formal-statement-end -->

### 証明の見取り図

商環の微分では $df_i$ を零とするので右側の全射は自然です。核心は**左からの単射**です。各点で $df_i$ の少なくとも一つの係数が非零なら、十分小さい主開近傍でその係数は単元です。そこでは $df_i$ を自由基底の一つに取り直せるので、列が直和に分かれます。

<!-- proof-start -->
### 証明

$Y\cap U_i$ を取って $A=\mathbb C[z_j:j\ne i]$、$B=A/(f_i)$ とします。[微分加群の商表示](../AG2-08/index.md#prop-ag2-08-polynomial-differentials)を使うと

$$
\Omega^1_A\otimes_A B
=\bigoplus_{j\ne i}B\,dz_j,\qquad
\Omega^1_B=
\left(\bigoplus_{j\ne i}B\,dz_j\right)/(df_i).
$$

したがって $B\overline f_i\to\bigoplus B dz_j$ は $\overline f_i\mapsto df_i=\sum_{j\ne i}(\partial f_i/\partial z_j)\,dz_j$ です。

各 $Q\in Y\cap U_i$ でこの係数のどれかが非零であることを確かめます。仮にすべて零なら、$F=X_i^d f_i$ の偏微分により $F_{X_j}(Q)=0$（$j\ne i$）です。さらに斉次式のEuler恒等式

$$
d\,F=\sum_{j=0}^n X_jF_{X_j}
$$

の左辺は次数 $d$ と多項式 $F$ の積です。この式に $Q$ を代入すると、$F(Q)=0$ から $X_i(Q)F_{X_i}(Q)=0$ です。$X_i(Q)\ne0$ なので $F_{X_i}(Q)=0$ となり仮定に矛盾します。従ってある $r\ne i$ に対し $a_r=\partial f_i/\partial z_r$ は $Q$ の近傍で単元です。

その主開近傍では

$$
df_i=a_r dz_r+\sum_{j\ne i,r}a_jdz_j,\qquad
dz_r=a_r^{-1}\left(df_i-\sum_{j\ne i,r}a_jdz_j\right).
$$

右辺の式から、$\{df_i,dz_j:j\ne i,r\}$ が自由階数 $n$ の基底であることが分かります。従って $B\,df_i$ は直和因子であり、商 $\Omega^1_B$ は残り $n-1$ 本を基底とする自由加群です。局所単射・全射・分裂をすべて得ました。

最後にチャートを替えると $f_j=u f_i$（$u=(X_i/X_j)^d$ は単元）なので

$$
df_j|_Y=(u\,df_i+f_i\,du)|_Y=u\,df_i|_Y.
$$

したがって微分写像は[余法層の遷移](#prop-ag2-10-conormal-hypersurface)と整合し、大域的な完全列になります。
<!-- proof-end -->

**局所的な確認。** $f=y-x^2$ なら

$$
B\,\overline f\longmapsto B\,(-2x\,dx+dy)
\subset B\,dx\oplus B\,dy.
$$

$dy$ の係数が1なので、$df$ と $dx$ が基底をなし、商は $dx$ を基底とします。$y=x^2$ を代入すると $dy=2x\,dx$ となることとも一致します。

## 4. 正規束と接完全列

微分1形式を測る「外向きの方向」ではなく、実際に接方向の空間を商にしたものが欲しい場合は、先ほどの局所分裂列を双対に取ります。局所自由層に限っているので双対も完全になります。ここで接層 $T_Y=\mathcal Hom(\Omega_Y^1,\mathcal O_Y)$ と定めます。[射影空間の接層](../AG2-09/index.md#def-ag2-09-tangent-sheaf)の定義と同じ作り方です。

<a id="thm-ag2-10-normal-tangent"></a>

<!-- formal-statement-start -->
> **定理（超曲面の正規束と接完全列）**  
> $Y=V_+(F)\subset\mathbb P^n_{\mathbb C}$ を、すべての点で斉次勾配が零でない次数 $d\ge1$ の超曲面とする。正規束と接層の間には自然な同型および局所分裂短完全列がある。

$$
N_{Y/P}\simeq\mathcal O_Y(d),
\qquad
0\longrightarrow T_Y\longrightarrow T_P|_Y
\xrightarrow{\ \nabla F\ }\mathcal O_Y(d)\longrightarrow0.
$$

> 最後の写像はチャート $U_i$ で接ベクトル $v$ を $df_i(v)$ に送り、$\mathcal O(d)$ の局所基底で表示したものである。
<!-- formal-statement-end -->

### 証明の見取り図

[余法完全列](#thm-ag2-10-conormal-sequence)を局所基底で双対化します。一方、[可逆層の双対公式](../AG2-06/index.md#prop-ag2-06-tensor-dual)が $\mathcal O(-d)^\vee=\mathcal O(d)$ を与えます。最後の写像の全射性も、局所的に $df_i$ の一成分が単元であることから直接確認します。

<!-- proof-start -->
### 証明

[余法完全列](#thm-ag2-10-conormal-sequence)は各点の近傍で

$$
0\to B\,df_i\to B\,df_i\oplus
\bigoplus_{j\ne i,r}B\,dz_j\to
\bigoplus_{j\ne i,r}B\,dz_j\to0
$$

と表せます。この列を $B$ 線形双対にすると

$$
0\to\operatorname{Hom}_B(\Omega^1_B,B)
\to\operatorname{Hom}_B(\Omega^1_A\otimes B,B)
\to\operatorname{Hom}_B(B\,df_i,B)\to0
$$

は完全です。中央は $T_P|_Y$、左は $T_Y$、右は $N_{Y/P}$ です。右側は[余法層の同型](#prop-ag2-10-conormal-hypersurface)の双対なので

$$
N_{Y/P}=(\mathcal I_Y/\mathcal I_Y^2)^\vee
\simeq\mathcal O_Y(-d)^\vee
\simeq\mathcal O_Y(d).
$$

局所基底の対応を見ると、接ベクトル $v=\sum v_j\partial/\partial z_j$ は $df_i(v)=\sum (\partial f_i/\partial z_j)v_j$ に送られます。前節で係数 $a_r$ が単元になる近傍を選んだので $v=a_r^{-1}\partial/\partial z_r$ の像は1です。従って右側は全射であり、局所分裂も明示されます。
<!-- proof-end -->

**具体例。** 直線 $H=\{X_n=0\}\subset\mathbb P^n$ は次数1の滑らかな超曲面です。正規束は $\mathcal O_H(1)$、一方で $H\simeq\mathbb P^{n-1}$ なので接層の階数は $n-1$ です。正規方向が階数1であることと、$n=(n-1)+1$ が一致します。

## 5. 行列式を取って随伴公式を導く

[前章で証明した局所分裂短完全列の行列式](../AG2-09/index.md#prop-ag2-09-determinant-exact)は、真ん中の行列式を左と右の行列式のテンソル積へ分解します。このとき局所的な「内側の微分 $n-1$ 本」と「法線方向の微分1本」の楔積が、周囲の微分 $n$ 本を作ります。

<a id="thm-ag2-10-adjunction"></a>

<!-- formal-statement-start -->
> **定理（滑らかな射影超曲面の随伴公式）**  
> $n\ge2$、$d\ge1$ とし、$Y=V_+(F)\subset\mathbb P^n_{\mathbb C}$ を次数 $d$ の斉次多項式で定義され、各点で斉次勾配が非零な滑らかな超曲面とする。$Y$ の標準束 $\omega_Y=\bigwedge^{n-1}\Omega_Y^1$ は

$$
\omega_Y\simeq
\bigl(\omega_{\mathbb P^n}\otimes\mathcal O_{\mathbb P^n}(d)\bigr)|_Y
\simeq\mathcal O_Y(d-n-1)
$$

> に同型である。
<!-- formal-statement-end -->

### 証明の見取り図

余法完全列の行列式は周囲の標準束と部分多様体の標準束を比較します。余法層が $\mathcal O_Y(-d)$ だから、その逆数として $\mathcal O_Y(d)$ が出ます。最後に[射影空間の標準束の公式](../AG2-09/index.md#thm-ag2-09-canonical-projective)を代入します。

<!-- proof-start -->
### 証明

[余法完全列](#thm-ag2-10-conormal-sequence)の三項はいずれも局所自由で、階数は $1,n,n-1$ です。[行列式命題](../AG2-09/index.md#prop-ag2-09-determinant-exact)を左項 $L=\mathcal O_Y(-d)$、中央項 $E=\Omega_P^1|_Y$、右項 $Q=\Omega_Y^1$ に適用すると

$$
\det E\simeq(\det L)\otimes(\det Q).
$$

ここで $\det E=\omega_P|_Y$、$\det L=L$、$\det Q=\omega_Y$ です。従って

$$
\omega_P|_Y\simeq\mathcal O_Y(-d)\otimes\omega_Y.
$$

両辺へ $\mathcal O_Y(d)$ をテンソルすると、[テンソル積と双対](../AG2-06/index.md#prop-ag2-06-tensor-dual)より

$$
\omega_Y\simeq\omega_P|_Y\otimes\mathcal O_Y(d).
$$

[射影空間の標準束](../AG2-09/index.md#thm-ag2-09-canonical-projective)を $P=\mathbb P^n$ に適用すると $\omega_P\simeq\mathcal O_P(-n-1)$ なので、その制限を取り

$$
\omega_Y\simeq
\mathcal O_Y(-n-1)\otimes\mathcal O_Y(d)
\simeq\mathcal O_Y(d-n-1).
$$

この証明では $\mathcal O_Y(-d)$ が余法層、$\mathcal O_Y(d)$ が正規束である点を区別しています。
<!-- proof-end -->

### 具体例を三つ比べる

- **射影超平面**：$d=1$ なら $\omega_H\simeq\mathcal O_H(-n)$。$H\simeq\mathbb P^{n-1}$ の[標準束公式](../AG2-09/index.md#thm-ag2-09-canonical-projective)と同じです。
- **平面三次曲線**：$n=2,d=3$ なら $\omega_C\simeq\mathcal O_C$。[既習の滑らかな三次曲線の非消失1形式](../AG2-08/index.md#thm-ag2-08-cubic-form)とも一致します。
- **射影4次元空間の五次超曲面**：$n=4,d=5$ なら $\omega_X\simeq\mathcal O_X$。ただし標準束が自明という結論だけから、他のコホモロジー条件まで含む定義を満たすと主張することはできません。

## 6. 局所座標で随伴公式の「逆数」を見る

抽象的な行列式だけで符号を覚えると、$\mathcal O(d)$ と $\mathcal O(-d)$ を取り違えやすくなります。$U_i$ 上で $f_i=0$ とし、ある座標 $z_r$ に関する係数 $a_r=\partial f_i/\partial z_r$ が零でない近傍を取ります。ほかの座標の微分を順に並べた $(n-1)$ 形式を $\eta$ とすると、$df_i$ を最初に並べた楔積は

$$
df_i\wedge\eta=\pm a_r\,dz_1\wedge\cdots\wedge dz_n.
$$

ここで $\pm$ は座標を並べ替える符号です。$a_r$ が単元なので

$$
\frac{dz_1\wedge\cdots\wedge dz_n}{a_r}
$$

を $Y$ に沿って考えると、$\eta$ と同じ局所基底を表します（符号は選んだ順序で固定します）。これは超曲面上の標準形式を**周囲の最高次形式を方程式の微分係数で割ったもの**として読む方法です。

<a id="prop-ag2-10-local-residue"></a>

<!-- formal-statement-start -->
> **命題（局所随伴形式）**  
> $Y\subset\mathbb P^n_{\mathbb C}$ を滑らかな超曲面とし、$U_i$ のアフィン座標 $z_1,\ldots,z_n$ で $Y$ が $f_i=0$ により定まるとする。$a_r=\partial f_i/\partial z_r$ が単元な近傍では、$Y$ の標準束の局所基底は

$$
\eta_r=(-1)^{r-1}
\frac{dz_1\wedge\cdots\wedge
\widehat{dz_r}\wedge\cdots\wedge dz_n}{a_r}
$$

> で与えられる。ここで $\widehat{dz_r}$ はその因子を取り除くことを表す。
<!-- formal-statement-end -->

### 証明の見取り図

$df_i$ を第1因子にした楔積が周囲の最高次微分を再現するよう、$a_r$ で割ります。別の $r$ を選んだときにも、$\Omega_Y^1$ の関係 $df_i=0$ のため、生成される最高次形式は一致します。

<!-- proof-start -->
### 証明

$\eta^{(r)}=dz_1\wedge\cdots\wedge\widehat{dz_r}\wedge\cdots\wedge dz_n$ と置きます。$df_i=\sum_s a_sdz_s$ より、同じ因子が二度現れる項が消えて

$$
df_i\wedge\eta^{(r)}
=a_r\,dz_r\wedge\eta^{(r)}
=(-1)^{r-1}a_r\,dz_1\wedge\cdots\wedge dz_n.
$$

よって命題の $\eta_r$ では $df_i\wedge\eta_r=dz_1\wedge\cdots\wedge dz_n$ です。$a_r$ が単元なので $\eta_r$ は $\Omega_Y^1$ の残る $n-1$ 本の微分の楔積の単元倍であり、局所基底です。

別の添字 $s$ でも $a_s$ が単元なら、$\Omega_Y^1$ 上で $df_i=0$ すなわち $\sum_j a_jdz_j=0$ です。両辺に $n-2$ 本の他の座標微分を楔積し、順序を揃えると $(-1)^{r-1}a_s\eta^{(r)}=(-1)^{s-1}a_r\eta^{(s)}$ となります。両辺を単元 $a_ra_s$ で割れば $\eta_r=\eta_s$ が得られます（固定した座標順を使用）。従って定義は法線方向の座標選択に依存しません。
<!-- proof-end -->

**具体例。** 平面三次曲線 $F=Y^2Z-X^3-XZ^2-Z^3$ の $Z\ne0$ チャートでは $f=y^2-x^3-x-1$ です。$f_y=2y\ne0$ の近傍で $r=y$ と取れば $\eta_y=-dx/(2y)$（符号は順序による）を得ます。$f_x=-(3x^2+1)\ne0$ の近傍では $\eta_x=dy/f_x$ です。$df=f_xdx+f_ydy=0$ から

$$
\frac{dy}{f_x}=-\frac{dx}{f_y},
$$

となり局所形式が貼り合うことを確認できます。これは[三次曲線の局所的な微分形式](../AG2-08/index.md#thm-ag2-08-cubic-form)と符号を除いて同じ構成です。

## 7. 一方程式から複数方程式へ

超曲面では外向きの方向が一本でした。複数方程式の共通零点では、方程式が独立である限り、外向きの方向もその本数だけあります。

<a id="thm-ag2-10-complete-intersection"></a>

<!-- formal-statement-start -->
> **定理（滑らかな射影完全交叉の正規束と随伴公式）**  
> $P=\mathbb P^n_{\mathbb C}$ とし、$F_1,\ldots,F_r$ をそれぞれ次数 $d_1,\ldots,d_r\ge1$ の斉次式とする。$1\le r<n$ とし、それらが定義する閉部分集合 $Y$ は余次元 $r$ のスキーム論的完全交叉で、各点でアフィン局所方程式 $f_1,\ldots,f_r$ のJacobian行列が階数 $r$ を持つと仮定する。このとき

$$
N_{Y/P}\simeq\bigoplus_{a=1}^r\mathcal O_Y(d_a),
\qquad
\omega_Y\simeq\mathcal O_Y\left(
\sum_{a=1}^r d_a-n-1\right).
$$

> また $\Omega_Y^1$ は階数 $n-r$ の局所自由層である。
<!-- formal-statement-end -->

### 証明の見取り図

一方程式の $df$ を $r$ 本の $df_a$ に替えます。Jacobianの階数 $r$ は、$r$ 本の微分を周囲の余接層の局所基底の一部にできることを保証します。余法束の行列式は $\mathcal O_Y(-\sum d_a)$ になります。

<!-- proof-start -->
### 証明

$U_i$ では $f_{a,i}=F_a/X_i^{d_a}$ を使います。仮定より $Y\cap U_i$ のイデアルは $I=(f_{1,i},\ldots,f_{r,i})$ です。商 $I/I^2$ は $\overline{f_{a,i}}$ で生成されます。任意の局所関係 $\sum_a b_a\overline{f_{a,i}}=0$ を微分して $Y$ に制限すると

$$
\sum_{a=1}^r b_a|_Y\,df_{a,i}=0.
$$

Jacobianの階数仮定から、局所化後に階数 $r$ の小行列式が単元になります。よって $df_{a,i}$ は線形独立であり、すべての $b_a|_Y=0$ です。従って $I/I^2$ は自由階数 $r$ で、基底は $\overline{f_{a,i}}$ です。

重なりでは各 $f_{a,j}=(X_i/X_j)^{d_a}f_{a,i}$ なので

$$
I/I^2\simeq\bigoplus_{a=1}^r\mathcal O_Y(-d_a).
$$

前節と同じ商微分の構成から

$$
0\to I/I^2\to\Omega_P^1|_Y\to\Omega_Y^1\to0
$$

は、Jacobianの可逆小行列式を選んだ近傍で分裂します。双対を取ると $N_{Y/P}\simeq\bigoplus_a\mathcal O_Y(d_a)$ です。また[局所分裂列の行列式](../AG2-09/index.md#prop-ag2-09-determinant-exact)から

$$
\omega_P|_Y\simeq
\left(\bigotimes_{a=1}^r\mathcal O_Y(-d_a)\right)\otimes\omega_Y.
$$

各因子へ逆可逆層を掛け、[射影空間の標準束](../AG2-09/index.md#thm-ag2-09-canonical-projective) $\omega_P|_Y=\mathcal O_Y(-n-1)$ を代入して

$$
\omega_Y\simeq\mathcal O_Y(-n-1)\otimes
\bigotimes_{a=1}^r\mathcal O_Y(d_a)
=\mathcal O_Y\left(\sum_a d_a-n-1\right)
$$

を得ます。
<!-- proof-end -->

**例。** $\mathbb P^3$ 内の二つの二次式が横断的に交わる滑らかな曲線なら、$r=2$ かつ $d_1=d_2=2$ なので $\omega_Y\simeq\mathcal O_Y(0)$ です。これは三次曲線とは異なる方程式から標準束の自明性が現れる例です。横断性を落とすとJacobianの可逆小行列式が得られず、この局所分裂の証明は使えません。

## 8. 滑らかさの仮定はどこに効いたか

次数と方程式の本数だけを見れば、特異な超曲面にも形式的に $d-n-1$ と書けそうです。しかし本章で定義した $\omega_Y=\bigwedge^{\dim Y}\Omega_Y^1$ を可逆層として扱える理由は、[余法完全列](#thm-ag2-10-conormal-sequence)が局所分裂し、$\Omega_Y^1$ が局所自由になることです。

例えばアフィン尖点 $C=\{y^2-x^3=0\}$ では

$$
df=-3x^2\,dx+2y\,dy
$$

であり、原点では両方の係数が零です。原点の局所環の極大イデアルを $\mathfrak m$ とすると、$\Omega_C^1/\mathfrak m\Omega_C^1$ は $dx,dy$ の二次元空間となります。一方、原点以外の滑らかな点では $\Omega_C^1$ は階数1です。原点で自由階数1なら剰余体とのテンソルは一次元でなければならず、矛盾します。このため尖点では $\Omega_C^1$ を階数1の局所自由層とみなせません。特異曲線に対する双対化層の公式は別の理論を必要とします。

この違いは、公式を暗記するよりも重要です。**滑らかさは「微分の係数が単元になる」ことによって局所分裂を成立させていました。**

## 9. 演習：外向きの方向から標準束まで

### A1. 放物線の余法層

$A=\mathbb C[x,y]$、$I=(y-x^2)$ とする。$I/I^2$ の基底を一つ示し、$\Omega_A^1\otimes A/I$ への像と曲線の余接加群の基底を求めよ。

- Level: A
- ID: AG2-10-A1

<!-- solution-start -->
**詳細解答。** $f=y-x^2$ は整域 $A$ の非零元なので、[余法層の局所計算](#prop-ag2-10-conormal-hypersurface)と同じ消去から $\overline f$ が $I/I^2$ の基底です。微分の積の規則により $df=dy-2x\,dx$ なので像は $B(dy-2x\,dx)$（$B=A/I$）です。$\Omega_B^1=(Bdx\oplus Bdy)/(dy-2xdx)$ であり、$dy=2x\,dx$ により $dx$ が基底です。実際、$Bdx\oplus Bdf$ から $Bdx\oplus Bdy$ への基底変換行列は行列式1で可逆です。
<!-- solution-end -->

### A2. 直線の正規束

$H=\{X_2=0\}\subset\mathbb P^2$ とする。各チャートの方程式の遷移を計算し、$N_{H/\mathbb P^2}$ を求めよ。

- Level: A
- ID: AG2-10-A2

<!-- solution-start -->
**詳細解答。** $U_0$ の方程式は $f_0=X_2/X_0$、$U_1$ では $f_1=X_2/X_1$ です。重なりで $f_1=(X_0/X_1)f_0$ なので、余法層は[超曲面の余法層命題](#prop-ag2-10-conormal-hypersurface)の $d=1$ と同じ $\mathcal O_H(-1)$ です。双対を取って $N_{H/\mathbb P^2}\simeq\mathcal O_H(1)$ となります。$F=X_2$ は偏微分 $F_{X_2}=1$ を持つため、滑らかさの仮定も満たします。
<!-- solution-end -->

### A3. 平面曲線の標準束の次数係数

滑らかな平面曲線 $C\subset\mathbb P^2$ の次数を $d=1,2,3,4$ とするとき、$\omega_C$ をそれぞれ $\mathcal O_C(m)$ の形で書け。

- Level: A
- ID: AG2-10-A3

<!-- solution-start -->
**詳細解答。** [随伴公式](#thm-ag2-10-adjunction)へ $n=2$ を代入すると $m=d-2-1=d-3$ です。従って $d=1$ では $\mathcal O_C(-2)$、$d=2$ では $\mathcal O_C(-1)$、$d=3$ では $\mathcal O_C(0)$、$d=4$ では $\mathcal O_C(1)$ です。$m$ はここでは $\mathcal O_C(m)$ のねじれ指数であり、曲線上の因子次数 $m$ と同一視してはいけません。
<!-- solution-end -->

### A4. 接方向と正規方向

$C=\{y-x^2=0\}\subset\mathbb A^2$ の点 $(a,a^2)$ で、接ベクトルの基底を求め、$df$ が正規方向への全射になることを確認せよ。

- Level: A
- ID: AG2-10-A4

<!-- solution-start -->
**詳細解答。** $df=-2x\,dx+dy$ を点 $(a,a^2)$ で評価すると $(u,v)\mapsto-2au+v$ です。核は $v=2au$ の一次元空間で、$(1,2a)$ が基底です。$(0,1)$ の像は1なのでこの線形写像は全射です。従って $\mathbb C^2/\mathbb C(1,2a)$ は一次元であり、商の元 $(0,1)$ が正規方向を代表します。
<!-- solution-end -->

### B1. 局所分裂を実際に書く

$B=\mathbb C[x,y]/(y-x^2)$ 上の列 $0\to B\,df\to Bdx\oplus Bdy\to\Omega_B^1\to0$ について、右側への分裂（$\Omega_B^1\to Bdx\oplus Bdy$）を一つ構成し、全射の右逆であることを確認せよ。

- Level: B
- ID: AG2-10-B1

<!-- solution-start -->
**詳細解答。** $\Omega_B^1$ は $dx$ を基底とするので $s(h\,dx)=h\,dx$ と定めます。$Bdx\oplus Bdy$ から $\Omega_B^1$ への商写像を $q$ とすると、$q(s(hdx))=q(hdx)=hdx$ なので $q\circ s=\mathrm{id}$ です。任意の $a\,dx+b\,dy$ は

$$
a\,dx+b\,dy=(a+2xb)dx+b(dy-2xdx)
$$

と一意に書けます。第2項は $Bdf$ に属し、第1項は $s(\Omega_B^1)$ に属するので、直和分解も確認できました。
<!-- solution-end -->

### B2. 射影平面二次曲線での局所式

$C=\{YZ-X^2=0\}\subset\mathbb P^2$ とする。$U_Y$ での局所方程式と微分を求め、そのチャート内で $\Omega_C^1$ の基底を決めよ。$C$ が射影的に滑らかであることも斉次偏微分で確認せよ。

- Level: B
- ID: AG2-10-B2

<!-- solution-start -->
**詳細解答。** $Y\ne0$ では $x=X/Y,z=Z/Y$ とし $f=z-x^2=0$、$df=dz-2x\,dx$ です。$df$ の $dz$ 係数は1なので、[余法完全列](#thm-ag2-10-conormal-sequence)より $\Omega_C^1|_{U_Y\cap C}=B\,dx$ です。斉次式 $F=YZ-X^2$ の偏微分は $(-2X,Z,Y)$ で、同時に零なら $X=Y=Z=0$ となり射影点ではありません。従って $C$ は滑らかです。$U_Y$ の一つの微分基底だけでは、標準束が大域的に自明とは結論できません。
<!-- solution-end -->

### B3. 平面三次曲線の標準束

$C=\{Y^2Z-X^3-XZ^2-Z^3=0\}\subset\mathbb P^2$ について、滑らかさを確認し、随伴公式で $\omega_C$ を求めよ。$Z\ne0$ で $2y\ne0$ の近傍における標準形式を与えよ。

- Level: B
- ID: AG2-10-B3

<!-- solution-start -->
**詳細解答。** $F_X=-3X^2-Z^2$、$F_Y=2YZ$、$F_Z=Y^2-2XZ-3Z^2$ です。$Z\ne0$ のチャートでは $f=y^2-x^3-x-1$ で、$f_x=-(3x^2+1)$、$f_y=2y$ です。両方零なら $y=0,x^2=-1/3$ ですが、$f=0$ は $x^3+x+1=x(x^2+1)+1=(2/3)x+1=0$ を要求し $x=-3/2$ となって矛盾します。$Z=0$ 上の曲線点は $[0:1:0]$ だけで、そこで $F_Z=Y^2\ne0$ です。よって滑らかです。[随伴公式](#thm-ag2-10-adjunction)へ $n=2,d=3$ を入れて $\omega_C=\mathcal O_C(0)$ となります。[局所随伴形式](#prop-ag2-10-local-residue)で $(z_1,z_2)=(x,y),r=2$ とすると $\eta=-dx/(2y)$ です。符号を変えた $dx/(2y)$ も局所基底です。
<!-- solution-end -->

### B4. 二つの二次方程式の独立性

$\mathbb P^3$ で

$$
F_1=X_0^2+X_1^2+X_2^2+X_3^2,\qquad
F_2=X_1^2+2X_2^2+3X_3^2
$$

と置く。共通零点上で二つの斉次勾配が独立であることを示し、完全交叉としての余法束・正規束・標準束を求めよ。

- Level: B
- ID: AG2-10-B4

<!-- solution-start -->
**詳細解答。** 二つの勾配は $2(X_0,X_1,X_2,X_3)$、$2(0,X_1,2X_2,3X_3)$ です。独立でないとすると、ある $\lambda$ に対して $(0,X_1,2X_2,3X_3)=\lambda(X_0,X_1,X_2,X_3)$ です。非零な $X_j$ に対応する値 $0,1,2,3$ はすべて異なるので、非零座標は高々一つです。しかし一つだけ非零なら $F_1=X_j^2\ne0$ となり共通零点ではありません。従って勾配は独立です。例として $[1:i\sqrt2:1:0]$ は $F_1=1-2+1=0$、$F_2=-2+2=0$ を満たすため、空集合の議論ではありません。局所方程式は階数2のJacobianを持ち、余次元2の滑らかな完全交叉です。[完全交叉の定理](#thm-ag2-10-complete-intersection)から余法束は $\mathcal O_Y(-2)^{\oplus2}$、正規束は $\mathcal O_Y(2)^{\oplus2}$、標準束は $\mathcal O_Y(2+2-3-1)=\mathcal O_Y$ です。
<!-- solution-end -->

### C1. 曲線二例の標準束を比較する

滑らかな平面二次曲線 $C_2\subset\mathbb P^2$ と滑らかな平面三次曲線 $C_3\subset\mathbb P^2$ を考える。随伴公式でそれぞれの標準束を求めよ。さらに $C_2$ を二次Veronese写像による $\mathbb P^1$ と同一視したとき、$\mathcal O_{C_2}(1)$ の引き戻しを求め、$\omega_{\mathbb P^1}$ と整合することを示せ。

- Level: C
- ID: AG2-10-C1

<!-- solution-start -->
**詳細解答。** [随伴公式](#thm-ag2-10-adjunction)は $n=2$ で $\omega_C\simeq\mathcal O_C(d-3)$ を与えます。$d=2$ なら $\omega_{C_2}\simeq\mathcal O_{C_2}(-1)$、$d=3$ なら $\omega_{C_3}\simeq\mathcal O_{C_3}$ です。[二次Veronese写像](../AG2-03/index.md#prop-ag2-03-veronese-embedding)は $\nu_2([S:T])=[S^2:ST:T^2]$ で、標準チャート $S\ne0$ の座標 $t=T/S$ を $\nu_2$ で送ると $[1:t:t^2]$ です。$U_X$ の超平面切断 $Z=0$ は、引き戻すと斉次二次式 $T^2=0$ になります。一般に斉次一次式 $aX+bY+cZ$ は引き戻すと $aS^2+bST+cT^2$ であるため、[斉次式と $\mathcal O(d)$ の対応](../AG2-06/index.md#prop-ag2-06-homogeneous-sections)から $\nu_2^*\mathcal O_{C_2}(1)\simeq\mathcal O_{\mathbb P^1}(2)$ です。よって

$$
\nu_2^*\omega_{C_2}
\simeq\nu_2^*\mathcal O_{C_2}(-1)
\simeq\mathcal O_{\mathbb P^1}(-2),
$$

となり[射影直線の標準束](../AG2-08/index.md#thm-ag2-08-p1-canonical)と一致します。
<!-- solution-end -->

### C2. 特異点での失敗と完全交叉での成功

(a) 尖点曲線 $C=\{y^2-x^3=0\}\subset\mathbb A^2$ の原点で、余法写像が局所直和因子を与えるという本章の証明が使えない理由を示せ。(b) $\mathbb P^3$ 内の次数2と3の二式による滑らかな完全交叉曲線 $D$ の正規束と標準束を計算せよ。二つの計算で使った仮定の違いを説明せよ。

- Level: C
- ID: AG2-10-C2

<!-- solution-start -->
**詳細解答。** (a) $f=y^2-x^3$ では $df=2y\,dy-3x^2\,dx$ です。原点の極大イデアル $\mathfrak m=(x,y)$ で係数 $2y,-3x^2$ は両方 $\mathfrak m$ に入ります。もし $B\,df$ が $Bdx\oplus Bdy$ の直和因子で商が自由階数1なら、$df$ を基底の一つに拡張でき、係数の少なくとも一つが単元になる必要がありますが、どちらも単元ではありません。従って[余法完全列の局所分裂](#thm-ag2-10-conormal-sequence)の証明は成立しません。これは余法写像が必ず非単射という主張ではありません。(b) $D$ ではJacobian階数がすべての点で2であると仮定されているので、[完全交叉の定理](#thm-ag2-10-complete-intersection)を $n=3,r=2,d_1=2,d_2=3$ に適用できます。正規束は $\mathcal O_D(2)\oplus\mathcal O_D(3)$、標準束は

$$
\omega_D\simeq\mathcal O_D(2+3-3-1)=\mathcal O_D(1).
$$

(a) で失われたのは微分係数の単元性（Jacobian階数）で、(b) はその条件を明示したため局所分裂と行列式の計算が正当化されました。
<!-- solution-end -->

## 10. 次へつながる問い

滑らかな超曲面では、局所方程式の微分が一本の法線方向を分け、随伴公式はその方向のねじれを標準束に戻す操作でした。一方、滑らかさをどこまで方程式から判定できるか、特異な場合に何が変わるかはさらに詳しく調べる価値があります。次章では超曲面のJacobian条件と局所正則性を、具体的な特異点と比較して掘り下げます。
