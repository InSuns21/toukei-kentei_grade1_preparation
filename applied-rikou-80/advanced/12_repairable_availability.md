# Advanced 12 修理可能系・アベイラビリティ

- 安定ID: `RIKOU-ADVANCED-12`
- 80大問 No.: 12
- 演習価値: C
- 難度: A
- 目安時間: 20〜25分

## 問題

稼働状態Uから故障状態Dへ率 $\lambda$、DからUへ修理率 $\mu$ で遷移する2状態連続時間Markov系を考える。

1. 定常稼働確率 $A$ を求めよ。
2. 平均故障時間と平均修復時間を用いて同じ式を書け。
3. 長期ダウンタイム比率を求めよ。
4. 長期1時間あたりの故障発生頻度を求めよ。
5. $\lambda=1/100$, $\mu=1/5$ のとき可用率と故障頻度を求めよ。
6. 信頼度と可用率の違いを説明せよ。

## 詳細解答

### 1. 定常稼働確率

状態U,Dの定常確率をそれぞれ $\pi_U,\pi_D$ とする。

定常状態ではUからDへ流れる長期平均流量と、DからUへ戻る長期平均流量が等しい。

$$
\pi_U\lambda=\pi_D\mu.
$$

また確率の総和は

$$
\pi_U+\pi_D=1.
$$

流量平衡から

$$
\pi_D=\frac{\lambda}{\mu}\pi_U.
$$

これを正規化条件へ代入すると

$$
\pi_U+\frac{\lambda}{\mu}\pi_U=1.
$$

したがって

$$
\pi_U\frac{\lambda+\mu}{\mu}=1
$$

より

$$
\boxed{
A=\pi_U=\frac{\mu}{\lambda+\mu}
}.
$$

### 2. 平均故障時間・平均修復時間による表示

稼働状態Uでの滞在時間は率 $\lambda$ の指数分布だから、平均故障時間は

$$
\operatorname{MTTF}=\frac1\lambda.
$$

故障状態Dでの滞在時間は率 $\mu$ の指数分布だから、平均修復時間は

$$
\operatorname{MTTR}=\frac1\mu.
$$

1サイクルを「稼働してから故障し、修理されるまで」と見ると、平均サイクル長は

$$
\frac1\lambda+\frac1\mu.
$$

そのうち平均稼働時間は $1/\lambda$ なので、長期稼働割合は

$$
\begin{aligned}
A
&=\frac{1/\lambda}{1/\lambda+1/\mu}\\
&=\frac{\mu}{\lambda+\mu}.
\end{aligned}
$$

したがって

$$
\boxed{
A
=\frac{\operatorname{MTTF}}
{\operatorname{MTTF}+\operatorname{MTTR}}
}.
$$

### 3. 長期ダウンタイム比率

定常確率の総和が1だから

$$
\pi_D=1-\pi_U.
$$

よって

$$
\boxed{
\pi_D
=1-\frac{\mu}{\lambda+\mu}
=\frac{\lambda}{\lambda+\mu}
}.
$$

### 4. 長期故障発生頻度

ここでは故障率 $\lambda$ と長期故障発生頻度を区別する。

$\lambda$ は「現在稼働中である」という条件の下で、単位時間あたりに故障する率である。一方、系は故障状態Dにいる間には新しいU→D故障を起こさない。

長期的に系がUにいる割合は $\pi_U$ なので、単位時間あたりのU→D遷移回数は

$$
\boxed{
\nu_{UD}=\pi_U\lambda
=\frac{\lambda\mu}{\lambda+\mu}
}.
$$

定常流量平衡より、これはD→Uの修理完了頻度 $\pi_D\mu$ とも等しい。

### 5. 数値例

$$
\lambda=\frac1{100},
\qquad
\mu=\frac15.
$$

可用率は

$$
\begin{aligned}
A
&=\frac{1/5}{1/100+1/5}\\
&=\frac{20/100}{21/100}\\
&=\boxed{\frac{20}{21}}.
\end{aligned}
$$

長期故障頻度は

$$
\begin{aligned}
\nu_{UD}
&=A\lambda\\
&=\frac{20}{21}\frac1{100}\\
&=\boxed{\frac1{105}\ \text{回/時}}.
\end{aligned}
$$

### 6. 信頼度と可用率の違い

信頼度は、時刻0で正常に動き始めた機器が、修理を考えずに時刻 $t$ まで一度も故障していない確率である。本問の稼働時間が指数分布なら

$$
R(t)=P(T>t)=e^{-\lambda t}.
$$

これに対して可用率は、故障後の修理も含む長期運用の中で「ある時点で稼働している割合」である。

したがって修理率 $\mu$ は可用率には影響するが、最初の故障までを測る信頼度 $R(t)$ には入らない。

## 本番答案

定常流量平衡

$$
\pi_U\lambda=\pi_D\mu,
\qquad
\pi_U+\pi_D=1
$$

より

$$
A=\pi_U=\frac{\mu}{\lambda+\mu},
\qquad
\pi_D=\frac{\lambda}{\lambda+\mu}.
$$

また

$$
\operatorname{MTTF}=1/\lambda,
\qquad
\operatorname{MTTR}=1/\mu
$$

なので

$$
A=\frac{\operatorname{MTTF}}
{\operatorname{MTTF}+\operatorname{MTTR}}.
$$

長期故障頻度は、稼働中の割合を掛けて

$$
\pi_U\lambda
=\frac{\lambda\mu}{\lambda+\mu}.
$$

数値例では

$$
A=\frac{20}{21},
\qquad
\nu_{UD}=\frac1{105}\ \text{回/時}.
$$

信頼度は修理なしの無故障継続確率、可用率は修理を含む長期稼働割合である。

## 採点基準

- 定常流量平衡から可用率を導出: 5点
- 平均故障時間・平均修復時間との対応: 3点
- ダウンタイム比率: 2点
- 故障率と長期故障頻度を区別して導出: 4点
- 数値計算: 3点
- 信頼度と可用率の区別: 3点

20分経過時は状態滞在確率×遷移率でイベント頻度を出す。
