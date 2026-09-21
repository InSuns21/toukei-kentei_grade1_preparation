# F0-00E1 内積・Gram--Schmidt・直交射影・QR

F0-00Eで基底まで準備しました。この講義では内積から直交構造を入れ、正規直交基底・射影・最小二乗・QRまでを一つの幾何としてつなぎます。

$$\boxed{\text{内積}\to\text{Gram--Schmidt}\to\text{射影}\to\text{最小二乗}\to\text{QR}}$$

---

## 1. 内積と直交

まず、長さや角度を作る元になる内積そのものを明示します。

<a id="def-f0-00e1-inner-product"></a>

<!-- formal-statement-start -->
> **定義（実内積）**  
> 実ベクトル空間 $V$ 上の写像
>
> $$
> \langle\cdot,\cdot\rangle:V\times V\to\mathbb R
> $$
>
> が任意の $x,y,z\in V$、$a,b\in\mathbb R$ に対して
>
> $$
> \langle ax+by,z\rangle
> =a\langle x,z\rangle+b\langle y,z\rangle,
> $$
>
> $$
> \langle x,y\rangle=\langle y,x\rangle,
> $$
>
> $$
> \langle x,x\rangle\ge0,
> \qquad
> \langle x,x\rangle=0\Longleftrightarrow x=0
> $$
>
> を満たすとき、これを $V$ の **内積** といいます。内積から
>
> $$
> \|x\|=\sqrt{\langle x,x\rangle}
> $$
>
> とノルムを定めます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e1-inner-product -->
### 1.1 例：$\mathbb R^n$ の標準内積

$$
\langle x,y\rangle=x^{\mathsf T}y=\sum_{i=1}^n x_i y_i
$$

と置きます。和の分配法則から線形性、積 $x_i y_i$ の対称性から対称性が成り立ちます。また

$$
\langle x,x\rangle=\sum_{i=1}^n x_i^2\ge0
$$

で、等号は全ての $x_i=0$、すなわち $x=0$ のときだけです。従って標準内積は定義の条件を実際に満たします。
<!-- definition-example-end -->

<a id="def-f0-00e1-orthogonal"></a>

<!-- formal-statement-start -->
> **定義（直交）**  
> $x,y\in V$ が
>
> $$
> \langle x,y\rangle=0
> $$
>
> を満たすとき、$x$ と $y$ は **直交** するといいます。
<!-- formal-statement-end -->

$x\perp y$ なら

$$
\begin{aligned}
\|x+y\|^2
&=\langle x+y,x+y\rangle\\
&=\|x\|^2+2\langle x,y\rangle+\|y\|^2\\
&=\boxed{\|x\|^2+\|y\|^2}.
\end{aligned}
$$

これがPythagorasの等式で、射影・最小二乗・Hilbert空間の射影定理を支えます。

---


---

## 2. 正規直交系が便利な理由

<a id="def-f0-00e1-orthonormal-system"></a>

<!-- formal-statement-start -->
> **定義（正規直交系）**  
> ベクトル $q_1,\dots,q_k$ が
>
> $$
> \langle q_i,q_j\rangle
> =
> \begin{cases}
> 1&i=j,\\
> 0&i\ne j
> \end{cases}
> $$
>
> を満たすとき、$q_1,\dots,q_k$ を **正規直交系** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e1-orthonormal-system -->
### 2.1 例：標準基底

$\mathbb R^3$ の標準基底 $e_1,e_2,e_3$ では

$$
\langle e_i,e_j\rangle
=
\begin{cases}
1&i=j,\\
0&i\ne j
\end{cases}
$$

なので、定義の条件を全て満たします。
<!-- definition-example-end -->

$x$ が

$$
x=\sum_{i=1}^k c_iq_i
$$

と書けるなら、両辺と $q_j$ の内積を取って

$$
\langle x,q_j\rangle
=\sum_{i=1}^kc_i\langle q_i,q_j\rangle
=c_j.
$$

従って

$$
\boxed{c_j=\langle x,q_j\rangle}.
$$

一般の基底では連立方程式を解いて座標を求めますが、正規直交基底なら内積を取るだけです。

---


---

## 3. Gram--Schmidt直交化：正規直交基底を実際に作る

<a id="thm-f0-00e1-gram-schmidt"></a>

<!-- formal-statement-start -->
> **定理（Gram--Schmidt直交化法）**  
> 実内積空間で一次独立な $v_1,\dots,v_k$ が与えられたとする。このとき
>
> $$
> \operatorname{span}(v_1,\dots,v_j)
> =
> \operatorname{span}(q_1,\dots,q_j)
> \qquad (j=1,\dots,k)
> $$
>
> を満たす正規直交系 $q_1,\dots,q_k$ を構成できる。
<!-- formal-statement-end -->

### 証明の見取り図

$v_j$ から既に作った $q_1,\dots,q_{j-1}$ 方向の成分を全て引き、残りを正規化します。一次独立性が「残りが0にならない」ことを保証します。

<!-- proof-start -->
### 証明

まず

$$
u_1=v_1,
\qquad
q_1=\frac{u_1}{\|u_1\|}.
$$

$j\ge2$ では

$$
u_j
=
v_j-
\sum_{i=1}^{j-1}\langle v_j,q_i\rangle q_i
$$

と置きます。$m<j$ に対して

$$
\begin{aligned}
\langle u_j,q_m\rangle
&=
\langle v_j,q_m\rangle
-
\sum_{i=1}^{j-1}
\langle v_j,q_i\rangle
\langle q_i,q_m\rangle\\
&=0
\end{aligned}
$$

なので、$u_j$ は既に作った全ての $q_m$ に直交します。

もし $u_j=0$ なら

$$
v_j
=
\sum_{i=1}^{j-1}\langle v_j,q_i\rangle q_i
\in
\operatorname{span}(v_1,\dots,v_{j-1}),
$$

となり一次独立性に反します。従って $u_j\ne0$ で、

$$
q_j=\frac{u_j}{\|u_j\|}
$$

と正規化できます。

また $u_j$ は $v_1,\dots,v_j$ の線形結合であり、逆に

$$
v_j=u_j+\sum_{i=1}^{j-1}\langle v_j,q_i\rangle q_i
$$

なので、各段階で

$$
\operatorname{span}(v_1,\dots,v_j)
=
\operatorname{span}(q_1,\dots,q_j).
$$

これで帰納的に正規直交系を構成できます。
<!-- proof-end -->

---


---

## 4. Gram--Schmidtの具体計算

$$
v_1=(1,1,0)^{\mathsf T},
\qquad
v_2=(1,0,1)^{\mathsf T}
$$

から正規直交基底を作ります。

まず

$$
\|v_1\|=\sqrt2
$$

なので

$$
\boxed{
q_1
=\frac1{\sqrt2}(1,1,0)^{\mathsf T}
}.
$$

次に

$$
\langle v_2,q_1\rangle
=\frac1{\sqrt2}.
$$

したがって

$$
\begin{aligned}
u_2
&=v_2-\langle v_2,q_1\rangle q_1\\
&=(1,0,1)^{\mathsf T}
-\frac12(1,1,0)^{\mathsf T}\\
&=\left(\frac12,-\frac12,1\right)^{\mathsf T}.
\end{aligned}
$$

$$
\|u_2\|
=\sqrt{\frac32}
$$

なので

$$
\boxed{
q_2
=\frac1{\sqrt6}(1,-1,2)^{\mathsf T}
}.
$$

確認すると

$$
q_1^{\mathsf T}q_2=0,
\qquad
\|q_1\|=\|q_2\|=1.
$$

したがって

$$
\boxed{
\{q_1,q_2\}
}
$$

は

$$
\operatorname{span}(v_1,v_2)
$$

の正規直交基底です。

---

## 5. 直交補空間

<a id="def-f0-00e1-orthogonal-complement"></a>

<!-- formal-statement-start -->
> **定義（直交補空間）**  
> 部分空間 $V\subset\mathbb R^n$ に対して
>
> $$
> V^\perp=\{y\in\mathbb R^n:\langle y,v\rangle=0\ \forall v\in V\}
> $$
>
> を $V$ の **直交補空間** といいます。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00e1-orthogonal-complement -->
### 5.1 例：平面の直交補空間

$$
V=\operatorname{span}((1,1,0),(1,0,1))
$$

とします。$y=(a,b,c)$ が $V^\perp$ に属するには生成元の双方に直交すればよいので

$$
a+b=0,
\qquad
a+c=0.
$$

従って $b=c=-a$ で、

$$
V^\perp
=
\operatorname{span}((1,-1,-1)).
$$

生成元 $(1,-1,-1)$ と $V$ の2つの生成元との内積は実際に0です。
<!-- definition-example-end -->

有限次元では最終的に

$$
\mathbb R^n=V\oplus V^\perp
$$

と分解できます。次節で直交射影を具体的に構成して、この分解の存在と一意性を確認します。

---


---

## 6. 正規直交基底から射影公式を導く

$V$ の正規直交基底を $q_1,\dots,q_k$ とします。$x$ の $V$ 成分を

$$
\boxed{
P_Vx
=
\sum_{i=1}^k
\langle x,q_i\rangle q_i
}
$$

と置きます。

列ベクトルを並べて

$$
Q=
\begin{pmatrix}
q_1&\cdots&q_k
\end{pmatrix}
$$

とすれば $Q^{\mathsf T}Q=I_k$ で、

$$
\boxed{P_Vx=QQ^{\mathsf T}x}.
$$

従って射影行列は $P=QQ^{\mathsf T}$ で、

$$
P^{\mathsf T}=P,
\qquad
P^2=P
$$

を満たします。

<a id="thm-f0-00e1-orthogonal-decomposition"></a>

<!-- formal-statement-start -->
> **定理（有限次元の直交分解）**  
> $V\subset\mathbb R^n$ を部分空間とする。このとき任意の $x\in\mathbb R^n$ は一意に
>
> $$
> x=p+r,
> \qquad
> p\in V,
> \quad
> r\in V^\perp
> $$
>
> と表せる。$p=P_Vx$ である。
<!-- formal-statement-end -->

存在は上の $p=P_Vx$ と $r=x-p$ で示せます。実際、各 $q_j$ に対して

$$
\langle r,q_j\rangle
=
\langle x,q_j\rangle
-
\sum_i\langle x,q_i\rangle\langle q_i,q_j\rangle
=0,
$$

なので $r\in V^\perp$ です。

一意性について、$x=p_1+r_1=p_2+r_2$ なら

$$
p_1-p_2=r_2-r_1\in V\cap V^\perp.
$$

$w\in V\cap V^\perp$ なら $\langle w,w\rangle=0$ だから $w=0$ です。従って $p_1=p_2$, $r_1=r_2$ です。

---


---

## 7. 射影が最近点になる理由

<a id="thm-f0-00e1-nearest-point"></a>

<!-- formal-statement-start -->
> **定理（直交射影の最短距離性）**  
> $V\subset\mathbb R^n$ を部分空間とし、$p=P_Vx$ とする。このとき任意の $v\in V$ に対して
>
> $$
> \|x-v\|^2
> =
> \|x-p\|^2+\|p-v\|^2
> $$
>
> が成り立つ。従って $p$ は $V$ 上で $x$ に最も近い唯一の点である。
<!-- formal-statement-end -->

### 証明の核心

射影残差 $x-p$ は $V^\perp$ にあり、$p-v$ は $V$ にあるので両者が直交します。

<!-- proof-start -->
### 証明

$$
x-v=(x-p)+(p-v)
$$

で、$x-p\perp(p-v)$ です。Pythagorasより

$$
\|x-v\|^2
=
\|x-p\|^2+\|p-v\|^2
\ge
\|x-p\|^2.
$$

等号は $p-v=0$、すなわち $v=p$ のときだけです。
<!-- proof-end -->

後のHilbert空間の射影定理は、この有限次元の事実を無限次元へ一般化します。

---


---

## 8. 具体例：先ほどの平面へ射影する

先ほどの

$$
q_1=\frac1{\sqrt2}(1,1,0)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt6}(1,-1,2)^{\mathsf T}
$$

を使い、

$$
x=(2,0,1)^{\mathsf T}
$$

を $V=\operatorname{span}(q_1,q_2)$ へ射影します。

$$
\langle x,q_1\rangle=\sqrt2,
$$

$$
\langle x,q_2\rangle=\frac4{\sqrt6}.
$$

したがって

$$
\begin{aligned}
P_Vx
&=\sqrt2q_1+\frac4{\sqrt6}q_2\\
&=(1,1,0)^{\mathsf T}
+\left(\frac23,-\frac23,\frac43\right)^{\mathsf T}\\
&=\boxed{\left(\frac53,\frac13,\frac43\right)^{\mathsf T}}.
\end{aligned}
$$

残差は

$$
r=x-P_Vx
=\left(\frac13,-\frac13,-\frac13\right)^{\mathsf T}.
$$

実際

$$
r^{\mathsf T}v_1=0,
\qquad
r^{\mathsf T}v_2=0
$$

であり、残差が部分空間全体に直交しています。

---

## 9. 正規直交でない基底から射影公式を導く

$V$ の基底を列に持つ行列

$$
X
=
\begin{pmatrix}
x_1&\cdots&x_k
\end{pmatrix}
$$

を考えます。

列が一次独立なら

$$
X^{\mathsf T}X
$$

は正則です。

射影点を

$$
p=X\beta
$$

と書きます。

残差

$$
r=y-X\beta
$$

が $V$ に直交する条件は

$$
X^{\mathsf T}r=0.
$$

したがって

$$
X^{\mathsf T}(y-X\beta)=0
$$

より

$$
X^{\mathsf T}X\beta=X^{\mathsf T}y.
$$

よって

$$
\boxed{
\hat\beta
=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
}
$$

で、射影は

$$
\boxed{
P_Vy
=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
}.
$$

したがって

$$
\boxed{
P_X
=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}
}
$$

です。

F0-00で公式として見た回帰の射影行列は、単に **正規直交でない基底を使った直交射影** です。

---

## 10. 最小二乗法は射影問題

<a id="thm-f0-00e1-normal-equations"></a>

<!-- formal-statement-start -->
> **定理（最小二乗の正規方程式）**  
> $X\in\mathbb R^{n\times k}$ の列が一次独立で、$y\in\mathbb R^n$ とする。このとき
>
> $$
> \min_{\beta\in\mathbb R^k}\|y-X\beta\|^2
> $$
>
> の唯一の最小解 $\hat\beta$ は
>
> $$
> X^{\mathsf T}X\hat\beta=X^{\mathsf T}y
> $$
>
> を満たし、
>
> $$
> \hat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
> $$
>
> で与えられる。
<!-- formal-statement-end -->

これは「$y$ に最も近い $\operatorname{Col}(X)$ 上の点を探す」射影問題です。最適残差

$$
e=y-X\hat\beta
$$

は列空間に直交するので

$$
X^{\mathsf T}e=0.
$$

従って

$$
X^{\mathsf T}(y-X\hat\beta)=0
$$

から正規方程式が得られます。

さらに列一次独立なら、$z\ne0$ に対して

$$
z^{\mathsf T}X^{\mathsf T}Xz=\|Xz\|^2>0,
$$

だから $X^{\mathsf T}X$ は正定値で可逆です。従って解の公式が従います。

---


---

## 11. Gram--SchmidtとQR分解

<a id="def-f0-00e1-thin-qr"></a>

<!-- formal-statement-start -->
> **定義（薄いQR分解）**  
> 列一次独立な $A\in\mathbb R^{n\times k}$（$k\le n$）について
>
> $$
> A=QR,
> $$
>
> $Q\in\mathbb R^{n\times k}$ の列が正規直交し、$R\in\mathbb R^{k\times k}$ が対角成分正の上三角行列であるとき、これを $A$ の **薄いQR分解** といいます。
<!-- formal-statement-end -->

<a id="thm-f0-00e1-qr-existence"></a>

<!-- formal-statement-start -->
> **定理（Gram--SchmidtによるQR分解）**  
> 列一次独立な $A\in\mathbb R^{n\times k}$ にGram--Schmidt直交化を適用すると、薄いQR分解 $A=QR$ を構成できる。
<!-- formal-statement-end -->

列を $a_1,\dots,a_k$ とし、Gram--Schmidtで $q_1,\dots,q_k$ を作ります。各段階で

$$
a_j=\sum_{i=1}^j r_{ij}q_i,
\qquad
r_{ij}=\langle a_j,q_i\rangle\ (i<j),
\qquad
r_{jj}=\|u_j\|>0
$$

です。$q_i$ を列に持つ $Q$ と係数 $r_{ij}$ を並べた $R$ を使えば

$$
A=QR,
\qquad
Q^{\mathsf T}Q=I,
$$

で、$R$ は上三角かつ対角成分正です。Gram--Schmidtは行列分解そのものを構成しています。

---


---

## 12. QR分解で最小二乗を解く

$$
X=QR
$$

とします。列フルランクなら $R$ は正則です。

$$
\min_\beta\|y-QR\beta\|^2
$$

を考えます。

$Q$ の列空間への射影は

$$
QQ^{\mathsf T}y
$$

なので、最適点では

$$
QR\hat\beta=QQ^{\mathsf T}y.
$$

左から $Q^{\mathsf T}$ を掛けると

$$
R\hat\beta=Q^{\mathsf T}y.
$$

よって

$$
\boxed{
\hat\beta=R^{-1}Q^{\mathsf T}y
}.
$$

理論上

$$
(X^{\mathsf T}X)^{-1}X^{\mathsf T}y
$$

と同じ解ですが、数値計算では $X^{\mathsf T}X$ を明示的に作らずQR分解を使う方が一般に安定です。

---

## 13. 有限次元の直交分解をまとめる

有限次元内積空間では、部分空間 $V$ に正規直交基底

$$
q_1,\dots,q_k
$$

を取れます。

その結果、任意の $x$ は

$$
\boxed{
x
=
\underbrace{\sum_i\langle x,q_i\rangle q_i}_{P_Vx}
+
\underbrace{(x-P_Vx)}_{\in V^\perp}
}
$$

と一意に分解できます。

この事実は後で

$$
\boxed{
H=M\oplus M^\perp
}
$$

というHilbert空間の閉部分空間に対する直交分解へ一般化されます。

有限次元では「部分空間は自動的に閉」であるため、閉性をほぼ意識しません。

無限次元ではこの「自動的に」が消えるため、閉部分空間という条件が重要になります。

---

## 14. 演習

### F0-00E1-A01 Gram--Schmidt

- Level: A
- 目安時間: 12分

$v_1=(1,1)^{\mathsf T}$、$v_2=(1,0)^{\mathsf T}$ にGram--Schmidt直交化を適用し、正規直交基底を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
q_1=\frac1{\sqrt2}(1,1)^{\mathsf T}.
$$

次に

$$
u_2=v_2-\langle v_2,q_1\rangle q_1
=(1,0)^{\mathsf T}-\frac12(1,1)^{\mathsf T}
=\left(\frac12,-\frac12\right)^{\mathsf T}.
$$

$\|u_2\|=1/\sqrt2$ なので

$$
q_2=\frac1{\sqrt2}(1,-1)^{\mathsf T}.
$$

実際 $\langle q_1,q_2\rangle=0$、$\|q_1\|=\|q_2\|=1$ です。
<!-- solution-end -->

### F0-00E1-A02 正規直交座標

- Level: A
- 目安時間: 8分

$$
q_1=\frac1{\sqrt2}(1,1,0)^{\mathsf T},
\qquad
q_2=\frac1{\sqrt2}(1,-1,0)^{\mathsf T},
\qquad
x=(3,1,2)^{\mathsf T}.
$$

$x$ の $\operatorname{span}(q_1,q_2)$ への射影を求めよ。

<!-- solution-start -->
#### 詳細解答

$$
\langle x,q_1\rangle=2\sqrt2,
\qquad
\langle x,q_2\rangle=\sqrt2.
$$

従って

$$
P_Vx
=2\sqrt2q_1+\sqrt2q_2
=(3,1,0)^{\mathsf T}.
$$

残差 $(0,0,2)^{\mathsf T}$ は $q_1,q_2$ の双方に直交します。
<!-- solution-end -->

### F0-00E1-A03 直交補空間

- Level: A
- 目安時間: 10分

$$
V=\operatorname{span}\{(1,1,0)^{\mathsf T},(0,1,1)^{\mathsf T}\}\subset\mathbb R^3
$$

とする。$V^\perp$ の基底を求めよ。

<!-- solution-start -->
#### 詳細解答

$y=(a,b,c)^{\mathsf T}\in V^\perp$ なら

$$
a+b=0,
\qquad
b+c=0.
$$

従って $a=-b$, $c=-b$ で、

$$
V^\perp=\operatorname{span}\{(-1,1,-1)^{\mathsf T}\}.
$$

この生成元と $V$ の2生成元との内積はどちらも0です。
<!-- solution-end -->

### F0-00E1-A04 QR分解

- Level: A
- 目安時間: 12分

$$
A=
\begin{pmatrix}
1&1\\
1&-1\\
0&0
\end{pmatrix}
$$

の薄いQR分解を求めよ。

<!-- solution-start -->
#### 詳細解答

列 $a_1=(1,1,0)^{\mathsf T}$、$a_2=(1,-1,0)^{\mathsf T}$ は直交し、どちらもノルム $\sqrt2$ です。従って

$$
Q=\frac1{\sqrt2}
\begin{pmatrix}
1&1\\
1&-1\\
0&0
\end{pmatrix},
\qquad
R=Q^{\mathsf T}A=
\begin{pmatrix}
\sqrt2&0\\
0&\sqrt2
\end{pmatrix}.
$$

$Q^{\mathsf T}Q=I_2$、$QR=A$、$R$ の対角成分が正であることも確認できます。
<!-- solution-end -->

### F0-00E1-B01 射影と最短距離

- Level: B
- 目安時間: 15分

$q_1,\dots,q_k$ を部分空間 $V$ の正規直交基底とし、

$$
p=\sum_{i=1}^k\langle x,q_i\rangle q_i
$$

とする。任意の $v\in V$ に対し

$$
\|x-v\|^2=\|x-p\|^2+\|p-v\|^2
$$

を示し、$p$ が唯一の最近点であることを結論せよ。

<!-- solution-start -->
#### 詳細解答

各 $j$ について

$$
\langle x-p,q_j\rangle
=
\langle x,q_j\rangle
-
\sum_i\langle x,q_i\rangle\langle q_i,q_j\rangle
=0,
$$

なので $x-p\in V^\perp$ です。一方 $p-v\in V$ です。従って

$$
x-v=(x-p)+(p-v)
$$

は直交分解で、Pythagorasから

$$
\|x-v\|^2
=
\|x-p\|^2+\|p-v\|^2
\ge\|x-p\|^2.
$$

等号は $p-v=0$、すなわち $v=p$ のときだけです。
<!-- solution-end -->

### F0-00E1-B02 正規方程式

- Level: B
- 目安時間: 15分

$X\in\mathbb R^{n\times k}$ の列は一次独立とし、$y\in\mathbb R^n$ とする。最小二乗残差の直交性から正規方程式と $\hat\beta$ の公式を導け。

<!-- solution-start -->
#### 詳細解答

最小二乗点 $X\hat\beta$ は $y$ の $\operatorname{Col}(X)$ への直交射影なので

$$
e=y-X\hat\beta\perp\operatorname{Col}(X).
$$

従って各列との内積をまとめて

$$
X^{\mathsf T}e=0,
$$

すなわち

$$
X^{\mathsf T}X\hat\beta=X^{\mathsf T}y.
$$

列一次独立性から、$z\ne0$ に対し

$$
z^{\mathsf T}X^{\mathsf T}Xz=\|Xz\|^2>0,
$$

なので $X^{\mathsf T}X$ は可逆です。よって

$$
\hat\beta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y.
$$
<!-- solution-end -->

### F0-00E1-B03 QRで最小二乗を解く

- Level: B
- 目安時間: 18分

列一次独立な $X$ が薄いQR分解 $X=QR$ を持つとする。最小二乗解が

$$
R\hat\beta=Q^{\mathsf T}y
$$

を解けば得られることを導け。

<!-- solution-start -->
#### 詳細解答

$\operatorname{Col}(X)=\operatorname{Col}(Q)$ なので、$y$ の列空間への射影は $QQ^{\mathsf T}y$ です。従って

$$
QR\hat\beta=QQ^{\mathsf T}y.
$$

左から $Q^{\mathsf T}$ を掛けると

$$
Q^{\mathsf T}QR\hat\beta
=
Q^{\mathsf T}QQ^{\mathsf T}y.
$$

$Q^{\mathsf T}Q=I$ より

$$
R\hat\beta=Q^{\mathsf T}y.
$$

$R$ は可逆な上三角行列なので後退代入で解けます。この方法では $X^{\mathsf T}X$ を明示的に作りません。
<!-- solution-end -->

### F0-00E1-C01 Gram--Schmidt・射影・最小二乗の統合

- Level: C
- 目安時間: 30分

$$
X=
\begin{pmatrix}
1&1\\
1&0\\
0&1
\end{pmatrix},
\qquad
y=
\begin{pmatrix}
2\\1\\0
\end{pmatrix}
$$

とする。

1. $X$ の列から薄いQR分解 $X=QR$ を構成せよ。
2. $p=QQ^{\mathsf T}y$ と残差 $e=y-p$ を求め、$e\perp\operatorname{Col}(X)$ を確認せよ。
3. $R\hat\beta=Q^{\mathsf T}y$ を解き、$X\hat\beta=p$ を確認せよ。

<!-- solution-start -->
#### 詳細解答

列を $x_1=(1,1,0)^{\mathsf T}$、$x_2=(1,0,1)^{\mathsf T}$ とします。まず

$$
q_1=\frac1{\sqrt2}(1,1,0)^{\mathsf T}.
$$

また

$$
\langle x_2,q_1\rangle=\frac1{\sqrt2},
$$

なので

$$
u_2
=x_2-\frac1{\sqrt2}q_1
=\left(\frac12,-\frac12,1\right)^{\mathsf T},
\qquad
\|u_2\|=\sqrt{\frac32}.
$$

従って

$$
q_2=\frac1{\sqrt6}(1,-1,2)^{\mathsf T}.
$$

よって

$$
Q=
\begin{pmatrix}
1/\sqrt2&1/\sqrt6\\
1/\sqrt2&-1/\sqrt6\\
0&2/\sqrt6
\end{pmatrix},
\qquad
R=
\begin{pmatrix}
\sqrt2&1/\sqrt2\\
0&\sqrt{3/2}
\end{pmatrix}.
$$

次に

$$
Q^{\mathsf T}y=
\begin{pmatrix}
3/\sqrt2\\
1/\sqrt6
\end{pmatrix},
$$

従って

$$
p=Q(Q^{\mathsf T}y)
=
\begin{pmatrix}
5/3\\
4/3\\
1/3
\end{pmatrix},
\qquad
e=
\begin{pmatrix}
1/3\\
-1/3\\
-1/3
\end{pmatrix}.
$$

実際

$$
x_1^{\mathsf T}e=0,
\qquad
x_2^{\mathsf T}e=0.
$$

最後に

$$
R\hat\beta=
\begin{pmatrix}
3/\sqrt2\\
1/\sqrt6
\end{pmatrix}
$$

を下段から解くと $\hat\beta_2=1/3$、上段から $\hat\beta_1=4/3$ です。従って

$$
\boxed{
\hat\beta=
\begin{pmatrix}
4/3\\
1/3
\end{pmatrix},
\qquad
X\hat\beta=
\begin{pmatrix}
5/3\\
4/3\\
1/3
\end{pmatrix}
=p
}.
$$
<!-- solution-end -->
---

## 15. 次に進む

内積が作るノルムと直交展開の基本不等式を次講で証明します。

**次：[F0-00E2 Cauchy--Schwarz・Bessel・Parseval](../F0_00E2_Cauchy_Schwarz_Bessel_Parseval/index.md)**
