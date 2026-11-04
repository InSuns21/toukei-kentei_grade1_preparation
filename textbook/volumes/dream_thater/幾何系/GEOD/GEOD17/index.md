# GEOD17 Krüger 級数による順変換

[GEOD16の楕円体横メルカトル](../GEOD16/index.md#def-geod16-ellipsoidal-transverse)は、中央子午線上の実際の弧長と一致する正則補正を使って、等角性と距離の規格化を同時に実現しました。しかし「中央上の値を正則に延長する」という存在の説明だけでは、緯度・経度を入力して平面座標を数値計算できません。

本章では、その補正を**第三扁平率による三角級数**へ展開します。中心となる問いは、「なぜこの正弦級数なのか」「最初の係数をどう導くのか」「有限項で計算した結果の誤差をどう読むのか」の三つです。次章GEOD18で扱う逆変換と子午線収差はまだ使いません。

本章の到達目標は次です。

1. 第三扁平率 $n$ と赤道から極までの弧長を基準とする係数 $A$ を導く。
2. 測地緯度から等角緯度、球面横メルカトル座標、Krüger補正へ進む順変換を構成する。
3. 弧長規格化から $\alpha_1,\alpha_2$ の二次までの係数を再導出し、四次係数の使い方を説明する。
4. 中央縮尺、緯度原点、偽東距・偽北距、対称性、次数打切りと浮動小数点丸めを区別する。

角度はすべてラジアンで、楕円体の長半径 $a$、短半径 $b$ は $a\ge b>0$ とします。第一離心率 $e=\sqrt{1-b^2/a^2}$、測地緯度 $-\pi/2<\phi<\pi/2$、中央経度差 $\delta=\lambda-\lambda_0$ は東向きを正とします。まず $\cos\chi\cos\delta>0$ の局所的な枝に限ります。$E$ は東、$N_p$ は北への平面座標であり、卯酉線曲率半径 $N(\phi)$ と $N_p$ を混同しません。

---

## 1. 扁平率ではなく第三扁平率を選ぶ

### 1.1 小さい展開変数と子午線の平均目盛り

[GEOD3の扁平率・第三扁平率の定義](../GEOD3/index.md#def-geod3-shape-parameters)を再利用します。$f=(a-b)/a$ を使っても展開できますが、$a,b$ を対称に扱う次の比を採ると、子午線弧長の係数が簡潔になります。

$$
\boxed{n=\frac{a-b}{a+b}=\frac{f}{2-f}},\qquad
\frac ba=\frac{1-n}{1+n},\qquad
e^2=\frac{4n}{(1+n)^2}
$$

ここで $0\le n<1$ で、球面なら $n=0$ です。

**換算の確認。** $a=5,b=4$ なら $n=(5-4)/(5+4)=1/9$、$f=1/5$ なので $f/(2-f)=(1/5)/(9/5)=1/9$。さらに $e^2=4(1/9)/(10/9)^2=9/25$ で、直接計算 $1-4^2/5^2=9/25$ と一致します。球面 $a=b$ なら分子が0で、ほかの三式も $b/a=1,e=0$ を返します。

実際の子午線弧長を角度のように無次元化したいので、赤道から極までの弧長の $2/\pi$ 倍を **子午線の平均半径 $A$** とします。球面なら半径そのものです。ここで $s$ は[GEOD11の符号付き子午線弧長](../GEOD11/index.md#def-geod11-meridian-arc)で、$M$ は[GEOD4の子午線曲率半径](../GEOD4/index.md#def-geod4-curvature-radii)です。

<a id="def-geod17-meridian-a"></a>
<!-- formal-statement-start -->
> **定義（子午線平均半径）**
> $a\ge b>0$ の楕円体で、子午線弧長を

$$
s(\phi)=\int_0^\phi M(t)\,dt,\qquad
M(t)=\frac{a(1-e^2)}{(1-e^2\sin^2t)^{3/2}}
$$

> としたとき、長さの次元を持つ正定数 $A$ を

$$
\boxed{A=\frac{2}{\pi}s\left(\frac{\pi}{2}\right)}
$$

> とする。球面では $A=a$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod17-meridian-a -->
**定義の確認**（球面）。$a=b=R$ では $M=R$ が緯度に依存しません。積分すると $s(\pi/2)=R\pi/2$、よって $A=(2/\pi)(R\pi/2)=R$。平均半径という名称の理由を、積分で確かめられました。
<!-- definition-example-end -->

### 1.2 $A$ の初項を自分で計算する

$A$ を単なる係数表で与えるのではなく、[曲率半径の公式](../GEOD4/index.md#def-geod4-curvature-radii)から求めます。$A_0=a/(1+n)$ と置き、$e^2=4n/(1+n)^2$ を代入すると

$$
\frac{M(\phi)}{A_0}
=\frac{(1-n)^2}{1+n}
\left(1-\frac{4n}{(1+n)^2}\sin^2\phi\right)^{-3/2}.
$$

この式の二行目は**積**です。$n=0$ の周りで $(1+u)^{-3/2}=1-\tfrac32u+\tfrac{15}{8}u^2+O(u^3)$ を用い、$u=-(4n-8n^2)\sin^2\phi+O(n^3)$ を代入すれば

$$
\begin{aligned}
\frac{(1-n)^2}{1+n}&=1-3n+4n^2+O(n^3),\\
\left(1-e^2\sin^2\phi\right)^{-3/2}
&=1+6n\sin^2\phi
+n^2(-12\sin^2\phi+30\sin^4\phi)+O(n^3).
\end{aligned}
$$

積をとり、$\sin^2\phi=(1-\cos2\phi)/2$ と $\sin^4\phi=(3-4\cos2\phi+\cos4\phi)/8$ で整理すると

$$
\boxed{\frac{M(\phi)}{A_0}
=1-3n\cos2\phi
+n^2\left(\frac14+\frac{15}{4}\cos4\phi\right)+O(n^3).}
$$

赤道から極まで積分すると $\int_0^{\pi/2}\cos(2j\phi)\,d\phi=0$ なので

$$
\frac{s(\pi/2)}{A_0}
=\frac{\pi}{2}\left(1+\frac14n^2\right)+O(n^3),
\qquad
\boxed{A=\frac a{1+n}\left(1+\frac14n^2+O(n^4)\right).}
$$

三次の消失も確かめられます。上の積をさらに展開すると $n^3$ の係数は

$$
-4+78\sin^2\phi-210\sin^4\phi+140\sin^6\phi.
$$

$[0,\pi/2]$ 上で $\sin^2,\sin^4,\sin^6$ の平均が順に $1/2,3/8,5/16$ なので、この係数の平均は $-4+39-210(3/8)+140(5/16)=0$。従って $A/A_0$ に三次項はありません。四次まで展開すると $n^4/64$ が現れます。以後、四次近似には

$$
\boxed{A_4=\frac a{1+n}\left(1+\frac14n^2+\frac1{64}n^4\right)}
$$

を使います。$A$ の高次係数と精度は [PROJ の横メルカトル定義](https://proj.org/en/stable/operations/projections/tmerc.html) と照合できます。

---

## 2. 中央子午線の弧長から正弦級数へ

### 2.1 二つの緯度を接続する

[GEOD14の等角緯度 $\chi$](../GEOD14/index.md#def-geod14-conformal-latitude)は楕円体を角度保存の中間球面へ写す緯度です。一方、子午線弧長を $A$ で割ると、その角度に比例した距離が正しくなる別の緯度が得られます。この距離に基づく緯度を次で導入します。

<a id="def-geod17-rectifying-latitude"></a>
<!-- formal-statement-start -->
> **定義（正距緯度）**
> 上記楕円体の $A>0$ と符号付き子午線弧長 $s(\phi)$ に対して

$$
\boxed{\mu(\phi)=\frac{s(\phi)}A}
$$

> を正距緯度とする。$\mu(0)=0$、$\mu(\pm\pi/2)=\pm\pi/2$ であり、中央子午線で $A\,d\mu=M(\phi)\,d\phi$ が成り立つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod17-rectifying-latitude -->
**定義の確認**（球面）。$a=b=R$ では $s(\phi)=R\phi$、$A=R$ だから $\mu=\phi=\chi$。$\mu(0)=0$、両極では $\pm\pi/2$ となり、微分して $R\,d\mu=R\,d\phi=M\,d\phi$。非球面では $\mu$ と $\chi$ は一般には異なります。
<!-- definition-example-end -->

GEOD16の[中央子午線の規格化関数](../GEOD16/index.md#def-geod16-meridian-normalization)は $aG(\chi)=s(\phi)$ でした。したがって必要な補正を $A$ で測れば

$$
\frac aA G(\chi)=\mu(\phi(\chi)).
$$

偶関数である $M(\phi)$ の周期性と、赤道・極での対称性から、$\mu(\chi)-\chi$ は赤道で奇、極で0となり、連続延長すると周期 $\pi$ の奇関数になります。滑らかで扁平率の小さい楕円体では、その周期関数を $\sin(2j\chi)$ の和で表せます。正距緯度への変換は

$$
\mu=\chi+\alpha_1\sin2\chi+\alpha_2\sin4\chi+\cdots
$$

の形になります。中央子午線の実数上では **等角緯度 $\chi$ を正距緯度 $\mu$ へ直す**ことが係数の役目です。

### 2.2 二次係数の導出

係数を見つけるため、まず測地緯度 $\phi$ を共通の変数にします。上節の $M$ の展開を $0$ から $\phi$ まで積分し、$A=A_0(1+n^2/4+O(n^4))$ で割ると

$$
\begin{aligned}
\frac{s(\phi)}{A_0}
&=\phi-\frac32n\sin2\phi
+n^2\left(\frac14\phi+\frac{15}{16}\sin4\phi\right)+O(n^3),\\
\mu(\phi)
&=\phi-\frac32n\sin2\phi
+\frac{15}{16}n^2\sin4\phi+O(n^3).
\end{aligned}
$$

一方、[等角緯度の積分式](../GEOD14/index.md#def-geod14-conformal-latitude)は

$$
\chi=\arctan\sinh\left(\operatorname{asinh}(\tan\phi)
-e\operatorname{atanh}(e\sin\phi)\right)
$$

です。$q=e^2$、$t=\operatorname{asinh}(\tan\phi)$ と置きます。$\sinh t=\tan\phi$、$\cosh t=1/\cos\phi$ （非極点）で、差し引く量を

$$
u=e\operatorname{atanh}(e\sin\phi)
=q\sin\phi+\frac{q^2}{3}\sin^3\phi+O(q^3)
$$

とすると、$\sinh(t-u)=\tan\phi-u/\cos\phi+u^2\tan\phi/2+O(u^3)$。この値の $\arctan$ を $\tan\phi$ の周りで二次まで Taylor 展開する際、一次の係数は $\cos^2\phi$、二次の係数は $-\sin\phi\cos^3\phi$ です。従って

$$
\begin{aligned}
\chi&=\phi-\cos\phi\,u-\frac12\sin\phi\cos\phi\,u^2+O(u^3)\\
&=\phi-q\sin\phi\cos\phi
-\frac56q^2\sin^3\phi\cos\phi+O(q^3).
\end{aligned}
$$

$\sin\phi\cos\phi=\sin2\phi/2$、$\sin^3\phi\cos\phi=\sin2\phi/4-\sin4\phi/8$、さらに $q=4n-8n^2+O(n^3)$ を代入して

$$
\chi(\phi)
=\phi-2n\sin2\phi
+n^2\left(\frac23\sin2\phi+\frac53\sin4\phi\right)+O(n^3).
$$

この逆を $\phi=\chi+2n\sin2\chi+n^2(c\sin2\chi+d\sin4\chi)+O(n^3)$ と仮定し、右辺を $\chi(\phi)$ に代入します。一次の $\phi-\chi=2n\sin2\chi+O(n^2)$ を使って

$$
\sin2\phi=\sin2\chi+4n\sin2\chi\cos2\chi+O(n^2)
=\sin2\chi+2n\sin4\chi+O(n^2).
$$

従って二次の $\sin2\chi,\sin4\chi$ の係数比較は

$$
c+\frac23=0,\qquad d-4+\frac53=0,
\qquad
\boxed{\phi=\chi+2n\sin2\chi
+n^2\left(-\frac23\sin2\chi+\frac73\sin4\chi\right)+O(n^3).}
$$

これを $\mu(\phi)$ に入れ、$\sin2\phi$ の一次補正も残すと

$$
\begin{aligned}
\mu
&=\chi+2n\sin2\chi+n^2\left(-\frac23\sin2\chi+\frac73\sin4\chi\right)\\
&\quad-\frac32n\left(\sin2\chi+2n\sin4\chi\right)
+\frac{15}{16}n^2\sin4\chi+O(n^3)\\
&=\chi+\left(\frac12n-\frac23n^2\right)\sin2\chi
+\left(\frac73-3+\frac{15}{16}\right)n^2\sin4\chi+O(n^3)\\
&=\chi+\left(\frac12n-\frac23n^2\right)\sin2\chi
+\frac{13}{48}n^2\sin4\chi+O(n^3).
\end{aligned}
$$

これが初めの二つの Krüger 係数の由来です。座標を直接当てはめて表を暗記するより、**弧長の規格化 → 等角緯度の逆置換 → 正弦の係数比較**を再現できることが重要です。

<a id="thm-geod17-low-order-coefficients"></a>
<!-- formal-statement-start -->
> **定理（Krüger 順級数の二次係数）**
> $a\ge b>0$ の楕円体で、第三扁平率 $n$ が0の近傍にあるとする。上の正距緯度 $\mu$ と等角緯度 $\chi$ は、緯度を非極点の閉区間に制限すると

$$
\boxed{\mu=\chi+\alpha_1\sin2\chi+\alpha_2\sin4\chi+O(n^3),}
$$

$$
\boxed{\alpha_1=\frac12n-\frac23n^2+O(n^3),\qquad
\alpha_2=\frac{13}{48}n^2+O(n^3).}
$$

> 余項の次数は $n\to0$ に関するものであり、経度方向に無制限に一様な誤差評価を意味しない。
<!-- formal-statement-end -->

**証明の見取り図。** 弧長と等角緯度を独立に $n$ 展開し、両方が表す同じ測地緯度を消去するのが核心です。上の逆置換では $\sin2\phi$ の一次変化を落とすと $\alpha_2$ の係数を誤ります。

<!-- proof-start -->
### 証明

[子午線曲率半径の定義](../GEOD4/index.md#def-geod4-curvature-radii)を使った第1節の展開は、$n=0$ 近傍かつ非極点の緯度閉区間では分母が0から離れ、二項展開の余項を一様に抑えられます。項別積分による $s/A_0$ の式は正当です。$A/A_0=1+n^2/4+O(n^4)$ なので $1/(A/A_0)=1-n^2/4+O(n^4)$。この積で $\phi n^2/4$ は打ち消され、$\mu$ の式が得られます。

[等角緯度の式](../GEOD14/index.md#def-geod14-conformal-latitude)も同じ領域で $n=0$ の周りに収束冪級数を持つので、展開と代入ができます。$\chi=\phi-2n\sin2\phi+\cdots$ の一次変形から $\phi-\chi=2n\sin2\chi+O(n^2)$ となります。$\sin2\phi$ のTaylor展開は

$$
\sin(2\chi+2(\phi-\chi))
=\sin2\chi+2(\phi-\chi)\cos2\chi+O(n^2),
$$

従って $\sin2\phi=\sin2\chi+2n\sin4\chi+O(n^2)$。これを用いて $\phi(\chi)$ の二次係数 $c=-2/3,d=7/3$ を得ます。$\mu(\phi)$ に代入した結果の $\sin2\chi$ の係数は $n/2-2n^2/3$、$\sin4\chi$ の係数は

$$
\left(\frac73-\frac{3}{1}+\frac{15}{16}\right)n^2
=\frac{112-144+45}{48}n^2
=\frac{13}{48}n^2.
$$

余項は有限回の合成・微分・積分により非極点の閉区間で $O(n^3)$ のままです。
<!-- proof-end -->

---

## 3. 実軸の補正を複素数へ延ばす

球面横メルカトルを[GEOD15の回転球面座標](../GEOD15/index.md#def-geod15-transverse)で計算すると、北向きの無次元座標を $\xi'$、東向きを $\eta'$ として

$$
\begin{aligned}
\xi'&=\operatorname{atan2}(\sin\chi,\cos\chi\cos\delta),\\
\eta'&=\operatorname{atanh}(\cos\chi\sin\delta),\\
\zeta'&=\xi'+i\eta'.
\end{aligned}
$$

ここでプライム記号は**Krüger 補正前の球面座標**を表します。GEOD16の $\beta,\eta,\zeta$ と、それぞれ本章の $\xi',\eta',\zeta'$ が対応します。中央子午線では $\xi'=\chi,\eta'=0$ です。

二次まで導出した実数の正弦補正を、[GEOD16の正則補正の一意性](../GEOD16/index.md#thm-geod16-analytic-correction)に沿って複素変数へ延ばします。実軸上で一致する正則関数は同じ局所枝で一致します。この周期補正の正弦級数は、その収束する複素近傍で項別に評価できます。

<a id="def-geod17-kruger-series"></a>
<!-- formal-statement-start -->
> **定義（Krüger 順級数とその有限次数近似）**
> 中央子午線上の正距緯度への補正を、実数係数 $\alpha_j(n)$ の正弦級数で表し、局所的に収束する複素領域で

$$
\boxed{\zeta=\xi+i\eta
=\zeta'+\sum_{j=1}^{\infty}\alpha_j(n)\sin(2j\zeta')}
$$

> と置く。次数 $p$ の計算では $j\le p$ の項を残し、各 $\alpha_j$ も $n^p$ までで打ち切る。この有限式を $p$ 次 Krüger 順級数近似とする。$\zeta'$ は直前の球面横メルカトルの座標である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod17-kruger-series -->
**定義の確認**（球面）。$n=0$ では $\mu=\chi$ で補正を要しません。従って $\alpha_j(0)=0$ をすべての $j$ について選び、級数は $\zeta=\zeta'$ に戻ります。

中央子午線 $\delta=0$ では $\zeta'=\chi$ が実数なので、虚部が0のまま $\xi=\mu$ になります。これは「中央で真の弧長を再現する」という定義の条件を直接確認しています。
<!-- definition-example-end -->

複素正弦を実部・虚部に分ければ、数値計算に使う実数式になります。

$$
\sin(2j(\xi'+i\eta'))
=\sin(2j\xi')\cosh(2j\eta')
+i\cos(2j\xi')\sinh(2j\eta').
$$

したがって

$$
\boxed{\begin{aligned}
\xi&=\xi'+\sum_{j\ge1}\alpha_j\sin(2j\xi')\cosh(2j\eta'),\\
\eta&=\eta'+\sum_{j\ge1}\alpha_j\cos(2j\xi')\sinh(2j\eta').
\end{aligned}}
$$

高次係数は低次二項と同じく、$M$ の展開から $\mu(\phi)$ と $\chi(\phi)$ を同次数まで求め、$\phi$ を消去して $\sin(2j\chi)$ の係数を比較することで再現できます。四次で打ち切る具体的な係数は

$$
\begin{aligned}
\alpha_1^{[4]}&=\frac12n-\frac23n^2+\frac5{16}n^3+\frac{41}{180}n^4,\\
\alpha_2^{[4]}&=\frac{13}{48}n^2-\frac35n^3+\frac{557}{1440}n^4,\\
\alpha_3^{[4]}&=\frac{61}{240}n^3-\frac{103}{140}n^4,\\
\alpha_4^{[4]}&=\frac{49561}{161280}n^4.
\end{aligned}
$$

この式の $[4]$ は $n$ の四次まで保持する印であり、$\alpha_j$ の添字 $j$ は $\sin(2j\zeta')$ の周波数です。例えば $\alpha_3$ は $n^3$ から始まるので二次近似には現れません。

四次係数と六次までの拡張は [PROJ の係数行列](https://proj.org/en/stable/operations/projections/tmerc.html#ellipsoidal-form) に掲載され、[Karney の論文・再現用 Maxima スクリプト](https://geographiclib.sourceforge.io/tm.html)でも検証できます。係数は実数上の弧長条件から決まり、逆級数の係数 $\beta_j$ とは異なります。

---

## 4. 地図の東・北座標を得る

原点緯度 $\phi_0$ の位置で $\delta=0$ とすると、補正前の球面座標は $\zeta'_0=\chi(\phi_0)$ です。第2節の実数の条件より、補正後は $\xi_0=\mu(\phi_0)=s(\phi_0)/A$、$\eta_0=0$ です。そこで北距離には $\xi-\xi_0$ を使います。

<a id="def-geod17-forward-map"></a>
<!-- formal-statement-start -->
> **定義（Krüger 順変換の平面座標）**
> $a\ge b>0$、中央経度 $\lambda_0$、原点緯度 $\phi_0$、中央縮尺 $k_0>0$、偽東距 $E_0$、偽北距 $N_0$ を固定する。球面横メルカトル座標 $\zeta'$ から上の Krüger 順級数を計算し、

$$
\boxed{\begin{aligned}
E&=E_0+k_0A\eta,\\
N_p&=N_0+k_0A(\xi-\mu(\phi_0))
\end{aligned}}
$$

> とする。有限次数 $p$ の計算では、$A$ を $A_p$、$\xi,\eta$ を $\zeta$ の $p$ 次近似、$\mu(\phi_0)$ を**同じ** $p$ 次の正弦級数で評価する。$E,N_p,E_0,N_0$ は長さの同一単位を持つ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-geod17-forward-map -->
**定義の確認**（球面）。$A=a$、$\zeta=\zeta'$、$\mu(\phi_0)=\phi_0$ なので

$$
E=E_0+k_0a\eta',\qquad
N_p=N_0+k_0a(\xi'-\phi_0).
$$

これは[GEOD15の球面横メルカトル](../GEOD15/index.md#thm-geod15-transverse-inverse)に平行移動と縮尺を加えたものです。原点 $(\phi_0,\lambda_0)$ では $(\xi',\eta')=(\phi_0,0)$、従って $(E,N_p)=(E_0,N_0)$。偽東距・偽北距は地理的な角度や縮尺を変えない単なる座標平行移動です。
<!-- definition-example-end -->

### 4.1 手順と軸・符号の確認

1. $n=f/(2-f)$、$e^2=f(2-f)$、$A_p$ と $\alpha_j^{[p]}$ を求める。
2. [等角緯度](../GEOD14/index.md#def-geod14-conformal-latitude) $\chi(\phi)$ を評価する。具体式は

   $$
   \chi=\arctan\left[\sinh\left(\operatorname{asinh}(\tan\phi)
   -e\operatorname{atanh}(e\sin\phi)\right)\right].
   $$

3. $\delta$ を中央経度差として $\xi',\eta'$ を求める。$\operatorname{atan2}$ で枝を選び、$\operatorname{atanh}$ の引数が $(-1,1)$ にあることを確認する。
4. $\sin(2j\zeta')$ の実部・虚部を各次数まで加算して $\xi,\eta$ を得る。
5. $\chi_0=\chi(\phi_0)$ と $\xi_0^{[p]}=\chi_0+\sum_{j=1}^p\alpha_j^{[p]}\sin(2j\chi_0)$ を計算し、上式で $E,N_p$ を作る。

一般的な地図投影ソフトウェアでは東向き $x$、北向き $y$ と表記する場合があります。本章では $E$ と $N_p$ を固定し、日本の平面直角座標系における $X,Y$ の順序とは区別します。

<a id="prop-geod17-axis-symmetry"></a>
<!-- formal-statement-start -->
> **命題（中央子午線と東西・南北の対称性）**
> 同じ局所枝、同じ楕円体・中央経度・縮尺・原点・偽座標で、実数係数の有限 Krüger 順級数を評価する。任意の次数で中央子午線 $\delta=0$ なら $E=E_0$ となり、$\phi=\phi_0$ ならさらに $N_p=N_0$ となる。また経度差の符号を変えると $E-E_0$ は符号反転し、$N_p-N_0$ は不変である。原点緯度 $\phi_0=0$ のとき緯度を反転すると $N_p-N_0$ が符号反転する。
<!-- formal-statement-end -->

**証明の見取り図。** $\delta$ の符号変更では $\xi'$ は偶、$\eta'$ は奇です。$\cosh$ は偶、$\sinh$ は奇なので補正後も同じ偶奇性が保たれます。

<!-- proof-start -->
### 証明

等角緯度 $\chi$ は $\phi$ の奇関数です。[球面横メルカトルの式](../GEOD15/index.md#def-geod15-transverse)を用いると $\delta\mapsto-\delta$ では $\sin\delta$ のみ符号を変え、$\cos\delta$ は変わりません。従って $\xi'(\phi,-\delta)=\xi'(\phi,\delta)$、$\eta'(\phi,-\delta)=-\eta'(\phi,\delta)$ です。実部の各補正項は $\sin(2j\xi')\cosh(2j\eta')$、虚部は $\cos(2j\xi')\sinh(2j\eta')$ なので、$\xi$ は偶、$\eta$ は奇です。$E-E_0=k_0A_p\eta$ は奇、$N_p-N_0=k_0A_p(\xi-\xi_0)$ は偶です。

$\delta=0$ では $\eta'=0$、全 $\sinh(2j\eta')=0$ なので $E=E_0$。$\phi=\phi_0$ なら $\xi'=\chi_0$、補正和の定義から $\xi=\xi_0$、ゆえに $N_p=N_0$。最後に $\phi_0=0$ で $\phi$ を反転すると $\chi$ と $\xi'$ は奇、$\eta'$ は不変、$\sin(2j\xi')$ は奇、$\cos(2j\xi')$ は偶です。$\xi$ と $\xi_0=0$ はそれぞれ奇と0なので $N_p-N_0$ が反転します。
<!-- proof-end -->

**注意。** 有限次数の順級数は[GEOD16の厳密局所投影](../GEOD16/index.md#thm-geod16-metric-scale)を近似しています。中心子午線で $k_0$ が指定どおりになるのは厳密式であり、有限次数では一般に $O(n^{p+1})$ の微小な縮尺残差が残ります。一方、原点を同じ有限式で差し引けば**座標原点そのものは厳密に一致**します。

---

## 5. 次数打切り・丸め・数値検算

### 5.1 四次と六次を比較する意味

地球程度の扁平率で $|n|$ は約 $0.00168$ です。固定された安全な複素近傍に限れば、$p$ 次近似で省いた係数は $O(n^{p+1})$ であり、座標誤差の次元は概ね $a$ 倍です。ただし $\cosh(2j\eta')$ と $\sinh(2j\eta')$ は中央から東西へ離れるほど成長するので、$a|n|^{p+1}$ **だけを全球の誤差上界にしてはいけません**。

ここで比較すべき誤差は別々です。

- **モデル・測地基準の差**：異なる楕円体、datum、観測epochを使った違い。級数の次数を増やしても解消しない。
- **級数の打切り**：省いた $n$ の高次係数と複素正弦項の寄与。次数と中央からの距離に依存する。
- **浮動小数点丸め**：$\operatorname{atanh},\sinh,\cosh$ の評価、加減算、$A(\xi-\xi_0)$ の差などによる。次数を上げれば必ず減るわけではない。

一例として WGS84 楕円体 $a=6378137\ \mathrm m$、$f=1/298.257223563$、$\phi=35^\circ$、$\delta=3^\circ$、$\phi_0=0$、$k_0=0.9996$、$(E_0,N_0)=(500000,0)\ \mathrm m$ に対し、同じ二倍精度実装で計算すると次です。

| 保持する次数 | 東座標 $E$ (m) | 北座標 $N_p$ (m) |
| --- | ---: | ---: |
| 二次 | 773798.098075 | 3877156.695496 |
| 四次 | 773798.096340 | 3877156.691645 |
| 六次 | 773798.096340 | 3877156.691645 |

四次と六次の一致はこの点で小さな打切り差を示す**内部の収束診断**であり、同じ公式から計算している以上、それだけでは独立検証になりません。また小数点以下6桁の表示一致は、無条件にマイクロメートル精度を保証する証拠でもありません。

### 5.2 公式値と独立積分

[PROJ の例](https://proj.org/en/stable/operations/projections/tmerc.html)は Bessel 楕円体（$a=6377397.155\ \mathrm m$、$1/f=299.1528128$）で、中央経度 $9^\circ$、緯度 $51^\circ$、$k_0=1$、偽東距 $3500000\ \mathrm m$、緯度原点・偽北距0の結果を $(E,N_p)=(3500000.00,5651505.56)\ \mathrm m$ とします。本章の六次式は $(3500000,5651505.564385)\ \mathrm m$ となり、**掲載値の0.01 m表示精度**で一致します。

この点は中央子午線にあるので、独立に[子午線弧長の積分](../GEOD11/index.md#def-geod11-meridian-arc)を Simpson 法で $0$ から $51^\circ$ まで10万等分しても $5651505.564385\ \mathrm m$ を得ます。ここでは Krüger 係数を使わない積分を独立検算にしています。中心から離れた点については PROJ / GeographicLib の別実装と比較すべきで、中央の一致だけで広域精度を主張しません。

### 5.3 適用領域

$\phi=0$ のまま $\delta\to\pi/2$ とすると $\eta'=\operatorname{atanh}(\sin\delta)$ が無限大へ向かいます。[GEOD15の枝の制約](../GEOD15/index.md#def-geod15-transverse)により、この近傍で上の有限級数を無条件に使えません。数値的には角度を中央付近へ制限し、$\operatorname{atanh}$ の定義域と有限値を確認し、必要なら別の座標系・実装へ切り替えます。

---

## 6. 演習

### Level A：係数・軸・極限の基本操作

<a id="ex-geod17-a01"></a>
**A1　形状パラメータの換算**（Level A）
- Level: A

$a=5,b=4$ の楕円体で $n,f,e^2$ を求めよ。また $n=0$ で各値はどうなるか。

<!-- solution-start -->
**詳細解答。** [扁平率・第一離心率・第三扁平率](../GEOD3/index.md#def-geod3-shape-parameters)の定義式から $n=(5-4)/(5+4)=1/9$。$f=(5-4)/5=1/5$ なので $n=f/(2-f)$ とも一致します。

$$
e^2=1-\frac{b^2}{a^2}
=1-\frac{16}{25}=\frac9{25}
=\frac{4/9}{(10/9)^2}.
$$

$n=0$ なら $a=b$、$f=0$、$e^2=0$ で球面です。
<!-- solution-end -->

<a id="ex-geod17-a02"></a>
**A2　極までの弧長と $A$**（Level A）
- Level: A

$M/A_0=1-3n\cos2\phi+n^2(1/4+15\cos4\phi/4)+O(n^3)$、$A_0=a/(1+n)$ を用い、赤道から極まで積分して $A/A_0$ の二次までを求めよ。

<!-- solution-start -->
**詳細解答。** [平均半径の定義](#def-geod17-meridian-a)と $s'(\phi)=M(\phi)$ から

$$
\frac{s(\pi/2)}{A_0}
=\int_0^{\pi/2}\left[1-3n\cos2\phi
+n^2\left(\frac14+\frac{15}{4}\cos4\phi\right)\right]d\phi+O(n^3).
$$

$\int_0^{\pi/2}\cos2\phi\,d\phi=[\sin2\phi/2]_0^{\pi/2}=0$、$\cos4\phi$ も同じく積分0です。定数項だけが残り

$$
\frac{s(\pi/2)}{A_0}=\frac\pi2\left(1+\frac14n^2\right)+O(n^3),\quad
\frac A{A_0}=1+\frac14n^2+O(n^3).
$$

なお $n^3$ の平均項が0であることを別途用いれば余項を $O(n^4)$ に改善できます。
<!-- solution-end -->

<a id="ex-geod17-a03"></a>
**A3　複素正弦を実部と虚部へ分ける**（Level A）
- Level: A

$\zeta'=u+iv$ のとき、$\sin(2\zeta')$ の実部・虚部を、$\sin,\cos,\sinh,\cosh$ で表せ。

<!-- solution-start -->
**詳細解答。** $e^{i(x+iy)}=e^{-y}(\cos x+i\sin x)$、$\sin z=(e^{iz}-e^{-iz})/(2i)$ を使います。$z=2(u+iv)$ とすると

$$
\sin(2u+2iv)
=\frac{e^{-2v}(\cos2u+i\sin2u)-e^{2v}(\cos2u-i\sin2u)}{2i}.
$$

実部は $\sin2u(e^{2v}+e^{-2v})/2=\sin2u\cosh2v$、虚部は $\cos2u(e^{2v}-e^{-2v})/2=\cos2u\sinh2v$。従って

$$
\operatorname{Re}\sin2\zeta'=\sin2u\cosh2v,\qquad
\operatorname{Im}\sin2\zeta'=\cos2u\sinh2v.
$$
<!-- solution-end -->

<a id="ex-geod17-a04"></a>
**A4　球面での偽座標**（Level A）
- Level: A

球面半径 $R$、$k_0>0$、$\phi_0=0$、$(E_0,N_0)=(100,-50)$ とする。赤道の $\delta=\arcsin(1/2)$ で $(E,N_p)$ を求めよ。

<!-- solution-start -->
**詳細解答。** 球面では [Krüger 順級数](#def-geod17-kruger-series) の $\alpha_j=0$、$\chi=0$ です。赤道では $\xi'=0$、$\eta'=\operatorname{atanh}(\sin\delta)=\operatorname{atanh}(1/2)=\tfrac12\log3$ です。$A=R,\mu(0)=0$ を[座標の定義](#def-geod17-forward-map)に代入して

$$
\boxed{E=100+\frac{k_0R}{2}\log3,\qquad N_p=-50.}
$$

東への変位だけが正で、偽北距は変わりません。
<!-- solution-end -->

<a id="ex-geod17-a05"></a>
**A5　次数と周波数は別である**（Level A）
- Level: A

$\alpha_1=n/2-2n^2/3+O(n^3)$、$\alpha_2=13n^2/48+O(n^3)$ から、二次近似の $\zeta-\zeta'$ を求めよ。$n=0$ の極限も確認せよ。

<!-- solution-start -->
**詳細解答。** [二次係数定理](#thm-geod17-low-order-coefficients)を [順級数の定義](#def-geod17-kruger-series)へ代入すると

$$
\zeta-\zeta'
=\left(\frac n2-\frac23n^2\right)\sin2\zeta'
+\frac{13}{48}n^2\sin4\zeta'+O(n^3).
$$

第2項の周波数は $4$ ですが、係数は $n^2$ 次です。$n\to0$ ならどちらも0となり、球面の $\zeta=\zeta'$ へ戻ります。
<!-- solution-end -->

### Level B：係数比較と数値検証を組み合わせる

<a id="ex-geod17-b01"></a>
**B1　$\mu(\phi)$ の二次を積分から再導出**（Level B）
- Level: B

第1節の $M/A_0$ の二次式を積分し、$A/A_0=1+n^2/4+O(n^4)$ で割って、$\mu(\phi)$ の二次の $\sin2\phi,\sin4\phi$ 係数を求めよ。

<!-- solution-start -->
**詳細解答。** [弧長の定義](../GEOD11/index.md#def-geod11-meridian-arc)から $\int_0^\phi\cos2t\,dt=\sin2\phi/2$、$\int_0^\phi\cos4t\,dt=\sin4\phi/4$ です。従って

$$
\frac s{A_0}
=\phi-\frac32n\sin2\phi
+n^2\left(\frac14\phi+\frac{15}{16}\sin4\phi\right)+O(n^3).
$$

$(A/A_0)^{-1}=1-n^2/4+O(n^4)$ を掛けると $\phi n^2/4-\phi n^2/4=0$ で

$$
\boxed{\mu=\phi-\frac32n\sin2\phi+\frac{15}{16}n^2\sin4\phi+O(n^3).}
$$

弧長を $a$ で割っただけでは $\phi$ の二次項が残るため、$A$ を選ぶ意味があります。
<!-- solution-end -->

<a id="ex-geod17-b02"></a>
**B2　$\alpha_2=13n^2/48$ の出所**（Level B）
- Level: B

$\chi=\phi-2n\sin2\phi+n^2(2\sin2\phi/3+5\sin4\phi/3)+O(n^3)$ と B1 の $\mu$ を与える。$\phi(\chi)$ を二次まで求め、$\mu(\chi)$ の $\sin4\chi$ 係数を計算せよ。

<!-- solution-start -->
**詳細解答。** $\phi=\chi+2n\sin2\chi+n^2(c\sin2\chi+d\sin4\chi)$ と置きます。$\sin2\phi=\sin2\chi+2n\sin4\chi+O(n^2)$ だから、もとの $\chi(\phi)$ へ戻すと

$$
c+\frac23=0,\qquad d-4+\frac53=0.
$$

$c=-2/3,d=7/3$ です。この $\phi(\chi)$ を[B1の式](#ex-geod17-b01)へ代入し、$\sin2\phi$ の補正を保持すれば $\sin4\chi$ の二次係数は

$$
\frac73-\frac32\cdot2+\frac{15}{16}
=\frac{112-144+45}{48}=\frac{13}{48}.
$$

一方 $\sin2\chi$ の係数は $2n-3n/2-2n^2/3=n/2-2n^2/3$ です。[二次係数定理](#thm-geod17-low-order-coefficients)が再現できました。
<!-- solution-end -->

<a id="ex-geod17-b03"></a>
**B3　原点補正を同じ次数で行う理由**（Level B）
- Level: B

$\phi_0\ne0$ とし、四次補正を使って $\xi(\phi,\delta)$ を計算するが、原点の $\xi_0$ を二次の係数で計算したとする。$(\phi,\delta)=(\phi_0,0)$ における $N_p-N_0$ を式で求め、原点条件を判定せよ。

<!-- solution-start -->
**詳細解答。** $\delta=0$ では $\xi'=\chi_0$ です。[Krüger 順変換の平面座標](#def-geod17-forward-map)より

$$
\begin{aligned}
\xi^{[4]}(\phi_0,0)&=\chi_0+\sum_{j=1}^4\alpha_j^{[4]}\sin(2j\chi_0),\\
\xi_0^{[2]}&=\chi_0+\sum_{j=1}^2\alpha_j^{[2]}\sin(2j\chi_0).
\end{aligned}
$$

従って誤った原点の北座標残差は

$$
N_p-N_0=k_0A_4\left[
\sum_{j=1}^4\alpha_j^{[4]}\sin(2j\chi_0)
-\sum_{j=1}^2\alpha_j^{[2]}\sin(2j\chi_0)\right].
$$

一般に0ではなく $O(a n^3)$ の不整合を作ります。同じ四次式で $\xi_0$ を計算すれば括弧の各項が相殺し、原点を**機械精度の範囲で** $(E_0,N_0)$ に合わせられます。
<!-- solution-end -->

<a id="ex-geod17-b04"></a>
**B4　東西反転と打切り誤差の区別**（Level B）
- Level: B

$\phi$ を固定し、$\delta$ と $-\delta$ の二点を四次で計算する。$E-E_0$ と $N_p-N_0$ の対称性を示せ。また四次と六次の差だけで真の誤差を保証できない理由を説明せよ。

<!-- solution-start -->
**詳細解答。** $\delta\mapsto-\delta$ で $\xi'$ は偶、$\eta'$ は奇です。[複素正弦の実数式](#def-geod17-kruger-series)から $\cosh(2j\eta')$ は偶、$\sinh(2j\eta')$ は奇で、$\xi$ は偶、$\eta$ は奇になります。よって

$$
E(\phi,-\delta)-E_0=-[E(\phi,\delta)-E_0],\qquad
N_p(\phi,-\delta)-N_0=N_p(\phi,\delta)-N_0.
$$

この対称性は各次数で成立するので、係数の桁が間違っていても通る可能性があります。また四次と六次は同じ展開に依存するため共通の誤りを検出できません。測地基準の差、打切り、丸めを区別し、独立の[子午線弧長積分](../GEOD11/index.md#def-geod11-meridian-arc)や別実装と照合する必要があります。
<!-- solution-end -->

### Level C：順変換を最後まで実行する

<a id="ex-geod17-c01"></a>
**C1　WGS84楕円体を四次で順変換**（Level C）
- Level: C

長半径 $a=6378137\ \mathrm m$、扁平率 $f=1/298.257223563$、入力 $\phi=35^\circ,\lambda-\lambda_0=3^\circ$、原点緯度 $\phi_0=0$、$k_0=0.9996$、$(E_0,N_0)=(500000,0)\ \mathrm m$ とする。四次の $A_4,\alpha_j^{[4]}$、$\chi,\xi',\eta',\xi,\eta$ を用いて $(E,N_p)$ を数値計算し、中央子午線上の原点条件と東西反転の結果も述べよ。角度は計算前にラジアンへ変換する。

<!-- solution-start -->
**詳細解答。** まず [第三扁平率](../GEOD3/index.md#def-geod3-shape-parameters)を計算して、$n\simeq0.00167922038638$、$e^2=f(2-f)$ とします。[平均半径の四次式](#def-geod17-meridian-a)と第3節の四次係数表へこの $n$ を代入すると $A_4\simeq6367449.145823\ \mathrm m$ です。

[等角緯度の式](../GEOD14/index.md#def-geod14-conformal-latitude)と[球面横メルカトル座標](../GEOD15/index.md#def-geod15-transverse)を順番に評価します。

$$
\begin{aligned}
\chi&\simeq0.607714130286,\\
\xi'&=\operatorname{atan2}(\sin\chi,\cos\chi\cos3^\circ)
\simeq0.608357142368,\\
\eta'&=\operatorname{atanh}(\cos\chi\sin3^\circ)
\simeq0.042991952507.
\end{aligned}
$$

さらに各 $\alpha_j^{[4]}$ を使って実数の $\sin\cosh,\cos\sinh$ の四項和を取ると

$$
\begin{aligned}
\xi&=\xi'+\sum_{j=1}^4\alpha_j^{[4]}\sin(2j\xi')\cosh(2j\eta')
\simeq0.609146313710,\\
\eta&=\eta'+\sum_{j=1}^4\alpha_j^{[4]}\cos(2j\xi')\sinh(2j\eta')
\simeq0.043016858577.
\end{aligned}
$$

$\phi_0=0$ なので $\chi_0=0$、正弦和も0で $\xi_0=0$。[座標の定義](#def-geod17-forward-map)から

$$
\boxed{\begin{aligned}
E&=500000+0.9996\,A_4\eta
\simeq773798.096340\ \mathrm m,\\
N_p&=0+0.9996\,A_4(\xi-0)
\simeq3877156.691645\ \mathrm m.
\end{aligned}}
$$

原点 $(\phi_0,\delta)=(0,0)$ では $\xi=\eta=0$ なので厳密に $(500000,0)$ です。$\delta=-3^\circ$ では[対称性命題](#prop-geod17-axis-symmetry)から $E=500000-(773798.096340-500000)\simeq226201.903660\ \mathrm m$、北座標は上と同じです。ここで示した数値は四次級数の評価結果であり、datum の変換精度や全球での誤差保証を表しません。
<!-- solution-end -->

---

## 7. 次章へ：前進した級数をどう戻すか

本章では、中央子午線の真の弧長を条件にして Krüger の順級数と係数を構成しました。これにより入力の測地緯度・経度から $E,N_p$ を計算できます。次は有限次数の順級数を逆向きにたどり、$\beta_j$ を係数比較で求めます。その際、有限次数の往復が完全な恒等写像とは限らず、子午線収差と点縮尺には導関数を別に評価する必要があります。
