# Standard 01 二変量一様分布・条件付き分布・幾何確率

- 旧No.: 11
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$(U,V)$ の同時確率密度関数を

$$
f_{U,V}(u,v)=
\begin{cases}
\dfrac14,&-1\le u\le1,\ -1\le v\le1,\\
0,&\text{otherwise}
\end{cases}
$$

とする。すなわち $(U,V)$ は正方形 $[-1,1]^2$ 上の一様分布に従う。さらに

$$
D=\{|U-V|\le1\}
$$

とする。

1. $P(U^2+V^2\le1)$ と $P(D)$ を求めよ。
2. $D$ の下での条件付き同時密度 $f_{U,V\mid D}(u,v)$ を求めよ。
3. $V\mid D$ の密度と分散を求めよ。
4. $\operatorname{Corr}(U,V\mid D)$ を求めよ。

## 詳細解答

この分布では正方形上で密度が一定なので、正方形内の事象 $A$ に対して

$$
P((U,V)\in A)=\frac14\operatorname{Area}(A)
$$

である。したがって本問の前半は面積計算として処理できる。

### 1. 2つの幾何確率

事象

$$
U^2+V^2\le1
$$

は正方形 $[-1,1]^2$ にちょうど内接する半径1の円盤である。円盤の面積は $\pi$、正方形の面積は4なので

$$
P(U^2+V^2\le1)
=\frac14\pi
=\boxed{\frac\pi4}.
$$

次に

$$
D=\{-1\le U,V\le1,\ |U-V|\le1\}
$$

を考える。補集合は

$$
U-V>1
\quad\text{または}\quad
V-U>1
$$

であり、正方形の右下と左上にある脚長1の直角三角形2個に対応する。各三角形の面積は $1/2$ なので

$$
\operatorname{Area}(D)
=4-\frac12-\frac12
=3.
$$

よって

$$
P(D)=\frac14\operatorname{Area}(D)
=\boxed{\frac34}.
$$

### 2. 条件付き同時密度

事象 $D$ による条件付き密度は

$$
f_{U,V\mid D}(u,v)
=\frac{f_{U,V}(u,v)\boldsymbol1_D(u,v)}{P(D)}.
$$

ここで $f_{U,V}=1/4$, $P(D)=3/4$ だから

$$
f_{U,V\mid D}(u,v)
=\frac{1/4}{3/4}\boldsymbol1_D(u,v)
=\frac13\boldsymbol1_D(u,v).
$$

したがって

$$
\boxed{
f_{U,V\mid D}(u,v)=
\begin{cases}
\dfrac13,&-1\le u,v\le1,\ |u-v|\le1,\\
0,&\text{otherwise}.
\end{cases}}
$$

条件付け後も $D$ 上では密度が一定であり、「正方形上の一様分布」を「斜め帯 $D$ 上の一様分布」へ切り取った形になっている。

### 3. $V\mid D$ の密度と分散

周辺密度は $u$ を積分して求める。固定した $v\in[-1,1]$ に対し

$$
|u-v|\le1
\iff
v-1\le u\le v+1.
$$

さらに元の支持 $-1\le u\le1$ との共通部分を取る必要がある。

#### $-1\le v\le0$ の場合

このとき $v-1\le-1$ かつ $v+1\le1$ なので

$$
-1\le u\le v+1.
$$

したがって

$$
\begin{aligned}
f_{V\mid D}(v)
&=\int_{-1}^{v+1}\frac13\,du\\
&=\frac{v+2}{3}.
\end{aligned}
$$

#### $0\le v\le1$ の場合

このとき $v-1\ge-1$ かつ $v+1\ge1$ なので

$$
v-1\le u\le1.
$$

よって

$$
f_{V\mid D}(v)
=\int_{v-1}^{1}\frac13\,du
=\frac{2-v}{3}.
$$

以上より

$$
\boxed{
f_{V\mid D}(v)=
\begin{cases}
(2+v)/3,&-1\le v\le0,\\
(2-v)/3,&0\le v\le1,\\
0,&\text{otherwise}.
\end{cases}}
$$

確認として

$$
\int_{-1}^1f_{V\mid D}(v)\,dv=1
$$

となる。

領域 $D$ と密度は $(u,v)\mapsto(-u,-v)$ で不変なので、$V\mid D$ の分布は0について対称である。したがって

$$
E[V\mid D]=0.
$$

よって分散は二次モーメントそのもので

$$
\begin{aligned}
\operatorname{Var}(V\mid D)
&=E[V^2\mid D]\\
&=2\int_0^1v^2\frac{2-v}{3}\,dv\\
&=\frac23\left(\frac23-\frac14\right)\\
&=\boxed{\frac5{18}}.
\end{aligned}
$$

$U$ と $V$ は対称な役割を持つので

$$
\operatorname{Var}(U\mid D)=\frac5{18}
$$

でもある。

### 4. 条件付き相関

同じ原点対称性から

$$
E[U\mid D]=E[V\mid D]=0
$$

なので

$$
\operatorname{Cov}(U,V\mid D)=E[UV\mid D].
$$

$v\in[0,1]$ では $u\in[v-1,1]$ だから

$$
\begin{aligned}
\int_{v-1}^{1}uv\,du
&=v\left[\frac{u^2}{2}\right]_{v-1}^{1}\\
&=\frac v2\{1-(v-1)^2\}\\
&=v^2-\frac{v^3}{2}.
\end{aligned}
$$

$v<0$ の部分は変換 $(u,v)\mapsto(-u,-v)$ により $uv$ の値が変わらないため、$v>0$ 側と同じ寄与を持つ。したがって

$$
\begin{aligned}
E[UV\mid D]
&=2\int_0^1\int_{v-1}^1uv\frac13\,du\,dv\\
&=\frac23\int_0^1\left(v^2-\frac{v^3}{2}\right)dv\\
&=\frac23\left(\frac13-\frac18\right)\\
&=\boxed{\frac5{36}}.
\end{aligned}
$$

よって

$$
\begin{aligned}
\operatorname{Corr}(U,V\mid D)
&=\frac{\operatorname{Cov}(U,V\mid D)}{
\sqrt{\operatorname{Var}(U\mid D)\operatorname{Var}(V\mid D)}}\\
&=\frac{5/36}{5/18}\\
&=\boxed{\frac12}.
\end{aligned}
$$

元の $U,V$ は正方形上で独立だが、$|U-V|\le1$ という「互いに近い値を取りやすい」条件で選別すると正の依存が生じる。条件付けによって独立性が失われる典型例である。

## 本番答案

正方形上の密度は $1/4$。円盤の面積比より

$$
P(U^2+V^2\le1)=\frac\pi4.
$$

$D$ は正方形から面積 $1/2$ の三角形2個を除く領域なので

$$
P(D)=\frac34.
$$

従って

$$
f_{U,V\mid D}(u,v)=\frac13\boldsymbol1_D(u,v).
$$

固定した $v$ について $[-1,1]\cap[v-1,v+1]$ の長さを求めれば

$$
f_{V\mid D}(v)=
\begin{cases}
(2+v)/3,&-1\le v\le0,\\
(2-v)/3,&0\le v\le1.
\end{cases}
$$

対称性から平均0で

$$
E[V^2\mid D]
=\frac23\int_0^1(2v^2-v^3)dv
=\frac5{18}.
$$

また

$$
E[UV\mid D]
=\frac23\int_0^1\left(v^2-\frac{v^3}{2}\right)dv
=\frac5{36}.
$$

よって

$$
\operatorname{Corr}(U,V\mid D)=\frac12.
$$

## 採点基準

- 幾何確率2個: 5点
- 条件付き同時密度（正規化・支持）: 4点
- 周辺密度・分散の導出: 6点
- 条件付き共分散・相関: 5点
