# 共通解説：正規標本の直交射影・Cochranの定理

このページは、正規標本で繰り返し現れる

- 標本平均と標本分散の独立性
- $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$
- Studentのt分布の導出
- 母分散のカイ二乗信頼区間

の共通部分をまとめたものである。

関連問題：

- [カイ二乗ピボットによる分散・標準偏差信頼区間](../core/45_chisq_variance_confidence_interval.md)
- [Student化とt信頼区間](../core/48_student_t_confidence_interval.md)

---

## 1. 正規標本をベクトルとして標準化する

$$
X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)
$$

とする。

$$
X=(X_1,\ldots,X_n)^T,
\qquad
\mathbf1=(1,\ldots,1)^T
$$

とおき、

$$
Z=\frac{X-\mu\mathbf1}{\sigma}
$$

と標準化すると

$$
\boxed{Z\sim N_n(0,I_n)}.
$$

つまり $Z_1,\ldots,Z_n$ は独立な標準正規変数である。

---

## 2. 平均方向への射影 $P$

$$
P=\frac1n\mathbf1\mathbf1^T
$$

とする。

任意の $z=(z_1,\ldots,z_n)^T$ に対して

$$
Pz
=\frac1n\mathbf1\mathbf1^Tz
=\frac{z_1+\cdots+z_n}{n}\mathbf1
=\bar z\,\mathbf1.
$$

したがって $P$ は、すべての成分を平均値に置き換える行列である。

幾何学的には

$$
\operatorname{span}\{\mathbf1\}
$$

すなわち $(1,\ldots,1)^T$ 方向への直交射影である。

実際、

$$
P^T=P,
\qquad
P^2=P
$$

が成り立つ。

$P^T=P$ を**対称**、$P^2=P$ を**冪等**という。冪等性は、一度射影したものをもう一度射影しても変わらないことを表す。

---

## 3. 残差方向への射影 $Q=I-P$

$$
Q=I-P
$$

とする。

すると

$$
Qz
=(I-P)z
=
\begin{pmatrix}
z_1-\bar z\\
\vdots\\
z_n-\bar z
\end{pmatrix}.
$$

つまり $Q$ は平均からの残差を取り出す。

その成分和は

$$
\sum_{i=1}^n(z_i-\bar z)
=\sum_{i=1}^nz_i-n\bar z
=0.
$$

したがって $Q$ が射影する先は

$$
\boxed{
\mathcal R(Q)
=
\{x\in\mathbb R^n:x_1+\cdots+x_n=0\}
}.
$$

この空間には1本の線形制約があるので次元は $n-1$ である。よって

$$
\operatorname{rank}(Q)=n-1.
$$

一方、$P$ の像は平均方向1本だけなので

$$
\operatorname{rank}(P)=1.
$$

また

$$
PQ=P(I-P)=P-P^2=0.
$$

したがって、平均方向と残差方向は互いに直交している。

---

## 4. なぜ $PZ$ と $QZ$ は独立なのか

「直交しているから独立」と一般に言えるわけではない。ここでは**正規分布**であることが重要である。

$Z\sim N_n(0,I_n)$ なので

$$
\operatorname{Cov}(Z)=I_n.
$$

一般に行列 $A,B$ に対して

$$
\operatorname{Cov}(AZ,BZ)
=A\operatorname{Cov}(Z)B^T.
$$

したがって $Q^T=Q$ を使えば

$$
\operatorname{Cov}(PZ,QZ)
=P I_n Q^T
=PQ
=0.
$$

$PZ$ と $QZ$ は $Z$ の線形変換なので、両者をまとめたベクトルも多変量正規分布に従う。多変量正規分布では共分散0なら独立だから

$$
\boxed{PZ\perp QZ}.
$$

これが標本平均と標本分散の独立性につながる。

---

## 5. $Q$ の二次形式が標本分散になる

$Q$ は対称かつ冪等なので

$$
Z^TQZ
=Z^TQ^TQZ
=(QZ)^T(QZ).
$$

したがって

$$
Z^TQZ
=\sum_{i=1}^n(Z_i-\bar Z)^2.
$$

ここで

$$
Z_i-\bar Z
=\frac{X_i-\bar X}{\sigma}
$$

だから

$$
Z^TQZ
=\frac1{\sigma^2}\sum_{i=1}^n(X_i-\bar X)^2.
$$

標本分散を

$$
S^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X)^2
$$

と定義すれば

$$
\boxed{
Z^TQZ=\frac{(n-1)S^2}{\sigma^2}
}.
$$

---

## 6. スペクトル定理で何をしているのか

ここから

$$
Z^TQZ\sim\chi^2_{n-1}
$$

を導く。

### 6.1 固有ベクトルとは

行列 $Q$ に対して

$$
Qv=\lambda v,
\qquad v\neq0
$$

となる $v$ を固有ベクトル、$\lambda$ を固有値という。

固有ベクトルとは、$Q$ を作用させても向きが変わらず、長さだけ $\lambda$ 倍される方向である。

### 6.2 対称行列では異なる固有値の固有ベクトルが直交する

$Q^T=Q$ とする。

$$
Qv=\lambda v,
\qquad
Qw=\mu w,
\qquad
\lambda\neq\mu
$$

とする。

左から $w^T$ を掛けると

$$
w^TQv=\lambda w^Tv.
$$

一方、$Q^T=Q$ なので

$$
w^TQv=(Qw)^Tv=\mu w^Tv.
$$

したがって

$$
(\lambda-\mu)w^Tv=0.
$$

$\lambda\neq\mu$ より

$$
\boxed{w^Tv=0}.
$$

つまり異なる固有値に属する固有ベクトルは直交する。

同じ固有値に属する固有ベクトル同士は最初から直交しているとは限らないが、その固有空間の中で Gram--Schmidt の直交化を行えば、互いに直交する単位ベクトルを選べる。

したがって実対称行列では、固有ベクトルだけから

$$
u_1,\ldots,u_n
$$

という正規直交基底を作れる。すなわち

$$
u_i^Tu_j=
\begin{cases}
1 &(i=j),\\
0 &(i\neq j)
\end{cases}
$$

である。

これがここで使う**スペクトル定理**の内容である。

「基底を作れる」とは、任意の $x\in\mathbb R^n$ を

$$
x=a_1u_1+\cdots+a_nu_n
$$

と一意に表せるという意味であり、$u_1,\ldots,u_n$ を新しい座標軸として使える。

### 6.3 固有ベクトルを座標軸にすると $Q$ が対角化される

固有ベクトルを列に並べて

$$
U=(u_1,\ldots,u_n)
$$

とする。

正規直交性から

$$
U^TU=UU^T=I_n
$$

であり、$U$ は直交行列である。

また各列が固有ベクトルなので

$$
QU
=U\operatorname{diag}(\lambda_1,\ldots,\lambda_n).
$$

左から $U^T$ を掛ければ

$$
\boxed{
U^TQU
=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
}.
$$

つまり「固有ベクトルを座標軸に取り直す」と、対称行列は対角行列として見える。

---

## 7. 今回の射影行列 $Q$ の固有値は0か1だけ

$Q^2=Q$ なので、固有ベクトル $v$ に対して

$$
Qv=\lambda v
$$

とすると

$$
Q^2v=\lambda^2v.
$$

一方、$Q^2=Q$ より

$$
Q^2v=Qv=\lambda v.
$$

したがって

$$
\lambda^2=\lambda
$$

だから

$$
\boxed{\lambda=0\text{ または }1}.
$$

$Q$ は残差空間

$$
x_1+\cdots+x_n=0
$$

のベクトルをそのまま残すので、残差空間では

$$
Qx=x
$$

であり固有値は1である。この空間は $n-1$ 次元なので、固有値1が $n-1$ 個ある。

一方、平均方向では

$$
Q\mathbf1=(I-P)\mathbf1=0
$$

だから、平均方向の固有値は0である。

従って適当な直交行列 $U$ により

$$
\boxed{
U^TQU=\operatorname{diag}(1,\ldots,1,0)
}
$$

とできる。

### $n=3$ の具体例

$n=3$ なら残差空間は

$$
x_1+x_2+x_3=0
$$

という平面である。

例えば

$$
u_1=\frac1{\sqrt2}(1,-1,0)^T,
\qquad
u_2=\frac1{\sqrt6}(1,1,-2)^T
$$

はこの平面内の互いに直交する単位ベクトルである。

さらに

$$
u_3=\frac1{\sqrt3}(1,1,1)^T
$$

は平均方向の単位ベクトルである。

この $u_1,u_2,u_3$ を新しい座標軸にすると、$Q$ は $u_1,u_2$ 方向を残し、$u_3$ 方向を消すので

$$
U^TQU=\operatorname{diag}(1,1,0)
$$

となる。

---

## 8. なぜ標準多変量正規は座標を回しても変わらないのか

$Z\sim N_n(0,I_n)$ の確率密度関数は

$$
f(z)
=\frac1{(2\pi)^{n/2}}
\exp\left(-\frac12z^Tz\right).
$$

この密度は $z$ の向きではなく

$$
z^Tz=\|z\|^2
$$

という原点からの距離だけで決まる。したがって標準多変量正規分布は球対称である。

直交行列 $U$ は長さを保存するため

$$
\|U^Tz\|^2
=z^TUU^Tz
=z^Tz.
$$

よって座標軸を直交変換で回しても分布は変わらない。

平均と共分散からも確認できる。$Y=U^TZ$ とおけば

$$
E[Y]=U^TE[Z]=0,
$$

$$
\operatorname{Cov}(Y)
=U^TI_nU
=I_n.
$$

しかも正規ベクトルの線形変換は再び正規なので

$$
\boxed{Y=U^TZ\sim N_n(0,I_n)}.
$$

したがって

$$
Y_1,\ldots,Y_n\overset{\mathrm{iid}}\sim N(0,1).
$$

---

## 9. カイ二乗分布が出るところ

$Y=U^TZ$ とおくと

$$
Z=UY.
$$

よって

$$
Z^TQZ
=Y^T(U^TQU)Y.
$$

ここで

$$
U^TQU=\operatorname{diag}(1,\ldots,1,0)
$$

だから

$$
Z^TQZ
=Y_1^2+\cdots+Y_{n-1}^2.
$$

$Y_1,\ldots,Y_{n-1}$ は独立な標準正規変数なので、カイ二乗分布の定義から

$$
\boxed{
Z^TQZ\sim\chi^2_{n-1}
}.
$$

従って

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}
}.
$$

また $PZ\perp QZ$ であり、$PZ$ は標本平均、$QZ$ は残差に対応するので

$$
\boxed{\bar X\perp S^2}.
$$

さらに

$$
\boxed{
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right)
}.
$$

---

## 10. Cochranの定理との関係

ここまでの議論は、Cochranの定理を今回の正規標本に対して具体的に展開したものと考えてよい。

試験答案では通常、条件を確認した上でCochranの定理を使えば短く書ける。

一方、学習時には

$$
\boxed{
\text{平均方向 }PZ
\quad\perp\quad
\text{残差方向 }QZ
}
$$

という直交分解と、

$$
\boxed{
\operatorname{rank}(Q)=n-1
\Longrightarrow
Z^TQZ\sim\chi^2_{n-1}
}
$$

の中身を理解しておくことが重要である。

正規性がない一般の独立同分布標本では、$\bar X$ と $S^2$ の独立性や、$(n-1)S^2/\sigma^2$ の正確なカイ二乗分布は通常成立しない。
