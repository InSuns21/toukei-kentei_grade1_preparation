# 典型例と完全な導出

## 例1：平方変換

$X\sim\operatorname{Unif}(-1,1)$、$Y=X^2$では$0<y<1$に逆像$\pm\sqrt y$があります。従って
$$
f_Y(y)=\frac12\frac1{2\sqrt y}+\frac12\frac1{2\sqrt y}
=\frac1{2\sqrt y}.
$$
片方の逆像だけでは積分が$1/2$になります。

## 例2：畳込み

独立なUnif$(0,1)$二つの和$S$では、$x$と$s-x$がともに$(0,1)$となる区間長を求めます。
$$
f_S(s)=
\begin{cases}
s,&0<s<1,\\
2-s,&1\leq s<2,\\
0,&\text{otherwise}.
\end{cases}
$$

## 例3：極座標

独立標準正規$X,Y$に対し$R=\sqrt{X^2+Y^2}$、$\Theta=\operatorname{atan2}(Y,X)$とすると、$x=r\cos\theta$, $y=r\sin\theta$、絶対Jacobianは$r$です。従って
$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2},
\quad r>0, 0\leq\theta<2\pi.
$$

## 例4：一様標本の最大値

$X_i\sim\operatorname{Unif}(0,\theta)$なら最大値$M$は
$$
P(M\leq m)=\left(\frac m\theta\right)^n,
\quad0<m<\theta,
$$
で、密度は$nm^{n-1}/\theta^n$です。
