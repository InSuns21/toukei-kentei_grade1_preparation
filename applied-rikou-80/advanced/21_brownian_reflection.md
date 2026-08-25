# Advanced 21 Brown運動・反射原理

- 安定ID: `RIKOU-ADVANCED-21`
- 80大問 No.: 21
- 演習価値: B
- 難度: S
- 目安時間: 25〜30分
- 電卓: $\Phi$ は式までで完答

## 問題

標準Brown運動 $B(t)$ を考える。$T>0,a>0$ とする。

1. $E[B(t)]$, $\operatorname{Var}(B(t))$, $\operatorname{Cov}(B(s),B(t))$ を求めよ。
2. $B(t)-B(s)$ の分布を述べよ。
3. $M_T=\max_{0\le t\le T}B(t)$ とし、反射原理から $P(M_T\ge a)=2P(B(T)\ge a)$ を述べよ。反射原理を使える条件も確認せよ。
4. これを標準正規CDF $\Phi$ で表せ。
5. 初到達時刻 $\tau_a=\inf\{t\ge0:B(t)=a\}$ について $P(\tau_a\le T)$ を表せ。

## 詳細解答

### 1・2. Brown運動の基本性質

標準Brown運動の定義から

$$
E[B(t)]=0,
\qquad
Var(B(t))=t.
$$

$s\le t$ とすると

$$
B(t)=B(s)+\{B(t)-B(s)\},
$$

増分 $B(t)-B(s)$ は $B(s)$ と独立で $N(0,t-s)$。したがって

$$
\begin{aligned}
Cov(B(s),B(t))
&=Cov(B(s),B(s))+0\\
&=s.
\end{aligned}
$$

よって一般に

$$
\boxed{Cov(B(s),B(t))=\min(s,t)}.
$$

また

$$
\boxed{B(t)-B(s)\sim N(0,t-s)}
$$

である。

### 3. Brown運動の反射原理

使うのは **Brown運動の反射原理**である。標準Brown運動が正の水準 $a>0$ に時刻 $T>0$ までに到達した経路について、最初の到達時刻以後を水準 $a$ で反射すると、終点が $a$ より下にある経路と $a$ より上にある経路を測度保存的に対応させる。その結果

$$
P(M_T\ge a)=2P(B(T)\ge a).
$$

本問は

- $B$ が**標準Brown運動**。
- $a>0$、$T>0$。
- Brown運動は連続経路を持つので、$M_T\ge a$ と「時刻 $T$ までに $a$ へ到達」が一致。

という適用条件を満たす。従って反射原理を使える。

### 4. 正規CDF表示

$B(T)\sim N(0,T)$ なので

$$
P(B(T)\ge a)
=1-\Phi\left(\frac a{\sqrt T}\right).
$$

よって

$$
\boxed{
P(M_T\ge a)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}
}.
$$

### 5. 初到達時刻

連続経路と $a>0$ から

$$
\{\tau_a\le T\}=\{M_T\ge a\}.
$$

したがって

$$
\boxed{
P(\tau_a\le T)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}
}.
$$

## 本番答案

標準Brown運動の独立正規増分から

$$
Cov(B(s),B(t))=\min(s,t),
\qquad B(t)-B(s)\sim N(0,t-s).
$$

$B$ は標準Brown運動、$a>0,T>0$、経路は連続なので **Brown運動の反射原理**を適用でき、

$$
P(M_T\ge a)=2P(B(T)\ge a)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}.
$$

連続性より $\{\tau_a\le T\}=\{M_T\ge a\}$ なので同じ式。

## 採点基準

- 基本モーメント: 5点
- 増分: 4点
- 反射原理名・条件確認: 5点
- CDF表示: 3点
- 初到達: 3点

25分経過時は反射原理の証明を長く書かず、「標準BM・$a>0,T>0$・連続経路」を条件確認として残す。
