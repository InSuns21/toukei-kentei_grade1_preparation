# STO2A：可算状態連鎖の再帰・訪問回数・不変測度

通常教材 [E2-01](../../05_engineering/E2_01_markov連鎖/index.md) では、有限状態 Markov 連鎖について遷移行列、定常分布、周期、吸収確率を計算しました。

本章ではその先へ進みます。状態空間を有限に限らず可算集合 $S$ とし、

- ある状態へ何度も戻るのか、
- 戻るまでの平均時間は有限か、
- 各状態への総訪問回数はどれくらいか、
- 不変確率分布はいつ現れるか、
- 遷移を逆向きに見ても釣り合う条件は何を保証するか

を、停止時刻と強 Markov 性を使って組み立てます。

[STO11](../STO11/index.md) の一般状態空間版へ進む前に、離散時間で「Markov 性から何が生まれるか」を手で追える形にしておくのが本章の役割です。

---

## 1. 可算状態の遷移則から始める

$S$ を有限または可算集合とし、

$$
p(i,j)\ge0,
\qquad
\sum_{j\in S}p(i,j)=1
$$

を満たす遷移確率 $p$ を固定します。

<a id="def-sto2a-markov"></a>

<!-- formal-statement-start -->
> **定義（時間一様 Markov 連鎖）**  
> $(X_n)_{n\ge0}$ を $S$ 値確率過程、$\mathcal F_n=\sigma(X_0,\ldots,X_n)$ を自然なフィルトレーションとする。全ての $n\ge0$, $j\in S$ に対し
>
$$
P(X_{n+1}=j\mid\mathcal F_n)
=
p(X_n,j)
\qquad\text{a.s.}
$$
>
> が成り立つとき、$(X_n)$ を遷移確率 $p$ を持つ時間一様 Markov 連鎖という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-markov -->
### 直接例：2状態を交互に動く Markov 連鎖

**定義の確認**

$S=\{0,1\}$ とし、
$$
p(0,1)=p(1,0)=1
$$
とします。$X_{n+1}=1-X_n$ と定めれば、$\mathcal F_n$ のもとで $X_n$ が分かると次状態は一意に決まるので
$$
P(X_{n+1}=j\mid\mathcal F_n)=p(X_n,j)
$$
が全ての $j\in S$ で成り立ちます。従ってこれは時間一様 Markov 連鎖です。
<!-- definition-example-end -->

右辺が「過去全部」ではなく現在状態 $X_n$ だけに依存するのが Markov 性です。

初期状態 $X_0=i$ のもとでの確率・期待値を $P_i,E_i$ と書きます。

$n$ 段階遷移確率を

$$
p^{(n)}(i,j)=P_i(X_n=j)
$$

とします。通常教材の Chapman--Kolmogorov は可算状態でも同じく

$$
p^{(m+n)}(i,j)
=
\sum_{k\in S}
p^{(m)}(i,k)p^{(n)}(k,j)
$$

です。

---

## 2. 到達時刻・帰還時刻

<a id="def-sto2a-hitting-return"></a>

<!-- formal-statement-start -->
> **定義（到達時刻・正の帰還時刻）**  
> $A\subset S$ に対し
>
$$
T_A=\inf\{n\ge0:X_n\in A\}
$$
>
> を $A$ への到達時刻とする。状態 $i\in S$ に対し
>
$$
T_i^+
=
\inf\{n\ge1:X_n=i\}
$$
>
> を $i$ への正の帰還時刻とする。空集合の infimum は $\infty$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-hitting-return -->
### 直接例：交互連鎖の到達時刻と帰還時刻

**定義の確認**

上の交互連鎖を $X_0=0$ から始め、$A=\{1\}$ とします。標本路は
$$
0,1,0,1,\ldots
$$
なので
$$
T_A=1,
\qquad
T_0^+=2.
$$
これは「最初に集合へ入る時刻」と「時刻1以後に初期状態へ戻る時刻」という二つの infimum の違いを直接示します。
<!-- definition-example-end -->

到達時刻が停止時刻であることを先に確認します。

<a id="prop-sto2a-hitting-stopping"></a>

<!-- formal-statement-start -->
> **命題（離散時間の到達時刻は停止時刻）**  
> 任意の $A\subset S$ に対し $T_A$ は自然なフィルトレーション $(\mathcal F_n)$ に関する停止時刻である。$T_i^+$ も停止時刻である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$$
\{T_A\le n\}
=
\bigcup_{m=0}^{n}\{X_m\in A\}.
$$

各 $\{X_m\in A\}$ は $\mathcal F_m\subset\mathcal F_n$ に属するので、有限和を取って

$$
\{T_A\le n\}\in\mathcal F_n.
$$

従って [停止時刻の定義](../STO1/index.md#def-sto1-stopping-time) を満たします。

$T_i^+$ についても

$$
\{T_i^+\le n\}
=
\bigcup_{m=1}^{n}\{X_m=i\}
\in\mathcal F_n.
$$
<!-- proof-end -->

---

## 3. 離散時間の強 Markov 性

決定論的時刻 $n$ で Markov 性が成立するだけでなく、「初めて $A$ に着いた時刻」のようなランダム時刻で再出発できます。

<a id="thm-sto2a-strong-markov"></a>

<!-- formal-statement-start -->
> **定理（可算状態離散時間 Markov 連鎖の強 Markov 性）**  
> $\tau$ を $(\mathcal F_n)$ に関する停止時刻とする。任意の $r\ge0$, $j\in S$ に対し、$\{\tau<\infty\}$ 上で
>
$$
P(X_{\tau+r}=j\mid\mathcal F_\tau)
=
p^{(r)}(X_\tau,j)
\qquad\text{a.s.}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

$\{\tau=m\}$ ごとに分ければ、ランダム時刻は普通の時刻 $m$ になります。停止時刻性により $\{\tau=m\}\in\mathcal F_m$ なので、その上では通常の Markov 性を使えます。

<!-- proof-start -->
### 証明

まず $r$ を固定します。$A\in\mathcal F_\tau$ を取り、有限時刻で止まる部分に分けます。

[停止時刻までの σ-代数](../STO1/index.md#def-sto1-stopping-sigma-field) の定義から

$$
A\cap\{\tau=m\}\in\mathcal F_m.
$$

従って Markov 性を $r$ 段階へ反復した式

$$
P(X_{m+r}=j\mid\mathcal F_m)
=
p^{(r)}(X_m,j)
$$

を使って

$$
\begin{aligned}
E[1_A1_{\{\tau=m\}}1_{\{X_{\tau+r}=j\}}]
&=
E[1_A1_{\{\tau=m\}}1_{\{X_{m+r}=j\}}]\\
&=
E[1_A1_{\{\tau=m\}}p^{(r)}(X_m,j)]\\
&=
E[1_A1_{\{\tau=m\}}p^{(r)}(X_\tau,j)].
\end{aligned}
$$

$m=0,1,2,\ldots$ について和を取ると

$$
E[1_A1_{\{\tau<\infty\}}1_{\{X_{\tau+r}=j\}}]
=
E[1_A1_{\{\tau<\infty\}}p^{(r)}(X_\tau,j)].
$$

これは条件付き期待値の定義そのものなので、結論を得ます。
<!-- proof-end -->

この定理が「帰ってくるたびに、現在状態から同じ確率法則でやり直せる」ことを保証します。

---

## 4. 再帰と過渡

<a id="def-sto2a-recurrence"></a>

<!-- formal-statement-start -->
> **定義（再帰状態・過渡状態）**  
> 状態 $i\in S$ について
>
$$
f_i=P_i(T_i^+<\infty)
$$
>
> とする。
>
> - $f_i=1$ のとき $i$ を再帰状態という。
> - $f_i<1$ のとき $i$ を過渡状態という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-recurrence -->
### 直接例：交互連鎖は再帰的

**定義の確認**

$X_0=0$ なら $T_0^+=2$ が確率1で成り立つので
$$
f_0=P_0(T_0^+<\infty)=1.
$$
同様に $f_1=1$ です。従って両状態とも定義どおり再帰状態です。
<!-- definition-example-end -->

再帰とは「一度は戻る確率が1」という定義ですが、強 Markov 性により実際には「無限回戻る」に昇格します。

<a id="prop-sto2a-infinite-returns"></a>

<!-- formal-statement-start -->
> **命題（再帰状態には無限回帰還する）**  
> $i$ が再帰的なら、$P_i$-確率1で $i$ を無限回訪問する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

最初の正の帰還時刻を $\tau_1=T_i^+$ とし、帰還後の次の帰還時刻を順に $\tau_2,\tau_3,\ldots$ とします。

$\tau_m<\infty$ の上で $X_{\tau_m}=i$ です。強 Markov 性から

$$
P_i(\tau_{m+1}<\infty\mid\mathcal F_{\tau_m})
=
P_i(T_i^+<\infty)
=
1.
$$

従って帰納的に全ての $m$ について $\tau_m<\infty$ が確率1で成り立ちます。

<!-- proof-end -->

---

## 5. 総訪問回数を遷移確率の足し上げで測る

<a id="def-sto2a-green-kernel"></a>

<!-- formal-statement-start -->
> **定義（Green 核）**  
> $i,j\in S$ に対し
>
$$
G(i,j)
=
\sum_{n=0}^{\infty}p^{(n)}(i,j)
$$
>
> を離散時間 Markov 連鎖の Green 核と呼ぶ。値 $\infty$ を許す。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-green-kernel -->
### 直接例：交互連鎖の Green 核

**定義の確認**

$0$ から始める交互連鎖では
$$
p^{(n)}(0,0)
=
\begin{cases}
1,&n\text{ が偶数},\\
0,&n\text{ が奇数}.
\end{cases}
$$
従って
$$
G(0,0)
=
\sum_{n=0}^{\infty}p^{(n)}(0,0)
=
\infty.
$$
Green 核が「期待総訪問回数」を数えることがこの例では目で見えます。
<!-- definition-example-end -->

<a id="prop-sto2a-green-visits"></a>

<!-- formal-statement-start -->
> **命題（Green 核と期待総訪問回数）**  
> 訪問回数
>
$$
N_j=\sum_{n=0}^{\infty}1_{\{X_n=j\}}
$$
>
> に対し
>
$$
E_i[N_j]=G(i,j).
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

非負項なので[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)を使えます。

$$
\begin{aligned}
E_i[N_j]
&=
E_i\left[
\sum_{n=0}^{\infty}1_{\{X_n=j\}}
\right]\\
&=
\sum_{n=0}^{\infty}P_i(X_n=j)\\
&=
\sum_{n=0}^{\infty}p^{(n)}(i,j)\\
&=
G(i,j).
\end{aligned}
$$
<!-- proof-end -->

---

## 6. 再帰性は Green 核が無限になることと同値

<a id="thm-sto2a-recurrence-green"></a>

<!-- formal-statement-start -->
> **定理（再帰性の Green 核判定）**  
> 状態 $i$ に対し
>
$$
i\text{ が再帰的}
\quad\Longleftrightarrow\quad
G(i,i)=\infty.
$$
>
> 過渡的なら
>
$$
G(i,i)=\frac{1}{1-f_i}<\infty.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$i$ への総訪問回数 $N_i$ は、時刻0の一回を含みます。

一度戻った後は強 Markov 性により、再び戻る確率がまた $f_i$ です。そのため

$$
P_i(N_i\ge m)=f_i^{m-1}.
$$

期待値の tail-sum formula を有限段まで足すと、幾何型の和が現れます。

<!-- proof-start -->
### 証明

$m\ge1$ とします。$N_i\ge m$ は、時刻0の訪問を含めて $m-1$ 回以上正に帰還することです。

強 Markov 性を各帰還時刻で繰り返すと

$$
P_i(N_i\ge m)=f_i^{m-1}.
$$

非負整数値変数の tail-sum formula より

$$
E_i[N_i]
=
\sum_{m=1}^{\infty}P_i(N_i\ge m)
=
\sum_{m=1}^{\infty}f_i^{m-1}.
$$

$f_i<1$ なら

$$
E_i[N_i]=\frac1{1-f_i}.
$$

$f_i=1$ ならこの非負項和は無限大となり、$E_i[N_i]=\infty$ です。

前節の $E_i[N_i]=G(i,i)$ と合わせれば結論を得ます。
<!-- proof-end -->

---

## 7. 再帰性は通信クラスの性質

$i\to j$ を「ある $m$ で $p^{(m)}(i,j)>0$」と書き、$i\leftrightarrow j$ を互いに到達可能とします。

<a id="thm-sto2a-recurrence-class"></a>

<!-- formal-statement-start -->
> **定理（再帰性は通信クラスで共通）**  
> $i\leftrightarrow j$ なら、$i$ が再帰的であることと $j$ が再帰的であることは同値である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$i\leftrightarrow j$ なので、ある $a,b\ge0$ に対し

$$
p^{(a)}(i,j)>0,
\qquad
p^{(b)}(j,i)>0.
$$

Chapman--Kolmogorov から任意の $n$ に対して

$$
p^{(a+n+b)}(i,i)
\ge
p^{(a)}(i,j)
p^{(n)}(j,j)
p^{(b)}(j,i).
$$

$n$ について和を取ります。もし $j$ が再帰的なら

$$
\sum_{n=0}^{\infty}p^{(n)}(j,j)=\infty
$$

なので

$$
\sum_{m=0}^{\infty}p^{(m)}(i,i)=\infty.
$$

従って $i$ も再帰的です。$i,j$ を入れ替えて逆向きも同様です。
<!-- proof-end -->

---

## 8. 帰還時間の平均で再帰を二分する

再帰的でも、帰還までの平均時間が有限とは限りません。

<a id="def-sto2a-positive-null-recurrence"></a>

<!-- formal-statement-start -->
> **定義（正再帰・零再帰）**  
> 再帰状態 $i$ について
>
$$
m_i=E_i[T_i^+]
$$
>
> とする。
>
> - $m_i<\infty$ なら $i$ を正再帰的という。
> - $m_i=\infty$ なら $i$ を零再帰的という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-positive-null-recurrence -->
### 直接例：交互連鎖は正再帰的

**定義の確認**

交互連鎖では $T_0^+=2$ が確率1なので
$$
m_0=E_0[T_0^+]=2<\infty.
$$
従って状態 $0$ は正再帰的です。状態 $1$ も同様です。
<!-- definition-example-end -->

有限既約連鎖では全状態が正再帰ですが、$\mathbb Z$ 上の単純対称 random walk は再帰的なのに零再帰です。

---

## 9. 一回の帰還 cycle から不変分布を作る

$i$ を再帰状態とし、$\tau=T_i^+$ とします。帰還までの一 cycle で状態 $j$ を何回訪れるかの期待値を

$$
\nu_j
=
E_i\left[
\sum_{n=0}^{\tau-1}1_{\{X_n=j\}}
\right]
$$

とします。

<a id="thm-sto2a-cycle-invariant"></a>

<!-- formal-statement-start -->
> **定理（帰還 cycle の occupation measure）**  
> $i$ を再帰状態とする。上で定義した $\nu=(\nu_j)_{j\in S}$ は
>
$$
\nu P=\nu
$$
>
> を満たす不変測度であり、
>
$$
\nu_i=1,
\qquad
\sum_{j\in S}\nu_j=E_i[T_i^+].
$$
>
> 特に $i$ が正再帰的なら
>
$$
\pi_j
=
\frac{\nu_j}{E_i[T_i^+]}
$$
>
> は不変確率分布で、
>
$$
\boxed{
\pi_i=\frac{1}{E_i[T_i^+]}
}
$$
>
> が成り立つ。
<!-- formal-statement-end -->

最後の式が Kac の帰還時間公式の離散 Markov 連鎖 版です。

<!-- proof-start -->
### 証明

$\tau=T_i^+$ なので、時刻 $0$ では $i$ におり、$1,\ldots,\tau-1$ では $i$ にいません。従って

$$
\nu_i=1.
$$

また非負項について [Tonelli](../F0_00D2C_積測度_Tonelli_Fubini/index.md#thm-tonelli) を使えば

$$
\sum_{j\in S}\nu_j
=
E_i\left[
\sum_{n=0}^{\tau-1}\sum_{j\in S}1_{\{X_n=j\}}
\right]
=
E_i\left[
\sum_{n=0}^{\tau-1}1
\right]
=
E_i[\tau].
$$

次に不変性を示します。固定した $k\in S$ に対し

$$
\begin{aligned}
\sum_{j\in S}\nu_jp(j,k)
&=
E_i\left[
\sum_{n=0}^{\tau-1}
p(X_n,k)
\right].
\end{aligned}
$$

Markov 性から

$$
p(X_n,k)
=
E_i[1_{\{X_{n+1}=k\}}\mid\mathcal F_n].
$$

停止時刻 $\tau$ までの非負和なので条件付き期待値と和を交換して

$$
\sum_j\nu_jp(j,k)
=
E_i\left[
\sum_{n=0}^{\tau-1}1_{\{X_{n+1}=k\}}
\right].
$$

添字を一つずらすと

$$
=
E_i\left[
\sum_{n=1}^{\tau}1_{\{X_n=k\}}
\right].
$$

一方

$$
\nu_k
=
E_i\left[
\sum_{n=0}^{\tau-1}1_{\{X_n=k\}}
\right].
$$

両者の差は

$$
E_i[1_{\{X_\tau=k\}}-1_{\{X_0=k\}}].
$$

$X_0=X_\tau=i$ なのでこの差は0です。従って

$$
\sum_j\nu_jp(j,k)=\nu_k.
$$

$k$ は任意なので $\nu P=\nu$ です。

$E_i[\tau]<\infty$ なら総質量で規格化して

$$
\pi_j=\frac{\nu_j}{E_i[\tau]}
$$

とすれば $\sum_j\pi_j=1$ かつ $\pi P=\pi$ です。さらに $\nu_i=1$ なので

$$
\pi_i=\frac1{E_i[T_i^+]}.
$$
<!-- proof-end -->

---

## 10. 逆向き遷移の釣り合いから不変性へ

<a id="def-sto2a-reversibility"></a>

<!-- formal-statement-start -->
> **定義（detailed balance・可逆性）**  
> 確率分布 $\pi$ が
>
$$
\pi_i p(i,j)=\pi_j p(j,i)
\qquad(i,j\in S)
$$
>
> を満たすとき、$\pi$ は detailed balance を満たすという。この $\pi$ に関して連鎖は可逆であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto2a-reversibility -->
### 直接例：交互連鎖の detailed balance

**定義の確認**

交互連鎖に
$$
\pi_0=\pi_1=\frac12
$$
を入れます。このとき
$$
\pi_0p(0,1)=\frac12=\pi_1p(1,0),
$$
また $i=j$ の場合も両辺は等しいので、全ての $i,j\in\{0,1\}$ で detailed balance が成り立ちます。従ってこの連鎖は $\pi$ に関して可逆です。
<!-- definition-example-end -->

<a id="prop-sto2a-detailed-balance"></a>

<!-- formal-statement-start -->
> **命題（detailed balance は不変性を導く）**  
> $\pi$ が detailed balance を満たすなら
>
$$
\pi P=\pi.
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

固定した $j$ に対し

$$
\begin{aligned}
(\pi P)_j
&=
\sum_i\pi_i p(i,j)\\
&=
\sum_i\pi_j p(j,i)\\
&=
\pi_j\sum_i p(j,i)\\
&=
\pi_j.
\end{aligned}
$$

従って $\pi P=\pi$ です。
<!-- proof-end -->

---

## 11. 例：$\mathbb Z$ 上の単純対称 random walk は再帰的

$$
X_{n+1}=X_n+\xi_{n+1},
\qquad
P(\xi_n=1)=P(\xi_n=-1)=\frac12
$$

とします。

奇数時刻には0へ戻れません。$2n$ 時刻後に0へ戻るには $+1$ と $-1$ がそれぞれ $n$ 回必要なので

$$
p^{(2n)}(0,0)
=
\binom{2n}{n}2^{-2n}.
$$

二項係数の和

$$
\sum_{k=0}^{2n}\binom{2n}{k}=4^n
$$

には $2n+1$ 項があり、中央項が最大です。従って

$$
\binom{2n}{n}
\ge
\frac{4^n}{2n+1}.
$$

したがって

$$
p^{(2n)}(0,0)
\ge
\frac1{2n+1}.
$$

よって

$$
G(0,0)
\ge
\sum_{n=0}^{\infty}\frac1{2n+1}
=
\infty.
$$

Green 判定により0は再帰的です。平行移動対称性から全状態が再帰的です。

---

## 12. しかし単純対称 random walk は正再帰ではない

もし正再帰なら前節の cycle occupation theorem から不変確率分布が存在します。

ところが不変方程式は

$$
\pi_j
=
\frac12\pi_{j-1}
+
\frac12\pi_{j+1}.
$$

従って差分

$$
\pi_{j+1}-\pi_j
=
\pi_j-\pi_{j-1}
$$

は $j$ に依らず一定です。よって

$$
\pi_j=a+bj.
$$

全ての $j\in\mathbb Z$ で非負かつ総和1になる affine sequence は存在しません。$b\ne0$ なら一方の無限遠で負になり、$b=0$ なら正の定数列は総和できません。

従って不変確率分布は存在せず、単純対称 random walk は再帰的だが正再帰ではありません。

$$
\boxed{\text{単純対称 random walk on }\mathbb Z\text{ は零再帰}}
$$

です。

---

## 13. 例：原点へ戻る drift を持つ birth--death Markov 連鎖

状態空間を $\mathbb N_0$ とし、

$$
p(0,1)=1,
$$

$n\ge1$ では

$$
p(n,n+1)=p,
\qquad
p(n,n-1)=q,
\qquad
p+q=1,
\qquad
p<q
$$

とします。

detailed balance は

$$
\pi_0=\pi_1q
$$

と

$$
\pi_np=\pi_{n+1}q
\qquad(n\ge1)
$$

を要求します。

従って

$$
\pi_1=\frac{\pi_0}{q},
$$

$$
\pi_n
=
\frac{\pi_0}{q}
\left(\frac pq\right)^{n-1}
\qquad(n\ge1).
$$

$p/q<1$ なので総和は有限です。正規化して確率分布にでき、detailed balance から不変分布になります。

原点から遠ざかる drift より、原点へ戻る drift が強いときには定常確率が作れる、という具体例です。

---

# 14. 演習 A

<a id="ex-sto2a-a01"></a>

## STO2A-A01 二段階遷移

- Level: A

Markov 性から

$$
p^{(2)}(i,j)
=
\sum_{k\in S}p(i,k)p(k,j)
$$

を導け。

<!-- solution-start -->
### 詳細解答

中間状態 $X_1=k$ で分割すると

$$
P_i(X_2=j)
=
\sum_{k\in S}
P_i(X_1=k,X_2=j).
$$

条件付き確率で

$$
=
\sum_k
P_i(X_1=k)
P_i(X_2=j\mid X_1=k).
$$

時間一様 Markov 性より

$$
P_i(X_1=k)=p(i,k),
$$

$$
P_i(X_2=j\mid X_1=k)=p(k,j).
$$

従って

$$
p^{(2)}(i,j)
=
\sum_kp(i,k)p(k,j).
$$
<!-- solution-end -->

<a id="ex-sto2a-a02"></a>

## STO2A-A02 到達時刻の停止時刻性

- Level: A

$T_A=\inf\{n\ge0:X_n\in A\}$ に対し、$\{T_A=n\}$ を $X_0,\ldots,X_n$ だけで書き、$T_A$ が停止時刻であることを示せ。

<!-- solution-start -->
### 詳細解答

$$
\{T_A=n\}
=
\{X_0\notin A,\ldots,X_{n-1}\notin A,X_n\in A\}.
$$

これは $X_0,\ldots,X_n$ だけで決まり $\mathcal F_n$ に属します。

従って

$$
\{T_A\le n\}
=
\bigcup_{m=0}^{n}\{T_A=m\}
\in\mathcal F_n.
$$

よって $T_A$ は停止時刻です。
<!-- solution-end -->

<a id="ex-sto2a-a03"></a>

## STO2A-A03 Green 核と訪問回数

- Level: A

$$
N_j^{(N)}
=
\sum_{n=0}^{N}1_{\{X_n=j\}}
$$

とする。$E_i[N_j^{(N)}]$ を求め、$N\to\infty$ で Green 核へ移る定理を答えよ。

<!-- solution-start -->
### 詳細解答

有限和なので

$$
E_i[N_j^{(N)}]
=
\sum_{n=0}^{N}P_i(X_n=j)
=
\sum_{n=0}^{N}p^{(n)}(i,j).
$$

$N_j^{(N)}\uparrow N_j$ なので[単調収束定理](../F0_00D2B_単調収束_Fatou_優収束/index.md#ref-limit-integral-exchange)から

$$
E_i[N_j]
=
\lim_{N\to\infty}E_i[N_j^{(N)}]
=
\sum_{n=0}^{\infty}p^{(n)}(i,j)
=
G(i,j).
$$
<!-- solution-end -->

<a id="ex-sto2a-a04"></a>

## STO2A-A04 detailed balance

- Level: A

$\pi_i p(i,j)=\pi_jp(j,i)$ が全ての $i,j$ で成り立つとき、$\pi$ が不変分布であることを示せ。

<!-- solution-start -->
### 詳細解答

固定した $j$ に対し

$$
(\pi P)_j
=
\sum_i\pi_ip(i,j)
=
\sum_i\pi_jp(j,i).
$$

$\pi_j$ を外へ出して

$$
(\pi P)_j
=
\pi_j\sum_ip(j,i)
=
\pi_j.
$$

行和は1なので最後の等号が成り立ちます。従って $\pi P=\pi$ です。
<!-- solution-end -->

# 15. 演習 B

<a id="ex-sto2a-b01"></a>

## STO2A-B01 Green 判定を再構成する

- Level: B

$f_i=P_i(T_i^+<\infty)$ とする。総訪問回数 $N_i$ について

$$
P_i(N_i\ge m)=f_i^{m-1}
$$

を強 Markov 性から示し、

$$
G(i,i)=
\begin{cases}
(1-f_i)^{-1},&f_i<1,\\
\infty,&f_i=1
\end{cases}
$$

を導け。

<!-- solution-start -->
### 詳細解答

時刻0の訪問を第1回と数えます。$N_i\ge2$ は正の帰還が一回起こる事象なので確率は $f_i$ です。

第1帰還時刻 $\tau_1$ で強 Markov 性を使うと、帰還後にもう一度帰還する条件付き確率も $f_i$ です。従って

$$
P_i(N_i\ge3)=f_i^2.
$$

同じ議論を繰り返し

$$
P_i(N_i\ge m)=f_i^{m-1}.
$$

tail-sum formula から

$$
E_i[N_i]
=
\sum_{m=1}^{\infty}P_i(N_i\ge m)
=
\sum_{m=1}^{\infty}f_i^{m-1}.
$$

$f_i<1$ なら幾何型の和を評価すると $(1-f_i)^{-1}$、$f_i=1$ なら無限大になります。

$E_i[N_i]=G(i,i)$ なので結論を得ます。
<!-- solution-end -->

<a id="ex-sto2a-b02"></a>

## STO2A-B02 $\mathbb Z$ 上の単純対称 random walk

- Level: B

$$
p^{(2n)}(0,0)
=
\binom{2n}{n}2^{-2n}
$$

を示し、

$$
\binom{2n}{n}\ge\frac{4^n}{2n+1}
$$

だけを使って0が再帰的であることを証明せよ。

<!-- solution-start -->
### 詳細解答

$2n$ 歩後に0へ戻るには右向き $n$ 回、左向き $n$ 回が必要です。その並べ方が $\binom{2n}{n}$ 通りあり、各経路の確率は $2^{-2n}$ なので

$$
p^{(2n)}(0,0)
=
\binom{2n}{n}2^{-2n}.
$$

二項係数の総和は $4^n$ で、中央項が最大です。項数は $2n+1$ なので

$$
\binom{2n}{n}
\ge
\frac{4^n}{2n+1}.
$$

従って

$$
p^{(2n)}(0,0)
\ge
\frac1{2n+1}.
$$

よって

$$
G(0,0)
\ge
\sum_{n=0}^{\infty}p^{(2n)}(0,0)
\ge
\sum_{n=0}^{\infty}\frac1{2n+1}
=
\infty.
$$

Green 判定から0は再帰的です。
<!-- solution-end -->

<a id="ex-sto2a-b03"></a>

## STO2A-B03 cycle occupation measure

- Level: B

$i$ を再帰状態、$\tau=T_i^+$ とし

$$
\nu_j
=
E_i\left[
\sum_{n=0}^{\tau-1}1_{\{X_n=j\}}
\right]
$$

とする。$\nu P=\nu$ を示す証明で、始点と終点の差が消える箇所を明示せよ。

<!-- solution-start -->
### 詳細解答

固定した $k$ に対し

$$
\sum_j\nu_jp(j,k)
=
E_i\left[
\sum_{n=0}^{\tau-1}p(X_n,k)
\right].
$$

Markov 性から

$$
p(X_n,k)
=
E_i[1_{\{X_{n+1}=k\}}\mid\mathcal F_n].
$$

従って

$$
\sum_j\nu_jp(j,k)
=
E_i\left[
\sum_{n=1}^{\tau}1_{\{X_n=k\}}
\right].
$$

一方

$$
\nu_k
=
E_i\left[
\sum_{n=0}^{\tau-1}1_{\{X_n=k\}}
\right].
$$

差は

$$
E_i[1_{\{X_\tau=k\}}-1_{\{X_0=k\}}].
$$

$\tau$ は $i$ への正の帰還時刻なので

$$
X_0=i,\qquad X_\tau=i
$$

です。従って二つの指示関数は常に等しく差は0です。

よって全ての $k$ について

$$
\sum_j\nu_jp(j,k)=\nu_k,
$$

すなわち $\nu P=\nu$ です。
<!-- solution-end -->

# 16. 演習 C

<a id="ex-sto2a-c01"></a>

## STO2A-C01 再帰・零再帰・正再帰を二つの random walk で比較する

- Level: C

次の二つを比較せよ。

**(A)** $\mathbb Z$ 上の単純対称 random walk。

**(B)** $\mathbb N_0$ 上で $p(0,1)=1$、$n\ge1$ では

$$
p(n,n+1)=p,\qquad p(n,n-1)=q,\qquad p<q,\quad p+q=1.
$$

1. (A) が再帰的であることを Green 核から示せ。
2. (A) に不変確率分布が存在しないことを不変方程式から示せ。
3. cycle occupation theorem を使って (A) が零再帰であることを結論せよ。
4. (B) について detailed balance から不変確率分布を構成せよ。
5. (A) と (B) の違いを「帰還確率」と「平均帰還時間」の二段階で説明せよ。

<!-- solution-start -->
### 詳細解答

1. 本文と同様に

   $$
   p^{(2n)}(0,0)
   =
   \binom{2n}{n}2^{-2n}
   \ge
   \frac1{2n+1}.
   $$

   従って $G(0,0)=\infty$ で、0は再帰的です。平行移動対称性から全状態が再帰的です。

2. 不変分布 $\pi$ があるとすると

   $$
   \pi_j
   =
   \frac12\pi_{j-1}
   +
   \frac12\pi_{j+1}.
   $$

   従って $\pi_{j+1}-\pi_j$ は一定で、$\pi_j=a+bj$ です。$\mathbb Z$ 全体で非負かつ総和1になる affine sequence は存在しません。従って不変確率分布はありません。

3. もし0が正再帰なら cycle occupation theorem により不変確率分布を構成できます。2と矛盾するため平均帰還時間は無限大です。従って (A) は零再帰です。

4. (B) の detailed balance は

   $$
   \pi_0=\pi_1q,
   $$

   $$
   \pi_np=\pi_{n+1}q
   \qquad(n\ge1)
   $$

   です。従って

   $$
   \pi_1=\frac{\pi_0}{q},
   $$

   $$
   \pi_n
   =
   \frac{\pi_0}{q}
   \left(\frac pq\right)^{n-1}
   \qquad(n\ge1).
   $$

   $p/q<1$ なので

   $$
   \sum_{n=0}^{\infty}\pi_n
   =
   \pi_0
   \left[
   1+\frac1q\sum_{m=0}^{\infty}\left(\frac pq\right)^m
   \right]
   $$

   は有限です。幾何型の和を計算すると

   $$
   \frac1q\frac1{1-p/q}
   =
   \frac1{q-p}.
   $$

   従って

   $$
   \pi_0
   =
   \frac{q-p}{1+q-p}
   =
   \frac{q-p}{2q}
   $$

   と正規化でき、上の式で全 $\pi_n$ が決まります。detailed balance を満たすので不変です。

5. (A) は「必ず戻る」ので再帰ですが、戻る時間の平均は無限です。(B) は原点向き drift があり、正規化可能な不変確率が存在します。irreducible なこの Markov 連鎖 では帰還 cycle の平均長が有限となる正再帰の側にあります。

したがって **recurrent / transient** と **positive / null recurrent** は別の判定段階です。
<!-- solution-end -->

---

## 17. 章末チェック

- [ ] Markov 性を自然なフィルトレーションに対する条件付き確率で書ける。
- [ ] hitting time が停止時刻になることを示せる。
- [ ] 離散時間 strong Markov property を $\{\tau=m\}$ 分解から証明できる。
- [ ] recurrence / transience を正の帰還時刻で定義できる。
- [ ] Green 核を期待総訪問回数として解釈できる。
- [ ] recurrence と $G(i,i)=\infty$ の同値を強 Markov 性から証明できる。
- [ ] recurrence が通信クラスで共通になることを Green 核から示せる。
- [ ] positive recurrence / null recurrence を平均帰還時間で区別できる。
- [ ] 一回の return cycle の occupation measure が不変になる証明を追える。
- [ ] Kac 型公式 $\pi_i=1/E_iT_i^+$ の意味を説明できる。
- [ ] detailed balance から 不変確率分布 を導ける。
- [ ] $\mathbb Z$ 上の単純対称 random walk が零再帰であることを再構成できる。
