# QFT60 有限温度・有限円周の区間エントロピーと極限

<!-- definition-example-audit: strict -->

[QFT59の単一区間Rényi普遍項](../QFT59/index.md#prop-qft59-renyi-interval)では、無限直線の真空で区間長 $\ell$ に対する対数を導きました。では、温度 $T>0$ の熱状態で区間を広げ続けると、いつまでも対数だけ増えるのでしょうか。逆に、空間が長さ $L$ の円周なら、区間が円周のほぼ全部を占めるときどうなるでしょうか。

鍵は[QFT55の二種類の円筒写像](../QFT55/index.md#def-qft55-thermal-cylinder)と、[QFT58のtwist演算子のウェイト](../QFT58/index.md#thm-qft58-twist-weight)です。**熱円筒はEuclid時間が周期的、空間円周は空間座標が周期的**であり、同じ指数関数による座標写像でも等時刻の二点差が実数か純虚数かで答えが変わります。二つの導出を独立に確認し、短距離極限、熱力学的な体積項、純粋状態の区間対称性を検算します。

対象は二次元ユニタリCFTの左右対称な中心電荷 $c=\bar c\ge0$、一本の区間 $A=[0,\ell]$、短距離cutoff $a>0$ です。場のLorentz符号は $(-,+)$ とし、以下はEuclid相関で計算します。速度とBoltzmann定数は $v=k_B=1$、逆温度は $\beta=1/T>0$ とします。熱円筒では無限直線の熱平衡状態、空間円周では周長 $L>0$ の**平面の恒等演算子に対応する純粋な円筒真空**を使います。熱と空間円周を同時に有限にしたトーラスは、これら二式の適用範囲に含みません。

## 1. 何を円筒へ写すのか

[QFT57の有限cutoffレプリカモーメント](../QFT57/index.md#def-qft57-replica-moments)では、領域の密度演算子がある場合 $R_a(n,A)=\operatorname{Tr}(\rho_A^n)$、$S_n=(1-n)^{-1}\ln R_a$ と置きます。連続場では有限cutoffを保ち、整数 $n\ge2$ の幾何を先に計算します。

[QFT58のtwist二点表示](../QFT58/index.md#prop-qft58-twist-geometry)で、レプリカ数 $n$ のtwistと逆twistを区間の両端に挿入します。各コピーの中心電荷を $c$ とすると、左右のウェイトは

$$
h_n=\bar h_n=\frac{c}{24}\left(n-\frac1n\right),
\qquad p_n=2(h_n+\bar h_n)=\frac c6\left(n-\frac1n\right).
$$

したがって平面の二点関数は、端点間の距離に対して $|z_{12}|^{-p_n}$ で変化します。二点関数の規格化係数 $C_n>0$ とcutoff $a$ を分けると、[QFT59の規格化](../QFT59/index.md#prop-qft59-renyi-interval)で $R_a(n,\ell)\simeq C_n(\ell/a)^{-p_n}$ でした。以下も $C_n$ は端点の正規化・模型・cutoffに依存するものとし、円筒への一次場変換が成立するスケーリング領域での**普遍主項**のみを扱います。

二つの円筒では、平面の距離 $\ell$ の代わりに使う、単位が長さの正の関数を先に取り出せます。次の定義で熱円筒と空間円周のそれぞれに名前を付けます。熱円筒では $\ell,\beta>0$、空間円周では $0<\ell<L$ とします。

<a id="def-qft60-cylinder-interval-scales"></a>

<!-- formal-statement-start -->
> **定義（等時刻の円筒区間尺度）**
> 二次元Euclid平面から指数関数による座標写像で得る円筒で、区間端点を等Euclid時間に置く。逆温度 $\beta>0$ の無限直線の熱円筒と、周長 $L>0$ の空間円周の円筒に対し、それぞれ正の長さ尺度を

$$
D_\beta(\ell):=\frac\beta\pi\sinh\frac{\pi\ell}{\beta}
\quad(\ell>0),\qquad
D_L(\ell):=\frac L\pi\sin\frac{\pi\ell}{L}
\quad(0<\ell<L)
$$

> と定める。これは物理的な測地距離の新定義ではなく、二点関数の共形変換因子を長さとしてまとめた記法である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-qft60-cylinder-interval-scales -->
**定義の確認**：$\ell=\beta$ の熱円筒では $D_\beta(\beta)=(\beta/\pi)\sinh\pi>0$。周長 $L$ の半円 $\ell=L/2$ なら $D_L(L/2)=L/\pi>0$。それぞれ $\sinh y>0$（$y>0$）、$\sin y>0$（$0<y<\pi$）なので、指定された定義域で正です。$D_\beta(\ell)$ は $\ell$ とともに増えますが、$D_L(\ell)=D_L(L-\ell)$ です。どちらも $\ell$ が他の尺度に比べて小さいとき $\ell$ に近づきます。
<!-- definition-example-end -->

## 2. 熱円筒には $\sinh$ が残る

熱平衡では $u=x+i\tau_E$、$\bar u=x-i\tau_E$ と置き、Euclid時間を $\tau_E\sim\tau_E+\beta$ とします。[QFT55の熱円筒写像](../QFT55/index.md#def-qft55-thermal-cylinder)を $z=e^{qu}$、$\bar z=e^{q\bar u}$、$q=2\pi/\beta$ と書くと、等時刻の区間端点 $u_1=0,u_2=\ell$ は $u_{12}=-\ell$ で、**実数**です。

一次場の変換の意味も確認しましょう。[QFT50の一次場ウェイト](../QFT50/index.md#def-qft50-weights)をもつtwist演算子は、二点関数の各端点で正則因子 $(qz_i)^{h_n}$ と反正則因子 $(q\bar z_i)^{\bar h_n}$ を持ちます。$z_1-z_2$ を中心座標と差に分けると

$$
z_1-z_2
=2e^{q(u_1+u_2)/2}\sinh\frac{q(u_1-u_2)}2,
\qquad \frac{dz_i}{du_i}=qz_i.
$$

したがって正則側は

$$
\frac{(qz_1)^{h_n}(qz_2)^{h_n}}{(z_1-z_2)^{2h_n}}
=\left[\frac{q}{2\sinh(q(u_1-u_2)/2)}\right]^{2h_n}.
$$

反正則側も同じ処理をし、等時刻で二因子の絶対値を取ると $[\pi/(\beta\sinh(\pi\ell/\beta))]^{2h_n+2\bar h_n}=D_\beta(\ell)^{-p_n}$。熱円筒での表現を一次場二点核から出発して導いたのであり、単に $\ell$ を $\beta$ に置換したのではありません。

<a id="thm-qft60-thermal-renyi"></a>

<!-- formal-statement-start -->
> **定理（無限直線の有限温度区間Rényi普遍項）**
> 中心電荷 $c=\bar c\ge0$ の二次元ユニタリCFTを無限直線の温度 $T=1/\beta>0$ の熱平衡状態に置く。区間 $A=[0,\ell]$ について、整数 $n\ge2$ のtwist一次場二点関数が上記熱円筒と平面真空の共形対応で与えられ、$a\ll\min(\ell,\beta)$ のスケーリング領域で有限cutoffの端点正規化 $C_n>0$ を取れると仮定する。このとき

$$
\begin{aligned}
R_a(n,A)&\simeq C_n\left[\frac\beta{\pi a}
\sinh\frac{\pi\ell}{\beta}\right]^{-p_n},\\
S_n(A)&=\frac c6\left(1+\frac1n\right)
\ln\left[\frac\beta{\pi a}\sinh\frac{\pi\ell}{\beta}\right]
+k_n+\text{スケーリング補正},
\end{aligned}
$$

> ただし $p_n=c(n-1/n)/6$、$k_n=\ln C_n/(1-n)$ であり、補正の制御は各固定整数 $n$ と各円筒のスケーリング極限について仮定する。一般の有限cutoffでの厳密等式ではない。
<!-- formal-statement-end -->

### 証明の見取り図

円筒のtwist二点の変換因子が $D_\beta^{-p_n}$ となり、あとはレプリカの対数を $1-n$ で割ります。正則と反正則を合わせる指数の2の係数を追います。

<!-- proof-start -->
### 証明

[QFT58のtwistウェイト](../QFT58/index.md#thm-qft58-twist-weight)により $2h_n+2\bar h_n=4h_n=p_n$。[QFT55の円筒一次場変換](../QFT55/index.md#thm-qft55-cylinder-two-point)と上の指数差の恒等式を $q=2\pi/\beta$、$u_{12}=\bar u_{12}=-\ell$ に適用する。二つの因子の積は

$$
\left|\frac{q}{2\sinh(q\ell/2)}\right|^{2h_n}
\left|\frac{q}{2\sinh(q\ell/2)}\right|^{2\bar h_n}
=\left[\frac\pi{\beta\sinh(\pi\ell/\beta)}\right]^{p_n}.
$$

端点の微視的規格化から $C_na^{p_n}$ が掛かるので $R_a\simeq C_n[D_\beta(\ell)/a]^{-p_n}$。レプリカの対数を取ると

$$
\begin{aligned}
S_n&=\frac1{1-n}\bigl(\ln C_n-p_n\ln[D_\beta(\ell)/a]\bigr)
+\text{補正}\\
&=k_n+\frac c6\frac{n-1/n}{n-1}\ln[D_\beta(\ell)/a]
+\text{補正}\\
&=k_n+\frac c6\left(1+\frac1n\right)\ln[D_\beta(\ell)/a]
+\text{補正}.
\end{aligned}
$$

整数 $n\ge2$ なので $n-1$ による除算は適法である。有限cutoffからの補正を零と置いたのは主項への射影に限る。
<!-- proof-end -->

**数値を含まない直接例**：自由bosonの $c=1$ と自由Majoranaの $c=1/2$ では、[中心電荷の計算](../QFT53/index.md#thm-qft53-majorana-central)を適用し、熱円筒の二次Rényiの対数係数はそれぞれ $1/4$ と $1/8$ です。$\beta$ と $\ell$ を同じにしても定数 $k_2$ は模型によって違い得ます。

## 3. 空間円周には $\sin$ が残る

今度は座標を $w=\tau+ix$、$x\sim x+L$ として[QFT55の空間円筒写像](../QFT55/index.md#def-qft55-cylinder-map) $z=e^{qw}$、$q=2\pi/L$ を使います。等Euclid時間の区間端点 $w_1=0,w_2=i\ell$ は $w_{12}=-i\ell$ なので、$\sinh(iy)=i\sin y$ を代入して初めて三角関数に変わります。

<a id="thm-qft60-circle-renyi"></a>

<!-- formal-statement-start -->
> **定理（空間円周の真空区間Rényi普遍項）**
> 二次元ユニタリCFTの中心電荷を $c=\bar c\ge0$ とし、周長 $L>0$ の空間円周上で平面の恒等演算子に対応する純粋真空を取る。$A=[0,\ell]$、$0<\ell<L$、$a\ll\min(\ell,L-\ell)$ とする。整数 $n\ge2$ のtwist二点関数が指数関数による座標写像で平面真空との共形対応を持つと仮定すると

$$
\begin{aligned}
R_a(n,A)&\simeq C_n\left[\frac L{\pi a}
\sin\frac{\pi\ell}{L}\right]^{-p_n},\\
S_n(A)&=\frac c6\left(1+\frac1n\right)
\ln\left[\frac L{\pi a}\sin\frac{\pi\ell}{L}\right]
+k_n+\text{スケーリング補正}
\end{aligned}
$$

> を得る。$p_n=c(n-1/n)/6$、$k_n=\ln C_n/(1-n)$。真空の部門・周期境界条件を指定せず、任意の円周状態にこの公式を拡張してはならない。
<!-- formal-statement-end -->

### 証明の見取り図

熱円筒と同じ一次場のJacobianを使いますが、等時刻の端点差が純虚数であるため $\sinh$ が $\sin$ に変わります。最後に係数 $n-1/n$ を $1-n$ で割ります。

<!-- proof-start -->
### 証明

$q=2\pi/L$ とし、$w_1=0,w_2=i\ell$ を代入する。[QFT55の二点変換式](../QFT55/index.md#thm-qft55-cylinder-two-point)では正則因子が $[q/(2\sinh(-i\pi\ell/L))]^{2h_n}$、反正則因子が $[q/(2\sinh(i\pi\ell/L))]^{2\bar h_n}$ となる。$0<\ell<L$ では $\sin(\pi\ell/L)>0$、両因子の位相は真空のスカラーtwistと逆twistの組で整合する枝を選ぶ。したがって積は

$$
\left[\frac{q}{2\sin(\pi\ell/L)}\right]^{2h_n+2\bar h_n}
=\left[\frac\pi{L\sin(\pi\ell/L)}\right]^{p_n}
=D_L(\ell)^{-p_n}.
$$

端点正規化 $C_na^{p_n}$ を含めて $R_a\simeq C_n[D_L(\ell)/a]^{-p_n}$ とし、[熱円筒で行った対数計算](#thm-qft60-thermal-renyi)を $D_\beta\mapsto D_L$ として式のレベルで実行する。$-p_n/(1-n)=c(1+1/n)/6$ なので所期のRényi式を得る。式の一致は一次場の局所変換から得たものであり、二つの円筒の物理状態を同一視したものではない。
<!-- proof-end -->

**直接例（半円）**：$\ell=L/2$ では $\sin(\pi/2)=1$ だから、自由bosonの二次Rényi主項は $\frac14\ln[L/(\pi a)]+k_2$ です。同じ真空で $\ell=L/4$ と $3L/4$ の値は等しく、$\sin(\pi/4)=\sin(3\pi/4)=1/\sqrt2$ で実際に確かめられます。

## 4. 短距離では両者とも平面へ戻る

二つの定理を物理的に使うため、$\ell$ と他の長さの比を小さくした展開を確認します。$y=\pi\ell/\beta$ または $y=\pi\ell/L$ とし、$\sinh y=y+y^3/6+O(y^5)$ と $\sin y=y-y^3/6+O(y^5)$ を用います。対数を取る前に $y$ を括り出すことが、係数の符号を間違えない方法です。

<a id="prop-qft60-short-interval"></a>

<!-- formal-statement-start -->
> **命題（熱円筒と空間円周の短区間展開）**
> $\ell,\beta,L>0$、$\ell<L$ とし、第1節の $D_\beta,D_L$ を用いる。$\ell/\beta\to0$ または $\ell/L\to0$ では、それぞれ

$$
\begin{aligned}
\ln\frac{D_\beta(\ell)}a
&=\ln\frac\ell a+\frac{\pi^2\ell^2}{6\beta^2}
+O\left(\frac{\ell^4}{\beta^4}\right),\\
\ln\frac{D_L(\ell)}a
&=\ln\frac\ell a-\frac{\pi^2\ell^2}{6L^2}
+O\left(\frac{\ell^4}{L^4}\right).
\end{aligned}
$$

> したがって固定整数 $n\ge2$ では、各Rényi普遍主項は平面の $\frac c6(1+1/n)\ln(\ell/a)+k_n$ に戻り、最初の円筒補正は熱で正、空間円周で負となる。
<!-- formal-statement-end -->

### 証明の見取り図

$D/\ell$ を $\sinh y/y$ または $\sin y/y$ として1に近い量にし、$\ln(1+t)=t+O(t^2)$ を適用します。

<!-- proof-start -->
### 証明

$y=\pi\ell/\beta$ の場合、$D_\beta/\ell=\sinh y/y=1+y^2/6+O(y^4)$ なので

$$
\ln\frac{D_\beta}a
=\ln\frac\ell a+\ln\left(1+\frac{y^2}6+O(y^4)\right)
=\ln\frac\ell a+\frac{y^2}6+O(y^4).
$$

ここで $t=y^2/6+O(y^4)$ の二乗は $O(y^4)$ なので剰余の次数は保たれる。空間円周でも $y=\pi\ell/L$、$D_L/\ell=1-y^2/6+O(y^4)$ とするだけで二次項の符号が逆になる。両式に $c(1+1/n)/6$ を掛ければRényi主項の補正が従う。
<!-- proof-end -->

これは連続CFT内での幾何学的な短区間展開です。格子など有限cutoffの追加補正は別に残り、$\ell/a\gg1$ も同時に満たす必要があります。$\ell\to0$ を $a$ 固定で無制限に進めると、どちらの近似も破綻します。

## 5. 大区間の熱エントロピーと円周の純粋性

熱円筒で $\ell\gg\beta$ とすると、$\sinh y=(e^y/2)(1-e^{-2y})$ です。従って

$$
\ln\left[\frac\beta{\pi a}\sinh\frac{\pi\ell}{\beta}\right]
=\frac{\pi\ell}{\beta}+\ln\frac\beta{2\pi a}
+\ln\left(1-e^{-2\pi\ell/\beta}\right).
$$

最後の対数は $-e^{-2\pi\ell/\beta}+O(e^{-4\pi\ell/\beta})$。対数的増加が、長い熱区間では長さに比例する増加へ切り替わります。

<a id="prop-qft60-thermal-volume"></a>

<!-- formal-statement-start -->
> **命題（熱区間の体積項とRényi密度）**
> [有限温度区間Rényi定理](#thm-qft60-thermal-renyi)の条件を満たし、先に $a/\beta\to0$ のCFTスケーリング主項を取り出してから、固定 $\beta>0$ で $\ell/\beta\to\infty$ とする。整数 $n\ge2$ では主項に

$$
S_n(A)=\frac{\pi c}{6\beta}\left(1+\frac1n\right)\ell
+\frac c6\left(1+\frac1n\right)\ln\frac\beta{2\pi a}
+k_n+O(e^{-2\pi\ell/\beta})
$$

> が現れる。右辺はCFT普遍主項の展開であり、有限cutoffに由来する非普遍的な長さ依存誤差の消失まで無条件には主張しない。
<!-- formal-statement-end -->

### 証明の見取り図

$\sinh y$ の指数部分だけが $\ell$ に比例し、残りは定数と指数的な小項です。

<!-- proof-start -->
### 証明

$\sinh y=e^y(1-e^{-2y})/2$ を $y=\pi\ell/\beta$ で代入する。$y\to\infty$ のとき $\ln(1-e^{-2y})=-e^{-2y}+O(e^{-4y})$ だから

$$
\ln[D_\beta(\ell)/a]
=\frac{\pi\ell}\beta+\ln\frac\beta{2\pi a}
+O(e^{-2\pi\ell/\beta}).
$$

[熱円筒Rényi式](#thm-qft60-thermal-renyi)の係数 $\alpha_n=c(1+1/n)/6$ を各項に掛け、端点定数 $k_n$ を付ければ結論になる。$n$ は固定整数なので、極限を $n\to1$ と交換してはいない。
<!-- proof-end -->

この線形係数 $\pi c(1+1/n)/(6\beta)$ は、その次数の熱Rényiエントロピーの**長さ当たりの主項**です。$n=1$ の通常の熱力学的エントロピー密度とはまだ同一視しません。後で $n=1$ の条件を明記してから比較します。

一方、円周真空の全系は純粋状態です。ここでは「区間が広ければ熱のように増える」という直感が通用しません。$ho_A$ と補集合 $A^c$ は純粋二分割の同じ非零Schmidt固有値を持つので、[QFT57の部分トレースの定義](../QFT57/index.md#def-qft57-replica-moments)から全次数のエントロピーが等しくなります。

<a id="prop-qft60-circle-complement"></a>

<!-- formal-statement-start -->
> **命題（純粋円周真空の補区間対称性）**
> 周長 $L>0$ の円周上に純粋な全系状態 $|\Psi\rangle$ があり、有限cutoffで区間 $A$ と補集合 $A^c$ のHilbert空間を二分割できるとする。$0<\ell<L$、$|A|=\ell$、$|A^c|=L-\ell$ なら、両縮約状態の非零固有値が一致する。このとき、すべての定義可能なRényi次数およびvon Neumannエントロピーについて

$$
S_n(A)=S_n(A^c),\qquad S(A)=S(A^c)
$$

> となる。特に[空間円周の真空普遍項](#thm-qft60-circle-renyi)は $\ell\leftrightarrow L-\ell$ に関して不変である。
<!-- formal-statement-end -->

### 証明の見取り図

純粋状態のSchmidt係数が両側で共通であることと、$\sin(\pi-\theta)=\sin\theta$ を別々に確認します。

<!-- proof-start -->
### 証明

有限cutoffの二分割でSchmidt分解 $|\Psi\rangle=\sum_j\sqrt{p_j}|j\rangle_A|j\rangle_{A^c}$ を取り、$p_j>0$、$\sum_jp_j=1$ とする。互いの直交性を使って片側を部分トレースすると

$$
\rho_A=\sum_jp_j|j\rangle_A\langle j|,\qquad
\rho_{A^c}=\sum_jp_j|j\rangle_{A^c}\langle j|.
$$

従って $\operatorname{Tr}\rho_A^n=\sum_jp_j^n=\operatorname{Tr}\rho_{A^c}^n$、$-\operatorname{Tr}\rho_A\ln\rho_A=-\sum_jp_j\ln p_j$ も等しい。円周のCFT真空式については

$$
\sin\frac{\pi(L-\ell)}L
=\sin\left(\pi-\frac{\pi\ell}L\right)
=\sin\frac{\pi\ell}L
$$

なので $D_L(L-\ell)=D_L(\ell)$ と直接確かめられる。
<!-- proof-end -->

**失敗例（熱状態）**：熱密度演算子は一般に純粋ではありません。無限直線ではそもそも有限円周のような長さ $L-\ell$ の補区間を取れず、熱円筒の $D_\beta(\ell)$ も $\ell$ とともに単調増加します。熱円筒の式に純粋状態の補区間対称性を強制すると、Schmidt分解の「全系が純粋」という仮定を落としてしまいます。

## 6. $n\to1$ で何を追加仮定するか

[QFT59の条件付きvon Neumann普遍係数](../QFT59/index.md#thm-qft59-conditional-von-neumann)では、整数レプリカの値だけから非整数への微分を行えないと確認しました。今回も、円筒への写像で得た**整数** $n$ の指数は、そのまま $n=1$ の式を保証しません。

そこで $D$ を $D_\beta(\ell)$ または $D_L(\ell)$ とし、有限cutoffで実在する物理的モーメントの $n=1$ 近傍の微分可能な実数拡張を仮定します。円筒のスケーリング極限を取る際、補正の $n$ 微分を小さく抑えられる必要もあります。

<a id="thm-qft60-conditional-von-neumann"></a>

<!-- formal-statement-start -->
> **定理（条件付き円筒区間von Neumann普遍項）**
> [熱円筒の定理](#thm-qft60-thermal-renyi)または[空間円周の定理](#thm-qft60-circle-renyi)のCFT・状態・cutoff条件を満たすとする。各区間に対し有限cutoffの物理的モーメントの正の実数拡張 $R(n,D)>0$ が $n=1$ の近くで微分可能で、$R(1,D)=1$、$S(A)=-\partial_n\ln R(n,D)|_{n=1}$ であると仮定する。さらに微分可能な $C(n)>0$ と補正 $r(n,D)$ に対して

$$
\ln R(n,D)=\ln C(n)-\frac c6\left(n-\frac1n\right)\ln\frac Da+r(n,D),
$$

> $C(1)=1$、$r(1,D)=0$、$\partial_nr(1,D)=o(1)$ が対応するCFTスケーリング極限で成り立つとする。このとき $k_1=-\partial_n\ln C(n)|_{n=1}$ と置けば

$$
S_\beta(A)=\frac c3\ln\left[\frac\beta{\pi a}\sinh\frac{\pi\ell}{\beta}\right]+k_1+o(1),
$$

$$
S_L(A)=\frac c3\ln\left[\frac L{\pi a}\sin\frac{\pi\ell}{L}\right]+k_1+o(1)
$$

> を得る。整数レプリカからの解析接続と誤差の微分制御は独立の仮定であり、二式の $k_1$ が同じ表示になるのは端点のUV規格化を同一に選んだ場合に限る。
<!-- formal-statement-end -->

### 証明の見取り図

円筒では区間尺度 $D$ が $n$ に依存しないため、QFT59の微分を $\ell$ の代わりに $D$ へ適用できます。ただし誤差微分の仮定を忘れません。

<!-- proof-start -->
### 証明

$D$ と $a$ を固定して $n$ で微分する。$\partial_n(n-1/n)=1+1/n^2$ なので

$$
\partial_n\ln R(n,D)
=\frac{C'(n)}{C(n)}
-\frac c6\left(1+\frac1{n^2}\right)\ln\frac Da
+\partial_nr(n,D).
$$

$n=1$ で $R(1,D)=C(1)=1$、$r(1,D)=0$ と整合し、負号を付けると

$$
S(A)=-\frac{C'(1)}{C(1)}+\frac c3\ln\frac Da
-\partial_nr(1,D)
=k_1+\frac c3\ln\frac Da+o(1).
$$

最後に定義済みの $D_\beta$ または $D_L$ を代入する。$n\to1$ とcutoff極限の交換を行ったのではなく、補正の導関数を制御する仮定を直接使った。
<!-- proof-end -->

この式から熱区間の長さ当たりのvon Neumann主項は $\pi c/(3\beta)$ です。これは熱力学のエントロピー密度とも照合できます。[QFT55の円周真空エネルギー](../QFT55/index.md#thm-qft55-cylinder-spectrum) $E_0(\beta)=-\pi c/(6\beta)$ を、時間と空間を交換した長いトーラスの**双対チャネルで恒等真空が支配する**場合に用いると

$$
\ln Z(\beta,L_{\rm IR})=\frac{\pi c}{6\beta}L_{\rm IR}+o(L_{\rm IR}),
\qquad L_{\rm IR}\to\infty.
$$

ここで $L_{\rm IR}$ は熱系を一度有限化する赤外の長さです。$Z\simeq e^{-L_{\rm IR}E_0(\beta)}$ の指数の符号は $E_0<0$ から確認できます。熱力学の $S_{\rm th}=(1-\beta\partial_\beta)\ln Z$ を適用すると

$$
\frac{S_{\rm th}}{L_{\rm IR}}
=\left(1-\beta\partial_\beta\right)\frac{\pi c}{6\beta}
=\frac{\pi c}{6\beta}+\frac{\pi c}{6\beta}
=\frac{\pi c}{3\beta}.
$$

この確認にはトーラス分配関数の双対チャネル・真空支配・微分と極限の制御という追加条件があります。有限の $L$ と有限の $\beta$ が同程度の**一般のトーラス**では、二点関数や区間エントロピーを決めるために全スペクトル、スピン部門、twistのトーラス相関等が必要です。[QFT55の二点核の適用範囲](../QFT55/index.md#prop-qft55-thermal-two-point)を超えて、熱式へ $L$ を入れるだけの操作はしません。

## 7. 演習：二つの円筒と極限を自分で検算する

<a id="ex-qft60-a01"></a>

### QFT60-A01 熱円筒の二次Rényi

- Level: A
- 対応目標: $\sinh$ と中心電荷の係数

自由bosonの $c=1$、逆温度 $\beta$ の無限直線熱状態で、区間 $\ell=\beta$ の二次Rényiの普遍主項 $S_2-k_2$ を求めよ。$\beta/a\gg1$ とする。

<!-- solution-start -->
### 詳細解答

[熱円筒Rényi定理](#thm-qft60-thermal-renyi)の係数は $c(1+1/2)/6=1/4$。$D_\beta(\beta)=(\beta/\pi)\sinh\pi$ を使い

$$
S_2-k_2=\frac14\ln\left[\frac\beta{\pi a}\sinh\pi\right]
+\text{スケーリング補正}.
$$

$\sinh\pi$ を $\sin\pi=0$ に取り違えない。熱では座標差が実数で、空間円周の半円ではない。
<!-- solution-end -->

<a id="ex-qft60-a02"></a>

### QFT60-A02 空間円周の半区間

- Level: A
- 対応目標: $\sin$ と補区間

$c=1/2$ のMajoranaの適切な純粋NS真空が空間円周上にあるとする。$\ell=L/2$、$n=2$ の普遍主項を求め、補区間との一致を調べよ。

<!-- solution-start -->
### 詳細解答

$\alpha_2=c(1+1/2)/6=1/8$、$\sin(\pi/2)=1$ なので

$$
S_2(L/2)=\frac18\ln\frac{L}{\pi a}+k_2+\text{補正}.
$$

補区間長も $L-L/2=L/2$ である。さらに[純粋円周真空の補区間対称性](#prop-qft60-circle-complement)により有限cutoffでも二側のSchmidt固有値は一致する。ここで使用したNS部門は、平面恒等真空に対応するものを選んだ。
<!-- solution-end -->

<a id="ex-qft60-a03"></a>

### QFT60-A03 二種類の二次補正

- Level: A
- 対応目標: 短区間の符号

$y=\pi\ell/d$、$y\ll1$ とする。$\ln(\sinh y/y)$ と $\ln(\sin y/y)$ の $y^2$ までの項を求めよ。ただし後者は $0<y<\pi$。

<!-- solution-start -->
### 詳細解答

$\sinh y/y=1+y^2/6+O(y^4)$、$\sin y/y=1-y^2/6+O(y^4)$。$\ln(1+t)=t+O(t^2)$ で $t=O(y^2)$ だから

$$
\ln\frac{\sinh y}y=\frac{y^2}6+O(y^4),\qquad
\ln\frac{\sin y}y=-\frac{y^2}6+O(y^4).
$$

最初の符号が違うのは $\sinh$ と $\sin$ の三次項が逆符号だからです。
<!-- solution-end -->

<a id="ex-qft60-a04"></a>

### QFT60-A04 円周四分区間の対称性

- Level: A
- 対応目標: 純粋真空の補区間と円筒尺度

周長 $L$ の純粋円周真空で $D_L(L/4)$、$D_L(3L/4)$ を求め、$S_n(L/4)-S_n(3L/4)$ の普遍主項を求めよ。

<!-- solution-start -->
### 詳細解答

$\sin(\pi/4)=\sin(3\pi/4)=\sqrt2/2$ なので、どちらも $D_L=L/(\pi\sqrt2)$。ゆえに定理の対数引数と $k_n$ は同じで、差の普遍主項は零です。全状態が純粋であるため、[補区間対称性](#prop-qft60-circle-complement)によって厳密な有限cutoffのRényiエントロピーも、対称な二分割では一致します。
<!-- solution-end -->

<a id="ex-qft60-a05"></a>

### QFT60-A05 長い熱区間の傾き

- Level: A
- 対応目標: 大区間のRényi密度

$c=1$ の無限直線熱CFTで $\ell\gg\beta$ とする。二次Rényi普遍主項の長さ当たり係数と、条件付きvon Neumann主項の係数をそれぞれ求めよ。

<!-- solution-start -->
### 詳細解答

[熱区間の体積項](#prop-qft60-thermal-volume)で $n=2$ を代入すると $\pi c(1+1/2)/(6\beta)=\pi/(4\beta)$。対して[条件付きvon Neumann式](#thm-qft60-conditional-von-neumann)は $n=1$ で $\pi c/(3\beta)=\pi/(3\beta)$。後者を $\pi/(4\beta)$ としてはいけません。熱Rényi次数を固定する操作と物理的な $n\to1$ の操作は区別されます。
<!-- solution-end -->

<a id="ex-qft60-b01"></a>

### QFT60-B01 twistの円筒Jacobianを追う

- Level: B
- 対応目標: 二点核と指数の再導出

$h_n=\bar h_n=c(n-1/n)/24$ のtwist一次場に対し $z=e^{qu}$ を使う。$u_1=0,u_2=\ell>0$ のとき、平面の正則二点核 $(z_1-z_2)^{-2h_n}$ と二つのJacobianから熱円筒の長さ指数 $p_n$ が得られることを示せ。

<!-- solution-start -->
### 詳細解答

$z_1=1,z_2=e^{q\ell}$、$z_1-z_2= -2e^{q\ell/2}\sinh(q\ell/2)$。Jacobianは $qz_1=q$、$qz_2=qe^{q\ell}$。従って正則因子の絶対値は

$$
\left|\frac{(qz_1)^{h_n}(qz_2)^{h_n}}{(z_1-z_2)^{2h_n}}\right|
=\frac{q^{2h_n}e^{qh_n\ell}}
{[2e^{q\ell/2}\sinh(q\ell/2)]^{2h_n}}
=\left[\frac q{2\sinh(q\ell/2)}\right]^{2h_n}.
$$

反正則も $2\bar h_n$ 乗なので、積は指数 $2h_n+2\bar h_n=4h_n=c(n-1/n)/6=p_n$ を持つ。$q=2\pi/\beta$ を入れて $[\pi/(\beta\sinh(\pi\ell/\beta))]^{p_n}$ となります。
<!-- solution-end -->

<a id="ex-qft60-b02"></a>

### QFT60-B02 増減と曲率の違い

- Level: B
- 対応目標: 熱の単調性と円周の対称性

$c>0$、整数 $n\ge2$ とし、$\alpha_n=c(1+1/n)/6$。$S_n^\beta=\alpha_n\ln[D_\beta(\ell)/a]+k_n$ と $S_n^L=\alpha_n\ln[D_L(\ell)/a]+k_n$ の**普遍主項**について、一階・二階の $\ell$ 微分を求め、増減を述べよ。

<!-- solution-start -->
### 詳細解答

$\partial_\ell\ln\sinh(\pi\ell/\beta)=(\pi/\beta)\coth(\pi\ell/\beta)$ なので

$$
\begin{aligned}
(S_n^\beta)'&=\alpha_n\frac\pi\beta\coth\frac{\pi\ell}\beta>0,\\
(S_n^\beta)''&=-\alpha_n\frac{\pi^2}{\beta^2}
\operatorname{csch}^2\frac{\pi\ell}\beta<0.
\end{aligned}
$$

一方 $\partial_\ell\ln\sin(\pi\ell/L)=(\pi/L)\cot(\pi\ell/L)$ より

$$
\begin{aligned}
(S_n^L)'&=\alpha_n\frac\pi L\cot\frac{\pi\ell}L,\\
(S_n^L)''&=-\alpha_n\frac{\pi^2}{L^2}
\csc^2\frac{\pi\ell}L<0.
\end{aligned}
$$

円周では $\ell=L/2$ で一階微分が零、そこまでは増加し、その後は減少します。これらはCFT普遍主項の性質であり、任意の有限cutoff補正の符号を保証しません。
<!-- solution-end -->

<a id="ex-qft60-b03"></a>

### QFT60-B03 熱エントロピー密度との照合

- Level: B
- 対応目標: レプリカ体積項と熱力学

左右中心電荷 $c=\bar c>0$ のCFTについて、長いトーラスの双対チャネルが恒等真空支配となり、$\ln Z(\beta,L_{\rm IR})\simeq\pi cL_{\rm IR}/(6\beta)$ とする。$S_{\rm th}=(1-\beta\partial_\beta)\ln Z$ から密度を導き、$n\to1$ が正当化された熱区間の体積係数と比較せよ。

<!-- solution-start -->
### 詳細解答

$A=\pi cL_{\rm IR}/6$ は $\beta$ に依存しないので $\partial_\beta(A/\beta)=-A/\beta^2$。従って

$$
S_{\rm th}=\frac A\beta-\beta\left(-\frac A{\beta^2}\right)
=\frac{2A}\beta=\frac{\pi cL_{\rm IR}}{3\beta}.
$$

単位長さ当たり $s=\pi c/(3\beta)$。一方[条件付きvon Neumann式](#thm-qft60-conditional-von-neumann)で $\ell\gg\beta$ とすると $S_A\simeq(c/3)(\pi\ell/\beta)+\text{定数}$ で、傾きは $\pi c/(3\beta)$ と一致します。比較には双方の熱極限の成立と、レプリカの実数補間・微分制御を要します。
<!-- solution-end -->

<a id="ex-qft60-b04"></a>

### QFT60-B04 規格化と温度変更

- Level: B
- 対応目標: cutoff再表示と物理的変更を区別する

熱円筒の整数 $n\ge2$ の主項を $R_a=C_n[D_\beta(\ell)/a]^{-p_n}$ とする。同じ物理的モーメントを表示尺度 $a'=\lambda a$、$\lambda>0$ で書くとき $C'_n$ を求めよ。また $a$ 固定で $\beta$ を $2\beta$ にする操作が同じ変換則で処理できない理由を述べよ。

<!-- solution-start -->
### 詳細解答

同じ円筒尺度 $D_\beta$ と同じ物理的モーメントを表示するとき、$a'=\lambda a$ より

$$
\begin{aligned}
C_n(D_\beta/a)^{-p_n}
&=C'_n(D_\beta/a')^{-p_n}\\
&=C'_n\lambda^{p_n}(D_\beta/a)^{-p_n}.
\end{aligned}
$$

正の共通因子を消去すると $C'_n=C_n\lambda^{-p_n}$。これは[QFT59のcutoff再表示命題](../QFT59/index.md#prop-qft59-cutoff-shift)に一致します。

一方、逆温度を変更すると、$y=\pi\ell/\beta>0$ と置いて

$$
\frac{D_{2\beta}(\ell)}{D_\beta(\ell)}
=\frac{2\sinh(y/2)}{\sinh y}
=\frac{1}{\cosh(y/2)}.
$$

最後の等号には $\sinh y=2\sinh(y/2)\cosh(y/2)$ を使いました。この比は $\ell/\beta\to0$ で1、$\ell/\beta\to\infty$ で0となり、一定ではありません。長さに依存する変化を係数 $C_n$ の一定の再表示で吸収できないため、温度変更は物理状態の変更です。
<!-- solution-end -->

<a id="ex-qft60-b05"></a>

### QFT60-B05 整数一致では微分が定まらない

- Level: B
- 対応目標: 解析接続の仮定を自分で検証する

熱円筒の正の補間 $R(n,D_\beta)$ があったとして、$\widetilde R(n,D_\beta)=R(n,D_\beta)\exp[\eta\sin(\pi n)\ln(D_\beta/a)]$（$\eta\in\mathbb R$）とする。整数 $m\ge1$ の一致と $n=1$ の対数微分の差を求めよ。$\widetilde R$ が物理的なモーメントとは限らない理由も述べよ。

<!-- solution-start -->
### 詳細解答

整数 $m$ では $\sin(\pi m)=0$ だから $\widetilde R(m,D_\beta)=R(m,D_\beta)$ で、特に $R(1)=\widetilde R(1)=1$。一方

$$
\left.\partial_n\ln\widetilde R\right|_{n=1}
=\left.\partial_n\ln R\right|_{n=1}
+\eta\pi\cos\pi\,\ln(D_\beta/a)
=\left.\partial_n\ln R\right|_{n=1}-\eta\pi\ln(D_\beta/a).
$$

形式的な $S=-\partial_n\ln R|_1$ は $\eta\pi\ln(D_\beta/a)$ だけ変わります。しかし正の補間のすべてが $\sum_jp_j^n$（$p_j\ge0$, $\sum_jp_j=1$）と書けるわけではありません。[QFT59の補間反例](../QFT59/index.md#thm-qft59-conditional-von-neumann)と同じく、整数一致は物理的スペクトルと微分の根拠になりません。
<!-- solution-end -->

<a id="ex-qft60-c01"></a>

### QFT60-C01 円筒の一つの区間を二つの状態で調べる

- Level: C
- 対応目標: 共形写像、Rényi、極限、純粋性、解析接続の統合

左右中心電荷 $c=\bar c=1$ の二次元CFTについて、(i) 無限直線の逆温度 $\beta$ の熱平衡状態、(ii) 周長 $L$ の空間円周の平面恒等真空を考える。いずれも同じ短距離cutoff $a$ を使い、適切な円筒二点共形対応を仮定する。

1. 整数 $n=3$ の区間Rényiの普遍主項を、$\beta,\ell,a$ または $L,\ell,a$ を使って両状態について書け。
2. $a\ll\ell\ll\min(\beta,L)$ で平面真空の主項と最初の二次補正を求め、符号を比較せよ。
3. $\ell\gg\beta$ で (i) のRényi体積係数を求めよ。また (ii) で区間を $\ell$ から $L-\ell$ に替えたときの変化を説明せよ。
4. 正の物理的モーメントが $n=1$ 近傍で微分可能であり、$\partial_n r(1,D)=o(1)$ と仮定してvon Neumannの普遍主項を両状態について求めよ。その仮定を削ると (4) を整数値からだけ導けない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**(1) 円筒ごとの指数。** $c=1,n=3$ なので $\alpha_3=(1/6)(1+1/3)=2/9$。[熱円筒](#thm-qft60-thermal-renyi)と[空間円周](#thm-qft60-circle-renyi)から

$$
\begin{aligned}
S_3^\beta(\ell)&=\frac29\ln\left[\frac\beta{\pi a}
\sinh\frac{\pi\ell}\beta\right]+k_3+\text{補正},\\
S_3^L(\ell)&=\frac29\ln\left[\frac L{\pi a}
\sin\frac{\pi\ell}L\right]+k_3+\text{補正}.
\end{aligned}
$$

**(2) 短区間。** [短区間展開](#prop-qft60-short-interval)の二次係数を $2/9$ 倍すると

$$
\begin{aligned}
S_3^\beta&=\frac29\ln\frac\ell a+k_3
+\frac{\pi^2\ell^2}{27\beta^2}+O(\ell^4/\beta^4)+\text{cutoff補正},\\
S_3^L&=\frac29\ln\frac\ell a+k_3
-\frac{\pi^2\ell^2}{27L^2}+O(\ell^4/L^4)+\text{cutoff補正}.
\end{aligned}
$$

熱の補正は正、円周真空の補正は負です。$a\ll\ell$ を保たない極限ではこの分離は使えません。

**(3) 大区間と補集合。** $\alpha_3=2/9$ なので[熱の体積項](#prop-qft60-thermal-volume)は $\alpha_3\pi\ell/\beta=2\pi\ell/(9\beta)$ です。空間円周では $\sin(\pi(L-\ell)/L)=\sin(\pi\ell/L)$、したがって $S_3^L(L-\ell)=S_3^L(\ell)$ が成り立ちます。熱状態にこの対称性を課すことはできません。

**(4) 微分の条件。** [条件付き円筒区間定理](#thm-qft60-conditional-von-neumann)で $c/3=1/3$ だから

$$
\begin{aligned}
S^\beta(\ell)&=\frac13\ln\left[\frac\beta{\pi a}
\sinh\frac{\pi\ell}\beta\right]+k_1+o(1),\\
S^L(\ell)&=\frac13\ln\left[\frac L{\pi a}
\sin\frac{\pi\ell}L\right]+k_1+o(1).
\end{aligned}
$$

ここで必要なのは物理的な $R(n,D)$ の実数拡張と、その $n$ 微分の制御です。[B05の整数一致の補間](#ex-qft60-b05)は、すべての整数値を保持しても $n=1$ の傾きを変えられます。よって整数レプリカの結果だけからこの二式のvon Neumann係数を無条件に結論できません。
<!-- solution-end -->

## 8. 何が決まり、何がまだ決まらないか

有限温度の無限直線では、区間エントロピーの普遍主項は $\sinh(\pi\ell/\beta)$ によって対数成長から熱的な線形成長へ移ります。純粋な空間円周の真空では $\sin(\pi\ell/L)$ によって補区間対称性を示します。どちらも小区間でQFT59の平面真空へ戻ります。

これらは**局所twist一次場の変換、指定された円筒状態、cutoff極限**の下での結果です。有限温度と有限円周が同時に存在するトーラスの一般相関関数、非恒等真空部門、複数区間の交差比、整数レプリカから実数への一意な解析接続は、この二つの指数関数による座標写像だけでは決まりません。

次は、既知の局所モジュラーハミルトニアンを具体的な領域で構成し、その期待値の変化とエンタングルメント第一法則を直接検算します。
