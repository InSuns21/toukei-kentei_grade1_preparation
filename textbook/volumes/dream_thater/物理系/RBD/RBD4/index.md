# RBD4 Euler角と姿勢の座標特異性

<!-- definition-example-audit: strict -->

> **前提**：[RBD1 の向きを保つ回転行列](../RBD1/index.md#def-rbd1-proper-rotation)、[RBD2 の軸角表示](../RBD2/index.md#def-rbd2-axis-angle)、[RBD3 の角速度の空間・物体対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)。三次元の右手系、列ベクトル、能動回転を使います。角度はラジアンで測ります。

## 1. 三つの角度を使うと何が便利で、何が困るのか

前講では姿勢 $R(t)\in SO(3)$ を行列のまま扱いました。剛体の自転軸が傾き、軸の向きが実験室で回る様子を記録するには、三つの角度の方が読みやすいことがあります。しかし角速度が有限でも、角度の時間変化を一意に復元できない姿勢があります。**回転が止まる**のではなく、**角度という住所の付け方が重複する**のです。

この講義では回転の順序を固定します。$e_1,e_2,e_3$ は空間に固定した標準基底で、$R_\alpha(\gamma)$ は軸 $\alpha$ のまわりの右手系の能動回転を表します。以下では $R_z$ と $R_y$ のみを使い、右側の行列が先に列ベクトルへ作用します。回転角の呼び名は、歳差角 $\phi$、章動角 $\theta$、自転角 $\psi$ です。自転とはここでは**最後の物体軸まわりの回転を記述する角**のことであり、単独の $\dot\psi$ が一般に物体角速度の第三成分とは限りません。

$$
R_z(a)=\begin{pmatrix}\cos a&-\sin a&0\\\sin a&\cos a&0\\0&0&1\end{pmatrix},
\qquad
R_y(b)=\begin{pmatrix}\cos b&0&\sin b\\0&1&0\\-\sin b&0&\cos b\end{pmatrix}.
$$

## 2. ZYZ Euler角を構成して判定する

まず物体の $e_3$ 方向が空間のどこを向くか考えます。$R_z(\psi)e_3=e_3$、$R_y(\theta)e_3=(\sin\theta,0,\cos\theta)^{\mathsf T}$ なので、最後に空間の $z$ 軸のまわりへ $\phi$ だけ回せば、物体の軸の向きは二角 $\phi,\theta$ で決まります。残る $\psi$ はその軸のまわりの向きを区別します。

<a id="def-rbd4-zyz-euler"></a>

<!-- formal-statement-start -->
### 定義（ZYZ Euler角）

実数 $\phi,\theta,\psi$ に対し、$z$–$y$–$z$ 規約の **ZYZ Euler角による姿勢**を、次の能動回転行列として定義する。

$$
\boxed{R(\phi,\theta,\psi)=R_z(\phi)R_y(\theta)R_z(\psi)}.
$$

$\phi$ は歳差角、$\theta$ は章動角、$\psi$ は自転角と呼ぶ。通常の角度代表は $0\leq\phi<2\pi$、$0\leq\theta\leq\pi$、$0\leq\psi<2\pi$ とする。角度が $2\pi$ ずれた組は同じ姿勢を表す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-rbd4-zyz-euler -->
### 直接例：物体軸を水平に倒す

**定義の確認**：三つの指定角から回転行列を作り、第三軸の向きと $SO(3)$ の二条件を直接検査します。

$\phi=0,\theta=\pi/2,\psi=0$ なら $R=R_y(\pi/2)$ です。列の像を計算すると $Re_1=-e_3$、$Re_2=e_2$、$Re_3=e_1$。従って物体の第三軸は空間の $e_1$ 方向を向きます。各列は互いに直交し長さ1、行列式は $1$ なので [RBD1 の回転条件](../RBD1/index.md#def-rbd1-proper-rotation)を満たします。三つの角度を選んだだけで鏡映が混入することはありません。

一般の場合にも各因子は $SO(3)$ に属するので $R^{\mathsf T}R=I_3$、$\det R=1$ です。さらに三番目の列を計算すれば

$$
\boxed{Re_3=(\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta)^{\mathsf T}}
$$

となり、$\psi$ を変えても物体軸の向きは変わらないことが式から確認できます。
<!-- definition-example-end -->

ここで「物体軸の向き」を固定することと「物体全体の姿勢」を固定することは違います。$\psi$ は物体軸が同じ方向を向いても、残る二本の物体基底がどう回ったかを記録します。

### 実際の角度操作

[ZYZ Euler角の操作と特異姿勢の可視化](https://insuns21.github.io/toukei-kentei_grade1_preparation/textbook/volumes/dream_thater/物理系/RBD/RBD4/assets/euler-angles.html)では $\phi,\theta,\psi$ を別々に動かせます。灰色の破線は空間基底、物体基底はそれぞれ $b_1,b_2,b_3$ と表示し、実際の行列の三列から描画します。$\theta=0$ にしたとき、$\phi$ を増やし同じだけ $\psi$ を減らすと、三本の物体軸が変化しないことを確かめてください。ページ内にはJavaScript無効時にも読める計算例を併記しています。

## 3. 姿勢の時間変化と三つの角速度成分

$C^1$ 級の角度関数 $\phi(t),\theta(t),\psi(t)$ を考えます。[RBD3 の空間角速度と物体角速度](../RBD3/index.md#def-rbd3-angular-velocity)によれば $\widehat{\omega_s}=\dot RR^{\mathsf T}$、$\widehat{\omega_b}=R^{\mathsf T}\dot R$ です。計算の中で角度の付いた回転軸を明示しておきます。

<a id="prop-rbd4-angular-velocity"></a>

<!-- formal-statement-start -->
### 命題（ZYZ Euler角速度の変換）

$I\subset\mathbb R$ 上で $\phi,\theta,\psi\in C^1(I)$ とし、姿勢を

$$
R(t)=R_z(\phi(t))R_y(\theta(t))R_z(\psi(t))
$$

と定める。[RBD3 の定義](../RBD3/index.md#def-rbd3-angular-velocity)による空間・物体角速度は

$$
\omega_s=
\begin{pmatrix}
-\dot\theta\sin\phi+\dot\psi\sin\theta\cos\phi\\
\dot\theta\cos\phi+\dot\psi\sin\theta\sin\phi\\
\dot\phi+\dot\psi\cos\theta
\end{pmatrix},
$$

$$
\boxed{\omega_b=
\begin{pmatrix}
-\dot\phi\sin\theta\cos\psi+\dot\theta\sin\psi\\
\dot\phi\sin\theta\sin\psi+\dot\theta\cos\psi\\
\dot\phi\cos\theta+\dot\psi
\end{pmatrix}}.
$$

この二表示は $\omega_s=R\omega_b$ を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

積を微分する際、各因子の回転軸は**その因子より左側の回転だけ**で空間へ運ばれます。$\omega_s$ を計算してから [角速度の空間・物体対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)を使うか、$R^{\mathsf T}\dot R$ を直接計算しても一致します。

<!-- proof-start -->
### 証明

$Z_\phi=R_z(\phi)$、$Y_\theta=R_y(\theta)$、$Z_\psi=R_z(\psi)$ とおきます。$R=Z_\phi Y_\theta Z_\psi$ の積の微分は

$$
\dot R=\dot Z_\phi Y_\theta Z_\psi+
Z_\phi\dot Y_\theta Z_\psi+
Z_\phi Y_\theta\dot Z_\psi.
$$

[RBD2 のハット行列](../RBD2/index.md#def-rbd2-hat)を用いると、$z$ 回転では $\dot Z_\phi Z_\phi^{\mathsf T}=\dot\phi\,\widehat{e_3}$、$y$ 回転では $\dot Y_\theta Y_\theta^{\mathsf T}=\dot\theta\,\widehat{e_2}$ です。右側に $R^{\mathsf T}=Z_\psi^{\mathsf T}Y_\theta^{\mathsf T}Z_\phi^{\mathsf T}$ を掛け、直交性で隣り合う因子を消すと

$$
\begin{aligned}
\dot RR^{\mathsf T}
&=\dot\phi\,\widehat{e_3}
+\dot\theta\,Z_\phi\widehat{e_2}Z_\phi^{\mathsf T}\\
&\quad+\dot\psi\,Z_\phi Y_\theta\widehat{e_3}Y_\theta^{\mathsf T}Z_\phi^{\mathsf T}.
\end{aligned}
$$

[RBD3 のハット共役恒等式](../RBD3/index.md#prop-rbd3-angular-conjugacy) $Q\widehat vQ^{\mathsf T}=\widehat{Qv}$ を各項へ使うと

$$
\omega_s=\dot\phi e_3+\dot\theta Z_\phi e_2+
\dot\psi Z_\phi Y_\theta e_3.
$$

$Z_\phi e_2=(-\sin\phi,\cos\phi,0)^{\mathsf T}$ と、前節の $Z_\phi Y_\theta e_3$ を代入すれば、空間成分の式が得られます。

同じ積の微分を今度は左から $R^{\mathsf T}$ で挟むと

$$
\begin{aligned}
R^{\mathsf T}\dot R
&=\dot\phi\,Z_\psi^{\mathsf T}Y_\theta^{\mathsf T}\widehat{e_3}Y_\theta Z_\psi\\
&\quad+\dot\theta\,Z_\psi^{\mathsf T}\widehat{e_2}Z_\psi
+\dot\psi\,\widehat{e_3}.
\end{aligned}
$$

従って

$$
\omega_b=\dot\phi Z_\psi^{\mathsf T}Y_\theta^{\mathsf T}e_3+
\dot\theta Z_\psi^{\mathsf T}e_2+\dot\psi e_3.
$$

三つのベクトルを実際に計算します。

$$
\begin{aligned}
Z_\psi^{\mathsf T}Y_\theta^{\mathsf T}e_3
&=(-\sin\theta\cos\psi,\ \sin\theta\sin\psi,\ \cos\theta)^{\mathsf T},\\
Z_\psi^{\mathsf T}e_2&=(\sin\psi,\cos\psi,0)^{\mathsf T},\\
e_3&=(0,0,1)^{\mathsf T}.
\end{aligned}
$$

線形結合すれば物体成分の式です。各成分が同じ $\widehat{\omega}$ の異なる基底表示なので [RBD3 の対応命題](../RBD3/index.md#prop-rbd3-angular-conjugacy)から $\omega_s=R\omega_b$ も成り立ちます。
<!-- proof-end -->

**数値例**：$\phi=0,\theta=\pi/2,\psi=0$ なら

$$
\omega_b=(-\dot\phi,\dot\theta,\dot\psi)^{\mathsf T},
\qquad
\omega_s=(\dot\psi,\dot\theta,\dot\phi)^{\mathsf T}.
$$

$R=R_y(\pi/2)$ を掛けて $\omega_b$ が $\omega_s$ に移ることも確かめられます。歳差・章動・自転という名前だけから $\omega_b=(\dot\phi,\dot\theta,\dot\psi)$ と置くのは誤りです。

## 4. 角度速度から角速度へ、逆に戻せる条件

前節の物体成分を $\dot q=(\dot\phi,\dot\theta,\dot\psi)^{\mathsf T}$ に関する線形写像として並べると

$$
\omega_b=T(\theta,\psi)\dot q,\qquad
T=\begin{pmatrix}
-\sin\theta\cos\psi&\sin\psi&0\\
\sin\theta\sin\psi&\cos\psi&0\\
\cos\theta&0&1
\end{pmatrix}.
$$

最初の二列は、物体座標で見た歳差軸と章動軸です。第三列は物体第三軸です。したがって、この三列が独立でなければ「与えられた角速度を実現する三つの角度速度」は一意に決まりません。

<a id="thm-rbd4-regular-inverse"></a>

<!-- formal-statement-start -->
### 定理（Euler角の正則域と角度速度の逆変換）

$R=R_z(\phi)R_y(\theta)R_z(\psi)$ とし、$C^1$ 級の角度変化の物体角速度を $\omega_b=T(\theta,\psi)(\dot\phi,\dot\theta,\dot\psi)^{\mathsf T}$ とする。このとき

$$
\boxed{\det T=-\sin\theta}.
$$

従って $0<\theta<\pi$ の範囲で $T$ は可逆であり、$\omega_b=(\omega_{b1},\omega_{b2},\omega_{b3})^{\mathsf T}$ に対する角度速度は一意に

$$
\begin{aligned}
\dot\phi&=\frac{-\omega_{b1}\cos\psi+\omega_{b2}\sin\psi}{\sin\theta},\\
\dot\theta&=\omega_{b1}\sin\psi+\omega_{b2}\cos\psi,\\
\dot\psi&=\omega_{b3}-\dot\phi\cos\theta
\end{aligned}
$$

で与えられる。$\theta=0$ と $\theta=\pi$ では $T$ の階数は $2$ であり、一般には逆変換できない。
<!-- formal-statement-end -->

### 証明の見取り図

第三列には最後の成分だけがあるため、行列式は左上 $2\times2$ の行列式に還元できます。逆変換は最初の二成分を平面の回転で戻し、最後に第三成分を解きます。

<!-- proof-start -->
### 証明

第三列で行列式を展開すると

$$
\begin{aligned}
\det T
&=(-\sin\theta\cos\psi)\cos\psi
-(\sin\psi)(\sin\theta\sin\psi)\\
&=-\sin\theta(\cos^2\psi+\sin^2\psi)
=-\sin\theta.
\end{aligned}
$$

$\sin\theta\ne0$ のとき、上二成分を $\cos\psi,\sin\psi$ で組み合わせると

$$
\begin{aligned}
-\omega_{b1}\cos\psi+\omega_{b2}\sin\psi
&=\dot\phi\sin\theta(\cos^2\psi+\sin^2\psi),\\
\omega_{b1}\sin\psi+\omega_{b2}\cos\psi
&=\dot\theta(\sin^2\psi+\cos^2\psi).
\end{aligned}
$$

よって示した $\dot\phi,\dot\theta$ が得られます。第三行 $\omega_{b3}=\dot\phi\cos\theta+\dot\psi$ から $\dot\psi$ を得ます。

$\theta=0,\pi$ でも第二列 $(\sin\psi,\cos\psi,0)^{\mathsf T}$ と第三列 $e_3$ は常に独立です。一方、第一列は $\theta=0$ なら $e_3$、$\theta=\pi$ なら $-e_3$ なので、両端で階数はちょうど $2$ です。
<!-- proof-end -->

### 逆変換の数値的な不安定性

たとえば $\psi=0$ で $\omega_b=e_1$、$0<\theta<\pi$ とすると、上式から

$$
\dot\phi=-\frac1{\sin\theta},\qquad
\dot\theta=0,\qquad
\dot\psi=\frac{\cos\theta}{\sin\theta}.
$$

$\theta\to0^+$ で $\omega_b$ は長さ $1$ のままなのに、$\dot\phi,\dot\psi$ は発散します。これは角速度が発散したのではなく、相殺する二つの角度速度を使って有限の回転を表そうとした結果です。**正則域内での可逆性と、端点へ近づいたときの数値安定性は別**です。

## 5. 特異姿勢と同じ回転を表す角度組

今度は角速度ではなく、姿勢行列そのものを端点で計算します。$\theta=0$ では $R_y(0)=I_3$ なので

$$
\boxed{R(\phi,0,\psi)=R_z(\phi+\psi)}.
$$

$\phi+\psi$ が一定なら三本の物体軸はまったく同じ位置を向きます。例えば $(\phi,\theta,\psi)=(0,0,\pi/3)$ と $(\pi/6,0,\pi/6)$ は同じ姿勢です。

$\theta=\pi$ では $R_y(\pi)R_z(\psi)=R_z(-\psi)R_y(\pi)$ を、双方の行列を掛けて確かめられます。従って

$$
\boxed{R(\phi,\pi,\psi)=R_z(\phi-\psi)R_y(\pi)}.
$$

今度は $\phi-\psi$ が一定なら同一姿勢です。ここで角度の一つを「失う」とは、物理的な回転自由度が消えることではなく、異なる座標組が同じ $SO(3)$ の要素を指すことです。

<a id="prop-rbd4-coordinate-singularity"></a>

<!-- formal-statement-start -->
### 命題（ZYZ Euler角の座標特異性）

ZYZ 姿勢写像 $F:\mathbb R^3\to SO(3)$ を次のように定める。

$$
F(\phi,\theta,\psi)=R_z(\phi)R_y(\theta)R_z(\psi).
$$

この写像では、次の角度速度方向へ変化させても姿勢の一次変化はゼロである。

$$
\theta=0:\quad(\dot\phi,\dot\theta,\dot\psi)=(1,0,-1),
$$

$$
\theta=\pi:\quad(\dot\phi,\dot\theta,\dot\psi)=(1,0,1).
$$

一方、各姿勢行列 $R=F(\phi,\theta,\psi)$ 自体は常に次を満たす。

$$
R^{\mathsf T}R=I_3,\qquad\det R=1.
$$
<!-- formal-statement-end -->

### 証明の見取り図

前半は同一姿勢になる角度の組を一つの実数で動かして確かめます。後半は三つの回転行列がそれぞれ正則であることを使います。

<!-- proof-start -->
### 証明

$\theta=0$ で $F(\phi+h,0,\psi-h)=R_z(\phi+\psi)$ は $h$ に依存せず、従って $h=0$ での方向微分はゼロです。$\theta=\pi$ でも $F(\phi+h,\pi,\psi+h)=R_z(\phi-\psi)R_y(\pi)$ は $h$ に依存しません。どちらも非零の角度変化がゼロの角速度へ写ることに対応し、[正則域の定理](#thm-rbd4-regular-inverse)で求めた $T$ の零空間と一致します。

一方、各 $R_z$ と $R_y$ は正規直交・行列式 $1$ なので積もそうです。$T$ が特異であることは $R$ の行列式がゼロという意味ではありません。
<!-- proof-end -->

### 枝を選んで角度を取り出す

$0<\theta<\pi$ に限定すると、$R$ の成分を使って角度を復元できます。$R_{ij}$ を第 $i$ 行第 $j$ 列の成分とし、$\operatorname{atan2}(y,x)$ は $(x,y)$ の偏角を $2\pi$ を法として返す関数とします。

$$
\begin{aligned}
\theta&=\arccos R_{33},\\
\phi&=\operatorname{atan2}(R_{23},R_{13}),\\
\psi&=\operatorname{atan2}(R_{32},-R_{31}).
\end{aligned}
$$

実際、行列積から

$$
R_{13}=\sin\theta\cos\phi,\quad
R_{23}=\sin\theta\sin\phi,\quad
R_{31}=-\sin\theta\cos\psi,\quad
R_{32}=\sin\theta\sin\psi
$$

です。正則域では $\sin\theta>0$ なので両方の $\operatorname{atan2}$ へ同じ正の係数を取り除けます。$0\le\theta\le\pi$ では $R_{33}=\cos\theta$ から $\theta$ が決まります。端点では $\operatorname{atan2}(0,0)$ となるため、角の分離に失敗します。

さらに $\phi$ と $\psi$ の代表を $[0,2\pi)$ に取っても、時間とともに $2\pi$ をまたぐと数値代表は不連続に跳ねます。これは**枝の切替**であり、$\sin\theta=0$ による特異性と区別します。

## 6. 一見特異でも滑らかな剛体運動

$R(t)=R_y(t)$、$t$ が $0$ の近傍を動く場合、$\theta(t)=t,\phi(t)=\psi(t)=0$ という角の指定は $t<0$ で標準範囲を外れますが、$R(t)$ も角速度 $\omega_b=e_2$ も滑らかです。$0\le\theta\le\pi$ の代表へ戻すには $t<0$ 側で別の角の枝を選ぶ必要があり、角度座標の飛びを運動の不連続と読み違えてはいけません。

このような端点付近の積分では $\dot q=T^{-1}\omega_b$ によるEuler角更新が不安定になります。次講 **RBD5** では単位四元数による姿勢表示を使い、この角度座標の特異性を回避します。ただし四元数にも $q$ と $-q$ が同じ回転を表す二重性があります。

## 7. 演習と詳細解答

### Level A

### 問題 A1：回転順序を追う

$R=R_z(\pi/2)R_y(\pi/2)R_z(0)$ について $Re_3$ と $Re_1$ を求め、$R\in SO(3)$ を確かめよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$R_z(0)=I_3$。まず $R_y(\pi/2)e_3=e_1$、$R_y(\pi/2)e_1=-e_3$ です。次に $R_z(\pi/2)e_1=e_2$、$R_z(\pi/2)e_3=e_3$ より

$$
Re_3=e_2,\qquad Re_1=-e_3.
$$

各因子の列は正規直交、行列式 $1$ であり、$R^{\mathsf T}R=I_3$、$\det R=1\cdot1\cdot1=1$ です。従って [RBD1 の定義](../RBD1/index.md#def-rbd1-proper-rotation)を満たします。
<!-- solution-end -->

### 問題 A2：同じ姿勢を表す二組

ZYZ の $\theta=0$ で $(\phi,\psi)=(\pi/4,\pi/6)$ と同じ姿勢を表す別の組を一つ示せ。$\theta=\pi$ で $(\phi,\psi)=(\pi/2,\pi/3)$ と同じ姿勢を表す別の組も一つ示せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\theta=0$ では [特異姿勢の式](#prop-rbd4-coordinate-singularity)より和 $\phi+\psi=5\pi/12$ だけが決まります。例えば $(\phi,\psi)=(5\pi/12,0)$ が同じ姿勢です。

$\theta=\pi$ では差 $\phi-\psi=\pi/6$ が決まります。例えば $(\phi,\psi)=(\pi/6,0)$ とすれば、いずれも $R_z(\pi/6)R_y(\pi)$ です。和と差を取り違えないことが重要です。
<!-- solution-end -->

### 問題 A3：角速度の単純な場合

$\psi=0$、$\theta=\pi/2$ の瞬間に $\dot\phi=2,\dot\theta=3,\dot\psi=5$ とする。$\omega_b$ と $\omega_s$ を求めよ。ただしその瞬間の $\phi=0$ とする。

- Level: A

<!-- solution-start -->
### 詳細解答

[角速度変換](#prop-rbd4-angular-velocity)に $\sin\theta=1,\cos\theta=0,\sin\psi=0,\cos\psi=1$ を代入して

$$
\omega_b=(-2,3,5)^{\mathsf T}.
$$

その瞬間 $R=R_y(\pi/2)$ なので $R(x,y,z)^{\mathsf T}=(z,y,-x)^{\mathsf T}$。従って [RBD3 の対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)から

$$
\omega_s=R\omega_b=(5,3,2)^{\mathsf T}.
$$

空間成分の直接式へ $\phi=0$ を入れても同じ結果です。
<!-- solution-end -->

### 問題 A4：角速度がゼロになる角度速度

$\theta=0$ のとき $\dot\phi=4,\dot\theta=0,\dot\psi=-4$、$\theta=\pi$ のとき $\dot\phi=4,\dot\theta=0,\dot\psi=4$ とする。それぞれ $\omega_b$ を求めよ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\theta=0$ なら $\sin\theta=0,\cos\theta=1$ なので [角速度変換](#prop-rbd4-angular-velocity)から $\omega_b=(0,0,4-4)^{\mathsf T}=0$。

$\theta=\pi$ では $\sin\theta=0,\cos\theta=-1$ より $\omega_b=(0,0,-4+4)^{\mathsf T}=0$。角度速度は非零でも姿勢は一次的には変化しません。
<!-- solution-end -->

### 問題 A5：Euler角を姿勢行列から読む

$R=R_z(\pi/3)R_y(\pi/2)R_z(\pi/4)$ に対し $R_{13},R_{23},R_{31},R_{32},R_{33}$ を計算し、正則域の復元式で角度を取り戻せ。

- Level: A

<!-- solution-start -->
### 詳細解答

$\sin\theta=1,\cos\theta=0$ なので [行列成分の式](#prop-rbd4-coordinate-singularity)を適用すると

$$
R_{13}=\tfrac12,\quad
R_{23}=\tfrac{\sqrt3}{2},\quad
R_{31}=-\tfrac{\sqrt2}{2},\quad
R_{32}=\tfrac{\sqrt2}{2},\quad R_{33}=0.
$$

$\theta=\arccos0=\pi/2$。$\phi=\operatorname{atan2}(\sqrt3/2,1/2)=\pi/3$、$\psi=\operatorname{atan2}(\sqrt2/2,\sqrt2/2)=\pi/4$。$\sin\theta>0$ なので符号の曖昧さはありません。
<!-- solution-end -->

### Level B

### 問題 B1：ヤコビ行列の行列式を検算する

$\omega_b=T(\theta,\psi)\dot q$ の $T$ を [角速度命題](#prop-rbd4-angular-velocity)から組み立て、$\det T$ と $\theta=0,\pi$ の階数・零方向を求めよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$\dot\phi,\dot\theta,\dot\psi$ の係数を物体角速度の各成分から縦に読み取ります。

$$
T=\begin{pmatrix}-s_\theta c_\psi&s_\psi&0\\
s_\theta s_\psi&c_\psi&0\\c_\theta&0&1\end{pmatrix}.
$$

ここで $s_\theta=\sin\theta,c_\theta=\cos\theta$ 等と略記しました。第三列で展開すると

$$
\det T=(-s_\theta c_\psi)c_\psi-(s_\psi)(s_\theta s_\psi)
=-s_\theta(c_\psi^2+s_\psi^2)=-s_\theta.
$$

$\theta=0$ なら第一列 $e_3$ と第三列 $e_3$ が一致し、第二列は水平面上の長さ1のベクトルなので階数2、零方向 $(1,0,-1)$。$\theta=\pi$ なら第一列 $-e_3$、第三列 $e_3$ なので階数2、零方向 $(1,0,1)$ です。
<!-- solution-end -->

### 問題 B2：角度速度への逆変換を自力で作る

$\theta=\pi/3,\psi=0$、$\omega_b=(2,3,4)^{\mathsf T}$ とする。$\dot\phi,\dot\theta,\dot\psi$ を求め、元の $T$ を掛けて検算せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$0<\pi/3<\pi$ なので [逆変換定理](#thm-rbd4-regular-inverse)を適用できます。$\sin\theta=\sqrt3/2,\cos\theta=1/2,\sin\psi=0,\cos\psi=1$ だから

$$
\dot\phi=-\frac{2}{\sqrt3/2}=-\frac4{\sqrt3},\quad
\dot\theta=3,\quad
\dot\psi=4-\tfrac12(-4/\sqrt3)=4+\frac2{\sqrt3}.
$$

元へ代入すれば

$$
\begin{aligned}
\omega_{b1}&=-(\sqrt3/2)(-4/\sqrt3)=2,\\
\omega_{b2}&=3,\\
\omega_{b3}&=\tfrac12(-4/\sqrt3)+(4+2/\sqrt3)=4.
\end{aligned}
$$

三成分すべてが一致します。
<!-- solution-end -->

### 問題 B3：端点の近くで何が大きくなるか

$\psi=0$、$0<\theta<\pi$、$\omega_b=e_1$ とする。$\dot q$ を求め、$\theta\to0^+$ における主要な大きさと、姿勢そのものの行列式を述べよ。

- Level: B

<!-- solution-start -->
### 詳細解答

[逆変換定理](#thm-rbd4-regular-inverse)へ $\omega_{b1}=1,\omega_{b2}=\omega_{b3}=0$ を入れると

$$
\dot q=(-1/\sin\theta,\ 0,\ \cos\theta/\sin\theta)^{\mathsf T}.
$$

$\sin\theta/\theta\to1$、$\cos\theta\to1$ なので、第一成分は $-1/\theta$、第三成分は $1/\theta$ が主要項です。しかし $\omega_b=T\dot q=e_1$ は一定で有限です。各 $R_z,R_y$ の行列式は1だから $\det R=1$ のままであり、ゼロに近づくのは $\det T=-\sin\theta$ です。
<!-- solution-end -->

### 問題 B4：角度の枝の不連続

$t\in(-\varepsilon,\varepsilon)$ で $R(t)=R_y(t)$ とする（$0<\varepsilon<\pi$）。$t>0$ と $t<0$ でそれぞれ $0\le\theta\le\pi$ の ZYZ 表示を示し、$R(t)$ と $\omega_b$ が連続であることを証明せよ。

- Level: B

<!-- solution-start -->
### 詳細解答

$t>0$ では $(\phi,\theta,\psi)=(0,t,0)$ と取れます。$t<0$ では正の章動角 $-t$ を使い

$$
R_y(t)=R_z(\pi)R_y(-t)R_z(\pi)
$$

です。右辺を掛けると $R_z(\pi)R_y(-t)R_z(\pi)=R_y(t)$ であることが、$x,z$ 平面の成分から確認できます。従って $(\pi,-t,\pi)$ が標準範囲の表示です。

角度組は $t=0$ の左右で飛びますが $R(t)=R_y(t)$ 自体は三角関数の滑らかな行列です。$R^{\mathsf T}\dot R=\widehat{e_2}$ より [RBD3 の空間角速度と物体角速度](../RBD3/index.md#def-rbd3-angular-velocity)で $\omega_b=e_2$ が両側で一致します。角度代表の不連続は物理的な不連続ではありません。
<!-- solution-end -->

### Level C

### 問題 C1：姿勢の復元、角速度、特異点を一体で調べる

$C^1$ 級の姿勢 $R(t)=R_z(\phi(t))R_y(\theta(t))R_z(\psi(t))$ を考える。ある時刻 $t_*$ で $\phi=0,\theta=\pi/2,\psi=\pi/2$、$\dot\phi=1,\dot\theta=2,\dot\psi=3$ とする。

1. $R(t_*)$ の三列を求めて正規直交性・行列式を確認せよ。
2. $\omega_b(t_*)$ を計算し、$\omega_s=R\omega_b$ を求めよ。
3. $\omega_s$ を空間角速度の直接式でも計算し、(2)と一致することを示せ。
4. $\theta$ を $0$ に動かして $\phi+\psi$ を固定した場合に同じ姿勢を与える二組を作り、$\dot\phi$ と $\dot\psi$ が独立に回転を決めなくなる理由を説明せよ。

- Level: C

<!-- solution-start -->
### 詳細解答

**(1)** $\psi=\pi/2$ なので $R_z(\psi)e_1=e_2$、$R_z(\psi)e_2=-e_1$。続いて $R_y(\pi/2)e_1=-e_3$、$R_y(\pi/2)e_2=e_2$、$R_y(\pi/2)e_3=e_1$。$\phi=0$ は回転させないので

$$
R(t_*)=\begin{pmatrix}
0&0&1\\
1&0&0\\
0&1&0
\end{pmatrix}.
$$

三列は $e_2,e_3,e_1$ です。それぞれ長さ1、異なる列は内積0なので $R^{\mathsf T}R=I_3$。行列式を第1行第3列の成分 $1$ に沿って展開すると $\det R=(-1)^{1+3}(1\cdot1-0\cdot0)=+1$ です。

**(2)** [角速度変換命題](#prop-rbd4-angular-velocity)で $\sin\theta=1,\cos\theta=0,\sin\psi=1,\cos\psi=0$ を代入すると

$$
\omega_b=(2,1,3)^{\mathsf T}.
$$

(1) の行列を掛けて

$$
\omega_s=R\omega_b=(3,2,1)^{\mathsf T}.
$$

ここでは [RBD3 の空間・物体対応](../RBD3/index.md#prop-rbd3-angular-conjugacy)を使いました。

**(3)** 空間成分の命題へ $\phi=0,\theta=\pi/2$ を代入すると

$$
\omega_s=(-\dot\theta\sin0+\dot\psi\cos0,\ 
\dot\theta\cos0+\dot\psi\sin0,\ 
\dot\phi+\dot\psi\cos(\pi/2))^{\mathsf T}
=(3,2,1)^{\mathsf T}.
$$

(2)と一致し、基底を混同していないことが分かります。

**(4)** $\theta=0$ なら $R_z(\phi)R_z(\psi)=R_z(\phi+\psi)$。例えば $(\phi,\theta,\psi)=(0,0,\pi/2)$ と $(\pi/4,0,\pi/4)$ はともに $R_z(\pi/2)$ を与えます。時間変化についても $\dot R$ は $\dot\phi+\dot\psi$ だけで決まり、$(\dot\phi,\dot\psi)\mapsto(\dot\phi+h,\dot\psi-h)$ で同じ角速度です。[特異性命題](#prop-rbd4-coordinate-singularity)の零方向 $(1,0,-1)$ がこの不定性を表し、回転行列 $R$ の正則性は失われません。
<!-- solution-end -->

## 8. 次講への接続

三つの角度で姿勢を読み、行列の微分から角速度を計算できました。一方で $\theta=0,\pi$ では角度速度への逆変換が破綻します。次の **RBD5 四元数による姿勢表現**では、Euler角の分母 $\sin\theta$ を使わず回転を表して更新します。
