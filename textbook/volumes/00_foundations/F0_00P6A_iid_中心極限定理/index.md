# F0-00P6A 独立同分布中心極限定理：特性関数の局所Taylor展開

P6で準備した特性関数とLévy連続性定理を使い、独立同分布・有限分散版中心極限定理を

$$\boxed{\frac{S_n-n\mu}{\sigma\sqrt n}\Rightarrow N(0,1)}$$

まで導きます。核心は「独立和→積」と「0近傍の二次Taylor展開」です。

---

## 1. 中心極限定理の設定

$X_1,X_2,\dots$ を独立同分布とし

$$
E[X_i]=\mu,
\qquad
0<\sigma^2=\operatorname{Var}(X_i)<\infty
$$

とします。

標準化して

$$
Y_i=\frac{X_i-\mu}{\sigma}
$$

と置けば

$$
E[Y_i]=0,
\qquad
\operatorname{Var}(Y_i)=1.
$$

示したいのは

$$
Z_n
=\frac1{\sqrt n}
\sum_{i=1}^nY_i
\xrightarrow{d}N(0,1)
$$

です。

---

## 2. 標準化和の特性関数

$Y_1$ の特性関数を $\varphi$ とします。

独立性から

$$
\begin{aligned}
\varphi_{Z_n}(t)
&=E\left[
\exp\left(
\frac{it}{\sqrt n}
\sum_{i=1}^nY_i
\right)
\right]\\
&=\prod_{i=1}^n
E\left[e^{itY_i/\sqrt n}\right]\\
&=\left\{
\varphi\left(\frac t{\sqrt n}\right)
\right\}^n.
\end{aligned}
$$

ここで和が積になりました。

---

## 3. 0近傍展開を代入する

前節までから

$$
\varphi(u)
=1-\frac{u^2}{2}+o(u^2).
$$

$u=t/\sqrt n$ とすると

$$
\varphi\left(\frac t{\sqrt n}\right)
=1-
\frac{t^2}{2n}
+o\left(\frac1n\right).
$$

したがって

$$
\varphi_{Z_n}(t)
=\left[
1-
\frac{t^2}{2n}
+o\left(\frac1n\right)
\right]^n.
$$

---

## 4. 指数関数が現れる

一般に

$$
\left(1+\frac an+o(n^{-1})\right)^n
\to e^a.
$$

したがって

$$
\boxed{
\varphi_{Z_n}(t)
\to e^{-t^2/2}
}
$$

です。

右辺は標準正規分布の特性関数です。

Levy連続性定理から

$$
\boxed{
Z_n\xrightarrow{d}N(0,1)
}
$$

を得ます。

これが独立同分布有限分散版の中心極限定理です。

---

## 5. なぜ正規分布なのか

この証明を見ると、正規分布が出る理由はかなり明確です。

中心化した分布の特性関数は0近傍で

$$
1-\frac{\sigma^2t^2}{2}+\text{高次項}
$$

という二次項を持ちます。

独立な和では特性関数が積になり、$1/\sqrt n$ の尺度で見ると高次項が消え、二次項だけが指数化されて

$$
e^{-\sigma^2t^2/2}
$$

が残ります。

つまり

$$
\boxed{
\text{独立な和}
+\text{有限分散}
+\sqrt n\text{尺度}
\Longrightarrow
\text{二次項だけが生き残る}
}
$$

ため正規分布になります。

---

## 6. 分散が無限なら話が変わる

有限分散を外すと、$t^2$ の二次項が支配的とは限りません。

重い裾を持つ分布では、適切に規格化した和がstable分布へ収束することがあります。

したがって

> 何でも足せば正規分布になる

は誤りです。

正規分布は有限分散領域の普遍的な極限です。

---

## 7. Lindeberg--Fellerへの入口

独立だが同分布ではない三角配列でも、個々の項が全体を支配しないというLindeberg条件の下で中心極限定理が成り立ちます。

典型的な条件は

$$
\frac1{s_n^2}
\sum_k
E\left[
X_{n,k}^2
1_{\{|X_{n,k}|>\varepsilon s_n\}}
\right]
\to0
$$

です。

ここにも一様可積分性に似た「巨大な項の寄与を消す」という考えが現れます。

統計学の漸近正規性では、独立同分布版だけでなくこの種の一般化が背景にあります。

---

## 8. 統計学への接続

スコアの和

$$
\sum_{i=1}^n
\frac{\partial}{\partial\theta}
\log p_\theta(X_i)
$$

は独立同分布標本では独立な確率変数の和です。

正則性条件の下で平均0・分散フィッシャー情報量を持つため、中心極限定理からスコアの漸近正規性が得られます。

次章では、この「正則性条件の下で」が具体的に何を意味するかを扱います。

---

## 9. Fourier解析へ進む場合

ここまででは特性関数を確率論の道具として使いました。

Fourier解析そのものを掘る場合は [Encore II：Fourier Analysis & Differential Equations](../F0_00R2_EncoreII_Fourier解析_微分方程式/index.md) へ進んでください。

そこでは

$$
\varphi_X(t)
=
\int e^{itx}\,dP_X(x)
$$

を確率測度のFourier変換として読み直し、

$$
\text{畳み込み}
\to
\text{Fourier空間で積}
\to
\text{CLT}
$$

をFourier解析の一般論へ戻します。

さらにPlancherel、熱方程式、Gaussian heat kernel、Sturm--Liouvilleまで接続します。

---

## 章末チェック

- 特性関数が常に存在する理由を説明できる。
- 独立な和で特性関数が積になることを示せる。
- 有限二次モーメントから0近傍の二次展開を説明できる。
- Levy連続性定理の役割を説明できる。
- 特性関数を使って独立同分布中心極限定理を導ける。
- 正規分布が二次項の指数化として現れる理由を説明できる。
- 有限分散がない場合に正規極限が保証されないことを説明できる。

---

## 演習

### F0-00P6A-A01 標準化和の特性関数を書く

- Level: A
- 目安時間: 12分

独立同分布 $E[X_i]=\mu$, $\operatorname{Var}(X_i)=\sigma^2$ とし $Z_n=(S_n-n\mu)/(\sigma\sqrt n)$。$Y=(X_1-\mu)/\sigma$ の特性関数を $\psi$ とするとき $\varphi_{Z_n}$ を書け。

<!-- solution-start -->
#### 詳細解答
$Z_n=n^{-1/2}\sum_iY_i$。独立性より各項の特性関数を掛けて $\varphi_{Z_n}(t)=[\psi(t/\sqrt n)]^n$。

#### 本番答案
$\varphi_{Z_n}(t)=[\psi(t/\sqrt n)]^n$。

#### 採点基準（20点）
- 標準化: 6点
- 独立性: 6点
- 式: 8点
<!-- solution-end -->

### F0-00P6A-B01 Taylor展開からGaussian極限を出す

- Level: B
- 目安時間: 18分

$E[Y]=0,E[Y^2]=1$ なら $\psi(u)=1-u^2/2+o(u^2)$。これを用いて $[\psi(t/\sqrt n)]^n\to e^{-t^2/2}$ を示せ。

<!-- solution-start -->
#### 詳細解答
$\psi(t/\sqrt n)=1-t^2/(2n)+o(1/n)$。$n\log(1-t^2/(2n)+o(1/n))\to-t^2/2$ なので指数を戻せば極限は $e^{-t^2/2}$。Lévy連続性定理で標準正規への分布収束。

#### 本番答案
$[1-t^2/(2n)+o(n^{-1})]^n\to e^{-t^2/2}$。これは $N(0,1)$ の特性関数なのでLévyより中心極限定理。

#### 採点基準（20点）
- 代入: 5点
- 指数極限: 7点
- 正規特性関数の同定: 4点
- Lévy適用: 4点
<!-- solution-end -->

---

## 次に進む

中心極限定理まで揃ったので [F0-00P7 正則統計モデル](../F0_00P7_統計モデル_尤度_正則性/index.md) でscoreとFisher情報へ進みます。
