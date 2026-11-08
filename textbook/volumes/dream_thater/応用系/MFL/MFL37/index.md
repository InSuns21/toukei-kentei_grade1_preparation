# MFL37 Steerableなベクトル・テンソル特徴

<!-- definition-example-audit: strict -->

## 1. 回転しても「特徴の意味」を失わない層

[MFL35の等変座標更新](../MFL35/index.md#thm-mfl35-en-equivariance)では、距離から作ったスカラーを相対位置ベクトルに掛けた。[MFL36の極ベクトル・軸ベクトル](../MFL36/index.md#def-mfl36-feature-types)では、同じ三成分でも鏡映時に変換規則が違うと学んだ。では、各点に**方向を表すベクトル**や**方向によって値の変わる二階テンソル**を持たせ、学習層の中でそれらを混ぜたい場合はどうするか。

例えば、質量 $s$ は物体を回しても同じ数値、速度 $v$ は回転に従って向きを変え、対称な方向依存量 $T$ は二つの添字がともに回る。これらを単なる長い数値配列と見なして任意の行列を掛ければ、回転前後で計算が食い違う。必要なのは、**各特徴の回転型を宣言し、その型に従う演算だけを合成する**ことである。この性質をここでは steerable（回転に追従する）と呼ぶ。

本章は原点周りの三次元回転群 $SO(3)$ と有限次元の低階特徴を扱う。位置 $x_i$ があるときは、平行移動に依存しない相対ベクトル $x_j-x_i$ を特徴の入力とする。回転と平行移動をまとめた $SE(3)$ は[MFL36の定義](../MFL36/index.md#def-mfl36-e3-se3)を用いる。一般の $SO(3)$ 表現の完全分類は仮定せず、行列計算で層を構成する。

到達目標は次の四つである。

1. スカラー・通常ベクトル・対称トレース零テンソルの回転型を直接検証する。
2. スカラーとベクトル間の線形混合の制約を証明し、テンソルにも型を保つ具体的な線形層を作る。
3. ノルムによるゲートとベクトルから作る二階行列を使い、非線形でも等変性を保つ。
4. 固定方向への成分混合や成分別活性化がどこで失敗するか計算する。

## 2. 三つの特徴型とその表現

[MFL24の群表現](../MFL24/index.md#def-mfl24-representation)は、群の積に行列の積を対応させる規則だった。$SO(3)$ は有限群ではないが、定義の二つの等式を各回転について直接確かめればよい。

以下、$Q$ は $Q^{\mathsf T}Q=I_3$、$\det Q=1$ を満たす三次元の回転行列とする。$s\in\mathbb R$ を回転で変化しないスカラー、$v\in\mathbb R^3$ を通常（極）ベクトルとする。三階以上のテンソルを導入する前に、二つの添字を持つ $3\times3$ 行列 $T$ を考える。行列の各列・行は標準直交基底 $e_1,e_2,e_3$ での成分であり、回転時には二つの添字にそれぞれ $Q$ が作用するので $T\mapsto QTQ^{\mathsf T}$ と書く。

本章の二階特徴は、$T^{\mathsf T}=T$（対称）かつ $\operatorname{tr}T=T_{11}+T_{22}+T_{33}=0$（トレース零）に限定する。一般の行列からは $\frac12(T+T^{\mathsf T})-\frac13\operatorname{tr}(T)I_3$ によりこの型を取り出せる。これで単なるスカラーの倍数 $I_3$ と区別した方向依存部分を扱える。

<a id="def-mfl37-low-rank-types"></a>

<!-- formal-statement-start -->
> **定義（SO(3)の低階特徴型）**
> $SO(3)=\{Q\in\mathbb R^{3\times3}:Q^{\mathsf T}Q=I_3,\ \det Q=1\}$ とする。次の実ベクトル空間と回転作用を定める。

$$
\begin{aligned}
V_0&=\mathbb R,&\rho_0(Q)s&=s,\\
V_1&=\mathbb R^3,&\rho_1(Q)v&=Qv,\\
V_2&=\{T\in\mathbb R^{3\times3}:T^{\mathsf T}=T,\ \operatorname{tr}T=0\},
&\rho_2(Q)T&=QTQ^{\mathsf T}.
\end{aligned}
$$

> $V_0,V_1,V_2$ の元をそれぞれ**スカラー型・ベクトル型・二階対称トレース零テンソル型**の特徴という。これらの作用が回転に追従することを、この三つの型についての steerability と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl37-low-rank-types -->
**定義の確認**。$R=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ は $R^{\mathsf T}R=I_3$、$\det R=1$ であり $z$ 軸周りの90度回転である。$s=2$、$v=e_1$、$T=\operatorname{diag}(1,-1,0)$ とすると、

$$
\rho_0(R)s=2,\qquad \rho_1(R)v=e_2,\qquad
\rho_2(R)T=\operatorname{diag}(-1,1,0).
$$

最後の式は $RT=\begin{pmatrix}0&1&0\\1&0&0\\0&0&0\end{pmatrix}$ に $R^{\mathsf T}$ を右から掛けて得る。結果も転置で不変、対角和 $-1+1+0=0$ なので、確かに $V_2$ に属する。$T$ は元から $T^{\mathsf T}=T$、$1-1+0=0$ を満たす。定義の「対称」「トレース零」の双方を検査した。
<!-- definition-example-end -->

テンソル $T$ の独立成分は対称性で6個、トレース零で1条件だから5個である。例えば $T_{11},T_{22},T_{12},T_{13},T_{23}$ を自由に決め、$T_{33}=-T_{11}-T_{22}$ とすればよい。この5個の数値を無作為に混ぜてよいわけではない。回転作用は**この5次元の空間全体**を非自明に回している。

<a id="thm-mfl37-representation"></a>

<!-- formal-statement-start -->
> **定理（低階特徴の回転表現）**
> 任意の $Q,P\in SO(3)$、$\ell\in\{0,1,2\}$、$z\in V_\ell$ に対し、$\rho_\ell(Q)z\in V_\ell$ であり、

$$
\rho_\ell(I_3)z=z,\qquad
\rho_\ell(QP)z=\rho_\ell(Q)(\rho_\ell(P)z)
$$

> が成り立つ。各 $\rho_\ell(Q)$ は可逆で、逆作用は $\rho_\ell(Q^{\mathsf T})$ である。$V_2$ は5次元の実線形空間である。
<!-- formal-statement-end -->

**証明の見取り図。** スカラーとベクトルは直ちに合成則を計算できる。テンソルでは転置とトレースの保存を確認してから、$QP$ の左右の積を結合する。

<!-- proof-start -->
### 証明

$V_0$ では $\rho_0(QP)s=s=\rho_0(Q)\rho_0(P)s$、$V_1$ では $(QP)v=Q(Pv)$ である。テンソル $T\in V_2$ に対し

$$
(QTQ^{\mathsf T})^{\mathsf T}=QT^{\mathsf T}Q^{\mathsf T}=QTQ^{\mathsf T},
$$

$$
\operatorname{tr}(QTQ^{\mathsf T})
=\operatorname{tr}(Q^{\mathsf T}QT)
=\operatorname{tr}T=0
$$

だから像は $V_2$ 内にある。ここでは $Q^{\mathsf T}Q=I_3$ とトレースの循環性を使った。合成則は

$$
\begin{aligned}
\rho_2(Q)(\rho_2(P)T)
&=Q(PTP^{\mathsf T})Q^{\mathsf T}\\
&=(QP)T(P^{\mathsf T}Q^{\mathsf T})\\
&=(QP)T(QP)^{\mathsf T}=\rho_2(QP)T.
\end{aligned}
$$

$Q=I_3$ なら元の $T$ に戻る。$Q^{\mathsf T}=Q^{-1}\in SO(3)$ を代入すると逆作用を得る。次元は上で自由に選んだ5成分による線形同型 $V_2\cong\mathbb R^5$ から従う。□
<!-- proof-end -->

スカラーを $a$ チャネル、ベクトルを $b$ チャネル、テンソルを $c$ チャネル持つときは、各型のコピーを並べた直和を入力とする。全チャネルに同じ回転 $Q$ が作用するが、型が異なれば作用行列も異なる。これは[MFL24の特徴型と直和](../MFL24/index.md#def-mfl24-feature-type)を連続回転に適用したものである。

## 3. 線形層では、混ぜてよい成分が限定される

層の重みは学習で変化してよいが、入力を回してから層を適用しても、層を適用してから出力を回しても一致しなければならない。[MFL24の線形等変性条件](../MFL24/index.md#thm-mfl24-linear-equivariance)を本章の行列に適用する。まずスカラー $a$ チャネルとベクトル $b$ チャネルだけに限定すれば、**許されるすべての線形写像**を初等計算で分類できる。

<a id="thm-mfl37-scalar-vector-linear"></a>

<!-- formal-statement-start -->
> **定理（スカラー・ベクトル間の線形等変層の分類）**
> 非負整数 $a,b,a',b'$ に対し、入力 $\mathbb R^a\oplus(\mathbb R^3)^b$ と出力 $\mathbb R^{a'}\oplus(\mathbb R^3)^{b'}$ に、$SO(3)$ が各スカラーチャネルを固定し各ベクトルチャネルへ同じ $Q$ を掛ける作用を入れる。線形写像 $L$ が任意の $Q\in SO(3)$ で等変であるための必要十分条件は、ある実行列 $A\in\mathbb R^{a'\times a}$、$B\in\mathbb R^{b'\times b}$ によって

$$
L(s,v_1,\ldots,v_b)
=\left(As,\ \left(\sum_{j=1}^{b}B_{kj}v_j\right)_{k=1}^{b'}\right)
$$

> と表せることである。空チャネルでは対応する和・行列を空として読む。特にスカラーからベクトル、ベクトルからスカラーへの非零の**線形**結合はない。
<!-- formal-statement-end -->

**証明の見取り図。** 線形写像をチャネルごとに小ブロックへ分ける。異なる型へのブロックはすべての回転で固定されるベクトルを要求し、ゼロになる。ベクトル間の $3\times3$ ブロックは座標軸の180度回転と90度回転との可換性で $cI_3$ に絞られる。

<!-- proof-start -->
### 証明

入力の1チャネルから出力の1チャネルへのブロックごとに、[線形等変性の条件](../MFL24/index.md#thm-mfl24-linear-equivariance) $L\rho_{\mathrm{in}}(Q)=\rho_{\mathrm{out}}(Q)L$ を用いる。

スカラーからスカラーへの実数倍は任意に許される。スカラーからベクトルへのブロックは $s\mapsto us$（$u\in\mathbb R^3$）なので、すべての $Q$ で $Qu=u$ が必要である。$u\ne0$ なら $u$ に垂直な軸の180度回転は $u$ を $-u$ にするから矛盾し、$u=0$ となる。ベクトルからスカラーへのブロックは $v\mapsto w^{\mathsf T}v$ である。すべての $v$ に $w^{\mathsf T}Qv=w^{\mathsf T}v$ を課せば $Q^{\mathsf T}w=w$。同じ議論で $w=0$ となる。

ベクトルからベクトルへのブロックを $C=(c_{ij})\in\mathbb R^{3\times3}$ とする。$C$ が $D_x=\operatorname{diag}(1,-1,-1)$ および $D_y=\operatorname{diag}(-1,1,-1)$ と可換である必要がある。例えば $CD_x=D_xC$ の $(i,j)$ 成分は $c_{ij}(D_x)_{jj}=(D_x)_{ii}c_{ij}$ であるから、$i=1,j=2$ や $i=2,j=1$ では $c_{ij}=0$。両方の180度回転を合わせると全非対角成分が0になり、$C=\operatorname{diag}(c_1,c_2,c_3)$ となる。

$z$ 軸周りの90度回転 $R_z$ と可換である条件を $e_1$ に適用すると

$$
CR_ze_1=Ce_2=c_2e_2,\qquad
R_zCe_1=c_1e_2
$$

なので $c_1=c_2$。$x$ 軸周りの90度回転を $e_2$ に適用すれば $c_2=c_3$。従って $C=cI_3$。逆に $cI_3$ はどの $Q$ とも可換である。ブロックを並べれば主張の $A,B$ を得る。表示された $L$ で等変性が成立するのは、$\sum_j B_{kj}Qv_j=Q\sum_j B_{kj}v_j$ から直接確認できる。□
<!-- proof-end -->

**具体例。** 二つのベクトル特徴を一つにする $F(v_1,v_2)=2v_1-v_2$ は許される。$QF(v_1,v_2)=2Qv_1-Qv_2=F(Qv_1,Qv_2)$ だからである。一方、$F(v)=\operatorname{diag}(2,1,1)v$ は $e_1$ と $e_2$ に異なる係数を掛けるため、任意の回転に追従できない。

二階テンソルもチャネル間であれば、$T'_k=\sum_j C_{kj}T_j$ と**各テンソル全体へ同じ係数**を掛ける線形層を構成できる。$Q(\sum_j C_{kj}T_j)Q^{\mathsf T}=\sum_j C_{kj}(QT_jQ^{\mathsf T})$ だからである。ただし、この構成だけから一般の全テンソル表現間の線形写像の分類まで主張してはいない。

## 4. 非線形なら型と型を接続できる

「線形ではスカラーからベクトルを作れない」は、「どんな方法でも作れない」ではない。すでにベクトル $v$ が存在すれば、回転不変のスカラー係数を掛けられる。また二つのベクトルから $v\cdot w$ を作ればスカラー、$vv^{\mathsf T}$ から対称テンソルが得られる。

具体的には $\|v\|^2=v^{\mathsf T}v$ と $\operatorname{tr}(T^2)$ が回転で不変である。さらに $Tv$ はベクトル、$vv^{\mathsf T}-\|v\|^2I_3/3$ は対称トレース零テンソルとなる。後者は「方向 $v$ に沿う成分」と「その直交方向の成分」の差を残すものである。いずれも値の型を数学的に確認してから層へ入れる。

<a id="def-mfl37-typed-gate"></a>

<!-- formal-statement-start -->
> **定義（型を守る非線形ゲート）**
> 入力 $(s,v,T)\in V_0\oplus V_1\oplus V_2$ に対し、回転不変の実数

$$
u=v^{\mathsf T}v,\qquad w=\operatorname{tr}(T^2)
$$

> を作る。任意の関数 $\varphi,\alpha,\beta,\gamma,\delta:\mathbb R\times\mathbb R_{\ge0}^2\to\mathbb R$ を選び、次の型付き写像を定める。

$$
\begin{aligned}
s'&=\varphi(s,u,w),\\
v'&=\alpha(s,u,w)v+\beta(s,u,w)Tv,\\
T'&=\gamma(s,u,w)T
+\delta(s,u,w)\left(vv^{\mathsf T}-\frac{u}{3}I_3\right).
\end{aligned}
$$

> ここで関数は連続・微分可能でなくても等変性の議論は成立するが、学習で勾配を用いる場合は別途必要な微分可能性を確認する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl37-typed-gate -->
**定義の確認**。$s=2$、$v=e_1$、$T=\operatorname{diag}(1,-1,0)$ とし、$\varphi=s$（第1引数を返す）、$\alpha=s$、$\beta=0$、$\gamma=0$、$\delta=1$ を選ぶ。$u=1$、$w=1^2+(-1)^2=2$ なので

$$
s'=2,\quad v'=2e_1,\quad
T'=\operatorname{diag}(2/3,-1/3,-1/3).
$$

$T'$ は対称で、対角和 $2/3-1/3-1/3=0$ である。$v'$ は三次元ベクトル、$s'$ は実数なので、出力の三つの型をすべて満たす。$R_ze_1=e_2$ の下では $T'$ の第1・第2対角成分が交換される。回転後の $v=e_2$ から直接同じテンソルが作られることも確認できる。
<!-- definition-example-end -->

<a id="thm-mfl37-gate-equivariance"></a>

<!-- formal-statement-start -->
> **定理（型付きゲートのSO(3)等変性）**
> $V_0,V_1,V_2$ を[低階特徴型](#def-mfl37-low-rank-types)とし、$F:V_0\oplus V_1\oplus V_2\to V_0\oplus V_1\oplus V_2$ を[型付きゲート](#def-mfl37-typed-gate)とする。すべての $Q\in SO(3)$ とすべての入力 $(s,v,T)$ に対し

$$
F(s,Qv,QTQ^{\mathsf T})
=\bigl(s',\ Qv',\ QT'Q^{\mathsf T}\bigr),
$$

> ただし $(s',v',T')=F(s,v,T)$ である。実際には、この恒等式は同じ極ベクトル型・通常の二階テンソル型を使う限り $Q\in O(3)$ でも成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 不変な係数と、変換型が分かる積 $Tv$・$vv^{\mathsf T}$ から作る。$SO(3)$ だけを検査して満足せず、使っていない行列式の符号を追えば $O(3)$ への拡張も判定できる。

<!-- proof-start -->
### 証明

$Q^{\mathsf T}Q=I_3$ を使えば、回転後の量について

$$
u^*=(Qv)^{\mathsf T}(Qv)=v^{\mathsf T}v=u,
$$

$$
\begin{aligned}
w^*&=\operatorname{tr}\bigl((QTQ^{\mathsf T})^2\bigr)\\
&=\operatorname{tr}(QTQ^{\mathsf T}QTQ^{\mathsf T})\\
&=\operatorname{tr}(QT^2Q^{\mathsf T})=\operatorname{tr}(T^2)=w.
\end{aligned}
$$

従って係数関数への三引数 $(s,u,w)$ は変換前後で同じである。ベクトル項は

$$
(QTQ^{\mathsf T})(Qv)=QT(Q^{\mathsf T}Q)v=Q(Tv)
$$

となる。テンソル項では

$$
\begin{aligned}
(Qv)(Qv)^{\mathsf T}-\frac{u^*}{3}I_3
&=Qvv^{\mathsf T}Q^{\mathsf T}-\frac{u}{3}QI_3Q^{\mathsf T}\\
&=Q\left(vv^{\mathsf T}-\frac{u}{3}I_3\right)Q^{\mathsf T}.
\end{aligned}
$$

また $vv^{\mathsf T}$ は対称、$\operatorname{tr}(vv^{\mathsf T})=\sum_i v_i^2=u$ だから $vv^{\mathsf T}-uI_3/3\in V_2$。既存の $T\in V_2$ との線形結合も $V_2$ に属する。各式へ同じ係数を掛けて加えれば、指定の等変性が得られる。どの行にも $\det Q=1$ を用いず、直交性だけを使ったので $O(3)$ でも成立する。□
<!-- proof-end -->

この計算は有限個の頂点にもそのまま使える。$v_i,T_i$ を各頂点に持たせ、辺の相対位置や特徴から作った不変スカラーを $\alpha_i,\ldots$ に使えば、頂点ごとの回転作用と可換である。ただし、ベクトルを集約するときは隣接頂点から同じ**大域座標系**で表したベクトルを足している。各頂点で別々の局所フレームを使う場合は、別途輸送を考える必要がある。

## 5. 成分別活性化と誤った混合の反例

ニューラルネットの成分ごとの ReLU（$r(z)=\max(0,z)$）は、スカラー特徴には任意の関数として使えるが、ベクトルにそのまま掛けると一般には回転に追従しない。例えば $v=e_1$ を $z$ 軸周りに180度回した $Q=\operatorname{diag}(-1,-1,1)$ では、

$$
r(Qv)=(0,0,0),\qquad Qr(v)=(-1,0,0).
$$

これらは違う。負の成分を消す操作は、空間内で優先する座標軸を密かに選んでいたのである。一方、$\alpha(\|v\|^2)v$ のように**長さだけから係数を作るゲート**は、ベクトル全体の向きを保ったまま大きさを変える。

固定行列 $W=\operatorname{diag}(2,1,1)$ も誤実装となる。$R$ を $z$ 軸周り90度回転とすると、

$$
WR e_1=We_2=e_2,\qquad
RW e_1=R(2e_1)=2e_2.
$$

差のノルムは1である。この例は[線形分類定理](#thm-mfl37-scalar-vector-linear)で許された $cI_3$ 以外の一方向への重み付けが、なぜ問題になるかを可視化する。

なお、ベクトル積は[MFL36の変換則](../MFL36/index.md#thm-mfl36-dot-cross-triple)により

$$
(Qv)\times(Qw)=\det(Q)Q(v\times w)
$$

を満たす。$SO(3)$ に制限すれば $v\times w$ はベクトル型だが、鏡映を含めると**軸ベクトル型**である。ベクトル積の結果を極ベクトルとして後段へ渡し、$E(3)$ 等変だと宣言するのは誤りである。対象の物理量が鏡映にどう応答すべきかを先に決めよう。

## 6. 低階特徴の計算ラボ

[steerable_lab.py](steerable_lab.py) は外部パッケージ不要の有限行列計算である。基準ベクトルとトレース零テンソルに回転・鏡映を作用させ、次を表示する。

1. 回転前後で低階型付きゲートを適用する順序を交換した残差（理論値は零）。
2. 成分別 ReLU と異方的固定行列の交換残差（一般には非零）。
3. テンソルの対称性・トレース零条件の残差。
4. 鏡映したベクトル積を極ベクトルとして扱った場合の残差。

~~~bash
python3 textbook/volumes/dream_thater/応用系/MFL/MFL37/steerable_lab.py --transform rotate90 --shape basic --scale 1
python3 textbook/volumes/dream_thater/応用系/MFL/MFL37/steerable_lab.py --transform reflect --shape mixed --scale 0.5
python3 textbook/volumes/dream_thater/応用系/MFL/MFL37/steerable_lab.py --self-test
~~~

~~~python-file-lab
# lab-id: MFL37-STEERABLE
# lab-title: スカラー・ベクトル・テンソルの回転型を検算
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL37/steerable_lab.py
# timeout-ms: 60000
# lab-preset: 90度回転・基本入力 | --transform rotate90 --shape basic --scale 1
# lab-preset: 鏡映・混合入力 | --transform reflect --shape mixed --scale 0.5
# lab-preset: 180度回転・ReLUの破れ | --transform rotate180 --shape basic --scale 1
~~~

有限個の行列での残差は実装の検算であり、任意の $Q$ に対する上の証明を置き換えるものではない。

## 7. 演習

### Level A：型と変換を手で判定する

<a id="ex-mfl37-a01"></a>

### MFL37-A01 テンソルの型判定

- Level: A
- 問題: $T=\begin{pmatrix}1&2&0\\2&-1&0\\0&0&0\end{pmatrix}$ が $V_2$ に属することを、条件を分けて確認せよ。$R$ を $z$ 軸周り90度回転として $RTR^{\mathsf T}$ を求め、像も $V_2$ に属することを確かめよ。

<a id="ex-mfl37-a02"></a>

### MFL37-A02 許された線形混合

- Level: A
- 問題: ベクトル型 $v_1=e_1+e_2$、$v_2=e_1-e_2$ に対して $F(v_1,v_2)=2v_1-v_2$ を計算せよ。任意の $Q\in SO(3)$ で $F(Qv_1,Qv_2)=QF(v_1,v_2)$ を示せ。

<a id="ex-mfl37-a03"></a>

### MFL37-A03 トレース零射影

- Level: A
- 問題: $v=(1,2,0)^{\mathsf T}$ から $P(v)=vv^{\mathsf T}-\|v\|^2I_3/3$ を計算し、対称性とトレース零を直接確認せよ。

<a id="ex-mfl37-a04"></a>

### MFL37-A04 成分別 ReLU の失敗

- Level: A
- 問題: $v=e_1$、$Q=\operatorname{diag}(-1,-1,1)\in SO(3)$ とし、成分別 ReLU $r$ について $r(Qv)$、$Qr(v)$ とその差のノルムを求めよ。

### Level B：構成と反例を結び付ける

<a id="ex-mfl37-b01"></a>

### MFL37-B01 ベクトルからスカラーへの非零線形写像

- Level: B
- 問題: $\ell(v)=a^{\mathsf T}v$（$a\in\mathbb R^3$）が全 $Q\in SO(3)$ で $\ell(Qv)=\ell(v)$ を満たすなら $a=0$ と証明せよ。対照として $v\mapsto\|v\|^2$ が不変で非線形であることを示せ。

<a id="ex-mfl37-b02"></a>

### MFL37-B02 二階特徴と回転の可換性

- Level: B
- 問題: $v\in\mathbb R^3$、$T\in V_2$ とし、$G(v,T)=Tv$、$H(v)=vv^{\mathsf T}-\|v\|^2I_3/3$ と置く。$G(Qv,QTQ^{\mathsf T})=QG(v,T)$、$H(Qv)=QH(v)Q^{\mathsf T}$ をすべての $Q\in O(3)$ について証明せよ。

<a id="ex-mfl37-b03"></a>

### MFL37-B03 異方的な固定重み

- Level: B
- 問題: $W=\operatorname{diag}(2,1,1)$ をベクトル型の線形層とし、$R$ を $z$ 軸周り90度回転とする。$WR e_1$ と $RW e_1$ を比較せよ。さらに、$SO(3)$ のすべての回転と可換な対角行列 $\operatorname{diag}(a,b,c)$ の条件を求めよ。

<a id="ex-mfl37-b04"></a>

### MFL37-B04 ベクトル積の型と鏡映

- Level: B
- 問題: $v=e_1+e_2$、$w=e_1-e_2$、$S=\operatorname{diag}(-1,1,1)$ とする。$(Sv)\times(Sw)$ と $S(v\times w)$ を直接求め、ベクトル積を極ベクトルと誤認したときの残差ノルムを求めよ。正しい軸ベクトル型の変換則も書け。

### Level C：一つの等変層を構成・検算する

<a id="ex-mfl37-c01"></a>

### MFL37-C01 ベクトル・テンソル結合層

- Level: C
- 問題: $s=2$、$v=e_1+e_2$、$T=\operatorname{diag}(1,-1,0)$ とし、$F(s,v,T)=(s,sv+Tv,T+vv^{\mathsf T}-\|v\|^2I_3/3)$ と定める。以下を示せ。

  1. 出力の三つの型を確認し、数値を求めよ。
  2. $R$ を $z$ 軸周り90度回転として、入力を回してから $F$ を適用した出力と、$F$ を適用してから出力を回した値を両方計算して一致を確認せよ。
  3. 同じ $v$ に対し不適切な線形層 $W=\operatorname{diag}(2,1,1)$ と成分別 ReLU を挿入した場合、全回転等変性を期待できない理由を、それぞれの反例または本章の定理で述べよ。

## 8. 詳細解答

### Level A

<!-- solution-start -->
**MFL37-A01。** $T^{\mathsf T}=T$ は $(1,2)$ と $(2,1)$ の要素がともに2で、他の非対角要素が0だから成立する。$\operatorname{tr}T=1-1+0=0$。従って $T\in V_2$。$R=\begin{pmatrix}0&-1&0\\1&0&0\\0&0&1\end{pmatrix}$ として

$$
RT=\begin{pmatrix}-2&1&0\\1&2&0\\0&0&0\end{pmatrix},\quad
RTR^{\mathsf T}=\begin{pmatrix}-1&-2&0\\-2&1&0\\0&0&0\end{pmatrix}.
$$

後者の $(1,2),(2,1)$ はともに $-2$ で対称、トレースは $-1+1+0=0$。よって $V_2$ に留まる。

**MFL37-A02。** $2(e_1+e_2)-(e_1-e_2)=e_1+3e_2$。行列の線形性から

$$
F(Qv_1,Qv_2)=2Qv_1-Qv_2
=Q(2v_1-v_2)=Q(e_1+3e_2).
$$

係数2、$-1$ は方向に依存しないため任意の回転で成り立つ。

**MFL37-A03。** $\|v\|^2=1^2+2^2=5$、$vv^{\mathsf T}=\begin{pmatrix}1&2&0\\2&4&0\\0&0&0\end{pmatrix}$ だから

$$
P(v)=\begin{pmatrix}-2/3&2&0\\2&7/3&0\\0&0&-5/3\end{pmatrix}.
$$

これは非対角成分が対称で、$(-2+7-5)/3=0$ だから $V_2$ に属する。

**MFL37-A04。** $Qv=-e_1$ なので $r(Qv)=(0,0,0)$、$r(v)=e_1$ から $Qr(v)=-e_1$。差は $e_1$、ノルムは1である。回転した後で負の第1成分が消えるのが不一致の原因。
<!-- solution-end -->

### Level B

<!-- solution-start -->
**MFL37-B01。** 仮定は任意の $v$ で $a^{\mathsf T}Qv=a^{\mathsf T}v$ なので、$Q^{\mathsf T}a=a$ を意味する。$a\ne0$ と仮定し、$a$ に直交する単位軸周りの180度回転 $Q$ を選ぶと $Q^{\mathsf T}a=-a$ で矛盾する。従って $a=0$。一方、$\|Qv\|^2=v^{\mathsf T}Q^{\mathsf T}Qv=\|v\|^2$。二次式であり、例えば $\|2e_1\|^2=4\ne2\|e_1\|^2$ なので線形ではない。

**MFL37-B02。** $Q^{\mathsf T}Q=I_3$ から

$$
G(Qv,QTQ^{\mathsf T})=(QTQ^{\mathsf T})(Qv)
=QT(Q^{\mathsf T}Q)v=QTv.
$$

また $\|Qv\|^2=\|v\|^2$ と $QI_3Q^{\mathsf T}=I_3$ を使い、

$$
\begin{aligned}
H(Qv)&=Qvv^{\mathsf T}Q^{\mathsf T}-\frac{\|v\|^2}{3}I_3\\
&=Q\left(vv^{\mathsf T}-\frac{\|v\|^2}{3}I_3\right)Q^{\mathsf T}.
\end{aligned}
$$

$\det Q$ の符号は使っておらず $O(3)$ に対しても成立する。

**MFL37-B03。** $Re_1=e_2$ より $WRe_1=e_2$、$We_1=2e_1$ より $RWe_1=2e_2$。差は $-e_2$。$D=\operatorname{diag}(a,b,c)$ が $R_z$ と可換なら $DR_ze_1=be_2$、$R_zDe_1=ae_2$ から $a=b$。$x$ 軸90度回転でも同様に $b=c$ なので $a=b=c$。逆に $D=aI_3$ は全行列と可換である。

**MFL37-B04。** $v\times w=(e_1+e_2)\times(e_1-e_2)=-2e_3$。$Sv=-e_1+e_2$、$Sw=-e_1-e_2$ であるから、ベクトル積の第3成分は $(-1)(-1)-(1)(-1)=2$、すなわち $(Sv)\times(Sw)=2e_3$。一方 $S(v\times w)=-2e_3$。差は $4e_3$、ノルム4。$\det S=-1$ を含む[ベクトル積の変換則](../MFL36/index.md#thm-mfl36-dot-cross-triple)なら $\det(S)S(v\times w)=2e_3$ となり正しく一致する。
<!-- solution-end -->

### Level C

<!-- solution-start -->
**MFL37-C01。** まず $v=e_1+e_2$、$\|v\|^2=2$、$Tv=e_1-e_2$ である。よってスカラー $s'=2$、ベクトルは

$$
v'=2(e_1+e_2)+(e_1-e_2)=3e_1+e_2.
$$

テンソルは

$$
T'=\begin{pmatrix}1&0&0\\0&-1&0\\0&0&0\end{pmatrix}
+\begin{pmatrix}1/3&1&0\\1&1/3&0\\0&0&-2/3\end{pmatrix}
=\begin{pmatrix}4/3&1&0\\1&-2/3&0\\0&0&-2/3\end{pmatrix}.
$$

$T'$ の非対角要素は対称でトレース $4/3-2/3-2/3=0$、$v'\in\mathbb R^3$ なので全型を満たす。

$R$ を指定の90度回転とする。回した入力は $Rv=-e_1+e_2$、$RTR^{\mathsf T}=\operatorname{diag}(-1,1,0)$。よって

$$
\begin{aligned}
v^*{}'&=2(-e_1+e_2)+\operatorname{diag}(-1,1,0)(-e_1+e_2)\\
&=-e_1+3e_2=Rv',
\end{aligned}
$$

$$
\begin{aligned}
T^*{}'&=\operatorname{diag}(-1,1,0)
+\begin{pmatrix}1/3&-1&0\\-1&1/3&0\\0&0&-2/3\end{pmatrix}\\
&=\begin{pmatrix}-2/3&-1&0\\-1&4/3&0\\0&0&-2/3\end{pmatrix}
=RT'R^{\mathsf T}.
\end{aligned}
$$

スカラーは2のままである。最後の $RT'R^{\mathsf T}$ は、$R$ が第1・第2軸を入れ替え、一方の符号を反転するため、対角要素を交換し非対角の $1$ を $-1$ にしたものと直接確かめられる。

誤った $W$ については $e_1$ を入力に選ぶと[第5節の計算](#thm-mfl37-scalar-vector-linear)どおり $WRe_1\ne RWe_1$ となる。成分別 ReLU は $e_1$ と180度回転を選ぶと $r(Qe_1)=0\ne Qr(e_1)$。したがって両操作とも、追加の制約なしに全 $SO(3)$ 等変層の内部へ挿入することはできない。□
<!-- solution-end -->

## 9. まとめと次への問い

- 特徴の「成分数」と「回転型」は異なる。三成分であることだけではベクトルの変換則を保証しない。
- スカラー・ベクトル間の全線形等変層では、異なる型の線形結合は消え、ベクトル同士は各三成分へ同一係数を掛けて混ぜる。
- 非線形な不変スカラー係数、$Tv$、$vv^{\mathsf T}-\|v\|^2I_3/3$ により、型を守った豊かな層を構成できる。
- 鏡映も含めたいなら、極ベクトルと軸ベクトルを区別する。成分別 ReLU と固定方向を優遇する行列は一般の回転等変ではない。

次は、これらの特徴を**曲がった多様体の各点**に置くことを考える。大域的な回転と異なり、点ごとに異なる接平面の基底を採用する場合、同じ幾何量をどう比較するかが新たな問題となる。
