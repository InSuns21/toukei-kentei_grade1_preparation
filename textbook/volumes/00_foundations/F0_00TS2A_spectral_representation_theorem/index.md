# F0-00TS2A：定常過程の spectral representation theorem

TS2では、平均0の二次定常過程 $(X_t)_{t\in\mathbb Z}$ の自己共分散

$$
\gamma(h)=E[X_{t+h}\overline{X_t}]
$$

について、[Herglotz定理](../F0_00TS2_Herglotz_spectral_measure_density/index.md#thm-f0-00ts2-herglotz) により一意な有限非負測度 $F$ が存在し

$$
\gamma(h)=\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
$$

と表せることを示しました。

これはまだ **共分散列の表現** です。この補講ではさらに一段進み、過程そのものを

$$
\boxed{
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
}
$$

と表す直交増分ランダム測度 $Z$ を構成します。

中心線は

```text
Herglotz measure F
  ↓
trigonometric polynomials are dense in L2(F)
  ↓
U0(sum c_j exp(i t_j lambda)) = sum c_j X_{t_j}
  ↓ isometry
U : L2(F) -> closure span{X_t}
  ↓
Z(A) = U 1_A
  ↓
X_t = integral exp(i t lambda) Z(d lambda)
```

です。

---

## 0. 二つのHilbert空間

周波数表示では $e^{it\lambda}$ が現れるため、確率変数空間を複素Hilbert空間として

$$
\langle Y,W\rangle_{L^2(\Omega)}
:=E[Y\overline W]
$$

と扱います。

過程が生成する閉線形空間を

$$
\mathcal H_X
:=
\overline{\operatorname{span}_{\mathbb C}\{X_t:t\in\mathbb Z\}}^{L^2}
$$

と置きます。一方、周波数側は

$$
L^2(F):=L^2(\mathbb T,\mathcal B(\mathbb T),F)
$$

です。

目標は

$$
U:L^2(F)\to\mathcal H_X
$$

という等長写像を構成することです。

---

## 1. 連続関数は $L^2(F)$ に稠密

<a id="lem-f0-00ts2a-continuous-density"></a>

<!-- formal-statement-start -->
> **補題（連続関数の $L^2(F)$ 稠密性）**  
> 円周 $\mathbb T$ 上の有限Borel測度 $F$ に対し、$C(\mathbb T)$ は $L^2(F)$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

開集合 $O\subset\mathbb T$ を考えます。$O=\mathbb T$ は定数関数1でよいので、$O\ne\mathbb T$ とします。円周上の距離を $d$ として

$$
g_m(x):=\min\{1,m\,d(x,O^c)\}
$$

と置けば、$g_m$ は連続で

$$
0\le g_m\le1,
\qquad
g_m(x)\uparrow\mathbf1_O(x).
$$

従って優収束定理から

$$
\|g_m-\mathbf1_O\|_{L^2(F)}^2
=
\int|g_m-\mathbf1_O|^2dF
\to0.
$$

よって開集合の指示関数は $C(\mathbb T)$ の $L^2(F)$ 閉包に属します。

次に

$$
\mathcal D
:=
\{A\in\mathcal B(\mathbb T):
\mathbf1_A\in\overline{C(\mathbb T)}^{L^2(F)}\}
$$

と置きます。$\mathcal D$ は $\mathbb T$ を含み、補集合で閉じています。

互いに素な $A_1,A_2,\dots\in\mathcal D$ に対し、有限和

$$
\mathbf1_{\cup_{k=1}^nA_k}
=
\sum_{k=1}^n\mathbf1_{A_k}
$$

は閉包に属します。また

$$
\left\|
\mathbf1_{\cup_{k\ge1}A_k}
-
\mathbf1_{\cup_{k=1}^nA_k}
\right\|_2^2
=
F\left(\bigcup_{k>n}A_k\right)
\to0.
$$

従って $\mathcal D$ はDynkin族です。開集合全体は有限共通部分で閉じる $\pi$-systemなので、$\pi$--$\lambda$ 定理から

$$
\mathcal D=\mathcal B(\mathbb T).
$$

よって全Borel集合の指示関数、したがって全単関数が $C(\mathbb T)$ の $L^2(F)$ 閉包に属します。単関数は $L^2(F)$ に稠密なので、$C(\mathbb T)$ も稠密です。$\square$
<!-- proof-end -->

---

## 2. 三角多項式は $L^2(F)$ に稠密

TS2で使ったFejér近似は、連続周期関数を三角多項式で一様近似します。

<a id="thm-f0-00ts2a-trig-density"></a>

<!-- formal-statement-start -->
> **定理（三角多項式の $L^2(F)$ 稠密性）**  
> 円周上の有限Borel測度 $F$ に対し、次の三角多項式全体は $L^2(F)$ に稠密である。

$$
\mathcal P
:=\operatorname{span}_{\mathbb C}\{e^{it\lambda}:t\in\mathbb Z\}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$f\in L^2(F)$、$\varepsilon>0$ を取ります。前節から連続関数 $g$ を

$$
\|f-g\|_2<\frac\varepsilon2
$$

となるように選べます。

Fejér近似により三角多項式 $p$ を

$$
\|g-p\|_\infty
<
\frac{\varepsilon}{2\sqrt{F(\mathbb T)+1}}
$$

となるように選べます。すると

$$
\|g-p\|_2
\le
\sqrt{F(\mathbb T)}\|g-p\|_\infty
<\frac\varepsilon2.
$$

従って

$$
\|f-p\|_2<\varepsilon.
$$

よって $\mathcal P$ は $L^2(F)$ に稠密です。$\square$
<!-- proof-end -->

---

## 3. 共分散から等長写像を作る

三角多項式

$$
p(\lambda)=\sum_{j=1}^m c_j e^{it_j\lambda}
$$

に対し

$$
\boxed{
U_0p:=\sum_{j=1}^mc_jX_{t_j}
}
$$

と置きます。

$p=\sum_jc_je^{it_j\lambda}$、$q=\sum_kd_ke^{is_k\lambda}$ なら

$$
\begin{aligned}
\langle U_0p,U_0q\rangle_{L^2(\Omega)}
&=
\sum_{j,k}c_j\overline{d_k}\gamma(t_j-s_k)\\
&=
\int
\left(\sum_jc_je^{it_j\lambda}\right)
\overline{\left(\sum_kd_ke^{is_k\lambda}\right)}
F(d\lambda)\\
&=
\langle p,q\rangle_{L^2(F)}.
\end{aligned}
$$

従って

$$
\boxed{
\|U_0p\|_{L^2(\Omega)}=\|p\|_{L^2(F)}
}.
$$

特に、同じ $L^2(F)$ 元を別の三角多項式表示で書いても像は同じ $L^2(\Omega)$ 元になるため、$U_0$ はwell-definedです。

---

## 4. $U_0$ を $L^2(F)$ 全体へ延長する

任意の $f\in L^2(F)$ に対し、三角多項式列 $p_n$ を

$$
p_n\to f
\qquad\text{in }L^2(F)
$$

と取ります。等長性より

$$
\|U_0p_n-U_0p_m\|_{L^2(\Omega)}
=
\|p_n-p_m\|_{L^2(F)},
$$

したがって $(U_0p_n)$ はCauchy列です。$L^2(\Omega)$ の完備性から極限が存在します。

$$
Uf:=\lim_{n\to\infty}U_0p_n
$$

と定めれば、別の近似列を用いても同じ極限になります。こうして

$$
\boxed{
U:L^2(F)\to\mathcal H_X
}
$$

が得られ

$$
\boxed{
\langle Uf,Ug\rangle_{L^2(\Omega)}
=
\langle f,g\rangle_{L^2(F)}
}
$$

を満たします。

また

$$
U(e^{it\lambda})=X_t.
$$

$L^2(F)$ は完備で $U$ は等長写像なので $U(L^2(F))$ は閉です。その像は $\operatorname{span}\{X_t\}$ を含むため

$$
\boxed{
U(L^2(F))=\mathcal H_X
}.
$$

---

## 5. 直交増分ランダム測度を作る

<a id="def-f0-00ts2a-orthogonal-random-measure"></a>

<!-- formal-statement-start -->
> **定義（直交増分ランダム測度）**  
> 有限測度 $F$ に対する写像 $Z:\mathcal B(\mathbb T)\to L^2(\Omega)$ が、互いに素なBorel集合に対する直交性、互いに素な列に対する $L^2$ 可算加法性、および次の二次モーメント関係を満たすとき、$Z$ をcontrol measure $F$ を持つ **直交増分ランダム測度** という。

$$
E[Z(A)\overline{Z(B)}]=F(A\cap B)
$$
<!-- formal-statement-end -->

上で作った $U$ を使って

$$
\boxed{Z(A):=U\mathbf1_A}
$$

と定めます。

<!-- definition-example-start: def-f0-00ts2a-orthogonal-random-measure -->
**定義の確認**  
任意のBorel集合 $A,B$ に対して

$$
\begin{aligned}
E[Z(A)\overline{Z(B)}]
&=\langle U\mathbf1_A,U\mathbf1_B\rangle\\
&=\langle\mathbf1_A,\mathbf1_B\rangle_{L^2(F)}\\
&=F(A\cap B).
\end{aligned}
$$

従って $A\cap B=\varnothing$ なら $Z(A)\perp Z(B)$ です。

さらに互いに素な $A_1,A_2,\dots$ について

$$
\left\|
\mathbf1_{\cup_{k\ge1}A_k}
-
\sum_{k=1}^n\mathbf1_{A_k}
\right\|_{L^2(F)}^2
=
F\left(\bigcup_{k>n}A_k\right)
\to0.
$$

等長写像 $U$ を作用させれば

$$
Z\left(\bigcup_{k\ge1}A_k\right)
=
L^2\!\!\!-\lim_{n\to\infty}
\sum_{k=1}^nZ(A_k).
$$

よって定義の全条件を満たします。
<!-- definition-example-end -->

---

## 6. spectral stochastic integral

<a id="def-f0-00ts2a-spectral-integral"></a>

<!-- formal-statement-start -->
> **定義（spectral stochastic integral）**  
> 上で構成した $Z$ に対し、$g\in L^2(F)$ のspectral stochastic integralを次で定める。

$$
\boxed{
\int_{\mathbb T}g(\lambda)Z(d\lambda):=Ug
}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00ts2a-spectral-integral -->
**定義の確認**：単関数  
$g=\sum_{j=1}^m a_j\mathbf1_{A_j}$ なら

$$
\int g\,dZ
=Ug
=\sum_{j=1}^ma_jU\mathbf1_{A_j}
=\sum_{j=1}^ma_jZ(A_j).
$$

通常のランダム測度積分の単関数定義と一致します。
<!-- definition-example-end -->

等長性から

$$
\boxed{
E\left|\int g\,dZ\right|^2
=
\int|g|^2dF
}
$$

であり、さらに

$$
E\left[
\left(\int f\,dZ\right)
\overline{\left(\int g\,dZ\right)}
\right]
=
\int f\overline g\,dF.
$$

---

## 7. spectral representation theorem

<a id="thm-f0-00ts2a-spectral-representation"></a>

<!-- formal-statement-start -->
> **定理（定常過程の spectral representation theorem）**  
> $(X_t)_{t\in\mathbb Z}$ を平均0の二次定常過程とし、$F$ をそのspectral measureとする。このとき、control measure $F$ を持つ直交増分ランダム測度 $Z$ が存在して、全ての $t\in\mathbb Z$ について次が $L^2(\Omega)$ の意味で成り立つ。

$$
\boxed{
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節までで等長写像 $U$ と

$$
Z(A)=U\mathbf1_A
$$

を構成しました。spectral stochastic integralの定義から

$$
\int e^{it\lambda}Z(d\lambda)
=U(e^{it\lambda}).
$$

一方、$U$ は $U_0$ の連続延長であり

$$
U(e^{it\lambda})=X_t.
$$

従って

$$
X_t=\int e^{it\lambda}Z(d\lambda).
$$

$\square$
<!-- proof-end -->

Herglotz定理が

$$
\gamma(h)=\int e^{ih\lambda}F(d\lambda)
$$

という **二次構造の表現** なのに対し、この定理は

$$
X_t=\int e^{it\lambda}Z(d\lambda)
$$

という **確率変数そのものの表現** です。

---

## 8. 例：white noise

分散 $\sigma^2$ のwhite noiseでは

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda.
$$

従ってBorel集合 $A$ に対し

$$
E|Z(A)|^2
=F(A)
=\frac{\sigma^2}{2\pi}|A|.
$$

互いに素な周波数帯 $A,B$ なら

$$
E[Z(A)\overline{Z(B)}]=0.
$$

flat spectrumとは、周波数帯へ割り当てられる $L^2$ エネルギーがLebesgue長に比例することです。

---

## 9. 例：line spectrum

$0<\omega<\pi$ とし

$$
X_t=A\cos(t\omega)+B\sin(t\omega),
$$

$$
E[A]=E[B]=0,
\qquad
E[A^2]=E[B^2]=\tau^2,
\qquad
E[AB]=0
$$

とします。すると

$$
\gamma(h)=\tau^2\cos(h\omega)
$$

なので

$$
F
=
\frac{\tau^2}{2}\delta_{\omega}
+
\frac{\tau^2}{2}\delta_{-\omega}.
$$

$$
C:=\frac{A-iB}{2}
$$

と置けば

$$
X_t=Ce^{it\omega}+\overline C e^{-it\omega},
$$

$$
E|C|^2=\frac{\tau^2}{2},
\qquad
E[C^2]=0.
$$

従って

$$
Z(\{\omega\})=C,
\qquad
Z(\{-\omega\})=\overline C
$$

と見れば、二つの原子は $L^2$ で直交し、原子質量は $F$ と一致します。

---

## 10. 演習A

### A01 等長性

$$
p(\lambda)=c_1e^{it_1\lambda}+c_2e^{it_2\lambda},
\qquad
U_0p=c_1X_{t_1}+c_2X_{t_2}
$$

とする。Herglotz表示を使って

$$
\|U_0p\|_2^2=\|p\|_{L^2(F)}^2
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

左辺を展開すると

$$
\|U_0p\|_2^2
=
\sum_{j,k=1}^2c_j\overline{c_k}\gamma(t_j-t_k).
$$

Herglotz表示を代入すると

$$
\begin{aligned}
\|U_0p\|_2^2
&=\int\sum_{j,k=1}^2
c_j\overline{c_k}e^{i(t_j-t_k)\lambda}F(d\lambda)\\
&=\int\left|\sum_{j=1}^2c_je^{it_j\lambda}\right|^2F(d\lambda)\\
&=\|p\|_{L^2(F)}^2.
\end{aligned}
$$

#### 本番答案

$$
\|U_0p\|_2^2
=\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)
=\int\left|\sum_jc_je^{it_j\lambda}\right|^2dF
=\|p\|_{L^2(F)}^2.
$$

#### 採点基準（20点）

- 共分散で展開：6点
- Herglotz表示を代入：6点
- 絶対値二乗へまとめる：5点
- 等長性を結論：3点
<!-- solution-end -->

### A02 直交増分

$Z(A)=U\mathbf1_A$ とする。互いに素なBorel集合 $A,B$ に対し

$$
E[Z(A)\overline{Z(B)}]=0
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

内積保存性から

$$
\begin{aligned}
E[Z(A)\overline{Z(B)}]
&=\langle U\mathbf1_A,U\mathbf1_B\rangle\\
&=\langle\mathbf1_A,\mathbf1_B\rangle_{L^2(F)}\\
&=F(A\cap B)=0.
\end{aligned}
$$

#### 本番答案

$$
E[Z(A)\overline{Z(B)}]
=\int\mathbf1_A\mathbf1_BdF
=F(A\cap B)=0.
$$

#### 採点基準（20点）

- $Z(A)=U1_A$ を使用：4点
- 内積保存性：7点
- $F(A\cap B)$ へ変形：5点
- 互いに素なので0：4点
<!-- solution-end -->

---

## 11. 演習B

### B01 三角多項式の稠密性

有限Borel測度 $F$ に対し、三角多項式が $L^2(F)$ に稠密であることを

1. 開集合の指示関数の連続近似
2. $\pi$--$\lambda$ 定理による全Borel集合への拡張
3. Fejér近似

の順で再構成せよ。

<!-- solution-start -->
#### 詳細解答

開集合 $O\ne\mathbb T$ に対して

$$
g_m=\min\{1,m d(\cdot,O^c)\}
$$

と置けば $g_m\to1_O$ かつ $0\le g_m\le1$ なので優収束定理より $L^2(F)$ 収束します。$O=\mathbb T$ は定数関数1でよいです。

この近似可能性を持つBorel集合族はDynkin族で、開集合全体を含みます。開集合は $\pi$-systemなので $\pi$--$\lambda$ 定理から全Borel集合が近似可能です。従って単関数を介して $C(\mathbb T)$ は $L^2(F)$ に稠密です。

連続 $g$ はFejér近似で三角多項式 $p$ に一様近似でき、

$$
\|g-p\|_2\le\sqrt{F(\mathbb T)}\|g-p\|_\infty
$$

なので三角多項式は $L^2(F)$ に稠密です。

#### 本番答案

開集合指示関数を距離関数で連続近似し、近似可能な集合族がDynkin族で開集合を含むことから $\pi$--$\lambda$ 定理で全Borel集合へ拡張する。よって $C(\mathbb T)$ は $L^2(F)$ に稠密。さらにFejér一様近似と

$$
\|h\|_2\le\sqrt{F(\mathbb T)}\|h\|_\infty
$$

から三角多項式が $L^2(F)$ に稠密。

#### 採点基準（20点）

- 開集合指示関数の連続近似：5点
- Dynkin族と $\pi$--$\lambda$：6点
- $C(\mathbb T)$ の $L^2$ 稠密性：3点
- Fejér近似から三角多項式へ：6点
<!-- solution-end -->

### B02 ランダム測度の可算加法性

互いに素なBorel集合 $A_1,A_2,\dots$ に対し

$$
Z\left(\bigcup_{n\ge1}A_n\right)
=
L^2\!\!\!-\lim_{N\to\infty}\sum_{n=1}^NZ(A_n)
$$

を示せ。

<!-- solution-start -->
#### 詳細解答

互いに素なので

$$
\mathbf1_{\cup_{n\ge1}A_n}
-
\sum_{n=1}^N\mathbf1_{A_n}
=
\mathbf1_{\cup_{n>N}A_n}.
$$

従って

$$
\left\|
\mathbf1_{\cup A_n}
-
\sum_{n=1}^N\mathbf1_{A_n}
\right\|_{L^2(F)}^2
=
F\left(\bigcup_{n>N}A_n\right)
\to0.
$$

等長写像 $U$ を作用させれば結論を得ます。

#### 本番答案

$$
\left\|1_{\cup A_n}-\sum_{n=1}^N1_{A_n}\right\|_{L^2(F)}^2
=F(\cup_{n>N}A_n)\to0.
$$

$U$ の等長性から

$$
Z(\cup A_n)=L^2\!\!\!-\lim_N\sum_{n=1}^NZ(A_n).
$$

#### 採点基準（20点）

- 指示関数差をtailで表す：5点
- $L^2(F)$ ノルム二乗を測度にする：6点
- tail測度が0へ収束：4点
- $U$ を適用：5点
<!-- solution-end -->

### B03 有限線形フィルタとスペクトル

$$
X_t=\int e^{it\lambda}Z(d\lambda)
$$

とし、有限係数列 $a_0,\dots,a_q$ により

$$
Y_t:=\sum_{k=0}^qa_kX_{t-k}
$$

を定める。

$$
A(e^{-i\lambda})
:=\sum_{k=0}^qa_ke^{-ik\lambda}
$$

と置き、$Y_t$ のspectral representationとspectral measureを求めよ。

<!-- solution-start -->
#### 詳細解答

各 $X_{t-k}$ の表現を代入すると

$$
\begin{aligned}
Y_t
&=\sum_{k=0}^qa_k\int e^{i(t-k)\lambda}Z(d\lambda)\\
&=\int e^{it\lambda}
\left(\sum_{k=0}^qa_ke^{-ik\lambda}\right)Z(d\lambda)\\
&=\int e^{it\lambda}A(e^{-i\lambda})Z(d\lambda).
\end{aligned}
$$

新しいランダム測度を

$$
Z_Y(B):=\int_BA(e^{-i\lambda})Z(d\lambda)
$$

と置けば、等長性より

$$
E|Z_Y(B)|^2
=
\int_B|A(e^{-i\lambda})|^2F(d\lambda).
$$

従って $Y_t$ のspectral measureは

$$
\boxed{
F_Y(d\lambda)=|A(e^{-i\lambda})|^2F(d\lambda)
}.
$$

#### 本番答案

$$
Y_t
=\int e^{it\lambda}A(e^{-i\lambda})Z(d\lambda).
$$

spectral integralの等長性から

$$
F_Y(d\lambda)=|A(e^{-i\lambda})|^2F(d\lambda).
$$

#### 採点基準（20点）

- $X_{t-k}$ の表現を代入：5点
- transfer polynomialをくくる：6点
- 新しいランダム測度の二次モーメントを評価：5点
- $F_Y=|A|^2F$：4点
<!-- solution-end -->

このB03がそのままTS3のARMA transfer functionへ接続します。

---

## 12. この章で確認したこと

この補講では

1. $C(\mathbb T)$ の $L^2(F)$ 稠密性
2. 三角多項式の $L^2(F)$ 稠密性
3. 共分散から作る等長写像 $U$
4. $Z(A)=U\mathbf1_A$ による直交増分ランダム測度
5. spectral stochastic integral
6. $X_t=\int e^{it\lambda}Z(d\lambda)$

を順に構成しました。

演習A2/B3を通じて、等長性・可算加法性・線形フィルタによるspectral measure変換まで確認できます。
