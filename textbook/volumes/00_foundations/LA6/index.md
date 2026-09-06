# LA6 標準線形代数 VI：スペクトル・二次形式・polar decomposition・SVD

ここまでで、一般作用素のJordan構造と、normal operatorのunitary対角化を扱いました。この章では既存の [実対称スペクトル定理・PSD](../F0_00F1_固有空間_スペクトル定理_PSD/index.md) と [SVD](../F0_00F2_SVD_特異値_作用素ノルム/index.md) を再利用し、二次形式・polar decomposition・複素SVDを一つの線にまとめます。

---

## 1. Hermitian二次形式

<a id="def-la6-hermitian-quadratic-form"></a>
<!-- formal-statement-start -->
> **定義（Hermitian二次形式）**  
> 有限次元複素内積空間 $V$ とHermitian作用素 $A$ に対し
$$
q_A(x)=\langle x,Ax\rangle
$$
> を $A$ が定めるHermitian二次形式という。
<!-- formal-statement-end -->

Hermitian性から
$$
\overline{q_A(x)}
=\overline{\langle x,Ax\rangle}
=\langle Ax,x\rangle
=\langle x,Ax\rangle,
$$
したがって $q_A(x)$ は実数です。

<!-- definition-example-start: def-la6-hermitian-quadratic-form -->
**定義の確認**：
$$
A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}
$$
なら
$$
q_A(x_1,x_2)=2|x_1|^2-|x_2|^2.
$$
正の方向と負の方向が混在するので不定値です。
<!-- definition-example-end -->

LA5のスペクトル定理によりHermitian作用素はunitary対角化できるので、ある正規直交基底で
$$
q_A(x)=\sum_{j=1}^n\lambda_j|x_j|^2
$$
となります。二次形式の幾何は固有値の符号へ還元されます。

---

## 2. similarity と congruence は別物

線形作用素 $T$ の基底変換では
$$
A\mapsto S^{-1}AS
$$
というsimilarityが現れます。これは「同じ作用素を別の基底で見る」変換です。

一方、二次形式では変数を $x=Sy$ と置くので
$$
q_A(Sy)
=y^*S^*ASy.
$$

<a id="def-la6-congruence"></a>
<!-- formal-statement-start -->
> **定義（congruence）**  
> Hermitian行列 $A,B$ が、ある可逆行列 $S$ によって
$$
B=S^*AS
$$
> と表されるとき、$A$ と $B$ はcongruentであるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-la6-congruence -->
**定義の確認**：similarity $S^{-1}AS$ は固有値を保存しますが、congruence $S^*AS$ は固有値そのものを保存する必要はありません。二次形式で重要なのは正・負・零の方向の個数です。
<!-- definition-example-end -->

---

## 3. Sylvesterの慣性法則

Hermitian行列 $A$ はunitary対角化により
$$
A=Q\operatorname{diag}(\lambda_1,\dots,\lambda_n)Q^*
$$
と書けます。非零固有値の絶対値をスカラー変換で1へ正規化すると、congruenceにより
$$
\operatorname{diag}(I_p,-I_q,0_r)
$$
へ変形できます。

<a id="thm-la6-inertia"></a>
<!-- formal-statement-start -->
> **定理（Sylvesterの慣性法則）**  
> Hermitian二次形式をcongruenceで
$$
\operatorname{diag}(I_p,-I_q,0_r)
$$
> の形へ変形したとき、三つ組 $(p,q,r)$ は変換の選び方によらず一意である。この $(p,q,r)$ を形式の慣性という。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$r$ は行列のrankの補数、すなわち核の次元なのでcongruenceで不変です。

次に $p$ の一意性を示します。標準形で
$$
P=\operatorname{span}(e_1,\dots,e_p)
$$
上では $q(x)>0$ for $x\ne0$ です。したがって「二次形式が正定値になる部分空間の最大次元」は少なくとも $p$。

一方、任意の $(p+1)$ 次元部分空間 $L$ は、負・零方向からなる
$$
N_0=\operatorname{span}(e_{p+1},\dots,e_n)
$$
と次元の和が $n$ を超えるため非零の交わりを持ちます。その非零ベクトルでは $q\le0$。よって正定値部分空間の次元は $p$ を超えられません。従って $p$ は形式そのものから決まります。

同様に $-q$ を考えれば負定値部分空間の最大次元が $q$ と分かります。よって $(p,q,r)$ は一意です。$\square$
<!-- proof-end -->

この定理により、「座標をどう選んでも正方向・負方向・零方向の本数は変わらない」と分かります。

---

## 4. Hermitian PSD作用素の平方根

Hermitian positive semidefinite（PSD）作用素 $A$ は固有値が全て非負です。

<a id="thm-la6-psd-square-root"></a>
<!-- formal-statement-start -->
> **定理（Hermitian PSD平方根定理）**  
> 有限次元複素内積空間上のHermitian PSD作用素 $A$ に対し、Hermitian PSD作用素 $B$ で
$$
B^2=A
$$
> を満たすものが一意に存在する。これを
$$
A^{1/2}
$$
> と書く。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

スペクトル定理により
$$
A=Q\operatorname{diag}(\lambda_1,\dots,\lambda_n)Q^*,
\qquad \lambda_i\ge0.
$$
そこで
$$
B=Q\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})Q^*
$$
と置けばHermitian PSDで $B^2=A$。

一意性は、PSDな $C$ が $C^2=A$ を満たすなら $C$ は $A$ と可換し、各 $A$ の固有空間を保つことを使います。各固有空間上で $C^2=\lambda I$ かつ $C$ はPSDなので固有値は $\sqrt\lambda$ しか取れず、$C=\sqrt\lambda I$。従って全空間で $C=B$。$\square$
<!-- proof-end -->

一般の複素行列 $A$ に対して
$$
A^*A
$$
はHermitian PSDです。そこで
$$
|A|=(A^*A)^{1/2}
$$
を行列の「絶対値」とみなせます。

---

## 5. polar decomposition

実数 $z$ を
$$
z=(\text{符号})\times |z|
$$
と分け、複素数 $z$ を
$$
z=e^{i\theta}|z|
$$
と分けるのと同様に、行列も「回転部分」と「伸縮部分」へ分けられます。

<a id="thm-la6-polar"></a>
<!-- formal-statement-start -->
> **定理（polar decomposition）**  
> 任意の複素正方行列 $A\in\mathbb C^{n\times n}$ に対し、unitary行列 $U$ とHermitian PSD行列
$$
P=(A^*A)^{1/2}
$$
> が存在して
$$
A=UP
$$
> と書ける。$A$ が可逆なら $U$ は一意で
$$
U=AP^{-1}.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず $P=(A^*A)^{1/2}$ とします。すると
$$
\|Px\|^2
=\langle x,P^2x\rangle
=\langle x,A^*Ax\rangle
=\|Ax\|^2.
$$
従って $P$ の像上で
$$
U(Px)=Ax
$$
と定めると、$Px=Py$ なら $P(x-y)=0$ で上式から $A(x-y)=0$ なのでwell-definedです。またノルムを保存します。

有限次元ではこの等長写像を $\operatorname{Im}P$ の直交補から $\operatorname{Im}A$ の直交補へ任意のunitary同型で延長でき、全空間のunitary行列 $U$ を得ます。定義から $A=UP$。

$A$ が可逆なら $P$ も可逆で、$U=AP^{-1}$ と強制されるため一意です。$\square$
<!-- proof-end -->

幾何的には

1. $P$ が主軸方向へ伸縮する。
2. $U$ が長さを変えず回転・位相変換する。

という順序です。

---

## 6. 複素SVD

実行列版の特異値分解は [F0-00F2](../F0_00F2_SVD_特異値_作用素ノルム/index.md#thm-f0-00f2-svd) で証明済みです。複素数上では転置を共役転置へ変えます。

<a id="thm-la6-complex-svd"></a>
<!-- formal-statement-start -->
> **定理（複素特異値分解）**  
> 任意の複素行列 $A\in\mathbb C^{m\times n}$ に対し、unitary行列 $U\in\mathbb C^{m\times m}$、$V\in\mathbb C^{n\times n}$ と、非負実数を対角に持つ $m\times n$ 行列 $\Sigma$ が存在して
$$
A=U\Sigma V^*
$$
> と書ける。$\Sigma$ の正の対角成分は $A^*A$ の正の固有値の平方根である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$A^*A$ はHermitian PSDなので、複素normal operatorのスペクトル定理により正規直交固有基底 $v_1,\dots,v_n$ を取れます。
$$
A^*Av_i=\lambda_i v_i,
\qquad \lambda_i\ge0.
$$
正の固有値について
$$
\sigma_i=\sqrt{\lambda_i},
\qquad
u_i=\frac{Av_i}{\sigma_i}
$$
と置きます。実版と同じ計算で $u_i$ は正規直交です。これを $\mathbb C^m$ の正規直交基底へ延長し、$v_i$ も全基底として並べれば
$$
Av_i=\sigma_i u_i
$$
が行列式
$$
A=U\Sigma V^*
$$
にまとめられます。$\square$
<!-- proof-end -->

SVDはnormalでない行列、長方形行列にも使えます。固有値分解より適用範囲が広い理由は、$A$ 自身ではなく必ずHermitian PSDになる $A^*A$ を対角化するからです。

---

## 7. スペクトル定理・Jordan・SVDの使い分け

| 対象 | 分解 | 基底 | 何が見えるか |
|---|---|---|---|
| 一般の複素自己写像 | Jordan標準形 | 一般基底 | 一般化固有構造・冪零部分 |
| complex normal | unitary対角化 | 正規直交基底 | 固有方向が直交して完全分解 |
| Hermitian | unitary対角化 | 正規直交基底 | 実固有値・二次形式の符号 |
| 任意の長方形行列 | SVD | 入出力で別の正規直交基底 | 方向別の非負伸縮 |
| 任意の正方行列 | polar decomposition | 基底不要な作用素分解 | unitary部分 × PSD伸縮 |

「どの分解を使うか」は、対象がどこまで特殊かで決まります。

---

## 8. 演習

### Level A

<a id="ex-la6-a01"></a>
#### LA6-A01 Hermitian二次形式
- Level: A

$$
A=\operatorname{diag}(3,-2,0)
$$
の慣性を求めよ。

<!-- solution-start -->
**解答**：正固有値1個、負固有値1個、零固有値1個なので $(p,q,r)=(1,1,1)$。
<!-- solution-end -->

<a id="ex-la6-a02"></a>
#### LA6-A02 PSD平方根
- Level: A

$$
A=\operatorname{diag}(4,9,0)
$$
のPSD平方根を求めよ。

<!-- solution-start -->
**解答**：
$$
A^{1/2}=\operatorname{diag}(2,3,0).
$$
<!-- solution-end -->

<a id="ex-la6-a03"></a>
#### LA6-A03 polar decomposition
- Level: A

$$
A=\operatorname{diag}(2,-3i)
$$
について $P=|A|$ と $U$ を求めよ。

<!-- solution-start -->
**解答**：
$$
A^*A=\operatorname{diag}(4,9),
\qquad
P=\operatorname{diag}(2,3).
$$
従って
$$
U=AP^{-1}=\operatorname{diag}(1,-i).
$$
<!-- solution-end -->

<a id="ex-la6-a04"></a>
#### LA6-A04 特異値
- Level: A

$$
A=\operatorname{diag}(1,i,2)
$$
の特異値を求めよ。

<!-- solution-start -->
**解答**：$A^*A=\operatorname{diag}(1,1,4)$ なので特異値は $2,1,1$。
<!-- solution-end -->

### Level B

<a id="ex-la6-b01"></a>
#### LA6-B01 similarityとcongruence
- Level: B

$A=I_2$, $S=\operatorname{diag}(2,1)$ とする。$S^{-1}AS$ と $S^*AS$ を計算し、両変換の違いを確認せよ。

<!-- solution-start -->
**解答**：similarityでは
$$
S^{-1}IS=I.
$$
一方congruenceでは
$$
S^*IS=\operatorname{diag}(4,1).
$$
固有値は変わるが正方向の個数2は変わらない。
<!-- solution-end -->

<a id="ex-la6-b02"></a>
#### LA6-B02 polar分解とSVD
- Level: B

SVD $A=U\Sigma V^*$ が与えられているとき
$$
P=V\Sigma V^*,
\qquad
W=UV^*
$$
と置くと $A=WP$ がpolar decompositionになることを、正方可逆の場合に示せ。

<!-- solution-start -->
**解答**：$W=UV^*$ はunitary。また
$$
P^2=V\Sigma^2V^*=A^*A
$$
で $P$ はPSDなので $P=(A^*A)^{1/2}$。さらに
$$
WP=UV^*V\Sigma V^*=U\Sigma V^*=A.
$$
<!-- solution-end -->

<a id="ex-la6-b03"></a>
#### LA6-B03 慣性と正定値性
- Level: B

Hermitian行列 $A$ が正定値であることと、慣性が $(n,0,0)$ であることが同値であることを示せ。

<!-- solution-start -->
**解答**：unitary対角化すると $q_A(x)=\sum_i\lambda_i|x_i|^2$。全非零 $x$ で正となるための必要十分条件は全 $\lambda_i>0$。これは正方向が $n$、負・零方向が0ということ。
<!-- solution-end -->

### Level C

<a id="ex-la6-c01"></a>
#### LA6-C01 SVDから最良rank-k近似を読む
- Level: C

$A=U\Sigma V^*$ の特異値を $\sigma_1\ge\cdots\ge\sigma_r>0$ とする。rank $\le k$ の行列 $B$ に対し
$$
\|A-B\|_2\ge\sigma_{k+1}
$$
を示し、上位 $k$ 個の特異値だけ残した打切りSVDで等号が達成されることを説明せよ。

<!-- solution-start -->
**解答**：unitary不変性から $\|A-B\|_2=\|\Sigma-U^*BV\|_2$。$C=U^*BV$ はrank $\le k$。右特異ベクトル側の $(k+1)$ 次元部分空間 $E=\operatorname{span}(e_1,\dots,e_{k+1})$ を考えると、$C|_E$ は次元 $k+1$ からrank高々 $k$ への写像なので非零な $x\in E\cap\ker C$ を単位長で取れる。すると
$$
\|(\Sigma-C)x\|=\|\Sigma x\|\ge\sigma_{k+1}.
$$
従って下界が得られる。上位 $k$ 個だけ残した $\Sigma_k$ では $\|\Sigma-\Sigma_k\|_2=\sigma_{k+1}$ なので達成される。これは作用素ノルム版Eckart–Youngの内容である。
<!-- solution-end -->

---

## 9. Batch 3 の到達点

これで標準線形代数は

```text
実・複素線形空間
  ↓
直和・商空間
  ↓
代数的双対・抽象行列式
  ↓
最小多項式・Cayley–Hamilton・Jordan
  ↓
複素内積・有限次元随伴・normal
  ↓
二次形式・polar decomposition・複素SVD
```

まで一巡しました。

既存の計算中心の線形代数を捨てるのではなく、その上に数学科標準の構造論を接続した形です。次の標準数学コアは **Batch 4：位相コア** です。
