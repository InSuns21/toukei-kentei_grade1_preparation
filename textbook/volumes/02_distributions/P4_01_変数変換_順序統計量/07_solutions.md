# 詳細解答集

## P4-A01 解答
### 詳細解答
$Y$の台は$[0,1]$です。$0\leq y<1$で
$$
F_Y(y)=P(-\sqrt y\leq X\leq\sqrt y)=\sqrt y.
$$
従って
$$
F_Y(y)=\begin{cases}0,&y<0,\\\sqrt y,&0\leq y<1,\\1,&y\geq1,
\end{cases}
\quad
f_Y(y)=\frac1{2\sqrt y}\boldsymbol{1}_{(0,1)}(y).
$$
### 本番答案
$Y\in[0,1]$。$F_Y(y)=0,\sqrt y,1$をそれぞれ$y<0$, $0\leq y<1$, $y\geq1$で取り、$f_Y(y)=(2\sqrt y)^{-1}\boldsymbol{1}_{(0,1)}(y)$。
### 採点基準
台2点、CDF4点、密度4点。

## P4-A02 解答
### 詳細解答
$x=y/2$、$dx/dy=1/2$より、$y>0$で
$$
f_Y(y)=\lambda e^{-\lambda y/2}\frac12.
$$
従って$Y\sim\operatorname{Exp}(\lambda/2)$です。
### 本番答案
$f_Y(y)=(\lambda/2)e^{-(\lambda/2)y}\boldsymbol{1}_{(0,\infty)}(y)$、すなわちExp$(\lambda/2)$。
### 採点基準
逆変換3点、Jacobian3点、密度・同定4点。

## P4-A03 解答
### 詳細解答
$0\leq m\leq1$で$F_M(m)=P(X_1\leq m,\ldots,X_4\leq m)=m^4$です。よって$f_M(m)=4m^3$。また
$$
E[M]=\int_0^1m\,4m^3dm=\frac45.
$$
### 本番答案
$F_M(m)=0,m^4,1$（$m<0$, $0\leq m<1$, $m\geq1$）、$f_M(m)=4m^3\boldsymbol{1}_{(0,1)}(m)$、$E[M]=4/5$。
### 採点基準
CDF4点、密度3点、平均3点。

## P4-A04 解答
### 詳細解答
一様順序統計量の公式から$X_{(2)}\sim\operatorname{Beta}(2,4)$です。従って
$$
E[X_{(2)}]=\frac26=\frac13,
\qquad
\operatorname{Var}(X_{(2)})=\frac{2\cdot4}{6^2\cdot7}=\frac2{63}.
$$
### 本番答案
$X_{(2)}\sim\operatorname{Beta}(2,4)$、平均$1/3$、分散$2/63$。
### 採点基準
パラメータ4点、平均3点、分散3点。

## P4-B01 解答
### 詳細解答
畳込みの積分区間は$(0,1)\cap(s-1,s)$です。従って$0<s<2$では
$$
f_S(s)=\int_{\max(0,s-1)}^{\min(1,s)}dx,
$$
台外では0であり、まとめると
$$
f_S(s)=\begin{cases}s,&0<s<1,\\2-s,&1\leq s<2,\\0,&\text{otherwise}.
\end{cases}
$$
積分すると
$$
F_S(s)=\begin{cases}
0,&s\leq0,\\s^2/2,&0<s<1,\\1-(2-s)^2/2,&1\leq s<2,\\1,&s\geq2.
\end{cases}
$$
### 本番答案
$f_S(s)=s$（$0<s<1$）、$2-s$（$1\leq s<2$）、範囲外0。CDFは$0,s^2/2,1-(2-s)^2/2,1$を各区間で取る。
### 採点基準
積分範囲4点、密度3点、CDF3点。

## P4-B02 解答
### 詳細解答
$R=X/Y$, $V=Y$とすると$x=rv,y=v$、絶対Jacobianは$v$です。$r,v>0$で
$$
f_{R,V}(r,v)=\lambda\mu v e^{-(\lambda r+\mu)v}.
$$
従って$r>0$で
$$
f_R(r)=\lambda\mu\int_0^\infty ve^{-(\lambda r+\mu)v}dv
=\frac{\lambda\mu}{(\lambda r+\mu)^2}.
$$
また
$$
F_R(r)=1-\int_0^\infty P(X>ry\mid Y=y)\mu e^{-\mu y}dy
=\frac{\lambda r}{\mu+\lambda r}.
$$
### 本番答案
$r>0$で$f_R(r)=\lambda\mu/(\lambda r+\mu)^2$、$F_R(r)=\lambda r/(\mu+\lambda r)$。$r\leq0$では両者はそれぞれ0。
### 採点基準
変換・台3点、Jacobian2点、密度3点、CDF2点。

## P4-B03 解答
### 詳細解答
$x=r\cos\theta,y=r\sin\theta$、$r>0$, $0\leq\theta<2\pi$で絶対Jacobianは$r$です。従って
$$
f_{R,\Theta}(r,\theta)=\frac1{2\pi}re^{-r^2/2}
=\{re^{-r^2/2}\}\frac1{2\pi}.
$$
よって$f_R(r)=re^{-r^2/2}$、$f_\Theta(\theta)=1/(2\pi)$で独立です。$T=R^2$では
$$
f_T(t)=f_R(\sqrt t)\frac1{2\sqrt t}=\frac12e^{-t/2},\quad t>0,
$$
すなわち$T\sim\chi_2^2$です。
### 本番答案
$f_{R,\Theta}(r,\theta)=(2\pi)^{-1}re^{-r^2/2}$（$r>0,0\leq\theta<2\pi$）。周辺の積へ分かれるので独立。$f_R(r)=re^{-r^2/2}$、$\Theta\sim$Unif$(0,2\pi)$、$R^2\sim\chi_2^2$。
### 採点基準
領域2点、Jacobian2点、同時密度2点、周辺・独立2点、平方分布2点。

## P4-B04 解答
### 詳細解答
$0<u<v<1$で
$$
f_{U,V}(u,v)=3\cdot2(v-u)=6(v-u).
$$
事象$U>0.2,V<0.8$は3標本全てが$(0.2,0.8)$に入ることなので
$$
P(U>0.2,V<0.8)=0.6^3=0.216.
$$
### 本番答案
$f_{U,V}(u,v)=6(v-u)\boldsymbol{1}_{\{0<u<v<1\}}$。求める確率は全3標本が長さ0.6の区間に入る確率$0.6^3=0.216$。
### 採点基準
係数4点、台2点、事象の言換え2点、確率2点。

## P4-C01 解答
### 時間配分
初動3分、(1)3分、(2)7分、(3)4分、(4)3分、(5)3分、見直し2分。
### 詳細解答
$y>0$で逆像は$\pm\sqrt y$、各枝の絶対微分は$1/(2\sqrt y)$です。従って
$$
f_Y(y)=\frac{e^{-y/2}}{\sqrt{2\pi y}}\boldsymbol{1}_{(0,\infty)}(y).
$$
これは形状$1/2$、率$1/2$のGamma密度です。よって
$$
E[Y]=1,\qquad\operatorname{Var}(Y)=2,\qquad
M_Y(t)=(1-2t)^{-1/2}\quad(t<1/2).
$$
### 本番答案
$Y>0$で逆像$\pm\sqrt y$を両方足し、
$$
f_Y(y)=\frac{e^{-y/2}}{\sqrt{2\pi y}}.
$$
従って$Y\sim\operatorname{Gamma}(1/2,1/2)=\chi_1^2$、平均1、分散2、$M_Y(t)=(1-2t)^{-1/2}$（$t<1/2$）。
### 採点基準と選択判断
台・逆像4点、密度8点、同定5点、平均分散4点、MGF4点。3分で二つの逆像が見えれば選択し、15分でGamma同定まで進めば継続します。25分ではMGFの存在範囲を補って閉じます。

## P4-C02 解答
### 時間配分
初動3分、逆変換4分、台4分、Jacobian5分、同時・周辺7分、独立3分、見直し2分。
### 詳細解答
逆変換は
$$
x=su,\qquad y=s(1-u).
$$
$x,y>0$から$s>0$, $0<u<1$です。
$$
\det\frac{\partial(x,y)}{\partial(s,u)}
=\det\begin{pmatrix}u&s\\1-u&-s\end{pmatrix}=-s,
$$
なので絶対Jacobianは$s$です。従って
$$
f_{S,U}(s,u)=\lambda^2s e^{-\lambda s}
\boldsymbol{1}_{(0,\infty)}(s)\boldsymbol{1}_{(0,1)}(u).
$$
これはGamma$(2,\lambda)$の密度とUnif$(0,1)$の密度の積です。従って$S\sim\operatorname{Gamma}(2,\lambda)$、$U\sim\operatorname{Unif}(0,1)$で、両者は独立です。
### 本番答案
$x=su,y=s(1-u)$、台$s>0,0<u<1$、絶対Jacobian$s$。よって
$$
f_{S,U}(s,u)=\lambda^2se^{-\lambda s}\boldsymbol{1}_{(0,\infty)}(s)\boldsymbol{1}_{(0,1)}(u).
$$
周辺密度の積なので$S\sim$Gamma$(2,\lambda)$、$U\sim$Unif$(0,1)$かつ独立。
### 採点基準と選択判断
逆変換4点、台4点、Jacobian6点、同時密度5点、周辺・独立6点。3分で$x=su$が見えれば選択し、15分でJacobianまで進めば継続します。25分では因数分解と両周辺名を書いて閉じます。

## P4-C03 解答
### 時間配分
初動3分、配置5分、密度7分、正規化5分、変換3分、数値2分、見直し2分。
### 詳細解答
$F$が微分可能で$F'(x)=f(x)$となる点で、$\Delta_h=F(x+h)-F(x)=f(x)h+o(h)$とします。$x$以下が$k-1$個、$(x,x+h]$が1個、$x+h$より上が$n-k$個である主要項は
$$
\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}\Delta_h
\{1-F(x+h)\}^{n-k}.
$$
微小区間へ2個以上入る項は$O(\Delta_h^2)=o(h)$です。全確率を$h$で割って$h\downarrow0$とすると
$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}
F(x)^{k-1}\{1-F(x)\}^{n-k}f(x).
$$
$u=F(x)$で積分すると
$$
\frac{n!}{(k-1)!(n-k)!}B(k,n-k+1)=1.
$$
同じ変換から$F\{X_{(k)}\}\sim\operatorname{Beta}(k,n-k+1)$です。$n=5,k=3$の一様標本中央値はBeta$(3,3)$で
$$
E[X_{(3)}]=\frac12,\qquad
\operatorname{Var}(X_{(3)})=\frac{3\cdot3}{6^2\cdot7}=\frac1{28}.
$$
### 本番答案
$\Delta_h=F(x+h)-F(x)=f(x)h+o(h)$であり、区間内2個以上の項は$o(h)$である。左$k-1$個・区間内1個・右$n-k$個の主要項を$h$で割って極限を取ると
$$
f_{X_{(k)}}(x)=\frac{n!}{(k-1)!(n-k)!}F^{k-1}(1-F)^{n-k}f.
$$
$u=F(x)$で係数と$B(k,n-k+1)$が相殺し正規化される。また$F(X_{(k)})\sim$Beta$(k,n-k+1)$。一様標本$n=5,k=3$ではBeta$(3,3)$、平均$1/2$、分散$1/28$。
### 採点基準と選択判断
配置5点、係数・密度8点、正規化5点、Beta変換4点、数値3点。3分で三領域の個数が書ければ選択し、15分で密度まで進めば継続します。25分ではBeta積分とパラメータ順を残して閉じます。

## P4-C04 解答
### 時間配分
初動3分、(1)5分、(2)2分、(3)6分、(4)5分、(5)2分、見直し2分。
### 詳細解答
$u\geq0$で
$$
P(U>u)=P(X_1>u,\ldots,X_n>u)=e^{-n\lambda u},
$$
なので$U\sim\operatorname{Exp}(n\lambda)$、$E[U]=1/(n\lambda)$です。$v\geq0$で
$$
F_V(v)=\{1-e^{-\lambda v}\}^n,
$$
$$
f_V(v)=n\lambda e^{-\lambda v}\{1-e^{-\lambda v}\}^{n-1}.
$$
$0\leq a<b$では、全標本が$(a,b]$に入るため
$$
P(U>a,V\leq b)=\{e^{-\lambda a}-e^{-\lambda b}\}^n.
$$
独立ならこれは$P(U>a)P(V\leq b)=e^{-n\lambda a}\{1-e^{-\lambda b}\}^n$に等しいはずですが、一般に等しくないので$n\geq2$では非独立です。
### 本番答案
$P(U>u)=e^{-n\lambda u}$より$U\sim$Exp$(n\lambda)$、$E[U]=1/(n\lambda)$。$v\geq0$で
$$
F_V(v)=(1-e^{-\lambda v})^n,\quad
f_V(v)=n\lambda e^{-\lambda v}(1-e^{-\lambda v})^{n-1}.
$$
$P(U>a,V\leq b)=(e^{-\lambda a}-e^{-\lambda b})^n$で、周辺確率の積とは一般に異なるため非独立。
### 採点基準と選択判断
最小生存5点、分布・平均4点、最大CDF・密度6点、同時事象6点、非独立4点。3分で全件事象が見えれば選択し、15分で最大密度まで進めば継続します。25分では非独立を確率式の不一致で閉じます。

## P4-C05 解答
### 時間配分
初動3分、差5分、積6分、比7分、正規化4分、確率1分、見直し2分。
### 詳細解答
差は重なり区間の長さから
$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d).
$$
積$p=xy$では$0<p<1$かつ$p<x<1$なので
$$
f_P(p)=\int_p^1\frac{dx}{x}=-\log p.
$$
比$r=x/y$ではJacobian$y$、$0<y<\min(1,1/r)$より
$$
f_R(r)=\int_0^{\min(1,1/r)}y\,dy
=\begin{cases}1/2,&0<r\leq1,\\1/(2r^2),&r>1,\\0,&r\leq0.
\end{cases}
$$
正規化は
$$
\int_{-1}^1(1-|z|)\,dz=1,
\quad\int_0^1-\log p\,dp=1,
\quad\int_0^1\frac12\,dr+\int_1^\infty\frac{dr}{2r^2}=1.
$$
$X<Y$は$R<1$なので確率は$\int_0^1(1/2)dr=1/2$です。
### 本番答案
$$
f_D(d)=(1-|d|)\boldsymbol{1}_{(-1,1)}(d),\qquad
f_P(p)=-\log p\,\boldsymbol{1}_{(0,1)}(p),
$$
$$
f_R(r)=\begin{cases}1/2,&0<r\leq1,\\1/(2r^2),&r>1,\\0,&r\leq0.
\end{cases}
$$
各積分は順に1、1、$1/2+1/2=1$。$P(X<Y)=P(R<1)=1/2$。
### 採点基準と選択判断
差5点、積6点、比8点、正規化4点、確率2点。3分で三つの台が書ければ選択し、15分で積まで進めば継続します。25分では比の区分点$r=1$とJacobian$y$を必ず残して閉じます。

## P4-D01 解答
### 時間配分
領域4分、配置8分、係数6分、密度8分、特殊化5分、正規化6分、見直し3分。
### 詳細解答
$x<y$かつ$F'(x)=f(x),F'(y)=f(y)$となる点を取り、$h,\ell>0$を十分小さくします。$x$以下に$i-1$個、$(x,x+h]$に1個、$(x+h,y]$に$j-i-1$個、$(y,y+\ell]$に1個、$y+\ell$より右に$n-j$個を配置する主要項の係数は
$$
\frac{n!}{(i-1)!(j-i-1)!(n-j)!}.
$$
二つの微小区間の確率増分はそれぞれ$f(x)h+o(h)$、$f(y)\ell+o(\ell)$です。どちらかの区間へ2個以上入る残りの項は$O(h^2\ell+h\ell^2)=o(h\ell)$です。長方形確率を$h\ell$で割って$h,\ell\downarrow0$とすると、$F(b)-F(a)=\int_a^bf(t)dt$と表せる$F$について、面積0の例外点を除いて
$$
\begin{aligned}
f_{X_{(i)},X_{(j)}}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}\\
&\quad\times F(x)^{i-1}f(x)
\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j},
\end{aligned}
$$
$x<y$であり、領域外は0です。$i=1,j=n$で$n(n-1)\{F(y)-F(x)\}^{n-2}f(x)f(y)$を得ます。

$a=F(x)$、$b=F(y)$と置くと、正規化積分は
$$
\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
\int_{0<a<b<1}a^{i-1}(b-a)^{j-i-1}(1-b)^{n-j}da\,db.
$$
三つの区間長$a,b-a,1-b$に対するDirichlet積分は
$$
\frac{(i-1)!(j-i-1)!(n-j)!}{n!}
$$
なので積は1です。これは全標本配置の排反な場合を全て足した確率が1であることとも一致します。
### 本番答案
$x<y$かつ$F'=f$となるほとんど全ての二点で、幅$h,\ell$の二つの微小区間へ各1個、左$i-1$個、中間$j-i-1$個、右$n-j$個を配置する。複数個が入る項は$o(h\ell)$なので、長方形確率を$h\ell$で割った極限は
$$
\begin{aligned}
f_{i,j}(x,y)
&=\frac{n!}{(i-1)!(j-i-1)!(n-j)!}
F(x)^{i-1}f(x)\\
&\quad\times\{F(y)-F(x)\}^{j-i-1}f(y)
\{1-F(y)\}^{n-j}.
\end{aligned}
$$
$i=1,j=n$で最小・最大公式を得る。$a=F(x),b=F(y)$により三つの間隔のDirichlet積分となり、係数の逆数なので正規化される。
### 採点基準と選択判断
配置分類8点、係数7点、密度10点、最小最大5点、正規化7点。3分で五領域の個数が書けなければ後回しにします。15分で係数まで得られれば継続し、25分で密度本体まで完成しなければ配置確率を残して打ち切ります。完答時はCDF変換で正規化を閉じます。
