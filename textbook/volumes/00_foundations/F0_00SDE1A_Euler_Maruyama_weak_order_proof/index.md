# F0-00SDE1A：Euler--Maruyama weak order 1 の証明

SDE1では Euler--Maruyama 法について

- strong error は典型的に $O(h^{1/2})$
- smoothな期待値に対する weak error は典型的に $O(h)$

と整理しました。この補講では後者を証明します。

$$
\boxed{
\text{backward Kolmogorov}
\to
\text{frozen generator}
\to
\text{local }O(h^2)
\to
\text{global }O(h)
}
$$

核心は、1ステップの弱誤差が $O(h)$ ではなく $O(h^2)$ まで小さくなることです。

---

## 0. 設定

一次元の時間一様SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t,
\qquad X_0=x_0
$$

を考えます。$h=T/N$、$t_n=nh$ とし、Euler--Maruyama近似を

$$
Y_{n+1}=Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n
$$

で定めます。

終端関数 $g$ に対して

$$
\left|E[g(Y_N)]-E[g(X_T)]\right|
$$

を評価します。

以下では backward Kolmogorov equation が古典解をもち、証明中に現れる時間・空間微分が一様に有界であると仮定します。最小正則性を詰めることではなく、weak order 1 の構造を証明することが目的です。

---

## 1. 未来の期待値を $u(t,x)$ に押し込む

時刻 $t$ に $x$ から出発した厳密解を $X_s^{t,x}$ と書き

$$
\boxed{u(t,x):=E\left[g\left(X_T^{t,x}\right)\right]}
$$

と定めます。すると

$$
u(T,x)=g(x).
$$

生成作用素

$$
\mathcal Lf(x)
=b(x)f'(x)+\frac12\sigma^2(x)f''(x)
$$

に対し、SP5の backward Kolmogorov equation より

$$
\boxed{
\partial_tu+\mathcal Lu=0,
\qquad u(T,x)=g(x)
}.
$$

厳密解と数値解の経路を直接比較する代わりに、厳密解の未来期待値を $u$ に押し込み、数値解の1ステップだけを調べます。

---

## 2. Euler--Maruyamaの1ステップを係数固定拡散として見る

時刻 $t$、状態 $x$ から1ステップ進む間だけ

$$
\widehat X_s
=x+b(x)(s-t)+\sigma(x)(B_s-B_t),
\qquad t\le s\le t+h
$$

と置きます。終点は

$$
\widehat X_{t+h}
=x+b(x)h+\sigma(x)(B_{t+h}-B_t)
$$

なので、Euler--Maruyama の1ステップそのものです。

<a id="def-f0-00sde1a-frozen-generator"></a>

<!-- formal-statement-start -->
> **定義（frozen generator）**  
> 1ステップの始点 $x$ で係数を固定した拡散 $\widehat X$ の生成作用素を frozen generator と呼ぶ。

$$
\boxed{
\mathcal L_x^{\mathrm{fr}}f(y)
=b(x)f'(y)+\frac12\sigma^2(x)f''(y)
}
$$
<!-- formal-statement-end -->

<!-- definition-example-start: def-f0-00sde1a-frozen-generator -->
**定義の確認**  
$\widehat X$ のdriftと拡散係数は1ステップ中 $b(x),\sigma(x)$ のままなので、Itô公式のdrift項は

$$
b(x)f'(\widehat X_s)+\frac12\sigma^2(x)f''(\widehat X_s)
$$

となり、上の作用素がgeneratorです。
<!-- definition-example-end -->

---

## 3. 1-step defect を generator の差で表す

$u(s,\widehat X_s)$ にItô公式を使い、期待値を取ると

$$
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\partial_s+\mathcal L_x^{\mathrm{fr}})u(s,\widehat X_s)\,ds.
$$

一方

$$
\partial_su+\mathcal Lu=0
$$

なので

$$
\boxed{
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,\widehat X_s)\,ds
}.
$$

積分区間の長さだけなら $O(h)$ に見えますが、積分の中身はステップ始点で0になります。

---

## 4. 局所弱誤差が $O(h^2)$ になる

固定した始点 $x$ に対して

$$
F_x(s,y):=(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,y)
$$

と置きます。$y=x$ では二つの generator の係数が一致するので

$$
\boxed{F_x(s,x)=0}
$$

が全ての $s$ で成り立ちます。

$F_x(s,\widehat X_s)$ にもう一度Itô公式を使うと

$$
E[F_x(s,\widehat X_s)]
=
F_x(t,x)
+
E\int_t^s
(\partial_r+\mathcal L_x^{\mathrm{fr}})
F_x(r,\widehat X_r)\,dr.
$$

第一項は0です。必要な導関数が一様有界なら

$$
\left|
(\partial_r+\mathcal L_x^{\mathrm{fr}})
F_x(r,y)
\right|
\le C
$$

と評価できるので

$$
\left|E[F_x(s,\widehat X_s)]\right|
\le C(s-t).
$$

これを前節へ戻すと

$$
\begin{aligned}
\left|
E[u(t+h,\widehat X_{t+h})]-u(t,x)
\right|
&\le\int_t^{t+h}C(s-t)\,ds\\
&=\frac{C}{2}h^2.
\end{aligned}
$$

従って

$$
\boxed{\text{1-step local weak defect}=O(h^2)}.
$$

係数を凍結した誤差が始点では消えているため、単なる区間長 $h$ にもう1段の小ささが掛かるのが核心です。

---

## 5. 局所 $O(h^2)$ から大域 $O(h)$ へ

$u(T,x)=g(x)$ より

$$
E[g(Y_N)]-E[g(X_T)]
=E[u(T,Y_N)]-u(0,x_0).
$$

右辺を telescoping sum にすると

$$
E[u(T,Y_N)]-u(0,x_0)
=
\sum_{n=0}^{N-1}
E\left[u(t_{n+1},Y_{n+1})-u(t_n,Y_n)\right].
$$

$Y_n$ を固定して条件付き期待値を取れば、各項は1-step評価なので

$$
\left|
E\left[u(t_{n+1},Y_{n+1})-u(t_n,Y_n)\mid Y_n\right]
\right|
\le Ch^2.
$$

従って

$$
\begin{aligned}
\left|E[g(Y_N)]-E[g(X_T)]\right|
&\le NCh^2\\
&=\frac{T}{h}Ch^2\\
&=CTh.
\end{aligned}
$$

よって大域弱誤差は $O(h)$ です。

---

## 6. weak order 1 の定理

<a id="thm-f0-00sde1a-weak-order-one"></a>

<!-- formal-statement-start -->
> **定理（Euler--Maruyama の weak order 1）**  
> SDE $dX_t=b(X_t)dt+\sigma(X_t)dB_t$ と終端関数 $g$ を考える。backward Kolmogorov equation が十分滑らかな古典解 $u$ をもち、上の局所評価に必要な導関数が一様に制御できるとする。刻み幅 $h=T/N$ の Euler--Maruyama 近似 $Y_N$ に対し、ある $C_T>0$ が存在して次が成り立つ。

$$
\boxed{
\left|E[g(Y_N)]-E[g(X_T)]\right|
\le C_T h
}
$$
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

1. $u(t,x)=E[g(X_T^{t,x})]$ と置く。
2. backward Kolmogorov equation で厳密解側の時間発展を消す。
3. EMの1ステップを frozen diffusion とみなし、差を $(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u$ で表す。
4. generator差は始点で0なので、Itô公式をもう一度使って局所誤差 $O(h^2)$ を得る。
5. $N=T/h$ ステップをtelescopingして $O(Nh^2)=O(h)$ を得る。

$\square$
<!-- proof-end -->

---

## 7. strong order $1/2$ と矛盾しない

strong error は典型的に

$$
E|X_T-Y_N|
$$

のように同じBrown運動上で経路そのものの距離を測ります。一方weak errorは

$$
|E[g(X_T)]-E[g(Y_N)]|
$$

のように期待値を取った後の差です。平均0の揺らぎが相殺されるため、Euler--Maruyamaでは典型的に

$$
\boxed{
\text{strong order }\frac12,
\qquad
\text{weak order }1
}
$$

となります。

---

## 8. 演習A

### A01 frozen generator

$$
\widehat X_s=x+b(x)(s-t)+\sigma(x)(B_s-B_t)
$$

のgeneratorが

$$
\mathcal L_x^{\mathrm{fr}}f(y)
=b(x)f'(y)+\frac12\sigma^2(x)f''(y)
$$

となることをItô公式から確認せよ。

<!-- solution-start -->
$f(\widehat X_s)$ にItô公式を適用すると、drift部分が $b(x)f'(\widehat X_s)+\frac12\sigma^2(x)f''(\widehat X_s)$ となるため、この作用素がgenerator。
<!-- solution-end -->

### A02 telescoping

各ステップの局所弱誤差が $|\delta_n|\le Ch^2$ と評価できるとする。$N=T/h$ として大域誤差を評価せよ。

<!-- solution-start -->
$\left|\sum_{n=0}^{N-1}\delta_n\right|\le NCh^2=(T/h)Ch^2=CTh=O(h)$。
<!-- solution-end -->

---

## 9. 演習B

### B01 局所弱誤差の核心

$$
F_x(s,y)=(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,y)
$$

について、$F_x(s,x)=0$ から

$$
|E[F_x(s,\widehat X_s)]|\le C(s-t)
$$

を導き、1-step defectが $O(h^2)$ になることを示せ。

<!-- solution-start -->
$F_x(s,\widehat X_s)$ にItô公式を適用する。始点項は $F_x(t,x)=0$。残るdriftが一様有界なら期待値は $O(s-t)$。これを $s\in[t,t+h]$ で積分して $O(h^2)$。
<!-- solution-end -->

### B02 局所 $p+1$ 次から大域 $p$ 次

1ステップ誤差が $O(h^{p+1})$、ステップ数が $T/h$ のとき、安定に加算できるなら大域誤差が $O(h^p)$ になることを示せ。

<!-- solution-start -->
$(T/h)O(h^{p+1})=O(h^p)$。Euler--Maruyama のweak order 1 は $p=1$ の場合。
<!-- solution-end -->

---

## 10. 最終チェック

証明は

$$
\boxed{
\partial_tu+\mathcal Lu=0
\Rightarrow
\text{local defect}=O(h^2)
\Rightarrow
\frac{T}{h}\text{ steps}
\Rightarrow
O(h)
}
$$

へ圧縮できます。覚えるべきなのは「EMだから弱1次」ではなく、**backward equation が厳密解の時間発展を消し、frozen generatorとの差が始点で0になる**という構造です。
