# MFL36 E(3) / SE(3)とchirality

<!-- acronym-first-use-ignore: SE -->

<!-- definition-example-audit: strict -->

## 1. 距離が同じでも、右手と左手は同じか

[MFL34の距離・角度の変換則](../MFL34/index.md#thm-mfl34-transform-law)と[MFL35の等変座標更新](../MFL35/index.md#thm-mfl35-en-equivariance)は、平行移動、回転だけでなく**鏡映**にも対応した。これは座標系を取り替えても、同じ予測を得たいときに便利である。

しかし、右手と左手のように鏡に映すと重ならない形を区別したい課題では、鏡映まで不変とするのは強すぎる。三次元では、三本の方向の並びが右手系か左手系かという情報を、距離だけでは取り出せない。

1. 鏡映を含む $E(3)$ と向きを保つ $SE(3)$ を区別する。
2. 内積、ベクトル積、符号付き体積の変換則を定義から計算する。
3. 距離だけの模型の限界を示し、どんな特徴を足すと鏡像を区別できるかを確かめる。

本章はラベルを持つ有限点配置を扱う。分子の立体化学の全分類や一般の $SO(3)$ 表現論を前提にはしない。

## 2. 許す空間変換を宣言する

まず [MFL34の剛体運動](../MFL34/index.md#def-mfl34-geometric-graph)を三次元に制限する。$Q$ は直交行列、$t$ は三次元の平行移動ベクトルとする。したがって

$$
Q\in\mathbb R^{3\times3},\qquad Q^{\mathsf T}Q=I_3,\qquad t\in\mathbb R^3.
$$

[LA3Cの行列式の乗法性](../../../基礎科目/LA/LA3C/index.md#thm-la3c-det-multiplicative)を直交性の等式に適用すると

$$
(\det Q)^2=\det(Q^{\mathsf T}Q)=\det I_3=1
$$

となり、直交行列の行列式は $1$ または $-1$ である。

<a id="def-mfl36-e3-se3"></a>

<!-- formal-statement-start -->
> **定義（三次元Euclid群と特殊Euclid群）**
>
> [MFL34で導入した行列集合](../MFL34/index.md#def-mfl34-geometric-graph)を三次元に制限し、次の $O(3)$ と $SO(3)$ を用いる。

$$
O(3)=\{Q\in\mathbb R^{3\times3}:Q^{\mathsf T}Q=I_3\},\qquad
SO(3)=\{Q\in O(3):\det Q=1\}.
$$

> 三次元Euclid群 $E(3)$ と特殊Euclid群 $SE(3)$ はそれぞれ

$$
E(3)=\{(Q,t):Q\in O(3),\ t\in\mathbb R^3\},
\qquad
SE(3)=\{(Q,t):Q\in SO(3),\ t\in\mathbb R^3\}
$$

> であり、$x\mapsto Qx+t$ と作用し、合成を

$$
(Q_2,t_2)(Q_1,t_1)=(Q_2Q_1,Q_2t_1+t_2)
$$

> とする。$\det Q=-1$ の空間運動は向きを反転するので $E(3)$ には属するが $SE(3)$ には属さない。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl36-e3-se3 -->
**定義の確認**。$R(u,v,w)=(-v,u,w)$ は $z$ 軸回りの90度回転で、

$$
R=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix},
\quad R^{\mathsf T}R=I_3,\quad \det R=1.
$$

一方 $S(u,v,w)=(-u,v,w)$ は $yz$ 平面に関する鏡映で、

$$
S=\operatorname{diag}(-1,1,1),\quad S^{\mathsf T}S=I_3,\quad \det S=-1.
$$

したがって $(R,(1,2,0))\in SE(3)$ だが $(S,0)\notin SE(3)$、$(S,0)\in E(3)$ である。合成の式は $Q_2(Q_1x+t_1)+t_2$ を展開して得る。$Q_2Q_1$ は直交行列、行列式は積なので $SE(3)$ での合成も閉じる。逆元は $(Q^{\mathsf T},-Q^{\mathsf T}t)$、単位元は $(I_3,0)$ である。
<!-- definition-example-end -->

**同じ点の位置を変える**ことと**頂点のラベルを付け替える**ことは別である。以下の符号付き量ではどの頂点を第1、第2、第3、第4として選ぶかも意味を持つ。

## 3. ベクトル積だけに余分な符号が現れる

内積 $u\cdot v=u^{\mathsf T}v$ は長さ・角度を測る。ここで扱う**三次元ベクトル積（cross product）** $u\times v$ は、標準的な右手系座標で定義されるベクトルであり、交代形式を作る一般次元の積とは型が異なる。ベクトル積の成分を

$$
u\times v=(u_2v_3-u_3v_2,\ u_3v_1-u_1v_3,\ u_1v_2-u_2v_1).
$$

この向きの選択が重要である。ベクトル積の基本恒等式

$$
w\cdot(u\times v)=\det[w\ u\ v]=\det[u\ v\ w]
$$

は、右辺の三列を順に並べた行列式を成分展開して確かめられる。三つ組の並びを一つ巡回させても行列式の符号は変わらない。

<a id="thm-mfl36-dot-cross-triple"></a>

<!-- formal-statement-start -->
> **定理（内積・ベクトル積・混合積の変換則）**
>
> 任意の $u,v,w\in\mathbb R^3$ と $Q\in O(3)$ について、次の3式が成り立つ。ここで $\det[u\ v\ w]$ は三列を持つ行列の行列式である。

$$
(Qu)\cdot(Qv)=u\cdot v,
$$

$$
(Qu)\times(Qv)=(\det Q)\,Q(u\times v),
$$

$$
\det[Qu\ Qv\ Qw]=(\det Q)\det[u\ v\ w].
$$

> 特に $Q\in SO(3)$ のときベクトル積は通常のベクトルと同じように変換し、$\det Q=-1$ のときは追加の負号が付く。
<!-- formal-statement-end -->

**証明の見取り図。** 内積には $Q^{\mathsf T}Q=I_3$、三列の行列式には積の行列式を使う。ベクトル積の変換後のベクトルを求めるには、任意のベクトルとの内積を測り、ベクトル積と行列式の関係を使う。これで三成分がすべて一致すると分かる。

<!-- proof-start -->
### 証明

内積は $(Qu)^{\mathsf T}(Qv)=u^{\mathsf T}Q^{\mathsf T}Qv=u^{\mathsf T}v$。三列をまとめれば

$$
[Qu\ Qv\ Qw]=Q[u\ v\ w],
$$

$$
\det[Qu\ Qv\ Qw]=\det Q\det[u\ v\ w].
$$

ベクトル積について $z=(Qu)\times(Qv)$ とする。任意の $a\in\mathbb R^3$ は直交行列の全射性から $a=Qw$ と書ける。そのとき

$$
\begin{aligned}
a\cdot z
&=(Qw)\cdot((Qu)\times(Qv))\\
&=\det[Qu\ Qv\ Qw]\\
&=(\det Q)\det[u\ v\ w]\\
&=(\det Q)\,w\cdot(u\times v)\\
&=a\cdot((\det Q)Q(u\times v)).
\end{aligned}
$$

任意の $a$ との内積が一致する二つのベクトルは等しい。実際、その差自身を $a$ に取ると差の長さ二乗が0となる。これでベクトル積の公式も示せた。□
<!-- proof-end -->

### 例：右手系の基底を鏡映すると

$e_1=(1,0,0)$、$e_2=(0,1,0)$、$e_3=(0,0,1)$ とおく。先ほどの鏡映 $S$ では

$$
(Se_1)\times(Se_2)=(-e_1)\times e_2=-e_3,
$$

一方 $S(e_1\times e_2)=Se_3=e_3$ であり、$(-1)Se_3=-e_3$ が正しい公式である。回転 $R$ なら $Re_1=e_2,\ Re_2=-e_1$ なので $e_2\times(-e_1)=e_3=R e_3$ となる。

## 4. 四点の向きで鏡像を見る

三次元の点 $x_0,x_1,x_2,x_3$ をこの**順序で**指定する。第0点から出る相対ベクトルを

$$
a=x_1-x_0,\quad b=x_2-x_0,\quad c=x_3-x_0
$$

とする。$a,b,c$ が一次独立、すなわち $\det[a\ b\ c]\ne0$ なら四点は同じ平面上にない。体積の大きさは $|\det[a\ b\ c]|/6$ だが、向きの情報を残すため絶対値を外す。

<a id="def-mfl36-signed-volume"></a>

<!-- formal-statement-start -->
> **定義（符号付き四面体体積とchirality）**
>
> ラベル付き四点 $(x_0,x_1,x_2,x_3)\in(\mathbb R^3)^4$ に対する符号付き体積を

$$
V(x_0,x_1,x_2,x_3)=\frac16\det[x_1-x_0\ \ x_2-x_0\ \ x_3-x_0]
$$

> とする。$V\ne0$ の配置と、それを $\det Q=-1$ の剛体運動で写した**ラベル順を保つ**配置は、$E(3)$ では合同だが $SE(3)$ では合同でない。この意味で鏡像を区別できる性質をここではchirality（鏡像異性）と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl36-signed-volume -->
**定義の確認**。四点 $X=(0,e_1,e_2,e_3)$ は

$$
6V(X)=\det[e_1\ e_2\ e_3]=1,\qquad V(X)=1/6.
$$

鏡映 $S=\operatorname{diag}(-1,1,1)$ で $X^\star=(0,-e_1,e_2,e_3)$ とすれば $6V(X^\star)=-1$。すべての相対距離は $Q^{\mathsf T}Q=I_3$ によって保たれ、原点からの三距離は1、残る三距離は $\sqrt2$ のままである。$SE(3)$ 変換なら[混合積の定理](#thm-mfl36-dot-cross-triple)によって $V$ が保存されるため、この二配置はラベルを固定したままでは $SE(3)$ 合同ではない。
<!-- definition-example-end -->

**注意：ラベルの交換は鏡映ではない。** たとえば $x_1$ と $x_2$ のラベルを交換すると行列の第1列と第2列が入れ替わり $V$ は負になる。物理的な点の集合自体は動いていない。ラベル無し点群で符号付き量を使いたいなら、原子種や結合方向などから一貫した順序を選ぶか、置換に対する変換を別途設計する必要がある。任意のラベル無し点群が $V$ だけで識別されるとは主張しない。

### 六つの距離に、符号を一つ加える

距離が等しいことだけなら[MFL34の全対距離による合同判定](../MFL34/index.md#thm-mfl34-distance-congruence)が扱った。非共面四点では「$E(3)$ 合同までは距離で足りるが、$SE(3)$ 合同かどうかには符号が必要」という形に強められる。

<a id="thm-mfl36-oriented-rigidity"></a>

<!-- formal-statement-start -->
> **定理（非共面四点の距離と向きによる合同判定）**
>
> ラベル付き非共面四点 $X$、$Y$ はそれぞれ次の順序を持つものとする。

$$
X=(x_0,x_1,x_2,x_3),\qquad Y=(y_0,y_1,y_2,y_3)\in(\mathbb R^3)^4.
$$

> 全6組の対応する距離が等しいなら、$X$ を $Y$ へ写す $E(3)$ の運動が存在する。さらに次は同値である。
>
> **（1）** $Y$ へ $X$ を写す $SE(3)$ の運動が存在する。
>
> **（2）** 両方の符号付き体積の符号が等しい。
<!-- formal-statement-end -->

**証明の見取り図。** 相対ベクトルを三列に並べて $A,B$ を作る。距離の二乗の差から $A^{\mathsf T}A=B^{\mathsf T}B$ を得る。非共面性より $A$ は可逆なので $Q=BA^{-1}$ を作ると直交性が出る。$Q$ の行列式の符号は $\det B/\det A$ で決まる。

<!-- proof-start -->
### 証明

$a_i=x_i-x_0$、$b_i=y_i-y_0$（$i=1,2,3$）とし、$A=[a_1\ a_2\ a_3]$、$B=[b_1\ b_2\ b_3]$ と置く。対応する距離の一致から $\|a_i\|=\|b_i\|$、$\|a_i-a_j\|=\|b_i-b_j\|$。ここで

$$
2a_i\cdot a_j=\|a_i\|^2+\|a_j\|^2-\|a_i-a_j\|^2
$$

に三種類の等しい距離を代入すれば $a_i\cdot a_j=b_i\cdot b_j$ となる。ゆえに $A^{\mathsf T}A=B^{\mathsf T}B$。両配置は非共面なので $\det A\ne0$ と $\det B\ne0$。$Q=BA^{-1}$ とおくと

$$
\begin{aligned}
Q^{\mathsf T}Q
&=(A^{-1})^{\mathsf T}B^{\mathsf T}BA^{-1}\\
&=(A^{-1})^{\mathsf T}A^{\mathsf T}AA^{-1}=I_3.
\end{aligned}
$$

したがって $Q\in O(3)$。$t=y_0-Qx_0$ と選べば、$i=1,2,3$ に対して

$$
Qx_i+t=Q(x_i-x_0)+y_0=Qa_i+y_0=b_i+y_0=y_i
$$

であり $i=0$ についても成り立つ。さらに

$$
\det Q=\frac{\det B}{\det A}
=\frac{V(Y)}{V(X)}.
$$

直交性からこの比は $\pm1$ であり、同符号なら1、異符号なら $-1$。よって同符号と $Q\in SO(3)$ は同値である。逆方向も[本章の混合積変換則](#thm-mfl36-dot-cross-triple)を $Q\in SO(3)$ に適用すれば得られる。□
<!-- proof-end -->

この定理で「非共面」は装飾ではない。四点が共面なら $\det A=0$ で $A^{-1}$ を作れず、$V$ は両方0となって左右の区別に使えない。三次元で鏡映の向きを読むには三本の独立な相対方向が必要なのである。

## 5. 特徴はスカラーとベクトルだけではない

空間の運動に対して、値がどの規則で変わるかを**特徴型**として宣言する。同じ三成分でも異なる型を混ぜてはならない。

<a id="def-mfl36-feature-types"></a>

<!-- formal-statement-start -->
> **定義（極ベクトル・軸ベクトル・擬スカラー）**
>
> $Q\in O(3)$ に対し、平行移動で値が変わらない特徴の変換則を次のように区別する。通常スカラー $s$、極ベクトル $v$、軸ベクトル $w$、擬スカラー $p$ はそれぞれ

$$
s^\star=s,\qquad v^\star=Qv,\qquad
w^\star=(\det Q)Qw,\qquad p^\star=(\det Q)p
$$

> と変換する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl36-feature-types -->
**定義の確認**。$v=e_1$、$w=e_3$、$p=1$、$s=5$ を取り $S=\operatorname{diag}(-1,1,1)$ とする。$S^{\mathsf T}S=I_3$、$\det S=-1$ のため、

$$
v^\star=-e_1,\quad w^\star=-e_3,\quad p^\star=-1,\quad s^\star=5.
$$

ベクトル積 $e_1\times e_2=e_3$ を $w$ としたとき、反射後は $(-e_1)\times e_2=-e_3$ となり軸ベクトルの式と合う。$p=6V(0,e_1,e_2,e_3)$ も鏡映で $-1$ となる。$Q\in SO(3)$ では $\det Q=1$ なので、極・軸ベクトルは両方 $Q$ によって変換し、通常・擬スカラーはともに不変となる。
<!-- definition-example-end -->

| 特徴 | $Q\in O(3)$ に対する規則 | 具体例 |
| --- | --- | --- |
| 通常スカラー $s$ | $s^\star=s$ | 距離二乗、内積 |
| 極ベクトル $v$ | $v^\star=Qv$ | 位置の相対差 |
| 軸ベクトル $w$ | $w^\star=(\det Q)Qw$ | 二本の極ベクトルのベクトル積 |
| 擬スカラー $p$ | $p^\star=(\det Q)p$ | 三本の極ベクトルの混合積 |

異なる変換型を足す場合、結果は一般にどちらの型にもならない。例えば $v+(u\times w)$ を「一つの極ベクトル」と扱うと、鏡映で第2項だけ余分な負号を持ち、等変性が破れる。一方、擬スカラー $p$ と軸ベクトル $w$ の積は

$$
(pw)^\star=((\det Q)p)((\det Q)Qw)=Q(pw)
$$

となり、極ベクトル型を作れる。これは型を意識した構成の最も簡単な例である。

## 6. 鏡映を区別できない模型と、できる更新

[MFL35の距離メッセージ](../MFL35/index.md#def-mfl35-invariant-message)は、距離二乗と空間に依存しないスカラー特徴から作られる。鏡映しただけで入力メッセージは変わらず、その後にどれだけ共有関数を合成しても、スカラー出力へ鏡映の向きを復活させられない。

<a id="thm-mfl36-distance-no-go"></a>

<!-- formal-statement-start -->
> **定理（距離型スカラー模型の鏡像識別不能性）**
>
> 有限個のラベル付き三次元点と、剛体運動で不変の初期スカラー特徴および辺集合を考える。各層は[MFL35の座標・スカラー特徴の同時更新層](../MFL35/index.md#def-mfl35-coordinate-layer)とし、有限層後のスカラー特徴だけを不変な読出し関数に渡す。
>
> この出力は $E(3)$ 不変である。したがって点配置 $X$ と、その鏡像 $SX+t$ に対して同じ値を返す。ここで鏡像に使う直交行列 $S$ は $\det S=-1$ とする。
>
> 特に $X$ がラベル付き非共面四点を含むとき、四点の符号付き体積のように鏡映で符号が反転する非零の目的値を、両配置に対して正確に出力することはできない。
<!-- formal-statement-end -->

**証明の見取り図。** MFL35の一層等変性を初期状態から順に適用すると、座標は鏡映に追従し、スカラー特徴は常に一致する。最後の読出しは同じスカラーを受け取る。一方、符号付き体積は鏡映で反転する。

<!-- proof-start -->
### 証明

初期状態を $(x^{(0)},h^{(0)})$ とし、鏡像の状態を $(Sx^{(0)}+t,h^{(0)})$ とする。帰納的にある層の入力で

$$
x_i^{(\ell)\star}=Sx_i^{(\ell)}+t,\qquad h_i^{(\ell)\star}=h_i^{(\ell)}
$$

が成り立つとする。[MFL35の一層定理](../MFL35/index.md#thm-mfl35-en-equivariance)は鏡映を含むので、$\ell+1$ でも等式が成立する。初期状態で成り立つから有限すべての層で成り立つ。読出しは同じ $h^{(L)}$ を入力に取り、同じスカラーを返す。しかし[符号付き体積の定義](#def-mfl36-signed-volume)と[変換則](#thm-mfl36-dot-cross-triple)より $V(SX+t)=-V(X)$。$V(X)\ne0$ ならこの二値は異なるので、同じ読出し値が両方に等しいことは不可能である。□
<!-- proof-end -->

### 直感：距離で捨てた向きは後段では戻らない

鏡像対は距離だけを見る限り最初から同じデータである。以後の各層が同じスカラー情報しか渡さなければ、関数を複雑にしたり層数を増やしたりしても、その二つを異なる値へ送れない。これは学習不足ではなく、入力特徴が持つ情報の限界である。

ただし、この不可能性は**仮定した模型族に対するもの**であり、あらゆる GNN に通用する断言ではない。ベクトル積や三重積の特徴を明示的に導入し、鏡映を正しい特徴型で扱う模型、あるいは $SE(3)$ だけを要請する模型には適用できない。

具体的に三本の相対ベクトル $a,b,c$ を持つラベル付き四点の第0点で、ベクトル積を用いる座標更新を考える。$a\times b$ は軸ベクトル型だが、$SE(3)$ に限れば通常ベクトルと同じ変換になる。

<a id="prop-mfl36-se3-cross-update"></a>

<!-- formal-statement-start -->
> **命題（ベクトル積によるSE(3)等変更新と鏡映での破れ）**
>
> ラベル付き三次元四点 $X=(x_0,x_1,x_2,x_3)$、固定実数 $\lambda\ne0$ に対し、$a=x_1-x_0$、$b=x_2-x_0$ を用いて

$$
\widehat x_0=x_0+\lambda(a\times b),\qquad
\widehat x_i=x_i\quad(i=1,2,3)
$$

> とする。これはすべての $SE(3)$ 変換に対し座標等変である。一方、$\det Q=-1$ で $a\times b\ne0$ の場合、一般には $E(3)$ 等変でなく、変換してから更新した第0点と更新してから変換した第0点の差は

$$
\widehat x_0^\star-(Q\widehat x_0+t)=-2\lambda Q(a\times b)
$$

> となる。
<!-- formal-statement-end -->

**証明の見取り図。** 相対差から平行移動は消える。ベクトル積の変換則に $\det Q=1$ を代入すれば $SE(3)$ の等変性が出る。鏡映なら更新量は $-\lambda Q(a\times b)$ になり、期待する $+\lambda Q(a\times b)$ と差が残る。

<!-- proof-start -->
### 証明

$x_i^\star=Qx_i+t$ とすると $a^\star=Qa$、$b^\star=Qb$。したがって

$$
\begin{aligned}
\widehat x_0^\star
&=Qx_0+t+\lambda((Qa)\times(Qb))\\
&=Qx_0+t+\lambda(\det Q)Q(a\times b),\\
Q\widehat x_0+t&=Qx_0+t+\lambda Q(a\times b).
\end{aligned}
$$

差は $\lambda(\det Q-1)Q(a\times b)$ である。$\det Q=1$ で0、$\det Q=-1$ で $-2\lambda Q(a\times b)$ となる。他の三点は変更しないので常に座標等変である。□
<!-- proof-end -->

### 例：意図的に鏡映等変性を外す

$x_0=0,x_1=e_1,x_2=e_2$、$\lambda=1$、$S=\operatorname{diag}(-1,1,1)$ とする。元の出力は $\widehat x_0=e_3$、鏡像からの更新は $-e_3$、元の更新を鏡映すると $Se_3=e_3$。残差の大きさは2である。

ここで鏡映に等変でないことは、向きを区別する**意図した仕様**である。鏡映への等変性が必要なら、ベクトル積は軸ベクトル型として出力するか、擬スカラーとの積などで極ベクトル型へ変換する必要がある。

一方、$V(X)$ 自体は $SE(3)$ 不変の**擬スカラー読出し**なので、$X=(0,e_1,e_2,e_3)$ と鏡像に $+1/6$、$-1/6$ を返す。予測したい値が鏡映で変わるのなら、このように**タスクの対称性を先に決める**ことが重要になる。

## 7. 鏡像対の計算ラボ

付属の [chirality_lab.py](chirality_lab.py) はPython標準ライブラリのみで、非共面四点と鏡像について次を実際に計算する。

1. 対応する6距離の二乗の最大差。
2. 符号付き体積と反射後の変化。
3. ベクトル積を用いる第0点の更新について、回転・鏡映と更新の順序を交換したときの残差。

実行例：

~~~bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL36/chirality_lab.py --shape axes --transform reflect --scale 1
python3 textbook/volumes/dream_thater/応用系/MFL/MFL36/chirality_lab.py --shape skew --transform rotate --scale 0.5
python3 textbook/volumes/dream_thater/応用系/MFL/MFL36/chirality_lab.py --self-test
~~~

~~~python-file-lab
# lab-id: MFL36-CHIRALITY
# lab-title: E(3) / SE(3)の鏡像と符号付き体積
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL36/chirality_lab.py
# timeout-ms: 60000
# lab-preset: 座標軸の四面体の鏡映 | --shape axes --transform reflect --scale 1
# lab-preset: 斜めの四面体の回転 | --shape skew --transform rotate --scale 0.5
~~~

浮動小数点の残差がゼロに近いことはその入力の検算であって、任意の行列に関する定理の代わりにはならない。反射と回転をそれぞれ試し、「距離の残差が小さい」と「向きが保存される」は別の確認だと意識しよう。

## 8. 演習

### Level A：変換則と型を直接計算する

<a id="ex-mfl36-a01"></a>

### MFL36-A01 内積は鏡映で保存される

- Level: A
- 問題: $u=(1,2,0)$、$v=(2,-1,3)$、$S=\operatorname{diag}(-1,1,1)$ とする。$u\cdot v$ と $(Su)\cdot(Sv)$ を直接計算し、一般の $Q\in O(3)$ について同じ結果になる理由を述べよ。

<a id="ex-mfl36-a02"></a>

### MFL36-A02 ベクトル積の余分な符号

- Level: A
- 問題: $u=e_1+e_3$、$v=e_2$、$S=\operatorname{diag}(-1,1,1)$ とする。$u\times v$、$(Su)\times(Sv)$、$S(u\times v)$ を計算し、どの二つの量が一致しないか述べよ。

<a id="ex-mfl36-a03"></a>

### MFL36-A03 四面体の体積と距離

- Level: A
- 問題: $X=(0,2e_1,e_2,e_3)$ と鏡像 $SX$（$S=\operatorname{diag}(-1,1,1)$）について $V$ と全6組の距離二乗を求めよ。両者は $SE(3)$ 合同か。

<a id="ex-mfl36-a04"></a>

### MFL36-A04 四つの特徴型

- Level: A
- 問題: 同じ鏡映 $S$ に対し、通常スカラー $s=2$、極ベクトル $v=e_1+e_2$、軸ベクトル $w=e_3$、擬スカラー $p=-3$ の変換後の値を求めよ。$p\,w$ が極ベクトルとして変換することを数値で確かめよ。

### Level B：理由を組み立てて証明する

<a id="ex-mfl36-b01"></a>

### MFL36-B01 ベクトル積の変換を内積で再導出

- Level: B
- 問題: $Q\in O(3)$ と $u,v\in\mathbb R^3$ について、任意の $a\in\mathbb R^3$ を $a=Qw$ と書き、$a\cdot((Qu)\times(Qv))$ を計算することでベクトル積の変換則を初めから証明せよ。最後に「すべての $a$ との内積が一致する」ことからベクトルの一致を言える理由も書け。

<a id="ex-mfl36-b02"></a>

### MFL36-B02 距離から向き保存の合同写像を作る

- Level: B
- 問題: $X=(0,e_1,e_2,2e_3)$ と $Y=(t,t+Re_1,t+Re_2,t+2Re_3)$ を考える。ただし $t=(2,-1,3)$、$R(u,v,w)=(-v,u,w)$ とする。6距離が等しいことを確認し、相対ベクトルを三列とする $A,B$ から $Q=BA^{-1}$ を求め、$\det Q$ と $V(X),V(Y)$ を比較せよ。

<a id="ex-mfl36-b03"></a>

### MFL36-B03 ベクトル積座標更新の二つの残差

- Level: B
- 問題: $x_0=0,x_1=e_1,x_2=e_2,x_3=e_3$ に $\lambda=1/2$ の[ベクトル積更新](#prop-mfl36-se3-cross-update)を施す。$R(u,v,w)=(-v,u,w)$、$S=\operatorname{diag}(-1,1,1)$ として、変換後に更新した第0点と、更新後に変換した第0点をそれぞれ計算せよ。回転と鏡映の残差の大きさはいくつか。

<a id="ex-mfl36-b04"></a>

### MFL36-B04 ラベル交換と鏡映を区別する

- Level: B
- 問題: $X=(0,e_1,e_2,e_3)$ の第1点と第2点の**ラベルだけ**を交換した $X^\pi$ と、$S=\operatorname{diag}(-1,1,1)$ による鏡像 $SX$ の符号付き体積を計算せよ。どちらも負になるのに、点の移動として異なる理由を述べ、全対距離を対応するラベル順で比較すると何に注意すべきか説明せよ。

### Level C：モデルが表現できる対称性を設計する

<a id="ex-mfl36-c01"></a>

### MFL36-C01 鏡像を判定し、等変更新を設計する

- Level: C
- 問題: ラベル付き非共面四点 $X=(0,e_1,e_2,e_3)$ と $SX$（$S=\operatorname{diag}(-1,1,1)$）を考える。

  1. 距離・不変スカラー特徴だけの[MFL35型有限多層模型](../MFL35/index.md#thm-mfl35-en-equivariance)が、この二入力に異なるスカラーを返せない理由を帰納法で示せ。
  2. $p(X)=\det[x_1-x_0\ x_2-x_0\ x_3-x_0]$ を読出しとしたとき、$SE(3)$ と鏡映に対してどのように変わるか述べよ。
  3. $u=x_1-x_0$、$v=x_2-x_0$ とし、$\widehat x_0=x_0+p(X)(u\times v)$、ほかの点は変えない更新を考える。これはなぜ $E(3)$ 座標等変であるか証明し、この二入力で第0点の出力を具体的に求めよ。

## 9. 詳細解答

<!-- solution-start -->
### MFL36-A01 解答

初めに $u\cdot v=1\cdot2+2(-1)+0\cdot3=0$。鏡映後は $Su=(-1,2,0)$、$Sv=(-2,-1,3)$ なので

$$
(Su)\cdot(Sv)=(-1)(-2)+2(-1)+0\cdot3=0.
$$

任意の直交行列には $Q^{\mathsf T}Q=I_3$ が成り立つため、[内積の変換則](#thm-mfl36-dot-cross-triple)の計算を実行すると $u^{\mathsf T}Q^{\mathsf T}Qv=u^{\mathsf T}v$ となる。

### MFL36-A02 解答

右手系の基底ベクトル積 $e_1\times e_2=e_3$、$e_3\times e_2=-e_1$ から

$$
u\times v=(e_1+e_3)\times e_2=-e_1+e_3.
$$

$Su=-e_1+e_3$、$Sv=e_2$ なので

$$
(Su)\times(Sv)=(-e_1+e_3)\times e_2=-e_3-e_1,
$$

$$
S(u\times v)=S(-e_1+e_3)=e_1+e_3.
$$

両者は一致せず、$\det S=-1$ を掛けた $-S(u\times v)=-e_1-e_3$ がベクトル積の正しい変換後の値になる。

### MFL36-A03 解答

相対ベクトルを列に並べると $[2e_1\ e_2\ e_3]=\operatorname{diag}(2,1,1)$。したがって

$$
V(X)=\frac16\det\operatorname{diag}(2,1,1)=\frac13,
\quad V(SX)=(\det S)V(X)=-\frac13.
$$

点0から他の点への距離二乗は順に $4,1,1$、残る三組は

$$
\|2e_1-e_2\|^2=5,\quad
\|2e_1-e_3\|^2=5,\quad
\|e_2-e_3\|^2=2.
$$

$S^{\mathsf T}S=I_3$ だから鏡像でも同じ6値である。両四点は非共面で、符号が違う。ゆえに[向き保存合同判定](#thm-mfl36-oriented-rigidity)から $SE(3)$ 合同ではない。

### MFL36-A04 解答

通常スカラーは $s^\star=2$。極ベクトルについて $Sv=-e_1+e_2$。軸ベクトルは $(\det S)Sw=-e_3$、擬スカラーは $(\det S)p=3$。積の変換前は $pw=-3e_3$、変換後は $p^\star w^\star=3(-e_3)=-3e_3$。一方 $S(pw)=S(-3e_3)=-3e_3$。したがって[特徴型の定義](#def-mfl36-feature-types)どおり極ベクトルの変換則を満たす。

### MFL36-B01 解答

$Q^{\mathsf T}Q=I_3$ より逆行列は $Q^{\mathsf T}$。任意の $a$ に対し $w=Q^{\mathsf T}a$ と選べば $a=Qw$ となる。第3節で成分展開した $w\cdot(u\times v)=\det[u\ v\ w]$ を使うと

$$
\begin{aligned}
a\cdot((Qu)\times(Qv))
&=\det[Qu\ Qv\ a]\\
&=\det(Q[u\ v\ w])\\
&=(\det Q)\det[u\ v\ w]\\
&=(\det Q)\,w\cdot(u\times v).
\end{aligned}
$$

内積が直交変換で保存されるため、最後の項は

$$
(\det Q)(Qw)\cdot Q(u\times v)
=a\cdot((\det Q)Q(u\times v))
$$

である。差 $d=(Qu)\times(Qv)-(\det Q)Q(u\times v)$ とおけばすべての $a$ に $a\cdot d=0$、特に $a=d$ で $\|d\|^2=0$。実ベクトルの長さが0なら $d=0$ なので、公式が得られる。

### MFL36-B02 解答

$A=[e_1\ e_2\ 2e_3]=\operatorname{diag}(1,1,2)$。$R$ は直交行列なので、$Y$ の対応する相対ベクトル $b_i=Ra_i$ の長さと互いの差の長さはすべて $X$ に等しい。直接値は点0からの三組が $1,1,4$、残りが $2,5,5$ である。

$B=RA$ だから $Q=BA^{-1}=RAA^{-1}=R$。具体的に

$$
Q=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix},
\qquad \det Q=1.
$$

$\det A=2$ で、$\det B=(\det R)\det A=2$。よって

$$
V(X)=\frac{\det A}{6}=\frac13,\qquad
V(Y)=\frac{\det B}{6}=\frac13.
$$

求めた $(Q,t)$ は $SE(3)$ に属し、$Qx_i+t=y_i$ を全点で満たす。ここで平行移動 $t$ は差 $b_i=y_i-y_0$ を取った時点で消えている。

### MFL36-B03 解答

$a=e_1$、$b=e_2$、$a\times b=e_3$ なので、初めの更新では $\widehat x_0=e_3/2$。回転後の相対差は $Ra=e_2$、$Rb=-e_1$、ベクトル積は $e_2\times(-e_1)=e_3$。したがって

$$
\widehat x_0^R=e_3/2=R\widehat x_0,
\quad\|\widehat x_0^R-R\widehat x_0\|=0.
$$

鏡映後は $Sa=-e_1$、$Sb=e_2$、そのベクトル積は $-e_3$。一方 $Se_3=e_3$ だから

$$
\widehat x_0^S=-e_3/2,\quad S\widehat x_0=e_3/2,
\quad\|\widehat x_0^S-S\widehat x_0\|=\|-e_3\|=1.
$$

これは[ベクトル積更新命題](#prop-mfl36-se3-cross-update)の $-2\lambda S(e_3)=-e_3$ とも一致する。平行移動は相対差で消えるのでいずれの残差にも寄与しない。

### MFL36-B04 解答

元は $V(X)=1/6$。第1点と第2点を交換すると三列のうち最初の二列を交換するため

$$
V(X^\pi)=\frac16\det[e_2\ e_1\ e_3]=-\frac16.
$$

鏡映でも $\det S=-1$ によって $V(SX)=-1/6$。しかしラベル交換では空間中の四点の**集合は同じ**で、各座標に $S$ を作用させていない。対応する番号を固定して比較すると、交換後には例えばラベル1と2の点0への距離の割当てが入れ替わる。今回の両距離は偶然ともに1なのでこの一対では見えないが、一般の不等長の場合には対応行列の各行・列を同じ置換で入れ替えなければならない。符号だけで無ラベル点集合の鏡像を主張してはいけない。

### MFL36-C01 解答

1. 両入力を $x_i^\star=Sx_i$、$h_i^\star=h_i$ と書く。第0層ではこの関係が成立する。第 $\ell$ 層で成立すると仮定すると、相対差の距離二乗は $\|S(x_j-x_i)\|^2=\|x_j-x_i\|^2$ なので、共有メッセージと係数は同一である。[一層の等変性](../MFL35/index.md#thm-mfl35-en-equivariance)により次層の座標は $S$ に追従し、スカラー特徴は一致する。帰納法で全層のスカラー特徴が一致するため、同じスカラー読出しに異なる値を返させることはできない。
2. 元の三列は $I_3$ なので $p(X)=1$。$S$ を掛けた三列の行列式は $\det S=-1$ だから $p(SX)=-1$。任意の $(Q,t)\in SE(3)$ では差の平行移動が消え、$\det Q=1$ のため $p(QX+t)=p(X)$ である。鏡映では $p(SX+t)=-p(X)$。これは通常スカラーでなく[擬スカラー](#def-mfl36-feature-types)の変換である。
3. [混合積の変換則](#thm-mfl36-dot-cross-triple)から $p^\star=(\det Q)p$、ベクトル積の変換則から $(Qu)\times(Qv)=(\det Q)Q(u\times v)$。積を取れば

$$
\begin{aligned}
p^\star((Qu)\times(Qv))
&=(\det Q)^2pQ(u\times v)\\
&=Q(p(u\times v)).
\end{aligned}
$$

したがって

$$
\widehat x_0^\star=Qx_0+t+Q(p(u\times v))
=Q\widehat x_0+t
$$

となり、鏡映を含む $E(3)$ 座標等変である。元の入力では $p=1,u=e_1,v=e_2$ なので $\widehat x_0=e_3$。鏡像入力では $p^\star=-1,u^\star=-e_1,v^\star=e_2$ なので

$$
\widehat x_0^\star=0+(-1)((-e_1)\times e_2)=e_3=Se_3.
$$

ほかの点は単に入力座標を保つので同じ変換則を満たす。**鏡像を読出しで識別すること**と、**出力座標が鏡映に追従すること**は矛盾しない。異なる出力型に対して別の変換則を要求しているためである。
<!-- solution-end -->

## 10. 次の講義へ

距離・内積は $O(3)$ 不変、ベクトル積は軸ベクトル、符号付き体積は擬スカラーになる。鏡像を識別するスカラー課題では $E(3)$ 不変性を要求できないが、$SE(3)$ 不変性なら保てる。一方、特徴の型を明示すれば $E(3)$ 等変の表現にも向きの情報を保持できる。

MFL37では、低階のベクトル・テンソル特徴をどう組み合わせ、学習可能な線形層・非線形層を設計するかを扱う。
