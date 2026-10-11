# CDYN6 Duffing振動子のポテンシャルとセパラトリクス

[CDYN5の強制減衰振動](../CDYN5/index.md#thm-cdyn5-forced-response)では、復元力が位置に比例する場合に、余弦と正弦を組み合わせて周期特解を決めました。しかし力が位置の三乗を含むと、正弦波を代入しただけで三倍角の項が現れます。外力と減衰をいったん取り去り、**どの初期値でどのような軌道をたどるか**を先に調べましょう。

[CDYN2の正則な二転回点からの周期軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)は、エネルギー曲線の両端で有限時間に折り返す仕組みを教えました。今回は同じ道具を使いながら、ポテンシャルに谷が二つ、間に山が一つあるために、**振動の範囲がエネルギーによって切り替わる**現象を調べます。山の高さにちょうど達すると、周期曲線と別の、鞍点へ無限時間かけて近づく軌道が現れます。

## 1. 非線形復元力をエネルギーに直す

正の定数 $\mu>0$、$\lambda>0$ を固定し、実数時刻 $t$ 上で

$$
q''=\mu q-\lambda q^3,\qquad
q'=v,\quad v'=\mu q-\lambda q^3
$$

を考えます。これは外力・減衰のない自律Duffing振動子です。右辺は多項式で局所Lipschitz連続なので、任意の初期状態 $(q_0,v_0)\in\mathbb R^2$ に一意の局所解があります。

力を $-U'(q)$ と表したいので、$U'(q)=-\mu q+\lambda q^3$ を積分します。基準 $U(0)=0$ を選ぶと

$$
U(q)=-\frac{\mu}{2}q^2+\frac{\lambda}{4}q^4,\qquad
H(q,v)=\frac12v^2+U(q)
$$

です。[ODE4の第一積分判定](../ODE4/index.md#thm-ode4-first-integral-criterion)を直接確かめると

$$
\frac{dH}{dt}
=v(\mu q-\lambda q^3)+(-\mu q+\lambda q^3)v=0.
$$

したがって $H(q(t),v(t))=E$ は一定であり、運動できるのは $U(q)\le E$ の範囲だけです。

**この解は有限時刻で発散しません。

** $\lambda>0$ により $|q|\to\infty$ では $U(q)\to\infty$ です。

エネルギー $E$ を固定すると $U(q)\le E$ は有界な閉集合になり、さらに $v^2=2(E-U(q))$ から $v$ も有界です。

状態はコンパクトな集合に留まり、右辺もそこで有界です。

有限の最大存在時刻があれば状態はその時刻へ収束し、局所解を連結できて最大性に矛盾します。

負時刻も同じなので、解は全実数時刻で存在します。

## 2. 谷二つと中央の山

まず力が零になる位置を探します。$U'(q)=q(-\mu+\lambda q^2)$ なので、

$$
a=\sqrt{\frac{\mu}{\lambda}},\qquad
U'(q)=0\quad\Longleftrightarrow\quad q\in\{-a,0,a\}
$$

です。二階微分 $U''(q)=-\mu+3\lambda q^2$ は

$$
U''(0)=-\mu<0,\qquad U''(\pm a)=2\mu>0.
$$

原点は局所最大、$\pm a$ は局所最小です。高さは

$$
U(0)=0,\qquad
U(\pm a)=-\frac{\mu^2}{4\lambda}=:-D,\qquad D>0.
$$

右の井戸と左の井戸は同じ深さ $D$ を持ちます。このように二つの極小点が中央の極大点に隔てられた配置に、次の名前を付けます。

<a id="def-cdyn6-double-well"></a>

<!-- formal-statement-start -->
### 定義（二重井戸ポテンシャル）

$\mu,\lambda>0$ とし、$U:\mathbb R\to\mathbb R$ を $U(q)=-\mu q^2/2+\lambda q^4/4$ とする。この $U$ の二つの極小点 $q=\pm\sqrt{\mu/\lambda}$ と、その間の極大点 $q=0$ が作る配置を、本章の**二重井戸ポテンシャル**と呼ぶ。井戸の底のエネルギーは $-D=-\mu^2/(4\lambda)$ である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn6-double-well -->
**定義の確認**　$\mu=\lambda=1$ なら $U(q)=-q^2/2+q^4/4$ です。$U'(q)=q(q^2-1)$ より極値の候補は $-1,0,1$ で、$U''(\pm1)=2>0$、$U''(0)=-1<0$。実際 $U(\pm1)=-1/4$、$U(0)=0$ なので定義の二つの谷と中央の山を確認できます。
<!-- definition-example-end -->

位置 $q_*$ が平衡点であるには $v=0$ かつ $U'(q_*)=0$ が必要です。$q=q_*+x$ とおき一次の項を取り出すと、線形化は

$$
\begin{pmatrix}x\\v\end{pmatrix}'
=
\begin{pmatrix}0&1\\-U''(q_*)&0\end{pmatrix}
\begin{pmatrix}x\\v\end{pmatrix}.
$$

原点の固有値は $\pm\sqrt{\mu}$ なので鞍点です。

$\pm a$ の固有値は $\pm i\sqrt{2\mu}$。

線形化では中心型を示唆しますが、純虚固有値だけでは非線形系の結論は出ません。

ここではエネルギーの極小性と次の周期軌道の直接構成により、$\pm a$ の周囲が保存的な閉軌道で満たされることを確定します。

## 3. エネルギーの高さで軌道を分類する

転回点は $v=0$、すなわち $U(q)=E$ です。$y=q^2\ge0$ とおくと

$$
\lambda y^2-2\mu y-4E=0,\qquad
y_\pm(E)=\frac{\mu\pm\sqrt{\mu^2+4\lambda E}}{\lambda}.
$$

$-D<E<0$ のとき平方根は $0<\sqrt{\mu^2+4\lambda E}<\mu$ なので、$y_\pm$ はともに正です。$r_\pm=\sqrt{y_\pm}$ とおけば

$$
0<r_-<a<r_+,\qquad
U(q)-E=\frac{\lambda}{4}(q^2-r_-^2)(q^2-r_+^2).
$$

この積の符号を調べると、運動可能な場所は左右の二つの区間 $[-r_+,-r_-]$ と $[r_-,r_+]$ だけです。

<a id="thm-cdyn6-energy-regimes"></a>

<!-- formal-statement-start -->
### 定理（Duffing振動子のエネルギー水準と軌道の分類）

$\mu,\lambda>0$、$D=\mu^2/(4\lambda)$ とし、$q'=v,\ v'=\mu q-\lambda q^3$ のエネルギーを $E=v^2/2+U(q)$ とする。

1. $E<-D$ の実状態はない。$E=-D$ のエネルギー水準は平衡点 $(\pm a,0)$ のみである。
2. $-D<E<0$ では二つの互いに交わらない非定常周期軌道があり、左右の井戸を各一つだけ回る。
3. $E=0$ では原点の平衡点と、右側・左側に一本ずつの非定常なホモクリニック軌道があり、非定常周期軌道はない。
4. $E>0$ では両井戸を横断する一つの非定常周期軌道があり、原点の位置 $q=0$ を速さ $\sqrt{2E}$ で通過する。
<!-- formal-statement-end -->

**証明の見取り図**　まず $E-U(q)$ の符号で許される位置を決めます。非零の転回点で $U'\ne0$ なら、[CDYN2の周期軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)で周期性が成立します。$E=0$ だけは中央の端点が平衡点になり、その仮定を失います。ここは次節で時間まで追って証明します。

<!-- proof-start -->
### 証明

$U(q)+D=\lambda(q^2-a^2)^2/4\ge0$ なので最小値は $-D$、等号は $q=\pm a$ だけです。$E<-D$ は不可能で、$E=-D$ なら $v^2/2=0$ かつ $q=\pm a$ が必要です。

$-D<E<0$ では前述の因数分解により許される位置は二つの区間です。右側では

$$
U'(r_-)=r_-(-\mu+\lambda r_-^2)<0,\quad
U'(r_+)=r_+(-\mu+\lambda r_+^2)>0,
$$

かつ区間内部で $U(q)<E$ です。

$U$ は多項式で $C^2$ なので、[CDYN2の正則二転回点の定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)を $[r_-,r_+]$ に適用でき、左右の速度枝を有限時間で往復する一周期軌道を得ます。

左側でも $U$ が偶関数であることから $[-r_+,-r_-]$ の二端点の微分の符号が逆になり、もう一つの周期軌道が得られます。

$q=0$ は $U(0)=0>E$ なので二つの軌道は交わりません。

$E>0$ では $y_+(E)>2\mu/\lambda$、$y_-(E)<0$ です。

従って正の転回点は $R(E)=\sqrt{y_+(E)}$ のみで、許される位置は $[-R,R]$。

内部では $U(q)<E$、また $R>a$ なので $U'(R)>0$、$U'(-R)<0$。

同じ[周期軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)により一つの周期軌道が得られます。

$q=0$ を通るとき保存則は $v^2/2=E-U(0)=E$ なので、速度は $v=\pm\sqrt{2E}$ です。

$E=0$ については次節の[分離軌道の明示定理](#thm-cdyn6-homoclinic)で、原点以外のすべての水準点が左右一本ずつの非定常軌道になることと、有限周期が存在しないことを証明します。$\square$
<!-- proof-end -->

この分類でいう「一本の周期軌道」は初期時刻の違いを同一視した位相平面上の軌道です。異なる初期位相からも同じ幾何学的曲線をなぞります。

## 4. 分離軌道は有限時間では原点に到達しない

原点 $(0,0)$ は静止解であり、エネルギー0の非定常軌道はその近くへ出入りできます。しかし**原点に有限時刻で達してしまう**なら、初期値問題の一意性から、その解は静止解と一致して非定常ではなくなります。そこで時間を無限に延ばすと、前後の両方向で同じ平衡点へ近づく軌道を考えます。これがホモクリニック軌道です。

<a id="def-cdyn6-homoclinic"></a>

<!-- formal-statement-start -->
### 定義（ホモクリニック軌道とセパラトリクス）

自律ODE $z'=F(z)$ に平衡点 $p$ があるとき、全時刻で定義された非定常解 $z:\mathbb R\to\mathbb R^n$ が

$$
\lim_{t\to-\infty}z(t)=\lim_{t\to+\infty}z(t)=p
$$

を満たせば、その解の像を $p$ への**ホモクリニック軌道**という。本章ではDuffing振動子の $E=0$ にある二本のホモクリニック軌道を、左右の周期領域と両井戸横断領域の境界となる**セパラトリクス（分離軌道）**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-cdyn6-homoclinic -->
**定義の確認**　$\mu=\lambda=1$ とし、$q(t)=\sqrt2/\cosh t$、$v=q'$ を候補にします。

$\cosh t=(e^t+e^{-t})/2$ は $t\to\pm\infty$ で無限大へ発散するので $q(t)\to0$。

また $v(t)=-\sqrt2\,\sinh t/\cosh^2t$ も両方向で0へ収束します。

一方 $q(0)=\sqrt2$ で非定常です。

次の計算によりこの組が方程式の解であることも直接確認します。
<!-- definition-example-end -->

<a id="thm-cdyn6-homoclinic"></a>

<!-- formal-statement-start -->
### 定理（Duffing分離軌道の明示解と無限到達時間）

$\mu,\lambda>0$、$b=\sqrt{2\mu/\lambda}$、$\alpha=\sqrt\mu$ とする。各符号 $\sigma\in\{-1,1\}$ と時刻平行移動 $t_0\in\mathbb R$ に対し

$$
q_\sigma(t)=\sigma b\,\operatorname{sech}(\alpha(t-t_0)),
\qquad v_\sigma(t)=q_\sigma'(t)
$$

は $E=0$ の非定常全時刻解で、$(q_\sigma(t),v_\sigma(t))\to(0,0)$ が $t\to\pm\infty$ の両方で成立する。$E=0$ の原点以外の水準集合はこの二本の軌道の像に一致し、有限周期を持つ非定常解はない。
<!-- formal-statement-end -->

**証明の見取り図**　まず明示解を二度微分して元の方程式に代入します。エネルギー式から $E=0$ の到達可能範囲を調べ、正と負の位置の領域を分けます。最後に原点近傍の時間積分が対数発散することを示します。

<!-- proof-start -->
### 証明

$ s=\alpha(t-t_0)$、$f(s)=\operatorname{sech}s=1/\cosh s$、$g(s)=\tanh s$ とします。$f'=-fg$、$g'=f^2$、$g^2+f^2=1$ から

$$
q_\sigma'=-\sigma b\alpha fg,\qquad
q_\sigma''=\sigma b\alpha^2(fg^2-f^3)
=\sigma b\mu(f-2f^3).
$$

一方、$\lambda b^2=2\mu$ と $\sigma^3=\sigma$ を用いれば

$$
\mu q_\sigma-\lambda q_\sigma^3
=\sigma b\mu f-\sigma\lambda b^3f^3
=\sigma b\mu(f-2f^3).
$$

従って方程式を満たします。$t=t_0$ では $q_\sigma=\sigma b$、$q_\sigma'=0$ であり、$U(\sigma b)=-\mu b^2/2+\lambda b^4/4=0$。保存エネルギーは $E=0$ です。$f\to0$、$fg\to0$ が両無限方向で成立するため、定義の極限を満たします。

次に、$E=0$ のエネルギー式は

$$
v^2= -2U(q)=\mu q^2-\frac{\lambda}{2}q^4
=\mu q^2\left(1-\frac{q^2}{b^2}\right).
$$

従って $|q|\le b$、また $q=0$ では $v=0$ です。

原点以外の状態は $0<q\le b$ または $-b\le q<0$ に属し、どちらも速度の正負二枝が $q=\pm b$ で接続します。

上の明示解は各領域の折返し点 $(\sigma b,0)$ を通り、前半と後半で速度の符号が逆です。

さらに $f$ は $t-t_0\in\mathbb R$ 上で $(0,1]$ のすべての値を取るので、各領域のエネルギー曲線全体（原点そのものを除く）を通ります。

解の一意性からほかの非定常軌道はありません。

時間積分でも原点へ有限時間に達しないことを確かめます。右側で $0<q<b$ の移動時間の絶対値は

$$
|dt|=\frac{dq}{\sqrt\mu\,q\sqrt{1-q^2/b^2}}
$$

です。$0<q<b$ で $\sqrt{1-q^2/b^2}\le1$ なので、$\varepsilon<\delta<b$ に対し

$$
\int_\varepsilon^\delta\frac{dq}{\sqrt\mu\,q\sqrt{1-q^2/b^2}}
\ge\frac1{\sqrt\mu}\int_\varepsilon^\delta\frac{dq}{q}
=\frac1{\sqrt\mu}\log\frac{\delta}{\varepsilon}
\longrightarrow\infty
$$

となります。左側も $|q|$ で同じです。つまり原点への接近は無限時間を要し、$E=0$ の非定常軌道は有限時間に元の状態へ戻らないので周期軌道ではありません。$\square$
<!-- proof-end -->

この結果は、[CDYN2の正則転回点](../CDYN2/index.md#def-cdyn2-regular-turning)の仮定がなぜ重要かを示します。

$q=0$ は $U(0)=0$ ですが $U'(0)=0$ であり、正則転回点ではありません。

エネルギー曲線の見た目だけで、周期 $T=2\int dq/\sqrt{2(E-U)}$ が有限と決めつけてはいけません。

## 5. 周期積分はセパラトリクスへ近づくと発散する

ここまで軌道の**形**を決めました。次は一周にかかる**時間**です。非線形振動では、周期は一般に振幅やエネルギーとともに変わります。特に中央の山の近くでは速度が小さくなり、原点の手前で長く滞在することを計算できます。

<a id="prop-cdyn6-period-formulas"></a>

<!-- formal-statement-start -->
### 命題（井戸内振動と両井戸横断振動の周期積分）

$\mu,\lambda>0$、$D=\mu^2/(4\lambda)$ とする。$-D<E<0$ の右井戸の周期、および $E>0$ の両井戸横断の周期はそれぞれ

$$
T_{\mathrm{well}}(E)=2\int_{r_-(E)}^{r_+(E)}
\frac{dq}{\sqrt{2(E-U(q))}},
$$

$$
T_{\mathrm{cross}}(E)=2\int_{-R(E)}^{R(E)}
\frac{dq}{\sqrt{2(E-U(q))}},
\quad
R(E)=\sqrt{\frac{\mu+\sqrt{\mu^2+4\lambda E}}{\lambda}}
$$

であり、両方とも各固定エネルギーでは有限である。左井戸の周期は対称性により $T_{\mathrm{well}}(E)$ と等しい。
<!-- formal-statement-end -->

<!-- proof-start -->
### 証明

$-D<E<0$ なら端点 $r_-,r_+$ はいずれも正則で、区間内部で $E-U>0$、$U'(r_-)<0<U'(r_+)$ です。

従って[CDYN2の周期公式](../CDYN2/index.md#thm-cdyn2-closed-orbit)の $a,b$ に $r_-,r_+$ を代入できます。

右井戸の片道が積分、往復が二倍となります。

端点に近づくと $E-U(q)$ は非零の傾きを持つ一次式と同程度なので、積分は $|q-r_\pm|^{-1/2}$ 型で可積分です。

$E>0$ では $U(-R)=U(R)=E$、$U'(-R)<0<U'(R)$、区間内部で $U(q)<E$ です。同じ定理の $a,b$ に $-R,R$ を代入すると第二式を得ます。左井戸は写像 $(q,v)\mapsto(-q,-v)$ により右井戸と同じ時間で一周します。$\square$
<!-- proof-end -->

<a id="thm-cdyn6-period-divergence"></a>

<!-- formal-statement-start -->
### 定理（分離軌道への接近による井戸内周期の発散）

$\mu,\lambda>0$ を固定した保存Duffing振動子について、右井戸または左井戸の周期は

$$
\lim_{E\uparrow0}T_{\mathrm{well}}(E)=+\infty,\qquad -D<E<0
$$

を満たす。従ってこの振動子の周期はエネルギーに依存し、全振幅で同一周期となる調和振動子とは異なる。
<!-- formal-statement-end -->

**証明の見取り図**　内側の転回点 $r_-(E)$ が0へ近づく区間だけを積分して、全周期の下界を作ります。原点近傍の速度は $q$ に比例する量以下なので、移動時間は $dq/q$ で下から抑えられ、対数発散します。

<!-- proof-start -->
### 証明

$E\uparrow0$ のとき

$$
r_-^2(E)=\frac{\mu-\sqrt{\mu^2+4\lambda E}}{\lambda}
=\frac{-4E}{\mu+\sqrt{\mu^2+4\lambda E}}
\longrightarrow0
$$

です。固定した $0<\delta<a$ を取ります。$E$ が十分0に近いとき $r_-(E)<\delta<r_+(E)$ となります。さらに $2r_-<\delta$ となるようにします。

$r_-<q<\delta$ は運動可能な区間です。$E<0$ と $\lambda q^4/4\ge0$ により

$$
0<E-U(q)=E+\frac{\mu}{2}q^2-\frac{\lambda}{4}q^4
\le\frac{\mu}{2}q^2.
$$

従って $2r_-<q<\delta$ において

$$
\frac{1}{\sqrt{2(E-U(q))}}
\ge\frac{1}{\sqrt\mu\,q}.
$$

[周期積分の命題](#prop-cdyn6-period-formulas)の積分領域を狭め、非負被積分関数の単調性を使うと

$$
T_{\mathrm{well}}(E)
\ge 2\int_{2r_-}^{\delta}\frac{dq}{\sqrt\mu\,q}
=\frac{2}{\sqrt\mu}\log\frac{\delta}{2r_-(E)}
\longrightarrow+\infty.
$$

この下界だけで周期全体の発散が証明されました。対して[CDYN2の調和振動子の等時性](../CDYN2/index.md#thm-cdyn2-harmonic-period)では、二次ポテンシャルの周期は振幅に依存せず有限の定数です。$\square$
<!-- proof-end -->

**よくある誤解**　転回点において速度 $v=0$ であること自体は周期の発散を意味しません。

$r_\pm$ では $U'\ne0$ なので有限時間に折り返します。

発散を起こしているのは、$E\uparrow0$ に伴って内側の転回点が退化した平衡点 $q=0$ に近づくことです。

## 6. 三つの境界を混同しない

本章の保存系と前章の強制振動を区別しておきます。[CDYN5の定常周期応答](../CDYN5/index.md#def-cdyn5-steady-response)は、正の減衰と周期外力を持つ**非自律な線形方程式**の解でした。一方、ここで分類したのは外力も減衰もない**自律な非線形方程式**です。非線形力 $\mu q-\lambda q^3$ に単一周波数の余弦を代入しても、一般にはその周波数だけの式で閉じません。例えば $q(t)=A\cos(\omega t)$ を仮定すると、加法定理から $\cos 3\theta=4\cos^3\theta-3\cos\theta$ なので

$
q(t)^3=\frac{A^3}{4}\bigl(3\cos(\omega t)+\cos(3\omega t)\bigr)
$

です。$\lambda>0,\ A\ne0$ なら三倍角の項が消えず、線形振動子で使った一周波数だけの係数比較はそのままでは使えません。また、周期軌道の存在と、それに近い初期値が引き寄せられるという主張も異なります。保存エネルギーが初期値によって異なる以上、異なるエネルギー軌道が勝手に一つの周期軌道へ吸い寄せられることはありません。

全体像を数式で読み直すと次のようになります。

| エネルギー | 位置が動ける領域 | 時間的挙動 |
| --- | --- | --- |
| $E=-D$ | $q=\pm a$ | 二つの平衡点 |
| $-D<E<0$ | 左右の分離した二区間 | 左右各一つの周期軌道 |
| $E=0$ | $-b\le q\le b$（原点は平衡点） | 二本のホモクリニック軌道と原点 |
| $E>0$ | $-R(E)\le q\le R(E)$ | 両井戸を横断する周期軌道 |

表で「区間」と書いたのは位置への射影です。位相平面では $v=\pm\sqrt{2(E-U(q))}$ の上下二本の速度枝を合わせて、実際の軌道を読み取ります。

## 7. 演習と詳細解答

Level Aで保存則、平衡点、転回点、分離解を計算し、Level Bで運動可能集合、周期積分、到達時間と符号の扱いを検証します。Level Cでは一つの具体的な振動子を使い、すべてのエネルギー領域と極限を結び付けます。

### A1. 力からポテンシャルを復元する

$q''=4q-q^3$、$U(0)=0$ とする。$U(q)$ と保存エネルギーを求め、時間微分が0になることを確かめよ。

- Level: A
- ID: CDYN6-A1

<!-- solution-start -->
**詳細解答**　$-U'(q)=4q-q^3$ だから $U'(q)=-4q+q^3$。積分して $U=-2q^2+q^4/4$、$U(0)=0$ なので積分定数は0です。$H=v^2/2-2q^2+q^4/4$ と置くと

$$
H'=vv'+(-4q+q^3)q'
=v(4q-q^3)+(-4q+q^3)v=0.
$$

従って $H$ は保存されます。
<!-- solution-end -->

### A2. 鞍点と井戸の底を特定する

$\mu=4,\lambda=1$ の平衡点、ポテンシャル値、線形化の固有値をすべて求めよ。

- Level: A
- ID: CDYN6-A2

<!-- solution-start -->
**詳細解答**　$U'(q)=q(q^2-4)=0$ なので $q=0,\pm2$。

$U(0)=0$、$U(\pm2)=-2(4)+16/4=-4$。

二階微分は $U''(q)=-4+3q^2$ なので $U''(0)=-4$、$U''(\pm2)=8$。

線形化の特性式は $\rho^2+U''(q_*)=0$ です。

原点は $\rho=\pm2$ で鞍点、両井戸の底は $\rho=\pm 2\sqrt2\,i$。

後者は線形化の中心型を示しますが、非線形の閉軌道についてはエネルギーと正則転回点で証明します。
<!-- solution-end -->

### A3. 負のエネルギーの四転回点

$\mu=\lambda=1$、$E=-3/16$ とする。転回点の位置と、右井戸内の運動可能区間を求めよ。

- Level: A
- ID: CDYN6-A3

<!-- solution-start -->
**詳細解答**　$D=1/4$ で $-1/4<-3/16<0$。平方根は $\sqrt{1+4E}=\sqrt{1-3/4}=1/2$ です。よって

$$
y_-=\frac12,\quad y_+=\frac32,\qquad
r_-=\frac1{\sqrt2},\quad r_+=\sqrt{\frac32}.
$$

四転回点は $\pm1/\sqrt2,\ \pm\sqrt{3/2}$。右井戸の運動可能区間は $[1/\sqrt2,\sqrt{3/2}]$、左井戸は $[-\sqrt{3/2},-1/\sqrt2]$ です。$q=0$ では $U(0)=0>E$ となり通過できません。
<!-- solution-end -->

### A4. 分離解を代入して確かめる

$q''=q-q^3$ に対して $q(t)=\sqrt2\,\operatorname{sech}t$ の初期値、二階微分、エネルギー、両無限時刻での極限を計算せよ。

- Level: A
- ID: CDYN6-A4

<!-- solution-start -->
**詳細解答**　$f=\operatorname{sech}t$、$g=\tanh t$ とすると $f'=-fg,\ g'=f^2$ です。$q'=-\sqrt2 fg$、$q''=\sqrt2(fg^2-f^3)=\sqrt2(f-2f^3)$。一方 $q-q^3=\sqrt2 f-2\sqrt2 f^3$ で一致します。$q(0)=\sqrt2$、$q'(0)=0$、$U(\sqrt2)=-2/2+4/4=0$ より $E=0$。$f\to0$、$fg\to0$ から $(q,q')\to(0,0)$ が両無限方向で成立します。
<!-- solution-end -->

### A5. 鞍点を横切る速さ

$\mu=2,\lambda=1$ とする。エネルギー $E=1$ の解が $q=0$ を通過するときの速度の値をすべて求めよ。$E=0$ とどう違うか。

- Level: A
- ID: CDYN6-A5

<!-- solution-start -->
**詳細解答**　$U(0)=0$ なので保存則から $v^2/2=E-U(0)=1$、ゆえに $v=\pm\sqrt2$。

$E>0$ では速度は零にならず原点の位置を横切れます。

$E=0$ で $q=0$ なら $v=0$ の平衡点だけであり、非定常な解が有限時刻にそこへ到達することは一意性に反します。
<!-- solution-end -->

### B1. 二井戸と横断を同じ式から判定する

$\mu=\lambda=1$ について、(1) $E=-3/16$ と (2) $E=1/4$ の運動可能集合を求め、それぞれ周期軌道が何本あるか説明せよ。

- Level: B
- ID: CDYN6-B1

<!-- solution-start -->
**詳細解答**　(1) はA3の計算から $r_-=1/\sqrt2$、$r_+=\sqrt{3/2}$。

運動可能集合は $[-\sqrt{3/2},-1/\sqrt2]\cup[1/\sqrt2,\sqrt{3/2}]$。

左右各二端点では $U'\ne0$、区間内部で $U<E$ なので[CDYN2の周期軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)により二本です。

(2) では $\sqrt{1+4E}=\sqrt2$、$y_+=1+\sqrt2>0$、$y_-=1-\sqrt2<0$。

正の転回点は $R=\sqrt{1+\sqrt2}$ のみです。

運動可能集合は $[-R,R]$ で、端点は正則、内部は $U<E$。

同じ[周期軌道定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)により両井戸を横断する一本の周期軌道です。
<!-- solution-end -->

### B2. 周期が有限であるための端点評価

$-D<E<0$、右井戸の内側端点 $r_-$ について $E-U(q)\ge c(q-r_-)$ が $r_-\le q\le r_-+\delta$ で成立する $c,\delta>0$ の存在を示し、周期積分のその端での可積分性を証明せよ。

- Level: B
- ID: CDYN6-B2

<!-- solution-start -->
**詳細解答**　$U'(r_-)<0$、$U'$ は連続なので、ある $\delta>0$ と $c>0$ を選び、$[r_-,r_-+\delta]$ で $-U'(s)\ge c$ とできます。$U(r_-)=E$ であることから、$U'$ を端点まで積分して

$$
E-U(q)=U(r_-)-U(q)=\int_{r_-}^{q}[-U'(s)]ds\ge c(q-r_-).
$$

従って

$$
\int_{r_-}^{r_-+\delta}\frac{dq}{\sqrt{2(E-U(q))}}
\le\frac1{\sqrt{2c}}\int_{r_-}^{r_-+\delta}\frac{dq}{\sqrt{q-r_-}}
=\sqrt{\frac{2\delta}{c}}<\infty.
$$

外側端点にも $U'(r_+)>0$ を用いた同種の評価があり、中間の閉区間では $E-U$ が正の最小値を持つので周期全体が有限です。
<!-- solution-end -->

### B3. 対数発散の下界を再構成する

$\mu=\lambda=1$、$-1/4<E<0$ に対し、右井戸の周期が $E\uparrow0$ で発散することを、$\delta=1/2$ を固定して示せ。

- Level: B
- ID: CDYN6-B3

<!-- solution-start -->
**詳細解答**　$r_-^2=1-\sqrt{1+4E}\to0$、$r_+\to\sqrt2$ なので、十分0に近い負の $E$ なら $2r_-<1/2<r_+$ です。$r_-<q<1/2$ で

$$
0<E-U(q)=E+\frac12q^2-\frac14q^4\le\frac12q^2
$$

です。従って[井戸内周期の積分表示](#prop-cdyn6-period-formulas)は

$$
T_{\mathrm{well}}(E)
\ge2\int_{2r_-}^{1/2}\frac{dq}{q}
=2\log\frac1{4r_-}\to\infty.
$$

この評価は内側端点そのものを積分せず、動く端点から少し離れた区間だけで発散を示しています。
<!-- solution-end -->

### B4. 原点へ有限時刻で到達できない二つの理由

$\mu,\lambda>0$、$E=0$ とする。右の非定常軌道が原点へ有限時刻に到達できないことを、(1) ODEの一意性、(2) 時間積分の二通りで説明せよ。

- Level: B
- ID: CDYN6-B4

<!-- solution-start -->
**詳細解答**　(1) $(0,0)$ は $q'=v=0$、$v'=\mu q-\lambda q^3=0$ を満たす平衡点です。ある有限時刻 $t_*$ に非定常解が $(0,0)$ を通れば、その時刻を初期時刻とする定数解と一致し、局所Lipschitz性による一意性に矛盾します。

(2) $b=\sqrt{2\mu/\lambda}$、$0<q<b$ で速度の大きさは $\sqrt\mu q\sqrt{1-q^2/b^2}$。$0<\varepsilon<\delta<b$ として原点付近の所要時間は

$$
\int_\varepsilon^\delta
\frac{dq}{\sqrt\mu\,q\sqrt{1-q^2/b^2}}
\ge\frac1{\sqrt\mu}\log\frac\delta\varepsilon
\to\infty.
$$

従って有限時刻で原点には到達しません。二つの方法はそれぞれ解の一意性と移動時間の発散という異なる機構を説明しています。
<!-- solution-end -->

### C1. 二重井戸の全エネルギー領域を追う

$q''=q-q^3$ について次の問いに答えよ。

1. ポテンシャルと保存量を求め、三つの平衡点とその型を計算せよ。
2. $E=-3/16$ の転回点を求め、二本の周期軌道の位置区間と周期積分を記せ。
3. $E=0$ の右側分離解を明示し、初期値と方程式を検算せよ。
4. $E=1/4$ について転回点と原点通過速度、周期積分を求めよ。
5. $E\uparrow0$ の右井戸周期の発散を下界で示し、$E=0$ の非定常軌道が周期解ではないことを説明せよ。

- Level: C
- ID: CDYN6-C1

<!-- solution-start -->
**詳細解答**

**(1)**　$U'(q)=-q+q^3$ を積分すると $U=-q^2/2+q^4/4$、$H=v^2/2+U$。$\dot H=v(q-q^3)+(-q+q^3)v=0$ です。$U'=q(q^2-1)=0$ なので $q=0,\pm1$。$U''=-1+3q^2$ は $q=0$ で $-1$、$\pm1$ で $2$。線形化の固有値は原点で $\pm1$、両井戸の底で $\pm i\sqrt2$ です。エネルギー最小値は $-1/4$。

**(2)**　$E=-3/16$ では $\sqrt{1+4E}=1/2$ なので $r_-=1/\sqrt2$、$r_+=\sqrt{3/2}$。

右の位置区間は $[r_-,r_+]$、左は $[-r_+,-r_-]$。

$U'(r_-)<0<U'(r_+)$ なので[CDYN2の周期定理](../CDYN2/index.md#thm-cdyn2-closed-orbit)により二本の軌道が存在します。

共通の最小周期は

$$
T=2\int_{1/\sqrt2}^{\sqrt{3/2}}
\frac{dq}{\sqrt{2(-3/16+q^2/2-q^4/4)}}.
$$

**(3)**　[分離解の定理](#thm-cdyn6-homoclinic)から $q(t)=\sqrt2\,\operatorname{sech}t$、$q'(t)=-\sqrt2\,\operatorname{sech}t\tanh t$。$q(0)=\sqrt2,\ v(0)=0$。$f=\operatorname{sech}t$ とおくと $q''=\sqrt2(f-2f^3)=q-q^3$。$U(\sqrt2)=0$ で $E=0$、両方向の無限時刻で $(q,v)\to(0,0)$ です。

**(4)**　$E=1/4$ では $y_+=1+\sqrt2$、$y_-<0$ なので $R=\sqrt{1+\sqrt2}$。二つの転回点は $\pm R$。原点で $v^2/2=1/4$ より $v=\pm1/\sqrt2$。周期は

$$
T=2\int_{-\sqrt{1+\sqrt2}}^{\sqrt{1+\sqrt2}}
\frac{dq}{\sqrt{2(1/4+q^2/2-q^4/4)}}.
$$

両端は正則であるため積分は有限です。

**(5)**　$E\uparrow0$ では $r_-=\sqrt{1-\sqrt{1+4E}}\to0$。十分0に近い $E$ で $2r_-<1/2<r_+$。$E-U(q)\le q^2/2$ を使うと

$$
T_{\mathrm{well}}(E)\ge2\int_{2r_-}^{1/2}\frac{dq}{q}
=2\log\frac1{4r_-}\to\infty.
$$

$E=0$ では分離解が原点へ近づくのに無限時間を要します。途中の時刻に $(0,0)$ へ達するなら定数解の一意性と矛盾するので、一周して元に戻る周期解にはなりません。
<!-- solution-end -->

外力・減衰のないDuffing振動子では、エネルギーを一つ選ぶだけで「片側の井戸で振動する」「両側を横断する」「境界で鞍点へ近づく」が決まります。次章では、小さな摂動を受けてゆっくり変わる振幅を、時間平均によって定量化します。
