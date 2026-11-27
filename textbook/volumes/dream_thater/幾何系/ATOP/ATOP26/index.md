# ATOP26 H1と基本群の可換化

八の字の図形を一周する二つのループを $a,b$ とします。基本群では $a*b$ と $b*a$ を区別できます。一方、1次のホモロジーでは足し算の順番を区別できません。今回は、基本群からどの情報を捨てれば1次ホモロジーになるのかを、鎖の具体的な操作から証明します。係数はすべて整数です。

## 1. 道を特異鎖として読む

[道の連結・逆走・定値道](../ATOP4/index.md#def-atop4-path-operations) の記号に従い、$\alpha*\beta$ は先に $\alpha$、後に $\beta$ を進む道、$\bar\alpha$ は逆走とします。

[特異単体](../ATOP16/index.md#def-atop16-singular-simplex) の区間表示に従い、$u\in I=[0,1]$ と標準1単体 $\Delta^1$ の点 $(1-u,u)$ を対応させます。道 $\gamma:I\to X$ は連続なので、$(1-u,u)\mapsto\gamma(u)$ は特異1単体です。同じ記号 $\gamma$ でこの単体も表します。

[特異鎖群](../ATOP16/index.md#def-atop16-singular-chains) を $C_n(X)=C_n(X;\mathbb Z)$ と略します。これは特異 $n$ 単体を基底とする自由整数加群です。道を足すときは写像の値を足すのではなく、この基底の形式的な和を取ります。

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) によれば、始点 $p$、終点 $q$ の道の境界は

$$
\partial_1\gamma=\langle q\rangle-\langle p\rangle
$$

です。$\langle p\rangle$ は点 $p$ に対応する特異0単体（0鎖の基底元）です。[ループ](../ATOP4/index.md#def-atop4-loop) は始点と終点が一致する道なので境界が零になります。[特異サイクルと特異境界鎖](../ATOP16/index.md#def-atop16-singular-cycles) に従い、$Z_1(X)=\ker\partial_1$、$B_1(X)=\operatorname{im}\partial_2$ と書きます。ループはサイクルですが、一般の道はサイクルではありません。

そこで $C_1(X)/B_1(X)$ という商群で道を比較します。これはサイクルでない鎖にも使える商です。

鎖の差が $B_1(X)$ に属することを $\equiv$ で表します。一般の道に対する $\equiv$ はホモロジー類の等号ではありませんが、両辺がサイクルなら [特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) で等しい類を表します。

三角形の三辺を頂点番号の小さい方から大きい方へ向けると、辺と符号の対応は次のようになります。

| 辺 | 進む道 | 境界の係数 |
| --- | --- | --- |
| $0\to1$ | $\alpha$ | $+1$ |
| $1\to2$ | $\beta$ | $+1$ |
| $0\to2$ | $\alpha*\beta$ | $-1$ |

二辺を通る道と第三辺を通る道の差が三角形の境界であれば、道の積を鎖の和へ変換できます。

<a id="lem-atop26-path-chain"></a>

<!-- formal-statement-start -->
> **補題（道の連結と特異1鎖の和）**
> 位相空間 $X$ の道 $\alpha:p\to q$、$\beta:q\to r$ を取る。点 $p$ の定値道を $c_p$ とする。特異1鎖の商 $C_1(X)/B_1(X)$ で次が成立する。

$$
\alpha*\beta\equiv\alpha+\beta,
\qquad
\bar\alpha\equiv-\alpha,\qquad c_p\equiv0.
$$

> また、始点と終点を固定した道ホモトピーで結ばれる二つの道は、この商群で一致する。
<!-- formal-statement-end -->

見取り図：連結を表す特異2単体を一つ構成します。逆走と定値道も三角形の境界で扱い、道ホモトピーには区間上のプリズム恒等式を適用します。

<!-- proof-start -->
### 証明

[特異単体](../ATOP16/index.md#def-atop16-singular-simplex) の標準2単体 $\Delta^2$ の重心座標を $(t_0,t_1,t_2)$ とし、各 $t_i\ge0$、総和を1とします。第 $i$ 頂点 $e_i$ は第 $i$ 成分だけが1の点です。$\lambda=\alpha*\beta$ と置き、

$$
\sigma(t_0,t_1,t_2)=\lambda(t_1/2+t_2)
$$

と定めます。引数は0以上1以下なので連続な特異2単体です。各辺を $u\in I$ でパラメータ表示すると

$$
\begin{aligned}
\sigma(1-u,u,0)&=\lambda(u/2)=\alpha(u),\\
\sigma(0,1-u,u)&=\lambda((1+u)/2)=\beta(u),\\
\sigma(1-u,0,u)&=\lambda(u).
\end{aligned}
$$

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) の符号は $+,-,+$ なので

$$
\partial_2\sigma=\beta-\lambda+\alpha.
$$

従って $\lambda\equiv\alpha+\beta$ です。

次に点 $p$ の定数2単体を $Q$ とします。その三辺はすべて $c_p$ であり、$\partial_2 Q=c_p-c_p+c_p=c_p$ です。従って $c_p\equiv0$ です。

逆走の関係には $T(t_0,t_1,t_2)=\alpha(t_1)$ を用います。辺 $01$ では $\alpha(u)$、辺 $12$ では $\alpha(1-u)$、辺 $02$ では $\alpha(0)=p$ となります。従って

$$
\partial_2T=\bar\alpha-c_p+\alpha.
$$

$c_p\equiv0$ と合わせて $\bar\alpha\equiv-\alpha$ を得ます。

最後に $\alpha,\alpha':p\to q$ の [道ホモトピー](../ATOP4/index.md#def-atop4-path-homotopy) $F:I\times I\to X$ を取ります。

ここで $u$ は道の進行変数、$t$ は変形の進行変数で、$F(u,0)=\alpha(u)$、$F(u,1)=\alpha'(u)$ です。区間の恒等1単体を $e(u)=u$ とし、$P_n:C_n(I)\to C_{n+1}(X)$ をこの $F$ に対する [プリズム作用素](../ATOP17/index.md#def-atop17-prism) とします。境界の作用する空間は入力から決まるので上付き記号を省きます。[プリズム恒等式](../ATOP17/index.md#thm-atop17-prism-identity) に $e$ と $F$ を代入すると

$$
\partial_2 P_1 e
=\alpha'-\alpha-P_0(\langle1\rangle-\langle0\rangle).
$$

端点が固定されるので、右辺最後の項は $c_q-c_p$ です。従って

$$
\alpha'-\alpha=\partial_2 P_1e+c_q-c_p.
$$

定値道は既に境界であることを示したので、右辺は境界群に入ります。これで全ての関係が示されました。
<!-- proof-end -->

例えば $\alpha:0\to1$、$\beta:1\to2$ を実数直線の線分とします。$\alpha+\beta$ は二つの基底元の和で、$\alpha*\beta$ は一つの基底元なので鎖そのものとしては異なります。補題はこの差を埋める特異2単体を明示しています。

## 2. ループからホモロジー類へ

[基本群](../ATOP4/index.md#def-atop4-fundamental-group) の元は、基点を固定したループの道ホモトピー類です。これを1サイクルの類へ送れば、道の連結が和になります。

<a id="prop-atop26-loop-map"></a>

<!-- formal-statement-start -->
> **命題（次数1の Hurewicz 準同型）**
> 基点 $x_0$ を持つ位相空間 $X$ について、ループの道ホモトピー類を、その特異1サイクルとしてのホモロジー類へ送る写像

$$
h_X:\pi_1(X,x_0)\longrightarrow H_1(X;\mathbb Z),
\qquad [\gamma]\longmapsto[\gamma]_{H}
$$

> は群準同型である。ここで右辺の添字 $H$ は特異ホモロジー類を表す。
<!-- formal-statement-end -->

見取り図：[道の連結と特異1鎖の和](#lem-atop26-path-chain) のホモトピーに関する部分で代表元の選択を解消し、連結に関する部分で積を和に移します。

<!-- proof-start -->
### 証明

ループでは始点と終点が $x_0$ で一致するため $\partial_1\gamma=0$ です。[特異ホモロジー群](../ATOP16/index.md#def-atop16-singular-homology) の元 $[\gamma]_H$ が定まります。

同じ基本群の元を表す二つのループは道ホモトピックです。[道の連結と特異1鎖の和](#lem-atop26-path-chain) により差が $B_1(X)$ に属し、ホモロジー類が一致します。従って写像は代表元によらず定まります。

[基本群の群構造](../ATOP4/index.md#thm-atop4-fundamental-group) では積が道の連結で与えられます。再び補題を使うと

$$
\begin{aligned}
h_X([\alpha][\beta])
&=[\alpha*\beta]_H\\
&=[\alpha+\beta]_H\\
&=[\alpha]_H+[\beta]_H.
\end{aligned}
$$

また定値道の像は0です。これで準同型性が示されました。
<!-- proof-end -->

[群の可換化](../ATOP12/index.md#def-atop12-abelianization) を思い出します。群 $G$ の交換子 $ghg^{-1}h^{-1}$ をすべて含む最小の正規部分群を $[G,G]$ と書き、商 $G_{\mathrm{ab}}=G/[G,G]$ を取ります。可換群への準同型はこの商を経由します。

ここでは $G=\pi_1(X,x_0)$、$A=G_{\mathrm{ab}}$ と置き、$A$ の演算を加法で書きます。$h_X$ の値域は可換群なので、交換子の像は

$$
h_X(g)+h_X(k)-h_X(g)-h_X(k)=0
$$

です。従って $h_X$ の核は $[G,G]$ を含みます。商写像を $q_G:G\to A$ とし、$\bar h_X(q_G(g))=h_X(g)$ と定めます。同じ商の元を表す $g,k$ では $gk^{-1}\in[G,G]$ なので $h_X(g)-h_X(k)=0$ です。従って代表元によらず、積を和へ送る準同型 $\bar h_X:A\to H_1(X;\mathbb Z)$ が得られます。

ここまででは $\bar h_X$ が全射か、他にも核があるかは不明です。任意の1サイクルは複数の道の整数係数和であり、各道が基点で閉じているとは限らないからです。

## 3. 任意の1サイクルを基点に戻す

空間が道連結（任意の二点を道で結べること）なら、基点 $x_0$ から任意の点 $p$ まで補助道 $\ell_p$ を選べます。道 $\gamma:p\to q$ を、基点から $p$ へ進み、$\gamma$ を通って、$q$ から基点へ帰るループ

$$
L(\gamma)=(\ell_p*\gamma)*\bar\ell_q
$$

へ変換します。道を閉じる操作自体には選択があります。しかしサイクル全体では各点から出る係数と入る係数が等しいので、余分な補助道が相殺されます。

例えば二つの点 $p,q$ を往復する道 $\gamma:p\to q$、$\eta:q\to p$ なら、$\gamma+\eta$ はサイクルです。閉じた二つのループは商鎖でそれぞれ $\ell_p+\gamma-\ell_q$ と $\ell_q+\eta-\ell_p$ に等しいため、和から補助道が消えます。

<a id="thm-atop26-hurewicz-one"></a>

<!-- formal-statement-start -->
> **定理（次数1の Hurewicz 定理）**
> 非空な道連結位相空間 $X$ と基点 $x_0\in X$ を取る。ループを整数係数特異1サイクルの類へ送る準同型は、基本群の可換化から次の同型を誘導する。

$$
\bar h_X:\pi_1(X,x_0)_{\mathrm{ab}}
\xrightarrow{\ \cong\ } H_1(X;\mathbb Z).
$$

> 特に $h_X$ は全射で、その核は、基本群のすべての交換子を含む最小の正規部分群である。
<!-- formal-statement-end -->

見取り図：補助道で各特異1単体を閉じ、可換化へ送ります。任意の特異2単体の三辺から作ったループの積が単位元になるので、境界を零へ送ります。最後に二つの合成を調べ、補助道がサイクル条件により消えることを確認します。

<!-- proof-start -->
### 証明

**逆向きの写像の準備。** 各 $p\in X$ について道 $\ell_p:x_0\to p$ を選び、$\ell_{x_0}=c_{x_0}$ とします。道連結性がここで必要です。基本群の類から $A$ への商写像を $q_G$ とします。

特異1単体 $\gamma:p\to q$ を

$$
F(\gamma)=q_G([(\ell_p*\gamma)*\bar\ell_q])
$$

に送ります。[特異鎖群](../ATOP16/index.md#def-atop16-singular-chains) は特異1単体を基底とする自由な整数加群なので、$F$ は各有限和に対して整数線形に延長でき、準同型 $C_1(X)\to A$ が得られます。

**特異2単体の境界の像。** 任意の特異2単体 $\sigma:\Delta^2\to X$ を取り、頂点像を $p_i=\sigma(e_i)$、辺を $\gamma_{ij}(u)=\sigma((1-u)e_i+ue_j)$ とします（$i<j$）。

$\Delta^2$ の中で、道 $01*12$ と直線 $02$ は同じ端点を持ちます。前者を $v(u)$、後者を $w(u)$ と書けば、

$$
K(u,t)=(1-t)v(u)+tw(u)
$$

は凸な単体内の連続写像で、両端を固定します。$\sigma$ を合成すると $\gamma_{01}*\gamma_{12}$ と $\gamma_{02}$ の道ホモトピーが得られます。

$L_{ij}=(\ell_{p_i}*\gamma_{ij})*\bar\ell_{p_j}$ と書きます。[道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) により括弧を付け替え、途中の $\bar\ell_{p_1}*\ell_{p_1}$ を定値道へ縮めると

$$
[L_{01}][L_{12}]
=[(\ell_{p_0}*(\gamma_{01}*\gamma_{12}))*\bar\ell_{p_2}]
=[L_{02}].
$$

上の二番目の等号には、先ほど構成した [道ホモトピー](../ATOP4/index.md#def-atop4-path-homotopy) と [道の連結と道ホモトピーの両立](../ATOP4/index.md#prop-atop4-concatenation-compatible) を使いました。

可換化では積は和なので $F(\gamma_{01})+F(\gamma_{12})=F(\gamma_{02})$ です。[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) から

$$
\begin{aligned}
F(\partial_2\sigma)
&=F(\gamma_{12})-F(\gamma_{02})+F(\gamma_{01})\\
&=0.
\end{aligned}
$$

全ての特異2単体で成立し、$F$ は整数線形なので $F(B_1(X))=0$ です。よって $F$ をサイクル群 $Z_1(X)$ に制限して商を取ると

$$
\psi:H_1(X;\mathbb Z)\longrightarrow A,
\qquad [z]_H\longmapsto F(z)
$$

が定まります。実際、$z-z'\in B_1(X)$ なら $F(z)-F(z')=0$ なので代表元によらず、加法も保ちます。

**一つ目の合成。** $a\in A$ はある基点付きループ $\gamma$ の基本群の類を商へ送ったものです。$\ell_{x_0}$ は定値道なので [道ホモトピー類の演算律](../ATOP4/index.md#thm-atop4-path-laws) により $L(\gamma)$ と $\gamma$ は道ホモトピックです。従って

$$
\psi\bar h_X(a)=F(\gamma)=q_G([\gamma])=a.
$$

**二つ目の合成。** 任意のサイクルを有限和 $z=\sum_{i=1}^m n_i\gamma_i$ と書き、各道の始点を $s_i$、終点を $t_i$ とします。[道の連結と特異1鎖の和](#lem-atop26-path-chain) を二度適用すると

$$
L(\gamma_i)\equiv\ell_{s_i}+\gamma_i-\ell_{t_i}.
$$

これを $n_i$ 倍して足します。有限集合 $S$ を全ての始点と終点の集合とすると

$$
\sum_i n_i L(\gamma_i)\equiv
z+\sum_{p\in S} d_p\ell_p,
$$

$$
d_p=\sum_{i:s_i=p}n_i-\sum_{i:t_i=p}n_i.
$$

一方、[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) の端点公式で

$$
0=\partial_1z
=\sum_i n_i(\langle t_i\rangle-\langle s_i\rangle)
=-\sum_{p\in S}d_p\langle p\rangle.
$$

異なる点に対応する0単体は自由加群の異なる基底元です。従って全ての $d_p$ が0です。両辺はサイクルなので、商鎖の一致から

$$
\bar h_X\psi([z]_H)
=\left[\sum_i n_i L(\gamma_i)\right]_H
=[z]_H
$$

となります。二つの合成が恒等であるため $\bar h_X$ は同型です。

最後に $h_X=\bar h_X\circ q_G$ であり、$q_G$ は全射、$\bar h_X$ は同型です。従って $h_X$ は全射です。また $h_X(g)=0$ と $q_G(g)=0$ は同値なので、その核は $[G,G]$ です。

補助道を別のものに選んでも、この構成で得た $\psi$ は同じ $\bar h_X$ の両側逆です。逆写像は一意なので選択に依存しません。
<!-- proof-end -->

この定理が述べるのは、基本群の情報が1次ホモロジーで失われる理由が交換子に尽きる、ということです。空間の局所的な連結性や三角形分割の存在を仮定していない点にも注意してください。

## 4. 写像や基点を変えた場合

二つの基点付き空間の間の連続写像 $f:(X,x_0)\to(Y,y_0)$（すなわち $f(x_0)=y_0$）はループにも特異鎖にも作用します。[基本群の誘導準同型](../ATOP4/index.md#thm-atop4-induced-homomorphism) の $f_*$ をここでは $f_\pi$ と書き、[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) の次数1の写像 $H_1(f)$ と区別します。ループを先に写してからサイクルと見なす場合と、先にサイクルと見なしてから写す場合を比べます。このように二通りの合成が一致する性質をここでは自然性と呼びます。

<a id="prop-atop26-naturality"></a>

<!-- formal-statement-start -->
> **命題（次数1の Hurewicz 同型の自然性）**
> 非空な道連結空間 $X,Y$ の基点付き連続写像 $f:(X,x_0)\to(Y,y_0)$ に対して、次が成立する。

$$
H_1(f)\circ\bar h_X
=\bar h_Y\circ(f_\pi)_{\mathrm{ab}}.
$$

> ここで $(f_\pi)_{\mathrm{ab}}:\pi_1(X,x_0)_{\mathrm{ab}}\to\pi_1(Y,y_0)_{\mathrm{ab}}$ は基本群の誘導準同型 $f_\pi$ が可換化に誘導する準同型である。
<!-- formal-statement-end -->

見取り図：どちらの合成もループ $\gamma$ を $f\circ\gamma$ のホモロジー類へ送ります。

<!-- proof-start -->
### 証明

[基本群の誘導準同型](../ATOP4/index.md#thm-atop4-induced-homomorphism) は $[\gamma]$ を $[f\circ\gamma]$ へ送ります。値域の基本群のすべての交換子を含む最小の正規部分群を $C_Y$ とします。準同型は交換子を交換子へ送るので、その逆像 $f_\pi^{-1}(C_Y)$ は定義域のすべての交換子を含む正規部分群です。[群の可換化](../ATOP12/index.md#def-atop12-abelianization) の最小性から、定義域の可換化で零になる元は値域の可換化でも零になります。

従って可換化の類に対する写像 $(f_\pi)_{\mathrm{ab}}$ は代表元によらず定まります。

一方、[特異ホモロジーの誘導準同型](../ATOP16/index.md#thm-atop16-induced-homology) はサイクルの各特異単体に $f$ を合成します。任意の $a=q_G([\gamma])\in A$ に対して

$$
H_1(f)(\bar h_X(a))=[f\circ\gamma]_H,
$$

$$
\bar h_Y((f_\pi)_{\mathrm{ab}}(a))=[f\circ\gamma]_H.
$$

商写像は全射なので全ての $a$ について一致します。
<!-- proof-end -->

基点を $x_0$ から $x_1$ に変えるとき、道 $\ell:x_0\to x_1$ を選びます。[基本群の基点変更](../ATOP4/index.md#thm-atop4-basepoint-change) により、新しい基点のループ $\gamma$ は元の基点のループ

$$
(\ell*\gamma)*\bar\ell
$$

へ移ります。[道の連結と特異1鎖の和](#lem-atop26-path-chain) を二回適用すると、商鎖で

$$
(\ell*\gamma)*\bar\ell\equiv\ell+\gamma-\ell=\gamma
$$

です。従ってホモロジー上では基点変更の影響が消えます。

道連結性を外した場合は一つの基点では全ての成分を捉えられません。例えば二つの円周の非交和では、特異単体の定義域は連結であるため像は片方の円周だけに入ります。境界作用素も成分を保つので鎖複体は二成分の直和です。[次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) を各円周に適用し、[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) を使うと $H_1$ は二つの整数群の直和になります。片方の基点のループはその成分しか訪れないため全射になりません。

## 5. グラフ・曲面の二通りの計算

### グラフ

有限連結グラフの頂点数を $V$、辺数を $E$ とします。[連結グラフの基本群と階数](../ATOP8/index.md#thm-atop8-graph-fundamental-group) により基本群は $E-V+1$ 個の生成元を持つ自由群です。関係語がないため [群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) では関係部分群が零となります。[次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) により

$$
H_1(X;\mathbb Z)\cong\mathbb Z^{E-V+1}.
$$

胞体鎖からも確認できます。グラフを有限 CW 複体と見なし、[胞体ごとの相対群の分解](../ATOP22/index.md#thm-atop22-relative-cells) により頂点と向き付き辺をそれぞれ胞体0鎖群と1鎖群の基底にします。[胞体鎖群と胞体境界](../ATOP22/index.md#def-atop22-cellular-chain) の境界 $d_1$ は各辺に対し終点から始点を引いたものです。[全域木の存在と辺数](../ATOP8/index.md#thm-atop8-spanning-tree) により全域木を選ぶと、木に属さない各辺 $e$ を進み、その終点から始点まで木の中を帰る1鎖 $z_e$ がサイクルになります。$z_e$ における非木辺 $e$ の係数は1で、他の非木辺の係数は0です。従って $\sum_e k_e z_e=0$ なら各非木辺の係数を比較して全ての $k_e=0$ と分かります。

任意のサイクルから、非木辺の係数に応じて $z_e$ を引けば木だけのサイクルが残ります。有限木に辺があれば葉（次数1の頂点）があり、その頂点の境界係数が零であるため唯一接続する辺の係数は零です。葉と辺を取り除く操作を繰り返すと全辺の係数が零になります。従って $z_e$ はサイクル群の基底です。

[全域木の存在と辺数](../ATOP8/index.md#thm-atop8-spanning-tree) により木の辺数は $V-1$、非木辺数は $E-V+1$ です。2胞体がないので $B_1^{\rm cell}=0$ であり、[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) でも同じ群が得られます。

### 曲面

[標準閉曲面の基本群](../ATOP12/index.md#thm-atop12-surface-groups) の表示と [群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) を使います。特にトーラスの二つの生成ループ $a,b$ は一つの頂点を共有し、2胞体の境界語は $aba^{-1}b^{-1}$ です。$a$ の方向は正負一回ずつ、$b$ も正負一回ずつなので、可換化で関係は零です。

| 空間 | 関係語の指数和 | 1次ホモロジー群 |
| --- | --- | --- |
| 球面 | 生成元なし | $0$ |
| トーラス | $(0,0)$ | $\mathbb Z^2$ |
| 実射影平面 | $(2)$ | $\mathbb Z/2\mathbb Z$ |
| Klein の壺 | $(0,2)$ | $\mathbb Z\times\mathbb Z/2\mathbb Z$ |

各空間は道連結なので [次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) を使えます。実射影平面では関係語 $a^2$、Klein の壺では $aba^{-1}b$ であるため、それぞれ上の指数和になります。

胞体計算との対応も確認します。頂点一つの模型では各1胞体の始点と終点が同じなので $d_1=0$ です。[胞体境界の係数公式](../ATOP22/index.md#thm-atop22-incidence) に従い、対象の1胞体以外を潰した円周への付着写像を調べます。正方向の通過は $+1$、逆方向は $-1$ であり、その和が写像度です。[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) により正方向の一周が整数群の生成元であり、[次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) によりそのホモロジー類も生成元です。付着写像の像の道は対象辺の正走・逆走・定値道の連結なので、[道の連結と特異1鎖の和](#lem-atop26-path-chain) によりその類の係数は正走数から逆走数を引いた値です。従って各関係語の指数和が $d_2$ の列になります。

トーラスでは $d_2(1)=(0,0)$ なので $\ker d_1/\operatorname{im}d_2=\mathbb Z^2$ です。実射影平面では $d_2(1)=2$ なので商は $\mathbb Z/2\mathbb Z$ です。Klein の壺では $d_2(1)=(0,2)$ で、商は $(m,n)\mapsto(m,n+2\mathbb Z)$ によって $\mathbb Z\times\mathbb Z/2\mathbb Z$ と同型です。

八の字とトーラスはどちらも $H_1\cong\mathbb Z^2$ ですが、前者の基本群は二生成元の自由群、後者の基本群は可換群です。自由群で $aba^{-1}b^{-1}$ は空でない既約語なので単位元ではありません。[自由群の既約語の一意性](../ATOP8/index.md#prop-atop8-reduced-word) によるこの区別は、1次ホモロジーでは消えます。

## 6. 演習

### 演習 ATOP26-A1：三角形の符号

- Level: A

道 $\alpha:p\to q$ と $\beta:q\to r$ に対して、$\lambda=\alpha*\beta$ とする。$\sigma(t_0,t_1,t_2)=\lambda(t_1/2+t_2)$ の辺を求め、$\partial_2\sigma$ を計算せよ。

<!-- solution-start -->
**詳細解答**

辺 $01,12,02$ では順に座標が $(1-u,u,0),(0,1-u,u),(1-u,0,u)$ です。引数は順に $u/2,(1+u)/2,u$ となるため、各辺は $\alpha,\beta,\lambda$ です。

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) では頂点0を除いた辺が正、頂点1を除いた辺が負、頂点2を除いた辺が正です。従って

$$
\partial_2\sigma=\beta-\lambda+\alpha.
$$

これを商鎖で零と見なすと $\lambda\equiv\alpha+\beta$ です。
<!-- solution-end -->

### 演習 ATOP26-A2：定値道と逆走

- Level: A

道 $\alpha:p\to q$ に対して $T(t_0,t_1,t_2)=\alpha(t_1)$ の境界を計算し、$\bar\alpha+\alpha$ が境界になることを示せ。

<!-- solution-start -->
**詳細解答**

辺 $01$ では $t_1=u$、辺 $12$ では $t_1=1-u$、辺 $02$ では $t_1=0$ です。

従って三辺は $\alpha,\bar\alpha,c_p$ となります。[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) により

$$
\partial_2T=\bar\alpha-c_p+\alpha.
$$

点 $p$ の定数2単体 $Q$ には三辺とも $c_p$ が現れるため $\partial_2Q=c_p-c_p+c_p=c_p$ です。従って

$$
\partial_2(T+Q)=\bar\alpha+\alpha.
$$

逆走は負の鎖と同じ商の元ですが、同じ特異1単体そのものではありません。
<!-- solution-end -->

### 演習 ATOP26-A3：ループの積

- Level: A

同じ基点のループ $a,b$ について $h_X([a]^3[b]^{-2}[a]^{-1})$ を $[a]_H,[b]_H$ で表せ。

<!-- solution-start -->
**詳細解答**

[次数1の Hurewicz 準同型](#prop-atop26-loop-map) は積を和へ送り、逆元を負元へ送ります。従って

$$
\begin{aligned}
h_X([a]^3[b]^{-2}[a]^{-1})
&=3[a]_H-2[b]_H-[a]_H\\
&=2[a]_H-2[b]_H.
\end{aligned}
$$

この式は $[a],[b]$ が基本群で可換であることを仮定していません。
<!-- solution-end -->

### 演習 ATOP26-A4：実射影平面

- Level: A

実射影平面の基本群の表示を $\langle a\mid a^2=1\rangle$ とする。$H_1$ と $h_X([a]^5)$ を求めよ。

<!-- solution-start -->
**詳細解答**

関係語 $a^2$ の指数和は2です。[群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) により可換化は $\mathbb Z/2\mathbb Z$ で、$a$ の像は $1+2\mathbb Z$ です。

実射影平面は道連結なので [次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) から $H_1\cong\mathbb Z/2\mathbb Z$ となります。

$h_X([a]^5)$ は $5+2\mathbb Z=1+2\mathbb Z$ に対応し、零ではありません。
<!-- solution-end -->

### 演習 ATOP26-B1：補助道の相殺

- Level: B

相異なる三点 $p,q,r$ と道 $\alpha:p\to q$、$\beta:q\to r$、$\gamma:p\to r$ がある。$z=2\alpha+2\beta-2\gamma$ がサイクルであることを確認し、基点への補助道で閉じたループの和が $z$ と同じホモロジー類を表すことを示せ。

<!-- solution-start -->
**詳細解答**

[特異境界作用素](../ATOP16/index.md#def-atop16-singular-boundary) により

$$
\begin{aligned}
\partial_1z={}&2(\langle q\rangle-\langle p\rangle)\\
&+2(\langle r\rangle-\langle q\rangle)\\
&-2(\langle r\rangle-\langle p\rangle)=0.
\end{aligned}
$$

各点に基点からの道 $\ell_p,\ell_q,\ell_r$ を取ります。例えば $p$ を基点にすれば $\ell_p=c_p$、$\ell_q=\alpha$、$\ell_r=\gamma$ と選べます。

[道の連結と特異1鎖の和](#lem-atop26-path-chain) による閉じたループの商鎖は

$$
\begin{aligned}
L(\alpha)&\equiv\ell_p+\alpha-\ell_q,\\
L(\beta)&\equiv\ell_q+\beta-\ell_r,\\
L(\gamma)&\equiv\ell_p+\gamma-\ell_r.
\end{aligned}
$$

係数 $2,2,-2$ を掛けて加えると、$\ell_p$ の係数は $2-2=0$、$\ell_q$ は $-2+2=0$、$\ell_r$ は $-2+2=0$ です。残るのは $z$ です。ループの和もサイクルなのでホモロジー類が一致します。
<!-- solution-end -->

### 演習 ATOP26-B2：三本の辺を持つグラフ

- Level: B

二頂点 $p,q$ を三本の異なる辺 $e_1,e_2,e_3$ が結ぶグラフを考える。全辺を $p$ から $q$ へ向ける。胞体鎖による $H_1$ を求め、基本群の可換化と比較せよ。

<!-- solution-start -->
**詳細解答**

胞体1鎖を $(m_1,m_2,m_3)\in\mathbb Z^3$ で表すと、境界は

$$
d_1(m_1,m_2,m_3)
=(m_1+m_2+m_3)(q-p).
$$

二頂点は0鎖群の異なる基底元なので、核は $m_1+m_2+m_3=0$ で与えられます。従って核の元は一意に

$$
(m_1,m_2,m_3)=m_2(-1,1,0)+m_3(-1,0,1)
$$

と表せます。2胞体は存在しないので [胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) により $H_1\cong\mathbb Z^2$ です。

全域木を辺 $e_1$ とし、残りの辺を通って $e_1$ を逆走する二ループを取ります。[連結グラフの基本群と階数](../ATOP8/index.md#thm-atop8-graph-fundamental-group) から基本群は $3-2+1=2$ 生成元の自由群です。[群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) で関係がないため可換化は $\mathbb Z^2$ です。

辺の向きを保つ特性写像の区間表示を $\gamma_i:p\to q$ とします。二つのループを特異1サイクルとして読むと [道の連結と特異1鎖の和](#lem-atop26-path-chain) により

$$
\gamma_2*\bar\gamma_1\equiv\gamma_2-\gamma_1,\qquad
\gamma_3*\bar\gamma_1\equiv\gamma_3-\gamma_1.
$$

各差は端点の境界が相殺される絶対サイクルです。[胞体鎖群と胞体境界](../ATOP22/index.md#def-atop22-cellular-chain) の $j_1:H_1(X^1)\to H_1(X^1,X^0)$ は、この絶対サイクルの類を相対類へ送ります。個々の $\gamma_i$ は絶対サイクルではありませんが、境界が $X^0$ 内なので相対サイクルです。[胞体ごとの相対群の分解](../ATOP22/index.md#thm-atop22-relative-cells) でその相対類が辺基底 $e_i$ です。従って

$$
j_1([\gamma_i-\gamma_1]_H)=e_i-e_1
\qquad(i=2,3).
$$

これで特異ホモロジー側の二つの生成ループと胞体計算の基底が対応します。
<!-- solution-end -->

### 演習 ATOP26-B3：基点付き写像の効果

- Level: B

二つの道連結な八の字の図形 $X,Y$ の基本群の自由生成元をそれぞれ $a,b$ と $c,d$ とする。基点付き連続写像 $f:X\to Y$ が $a\mapsto cd^2c^{-1}$、$b\mapsto c^{-3}d$ を誘導するとき、$H_1(f)$ の整数行列を求めよ。

<!-- solution-start -->
**詳細解答**

[花束の基本群](../ATOP8/index.md#thm-atop8-bouquet-group) によれば両群は二生成元の自由群です。[群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) と [次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) により、両方の1次群は対応する二つのホモロジー類を基底とする $\mathbb Z^2$ です。

ここで $a,b,c,d$ は生成ループの基本群での類を表す略記です。それらに $h_X,h_Y$ を適用したホモロジー類をそれぞれの順序付き基底とします。[次数1の Hurewicz 同型の自然性](#prop-atop26-naturality) により、$H_1(f)$ は各生成ループの像を可換化したものに対応します。整数線形性から入力の基底係数 $(u,v)$ の像は第1基底元の像の $u$ 倍と第2基底元の像の $v$ 倍の和です。従って各像の指数和を列にすれば行列が得られます。$cd^2c^{-1}$ の指数和は $(1-1,2)=(0,2)$、$c^{-3}d$ は $(-3,1)$ です。従って行列は

$$
M=\begin{pmatrix}0&-3\\2&1\end{pmatrix}.
$$

入力 $(u,v)$ は $(-3v,2u+v)$ に写ります。核が零であることは $-3v=0$ から $v=0$、次に $2u=0$ から $u=0$ と分かりますが、$(1,0)$ は像に含まれないので全射ではありません。
<!-- solution-end -->

### 演習 ATOP26-C1：二つの2胞体を持つ空間

- Level: C

一点に二つの円周 $a,b$ を付けた空間に、境界語 $a^2b^{-2}$ と $ab^3$ で二つの2胞体を付けた有限 CW 複体 $X$ を考える。基本群の可換化と胞体境界の両方から $H_1(X;\mathbb Z)$ を求め、$a,b$ の類の位数を求めよ。基本群そのものが可換だと結論してよいかも説明せよ。

<!-- solution-start -->
**詳細解答**

一点を共有する円周の花束の基本群は [花束の基本群](../ATOP8/index.md#thm-atop8-bouquet-group) により二生成元の自由群です。

道連結な [有限 CW 複体](../ATOP22/index.md#def-atop22-cw) に円板を一枚貼る各段階で、新しい円板の中心を除いた開集合 $U$ と、円板内部の半径 $3/4$ の開円板の像 $V$ で覆います。貼り合わせ前の非交和で逆像を取ると、$U$ は古い空間全体と穿孔閉円板の非交和、$V$ は開円板であり、いずれも開です。

$U$ の円板部分で $x\ne0$ を時刻 $t\in[0,1]$ に

$$
x\longmapsto ((1-t)+t/\|x\|)x
$$

へ動かし、古い空間の点は固定します。半径は $(1-t)\|x\|+t>0$ であり、境界の点は固定するので付着関係と両立します。[胞体ごとの相対群の分解](../ATOP22/index.md#thm-atop22-relative-cells) の帯の変形と同じく、貼り合わせの商写像と区間との積は商写像であり、開集合への制限も商写像です。従ってこの変形は連続で、古い空間への強変形レトラクションになります。古い基点を固定する変形なので、包含とレトラクションが誘導する基本群準同型は互いに逆です。$V$ は開円板と同相で、直線的に中心へ縮められるため可縮です。[可縮空間の基本群](../ATOP4/index.md#prop-atop4-contractible-simply-connected) によりその基本群は自明です。

交わりは穿孔開円板で、半径を $(1-t)\|x\|+t/2$ に変える変形によって半径 $1/2$ の円周へ強変形レトラクトします。その円周上の基点を固定するので基本群は円周の基本群と同型です。[円周の基本群](../ATOP6/index.md#thm-atop6-fundamental-group-circle) からその基本群は整数群です。その一周の像は $U$ では付着語 $w$（古い基点までの道による共役を除く）、$V$ では単位元です。

三つの開集合 $U,V,U\cap V$ は道連結で、交わりの点を基点に [van Kampen定理](../ATOP7/index.md#thm-atop7-van-kampen) を適用できます。従って古い基本群に $w=1$ を課した商になります。共役の違いは正規部分群で割ると消えます。これを二回適用すると

$$
G=\langle a,b\mid a^2b^{-2}=1,\ ab^3=1\rangle.
$$

指数和は $(2,-2),(1,3)$ です。[群表示の可換化と指数和](../ATOP12/index.md#prop-atop12-abelian-presentation) により

$$
G_{\rm ab}\cong
\mathbb Z^2/\big(\mathbb Z(2,-2)+\mathbb Z(1,3)\big).
$$

加法で $a+3b=0$、$2a-2b=0$ です。前者から $a=-3b$、後者へ代入すると $-8b=0$ なので $b$ は群を生成し、位数は8の約数です。

実際に位数が8であることは、準同型

$$
(m,n)\longmapsto n-3m+8\mathbb Z
$$

で確認できます。二つの関係ベクトルの像はそれぞれ $-2-6=-8$ と $3-3=0$ で、どちらも零です。従って商から $\mathbb Z/8\mathbb Z$ への準同型があり、$b$ を $1+8\mathbb Z$ へ送ります。

逆向きに $1+8\mathbb Z\mapsto b$ と送れるのは $8b=0$ だからです。両合成は生成元を固定するため同型です。

$X$ は道連結なので [次数1の Hurewicz 定理](#thm-atop26-hurewicz-one) により $H_1\cong\mathbb Z/8\mathbb Z$ です。

胞体計算では一点に二つの1胞体が付くので $d_1=0$ です。$d_2:C_2^{\rm cell}(X)\to C_1^{\rm cell}(X)$ の定義域の基底を二つの2胞体（問題の付着順）、終域の基底を向き付き1胞体 $(a,b)$ とします。[胞体境界の係数公式](../ATOP22/index.md#thm-atop22-incidence) から、各付着語の正負の通過数が列となり

$$
d_2=\begin{pmatrix}2&1\\-2&3\end{pmatrix}.
$$

[胞体ホモロジー定理](../ATOP22/index.md#thm-atop22-cellular-comparison) により $\ker d_1/\operatorname{im}d_2$ は上の可換化と同じ商です。$a$ の類は $-3+8\mathbb Z$、$b$ の類は $1+8\mathbb Z$ です。

$b$ の位数は8です。$a$ の $k$ 倍が零になる条件は $8\mid 3k$ であり、8と3は互いに素なので $8\mid k$ と同値です。従って $a$ の位数も8です。

一般には可換化の計算だけで元の群の可換性は結論できません。ただしこの例では元の群の関係 $ab^3=1$ から $a=b^{-3}$ です。従って $G$ 自身が $b$ 一つで生成され、可換です。

もう一方の関係は $b^{-6}b^{-2}=b^{-8}=1$ となるので $G$ も位数8の巡回群です。可換性はホモロジーの結果ではなく、元の群の関係から別途導きました。
<!-- solution-end -->

## 7. まとめ

基本群はループの連結の順番を保持し、1次ホモロジーはその可換化です。証明の鍵は、三角形の境界が道の連結を鎖の和に変えることと、1サイクルの端点係数が相殺することです。次講では、ホモロジーに作用する自己写像を利用して不動点の存在を調べます。
