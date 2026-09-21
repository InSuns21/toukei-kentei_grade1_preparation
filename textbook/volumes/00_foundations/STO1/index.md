# STO1：時間と情報 — ランダムな時間発展を数学にする

<!-- definition-example-audit: strict -->

確率変数を一つだけ見るとき、基礎になる対象は

$$
X:\Omega\to\mathbb R
$$

でした。[確率変数の定義](../F0_00P1_確率空間_確率変数_分布/index.md#def-f0-00p1-random-variable)では、$X$ が可測であることによって「値に関する事象」を確率空間上の事象へ戻せるようにしました。

ここに時間を加えると、ランダム量そのものだけでなく、情報がいつ利用可能になるかも記述する必要があります。

$$
X_0,X_1,X_2,\ldots
$$

あるいは

$$
(X_t)_{t\ge0}
$$

を同時に扱います。

ここで本質的なのは、値が時間で動くことだけではありません。時刻 $t$ では未来をまだ知らない、という **情報の制約** が加わります。

STO1 の中心図式は

$$
\boxed{
\text{time}
\;+\;
\text{information}
\;+\;
\text{measurability}
}
$$

です。

この章では、後続の martingale・Brown 運動・確率積分で毎回使う

$$
\text{growing information}
\to
\text{current-information measurability}
\to
\text{time--sample measurability}
\to
\text{random stopping rules}
\to
\text{information at the random time}
$$

を、有限例と完全な可測性確認から組み立てます。

---

## 1. 時間で添字付けされた確率変数族

以後、特に断らない限り

$$
(\Omega,\mathcal F,P)
$$

を確率空間とし、時間集合は離散時間 $\mathbb N_0=\{0,1,2,\ldots\}$ または連続時間 $[0,\infty)$ とします。

まず、状態空間が一般の可測空間であるときの可測性記法を固定します。

<a id="def-sto1-measurable-map"></a>

<!-- formal-statement-start -->
> **定義（可測写像）**  
> 可測空間 $(\Omega,\mathcal F)$ と $(E,\mathcal E)$ の間の写像
>
$$
f:\Omega\to E
$$
>
> が、任意の $B\in\mathcal E$ に対して
>
$$
f^{-1}(B)\in\mathcal F
$$
>
> を満たすとき、$f$ を **可測写像**といい、$f$ は **$\mathcal F/\mathcal E$ 可測**であるという。
<!-- formal-statement-end -->

$(E,\mathcal E)=(\mathbb R,\mathcal B(\mathbb R))$ の場合は、[実数値確率変数の定義](../F0_00P1_確率空間_確率変数_分布/index.md#def-f0-00p1-random-variable)で使った可測性と同じです。

<!-- definition-example-start: def-sto1-measurable-map -->
### 直接例：有限集合間の可測写像

**定義の確認**

$$
\Omega=\{H,T\},
\qquad
\mathcal F=2^\Omega,
\qquad
E=\{0,1\},
\qquad
\mathcal E=2^E
$$

とし、

$$
f(H)=1,
\qquad
f(T)=0
$$

とします。任意の $B\in\mathcal E$ に対して $f^{-1}(B)$ は

$$
\varnothing,\ \{H\},\ \{T\},\ \Omega
$$

のいずれかで、すべて $\mathcal F$ に属します。したがって $f$ は $\mathcal F/\mathcal E$ 可測です。
<!-- definition-example-end -->

<a id="def-sto1-stochastic-process"></a>

<!-- formal-statement-start -->
> **定義（確率過程と標本路）**  
> 状態空間を可測空間 $(E,\mathcal E)$ とする。時間集合 $T$ に対し、各 $t\in T$ について
>
$$
X_t:\Omega\to E
$$
>
> が [$\mathcal F/\mathcal E$ 可測](#def-sto1-measurable-map) であるとき、族
>
$$
X=(X_t)_{t\in T}
$$
>
> を $E$ 値 **確率過程**という。  
> 一方、$\omega\in\Omega$ を固定して得られる写像
>
$$
t\longmapsto X_t(\omega)
$$
>
> を $\omega$ に対応する **標本路** という。
<!-- formal-statement-end -->

この定義で要求しているのは、**各固定時刻 $t$ ごとの可測性**です。

時間と標本をまとめた写像

$$
(t,\omega)\longmapsto X_t(\omega)
$$

の積可測性は、この定義だけからは出ません。後で時間と標本を同時に扱う可測性条件を導入する理由がここにあります。

<!-- definition-example-start: def-sto1-stochastic-process -->
### 直接例：二回のコイントスを時間で読む

**定義の確認**

標本空間を

$$
\Omega=\{HH,HT,TH,TT\}
$$

とし、各点の確率を $1/4$ とします。

第 $n$ 回のコインを

$$
\xi_n(\omega)
=
\begin{cases}
1,&n\text{ 回目が }H,\\
-1,&n\text{ 回目が }T
\end{cases}
$$

と置き、

$$
S_0=0,\qquad
S_1=\xi_1,\qquad
S_2=\xi_1+\xi_2
$$

とします。

$\Omega$ は有限集合で $\mathcal F=2^\Omega$ とすれば、各 $S_n$ は自動的に $\mathcal F$ 可測です。従って

$$
(S_0,S_1,S_2)
$$

は離散時間確率過程です。

例えば $\omega=HT$ を固定すれば 標本路 は

$$
0\to1\to0
$$

です。

ここでは「確率過程」と「一本の実現経路」を明確に分けます。
<!-- definition-example-end -->

---

## 2. 各時刻で同じでも、全時刻同時に同じとは限らない

連続時間では時刻が非可算個あります。そのため

$$
P(X_t=Y_t)=1
\qquad
(\text{各固定 }t)
$$

から

$$
P(X_t=Y_t\text{ for all }t)=1
$$

は一般には従いません。

<a id="def-sto1-modification-indistinguishable"></a>

<!-- formal-statement-start -->
> **定義（modification と indistinguishability）**  
> 同じ確率空間上の二つの過程 $X=(X_t)_{t\in T}$、$Y=(Y_t)_{t\in T}$ を考える。
>
> - 各固定 $t\in T$ について
>
$$
P(X_t=Y_t)=1
$$
>
> が成り立つとき、$X$ と $Y$ は互いに **modification** であるという。
>
> - 一つの確率 1 の事象 $\Omega_0$ が存在し、全ての $\omega\in\Omega_0$ と全ての $t\in T$ に対して
>
$$
X_t(\omega)=Y_t(\omega)
$$
>
> が成り立つとき、$X$ と $Y$ は **indistinguishable** であるという。
<!-- formal-statement-end -->

indistinguishable なら modification ですが、逆は連続時間では壊れます。

<!-- definition-example-start: def-sto1-modification-indistinguishable -->
### 直接例：modification だが indistinguishable ではない

**定義の確認**

$$
\Omega=[0,1],
\qquad
\mathcal F=\mathcal B([0,1]),
\qquad
P=\text{Lebesgue measure}
$$

とします。

$t\in[0,1]$ に対して

$$
X_t(\omega)=1_{\{\omega=t\}},
\qquad
Y_t(\omega)=0
$$

と置きます。

固定した $t$ について、$X_t$ と $Y_t$ が異なるのは一点集合 $\{t\}$ だけです。従って

$$
P(X_t=Y_t)=1.
$$

よって $X$ と $Y$ は modification です。

しかし各 $\omega\in[0,1]$ に対して時刻 $t=\omega$ を選ぶと

$$
X_\omega(\omega)=1,
\qquad
Y_\omega(\omega)=0.
$$

従って

$$
\{\omega:X_t(\omega)=Y_t(\omega)\text{ for all }t\}
=
\varnothing.
$$

ゆえに indistinguishable ではありません。

壊れた機構は「各 $t$ ごとの零集合を一つにまとめる」部分です。可算個なら零集合の可算和は零集合ですが、$t\in[0,1]$ は非可算個なので、その議論は使えません。
<!-- definition-example-end -->

この区別は STO3 の連続 modification、STO4 の Brown 運動で重要になります。

---

## 3. 時刻ごとに「知っている事象」を増やす

F0-00P3C では[増加する部分 $\sigma$ 代数列](../F0_00P3C_Levy上昇定理_情報の増加/index.md#def-f0-00p3c-increasing-sigma-fields)を扱いました。

確率過程では、その「情報の増加」を時間全体に配置します。

<a id="def-sto1-filtration-usual"></a>

<!-- formal-statement-start -->
> **定義（filtration と usual conditions）**  
> 確率空間 $(\Omega,\mathcal F,P)$ 上で、各 $t\ge0$ に部分 $\sigma$ 代数 $\mathcal F_t\subseteq\mathcal F$ が与えられ、
>
$$
s\le t
\quad\Longrightarrow\quad
\mathcal F_s\subseteq\mathcal F_t
$$
>
> を満たすとき、族 $(\mathcal F_t)_{t\ge0}$ を **filtration** という。
>
> filtration が **right-continuous** であるとは
>
$$
\mathcal F_t
=
\bigcap_{u>t}\mathcal F_u
$$
>
> が全ての $t\ge0$ で成り立つことをいう。
>
> また各 $\mathcal F_t$ が $P$ に関して complete、すなわち $P$-零集合の任意の部分集合を含むとする。right-continuity と completeness の両方を満たすとき、filtration は **usual conditions** を満たすという。
<!-- formal-statement-end -->

$\mathcal F_t$ は「時刻 $t$ までに判定できる事象」の集合です。

未来へ進むと情報は失われず、

$$
\mathcal F_s\subseteq\mathcal F_t
$$

と増えていきます。

<!-- definition-example-start: def-sto1-filtration-usual -->
### 直接例：二回のコイントスを一枚ずつ開封する

**定義の確認**

先ほどの

$$
\Omega=\{HH,HT,TH,TT\}
$$

で、連続時間の filtration を

$$
\mathcal F_t
=
\{\varnothing,\Omega\}
\qquad
(0\le t<1),
$$

$$
\mathcal F_t
=
\sigma(\xi_1)
\qquad
(1\le t<2),
$$

$$
\mathcal F_t
=
2^\Omega
\qquad
(t\ge2)
$$

と定めます。

時刻が進むにつれて

$$
\{\varnothing,\Omega\}
\subset
\sigma(\xi_1)
\subset
2^\Omega
$$

なので filtration です。

例えば $t=1.4$ では一枚目だけ見えており、

$$
\{HH,HT\}
$$

は「一枚目が表」という事象なので $\mathcal F_{1.4}$ に入ります。

一方

$$
\{HH,TH\}
$$

は「二枚目が表」という事象で、まだ二枚目を見ていないため $\mathcal F_{1.4}$ には入りません。

有限標本空間では全ての零集合は空集合だけなので complete です。また上の filtration は各ジャンプ時刻の値を右側の情報に合わせて定義しているため right-continuous です。従って usual conditions を満たします。
<!-- definition-example-end -->

usual conditions は STO4 以降でランダムな停止ルールと標本路の正則性を安定に組み合わせるために使います。本章では、どの定理に right-continuity が本当に必要かを区別し、無条件には仮定しません。

---

## 4. その時刻の値を、その時刻の情報で読む

<a id="def-sto1-adapted-natural-filtration"></a>

<!-- formal-statement-start -->
> **定義（adapted process と natural filtration）**  
> filtration $(\mathcal F_t)_{t\ge0}$ に対し、過程 $X=(X_t)_{t\ge0}$ が **adapted** であるとは、各 $t\ge0$ について
>
$$
X_t
$$
>
> が $\mathcal F_t$ 可測であることをいう。
>
> また過程 $X$ が生成する
>
$$
\mathcal F_t^X
=
\sigma(X_s:0\le s\le t)
$$
>
> を $X$ の **natural filtration** という。
<!-- formal-statement-end -->

natural filtration は「$X$ の過去だけを観測して得られる最小の情報」です。

<!-- definition-example-start: def-sto1-adapted-natural-filtration -->
### 直接例：random walk は自分の natural filtration に adapted

**定義の確認**

離散時間で

$$
S_n=\xi_1+\cdots+\xi_n
$$

とし、

$$
\mathcal F_n^S
=
\sigma(S_0,\ldots,S_n)
$$

とします。

定義から $S_n$ 自身は $\mathcal F_n^S$ を生成する確率変数の一つです。従って $S_n$ は $\mathcal F_n^S$ 可測であり、$S$ は natural filtration に adapted です。

さらに

$$
\xi_n=S_n-S_{n-1}
$$

なので、$n\ge1$ では $\xi_n$ も $\mathcal F_n^S$ 可測です。

逆に simple random walk では

$$
S_k=\sum_{j=1}^k\xi_j
$$

だから

$$
\sigma(S_0,\ldots,S_n)
=
\sigma(\xi_1,\ldots,\xi_n).
$$

つまり「位置の履歴」と「増分の履歴」は同じ情報を持ちます。
<!-- definition-example-end -->

ここまでの条件は時刻ごとの条件です。次は時間変数も含めた可測性を要求します。

---

## 5. 時間と標本を同時に測る

<a id="def-sto1-progressive"></a>

<!-- formal-statement-start -->
> **定義（progressively measurable process）**  
> $E$ を可測空間とし、filtration $(\mathcal F_t)$ に対する過程 $X:[0,\infty)\times\Omega\to E$ を考える。  
> 任意の $T>0$ について制限
>
$$
(t,\omega)\longmapsto X_t(\omega),
\qquad
0\le t\le T
$$
>
> が
>
$$
\mathcal B([0,T])\otimes\mathcal F_T
$$
>
> から $\mathcal E$ への可測写像であるとき、$X$ は **progressively measurable** であるという。
<!-- formal-statement-end -->

この条件では、時刻 $T$ までの長方形

$$
[0,T]\times\Omega
$$

上で、時間の Borel 情報と $\mathcal F_T$ の情報だけを使って $X$ を読めます。

<!-- definition-example-start: def-sto1-progressive -->
### 直接例：有限個の時刻で値が切り替わる adapted process

**定義の確認**

$0=t_0<t_1<\cdots<t_m=T$ とし、各 $k$ で

$$
Z_k
$$

を $\mathcal F_{t_k}$ 可測とします。

$$
X_t
=
Z_0 1_{\{0\}}(t)
+
\sum_{k=0}^{m-1}
Z_{k+1}
1_{(t_k,t_{k+1}]}(t)
$$

と置きます。

各区間 $(t_k,t_{k+1}]$ では $Z_{k+1}$ は $\mathcal F_{t_{k+1}}\subseteq\mathcal F_T$ 可測です。従って

$$
(t,\omega)\mapsto
Z_{k+1}(\omega)1_{(t_k,t_{k+1}]}(t)
$$

は $\mathcal B([0,T])\otimes\mathcal F_T$ 可測です。

有限和も可測なので $X$ は $[0,T]$ 上で積可測です。この確認を任意の終端時刻に対して行えば progressive です。
<!-- definition-example-end -->

### adapted だけではなく 標本路の正則性 を足す

確率積分では progressive な過程を大量に作る必要があります。毎回積可測性を直接証明する代わりに、標本路の右連続性を使います。

<a id="thm-sto1-adapted-right-cont-progressive"></a>

<!-- formal-statement-start -->
> **定理（right-continuous adapted process は progressive）**  
> $(\mathcal F_t)_{t\ge0}$ を filtration とし、$X=(X_t)_{t\ge0}$ を実数値 adapted process とする。ほとんど全ての $\omega$ ではなく、各 $\omega$ について標本路
>
$$
t\longmapsto X_t(\omega)
$$
>
> が右連続であると仮定する。  
> このとき $X$ は progressively measurable である。
<!-- formal-statement-end -->

### 証明の見取り図

$[0,T]$ を細かい区間へ切り、各区間で **右端の値**を使う step process を作ります。

右端時刻の値は $\mathcal F_T$ 可測です。分割幅を 0 へ送ると、右端時刻が $t$ へ右から近づくため、標本路の右連続性によって step process が $X_t$ へ点ごと収束します。

<!-- proof-start -->
### 証明

$T>0$ を固定します。

$n\ge1$ に対し dyadic grid

$$
t_k^{(n)}
=
\frac{kT}{2^n},
\qquad
k=0,\ldots,2^n
$$

を取ります。

$[0,T]$ 上で

$$
X_t^{(n)}
=
X_0 1_{\{0\}}(t)
+
\sum_{k=0}^{2^n-1}
X_{t_{k+1}^{(n)}}
1_{(t_k^{(n)},t_{k+1}^{(n)}]}(t)
$$

と定めます。

$X$ は adapted なので

$$
X_{t_{k+1}^{(n)}}
$$

は $\mathcal F_{t_{k+1}^{(n)}}$ 可測です。

しかも

$$
t_{k+1}^{(n)}
\le T
$$

だから

$$
\mathcal F_{t_{k+1}^{(n)}}
\subseteq
\mathcal F_T.
$$

従って各項

$$
(t,\omega)
\longmapsto
X_{t_{k+1}^{(n)}}(\omega)
1_{(t_k^{(n)},t_{k+1}^{(n)}]}(t)
$$

は

$$
\mathcal B([0,T])\otimes\mathcal F_T
$$

可測です。

有限和である $X^{(n)}$ も同じ積 $\sigma$ 代数に関して可測です。

次に $t\in[0,T)$ を固定します。$t$ を含む区間の右端を

$$
r_n(t)
$$

と書けば

$$
t\le r_n(t),
\qquad
0\le r_n(t)-t\le\frac{T}{2^n}.
$$

従って

$$
r_n(t)\downarrow t
$$

とは限らなくても

$$
r_n(t)\to t,
\qquad
r_n(t)\ge t
$$

です。

標本路の右連続性から各 $\omega$ について

$$
X_{r_n(t)}(\omega)
\to
X_t(\omega).
$$

$t=T$ では全ての $n$ で

$$
X_T^{(n)}=X_T.
$$

したがって全ての $(t,\omega)\in[0,T]\times\Omega$ で

$$
X_t^{(n)}(\omega)
\to
X_t(\omega).
$$

実数値可測関数列の点ごとの極限は可測なので、$X$ の $[0,T]\times\Omega$ への制限は

$$
\mathcal B([0,T])\otimes\mathcal F_T
$$

可測です。

$T>0$ は任意だったので $X$ は progressively measurable です。
<!-- proof-end -->

この定理で使った仮定の役割は明確です。

- adaptedness：grid の右端値を $\mathcal F_T$ 可測にする。
- 右連続性：step approximation を $X_t$ へ戻す。

標本路の正則性 が joint measurability を生みます。

---

## 6. 「現在」ではなく「直前まで」で決める

STO2 の離散時間変換、STO6 の stochastic integral では、integrand が未来の増分を見てから賭け方を決めてはいけません。

この「先読み禁止」を measurable structure にします。

<a id="def-sto1-predictable"></a>

<!-- formal-statement-start -->
> **定義（predictable sigma-field と predictable process）**  
> filtration $(\mathcal F_t)_{t\ge0}$ に対し、$[0,\infty)\times\Omega$ 上の **predictable sigma-field** $\mathcal P$ を
>
$$
\{0\}\times A,
\qquad
A\in\mathcal F_0,
$$
>
> および
>
$$
(s,t]\times A,
\qquad
0\le s<t,
\quad
A\in\mathcal F_s
$$
>
> という集合族が生成する $\sigma$ 代数として定める。  
> 実数値過程 $H$ が
>
$$
\mathcal P/\mathcal B(\mathbb R)
$$
>
> 可測であるとき、$H$ を **predictable process** という。
<!-- formal-statement-end -->

区間 $(s,t]$ で使う係数を $\mathcal F_s$ で決める、という形がそのまま定義に入っています。

<!-- definition-example-start: def-sto1-predictable -->
### 直接例：simple predictable process

**定義の確認**

$0\le s<t$、$A\in\mathcal F_s$ とし、

$$
H_u(\omega)
=
1_{(s,t]}(u)1_A(\omega)
$$

と置きます。

集合

$$
\{(u,\omega):H_u(\omega)=1\}
=
(s,t]\times A
$$

は predictable sigma-field の生成集合そのものです。

従って $H$ は predictable です。

意味としては、時刻 $s$ の時点で事象 $A$ が起きたかを判定し、その判定だけを使って $(s,t]$ の間の操作を決めています。区間の内部で得た新情報は係数 $1_A$ に反映されません。
<!-- definition-example-end -->

<a id="prop-sto1-predictable-progressive"></a>

<!-- formal-statement-start -->
> **命題（predictable process は progressive）**  
> 実数値 predictable process は progressively measurable である。
<!-- formal-statement-end -->

### 証明の見取り図

predictable sigma-field の生成集合を $[0,T]\times\Omega$ に切ります。

$(s,t]\times A$ で $A\in\mathcal F_s$ なら、$s\le T$ の部分では $A\in\mathcal F_T$ です。従って生成集合は全て $\mathcal B([0,T])\otimes\mathcal F_T$ に入ります。

<!-- proof-start -->
### 証明

$T>0$ を固定します。

predictable sigma-field の生成集合

$$
\{0\}\times A,
\qquad
A\in\mathcal F_0
$$

を $[0,T]\times\Omega$ に制限すると、そのまま

$$
\{0\}\times A
\in
\mathcal B([0,T])\otimes\mathcal F_T
$$

です。ここでは

$$
\mathcal F_0\subseteq\mathcal F_T
$$

を使いました。

次に

$$
(s,t]\times A,
\qquad
A\in\mathcal F_s
$$

を考えます。

$[0,T]$ との共通部分は

$$
\bigl((s,t]\cap[0,T]\bigr)\times A.
$$

これは空集合であるか、Borel 集合と $A$ の直積です。

共通部分が空でなければ $s<T$ なので

$$
A\in\mathcal F_s\subseteq\mathcal F_T.
$$

従ってやはり

$$
\bigl((s,t]\cap[0,T]\bigr)\times A
\in
\mathcal B([0,T])\otimes\mathcal F_T.
$$

よって predictable sigma-field $\mathcal P$ の全ての集合は $[0,T]\times\Omega$ へ制限すると

$$
\mathcal B([0,T])\otimes\mathcal F_T
$$

に入ります。

したがって $\mathcal P$ 可測な実数値過程 $H$ の $[0,T]\times\Omega$ 制限は積可測です。

$T$ は任意なので $H$ は progressively measurable です。
<!-- proof-end -->

離散時間ではこの定義は

$$
H_n
\text{ が }
\mathcal F_{n-1}
\text{ 可測}
$$

という形に対応します。STO2 ではこれを「第 $n$ 回の増分を見る前に係数を決める」という predictable transform として使います。

---

## 7. 止めるかどうかを、その時刻までに決める

<a id="def-sto1-stopping-time"></a>

<!-- formal-statement-start -->
> **定義（stopping time）**  
> $[0,\infty]$ 値確率変数 $\tau$ が filtration $(\mathcal F_t)_{t\ge0}$ に関する **stopping time** であるとは、任意の $t\ge0$ に対して
>
$$
\{\tau\le t\}
\in
\mathcal F_t
$$
>
> が成り立つことをいう。
<!-- formal-statement-end -->

$\{\tau\le t\}$ は「時刻 $t$ までにもう停止したか」という yes/no の事象です。

stopping time の定義は、停止する正確な未来時刻を時刻 0 で知ることを要求していません。各 $t$ まで進んだ時点で「もう止まったか」を判定できればよいのです。

<!-- definition-example-start: def-sto1-stopping-time -->
### 直接例：最初の表が出る時刻

**定義の確認**

離散時間コイントス $\xi_1,\xi_2,\ldots$ に対し

$$
\mathcal F_n
=
\sigma(\xi_1,\ldots,\xi_n)
$$

とします。

$$
\tau
=
\inf\{n\ge1:\xi_n=1\}
$$

と置き、表が一度も出なければ $\tau=\infty$ とします。

$n\ge1$ に対し

$$
\{\tau\le n\}
=
\bigcup_{k=1}^n
\{\xi_k=1\}.
$$

各 $\{\xi_k=1\}$ は $\mathcal F_k\subseteq\mathcal F_n$ に属するので

$$
\{\tau\le n\}\in\mathcal F_n.
$$

従って $\tau$ は stopping time です。

一方、「最初の表が出る時刻」は未来を先読みして決めていません。その時点で表を観測した瞬間に停止できます。
<!-- definition-example-end -->

### 反例：有限区間で最後に表が出た時刻

三回のコイントスだけを考え、

$$
\sigma
=
\max\{k\in\{1,2,3\}:\xi_k=1\}
$$

とし、表が一度もなければ $\sigma=0$ とします。

$\{\sigma\le1\}$ を時刻 1 で判定するには、二回目・三回目に表が出ないことまで知る必要があります。

実際

$$
\{\sigma\le1\}
=
\{\xi_2=-1,\xi_3=-1\}
$$

に、一回目が表か裏かを問わない事象を加味した形であり、$\mathcal F_1$ では判定できません。

失った仮定は「停止判定が現在までの情報だけでできること」です。したがって一般に last exit time は stopping time ではありません。

---

## 8. 連続な標本路 の hitting time は stopping time になる

確率解析では

$$
\tau
=
\inf\{t\ge0:X_t\in C\}
$$

という初到達時刻が頻出します。

「初めて入った時刻」は未来の情報を使っているように見えますが、連続な標本路 と closed set の組合せでは現在までの観測から判定できます。

<a id="thm-sto1-closed-hitting-time"></a>

<!-- formal-statement-start -->
> **定理（continuous adapted process の closed-set hitting time）**  
> $X=(X_t)_{t\ge0}$ を $\mathbb R^d$ 値 adapted process とし、各 標本路 が連続であるとする。$C\subseteq\mathbb R^d$ を閉集合とし、
>
$$
\tau_C
=
\inf\{t\ge0:X_t\in C\},
$$
>
> 空集合の infimum は $\infty$ と定める。  
> このとき $\tau_C$ は stopping time である。
<!-- formal-statement-end -->

### 証明の見取り図

閉集合への距離

$$
d(x,C)
$$

を使います。

標本路が連続なので

$$
\tau_C\le t
$$

は「$[0,t]$ 上で $d(X_s,C)$ の最小値が 0」と同値です。

連続関数の infimum は dense な有理時刻だけを見ても同じなので、非可算個の時刻を可算個へ落とせます。

<!-- proof-start -->
### 証明

$t\ge0$ を固定します。

閉集合 $C$ への距離関数

$$
\rho(x)
=
d(x,C)
=
\inf_{y\in C}|x-y|
$$

を考えます。

$\rho$ は 1-Lipschitz なので連続です。各 標本路 $s\mapsto X_s(\omega)$ も連続だから

$$
s\longmapsto
\rho(X_s(\omega))
$$

は $[0,t]$ 上の連続関数です。

$C$ は閉なので

$$
\rho(x)=0
\iff
x\in C.
$$

従って

$$
\{\tau_C\le t\}
=
\left\{
\inf_{0\le s\le t}
\rho(X_s)
=
0
\right\}.
$$

連続関数の infimum は dense subset 上でも同じなので、

$$
\inf_{0\le s\le t}
\rho(X_s)
=
\inf_{q\in\mathbb Q\cap[0,t]}
\rho(X_q).
$$

よって

$$
\{\tau_C\le t\}
=
\bigcap_{m=1}^{\infty}
\bigcup_{q\in\mathbb Q\cap[0,t]}
\left\{
\rho(X_q)<\frac1m
\right\}.
$$

$q\le t$ について $X_q$ は adaptedness により $\mathcal F_q$ 可測であり、

$$
\mathcal F_q\subseteq\mathcal F_t.
$$

$\rho$ は連続なので

$$
\left\{
\rho(X_q)<\frac1m
\right\}
\in
\mathcal F_t.
$$

右辺は可算個の和と共通部分で作られているため

$$
\{\tau_C\le t\}
\in
\mathcal F_t.
$$

$t$ は任意なので $\tau_C$ は stopping time です。
<!-- proof-end -->

ここで 連続な標本路 は、非可算個の時刻を有理時刻へ圧縮するために使いました。closedness は

$$
d(x,C)=0\Rightarrow x\in C
$$

を保証する箇所です。

---

## 9. ランダムな時刻で時計を止める

<a id="def-sto1-stopped-process"></a>

<!-- formal-statement-start -->
> **定義（stopped process）**  
> 過程 $X=(X_t)_{t\ge0}$ と $[0,\infty]$ 値 stopping time $\tau$ に対し、
>
$$
X_t^\tau
=
X_{t\wedge\tau},
\qquad
t\ge0,
$$
>
> を $\tau$ で **stopped process** という。
<!-- formal-statement-end -->

<!-- definition-example-start: def-sto1-stopped-process -->
### 直接例：random walk を初到達時刻で止める

**定義の確認**

simple random walk $S_n$ に対し

$$
\tau
=
\inf\{n\ge0:|S_n|=2\}
$$

とします。

例えば 標本路 が

$$
0,1,0,1,2,1,\ldots
$$

なら $\tau=4$ です。

stopped process は

$$
S_{n\wedge\tau}
=
0,1,0,1,2,2,2,\ldots
$$

となります。

$n<\tau$ では元の過程と同じで、$n\ge\tau$ では値 $S_\tau$ に固定されます。定義式の $n\wedge\tau$ がこの二場合を一つの式にまとめています。
<!-- definition-example-end -->

---

## 10. $\mathcal F_\tau$：停止した瞬間までに知っている情報

時刻 $t$ が deterministic なら情報は $\mathcal F_t$ です。

時刻そのものが random な $\tau$ なら、「$\tau$ までに知っている事象」を別に定義する必要があります。

<a id="def-sto1-stopping-sigma-field"></a>

<!-- formal-statement-start -->
> **定義（stopping time までの sigma-field）**  
> stopping time $\tau$ に対し、
>
$$
\mathcal F_\tau
=
\left\{
A\in\mathcal F:
A\cap\{\tau\le t\}\in\mathcal F_t
\text{ for every }t\ge0
\right\}
$$
>
> と定める。
<!-- formal-statement-end -->

意味は、「時刻 $t$ までに停止していた場合には、$A$ が起きたかどうかも時刻 $t$ までの情報で判定できる」です。

<!-- definition-example-start: def-sto1-stopping-sigma-field -->
### 直接例：定数 stopping time では元の filtration に戻る

**定義の確認**

$\tau\equiv c$ を定数とします。

$A\in\mathcal F_\tau$ なら、$t=c$ で

$$
A\cap\{\tau\le c\}
=
A\cap\Omega
=
A
\in\mathcal F_c.
$$

従って

$$
\mathcal F_\tau\subseteq\mathcal F_c.
$$

逆に $A\in\mathcal F_c$ とします。

$t<c$ なら

$$
\{\tau\le t\}=\varnothing
$$

なので

$$
A\cap\{\tau\le t\}=\varnothing\in\mathcal F_t.
$$

$t\ge c$ なら

$$
A\cap\{\tau\le t\}=A.
$$

filtration の単調性から

$$
A\in\mathcal F_c\subseteq\mathcal F_t.
$$

よって $A\in\mathcal F_\tau$ です。

したがって

$$
\boxed{
\mathcal F_\tau=\mathcal F_c
}
$$

です。random time の定義が deterministic time の情報と整合していることを直接確認できました。
<!-- definition-example-end -->

<a id="prop-sto1-stopping-sigma-field"></a>

<!-- formal-statement-start -->
> **命題（stopping sigma-field の sigma-field 性と単調性）**  
> $\tau$ を stopping time とする。このとき $\mathcal F_\tau$ は $\mathcal F$ の部分 $\sigma$ 代数である。  
> さらに stopping time $\sigma,\tau$ が
>
$$
\sigma\le\tau
$$
>
> を満たすなら
>
$$
\mathcal F_\sigma
\subseteq
\mathcal F_\tau.
$$
<!-- formal-statement-end -->

### 証明の見取り図

$\mathcal F_\tau$ が sigma-field であることは、定義中の

$$
A\mapsto A\cap\{\tau\le t\}
$$

が補集合・可算和と整合することから出ます。

$\sigma\le\tau$ なら

$$
\{\tau\le t\}
\subseteq
\{\sigma\le t\}.
$$

したがって「早い stopping time までに知っている事象」は、遅い stopping time までには当然知っています。

<!-- proof-start -->
### 証明

まず $\mathcal F_\tau$ が $\sigma$ 代数であることを示します。

$\Omega\in\mathcal F$ であり、任意の $t$ について

$$
\Omega\cap\{\tau\le t\}
=
\{\tau\le t\}
\in\mathcal F_t
$$

なので

$$
\Omega\in\mathcal F_\tau.
$$

次に $A\in\mathcal F_\tau$ とします。

$$
A^c\cap\{\tau\le t\}
=
\{\tau\le t\}
\setminus
\bigl(A\cap\{\tau\le t\}\bigr).
$$

右辺の二つの集合はともに $\mathcal F_t$ に属するので

$$
A^c\cap\{\tau\le t\}
\in\mathcal F_t.
$$

従って $A^c\in\mathcal F_\tau$ です。

さらに $A_1,A_2,\ldots\in\mathcal F_\tau$ なら

$$
\left(
\bigcup_{n=1}^{\infty}A_n
\right)
\cap
\{\tau\le t\}
=
\bigcup_{n=1}^{\infty}
\left(
A_n\cap\{\tau\le t\}
\right).
$$

各項は $\mathcal F_t$ に属するので右辺も $\mathcal F_t$ に属します。

従って

$$
\bigcup_{n=1}^{\infty}A_n
\in
\mathcal F_\tau.
$$

よって $\mathcal F_\tau$ は部分 $\sigma$ 代数です。

次に $\sigma\le\tau$ とし、$A\in\mathcal F_\sigma$ を取ります。

任意の $t$ について

$$
\{\tau\le t\}
\subseteq
\{\sigma\le t\}.
$$

従って

$$
A\cap\{\tau\le t\}
=
\bigl(A\cap\{\sigma\le t\}\bigr)
\cap
\{\tau\le t\}.
$$

$A\in\mathcal F_\sigma$ だから

$$
A\cap\{\sigma\le t\}\in\mathcal F_t.
$$

また $\tau$ は stopping time なので

$$
\{\tau\le t\}\in\mathcal F_t.
$$

従ってその共通部分も $\mathcal F_t$ に属します。

ゆえに

$$
A\in\mathcal F_\tau.
$$

以上より

$$
\mathcal F_\sigma
\subseteq
\mathcal F_\tau.
$$
<!-- proof-end -->

---

## 11. progressive なら random time に代入できる

ここで progressive measurability の目的が回収されます。

fixed time $t$ で $X_t$ が measurable なだけでは、random time $\tau(\omega)$ を代入した

$$
X_{\tau(\omega)}(\omega)
$$

の可測性は自動ではありません。

progressive なら、$\tau$ を時間変数へ代入できます。

<a id="thm-sto1-stopping-evaluation"></a>

<!-- formal-statement-start -->
> **定理（progressive process の stopping time 評価）**  
> $X=(X_t)_{t\ge0}$ を実数値 progressively measurable process、$\tau$ を stopping time とする。  
> $\tau<\infty$ のとき
>
$$
X_\tau(\omega)
=
X_{\tau(\omega)}(\omega)
$$
>
> と定める。すると
>
$$
X_\tau 1_{\{\tau<\infty\}}
$$
>
> は $\mathcal F_\tau$ 可測である。  
> 特に各 $t\ge0$ について
>
$$
X_{t\wedge\tau}
$$
>
> は $\mathcal F_t$ 可測であり、stopped process $X^\tau$ は adapted である。
<!-- formal-statement-end -->

### 証明の見取り図

固定した $t$ に対し、$\tau\wedge t$ は $\mathcal F_t$ 可測な $[0,t]$ 値確率変数です。

progressive measurability により

$$
(s,\omega)\mapsto X_s(\omega)
$$

は $[0,t]\times\Omega$ 上で積可測です。

そこで measurable map

$$
\omega
\longmapsto
(\tau(\omega)\wedge t,\omega)
$$

を代入すると $X_{\tau\wedge t}$ の $\mathcal F_t$ 可測性が得られます。

<!-- proof-start -->
### 証明

まず $t\ge0$ を固定し、

$$
\rho
=
\tau\wedge t
$$

と置きます。

$\rho$ が $\mathcal F_t$ 可測であることを確認します。

$0\le a<t$ なら

$$
\{\rho\le a\}
=
\{\tau\le a\}
\in
\mathcal F_a
\subseteq
\mathcal F_t.
$$

$a\ge t$ なら

$$
\{\rho\le a\}=\Omega.
$$

従って $\rho$ は $\mathcal F_t$ 可測な $[0,t]$ 値確率変数です。

次に写像

$$
\Phi_t:
\Omega\to[0,t]\times\Omega,
\qquad
\Phi_t(\omega)
=
(\rho(\omega),\omega)
$$

を考えます。

長方形 $B\times A$、$B\in\mathcal B([0,t])$、$A\in\mathcal F_t$ に対して

$$
\Phi_t^{-1}(B\times A)
=
\{\rho\in B\}\cap A
\in
\mathcal F_t.
$$

従って $\Phi_t$ は

$$
\mathcal F_t
/
\bigl(\mathcal B([0,t])\otimes\mathcal F_t\bigr)
$$

可測です。

$X$ は progressive なので、その $[0,t]\times\Omega$ 制限は

$$
\mathcal B([0,t])\otimes\mathcal F_t
$$

可測です。

したがって合成

$$
\omega
\longmapsto
X_{\rho(\omega)}(\omega)
=
X_{\tau\wedge t}(\omega)
$$

は $\mathcal F_t$ 可測です。

これで stopped process $X^\tau$ が adapted であることが示されました。

次に

$$
Y
=
X_\tau 1_{\{\tau<\infty\}}
$$

の $\mathcal F_\tau$ 可測性を示します。

Borel 集合 $B\subseteq\mathbb R$ について、まず $0\notin B$ の場合を考えます。

任意の $t$ に対し

$$
\{Y\in B\}
\cap
\{\tau\le t\}
=
\{X_\tau\in B\}
\cap
\{\tau\le t\}.
$$

$\{\tau\le t\}$ 上では

$$
\tau\wedge t=\tau
$$

なので

$$
\{X_\tau\in B\}
\cap
\{\tau\le t\}
=
\{X_{\tau\wedge t}\in B\}
\cap
\{\tau\le t\}.
$$

右辺は、$X_{\tau\wedge t}$ の $\mathcal F_t$ 可測性と stopping time の定義から $\mathcal F_t$ に属します。

従って

$$
\{Y\in B\}\in\mathcal F_\tau.
$$

$0\in B$ の場合は

$$
\{Y\in B\}
=
\{Y\notin B^c\}^c
$$

を使います。$0\notin B^c$ なので上の議論を $B^c$ に適用でき、$\mathcal F_\tau$ は sigma-field だから補集合も $\mathcal F_\tau$ に属します。

よって $Y$ は $\mathcal F_\tau$ 可測です。
<!-- proof-end -->

この定理で

$$
\boxed{
\text{progressive}
\Rightarrow
\text{random time に安全に代入できる}
}
$$

という役割が明確になりました。

---

## 12. discrete time では何が簡単になるか

離散時間 $n=0,1,2,\ldots$ では、時刻集合が可算なので連続時間特有の joint measurability の問題がかなり軽くなります。

特に、

- adapted：$X_n$ が $\mathcal F_n$ 可測
- predictable：$H_0$ が $\mathcal F_0$ 可測で、$n\ge1$ では $H_n$ が $\mathcal F_{n-1}$ 可測
- stopping time：$\{\tau\le n\}\in\mathcal F_n$
- stopped process：$X_{n\wedge\tau}$
- stopping sigma-field：$\mathcal F_\tau$

という形で扱えます。

STO2 の martingale では

$$
E[M_{n+1}\mid\mathcal F_n]=M_n
$$

を中心にするため、情報構造はこの離散時間版でまず使います。

---

## 13. どの可測性が何を保証するか

最後に役割を整理します。

| 条件 | 何を保証するか | 後続での主用途 |
|---|---|---|
| stochastic process | 各固定時刻の値が確率変数 | 過程を定義する最小条件 |
| adapted | $X_t$ を時刻 $t$ の情報で読める | martingale、SDE |
| progressive | $[0,T]\times\Omega$ 上で時間と標本を同時に扱える | stopping time 評価、確率積分 |
| predictable | 直前までの情報で integrand / strategy を決める | predictable transform、Itô integral |
| stopping time | 「もう止まったか」を現在までに判定できる | optional sampling、hitting time |
| $\mathcal F_\tau$ | random time $\tau$ までの情報 | $X_\tau$、strong Markov property |

この章で重要なのは、これらを単なる用語一覧として覚えないことです。

$$
\boxed{
\text{未来を使わない}
}
$$

という一つの原理が、対象ごとに異なる可測性条件として現れています。

---

## 14. 演習

### Level A

<a id="ex-sto1-a01"></a>
#### STO1-A01 二回コイントス filtration と adaptedness
- Level: A

$$
\Omega=\{HH,HT,TH,TT\}
$$

に一様確率を入れ、

$$
\mathcal F_0=\{\varnothing,\Omega\},
$$

$$
\mathcal F_1=\sigma(\xi_1),
$$

$$
\mathcal F_2=2^\Omega
$$

とする。

1. $\mathcal F_1$ の要素を全て書け。
2. $S_1=\xi_1$、$S_2=\xi_1+\xi_2$ とするとき、$(S_0,S_1,S_2)$ が $(\mathcal F_0,\mathcal F_1,\mathcal F_2)$ に adapted であることを確認せよ。
3. $Y_1=\xi_2$ は $\mathcal F_1$ 可測でないことを示せ。

<!-- solution-start -->
**詳細解答**

一回目のコインだけを見て区別できるのは

$$
A_H=\{HH,HT\},
\qquad
A_T=\{TH,TT\}
$$

です。

従って

$$
\mathcal F_1
=
\{\varnothing,A_H,A_T,\Omega\}.
$$

次に $S_0=0$ は定数なので $\mathcal F_0$ 可測です。

$S_1=\xi_1$ は

$$
S_1^{-1}(\{1\})=A_H,
\qquad
S_1^{-1}(\{-1\})=A_T
$$

であり、どちらも $\mathcal F_1$ に属します。従って $S_1$ は $\mathcal F_1$ 可測です。

$S_2$ は $\Omega$ 上の関数で、$\mathcal F_2=2^\Omega$ だから自動的に $\mathcal F_2$ 可測です。

よって $S$ は adapted です。

一方、

$$
Y_1=\xi_2
$$

について

$$
Y_1^{-1}(\{1\})
=
\{HH,TH\}.
$$

この集合は $\mathcal F_1$ の四つの要素のどれでもありません。従って $Y_1$ は $\mathcal F_1$ 可測ではありません。

これは「時刻 1 で二回目のコインを知る」ことが future information を使うためです。
<!-- solution-end -->

<a id="ex-sto1-a02"></a>
#### STO1-A02 modification と indistinguishability
- Level: A

$$
\Omega=[0,1]
$$

に Lebesgue 確率測度を入れ、

$$
X_t(\omega)=1_{\{\omega=t\}},
\qquad
Y_t(\omega)=0,
\qquad
0\le t\le1
$$

とする。

1. 各固定 $t$ で $P(X_t=Y_t)=1$ を示せ。
2. $X,Y$ が modification であることを述べよ。
3. indistinguishable でないことを、全時刻同時一致の事象を求めて示せ。

<!-- solution-start -->
**詳細解答**

固定した $t$ について

$$
X_t(\omega)\ne Y_t(\omega)
$$

となるのは

$$
\omega=t
$$

の一点だけです。

Lebesgue 測度では

$$
P(\{t\})=0.
$$

従って

$$
P(X_t=Y_t)=1.
$$

これは全ての固定 $t$ で成り立つので、定義により $X,Y$ は modification です。

一方、任意の $\omega\in[0,1]$ について $t=\omega$ を選べば

$$
X_t(\omega)=1,
\qquad
Y_t(\omega)=0.
$$

従って

$$
\{\omega:
X_t(\omega)=Y_t(\omega)
\text{ for every }t\in[0,1]\}
=
\varnothing.
$$

その確率は 0 です。

よって $X,Y$ は indistinguishable ではありません。

各時刻の零集合

$$
N_t=\{t\}
$$

を非可算個まとめると

$$
\bigcup_{t\in[0,1]}N_t=[0,1]
$$

となることが、modification から indistinguishability が出ない理由です。
<!-- solution-end -->

<a id="ex-sto1-a03"></a>
#### STO1-A03 stopping time と future-dependent random time
- Level: A

離散時間コイントスで

$$
\mathcal F_n=\sigma(\xi_1,\ldots,\xi_n)
$$

とする。

$$
\tau
=
\inf\{n\ge1:\xi_n=1\}
$$

と

$$
\sigma
=
\max\{k\in\{1,2,3\}:\xi_k=1\}
$$

を考える。後者では表が一度も出なければ $\sigma=0$ とする。

1. $\tau$ が stopping time であることを示せ。
2. $\sigma$ が stopping time でないことを、$\{\sigma\le1\}$ を使って示せ。

<!-- solution-start -->
**詳細解答**

$n\ge1$ について

$$
\{\tau\le n\}
=
\bigcup_{k=1}^n
\{\xi_k=1\}.
$$

各 $\{\xi_k=1\}$ は

$$
\mathcal F_k\subseteq\mathcal F_n
$$

に属するので

$$
\{\tau\le n\}\in\mathcal F_n.
$$

従って $\tau$ は stopping time です。

次に $\sigma$ を考えます。

$\sigma\le1$ であるためには二回目と三回目で表が出てはいけません。従って

$$
\{\sigma\le1\}
=
\{\xi_2=-1,\xi_3=-1\}.
$$

この事象は $\xi_2,\xi_3$ を知らないと判定できません。

例えば標本 $HHH$ と $HTT$ は一回目の結果がどちらも $H$ なので $\mathcal F_1$ では区別できませんが、

$$
HHH\notin\{\sigma\le1\},
\qquad
HTT\in\{\sigma\le1\}.
$$

従って

$$
\{\sigma\le1\}\notin\mathcal F_1.
$$

よって $\sigma$ は stopping time ではありません。
<!-- solution-end -->

<a id="ex-sto1-a04"></a>
#### STO1-A04 simple predictable process
- Level: A

$0\le s<t$、$A\in\mathcal F_s$ とし、

$$
H_u
=
3\,1_A\,1_{(s,t]}(u)
-
2\,1_{A^c}\,1_{(t,t+1]}(u)
$$

とする。

1. 第一項が predictable であることを示せ。
2. 第二項が predictable であるために必要な情報時刻を確認せよ。
3. $H$ が predictable であることを示せ。

<!-- solution-start -->
**詳細解答**

第一項の support は

$$
(s,t]\times A
$$

です。

$A\in\mathcal F_s$ なので、これは predictable sigma-field の生成集合です。従って

$$
1_A1_{(s,t]}
$$

は predictable です。

第二項について係数は $1_{A^c}$ です。

$$
A\in\mathcal F_s
\subseteq
\mathcal F_t
$$

なので

$$
A^c\in\mathcal F_t.
$$

従って

$$
(t,t+1]\times A^c
$$

も predictable sigma-field の生成集合です。

よって

$$
1_{A^c}1_{(t,t+1]}
$$

は predictable です。

predictable 可測関数の定数倍と有限和は predictable なので

$$
H
=
3\,1_A1_{(s,t]}
-
2\,1_{A^c}1_{(t,t+1]}
$$

も predictable です。

第二区間の係数を決める時刻は $t$ であり、$A$ はそれ以前の時刻 $s$ に既に判定可能なので future information は使っていません。
<!-- solution-end -->

### Level B

<a id="ex-sto1-b01"></a>
#### STO1-B01 right-continuous adapted process の progressive 性を再構成する
- Level: B

$X$ を実数値 adapted process とし、全ての 標本路 が右連続であるとする。

固定した $T>0$ に対し

$$
t_k^{(n)}
=
\frac{kT}{2^n}
$$

と置き、

$$
X_t^{(n)}
=
X_0 1_{\{0\}}(t)
+
\sum_{k=0}^{2^n-1}
X_{t_{k+1}^{(n)}}
1_{(t_k^{(n)},t_{k+1}^{(n)}]}(t)
$$

を考える。

1. $X^{(n)}$ が $\mathcal B([0,T])\otimes\mathcal F_T$ 可測であることを示せ。
2. 各 $(t,\omega)$ で $X_t^{(n)}(\omega)\to X_t(\omega)$ を示せ。
3. $X$ が progressive であることを結論せよ。
4. 右連続性が証明のどこで使われたかを明記せよ。

<!-- solution-start -->
**詳細解答**

adaptedness から各 grid point で

$$
X_{t_{k+1}^{(n)}}
$$

は

$$
\mathcal F_{t_{k+1}^{(n)}}
$$

可測です。

しかも

$$
t_{k+1}^{(n)}\le T
$$

なので filtration の単調性より

$$
\mathcal F_{t_{k+1}^{(n)}}
\subseteq
\mathcal F_T.
$$

従って

$$
(t,\omega)
\mapsto
X_{t_{k+1}^{(n)}}(\omega)
1_{(t_k^{(n)},t_{k+1}^{(n)}]}(t)
$$

は

$$
\mathcal B([0,T])\otimes\mathcal F_T
$$

可測です。

有限和である $X^{(n)}$ も可測です。

次に $t<T$ を固定し、$t$ を含む区間の右端を $r_n(t)$ とします。

$$
0\le r_n(t)-t\le\frac{T}{2^n},
$$

したがって

$$
r_n(t)\to t
$$

かつ常に $r_n(t)\ge t$ です。

右連続性から

$$
X_{r_n(t)}(\omega)
\to
X_t(\omega).
$$

$t=T$ では

$$
X_T^{(n)}=X_T.
$$

従って全ての $(t,\omega)$ で

$$
X_t^{(n)}(\omega)\to X_t(\omega).
$$

可測関数列の点ごとの極限は可測なので、$X$ の $[0,T]$ 制限は

$$
\mathcal B([0,T])\otimes\mathcal F_T
$$

可測です。

$T$ は任意だったため $X$ は progressive です。

右連続性は

$$
X_{r_n(t)}(\omega)\to X_t(\omega)
$$

を得る箇所で使いました。adaptedness だけでは、この step approximation が元の process へ収束する保証はありません。
<!-- solution-end -->

<a id="ex-sto1-b02"></a>
#### STO1-B02 closed set への first hitting time
- Level: B

$X$ を $\mathbb R^d$ 値 continuous adapted process、$C\subseteq\mathbb R^d$ を closed set とする。

$$
\tau_C
=
\inf\{t\ge0:X_t\in C\}
$$

と置く。

1. 距離関数 $\rho(x)=d(x,C)$ が continuous であることを示せ。
2. fixed $t$ に対し
   $$
   \{\tau_C\le t\}
   =
   \left\{
   \inf_{q\in\mathbb Q\cap[0,t]}
   \rho(X_q)=0
   \right\}
   $$
   を示せ。
3. 右辺を可算和・可算共通部分で表し、$\mathcal F_t$ 可測性を示せ。
4. closedness と 標本路の連続性 がそれぞれどこで必要か説明せよ。

<!-- solution-start -->
**詳細解答**

任意の $x,y\in\mathbb R^d$ に対し triangle inequality から

$$
d(x,C)
\le
|x-y|+d(y,C).
$$

従って

$$
d(x,C)-d(y,C)
\le
|x-y|.
$$

$x,y$ を入れ替えると

$$
|d(x,C)-d(y,C)|
\le
|x-y|.
$$

よって $\rho$ は 1-Lipschitz、特に continuous です。

$C$ が closed なので

$$
\rho(x)=0
\iff
x\in C.
$$

従って

$$
\tau_C\le t
$$

は

$$
\min_{0\le s\le t}\rho(X_s)=0
$$

と同値です。

$s\mapsto\rho(X_s)$ は continuous で、$\mathbb Q\cap[0,t]$ は dense だから

$$
\inf_{0\le s\le t}\rho(X_s)
=
\inf_{q\in\mathbb Q\cap[0,t]}\rho(X_q).
$$

したがって

$$
\{\tau_C\le t\}
=
\left\{
\inf_{q\in\mathbb Q\cap[0,t]}
\rho(X_q)=0
\right\}.
$$

非負量の infimum が 0 であることは

$$
\forall m\ge1,\quad
\exists q\in\mathbb Q\cap[0,t]:
\rho(X_q)<\frac1m
$$

と同値なので

$$
\{\tau_C\le t\}
=
\bigcap_{m=1}^{\infty}
\bigcup_{q\in\mathbb Q\cap[0,t]}
\left\{
\rho(X_q)<\frac1m
\right\}.
$$

$q\le t$ なら adaptedness から $X_q$ は $\mathcal F_q$ 可測で、

$$
\mathcal F_q\subseteq\mathcal F_t.
$$

$\rho$ は continuous だから

$$
\{\rho(X_q)<1/m\}\in\mathcal F_t.
$$

右辺は可算演算なので $\mathcal F_t$ に属します。

従って $\tau_C$ は stopping time です。

closedness は

$$
d(x,C)=0\Rightarrow x\in C
$$

に使い、標本路の連続性 は全時刻の infimum を有理時刻の infimumへ落とす箇所に使いました。
<!-- solution-end -->

<a id="ex-sto1-b03"></a>
#### STO1-B03 stopping sigma-field と stopped value
- Level: B

$\sigma,\tau$ を stopping time とし

$$
\sigma\le\tau
$$

とする。$X$ は real-valued progressive process とする。

1. $\mathcal F_\sigma\subseteq\mathcal F_\tau$ を定義から証明せよ。
2. fixed $t$ に対し $\tau\wedge t$ が $\mathcal F_t$ 可測であることを示せ。
3. $X_{\tau\wedge t}$ が $\mathcal F_t$ 可測であることを示せ。
4. $X_\tau1_{\{\tau<\infty\}}$ が $\mathcal F_\tau$ 可測であることを説明せよ。

<!-- solution-start -->
**詳細解答**

$A\in\mathcal F_\sigma$ を取ります。

$\sigma\le\tau$ なので

$$
\{\tau\le t\}
\subseteq
\{\sigma\le t\}.
$$

従って

$$
A\cap\{\tau\le t\}
=
\bigl(A\cap\{\sigma\le t\}\bigr)
\cap
\{\tau\le t\}.
$$

$A\in\mathcal F_\sigma$ から第一因子は $\mathcal F_t$ に属し、$\tau$ が stopping time だから第二因子も $\mathcal F_t$ に属します。

よって

$$
A\cap\{\tau\le t\}\in\mathcal F_t
$$

であり、

$$
A\in\mathcal F_\tau.
$$

したがって

$$
\mathcal F_\sigma\subseteq\mathcal F_\tau.
$$

次に

$$
\rho=\tau\wedge t
$$

と置きます。

$a<t$ なら

$$
\{\rho\le a\}
=
\{\tau\le a\}
\in\mathcal F_a
\subseteq\mathcal F_t.
$$

$a\ge t$ なら $\{\rho\le a\}=\Omega$ です。

従って $\rho$ は $\mathcal F_t$ 可測です。

progressive measurability により

$$
(s,\omega)\mapsto X_s(\omega)
$$

は $[0,t]\times\Omega$ 上で

$$
\mathcal B([0,t])\otimes\mathcal F_t
$$

可測です。

一方

$$
\omega\mapsto(\rho(\omega),\omega)
$$

は $\mathcal F_t$ からこの積 $\sigma$ 代数への可測写像です。

合成して

$$
X_{\tau\wedge t}
$$

は $\mathcal F_t$ 可測です。

最後に $B$ を Borel set とします。$0\notin B$ なら

$$
\{X_\tau1_{\{\tau<\infty\}}\in B\}
\cap
\{\tau\le t\}
$$

は

$$
\{X_{\tau\wedge t}\in B\}
\cap
\{\tau\le t\}
$$

に等しく、$\mathcal F_t$ に属します。

$0\in B$ の場合は補集合へ移して同じ議論を使えます。

従って

$$
X_\tau1_{\{\tau<\infty\}}
$$

は $\mathcal F_\tau$ 可測です。
<!-- solution-end -->

### Level C

<a id="ex-sto1-c01"></a>
#### STO1-C01 random walk を「情報・停止・predictability」まで一つにまとめる
- Level: C

$\xi_1,\xi_2,\ldots$ を $\{-1,1\}$ 値確率変数列とし、

$$
S_0=0,
\qquad
S_n=\sum_{k=1}^n\xi_k,
$$

$$
\mathcal F_n
=
\sigma(\xi_1,\ldots,\xi_n)
$$

とする。独立性や同分布性は仮定しなくてよい。

境界 $a\in\mathbb N$ に対し

$$
\tau
=
\inf\{n\ge0:|S_n|\ge a\}
$$

と置く。

さらに

$$
H_n
=
1_{\{\tau\ge n\}},
\qquad
n\ge1
$$

とする。

1. $S$ が $(\mathcal F_n)$ に adapted であることを示せ。
2. $\tau$ が stopping time であることを示せ。
3. $H_n$ が $\mathcal F_{n-1}$ 可測であり、離散時間の意味で predictable であることを示せ。
4. identity
   $$
   S_{n\wedge\tau}
   =
   \sum_{k=1}^n
   H_k\xi_k
   $$
   を pathwise に証明せよ。
5. 右辺で係数 $H_k$ が $\xi_k$ を観測する前に決まっていることを説明せよ。
6. $\sigma=\sup\{k\le N:S_k=0\}$ のような last visit time が一般に stopping time でない理由を説明せよ。

<!-- solution-start -->
**詳細解答**

#### 1. adaptedness

各 $n$ について

$$
S_n
=
\xi_1+\cdots+\xi_n.
$$

$\xi_1,\ldots,\xi_n$ は全て $\mathcal F_n$ 可測なので、その有限和 $S_n$ も $\mathcal F_n$ 可測です。

従って $S$ は adapted です。

#### 2. first boundary hitting time

$n\ge0$ に対し

$$
\{\tau\le n\}
=
\left\{
\max_{0\le k\le n}|S_k|
\ge a
\right\}.
$$

各 $S_k$ は

$$
\mathcal F_k\subseteq\mathcal F_n
$$

可測です。

有限個の可測確率変数の最大値も $\mathcal F_n$ 可測なので

$$
\{\tau\le n\}\in\mathcal F_n.
$$

従って $\tau$ は stopping time です。

#### 3. $H_n$ の predictability

$$
H_n
=
1_{\{\tau\ge n\}}
=
1_{\{\tau>n-1\}}.
$$

離散時間では

$$
\{\tau>n-1\}
=
\{\tau\le n-1\}^c.
$$

$\tau$ が stopping time だから

$$
\{\tau\le n-1\}\in\mathcal F_{n-1}.
$$

従って

$$
\{\tau\ge n\}\in\mathcal F_{n-1}.
$$

よって $H_n$ は $\mathcal F_{n-1}$ 可測です。

つまり第 $n$ 増分 $\xi_n$ を見る前に $H_n$ を決められます。

#### 4. stopped random walk の predictable transform 表現

固定した 標本路 を一つ取ります。

$\tau>n$ なら $H_k=1$ が $k=1,\ldots,n$ で成り立つので

$$
\sum_{k=1}^nH_k\xi_k
=
\sum_{k=1}^n\xi_k
=
S_n
=
S_{n\wedge\tau}.
$$

次に $\tau\le n$ とします。

$k\le\tau$ なら

$$
\tau\ge k
$$

なので $H_k=1$ です。

$k>\tau$ なら $H_k=0$ です。

従って

$$
\sum_{k=1}^nH_k\xi_k
=
\sum_{k=1}^{\tau}\xi_k
=
S_\tau
=
S_{n\wedge\tau}.
$$

二場合を合わせて

$$
\boxed{
S_{n\wedge\tau}
=
\sum_{k=1}^nH_k\xi_k
}
$$

が pathwise に成り立ちます。

#### 5. なぜ先読みしていないか

係数 $H_k$ は

$$
\mathcal F_{k-1}
$$

可測です。

したがって $H_k$ を決めるために使えるのは

$$
\xi_1,\ldots,\xi_{k-1}
$$

までです。

現在の増分 $\xi_k$ はまだ見ていません。

この「係数を先に決め、その後で増分が来る」という順序が STO2 の predictable transform と martingale gain の基本形になります。

#### 6. last visit time が stopping time でない理由

$$
\sigma
=
\sup\{k\le N:S_k=0\}
$$

を考えます。

$\sigma\le n$ と判定するには、時刻 $n$ までに 0 を訪れたかだけでは足りません。

その後の

$$
n+1,\ldots,N
$$

で再び 0 に戻らないことまで確認する必要があります。

従って一般に

$$
\{\sigma\le n\}
$$

は $\mathcal F_n$ では判定できず、future information を使います。

first hitting time と last visit time の差は

$$
\boxed{
\text{停止した事実を現在確認できるか}
}
$$

にあります。
<!-- solution-end -->

---

## 15. この章のまとめ

STO1 では、確率過程を「確率変数を時間で並べたもの」から始め、そこへ情報構造を追加しました。

$$
\boxed{
\mathcal F_s\subseteq\mathcal F_t
\qquad
(s\le t)
}
$$

が filtration の核です。

その上で

$$
\boxed{
\text{adapted}
=
\text{時刻 }t\text{ の値を }\mathcal F_t\text{ で読める}
}
$$

とし、右連続な標本路 を加えることで progressive measurability を導きました。

predictable process はさらに強く、

$$
\boxed{
\text{操作を未来の情報で決めない}
}
$$

ための可測性です。

stopping time は

$$
\boxed{
\{\tau\le t\}\in\mathcal F_t
}
$$

によって、「もう止まったか」を現在の情報だけで判定できる random time として定義しました。

そして

$$
\mathcal F_\tau
$$

と progressive process の stopping-time evaluation を通して

$$
X_\tau
$$

を random time の情報として正しく扱えるところまで閉じました。

次の STO2 では、この情報構造の上に

$$
E[M_{n+1}\mid\mathcal F_n]=M_n
$$

を置き、martingale・optional sampling・Doob decomposition・maximal inequality・upcrossing・収束定理へ進みます。
