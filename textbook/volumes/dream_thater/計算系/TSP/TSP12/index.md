# TSP12 Strassen漸近スペクトル双対性：仮定・証明の骨格と例

[スペクトル点による漸近評価](../TSP11/index.md#thm-tsp11-asymptotic-spectral-bounds)では、テンソルの費用を下から、取り出せる量を上から測る方法を学びました。今回は逆向きの問いです。あらゆる測り方で資源 $a$ の値が $b$ 以下なら、大量の $b$ から大量の $a$ を作れるでしょうか。

1回の比較と、増加率だけを比較することを区別します。例えば非負有理数の通常の半環では $3/2$ を自然数から作るには少なくとも2が必要ですが、$n$ 回の費用は $\lceil(3/2)^n\rceil$ であり、$n$ 乗根を取れば $3/2$ に近づきます。整数への丸めよりも指数的な増加率に注目するのが今回の考え方です。

## 1. 漸近比較：補助資源を許す

以下、$S$ は集合である可換半環、$\preceq$ は [Strassen前順序](../TSP10/index.md#def-tsp10-strassen-preorder) とします。[自然数からの標準写像](../TSP10/index.md#thm-tsp10-natural-map) で非負整数を半環の中に入れ、同じ記号で書きます。

$\mathbb N=\{1,2,\ldots\}$、$\mathbb N_0=\{0,1,2,\ldots\}$ とし、$a^0=1$ とします。

例えば $c_nb^n$ は半環の一を $c_n$ 個足した元と $b^n$ の積、すなわち $b^n$ の $c_n$ 個の和です。体のスカラー倍とは区別します。

任意の元 $x$ について $0\preceq x$（$0\preceq1$ に $x$ を掛ける）です。また任意の $x\ne0$ について有界性から正整数 $u,v$ が存在して $1\preceq ux,\ x\preceq v$ となります。

特に $x,y\ne0$ なら $1\preceq uvxy$ となる正整数 $u,v$ を選べるので $xy\ne0$ です。

$n$ 回の比較で正整数 $c_n$ 個の補助資源を許すとします。$c_n^{1/n}\to1$ なら、補助資源は指数的な増加率を変えません。このような増加を劣指数的と呼びます。例えば $c_n=n+1$ は $\log(n+1)/n\to0$ から劣指数的ですが、$c_n=2^n$ はそうではありません。

<a id="def-tsp12-asymptotic-preorder"></a>

<!-- formal-statement-start -->
> **定義（漸近前順序）**
>
> Strassen前順序 $\preceq$ を持つ可換半環 $S$ の元 $a,b$ に対し、正整数列 $(c_n)_{n\ge1}$ が存在して

$$
a^n\preceq c_n b^n\quad(n\ge1),\qquad
\lim_{n\to\infty}c_n^{1/n}=1
$$

> を満たすとき $a\precsim b$ と書き、この関係を漸近前順序という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-tsp12-asymptotic-preorder -->
**定義の確認**。非負有理数の半環に通常の大小を入れます。通常の大小は反射的・推移的で、非負有理数を加えたり掛けたりしても不等号の向きは保たれます。[Strassen前順序の二条件](../TSP10/index.md#def-tsp10-strassen-preorder) のうち自然数の大小の忠実性は標準写像が包含写像なので成立し、有界性も $b>0$ なら $r=\max(1,\lceil a/b\rceil)$ で $a\le rb$ となるのでStrassen前順序です。

$a=3/2,\ b=2$ とすると各 $n\ge1$ で $(3/2)^n\le2^n$ なので $c_n=1$ が条件を満たします。

逆向きには

$$
2^n\le c_n(3/2)^n
\quad\Longrightarrow\quad c_n^{1/n}\ge4/3
$$

となり、極限が1という条件に反します。
<!-- definition-example-end -->

$\preceq$ から $\precsim$ は従いますが、逆は一般に成立しません。比較を緩めても、それが新しい半環の順序として使えるかをまず調べます。

<a id="thm-tsp12-closure"></a>

<!-- formal-statement-start -->
> **定理（漸近前順序の閉包性）**
>
> Strassen前順序 $\preceq$ の漸近前順序 $\precsim$ は $\preceq$ を含むStrassen前順序である。さらに $\precsim$ を使ってもう一度漸近前順序を作っても $\precsim$ 自身に一致する。
<!-- formal-statement-end -->

証明の核心は、固定した回数での効率のよい変換を繰り返し、余った回数だけ有限の費用で補うことです。また和については二項展開によって異なる回数の比較を一つの比較にまとめます。

<!-- proof-start -->
### 証明

まず $b\ne0$ とし、ある正整数 $k,C$ に対し $a^k\preceq Cb^k$ とします。有界性から $a\preceq Db$ を満たす正整数 $D$ が取れます。$n=qk+r$、$0\le r<k$ とおけば

$$
a^n=(a^k)^q a^r
\preceq C^q D^r b^{qk+r}.
$$

従って $\limsup_n(C^qD^r)^{1/n}=C^{1/k}$ です。任意の $\varepsilon>0$ に対し $C^{1/k}<1+\varepsilon$ となる $k,C$ が得られるなら、各 $n$ で $a^n\preceq c_nb^n$ を満たす最小の正整数 $c_n$ を選べます（例えば $D^n$ が候補）。この最小値は上の $C^qD^r$ 以下なので $\limsup_n c_n^{1/n}\le1+\varepsilon$。全ての $\varepsilon>0$ で成り立ち、$c_n\ge1$ だから $c_n^{1/n}\to1$ です。逆に定義を満たす列があれば、十分大きい $k$ で $c_k^{1/k}<1+\varepsilon$ です。以下、この固定回数の判定も使います。

$a\precsim0$ なら $a^n\preceq0$ で、特に $a\preceq0$ です。$a\ne0$ なら正整数 $u$ を $1\preceq ua$ となるように選べ、$a\preceq0$ に $u$ を掛けて $1\preceq ua\preceq0$ となって自然数の忠実性に反します。よって $a=0$ です。$0\precsim b$ は常に成立します。

反射律と元の比較の包含は $c_n=1$ で従います。推移律は $a^n\preceq c_nb^n$ と $b^n\preceq d_ne^n$ から $a^n\preceq c_nd_ne^n$、かつ $(c_nd_n)^{1/n}\to1$ となることから従います。任意の $z\in S$ について $(az)^n\preceq c_n(bz)^n$ なので積とも両立します。

和について $c_0=1$、$M_n=\max_{0\le i\le n}c_i$ とします。$\varepsilon>0$ に対し十分大きい $i$ では $c_i\le(1+\varepsilon)^i$ です。残る有限個の最大値を $B$ とすれば $M_n\le\max(B,(1+\varepsilon)^n)$、よって $M_n^{1/n}\to1$ です。半環の分配律による二項展開から

$$
\begin{aligned}
(a+z)^n
&=\sum_{i=0}^n\binom ni a^iz^{n-i}\\
&\preceq\sum_{i=0}^n\binom ni c_i b^iz^{n-i}\\
&\preceq M_n(b+z)^n.
\end{aligned}
$$

従って $a+z\precsim b+z$。自然数 $m,n$ で $m\precsim n$ なら、$n=0$ の場合は先の零の議論、$n>0$ の場合は自然数の忠実性により $m^k\le c_kn^k$、$k$ 乗根の極限から $m\le n$ です。逆向きは元の比較で成立します。有界性は元の比較を含むため維持されます。

最後に $\precsim$ をもう一度緩めた比較を $a\precsim_2 b$ とします。$b=0$ は先と同じ零の議論で済みます。$b\ne0$ なら $a^k\precsim Cb^k$ かつ $C^{1/k}$ を1に任意に近づけられます。この一つの $k,C$ を固定すると

$$
a^{km}\preceq d_m C^m b^{km},\qquad
d_m^{1/m}\to1.
$$

$(d_m C^m)^{1/(km)}=d_m^{1/(km)}C^{1/k}$ なので、まず $k,C$ を、次に $m$ を選ぶことで、この値を1に任意に近づけられます。固定回数の判定から $a\precsim b$。逆の包含は反射的な緩和から成立します。
<!-- proof-end -->

## 2. 閉じた比較では共通の材料を消せる

ここから、漸近緩和で変化しないStrassen前順序を「閉じた前順序」と呼びます。[漸近前順序の閉包性](#thm-tsp12-closure) により $\precsim$ はこの性質を持ちます。以下 $\le_P$ は前順序 $P$ における比較を表し、$\le_H$ なども同じ記法です。有限回では消せない共通の補助材料も、繰り返しを通して増加率から消えることがあります。

<a id="thm-tsp12-cancellation"></a>

<!-- formal-statement-start -->
> **定理（閉じた前順序の消去則と間隔）**
>
> 閉じたStrassen前順序 $\le_P$ を持つ半環 $S$ で、$a,b,c\in S$ とする。
>
> (i) $c\ne0$ かつ $ac\le_P bc$ なら $a\le_P b$。
>
> (ii) 全ての正整数 $m$ で $ma\le_P mb+c$ なら $a\le_P b$。
>
> (iii) $a+c\le_P b+c$ なら $a\le_P b$。
<!-- formal-statement-end -->

(ii) の対偶は重要です。$a$ が $b$ 以下でないとき、ある $m$ で $ma$ は $mb+1$ 以下でもありません。比較の失敗を、あとで実数に移しても消えない正の差へ変えます。

<!-- proof-start -->
### 証明

(i) から示します。$ac\le_P bc$ に $a^{n-1-j}b^j$ を掛けると、$j=0,\ldots,n-1$ の各段階で

$$
a^{n-j}b^j c\le_P a^{n-j-1}b^{j+1}c.
$$

つなぐと $a^nc\le_P b^nc$。$c\ne0$ なので正整数 $u,v$ を $1\le_P uc,\ c\le_P v$ となるように取れば

$$
a^n\le_P ua^nc\le_P ub^nc\le_P uvb^n.
$$

定数 $(uv)^{1/n}\to1$ と閉包性で $a\le_P b$ です。

(ii) で $b=0$ とします。もし $a\ne0$ なら $1\le_P ua,\ c\le_P v$ となる正整数 $u,v$ があり、任意の $m$ について $m\le_P uma\le_P uc\le_P uv$ となります。$m=uv+1$ で忠実性に反するので $a=0$ です。

$b\ne0$ の場合は $c\le_P kb$ となる正整数 $k$ を取ります。仮定の $m$ を $km$ に置き換えると

$$
kma\le_P kmb+c\le_P k(m+1)b.
$$

(i) で $k\ne0$ を消すと $ma\le_P(m+1)b$。この比較を $a^{n-j-1}b^j$ 倍して $m=j+1$ を入れると

$$
(j+1)a^{n-j}b^j\le_P(j+2)a^{n-j-1}b^{j+1}
\quad(0\le j<n).
$$

各段階の右辺は次の段階の左辺と一致します。例えば $n\ge2$ のとき、$j=0,1$ では $a^n\le_P2a^{n-1}b\le_P3a^{n-2}b^2$ です。この連鎖を $j=n-1$ までつなぐと

$$
a^n\le_P(n+1)b^n.
$$

$(n+1)^{1/n}\to1$ なので閉包性から結論が従います。

(iii) では $a+c\le_P b+c$ に $(m-1-j)a+jb$ を加えます。$0\le j<m$ について

$$
(m-j)a+jb+c\le_P(m-j-1)a+(j+1)b+c.
$$

連結して $ma+c\le_P mb+c$ を得ます。$0\le_P c$ より $ma\le_P ma+c$ なので (ii) を適用できます。
<!-- proof-end -->

零でないという条件は (i) から外せません。通常の自然数でも $2\cdot0=1\cdot0$ ですが $2\le1$ ではありません。

## 3. 比較を実数へ移す

どちらも比較できない元があるとき、片方の比較を新たに許して前順序を広げます。ただし自然数の大小を壊してはいけません。全ての元の組が少なくとも一方向に比較できる前順序を全前順序と呼びます。

<a id="thm-tsp12-total-extension"></a>

<!-- formal-statement-start -->
> **定理（全前順序への拡張）**
>
> 任意のStrassen前順序 $P$ は、閉じた全Strassen前順序 $H$ に含まれる。さらに $P$ が閉じていて $a\not\le_P b$ なら、ある正整数 $m$ とそのような拡張 $H$ を選び、$mb+1\le_H ma$ とできる。
<!-- formal-statement-end -->

有限個ずつ比較を付け加えていく発想を、任意の集合の上で実現するために [Zorn の補題](../../../基礎科目/F0/F0-00A3/index.md#thm-zorn) を使います。新しい比較は共通材料を消す操作によって元の比較と結び付けます。

<!-- proof-start -->
### 証明

閉じた $P$ で $u\not\le_P v$ とします。新しい関係を、補助元 $s$ を一つ選んで元の順序で比較できるかどうかにより定めます。

$$
x\le_{P'}y\quad\Longleftrightarrow\quad
\exists s\in S:\ x+su\le_P y+sv
$$

と置きます。$s=0$ により $P$ を含むので反射的です。$x+su\le_P y+sv$、$y+tu\le_P z+tv$ なら、前者に $tu$ を、後者に $sv$ を加えて連結し、

$$
x+(s+t)u\le_P z+(s+t)v
$$

を得ます。従って推移的です。同じ元を加える場合は同じ $s$、同じ元 $w$ を掛ける場合は $sw$ を証人にすれば演算と両立します。

自然数 $n>l$ に対して $n\le_{P'}l$ と仮定します。$l+1\le_P n$ なので $l+1+su\le_P l+sv$ となる $s$ が存在します。[閉じた前順序の消去則](#thm-tsp12-cancellation) (iii) で $l$ を消すと $1+su\le_P sv$。$s=0$ なら $1\le_P0$ となって矛盾し、$s\ne0$ なら $su\le_P sv$ から同定理 (i) により $u\le_P v$ となって矛盾します。よって自然数の忠実性は維持され、有界性も $P$ を含むため維持されます。$s=1$ とすると $v+u=u+v$ だから $v\le_{P'}u$ です。

任意のStrassen前順序 $P$ に対し、それを含むStrassen前順序全体を候補集合とします。ここで鎖とは、任意の二候補が包含で比較可能な部分集合です。各候補は $S\times S$ の部分集合なので候補全体は集合であり、包含で半順序付けられます。$P$ 自身が候補です。非空の鎖の合併は推移律を満たします。実際、比較 $x\le y,\ y\le z$ は鎖の二つの候補に属し、そのうち包含で大きい候補の中で推移律を使えます。反射律・演算との両立性は各候補から引き継がれ、自然数の逆向きの比較はどの候補にも無いので合併にも無く、有界性は $P$ から引き継がれます。空の鎖には $P$ が上界です。従って [Zorn の補題](../../../基礎科目/F0/F0-00A3/index.md#thm-zorn) で極大候補 $H$ が取れます。

[漸近前順序の閉包性](#thm-tsp12-closure) により $H$ の漸近緩和も候補なので、極大性から $H$ は閉じています。もし $x,y$ が両方向とも比較不能なら、先の構成を $u=x,v=y$ に適用して $y\le x$ を追加できます。これは極大性に反するので $H$ は全前順序です。

さらに $P$ が閉じていて $a\not\le_P b$ の場合、[閉じた前順序の消去則と間隔](#thm-tsp12-cancellation) (ii) の対偶を $c=1$ に適用して $ma\not\le_P mb+1$ となる $m$ を取ります。先の構成に $u=ma,\ v=mb+1$ を入れれば $mb+1\le_{P'}ma$ が追加されます。この $P'$ から極大拡張 $H$ を作ると目的の比較も引き継がれます。
<!-- proof-end -->

全前順序では、元 $x$ と自然数の倍数の比較から $x$ の実数値を定められます。例えば非負有理数の通常の順序で $x=3/2$ とすると $2x=3$ なので、$3/2$ は上からも下からも $x$ を挟む有理数です。一般の半環には分数の演算が存在するとは限らないため、比較は分母を払った形で行います。

<a id="thm-tsp12-total-valuation"></a>

<!-- formal-statement-start -->
> **定理（全前順序から得るスペクトル点）**
>
> 全Strassen前順序 $H$ を持つ半環 $S$ に対し、$x\in S$ の値を

$$
\lambda(x)=\inf\{p/q:p\in\mathbb N_0,\ q\in\mathbb N,\
qx\le_H p\}
$$

> で定めると、$\lambda:S\to\mathbb R_{\ge0}$ は $H$ に関する[スペクトル点](../TSP11/index.md#def-tsp11-spectral-point)である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

上からの候補は有界性による $x\le_H v$（$v\in\mathbb N$）から非空で、0を下界に持ちます。下からの候補を

$$
L_x=\{p/q:p\in\mathbb N_0,\ q\in\mathbb N,\ p\le_H qx\}
$$

とすれば $0\in L_x$ です。ここで $p/q$ は実数側の有理数であり、半環内で $x$ を $q$ で割っているわけではありません。下からの $p/q$ と上からの $r/s$ に対し

$$
sp\le_H sqx\le_H qr
$$

なので忠実性より $p/q\le r/s$ です。従って $L_x$ の上限 $\ell$ は $\lambda(x)$ 以下です。もし $\ell<\lambda(x)$ なら、その間の非負有理数 $p/q$ に対し全前順序の条件から $p\le_H qx$ または $qx\le_H p$ となり、どちらも矛盾します。よって $\ell=\lambda(x)$。

上と下の候補からそれぞれ $\lambda(x)$ に任意に近い有理数を取れます。例えば $p/q,r/s$ が $x,y$ の上からの候補なら $qx\le_H p,\ sy\le_H r$ なので

$$
qs(x+y)\le_H sp+qr,\qquad qsxy\le_H pr.
$$

分母 $qs$ は正整数なので、左の比較は $(sp+qr)/(qs)$ が $x+y$ の上からの候補、右の比較は $pr/(qs)$ が $xy$ の上からの候補であることを意味します。従って

$$
\lambda(x+y)\le p/q+r/s,\qquad
\lambda(xy)\le(p/q)(r/s).
$$

下からの候補に対しても、比較の向きを逆にした同じ演算を行うと $sp+qr\le_H qs(x+y)$、$pr\le_H qsxy$ となり、逆向きの評価を得ます。上下の候補をそれぞれ値に近づけると、有限の非負実数の和・積の連続性により

$$
\lambda(x+y)=\lambda(x)+\lambda(y),\qquad
\lambda(xy)=\lambda(x)\lambda(y).
$$

自然数 $j$ に対し $qj\le_H p$ は忠実性から $qj\le p$ と同値なので $\lambda(j)=j$。特に0と1を保ちます。$x\le_H y$ なら $qy\le_H p$ の全ての候補が $qx\le_H qy\le_H p$ を与えるので $\lambda(x)\le\lambda(y)$ です。四条件が揃いました。
<!-- proof-end -->

## 4. Strassenの双対性

これで、漸近比較の失敗を、実数値の厳密な不等式で検出する準備ができました。以下 $\Delta=\Delta(S,\preceq)$ は [漸近スペクトル](../TSP11/index.md#def-tsp11-spectral-point) です。

<a id="thm-tsp12-duality"></a>

<!-- formal-statement-start -->
> **定理（Strassen漸近スペクトル双対性）**
>
> Strassen前順序 $\preceq$ を持つ可換半環 $S$ に対して、その漸近スペクトルを $\Delta=\Delta(S,\preceq)$ とする。このとき $\Delta\ne\varnothing$ であり、任意の $a,b\in S$ について

$$
a\precsim b
\quad\Longleftrightarrow\quad
\forall\phi\in\Delta:\ \phi(a)\le\phi(b).
$$
<!-- formal-statement-end -->

前向きは測り方の条件だけから従います。逆向きの核心は、比較できない二つの元から、大小を逆転させる測り方を実際に存在証明することです。

<!-- proof-start -->
### 証明

$a^n\preceq c_nb^n$ なら、単調性と [スペクトル点の自然数値と冪](../TSP11/index.md#thm-tsp11-normalization-powers) から

$$
\phi(a)^n\le c_n\phi(b)^n.
$$

全て非負なので $n$ 乗根を取り、$c_n^{1/n}\to1$ を使うと $\phi(a)\le\phi(b)$ です。$\phi(b)=0$ の場合にも同じ不等式で $\phi(a)=0$ となります。

逆向きの対偶を示します。$a\not\precsim b$ とします。[漸近前順序の閉包性](#thm-tsp12-closure) により $P=\precsim$ は閉じています。

[全前順序への拡張](#thm-tsp12-total-extension) から $P$ を含む閉じた全Strassen前順序 $H$ と正整数 $m$ を取り、$mb+1\le_H ma$ とします。

[全前順序から得るスペクトル点](#thm-tsp12-total-valuation) の $\lambda$ は $H$ で単調であり、$\preceq$ は $H$ に含まれるので $\lambda\in\Delta$ です。従って

$$
m\lambda(b)+1\le m\lambda(a),\qquad
\lambda(a)\ge\lambda(b)+1/m>\lambda(b).
$$

これは全てのスペクトル点で $\phi(a)\le\phi(b)$ という条件を否定します。最後に、元の $P=\preceq$ からも [全前順序への拡張](#thm-tsp12-total-extension) と [全前順序から得るスペクトル点](#thm-tsp12-total-valuation) によって少なくとも一つの $\lambda\in\Delta$ が得られるので、空集合についての比較ではありません。
<!-- proof-end -->

つまり「全ての測り方が許す比較」と「劣指数的な補助資源を許した実際の比較」は一致します。これは特定の一つの測り方が十分という意味ではありません。

## 5. 漸近階数と漸近劣階数の極値公式

[自然数による上下の評価](../TSP10/index.md#thm-tsp10-order-rank) の $R_S,Q_S$ を用い、$\widetilde R_S(a)=\lim_{n\to\infty} R_S(a^n)^{1/n}$ と書きます。$n$ は半環内での積の反復回数です。$R_S(0)=0$ です。

$a\ne0$ では各冪が零でないため $R_S(a^n)\ge1$、また $a^n\preceq R_S(a^n),\ a^m\preceq R_S(a^m)$ を掛ければ $R_S(a^{n+m})\le R_S(a^n)R_S(a^m)$。

対数を取って [Fekete補題](../TSP9/index.md#lem-tsp9-fekete) を $u_n=\log R_S(a^n)$ に適用します。$0\le u_n\le n\log R_S(a)$ なので必要な下限は有限です。従って $\lim_n u_n/n=\inf_n u_n/n$、指数を取れば $\widetilde R_S(a)=\inf_n R_S(a^n)^{1/n}$ です。

$1\preceq a$ の場合は $Q_S(a^n)\ge1$ であり、同じ積の議論で $Q_S(a^{n+m})\ge Q_S(a^n)Q_S(a^m)$、かつ $Q_S(a^n)\le R_S(a^n)\le R_S(a)^n$ です。$v_n=\log Q_S(a^n)$ は優加法的で $0\le v_n\le n\log R_S(a)$。従って [Fekete補題](../TSP9/index.md#lem-tsp9-fekete) の優加法版により $\widetilde Q_S(a)=\lim_n Q_S(a^n)^{1/n}=\sup_n Q_S(a^n)^{1/n}$ です。零の場合は $\widetilde Q_S(0)=0$ とします。

<a id="thm-tsp12-extrema"></a>

<!-- formal-statement-start -->
> **定理（スペクトル極値と漸近階数・漸近劣階数）**
>
> Strassen前順序 $\preceq$ を持つ可換半環 $S$ と $a\in S$ に対し、漸近スペクトル $\Delta=\Delta(S,\preceq)$ 上で $\phi(a)$ の最大値・最小値はともに達成される。$a=0$ または $1\preceq a$ の場合、

$$
\widetilde R_S(a)=\max_{\phi\in\Delta}\phi(a).
$$

> また $a=0$、または $1\preceq a$ かつ次の少なくとも一方が成立する場合、

$$
\exists k\ge1:\ 2\preceq a^k,\qquad
\exists\psi\in\Delta:\ \psi(a)=1,
$$

> 次も成立する。

$$
\widetilde Q_S(a)=\min_{\phi\in\Delta}\phi(a).
$$
<!-- formal-statement-end -->

最大・最小が達成されることも証明します。普通の数直線上の上限・下限だけから、それを実現する写像の存在を仮定してはいけません。ここでは前節の順序拡張をもう一度使います。

<!-- proof-start -->
### 証明

**極値の達成**。[スペクトル点による上下界](../TSP11/index.md#thm-tsp11-order-bounds) により $0\le\phi(a)\le R_S(a)$。非空性も既に示したので、$M=\sup_{\phi\in\Delta}\phi(a)$ と $L=\inf_{\phi\in\Delta}\phi(a)$ は有限です。最大値を作るため、$E_j=\{\phi\in\Delta:\phi(a)>M-1/j\}$ とします。上限の定義から各 $E_j$ は非空で $E_{j+1}\subseteq E_j$ です。$x\le_j y$ を「全ての $\phi\in E_j$ で $\phi(x)\le\phi(y)$」と定めます。

実数の大小と各写像の和・積の保存から $\le_j$ は半環の前順序です。非空性と自然数値から自然数の忠実性があり、元の $\preceq$ を含むため有界性を満たします。関係の列は $\le_j\subseteq\le_{j+1}$ です。その合併もStrassen前順序になります（[全前順序への拡張](#thm-tsp12-total-extension) の鎖の合併の確認と同じく、任意の有限個の比較は十分大きい同じ添字の関係に入ります）。この合併を全前順序へ拡張し、[全前順序から得るスペクトル点](#thm-tsp12-total-valuation) を適用して $\lambda\in\Delta$ を得ます。

$0\le p/q<M$ の任意の有理数に対し、十分大きい $j$ で $p/q<M-1/j$ とできます。全ての $\phi\in E_j$ で $p<q\phi(a)$ だから $p\le_j qa$。拡張した順序でもこの比較が残るので $p\le q\lambda(a)$。$M>0$ なら有理数を下から $M$ に近づけて $\lambda(a)\ge M$、$M=0$ なら非負性から同じ結論です。上限の定義による $\lambda(a)\le M$ と合わせて等号が成立します。

最小値の場合は $E_j'=\{\phi\in\Delta:\phi(a)<L+1/j\}$ を使います。各集合は非空で減少するので同じ手順でスペクトル点 $\mu$ を作れます。$p/q>L$ を固定し $L+1/j<p/q$ となる $j$ を選べば、全ての $\phi\in E'_j$ で $q\phi(a)<p$、従って拡張された順序で $qa\le p$。$\mu(a)\le p/q$ となり、有理数を上から $L$ に近づけると $\mu(a)\le L$。下限の定義と合わせて $\mu(a)=L$ です。

**階数の公式**。単調性により各 $\phi$ について $\phi(a)^n\le R_S(a^n)$ なので $M\le\widetilde R_S(a)$。$a=0$ なら両辺0です。

残る場合 $a\ne0$ かつ $1\preceq a$ なので $M\ge1$（[スペクトル点による上下界](../TSP11/index.md#thm-tsp11-order-bounds)）。

任意の正整数 $k$ に対し $p_k=\lceil M^k\rceil\ge1$ と置くと全ての $\phi$ で $\phi(a^k)\le p_k=\phi(p_k)$。 [Strassen漸近スペクトル双対性](#thm-tsp12-duality) から $a^k\precsim p_k$ なので

$$
a^{km}\preceq c_m p_k^m,\qquad c_m^{1/m}\to1.
$$

$R_S(a^{km})^{1/(km)}\le c_m^{1/(km)}p_k^{1/k}$ となります。まず $m\to\infty$ とすると $\widetilde R_S(a)\le p_k^{1/k}$。$1\preceq a$ の場合 $M\ge1$ なので

$$
M^k\le p_k\le M^k+1\le 2M^k,
$$

従って $k\to\infty$ で $p_k^{1/k}\to M$。これで逆の評価も得られました。

**劣階数の公式**。$a=0$ は両辺0。$1\preceq a$ なら $1\le L$ です。$Q_S(a^n)\le\phi(a)^n$ から $\widetilde Q_S(a)\le L$。$\psi(a)=1$ となる写像がある場合 $L=1$ で、$\widetilde Q_S(a)\ge1$ だから等号です。

それ以外で $2\preceq a^h$ となる正整数 $h$ がある場合を考えます。$r_k=\lfloor L^k\rfloor\ge1$ とすれば全ての $\phi$ で $\phi(r_k)=r_k\le\phi(a^k)$ です。[Strassen漸近スペクトル双対性](#thm-tsp12-duality) から $r_k\precsim a^k$、従って $r_k^m\preceq c_m a^{km}$、$c_m^{1/m}\to1$。十分大きい $m$ で $c_m\le2^m$ となるため、

$$
r_k^m\preceq c_m a^{km}
\preceq2^m a^{km}
\preceq a^{hm}a^{km}=a^{(h+k)m}.
$$

よって $Q_S(a^{(h+k)m})\ge r_k^m$。$(h+k)m$ 乗根を取り、$m\to\infty$ で $\widetilde Q_S(a)\ge r_k^{1/(h+k)}$。$L=1$ ならこの値は1です。$L>1$ なら十分大きい $k$ で $L^k/2\le r_k\le L^k$ なので $r_k^{1/(h+k)}\to L$。ここから $\widetilde Q_S(a)\ge L$ が従います。
<!-- proof-end -->

階数公式の $1\preceq a$ は本講の半環では大切です。例えば非負有理数の $a=1/2$ では、任意の正整数 $q$ と非負整数 $p$ について $q\phi(p/q)=\phi(p)=p$ なので包含写像が唯一のスペクトル点です。その値は $1/2$ ですが、$R_S(a^n)=1$ なので漸近階数は1です。零でない元を全て1以上とする文献の設定と、TSP10 の有界性（ある自然数倍で1以上になる）を混同しないようにしましょう。

劣階数では、補助資源 $c_m$ を右辺に残したままでは取り出せる対角成分の数を示したことになりません。$2\preceq a^h$ は補助資源を追加の冪で置き換えるための条件です。

## 6. テンソルの場合

体 $K$ と因子数 $d\ge2$ を固定します。$D_r=\sum_{i=1}^r e_i^{\otimes d}$ は各因子が $K^r$ の対角テンソル、$[t]$ はテンソル $t$ の[制限同値類](../TSP5/index.md#def-tsp5-restriction-equivalence) です。$t^{\boxtimes n}$ は [Kronecker積](../TSP5/index.md#def-tsp5-kronecker) の $n$ 回の反復であり、半環では $[t]^n=[t^{\boxtimes n}]$ と書きます。

[テンソルのStrassen前順序](../TSP10/index.md#thm-tsp10-tensor-strassen) により制限同値類の半環を使えます。

零でないテンソルには基底展開で非零成分 $t_{i_1\ldots i_d}=\gamma$ があります。

[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) として、各因子の基底のうち添字 $i_a$ の元だけを $1\in K$ へ送り、それ以外を零へ送ります。第1因子だけは選んだ基底元を $\gamma^{-1}$ へ送ります。

選んだ成分だけが残り、係数は $\gamma\gamma^{-1}=1$ となるので $D_1\preceq t$、すなわち $1\preceq[t]$ です。

[漸近階数と漸近劣階数](../TSP9/index.md#def-tsp9-asymptotic-rank) の記号 $\widetilde R(t),\widetilde Q(t)$ と半環の値は、[対角テンソルによる階数の特徴付け](../TSP4/index.md#thm-tsp4-rank-restriction) と [テンソル劣階数](../TSP4/index.md#def-tsp4-subrank) により一致します。ここでは前節の半環上の極限の存在証明が任意の体に適用できています。

三因子の場合に劣階数の追加条件を具体的に確認します。[平坦化](../TSP3/index.md#def-tsp3-flattening) では、例えば分割 $1|23$ で第1添字を行、第2・第3添字の組を列に並べます。以下ではこの三通りの一因子対二因子の行列の階数を使います。

<a id="thm-tsp12-three-tensor"></a>

<!-- formal-statement-start -->
> **定理（三因子テンソルのスペクトル極値公式）**
>
> 任意の体 $K$ 上の有限次元三因子テンソル $t$ に対し、制限同値類の半環 $S_{K,3}$ の漸近スペクトルを $\Delta$ とすると、

$$
\widetilde R(t)=\max_{\phi\in\Delta}\phi([t]),\qquad
\widetilde Q(t)=\min_{\phi\in\Delta}\phi([t]).
$$

> さらに $t\ne0$ なら、ある平坦化階数が1、または $D_2\preceq t^{\boxtimes2}$ が成立する。
<!-- formal-statement-end -->

三因子を $U,V,W$ とします。例えば第3因子 $W$ の基底ごとに係数を取り出すと、$U,V$ の二因子テンソルが得られます。これらの任意の線形結合も、第3因子から一次元空間への局所線形写像を作用させて作れます。この二因子テンソルを行列とみなし、階数2以上の行列が得られるかを調べます。階数2の二因子テンソルを $U,V$ 間と $U,W$ 間に一つずつ作れれば、それを組み合わせて三因子の対角テンソル $D_2$ を作れます。

<!-- proof-start -->
### 証明

零テンソルは両値0。非零なら先に示した $1\preceq[t]$ と [スペクトル極値と漸近階数・漸近劣階数](#thm-tsp12-extrema) により階数公式は成立します。

三つの一因子対二因子の平坦化階数のいずれかが1なら、[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) が値1を与え、劣階数公式も成立します。以下、三つとも2以上とします。

第3因子の基底を $w_1,\ldots,w_s$ とし、[多因子テンソル積の存在・基底・一意性](../TSP1/index.md#thm-tsp1-multifactor-basis) に従って

$$
t=\sum_{k=1}^s M_k\otimes w_k,\qquad M_k\in U\otimes V
$$

と展開します。$U,V$ の基底をそれぞれ $u_i,v_j$ とします。$M_k$ は第3添字を $k$ に固定した二因子テンソルであり、

$$
M_k=\sum_{i,j}t_{ijk}u_i\otimes v_j
$$

です。行を $i$、列を $j$ とする係数行列 $(t_{ijk})_{i,j}$ でも同じ記号 $M_k$ を使います。これは [平坦化](../TSP3/index.md#def-tsp3-flattening) の二因子の場合です。その線形結合全体（[切片部分空間](../TSP3/index.md#def-tsp3-slice-space)）を $A=\operatorname{span}_K\{M_1,\ldots,M_s\}$ とします。任意の係数 $c_1,\ldots,c_s\in K$ に対し、第3因子の線形写像を $w_k\mapsto c_k$ と基底上で指定すれば、[テンソルの制限](../TSP4/index.md#def-tsp4-restriction) で

$$
\sum_{k=1}^s c_k M_k
$$

が得られます。$t\ne0$ なので少なくとも一つの切片 $M_k$ は零でなく、$A$ は零でありません。ここでもし全ての行列の階数が1以下なら非零の $u\otimes v\in A$ を固定できます。

実際、階数1の行列では非零列 $u$ を選ぶと各列は $u$ のスカラー倍であり、その係数を並べたベクトルを $v$ とすれば成分は $u_i v_j$ です。これは二因子テンソル $u\otimes v$ の成分そのものです。

他の非零の $u'\otimes v'\in A$ を取ったとき、$u,u'$ と $v,v'$ がともに独立なら、和をこれらを先頭とする基底で表示すると左上に $2\times2$ 単位行列が現れ階数2です。和も $A$ に属するので矛盾します。

従って各非零元は $u$ と比例する第1因子か、$v$ と比例する第2因子を持ちます。

もし $u\otimes v'$（$v'$ は $v$ と独立）と $u'\otimes v$（$u'$ は $u$ と独立）がともに存在すれば、その和の行列は基底 $(u,u',\ldots)$ と $(v,v',\ldots)$ で左上のブロックが $\begin{pmatrix}0&1\\1&0\end{pmatrix}$ となります。

行列式が $-1\ne0$ なので、標数2の体も含めて階数2です。

従って全ての元が $Ku\otimes V$ に入るか、全ての元が $U\otimes Kv$ に入るかのどちらかです。各 $M_k$ は $A$ に属します。前者の場合は $M_k=u\otimes v_k$ と書けるので

$$
t=\sum_{k=1}^s (u\otimes v_k)\otimes w_k
=u\otimes\left(\sum_{k=1}^s v_k\otimes w_k\right).
$$

後者の場合は各 $M_k=u_k\otimes v$ と書けるので、第2因子が $v$ に固定された展開を得ます。対応する平坦化階数は1となって仮定に反します。

よってある係数の組 $(c_1,\ldots,c_s)$ で階数2以上の二因子行列が得られます。その二因子テンソルの行列階数を $r\ge2$ とします。[二因子テンソル階数と行列階数の一致](../TSP2/index.md#thm-tsp2-matrix-rank) の証明と同じ列空間の分解を用います。

列空間の基底 $p_1,\ldots,p_r$ を選び、各列の座標を行に並べた行列を $B$ とすると元の係数行列は $PB$（$P$ の列は $p_i$）と分解できます。

元の行列の階数が $r$ なので $B$ の $r$ 行も独立です。その各行の成分を $V$ の基底でベクトル $q_i$ に戻せば、二因子テンソルは $\sum_{i=1}^r p_i\otimes q_i$ です。

両方の独立な組を基底に延長し、最初の二つだけを $K^2$ の標準基底 $e_1,e_2$ へ送り、残りを零へ送る線形写像で

$$
E_{UV}=\sum_{i=1}^2 e_i\otimes e_i\otimes1
$$

が得られます。第2因子 $V$ の基底で展開する場合も、得られる切片の線形結合全体 $A'\subseteq U\otimes W$ の全行列が階数1以下だと、今の階数1の和の議論により $U$ または $W$ の平坦化階数が1となります。従って $E_{UW}=\sum_{j=1}^2 e_j\otimes1\otimes e_j$ も制限で得られます。

[直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) により $E_{UV}\boxtimes E_{UW}\preceq t^{\boxtimes2}$。一次元因子を同一視すると左辺は

$$
\sum_{i,j=1}^2(e_i\otimes e_j)\otimes e_i\otimes e_j.
$$

第1因子で $e_i\otimes e_j\mapsto e_i$ ($i=j$)、$e_i\otimes e_j\mapsto0$ ($i\ne j$)、他の因子は恒等写像とすれば

$$
\sum_{i=1}^2 e_i\otimes e_i\otimes e_i=D_2
$$

が得られます。これが $2\preceq[t]^2$ を意味し、劣階数公式の追加条件も成立しました。
<!-- proof-end -->

例えば各因子を $K^2$ とし、$t=e_1\otimes(e_1\otimes e_1+e_2\otimes e_2)$ とします。二項の分解から $R(t)\le2$ です。[平坦化](../TSP3/index.md#def-tsp3-flattening) に従って、行を一因子の添字、列を残る二因子の添字の組 $(1,1),(1,2),(2,1),(2,2)$ の順に並べると

$$
F_{1|23}(t)=\begin{pmatrix}1&0&0&1\\0&0&0&0\end{pmatrix},\qquad
F_{2|13}(t)=\begin{pmatrix}1&0&0&0\\0&1&0&0\end{pmatrix}.
$$

第1の行列には非零行が1本、第2の行列には独立な行が2本あります。[平坦化階数によるスペクトル点](../TSP11/index.md#thm-tsp11-flattening-spectral-point) により $\phi_{1|23}([t])=1,\ \phi_{2|13}([t])=2$ です。従って全スペクトル点の値は1以上2以下で、両端を取る点が存在します。[三因子テンソルのスペクトル極値公式](#thm-tsp12-three-tensor) により $\widetilde R(t)=2,\ \widetilde Q(t)=1$ です。

二因子テンソルでは行列階数 $r$ により制限同値類が対角テンソル $D_r$ と同値になり、両漸近量は $r$ です。四因子以上についても比較の双対性と階数公式はそのまま成立します。劣階数の公式を適用する際には、対応する追加条件を別に確認します。

## 7. 演習

### Level A

<a id="ex-tsp12-a01"></a>

#### TSP12-A01

- Level: A

$c_n=3n^2$ と $d_n=3^n$ のどちらが劣指数的かを $n$ 乗根で判定せよ。

<!-- solution-start -->
**詳細解答**。$\log(c_n)/n=(\log3+2\log n)/n\to0$ なので $c_n^{1/n}=\exp(\log(c_n)/n)\to1$。一方 $d_n^{1/n}=3$ で極限が1でない。従って前者だけが劣指数的です。
<!-- solution-end -->

<a id="ex-tsp12-a02"></a>

#### TSP12-A02

- Level: A

通常の非負有理数半環で $a=5/3,b=4/3$ とする。$a^n\le c_n b^n$ が全ての正整数 $n$ で成立するとき、$c_n^{1/n}$ の下界を求め、$a\precsim b$ が成立するか判定せよ。

<!-- solution-start -->
**詳細解答**。$b>0$ なので $b^n$ で割って $c_n\ge(a/b)^n=(5/4)^n$。$n$ 乗根を取ると $c_n^{1/n}\ge5/4>1$ なので極限を1にできません。[漸近前順序](#def-tsp12-asymptotic-preorder) の条件を満たさず、比較は成立しません。
<!-- solution-end -->

<a id="ex-tsp12-a03"></a>

#### TSP12-A03

- Level: A

非負整数 $\mathbb N_0$ の通常の半環において、$a=3$ の全スペクトル点での値、$R_S(a^n),Q_S(a^n)$、両漸近量を求めよ。

<!-- solution-start -->
**詳細解答**。[スペクトル点の自然数値と冪](../TSP11/index.md#thm-tsp11-normalization-powers) により $\phi(3)=3$ です。通常の大小で $3^n$ 以上の最小の自然数と以下の最大の自然数はともに $3^n$ なので $R_S(a^n)=Q_S(a^n)=3^n$。$n$ 乗根は常に3で両漸近量も3です。恒等写像が四条件を満たすのでスペクトルは空ではありません。
<!-- solution-end -->

<a id="ex-tsp12-a04"></a>

#### TSP12-A04

- Level: A

Strassen前順序を持つ半環で $a^n\preceq(n+1)^2b^n$ が全ての $n\ge1$ で成立するとする。任意のスペクトル点 $\phi$ で $\phi(a)\le\phi(b)$ となることを示せ。

<!-- solution-start -->
**詳細解答**。[スペクトル点の自然数値と冪](../TSP11/index.md#thm-tsp11-normalization-powers) と単調性より $\phi(a)^n\le(n+1)^2\phi(b)^n$。$n$ 乗根を取ると $\phi(a)\le(n+1)^{2/n}\phi(b)$。$2\log(n+1)/n\to0$ から右の係数は1へ収束するので結論が従います。$\phi(b)=0$ の場合も $\phi(a)=0$ が直ちに従います。
<!-- solution-end -->

### Level B

<a id="ex-tsp12-b01"></a>

#### TSP12-B01

- Level: B

Strassen前順序で $a^5\preceq2b^5,\ a\preceq3b$ とする。$a^{17}$ を $b^{17}$ の自然数倍で上から抑えよ。またこの5回の比較だけを繰り返した場合に得られる補助資源の指数的な上界を求め、この計算だけで $a\precsim b$ と言えるか答えよ。

<!-- solution-start -->
**詳細解答**。$17=3\cdot5+2$ なので

$$
a^{17}=(a^5)^3a^2\preceq2^3\cdot3^2b^{17}=72b^{17}.
$$

一般に $n=5q+r,\ 0\le r<5$ とすると $a^n\preceq2^q3^rb^n$。$q/n\to1/5,\ r/n\to0$ なので $(2^q3^r)^{1/n}\to2^{1/5}>1$ です。[漸近前順序](#def-tsp12-asymptotic-preorder) には係数の $n$ 乗根が1となる列が必要です。この比較だけでは成立を保証できません。より小さい補助資源で比較できる可能性は残るので、不成立を示したわけでもありません。
<!-- solution-end -->

<a id="ex-tsp12-b02"></a>

#### TSP12-B02

- Level: B

全Strassen前順序 $H$ を持つ半環で $5\le_H 3a\le_H6$、$7\le_H 2b\le_H8$ とする。第3節の $\lambda$ を用い、$\lambda(a+b)$ と $\lambda(ab)$ の上下界を求めよ。半環の比較からも直接確認せよ。

<!-- solution-start -->
**詳細解答**。[全前順序から得るスペクトル点](#thm-tsp12-total-valuation) の上限・下限の議論から $5/3\le\lambda(a)\le2$、$7/2\le\lambda(b)\le4$。加法性から $31/6\le\lambda(a+b)\le6$、乗法性と非負性から $35/6\le\lambda(ab)\le8$ です。

直接には $10\le_H6a\le_H12$ と $21\le_H6b\le_H24$ を加えて $31\le_H6(a+b)\le_H36$ を得ます。また元の不等式を掛けて $35\le_H6ab\le_H48$ です。$\lambda$ を適用して自然数値と乗法性を使い6で割ると上の範囲と一致します。
<!-- solution-end -->

<a id="ex-tsp12-b03"></a>

#### TSP12-B03

- Level: B

$1\preceq a,\ 2\preceq a^3$ とする。全スペクトル点が $\phi(a)\ge2$ を満たすとき、[Strassen漸近スペクトル双対性](#thm-tsp12-duality) から $\widetilde Q_S(a)\ge2$ を、劣階数公式を直接引用せずに示せ。

<!-- solution-start -->
**詳細解答**。任意の $k\ge1$ で $\phi(2^k)=2^k\le\phi(a^k)$。[Strassen漸近スペクトル双対性](#thm-tsp12-duality) より $2^k\precsim a^k$、従って $2^{km}\preceq c_ma^{km}$ となる劣指数的な正整数列が存在します。

大きい $m$ では $c_m\le2^m\preceq a^{3m}$ なので

$$
2^{km}\preceq c_m a^{km}\preceq a^{(k+3)m}.
$$

従って $Q_S(a^{(k+3)m})\ge2^{km}$ です。$(k+3)m$ 乗根を取って $m\to\infty$ とすると $\widetilde Q_S(a)\ge2^{k/(k+3)}$。$k\to\infty$ で $\widetilde Q_S(a)\ge2$ です。補助資源を $a$ の冪で置き換える箇所が核心です。
<!-- solution-end -->

<a id="ex-tsp12-b04"></a>

#### TSP12-B04

- Level: B

三因子テンソル $W=e_2\otimes e_1\otimes e_1+e_1\otimes e_2\otimes e_1+e_1\otimes e_1\otimes e_2$ を考える。第3因子、第2因子をそれぞれ一次元への線形写像で縮約し、$D_2\preceq W^{\boxtimes2}$ を直接示せ。漸近劣階数の下界を求めよ。

<!-- solution-start -->
**詳細解答**。第3因子に $e_1\mapsto1,e_2\mapsto0$ を作用させると $e_2\otimes e_1+e_1\otimes e_2$ です。第1因子の基底を交換すると $e_1\otimes e_1+e_2\otimes e_2$ になります。

第2因子を同じ基底上の指定で縮約すると、第1・第3因子に $e_2\otimes e_1+e_1\otimes e_2$ が得られ、同じ基底交換で二項の対角になります。

[直和・Kronecker積と制限の両立性](../TSP5/index.md#thm-tsp5-operation-monotonicity) により、二つの制限を別々の $W$ に施してKronecker積を取ると

$$
\sum_{i,j=1}^2(e_i\otimes e_j)\otimes e_i\otimes e_j
$$

が $W^{\boxtimes2}$ の制限として得られます。第1因子で $i=j$ の基底を $e_i$ に、残りを零に送ると $D_2$ です。

従って $Q(W^{\boxtimes2})\ge2$、さらに $Q(W^{\boxtimes2m})\ge2^m$（[対角テンソルの直和とKronecker積](../TSP5/index.md#thm-tsp5-diagonal-operations) と制限の両立性）なので $2m$ 乗根の極限から $\widetilde Q(W)\ge\sqrt2$ です。これは下界であり、厳密値とは限りません。
<!-- solution-end -->

<a id="ex-tsp12-b05"></a>

#### TSP12-B05

- Level: B

閉じたStrassen前順序 $P$ で $x\not\le_P y$ とする。$mx\not\le_P my+1$ を満たす正整数 $m$ があることを説明し、$P$ を拡張する全前順序 $H$ から得たスペクトル点で $\phi(x)-\phi(y)\ge1/m$ とできる理由を示せ。

<!-- solution-start -->
**詳細解答**。もし全ての正整数 $m$ について $mx\le_P my+1$ なら、[閉じた前順序の消去則と間隔](#thm-tsp12-cancellation) の間隔の主張に $a=x,b=y$ を代入して $x\le_P y$ が従い、矛盾します。

よってそのような $m$ を一つ取れます。$u=mx,v=my+1$ と置きます。[全前順序への拡張](#thm-tsp12-total-extension) の構成で $u\not\le_P v$ なので $v\le_H u$ を追加できます。

実際、新しい関係の定義に補助元 $s=1$ を入れると $v+u\le_P u+v$ は反射律と加法の交換律から成立します。この関係を全前順序まで拡張した $H$ に [全前順序から得るスペクトル点](#thm-tsp12-total-valuation) を適用し、$\phi$ を取ります。

$my+1\le_H mx$ の両辺に $\phi$ を作用させれば $m\phi(y)+1\le m\phi(x)$。正の整数 $m$ で割って $\phi(x)-\phi(y)\ge1/m>0$ です。元の順序の失敗が、単なる非厳密不等式でなく実数上の正の差となります。
<!-- solution-end -->

### Level C

<a id="ex-tsp12-c01"></a>

#### TSP12-C01

- Level: C

非負整数係数多項式の半環 $S=\mathbb N_0[X]$ に次の比較を入れる。$p\preceq q$ とは $p(2)\le q(2)$ が成立し、さらに $q=X^j$（$j\ge0$）なら $p=0$ または $p=X^i$（$i\ge0$）であることとする。

この比較がStrassen前順序であることを確認し、全スペクトル点で $\phi(X)=2$ となることと、$\widetilde Q_S(X)=1$ を示せ。どの追加条件が失われたか説明せよ。

<!-- solution-start -->
**詳細解答**。評価値は非負であり、$p(2)=0$ となるのは零多項式だけです。反射律は定義から成立します。$p\preceq q\preceq r$ のとき評価値の推移律が成立します。$r=X^j$ なら $q=0$ または $q=X^i$。前者なら $p(2)\le0$ から $p=0$、後者なら $p=0$ または $p$ も $X$ の冪です。従って推移律が成立します。

同じ $z$ を加えたり掛けたりすると評価値の不等式は保存されます。

$q+z=X^j$ なら非負整数係数で係数1の単項式となるため、$q,z$ の一方は零で他方がその冪です。$q=0$ の場合は $p=0$ で $p+z=q+z$、$z=0$ の場合は $p+z=p$ が条件を満たします。

$qz=X^j$ の場合、$q,z$ はともに係数1の $X$ の冪でなければなりません。複数の非零項があれば積も複数項を持ち、係数が2以上なら積の対応する係数も2以上になるためです。そこで $p=0$ または $p$ が $X$ の冪となり、$pz$ も条件を満たします。これで演算との両立性を確認できました。

自然数は定数多項式です。評価値はその数自身であり、右辺が $X^j$ となる定数は1だけです。その場合にも左辺の自然数は0か1なので通常の大小と一致します。$q\ne0$ なら $q(2)>0$。整数 $r\ge2$ を $rq(2)\ge p(2)$ となるように取れば $rq$ は係数1の冪ではないため $p\preceq rq$ が成立します。有界性も確認できました。

評価写像 $p\mapsto p(2)$ は非負実数値で、定数多項式 $0,1$ を $0,1$ へ送ります。

任意の $p,q$ に対し $(p+q)(2)=p(2)+q(2)$、$(pq)(2)=p(2)q(2)$ であり、$p\preceq q$ なら定義から $p(2)\le q(2)$ です。従って [スペクトル点](../TSP11/index.md#def-tsp11-spectral-point) の四条件を満たします。

また $2X\preceq4$ かつ $4\preceq2X$ です。どちらの右辺も係数1の冪ではなく、評価値が4で一致するためです。

任意のスペクトル点 $\phi$ に適用すると $2\phi(X)=4$、従って $\phi(X)=2$ です。

しかし $n\ge1$ について $X^n$ 以下の自然数は定義上0か1に限られます。$1(2)=1\le2^n$ で1は実際に比較可能なので、$Q_S(X^n)=1$。従って $\widetilde Q_S(X)=1$ ですが、全スペクトル点での値の最小値は2です。

$1\preceq X$ は成立するものの、全ての $k\ge1$ で $2\not\preceq X^k$ であり、値1のスペクトル点も存在しません。[スペクトル極値と漸近階数・漸近劣階数](#thm-tsp12-extrema) の二つの追加条件をどちらも失っています。実際 $2^n\preceq 2X^n$ は評価値の比較と右辺の形から成立し、定数の補助資源2を許せば $2\precsim X$ となります。しかし追加の $X$ の冪をどれだけ掛けても右辺が係数1の冪のままで、整数2を取り出せません。漸近比較と補助資源なしの劣階数の違いがここにあります。
<!-- solution-end -->

## 8. 次講への接続

漸近比較を全スペクトル点による不等式へ翻訳できました。階数の最大値と、追加条件の下での劣階数の最小値は、全ての点の中で達成されます。しかし特定のテンソルに対して全スペクトル点を列挙できるとは限りません。次講では係数の非零位置とエントロピーを利用してスペクトル評価を構成する方法を学びます。

参考文献：A. Wigderson and J. Zuiddam, [Asymptotic spectra: theory, applications and extensions](https://doi.org/10.1090/bull/1880), §3（閉包、全前順序、極値、劣階数の追加条件；演習C01は Remark 3.32 の例に基づく）。T. Fritz, [A generalization of Strassen’s theorem on preordered semirings](https://doi.org/10.1007/s11083-021-09570-7)（自然数の忠実性と有界性を持つ一般の前順序）。
