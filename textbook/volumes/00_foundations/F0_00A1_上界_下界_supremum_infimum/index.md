# F0-00A1 補講：上界・下界・supremum・infimum

この講義では「集合が値を実際に取るか」と「そこより先へ行けない境界値があるか」を分離します。

$$
\boxed{\text{sup/infは境界値}\qquad\text{max/minは達成値}}
$$

この区別が、後の最適化で「まずinfimumを定義し、その達成を別に証明する」という流れになります。

---

## 1. 上界・下界

実数集合 $A\subset\mathbb R$ を考えます。

$M$ が上界であるとは

$$
x\le M
\qquad(\forall x\in A)
$$

となることです。

$m$ が下界であるとは

$$
m\le x
\qquad(\forall x\in A)
$$

となることです。

例えば

$$
A=(0,1)
$$

では $1,2,100$ はすべて上界です。

---

## 2. supremum と infimum

上界全体の中で最小のものを **上限** といい

$$
\sup A
$$

と書きます。

下界全体の中で最大のものを **下限** といい

$$
\inf A
$$

と書きます。

### 2.1 maximum / minimumとの違い

$$
A=(0,1)
$$

では

$$
\sup A=1,
\qquad
\inf A=0
$$

ですが、$0,1\notin A$ なので maximum も minimum も存在しません。

一方

$$
B=[0,1]
$$

では

$$
\min B=\inf B=0,
\qquad
\max B=\sup B=1.
$$

つまり

> infimum は「これより下には行けない境界値」であり、実際にその値を取る点が存在するとは限らない。

という区別が重要です。

---

## 3. 最適化でなぜ infimum から始めるのか

集合 $C$ 上で関数 $f$ を最小化するとき

$$
\inf_{x\in C}f(x)
$$

は、最小点が存在するか分からなくても定義できます。

例えば

$$
C=(0,1),
\qquad
f(x)=x
$$

なら

$$
\inf_{x\in C}f(x)=0
$$

ですが、$f(x)=0$ を達成する $x\in C$ はありません。

したがって最適化では

$$
\boxed{
\text{まず infimum を定義する}
\to
\text{その値を達成する点が存在するか調べる}
}
$$

という順番になります。

F0-02Bの閉凸集合への射影でも、まず

$$
\delta=\inf_{x\in C}\|z-x\|
$$

と置き、コンパクト性を使って「この下限を達成する点がある」ことを示します。

---

## 4. 演習

### F0-00A1-A01 supとmaxを区別する

- Level: A
- 目安時間: 8分

$A=(0,1]$ について $\sup A,\inf A,\max A,\min A$ を求め、存在しないものを明記せよ。

<!-- solution-start -->
#### 詳細解答
上端1は集合に含まれるので $\sup A=\max A=1$。下端0は集合に含まれないので $\inf A=0$ だが最小値は存在しない。

#### 本番答案
$$
\sup A=1,\quad\max A=1,\quad\inf A=0,
$$
$\min A$ は存在しない。

#### 採点基準（20点）
- supremum: 5点
- maximum: 5点
- infimum: 5点
- minimum不存在と理由: 5点
<!-- solution-end -->

### F0-00A1-B01 infimumはあるが最小点がない

- Level: B
- 目安時間: 12分

$C=(0,\infty)$ 上で $f(x)=x^2$ を考える。$\inf_{x\in C}f(x)$ を求め、その値を達成する最小点が存在するか判定せよ。

<!-- solution-start -->
#### 詳細解答
$f(x)>0$ なので0は下界。任意の $\varepsilon>0$ に対し $x<\sqrt\varepsilon$ となる正の $x$ を選べば $f(x)<\varepsilon$。よって
$$
\inf_{x\in C}x^2=0.
$$
しかし $x=0\notin C$ なので値0は達成されず、最小点は存在しない。

#### 本番答案
$$
\boxed{\inf_{x>0}x^2=0}
$$
だが0を達成するには $x=0$ が必要で $0\notin C$。したがってminimumは存在しない。

#### 採点基準（20点）
- 0が下界: 5点
- 下限であること: 7点
- 非達成の説明: 6点
- 結論: 2点
<!-- solution-end -->

---

<!-- exercise-density-supplement-20260912 -->

### F0-00A1-A02 開区間の上限・下限

- Level: A
- 目安時間: 7分

$A=(-3,5)$ について $\sup A,\inf A$ を求め、それぞれの値が $A$ の元として達成されるか判定せよ。

<!-- solution-start -->
#### 詳細解答
5は $A$ の上界であり、5より小さい数 $M<5$ は $M$ と5の間の点を $A$ に持つので上界ではない。従って $\sup A=5$。同様に $\inf A=-3$。ただし端点 $-3,5$ は $A$ に含まれないので、どちらの値も $A$ の元としては達成されない。

#### 本番答案
$$
\boxed{\sup A=5,\quad \inf A=-3},
$$
$5,-3$ はともに $A$ に属さないため、上限・下限はいずれも集合内では達成されない。
<!-- solution-end -->

### F0-00A1-A03 値域の上限を求める

- Level: A
- 目安時間: 8分

$A=[-2,3]$ とし $B=\{2x+1:x\in A\}$ とする。$\sup B,\inf B$ を求めよ。

<!-- solution-start -->
#### 詳細解答
$x\in[-2,3]$ なら
$$
-3\le2x+1\le7.
$$
端点 $x=-2,3$ が集合に含まれるので両端値は実際に達成される。従って
$$
\inf B=-3,\qquad \sup B=7.
$$

#### 本番答案
$$
\boxed{\inf B=-3,\quad\sup B=7}.
$$
<!-- solution-end -->

### F0-00A1-B02 平行移動とsupremum

- Level: B
- 目安時間: 12分

空でなく上に有界な $A\subseteq\mathbb R$ と $c\in\mathbb R$ に対し
$$
A+c:=\{a+c:a\in A\}
$$
と置く。$\sup(A+c)=\sup A+c$ を上限の定義から示せ。

<!-- solution-start -->
#### 詳細解答
$s=\sup A$ とする。任意の $a\in A$ について $a\le s$ だから $a+c\le s+c$。従って $s+c$ は $A+c$ の上界である。

次に $u<s+c$ とする。すると $u-c<s$。$s$ は最小上界なので $u-c$ は $A$ の上界ではない。従ってある $a\in A$ が存在して
$$
u-c<a,
$$
すなわち $u<a+c$。よって $u$ は $A+c$ の上界ではない。従って $s+c$ が最小上界である。

#### 本番答案
$s=\sup A$ と置く。$a\le s$ より $a+c\le s+c$ なので $s+c$ は上界。さらに $u<s+c$ なら $u-c<s$ だから、ある $a\in A$ で $u-c<a$、従って $u<a+c$。よって $u$ は上界でない。ゆえに
$$
\boxed{\sup(A+c)=\sup A+c}.
$$
<!-- solution-end -->

---

<!-- exercise-density-standard-supplement-20260912 -->

### F0-00A1-A04 上限は集合に属するとは限らない

- Level: A
- 目安時間: 8分

$$
A=\left\{1-\frac1n:n\in\mathbb N\right\}
$$
について $\sup A$ を求め、それが $A$ に属するか判定せよ。

<!-- solution-start -->
#### 詳細解答
各 $n$ で $1-1/n<1$ なので1は上界である。一方 $u<1$ とすると $1-u>0$。十分大きい $n$ で $1/n<1-u$ とでき、そのとき
$$
u<1-\frac1n\in A.
$$
従って $u$ は上界でない。よって $\sup A=1$。しかし $1-1/n=1$ となる自然数 $n$ は存在しないので $1\notin A$。

#### 本番答案
$$
\boxed{\sup A=1},\qquad 1\notin A.
$$
<!-- solution-end -->

### F0-00A1-B03 二集合の和集合の上限

- Level: B
- 目安時間: 12分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対して
$$
\sup(A\cup B)=\max\{\sup A,\sup B\}
$$
を示せ。

<!-- solution-start -->
#### 詳細解答
$s=\sup A$, $t=\sup B$, $M=\max\{s,t\}$ とする。$a\in A$ なら $a\le s\le M$、$b\in B$ なら $b\le t\le M$ なので $M$ は $A\cup B$ の上界。

一方 $u<M$ とする。$M=s$ なら $u<s$ なので $u$ は $A$ の上界でなく、ある $a\in A$ が $u<a$ を満たす。従って $u$ は $A\cup B$ の上界でもない。$M=t$ の場合も同様。よって $M$ が最小上界。

#### 本番答案
$M=\max\{\sup A,\sup B\}$ は両集合を上から抑える。$u<M$ なら $M$ を与えた側の集合で $u$ より大きい元があるので上界になれない。従って主張が従う。
<!-- solution-end -->

### F0-00A1-C01 集合の和 $A+B$ の上限

- Level: C
- 目安時間: 18分

空でなく上に有界な $A,B\subseteq\mathbb R$ に対し
$$
A+B:=\{a+b:a\in A,\ b\in B\}
$$
と置く。次を証明せよ。
$$
\sup(A+B)=\sup A+\sup B.
$$

<!-- solution-start -->
#### 詳細解答
$s=\sup A$, $t=\sup B$ とする。任意の $a\in A,b\in B$ で $a\le s,b\le t$ だから $a+b\le s+t$。従って $s+t$ は上界。

任意の $\varepsilon>0$ を取る。$s-\varepsilon/2$ は $A$ の上界でないので、ある $a\in A$ が
$$
s-\frac\varepsilon2<a\le s
$$
を満たす。同様にある $b\in B$ が
$$
t-\frac\varepsilon2<b\le t
$$
を満たす。従って
$$
s+t-\varepsilon<a+b\in A+B.
$$
よって $s+t$ より小さい数は $A+B$ の上界になれない。従って $s+t$ が最小上界。

#### 本番答案
$s+t$ は上界。さらに任意の $\varepsilon>0$ に対し $a>s-\varepsilon/2$, $b>t-\varepsilon/2$ を取れば $a+b>s+t-\varepsilon$。よって
$$
\boxed{\sup(A+B)=s+t}.
$$
<!-- solution-end -->

---

## 5. 次に進む

次は、有限回の構成では済まない「任意の集合族から選ぶ」という存在問題を扱います。

**次：[F0-00A2 選択関数・選択公理・可算選択](../F0_00A2_選択公理_Zorn_極大原理/index.md)**
