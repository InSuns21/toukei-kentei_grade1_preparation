# F0-00E ベクトル空間・基底・Gram--Schmidt・直交射影

[F0-00 統計検定1級のための数学速習](../F0_00_統計検定1級のための数学速習/index.md) では、行列計算・固有値・射影を「統計で使う計算」として扱いました。

この補講では、その背後にある線形代数を一段抽象化します。

目標は

$$
\boxed{
\text{ベクトル空間}
\to
\text{基底}
\to
\text{直交}
\to
\text{Gram--Schmidt}
\to
\text{射影}
\to
\text{最小二乗}
}
$$

を一本の流れとして理解することです。

特に、後のHilbert空間で頻出する

- 部分空間
- 正規直交基底
- 直交補空間
- 射影

を、まず有限次元で自分の手で構成します。

---

## 1. ベクトル空間は「足して伸ばしても同じ世界にいる」集合

実数上のベクトル空間 $V$ では、$u,v\in V$ と $a,b\in\mathbb R$ に対して

$$
au+bv\in V
$$

となります。

典型例は

$$
\mathbb R^n
$$

です。

しかしベクトルは数の縦並びに限りません。たとえば多項式全体

$$
P_2
=
\{a+bx+cx^2:a,b,c\in\mathbb R\}
$$

もベクトル空間です。

この見方は、後で「関数そのもの」をベクトルとして扱う関数解析へそのままつながります。

---

## 2. 部分空間とspan

$V$ の部分集合 $W$ が、任意の $u,v\in W$ と $a,b\in\mathbb R$ について

$$
au+bv\in W
$$

を満たすとき、$W$ を **線形部分空間** といいます。

たとえば

$$
W
=
\{(x,y,z)\in\mathbb R^3:x+y+z=0\}
$$

は部分空間です。

一方

$$
\{(x,y,z):x+y+z=1\}
$$

は原点を含まないので部分空間ではありません。

ベクトル $v_1,\dots,v_k$ のすべての線形結合

$$
\sum_{i=1}^k a_i v_i
$$

を集めた集合を

$$
\boxed{
\operatorname{span}(v_1,\dots,v_k)
}
$$

と書きます。

これは $v_1,\dots,v_k$ を含む最小の線形部分空間です。

### 例

$$
v_1=(1,0,1),
\qquad
v_2=(0,1,1)
$$

なら

$$
a v_1+b v_2
=(a,b,a+b)
$$

なので

$$
\operatorname{span}(v_1,v_2)
=
\{(x,y,z):z=x+y\}
$$

という原点を通る平面になります。

---

## 3. 一次独立とは「表し方に無駄がない」こと

$v_1,\dots,v_k$ が **一次独立** であるとは

$$
a_1v_1+\cdots+a_kv_k=0
$$

から

$$
a_1=\cdots=a_k=0
$$

しか起こらないことです。

逆に、ゼロでない係数を使ってゼロを作れるなら一次従属です。

一次従属なら、少なくとも1本は他のベクトルの線形結合で表せます。

つまり

> 一次独立 = 張っている空間を変えずにこれ以上ベクトルを捨てられない

と考えられます。

---

## 4. 基底と座標

$V$ を張り、しかも一次独立なベクトル族

$$
v_1,\dots,v_n
$$

を $V$ の **基底** といいます。

すると任意の $x\in V$ は一意に

$$
\boxed{
x
=c_1v_1+\cdots+c_nv_n
}
$$

と書けます。

係数

$$
(c_1,\dots,c_n)
$$

が、その基底に関する $x$ の座標です。

### なぜ一意なのか

もし

$$
x=\sum_i c_iv_i=\sum_i d_iv_i
$$

なら

$$
\sum_i(c_i-d_i)v_i=0.
$$

基底は一次独立なので

$$
c_i-d_i=0
$$

です。

したがって座標表示は一意です。

有限次元空間では、どの基底を選んでも本数は同じです。その本数を

$$
\boxed{\dim V}
$$

と書きます。

---

## 5. 行列は「基底を決めた線形写像の座標表示」

行列を単なる数字の表として見るより、

$$
T:V\to W
$$

という線形写像を、基底を選んで座標化したものと考えると後の理論が見通しよくなります。

たとえば標準基底 $e_1,\dots,e_n$ について

$$
A
=
\begin{pmatrix}
|&&|\\
Ae_1&\cdots&Ae_n\\
|&&|
\end{pmatrix}
$$

なので、行列の第 $j$ 列は基底ベクトル $e_j$ の行き先です。

この視点は次の [F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) で詳しく使います。

---

## 6. 内積と直交

$\mathbb R^n$ の標準内積は

$$
\langle x,y\rangle
=x^{\mathsf T}y
=
\sum_{i=1}^n x_i y_i
$$

です。

これからノルム

$$
\|x\|
=
\sqrt{\langle x,x\rangle}
$$

が定まります。

$$
\langle x,y\rangle=0
$$

なら $x$ と $y$ は **直交** するといいます。

### Pythagoras

$x\perp y$ なら

$$
\begin{aligned}
\|x+y\|^2
&=\langle x+y,x+y\rangle\\
&=\|x\|^2+2\langle x,y\rangle+\|y\|^2\\
&=\boxed{\|x\|^2+\|y\|^2}.
\end{aligned}
$$

この単純な等式が、射影・最小二乗・Hilbert空間の射影定理を支えます。

---

## 7. 正規直交系が便利な理由

ベクトル $q_1,\dots,q_k$ が

$$
\langle q_i,q_j\rangle
=
\begin{cases}
1&i=j,\\
0&i\ne j
\end{cases}
$$

を満たすとき、**正規直交系** といいます。

$x$ が

$$
x=\sum_{i=1}^k c_i q_i
$$

と書けるなら、両辺と $q_j$ の内積を取るだけで

$$
\langle x,q_j\rangle
=c_j
$$

となります。

したがって

$$
\boxed{
c_j=\langle x,q_j\rangle}
$$

です。

一般の基底では連立方程式を解いて座標を求めますが、正規直交基底なら内積を取るだけです。

これが正規直交基底をわざわざ作る最大の理由です。

---

## 8. Gram--Schmidt直交化：正規直交基底を実際に作る

一次独立なベクトル

$$
v_1,\dots,v_k
$$

から、同じ部分空間を張る正規直交系

$$
q_1,\dots,q_k
$$

を作ります。

### 第1段階

まず

$$
u_1=v_1,
\qquad
q_1=\frac{u_1}{\|u_1\|}.
$$

### 第2段階

$v_2$ から $q_1$ 方向の成分を引きます。

$$
u_2
=v_2-\langle v_2,q_1\rangle q_1.
$$

すると

$$
\begin{aligned}
\langle u_2,q_1\rangle
&=\langle v_2,q_1\rangle
-\langle v_2,q_1\rangle\langle q_1,q_1\rangle\\
&=0.
\end{aligned}
$$

よって $u_2\perp q_1$ です。

正規化して

$$
q_2=\frac{u_2}{\|u_2\|}.
$$

### 一般の第j段階

$$
\boxed{
u_j
=v_j-
\sum_{i=1}^{j-1}
\langle v_j,q_i\rangle q_i
}
$$

と置き、

$$
\boxed{
q_j=\frac{u_j}{\|u_j\|}
}
$$

とします。

$v_1,\dots,v_k$ が一次独立なら各 $u_j\ne0$ です。

逆に途中で $u_j=0$ になれば

$$
v_j
\in
\operatorname{span}(v_1,\dots,v_{j-1})
$$

なので、元のベクトル族は一次従属です。

---

## 9. Gram--Schmidtの具体計算

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

## 10. 直交補空間

部分空間 $V\subset\mathbb R^n$ に対して

$$
\boxed{
V^\perp
=
\{y\in\mathbb R^n:\langle y,v\rangle=0\ \forall v\in V\}
}
$$

を **直交補空間** といいます。

たとえば

$$
V=\operatorname{span}((1,1,0),(1,0,1))
$$

なら、$y=(a,b,c)$ が $V^\perp$ に属する条件は

$$
a+b=0,
\qquad
a+c=0.
$$

したがって

$$
V^\perp
=\operatorname{span}((1,-1,-1)).
$$

有限次元では

$$
\boxed{
\mathbb R^n
=V\oplus V^\perp
}
$$

と分解できます。

つまり任意の $x\in\mathbb R^n$ は一意に

$$
\boxed{x=p+r}
$$

と書けて、

$$
p\in V,
\qquad
r\in V^\perp
$$

です。

$p$ が $x$ の $V$ への直交射影です。

---

## 11. 正規直交基底から射影公式を導く

$V$ の正規直交基底を

$$
q_1,\dots,q_k
$$

とします。

$x$ の $V$ 成分は

$$
\boxed{
P_Vx
=
\sum_{i=1}^k
\langle x,q_i\rangle q_i
}
$$

です。

列ベクトルを並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_k
\end{pmatrix}
$$

とすれば

$$
Q^{\mathsf T}Q=I_k
$$

で、

$$
\boxed{
P_Vx=QQ^{\mathsf T}x
}
$$

となります。

したがって射影行列は

$$
\boxed{P=QQ^{\mathsf T}}.
$$

この行列は

$$
P^{\mathsf T}=P,
\qquad
P^2=P
$$

を満たします。

---

## 12. 射影が最近点になる理由

$x=p+r$ とし

$$
p=P_Vx\in V,
\qquad
r\in V^\perp
$$

とします。

任意の $v\in V$ に対し

$$
x-v
=r+(p-v).
$$

$r\in V^\perp$、$p-v\in V$ なので直交します。

Pythagorasより

$$
\boxed{
\|x-v\|^2
=
\|r\|^2+\|p-v\|^2
\ge
\|r\|^2
}
$$

です。

等号は $v=p$ のときだけです。

したがって

$$
\boxed{
P_Vx
=
\operatorname*{argmin}_{v\in V}\|x-v\|
}
$$

です。

後のHilbert空間の射影定理は、この有限次元の事実を閉凸集合へ一般化したものです。

---

## 13. 具体例：先ほどの平面へ射影する

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

## 14. 正規直交でない基底から射影公式を導く

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

## 15. 最小二乗法は射影問題

$$
\min_\beta\|y-X\beta\|^2
$$

を考えます。

これは

> $y$ に最も近い $\operatorname{Col}(X)$ 上の点を探す

問題です。

したがって最適残差

$$
e=y-X\hat\beta
$$

は列空間に直交し、

$$
\boxed{X^{\mathsf T}e=0}
$$

です。

これが正規方程式

$$
\boxed{
X^{\mathsf T}X\hat\beta=X^{\mathsf T}y
}
$$

になります。

微分で導いた最小二乗解と、幾何学的な射影は同じものです。

---

## 16. Gram--SchmidtとQR分解

列一次独立な行列

$$
A
=
\begin{pmatrix}
a_1&\cdots&a_k
\end{pmatrix}
$$

の列にGram--Schmidtを適用し、正規直交列

$$
q_1,\dots,q_k
$$

を作ります。

各 $a_j$ は

$$
a_j
=
\sum_{i=1}^j r_{ij}q_i
$$

と書けます。

したがって

$$
\boxed{A=QR}
$$

と分解できます。

ここで

$$
Q^{\mathsf T}Q=I
$$

で、$R$ は上三角行列です。

これが **QR分解** です。

Gram--Schmidtは、単に「直交ベクトルを作る手順」ではなく、行列分解そのものを構成しています。

---

## 17. QR分解で最小二乗を解く

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

## 18. 有限次元の直交分解をまとめる

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

## 19. 関数解析へ持っていく語彙

この章で重要なのは公式より、次の対応です。

| 有限次元線形代数 | 関数解析での一般化 |
|---|---|
| $\mathbb R^n$ | 一般のベクトル空間・関数空間 |
| Euclid内積 | 一般の内積 |
| 正規直交基底 | 正規直交系・完全正規直交系 |
| 列空間 | 線形部分空間 |
| $V^\perp$ | 直交補空間 |
| $QQ^{\mathsf T}$ | 直交射影作用素 |
| 最小二乗 | Hilbert空間の最近点問題 |
| 行列 | 線形作用素 |

次の [F0-00F](../F0_00F_線形写像_固有空間_スペクトル定理_SVD/index.md) では、「行列 = 線形写像」という視点をさらに進め、固有空間・スペクトル定理・SVDを理論から組み立てます。

---

## 章末チェック

- span、一次独立、基底、次元の関係を説明できる。
- 一般の基底で座標表示が一意になる理由を説明できる。
- 正規直交基底なら係数が内積だけで求まることを示せる。
- Gram--Schmidtの各引き算が何を消しているか説明できる。
- 具体的な2〜3本のベクトルから正規直交基底を構成できる。
- $V^\perp$ を求められる。
- $P=QQ^{\mathsf T}$ を導ける。
- $P=X(X^{\mathsf T}X)^{-1}X^{\mathsf T}$ を残差の直交性から導ける。
- 最小二乗法を射影問題として説明できる。
- Gram--SchmidtとQR分解の関係を説明できる。
