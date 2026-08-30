# Advanced 08 逐次残差化・独立化（Cholesky分解への接続）

- 旧No.: 37
- 層: Advanced
- 演習価値: B
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：多変量正規分布の線形変換、分散・共分散の計算、同時正規で無相関なら独立
- **この問題で行うこと**：相関した正規変数から順に線形予測部分を引き、独立な標準正規変数へ変換する
- **この問題で初めて名前を付ける概念**：正定値行列を $\Sigma=LL^T$（$L$ は対角成分が正の下三角行列）と表す **Cholesky分解**
- **1級での扱い**：一般のCholeskyアルゴリズムや公式の暗記は要求しない。本問の3変量の変換を共分散計算から導き、最後にCholesky分解との対応と、独立標準正規乱数から指定した分散共分散行列をもつ正規乱数を構成する方法を理解すればよい

つまり、本問は「Cholesky分解を知っているから解く」のではなく、**逐次残差化を最後まで行った結果としてCholesky分解が現れ、その逆向きの変換が多変量正規乱数の生成法になる**構成である。

## 問題

$(X_1,X_2,X_3)$ は平均0の3変量正規分布に従い、分散共分散行列を

$$
\Sigma=
\begin{pmatrix}
1&a&ab\\
a&1&b\\
ab&b&1
\end{pmatrix},
\qquad |a|<1,\ |b|<1
$$

とする。次を定める。

$$
Z_1=X_1,
\qquad
Z_2=\frac{X_2-aX_1}{\sqrt{1-a^2}},
\qquad
Z_3=\frac{X_3-bX_2}{\sqrt{1-b^2}}.
$$

1. 各 $Z_i$ の平均・分散を求めよ。
2. $Z_1,Z_2,Z_3$ の相互共分散が0であることを示せ。
3. $(Z_1,Z_2,Z_3)$ の同時分布を求め、3変数が独立であることを示せ。
4. 逆変換を $X=LZ$ の形で書き、$LL^T=\Sigma$ を確認せよ。正定値行列を $\Sigma=LL^T$（$L$ は対角成分が正の下三角行列）と表すことをCholesky分解という。この観点から今回の変換を説明せよ。
5. **Cholesky分解による多変量正規乱数の構成**を考える。一般に、$p$ 次元の正定値行列 $\Sigma$ のCholesky分解を $\Sigma=LL^T$ とし、独立な標準正規乱数 $U_1,\ldots,U_p$ を並べた
   $$
   U=(U_1,\ldots,U_p)^T\sim N_p(0,I_p)
   $$
   を生成できるとする。
   1. $Y=\mu+LU$ とおくとき、$E[Y]$ と $\operatorname{Cov}(Y)$ を求めよ。
   2. $Y$ の同時分布を求めよ。これにより、独立標準正規乱数から平均 $\mu$、分散共分散行列 $\Sigma$ をもつ正規乱数ベクトルを生成できることを説明せよ。
   3. 本問の $\Sigma$ に対し、問4で得た $L$ を用いて、独立な $U_1,U_2,U_3\sim N(0,1)$ から $(X_1,X_2,X_3)$ を生成する式を成分ごとに書け。

## 詳細解答

### 0. なぜこの形の残差を引くのか

$X_2$ を $X_1$ から線形に予測することを考える。係数 $c$ を使って残差を

$$
X_2-cX_1
$$

とすると、これを $X_1$ と無相関にしたいので

$$
\operatorname{Cov}(X_1,X_2-cX_1)
=a-c
$$

を0にする。従って $c=a$ であり、

$$
X_2-aX_1
$$

が自然に現れる。

同様に

$$
\operatorname{Cov}(X_2,X_3-cX_2)=b-c
$$

だから $c=b$ とすれば $X_2$ と無相関になる。

本問の変換は、既知のCholesky公式を代入しているのではなく、このように**相関する線形成分を順に引く残差化**から作られている。

### 1. 平均と分散

各 $X_i$ の平均は0なので、線形結合である各 $Z_i$ の平均も0である。

$$
E[Z_1]=E[Z_2]=E[Z_3]=0.
$$

$Z_1=X_1$ だから

$$
\operatorname{Var}(Z_1)=1.
$$

次に

$$
\begin{aligned}
\operatorname{Var}(X_2-aX_1)
&=\operatorname{Var}(X_2)
+a^2\operatorname{Var}(X_1)
-2a\operatorname{Cov}(X_1,X_2)\\
&=1+a^2-2a^2\\
&=1-a^2.
\end{aligned}
$$

したがって

$$
\operatorname{Var}(Z_2)=1.
$$

同様に

$$
\begin{aligned}
\operatorname{Var}(X_3-bX_2)
&=\operatorname{Var}(X_3)
+b^2\operatorname{Var}(X_2)
-2b\operatorname{Cov}(X_2,X_3)\\
&=1+b^2-2b^2\\
&=1-b^2,
\end{aligned}
$$

よって

$$
\operatorname{Var}(Z_3)=1.
$$

$|a|<1$, $|b|<1$ なので分母は正である。

以上から

$$
\boxed{
E[Z_i]=0,
\qquad
\operatorname{Var}(Z_i)=1
\quad(i=1,2,3)
}.
$$

### 2. 相互共分散

まず

$$
\operatorname{Cov}(X_1,X_2-aX_1)=a-a=0,
$$

したがって

$$
\operatorname{Cov}(Z_1,Z_2)=0.
$$

次に

$$
\operatorname{Cov}(X_1,X_3-bX_2)=ab-ba=0,
$$

よって

$$
\operatorname{Cov}(Z_1,Z_3)=0.
$$

最後に

$$
\begin{aligned}
&\operatorname{Cov}(X_2-aX_1,\,X_3-bX_2)\\
&\quad=\operatorname{Cov}(X_2,X_3)
-b\operatorname{Var}(X_2)
-a\operatorname{Cov}(X_1,X_3)
+ab\operatorname{Cov}(X_1,X_2)\\
&\quad=b-b-a(ab)+ab(a)\\
&\quad=0.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Cov}(Z_i,Z_j)=0
\qquad(i\ne j)
}.
$$

ここで $\operatorname{Cov}(X_1,X_3)=ab$ という特殊な形が、3つ目の残差まできれいに無相関にする役割を持っている。

### 3. 同時分布と独立性

$Z=(Z_1,Z_2,Z_3)^T$ は $X=(X_1,X_2,X_3)^T$ の線形変換なので、多変量正規分布に従う。

問1・2から平均ベクトルは0、分散共分散行列は $I_3$ だから

$$
\boxed{Z\sim N_3(0,I_3)}.
$$

多変量正規分布では共分散0の成分は独立なので

$$
\boxed{
Z_1,Z_2,Z_3
\text{ は独立で、それぞれ }N(0,1)\text{ に従う}
}.
$$

一般の確率変数では「無相関」だけから独立性は言えない。ここでは**同時正規性**が決定的である。

### 4. 逆変換とCholesky分解

定義式を順に逆に解く。

$$
X_1=Z_1.
$$

次に

$$
Z_2=\frac{X_2-aX_1}{\sqrt{1-a^2}}
$$

より

$$
X_2
=aZ_1+\sqrt{1-a^2}Z_2.
$$

さらに

$$
Z_3=\frac{X_3-bX_2}{\sqrt{1-b^2}}
$$

より

$$
\begin{aligned}
X_3
&=bX_2+\sqrt{1-b^2}Z_3\\
&=abZ_1
+b\sqrt{1-a^2}Z_2
+\sqrt{1-b^2}Z_3.
\end{aligned}
$$

従って

$$
X=LZ,
$$

$$
L=
\begin{pmatrix}
1&0&0\\
a&\sqrt{1-a^2}&0\\
ab&b\sqrt{1-a^2}&\sqrt{1-b^2}
\end{pmatrix}.
$$

$L$ は対角成分が正の下三角行列である。

ここで $Z\sim N_3(0,I_3)$ だから

$$
\operatorname{Cov}(X)
=L\operatorname{Cov}(Z)L^T
=LL^T.
$$

一方、もともと $\operatorname{Cov}(X)=\Sigma$ なので

$$
LL^T=\Sigma
$$

となるはずである。実際、非対角成分を確認すると

$$
(LL^T)_{12}=a,
\qquad
(LL^T)_{13}=ab,
$$

$$
\begin{aligned}
(LL^T)_{23}
&=a\cdot ab
+\sqrt{1-a^2}\,b\sqrt{1-a^2}\\
&=a^2b+b(1-a^2)\\
&=b,
\end{aligned}
$$

第3対角成分も

$$
\begin{aligned}
(LL^T)_{33}
&=a^2b^2+b^2(1-a^2)+(1-b^2)\\
&=1.
\end{aligned}
$$

従って

$$
\boxed{LL^T=\Sigma}.
$$

この時点で初めて一般的な名前を付ける。正定値行列 $\Sigma$ を

$$
\Sigma=LL^T
$$

と、対角成分が正の下三角行列 $L$ を用いて表すことを **Cholesky分解** という。

したがって今回の逐次残差化は、独立標準正規 $Z$ から相関した正規ベクトル $X=LZ$ を作るCholesky変換を逆向きに解いたものになっている。

$$
\boxed{
\text{逐次残差化で }X\to Z
\quad\Longleftrightarrow\quad
\text{Cholesky因子で }Z\to X
}
$$

これが本問で理解すべき接続であり、一般のCholeskyアルゴリズムを暗記することが目的ではない。

### 5. Cholesky分解による多変量正規乱数の構成

#### 5.1 平均と分散共分散行列

$U\sim N_p(0,I_p)$ なので

$$
E[U]=0,
\qquad
\operatorname{Cov}(U)=I_p.
$$

$Y=\mu+LU$ とおくと、期待値は

$$
E[Y]
=\mu+LE[U]
=\boxed{\mu}.
$$

分散共分散行列は、定数ベクトル $\mu$ は分散に影響しないから

$$
\begin{aligned}
\operatorname{Cov}(Y)
&=\operatorname{Cov}(LU)\\
&=L\operatorname{Cov}(U)L^T\\
&=LI_pL^T\\
&=LL^T\\
&=\boxed{\Sigma}.
\end{aligned}
$$

ここが乱数生成法の核心である。独立標準正規乱数の共分散行列 $I_p$ を、左から $L$、右から $L^T$ で変換することにより、目的の $\Sigma$ が作られる。

#### 5.2 同時分布

$U$ は多変量正規ベクトルであり、$Y=\mu+LU$ はそのアフィン変換である。したがって $Y$ も多変量正規分布に従う。

前問で求めた平均と分散共分散行列から

$$
\boxed{
Y\sim N_p(\mu,\Sigma)
}.
$$

したがって、指定した $\mu$ と正定値な $\Sigma$ に従う正規乱数ベクトルを作りたい場合は、

1. $\Sigma=LL^T$ とCholesky分解する。
2. 独立な標準正規乱数 $U_1,\ldots,U_p$ を生成して $U=(U_1,\ldots,U_p)^T$ とする。
3. $Y=\mu+LU$ を計算する。

という手順でよい。

$$
\boxed{
U\sim N_p(0,I_p)
\xrightarrow{\ \mu+L(\cdot)\ }
Y\sim N_p(\mu,\Sigma)
}
$$

「相関した乱数を直接生成する」のではなく、**まず独立な標準正規乱数を生成し、線形変換によって目的の相関を注入する**と考えるとよい。

#### 5.3 本問の3変量の場合

問4のCholesky因子

$$
L=
\begin{pmatrix}
1&0&0\\
a&\sqrt{1-a^2}&0\\
ab&b\sqrt{1-a^2}&\sqrt{1-b^2}
\end{pmatrix}
$$

を用いる。

独立な

$$
U_1,U_2,U_3\overset{\mathrm{iid}}{\sim}N(0,1)
$$

を生成して

$$
X=LU
$$

とすればよい。成分ごとには

$$
\boxed{X_1=U_1},
$$

$$
\boxed{
X_2=aU_1+\sqrt{1-a^2}\,U_2
},
$$

$$
\boxed{
X_3
=abU_1
+b\sqrt{1-a^2}\,U_2
+\sqrt{1-b^2}\,U_3
}.
$$

このとき

$$
E[X]=0,
\qquad
\operatorname{Cov}(X)=LL^T=\Sigma,
$$

かつ $X$ は正規ベクトルなので

$$
\boxed{X\sim N_3(0,\Sigma)}.
$$

問1〜4では $X$ から独立標準正規 $Z$ を取り出したが、乱数生成ではまさにその**逆向き**を使っている。

$$
\boxed{
\text{相関を除く： }X\to Z
\qquad
\text{相関を作る： }U\to LU
}
$$

## 本番答案

各 $Z_i$ の平均は0。分散は

$$
\operatorname{Var}(X_2-aX_1)=1-a^2,
\qquad
\operatorname{Var}(X_3-bX_2)=1-b^2
$$

よりすべて1。

相互共分散は

$$
\operatorname{Cov}(X_1,X_2-aX_1)=a-a=0,
$$

$$
\operatorname{Cov}(X_1,X_3-bX_2)=ab-ba=0,
$$

$$
\operatorname{Cov}(X_2-aX_1,X_3-bX_2)
=b-b-a(ab)+ab(a)=0.
$$

$Z$ は正規ベクトルの線形変換で、平均0、共分散 $I_3$ だから

$$
Z\sim N_3(0,I_3),
$$

従って3成分は独立標準正規。

逆変換は

$$
X=LZ,
\qquad
L=
\begin{pmatrix}
1&0&0\\
a&\sqrt{1-a^2}&0\\
ab&b\sqrt{1-a^2}&\sqrt{1-b^2}
\end{pmatrix}.
$$

直接計算で $LL^T=\Sigma$。従って $L$ は $\Sigma$ のCholesky因子であり、今回の変換はCholesky変換の逆向きの逐次残差化である。

さらに一般に $\Sigma=LL^T$、$U\sim N_p(0,I_p)$ として

$$
Y=\mu+LU
$$

とおけば

$$
E[Y]=\mu,
\qquad
\operatorname{Cov}(Y)=LI_pL^T=\Sigma.
$$

また正規ベクトルのアフィン変換なので

$$
Y\sim N_p(\mu,\Sigma).
$$

従ってCholesky分解を使えば、独立標準正規乱数から指定した平均・分散共分散行列をもつ多変量正規乱数を構成できる。

本問では

$$
X_1=U_1,
$$

$$
X_2=aU_1+\sqrt{1-a^2}U_2,
$$

$$
X_3=abU_1+b\sqrt{1-a^2}U_2+\sqrt{1-b^2}U_3
$$

と生成すれば $X\sim N_3(0,\Sigma)$ となる。

## 採点基準

- 残差化係数の意味と各分散の導出: 4点
- 3組の相互共分散を展開して0を確認: 5点
- 線形変換による同時正規性と無相関から独立性: 3点
- 逆変換・$LL^T=\Sigma$・Choleskyとの接続: 4点
- 独立標準正規乱数から $Y=\mu+LU$ を構成し、平均・共分散・同時分布を確認: 4点
