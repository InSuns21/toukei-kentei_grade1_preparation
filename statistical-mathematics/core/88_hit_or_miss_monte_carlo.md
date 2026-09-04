# Core 45 hit-or-miss法と標本平均法の分散比較

- 旧No.: 88
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎

## 問題

積分

$$
I=\int_0^1x^2dx=\frac13
$$

をMonte Carlo法で推定する。

### 方法A

$U_i\sim U(0,1)$ として

$$
\widehat I_A=\frac1n\sum_{i=1}^nU_i^2.
$$

### 方法B

$(U_i,V_i)$ を $[0,1]^2$ 上の一様乱数として

$$
\widehat I_B
=\frac1n\sum_{i=1}^n\boldsymbol{1}_{\{V_i\le U_i^2\}}.
$$

1. 両推定量が不偏であることを示せ。
2. 両者の分散を求めよ。
3. どちらが効率的か、1回当たり分散で比較せよ。

## 詳細解答

### 1. 不偏性

方法Aでは $U\sim U(0,1)$ なので

$$
E[U^2]
=\int_0^1u^2du
=\frac13
=I.
$$

標本平均の期待値は各項の期待値に等しいから

$$
\boxed{E[\widehat I_A]=I}.
$$

方法Bでは

$$
B=\boldsymbol{1}_{\{V\le U^2\}}
$$

と置く。指示変数の期待値は事象の確率なので

$$
E[B]=P(V\le U^2).
$$

$U=u$ を固定すると $V\sim U(0,1)$ だから

$$
P(V\le u^2\mid U=u)=u^2.
$$

全期待値を取ると

$$
\begin{aligned}
P(V\le U^2)
&=E\{P(V\le U^2\mid U)\}\\
&=E[U^2]\\
&=\frac13.
\end{aligned}
$$

これは単位正方形内で曲線 $v=u^2$ の下側の面積

$$
\int_0^1u^2du
$$

に等しい。従って

$$
\boxed{E[\widehat I_B]=I}.
$$

### 2. 分散

方法Aでは

$$
E[U^4]=\int_0^1u^4du=\frac15.
$$

したがって

$$
\operatorname{Var}(U^2)
=E[U^4]-E[U^2]^2
=\frac15-\frac19
=\frac4{45}.
$$

独立同分布な $n$ 個の平均なので

$$
\boxed{
\operatorname{Var}(\widehat I_A)
=\frac1n\operatorname{Var}(U^2)
=\frac4{45n}
}.
$$

方法Bでは $B$ は成功確率

$$
p=P(V\le U^2)=\frac13
$$

のベルヌーイ分布に従う。したがって

$$
\operatorname{Var}(B)
=p(1-p)
=\frac13\frac23
=\frac29.
$$

よって

$$
\boxed{
\operatorname{Var}(\widehat I_B)
=\frac2{9n}
}.
$$

### 3. 効率比較

同じ $n$ に対して分散比を取ると

$$
\frac{\operatorname{Var}(\widehat I_B)}
{\operatorname{Var}(\widehat I_A)}
=\frac{2/9}{4/45}
=\boxed{\frac52}.
$$

したがって方法Bの分散は方法Aの2.5倍であり、方法Aの方が効率的である。

理由は、方法Aが $U^2$ という連続した数値情報をそのまま使うのに対し、方法Bは $(U,V)$ の情報を「曲線の下に入ったか否か」という0か1の情報へ圧縮しているからである。同じ積分を推定できても、期待値表示の作り方によってMonte Carlo分散は大きく異なる。

## 本番答案

方法Aは

$$
E[U^2]=\frac13,
\qquad
E[U^4]=\frac15
$$

より

$$
\operatorname{Var}(\widehat I_A)
=\frac1n\left(\frac15-\frac19\right)
=\frac4{45n}.
$$

方法Bの指示変数は

$$
P(V\le U^2)
=E[P(V\le U^2\mid U)]
=E[U^2]
=\frac13
$$

よりベルヌーイ$(1/3)$。従って

$$
\operatorname{Var}(\widehat I_B)
=\frac1n\frac13\frac23
=\frac2{9n}.
$$

両者は不偏で、分散比は

$$
\frac{2/9}{4/45}=\frac52.
$$

よって方法Aの方が効率的。

## 採点基準

- 方法Aの不偏性: 3点
- 方法Bの条件付き確率・不偏性: 4点
- 方法Aの分散: 5点
- 方法Bの分散: 4点
- 分散比と効率の解釈: 4点
