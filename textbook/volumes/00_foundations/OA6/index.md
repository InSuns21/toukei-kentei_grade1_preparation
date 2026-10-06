# OA6 正規作用素・関数計算とスペクトル定理の再解釈

<!-- definition-example-audit: strict -->

> **既出概念**：[OA4 の正規元](../OA4/index.md#def-oa4-normal-element)と[連続関数計算](../OA4/index.md#thm-oa4-continuous-functional-calculus)、[OA5 の状態・GNS 構成](../OA5/index.md#thm-oa5-gns-construction)、[QM3 の射影値測度](../QM3/index.md#def-qm3-pvm)と[有界自己共役作用素のスペクトル定理](../QM3/index.md#thm-qm3-bounded-self-adjoint-spectral-theorem)、[MT5 の Riesz--Markov 表現](../MT5/index.md#thm-mt5-riesz-markov-positive)、[Hilbert 空間の Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)を使います。

OA4 では、正規元 $a$ 一つが生成する $C^*$-環を

$$
C^*(a,1)\cong C(\sigma(a))
$$

と読めるようになりました。したがって連続関数 $f$ をスペクトル上で計算して

$$
f(a)
$$

を作れます。

一方 QM3 では、自己共役作用素 $A$ を射影値測度 $E_A$ によって

$$
A=\int_{\sigma(A)}\lambda\,dE_A(\lambda)
$$

と表しました。

ここには二つの「関数計算」があります。

$$
\boxed{
f\in C(\sigma(T))
\longmapsto
f(T)
}
$$

と

$$
\boxed{
f
\longmapsto
\int_{\sigma(T)}f(\lambda)\,dE_T(\lambda)
}
$$

です。

本章の中心問いは、この二つがなぜ同じものなのか、そして自己共役でない正規作用素

$$
T^*T=TT^*
$$

までどう拡張されるのか、です。

流れは次です。

~~~
正規作用素 T
  ↓
OA4: C*(T,I) ≅ C(σ(T))
  ↓
各ベクトル ξ から正汎関数 f ↦ <ξ,f(T)ξ>
  ↓
Riesz--Markov でスカラー測度 μξ
  ↓
偏極して μξ,η
  ↓
各 Borel 集合 B から作用素 E(B)
  ↓
E が射影値測度であることを証明
  ↓
T = ∫ z dE(z)
  ↓
連続関数計算と PVM 積分が一致
  ↓
有界 Borel 関数計算
~~~

最後の「Borel 関数計算」は、連続関数だけを持つ $C^*$-環から、次章以降の von Neumann 環で現れる射影へ進む最初の橋です。

---

## 1. 正規作用素では何が増えるのか

Hilbert 空間 $H$ 上の有界作用素全体 $B(H)$ は単位的 $C^*$-環です。したがって OA4 の正規元をそのまま有界作用素へ適用できます。

すなわち

$$
T\in B(H)
$$

が正規であるとは

$$
T^*T=TT^*
$$

であることです。

自己共役作用素は

$$
T=T^*
$$

なので自動的に正規です。unitary 作用素も

$$
T^*T=TT^*=I
$$

なので正規です。

しかし正規作用素は自己共役とは限りません。たとえば

$$
T=
\begin{pmatrix}
1&0\\
0&i
\end{pmatrix}
$$

は

$$
T^*T=TT^*=I
$$

を満たすので unitary、従って正規ですが、

$$
T^*
=
\begin{pmatrix}
1&0\\
0&-i
\end{pmatrix}
\ne T.
$$

スペクトルは

$$
\sigma(T)=\{1,i\}\subset\mathbb C
$$

です。

QM3 の自己共役作用素ではスペクトルが実数上にありました。本章では射影値測度の台を

$$
K\subset\mathbb C
$$

へ広げます。定義の三条件は QM3 と同じで、Borel 集合 $B\subset K$ に直交射影 $E(B)$ を対応させます。

---

## 2. 状態は一つの正規元を確率測度として読む

OA5 で、状態は $C^*$-環の元から複素数を読み取る正規化された正線形汎関数でした。

正規元 $a$ に連続関数計算を施したあと状態 $\varphi$ で読むと、

$$
f
\longmapsto
\varphi(f(a))
$$

という $C(\sigma(a))$ 上の正線形汎関数が得られます。

これを Riesz--Markov で測度へ変換します。

<a id="thm-oa6-state-riesz-measure"></a>

<!-- formal-statement-start -->
### 定理（状態から得られるスペクトル確率測度）

$A$ を単位的 $C^*$-環、$a\in A$ を正規元、$\varphi$ を $A$ 上の状態とする。

このとき $K=\sigma_A(a)$ 上の一意な Radon 確率測度 $\mu_{\varphi,a}$ が存在して、任意の $f\in C(K)$ に対して

$$
\boxed{
\varphi(f(a))
=
\int_K f(z)\,d\mu_{\varphi,a}(z)
}
$$

が成り立つ。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

OA4 の連続関数計算を

$$
\Phi_a:C(K)\to C^*(a,1),
\qquad
\Phi_a(f)=f(a)
$$

と書きます。

まず実数値連続関数

$$
h\in C(K,\mathbb R),
\qquad
h(z)\ge0
$$

を取ります。

平方根

$$
\sqrt h\in C(K,\mathbb R)
$$

が連続なので、

$$
h
=
(\sqrt h)^*\sqrt h
$$

です。連続関数計算は積と随伴を保つため、

$$
h(a)
=
(\sqrt h(a))^*\sqrt h(a).
$$

状態の正性から

$$
\varphi(h(a))\ge0.
$$

従って

$$
L(h)=\varphi(h(a))
$$

は $C(K,\mathbb R)$ 上の正線形汎関数です。

$K$ はコンパクトなので

$$
C_c(K)=C(K).
$$

[MT5 の Riesz--Markov 表現](../MT5/index.md#thm-mt5-riesz-markov-positive)により、一意な Radon 測度 $\mu_{\varphi,a}$ が存在して

$$
L(h)
=
\int_K h\,d\mu_{\varphi,a}
$$

となります。

一般の複素連続関数を

$$
f=u+iv,
\qquad
u,v\in C(K,\mathbb R)
$$

と書けば、複素線形性から

$$
\begin{aligned}
\varphi(f(a))
&=
\varphi(u(a))+i\varphi(v(a))\\
&=
\int_Ku\,d\mu_{\varphi,a}
+
i\int_Kv\,d\mu_{\varphi,a}\\
&=
\int_Kf\,d\mu_{\varphi,a}.
\end{aligned}
$$

最後に $f=1$ とすると

$$
\mu_{\varphi,a}(K)
=
\int_K1\,d\mu_{\varphi,a}
=
\varphi(1)
=
1.
$$

従って $\mu_{\varphi,a}$ は確率測度です。
<!-- proof-end -->

<a id="def-oa6-state-spectral-distribution"></a>

<!-- formal-statement-start -->
### 定義（状態におけるスペクトル分布）

上の定理で得られる確率測度

$$
\boxed{
\mu_{\varphi,a}
}
$$

を、状態 $\varphi$ における正規元 $a$ の **スペクトル分布** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa6-state-spectral-distribution -->

### 直接例：対角行列と正規化トレース

$$
a=
\begin{pmatrix}
1&0\\
0&i
\end{pmatrix},
\qquad
\tau(X)=\frac12\operatorname{Tr}(X)
$$

とします。

任意の

$$
f\in C(\{1,i\})
$$

に対して

$$
f(a)
=
\begin{pmatrix}
f(1)&0\\
0&f(i)
\end{pmatrix}.
$$

従って

$$
\tau(f(a))
=
\frac12f(1)+\frac12f(i).
$$

よって

$$
\boxed{
\mu_{\tau,a}
=
\frac12\delta_1+\frac12\delta_i.
}
$$

実際、

$$
\int f\,d\mu_{\tau,a}
=
\frac12f(1)+\frac12f(i)
=
\tau(f(a))
$$

なので定義条件を直接確認できます。

<!-- definition-example-end -->

ここで重要なのは、**スペクトルそのもの**と**状態で見た確率分布**を区別することです。

同じ $a$ でも状態を変えれば測度は変わります。たとえば

$$
\omega_{e_1}(X)=e_1^*Xe_1
$$

なら

$$
\mu_{\omega_{e_1},a}=\delta_1
$$

です。

一方

$$
\sigma(a)=\{1,i\}
$$

は状態を変えても変わりません。

---

## 3. 可換表現から射影値測度を作る

次が本章の核心です。

OA4 では正規作用素 $T$ から

$$
\pi_T:C(\sigma(T))\to B(H)
$$

という *-表現が得られました。

ここでは逆に、一般の

$$
\pi:C(K)\to B(H)
$$

から射影値測度を構成します。

<a id="thm-oa6-commutative-representation-pvm"></a>

<!-- formal-statement-start -->
### 定理（可換 $C(K)$ 表現の射影値測度表示）

$K\subset\mathbb C$ をコンパクト集合、$H$ を複素 Hilbert 空間とする。

単位的 *-準同型

$$
\pi:C(K)\to B(H)
$$

に対し、一意な射影値測度

$$
E:\mathcal B(K)\to B(H)
$$

が存在して、任意の $f\in C(K)$ について

$$
\boxed{
\pi(f)
=
\int_K f(z)\,dE(z)
}
$$

が成り立つ。
<!-- formal-statement-end -->

### 証明の見取り図

いきなり作用素値測度を作るのではなく、各ベクトルから普通のスカラー測度を作ります。

$$
\xi
\longmapsto
\left(
f\mapsto
\langle\xi,\pi(f)\xi\rangle
\right)
\longmapsto
\mu_\xi.
$$

次に偏極によって

$$
\mu_{\xi,\eta}
$$

を作り、Borel 集合 $B$ ごとに

$$
(\xi,\eta)
\longmapsto
\mu_{\xi,\eta}(B)
$$

を bounded sesquilinear form とみなします。

Hilbert 空間の Riesz 表現定理で、それを一つの作用素 $E(B)$ に戻します。

<!-- proof-start -->
### 証明

#### Step 1. ベクトルごとの正測度

$\xi\in H$ を固定し、

$$
L_\xi(f)
=
\langle\xi,\pi(f)\xi\rangle
$$

と置きます。

$h\in C(K)$ が実数値で $h\ge0$ なら

$$
h=(\sqrt h)^*\sqrt h
$$

です。従って

$$
\pi(h)
=
\pi(\sqrt h)^*\pi(\sqrt h).
$$

よって

$$
L_\xi(h)
=
\|\pi(\sqrt h)\xi\|^2
\ge0.
$$

Riesz--Markov により、一意な正 Radon 測度 $\mu_\xi$ が存在して

$$
\langle\xi,\pi(f)\xi\rangle
=
\int_Kf\,d\mu_\xi
$$

となります。

$f=1$ とすると

$$
\mu_\xi(K)
=
\langle\xi,I\xi\rangle
=
\|\xi\|^2.
$$

#### Step 2. 偏極して二つのベクトルを扱う

$\xi,\eta\in H$ に対して複素測度

$$
\boxed{
\mu_{\xi,\eta}
=
\frac14
\left(
\mu_{\xi+\eta}
-
\mu_{\xi-\eta}
-
i\mu_{\xi+i\eta}
+
i\mu_{\xi-i\eta}
\right)
}
$$

と置きます。

内積は第1変数について共役線形、第2変数について線形とします。

任意の sesquilinear form $B$ に対する偏極公式

$$
\begin{aligned}
B(\xi,\eta)
=
\frac14\bigl(
&q(\xi+\eta)-q(\xi-\eta)\\
&-i q(\xi+i\eta)
+i q(\xi-i\eta)
\bigr),
\end{aligned}
$$

ただし

$$
q(\zeta)=B(\zeta,\zeta),
$$

を

$$
B_f(\xi,\eta)
=
\langle\xi,\pi(f)\eta\rangle
$$

へ適用すると、

$$
\boxed{
\langle\xi,\pi(f)\eta\rangle
=
\int_Kf\,d\mu_{\xi,\eta}
}
$$

を得ます。

#### Step 3. Borel 集合ごとに作用素を作る

$B\in\mathcal B(K)$ を固定し、

$$
q_B(\xi)=\mu_\xi(B)
$$

と置きます。

$q_B(\xi)\ge0$ であり、

$$
q_B(\xi)
\le
\mu_\xi(K)
=
\|\xi\|^2.
$$

また Riesz--Markov の一意性から

$$
\mu_{\alpha\xi}
=
|\alpha|^2\mu_\xi
$$

および

$$
\mu_{\xi+\eta}+\mu_{\xi-\eta}
=
2\mu_\xi+2\mu_\eta
$$

が成り立ちます。

従って $q_B$ は正半定値二次形式です。その偏極

$$
\beta_B(\xi,\eta)
=
\mu_{\xi,\eta}(B)
$$

は正半定値 sesquilinear form になります。

Cauchy--Schwarz 不等式から

$$
|\beta_B(\xi,\eta)|^2
\le
q_B(\xi)q_B(\eta)
\le
\|\xi\|^2\|\eta\|^2.
$$

従って

$$
|\beta_B(\xi,\eta)|
\le
\|\xi\|\|\eta\|.
$$

[Hilbert 空間の Riesz 表現定理](../F0_02C2_線形汎関数_双対空間_Riesz/index.md#ref-riesz-representation)により、一意な有界作用素 $E(B)$ が存在して

$$
\boxed{
\langle\xi,E(B)\eta\rangle
=
\mu_{\xi,\eta}(B)
}
$$

となります。

特に

$$
0
\le
\langle\xi,E(B)\xi\rangle
=
\mu_\xi(B)
\le
\|\xi\|^2
$$

なので

$$
0\le E(B)\le I.
$$

#### Step 4. 有界 Borel 関数まで一旦拡張する

$g:K\to\mathbb C$ を有界 Borel 関数とします。

$g\ge0$ のとき

$$
q_g(\xi)=\int_Kg\,d\mu_\xi
$$

は正半定値二次形式で、

$$
0\le q_g(\xi)
\le
\|g\|_\infty\|\xi\|^2.
$$

偏極と Riesz 表現により作用素 $\widetilde\pi(g)$ を

$$
\langle\xi,\widetilde\pi(g)\eta\rangle
=
\int_Kg\,d\mu_{\xi,\eta}
$$

で定められます。

一般の複素 $g$ は実部・虚部を正部分と負部分に分ければ同じ式で定義できます。

$g=f\in C(K)$ なら Step 2 から

$$
\widetilde\pi(f)=\pi(f).
$$

#### Step 5. 積を保つことを Borel 関数へ延長する

まず $f\in C(K)$ とします。

任意の $u\in C(K)$ について

$$
\begin{aligned}
\int_Ku\,d\mu_{\xi,\pi(f)\eta}
&=
\langle\xi,\pi(u)\pi(f)\eta\rangle\\
&=
\langle\xi,\pi(uf)\eta\rangle\\
&=
\int_Kuf\,d\mu_{\xi,\eta}.
\end{aligned}
$$

複素測度の一意性から

$$
d\mu_{\xi,\pi(f)\eta}
=
f\,d\mu_{\xi,\eta}.
$$

従って有界 Borel 関数 $g$ に対し、

$$
\begin{aligned}
\langle\xi,\widetilde\pi(g)\pi(f)\eta\rangle
&=
\int_Kg\,d\mu_{\xi,\pi(f)\eta}\\
&=
\int_Kgf\,d\mu_{\xi,\eta}\\
&=
\langle\xi,\widetilde\pi(gf)\eta\rangle.
\end{aligned}
$$

よって

$$
\widetilde\pi(g)\pi(f)
=
\widetilde\pi(gf).
$$

$g$ を固定し、

$$
\mathcal M_g
=
\left\{
h:
\widetilde\pi(g)\widetilde\pi(h)
=
\widetilde\pi(gh)
\right\}
$$

とします。

$\mathcal M_g$ は線形空間で、今示したことから $C(K)$ を含みます。

さらに $h_n$ が一様有界で点ごとに $h_n\to h$ なら、有限複素測度 $\mu_{\xi,\eta}$ に対する優収束定理から

$$
\widetilde\pi(h_n)
\to
\widetilde\pi(h)
$$

が弱作用素位相で成り立ちます。

したがって

$$
h_n\in\mathcal M_g
$$

なら極限を取って

$$
h\in\mathcal M_g.
$$

$K$ はコンパクト距離空間であり、Borel σ代数は連続関数が生成します。関数版の単調類定理により、$\mathcal M_g$ は全ての有界 Borel 関数を含みます。

従って

$$
\boxed{
\widetilde\pi(g)\widetilde\pi(h)
=
\widetilde\pi(gh)
}
$$

が全ての有界 Borel 関数 $g,h$ で成り立ちます。

同様に

$$
\widetilde\pi(\overline g)
=
\widetilde\pi(g)^*
$$

も行列要素から従います。

#### Step 6. 指示関数を入れる

Borel 集合 $B$ に対して

$$
E(B)
=
\widetilde\pi(\mathbf 1_B)
$$

です。

積と随伴を保つので

$$
E(B)^2
=
\widetilde\pi(\mathbf 1_B^2)
=
E(B),
$$

$$
E(B)^*
=
E(B).
$$

従って $E(B)$ は直交射影です。

また

$$
E(B)E(C)
=
\widetilde\pi(\mathbf 1_B\mathbf 1_C)
=
E(B\cap C).
$$

さらに

$$
E(K)=I.
$$

互いに素な $B_1,B_2,\ldots$ に対して、スカラー測度の可算加法性から弱い意味で

$$
E\left(\bigcup_{n=1}^\infty B_n\right)
=
\sum_{n=1}^\infty E(B_n)
$$

です。

強収束も確認します。

$$
B^{(N)}
=
\bigcup_{n>N}B_n
$$

と置くと、射影の積の規則から

$$
E\left(\bigcup_{n=1}^\infty B_n\right)
-
\sum_{n=1}^NE(B_n)
=
E(B^{(N)}).
$$

任意の $\eta\in H$ に対して

$$
\begin{aligned}
\|E(B^{(N)})\eta\|^2
&=
\langle\eta,E(B^{(N)})\eta\rangle\\
&=
\mu_\eta(B^{(N)})\\
&\longrightarrow0
\end{aligned}
$$

です。最後は有限測度 $\mu_\eta$ の上からの連続性によります。

従って $E$ は射影値測度です。

#### Step 7. 表現公式と一意性

$f\in C(K)$ では

$$
\widetilde\pi(f)=\pi(f)
$$

でした。一方、QM3 の射影値積分の構成では

$$
\widetilde\pi(f)
=
\int_Kf\,dE.
$$

従って

$$
\pi(f)=\int_Kf\,dE.
$$

別の射影値測度 $F$ が同じ式を満たすとします。

各 $\xi$ について

$$
B\mapsto
\langle\xi,E(B)\xi\rangle,
\qquad
B\mapsto
\langle\xi,F(B)\xi\rangle
$$

は、全ての連続関数に対して同じ積分値を持ちます。

Riesz--Markov の一意性から二つの正測度は一致します。偏極により全ての行列要素も一致するため、

$$
E(B)=F(B)
$$

です。
<!-- proof-end -->

この定理が、Gelfand 理論と PVM を結ぶ橋です。

---

## 4. 有界正規作用素のスペクトル定理

いよいよ正規作用素へ戻ります。

<a id="thm-oa6-bounded-normal-spectral-theorem"></a>

<!-- formal-statement-start -->
### 定理（有界正規作用素のスペクトル定理）

$H$ を複素 Hilbert 空間、$T\in B(H)$ を正規作用素とする。

このとき $K=\sigma(T)\subset\mathbb C$ 上の一意な射影値測度 $E_T$ が存在して

$$
\boxed{
T
=
\int_K z\,dE_T(z)
}
$$

が成り立つ。

さらに任意の $f\in C(K)$ に対して

$$
\boxed{
f(T)
=
\int_K f(z)\,dE_T(z)
}
$$

であり、左辺は OA4 の連続関数計算である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$T$ は正規なので、OA4 の連続関数計算

$$
\pi_T:C(K)\to B(H),
\qquad
\pi_T(f)=f(T)
$$

は単位的 *-準同型です。

前節の定理を $\pi_T$ に適用すると、一意な射影値測度 $E_T$ が存在して

$$
f(T)
=
\int_Kf(z)\,dE_T(z)
$$

が任意の $f\in C(K)$ で成り立ちます。

特に座標関数

$$
\iota(z)=z
$$

を取れば、連続関数計算の定義から

$$
\iota(T)=T.
$$

従って

$$
T
=
\int_Kz\,dE_T(z).
$$

一意性は前節の定理の一意性そのものです。
<!-- proof-end -->

この定理から随伴も同じ PVM で読めます。

$$
T^*
=
\int_K\overline z\,dE_T(z).
$$

従って

$$
\begin{aligned}
T^*T
&=
\int_K|z|^2\,dE_T(z),\\
TT^*
&=
\int_K|z|^2\,dE_T(z).
\end{aligned}
$$

ここでは「正規性を仮定したからスペクトル定理が使えた」だけでなく、PVM 表示から正規性も見えることが重要です。

<a id="prop-oa6-pvm-integral-normal"></a>

<!-- formal-statement-start -->
### 命題（PVM による座標関数の積分は正規作用素である）

$K\subset\mathbb C$ をコンパクト集合、$E$ を $K$ 上の射影値測度とする。

$$
T=\int_K z\,dE(z)
$$

と置くと $T$ は正規作用素であり、

$$
T^*
=
\int_K\overline z\,dE(z)
$$

を満たす。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

射影値積分は積と随伴を保つので、

$$
T^*
=
\left(
\int_Kz\,dE(z)
\right)^*
=
\int_K\overline z\,dE(z).
$$

従って

$$
\begin{aligned}
T^*T
&=
\left(\int_K\overline z\,dE\right)
\left(\int_Kz\,dE\right)\\
&=
\int_K\overline z z\,dE\\
&=
\int_K|z|^2\,dE.
\end{aligned}
$$

同様に

$$
\begin{aligned}
TT^*
&=
\int_Kz\overline z\,dE\\
&=
\int_K|z|^2\,dE.
\end{aligned}
$$

よって

$$
T^*T=TT^*.
$$
<!-- proof-end -->

---

## 5. QM3 の自己共役スペクトル定理は同じものになる

自己共役作用素

$$
A=A^*
$$

では

$$
\sigma(A)\subset\mathbb R.
$$

QM3 ではすでに PVM $E_A^{\mathrm{QM3}}$ を構成し、

$$
A
=
\int_{\sigma(A)}\lambda\,dE_A^{\mathrm{QM3}}(\lambda)
$$

を証明しました。

本章の方法でも OA4 の連続関数計算から PVM $E_A^{\mathrm{OA6}}$ が得られます。

この二つは別物ではありません。

<a id="prop-oa6-self-adjoint-agreement"></a>

<!-- formal-statement-start -->
### 命題（自己共役の場合の PVM の一致）

$A\in B(H)$ を自己共役作用素とする。

QM3 の有界自己共役スペクトル定理で得られる PVM と、本章の可換 $C(\sigma(A))$ 表現から得られる PVM は一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

QM3 の PVM を $E_1$、本章の PVM を $E_2$ とします。

QM3 の射影値積分は連続関数に対して連続関数計算と一致するので、

$$
\int f\,dE_1
=
f(A)
$$

です。

本章の構成からも

$$
\int f\,dE_2
=
f(A)
$$

です。

従って任意の $f\in C(\sigma(A))$ について

$$
\int f\,dE_1
=
\int f\,dE_2.
$$

各 $\xi\in H$ で行列要素を取ると、

$$
\int f\,d\mu_\xi^{(1)}
=
\int f\,d\mu_\xi^{(2)}
$$

となります。

Riesz--Markov の一意性から

$$
\mu_\xi^{(1)}
=
\mu_\xi^{(2)}.
$$

偏極により全ての行列要素が一致するので

$$
E_1(B)=E_2(B)
$$

が全 Borel 集合 $B$ で成り立ちます。
<!-- proof-end -->

したがって

$$
\boxed{
\text{有限次元の unitary 対角化}
\subset
\text{FA7 のコンパクト自己共役展開}
\subset
\text{QM3 の自己共役 PVM}
\subset
\text{本章の正規 PVM}
}
$$

という拡張関係が見えます。

---

## 6. 有界 Borel 関数計算

OA4 の連続関数計算では

$$
f\in C(\sigma(T))
$$

だけを扱いました。

しかし PVM が得られると、指示関数

$$
\mathbf 1_B
$$

のような不連続関数も作用素へ送れます。

<a id="def-oa6-bounded-borel-functional-calculus"></a>

<!-- formal-statement-start -->
### 定義（有界 Borel 関数計算）

$T\in B(H)$ を正規作用素、$E_T$ をそのスペクトル測度とする。

有界 Borel 関数

$$
g:\sigma(T)\to\mathbb C
$$

に対して

$$
\boxed{
g(T)
=
\int_{\sigma(T)}g(z)\,dE_T(z)
}
$$

と定める。

これを $T$ の **有界 Borel 関数計算** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-oa6-bounded-borel-functional-calculus -->

### 直接例：指示関数はスペクトル射影になる

Borel 集合

$$
B\subset\sigma(T)
$$

に対して

$$
g=\mathbf 1_B
$$

とします。

定義から

$$
\mathbf 1_B(T)
=
\int\mathbf 1_B\,dE_T
=
E_T(B).
$$

さらに

$$
\mathbf 1_B^2=\mathbf 1_B,
\qquad
\overline{\mathbf 1_B}=\mathbf 1_B
$$

なので

$$
E_T(B)^2=E_T(B),
\qquad
E_T(B)^*=E_T(B).
$$

従って Borel 関数計算は、スペクトルの一部分だけを取り出す直交射影を直接作ります。

<!-- definition-example-end -->

<a id="prop-oa6-borel-calculus-properties"></a>

<!-- formal-statement-start -->
### 命題（有界 Borel 関数計算の基本性質）

正規作用素 $T$ に対する有界 Borel 関数計算は、任意の有界 Borel 関数 $g,h$ と $\alpha,\beta\in\mathbb C$ に対して

$$
(\alpha g+\beta h)(T)
=
\alpha g(T)+\beta h(T),
$$

$$
(gh)(T)=g(T)h(T),
$$

$$
\overline g(T)=g(T)^*,
$$

$$
1(T)=I
$$

を満たす。

さらに

$$
\boxed{
\|g(T)\|
\le
\|g\|_\infty
}
$$

であり、$g$ が連続なら OA4 の連続関数計算と一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

線形性・積・随伴・単位元については、前節の可換表現の証明で構成した

$$
\widetilde\pi
$$

が有界 Borel 関数上の単位的 *-準同型であることから従います。

ノルム評価を確認します。

まず $g^*g=|g|^2$ なので、

$$
g(T)^*g(T)
=
|g|^2(T).
$$

また点ごとに

$$
0\le|g|^2\le\|g\|_\infty^2
$$

です。

任意の $\xi\in H$ に対して

$$
\begin{aligned}
\langle\xi,|g|^2(T)\xi\rangle
&=
\int|g|^2\,d\mu_\xi\\
&\le
\|g\|_\infty^2
\int1\,d\mu_\xi\\
&=
\|g\|_\infty^2\|\xi\|^2.
\end{aligned}
$$

従って

$$
0\le |g|^2(T)\le \|g\|_\infty^2 I.
$$

よって

$$
\begin{aligned}
\|g(T)\|^2
&=
\|g(T)^*g(T)\|\\
&=
\||g|^2(T)\|\\
&\le
\|g\|_\infty^2.
\end{aligned}
$$

平方根を取れば

$$
\|g(T)\|
\le
\|g\|_\infty.
$$

$g$ が連続なら、スペクトル定理の構成そのものから OA4 の連続関数計算と一致します。
<!-- proof-end -->

### 連続関数計算より何が増えたか

ここは重要です。

$$
C^*(T,I)
$$

の中にあるのは、OA4 により基本的には

$$
f(T),
\qquad
f\in C(\sigma(T))
$$

です。

一方、Borel 関数計算では

$$
E_T(B)=\mathbf 1_B(T)
$$

も作れます。

たとえば $\sigma(T)=[0,1]$ で

$$
B=[0,1/2]
$$

なら $\mathbf 1_B$ は不連続です。

従って一般には

$$
E_T(B)\notin C^*(T,I)
$$

です。

ここで

$$
\boxed{
\text{ノルム閉な }C^*\text{-環}
\quad\longrightarrow\quad
\text{より弱い作用素収束で射影を取り込む世界}
}
$$

へ進む理由が現れます。次章以降の von Neumann 環は、この差を体系的に扱います。

---

## 7. GNS 構成から見るスペクトル分布

OA5 では状態 $\varphi$ から

$$
(\pi_\varphi,H_\varphi,\Omega_\varphi)
$$

を作り、

$$
\varphi(a)
=
\langle
\Omega_\varphi,
\pi_\varphi(a)\Omega_\varphi
\rangle
$$

を得ました。

正規元 $a$ にこれを適用すると、抽象 $C^*$-環上のスペクトル分布が Hilbert 空間上のベクトル状態として実現されます。

<a id="prop-oa6-gns-spectral-distribution"></a>

<!-- formal-statement-start -->
### 命題（GNS 表現でのスペクトル分布の回収）

$A$ を単位的 $C^*$-環、$\varphi$ を状態、$a\in A$ を正規元とする。

GNS 表現を

$$
(\pi_\varphi,H_\varphi,\Omega_\varphi)
$$

とし、

$$
T_\varphi=\pi_\varphi(a)
$$

と置く。

すると $T_\varphi$ は正規であり、任意の $f\in C(\sigma_A(a))$ について

$$
\boxed{
\varphi(f(a))
=
\langle
\Omega_\varphi,
f(T_\varphi)\Omega_\varphi
\rangle
}
$$

が成り立つ。

従って状態 $\varphi$ における $a$ のスペクトル分布は、$T_\varphi$ の PVM を巡回ベクトル $\Omega_\varphi$ で読んだスカラー測度と一致する。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$\pi_\varphi$ は *-準同型なので

$$
\begin{aligned}
T_\varphi^*T_\varphi
&=
\pi_\varphi(a)^*\pi_\varphi(a)\\
&=
\pi_\varphi(a^*a),
\end{aligned}
$$

$$
\begin{aligned}
T_\varphi T_\varphi^*
&=
\pi_\varphi(aa^*).
\end{aligned}
$$

$a$ は正規なので

$$
a^*a=aa^*.
$$

従って

$$
T_\varphi^*T_\varphi
=
T_\varphi T_\varphi^*.
$$

よって $T_\varphi$ は正規です。

多項式 $p(z,\overline z)$ については *-準同型性から

$$
\pi_\varphi(p(a,a^*))
=
p(T_\varphi,T_\varphi^*).
$$

OA4 の連続関数計算はこの *-多項式を一様極限で閉じたものなので、連続性から

$$
\pi_\varphi(f(a))
=
f(T_\varphi)
$$

が成り立ちます。

GNS の状態回収公式を $f(a)$ に適用すると

$$
\begin{aligned}
\varphi(f(a))
&=
\langle
\Omega_\varphi,
\pi_\varphi(f(a))\Omega_\varphi
\rangle\\
&=
\langle
\Omega_\varphi,
f(T_\varphi)\Omega_\varphi
\rangle.
\end{aligned}
$$

$T_\varphi$ の PVM を $E_{T_\varphi}$ とすると、

$$
f(T_\varphi)
=
\int f\,dE_{T_\varphi}.
$$

従って

$$
\varphi(f(a))
=
\int f(z)\,
d\langle
\Omega_\varphi,E_{T_\varphi}(z)\Omega_\varphi
\rangle.
$$

一方、左辺を表す確率測度は第2節で一意です。

よって二つの測度は一致します。
<!-- proof-end -->

この式は

$$
\text{抽象状態}
\longleftrightarrow
\text{GNS のベクトル状態}
\longleftrightarrow
\text{スペクトル上の確率測度}
$$

という三つの見方を一つにします。

---

## 8. 二つの具体例

### 8.1 対角正規行列

$$
T=
\begin{pmatrix}
1&0&0\\
0&i&0\\
0&0&-1
\end{pmatrix}
$$

とします。

固有空間への直交射影を

$$
P_1=
\begin{pmatrix}
1&0&0\\
0&0&0\\
0&0&0
\end{pmatrix},
$$

$$
P_i=
\begin{pmatrix}
0&0&0\\
0&1&0\\
0&0&0
\end{pmatrix},
$$

$$
P_{-1}=
\begin{pmatrix}
0&0&0\\
0&0&0\\
0&0&1
\end{pmatrix}
$$

とします。

PVM は

$$
E(B)
=
\mathbf 1_B(1)P_1
+
\mathbf 1_B(i)P_i
+
\mathbf 1_B(-1)P_{-1}.
$$

従って

$$
\begin{aligned}
\int z\,dE(z)
&=
1P_1+iP_i-1P_{-1}\\
&=
T.
\end{aligned}
$$

また任意の有界関数 $g$ について

$$
g(T)
=
g(1)P_1+g(i)P_i+g(-1)P_{-1}.
$$

有限次元の unitary 対角化は、PVM 積分が有限和になった場合そのものです。

### 8.2 複素数値の乗算作用素

$$
H=L^2([0,1]),
$$

$$
m(x)=x+ix^2
$$

とし、

$$
(Tf)(x)=m(x)f(x)
$$

と置きます。

随伴は

$$
(T^*f)(x)=\overline{m(x)}f(x)
$$

なので

$$
T^*T=TT^*=M_{|m|^2}.
$$

従って $T$ は正規です。

スペクトルは連続曲線

$$
K=m([0,1])
=
\{x+ix^2:0\le x\le1\}
$$

になります。

Borel 集合 $B\subset K$ に対して

$$
(E(B)f)(x)
=
\mathbf 1_{m^{-1}(B)}(x)f(x)
$$

と置くと、

$$
E(B)^2=E(B),
\qquad
E(B)^*=E(B)
$$

です。

さらに

$$
\left(
\int_K z\,dE(z)
\right)f(x)
=
m(x)f(x)
=
Tf(x).
$$

固有ベクトルを列挙できなくても、スペクトル上の集合ごとに射影を切り出せることが PVM 版スペクトル定理の強みです。

---

## 演習

## Level A

### A1. 二点スペクトルの PVM

- Level: A

$$
T=
\begin{pmatrix}
2&0\\
0&i
\end{pmatrix}
$$

とする。

1. $\sigma(T)$ を求めよ。
2. 各 Borel 集合 $B\subset\sigma(T)$ に対する $E_T(B)$ を書け。
3. $T=\int z\,dE_T(z)$ を有限和として確認せよ。
4. $g(2)=3$, $g(i)=-1$ を満たす関数 $g$ に対して $g(T)$ を求めよ。

<!-- solution-start -->
### 詳細解答

#### 1. スペクトル

対角行列なので固有値は対角成分です。

$$
\sigma(T)=\{2,i\}.
$$

#### 2. PVM

標準基底への射影を

$$
P_2=
\begin{pmatrix}
1&0\\
0&0
\end{pmatrix},
\qquad
P_i=
\begin{pmatrix}
0&0\\
0&1
\end{pmatrix}
$$

とします。

すると

$$
E_T(B)
=
\mathbf 1_B(2)P_2
+
\mathbf 1_B(i)P_i.
$$

#### 3. スペクトル積分

有限集合上の積分は有限和なので

$$
\begin{aligned}
\int z\,dE_T(z)
&=
2P_2+iP_i\\
&=
\begin{pmatrix}
2&0\\
0&i
\end{pmatrix}\\
&=
T.
\end{aligned}
$$

#### 4. 関数計算

$$
\begin{aligned}
g(T)
&=
g(2)P_2+g(i)P_i\\
&=
3P_2-P_i\\
&=
\begin{pmatrix}
3&0\\
0&-1
\end{pmatrix}.
\end{aligned}
$$
<!-- solution-end -->

### A2. 状態によるスペクトル分布

- Level: A

A1 の $T$ に対して

$$
\xi=
\begin{pmatrix}
\sqrt p\\
\sqrt{1-p}
\end{pmatrix},
\qquad
0\le p\le1
$$

とし、

$$
\omega_\xi(A)=\xi^*A\xi
$$

と置く。

$\omega_\xi$ における $T$ のスペクトル分布を求めよ。

<!-- solution-start -->
### 詳細解答

任意の $f\in C(\{2,i\})$ について

$$
f(T)
=
\begin{pmatrix}
f(2)&0\\
0&f(i)
\end{pmatrix}.
$$

従って

$$
\begin{aligned}
\omega_\xi(f(T))
&=
\xi^*f(T)\xi\\
&=
p f(2)+(1-p)f(i).
\end{aligned}
$$

したがって

$$
\boxed{
\mu_{\omega_\xi,T}
=
p\delta_2+(1-p)\delta_i.
}
$$

実際、

$$
\int f\,d\mu_{\omega_\xi,T}
=
pf(2)+(1-p)f(i)
$$

となり定義を満たします。
<!-- solution-end -->

### A3. 自己共役作用素では台が実数になる

- Level: A

$A\in B(H)$ を自己共役とし、本章の正規作用素スペクトル定理を適用する。

1. $\sigma(A)\subset\mathbb R$ を使って、PVM の台が実数上にあることを説明せよ。
2. $A=\int \lambda\,dE_A(\lambda)$ が QM3 の表示と同じ形になることを確認せよ。

<!-- solution-start -->
### 詳細解答

#### 1. スペクトルの位置

自己共役作用素については既に

$$
\sigma(A)\subset\mathbb R
$$

が分かっています。

本章の PVM は

$$
\sigma(A)
$$

上に定義されるので、その台も実数上にあります。

したがって複素座標関数 $z$ を積分しても、台上では

$$
z=\lambda\in\mathbb R
$$

です。

#### 2. QM3 の形

本章の定理は

$$
A
=
\int_{\sigma(A)}z\,dE_A(z)
$$

を与えます。

台上で $z=\lambda$ なので

$$
A
=
\int_{\sigma(A)}\lambda\,dE_A(\lambda).
$$

これは QM3 の自己共役スペクトル定理と同じ形です。

さらに本文の一意性の議論により、PVM 自体も QM3 のものと一致します。
<!-- solution-end -->

### A4. 指示関数から射影を作る

- Level: A

$T$ を正規作用素、$B\subset\sigma(T)$ を Borel 集合とする。

$$
P=\mathbf 1_B(T)
$$

と置く。

$P$ が直交射影であることを、有界 Borel 関数計算の積・随伴との両立から示せ。

<!-- solution-start -->
### 詳細解答

指示関数は点ごとに

$$
\mathbf 1_B^2=\mathbf 1_B
$$

を満たします。

従って積を保つ性質から

$$
\begin{aligned}
P^2
&=
\mathbf 1_B(T)\mathbf 1_B(T)\\
&=
(\mathbf 1_B^2)(T)\\
&=
\mathbf 1_B(T)\\
&=
P.
\end{aligned}
$$

また $\mathbf 1_B$ は実数値なので

$$
\overline{\mathbf 1_B}
=
\mathbf 1_B.
$$

随伴との両立から

$$
\begin{aligned}
P^*
&=
\mathbf 1_B(T)^*\\
&=
\overline{\mathbf 1_B}(T)\\
&=
\mathbf 1_B(T)\\
&=
P.
\end{aligned}
$$

したがって $P$ は自己共役冪等作用素、すなわち直交射影です。
<!-- solution-end -->

## Level B

### B1. 可換表現から得られる $E(B)$ の有界性

- Level: B

本文の可換表現定理の記号を使う。

Borel 集合 $B\subset K$ に対して

$$
\beta_B(\xi,\eta)=\mu_{\xi,\eta}(B)
$$

と置く。

1. $q_B(\xi)=\mu_\xi(B)$ が $0\le q_B(\xi)\le\|\xi\|^2$ を満たすことを示せ。
2. Cauchy--Schwarz により
   $$
   |\beta_B(\xi,\eta)|
   \le
   \|\xi\|\|\eta\|
   $$
   を導け。
3. Riesz 表現により $E(B)\in B(H)$ が存在する理由を説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 二次形式の評価

$\mu_\xi$ は正測度なので

$$
q_B(\xi)=\mu_\xi(B)\ge0.
$$

また

$$
B\subset K
$$

だから

$$
\mu_\xi(B)\le\mu_\xi(K).
$$

本文で

$$
\mu_\xi(K)=\|\xi\|^2
$$

を得ているので

$$
0\le q_B(\xi)\le\|\xi\|^2.
$$

#### 2. Cauchy--Schwarz

$q_B$ の偏極で得られる sesquilinear form が $\beta_B$ です。

正半定値 sesquilinear form の Cauchy--Schwarz 不等式から

$$
|\beta_B(\xi,\eta)|^2
\le
q_B(\xi)q_B(\eta).
$$

1 の評価を代入すると

$$
|\beta_B(\xi,\eta)|^2
\le
\|\xi\|^2\|\eta\|^2.
$$

従って

$$
|\beta_B(\xi,\eta)|
\le
\|\xi\|\|\eta\|.
$$

#### 3. 作用素への回収

$\eta$ を固定すると

$$
\xi\mapsto\beta_B(\xi,\eta)
$$

は連続な共役線形汎関数で、そのノルムは高々 $\|\eta\|$ です。

Hilbert 空間の Riesz 表現定理により、ある一意なベクトル $E(B)\eta$ が存在して

$$
\beta_B(\xi,\eta)
=
\langle\xi,E(B)\eta\rangle
$$

となります。

さらに 2 の評価から

$$
\|E(B)\eta\|
\le
\|\eta\|
$$

なので

$$
\|E(B)\|\le1.
$$

よって $E(B)\in B(H)$ です。
<!-- solution-end -->

### B2. PVM 表示から正規性を回収する

- Level: B

$K\subset\mathbb C$ をコンパクト集合、$E$ を $K$ 上の PVM とし、

$$
T=\int_Kz\,dE(z)
$$

とする。

1. $T^*=\int_K\overline z\,dE(z)$ を示せ。
2. $T^*T=TT^*=\int_K|z|^2\,dE(z)$ を示せ。
3. 従って $T$ が正規であることを結論せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 随伴

射影値積分は複素共役と随伴を対応させるので

$$
\begin{aligned}
T^*
&=
\left(
\int_Kz\,dE(z)
\right)^*\\
&=
\int_K\overline z\,dE(z).
\end{aligned}
$$

#### 2. 積

積の規則から

$$
\begin{aligned}
T^*T
&=
\left(
\int_K\overline z\,dE
\right)
\left(
\int_Kz\,dE
\right)\\
&=
\int_K\overline z z\,dE\\
&=
\int_K|z|^2\,dE.
\end{aligned}
$$

同様に

$$
\begin{aligned}
TT^*
&=
\int_Kz\overline z\,dE\\
&=
\int_K|z|^2\,dE.
\end{aligned}
$$

#### 3. 正規性

従って

$$
T^*T=TT^*.
$$

これは正規作用素の定義そのものなので、$T$ は正規です。
<!-- solution-end -->

### B3. GNS とスペクトル分布

- Level: B

$A$ を単位的 $C^*$-環、$\varphi$ を状態、$a\in A$ を正規元とする。

GNS 表現を

$$
(\pi_\varphi,H_\varphi,\Omega_\varphi)
$$

とする。

1. $\pi_\varphi(a)$ が正規であることを示せ。
2. 多項式 $p(z,\overline z)$ に対して
   $$
   \pi_\varphi(p(a,a^*))
   =
   p(\pi_\varphi(a),\pi_\varphi(a)^*)
   $$
   を示せ。
3. 連続関数 $f$ へ一様極限で拡張し、
   $$
   \varphi(f(a))
   =
   \langle\Omega_\varphi,f(\pi_\varphi(a))\Omega_\varphi\rangle
   $$
   を導け。

<!-- solution-start -->
### 詳細解答

#### 1. 正規性

$\pi_\varphi$ は *-準同型なので

$$
\pi_\varphi(a)^*
=
\pi_\varphi(a^*).
$$

従って

$$
\begin{aligned}
\pi_\varphi(a)^*\pi_\varphi(a)
&=
\pi_\varphi(a^*)\pi_\varphi(a)\\
&=
\pi_\varphi(a^*a),
\end{aligned}
$$

$$
\begin{aligned}
\pi_\varphi(a)\pi_\varphi(a)^*
&=
\pi_\varphi(aa^*).
\end{aligned}
$$

$a$ が正規なので

$$
a^*a=aa^*.
$$

よって

$$
\pi_\varphi(a)^*\pi_\varphi(a)
=
\pi_\varphi(a)\pi_\varphi(a)^*.
$$

#### 2. 多項式

$\pi_\varphi$ は和・積・スカラー倍・随伴を保ちます。

従って単項式ごとに

$$
\pi_\varphi(a^ma^{*n})
=
\pi_\varphi(a)^m\pi_\varphi(a)^{*n}.
$$

有限和を取れば

$$
\pi_\varphi(p(a,a^*))
=
p(\pi_\varphi(a),\pi_\varphi(a)^*).
$$

#### 3. 連続関数への拡張

OA4 の連続関数計算では、$f$ を $z,\overline z$ の *-多項式で一様近似できます。

$$
p_n\to f
$$

とすると

$$
p_n(a,a^*)\to f(a)
$$

がノルム収束します。

$\pi_\varphi$ は縮小写像なので

$$
\pi_\varphi(p_n(a,a^*))
\to
\pi_\varphi(f(a))
$$

です。

一方 2 より

$$
\pi_\varphi(p_n(a,a^*))
=
p_n(\pi_\varphi(a),\pi_\varphi(a)^*)
\to
f(\pi_\varphi(a)).
$$

従って

$$
\pi_\varphi(f(a))
=
f(\pi_\varphi(a)).
$$

GNS の状態回収公式から

$$
\begin{aligned}
\varphi(f(a))
&=
\langle
\Omega_\varphi,
\pi_\varphi(f(a))\Omega_\varphi
\rangle\\
&=
\langle
\Omega_\varphi,
f(\pi_\varphi(a))\Omega_\varphi
\rangle.
\end{aligned}
$$
<!-- solution-end -->

### B4. 連続関数計算にない射影

- Level: B

$H=L^2([0,1])$ とし、

$$
(Tf)(x)=xf(x)
$$

とする。

$$
B=[0,1/2]
$$

に対するスペクトル射影は

$$
(E_T(B)f)(x)
=
\mathbf 1_{[0,1/2]}(x)f(x)
$$

である。

1. $E_T(B)$ が直交射影であることを直接示せ。
2. $E_T(B)$ が $C^*(T,I)$ に属さない理由を、OA4 の
   $$
   C^*(T,I)\cong C([0,1])
   $$
   と $\mathbf 1_{[0,1/2]}$ の不連続性から説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 直交射影

任意の $f\in L^2([0,1])$ に対して

$$
E_T(B)^2f
=
\mathbf 1_B^2f.
$$

指示関数は

$$
\mathbf 1_B^2=\mathbf 1_B
$$

なので

$$
E_T(B)^2=E_T(B).
$$

また $\mathbf 1_B$ は実数値なので乗算作用素は自己共役です。

従って

$$
E_T(B)^*=E_T(B).
$$

よって直交射影です。

#### 2. $C^*(T,I)$ の外に出ること

OA4 の連続関数計算により

$$
C^*(T,I)
=
\{f(T):f\in C([0,1])\}
$$

とみなせます。

もし

$$
E_T(B)\in C^*(T,I)
$$

なら、ある連続関数 $f$ が存在して

$$
f(T)=E_T(B)
$$

となるはずです。

乗算作用素として比較すると

$$
f(x)=\mathbf 1_{[0,1/2]}(x)
$$

がほとんど至る所で必要です。

しかし右辺は $x=1/2$ で跳躍するため、これと a.e. 一致する連続関数は存在しません。

従って

$$
E_T(B)\notin C^*(T,I).
$$

Borel 関数計算で得た射影が、連続関数計算だけのノルム閉 $C^*$-環より大きな世界を要求する具体例です。
<!-- solution-end -->

## Level C

### C1. 実部・虚部と一つの PVM

- Level: C

$T\in B(H)$ を正規作用素とし、

$$
A=\frac{T+T^*}{2},
\qquad
B=\frac{T-T^*}{2i}
$$

と置く。

1. $A,B$ が自己共役であることを示せ。
2. $T=A+iB$ を示せ。
3. $T$ の正規性から $AB=BA$ を導け。
4. $T$ の PVM を $E_T$ とし、
   $$
   T=\int z\,dE_T(z)
   $$
   とする。すると
   $$
   A=\int \operatorname{Re}z\,dE_T(z),
   \qquad
   B=\int \operatorname{Im}z\,dE_T(z)
   $$
   となることを示せ。
5. この表示から、$A$ と $B$ のスペクトル情報が「別々の二つの測度」ではなく一つの複素平面上の PVM にまとめられていることを説明せよ。

<!-- solution-start -->
### 詳細解答

#### 1. 自己共役性

まず

$$
\begin{aligned}
A^*
&=
\left(
\frac{T+T^*}{2}
\right)^*\\
&=
\frac{T^*+T}{2}\\
&=
A.
\end{aligned}
$$

次に

$$
\begin{aligned}
B^*
&=
\left(
\frac{T-T^*}{2i}
\right)^*\\
&=
\frac{T^*-T}{-2i}\\
&=
\frac{T-T^*}{2i}\\
&=
B.
\end{aligned}
$$

従って $A,B$ は自己共役です。

#### 2. $T=A+iB$

定義を代入すると

$$
\begin{aligned}
A+iB
&=
\frac{T+T^*}{2}
+
i\frac{T-T^*}{2i}\\
&=
\frac{T+T^*}{2}
+
\frac{T-T^*}{2}\\
&=
T.
\end{aligned}
$$

#### 3. 可換性

$T=A+iB$ なので

$$
T^*=A-iB.
$$

従って

$$
\begin{aligned}
T^*T
&=
(A-iB)(A+iB)\\
&=
A^2+B^2+i(AB-BA),
\end{aligned}
$$

一方

$$
\begin{aligned}
TT^*
&=
(A+iB)(A-iB)\\
&=
A^2+B^2-i(AB-BA).
\end{aligned}
$$

$T$ は正規だから

$$
T^*T=TT^*.
$$

両式を比較すると

$$
2i(AB-BA)=0.
$$

従って

$$
AB=BA.
$$

#### 4. 同じ PVM から実部・虚部を取り出す

スペクトル定理から

$$
T=\int z\,dE_T(z).
$$

随伴は

$$
T^*=\int\overline z\,dE_T(z).
$$

従って

$$
\begin{aligned}
A
&=
\frac{T+T^*}{2}\\
&=
\int
\frac{z+\overline z}{2}
\,dE_T(z)\\
&=
\int
\operatorname{Re}z
\,dE_T(z).
\end{aligned}
$$

同様に

$$
\begin{aligned}
B
&=
\frac{T-T^*}{2i}\\
&=
\int
\frac{z-\overline z}{2i}
\,dE_T(z)\\
&=
\int
\operatorname{Im}z
\,dE_T(z).
\end{aligned}
$$

#### 5. 一つの PVM による同時記述

$A$ と $B$ は可換する自己共役作用素です。

個別に自己共役スペクトル定理を適用すれば、それぞれに PVM を考えることもできます。

しかし正規作用素

$$
T=A+iB
$$

として見ると、一つの PVM $E_T$ 上で

$$
A=\operatorname{Re}(T),
\qquad
B=\operatorname{Im}(T)
$$

が同時に関数計算で得られます。

つまり複素スペクトルの点

$$
z=x+iy
$$

が、実部 $x$ と虚部 $y$ の情報を同時に持っています。

これが「自己共役作用素を一つずつ見る」立場から「正規作用素が生成する可換 $C^*$-環全体を見る」立場への移動です。
<!-- solution-end -->

---

## まとめ

本章では、OA4 の Gelfand 理論と QM3 の PVM 版スペクトル定理を一つに結びました。

まず正規元 $a$ と状態 $\varphi$ に対して

$$
f\longmapsto\varphi(f(a))
$$

を Riesz--Markov で測度へ変換し、

$$
\varphi(f(a))
=
\int f\,d\mu_{\varphi,a}
$$

を得ました。

次に一般の単位的 *-表現

$$
\pi:C(K)\to B(H)
$$

について、各ベクトルからスカラー測度 $\mu_\xi$ を作り、偏極で $\mu_{\xi,\eta}$ を得て、Hilbert 空間の Riesz 表現定理で

$$
E(B)
$$

を構成しました。

Borel 関数への拡張と単調類の議論により

$$
E(B)^2=E(B),
\qquad
E(B)^*=E(B),
\qquad
E(B)E(C)=E(B\cap C)
$$

を示し、$E$ が本当に射影値測度になることを確認しました。

これを OA4 の連続関数計算

$$
C(\sigma(T))\to B(H)
$$

へ適用すると、有界正規作用素について

$$
\boxed{
T
=
\int_{\sigma(T)}z\,dE_T(z)
}
$$

を得ます。

さらに

$$
\boxed{
f(T)
=
\int_{\sigma(T)}f(z)\,dE_T(z)
}
$$

なので、Gelfand 理論による連続関数計算と PVM 積分は同じ構造の二つの表現です。

そして PVM が得られると、連続関数だけでなく有界 Borel 関数まで

$$
g(T)=\int g\,dE_T
$$

と計算できます。

特に

$$
\mathbf 1_B(T)=E_T(B)
$$

はスペクトル射影です。

この射影は一般には

$$
C^*(T,I)
$$

の中にありません。

したがって次に必要になるのは、ノルム閉性より弱い作用素位相で閉じ、こうした射影を自然に含む作用素環です。

次章では $B(H)$ 上の strong operator topology と weak operator topology を導入し、von Neumann 環へ進みます。
