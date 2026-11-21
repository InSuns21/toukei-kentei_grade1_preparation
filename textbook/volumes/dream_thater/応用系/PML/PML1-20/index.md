# PML1-20 連続系の保存則と数値積分での保存は同じか

## 1. 連続時間の保存則を、離散時間へ移してよいか

[正準 Hamiltonian neural network](../PML1-18/index.md#def-pml1-18-hnn) は、学習した関数 $H_\theta$ から Hamilton の正準方程式を作る。[HNN の連続時間保存定理](../PML1-18/index.md#thm-pml1-18-energy)も、[LNN の連続エネルギー収支](../PML1-19/index.md#prop-pml1-19-energy)も、**微分方程式を正確に満たす曲線**を対象とする。コンピュータで有限時間刻みずつ進む予測軌道については、別の計算が必要だ。

質量 $m>0$、ばね定数 $k>0$ の調和振動子を考える。位置 $q\in\mathbb R$、運動量 $p\in\mathbb R$、時刻に依存しない Hamiltonian を

$$
H(q,p)=\frac{p^2}{2m}+\frac{kq^2}{2}
$$

とする。[Hamilton の正準方程式](../../../物理系/AMECH/AMECH5/index.md#thm-amech5-hamilton-equations)は $\dot q=p/m,\ \dot p=-kq$ である。連続軌道上の微分は

$$
\frac{dH}{dt}
=kq\dot q+\frac pm\dot p
=kq\frac pm+\frac pm(-kq)=0.
$$

一方、時刻 $t_n=nh$（刻み幅 $h>0$）の近似状態 $z_n=(q_n,p_n)$ は、一歩更新を反復して計算する。この講義では、元の $H$ の保存、相平面の面積保存、長時間の有界性をそれぞれ検査する。

## 2. 一歩を決める二つの方法

一段法は現在の状態から次の状態を一意に作る操作である。まず現在の速度と力を**同時**に使う陽的 Euler 法を考え、その後、運動量を先に計算してから新しい運動量で位置を動かす方法を考える。

<a id="def-pml1-20-one-step"></a>

<!-- formal-statement-start -->
> **定義（一段数値更新写像）**  
> $D\subset\mathbb R^2$、刻み幅 $h>0$ と写像 $\Phi_h:D\to D$ を与える。初期値 $z_0\in D$ から次の反復で列を定める。

$$
z_{n+1}=\Phi_h(z_n).
$$

> この列を離散軌道、$\Phi_h$ を一段数値更新写像と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-20-one-step -->
**定義の確認**。 $D=\mathbb R^2$、$h>0$ とし、$\Phi_h(q,p)=(q+hp/m,\ p-hkq)$ と置く。任意の入力と出力がともに $\mathbb R^2$ に入る。$(q_0,p_0)=(1,0)$ なら $z_1=(1,-hk)$、さらに $z_2=(1-h^2k/m,-2hk)$。状態が領域から出ないので反復できる。
<!-- definition-example-end -->

<a id="def-pml1-20-explicit-euler"></a>

<!-- formal-statement-start -->
> **定義（調和振動子の陽的 Euler 法）**  
> $m,k,h>0$、$(q_n,p_n)\in\mathbb R^2$ に対し

$$
q_{n+1}=q_n+\frac hm p_n,\qquad
p_{n+1}=p_n-hkq_n
$$

> で更新する。両方の右辺が時刻 $n$ の値のみを使う。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-20-explicit-euler -->
**定義の確認**。 $m=k=1$、$h=1/5$、$z_0=(1,0)$ なら、$z_1=(1,-1/5)$ となる。$q$ と $p$ は更新前の値を使う。
<!-- definition-example-end -->

<a id="def-pml1-20-symplectic-euler"></a>

<!-- formal-statement-start -->
> **定義（運動量先行 symplectic Euler 法）**  
> $m,k,h>0$、$(q_n,p_n)\in\mathbb R^2$ に対し、まず運動量、次に位置の順で

$$
p_{n+1}=p_n-hkq_n,\qquad
q_{n+1}=q_n+\frac hm p_{n+1}
$$

> と更新する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-pml1-20-symplectic-euler -->
**定義の確認**。 同じ $m=k=1$、$h=1/5$、$z_0=(1,0)$ では、$p_1=-1/5$ を先に算出し、$q_1=1+(1/5)(-1/5)=24/25$。陽的 Euler と異なり新しい運動量を使う。名前の symplectic の意味は次節で相平面の面積から確認する。
<!-- definition-example-end -->

## 3. 通常 Euler 法では何が壊れるか

線形更新は $z_{n+1}=Az_n$ と行列表示できる。入力の $q,p$ の係数をそれぞれ行列の第1列・第2列に並べればよい。相平面の小領域をどれだけ拡大するかは、この行列の行列式の絶対値から分かる。

<a id="prop-pml1-20-explicit-drift"></a>

<!-- formal-statement-start -->
> **命題（陽的 Euler 法の面積拡大とエネルギー増大）**  
> $m,k,h>0$ の調和振動子について、陽的 Euler 更新行列は

$$
A_{\mathrm E}=\begin{pmatrix}1&h/m\\-hk&1\end{pmatrix}
$$

> であり、$\det A_{\mathrm E}=1+h^2k/m>1$。さらに任意の初期状態について

$$
H(z_n)=\left(1+\frac{h^2k}{m}\right)^n H(z_0)
\qquad(n\ge0)
$$

> が成立する。
<!-- formal-statement-end -->

**証明の見取り図。** 行列式を展開し、エネルギーの二つの平方を更新式に代入する。交差項の相殺が核心となる。

<!-- proof-start -->
### 証明

$A_{\mathrm E}$ は定義の更新式から得られ、その行列式は $1-(h/m)(-hk)=1+h^2k/m$。エネルギーについては

$$
\begin{aligned}
2H(z_{n+1})
&=\frac1m(p_n-hkq_n)^2
  +k\left(q_n+\frac hm p_n\right)^2\\
&=\frac{p_n^2}{m}-\frac{2hk}{m}p_nq_n
 +\frac{h^2k^2}{m}q_n^2\\
&\quad +kq_n^2+\frac{2hk}{m}q_np_n
 +\frac{h^2k}{m^2}p_n^2\\
&=\left(1+\frac{h^2k}{m}\right)
 \left(\frac{p_n^2}{m}+kq_n^2\right).
\end{aligned}
$$

従って一歩ごとに一定倍率を掛ける。$n=0$ の式を出発点に帰納的に $n$ 回掛ければ主張を得る。
<!-- proof-end -->

これは [HNN の陽的 Euler ドリフト例](../PML1-18/index.md#prop-pml1-18-euler)を任意の $m,k$ と反復回数へ具体化したものである。連続軌道の保存則が破れたのではなく、離散更新が別の写像になった。

## 4. 位相面積は保ってもエネルギーは保たない

正確な Hamiltonian flow は[Liouville の定理](../../../物理系/AMECH/AMECH6/index.md#thm-amech6-liouville)の条件下で位相体積を保存する。数値更新でも、二変数の Jacobian 行列式が $1$ かを直接検査する。Jacobian は各点近傍の面積倍率を表すが、領域全体の面積保存には更新が一対一で、逆向きにも滑らかに戻せることが要る。最初は一般の**分離形** $H(q,p)=T(p)+V(q)$ に進もう。ここで $T,V$ は二階連続微分可能な実数値関数である。

<a id="thm-pml1-20-area"></a>

<!-- formal-statement-start -->
> **定理（分離形 Hamiltonian の symplectic Euler 面積保存）**  
> $T,V\in C^2(\mathbb R)$、$h>0$ とする。分離形 Hamiltonian $H(q,p)=T(p)+V(q)$ の運動量先行更新を

$$
p'=p-hV'(q),\qquad q'=q+hT'(p')
$$

> とすると、写像 $\Phi_h(q,p)=(q',p')$ とその逆写像はともに $C^1$ 級であり、$\det D\Phi_h(q,p)=1$ をすべての点で満たす。従って任意の面積有限な可測集合の面積を保存する。
<!-- formal-statement-end -->

**証明の見取り図。** 先に $p$ だけを動かす写像、次に $q$ だけを動かす写像へ分解する。二つの Jacobian 行列式と逆写像を明示する。

<!-- proof-start -->
### 証明

$S_p(q,p)=(q,p-hV'(q))$ と $S_q(q,\widetilde p)=(q+hT'(\widetilde p),\widetilde p)$ を置く。$\Phi_h=S_q\circ S_p$。座標順を $(q,p)$ として

$$
DS_p=\begin{pmatrix}1&0\\-hV''(q)&1\end{pmatrix},
\qquad
DS_q=\begin{pmatrix}1&hT''(\widetilde p)\\0&1\end{pmatrix}.
$$

両方の行列式は $1$。連鎖律で

$$
D\Phi_h(q,p)=DS_q(q,p')DS_p(q,p),
\qquad\det D\Phi_h=1.
$$

逆写像は、出力 $(q',p')$ から $q=q'-hT'(p')$、続いて $p=p'+hV'(q)$ と順に求められる。$C^2$ の仮定から写像と逆写像は $C^1$。この一対一の滑らかな座標変換に面積の変数変換公式を適用し、各点での面積倍率 $|\det D\Phi_h|=1$ を使うと

$$
\operatorname{area}(\Phi_h(B))
=\int_B|\det D\Phi_h(q,p)|\,dq\,dp
=\operatorname{area}(B)
$$

となる。
<!-- proof-end -->

二変数では面積保存と symplectic 条件が一致するが、四変数以上では行列式が $1$ という一条件だけでは不十分である。高次元の構造までこの面積計算だけで証明したことにはならない。

<a id="prop-pml1-20-area-not-energy"></a>

<!-- formal-statement-start -->
> **命題（面積保存は元のエネルギー保存を含意しない）**  
> $m=k=1$、$h=1/5$、初期状態 $(1,0)$ の調和振動子で運動量先行 symplectic Euler を一歩適用すると、面積は保存する一方で、元の $H(q,p)=(q^2+p^2)/2$ は変化する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

更新は $p_1=-1/5$、$q_1=1+(1/5)(-1/5)=24/25$。従って

$$
H(z_0)=\frac12,\qquad
H(z_1)=\frac12\left(\frac{576}{625}+\frac1{25}\right)
=\frac{601}{1250}\ne\frac12.
$$

しかし $T(p)=p^2/2$、$V(q)=q^2/2$ は前定理の仮定を満たすので $\det D\Phi_h=1$。二つの保存条件は同値ではない。
<!-- proof-end -->

## 5. 修正エネルギーを自力で構成する

元の $H$ が毎歩変化することは分かった。それでも小さい刻み幅なら symplectic Euler の軌道が遠くへ飛んでいかないことを説明したい。

振動数 $\omega=\sqrt{k/m}$ と無次元刻み $s=h\omega$ を導入する。変数を $x=\sqrt{k}\,q$、$y=p/\sqrt m$ と置けば $2H=x^2+y^2$ となる。新しい座標はエネルギーを円の式にするための表示であり、元の正準座標 $(q,p)$ と同じ単位ではない。

定義の二つの更新式に代入すると

$$
y_{n+1}=y_n-sx_n,\qquad
x_{n+1}=x_n+sy_{n+1}=(1-s^2)x_n+sy_n.
$$

したがって

$$
u_{n+1}=A_su_n,\qquad
u_n=\begin{pmatrix}x_n\\y_n\end{pmatrix},
\quad
A_s=\begin{pmatrix}1-s^2&s\\-s&1\end{pmatrix}.
$$

<a id="thm-pml1-20-modified-energy"></a>

<!-- formal-statement-start -->
> **定理（調和振動子の修正エネルギーと一様有界性）**  
> $m,k,h>0$、$s=h\sqrt{k/m}$ とする。運動量先行 symplectic Euler の離散軌道は、二次形式

$$
\widetilde H_h(q,p)
=\frac{p^2}{2m}+\frac{kq^2}{2}-\frac{hk}{2m}qp
$$

> を全ステップで厳密に保存する。$0<s<2$ なら $\widetilde H_h$ は正定値で、元のエネルギー $H(z_n)$ は次の $n$ に依らない上下界を満たす。

$$
\frac{\widetilde H_h(z_0)}{1+s/2}
\le H(z_n)\le
\frac{\widetilde H_h(z_0)}{1-s/2}.
$$
<!-- formal-statement-end -->

**証明の見取り図。** 二次形式を行列表示して $A_s^{\mathsf T}G_sA_s=G_s$ を直接検算する。正定値性は平方完成、上下界は $2|xy|\le x^2+y^2$ で得られる。

<!-- proof-start -->
### 証明

$x=\sqrt k\,q$、$y=p/\sqrt m$ により

$$
\widetilde H_h=\frac12(x^2+y^2-sxy)
=\frac12u^{\mathsf T}G_su,\qquad
G_s=\begin{pmatrix}1&-s/2\\-s/2&1\end{pmatrix}.
$$

行列を順に掛けると

$$
G_sA_s=
\begin{pmatrix}
1-s^2/2&s/2\\
-s(3-s^2)/2&1-s^2/2
\end{pmatrix}.
$$

$A_s^{\mathsf T}$ の各行との内積を取る。$(1,1)$ 成分は

$$
(1-s^2)(1-s^2/2)+s^2(3-s^2)/2=1;
$$

$(1,2)$ 成分は $(1-s^2)s/2-s(1-s^2/2)=-s/2$、$(2,1)$ も $-s/2$、$(2,2)$ は $s^2/2+(1-s^2/2)=1$。従って

$$
A_s^{\mathsf T}G_sA_s=G_s,
\qquad
\widetilde H_h(u_{n+1})
=\frac12u_n^{\mathsf T}A_s^{\mathsf T}G_sA_su_n
=\widetilde H_h(u_n).
$$

帰納法により全 $n$ の保存が従う。さらに

$$
2\widetilde H_h=(x-sy/2)^2+(1-s^2/4)y^2.
$$

$0<s<2$ なら右辺は非零状態で正なので正定値である。$2|xy|\le x^2+y^2=2H$ より

$$
\left(1-\frac s2\right)H
\le\widetilde H_h
\le\left(1+\frac s2\right)H.
$$

正の $1-s/2$ および $1+s/2$ で割り、保存値 $\widetilde H_h(z_n)=\widetilde H_h(z_0)$ を代入すると主張の上下界を得る。
<!-- proof-end -->

重要なのは**元の $H$ ではなく $\widetilde H_h$ を保存する**点と、$0<s<2$ の条件で正の二次形式が状態ノルムを抑える点である。一般の非線形系や任意の学習済み HNN へ、この特定の修正エネルギーの公式を移してはならない。

## 6. 面積保存でも大きい刻みでは発散する

<a id="prop-pml1-20-stability"></a>

<!-- formal-statement-start -->
> **命題（刻み幅と長時間有界性の境界）**  
> $s>0$ とし、次の行列を与える。

$$
A_s=\begin{pmatrix}1-s^2&s\\-s&1\end{pmatrix}.
$$

> 行列式は $1$ である。$0<s<2$ ではすべての初期値の反復列が有界、$s=2$ では無界な初期値が存在し、$s>2$ では指数的に増大する初期値が存在する。
<!-- formal-statement-end -->

**証明の見取り図。** 最初は修正エネルギーの正定値性を使う。境界では冪を直接求め、外側では固有値を計算する。

<!-- proof-start -->
### 証明

$\det A_s=(1-s^2)+s^2=1$。$0<s<2$ では前定理が $H=(x^2+y^2)/2$ の一様上界を与えるので、有界性が従う。

$s=2$ では $A_2=-I+N$、$N=\begin{pmatrix}-2&2\\-2&2\end{pmatrix}$ と書ける。掛け算で $N^2=0$ だから二項展開により $A_2^n=(-1)^n(I-nN)$。$u_0=(1,0)^{\mathsf T}$ なら $Nu_0=(-2,-2)^{\mathsf T}$ なので

$$
A_2^nu_0=(-1)^n(1+2n,2n)^{\mathsf T},
$$

これは無界である。

$s>2$ では特性多項式が $\lambda^2-(2-s^2)\lambda+1$。判別式は

$$
(2-s^2)^2-4=s^2(s^2-4)>0.
$$

相異なる実固有値の積は $1$、和は $2-s^2<-2$ なので両方負で、一方は $-1$ 未満。その固有ベクトルを初期値に取れば、反復の大きさは $|\lambda|^n$ に比例して増大する。
<!-- proof-end -->

面積は常に保存されても、拡大する方向と縮小する方向が打ち消し合うだけの場合がある。面積保存・エネルギー保存・全初期値の有界性は別々に検査する。

## 7. 同じ実験条件で数値比較する

以下の Python は、$m=k=1$、$h=0.1$、$N=1000$、初期値 $(1,0)$ を固定し、二つの離散化を比較する。外部ライブラリは不要で、表示するのは最終エネルギー、計算中の最小値・最大値、修正エネルギーの最大ずれである。

~~~python
m = k = 1.0
h, steps = 0.1, 1000
q0, p0 = 1.0, 0.0

def H(q, p):
    return p*p/(2*m) + k*q*q/2

def H_mod(q, p):
    return H(q, p) - h*k*q*p/(2*m)

def run(name):
    q, p = q0, p0
    lo = hi = H(q, p)
    initial_modified = H_mod(q, p)
    error_modified = 0.0
    for _ in range(steps):
        if name == "explicit":
            q_new, p_new = q+h*p/m, p-h*k*q
        else:
            p_new = p-h*k*q
            q_new = q+h*p_new/m
        q, p = q_new, p_new
        lo, hi = min(lo, H(q, p)), max(hi, H(q, p))
        if name == "symplectic":
            error_modified = max(
                error_modified, abs(H_mod(q, p)-initial_modified))
    return H(q, p), lo, hi, error_modified

for name in ("explicit", "symplectic"):
    print(name, run(name))
print("explicit_exact", H(q0, p0)*(1+h*h*k/m)**steps)
~~~

陽的 Euler の理論上の最終値は $H_{1000}=\frac12(1.01)^{1000}\approx10479.58$。symplectic Euler は $s=0.1<2$ なので全ステップで一様有界である。計算機では丸め誤差があるため、厳密な数学的保存と実数演算の近似を区別する。

学習済み力学の評価では、$H_\theta(z_n)-H_\theta(z_0)$（モデルの離散保存誤差）、$H_\ast(z_n)-H_\ast(z_0)$（真のエネルギーが既知な場合のずれ）、$\|z_n-z(t_n)\|$（同じ連続モデル解との状態誤差）を混ぜない。[真のエネルギーと学習モデルの相違](../PML1-18/index.md#prop-pml1-18-mismatch)は、積分法を改良しても残り得る。

## 8. 演習 Level A

<a id="ex-pml1-20-a01"></a>

### PML1-20-A01 二つの一歩
- Level: A

$m=k=1$、$h=1/2$、$z_0=(1,0)$ とする。両方式の $z_1$ と元のエネルギー $H_1$ を求めよ。

<!-- solution-start -->
#### 詳細解答

陽的 Euler は $q_1=1+(1/2)0=1$、$p_1=0-(1/2)1=-1/2$。従って $H_1=(1+1/4)/2=5/8$。運動量先行法は $p_1=-1/2$ の後、$q_1=1+(1/2)(-1/2)=3/4$、従って $H_1=(9/16+1/4)/2=13/32$。初期 $H_0=1/2$ と比べ、変化の符号まで異なる。
<!-- solution-end -->

<a id="ex-pml1-20-a02"></a>

### PML1-20-A02 更新行列と行列式
- Level: A

$m=2,k=3,h=1/4$ について、陽的 Euler と運動量先行法の更新行列と行列式を計算せよ。

<!-- solution-start -->
#### 詳細解答

$h/m=1/8$、$hk=3/4$、$h^2k/m=3/32$。従って

$$
A_{\mathrm E}=\begin{pmatrix}1&1/8\\-3/4&1\end{pmatrix},
\quad\det A_{\mathrm E}=35/32.
$$

運動量先行では $p'=p-3q/4$ を $q'=q+p'/8$ へ代入し、$q'=(29/32)q+p/8$ を得る。よって

$$
A_{\mathrm S}=\begin{pmatrix}29/32&1/8\\-3/4&1\end{pmatrix},
\quad \det A_{\mathrm S}=29/32+3/32=1.
$$
<!-- solution-end -->

<a id="ex-pml1-20-a03"></a>

### PML1-20-A03 修正エネルギーの直接代入
- Level: A

$m=k=1,h=1/2,z_0=(1,0)$ の運動量先行法について、修正エネルギー $\widetilde H_h=(p^2+q^2-hqp)/2$ の前後の値を求めよ。

<!-- solution-start -->
#### 詳細解答

A01 より $z_1=(3/4,-1/2)$。初期値では $\widetilde H_h(z_0)=1/2$。一歩後は

$$
2\widetilde H_h(z_1)
=\frac9{16}+\frac14-\frac12\frac34\left(-\frac12\right)
=\frac9{16}+\frac4{16}+\frac3{16}=1.
$$

従って $\widetilde H_h(z_1)=1/2$。元の $H_1=13/32$ とは異なる。
<!-- solution-end -->

<a id="ex-pml1-20-a04"></a>

### PML1-20-A04 刻み幅条件と単位
- Level: A

$m=4,k=9$ の振動子で、修正エネルギーが正定値となる $h>0$ の範囲を求め、$h=1$ と $h=3/2$ を比較せよ。

<!-- solution-start -->
#### 詳細解答

$\omega=\sqrt{k/m}=3/2$。$0<h\omega<2$ より $0<h<4/3$。$h=1$ なら $s=3/2<2$ で正定値、$h=3/2$ なら $s=9/4>2$ で正定値ではない。判定するのは $h$ 単独でなく無次元積 $h\omega$ である。
<!-- solution-end -->

<a id="ex-pml1-20-a05"></a>

### PML1-20-A05 面積とエネルギーは違う
- Level: A

$s=2$ に対して $A_s$ と $A_s(1,0)^{\mathsf T}$、行列式、$H_1/H_0$ を計算せよ（$H=(x^2+y^2)/2$）。

<!-- solution-start -->
#### 詳細解答

$A_2=\begin{pmatrix}-3&2\\-2&1\end{pmatrix}$、$A_2(1,0)^{\mathsf T}=(-3,-2)^{\mathsf T}$。行列式は $-3+4=1$。一方 $H_0=1/2$、$H_1=(9+4)/2=13/2$ だから $H_1/H_0=13$。面積保存がエネルギー上界を与えるわけではない。
<!-- solution-end -->

## 9. 演習 Level B

<a id="ex-pml1-20-b01"></a>

### PML1-20-B01 非線形分離形で面積を証明
- Level: B

$T(p)=p^4/4$、$V(q)=q^2/2$ とし、$h>0$、$p'=p-hq$、$q'=q+h(p')^3$ と更新する。Jacobian、逆写像、行列式を導け。また $h=1$、$(q,p)=(1,0)$ で元の $H=T+V$ は保存されるか。

<!-- solution-start -->
#### 詳細解答

$p'_q=-h$、$p'_p=1$。連鎖律で $q'_q=1+3h(p')^2(-h)=1-3h^2(p')^2$、$q'_p=3h(p')^2$。従って

$$
D\Phi_h=\begin{pmatrix}
1-3h^2(p')^2&3h(p')^2\\-h&1
\end{pmatrix},
\quad
\det D\Phi_h=1.
$$

逆向きには $q=q'-h(p')^3$ を先に、$p=p'+hq$ を後に求める。両方向とも滑らかなので微分同相であり、面積を保つ。一方 $h=1$、$(1,0)$ では $p'=-1$、$q'=0$、$H_0=1/2$、$H_1=1/4$ で元の $H$ は保存されない。
<!-- solution-end -->

<a id="ex-pml1-20-b02"></a>

### PML1-20-B02 位置先行の更新では何を保存するか
- Level: B

$m,k,h>0$ とし、まず $q'=q+hp/m$、続いて $p'=p-hkq'$ とする位置先行 symplectic Euler 法を考える。更新行列・行列式と、保存する修正エネルギーを導け。

<!-- solution-start -->
#### 詳細解答

$p'=p-hk(q+hp/m)=-hkq+(1-h^2k/m)p$ より

$$
A_{\mathrm Q}=\begin{pmatrix}1&h/m\\-hk&1-h^2k/m\end{pmatrix},
\quad\det A_{\mathrm Q}=1.
$$

$x=\sqrt{k}q$、$y=p/\sqrt m$、$s=h\sqrt{k/m}$ を使えば、$x'=x+sy,\ y'=-sx+(1-s^2)y$。$B_s=\begin{pmatrix}1&s\\-s&1-s^2\end{pmatrix}$ とすると直接の行列積で

$$
B_s^{\mathsf T}
\begin{pmatrix}1&s/2\\s/2&1\end{pmatrix}
B_s=\begin{pmatrix}1&s/2\\s/2&1\end{pmatrix}
$$

となる。従って保存する二次形式は

$$
\widetilde H_h^{(\mathrm Q)}
=\frac12(x^2+y^2+sxy)
=H(q,p)+\frac{hk}{2m}qp.
$$

運動量先行の修正エネルギーと交差項の符号が逆である。
<!-- solution-end -->

<a id="ex-pml1-20-b03"></a>

### PML1-20-B03 長時間の上界
- Level: B

$m=k=1,h=1/10,z_0=(1,0)$ とする。陽的 Euler の $H_N$ を求め、symplectic Euler の修正エネルギーと元の $H_N$ の上下界を求めよ。どちらが $N$ に依存するか。

<!-- solution-start -->
#### 詳細解答

陽的 Euler の倍率は $1+h^2=101/100$ だから

$$
H_N=\frac12(101/100)^N.
$$

一方、運動量先行では $s=1/10$、$\widetilde H_h(z_0)=1/2$。[調和振動子の修正エネルギーと一様有界性](#thm-pml1-20-modified-energy)より

$$
\frac{1/2}{1+1/20}=\frac{10}{21}
\le H_N\le
\frac{1/2}{1-1/20}=\frac{10}{19}.
$$

陽的 Euler は $N$ とともに指数的に大きくなり、symplectic Euler の上下界は $N$ に依存しない。しかし後者の $H_N$ が一定という主張ではない。
<!-- solution-end -->

<a id="ex-pml1-20-b04"></a>

### PML1-20-B04 正定値条件を平方完成で検証
- Level: B

$Q_s(x,y)=x^2+y^2-sxy$ とする。$0<s<2$、$s=2$、$s>2$ の各場合に正定値性を判定し、非正定値の場合は非零の反例を挙げよ。

<!-- solution-start -->
#### 詳細解答

$$
Q_s(x,y)=(x-sy/2)^2+(1-s^2/4)y^2.
$$

$0<s<2$ では両係数が正で、零は $(0,0)$ に限る。$s=2$ では $Q_2=(x-y)^2$ で、$(1,1)$ でも零となる。$s>2$ では $(x,y)=(s/2,1)$ に対して $Q_s=1-s^2/4<0$。不変量があるという事実だけでは、状態の長時間有界性を証明できない。
<!-- solution-end -->

## 10. 演習 Level C

<a id="ex-pml1-20-c01"></a>

### PML1-20-C01 学習済みモデルと真のエネルギーを分けて検算
- Level: C

真のエネルギーは $H_\ast(q,p)=(p^2+q^2)/2$、学習済みモデルは $H_\theta(q,p)=(p^2+4q^2)/2$。初期値 $z_0=(1,0)$、刻み $h>0$ に対し、モデルから運動量先行 symplectic Euler で予測する。

1. モデル連続系の Hamilton 方程式、$dH_\theta/dt$ と $dH_\ast/dt$ を求めよ。
2. 一歩後の $(q_1,p_1)$ と、二つのエネルギーの初期値との差をそれぞれ求めよ。
3. 数値更新行列の行列式と修正エネルギーを示し、正定値となる $h$ の範囲を求めよ。
4. $h=1$ での修正エネルギーを平方として表し、なぜ有界性を保証できないか説明せよ。
5. 保存構造の保証、数値積分による誤差、モデルと真値の不一致を区別して結論を述べよ。

<!-- solution-start -->
#### 詳細解答

**(1)** $\partial_pH_\theta=p$、$\partial_qH_\theta=4q$ なので $\dot q=p$、$\dot p=-4q$。連鎖律から

$$
\frac{dH_\theta}{dt}=4qp+p(-4q)=0,\qquad
\frac{dH_\ast}{dt}=qp+p(-4q)=-3qp.
$$

後者は一般に零でない。

**(2)** まず $p_1=0-4h\cdot1=-4h$、次に $q_1=1+h(-4h)=1-4h^2$。モデルエネルギーは

$$
H_\theta(z_1)=\frac{16h^2}{2}+2(1-4h^2)^2
=8h^2+2-16h^2+32h^4
=2-8h^2+32h^4.
$$

初期 $H_\theta(z_0)=2$ との差は $-8h^2+32h^4$。真のエネルギーは

$$
H_\ast(z_1)=\frac{16h^2+(1-4h^2)^2}{2}
=\frac12+4h^2+8h^4.
$$

初期 $H_\ast(z_0)=1/2$ との差は $4h^2+8h^4$ である。

**(3)** $p'=p-4hq$、$q'=q+hp'$ なので

$$
A_\theta=\begin{pmatrix}1-4h^2&h\\-4h&1\end{pmatrix},
\quad\det A_\theta=1-4h^2+4h^2=1.
$$

修正エネルギー公式へ $m=1,k=4$ を代入すると

$$
\widetilde H_{\theta,h}=\frac{p^2}{2}+2q^2-2hqp.
$$

$\omega=\sqrt{4/1}=2$、$s=2h$ なので正定値条件 $0<s<2$ は $0<h<1$ となる。

**(4)** $h=1$ なら

$$
\widetilde H_{\theta,1}=\frac12(p^2+4q^2-4qp)
=\frac12(p-2q)^2.
$$

非零状態 $(q,p)=(1,2)$ に対しても零となり、状態の大きさを下から抑えられない。さらに $s=2$ は前命題の無界な反復が存在する境界である。

**(5)** 連続モデルが保存するのは $H_\theta$ で、学習した係数 $4$ が真の係数 $1$ と一致することは保証しない。離散法は $H_\theta$ ですら一歩で変えるが、$\widetilde H_{\theta,h}$ は保存する。真のエネルギーのモデル軌道上の差は独立に残る。よって、構造・積分法・真値との一致は三つの別々の検査である。
<!-- solution-end -->

## 11. 次の講義へ

陽的 Euler は連続系が保存する振動子のエネルギーを一歩ずつ増幅させる。運動量先行 symplectic Euler は面積を保存し、十分小さい刻みの調和振動子では修正エネルギーの厳密保存から長時間の有界性を得られる。ただし、どの方法で積分しても学習済みモデルが真の力学であるとは限らない。次の PML1-21 では、有限の観測から動力学を同定するときに失われる情報を考える。
