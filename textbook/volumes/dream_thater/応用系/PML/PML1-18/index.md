# PML1-18 Hamiltonian NNは何を構造として固定するか

## 1. 「エネルギーを予測する」と「保存する運動を作る」の間

前講では、[学習済み Lagrangian への Noether 保存則の適用](../PML1-17/index.md#thm-pml1-17-learned-noether)により、連続対称性・運動方程式・連続軌道という条件を分けた。今回は対称性をデータから後で探す代わりに、**運動方程式の形を最初から固定する**。

位置 $q$ と共役運動量 $p$ を独立の座標とする [相空間](../../../物理系/AMECH/AMECH5/index.md#def-amech5-phase-space)で、一般のニューラルネットが速度 $(\dot q,\dot p)$ を直接出力すれば、予測した運動がどのエネルギーを保存するかは分からない。そこで一つのスカラー関数 $H_\theta(q,p)$ だけを学び、その偏微分から速度を作る。これが Hamiltonian neural network（HNN）の基本的な構成である。

[Hamilton の正準方程式](../../../物理系/AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)は、正則な Lagrangian の Legendre 変換から導かれるが、HNN では最初から $H_\theta$ を相空間上の関数として指定する。本講は、得られる**連続時間モデル自身の保存性**と、実際の物理系に関する推論および数値積分の性質を区別する。

以下、自由度 $d\ge1$ を固定し、列ベクトル $q,p\in\mathbb R^d$、$z=(q^{\mathsf T},p^{\mathsf T})^{\mathsf T}\in\mathbb R^{2d}$ を用いる。$\nabla H$ は $z$ に関する $2d$ 成分の列勾配、$I_d$ と $0_d$ は $d$ 次の単位行列と零行列である。学習中のパラメータ $\theta$ と、モデル内の運動時刻 $t$ は別の変数であり、予測軌道を追う間は $\theta$ を固定する。

## 2. スカラー関数の勾配をどう運動方程式に変えるか

正準方程式の二つの式 $\dot q=\nabla_pH$、$\dot p=-\nabla_qH$ を一つの行列式にまとめたい。このために、位置微分と運動量微分を入れ替え、片方の符号を変える行列を用意する。

$$
J_d=
\begin{pmatrix}
0_d&I_d\\
-I_d&0_d
\end{pmatrix},
\qquad
\nabla_zH=
\begin{pmatrix}\nabla_qH\\\nabla_pH\end{pmatrix}.
$$

ブロック行列の積を実際に計算すると、

$$
J_d\nabla_zH
=\begin{pmatrix}
0_d\nabla_qH+I_d\nabla_pH\\
-I_d\nabla_qH+0_d\nabla_pH
\end{pmatrix}
=\begin{pmatrix}\nabla_pH\\-\nabla_qH\end{pmatrix}.
$$

さらに $J_d^{\mathsf T}=-J_d$、$J_d^{\mathsf T}J_d=I_{2d}$、$J_d^2=-I_{2d}$ である。特に **反対称**とは $J_d^{\mathsf T}=-J_d$ のことであり、後の保存則の核心になる。

パラメータを持つ関数 $H_\theta$ からこの規則でベクトル場（各状態にその時間微分を対応させる写像）を作るのが、この講義での HNN である。

<a id="def-pml1-18-hnn"></a>

<!-- formal-statement-start -->
> **定義（正準 Hamiltonian neural network）**  
> 整数 $d\ge1$、開集合 $U\subset\mathbb R^{2d}$、固定したパラメータ $\theta$ をとる。$H_\theta:U\to\mathbb R$ が $C^1$ 級のスカラー値関数であるとき、正準 HNN の連続時間ベクトル場を

$$
f_\theta(z):=J_d\nabla H_\theta(z),\qquad z\in U
$$

> と定める。モデルの予測軌道とは、区間 $I$ 上で $z(t)\in U$ を満たす $C^1$ 級関数で、$\dot z(t)=f_\theta(z(t))$ に従うものをいう。
<!-- formal-statement-end -->

ここで固定されるのは行列 $J_d$ と「スカラー関数の勾配から時間微分を作る」という対応である。$H_\theta$ の関数形や係数、訓練データへの適合度までは固定されない。$C^1$ の仮定はベクトル場を定義し連鎖律を使うために必要であり、後で発散を計算するときは $C^2$ を追加する。

**微分可能性の確認。** 例えば $H(q,p)=|q|+p^2/2$ は $q=0$ で微分可能でないため、$U=\mathbb R^2$ 上の本講の $C^1$ 条件を満たさない。ニューラルネットで滑らかでない活性化関数を使う場合も、対象領域の微分可能性を検査する。自動微分ライブラリが一点で数値を返すことと、連続時間保存定理の仮定が成立することは別である。

<!-- definition-example-start: def-pml1-18-hnn -->
### 例：一次元調和振動子を直接構成する

**定義の確認。** $d=1$、$U=\mathbb R^2$、$m,k>0$ とし、

$$
H_\theta(q,p)=\frac{p^2}{2m}+\frac{kq^2}{2},
\qquad \theta=(m,k)
$$

を採る。多項式だから $U$ 上で $C^1$ 級であり、$\theta$ は軌道を追う間一定である。これは [自然な Lagrangian の Hamiltonian](../../../物理系/AMECH/AMECH5/index.md#prop-amech5-natural-hamiltonian)を、質量 $m$、ポテンシャル $V(q)=kq^2/2$ に適用して得る形でもある。

$$
\nabla H_\theta(q,p)
=\begin{pmatrix}kq\\p/m\end{pmatrix},
\quad
J_1=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\quad
f_\theta(q,p)
=\begin{pmatrix}p/m\\-kq\end{pmatrix}.
$$

したがって予測方程式は $\dot q=p/m$、$\dot p=-kq$ となり、$p=m\dot q$ から $m\ddot q=-kq$ が再現される。定義の全条件（開集合、滑らかさ、行列の次元、固定パラメータ、勾配からの構成）を直接確認した。
<!-- definition-example-end -->

## 3. 何が厳密に保存されるのか

通常のベクトル場 $F$ では、$H$ の軌道沿いの変化率 $\nabla H\cdot F$ は一般に零でない。HNN では $F=J_d\nabla H$ なので、同じベクトルを反対称行列ではさんだ式になる。

<a id="thm-pml1-18-energy"></a>

<!-- formal-statement-start -->
> **定理（自律正準 HNN の連続時間エネルギー保存）**  
> $U\subset\mathbb R^{2d}$ を開集合、$H_\theta\in C^1(U)$ を時刻に陽に依存しない関数とし、$\theta$ を固定する。区間 $I$ 上の $C^1$ 級軌道 $z:I\to U$ がすべての $t\in I$ で

$$
\dot z(t)=J_d\nabla H_\theta(z(t))
$$

> に従うとき、$H_\theta(z(t))$ は $I$ 上で一定である。
<!-- formal-statement-end -->

**証明の見取り図。** $H_\theta\circ z$ に連鎖律を使い、反対称行列に対する $v^{\mathsf T}J_dv=0$ を適用する。ここには最適化の成功や訓練標本の条件は不要である。

<!-- proof-start -->
### 証明

$z$ と $H_\theta$ はともに $C^1$ なので、合成関数の連鎖律から

$$
\frac{d}{dt}H_\theta(z(t))
=\nabla H_\theta(z(t))^{\mathsf T}\dot z(t).
$$

この式の $\dot z(t)$ に、仮定した正準方程式を代入すると

$$
\frac{d}{dt}H_\theta(z(t))
=v^{\mathsf T}J_dv,
\qquad v=\nabla H_\theta(z(t)).
$$

右辺は実数（$1\times1$ 行列）なので転置しても同じ値であり、

$$
v^{\mathsf T}J_dv
=(v^{\mathsf T}J_dv)^{\mathsf T}
=v^{\mathsf T}J_d^{\mathsf T}v
=-v^{\mathsf T}J_dv.
$$

従って $2v^{\mathsf T}J_dv=0$、ゆえに $dH_\theta/dt=0$。区間上で微分が零の関数は一定だから結論を得る。
<!-- proof-end -->

先ほどの振動子では、上の一般論を直接の代入でも検算できる。

$$
\frac{dH_\theta}{dt}
=kq\dot q+\frac{p}{m}\dot p
=kq\frac pm+\frac pm(-kq)=0.
$$

この保存性は、モデル $H_\theta$ が物理的な真の Hamiltonian に一致することを意味しない。また、軌道が有限時間で $U$ を出る場合の、それより先の解の存在を定理は保証しない。

### 時刻・パラメータが変化した場合

時刻依存の $H_\theta(t,z)$ では、同じ $\dot z=J_d\nabla_zH_\theta$ に対し、

$$
\frac d{dt}H_\theta(t,z(t))
=\partial_tH_\theta(t,z(t))
+\nabla_zH_\theta^{\mathsf T}J_d\nabla_zH_\theta
=\partial_tH_\theta(t,z(t)).
$$

もし訓練更新などで $\theta=\theta(t)$ も変われば、連鎖律に $\nabla_\theta H_\theta\cdot\dot\theta$ がさらに加わる。自律・固定パラメータという仮定を外すと、保存の結論はそのままでは出ない。

## 4. 観測された速度を使って何を学ぶか

軌道上の状態とその時間微分を観測したとする。モデルが予測する速度は任意の $2d$ 成分ネットではなく、$H_\theta$ を $z$ で微分したものに $J_d$ を掛けた値である。入力の状態、速度ラベル、微分する変数を区別して損失を作る。

<a id="def-pml1-18-velocity-loss"></a>

<!-- formal-statement-start -->
> **定義（HNN の速度適合損失）**  
> 上の正準 HNN と、$N\ge1$ 個の状態・速度データ $(z_i,w_i)\in U\times\mathbb R^{2d}$ を与える。各 $w_i$ はその状態での観測時間微分とする。速度適合損失を

$$
\mathcal L(\theta)
=\frac1N\sum_{i=1}^N
\left\|J_d\nabla H_\theta(z_i)-w_i\right\|_2^2
$$

> と定義する。$\nabla$ はモデル入力 $z$ に関する微分であり、$\theta$ に関する訓練勾配とは異なる。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-18-velocity-loss -->
### 例：二つの速度観測から係数を求める

**定義の確認。** $d=1$、$U=\mathbb R^2$、

$$
H_{a,b}(q,p)=\frac12(aq^2+bp^2),
\qquad
f_{a,b}(q,p)=(bp,-aq)^{\mathsf T}
$$

とし、二つのデータを

$$
(z_1,w_1)=((1,0)^{\mathsf T},(0,-2)^{\mathsf T}),
\quad
(z_2,w_2)=((0,1)^{\mathsf T},(3,0)^{\mathsf T})
$$

とする。両点は開集合 $U$ に属し、各速度は二成分で、$N=2$ である。実際に損失へ代入すると

$$
\begin{aligned}
\mathcal L(a,b)
&=\frac12\left(\|(0,-a)-(0,-2)\|^2
+\|(b,0)-(3,0)\|^2\right)\\
&=\frac12\left((a-2)^2+(b-3)^2\right).
\end{aligned}
$$

従って最小値は $(a,b)=(2,3)$ で $0$。この例は有限の候補族と二つのデータに関する係数同定であり、あらゆる関数 $H$ を二点から決められるという意味ではない。
<!-- definition-example-end -->

実装では自動微分によって $\nabla_zH_\theta$ を計算し、この損失を $\theta$ について最適化する。なお $q$ と $p$ の単位が異なる物理問題では、各速度成分を無次元化するなどして学習時の重みを設計する必要がある。重みを変えても、予測ベクトル場を $J_d\nabla H_\theta$ とする限り第3節の代数的保存性は変わらない。

### データが教えてくれないこと

$H_\theta$ と $H_\theta+C$ は $z$ に関する勾配が等しいため、同じ速度場・同じ損失を与える。さらに、有限個の観測点で勾配が一致しても、観測点以外での勾配が一致するとは限らない。

例えば、二点 $z_1=(1,0)$、$z_2=(0,1)$ に対し、非零の滑らかな関数

$$
G(q,p)=\bigl((q-1)^2+p^2\bigr)^2
\bigl(q^2+(p-1)^2\bigr)^2
$$

は両点で勾配が零となる（各点で一方の二乗因子とその一階微分が零）。従って $\widetilde H=H+G$ は二点では $H$ と同じ速度を予測するが、一般の点では異なる。これは訓練点での損失零と領域全体での同定を区別する反例である。

## 5. モデルの保存量と真のエネルギーは違う

HNN が保つのは **$H_\theta$ 自身**である。未知の真の Hamiltonian $H_\ast$ があっても、両者が同じ関数だとは限らない。

<a id="prop-pml1-18-mismatch"></a>

<!-- formal-statement-start -->
> **命題（真のエネルギーのモデル軌道沿いの変化）**  
> $U\subset\mathbb R^{2d}$ を開集合とし、$H_\ast,H_\theta\in C^1(U)$ とする。$z(t)$ が固定 $\theta$ の正準 HNN 方程式 $\dot z=J_d\nabla H_\theta(z)$ に従うなら、

$$
\frac{d}{dt}H_\ast(z(t))
=\nabla H_\ast(z(t))^{\mathsf T}J_d\nabla H_\theta(z(t)).
$$

> この右辺は一般には零でない。
<!-- formal-statement-end -->

**証明の見取り図。** [本講の保存定理](#thm-pml1-18-energy)では左側の勾配にも $H_\theta$ が現れた。左側だけ $H_\ast$ に置き換えると、同一ベクトルを両側に持つ反対称二次形式ではなくなる。

<!-- proof-start -->
### 証明

連鎖律より $dH_\ast(z(t))/dt=\nabla H_\ast(z(t))^{\mathsf T}\dot z(t)$。軌道が従う式 $\dot z=J_d\nabla H_\theta$ を右辺へ代入して、表示した恒等式が得られる。$H_\ast=H_\theta$ の場合は[保存定理](#thm-pml1-18-energy)で零となるが、異なる関数の二つの勾配について $\nabla H_\ast^{\mathsf T}J_d\nabla H_\theta=0$ となる理由はない。
<!-- proof-end -->

**直接例。** $d=1$ として

$$
H_\ast(q,p)=\frac12(q^2+p^2),
\qquad
H_\theta(q,p)=\frac12(4q^2+p^2)
$$

を選ぶ。モデルは $(\dot q,\dot p)=(p,-4q)$ を予測する。状態 $(q,p)=(1,1)$ では

$$
\nabla H_\ast=(1,1)^{\mathsf T},
\qquad
J_1\nabla H_\theta=(1,-4)^{\mathsf T},
\qquad
\frac{dH_\ast}{dt}=1-4=-3.
$$

一方 $dH_\theta/dt=4q\dot q+p\dot p=4qp-4pq=0$。モデル内の保存則に成功しても、真の物理量を正しく保存する保証にはならない。

## 6. 反対称行列が固定するもう一つの構造

HNN の $f_\theta$ を座標ごとに偏微分して足し合わせると、局所的な流れの広がりを表す **発散** が得られる。正準 Hamiltonian ベクトル場の発散消失は [AMECH6 の命題](../../../物理系/AMECH/AMECH6/index.md#prop-amech6-divergence)で既習であり、HNN に代入して確認する。

<a id="prop-pml1-18-divergence"></a>

<!-- formal-statement-start -->
> **命題（正準 HNN ベクトル場の発散消失）**  
> $U\subset\mathbb R^{2d}$ を開集合、$H_\theta\in C^2(U)$ とする。このとき $f_\theta=J_d\nabla H_\theta$ は $C^1$ 級で、

$$
\operatorname{div}f_\theta
=\sum_{j=1}^d
\left(
\frac{\partial (f_\theta)_{q_j}}{\partial q_j}
+\frac{\partial (f_\theta)_{p_j}}{\partial p_j}
\right)=0
$$

> が $U$ の各点で成り立つ。
<!-- formal-statement-end -->

**証明の見取り図。** 正準方程式の各成分を $q_j,p_j$ で一度ずつ微分し、$C^2$ による混合偏微分の交換を使う。

<!-- proof-start -->
### 証明

定義から $(f_\theta)_{q_j}=\partial H_\theta/\partial p_j$、$(f_\theta)_{p_j}=-\partial H_\theta/\partial q_j$ なので、

$$
\begin{aligned}
\operatorname{div}f_\theta
&=\sum_{j=1}^d\left(
\frac{\partial^2H_\theta}{\partial q_j\partial p_j}
-\frac{\partial^2H_\theta}{\partial p_j\partial q_j}
\right)\\
&=\sum_{j=1}^d 0=0.
\end{aligned}
$$

混合偏微分が等しいのは $H_\theta\in C^2(U)$ だからである。
<!-- proof-end -->

この式と局所流れの存在・微分可能性を合わせると、[Liouville の定理](../../../物理系/AMECH/AMECH6/index.md#thm-amech6-liouville)によって連続時間流れが相空間体積を保存する。**エネルギー保存**と**体積保存**は別の主張であり、$C^1$ の保存定理だけで後者を主張してはならない。

この制約は表現できない運動も生む。例えば $d=1$、$\gamma>0$ の純粋な収縮場

$$
F(q,p)=(-\gamma q,-\gamma p)^{\mathsf T}
$$

では $\operatorname{div}F=-2\gamma$ である。もし $F=J_1\nabla H_\theta$ がある開集合全体で $C^2$ 級の $H_\theta$ により成立すれば発散は零のはずなので矛盾する。**散逸する運動を、同じ二つの正準座標上の自律正準 HNN で厳密に表すことはできない**。外部駆動、散逸項、拡張状態を加えるモデルは、この定義とは別に設計する必要がある。

また $J_d$ が一定でなく状態依存の反対称行列 $J(z)$ に変わっても $\nabla H^{\mathsf T}J(z)\nabla H=0$ は成り立つが、発散や正準 Hamilton 構造まですべて同じとは限らない。どの構造がどの仮定から出たかを区別しよう。

## 7. 数値の一歩では何が失われるか

データから $H_\theta$ を学び、$f_\theta$ を計算できても、コンピュータで軌道を得るには時間刻み $h$ で更新する必要がある。最も基本的な陽的 Euler 法は

$$
z_{n+1}=z_n+hJ_d\nabla H_\theta(z_n)
$$

である。これは通常、[本講の連続時間保存定理](#thm-pml1-18-energy)の仮定である **連続軌道の微分方程式**ではない。

<a id="prop-pml1-18-euler"></a>

<!-- formal-statement-start -->
> **命題（二次 HNN の陽的 Euler エネルギードリフト）**  
> $a,b>0$、$h>0$ とし、$H(q,p)=(aq^2+bp^2)/2$ の正準 HNN を陽的 Euler 法で更新する。任意の $n\ge0$ について、

$$
H(q_{n+1},p_{n+1})=(1+ab h^2)H(q_n,p_n)
$$

> が成り立つ。特に $(q_0,p_0)\ne(0,0)$ なら、離散エネルギーは各ステップで厳密に増加する。
<!-- formal-statement-end -->

**証明の見取り図。** 更新後の $q,p$ を二次式へ代入し、交差項が相殺されても二次の $h^2$ 項が残ることを見る。

<!-- proof-start -->
### 証明

勾配は $(aq,bp)^{\mathsf T}$ なので正準ベクトル場は $(bp,-aq)^{\mathsf T}$。従って

$$
q_{n+1}=q_n+hb p_n,\qquad
p_{n+1}=p_n-ha q_n.
$$

これを $H$ の定義へ代入すると、

$$
\begin{aligned}
2H_{n+1}
&=a(q_n+hb p_n)^2+b(p_n-ha q_n)^2\\
&=a q_n^2+2habq_np_n+h^2ab^2p_n^2\\
&\quad+b p_n^2-2habp_nq_n+h^2ba^2q_n^2\\
&=(1+ab h^2)(a q_n^2+b p_n^2).
\end{aligned}
$$

両辺を $2$ で割れば式が得られる。$a,b,h>0$ かつ非零初期値なら $H_0>0$ であり、倍率は $1$ より大きい。
<!-- proof-end -->

たとえば $a=b=1$、$h=0.1$ では一歩ごとに $H$ は $1.01$ 倍となる。何ステップも経てば $(1.01)^n$ 倍である。これは HNN の連続時間構造が壊れたのではなく、**更新法がその構造を厳密には保っていない**ことを示す。構造を考慮した数値積分は PML1-20 で比較する。

## 8. モデルを評価するときの三つの検査

1. **速度適合**：データを訓練用と未見用に分け、$\mathcal L(\theta)$ および未見速度誤差を測る。有限点だけでの一致から全域を推論しない。
2. **連続モデルの構造**：$H_\theta\in C^1$、固定 $\theta$、一定の $J_d$、連続時間という条件を確認する。数学的な保存性は損失が小さいかとは独立である。
3. **物理量と離散軌道**：真のエネルギー $H_\ast$ が別に分かるならその誤差を調べ、時間刻みを変えた離散軌道で $H_\theta$ のドリフトも測る。比較対象と時刻幅を明記する。

## 9. 演習 Level A

<a id="ex-pml1-18-a01"></a>

### PML1-18-A01 反対称行列と成分
- Level: A

$d=2$ の $J_2$ を $4\times4$ 行列で書き、$J_2^{\mathsf T}=-J_2$ と、任意の $v\in\mathbb R^4$ で $v^{\mathsf T}J_2v=0$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

$$
J_2=
\begin{pmatrix}
0&0&1&0\\
0&0&0&1\\
-1&0&0&0\\
0&-1&0&0
\end{pmatrix}.
$$

転置すると非零成分の位置が入れ替わり符号も反転するから $J_2^{\mathsf T}=-J_2$。$v=(v_1,v_2,v_3,v_4)^{\mathsf T}$ に作用させると $J_2v=(v_3,v_4,-v_1,-v_2)^{\mathsf T}$ なので、

$$
v^{\mathsf T}J_2v=v_1v_3+v_2v_4-v_3v_1-v_4v_2=0.
$$
<!-- solution-end -->

<a id="ex-pml1-18-a02"></a>

### PML1-18-A02 振動子の速度とエネルギー
- Level: A

$H(q,p)=p^2/4+3q^2/2$ とする。$f=J_1\nabla H$ と、連続軌道での $dH/dt$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\partial_qH=3q$、$\partial_pH=p/2$ なので、

$$
f(q,p)=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\begin{pmatrix}3q\\p/2\end{pmatrix}
=\begin{pmatrix}p/2\\-3q\end{pmatrix}.
$$

$\dot q=p/2$、$\dot p=-3q$ を用いて、

$$
\frac{dH}{dt}
=3q\dot q+\frac p2\dot p
=\frac{3qp}{2}-\frac{3pq}{2}=0.
$$

これは[保存定理](#thm-pml1-18-energy)の直接計算による確認である。
<!-- solution-end -->

<a id="ex-pml1-18-a03"></a>

### PML1-18-A03 速度損失を展開する
- Level: A

$H_{a,b}=(aq^2+bp^2)/2$、観測 $(z,w)=((2,0)^{\mathsf T},(0,-6)^{\mathsf T})$ の一標本について、[速度適合損失](#def-pml1-18-velocity-loss)を $a,b$ で表せ。$b$ は決まるか。

<!-- solution-start -->
#### 詳細解答

モデル速度は $f_{a,b}(q,p)=(bp,-aq)$。$q=2,p=0$ を入れると $f_{a,b}(2,0)=(0,-2a)$。従って

$$
\mathcal L(a,b)
=\|(0,-2a)-(0,-6)\|^2
=4(a-3)^2.
$$

最小値 $0$ は $a=3$ で実現し、$p=0$ の観測では $b$ が式に現れないので $b$ は決まらない。
<!-- solution-end -->

<a id="ex-pml1-18-a04"></a>

### PML1-18-A04 時刻に依存する場合
- Level: A

$H(t,q,p)=(q^2+p^2)/2+tq$ の Hamilton 方程式を求め、軌道沿いの $dH/dt$ を計算せよ。

<!-- solution-start -->
#### 詳細解答

$\partial_qH=q+t$、$\partial_pH=p$ だから、

$$
\dot q=p,\qquad \dot p=-(q+t).
$$

全微分には陽的な時刻微分 $\partial_tH=q$ が加わる。すなわち

$$
\frac{dH}{dt}
=q+(q+t)\dot q+p\dot p
=q+(q+t)p-p(q+t)=q.
$$

従って自律条件がないと $H$ は一般に一定ではない。
<!-- solution-end -->

<a id="ex-pml1-18-a05"></a>

### PML1-18-A05 二つのエネルギー
- Level: A

$H_\ast=(q^2+p^2)/2$、$H_\theta=(9q^2+p^2)/2$ とする。モデル軌道の点 $(1,2)$ で $dH_\ast/dt$、$dH_\theta/dt$ をそれぞれ求めよ。

<!-- solution-start -->
#### 詳細解答

モデル勾配は $\nabla H_\theta=(9q,p)$ なので $\dot z=(p,-9q)$。点 $(1,2)$ では $\dot z=(2,-9)$、真のエネルギーの勾配は $(q,p)=(1,2)$ だから、

$$
\frac{dH_\ast}{dt}=1\cdot2+2\cdot(-9)=-16.
$$

一方、

$$
\frac{dH_\theta}{dt}=9q\dot q+p\dot p
=9\cdot1\cdot2+2\cdot(-9)=0.
$$

[真のエネルギーの変化命題](#prop-pml1-18-mismatch)を具体的に確認できた。
<!-- solution-end -->

## 10. 演習 Level B

<a id="ex-pml1-18-b01"></a>

### PML1-18-B01 二自由度での保存
- Level: B

$H(q,p)=\frac12(q^{\mathsf T}Kq+p^{\mathsf T}M^{-1}p)$ とする。$q,p\in\mathbb R^2$、$K$ と $M$ は対称正定値の $2\times2$ 定数行列とする。正準方程式と $dH/dt=0$ を導け。

<!-- solution-start -->
#### 詳細解答

対称性から $d(q^{\mathsf T}Kq)/dq=2Kq$。同様に $M^{-1}$ は対称なので $\nabla_pH=M^{-1}p$。$M$ が正定値だから可逆であり $M^{-1}$ が存在する。従って

$$
\dot q=M^{-1}p,\qquad\dot p=-Kq.
$$

連鎖律に代入すると

$$
\begin{aligned}
\frac{dH}{dt}
&=(Kq)^{\mathsf T}\dot q+(M^{-1}p)^{\mathsf T}\dot p\\
&=q^{\mathsf T}KM^{-1}p-(M^{-1}p)^{\mathsf T}Kq=0.
\end{aligned}
$$

最後は二つの項が転置関係の同じ実数であることを使った。
<!-- solution-end -->

<a id="ex-pml1-18-b02"></a>

### PML1-18-B02 収縮場を表せない理由
- Level: B

$\gamma>0$ とし、$F(q,p)=(-\gamma q,-\gamma p)$ とする。ある開円板上で $C^2$ 級 $H$ を用い $F=J_1\nabla H$ と表せないことを、成分の微分から示せ。

<!-- solution-start -->
#### 詳細解答

仮に $F=J_1\nabla H$ なら、成分比較から

$$
\partial_pH=-\gamma q,\qquad
-\partial_qH=-\gamma p,
\quad\text{従って}\quad \partial_qH=\gamma p.
$$

第一式を $q$ で微分すると $\partial_q\partial_pH=-\gamma$。第二式を $p$ で微分すると $\partial_p\partial_qH=\gamma$。$H\in C^2$ なら混合偏微分は等しくなければならないから $-\gamma=\gamma$、すなわち $\gamma=0$ が必要となり矛盾する。これは[発散消失命題](#prop-pml1-18-divergence)と同じ障害を成分で確認したものである。
<!-- solution-end -->

<a id="ex-pml1-18-b03"></a>

### PML1-18-B03 速度観測では何が不定か
- Level: B

$U=\mathbb R^2$ において、$H(q,p)$ が $C^1$ 級であるとする。

1. $H+C$ と $H$ が同じ速度場を作ることを証明せよ。
2. 観測状態が $(0,0)$ だけなら $H(q,p)=(q^2+p^2)/2$ と $\widetilde H(q,p)=(q^2+4p^2)/2$ を速度観測で区別できるか。別の点での違いも計算せよ。

<!-- solution-start -->
#### 詳細解答

定数 $C$ は $\nabla_zC=0$ なので、

$$
J_1\nabla(H+C)=J_1(\nabla H+\nabla C)=J_1\nabla H.
$$

次に原点では $\nabla H(0,0)=\nabla\widetilde H(0,0)=(0,0)$ であり、二つの予測速度はいずれも $(0,0)$。原点の速度観測だけでは区別できない。しかし $(q,p)=(0,1)$ では

$$
J_1\nabla H(0,1)=(1,0),\qquad
J_1\nabla\widetilde H(0,1)=(4,0).
$$

従って原点での一致は全域での同定を意味しない。
<!-- solution-end -->

<a id="ex-pml1-18-b04"></a>

### PML1-18-B04 二次模型の離散ドリフト
- Level: B

$H(q,p)=(2q^2+3p^2)/2$ を $h=1/10$ の陽的 Euler 法で更新する。初期値 $(q_0,p_0)=(1,0)$ について、$z_1$、$H_0$、$H_1$、$H_1/H_0$ を求めよ。

<!-- solution-start -->
#### 詳細解答

$\nabla H=(2q,3p)$ だから $f=(3p,-2q)$。初期値で $f(1,0)=(0,-2)$ となり、

$$
(q_1,p_1)=(1,0)+\frac1{10}(0,-2)
=(1,-1/5).
$$

初期と更新後のエネルギーは

$$
H_0=\frac12\cdot2=1,\qquad
H_1=\frac12\left(2+3\cdot\frac1{25}\right)
=1+\frac3{50}=\frac{53}{50}.
$$

したがって $H_1/H_0=53/50=1.06$。[Euler ドリフト命題](#prop-pml1-18-euler)の倍率 $1+ab h^2=1+2\cdot3/100=1.06$ と一致する。
<!-- solution-end -->

## 11. 演習 Level C

<a id="ex-pml1-18-c01"></a>

### PML1-18-C01 同定・保存・誤差を一続きで検査
- Level: C

一次元の正準 HNN の候補を $H_{a,b}(q,p)=(aq^2+bp^2)/2$、$a,b>0$ とする。観測は $(z_1,w_1)=((1,0),(0,-4))$、$(z_2,w_2)=((0,1),(2,0))$ とする。ここで各組の成分順序は $(q,p)$ と $(\dot q,\dot p)$ である。

1. 平均二乗速度損失を求め、最小化して $a,b$ を求めよ。
2. 得られた HNN の連続時間保存性を直接確認せよ。
3. 真の物理的エネルギーが $H_\ast=(q^2+p^2)/2$ である場合、点 $(1,1)$ のモデル軌道での $dH_\ast/dt$ を計算せよ。
4. 学習した HNN に $h=1/4$ の陽的 Euler 法を用いると、一歩で学習した Hamiltonian は何倍になるか。
5. 上の観測一致、連続時間保存、真のエネルギー保存、離散保存の四つが同一の主張でない理由をまとめよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $J_1\nabla H_{a,b}=(bp,-aq)$。第1データには $(0,-a)$、第2データには $(b,0)$ を予測するから、

$$
\mathcal L(a,b)=\frac12\left[(a-4)^2+(b-2)^2\right].
$$

各平方は非負なので $a=4,b=2$ で最小値 $0$ をとる。両方とも正で、指定されたパラメータ範囲内である。

**(2)** 得た関数は $H_\theta=2q^2+p^2$、運動は $\dot q=2p$、$\dot p=-4q$ である。従って

$$
\frac{dH_\theta}{dt}
=4q(2p)+2p(-4q)=8qp-8pq=0.
$$

これは観測二点以外でも、正準方程式に従う連続軌道の各時刻で成立する。

**(3)** 真のエネルギーの勾配は $(q,p)$。点 $(1,1)$ でのモデル速度は $(2,-4)$ だから、

$$
\left.\frac{dH_\ast}{dt}\right|_{(1,1)}
=(1,1)\cdot(2,-4)=-2.
$$

学習した $H_\theta$ は保存しても、指定された別の $H_\ast$ は一般には保存されない。

**(4)** [陽的 Euler ドリフト命題](#prop-pml1-18-euler)で $a=4,b=2,h=1/4$ を代入する。倍率は

$$
1+ab h^2=1+4\cdot2\cdot\frac1{16}=\frac32.
$$

一歩で $H_\theta$ は $1.5$ 倍になる（非零状態の場合）。

**(5)** 損失零は**二点の速度**の一致であり、観測外での正しさを保証しない。連続保存は固定した $H_\theta$ と正準 ODE の代数的性質である。真のエネルギーの保存は $H_\ast$ と $H_\theta$ の関係を別に調べなければならない。陽的 Euler 更新は連続 ODE ではないため、連続保存が成り立っても有限刻みではドリフトが生じる。
<!-- solution-end -->

## 12. 次の講義へ

今回固定したのは「正準相空間上で一つのスカラー Hamiltonian を学び、反対称行列を介して連続時間の速度を作る」という構造である。次の PML1-19 では Lagrangian から運動方程式の加速度を取り出す際に、速度 Hessian（質量行列）の可逆性が必要になる理由を調べる。
