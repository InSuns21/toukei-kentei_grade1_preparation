# EC8 Hasse評価・拡大体上の点数・有限体ゼータ関数

[EC7の有限体上の点数](../EC7/index.md#def-ec7-trace)では、曲線の点を一つずつ数えて $a_q=q+1-\#E(\mathbb F_q)$ を求めました。しかし体が大きくなるたびに全点を列挙するのは大変です。しかも点数の「基準値」$q+1$ からのずれが、どこまで大きくなり得るかはまだ分かりません。

そこで、[EC4の同種写像の次数の二次性](../EC4/index.md#thm-ec4-degree-quadratic)を整数の二次形式として使います。この方法は、個々の点を列挙せずにずれの上限を与えます。さらに次数の性質からFrobeniusを満たす二次式を導けば、$\mathbb F_{q^2},\mathbb F_{q^3},\ldots$ の点数が二項の漸化式で決まり、全拡大体の情報を一つの有理関数へまとめられます。

以下、$q=p^r$（$p$ は素数、$r\ge1$）、$K=\overline{\mathbb F}_q$ とし、$E/\mathbb F_q$ は非特異な一般Weierstrass曲線とします。$\pi=\pi_q$ は[EC7の$q$-Frobenius](../EC7/index.md#def-ec7-frobenius)で、$\deg\pi=q$、$\deg([1]-\pi)=N_1:=\#E(\mathbb F_q)$ です。$\deg0=0$ の約束を含め、以下の次数は代数閉包上の同種写像について考えます。標数2、3も排除しません。

## 1. 点数のずれを次数の二次形式として読む

[EC4の自己準同型環](../EC4/index.md#def-ec4-endo-ring)では、原点を保つ射を加減算・合成できます。同種写像の次数は通常の写像の「核の個数」とは限りませんが、非零なら正の整数で、零写像の次数を0と定めれば常に非負です。

<a id="def-ec8-degree-trace"></a>

<!-- formal-statement-start -->
> **定義（同種写像の次数によるトレース）**  
> 楕円曲線 $E/K$ の自己準同型 $\varphi$（零写像を含む）に対し、整数

$$
\operatorname{Tr}_{\deg}(\varphi)
=\deg([1]+\varphi)-1-\deg\varphi
$$

> を次数によるトレースと呼ぶ。$[1]$ は恒等写像であり、$\deg[1]=1$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec8-degree-trace -->
**定義の確認**。$\varphi=[m]$ のとき、[EC4の倍数写像の次数](../EC4/index.md#thm-ec4-multiplication-degree)より $\deg[m]=m^2$、$\deg([1]+[m])=(m+1)^2$ です。従って

$$
\operatorname{Tr}_{\deg}([m])=(m+1)^2-1-m^2=2m.
$$

これは $m=0$ でも正しく、$\operatorname{Tr}_{\deg}(0)=0$ です。定義に必要な恒等射、加法、次数を個別に確認しました。
<!-- definition-example-end -->

次数の二次性から、二つの自己準同型 $\varphi,\psi$ に対して

$$
B(\varphi,\psi)=\deg(\varphi+\psi)-\deg\varphi-\deg\psi
$$

は整数値の対称双加法写像です。ここで「双加法」とはそれぞれの変数について加法を保つことです。[EC4の二次性の証明](../EC4/index.md#thm-ec4-degree-quadratic)で確かめました。従って $\operatorname{Tr}_{\deg}(\varphi)=B([1],\varphi)$、そして $B([1],[1])=2$ です。

$\deg([1]-\pi)=N_1$ をこの記号で書き直すと

$$
N_1=\deg[1]+\deg\pi-B([1],\pi)
=1+q-\operatorname{Tr}_{\deg}(\pi).
$$

[EC7の点数差](../EC7/index.md#def-ec7-trace) $a_q=q+1-N_1$ と比較して

$$
\operatorname{Tr}_{\deg}(\pi)=a_q.
$$

数え上げで得た整数と、射の次数から得た整数が一致しました。これが二次形式の交差項を決めます。

## 2. Hasse評価：なぜ点数は$q+1$から遠く離れないか

<a id="thm-ec8-hasse"></a>

<!-- formal-statement-start -->
> **定理（Hasse評価）**  
> 有限体 $\mathbb F_q$ 上の非特異楕円曲線 $E$ について、$N_1=\#E(\mathbb F_q)$ と $a_q=q+1-N_1$ と置くと

$$
|a_q|\le 2\sqrt q,
\qquad
q+1-2\sqrt q\le N_1\le q+1+2\sqrt q
$$

> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\deg([m]-[n]\pi)$ を $m,n$ の二次式として展開します。全ての整数 $m,n$ でこの値は非負です。もし判別式が正なら、負になる実数の方向を有理数で近似して整数 $m,n$ を選べてしまうので矛盾します。

<!-- proof-start -->
### 証明

[次数の二次性](../EC4/index.md#thm-ec4-degree-quadratic)を $\varphi=[1]$、$\psi=\pi$、係数を $m,-n$ として適用します。$\deg[1]=1$、$\deg\pi=q$、$B([1],\pi)=a_q$ を一つずつ代入すると

$$
\begin{aligned}
\deg([m]-[n]\pi)
&=m^2\deg[1]-mnB([1],\pi)+n^2\deg\pi\\
&=m^2-a_qmn+qn^2.
\end{aligned}
$$

左辺は零写像なら0、非零の同種写像なら正なので、全ての $m,n\in\mathbb Z$ について非負です。平方完成すれば

$$
m^2-a_qmn+qn^2
=\left(m-\frac{a_q n}{2}\right)^2
+\left(q-\frac{a_q^2}{4}\right)n^2.
$$

仮に $a_q^2>4q$ なら $c=a_q^2/4-q>0$ です。任意の正整数 $n$ について $a_qn/2$ に最も近い整数 $m$ を取ると、$|m-a_qn/2|\le1/2$。よって

$$
\deg([m]-[n]\pi)\le\frac14-cn^2.
$$

十分大きい $n$ では右辺が負となって矛盾します。従って $a_q^2\le4q$、両辺の平方根を取れば $|a_q|\le2\sqrt q$ です。$N_1=q+1-a_q$ を代入して点数の両側評価を得ます。$\square$
<!-- proof-end -->

例えばEC7で数えた $\mathbb F_5$ 上の $y^2=x^3+x+1$ は $N_1=9$、$a_5=-3$ でした。$|-3|=3\le2\sqrt5$ と確認できます。$N_1$ は整数なので、実際の点数候補はこの実数区間に入る整数に限られます。

**標数について。** 証明で2で割ったものは整数係数の二次式を実数上で平方完成した箇所だけです。体 $\mathbb F_q$ の中で $1/2$ を使ったわけではなく、標数2でも同じ証明が成立します。

## 3. 次数のノルム性からFrobeniusの二次関係式を作る

Hasse評価は $a_q$ の大きさを教えます。しかし拡大体の点数を計算するには、$\pi^2$ を $\pi$ と恒等写像で表す関係式が必要です。これも双対の加法性を別に仮定せず、[EC4の次数の乗法性](../EC4/index.md#def-ec4-degree)と二次性だけから示せます。

自己準同型環 $A=\operatorname{End}_K(E)$ には整数倍はありますが、通常の射のままでは有理数倍 $\varphi/n$ を扱えません。そこで $\varphi\in A$ と零でない整数 $n$ の組を形式分数 $\varphi/n$ と書き、$\varphi/n=\psi/m$ を $m\varphi=n\psi$ で定めます。和と積は

$$
\frac{\varphi}{n}+\frac{\psi}{m}
=\frac{m\varphi+n\psi}{nm},
\qquad
\frac{\varphi}{n}\frac{\psi}{m}
=\frac{\varphi\psi}{nm}
$$

です。こうして得る有理数係数の環を $A_{\mathbb Q}$（通常は $A\otimes_{\mathbb Z}\mathbb Q$ とも書く）と呼びます。[EC4の倍数写像の次数](../EC4/index.md#thm-ec4-multiplication-degree)と[次数の乗法性](../EC4/index.md#def-ec4-degree)から、$n\ne0$ かつ $\varphi\ne0$ なら $\deg([n]\varphi)=n^2\deg\varphi>0$ です。したがって非零の自己準同型が整数倍で零になることはなく、$A$ を分母1の元として $A_{\mathbb Q}$ に埋め込めます。

<a id="lem-ec8-quadratic-norm"></a>

<!-- formal-statement-start -->
> **補題（次数ノルムによる二次消去恒等式）**  
> $E/K$ を非特異楕円曲線とする。$A_{\mathbb Q}$ 上に次数の二次形式 $D$ を有理数係数で延長し、$\tau(u)=D(1+u)-1-D(u)$ とする。このとき全ての $u\in A_{\mathbb Q}$ について

$$
u^2-\tau(u)u+D(u)\,1=0
$$

> が環 $A_{\mathbb Q}$ の等式として成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

トレース分を差し引いた $v=u-\tau(u)1/2$ は $1$ と次数の双線形形式について直交します。$D(1+v)D(1-v)=D(1-v^2)$ を二通りに展開すると $D(v^2+D(v)1)=0$ が分かります。次数が零になる元は零だけ、という性質で等式そのものが得られます。

<!-- proof-start -->
### 証明

$A$ 上の $D(u)=\deg u$ は[次数の二次性](../EC4/index.md#thm-ec4-degree-quadratic)を満たし、非零で正、$D(1)=1$、[次数の合成則](../EC4/index.md#def-ec4-degree)により $D(uv)=D(u)D(v)$ です。$u=\varphi/n$（$n\ne0$）に対して $D(u)=\deg\varphi/n^2$ と定めればこれらの性質は有理数係数へ延長されます。$\varphi/n=\psi/m$ なら $m\varphi=n\psi$ です。次数の二次性を両辺へ適用すると

$$
m^2\deg\varphi=n^2\deg\psi
\quad\Longrightarrow\quad
\frac{\deg\varphi}{n^2}=\frac{\deg\psi}{m^2}
$$

なので $D$ は分数表示の取り方によらず定まります。

$B(u,w)=D(u+w)-D(u)-D(w)$ と置きます。これは対称双線形で $B(1,1)=2$、$\tau(u)=B(1,u)$ です。$v=u-\tau(u)1/2$ とすれば

$$
B(1,v)=B(1,u)-\frac{\tau(u)}2 B(1,1)=0.
$$

$d=D(v)$ と置くと二次形式の展開から

$$
D(1+v)=1+d,\qquad D(1-v)=1+d.
$$

乗法性と $(1+v)(1-v)=1-v^2$ を用いると

$$
(1+d)^2=D(1-v^2)=1+D(v^2)-B(1,v^2).
$$

$D(v^2)=D(v)^2=d^2$ なので、$B(1,v^2)=-2d$。再び二次形式を展開し

$$
\begin{aligned}
D(v^2+d1)
&=D(v^2)+dB(1,v^2)+d^2D(1)\\
&=d^2-2d^2+d^2=0.
\end{aligned}
$$

$D$ は非零元で正なので $v^2+d1=0$。ここへ $v=u-\tau(u)1/2$ と $d=D(u)-\tau(u)^2/4$ を代入します。

$$
\begin{aligned}
0&=\left(u-\frac{\tau(u)}2\,1\right)^2
+\left(D(u)-\frac{\tau(u)^2}{4}\right)1\\
&=u^2-\tau(u)u+D(u)1.
\end{aligned}
$$

有理数係数の等式を示したので、整数係数の $u$ に適用した関係式も成立します。$\square$
<!-- proof-end -->

$a_q$ は $\pi$ の次数によるトレースでした。この補題を適用します。

<a id="thm-ec8-frobenius-polynomial"></a>

<!-- formal-statement-start -->
> **定理（Frobeniusの二次関係式）**  
> $\mathbb F_q$ 上の非特異楕円曲線 $E$ の $q$-Frobeniusを $\pi$ とし、$a_q=q+1-\#E(\mathbb F_q)$ と置く。このとき

$$
\pi^2-[a_q]\pi+[q]=0
$$

> が $E$ の自己準同型として成立する。ここで $[a_q]$ と $[q]$ はそれぞれ整数倍写像である。
<!-- formal-statement-end -->

### 証明の見取り図

$\pi$ の次数を $q$、次数によるトレースを $a_q$ と同定して補題へ入れるだけですが、点数の定義と自己準同型の等式は別の主張なので、置き換えを明示します。

<!-- proof-start -->
### 証明

[EC7のFrobeniusの次数](../EC7/index.md#thm-ec7-frobenius-degree)より $D(\pi)=q$。[EC7の点数と差の射の次数](../EC7/index.md#prop-ec7-one-minus-frobenius)より $D(1-\pi)=N_1$ です。二次形式の展開で

$$
D(1-\pi)=1+D(\pi)-B(1,\pi)
=1+q-\tau(\pi)
$$

ですから $\tau(\pi)=q+1-N_1=a_q$。[次数ノルムの補題](#lem-ec8-quadratic-norm)に $u=\pi$ を代入し

$$
\pi^2-\tau(\pi)\pi+D(\pi)1
=\pi^2-a_q\pi+q1=0
$$

を得ます。整数 $a_q,q$ を掛ける操作は、それぞれ倍数写像との合成として解釈できます。$\square$
<!-- proof-end -->

この関係式によって、$\pi$ の高い冪を計算しても「$\pi$ と恒等写像の一次結合」へ戻せます。有限体上の点数列が漸化式で決まる理由です。

## 4. 二つの根と拡大体上の点数

今までの関係式は自己準同型の等式でした。係数が整数なので、同じ係数を持つ通常の二次多項式を複素数上で考えることもできます。この**多項式の根**は曲線上の点や座標ではありません。拡大体の点数を数値として表すための道具です。

<a id="def-ec8-frobenius-roots"></a>

<!-- formal-statement-start -->
> **定義（Frobeniusの二つの根）**  
> $E/\mathbb F_q$ の点数差を $a_q=q+1-\#E(\mathbb F_q)$ とする。複素多項式

$$
P_q(U)=U^2-a_qU+q
$$

> の二つの根を $\alpha,\beta$ と書き、Frobeniusの根と呼ぶ。重根のときも重複を数えて二つとする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec8-frobenius-roots -->
**定義の確認**。$\mathbb F_3$ の $E:y^2=x^3+x+1$ では[EC7の計数](../EC7/index.md#def-ec7-trace)から $N_1=4$、$a_3=0$ です。よって $P_3(U)=U^2+3$、$\alpha=i\sqrt3$、$\beta=-i\sqrt3$ となります。代入すると $P_3(\alpha)=P_3(\beta)=0$、和は0、積は3です。複素数の根は $\mathbb F_3$ にあると主張していません。
<!-- definition-example-end -->

[Hasse評価](#thm-ec8-hasse)から $a_q^2-4q\le0$ です。従って $\alpha,\beta$ は互いに複素共役（等しい実根の場合を含む）で、二次式を $(U-\alpha)(U-\beta)$ と展開して係数を比較すれば

$$
\alpha+\beta=a_q,\qquad \alpha\beta=q,\qquad
|\alpha|=|\beta|=\sqrt q.
$$

重根の場合は $\alpha=\beta=\pm\sqrt q$ で同じ絶対値が成立します。$q$ 乗Frobeniusの次数 $q$ とこの絶対値 $\sqrt q$ は同じものではありません。

<a id="thm-ec8-extension-counts"></a>

<!-- formal-statement-start -->
> **定理（拡大体上の点数公式）**  
> $E/\mathbb F_q$ を非特異楕円曲線、$\alpha,\beta$ を上のFrobeniusの根とする。正整数 $n$ ごとに

$$
N_n=\#E(\mathbb F_{q^n})
$$

> と置くと

$$
N_n=q^n+1-\alpha^n-\beta^n
$$

> が成り立つ。また $s_n=\alpha^n+\beta^n$ は

$$
s_0=2,\qquad s_1=a_q,\qquad
s_n=a_qs_{n-1}-qs_{n-2}\quad(n\ge2)
$$

> を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

$\pi^n$ は $q^n$ 乗Frobeniusなので、$\deg\pi^n=q^n$ です。$\#E(\mathbb F_{q^n})$ は $\deg(1-\pi^n)$。二次関係式をトレースにかければ、点数差 $s_n$ と根の冪和が同じ漸化式・初期値を持つことが分かります。

<!-- proof-start -->
### 証明

[有理点とFrobenius固定点の定理](../EC7/index.md#thm-ec7-fixed-points)により $E(\mathbb F_{q^n})=\ker(1-\pi^n)$ です。$\pi^n$ は座標の $q^n$ 乗写像であり、原点の微分は零です。従って $1-\pi^n$ の微分は恒等となって分離的です。[EC7で使った分離的射の次数と核の対応](../EC7/index.md#prop-ec7-one-minus-frobenius)の議論をそのまま適用し

$$
N_n=\deg(1-\pi^n)
$$

を得ます。[次数の合成則](../EC4/index.md#def-ec4-degree)と $\deg\pi=q$ から $\deg\pi^n=q^n$。トレースの定義で展開すると

$$
N_n=1+q^n-\operatorname{Tr}_{\deg}(\pi^n).
$$

ここで $t_n=\operatorname{Tr}_{\deg}(\pi^n)=B(1,\pi^n)$ と置きます。$t_0=B(1,1)=2$、$t_1=B(1,\pi)=a_q$ です。[二次関係式](#thm-ec8-frobenius-polynomial)を $\pi^{n-2}$ と合成すれば、$n\ge2$ で

$$
\pi^n=[a_q]\pi^{n-1}-[q]\pi^{n-2}.
$$

$B(1,\cdot)$ の加法性を使い

$$
t_n=a_qt_{n-1}-qt_{n-2}.
$$

他方、$\alpha,\beta$ はそれぞれ $z^2=a_qz-q$ を満たすため

$$
\alpha^n+\beta^n
=a_q(\alpha^{n-1}+\beta^{n-1})
-q(\alpha^{n-2}+\beta^{n-2})
$$

であり、初期値も $2,a_q$ と一致します。帰納法で $t_n=\alpha^n+\beta^n$ が全ての $n$ で成り立ちます。最後に $N_n=1+q^n-t_n$ へ代入します。$\square$
<!-- proof-end -->

とくに最初の二段は

$$
s_2=a_q^2-2q,\qquad
s_3=a_q^3-3qa_q.
$$

$\mathbb F_5$ の $y^2=x^3+x+1$ では $a_5=-3$ なので

$$
N_2=25+1-\bigl((-3)^2-2\cdot5\bigr)
=26-(9-10)=27.
$$

また拡大体でも $|s_n|\le2q^{n/2}$ です。これは $|\alpha|=|\beta|=\sqrt q$ と三角不等式から直接従い、$|N_n-(q^n+1)|\le2q^{n/2}$ を与えます。

### $\mathbb F_9$ の16点を別の方法で数える

$\mathbb F_3[u]/(u^2+1)$ と書けば $u^2=2$、全元は $a+bu$（$a,b\in\mathbb F_3$）です。$x=a+bu$ に対し標数3の二項展開と $u^3=2u$ を使うと

$$
x^3+x+1
=(a^3+b^3u^3)+(a+bu)+1
=2a+1.
$$

$a=0,1,2$ の場合に右辺は順に $1,0,2$ で、各場合に $b$ の3通りがあります。$\mathbb F_9$ では $1$ と $2$ はともに非零平方（$u^2=2$）なので $y$ はそれぞれ2通り、右辺が0なら1通り。従って

$$
N_2=1+3\cdot2+3\cdot1+3\cdot2=16.
$$

点数公式に $a_3=0$ を代入すると $N_2=9+1-(0-6)=16$ です。直接計数とFrobeniusの漸化式が一致しました。

## 5. 無限個の点数を一つの関数へまとめる

$N_1,N_2,\ldots$ を順番に記録する代わりに、これらが係数として復元できる形式的な級数を考えます。ここでは $T$ は**形式変数**であり、収束半径を仮定しません。$\mathbb Q[[T]]$ は有理数係数の形式的冪級数の環、$T\mathbb Q[[T]]$ は定数項0の級数全体です。$X,Y\in T\mathbb Q[[T]]$ に対し

$$
\exp X=\sum_{k=0}^{\infty}\frac{X^k}{k!},
\qquad
\log(1+Y)=\sum_{k=1}^{\infty}
\frac{(-1)^{k+1}Y^k}{k}
$$

と定義できます。各 $T^j$ の係数を求める際には有限個の項だけを使うため、解析的収束は不要です。以下、$O(T^j)$ は次数 $j$ 以上の項だけからなる級数を表します。

<a id="def-ec8-zeta"></a>

<!-- formal-statement-start -->
> **定義（有限体上の楕円曲線のゼータ関数）**  
> 非特異楕円曲線 $E/\mathbb F_q$ について、$N_n=\#E(\mathbb F_{q^n})$ とする。形式的冪級数

$$
Z(E/\mathbb F_q,T)
=\exp\left(\sum_{n=1}^{\infty}\frac{N_n}{n}T^n\right)
\in 1+T\mathbb Q[[T]]
$$

> を有限体上のゼータ関数という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-ec8-zeta -->
**定義の確認**。$N_1=4,N_2=16$ である $\mathbb F_3$ の曲線なら、指数の内部は $4T+8T^2+O(T^3)$ です。$\exp X=1+X+X^2/2+\cdots$ を二次まで使い

$$
Z=1+4T+(8+4^2/2)T^2+O(T^3)
=1+4T+16T^2+O(T^3).
$$

定数項は1で、定義に現れる各係数は拡大体上の有限な点数から決まります。
<!-- definition-example-end -->

<a id="thm-ec8-zeta-rational"></a>

<!-- formal-statement-start -->
> **定理（楕円曲線ゼータ関数の有理表示）**  
> $E/\mathbb F_q$ を非特異楕円曲線とし、$a_q=q+1-\#E(\mathbb F_q)$ とすると

$$
Z(E/\mathbb F_q,T)
=\frac{1-a_qT+qT^2}{(1-T)(1-qT)}
$$

> が形式的冪級数の等式として成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

点数公式を指数の中へ代入して、$1,q,\alpha,\beta$ の4つの等比数列に分けます。$\sum_{n\ge1}z^nT^n/n=-\log(1-zT)$ の係数等式を使います。

<!-- proof-start -->
### 証明

[拡大体上の点数公式](#thm-ec8-extension-counts)を定義へ代入します。

$$
\begin{aligned}
\sum_{n\ge1}\frac{N_nT^n}{n}
&=\sum_{n\ge1}\frac{T^n}{n}
+\sum_{n\ge1}\frac{(qT)^n}{n}\\
&\quad-\sum_{n\ge1}\frac{(\alpha T)^n}{n}
-\sum_{n\ge1}\frac{(\beta T)^n}{n}.
\end{aligned}
$$

$-\log(1-zT)=\sum_{n\ge1}(zT)^n/n$ は形式的に微分すると両辺が $z/(1-zT)$ となり、定数項がともに0であることから確かめられます。これを4項へ使うと

$$
\log Z
=-\log(1-T)-\log(1-qT)
+\log(1-\alpha T)+\log(1-\beta T).
$$

指数を取り、全因子の定数項が1であることを使って

$$
Z=\frac{(1-\alpha T)(1-\beta T)}{(1-T)(1-qT)}.
$$

最後に $\alpha+\beta=a_q$ と $\alpha\beta=q$ を代入すると

$$
(1-\alpha T)(1-\beta T)
=1-(\alpha+\beta)T+\alpha\beta T^2
=1-a_qT+qT^2
$$

となって結論です。$\square$
<!-- proof-end -->

例えば $\mathbb F_5$ 上で $a_5=-3$ の曲線は

$$
Z(T)=\frac{1+3T+5T^2}{(1-T)(1-5T)}.
$$

定義から二次係数は $(N_1^2+N_2)/2=(9^2+27)/2=54$ です。有理式側でも $(1-T)^{-1}(1-5T)^{-1}=1+6T+31T^2+\cdots$ なので、二次係数は $31+3\cdot6+5=54$。異なる表示が一致します。

一般の滑らかな射影曲線にはもっと高い次数の分子が現れますが、ここで証明したのは**楕円曲線**の式です。一般曲線のWeil予想を仮定して証明を代用してはいません。

## 6. 演習：次数・漸化式・直接計数を往復する

### A1. Hasse評価から候補を絞る

$E/\mathbb F_7$ が非特異楕円曲線であるとき、$N_1$ の取り得る整数範囲を求めよ。

- Level: A
- ID: EC8-A1

<!-- solution-start -->
### 詳細解答

[Hasse評価](#thm-ec8-hasse)の $q=7$ を代入すると $8-2\sqrt7\le N_1\le8+2\sqrt7$ です。$2\sqrt7\approx5.29$ より下端は約2.71、上端は約13.29。整数であるため $3\le N_1\le13$ です。これは必要条件で、区間の全整数が実現すると主張していません。
<!-- solution-end -->

### A2. 根と二段目の点数

$q=5$、$a_q=-3$ となる楕円曲線について $\alpha+\beta$、$\alpha\beta$、$s_2$、$N_2$ を順に求めよ。

- Level: A
- ID: EC8-A2

<!-- solution-start -->
### 詳細解答

[Frobeniusの根の定義](#def-ec8-frobenius-roots)より $\alpha+\beta=-3,\alpha\beta=5$ です。従って

$$
s_2=\alpha^2+\beta^2=(\alpha+\beta)^2-2\alpha\beta
=9-10=-1.
$$

[拡大体上の点数公式](#thm-ec8-extension-counts)に $n=2$ を入れて $N_2=5^2+1-(-1)=27$ です。
<!-- solution-end -->

### A3. 漸化式を三段目まで使う

$q=3,a_q=0$ のとき $s_0,s_1,s_2,s_3$ と $N_3$ を求めよ。

- Level: A
- ID: EC8-A3

<!-- solution-start -->
### 詳細解答

[拡大体上の点数公式の漸化式](#thm-ec8-extension-counts)の初期値 $s_0=2,s_1=0$ から

$$
s_2=0\cdot s_1-3s_0=-6,\qquad
s_3=0\cdot s_2-3s_1=0.
$$

従って $N_3=3^3+1-s_3=28$。$N_2=9+1-(-6)=16$ と混同しないよう、$n=3$ では体の大きさが27になることを確認します。
<!-- solution-end -->

### A4. ゼータ関数の二次係数

$N_1=5,N_2=5$ の場合、ゼータ関数の $T,T^2$ の係数を定義から計算せよ。

- Level: A
- ID: EC8-A4

<!-- solution-start -->
### 詳細解答

[ゼータ関数の定義](#def-ec8-zeta)の指数の中身を二次で切ると

$$
X=N_1T+\frac{N_2}{2}T^2+O(T^3)
=5T+\frac52T^2+O(T^3).
$$

$\exp X=1+X+X^2/2+O(T^3)$ とし、$X^2/2=(25/2)T^2+O(T^3)$ なので

$$
Z=1+5T+\left(\frac52+\frac{25}{2}\right)T^2+O(T^3)
=1+5T+15T^2+O(T^3).
$$
<!-- solution-end -->

### B1. 次数の二次性から符号を確定する

$\deg\pi=q$、$\deg(1-\pi)=q+1-a$ を仮定する。$\deg([m]-[n]\pi)$ の二次式を求め、そこから $a^2\le4q$ を整数 $m,n$ だけで証明せよ。

- Level: B
- ID: EC8-B1

<!-- solution-start -->
### 詳細解答

$B(1,\pi)=\deg1+\deg\pi-\deg(1-\pi)=1+q-(q+1-a)=a$ です。[次数の二次性](../EC4/index.md#thm-ec4-degree-quadratic)により

$$
\deg([m]-[n]\pi)=m^2-amn+qn^2\ge0.
$$

もし $a^2>4q$ なら $c=a^2/4-q>0$。$n$ を任意の正整数、$m$ を $an/2$ に最も近い整数として取れば

$$
0\le\deg([m]-[n]\pi)
=\left(m-\frac{an}{2}\right)^2-cn^2
\le\frac14-cn^2.
$$

$n>1/(2\sqrt c)$ なら右辺が負です。矛盾ゆえ $a^2\le4q$。$m,n$ を実数に拡張したという暗黙の仮定は不要です。
<!-- solution-end -->

### B2. $\mathbb F_9$を手で数えて公式と突き合わせる

$E:y^2=x^3+x+1$ を $\mathbb F_3$ 上で考える。$\mathbb F_9=\mathbb F_3[u]$、$u^2=2$ と置いて $\#E(\mathbb F_9)$ を直接求め、$a_3=0$ の公式でも確認せよ。

- Level: B
- ID: EC8-B2

<!-- solution-start -->
### 詳細解答

$x=a+bu$、$a,b\in\mathbb F_3$ と置きます。標数3なので $(a+bu)^3=a^3+b^3u^3=a+2bu$、$u^3=2u$。従って

$$
x^3+x+1=(a+2bu)+(a+bu)+1=2a+1.
$$

$a=0,1,2$ の順に右辺は $1,0,2$。$\mathbb F_9$ で $1=1^2$、$2=u^2$ はともに非零平方です。各 $a$ で $b$ は3通り、$y$ の数は順に2、1、2。無限遠点を足し

$$
N_2=1+3(2+1+2)=16.
$$

[点数公式](#thm-ec8-extension-counts)から $s_2=a_3^2-2\cdot3=-6$、よって $N_2=9+1-(-6)=16$ となり一致します。
<!-- solution-end -->

### B3. 標数2での拡大体点数

$\mathbb F_2$ 上の $E:y^2+y=x^3+x$ は $N_1=5$ である。$a_2$、$N_2$、$N_3$、ゼータ関数を求め、標数2の短いWeierstrass形を持ち込んでいないことを確認せよ。

- Level: B
- ID: EC8-B3

<!-- solution-start -->
### 詳細解答

[EC7の全点列挙](../EC7/index.md#def-ec7-trace)により $a_2=2+1-5=-2$ です。[拡大体上の点数公式の漸化式](#thm-ec8-extension-counts)に $q=2,a_q=-2$ を入れると

$$
s_0=2,\qquad s_1=-2,\qquad
s_n=-2s_{n-1}-2s_{n-2}\quad(n\ge2)
$$

となるので、

$$
s_2=(-2)(-2)-2(2)=0,\qquad
s_3=(-2)\cdot0-2(-2)=4.
$$

従って $N_2=4+1-0=5$、$N_3=8+1-4=5$。[ゼータ関数の有理表示](#thm-ec8-zeta-rational)は

$$
Z(T)=\frac{1-(-2)T+2T^2}{(1-T)(1-2T)}
=\frac{1+2T+2T^2}{(1-T)(1-2T)}.
$$

用いたのは一般Weierstrass形の $y^2+y=x^3+x$ です。標数2で不適切な $y^2=x^3+Ax+B$ への変形は一切行っていません。
<!-- solution-end -->

### C1. 有限体ゼータ関数まで通して導出する

$E/\mathbb F_q$ を非特異楕円曲線、$\pi$ を$q$-Frobenius、$N_1=\deg(1-\pi)$ とする。[EC4の次数の二次性](../EC4/index.md#thm-ec4-degree-quadratic)と乗法性を使い、(i) Hasse評価、(ii) $\pi^2-[a_q]\pi+[q]=0$、(iii) $N_n$ の公式、(iv) ゼータ関数の有理式を順に導け。$a_q=q+1-N_1$ とする。

- Level: C
- ID: EC8-C1

<!-- solution-start -->
### 詳細解答

**(i)** $B(1,\pi)=1+q-N_1=a_q$ を二次形式に代入して

$$
\deg([m]-[n]\pi)=m^2-a_qmn+qn^2\ge0.
$$

$a_q^2>4q$ と仮定し、$m$ を $a_qn/2$ に最も近い整数にすると $0\le1/4-(a_q^2/4-q)n^2$。十分大きい整数 $n$ で矛盾するので $|a_q|\le2\sqrt q$ です。

**(ii)** $A_{\mathbb Q}=\operatorname{End}(E)\otimes\mathbb Q$ とし $D=\deg$、$B(1,u)=\tau(u)$ とします。$v=u-\tau(u)1/2$、$d=D(v)$ と置くと $B(1,v)=0$ なので

$$
D(1+v)D(1-v)=(1+d)^2
=D(1-v^2)=1+d^2-B(1,v^2).
$$

ゆえに $B(1,v^2)=-2d$、$D(v^2+d1)=d^2-2d^2+d^2=0$。非零の元の次数は正なので $v^2=-d1$ です。展開して $u^2-\tau(u)u+D(u)1=0$ を得ます。$u=\pi$ では $D(\pi)=q$、$\tau(\pi)=a_q$ だから求める二次関係式となります。

**(iii)** $t_n=B(1,\pi^n)$ とすると $t_0=2$、$t_1=a_q$ です。[Frobeniusの二次関係式](#thm-ec8-frobenius-polynomial)に $\pi^{n-2}$ を合成し、$B(1,\cdot)$ の加法性を適用すると

$$
t_n=a_qt_{n-1}-qt_{n-2}\qquad(n\ge2)
$$

を得ます。$U^2-a_qU+q$ の根 $\alpha,\beta$ の冪和も同じ漸化式と初期値を満たすため、$t_n=\alpha^n+\beta^n$ です。

[EC7の固定点定理](../EC7/index.md#thm-ec7-fixed-points)から $E(\mathbb F_{q^n})=\ker(1-\pi^n)$ です。$\pi^n$ は $q^n$ 乗Frobeniusなので原点での微分が零となり、

$$
d(1-\pi^n)_O=1-d(\pi^n)_O=1\ne0
$$

です。よって $1-\pi^n$ は分離的であり、[EC7の差の射の次数の証明](../EC7/index.md#prop-ec7-one-minus-frobenius)と同じく核の点数が次数に等しいため

$$
N_n=\deg(1-\pi^n)=1+q^n-t_n
=1+q^n-\alpha^n-\beta^n.
$$

**(iv)** [ゼータ関数の定義](#def-ec8-zeta)の指数に代入して

$$
\begin{aligned}
\log Z
&=\sum_{n\ge1}\frac{(1+q^n-\alpha^n-\beta^n)T^n}{n}\\
&=-\log(1-T)-\log(1-qT)
+\log(1-\alpha T)+\log(1-\beta T).
\end{aligned}
$$

形式的に指数を取り、$\alpha+\beta=a_q$、$\alpha\beta=q$ を使って

$$
Z(E/\mathbb F_q,T)
=\frac{(1-\alpha T)(1-\beta T)}{(1-T)(1-qT)}
=\frac{1-a_qT+qT^2}{(1-T)(1-qT)}.
$$

根の絶対値は (i) の判別式条件と $\alpha\beta=q$ から $\sqrt q$ です。この導出は楕円曲線の場合だけで閉じており、一般曲線のWeil予想を援用していません。
<!-- solution-end -->

## 7. 次章への接続

有限体上で一度求めた $a_q$ は、全ての拡大体の点数とゼータ関数の分子を決定します。一方、整数係数で与えた楕円曲線を素数 $p$ ごとに有限体へ移すと、ある素数では非特異性が壊れます。次のEC9では、**モデルの判別式が $p$ で消えること**と、**楕円曲線そのものの良い還元・悪い還元**を区別します。この区別がEC10の素数別Euler因子へ進むために必要です。
