# SYZ1-02 Lagrangeグラフとその局所変形

<!-- definition-example-audit: strict -->

## 1. トーラスを双対にする前に、Lagrange部分多様体をどう動かすか

前講では[平坦局所系と文字の分類](../SYZ1-01/index.md#thm-syz1-01-holonomy-classification)を使って、固定したトーラス上の局所系を動かした。鏡像のもう一方の入力は、**トーラス自身の変形**である。そこで、まず複雑なCalabi–Yau多様体ではなく、滑らかな多様体 $Q$ の余接束 $T^*Q$ の零切断を動かしてみよう。

[余接束の正準1形式](../../SYM/SYM3/index.md#def-sym3-tautological-form)を $\theta$ とし、正準シンプレクティック形式を

$$
\theta=\sum_{i=1}^n p_i\,dq^i,\qquad
\omega_{\mathrm{can}}=-d\theta=\sum_{i=1}^n dq^i\wedge dp_i
$$

と固定する。$Q$ は境界なしの滑らかな実 $n$ 次元多様体とし、この講義では断らない限り全ての関数・形式を滑らかとする。

[SYM6のLagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)では、$T^*Q$ の実次元 $2n$ に対して $n$ 次元であり、かつ $\omega_{\mathrm{can}}$ の制限が零であることを要求した。座標 $(q,p)$ で $p=0$ と書ける零切断を、$p=a(q)$ へ移動する。この変形がLagrange性を保つ条件を、基点 $q$ で調べる。

ここで「グラフになる」という仮定は重要である。一般のLagrange部分多様体が、選んだ射影 $T^*Q\to Q$ に関するグラフだとは限らない。

## 2. グラフの埋め込みと2形式の引き戻し

$Q$ 上の1形式を

$$
\alpha=\sum_{i=1}^n a_i(q)\,dq^i
$$

と局所表示する。ここで $q=(q^1,\ldots,q^n)$ は基点座標、$p=(p_1,\ldots,p_n)$ は対応する余接ファイバー座標で、$a(q)=(a_1(q),\ldots,a_n(q))$ は1形式の係数列を表す。$\partial_j$ は基点座標 $q^j$ による偏微分 $\partial/\partial q^j$ の略記とする。各 $q$ に余ベクトル $\alpha_q$ を載せる写像とその像を

$$
s_\alpha(q)=(q,a(q)),\qquad \Gamma_\alpha=s_\alpha(Q)
$$

と書く。射影 $\pi:T^*Q\to Q$ は $(q,p)$ を $q$ に戻すので、$\pi\circ s_\alpha=\operatorname{id}_Q$ である。

**なぜこれが部分多様体か。** 接ベクトル $v=\sum_jv^j\partial_{q^j}\in T_qQ$ を動かすと、係数関数 $a_i$ の連鎖律から

$$
\begin{aligned}
ds_{\alpha,q}(v)
&=\left(v,\left(\sum_j\partial_j a_i(q)v^j\right)_{i=1}^n\right)\\
&=(v,Da(q)v),\qquad (Da(q))_{ij}=\partial_j a_i(q).
\end{aligned}
$$

この $Da(q)$ は抽象的なLagrange判定を代替する新しい行列ではなく、**係数写像 $a$ のJacobian（行番号 $i$、列番号 $j$）** である。

第1成分は $v$ なので $ds_{\alpha,q}$ は単射であり、像への逆写像は連続な $\pi|_{\Gamma_\alpha}$ である。したがって $s_\alpha$ は埋め込みで、$\Gamma_\alpha$ の次元は $n$ となる。

後で $Da$ の対称性を検査するのは、[Lagrange部分多様体の定義](../../SYM/SYM6/index.md#def-sym6-lagrangian-submanifold)の残りの条件 $s_\alpha^*\omega_{\mathrm{can}}=0$ を調べるためである。

[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)によれば、像がLagrangeであることと $d\alpha=0$ は同値である。ここでは後続の変形計算のために、判定の中身を成分で再確認する。$p_i\circ s_\alpha=a_i$ なので、[外微分と引き戻しの可換性](../../GEO/GEO7/index.md#thm-geo7-pullback-commutes-d)を適用して

$$
s_\alpha^*(dp_i)=d(p_i\circ s_\alpha)=da_i
=\sum_j(\partial_j a_i)\,dq^j.
$$

さらに外積への引き戻しを各項に施すと

$$
\begin{aligned}
s_\alpha^*\omega_{\mathrm{can}}
&=\sum_{i,j}(\partial_j a_i)\,dq^i\wedge dq^j\\
&=\sum_{i<j}(\partial_j a_i-\partial_i a_j)\,dq^i\wedge dq^j,\\
d\alpha&=\sum_{i<j}(\partial_i a_j-\partial_j a_i)\,dq^i\wedge dq^j.
\end{aligned}
$$

つまり $s_\alpha^*\omega_{\mathrm{can}}=-d\alpha$ であり、グラフのLagrange性は

$$
\partial_i a_j=\partial_j a_i\quad(1\le i<j\le n)
$$

という**傾き行列の対称性**で判定できる。この対称性は任意の行列に自動的に成立するのではなく、2形式が消えることを各座標対で言い直したものである。

### 直接計算：対称性を満たす場合と壊す場合

$Q=\mathbb R^2$、座標 $(x,y)$ で $\alpha=y\,dx+x\,dy$ とする。$s_\alpha(x,y)=(x,y,y,x)$ なので、接ベクトルは $v_x=(1,0,0,1)$ と $v_y=(0,1,1,0)$ となる。標準形式への代入は

$$
\omega_{\mathrm{can}}(v_x,v_y)=
(dx\wedge dp_x)(v_x,v_y)+(dy\wedge dp_y)(v_x,v_y)=1-1=0.
$$

同時に $d\alpha=dy\wedge dx+dx\wedge dy=0$ であり、次元2・埋め込み性・2形式の消滅を全て確認した。一方 $\widetilde\alpha=x\,dy$ なら $d\widetilde\alpha=dx\wedge dy\ne0$ であり、グラフの次元が半分でもLagrangeではない。

## 3. 局所的に「一つの関数の微分」で書ける理由

[閉形式の局所原始関数の構成](../../GEO/GEO9/index.md#thm-geo9-poincare-lemma)から、閉じた1形式は小さい座標近傍では関数の微分になる。単に存在を引用するだけでなく、その関数を手で作る。座標球を原点中心に取り直した、原点を含む星形開集合 $U\subset\mathbb R^n$ で議論する。「星形」とは $q\in U$ と $0\le t\le1$ に対して $tq\in U$ であることをいう。

<a id="def-syz1-02-local-graph-potential"></a>

<!-- formal-statement-start -->
> **定義（グラフの局所ポテンシャル）**  
> $Q$ の開集合 $U$ 上の1形式 $\alpha$ に対し、滑らかな実数値関数 $f:U\to\mathbb R$ が $\alpha|_U=df$ を満たすとき、$f$ をグラフ $\Gamma_{\alpha|_U}$ の**局所ポテンシャル**と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-02-local-graph-potential -->
### 直接例：交差項をもつグラフ

**定義の確認**：以下では実際に $df=\alpha$ と閉性の両方を計算し、局所ポテンシャルの条件を確かめる。

$U=\mathbb R^2$、$\alpha=(2x+y)\,dx+(x+4y)\,dy$ とする。$f=x^2+xy+2y^2$ を選ぶと

$$
\partial_x f=2x+y,\qquad\partial_y f=x+4y,\qquad df=\alpha.
$$

また $\partial_y(2x+y)=1=\partial_x(x+4y)$ で閉性を確認できる。従って $f$ は定義の等式を満たすポテンシャルであり、グラフはLagrangeである。$f$ に定数を足しても $df$ は変わらない。
<!-- definition-example-end -->

<a id="prop-syz1-02-radial-potential"></a>

<!-- formal-statement-start -->
> **命題（星形領域でのポテンシャルの構成）**  
> $U\subset\mathbb R^n$ を原点を含む星形開集合とし、$\alpha=\sum_i a_i(q)dq^i$ を $U$ 上の滑らかな閉1形式とする。関数

$$
f(q)=\int_0^1\sum_{i=1}^n q^i a_i(tq)\,dt
$$

> は $df=\alpha$ を満たす。特に $\Gamma_\alpha$ は $U$ 上で $\Gamma_{df}$ と表示できる。
<!-- formal-statement-end -->

### 証明の見取り図

積分の中の $q^i$ と $a_i(tq)$ の両方を微分する。閉性 $\partial_j a_i=\partial_i a_j$ によって、被積分関数が $t a_j(tq)$ の $t$ 微分になる。

<!-- proof-start -->
### 証明

$t\in[0,1]$ と $q\in U$ の線分は $U$ に含まれるので積分は定義される。各 $q$ の近傍で滑らかな被積分関数を有限区間で積分しているため、$q^j$ に関して微分できる。積の微分と連鎖律より

$$
\begin{aligned}
\partial_j f(q)
&=\int_0^1\left[
a_j(tq)+t\sum_i q^i\partial_j a_i(tq)
\right]dt\\
&=\int_0^1\left[
a_j(tq)+t\sum_i q^i\partial_i a_j(tq)
\right]dt\\
&=\int_0^1\frac{d}{dt}\bigl(t a_j(tq)\bigr)dt\\
&=[t a_j(tq)]_{t=0}^{t=1}=a_j(q).
\end{aligned}
$$

2行目で閉性を使った。$t=0$ の端点は $a_j(0)$ が有限なので零となる。全ての $j$ で $\partial_j f=a_j$ であり $df=\alpha$。
<!-- proof-end -->

**局所と大域の違い。** 閉1形式のポテンシャルは座標球ごとにはある。しかし重なる球での二つのポテンシャルは、連結した重なり上で定数だけずれうる。これらの定数を大域的に整合させられるとは限らない。次に、この差が変形にどう現れるかを調べる。

## 4. Lagrangeグラフの時間依存変形

変形とは、グラフが時間 $t$ とともに動くことである。$I\subset\mathbb R$ を $0$ を含む開区間とし、$(t,q)$ に滑らかに依存する1形式 $\alpha_t$ を取る。各時刻のグラフを $L_t=\Gamma_{\alpha_t}$ とし、$\alpha_0=0$ とすれば零切断からの変形になる。

以後 $\alpha_t$ の添字 $t$ は**時刻によって変わる族**を表し、微分の添字ではない。基点 $q$ と座標1形式 $dq^i$ を固定した時間微分は

$$
\alpha_t=\sum_i a_i(t,q)\,dq^i,\qquad
\partial_t\alpha_t=\sum_i\frac{\partial a_i}{\partial t}(t,q)\,dq^i
$$

である。一方 $d\alpha_t$ は時刻 $t$ を固定して **$q$ 方向に外微分**するので、$dt$ を含まない。両者が交換できるのは係数 $a_i$ の滑らかさにより混合偏微分が交換できるからである。

<a id="def-syz1-02-graph-deformation"></a>

<!-- formal-statement-start -->
> **定義（Lagrangeグラフ変形）**  
> $Q$ を滑らかな多様体、$I$ を実数の開区間、$\alpha_t$ を $Q$ 上の滑らかな1形式の族とする。
> 余接束 $T^*Q$ には正準形式 $\omega_{\mathrm{can}}=-d\theta$ を入れる。
> グラフ $L_t=\Gamma_{\alpha_t}$ が全ての $t\in I$ でLagrangeなら、この族を **Lagrangeグラフ変形** と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-syz1-02-graph-deformation -->
### 直接例：閉形式を一定速度で増やす

**定義の確認**：族の滑らかさ、グラフの埋め込み性、各時刻のLagrange条件を順に検証する。

$Q=\mathbb R^2$ とし、$\alpha_t=t(y\,dx+x\,dy)$ とする。写像 $s_{\alpha_t}(x,y)=(x,y,ty,tx)$ は各時刻で埋め込み、像は2次元である。また

$$
d\alpha_t=t(dy\wedge dx+dx\wedge dy)=0
$$

だから各時刻にLagrangeである。$t=0$ では零切断、$t=1$ では第2節のグラフとなる。定義に必要な滑らかさ・次元・2形式の消滅を実際に確認した。
<!-- definition-example-end -->

<a id="prop-syz1-02-infinitesimal-closed"></a>

<!-- formal-statement-start -->
> **命題（グラフ変形の一次条件）**  
> $Q$ と $\alpha_t$ を上の定義のとおりとする。$L_t=\Gamma_{\alpha_t}$ が全ての $t$ でLagrangeであるための必要十分条件は、全時刻で $d\alpha_t=0$ である。このとき

$$
\beta_t=\frac{\partial\alpha_t}{\partial t}
$$

> は閉1形式である。逆に $\alpha_0$ が閉じていて、全時刻で $d\beta_t=0$ なら、全ての $\alpha_t$ が閉じる。
<!-- formal-statement-end -->

### 証明の見取り図

時刻を固定し、[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)を適用する。微分と外微分の交換は、固定座標で係数の混合偏微分が交換できることから確かめる。

<!-- proof-start -->
### 証明

必要十分性は[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)を各 $t$ に適用して得られる。$\alpha_t=\sum_i a_i(t,q)dq^i$ と書く。滑らかさから

$$
\begin{aligned}
d\beta_t
&=\sum_{i<j}\left(
\partial_i\partial_t a_j-\partial_j\partial_t a_i
\right)dq^i\wedge dq^j\\
&=\partial_t\left[
\sum_{i<j}(\partial_i a_j-\partial_j a_i)dq^i\wedge dq^j
\right]=\partial_t(d\alpha_t).
\end{aligned}
$$

従って $d\alpha_t=0$ なら $d\beta_t=0$。逆に $d\beta_t=0$ なら $d\alpha_t$ は $t$ に依存せず、$d\alpha_0=0$ から全時刻で零である。
<!-- proof-end -->

これは**一次条件が閉1形式で記述される**という局所計算である。まだ特殊Lagrange条件も、コンパクトな特殊Lagrangeの変形空間の滑らかさも主張していない。後者にはさらに楕円型の方程式が現れる。

## 5. 完全形式なら Hamilton 流で動かせる

「閉じている」と「ある大域関数の微分である」は異なる。後者が成り立つグラフ変形には、シンプレクティック形式を保つ運動としての特別な表示がある。

[Hamiltonベクトル場の定義](../../SYM/SYM4/index.md#def-sym4-hamiltonian-vector-field)に従い、符号規約を $\iota_{X_H}\omega_{\mathrm{can}}=dH$ とする。$X_H=\sum_i(A^i\partial_{q^i}+B_i\partial_{p_i})$ と置けば

$$
\iota_{X_H}\omega_{\mathrm{can}}
=\sum_i(A^i\,dp_i-B_i\,dq^i).
$$

したがって $H=H(q,p)$ に対して $A^i=\partial_{p_i}H$、$B_i=-\partial_{q^i}H$ である。符号を変えると以下の関係も逆転するので、先に固定した。

<a id="prop-syz1-02-exact-hamiltonian"></a>

<!-- formal-statement-start -->
> **命題（完全なグラフ変形とHamilton流）**  
> $Q$ を滑らかな多様体、$I$ を $0$ を含む区間とし、$f_t:Q\to\mathbb R$ を $(t,q)$ に滑らかな関数族で $f_0=0$ とする。$\alpha_t=df_t$ とおく。すると

$$
H_t(q,p)=-\frac{\partial f_t(q)}{\partial t}
$$

> が生成する時間依存 Hamilton 流は、定義される各時刻で零切断を $\Gamma_{\alpha_t}$ へ移す。この $H_t$ の流れは各有限時間で $T^*Q$ 上に大域的に存在する。
<!-- formal-statement-end -->

### 証明の見取り図

$H_t$ が $p$ に依存しないので $\dot q=0$。符号規約により $\dot p=d_q(\partial_t f_t)$ となり、$t$ で積分すると $p(t)=p(0)+df_t(q)$ である。

<!-- proof-start -->
### 証明

上記のHamilton方程式に $H_t=-\partial_t f_t$ を代入すると

$$
\dot q^i=\partial_{p_i}H_t=0,\qquad
\dot p_i=-\partial_{q^i}H_t
=\partial_{q^i}\partial_t f_t(q).
$$

最初の等式から $q(t)=q(0)$ である。ここで $d/dt$ は軌道 $q(t)$ に沿う全微分だが、一般に

$$
\frac{d}{dt}\bigl(\partial_{q^i}f_t(q(t))\bigr)
=\partial_t\partial_{q^i}f_t(q(t))
+\sum_j\partial_{q^j}\partial_{q^i}f_t(q(t))\,\dot q^j(t).
$$

今回は $\dot q=0$ だから右辺の和が消える。混合偏微分を交換して第2式を積分すると

$$
\begin{aligned}
p_i(t)-p_i(0)
&=\int_0^t\partial_s\partial_{q^i}f_s(q(0))\,ds\\
&=\partial_{q^i}f_t(q(0))-\partial_{q^i}f_0(q(0))
=\partial_{q^i}f_t(q(0)).
\end{aligned}
$$

よって流れは $(q,p)\mapsto(q,p+df_t(q))$ である。基点は動かず、右辺は区間内の各有限時刻で全ての $(q,p)$ に対して定義されるため大域流である。零切断 $p=0$ の像は $\Gamma_{df_t}$ となる。また $d(df_t)=0$ だからLagrange性も[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)と整合する。
<!-- proof-end -->

### 必要条件：Hamilton的に動かせるなら速度は完全

より一般に、グラフ族 $s_{\alpha_t}$ の像を時間依存Hamilton流 $\phi_t$ で動かすと仮定する（$\phi_t(L_0)=L_t$）。**初期グラフ**の埋め込みを $s_{\alpha_0}$ とし、$h_t=\pi\circ\phi_t\circ s_{\alpha_0}:Q\to Q$ とおくと、各 $h_t$ は微分同相であり、

$$
\phi_t(s_{\alpha_0}(q))=s_{\alpha_t}(h_t(q)).
$$

固定した $q$ で時間微分し、流れの定義と連鎖律を使うと

$$
X_{H_t}(s_{\alpha_t}(h_t(q)))
=(\partial_t s_{\alpha_t})(h_t(q))
+ds_{\alpha_t,h_t(q)}(\partial_t h_t(q)).
$$

したがって選んだグラフ表示の速度 $V_t=\partial_t s_{\alpha_t}$ と $X_{H_t}$ の差は接方向のベクトルである。$L_t$ はLagrangeなので、その接方向の差は $ds_{\alpha_t}(w)$ と $\omega$ で組にしたとき寄与しない。一方、時刻 $t$ と基点 $q$ を固定してグラフを微分すると $V_t=(0,\beta_t)$ であり、正準形式へ代入して

$$
\omega_{\mathrm{can}}\bigl(V_t,ds_{\alpha_t}(w)\bigr)=-\beta_t(w).
$$

Hamiltonベクトル場の規約と同じ式の右辺を照合すると

$$
-\beta_t(w)
=dH_t(ds_{\alpha_t}(w))
=d(H_t\circ s_{\alpha_t})(w).
$$

従って

$$
\beta_t=-d(H_t\circ s_{\alpha_t}).
$$

**つまり Hamilton 流で実現されるグラフ族の速度は必ず完全1形式である。** 逆向きに使うときは単に各 $\beta_t$ が点ごとに完全と述べるだけでなく、時間にも滑らかな原始関数を選べるという仮定を置く。上の命題は $f_t$ を初めから与えて、その条件を満たす明示的構成である。

## 6. 周期が示す「局所では作れるが、大域では作れない」変形

円周 $Q=S^1=\mathbb R/\mathbb Z$ の角度座標を $x$ とする。局所座標変換 $x\mapsto x+m$（$m\in\mathbb Z$）では $dx$ は不変なので、$dx$ は円周上の大域的な1形式である。一次元では2形式が零になるから $d(dx)=0$。したがって

$$
\alpha_t=t c\,dx,\qquad c\in\mathbb R
$$

のグラフ族は全てLagrangeである。しかし基本閉路を一周すると

$$
\oint_{S^1}\alpha_t=t c.
$$

もし $df_t=\alpha_t$ なら、始点と終点が同じ閉路上で $\oint df_t=0$ でなければならない。$tc\ne0$ では矛盾する。各小区間では $f_t(x)=tcx$ を書けるが、$x\mapsto x+1$ で $f_t$ は $tc$ ずれてしまう。

<a id="prop-syz1-02-period-obstruction"></a>

<!-- formal-statement-start -->
> **命題（閉路積分と大域ポテンシャルの障害）**  
> $Q$ を滑らかな多様体、$\alpha$ を大域的な滑らかな閉1形式とする。$\alpha=df$ となる大域的な実数値関数 $f$ が存在すれば、任意の区分的滑らかな閉曲線 $\gamma$ に対し

$$
\int_\gamma\alpha=0.
$$

> 特に、ある閉曲線で積分が非零なら、大域ポテンシャルは存在しない。
<!-- formal-statement-end -->

### 証明の見取り図

関数 $f$ の微分を曲線に引き戻すと、曲線のパラメータに沿う一変数関数の導関数になる。閉曲線なので端点値が一致する。

<!-- proof-start -->
### 証明

閉曲線を各滑らかな区間で $\gamma:[a,b]\to Q$ とパラメータ表示し、$\gamma(a)=\gamma(b)$ とする。連鎖律により

$$
\begin{aligned}
\int_\gamma df
&=\int_a^b df_{\gamma(t)}(\gamma'(t))\,dt\\
&=\int_a^b\frac{d}{dt}f(\gamma(t))\,dt\\
&=f(\gamma(b))-f(\gamma(a))=0.
\end{aligned}
$$

区分的滑らかな場合は区間ごとの端点項が望ましく相殺する。従って非零周期を持つ $\alpha$ は完全形式でありえない。
<!-- proof-end -->

$Q=T^2=(\mathbb R/\mathbb Z)^2$ では $dx,dy$ の二つの基本閉路がある。$\alpha=a\,dx+b\,dy$ の周期はそれぞれ $a,b$ となり、これらの値を変えずに大域的な完全形式 $df$ を足しても周期は変わらない。例えば

$$
\alpha=a\,dx+b\,dy+d\left(\frac{\sin(2\pi x)}{2\pi}\right)
$$

は閉形式で、周期は $(a,b)$ である。$a=b=0$ なら右辺は大域的な関数の微分となり、第5節のHamilton流で零切断から到達する。どちらかが非零なら、少なくともここで与えたグラフ変形はHamilton流で実現できない。

閉形式を完全形式で割った違いは、[de Rhamコホモロジー](../../GEO/GEO9/index.md#def-geo9-de-rham-cohomology)の一次部分に対応する。この講義で証明したのはグラフの閉性・局所ポテンシャル・Hamilton的な完全変形と周期障害であり、一般のコンパクトLagrange部分多様体の変形空間が大域的にどんな形を持つかではない。

## 7. グラフ表示の適用範囲

局所的な「グラフであること」を判定するには射影 $\pi:T^*Q\to Q$ を使う。

$L\subset T^*Q$ を $n$ 次元の埋め込み部分多様体とし、点 $\ell\in L$ で微分

$$
d(\pi|_L)_\ell:T_\ell L\longrightarrow T_{\pi(\ell)}Q
$$

が線形同型だとする。このとき[逆関数定理](../../../基礎科目/RA/RA6A/index.md#thm-ra6a-inverse-function)により、$\ell$ の周辺では $\pi|_L$ が局所微分同相となる。

その逆写像を $s$ とすれば $\pi\circ s=\operatorname{id}$。従って $s(q)$ は余接ファイバー上の余ベクトル $\alpha_q$ を選び、局所的に $L=\Gamma_\alpha$ と書ける。

さらに $L$ がLagrangeなら、[閉1形式のグラフのLagrange判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)によって $d\alpha=0$ も従う。

一方、一つの余接ファイバー $T^*_{q_0}Q$ は $n$ 次元で、$\omega_{\mathrm{can}}$ は垂直方向二つに零であるからLagrangeだが、射影は定数写像である。したがって $d\pi$ の階数は0であり、基底 $Q$ 上のグラフではない。「Lagrangeだからグラフ」という推論はこの段階で壊れる。

一般のLagrange部分多様体の近傍をその余接束の零切断近くへ移す **Weinstein近傍定理**も重要だが、この講義の命題では使っていない。ここで実際に扱ったのは **初めから余接束が与えられ、かつ射影が局所同型である場合** に限る。後続の特殊Lagrange変形では、Lagrange条件に加えて、計量・正則体積形式に関する別の条件を課す。

## 8. 演習と詳細解答

### Level A：閉性・ポテンシャル・速度を一つずつ確認する

<a id="ex-syz1-02-a01"></a>

#### SYZ1-02-A01 傾きの対称性と反例

- Level: A

$Q=\mathbb R^2$ とし $\alpha=(3x+2y)dx+(2x-y)dy$ と $\eta=x\,dy$ を考える。どちらのグラフがLagrangeか、引き戻しの2形式を計算して答えよ。

<!-- solution-start -->
### 詳細解答

$\alpha$ の係数は $a_x=3x+2y$、$a_y=2x-y$ である。$\partial_y a_x=2=\partial_x a_y$ より

$$
d\alpha=(\partial_x a_y-\partial_y a_x)dx\wedge dy=0.
$$

したがって $s_\alpha^*\omega_{\mathrm{can}}=-d\alpha=0$。$s_\alpha$ は射影と合成して恒等写像となる埋め込みで次元2なので、Lagrangeである。一方 $\eta=x\,dy$ では

$$
d\eta=dx\wedge dy,\qquad
s_\eta^*\omega_{\mathrm{can}}=-dx\wedge dy\ne0.
$$

埋め込み性と次元は同じでも、2形式の消滅条件が壊れているためLagrangeではない。
<!-- solution-end -->

<a id="ex-syz1-02-a02"></a>

#### SYZ1-02-A02 動径積分からポテンシャルを復元

- Level: A

$\alpha=(2x+3y)dx+(3x+4y)dy$ を $\mathbb R^2$ 上で考える。第3節の動径積分を直接計算し、原始関数の偏微分を両方確認せよ。

<!-- solution-start -->
### 詳細解答

$\partial_y(2x+3y)=3=\partial_x(3x+4y)$ なので閉形式である。$q=(x,y)$ に対し

$$
\begin{aligned}
f(x,y)
&=\int_0^1[x(2tx+3ty)+y(3tx+4ty)]dt\\
&=\int_0^1 t(2x^2+6xy+4y^2)dt\\
&=x^2+3xy+2y^2.
\end{aligned}
$$

従って $\partial_x f=2x+3y$、$\partial_y f=3x+4y$ であり $df=\alpha$。積分の上限から $\int_0^1t\,dt=1/2$ の係数も確認できる。
<!-- solution-end -->

<a id="ex-syz1-02-a03"></a>

#### SYZ1-02-A03 円周上の閉形式と大域障害

- Level: A

$Q=S^1=\mathbb R/\mathbb Z$ 上で $\alpha=3\,dx$ を考える。閉性、グラフのLagrange性、基本閉路の周期、大域原始関数の有無を順に確かめよ。

<!-- solution-start -->
### 詳細解答

$dx$ は整数だけ異なる局所座標の間で同じ微分なので大域1形式である。一次元では $d\alpha$ は2形式であり零である。グラフは埋め込まれた一次元部分多様体なので、[グラフ判定](../../SYM/SYM6/index.md#thm-sym6-graph-criterion)からLagrangeである。基本閉路 $\gamma(s)=[s]$、$0\le s\le1$ について

$$
\int_\gamma\alpha=\int_0^1 3\,ds=3.
$$

[周期障害](#prop-syz1-02-period-obstruction)より大域原始関数は存在しない。局所関数 $3x$ は座標の整数シフトで値が3変わる。
<!-- solution-end -->

<a id="ex-syz1-02-a04"></a>

#### SYZ1-02-A04 時間微分と閉性

- Level: A

$\alpha_t=t^2(y\,dx+x\,dy)$ とする。$\alpha_0$、$\beta_t=\partial_t\alpha_t$、$d\alpha_t$、$d\beta_t$ を計算せよ。

<!-- solution-start -->
### 詳細解答

$\alpha_0=0$。$t$ は $x,y$ と独立なパラメータなので

$$
\beta_t=2t(y\,dx+x\,dy).
$$

外微分は空間座標で行い、

$$
d\alpha_t=t^2(dy\wedge dx+dx\wedge dy)=0,
\qquad
d\beta_t=2t(dy\wedge dx+dx\wedge dy)=0.
$$

従って全ての時刻のグラフがLagrangeであり、速度も閉1形式である。時間微分 $\partial_t$ と外微分 $d$ の区別が重要である。
<!-- solution-end -->

<a id="ex-syz1-02-a05"></a>

#### SYZ1-02-A05 Hamilton生成関数の符号

- Level: A

$Q=\mathbb R$、$f_t(q)=tq^2/2$ とし、$\omega=dq\wedge dp$、$\iota_{X_H}\omega=dH$ とする。$H_t$、$X_{H_t}$、零切断の像を計算せよ。

<!-- solution-start -->
### 詳細解答

$\partial_t f_t=q^2/2$ なので $H_t=-q^2/2$ である。$dH_t=-q\,dq$、また $\iota_{a\partial_q+b\partial_p}\omega=a\,dp-b\,dq$ であるから、$a=0,b=q$ と比較できる。よって

$$
X_{H_t}=q\,\partial_p,\qquad \dot q=0,\qquad\dot p=q.
$$

初期値 $(q_0,0)$ から $(q_0,tq_0)$ に動く。一方 $df_t=tq\,dq$ であり、そのグラフは $p=tq$。両者は一致する。
<!-- solution-end -->

### Level B：局所・大域とHamilton変形を結びつける

<a id="ex-syz1-02-b01"></a>

#### SYZ1-02-B01 二変数のHamilton流とLagrange性

- Level: B

$Q=\mathbb R^2$、$f_t(x,y)=t(xy+x^2/2)$ と置く。$\alpha_t$ と $H_t$ を求め、Hamilton方程式から零切断の像を導き、外微分でもLagrange性を確認せよ。

<!-- solution-start -->
### 詳細解答

偏微分して

$$
\alpha_t=df_t=t((y+x)dx+x\,dy),\qquad H_t=-(xy+x^2/2).
$$

$H_t$ は $p$ に依存しないので $\dot x=\dot y=0$。運動量方向では

$$
\dot p_x=-\partial_x H_t=y+x,\qquad
\dot p_y=-\partial_y H_t=x.
$$

零切断から積分すると $p_x(t)=t(y+x)$、$p_y(t)=tx$ であり、$\Gamma_{\alpha_t}$ に一致する。さらに

$$
d\alpha_t=t[(dy+dx)\wedge dx+dx\wedge dy]=0.
$$

ゆえに射影と合成して恒等になるグラフは埋め込み2次元であり、Lagrangeである。
<!-- solution-end -->

<a id="ex-syz1-02-b02"></a>

#### SYZ1-02-B02 二つの周期と完全成分

- Level: B

$T^2=(\mathbb R/\mathbb Z)^2$ 上で

$$
\alpha=2\,dx-3\,dy+\cos(2\pi x)\,dx
$$

を考える。閉性、二つの基本周期、局所ポテンシャルを求め、大域ポテンシャルがない理由を示せ。

<!-- solution-start -->
### 詳細解答

各係数は $x$ のみに依存し、$dy$ の係数は定数なので

$$
d\alpha=0\,dx\wedge dy=0.
$$

$x$ 方向の基本閉路では

$$
\int_0^1[2+\cos(2\pi x)]dx
=2+\left[\frac{\sin(2\pi x)}{2\pi}\right]_0^1=2.
$$

$y$ 方向の閉路では $\int_0^1(-3)dy=-3$。一つでも非零なら[周期障害](#prop-syz1-02-period-obstruction)から大域原始関数は存在しない。局所座標でなら

$$
f(x,y)=2x-3y+\frac{\sin(2\pi x)}{2\pi}
$$

と書け、$\partial_x f=2+\cos(2\pi x)$、$\partial_y f=-3$ を満たす。しかし $x\mapsto x+1$ で値が2増え、$y\mapsto y+1$ で3減るので大域実数値関数にはならない。
<!-- solution-end -->

<a id="ex-syz1-02-b03"></a>

#### SYZ1-02-B03 グラフ条件の破綻

- Level: B

$Q=\mathbb R^2$ とし、$L=T^*_{(0,0)}Q$ を一つの余接ファイバーとする。$L$ の次元とLagrange性を調べ、零切断をグラフへ移す第4節の議論をこの $L$ にそのまま使えない理由を射影の微分で説明せよ。

<!-- solution-start -->
### 詳細解答

$L=\{q^1=q^2=0\}$ の自由変数は $p_1,p_2$ の二つで、$\dim L=2$ である。その接空間は $\partial_{p_1},\partial_{p_2}$ で張られ、両方向に $dq^i$ は零を返すから

$$
\omega_{\mathrm{can}}|_{TL}
=\sum_i dq^i\wedge dp_i|_{TL}=0.
$$

従ってLagrangeである。しかし $\pi|_L$ は一定の基点 $(0,0)$ に写すので $d(\pi|_L)=0$、階数0であり、同型ではない。よって逆関数定理によるグラフ表示の仮定が失われる。**壊れたのはLagrange性ではなく射影の横断性**である。
<!-- solution-end -->

<a id="ex-syz1-02-b04"></a>

#### SYZ1-02-B04 時間と空間の微分を分ける

- Level: B

$Q=\mathbb R^2$ 上で $f_t(x,y)=\sin(t)\,x^2y$ を与える。$\alpha_t=df_t$、$\beta_t=\partial_t\alpha_t$ を成分表示し、$H_t$ のHamilton方程式と $\beta_t=-d(H_t\circ s_{\alpha_t})$ を検算せよ。

<!-- solution-start -->
### 詳細解答

まず

$$
\alpha_t=\sin(t)(2xy\,dx+x^2\,dy),\quad
\beta_t=\cos(t)(2xy\,dx+x^2\,dy).
$$

$H_t=-\cos(t)x^2y$ なので $H_t$ は $p$ に依存しない。Hamilton方程式では

$$
\dot x=\dot y=0,\quad
\dot p_x=2\cos(t)xy,\quad
\dot p_y=\cos(t)x^2.
$$

初期値が零ならそれぞれ時間積分から $p_x=2\sin(t)xy$、$p_y=\sin(t)x^2$ となりグラフと一致する。また $H_t\circ s_{\alpha_t}=-\cos(t)x^2y$ は $q$ の関数なので

$$
-d(H_t\circ s_{\alpha_t})
=\cos(t)(2xy\,dx+x^2\,dy)=\beta_t.
$$

必要条件の符号も一致する。
<!-- solution-end -->

### Level C：閉グラフ変形の局所性・大域性・Hamilton性

<a id="ex-syz1-02-c01"></a>

#### SYZ1-02-C01 二次元トーラスの一パラメータ変形を仕分ける

- Level: C

$Q=T^2=(\mathbb R/\mathbb Z)^2$ で $u(x,y)=\sin(2\pi x)\sin(2\pi y)/(2\pi)$ とし、定数 $a,b\in\mathbb R$ に対して

$$
\alpha_t=t(a\,dx+b\,dy)+d(t^2u)
\qquad(0\le t\le1)
$$

を考える。この式は $t\in\mathbb R$ まで滑らかに延長できるので、第4節の開区間上の変形として扱い、そのうち $0\le t\le1$ を調べる。

1. 全ての $t$ でグラフが埋め込みLagrangeであることを確認し、$\beta_t$ を求めよ。
2. $x$・$y$ の基本閉路の $\alpha_t$ と $\beta_t$ の周期を求めよ。
3. $(a,b)=(0,0)$ のとき、零切断からのHamilton流と生成関数を具体的に与えよ。
4. $(a,b)\ne(0,0)$ のとき、この**指定されたグラフ族**がHamilton流によって実現できないことを示し、各座標球で局所ポテンシャルが存在することとは矛盾しない理由を述べよ。

<!-- solution-start -->
### 詳細解答

**第1問。** $u$ は $x,y$ の整数移動で不変なので $T^2$ 上の滑らかな関数である。$dx,dy$ は大域1形式である。$d$ は $t$ を固定して $x,y$ で外微分する演算で、

$$
du=\cos(2\pi x)\sin(2\pi y)\,dx
+\sin(2\pi x)\cos(2\pi y)\,dy.
$$

従って

$$
\begin{aligned}
d\alpha_t
&=t(a\,d(dx)+b\,d(dy))+t^2d(du)=0,\\
\beta_t&=\partial_t\alpha_t=a\,dx+b\,dy+2t\,du.
\end{aligned}
$$

$d\beta_t=0$ も従う。射影 $\pi\circ s_{\alpha_t}=\operatorname{id}_{T^2}$ より全時刻で埋め込みとなり、次元2かつ引き戻し2形式 $-d\alpha_t=0$ だからLagrangeである。

**第2問。** $x$ の基本閉路 $\gamma_x(s)=([s],[y_0])$ に沿って完全形式 $du$ を積分すると $u(1,y_0)-u(0,y_0)=0$ となる。$dy$ はこの閉路の接方向に零を返す。従って

$$
\int_{\gamma_x}\alpha_t=ta,\qquad
\int_{\gamma_x}\beta_t=a.
$$

同様に $\gamma_y(s)=([x_0],[s])$ では $dx$ が零なので

$$
\int_{\gamma_y}\alpha_t=tb,\qquad
\int_{\gamma_y}\beta_t=b.
$$

**第3問。** $a=b=0$ なら $f_t=t^2u$ と置け、$f_0=0$、$df_t=\alpha_t$。第5節の命題を $f_t$ に適用し

$$
H_t(q,p)=-\partial_t f_t=-2t\,u(q)
$$

とする。Hamilton方程式は $\dot q=0$、$\dot p=2t\,du(q)$、よって零切断から

$$
p(t)=\int_0^t 2s\,du\,ds=t^2du=\alpha_t.
$$

**第4問。** $(a,b)\ne(0,0)$ なら少なくとも一つの $\beta_t$ の周期が非零である。Hamilton流でこのグラフ族を動かせるなら第5節の必要条件

$$
\beta_t=-d(H_t\circ s_{\alpha_t})
$$

により周期は全て零でなければならず、矛盾する。一方、十分小さい座標球では $dx,dy$ は通常の座標関数の微分であり、

$$
f_t(x,y)=t(ax+by)+t^2u(x,y)
$$

が局所ポテンシャルとなる。座標を整数だけずらすと $t(ax+by)$ は $ta$ または $tb$ だけ変わるため、大域実数値関数に貼り合わない。局所の存在と大域の障害は両立する。
<!-- solution-end -->

## 9. 何が分かり、何がまだ必要か

余接束という明示的な舞台では、**グラフがLagrangeである ⇔ 1形式が閉じている**ことを座標で検算できる。閉形式なら各小座標球でポテンシャルが存在し、完全形式の変形にはHamilton流という実際の運動を与えられる。ただし非零周期は大域ポテンシャルの障害となり、一般のLagrange部分多様体が選んだ射影でグラフになるわけでもない。

次の **SYZ1-03「較正形式と体積最小性」** ではLagrange性だけでなく、向きと計量を使った体積の不等式を導入する。その後、特殊Lagrange条件がLagrange変形に追加する方程式を調べる。
