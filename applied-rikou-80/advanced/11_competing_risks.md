# Advanced 11 競合リスク・複数故障モード

- 安定ID: `RIKOU-ADVANCED-11`
- 80大問 No.: 11
- 演習価値: B
- 難度: A
- 目安時間: 25〜30分
- 電卓: 指数関数の数値化不要

## 問題

独立な故障モード寿命 $T_1\sim\operatorname{Exp}(\lambda_1)$, $T_2\sim\operatorname{Exp}(\lambda_2)$ とし、観測寿命を $T=\min(T_1,T_2)$、故障原因を $J$ とする。

1. $T$ の分布を求めよ。
2. $P(J=1)$ を求めよ。
3. 原因1による累積発生確率 $P(T\le t,J=1)$ を求めよ。
4. $T$ と $J$ が独立か確認せよ。
5. 競合モードを無視して原因1だけを通常の生存分析で扱う危険を説明せよ。

## 詳細解答

### 1. 観測寿命 $T$ の分布

観測寿命は

$$
T=\min(T_1,T_2)
$$

なので、時刻 $t$ を越えて観測寿命が続くためには両故障モードがともに $t$ を越えていなければならない。

$$
\{T>t\}=\{T_1>t,T_2>t\}.
$$

$T_1,T_2$ は独立だから

$$
\begin{aligned}
P(T>t)
&=P(T_1>t)P(T_2>t)\\
&=e^{-\lambda_1t}e^{-\lambda_2t}\\
&=e^{-(\lambda_1+\lambda_2)t}.
\end{aligned}
$$

これは率 $\lambda_1+\lambda_2$ の指数分布の生存関数である。従って

$$
\boxed{T\sim\operatorname{Exponential}(\lambda_1+\lambda_2)}.
$$

### 2. 原因1が最初の故障原因となる確率

$J=1$ は $T_1<T_2$ と同値である。原因1が時刻 $u$ で故障し、その時点まで原因2が故障していない確率密度を積分する。

原因1の密度は

$$
f_1(u)=\lambda_1e^{-\lambda_1u},
$$

原因2の生存確率は

$$
P(T_2>u)=e^{-\lambda_2u}.
$$

独立性から

$$
\begin{aligned}
P(J=1)
&=\int_0^\infty
f_1(u)P(T_2>u)du\\
&=\int_0^\infty
\lambda_1e^{-(\lambda_1+\lambda_2)u}du\\
&=\lambda_1\frac1{\lambda_1+\lambda_2}.
\end{aligned}
$$

従って

$$
\boxed{
P(J=1)=\frac{\lambda_1}{\lambda_1+\lambda_2}
}.
$$

同様に

$$
P(J=2)=\frac{\lambda_2}{\lambda_1+\lambda_2}.
$$

### 3. 原因1による累積発生確率

求めるのは

$$
P(T\le t,J=1)
$$

である。これは「時刻 $u\le t$ で原因1が最初に発生する」密度を0から $t$ まで積分すればよい。

原因1による最初の故障時刻の密度は

$$
\lambda_1e^{-\lambda_1u}e^{-\lambda_2u}
=\lambda_1e^{-(\lambda_1+\lambda_2)u}.
$$

従って

$$
\begin{aligned}
P(T\le t,J=1)
&=\int_0^t
\lambda_1e^{-(\lambda_1+\lambda_2)u}du\\
&=\frac{\lambda_1}{\lambda_1+\lambda_2}
\left(1-e^{-(\lambda_1+\lambda_2)t}\right).
\end{aligned}
$$

よって

$$
\boxed{
P(T\le t,J=1)
=\frac{\lambda_1}{\lambda_1+\lambda_2}
\left\{1-e^{-(\lambda_1+\lambda_2)t}\right\}
}.
$$

ここで $1-e^{-\lambda_1t}$ としてはいけない。他の故障原因が先に発生すると、原因1は観測上の最初の故障原因にはなれないからである。

### 4. $T$ と $J$ の独立性

連続時間なので $P(J=1\mid T=t)$ は厳密には条件付き密度の比として考える。

原因1で時刻 $t$ に最初の故障が起きる同時密度は

$$
f_{T,J}(t,1)
=\lambda_1e^{-(\lambda_1+\lambda_2)t}.
$$

一方、$T$ の密度は第1問から

$$
f_T(t)
=(\lambda_1+\lambda_2)e^{-(\lambda_1+\lambda_2)t}.
$$

従って

$$
\begin{aligned}
P(J=1\mid T=t)
&=\frac{f_{T,J}(t,1)}{f_T(t)}\\
&=\frac{\lambda_1}{\lambda_1+\lambda_2}.
\end{aligned}
$$

これは $t$ に依存せず、第2問で求めた周辺確率 $P(J=1)$ と一致する。

$$
P(J=1\mid T=t)=P(J=1).
$$

原因2についても同様なので、本問の**独立な指数競合モデルでは**

$$
\boxed{T\perp J}.
$$

これは一般の競合リスクで常に成り立つ性質ではなく、各原因別ハザードが一定の指数モデルだから得られる特殊な結果である。

### 5. 他原因故障を単純な右打ち切りとして扱う危険

原因1だけを見たいからといって、原因2で故障した個体を「原因1については単なる右打ち切り」とみなし、通常のKaplan–Meier推定量で

$$
P(T_1>t)
$$

のような量を推定すると、競合原因が存在しなかった仮想世界の原因1故障確率を扱うことになる。

しかし実際に知りたい原因1の累積発生確率は

$$
P(T\le t,J=1)
$$

であり、本問では

$$
\frac{\lambda_1}{\lambda_1+\lambda_2}
\left(1-e^{-(\lambda_1+\lambda_2)t}\right).
$$

他原因故障が起きた個体は、その後原因1で「最初に」故障する可能性を失う。したがって競合故障を独立な通常打ち切りと同じように除外すると、原因1の実際の累積発生確率を過大評価しうる。

重要なのは

$$
\boxed{
\text{原因別潜在寿命の分布}
\neq
\text{競合下で観測される原因別累積発生確率}
}
$$

という区別である。

## 本番答案

$$
T=\min(T_1,T_2)
$$

なので独立性より

$$
P(T>t)
=e^{-\lambda_1t}e^{-\lambda_2t}
=e^{-(\lambda_1+\lambda_2)t},
$$

従って

$$
T\sim\operatorname{Exponential}(\lambda_1+\lambda_2).
$$

原因1確率は

$$
\begin{aligned}
P(J=1)
&=\int_0^\infty
\lambda_1e^{-\lambda_1u}e^{-\lambda_2u}du\\
&=\frac{\lambda_1}{\lambda_1+\lambda_2}.
\end{aligned}
$$

累積発生確率は積分上限を $t$ にして

$$
P(T\le t,J=1)
=\frac{\lambda_1}{\lambda_1+\lambda_2}
\left(1-e^{-(\lambda_1+\lambda_2)t}\right).
$$

また

$$
\frac{f_{T,J}(t,1)}{f_T(t)}
=\frac{\lambda_1}{\lambda_1+\lambda_2}
=P(J=1),
$$

なので本モデルでは $T$ と $J$ は独立。

他原因故障を通常の右打ち切りとしてKaplan–Meier法に入れると、競合下の原因別累積発生確率ではなく、競合原因を除いた仮想的な量を推定し、実際の累積発生を過大評価しうる。

## 採点基準

- 最小寿命の生存事象を独立性で分解し分布を同定: 4点
- 原因1確率を密度×他原因生存確率で積分: 4点
- 累積発生確率を0から $t$ の積分で導出: 5点
- 同時密度と周辺密度の比から独立性を確認: 4点
- 潜在寿命と競合下累積発生の違いを説明: 3点

25分経過時は「最小寿命」「原因別累積発生」「通常打ち切りとの違い」を混同しない。
