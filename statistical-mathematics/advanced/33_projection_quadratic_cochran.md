# Advanced 05 射影行列・二次形式・Cochran分解

- 旧No.: 33
- 層: Advanced
- 演習価値: S
- 難度: S
- 目安時間: 30分
- 手計算監査: ◎

## この問題の前提と到達点

- **既知としてよい**：多変量正規分布の線形変換、共分散の計算、カイ二乗分布の定義
- **この問題で使う共通理論**：対称冪等行列と直交射影、スペクトル定理、標準多変量正規の直交変換不変性
- **この問題で到達すること**：標本平均方向と残差方向への分解から、標本平均・標本分散の分布と独立性を自分で再構成する
- **1級での扱い**：Cochranの定理の名前だけで済ませるのではなく、少なくとも「直交射影のランクが自由度になる」仕組みを理解する。スペクトル定理そのものの証明を本番答案で毎回書く必要はない

上の共通理論はCoreでも使っている。未習・曖昧なら先に次を読むこと。

[共通解説：正規標本の直交射影・Cochranの定理](../common/normal_sample_projection_cochran.md)

この共通解説を正本とし、本問では同じ理論を別の公式として暗記せず、正規標本への適用を演習する。

## 問題

$X=(X_1,\ldots,X_n)^T\sim N_n(\mu\mathbf1,\sigma^2I)$。$P=\mathbf1\mathbf1^T/n$, $Q=I-P$ とする。

1. $P,Q$ がそれぞれ平均方向と残差方向への直交射影であることを示し、ランクを求めよ。
2. $PX$ と $QX$ が独立であることを示せ。
3. $\bar X$ と標本分散 $S^2=(n-1)^{-1}\sum(X_i-\bar X)^2$ の分布を導け。
4. $\bar X$ と $S^2$ の独立性を示し、この分解がCochranの定理の正規標本における具体例になっていることを説明せよ。

## 詳細解答

### 1. 射影とランク

まず $P$ が何をする行列かを直接見る。任意の $x\in\mathbb R^n$ に対して

$$
Px
=\frac1n\mathbf1\mathbf1^Tx
=\left(\frac1n\sum_{i=1}^n x_i\right)\mathbf1
=\bar x\,\mathbf1.
$$

したがって $P$ はベクトルを $\mathbf1$ 方向、すなわち全成分が等しい平均方向へ写す。

また

$$
P^T=P,
\qquad
P^2=\frac{\mathbf1\mathbf1^T\mathbf1\mathbf1^T}{n^2}
=\frac{n\mathbf1\mathbf1^T}{n^2}=P.
$$

対称かつ冪等なので $P$ はその像 $\operatorname{span}(\mathbf1)$ への直交射影であり、

$$
\boxed{\operatorname{rank}(P)=1}.
$$

次に $Q=I-P$ だから

$$
Qx=x-\bar x\mathbf1
=
\begin{pmatrix}
x_1-\bar x\\
\vdots\\
x_n-\bar x
\end{pmatrix}.
$$

これは平均を引いた残差ベクトルであり、その成分和は0である。従って $Q$ の像は

$$
\{x\in\mathbb R^n:\mathbf1^Tx=0\}=\mathbf1^\perp
$$

である。さらに

$$
Q^T=Q,
\qquad
Q^2=I-2P+P^2=Q,
\qquad
PQ=P-P^2=0.
$$

よって $Q$ は $\mathbf1^\perp$ への直交射影で、

$$
\boxed{\operatorname{rank}(Q)=n-1}.
$$

ここで「対称かつ冪等なら直交射影」という事実の幾何学的意味や証明が曖昧なら、上記の共通解説を参照すること。

### 2. $PX$ と $QX$ の独立性

どちらも正規ベクトル $X$ の線形変換なので、$(PX,QX)$ は同時正規である。

共分散は

$$
\begin{aligned}
\operatorname{Cov}(PX,QX)
&=P\operatorname{Cov}(X)Q^T\\
&=P(\sigma^2I)Q\\
&=\sigma^2PQ\\
&=0.
\end{aligned}
$$

一般の確率変数では無相関から独立は言えないが、ここでは**同時正規**なので

$$
\boxed{PX\perp QX}.
$$

平均方向と残差方向が直交していることが、正規分布のもとで確率的な独立性に対応している。

### 3. 平均と標本分散の分布

#### 標本平均

$PX=\bar X\mathbf1$ であり、$\bar X=n^{-1}\mathbf1^TX$ は正規ベクトルの線形結合だから正規分布に従う。

$$
E[\bar X]=\mu,
$$

$$
\operatorname{Var}(\bar X)
=\frac1{n^2}\mathbf1^T(\sigma^2I)\mathbf1
=\frac{\sigma^2}{n}.
$$

従って

$$
\boxed{\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right)}.
$$

#### 標本分散

標準化して

$$
Z=\frac{X-\mu\mathbf1}{\sigma}\sim N_n(0,I)
$$

とする。$Q\mathbf1=0$ なので

$$
\frac{X^TQX}{\sigma^2}=Z^TQZ.
$$

一方、$QX=X-\bar X\mathbf1$ だから

$$
X^TQX
=(QX)^T(QX)
=\sum_{i=1}^n(X_i-\bar X)^2
=(n-1)S^2.
$$

従って

$$
\frac{(n-1)S^2}{\sigma^2}=Z^TQZ.
$$

ここからカイ二乗分布が出る理由を確認する。$Q$ は対称冪等でランク $n-1$ なので、固有値は1が $n-1$ 個、0が1個である。スペクトル定理により、ある直交行列 $U$ が存在して

$$
U^TQU=\operatorname{diag}(1,\ldots,1,0)
$$

とできる。

$W=U^TZ$ と置く。標準多変量正規は直交変換しても分布が変わらないので

$$
W\sim N_n(0,I).
$$

したがって

$$
\begin{aligned}
Z^TQZ
&=W^T(U^TQU)W\\
&=W_1^2+\cdots+W_{n-1}^2\\
&\sim\chi^2_{n-1}.
\end{aligned}
$$

よって

$$
\boxed{\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}}.
$$

この「対称冪等行列のランクだけ独立標準正規の平方が残る」という部分が、Cochranの定理の中核である。詳細な線形代数の橋渡しは共通解説にまとめてある。

### 4. 独立性とCochran分解

$\bar X$ は $PX$ だけの関数であり、$S^2$ は $QX$ だけの関数である。問2で

$$
PX\perp QX
$$

を示したので

$$
\boxed{\bar X\perp S^2}.
$$

また

$$
P+Q=I,
\qquad
PQ=0,
\qquad
\operatorname{rank}(P)+\operatorname{rank}(Q)=1+(n-1)=n.
$$

つまり標準正規ベクトルの全変動を、互いに直交する「平均方向1次元」と「残差方向 $n-1$ 次元」に分解している。これが本問におけるCochran分解である。

名前だけ覚えるより、

$$
\boxed{
\text{直交射影}
\longrightarrow
\text{独立な正規成分}
\longrightarrow
\text{ランクがカイ二乗の自由度}
}
$$

という流れを押さえることが重要である。

## 本番答案

$P=\mathbf1\mathbf1^T/n$ は

$$
Px=\bar x\mathbf1,
\qquad P^T=P,
\qquad P^2=P
$$

より平均方向への直交射影でランク1。$Q=I-P$ は残差方向 $\mathbf1^\perp$ への直交射影でランク $n-1$、かつ $PQ=0$。

$(PX,QX)$ は同時正規で

$$
\operatorname{Cov}(PX,QX)=\sigma^2PQ=0
$$

だから独立。

また

$$
\bar X\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

$Z=(X-\mu\mathbf1)/\sigma\sim N_n(0,I)$ とすると

$$
\frac{(n-1)S^2}{\sigma^2}=Z^TQZ.
$$

$Q$ は対称冪等・ランク $n-1$ なので直交対角化により右辺は独立標準正規の平方和 $n-1$ 個となり、

$$
\frac{(n-1)S^2}{\sigma^2}\sim\chi^2_{n-1}.
$$

$\bar X$ は $PX$、$S^2$ は $QX$ の関数なので独立。これは平均方向1次元と残差方向 $n-1$ 次元へのCochran分解である。

## 採点基準

- $P,Q$ の作用・射影・ランク: 5点
- 同時正規性と共分散0から独立性: 5点
- $\bar X$ の分布: 3点
- 二次形式を直交対角化してカイ二乗へ導く: 5点
- $\bar X$ と $S^2$ の独立性・Cochran分解の説明: 2点
