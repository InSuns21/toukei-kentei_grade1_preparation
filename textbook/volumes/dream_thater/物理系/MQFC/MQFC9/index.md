# MQFC9 OS Hilbert空間と時間並進半群

[MQFC8](../MQFC8/index.md) では、正の Euclid 時間にある観測量を反転した観測量と組み合わせると、非負の長さの二乗が得られました。今回はそこから量子状態の空間を作り、Euclid 時間を進める操作がエネルギーの非負性を生むところまで追います。

直接の前提は [MQFC8](../MQFC8/index.md)、[MQFC4](../MQFC4/index.md)、[QM6](../../../解析系/QM/QM6/index.md) です。内積は第2引数線形とします。MQFC4 の第1引数線形の規約を利用するときは引数を交換します。

## 1. 長さが零の観測量を取り除く

実 Schwartz 試験関数 $f$ による測定を $X_f(\omega)=\omega(f)$ とします。前講と同じく円筒確率測度 $\mu$ は全測定の全絶対モーメントを持ち、時間反転 $\theta$ で不変とします。$\mathcal P_+$ は台が $t>0$ に含まれる実試験関数の測定から作る複素係数多項式の空間です。

[正時間多項式の反射形式](../MQFC8/index.md#def-mqfc8-reflection-positivity) を

$$
q(F,G)=E_\mu[\overline{F(\theta\omega)}G(\omega)]
$$

と書き、[反射陽性](../../QFT/QFT20/index.md#def-qft20-reflection-positivity) を仮定します。前講で示した通り $q$ は有限な Hermitian 半正定値形式です。

通常の確率変数として異なる二つの観測量でも、反射形式で測った差の長さが零なら量子状態として区別できません。[正値形式による商空間の構成](../MQFC4/index.md#thm-mqfc4-quotient) の内積部分の論法を利用し、零方向を同一視します。今回は零方向が多項式の積について閉じるとは仮定しません。

<a id="def-mqfc9-os-hilbert"></a>

<!-- formal-statement-start -->
> **定義（OS Hilbert空間）**
> 反転不変で反射陽性な、全測定の全絶対モーメントを持つ円筒確率測度について、正時間多項式空間 $\mathcal P_+$ とその反射形式 $q$ を用いる。零空間と商空間を
>
$$
N=\{F\in\mathcal P_+:q(F,F)=0\},\qquad
D=\mathcal P_+/N
$$
>
> とし、$[F]=F+N$ と書く。内積 $\langle[F],[G]\rangle=q(F,G)$ による $D$ の完備化 $\mathcal H_{\rm OS}$ を OS Hilbert空間と呼ぶ。定数多項式の類を $\Omega=[1]$ とする。
<!-- formal-statement-end -->

この定義が成立することを、[正値形式による商空間の構成](../MQFC4/index.md#thm-mqfc4-quotient) の証明で用いた Cauchy–Schwarz 評価から確認します。$q(G,G)>0$ なら $F-\lambda G$ に $\lambda=q(G,F)/q(G,G)$ を代入して

$$
0\le q(F-\lambda G,F-\lambda G)
=q(F,F)-\frac{|q(G,F)|^2}{q(G,G)}.
$$

$q(G,G)=0$ の場合も $\lambda=a q(G,F)$（$a>0$）を代入して

$$
0\le q(F,F)-2a|q(G,F)|^2
$$

がすべての $a$ について成立するので $q(G,F)=0$ です。従って $|q(F,G)|^2\le q(F,F)q(G,G)$ が常に成立します。特に $N$ は全 $G$ に対して $q(F,G)=0$ となる $F$ の集合に一致するため、線形部分空間です。代表元を $F+F_0,G+G_0$（$F_0,G_0\in N$）に替えても

$$
q(F+F_0,G+G_0)=q(F,G)
$$

です。商の零ノルムは零類のみなので内積は正定値です。完備化では $D$ は稠密になり、$\|\Omega\|^2=E_\mu[1]=1$ です。

<!-- definition-example-start: def-mqfc9-os-hilbert -->
### 直接例：定数場と消える観測量

標準正規変数 $Y$ により $\omega(f)=Y\int f$ とします。[前講の反射形式の直接例](../MQFC8/index.md#def-mqfc8-reflection-positivity) の通り、この場は全絶対モーメント、反転不変性、反射陽性を満たします。正時間に台を持つ滑らかなコンパクト台関数 $f,g$ を、積分がともに1で $f\ne g$ となるよう取ります。$X_f=X_g=Y$ であり、

$$
q(X_f-X_g,X_f-X_g)=0.
$$

従って $[X_f]=[X_g]$ です。一方 $q(X_f,X_f)=1$ なのでこの類は消えません。全多項式は $P(Y)$ と書け、$q(P,Q)=E[\overline{P(Y)}Q(Y)]$ です。従って $N$ は $P(Y)=0$ がほとんど確実に成り立つ観測量の集合であり、商は $Y$ の多項式の通常の $L^2$ 内積空間と等長です。その閉包を $L^2$ 内で取れば完備化が具体的に得られます。$\Omega$ は定数1に対応し、$[X_f]$ と直交します。
<!-- definition-example-end -->

自由場では確率変数そのものが非零でも零方向になり得ます。[自由場の反射共分散の因子分解](../MQFC8/index.md#thm-mqfc8-reflected-covariance) の $d=1$ の場合、

$$
q(X_f,X_g)=\frac{\overline{L_m f}L_m g}{2m},
\qquad L_m f=\int_0^\infty e^{-mt}f(t)\,dt
$$

です。従って $L_m f=0$ なら $[X_f]=0$ です。量子状態として必要な情報は $X_f$ の通常の分散ではなく $L_m f$ に集約されています。

## 2. 時間を進める操作を商空間に移す

Euclid 時間を $s$ だけ未来へ移動する試験関数を

$$
(\tau_s f)(t,x)=f(t-s,x)
$$

とします。標本への作用は $(\sigma_s\omega)(f)=\omega(\tau_s f)$ です。観測量には $U_sF(\omega)=F(\sigma_s\omega)$ と作用させます。測定に対して $U_sX_f=X_{\tau_s f}$ であり、$s\ge0$ なら正時間支持が保たれます。Schwartz 空間は平行移動で保たれ、円筒可測性は各測定との合成が測定になることから従います。

$\mu$ がすべての時間並進 $\sigma_s$（$s\in\mathbb R$）で不変であることを追加で仮定します。従って通常の $L^2(\mu)$ では $U_s$ は全実数の等長な作用です。実際

$$
\|U_sF\|_2^2=E_\mu[|F(\sigma_s\omega)|^2]
=E_\mu[|F(\omega)|^2].
$$

しかし OS 内積では $U_s$ が等長である必要はありません。例えば一粒子の自由場で $L_m(\tau_s f)=e^{-ms}L_m f$ となります。時間が進むほど状態の長さは縮みます。

ここで目指すのは、$T_0=I$、$T_{s+t}=T_sT_t$ を満たす有界作用素族です。非負時刻だけで加法に対応するので半群であり、$\|T_s v\|\le\|v\|$ のとき縮小、$\langle T_s v,w\rangle=\langle v,T_s w\rangle$ のとき対称といいます。全空間上の有界対称作用素は [自己共役作用素の定義](../../../解析系/QM/QM5/index.md#def-qm5-self-adjoint) により自己共役です。さらに各 $v$ で $\|T_sv-v\|\to0$（$s\downarrow0$）なら原点で強連続です。

<a id="thm-mqfc9-time-semigroup"></a>

<!-- formal-statement-start -->
> **定理（反射陽性からの時間並進半群）**
> 反転不変・反射陽性で全測定の全絶対モーメントを持つ円筒確率測度 $\mu$ が全実数の時間並進で不変とする。正時間多項式 $F$ について、$U_sX_f=X_{\tau_s f}$ で定める並進が次の連続性を満たすと仮定する。
>
$$
\lim_{s\downarrow0}\|U_sF-F\|_{L^2(\mu)}=0.
$$
>
> このとき OS Hilbert空間上に一意な強連続な自己共役縮小半群が存在し、稠密部分空間 $D$ 上では
>
$$
T_s[F]=[U_sF]\quad(s\ge0)
$$
>
> を満たす。各 $T_s$ は非負作用素であり、$T_s\Omega=\Omega$ である。
<!-- formal-statement-end -->

### 証明の見取り図

反転と並進の順番を入れ替えると並進の向きが逆になります。この関係を測度の時間並進不変性と組み合わせると、反射形式の左右で正時間の並進を移せます。さらに $2s,4s,8s,\ldots$ と時間を倍増しても通常の確率空間では長さが一定であることが、OS ノルムの縮小性を強制します。縮小性が分かって初めて、零方向を零方向に移すことが保証されます。

<!-- proof-start -->
### 証明

反転作用を $RF(\omega)=F(\theta\omega)$ と書きます。試験関数に対して $\theta\tau_s=\tau_{-s}\theta$ であるため $RU_s=U_{-s}R$ です。通常の内積を $(A,B)_2=E[\bar A B]$ とすれば $q(F,G)=(RF,G)_2$ です。並進不変性から $U_{-s}$ の随伴は $U_s$ なので、$s\ge0$ では

$$
\begin{aligned}
q(U_sF,G)&=(RU_sF,G)_2\\
&=(U_{-s}RF,G)_2\\
&=(RF,U_sG)_2=q(F,U_sG).
\end{aligned}
$$

$q(F,F)^{1/2}$ を $p(F)$ と置きます。第1節の半正定値形式の Cauchy–Schwarz 評価を使うと

$$
p(U_sF)^2=q(F,U_{2s}F)
\le p(F)p(U_{2s}F).
$$

ここで $p(F)=0$ なら直ちに $p(U_sF)=0$ です。従って $U_sN\subset N$ が分かり、代表元を替えても $[U_sF]$ は変化しません。

次に $p(F)>0$ とします。上の不等式を $s,2s,\ldots,2^{n-1}s$ に順次適用します。最初の二回では

$$
\begin{aligned}
p(U_sF)&\le p(F)^{1/2}p(U_{2s}F)^{1/2}\\
&\le p(F)^{3/4}p(U_{4s}F)^{1/4}.
\end{aligned}
$$

帰納法で

$$
p(U_sF)\le p(F)^{1-2^{-n}}p(U_{2^ns}F)^{2^{-n}}.
$$

通常の $L^2$ 内積での Cauchy–Schwarz 不等式と反転不変性から任意の $G\in\mathcal P_+$ に対し

$$
0\le p(G)^2=(RG,G)_2\le\|RG\|_2\|G\|_2=\|G\|_2^2.
$$

従って $p(U_{2^ns}F)\le\|F\|_2$ です。$p(F)>0$ なら $\|F\|_2>0$ であり、$n\to\infty$ とすると

$$
p(U_sF)\le p(F).
$$

既に扱った $p(F)=0$ の場合と合わせて、$D$ 上の作用素は縮小です。任意の $v\in\mathcal H_{\rm OS}$ を $D$ の列 $v_n$ で近似すると $T_sv_n$ は Cauchy 列であり、その極限は近似列に依存しません。この極限で全空間上への一意な縮小延長を得ます。

試験関数の並進は $\tau_s\tau_t=\tau_{s+t}$ を満たすので、$D$ 上で半群則が成立し、有界性と稠密性から全空間に延びます。対称性も最初に示した $q$ の恒等式から稠密近似で延びます。全空間上の有界作用素なので自己共役です。半群則と自己共役性から

$$
\langle v,T_sv\rangle
=\langle T_{s/2}v,T_{s/2}v\rangle\ge0.
$$

定数多項式は並進で変化しないので $T_s\Omega=\Omega$ です。

最後に $[F]\in D$ では仮定より

$$
\|T_s[F]-[F]\|=p(U_sF-F)
\le\|U_sF-F\|_2\longrightarrow0.
$$

任意の $v$ と $w\in D$ に対し

$$
\|T_sv-v\|\le2\|v-w\|+\|T_sw-w\|.
$$

$w$ を十分近く選んでから $s\downarrow0$ とすれば強連続性が従います。任意の $t\ge0$ での右連続性は $T_{t+h}v-T_tv=T_t(T_h-I)v$ から従い、$0<h\le t$ の左連続性も $T_tv-T_{t-h}v=T_{t-h}(T_h-I)v$ と縮小性で従います。
<!-- proof-end -->

### 自由 Gaussian 場で仮定を確認する

[Gaussian場の多項式反射陽性](../MQFC8/index.md#thm-mqfc8-gaussian-extension) と [自由場の反射共分散の因子分解](../MQFC8/index.md#thm-mqfc8-reflected-covariance) により、質量 $m>0$ の自由場は反射陽性を持ちます。共分散は前講で使った Fourier 乗数による積分

$$
B_m(f,g)=\int_{\mathbb R^d}
\frac{\overline{\hat f(p)}\hat g(p)}{|p|^2+m^2}
\frac{d^dp}{(2\pi)^d}
$$

です。$\widehat{\tau_sf}(p)=e^{-ip_0s}\hat f(p)$ なので $B_m(\tau_sf,\tau_sg)=B_m(f,g)$ です。中心化 Gaussian の有限次元分布は共分散で決まり、円筒集合の分布が一致するため測度は並進不変です。

さらに差 $Z_s=X_{\tau_sf}-X_f$ は中心化 Gaussian であり、その分散は

$$
E[Z_s^2]=\int
\frac{|e^{-ip_0s}-1|^2|\hat f(p)|^2}{|p|^2+m^2}
\frac{d^dp}{(2\pi)^d}\to0.
$$

積分被積分関数は $4|\hat f(p)|^2/m^2$ で抑えられ、Schwartz 減衰により可積分なので優収束定理を適用できます。任意の整数 $k\ge1$ に対して [Gaussian Schwinger関数のWick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を同じ変数 $Z_s$ の $2k$ 個の積に適用すると

$$
E[|Z_s|^{2k}]=(2k-1)!!(E[Z_s^2])^k\longrightarrow0.
$$

ここで $(2k-1)!!$ は $2k-1,2k-3,\ldots,1$ の積です。次数 $k$ の単項式 $F=\prod_{j=1}^k X_{f_j}$ の並進との差を調べます。$A_j=U_sX_{f_j}$、$B_j=X_{f_j}$ とすると

$$
\prod_{j=1}^k A_j-\prod_{j=1}^k B_j
=\sum_{i=1}^k\left(\prod_{j<i}A_j\right)
(A_i-B_i)\left(\prod_{j>i}B_j\right).
$$

各項の $L^2$ ノルムは Hölder 不等式（各因子の指数を $k$ として二乗の積へ適用）により $k$ 個の $L^{2k}$ ノルムの積で抑えられます。$A_j,B_j$ のノルムは並進不変性で一定、差 $A_i-B_i$ のノルムは上のモーメント評価で零へ収束します。従って各項が $L^2$ で零へ収束し、有限和である任意の多項式も連続性を満たします。これで [反射陽性からの時間並進半群](#thm-mqfc9-time-semigroup) の全仮定を自由場に対して検証できました。

## 3. 半群から非負の Hamiltonian を取り出す

量子力学では自己共役作用素がエネルギーを表します。Euclid 時間の縮小半群が $T_s=e^{-sH}$ と書けるなら、エネルギー $\lambda$ の成分は $e^{-s\lambda}$ 倍になります。$\lambda<0$ の成分は増幅されるはずなので、縮小性は負のエネルギーを排除します。

ここで [自己共役作用素の Borel 関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) を使います。自己共役作用素 $A$ のスペクトル射影を $E_A(B)$ と書き、ベクトル $v$ に対する有限非負測度を $\nu_v(B)=\langle v,E_A(B)v\rangle$ とします。$g(A)$ はスペクトル値 $\lambda$ を関数 $g(\lambda)$ に取り替える操作です。非有界な場合は $\int|g|^2d\nu_v<\infty$ となる $v$ が定義域です。

<a id="thm-mqfc9-hamiltonian"></a>

<!-- formal-statement-start -->
> **定理（自己共役縮小半群の非負生成作用素）**
> 複素 Hilbert 空間上で $T_0=I$、$T_{s+t}=T_sT_t$ を満たす強連続な自己共役縮小半群 $(T_s)_{s\ge0}$ を考える。一意な非負自己共役作用素 $H$ が存在して
>
$$
T_s=e^{-sH}
$$
>
> が成り立つ。非負とは全 $v\in D(H)$ に対し $\langle v,Hv\rangle\ge0$ であることをいう。生成作用素の定義域は
>
$$
D(H)=\left\{v:\lim_{s\downarrow0}
\frac{v-T_sv}{s}\text{ がノルムで存在する}\right\}
$$
>
> であり、その極限は $Hv$ に等しい。特に半群がベクトル $\Omega$ を固定するとき、$\Omega\in D(H)$ かつ $H\Omega=0$ である。
<!-- formal-statement-end -->

### 証明の見取り図

時刻1の作用素 $A=T_1$ を取り出します。半群則から $A$ は非負で、時刻 $1/n$ の作用素はその非負な $n$ 乗根になります。強連続性により $A$ に零固有値はなく、スペクトル値 $a\in(0,1]$ を $-\log a$ に写せば非負エネルギーが得られます。零が連続スペクトルに含まれる可能性はあり、その場合 $H$ は非有界です。

<!-- proof-start -->
### 証明

まず全 $s\ge0$ で $T_s=T_{s/2}^2$ より $T_s$ は非負です。$T_1v=0$ なら

$$
\|T_{1/2}v\|^2=\langle v,T_1v\rangle=0.
$$

この議論を $T_{1/2^k}$ に繰り返すと $T_{1/2^k}v=0$ が全 $k$ で成立します。強連続性から極限は $v$ なので $v=0$ です。よって $\ker A=\{0\}$ です。

[非有界自己共役作用素のスペクトル定理](../../../解析系/QM/QM6/index.md#thm-qm6-unbounded-self-adjoint-spectral) を有界自己共役作用素 $A$ に適用し、そのスペクトル射影を $E_A$ とします。非負性と縮小性から $E_A$ は $[0,1]$ に集中します。実際 $[-n,-1/n]$ への射影の値域のベクトル $w$ では $\langle w,Aw\rangle\le-\|w\|^2/n$ となるので射影は零です。また $[1+1/n,n]$ の値域では $\|Aw\|^2\ge(1+1/n)^2\|w\|^2$ となるのでこれも零です。可算合併を取れば範囲外の射影は零です。$AE_A(\{0\})=0$ と $\ker A=\{0\}$ から $E_A(\{0\})=0$ です。

[自己共役作用素の Borel 関数計算](../../../解析系/QM/QM6/index.md#def-qm6-borel-functional-calculus) で実関数 $g(a)=-\log a$（$0<a\le1$、その他では0）を用いて

$$
H=g(A),\qquad
D(H)=\{v:\int_{(0,1]}|\log a|^2d\nu_v(a)<\infty\}
$$

と置きます。$E_A$ を $g$ で押し出した射影値測度を $E_H$ とすれば $H=\int\lambda\,dE_H(\lambda)$ です。[実座標のスペクトル積分の自己共役性](../../../解析系/QM/QM6/index.md#thm-qm6-spectral-integral-self-adjoint) より $H$ は自己共役で、$g\ge0$ が測度の台で成立するので非負です。

正整数 $n$ について $B=T_{1/n}$ は非負自己共役縮小作用素で $B^n=A$ です。$E_B$ を $b\mapsto b^n$ で押し出した射影値測度は $A$ のスペクトル表示を与えます。スペクトル測度の一意性からそれは $E_A$ に一致します。従って

$$
A^{1/n}=\int_{[0,1]}a^{1/n}dE_A(a)
=\int_{[0,1]}(b^n)^{1/n}dE_B(b)=B
$$

です。$b\ge0$ が最後の等号に必要です。半群則と有界関数計算の積の規則により非負有理数 $k/n$ では

$$
T_{k/n}=B^k=A^{k/n}=e^{-(k/n)H}.
$$

任意の $s\ge0$ へ収束する非負有理数列 $r_j$ を取ります。強連続性から $T_{r_j}v\to T_sv$ です。他方

$$
\|(e^{-r_j H}-e^{-sH})v\|^2
=\int_{[0,\infty)}|e^{-r_j\lambda}-e^{-s\lambda}|^2
\,d\mu_v(\lambda)
$$

と書けます。ここで $\mu_v(B)=\langle v,E_H(B)v\rangle$ です。被積分関数は各点で零へ収束し、定数4で抑えられます。$\mu_v$ は全質量 $\|v\|^2$ の有限測度なので優収束定理から極限は零です。これで全 $s$ の表示が得られました。

生成作用素の定義域を確認します。$\lambda\ge0$ で

$$
0\le\frac{1-e^{-s\lambda}}s\le\lambda
$$

であり、$s\downarrow0$ の点ごとの極限は $\lambda$ です。$v\in D(H)$ なら $\lambda^2$ は $\mu_v$ 可積分なので

$$
\left\|\frac{v-T_sv}{s}-Hv\right\|^2
=\int\left|\frac{1-e^{-s\lambda}}s-\lambda\right|^2d\mu_v
\to0.
$$

逆に差商がノルム収束するなら、$s_j=1/j$ の差商のノルムはある有限定数 $M$ で抑えられます。Fatou の補題により

$$
\int\lambda^2d\mu_v
\le\liminf_{j\to\infty}\int
\left|\frac{1-e^{-s_j\lambda}}{s_j}\right|^2d\mu_v
\le M^2.
$$

従って $v\in D(H)$ です。この極限で定義域と作用が一意に決まるため、同じ半群を表す別の非負自己共役作用素は一致します。最後に $T_s\Omega=\Omega$ なら差商が恒等的に零なので $\Omega\in D(H)$、$H\Omega=0$ です。
<!-- proof-end -->

### 具体例：有限のエネルギーと非有界なエネルギー

$\mathbb C^2$ 上で $T_s=\operatorname{diag}(1,e^{-2s})$ とします。二つの対角成分を掛けると半群則を確認でき、対角成分は実数で0より大きく1以下なので自己共役縮小です。連続性は各成分の指数関数の連続性から従います。時刻1での対角成分は $1,e^{-2}$ なので

$$
H=-\log T_1=\operatorname{diag}(0,2).
$$

$\Omega=(1,0)$ は零エネルギー、$(0,1)$ はエネルギー2です。

一方 $\ell^2(\mathbb N)$ 上で $T_s e_n=e^{-sn}e_n$ とします。$e_n$ は第 $n$ 座標だけが1の単位ベクトルです。対角成分の積から半群則、実数性と $0<e^{-sn}\le1$ から自己共役縮小性が従います。$v=(v_n)$ に対し $\sum_n|e^{-sn}-1|^2|v_n|^2\to0$ は $\sum_n|v_n|^2<\infty$ による優収束で従います。時刻1のスペクトル値 $e^{-n}$ は0に近づきますが零固有値はありません。

$$
(Hv)_n=nv_n,\qquad
D(H)=\{v:\sum_{n=1}^\infty n^2|v_n|^2<\infty\}.
$$

この作用素は $\|He_n\|=n$ なので非有界です。半群がすべて有界でも生成作用素が全空間で定義されるとは限りません。

## 4. 自由場の一粒子状態で時間減衰を読む

$m>0$、空間次元 $d-1$ とし、$a(k)=\sqrt{|k|^2+m^2}$ とします。[自由場の反射共分散の因子分解](../MQFC8/index.md#thm-mqfc8-reflected-covariance) から、一次観測量の類は

$$
L_m f(k)=\int_0^\infty e^{-a(k)t}\hat f(t,k)\,dt
$$

によって、重み付き内積

$$
\langle L_m f,L_m g\rangle
=\int\overline{L_m f(k)}L_m g(k)
\frac{d^{d-1}k}{(2\pi)^{d-1}2a(k)}
$$

を持つ関数として表せます。ここで $\hat f(t,k)$ は空間変数だけの Fourier 変換です。複素係数の線形結合に線形に延長します。零方向はこの関数がほとんど至る所で零となる場合です。

正時間並進の下では $u=t-s$ と置換して

$$
\begin{aligned}
L_m(\tau_s f)(k)
&=\int_s^\infty e^{-a(k)t}\hat f(t-s,k)\,dt\\
&=e^{-sa(k)}L_m f(k).
\end{aligned}
$$

従って [反射陽性からの時間並進半群](#thm-mqfc9-time-semigroup) は一次観測量の類の閉包上で $e^{-sa(k)}$ の掛け算として表されます。この閉包は半群で不変です。作用素は自己共役なので直交補空間も不変になります。

実際この一次空間は重み付き $L^2$ 全体と等長です。任意の非負非零な $h\in C_c^\infty((0,\infty))$ を固定し、$f(t,x)=h(t)g(x)$ とすると $L_m f(k)=b(k)\hat g(k)$、$b(k)=\int e^{-a(k)t}h(t)dt>0$ です。$b$ は滑らかで、コンパクト集合上では正の下限を持ちます。任意のコンパクト台滑らかな複素関数 $\varphi(k)$ に対し $\hat g=\varphi/b$ と取れば Schwartz 関数です。逆 Fourier 変換した $g$ も Schwartz であり、その実部・虚部の測定の複素線形結合で $\varphi$ が得られます。重み $1/(2a(k)(2\pi)^{d-1})$ は連続かつ正であり、コンパクト集合上で上下から正定数で抑えられるため、切断とコンパクト台滑らかな関数の $L^2$ 近似でこの関数族は稠密です。

[自己共役縮小半群の非負生成作用素](#thm-mqfc9-hamiltonian) をこの一次空間に適用すると、生成作用素は $a(k)$ の掛け算で、定義域は $a(k)L_m f(k)$ に対応する関数が重み付き $L^2$ に入るという条件です。これは一次空間全体で $\|H v\|^2=\int a(k)^2 |v(k)|^2d^{d-1}k/((2\pi)^{d-1}2a(k))<\infty$ と表されます。$a(k)\ge m$ より

$$
\|T_s v\|\le e^{-ms}\|v\|
$$

が一次空間で従います。中心化された一次状態は $\Omega$ と直交します。ただし一次空間だけの評価から全真空直交空間の質量ギャップを結論してはいけません。

## 5. 演習

### 演習 MQFC9-A1：零方向と商

- Level: A

$\mathbb C^2$ 上の半正定値形式を $q(z,w)=\overline{(z_1+2z_2)}(w_1+2w_2)$ とする。零空間、商の次元、$[(3,-1)]$ の二乗ノルムを求めよ。

<!-- solution-start -->
$q(z,z)=|z_1+2z_2|^2$ なので零空間は $z_1+2z_2=0$ を満たす直線、すなわち $\mathbb C(-2,1)$ です。$z\mapsto z_1+2z_2$ は全射でその核が零空間なので、商は $\mathbb C$ に等長に対応します。従って次元は1、指定された類の二乗ノルムは $|3-2|^2=1$ です。
<!-- solution-end -->

### 演習 MQFC9-A2：時間並進と反転

- Level: A

$(\theta f)(t)=f(-t)$、$(\tau_sf)(t)=f(t-s)$ とする。$\theta\tau_s=\tau_{-s}\theta$ を確認し、台が $[1,2]$ に含まれる $f$ の $\tau_3 f$ の台を評価せよ。

<!-- solution-start -->
左辺は $(\theta\tau_s f)(t)=f(-t-s)$ です。右辺は $(\tau_{-s}\theta f)(t)=(\theta f)(t+s)=f(-t-s)$ なので一致します。$\tau_3f(t)$ が非零なら $t-3\in[1,2]$、従ってその台は $[4,5]$ に含まれます。正時間のままです。
<!-- solution-end -->

### 演習 MQFC9-A3：半群の生成作用素

- Level: A

$\mathbb C^3$ 上で $T_s=\operatorname{diag}(1,e^{-s},e^{-4s})$ とする。半群則、自己共役縮小性、生成作用素を確認し、$v=(1,2,1)$ に対して $\|T_s v\|^2$ を求めよ。

<!-- solution-start -->
対角成分を掛けると $e^{-as}e^{-at}=e^{-a(s+t)}$（$a=0,1,4$）なので半群則が成立します。各成分は実数で絶対値が1以下なので自己共役縮小です。指数関数の連続性から強連続です。[非負生成作用素の定理](#thm-mqfc9-hamiltonian) で時刻1の対角成分の負の対数を取ると $H=\operatorname{diag}(0,1,4)$ です。

$$
\|T_sv\|^2=1+4e^{-2s}+e^{-8s}.
$$
<!-- solution-end -->

### 演習 MQFC9-A4：一次状態の時間減衰

- Level: A

$d=1,m=2$ の自由場で $L_m f=3$ となる実正時間試験関数を取る。$v=[X_f]$ として $\langle v,T_sv\rangle$ と $\|T_sv\|^2$ を求めよ。

<!-- solution-start -->
[自由場の反射共分散の因子分解](../MQFC8/index.md#thm-mqfc8-reflected-covariance) の一次元の式に代入すると $\|v\|^2=3^2/(2\cdot2)=9/4$ です。第4節の時間並進計算から $L_m(\tau_s f)=3e^{-2s}$、従って $T_sv=e^{-2s}v$ です。ゆえに

$$
\langle v,T_sv\rangle=\frac94 e^{-2s},\qquad
\|T_sv\|^2=\frac94 e^{-4s}.
$$

相関の減衰指数と二乗ノルムの減衰指数は2倍違います。
<!-- solution-end -->

### 演習 MQFC9-B1：対称性だけでは縮小性が出ない

- Level: B

$\mathbb C$ 上の $T_sv=e^{s}v$ を考える。半群則、強連続性、自己共役性を確認し、縮小性の失敗と生成作用素の符号を求めよ。第2節の時間倍増論法ではどの評価が失われているか。

<!-- solution-start -->
$e^{s+t}=e^se^t$、$e^0=1$ なので半群則が成立します。実数の掛け算なので自己共役で、$s\downarrow0$ で $e^s\to1$ より強連続です。しかし $v\ne0,s>0$ なら $\|T_sv\|=e^s\|v\|>\|v\|$ です。差商は $(1-e^s)v/s\to-v$ なので $H=-I$ です。時間倍増評価では $\|T_{2^ns}v\|=e^{2^ns}\|v\|$ となり、$n$ に依らない上界がありません。実際その $2^{-n}$ 乗は $e^s\|v\|^{2^{-n}}$ となり、極限にも増幅率が残ります。測度の並進不変性による通常の $L^2$ の一様有界性が重要です。
<!-- solution-end -->

### 演習 MQFC9-B2：零方向が並進で保存される仕組み

- Level: B

反転不変・並進不変・反射陽性な測度で $F,G\in\mathcal P_+$ とする。$q(F,F)=0$ なら $q(U_sF,U_tG)=0$ が全 $s,t\ge0$ で成立することを、縮小半群の定理を結論として使わず示せ。

<!-- solution-start -->
第1節の Cauchy–Schwarz 評価から全 $K\in\mathcal P_+$ で

$$
|q(F,K)|^2\le q(F,F)q(K,K)=0
$$

です。正時間並進は $\mathcal P_+$ を保つので $U_{s+t}G$ も $\mathcal P_+$ に属します。第2節の反転と並進の恒等式により

$$
q(U_sF,U_tG)=q(F,U_sU_tG)=q(F,U_{s+t}G)=0.
$$

特に $G=F,t=s$ とすれば $q(U_sF,U_sF)=0$ です。従って同じ類の代表元の差を並進しても零類のままです。ここでは縮小性の証明より先に代表元への非依存性を確認できています。
<!-- solution-end -->

### 演習 MQFC9-B3：生成作用素の定義域

- Level: B

$\ell^2(\mathbb N)$ 上で $T_s e_n=e^{-sn}e_n$ とする。$v_n=1/n$ のベクトルは $T_s$ の定義域に入るが $H$ の定義域に入らないことを示せ。差商のノルムが発散することも示せ。

<!-- solution-start -->
$\sum_n n^{-2}<\infty$ より $v\in\ell^2$ です。$\sum_n e^{-2sn}/n^2\le\sum_n n^{-2}$ なので全 $T_s$ が $v$ に作用します。[非負生成作用素の定理](#thm-mqfc9-hamiltonian) により $H$ は対角成分 $n$ を持ち、$\sum_n n^2|v_n|^2=\sum_n1=\infty$ のため $v\notin D(H)$ です。

さらに任意の正整数 $M$ で

$$
\left\|\frac{v-T_sv}s\right\|^2
\ge\sum_{n=1}^M\frac{(1-e^{-sn})^2}{s^2n^2}.
$$

有限和の各項が $s\downarrow0$ で1へ収束するため、左辺の下極限は $M$ 以上です。$M$ は任意なのでノルムは発散します。
<!-- solution-end -->

### 演習 MQFC9-B4：二次観測量のエネルギー

- Level: B

$d=1,m>0$ の中心化自由 Gaussian 場を考える。実正時間試験関数 $f$ について $a=E[X_f^2]$、$c=(L_m f)^2/(2m)>0$ とし、$F=X_f^2-a$ とする。$q(F,U_sF)$ を求めよ。

<!-- solution-start -->
$Y=X_{\theta f}$、$X_s=X_{\tau_s f}$ と置きます。反転不変性と時間並進不変性から $E[Y^2]=E[X_s^2]=a$ です。[自由場の反射共分散の因子分解](../MQFC8/index.md#thm-mqfc8-reflected-covariance) と第4節の並進公式から $E[YX_s]=ce^{-ms}$ です。[Wick対分割公式](../MQFC7/index.md#thm-mqfc7-gaussian-pairing) を $Y,Y,X_s,X_s$ に適用すると

$$
E[Y^2X_s^2]=a^2+2c^2e^{-2ms}.
$$

従って

$$
\begin{aligned}
q(F,U_sF)
&=E[(Y^2-a)(X_s^2-a)]\\
&=a^2+2c^2e^{-2ms}-a^2-a^2+a^2\\
&=2c^2e^{-2ms}.
\end{aligned}
$$

一次観測量とは異なる指数 $2m$ が現れました。
<!-- solution-end -->

### 演習 MQFC9-C1：二次状態は本当に固有ベクトルか

- Level: C

B4 の条件を引き継ぐ。$v=[F]$ とし、$T_sv=e^{-2ms}v$ が OS Hilbert空間で成立することを示せ。さらに $Hv=2mv$ と $\langle\Omega,v\rangle=0$ を示せ。相関の式だけでなく、ベクトルの差のノルムを直接検証すること。

<!-- solution-start -->
B4 の計算から

$$
\|v\|^2=q(F,F)=2c^2,\qquad
\langle v,T_sv\rangle=2c^2e^{-2ms}.
$$

[反射陽性からの時間並進半群](#thm-mqfc9-time-semigroup) は自己共役で半群則を満たすため

$$
\|T_sv\|^2=\langle v,T_{2s}v\rangle=2c^2e^{-4ms}.
$$

$\alpha=e^{-2ms}$ と置けば

$$
\begin{aligned}
\|T_sv-\alpha v\|^2
&=\|T_sv\|^2-2\alpha\operatorname{Re}\langle v,T_sv\rangle
+\alpha^2\|v\|^2\\
&=2c^2e^{-4ms}-4c^2e^{-4ms}+2c^2e^{-4ms}\\
&=0.
\end{aligned}
$$

OS Hilbert空間の内積は正定値なので $T_sv=\alpha v$ です。[非負生成作用素の定理](#thm-mqfc9-hamiltonian) の差商に代入すると

$$
\lim_{s\downarrow0}\frac{v-T_sv}{s}
=\lim_{s\downarrow0}\frac{1-e^{-2ms}}s v=2mv.
$$

従って $v\in D(H)$、$Hv=2mv$ です。また

$$
\langle\Omega,v\rangle=q(1,F)=E[X_f^2-a]=0.
$$

$c>0$ なので $v$ は非零です。中心化された二次状態は零エネルギーの定数状態とは直交し、エネルギー $2m$ を持つと分かりました。
<!-- solution-end -->

## 6. 次の講義

反射陽性から量子状態の空間を作り、時間並進不変性と連続性を用いて非負の Hamiltonian を得ました。この段階で実時間のユニタリ作用 $e^{-itH}$ は [スペクトル位相作用素のユニタリ性](../../../解析系/QM/QM6/index.md#prop-qm6-spectral-phase-unitary) から定義できます。ただし相対論的な局所場、時空共変性、Wightman 分布の再構成には追加条件が必要です。次講では OS 公理と再構成の残りの道筋を学びます。

参考文献：K. Osterwalder and R. Schrader, [Axioms for Euclidean Green's Functions](https://doi.org/10.1007/BF01645738) (1973) および [II](https://doi.org/10.1007/BF01608978) (1975)。J. Glimm and A. Jaffe, [Quantum Physics: A Functional Integral Point of View](https://link.springer.com/book/10.1007/978-1-4612-4728-9), 2nd ed.
