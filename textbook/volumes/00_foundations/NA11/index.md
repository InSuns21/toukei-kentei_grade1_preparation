# NA11 数値解析 XI：Perron--Frobenius 理論と PageRank

NA10 では、一般の固有値問題に対して冪乗法・逆反復法・Rayleigh 商反復・QR 法を扱いました。

そこでは、固有値の絶対値が近いと冪乗法は遅くなり、絶対値最大の固有値が複数あれば方向が収束しないこともありました。

ところが、行列の成分がすべて非負であると、固有値問題には強い順序構造が入ります。

この章では

$$
Age0
$$

という単純な符号条件から、

- スペクトル半径そのものが実固有値になること
- 正の固有ベクトルが現れること
- 既約性が正の Perron 固有ベクトルの一意性を与えること
- 原始性が冪乗反復の周期振動を排除すること
- 確率行列の定常確率ベクトルが Perron 固有ベクトルになること
- PageRank の teleportation が一意性と収束を同時に保証すること

を導きます。

中心となる流れは

~~~text
非負行列
  ↓
Perron--Frobenius 理論
  ↓
既約性と原始性
  ↓
列確率行列
  ↓
定常確率ベクトル
  ↓
PageRank 行列
  ↓
ℓ1 縮小性・停止判定・感度
~~~

です。

直接の前提は、[NA9 の行列に対するスペクトル半径と Jordan 標準形による反復解析](../NA9/index.md#thm-na9-stationary-convergence)と、[NA10 の冪乗法](../NA10/index.md#def-na10-power-method)です。

---

## 0. 非負性が固有値問題を特別にする

<a id="def-na11-nonnegative-positive-matrix"></a>
<!-- formal-statement-start -->
### 定義（非負行列・正行列）

実行列 $A=(a_{ij})inmathbb R^{n	imes n}$ について、

$$
a_{ij}ge0
qquad
(1le i,jle n)
$$

がすべての成分で成り立つとき、$A$ を **非負行列**といい、

$$
Age0
$$

と書く。

さらに

$$
a_{ij}>0
qquad
(1le i,jle n)
$$

がすべての成分で成り立つとき、$A$ を **正行列**といい、

$$
A>0
$$

と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-nonnegative-positive-matrix -->
### 例：条件を成分ごとに確認する

**定義の確認**。

$$
A=
egin{pmatrix}
0&2\\
1&3
end{pmatrix}
$$

では全成分が0以上なので

$$
Age0.
$$

しかし $(1,1)$ 成分が0なので $A>0$ ではありません。

一方、

$$
B=
egin{pmatrix}
1&2\\
4&3
end{pmatrix}
$$

では4成分がすべて正だから

$$
B>0.
$$

したがって「非負」と「正」は区別が必要です。
<!-- definition-example-end -->

この符号条件が強いのは、複素ベクトル $z$ に対して成分ごとに

$$
|Az|
le
A|z|
$$

が成り立つからです。

実際、第 $i$ 成分について

$$
egin{aligned}
|(Az)_i|
&=
left|
sum_j a_{ij}z_j
ight|\\
&le
sum_j a_{ij}|z_j|\\
&=
(A|z|)_i.
end{aligned}
$$

ここで $|z|$ は成分ごとの絶対値です。

Perron--Frobenius 理論の核心は、この「絶対値を外へ出しても不等号の向きが壊れない」ことにあります。

---

## 1. スペクトル半径は行列冪の指数成長率である

Perron--Frobenius の証明では、成分ごとの不等式

$$
Ayge cy
$$

から

$$
ho(A)ge c
$$

を読み取る場面が出ます。

その橋渡しとして、NA9 の Jordan 標準形による議論を一つの命題にまとめます。

<a id="prop-na11-spectral-radius-power-limit"></a>
<!-- formal-statement-start -->
### 命題（有限次元でのスペクトル半径公式）

$Ainmathbb C^{n	imes n}$ とし、$|cdot|$ を任意の劣乗法的行列ノルムとする。

このとき

$$
oxed{
lim_{k	oinfty}
|A^k|^{1/k}
=
ho(A)
}
$$

である。
<!-- formal-statement-end -->

### 証明の見取り図

下からの評価は、絶対値最大の固有値に対応する固有ベクトルへ $A^k$ を作用させれば得られます。

上からの評価は、[NA9](../NA9/index.md#thm-na9-stationary-convergence) と同じく Jordan ブロックの冪を「指数関数 $	imes$ 多項式」で評価します。

<!-- proof-start -->
### 証明

まず

$$
Av=lambda v,
qquad
v
e0,
qquad
|lambda|=ho(A)
$$

となる固有対を取ります。

すると

$$
A^kv=lambda^kv
$$

だから、

$$
|A^k|
ge
rac{|A^kv|}{|v|}
=
|lambda|^k
=
ho(A)^k.
$$

従って

$$
liminf_{k	oinfty}
|A^k|^{1/k}
ge
ho(A).
$$

次に上から評価します。

Jordan 標準形

$$
A=SJS^{-1}
$$

を取り、各 Jordan ブロックを

$$
J_lambda=lambda I+N
$$

と書きます。$N$ は冪零です。

$ho(A)=0$ なら全固有値が0なので $J$ 自体が冪零であり、十分大きい $k$ で $A^k=0$ です。したがって結論は明らかです。

以下

$$
ho(A)>0
$$

とします。

任意の

$$
arepsilon>0
$$

を取り、

$$
q=ho(A)+arepsilon
$$

とします。

各固有値は

$$
|lambda|leho(A)<q
$$

を満たします。

Jordan ブロックの冪は

$$
J_lambda^k
=
sum_{j=0}^{m-1}
inom{k}{j}
lambda^{k-j}N^j
$$

と書けます。

固定した $j$ に対して

$$
inom{k}{j}|lambda|^{k-j}
$$

は多項式因子と $|lambda|^k$ の積です。

$|lambda|/q<1$ なので、十分大きい $k$ ではある定数 $C_j$ を用いて

$$
inom{k}{j}|lambda|^{k-j}
le
C_jq^k
$$

と評価できます。

Jordan ブロックは有限個しかないため、ある定数 $C>0$ が存在して

$$
|J^k|
le
Cq^k
$$

となります。

したがって

$$
|A^k|
=
|SJ^kS^{-1}|
le
|S|,|S^{-1}|,Cq^k.
$$

$k$ 乗根を取ると

$$
limsup_{k	oinfty}
|A^k|^{1/k}
le
q.
$$

$arepsilon>0$ は任意なので

$$
limsup_{k	oinfty}
|A^k|^{1/k}
le
ho(A).
$$

下からの評価と合わせて

$$
lim_{k	oinfty}
|A^k|^{1/k}
=
ho(A).
$$
<!-- proof-end -->

この命題から、$y>0$ に対して

$$
Ayge cy
$$

なら

$$
A^kyge c^ky
$$

なので

$$
ho(A)ge c
$$

と読めます。

---

## 2. 正行列では Perron 固有値が単独で支配する

<a id="thm-na11-positive-perron-frobenius"></a>
<!-- formal-statement-start -->
### 定理（正行列に対する Perron--Frobenius 定理）

$Ainmathbb R^{n	imes n}$ を正行列 $A>0$ とする。

このとき次が成り立つ。

1. $ho(A)>0$ は $A$ の実固有値である。
2. あるベクトル $x>0$ が存在して
   $$
   Ax=ho(A)x
   $$
   を満たす。
3. 正の固有ベクトルは定数倍を除いて一意である。
4. $ho(A)$ は代数的に単純な固有値である。
5. $lambda
eho(A)$ が $A$ の固有値なら
   $$
   |lambda|<ho(A).
   $$

同様に、ある $y>0$ が存在して

$$
y^{mathsf T}A
=
ho(A)y^{mathsf T}
$$

を満たす。
<!-- formal-statement-end -->

### 証明の見取り図

絶対値最大の複素固有値から出発し、その固有ベクトルの成分絶対値を取ります。

非負性から

$$
A|z|ge|Az|
$$

が得られ、もしどこかで真に大きければスペクトル半径より速い成長が生じて矛盾します。

<!-- proof-start -->
### 証明

$A>0$ なので対角成分も正です。従って

$$
operatorname{tr}(A)>0
$$

であり、すべての固有値が0ということはありません。よって

$$
ho(A)>0.
$$

絶対値最大の固有値 $lambda$ と複素固有ベクトル $z
e0$ を取り、

$$
Az=lambda z,
qquad
|lambda|=ho(A)
$$

とします。

成分ごとの絶対値を

$$
x=|z|ge0
$$

と置くと、

$$
Ax
ge
|Az|
=
|lambda||z|
=
ho(A)x.
$$

ここで

$$
d=Ax-ho(A)x
ge0
$$

と置きます。

もし $d
e0$ なら、$A>0$ だから

$$
Ad>0.
$$

また

$$
y=Ax>0
$$

です。

したがって

$$
Ay
=
A^2x
=
ho(A)Ax+Ad
>
ho(A)y.
$$

$y_i>0$ なので

$$
arepsilon
=
min_i
left(
rac{(Ay)_i}{y_i}
-
ho(A)
ight)
>0.
$$

従って

$$
Ay
ge
(ho(A)+arepsilon)y.
$$

反復すると

$$
A^ky
ge
(ho(A)+arepsilon)^ky.
$$

これは[スペクトル半径公式](#prop-na11-spectral-radius-power-limit)から

$$
ho(A)
ge
ho(A)+arepsilon
$$

を要求し、矛盾します。

よって

$$
Ax=ho(A)x.
$$

さらに $A>0$、$x
e0$、$ho(A)>0$ だから

$$
x
=
rac1{ho(A)}Ax
>0.
$$

したがって1と2が示されました。

次に正固有ベクトルの一意性を示します。

$x>0$ と $u>0$ がともに $ho(A)$ の固有ベクトルだとします。

$$
t
=
max_i
rac{x_i}{u_i}
$$

と置けば

$$
w=tu-xge0
$$

であり、少なくとも一つの成分は0です。

もし $w
e0$ なら $A>0$ なので

$$
Aw>0.
$$

しかし

$$
Aw
=
ho(A)w
$$

だから、$w$ の0成分に対応する成分も0でなければならず矛盾です。

したがって

$$
w=0,
qquad
x=tu.
$$

正固有ベクトルは定数倍を除いて一意です。

次に周上の固有値を調べます。

$Az=lambda z$、$|lambda|=ho(A)$ とすると、先ほどと同じ議論から

$$
A|z|=ho(A)|z|.
$$

したがって三角不等式

$$
left|
sum_j a_{ij}z_j
ight|
le
sum_j a_{ij}|z_j|
$$

では、すべての行で等号が成立しています。

$a_{ij}>0$ なので、等号成立条件から全 $z_j$ は同じ複素偏角を持ちます。

従ってある複素数 $c
e0$ と正ベクトル $x$ を用いて

$$
z=cx
$$

と書けます。

すると

$$
Az
=
cAx
=
cho(A)x
=
ho(A)z.
$$

一方 $Az=lambda z$ なので

$$
lambda=ho(A).
$$

従って $ho(A)$ 以外の固有値はすべて

$$
|lambda|<ho(A)
$$

を満たします。

最後に代数的単純性を示します。

$A^{mathsf T}>0$ にも今までの議論を適用すると、ある $y>0$ が存在して

$$
y^{mathsf T}A
=
ho(A)y^{mathsf T}
$$

となります。

もし $ho(A)$ に大きさ2以上の Jordan ブロックがあれば、ある $w$ が存在して

$$
(A-ho(A)I)w=x
$$

を満たします。

左から $y^{mathsf T}$ を掛けると

$$
0
=
y^{mathsf T}(A-ho(A)I)w
=
y^{mathsf T}x.
$$

しかし $x>0$、$y>0$ だから

$$
y^{mathsf T}x>0
$$

であり矛盾です。

従って $ho(A)$ は代数的に単純です。
<!-- proof-end -->

この定理は、NA10 の一般の冪乗法で必要だった

$$
|lambda_1|>|lambda_2|
$$

を、正行列では構造そのものが保証することを意味します。

---

## 3. 既約性は「どの成分からも全体へ届く」ことを表す

正行列は非常に強い条件です。

実際のネットワーク行列では0が大量に現れます。

そこで0を許したまま「成分が分断されていない」ことを表す条件を導入します。

<a id="def-na11-irreducible"></a>
<!-- formal-statement-start -->
### 定義（既約非負行列）

非負行列 $A=(a_{ij})inmathbb R^{n	imes n}$ に対し、頂点集合 ${1,dots,n}$ を持ち、

$$
a_{ij}>0
$$

のとき有向辺

$$
jlongrightarrow i
$$

を引く。

この有向グラフで任意の頂点から任意の頂点へ有向路が存在するとき、$A$ を **既約**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-irreducible -->
### 例：2周期の行列は既約である

**定義の確認**。

$$
P=
egin{pmatrix}
0&1\\
1&0
end{pmatrix}
$$

では

$$
1	o2,
qquad
2	o1
$$

という辺があります。

したがって1から2へ、2から1へ到達でき、自分自身へも長さ2の路で戻れます。

従って $P$ は既約です。

しかし

$$
P^2=I
$$

であり、後で見るように冪乗反復は一般には収束しません。

既約性だけでは周期振動を消せないことが、この例の重要な点です。
<!-- definition-example-end -->

---

## 4. 既約非負行列にも正の Perron 固有ベクトルがある

<a id="thm-na11-irreducible-perron-frobenius"></a>
<!-- formal-statement-start -->
### 定理（既約非負行列に対する Perron--Frobenius 定理）

$Ainmathbb R^{n	imes n}$ を既約な非負行列とする。

このとき

1. $ho(A)ge0$ は $A$ の固有値である。
2. ある $x>0$ が存在して
   $$
   Ax=ho(A)x
   $$
   を満たす。
3. 正の固有ベクトルは定数倍を除いて一意である。
4. $ho(A)$ は代数的に単純である。

ただし、$ho(A)$ と同じ絶対値を持つ別の固有値が存在することはあり得る。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず

$$
B=I+A
$$

と置きます。

$A$ が既約なので、任意の $j$ から任意の $i$ へ、重複頂点を除けば長さ高々 $n-1$ の有向路があります。

$B$ は対角成分に1を持つので、その路の途中または終点で自己ループを使って長さを $n-1$ まで延ばせます。

従って

$$
B^{n-1}>0
$$

です。

したがって $B^{n-1}$ は正行列であり、[正行列版 Perron--Frobenius 定理](#thm-na11-positive-perron-frobenius)を適用できます。

より直接には $B^{n-1}>0$ から、$B$ 自身にも正の右固有ベクトル $x>0$ と正の左固有ベクトル $y>0$ があり、

$$
Bx=mu x,
$$

$$
y^{mathsf T}B
=
mu y^{mathsf T}
$$

となる実数 $mu>0$ が得られます。

すると

$$
Ax=(mu-1)x.
$$

ここで

$$
r=mu-1.
$$

$Age0$、$x>0$ なので $rge0$ です。

$r$ が $A$ のスペクトル半径であることを示します。

$Az=lambda z$ とします。

成分ごとに

$$
A|z|
ge
|Az|
=
|lambda||z|.
$$

左から $y^{mathsf T}$ を掛けると

$$
y^{mathsf T}A|z|
ge
|lambda|y^{mathsf T}|z|.
$$

一方

$$
y^{mathsf T}A
=
r y^{mathsf T}
$$

なので

$$
r y^{mathsf T}|z|
ge
|lambda|y^{mathsf T}|z|.
$$

$y>0$、$z
e0$ だから

$$
y^{mathsf T}|z|>0.
$$

従って

$$
|lambda|le r.
$$

$r$ 自身が固有値なので

$$
r=ho(A).
$$

したがって

$$
Ax=ho(A)x,
qquad
x>0.
$$

正固有ベクトルの一意性は、正行列の場合と同じ最大比の議論で示せます。

また $B=I+A$ では固有値が1だけ平行移動するため、$B$ の Perron 固有値の代数的単純性から $ho(A)$ の代数的単純性も従います。
<!-- proof-end -->

注意すべきなのは、最後に

$$
|lambda|<ho(A)
$$

までは主張していないことです。

既約でも周期性があると、スペクトル円周上に複数の固有値が残ります。

---

## 5. 原始性が周期性を排除する

<a id="def-na11-primitive"></a>
<!-- formal-statement-start -->
### 定義（原始行列）

非負行列 $Age0$ に対し、ある正整数 $m$ が存在して

$$
oxed{
A^m>0
}
$$

となるとき、$A$ を **原始行列**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-primitive -->
### 例：1回では0が残るが2回で全成分が正になる

**定義の確認**。

$$
A=
egin{pmatrix}
1&1\\
1&0
end{pmatrix}
$$

は非負ですが $(2,2)$ 成分が0なので正行列ではありません。

しかし

$$
A^2
=
egin{pmatrix}
2&1\\
1&1
end{pmatrix}
>0.
$$

従って $A$ は原始行列です。
<!-- definition-example-end -->

先ほどの2周期行列

$$
P=
egin{pmatrix}
0&1\\
1&0
end{pmatrix}
$$

では

$$
P^{2k}=I,
qquad
P^{2k+1}=P
$$

なので、どの冪にも0が残ります。

従って既約ですが原始ではありません。

<a id="prop-na11-primitive-spectral-gap"></a>
<!-- formal-statement-start -->
### 命題（原始行列の Perron 固有値にはスペクトルギャップがある）

$Age0$ を原始行列とする。

このとき $ho(A)>0$ は代数的に単純な固有値であり、ある $x>0$ が存在して

$$
Ax=ho(A)x
$$

を満たす。

さらに、$lambda
eho(A)$ が $A$ の固有値なら

$$
oxed{
|lambda|<ho(A)
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

原始性から、ある $m$ で

$$
A^m>0.
$$

従って $A$ は既約であり、[既約版 Perron--Frobenius 定理](#thm-na11-irreducible-perron-frobenius)により正の Perron 固有ベクトルが存在します。

もし

$$
A z=lambda z,
qquad
|lambda|=ho(A)
$$

なら

$$
A^m z=lambda^m z.
$$

したがって $lambda^m$ は $A^m$ の固有値で、

$$
|lambda^m|
=
ho(A)^m
=
ho(A^m).
$$

しかし $A^m>0$ なので、正行列版 Perron--Frobenius 定理より、スペクトル円周上の固有値は

$$
ho(A^m)
$$

ただ一つです。

従って $z$ は $A^m$ の正 Perron 固有ベクトルと同じ1次元固有空間に属します。

つまり $z=cx$ です。

すると

$$
Az
=
cAx
=
cho(A)x
=
ho(A)z
$$

なので

$$
lambda=ho(A).
$$

従って他の固有値はすべて厳密に内側にあります。
<!-- proof-end -->

ここで初めて、一般の冪乗法で必要だった「支配固有値の絶対値が一意」という条件が自動的に得られます。

---

## 6. 列確率行列では Perron 固有値が1になる

この章では確率ベクトルを列ベクトルで持ちます。

したがって遷移行列は **列和が1** になる約束を採用します。

<a id="def-na11-column-stochastic-stationary"></a>
<!-- formal-statement-start -->
### 定義（列確率行列・定常確率ベクトル）

非負行列 $P=(p_{ij})inmathbb R^{n	imes n}$ が

$$
sum_{i=1}^n p_{ij}=1
qquad
(j=1,dots,n)
$$

を満たすとき、$P$ を **列確率行列**という。

確率ベクトル

$$
pige0,
qquad
mathbf 1^{mathsf T}pi=1
$$

が

$$
oxed{
Ppi=pi
}
$$

を満たすとき、$pi$ を $P$ の **定常確率ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-column-stochastic-stationary -->
### 例：2状態の定常確率ベクトル

**定義の確認**。

$$
P=
egin{pmatrix}
1/2&1/4\\
1/2&3/4
end{pmatrix}
$$

では、第1列・第2列の和はともに1です。

したがって $P$ は列確率行列です。

$$
Ppi=pi,
qquad
pi=
egin{pmatrix}
pi_1\\
pi_2
end{pmatrix}
$$

と置くと、第1成分から

$$
rac12pi_1+rac14pi_2=pi_1.
$$

従って

$$
pi_2=2pi_1.
$$

さらに

$$
pi_1+pi_2=1
$$

だから

$$
oxed{
pi=
egin{pmatrix}
1/3\\
2/3
end{pmatrix}
}.
$$

実際に代入すると

$$
Ppi=pi
$$

を確認できます。
<!-- definition-example-end -->

列確率行列では

$$
mathbf1^{mathsf T}P
=
mathbf1^{mathsf T}.
$$

従って $P^{mathsf T}$ は固有値1を持ち、$P$ も同じ特性多項式を持つので1は $P$ の固有値です。

また誘導1-ノルムは

$$
|P|_1
=
max_jsum_i|p_{ij}|
=
1.
$$

したがって

$$
ho(P)le1.
$$

1が固有値なので

$$
oxed{
ho(P)=1
}.
$$

<a id="prop-na11-irreducible-stationary"></a>
<!-- formal-statement-start -->
### 命題（既約列確率行列の定常確率ベクトル）

$P$ を既約な列確率行列とする。

このとき、成分がすべて正の定常確率ベクトル $pi>0$ がただ一つ存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列確率行列では

$$
ho(P)=1.
$$

既約版 Perron--Frobenius 定理により、ある $x>0$ が存在して

$$
Px=x
$$

を満たし、正固有ベクトルは定数倍を除いて一意です。

そこで

$$
pi
=
rac{x}{mathbf1^{mathsf T}x}
$$

と正規化すれば

$$
pi>0,
qquad
mathbf1^{mathsf T}pi=1,
qquad
Ppi=pi.
$$

正規化条件が定数倍の自由度を消すので、$pi$ は一意です。
<!-- proof-end -->

---

## 7. 「定常確率ベクトルが一意」と「反復が収束」は別である

既約性だけでは

$$
P^kx_0	opi
$$

は保証されません。

<a id="example-na11-period-two"></a>
### 反例：既約だが2周期で振動する

$$
P=
egin{pmatrix}
0&1\\
1&0
end{pmatrix}
$$

は既約な列確率行列です。

定常確率ベクトルは

$$
pi
=
rac12
egin{pmatrix}
1\\1
end{pmatrix}
$$

で一意です。

しかし

$$
x_0=
egin{pmatrix}
1\\0
end{pmatrix}
$$

から始めると

$$
Px_0=
egin{pmatrix}
0\\1
end{pmatrix},
$$

$$
P^2x_0=x_0.
$$

従って

$$
P^{2k}x_0=x_0,
qquad
P^{2k+1}x_0=Px_0
$$

であり、収束しません。

壊れたのは既約性ではなく **原始性**です。

実際、この行列の固有値は

$$
1,qquad -1
$$

なので、Perron 固有値1と同じ絶対値を持つ $-1$ が周期振動を保存しています。

---

## 8. 原始列確率行列では冪乗反復が定常分布へ収束する

<a id="thm-na11-primitive-stochastic-convergence"></a>
<!-- formal-statement-start -->
### 定理（原始列確率行列の冪収束）

$P$ を原始な列確率行列とし、$pi>0$ をその定常確率ベクトルとする。

このとき任意の確率ベクトル $x_0$ に対して

$$
oxed{
P^kx_0
longrightarrow
pi
}
$$

が成り立つ。

さらに行列として

$$
oxed{
P^k
longrightarrow
pimathbf1^{mathsf T}
}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列確率行列なので Perron 固有値は1です。

原始性から[スペクトルギャップ](#prop-na11-primitive-spectral-gap)があり、1以外の固有値はすべて

$$
|lambda|<1
$$

を満たします。

また1は代数的に単純です。

Jordan 標準形で、固有値1に対応する1次元ブロックと、それ以外のブロックへ分けます。

1以外の Jordan ブロックでは、NA9 と同じ理由で

$$
k^j|lambda|^k	o0
$$

となるため、その寄与はすべて0へ収束します。

一方、固有値1の右固有ベクトルは $pi$、左固有ベクトルは $mathbf1$ です。

正規化

$$
mathbf1^{mathsf T}pi=1
$$

により、固有値1への射影は

$$
pimathbf1^{mathsf T}
$$

です。

従って

$$
P^k	opimathbf1^{mathsf T}.
$$

確率ベクトル $x_0$ では

$$
mathbf1^{mathsf T}x_0=1
$$

なので

$$
P^kx_0
	o
pimathbf1^{mathsf T}x_0
=
pi.
$$
<!-- proof-end -->

これは NA10 の冪乗法を、確率ベクトルを保つ形へ特殊化した定理です。

---

## 9. Web グラフから列確率行列を作る

PageRank では、各ページを頂点とし、リンクを有向辺とみなします。

ページ $j$ から出るリンク数を $d_j$ とします。

$d_j>0$ なら

$$
p_{ij}
=
egin{cases}
1/d_j, & j	ext{ から }i	ext{ へのリンクがある},\\
0, & 	ext{それ以外}
end{cases}
$$

と置けば、第 $j$ 列の和は1です。

問題は

$$
d_j=0
$$

となるページです。

このような **出リンクなし頂点（dangling node）**では、そのままでは第 $j$ 列が0になり、確率質量が失われます。

そこで確率ベクトル $v$ を一つ選び、その列を

$$
v
$$

で置き換えます。

すると dangling node を含む場合でも列確率行列 $P$ を構成できます。

この修正は単なる実装上の穴埋めではありません。

後で PageRank の teleportation と同じ確率ベクトル $v$ を使うと、モデル全体を一つの確率遷移として読めます。

---

## 10. PageRank は正行列の Perron 固有ベクトルである

<a id="def-na11-pagerank"></a>
<!-- formal-statement-start -->
### 定義（PageRank 行列・PageRank ベクトル）

$P$ を列確率行列、$v>0$ を

$$
mathbf1^{mathsf T}v=1
$$

を満たす確率ベクトル、$0<alpha<1$ とする。

$$
oxed{
G
=
alpha P
+
(1-alpha)
vmathbf1^{mathsf T}
}
$$

を **PageRank 行列**とする。

確率ベクトル $r$ が

$$
oxed{
Gr=r
}
$$

を満たすとき、$r$ を **PageRank ベクトル**という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-na11-pagerank -->
### 例：3ページの PageRank を方程式から求める

**定義の確認**。

ページ間リンクから

$$
P=
egin{pmatrix}
0&0&1\\
1/2&0&0\\
1/2&1&0
end{pmatrix}
$$

が得られたとします。

各列和は1なので $P$ は列確率行列です。

$$
alpha=rac12,
qquad
v=
rac13
egin{pmatrix}
1\\1\\1
end{pmatrix}
$$

とします。

PageRank 方程式は

$$
r
=
rac12Pr
+
rac12v.
$$

すなわち

$$
left(
I-rac12P
ight)r
=
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}.
$$

これを解くと

$$
oxed{
r=
egin{pmatrix}
14/39\\
10/39\\
5/13
end{pmatrix}
}.
$$

成分はすべて正で、和は

$$
rac{14}{39}
+
rac{10}{39}
+
rac{15}{39}
=
1.
$$

従って確率ベクトルになっています。
<!-- definition-example-end -->

<a id="thm-na11-pagerank-wellposedness"></a>
<!-- formal-statement-start -->
### 定理（PageRank の存在・一意性）

$P$ を任意の列確率行列、$v>0$ を確率ベクトル、$0<alpha<1$ とする。

このとき PageRank 行列

$$
G
=
alpha P
+
(1-alpha)
vmathbf1^{mathsf T}
$$

は正の列確率行列である。

従って一意な PageRank ベクトル $r>0$ が存在する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず各成分について

$$
g_{ij}
=
alpha p_{ij}
+
(1-alpha)v_i.
$$

$v_i>0$、$1-alpha>0$ だから

$$
g_{ij}>0.
$$

従って

$$
G>0.
$$

次に第 $j$ 列の和は

$$
egin{aligned}
sum_i g_{ij}
&=
alphasum_i p_{ij}
+
(1-alpha)sum_i v_i\\
&=
alpha+(1-alpha)\\
&=
1.
end{aligned}
$$

したがって $G$ は列確率行列です。

正行列版 Perron--Frobenius 定理より、Perron 固有値1に対応する正固有ベクトルが定数倍を除いて一意です。

成分和を1へ正規化すれば、一意な確率ベクトル

$$
r>0,
qquad
Gr=r
$$

が得られます。
<!-- proof-end -->

重要なのは、元の $P$ が

- 既約でなくてもよい
- 原始でなくてもよい
- dangling node の修正後に複数の閉じた部分へ分かれていてもよい

ことです。

$v>0$ と $0<alpha<1$ が $G$ を正行列へ変え、Perron--Frobenius 定理の最も強い形を使えるようにします。

---

## 11. PageRank 反復は ℓ1 で縮小する

Perron--Frobenius 理論だけでも一意性と収束は得られます。

しかし PageRank にはさらに強い構造があります。

確率ベクトル $x,y$ では

$$
mathbf1^{mathsf T}(x-y)=0
$$

だから

$$
Gx-Gy
=
alpha P(x-y).
$$

<a id="prop-na11-pagerank-contraction"></a>
<!-- formal-statement-start -->
### 命題（PageRank 写像の ℓ1 縮小性）

$P$ を列確率行列とし、

$$
T(x)
=
alpha Px+(1-alpha)v
$$

とする。

任意の確率ベクトル $x,y$ に対して

$$
oxed{
|T(x)-T(y)|_1
le
alpha|x-y|_1
}
$$

が成り立つ。

従って PageRank 反復

$$
x_{k+1}=T(x_k)
$$

は一意な PageRank ベクトル $r$ に対して

$$
oxed{
|x_k-r|_1
le
alpha^k|x_0-r|_1
}
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

任意のベクトル $z$ に対して

$$
egin{aligned}
|Pz|_1
&=
sum_i
left|
sum_jp_{ij}z_j
ight|\\
&le
sum_isum_jp_{ij}|z_j|\\
&=
sum_j|z_j|
sum_ip_{ij}\\
&=
sum_j|z_j|\\
&=
|z|_1.
end{aligned}
$$

したがって

$$
|P|_1le1.
$$

実際、列和が1なので $|P|_1=1$ です。

確率ベクトル $x,y$ では

$$
T(x)-T(y)
=
alpha P(x-y)
$$

だから

$$
|T(x)-T(y)|_1
le
alpha|x-y|_1.
$$

PageRank ベクトル $r$ は

$$
T(r)=r
$$

を満たすので

$$
|x_{k+1}-r|_1
le
alpha|x_k-r|_1.
$$

これを反復すれば

$$
|x_k-r|_1
le
alpha^k|x_0-r|_1.
$$
<!-- proof-end -->

この評価は、固有値を実際に計算しなくても収束率を保証します。

---

## 12. PageRank は線形方程式としても解ける

固定点方程式

$$
r
=
alpha Pr+(1-alpha)v
$$

を移項すると

$$
oxed{
(I-alpha P)r
=
(1-alpha)v
}
$$

です。

<a id="prop-na11-pagerank-neumann"></a>
<!-- formal-statement-start -->
### 命題（PageRank の線形方程式表示と Neumann 級数）

$P$ を列確率行列、$0<alpha<1$ とする。

このとき $I-alpha P$ は可逆で、

$$
oxed{
(I-alpha P)^{-1}
=
sum_{k=0}^{infty}
alpha^kP^k
}
$$

が成り立つ。

したがって PageRank ベクトルは

$$
oxed{
r
=
(1-alpha)
sum_{k=0}^{infty}
alpha^kP^kv
}
$$

と表される。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

列確率行列では

$$
|P|_1=1.
$$

従って

$$
|alpha P|_1=alpha<1.
$$

部分和

$$
S_m
=
sum_{k=0}^m
(alpha P)^k
$$

に対し

$$
(I-alpha P)S_m
=
I-(alpha P)^{m+1}.
$$

また

$$
|(alpha P)^{m+1}|_1
le
alpha^{m+1}
	o0.
$$

従って

$$
S_m
	o
sum_{k=0}^{infty}
(alpha P)^k
$$

かつ

$$
(I-alpha P)
sum_{k=0}^{infty}
(alpha P)^k
=
I.
$$

右から掛けても同様なので、これが逆行列です。

PageRank 方程式

$$
(I-alpha P)r
=
(1-alpha)v
$$

へ代入して

$$
r
=
(1-alpha)
sum_{k=0}^{infty}
alpha^kP^kv.
$$
<!-- proof-end -->

この式は PageRank を

> $v$ から出発し、$P$ による0回、1回、2回、…のリンク追跡を、幾何級数の重みで平均したもの

と読めることを示します。

---

## 13. 反復差から真の誤差を評価できる

実際の計算では真の $r$ は未知なので

$$
|x_k-r|_1
$$

を直接計算できません。

しかし縮小性から、連続する反復の差だけで誤差上界を作れます。

<a id="prop-na11-pagerank-stopping"></a>
<!-- formal-statement-start -->
### 命題（PageRank 反復の停止判定）

PageRank 反復

$$
x_{k+1}=T(x_k)
$$

に対して

$$
d_k
=
|x_{k+1}-x_k|_1
$$

と置く。

このとき

$$
oxed{
|x_k-r|_1
le
rac{d_k}{1-alpha}
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

縮小性から

$$
|x_{k+j+1}-x_{k+j}|_1
le
alpha^j d_k.
$$

また $x_{k+m}	o r$ なので

$$
r-x_k
=
sum_{j=0}^{infty}
(x_{k+j+1}-x_{k+j}).
$$

三角不等式より

$$
egin{aligned}
|r-x_k|_1
&le
sum_{j=0}^{infty}
|x_{k+j+1}-x_{k+j}|_1\\
&le
d_k
sum_{j=0}^{infty}alpha^j\\
&=
rac{d_k}{1-alpha}.
end{aligned}
$$
<!-- proof-end -->

したがって目標誤差を $arepsilon$ とするなら、

$$
d_k
le
(1-alpha)arepsilon
$$

を停止条件にすれば十分です。

---

## 14. α を1へ近づけるほどリンク構造を強く反映するが、収束と感度は悪化する

PageRank は

$$
r
=
alpha Pr+(1-alpha)v
$$

です。

$alpha$ が大きいほどリンク行列 $P$ の影響が強く、teleportation の影響は弱くなります。

一方、縮小率は $alpha$ そのものなので、$alpha$ が1へ近いほど反復収束は遅くなります。

さらにリンク行列の摂動に対しても同じ $1-alpha$ が効きます。

<a id="prop-na11-pagerank-perturbation"></a>
<!-- formal-statement-start -->
### 命題（PageRank のリンク行列に対する ℓ1 感度評価）

$P,Q$ を列確率行列とし、同じ $v>0$ と $0<alpha<1$ を用いて得られる PageRank ベクトルをそれぞれ $r_P,r_Q$ とする。

このとき

$$
oxed{
|r_P-r_Q|_1
le
rac{alpha}{1-alpha}
|P-Q|_1
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定点方程式を引くと

$$
r_P-r_Q
=
alpha P(r_P-r_Q)
+
alpha(P-Q)r_Q.
$$

1-ノルムを取り、

$$
|Pz|_1le|z|_1,
qquad
|r_Q|_1=1
$$

を使うと

$$
|r_P-r_Q|_1
le
alpha|r_P-r_Q|_1
+
alpha|P-Q|_1.
$$

従って

$$
(1-alpha)|r_P-r_Q|_1
le
alpha|P-Q|_1.
$$

両辺を $1-alpha>0$ で割れば結論を得ます。
<!-- proof-end -->

この評価は上界なので、実際の変化が必ずこの大きさになるわけではありません。

しかし

$$
rac{alpha}{1-alpha}
$$

が現れることで、

> $alpha$ を1へ近づけると、リンク行列の細かな変化に対する最悪時感度も大きくなる

ことが分かります。

---

## 15. 数値計算として PageRank をどう解くか

PageRank には少なくとも二つの見方があります。

### 15.1 固有値問題として解く

$$
Gr=r
$$

なので、$G$ の固有値1に対応する Perron 固有ベクトルを求めます。

$G>0$ だから冪乗法は自然です。

しかし大規模 Web グラフでは $G$ を密行列として明示的に作る必要はありません。

$$
Gx
=
alpha Px
+
(1-alpha)v(mathbf1^{mathsf T}x)
$$

と計算すればよく、確率ベクトル $x$ なら

$$
mathbf1^{mathsf T}x=1
$$

なので

$$
Gx
=
alpha Px+(1-alpha)v.
$$

したがって疎な $P$ の行列ベクトル積だけで反復できます。

### 15.2 線形方程式として解く

$$
(I-alpha P)r=(1-alpha)v
$$

なので、NA8・NA9 の線形方程式解法も候補です。

ただし巨大疎行列では、因数分解で fill-in を生むより、疎行列ベクトル積だけを使う固定点反復が自然な場合があります。

この判断は

- 行列サイズ
- 疎性
- 必要精度
- 複数の $v$ を変えて何度解くか
- 前処理を作るコスト

で変わります。

---

## 16. 仮定を外すと何が壊れるか

### 16.1 非負性を失う

成分に負値があると

$$
|Az|
le
A|z|
$$

という成分ごとの比較自体が意味を失います。

Perron--Frobenius の順序構造は使えません。

### 16.2 既約性を失う

行列が複数の閉じた部分へ分かれると、固有値1に対応する非負固有ベクトルが複数存在することがあります。

定常確率ベクトルの一意性が壊れます。

### 16.3 原始性を失う

既約でも周期性が残ると、絶対値1の別固有値が現れ、

$$
P^kx_0
$$

が振動することがあります。

2周期行列がその最小例です。

### 16.4 teleportation を失う

$alpha=1$ では

$$
G=P
$$

です。

元の $P$ が既約・原始でなければ、一意性や反復収束を保証できません。

また感度評価の係数

$$
rac{alpha}{1-alpha}
$$

も発散します。

### 16.5 $v>0$ を失う

$v$ に0成分があると、$G$ が正行列になるとは限りません。

PageRank 自体は場合によって定義できますが、「任意の $P$ に対して正行列版 Perron--Frobenius を即座に適用する」という証明機構は壊れます。

---

## 17. 演習

### NA11-A01 既約性と原始性を見分ける

- Level: A
- 目安時間: 15分

次の行列を考える。

$$
A=
egin{pmatrix}
0&1\\
1&0
end{pmatrix},
qquad
B=
egin{pmatrix}
1&1\\
1&0
end{pmatrix}.
$$

1. $A,B$ がともに非負行列であることを確認せよ。
2. $A$ が既約であることを有向グラフから確認せよ。
3. $A$ が原始でないことを示せ。
4. $B^2$ を計算し、$B$ が原始であることを示せ。

<!-- solution-start -->
#### 詳細解答

両行列の全成分は0以上なので、

$$
Age0,
qquad
Bge0.
$$

$A$ では

$$
a_{21}=1
$$

から

$$
1	o2,
$$

$$
a_{12}=1
$$

から

$$
2	o1
$$

という有向辺があります。

したがって任意の頂点から他方へ到達でき、$A$ は既約です。

一方、

$$
A^2=I.
$$

従って

$$
A^{2k}=I,
qquad
A^{2k+1}=A.
$$

どの冪にも0成分が残るので、

$$
A^m>0
$$

となる $m$ は存在しません。

よって $A$ は原始ではありません。

次に

$$
B^2
=
egin{pmatrix}
1&1\\
1&0
end{pmatrix}
egin{pmatrix}
1&1\\
1&0
end{pmatrix}
=
egin{pmatrix}
2&1\\
1&1
end{pmatrix}.
$$

全成分が正なので

$$
B^2>0.
$$

従って $B$ は原始です。

この問題は

> 既約性は到達可能性、原始性は十分長い同一ステップ数で全成分が正になること

という違いを確認しています。
<!-- solution-end -->

### NA11-A02 列確率行列の定常確率ベクトル

- Level: A
- 目安時間: 15分

$$
P=
egin{pmatrix}
1/2&1/4\\
1/2&3/4
end{pmatrix}
$$

とする。

1. $P$ が列確率行列であることを確認せよ。
2. $Ppi=pi$、$mathbf1^{mathsf T}pi=1$ を満たす $pi$ を求めよ。
3. $P>0$ であることから、$pi$ が一意である理由を説明せよ。

<!-- solution-start -->
#### 詳細解答

第1列の和は

$$
rac12+rac12=1,
$$

第2列の和は

$$
rac14+rac34=1.
$$

また全成分は非負なので $P$ は列確率行列です。

$$
pi=
egin{pmatrix}
pi_1\\
pi_2
end{pmatrix}
$$

と置きます。

$Ppi=pi$ の第1成分は

$$
rac12pi_1+rac14pi_2=pi_1.
$$

従って

$$
rac14pi_2=rac12pi_1,
$$

すなわち

$$
pi_2=2pi_1.
$$

正規化条件

$$
pi_1+pi_2=1
$$

へ代入すると

$$
3pi_1=1.
$$

従って

$$
oxed{
pi=
egin{pmatrix}
1/3\\
2/3
end{pmatrix}
}.
$$

$P$ は全成分が正なので正行列です。

正行列版 Perron--Frobenius 定理より、Perron 固有値1に対応する正固有ベクトルは定数倍を除いて一意です。

さらに成分和1という正規化を課したため、定数倍の自由度も消えます。

従って定常確率ベクトル $pi$ は一意です。
<!-- solution-end -->

### NA11-A03 3ページの PageRank

- Level: A
- 目安時間: 20分

$$
P=
egin{pmatrix}
0&0&1\\
1/2&0&0\\
1/2&1&0
end{pmatrix},
qquad
alpha=rac12,
qquad
v=
rac13
egin{pmatrix}
1\\1\\1
end{pmatrix}
$$

とする。

1. $P$ が列確率行列であることを確認せよ。
2. PageRank 方程式
   $$
   r=rac12Pr+rac12v
   $$
   を連立一次方程式へ書き直せ。
3. PageRank ベクトル
   $$
   r=
   egin{pmatrix}
   14/39\\
   10/39\\
   5/13
   end{pmatrix}
   $$
   が方程式を満たすことを直接確認せよ。

<!-- solution-start -->
#### 詳細解答

各列の和は

$$
0+rac12+rac12=1,
$$

$$
0+0+1=1,
$$

$$
1+0+0=1.
$$

従って $P$ は列確率行列です。

PageRank 方程式は

$$
r
=
rac12Pr
+
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}.
$$

移項して

$$
oxed{
left(
I-rac12P
ight)r
=
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}
}.
$$

候補

$$
r=
egin{pmatrix}
14/39\\
10/39\\
15/39
end{pmatrix}
$$

に対し

$$
Pr
=
egin{pmatrix}
15/39\\
7/39\\
17/39
end{pmatrix}.
$$

したがって

$$
rac12Pr
+
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}
=
egin{pmatrix}
15/78\\
7/78\\
17/78
end{pmatrix}
+
egin{pmatrix}
13/78\\
13/78\\
13/78
end{pmatrix}.
$$

よって

$$
=
egin{pmatrix}
28/78\\
20/78\\
30/78
end{pmatrix}
=
egin{pmatrix}
14/39\\
10/39\\
15/39
end{pmatrix}
=
r.
$$

また

$$
mathbf1^{mathsf T}r
=
rac{14+10+15}{39}
=
1.
$$

従って確かに PageRank ベクトルです。
<!-- solution-end -->

### NA11-A04 反復差から停止誤差を保証する

- Level: A
- 目安時間: 10分

PageRank のダンピング係数を

$$
alpha=0.85
$$

とする。

ある反復で

$$
d_k
=
|x_{k+1}-x_k|_1
=
3	imes10^{-9}
$$

となった。

1. [停止判定](#prop-na11-pagerank-stopping)から $|x_k-r|_1$ の上界を求めよ。
2. $|x_k-r|_1le10^{-7}$ を保証するには、$d_k$ をいくつ以下にすればよいか。

<!-- solution-start -->
#### 詳細解答

停止判定は

$$
|x_k-r|_1
le
rac{d_k}{1-alpha}
$$

です。

ここで

$$
1-alpha=0.15.
$$

したがって

$$
|x_k-r|_1
le
rac{3	imes10^{-9}}{0.15}
=
2	imes10^{-8}.
$$

よって

$$
oxed{
|x_k-r|_1
le
2	imes10^{-8}
}.
$$

次に

$$
rac{d_k}{1-alpha}
le
10^{-7}
$$

を要求します。

従って

$$
d_k
le
0.15	imes10^{-7}
=
1.5	imes10^{-8}.
$$

したがって停止条件として

$$
oxed{
d_kle1.5	imes10^{-8}
}
$$

を使えば十分です。
<!-- solution-end -->

### NA11-B01 既約でも冪乗反復が収束しないことを証明する

- Level: B
- 目安時間: 20分

$$
P=
egin{pmatrix}
0&1\\
1&0
end{pmatrix}
$$

とする。

1. $P$ が既約な列確率行列であることを示せ。
2. 定常確率ベクトルが
   $$
   pi=rac12(1,1)^{mathsf T}
   $$
   で一意であることを示せ。
3. $x_0=(1,0)^{mathsf T}$ からの反復 $x_{k+1}=Px_k$ が収束しないことを示せ。
4. 固有値を求め、どの Perron--Frobenius の仮定が不足しているか説明せよ。

<!-- solution-start -->
#### 詳細解答

各列和は1で、全成分は非負なので $P$ は列確率行列です。

また有向グラフには

$$
1	o2,
qquad
2	o1
$$

があるため既約です。

定常方程式

$$
Ppi=pi
$$

を

$$
pi=
egin{pmatrix}
a\\b
end{pmatrix}
$$

で書くと

$$
b=a,
qquad
a=b.
$$

正規化

$$
a+b=1
$$

から

$$
a=b=rac12.
$$

従って

$$
oxed{
pi=
rac12
egin{pmatrix}
1\\1
end{pmatrix}
}.
$$

既約版 Perron--Frobenius 定理により、正の定常確率ベクトルは一意です。

一方、

$$
x_0=
egin{pmatrix}
1\\0
end{pmatrix}
$$

なら

$$
x_1=Px_0=
egin{pmatrix}
0\\1
end{pmatrix},
$$

$$
x_2=Px_1=
egin{pmatrix}
1\\0
end{pmatrix}
=x_0.
$$

従って

$$
x_{2k}=x_0,
qquad
x_{2k+1}=x_1
$$

であり、収束しません。

特性方程式は

$$
det(P-lambda I)
=
lambda^2-1
$$

なので固有値は

$$
1,qquad -1.
$$

$-1$ は Perron 固有値1と同じ絶対値を持ちます。

不足しているのは **原始性**です。

既約性は正の定常確率ベクトルの一意性を与えますが、スペクトル円周上の周期固有値までは排除しません。
<!-- solution-end -->

### NA11-B02 Neumann 級数から PageRank を近似する

- Level: B
- 目安時間: 25分

列確率行列 $P$、確率ベクトル $v$、$0<alpha<1$ に対して

$$
r
=
(1-alpha)
sum_{k=0}^{infty}
alpha^kP^kv
$$

とする。

1. 第 $m$ 部分和
   $$
   r^{(m)}
   =
   (1-alpha)
   sum_{k=0}^{m}
   alpha^kP^kv
   $$
   に対して
   $$
   |r-r^{(m)}|_1
   le
   alpha^{m+1}
   $$
   を示せ。
2. $alpha=0.8$ のとき、この上界を $10^{-6}$ 以下にするための十分な $m$ を求めよ。

<!-- solution-start -->
#### 詳細解答

差は

$$
r-r^{(m)}
=
(1-alpha)
sum_{k=m+1}^{infty}
alpha^kP^kv.
$$

列確率行列では

$$
|Pz|_1le|z|_1
$$

です。

また $v$ は確率ベクトルなので

$$
|v|_1=1.
$$

従って

$$
|P^kv|_1le1.
$$

三角不等式から

$$
egin{aligned}
|r-r^{(m)}|_1
&le
(1-alpha)
sum_{k=m+1}^{infty}
alpha^k
|P^kv|_1\\
&le
(1-alpha)
sum_{k=m+1}^{infty}
alpha^k\\
&=
(1-alpha)
rac{alpha^{m+1}}{1-alpha}\\
&=
oxed{
alpha^{m+1}
}.
end{aligned}
$$

次に

$$
0.8^{m+1}le10^{-6}
$$

を満たせば十分です。

対数を取ると

$$
(m+1)log0.8
le
log10^{-6}.
$$

$log0.8<0$ なので不等号の向きに注意して

$$
m+1
ge
rac{log10^{-6}}{log0.8}.
$$

右辺は約

$$
61.9
$$

です。

従って

$$
m+1ge62,
$$

すなわち

$$
oxed{
mge61
}
$$

で十分です。
<!-- solution-end -->

### NA11-B03 ダンピング係数とリンク行列感度

- Level: B
- 目安時間: 20分

二つの列確率行列 $P,Q$ が

$$
|P-Q|_1=0.01
$$

を満たすとする。

同じ teleportation ベクトル $v$ を使う。

1. $alpha=0.5$ のとき、PageRank ベクトル差の上界を求めよ。
2. $alpha=0.9$ のとき、同じ上界を求めよ。
3. この比較から、$alpha$ を大きくすることの数値的トレードオフを説明せよ。

<!-- solution-start -->
#### 詳細解答

感度評価は

$$
|r_P-r_Q|_1
le
rac{alpha}{1-alpha}
|P-Q|_1
$$

です。

$alpha=0.5$ なら

$$
rac{alpha}{1-alpha}
=
rac{0.5}{0.5}
=
1.
$$

従って

$$
oxed{
|r_P-r_Q|_1
le
0.01
}.
$$

$alpha=0.9$ なら

$$
rac{alpha}{1-alpha}
=
rac{0.9}{0.1}
=
9.
$$

従って

$$
oxed{
|r_P-r_Q|_1
le
0.09
}.
$$

$alpha$ を大きくすると PageRank は元のリンク行列 $P$ を強く反映します。

一方で、

- 固定点反復の縮小率 $alpha$ が1へ近づき、収束が遅くなる
- 最悪時感度係数 $alpha/(1-alpha)$ が大きくなる

という数値的代償があります。

したがって $alpha$ は「リンク構造をどれだけ残すか」と「反復収束・頑健性」の双方へ効くパラメータです。
<!-- solution-end -->

### NA11-C01 dangling node を含む小規模 PageRank を最後まで構成する

- Level: C
- 目安時間: 35分

3ページからなる有向グラフを考える。

- ページ1はページ2だけへリンクする。
- ページ2はページ1とページ3へリンクする。
- ページ3には出リンクがない。

dangling node の置換と teleportation の両方に

$$
v=
rac13
egin{pmatrix}
1\\1\\1
end{pmatrix}
$$

を使い、

$$
alpha=rac12
$$

とする。

1. dangling node を修正した列確率行列 $P$ を作れ。
2. PageRank 行列
   $$
   G=rac12P+rac12vmathbf1^{mathsf T}
   $$
   が正の列確率行列であることを確認せよ。
3. PageRank 方程式を解き、
   $$
   r=
   egin{pmatrix}
   5/16\\
   3/8\\
   5/16
   end{pmatrix}
   $$
   を得よ。
4. 任意の確率ベクトル $x_0$ から
   $$
   x_{k+1}=Gx_k
   $$
   としたとき
   $$
   |x_k-r|_1
   le
   2^{-k}|x_0-r|_1
   $$
   を説明せよ。
5. teleportation を外して $alpha=1$ とすると、どの保証が失われるかを本文の仮定と結び付けて説明せよ。

<!-- solution-start -->
#### 詳細解答

まず列ごとにリンク確率を作ります。

ページ1はページ2だけへリンクするので第1列は

$$
egin{pmatrix}
0\\1\\0
end{pmatrix}.
$$

ページ2はページ1とページ3へ等確率でリンクするので第2列は

$$
egin{pmatrix}
1/2\\0\\1/2
end{pmatrix}.
$$

ページ3は dangling node なので、指定された $v$ で置き換えます。

したがって

$$
oxed{
P=
egin{pmatrix}
0&1/2&1/3\\
1&0&1/3\\
0&1/2&1/3
end{pmatrix}
}.
$$

各列和は1で、全成分は非負です。

次に

$$
G
=
rac12P
+
rac12vmathbf1^{mathsf T}.
$$

第2項では各列が

$$
rac12v
=
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}
$$

です。

したがって $P$ に0成分があっても、$G$ の各成分には少なくとも $1/6$ が加わります。

よって

$$
G>0.
$$

また第1項の各列和は $1/2$、第2項の各列和も $1/2$ なので、$G$ の各列和は1です。

従って $G$ は正の列確率行列です。

PageRank 方程式は

$$
r
=
rac12Pr
+
rac16
egin{pmatrix}
1\\1\\1
end{pmatrix}.
$$

$$
r=
egin{pmatrix}
r_1\\r_2\\r_3
end{pmatrix}
$$

と書くと

$$
r_1
=
rac14r_2
+
rac16r_3
+
rac16,
$$

$$
r_2
=
rac12r_1
+
rac16r_3
+
rac16,
$$

$$
r_3
=
rac14r_2
+
rac16r_3
+
rac16.
$$

第1式と第3式の右辺は同じなので

$$
r_1=r_3.
$$

これを

$$
r_1=r_3=a,
qquad
r_2=b
$$

と置きます。

確率ベクトル条件から

$$
2a+b=1.
$$

第2式は

$$
b
=
rac12a
+
rac16a
+
rac16
=
rac23a+rac16.
$$

これを正規化条件へ代入すると

$$
2a+rac23a+rac16=1.
$$

従って

$$
rac83a
=
rac56,
$$

$$
a
=
rac{5}{16}.
$$

したがって

$$
b
=
1-2a
=
1-rac{10}{16}
=
rac{6}{16}
=
rac38.
$$

よって

$$
oxed{
r=
egin{pmatrix}
5/16\\
3/8\\
5/16
end{pmatrix}
}.
$$

次に $alpha=1/2$ なので、PageRank 写像の縮小率は $1/2$ です。

従って

$$
|x_{k+1}-r|_1
le
rac12|x_k-r|_1.
$$

これを反復すれば

$$
oxed{
|x_k-r|_1
le
2^{-k}|x_0-r|_1
}.
$$

最後に $alpha=1$ とすると

$$
G=P
$$

となり、teleportation による正値化が消えます。

この具体例の $P$ は dangling node 修正のおかげで列確率行列ですが、一般には

- 正行列である保証
- 任意のリンク構造に対する既約性
- 原始性
- 縮小率 $alpha<1$

が失われます。

したがって一意な正 PageRank ベクトルと、任意初期値からの幾何収束を一括して保証していた証明機構は使えなくなります。
<!-- solution-end -->

---

## 18. この章の要点

1. 非負行列では
   $$
   |Az|le A|z|
   $$
   という成分ごとの比較が使える。
2. 有限次元では
   $$
   |A^k|^{1/k}	oho(A),
   $$
   なので成分ごとの成長下界をスペクトル半径へ接続できる。
3. 正行列では $ho(A)$ は正の実固有値で、正固有ベクトルは定数倍を除いて一意であり、他の全固有値はスペクトル円の内側にある。
4. 既約非負行列でも正の Perron 固有ベクトルは一意だが、スペクトル円周上に周期固有値が残ることがある。
5. 原始性
   $$
   A^m>0
   $$
   は周期性を排除し、Perron 固有値に厳密なスペクトルギャップを与える。
6. 列確率行列では
   $$
   ho(P)=1.
   $$
7. 既約列確率行列は一意な正の定常確率ベクトルを持つ。
8. 原始列確率行列では
   $$
   P^k	opimathbf1^{mathsf T}.
   $$
9. PageRank 行列
   $$
   G=alpha P+(1-alpha)vmathbf1^{mathsf T}
   $$
   は $v>0$、$0<alpha<1$ により正の列確率行列になる。
10. PageRank 反復は
    $$
    |T(x)-T(y)|_1
    le
    alpha|x-y|_1
    $$
    という明示的な縮小率を持つ。
11. PageRank は
    $$
    (I-alpha P)r=(1-alpha)v
    $$
    という線形方程式でもあり、
    $$
    r=(1-alpha)sum_{kge0}alpha^kP^kv
    $$
    と表せる。
12. 反復差 $d_k$ から
    $$
    |x_k-r|_1
    le
    rac{d_k}{1-alpha}
    $$
    と停止誤差を保証できる。
13. リンク行列摂動に対する感度上界には
    $$
    rac{alpha}{1-alpha}
    $$
    が現れ、$alpha	o1$ では収束と最悪時感度の双方が悪化する。

次の NA12 では、線形方程式として導入した共役勾配法を、実対称正定値二次関数の最小化法として読み直します。最急降下法・Newton 法と比較しながら、線形代数と無制約最適化を接続します。
