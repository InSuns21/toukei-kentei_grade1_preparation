# MFL16 Diffusion Mapsと熱の幾何

## 1. 点群上で「どれほど混ざりやすいか」を測りたい

[MFL15の有限alpha補正Markov行列](../MFL15/index.md#def-mfl15-discrete)は、点 $x_i$ から点 $x_j$ へ一歩で進む確率 $P_{ij}$ を与えた。近傍グラフがつながっていても、短い道が一本しかない場合と、広い領域を何本もの道で往来できる場合は異なる。最短路だけでなく、**複数歩のランダムウォークが到達する確率分布**を比較したい。

行確率行列 $P$ について、$P^t_{ik}$ は $i$ から出発して整数 $t\ge0$ 歩後に $k$ にいる確率である。二点 $i,j$ の行 $P^t_{i\cdot}$ と $P^t_{j\cdot}$ が似ていれば、「$t$ 歩で見える幾何」では近いと考える。これが Diffusion Maps の入口になる。

ここでは次の三つを区別する。

1. **有限点群**：$n$ 点の確率行列の固有値と距離は有限次元の厳密な等式になる。
2. **連続多様体**：熱半群 $e^{s\Delta_g}$ と熱核に、類似した固有関数表示がある。
3. **極限の接続**：有限の一歩と連続の微小時間を結ぶには、標本・作用素・スペクトルの追加の収束評価が必要になる。

以下、有限時刻の $t$ は歩数を表す**整数**、連続の $s$ は熱方程式の**実時間**とする。kernelの帯域幅 $\varepsilon$ とはいずれも別の量である。

## 2. 対称核から確率行列の固有基底を得る

正値対称核 $K_{ij}>0$ を $\alpha$ 補正して対称行列 $W_{ij}>0$ を作り、行和 $D_i=\sum_jW_{ij}$ で割ると $P_{ij}=W_{ij}/D_i$ となる。$S=\sum_iD_i$、$\pi_i=D_i/S$ は正の確率である。[MFL15の詳細釣合い](../MFL15/index.md#prop-mfl15-balance)から

$$
\pi_iP_{ij}=\pi_jP_{ji},\qquad
\sum_i\pi_iP_{ij}=\pi_j.
$$

通常のEuclid内積では $P$ は対称とは限らない。一方、関数ベクトル $f,g\in\mathbb R^n$ に対して

$$
\langle f,g\rangle_\pi=\sum_{i=1}^n\pi_if_ig_i,
\qquad \|f\|_\pi^2=\langle f,f\rangle_\pi
$$

と重みを付ければ、詳細釣合いによって $\langle f,Pg\rangle_\pi=\langle Pf,g\rangle_\pi$ となる。この内積は、定常確率 $\pi$ で観測した二乗平均を表す。

<a id="thm-mfl16-spectrum"></a>

<!-- formal-statement-start -->
> **定理（可逆Markov行列の重み付き固有分解）**
> $n\ge1$、$W\in\mathbb R^{n\times n}$ を全成分が正の対称行列とする。$D_i=\sum_jW_{ij}$、$S=\sum_iD_i$、$P_{ij}=W_{ij}/D_i$、$\pi_i=D_i/S$ とおく。このとき $\mathbb R^n$ は $\langle\cdot,\cdot\rangle_\pi$ に関する $P$ の実正規直交固有基底 $\psi_1,\ldots,\psi_n$ を持ち、

$$
P\psi_\ell=\lambda_\ell\psi_\ell,\quad
\psi_1=(1,\ldots,1)^T,\quad \lambda_1=1,
\quad -1\le\lambda_\ell\le1.
$$

> $n>1$ なら $\lambda_1=1$ は単純で、$\ell\ge2$ について $|\lambda_\ell|<1$。$\psi_1$ 以外の固有対は絶対値の大きい順に並べてもよい。
<!-- formal-statement-end -->

### 証明の見取り図

重み付き内積を対角行列でEuclid内積に変換すると、確率行列と対称行列が相似になる。固有値の絶対値は、各行が確率平均であることとJensen不等式で抑えられる。

<!-- proof-start -->
### 証明

$\Pi=\operatorname{diag}(\pi_1,\ldots,\pi_n)$ は対角が正なので $\Pi^{1/2}$ と $\Pi^{-1/2}$ が存在する。成分を計算すると

$$
B=\Pi^{1/2}P\Pi^{-1/2},\qquad
B_{ij}=\frac{\sqrt{\pi_i}}{\sqrt{\pi_j}}P_{ij}
=\frac{W_{ij}}{\sqrt{D_iD_j}}=B_{ji}.
$$

従って $B$ は実対称行列で、実正規直交固有ベクトル $u_\ell$ と実固有値 $\lambda_\ell$ を持つ。$\psi_\ell=\Pi^{-1/2}u_\ell$ とすれば $P\psi_\ell=\lambda_\ell\psi_\ell$、また

$$
\langle\psi_\ell,\psi_m\rangle_\pi
=u_\ell^T\Pi^{-1/2}\Pi\Pi^{-1/2}u_m
=u_\ell^Tu_m=\delta_{\ell m}.
$$

各行の和が1なので $P\mathbf1=\mathbf1$。さらに $\sum_i\pi_i=1$ だから $\|\mathbf1\|_\pi=1$ である。任意の $f\in\mathbb R^n$ について、凸関数 $z^2$ のJensen不等式を各行の確率 $P_{ij}$ に使うと

$$
(Pf)_i^2=\left(\sum_jP_{ij}f_j\right)^2
\le\sum_jP_{ij}f_j^2.
$$

定常性で右辺を $\pi_i$ に関して足し、

$$
\|Pf\|_\pi^2
\le\sum_{i,j}\pi_iP_{ij}f_j^2
=\sum_j\pi_jf_j^2=\|f\|_\pi^2
$$

を得る。$f=\psi_\ell$ を代入すれば $\lambda_\ell^2\le1$。等号が成立すると、全ての行でJensenの等号が成立する。各 $P_{ij}>0$ なので、二乗関数の厳密凸性によりその行が平均する全ての $f_j$ は同じ値でなければならず、$f$ は定数ベクトルである。従って $|\lambda|=1$ の固有空間は $\mathbf1$ の張る一次元のみ。これで単純性と他の固有値の厳密不等式が従う。$\square$
<!-- proof-end -->

全成分の正値は便利な十分条件であり、有限グラフの零重みを許すときは連結性・周期性を別途検査する。特に「行確率行列なら普通のEuclid内積で直交固有ベクトルがある」は誤りである。上で用いた正規直交性は $\pi$ に関するものだ。

## 3. 時間 $t$ の遷移分布を距離にする

異なる出発点の行を単純なEuclid距離で比較すると、到着先の定常確率が非常に大きい点と小さい点とを同じ尺度で扱う。低頻度の到着先で見える相対差を補正するため、定常確率の逆数を重みとする。

<a id="def-mfl16-distance"></a>

<!-- formal-statement-start -->
> **定義（有限diffusion distance）**
> [MFL15の有限Markov行列](../MFL15/index.md#def-mfl15-discrete)から得る $n\ge1$、$P_{ij}>0$、定常分布 $\pi_i>0$ を用いる。整数 $t\ge0$ に対し、頂点 $i,j$ の時刻 $t$ の **diffusion distance** を

$$
D_t(i,j)^2=\sum_{k=1}^n\frac{(P^t_{ik}-P^t_{jk})^2}{\pi_k}
$$

> で定義する。$P^0=I$ とする。$D_t$ は一般には異なる頂点で0となり得るので、まず擬距離（非負・対称・三角不等式）である。
<!-- formal-statement-end -->

この式の分母が $\pi_k$ なのは、行の差を $\pi_k$ で割った関数の $L^2(\pi)$ ノルムを計算しているからである。$v_k=(P^t_{ik}-P^t_{jk})/\pi_k$ とすれば $D_t(i,j)=\|v\|_\pi$。したがって非負性・対称性・三角不等式はノルムの性質から従う。

<!-- definition-example-start: def-mfl16-distance -->
**定義の確認**（二点の一歩）。$P=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$ とする。両行の和は1、対称性から $\pi=(1/2,1/2)$ は定常で、各分母は正である。$P_{1\cdot}-P_{2\cdot}=(1/2,-1/2)$ より

$$
D_1(1,2)^2=\frac{(1/2)^2}{1/2}+\frac{(-1/2)^2}{1/2}=1,
\qquad D_1(1,2)=1.
$$

また同じ点どうしの差は0、順序を交換しても二乗は変わらない。$t=0$ では二つの単位ベクトルの差なので $D_0(1,2)=2$。一歩進むと分布が近付いたことが数値でも分かる。
<!-- definition-example-end -->

この距離は「元空間での測地距離」ではない。遷移確率の差から定まるため、接続の多さや密度補正、時刻によって値が変わる。

## 4. 全ての遷移確率を少数の固有座標で表す

[重み付き固有分解](#thm-mfl16-spectrum)の正規直交基底 $\psi_\ell$ で、任意の関数 $f$ は

$$
f=\sum_{\ell=1}^n\langle f,\psi_\ell\rangle_\pi\psi_\ell,
\qquad P^tf=\sum_{\ell=1}^n\lambda_\ell^t
\langle f,\psi_\ell\rangle_\pi\psi_\ell
$$

となる。確率の行を固有関数の値に移すため、$f$ を $k$ 成分だけ $1/\pi_k$、それ以外0のベクトルとすれば、$\langle f,\psi_\ell\rangle_\pi=\psi_\ell(k)$ である。左辺の $i$ 成分は $P^t_{ik}/\pi_k$ なので

$$
\frac{P^t_{ik}}{\pi_k}
=\sum_{\ell=1}^n\lambda_\ell^t\psi_\ell(i)\psi_\ell(k).
$$

$\psi_1=1$ の成分はどの出発点からも同じで、二行の差を取ると消える。このことから座標の定義が生まれる。

<a id="def-mfl16-map"></a>

<!-- formal-statement-start -->
> **定義（Diffusion Maps座標）**
> [重み付き固有分解](#thm-mfl16-spectrum)の $\lambda_1=1,\psi_1=\mathbf1$ 以外の固有対を用いる。整数 $t\ge0$ と $1\le m\le n-1$ に対し、点 $i$ の $m$ 次元 **Diffusion Maps座標** を

$$
\Psi_t^{(m)}(i)=
(\lambda_2^t\psi_2(i),\ldots,\lambda_{m+1}^t\psi_{m+1}(i))\in\mathbb R^m
$$

> とする。$n=1$ では非定数座標を持たない空ベクトルとする。固有対は一般に $|\lambda_2|\ge\cdots\ge|\lambda_n|$ と並べ、全座標の場合は $\Psi_t(i)=\Psi_t^{(n-1)}(i)$ と書く。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl16-map -->
**定義の確認**（二点の固有座標）。前節の $P$ では $P(1,1)^T=(1,1)^T$、$P(1,-1)^T=(1/2)(1,-1)^T$。両ベクトルの $\pi$ ノルムは1、内積は0なので、定理の重み付き正規直交条件を満たす。非定数固有対は $\lambda_2=1/2$、$\psi_2=(1,-1)^T$ であり、

$$
\Psi_t(1)=2^{-t},\qquad \Psi_t(2)=-2^{-t}.
$$

差は $2^{1-t}$。$t=1$ で1となり、前節の直接計算に一致する。
<!-- definition-example-end -->

<a id="thm-mfl16-identity"></a>

<!-- formal-statement-start -->
> **定理（diffusion distanceのスペクトル表示）**
> 正値対称重み $W$ から作った有限Markov行列 $P$ と定常分布 $\pi$ を[重み付き固有分解](#thm-mfl16-spectrum)に従って選ぶ。任意の整数 $t\ge0$、頂点 $i,j$ に対し、[有限diffusion distance](#def-mfl16-distance) と全[Diffusion Maps座標](#def-mfl16-map)のEuclid距離は一致する：

$$
D_t(i,j)^2=\sum_{\ell=2}^n\lambda_\ell^{2t}
(\psi_\ell(i)-\psi_\ell(j))^2
=\|\Psi_t(i)-\Psi_t(j)\|_2^2.
$$

> 特に固有ベクトルの符号や、同じ固有値の固有空間内部の正規直交基底の選択によって全座標の距離は変わらない。
<!-- formal-statement-end -->

### 証明の見取り図

遷移確率の行差を固有関数で展開し、$\pi$ に関するParsevalの有限和で二乗ノルムを取る。定数固有関数は両出発点の差で消える。

<!-- proof-start -->
### 証明

直前で導いた核の固有展開を行 $i,j$ に使うと

$$
\frac{P^t_{ik}-P^t_{jk}}{\pi_k}
=\sum_{\ell=1}^n\lambda_\ell^t
(\psi_\ell(i)-\psi_\ell(j))\psi_\ell(k).
$$

$\psi_1(i)=\psi_1(j)=1$ なので最初の項は0。両辺を二乗し $\pi_k$ を掛けて $k$ で足すと

$$
\begin{aligned}
D_t(i,j)^2
&=\sum_k\pi_k\left[\sum_{\ell=2}^n\lambda_\ell^t
(\psi_\ell(i)-\psi_\ell(j))\psi_\ell(k)\right]^2\\
&=\sum_{\ell,r=2}^n\lambda_\ell^t\lambda_r^t
(\psi_\ell(i)-\psi_\ell(j))(\psi_r(i)-\psi_r(j))
\sum_k\pi_k\psi_\ell(k)\psi_r(k)\\
&=\sum_{\ell=2}^n\lambda_\ell^{2t}
(\psi_\ell(i)-\psi_\ell(j))^2.
\end{aligned}
$$

二行目から三行目では $\sum_k\pi_k\psi_\ell(k)\psi_r(k)=\delta_{\ell r}$ を使った。これが座標差の二乗和でもある。固有ベクトルの符号変更は座標差の符号を変えるだけで二乗和を変えない。同じ固有値 $\lambda$ に属する固有空間の基底を直交行列 $Q$ で取り替えると、そのブロックの座標差は $\lambda^tQv$ となるので $\|Qv\|_2=\|v\|_2$ より距離は不変。$\square$
<!-- proof-end -->

全座標では厳密な等式だが、可視化に使う $m=2,3$ 等の切り捨て後の距離は普通は小さくなる。固有値が重複するところで途中まで座標を採る場合は、選んだ部分空間によってその切り捨て距離も変わり得る。

<a id="prop-mfl16-time"></a>

<!-- formal-statement-start -->
> **命題（時間単調性と座標切り捨て誤差）**
> [スペクトル表示定理](#thm-mfl16-identity)の仮定の下で、任意の整数 $t\ge0$ と頂点 $i,j$ について $D_{t+1}(i,j)\le D_t(i,j)$ が成り立つ。また $m<n-1$ のとき、全座標から $m$ 座標へ切り捨てた二乗距離の損失 $E_{t,m}(i,j)$ は

$$
\begin{aligned}
E_{t,m}(i,j)
&=D_t(i,j)^2-\|\Psi_t^{(m)}(i)-\Psi_t^{(m)}(j)\|_2^2\\
&=\sum_{\ell=m+2}^n\lambda_\ell^{2t}
(\psi_\ell(i)-\psi_\ell(j))^2\\
&\le \rho_m^{2t}\left(\frac1{\pi_i}+\frac1{\pi_j}\right),
\quad \rho_m=\max_{\ell\ge m+2}|\lambda_\ell|<1.
\end{aligned}
$$
<!-- formal-statement-end -->

### 証明の見取り図

一歩進めると各非定数固有成分はさらに $|\lambda_\ell|\le1$ 倍になる。切り捨て誤差は残りの直交成分のノルムであり、固有関数を全て足した二点の再生恒等式で抑える。

<!-- proof-start -->
### 証明

[固有値の絶対値評価](#thm-mfl16-spectrum)と[距離の展開](#thm-mfl16-identity)から

$$
D_{t+1}(i,j)^2
=\sum_{\ell=2}^n\lambda_\ell^{2t}|\lambda_\ell|^2
(\psi_\ell(i)-\psi_\ell(j))^2\le D_t(i,j)^2.
$$

非負の平方根を取れば前半の結論になる。切り捨ての差は非負の残余和であり、各 $|\lambda_\ell|^{2t}\le\rho_m^{2t}$ を用いる。残余の係数を全基底の和で上から抑えるには、$t=0$ の[スペクトル表示](#thm-mfl16-identity)を用いる。このとき $P^0=I$ なので異なる二点なら

$$
\sum_{\ell=2}^n(\psi_\ell(i)-\psi_\ell(j))^2
=D_0(i,j)^2=\frac1{\pi_i}+\frac1{\pi_j}.
$$

同じ点なら両辺の和は0である。従って異なる二点に対する主張の上界が従い、同じ点でも $E_{t,m}=0$ なので上界は成り立つ。$\rho_m<1$ は全成分正値と $n>1$ から従う。$\square$
<!-- proof-end -->

距離が時間とともに縮むのは、「ウォークがやがて区別を失う」という意味である。**時間を長くすれば元の測地距離に近づく**という意味ではない。むしろ有限の正値行列では $t\to\infty$ で全ての点対距離が0に向かう。

## 5. Gaussian核二点模型を最初から最後まで解く

[MFL15の二点Gaussian核](../MFL15/index.md#def-mfl15-discrete)で対角 $c>0$、非対角 $cr$（$0<r<1$）とする。同じ $q_i$ による補正が両端で打ち消され、$\alpha$ に依らず

$$
P=\frac1{1+r}\begin{pmatrix}1&r\\r&1\end{pmatrix},
\quad \pi=(1/2,1/2),\quad
\lambda_2=\frac{1-r}{1+r},\quad \psi_2=(1,-1)^T.
$$

$P\psi_2=((1-r)/(1+r))\psi_2$ を行ごとに検算できる。従って

$$
\Psi_t(1)=\left(\frac{1-r}{1+r}\right)^t,
\quad \Psi_t(2)=-\left(\frac{1-r}{1+r}\right)^t,
\quad D_t(1,2)=2\left(\frac{1-r}{1+r}\right)^t.
$$

$r=1/3$ なら $P_{12}=1/4$、$\lambda_2=1/2$ となり、先の例と一致する。$r\downarrow0$ では点間の移動がほぼなく、距離の減衰は遅い。$r\uparrow1$ では一歩で二行が似て距離が急減する。

一般の正値対称行列 $W$ について、成分の正値だけから $\lambda_\ell\ge0$ は出ない。例えば $W=\begin{pmatrix}1&3\\3&1\end{pmatrix}$ は全成分正だが、$P=W/4$ の非定数固有値は $-1/2$。整数歩では $(-1/2)^t$ の符号が交互に変わっても、$D_t$ はその絶対値に依存する。Gaussianの正定値性など追加条件がある場合と一般の正値重みを混同してはいけない。

## 6. 連続の熱核も「出発点ごとの分布」を持つ

今度は点群を離れ、連結・コンパクト・境界なしの滑らかなRiemann多様体 $(M,g)$ を考える。[GA5の熱半群](../../../幾何系/GA/GA5/index.md#def-ga5-heat-semigroup)では、非正のLaplace–Beltrami作用素と非負の作用素を

$$
\Delta_g=\operatorname{div}_g\nabla_g\le0,\qquad L_g=-\Delta_g\ge0
$$

と書き、時間発展を $T_s=e^{-sL_g}$ と表す。

[GA5の熱核](../../../幾何系/GA/GA5/index.md#def-ga5-heat-kernel) $H_s(x,z)$ は、初期位置 $x$ から時間 $s>0$ に $z$ へ拡散した分布の密度の役をする。

有限の $\pi_k$ に対応するものは、ここでは体積測度 $dV_g(z)$ である。$\alpha=1$ の[MFL15のgenerator](../MFL15/index.md#thm-mfl15-generator)は一次極限で $\Delta_g$ になり、$\alpha\ne1$ の場合には密度依存のdriftが残る。従って、観測密度が非一様なとき全ての $\alpha$ に体積熱核を対応させるわけにはいかない。

<a id="def-mfl16-heat-distance"></a>

<!-- formal-statement-start -->
> **定義（熱核diffusion distance）**
> 連結コンパクト境界なしの滑らかなRiemann多様体 $(M,g)$ とその[熱核](../../../幾何系/GA/GA5/index.md#def-ga5-heat-kernel) $H_s(x,z)$ をとる。実時間 $s>0$、点 $x,y\in M$ について

$$
\mathcal D_s(x,y)^2
=\int_M|H_s(x,z)-H_s(y,z)|^2\,dV_g(z)
$$

> を **熱核diffusion distance** とする。コンパクト性と $s>0$ での熱核の滑らかさにより積分は有限である。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl16-heat-distance -->
**定義の確認**（円周での一波数の寄与）。単位円周 $S^1$ の体積要素は $d\theta$、体積は $2\pi$ である。熱核の角度差 $\theta-z$ に現れる第一Fourier成分は $e^{-s}\cos(\theta-z)/\pi$。[GA5のFourier熱核](../../../幾何系/GA/GA5/index.md#thm-ga5-torus-gaussian)で各項の係数を確認できる。$\theta=0,\eta=\pi$ の差ではこの成分が $2e^{-s}\cos z/\pi$ となり、二乗積分は

$$
\int_0^{2\pi}\left(\frac{2e^{-s}\cos z}{\pi}\right)^2dz
=\frac{4e^{-2s}}{\pi}.
$$

これが全熱核距離の最初の正の寄与である。$s>0$ なので高周波の寄与も二乗可積分で、定義の積分は有限になる。全波数を含む式を次に導く。
<!-- definition-example-end -->

<a id="thm-mfl16-heat-spectrum"></a>

<!-- formal-statement-start -->
> **定理（熱核diffusion distanceのスペクトル表示）**
> $(M,g)$ を連結コンパクト境界なしの滑らかなRiemann多様体とし、$L_g=-\Delta_g$ の実 $L^2(M,dV_g)$ 正規直交固有関数を $\phi_0,\phi_1,\ldots$、固有値を $0=\mu_0<\mu_1\le\mu_2\le\cdots$ とする。$\phi_0=\operatorname{Vol}(M)^{-1/2}$ と選ぶ。任意の $s>0$ と $x,y\in M$ について

$$
\mathcal D_s(x,y)^2
=\sum_{\ell=1}^{\infty}e^{-2s\mu_\ell}
(\phi_\ell(x)-\phi_\ell(y))^2.
$$

> この級数は有限値に収束する。さらに[GA5の熱核の存在・滑らかさ・対称性・半群性](../../../幾何系/GA/GA5/index.md#thm-ga5-kernel)を用いると

$$
\mathcal D_s(x,y)^2
=H_{2s}(x,x)+H_{2s}(y,y)-2H_{2s}(x,y).
$$
<!-- formal-statement-end -->

### 証明の見取り図

有限のスペクトル表示と同じく、二つの熱核の差を正規直交固有関数に展開して二乗積分する。無限級数は $s>0$ の熱核の滑らかさ・$L^2$ 収束を使い、有限和から極限へ移す。

<!-- proof-start -->
### 証明

[GA5の熱核の固有関数展開・正則性](../../../幾何系/GA/GA5/index.md#thm-ga5-kernel)により、固定した $s>0$、$x\in M$ に対して

$$
H_s(x,z)=\sum_{\ell=0}^{\infty}e^{-s\mu_\ell}\phi_\ell(x)\phi_\ell(z)
$$

が $z$ について $L^2(M)$ で成立する。同じ展開を $y$ に対して引き、部分和で正規直交性を使うと

$$
\begin{aligned}
\int_M\left|\sum_{\ell=0}^{N}e^{-s\mu_\ell}
(\phi_\ell(x)-\phi_\ell(y))\phi_\ell(z)\right|^2dV_g(z)
=\sum_{\ell=0}^{N}e^{-2s\mu_\ell}
(\phi_\ell(x)-\phi_\ell(y))^2.
\end{aligned}
$$

部分和の $L^2$ 収束で左辺は定義した $\mathcal D_s^2$ に収束する。従って右辺の非負級数も同じ有限値に収束する。$\phi_0$ は定数で $\phi_0(x)-\phi_0(y)=0$ だから $\ell=0$ を除ける。

最後に二乗を展開する。[GA5の熱核の存在・滑らかさ・対称性・半群性](../../../幾何系/GA/GA5/index.md#thm-ga5-kernel)から、例えば

$$
\int_MH_s(x,z)^2dV_g(z)
=\int_MH_s(x,z)H_s(z,x)dV_g(z)=H_{2s}(x,x),
$$

交差項は $\int_MH_s(x,z)H_s(y,z)dV_g(z)=H_{2s}(x,y)$、$y$ の平方項は $H_{2s}(y,y)$ なので所要の公式となる。$\square$
<!-- proof-end -->

### 円周の距離を具体的に計算する

単位円周では $\phi_0=(2\pi)^{-1/2}$、$k\ge1$ の二つの固有関数 $\cos(k\theta)/\sqrt\pi$、$\sin(k\theta)/\sqrt\pi$ は正規直交で、固有値はいずれも $k^2$。一つの波数 $k$ に対して

$$
\begin{aligned}
&(\cos(k\theta)-\cos(k\eta))^2
+(\sin(k\theta)-\sin(k\eta))^2\\
&=2-2\{\cos(k\theta)\cos(k\eta)+\sin(k\theta)\sin(k\eta)\}\\
&=2\{1-\cos(k(\theta-\eta))\}.
\end{aligned}
$$

この二重固有値の寄与を[熱核距離のスペクトル公式](#thm-mfl16-heat-spectrum)へ代入すると

$$
\mathcal D_s(\theta,\eta)^2
=\frac2\pi\sum_{k=1}^{\infty}e^{-2sk^2}
\{1-\cos(k(\theta-\eta))\}.
$$

特に対蹠点 $\eta=\theta+\pi$ では偶数 $k$ の寄与は0、奇数 $k$ の寄与は2なので

$$
\mathcal D_s(0,\pi)^2
=\frac4\pi\sum_{\substack{k\ge1\\k\ \mathrm{odd}}}e^{-2sk^2}.
$$

短時間の熱核距離は多くの高周波を含み、長時間では最も小さい正の固有値の成分が支配する。ただし **$s\downarrow0$ での点間距離の正規化なしの極限は一般に測地距離ではない**。

## 7. 一歩 $\varepsilon$ と熱時間 $s$ をどう接続するか

有限Markov行列の $t$ 歩を熱時間 $s$ に見立てるには、通常 $t\approx s/\varepsilon$ と置く。[MFL15の極限generator](../MFL15/index.md#thm-mfl15-generator)では $\alpha=1$ の一次係数が $\Delta_g$ になるから、形式的に

$$
P_\varepsilon f=f+\varepsilon\Delta_gf+o(\varepsilon),
\qquad (P_\varepsilon)^{\lfloor s/\varepsilon\rfloor}f
\quad\text{と}\quad e^{s\Delta_g}f
$$

を比較したくなる。しかし $\Delta_g$ は無限次元の $L^2$ では一般に有界作用素でなく、$P_\varepsilon$ は点群のサイズや定常内積も変わり得る。上の「固定された滑らかな $f$」の式から、全固有空間の収束や核距離の収束をそのまま結論することはできない。

時間発展を比較するための十分条件を、まず**固定した有限次元模型**で証明する。

<a id="prop-mfl16-time-limit"></a>

<!-- formal-statement-start -->
> **命題（有限次元generator近似からの熱時間極限）**
> 一つの固定した有限次元実Hilbert空間で $A=A^*$、$\langle v,Av\rangle\le0$ とする。$h>0$ に対し線形作用素 $P_h$ が同じノルムで $\|P_h\|\le1$ を満たし、ある定数 $C,h_0>0$ で

$$
\|P_h-(I+hA)\|\le Ch^2\qquad(0<h<h_0)
$$

> が成り立つとする。任意の固定 $s\ge0$ に対して、整数 $k_h=\lfloor s/h\rfloor$ とおけば

$$
\lim_{h\downarrow0}\|P_h^{k_h}-e^{sA}\|=0.
$$
<!-- formal-statement-end -->

### 証明の見取り図

一歩の誤差は $O(h^2)$。約 $s/h$ 歩の積を望む半群と比較するため、積の差を各歩の差の和に展開する。両方の時間発展が縮小写像なので、誤差は歩数倍までしか増えない。

<!-- proof-start -->
### 証明

$A$ は固定次元の内積に関して対称なので、正規直交基底を選んだ行列は実対称となる。その固有値 $a_j\le0$ に対して $e^{hA}$ は $e^{ha_j}\in(0,1]$ を掛ける。ゆえに $\|e^{hA}\|\le1$。行列指数級数の剰余を積分形で書けば

$$
e^{hA}-I-hA
=\int_0^h(h-u)A^2e^{uA}\,du,
\qquad \|e^{hA}-I-hA\|\le\frac{h^2}2\|A\|^2.
$$

一歩の誤差仮定と直前の剰余評価を合わせると $\|P_h-e^{hA}\|\le(C+\|A\|^2/2)h^2$。整数 $k\ge1$ について積の差は

$$
P_h^k-(e^{hA})^k
=\sum_{r=0}^{k-1}P_h^{k-1-r}(P_h-e^{hA})(e^{hA})^r
$$

と恒等的に展開できる。各因子のノルムは1以下なので

$$
\|P_h^{k_h}-e^{k_hhA}\|
\le k_h(C+\|A\|^2/2)h^2\le s(C+\|A\|^2/2)h.
$$

さらに $0\le s-k_hh<h$ に対し

$$
e^{sA}-e^{k_hhA}=\int_{k_hh}^{s}Ae^{uA}\,du,
\qquad\|e^{sA}-e^{k_hhA}\|\le\|A\|h.
$$

二つを足せば $O(h)$ で0に収束する。$s=0$ なら $k_h=0$ で双方とも $I$ である。$\square$
<!-- proof-end -->

この命題は固定次元の安全な橋だが、$n\to\infty$ で空間が変わるランダム点群へはそのまま適用できない。点群の関数を連続関数へ写す補間・比較写像、正規化測度の収束、必要なノルムやエネルギーの一様評価が別途要る。

<a id="prop-mfl16-mode"></a>

<!-- formal-statement-start -->
> **命題（固定モードの時間倍率と極限）**
> 固定した $\mu\ge0$、$s>0$ とし、$h\downarrow0$ に依存する実数 $\lambda_h$ が

$$
\lambda_h=1-h\mu+O(h^2)
$$

> を満たすとする。十分小さい $h$ で $\lambda_h>0$ であり、$k_h=\lfloor s/h\rfloor$ と置くと

$$
\lim_{h\downarrow0}\lambda_h^{k_h}=e^{-s\mu}.
$$
<!-- formal-statement-end -->

### 証明の見取り図

固有値を約 $s/h$ 回掛ける操作は、対数を取れば $k_h\log\lambda_h$ という積になる。

<!-- proof-start -->
### 証明

$\lambda_h\to1$ なので十分小さい $h$ では正。$z_h=\lambda_h-1=-h\mu+O(h^2)$ と置けば、$\log(1+z)=z+O(z^2)$ を $|z|\le1/2$ の範囲でTaylor展開して

$$
\log\lambda_h=-h\mu+O(h^2).
$$

$k_hh\to s$、$k_hh^2\le sh\to0$ なので $k_h\log\lambda_h=-\mu k_hh+O(k_hh^2)\to-s\mu$。指数関数の連続性から結論する。$\square$
<!-- proof-end -->

これは**対応する一つの固有値がすでにこの精度で近づくなら**時間倍率が一致するという条件付き結果である。$P_{n,\varepsilon}$ の固有値・固有関数がそのように振る舞うこと自体は、固有値ギャップ、補間、作用素または二次形式の収束、尾部の制御を伴う別の証明課題である。

同じことは単純な線形代数でも見える。$\ell^2$ 上の座標射影 $Q_Nf=\langle f,e_N\rangle e_N$ は任意の固定 $f\in\ell^2$ について $\|Q_Nf\|\to0$ だが $\|Q_N\|=1$ で、常に固有値1を持つ。固定ベクトルでの収束と作用素ノルム・スペクトルの収束が違うことを示す例である（$Q_N$ をMarkov行列だと主張してはいない）。

### Diffusion Maps と熱核距離が一致するためのチェックポイント

有限側の[距離のスペクトル表示](#thm-mfl16-identity)と連続側の[熱核距離の表示](#thm-mfl16-heat-spectrum)は同じ形をしているが、それだけで数値が近いわけではない。少なくとも次を論証する必要がある。

1. $\alpha=1$ など、極限generatorが狙う $\Delta_g$ に対応すること。$\alpha\ne1$ なら一般に重み付き熱作用素になる。
2. $P_{n,\varepsilon}$ の固有対を連続の固有関数と比較する補間・内積の整合、少なくとも興味ある有限個のモードの固有値・固有空間の収束。
3. $t\varepsilon\to s>0$ としたときの $\lambda_{n,\varepsilon}^{t}$ の時間倍率、および切り捨てた高周波の二乗和の一様な制御。
4. 点群のサンプリング・帯域幅・密度下界・境界・ノイズ等の仮定の検査。$n$ 固定で $\varepsilon\downarrow0$ とするだけでは十分でない。

このうち有限モードの条件付き時間倍率は上の命題で示した。一般のランダム点群に対するspectral consistencyは、後続MFL18・MFL19でさらに条件を分けて扱う。

## 8. Python再現実験：反復と固有距離は本当に一致するか

[diffusion_maps_lab.py](diffusion_maps_lab.py) はPython標準ライブラリのみで動き、次を独立に計算する。

1. 円周上の等間隔点 $x_i=(\cos(2\pi i/n),\sin(2\pi i/n))$ の核 $W_{ij}=\exp(-\|x_i-x_j\|^2/(4\varepsilon))$ を作り、$P,\pi$ を計算する。
2. $P^t$ を行列積の反復で計算し、[定義式](#def-mfl16-distance)から全点対の二乗距離を求める。
3. 対称変換 $B=\Pi^{1/2}P\Pi^{-1/2}$ をJacobi法で対角化し、**全固有モードを含めた**[スペクトル式](#thm-mfl16-identity)と比較する。

`--n` は点数、`--epsilon` は核の二乗距離の分母に使う帯域幅、`--time` は整数のMarkov歩数を変える。距離の違いと、二つの計算方法が一致することの違いに注意する。

```python-file-lab
# lab-id: MFL16-DIFFUSION-MAPS-FILE
# lab-title: Diffusion Mapsの固有距離とMarkov反復
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL16/diffusion_maps_lab.py
# timeout-ms: 30000
# lab-preset: 円周・短時間 | --mode circle --n 12 --epsilon 0.15 --time 1
# lab-preset: 円周・長時間 | --mode circle --n 12 --epsilon 0.15 --time 8
# lab-preset: 円周・核幅大 | --mode circle --n 20 --epsilon 0.5 --time 3
# lab-preset: 非連結グラフ | --mode disconnected --n 10 --epsilon 0.2 --time 5
# lab-preset: 零固有値の例 | --mode zero --n 6 --epsilon 0.1 --time 1
```

`disconnected` モードでは半分ずつの頂点間の核重みを0にする。このとき[正値行列の固有値1の単純性](#thm-mfl16-spectrum)の仮定が失われ、固有値1が2個残るため、連結成分間の距離は長時間でも消えない。`zero` モードでは全ての重みを1にする。$P$ は全行が等しく、非定数固有値は0なので一歩で距離が0になる。これは零固有値の存在と非連結性が**別の現象**であることを示す。

非連結モードでも対称行列による全固有基底展開そのものは成立するが、固有値1が重複するため、**全ての**固有座標を使って照合する。実装は小行列向けの教育用Jacobi法であり、大規模点群の高速固有値計算や、点群から連続の熱核への収束を保証するものではない。`python diffusion_maps_lab.py --self-test` で、行和・定常性・全点対の距離恒等式と二つの特別なスペクトルを検算できる。

## 9. 演習：核・固有座標・熱時間をつなぐ

<a id="ex-mfl16-a01"></a>

### MFL16-A01 行確率と定常分布

- Level: A
- 問題: $W=\begin{pmatrix}2&1\\1&3\end{pmatrix}$ を対称重みとする。行和 $D_i$、$P_{ij}=W_{ij}/D_i$、$\pi_i=D_i/\sum_kD_k$ を求め、行確率・定常性・詳細釣合いを直接検算せよ。$P$ が通常の意味で対称かも答えよ。

**詳細解答。** 行和は $D_1=2+1=3$、$D_2=1+3=4$、$S=7$ である。従って

$$
P=\begin{pmatrix}2/3&1/3\\1/4&3/4\end{pmatrix},
\qquad \pi=(3/7,4/7).
$$

行和は $2/3+1/3=1$、$1/4+3/4=1$、全成分は正。詳細釣合いの非対角は $\pi_1P_{12}=(3/7)(1/3)=1/7$、$\pi_2P_{21}=(4/7)(1/4)=1/7$。対角はそれぞれ自身と等しい。定常性は

$$
(\pi P)_1=(3/7)(2/3)+(4/7)(1/4)=2/7+1/7=3/7,
$$

$$
(\pi P)_2=(3/7)(1/3)+(4/7)(3/4)=1/7+3/7=4/7
$$

で直接確かめられる。$P_{12}=1/3\ne1/4=P_{21}$ なので $P$ 自身は非対称。対称なのは[重み付き変換](#thm-mfl16-spectrum)後の行列である。

<a id="ex-mfl16-a02"></a>

### MFL16-A02 二点の時間減衰

- Level: A
- 問題: $P=\begin{pmatrix}3/4&1/4\\1/4&3/4\end{pmatrix}$、$\pi=(1/2,1/2)$ のとき、$D_0(1,2),D_1(1,2),D_2(1,2)$ を[diffusion distance](#def-mfl16-distance)の定義と固有値の双方から求めよ。

**詳細解答。** $P^0$ は単位行列なので二行差は $(1,-1)$、従って $D_0^2=1/(1/2)+1/(1/2)=4$、$D_0=2$。$P$ の二行差は $(1/2,-1/2)$ だから $D_1^2=(1/4)/(1/2)+(1/4)/(1/2)=1$、$D_1=1$。

二乗して

$$
P^2=\begin{pmatrix}
(3/4)^2+(1/4)^2&2(3/4)(1/4)\\
2(3/4)(1/4)&(3/4)^2+(1/4)^2
\end{pmatrix}
=\begin{pmatrix}5/8&3/8\\3/8&5/8\end{pmatrix}.
$$

二行差は $(1/4,-1/4)$ なので $D_2^2=(1/16)/(1/2)+(1/16)/(1/2)=1/4$、$D_2=1/2$。他方、非定数固有値は $\lambda_2=1/2$、固有ベクトル差は2であり、[diffusion distanceの固有展開](#thm-mfl16-identity)から任意の $t\ge0$ で $D_t=2(1/2)^t$。$t=0,1,2$ への代入が上の三値に一致する。

<a id="ex-mfl16-a03"></a>

### MFL16-A03 円周の偶奇モード

- Level: A
- 問題: 単位円周上で $x=0,y=\pi$ とする。[熱核距離の円周公式](#thm-mfl16-heat-spectrum)の $k$ 番目の寄与を求め、偶数 $k$ で0となり奇数 $k$ で $4e^{-2sk^2}/\pi$ となることを示せ。

**詳細解答。** 角度差は $-\pi$。整数 $k$ では $\cos(-k\pi)=(-1)^k$ なので、各波数の寄与は

$$
\frac2\pi e^{-2sk^2}\{1-(-1)^k\}.
$$

偶数 $k$ は括弧が0、奇数 $k$ は2で $4e^{-2sk^2}/\pi$。従って総和は $4\pi^{-1}\sum_{k\ge1,\,k\ \mathrm{odd}}e^{-2sk^2}$ となる。各項は非負で、$s>0$ のため $e^{-2sk^2}\le e^{-2sk}$、幾何級数で上から抑えられ、総和は収束する。

<a id="ex-mfl16-a04"></a>

### MFL16-A04 歩数と時間を混同しない

- Level: A
- 問題: $\lambda_h=1-3h+O(h^2)$ の固有モードがあるとする。$s=2$ に相当する歩数を選び、固有座標の重みが何に近づくか求めよ。また $\alpha=1$ と $\alpha=0$ の[MFL15のgenerator](../MFL15/index.md#thm-mfl15-generator)を比較し、非一様密度のとき両者が同じ熱半群とは限らない理由を述べよ。

**詳細解答。** $h$ は一歩の時間幅なので $k_h=\lfloor2/h\rfloor$ 歩を選ぶ。[固定モードの極限](#prop-mfl16-mode)へ $\mu=3,s=2$ を代入すると $\lambda_h^{k_h}\to e^{-6}$。時刻2を「2歩」として $\lambda_h^2\to1$ とするのは尺度の取り違えである。

[MFL15のgenerator](../MFL15/index.md#thm-mfl15-generator)は $L_\alpha f=\Delta_gf+2(1-\alpha)\langle\nabla_g\log p,\nabla_gf\rangle_g$。$\alpha=1$ では第二項が0だが、$\alpha=0$ では $2\langle\nabla_g\log p,\nabla_gf\rangle_g$ が残る。$p$ が非定数でこの内積が非零の関数なら生成作用素が異なり、同じ熱発展と同一視できない。

<a id="ex-mfl16-b01"></a>

### MFL16-B01 非対称な確率行列の固有座標

- Level: B
- 問題: A01の $W$ と $P$ の固有値を全て求め、$\pi$ 正規直交固有ベクトルを構成せよ。$D_t(1,2)$ を求め、$t=0$ では定義式の値と一致することを確認せよ。

**詳細解答。** 行確率だから $\lambda_1=1$、$\psi_1=(1,1)^T$ である。$2\times2$ 行列の固有値の和は跡に等しいので、もう一つは

$$
\lambda_2=\operatorname{tr}P-1
=\frac23+\frac34-1=\frac5{12}.
$$

$\pi$ に直交する非定数ベクトルは $3v_1+4v_2=0$ を満たす。$v=(4,-3)^T$ を選ぶと $\|v\|_\pi^2=(3/7)16+(4/7)9=12$。従って

$$
\psi_2=\frac1{\sqrt{12}}(4,-3)^T
=\left(\frac2{\sqrt3},-\frac{\sqrt3}2\right)^T.
$$

実際、$P\psi_2=(5/12)\psi_2$ は一行目 $(2/3)(4)+(1/3)(-3)=5/3=(5/12)4$、二行目 $(1/4)4+(3/4)(-3)=-5/4=(5/12)(-3)$ で確認できる。二点の固有座標差は

$$
\psi_2(1)-\psi_2(2)=\frac2{\sqrt3}+\frac{\sqrt3}2=\frac7{2\sqrt3}.
$$

よって[スペクトル表示](#thm-mfl16-identity)から

$$
D_t(1,2)^2=\frac{49}{12}\left(\frac5{12}\right)^{2t},
\qquad D_t(1,2)=\frac7{2\sqrt3}\left(\frac5{12}\right)^t.
$$

$t=0$ の定義式では行差が $(1,-1)$ なので $D_0^2=1/(3/7)+1/(4/7)=7/3+7/4=49/12$ と一致する。

<a id="ex-mfl16-b02"></a>

### MFL16-B02 切り捨て距離と縮小

- Level: B
- 問題: 可逆Markov行列の非定数固有対が $\lambda_2=0.9$、$\lambda_3=0.5$、残りの固有値は0とする。ある二頂点 $i,j$ で $\psi_2(i)-\psi_2(j)=2$、$\psi_3(i)-\psi_3(j)=1$、その他の非定数差は0とする。$t=2$ で全距離の二乗と1座標だけの二乗距離およびその損失を求めよ。一般に $D_{t+1}\le D_t$ である理由を説明せよ。

**詳細解答。** [スペクトル公式](#thm-mfl16-identity)へ値を代入すると

$$
D_2^2=(0.9)^{4}\cdot2^2+(0.5)^4\cdot1^2
=0.6561\cdot4+0.0625=2.6869.
$$

最初の1座標だけなら二乗距離は $2.6244$、損失は $0.0625$。切り捨てた成分の寄与を引いたので負にはならない。一般には[時間単調性](#prop-mfl16-time)の証明のとおり、各二乗項に $|\lambda_\ell|^2\le1$ が一度追加されるだけだから $D_{t+1}^2\le D_t^2$。この議論は非定数固有値が負であっても成立する。

<a id="ex-mfl16-b03"></a>

### MFL16-B03 固定二点模型の連続時間極限

- Level: B
- 問題: 固定 $q>0$ と $0<h<1/(2q)$ について

$$
P_h=\begin{pmatrix}1-hq&hq\\hq&1-hq\end{pmatrix}
$$

  を考える。$P_h$ の固有値と定常分布を求め、$k_h=\lfloor s/h\rfloor$ での $D_{k_h}(1,2)$ の極限を求めよ。生成行列 $A=(P_h-I)/h$ を明示して、[有限次元時間極限定理](#prop-mfl16-time-limit)の仮定を確認せよ。

**詳細解答。** 両行の和は1、非対角が $hq>0$、対角は $1-hq>0$ で対称だから $\pi=(1/2,1/2)$。定数ベクトルの固有値は1、$(1,-1)^T$ には

$$
P_h(1,-1)^T=(1-2hq)(1,-1)^T
$$

と作用する。$0<hq<1/2$ だから $0<1-2hq<1$。[二点の距離公式](#thm-mfl16-identity)から

$$
D_{k_h}(1,2)=2(1-2hq)^{k_h}\longrightarrow 2e^{-2qs}
$$

となる。[固定モードの時間倍率](#prop-mfl16-mode)で $\mu=2q$ を代入した。さらに

$$
A=\frac{P_h-I}{h}=\begin{pmatrix}-q&q\\q&-q\end{pmatrix}
$$

は $h$ に依らない実対称行列で、固有値 $0,-2q$ が非正である。$P_h=I+hA$ なので誤差は厳密に0、かつ固有値 $1,1-2hq$ の絶対値が1以下だから $\|P_h\|_2\le1$。従って[時間極限定理](#prop-mfl16-time-limit)が適用でき、$P_h^{k_h}\to e^{sA}$。ただしこれは二点の固定空間の事実であり、全円周の熱核への近似を意味しない。

<a id="ex-mfl16-b04"></a>

### MFL16-B04 負の固有値と可逆性

- Level: B
- 問題: $W=\begin{pmatrix}1&3\\3&1\end{pmatrix}$ に対して $P,\pi,\lambda_2$ と $D_t(1,2)$ を求めよ。また、もし $P$ が可逆でなかったら[本章の固有距離公式](#thm-mfl16-identity)を同じ実直交固有基底で使えるとは限らない理由を述べよ。

**詳細解答。** 各行和は4、$P=W/4$、$\pi=(1/2,1/2)$。$P(1,-1)^T=(-1/2)(1,-1)^T$ なので $\lambda_2=-1/2$。重み付きノルムは1、二点での固有関数値の差は2だから

$$
D_t(1,2)^2=(-1/2)^{2t}\cdot4=4\cdot4^{-t},
\qquad D_t(1,2)=2\cdot2^{-t}.
$$

負の固有値でも距離は非負で単調に縮む。符号が現れるのは固有座標 $(-1/2)^t\psi_2$ の向きであって距離の大きさではない。[固有基底の証明](#thm-mfl16-spectrum)では $\pi_iP_{ij}=\pi_jP_{ji}$ を使って $B=\Pi^{1/2}P\Pi^{-1/2}$ を対称にした。非可逆な $P$ では一般に $B_{ij}\ne B_{ji}$ となり、この対称行列の直交固有基底の議論は使えない。非可逆連鎖の距離を扱うには別の特異値分解等の構成が必要となる。

<a id="ex-mfl16-c01"></a>

### MFL16-C01 有限diffusionから熱へ、どこまで言えるか

- Level: C
- 問題: $q>0$、$0<h<1/(2q)$ とし、対称重み $W_h=\begin{pmatrix}1-hq&hq\\hq&1-hq\end{pmatrix}$ から行正規化した $P_h$ を作る。次を順に示せ。

  1. 有限diffusion distance と全Diffusion Maps座標の距離を任意の歩数 $t$ で計算せよ。
  2. $k_h=\lfloor s/h\rfloor$ として $h\downarrow0$ をとり、生成作用素・有限時間極限・距離の極限を導け。
  3. 同じ $s>0$ での単位円周の対蹠点の熱核diffusion distanceを固有関数から計算し、2の有限模型と一般には同一視できない数学的理由を説明せよ。
  4. $n$ 点の非一様密度標本に模型を拡張する場合、[MFL15のgenerator](../MFL15/index.md#thm-mfl15-generator)の点ごとの収束だけでは不足する条件を二つ以上挙げよ。

**詳細解答。**

1. 行和は $(1-hq)+hq=1$ なので $P_h=W_h$。対称性から $\pi=(1/2,1/2)$ が定常で、$\psi_1=(1,1)^T$、$\psi_2=(1,-1)^T$ は $\pi$ 正規直交基底となる。固有値は $1$ と $1-2hq$。従って $\Psi_t(1)=(1-2hq)^t$、$\Psi_t(2)=-(1-2hq)^t$。二点距離は

$$
D_t(1,2)=\|\Psi_t(1)-\Psi_t(2)\|=2(1-2hq)^t.
$$

2. 生成行列は $A=(P_h-I)/h=\begin{pmatrix}-q&q\\q&-q\end{pmatrix}$。固有値 $0,-2q$ なので $e^{sA}$ は定数モードを保持し、差モードを $e^{-2qs}$ 倍する。例えば固有射影を成分で書けば

$$
e^{sA}=\frac12\begin{pmatrix}
1+e^{-2qs}&1-e^{-2qs}\\
1-e^{-2qs}&1+e^{-2qs}
\end{pmatrix}.
$$

  $P_h=I+hA$ かつ $\|P_h\|\le1$ より[有限次元時間極限定理](#prop-mfl16-time-limit)を適用でき、$P_h^{k_h}\to e^{sA}$。あるいは $k_h\log(1-2hq)=-2qk_hh+O(k_hh^2)\to-2qs$ を直接計算してもよい。従って

$$
\lim_{h\downarrow0}D_{k_h}(1,2)=2e^{-2qs}.
$$

3. 単位円周の固有値は $k^2$、$k\ge1$ の固有関数は $\cos(k\theta)/\sqrt\pi$ と $\sin(k\theta)/\sqrt\pi$。対蹠点 $(0,\pi)$ では $\cos(k\pi)=(-1)^k$、$\sin(k\pi)=0$。したがって[熱核距離の固有展開](#thm-mfl16-heat-spectrum)から

$$
\mathcal D_s(0,\pi)^2=\frac4\pi\sum_{\substack{k\ge1\\k\ \mathrm{odd}}}e^{-2sk^2}.
$$

  2の $2e^{-2qs}$ は二点生成行列の一つの非定数固有値だけから出る。一方、円周の式には無限個の奇数波数が寄与し、重みも体積測度に関する正規化である。二点模型では空間の補間も円周の高周波の制御もないため、両者の等号を主張できない。

4. まず $\alpha=1$ を選んで密度driftを消すのが体積熱半群を目指す場合の出発点となる。しかし有限標本では $P_{n,\varepsilon}$ の固有対が $L_g$ の固有対に近づくとはまだ示していない。例えば（i）点群上の関数と $L^2(M,dV_g)$ を比較する補間・内積の整合と固有値・固有空間の収束、（ii）$t\varepsilon\to s$ での時間倍率と高周波尾部の一様制御、（iii）$n$ と $\varepsilon$ の同時極限に関する確率誤差の評価が別途必要となる。[MFL14の標本平均の集中](../MFL14/index.md#cor-mfl14-generator)もそのまま補正済み全固有空間の収束に置き換わるわけではない。

## 10. まとめ

- 可逆有限Markov行列では、遷移確率の行の差と固有座標のEuclid距離が**全座標で厳密に一致**する。定常重み $\pi$ と正規化を落とさない。
- 歩数 $t$ は見える尺度を変える。長時間では非定数固有モードが減衰し、全点間距離は0へ縮む。2〜3座標だけの可視化には切り捨て誤差がある。
- 連続の体積熱核でも $L^2$ 距離が $e^{-s\mu_\ell}$ 倍の固有関数座標で表せる。ただし $s>0$ と測度を固定する。
- $t\varepsilon\to s$ という時間の対応は重要だが、点ごとのgenerator整合性からランダム点群の全スペクトル収束を結論してはいけない。

次章MFL17では境界・局所幅・密度変化が、この拡散の核と境界条件へどのように影響するかを調べる。
