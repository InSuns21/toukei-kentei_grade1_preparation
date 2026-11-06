# SLT1-11 Lipschitz合成と線形・marginクラス

<!-- definition-example-audit: strict -->

## 1. 損失を通した後でも、複雑度を測れるか

[前章のRademacher複雑度](../SLT1-10/index.md#def-slt1-10-rademacher-complexities)は、標本点で関数値が独立符号にどれほど合わせられるかを測る。予測器 $h$ 自体ではなく損失 $\ell(h,z)$ の平均を保証したいとき、損失を合成した関数クラスの複雑度が必要になる。

例えば予測値が $0$ から $0.01$ へ変わったとき、損失もせいぜい $0.01$ しか変わらないなら、損失の合成で標本上の細かな揺らぎが突然増幅されることはないはずだ。一方、予測値が $0$ をわずかにまたぐだけで0–1誤分類損失が1跳ぶ場合、その考えは使えない。

この章では、まず「入力の差を高々 $L$ 倍にする」写像について、符号平均を比較する原理を証明する。続いて有限次元の線形予測器を直接計算し、最後に誤分類のための連続な上界（折線margin損失）へ適用する。

以下の符号 $\sigma_1,\ldots,\sigma_n$ は各々 $+1,-1$ を確率 $1/2$ で取る独立な公平符号である。標本 $S=(z_1,\ldots,z_n)$ を固定したとき、実数値関数クラス $\mathcal F$ に対する通常版の経験複雑度を

$$
\widehat{\mathfrak R}_S(\mathcal F)
=\frac1n\mathbb E_\sigma\sup_{f\in\mathcal F}
\sum_{i=1}^n\sigma_i f(z_i)
$$

と書く。前章では $[0,1]$ 値を主に扱ったが、この**固定標本上の符号平均**は実数値でも各点で一様有界なら同様に定まる。ここで使うのは絶対値を取らない通常版である。

## 2. Lipschitz条件と零点調整

まず $n=1$、二つの予測値 $0,2$ から選べる場合を考える。符号が正なら2、負なら0を選ぶので、符号平均の最大値の期待は $(2+0)/2=1$ となる。値を $[-1,1]$ に切り詰めると、正符号で得られる最大値は1に下がる。入力差を広げない合成が複雑度を増やさない、という形を一般化しよう。

写像 $\psi:\mathbb R\to\mathbb R$ が **$L$-Lipschitz** であるとは、二つの入力の差が出力で高々 $L$ 倍になることをいう。$\psi(0)$ を引く操作を**零点調整**と呼ぶ。これは後で符号付き和の定数項を取り除くために使う。

<a id="def-slt1-11-lipschitz-centering"></a>

<!-- formal-statement-start -->
> **定義（Lipschitz変換と零点調整）**
> $L\ge0$ とし、実数値関数 $\psi:\mathbb R\to\mathbb R$ が全ての $s,t\in\mathbb R$ に対し
>
$$
|\psi(s)-\psi(t)|\le L|s-t|
$$
>
> を満たすとき、$\psi$ を $L$-Lipschitzと呼ぶ。$\psi^\circ(t)=\psi(t)-\psi(0)$ を $\psi$ の零点調整と呼ぶ。このとき $\psi^\circ(0)=0$ で、$\psi^\circ$ も $L$-Lipschitzである。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-11-lipschitz-centering -->
**定義の確認**。$\psi(t)=\max(-1,\min(1,t))$ は数直線の各入力を区間 $[-1,1]$ へ切り詰める。$s<t$ について、区間内では出力差は $t-s$、区間外に出た部分では出力が一定なので差は増えない。境界をまたぐときも区間内の長さは $t-s$ 以下だから $|\psi(s)-\psi(t)|\le|s-t|$。$\psi(0)=0$ も確かめられる。

前節の二関数の値 $0,2$ は合成後 $0,1$ となり、$n=1$ の経験複雑度は $(1+0)/2=1/2\le1$。入力差が2、出力差が1であることも直接確認できる。別の例 $\psi(t)=t+3$ は1-Lipschitzだが $\psi(0)=3$ であり、零点調整をすると $\psi^\circ(t)=t$ となる。
<!-- definition-example-end -->

## 3. 符号平均の合成評価を一座標の比較から証明する

標本点ごとに異なる写像 $\psi_i$ を使っても、全てのLipschitz定数が同じ $L$ 以下ならよい。予測器の合成後の値を $\psi_i(f(z_i))$ と置き、元の符号平均と比較する。

<a id="thm-slt1-11-contraction"></a>

<!-- formal-statement-start -->
> **定理（符号平均のcontraction不等式）**
> $n\ge1$、固定された点 $z_1,\ldots,z_n$、非空の有限または可算な実数値関数クラス $\mathcal F$ を取る。各 $i$ で $\sup_{f\in\mathcal F}|f(z_i)|<\infty$ とする。$\psi_i:\mathbb R\to\mathbb R$ は $\psi_i(0)=0$ を満たす $L$-Lipschitz写像（共通の $L\ge0$）とする。このとき
>
$$
\frac1n\mathbb E_\sigma\sup_{f\in\mathcal F}
\sum_{i=1}^n\sigma_i\psi_i(f(z_i))
\le L\widehat{\mathfrak R}_S(\mathcal F).
$$
>
> 左辺の写像は各標本座標に作用する。絶対値版の複雑度を、右辺の通常版だけで同じ形に抑える主張ではない。
<!-- formal-statement-end -->

### 証明の見取り図

一つの符号 $\sigma_i$ だけを平均すると、正符号用と負符号用に二つの関数 $f,g$ を選ぶ形になる。両者の出力差をLipschitz条件で入力差に戻し、座標を一つずつ置き換える。全ての座標を置き換えれば目的の不等式になる。

<!-- proof-start -->
### 証明

まず $\mathcal F$ が有限とする。ある座標 $i$ 以外の符号を固定し、それらの寄与を $a_f\in\mathbb R$ と書く。$u_f=f(z_i)$、$v_f=\psi_i(f(z_i))$ とおく。符号が公平なので

$$
\begin{aligned}
&\mathbb E_{\sigma_i}\sup_f(a_f+\sigma_i v_f)\\
&=\frac12\left\{\sup_f(a_f+v_f)+\sup_g(a_g-v_g)\right\}\\
&=\frac12\sup_{f,g}\{a_f+a_g+v_f-v_g\}.
\end{aligned}
$$

最後の等号は二つの有限な上限について、独立に $f$ と $g$ を選べるためである。[Lipschitz条件](#def-slt1-11-lipschitz-centering)を $s=u_f,t=u_g$ に適用すると

$$
v_f-v_g\le|v_f-v_g|\le L|u_f-u_g|
=\max\{L(u_f-u_g),L(u_g-u_f)\}.
$$

したがって

$$
\begin{aligned}
&\sup_{f,g}(a_f+a_g+v_f-v_g)\\
&\le\max\bigl\{
\sup_{f,g}(a_f+a_g+Lu_f-Lu_g),\\
&\hspace{56pt}\sup_{f,g}(a_f+a_g-Lu_f+Lu_g)
\bigr\}.
\end{aligned}
$$

第二項は $f$ と $g$ を入れ替えると第一項と等しい。ゆえに右辺は

$$
\sup_f(a_f+Lu_f)+\sup_g(a_g-Lu_g)
=2\mathbb E_{\sigma_i}\sup_f(a_f+L\sigma_i u_f).
$$

従って、一座標について

$$
\mathbb E_{\sigma_i}\sup_f(a_f+\sigma_i\psi_i(f(z_i)))
\le\mathbb E_{\sigma_i}\sup_f(a_f+L\sigma_i f(z_i)).
$$

他座標の寄与 $a_f$ は任意だったから、まず第1座標を元の線形値へ変え、残りをそのままにして期待値を取る。次に第2座標を変え、これを第 $n$ 座標まで繰り返すと

$$
\mathbb E_\sigma\sup_f\sum_i\sigma_i\psi_i(f(z_i))
\le\mathbb E_\sigma\sup_f\sum_i L\sigma_i f(z_i).
$$

$L\ge0$ を上限の外へ出し、$n$ で割ると結論を得る。$L=0$ の場合にも両辺の符号平均は0である。

可算 $\mathcal F=\{f_1,f_2,\ldots\}$ の場合は、先頭 $m$ 個について同じ一座標比較を順に行う。各座標で関数値が一様有界で、$\psi_i(0)=0$ とLipschitz条件により合成値も一様有界だから、符号ごとの上限は有限な共通定数で抑えられる。有限部分集合の上限は $m$ とともに単調増加して全クラスの上限へ収束する。従って有界収束で符号平均にも極限を通せる。
<!-- proof-end -->

**零点がずれている場合。** 上の証明の一座標比較自体は定数を要求しないが、零点調整で規格化しておくと合成値の一様有界性を確保しやすい。任意のLipschitz写像 $\phi_i$ について $\psi_i(t)=\phi_i(t)-\phi_i(0)$ とおけば

$$
\begin{aligned}
&\mathbb E_\sigma\sup_f\frac1n\sum_i\sigma_i\phi_i(f(z_i))\\
&=\mathbb E_\sigma\sup_f\frac1n\sum_i\sigma_i\psi_i(f(z_i))
+\underbrace{\frac1n\sum_i\mathbb E_\sigma\sigma_i\,\phi_i(0)}_{=0}.
\end{aligned}
$$

従って、**通常版**の期待符号平均では零点の値を引いても結果は変わらない。しかし絶対値を上限の内側に置いた場合、定数項を期待値の外へ出せない。例えば $n=1$、$\mathcal F=\{0\}$、$\phi(t)=t+2$ では元の通常版は0で、合成後の絶対値版は2となる。

## 4. 線形予測器には複雑度の正確な式がある

次は合成前の複雑度を見積もる。入力 $x\in\mathbb R^d$、重み $w\in\mathbb R^d$ とし、$\langle w,x\rangle=\sum_{j=1}^d w_jx_j$ を予測値とする。重みのEuclidノルム $\|w\|_2=(\sum_jw_j^2)^{1/2}$ を $B$ 以下に制限する。これは予測器の係数を際限なく大きくして、符号に合わせる行為を防ぐための条件である。

<a id="def-slt1-11-linear-class"></a>

<!-- formal-statement-start -->
> **定義（ノルム制約付き線形予測器クラス）**
> $d\ge1$、$B>0$ を固定する。入力空間を $\mathbb R^d$ としたとき、
>
$$
\mathcal H_B=\{h_w:x\mapsto\langle w,x\rangle:
w\in\mathbb R^d,\ \|w\|_2\le B\}
$$
>
> を半径 $B$ のノルム制約付き線形予測器クラスという。標本点 $x_1,\ldots,x_n$ が固定されたときは、実数値クラスとしての符号平均を考える。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-11-linear-class -->
**定義の確認**。$d=1,B=2$ なら重みは $-2\le w\le2$ であり、入力 $x=1,-1$ への出力はそれぞれ $w,-w$ となる。例えば $w=3/2$ は $|w|=3/2\le2$ だからクラスに属し、$w=3$ は属さない。標本 $(1,-1)$ の符号付き平均を定義から展開すると

$$
\frac12\{\sigma_1h_w(1)+\sigma_2h_w(-1)\}
=\frac w2(\sigma_1-\sigma_2).
$$

$w$ を符号の後で選ぶと、$\sigma_1-\sigma_2>0$ なら $w=2$、負なら $w=-2$、零なら $w=0$ と取ればよい。いずれも $|w|\le2$ を満たすので

$$
\sup_{|w|\le2}\frac w2(\sigma_1-\sigma_2)
=|\sigma_1-\sigma_2|.
$$

四符号の平均は $(0+2+2+0)/4=1$ である。
<!-- definition-example-end -->

<a id="prop-slt1-11-linear-rademacher"></a>

<!-- formal-statement-start -->
> **命題（線形クラスの経験Rademacher複雑度）**
> $d,n\ge1$、$B>0$、固定入力 $S=(x_1,\ldots,x_n)\in(\mathbb R^d)^n$ とする。このとき
>
$$
\widehat{\mathfrak R}_S(\mathcal H_B)
=\frac Bn\mathbb E_\sigma
\left\|\sum_{i=1}^n\sigma_i x_i\right\|_2
\le\frac Bn\sqrt{\sum_{i=1}^n\|x_i\|_2^2}.
$$
>
> 特に各 $\|x_i\|_2\le R$ なら $\widehat{\mathfrak R}_S(\mathcal H_B)\le BR/\sqrt n$ である。右辺は次元 $d$ を明示的に含まないが、ノルム制約が本質である。
<!-- formal-statement-end -->

### 証明の見取り図

符号列を固定すると、最適な重みは符号付き入力和と同じ向きを向く。Euclidノルムの二乗を展開して符号で平均すれば、異なる標本点どうしの交差項は消える。

<!-- proof-start -->
### 証明

$V_\sigma=\sum_i\sigma_i x_i$ とおく。重みに関する[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)より

$$
\langle w,V_\sigma\rangle\le\|w\|_2\|V_\sigma\|_2
\le B\|V_\sigma\|_2.
$$

$V_\sigma\ne0$ なら $w=BV_\sigma/\|V_\sigma\|_2$ は $\|w\|_2=B$ で等号を達成し、$V_\sigma=0$ なら全ての内積が0である。従って符号列ごとに $\sup_{\|w\|\le B}\sum_i\sigma_i\langle w,x_i\rangle=B\|V_\sigma\|_2$ となり、第一の等号が出る。

平方根の凹性（または[Cauchy–Schwarz不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-cauchy-schwarz)）から $\mathbb E_\sigma\|V_\sigma\|_2\le\sqrt{\mathbb E_\sigma\|V_\sigma\|_2^2}$。二乗の内積を展開すると

$$
\begin{aligned}
\mathbb E_\sigma\|V_\sigma\|_2^2
&=\sum_{i,j=1}^n\mathbb E_\sigma(\sigma_i\sigma_j)
\langle x_i,x_j\rangle\\
&=\sum_{i=1}^n\langle x_i,x_i\rangle
=\sum_{i=1}^n\|x_i\|_2^2.
\end{aligned}
$$

異なる $i\ne j$ では独立性と $\mathbb E\sigma_i=0$ により交差項が0、同じ $i=j$ では $\sigma_i^2=1$ だからである。これを第一式へ代入する。さらに $\sum_i\|x_i\|_2^2\le nR^2$ を使えば最後の上界を得る。
<!-- proof-end -->

**同じノルムでも標本配置で値は変わる。** $d=2,n=2,B=1$ とし、$e_1=(1,0)$、$e_2=(0,1)$ を $\mathbb R^2$ の標準基底とする（一般の $\mathbb R^d$ でも $e_i$ は第 $i$ 成分だけが1のベクトル）。内積が0で、どちらのノルムも1だから、直交組 $(x_1,x_2)=(e_1,e_2)$ では

$$
\|\sigma_1e_1+\sigma_2e_2\|_2^2
=\sigma_1^2+\sigma_2^2=2,
\qquad
\widehat{\mathfrak R}_S(\mathcal H_1)=\frac{\sqrt2}{2}.
$$

一方、重複組 $(x_1,x_2)=(e_1,e_1)$ では $\sigma_1+\sigma_2$ が $2,0,0,-2$ を取るから、期待ノルムは1、経験複雑度は $1/2$ である。どちらも上界 $1/\sqrt2$ を満たすが、直交組だけ等号となる。

ここまでの線形クラスは連続個の重みを含む。有限標本の上限は上記の連続な内積で正確に計算できる。次節の確率上界へ進むときは、閉球 $W_B=\{w\in\mathbb R^d:\|w\|_2\le B\}$ の中の**可算稠密な重み集合**を先に使う。有理数全体を $\mathbb Q$ と書き、$W_0=W_B\cap\mathbb Q^d$ と置く。$\mathbb Q^d$ は可算で、閉球内部の点は有理座標で近似できる。境界 $\|w\|_2=B$ の点も、いったん $(1-1/k)w$（$k\ge2$）として内部へ移し、その点を閉球内の有理座標で近似すればよい。最後に連続性で全重みへ拡張する。非可算クラスを無条件で前章の可算クラスの定理へ代入しないためである。

## 5. 誤分類をLipschitzなmargin損失で挟む

二値分類では入力 $X\in\mathbb R^d$、正解ラベル $Y\in\{-1,+1\}$ を考える。$Y\langle w,X\rangle>0$ は正しい向きへの分類を表すが、その値が $0$ に近ければわずかな揺らぎで誤る。そこでこの積を **margin（余裕）** と呼ぶ。0–1損失 $\boldsymbol1_{\{Y\langle w,X\rangle\le0\}}$ は0のところで跳ぶため、直接[contraction不等式](#thm-slt1-11-contraction)へ入れられない。

正しい側へ $\gamma>0$ 以上離れた予測には0、誤分類には1、その中間を直線でつなぐ関数 $\phi_\gamma$ を用意する。この構成なら実際の誤分類を上から抑え、かつLipschitz定数を $1/\gamma$ と計算できる。

<a id="def-slt1-11-ramp-margin"></a>

<!-- formal-statement-start -->
> **定義（marginと折線margin損失）**
> $d\ge1$、$w,x\in\mathbb R^d$、$y\in\{-1,+1\}$、$\gamma>0$ とする。$m_w(x,y)=y\langle w,x\rangle$ を（符号付き）marginと呼ぶ。**折線margin損失**を
>
$$
\phi_\gamma(t)=
\begin{cases}
1,&t\le0,\\
1-t/\gamma,&0<t<\gamma,\\
0,&t\ge\gamma
\end{cases}
$$
>
> と定め、予測器の損失は $\ell_{w,\gamma}(x,y)=\phi_\gamma(m_w(x,y))$ とする。
<!-- formal-statement-end -->

<!-- definition-example-start: def-slt1-11-ramp-margin -->
**定義の確認**。$d=1,w=1,x=1$ のとき、正解が $y=+1$ ならmarginは1、$y=-1$ ならmarginは $-1$ である。$\gamma=2$ なら前者の損失は $1-1/2=1/2$、後者は1になる。境界 $t=0,2$ では両側の式がそれぞれ1、0で一致する。

損失値は全域で $[0,1]$ に入り、三領域での傾きは $0,-1/\gamma,0$ である。区間をまたぐ場合も境界で分割して増分を足せば

$$
|\phi_\gamma(s)-\phi_\gamma(t)|\le\frac1\gamma|s-t|
$$

を得る。零点の値は $\phi_\gamma(0)=1$ であり、[contraction不等式](#thm-slt1-11-contraction)に入力するのは $\phi_\gamma^\circ(t)=\phi_\gamma(t)-1$ である。
<!-- definition-example-end -->

全ての実数 $t$ について

$$
\boldsymbol1_{\{t\le0\}}\le\phi_\gamma(t)
\le\boldsymbol1_{\{t\le\gamma\}}.
$$

左側は誤分類のとき両辺1、それ以外は左辺0なので成り立つ。右側は $t>\gamma$ なら両辺0、$t\le\gamma$ なら損失が1以下なので成り立つ。この**二つの片側比較**によって、母集団の誤分類確率を折線損失の期待値で抑え、その経験平均を「marginが $\gamma$ 以下の訓練例」の割合で抑えることができる。

## 6. contraction不等式から同時margin汎化界へ

確率分布 $P$ が、ラベル $Y\in\{-1,+1\}$ と入力 $\|X\|_2\le R$ を満たすとする。重み半径 $B$ とmargin閾値 $\gamma$ は**標本を見る前に固定**する。ここでは訓練後に重み $w$ を選んでも成立する、全ての $w$ に同時の不等式を証明する。

<a id="thm-slt1-11-margin-bound"></a>

<!-- formal-statement-start -->
> **定理（ノルム制約付き線形分類器のmargin汎化界）**
> $d,n\ge1$、$B,R,\gamma>0$、$0<\delta<1$ とする。$(X_i,Y_i)_{i=1}^n$ は分布 $P$ からの独立同分布標本で、$X_i\in\mathbb R^d$、$\|X_i\|_2\le R$、$Y_i\in\{-1,+1\}$ がほとんど確実に成立するとする。$B,R,\gamma$ とクラス $\mathcal H_B$ は標本を見る前に固定する。このとき確率 $1-\delta$ 以上で、全ての $\|w\|_2\le B$ に対し同時に
>
$$
\Pr_{(X,Y)\sim P}\{Y\langle w,X\rangle\le0\}
\le\frac1n\sum_{i=1}^n
\boldsymbol1_{\{Y_i\langle w,X_i\rangle\le\gamma\}}
+\frac{2BR}{\gamma\sqrt n}
+\sqrt{\frac{\log(1/\delta)}{2n}}.
$$
>
> 閾値ちょうど0の分類は誤りに含める。$w$ は同時事象が成立した後に訓練データを見て選んでよいが、$\gamma$ を標本後に自由に最適化しても同じ確率保証になる、とは主張していない。
<!-- formal-statement-end -->

### 証明の見取り図

まず折線損失クラスの経験Rademacher複雑度を、[contraction不等式](#thm-slt1-11-contraction)と[線形クラスの命題](#prop-slt1-11-linear-rademacher)で $BR/(\gamma\sqrt n)$ 以下にする。次に[前章の対称化](../SLT1-10/index.md#thm-slt1-10-symmetrization)と有界差分集中で、折線損失の母集団・経験平均を一方向に比較する。最後に誤分類指示関数を上下から挟む。

<!-- proof-start -->
### 証明

前節で構成した閉球 $W_B$ 内の可算稠密集合 $W_0=W_B\cap\mathbb Q^d$ を使う。$0\in W_0$ であり、$B$ は標本前に固定されている。$w\in W_0$ に対し $f_w(x,y)=\phi_\gamma(y\langle w,x\rangle)$ と置く。$f_w$ は $[0,1]$ 値、可測で、クラス $\mathcal F_0=\{f_w:w\in W_0\}$ は標本前に固定されている。

任意の固定標本 $S=((x_i,y_i))_{i=1}^n$ について、$t_i(w)=y_i\langle w,x_i\rangle$ とおく。[$\phi_\gamma$ の零点調整](#def-slt1-11-ramp-margin)により $\psi_i(t)=\phi_\gamma(t)-1$ は $\psi_i(0)=0$、$1/\gamma$-Lipschitzである。符号の期待値を取ると定数項は0なので、[contraction不等式](#thm-slt1-11-contraction)を $t_i(w)$ に適用して

$$
\begin{aligned}
\widehat{\mathfrak R}_S(\mathcal F_0)
&=\frac1n\mathbb E_\sigma\sup_{w\in W_0}
\sum_i\sigma_i\psi_i(t_i(w))\\
&\le\frac1{\gamma n}\mathbb E_\sigma\sup_{w\in W_0}
\sum_i\sigma_i\langle w,y_ix_i\rangle\\
&\le\frac B{\gamma n}\sqrt{\sum_i\|y_ix_i\|_2^2}
\le\frac{BR}{\gamma\sqrt n}.
\end{aligned}
$$

最後の行は[線形クラスの経験複雑度](#prop-slt1-11-linear-rademacher)を $y_ix_i$ に適用したもので、$|y_i|=1$ より $\|y_ix_i\|_2=\|x_i\|_2\le R$ を確かめている。

$D_+(S)=\sup_{w\in W_0}(Pf_w-P_nf_w)$ と置く。標本の第 $i$ 座標だけを取り替えると、各 $P_nf_w$ は高々 $1/n$ 変化する（$0\le f_w\le1$）。従って上限を取った $D_+$ も高々 $1/n$ しか変化しない。対称化の[一方向の評価](../SLT1-10/index.md#thm-slt1-10-symmetrization)から

$$
\mathbb E_SD_+(S)
\le2\mathbb E_S\widehat{\mathfrak R}_S(\mathcal F_0)
\le\frac{2BR}{\gamma\sqrt n}.
$$

独立座標の有界差分幅 $c_i=1/n$ を[McDiarmid不等式](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)に入力すると、$\sum_i c_i^2=1/n$ だから、$u=\sqrt{\log(1/\delta)/(2n)}$ に対して

$$
\Pr\{D_+(S)>\mathbb ED_+(S)+u\}
\le e^{-2nu^2}=\delta.
$$

よって確率 $1-\delta$ 以上で全 $w\in W_0$ に同時に

$$
Pf_w\le P_nf_w+\frac{2BR}{\gamma\sqrt n}
+\sqrt{\frac{\log(1/\delta)}{2n}}.
$$

この不等式を $W_B$ 全体に拡張する。任意の $w\in W_B$ に $w_k\in W_0$ で $w_k\to w$ を取ると、$|\phi_\gamma(y\langle w_k,x\rangle)-\phi_\gamma(y\langle w,x\rangle)|\le (R/\gamma)\|w_k-w\|_2$ が $P$-ほとんど確実に成り立つ。従って母集団期待値はその上界によって連続で、固定標本の経験平均も連続である。$k\to\infty$ として全 $w\in W_B$ に同じ不等式を得る。確率事象は最初から共通である。

最後に[折線損失と誤分類指示関数の比較](#def-slt1-11-ramp-margin)を各 $w$ に適用すると

$$
\begin{aligned}
\Pr\{Y\langle w,X\rangle\le0\}
&\le Pf_w\\
&\le P_nf_w+\frac{2BR}{\gamma\sqrt n}+u\\
&\le\frac1n\sum_i\boldsymbol1_{\{Y_i\langle w,X_i\rangle\le\gamma\}}
+\frac{2BR}{\gamma\sqrt n}+u.
\end{aligned}
$$

これが主張である。
<!-- proof-end -->

**数値で見てみる。** $n=100$、$B=R=1$、$\gamma=1/2$、$\delta=0.05$ とする。訓練点のうちmarginが $1/2$ 以下のものが2個なら、定理は同じ高確率事象上で

$$
\Pr\{Y\langle w,X\rangle\le0\}
\le0.02+\frac{2}{(1/2)\sqrt{100}}
+\sqrt{\frac{\log20}{200}}
\approx0.02+0.4+0.1224=0.5424.
$$

これは観測されたmargin数が2になるような $w$ が訓練データから選ばれても使える。右辺が1を超える設定では保証は真でも情報量が少ない。標本数だけでなく、$B$、$R$ と $\gamma$ の比が重要である。

## 7. 仮定を外すと何が壊れるか

- **Lipschitz性を失う。** $\boldsymbol1_{\{t\le0\}}$ は $t=-\varepsilon$ と $t=\varepsilon$ で出力差1、入力差 $2\varepsilon$ となり、どんな固定 $L$ についても $\varepsilon\to0$ で条件に違反する。[contraction不等式](#thm-slt1-11-contraction)の一座標比較ができなくなる。
- **絶対値版を通常版と取り違える。** $n=1$、単一の零関数を定数2へ移すと通常版は0のままだが絶対値版は2になる。零点調整の定数を、絶対値の内側から消してはならない。
- **ノルム半径が増える。** $d=n$、$x_i=e_i$、$B=\sqrt n$、$R=1$ なら[線形クラスの正確な式](#prop-slt1-11-linear-rademacher)から $\widehat{\mathfrak R}=B\sqrt n/n=1$。$B$ を固定したときの $n^{-1/2}$ 減衰は消える。入力ノルム $R$ を制御しない場合も同じ計算の上界は得られない。
- **margin閾値を標本後に選ぶ。** 定理の確率事象は固定 $\gamma$ ごとに作った。観測後に無数の $\gamma$ を探索しても同じ失敗確率 $\delta$ だとは言えない。事前に固定した有限個の閾値なら、各 $\gamma$ に失敗確率 $\delta/M$ を割り当てた合併上界で同時保証を作れる。
- **固定クラス・独立標本を失う。** クラス自体を観測後に設計すると対称化の交換可能性が壊れる。[前章の標本依存反例](../SLT1-10/index.md#thm-slt1-10-symmetrization)で確認したとおり、訓練後に $w$ を選ぶのと、訓練後に制約クラスそのものを都合よく作り直すのは違う。

## 演習

**問題 SLT1-11-A01（切り詰めと符号平均）**
- Level: A

$n=1$、固定標本上の二関数の値が0と2、$\psi(t)=\max(-1,\min(1,t))$ とする。元と合成後の通常版経験Rademacher複雑度を求め、Lipschitz性を確認せよ。

<!-- solution-start -->
**詳細解答**。元の正符号時の最大値は2、負符号時には値0の関数を選ぶので0。従って $(2+0)/2=1$。合成後は値が0と1になり、同じ順序で最大値は1と0、平均は $1/2$。clip写像は各区間で傾き0または1で、境界をまたいでも増分は元の入力差以下なので1-Lipschitzであり、$\psi(0)=0$。[$L=1$ のcontraction不等式](#thm-slt1-11-contraction)が $1/2\le1$ と成立する。
<!-- solution-end -->

**問題 SLT1-11-A02（零点調整）**
- Level: A

$n=1$、標本上の関数値が0または1、$\phi(t)=t+3$ とする。$\phi^\circ$ を計算し、通常版符号平均が調整前後で一致することを四則演算で確かめよ。

<!-- solution-start -->
**詳細解答**。$\phi(0)=3$ だから $\phi^\circ(t)=\phi(t)-3=t$。元の二値の通常版は正符号で1、負符号で0を最大にできるため $1/2$。合成後の値は3と4で、正符号の最大値4、負符号の最大値 $-3$（小さい値3を選ぶ）なので平均は $(4-3)/2=1/2$。定数3の符号平均は $\mathbb E_\sigma(3\sigma)=0$ である。
<!-- solution-end -->

**問題 SLT1-11-A03（一次元線形クラスの正確な値）**
- Level: A

$d=1,B=2,n=2$、入力が $x_1=1,x_2=-1$ のとき $\widehat{\mathfrak R}_S(\mathcal H_B)$ を符号4通りから計算し、命題の上界と比較せよ。

<!-- solution-start -->
**詳細解答**。符号付き入力和は $\sigma_1-\sigma_2$ で、$++,+-,-+,--$ の順に $0,2,-2,0$。各列の重み最大化は $B|\sigma_1-\sigma_2|$ である。[線形クラスの命題](#prop-slt1-11-linear-rademacher)の等号式から $\widehat{\mathfrak R}=(2/2)(0+2+2+0)/4=1$。ノルム二乗和は $1^2+(-1)^2=2$ なので上界は $(2/2)\sqrt2=\sqrt2$。従って $1\le\sqrt2$ と一致する。
<!-- solution-end -->

**問題 SLT1-11-A04（折線損失の領域）**
- Level: A

$\gamma=2$ のとき $t=-1,0,1,2,3$ での $\phi_\gamma(t)$ と、$\boldsymbol1_{\{t\le0\}}$、$\boldsymbol1_{\{t\le\gamma\}}$ を各々書き、三者の大小を検査せよ。

<!-- solution-start -->
**詳細解答**。$t=-1,0,1,2,3$ の順に $\phi_2$ は $1,1,1/2,0,0$、左側の指示関数は $1,1,0,0,0$、右側は $1,1,1,1,0$。各位置で「左 $\le$ 損失 $\le$ 右」が成立する。特に $t=2$ では右側は1、損失は0でよく、上界は等号を意味しない。
<!-- solution-end -->

**問題 SLT1-11-A05（marginと分類判定）**
- Level: A

$d=2$、$w=(1,1)/\sqrt2$、$x=(1,0)$、$y=-1$、$\gamma=1/2$ とする。margin、折線損失、二つの指示関数を求めよ。$\|w\|_2\le1$ も検査せよ。

<!-- solution-start -->
**詳細解答**。$\|w\|_2^2=1/2+1/2=1$ なので $w\in W_1$。内積 $\langle w,x\rangle=1/\sqrt2$ に $y=-1$ を掛けると marginは $-1/\sqrt2<0$。従って $\phi_{1/2}=1$、$\boldsymbol1_{\{m\le0\}}=1$、$\boldsymbol1_{\{m\le1/2\}}=1$。全て1であり、誤分類を過小評価していない。
<!-- solution-end -->

**問題 SLT1-11-B01（一座標比較の核心）**
- Level: B

有限集合 $F$、実数列 $(a_f,u_f)_{f\in F}$、$L$-Lipschitz写像 $\psi$ に対し、独立公平符号 $\sigma$ を一つ取る。$\mathbb E_\sigma\sup_f(a_f+\sigma\psi(u_f))\le\mathbb E_\sigma\sup_f(a_f+L\sigma u_f)$ を出発点から証明せよ。

<!-- solution-start -->
**詳細解答**。左辺の2倍は $\sup_f(a_f+\psi(u_f))+\sup_g(a_g-\psi(u_g))=\sup_{f,g}(a_f+a_g+\psi(u_f)-\psi(u_g))$。Lipschitz性より最後の差は $L|u_f-u_g|$ 以下である。絶対値を $\max(L(u_f-u_g),-L(u_f-u_g))$ と書けば、$f,g$ を交換して二候補の上限は等しくなる。従って2倍した左辺は $\sup_{f,g}(a_f+a_g+L(u_f-u_g))$ 以下。これは $\sup_f(a_f+Lu_f)+\sup_g(a_g-Lu_g)$、すなわち右辺の2倍である。両辺を2で割ると結論。ここで $a_f$ は任意なので、残りの座標の符号を固定した場合にも使える。
<!-- solution-end -->

**問題 SLT1-11-B02（配置による線形複雑度の違い）**
- Level: B

$d=2,n=2,B=1$ とする。入力組 $(e_1,e_2)$ と $(e_1,e_1)$ の経験複雑度を、$\|\sigma_1x_1+\sigma_2x_2\|_2$ の四通りを列挙して計算せよ。どちらが $BR/\sqrt n$ に等しいか。

<!-- solution-start -->
**詳細解答**。直交組では、符号列がどうであれ平方ノルムは $\sigma_1^2+\sigma_2^2=2$ であり、期待ノルム $\sqrt2$。経験複雑度は $B/n$ を掛けて $\sqrt2/2$。重複組では和は $(\sigma_1+\sigma_2)e_1$ で、ノルムは順に $2,0,0,2$、期待1なので経験複雑度は $1/2$。両方とも $R=1$ だから共通上界は $1/\sqrt2=\sqrt2/2$ で、直交組だけ等号が成立する。
<!-- solution-end -->

**問題 SLT1-11-B03（絶対値版への誤った拡張）**
- Level: B

$n=1$、$\mathcal F=\{f_0\}$、$f_0(z_1)=0$、$\phi(t)=t+2$ とする。合成前後の通常版と絶対値版の経験複雑度を全て求め、どの操作が絶対値版で使えないか説明せよ。

<!-- solution-start -->
**詳細解答**。合成前の符号平均は常に0で通常版・絶対値版とも0。合成後は $\sigma_1\phi(0)=2\sigma_1$ で、通常版は $\mathbb E_\sigma2\sigma=0$、絶対値版は $\mathbb E_\sigma|2\sigma|=2$。通常版の $\mathbb E_\sigma(\sup_f(T_f+2\sigma))=\mathbb E_\sigma\sup_fT_f+\mathbb E_\sigma2\sigma$ は成立するが、絶対値版では $|T_f+2\sigma|$ から定数を外に出せない。[$\phi^\circ(t)=t$ への零点調整](#def-slt1-11-lipschitz-centering)が必要な理由を、通常版と絶対値版とで分けて理解する。
<!-- solution-end -->

**問題 SLT1-11-B04（固定marginの数値保証）**
- Level: B

$n=100,d=2,B=R=1,\gamma=1/2,\delta=0.05$ とする。各標本は $\|X_i\|_2\le1$、$Y_i\in\{-1,+1\}$ を満たし独立同分布である。観測後に選んだ $\|w\|_2\le1$ がmargin $1/2$ 以下の標本を2個持つとき、誤分類確率の保証上界を計算せよ。$\gamma$ の選択時点も説明せよ。

<!-- solution-start -->
**詳細解答**。閾値が固定されているので[margin汎化定理](#thm-slt1-11-margin-bound)の同時事象を使える。経験margin率は $2/100=0.02$、複雑度項は $2BR/(\gamma\sqrt n)=2/(0.5\cdot10)=0.4$、集中項は $\sqrt{\log20/200}\approx0.1224$。和は約 $0.5424$ で、確率0.95以上の標本事象で選んだ重みの誤分類確率を抑える。$w$ の標本後選択は同時事象の中なので許されるが、$\gamma$ は標本観測前から $1/2$ と決めておく必要がある。
<!-- solution-end -->

**問題 SLT1-11-C01（合成評価から分類汎化までの再構成）**
- Level: C

$n\ge1$、$d\ge1$、$B,R,\gamma>0$、$0<\delta<1$ を固定する。$(X_i,Y_i)\sim P$ は独立同分布、$\|X_i\|_2\le R$、$Y_i\in\{-1,+1\}$ とする。$\|w\|_2\le B$ の全ての重みで同時に成立する誤分類上界を、次の手順で導け。

1. $\phi_\gamma$ の $[0,1]$ 値性、$1/\gamma$-Lipschitz性、指示関数による上下界を証明せよ。
2. 零点調整と[contraction不等式](#thm-slt1-11-contraction)を使って、固定標本上の折線損失クラスの通常版経験複雑度を $BR/(\gamma\sqrt n)$ 以下にせよ。
3. 対称化、有界差分集中、および有限次元の稠密性から、訓練標本で重みを選んでも使える確率 $1-\delta$ の誤分類上界を導け。
4. $d=n$、$X_i=e_i$、$B=\sqrt n$（固定標本の計算）で、線形複雑度が標本数とともに消えないことを確かめ、どの仮定の実効性が失われたか述べよ。

<!-- solution-start -->
**詳細解答**。

1. $\phi_\gamma$ は $t\le0$ で1、$0<t<\gamma$ で $1-t/\gamma$、$t\ge\gamma$ で0。各領域で値域は $[0,1]$ で、境界値が一致して連続である。傾きの絶対値は最大 $1/\gamma$ なので、境界を通る区間も分割して増分を足すと $1/\gamma$-Lipschitzである。$t\le0$ では左の指示関数も1、$t>0$ では0。$t>\gamma$ では右の指示関数も損失も0、$t\le\gamma$ では右が1だから、$\boldsymbol1_{\{t\le0\}}\le\phi_\gamma(t)\le\boldsymbol1_{\{t\le\gamma\}}$。
2. 前節で構成した可算稠密部分 $W_0=W_B\cap\mathbb Q^d$ を固定し、次の損失クラスを考える。

   $$
   f_w(x,y)=\phi_\gamma(y\langle w,x\rangle),\qquad
   \mathcal F_0=\{f_w:w\in W_0\}.
   $$

   各訓練対に対して符号付きmarginと零点調整を

   $$
   v_i(w)=Y_i\langle w,X_i\rangle,\qquad
   \psi_i(t)=\phi_\gamma(t)-\phi_\gamma(0)=\phi_\gamma(t)-1
   $$

   と置く。$\psi_i(0)=0$、Lipschitz定数は $1/\gamma$ である。定数の符号平均は0だから、[符号平均のcontraction不等式](#thm-slt1-11-contraction)を適用する。続いて[線形クラスの経験Rademacher複雑度](#prop-slt1-11-linear-rademacher)を評価すると

   $$
   \begin{aligned}
   \widehat{\mathfrak R}_S(\mathcal F_0)
   &\le\frac1{\gamma n}\mathbb E_\sigma
   \sup_{w\in W_0}\left\langle w,\sum_i\sigma_iY_iX_i\right\rangle\\
   &\le\frac B{\gamma n}\sqrt{\sum_i\|Y_iX_i\|_2^2}\\
   &\le\frac{BR}{\gamma\sqrt n}.
   \end{aligned}
   $$

3. 損失関数と一方向の偏差を次のように置く。

   $$
   f_w(x,y)=\phi_\gamma(y\langle w,x\rangle),\qquad
   D_+(S)=\sup_{w\in W_0}(Pf_w-P_nf_w).
   $$

   $W_0$ は標本と独立で、$0\le f_w\le1$ なので、[対称化](../SLT1-10/index.md#thm-slt1-10-symmetrization)と小問2の計算により $\mathbb ED_+\le2BR/(\gamma\sqrt n)$。一標本交換による上限の変化は高々 $1/n$ である。

   そこで[McDiarmid不等式](../../../解析系/HDP/HDP4/index.md#thm-hdp4-mcdiarmid)に幅の二乗和 $\sum c_i^2=1/n$ を代入すると、確率 $1-\delta$ 以上で

   $$
   D_+(S)\le\frac{2BR}{\gamma\sqrt n}
   +\sqrt{\frac{\log(1/\delta)}{2n}}
   $$

   を得る。重みに関して $f_w$ は $R/\gamma$-Lipschitzだから、標本平均・母集団平均も連続である。稠密性で全ての $\|w\|\le B$ に拡張し、第1問の上下界を両端に挿入して

   $$
   \Pr\{Y\langle w,X\rangle\le0\}
   \le\frac1n\sum_i\boldsymbol1_{\{Y_i\langle w,X_i\rangle\le\gamma\}}
   +\frac{2BR}{\gamma\sqrt n}
   +\sqrt{\frac{\log(1/\delta)}{2n}}.
   $$

   同時事象なので $w$ の選択は標本依存でもよい。$\gamma$ は事前固定であり、後から自由に最適化した$\gamma$に同じ保証を直接流用できない。
4. $X_i=e_i$ なら、どの符号列でも $\|\sum_i\sigma_ie_i\|_2=\sqrt n$。[$B=\sqrt n$ の線形命題](#prop-slt1-11-linear-rademacher)より経験複雑度は $(\sqrt n/n)\sqrt n=1$。入力ノルムは $R=1$ に保たれているが、重み半径 $B$ が $n$ とともに増えて固定複雑度の仮定が弱まり、$BR/\sqrt n=1$ は0へ近づかない。これは直ちに誤分類リスクが大きいとの主張ではなく、**この複雑度上界が小さくなる保証を失う**という計算である。
<!-- solution-end -->

## まとめ

Lipschitz損失を合成しても、通常版Rademacher複雑度はLipschitz定数倍を超えない。零点調整は符号平均で定数を消す仕組みを明確にし、絶対値版と混同しないためにも必要となる。線形クラスならノルム制約から $BR/\sqrt n$ が出て、折線margin損失の $1/\gamma$ を掛ければ、訓練後に選ぶ重みまで含む誤分類保証を得られる。次章では、標準的な $n^{-1/2}$ 型より速い率が出るために必要な追加条件を調べる。
