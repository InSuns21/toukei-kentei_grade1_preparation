# Advanced 76 マルコフ連鎖Monte Carlo法・詳細釣り合い

- 安定ID: `RIKOU-ADVANCED-76`
- 80大問 No.: 76
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分

## 問題

状態空間 $\{1,2,3\}$、目標分布

$$
\pi=(1/6,1/3,1/2)
$$

とする。対称提案で他の2状態から一様に候補を選ぶMetropolis法を考える。

1. 受理確率を一般式で書け。
2. 1から3への受理確率、3から1への受理確率を求めよ。
3. $\pi_iP_{ij}=\pi_jP_{ji}$ が成り立つことを1↔3で確認せよ。
4. 詳細釣り合いが定常分布を保証する理由を述べよ。
5. マルコフ連鎖Monte Carlo標本平均で推定するとき、独立標本より分散が大きくなりやすい理由を述べよ。

## 詳細解答

### 1. Metropolis法の受理確率

現在状態を $i$、候補状態を $j$ とする。一般の Metropolis–Hastings 法では提案確率を $q(i,j)$ とすると

$$
\alpha(i,j)
=\min\left\{
1,
\frac{\pi_jq(j,i)}{\pi_iq(i,j)}
\right\}.
$$

本問では「現在状態以外の2状態から一様に選ぶ」ので

$$
q(i,j)=\frac12,
\qquad i\ne j.
$$

提案は対称で

$$
q(i,j)=q(j,i)
$$

だから提案確率が約分される。したがって

$$
\boxed{
\alpha(i,j)
=\min\left\{1,\frac{\pi_j}{\pi_i}\right\}
}.
$$

### 2. 1→3 と 3→1 の受理確率

目標確率は

$$
\pi_1=\frac16,
\qquad
\pi_3=\frac12.
$$

1から3へは

$$
\frac{\pi_3}{\pi_1}
=\frac{1/2}{1/6}=3>1
$$

なので

$$
\boxed{\alpha(1,3)=1}.
$$

逆に3から1へは

$$
\frac{\pi_1}{\pi_3}
=\frac{1/6}{1/2}
=\frac13
$$

だから

$$
\boxed{\alpha(3,1)=\frac13}.
$$

確率の大きい状態へ移る提案は必ず受理され、確率の小さい状態へ戻る提案は一部だけ受理される。

### 3. 1↔3 で詳細釣り合いを確認する

ここで受理確率 $\alpha(i,j)$ と実際の遷移確率 $P_{ij}$ を区別する。

$i\ne j$ では

$$
P_{ij}=q(i,j)\alpha(i,j).
$$

従って

$$
P_{13}=\frac12\cdot1=\frac12.
$$

一方

$$
P_{31}=\frac12\cdot\frac13=\frac16.
$$

目標分布で重み付けすると

$$
\pi_1P_{13}
=\frac16\frac12
=\frac1{12},
$$

$$
\pi_3P_{31}
=\frac12\frac16
=\frac1{12}.
$$

したがって

$$
\boxed{
\pi_1P_{13}=\pi_3P_{31}
}.
$$

これが1↔3間の詳細釣り合いである。

### 4. 詳細釣り合いから定常性が従う理由

詳細釣り合いが全ての $i,j$ について

$$
\pi_iP_{ij}=\pi_jP_{ji}
$$

と成り立つとする。

ある状態 $j$ への1ステップ後の確率は

$$
\sum_i\pi_iP_{ij}.
$$

詳細釣り合いを使うと

$$
\sum_i\pi_iP_{ij}
=\sum_i\pi_jP_{ji}.
$$

$\pi_j$ は $i$ に依存しないので

$$
\sum_i\pi_jP_{ji}
=\pi_j\sum_iP_{ji}.
$$

ここで $P_{ji}$ は「現在状態 $j$ から次状態 $i$ へ行く確率」なので、行和は

$$
\sum_iP_{ji}=1.
$$

したがって

$$
\boxed{
\sum_i\pi_iP_{ij}=\pi_j
}.
$$

つまり $\pi$ から出発すると1ステップ後も $\pi$ のままであり、$\pi$ は定常分布である。

詳細釣り合いは定常性の十分条件であり、定常性そのものより強い条件である。

### 5. なぜ独立標本より分散が大きくなりやすいか

目標分布 $\pi$ に従う独立標本 $X_1,\ldots,X_n$ なら、関数 $h$ の標本平均

$$
\bar h_n=\frac1n\sum_{t=1}^nh(X_t)
$$

の分散は

$$
\operatorname{Var}(\bar h_n)
=\frac{\gamma_0}{n},
$$

ここで

$$
\gamma_0=\operatorname{Var}_\pi\{h(X)\}.
$$

マルコフ連鎖では隣接する標本が独立でない。定常連鎖なら

$$
\operatorname{Var}(\bar h_n)
=\frac1{n^2}
\left[
 n\gamma_0
+2\sum_{k=1}^{n-1}(n-k)\gamma_k
\right],
$$

ここで

$$
\gamma_k
=\operatorname{Cov}_\pi\{h(X_t),h(X_{t+k})\}.
$$

正の自己相関が多いと $\gamma_k>0$ の項が加わるため、独立標本の $\gamma_0/n$ より分散が大きくなる。

大標本では自己相関係数

$$
\rho_k=\frac{\gamma_k}{\gamma_0}
$$

を使って概ね

$$
\operatorname{Var}(\bar h_n)
\approx
\frac{\gamma_0}{n}
\left(1+2\sum_{k=1}^{\infty}\rho_k\right)
$$

となる。括弧内を自己相関による分散増加係数と見れば、有効標本サイズは

$$
n_{\mathrm{eff}}
\approx
\frac{n}{1+2\sum_{k\ge1}\rho_k}
$$

と考えられる。

したがって「1000回生成したから独立な1000標本と同じ精度」とは限らない。

## 本番答案

一般に

$$
\alpha(i,j)
=\min\left\{1,
\frac{\pi_jq(j,i)}{\pi_iq(i,j)}
\right\}.
$$

本問では $q(i,j)=q(j,i)=1/2$ なので

$$
\alpha(i,j)
=\min\left\{1,\frac{\pi_j}{\pi_i}\right\}.
$$

従って

$$
\alpha(1,3)=1,
\qquad
\alpha(3,1)=1/3.
$$

実際の遷移確率は

$$
P_{13}=\frac12,
\qquad
P_{31}=\frac16
$$

だから

$$
\pi_1P_{13}
=\frac16\frac12
=\frac1{12}
=\frac12\frac16
=\pi_3P_{31}.
$$

詳細釣り合いを全 $i$ で和を取れば

$$
\sum_i\pi_iP_{ij}
=\sum_i\pi_jP_{ji}
=\pi_j,
$$

よって $\pi$ は定常分布。

マルコフ連鎖標本には自己相関があり

$$
\operatorname{Var}(\bar h_n)
=\frac1{n^2}
\left[n\gamma_0+2\sum_{k=1}^{n-1}(n-k)\gamma_k\right]
$$

となるため、正の自己相関があると独立標本より分散が大きい。

## 採点基準

- 一般受理率から対称提案へ簡約: 4点
- 1→3, 3→1 の受理率: 3点
- 提案確率を含む遷移確率・詳細釣り合い: 5点
- 詳細釣り合いから定常性を総和で導出: 4点
- 自己相関と標本平均分散: 4点

25分経過時は受理確率と遷移確率を混同しない。
