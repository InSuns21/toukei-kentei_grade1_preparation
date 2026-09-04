# Standard 15 ポアソン過程・条件付き到着時刻

- 安定ID: `RIKOU-STANDARD-15`
- 80大問 No.: 15
- 演習価値: A
- 難度: A
- 目安時間: 25〜30分

## 問題

率 $\lambda$ の homogeneous ポアソン過程で、$T>0$ とし $N(T)=n$ が与えられたとする。

1. $[0,T]$ 内の到着時刻が独立な一様分布 $U(0,T)$ の順序統計量と同じ条件付き分布になることを、使う定理の条件とともに述べよ。
2. 第1到着時刻 $S_1$ の条件付き累積分布関数を求めよ。
3. 第 $k$ 到着時刻 $S_k/T$ の分布を求めよ。
4. $E[S_k\mid N(T)=n]$ を求めよ。
5. $n=4$ のとき $P(S_2<T/2\mid N(T)=4)$ を計算せよ。

## 詳細解答

### 1. ポアソン条件付き順序統計量定理

<a id="thm-rikou-standard15-poisson-order-stats"></a>

<!-- formal-statement-start -->
> **定理（ポアソン過程の条件付き順序統計量定理）**  
> 率 $\lambda>0$ のhomogeneous ポアソン過程を考え、$T>0$ を固定します。$N(T)=n$ に条件付けると、条件付き到着時刻

$$
0<S_1<\cdots<S_n<T
$$

> の同時密度は

$$
\boxed{
\frac{n!}{T^n},
\qquad 0<s_1<\cdots<s_n<T
}
$$

> となります。したがって $(S_1,\ldots,S_n)$ の条件付き分布は、独立な $U(0,T)$ 標本 $n$ 個の順序統計量の分布と一致します。
<!-- formal-statement-end -->

使うのは **homogeneous ポアソン過程の条件付き順序統計量定理**である。

定理は、一定率 $\lambda$ のhomogeneous ポアソン過程について、固定区間 $[0,T]$ の総到着数を $N(T)=n$ に固定すると、条件付き到着時刻

$$
0<S_1<\cdots<S_n<T
$$

の同時密度が

$$
\frac{n!}{T^n},
\qquad 0<s_1<\cdots<s_n<T
$$

となり、$n$ 個の独立同分布 $U(0,T)$ の順序統計量と一致する、という結果である。

必要条件は、**率が時間一定のhomogeneous ポアソン過程**であること、固定 $T$ に対して **総数 $N(T)=n$ に条件付ける**ことである。本問はその条件を満たす。非一様ポアソン過程では、条件付き位置は一般に一様ではない。

### 2. 第1到着時刻

条件付きで $n$ 個の一様点の最小値なので、$0<s<T$ で

$$
\begin{aligned}
P(S_1>s\mid N(T)=n)
&=P(U_1>s,\ldots,U_n>s)\\
&=\left(1-\frac sT\right)^n.
\end{aligned}
$$

従って

$$
\boxed{F_{S_1\mid N(T)=n}(s)
=1-\left(1-\frac sT\right)^n}.
$$

### 3. 第$k$到着の分布

$U_i/T\sim U(0,1)$。連続独立同分布標本の第$k$順序統計量密度公式から

$$
\begin{aligned}
f_{S_k/T}(u)
&=\frac{n!}{(k-1)!(n-k)!}
 u^{k-1}(1-u)^{n-k},\\
&\qquad 0<u<1.
\end{aligned}
$$

したがって

$$
\boxed{
\frac{S_k}{T}\mid N(T)=n
\sim\operatorname{Beta}(k,n+1-k)
}.
$$

ここで順序統計量密度公式を使えるのは、条件付きで独立同分布連続一様標本の順序統計量へ帰着済みだからである。

### 4. 条件付き期待値

$U=S_k/T$ とすると上のBeta密度より

$$
E[U]
=\frac{B(k+1,n+1-k)}{B(k,n+1-k)}
=\frac{k}{n+1}.
$$

従って

$$
\boxed{E[S_k\mid N(T)=n]=\frac{kT}{n+1}}.
$$

### 5. 数値例

$n=4,k=2$ では $S_2<T/2$ は前半に少なくとも2点あること。条件付きで各点が前半に入る確率は1/2なので

$$
\begin{aligned}
P(S_2<T/2\mid N(T)=4)
&=P(Bin(4,1/2)\ge2)\\
&=1-\frac1{16}-\frac4{16}\\
&=\boxed{\frac{11}{16}}.
\end{aligned}
$$

## 本番答案

率一定のhomogeneous ポアソン過程で、固定区間の総数 $N(T)=n$ に条件付けている。よって **ポアソン条件付き順序統計量定理**を適用でき、到着時刻は独立同分布 $U(0,T)$ の順序統計量と同分布。

$$
P(S_1>s\mid N(T)=n)=\left(1-\frac sT\right)^n.
$$

また順序統計量密度から

$$
\frac{S_k}{T}\mid N(T)=n\sim Beta(k,n+1-k),
$$

$$
E[S_k\mid N(T)=n]=\frac{kT}{n+1}.
$$

$n=4$ では前半点数が $Bin(4,1/2)$ なので $P(S_2<T/2)=11/16$。

## 採点基準

- 条件付き順序統計量定理名・homogeneous条件・条件付け確認: 5点
- 第1到着累積分布関数: 4点
- Beta分布の密度導出: 4点
- 平均: 3点
- 有限計算: 4点

25分経過時は「homogeneous」と「$N(T)=n$ に条件付け」を定理適用条件として必ず書く。
