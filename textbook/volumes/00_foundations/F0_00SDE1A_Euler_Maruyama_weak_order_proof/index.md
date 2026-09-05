# F0-00SDE1A：Euler--Maruyama weak order 1 の証明

SDE1では、Euler--Maruyama法について

- strong error は典型的に $O(h^{1/2})$
- smoothな期待値に対する weak error は典型的に $O(h)$

と整理しました。

この補講では、後者の **weak order 1 がどこから出るのか** を証明します。

証明の骨格は1本だけです。

$$
\boxed{
\text{backward Kolmogorov}
\to
\text{1-stepの係数固定}
\to
O(h^2)
\to
\frac{T}{h}\text{回足して }O(h)
}
$$

局所誤差が $O(h)$ ではなく **$O(h^2)$ まで一段小さくなる** ところが核心です。

---

## 0. 設定と仮定

一次元の時間一様SDE

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t,
\qquad
X_0=x_0
$$

を考えます。

刻み幅を $h=T/N$、$t_n=nh$ とし、Euler--Maruyama近似を

$$
Y_{n+1}
=
Y_n+b(Y_n)h+\sigma(Y_n)\Delta B_n
$$

で定めます。

終端値の滑らかな関数 $g$ に対して

$$
\left|E[g(Y_N)]-E[g(X_T)]\right|
$$

を評価するのが目標です。

### この補講で置く滑らかさ仮定

最小仮定を詰めることは本題ではありません。ここでは、次で使う backward Kolmogorov equation が古典解をもち、必要な時間・空間微分が一様に有界であると仮定します。

具体的には、$b,\sigma,g$ が十分滑らかで有界であり、必要なら非退化性などを加えればよい、と考えてください。

多項式増大しか仮定しない場合も、Euler--Maruyamaのモーメント評価を併用すれば同じ証明の骨格が使えます。

---

## 1. 未来の期待値を関数 $u(t,x)$ にする

時刻 $t$ に $x$ から出発した厳密解を $X_s^{t,x}$ と書き、

$$
\boxed{
u(t,x)=E\left[g\left(X_T^{t,x}\right)\right]}
$$

と定めます。

すると

$$
u(T,x)=g(x)
$$

です。

生成作用素を

$$
\mathcal L f(x)
=
b(x)f'(x)
+
\frac12\sigma^2(x)f''(x)
$$

とすると、SP5で見た terminal value 形式の backward Kolmogorov equation より

$$
\boxed{
\partial_tu+\mathcal Lu=0,
\qquad
u(T,x)=g(x)
}
$$

を満たします。

この式の役割は重要です。

> 厳密解を直接Euler--Maruyamaと比較する代わりに、厳密解の未来の期待値を $u$ へ押し込み、数値解の1ステップだけを調べる。

これで経路全体の比較から、1-step解析へ問題が変わります。

---

## 2. Euler--Maruyamaの1ステップは「係数を凍結した拡散」

時刻 $t$、状態 $x$ から1ステップ進む間だけ

$$
\widehat X_s
=
x+b(x)(s-t)+\sigma(x)(B_s-B_t),
\qquad t\le s\le t+h
$$

と置きます。

終点は

$$
\widehat X_{t+h}
=x+b(x)h+\sigma(x)(B_{t+h}-B_t)
$$

なので、これは Euler--Maruyama の1ステップそのものです。

この過程では係数 $b(x),\sigma(x)$ が固定されています。そこで

$$
\boxed{
\mathcal L_x^{\mathrm{fr}}f(y)
=
b(x)f'(y)
+
\frac12\sigma^2(x)f''(y)
}
$$

を **frozen generator** と呼びます。

厳密解のgenerator $\mathcal L$ は評価点 $y$ に応じて $b(y),\sigma(y)$ が変わりますが、$\mathcal L_x^{\mathrm{fr}}$ は始点 $x$ の係数を1ステップ中ずっと使います。

---

## 3. 1ステップの弱誤差を書く

$u(s,\widehat X_s)$ にItô公式を使います。

$$
\begin{aligned}
E[u(t+h,\widehat X_{t+h})]-u(t,x)
&=
E\int_t^{t+h}
\left(
\partial_s+\mathcal L_x^{\mathrm{fr}}
\right)
u(s,\widehat X_s)\,ds.
\end{aligned}
$$

一方、$u$ は backward Kolmogorov equation

$$
\partial_su+\mathcal Lu=0
$$

を満たすので、

$$
\boxed{
E[u(t+h,\widehat X_{t+h})]-u(t,x)
=
E\int_t^{t+h}
(\mathcal L_x^{\mathrm{fr}}-\mathcal L)
u(s,\widehat X_s)\,ds
}
$$

となります。

ここだけ見ると積分区間の長さが $h$ なので $O(h)$ に見えます。

しかし、積分の中身はステップ始点で0になります。

---

## 4. なぜ局所弱誤差は $O(h^2)$ まで小さくなるのか

固定した始点 $x$ に対して

$$
F_x(s,y)
:=
(\mathcal L_x^{\mathrm{fr}}-\mathcal L)
u(s,y)
$$

と置きます。

$y=x$ では frozen generator と本来のgeneratorの係数が一致するので、すべての $s$ について

$$
\boxed{F_x(s,x)=0}
$$

です。

特に

$$
F_x(t,x)=0.
$$

そこで今度は $F_x(s,\widehat X_s)$ 自身にItô公式を使います。期待値を取ると

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

とできます。したがって

$$
\boxed{
\left|E[F_x(s,\widehat X_s)]\right|
\le C(s-t)
}
$$

です。

これを前節の式へ戻すと

$$
\begin{aligned}
\left|
E[u(t+h,\widehat X_{t+h})]-u(t,x)
\right|
&\le
\int_t^{t+h}C(s-t)\,ds\\
&=
\frac{C}{2}h^2.
\end{aligned}
$$

よって

$$
\boxed{
\text{1-step local weak defect}=O(h^2)
}
$$

が示されました。

### ここが証明の山場

1ステップは長さ $h$ なのに、誤差は $O(h)$ ではなく $O(h^2)$ です。

理由は

$$
\boxed{
\text{ステップ始点では }
\mathcal L_x^{\mathrm{fr}}=\mathcal L
}
$$

だからです。

係数を凍結したことによるズレは、ステップを少し進んで $\widehat X_s-x$ が生じてから初めて効きます。その余分な1段が、局所誤差を $h^2$ まで下げます。

---

## 5. 局所 $O(h^2)$ から大域 $O(h)$ へ

ここからは telescoping sum です。

$u(T,x)=g(x)$ なので

$$
E[g(Y_N)]-E[g(X_T)]
=
E[u(T,Y_N)]-u(0,x_0).
$$

右辺を各ステップへ分解すると

$$
\begin{aligned}
E[u(T,Y_N)]-u(0,x_0)
=
\sum_{n=0}^{N-1}
E\left[
u(t_{n+1},Y_{n+1})-u(t_n,Y_n)
\right].
\end{aligned}
$$

$Y_n$ を固定して条件付き期待値を取れば、各項は前節の1-step評価そのものです。したがって

$$
\left|
E\left[
u(t_{n+1},Y_{n+1})-u(t_n,Y_n)
\mid Y_n
\right]
\right|
\le Ch^2.
$$

全ステップを足すと

$$
\begin{aligned}
\left|E[g(Y_N)]-E[g(X_T)]\right|
&\le
NCh^2\\
&=
\frac{T}{h}Ch^2\\
&=CTh.
\end{aligned}
$$

よって

$$
\boxed{
\left|E[g(Y_N)]-E[g(X_T)]\right|=O(h)
}
$$

です。

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
\qquad
u(T,x)=g(x)
$$

が十分滑らかな古典解 $u$ をもち、上の局所評価に必要な導関数が一様に制御できるとする。

刻み幅 $h=T/N$ の Euler--Maruyama 近似 $Y_N$ に対して、ある $C_T>0$ が存在し、十分小さい $h$ について

$$
\boxed{
\left|E[g(Y_N)]-E[g(X_T)]\right|
\le C_T h
}
$$

が成り立つ。

したがって Euler--Maruyama 法の weak convergence order は1である。

### 証明

1. $u(t,x)=E[g(X_T^{t,x})]$ と置く。
2. backward Kolmogorov equation で厳密解側の時間発展を消す。
3. Euler--Maruyama の1ステップを frozen diffusion とみなし、差を $(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u$ で表す。
4. この差はステップ始点で0なので、Itô公式をもう一度使うと局所誤差は $O(h^2)$。
5. $N=T/h$ ステップを telescoping sum で足して $O(Nh^2)=O(h)$。

以上です。 $\square$

---

## 7. strong order $1/2$ と矛盾しないのか

矛盾しません。

strong error は典型的に

$$
E|X_T-Y_N|
$$

のように **同じBrown運動上で経路そのものの距離** を測ります。

一方、weak error は

$$
|E[g(X_T)]-E[g(Y_N)]|
$$

のように **期待値を取った後の差** を測ります。

期待値を取ると、Brown運動由来の平均0の揺らぎが相殺されます。そのため Euler--Maruyama では典型的に

$$
\boxed{
\text{strong order }\frac12,
\qquad
\text{weak order }1
}
$$

という異なる次数が現れます。

---

## 8. この証明で何を使い、何を使っていないか

使ったものは次の4点です。

1. Markov性を使った未来期待値 $u(t,x)$
2. backward Kolmogorov equation
3. Itô公式
4. telescoping sum

逆に、厳密解と数値解の経路差を直接評価する Grönwall 型の strong-error 証明は使っていません。

weak解析は「経路誤差の平均を取る」のではなく、**最初から期待値汎関数をPDEへ変換して解析する**のがポイントです。

---

## 9. 演習A

### A01 frozen generator

$$
dX_t=b(X_t)dt+\sigma(X_t)dB_t
$$

に対し、時刻 $t$、状態 $x$ からの Euler--Maruyama 1ステップを連続時間補間

$$
\widehat X_s=x+b(x)(s-t)+\sigma(x)(B_s-B_t)
$$

で表せ。

さらに、そのgeneratorが

$$
\mathcal L_x^{\mathrm{fr}}f(y)
=b(x)f'(y)+\frac12\sigma^2(x)f''(y)
$$

となることをItô公式から確認せよ。

### A02 telescoping

局所弱誤差が各ステップで一様に

$$
|\delta_n|\le Ch^2
$$

と評価できるとする。$N=T/h$ として

$$
\left|\sum_{n=0}^{N-1}\delta_n\right|
\le CTh
$$

を示せ。

---

## 10. 演習B

### B01 局所弱誤差の核心

$$
F_x(s,y)
=(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u(s,y)
$$

とする。

1. $F_x(s,x)=0$ を示せ。
2. $F_x(s,\widehat X_s)$ にItô公式を適用し、必要な導関数が有界なら
   $$
   |E[F_x(s,\widehat X_s)]|\le C(s-t)
   $$
   となることを示せ。
3. これを積分して1-step defectが $O(h^2)$ になることを示せ。

### B02 「局所2次、大域1次」の一般原理

数値時間発展法で、1ステップの期待値誤差が $O(h^{p+1})$ で、終端時刻 $T$ まで $N=T/h$ ステップ必要だとする。

安定性により各局所誤差を一様に足し上げられると仮定し、大域誤差が

$$
O(h^p)
$$

になることを示せ。

その上で Euler--Maruyama の weak order 1 が $p=1$ の場合に対応することを説明せよ。

---

## 11. 最終チェック

weak order 1 の証明は次の1行へ圧縮できます。

$$
\boxed{
\partial_tu+\mathcal Lu=0
\Rightarrow
\text{1-step defect}
=
\int(\mathcal L_x^{\mathrm{fr}}-\mathcal L)u
=
O(h^2)
\Rightarrow
O(h^{-1})\text{ steps}
\Rightarrow
O(h)
}
$$

覚えるべきは「Euler--Maruyamaだから弱1次」という結論より、

> **backward equation が厳密解の時間発展を消し、generator差が始点で0になるため局所誤差が1段小さくなる**

という構造です。
