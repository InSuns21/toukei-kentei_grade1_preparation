# Core 13 Student化とt信頼区間

- 旧No.: 48
- 演習価値: S
- 難度: A
- 目安時間: 20分
- 手計算監査: 表・○

## 問題

$X_1,\ldots,X_n\overset{\mathrm{iid}}\sim N(\mu,\sigma^2)$ とし、$\mu,\sigma^2$は未知とする。

1. $\bar X$と$S^2$の分布、および独立性を述べよ。
2. Student化した統計量

$$
T=\frac{\bar X-\mu}{S/\sqrt n}
$$

の分布を求めよ。
3. $\mu$の$100(1-\alpha)\%$信頼区間を導け。
4. $n=10,\bar x=12,s=3$、$t_{9,0.975}=2.262$のとき95%信頼区間を求めよ。

## 詳細解答

### 1. 正規標本の射影分解

$X=(X_1,\ldots,X_n)^T$ とし、各成分を標準化して

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I_n)
$$

とする。ここで $\mathbf1=(1,\ldots,1)^T$ である。

以下では

$$
P=\frac1n\mathbf1\mathbf1^T,
\qquad Q=I-P
$$

を使う。この2つの行列が何をしているかを先に確認する。

#### 1.1 $P$ は「全成分を平均に置き換える」射影

任意の $z=(z_1,\ldots,z_n)^T$ に対して

$$
Pz
=\frac1n\mathbf1\mathbf1^Tz
=\frac{z_1+\cdots+z_n}{n}\mathbf1
=\bar z\,\mathbf1.
$$

したがって $P$ は $z$ を

$$
\operatorname{span}\{\mathbf1\}
$$

すなわち $(1,\ldots,1)^T$ 方向へ射影する行列である。

また

$$
P^T=P,
\qquad
P^2=P
$$

が成り立つ。$P^T=P$ を対称、$P^2=P$ を冪等という。冪等性は「一度射影したものをもう一度射影しても変わらない」ことを表す。対称かつ冪等な行列は直交射影行列である。

#### 1.2 $Q=I-P$ は「平均からの残差」を取り出す

$$
Qz=(I-P)z
=
\begin{pmatrix}
z_1-\bar z\\
\vdots\\
z_n-\bar z
\end{pmatrix}.
$$

したがって $Q$ は各成分から平均を引いた残差ベクトルを作る。

このベクトルの成分和は

$$
\sum_{i=1}^n(z_i-\bar z)
=\sum_{i=1}^n z_i-n\bar z
=0.
$$

よって $Q$ が射影する先は

$$
\mathcal R(Q)
=
\left\{x\in\mathbb R^n:x_1+\cdots+x_n=0\right\}.
$$

この空間には1本の線形制約があるので次元は $n-1$ であり、

$$
\operatorname{rank}(Q)=n-1.
$$

一方、$P$ の像は1次元なので

$$
\operatorname{rank}(P)=1.
$$

さらに

$$
PQ=P(I-P)=P-P^2=0.
$$

したがって $P$ が残す平均方向と $Q$ が残す残差方向は互いに直交している。

#### 1.3 なぜ $PZ$ と $QZ$ は独立なのか

「直交しているから独立」と一般に言えるわけではない。ここでは正規分布であることが重要である。

まず $Z\sim N_n(0,I_n)$ なので

$$
\operatorname{Cov}(Z)=I_n.
$$

一般に行列 $A,B$ に対して

$$
\operatorname{Cov}(AZ,BZ)
=A\operatorname{Cov}(Z)B^T
$$

だから、$Q^T=Q$ を用いると

$$
\operatorname{Cov}(PZ,QZ)
=P I_n Q^T
=PQ
=0.
$$

$PZ,QZ$ は $Z$ の線形変換なので同時に多変量正規分布に従う。多変量正規分布では共分散0なら独立であるため

$$
\boxed{PZ\perp QZ}.
$$

これが最終的に標本平均と標本分散の独立性を与える。

#### 1.4 $Q$ の二次形式が標本分散になる

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
=\frac1{\sigma^2}\sum_{i=1}^n(X_i-\bar X)^2
=\frac{(n-1)S^2}{\sigma^2}.
$$

#### 1.5 なぜ $Z^TQZ\sim\chi^2_{n-1}$ なのか

ここで「直交座標を取り直す」という操作を使う。この座標は突然導入するのではなく、$Q$ の射影方向に合わせて作る。

$Q$ は対称行列なので、スペクトル定理により互いに直交する単位固有ベクトルだけで基底を作れる。また $Q^2=Q$ だから、固有値 $\lambda$ は

$$
\lambda^2=\lambda
$$

を満たし、$\lambda=0$ または $1$ である。

$Q$ は残差空間

$$
x_1+\cdots+x_n=0
$$

をそのまま残すので、この $n-1$ 次元空間では固有値1を持つ。一方、平均方向 $\mathbf1$ は

$$
Q\mathbf1=(I-P)\mathbf1=0
$$

となるので固有値0である。

したがって、$Q$ の固有ベクトルを並べた直交行列 $U$ を適当に取れば

$$
U^TQU
=\operatorname{diag}(1,\ldots,1,0)
$$

とできる。これが「$Q$ に合わせて直交座標を取り直す」の意味である。

##### $n=3$ の具体例

$n=3$ なら残差空間は

$$
x_1+x_2+x_3=0
$$

という平面である。例えば

$$
u_1=\frac1{\sqrt2}(1,-1,0)^T,
\qquad
u_2=\frac1{\sqrt6}(1,1,-2)^T
$$

はこの平面内の互いに直交する単位ベクトルであり、

$$
u_3=\frac1{\sqrt3}(1,1,1)^T
$$

は平均方向の単位ベクトルである。

$u_1,u_2,u_3$ を新しい座標軸に選ぶと、$Q$ は最初の2方向を残し、最後の平均方向を消すので、新しい座標では

$$
Q=\operatorname{diag}(1,1,0)
$$

と見える。

#### 1.6 なぜ標準多変量正規は座標を回しても変わらないのか

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

という原点からの距離だけで決まる。このため標準多変量正規分布は球対称である。

直交行列 $U$ は長さを保存するので

$$
\|U^Tz\|^2
=z^TUU^Tz
=z^Tz.
$$

したがって座標軸を直交変換で回しても分布は変わらない。

同じことは平均と共分散からも確認できる。$Y=U^TZ$ と置くと

$$
E[Y]=U^TE[Z]=0,
$$

$$
\operatorname{Cov}(Y)
=U^T I_n U
=I_n.
$$

しかも正規ベクトルの線形変換は再び正規なので

$$
\boxed{Y=U^TZ\sim N_n(0,I_n)}.
$$

従って新しい座標成分も

$$
Y_1,\ldots,Y_n\overset{\mathrm{iid}}\sim N(0,1)
$$

である。

以上から

$$
Z^TQZ
=Y^T(U^TQU)Y
=Y_1^2+\cdots+Y_{n-1}^2.
$$

カイ二乗分布の定義より

$$
\boxed{Z^TQZ\sim\chi^2_{n-1}}.
$$

したがって

$$
\boxed{
\frac{(n-1)S^2}{\sigma^2}
\sim\chi^2_{n-1}
}.
$$

また、$PZ$ は標本平均だけで決まり、$QZ$ は残差だけで決まる。すでに $PZ\perp QZ$ を示したので

$$
\boxed{\bar X\perp S^2}.
$$

さらに独立な正規標本の平均より

$$
\boxed{
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right)
}.
$$

以上が **Cochran の定理**で一括して得られる内容の内訳である。Cochran の定理を使えば短く書けるが、初見では上の「平均方向と残差方向への直交分解」を理解しておくとよい。

正規性がない一般標本では、$\bar X$ と $S^2$ の独立性や正確なカイ二乗分布は通常成立しない。

### 2. Studentのt分布

問1より

$$
Z_0=\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
$$

$$
V=\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}
$$

であり、$Z_0\perp V$ である。

**Studentのt分布の定義**は、$Z_0\sim N(0,1)$、$V\sim\chi^2_\nu$ が独立なら

$$
\frac{Z_0}{\sqrt{V/\nu}}\sim t_\nu
$$

というものである。

本問では $\nu=n-1$ であり、

$$
\frac{V}{n-1}
=\frac{S^2}{\sigma^2},
\qquad
\sqrt{\frac{V}{n-1}}=\frac{S}{\sigma}.
$$

したがって

$$
\frac{Z_0}{\sqrt{V/(n-1)}}
=
\frac{
(\bar X-\mu)/(\sigma/\sqrt n)
}{S/\sigma}
=
\frac{\bar X-\mu}{S/\sqrt n}.
$$

よって、ここはt分布の定義をそのまま適用して

$$
\boxed{
T=\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}
}.
$$

### 3. 信頼区間

$$
P\left(
-t_{n-1,1-\alpha/2}
\le T\le
t_{n-1,1-\alpha/2}
\right)=1-\alpha.
$$

これを $\mu$ について解いて

$$
\boxed{
\bar X\pm t_{n-1,1-\alpha/2}\frac{S}{\sqrt n}
}.
$$

### 4. 数値例

$$
12\pm2.262\frac3{\sqrt{10}}
$$

で、幅は約 $2.146$。したがって

$$
\boxed{(9.854,14.146)}.
$$

## 本番答案

正規標本なので $Z=(X-\mu\mathbf1)/\sigma\sim N_n(0,I)$。平均方向への射影 $P$ と残差方向への射影 $Q=I-P$ は直交し、ランクは $1,n-1$。したがって **Cochranの定理**から

$$
\bar X\perp S^2,
\quad
\frac{\bar X-\mu}{\sigma/\sqrt n}\sim N(0,1),
\quad
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$

独立な標準正規とカイ二乗の比という **t分布の定義**から

$$
\frac{\bar X-\mu}{S/\sqrt n}\sim t_{n-1}.
$$

よって95%信頼区間は $\bar X\pm t_{n-1,0.975}S/\sqrt n$、数値例は約 $(9.854,14.146)$。

## 採点基準

- $\bar X,S^2$の分布・独立性（Cochran条件確認）: 6点
- t分布の導出: 5点
- 一般の信頼区間: 5点
- 数値例: 4点
