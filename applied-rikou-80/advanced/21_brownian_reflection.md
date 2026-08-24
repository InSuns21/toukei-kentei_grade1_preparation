# Advanced 21 Brown運動・反射原理

- 安定ID: `RIKOU-ADVANCED-21`
- 80大問 No.: 21
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分
- 電卓: $\Phi$ は式までで完答

## 問題

標準Brown運動 $B(t)$ を考える。

1. $E[B(t)]$, $\operatorname{Var}(B(t))$, $\operatorname{Cov}(B(s),B(t))$ を求めよ。
2. $B(t)-B(s)$ の分布を述べよ。
3. $M_T=\max_{0\le t\le T}B(t)$ とし、反射原理から $P(M_T\ge a)=2P(B(T)\ge a)$ を述べよ。
4. これを標準正規CDF $\Phi$ で表せ。
5. 初到達時刻 $\tau_a$ について $P(\tau_a\le T)$ を表せ。

## 詳細解答

$$
E[B(t)]=0,\quad \operatorname{Var}(B(t))=t,
$$

$$
\operatorname{Cov}(B(s),B(t))=\min(s,t).
$$

$s<t$ なら増分は $N(0,t-s)$。反射原理より

$$
P(M_T\ge a)=2\left\{1-\Phi\left(\frac{a}{\sqrt T}\right)\right\}.
$$

$\{\tau_a\le T\}=\{M_T\ge a\}$ なので同じ式。

## 本番答案

共分散は $\min(s,t)$、独立増分は $N(0,t-s)$。反射原理から $P(M_T\ge a)=2\{1-\Phi(a/\sqrt T)\}$、これは $P(\tau_a\le T)$ と同じ。

## 採点基準

- 基本モーメント: 5点
- 増分: 4点
- 反射原理: 5点
- CDF表示: 3点
- 初到達: 3点

25分経過時は $\Phi$ の数値化をしない。
