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
4. これを標準正規累積分布関数 $\Phi$ で表せ。
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

使うのは **Brown運動の反射原理**である。標準Brown運動が正の水準 $a>0$ に時刻 $T>0$ までに到達した経路を考える。最初に $a$ に到達した時刻以後の増分の符号を反転すると、終点が $a$ より下にある経路と、終点が $a$ より上にある経路が一対一に対応する。

Brown運動の増分は0を中心とする正規分布で左右対称なので、符号を反転した後の増分も元と同じ分布を持つ。この対称性から

$$
P(M_T\ge a)=2P(B(T)\ge a).
$$

本問は

- $B$ が**標準Brown運動**。
- $a>0$、$T>0$。
- Brown運動は連続経路を持つので、$M_T\ge a$ と「時刻 $T$ までに $a$ へ到達」が一致。
- 到達後の増分は独立で、正規分布の対称性により反射後も同じ分布になる。

という適用条件を満たす。従って反射原理を使える。

### 4. 正規累積分布関数表示

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

$B$ は標準Brown運動、$a>0,T>0$、経路は連続で、到達後の増分の符号反転後も対称性により同じ分布を持つ。よって **Brown運動の反射原理**から

$$
P(M_T\ge a)=2P(B(T)\ge a)
=2\left\{1-\Phi\left(\frac a{\sqrt T}\right)\right\}.
$$

連続性より $\{\tau_a\le T\}=\{M_T\ge a\}$ なので同じ式。

## 採点基準

- 基本モーメント: 5点
- 増分: 4点
- 反射原理名・条件確認: 5点
- 累積分布関数表示: 3点
- 初到達: 3点

25分経過時は反射原理の証明を長く書かず、「標準ブラウン運動・$a>0,T>0$・連続経路・増分の対称性」を条件確認として残す。
