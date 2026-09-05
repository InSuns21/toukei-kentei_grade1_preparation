# F0-00TS2A：定常過程の spectral representation theorem

TS2では、平均0の二次定常過程 $(X_t)_{t\in\mathbb Z}$ の自己共分散

$$
\gamma(h)=E[X_{t+h}\overline{X_t}]
$$

が、Herglotz定理により一意な有限非負測度 $F$ を使って

$$
\gamma(h)=\int_{\mathbb T}e^{ih\lambda}F(d\lambda)
$$

と表せることを完全証明しました。

ただし、これはまだ **共分散列の表現** です。この補講ではさらに一段進み、過程そのものを

$$
\boxed{
X_t=\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
}
$$

と表す直交増分ランダム測度 $Z$ を実際に構成します。

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

## 0. 複素Hilbert空間として扱う

実数値過程でも周波数表現には $e^{it\lambda}$ が出るため、ここでは確率変数空間を複素化して

$$
\langle Y,W\rangle_{L^2(\Omega)}
:=E[Y\overline W]
$$

とします。

過程が生成する閉線形空間を

$$
\boxed{
\mathcal H_X
:=
\overline{\operatorname{span}_{\mathbb C}\{X_t:t\in\mathbb Z\}}^{L^2}
}
$$

と置きます。

一方、spectral measure $F$ に対するHilbert空間は

$$
L^2(F):=L^2(\mathbb T,\mathcal B(\mathbb T),F)
$$

です。

目標は、この二つのHilbert空間の間に

$$
U:L^2(F)\to\mathcal H_X
$$

という等長写像を作ることです。

---

## 1. まず連続関数が $L^2(F)$ に稠密であることを示す

$F$ は円周 $\mathbb T$ 上の有限Borel測度です。

<a id="lem-f0-00ts2a-continuous-density"></a>

<!-- formal-statement-start -->
> **補題（連続関数の $L^2(F)$ 稠密性）**  
> 円周 $\mathbb T$ 上の有限Borel測度 $F$ に対し、連続関数全体 $C(\mathbb T)$ は $L^2(F)$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

まず開集合 $O\subset\mathbb T$ を取ります。円周上の距離を $d$ とし

$$
g_m(x):=\min\{1,m\,d(x,O^c)\}
$$

と置きます。各 $g_m$ は連続で

$$
0\le g_m\le1,
\qquad
g_m(x)\uparrow\mathbf1_O(x)
$$

です。従って優収束定理より

$$
\|g_m-\mathbf1_O\|_{L^2(F)}^2
=
\int|g_m-\mathbf1_O|^2dF
\to0.
$$

よって開集合の指示関数は連続関数の $L^2(F)$ 閉包に属します。

次に

$$
\mathcal D
:=
\left\{A\in\mathcal B(\mathbb T):
\mathbf1_A\in\overline{C(\mathbb T)}^{L^2(F)}
\right\}
$$

と置きます。

$\mathbb T\in\mathcal D$ です。また $A\in\mathcal D$ なら

$$
\mathbf1_{A^c}=1-\mathbf1_A
$$

なので $A^c\in\mathcal D$ です。

さらに互いに素な $A_1,A_2,\dots\in\mathcal D$ に対し、有限和

$$
\mathbf1_{\cup_{k=1}^nA_k}
=
\sum_{k=1}^n\mathbf1_{A_k}
$$

は連続関数の閉包に属します。一方

$$
\left\|
\mathbf1_{\cup_{k\ge1}A_k}
-
\mathbf1_{\cup_{k=1}^nA_k}
\right\|_2^2
=
F\left(\bigcup_{k>n}A_k\right)
\to0
$$

です。従って $\cup_{k\ge1}A_k\in\mathcal D$。

よって $\mathcal D$ はDynkin族です。開集合全体は有限共通部分で閉じる $\pi$-system であり、上で全て $\mathcal D$ に属することを示しました。$\pi$--$\lambda$ 定理より

$$
\mathcal D=\mathcal B(\mathbb T).
$$

従って全てのBorel集合の指示関数、したがって全ての単関数が連続関数の $L^2(F)$ 閉包に属します。

最後に単関数は $L^2(F)$ に稠密なので、$C(\mathbb T)$ も $L^2(F)$ に稠密です。$\square$
<!-- proof-end -->

---

## 2. 三角多項式が $L^2(F)$ に稠密

TS2ではFejér近似により、任意の連続周期関数 $g$ に対して三角多項式 $\sigma_Ng$ が

$$
\|\sigma_Ng-g\|_\infty\to0
$$

となることを証明しました。

<a id="thm-f0-00ts2a-trig-density"></a>

<!-- formal-statement-start -->
> **定理（三角多項式の $L^2(F)$ 稠密性）**  
> $F$ を円周上の有限Borel測度とする。このとき
>
> $$
> \mathcal P
> :=
> \operatorname{span}_{\mathbb C}
> \{e^{it\lambda}:t\in\mathbb Z\}
> $$
>
> は $L^2(F)$ に稠密である。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節から、任意の $f\in L^2(F)$ と $\varepsilon>0$ に対し連続関数 $g$ を

$$
\|f-g\|_{L^2(F)}<\frac\varepsilon2
$$

となるように取れます。

TS2のFejér近似から、三角多項式 $p$ を

$$
\|g-p\|_\infty
<
\frac{\varepsilon}{2\sqrt{F(\mathbb T)+1}}
$$

となるように取れます。すると

$$
\|g-p\|_{L^2(F)}
\le
\sqrt{F(\mathbb T)}\,\|g-p\|_\infty
<\frac\varepsilon2.
$$

従って

$$
\|f-p\|_{L^2(F)}<\varepsilon.
$$

よって $\mathcal P$ は $L^2(F)$ に稠密です。$\square$
<!-- proof-end -->

この稠密性が、Herglotzの測度を「過程そのものの表現」へ持ち上げる鍵です。

---

## 3. 三角多項式から確率変数への写像を作る

三角多項式

$$
p(\lambda)
=
\sum_{j=1}^m c_j e^{it_j\lambda}
$$

に対して

$$
\boxed{
U_0p
:=
\sum_{j=1}^m c_jX_{t_j}
}
$$

と定めます。

この定義が表現の仕方によらずwell-definedであることまで含めて、次の等長性で確認します。

### 3.1 内積が完全に一致する

$p=\sum_jc_je^{it_j\lambda}$、$q=\sum_kd_ke^{is_k\lambda}$ とすると

$$
\begin{aligned}
\langle U_0p,U_0q\rangle_{L^2(\Omega)}
&=
E\left[
\left(\sum_jc_jX_{t_j}\right)
\overline{\left(\sum_kd_kX_{s_k}\right)}
\right]\\
&=
\sum_{j,k}c_j\overline{d_k}\gamma(t_j-s_k).
\end{aligned}
$$

Herglotz表示

$$
\gamma(t_j-s_k)
=
\int e^{i(t_j-s_k)\lambda}F(d\lambda)
$$

を代入すると

$$
\begin{aligned}
\langle U_0p,U_0q\rangle
&=
\int
\left(\sum_jc_je^{it_j\lambda}\right)
\overline{\left(\sum_kd_ke^{is_k\lambda}\right)}
F(d\lambda)\\
&=
\langle p,q\rangle_{L^2(F)}.
\end{aligned}
$$

特に

$$
\boxed{\|U_0p\|_{L^2(\Omega)}=\|p\|_{L^2(F)}}.
$$

もし同じ $L^2(F)$ 元を二つの三角多項式表示で書いたなら、その差の $L^2(F)$ ノルムは0なので像の $L^2(\Omega)$ ノルムも0です。従って $U_0$ はwell-definedです。

---

## 4. $U_0$ を $L^2(F)$ 全体へ延長する

三角多項式は $L^2(F)$ に稠密なので、任意の $f\in L^2(F)$ に対して

$$
p_n\to f
\qquad\text{in }L^2(F)
$$

となる三角多項式列を取れます。

等長性から

$$
\|U_0p_n-U_0p_m\|_{L^2(\Omega)}
=
\|p_n-p_m\|_{L^2(F)}
$$

なので $(U_0p_n)$ はCauchy列です。$L^2(\Omega)$ の完備性により極限が存在します。

そこで

$$
Uf:=\lim_{n\to\infty}U_0p_n
$$

と定めます。別の近似列を使っても、差のノルムを同じ等長性で0へ送れるので定義は一意です。

こうして

$$
\boxed{
U:L^2(F)\to\mathcal H_X
}
$$

が得られ、

$$
\boxed{
\langle Uf,Ug\rangle_{L^2(\Omega)}
=
\langle f,g\rangle_{L^2(F)}
}
$$

を満たします。

さらに $U(e^{it\lambda})=X_t$ なので $U$ の像は $\operatorname{span}\{X_t\}$ を含みます。等長写像の像は閉であり、$\mathcal H_X$ はそのspanの閉包なので

$$
\boxed{U(L^2(F))=\mathcal H_X}.
$$

従って $U$ は $L^2(F)$ と過程のcyclic Hilbert space $\mathcal H_X$ の等長同型です。

---

## 5. 直交増分ランダム測度

<a id="def-f0-00ts2a-orthogonal-random-measure"></a>

<!-- formal-statement-start -->
> **定義（直交増分ランダム測度）**  
> 有限測度 $F$ をcontrol measureとする写像
>
> $$
> Z:\mathcal B(\mathbb T)\to L^2(\Omega)
> $$
>
> が、互いに素なBorel集合 $A,B$ に対して直交性を満たし、互いに素な列 $(A_n)$ に対して可算加法性を $L^2$ の意味で満たすとき、$Z$ を直交増分ランダム測度という。ここではさらに二次モーメントを $F$ に一致させる。

$$
E[Z(A)\overline{Z(B)}]=F(A\cap B).
$$
<!-- formal-statement-end -->

上で作った等長写像 $U$ を使って

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
&=
\langle U\mathbf1_A,U\mathbf1_B\rangle\\
&=
\langle\mathbf1_A,\mathbf1_B\rangle_{L^2(F)}\\
&=F(A\cap B).
\end{aligned}
$$

特に $A\cap B=\varnothing$ なら $Z(A)\perp Z(B)$ です。
<!-- definition-example-end -->

### 5.1 可算加法性も $L^2$ から出る

互いに素な $A_1,A_2,\dots$ に対し

$$
\sum_{k=1}^n\mathbf1_{A_k}
=
\mathbf1_{\cup_{k=1}^nA_k}.
$$

また

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

$U$ の連続性から

$$
\boxed{
Z\left(\bigcup_{k\ge1}A_k\right)
=
L^2\!\!\!-\lim_{n\to\infty}
\sum_{k=1}^nZ(A_k)
}.
$$

従って $Z$ は確かに直交増分ランダム測度です。

---

## 6. spectral stochastic integral

<a id="def-f0-00ts2a-spectral-integral"></a>

<!-- formal-statement-start -->
> **定義（spectral stochastic integral）**  
> 上で構成した $Z$ に対し、$g\in L^2(F)$ のspectral stochastic integralを

$$
\boxed{
\int_{\mathbb T}g(\lambda)Z(d\lambda)
:=Ug
}
$$

> と定める。
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00ts2a-spectral-integral -->
**定義の確認：単関数**  
$g=\sum_{j=1}^m a_j\mathbf1_{A_j}$ なら線形性から

$$
\int g\,dZ
=Ug
=\sum_{j=1}^ma_jU\mathbf1_{A_j}
=\sum_{j=1}^ma_jZ(A_j).
$$

通常のランダム測度積分の単関数定義と一致します。
<!-- definition-example-end -->

等長性から直ちに

$$
\boxed{
E\left|
\int g\,dZ
\right|^2
=
\int|g|^2dF
}
$$

が成り立ちます。さらに $f,g\in L^2(F)$ に対して

$$
E\left[
\left(\int f\,dZ\right)
\overline{\left(\int g\,dZ\right)}
\right]
=
\int f\overline g\,dF.
$$

つまり $U$ は「周波数側の $L^2(F)$ 内積」をそのまま「確率変数側の共分散内積」へ運びます。

---

## 7. spectral representation theorem

<a id="thm-f0-00ts2a-spectral-representation"></a>

<!-- formal-statement-start -->
> **定理（定常過程の spectral representation theorem）**  
> $(X_t)_{t\in\mathbb Z}$ を平均0の二次定常過程とし、$F$ をHerglotz定理で得られるspectral measureとする。このとき、control measure $F$ を持つ直交増分ランダム測度 $Z$ が存在して、全ての $t\in\mathbb Z$ について次が $L^2(\Omega)$ の意味で成り立つ。

$$
\boxed{
X_t
=
\int_{\mathbb T}e^{it\lambda}Z(d\lambda)
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

前節までで、Herglotz measure $F$ から等長写像

$$
U:L^2(F)\to\mathcal H_X
$$

と直交増分ランダム測度

$$
Z(A)=U\mathbf1_A
$$

を構成しました。

spectral stochastic integralの定義から

$$
\int e^{it\lambda}Z(d\lambda)
=U(e^{it\lambda}).
$$

一方 $U$ は三角多項式上の写像 $U_0$ の連続延長であり、定義から

$$
U(e^{it\lambda})=X_t.
$$

従って

$$
X_t
=
\int e^{it\lambda}Z(d\lambda)
$$

です。$\square$
<!-- proof-end -->

### 7.1 Herglotzとの違い

Herglotz定理は

$$
\gamma(h)
=
\int e^{ih\lambda}F(d\lambda)
$$

という **二次構造の表現** です。

spectral representation theoremは

$$
X_t
=
\int e^{it\lambda}Z(d\lambda)
$$

という **確率変数そのものの表現** です。

後者には

- $L^2(F)$ の稠密性
- 等長写像の延長
- 指示関数からのランダム測度構成

が追加で必要になります。

---

## 8. 例：white noise

分散 $\sigma^2$ のwhite noiseではTS2より

$$
F(d\lambda)=\frac{\sigma^2}{2\pi}d\lambda.
$$

従って任意のBorel集合 $A$ に対し

$$
E|Z(A)|^2
=F(A)
=\frac{\sigma^2}{2\pi}|A|.
$$

互いに素な周波数帯 $A,B$ なら

$$
E[Z(A)\overline{Z(B)}]=0.
$$

white noiseがflat spectrumを持つとは、各周波数帯へ割り当てられる $L^2$ エネルギーがLebesgue長に比例することです。

---

## 9. 例：line spectrum

$0<\omega<\pi$ とし

$$
X_t=A\cos(t\omega)+B\sin(t\omega)
$$

を考えます。ここで

$$
E[A]=E[B]=0,
\qquad
E[A^2]=E[B^2]=\tau^2,
\qquad
E[AB]=0
$$

とします。

すると

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

実際

$$
C:=\frac{A-iB}{2}
$$

と置けば

$$
X_t
=Ce^{it\omega}+\overline C e^{-it\omega}.
$$

ここで

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

と見れば、二つの原子は $L^2$ で直交し、各原子の二次モーメントは $F$ の原子質量と一致します。

連続スペクトルのwhite noiseと、原子だけからなるline spectrumが同じ定理の中に入ることが分かります。

---

## 10. 演習A

### A01 等長性

$$
p(\lambda)=c_1e^{it_1\lambda}+c_2e^{it_2\lambda}
$$

に対し

$$
U_0p=c_1X_{t_1}+c_2X_{t_2}
$$

と置く。Herglotz表示を使って

$$
\|U_0p\|_2^2=\|p\|_{L^2(F)}^2
$$

を示せ。

<!-- solution-start -->
左辺を展開すると $\sum_{j,k}c_j\overline{c_k}\gamma(t_j-t_k)$。各 $\gamma$ を $\int e^{i(t_j-t_k)\lambda}dF$ に置き換えて和と積分を交換すれば $\int|\sum_jc_je^{it_j\lambda}|^2dF$ となる。
<!-- solution-end -->

### A02 直交増分

$A\cap B=\varnothing$ のとき

$$
E[Z(A)\overline{Z(B)}]=0
$$

を等長写像 $U$ から示せ。

<!-- solution-start -->
$Z(A)=U1_A$、$Z(B)=U1_B$ なので、内積保存から $E[Z(A)\overline{Z(B)}]=\int1_A1_BdF=F(A\cap B)=0$。
<!-- solution-end -->

---

## 11. 演習B

### B01 三角多項式の稠密性

次の二段階から、三角多項式が任意の有限Borel測度 $F$ に対する $L^2(F)$ で稠密であることを再構成せよ。

1. 開集合の指示関数を $g_m(x)=\min\{1,m d(x,O^c)\}$ で近似し、$C(\mathbb T)$ が $L^2(F)$ に稠密であることを示す。
2. Fejér近似で連続関数を三角多項式に一様近似する。

<!-- solution-start -->
開集合の指示関数はDCTで連続関数の $L^2$ 極限になる。その性質を持つBorel集合族がDynkin族で開集合を含むため $\pi$--$\lambda$ 定理で全Borel集合へ広がる。単関数の稠密性から $C(\mathbb T)$ が $L^2(F)$ に稠密。次にFejér一様近似と $\|g-p\|_2\le\sqrt{F(\mathbb T)}\|g-p\|_\infty$ を使う。
<!-- solution-end -->

### B02 ランダム測度の可算加法性

互いに素なBorel集合 $A_n$ に対し

$$
Z\left(\bigcup_{n\ge1}A_n\right)
=
L^2\!\!\!-\lim_{N\to\infty}
\sum_{n=1}^NZ(A_n)
$$

を示せ。

<!-- solution-start -->
指示関数について $1_{\cup A_n}-\sum_{n=1}^N1_{A_n}=1_{\cup_{n>N}A_n}$。その $L^2(F)$ ノルム二乗は $F(\cup_{n>N}A_n)\to0$。等長写像 $U$ を作用させれば結論。
<!-- solution-end -->

---

## 12. 監査チェック

TS2でP2残件として明示していた spectral representation theorem を

1. $C(\mathbb T)$ の $L^2(F)$ 稠密性
2. 三角多項式の $L^2(F)$ 稠密性
3. $U_0$ の等長性
4. $U$ の完備化による延長
5. $Z(A)=U1_A$ の構成
6. 直交増分と $L^2$ 可算加法性
7. $X_t=\int e^{it\lambda}Z(d\lambda)$

まで閉じました。

これでDREAM THEATER証明監査のP2実残件は0になります。
