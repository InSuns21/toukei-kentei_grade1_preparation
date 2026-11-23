# LREP1 表現とは何か――作用、表現、部分表現、同値

<!-- definition-example-audit: strict -->

[GRP3の群作用](../../GRP/GRP3/index.md#def-grp3-group-action)では群の元を集合の変換として扱い、[LIE4のLie群作用](../../LIE/LIE4/index.md#def-lie4-smooth-action)ではさらに滑らかさを要求しました。この段階では、作用する先は必ずしもベクトル空間ではありません。ところが回転・Lorentz変換をスピノルや場の成分に作用させるには、**ベクトルの和とスカラー倍を保つ作用**が必要です。

本講では [LA1の複素線形写像](../../../基礎科目/LA/LA1/index.md#def-la1-complex-linear-map)を群作用に組み合わせ、群を線形変換の集まりとして表す方法を作ります。まず有限次元の複素ベクトル空間だけを使い、作用から表現への対応、不変部分空間、既約性、二つの作用を比較する線形写像と同じ作用とみなす基準を順に確かめます。無限次元Hilbert空間上のユニタリ表現は後続講で導入します。

## 1. 群の元を可逆な線形変換へ送る

有限次元複素ベクトル空間 $V$ の可逆な複素線形自己写像全体を $GL(V)$ と書きます。群の積は写像の合成で、単位元は恒等写像 $I_V$ です。基底を選び $\dim_{\mathbb C}V=n$ とすれば、$GL(V)$ の元は逆行列を持つ $n\times n$ 複素行列で表されます。この対応は、[LIE1で構成した一般線形群](../../LIE/LIE1/index.md#prop-lie1-general-linear-group)の複素版です。

群の元 $g$ がベクトル $v$ を動かす規則を $D(g)v$ と表せれば、群の単位元と積に対する作用条件を「行列の積の条件」に翻訳できます。

<a id="def-lrep1-linear-representation"></a>
<!-- formal-statement-start -->
> **定義（有限次元複素線形表現）**
>
> $G$ を群、$V$ を有限次元複素ベクトル空間とする。写像
>
$$
D:G\longrightarrow GL(V)
$$
>
> がすべての $g,h\in G$ について
>
$$
D(e)=I_V,\qquad D(gh)=D(g)D(h)
$$
>
> を満たすとき、$(V,D)$ を $G$ の **有限次元複素線形表現**という。$\dim_{\mathbb C}V$ を表現の次元（次数）という。
<!-- formal-statement-end -->

$GL(V)$ の各元はすでに可逆なので、定義から逆元についても
$$
D(g)D(g^{-1})=D(e)=I_V
$$
が成り立ち、
$$
D(g^{-1})=D(g)^{-1}
$$
と分かります。「群準同型」の意味は [GRP2の定義](../../GRP/GRP2/index.md#def-grp2-homomorphism)と一致します。なお、$G$ がLie群で **滑らかなLie群表現**を扱う場合には、上の群準同型に加えて $D:G\to GL(V)$ の滑らかさも要求します。本講の抽象群についての命題は滑らかさを仮定しません。

<!-- definition-example-start: def-lrep1-linear-representation -->
**定義の確認**：自明表現。 任意の群 $G$ と $V=\mathbb C^2$ に対し、各元を
$$
D(g)=I_2=\begin{pmatrix}1&0\\0&1\end{pmatrix}
$$
へ送ります。任意の $g,h$ について $D(gh)=I_2=I_2I_2=D(g)D(h)$、単位元の像も $I_2$ なので表現です。すべてのベクトルを固定する点に注意します。

**定義の確認**：標準表現。 $G=GL_2(\mathbb C)$、$V=\mathbb C^2$ とし $D(A)v=Av$ と置きます。$D(I_2)=I_2$ で、行列の結合律から
$$
D(AB)v=(AB)v=A(Bv)=D(A)D(B)v
$$
です。任意の $v$ に成立するので $D(AB)=D(A)D(B)$ です。これが $GL_2(\mathbb C)$ の標準表現の具体的な作用です。行列の成分の多項式で記述されるため、Lie群表現としても滑らかです。
<!-- definition-example-end -->

<a id="thm-lrep1-action-representation"></a>
<!-- formal-statement-start -->
> **定理（線形表現と線形群作用の対応）**
>
> 群 $G$ と有限次元複素ベクトル空間 $V$ に対し、$G$ の線形表現 $D:G\to GL(V)$ と、各 $g\in G$ が複素線形に作用する $G$ の $V$ 上の左群作用とは一対一に対応する。対応は
>
$$
g\cdot v=D(g)v
$$
>
> で与えられる。
<!-- formal-statement-end -->

**証明の見取り図。** 行列に移したときに失われる条件がないか、単位元・積・線形性を両方向に検証します。

<!-- proof-start -->
### 証明

表現 $D$ を与えると、$D(e)=I_V$ より
$$
e\cdot v=D(e)v=v.
$$
また
$$
(gh)\cdot v=D(gh)v
=D(g)D(h)v=g\cdot(h\cdot v).
$$
$D(g)$ は $GL(V)$ に入るので各作用写像は複素線形です。従って [GRP3の群作用条件](../../GRP/GRP3/index.md#def-grp3-group-action)を満たします。

逆に、各 $g$ が線形に作用する左群作用を与えます。$T_g(v)=g\cdot v$ は線形であり、$T_{g^{-1}}T_g(v)=g^{-1}\cdot(g\cdot v)=v$、同様に $T_gT_{g^{-1}}(v)=v$ です。よって $T_g\in GL(V)$ です。作用公理から
$$
T_e=I_V,\qquad T_{gh}=T_gT_h.
$$
従って $D(g)=T_g$ は線形表現です。二つの構成は互いに逆です。$\square$
<!-- proof-end -->

線形表現は「行列そのもの」を記憶することではありません。行列は基底を選んだときの表示であり、**群がベクトル空間にどう作用するか**が本体です。

## 2. 一次元で表現を作る

$V=\mathbb C$ の場合、可逆な複素線形写像は非零の複素数を掛ける写像です。実際、複素線形性から $T(z)=zT(1)$ であり、逆写像がある条件は $T(1)\ne0$ です。ゆえに $GL(\mathbb C)$ と $\mathbb C^\times=\mathbb C\setminus\{0\}$ を同一視できます。

<a id="def-lrep1-character"></a>
<!-- formal-statement-start -->
> **定義（1次元指標）**
>
> 群 $G$ から非零複素数の乗法群への準同型
>
$$
\chi:G\longrightarrow\mathbb C^\times
$$
>
> を **1次元指標**という。このとき $V=\mathbb C$ で $D(g)z=\chi(g)z$ は1次元表現である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep1-character -->
**定義の確認**。 位数3の巡回群 $C_3=\langle r:r^3=e\rangle$ を取り、$\omega=e^{2\pi i/3}$ とします。$\chi(r^k)=\omega^k$（$k$ は法3）と定めると、$\omega^3=1$ なので代表元 $k$ の選び方に依存しません。さらに
$$
\chi(r^{a+b})=\omega^{a+b}=\omega^a\omega^b
=\chi(r^a)\chi(r^b),\qquad \chi(e)=1.
$$
値はすべて非零なので、指標の条件を満たします。
<!-- definition-example-end -->

一方、$\chi(e)=1$ だけでは指標ではありません。例えば $C_2=\{e,s\}$、$s^2=e$ に対して $\chi(s)=2$ とすると、$\chi(s^2)=1$ なのに $\chi(s)^2=4$ となり、積を保ちません。

## 3. どんな部分空間を残したまま作用できるか

$V$ の部分空間 $W$ を取り、その中のベクトルへ $D(g)$ を作用させても常に $W$ に戻るなら、もとの表現を $W$ の内部だけで観察できます。これは表現を小さくする最も基本的な操作です。

<a id="def-lrep1-invariant-subrepresentation"></a>
<!-- formal-statement-start -->
> **定義（不変部分空間・部分表現）**
>
> 群 $G$ の有限次元複素線形表現 $(V,D)$ に対し、複素線形部分空間 $W\subseteq V$ が
>
$$
D(g)W\subseteq W\qquad(g\in G)
$$
>
> を満たすとき、$W$ を **不変部分空間**という。$W$ 上への制限 $D_W(g)=D(g)|_W$ を $W$ の **部分表現**という。
<!-- formal-statement-end -->

包含だけを条件にした理由を確かめましょう。$g^{-1}$ にも同じ条件を課すと
$$
W=D(e)W=D(g)D(g^{-1})W\subseteq D(g)W.
$$
したがって $D(g)W=W$ が得られます。つまり各 $D(g)$ の $W$ への制限は可逆です。

<!-- definition-example-start: def-lrep1-invariant-subrepresentation -->
**定義の確認**。 $C_2=\{e,s\}$、$V=\mathbb C^2$ とし
$$
D(e)=I_2,\qquad D(s)=
\begin{pmatrix}1&0\\0&-1\end{pmatrix}.
$$
$D(s)^2=I_2$ なので群の関係式を保ちます。$e_1=(1,0)^{\mathsf T}$、$e_2=(0,1)^{\mathsf T}$ と置くと
$$
D(s)e_1=e_1,\qquad D(s)e_2=-e_2.
$$
従って $W_+=\mathbb Ce_1$ と $W_-=\mathbb Ce_2$ はいずれも不変で、制限表現はそれぞれ指標 $\chi_+(s)=1$ と $\chi_-(s)=-1$ です。零部分空間と $V$ 自身も常に不変です。
<!-- definition-example-end -->

<a id="prop-lrep1-restriction"></a>
<!-- formal-statement-start -->
> **命題（不変部分空間への制限は部分表現）**
>
> $(V,D)$ が群 $G$ の有限次元複素線形表現で、$W\subseteq V$ が不変部分空間なら、$D_W(g)=D(g)|_W$ は $G\to GL(W)$ の群準同型である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$W$ の不変性から、どの $D_W(g)$ も $W$ から $W$ への複素線形写像です。上で示した $D(g)W=W$ により、その逆写像は $D_W(g^{-1})$ です。従って $D_W(g)\in GL(W)$ です。

任意の $w\in W$ について
$$
D_W(e)w=D(e)w=w,\qquad
D_W(gh)w=D(g)D(h)w=D_W(g)D_W(h)w.
$$
よって必要な群準同型条件を満たします。$\square$
<!-- proof-end -->

## 4. これ以上小さくできない表現

「小さくする」対象を $W=\{0\}$ や $W=V$ に限れば、何も分解していません。それ以外の不変部分空間が存在するかどうかで表現を区別します。

<a id="def-lrep1-irreducible"></a>
<!-- formal-statement-start -->
> **定義（既約表現・可約表現）**
>
> $G$ の有限次元複素線形表現 $(V,D)$ について、$V\ne\{0\}$ かつ不変部分空間が $\{0\}$ と $V$ だけであるとき **既約表現**という。$V\ne\{0\}$ で $0\ne W\ne V$ を満たす不変部分空間 $W$ が存在するとき **可約表現**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep1-irreducible -->
**定義の確認**。 すべての1次元表現は既約です。$\mathbb C$ の複素線形部分空間は $\{0\}$ と $\mathbb C$ しかないためです。一方、第3節の $C_2$ の対角行列表現は $0\ne W_+\ne\mathbb C^2$ が不変なので可約です。

ここで「ある行列が対角化できる」ことと「群のすべての元に共通の不変部分空間がある」ことを混同してはいけません。既約性は **全ての $g\in G$** について判定します。
<!-- definition-example-end -->

<a id="prop-lrep1-standard-irreducible"></a>
<!-- formal-statement-start -->
> **命題（標準表現の既約性）**
>
> $n\ge1$ とする。$G=GL_n(\mathbb C)$ が $V=\mathbb C^n$ に通常の行列積で作用する標準表現は既約である。
<!-- formal-statement-end -->

**証明の見取り図。** 不変部分空間に一つでも非零ベクトルがあれば、任意の別の非零ベクトルへ送る可逆行列を作ります。その結果、不変部分空間は全空間になります。

<!-- proof-start -->
### 証明

$W\ne\{0\}$ を不変部分空間とし、$0\ne v\in W$ を選びます。任意の $0\ne w\in V$ に対して、$v$ と $w$ をそれぞれ基底
$$
(v,v_2,\ldots,v_n),\qquad(w,w_2,\ldots,w_n)
$$
へ延長できます。第1の基底の各ベクトルを第2の対応するベクトルへ送る線形写像 $A$ は、基底を基底へ送るので可逆です。従って $A\in GL_n(\mathbb C)$ かつ $Av=w$ です。

不変性から $Av\in W$、したがって任意の非零 $w$ が $W$ に入ります。零ベクトルも部分空間なので $W=V$ です。真の非零不変部分空間は存在せず、既約です。$\square$
<!-- proof-end -->

この証明は、**一つの非零ベクトルから群の作用で全ての非零ベクトルへ到達できる**ことを使いました。対角行列だけで作った群に同じ議論を流用すると、一般には失敗します。

## 5. 可約であっても直和には分けられない場合がある

第3節の $C_2$ 表現では $V=W_+\oplus W_-$ で、二つの不変部分空間の直和に分かれました。しかし可約性の定義には「不変な補空間がある」という条件は含まれていません。

補空間とは、$V=W\oplus U$ となる部分空間 $U$ です。有限次元のベクトル空間としては補空間を選べても、**群の作用でも不変**とは限りません。

<a id="prop-lrep1-nonsplit"></a>
<!-- formal-statement-start -->
> **命題（可約だが不変補空間を持たない表現）**
>
> $G=(\mathbb C,+)$、$V=\mathbb C^2$ として
>
$$
D(t)=\begin{pmatrix}1&t\\0&1\end{pmatrix}
\qquad(t\in\mathbb C)
$$
>
> と定める。$D$ は群 $G$ の滑らかな二次元表現で、$W=\mathbb Ce_1$ は不変である。しかし $V=W\oplus U$ を満たす **不変部分空間** $U$ は存在しない。
<!-- formal-statement-end -->

**証明の見取り図。** まず加法と行列積の対応を計算し、次に不変直線 $W$ を確認します。最後にすべての補直線を一つのパラメータで表し、その不変性が破れることを計算します。

<!-- proof-start -->
### 証明

$t,u\in\mathbb C$ に対して
$$
\begin{aligned}
D(t)D(u)
&=\begin{pmatrix}1&t\\0&1\end{pmatrix}
\begin{pmatrix}1&u\\0&1\end{pmatrix}\\
&=\begin{pmatrix}1&t+u\\0&1\end{pmatrix}
=D(t+u).
\end{aligned}
$$
また $D(0)=I_2$、$D(-t)$ が逆行列なので $D$ は表現です。成分は $t$ の多項式で滑らかです。

$D(t)e_1=e_1$ より $W=\mathbb Ce_1$ は非零の真の不変部分空間であり、表現は可約です。

仮に $V=W\oplus U$ となる不変部分空間 $U$ があれば、$\dim U=1$ で $U\cap W=\{0\}$ です。$U$ の非零ベクトルは第二成分が非零であるため、適当にスカラー倍して $e_2+ae_1$（$a\in\mathbb C$）と書けます。

しかし
$$
D(1)(e_2+ae_1)=e_2+(a+1)e_1.
$$
これが $U=\mathbb C(e_2+ae_1)$ に入るなら、第二成分を比べて比例係数は $1$、第一成分を比べて $a+1=a$ が必要で、矛盾です。従って不変補空間は存在しません。$\square$
<!-- proof-end -->

この模型は次講の「いつ不変補空間が存在するか」という問題を生みます。**可約**と **既約表現の直和に分解できる**は同義ではありません。

## 6. 二つの表現を比較する線形写像

同じ群 $G$ が別々のベクトル空間 $V,V'$ に作用しているとき、群の作用と矛盾しない線形写像を考えます。単なる線形写像ではなく、「先に群を作用させてから写す」ことと「先に写してから群を作用させる」ことが一致する写像です。

<a id="def-lrep1-intertwiner"></a>
<!-- formal-statement-start -->
> **定義（絡作用素）**
>
> 同じ群 $G$ の有限次元複素線形表現 $(V,D)$ と $(V',D')$ に対し、複素線形写像 $T:V\to V'$ が
>
$$
T D(g)=D'(g)T\qquad(g\in G)
$$
>
> を満たすとき、$T$ を **絡作用素**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-lrep1-intertwiner -->
**定義の確認**。 第5節の $V=\mathbb C^2$ の表現 $D(t)$ から、$\mathbb C$ 上の自明表現 $D'(t)=1$ への写像
$$
T(x,y)=y
$$
を取ります。任意の $t,x,y$ について
$$
TD(t)(x,y)=T(x+ty,y)=y=D'(t)T(x,y)
$$
ですから絡作用素です。$T$ は全単射ではありません。したがって「絡作用素である」ことだけで表現が同じだとは言えません。
<!-- definition-example-end -->

<a id="prop-lrep1-intertwiner-kernel-image"></a>
<!-- formal-statement-start -->
> **命題（絡作用素の核と像の不変性）**
>
> $T:(V,D)\to(V',D')$ が群 $G$ の表現間の絡作用素なら、$\ker T$ は $D$ に関して不変であり、$\operatorname{im}T$ は $D'$ に関して不変である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$v\in\ker T$ なら $Tv=0$ です。絡作用条件より
$$
T(D(g)v)=D'(g)Tv=D'(g)0=0,
$$
従って $D(g)v\in\ker T$ です。

次に $w\in\operatorname{im}T$ なら $w=Tv$ と書けます。すると
$$
D'(g)w=D'(g)Tv=T(D(g)v)\in\operatorname{im}T.
$$
どちらも全ての $g\in G$ について成立します。$\square$
<!-- proof-end -->

「核」と「像」は [LA1の線形写像](../../../基礎科目/LA/LA1/index.md#def-la1-complex-linear-map)と同じ概念です。群作用と可換する条件が、これらの線形部分空間を不変にするのです。

## 7. 基底が違っても同じ表現である

同じ表現を別の基底で行列表示すると、見かけの行列は変わります。そこで、表現を同じと判定する基準は成分の一致ではなく、群作用を保つ可逆な線形写像の存在にします。

<a id="def-lrep1-equivalence"></a>
<!-- formal-statement-start -->
> **定義（表現の同値）**
>
> $G$ の二つの有限次元複素線形表現 $(V,D)$、$(V',D')$ について、可逆な絡作用素 $T:V\to V'$ が存在するとき両表現は **同値**であるといい、$(V,D)\simeq(V',D')$ と書く。
<!-- formal-statement-end -->

$T D(g)=D'(g)T$ で $T$ が可逆なら、右から $T^{-1}$ を掛けて
$$
D'(g)=T D(g)T^{-1}
$$
となります。次元が同じで、どちらかの基底に合わせてこの式を書いたものが行列の相似変換です。

<!-- definition-example-start: def-lrep1-equivalence -->
**定義の確認**：基底変更。 第3節の $C_2$ 表現 $D(s)=\operatorname{diag}(1,-1)$ を考えます。
$$
P=\begin{pmatrix}1&1\\1&-1\end{pmatrix},
\qquad P^{-1}=\tfrac12P,
\qquad \det P=-2\ne0.
$$
$P$ の列を新しい基底として同じ線形作用を書き直すと
$$
\widetilde D(s)=P^{-1}D(s)P
=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$
左辺と右辺の順序を確認すると
$$
D(s)P=P\widetilde D(s).
$$
従って $P$ は新基底で表示した表現から旧基底で表示した表現への可逆な絡作用素です。行列は異なっても表現は同値です。
<!-- definition-example-end -->

<a id="prop-lrep1-equivalence-irreducible"></a>
<!-- formal-statement-start -->
> **命題（同値は既約性を保存する）**
>
> 有限次元複素線形表現 $(V,D)$ と $(V',D')$ が同値なら、一方が既約であることと他方が既約であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

可逆な絡作用素 $T:V\to V'$ を取り、$D$ の不変部分空間 $W\subseteq V$ を考えます。$D'$ の作用に対して
$$
D'(g)(TW)=T(D(g)W)\subseteq TW
$$
なので $TW$ は不変です。逆に $T^{-1}D'(g)=D(g)T^{-1}$ ですから、$D'$ の不変部分空間 $W'$ には $T^{-1}W'$ が対応します。

$T$ は線形同型なので $W=\{0\}$ と $TW=\{0\}$ が同値、$W=V$ と $TW=V'$ も同値です。従って真の非零不変部分空間の有無が一致し、既約性は同値で保たれます。$\square$
<!-- proof-end -->

一方、同じ次元であっても必ず同値になるわけではありません。$C_2$ の指標 $\chi_+(s)=1$ と $\chi_-(s)=-1$ の間の絡作用素は、$T(1)=a$ と置くと
$$
T\chi_+(s)(1)=a,\qquad \chi_-(s)T(1)=-a
$$
なので $a=0$ です。可逆な絡作用素は存在しません。

## 8. 演習

各問では、表現条件を検証してから不変性・同値性を判断してください。表現であることを確認せず行列の固有値だけを比較しないことが重要です。

### Level A

<a id="ex-lrep1-a01"></a>
#### LREP1-A01 巡回群の指標
- Level: A
- ID: LREP1-A01

$C_3=\langle r:r^3=e\rangle$、$\omega=e^{2\pi i/3}$ とする。$\chi_k(r^j)=\omega^{kj}$（$k=0,1,2$）がそれぞれ1次元指標であること、互いに異なる指標であることを示せ。

<!-- solution-start -->
**詳細解答。** $\omega^3=1$ なので $j$ の法3の代表元を変えても $\omega^{kj}$ は変わりません。$\chi_k(e)=\omega^0=1$、$\chi_k(r^{a+b})=\omega^{k(a+b)}=\omega^{ka}\omega^{kb}=\chi_k(r^a)\chi_k(r^b)$ です。値は零でないので [1次元指標の定義](#def-lrep1-character)を満たします。また $\chi_k(r)=\omega^k$ は $k=0,1,2$ で異なるので、写像として相異なります。
<!-- solution-end -->

<a id="ex-lrep1-a02"></a>
#### LREP1-A02 標準表現の不変部分空間
- Level: A
- ID: LREP1-A02

$GL_2(\mathbb C)$ の $\mathbb C^2$ 上の標準表現が既約であることを、非零ベクトル $v$ から任意の非零ベクトル $w$ へ送る可逆行列を構成する方針で示せ。

<!-- solution-start -->
**詳細解答。** $W\ne0$ が不変なら $0\ne v\in W$ を選べます。$v$ と独立な $v_2$、$w$ と独立な $w_2$ を選び、$Av=w$、$Av_2=w_2$ と定めます。$A$ は基底を基底へ送るので可逆であり $A\in GL_2(\mathbb C)$ です。不変性より $w=Av\in W$ です。$w\ne0$ は任意、零も $W$ に入るため $W=\mathbb C^2$ です。[既約性の定義](#def-lrep1-irreducible)より既約です。ここでは一つの行列ではなく群の全要素による不変性を使いました。
<!-- solution-end -->

<a id="ex-lrep1-a03"></a>
#### LREP1-A03 対角行列の全不変部分空間
- Level: A
- ID: LREP1-A03

$C_2=\{e,s\}$ に対し $D(s)=\operatorname{diag}(1,-1)$ とする。$\mathbb C^2$ の全不変部分空間を求めよ。

<!-- solution-start -->
**詳細解答。** $D(s)^2=I_2$ から表現条件を満たします。$W$ が不変で $v=(x,y)\in W$ なら
$$
\tfrac12(v+D(s)v)=(x,0)\in W,\qquad
\tfrac12(v-D(s)v)=(0,y)\in W
$$
です。したがって $W$ に両成分が非零のベクトルが一つあれば $e_1,e_2\in W$ となり $W=V$ です。一方、非零の $W$ が真部分空間なら、どのベクトルも片方の成分が零です。線形部分空間であることから、両軸の非零ベクトルを同時に含むことはできません。従って候補は $\{0\}$、$\mathbb Ce_1$、$\mathbb Ce_2$、$\mathbb C^2$ だけです。各候補が $D(e),D(s)$ の下で不変なことは直接計算できます。
<!-- solution-end -->

<a id="ex-lrep1-a04"></a>
#### LREP1-A04 一次元指標の間の絡作用素
- Level: A
- ID: LREP1-A04

$C_2$ の1次元指標 $\chi_+(s)=1$ と $\chi_-(s)=-1$ の間の複素線形絡作用素 $T:\mathbb C\to\mathbb C$ をすべて求め、両者が同値か判定せよ。

<!-- solution-start -->
**詳細解答。** 複素線形写像 $T$ は $T(z)=az$ と書けます。$s$ に対する絡作用条件は
$$
a\chi_+(s)=\chi_-(s)a,\qquad a=-a,
$$
なので $2a=0$、すなわち $a=0$ です。$e$ の条件は自動的に成立するため、絡作用素は零写像だけです。零写像は可逆でないので [同値の定義](#def-lrep1-equivalence)により同値ではありません。
<!-- solution-end -->

### Level B

<a id="ex-lrep1-b01"></a>
#### LREP1-B01 可約でも直和にならない
- Level: B
- ID: LREP1-B01

$G=(\mathbb C,+)$、$D(t)=\begin{pmatrix}1&t\\0&1\end{pmatrix}$ とする。(i) $D$ が表現であること、(ii) $W=\mathbb Ce_1$ が不変であること、(iii) $W$ に対する不変補空間が存在しないことを示せ。

<!-- solution-start -->
**詳細解答。** (i) $D(0)=I_2$ で
$$
D(t)D(u)=
\begin{pmatrix}1&t+u\\0&1\end{pmatrix}=D(t+u)
$$
です。逆は $D(-t)$ なので $D(t)\in GL_2(\mathbb C)$ です。(ii) $D(t)e_1=e_1$ より $W$ は不変で、次元1なので非零かつ真部分空間です。(iii) 仮に $\mathbb C^2=W\oplus U$ で $U$ も不変なら、$\dim U=1$ かつ $U\ne W$ より $U=\mathbb C(e_2+ae_1)$ と書けます。ところが $D(1)(e_2+ae_1)=e_2+(a+1)e_1$ が $U$ に入るなら第二成分から比例係数は1、第一成分から $a+1=a$ が必要で矛盾です。可約性だけでは補空間の不変性を保証しません。
<!-- solution-end -->

<a id="ex-lrep1-b02"></a>
#### LREP1-B02 基底変更は表現を変えない
- Level: B
- ID: LREP1-B02

$C_2=\{e,s\}$、$D(s)=\operatorname{diag}(1,-1)$、$P=\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ とする。$D'(g)=P^{-1}D(g)P$ を計算し、$D'$ が表現で $D$ と同値であることを示せ。

<!-- solution-start -->
**詳細解答。** $\det P=-2\ne0$、$P^{-1}=\frac12P$ です。よって $D'(e)=I_2$、
$$
D'(s)=\frac12
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
\begin{pmatrix}1&0\\0&-1\end{pmatrix}
\begin{pmatrix}1&1\\1&-1\end{pmatrix}
=\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$
したがって $D'(s)^2=I_2$ で $C_2$ の関係式を保ちます。より一般に任意の $g,h$ について
$$
D'(gh)=P^{-1}D(g)D(h)P
=(P^{-1}D(g)P)(P^{-1}D(h)P)
=D'(g)D'(h).
$$
さらに $D(g)P=PD'(g)$ なので $P:(V,D')\to(V,D)$ は可逆な絡作用素です。従って両表現は同値です。
<!-- solution-end -->

<a id="ex-lrep1-b03"></a>
#### LREP1-B03 絡作用素の核と像
- Level: B
- ID: LREP1-B03

$G=(\mathbb C,+)$ 上で第5節の $D(t)$ と、$\mathbb C$ 上の自明表現 $D'(t)=1$ を考える。$T(x,y)=y$ が絡作用素であることを確かめ、核と像を計算して不変性を示せ。$D$ と $D'$ が同値でない理由も述べよ。

<!-- solution-start -->
**詳細解答。** 任意の $t\in\mathbb C$ に対して
$$
TD(t)(x,y)=T(x+ty,y)=y
=D'(t)T(x,y)
$$
なので絡作用素です。$T(x,y)=0$ と同値な条件は $y=0$ ですから
$$
\ker T=\{(x,0):x\in\mathbb C\}=\mathbb Ce_1.
$$
$T(0,y)=y$ なので $\operatorname{im}T=\mathbb C$ です。核に属する $(x,0)$ は $D(t)(x,0)=(x,0)$ に写り、像の各 $y$ は $D'(t)y=y$ に写るため両者はそれぞれ不変です。$T$ は可逆ではなく、しかも $\dim V=2\ne1=\dim V'$ なので、二つの表現を結ぶ線形同型は存在せず同値ではありません。
<!-- solution-end -->

### Level C

<a id="ex-lrep1-c01"></a>
#### LREP1-C01 二次元の位数2群表現を分類する
- Level: C
- ID: LREP1-C01

$G=C_2=\{e,s\}$ とし、$D:G\to GL_2(\mathbb C)$ を任意の複素線形表現とする。$A=D(s)$ と置く。

1. $A^2=I_2$ を示し、$P_+=(I_2+A)/2$、$P_-=(I_2-A)/2$ について $P_\pm^2=P_\pm$、$P_+P_-=0$、$P_++P_-=I_2$ を示せ。
2. $V=\ker(A-I_2)\oplus\ker(A+I_2)$ を示せ。
3. 同値を除けば $D(s)=I_2$、$\operatorname{diag}(1,-1)$、$D(s)=-I_2$ の3種類しかないことを示せ。
4. 第5節の $D(1)=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ をこの $C_2$ の生成元の像として採用できないことを説明せよ。

<!-- solution-start -->
**詳細解答。** (1) $s^2=e$ なので表現条件から $A^2=D(s^2)=D(e)=I_2$ です。したがって
$$
P_+^2=\tfrac14(I_2+2A+A^2)=\tfrac12(I_2+A)=P_+,
$$
$$
P_-^2=\tfrac14(I_2-2A+A^2)=P_-,
\qquad
P_+P_-=\tfrac14(I_2-A^2)=0,
$$
かつ $P_++P_-=I_2$ です。

(2) $AP_+=\tfrac12(A+A^2)=P_+$ なので $\operatorname{im}P_+\subseteq\ker(A-I_2)$ です。逆に $Av=v$ なら $P_+v=(v+Av)/2=v$ なので両者は一致します。同様に $\operatorname{im}P_-=\ker(A+I_2)$ です。任意の $v$ は $v=P_+v+P_-v$ と分けられます。また $w$ が両像に入るなら $Aw=w$ と $Aw=-w$ の両方を満たすので $2w=0$、複素数体上では $w=0$ です。ゆえに直和です。

(3) $d_+=\dim\ker(A-I_2)$、$d_-=\dim\ker(A+I_2)$ と置くと、(2) から $d_++d_-=2$ です。可能性は $(2,0),(1,1),(0,2)$ の3通りです。各固有空間の基底を合わせて $V$ の基底を作れば、その基底で $A$ はそれぞれ $I_2$、$\operatorname{diag}(1,-1)$、$-I_2$ となります。逆に同値な表現では $A$ が相似なので、それぞれの固有空間の次元は変わりません。3種類は相互に非同値です。

(4) $N=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ とすると
$$
N^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}\ne I_2
$$
です。$C_2$ の生成元は $s^2=e$ を満たすので、その像は $A^2=I_2$ が必要です。従って $N$ は許されません。この対比は、群の関係式が直和分解に及ぼす効果を示しています。
<!-- solution-end -->

## 9. まとめと次講への問い

線形表現は群から可逆線形変換への準同型であり、同じことをベクトル空間上の線形群作用として表せます。不変部分空間へ制限すれば部分表現となり、真の非零不変部分空間を持たない表現が既約です。絡作用素は二つの群作用と可換する線形写像で、そのうち可逆なものが表現の同値を与えます。

ただし第5節で確認したように、可約な表現が必ず既約表現の直和に分解できるとは限りません。**どのような群と表現なら、不変部分空間の補空間まで不変に選べるのでしょうか。** 次の LREP2 では Schur の補題とコンパクト群の平均化を用いて、この問いに答えます。
