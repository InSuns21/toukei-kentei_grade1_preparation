# F0-00F 線形写像・表現行列・基底変換・相似・対角化

F0-00Eで、ベクトル空間・基底・次元・座標を準備しました。

この講義では行列を「数字の表」としてではなく、**線形写像を基底で座標化したもの**として扱います。

中心線は

**線形写像 → kernel / image → rank-nullity → 表現行列 → 基底変換 → 相似 → 固有空間 → 対角化**

です。

---

## 1. 線形写像

ベクトル空間 $V,W$ の間の写像

$$
T:V\to W
$$

が、任意の $x,y\in V$ と $a,b\in\mathbb R$ に対して

$$
T(ax+by)=aT(x)+bT(y)
$$

を満たすとき、$T$ を **線形写像** といいます。

加法とスカラー倍を保存する写像です。

特に

$$
T(0)=0
$$

が必ず成り立ちます。

---

## 2. kernel と image

線形写像 $T:V\to W$ に対して

$$
\ker T
=
\{x\in V:T(x)=0\}
$$

を **核（kernel）**、

$$
\operatorname{Im}T
=
\{T(x):x\in V\}
$$

を **像（image）** といいます。

どちらも線形部分空間です。

- $\ker T$：写像によって0へ潰れる方向
- $\operatorname{Im}T$：出力として到達できる方向

という意味です。

---

## 3. rank-nullity theorem

$V$ を有限次元とし

$$
\dim V=n
$$

とします。

$\ker T$ の基底を

$$
u_1,\dots,u_r
$$

と取ります。

F0-00Eの基底延長定理により、これを $V$ の基底

$$
u_1,\dots,u_r,v_1,\dots,v_{n-r}
$$

へ延長できます。

任意の $x\in V$ は

$$
x
=
\sum_{i=1}^r a_i u_i
+
\sum_{j=1}^{n-r} b_j v_j
$$

と書けるので

$$
T(x)
=
\sum_{j=1}^{n-r}b_jT(v_j).
$$

したがって

$$
\operatorname{Im}T
=
\operatorname{span}(T(v_1),\dots,T(v_{n-r})).
$$

さらに $T(v_1),\dots,T(v_{n-r})$ は一次独立です。

もし

$$
\sum_j c_jT(v_j)=0
$$

なら

$$
T\left(\sum_jc_jv_j\right)=0,
$$

つまり

$$
\sum_jc_jv_j\in\ker T.
$$

しかし $u_i,v_j$ を合わせたものは基底なので、$v_j$ の非自明な線形結合が $\ker T$ に入ることはありません。したがって全ての $c_j=0$ です。

よって

$$
\dim\operatorname{Im}T=n-r.
$$

したがって

$$
\boxed{
\dim V
=
\dim\ker T
+
\dim\operatorname{Im}T
}
$$

です。

これが **rank-nullity theorem（階数・退化次数の定理）** です。

---

## 4. 表現行列：行列は基底を選んだ後に現れる

$V$ の基底を

$$
\mathcal B=(v_1,\dots,v_n),
$$

$W$ の基底を

$$
\mathcal C=(w_1,\dots,w_m)
$$

とします。

各 $T(v_j)$ は $W$ の基底 $\mathcal C$ で一意に

$$
T(v_j)
=
\sum_{i=1}^m a_{ij}w_i
$$

と書けます。

この係数を列に並べた行列

$$
[T]_{\mathcal C\leftarrow\mathcal B}
=
\begin{pmatrix}
|&&|\\
[T(v_1)]_{\mathcal C}&\cdots&[T(v_n)]_{\mathcal C}\\
|&&|
\end{pmatrix}
$$

を、基底 $\mathcal B,\mathcal C$ に関する $T$ の **表現行列** といいます。

重要な式は

$$
\boxed{
[T(x)]_{\mathcal C}
=
[T]_{\mathcal C\leftarrow\mathcal B}
[x]_{\mathcal B}
}
$$

です。

つまり行列は、抽象的な線形写像そのものではなく

> **入力基底と出力基底を選んだときの座標表示**

です。

---

## 5. なぜ行列の第 $j$ 列が $T(v_j)$ なのか

基底ベクトル $v_j$ の座標は

$$
[v_j]_{\mathcal B}=e_j
$$

です。

したがって

$$
[T(v_j)]_{\mathcal C}
=
[T]_{\mathcal C\leftarrow\mathcal B}e_j.
$$

行列に $e_j$ を掛けると第 $j$ 列が取り出されるので、表現行列の第 $j$ 列は $T(v_j)$ の座標になります。

標準基底の場合に「行列の各列が基底ベクトルの行き先」と習ったのは、この一般論の特殊例です。

---

## 6. 合成と行列積

$$
T:V\to W,
\qquad
S:W\to U
$$

を線形写像とします。

基底を

$$
\mathcal B\text{ on }V,
\quad
\mathcal C\text{ on }W,
\quad
\mathcal D\text{ on }U
$$

とすると

$$
[(S\circ T)(x)]_{\mathcal D}
=
[S]_{\mathcal D\leftarrow\mathcal C}
[T]_{\mathcal C\leftarrow\mathcal B}
[x]_{\mathcal B}.
$$

したがって

$$
\boxed{
[S\circ T]_{\mathcal D\leftarrow\mathcal B}
=
[S]_{\mathcal D\leftarrow\mathcal C}
[T]_{\mathcal C\leftarrow\mathcal B}
}
$$

です。

行列積の順序が「右から作用する」理由は、写像の合成そのものです。

---

## 7. 基底変換行列

同じベクトル空間 $V$ に二つの基底

$$
\mathcal B=(v_1,\dots,v_n),
\qquad
\mathcal B'=(v'_1,\dots,v'_n)
$$

を取ります。

新基底の座標から旧基底の座標へ移す行列を

$$
P
=
[I]_{\mathcal B\leftarrow\mathcal B'}
$$

とします。

すると任意の $x\in V$ について

$$
\boxed{
[x]_{\mathcal B}
=P[x]_{\mathcal B'}
}
$$

です。

$P$ の第 $j$ 列は

$$
[v'_j]_{\mathcal B}
$$

です。

基底から基底への変換なので $P$ は必ず正則です。

逆向きは

$$
[x]_{\mathcal B'}
=P^{-1}[x]_{\mathcal B}
$$

です。

---

## 8. 同じ線形写像の行列表現は相似になる

今度は自己写像

$$
T:V\to V
$$

を考えます。

基底 $\mathcal B$ に関する行列を

$$
A=[T]_{\mathcal B\leftarrow\mathcal B},
$$

基底 $\mathcal B'$ に関する行列を

$$
A'=[T]_{\mathcal B'\leftarrow\mathcal B'}
$$

とします。

$$
[x]_{\mathcal B}=P[x]_{\mathcal B'}
$$

なので

$$
[T(x)]_{\mathcal B}
=A[x]_{\mathcal B}
=AP[x]_{\mathcal B'}.
$$

一方

$$
[T(x)]_{\mathcal B}
=P[T(x)]_{\mathcal B'}
=PA'[x]_{\mathcal B'}.
$$

全ての座標ベクトルについて等しいので

$$
AP=PA'.
$$

したがって

$$
\boxed{
A'=P^{-1}AP
}
$$

です。

この関係を **相似** といいます。

相似な行列は違う行列に見えても、同じ線形写像を別の基底で見ているだけです。

---

## 9. 固有値・固有ベクトル・固有空間

自己写像

$$
T:V\to V
$$

に対して $v\ne0$ が

$$
T(v)=\lambda v
$$

を満たすとき、$\lambda$ を **固有値**、$v$ を **固有ベクトル** といいます。

固有値 $\lambda$ に対応する

$$
E_\lambda
=
\ker(T-\lambda I)
$$

を **固有空間** といいます。

固有ベクトルは「写像を掛けても向きが変わらず、倍率だけが $\lambda$ になる方向」です。

行列 $A$ では

$$
(A-\lambda I)v=0
$$

が非零解を持つための条件が

$$
\det(A-\lambda I)=0
$$

です。

---

## 10. 異なる固有値の固有ベクトルは一次独立

$\lambda_1,\dots,\lambda_k$ を互いに異なる固有値とし、対応する固有ベクトルを

$$
v_1,\dots,v_k
$$

とします。

すると $v_1,\dots,v_k$ は一次独立です。

<!-- proof-start -->
### 証明

$k$ に関する帰納法で示します。

$$
a_1v_1+\cdots+a_kv_k=0
$$

とします。

両辺に $T-\lambda_kI$ を作用させると

$$
\sum_{i=1}^{k-1}
a_i(\lambda_i-\lambda_k)v_i=0.
$$

帰納法の仮定より $v_1,\dots,v_{k-1}$ は一次独立なので

$$
a_i(\lambda_i-\lambda_k)=0.
$$

固有値は異なるので

$$
a_1=\cdots=a_{k-1}=0.
$$

元の式へ戻れば $a_k=0$ です。

<!-- proof-end -->
---

## 11. 対角化とは何か

自己写像 $T:V\to V$ が **対角化可能** であるとは、ある基底 $\mathcal B$ が存在して

$$
[T]_{\mathcal B\leftarrow\mathcal B}
=
\operatorname{diag}(\lambda_1,\dots,\lambda_n)
$$

となることです。

対角行列の第 $i$ 列は

$$
\lambda_i e_i
$$

なので、これは基底ベクトル $v_i$ が全て固有ベクトルであることと同値です。

したがって

> **対角化 = 固有ベクトルだけからなる基底を見つけること**

です。

行列 $A$ については

$$
\boxed{
A=PDP^{-1}
}
$$

と書けることに対応します。

$P$ の列は固有ベクトル、$D$ の対角成分は対応する固有値です。

---

## 12. 対角化可能性の基本判定

$n$ 次元空間の自己写像 $T$ について、次は同値です。

1. $T$ は対角化可能
2. $V$ は固有空間の直和で書ける
3. 固有ベクトルからなる基底が存在する
4. 全固有空間の次元の和が $n$ になる

つまり

$$
\boxed{
V
=
\bigoplus_{\lambda}E_\lambda
}
$$

となることが本質です。

固有値が $n$ 個すべて異なる場合は、前節より対応する固有ベクトルが自動的に一次独立なので、必ず対角化可能です。

ただし固有値に重複がある場合は、自動ではありません。

---

## 13. 代数的重複度と幾何学的重複度

行列 $A$ の特性多項式

$$
\chi_A(t)=\det(tI-A)
$$

で、固有値 $\lambda$ が根として何重に現れるかを **代数的重複度** といいます。

一方

$$
\dim E_\lambda
$$

を **幾何学的重複度** といいます。

一般に

$$
1
\le
\dim E_\lambda
\le
\text{代数的重複度}
$$

です。

対角化可能であるためには、各固有値について十分な本数の固有ベクトルが必要です。

たとえば

$$
A=
\begin{pmatrix}
1&1\\
0&1
\end{pmatrix}
$$

では固有値1の代数的重複度は2ですが

$$
\ker(A-I)
=
\operatorname{span}
\begin{pmatrix}1\\0\end{pmatrix}
$$

なので幾何学的重複度は1です。

したがって固有ベクトルを2本取れず、対角化できません。

---

## 14. 対角化すると何が嬉しいか

$$
A=PDP^{-1}
$$

なら

$$
A^k
=PD^kP^{-1}.
$$

対角行列なら

$$
D^k
=
\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k)
$$

なので、行列累乗がほぼスカラーの累乗へ落ちます。

同様に、適切に定義できる関数 $f$ について

$$
f(A)
=Pf(D)P^{-1}
$$

と考えられます。

微分方程式の

$$
e^{tA}
$$

や、確率過程・時系列での線形作用素を理解する基礎になります。

---

## 15. 表現行列の具体例

$V=P_2$ とし、基底を

$$
\mathcal B=(1,x,x^2)
$$

とします。

微分写像

$$
D:P_2\to P_2,
\qquad
D(f)=f'
$$

を考えます。

$$
D(1)=0,
\qquad
D(x)=1,
\qquad
D(x^2)=2x.
$$

したがって

$$
[D]_{\mathcal B\leftarrow\mathcal B}
=
\begin{pmatrix}
0&1&0\\
0&0&2\\
0&0&0
\end{pmatrix}.
$$

ここで重要なのは、$D$ は関数を関数へ送る抽象的な写像であり、この行列は **基底 $1,x,x^2$ を選んだ後の座標表示** だということです。

---

## 16. 演習

### F0-00F-A01 表現行列

- Level: A
- 目安時間: 12分

$T:\mathbb R^2\to\mathbb R^2$ を

$$
T(x,y)=(x+y,x-y)
$$

とする。

定義域・値域とも標準基底を使ったときの表現行列を求めよ。

<!-- solution-start -->
#### 詳細解答
標準基底を $e_1=(1,0)^T,e_2=(0,1)^T$ とする。

$$
T(e_1)=(1,1)^T,
\qquad
T(e_2)=(1,-1)^T.
$$

したがって列に並べて

$$
[T]
=
\begin{pmatrix}
1&1\\
1&-1
\end{pmatrix}.
$$

#### 本番答案
$T(e_1)=(1,1)^T,T(e_2)=(1,-1)^T$ より
$$
[T]=\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

#### 採点基準（20点）
- 基底ベクトルの像: 10点
- 列として配置: 6点
- 結論: 4点
<!-- solution-end -->

### F0-00F-B01 対角化判定

- Level: B
- 目安時間: 15分

$$
A=
\begin{pmatrix}
2&1\\
0&2
\end{pmatrix}
$$

について、固有値・固有空間を求め、対角化可能か判定せよ。

<!-- solution-start -->
#### 詳細解答
特性多項式は
$$
(2-\lambda)^2
$$
なので固有値は $\lambda=2$ のみで代数的重複度2。

$$
A-2I
=
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
$$

だから $y=0$、従って
$$
E_2=\operatorname{span}((1,0)^T).
$$

固有空間の次元は1なので固有ベクトルからなる2本の基底を作れない。よって対角化不可能。

#### 本番答案
固有値2は代数的重複度2だが
$$
\dim\ker(A-2I)=1.
$$
従って固有ベクトルが2本得られず、対角化不可能。

#### 採点基準（20点）
- 固有値: 5点
- 固有空間: 7点
- 幾何学的重複度: 4点
- 対角化判定: 4点
<!-- solution-end -->

---

## 17. 次に進む

一般の線形写像と対角化まで準備できました。

次は内積を入れ、正規直交基底・Gram--Schmidt・射影・QRを構成します。その後、実対称行列ではなぜ必ず正規直交固有基底が存在するのかをスペクトル定理として証明します。

**次：[F0-00E1 内積・Gram--Schmidt・直交射影・QR](../F0_00E1_内積_Gram_Schmidt_射影_QR/index.md)**
