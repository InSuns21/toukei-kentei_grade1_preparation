# F0-00PDE3 Encore II：Sturm--Liouville問題・自己共役性・スペクトル展開

Fourier級数ではsin・cosを基底として使いました。

PDE2では、そのsin・cosが境界値問題

$$
-X''=\lambda X
$$

の固有関数として現れることを見ました。

ここではこれを一般化します。

---

## 1. Sturm--Liouville問題

区間 $a<x<b$ で

$$
\boxed{
-\frac d{dx}
\left(p(x)\frac{dy}{dx}\right)
+q(x)y
=
\lambda w(x)y
}
$$

を考えます。

通常

$$
p(x)>0,
\qquad
w(x)>0
$$

を仮定し、さらに両端で線形境界条件を課します。

これがSturm--Liouville問題です。

---

## 2. なぜ重み $w(x)$ があるのか

右辺に

$$
\lambda w(x)y
$$

があるので、自然な内積は

$$
\boxed{
\langle f,g\rangle_w
=
\int_a^b
f(x)g(x)w(x)\,dx
}
$$

です。

この重み付き $L^2$ 空間で固有関数の直交性が現れます。

---

## 3. 微分作用素として書く

$$
L[y]
=
-\frac d{dx}(p y')+qy
$$

と置けば

$$
L[y]=\lambda wy.
$$

重みを吸収して形式的に

$$
A[y]
=\frac1wL[y]
$$

とすれば

$$
A[y]=\lambda y
$$

という固有値問題に見えます。

有限次元の

$$
Av=\lambda v
$$

が、関数空間の微分作用素へ移った形です。

---

## 4. Greenの公式型の計算

二つの十分滑らかな関数 $f,g$ に対して

$$
\int_a^b
\{L[f]g-fL[g]\}\,dx
$$

を計算します。

$qfg$ の項は相殺し、部分積分すると

$$
\boxed{
\int_a^b
\{L[f]g-fL[g]\}\,dx
=
\left[
p(x)
\{f(x)g'(x)-f'(x)g(x)\}
\right]_a^b
}
$$

となります。

右辺は境界項だけです。

---

## 5. 境界条件が自己共役性を作る

例えばDirichlet境界条件

$$
f(a)=f(b)=0,
\qquad
g(a)=g(b)=0
$$

なら境界項は0です。

Neumann型

$$
f'(a)=f'(b)=0
$$

でも適切に消えます。

したがって定義域を境界条件込みで選ぶことで

$$
\boxed{
\langle Af,g\rangle_w
=
\langle f,Ag\rangle_w
}
$$

という自己共役性が得られます。

ここで重要なのは、**微分式だけではなく境界条件まで含めて作用素を定義する**ことです。

---

## 6. 異なる固有値の固有関数は直交する

$$
L[y_m]=\lambda_mwy_m,
$$

$$
L[y_n]=\lambda_nwy_n
$$

とします。

$y_n$ を掛けた第一式と $y_m$ を掛けた第二式を引いて積分すると、境界条件により左辺のGreen型境界項が0になり、

$$
(\lambda_m-\lambda_n)
\int_a^b
y_m(x)y_n(x)w(x)\,dx
=0.
$$

したがって

$$
\lambda_m\ne\lambda_n
$$

なら

$$
\boxed{
\int_a^b
y_m(x)y_n(x)w(x)\,dx=0
}
$$

です。

有限次元で実対称行列の異なる固有値に属する固有ベクトルが直交したことと同じです。

---

## 7. Fourier正弦級数は特殊例

$$
p=1,\qquad q=0,\qquad w=1
$$

として

$$
-y''=\lambda y
$$

を考え、

$$
y(0)=y(L)=0
$$

とします。

すると

$$
\lambda_n
=\left(\frac{n\pi}{L}\right)^2,
$$

$$
y_n(x)
=\sin\left(\frac{n\pi x}{L}\right).
$$

つまりFourier正弦級数はSturm--Liouville固有関数展開そのものです。

---

## 8. Fourier余弦級数も特殊例

同じ微分方程式にNeumann境界条件

$$
y'(0)=y'(L)=0
$$

を課すと、

$$
y_n(x)
=\cos\left(\frac{n\pi x}{L}\right)
$$

が現れます。

したがって

- Dirichlet境界条件 → 正弦系
- Neumann境界条件 → 余弦系

という違いは、単なるFourier級数のテクニックではなく境界値問題の違いです。

---

## 9. 正則Sturm--Liouville問題のスペクトル構造

適切な正則性・境界条件の下で、正則Sturm--Liouville問題には典型的に

1. 固有値は実数。
2. 固有値は離散的に並び、無限遠へ発散する。
3. 異なる固有値の固有関数は重み付き内積で直交する。
4. 適切な $L^2_w$ の関数を固有関数展開できる。

という構造があります。

完全なスペクトル定理の証明は作用素論をさらに進める必要がありますが、このEncore IIでは

$$
\boxed{
\text{対称行列の固有ベクトル展開}
\longrightarrow
\text{自己共役微分作用素の固有関数展開}
}
$$

という対応を読めるところまでを目標にします。

---

## 10. PDEの変数分離はなぜSturm--Liouvilleを生むのか

例えば

$$
u(t,x)=T(t)X(x)
$$

と置いて変数分離すると、空間側に

$$
L[X]=\lambda wX
$$

という境界値固有問題が現れます。

その固有関数 $X_n$ ごとに時間係数 $T_n(t)$ が独立なODEを満たします。

したがって

$$
\boxed{
\text{PDE}
\to
\text{空間作用素の固有値問題}
\to
\text{各固有モードのODE}
}
$$

です。

---

## 11. 熱方程式をスペクトル展開で見る

固定端条件で

$$
u_t=\kappa u_{xx}
$$

を考えると

$$
u(t,x)
=
\sum_{n=1}^{\infty}
a_n(t)
\sin\left(\frac{n\pi x}{L}\right)
$$

と展開できます。

各モードについて

$$
a_n'(t)
=-\kappa\left(\frac{n\pi}{L}\right)^2a_n(t)
$$

なので

$$
\boxed{
a_n(t)
=a_n(0)
\exp\left[
-\kappa\left(\frac{n\pi}{L}\right)^2t
\right]
}
$$

です。

固有値が大きい高周波モードほど速く消えます。

実数全体でFourier変換を使った結果と同じ構造です。

---

## 12. 波動方程式をスペクトル展開で見る

同じ空間固有値

$$
\lambda_n
=\left(\frac{n\pi}{L}\right)^2
$$

に対して時間側は

$$
a_n''(t)+c^2\lambda_na_n(t)=0.
$$

したがって

$$
a_n(t)
=A_n\cos(c\sqrt{\lambda_n}t)
+B_n\sin(c\sqrt{\lambda_n}t).
$$

熱では指数減衰、波動では調和振動です。

空間作用素の固有値は同じでも、時間発展方程式の形が違うため挙動が変わります。

---

## 13. 有限次元線形代数との完全な対応

有限次元では

$$
Aq_n=\lambda_nq_n,
$$

$$
x=\sum_nc_nq_n.
$$

関数空間では

$$
L\phi_n=\lambda_nw\phi_n,
$$

$$
f=\sum_nc_n\phi_n.
$$

対応は

$$
\boxed{
\begin{array}{c|c}
\text{線形代数}&\text{微分作用素}\\
\hline
\text{行列}&\text{微分作用素}\\
\text{固有ベクトル}&\text{固有関数}\\
\text{固有値}&\text{固有値}\\
\text{直交対角化}&\text{スペクトル展開}\\
\text{座標係数}&\text{Fourier型係数}
\end{array}
}
$$

です。

---

## 14. Encore IIの全体像

ここまでで

$$
\boxed{
\text{線形代数}
\to
\text{Hilbert空間}
\to
\text{Fourier解析}
\to
\text{微分作用素のスペクトル}
\to
\text{PDE}
}
$$

が一本につながりました。

さらに横では

$$
\text{Fourier変換}
\to
\text{特性関数}
\to
\text{CLT}
$$

があり、熱方程式では

$$
\text{Fourier変換}
\to
\text{Gaussian}
\to
\text{Brown運動}
$$

へつながります。

統計学の補講から始まった道が、ここで解析学・確率論・微分方程式の交差点へ到達します。

---

## 15. ここから先はEncore III候補

さらに厳密なPDE解析へ進むには

- 弱微分
- distribution
- Sobolev空間
- 弱解
- Lax--Milgram
- 楕円型PDE

が自然に現れます。

ただしEncore IIではそこを必須にしません。

古典解・Fourier法・固有関数展開までで一度閉じます。

---

## 章末チェック

- Sturm--Liouville問題を定義できる。
- 重み付きL2内積を説明できる。
- Green型恒等式から自己共役性の役割を説明できる。
- 異なる固有値の固有関数が直交することを導ける。
- Fourier正弦・余弦級数を境界条件付き固有関数展開として説明できる。
- 熱方程式・波動方程式を固有モードごとのODEとして読める。
- 有限次元スペクトル定理と微分作用素のスペクトル展開を対応付けられる。
- Encore IIIに進むと弱微分・Sobolev空間が必要になる理由を説明できる。
