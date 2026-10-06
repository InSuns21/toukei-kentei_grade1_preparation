# HJC4 決定論的微分ゲーム・Hamilton--Jacobi--Isaacs

<!-- definition-example-audit: strict -->

HJC1--HJC3 では、一人の意思決定者が制御 $u$ を選び、cost を最小にする問題を扱いました。dynamic programming principle から HJB が現れ、value function が滑らかでなくても粘性解として特徴付けられることまで分かりました。

しかし、追跡・回避、ロバスト制御、競争する主体のように、もう一人がこちらに不利な方向へ操作する場合は事情が変わります。

たとえば同じ瞬間に

- プレイヤー MIN は cost を小さくしたい、
- プレイヤー MAX は cost を大きくしたい、

とします。局所的な式が

$$
Q(a,b)
$$

で与えられても、

$$
\sup_b\inf_a Q(a,b)
$$

と

$$
\inf_a\sup_b Q(a,b)
$$

は一般には一致しません。

GAME-A2 で学んだ maximin / minimax の弱不等式が、今度は各時刻の Hamiltonian に入り込みます。さらに微分ゲームでは、単に二人の control を同時に並べるだけでは不十分です。相手の過去・現在の control を見て反応してよいのか、未来の control まで知ってよいのかという**情報構造**を指定しなければ、value function 自体が定まりません。

本章の中心は次の流れです。

$$
\boxed{
\text{control}
\to
\text{nonanticipative strategy}
\to
\text{lower / upper value}
\to
\text{lower / upper HJI}
\to
\text{Isaacs condition}
}
$$

最終的には、

$$
\boxed{
H^-=H^+
\quad\Longrightarrow\quad
V^-=V^+
}
$$

を、粘性解と comparison を使って導きます。

---

## 1. 二人零和の制御付き ODE を固定する

状態 $X(s)\in\mathbb R^d$ は

$$
\dot X(s)
=
f(X(s),u(s),v(s)),
\qquad
X(t)=x
$$

に従うとします。

MIN は control $u(s)\in U$ を選び、MAX は control $v(s)\in V$ を選びます。

payoff は

$$
J_{t,x}(u,v)
=
g(X(T))
+
\int_t^T
L(X(s),u(s),v(s))\,ds
$$

です。

MIN は $J$ を小さくし、MAX は $J$ を大きくしたいとします。

本章では論証を一つの枠内で閉じるため、次を standing assumptions とします。

- $U\subset\mathbb R^m$ と $V\subset\mathbb R^\ell$ はコンパクト。
- $f:\mathbb R^d\times U\times V\to\mathbb R^d$ は連続。
- ある $M_f,K_f\ge0$ が存在し、全ての $x,y,a,b$ について

$$
|f(x,a,b)|\le M_f,
$$

$$
|f(x,a,b)-f(y,a,b)|
\le
K_f|x-y|.
$$

- $L:\mathbb R^d\times U\times V\to\mathbb R$ は連続。
- ある $M_L,K_L\ge0$ が存在し、

$$
|L(x,a,b)|\le M_L,
$$

$$
|L(x,a,b)-L(y,a,b)|
\le
K_L|x-y|.
$$

- $g:\mathbb R^d\to\mathbb R$ は bounded Lipschitz。

controls は Lebesgue 可測な $U$ 値・$V$ 値関数とします。HJC1 の区分的連続 control より少し広いクラスですが、$f$ は control 変数について連続で、状態変数について一様 Lipschitz なので、固定した $(u,v)$ に対する積分方程式

$$
X(s)
=
x+\int_t^s f(X(r),u(r),v(r))\,dr
$$

は一意な絶対連続解を持ちます。以後使う Grönwall 評価も HJC1 と同じです。

ここまでは HJC1 の control が二本になっただけです。違いは、次に導入する strategy にあります。

---

## 2. control と strategy は違う

control は、時間の関数

$$
u:[t,T]\to U
$$

そのものです。

一方 strategy は、**相手がどの control を選んだかに応じて、自分の control を返す規則**です。

ただし未来を先読みしてはいけません。以下、ほとんど至る所（almost everywhere; a.e.）での一致を用います。

<a id="def-hjc4-nonanticipative-strategy"></a>
<!-- formal-statement-start -->
### 定義（nonanticipative strategy）

MIN の nonanticipative strategy とは写像

$$
\alpha:\mathcal V[t,T]\to\mathcal U[t,T]
$$

であって、任意の $s\in[t,T]$ と任意の $v_1,v_2$ について、

$$
v_1=v_2
\quad\text{a.e. on }[t,s]
$$

ならば

$$
\alpha[v_1]=\alpha[v_2]
\quad\text{a.e. on }[t,s]
$$

を満たすものをいう。

MAX の nonanticipative strategy は同様に

$$
\beta:\mathcal U[t,T]\to\mathcal V[t,T]
$$

で定義する。
<!-- formal-statement-end -->

この条件は、「時刻 $s$ までの応答を決めるために、相手の $s$ より後の control を使わない」という意味です。

### 直接例

$$
\alpha[v](r)=-v(r)
$$

は nonanticipative です。時刻 $r$ の出力は $v(r)$ までしか使っていません。

一方、

$$
\alpha[v](r)=-v(T)
$$

は $r<T$ で未来の値 $v(T)$ を使うため nonanticipative ではありません。

ここが control と strategy の最初の差です。

control は「一本の予定表」ですが、strategy は「相手の行動履歴に対する応答規則」です。

---

## 3. lower value と upper value

同じゲームでも、どちら側が相手の control へ strategy として反応できるかで二つの値が現れます。

MIN が strategy を持ち、MAX が open-loop control を選ぶ場合を lower game とします。

MAX が strategy を持ち、MIN が open-loop control を選ぶ場合を upper game とします。

<a id="def-hjc4-lower-upper-values"></a>
<!-- formal-statement-start -->
### 定義（lower value / upper value）

MIN の nonanticipative strategies の集合を $\mathcal A[t,T]$、MAX のものを $\mathcal B[t,T]$ とする。

lower value を

$$
V^-(t,x)
=
\inf_{\alpha\in\mathcal A[t,T]}
\sup_{v\in\mathcal V[t,T]}
J_{t,x}(\alpha[v],v)
$$

で定義する。

upper value を

$$
V^+(t,x)
=
\sup_{\beta\in\mathcal B[t,T]}
\inf_{u\in\mathcal U[t,T]}
J_{t,x}(u,\beta[u])
$$

で定義する。
<!-- formal-statement-end -->

この命名で大切なのは式そのものです。

lower game では MIN が相手の control に応答できるので、局所的には

$$
\sup_v\inf_u
$$

の順序が現れます。

upper game では MAX が相手の control に応答できるので、局所的には

$$
\inf_u\sup_v
$$

が現れます。

GAME-A2 の有限ゲームでは混合戦略を導入することで minmax equality を得ました。本章では純粋な deterministic controls のまま進むので、二つの順序は一般には一致しません。

### Isaacs 条件が失敗する最小例

状態を動かさず、

$$
f\equiv0,
\qquad
g\equiv0,
\qquad
U=V=\{-1,1\},
$$

$$
L(u,v)=uv
$$

とします。

MIN が $v$ に反応できる lower game では

$$
u=-v
$$

とすれば

$$
uv=-1.
$$

従って

$$
V^-(t,x)=-(T-t).
$$

一方、MAX が $u$ に反応できる upper game では

$$
v=u
$$

とすれば

$$
uv=1,
$$

なので

$$
V^+(t,x)=T-t.
$$

同じ running cost でも情報構造が違えば value は一致しません。

---

## 4. 微分ゲームの dynamic programming principle

HJC1 の DPP は「最初の短時間」と「その後」を分けました。

微分ゲームでも発想は同じですが、control だけでなく strategy も restriction と concatenation が必要です。

$h>0$ として $t+h\le T$ とします。

lower game の短時間作用素を

$$
\begin{aligned}
(\mathcal S_h^-\psi)(t,x)
=
\inf_{\alpha_h}
\sup_{v_h}
\Bigl\{
&\int_t^{t+h}
L(X(s),\alpha_h[v_h](s),v_h(s))\,ds\\
&+
\psi(t+h,X(t+h))
\Bigr\}
\end{aligned}
$$

と置きます。

upper game では

$$
\begin{aligned}
(\mathcal S_h^+\psi)(t,x)
=
\sup_{\beta_h}
\inf_{u_h}
\Bigl\{
&\int_t^{t+h}
L(X(s),u_h(s),\beta_h[u_h](s))\,ds\\
&+
\psi(t+h,X(t+h))
\Bigr\}.
\end{aligned}
$$

<a id="thm-hjc4-game-dpp"></a>
<!-- formal-statement-start -->
### 定理（微分ゲームの dynamic programming principle）

§1 の standing assumptions の下で、任意の $t<t+h\le T$ に対して

$$
V^-(t,x)
=
(\mathcal S_h^-V^-)(t,x),
$$

$$
V^+(t,x)
=
(\mathcal S_h^+V^+)(t,x)
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

HJC1 と同じく二方向の不等式を示します。

新しい点は、時刻 $t+h$ で到達した状態に応じて continuation strategy を選ぶことです。

到達可能集合は

$$
\overline B(x,M_fh)
$$

に入ります。これはコンパクトなので、$\delta$-net

$$
\{x_1,\dots,x_N\}
$$

を取れます。

各 $x_i$ で $\varepsilon$-optimal continuation strategy を一つ選び、実際の到達点 $y$ を最も近い $x_i$ の領域へ分類して、その continuation strategy を使います。

時刻 $t+h$ の状態 $y$ は、それまでの control 履歴だけから決まるので、この貼り合わせは nonanticipative 性を壊しません。

さらに value function と軌道の Lipschitz 評価から、$y$ を $x_i$ に置き換える誤差は $C\delta$ で抑えられます。

最後に

$$
\varepsilon\downarrow0,
\qquad
\delta\downarrow0
$$

とします。

<!-- proof-start -->
### 証明

lower game を示す。upper game は inf / sup を交換した同じ構成である。

まず全区間 strategy $\alpha$ を一つ取る。その $[t,t+h]$ への restriction を $\alpha_h$ とする。任意の $v_h$ の後に continuation control を連結すれば、定義から

$$
V^-(t,x)
\ge
\inf_{\alpha_h}
\sup_{v_h}
\left\{
\int_t^{t+h}L\,ds
+
V^-(t+h,X(t+h))
\right\}
$$

の向きを得る。

逆向きでは、短時間 strategy $\alpha_h$ を $\varepsilon$-optimal に選ぶ。

到達可能集合 $\overline B(x,M_fh)$ に有限 $\delta$-net $\{x_i\}_{i=1}^N$ を取る。各 $x_i$ に対して

$$
\sup_v
J_{t+h,x_i}(\alpha_i[v],v)
\le
V^-(t+h,x_i)+\varepsilon
$$

となる continuation strategy $\alpha_i$ を選ぶ。

実際の到達点 $y=X(t+h)$ に最も近い $x_i$ を対応させ、時刻 $t+h$ 以後は $\alpha_i$ を使う。

同じ continuation controls を初期値 $y$ と $x_i$ から走らせると、Grönwall 評価により

$$
|X_y(s)-X_{x_i}(s)|
\le
e^{K_f(s-t-h)}|y-x_i|.
$$

従って cost の差は

$$
|J_{t+h,y}-J_{t+h,x_i}|
\le
C|y-x_i|
\le
C\delta
$$

で抑えられる。

よって貼り合わせた全区間 strategy の payoff は

$$
\int_t^{t+h}L\,ds
+
V^-(t+h,y)
+
\varepsilon
+
C\delta
$$

以下にできる。

短時間側の infimum を取り、

$$
V^-(t,x)
\le
(\mathcal S_h^-V^-)(t,x)
+
\varepsilon
+
C\delta.
$$

$\varepsilon,\delta\downarrow0$ とすれば逆向きも得る。従って equality が成り立つ。$\square$
<!-- proof-end -->

DPP の形は HJC1 と似ていますが、

$$
\boxed{
\inf_u
\quad\text{が}\quad
\inf_\alpha\sup_v
}
$$

へ変わったことが本質です。

---

## 5. なぜ二つの Hamiltonian が出るのか

滑らかな test function $\phi$ に対して、短時間作用素の一次項を計算します。

接触点を $(t_0,x_0)$ とし、

$$
p=\nabla\phi(t_0,x_0)
$$

と置きます。

短時間では

$$
|X(s)-x_0|\le M_fh.
$$

軌道上の連鎖律から

$$
\begin{aligned}
&\phi(t_0+h,X(t_0+h))
-\phi(t_0,x_0)\\
&=
\int_{t_0}^{t_0+h}
\{
\phi_t(s,X(s))
+
\nabla\phi(s,X(s))\cdot f(X(s),u(s),v(s))
\}\,ds.
\end{aligned}
$$

したがって DPP の integrand は一次近似で

$$
\phi_t(t_0,x_0)
+
L(x_0,a,b)
+
f(x_0,a,b)\cdot p
$$

です。

ここで

$$
Q_{x,p}(a,b)
=
L(x,a,b)+f(x,a,b)\cdot p
$$

と置きます。

lower game では MIN が $v$ に strategy として反応するので、

$$
\sup_b\inf_a Q_{x,p}(a,b)
$$

が現れます。

upper game では MAX が $u$ に反応するので、

$$
\inf_a\sup_b Q_{x,p}(a,b)
$$

が現れます。

<a id="def-hjc4-isaacs-hamiltonians"></a>
<!-- formal-statement-start -->
### 定義（lower / upper Isaacs Hamiltonian）

$$
H^-(x,p)
=
\sup_{b\in V}
\inf_{a\in U}
\{
L(x,a,b)+f(x,a,b)\cdot p
\},
$$

$$
H^+(x,p)
=
\inf_{a\in U}
\sup_{b\in V}
\{
L(x,a,b)+f(x,a,b)\cdot p
\}.
$$

これらをそれぞれ lower Isaacs Hamiltonian、upper Isaacs Hamiltonian と呼ぶ。
<!-- formal-statement-end -->

GAME-A2 の弱不等式と同じ理由で

$$
\boxed{
H^-(x,p)\le H^+(x,p)
}
$$

です。

実際、任意の $a,b$ について

$$
\inf_{\tilde a}Q(\tilde a,b)
\le
Q(a,b)
\le
\sup_{\tilde b}Q(a,\tilde b).
$$

左辺で $b$ の supremum、右辺で $a$ の infimum を取れば

$$
\sup_b\inf_aQ(a,b)
\le
\inf_a\sup_bQ(a,b)
$$

を得ます。

<a id="def-hjc4-hji"></a>
<!-- formal-statement-start -->
### 定義（lower / upper Hamilton--Jacobi--Isaacs 方程式）

lower value に対応する終端値問題を

$$
V_t^-+H^-(x,\nabla V^-)=0,
\qquad
V^-(T,x)=g(x)
$$

とする。

upper value に対応する終端値問題を

$$
V_t^++H^+(x,\nabla V^+)=0,
\qquad
V^+(T,x)=g(x)
$$

とする。

これらを lower / upper Hamilton--Jacobi--Isaacs 方程式という。
<!-- formal-statement-end -->

HJC3 と同じ backward viscosity convention を使うときは

$$
B^\pm(x,p)=-H^\pm(x,p)
$$

と置き、

$$
-V_t^\pm+B^\pm(x,\nabla V^\pm)=0
$$

と書きます。

---

## 6. 短時間作用素から Hamiltonian の順序を直接確認する

「strategy があるから sup / inf の順序が変わる」と文章だけで済ませず、短時間の stage game を計算します。

時間に依存しない連続関数 $Q(a,b)$ を考えます。

lower game の局所量は

$$
\inf_\alpha
\sup_v
\frac1h
\int_t^{t+h}
Q(\alpha[v](s),v(s))\,ds
$$

です。

任意の strategy $\alpha$ に対して、MAX が定数 control

$$
v(s)\equiv b
$$

を選べば

$$
Q(\alpha[v](s),b)
\ge
\inf_aQ(a,b).
$$

従って

$$
\inf_\alpha\sup_v
\frac1h\int Q\,ds
\ge
\sup_b\inf_aQ(a,b).
$$

逆に、コンパクト性と連続性から各 $b$ に対し

$$
Q(a_\varepsilon(b),b)
\le
\inf_aQ(a,b)+\varepsilon
$$

となる近似 minimizer を選べます。

ここで選択の可測性を曖昧にしないため、$U$ の有限 net

$$
\{a_1,\dots,a_N\}
$$

を十分細かく取り、各 $b$ で「最初に $\varepsilon$-近似最小を達成する番号」を選びます。有限個の連続関数 $Q(a_i,b)$ の大小で領域を分けるので、こうして得る $a_\varepsilon(b)$ は Borel 可測に取れます。

$$
\alpha_\varepsilon[v](s)
=
a_\varepsilon(v(s))
$$

とすれば admissible かつ nonanticipative で、

$$
Q(\alpha_\varepsilon[v](s),v(s))
\le
H^-+\varepsilon.
$$

従って

$$
\inf_\alpha\sup_v
\frac1h\int Q\,ds
\le
H^-+\varepsilon.
$$

$\varepsilon\downarrow0$ とすれば

$$
\boxed{
\inf_\alpha\sup_v
\frac1h\int Q\,ds
=
\sup_b\inf_aQ(a,b)
}.
$$

upper game も同様に

$$
\boxed{
\sup_\beta\inf_u
\frac1h\int Q(u(s),\beta[u](s))\,ds
=
\inf_a\sup_bQ(a,b)
}.
$$

この一行が、HJB から HJI へ変わる局所的な理由です。

---

## 7. lower / upper value は HJI の粘性解になる

HJC3 と同じく、まず regularity を確認します。

固定した $(u,v)$ に対して初期値 $x,y$ から出る軌道を $X_x,X_y$ とすると

$$
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|.
$$

したがって、ある $C>0$ が存在して

$$
|J_{t,x}(u,v)-J_{t,y}(u,v)|
\le
C|x-y|
$$

です。

この定数は controls と strategies に依存しません。

supremum と infimum を取っても同じ Lipschitz 定数が残るので

$$
|V^\pm(t,x)-V^\pm(t,y)|
\le
C|x-y|.
$$

時間方向も DPP と $|f|\le M_f$, $|L|\le M_L$ から

$$
|V^\pm(t,x)-V^\pm(s,x)|
\le
C_t|t-s|.
$$

従って $V^\pm$ は bounded uniformly continuous です。

<a id="thm-hjc4-viscosity-characterization"></a>
<!-- formal-statement-start -->
### 定理（lower / upper value の粘性解特徴付け）

§1 の standing assumptions の下で、

$$
V^-
$$

は

$$
-V_t+B^-(x,\nabla V)=0,
\qquad
V(T,x)=g(x)
$$

の bounded uniformly continuous viscosity solution である。

同様に

$$
V^+
$$

は

$$
-V_t+B^+(x,\nabla V)=0,
\qquad
V(T,x)=g(x)
$$

の bounded uniformly continuous viscosity solution である。

さらに各終端値問題はこの関数クラスで一意解を持つ。
<!-- formal-statement-end -->

### 証明の見取り図

HJC3 の proof mechanism を、短時間作用素 $\mathcal S_h^\pm$ に置き換えます。

$V^--\phi$ が $(t_0,x_0)$ で局所最大なら、近傍で

$$
V^-\le\phi.
$$

DPP から

$$
V^-(t_0,x_0)
=
\mathcal S_h^-V^-(t_0,x_0)
\le
\mathcal S_h^-\phi(t_0,x_0).
$$

従って

$$
0
\le
\frac{
\mathcal S_h^-\phi(t_0,x_0)-\phi(t_0,x_0)
}{h}.
$$

§6 の局所計算と連鎖律から右辺は

$$
\phi_t(t_0,x_0)
+
H^-(x_0,\nabla\phi(t_0,x_0))
+
o(1)
$$

へ収束します。

よって

$$
\phi_t+H^-\ge0.
$$

$B^-=-H^-$ なので

$$
-\phi_t+B^-\le0.
$$

これは viscosity subsolution 条件です。

局所最小では DPP の $\varepsilon$-optimal strategy を取り、逆向きの不等式を得て

$$
\phi_t+H^-\le0,
$$

すなわち

$$
-\phi_t+B^-\ge0
$$

を得ます。

upper value も $\mathcal S_h^+$ を使えば同じです。

<!-- proof-start -->
### 証明

lower value を示す。

上接触 test function $\phi$ を取り、

$$
V^-(t_0,x_0)=\phi(t_0,x_0),
\qquad
V^-\le\phi
$$

とする。

DPP と接触条件から

$$
0
\le
\frac{
\mathcal S_h^-\phi(t_0,x_0)-\phi(t_0,x_0)
}{h}.
$$

軌道上の連鎖律を用いると、短時間作用素の括弧内は

$$
\frac1h
\int_{t_0}^{t_0+h}
\{
\phi_t(s,X(s))
+
L(X(s),u(s),v(s))
+
\nabla\phi(s,X(s))\cdot f(X(s),u(s),v(s))
\}
\,ds.
$$

$|X(s)-x_0|\le M_fh$ と $U,V$ のコンパクト性により、integrand は controls に一様に

$$
\phi_t(t_0,x_0)
+
Q_{x_0,p}(u(s),v(s))
+
o(1),
\qquad
p=\nabla\phi(t_0,x_0)
$$

である。

§6 の局所 stage-game 計算を使うと

$$
0
\le
\phi_t(t_0,x_0)
+
H^-(x_0,p)
+
o(1).
$$

$h\downarrow0$ により

$$
-\phi_t(t_0,x_0)
+
B^-(x_0,p)
\le0.
$$

よって subsolution である。

下接触では $V^-\ge\phi$ とし、DPP の infimum を $h^2$ 以内で達成する短時間 strategy $\alpha_h$ を選ぶ。

すると

$$
0
\ge
\frac{
\mathcal S_h^-\phi(t_0,x_0)-\phi(t_0,x_0)
}{h}
-h.
$$

同じ局所計算から

$$
0
\ge
\phi_t(t_0,x_0)
+
H^-(x_0,p).
$$

従って

$$
-\phi_t(t_0,x_0)
+
B^-(x_0,p)
\ge0.
$$

よって supersolution でもある。

終端では積分区間が空なので

$$
V^-(T,x)=g(x).
$$

したがって $V^-$ は viscosity solution である。

一意性について、$B^-$ は

$$
|B^-(x,p)-B^-(x,q)|
\le
M_f|p-q|
$$

を満たす。

また

$$
|B^-(x,p)-B^-(y,p)|
\le
\{K_L+K_f|p|\}|x-y|.
$$

infimum / supremum は、元の関数族に共通な Lipschitz 評価を保存するためである。

従って HJC3 の backward comparison の proof がそのまま適用できる。

$V^+$ と $B^+$ についても全く同じ評価が成り立つ。よって両終端値問題は bounded uniformly continuous class で一意である。$\square$
<!-- proof-end -->

---

## 8. Isaacs condition が game value を作る

二つの Hamiltonian が一致すれば、lower HJI と upper HJI は同じ PDE になります。

<a id="def-hjc4-isaacs-condition"></a>
<!-- formal-statement-start -->
### 定義（Isaacs condition）

全ての $(x,p)\in\mathbb R^d\times\mathbb R^d$ について

$$
H^-(x,p)=H^+(x,p)
$$

すなわち

$$
\sup_{b\in V}\inf_{a\in U}
\{
L(x,a,b)+f(x,a,b)\cdot p
\}
=
\inf_{a\in U}\sup_{b\in V}
\{
L(x,a,b)+f(x,a,b)\cdot p
\}
$$

が成り立つとき、Isaacs condition が成り立つという。
<!-- formal-statement-end -->

<a id="thm-hjc4-isaacs-value"></a>
<!-- formal-statement-start -->
### 定理（Isaacs condition による game value の存在）

§1 の standing assumptions に加えて Isaacs condition を仮定する。

このとき

$$
V^-(t,x)=V^+(t,x)
$$

が全ての $(t,x)$ で成り立つ。

共通の関数

$$
V(t,x)
$$

は、共通 Hamiltonian

$$
H(x,p)=H^-(x,p)=H^+(x,p)
$$

を用いた HJI 終端値問題の唯一の bounded uniformly continuous viscosity solution である。
<!-- formal-statement-end -->

### 証明の見取り図

HJC4 の特徴は、game value の存在を直接 control / strategy の saddle point 構成から証明しないことです。

代わりに

$$
V^-
\to
\text{lower HJI の唯一解},
$$

$$
V^+
\to
\text{upper HJI の唯一解}
$$

まで先に進みます。

Isaacs condition が成立すれば二つの PDE は同じです。

同じ terminal data を持つ同じ PDE の bounded uniformly continuous viscosity solution は comparison により一意なので、二つの value function は一致します。

<!-- proof-start -->
### 証明

Isaacs condition から

$$
H^-=H^+=H
$$

であり、

$$
B^-=-H^-=-H=B^+.
$$

前節より $V^-$ と $V^+$ はともに

$$
-V_t-H(x,\nabla V)=0,
\qquad
V(T,x)=g(x)
$$

の bounded uniformly continuous viscosity solution である。

同じ終端値問題のこの関数クラスにおける一意性から

$$
V^-=V^+.
$$

従って共通の game value が存在する。$\square$
<!-- proof-end -->

ここで重要な注意があります。

$$
\boxed{
V^-=V^+
}
$$

は value の存在です。

これは

- 最適 open-loop control が存在する、
- 最適 nonanticipative strategy が存在する、
- 一つの control pair が saddle point を作る、

ことと同じではありません。

HJC3 で「value function の特徴付け」と「最適 control の存在」を分けたのと同じです。

---

## 9. pursuit--evasion の最小具体例

一次元で、追跡者 MIN と逃走者 MAX の signed separation を $x$ とします。

追跡者の速度を $u$、逃走者の速度を $v$ として

$$
\dot x=u-v.
$$

速度制約を

$$
|u|\le a,
\qquad
|v|\le b,
\qquad
a>b>0
$$

とします。

running cost はなく、終端距離

$$
g(x)=|x|
$$

を MIN が小さく、MAX が大きくしたいとします。

局所量は

$$
Q(u,v)=p(u-v).
$$

lower Hamiltonian は

$$
\begin{aligned}
H^-(p)
&=
\sup_{|v|\le b}
\inf_{|u|\le a}
p(u-v)\\
&=
\sup_{|v|\le b}
\{-a|p|-pv\}\\
&=
-a|p|+b|p|\\
&=
-(a-b)|p|.
\end{aligned}
$$

upper Hamiltonian は

$$
\begin{aligned}
H^+(p)
&=
\inf_{|u|\le a}
\sup_{|v|\le b}
p(u-v)\\
&=
\inf_{|u|\le a}
\{pu+b|p|\}\\
&=
-a|p|+b|p|\\
&=
-(a-b)|p|.
\end{aligned}
$$

従って Isaacs condition が成立します。

HJI は

$$
V_t-(a-b)|V_x|=0,
\qquad
V(T,x)=|x|.
$$

候補は

$$
\boxed{
V(t,x)
=
\max\{
|x|-(a-b)(T-t),
0
\}
}.
$$

これは「残り時間で追跡者が逃走者より余分に稼げる距離」

$$
(a-b)(T-t)
$$

だけ separation を縮められる、という意味です。

滑らかな領域

$$
|x|>(a-b)(T-t)
$$

では

$$
V_t=a-b,
\qquad
|V_x|=1
$$

なので

$$
V_t-(a-b)|V_x|
=
(a-b)-(a-b)=0.
$$

内側

$$
|x|<(a-b)(T-t)
$$

では $V=0$ なので PDE も成り立ちます。

切替境界では微分できませんが、HJC2--HJC3 と同じ test-function 判定により viscosity solution です。

この例は

$$
\boxed{
\text{追跡・回避の相対速度}
\longleftrightarrow
\text{Isaacs Hamiltonian}
}
$$

を最小の式で見せています。

---

## 10. Isaacs condition が失敗すると何が壊れるか

§3 の

$$
L(u,v)=uv,
\qquad
U=V=\{-1,1\}
$$

へ戻ります。

ここでは

$$
H^-
=
\sup_v\inf_u uv
=
-1,
$$

$$
H^+
=
\inf_u\sup_v uv
=
1.
$$

従って二つの HJI は

$$
V_t^- -1=0,
\qquad
V^-(T)=0,
$$

$$
V_t^+ +1=0,
\qquad
V^+(T)=0.
$$

解は

$$
V^-(t)=-(T-t),
$$

$$
V^+(t)=T-t.
$$

です。

つまり壊れたのは単なる記法ではありません。

$$
\boxed{
\sup\inf\ne\inf\sup
}
$$

により

1. Hamiltonian が二つに分かれ、
2. HJI が二つに分かれ、
3. value function も二つに分かれます。

「Isaacs condition は PDE を一つにする条件」であると同時に、「情報構造の違いが value に残らない条件」でもあります。

---

## 11. 非ゼロ和ゲームとの境界

本章は二人零和ゲームです。

MIN の cost が $J$、MAX の利得が同じ $J$ なので、両者の目的は完全に逆向きです。

非ゼロ和微分ゲームでは、プレイヤーごとに

$$
J_1,
\qquad
J_2
$$

のような別々の目的関数を持ちます。

その場合、単一の lower / upper value と単一の Isaacs equation へ還元することはできません。Nash equilibrium を時間発展系の上で考える別の理論が必要になります。

従って本章の射程は

$$
\boxed{
\text{二人}
+
\text{零和}
+
\text{完全状態観測}
+
\text{決定論的 ODE}
}
$$

です。

次の HJC5 では相手ではなく Brown 運動が加わり、Itô formula の二次変分から二階 HJB が現れます。

その後 HJC6 で、

$$
\text{微分ゲーム}
+
\text{確率制御}
$$

を合流させて二階 Isaacs 方程式へ進みます。

---

# 演習

## Level A

### A1 nonanticipative か判定せよ

- Level: A

次の二つの写像を判定せよ。

1.

$$
\alpha[v](s)=\tanh(v(s)).
$$

2.

$$
\widetilde\alpha[v](s)=\tanh(v(T)).
$$

<!-- solution-start -->
### 詳細解答

1 は nonanticipative である。

実際、$v_1=v_2$ a.e. on $[t,r]$ なら

$$
\tanh(v_1(s))
=
\tanh(v_2(s))
$$

が a.e. on $[t,r]$ で成り立つ。

従って

$$
\alpha[v_1]=\alpha[v_2]
$$

a.e. on $[t,r]$ である。

2 は一般には nonanticipative でない。

$r<T$ を取り、$[t,r]$ では一致するが

$$
v_1(T)\ne v_2(T)
$$

となる二つの controls を選ぶ。

すると $s\le r$ でも

$$
\widetilde\alpha[v_1](s)
=
\tanh(v_1(T))
\ne
\tanh(v_2(T))
=
\widetilde\alpha[v_2](s).
$$

未来の control を使って現在の応答を決めているためである。
<!-- solution-end -->

### A2 lower / upper Hamiltonian を計算せよ

- Level: A

$$
U=V=\{-1,1\},
\qquad
Q(u,v)=uv
$$

に対して

$$
\sup_v\inf_uQ(u,v),
\qquad
\inf_u\sup_vQ(u,v)
$$

を求めよ。

<!-- solution-start -->
### 詳細解答

$v=1$ のとき

$$
\inf_{u\in\{-1,1\}}u=-1.
$$

$v=-1$ のときも

$$
\inf_{u\in\{-1,1\}}(-u)=-1.
$$

従って

$$
\sup_v\inf_uQ(u,v)=-1.
$$

一方、$u=1$ のとき

$$
\sup_v v=1,
$$

$u=-1$ のときも

$$
\sup_v(-v)=1.
$$

従って

$$
\inf_u\sup_vQ(u,v)=1.
$$

よって Isaacs condition は失敗する。
<!-- solution-end -->

### A3 二つの最適化順序を比較せよ

- Level: A

任意の実数値関数 $Q(a,b)$ について

$$
\sup_b\inf_aQ(a,b)
\le
\inf_a\sup_bQ(a,b)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

任意の固定した $a,b$ に対して

$$
\inf_{\tilde a}Q(\tilde a,b)
\le
Q(a,b)
$$

である。

さらに

$$
Q(a,b)
\le
\sup_{\tilde b}Q(a,\tilde b).
$$

従って

$$
\inf_{\tilde a}Q(\tilde a,b)
\le
\sup_{\tilde b}Q(a,\tilde b)
$$

が全ての $a,b$ で成り立つ。

左辺について $b$ の supremum を取り、

$$
\sup_b\inf_{\tilde a}Q(\tilde a,b)
\le
\sup_{\tilde b}Q(a,\tilde b)
$$

を得る。

これは全ての $a$ で成り立つので、右辺で $a$ の infimum を取れば

$$
\sup_b\inf_aQ(a,b)
\le
\inf_a\sup_bQ(a,b).
$$
<!-- solution-end -->

### A4 pursuit--evasion の Hamiltonian

- Level: A

$$
Q(u,v)=p(u-v),
\qquad
|u|\le a,
\qquad
|v|\le b
$$

に対して $H^-$ と $H^+$ を求めよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\inf_{|u|\le a}pu=-a|p|.
$$

従って

$$
\begin{aligned}
H^-(p)
&=
\sup_{|v|\le b}
\{-a|p|-pv\}\\
&=
-a|p|+b|p|\\
&=
-(a-b)|p|.
\end{aligned}
$$

次に

$$
\sup_{|v|\le b}(-pv)=b|p|.
$$

よって

$$
\begin{aligned}
H^+(p)
&=
\inf_{|u|\le a}
\{pu+b|p|\}\\
&=
-a|p|+b|p|\\
&=
-(a-b)|p|.
\end{aligned}
$$

従って全ての $p$ で

$$
H^-(p)=H^+(p).
$$

Isaacs condition が成立する。
<!-- solution-end -->

### A5 backward form の符号

- Level: A

$$
V_t+H(x,\nabla V)=0
$$

に対して

$$
B(x,p)=-H(x,p)
$$

と置く。

上接触 test function $\phi$ に対する viscosity subsolution 条件を $B$ を用いて書き、$H$ を用いる形へ直せ。

<!-- solution-start -->
### 詳細解答

backward form は

$$
-V_t+B(x,\nabla V)=0
$$

である。

上接触 test function に対する subsolution 条件は

$$
-\phi_t+B(x,\nabla\phi)\le0.
$$

$B=-H$ を代入すると

$$
-\phi_t-H(x,\nabla\phi)\le0.
$$

両辺へ $-1$ を掛ければ

$$
\phi_t+H(x,\nabla\phi)\ge0.
$$

終端値問題の DPP から上接触側で得られる不等式と一致する。
<!-- solution-end -->

## Level B

### B1 lower stage game の consistency

- Level: B

連続関数 $Q:U\times V\to\mathbb R$ とコンパクト集合 $U,V$ を考える。

$$
\Lambda_h
=
\inf_\alpha
\sup_v
\frac1h
\int_t^{t+h}
Q(\alpha[v](s),v(s))\,ds
$$

とする。

$$
\Lambda_h
=
\sup_b\inf_aQ(a,b)
$$

を示せ。

<!-- solution-start -->
### 詳細解答

まず任意の strategy $\alpha$ を固定する。

任意の $b\in V$ に対し定数 control

$$
v_b(s)\equiv b
$$

を入れる。

各 $s$ で

$$
Q(\alpha[v_b](s),b)
\ge
\inf_aQ(a,b)
$$

なので

$$
\frac1h
\int_t^{t+h}
Q(\alpha[v_b](s),b)\,ds
\ge
\inf_aQ(a,b).
$$

従って

$$
\sup_v
\frac1h\int Q\,ds
\ge
\sup_b\inf_aQ(a,b).
$$

これは全ての $\alpha$ に対して成り立つから

$$
\Lambda_h
\ge
\sup_b\inf_aQ(a,b).
$$

逆向きを示す。

任意の $\varepsilon>0$ を取る。$U$ の有限 net を十分細かく取り、各 $b$ についてその有限集合の中から

$$
Q(a_\varepsilon(b),b)
\le
\inf_aQ(a,b)+\varepsilon
$$

を満たす最初の点を選ぶ。有限個の連続関数の大小で選択領域が決まるため、$b\mapsto a_\varepsilon(b)$ は Borel 可測に取れる。

strategy を

$$
\alpha_\varepsilon[v](s)
=
a_\varepsilon(v(s))
$$

と定める。$v$ は可測なので $\alpha_\varepsilon[v]$ も可測であり、時刻 $s$ の $v(s)$ だけを使うので nonanticipative である。

すると

$$
Q(\alpha_\varepsilon[v](s),v(s))
\le
\inf_aQ(a,v(s))+\varepsilon
\le
\sup_b\inf_aQ(a,b)+\varepsilon.
$$

積分しても同じ上界が保たれる。

従って

$$
\Lambda_h
\le
\sup_b\inf_aQ(a,b)+\varepsilon.
$$

$\varepsilon\downarrow0$ とすれば逆向きも得る。よって equality が成り立つ。
<!-- solution-end -->

### B2 DPP の貼り合わせで有限 net を使う理由

- Level: B

時刻 $t+h$ の到達状態ごとに continuation strategy を選びたいとする。

なぜ到達可能集合の有限 $\delta$-net を使えば、無限個の状態に対する strategy 選択を有限個へ落とせるのか説明せよ。

<!-- solution-start -->
### 詳細解答

$|f|\le M_f$ なので、時刻 $t+h$ の到達点 $y$ は

$$
|y-x|\le M_fh
$$

を満たす。

従って全ての到達点はコンパクト集合

$$
K=\overline B(x,M_fh)
$$

に入る。

$K$ はコンパクトなので、任意の $\delta>0$ に対して有限個の点

$$
x_1,\dots,x_N
$$

を選び、各 $y\in K$ に対して

$$
|y-x_i|\le\delta
$$

となる $i$ を見つけられる。

各 $x_i$ だけで $\varepsilon$-optimal continuation strategy $\alpha_i$ を選んでおく。

実際の到達点 $y$ に最も近い $x_i$ を割り当て、$t+h$ 以後は $\alpha_i$ を使う。

同じ controls で初期値だけ $y,x_i$ が違う二軌道の差は

$$
|X_y(s)-X_{x_i}(s)|
\le
e^{K_f(s-t-h)}|y-x_i|
$$

だから、terminal cost と running cost の Lipschitz 性により payoff の差は

$$
C|y-x_i|
\le
C\delta
$$

で抑えられる。

従って有限個の continuation strategies だけで、任意の到達点に対して誤差 $C\delta$ 以内の continuation を作れる。

最後に $\delta\downarrow0$ とすれば、この近似誤差は消える。
<!-- solution-end -->

### B3 value function の空間 Lipschitz 性

- Level: B

standing assumptions の下で

$$
|V^\pm(t,x)-V^\pm(t,y)|
\le
C|x-y|
$$

を示せ。

<!-- solution-start -->
### 詳細解答

同じ controls $(u,v)$ を初期値 $x,y$ から走らせ、軌道を $X_x,X_y$ とする。

差は

$$
X_x(s)-X_y(s)
=
x-y
+
\int_t^s
\{
f(X_x(r),u(r),v(r))
-
f(X_y(r),u(r),v(r))
\}\,dr.
$$

従って

$$
|X_x(s)-X_y(s)|
\le
|x-y|
+
K_f
\int_t^s
|X_x(r)-X_y(r)|\,dr.
$$

Grönwall 評価より

$$
|X_x(s)-X_y(s)|
\le
e^{K_f(s-t)}|x-y|.
$$

terminal cost と running cost の Lipschitz 性から

$$
\begin{aligned}
|J_{t,x}(u,v)-J_{t,y}(u,v)|
&\le
K_g|X_x(T)-X_y(T)|\\
&\quad+
K_L\int_t^T|X_x(s)-X_y(s)|\,ds\\
&\le
C|x-y|.
\end{aligned}
$$

この $C$ は $(u,v)$ に依存しない。

従って strategy を固定して相手 control の supremum を取っても同じ評価が保たれ、その後 strategy の infimum を取っても保たれる。

よって

$$
|V^-(t,x)-V^-(t,y)|
\le
C|x-y|.
$$

upper value でも infimum と supremum の順が変わるだけで、同じ一様評価が保たれる。

従って

$$
|V^+(t,x)-V^+(t,y)|
\le
C|x-y|.
$$
<!-- solution-end -->

### B4 加法分離された stage cost と Isaacs condition

- Level: B

$$
Q(a,b)=c+r(a)+s(b)
$$

とする。

$U,V$ がコンパクトで $r,s$ が連続なら Isaacs condition が成り立つことを示せ。

<!-- solution-start -->
### 詳細解答

まず

$$
\inf_aQ(a,b)
=
c+\inf_ar(a)+s(b).
$$

従って

$$
\sup_b\inf_aQ(a,b)
=
c+\inf_ar(a)+\sup_bs(b).
$$

一方、

$$
\sup_bQ(a,b)
=
c+r(a)+\sup_bs(b).
$$

よって

$$
\inf_a\sup_bQ(a,b)
=
c+\inf_ar(a)+\sup_bs(b).
$$

両者は一致する。

従って

$$
\sup_b\inf_aQ(a,b)
=
\inf_a\sup_bQ(a,b).
$$

相互作用項がなく、$a$ と $b$ が加法的に分離されているため、最適化の順序を交換しても値が変わらない。
<!-- solution-end -->

## Level C

### C1 Isaacs condition が失敗する有限時間ゲーム

- Level: C

状態は動かず、

$$
f\equiv0,
\qquad
g\equiv0,
$$

$$
U=V=\{-1,1\},
\qquad
L(u,v)=(u-v)^2
$$

とする。

1. $H^-$ と $H^+$ を求めよ。
2. lower / upper HJI を解け。
3. lower game で MIN が使える strategy と、upper game で MAX が使える strategy を一つずつ構成し、PDE の解と一致することを確認せよ。
4. game value が存在しない理由を述べよ。

<!-- solution-start -->
### 詳細解答

#### 1. Hamiltonian

状態が動かないので

$$
Q(u,v)=L(u,v)=(u-v)^2.
$$

$u,v\in\{-1,1\}$ だから、

$$
(u-v)^2
=
\begin{cases}
0, & u=v,\\
4, & u=-v.
\end{cases}
$$

lower Hamiltonian は

$$
H^-
=
\sup_v\inf_u(u-v)^2.
$$

各 $v$ に対し MIN は $u=v$ を選べるので

$$
\inf_u(u-v)^2=0.
$$

従って

$$
H^-=0.
$$

upper Hamiltonian は

$$
H^+
=
\inf_u\sup_v(u-v)^2.
$$

各 $u$ に対し MAX は $v=-u$ を選べるので

$$
\sup_v(u-v)^2=4.
$$

従って

$$
H^+=4.
$$

#### 2. HJI

lower HJI は

$$
V_t^-+0=0,
\qquad
V^-(T)=0.
$$

従って

$$
V^-(t)=0.
$$

upper HJI は

$$
V_t^++4=0,
\qquad
V^+(T)=0.
$$

積分すると

$$
V^+(t)=4(T-t).
$$

#### 3. strategies

lower game では MIN が $v$ に反応できる。

$$
\alpha[v](s)=v(s)
$$

とすれば

$$
L(\alpha[v](s),v(s))
=
(v(s)-v(s))^2
=
0.
$$

従って任意の $v$ に対して total payoff は 0 であり、

$$
V^-(t)=0
$$

と一致する。

upper game では MAX が $u$ に反応できる。

$$
\beta[u](s)=-u(s)
$$

とすれば

$$
L(u(s),\beta[u](s))
=
(u(s)+u(s))^2
=
4.
$$

従って

$$
J
=
\int_t^T4\,ds
=
4(T-t).
$$

これは upper HJI の解と一致する。

#### 4. game value

$$
H^-=0,
\qquad
H^+=4
$$

なので Isaacs condition は成立しない。

実際、

$$
V^-(t)=0
\ne
4(T-t)=V^+(t)
$$

for $t<T$ である。

従って lower value と upper value は一致せず、共通の game value は存在しない。
<!-- solution-end -->

---

## まとめ

HJC1 の一人制御では

$$
\inf_u
$$

だけが Hamiltonian に入りました。

HJC4 では相手の最適応答と情報構造のために

$$
\sup_v\inf_u
\qquad\text{と}\qquad
\inf_u\sup_v
$$

の二つが現れます。

その結果、

$$
\text{lower value}
\to
H^-
\to
\text{lower HJI},
$$

$$
\text{upper value}
\to
H^+
\to
\text{upper HJI}
$$

という二本の流れができます。

Isaacs condition

$$
H^-=H^+
$$

が成立すると、comparison による粘性解の一意性が二本を一本へ戻し、

$$
V^-=V^+
$$

を与えます。

次章では相手ではなく確率ノイズを加えます。Itô formula によって一階 HJB へ二階項が加わり、確率制御の二階 HJB が現れます。
