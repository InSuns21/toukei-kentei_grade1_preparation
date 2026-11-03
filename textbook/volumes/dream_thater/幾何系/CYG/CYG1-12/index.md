# CYG1-12 複素構造の一次変形と正則体積形式

## 1. 同じ滑らかな多様体に、別の複素座標を入れたら何が変わるか

ここまでは「固定した複素多様体にRicci平坦Kähler計量を選べるか」を調べてきた。[Yauの定理](../CYG1-10/index.md#thm-cyg1-10-yau)では**複素構造を固定**してKähler類の中で計量を変えた。今回は問いを変える。同じ滑らかな多様体の上で、正則関数を定める複素座標の貼り合わせそのものを少し動かすと、独立な方向はいくつあるのだろうか。

例えば格子 $\Lambda=\mathbb Z+i\mathbb Z$ による楕円曲線 $\mathbb C/\Lambda$ は、格子の一つの生成元 $i$ を上半平面内の数 $\tau$ に動かして $\mathbb C/(\mathbb Z+\tau\mathbb Z)$ とできる。この変化は計量を同じ複素構造の上で動かす操作とは異なる。

本章では、パラメータ $t$ について**一次の係数だけ**を見て、「変化の方向」を数える。そのために次の三つを接続する。

1. [零にならない大域正則体積形式](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization) $\Omega$ は、接ベクトルを低い次数の正則形式へ変換する。
2. 複素座標の一次変化は、ベクトル場を係数にもつ $(0,1)$ 形式 $\mu$ で記述できる。
3. 可積分条件と座標の付け替えを区別すると、独立な一次変形がコホモロジー類になる。

初めの二つは座標で証明する。層コホモロジーとDolbeaultコホモロジーの一般同型は、正則ベクトル束版のDolbeault定理として正確に条件を明示して使う。**一次の方向が存在すること**と**その方向を実際の滑らかな変形族へ延長できること**は最後まで区別する。

以降、$X$ は連結な滑らかな複素次元 $n\ge1$ の複素多様体、$T_X=T^{1,0}X$ は[正則接束](../../CM/CM1-05/index.md#def-cm1-05-holomorphic-tangent-section)、$\Omega_X^p=\bigwedge^p(T_X)^*$ は正則 $p$ 形式の束を表す。$H_{\bar\partial}^{p,q}(X)$ は[Dolbeaultコホモロジー](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)である。コンパクトKähler性が必要な結論には改めて仮定する。

## 2. 体積形式で接ベクトルを「一つ欠いた形式」にする

$K_X=\Omega_X^n$ の非零な正則切断 $\Omega$ があれば、$v$ という接ベクトルを $\Omega$ の一つの引数に入れられる。これを**内部積（収縮）**といい、

$$
(\iota_v\Omega)(v_2,\ldots,v_n)=\Omega(v,v_2,\ldots,v_n)
$$

と定める。右辺は $n-1$ 個の接ベクトルに交代的・複素線形なので、左辺は $(n-1,0)$ 形式になる。

<a id="def-cyg1-12-contraction"></a>

<!-- formal-statement-start -->
> **定義（正則体積形式による収縮）**
>
> $X$ を複素次元 $n\ge1$ の複素多様体、$\Omega\in H^0(X,K_X)$ を大域正則 $n$ 形式とする。各点の接ベクトル $v\in T_{X,x}$ に対して

$$
\mathcal I_{\Omega,x}(v)=\iota_v\Omega_x
\in \bigwedge^{n-1}T_{X,x}^*
$$

> と定める。これらを合わせた束写像 $\mathcal I_\Omega:T_X\to\Omega_X^{n-1}$ を収縮写像という。
<!-- formal-statement-end -->

**定義の直接確認（複素二次元）。** $\Omega=dz^1\wedge dz^2$、$v=a\,\partial_{z^1}+b\,\partial_{z^2}$ とする。外積形式の定義から

$$
\Omega(v,\partial_{z^2})=a,\qquad
\Omega(v,\partial_{z^1})=-b.
$$

よって

$$
\iota_v\Omega=a\,dz^2-b\,dz^1.
$$

ここで $\iota_{\partial_{z^1}}\Omega=dz^2$、$\iota_{\partial_{z^2}}\Omega=-dz^1$。符号は「先頭の引数へ $v$ を入れる」という定義から決まり、単に $dz^j$ を一つ消す操作ではない。逆に $A\,dz^1+B\,dz^2$ を得たいなら $v=B\,\partial_{z^1}-A\,\partial_{z^2}$ を選べばよい。

一般の正則座標 $z^1,\ldots,z^n$ では $\Omega=f\,dz^1\wedge\cdots\wedge dz^n$、$v=\sum_jv^j\partial_{z^j}$ と書ける。この表示は[複素接枠の座標変換則](../../CM/CM1-05/index.md#thm-cm1-05-frame-change)および外冪の定義に従う。交代性を使って第一引数に $\partial_{z^j}$ を入れると、前にある $j-1$ 個の1形式を通過する符号が出て

$$
\iota_v\Omega
=f\sum_{j=1}^n(-1)^{j-1}v^j\,
dz^1\wedge\cdots\wedge\widehat{dz^j}\wedge\cdots\wedge dz^n.
$$

帽子はその因子を除くことを表す。$n=1$ では $\Omega_X^0=\mathcal O_X$ で、$\iota_{v^1\partial_{z^1}}(f\,dz^1)=fv^1$ と読む。

### 消えないことが、逆写像の存在を保証する

<a id="thm-cyg1-12-bundle-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（正則体積形式による束同型）**
>
> $X$ を複素次元 $n\ge1$ の複素多様体とし、$\Omega$ を**どの点でも零でない**大域正則 $n$ 形式とする。収縮写像は正則ベクトル束の同型を与える。

$$
\mathcal I_\Omega:T_X\xrightarrow{\ \simeq\ }\Omega_X^{n-1}.
$$

> この結論にはKähler性もコンパクト性も必要ない。
<!-- formal-statement-end -->

### 証明の見取り図

局所座標で $\Omega=f\,dz^1\wedge\cdots\wedge dz^n$ と書くと、$f$ が零でないため、収縮の係数表示を逆に解ける。座標で作った逆が大域的につながるのは、収縮の定義が座標ではなく形式の評価で定まっているからである。

<!-- proof-start -->
### 証明

$x\in X$ の正則座標近傍 $U$ を取り、$\Omega=f\,dz^1\wedge\cdots\wedge dz^n$ と置く。$\Omega$ は消えないため、$f$ は $U$ 上で零にならず、$1/f$ も正則である。

任意の正則 $(n-1)$ 形式 $\beta$ は一意に

$$
\beta=\sum_{j=1}^n b_j\,
dz^1\wedge\cdots\wedge\widehat{dz^j}\wedge\cdots\wedge dz^n
$$

と書ける。ここで $b_j$ は正則関数である。上で導いた収縮公式と係数を比較すれば

$$
b_j=f(-1)^{j-1}v^j
\quad\Longleftrightarrow\quad
v^j=\frac{(-1)^{j-1}b_j}{f}.
$$

従って $\beta$ に対する逆像 $v=\sum_j(-1)^{j-1}(b_j/f)\partial_{z^j}$ が一意に存在し、その係数は正則である。任意の $x$ に対して成り立つので、各繊維で階数 $n$ の線形同型である。二つの座標で得る逆像はともに座標不変な等式 $\iota_v\Omega=\beta$ を満たす一意の元だから、重なりで一致する。よって局所逆写像は大域的な正則束写像へ貼り合わさる。$\square$
<!-- proof-end -->

この定理は[大域正則体積形式による標準束自明化](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)の別の使い道である。$K_X\simeq\mathcal O_X$ なら零にならない $\Omega$ を選べる。ただし $\Omega$ の選択は一意とは限らず、$\Omega$ を $c\Omega$ に替えると写像も $c$ 倍される。**同型の存在**と**写像の自然な正規化**は別である。

**仮定を失う例。** $\mathbb C^2$ 上の $\Omega=z^1\,dz^1\wedge dz^2$ は大域正則でも $z^1=0$ で零になる。その点では $\mathcal I_{\Omega,x}$ が零写像となり、$\partial_{z^1}$ の像も零になる。先ほどの逆公式に $1/z^1$ が現れるため、正則な逆が作れない。失ったのはコンパクト性ではなく、体積形式の**非消滅性**である。

## 3. 収縮をコホモロジーまで運ぶ

[Dolbeault複体](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-complex)では通常の $(p,q)$ 形式に $\bar\partial$ を作用させた。今回は正則ベクトル束 $E$ を係数に持つ $(0,q)$ 形式を使う。その空間を $\mathcal A^{0,q}(X,E)$ と書く。正則枠 $e_a$ の下で

$$
\alpha=\sum_a\alpha^a\otimes e_a,\qquad
\bar\partial_E\alpha=\sum_a(\bar\partial\alpha^a)\otimes e_a
$$

と定める。正則枠の変換係数は $\bar\partial$ で零になるので、この公式は枠によらない。$\bar\partial_E^2=0$ も通常の $\bar\partial^2=0$ から従う。

この複体の $q$ 次の閉形式を完全形式で割ったものを $H_{\bar\partial}^{0,q}(X,E)$ と書く。特に $E=T_X$ なら $\bar\partial_{T_X}$ は接ベクトル場の係数へ作用する。後で使う $H^q(X,E)$ は、**正則切断の層の層コホモロジー**である。この二つの記号を最初から同じ定義とみなさない。

ここでは次の一般結果を外部定理として用いる。

> **Dolbeaultの定理（正則ベクトル束版、外部入力）。** 複素多様体 $X$ とその正則ベクトル束 $E$ について、自然な同型 $H^q(X,E)\simeq H_{\bar\partial}^{0,q}(X,E)$ がある。理由は、正則 $E$ 切断の層から始まるベクトル束値Dolbeault複体が局所 $\bar\partial$-Poincaré補題で完全になり、その滑らかな形式の層がfineであることにある。本章ではその層コホモロジー一般論の完全証明までは行わない。

では第2節の束同型をこの複体へ拡張しよう。局所的に

$$
\mu=\sum_{j,k}\mu_{\bar j}^{\,k}\,
d\bar z^j\otimes\partial_{z^k}
\in\mathcal A^{0,1}(X,T_X)
$$

と書くとき、係数 $\mu_{\bar j}^{\,k}$ は滑らかな複素関数である。収縮後の形式は「反正則成分を左に置く」と決め、

$$
\mathcal I_{\Omega,1}(\mu)
=\sum_{j,k}\mu_{\bar j}^{\,k}\,
d\bar z^j\wedge\iota_{\partial_{z^k}}\Omega
\in\mathcal A^{n-1,1}(X)
$$

とする。一般の $q$ でも $(0,q)$ 成分を左へ置く。この順序で符号を固定すれば、$\bar\partial$ は左の係数に作用するだけなので収縮と可換になる。例えば $n=2$、$\Omega=dz^1\wedge dz^2$ で

$$
\mu=d\bar z^1\otimes\partial_{z^1}
+2d\bar z^2\otimes\partial_{z^2}
$$

なら

$$
\mathcal I_{\Omega,1}(\mu)
=d\bar z^1\wedge dz^2-2d\bar z^2\wedge dz^1.
$$

ここでは反正則形式を後ろへ並べ直した際の余分な符号を暗黙に入れていない。

<a id="thm-cyg1-12-cohomology-isomorphism"></a>

<!-- formal-statement-start -->
> **定理（収縮によるDolbeaultコホモロジーの同型）**
>
> $X$ を複素次元 $n\ge1$ の複素多様体とし、$\Omega\in H^0(X,K_X)$ は大域的に零にならないとする。任意の $q\ge0$ に対し収縮は複体の同型、従ってコホモロジーの同型を誘導する。

$$
H_{\bar\partial}^{0,q}(X,T_X)
\simeq H_{\bar\partial}^{n-1,q}(X).
$$

> 特に正則ベクトル束版Dolbeaultの定理を使うと

$$
H^1(X,T_X)\simeq H_{\bar\partial}^{n-1,1}(X).
$$

> $X$ がコンパクトKählerなら右辺の複素次元はHodge数 $h^{n-1,1}(X)$ である。
<!-- formal-statement-end -->

### 証明の見取り図

正則束同型はすべてのベクトル束値 $(0,q)$ 形式へ作用する。$\Omega$ の正則性を使って $\bar\partial$ との可換性を確かめると、閉形式は閉形式へ、完全形式は完全形式へ移る。逆の束同型も同じ性質を持つ。

<!-- proof-start -->
### 証明

第2節の[正則束同型](#thm-cyg1-12-bundle-isomorphism)は局所正則枠を正則枠へ送るため、$q$ 次の滑らかな形式の係数に作用させた $\mathcal I_{\Omega,q}$ は各 $q$ で線形同型となる。局所的に $\Omega=f\,dz^1\wedge\cdots\wedge dz^n$ と書けば $\bar\partial f=0$、$\bar\partial dz^j=0$ なので

$$
\bar\partial\,\mathcal I_{\Omega,q}(\alpha)
=\mathcal I_{\Omega,q+1}(\bar\partial_{T_X}\alpha).
$$

左辺で $(0,q)$ 形式を最初に並べたので、$q$ 次形式の微分に由来する符号は両辺で同じである。ゆえに $\bar\partial_{T_X}\alpha=0$ なら収縮像も閉であり、$\alpha=\bar\partial_{T_X}\gamma$ なら $\mathcal I_{\Omega,q}(\alpha)=\bar\partial\,\mathcal I_{\Omega,q-1}(\gamma)$ で完全となる。逆束同型にも同じ議論ができ、閉形式の商で相互に逆の写像を与える。

$q=1$ と置き、上で仮定を記した正則ベクトル束版Dolbeaultの定理を $E=T_X$ へ適用すれば、層コホモロジー $H^1(X,T_X)$ も同定される。コンパクトKählerなら[Hodge分解と調和代表](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)の文脈で $h^{n-1,1}(X)=\dim_{\mathbb C}H_{\bar\partial}^{n-1,1}(X)$ と読む。$\square$
<!-- proof-end -->

大事なのは、**この同型自体は変形理論を使わない**ことだ。$\Omega$ が存在すれば複素多様体の正則束とコホモロジーについて成立する。同型の左側をなぜ「一次変形」と呼ぶのかは次節で説明する。

## 4. Beltrami微分から無限小変形へ

複素構造を実際に変えると、どの方向の微分を「反正則方向」と呼ぶかが変わる。局所座標で元の $(0,1)$ 方向は $\partial_{\bar z^j}$ が張る。一次パラメータ $t$ に対し、新しい方向が

$$
\bar D_{\bar j}(t)
=\partial_{\bar z^j}
+t\sum_k\mu_{\bar j}^{\,k}\partial_{z^k}
+O(t^2)
$$

の形で傾くと考える。$\mu$ は前節のベクトル場値 $(0,1)$ 形式で、**Beltrami微分**と呼ばれる。ここでは $t$ の一次までの形式的変形を扱い、$t^2=0$ として二次以上は捨てる考え方と同じである。

可積分性とは局所正則座標が存在すること、すなわち新しい $(0,1)$ 分布がLie括弧で閉じる条件である。[複素ベクトル場の括弧閉性と可積分条件](../../CM/CM1-06/index.md#thm-cm1-06-bracket-characterization)を一次まで計算する。座標微分同士の括弧は零なので

$$
[\bar D_{\bar i}(t),\bar D_{\bar j}(t)]
=t\sum_k
\left(\partial_{\bar z^i}\mu_{\bar j}^{\,k}
-\partial_{\bar z^j}\mu_{\bar i}^{\,k}\right)\partial_{z^k}
+O(t^2).
$$

左辺に一次の $(1,0)$ 成分が残ると新しい $(0,1)$ 分布の閉性が破れる。ゆえに一次可積分条件は

$$
\bar\partial_{T_X}\mu=0.
$$

しかし同じ変形でも、座標を微小に付け替えれば $\mu$ の表示が変わる。その付け替え $w^k=z^k+t v^k(z,\bar z)$ を考えると、$\bar D_{\bar j}(t)$ を $w^k$ に作用させた一次係数は

$$
\bar D_{\bar j}(t)w^k
=t\left(\partial_{\bar z^j}v^k+\mu_{\bar j}^{\,k}\right)+O(t^2).
$$

したがって座標を押し出す向きで $\mu$ の係数は $\mu+\bar\partial_{T_X}v$ に移る（逆向きの付け替えでは符号が反転する）。$v$ は滑らかな $(1,0)$ ベクトル場である。$\bar\partial_{T_X}v$ だけの変化は幾何学的に新しい方向として数えない。

<a id="def-cyg1-12-first-order-beltrami"></a>

<!-- formal-statement-start -->
> **定義（一次Beltrami変形と同値）**
>
> 複素多様体 $X$ 上で $\bar\partial_{T_X}\mu=0$ を満たす $\mu\in\mathcal A^{0,1}(X,T_X)$ を一次可積分Beltrami変形という。二つの変形 $\mu,\mu'$ は、滑らかなベクトル場 $v\in\mathcal A^{0,0}(X,T_X)$ が存在し

$$
\mu'-\mu=\bar\partial_{T_X}v
$$

> となるとき同値とする。同値な零類、すなわち $\mu=\bar\partial_{T_X}v$ となるものを自明な一次変形という。
<!-- formal-statement-end -->

**定義の直接確認。** $X=\mathbb C$ で $\mu=d\bar z\otimes\partial_z$ とする。複素次元1では $(0,2)$ 形式が存在しないので $\bar\partial_{T_X}\mu=0$ である。一方 $v=\bar z\,\partial_z$ は滑らかで

$$
\bar\partial_{T_X}v=d\bar z\otimes\partial_z=\mu.
$$

従ってこの $\mu$ は $\mathbb C$ 上では自明である。局所的に非零の係数を持つことと、**大域的な変形類が非零**であることは別である。

<a id="thm-cyg1-12-first-order-classification"></a>

<!-- formal-statement-start -->
> **定理（一次複素構造変形の分類）**
>
> $X$ を複素多様体とする。一次可積分Beltrami変形を上記の滑らかな座標の一次付け替えで同一視したベクトル空間は

$$
\frac{\ker(\bar\partial_{T_X}:\mathcal A^{0,1}(X,T_X)\to\mathcal A^{0,2}(X,T_X))}
{\operatorname{im}(\bar\partial_{T_X}:\mathcal A^{0,0}(X,T_X)\to\mathcal A^{0,1}(X,T_X))}
=H_{\bar\partial}^{0,1}(X,T_X)
\simeq H^1(X,T_X)
$$

> と自然に同定される。**これは一次の形式的変形の分類**であり、すべての類が実際の小さいパラメータに沿う変形族へ延長するとは主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

Lie括弧の一次項は閉条件を与え、座標の一次付け替えは完全形式を与える。二つの計算は異なる幾何学的意味を持つが、商空間を作るとちょうどDolbeaultコホモロジーの定義になる。

<!-- proof-start -->
### 証明

$\bar D_{\bar j}(t)$ の括弧を上の座標計算で展開すると、一次の $(1,0)$ 成分が消えることは全ての $i,j,k$ に対して

$$
\partial_{\bar z^i}\mu_{\bar j}^{\,k}
-\partial_{\bar z^j}\mu_{\bar i}^{\,k}=0
$$

と同値である。これは $\bar\partial_{T_X}\mu=0$ の係数条件であり、局所的な枠変更に対して不変である。$t^2=0$ とした形式的な一次可積分条件を尽くしている。

次に一次の座標付け替え $w=z+t v$ について、$\bar D_{\bar j}(t)w^k$ を直接計算すると

$$
\bar D_{\bar j}(t)w^k
=\partial_{\bar z^j}(z^k+t v^k)
+t\mu_{\bar j}^{\,\ell}\partial_{z^\ell}(z^k+t v^k)
=t(\partial_{\bar z^j}v^k+\mu_{\bar j}^{\,k})+O(t^2).
$$

従って一次の座標付け替えが作る差は $\bar\partial_{T_X}v$ である。逆に任意の滑らかな $v$ は $w=z+t v$ の一次座標付け替えを与え、形式的には逆 $z=w-t v(w,\bar w)$ を持つ。よって差が完全形式であることと、一次の座標付け替えで移ることは同値である。

閉形式の集合をこの完全形式の集合で割った商は、[Dolbeaultの閉形式・完全形式による商](../../CM/CM2-04/index.md#def-cm2-04-dolbeault-cohomology)のベクトル束値版そのものである。最後の層コホモロジーとの同型は第3節で仮定を明示した正則ベクトル束版Dolbeaultの定理による。$\square$
<!-- proof-end -->

なお、上の「一次変形」は選んだ滑らかな同一視の下での記述である。一般の実際の複素構造変形の存在や、その族の同型の扱いを完全に分類したわけではない。二次以上では $\mu$ 同士のLie括弧を含む非線形条件が出現し、一次に閉な類が自動的に延長するとは限らない。

## 5. 一次変形とHodge数をつなぐ

第3節の収縮同型と、第4節のBeltrami変形の分類を合成しよう。

<a id="thm-cyg1-12-first-order-hodge"></a>

<!-- formal-statement-start -->
> **定理（一次変形とHodge群の対応）**
>
> $X$ を連結・コンパクト・複素次元 $n\ge1$ のKähler多様体とし、$K_X\simeq\mathcal O_X$ と仮定する。零にならない大域正則 $n$ 形式 $\Omega$ を選ぶと、一次複素構造変形の同値類は次の有限次元ベクトル空間と同型である。

$$
H^1(X,T_X)\xrightarrow[\ \iota_{(-)}\Omega\ ]{\ \simeq\ }
H_{\bar\partial}^{n-1,1}(X).
$$

> 従って一次変形空間の**複素次元**は $h^{n-1,1}(X)$ である。この数値だけでは、実際の変形空間が滑らかな複素多様体になるとも、その局所次元が同じとも結論しない。
<!-- formal-statement-end -->

### 証明の見取り図

$K_X$ 自明性から $\Omega$ を選び、[収縮の束同型](#thm-cyg1-12-bundle-isomorphism)で接束を正則 $(n-1)$ 形式束に替える。そこから[コホモロジーの同型](#thm-cyg1-12-cohomology-isomorphism)を得て、[一次変形の分類](#thm-cyg1-12-first-order-classification)を適用する。

<!-- proof-start -->
### 証明

[標準束自明化の命題](../CYG1-02/index.md#prop-cyg1-02-volume-trivialization)を、仮定 $K_X\simeq\mathcal O_X$ に適用すると零にならない大域正則 $\Omega$ が得られる。これを[収縮によるDolbeault同型](#thm-cyg1-12-cohomology-isomorphism)へ代入すると

$$
H^1(X,T_X)\simeq H_{\bar\partial}^{0,1}(X,T_X)
\xrightarrow{\ \simeq\ }H_{\bar\partial}^{n-1,1}(X).
$$

最初の同型は正則ベクトル束版Dolbeaultの定理、二番目は $\Omega$ の正則性と非消滅性により得た複体同型である。$H_{\bar\partial}^{0,1}(X,T_X)$ は[一次変形の分類](#thm-cyg1-12-first-order-classification)の空間である。コンパクトKähler性の下で右辺は有限次元で、[Hodge数の定義とHodge分解](../../HOD/HOD1-06/index.md#thm-hod1-06-hodge-decomposition)により複素次元が $h^{n-1,1}(X)$ となる。$\square$
<!-- proof-end -->

**この定理が数えないもの。** ある一次類をパラメータの二次・三次へ延長し、近傍の複素構造を全部集めた空間が滑らかになることは、別の主張である。実際の変形理論ではKodaira–Spencer/Kuranishi理論が局所的な変形を扱い、コンパクトKählerで標準束が自明な場合の無障害性にはBogomolov–Tian–Todorov定理という深い入力がある。**ここではそれらを証明していない。** とくに $h^{n-1,1}$ という数を、前提を確認せず「実際のモジュライの次元」と言い換えない。

## 6. 具体例で一次の方向を数える

### 6.1 楕円曲線：複素一次元の場合

平坦な楕円曲線 $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ では[大域正則1形式](../CYG1-04/index.md#prop-cyg1-04-volume-form) $\Omega=dz$ が零にならない。第2節の収縮は

$$
\iota_{a\partial_z}dz=a,\qquad T_E\simeq\mathcal O_E
$$

である。複素次元1なので $n-1=0$。従って

$$
H^1(E,T_E)\simeq H_{\bar\partial}^{0,1}(E),\qquad
\dim_{\mathbb C}H^1(E,T_E)=h^{0,1}(E)=1.
$$

最後の次元は[楕円曲線のHodge数](../../HOD/HOD1-09/index.md#prop-hod1-09-elliptic-periods)から得る。代表元 $\mu=d\bar z\otimes\partial_z$ は閉である。仮に $\mu=\bar\partial(v\partial_z)$ なら、格子で周期的な滑らかな $v$ に $\partial_{\bar z}v=1$ が必要で、基本領域上の積分は左辺が周期境界の相殺で0、右辺が正の面積となり矛盾する。よって $\mu$ は非零の一次変形類を表す。非コンパクトな $\mathbb C$ で同じ係数が自明だったこととの違いは、**原始関数 $\bar z$ が格子商では周期的でない**点にある。

### 6.2 積の二次元トーラス：四つの方向

$E^2=(\mathbb C/(\mathbb Z+i\mathbb Z))^2$ では $\Omega=dz^1\wedge dz^2$ がある。定数係数の

$$
\mu=\sum_{j,k=1}^2 c_{\bar j}^{\,k}
d\bar z^j\otimes\partial_{z^k}
$$

は閉で、収縮により

$$
\mathcal I_{\Omega,1}(\mu)
=\sum_{j=1}^2
\left(c_{\bar j}^{\,1}d\bar z^j\wedge dz^2
-c_{\bar j}^{\,2}d\bar z^j\wedge dz^1\right).
$$

各 $c_{\bar j}^{\,k}$ は独立な複素数である。零でない定数行列が $\bar\partial v$ なら、各成分 $\partial_{\bar z^j}v^k$ の基本領域積分は0となるはずだが、定数の積分は零でない。従ってこの四方向は独立である。

<a id="prop-cyg1-12-torus-directions"></a>

<!-- formal-statement-start -->
> **命題（複素トーラスの定数係数一次変形）**
>
> $E=\mathbb C/(\mathbb Z+i\mathbb Z)$ とし、$X=E^n$（$n\ge1$）とする。$n^2$ 個の定数係数形 $d\bar z^j\otimes\partial_{z^k}$（$1\le j,k\le n$）の類は $H^1(X,T_X)$ の基底をなし、

$$
\dim_{\mathbb C}H^1(X,T_X)=n^2=h^{n-1,1}(X).
$$
<!-- formal-statement-end -->

### 証明の見取り図

接束は定数枠で自明化される。Dolbeault複体はその枠の本数だけ通常の $(0,q)$ 複体を並べたものになる。平坦トーラスでは調和形式の係数が定数であることから、一次類は定数係数で尽くされる。

<!-- proof-start -->
### 証明

格子平行移動は $\partial_{z^k}$ を保つので、$T_X$ は大域正則枠 $\partial_{z^1},\ldots,\partial_{z^n}$ を持つ。従って

$$
\mathcal A^{0,q}(X,T_X)
=\bigoplus_{k=1}^n\mathcal A^{0,q}(X)\otimes\partial_{z^k},
$$

かつ $\bar\partial_{T_X}$ は各成分へ独立に $\bar\partial$ を作用させる。よって $H^1(X,T_X)$ は $n$ 個の $H_{\bar\partial}^{0,1}(X)$ の直和となる。

標準平坦計量の $(0,1)$ 形式について、[Dolbeault調和代表の定理](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)を適用する。平坦トーラスで $\bar\partial$-LaplacianをFourier展開すると、零でない周波数 $m$ の係数には正の定数倍の $|m|^2$ が作用するので、調和な係数は零周波数、すなわち定数だけである。従って $H_{\bar\partial}^{0,1}(X)$ の基底は $d\bar z^1,\ldots,d\bar z^n$ である。

各正則接枠との積を取ると $n^2$ 個の基底を得る。独立性は基本領域で係数を積分しても確かめられる。最後のHodge数との等号は[一次変形とHodge群の同型](#thm-cyg1-12-first-order-hodge)による。$\square$
<!-- proof-end -->

### 6.3 quintic：101は「接空間」の数字

滑らかな五次超曲面 $X\subset\mathbb P^4$ は[標準束自明性](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)を持つコンパクトKähler三次元多様体である。[Hodgeダイヤモンドの計算](../CYG1-08/index.md#prop-cyg1-08-hodge-diamond)によって

$$
h^{2,1}(X)=101.
$$

この $X$ に第5節の定理を適用するには、複素次元 $n=3$、零にならない $\Omega\in H^0(X,K_X)$、コンパクトKähler性を確認する。すると

$$
\dim_{\mathbb C}H^1(X,T_X)
=\dim_{\mathbb C}H_{\bar\partial}^{2,1}(X)
=101.
$$

したがって **101は、一次複素構造変形の同値類の複素次元**である。次章では五次斉次多項式の係数からも101方向を数える。しかし「多項式の係数を動かす方向」と「任意の一次複素構造変形」が一致するという主張、およびそれらが全部滑らかな族へ積分されるという主張には、それぞれ追加の理論が必要である。本章の同型だけでその二段を飛び越えない。

## 7. 演習――収縮、閉条件、同値、次元を別々に確かめる

<a id="ex-cyg1-12-a01"></a>
#### CYG1-12-A01 三次元で収縮の符号を計算する
- Level: A

$\mathbb C^3$ の $\Omega=dz^1\wedge dz^2\wedge dz^3$ に対し、$v=2\partial_{z^1}-\partial_{z^2}+3\partial_{z^3}$ の $\iota_v\Omega$ を求めよ。

<!-- solution-start -->
**詳細解答。** [収縮の定義](#def-cyg1-12-contraction)から $\partial_{z^1}$ は先頭で符号 $+$、$\partial_{z^2}$ は先頭へ移すのに一回交換して符号 $-$、$\partial_{z^3}$ は二回交換して符号 $+$ となる。従って

$$
\iota_v\Omega
=2dz^2\wedge dz^3-(-1)dz^1\wedge dz^3
+3dz^1\wedge dz^2.
$$

つまり $2dz^2\wedge dz^3+dz^1\wedge dz^3+3dz^1\wedge dz^2$ である。$\partial_{z^2}$ の係数自体が $-1$ であることと外積の負符号を区別した。
<!-- solution-end -->

<a id="ex-cyg1-12-a02"></a>
#### CYG1-12-A02 逆写像と非消滅性
- Level: A

$\Omega=f(z)\,dz^1\wedge dz^2$、$f$ は零にならない正則関数とする。$\beta=A(z)\,dz^1+B(z)\,dz^2$ の収縮逆像を求め、なぜ正則か示せ。

<!-- solution-start -->
**詳細解答。** $v=v^1\partial_{z^1}+v^2\partial_{z^2}$ と置く。[束同型の証明](#thm-cyg1-12-bundle-isomorphism)の係数式は

$$
\iota_v\Omega=f(v^1dz^2-v^2dz^1)
$$

なので $fv^1=B$、$-fv^2=A$ である。従って

$$
v=(B/f)\partial_{z^1}-(A/f)\partial_{z^2}.
$$

$1/f$ が正則であることは $f\ne0$ から従い、逆像は正則ベクトル場になる。$f$ が零を持つならこの割り算を全点で行えない。
<!-- solution-end -->

<a id="ex-cyg1-12-a03"></a>
#### CYG1-12-A03 収縮とbar∂の交換
- Level: A

$\mathbb C^2$ 上 $\Omega=dz^1\wedge dz^2$、$\mu=a(\bar z^1)\,d\bar z^1\otimes\partial_{z^1}$ とする。ただし $a(w)$ は複素変数 $w$ の正則関数とする。$\bar\partial_{T}\mu$ と $\bar\partial\mathcal I_{\Omega,1}(\mu)$ をそれぞれ計算せよ。

<!-- solution-start -->
**詳細解答。** まず $\bar\partial a=a'(\bar z^1)d\bar z^1$ だから

$$
\bar\partial_T\mu
=a'(\bar z^1)d\bar z^1\wedge d\bar z^1\otimes\partial_{z^1}=0.
$$

収縮像は $a(\bar z^1)d\bar z^1\wedge dz^2$。その $\bar\partial$ は $a'(\bar z^1)d\bar z^1\wedge d\bar z^1\wedge dz^2=0$。どちらも同じ反対称性で消え、[収縮による複体同型](#thm-cyg1-12-cohomology-isomorphism)の閉形式での具体例となる。
<!-- solution-end -->

<a id="ex-cyg1-12-a04"></a>
#### CYG1-12-A04 一次可積分条件を係数で調べる
- Level: A

$\mathbb C^2$ 上 $\mu=\bar z^2d\bar z^1\otimes\partial_{z^1}$ と $\nu=\bar z^1d\bar z^1\otimes\partial_{z^1}$ のうち一次可積分なものを判定せよ。

<!-- solution-start -->
**詳細解答。** [一次変形の括弧計算](#thm-cyg1-12-first-order-classification)では $(\bar1,\bar2)$ 成分が

$$
\partial_{\bar z^1}\mu_{\bar2}^{\,1}
-\partial_{\bar z^2}\mu_{\bar1}^{\,1}
$$

である。$\mu$ では第一項が0、第二項が1なので $-1\ne0$。よって閉でない。一方 $\nu$ は $\bar2$ 係数が0で、$\partial_{\bar z^2}\bar z^1=0$ だから閉である。係数に反正則変数があることだけでは非可積分とは決められない。
<!-- solution-end -->

<a id="ex-cyg1-12-a05"></a>
#### CYG1-12-A05 座標の付け替えによる自明方向
- Level: A

$X=\mathbb C$ で $v=z\bar z\,\partial_z$ による一次の座標付け替えを行う。対応するBeltrami係数を求め、得られる類がなぜ零か説明せよ。

<!-- solution-start -->
**詳細解答。** $w=z+t z\bar z$ とすれば

$$
\partial_{\bar z}w=t z,\qquad
\bar\partial_Tv=z\,d\bar z\otimes\partial_z.
$$

[一次変形の定義](#def-cyg1-12-first-order-beltrami)によってこの係数は完全形式で、$\mu=\bar\partial_Tv$ となるため商空間で零類を表す。係数 $z$ が恒等的には零でなくても、座標付け替え由来なので新しい変形方向ではない。
<!-- solution-end -->

<a id="ex-cyg1-12-b01"></a>
#### CYG1-12-B01 楕円曲線では同じ式が非自明になる
- Level: B

$E=\mathbb C/(\mathbb Z+i\mathbb Z)$ 上の $\mu=d\bar z\otimes\partial_z$ が閉であり、しかも完全でないことを基本領域 $[0,1]^2$ の積分で証明せよ。$\mathbb C$ との違いを説明せよ。

<!-- solution-start -->
**詳細解答。** 複素次元1には $(0,2)$ 形式がないから $\bar\partial_T\mu=0$。完全だと仮定すると、格子で周期的な滑らかな複素関数 $v(x,y)$ が $\partial_{\bar z}v=1$ を満たす。$z=x+iy$ に対し $\partial_{\bar z}=\tfrac12(\partial_x+i\partial_y)$ なので、基本領域 $F=[0,1]^2$ で

$$
\int_F\partial_{\bar z}v\,dx\,dy
=\frac12\int_F(\partial_xv+i\partial_yv)\,dx\,dy.
$$

第一項は $\int_0^1(v(1,y)-v(0,y))dy=0$、第二項も $\int_0^1(v(x,1)-v(x,0))dx=0$ である。一方右辺の定数1の積分は $\int_F1\,dx\,dy=1$。矛盾だから非完全である。$\mathbb C$ 上なら $v=\bar z$ を選べるが、$\bar z$ は格子に沿って周期的でないため $E$ 上の関数に降りない。
<!-- solution-end -->

<a id="ex-cyg1-12-b02"></a>
#### CYG1-12-B02 二次元トーラスの四方向をHodge側へ送る
- Level: B

$X=E^2$、$\Omega=dz^1\wedge dz^2$ とする。四つの定数係数 $\mu_{jk}=d\bar z^j\otimes\partial_{z^k}$（$j,k=1,2$）の収縮像を列挙し、その類が一次独立である理由を述べよ。

<!-- solution-start -->
**詳細解答。** [収縮の局所公式](#def-cyg1-12-contraction)から

$$
\begin{aligned}
\mathcal I(\mu_{11})&=d\bar z^1\wedge dz^2,&
\mathcal I(\mu_{12})&=-d\bar z^1\wedge dz^1,\\
\mathcal I(\mu_{21})&=d\bar z^2\wedge dz^2,&
\mathcal I(\mu_{22})&=-d\bar z^2\wedge dz^1.
\end{aligned}
$$

正則一形式 $dz^1,dz^2$ と反正則一形式 $d\bar z^1,d\bar z^2$ の組合せが互いに異なるので、これらは定数係数 $(1,1)$ 形式として一次独立である。コホモロジー類でも独立であることには「非零の定数係数 $(1,1)$ 形式が $\bar\partial$ 完全でない」という確認が必要で、平坦トーラスの[調和代表の一意性](../../HOD/HOD1-06/index.md#thm-hod1-06-dolbeault-harmonic)を使えば各定数係数形式は非零の調和代表である。従って四方向はコホモロジーでも独立となる。
<!-- solution-end -->

<a id="ex-cyg1-12-b03"></a>
#### CYG1-12-B03 quinticの101を正しい対象に付ける
- Level: B

滑らかな五次超曲面 $X\subset\mathbb P^4$ について $h^{2,1}(X)=101$ が既知であるとする。どの仮定と同型から $\dim_\mathbb C H^1(X,T_X)=101$ が得られるかを列挙し、そこから直ちに言えないことを一つ挙げよ。

<!-- solution-start -->
**詳細解答。** $X$ は複素次元3で、滑らかな射影多様体だからコンパクトKählerである。[標準束の自明性](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)により零にならない正則3形式 $\Omega$ が存在する。従って[一次変形とHodge群の同型](#thm-cyg1-12-first-order-hodge)を $n=3$ で適用して

$$
H^1(X,T_X)\simeq H_{\bar\partial}^{2,1}(X),
\qquad\dim_\mathbb C H^1(X,T_X)=h^{2,1}(X)=101.
$$

これは無限小の同値類を数える。これだけでは、各方向を二次以上の変形へ延長できることも、実際の局所モジュライが滑らかな101次元であることも示していない。後者には変形理論と無障害性に関する追加結果を要する。
<!-- solution-end -->

<a id="ex-cyg1-12-b04"></a>
#### CYG1-12-B04 体積形式に零点があると逆が壊れる
- Level: B

$X=\mathbb C^2$ の $\Omega=z^1dz^1\wedge dz^2$ で、$\beta=dz^2$ の収縮逆像が $z^1=0$ を含む近傍で正則に取れないことを証明せよ。$\mathbb C^2$ の標準束が自明であることと矛盾しない理由も述べよ。

<!-- solution-start -->
**詳細解答。** $v=v^1\partial_{z^1}+v^2\partial_{z^2}$ と置くと

$$
\iota_v\Omega=z^1(v^1dz^2-v^2dz^1).
$$

$\beta=dz^2$ となるには $z^1v^1=1$、$z^1v^2=0$ が必要である。$z^1=0$ の点では前者が $0=1$ となって不可能であり、その近傍で正則な $v^1$ を取れない。$\mathbb C^2$ には別の大域正則体積形式 $dz^1\wedge dz^2$ があり、こちらは零にならないので[束同型定理](#thm-cyg1-12-bundle-isomorphism)を満たす。**標準束が自明**という存在条件と、**選んだ正則形式が消えない**という条件を混同していない。
<!-- solution-end -->

<a id="ex-cyg1-12-c01"></a>
#### CYG1-12-C01 収縮とBeltrami変形を一続きに検算する
- Level: C

$X=E^2$、$\Omega=dz^1\wedge dz^2$、$\mu=d\bar z^1\otimes\partial_{z^2}+2d\bar z^2\otimes\partial_{z^1}$ とする。(1) 一次可積分性、(2) 大域的な非自明性、(3) 収縮像のDolbeault類、(4) 次元の意味を順に判定せよ。

<!-- solution-start -->
**詳細解答。** (1) $\mu$ の係数は全て定数なので $\partial_{\bar z^i}\mu_{\bar j}^{\,k}=0$。従って[一次可積分条件](#thm-cyg1-12-first-order-classification)の $\bar\partial_T\mu=0$ が成り立つ。

(2) 完全だと仮定すると周期的な滑らかな $v^1,v^2$ で

$$
\partial_{\bar z^1}v^2=1,\qquad
\partial_{\bar z^2}v^1=2
$$

を満たす必要がある。各基本領域で対応する実変数の偏微分を積分すると周期境界が相殺して左辺は0だが、右辺の積分はそれぞれ1と2になる。矛盾だから非自明である。

(3) [収縮公式](#def-cyg1-12-contraction)を各項へ適用すると

$$
\mathcal I_{\Omega,1}(\mu)
=-d\bar z^1\wedge dz^1+2d\bar z^2\wedge dz^2.
$$

これは定数係数の $(1,1)$ 形式で閉じ、平坦トーラスの調和形式である。非零の調和形式は非零のDolbeault類を与えるので、[収縮同型](#thm-cyg1-12-cohomology-isomorphism)と整合する。

(4) $H^1(X,T_X)$ 全体は[トーラスの命題](#prop-cyg1-12-torus-directions)から複素4次元であり、今回の $\mu$ はそのうち一つの非零ベクトルである。この4という値は一次方向の数であって、単独では一般の変形空間の滑らかさに関する定理ではない。
<!-- solution-end -->

<a id="ex-cyg1-12-c02"></a>
#### CYG1-12-C02 「101次元のモジュライ」の偽証明を直す
- Level: C

次の議論の各飛躍を判定し、正しい結論へ書き直せ。「滑らかなquinticでは $h^{2,1}=101$ だから $H^1(X,T_X)$ は101次元。従って101個の任意の一次方向は必ず実際の複素構造の族へ延長でき、モジュライ空間は自動的に滑らかな101次元である。またRicci平坦計量の変形も全てこの101で数えられる。」

<!-- solution-start -->
**詳細解答。** 第一段には仮定の確認が必要である。滑らかなquinticはコンパクトKähler三次元で[正則体積形式を持つ](../CYG1-08/index.md#prop-cyg1-08-smooth-canonical)。このとき初めて[一次変形とHodge群の同型](#thm-cyg1-12-first-order-hodge)により

$$
\dim_{\mathbb C}H^1(X,T_X)=h^{2,1}(X)=101
$$

を結論できる。これは**無限小の形式的変形を座標付け替えで割った空間**の複素次元である。

第二段は一次の閉条件から高次の可積分条件を満たす解の存在へ飛んでいる。二次以上の障害を消せるかは別に証明すべきで、コンパクトKählerかつ標準束自明の無障害性にはBogomolov–Tian–Todorov定理の入力が要る。第三段も滑らかな局所変形空間と大域的なモジュライ空間を区別しておらず、自己同型による同一視や特異性の問題を無視できない。

最後の段は変形対象を取り違えている。[Yauの定理](../CYG1-10/index.md#thm-cyg1-10-yau)が扱う固定複素構造上のKähler類の選択は、複素構造の一次変形とは別である。少なくともKähler方向の $h^{1,1}(X)=1$ は101とは異なる。従って現段階で正しく証明できたのは「一次複素構造変形の同値類は複素101次元」までである。
<!-- solution-end -->

## 8. 次章への橋

収縮が働くのは、零にならない正則体積形式を持つためであり、Kähler類の変形を同じ群で数えたからではない。quinticでは $h^{2,1}=101$ と $h^{1,1}=1$ が異なる問いに答える。次は五次式の係数を動かすという**手で数えられる101**を、この無限小変形空間と照合し、両者の間に必要な追加論証を見極める。
