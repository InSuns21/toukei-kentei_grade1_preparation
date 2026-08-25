# Standard 01 二変量一様分布・条件付き分布・幾何確率

- 旧No.: 11
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 25分
- 手計算監査: ◎

## 問題

$(U,V)$ は正方形 $[-1,1]^2$ 上の一様分布に従う。$D=\{|U-V|\le1\}$ とする。

1. $P(U^2+V^2\le1)$ と $P(D)$ を求めよ。
2. $D$ の下での条件付き同時密度を求めよ。
3. $V\mid D$ の密度と分散を求めよ。
4. $\operatorname{Corr}(U,V\mid D)$ を求めよ。

## 詳細解答

正方形 $[-1,1]^2$ の面積は4なので、同時確率密度関数は正方形上で

$$
f_{U,V}(u,v)=\frac14.
$$

### 1. 2つの幾何確率

事象 $U^2+V^2\le1$ は正方形内の半径1の円盤である。したがって確率は面積比から

$$
P(U^2+V^2\le1)=\frac{\pi\cdot1^2}{4}=\boxed{\frac\pi4}.
$$

次に $D=\{|U-V|\le1\}$ を考える。補集合は $U-V>1$ または $V-U>1$ で、正方形の左上・右下にある脚長1の直角三角形2個である。各面積は $1/2$ なので

$$
\operatorname{Area}(D)=4-\frac12-\frac12=3,
$$

よって

$$
P(D)=\boxed{\frac34}.
$$

### 2. 条件付き同時密度

条件付き密度の定義から

$$
f_{U,V\mid D}(u,v)=\frac{f_{U,V}(u,v)\boldsymbol1_D(u,v)}{P(D)}.
$$

したがって

$$
f_{U,V\mid D}(u,v)=\frac{1/4}{3/4}\boldsymbol1_D(u,v)=\frac13\boldsymbol1_D(u,v).
$$

すなわち

$$
\boxed{f_{U,V\mid D}(u,v)=\frac13}
$$

ただし $-1\le u,v\le1$ かつ $|u-v|\le1$ であり、それ以外では0である。

### 3. $V\mid D$ の密度と分散

$v$ を固定して、条件 $|u-v|\le1$ を満たす $u$ の長さを求める。

$-1<v<0$ では $-1\le u\le v+1$ なので

$$
f_{V\mid D}(v)=\int_{-1}^{v+1}\frac13\,du=\frac{v+2}{3}.
$$

$0<v<1$ では $v-1\le u\le1$ なので

$$
f_{V\mid D}(v)=\int_{v-1}^{1}\frac13\,du=\frac{2-v}{3}.
$$

よって

$$
\boxed{
f_{V\mid D}(v)=
\begin{cases}
(2+v)/3,&-1<v<0,\\
(2-v)/3,&0<v<1.
\end{cases}}
$$

領域 $D$ は原点について対称なので $E[V\mid D]=0$。従って

$$
\begin{aligned}
E[V^2\mid D]
&=2\int_0^1v^2\frac{2-v}{3}\,dv\\
&=\frac23\int_0^1(2v^2-v^3)\,dv\\
&=\frac23\left(\frac23-\frac14\right)\\
&=\boxed{\frac5{18}}.
\end{aligned}
$$

したがって

$$
\boxed{\operatorname{Var}(V\mid D)=\frac5{18}}.
$$

対称性から $\operatorname{Var}(U\mid D)=5/18$ でもある。

### 4. 条件付き相関

原点対称性から $E[U\mid D]=E[V\mid D]=0$ なので

$$
\operatorname{Cov}(U,V\mid D)=E[UV\mid D].
$$

$v>0$ では $v-1\le u\le1$ だから

$$
\begin{aligned}
\int_{v-1}^{1}uv\,du
&=v\left[\frac{u^2}{2}\right]_{v-1}^{1}\\
&=v\frac{1-(v-1)^2}{2}\\
&=v^2-\frac{v^3}{2}.
\end{aligned}
$$

$v<0$ 側も対称に同じ寄与を持つので

$$
\begin{aligned}
E[UV\mid D]
&=\frac23\int_0^1\left(v^2-\frac{v^3}{2}\right)dv\\
&=\frac23\left(\frac13-\frac18\right)\\
&=\boxed{\frac5{36}}.
\end{aligned}
$$

したがって

$$
\operatorname{Corr}(U,V\mid D)=\frac{5/36}{\sqrt{(5/18)(5/18)}}=\boxed{\frac12}.
$$

もともと $U,V$ は独立だが、斜め帯 $D$ で条件付けることで正の依存が生じる。

## 本番答案

正方形上の同時確率密度関数は $1/4$。円盤の面積比より $P(U^2+V^2\le1)=\pi/4$。$D$ は正方形から面積 $1/2$ の三角形2個を除くので $P(D)=3/4$。従って

$$
f_{U,V\mid D}=\frac13\boldsymbol1_D.
$$

$v<0$ では許される $u$ の長さが $2+v$、$v>0$ では $2-v$ なので

$$
f_{V\mid D}(v)=\begin{cases}(2+v)/3,&-1<v<0,\\(2-v)/3,&0<v<1.\end{cases}
$$

対称性から平均0で

$$
E[V^2\mid D]=\frac23\int_0^1(2v^2-v^3)dv=\frac5{18}.
$$

また

$$
E[UV\mid D]=\frac23\int_0^1\left(v^2-\frac{v^3}{2}\right)dv=\frac5{36}.
$$

よって $\operatorname{Corr}(U,V\mid D)=1/2$。

## 採点基準

- 幾何確率2個: 5点
- 条件付き同時密度: 4点
- 周辺密度・分散の積分: 6点
- 条件付き共分散・相関: 5点
