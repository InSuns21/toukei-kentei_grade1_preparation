# F0-00H1 補講：常微分方程式・線形系・行列指数

Fourier解析から偏微分方程式へ進むと、空間変数をFourier変換した後に「時間についての常微分方程式」が突然現れます。

そこで先に、最低限の常微分方程式を自前で用意します。

この章の目標は微分方程式全般を網羅することではありません。

> **線形な微分方程式を、指数関数・固有値・行列指数として読めるようにする。**

これがEncore IIへの橋です。

---

## 1. 微分方程式とは何か

未知関数 $y(t)$ とその導関数の関係

$$
F(t,y,y',\dots,y^{(m)})=0
$$

を常微分方程式といいます。

独立変数が一つなので ordinary differential equation、ODE と呼ばれます。

例えば

$$
y'(t)=ay(t)
$$

は一階ODE、

$$
y''(t)+\omega^2y(t)=0
$$

は二階ODEです。

---

## 2. 微分方程式だけでは解が一つに決まらない

$$
y'=ay
$$

の解は

$$
y(t)=Ce^{at}
$$

で、定数 $C$ が残ります。

そこで

$$
y(0)=y_0
$$

という初期条件を与えると

$$
C=y_0
$$

となり、

$$
\boxed{y(t)=y_0e^{at}}
$$

と一意な候補が得られます。

微分方程式と初期条件を合わせたものを初期値問題といいます。

一方、区間の両端で

$$
y(0)=0,\qquad y(L)=0
$$

のような条件を課すものは境界値問題です。後のSturm--Liouville問題と偏微分方程式で重要になります。

---

## 3. 変数分離

$$
y'=g(t)h(y)
$$

で、$h(y)\ne0$ の範囲では

$$
\frac{dy}{h(y)}=g(t)\,dt
$$

として両辺を積分できます。

例として

$$
y'=ay
$$

なら

$$
\frac{dy}{y}=a\,dt.
$$

積分して

$$
\log|y|=at+C
$$

なので

$$
y=Ce^{at}.
$$

指数関数が線形時間発展の基本形として出る最初の場所です。

---

## 4. 一階線形ODEと積分因子

$$
y'(t)+p(t)y(t)=q(t)
$$

を考えます。

積分因子

$$
\mu(t)=\exp\left(\int p(t)\,dt\right)
$$

を掛けると

$$
\mu y'+\mu py
=(\mu y)'
$$

なので

$$
(\mu y)'=\mu q.
$$

したがって

$$
\mu(t)y(t)
=C+\int^t\mu(s)q(s)\,ds
$$

より

$$
\boxed{
y(t)=\mu(t)^{-1}
\left\{C+\int^t\mu(s)q(s)\,ds\right\}.
}
$$

この「微分方程式を積の微分へ変えて積分する」構造は後でも繰り返し現れます。

---

## 5. 二階定係数線形ODE

$$
y''+ay'+by=0
$$

を考えます。

指数関数型

$$
y=e^{rt}
$$

を代入すると

$$
(r^2+ar+b)e^{rt}=0.
$$

したがって

$$
\boxed{r^2+ar+b=0}
$$

を解けばよいことになります。これが特性方程式です。

### 5.1 異なる実根

$r_1\ne r_2$ なら

$$
y(t)=C_1e^{r_1t}+C_2e^{r_2t}.
$$

### 5.2 重根

$r_1=r_2=r$ なら

$$
y(t)=(C_1+C_2t)e^{rt}.
$$

### 5.3 複素根

$$
r=\alpha\pm i\beta
$$

ならEulerの公式から実数解として

$$
\boxed{
y(t)=e^{\alpha t}
\{C_1\cos(\beta t)+C_2\sin(\beta t)\}.
}
$$

振動と指数的増減が固有値の実部・虚部として分離されています。

---

## 6. 調和振動子

$$
y''+\omega^2y=0
$$

の特性方程式は

$$
r^2+\omega^2=0
$$

なので

$$
r=\pm i\omega.
$$

したがって

$$
\boxed{
y(t)=A\cos(\omega t)+B\sin(\omega t)}.
$$

Fourier級数で現れるsin・cosは、単なる便利な関数ではありません。

$$
-y''=\lambda y
$$

という微分作用素の固有関数として出てくる、という見方を後で回収します。

---

## 7. 線形性と重ね合わせ

線形作用素

$$
L[y]=y''+ay'+by
$$

について

$$
L[y_1]=0,\qquad L[y_2]=0
$$

なら、任意の定数 $c_1,c_2$ について

$$
L[c_1y_1+c_2y_2]=0.
$$

したがって解空間はベクトル空間になります。

これは線形代数と微分方程式の最初の本格的な合流点です。

---

## 8. 連立線形ODE

ベクトル値関数 $x(t)\in\mathbb R^d$ に対して

$$
\boxed{x'(t)=Ax(t)}
$$

を考えます。

スカラー方程式

$$
y'=ay
$$

の解が $e^{at}$ だったことから、行列版として

$$
e^{tA}
$$

を考えます。

---

## 9. 行列指数

行列指数を冪級数で

$$
\boxed{
e^{tA}
=
\sum_{k=0}^{\infty}
\frac{t^kA^k}{k!}
}
$$

と定義します。

項別微分すれば

$$
\frac{d}{dt}e^{tA}
=Ae^{tA}.
$$

また

$$
e^{0A}=I.
$$

したがって

$$
\boxed{x(t)=e^{tA}x_0}
$$

は

$$
x'=Ax,\qquad x(0)=x_0
$$

を満たします。

---

## 10. 対角化できる場合

$$
A=Q\Lambda Q^{-1}
$$

と対角化できるとします。

冪について

$$
A^k=Q\Lambda^kQ^{-1}
$$

なので

$$
\begin{aligned}
e^{tA}
&=\sum_{k=0}^{\infty}\frac{t^kA^k}{k!}\\
&=Q\left(\sum_{k=0}^{\infty}\frac{t^k\Lambda^k}{k!}\right)Q^{-1}\\
&=\boxed{Qe^{t\Lambda}Q^{-1}}.
\end{aligned}
$$

対角行列なら

$$
e^{t\Lambda}
=\operatorname{diag}(e^{\lambda_1t},\dots,e^{\lambda_dt}).
$$

つまり

> 線形系の各固有方向は、それぞれ $e^{\lambda_jt}$ で時間発展する。

ということです。

---

## 11. 固有値と安定性

固有値 $\lambda$ の実部が負なら

$$
e^{\lambda t}\to0
$$

となります。

逆に実部が正なら指数的に増大します。

したがって、単純な対角化可能系では

$$
\boxed{
\operatorname{Re}\lambda_j<0
\text{ for all }j
\Longrightarrow
x(t)\to0
}
$$

です。

F0-00Fで導入した固有値が、ここでは「時間発展率」として意味を持ちます。

---

## 12. Fourier解析への接続

熱方程式

$$
\frac{\partial u}{\partial t}
=
\kappa\frac{\partial^2u}{\partial x^2}
$$

を $x$ についてFourier変換すると、後で

$$
\frac{\partial\widehat u}{\partial t}
=-\kappa\xi^2\widehat u
$$

という式を得ます。

$\xi$ を固定すると、これは

$$
y'(t)=-\kappa\xi^2y(t)
$$

という、この章で解いた一階ODEそのものです。

したがって

$$
\widehat u(t,\xi)
=e^{-\kappa\xi^2t}\widehat u_0(\xi).
$$

つまり

$$
\boxed{
\text{PDE}
\xrightarrow{\text{Fourier変換}}
\text{周波数ごとのODE}
}
$$

というのがEncore IIの基本戦略になります。

---

## 章末チェック

- 初期値問題と境界値問題を区別できる。
- $y'=ay$ を変数分離で解ける。
- 一階線形ODEを積分因子で解ける。
- 二階定係数線形ODEを特性方程式から解ける。
- 調和振動子からsin・cosが出る理由を説明できる。
- $x'=Ax$ の解を $e^{tA}x_0$ と書ける。
- 対角化から $e^{tA}=Qe^{t\Lambda}Q^{-1}$ を導ける。
- 固有値の実部と安定性を結び付けられる。
- Fourier変換後の熱方程式がODEになることを先取りできる。
