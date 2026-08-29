# Advanced 08 逐次残差化・Cholesky標準化

- 旧No.: 37
- 層: Advanced
- 演習価値: B
- 難度: S
- 目安時間: 25分
- 手計算監査: ◎

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
4. 逆変換を行列 $X=LZ$ の形で書き、$LL^T=\Sigma$ を確認してこの変換をCholesky分解の観点から説明せよ。

## 詳細解答

### 1. 平均と分散

各 $X_i$ の平均は0なので、線形結合である各 $Z_i$ の平均も0である。

$$
E[Z_1]=E[Z_2]=E[Z_3]=0.
$$

$Z_1=X_1$ だから

$$
\operatorname{Var}(Z_1)=1.
$$

次に $Z_2$ の分子の分散を計算する。

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

従って

$$
\operatorname{Var}(Z_2)
=\frac{1-a^2}{1-a^2}
=1.
$$

同様に

$$
\begin{aligned}
\operatorname{Var}(X_3-bX_2)
&=\operatorname{Var}(X_3)
+b^2\operatorname{Var}(X_2)
-2b\operatorname{Cov}(X_2,X_3)\\
&=1+b^2-2b^2\\
&=1-b^2.
\end{aligned}
$$

従って

$$
\operatorname{Var}(Z_3)=1.
$$

$|a|<1,|b|<1$ なので分母は正であり、この標準化は正しく定義される。

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

まず $Z_1$ と $Z_2$ について、正の定数による標準化は0かどうかに影響しないので分子を計算する。

$$
\begin{aligned}
\operatorname{Cov}(X_1,X_2-aX_1)
&=\operatorname{Cov}(X_1,X_2)
-a\operatorname{Var}(X_1)\\
&=a-a\\
&=0.
\end{aligned}
$$

従って

$$
\operatorname{Cov}(Z_1,Z_2)=0.
$$

次に

$$
\begin{aligned}
\operatorname{Cov}(X_1,X_3-bX_2)
&=\operatorname{Cov}(X_1,X_3)
-b\operatorname{Cov}(X_1,X_2)\\
&=ab-ba\\
&=0.
\end{aligned}
$$

よって

$$
\operatorname{Cov}(Z_1,Z_3)=0.
$$

最後に $Z_2,Z_3$ の分子同士を計算する。

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
\operatorname{Cov}(Z_2,Z_3)=0.
$$

以上より

$$
\boxed{
\operatorname{Cov}(Z_i,Z_j)=0
\qquad(i\ne j)
}.
$$

### 3. 同時分布と独立性

$Z=(Z_1,Z_2,Z_3)^T$ は $X=(X_1,X_2,X_3)^T$ の線形変換である。

多変量正規ベクトルの線形変換は再び多変量正規分布に従う。ここでは元の $X$ が3変量正規であり、変換係数は定数なのでこの性質を適用できる。

第1問と第2問から $Z$ の平均ベクトルは0、分散共分散行列は単位行列 $I_3$ である。従って

$$
\boxed{
Z\sim N_3(0,I_3)
}.
$$

多変量正規分布では、相互共分散が0なら各成分は独立である。したがって

$$
\boxed{
Z_1,Z_2,Z_3
\text{ は独立で、それぞれ }N(0,1)\text{ に従う}
}.
$$

一般の確率変数では「無相関」だけから独立性は言えず、ここでは**同時正規性**が決定的な条件である。

### 4. Cholesky分解との関係

定義式を逆に解く。

まず

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
=aX_1+\sqrt{1-a^2}Z_2
=aZ_1+\sqrt{1-a^2}Z_2.
$$

さらに

$$
Z_3=\frac{X_3-bX_2}{\sqrt{1-b^2}}
$$

より

$$
X_3
=bX_2+\sqrt{1-b^2}Z_3.
$$

$X_2$ の式を代入すると

$$
X_3
=abZ_1
+b\sqrt{1-a^2}Z_2
+\sqrt{1-b^2}Z_3.
$$

従って

$$
X=LZ
$$

と書け、

$$
L=
\begin{pmatrix}
1&0&0\\
a&\sqrt{1-a^2}&0\\
ab&b\sqrt{1-a^2}&\sqrt{1-b^2}
\end{pmatrix}.
$$

$L$ は対角成分が正の下三角行列である。

実際に $LL^T$ の主要な成分を確認する。

第1行と第2行の内積は

$$
a.
$$

第1行と第3行の内積は

$$
ab.
$$

第2行と第3行の内積は

$$
\begin{aligned}
a\cdot ab
+\sqrt{1-a^2}\,b\sqrt{1-a^2}
&=a^2b+b(1-a^2)\\
&=b.
\end{aligned}
$$

第3行の二乗和は

$$
\begin{aligned}
a^2b^2+b^2(1-a^2)+(1-b^2)
&=b^2+1-b^2\\
&=1.
\end{aligned}
$$

従って

$$
\boxed{LL^T=\Sigma}.
$$

これは $L$ が $\Sigma$ のCholesky因子であることを意味する。独立標準正規 $Z$ から $X=LZ$ とすれば共分散 $\Sigma$ の正規ベクトルを生成でき、今回の $Z$ の定義はその下三角変換を逆向きに解いた逐次残差化になっている。

## 本番答案

各 $Z_i$ の平均は0。分散は

$$
\operatorname{Var}(X_2-aX_1)
=1+a^2-2a^2=1-a^2,
$$

$$
\operatorname{Var}(X_3-bX_2)
=1+b^2-2b^2=1-b^2,
$$

より全て1。

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

$Z$ は正規ベクトルの線形変換なので多変量正規で、分散共分散行列は $I_3$。従って

$$
Z\sim N_3(0,I_3)
$$

であり、3成分は独立な標準正規分布に従う。

逆変換は

$$
X=LZ,
\qquad
L=
\begin{pmatrix}
1&0&0\\
a&\sqrt{1-a^2}&0\\
ab&b\sqrt{1-a^2}&\sqrt{1-b^2}
\end{pmatrix},
$$

であり、直接計算で $LL^T=\Sigma$。従って $L$ は $\Sigma$ のCholesky因子である。

## 採点基準

- 各分散を共分散展開から導出: 5点
- 3組の相互共分散を展開して0を確認: 7点
- 線形変換による正規性と同時正規性から独立性を結論: 4点
- 逆変換・下三角行列・$LL^T=\Sigma$ の確認: 4点
