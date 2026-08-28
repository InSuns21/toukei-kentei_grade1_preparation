# Standard 31 Box–Muller変換

- 旧No.: 91
- 層: Standard
- 演習価値: A
- 難度: A
- 目安時間: 20分
- 手計算監査: ◎・修正済（$\log,\sin,\cos$ の数値評価不要）

## 問題

$U_1,U_2$ は独立に一様分布 $U(0,1)$ に従う。すなわち

$$
f_U(u)=
\begin{cases}
1,&0<u<1,\\
0,&\text{otherwise}.
\end{cases}
$$

独立な標準正規変数 $(Z_1,Z_2)$ の目標同時密度は

$$
f_{Z_1,Z_2}(z_1,z_2)
=\frac1{2\pi}
\exp\left[-\frac{z_1^2+z_2^2}{2}\right].
$$

この密度を極座標変換し、$U_1,U_2$ から独立標準正規 $Z_1,Z_2$ を生成する Box–Muller 変換を導け。

## 詳細解答

### 1. 2次元標準正規を極座標へ変換する

極座標

$$
z_1=r\cos\theta,
\qquad
z_2=r\sin\theta,
$$

を用いる。逆に

$$
r=\sqrt{z_1^2+z_2^2},
\qquad
0\le\theta<2\pi
$$

であり、極座標側の支持は

$$
r>0,
\qquad
0\le\theta<2\pi
$$

と取れる。

変換 $(r,\theta)\mapsto(z_1,z_2)$ の Jacobian は

$$
\frac{\partial(z_1,z_2)}{\partial(r,\theta)}
=
\begin{pmatrix}
\cos\theta&-r\sin\theta\\
\sin\theta&r\cos\theta
\end{pmatrix}
$$

なので

$$
\left|
\det\frac{\partial(z_1,z_2)}{\partial(r,\theta)}
\right|
=r.
$$

したがって変数変換公式から

$$
\begin{aligned}
f_{R,\Theta}(r,\theta)
&=f_{Z_1,Z_2}(r\cos\theta,r\sin\theta)\,r\\
&=\frac1{2\pi}e^{-r^2/2}r,
\end{aligned}
$$

すなわち

$$
\boxed{
f_{R,\Theta}(r,\theta)
=\left(re^{-r^2/2}\right)\left(\frac1{2\pi}\right),
\quad
r>0,\ 0\le\theta<2\pi.
}
$$

### 2. $R$ と $\Theta$ の分布

上の同時密度は $r$ だけの因子と $\theta$ だけの因子に分離している。

まず

$$
\int_0^\infty re^{-r^2/2}\,dr=1,
$$

また

$$
\int_0^{2\pi}\frac1{2\pi}\,d\theta=1.
$$

よってそれぞれが周辺密度になっており、

$$
f_R(r)=re^{-r^2/2},\qquad r>0,
$$

$$
f_\Theta(\theta)=\frac1{2\pi},\qquad0\le\theta<2\pi.
$$

さらに

$$
f_{R,\Theta}(r,\theta)=f_R(r)f_\Theta(\theta)
$$

なので

$$
\boxed{R\ \text{と}\ \Theta\ \text{は独立}}.
$$

$\Theta$ については

$$
\boxed{\Theta\sim U(0,2\pi)}.
$$

$R$ の累積分布関数は

$$
\begin{aligned}
F_R(r)
&=\int_0^rse^{-s^2/2}\,ds\\
&=1-e^{-r^2/2},
\qquad r\ge0.
\end{aligned}
$$

したがって生存関数は

$$
P(R>r)=e^{-r^2/2}.
$$

同値に

$$
R^2\sim\chi_2^2.
$$

### 3. 一様乱数から $R,\Theta$ を作る

#### 角度

$U_2\sim U(0,1)$ なので線形変換により

$$
\boxed{\Theta=2\pi U_2\sim U(0,2\pi)}.
$$

#### 半径

逆関数法を使う。$U_1\sim U(0,1)$ とし

$$
U_1=F_R(R)=1-e^{-R^2/2}
$$

と置けば

$$
e^{-R^2/2}=1-U_1.
$$

したがって

$$
R=\sqrt{-2\log(1-U_1)}.
$$

ここで $1-U_1\sim U(0,1)$ なので、乱数の名前を付け替えて

$$
\boxed{R=\sqrt{-2\log U_1}}
$$

としてよい。

$U_1,U_2$ は独立だから、そこから別々に作った $R,\Theta$ も独立である。

### 4. 直交座標へ戻す

最後に

$$
Z_1=R\cos\Theta,
\qquad
Z_2=R\sin\Theta
$$

へ戻せばよい。したがって

$$
\boxed{
Z_1
=\sqrt{-2\log U_1}\cos(2\pi U_2)
}
$$

および

$$
\boxed{
Z_2
=\sqrt{-2\log U_1}\sin(2\pi U_2)
}.
$$

この $(R,\Theta)$ は、先ほど2次元標準正規を極座標化したときに得たものと同じ同時密度を持つ。したがって逆変換した $(Z_1,Z_2)$ の同時密度も

$$
\frac1{2\pi}e^{-(z_1^2+z_2^2)/2}
$$

となり、$Z_1,Z_2$ は独立な $N(0,1)$ である。

重要なのは最終公式の暗記ではなく、

$$
\text{2次元正規}
\to
\text{極座標}
\to
R,\Theta\text{ の独立化}
\to
\text{逆関数法}
$$

という導出の流れである。

## 本番答案

極座標

$$
z_1=r\cos\theta,
\qquad
z_2=r\sin\theta
$$

を用いると Jacobian は $r$ なので

$$
f_{R,\Theta}(r,\theta)
=\frac1{2\pi}re^{-r^2/2}
=\left(re^{-r^2/2}\right)\left(\frac1{2\pi}\right).
$$

よって $R,\Theta$ は独立で

$$
F_R(r)=1-e^{-r^2/2},
\qquad
\Theta\sim U(0,2\pi).
$$

逆関数法より

$$
R=\sqrt{-2\log U_1},
\qquad
\Theta=2\pi U_2.
$$

したがって

$$
\boxed{
Z_1=\sqrt{-2\log U_1}\cos(2\pi U_2)
},
$$

$$
\boxed{
Z_2=\sqrt{-2\log U_1}\sin(2\pi U_2)
}.
$$

## 採点基準

- 極座標変換と Jacobian: 6点
- $R,\Theta$ の周辺分布と独立性: 5点
- $R$ の累積分布関数と逆関数法: 5点
- Box–Muller式: 4点
