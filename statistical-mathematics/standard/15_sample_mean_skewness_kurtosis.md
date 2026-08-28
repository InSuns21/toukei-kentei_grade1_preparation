# Standard 05 標本平均の歪度・尖度

- 旧No.: 15
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

$X_1,\ldots,X_n$ は独立同分布で

$$
E[X_i]=\mu,
\qquad
\operatorname{Var}(X_i)=\sigma^2>0
$$

とし、四次モーメントまで有限とする。母三次・四次中心モーメントを

$$
\mu_3=E[(X_i-\mu)^3],
\qquad
\mu_4=E[(X_i-\mu)^4]
$$

とし、母歪度と母超過尖度を

$$
\gamma_1=\frac{\mu_3}{\sigma^3},
\qquad
\gamma_2=\frac{\mu_4}{\sigma^4}-3
$$

で定める。

1. 標本平均 $\bar X_n$ の三次中心モーメントを求め、歪度を求めよ。
2. $\bar X_n$ の四次中心モーメントを求め、超過尖度を求めよ。
3. 得られた結果と中心極限定理の関係を説明せよ。

## 詳細解答

$$
Y_i=X_i-\mu,
\qquad
S_n=\sum_{i=1}^nY_i
$$

と置く。すると

$$
E[Y_i]=0,
\quad
E[Y_i^2]=\sigma^2,
\quad
E[Y_i^3]=\mu_3,
\quad
E[Y_i^4]=\mu_4,
$$

かつ

$$
\bar X_n-\mu=\frac{S_n}{n}.
$$

独立性と $E[Y_i]=0$ を使って $S_n$ の中心モーメントを順に求める。

### 1. 三次中心モーメントと歪度

まず

$$
S_n^3=\sum_{i,j,k}Y_iY_jY_k.
$$

期待値を取ると、添字が全て同じ項以外は0になる。

- $i,j,k$ が全て異なるなら
  $$
  E[Y_iY_jY_k]=E[Y_i]E[Y_j]E[Y_k]=0.
  $$
- 例えば $i=j\ne k$ なら
  $$
  E[Y_i^2Y_k]=E[Y_i^2]E[Y_k]=0.
  $$
- $i=j=k$ のときだけ
  $$
  E[Y_i^3]=\mu_3
  $$
  が残る。

したがって

$$
E[S_n^3]=n\mu_3.
$$

よって

$$
\begin{aligned}
E[(\bar X_n-\mu)^3]
&=\frac{1}{n^3}E[S_n^3]\\
&=\boxed{\frac{\mu_3}{n^2}}.
\end{aligned}
$$

一方

$$
\operatorname{Var}(\bar X_n)=\frac{\sigma^2}{n}.
$$

したがって $\bar X_n$ の歪度は

$$
\begin{aligned}
\gamma_1(\bar X_n)
&=\frac{E[(\bar X_n-\mu)^3]}
{\operatorname{Var}(\bar X_n)^{3/2}}\\
&=\frac{\mu_3/n^2}{(\sigma^2/n)^{3/2}}\\
&=\frac{\mu_3}{\sigma^3}\frac1{\sqrt n}\\
&=\boxed{\frac{\gamma_1}{\sqrt n}}.
\end{aligned}
$$

### 2. 四次中心モーメントと超過尖度

次に

$$
S_n^4=\sum_{i,j,k,\ell}Y_iY_jY_kY_\ell
$$

を考える。期待値が0でないのは、各添字が少なくとも2回ずつ現れる場合だけである。残る型は次の2つ。

#### 4個とも同じ添字

各 $i$ について $Y_i^4$ が1項あり、全部で $n$ 項なので寄与は

$$
n\mu_4.
$$

#### 2個ずつ同じ添字

異なる $i,j$ を選ぶと $Y_i^2Y_j^2$ が現れる。$i,j$ の選び方は $\binom n2$ 通りで、4つの位置へ $i,i,j,j$ を並べる方法は

$$
\frac{4!}{2!2!}=6
$$

通り。独立性より

$$
E[Y_i^2Y_j^2]=E[Y_i^2]E[Y_j^2]=\sigma^4.
$$

したがってこの型の寄与は

$$
6\binom n2\sigma^4
=3n(n-1)\sigma^4.
$$

以上より

$$
\boxed{
E[S_n^4]
=n\mu_4+3n(n-1)\sigma^4
}.
$$

したがって

$$
\begin{aligned}
E[(\bar X_n-\mu)^4]
&=\frac1{n^4}E[S_n^4]\\
&=\frac{\mu_4}{n^3}
+\frac{3(n-1)}{n^3}\sigma^4.
\end{aligned}
$$

$\bar X_n$ の尖度は、分散の2乗

$$
\operatorname{Var}(\bar X_n)^2
=\frac{\sigma^4}{n^2}
$$

で割って

$$
\begin{aligned}
\frac{E[(\bar X_n-\mu)^4]}
{\operatorname{Var}(\bar X_n)^2}
&=\frac{\mu_4}{n\sigma^4}
+3\frac{n-1}{n}\\
&=\frac{\gamma_2+3}{n}+3-\frac3n\\
&=3+\frac{\gamma_2}{n}.
\end{aligned}
$$

したがって超過尖度は

$$
\boxed{\gamma_2(\bar X_n)=\frac{\gamma_2}{n}}.
$$

### 3. 中心極限定理との関係

標準化標本平均

$$
Z_n=\frac{\sqrt n(\bar X_n-\mu)}{\sigma}
$$

は中心極限定理により

$$
Z_n\Rightarrow N(0,1)
$$

となる。標準正規分布の歪度は0、超過尖度も0である。

本問ではさらに、有限な三次・四次モーメントのもとで

$$
\gamma_1(Z_n)=\frac{\gamma_1}{\sqrt n}\to0,
\qquad
\gamma_2(Z_n)=\frac{\gamma_2}{n}\to0
$$

を直接確認できた。これは標本平均の分布形が正規分布へ近づくことと整合する。

ただし注意として、**分布収束だけから高次モーメントの収束が自動的に従うわけではない**。ここでは四次モーメントまで有限という仮定のもと、独立性を使ってモーメントを直接計算している。

## 本番答案

$Y_i=X_i-\mu$, $S_n=\sum_iY_i$ と置く。$E[Y_i]=0$ と独立性より、三次展開では全添字が同じ項だけが残るので

$$
E[S_n^3]=n\mu_3.
$$

従って

$$
E[(\bar X_n-\mu)^3]=\frac{\mu_3}{n^2},
$$

また $\operatorname{Var}(\bar X_n)=\sigma^2/n$ だから

$$
\boxed{\gamma_1(\bar X_n)=\frac{\gamma_1}{\sqrt n}}.
$$

四次展開では、全添字が同じ項と $Y_i^2Y_j^2$ 型だけが残る。後者は

$$
6\binom n2=3n(n-1)
$$

項なので

$$
E[S_n^4]=n\mu_4+3n(n-1)\sigma^4.
$$

よって尖度は

$$
\frac{E[(\bar X_n-\mu)^4]}{(\sigma^2/n)^2}
=3+\frac{\gamma_2}{n},
$$

したがって

$$
\boxed{\gamma_2(\bar X_n)=\frac{\gamma_2}{n}}.
$$

歪度・超過尖度はいずれも0へ収束し、標準化標本平均が正規分布へ近づく中心極限定理と整合する。

## 採点基準

- 三次展開で残る項の説明: 5点
- 三次中心モーメント・歪度: 4点
- 四次展開の組合せ係数 $6\binom n2$: 5点
- 四次中心モーメント・超過尖度: 4点
- 中心極限定理との関係と注意: 2点
