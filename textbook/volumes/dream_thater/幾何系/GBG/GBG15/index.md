# GBG15 閉路の平行移動から何が分かるか

[GBG14 の平行移動](../GBG14/index.md#def-gbg14-parallel-transport)は、曲線の始点のファイバーから終点のファイバーへ点を運ぶ。曲線が閉じていれば、始点と終点は同じファイバーにある。しかし**閉路を一周しても、主束の点が元へ戻るとは限らない**。そのずれを、曲線と接続に対応する群の元として取り出そう。

本講では、まず閉路の輸送が作るホロノミー群を構成し、基準となる主束の点や基点を替えたときの変化を証明する。次に、ごく小さな矩形を一周する輸送を二次まで計算して、[GBG10 の曲率](../GBG10/index.md#thm-gbg10-local-formula)がそのずれの主項であることを明らかにする。平坦接続の大域的な帰結は GBG16、表現の跡から作る量は GBG17 に譲る。

**共通設定**：$M$ は Hausdorff・第二可算・境界のない滑らかな有限次元多様体、$G$ は有限次元 Lie 群、$\pi:P\to M$ は滑らかな右主 $G$ 束、$\omega$ は滑らかな主束接続形式とする。曲線は区分的 $C^1$、各区分の導関数は端点まで連続に延長できるものとする。以下の群の構成には $G$ が行列群である必要はない。

## 1. 閉路から群の元を得る

点 $x\in M$ に始終点を持つ曲線 $\gamma:[0,1]\to M$（$\gamma(0)=\gamma(1)=x$）を、**$x$ を基点とする閉路**として扱う。点 $p\in P_x=\pi^{-1}(x)$ を一つ選ぶ。閉路に沿う平行移動は $P_x\to P_x$ である。[GBG2 の主束の自由・推移的な右作用](../GBG2/index.md#def-gbg2-principal-bundle)より、輸送された点はただ一つの $h_\gamma(p)\in G$ を用いて

$$
\operatorname{PT}_\gamma(p)=p\,h_\gamma(p)
$$

と書ける。**同じ基底の基点 $x$ に加えて、ファイバー上の基準点 $p$ も選んでいる**ことに注意する。この群元を全閉路について集める。

<a id="def-gbg15-holonomy"></a>

<!-- formal-statement-start -->
> **定義（主束接続のホロノミー群）**  
> 接続付き右主 $G$ 束 $(P,\omega)$、点 $x\in M$、$p\in P_x$ を固定する。$x$ を基点とするすべての区分的 $C^1$ 閉路 $\gamma$ に対して、[平行移動](../GBG14/index.md#def-gbg14-parallel-transport)を用いて一意に定まる $h_\gamma(p)\in G$ を
>
> $$
> \operatorname{PT}_\gamma(p)=p\,h_\gamma(p)
> $$
>
> によって定める。その全体
>
> $$
> \operatorname{Hol}_p(\omega)
> =\{h_\gamma(p)\mid\gamma(0)=\gamma(1)=x\}\subset G
> $$
>
> を $p$ における**ホロノミー群**という。この集合が実際に部分群になることは次の定理で示す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-gbg15-holonomy -->
**定義の確認**。積主束 $P=\mathbb R^2\times U(1)$ に、標準 section $s(x,y)=((x,y),1)$ と局所接続 $A=i b x\,dy$（$b\in\mathbb R$）を取る。積主束でこの $A$ から接続形式を構成できることは[GBG7 の積主束公式](../GBG7/index.md#prop-gbg7-product-form)による。原点を起点に単位正方形の辺を $+x,+y,-x,-y$ の順に進む閉路を $\gamma$ とする。水平方程式 $\dot g=-A(\dot\gamma)g$ では $+y$ の辺だけ $A(\dot\gamma)=ib$ で、残りは零だから

$$
\operatorname{PT}_\gamma((0,0,g_0))
=(0,0,e^{-ib}g_0).
$$

従って $p=(0,0,g_0)$ なら $h_\gamma(p)=e^{-ib}$ である。始終点はともに $P_{(0,0)}$ にあり、右作用の元は一意で、定義の条件を直接満たす。$b$ が $2\pi$ の整数倍でなければ、閉路であっても輸送は恒等ではない。
<!-- definition-example-end -->

### 連結路の積の順序を決める

前講では $\gamma_2*\gamma_1$ を「$\gamma_1$ の後に $\gamma_2$」と約束した。この連結規約のもとで、後から通る路のホロノミーが**左側**に来る。これを曖昧にすると群の証明で積の順序を取り違える。

<a id="thm-gbg15-holonomy-subgroup"></a>

<!-- formal-statement-start -->
> **定理（ホロノミーは部分群をなす）**  
> 上記の接続付き右主 $G$ 束、$x\in M$、$p\in P_x$ に対し、$\operatorname{Hol}_p(\omega)$ は $G$ の部分群である。$x$ を基点とする二閉路 $\gamma_1,\gamma_2$ について
>
> $$
> h_{\gamma_2*\gamma_1}(p)
> =h_{\gamma_2}(p)\,h_{\gamma_1}(p),
> \qquad
> h_{\bar\gamma_1}(p)=h_{\gamma_1}(p)^{-1}
> $$
>
> が成立する。ここで $\bar\gamma(t)=\gamma(1-t)$ は逆向きの路である。
<!-- formal-statement-end -->

**証明の見取り図**。輸送の[右同変性・連結・逆路の公式](../GBG14/index.md#thm-gbg14-transport-laws)を一つずつ適用する。特に最初の輸送後の点 $p h_{\gamma_1}$ を、次の輸送へ**そのまま代入**する。

<!-- proof-start -->
### 証明

定値路 $c_x$ は、[前講の定値路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)から $\operatorname{PT}_{c_x}(p)=p$ なので $h_{c_x}(p)=e$ である。

$h_j=h_{\gamma_j}(p)$ と書く。路の合成則、右同変性、右作用の結合則をこの順に用いると

$$
\begin{aligned}
\operatorname{PT}_{\gamma_2*\gamma_1}(p)
&=\operatorname{PT}_{\gamma_2}\bigl(\operatorname{PT}_{\gamma_1}(p)\bigr)\\
&=\operatorname{PT}_{\gamma_2}(p h_1)\\
&=\operatorname{PT}_{\gamma_2}(p)h_1\\
&=(p h_2)h_1=p(h_2h_1).
\end{aligned}
$$

右作用が自由だから $h_{\gamma_2*\gamma_1}(p)=h_2h_1$。逆路について、[逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)から

$$
\operatorname{PT}_{\bar\gamma_1}(p h_1)
=\operatorname{PT}_{\gamma_1}^{-1}\bigl(\operatorname{PT}_{\gamma_1}(p)\bigr)
=p.
$$

右同変性によって左辺は $\operatorname{PT}_{\bar\gamma_1}(p)h_1$ なので、右作用の自由性から $h_{\bar\gamma_1}(p)=h_1^{-1}$。全閉路の集合は積、逆元、単位元を含み、部分群である。
<!-- proof-end -->

この積順序は「閉路から群への通常の準同型」と無条件に書けない理由でもある。路の積の約束を替えれば準同型の表記も変わる。実際に使用するのは上で証明した式である。

## 2. 基準点を替えたときの共役

ホロノミー群には基底上の基点 $x$ とファイバー上の点 $p$ の二つの選択が入る。まず同じファイバーで $p$ を $pk$ へ替えると何が起きるか。さらに $x$ 自体を別の基点へ動かす。

<a id="thm-gbg15-base-change"></a>

<!-- formal-statement-start -->
> **定理（ファイバーの基準点と基点の変更）**  
> 接続付き右主 $G$ 束 $(P,\omega)$ を固定する。
>
> **（1）** $p\in P_x$、$k\in G$、$p'=pk$ なら、任意の $x$ における閉路 $\gamma$ について
>
> $$
> h_\gamma(p')=k^{-1}h_\gamma(p)k,
> \qquad
> \operatorname{Hol}_{p'}(\omega)
> =k^{-1}\operatorname{Hol}_p(\omega)k.
> $$
>
> **（2）** $x,y\in M$ を区分的 $C^1$ 曲線 $\sigma:x\to y$ で結べるとする。$q=\operatorname{PT}_\sigma(p)\in P_y$ なら
>
> $$
> \operatorname{Hol}_q(\omega)
> =\operatorname{Hol}_p(\omega).
> $$
>
> さらに $q'=qk$ を選べば、$y$ での群は $k^{-1}\operatorname{Hol}_p(\omega)k$ となる。ここで等号は、同じ構造群 $G$ の部分集合としての等号である。
<!-- formal-statement-end -->

**証明の見取り図**。ファイバー上の基準点変更には輸送の右同変性を使う。基底上の基点変更では、$y$ の閉路の前後に $\sigma$ と逆路をつなぎ、$x$ の閉路に戻す。どちらも[輸送の三法則](../GBG14/index.md#thm-gbg14-transport-laws)だけで示せる。

<!-- proof-start -->
### 証明

**（1）** [右同変性](../GBG14/index.md#thm-gbg14-transport-laws)を使うと

$$
\operatorname{PT}_\gamma(pk)
=\operatorname{PT}_\gamma(p)k
=(p h_\gamma(p))k
=(pk)(k^{-1}h_\gamma(p)k).
$$

$pk$ に対する群元の一意性から第一式が従う。閉路全体を動かせば両方向の包含が得られ、群の共役の等式になる。

**（2）** $y$ を基点とする閉路 $\delta$ を任意に取り、$\beta=\bar\sigma*\delta*\sigma$ と置く。前講の連結規約では、$\beta$ は $x$ から $\sigma$ を進み、次に $\delta$、最後に $\bar\sigma$ を進む閉路である。$h=h_\delta(q)$ と置くと

$$
\begin{aligned}
\operatorname{PT}_\beta(p)
&=\operatorname{PT}_{\bar\sigma}
  \bigl(\operatorname{PT}_\delta(\operatorname{PT}_\sigma(p))\bigr)\\
&=\operatorname{PT}_{\bar\sigma}(q h)\\
&=\operatorname{PT}_{\bar\sigma}(q)\,h
=p h.
\end{aligned}
$$

最終行では[逆路と右同変性](../GBG14/index.md#thm-gbg14-transport-laws)を使った。従って $h_\delta(q)=h_\beta(p)$ で、$\operatorname{Hol}_q(\omega)\subseteq\operatorname{Hol}_p(\omega)$。反対の包含は、任意の $x$ の閉路 $\gamma$ を $y$ の閉路 $\sigma*\gamma*\bar\sigma$ へ移す同じ議論から従う。最後の共役式は（1）を $q$ に適用すればよい。
<!-- proof-end -->

**何が不変なのか**。ファイバー上の点の選択によりホロノミー群は一般に**共役でしか決まらない**。一方、基点を曲線 $\sigma$ に沿って移動させたとき、ファイバーの点も平行移動で運べば、集合として同じ部分群になる。基点間を結ぶ路が存在しない異なる連結成分については、この定理は何も主張しない。

### 局所sectionで計算する際の注意

局所section $s:U\to P$ の領域 $U$ に閉路 $\gamma$ が収まり、$G\subset GL(n,\mathbb F)$ が行列 Lie 群であるとする。$U_\gamma$ を[GBG14 の局所輸送行列](../GBG14/index.md#prop-gbg14-local-transport)（初期値 $I$）とする。これまでの $h_\gamma(p)$ は、単なる $U_\gamma$ とは限らない。

<a id="prop-gbg15-local-holonomy"></a>

<!-- formal-statement-start -->
> **命題（局所輸送行列とホロノミーの共役）**  
> 接続付き右主行列群束、$x\in U$、$\gamma\subset U$ を上記のように取る。$p=s(x)g_0$（$g_0\in G$）なら
>
> $$
> h_\gamma(p)=g_0^{-1}U_\gamma g_0.
> $$
>
> section を $s'=sk$（$k:U\to G$ は滑らか）へ変更すると
>
> $$
> U'_\gamma=k(x)^{-1}U_\gamma k(x).
> $$
>
> 固定した**主束の点 $p$** に対する $h_\gamma(p)$ は section の選択によらない。
<!-- formal-statement-end -->

**証明の見取り図**。前講の開いた路の公式では、ゲージ変換が始点と終点に別々に現れる。閉路では二点が同じ $x$ となるため、共役に簡約される。

<!-- proof-start -->
### 証明

[局所輸送行列の公式](../GBG14/index.md#prop-gbg14-local-transport)によって

$$
\operatorname{PT}_\gamma(s(x)g_0)
=s(x)U_\gamma g_0
=(s(x)g_0)(g_0^{-1}U_\gamma g_0).
$$

右作用の自由性から一式目を得る。同じ[section 変更の公式](../GBG14/index.md#prop-gbg14-local-transport)を閉路に使うと、始点・終点はともに $x$ だから二式目を得る。

新しい section では $p=s'(x)g'_0$、$g'_0=k(x)^{-1}g_0$ である。これを新しい局所輸送行列へ代入すると

$$
\begin{aligned}
(g'_0)^{-1}U'_\gamma g'_0
&=g_0^{-1}k(x)\,
  \bigl(k(x)^{-1}U_\gamma k(x)\bigr)\,
  k(x)^{-1}g_0\\
&=g_0^{-1}U_\gamma g_0=h_\gamma(p).
\end{aligned}
$$

よって固定された $p$ の群元は section に依存しない。
<!-- proof-end -->

## 3. 微小矩形の輸送は曲率を読み取る

曲率は[GBG10 の局所構造方程式](../GBG10/index.md#thm-gbg10-local-formula)で

$$
F=dA+A\wedge A,
\qquad
F_{xy}=\partial_xA_y-\partial_yA_x+[A_x,A_y]
$$

と書けた。ここで $A=A_x\,dx+A_y\,dy$、$F=F_{xy}\,dx\wedge dy$ は局所座標 $(x,y)$ に制限した記法である。今度は微小な正方形を四辺に分け、それぞれに沿って[水平ODE](../GBG14/index.md#thm-gbg14-horizontal-existence)を解く。面積に比例する最初の変化を計算すると、曲率の三つの項がそれぞれ異なる理由で現れる。

<a id="thm-gbg15-small-rectangle"></a>

<!-- formal-statement-start -->
> **定理（微小矩形の輸送と曲率）**  
> $G\subset GL(n,\mathbb F)$ を行列 Lie 群とし、$M$ 上の滑らかな主 $G$ 束と接続を考える。局所sectionと座標 $(x,y)$ における接続の表示を

$
A=A_x\,dx+A_y\,dy+\cdots
$

> とする。原点を $(0,0)$ とし、他の座標を固定する。十分小さい $\varepsilon>0$ に対して、頂点を順に

$
(0,0)\to(\varepsilon,0)\to(\varepsilon,\varepsilon)
\to(0,\varepsilon)\to(0,0)
$

> と通る正向きの閉路を $\partial R_\varepsilon$ と書く。その局所輸送行列は
>
> $$
> U_{\partial R_\varepsilon}
> =I-\varepsilon^2F_{xy}(0,0)+O(\varepsilon^3),
> $$
>
> $$
> F_{xy}(0,0)
> =\bigl(\partial_x A_y-\partial_y A_x+[A_x,A_y]\bigr)_{(0,0)}.
> $$
>
> 剰余 $O(\varepsilon^3)$ は、固定した行列ノルムで $\varepsilon$ が十分小さいとき $C\varepsilon^3$ 以下であることを意味する。各係数を $\varepsilon$ に依存しない近傍で $C^2$ として評価する。
<!-- formal-statement-end -->

**証明の見取り図**。四辺の各輸送は $I+O(\varepsilon)$。一辺の展開には接続係数の方向微分と $A^2/2$ が現れ、四辺を**通過する順序の逆から左に積む**と行列交換子 $-[A_x,A_y]$ が現れる。一次項は往路と復路で相殺される。

<!-- proof-start -->
### 証明

原点での値を

$$
X=A_x(0,0),\qquad Y=A_y(0,0)
$$

と置く。また $X_x=\partial_x A_x(0,0)$、$X_y=\partial_y A_x(0,0)$、$Y_x=\partial_x A_y(0,0)$、$Y_y=\partial_y A_y(0,0)$ と略記する。これらは各行列の偏微分であり、添字は微分方向を表す。四辺の局所輸送行列を順に $U_1,U_2,U_3,U_4$ と書く。

まず長さ $\varepsilon$ の一辺で、ODE $\dot U=-a(t)U$ の[経路順序積分級数](../GBG14/index.md#prop-gbg14-dyson-series)の最初の二項を取り出す。係数が $a(t)=a_0+t a_1+O(t^2)$ のとき、一次積分は $-\varepsilon a_0-\varepsilon^2a_1/2+O(\varepsilon^3)$、二次積分は $+\varepsilon^2 a_0^2/2+O(\varepsilon^3)$ である。三次以降は係数の一様有界性と体積 $\varepsilon^k/k!$ から $O(\varepsilon^3)$ に入る。この計算を各辺の向きと始点に適用する。

**第1辺**（$(0,0)\to(\varepsilon,0)$）では $a(t)=A_x(t,0)=X+t X_x+O(t^2)$ より

$$
U_1=I-\varepsilon X
+\frac{\varepsilon^2}{2}(X^2-X_x)+O(\varepsilon^3).
$$

**第2辺**（$(\varepsilon,0)\to(\varepsilon,\varepsilon)$）では $a(t)=A_y(\varepsilon,t)=Y+\varepsilon Y_x+tY_y+O(\varepsilon^2)$ より

$$
U_2=I-\varepsilon Y
+\varepsilon^2\left(\frac12Y^2-Y_x-\frac12Y_y\right)
+O(\varepsilon^3).
$$

**第3辺**（$(\varepsilon,\varepsilon)\to(0,\varepsilon)$）を $t\in[0,\varepsilon]$ で $(\varepsilon-t,\varepsilon)$ と置く。速度は $-\partial_x$ なので $a(t)=-A_x(\varepsilon-t,\varepsilon)$。従って

$$
U_3=I+\varepsilon X
+\varepsilon^2\left(\frac12X^2+\frac12X_x+X_y\right)
+O(\varepsilon^3).
$$

**第4辺**（$(0,\varepsilon)\to(0,0)$）では速度は $-\partial_y$。同様に

$$
U_4=I+\varepsilon Y
+\frac{\varepsilon^2}{2}(Y^2+Y_y)
+O(\varepsilon^3).
$$

[連結路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)より、全周の輸送は $U_4U_3U_2U_1$ である。一次項は $-X-Y+X+Y=0$。二次項のうち、一辺の二次項の和は

$$
X^2+Y^2+X_y-Y_x
$$

である。他方、異なる二辺の一次項を掛ける交差項の和は

$$
\begin{aligned}
&(-Y)(-X)+X(-Y)+X(-X)\\
&\quad+YX+Y(-Y)+Y(-X)\\
&=YX-XY-X^2-Y^2.
\end{aligned}
$$

よって二次の合計は

$$
\begin{aligned}
X_y-Y_x+YX-XY
&=-(Y_x-X_y+XY-YX)\\
&=-F_{xy}(0,0).
\end{aligned}
$$

すべての剰余は近傍で一様に $O(\varepsilon^3)$ だから、求める展開が得られる。
<!-- proof-end -->

### 符号と係数を二つの例で検算する

**可換例**。$G=U(1)$、$A=ibx\,dy$ とする。$F=ib\,dx\wedge dy$ で、正方形の $+y$ 辺の係数だけが $ib\varepsilon$、長さは $\varepsilon$ である。従って厳密に

$$
U_{\partial R_\varepsilon}
=e^{-ib\varepsilon^2}
=1-ib\varepsilon^2+O(\varepsilon^4).
$$

曲率項の**負符号**と面積 $\varepsilon^2$ を別々に確認できる。

**非可換例**。$G=GL(2,\mathbb R)$、$H=E_{11}$、$N=E_{12}$ を用い、$\mathbb R^2$ の積主束に $A=H\,dx+N\,dy$ を取る。$N^2=0$、$[H,N]=N$ だから[局所曲率公式](../GBG10/index.md#thm-gbg10-local-formula)で $F=N\,dx\wedge dy$ となる。四辺に沿う輸送を順に掛けると

$$
\begin{aligned}
U_{\partial R_\varepsilon}
&=e^{\varepsilon N}e^{\varepsilon H}
  e^{-\varepsilon N}e^{-\varepsilon H}\\
&=(I+\varepsilon N)
  (I-\varepsilon e^\varepsilon N)\\
&=I+\varepsilon(1-e^\varepsilon)N\\
&=I-\varepsilon^2N+O(\varepsilon^3).
\end{aligned}
$$

二行目では $e^{\varepsilon H}N e^{-\varepsilon H}=e^\varepsilon N$ を使った。接続係数は位置によらないのに $F\ne0$ となり、**行列の非可換性だけ**で矩形輸送のずれが生じることが分かる。

## 4. 曲率が分かれば全閉路が分かるのか

微小矩形の定理は、曲率 $F_{xy}$ が閉路輸送の**局所的な二次係数**であることを示す。これは、同じ面積の微小な閉路では、向きが反転すると二次の符号が反転することも意味する。[逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)と $U^{-1}=I+\varepsilon^2F_{xy}+O(\varepsilon^3)$ が一致するからである。

ただし、一般の閉路の輸送を単に $\exp(-\int F)$ と書けるわけではない。非可換群では順序が残り、異なる点の曲率を同じ Lie 環で比較するにも輸送が必要になる。また本講の微小矩形の計算だけから、任意の Lie 群におけるホロノミーの Lie 環が曲率値で生成されるという一般の Ambrose–Singer 定理を証明したことにはならない。

さらに、同じ接続でも「ある閉路の輸送が恒等になる」ことと「曲率が零である」ことは異なる。往復路 $\bar\sigma*\sigma$ の輸送は[逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)によって常に恒等であり、その周囲に非零曲率があっても変わらない。

本講で確立したのは、**閉路輸送の群構造、選択による共役、微小矩形からの曲率の復元**である。曲率が零のとき、なお大きな閉路で非自明な輸送が起こり得るかは GBG16 で調べる。

---

## 5. 演習と詳細解答

### Level A：閉路の元と行列の基本操作

<a id="ex-gbg15-a01"></a>
#### GBG15-A01 定値路・往復路のホロノミー
- Level: A

接続付き右主 $G$ 束上で、$p\in P_x$ と区分的 $C^1$ 路 $\sigma:x\to y$ を取る。定値路 $c_x$ と往復閉路 $\bar\sigma*\sigma$ に対する $h_\gamma(p)$ を求めよ。

<!-- solution-start -->
**詳細解答**。[GBG14 の定値路・逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)より

$$
\operatorname{PT}_{c_x}(p)=p,\qquad
\operatorname{PT}_{\bar\sigma*\sigma}
=\operatorname{PT}_{\bar\sigma}\circ\operatorname{PT}_\sigma
=\operatorname{id}_{P_x}.
$$

従って $\operatorname{PT}_{\bar\sigma*\sigma}(p)=p$。右主作用の自由性から $p h=p$ を満たす $h$ は単位元 $e$ だけである。双方とも $h=e$。
<!-- solution-end -->

<a id="ex-gbg15-a02"></a>
#### GBG15-A02 積順序を自分で導く
- Level: A

基点 $x$ の閉路 $\gamma_1,\gamma_2$ に対し $h_{\gamma_1}(p)=a$、$h_{\gamma_2}(p)=b$ とする。先に $\gamma_1$、次に $\gamma_2$ を通ったときの群元と、二閉路を逆の順で通ったときの群元をそれぞれ求めよ。

<!-- solution-start -->
**詳細解答**。[平行移動の右同変性と連結則](../GBG14/index.md#thm-gbg14-transport-laws)を用い、

$$
\operatorname{PT}_{\gamma_2*\gamma_1}(p)
=\operatorname{PT}_{\gamma_2}(pa)
=\operatorname{PT}_{\gamma_2}(p)a
=pba.
$$

従って $h_{\gamma_2*\gamma_1}(p)=ba$。順序を逆にすれば

$$
\operatorname{PT}_{\gamma_1*\gamma_2}(p)
=\operatorname{PT}_{\gamma_1}(pb)
=pab,
$$

ゆえに $h_{\gamma_1*\gamma_2}(p)=ab$。$G$ が非可換なら二結果は一致するとは限らない。
<!-- solution-end -->

<a id="ex-gbg15-a03"></a>
#### GBG15-A03 ファイバーの点を替える
- Level: A

$G=GL(2,\mathbb R)$、$h_\gamma(p)=I+2E_{12}$、$k=\operatorname{diag}(2,1)$ とする。$p'=pk$ での $h_\gamma(p')$ を計算せよ。

<!-- solution-start -->
**詳細解答**。[基準点変更の定理](#thm-gbg15-base-change)から $h_\gamma(pk)=k^{-1}h_\gamma(p)k$。行列単位 $E_{12}$ に対して

$$
k^{-1}E_{12}k
=\begin{pmatrix}1/2&0\\0&1\end{pmatrix}
 \begin{pmatrix}0&1\\0&0\end{pmatrix}
 \begin{pmatrix}2&0\\0&1\end{pmatrix}
=\frac12E_{12}.
$$

従って

$$
h_\gamma(p')=I+2\cdot\frac12E_{12}=I+E_{12}.
$$
<!-- solution-end -->

<a id="ex-gbg15-a04"></a>
#### GBG15-A04 $U(1)$ の微小正方形
- Level: A

$P=\mathbb R^2\times U(1)$、$A=3ix\,dy$ とする。原点を基点とする辺長 $\varepsilon$ の正向き正方形の厳密なホロノミーを求め、曲率の二次項と照合せよ。

<!-- solution-start -->
**詳細解答**。[水平輸送の局所ODE](../GBG14/index.md#thm-gbg14-horizontal-existence)では $+y$ 辺だけ $A(\dot\gamma)=3i\varepsilon$ である。他の三辺は零なので

$$
U_{\partial R_\varepsilon}
=\exp(-3i\varepsilon^2)
=1-3i\varepsilon^2+O(\varepsilon^4).
$$

[曲率の局所公式](../GBG10/index.md#thm-gbg10-local-formula)で $F=dA=3i\,dx\wedge dy$。従って[微小矩形の定理](#thm-gbg15-small-rectangle)が予測する $I-\varepsilon^2F_{xy}(0)=1-3i\varepsilon^2$ と一致する。$U(1)$ は可換なので、どのファイバー点を選んでも群元は同じである。
<!-- solution-end -->

### Level B：証明と誤解しやすい仮定

<a id="ex-gbg15-b01"></a>
#### GBG15-B01 基点を道に沿って移す
- Level: B

$x,y\in M$ を結ぶ区分的 $C^1$ 路 $\sigma$、$p\in P_x$、$q=\operatorname{PT}_\sigma(p)$ を取る。$x$ を基点とする任意の閉路 $\gamma$ に対して、$y$ を基点とする閉路を構成し、そのホロノミー群元が $h_\gamma(p)$ と一致することを示せ。

<!-- solution-start -->
**詳細解答**。$\delta=\sigma*\gamma*\bar\sigma$ と置く。本講の連結記法では、$y$ から $\bar\sigma$ で $x$ へ戻り、$\gamma$ を一周し、$\sigma$ で $y$ へ向かう閉路である。$h=h_\gamma(p)$ とする。[合成・逆路・同変性](../GBG14/index.md#thm-gbg14-transport-laws)より

$$
\begin{aligned}
\operatorname{PT}_\delta(q)
&=\operatorname{PT}_\sigma
  \bigl(\operatorname{PT}_\gamma(
     \operatorname{PT}_{\bar\sigma}(q))\bigr)\\
&=\operatorname{PT}_\sigma(\operatorname{PT}_\gamma(p))\\
&=\operatorname{PT}_\sigma(p h)=q h.
\end{aligned}
$$

群元の一意性から $h_\delta(q)=h_\gamma(p)$。この方向は $\operatorname{Hol}_p\subseteq\operatorname{Hol}_q$ を与え、反対方向は[基点変更の定理](#thm-gbg15-base-change)の構成で得られる。
<!-- solution-end -->

<a id="ex-gbg15-b02"></a>
#### GBG15-B02 ゲージ表示と固定した主束の点
- Level: B

行列主束の閉路 $\gamma$ を含む局所自明化で、$p=s(x)g_0$、$U_\gamma=V$ とする。$s'=sk$ に替えたときの $U'_\gamma$ と $g'_0$ を求め、同じ $p$ の群元が変わらないことを計算で示せ。

<!-- solution-start -->
**詳細解答**。[前講の局所輸送変換則](../GBG14/index.md#prop-gbg14-local-transport)において始終点が同じ $x$ なので

$$
U'_\gamma=k(x)^{-1}Vk(x).
$$

$p=s(x)g_0=s'(x)g'_0=s(x)k(x)g'_0$ だから、自由な右作用を比較して $g'_0=k(x)^{-1}g_0$ である。[局所ホロノミーの公式](#prop-gbg15-local-holonomy)へ代入すると

$$
\begin{aligned}
(g'_0)^{-1}U'_\gamma g'_0
&=g_0^{-1}k(x)\bigl(k(x)^{-1}Vk(x)\bigr)
      k(x)^{-1}g_0\\
&=g_0^{-1}Vg_0.
\end{aligned}
$$

局所輸送行列そのものは共役で変わるが、固定した $p$ で測る群元は同じである。
<!-- solution-end -->

<a id="ex-gbg15-b03"></a>
#### GBG15-B03 非可換な矩形輸送を厳密に求める
- Level: B

$H=E_{11}$、$N=E_{12}$ とし、$A=H\,dx+N\,dy$ を $\mathbb R^2\times GL(2,\mathbb R)$ の接続の局所表示とする。正向き辺長 $\varepsilon$ の正方形の輸送行列を指数の積で書き、$N^2=0$ と $e^{\varepsilon H}N e^{-\varepsilon H}=e^\varepsilon N$ を使って厳密に簡約せよ。二次係数を曲率と比較せよ。

<!-- solution-start -->
**詳細解答**。[平行移動の合成則](../GBG14/index.md#thm-gbg14-transport-laws)を四辺へ順に適用する。各辺の係数は順に $H,N,-H,-N$ だから

$$
U_{\partial R_\varepsilon}
=e^{\varepsilon N}e^{\varepsilon H}
 e^{-\varepsilon N}e^{-\varepsilon H}.
$$

$N^2=0$ により $e^{\varepsilon N}=I+\varepsilon N$、$e^{-\varepsilon N}=I-\varepsilon N$。与えられた共役式から

$$
e^{\varepsilon H}(I-\varepsilon N)e^{-\varepsilon H}
=I-\varepsilon e^\varepsilon N.
$$

従って

$$
U_{\partial R_\varepsilon}
=(I+\varepsilon N)(I-\varepsilon e^\varepsilon N)
=I+\varepsilon(1-e^\varepsilon)N.
$$

$e^\varepsilon=1+\varepsilon+\varepsilon^2/2+O(\varepsilon^3)$ より $U=I-\varepsilon^2N+O(\varepsilon^3)$。他方、[曲率公式](../GBG10/index.md#thm-gbg10-local-formula)では $F_{xy}=[H,N]=N$ である。よって[矩形輸送定理](#thm-gbg15-small-rectangle)の負符号と一致する。
<!-- solution-end -->

<a id="ex-gbg15-b04"></a>
#### GBG15-B04 曲率が基点で零でも三次のずれはある
- Level: B

$P=\mathbb R^2\times U(1)$、$A=i\lambda x^2\,dy$（$\lambda\in\mathbb R$）とする。原点の微小正方形の曲率の値と厳密な輸送を求め、二次までの近似と実際のずれが矛盾しない理由を述べよ。

<!-- solution-start -->
**詳細解答**。[局所曲率の構造方程式](../GBG10/index.md#thm-gbg10-local-formula)と $U(1)$ の可換性から

$$
F=dA=2i\lambda x\,dx\wedge dy,
\qquad F_{xy}(0,0)=0.
$$

[水平ODE](../GBG14/index.md#thm-gbg14-horizontal-existence)では、$+y$ 辺で $x=\varepsilon$ が一定、長さが $\varepsilon$ なので、この辺の積分は $i\lambda\varepsilon^3$。ほかの三辺の積分は零。従って

$$
U_{\partial R_\varepsilon}
=e^{-i\lambda\varepsilon^3}
=1-i\lambda\varepsilon^3+O(\varepsilon^6).
$$

[微小矩形の定理](#thm-gbg15-small-rectangle)は $U=1-\varepsilon^2 F_{xy}(0,0)+O(\varepsilon^3)=1+O(\varepsilon^3)$ と述べる。三次の項は誤差に含まれ、矛盾しない。**一点での曲率零**は、その近傍のすべての輸送が恒等であることを意味しない。
<!-- solution-end -->

### Level C：局所表示・基準点・曲率を統合する

<a id="ex-gbg15-c01"></a>
#### GBG15-C01 非可換閉路を別の基準点で読む
- Level: C

$P=\mathbb R^2\times GL(2,\mathbb R)$、標準 section $s$、$A=H\,dx+N\,dy$（$H=E_{11},\,N=E_{12}$）を考える。原点基点の正向き辺長 $\varepsilon$ の正方形を $\gamma_\varepsilon$ とし、$K=\operatorname{diag}(2,1)$、$p=s(0,0)K$ とする。

1. 標準 section での $U_{\gamma_\varepsilon}$ と $h_{\gamma_\varepsilon}(p)$ を厳密に計算せよ。
2. section を $s'=sK$ に変更し、$U'_{\gamma_\varepsilon}$ と局所曲率 $F'_{xy}$ を計算せよ。
3. 新旧表示で同じ $p$ の群元が一致すること、二次項が新しい曲率表示と一致することを検算せよ。
4. 逆向きの閉路に対する局所輸送行列を求めよ。

<!-- solution-start -->
**詳細解答**。

**1.** [Level B の矩形の計算](#ex-gbg15-b03)を四辺の合成から再確認する。$N^2=0$、$[H,N]=N$ により

$$
U_{\gamma_\varepsilon}
=I+c_\varepsilon N,
\qquad c_\varepsilon:=\varepsilon(1-e^\varepsilon).
$$

$p=s(0,0)K$ とし、[局所ホロノミーの命題](#prop-gbg15-local-holonomy)を使う。$K^{-1}NK=\frac12N$ だから

$$
h_{\gamma_\varepsilon}(p)
=K^{-1}U_{\gamma_\varepsilon}K
=I+\frac{c_\varepsilon}{2}N.
$$

**2.** [GBG8 の局所接続変換則](../GBG8/index.md#thm-gbg8-local-transform)に定数 $K$ を入れる。$dK=0$ なので

$$
A'=K^{-1}AK
=H\,dx+\frac12N\,dy.
$$

[局所輸送行列の section 変換](../GBG14/index.md#prop-gbg14-local-transport)により

$$
U'_{\gamma_\varepsilon}
=K^{-1}U_{\gamma_\varepsilon}K
=I+\frac{c_\varepsilon}{2}N.
$$

[曲率のゲージ共変性](../GBG10/index.md#thm-gbg10-gauge-transform)（同じ式は $dA'+A'\wedge A'$ からも得られる）により

$$
F'_{xy}=K^{-1}[H,N]K=\frac12N.
$$

**3.** 新しい section で $p=s'(0,0)I$ だから、新表示の基準群元は $g'_0=I$。従って $h_{\gamma_\varepsilon}(p)=U'_{\gamma_\varepsilon}$ であり、1 の計算と完全に一致する。また

$$
c_\varepsilon
=\varepsilon\bigl(1-(1+\varepsilon+\varepsilon^2/2+O(\varepsilon^3))\bigr)
=-\varepsilon^2+O(\varepsilon^3).
$$

従って

$$
U'_{\gamma_\varepsilon}
=I-\varepsilon^2\frac12N+O(\varepsilon^3)
=I-\varepsilon^2F'_{xy}+O(\varepsilon^3).
$$

これは[微小矩形の定理](#thm-gbg15-small-rectangle)の共役変換後の式そのものである。

**4.** [逆路の輸送則](../GBG14/index.md#thm-gbg14-transport-laws)から $U_{\bar\gamma_\varepsilon}=U_{\gamma_\varepsilon}^{-1}$。$N^2=0$ なので

$$
(I+c_\varepsilon N)^{-1}=I-c_\varepsilon N.
$$

よって逆向きでは二次係数が $+\varepsilon^2N$ に変わる。逆行列と向きの反転が整合する。
<!-- solution-end -->

---

## 6. 次に何を調べるか

ここまでで、閉路の平行移動が作る群と、その局所的な曲率との関係が確定した。次講 **GBG16「曲率ゼロでも大域的な効果は残るか」** では、曲率がどの点でも零であっても、基底空間の大域的な閉路が情報を持ち得る理由を調べる。
