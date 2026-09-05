# F0-00SDE1A：Euler--Maruyama weak order 1 の証明

SDE1では、Euler--Maruyama法について

- strong error は典型的に $O(h^{1/2})$
- smoothな期待値に対する weak error は典型的に $O(h)$

と整理しました。

この補講では、後者の **weak order 1 がどこから出るのか** を証明します。

証明の骨格は1本です。

$$
\boxed{
\text{backward Kolmogorov}
\to
\text{係数を凍結した1-step解析}
\to
O(h^2)
\to
\frac{T}{h}\text{回足して }O(h)
}
$$

核心は、1ステップの弱誤差が $O(h)$ ではなく **$O(h^2)$ まで小さくなる理由**です。

---

## 0. 設定と仮定

一次元の時間一様SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t,
\qquad X_0=x_0
$$

を考えます。

刻み幅を $h=T/N$、$t_n=nh$ とし、Euler--Maruyama近似を

$$
Y_{n+1}=Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n
$$

で定めます。

終端関数 $g$ に対する

$$
\left|E[g(Y_N)]-E[g(X_T)]\right|
$$

を評価するのが目標です。

### この補講で置く正則性仮定

最小仮定を詰めることは本題ではありません。以下では、backward Kolmogorov equation が古典解をもち、証明中に現れる時間・空間微分が一様に有界であると仮定します。

たとえば係数と $g$ に十分な滑らかさ・有界性を課し、必要に応じて一様楕円性などを加えるのが標準的な十分条件です。多項式増大の場合も、Euler--Maruyamaのモーメント評価を組み合わせれば同じ証明の骨格を使えます。

---

## 1. 未来の期待値を $u(t,x)$ に押し込む

時刻 $t$ に $x$ から出発した厳密解を $X_s^{t,x}$ と書き、

$$
\boxed{
u(t,x):=E\left[g\left(X_T^{t,x}\right)\right]}
$$

ではなく、ここでは記号の混同を避けて次のように定義します。

$$
\boxed{
uu(t,x):=E\left[g\left(X_T^{t,x}\right)\right]}
$$

以下ではこの関数を単に $u(t,x)$ と書きます。つまり

$$
\boxed{u(t,x)=E\left[g\left(X_T^{t,x}\right)\right]}.
$$

すると

$$
u(T,x)=g(x)
$$

ではなく、正しくは

$$
\boxed{u(T,x)=g(x)}.
$$

生成作用素を

$$
\mathcal L f(x)
=b(x)f'(x)+\frac12\sigma^2(x)f''(x)
$$

とすると、SP5で見た terminal value 形式の backward Kolmogorov equation より

$$
\boxed{
\partial_tu+\mathcal Lu=0,
\qquad u(T,x)=g(x)
}
$$

を満たします。

> 厳密解と数値解の経路を直接比較する代わりに、厳密解の「未来の期待値」を $u$ に押し込み、数値解の1ステップだけを調べる。

これが weak error 解析の入口です。

---

## 2. Euler--Maruyamaの1ステップは「係数を凍結した拡散」

時刻 $t$、状態 $x$ から1ステップ進む間だけ

$$
\widehat X_s
=x+b(x)(s-t)+\sigma(x)(B_s-B_t),
\qquad t\le s\le t+h
$$

と置きます。

終点は

$$
\widehat X_{t+h}
=x+b(x)h+\sigma(x)(B_{t+h}-B_t)
$$

なので、Euler--Maruyama の1ステップそのものです。

この過程では係数 $b(x),\sigma(x)$ が固定されています。そこで

$$
\boxed{
\mathcal L_x^{\mathrm{fr}}f(y)
=b(x)f'(y)+\frac12\sigma^2(x)f''(y)
}
$$

を **frozen generator** と呼びます。

本来の generator $\mathcal L$ は評価点 $y$ に応じて $b(y),\sigma(y)$ が変わりますが、$\mathcal L_x^{\mathrm{fr}}$ は始点 $x$ の係数を1ステップ中ずっと使います。

---

## 3. 1-step defect を generator の差で表す

$u(s,\widehat X_s)$ にItô公式を使い、期待値を取ります。Itô積分の期待値は0なので

$$
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\partial_s+\mathcal L_x^{\mathrm{fr}})
u(s,\widehat X_s)\,ds.
$$

上式の $\nu$ は誤記ではなく、以後すべて $u$ と読み替えるのではなく、正しい式を改めて書くと

$$
\boxed{
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\partial_s+\mathcal L_x^{\mathrm{fr}})u(s,\widehat X_s)\,ds
}.
$$

一方、backward Kolmogorov equation より

$$
\partial_su+\mathcal Lu=0.
$$

したがって

$$
\boxed{
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,\widehat X_s)\,ds
}.
$$

積分区間の長さだけ見れば $O(h)$ に見えます。しかし積分の中身はステップ始点で0になります。

---

## 4. 局所弱誤差が $O(h^2)$ になる理由

固定した始点 $x$ に対して

$$
F_x(s,y):=(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,y)
$$

と置きます。

$y=x$ では frozen generator と本来の generator の係数が一致するので、すべての $s$ について

$$
\boxed{F_x(s,x)=0}.
$$

特に $F_x(t,x)=0$ です。

そこで $F_x(s,\widehat X_s)$ にもう一度Itô公式を使います。期待値を取ると

$$
E[F_x(s,\widehat X_s)]
=
F_x(t,x)
+
E\int_t^s
(\partial_r+\mathcal L_x^{\mathrm{fr}})
F_x(r,\widehat X_r)\,dr.
$$

第一項は0です。必要な導関数が一様有界なら、ある定数 $C$ が存在して

$$
\left|
(\partial_r+\mathcal L_x^{\mathrm{fr}})
F_x(r,y)
\right|
\le C
$$

と評価できます。したがって

$$
\boxed{
\left|E[F_x(s,\widehat X_s)]\right|
\le C(s-t)
}.
$$

これを前節の式へ戻すと

$$
\begin{aligned}
\left|
E[u(t+h,\widehat X_{t+h})]-u(t,x)
\right|
&\le \int_t^{t+h}C(s-t)\,ds\\
&=\frac{C}{2}h^2.
\end{aligned}
$$

よって

$$
\boxed{
\text{1-step local weak defect}=O(h^2)
}.
$$

### なぜ1段小さくなるのか

$$
\boxed{
\text{ステップ始点では }
\mathcal L_x^{\mathrm{fr}}=\mathcal L
}
$$

だからです。

係数を凍結したことによるズレは、$\widehat X_s$ が始点 $x$ から動いてから初めて現れます。この「始点で差が0」という消去が、局所誤差を $O(h^2)$ まで下げます。

---

## 5. 局所 $O(h^2)$ から大域 $O(h)$ へ

$u(T,x)=g(x)$ なので

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

$Y_n$ を固定して条件付き期待値を取れば、各項は前節の1-step評価です。したがって

$$
\left|
E\left[
u(t_{n+1},Y_{n+1})-u(t_n,Y_n)\mid Y_n\right]
\right|
\le Ch^2
$$

ではなく、正しくは

$$
\boxed{
\left|
E\left[u(t_{n+1},Y_{n+1})-u(t_n,Y_n)\mid Y_n\right]
\right|
\le Ch^2
}.
$$

全ステップを足すと

$$
\begin{aligned}
\left|E[g(Y_N)]-E[g(X_T)]\right|
&\le NCh^2\\
&=\frac{T}{h}Ch^2\\
&=CTh.
\end{aligned}
$$

よって

$$
\boxed{
\left|E[g(Y_N)]-E[g(X_T)]\right|=O(h)
}.
$$

これが Euler--Maruyama の **weak order 1** です。

---

## 6. 定理としてまとめる

### 定理：Euler--Maruyama の weak order 1

SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

と終端関数 $g$ を考える。backward Kolmogorov equation

$$
\partial_tu+\mathcal Lu=0,
\qquad u(T,x)=g(x)
$$

が十分滑らかな古典解 $u$ をもち、上の局所評価に必要な導関数が一様に制御できるとする。

刻み幅 $h=T/N$ の Euler--Maruyama 近似 $Y_N$ に対して、ある $C_T>0$ が存在し、十分小さい $h$ について

$$
\boxed{
\left|E[g(Y_N)]-E[g(X_T)]\right|
\le C_T h
}
$$

が成り立つ。したがって Euler--Maruyama 法の weak convergence order は1である。

### 証明の5行

1. $u(t,x)=E[g(X_T^{t,x})]$ と置く。
2. backward Kolmogorov equation で厳密解側の時間発展を消す。
3. EMの1ステップを frozen diffusion とみなし、差を $(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u$ で表す。
4. generator差はステップ始点で0なので、Itô公式をもう一度使って局所誤差 $O(h^2)$ を得る。
5. $N=T/h$ ステップを telescoping sum で足し、$O(Nh^2)=O(h)$ を得る。$\square$

---

## 7. strong order $1/2$ と矛盾しない

strong error は典型的に

$$
E|X_T-Y_N|
$$

のように、同じBrown運動上で経路そのものの距離を測ります。

一方、weak error は

$$
|E[g(X_T)]-E[g(Y_N)]|
$$

のように、期待値を取った後の差を測ります。

期待値を取ると平均0の揺らぎが相殺されるため、Euler--Maruyama では典型的に

$$
\boxed{
\text{strong order }\frac12,
\qquad
\text{weak order }1
}
$$

となります。

---

## 8. 証明で使ったもの

必要なのは次の4点です。

1. Markov性を使った未来期待値 $u(t,x)$
2. backward Kolmogorov equation
3. Itô公式
4. telescoping sum

経路差を直接評価する Grönwall 型の strong-error 証明は使っていません。

weak解析は「経路誤差の平均を取る」のではなく、**最初から期待値汎関数をPDEへ変換して解析する**のがポイントです。

---

## 9. 演習A

### A01 frozen generator

時刻 $t$、状態 $x$ からの Euler--Maruyama 1ステップを

$$
\widehat X_s=x+b(x)(s-t)+\sigma(x)(B_s-B_t)
$$

と連続時間補間する。このgeneratorが

$$
\mathcal L_x^{\mathrm{fr}}f(y)
=b(x)f'(y)+\frac12\sigma^2(x)f''(y)
$$

となることをItô公式から確認せよ。

### A02 telescoping

各ステップの局所弱誤差が一様に $|\delta_n|\le Ch^2$ と評価できるとする。$N=T/h$ として

$$
\left|\sum_{n=0}^{N-1}\delta_n\right|
\le CTh
$$

を示せ。

---

## 10. 演習B

### B01 局所弱誤差の核心

$$
F_x(s,y)=(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,y)
$$

とする。

1. $F_x(s,x)=0$ を示せ。
2. $F_x(s,\widehat X_s)$ にItô公式を適用し、必要な導関数が有界なら
   $$
   |E[F_x(s,\widehat X_s)]|\le C(s-t)
   $$
   となることを示せ。
3. これを積分し、1-step defectが $O(h^2)$ になることを示せ。

### B02 「局所2次、大域1次」の一般原理

1ステップの期待値誤差が $O(h^{p+1})$ で、終端時刻まで $N=T/h$ ステップ必要だとする。安定性により局所誤差を一様に足し上げられると仮定し、大域誤差が $O(h^p)$ になることを示せ。

Euler--Maruyama の weak order 1 が $p=1$ に対応することも確認せよ。

---

## 11. 最終チェック

weak order 1 の証明は

$$
\boxed{
\partial_tu+\mathcal Lu=0
\Rightarrow
\text{1-step defect}=\int(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u
=O(h^2)
\Rightarrow
O(h^{-1})\text{ steps}
\Rightarrow
O(h)
}
$$

へ圧縮できます。

覚えるべきは「Euler--Maruyamaだから弱1次」という結論より、

> **backward equation が厳密解の時間発展を消し、generator差が始点で0になるため局所誤差が1段小さくなる**

という構造です。
