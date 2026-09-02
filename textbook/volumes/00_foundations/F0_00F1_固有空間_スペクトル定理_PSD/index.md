# F0-00F1 固有空間・実対称行列・スペクトル定理・PSD

F0-00Fで線形写像のkernelとimageを準備しました。この講義では自己写像の固有方向から、実対称行列の正規直交固有基底とPSDまでを組み立てます。

$$\boxed{\text{固有空間}\to\text{対称性}\to\text{Rayleigh商}\to\text{スペクトル定理}\to\text{PSD}}$$

---

## 1. 固有値と固有空間

$T:V\to V$ に対して、$v\ne0$ が

$$
T(v)=\lambda v
$$

を満たすとき、$\lambda$ を固有値、$v$ を固有ベクトルといいます。

固有値 $\lambda$ に対応する

$$
\boxed{
E_\lambda
=\ker(T-\lambda I)
}
$$

を **固有空間** といいます。

重要なのは、固有空間は1本のベクトルではなく部分空間だということです。

行列 $A$ なら

$$
(A-\lambda I)v=0
$$

が非零解を持つ必要があるので

$$
\boxed{
\det(A-\lambda I)=0
}
$$

が固有値方程式になります。

---

## 2. 不変部分空間

部分空間 $M\subset V$ が

$$
T(M)\subset M
$$

を満たすとき、$M$ を **不変部分空間** といいます。

固有空間 $E_\lambda$ は不変部分空間です。

不変部分空間があると、写像を小さな空間に制限して考えられます。

スペクトル定理の証明では、1本の固有ベクトルを見つけた後、その直交補空間が再び不変になることを使って次の固有ベクトルを探します。

---

## 3. 対称行列は内積と相性がよい

実対称行列

$$
A^{\mathsf T}=A
$$

では

$$
\boxed{
\langle Ax,y\rangle
=
\langle x,Ay\rangle
}
$$

が成り立ちます。

実際

$$
\langle Ax,y\rangle
=(Ax)^{\mathsf T}y
=x^{\mathsf T}A^{\mathsf T}y
=x^{\mathsf T}Ay.
$$

この性質が、関数解析における **自己共役作用素** の有限次元版です。

---

## 4. 異なる固有値の固有ベクトルは直交する

$A$ を実対称とし、

$$
Au=\lambda u,
\qquad
Av=\mu v,
\qquad
\lambda\ne\mu
$$

とします。

対称性から

$$
\langle Au,v\rangle
=
\langle u,Av\rangle.
$$

したがって

$$
\lambda\langle u,v\rangle
=
\mu\langle u,v\rangle.
$$

よって

$$
(\lambda-\mu)\langle u,v\rangle=0.
$$

$\lambda\ne\mu$ なので

$$
\boxed{
\langle u,v\rangle=0
}.
$$

つまり異なる固有空間は互いに直交します。

同じ固有値の固有空間の中では、F0-00E1のGram--Schmidtを使えば正規直交基底を作れます。

---

## 5. Rayleigh商

対称行列 $A$ と非零ベクトル $x$ に対して

$$
\boxed{
R_A(x)
=
\frac{x^{\mathsf T}Ax}{x^{\mathsf T}x}
}
$$

を **Rayleigh商** といいます。

$x$ が固有ベクトルで

$$
Ax=\lambda x
$$

なら

$$
R_A(x)=\lambda.
$$

Rayleigh商は、「方向 $x$ に沿って二次形式がどれだけ伸びるか」を表します。

単位ベクトル $\|x\|=1$ なら

$$
R_A(x)=x^{\mathsf T}Ax.
$$

---

## 6. 対称行列には少なくとも1本の実固有ベクトルがある

単位球面

$$
S^{n-1}
=
\{x\in\mathbb R^n:\|x\|=1\}
$$

を考えます。

これは閉かつ有界なので、F0-00C1のHeine--Borelによりコンパクトです。

連続関数

$$
f(x)=x^{\mathsf T}Ax
$$

は、コンパクト集合上で最大値を取ります。

最大点を $q_1$ とし

$$
\|q_1\|=1
$$

とします。

制約

$$
g(x)=x^{\mathsf T}x-1=0
$$

の下で $f$ を最大化しているので、ラグランジュ未定乗数法から

$$
\nabla f(q_1)
=\lambda\nabla g(q_1).
$$

$A$ は対称なので

$$
\nabla f(x)=2Ax,
\qquad
\nabla g(x)=2x.
$$

したがって

$$
2Aq_1=2\lambda q_1
$$

より

$$
\boxed{
Aq_1=\lambda q_1
}.
$$

つまり最大点は固有ベクトルです。

さらに

$$
\lambda=q_1^{\mathsf T}Aq_1
$$

なので、この固有値はRayleigh商の最大値です。

---

## 7. 固有ベクトルの直交補空間は不変になる

$Aq_1=\lambda_1q_1$ とし、

$$
M=q_1^\perp
$$

とします。

$x\in M$ なら

$$
\langle x,q_1\rangle=0.
$$

対称性より

$$
\langle Ax,q_1\rangle
=
\langle x,Aq_1\rangle
=
\lambda_1\langle x,q_1\rangle
=0.
$$

したがって

$$
Ax\in q_1^\perp=M.
$$

よって $M$ は $A$ の不変部分空間です。

ここがスペクトル定理の帰納法の鍵です。

---

## 8. 実対称行列のスペクトル定理

まず単位固有ベクトル $q_1$ を1本取ります。

その直交補空間

$$
q_1^\perp
$$

は $A$ に対して不変です。

この空間の次元は $n-1$ なので、同じ議論を制限写像へ繰り返します。

すると互いに直交する単位固有ベクトル

$$
q_1,\dots,q_n
$$

を得ます。

これらは $\mathbb R^n$ の正規直交基底です。

列に並べて

$$
Q
=
\begin{pmatrix}
q_1&\cdots&q_n
\end{pmatrix}
$$

とすると

$$
Q^{\mathsf T}Q=QQ^{\mathsf T}=I.
$$

また

$$
Aq_i=\lambda_iq_i
$$

なので

$$
AQ=Q\Lambda,
$$

$$
\Lambda
=\operatorname{diag}(\lambda_1,\dots,\lambda_n).
$$

右から $Q^{\mathsf T}$ を掛けて

$$
\boxed{
A=Q\Lambda Q^{\mathsf T}
}.
$$

これが **実対称行列のスペクトル定理** です。

つまり

> 実対称行列には正規直交固有基底が存在する。

F0-00で使った「直交対角化できる」は、この定理の結論です。

---

## 9. 二次形式が固有値だけで読める理由

$$
A=Q\Lambda Q^{\mathsf T}
$$

とし、

$$
z=Q^{\mathsf T}x
$$

と置きます。

$Q$ は直交行列なので

$$
\|z\|=\|x\|.
$$

二次形式は

$$
\begin{aligned}
x^{\mathsf T}Ax
&=x^{\mathsf T}Q\Lambda Q^{\mathsf T}x\\
&=z^{\mathsf T}\Lambda z\\
&=\boxed{\sum_{i=1}^n\lambda_i z_i^2}.
\end{aligned}
$$

したがって

$$
\lambda_{\min}\|x\|^2
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}\|x\|^2.
$$

特に $\|x\|=1$ なら

$$
\boxed{
\lambda_{\min}
\le
x^{\mathsf T}Ax
\le
\lambda_{\max}
}.
$$

---

## 10. 正定値・半正定値

対称行列 $A$ が **正定値** であるとは

$$
x^{\mathsf T}Ax>0
\qquad(x\ne0)
$$

です。

スペクトル分解から

$$
x^{\mathsf T}Ax
=\sum_i\lambda_i z_i^2
$$

なので

$$
\boxed{
A\succ0
\Longleftrightarrow
\lambda_i>0\quad\forall i
}.
$$

同様に

$$
\boxed{
A\succeq0
\Longleftrightarrow
\lambda_i\ge0\quad\forall i
}.
$$

です。

共分散行列、Gram行列、Hessianなどで半正定値性が頻出する理由がここで統一されます。

---

## 11. PSD行列の平方根を構成する

$A\succeq0$ なら

$$
A=Q\Lambda Q^{\mathsf T},
\qquad
\lambda_i\ge0.
$$

そこで

$$
\Lambda^{1/2}
=\operatorname{diag}(\sqrt{\lambda_1},\dots,\sqrt{\lambda_n})
$$

とし

$$
\boxed{
A^{1/2}
=Q\Lambda^{1/2}Q^{\mathsf T}
}
$$

と定めます。

すると

$$
A^{1/2}A^{1/2}=A.
$$

多変量正規乱数の構成や共分散作用素の理解では、この平方根が重要です。

---

---

## 12. 演習

### F0-00F1-A01 対称行列の固有ベクトル直交性

- Level: A
- 目安時間: 10分

実対称行列 $A$ の固有ベクトル $u,v$ が異なる固有値 $\lambda,\mu$ に属するとき $u\perp v$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\langle Au,v\rangle=\langle u,Av\rangle$ より $\lambda\langle u,v\rangle=\mu\langle u,v\rangle$。$\lambda\ne\mu$ なので内積は0。
#### 本番答案
$(\lambda-\mu)\langle u,v\rangle=0$ から従う。
#### 採点基準（20点）
- 対称性: 7点
- 固有方程式代入: 7点
- 結論: 6点
<!-- solution-end -->

### F0-00F1-B01 PSDと固有値

- Level: B
- 目安時間: 12分

実対称行列 $A=Q\Lambda Q^T$ に対し、$A\succeq0$ と全固有値 $\lambda_i\ge0$ が同値であることを示せ。

<!-- solution-start -->
#### 詳細解答
$z=Q^Tx$ とすると $x^TAx=\sum_i\lambda_i z_i^2$。全固有値非負なら右辺非負。逆にある $\lambda_j<0$ なら対応固有ベクトル $q_j$ に対し $q_j^TAq_j=\lambda_j<0$ でPSDに反する。
#### 本番答案
スペクトル座標で二次形式を $\sum_i\lambda_i z_i^2$ と書き、両方向を示す。
#### 採点基準（20点）
- 座標変換: 6点
- 十分性: 5点
- 必要性の反証: 7点
- 結論: 2点
<!-- solution-end -->

---

## 13. 次に進む

一般の長方形行列へ進むには、$A^TA$ のスペクトル分解を使います。

**次：[F0-00F2 SVD・特異値・作用素ノルム](../F0_00F2_SVD_特異値_作用素ノルム/index.md)**
