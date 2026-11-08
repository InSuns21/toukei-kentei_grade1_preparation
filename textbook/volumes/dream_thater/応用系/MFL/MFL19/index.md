# MFL19 作用素整合性からスペクトル収束へ

<!-- definition-example-audit: strict -->

## 1. 一つずつ近づく波と、固有空間全体が近づくこと

[MFL18の周期差分の完全固有分解](../MFL18/index.md#thm-mfl18-complete)では、波数を固定すれば差分固有値が連続円周の固有値へ近づくことを示した。だが点群から作る一般の作用素では、すべての固有ベクトルが Fourier 波だとは分からない。**固定した試験関数に対する誤差が小さいだけで、低い固有値の近くに未知の高周波モードが紛れ込まないか**、が次の問題になる。

以下の円周は半径 $R>0$、周長 $L=2\pi R$、弧長座標 $s\in[0,L]$ の両端を同一視したものとする。$N\ge3$、$h=L/N$、$s_j=jh$ とし、添字 $j$ は $N$ 周期で読む。

離散ベクトルは $v=(v_0,\ldots,v_{N-1})\in\mathbb C^N$ とし、複素共役を $\overline z$ で表す。$L^2_{\rm per}(0,L)$ は周期的な平方可積分関数の空間である。

以下の $H^1_{\rm per}(0,L)$ は、関数とその弱導関数がともに $L^2$ に属し、両端の値が一致する関数の空間で、1次元では連続な代表を取れる。エネルギーを $Q(u)=\int_0^L|u'(s)|^2\,ds$ とする。[GA4のRayleigh商とmin–max原理](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)を、ここではこの周期区間へ適用する。

離散の非負作用素 $A_N$ とその質量内積・エネルギーを次で固定する。$v$ の隣接点間を**直線で結んだ周期折線**を $J_Nv$ と記す。これは[MFL18の三角補間](../MFL18/index.md#def-mfl18-interpolation)とは別の補間であり、同じ格子値から得られても格子間での形が違う。

<a id="def-mfl19-linear-form"></a>

<!-- formal-statement-start -->
> **定義（周期折線補間と離散二次形式）**  
> $R>0$、$N\ge3$、$h=2\pi R/N$ とする。$v,w\in\mathbb C^N$ に対し、$s_j\le s\le s_{j+1}$ 上で $t=(s-s_j)/h$ と置き、

$$
(J_Nv)(s)=(1-t)v_j+tv_{j+1}
$$

> と定める。最後の区間では $v_N=v_0$ とする。質量形式 $m_N$、剛性形式 $q_N$、差分作用素 $A_N$ を

$$
\begin{aligned}
m_N(v,w)&=h\sum_{j=0}^{N-1}\overline{v_j}w_j,\\
q_N(v,w)&=\frac1h\sum_{j=0}^{N-1}\overline{(v_{j+1}-v_j)}(w_{j+1}-w_j),\\
(A_Nv)_j&=\frac{2v_j-v_{j-1}-v_{j+1}}{h^2}
\end{aligned}
$$

> とする。$m_N(v)=m_N(v,v)$、$q_N(v)=q_N(v,v)$ と略記し、$v\ne0$ の離散Rayleigh商を $\mathcal R_N(v)=q_N(v)/m_N(v)$ と呼ぶ。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl19-linear-form -->
**定義の確認**：定数列と一山の折線。$v_j=c$ なら各区間で $J_Nv=c$、差分が零なので $q_N(v)=0$、$m_N(v)=L|c|^2$。$c\ne0$ なら分母は正でRayleigh商は0となる。一方 $N=4$、$v=(1,0,0,0)$ なら、隣接差が非零なのは $(v_1-v_0)=-1$、$(v_0-v_3)=1$ の二辺だけで、$m_4(v)=h$、$q_4(v)=2/h$、$\mathcal R_4(v)=2/h^2$。折線の導関数も、その二辺でそれぞれ $-1/h$ と $1/h$、残りで0である。格子の行列式を計算せずに、**定義した剛性がどの変化を測るか**確かめられる。
<!-- definition-example-end -->

## 2. 離散の質量と連続の質量は、完全には同じでない

セルごとの折線は導関数が定数なので、剛性と連続のDirichletエネルギーが正確に一致する。一方、頂点だけの質量 $m_N$ と折線全体の $L^2$ 質量には小さな差がある。この差を無視すると、補間した固有ベクトルの正規直交性を誤って断言してしまう。

<a id="lem-mfl19-mass-energy"></a>

<!-- formal-statement-start -->
> **補題（周期折線補間の厳密な質量・エネルギー恒等式）**  
> $R>0$、$N\ge3$、$h=2\pi R/N$ とし、前節の $J_N,m_N,q_N$ を使う。任意の $v,w\in\mathbb C^N$ に対し、

$$
\begin{aligned}
\int_0^L\overline{(J_Nv)'(s)}(J_Nw)'(s)\,ds&=q_N(v,w)=m_N(v,A_Nw),\\
\int_0^L\overline{J_Nv(s)}J_Nw(s)\,ds&=m_N(v,w)-\frac{h^2}{6}q_N(v,w).
\end{aligned}
$$

> 特に $0\le\|J_Nv\|_2^2\le m_N(v)$ かつ $\|J_Nv\|_2^2=m_N(v)-h^2q_N(v)/6$ である。
<!-- formal-statement-end -->

### 証明の見取り図

1セルの端点を $a,b$ とすれば折線は $(1-t)a+tb$ で、$\int_0^1t^2dt=1/3$、$\int_0^1t(1-t)dt=1/6$ を使えばよい。2本の折線の積まで計算しておくと後で固有値方程式を弱形式へ移せる。

<!-- proof-start -->
### 証明

第 $j$ セルで $s=s_j+ht$ とすると、導関数は $(v_{j+1}-v_j)/h$、$ds=h\,dt$ だから

$$
\int_{s_j}^{s_{j+1}}\overline{(J_Nv)'}(J_Nw)'\,ds
=\frac1h\overline{(v_{j+1}-v_j)}(w_{j+1}-w_j).
$$

一方、折線自身の積の積分を展開すると

$$
\begin{aligned}
\int_{s_j}^{s_{j+1}}\overline{J_Nv}J_Nw\,ds
&=\frac h3\overline{v_j}w_j+\frac h6\overline{v_j}w_{j+1}\\
&\quad+\frac h6\overline{v_{j+1}}w_j+\frac h3\overline{v_{j+1}}w_{j+1}\\
&=\frac h2(\overline{v_j}w_j+\overline{v_{j+1}}w_{j+1})\\
&\quad-\frac h6\overline{(v_{j+1}-v_j)}(w_{j+1}-w_j).
\end{aligned}
$$

全セルを和すると頂点項は各頂点を二度数えるため $m_N(v,w)$ となり、差分項は $h^2q_N(v,w)/6$ になる。最後に $q_N(v,w)$ を展開し、添字 $j\mapsto j-1$ の周期的な付け替えを行うと

$$
\begin{aligned}
q_N(v,w)&=\frac1h\sum_j\overline{v_j}(2w_j-w_{j+1}-w_{j-1})\\
&=h\sum_j\overline{v_j}(A_Nw)_j=m_N(v,A_Nw).
\end{aligned}
$$

$v=w$ とすれば実数非負の二次形式が得られる。$\square$
<!-- proof-end -->

$m_N(v)=1$、$q_N(v)\le C$ の列では $\|J_Nv\|_2^2=1+O(h^2)$ となる。**エネルギー上界のない列**に対しては、この近似は言えない。

## 3. 固定した試験関数の近似だけでは何が欠けるか

点ごとの作用素近似を議論するとき、毎回変わる格子上の関数 $v_N$ と、先に固定した滑らかな関数 $f$ の標本 $S_Nf=(f(s_j))_j$ を区別する。前者には格子幅とともに高くなる振動があり得る。

<a id="def-mfl19-pointwise"></a>

<!-- formal-statement-start -->
> **定義（固定試験関数の作用素整合性）**  
> $R>0$、$N\ge3$、$h=2\pi R/N$ とする。$B_N:\mathbb C^N\to\mathbb C^N$ を線形作用素、$L=-d^2/ds^2$ を周期円周の正のLaplacianとする。任意の**固定した**滑らかな周期関数 $f$ に対して

$$
\|B_NS_Nf-S_N(Lf)\|_{m_N}\longrightarrow0,
\qquad\|v\|_{m_N}=\sqrt{m_N(v)}
$$

> が成り立つとき、$B_N$ は固定試験関数に対して作用素整合的であるという。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl19-pointwise -->
**定義の確認**。$B_N=A_N$、$f(s)=\cos(s/R)$ とすると $S_Nf$ は[MFL18の離散固有モード](../MFL18/index.md#thm-mfl18-complete)で、

$$
A_NS_Nf-S_N(Lf)=(\lambda_{N,1}-R^{-2})S_Nf.
$$

$\|S_Nf\|_{m_N}=\sqrt{L/2}$（$N\ge3$）なので、[固定波数の定量評価](../MFL18/index.md#thm-mfl18-low-frequency)からノルム差は $O(N^{-2})$。これで一つの固定試験関数では条件を直接確かめられた。一般の固定滑らかな $f$ についても周期Taylor展開を $s_j$ の左右へ2次まで施すと、奇数次が消え、$A_NS_Nf-S_N(Lf)=O(h^2)$ が一様に成り立つ（例えば $f\in C^4$ なら4階導関数上界で評価できる）。
<!-- definition-example-end -->

作用素整合性は**固定した** $f$ についての収束であり、$N$ とともに変わる任意の単位ベクトルに一様とは言っていない。次に必要なのは「小さなエネルギーのベクトル列が、コンパクトな連続関数列になる」という制御である。

## 4. エネルギー上界からコンパクト性を得る

ここではコンパクト性を抽象的な名前だけで済ませず、1次元の不等式で導く。周期折線 $u_N=J_Nv_N$ では、任意の $s,t\in[0,L]$ に対してCauchy–Schwarzから

$$
|u_N(s)-u_N(t)|
=\left|\int_t^s u_N'(x)\,dx\right|
\le|s-t|^{1/2}\,q_N(v_N)^{1/2}.
$$

つまりエネルギーが一様有界なら折線は一様な $1/2$-Hölder評価を持つ。加えて $L^2$ ノルムが有界ならどこか一点の値が有界で、上式が全点の値を束縛する。これが「逃げていく高周波」が許されない仕組みである。

<a id="lem-mfl19-compactness"></a>

<!-- formal-statement-start -->
> **補題（エネルギー有界列のコンパクト性と下半連続性）**  
> $R>0$ を固定し、$N\to\infty$、$h=2\pi R/N$ とする。$v_N\in\mathbb C^N$ が

$$
\sup_N\bigl(m_N(v_N)+q_N(v_N)\bigr)<\infty
$$

> を満たすなら、$J_Nv_N$ の任意の部分列から $L^2(0,L)$ に収束するさらに部分列を取り出せる。その極限 $u$ は $H^1_{\rm per}(0,L)$ に属し、収束部分列について

$$
\|J_Nv_N-u\|_2\longrightarrow0,qquad
Q(u)\le\liminf_{N\to\infty}q_N(v_N)
$$

> が成り立つ。ただし最後の $\liminf$ は選んだ部分列に沿う。
<!-- formal-statement-end -->

### 証明の見取り図

上のHölder評価と一様有界性から、有限個の格子点での収束を対角的に選び、区間全体の一様収束に広げる。エネルギー下界は極限へ微分を無条件に通すのではなく、低いFourier係数の有限和から得る。

<!-- proof-start -->
### 証明

$m_N(v_N)\le C$ と[質量差の恒等式](#lem-mfl19-mass-energy)から $\|u_N\|_2\le\sqrt C$。従ってある $t_N$ で $|u_N(t_N)|\le\sqrt{C/L}$ が成立し、Hölder評価から全 $s$ で $|u_N(s)|\le\sqrt{C/L}+\sqrt{LC}$。一様な有界性と同程度の連続性が得られた。

$[0,L]$ 内の有理数点を順に並べ、各点の有界複素数列から収束部分列を逐次選ぶ。対角部分列では全有理数点で値が収束する。任意の $\eta>0$ に対し間隔が $\delta$ 以下となる有限個の有理数点を用意すれば、任意の $s$ と近い点 $r$ について

$$
|u_N(s)-u_M(s)|
\le 2\sqrt C\,\delta^{1/2}+|u_N(r)-u_M(r)|.
$$

$\delta$ を先に小さくし、有限個の点で $N,M$ を大きくすれば一様Cauchyになる。極限 $u$ は連続かつ周期的で、特に $L^2$ で収束する。

さらに$\liminf q_N(v_N)$ を実現する部分列へ取り直してよい。周長 $L$ の連続Fourier基底 $\phi_k(s)=L^{-1/2}e^{2\pi iks/L}$ と $\omega_k=2\pi k/L$ を使う。$c_{N,k}=\langle\phi_k,u_N\rangle_{L^2}$ は $u_N\to u$ により $c_k=\langle\phi_k,u\rangle$ に収束する。折線の周期性から部分積分して

$$
\langle\phi_k,u_N'\rangle_{L^2}
=i\omega_kc_{N,k}.
$$

有限個の正規直交関数に対するBessel不等式を導関数 $u_N'$ に適用すると、各 $K\ge0$ で

$$
\sum_{|k|\le K}\omega_k^2|c_{N,k}|^2
\le\|u_N'\|_2^2=q_N(v_N).
$$

有限和で極限を取った後に $K\to\infty$ とすれば $\sum_k\omega_k^2|c_k|^2\le\liminf q_N(v_N)$。ここで[GA4の形式領域と固有関数展開](../../../幾何系/GA/GA4/index.md#lem-ga4-form-domain)を長さ $L$ の円周へ適用する。$L^2$ のFourier係数についてこの重み付き級数が有限であることは $u\in H^1_{\rm per}$ を意味し、$Q(u)=\sum_k\omega_k^2|c_k|^2$。従って主張が得られる。$\square$
<!-- proof-end -->

この補題が与えるのは、**エネルギーが有界な列の強い $L^2$ コンパクト性**である。点ごとの作用素整合性だけには、この上界が含まれていない。

## 5. 連続関数を格子へ戻す：回復列

逆向きの橋も必要である。連続側の関数を格子へ標本化して、その質量とエネルギーを上から近似できなければ、min–maxの上界は出ない。ここでは1次元の $H^1$ 関数が絶対連続な代表を持ち、区間の増分が導関数の積分に等しいことを使う。

<a id="prop-mfl19-recovery"></a>

<!-- formal-statement-start -->
> **命題（周期H1関数の回復列）**  
> $R>0$、$N\ge3$、$h=2\pi R/N$ とし、任意の $u\in H^1_{\rm per}(0,L)$ の連続代表を格子で標本化した $v_N=S_Nu$ を取る。このとき

$$
\|J_Nv_N-u\|_{H^1(0,L)}\longrightarrow0,
\quad m_N(v_N)\longrightarrow\|u\|_2^2,
\quad q_N(v_N)\longrightarrow Q(u).
$$
<!-- formal-statement-end -->

### 証明の見取り図

折線の傾きは区間での $u'$ の平均値である。連続関数の小区間平均は元の関数へ近づき、一般の $L^2$ 関数にも近似で拡張できる。質量は補間後の質量と $h^2q_N/6$ の和へ戻す。

<!-- proof-start -->
### 証明

各セル $I_j=[s_j,s_{j+1}]$ で絶対連続性から

$$
(J_NS_Nu)'\big|_{I_j}
=\frac{u(s_{j+1})-u(s_j)}h
=\frac1h\int_{I_j}u'(x)\,dx.
$$

$P_Ng$ を各セル上で $g$ の平均値を取る階段関数とすると、上式は $(J_NS_Nu)'=P_Nu'$ を意味する。Cauchy–Schwarzから $\|P_Ng\|_2\le\|g\|_2$。連続な $g$ なら一様連続性により $\|P_Ng-g\|_2\to0$。一般の $g\in L^2$ は連続関数 $g_\eta$ で $\|g-g_\eta\|_2<\eta$ と近似でき、

$$
\|P_Ng-g\|_2
\le2\eta+\|P_Ng_\eta-g_\eta\|_2\longrightarrow\le2\eta
$$

だから $\eta\to0$ で $P_Nu'\to u'$ が $L^2$ で成立する。また $s\in I_j$ なら

$$
|J_NS_Nu(s)-u(s)|
\le |u(s)-u(s_j)|+|u(s_{j+1})-u(s_j)|
\le2h^{1/2}\|u'\|_2.
$$

したがって $L^2$ と導関数の双方が収束する。さらに[補題の恒等式](#lem-mfl19-mass-energy)を使い $m_N(v_N)=\|J_Nv_N\|_2^2+h^2q_N(v_N)/6$、$q_N(v_N)=\|(J_Nv_N)'\|_2^2\to Q(u)$ を代入すると質量も収束する。$\square$
<!-- proof-end -->

## 6. min–maxで固有値を両側から挟む

[GA4のmin–max原理](../../../幾何系/GA/GA4/index.md#thm-ga4-minmax)は、**$k+1$ 次元の関数空間の中で最大Rayleigh商を測り、そうした空間の中で最小にする**という固有値の特徴付けである。離散側は $m_N$ が正定値、$q_N$ が非負なので同じ有限次元の原理を使える。固有値は両側とも小さい順に、重複度込みで $k=0,1,\ldots$ と番号を付ける。

<a id="thm-mfl19-eigenvalues"></a>

<!-- formal-statement-start -->
> **定理（周期一次元の固有値収束）**  
> $R>0$、$L=2\pi R$、$N\ge3$、$h=L/N$ とし、$A_N$ を第1節の周期差分作用素、$L_g=-d^2/ds^2$ を周期円周の正のLaplacianとする。離散固有値 $0=\lambda_{N,0}\le\cdots\le\lambda_{N,N-1}$ と連続固有値 $0=\lambda_0\le\lambda_1\le\cdots$ を、重複度込みで小さい順に並べる。このとき各固定番号 $k\ge0$ について、$N>k$ で

$$
\lim_{N\to\infty}\lambda_{N,k}=\lambda_k.
$$

> 特に連続円周では $\lambda_0=0$、$\lambda_{2m-1}=\lambda_{2m}=m^2/R^2$（$m\ge1$）である。
<!-- formal-statement-end -->

### 証明の見取り図

上界では連続の最初の $k+1$ 本の滑らかな固有関数を格子へ**回復**して、離散min–maxの候補空間にする。下界では離散の最初の $k+1$ 本を折線にし、**コンパクト性**で連続空間の正規直交な $k+1$ 本を作る。後者に連続min–maxを適用する。これにより行列のサイズが増える場合も含めて挟み撃ちが成立する。

<!-- proof-start -->
### 証明

まず $k$ を固定し、連続側の最初の $k+1$ 本の正規直交固有関数を $\phi_0,\ldots,\phi_k$ とする。円周ではこれらは定数と正弦・余弦なので滑らかである。[回復列](#prop-mfl19-recovery)から $S_N\phi_i$ のGram行列は単位行列に、剛性行列は $\operatorname{diag}(\lambda_0,\ldots,\lambda_k)$ に収束する。実際、各成分 $m_N(S_N\phi_i,S_N\phi_j)$ と $q_N(S_N\phi_i,S_N\phi_j)$ は、対応するノルム収束と偏極恒等式で極限を持つ。

$k+1$ は固定なので、Gram行列が十分大きな $N$ で正定値になり $E_N=\operatorname{span}\{S_N\phi_0,\ldots,S_N\phi_k\}$ の次元は $k+1$。係数ベクトル $a\in\mathbb C^{k+1}$、$\|a\|=1$ の単位球面上でRayleigh商が一様に極限へ近づくため

$$
\limsup_{N\to\infty}\lambda_{N,k}
\le\lim_{N\to\infty}\max_{0\ne v\in E_N}\mathcal R_N(v)
=\lambda_k.
$$

下界を示すため、$\lambda_{N,k}$ の $\liminf$ を実現する部分列を選ぶ。上界より $\lambda_{N,k}$ はその部分列で一様有界である。各 $N$ で $m_N$ に関して正規直交な最初の $k+1$ 本の固有ベクトル $v_{N,0},\ldots,v_{N,k}$ を取ると、$m_N(v_{N,i})=1$、$q_N(v_{N,i})=\lambda_{N,i}\le\lambda_{N,k}\le C$。有限本なので[コンパクト性補題](#lem-mfl19-compactness)を反復適用し、共通部分列に沿って $J_Nv_{N,i}\to u_i$ とできる。

任意の $i,j$ について[質量差恒等式](#lem-mfl19-mass-energy)とCauchy–Schwarzによる $|q_N(v_{N,i},v_{N,j})|\le C$ から

$$
\langle J_Nv_{N,i},J_Nv_{N,j}\rangle_2
=\delta_{ij}-\frac{h^2}{6}q_N(v_{N,i},v_{N,j})
\longrightarrow\delta_{ij}.
$$

従って $u_0,\ldots,u_k$ は $L^2$ 正規直交であり、$F=\operatorname{span}\{u_0,\ldots,u_k\}$ は $k+1$ 次元である。$a=(a_0,\ldots,a_k)$ を固定して $w_N=\sum_ia_iv_{N,i}$ と置くと、[エネルギー有界列のコンパクト性と下半連続性](#lem-mfl19-compactness)と固有ベクトルの直交性から

$$
\begin{aligned}
Q\!\left(\sum_ia_iu_i\right)
&\le\liminf_Nq_N(w_N)\\
&=\liminf_N\sum_i\lambda_{N,i}|a_i|^2
\le\left(\liminf_N\lambda_{N,k}\right)\sum_i|a_i|^2.
\end{aligned}
$$

ここで選んだ部分列では $\lambda_{N,k}$ 自身が収束することに注意する。また $\|\sum_ia_iu_i\|_2^2=\sum_i|a_i|^2$。連続min–maxを $F$ へ適用すれば

$$
\lambda_k\le\max_{0\ne u\in F}\frac{Q(u)}{\|u\|_2^2}
\le\liminf_N\lambda_{N,k}.
$$

上界と合わせて収束する。最後の固有値の列は[GA4の円周スペクトル](../../../幾何系/GA/GA4/index.md#thm-ga4-spectral-basis)を半径 $R$ の弧長に直したもの、あるいは $\cos(ms/R),\sin(ms/R)$ の二階微分から直接得られる。$\square$
<!-- proof-end -->

この証明で上界に効いたのが回復列、下界に効いたのがコンパクト性と下半連続性である。一つを欠くと片側の不等式しか証明できない。

## 7. 固有ベクトルの代わりに固有空間を比較する

半径 $R$ の円周の第一正固有値 $R^{-2}$ には、正弦と余弦という2本の独立な固有関数がある。数値ソルバーが返す二つの正規直交ベクトルは、その平面内で回転してもよい。したがって「余弦ベクトルそのものへ収束」は自然な主張ではない。

部分空間 $E\subset L^2$ への直交射影 $P_E$ は、$f$ を $E$ 内の最も近い成分へ写す作用素である。有限次元正規直交基底 $e_1,\ldots,e_m$ があれば $P_Ef=\sum_i\langle e_i,f\rangle e_i$ となる。二つの同じ次元の部分空間を、射影の差の最大作用で比較する。

<a id="def-mfl19-projection"></a>

<!-- formal-statement-start -->
> **定義（固有空間の射影距離）**  
> $H=L^2_{\rm per}(0,L)$ とし、有限次元閉部分空間 $E,F\subset H$ の直交射影を $P_E,P_F$ とする。射影距離を

$$
d_{\rm proj}(E,F)=\|P_E-P_F\|_{H\to H}
=\sup_{\|f\|_2=1}\|(P_E-P_F)f\|_2
$$

> と定義する。
<!-- formal-statement-end -->

<!-- definition-example-start: def-mfl19-projection -->
**定義の確認**。$E=\operatorname{span}\{e_1,e_2\}$、$F=\operatorname{span}\{(e_1+e_2)/\sqrt2,(e_1-e_2)/\sqrt2\}$ とし、$e_1,e_2$ を $H$ の正規直交な二関数とする。両組が同じ2次元空間を張るので $P_Ef=P_Ff$ がすべての $f$ に対して成立し、$d_{\rm proj}(E,F)=0$。しかし対応する基底ベクトル間の距離は0でない。射影距離は基底回転を誤差と数えない。
<!-- definition-example-end -->

<a id="thm-mfl19-eigenspaces"></a>

<!-- formal-statement-start -->
> **定理（孤立固有値群の固有空間収束）**  
> $R>0$ を固定し、第6節の $A_N$ と $L_g=-d^2/ds^2$ を用いる。$\lambda$ を $L_g$ の固有値とし、その重複度を $r\ge1$ とする。$\lambda=\lambda_a=\cdots=\lambda_{a+r-1}$、かつ隣接する異なる固有値とは正の間隔があるとする（$a=0$ なら左端は不要）。十分大きい $N$ における対応する $r$ 本の $m_N$-正規直交離散固有ベクトル $v_{N,a},\ldots,v_{N,a+r-1}$ の折線が張る $E_N\subset L^2$ と、連続固有空間 $E_\lambda=\ker(L_g-\lambda)$ について、

$$
d_{\rm proj}(E_N,E_\lambda)\longrightarrow0.
$$

> 異なる固有値間に間隔があることは、対象の固有値群を番号で一意に切り出すために必要である。群の内部で個々の基底の向きは定まらない。
<!-- formal-statement-end -->

### 証明の見取り図

有界な固有値を持つ固有ベクトルはコンパクト性で連続関数へ近づく。差分の固有方程式を滑らかな試験関数に掛け、折線の導関数の弱収束と質量差の恒等式によって連続の弱固有方程式へ移す。極限が $E_\lambda$ の正規直交基底 $r$ 本になるので、部分空間の射影が近づく。

<!-- proof-start -->
### 証明

[固有値収束](#thm-mfl19-eigenvalues)によって対象の $r$ 本の固有値は $\lambda$ に収束し、隣の固有値とは分離している。各固有ベクトルは質量1、エネルギー $\lambda_{N,i}$ が有界である。

任意の $N$ の部分列から[コンパクト性補題](#lem-mfl19-compactness)によってさらに部分列を選び、全 $r$ 本について $J_Nv_{N,i}\to u_i$ を強い $L^2$ 収束にできる。[質量差の恒等式](#lem-mfl19-mass-energy)から $\langle u_i,u_j\rangle_2=\delta_{ij}$。

各 $i$ の極限が固有関数であることを確認する。滑らかな周期関数 $\psi$ を固定し、$z_N=S_N\psi$ と置く。[周期折線の質量・エネルギー恒等式](#lem-mfl19-mass-energy)を $z_N,v_{N,i}$ に適用する。次に固有方程式 $A_Nv_{N,i}=\lambda_{N,i}v_{N,i}$ を代入すると

$$
\int_0^L\overline{(J_Nz_N)'}(J_Nv_{N,i})'\,ds
=q_N(z_N,v_{N,i})
=\lambda_{N,i}m_N(z_N,v_{N,i}).
$$

[回復列](#prop-mfl19-recovery)より $J_Nz_N\to\psi$ は $H^1$ で強収束する。一方 $(J_Nv_{N,i})'$ は $L^2$ で有界であり、任意の滑らかな $\eta$ に対して周期部分積分から

$$
\int_0^L\overline\eta (J_Nv_{N,i})'\,ds
=-\int_0^L\overline{\eta'}J_Nv_{N,i}\,ds
\longrightarrow-\int_0^L\overline{\eta'}u_i\,ds.
$$

従って導関数は $u_i'$ に弱収束する（滑らかな関数は $L^2$ で稠密）。さらに質量と補間内積の差は $h^2q_N(z_N,v_{N,i})/6$ で、Cauchy–Schwarzと両エネルギーの有界性から零へ行く。よって極限を取ると

$$
\int_0^L\overline{\psi'}u_i'\,ds
=\lambda\int_0^L\overline\psi u_i\,ds.
$$

全ての滑らかな周期 $\psi$ について成立するので、$u_i$ は $-u_i''=\lambda u_i$ の弱解である。Fourier係数ごとに $\psi=\phi_k$ を代入すれば $(\omega_k^2-\lambda)\langle\phi_k,u_i\rangle=0$ で、$u_i$ は固有値 $\lambda$ に対応する正弦・余弦（零固有値なら定数）の線形結合である。つまり $u_i\in E_\lambda$。$r$ 本が正規直交なので次元 $r$ の $E_\lambda$ の基底を成す。

最後に各部分列で、折線の $L^2$ Gram行列は単位行列へ収束するので、[Gram–Schmidtの直交化](../../../基礎科目/F0/F0-00E1/index.md#thm-f0-00e1-gram-schmidt)により $E_N$ の $L^2$ 正規直交基底 $e_{N,i}$ を取り $e_{N,i}\to u_i$ とできる。任意の $\|f\|_2=1$ に対し

$$
\begin{aligned}
\|(P_{E_N}-P_{E_\lambda})f\|_2
&=\left\|\sum_i\langle e_{N,i},f\rangle e_{N,i}
-\sum_i\langle u_i,f\rangle u_i\right\|_2\\
&\le 2\sum_i\|e_{N,i}-u_i\|_2\longrightarrow0.
\end{aligned}
$$

この評価は $f$ に一様である。どの部分列からも射影距離が零へ行くさらに部分列が取れるため、元の列全体でも零へ収束する。$\square$
<!-- proof-end -->

実際の点群で固有空間の収束を主張する場合は、単に固有値が数値的に近いのを見ただけでは足りない。離散から連続への補間、安定なノルム・エネルギー、下半連続性、十分な回復列、固有値群を分離する間隔をそろえて初めてこの証明が使える。

## 8. 作用素整合的なのに余分な零固有値を持つ模型

「固定試験関数では全く問題ない」という条件の弱さを、同じ円周格子で明示する。偶数 $N\ge4$ の交互符号ベクトル $z_N(j)=(-1)^j/\sqrt L$ は、[MFL18のNyquist単独モード](../MFL18/index.md#thm-mfl18-complete)で、質量1、$A_Nz_N=(4/h^2)z_N$ を満たす。高周波だけを取り出す $m_N$-直交射影 $P_Nv=m_N(z_N,v)z_N$ を考え、$B_N=A_N-(4/h^2)P_N$ とする。

<a id="prop-mfl19-pollution"></a>

<!-- formal-statement-start -->
> **命題（点ごとの整合性からは従わないスペクトル収束）**  
> 半径 $R>0$ を固定し、偶数 $N\ge4$ に対して上の $B_N$ を定める。このとき $B_N$ は $m_N$ に関して自己共役・非負である。  
> 任意の固定された滑らかな周期関数 $f$ に対して[作用素整合性](#def-mfl19-pointwise)を満たす。しかし $B_N$ の零固有値は各 $N$ で少なくとも2重であり、連続円周の $L_g$ の零固有値は1重である。  
> 従って固定試験関数の作用素整合性だけから固有値の重複度や固有空間の収束は結論できない。
<!-- formal-statement-end -->

### 証明の見取り図

高周波の一つの固有値だけを0へ動かす。固定した低周波モードに対しては $P_N$ が消え、滑らかな関数では高周波への射影が十分速く小さくなる。それでも $z_N$ のエネルギーは $B_N$ で0になり、真の折線エネルギー $4/h^2$ を制御できなくなる。

<!-- proof-start -->
### 証明

$A_N$ と $P_N$ は[MFL18の完全Fourier基底](../MFL18/index.md#thm-mfl18-complete)で同時対角化できる。$z_N$ 以外の固有値は $A_N$ と同じ非負値、$z_N$ に対応する値だけが $4/h^2-4/h^2=0$ なので、$B_N$ は自己共役・非負である。定数ベクトル $\boldsymbol1$ も $B_N\boldsymbol1=0$、$m_N(\boldsymbol1,z_N)=0$ だから零固有値は少なくとも2重となる。

固定した $C^\infty$ 周期関数 $f$ を考える。$P_NS_Nf=m_N(z_N,S_Nf)z_N$ で、その係数は

$$
m_N(z_N,S_Nf)=\frac h{\sqrt L}\sum_{j=0}^{N-1}(-1)^jf(s_j)
=\frac h{\sqrt L}\sum_{j=0}^{N/2-1}\bigl(f(s_{2j})-f(s_{2j+1})\bigr).
$$

これを一回の差で評価するだけでは $O(h)$ で、$h^{-2}$ 倍を消すには足りない。そこで周期中央差分 $D_h^2f(s)=f(s+h)-2f(s)+f(s-h)$ を使う。交互符号の和 $T_N=\sum_j(-1)^jf(s_j)$ について周期的添字替えより

$$
\sum_j(-1)^jD_h^2f(s_j)=(-1-2-1)T_N=-4T_N.
$$

$f\in C^4$ なので $D_h^2f=h^2f''+O(h^4)$、同じ操作を $f''$ にもう一度用いると $T_N=O(Nh^4)=O(h^3)$ となる（$Nh=L$ は固定）。従って $|m_N(z_N,S_Nf)|=O(h^4)$ で

$$
\left\|\frac4{h^2}P_NS_Nf\right\|_{m_N}=O(h^2)\longrightarrow0.
$$

$A_N$ の整合性は第3節で確認したから $B_N$ も整合的である。しかし $q_N(z_N)=4/h^2$ に対し $m_N(z_N,B_Nz_N)=0$ であり、この非負形式には[コンパクト性補題](#lem-mfl19-compactness)のエネルギー制御がない。[周期折線の質量・エネルギー恒等式](#lem-mfl19-mass-energy)を $z_N$ へ代入すると $\|J_Nz_N\|_2^2=1-(h^2/6)(4/h^2)=1/3$ となる。

一方、折線 $J_Nz_N$ は隣り合う二セルごとに積分が0で、絶対値は $L^{-1/2}$ 以下である。固定した滑らかな試験関数 $\psi$ との内積では、各二セルの左端の $\psi$ を差し引いても積分は変わらない。$|\psi(s)-\psi(s_{2j})|\le2h\|\psi'\|_\infty$ を使うと $|\langle\psi,J_Nz_N\rangle_2|\le2\sqrt L\,h\|\psi'\|_\infty\to0$。滑らかな関数の $L^2$ 稠密性と $\|J_Nz_N\|_2=1/\sqrt3$ から、$J_Nz_N$ は弱く0へ近づく。しかし強く収束する部分列があれば同じ極限0へ強収束してノルムが0へ行くはずなので矛盾する。$\square$
<!-- proof-end -->

高次元多様体やランダム近傍グラフでは、ここで証明した等間隔1次元の結論をそのまま移せない。標本の密度下界、帯域幅と標本数の関係、正規化分母、境界条件、質量の対応、コンパクト性を保証する離散エネルギー不等式が別途必要になる。**固定 $f$ に対する核作用素の極限**と、**固有値・固有空間やクラスタ分割の一致性**は異なる命題である。

## 9. 再現可能な比較実験

下の標準ライブラリだけのラボは、$N,R,k$、折線/最近傍補間、2次元模型の固有値間隔と摂動を変更する。`projection_gap` は、補間した離散単一Fourierモードの張る複素1次元空間と、同じ連続波数の空間との射影距離である。複素モードの収束は実正弦・余弦の2次元固有空間の収束に対応する。`perturbation_angle_sine` は固有値間隔が小さいと混合が増える対照模型であり、円周差分作用素のランダム摂動を推定した値ではない。

```python-file-lab
# lab-id: MFL19-SPECTRAL-BRIDGE-FILE
# lab-title: 固定作用素誤差・補間射影・eigengapとスペクトル汚染
# lab-file: textbook/volumes/dream_thater/応用系/MFL/MFL19/spectral_bridge_lab.py
# timeout-ms: 30000
# lab-preset: 低周波・12点の折線 | --n 12 --radius 1 --frequency 1 --interpolation linear --gap 1 --mix 0.1
# lab-preset: 低周波・48点の折線 | --n 48 --radius 1 --frequency 1 --interpolation linear --gap 1 --mix 0.1
# lab-preset: 最近傍補間との比較 | --n 24 --radius 1 --frequency 1 --interpolation nearest --gap 1 --mix 0.1
# lab-preset: 固有値間隔が狭い | --n 24 --radius 1 --frequency 1 --interpolation linear --gap 0.02 --mix 0.1
# lab-preset: Nyquist汚染 | --n 24 --radius 1 --frequency 12 --interpolation linear --gap 1 --mix 0.1
```

`discrete_rayleigh` は差分行列の固有値、`interpolated_rayleigh` は折線を連続関数として見た商（最近傍補間では微分可能とは限らないので `null`）、`projection_gap` は $L^2$ の厳密な補間Fourier係数から算出する。`polluted_zero_multiplicity=2` は偶数格子の人工的な $B_N$ を使った反例の値であり、元の $A_N$ の零固有値重複度は常に1である。`python spectral_bridge_lab.py --self-test` では質量・エネルギー恒等式、固定周波数収束、射影距離、固有値間隔による混合、汚染反例を独立に検算できる。

## 10. 演習：上界・下界・固有空間を自力でつなぐ

<a id="ex-mfl19-a01"></a>

### MFL19-A01 折線の二つの質量

- Level: A
- 問題: 周長 $L$、間隔 $h=L/N$（$N\ge3$）の周期格子で、$v=(v_j)$ の折線 $J_Nv$ を考える。一セルでの $\int|J_Nv|^2$ を端点 $a=v_j,b=v_{j+1}$ で表し、全セルの和から $\|J_Nv\|_2^2=m_N(v)-h^2q_N(v)/6$ を導け。

**詳細解答。** $u(t)=(1-t)a+tb$、$ds=h\,dt$ として、$\int_0^1(1-t)^2dt=1/3$、$\int_0^1t^2dt=1/3$、$\int_0^1t(1-t)dt=1/6$ より

$$
\int_{s_j}^{s_{j+1}}|J_Nv|^2ds
=\frac h3(|a|^2+|b|^2+\operatorname{Re}(\bar a b))
=\frac h2(|a|^2+|b|^2)-\frac h6|b-a|^2.
$$

端点二乗の和を周期的に集めると $h\sum|v_j|^2$、差分の和は $(h^2/6)(h^{-1}\sum|v_{j+1}-v_j|^2)$ だから結論を得る。

<a id="ex-mfl19-a02"></a>

### MFL19-A02 第一正固有値の重複度

- Level: A
- 問題: 半径 $R>0$ の連続円周で、$L_g=-d^2/ds^2$ とする。$\cos(s/R)$ と $\sin(s/R)$ の固有値を求め、両者が直交することと、個々の固有ベクトルが一意でないことを説明せよ。

**詳細解答。** 二階微分を直接取ると $-\frac{d^2}{ds^2}\cos(s/R)=R^{-2}\cos(s/R)$、正弦も同様である。積の積分は

$$
\int_0^{2\pi R}\cos(s/R)\sin(s/R)ds
=\frac R2\int_0^{2\pi}\sin(2\theta)d\theta=0.
$$

両方のノルム二乗は $\pi R$ なので非零・線形独立である。$\cos((s/R)-\alpha)$ は任意の角 $\alpha$ について同じ固有値を持ち、正弦・余弦の線形結合となる。従って個々の向きではなく2次元固有空間を比較する。

<a id="ex-mfl19-a03"></a>

### MFL19-A03 Hölder評価の係数

- Level: A
- 問題: $u=J_Nv$、$q_N(v)\le C$、$0\le t\le s\le L$ とする。$|u(s)-u(t)|\le\sqrt C\,|s-t|^{1/2}$ を示せ。なぜ高周波の交互符号ベクトルに一様な $C$ は存在しないか。

**詳細解答。** 折線は区分的に絶対連続だから $u(s)-u(t)=\int_t^s u'(x)dx$。Cauchy–Schwarzから $|\int_t^su'|^2\le(s-t)\int_t^s|u'|^2\le(s-t)q_N(v)$。平方根を取る。交互符号の正規化ベクトル $z_N$ では各差が絶対値 $2/\sqrt L$、辺は $N$ 本なので $q_N(z_N)=N(4/L)/h=4/h^2\to\infty$。同じ $C$ を取れない。

<a id="ex-mfl19-a04"></a>

### MFL19-A04 min–max上界の候補

- Level: A
- 問題: 円周の $k=1$ に対し、連続側の固有関数 $\phi_0=L^{-1/2}$、$\phi_1=\sqrt{2/L}\cos(s/R)$ を格子へ標本化する。$N\ge3$ で2次元空間 $E_N=\operatorname{span}\{S_N\phi_0,S_N\phi_1\}$ が作れる理由と、離散min–maxが与える不等式を述べよ。

**詳細解答。** $m_N(S_N\phi_0,S_N\phi_1)=(\sqrt2/N)\sum_j\cos(2\pi j/N)=0$ は有限等比級数の実部から得られる。両方の $m_N$-ノルムは1で線形独立である。[min–max上界の構成](#thm-mfl19-eigenvalues)により $\lambda_{N,1}\le\max_{0\ne v\in E_N}q_N(v)/m_N(v)$。$q_N$ は固有モードで対角なので最大値は $\lambda_{N,1}$ であり、これは候補空間の使い方の等号例になる。

<a id="ex-mfl19-b01"></a>

### MFL19-B01 回復列とセル平均

- Level: B
- 問題: $u\in H^1_{\rm per}(0,L)$ の連続代表を $s_j=jL/N$ で標本化し、折線 $J_NS_Nu$ を作る。導関数が $u'$ のセル平均であることを示し、$u'$ が連続な場合に $q_N(S_Nu)\to\int_0^L|u'|^2ds$ を証明せよ。

**詳細解答。** 一セルの傾きは $(u(s_{j+1})-u(s_j))/h$。$H^1$ の絶対連続代表には微積分の基本定理を使えるため、これは $h^{-1}\int_{s_j}^{s_{j+1}}u'$ に等しい。

$u'$ が連続なら一様連続性の法 $\omega_{u'}(h)\to0$ によってセル内で $|(J_NS_Nu)'-u'(s)|\le\omega_{u'}(h)$。したがって導関数の $L^2$ 誤差は $\sqrt L\,\omega_{u'}(h)$ 以下となる。[逆三角不等式](../../../基礎科目/F0/F0-00E2/index.md#thm-f0-00e2-reverse-triangle-inequality)から

$$
\bigl|\sqrt{q_N(S_Nu)}-\|u'\|_2\bigr|
\le\|(J_NS_Nu)'-u'\|_2\to0.
$$

両辺を二乗すればエネルギー収束が得られる。一般の $H^1$ へは[回復列命題](#prop-mfl19-recovery)の $L^2$ 密度による拡張を使う。

<a id="ex-mfl19-b02"></a>

### MFL19-B02 下界に必要な正規直交性

- Level: B
- 問題: $m_N(v_{N,i},v_{N,j})=\delta_{ij}$、$q_N(v_{N,i})\le C$（$i,j=0,1$）とし、$J_Nv_{N,i}\to u_i$ が $L^2$ で成立するとする。$\langle u_i,u_j\rangle_2=\delta_{ij}$ を厳密に導け。なぜ $q_N$ の上界がないと同じ議論が止まるか。

**詳細解答。** [質量差恒等式](#lem-mfl19-mass-energy)より

$$
\langle J_Nv_{N,i},J_Nv_{N,j}\rangle_2
=\delta_{ij}-\frac{h^2}6q_N(v_{N,i},v_{N,j}).
$$

差分列へのCauchy–Schwarzから $|q_N(v_{N,i},v_{N,j})|\le\sqrt{q_N(v_{N,i})q_N(v_{N,j})}\le C$。従って誤差は $Ch^2/6\to0$。強い $L^2$ 収束は内積の収束を与えるので、極限は $\delta_{ij}$。エネルギーが $h^{-2}$ 程度なら質量差が定数程度残り得るため、この推論は使えない。

<a id="ex-mfl19-b03"></a>

### MFL19-B03 射影距離と固有値間隔

- Level: B
- 問題: $\gamma>0$、$\delta\ge0$ とし、対称行列 $H=\begin{pmatrix}0&\delta\\\delta&\gamma\end{pmatrix}$ を考える。$\delta=0$ では低い固有空間が $\operatorname{span}(e_1)$ である。$\delta>0$ で低い固有ベクトルが $e_1$ となす角 $\theta\in[0,\pi/4)$ について、$\sin^2\theta=(1-\gamma/\sqrt{\gamma^2+4\delta^2})/2$ を導け。

**詳細解答。** 固有値は特性方程式 $\mu(\mu-\gamma)-\delta^2=0$ から $\mu_\pm=(\gamma\pm\sqrt{\gamma^2+4\delta^2})/2$。低い固有ベクトルは $u=(\cos\theta,-\sin\theta)$ と書け、$Hu=\mu_-u$ の第1行から $-\delta\sin\theta=\mu_-\cos\theta$。従って $\tan\theta=-\mu_-/\delta=2\delta/(\gamma+\sqrt{\gamma^2+4\delta^2})$。倍角恒等式から $\cos2\theta=\gamma/\sqrt{\gamma^2+4\delta^2}$、従って $\sin^2\theta=(1-\cos2\theta)/2$。1次元射影間の作用素ノルムは $|\sin\theta|$ であり、同じ $\delta$ でも $\gamma\downarrow0$ で大きくなる。

<a id="ex-mfl19-b04"></a>

### MFL19-B04 Nyquistを零にする反例

- Level: B
- 問題: 偶数 $N\ge4$、$h=L/N$、$z_j=(-1)^j/\sqrt L$、$P_Nv=m_N(z,v)z$、$B_N=A_N-4P_N/h^2$ とする。$z$ と定数 $\boldsymbol1$ がともに $B_N$ の零固有ベクトルであり、その質量内積が0であることを示せ。$\|J_Nz\|_2^2$ も求めよ。

**詳細解答。** 交互符号なので $z_{j\pm1}=-z_j$、従って $A_Nz=4z/h^2$。$m_N(z)=hN/L=1$ より $P_Nz=z$、ゆえに $B_Nz=0$。定数には $A_N\boldsymbol1=0$。$m_N(z,\boldsymbol1)=h\sum_j(-1)^j/\sqrt L=0$ は偶数個の符号が相殺するためで、$P_N\boldsymbol1=0$。従ってもう一つの零モードも残る。$q_N(z)=m_N(z,A_Nz)=4/h^2$ を[質量公式](#lem-mfl19-mass-energy)へ代入すれば $\|J_Nz\|_2^2=1-(h^2/6)(4/h^2)=1/3$。格子質量1と連続折線質量 $1/3$ は同じでない。

<a id="ex-mfl19-c01"></a>

### MFL19-C01 収束する模型と汚染する模型を同じ格子で比較

- Level: C
- 問題: 半径 $R>0$、偶数 $N\ge6$、$h=2\pi R/N$ の円周と、$A_N=(2v_j-v_{j-1}-v_{j+1})/h^2$、$B_N=A_N-(4/h^2)P_N$（$P_N$ はNyquist質量直交射影）を考える。以下を示せ。

  1. $A_N$ の最初の三固有値と $B_N$ の最初の三固有値を重複度込みで示せ。
  2. 固定波数1の余弦・正弦について $A_N,B_N$ が同じ値を持ち、$N\to\infty$ で連続固有値 $R^{-2}$ に近づくことを示せ。
  3. $B_N$ の低固有空間が連続円周の定数空間へ射影距離で収束しない理由を、エネルギー恒等式と折線の質量から説明せよ。

**詳細解答。** [完全Fourier分解](../MFL18/index.md#thm-mfl18-complete)から $A_N$ の固有値は $4h^{-2}\sin^2(\pi k/N)$。$N\ge6$ なら $\sin^2(\pi/N)>0$、最初の三つは $0,\lambda_{N,1},\lambda_{N,1}$（$k=0,1,N-1$）。$B_N$ は $k=N/2$ の固有値 $4/h^2$ だけ0へ変更するので、最初の三つは $0,0,\lambda_{N,1}$ となる。ここで $k=0$ と $k=N/2$ は互いに直交している。

波数 $k=1,N-1$ と $N/2$ は異なるFourier代表元なので $P_N\phi_{N,1}=P_N\phi_{N,N-1}=0$。従って両作用素は余弦・正弦の標本に対して同じ固有値を返す。[固定波数の評価](../MFL18/index.md#thm-mfl18-low-frequency)から

$$
0\le R^{-2}-\lambda_{N,1}\le\frac{\pi^2}{3R^2N^2}\to0.
$$

最後に $B_N$ の零固有空間は $\boldsymbol1$ と $z_N$ の2次元なので、折線後の空間も2次元である。一方、連続の零固有空間は定数の1次元であり、異なる次元の直交射影の距離は少なくとも1である。

具体的には $J_Nz_N$ の平均は0で、$\|J_Nz_N\|_2^2=1/3$ だから単位化できる。このベクトルに対し、$P_{E_N}J_Nz_N=J_Nz_N$、$P_{E_0}J_Nz_N=0$ なので、射影距離は1以上である。

また $B_N$ の二次形式は $m_N(z_N,B_Nz_N)=0$ なのに $\int|(J_Nz_N)'|^2=4/h^2$。[コンパクト性補題](#lem-mfl19-compactness)へつなぐエネルギー制御が失われ、点ごとの作用素整合性から固有空間の一致は出ない。

---

円周差分という完全に計算できる模型では、**回復列で上界を作る → エネルギー制御で低いモードをコンパクトにする → min–maxで下界を作る → 孤立固有値群の射影を比較する**、という連続した論証が可能だった。次に高次元のデータや異なる標本密度へ進むときは、どの段階の仮定と評価が引き続き使えるのかを個別に確かめる必要がある。
