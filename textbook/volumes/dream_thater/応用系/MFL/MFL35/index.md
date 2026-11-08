# MFL35 E(n)等変GNNと座標更新

<!-- definition-example-audit: strict -->

## 1. 座標を更新しても物体の向きに依存しない層

[MFL34の幾何的グラフ](../MFL34/index.md#def-mfl34-geometric-graph)では、点群を回転・平行移動・鏡映したとき距離は変わらず、相対辺ベクトルだけが回ると学んだ。今度は、近傍から情報を集めて**頂点の座標そのもの**を動かしたい。物体全体を右に3だけ動かしてから更新する操作と、更新してから右に3だけ動かす操作は一致してほしい。回転や鏡映でも同じである。これは既習の[等変写像](../MFL22/index.md#def-mfl22-equivariant)の要請である。

1. 距離から回転に依存しないスカラー重みを作る。
2. 重みを相対辺ベクトルに掛けて、座標とスカラー特徴を更新する。
3. 剛体運動・頂点番号の置換に対する変換則と多層合成を証明する。
4. 等変性だけでは重心保存や安定性を保証しないことを反例で確認する。

ここでは有限グラフ上の厳密な恒等式を証明する。関数の学習方法は既習の[message passing層](../MFL30/index.md#def-mfl30-message-passing)へ委ねる。学習後の係数がどの数値でも、以下の構造を守る限り等変性が成り立つ点が主眼である。

## 2. 座標・特徴・番号の型

$N\ge1$ 個の頂点 $V=\{1,\ldots,N\}$ と無向辺集合 $E\subseteq\{\{i,j\}:i,j\in V,\ i\ne j\}$ を固定する。空間次元と特徴次元は $n,p\ge1$ とし、頂点 $i$ の位置と特徴を

$$
x_i\in\mathbb R^n,\qquad h_i\in\mathbb R^p
$$

と置く。近傍集合は $\mathcal N(i)=\{j:\{i,j\}\in E\}$ である。「スカラー特徴ベクトル」とは、成分を複数並べても空間の回転時にその成分を回さない特徴であり、空間座標の成分とは区別する。

[MFL34の剛体運動](../MFL34/index.md#def-mfl34-geometric-graph)を本章の特徴型に拡張する。直交行列の集合を

$$
O(n)=\{Q\in\mathbb R^{n\times n}:Q^{\mathsf T}Q=I_n\}
$$

とし、$Q\in O(n)$、$t\in\mathbb R^n$ を次のように作用させる。空間変換ではスカラー特徴の各成分を固定する。

$$
x_i^\star=Qx_i+t,\qquad h_i^\star=h_i,\qquad E^\star=E.
$$

前章の[幾何的グラフの定義](../MFL34/index.md#def-mfl34-geometric-graph)と[辺の変換則](../MFL34/index.md#thm-mfl34-transform-law)は $n,N\ge2$ を仮定している。本章では $n,N\ge1$ に拡張する。

$n=1$ なら $O(1)=\{1,-1\}$ で直線の平行移動と反転を扱い、$N=1$ なら辺集合は空となる。頂点置換 $\pi$ は

$$
x_i^\pi=x_{\pi^{-1}(i)},\quad h_i^\pi=h_{\pi^{-1}(i)},\quad
E^\pi=\{\{\pi(i),\pi(j)\}:\{i,j\}\in E\}
$$

と作用する。星印は空間運動、上付き $\pi$ は番号変更を示す。

前章の[辺の変換則](../MFL34/index.md#thm-mfl34-transform-law)と同じ計算を $n\ge1$ で直接行うと、$Q^{\mathsf T}Q=I_n$ および平行移動 $t$ の相殺から

$$
\begin{aligned}
x_j^\star-x_i^\star&=(Qx_j+t)-(Qx_i+t)=Q(x_j-x_i),\\
\|x_j^\star-x_i^\star\|^2
&=(x_j-x_i)^{\mathsf T}Q^{\mathsf T}Q(x_j-x_i)=\|x_j-x_i\|^2
\end{aligned}
$$

が成り立つ。$N=1$ には辺がないので辺に関する主張は空虚に成り立つ。距離二乗から係数、相対ベクトルから更新方向を構成する理由がこれで分かる。

## 3. 不変スカラーを相対ベクトルへ掛ける

無向辺でも、$i$ から $j$ へ送るメッセージと逆向きのメッセージは異なってよい。各有向近傍組で同じ共有関数を使う。

<a id="def-mfl35-invariant-message"></a>

<!-- formal-statement-start -->
> **定義（距離に基づく不変スカラーメッセージ）**
>
> $n,p,N\ge1$ の有限グラフ $(V,E)$ と位置 $x_i\in\mathbb R^n$、スカラー特徴 $h_i\in\mathbb R^p$ に対し、全辺で共有する関数

$$
F:\mathbb R^p\times\mathbb R^p\times\mathbb R_{\ge0}\to\mathbb R^p
$$

> を選び、各 $j\in\mathcal N(i)$ に

$$
m_{ij}=F(h_i,h_j,\|x_j-x_i\|^2)
$$

> を割り当てる。$m_{ij}$ は空間変換で値が変わらないスカラー型の特徴とする。孤立頂点のメッセージ集合は空とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl35-invariant-message -->
**定義の確認**。$p=1$、$F(a,b,z)=z$ とし、全辺をもつ三角形 $x_1=(0,0)$、$x_2=(2,0)$、$x_3=(0,1)$ を使う。[距離特徴](../MFL34/index.md#def-mfl34-edge-feature)より

$$
m_{12}=m_{21}=4,\quad m_{13}=m_{31}=1,\quad m_{23}=m_{32}=5.
$$

反射 $Q=\operatorname{diag}(-1,1)$ で $x_2^\star=(-2,0)$ にしても $m_{12}^\star=(-2)^2+0^2=4$ となる。ほかの二辺も長さ二乗が1と5のままであり、各メッセージの不変性を直接確かめられる。
<!-- definition-example-end -->

係数を作る共有関数 $G:\mathbb R^p\to\mathbb R$、スカラー特徴の更新に使う共有関数 $H:\mathbb R^p\times\mathbb R^p\to\mathbb R^p$ を選ぶ。係数 $c_{ij}=G(m_{ij})$ は実数で、正でなくてもよい。座標の更新には原点に依存しない相対差を使う。

<a id="def-mfl35-coordinate-layer"></a>

<!-- formal-statement-start -->
> **定義（座標・特徴の同時更新層）**
>
> 上の有限グラフ、$F$、固定した共有関数 $G,H$ をとり、$c_{ij}=G(m_{ij})\in\mathbb R$ とする。一層の出力を

$$
\widehat x_i=x_i+\sum_{j\in\mathcal N(i)}c_{ij}(x_j-x_i),
\qquad
\widehat h_i=H\left(h_i,\sum_{j\in\mathcal N(i)}m_{ij}\right)
$$

> と定める。空和はそれぞれ $0\in\mathbb R^n$、$0\in\mathbb R^p$ とし、すべての頂点を**同じ更新前の状態から同時に**計算する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl35-coordinate-layer -->
**定義の確認**。先ほどの三角形で $h_i=0$、$F(a,b,z)=z$、$G(m)=m/10$、$H(h,M)=h+M$ とする。係数は $c_{12}=2/5$、$c_{13}=1/10$、$c_{23}=1/2$ である。したがって

$$
\begin{aligned}
\widehat x_1&=(0,0)+\frac25(2,0)+\frac1{10}(0,1)=(4/5,1/10),\\
\widehat x_2&=(2,0)+\frac25(-2,0)+\frac12(-2,1)=(1/5,1/2),\\
\widehat x_3&=(0,1)+\frac1{10}(0,-1)+\frac12(2,-1)=(1,2/5),\\
(\widehat h_1,\widehat h_2,\widehat h_3)&=(4+1,4+5,1+5)=(5,9,6).
\end{aligned}
$$

位置は $\mathbb R^2$、特徴は $\mathbb R$ のままである。孤立頂点なら $\widehat x_i=x_i$、$\widehat h_i=H(h_i,0)$ となり、次数0の除算はない。
<!-- definition-example-end -->

頂点1を更新した直後の座標で頂点2の距離を計算しては、上の同時更新式とは違う演算になる。次の層では、その時点ですべて更新済みの座標から改めて距離を作る。

## 4. 一層のE(n)等変性

空間の原点だけでなく鏡映も含むすべての直交変換に対し、座標出力が同じ運動に追従することを示す。更新量の長さが一定という主張ではなく、**更新量の方向が $Q$ に合わせて回る**という主張である。

<a id="thm-mfl35-en-equivariance"></a>

<!-- formal-statement-start -->
> **定理（座標・特徴更新層のE(n)等変性）**
>
> [座標・特徴更新層](#def-mfl35-coordinate-layer)の辺集合 $E$ は空間の剛体運動で変わらず、$h_i$ は不変スカラー型であり、共有関数 $F,G,H$ は絶対座標を別の入力に取らないとする。任意の $Q\in O(n)$、$t\in\mathbb R^n$ に対し、$(x_i,h_i)$ を $(Qx_i+t,h_i)$ へ変え、同じ層を施した出力は

$$
\widehat x_i^\star=Q\widehat x_i+t,\qquad
\widehat h_i^\star=\widehat h_i
$$

> を全頂点で満たす。$\det Q=-1$ の鏡映、孤立頂点、重複座標も含む。
<!-- formal-statement-end -->

**証明の見取り図。** [距離・相対ベクトルの変換則](../MFL34/index.md#thm-mfl34-transform-law)より $m_{ij}$ と $c_{ij}$ は不変、相対差だけに $Q$ が掛かる。座標更新式全体から $Q$ を括り出し、初期座標の平行移動 $t$ をそのまま残す。特徴側では同じスカラーの和を同じ $H$ に入力する。

<!-- proof-start -->
### 証明

固定した $i$ と各 $j\in\mathcal N(i)$ について

$$
x_j^\star-x_i^\star=(Qx_j+t)-(Qx_i+t)=Q(x_j-x_i),
$$

$$
\begin{aligned}
\|x_j^\star-x_i^\star\|^2
&=(x_j-x_i)^{\mathsf T}Q^{\mathsf T}Q(x_j-x_i)\\
&=(x_j-x_i)^{\mathsf T}(x_j-x_i)=\|x_j-x_i\|^2.
\end{aligned}
$$

$h_i^\star=h_i$、$h_j^\star=h_j$ なので同じ $F$ から $m_{ij}^\star=m_{ij}$、同じ $G$ から $c_{ij}^\star=c_{ij}$。グラフも固定で和の添字集合が一致する。ゆえに

$$
\begin{aligned}
\widehat x_i^\star
&=Qx_i+t+\sum_{j\in\mathcal N(i)}c_{ij}Q(x_j-x_i)\\
&=Q\left(x_i+\sum_{j\in\mathcal N(i)}c_{ij}(x_j-x_i)\right)+t\\
&=Q\widehat x_i+t,\\
\widehat h_i^\star
&=H\left(h_i^\star,\sum_jm_{ij}^\star\right)
=H\left(h_i,\sum_jm_{ij}\right)=\widehat h_i.
\end{aligned}
$$

空和でも同じであり、相対差が0でも除算しない。証明に $\det Q=1$ を使わないため鏡映も含む。□
<!-- proof-end -->

**鏡映での直接確認。** 三角形を $Q=\operatorname{diag}(-1,1)$、$t=(3,-2)$ で動かすと入力は $(3,-2),(1,-2),(3,-1)$。重み $2/5,1/10$ を使って

$$
\widehat x_1^\star=(3,-2)+\frac25(-2,0)+\frac1{10}(0,1)
=(11/5,-19/10).
$$

元の $\widehat x_1=(4/5,1/10)$ に $Q$ と $t$ を作用させても同じ値である。回転だけの計算では、鏡映も含めた定理の確認にはならない。

## 5. 番号の付け替えと有限多層

[MFL30の再ラベル作用](../MFL30/index.md#def-mfl30-graph-relabeling)に従い、辺と頂点特徴を一緒に付け替える。座標だけを並べ替えて辺を放置したものは一般に同じグラフの付け替えではない。

<a id="thm-mfl35-permutation-depth"></a>

<!-- formal-statement-start -->
> **定理（置換等変性と有限多層のE(n)等変性）**
>
> [第3節の層](#def-mfl35-coordinate-layer)に対し、頂点置換 $\pi$ とともに $E,x,h$ を第2節の規則で付け替えると、全頂点で

$$
\widehat x_i^\pi=\widehat x_{\pi^{-1}(i)},\qquad
\widehat h_i^\pi=\widehat h_{\pi^{-1}(i)}
$$

> が成立する。各層が[一層の定理](#thm-mfl35-en-equivariance)の仮定を満たし、座標とスカラー特徴の型を保つなら、有限個の層の合成もE(n)と頂点置換の両方に等変である。層ごとの $F,G,H$ は違ってよいが、一層内部では共有する。
<!-- formal-statement-end -->

**証明の見取り図。** 新しい番号 $i$ を古い $u=\pi^{-1}(i)$ に戻し、近傍の番号 $j=\pi(v)$ で和を取り直す。多層では各層の出力を次層の入力とし、一層の結果を帰納的に適用する。

<!-- proof-start -->
### 証明

$u=\pi^{-1}(i)$ とする。辺を再ラベルしたので $\mathcal N^\pi(i)=\{\pi(v):v\in\mathcal N(u)\}$。$j=\pi(v)$ とおけば

$$
x_j^\pi-x_i^\pi=x_v-x_u,\quad
\|x_j^\pi-x_i^\pi\|^2=\|x_v-x_u\|^2,\quad
h_i^\pi=h_u,\ h_j^\pi=h_v.
$$

よって $m_{ij}^\pi=m_{uv}$、$c_{ij}^\pi=c_{uv}$。有限和を $j$ から $v$ へ変数変更すると

$$
\begin{aligned}
\widehat x_i^\pi&=x_u+\sum_{v\in\mathcal N(u)}c_{uv}(x_v-x_u)=\widehat x_u,\\
\widehat h_i^\pi&=H\left(h_u,\sum_{v\in\mathcal N(u)}m_{uv}\right)=\widehat h_u.
\end{aligned}
$$

合成について、層0の入力は所定の空間運動・置換の変換則を満たす。層 $\ell$ の出力が同じ変換則を満たすと仮定すれば、その出力を入力とする層 $\ell+1$ に[一層の定理](#thm-mfl35-en-equivariance)と今示した置換則を適用できる。したがって有限層数への帰納法で結論を得る。□
<!-- proof-end -->

三角形で $\pi=(1\ 2)$ とすれば

$$
\widehat x^\pi=((1/5,1/2),(4/5,1/10),(1,2/5)),\qquad
\widehat h^\pi=(9,5,6).
$$

距離閾値 $d_{ij}^2\le r^2$ だけで毎層辺を作り直す場合も、同距離の候補を公平に扱えば辺が両変換に追従するため同じ議論ができる。一方、同距離の候補を頂点番号の大小で選別すれば置換で辺が追従しない場合がある。

## 6. 等変性と重心・凸包の違い

第4節では $c_{ij}$ の符号や大きさを制限しなかった。等変だからといって、重心が保存される、点が互いに近づく、更新が発散しないとは限らない。ここでの「凸結合」は[OPT1の定義](../../OPT/OPT1/index.md#def-opt1-convex-combination)にある非負係数・係数和1の点の組合せであり、「凸包」は[有限集合の凸包の命題](../../OPT/OPT1/index.md#prop-opt1-finite-convex-hull)で特徴づけられるその全体を指す。

<a id="prop-mfl35-centroid-hull"></a>

<!-- formal-statement-start -->
> **命題（対称重みの重心保存と非負重みの凸包保持）**
>
> [第3節の層](#def-mfl35-coordinate-layer)について次が成立する。
>
> **（1）** すべての無向辺で $c_{ij}=c_{ji}$ なら、全座標の和は保存される。

$$
\sum_{i=1}^N\widehat x_i=\sum_{i=1}^Nx_i.
$$

> **（2）** 各頂点で $c_{ij}\ge0$、$\sum_{j\in\mathcal N(i)}c_{ij}\le1$ なら、$\widehat x_i$ は自身と近傍の更新前座標の凸結合である。全出力は入力点群の凸包に含まれる。
<!-- formal-statement-end -->

**証明の見取り図。** （1）は一つの無向辺について双方向の更新量が相殺する。（2）は自分の座標の係数を括って $1-\sum_j c_{ij}$ と書く。

<!-- proof-start -->
### 証明

（1）有限和を辺ごとにまとめると

$$
\begin{aligned}
\sum_i(\widehat x_i-x_i)
&=\sum_i\sum_{j\in\mathcal N(i)}c_{ij}(x_j-x_i)\\
&=\sum_{\{i,j\}\in E}
\{c_{ij}(x_j-x_i)+c_{ji}(x_i-x_j)\}\\
&=\sum_{\{i,j\}\in E}(c_{ij}-c_{ji})(x_j-x_i)=0.
\end{aligned}
$$

（2）各座標の更新式を

$$
\widehat x_i=\left(1-\sum_{j\in\mathcal N(i)}c_{ij}\right)x_i+
\sum_{j\in\mathcal N(i)}c_{ij}x_j
$$

と書けば、仮定よりすべての係数が非負で、係数の総和は1である。[有限凸包の表示](../../OPT/OPT1/index.md#prop-opt1-finite-convex-hull)において $S=\{x_1,\ldots,x_N\}$ とすれば、右辺はその凸包に属する。□
<!-- proof-end -->

三角形では係数和が順に $1/2,9/10,3/5$ と1以下で、$c_{ij}=c_{ji}$ でもある。実際、

$$
(4/5,1/10)+(1/5,1/2)+(1,2/5)=(2,1)=x_1+x_2+x_3.
$$

しかし $F$ が $h_i,h_j$ を非対称に使えば、$c_{ij}\ne c_{ji}$ でも[等変性定理](#thm-mfl35-en-equivariance)の仮定は満たせる。

逆に一次元の二点 $x_1=0,x_2=1$ で $c_{12}=c_{21}=2$ とすると

$$
\widehat x_1=0+2(1-0)=2,\qquad
\widehat x_2=1+2(0-1)=-1.
$$

相対差に基づく等変更新だが、入力区間 $[0,1]$ の外へ出る。

## 7. 等変性が壊れる二つの失敗例

第1座標を係数に使う $c_{ij}=(x_i)_1$ を考える。二点 $x_1=(0,0),x_2=(1,0)$ では $\widehat x_1=(0,0)$。全点を $t=(1,0)$ だけ移すと $c_{12}^\star=1$ となり、

$$
\widehat x_1^\star=(1,0)+1((2,0)-(1,0))=(2,0)
\ne\widehat x_1+t=(1,0).
$$

破れたのは[証明](#thm-mfl35-en-equivariance)の「係数が不変」という機構である。

別の例、全頂点に固定方向 $b=(1,0)$ を足す更新 $\widehat x_i=x_i+b$ は平行移動には等変だが、90度回転 $Q(u,v)=(-v,u)$ では、先に更新して回すと $Qx_i+(0,1)$、先に回して更新すると $Qx_i+(1,0)$ である。固定方向は $Q$ に追従しない。

距離だけからスカラー出力を作ると鏡映の前後でその値は同じであり、鏡像対をスカラー値で識別できない。一方、**座標出力は鏡映後に同じ位置になるのではなく、鏡映した座標へ追従する**。スカラー不変と座標等変を混同しない。鏡像識別を必要とする三次元の課題は次章で扱う。

## 8. 有限層の決定論的ラボ

付属の [equivariant_coordinate_lab.py](equivariant_coordinate_lab.py) はPython標準ライブラリだけで、平面座標 $n=2$ と一成分のスカラー特徴 $p=1$ を使い、点配置・辺・重み・層数・回転・平行移動・鏡映を変え、次の等変残差を計算する。

$$
\epsilon_x=\max_i\|\widehat x_i^\star-(Q\widehat x_i+t)\|_2,\qquad
\epsilon_h=\max_i|\widehat h_i^\star-\widehat h_i|.
$$

絶対座標に依存する係数と固定方向更新も対照層として実行し、残差を比較する。自己テストでは置換、非対称重み、孤立頂点、複数層を検査する。

~~~bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL35/equivariant_coordinate_lab.py --shape triangle --weight distance --angle 90 --shift-x 3 --shift-y -2
python3 textbook/volumes/dream_thater/応用系/MFL/MFL35/equivariant_coordinate_lab.py --shape path --weight asymmetric --reflect --layers 3
python3 textbook/volumes/dream_thater/応用系/MFL/MFL35/equivariant_coordinate_lab.py --shape square --weight uniform --layers 4 --angle 37
python3 textbook/volumes/dream_thater/応用系/MFL/MFL35/equivariant_coordinate_lab.py --self-test
~~~

~~~python-file-lab
# lab-id: MFL35-EQUIVARIANT-COORDINATE
# lab-title: E(n)等変座標更新と失敗対照
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL35/equivariant_coordinate_lab.py
# timeout-ms: 60000
# lab-preset: 三角形の回転と平行移動 | --shape triangle --weight distance --angle 90 --shift-x 3 --shift-y -2
# lab-preset: 非対称重みと鏡映 | --shape path --weight asymmetric --reflect --layers 3
# lab-preset: 正方形の多層更新 | --shape square --weight uniform --layers 4 --angle 37
~~~

残差が浮動小数点の丸め程度でも、それは有限個の入力に関する実装検算であり、任意の変換に対する数学的証明の代わりではない。

## 9. 演習

### Level A：更新式を手で計算する

<a id="ex-mfl35-a01"></a>

### MFL35-A01 三角形の同時更新

- Level: A
- 問題: 三頂点 $x_1=(0,0),x_2=(2,0),x_3=(0,1)$ の全辺三角形で、$h_i=0$、$F(a,b,z)=z$、$G(m)=m/10$、$H(h,M)=h+M$ とする。全メッセージ、係数、更新後の三座標と三特徴を求めよ。すべて更新前の点を使え。

<a id="ex-mfl35-a02"></a>

### MFL35-A02 二点と鏡映

- Level: A
- 問題: 二頂点を一本の辺で結び、$x_1=(0,0),x_2=(2,0)$、$c_{12}=c_{21}=1/4$ とする。更新後に $Q=\operatorname{diag}(-1,1)$、$t=(3,1)$ で動かした結果を求めよ。先に入力を変換して更新した結果も計算し、各頂点で一致を確かめよ。

<a id="ex-mfl35-a03"></a>

### MFL35-A03 孤立頂点

- Level: A
- 問題: 頂点3が孤立した三頂点グラフを考える。任意の共有関数 $F,G,H$ に対して $\widehat x_3,\widehat h_3$ を書け。剛体運動と置換に対する変換則がこの頂点でも成立する理由を述べよ。

<a id="ex-mfl35-a04"></a>

### MFL35-A04 凸結合の係数

- Level: A
- 問題: A01の三角形について各頂点の自己係数 $1-\sum_jc_{ij}$ を求め、全出力が入力三角形の凸包にある理由を述べよ。凸結合であるだけで重心保存を証明できるか。

### Level B：等変性と追加仮定を分ける

<a id="ex-mfl35-b01"></a>

### MFL35-B01 頂点の交換

- Level: B
- 問題: A01の入力で $\pi=(1\ 2)$ とし、座標・特徴・辺をすべて再ラベルする。新番号での $m_{12}^\pi,m_{13}^\pi$、$\widehat x_1^\pi,\widehat h_1^\pi$ を直接求め、元の第2頂点の出力と比較せよ。

<a id="ex-mfl35-b02"></a>

### MFL35-B02 等変でも重心が動く

- Level: B
- 問題: 一次元の二点 $x_1=0,x_2=1$、$h_1=1,h_2=0$ に $F(a,b,z)=a$、$G(m)=m/2$、$H(h,M)=h$ を使う。両方向の係数、更新座標、更新前後の重心を求め、E(1)等変性と矛盾しない理由を述べよ。

<a id="ex-mfl35-b03"></a>

### MFL35-B03 壊れる二種類の変換則

- Level: B
- 問題: 平面の辺 $x_1=(0,0),x_2=(1,0)$ で $c_{ij}=(x_i)_1$ とする。$t=(1,0)$ の前後で第1頂点の更新を計算し、破れる等式を示せ。また $\widehat x_i=x_i+(1,0)$ に対して90度回転 $Q(u,v)=(-v,u)$ の前後を比較し、破れる等式を示せ。

<a id="ex-mfl35-b04"></a>

### MFL35-B04 動的近傍と帰納法

- Level: B
- 問題: 毎層、異なる二頂点を $d_{ij}^2\le r^2$（$r>0$ 固定）のときに限り結び、更新後の全座標から辺を作り直す。各層で第3節の式を使えば有限回の合成がE(n)と置換に等変であることを証明せよ。同距離候補を頂点番号で一つだけ選ぶ規則なら、どこで証明が壊れるか。

### Level C：空間運動・置換・重心を統合する

<a id="ex-mfl35-c01"></a>

### MFL35-C01 座標更新・回転・再ラベル

- Level: C
- 問題: A01の三角形と層を使い、$Q(u,v)=(-v,u)$、$t=(3,-2)$、$\pi=(1\ 2)$ とする。
  1. 元の点を更新し、三座標・三特徴と座標の総和を求めよ。
  2. 入力に $(Q,t)$ を適用してから更新した三座標を求め、元の更新出力へ $(Q,t)$ を作用させた値と比較せよ。
  3. さらに座標・特徴・辺を $\pi$ で付け替えた出力を求め、総和がどうなるか確認せよ。
  4. E(2)等変性、置換等変性、重心保存のそれぞれに必要な異なる仮定を説明せよ。

## 10. 演習の詳細解答

<!-- solution-start -->

### Level A

**MFL35-A01 解答。** 辺12、13、23の距離二乗はそれぞれ4、1、5である。$F$ は距離二乗を返し、$G$ はその1/10を返すため

$$
m_{12}=m_{21}=4,\quad m_{13}=m_{31}=1,\quad m_{23}=m_{32}=5,
\qquad(c_{12},c_{13},c_{23})=(2/5,1/10,1/2).
$$

相対差を元の点から計算すると

$$
\begin{aligned}
\widehat x_1&=(0,0)+\frac25(2,0)+\frac1{10}(0,1)=(4/5,1/10),\\
\widehat x_2&=(2,0)+\frac25(-2,0)+\frac12(-2,1)=(1/5,1/2),\\
\widehat x_3&=(0,1)+\frac1{10}(0,-1)+\frac12(2,-1)=(1,2/5).
\end{aligned}
$$

$H(0,\sum_jm_{ij})=\sum_jm_{ij}$ より $\widehat h=(4+1,4+5,1+5)=(5,9,6)$ である。

**MFL35-A02 解答。** 差 $x_2-x_1=(2,0)$ を使えば

$$
\widehat x_1=(0,0)+\frac14(2,0)=(1/2,0),\quad
\widehat x_2=(2,0)+\frac14(-2,0)=(3/2,0).
$$

$Q(u,v)=(-u,v)$ なので更新後を変換すると $(5/2,1),(3/2,1)$。逆の順序では入力が $(3,1),(1,1)$ となるので

$$
\widehat x_1^\star=(3,1)+\frac14(-2,0)=(5/2,1),\quad
\widehat x_2^\star=(1,1)+\frac14(2,0)=(3/2,1).
$$

双方の頂点で一致し、$\det Q=-1$ の鏡映に対しても等変性を確かめた。

**MFL35-A03 解答。** $\mathcal N(3)=\varnothing$ だから座標側の和は $0\in\mathbb R^n$、メッセージ側の和は $0\in\mathbb R^p$。したがって

$$
\widehat x_3=x_3,\qquad \widehat h_3=H(h_3,0).
$$

運動した入力でも $\widehat x_3^\star=Qx_3+t=Q\widehat x_3+t$、$\widehat h_3^\star=H(h_3,0)=\widehat h_3$。置換では新しい孤立頂点の番号は $\pi(3)$ であり、同じ空和が残るからその出力は元の第3頂点の出力である。

**MFL35-A04 解答。** A01の隣接重み和は順に

$$
\left(\frac25+\frac1{10},\frac25+\frac12,\frac1{10}+\frac12\right)
=\left(\frac12,\frac9{10},\frac35\right).
$$

自己係数は $1/2,1/10,2/5$ で全て非負、他の重みも非負で、合計は各行1である。よって[凸包保持命題](#prop-mfl35-centroid-hull)（2）を適用できる。しかし凸結合であるだけでは重心保存は従わない。さらに両方向の $c_{ij}$ が等しいことを確かめる必要があり、この例では距離二乗だけを使っているので対称となる。

### Level B

**MFL35-B01 解答。** 新第1頂点は元の第2頂点で $x_1^\pi=(2,0)$、新第2頂点は $(0,0)$、新第3頂点は $(0,1)$。新辺12と13の距離二乗は4と5なので $m_{12}^\pi=4$、$m_{13}^\pi=5$、係数は $2/5,1/2$。よって

$$
\widehat x_1^\pi=(2,0)+\frac25(-2,0)+\frac12(-2,1)=(1/5,1/2),
\qquad\widehat h_1^\pi=4+5=9.
$$

これはA01の元の第2頂点の出力と一致する。再ラベルで辺も付け替えたため和の相手が正しく対応している。

**MFL35-B02 解答。** $F(h_i,h_j,z)=h_i$ なので $m_{12}=1$、$m_{21}=0$、したがって $c_{12}=1/2$、$c_{21}=0$。更新は

$$
\widehat x_1=0+\frac12(1-0)=\frac12,\quad
\widehat x_2=1+0(0-1)=1.
$$

重心は $(0+1)/2=1/2$ から $(1/2+1)/2=3/4$ へ変わる。[重心保存命題](#prop-mfl35-centroid-hull)（1）の対称重み条件を失ったためである。一方 $h_i$ は空間運動で不変で、$F,G,H$ も絶対座標に依存しないため[等変性定理](#thm-mfl35-en-equivariance)の仮定は満たす。

**MFL35-B03 解答。** はじめ $c_{12}=(x_1)_1=0$ で $\widehat x_1=(0,0)$。平行移動後は $x_1^\star=(1,0),x_2^\star=(2,0)$、$c_{12}^\star=1$ なので

$$
\widehat x_1^\star=(1,0)+1((2,0)-(1,0))=(2,0)
\ne \widehat x_1+t=(1,0).
$$

係数が不変ではないため平行移動等変性が破れる。固定方向の例では $x_i=(0,0)$ として、更新後の回転は $Q((0,0)+(1,0))=(0,1)$、回転後の更新は $Q(0,0)+(1,0)=(1,0)$。出力の差は $(1,-1)$ で、方向ベクトルが $Q$ に追従しないため回転等変性を失った。

**MFL35-B04 解答。** 第2節で[前章の距離不変定理](../MFL34/index.md#thm-mfl34-transform-law)の計算を $n,N\ge1$ に拡張したので、任意の異なる頂点対について $(d_{ij}^\star)^2=d_{ij}^2$ が成り立つ。したがって辺判定 $d_{ij}^2\le r^2$ は剛体運動前後で変わらず、同じ辺が存在する。置換では元の辺 $\{i,j\}$ が新しい $\{\pi(i),\pi(j)\}$ に対応する。等号でも両側で同じ判定となる。そのため各層で[一層のE(n)等変性](#thm-mfl35-en-equivariance)と[置換等変性](#thm-mfl35-permutation-depth)の仮定が満たされ、更新後に近傍を再計算しても帰納法を継続できる。

対して、同じ距離の候補 $j,k$ から番号の小さい一方だけを採ると、番号を入れ替える置換で「小さい番号」の選択が変化する。すると $\mathcal N^\pi(i)=\{\pi(v):v\in\mathcal N(\pi^{-1}(i))\}$ が破れ、置換定理の和の添字変換ができない。

### Level C

**MFL35-C01 解答。**

1. 距離二乗 $(4,1,5)$ に対しA01と同じ計算を行うと

   $$
   \widehat x=((4/5,1/10),(1/5,1/2),(1,2/5)),\quad
   \widehat h=(5,9,6).
   $$

   座標和は $(4/5+1/5+1,\ 1/10+1/2+2/5)=(2,1)$ で、入力の和 $x_1+x_2+x_3=(2,1)$ と一致する。

2. $Q(u,v)=(-v,u)$ なので運動後の入力は $x^\star=((3,-2),(3,0),(2,-2))$。距離二乗は変わらないため同じ係数で計算すると

   $$
   \begin{aligned}
   \widehat x_1^\star&=(3,-2)+\frac25(0,2)+\frac1{10}(-1,0)=(29/10,-6/5),\\
   \widehat x_2^\star&=(3,0)+\frac25(0,-2)+\frac12(-1,-2)=(5/2,-9/5),\\
   \widehat x_3^\star&=(2,-2)+\frac1{10}(1,0)+\frac12(1,2)=(13/5,-1).
   \end{aligned}
   $$

   直接 $Q\widehat x_i+t$ を計算しても順に $(29/10,-6/5),(5/2,-9/5),(13/5,-1)$ となる。特徴は不変の $(5,9,6)$ である。

3. $\pi=(1\ 2)$ に従って辺も並べ替えるので[置換定理](#thm-mfl35-permutation-depth)から

   $$
   \widehat x^{\star,\pi}=((5/2,-9/5),(29/10,-6/5),(13/5,-1)),\quad
   \widehat h^{\star,\pi}=(9,5,6).
   $$

   出力の座標和は $(5/2+29/10+13/5,\ -9/5-6/5-1)=(8,-4)$。元の重心 $(2/3,1/3)$ に剛体運動を作用させた $Q(2/3,1/3)+t=(8/3,-4/3)$ と出力の重心が一致する。置換自体は総和を変えない。

4. 空間等変性は距離から作る不変な係数と、相対差が $Q$ に追従する[定理](#thm-mfl35-en-equivariance)による。置換等変性は辺も番号に追従させ、共有関数と和の添字変更を使う[定理](#thm-mfl35-permutation-depth)による。重心保存にはさらに $c_{ij}=c_{ji}$ が要り、本例は距離二乗のみの係数なので[重心保存命題](#prop-mfl35-centroid-hull)を適用できる。三つはそれぞれ異なる主張である。
<!-- solution-end -->

## 11. 次の講義へ

距離を入力とするスカラー係数と相対ベクトルの積で、平行移動・回転・鏡映に追従する座標更新を作れた。対称重みや非負性は、重心・凸包を制御するための別の仮定である。

次のMFL36では鏡映を含む $E(3)$ と向きを保つ $SE(3)$ を分け、鏡像を区別したい課題の特徴型を考える。

参考：Satorras, Hoogeboom, Welling, *E(n) Equivariant Graph Neural Networks*（[ICML 2021 原論文](https://proceedings.mlr.press/v139/satorras21a.html)）。本章の有限層の主張は上記の仮定から直接証明した。
