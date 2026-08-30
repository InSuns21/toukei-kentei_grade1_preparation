# Advanced 15 射影・Cochran・予測誤差

- 旧No.: 76
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：最小二乗推定量 $\hat\beta=(X^TX)^{-1}X^Ty$、正規ベクトルの線形変換、共分散の計算
- **共通理論として参照**：対称冪等行列と直交射影、直交射影された正規成分の独立性、ランクとカイ二乗自由度の対応
- **この問題で行うこと**：正規標本の「平均方向 vs 残差方向」の分解を、回帰の「当てはめ空間 vs 残差空間」へ一般化する
- **1級での扱い**：$H$ を射影行列だと丸暗記するのではなく、$H^T=H$, $H^2=H$ と $(I-H)X=0$ を確認できることを重視する

射影・Cochranの線形代数が曖昧なら、先に次の共通解説を参照すること。

[共通解説：正規標本の直交射影・Cochranの定理](../common/normal_sample_projection_cochran.md)

また、正規標本での最も基本的な適用は次で演習している。

[Advanced 05 射影行列・二次形式・Cochran分解](33_projection_quadratic_cochran.md)

## 問題

線形モデル

$$
y=X\beta+\varepsilon,
\qquad
\varepsilon\sim N_n(0,\sigma^2I),
$$

$\operatorname{rank}(X)=p$ とする。$H=X(X^TX)^{-1}X^T$ とする。

1. $H$ が $\mathcal C(X)$ への直交射影であることを確認し、$Hy$ と $(I-H)y$ が独立であることを示せ。
2. $SSE=y^T(I-H)y$ の分布を求めよ。
3. 新しい説明変数 $x_0$ に対する独立な将来観測 $Y_0=x_0^T\beta+\varepsilon_0$ を考える。予測誤差 $Y_0-x_0^T\hat\beta$ の分散を求めよ。
4. $\sigma^2$ を $S^2=SSE/(n-p)$ で推定したときのStudent化を導け。

## 詳細解答

### 0. まず $H$ が何をする行列か

$H$ をいきなり「射影行列」として既知扱いしない。まず性質を確認する。

転置を取ると

$$
\begin{aligned}
H^T
&=\{X(X^TX)^{-1}X^T\}^T\\
&=X\{(X^TX)^{-1}\}^TX^T\\
&=X(X^TX)^{-1}X^T\\
&=H,
\end{aligned}
$$

ここで $X^TX$ は対称なので、その逆行列も対称である。

また

$$
\begin{aligned}
H^2
&=X(X^TX)^{-1}X^TX(X^TX)^{-1}X^T\\
&=X(X^TX)^{-1}X^T\\
&=H.
\end{aligned}
$$

従って $H$ は対称かつ冪等である。

さらに任意の $y$ に対して

$$
Hy=X\{(X^TX)^{-1}X^Ty\}
$$

は $X$ の列ベクトルの線形結合なので $\mathcal C(X)$ に属する。一方、$v\in\mathcal C(X)$ なら $v=Xa$ と書け、

$$
Hv
=HXa
=X(X^TX)^{-1}X^TXa
=Xa=v.
$$

従って $H$ は

$$
\boxed{\mathcal C(X)\text{ への直交射影}}
$$

である。

$\operatorname{rank}(X)=p$ より

$$
\operatorname{rank}(H)=p,
\qquad
\operatorname{rank}(I-H)=n-p.
$$

また

$$
(I-H)X
=X-HX
=X-X=0.
$$

この確認が、以下のCochran分解の土台になる。

### 1. 適合値と残差の独立

$(Hy,(I-H)y)$ は正規ベクトル $y$ の線形変換なので同時正規である。

共分散は

$$
\begin{aligned}
\operatorname{Cov}(Hy,(I-H)y)
&=H(\sigma^2I)(I-H)^T\\
&=\sigma^2H(I-H)\\
&=\sigma^2(H-H^2)\\
&=0.
\end{aligned}
$$

同時正規かつ無相関なので

$$
\boxed{Hy\perp(I-H)y}.
$$

これは正規標本の $PX\perp QX$ と全く同じ構造である。$H$ が当てはめ空間、$I-H$ が残差空間への射影になっている。

### 2. 誤差平方和の分布

$(I-H)X\beta=0$ なので

$$
\begin{aligned}
SSE
&=y^T(I-H)y\\
&=(X\beta+\varepsilon)^T(I-H)(X\beta+\varepsilon)\\
&=\varepsilon^T(I-H)\varepsilon.
\end{aligned}
$$

$Z=\varepsilon/\sigma\sim N_n(0,I)$ と置けば

$$
\frac{SSE}{\sigma^2}=Z^T(I-H)Z.
$$

ここで $I-H$ は対称冪等でランク $n-p$ である。共通解説とAdvanced 05で確認した一般原理

$$
Z\sim N_n(0,I),\quad A^T=A,\quad A^2=A,
\quad \operatorname{rank}(A)=r
$$

なら

$$
Z^TAZ\sim\chi^2_r
$$

を $A=I-H$ に適用すると

$$
\boxed{\frac{SSE}{\sigma^2}\sim\chi^2_{n-p}}.
$$

中身を一行で再確認すると、$I-H$ を直交対角化すれば

$$
U^T(I-H)U=\operatorname{diag}(I_{n-p},0_p),
$$

$W=U^TZ\sim N_n(0,I)$ なので

$$
Z^T(I-H)Z
=W_1^2+\cdots+W_{n-p}^2.
$$

つまり自由度 $n-p$ は「残差空間の次元」である。

### 3. 予測誤差分散

$$
\hat\beta=(X^TX)^{-1}X^Ty
$$

より

$$
\hat\beta-\beta
=(X^TX)^{-1}X^T\varepsilon.
$$

したがって

$$
Y_0-x_0^T\hat\beta
=\varepsilon_0-x_0^T(\hat\beta-\beta).
$$

$\varepsilon_0$ は学習標本と独立なので交差共分散は0である。また

$$
\begin{aligned}
\operatorname{Var}(\hat\beta-\beta)
&=(X^TX)^{-1}X^T(\sigma^2I)X(X^TX)^{-1}\\
&=\sigma^2(X^TX)^{-1}.
\end{aligned}
$$

従って

$$
\boxed{
\operatorname{Var}(Y_0-x_0^T\hat\beta)
=\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}
}.
$$

最初の $1$ は将来観測自身の新しい誤差 $\varepsilon_0$、第2項は $\beta$ を推定したことによる不確実性である。

### 4. Student化

予測誤差は正規変数の線形結合なので

$$
\frac{Y_0-x_0^T\hat\beta}
{\sigma\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim N(0,1).
$$

次に、この分子と $SSE$ の独立性を確認する。

$SSE$ は $(I-H)\varepsilon$ だけの関数である。一方

$$
\hat\beta-\beta=(X^TX)^{-1}X^T\varepsilon
$$

について、$X^T(I-H)=0$ だから残差成分 $(I-H)\varepsilon$ は寄与しない。すなわち $\hat\beta-\beta$ は当てはめ空間側 $H\varepsilon$ の情報だけから決まる。

問1と同じ直交正規分解により

$$
H\varepsilon\perp(I-H)\varepsilon.
$$

さらに $\varepsilon_0$ は学習標本全体と独立なので、予測誤差と $SSE$ は独立である。

問2から

$$
\frac{SSE}{\sigma^2}\sim\chi^2_{n-p},
\qquad
S^2=\frac{SSE}{n-p}.
$$

したがって、独立な標準正規とカイ二乗の比というt分布の定義から

$$
\boxed{
\frac{Y_0-x_0^T\hat\beta}
{S\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim t_{n-p}
}.
$$

## 本番答案

$H=X(X^TX)^{-1}X^T$ は

$$
H^T=H,
\qquad H^2=H,
\qquad HX=X
$$

より $\mathcal C(X)$ への直交射影で、$I-H$ は残差空間への直交射影。ランクはそれぞれ $p,n-p$。

$(Hy,(I-H)y)$ は同時正規で

$$
\operatorname{Cov}(Hy,(I-H)y)
=\sigma^2H(I-H)=0
$$

だから独立。

また $(I-H)X\beta=0$ より

$$
SSE=\varepsilon^T(I-H)\varepsilon.
$$

$Z=\varepsilon/\sigma\sim N_n(0,I)$ とすると、$I-H$ は対称冪等・ランク $n-p$ なので

$$
\frac{SSE}{\sigma^2}=Z^T(I-H)Z\sim\chi^2_{n-p}.
$$

さらに

$$
Y_0-x_0^T\hat\beta
=\varepsilon_0-x_0^T(X^TX)^{-1}X^T\varepsilon
$$

より

$$
\operatorname{Var}(Y_0-x_0^T\hat\beta)
=\sigma^2\{1+x_0^T(X^TX)^{-1}x_0\}.
$$

予測誤差は当てはめ空間側の誤差と新しい $\varepsilon_0$ からなり、$SSE$ は残差空間側からなるので独立。従って

$$
\frac{Y_0-x_0^T\hat\beta}
{S\sqrt{1+x_0^T(X^TX)^{-1}x_0}}
\sim t_{n-p}.
$$

## 採点基準

- $H$ の対称性・冪等性・射影先・ランクの確認: 4点
- 射影成分の独立性: 4点
- 誤差平方和分布と自由度の意味: 5点
- 予測誤差分散: 4点
- Student化と独立性: 3点
