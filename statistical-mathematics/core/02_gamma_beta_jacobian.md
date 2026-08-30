# Core 26 Gamma–Beta関係・Jacobian・独立

- 旧No.: 02
- 演習価値: S
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## この問題で使う定義

Gamma分布・Beta分布の名称だけを既知として計算を進めない。以下を出発点とする。

Gamma関数を

$$
\Gamma(c)=\int_0^\infty t^{c-1}e^{-t}\,dt,
\qquad c>0
$$

と定める。shape-rate 表示で $X\sim\operatorname{Gamma}(a,1)$ とは

$$
f_X(x)=\frac{x^{a-1}e^{-x}}{\Gamma(a)},
\qquad x>0
$$

を意味する。同様に

$$
f_Y(y)=\frac{y^{b-1}e^{-y}}{\Gamma(b)},
\qquad y>0.
$$

また Beta 関数を

$$
B(a,b)=\int_0^1u^{a-1}(1-u)^{b-1}\,du
$$

と定め、密度

$$
f(u)=\frac{u^{a-1}(1-u)^{b-1}}{B(a,b)},
\qquad 0<u<1
$$

を持つ分布を $\operatorname{Beta}(a,b)$ と呼ぶ。

**重要**：

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

は本問の途中で導く。最初から暗記公式として使わない。

## 問題

独立に

$$
X\sim\operatorname{Gamma}(a,1),
\qquad
Y\sim\operatorname{Gamma}(b,1)
$$

とする。ただし $a,b>0$ とする。

$$
T=X+Y,
\qquad
U=\frac{X}{X+Y}
$$

とおく。

1. 逆変換 $(X,Y)$ を $(T,U)$ で表し、Jacobian を求めよ。
2. $(T,U)$ の同時密度を求めよ。
3. $T$ と $U$ の分布および独立性を示せ。その過程で

   $$
   B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
   $$

   も導け。
4. $E[U]$ を定義から求めよ。

## 詳細解答

### 1. 逆変換と Jacobian

$T=X+Y$, $U=X/(X+Y)$ なので、まず

$$
X=U(X+Y)=UT.
$$

さらに

$$
Y=T-X=T-UT=(1-U)T.
$$

したがって逆変換は

$$
\boxed{X=UT,\qquad Y=(1-U)T}.
$$

元の支持は $x>0,y>0$ である。$t=x+y$ だから $t>0$、また

$$
0<\frac{x}{x+y}<1
$$

なので $0<u<1$ である。逆に $t>0,0<u<1$ なら $x=ut>0$, $y=(1-u)t>0$ なので、変換後の支持はちょうど

$$
\boxed{t>0,\qquad 0<u<1}
$$

である。

Jacobian 行列は

$$
\frac{\partial(x,y)}{\partial(t,u)}
=
\begin{pmatrix}
\dfrac{\partial x}{\partial t} & \dfrac{\partial x}{\partial u}\\[4pt]
\dfrac{\partial y}{\partial t} & \dfrac{\partial y}{\partial u}
\end{pmatrix}
=
\begin{pmatrix}
u&t\\
1-u&-t
\end{pmatrix}.
$$

したがって行列式は

$$
\begin{aligned}
\det\frac{\partial(x,y)}{\partial(t,u)}
&=u(-t)-t(1-u)\\
&=-ut-t+ut\\
&=-t.
\end{aligned}
$$

よって変数変換公式で使う絶対値は

$$
\boxed{|J|=t}.
$$

### 2. $(T,U)$ の同時密度

独立性から

$$
f_{X,Y}(x,y)=f_X(x)f_Y(y).
$$

定義した Gamma 密度を代入すると

$$
\begin{aligned}
f_{X,Y}(x,y)
&=\frac{x^{a-1}e^{-x}}{\Gamma(a)}
\frac{y^{b-1}e^{-y}}{\Gamma(b)}\\
&=\frac{x^{a-1}y^{b-1}e^{-(x+y)}}
{\Gamma(a)\Gamma(b)},
\qquad x>0,y>0.
\end{aligned}
$$

変数変換公式より

$$
f_{T,U}(t,u)
=f_{X,Y}(ut,(1-u)t)\,|J|.
$$

各因子を順に代入すると

$$
\begin{aligned}
f_{T,U}(t,u)
&=\frac{(ut)^{a-1}\{(1-u)t\}^{b-1}e^{-t}}
{\Gamma(a)\Gamma(b)}\,t\\
&=\frac{t^{a+b-1}e^{-t}}
{\Gamma(a)\Gamma(b)}
 u^{a-1}(1-u)^{b-1}.
\end{aligned}
$$

ここで $t$ の部分を Gamma$(a+b,1)$ の密度に合わせるため、$\Gamma(a+b)$ を掛けて割る。

$$
\boxed{
\begin{aligned}
f_{T,U}(t,u)
&=\underbrace{\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}}_{g(t)}\\
&\quad\times
\underbrace{\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}
 u^{a-1}(1-u)^{b-1}}_{h(u)},
\end{aligned}
}
$$

ただし $t>0,0<u<1$ である。

### 3. 周辺分布・独立性と Beta–Gamma 恒等式

まず

$$
g(t)=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)},
\qquad t>0
$$

は定義そのものから $\operatorname{Gamma}(a+b,1)$ の密度であり、

$$
\int_0^\infty g(t)\,dt=1
$$

である。

一方、$(T,U)$ の支持は

$$
(0,\infty)\times(0,1)
$$

という直積で、同時密度は $g(t)h(u)$ と積に分かれている。全確率は1だから

$$
\begin{aligned}
1
&=\int_0^1\int_0^\infty g(t)h(u)\,dt\,du\\
&=\left(\int_0^\infty g(t)\,dt\right)
  \left(\int_0^1h(u)\,du\right)\\
&=\int_0^1h(u)\,du.
\end{aligned}
$$

したがって $h$ 自身も $(0,1)$ 上の確率密度である。

その積分を具体的に書くと

$$
1
=\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}
\int_0^1u^{a-1}(1-u)^{b-1}\,du.
$$

Beta 関数の定義から

$$
1
=\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}B(a,b),
$$

したがって

$$
\boxed{
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
}.
$$

これで Beta–Gamma 恒等式を変数変換から導出できた。

さらに

$$
h(u)
=\frac{1}{B(a,b)}u^{a-1}(1-u)^{b-1}
$$

だから

$$
\boxed{U\sim\operatorname{Beta}(a,b)}.
$$

また同時密度が

$$
f_{T,U}(t,u)=f_T(t)f_U(u)
$$

と周辺密度の積に分かれ、支持も直積なので

$$
\boxed{T\perp U}.
$$

以上より

$$
\boxed{T\sim\operatorname{Gamma}(a+b,1)},
\qquad
\boxed{U\sim\operatorname{Beta}(a,b)},
\qquad
\boxed{T\perp U}.
$$

### 4. $E[U]$ を定義から求める

Beta 密度から

$$
\begin{aligned}
E[U]
&=\int_0^1u\frac{u^{a-1}(1-u)^{b-1}}{B(a,b)}\,du\\
&=\frac{1}{B(a,b)}
\int_0^1u^a(1-u)^{b-1}\,du\\
&=\frac{B(a+1,b)}{B(a,b)}.
\end{aligned}
$$

第3問で導いた Beta–Gamma 恒等式を使うと

$$
\frac{B(a+1,b)}{B(a,b)}
=\frac{\Gamma(a+1)\Gamma(b)}{\Gamma(a+b+1)}
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}.
$$

ここで Gamma 関数の漸化式も確認しておく。部分積分により

$$
\begin{aligned}
\Gamma(c+1)
&=\int_0^\infty t^ce^{-t}\,dt\\
&=\left[-t^ce^{-t}\right]_0^\infty
+c\int_0^\infty t^{c-1}e^{-t}\,dt\\
&=c\Gamma(c).
\end{aligned}
$$

したがって

$$
\Gamma(a+1)=a\Gamma(a),
\qquad
\Gamma(a+b+1)=(a+b)\Gamma(a+b).
$$

よって

$$
\boxed{E[U]=\frac{a}{a+b}}.
$$

## 本番答案

逆変換は

$$
X=UT,\qquad Y=(1-U)T,
$$

支持は $t>0,0<u<1$。また

$$
\frac{\partial(x,y)}{\partial(t,u)}
=\begin{pmatrix}u&t\\1-u&-t\end{pmatrix},
\qquad |J|=t.
$$

独立な Gamma 密度から

$$
\begin{aligned}
f_{T,U}(t,u)
&=\frac{(ut)^{a-1}\{(1-u)t\}^{b-1}e^{-t}}{\Gamma(a)\Gamma(b)}t\\
&=\frac{t^{a+b-1}e^{-t}}{\Gamma(a+b)}
\frac{\Gamma(a+b)}{\Gamma(a)\Gamma(b)}
 u^{a-1}(1-u)^{b-1}.
\end{aligned}
$$

第1因子は Gamma$(a+b,1)$ 密度で積分1。したがって第2因子も積分1であり

$$
B(a,b)=\frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}.
$$

従って

$$
T\sim\Gamma(a+b,1),
\qquad U\sim\operatorname{Beta}(a,b),
\qquad T\perp U.
$$

さらに

$$
E[U]
=\frac{B(a+1,b)}{B(a,b)}
=\frac{a}{a+b}.
$$

## 採点基準

- 逆変換・支持・Jacobian: 5点
- Gamma 密度から同時密度を変数変換で導く: 6点
- 積への分解、Beta–Gamma 恒等式、周辺分布・独立性: 6点
- $E[U]$ と Gamma 漸化式: 3点
